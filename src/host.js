import defer from 'mini-defer'

import {MSG_TYPES} from './const'
import Channel from './channel'

export default class Host extends Channel {
  init() {
    this.heartbeatFrequency = 5
    this.connections = {}
    this.handleHandshake = this._handleHandshake.bind(this)
    window.addEventListener('message', this.handleHandshake, false)
    this.ready(() => {
      this.runHeartbeatDetection()
    })
  }

  runHeartbeatDetection() {
    this.getPorts().forEach(({client, port, lastPing}) => {
      // 10 秒无心跳，主动断开连接
      if (lastPing && (this.now() - lastPing) > this.heartbeatFrequency * 2 * 1000) {
        console.log('close', client, (this.now() - lastPing) / 1000)
        this._close(client)
      } else {
        this.push(client, MSG_TYPES.PING)
      }
    })

    setTimeout(() => {
      this.runHeartbeatDetection()
    }, this.heartbeatFrequency * 1000)
  }

  destroy(clean) {
    super.destroy()
    this.getPorts().forEach(({client}) => {
      this._close(client)
    })
    this.connections = {}

    if (clean) {
      window.removeEventListener('message', this.handleHandshake)
    }
  }

  _close(client) {
    if (this.connections[client]) {
      this.connections[client].port.close()
      this.connections[client].port.onmessage = null
      delete this.connections[client]
    }
  }

  now() {
    return Date.now()
  }

  report() {
    let conns = 0
    const appClients = this.getPorts().reduce((ret, con) => {
      conns++
      if (!ret[con.application_id]) {
        ret[con.application_id] = 0
      }
      ret[con.application_id]++
      return ret
    }, {})
    const appIds = Object.keys(appClients)

    console.log('当前已连接应用数：', appIds.length, ', 已连接页面总数：', conns, ', 应用计数统计：', appClients)
  }

  getPorts(applicationId) {
    return Object.keys(this.connections).reduce((ret, key) => {
      if (!applicationId || this.connections[key].application_id == applicationId) {
        ret.push(this.connections[key])
      }
      return ret
    }, [])
  }

  _handleHandshake(e) {
    const eDataArr = e.data && e.data.split ? e.data.split(':') : []
    if (eDataArr.length == 3 && eDataArr[0] == MSG_TYPES.CONNECT && e.ports.length) {
      const aId = eDataArr[1]
      const cUnique = eDataArr[2]
      if (!aId || this.getPorts(aId).length >= 10) {
        e.ports[0].postMessage({
          action: MSG_TYPES.CONNECT,
          data: {error: {message: 'Too many connections'}}
        })
        return
      }

      this.connections[cUnique] = {
        client: cUnique,
        application_id: aId,
        port: e.ports[0]
      }

      const responder = (welcomeMessage, errMessage) => {
        if (errMessage) {
          if (this.connections[cUnique]) {
            this._send(cUnique, MSG_TYPES.CONNECT, {error: {message: errMessage}})
          }
          delete this.connections[cUnique]
        } else {
          this.connections[cUnique].port.onmessage = this.handlePortMessage.bind(this, cUnique)
          this.connect.resolve(cUnique)
          this.push(cUnique, MSG_TYPES.CONNECT, {result: {message: welcomeMessage}})
        }
      }

      this.emit('connect', {application_id: aId, origin: e.origin, client: cUnique}, responder)
    }
  }

  send(client, action, data, _id) {
    const id = _id || this._unique_id('h_')

    this.ready(() => {
      this._send(client, action, data, id)
    })

    const deferred = defer()
    this.promises[id] = deferred

    return deferred.promise
  }

  push(client, action, data = null) {
    this.ready(() => {
      this._send(client, action, data)
    })
  }

  _send(client, action, data, id) {
    if (this.connections[client]) {
      let payload = {action}
      if (data) {
        payload.data = data
      }
      if (id) {
        payload.id = id
      }

      this.connections[client].port.postMessage(payload)
    } else {
      this.emit('error', {type: 'send', data: {message: '连接不存在'}})
    }
  }

  handlePortMessage(client, e) {
    if (false === this._processMessage(e, client)) {
      return
    }

    if (!this.connections[client]) {
      throw new Error('message client error: ' + client)
    }

    let eData, id, action
    try {
      eData = e.data
      if (typeof eData == 'string') {
        eData = JSON.parse(eData)
      }
      if (!eData.action && !eData.id && eData.callback) throw new Error()
    } catch (err) {
      throw new Error('HB_APP_SDK: malformed message')
    }

    id = eData.id || eData.callback
    action = eData.action

    let responder
    if (id) {
      responder = (result, error) => {
        if (error) {
          this.connections[client].port.postMessage({id, error})
        } else {
          this.connections[client].port.postMessage({id, result})
        }
      }
    } else {
      // 非回调模式，提供来路回复能力
      // responder = (data) => {
      //   this.connections[client].port.postMessage(data)
      // }
    }

    this.emit(action, {
      application_id: parseInt(this.connections[client].application_id, 10),
      params: eData.data
    }, responder)
  }

  _processMessage(e, client) {
    switch (e.data.action) {
      case MSG_TYPES.DISCONNECT:
        this._close(client)
        return false
      case MSG_TYPES.BROADCAST:
        // 宿主负责转发广播，给[相同应用]的[其他]页面
        this._broadcast(this.connections[client].application_id, e.data.data, [client])
        return false
      case MSG_TYPES.PING:
        // 心跳回包
        this.connections[client].lastPing = this.now()
        return false
    }
  }

  broadcast(action, data, aId = null) {
    this._broadcast(aId, data ? {action, data} : {action})
  }

  _broadcast(aId, data, exclude = []) {
    this.getPorts(aId).forEach(({client, port}) => {
      if (exclude.indexOf(client) === -1) {
        this.push(client, MSG_TYPES.BROADCAST, data)
      }
    })
  }
}

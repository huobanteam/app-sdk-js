import defer from 'mini-defer'
import {delay} from '../util'
import {MSG_TYPES, HB_HOST} from '../const'
import Client from './index'

export default class ClientBrowser extends Client {

  init(applicationId, params = {}) {
    const deferred = defer()

    if (window.parent === window) {
      delay(() => {
        deferred.reject({message: '无法找到宿主环境'})
      })
      return deferred.promise
    }
    if (!window.MessageChannel) {
      delay(() => {
        deferred.reject({message: '您的浏览器不支持 MessageChannel'})
      })
      return deferred.promise
    }

    if (this._ticket && this._user) {
      deferred.resolve({
        ticket: this._ticket,
        user: this._user,
        app: this._table,
        table: this._table,
        version: this._version
      })
      return deferred.promise
    }

    this._id = this._unique_id('c_', 8)

    const mc = new MessageChannel()
    this.port = mc.port1
    this.port.onmessage = this.handleMessage.bind(this)

    window.parent.postMessage(`${MSG_TYPES.CONNECT}:${applicationId}:${this._id}`, HB_HOST, [mc.port2])

    return this._init(applicationId, params)
  }

  _send(action, data, id) {
    let payload = {action}
    if (data) {
      payload.data = data
    }
    if (id) {
      payload.id = id
    }

    this.port.postMessage(payload)
  }

  _processMessage(e) {
    const eData = e.data
    switch (eData.action) {
      case MSG_TYPES.CONNECT:
        if (eData.data.error) {
          // 这里代表连接被拒绝，需要SDK对外报错
          // this.connect.reject(eData.data.error)
          this.emit('error', {...eData.data.error, type: 'connect'})
          this.emit('error.connect', eData.data.error)
        } else {
          this.connect.resolve(eData.data.result)
        }
        return false
      case MSG_TYPES.CLOSE:
        this.destroy()
        return false
      case MSG_TYPES.PING:
        this.push(MSG_TYPES.PING)
        return false
    }
  }

  handleWindowBeforeUnload(e) {
    this._disconnect()
  }

  _disconnect() {
    this.push(MSG_TYPES.DISCONNECT)
  }

  destroy() {
    super.destroy()
    if (this.port) {
      this._disconnect()
      this.port.close()
      this.port = null
    }
  }
}

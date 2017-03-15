import uniqID from 'uniq-id'
import defer from 'mini-defer'

import {isIPhone, isIPad} from './const'

export default class Channel {
  constructor(handlers) {
    this.connect = defer()

    // promise 暂存
    this.promises = {}
    this.handlers = {}

    if (handlers) {
      this.on(handlers)
    }
  }

  /**
   * 注册连接成功后的回调
   * @param  {Function} fn 回调方法
   * @return {Channel}
   */
  ready(fn) {
    this.connect.promise.then(fn)
    return this
  }

  /**
   * 绑定事件监听
   * @param  {String}   action  事件名称
   * @param  {Function} fn      事件的回调
   * @param  {Boolean}  replace 是否覆盖已有回调
   */
  on(action, fn, replace) {
    let revokes
    if (!fn && typeof action == 'object') {
      revokes = []
      Object.keys(action).forEach(key => {
        revokes.push(this._on(key, action[key], replace))
      })
    } else {
      revokes = [this._on(action, fn, replace)]
    }

    return {
      on: this.on.bind(this),
      revoke: revokes[0],
      revokes: revokes
    }
  }

  _on(action, fn, replace) {
    let revoke = function() {}
    if (action && fn) {
      if (replace || !this.handlers[action]) {
        this.handlers[action] = []
      }
      this.handlers[action].push(fn)
      revoke = () => {
        this.off(action, fn)
      }
    }

    return revoke
  }

  /**
   * 解绑事件回调
   * @param  {String}   action 事件名称
   * @param  {Function} fn     回调方法
   */
  off(action, fn) {
    if (action && this.handlers[action]) {
      if (fn) {
        const idx = this.handlers[action].indexOf(fn)
        if (idx >= 0) {
          this.handlers[action].splice(idx, 1)
        }
      } else {
        this.handlers[action] = []
      }
    } else if (action == '!') {
      this.handlers = {}
    }

    return this
  }

  emit(action, data, responder) {
    let ret = []
    let halted = false
    let handled = false
    if (action && this.handlers[action]) {
      let handlers = this.handlers[action]
      ret = handlers.map(fn => {
        let _ret
        if (!halted) {
          _ret = fn(data, responder)
          if (false === _ret) {
            halted = true
          }
          handled = true
        }
        return _ret
      })
    }

    if (action != '*' && this.handlers['*']) {
      ret = ret.concat(this.handlers['*'].map(fn => fn(action, data, handled ? null : responder)))
    }

    return ret
  }

  /**
   * 给应用推送事件
   * @param  {String} action 事件名称
   * @param  {Object} data   推送的数据
   */
  push(action, data = null) {
    this.ready(() => {
      // console.log('channel.push', action, data)
      this._send(action, data)
    })
  }

  /**
   * 给应用发送事件
   * @param  {String}   action 事件名称
   * @param  {Object}   data   发送的数据
   * @param  {String}   _id    请求的id
   * @param  {Function} fn     请求的回调
   * @return {Promise|String}  返回Promise或请求的id
   */
  send(action, data, _id, fn) {
    const id = _id || this._unique_id()

    this.ready(() => {
      // console.log('channel.send', action, data, id)
      this._send(action, data, id)
    })

    if (fn && typeof fn == 'function') {
      // 这里使用覆盖式回调，避免多次调用引起的重复回调
      // this.on(`${action}.callback`, fn, true)
      this.promises[id] = fn
      return id
    } else {
      const deferred = defer()
      this.promises[id] = deferred

      return deferred.promise
    }
  }

  handleMessage(e) {
    if (false === this._processMessage(e)) {
      return
    }

    let eData, id, action, data
    try {
      eData = e.data
      if (typeof eData == 'string') {
        if (isIPhone || isIPad) {
          // iOS生成的JSON字符串可能包含换行引起解析失败
          eData = eData.replace(/[\r\n\t]+/g, '')
        }
        eData = JSON.parse(eData)
      }
      if (!eData.action && !eData.id && !eData.callback) throw new Error()
    } catch (err) {
      this.emit('error', {type: 'json', source: eData, err})
      this.emit('error.json', {source: eData, err})
      alert('HB_APP_SDK: JSON解析失败, 请将当前界面截图反馈, 谢谢!\n' + JSON.stringify(err) + '\n' + eData)
      throw new Error('HB_APP_SDK: malformed message')
    }

    id = eData.id || eData.callback
    action = eData.action
    data = eData.params || eData.data

    if (id) {
      if (id in this.promises) {
        const promise = this.promises[id]
        // promise maybe an instance of Promise or a function
        if (promise.resolve) {
          if (eData.error) {
            promise.reject(eData.error)
          } else if (eData.result) {
            promise.resolve(eData.result)
          } else {
            promise.reject({cancelled: true})
          }
          this.promises[id] = null
          delete this.promises[id]
        } else {
          if (eData.result || eData.error) {
            this.promises[id](eData.result, eData.error)
          } else {
            this.promises[id](null, {cancelled: true})
          }
        }
      } else if (action && this.handlers[action]) {
        const responder = (ret) => {
          this.send(action, ret, id)
        }
        this.emit(action, data, responder)
      }
    } else if (action) {
      // 针对一些事件(如广播)的特殊处理，方便应用使用 .on('broadcast.refresh', fn) 订阅指定广播事件
      this.emit(action, data)
      if (data && data.action) {
        this.emit(`${action}.${data.action}`, data.data)
      }
    } else {
      this.emit('*', data)
    }
  }

  destroy() {
    this.off('!')
    this.connect = defer()
  }

  _send() {}

  _processMessage(e) {
    return e
  }

  _unique_id(prefix = 'cb_', length = 10, decimal = 16) {
    const x64 = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'

    return uniqID.generateUUID(prefix + x64.substr(0, length), decimal)()
  }
}

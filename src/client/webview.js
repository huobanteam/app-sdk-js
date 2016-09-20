import Client from './index'

export default class ClientWebview extends Client {

  init(applicationId) {
    // iOS/Android下使用huoban://协议拦截的方式请求，无需初始化
    this.connect.resolve()

    window.HB = window.HB || {}
    window.HB.bridgeCallback = this.handleBridgeInvoke.bind(this, 'callback')
    window.HB.bridgeCancel = this.handleBridgeInvoke.bind(this, 'cancel')
    window.HB.bridgeEmit = this.handleBridgeInvoke.bind(this, 'emit')

    return this._init(applicationId)
  }

  _send(action, data, id) {
    let urlArr = [`huoban://hybrid?action=${encodeURIComponent(action)}`]
    if (id) {
      urlArr.push(`callback=${encodeURIComponent(id)}`)
    }
    if (data) {
      urlArr.push('params=' + encodeURIComponent(JSON.stringify(data)))
    }

    let url = urlArr.join('&')
    this._invokeNative(url)
  }

  _invokeNative(url) {
    let iframe = document.createElement('iframe')
    iframe.style.width = 0
    iframe.style.height = 0
    iframe.style.display = 'none'
    iframe.src = url
    document.body.appendChild(iframe)
    setTimeout(function() {
      iframe.parentNode.removeChild(iframe)
    }, 100)
  }

  handleBridgeInvoke(type, resp) {
    return this.handleMessage({data: resp})
  }

  destroy() {
    super.destroy()
    delete window.HB.bridgeCallback
    delete window.HB.bridgeCancel
    delete window.HB.bridgeEmit
  }
}

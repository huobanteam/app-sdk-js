import './polyfill'
import {isClientAndroid, isClientIOS, isWap, isPC, isIPhone, isAndroid} from './const'
import ClientBrowser from './client/browser'
import ClientWebview from './client/webview'
import ClientWebviewUrl from './client/webview_url'
import Host from './host'

export * from './const'

let instance = {}

export function client(handlers) {
  if (!instance.client) {
    if (isPC || isWap) {
      instance.client = new ClientBrowser()
    } else if (isClientIOS || isIPhone) {
      instance.client = new ClientWebview()
    } else if (isClientAndroid && isAndroid) {
      instance.client = new ClientWebviewUrl()
    } else {
      instance.client = new ClientBrowser()
      // alert('unknown client type: ' + JSON.stringify({isClientAndroid, isClientIOS, isWap, isPC, isIPhone, isAndroid}))
    }
  }

  if (handlers) {
    instance.client.on(handlers)
  }

  return instance.client
}

export function host(handlers) {
  if (!instance.host) {
    instance.host = new Host()
    instance.host.init()
  }

  if (handlers) {
    instance.host.on(handlers)
  }

  return instance.host
}

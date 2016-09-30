import {isClientAndroid, isClientIOS, isWap, isPC} from './const'
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
    } else if (isClientAndroid) {
      instance.client = new ClientWebviewUrl()
    } else if (isClientIOS) {
      instance.client = new ClientWebview()
    } else {
      instance.client = new ClientBrowser()
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

import * as ConstVars from './const'
import ClientBrowser from './client/browser'
import ClientWebview from './client/webview'
import ClientWebviewUrl from './client/webview_url'
import Host from './host'

export const isAndroid = ConstVars.isAndroid
export const isIPhone = ConstVars.isIPhone
export const isIPad = ConstVars.isIPad
export const isMobile = ConstVars.isMobile
export const isPC = ConstVars.isPC

let instance = {}

export function client(handlers) {
  if (!instance.client) {
    if (isAndroid) {
      instance.client = new ClientWebviewUrl()
    } else if (isIPhone || isIPad) {
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

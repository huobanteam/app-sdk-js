import * as ConstVars from './const'
import ClientBrowser from './client/browser'
import ClientWebview from './client/webview'
import ClientWebviewUrl from './client/webview_url'
import Host from './host'

export const isAndroid = ConstVars.isAndroid
export const isIPhone = ConstVars.isIPhone
export const isIPad = ConstVars.isIPad
export const isMobile = ConstVars.isMobile
export const isWap = ConstVars.isWap
export const isPC = ConstVars.isPC

let instance = {
  client: {}
}
let clientMapping = {
  android: ClientWebviewUrl,
  ios: ClientWebview,
  browser: ClientBrowser
}

function initClient(type) {
  if (type && clientMapping[type]) {
    return new clientMapping[type]()
  }

  throw new Error('unknown client type')
}

export function client(handlers, type) {
  if (!type) {
    if (isPC || isWap) {
      type = 'browser'
    } else if (isAndroid) {
      type = 'android'
    } else if (isIPhone || isIPad) {
      type = 'ios'
    } else {
      type = 'browser'
    }
  }

  if (!instance.client[type]) {
    instance.client[type] = initClient(type)
  }

  if (handlers) {
    instance.client[type].on(handlers)
  }

  return instance.client[type]
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

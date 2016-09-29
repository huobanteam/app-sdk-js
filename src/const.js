const UA = navigator.userAgent

export const isAndroid = !!UA.match(/(Android);?[\s\/]+([\d.]+)?/)
export const isIPad = !!UA.match(/(iPad).*OS\s([\d_]+)/)
export const isIPhone = !isIPad && !!UA.match(/(iPhone\sOS)\s([\d_]+)/)
export const isMobile = isAndroid || isIPhone || isIPad
export const isInFrame = window.parent !== window
export const isWap = isMobile && isInFrame
export const isPC = !isMobile && !isWap && isInFrame

let clientMatch = document.cookie.match(/huoban_client=(\w+)/)
export const isClient = !!clientMatch
export const isClientIOS = clientMatch && clientMatch[1] == 'ios'
export const isClientAndroid = clientMatch && clientMatch[1] == 'android'

// export const HB_HOST = 'https://app.huoban.com'
export const HB_HOST = '*'

export const MSG_TYPES = {
  CONNECT: '$connect$',
  DISCONNECT: '$disconnect$',
  CLOSE: '$close$',
  PING: '$ping$',
  BROADCAST: 'broadcast'
}

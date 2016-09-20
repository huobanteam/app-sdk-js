const UA = navigator.userAgent

export const isAndroid = !!UA.match(/(Android);?[\s\/]+([\d.]+)?/)
export const isIPad = !!UA.match(/(iPad).*OS\s([\d_]+)/)
export const isIPhone = !isIPad && !!UA.match(/(iPhone\sOS)\s([\d_]+)/)
export const isMobile = isAndroid || isIPhone || isIPad
export const isPC = !isMobile

// export const HB_HOST = 'https://app.huoban.com'
export const HB_HOST = '*'

export const MSG_TYPES = {
  CONNECT: '$connect$',
  DISCONNECT: '$disconnect$',
  CLOSE: '$close$',
  PING: '$ping$',
  BROADCAST: 'broadcast'
}

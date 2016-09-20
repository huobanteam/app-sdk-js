import ClientWebview from './webview'

export default class ClientWebviewUrl extends ClientWebview {
  _invokeNative(url) {
    window.prompt(url, '')
  }
}

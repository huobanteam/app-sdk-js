#  Huoban App SDK ([中文版](./README_CN.md))

> for building applications on [Huoban](https://app.huoban.com/)

***

- [Import](#import)
- [Initialize & Example](#initialize--example)
- [SDK API](#sdk-api)
- [Channel API](#channel-api)
- [Client API](#client-api)
- [Host API](#host-api)
- [Message API](#message-api)


## Import

```js
// ES6
import {client, host} from 'huoban-app-sdk'
// or
import * as HuobanAppSDK from 'huoban-app-sdk'

// CommonJS
var HuobanAppSDK = require('huoban-app-sdk')

// RequireJS
define(['huoban-app-sdk'], function (HuobanAppSDK) {/*...*/})
```

```html
<!-- Script, available as `window.HuobanAppSDK` -->
<script src="//unpkg.com/huoban-app-sdk@latest/lib/HuobanAppSDK.min.js"></script>
```

## Initialize & Example

__Client: `HuobanAppSDK.client()`__

Create a app client to communicate with the host:

```js
const client = HuobanAppSDK.client()

// Normally send a message(action) to the host
client.send('hello', {word: 'i am a client'}).then(message => {
  console.log(message)
})
```

__Host: `HuobanAppSDK.host()`__

Create a host, just pass in your message handlers:

```js
const host = HuobanAppSDK.host({
  init: handleClientInit
})

// or use the `on` method to add handler
host.on('connect', (data, respond) => {
  console.log('client connected:', data.client)
  // use the `respond` to response data
  respond('welcome')
  // or refuse the connect, use the second param
  // respond(null, 'connect refused.')
})

// add a special handler to handle all message
host.on('*', (action, data) => {
  // the * handler without a `respond`
  console.log('client send an action:', action, data)
})

// Send something directly to the special client.
// {CLIENT} is from the `connect` handler
host.push({CLIENT}, 'app.change', {app_id: 123, name: ...})

function handleClientInit (data, respond) {
  fetchInitDataFromServer(data.app_id).then((ret) => {
    respond(ret)
  })
}
```

## SDK API

### `HuobanAppSDK.client(handlers) : Client`

Initialize a client.

- __handlers__ {Object} An object of message action/handler mappings

Returns a Client_(extends Channel)_. See the [Channel API Docs](#channel-api) for more details.

Example:

```js
HuobanAppSDK.client({
  broadcast: (data, respond) => {
    new Notification('You have a broadcast! ' + data.action)
    respond('GOT_IT')
  }
})
```

### `HuobanAppSDK.host(handlers) : Host`

Initialize a host.

- __handlers__ {Object} An object of message action/handler mappings

Returns a Host_(extends Channel)_. See the [Channel API Docs](#channel-api) for more details.

Example:

```js
HuobanAppSDK.host({
  init: handleClientInit
})
```

### `HuobanAppSDK.isClient` _(Property)_

__Boolean__ if in Huoban native APP

### `HuobanAppSDK.isPC` _(Property)_

__Boolean__ if in Huoban Web (https://app.huoban.com/)


## Channel API

### `channel.ready(handler)`

Register a handler to be called when the channel is opened between client and host.

- __handler__ {Function} The ready handler

Although you can register ready handlers, you can send messages before the channel is open using
`channel.send()` and these will be queued and sent as soon as the channel is ready.

Example:

```js
channel.ready(() => {
  application.start()
})
```

### `channel.send(action, data) : Promise`

Send a message through the channel to the host/client.

- __action__ {String} The message action
- __data__ {Any} The message data

Returns a Message(Promise). See the [Message API Docs](#message-api) for more details.

If called before the channel is ready the message will be queued and sent as soon as the channel is open.

Example:

```js
// Typed message, will invoke registered action handlers
channel.send('notify')

// Typed message with data, will invoke registered action handlers
channel.send('openUrl', { url: 'https://app.huoban.com/' })
```

### `channel.push(action, data)`

Send a message through the channel to the host/client, and without a return value.

- __action__ {String} The message action
- __data__ {Any} The message data

If called before the channel is ready the message will be queued and sent as soon as the channel is open.

Example:

```js
// Typed message, will invoke registered action handlers
channel.push('broadcast', {action: 'refresh'})
```

### `channel.on(action, handler) : {revoke, revokes, on}`

Handle an special action message.

- __action__ {String} The message action
- __handler__ {Function} The message handler

The handler receives two arguments: the `data` of the message and a `respond` function.

Returns an object {revoke, revokes, on}.

Example:

```js
let connectBinder = channel.on('connect', (data, respond) => {
  console.log('new connection: ', data)
  respond('ok')
})
// remove the listener when needed
connectBinder.revoke()
// or
connectBinder.revokes.forEach(revoke => revoke())
```

### `channel.off(action, handler)`

Remove an special action handler.

- __action__ {String} The message action, pass `*` will remove __all__ handlers
- [__handler__] {Function} _(optional)_ The message handler, if omit will remove all handlers for `action`

Example:

```js
 // remove the special `handleClientInit` handler
channel.off('init', handleClientInit)

// remove all `init` action's handlers
channel.off('init')

// remove all handlers
channel.off('*')
```

### `channel.emit(action, data, respond)`

Trigger an special action.

- __action__ {String} The message action
- [__data__] {Any} _(optional)_ The message data
- [__respond__] {Function} _(optional)_ The message responder

Example:

```js
 channel.emit('connect', {app_id: 123, ...})
```

## Client API
___Client extends Channel___

### `client.init(applicationId) : Promise`

Get the init data from the host. ___this should be the first call for an application___

- __applicationId__ application id

Return a Promise, resolved by __data__:
  - user {Object} current logged in user
  - table {Object} current table
  - ticket {String} the ticket for authenticating

Example:

```js
client.init(applicationId).then((data) => {
  let {user, ticket, table} = data
})
```

### `client.openWebPage(url, title)`

Tell host to open a new page with `url`.

- __url__ {String} The web url
- __title__ {String} The web page's title

### `client.closeWebPage()`

Tell host to close current page.

### `client.setTitle(title)`

Tell host to set __current__ page's title.

- __title__ {String} The page title

### `client.openItemDetail(itemId)`

Tell host to open the default item detail page.

- __itemId__ {Integer} The id of the item

### `client.openItemList()`

Tell host to open the default item list page.

### `client.openItemDiff(itemId, fromRevId, toRevId, opts = {})`

Tell host to open the item diff component.

- __itemId__ {Integer} The id of the item
- __fromRevId__ {Integer} The id of the old reversion
- __toRevId__ {Integer} The id of the new reversion
- __opts__ {Object} The extra params
  - field_id {Integer} The specified field_id to show
  - created_by {Object} The modifier
  - created_by_id {Integer} The modifier's id
  - updated_on {String} The updated time

Example:

```js
let itemId = 6078229
let fromRevId = 7308234
let toRevId = 7308410
client.openItemDiff(itemId, fromRevId, toRevId, {
  field_id: 3034388,
  created_by: {name: 'airwin', user_id: 11003, avatar: {}, ...},
  created_by_id: 11003,
  updated_on: '2016-07-31 11:22:33'
})
```

### `client.openFilter(table, filters, fn)`
___this method use the `fn` to receive callback, not return a Promise___

Tell host to open the native filter component.

- __table__ {Object} The Table Info
- __filters__ {Object} The specialed filters
- __fn__ {Function} handler, fn(data, error)
  - data {Object} data of callback,  eg: _{filters: {and: [{field: 110001, query: {..}}, ..]}}_
     - filters {Object} selected filters
  - error {Object} error info
    eg: _{cancelled: true}_ for user cancel the operation, _{message: 'default value error'}_ for some actual error
     - cancelled {Boolean} true for user cancel the operation
     - message {String} error message

Example:

```js
client.openFilter(table, null, (data) => {
  console.log('filters changed:', data.filters)
})
```

### `client.openUserPicker(opts, fn)`
___this method use the `fn` to receive callback, not return a Promise___

Tell host to open the user picker component.

- __opts__ {Object} The picker options
  - values {Array} selected users's id, eg: [11001, 11003]
  - multi {Boolean} if allow select multiple users
  - required {Boolean} if must select one user at least
  - title {String} the picker's title
  - placement {String} _(web only)_ picker's position relative to the target, can be: left-bottom/right-bottom/left-top/right-top,  default: 'right-bottom'
  - width {Integer} _(web only)_ picker's layer's width
- __fn__ {Function} handler, fn(data, error)
  - data {Object} data of callback
    eg: _{users: [{user_id: 11001, name: 'test1'}, {user_id: 11003, name: 'test2'}, ...]}_
     - users {Array} selected users
  - error {Object} error info
    eg: _{cancelled: true}_ for user cancel the operation, _{message: 'default value error'}_ for some actual error
     - cancelled {Boolean} true for user cancel the operation
     - message {String} error message

Example:

```js
client.openUserPicker({multi: true, values: [11001, 11003]}, (data) => {
  console.log('users picked:', data.users)
})
```

### `client.openDatePicker(opts, fn)`
___this method use the `fn` to receive callback, not return a Promise___

Tell host to open the date picker component.

- __opts__ {Object} The picker options
  - [value] {String} _(optional)_ default datetime
  - [type] {String} select type: date/time/datetime
  - [showClear] {Boolean} if show a `clear` button to clear current datetime
  - [showToday] {Boolean} if show a `today` button to select today
  - [range] {Object} range of the selectable date, eg: _{gte: '2016-08-01', lte: '2016-11-11'}_
  - placement {String} _(web only)_ picker's position relative to the target, can be: left-bottom/right-bottom/left-top/right-top,  default: 'right-bottom'
- __fn__ {Function} handler, fn(data, error)
  - data {Object} data of callback, eg: _{datetime: '2016-07-28 12:33', date: '2016-07-28', time: '12:33'}_
     - [datetime] {String} _(optional)_ selected datetime
     - [date] {String} _(optional)_ selected date
     - [time] {String} _(optional)_ selected time
  - error {Object} error info
    eg: _{cancelled: true}_ for user cancel the operation, _{message: 'default value error'}_ for some actual error
     - cancelled {Boolean} true for user cancel the operation
     - message {String} error message

Example:

```js
client.openDatePicker({value: '2016-07-27', type: 'date'}, (data) => {
  console.log('date picked:', data.date)
})
```

### `client.openRichEditor(opts, fn)`
___this method use the `fn` to receive callback, not return a Promise___

Tell host to open the rich text editor.

- __opts__ {Object} The picker options
  - title {String} editor's title
  - [value] {String} _(optional)_ default text
- __fn__ {Function} handler, fn(data, error)
  - data {Object} data of callback, eg: _{value: '<p>abc</p>'}_
     - value {String} edited text
  - error {Object} error info
    eg: _{cancelled: true}_ for user cancel the operation, _{message: 'default value error'}_ for some actual error
     - cancelled {Boolean} true for user cancel the operation
     - message {String} error message

### `client.openShare(opts, fn)`
___this method use the `fn` to receive callback, not return a Promise___

Tell host to open the share component.

- __opts__ {Object} The share options
  - [title] {String} share title
  - [content] {String} description of the share
  - [image] {String} share image's url
  - [url] {String} the link to share
  - [type] {String} share type, can be: url(default)/image(share image blob)
  - [via] {String} specified share with, can be: wechat/wechat_timeline/qq/weibo/clipboard/browser/tongren
- __fn__ {Function} handler, fn(data, error)
  - data {Object} data of callback, eg: _{via: 'wechat'}_
     - [via] {String} the app's name which shared with, can be: wechat/wechat_timeline/qq/weibo/clipboard/browser/tongren
  - error {Object} error info
    eg: _{cancelled: true}_ for user cancel the operation, _{message: 'default value error'}_ for some actual error
     - cancelled {Boolean} true for user cancel the operation
     - message {String} error message

Example:

```js
client.openShare({title: 'huoban', content: 'welcome', url: 'https://app.huoban.com'}, (data, error) => {
  if (!error) {
    console.log('share successed with:', data.via)
  } else {
    console.log('share failed.')
  }
})
```

### `client.getSpaceMembers(opts) : Promise`

get the full list of space's members from host.

- __opts__ {Object} options
  - [keyword] {String} _(optional)_ search keyword

Return a Promise, resolved by __data__:
  - members {Array} list of members, _eg: [{name: 'test1', user_id: 11003, avatar:..}, ..]_

Example:

```js
client.getSpaceMembers({keyword: 'air'}).then((data) => {
  console.log('got members:', data.members)
})
```

### `client.openAttachment(fileInfo)`

Tell host to show an attachment.

- __fileInfo__ {Object} The attachment info

### `client.genQRCode(text) : Promise`

generate a QRCode.

- __text__ {Object} text to generate

Return a Promise, resolved by __data__:
  - dataURL {String} base64 encoded string for using in images' src

Example:

```js
client.genQRCode('hello world').then((data) => {
  console.log('got dataURL:', data.dataURL)
})
```

### `client.scanQRCode(opts) : Promise`

scan a QRCode. _(native only)_

- __opts__ {Object} options
  - needResult {Boolean} true for return the result of the scanned QRCode

Return a Promise, resolved by __data__:
  - result {String} result of scan

Example:

```js
client.scanQRCode().then((data) => {
  console.log('got result:', data.result)
})
```

### `client.getLocation(opts = {}, fn)`
___this method use the `fn` to receive callback, not return a Promise___

request the current location.

- __opts__ {Object} options
  - [position] {Object} _(optional)_ current position (gcj02) _eg: {lng: 116.397428, lat: 39.90923}_
  - enableHighAccuracy {Boolean} request high accuracy (GPS), default: true
  - timeout {Integer} timeout (ms), default: 10000
  - convert {Boolean} if convert (wgs84 to gcj02), default: true
  - title {String} title to show

- __fn__ {Function} handler, fn(data, error)
  - data {Object} data of callback
     - location {Object} current location _eg: {name: 'xx', address: 'xx', distance: 10, lng: 116.32, lat: 40.033}_
  - error {Object} error info
    eg: _{cancelled: true}_ for user cancel the operation, _{message: 'default value error'}_ for some actual error
     - cancelled {Boolean} true for user cancel the operation
     - message {String} error message

Example:

```js
client.getLocation({}, (data, error) => {
  console.log('got location:', data, error)
})
```

### `client.openUserProfile(userId, opts)`

Tell host to open an user's profile card.

- __userId__ {Integer} The User's user_id
- __opts__ {Object} options
  - placement {String} _(web only)_ picker's position relative to the target, can be: left-bottom/right-bottom/left-top/right-top/bottom/top,  default: 'bottom'

### `client.broadcast(action, data)`

Broadcast an action to all _other_ clients.

- __action__ {String} The broadcast action
- [__data__] {Any} _(optional)_ The broadcast data

### `client.setPageConfig(config)`

set the current page's behavior. _(native only)_

- __config__ {Object}
  - landscape {Object} behavior when screen turned to landscape
     eg: _{nav_bar: false, bottom_bar: false}_
     - nav_bar {Boolean} if show the navigation bar
     - bottom_bar {Boolean} if show the botttom bar

### `client.setNavigationBarVisibility(isVisible)`

Tell host to toggle the navbar. _(native only)_

- __isVisible__ {Boolean} visible

### `client.setBottomToolBarVisibility(isVisible)`

Tell host to toggle the toolbar. _(native only)_

- __isVisible__ {Boolean} visible

### `client.installApplication(applicationId)`

Tell host to install an application. _(native only)_

- __applicationId__ {Integer} application's id


## Host API
___Host extends Channel___

### `host.send(client, action, data) : Promise`

Get the init data from the host. ___this should be the first call for an application___

- __client__  the client id _(from the `connect` event handler)_
- __action__ the action name
- __[data]__  _(optional)_ the action data

### `host.push(client, action, data)`

same as the `send` but without a return.

- __client__  the client id _(from the `connect` event handler)_
- __action__ the action name
- __[data]__  _(optional)_ the action data


### `host.broadcast(action, data, applicationId)`

broadcast an action to __all__ clients

- __action__ the action name
- __[data]__  _(optional)_ the action data
- __[applicationId]__  _(optional)_ special an application by id


## Message API

### `message.then(handler)`

Register a handler to receive the response to a message.

- __handler__ {Function} Response handler

Example:

```js
// In host
HuobanAppSDK.host({
  init: (data, respond) => {
    // may some async action
    fetchSomething(data.app_id).then((ret) => {
      respond({ticket: ret.ticket, user: {name: 'test1', ...}})
    })
  }
})

// In client
const client = HuobanAppSDK.client()
client.send('init', { app_id: 100117 }).then((data) => {
  console.log(data.ticket, data.user, data.table)
})
```

### `respond([data])`

Send a response to a received message.

This function is passed as the second argument to message handlers.

- [__data__] {Any} _(optional)_ The data to respond to the message with.

## Author & License

created by [airwin](https://github.com/airwin) and released under the MIT license.
#  伙伴云表格 应用 JS-SDK ([英文版](./README.md))

> 构建基于 [伙伴云表格](https://app.huoban.com/) 的应用

***

- [引入](#引入)
- [初始化](#初始化)
- [SDK API](#sdk-api)
- [Channel API](#channel-api)
- [Client(应用端) API](#client-api)
- [Message API](#message-api)


## 引入

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
<script src="/node_modules/huoban-app-sdk/lib/HuobanAppSDK.js"></script>
```

## 初始化

__Client: `HuobanAppSDK.client()`__

实例化一个客户端类，用于和宿主通讯:

```js
const client = HuobanAppSDK.client()

// 发送一个动作到宿主
client.send('hello', {word: 'i am a client'}).then(message => {
  console.log(message)
})
```

__Host: `HuobanAppSDK.host()`__

实例化宿主类，可以批量传入动作回调:

```js
const host = HuobanAppSDK.host({
  init: handleClientInit
})

// 也可使用 `on` 方法增加指定动作的回调
host.on('connect', (data, respond) => {
  console.log('client connected:', data.client)
  // 在回调方法中使用 `respond` 方法回复数据
  respond('welcome')
  // 或使用第二个参数输出错误，这里代表拒绝连接
  // respond(null, 'connect refused.')
})

// 支持绑定 `*` 全局动作回调，用于接收所有动作
host.on('*', (action, data) => {
  // 注: 在全局回调中无法使用 `respond` 回复数据
  console.log('client send an action:', action, data)
})

// 给指定客户端发送动作.
// 注: 此处的 {CLIENT} 参数来自于 `connect` 动作
host.push({CLIENT}, 'app.change', {app_id: 123, name: ...})

function handleClientInit (data, respond) {
  fetchInitDataFromServer(data.app_id).then((ret) => {
    respond(ret)
  })
}
```

## SDK API

### `HuobanAppSDK.client(handlers) : Client`

初始化客户类.

- __handlers__ {Object} 包含动作和回调的对象

返回一个客户类实例 Client _(继承自 Channel)_. 相关文档见 [Channel API Docs](#channel-api).

示例:

```js
HuobanAppSDK.client({
  broadcast: (data, respond) => {
    new Notification('You have a broadcast! ' + data.action)
    respond('GOT_IT')
  }
})
```

### `HuobanAppSDK.host(handlers) : Host`

实例化宿主类.

- __handlers__ {Object} 包含动作和回调的对象

返回一个宿主类实例 Host _(继承自 Channel)_. 相关文档见 [Channel API Docs](#channel-api).

示例:

```js
HuobanAppSDK.host({
  init: handleClientInit
})
```

### `HuobanAppSDK.isAndroid` _(属性)_

__Boolean__ 是否当前为云表格安卓app环境

### `HuobanAppSDK.isIPhone` _(属性)_
__Boolean__ 是否当前为云表格iOS app环境


## Channel API

### `channel.ready(handler)`

注册一个连接(客户-宿主)成功后的回调.

- __handler__ {Function} 回调方法

尽管可以通过ready方法注册回调, 你仍然可以在连接成功之前调用
`channel.send()` 发送数据, 这些数据会被加入队列直到连接成功时发送.

示例:

```js
channel.ready(() => {
  application.start()
})
```

### `channel.send(action, data) : Promise`

通过管道发送动作到宿主/客户.

- __action__ {String} 动作
- __data__ {Any} 数据

返回一个信息实例 Message(Promise). 相关文档见 [Message API Docs](#message-api).

如果在连接成功前调用此方法，相关数据会被加入队列直到连接成功时发送.

示例:

```js
// 发送特定动作, 会触发对应的回调
channel.send('notify')

// 发送包含数据的回调
channel.send('openUrl', { url: 'https://app.huoban.com/' })
```

### `channel.push(action, data)`

通过管道推送动作到宿主/客户, 和send的区别在于无需回调.

- __action__ {String} 动作
- __data__ {Any} 数据

示例:

```js
channel.push('broadcast', {action: 'refresh'})
```

### `channel.on(action, handler) : {revoke, revokes, on}`

绑定指定动作的回调.

- __action__ {String} 动作名称
- __handler__ {Function} 回调方法

回调 handler 接受两个参数: `data`-数据, `respond`-回复该动作的方法.

返回一个对象, 用于解绑及继续绑定动作: {revoke, revokes, on}.

示例:

```js
let connectBinder = channel.on('connect', (data, respond) => {
  console.log('new connection: ', data)
  respond('ok')
})
// 在必要的时候解绑
connectBinder.revoke()
// 存在多个回调时这样解绑
connectBinder.revokes.forEach(revoke => revoke())
```

### `channel.off(action, handler)`

移除动作回调.

- __action__ {String} 指定要移除的动作, 传入`*`会移除 __所有__ 回调
- [__handler__] {Function} _(可选)_ 移除指定回调, 省略此参数则移除所有`action`对应的回调

示例:

```js
 // 移除指定的`handleClientInit`回调
channel.off('init', handleClientInit)

// 移除所有`init`动作回调
channel.off('init')

// 清空所有回调
channel.off('*')
```

### `channel.emit(action, data, respond)`

触发指定动作的回调.

- __action__ {String} 动作名称
- [__data__] {Any} _(可选)_ 数据
- [__respond__] {Function} _(可选)_ 回复方法

示例:

```js
 channel.emit('connect', {app_id: 123, ...})
```

## Client API
___Client 继承自 Channel___

### `client.init(applicationId) : Promise`

客户端获取初始化数据. ___这应该是应用加载后发起的第一个动作___

- __applicationId__ 分配的应用id

返回一个 Promise 实例, resolve 时会传入以下结构的 __data__:
  - user {Object} 当前登录用户数据
  - table {Object} 当前表格数据
  - ticket {String} 宿主发放的票据, 用于请求接口

示例:

```js
client.init(applicationId).then((data) => {
  let {user, ticket, table} = data
})
```

### `client.openWebPage(url, title)`

请求宿主使用 新页面_(不同端对应的页面概念不同)_ 打开指定`url`, 并设置标题为`title`.

- __url__ {String} 要加载的地址
- __title__ {String} 指定的页面标题

### `client.closeWebPage()`

请求宿主关闭当前页(在openWebPage打开的页面中才生效).

### `client.setTitle(title)`

设置 __当前__ 页面的标题.

- __title__ {String} 页面标题

### `client.openItemDetail(itemId)`

请求宿主打开默认的item详情页.

- __itemId__ {Integer} 数据的id

### `client.openItemList()`

请求宿主打开默认的item列表页.

### `client.openItemDiff(itemId, fromRevId, toRevId, opts = {})`

请求宿主打开diff查看组件.

- __itemId__ {Integer} 对应数据的id
- __fromRevId__ {Integer} 旧版本号
- __toRevId__ {Integer} 新版本号
- __opts__ {Object} 附加参数, 用于diff展示
  - field_id {Integer} 指定展示字段的id
  - created_by {Object} 修改者
  - created_by_id {Integer} 修改者的id
  - updated_on {String} 修改时间

示例:

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
___此方法使用`fn`参数接收回调, 而非返回Promise___

请求宿主打开筛选器组件.

- __table__ {Object} 表格对象
- __filters__ {Object} 默认筛选条件
- __fn__ {Function} 接收筛选数据的回调: fn(data, error)
  - data {Object} 成功时回调的数据, 如: _{filters: {and: [{field: 110001, query: {..}}, ..]}}_
     - filters {Object} 筛选条件对象
  - error {Object} 错误信息
    如: _{cancelled: true}_ 用户取消了本次操作, _{message: 'default value error'}_ 特定错误
     - cancelled {Boolean} 用户取消了操作时, 此项为true
     - message {String} 错误描述

示例:

```js
client.openFilter(table, null, (data) => {
  console.log('filters changed:', data.filters)
})
```

### `client.openUserPicker(opts, fn)`
___此方法使用`fn`参数接收回调, 而非返回Promise___

请求宿主打开成员选择器.

- __opts__ {Object} 选择器参数
  - values {Array} 默认选择的用户id数组, 如: [11001, 11003]
  - multi {Boolean} 是否允许多选
  - required {Boolean} 是否至少选择一个
  - title {String} 自定义选择器的标题
  - placement {String} _(只对web端有效)_ 选择器相对于触发元素的位置, 可选: left-bottom/right-bottom/left-top/right-top,  默认为: 'right-bottom'
  - width {Integer} _(只对web端有效)_ 选择器的宽度
- __fn__ {Function} 回调方法: fn(data, error)
  - data {Object} 回调的数据
    如: _{users: [{user_id: 11001, name: 'test1'}, {user_id: 11003, name: 'test2'}, ...]}_
     - users {Array} 选择的用户对象组成的数组
  - error {Object} 错误信息
    如: _{cancelled: true}_ 用户取消了本次操作, _{message: 'default value error'}_ 对应特定的错误
     - cancelled {Boolean} 用户取消了操作时, 此项为true
     - message {String} 错误描述

示例:

```js
client.openUserPicker({multi: true, values: [11001, 11003]}, (data) => {
  console.log('users picked:', data.users)
})
```

### `client.openDatePicker(opts, fn)`
___此方法使用`fn`参数接收回调, 而非返回Promise___

请求宿主打开日期选择器.

- __opts__ {Object} 选择器参数
  - [value] {String} _(可选)_ 默认值
  - [type] {String} 选择器类型: date/time/datetime
  - [showClear] {Boolean} 是否展示清除按钮用于清空已选日期
  - [showToday] {Boolean} 是否展示今天按钮用于选择当天日期
  - placement {String} _(只对web端有效)_ 选择器相对于触发元素的位置, 可选: left-bottom/right-bottom/left-top/right-top, 默认为: 'right-bottom'
- __fn__ {Function} 回调: fn(data, error)
  - data {Object} 回调的数据, 如: _{datetime: '2016-07-28 12:33', date: '2016-07-28', time: '12:33'}_
     - [datetime] {String} _(可选)_ 完整的日期+时间
     - [date] {String} _(可选)_ 选择的日期
     - [time] {String} _(可选)_ 选择的时间
  - error {Object} 错误信息
    如: _{cancelled: true}_ 用户取消了本次操作, _{message: 'default value error'}_ 对应特定的错误
     - cancelled {Boolean} 用户取消了操作时, 此项为true
     - message {String} 错误描述

示例:

```js
client.openDatePicker({value: '2016-07-27', type: 'date'}, (data) => {
  console.log('date picked:', data.date)
})
```

### `client.openRichEditor(opts, fn)`
___此方法使用`fn`参数接收回调, 而非返回Promise___

请求宿主打开富文本编辑器.

- __opts__ {Object} 选择器参数
  - [value] {String} _(可选)_ 默认文本
- __fn__ {Function} 回调: fn(data, error)
  - data {Object} 回调的数据, 如: _{value: '<p>哈哈</p>'}_
     - value {String} 编辑后的富文本
  - error {Object} 错误信息
    如: _{cancelled: true}_ 用户取消了本次操作, _{message: 'default value error'}_ 对应特定的错误
     - cancelled {Boolean} 用户取消了操作时, 此项为true
     - message {String} 错误描述

### `client.openShare(opts, fn)`
___此方法使用`fn`参数接收回调, 而非返回Promise___

请求宿主打开分享组件.

- __opts__ {Object} 分享参数
  - [title] {String} 分享的标题
  - [content] {String} 分享的描述
  - [url] {String} 分享的链接
  - [via] {String} 指定分享方式, 可以为: wechat(微信聊天)/wechat_timeline(微信朋友圈)/qq(腾讯QQ)/weibo(微博)/clipboard(
- __fn__ {Function} 回调: fn(data, error)
  - data {Object} 成功时回传的数据, 如: _{via: 'wechat'}_
     - [via] {String} 成功分享时使用的分享方式, 可以为: wechat(微信聊天)/wechat_timeline(微信朋友圈)/qq(腾讯QQ)/weibo(微博)/clipboard(系统剪切板)/browser(浏览器)/tongren(同仁app)
  - error {Object} 错误信息
    如: _{cancelled: true}_ 用户取消了本次操作, _{message: 'default value error'}_ 对应特定的错误
     - cancelled {Boolean} 用户取消了操作时, 此项为true
     - message {String} 错误描述

示例:

```js
client.openShare({title: 'huoban', content: 'welcome', url: 'https://app.huoban.com'}, (data, error) => {
  if (!error) {
    console.log('分享成功:', data.via)
  } else {
    console.log('分享失败')
  }
})
```

### `client.getSpaceMembers(opts) : Promise`

从宿主请求获取全部的工作区成员.

- __opts__ {Object} 参数
  - [keyword] {String} _(可选)_ 搜索关键字

返回一个 Promise 实例, resolve时传入 __data__:
  - members {Array} 成员对象组成的数组, _如: [{name: 'test1', user_id: 11003, avatar:..}, ..]_

示例:

```js
client.getSpaceMembers({keyword: 'air'}).then((data) => {
  console.log('got members:', data.members)
})
```

### `client.openAttachment(fileInfo)`

请求宿主展示/打开附件.

- __fileInfo__ {Object} 附件数据

### `client.genQRCode(text) : Promise`

生成二维码(dataURL格式).

- __text__ {Object} 要生成的文本

返回一个 Promise 实例, resolve时传入 __data__:
  - dataURL {String} base64编码后的dataURL, 用于在image的src中使用

示例:

```js
client.genQRCode('hello world').then((data) => {
  console.log('got dataURL:', data.dataURL)
})
```

### `client.scanQRCode(opts) : Promise`

扫描二维码. _(只在原生宿主环境生效)_

- __opts__ {Object} 参数
  - needResult {Boolean} 为 true 时将扫描结果返回

返回一个 Promise 实例, resolve时传入 __data__:
  - result {String} 扫描结果

示例:

```js
client.scanQRCode().then((data) => {
  console.log('got result:', data.result)
})
```

### `client.getLocation(opts = {}, fn)`
___此方法使用`fn`参数接收回调, 而非返回Promise___

获取当前位置.

- __opts__ {Object} 参数
  - [position] {Object} _(可选)_ 当前坐标(gcj02格式) _如: {lng: 116.397428, lat: 39.90923}_
  - enableHighAccuracy {Boolean} 是否高精度 (GPS), 默认为: true
  - timeout {Integer} 超时时间 (单位: 毫秒), 默认为 10000
  - convert {Boolean} 是否转化坐标 (wgs84 to gcj02), 默认为 true
  - title {String} 展示的标题

- __fn__ {Function} 接收筛选数据的回调: fn(data, error)
  - data {Object} 成功时回调的数据
     - location {Object} 当前位置信息 _如: {name: 'xx', address: 'xx', distance: 10, lng: 116.32, lat: 40.033}_
  - error {Object} 错误信息
    如: _{cancelled: true}_ 用户取消了本次操作, _{message: 'default value error'}_ 特定错误
     - cancelled {Boolean} 用户取消了操作时, 此项为true
     - message {String} 错误描述

示例:

```js
client.getLocation({}, (data, error) => {
  console.log('got location:', data, error)
})
```

### `client.openUserProfile(userId, opts)`

请求宿主打开用户卡片.

- __userId__ {Integer} 用户id
- __opts__ {Object} 配置参数
  - placement {String} _(只在web端生效)_ 卡片相对于触发元素的位置, 可选: left-bottom/right-bottom/left-top/right-top/bottom/top,  默认为: 'bottom'

### `client.broadcast(action, data)`

向所有 __其他__ 客户端发送广播.

- __action__ {String} 广播的动作
- [__data__] {Any} _(可选)_ 广播的数据

### `client.setPageConfig(config)`

设置当前页面的特性. _(只在原生宿主环境生效)_

- __config__ {Object}
  - landscape {Object} 横屏时页面特性
     如: _{nav_bar: false, bottom_bar: false}_
     - nav_bar {Boolean} 横屏时是否展示导航栏
     - bottom_bar {Boolean} 横屏时是否展示底栏

### `client.setNavigationBarVisibility(isVisible)`

请求宿主显示/隐藏导航栏. _(只在原生宿主环境生效)_

- __isVisible__ {Boolean} 是否可见

### `client.setBottomToolBarVisibility(isVisible)`

请求宿主显示/隐藏底栏. _(只在原生宿主环境生效)_

- __isVisible__ {Boolean} 是否可见

## Message API

### `message.then(handler)`

注册接收消息的回调.

- __handler__ {Function} 回调

示例:

```js
const client = HuobanAppSDK.client()
client.send('init', { app_id: 100117 }).then((data) => {
  console.log(data.ticket, data.user, data.table)
})
```

### `respond([data])`

回复一条收到的信息.

此方法作为消息回调的第二个参数传入.

- [__data__] {Any} _(可选)_ 回复的数据

## Author & License

created by [airwin](https://weibo.com/airwin) and released under the MIT license.
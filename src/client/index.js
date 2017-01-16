import verCmp from 'semver-compare'
import defer from 'mini-defer'
// import kjua from 'kjua'

import {isPC, isClientAndroid, isClientIOS, MSG_TYPES} from '../const'
import {cvFiltersToV1, cvFiltersToV2} from '../util'

import Channel from '../channel'

// @see https://larsjung.de/kjua/
const defaultQRCodeOptions = {
  render: 'image',
  crisp: true,
  minVersion: 1,
  ecLevel: 'L',
  size: 300,
  ratio: null,
  fill: '#333',
  back: '#fff',
  rounded: 50,
  quiet: 1,
  mode: 'plain',

  mSize: 30,
  mPosX: 50,
  mPosY: 50,

  label: '',
  fontname: 'sans',
  fontcolor: '#333',

  image: null,
  title: null,
  text: ''
}

export default class Client extends Channel {
  constructor(handlers) {
    super(handlers)
    // 业务数据
    this._ticket = null
    this._user = null
    this._table = null
    this._version = null
  }

  /**
   * 初始化应用
   * 鉴权+发放ticket
   *
   * @param  {Integer} application_id 应用/扩展的id
   * @return {Promise}
   *         .then({ticket, user, app, version}) resolve时返回：票据、当前登录用户、当前表格、客户端版本()
   *         .catch({code, message})
   */
  init(applicationId) {
    return defer().promise
  }

  /**
   * 新窗口打开指定链接
   * @param  {String} url   新窗口打开的链接地址
   * @param  {String} title 新窗口的标题
   */
  openWebPage(url, title, opts = {}) {
    this.push('openWebPage', {...opts, url, title})
  }

  /**
   * 关闭当前链接
   * (只对在新窗口中开启的应用有效)
   */
  closeWebPage() {
    this.push('closeWebPage')
  }

  /**
   * 设置页面标题(只对部分页面有效)
   * @param {String} title 标题
   */
  setTitle(title) {
    this.push('setTitle', {title})
  }

  /**
   * 设置导航栏显隐
   * @param {Boolean} isVisible 显示/隐藏
   */
  setNavigationBarVisibility(isVisible = false) {
    this.push('setNavigationBarVisibility', {is_visible: isVisible})
  }

  /**
   * 设置工具栏显隐
   * @param {Boolean} isVisible 显示/隐藏
   */
  setBottomToolBarVisibility(isVisible = false) {
    this.push('setBottomToolBarVisibility', {is_visible: isVisible})
  }

  /**
   * 广播事件
   * @param  {String} action 事件名称
   * @param  {Object} data   相关数据
   */
  broadcast(action, data) {
    this.push(MSG_TYPES.BROADCAST, data ? {action, data} : {action})
  }

  /**
   * 打开用户详情页
   * @param  {Integer} userId 用户ID
   * @param  {Object}  opts   配置参数
   *                   opts.placement {String}  [web only] 选择器的位置,可选: left-bottom/right-bottom/left-top/right-top/bottom, 默认值: bottom
   */
  openUserProfile(userId, opts = {}, _event) {
    let defaultOptions = {
      placement: 'bottom'
    }
    opts = {...defaultOptions, ...opts, user_id: userId}

    if (_event && isPC) {
      opts.ePos = this._getEventPosition(_event)
    }

    this.push('openUserProfile', opts)
  }

  /**
   * 获取指定表格信息
   * @param  {Integer} tableId 表格id
   * @return {Promise}
   *         .then({table_id: 123, name: xx, ..})
   *         .catch(err)
   */
  getTableData(tableId) {
    return this.send('getTableData', {table_id: tableId})
  }

  /**
   * 获取工作区成员列表
   * @param  {Object} opts 特殊参数
   *                  opts.keyword {String} 搜索关键字
   * @return {Promise}
   */
  getSpaceMembers(opts = {}) {
    return this.send('getSpaceMembers', opts)
  }

  /**
   * 打开筛选器
   * @param  {Object}   table   表格信息
   * @param  {Object}   filters 筛选数据
   * @param  {Function} fn      筛选器发生变化时的回调函数
   */
  openFilter(table, filters, fn) {
    let args = [].slice.apply(null, arguments)

    if (args.length = 1) {
      table = this.table
      fn = args[0]
    } else if (args.length == 2) {
      table = this.table
      filters = args[0]
      fn = args[1]
    } else if (args.length == 3) {
      table = (table && table.table_id) ? table : this.table
    }

    let params = {
      table_id: table.table_id,
      space_id: table.space_id
    }
    let isV2 = this._checkUp2V2()
    if (filters && (['object', 'function'].indexOf(typeof filters) >= 0) && filters.length !== 0) {
      params.filters = isV2 ? filters : cvFiltersToV1(filters)
    }

    // 筛选器格式转换
    let _fn
    if (fn && !isV2) {
      _fn = (data) => {
        if (data.filters) {
          data.filters = cvFiltersToV2(data.filters)
        }
        fn(data)
      }
    } else {
      _fn = fn
    }

    return this.send('openFilter', params, null, _fn)
  }

  /**
   * 打开diff展示组件
   * @param  {Integer} itemId    数据id
   * @param  {Integer} fromRevId 旧版本id
   * @param  {Integer} toRevId   新版本id
   * @param  {Object}  opts      其他参数
   *                   opts.field_id      {Integer} 指定展示的字段
   *                   opts.field_name    {String}  指定字段名称
   *                   opts.created_by_id {Integer} 更新者的用户id
   *                   opts.created_by    {Object}  更新者的用户对象
   *                   opts.updated_on    {String}  更新时间
   */
  openItemDiff(itemId, fromRevId, toRevId, opts) {
    let params
    // shorter call `fromRevId` as `opts`
    if (!toRevId && !opts && fromRevId) {
      params = {
        ...fromRevId,
        item_id: parseInt(itemId, 10),
        field_id: parseInt(fromRevId.field_id, 10)
      }
    } else {
      params = {
        ...opts,
        item_id: parseInt(itemId, 10),
        from_revision_id: parseInt(fromRevId, 10),
        to_revision_id: parseInt(toRevId, 10),
        field_id: parseInt(opts.field_id, 10)
      }
    }
    if (!params.from_revision_id && params.old_revision_id) {
      params.from_revision_id = params.old_revision_id
    }
    if (!params.to_revision_id && params.revision_id) {
      params.to_revision_id = params.revision_id
    }

    if (params.field_id && !params.field_name && this._table) {
      this._table.fields.forEach(f => {
        if (f.field_id == params.field_id) {
          params.field_name = f.name
          return false
        }
      })
    }

    delete params.old_revision_id
    delete params.revision_id
    // should pluck accepted keys from params

    this.push('openItemDiff', params)
  }

  /**
   * 打开默认item详情展示页
   * @param  {Integer} itemId 数据id
   * @param  {Object}  opts   附加参数
   */
  openItemDetail(itemId, opts = {}) {
    let params = {
      ...opts,
      item_id: parseInt(itemId, 10)
    }

    this.push('openItemDetail', params)
  }

  /**
   * 打开默认item列表展示页
   * @param  {Object} opts    附加参数
   */
  openItemList(opts = {}) {
    this.push('openItemList', opts)
  }

  /**
   * 打开用户选择组件
   * @param  {Object}   opts 参数
   *                    opts.multi     {Integer} 是否多选
   *                    opts.required  {Boolean} 是否必选
   *                    opts.values    {Array}   默认选中的用户id: [11001, 11003]
   *                    opts.title     {String}  选择器的标题,默认: 选择成员
   *                    opts.placement {String}  [web only] 选择器的位置,可选: left-bottom/right-bottom/left-top/right-top, 默认值: right-bottom
   *                    opts.width     {Integer} [web only] 选择器的宽度，默认: 300
   * @param  {Function} fn   回调方法, fn(data, error)
   *                    data 为成功时的数据: {users: [{user_id: 11001, name: 'test1'}, {user_id: 11003, name: 'test2'}, ...]}
   *                    error 为出错时的具体错误, 如: {calcelled: true} 代表用户取消了选择, 或: {message: '默认值不存在'} 代表具体信息
   * @param  {Element}  _event 内部参数，代表触发的DOM事件
   */
  openUserPicker(opts = {}, fn, _event) {
    let defaultOptions = {
      multi: false,
      required: false,
      title: '选择成员',
      placement: 'right-bottom',
      width: 300
    }
    opts = {...defaultOptions, ...opts}
    if (['left-bottom', 'left-top', 'right-top', 'right-bottom'].indexOf(opts.placement) < 0) {
      opts.placement = 'right-bottom'
    }
    if (_event && isPC) {
      opts.ePos = this._getEventPosition(_event)
    }

    return this.send('openUserPicker', opts, null, fn)
  }

  /**
   * 打开日期筛选器
   * @param  {Object}   opts 参数
   *                    opts.type      {String}  选择器类型，date/time/datetime
   *                    opts.value     {String}  初始值: '2016-06-06 11:22'
   *                    opts.showClear {Boolean} 是否显示清除按钮
   *                    opts.showToday {Boolean} 是否显示今天按钮
   *                    opts.placement {String}  [web only] 选择器的位置,可选: left-bottom/right-bottom/left-top/right-top, 默认值: right-bottom
   *                    opts.range     {Object}  [web only] 日期可选范围: {lte: '2016-11-11', gte: '2016-07-07'}
   * @param  {Function} fn   回调方法, fn(data, error)
   *                    data 为成功时的数据: {datetime: '2016-07-07 12:33', date: '2016-07-07', time: '12:33'}
   *                    error 为出错时的具体错误, 如: {calcelled: true} 代表用户取消了选择, 或: {message: '默认值不正确'} 代表具体信息
   * @param  {Element}  _event 内部参数，代表触发的DOM事件
   */
  openDatePicker(opts = {}, fn, _event) {
    let defaultOptions = {
      type: 'date',
      placement: 'right-bottom'
    }
    opts = {...defaultOptions, ...opts}

    if (_event && isPC) {
      opts.ePos = this._getEventPosition(_event)
    }

    return this.send('openDatePicker', opts, null, fn)
  }

  /**
   * 打开富文本编辑器
   * @param  {Object}   opts 配置参数
   *                    opts.value  {String}  默认的富文本
   * @param  {Function} fn   回调方法, fn(data, error)
   *                    data 为成功时的数据: {value: '<p>123</p>'}
   *                    error 为出错时的具体错误, 如: {calcelled: true} 代表用户取消了选择, 或: {message: '默认值不正确'} 代表具体信息
   */
  openRichEditor(opts = {}, fn) {
    let defaultOptions = {
      value: ''
    }
    opts = {...defaultOptions, ...opts}

    return this.send('openRichEditor', opts, null, fn)
  }

  /**
   * 打开分享
   * @param  {Object}   opts   参数
   *                    opts.title      {String}  分享的标题
   *                    opts.content    {String}  分享的描述
   *                    opts.url        {String}  分享的数据地址
   *                    opts.via        {String}  指定分享的方式, 可以为: wechat/wechat_timeline/qq/weibo/clipboard/browser
   * @param  {Function} fn   回调方法, fn(data, error)
   *                    data 为成功时回传的数据, 如: {via: 'wechat'} 代表通过微信分享, 可能的方式有: wechat/wechat_timeline/qq/weibo/clipboard/browser
   *                    error 为出错时的具体错误, 如: {calcelled: true} 代表用户取消了选择, 或: {message: '分享失败'} 代表具体信息
   * @param  {[type]}   _event 内部参数，代表触发的DOM事件
   */
  openShare(opts = {}, fn, _event) {
    let defaultOptions = {
      title: '',
      content: '',
      image: '',
      via: '',
      url: '', // 分享的内容的地址：链接 / 图片 / 文件
      type: '' // url(default) / image / file
    }
    opts = {...defaultOptions, ...opts}

    if (_event && isPC) {
      opts.ePos = this._getEventPosition(_event)
    }

    return this.send('openShare', opts, null, fn)
  }

  /**
   * 打开附件
   * @param  {Object}  fileInfo 附件对象
   * @param  {Object}  opts     其他配置
   * @param  {DOMEvent} _event  事件对象，用于定位需求
   */
  openAttachment(fileInfo, opts = {}, _event) {
    if (isPC) {
      // web端暂无附件详情展现，这里直接打开源地址
      return window.open(fileInfo.link.source)
      // if (_event) {
      //   opts.ePos = this._getEventPosition(_event)
      // }
    }

    opts.file_info = fileInfo

    this.push('openAttachment', opts)
  }

  /**
   * 生成二维码的base64编码
   * @param  {String} text 要编码的字符串
   * @param  {Object} opts 二维码相关参数(kjua)
   * @return {String}      编码后的dateURL base64格式
   */
  // generateQrcode(text, opts = {}) {
  //   opts = {...defaultQRCodeOptions, ...opts, text, render: 'canvas'}

  //   return kjua(opts).toDataURL('image/png')
  // }

  /**
   * 生成二维码的base64编码 (web only)
   * @param  {String} text 要编码的字符串
   * @param  {Object} opts 二维码相关参数(kjua)
   * @return {Promise}
   */
  genQRCode(text, opts = {}) {
    opts = {...defaultQRCodeOptions, ...opts, text}

    return this.send('genQRCode', opts)
  }

  /**
   * 生成并展示一个二维码 (web only)
   * @param  {String} text   源文本
   * @param  {Object} opts   二维码相关参数(kjua)
   * @param  {Object} _event 内部参数，代表触发的DOM事件
   */
  showQRCode(text, opts = {}, _event) {
    opts = {...defaultQRCodeOptions, ...opts, text}

    if (_event && isPC) {
      opts.ePos = this._getEventPosition(_event)
    }

    this.push('showQRCode', opts)
  }

  /**
   * 唤起扫码
   * @param  {Object}   opts 扫码参数
   * @param  {Function} fn   回调
   * @return {Promise}
   */
  scanQRCode(opts = {}) {
    // 默认回传给应用
    if (typeof opts.needResult != 'boolean') {
      opts.needResult = true
    }

    return this.send('scanQRCode', opts)
  }

  /**
   * 获取地理位置
   * @param  {Object}   opts   geo参数
   * @param  {Function} fn     回调
   * @param  {[type]}   _event 内部参数，表示触发的DOM元素
   */
  getLocation(opts = {}, fn, _event) {
    let defaultOptions = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 10000,
      convert: true,
      title: '选择地址',
      placement: 'left-bottom'
    }
    opts = {...defaultOptions, ...opts}

    if (_event && isPC) {
      opts.ePos = this._getEventPosition(_event)
    }

    return this.send('getLocation', opts, null, fn)
  }

  /**
   * 设置页面参数
   * @param {Object} config 页面参数
   */
  setPageConfig(config) {
    this.push('setPageConfig', {config})
  }

  /**
   * 安装应用
   * @param  {Integer} applicationId 应用的id
   */
  installApplication(applicationId) {
    this.push('installApplication', {application_id: applicationId})
  }

  /**
   * 安装模板
   * @param  {Integer} packageId 模板的id
   */
  installPackage(packageId) {
    this.push('installPackage', {package_id: packageId})
  }

  _init(applicationId) {
    return this.send('init', {application_id: applicationId}).then(ret => {
      this._ticket = ret.ticket
      this._user = ret.user
      this._table = ret.table || ret.app
      // 兼容旧的数据命名，避免图表应用报错
      let tableId = this._table.table_id || this._table.app_id
      this._table.app_id = this._table.table_id = tableId
      this._version = ret.version
      this.applicationId = applicationId

      return {...ret, app: this._table, table: this._table}
    })
  }

  _getEventPosition(e) {
    let target = e.currentTarget || e.target
    let rect = target.getBoundingClientRect()
    let {top, bottom, left, right, width, height} = rect
    let {clientX, clientY, offsetX, offsetY} = e

    return {
      target: {top, bottom, left, right, width, height, offsetWidth: e.target.offsetWidth, offsetHeight: e.target.offsetHeight},
      clientX,
      clientY,
      offsetX,
      offsetY
    }
  }

  _checkUp2V2() {
    let upgraded

    if (isClientAndroid) {
      upgraded = verCmp(this._version, '2.4.0') >= 0
    } else if (isClientIOS) {
      upgraded = verCmp(this._version, '140') >= 0
    } else {
      upgraded = verCmp(this._version, '4.1') >= 0
    }

    return upgraded
  }
}

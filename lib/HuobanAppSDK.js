(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("HuobanAppSDK", [], factory);
	else if(typeof exports === 'object')
		exports["HuobanAppSDK"] = factory();
	else
		root["HuobanAppSDK"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.isPC = exports.isWap = exports.isMobile = exports.isIPad = exports.isIPhone = exports.isAndroid = undefined;
	exports.client = client;
	exports.host = host;
	
	var _const = __webpack_require__(1);
	
	var ConstVars = _interopRequireWildcard(_const);
	
	var _browser = __webpack_require__(2);
	
	var _browser2 = _interopRequireDefault(_browser);
	
	var _webview = __webpack_require__(8);
	
	var _webview2 = _interopRequireDefault(_webview);
	
	var _webview_url = __webpack_require__(9);
	
	var _webview_url2 = _interopRequireDefault(_webview_url);
	
	var _host = __webpack_require__(10);
	
	var _host2 = _interopRequireDefault(_host);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var isAndroid = exports.isAndroid = ConstVars.isAndroid;
	var isIPhone = exports.isIPhone = ConstVars.isIPhone;
	var isIPad = exports.isIPad = ConstVars.isIPad;
	var isMobile = exports.isMobile = ConstVars.isMobile;
	var isWap = exports.isWap = ConstVars.isWap;
	var isPC = exports.isPC = ConstVars.isPC;
	
	var instance = {
	  client: {}
	};
	var clientMapping = {
	  android: _webview_url2.default,
	  ios: _webview2.default,
	  browser: _browser2.default
	};
	
	function initClient(type) {
	  if (type && clientMapping[type]) {
	    return new clientMapping[type]();
	  }
	
	  throw new Error('unknown client type');
	}
	
	function client(handlers, type) {
	  if (!type) {
	    if (isPC || isWap) {
	      type = 'browser';
	    } else if (isAndroid) {
	      type = 'android';
	    } else if (isIPhone || isIPad) {
	      type = 'ios';
	    } else {
	      type = 'browser';
	    }
	  }
	
	  if (!instance.client[type]) {
	    instance.client[type] = initClient(type);
	  }
	
	  if (handlers) {
	    instance.client[type].on(handlers);
	  }
	
	  return instance.client[type];
	}
	
	function host(handlers) {
	  if (!instance.host) {
	    instance.host = new _host2.default();
	    instance.host.init();
	  }
	
	  if (handlers) {
	    instance.host.on(handlers);
	  }
	
	  return instance.host;
	}

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var UA = navigator.userAgent;
	
	var isAndroid = exports.isAndroid = !!UA.match(/(Android);?[\s\/]+([\d.]+)?/);
	var isIPad = exports.isIPad = !!UA.match(/(iPad).*OS\s([\d_]+)/);
	var isIPhone = exports.isIPhone = !isIPad && !!UA.match(/(iPhone\sOS)\s([\d_]+)/);
	var isMobile = exports.isMobile = isAndroid || isIPhone || isIPad;
	var isInFrame = exports.isInFrame = window.parent !== window;
	var isWap = exports.isWap = isMobile && isInFrame;
	var isPC = exports.isPC = !isMobile && !isWap && isInFrame;
	
	var HB_HOST = exports.HB_HOST = '*';
	
	var MSG_TYPES = exports.MSG_TYPES = {
	  CONNECT: '$connect$',
	  DISCONNECT: '$disconnect$',
	  CLOSE: '$close$',
	  PING: '$ping$',
	  BROADCAST: 'broadcast'
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _miniDefer = __webpack_require__(3);
	
	var _miniDefer2 = _interopRequireDefault(_miniDefer);
	
	var _util = __webpack_require__(4);
	
	var _const = __webpack_require__(1);
	
	var _index = __webpack_require__(5);
	
	var _index2 = _interopRequireDefault(_index);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ClientBrowser = function (_Client) {
	  _inherits(ClientBrowser, _Client);
	
	  function ClientBrowser() {
	    _classCallCheck(this, ClientBrowser);
	
	    return _possibleConstructorReturn(this, (ClientBrowser.__proto__ || Object.getPrototypeOf(ClientBrowser)).apply(this, arguments));
	  }
	
	  _createClass(ClientBrowser, [{
	    key: 'init',
	    value: function init(applicationId) {
	      var deferred = (0, _miniDefer2.default)();
	
	      if (window.parent === window) {
	        (0, _util.delay)(function (r) {
	          deferred.reject({ message: '无法找到宿主环境' });
	        });
	        return deferred.promise;
	      }
	      if (!window.MessageChannel) {
	        (0, _util.delay)(function (r) {
	          deferred.reject({ message: '您的浏览器不支持 MessageChannel' });
	        });
	        return deferred.promise;
	      }
	
	      if (this._ticket && this._user) {
	        deferred.resolve({
	          ticket: this._ticket,
	          user: this._user,
	          app: this._table,
	          table: this._table,
	          version: this._version
	        });
	        return deferred.promise;
	      }
	
	      this._id = this._unique_id('c_', 8);
	
	      var mc = new MessageChannel();
	      this.port = mc.port1;
	      this.port.onmessage = this.handleMessage.bind(this);
	
	      window.parent.postMessage(_const.MSG_TYPES.CONNECT + ':' + applicationId + ':' + this._id, _const.HB_HOST, [mc.port2]);
	
	      return this._init(applicationId);
	    }
	  }, {
	    key: '_send',
	    value: function _send(action, data, id) {
	      var payload = { action: action };
	      if (data) {
	        payload.data = data;
	      }
	      if (id) {
	        payload.id = id;
	      }
	
	      this.port.postMessage(payload);
	    }
	  }, {
	    key: '_processMessage',
	    value: function _processMessage(e) {
	      var eData = e.data;
	      switch (eData.action) {
	        case _const.MSG_TYPES.CONNECT:
	          if (eData.data.error) {
	            this.emit('error', _extends({}, eData.data.error, { type: 'connect' }));
	            this.emit('error.connect', eData.data.error);
	          } else {
	            this.connect.resolve(eData.data.result);
	          }
	          return false;
	        case _const.MSG_TYPES.CLOSE:
	          this.destroy();
	          return false;
	        case _const.MSG_TYPES.PING:
	          this.push(_const.MSG_TYPES.PING);
	          return false;
	      }
	    }
	  }, {
	    key: 'handleWindowBeforeUnload',
	    value: function handleWindowBeforeUnload(e) {
	      this._disconnect();
	    }
	  }, {
	    key: '_disconnect',
	    value: function _disconnect() {
	      this.push(_const.MSG_TYPES.DISCONNECT);
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      _get(ClientBrowser.prototype.__proto__ || Object.getPrototypeOf(ClientBrowser.prototype), 'destroy', this).call(this);
	      if (this.port) {
	        this._disconnect();
	        this.port.close();
	        this.port = null;
	      }
	    }
	  }]);
	
	  return ClientBrowser;
	}(_index2.default);
	
	exports.default = ClientBrowser;
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict'
	
	/* global Promise:false */
	
	/**
	 * Create a deferred.
	 * @returns {Object}
	 */
	function defer () {
	  var res
	  var rej
	  var promise = new Promise(function (resolve, reject) {
	    res = resolve
	    rej = reject
	  })
	  return {
	    promise: promise,
	    resolve: res,
	    reject: rej
	  }
	}
	
	/* global define:false window:false */
	if (true) {
	  !(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
	    return defer
	  }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
	} else if (typeof module === 'object' && module.exports) {
	  module.exports = defer
	} else if (typeof window !== 'undefined') {
	  window.miniDefer = defer
	} else {
	  throw new Error(
	    'Environment is not supported. ' +
	    'Please raise an issue at https://github.com/sdgluck/mini-defer/issues'
	  )
	}


/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var toString = Object.prototype.toString;
	
	var delay = exports.delay = function delay(fn, ms) {
	  return setTimeout(fn, ms || 0);
	};
	
	var isArray = exports.isArray = function isArray(value) {
	  return Array.isArray ? Array.isArray(value) : toString.call(value) === '[object Array]';
	};
	var isObject = exports.isObject = function isObject(value) {
	  return toString.call(value) === '[object Object]';
	};
	var isBool = exports.isBool = function isBool(value) {
	  return toString.call(value) === '[object Boolean]';
	};
	var isString = exports.isString = function isString(value) {
	  return toString.call(value) === '[object String]';
	};
	
	function _cvFilterToV1(filter) {
	  var nf = { key: filter.field || filter.key };
	
	  if (!filter.query) {
	    filter.query = {};
	  }
	
	  if (filter.key == 'created_by') {
	    nf.values = filter.query.in;
	  } else if (filter.key == 'create_on') {
	    nf.values = _extends({}, filter.query);
	  } else {
	    if (isArray(filter.query.in)) {
	      if (isString(filter.query.in[0]) && filter.query.in[0] != 'myself') {
	        nf.keywords = filter.query.in;
	      } else {
	        nf.values = filter.query.in;
	      }
	    } else {
	      nf.values = _extends({}, filter.query);
	    }
	    if (isBool(filter.query.em)) {
	      nf.is_set = !filter.query.em;
	    }
	    if (filter.query.in_field) {
	      nf.fields = filter.query.in_field;
	    }
	
	    if (isArray(filter.query.inc)) {
	      nf.values = filter.query.inc;
	    }
	  }
	
	  return nf;
	}
	function _cvFilterToV2(filter) {
	  var nf = { field: filter.key, query: {} };
	
	  if (filter.key == 'created_by') {
	    nf.query.in = filter.values;
	  } else if (filter.key == 'create_on') {
	    nf.query = _extends({}, filter.values);
	  } else {
	    if (isObject(filter.values)) {
	      nf.query = _extends({}, filter.values);
	    } else if (isArray(filter.values)) {
	      nf.query.in = filter.values;
	    }
	    if (filter.keywords && isArray(filter.keywords) && filter.keywords.length) {
	      nf.query.in = filter.keywords;
	    }
	    if (filter.is_set === true || filter.is_set === false) {
	      nf.query.em = !filter.is_set;
	    }
	    if (filter.fields) {
	      nf.query.in_field = filter.fields;
	    }
	
	    if (isArray(filter.within)) {
	      nf.query.inc = filter.within;
	    }
	  }
	
	  return nf;
	}
	
	var cvFiltersToV1 = exports.cvFiltersToV1 = function cvFiltersToV1(filters) {
	  var ops = Object.keys(filters);
	  var newFilters = {};
	
	  ops.forEach(function (op) {
	    if (isObject(filters[op])) {
	      newFilters[op] = cvFiltersToV1(filters[op]);
	    } else if (isArray(filters[op])) {
	      newFilters[op] = filters[op].map(_cvFilterToV1);
	    }
	  });
	
	  return newFilters;
	};
	
	var cvFiltersToV2 = exports.cvFiltersToV2 = function cvFiltersToV2(filters) {
	  var ops = Object.keys(filters);
	  var newFilters = {};
	
	  ops.forEach(function (op) {
	    if (isObject(filters[op])) {
	      newFilters[op] = cvFiltersToV2(filters[op]);
	    } else if (isArray(filters[op])) {
	      newFilters[op] = filters[op].map(_cvFilterToV2);
	    }
	  });
	
	  return newFilters;
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _miniDefer = __webpack_require__(3);
	
	var _miniDefer2 = _interopRequireDefault(_miniDefer);
	
	var _const = __webpack_require__(1);
	
	var _util = __webpack_require__(4);
	
	var _channel = __webpack_require__(6);
	
	var _channel2 = _interopRequireDefault(_channel);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Client = function (_Channel) {
	  _inherits(Client, _Channel);
	
	  function Client(handlers) {
	    _classCallCheck(this, Client);
	
	    var _this = _possibleConstructorReturn(this, (Client.__proto__ || Object.getPrototypeOf(Client)).call(this, handlers));
	
	    _this._ticket = null;
	    _this._user = null;
	    _this._table = null;
	    _this._version = null;
	    return _this;
	  }
	
	  _createClass(Client, [{
	    key: 'init',
	    value: function init(applicationId) {
	      return (0, _miniDefer2.default)().promise;
	    }
	  }, {
	    key: 'openWebPage',
	    value: function openWebPage(url, title) {
	      this.push('openWebPage', { url: url, title: title });
	    }
	  }, {
	    key: 'closeWebPage',
	    value: function closeWebPage() {
	      this.push('closeWebPage');
	    }
	  }, {
	    key: 'setTitle',
	    value: function setTitle(title) {
	      this.push('setTitle', { title: title });
	    }
	  }, {
	    key: 'setNavigationBarVisibility',
	    value: function setNavigationBarVisibility() {
	      var isVisible = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
	
	      this.push('setNavigationBarVisibility', { is_visible: isVisible });
	    }
	  }, {
	    key: 'setBottomToolBarVisibility',
	    value: function setBottomToolBarVisibility() {
	      var isVisible = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];
	
	      this.push('setBottomToolBarVisibility', { is_visible: isVisible });
	    }
	  }, {
	    key: 'broadcast',
	    value: function broadcast(action, data) {
	      this.push(_const.MSG_TYPES.BROADCAST, data ? { action: action, data: data } : { action: action });
	    }
	  }, {
	    key: 'openUserProfile',
	    value: function openUserProfile(userId) {
	      var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	      var _event = arguments[2];
	
	      var defaultOptions = {
	        placement: 'bottom'
	      };
	      opts = _extends({}, defaultOptions, opts, { user_id: userId });
	
	      if (_event && _const.isPC) {
	        opts.ePos = this._getEventPosition(_event);
	      }
	
	      this.push('openUserProfile', opts);
	    }
	  }, {
	    key: 'getTableData',
	    value: function getTableData(tableId) {
	      return this.send('getTableData', { table_id: tableId });
	    }
	  }, {
	    key: 'getAppData',
	    value: function getAppData(tableId) {
	      return this.getTableData(tableId);
	    }
	  }, {
	    key: 'getSpaceMembers',
	    value: function getSpaceMembers() {
	      var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	      return this.send('getSpaceMembers', opts);
	    }
	  }, {
	    key: 'openFilter',
	    value: function openFilter(app, filters, viewId, fn, _event) {
	      var params = {
	        table_id: app.app_id || app.table_id,
	        space_id: app.space_id
	      };
	      if (filters) {
	        params.filters = (0, _util.cvFiltersToV1)(filters);
	      }
	      if (viewId) {
	        if (typeof viewId == 'function') {
	          fn = viewId;
	        } else if (viewId > 0) {
	          params.viewId = parseInt(viewId, 10);
	        }
	      }
	
	      var _fn = void 0;
	      if (fn) {
	        _fn = function _fn(data) {
	          if (data.filters) {
	            data.filters = (0, _util.cvFiltersToV2)(data.filters);
	          }
	          fn(data);
	        };
	      }
	
	      if (_event && _const.isPC) {
	        params.ePos = this._getEventPosition(_event);
	      }
	
	      return this.send('openFilter', params, null, _fn);
	    }
	  }, {
	    key: 'openItemDiff',
	    value: function openItemDiff(itemId, fromRevId, toRevId) {
	      var opts = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
	
	      var params = _extends({}, opts, {
	        item_id: parseInt(itemId, 10),
	        from_revision_id: parseInt(fromRevId, 10),
	        to_revision_id: parseInt(toRevId, 10),
	        field_id: parseInt(opts.field_id, 10)
	      });
	      if (params.field_id && !params.field_name && this._table) {
	        this._table.fields.forEach(function (f) {
	          if (f.field_id == params.field_id) {
	            params.field_name = f.name;
	            return false;
	          }
	        });
	      }
	
	      this.push('openItemDiff', params);
	    }
	  }, {
	    key: 'openItemDetail',
	    value: function openItemDetail(itemId) {
	      var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	      var params = _extends({}, opts, {
	        item_id: parseInt(itemId, 10)
	      });
	
	      this.push('openItemDetail', params);
	    }
	  }, {
	    key: 'openItemList',
	    value: function openItemList() {
	      var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	      this.push('openItemList', opts);
	    }
	  }, {
	    key: 'openUserPicker',
	    value: function openUserPicker() {
	      var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	      var fn = arguments[1];
	      var _event = arguments[2];
	
	      var defaultOptions = {
	        multi: false,
	        required: false,
	        title: '选择成员',
	        placement: 'right-bottom',
	        width: 300
	      };
	      opts = _extends({}, defaultOptions, opts);
	      if (_event && _const.isPC) {
	        opts.ePos = this._getEventPosition(_event);
	      }
	
	      return this.send('openUserPicker', opts, null, fn);
	    }
	  }, {
	    key: 'openDatePicker',
	    value: function openDatePicker() {
	      var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	      var fn = arguments[1];
	      var _event = arguments[2];
	
	      var defaultOptions = {
	        type: 'date',
	        placement: 'right-bottom'
	      };
	      opts = _extends({}, defaultOptions, opts);
	
	      if (_event && _const.isPC) {
	        opts.ePos = this._getEventPosition(_event);
	      }
	
	      return this.send('openDatePicker', opts, null, fn);
	    }
	  }, {
	    key: 'openRichEditor',
	    value: function openRichEditor() {
	      var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	      var fn = arguments[1];
	
	      var defaultOptions = {
	        value: ''
	      };
	      opts = _extends({}, defaultOptions, opts);
	
	      return this.send('openRichEditor', opts, null, fn);
	    }
	  }, {
	    key: 'openShare',
	    value: function openShare() {
	      var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	      var fn = arguments[1];
	      var _event = arguments[2];
	
	      var defaultOptions = {
	        title: '',
	        content: '',
	        url: '',
	        via: ''
	      };
	      opts = _extends({}, defaultOptions, opts);
	
	      if (_event && _const.isPC) {
	        opts.ePos = this._getEventPosition(_event);
	      }
	
	      return this.send('openShare', opts, null, fn);
	    }
	  }, {
	    key: 'openAttachment',
	    value: function openAttachment(fileInfo) {
	      var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	      var _event = arguments[2];
	
	      if (_const.isPC) {
	        return window.open(fileInfo.link.source);
	      }
	
	      opts.file_info = fileInfo;
	
	      this.push('openAttachment', opts);
	    }
	  }, {
	    key: 'showQRCode',
	    value: function showQRCode(text) {
	      var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	      var _event = arguments[2];
	
	      var defaultOptions = {
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
	        title: null
	      };
	      opts = _extends({}, defaultOptions, opts, { text: text });
	
	      if (_event && _const.isPC) {
	        opts.ePos = this._getEventPosition(_event);
	      }
	
	      this.push('showQRCode', opts);
	    }
	  }, {
	    key: 'scanQRCode',
	    value: function scanQRCode() {
	      var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	      if (typeof opts.needResult != 'boolean') {
	        opts.needResult = true;
	      }
	
	      return this.send('scanQRCode', opts);
	    }
	  }, {
	    key: 'getLocation',
	    value: function getLocation() {
	      var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	      var fn = arguments[1];
	      var _event = arguments[2];
	
	      var defaultOptions = {
	        enableHighAccuracy: true,
	        timeout: 5000,
	        maximumAge: 10000,
	        convert: true,
	        title: '选择地址',
	        placement: 'left-bottom'
	      };
	      opts = _extends({}, defaultOptions, opts);
	
	      if (_event && _const.isPC) {
	        opts.ePos = this._getEventPosition(_event);
	      }
	
	      return this.send('getLocation', opts, null, fn);
	    }
	  }, {
	    key: 'setPageConfig',
	    value: function setPageConfig(config) {
	      this.push('setPageConfig', { config: config });
	    }
	  }, {
	    key: 'installApplication',
	    value: function installApplication(applicationId) {
	      this.push('installApplication', { application_id: applicationId });
	    }
	  }, {
	    key: '_init',
	    value: function _init(applicationId) {
	      var _this2 = this;
	
	      return this.send('init', { application_id: applicationId }).then(function (ret) {
	        _this2._ticket = ret.ticket;
	        _this2._user = ret.user;
	        _this2._table = ret.table || ret.app;
	
	        if (!_this2._table.app_id && _this2._table.table_id) {
	          _this2._table.app_id = _this2._table.table_id;
	        }
	        _this2._version = ret.version;
	        _this2.appId = applicationId;
	
	        return _extends({}, ret, { app: _this2._table, table: _this2._table });
	      });
	    }
	  }, {
	    key: '_getEventPosition',
	    value: function _getEventPosition(e) {
	      var target = e.currentTarget || e.target;
	      var rect = target.getBoundingClientRect();
	      var top = rect.top;
	      var bottom = rect.bottom;
	      var left = rect.left;
	      var right = rect.right;
	      var width = rect.width;
	      var height = rect.height;
	
	
	      return {
	        target: { top: top, bottom: bottom, left: left, right: right, width: width, height: height, offsetWidth: e.target.offsetWidth, offsetHeight: e.target.offsetHeight },
	        clientX: e.clientX,
	        clientY: e.clientY,
	        offsetX: e.offsetX,
	        offsetY: e.offsetY
	      };
	    }
	  }]);
	
	  return Client;
	}(_channel2.default);
	
	exports.default = Client;
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _uniqId = __webpack_require__(7);
	
	var _uniqId2 = _interopRequireDefault(_uniqId);
	
	var _miniDefer = __webpack_require__(3);
	
	var _miniDefer2 = _interopRequireDefault(_miniDefer);
	
	var _const = __webpack_require__(1);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Channel = function () {
	  function Channel(handlers) {
	    _classCallCheck(this, Channel);
	
	    this.connect = (0, _miniDefer2.default)();
	
	    this.promises = {};
	    this.handlers = {};
	
	    if (handlers) {
	      this.on(handlers);
	    }
	  }
	
	  _createClass(Channel, [{
	    key: 'ready',
	    value: function ready(fn) {
	      this.connect.promise.then(fn);
	      return this;
	    }
	  }, {
	    key: 'on',
	    value: function on(action, fn, replace) {
	      var _this = this;
	
	      var revokes = void 0;
	      if (!fn && (typeof action === 'undefined' ? 'undefined' : _typeof(action)) == 'object') {
	        revokes = [];
	        Object.keys(action).forEach(function (key) {
	          revokes.push(_this._on(key, action[key], replace));
	        });
	      } else {
	        revokes = [this._on(action, fn, replace)];
	      }
	
	      return {
	        on: this.on.bind(this),
	        revoke: revokes[0],
	        revokes: revokes
	      };
	    }
	  }, {
	    key: '_on',
	    value: function _on(action, fn, replace) {
	      var _this2 = this;
	
	      var revoke = function revoke() {};
	      if (action && fn) {
	        if (replace || !this.handlers[action]) {
	          this.handlers[action] = [];
	        }
	        this.handlers[action].push(fn);
	        revoke = function revoke() {
	          _this2.off(action, fn);
	        };
	      }
	
	      return revoke;
	    }
	  }, {
	    key: 'off',
	    value: function off(action, fn) {
	      if (action && this.handlers[action]) {
	        if (fn) {
	          var idx = this.handlers[action].indexOf(fn);
	          if (idx >= 0) {
	            this.handlers[action].splice(idx, 1);
	          }
	        } else {
	          this.handlers[action] = [];
	        }
	      } else if (action == '!') {
	        this.handlers = {};
	      }
	
	      return this;
	    }
	  }, {
	    key: 'emit',
	    value: function emit(action, data, responder) {
	      var ret = [];
	      var halted = false;
	      if (action && this.handlers[action]) {
	        var handlers = this.handlers[action];
	        ret = handlers.map(function (fn) {
	          var _ret = void 0;
	          if (!halted) {
	            _ret = fn(data, responder);
	            if (false === _ret) {
	              halted = true;
	            }
	          }
	          return _ret;
	        });
	      }
	
	      if (action != '*' && this.handlers['*']) {
	        ret = ret.concat(this.handlers['*'].map(function (fn) {
	          return fn(action, data);
	        }));
	      }
	
	      return ret;
	    }
	  }, {
	    key: 'push',
	    value: function push(action) {
	      var _this3 = this;
	
	      var data = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
	
	      this.ready(function () {
	        _this3._send(action, data);
	      });
	    }
	  }, {
	    key: 'send',
	    value: function send(action, data, _id, fn) {
	      var _this4 = this;
	
	      var id = _id || this._unique_id();
	
	      this.ready(function () {
	        _this4._send(action, data, id);
	      });
	
	      if (fn && typeof fn == 'function') {
	        this.promises[id] = fn;
	        return id;
	      } else {
	        var deferred = (0, _miniDefer2.default)();
	        this.promises[id] = deferred;
	
	        return deferred.promise;
	      }
	    }
	  }, {
	    key: 'handleMessage',
	    value: function handleMessage(e) {
	      var _this5 = this;
	
	      if (false === this._processMessage(e)) {
	        return;
	      }
	
	      var eData = void 0,
	          id = void 0,
	          action = void 0,
	          data = void 0;
	      try {
	        eData = e.data;
	        if (typeof eData == 'string') {
	          if (_const.isIPhone || _const.isIPad) {
	            eData = eData.replace(/[\r\n\t]+/g, '');
	          }
	          eData = JSON.parse(eData);
	        }
	        if (!eData.action && !eData.id && !eData.callback) throw new Error();
	      } catch (err) {
	        this.emit('error', { type: 'json', source: eData, err: err });
	        this.emit('error.json', { source: eData, err: err });
	
	        alert('HB_APP_SDK: json parse fail\n' + eData);
	        throw new Error('HB_APP_SDK: malformed message');
	      }
	
	      id = eData.id || eData.callback;
	      action = eData.action;
	      data = eData.params || eData.data;
	
	      if (id) {
	        if (id in this.promises) {
	          var promise = this.promises[id];
	
	          if (promise.resolve) {
	            if (eData.error) {
	              promise.reject(eData.error);
	            } else if (eData.result) {
	              promise.resolve(eData.result);
	            } else {
	              promise.reject({ cancelled: true });
	            }
	            this.promises[id] = null;
	          } else {
	            if (eData.result || eData.error) {
	              this.promises[id](eData.result, eData.error);
	            } else {
	              this.promises[id](null, { cancelled: true });
	            }
	          }
	        } else if (action && this.handlers[action]) {
	          var responder = function responder(ret) {
	            _this5.send(action, ret, id);
	          };
	          this.emit(action, data, responder);
	        }
	      } else if (action) {
	        this.emit(action, data);
	        if (data && data.action) {
	          this.emit(action + '.' + data.action, data.data);
	        }
	      } else {
	        this.emit('*', data);
	      }
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this.off('!');
	      this.connect = (0, _miniDefer2.default)();
	    }
	  }, {
	    key: '_send',
	    value: function _send() {}
	  }, {
	    key: '_processMessage',
	    value: function _processMessage(e) {
	      return e;
	    }
	  }, {
	    key: '_unique_id',
	    value: function _unique_id() {
	      var prefix = arguments.length <= 0 || arguments[0] === undefined ? 'cb_' : arguments[0];
	      var length = arguments.length <= 1 || arguments[1] === undefined ? 10 : arguments[1];
	      var decimal = arguments.length <= 2 || arguments[2] === undefined ? 16 : arguments[2];
	
	      var x64 = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
	
	      return _uniqId2.default.generateUUID(prefix + x64.substr(0, length), decimal)();
	    }
	  }]);
	
	  return Channel;
	}();
	
	exports.default = Channel;
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports) {

	var UUID,
	    SEQUENCE = 'xxxxyxxxxyxxxxyxxxxy',
	    CHARS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
	    CHAR_N = 16;
	
	function generateUUID(sequence, charN) {
	    sequence = typeof sequence === 'string' ? sequence : SEQUENCE;
	
	    charN = typeof charN === 'number' ? charN : CHAR_N;
	
	    var chars = CHARS.slice(0, charN);
	
	    function UUID() {
	        var d = new Date().getTime();
	        var L = chars.length;
	        return sequence.replace(/[xy]/g, function(c) {
	            var r = (d + Math.random()*L)%L | 0;
	            d = Math.floor(d/L);
	            return chars[(c === 'x' ? r : (r&0x3|0x8))];
	        });
	    }
	
	    return UUID;
	}
	
	UUID = generateUUID();
	
	UUID.generateUUID = generateUUID;
	
	module.exports = UUID;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _index = __webpack_require__(5);
	
	var _index2 = _interopRequireDefault(_index);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ClientWebview = function (_Client) {
	  _inherits(ClientWebview, _Client);
	
	  function ClientWebview() {
	    _classCallCheck(this, ClientWebview);
	
	    return _possibleConstructorReturn(this, (ClientWebview.__proto__ || Object.getPrototypeOf(ClientWebview)).apply(this, arguments));
	  }
	
	  _createClass(ClientWebview, [{
	    key: 'init',
	    value: function init(applicationId) {
	      this.connect.resolve();
	
	      window.HB = window.HB || {};
	      window.HB.bridgeCallback = this.handleBridgeInvoke.bind(this, 'callback');
	      window.HB.bridgeCancel = this.handleBridgeInvoke.bind(this, 'cancel');
	      window.HB.bridgeEmit = this.handleBridgeInvoke.bind(this, 'emit');
	
	      return this._init(applicationId);
	    }
	  }, {
	    key: '_send',
	    value: function _send(action, data, id) {
	      var urlArr = ['huoban://hybrid?action=' + encodeURIComponent(action)];
	      if (id) {
	        urlArr.push('callback=' + encodeURIComponent(id));
	      }
	      if (data) {
	        urlArr.push('params=' + encodeURIComponent(JSON.stringify(data)));
	      }
	
	      var url = urlArr.join('&');
	      this._invokeNative(url);
	    }
	  }, {
	    key: '_invokeNative',
	    value: function _invokeNative(url) {
	      var iframe = document.createElement('iframe');
	      iframe.style.width = 0;
	      iframe.style.height = 0;
	      iframe.style.display = 'none';
	      iframe.src = url;
	      document.body.appendChild(iframe);
	      setTimeout(function () {
	        iframe.parentNode.removeChild(iframe);
	      }, 100);
	    }
	  }, {
	    key: 'handleBridgeInvoke',
	    value: function handleBridgeInvoke(type, resp) {
	      return this.handleMessage({ data: resp });
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      _get(ClientWebview.prototype.__proto__ || Object.getPrototypeOf(ClientWebview.prototype), 'destroy', this).call(this);
	      delete window.HB.bridgeCallback;
	      delete window.HB.bridgeCancel;
	      delete window.HB.bridgeEmit;
	    }
	  }]);
	
	  return ClientWebview;
	}(_index2.default);
	
	exports.default = ClientWebview;
	module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _webview = __webpack_require__(8);
	
	var _webview2 = _interopRequireDefault(_webview);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var ClientWebviewUrl = function (_ClientWebview) {
	  _inherits(ClientWebviewUrl, _ClientWebview);
	
	  function ClientWebviewUrl() {
	    _classCallCheck(this, ClientWebviewUrl);
	
	    return _possibleConstructorReturn(this, (ClientWebviewUrl.__proto__ || Object.getPrototypeOf(ClientWebviewUrl)).apply(this, arguments));
	  }
	
	  _createClass(ClientWebviewUrl, [{
	    key: '_invokeNative',
	    value: function _invokeNative(url) {
	      window.prompt(url, '');
	    }
	  }]);
	
	  return ClientWebviewUrl;
	}(_webview2.default);
	
	exports.default = ClientWebviewUrl;
	module.exports = exports['default'];

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _miniDefer = __webpack_require__(3);
	
	var _miniDefer2 = _interopRequireDefault(_miniDefer);
	
	var _const = __webpack_require__(1);
	
	var _channel = __webpack_require__(6);
	
	var _channel2 = _interopRequireDefault(_channel);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Host = function (_Channel) {
	  _inherits(Host, _Channel);
	
	  function Host() {
	    _classCallCheck(this, Host);
	
	    return _possibleConstructorReturn(this, (Host.__proto__ || Object.getPrototypeOf(Host)).apply(this, arguments));
	  }
	
	  _createClass(Host, [{
	    key: 'init',
	    value: function init() {
	      var _this2 = this;
	
	      this.heartbeatFrequency = 5;
	      this.connections = {};
	      this.handleHandshake = this._handleHandshake.bind(this);
	      window.addEventListener('message', this.handleHandshake, false);
	      this.ready(function (r) {
	        _this2.runHeartbeatDetection();
	      });
	    }
	  }, {
	    key: 'runHeartbeatDetection',
	    value: function runHeartbeatDetection() {
	      var _this3 = this;
	
	      this.getPorts().forEach(function (_ref) {
	        var client = _ref.client;
	        var port = _ref.port;
	        var lastPing = _ref.lastPing;
	
	        if (lastPing && _this3.now() - lastPing > _this3.heartbeatFrequency * 2 * 1000) {
	          console.log('close', client, (_this3.now() - lastPing) / 1000);
	          _this3._close(client);
	        } else {
	          _this3.push(client, _const.MSG_TYPES.PING);
	        }
	      });
	
	      setTimeout(function (r) {
	        _this3.runHeartbeatDetection();
	      }, this.heartbeatFrequency * 1000);
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy(clean) {
	      var _this4 = this;
	
	      _get(Host.prototype.__proto__ || Object.getPrototypeOf(Host.prototype), 'destroy', this).call(this);
	      this.getPorts().forEach(function (_ref2) {
	        var client = _ref2.client;
	
	        _this4._close(client);
	      });
	      this.connections = {};
	
	      if (clean) {
	        window.removeEventListener('message', this.handleHandshake);
	      }
	    }
	  }, {
	    key: '_close',
	    value: function _close(client) {
	      if (this.connections[client]) {
	        this.connections[client].port.close();
	        this.connections[client].port.onmessage = null;
	        delete this.connections[client];
	      }
	    }
	  }, {
	    key: 'now',
	    value: function now() {
	      return Date.now();
	    }
	  }, {
	    key: 'report',
	    value: function report() {
	      var conns = 0;
	      var appClients = this.getPorts().reduce(function (ret, con) {
	        conns++;
	        if (!ret[con.application_id]) {
	          ret[con.application_id] = 0;
	        }
	        ret[con.application_id]++;
	        return ret;
	      }, {});
	      var appIds = Object.keys(appClients);
	
	      console.log('当前已连接应用数：', appIds.length, ', 已连接页面总数：', conns, ', 应用计数统计：', appClients);
	    }
	  }, {
	    key: 'getPorts',
	    value: function getPorts(applicationId) {
	      var _this5 = this;
	
	      return Object.keys(this.connections).reduce(function (ret, key) {
	        if (!applicationId || _this5.connections[key].application_id == applicationId) {
	          ret.push(_this5.connections[key]);
	        }
	        return ret;
	      }, []);
	    }
	  }, {
	    key: '_handleHandshake',
	    value: function _handleHandshake(e) {
	      var _this6 = this;
	
	      var eDataArr = e.data && e.data.split ? e.data.split(':') : [];
	      if (eDataArr.length == 3 && eDataArr[0] == _const.MSG_TYPES.CONNECT && e.ports.length) {
	        var _ret = function () {
	          var aId = eDataArr[1];
	          var cUnique = eDataArr[2];
	          if (!aId || _this6.getPorts(aId).length >= 10) {
	            e.ports[0].postMessage({
	              action: _const.MSG_TYPES.CONNECT,
	              data: { error: { message: 'Too many connections' } }
	            });
	            return {
	              v: void 0
	            };
	          }
	
	          _this6.connections[cUnique] = {
	            client: cUnique,
	            application_id: aId,
	            port: e.ports[0]
	          };
	
	          var responder = function responder(welcomeMessage, errMessage) {
	            if (errMessage) {
	              if (_this6.connections[cUnique]) {
	                _this6._send(cUnique, _const.MSG_TYPES.CONNECT, { error: { message: errMessage } });
	              }
	              delete _this6.connections[cUnique];
	            } else {
	              _this6.connections[cUnique].port.onmessage = _this6.handlePortMessage.bind(_this6, cUnique);
	              _this6.connect.resolve(cUnique);
	              _this6.push(cUnique, _const.MSG_TYPES.CONNECT, { result: { message: welcomeMessage } });
	            }
	          };
	
	          _this6.emit('connect', { application_id: aId, origin: e.origin, client: cUnique }, responder);
	        }();
	
	        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	      }
	    }
	  }, {
	    key: 'send',
	    value: function send(client, action, data, _id) {
	      var _this7 = this;
	
	      var id = _id || this._unique_id('h_');
	
	      this.ready(function () {
	        _this7._send(client, action, data, id);
	      });
	
	      var deferred = (0, _miniDefer2.default)();
	      this.promises[id] = deferred;
	
	      return deferred.promise;
	    }
	  }, {
	    key: 'push',
	    value: function push(client, action) {
	      var _this8 = this;
	
	      var data = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
	
	      this.ready(function () {
	        _this8._send(client, action, data);
	      });
	    }
	  }, {
	    key: '_send',
	    value: function _send(client, action, data, id) {
	      if (this.connections[client]) {
	        var payload = { action: action };
	        if (data) {
	          payload.data = data;
	        }
	        if (id) {
	          payload.id = id;
	        }
	
	        this.connections[client].port.postMessage(payload);
	      } else {
	        this.emit('error', { type: 'send', data: { message: '连接不存在' } });
	      }
	    }
	  }, {
	    key: 'handlePortMessage',
	    value: function handlePortMessage(client, e) {
	      var _this9 = this;
	
	      if (false === this._processMessage(e, client)) {
	        return;
	      }
	
	      if (!this.connections[client]) {
	        throw new Error('message client error: ' + client);
	      }
	
	      var eData = void 0,
	          id = void 0,
	          action = void 0;
	      try {
	        eData = e.data;
	        if (typeof eData == 'string') {
	          eData = JSON.parse(eData);
	        }
	        if (!eData.action && !eData.id && eData.callback) throw new Error();
	      } catch (err) {
	        throw new Error('HB_APP_SDK: malformed message');
	      }
	
	      id = eData.id || eData.callback;
	      action = eData.action;
	
	      var responder = void 0;
	      if (id) {
	        responder = function responder(result, error) {
	          if (error) {
	            _this9.connections[client].port.postMessage({ id: id, error: error });
	          } else {
	            _this9.connections[client].port.postMessage({ id: id, result: result });
	          }
	        };
	      } else {}
	
	      this.emit(action, {
	        application_id: parseInt(this.connections[client].application_id, 10),
	        params: eData.data
	      }, responder);
	    }
	  }, {
	    key: '_processMessage',
	    value: function _processMessage(e, client) {
	      switch (e.data.action) {
	        case _const.MSG_TYPES.DISCONNECT:
	          this._close(client);
	          return false;
	        case _const.MSG_TYPES.BROADCAST:
	          this._broadcast(this.connections[client].application_id, e.data.data, [client]);
	          return false;
	        case _const.MSG_TYPES.PING:
	          this.connections[client].lastPing = this.now();
	          return false;
	      }
	    }
	  }, {
	    key: 'broadcast',
	    value: function broadcast(action, data) {
	      var aId = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];
	
	      this._broadcast(aId, data ? { action: action, data: data } : { action: action });
	    }
	  }, {
	    key: '_broadcast',
	    value: function _broadcast(aId, data) {
	      var _this10 = this;
	
	      var exclude = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];
	
	      this.getPorts(aId).forEach(function (_ref3) {
	        var client = _ref3.client;
	        var port = _ref3.port;
	
	        if (exclude.indexOf(client) === -1) {
	          _this10.push(client, _const.MSG_TYPES.BROADCAST, data);
	        }
	      });
	    }
	  }]);
	
	  return Host;
	}(_channel2.default);
	
	exports.default = Host;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;
//# sourceMappingURL=HuobanAppSDK.js.map
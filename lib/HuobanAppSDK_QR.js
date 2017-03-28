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
	
	var _const = __webpack_require__(1);
	
	Object.keys(_const).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _const[key];
	    }
	  });
	});
	exports.client = client;
	exports.host = host;
	
	__webpack_require__(2);
	
	var _browser = __webpack_require__(6);
	
	var _browser2 = _interopRequireDefault(_browser);
	
	var _webview = __webpack_require__(14);
	
	var _webview2 = _interopRequireDefault(_webview);
	
	var _webview_url = __webpack_require__(15);
	
	var _webview_url2 = _interopRequireDefault(_webview_url);
	
	var _host = __webpack_require__(16);
	
	var _host2 = _interopRequireDefault(_host);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var instance = {};
	
	function client(handlers) {
	  if (!instance.client) {
	    if (_const.isPC || _const.isWap) {
	      instance.client = new _browser2.default();
	    } else if (_const.isClientIOS || _const.isIPhone) {
	      instance.client = new _webview2.default();
	    } else if (_const.isClientAndroid && _const.isAndroid) {
	      instance.client = new _webview_url2.default();
	    } else {
	      instance.client = new _browser2.default();
	    }
	  }
	
	  if (handlers) {
	    instance.client.on(handlers);
	  }
	
	  return instance.client;
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
	
	var clientMatch = document.cookie.match(/huoban_client=(\w+)/);
	var isClient = exports.isClient = !!clientMatch;
	var isClientIOS = exports.isClientIOS = clientMatch && clientMatch[1] == 'ios';
	var isClientAndroid = exports.isClientAndroid = clientMatch && clientMatch[1] == 'android';
	
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
	
	__webpack_require__(3).polyfill();
	
	if (typeof Object.assign != 'function') {
	  Object.assign = function (target) {
	    'use strict';
	
	    if (target == null) {
	      throw new TypeError('Cannot convert undefined or null to object');
	    }
	
	    target = Object(target);
	    for (var index = 1; index < arguments.length; index++) {
	      var source = arguments[index];
	      if (source != null) {
	        for (var key in source) {
	          if (Object.prototype.hasOwnProperty.call(source, key)) {
	            target[key] = source[key];
	          }
	        }
	      }
	    }
	    return target;
	  };
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var require;/* WEBPACK VAR INJECTION */(function(process, global) {/*!
	 * @overview es6-promise - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
	 * @version   4.0.5
	 */
	
	(function (global, factory) {
	     true ? module.exports = factory() :
	    typeof define === 'function' && define.amd ? define(factory) :
	    (global.ES6Promise = factory());
	}(this, (function () { 'use strict';
	
	function objectOrFunction(x) {
	  return typeof x === 'function' || typeof x === 'object' && x !== null;
	}
	
	function isFunction(x) {
	  return typeof x === 'function';
	}
	
	var _isArray = undefined;
	if (!Array.isArray) {
	  _isArray = function (x) {
	    return Object.prototype.toString.call(x) === '[object Array]';
	  };
	} else {
	  _isArray = Array.isArray;
	}
	
	var isArray = _isArray;
	
	var len = 0;
	var vertxNext = undefined;
	var customSchedulerFn = undefined;
	
	var asap = function asap(callback, arg) {
	  queue[len] = callback;
	  queue[len + 1] = arg;
	  len += 2;
	  if (len === 2) {
	    // If len is 2, that means that we need to schedule an async flush.
	    // If additional callbacks are queued before the queue is flushed, they
	    // will be processed by this flush that we are scheduling.
	    if (customSchedulerFn) {
	      customSchedulerFn(flush);
	    } else {
	      scheduleFlush();
	    }
	  }
	};
	
	function setScheduler(scheduleFn) {
	  customSchedulerFn = scheduleFn;
	}
	
	function setAsap(asapFn) {
	  asap = asapFn;
	}
	
	var browserWindow = typeof window !== 'undefined' ? window : undefined;
	var browserGlobal = browserWindow || {};
	var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
	var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && ({}).toString.call(process) === '[object process]';
	
	// test for web worker but not in IE10
	var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';
	
	// node
	function useNextTick() {
	  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
	  // see https://github.com/cujojs/when/issues/410 for details
	  return function () {
	    return process.nextTick(flush);
	  };
	}
	
	// vertx
	function useVertxTimer() {
	  if (typeof vertxNext !== 'undefined') {
	    return function () {
	      vertxNext(flush);
	    };
	  }
	
	  return useSetTimeout();
	}
	
	function useMutationObserver() {
	  var iterations = 0;
	  var observer = new BrowserMutationObserver(flush);
	  var node = document.createTextNode('');
	  observer.observe(node, { characterData: true });
	
	  return function () {
	    node.data = iterations = ++iterations % 2;
	  };
	}
	
	// web worker
	function useMessageChannel() {
	  var channel = new MessageChannel();
	  channel.port1.onmessage = flush;
	  return function () {
	    return channel.port2.postMessage(0);
	  };
	}
	
	function useSetTimeout() {
	  // Store setTimeout reference so es6-promise will be unaffected by
	  // other code modifying setTimeout (like sinon.useFakeTimers())
	  var globalSetTimeout = setTimeout;
	  return function () {
	    return globalSetTimeout(flush, 1);
	  };
	}
	
	var queue = new Array(1000);
	function flush() {
	  for (var i = 0; i < len; i += 2) {
	    var callback = queue[i];
	    var arg = queue[i + 1];
	
	    callback(arg);
	
	    queue[i] = undefined;
	    queue[i + 1] = undefined;
	  }
	
	  len = 0;
	}
	
	function attemptVertx() {
	  try {
	    var r = require;
	    var vertx = __webpack_require__(5);
	    vertxNext = vertx.runOnLoop || vertx.runOnContext;
	    return useVertxTimer();
	  } catch (e) {
	    return useSetTimeout();
	  }
	}
	
	var scheduleFlush = undefined;
	// Decide what async method to use to triggering processing of queued callbacks:
	if (isNode) {
	  scheduleFlush = useNextTick();
	} else if (BrowserMutationObserver) {
	  scheduleFlush = useMutationObserver();
	} else if (isWorker) {
	  scheduleFlush = useMessageChannel();
	} else if (browserWindow === undefined && "function" === 'function') {
	  scheduleFlush = attemptVertx();
	} else {
	  scheduleFlush = useSetTimeout();
	}
	
	function then(onFulfillment, onRejection) {
	  var _arguments = arguments;
	
	  var parent = this;
	
	  var child = new this.constructor(noop);
	
	  if (child[PROMISE_ID] === undefined) {
	    makePromise(child);
	  }
	
	  var _state = parent._state;
	
	  if (_state) {
	    (function () {
	      var callback = _arguments[_state - 1];
	      asap(function () {
	        return invokeCallback(_state, child, callback, parent._result);
	      });
	    })();
	  } else {
	    subscribe(parent, child, onFulfillment, onRejection);
	  }
	
	  return child;
	}
	
	/**
	  `Promise.resolve` returns a promise that will become resolved with the
	  passed `value`. It is shorthand for the following:
	
	  ```javascript
	  let promise = new Promise(function(resolve, reject){
	    resolve(1);
	  });
	
	  promise.then(function(value){
	    // value === 1
	  });
	  ```
	
	  Instead of writing the above, your code now simply becomes the following:
	
	  ```javascript
	  let promise = Promise.resolve(1);
	
	  promise.then(function(value){
	    // value === 1
	  });
	  ```
	
	  @method resolve
	  @static
	  @param {Any} value value that the returned promise will be resolved with
	  Useful for tooling.
	  @return {Promise} a promise that will become fulfilled with the given
	  `value`
	*/
	function resolve(object) {
	  /*jshint validthis:true */
	  var Constructor = this;
	
	  if (object && typeof object === 'object' && object.constructor === Constructor) {
	    return object;
	  }
	
	  var promise = new Constructor(noop);
	  _resolve(promise, object);
	  return promise;
	}
	
	var PROMISE_ID = Math.random().toString(36).substring(16);
	
	function noop() {}
	
	var PENDING = void 0;
	var FULFILLED = 1;
	var REJECTED = 2;
	
	var GET_THEN_ERROR = new ErrorObject();
	
	function selfFulfillment() {
	  return new TypeError("You cannot resolve a promise with itself");
	}
	
	function cannotReturnOwn() {
	  return new TypeError('A promises callback cannot return that same promise.');
	}
	
	function getThen(promise) {
	  try {
	    return promise.then;
	  } catch (error) {
	    GET_THEN_ERROR.error = error;
	    return GET_THEN_ERROR;
	  }
	}
	
	function tryThen(then, value, fulfillmentHandler, rejectionHandler) {
	  try {
	    then.call(value, fulfillmentHandler, rejectionHandler);
	  } catch (e) {
	    return e;
	  }
	}
	
	function handleForeignThenable(promise, thenable, then) {
	  asap(function (promise) {
	    var sealed = false;
	    var error = tryThen(then, thenable, function (value) {
	      if (sealed) {
	        return;
	      }
	      sealed = true;
	      if (thenable !== value) {
	        _resolve(promise, value);
	      } else {
	        fulfill(promise, value);
	      }
	    }, function (reason) {
	      if (sealed) {
	        return;
	      }
	      sealed = true;
	
	      _reject(promise, reason);
	    }, 'Settle: ' + (promise._label || ' unknown promise'));
	
	    if (!sealed && error) {
	      sealed = true;
	      _reject(promise, error);
	    }
	  }, promise);
	}
	
	function handleOwnThenable(promise, thenable) {
	  if (thenable._state === FULFILLED) {
	    fulfill(promise, thenable._result);
	  } else if (thenable._state === REJECTED) {
	    _reject(promise, thenable._result);
	  } else {
	    subscribe(thenable, undefined, function (value) {
	      return _resolve(promise, value);
	    }, function (reason) {
	      return _reject(promise, reason);
	    });
	  }
	}
	
	function handleMaybeThenable(promise, maybeThenable, then$$) {
	  if (maybeThenable.constructor === promise.constructor && then$$ === then && maybeThenable.constructor.resolve === resolve) {
	    handleOwnThenable(promise, maybeThenable);
	  } else {
	    if (then$$ === GET_THEN_ERROR) {
	      _reject(promise, GET_THEN_ERROR.error);
	    } else if (then$$ === undefined) {
	      fulfill(promise, maybeThenable);
	    } else if (isFunction(then$$)) {
	      handleForeignThenable(promise, maybeThenable, then$$);
	    } else {
	      fulfill(promise, maybeThenable);
	    }
	  }
	}
	
	function _resolve(promise, value) {
	  if (promise === value) {
	    _reject(promise, selfFulfillment());
	  } else if (objectOrFunction(value)) {
	    handleMaybeThenable(promise, value, getThen(value));
	  } else {
	    fulfill(promise, value);
	  }
	}
	
	function publishRejection(promise) {
	  if (promise._onerror) {
	    promise._onerror(promise._result);
	  }
	
	  publish(promise);
	}
	
	function fulfill(promise, value) {
	  if (promise._state !== PENDING) {
	    return;
	  }
	
	  promise._result = value;
	  promise._state = FULFILLED;
	
	  if (promise._subscribers.length !== 0) {
	    asap(publish, promise);
	  }
	}
	
	function _reject(promise, reason) {
	  if (promise._state !== PENDING) {
	    return;
	  }
	  promise._state = REJECTED;
	  promise._result = reason;
	
	  asap(publishRejection, promise);
	}
	
	function subscribe(parent, child, onFulfillment, onRejection) {
	  var _subscribers = parent._subscribers;
	  var length = _subscribers.length;
	
	  parent._onerror = null;
	
	  _subscribers[length] = child;
	  _subscribers[length + FULFILLED] = onFulfillment;
	  _subscribers[length + REJECTED] = onRejection;
	
	  if (length === 0 && parent._state) {
	    asap(publish, parent);
	  }
	}
	
	function publish(promise) {
	  var subscribers = promise._subscribers;
	  var settled = promise._state;
	
	  if (subscribers.length === 0) {
	    return;
	  }
	
	  var child = undefined,
	      callback = undefined,
	      detail = promise._result;
	
	  for (var i = 0; i < subscribers.length; i += 3) {
	    child = subscribers[i];
	    callback = subscribers[i + settled];
	
	    if (child) {
	      invokeCallback(settled, child, callback, detail);
	    } else {
	      callback(detail);
	    }
	  }
	
	  promise._subscribers.length = 0;
	}
	
	function ErrorObject() {
	  this.error = null;
	}
	
	var TRY_CATCH_ERROR = new ErrorObject();
	
	function tryCatch(callback, detail) {
	  try {
	    return callback(detail);
	  } catch (e) {
	    TRY_CATCH_ERROR.error = e;
	    return TRY_CATCH_ERROR;
	  }
	}
	
	function invokeCallback(settled, promise, callback, detail) {
	  var hasCallback = isFunction(callback),
	      value = undefined,
	      error = undefined,
	      succeeded = undefined,
	      failed = undefined;
	
	  if (hasCallback) {
	    value = tryCatch(callback, detail);
	
	    if (value === TRY_CATCH_ERROR) {
	      failed = true;
	      error = value.error;
	      value = null;
	    } else {
	      succeeded = true;
	    }
	
	    if (promise === value) {
	      _reject(promise, cannotReturnOwn());
	      return;
	    }
	  } else {
	    value = detail;
	    succeeded = true;
	  }
	
	  if (promise._state !== PENDING) {
	    // noop
	  } else if (hasCallback && succeeded) {
	      _resolve(promise, value);
	    } else if (failed) {
	      _reject(promise, error);
	    } else if (settled === FULFILLED) {
	      fulfill(promise, value);
	    } else if (settled === REJECTED) {
	      _reject(promise, value);
	    }
	}
	
	function initializePromise(promise, resolver) {
	  try {
	    resolver(function resolvePromise(value) {
	      _resolve(promise, value);
	    }, function rejectPromise(reason) {
	      _reject(promise, reason);
	    });
	  } catch (e) {
	    _reject(promise, e);
	  }
	}
	
	var id = 0;
	function nextId() {
	  return id++;
	}
	
	function makePromise(promise) {
	  promise[PROMISE_ID] = id++;
	  promise._state = undefined;
	  promise._result = undefined;
	  promise._subscribers = [];
	}
	
	function Enumerator(Constructor, input) {
	  this._instanceConstructor = Constructor;
	  this.promise = new Constructor(noop);
	
	  if (!this.promise[PROMISE_ID]) {
	    makePromise(this.promise);
	  }
	
	  if (isArray(input)) {
	    this._input = input;
	    this.length = input.length;
	    this._remaining = input.length;
	
	    this._result = new Array(this.length);
	
	    if (this.length === 0) {
	      fulfill(this.promise, this._result);
	    } else {
	      this.length = this.length || 0;
	      this._enumerate();
	      if (this._remaining === 0) {
	        fulfill(this.promise, this._result);
	      }
	    }
	  } else {
	    _reject(this.promise, validationError());
	  }
	}
	
	function validationError() {
	  return new Error('Array Methods must be provided an Array');
	};
	
	Enumerator.prototype._enumerate = function () {
	  var length = this.length;
	  var _input = this._input;
	
	  for (var i = 0; this._state === PENDING && i < length; i++) {
	    this._eachEntry(_input[i], i);
	  }
	};
	
	Enumerator.prototype._eachEntry = function (entry, i) {
	  var c = this._instanceConstructor;
	  var resolve$$ = c.resolve;
	
	  if (resolve$$ === resolve) {
	    var _then = getThen(entry);
	
	    if (_then === then && entry._state !== PENDING) {
	      this._settledAt(entry._state, i, entry._result);
	    } else if (typeof _then !== 'function') {
	      this._remaining--;
	      this._result[i] = entry;
	    } else if (c === Promise) {
	      var promise = new c(noop);
	      handleMaybeThenable(promise, entry, _then);
	      this._willSettleAt(promise, i);
	    } else {
	      this._willSettleAt(new c(function (resolve$$) {
	        return resolve$$(entry);
	      }), i);
	    }
	  } else {
	    this._willSettleAt(resolve$$(entry), i);
	  }
	};
	
	Enumerator.prototype._settledAt = function (state, i, value) {
	  var promise = this.promise;
	
	  if (promise._state === PENDING) {
	    this._remaining--;
	
	    if (state === REJECTED) {
	      _reject(promise, value);
	    } else {
	      this._result[i] = value;
	    }
	  }
	
	  if (this._remaining === 0) {
	    fulfill(promise, this._result);
	  }
	};
	
	Enumerator.prototype._willSettleAt = function (promise, i) {
	  var enumerator = this;
	
	  subscribe(promise, undefined, function (value) {
	    return enumerator._settledAt(FULFILLED, i, value);
	  }, function (reason) {
	    return enumerator._settledAt(REJECTED, i, reason);
	  });
	};
	
	/**
	  `Promise.all` accepts an array of promises, and returns a new promise which
	  is fulfilled with an array of fulfillment values for the passed promises, or
	  rejected with the reason of the first passed promise to be rejected. It casts all
	  elements of the passed iterable to promises as it runs this algorithm.
	
	  Example:
	
	  ```javascript
	  let promise1 = resolve(1);
	  let promise2 = resolve(2);
	  let promise3 = resolve(3);
	  let promises = [ promise1, promise2, promise3 ];
	
	  Promise.all(promises).then(function(array){
	    // The array here would be [ 1, 2, 3 ];
	  });
	  ```
	
	  If any of the `promises` given to `all` are rejected, the first promise
	  that is rejected will be given as an argument to the returned promises's
	  rejection handler. For example:
	
	  Example:
	
	  ```javascript
	  let promise1 = resolve(1);
	  let promise2 = reject(new Error("2"));
	  let promise3 = reject(new Error("3"));
	  let promises = [ promise1, promise2, promise3 ];
	
	  Promise.all(promises).then(function(array){
	    // Code here never runs because there are rejected promises!
	  }, function(error) {
	    // error.message === "2"
	  });
	  ```
	
	  @method all
	  @static
	  @param {Array} entries array of promises
	  @param {String} label optional string for labeling the promise.
	  Useful for tooling.
	  @return {Promise} promise that is fulfilled when all `promises` have been
	  fulfilled, or rejected if any of them become rejected.
	  @static
	*/
	function all(entries) {
	  return new Enumerator(this, entries).promise;
	}
	
	/**
	  `Promise.race` returns a new promise which is settled in the same way as the
	  first passed promise to settle.
	
	  Example:
	
	  ```javascript
	  let promise1 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      resolve('promise 1');
	    }, 200);
	  });
	
	  let promise2 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      resolve('promise 2');
	    }, 100);
	  });
	
	  Promise.race([promise1, promise2]).then(function(result){
	    // result === 'promise 2' because it was resolved before promise1
	    // was resolved.
	  });
	  ```
	
	  `Promise.race` is deterministic in that only the state of the first
	  settled promise matters. For example, even if other promises given to the
	  `promises` array argument are resolved, but the first settled promise has
	  become rejected before the other promises became fulfilled, the returned
	  promise will become rejected:
	
	  ```javascript
	  let promise1 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      resolve('promise 1');
	    }, 200);
	  });
	
	  let promise2 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      reject(new Error('promise 2'));
	    }, 100);
	  });
	
	  Promise.race([promise1, promise2]).then(function(result){
	    // Code here never runs
	  }, function(reason){
	    // reason.message === 'promise 2' because promise 2 became rejected before
	    // promise 1 became fulfilled
	  });
	  ```
	
	  An example real-world use case is implementing timeouts:
	
	  ```javascript
	  Promise.race([ajax('foo.json'), timeout(5000)])
	  ```
	
	  @method race
	  @static
	  @param {Array} promises array of promises to observe
	  Useful for tooling.
	  @return {Promise} a promise which settles in the same way as the first passed
	  promise to settle.
	*/
	function race(entries) {
	  /*jshint validthis:true */
	  var Constructor = this;
	
	  if (!isArray(entries)) {
	    return new Constructor(function (_, reject) {
	      return reject(new TypeError('You must pass an array to race.'));
	    });
	  } else {
	    return new Constructor(function (resolve, reject) {
	      var length = entries.length;
	      for (var i = 0; i < length; i++) {
	        Constructor.resolve(entries[i]).then(resolve, reject);
	      }
	    });
	  }
	}
	
	/**
	  `Promise.reject` returns a promise rejected with the passed `reason`.
	  It is shorthand for the following:
	
	  ```javascript
	  let promise = new Promise(function(resolve, reject){
	    reject(new Error('WHOOPS'));
	  });
	
	  promise.then(function(value){
	    // Code here doesn't run because the promise is rejected!
	  }, function(reason){
	    // reason.message === 'WHOOPS'
	  });
	  ```
	
	  Instead of writing the above, your code now simply becomes the following:
	
	  ```javascript
	  let promise = Promise.reject(new Error('WHOOPS'));
	
	  promise.then(function(value){
	    // Code here doesn't run because the promise is rejected!
	  }, function(reason){
	    // reason.message === 'WHOOPS'
	  });
	  ```
	
	  @method reject
	  @static
	  @param {Any} reason value that the returned promise will be rejected with.
	  Useful for tooling.
	  @return {Promise} a promise rejected with the given `reason`.
	*/
	function reject(reason) {
	  /*jshint validthis:true */
	  var Constructor = this;
	  var promise = new Constructor(noop);
	  _reject(promise, reason);
	  return promise;
	}
	
	function needsResolver() {
	  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
	}
	
	function needsNew() {
	  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
	}
	
	/**
	  Promise objects represent the eventual result of an asynchronous operation. The
	  primary way of interacting with a promise is through its `then` method, which
	  registers callbacks to receive either a promise's eventual value or the reason
	  why the promise cannot be fulfilled.
	
	  Terminology
	  -----------
	
	  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
	  - `thenable` is an object or function that defines a `then` method.
	  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
	  - `exception` is a value that is thrown using the throw statement.
	  - `reason` is a value that indicates why a promise was rejected.
	  - `settled` the final resting state of a promise, fulfilled or rejected.
	
	  A promise can be in one of three states: pending, fulfilled, or rejected.
	
	  Promises that are fulfilled have a fulfillment value and are in the fulfilled
	  state.  Promises that are rejected have a rejection reason and are in the
	  rejected state.  A fulfillment value is never a thenable.
	
	  Promises can also be said to *resolve* a value.  If this value is also a
	  promise, then the original promise's settled state will match the value's
	  settled state.  So a promise that *resolves* a promise that rejects will
	  itself reject, and a promise that *resolves* a promise that fulfills will
	  itself fulfill.
	
	
	  Basic Usage:
	  ------------
	
	  ```js
	  let promise = new Promise(function(resolve, reject) {
	    // on success
	    resolve(value);
	
	    // on failure
	    reject(reason);
	  });
	
	  promise.then(function(value) {
	    // on fulfillment
	  }, function(reason) {
	    // on rejection
	  });
	  ```
	
	  Advanced Usage:
	  ---------------
	
	  Promises shine when abstracting away asynchronous interactions such as
	  `XMLHttpRequest`s.
	
	  ```js
	  function getJSON(url) {
	    return new Promise(function(resolve, reject){
	      let xhr = new XMLHttpRequest();
	
	      xhr.open('GET', url);
	      xhr.onreadystatechange = handler;
	      xhr.responseType = 'json';
	      xhr.setRequestHeader('Accept', 'application/json');
	      xhr.send();
	
	      function handler() {
	        if (this.readyState === this.DONE) {
	          if (this.status === 200) {
	            resolve(this.response);
	          } else {
	            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
	          }
	        }
	      };
	    });
	  }
	
	  getJSON('/posts.json').then(function(json) {
	    // on fulfillment
	  }, function(reason) {
	    // on rejection
	  });
	  ```
	
	  Unlike callbacks, promises are great composable primitives.
	
	  ```js
	  Promise.all([
	    getJSON('/posts'),
	    getJSON('/comments')
	  ]).then(function(values){
	    values[0] // => postsJSON
	    values[1] // => commentsJSON
	
	    return values;
	  });
	  ```
	
	  @class Promise
	  @param {function} resolver
	  Useful for tooling.
	  @constructor
	*/
	function Promise(resolver) {
	  this[PROMISE_ID] = nextId();
	  this._result = this._state = undefined;
	  this._subscribers = [];
	
	  if (noop !== resolver) {
	    typeof resolver !== 'function' && needsResolver();
	    this instanceof Promise ? initializePromise(this, resolver) : needsNew();
	  }
	}
	
	Promise.all = all;
	Promise.race = race;
	Promise.resolve = resolve;
	Promise.reject = reject;
	Promise._setScheduler = setScheduler;
	Promise._setAsap = setAsap;
	Promise._asap = asap;
	
	Promise.prototype = {
	  constructor: Promise,
	
	  /**
	    The primary way of interacting with a promise is through its `then` method,
	    which registers callbacks to receive either a promise's eventual value or the
	    reason why the promise cannot be fulfilled.
	  
	    ```js
	    findUser().then(function(user){
	      // user is available
	    }, function(reason){
	      // user is unavailable, and you are given the reason why
	    });
	    ```
	  
	    Chaining
	    --------
	  
	    The return value of `then` is itself a promise.  This second, 'downstream'
	    promise is resolved with the return value of the first promise's fulfillment
	    or rejection handler, or rejected if the handler throws an exception.
	  
	    ```js
	    findUser().then(function (user) {
	      return user.name;
	    }, function (reason) {
	      return 'default name';
	    }).then(function (userName) {
	      // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
	      // will be `'default name'`
	    });
	  
	    findUser().then(function (user) {
	      throw new Error('Found user, but still unhappy');
	    }, function (reason) {
	      throw new Error('`findUser` rejected and we're unhappy');
	    }).then(function (value) {
	      // never reached
	    }, function (reason) {
	      // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
	      // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
	    });
	    ```
	    If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
	  
	    ```js
	    findUser().then(function (user) {
	      throw new PedagogicalException('Upstream error');
	    }).then(function (value) {
	      // never reached
	    }).then(function (value) {
	      // never reached
	    }, function (reason) {
	      // The `PedgagocialException` is propagated all the way down to here
	    });
	    ```
	  
	    Assimilation
	    ------------
	  
	    Sometimes the value you want to propagate to a downstream promise can only be
	    retrieved asynchronously. This can be achieved by returning a promise in the
	    fulfillment or rejection handler. The downstream promise will then be pending
	    until the returned promise is settled. This is called *assimilation*.
	  
	    ```js
	    findUser().then(function (user) {
	      return findCommentsByAuthor(user);
	    }).then(function (comments) {
	      // The user's comments are now available
	    });
	    ```
	  
	    If the assimliated promise rejects, then the downstream promise will also reject.
	  
	    ```js
	    findUser().then(function (user) {
	      return findCommentsByAuthor(user);
	    }).then(function (comments) {
	      // If `findCommentsByAuthor` fulfills, we'll have the value here
	    }, function (reason) {
	      // If `findCommentsByAuthor` rejects, we'll have the reason here
	    });
	    ```
	  
	    Simple Example
	    --------------
	  
	    Synchronous Example
	  
	    ```javascript
	    let result;
	  
	    try {
	      result = findResult();
	      // success
	    } catch(reason) {
	      // failure
	    }
	    ```
	  
	    Errback Example
	  
	    ```js
	    findResult(function(result, err){
	      if (err) {
	        // failure
	      } else {
	        // success
	      }
	    });
	    ```
	  
	    Promise Example;
	  
	    ```javascript
	    findResult().then(function(result){
	      // success
	    }, function(reason){
	      // failure
	    });
	    ```
	  
	    Advanced Example
	    --------------
	  
	    Synchronous Example
	  
	    ```javascript
	    let author, books;
	  
	    try {
	      author = findAuthor();
	      books  = findBooksByAuthor(author);
	      // success
	    } catch(reason) {
	      // failure
	    }
	    ```
	  
	    Errback Example
	  
	    ```js
	  
	    function foundBooks(books) {
	  
	    }
	  
	    function failure(reason) {
	  
	    }
	  
	    findAuthor(function(author, err){
	      if (err) {
	        failure(err);
	        // failure
	      } else {
	        try {
	          findBoooksByAuthor(author, function(books, err) {
	            if (err) {
	              failure(err);
	            } else {
	              try {
	                foundBooks(books);
	              } catch(reason) {
	                failure(reason);
	              }
	            }
	          });
	        } catch(error) {
	          failure(err);
	        }
	        // success
	      }
	    });
	    ```
	  
	    Promise Example;
	  
	    ```javascript
	    findAuthor().
	      then(findBooksByAuthor).
	      then(function(books){
	        // found books
	    }).catch(function(reason){
	      // something went wrong
	    });
	    ```
	  
	    @method then
	    @param {Function} onFulfilled
	    @param {Function} onRejected
	    Useful for tooling.
	    @return {Promise}
	  */
	  then: then,
	
	  /**
	    `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
	    as the catch block of a try/catch statement.
	  
	    ```js
	    function findAuthor(){
	      throw new Error('couldn't find that author');
	    }
	  
	    // synchronous
	    try {
	      findAuthor();
	    } catch(reason) {
	      // something went wrong
	    }
	  
	    // async with promises
	    findAuthor().catch(function(reason){
	      // something went wrong
	    });
	    ```
	  
	    @method catch
	    @param {Function} onRejection
	    Useful for tooling.
	    @return {Promise}
	  */
	  'catch': function _catch(onRejection) {
	    return this.then(null, onRejection);
	  }
	};
	
	function polyfill() {
	    var local = undefined;
	
	    if (typeof global !== 'undefined') {
	        local = global;
	    } else if (typeof self !== 'undefined') {
	        local = self;
	    } else {
	        try {
	            local = Function('return this')();
	        } catch (e) {
	            throw new Error('polyfill failed because global object is unavailable in this environment');
	        }
	    }
	
	    var P = local.Promise;
	
	    if (P) {
	        var promiseToString = null;
	        try {
	            promiseToString = Object.prototype.toString.call(P.resolve());
	        } catch (e) {
	            // silently ignored
	        }
	
	        if (promiseToString === '[object Promise]' && !P.cast) {
	            return;
	        }
	    }
	
	    local.Promise = Promise;
	}
	
	// Strange compat..
	Promise.polyfill = polyfill;
	Promise.Promise = Promise;
	
	return Promise;
	
	})));
	//# sourceMappingURL=es6-promise.map
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4), (function() { return this; }())))

/***/ },
/* 4 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 5 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _miniDefer = __webpack_require__(7);
	
	var _miniDefer2 = _interopRequireDefault(_miniDefer);
	
	var _util = __webpack_require__(8);
	
	var _const = __webpack_require__(1);
	
	var _index = __webpack_require__(9);
	
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
	      var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	      var deferred = (0, _miniDefer2.default)();
	
	      if (window.parent === window) {
	        (0, _util.delay)(function () {
	          deferred.reject({ message: '无法找到宿主环境' });
	        });
	        return deferred.promise;
	      }
	      if (!window.MessageChannel) {
	        (0, _util.delay)(function () {
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
	
	      return this._init(applicationId, params);
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
/* 7 */
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
/* 8 */
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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _semverCompare = __webpack_require__(10);
	
	var _semverCompare2 = _interopRequireDefault(_semverCompare);
	
	var _miniDefer = __webpack_require__(7);
	
	var _miniDefer2 = _interopRequireDefault(_miniDefer);
	
	var _kjua = __webpack_require__(11);
	
	var _kjua2 = _interopRequireDefault(_kjua);
	
	var _const = __webpack_require__(1);
	
	var _util = __webpack_require__(8);
	
	var _channel = __webpack_require__(12);
	
	var _channel2 = _interopRequireDefault(_channel);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var defaultQRCodeOptions = {
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
	};
	
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
	      var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	      return (0, _miniDefer2.default)().promise;
	    }
	  }, {
	    key: 'openWebPage',
	    value: function openWebPage(url, title) {
	      var opts = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	
	      this.push('openWebPage', _extends({}, opts, { url: url, title: title }));
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
	    key: 'getSpaceMembers',
	    value: function getSpaceMembers() {
	      var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	      return this.send('getSpaceMembers', opts);
	    }
	  }, {
	    key: 'openFilter',
	    value: function openFilter() {
	      var table = arguments.length <= 0 ? undefined : arguments[0],
	          filters = arguments.length <= 1 ? undefined : arguments[1],
	          fn = arguments.length <= 2 ? undefined : arguments[2];
	
	      if (arguments.length == 1) {
	        table = this.table;
	        fn = arguments.length <= 0 ? undefined : arguments[0];
	      } else if (arguments.length == 2) {
	        table = this.table;
	        filters = arguments.length <= 0 ? undefined : arguments[0];
	        fn = arguments.length <= 1 ? undefined : arguments[1];
	      } else if (arguments.length == 3) {
	        table = table && table.table_id ? table : this.table;
	      }
	
	      var params = {
	        table_id: table.table_id,
	        space_id: table.space_id
	      };
	      var isV2 = this._checkUp2V2();
	      if (filters && ['object', 'function'].indexOf(typeof filters === 'undefined' ? 'undefined' : _typeof(filters)) >= 0 && filters.length !== 0) {
	        params.filters = isV2 ? filters : (0, _util.cvFiltersToV1)(filters);
	      }
	
	      var _fn = void 0;
	      if (fn && !isV2) {
	        _fn = function _fn(data) {
	          if (data.filters) {
	            data.filters = (0, _util.cvFiltersToV2)(data.filters);
	          }
	          fn(data);
	        };
	      } else {
	        _fn = fn;
	      }
	
	      return this.send('openFilter', params, null, _fn);
	    }
	  }, {
	    key: 'openItemDiff',
	    value: function openItemDiff(itemId, fromRevId, toRevId, opts) {
	      var params = void 0;
	
	      if (!toRevId && !opts && fromRevId) {
	        params = _extends({}, fromRevId, {
	          item_id: parseInt(itemId, 10),
	          field_id: parseInt(fromRevId.field_id, 10)
	        });
	      } else {
	        params = _extends({}, opts, {
	          item_id: parseInt(itemId, 10),
	          from_revision_id: parseInt(fromRevId, 10),
	          to_revision_id: parseInt(toRevId, 10),
	          field_id: parseInt(opts.field_id, 10)
	        });
	      }
	      if (!params.from_revision_id && params.old_revision_id) {
	        params.from_revision_id = params.old_revision_id;
	      }
	      if (!params.to_revision_id && params.revision_id) {
	        params.to_revision_id = params.revision_id;
	      }
	
	      if (params.field_id && !params.field_name && this._table) {
	        this._table.fields.forEach(function (f) {
	          if (f.field_id == params.field_id) {
	            params.field_name = f.name;
	            return false;
	          }
	        });
	      }
	
	      delete params.old_revision_id;
	      delete params.revision_id;
	
	
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
	      if (['left-bottom', 'left-top', 'right-top', 'right-bottom'].indexOf(opts.placement) < 0) {
	        opts.placement = 'right-bottom';
	      }
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
	        image: '',
	        via: '',
	        url: '',
	        type: '' };
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
	    key: 'generateQrcode',
	    value: function generateQrcode(text) {
	      var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	      opts = _extends({}, defaultQRCodeOptions, opts, { text: text, render: 'canvas' });
	
	      return (0, _kjua2.default)(opts).toDataURL('image/png');
	    }
	  }, {
	    key: 'genQRCode',
	    value: function genQRCode(text) {
	      var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	      opts = _extends({}, defaultQRCodeOptions, opts, { text: text });
	
	      return this.send('genQRCode', opts);
	    }
	  }, {
	    key: 'showQRCode',
	    value: function showQRCode(text) {
	      var opts = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	      var _event = arguments[2];
	
	      opts = _extends({}, defaultQRCodeOptions, opts, { text: text });
	
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
	    key: 'installPackage',
	    value: function installPackage(packageId) {
	      this.push('installPackage', { package_id: packageId });
	    }
	  }, {
	    key: '_init',
	    value: function _init(applicationId) {
	      var _this2 = this;
	
	      var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	      return this.send('init', _extends({ application_id: applicationId }, params)).then(function (ret) {
	        _this2._ticket = ret.ticket;
	        _this2._user = ret.user;
	        _this2._table = ret.table || ret.app;
	
	        var tableId = _this2._table.table_id || _this2._table.app_id;
	        _this2._table.app_id = _this2._table.table_id = tableId;
	        _this2._version = ret.version;
	        _this2.applicationId = applicationId;
	
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
	      var clientX = e.clientX;
	      var clientY = e.clientY;
	      var offsetX = e.offsetX;
	      var offsetY = e.offsetY;
	
	
	      return {
	        target: { top: top, bottom: bottom, left: left, right: right, width: width, height: height, offsetWidth: e.target.offsetWidth, offsetHeight: e.target.offsetHeight },
	        clientX: clientX,
	        clientY: clientY,
	        offsetX: offsetX,
	        offsetY: offsetY
	      };
	    }
	  }, {
	    key: '_checkUp2V2',
	    value: function _checkUp2V2() {
	      var upgraded = void 0;
	
	      if (_const.isClientAndroid) {
	        upgraded = (0, _semverCompare2.default)(this._version, '2.4.0') >= 0;
	      } else if (_const.isClientIOS) {
	        upgraded = (0, _semverCompare2.default)(this._version, '140') >= 0;
	      } else {
	        upgraded = (0, _semverCompare2.default)(this._version, '4.1') >= 0;
	      }
	
	      return upgraded;
	    }
	  }]);
	
	  return Client;
	}(_channel2.default);
	
	exports.default = Client;
	module.exports = exports['default'];

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = function cmp (a, b) {
	    var pa = a.split('.');
	    var pb = b.split('.');
	    for (var i = 0; i < 3; i++) {
	        var na = Number(pa[i]);
	        var nb = Number(pb[i]);
	        if (na > nb) return 1;
	        if (nb > na) return -1;
	        if (!isNaN(na) && isNaN(nb)) return 1;
	        if (isNaN(na) && !isNaN(nb)) return -1;
	    }
	    return 0;
	};


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! kjua v0.1.1 - https://larsjung.de/kjua/ */
	!function(r,t){ true?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.kjua=t():r.kjua=t()}(this,function(){return function(r){function t(n){if(e[n])return e[n].exports;var o=e[n]={exports:{},id:n,loaded:!1};return r[n].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var e={};return t.m=r,t.c=e,t.p="",t(0)}([function(r,t,e){"use strict";var n=e(1),o=n.createCanvas,i=n.canvasToImg,a=n.dpr,u=e(2),f=e(3),c=e(4);r.exports=function(r){var t=Object.assign({},u,r),e=f(t.text,t.ecLevel,t.minVersion,t.quiet),n=t.ratio||a,l=o(t.size,n),s=l.getContext("2d");return s.scale(n,n),c(e,s,t),"image"===t.render?i(l):l}},function(r,t){"use strict";var e=window,n=e.document,o=e.devicePixelRatio||1,i=function(r){return n.createElement(r)},a=function(r,t){return r.getAttribute(t)},u=function(r,t,e){return r.setAttribute(t,e)},f=function(r,t){var e=i("canvas");return u(e,"width",r*t),u(e,"height",r*t),e.style.width=r+"px",e.style.height=r+"px",e},c=function(r){var t=i("img");return u(t,"crossorigin","anonymous"),u(t,"src",r.toDataURL("image/png")),u(t,"width",a(r,"width")),u(t,"height",a(r,"height")),t.style.width=r.style.width,t.style.height=r.style.height,t};r.exports={createCanvas:f,canvasToImg:c,dpr:o}},function(r,t){"use strict";r.exports={render:"image",crisp:!0,minVersion:1,ecLevel:"L",size:200,ratio:null,fill:"#333",back:"#fff",text:"no text",rounded:0,quiet:0,mode:"plain",mSize:30,mPosX:50,mPosY:50,label:"no label",fontname:"sans",fontcolor:"#333",image:null}},function(r,t){"use strict";var e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(r){return typeof r}:function(r){return r&&"function"==typeof Symbol&&r.constructor===Symbol?"symbol":typeof r},n=/code length overflow/i,o=function(){var e=function(){function r(t,e){if("undefined"==typeof t.length)throw new Error(t.length+"/"+e);var n=function(){for(var r=0;r<t.length&&0==t[r];)r+=1;for(var n=new Array(t.length-r+e),o=0;o<t.length-r;o+=1)n[o]=t[o+r];return n}(),o={};return o.getAt=function(r){return n[r]},o.getLength=function(){return n.length},o.multiply=function(t){for(var e=new Array(o.getLength()+t.getLength()-1),n=0;n<o.getLength();n+=1)for(var i=0;i<t.getLength();i+=1)e[n+i]^=a.gexp(a.glog(o.getAt(n))+a.glog(t.getAt(i)));return r(e,0)},o.mod=function(t){if(o.getLength()-t.getLength()<0)return o;for(var e=a.glog(o.getAt(0))-a.glog(t.getAt(0)),n=new Array(o.getLength()),i=0;i<o.getLength();i+=1)n[i]=o.getAt(i);for(var i=0;i<t.getLength();i+=1)n[i]^=a.gexp(a.glog(t.getAt(i))+e);return r(n,0).mod(t)},o}var t=function(t,e){var o=236,a=17,l=t,s=n[e],g=null,h=0,d=null,w=new Array,y={},p=function(r,t){h=4*l+17,g=function(r){for(var t=new Array(r),e=0;r>e;e+=1){t[e]=new Array(r);for(var n=0;r>n;n+=1)t[e][n]=null}return t}(h),m(0,0),m(h-7,0),m(0,h-7),E(),B(),M(r,t),l>=7&&T(r),null==d&&(d=x(l,s,w)),k(d,t)},m=function(r,t){for(var e=-1;7>=e;e+=1)if(!(-1>=r+e||r+e>=h))for(var n=-1;7>=n;n+=1)-1>=t+n||t+n>=h||(e>=0&&6>=e&&(0==n||6==n)||n>=0&&6>=n&&(0==e||6==e)||e>=2&&4>=e&&n>=2&&4>=n?g[r+e][t+n]=!0:g[r+e][t+n]=!1)},A=function(){for(var r=0,t=0,e=0;8>e;e+=1){p(!0,e);var n=i.getLostPoint(y);(0==e||r>n)&&(r=n,t=e)}return t},B=function(){for(var r=8;h-8>r;r+=1)null==g[r][6]&&(g[r][6]=r%2==0);for(var t=8;h-8>t;t+=1)null==g[6][t]&&(g[6][t]=t%2==0)},E=function(){for(var r=i.getPatternPosition(l),t=0;t<r.length;t+=1)for(var e=0;e<r.length;e+=1){var n=r[t],o=r[e];if(null==g[n][o])for(var a=-2;2>=a;a+=1)for(var u=-2;2>=u;u+=1)-2==a||2==a||-2==u||2==u||0==a&&0==u?g[n+a][o+u]=!0:g[n+a][o+u]=!1}},T=function(r){for(var t=i.getBCHTypeNumber(l),e=0;18>e;e+=1){var n=!r&&1==(t>>e&1);g[Math.floor(e/3)][e%3+h-8-3]=n}for(var e=0;18>e;e+=1){var n=!r&&1==(t>>e&1);g[e%3+h-8-3][Math.floor(e/3)]=n}},M=function(r,t){for(var e=s<<3|t,n=i.getBCHTypeInfo(e),o=0;15>o;o+=1){var a=!r&&1==(n>>o&1);6>o?g[o][8]=a:8>o?g[o+1][8]=a:g[h-15+o][8]=a}for(var o=0;15>o;o+=1){var a=!r&&1==(n>>o&1);8>o?g[8][h-o-1]=a:9>o?g[8][15-o-1+1]=a:g[8][15-o-1]=a}g[h-8][8]=!r},k=function(r,t){for(var e=-1,n=h-1,o=7,a=0,u=i.getMaskFunction(t),f=h-1;f>0;f-=2)for(6==f&&(f-=1);;){for(var c=0;2>c;c+=1)if(null==g[n][f-c]){var l=!1;a<r.length&&(l=1==(r[a]>>>o&1));var s=u(n,f-c);s&&(l=!l),g[n][f-c]=l,o-=1,-1==o&&(a+=1,o=7)}if(n+=e,0>n||n>=h){n-=e,e=-e;break}}},b=function(t,e){for(var n=0,o=0,a=0,u=new Array(e.length),f=new Array(e.length),c=0;c<e.length;c+=1){var l=e[c].dataCount,s=e[c].totalCount-l;o=Math.max(o,l),a=Math.max(a,s),u[c]=new Array(l);for(var g=0;g<u[c].length;g+=1)u[c][g]=255&t.getBuffer()[g+n];n+=l;var h=i.getErrorCorrectPolynomial(s),v=r(u[c],h.getLength()-1),d=v.mod(h);f[c]=new Array(h.getLength()-1);for(var g=0;g<f[c].length;g+=1){var w=g+d.getLength()-f[c].length;f[c][g]=w>=0?d.getAt(w):0}}for(var y=0,g=0;g<e.length;g+=1)y+=e[g].totalCount;for(var p=new Array(y),m=0,g=0;o>g;g+=1)for(var c=0;c<e.length;c+=1)g<u[c].length&&(p[m]=u[c][g],m+=1);for(var g=0;a>g;g+=1)for(var c=0;c<e.length;c+=1)g<f[c].length&&(p[m]=f[c][g],m+=1);return p},x=function(r,t,e){for(var n=u.getRSBlocks(r,t),c=f(),l=0;l<e.length;l+=1){var s=e[l];c.put(s.getMode(),4),c.put(s.getLength(),i.getLengthInBits(s.getMode(),r)),s.write(c)}for(var g=0,l=0;l<n.length;l+=1)g+=n[l].dataCount;if(c.getLengthInBits()>8*g)throw new Error("code length overflow. ("+c.getLengthInBits()+">"+8*g+")");for(c.getLengthInBits()+4<=8*g&&c.put(0,4);c.getLengthInBits()%8!=0;)c.putBit(!1);for(;;){if(c.getLengthInBits()>=8*g)break;if(c.put(o,8),c.getLengthInBits()>=8*g)break;c.put(a,8)}return b(c,n)};return y.addData=function(r){var t=c(r);w.push(t),d=null},y.isDark=function(r,t){if(0>r||r>=h||0>t||t>=h)throw new Error(r+","+t);return g[r][t]},y.getModuleCount=function(){return h},y.make=function(){p(!1,A())},y.createTableTag=function(r,t){r=r||2,t="undefined"==typeof t?4*r:t;var e="";e+='<table style="',e+=" border-width: 0px; border-style: none;",e+=" border-collapse: collapse;",e+=" padding: 0px; margin: "+t+"px;",e+='">',e+="<tbody>";for(var n=0;n<y.getModuleCount();n+=1){e+="<tr>";for(var o=0;o<y.getModuleCount();o+=1)e+='<td style="',e+=" border-width: 0px; border-style: none;",e+=" border-collapse: collapse;",e+=" padding: 0px; margin: 0px;",e+=" width: "+r+"px;",e+=" height: "+r+"px;",e+=" background-color: ",e+=y.isDark(n,o)?"#000000":"#ffffff",e+=";",e+='"/>';e+="</tr>"}return e+="</tbody>",e+="</table>"},y.createImgTag=function(r,t){r=r||2,t="undefined"==typeof t?4*r:t;var e=y.getModuleCount()*r+2*t,n=t,o=e-t;return v(e,e,function(t,e){if(t>=n&&o>t&&e>=n&&o>e){var i=Math.floor((t-n)/r),a=Math.floor((e-n)/r);return y.isDark(a,i)?0:1}return 1})},y};t.stringToBytes=function(r){for(var t=new Array,e=0;e<r.length;e+=1){var n=r.charCodeAt(e);t.push(255&n)}return t},t.createStringToBytes=function(r,t){var e=function(){for(var e=g(r),n=function(){var r=e.read();if(-1==r)throw new Error;return r},o=0,i={};;){var a=e.read();if(-1==a)break;var u=n(),f=n(),c=n(),l=String.fromCharCode(a<<8|u),s=f<<8|c;i[l]=s,o+=1}if(o!=t)throw new Error(o+" != "+t);return i}(),n="?".charCodeAt(0);return function(r){for(var t=new Array,o=0;o<r.length;o+=1){var i=r.charCodeAt(o);if(128>i)t.push(i);else{var a=e[r.charAt(o)];"number"==typeof a?(255&a)==a?t.push(a):(t.push(a>>>8),t.push(255&a)):t.push(n)}}return t}};var e={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8},n={L:1,M:0,Q:3,H:2},o={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7},i=function(){var t=[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],n=1335,i=7973,u=21522,f={},c=function(r){for(var t=0;0!=r;)t+=1,r>>>=1;return t};return f.getBCHTypeInfo=function(r){for(var t=r<<10;c(t)-c(n)>=0;)t^=n<<c(t)-c(n);return(r<<10|t)^u},f.getBCHTypeNumber=function(r){for(var t=r<<12;c(t)-c(i)>=0;)t^=i<<c(t)-c(i);return r<<12|t},f.getPatternPosition=function(r){return t[r-1]},f.getMaskFunction=function(r){switch(r){case o.PATTERN000:return function(r,t){return(r+t)%2==0};case o.PATTERN001:return function(r,t){return r%2==0};case o.PATTERN010:return function(r,t){return t%3==0};case o.PATTERN011:return function(r,t){return(r+t)%3==0};case o.PATTERN100:return function(r,t){return(Math.floor(r/2)+Math.floor(t/3))%2==0};case o.PATTERN101:return function(r,t){return r*t%2+r*t%3==0};case o.PATTERN110:return function(r,t){return(r*t%2+r*t%3)%2==0};case o.PATTERN111:return function(r,t){return(r*t%3+(r+t)%2)%2==0};default:throw new Error("bad maskPattern:"+r)}},f.getErrorCorrectPolynomial=function(t){for(var e=r([1],0),n=0;t>n;n+=1)e=e.multiply(r([1,a.gexp(n)],0));return e},f.getLengthInBits=function(r,t){if(t>=1&&10>t)switch(r){case e.MODE_NUMBER:return 10;case e.MODE_ALPHA_NUM:return 9;case e.MODE_8BIT_BYTE:return 8;case e.MODE_KANJI:return 8;default:throw new Error("mode:"+r)}else if(27>t)switch(r){case e.MODE_NUMBER:return 12;case e.MODE_ALPHA_NUM:return 11;case e.MODE_8BIT_BYTE:return 16;case e.MODE_KANJI:return 10;default:throw new Error("mode:"+r)}else{if(!(41>t))throw new Error("type:"+t);switch(r){case e.MODE_NUMBER:return 14;case e.MODE_ALPHA_NUM:return 13;case e.MODE_8BIT_BYTE:return 16;case e.MODE_KANJI:return 12;default:throw new Error("mode:"+r)}}},f.getLostPoint=function(r){for(var t=r.getModuleCount(),e=0,n=0;t>n;n+=1)for(var o=0;t>o;o+=1){for(var i=0,a=r.isDark(n,o),u=-1;1>=u;u+=1)if(!(0>n+u||n+u>=t))for(var f=-1;1>=f;f+=1)0>o+f||o+f>=t||0==u&&0==f||a==r.isDark(n+u,o+f)&&(i+=1);i>5&&(e+=3+i-5)}for(var n=0;t-1>n;n+=1)for(var o=0;t-1>o;o+=1){var c=0;r.isDark(n,o)&&(c+=1),r.isDark(n+1,o)&&(c+=1),r.isDark(n,o+1)&&(c+=1),r.isDark(n+1,o+1)&&(c+=1),0!=c&&4!=c||(e+=3)}for(var n=0;t>n;n+=1)for(var o=0;t-6>o;o+=1)r.isDark(n,o)&&!r.isDark(n,o+1)&&r.isDark(n,o+2)&&r.isDark(n,o+3)&&r.isDark(n,o+4)&&!r.isDark(n,o+5)&&r.isDark(n,o+6)&&(e+=40);for(var o=0;t>o;o+=1)for(var n=0;t-6>n;n+=1)r.isDark(n,o)&&!r.isDark(n+1,o)&&r.isDark(n+2,o)&&r.isDark(n+3,o)&&r.isDark(n+4,o)&&!r.isDark(n+5,o)&&r.isDark(n+6,o)&&(e+=40);for(var l=0,o=0;t>o;o+=1)for(var n=0;t>n;n+=1)r.isDark(n,o)&&(l+=1);var s=Math.abs(100*l/t/t-50)/5;return e+=10*s},f}(),a=function(){for(var r=new Array(256),t=new Array(256),e=0;8>e;e+=1)r[e]=1<<e;for(var e=8;256>e;e+=1)r[e]=r[e-4]^r[e-5]^r[e-6]^r[e-8];for(var e=0;255>e;e+=1)t[r[e]]=e;var n={};return n.glog=function(r){if(1>r)throw new Error("glog("+r+")");return t[r]},n.gexp=function(t){for(;0>t;)t+=255;for(;t>=256;)t-=255;return r[t]},n}(),u=function(){var r=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12,7,37,13],[5,122,98,1,123,99],[7,73,45,3,74,46],[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],t=function(r,t){var e={};return e.totalCount=r,e.dataCount=t,e},e={},o=function(t,e){switch(e){case n.L:return r[4*(t-1)+0];case n.M:return r[4*(t-1)+1];case n.Q:return r[4*(t-1)+2];case n.H:return r[4*(t-1)+3];default:return}};return e.getRSBlocks=function(r,e){var n=o(r,e);if("undefined"==typeof n)throw new Error("bad rs block @ typeNumber:"+r+"/errorCorrectLevel:"+e);for(var i=n.length/3,a=new Array,u=0;i>u;u+=1)for(var f=n[3*u+0],c=n[3*u+1],l=n[3*u+2],s=0;f>s;s+=1)a.push(t(c,l));return a},e}(),f=function(){var r=new Array,t=0,e={};return e.getBuffer=function(){return r},e.getAt=function(t){var e=Math.floor(t/8);return 1==(r[e]>>>7-t%8&1)},e.put=function(r,t){for(var n=0;t>n;n+=1)e.putBit(1==(r>>>t-n-1&1))},e.getLengthInBits=function(){return t},e.putBit=function(e){var n=Math.floor(t/8);r.length<=n&&r.push(0),e&&(r[n]|=128>>>t%8),t+=1},e},c=function(r){var n=e.MODE_8BIT_BYTE,o=t.stringToBytes(r),i={};return i.getMode=function(){return n},i.getLength=function(r){return o.length},i.write=function(r){for(var t=0;t<o.length;t+=1)r.put(o[t],8)},i},l=function(){var r=new Array,t={};return t.writeByte=function(t){r.push(255&t)},t.writeShort=function(r){t.writeByte(r),t.writeByte(r>>>8)},t.writeBytes=function(r,e,n){e=e||0,n=n||r.length;for(var o=0;n>o;o+=1)t.writeByte(r[o+e])},t.writeString=function(r){for(var e=0;e<r.length;e+=1)t.writeByte(r.charCodeAt(e))},t.toByteArray=function(){return r},t.toString=function(){var t="";t+="[";for(var e=0;e<r.length;e+=1)e>0&&(t+=","),t+=r[e];return t+="]"},t},s=function(){var r=0,t=0,e=0,n="",o={},i=function(r){n+=String.fromCharCode(a(63&r))},a=function(r){if(0>r);else{if(26>r)return 65+r;if(52>r)return 97+(r-26);if(62>r)return 48+(r-52);if(62==r)return 43;if(63==r)return 47}throw new Error("n:"+r)};return o.writeByte=function(n){for(r=r<<8|255&n,t+=8,e+=1;t>=6;)i(r>>>t-6),t-=6},o.flush=function(){if(t>0&&(i(r<<6-t),r=0,t=0),e%3!=0)for(var o=3-e%3,a=0;o>a;a+=1)n+="="},o.toString=function(){return n},o},g=function(r){var t=r,e=0,n=0,o=0,i={};i.read=function(){for(;8>o;){if(e>=t.length){if(0==o)return-1;throw new Error("unexpected end of file./"+o)}var r=t.charAt(e);if(e+=1,"="==r)return o=0,-1;r.match(/^\s$/)||(n=n<<6|a(r.charCodeAt(0)),o+=6)}var i=n>>>o-8&255;return o-=8,i};var a=function(r){if(r>=65&&90>=r)return r-65;if(r>=97&&122>=r)return r-97+26;if(r>=48&&57>=r)return r-48+52;if(43==r)return 62;if(47==r)return 63;throw new Error("c:"+r)};return i},h=function(r,t){var e=r,n=t,o=new Array(r*t),i={};i.setPixel=function(r,t,n){o[t*e+r]=n},i.write=function(r){r.writeString("GIF87a"),r.writeShort(e),r.writeShort(n),r.writeByte(128),r.writeByte(0),r.writeByte(0),r.writeByte(0),r.writeByte(0),r.writeByte(0),r.writeByte(255),r.writeByte(255),r.writeByte(255),r.writeString(","),r.writeShort(0),r.writeShort(0),r.writeShort(e),r.writeShort(n),r.writeByte(0);var t=2,o=u(t);r.writeByte(t);for(var i=0;o.length-i>255;)r.writeByte(255),r.writeBytes(o,i,255),i+=255;r.writeByte(o.length-i),r.writeBytes(o,i,o.length-i),r.writeByte(0),r.writeString(";")};var a=function(r){var t=r,e=0,n=0,o={};return o.write=function(r,o){if(r>>>o!=0)throw new Error("length over");for(;e+o>=8;)t.writeByte(255&(r<<e|n)),o-=8-e,r>>>=8-e,n=0,e=0;n=r<<e|n,e+=o},o.flush=function(){e>0&&t.writeByte(n)},o},u=function(r){for(var t=1<<r,e=(1<<r)+1,n=r+1,i=f(),u=0;t>u;u+=1)i.add(String.fromCharCode(u));i.add(String.fromCharCode(t)),i.add(String.fromCharCode(e));var c=l(),s=a(c);s.write(t,n);var g=0,h=String.fromCharCode(o[g]);for(g+=1;g<o.length;){var v=String.fromCharCode(o[g]);g+=1,i.contains(h+v)?h+=v:(s.write(i.indexOf(h),n),i.size()<4095&&(i.size()==1<<n&&(n+=1),i.add(h+v)),h=v)}return s.write(i.indexOf(h),n),s.write(e,n),s.flush(),c.toByteArray()},f=function(){var r={},t=0,e={};return e.add=function(n){if(e.contains(n))throw new Error("dup key:"+n);r[n]=t,t+=1},e.size=function(){return t},e.indexOf=function(t){return r[t]},e.contains=function(t){return"undefined"!=typeof r[t]},e};return i},v=function(r,t,e,n){for(var o=h(r,t),i=0;t>i;i+=1)for(var a=0;r>a;a+=1)o.setPixel(a,i,e(a,i));var u=l();o.write(u);for(var f=s(),c=u.toByteArray(),g=0;g<c.length;g+=1)f.writeByte(c[g]);f.flush();var v="";return v+="<img",v+=' src="',v+="data:image/gif;base64,",v+=f,v+='"',v+=' width="',v+=r,v+='"',v+=' height="',v+=t,v+='"',n&&(v+=' alt="',v+=n,v+='"'),v+="/>"};return t}();return function(e){ true?!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (e), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):"object"==typeof t&&(r.exports=e())}(function(){return e}),!function(r){r.stringToBytes=function(r){function t(r){for(var t=[],e=0;e<r.length;e++){var n=r.charCodeAt(e);128>n?t.push(n):2048>n?t.push(192|n>>6,128|63&n):55296>n||n>=57344?t.push(224|n>>12,128|n>>6&63,128|63&n):(e++,n=65536+((1023&n)<<10|1023&r.charCodeAt(e)),t.push(240|n>>18,128|n>>12&63,128|n>>6&63,128|63&n))}return t}return t(r)}}(e),e}(),i=function(r,t){var i=arguments.length<=2||void 0===arguments[2]?1:arguments[2];i=Math.max(1,i);for(var a=i;40>=a;a+=1)try{var u=function(){var e=o(a,t);e.addData(r),e.make();var n=e.getModuleCount(),i=function(r,t){return r>=0&&n>r&&t>=0&&n>t&&e.isDark(r,t)};return{v:{text:r,level:t,version:a,moduleCount:n,isDark:i}}}();if("object"===("undefined"==typeof u?"undefined":e(u)))return u.v}catch(f){if(!n.test(f.message))throw f}return null},a=function(){var r=arguments.length<=0||void 0===arguments[0]?"":arguments[0],t=arguments.length<=1||void 0===arguments[1]?"L":arguments[1],e=arguments.length<=2||void 0===arguments[2]?1:arguments[2],n=arguments.length<=3||void 0===arguments[3]?0:arguments[3],o=i(r,t,e);return o&&!function(){var r=o.isDark;o.moduleCount+=2*n,o.isDark=function(t,e){return r(t-n,e-n)}}(),o};r.exports=a},function(r,t,e){"use strict";var n=e(5),o=e(6),i=function(r,t){r.fillStyle=t.back,r.fillRect(0,0,t.size,t.size)},a=function(r,t,e,n,o,i){r.isDark(o,i)&&t.rect(i*n,o*n,n,n)},u=function(r,t,e){if(r){var o=e.rounded>0&&e.rounded<=100?n:a,i=r.moduleCount,u=e.size/i,f=0;e.crisp&&(u=Math.floor(u),f=Math.floor((e.size-u*i)/2)),t.translate(f,f),t.beginPath();for(var c=0;i>c;c+=1)for(var l=0;i>l;l+=1)o(r,t,e,u,c,l);t.fillStyle=e.fill,t.fill(),t.translate(-f,-f)}},f=function(r,t,e){i(t,e),u(r,t,e),o(t,e)};r.exports=f},function(r,t){"use strict";var e=function(r){return{c:r,m:function(){var r;return(r=this.c).moveTo.apply(r,arguments),this},l:function(){var r;return(r=this.c).lineTo.apply(r,arguments),this},a:function(){var r;return(r=this.c).arcTo.apply(r,arguments),this}}},n=function(r,t,e,n,o,i,a,u,f,c){a?r.m(t+i,e):r.m(t,e),u?r.l(n-i,e).a(n,e,n,o,i):r.l(n,e),f?r.l(n,o-i).a(n,o,t,o,i):r.l(n,o),c?r.l(t+i,o).a(t,o,t,e,i):r.l(t,o),a?r.l(t,e+i).a(t,e,n,e,i):r.l(t,e)},o=function(r,t,e,n,o,i,a,u,f,c){a&&r.m(t+i,e).l(t,e).l(t,e+i).a(t,e,t+i,e,i),u&&r.m(n-i,e).l(n,e).l(n,e+i).a(n,e,n-i,e,i),f&&r.m(n-i,o).l(n,o).l(n,o-i).a(n,o,n-i,o,i),c&&r.m(t+i,o).l(t,o).l(t,o-i).a(t,o,t+i,o,i)},i=function(r,t,i,a,u,f){var c=f*a,l=u*a,s=c+a,g=l+a,h=.005*i.rounded*a,v=r.isDark,d=u-1,w=u+1,y=f-1,p=f+1,m=v(u,f),A=v(d,y),B=v(d,f),E=v(d,p),T=v(u,p),M=v(w,p),k=v(w,f),b=v(w,y),x=v(u,y),D=e(t);m?n(D,c,l,s,g,h,!B&&!x,!B&&!T,!k&&!T,!k&&!x):o(D,c,l,s,g,h,B&&x&&A,B&&T&&E,k&&T&&M,k&&x&&b)};r.exports=i},function(r,t){"use strict";var e=function(r,t){var e=t.size,n="bold "+.01*t.mSize*e+"px "+t.fontname;r.strokeStyle=t.back,r.lineWidth=.01*t.mSize*e*.1,r.fillStyle=t.fontcolor,r.font=n;var o=r.measureText(t.label).width,i=.01*t.mSize,a=o/e,u=(1-a)*t.mPosX*.01,f=(1-i)*t.mPosY*.01,c=u*e,l=f*e+.75*t.mSize*.01*e;r.strokeText(t.label,c,l),r.fillText(t.label,c,l)},n=function(r,t){var e=t.size,n=t.image.naturalWidth||1,o=t.image.naturalHeight||1,i=.01*t.mSize,a=i*n/o,u=(1-a)*t.mPosX*.01,f=(1-i)*t.mPosY*.01,c=u*e,l=f*e,s=a*e,g=i*e;r.drawImage(t.image,c,l,s,g)},o=function(r,t){var o=t.mode;"label"===o?e(r,t):"image"===o&&n(r,t)};r.exports=o}])});

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _uniqId = __webpack_require__(13);
	
	var _uniqId2 = _interopRequireDefault(_uniqId);
	
	var _miniDefer = __webpack_require__(7);
	
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
	      var handled = false;
	      if (action && this.handlers[action]) {
	        var handlers = this.handlers[action];
	        ret = handlers.map(function (fn) {
	          var _ret = void 0;
	          if (!halted) {
	            _ret = fn(data, responder);
	            if (false === _ret) {
	              halted = true;
	            }
	            handled = true;
	          }
	          return _ret;
	        });
	      }
	
	      if (action != '*' && this.handlers['*']) {
	        ret = ret.concat(this.handlers['*'].map(function (fn) {
	          return fn(action, data, handled ? null : responder);
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
	        alert('HB_APP_SDK: JSON解析失败, 请将当前界面截图反馈, 谢谢!\n' + JSON.stringify(err) + '\n' + eData);
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
	            delete this.promises[id];
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
/* 13 */
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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _index = __webpack_require__(9);
	
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
	      var params = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	      this.connect.resolve();
	
	      window.HB = window.HB || {};
	      window.HB.bridgeCallback = this.handleBridgeInvoke.bind(this, 'callback');
	      window.HB.bridgeCancel = this.handleBridgeInvoke.bind(this, 'cancel');
	      window.HB.bridgeEmit = this.handleBridgeInvoke.bind(this, 'emit');
	
	      return this._init(applicationId, params);
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
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _webview = __webpack_require__(14);
	
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
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _miniDefer = __webpack_require__(7);
	
	var _miniDefer2 = _interopRequireDefault(_miniDefer);
	
	var _const = __webpack_require__(1);
	
	var _channel = __webpack_require__(12);
	
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
	      this.ready(function () {
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
	
	      setTimeout(function () {
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
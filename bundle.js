/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _lodash = __webpack_require__(1);

	var _lodash2 = _interopRequireDefault(_lodash);

	var _processingJs = __webpack_require__(3);

	var _processingJs2 = _interopRequireDefault(_processingJs);

	var centerX = undefined,
	    centerY = undefined,
	    pHeight = undefined,
	    pWidth = undefined,
	    mouse_x = undefined,
	    mouse_y = undefined,
	    frameRate = 60,
	    walker = undefined;

	function sketchProc(p5) {

	    'use strict';

	    function getRandomInt(max) {
	        return 0 | Math.random() * max + 1;
	    }

	    function Walker(x, y) {
	        this.x = x;
	        this.y = y;
	    }

	    Walker.prototype.display = function (i) {
	        var x = this.x;
	        var y = this.y;
	        p5.stroke(255, 255);
	        p5.strokeWeight(5);

	        p5.point(x, y);
	        if (this.x % 2 === 0 || this.y % 2 === 0) {
	            p5.stroke(p5.random(0, 255), p5.random(0, 255), p5.random(0, 255));
	            p5.noFill();
	            p5.ellipse(x, y, 20, 20);
	            //p5.bezier(x, y, x - 10, y + 10, x + 10, y + 50, x + 10, y);
	        }
	        p5.point(x + 10, y);
	    };

	    Walker.prototype.walk = function (direction) {
	        var cx = getRandomInt(4);
	        var cy = getRandomInt(4);
	        if (direction === 'right') {
	            if (cy === 1) {
	                this.y--;
	            } else if (cx === 2) {
	                this.x--;
	            } else if (cy === 3) {
	                this.y++;
	            } else {
	                this.x++;
	            }
	        } else {
	            if (cy === 3) {
	                this.y++;
	            } else if (cx === 2) {
	                this.x++;
	            } else if (cy === 1) {
	                this.y--;
	            } else {
	                this.x--;
	            }
	        }
	        //console.log(cx,cy);
	    };

	    Walker.prototype.tick = function (opts) {
	        this.walk(opts.direction);
	        this.display(opts.inf);
	    };

	    Walker.prototype.stop = function () {
	        this.x = 0;
	        this.y = 0;
	    };

	    function LFO(max) {
	        this.max = max;
	    }

	    LFO.prototype.tick = function () {
	        return this.max * Math.sin(p5.radians(Math.PI * p5.frameCount));
	    };

	    var lfo1 = new LFO(200);
	    var lfo2 = new LFO(200);

	    function drawShape(x, y) {
	        var n = parseInt(lfo1.tick(), 10);
	        var m = parseInt(lfo2.tick(), 10);
	        //var xRand = p5.lerp(n,1,n,1);
	        for (var i = 1; i < 100; i++) {
	            var noise = p5.noise(5) * 20;
	            p5.pushMatrix();
	            p5.translate(centerX, 250);
	            p5.rotate(10);
	            p5.fill(n, 20, i, 77);
	            p5.strokeWeight(0.5);
	            p5.stroke(120.0);
	            p5.bezier(i, i, n, y, i, i * m, x, i);
	            p5.popMatrix();
	        }
	    }

	    var rColor = [p5.random(120, 255), p5.random(120, 255), p5.random(120, 255)];
	    var verde = [220, 247, 238];
	    var fontA = p5.loadFont('Gulim.ttf');
	    var rightWalkers = [],
	        leftWalkers = [];
	    _lodash2['default'].times(3, function (i) {
	        rightWalkers.push(new Walker(0, -100 * i));
	    });
	    _lodash2['default'].times(3, function (i) {
	        leftWalkers.push(new Walker(0, -100 * i));
	    });

	    p5.setup = function () {
	        p5.size(570, 500);
	        centerX = p5.width / 2;
	        centerY = p5.height / 2;
	        pWidth = p5.width;
	        pHeight = p5.height;
	        p5.textFont(fontA, 34);
	        p5.frameRate(frameRate);
	        p5.smooth();
	        p5.background.apply(this, rColor);
	        p5.strokeWeight(0.55);
	        p5.stroke(120);
	        p5.noFill();
	        p5.ellipse(pWidth - 60, pHeight - 60, 100, 100);
	        p5.fill(0);
	        p5.textSize(14);
	        p5.text('//', pWidth - 2, pHeight - 55);
	    };

	    p5.draw = function () {
	        p5.fill.apply(this, verde);
	        p5.pushMatrix();
	        p5.translate(centerX, centerY);
	        rightWalkers.forEach(function (w) {
	            w.tick({ direction: 'left', inf: mouse_x * mouse_y });
	        });
	        leftWalkers.forEach(function (w) {
	            w.tick({ direction: 'right' });
	        });
	        p5.popMatrix();
	        p5.pushMatrix();
	        p5.textAlign(100, 400);
	        p5.textSize(64);
	        p5.stroke(0, 0);
	        p5.text('SIGNAL-TO-NOISE', 135, 28);
	        p5.fill.apply(this, verde);
	        _lodash2['default'].times(50, function (i) {
	            p5.text('IMM.ATERIAL', 150, i * 28);
	        });
	        p5.popMatrix();
	        // bezier(x1, y1, cx1, cy1, cx2, cy2, x2, y2);
	        p5.bezier(0, centerY, lfo1.tick(), lfo1.tick(), lfo1.tick(), lfo1.tick(), pWidth, centerY);
	    };
	}

	var canvas = document.getElementById('canvas1');
	var p5 = new Processing(canvas, sketchProc);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global) {/**
	 * @license
	 * lodash 3.10.0 (Custom Build) <https://lodash.com/>
	 * Build: `lodash modern -d -o ./index.js`
	 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 * Available under MIT license <https://lodash.com/license>
	 */
	;(function() {

	  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
	  var undefined;

	  /** Used as the semantic version number. */
	  var VERSION = '3.10.0';

	  /** Used to compose bitmasks for wrapper metadata. */
	  var BIND_FLAG = 1,
	      BIND_KEY_FLAG = 2,
	      CURRY_BOUND_FLAG = 4,
	      CURRY_FLAG = 8,
	      CURRY_RIGHT_FLAG = 16,
	      PARTIAL_FLAG = 32,
	      PARTIAL_RIGHT_FLAG = 64,
	      ARY_FLAG = 128,
	      REARG_FLAG = 256;

	  /** Used as default options for `_.trunc`. */
	  var DEFAULT_TRUNC_LENGTH = 30,
	      DEFAULT_TRUNC_OMISSION = '...';

	  /** Used to detect when a function becomes hot. */
	  var HOT_COUNT = 150,
	      HOT_SPAN = 16;

	  /** Used as the size to enable large array optimizations. */
	  var LARGE_ARRAY_SIZE = 200;

	  /** Used to indicate the type of lazy iteratees. */
	  var LAZY_FILTER_FLAG = 1,
	      LAZY_MAP_FLAG = 2;

	  /** Used as the `TypeError` message for "Functions" methods. */
	  var FUNC_ERROR_TEXT = 'Expected a function';

	  /** Used as the internal argument placeholder. */
	  var PLACEHOLDER = '__lodash_placeholder__';

	  /** `Object#toString` result references. */
	  var argsTag = '[object Arguments]',
	      arrayTag = '[object Array]',
	      boolTag = '[object Boolean]',
	      dateTag = '[object Date]',
	      errorTag = '[object Error]',
	      funcTag = '[object Function]',
	      mapTag = '[object Map]',
	      numberTag = '[object Number]',
	      objectTag = '[object Object]',
	      regexpTag = '[object RegExp]',
	      setTag = '[object Set]',
	      stringTag = '[object String]',
	      weakMapTag = '[object WeakMap]';

	  var arrayBufferTag = '[object ArrayBuffer]',
	      float32Tag = '[object Float32Array]',
	      float64Tag = '[object Float64Array]',
	      int8Tag = '[object Int8Array]',
	      int16Tag = '[object Int16Array]',
	      int32Tag = '[object Int32Array]',
	      uint8Tag = '[object Uint8Array]',
	      uint8ClampedTag = '[object Uint8ClampedArray]',
	      uint16Tag = '[object Uint16Array]',
	      uint32Tag = '[object Uint32Array]';

	  /** Used to match empty string literals in compiled template source. */
	  var reEmptyStringLeading = /\b__p \+= '';/g,
	      reEmptyStringMiddle = /\b(__p \+=) '' \+/g,
	      reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;

	  /** Used to match HTML entities and HTML characters. */
	  var reEscapedHtml = /&(?:amp|lt|gt|quot|#39|#96);/g,
	      reUnescapedHtml = /[&<>"'`]/g,
	      reHasEscapedHtml = RegExp(reEscapedHtml.source),
	      reHasUnescapedHtml = RegExp(reUnescapedHtml.source);

	  /** Used to match template delimiters. */
	  var reEscape = /<%-([\s\S]+?)%>/g,
	      reEvaluate = /<%([\s\S]+?)%>/g,
	      reInterpolate = /<%=([\s\S]+?)%>/g;

	  /** Used to match property names within property paths. */
	  var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\n\\]|\\.)*?\1)\]/,
	      reIsPlainProp = /^\w*$/,
	      rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g;

	  /**
	   * Used to match `RegExp` [syntax characters](http://ecma-international.org/ecma-262/6.0/#sec-patterns)
	   * and those outlined by [`EscapeRegExpPattern`](http://ecma-international.org/ecma-262/6.0/#sec-escaperegexppattern).
	   */
	  var reRegExpChars = /^[:!,]|[\\^$.*+?()[\]{}|\/]|(^[0-9a-fA-Fnrtuvx])|([\n\r\u2028\u2029])/g,
	      reHasRegExpChars = RegExp(reRegExpChars.source);

	  /** Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks). */
	  var reComboMark = /[\u0300-\u036f\ufe20-\ufe23]/g;

	  /** Used to match backslashes in property paths. */
	  var reEscapeChar = /\\(\\)?/g;

	  /** Used to match [ES template delimiters](http://ecma-international.org/ecma-262/6.0/#sec-template-literal-lexical-components). */
	  var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;

	  /** Used to match `RegExp` flags from their coerced string values. */
	  var reFlags = /\w*$/;

	  /** Used to detect hexadecimal string values. */
	  var reHasHexPrefix = /^0[xX]/;

	  /** Used to detect host constructors (Safari > 5). */
	  var reIsHostCtor = /^\[object .+?Constructor\]$/;

	  /** Used to detect unsigned integer values. */
	  var reIsUint = /^\d+$/;

	  /** Used to match latin-1 supplementary letters (excluding mathematical operators). */
	  var reLatin1 = /[\xc0-\xd6\xd8-\xde\xdf-\xf6\xf8-\xff]/g;

	  /** Used to ensure capturing order of template delimiters. */
	  var reNoMatch = /($^)/;

	  /** Used to match unescaped characters in compiled string literals. */
	  var reUnescapedString = /['\n\r\u2028\u2029\\]/g;

	  /** Used to match words to create compound words. */
	  var reWords = (function() {
	    var upper = '[A-Z\\xc0-\\xd6\\xd8-\\xde]',
	        lower = '[a-z\\xdf-\\xf6\\xf8-\\xff]+';

	    return RegExp(upper + '+(?=' + upper + lower + ')|' + upper + '?' + lower + '|' + upper + '+|[0-9]+', 'g');
	  }());

	  /** Used to assign default `context` object properties. */
	  var contextProps = [
	    'Array', 'ArrayBuffer', 'Date', 'Error', 'Float32Array', 'Float64Array',
	    'Function', 'Int8Array', 'Int16Array', 'Int32Array', 'Math', 'Number',
	    'Object', 'RegExp', 'Set', 'String', '_', 'clearTimeout', 'isFinite',
	    'parseFloat', 'parseInt', 'setTimeout', 'TypeError', 'Uint8Array',
	    'Uint8ClampedArray', 'Uint16Array', 'Uint32Array', 'WeakMap'
	  ];

	  /** Used to make template sourceURLs easier to identify. */
	  var templateCounter = -1;

	  /** Used to identify `toStringTag` values of typed arrays. */
	  var typedArrayTags = {};
	  typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
	  typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
	  typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
	  typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
	  typedArrayTags[uint32Tag] = true;
	  typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
	  typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
	  typedArrayTags[dateTag] = typedArrayTags[errorTag] =
	  typedArrayTags[funcTag] = typedArrayTags[mapTag] =
	  typedArrayTags[numberTag] = typedArrayTags[objectTag] =
	  typedArrayTags[regexpTag] = typedArrayTags[setTag] =
	  typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

	  /** Used to identify `toStringTag` values supported by `_.clone`. */
	  var cloneableTags = {};
	  cloneableTags[argsTag] = cloneableTags[arrayTag] =
	  cloneableTags[arrayBufferTag] = cloneableTags[boolTag] =
	  cloneableTags[dateTag] = cloneableTags[float32Tag] =
	  cloneableTags[float64Tag] = cloneableTags[int8Tag] =
	  cloneableTags[int16Tag] = cloneableTags[int32Tag] =
	  cloneableTags[numberTag] = cloneableTags[objectTag] =
	  cloneableTags[regexpTag] = cloneableTags[stringTag] =
	  cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
	  cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
	  cloneableTags[errorTag] = cloneableTags[funcTag] =
	  cloneableTags[mapTag] = cloneableTags[setTag] =
	  cloneableTags[weakMapTag] = false;

	  /** Used to map latin-1 supplementary letters to basic latin letters. */
	  var deburredLetters = {
	    '\xc0': 'A',  '\xc1': 'A', '\xc2': 'A', '\xc3': 'A', '\xc4': 'A', '\xc5': 'A',
	    '\xe0': 'a',  '\xe1': 'a', '\xe2': 'a', '\xe3': 'a', '\xe4': 'a', '\xe5': 'a',
	    '\xc7': 'C',  '\xe7': 'c',
	    '\xd0': 'D',  '\xf0': 'd',
	    '\xc8': 'E',  '\xc9': 'E', '\xca': 'E', '\xcb': 'E',
	    '\xe8': 'e',  '\xe9': 'e', '\xea': 'e', '\xeb': 'e',
	    '\xcC': 'I',  '\xcd': 'I', '\xce': 'I', '\xcf': 'I',
	    '\xeC': 'i',  '\xed': 'i', '\xee': 'i', '\xef': 'i',
	    '\xd1': 'N',  '\xf1': 'n',
	    '\xd2': 'O',  '\xd3': 'O', '\xd4': 'O', '\xd5': 'O', '\xd6': 'O', '\xd8': 'O',
	    '\xf2': 'o',  '\xf3': 'o', '\xf4': 'o', '\xf5': 'o', '\xf6': 'o', '\xf8': 'o',
	    '\xd9': 'U',  '\xda': 'U', '\xdb': 'U', '\xdc': 'U',
	    '\xf9': 'u',  '\xfa': 'u', '\xfb': 'u', '\xfc': 'u',
	    '\xdd': 'Y',  '\xfd': 'y', '\xff': 'y',
	    '\xc6': 'Ae', '\xe6': 'ae',
	    '\xde': 'Th', '\xfe': 'th',
	    '\xdf': 'ss'
	  };

	  /** Used to map characters to HTML entities. */
	  var htmlEscapes = {
	    '&': '&amp;',
	    '<': '&lt;',
	    '>': '&gt;',
	    '"': '&quot;',
	    "'": '&#39;',
	    '`': '&#96;'
	  };

	  /** Used to map HTML entities to characters. */
	  var htmlUnescapes = {
	    '&amp;': '&',
	    '&lt;': '<',
	    '&gt;': '>',
	    '&quot;': '"',
	    '&#39;': "'",
	    '&#96;': '`'
	  };

	  /** Used to determine if values are of the language type `Object`. */
	  var objectTypes = {
	    'function': true,
	    'object': true
	  };

	  /** Used to escape characters for inclusion in compiled regexes. */
	  var regexpEscapes = {
	    '0': 'x30', '1': 'x31', '2': 'x32', '3': 'x33', '4': 'x34',
	    '5': 'x35', '6': 'x36', '7': 'x37', '8': 'x38', '9': 'x39',
	    'A': 'x41', 'B': 'x42', 'C': 'x43', 'D': 'x44', 'E': 'x45', 'F': 'x46',
	    'a': 'x61', 'b': 'x62', 'c': 'x63', 'd': 'x64', 'e': 'x65', 'f': 'x66',
	    'n': 'x6e', 'r': 'x72', 't': 'x74', 'u': 'x75', 'v': 'x76', 'x': 'x78'
	  };

	  /** Used to escape characters for inclusion in compiled string literals. */
	  var stringEscapes = {
	    '\\': '\\',
	    "'": "'",
	    '\n': 'n',
	    '\r': 'r',
	    '\u2028': 'u2028',
	    '\u2029': 'u2029'
	  };

	  /** Detect free variable `exports`. */
	  var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;

	  /** Detect free variable `module`. */
	  var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;

	  /** Detect free variable `global` from Node.js. */
	  var freeGlobal = freeExports && freeModule && typeof global == 'object' && global && global.Object && global;

	  /** Detect free variable `self`. */
	  var freeSelf = objectTypes[typeof self] && self && self.Object && self;

	  /** Detect free variable `window`. */
	  var freeWindow = objectTypes[typeof window] && window && window.Object && window;

	  /** Detect the popular CommonJS extension `module.exports`. */
	  var moduleExports = freeModule && freeModule.exports === freeExports && freeExports;

	  /**
	   * Used as a reference to the global object.
	   *
	   * The `this` value is used if it's the global object to avoid Greasemonkey's
	   * restricted `window` object, otherwise the `window` object is used.
	   */
	  var root = freeGlobal || ((freeWindow !== (this && this.window)) && freeWindow) || freeSelf || this;

	  /*--------------------------------------------------------------------------*/

	  /**
	   * The base implementation of `compareAscending` which compares values and
	   * sorts them in ascending order without guaranteeing a stable sort.
	   *
	   * @private
	   * @param {*} value The value to compare.
	   * @param {*} other The other value to compare.
	   * @returns {number} Returns the sort order indicator for `value`.
	   */
	  function baseCompareAscending(value, other) {
	    if (value !== other) {
	      var valIsNull = value === null,
	          valIsUndef = value === undefined,
	          valIsReflexive = value === value;

	      var othIsNull = other === null,
	          othIsUndef = other === undefined,
	          othIsReflexive = other === other;

	      if ((value > other && !othIsNull) || !valIsReflexive ||
	          (valIsNull && !othIsUndef && othIsReflexive) ||
	          (valIsUndef && othIsReflexive)) {
	        return 1;
	      }
	      if ((value < other && !valIsNull) || !othIsReflexive ||
	          (othIsNull && !valIsUndef && valIsReflexive) ||
	          (othIsUndef && valIsReflexive)) {
	        return -1;
	      }
	    }
	    return 0;
	  }

	  /**
	   * The base implementation of `_.findIndex` and `_.findLastIndex` without
	   * support for callback shorthands and `this` binding.
	   *
	   * @private
	   * @param {Array} array The array to search.
	   * @param {Function} predicate The function invoked per iteration.
	   * @param {boolean} [fromRight] Specify iterating from right to left.
	   * @returns {number} Returns the index of the matched value, else `-1`.
	   */
	  function baseFindIndex(array, predicate, fromRight) {
	    var length = array.length,
	        index = fromRight ? length : -1;

	    while ((fromRight ? index-- : ++index < length)) {
	      if (predicate(array[index], index, array)) {
	        return index;
	      }
	    }
	    return -1;
	  }

	  /**
	   * The base implementation of `_.indexOf` without support for binary searches.
	   *
	   * @private
	   * @param {Array} array The array to search.
	   * @param {*} value The value to search for.
	   * @param {number} fromIndex The index to search from.
	   * @returns {number} Returns the index of the matched value, else `-1`.
	   */
	  function baseIndexOf(array, value, fromIndex) {
	    if (value !== value) {
	      return indexOfNaN(array, fromIndex);
	    }
	    var index = fromIndex - 1,
	        length = array.length;

	    while (++index < length) {
	      if (array[index] === value) {
	        return index;
	      }
	    }
	    return -1;
	  }

	  /**
	   * The base implementation of `_.isFunction` without support for environments
	   * with incorrect `typeof` results.
	   *
	   * @private
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	   */
	  function baseIsFunction(value) {
	    // Avoid a Chakra JIT bug in compatibility modes of IE 11.
	    // See https://github.com/jashkenas/underscore/issues/1621 for more details.
	    return typeof value == 'function' || false;
	  }

	  /**
	   * Converts `value` to a string if it's not one. An empty string is returned
	   * for `null` or `undefined` values.
	   *
	   * @private
	   * @param {*} value The value to process.
	   * @returns {string} Returns the string.
	   */
	  function baseToString(value) {
	    return value == null ? '' : (value + '');
	  }

	  /**
	   * Used by `_.trim` and `_.trimLeft` to get the index of the first character
	   * of `string` that is not found in `chars`.
	   *
	   * @private
	   * @param {string} string The string to inspect.
	   * @param {string} chars The characters to find.
	   * @returns {number} Returns the index of the first character not found in `chars`.
	   */
	  function charsLeftIndex(string, chars) {
	    var index = -1,
	        length = string.length;

	    while (++index < length && chars.indexOf(string.charAt(index)) > -1) {}
	    return index;
	  }

	  /**
	   * Used by `_.trim` and `_.trimRight` to get the index of the last character
	   * of `string` that is not found in `chars`.
	   *
	   * @private
	   * @param {string} string The string to inspect.
	   * @param {string} chars The characters to find.
	   * @returns {number} Returns the index of the last character not found in `chars`.
	   */
	  function charsRightIndex(string, chars) {
	    var index = string.length;

	    while (index-- && chars.indexOf(string.charAt(index)) > -1) {}
	    return index;
	  }

	  /**
	   * Used by `_.sortBy` to compare transformed elements of a collection and stable
	   * sort them in ascending order.
	   *
	   * @private
	   * @param {Object} object The object to compare.
	   * @param {Object} other The other object to compare.
	   * @returns {number} Returns the sort order indicator for `object`.
	   */
	  function compareAscending(object, other) {
	    return baseCompareAscending(object.criteria, other.criteria) || (object.index - other.index);
	  }

	  /**
	   * Used by `_.sortByOrder` to compare multiple properties of a value to another
	   * and stable sort them.
	   *
	   * If `orders` is unspecified, all valuess are sorted in ascending order. Otherwise,
	   * a value is sorted in ascending order if its corresponding order is "asc", and
	   * descending if "desc".
	   *
	   * @private
	   * @param {Object} object The object to compare.
	   * @param {Object} other The other object to compare.
	   * @param {boolean[]} orders The order to sort by for each property.
	   * @returns {number} Returns the sort order indicator for `object`.
	   */
	  function compareMultiple(object, other, orders) {
	    var index = -1,
	        objCriteria = object.criteria,
	        othCriteria = other.criteria,
	        length = objCriteria.length,
	        ordersLength = orders.length;

	    while (++index < length) {
	      var result = baseCompareAscending(objCriteria[index], othCriteria[index]);
	      if (result) {
	        if (index >= ordersLength) {
	          return result;
	        }
	        var order = orders[index];
	        return result * ((order === 'asc' || order === true) ? 1 : -1);
	      }
	    }
	    // Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
	    // that causes it, under certain circumstances, to provide the same value for
	    // `object` and `other`. See https://github.com/jashkenas/underscore/pull/1247
	    // for more details.
	    //
	    // This also ensures a stable sort in V8 and other engines.
	    // See https://code.google.com/p/v8/issues/detail?id=90 for more details.
	    return object.index - other.index;
	  }

	  /**
	   * Used by `_.deburr` to convert latin-1 supplementary letters to basic latin letters.
	   *
	   * @private
	   * @param {string} letter The matched letter to deburr.
	   * @returns {string} Returns the deburred letter.
	   */
	  function deburrLetter(letter) {
	    return deburredLetters[letter];
	  }

	  /**
	   * Used by `_.escape` to convert characters to HTML entities.
	   *
	   * @private
	   * @param {string} chr The matched character to escape.
	   * @returns {string} Returns the escaped character.
	   */
	  function escapeHtmlChar(chr) {
	    return htmlEscapes[chr];
	  }

	  /**
	   * Used by `_.escapeRegExp` to escape characters for inclusion in compiled regexes.
	   *
	   * @private
	   * @param {string} chr The matched character to escape.
	   * @param {string} leadingChar The capture group for a leading character.
	   * @param {string} whitespaceChar The capture group for a whitespace character.
	   * @returns {string} Returns the escaped character.
	   */
	  function escapeRegExpChar(chr, leadingChar, whitespaceChar) {
	    if (leadingChar) {
	      chr = regexpEscapes[chr];
	    } else if (whitespaceChar) {
	      chr = stringEscapes[chr];
	    }
	    return '\\' + chr;
	  }

	  /**
	   * Used by `_.template` to escape characters for inclusion in compiled string literals.
	   *
	   * @private
	   * @param {string} chr The matched character to escape.
	   * @returns {string} Returns the escaped character.
	   */
	  function escapeStringChar(chr) {
	    return '\\' + stringEscapes[chr];
	  }

	  /**
	   * Gets the index at which the first occurrence of `NaN` is found in `array`.
	   *
	   * @private
	   * @param {Array} array The array to search.
	   * @param {number} fromIndex The index to search from.
	   * @param {boolean} [fromRight] Specify iterating from right to left.
	   * @returns {number} Returns the index of the matched `NaN`, else `-1`.
	   */
	  function indexOfNaN(array, fromIndex, fromRight) {
	    var length = array.length,
	        index = fromIndex + (fromRight ? 0 : -1);

	    while ((fromRight ? index-- : ++index < length)) {
	      var other = array[index];
	      if (other !== other) {
	        return index;
	      }
	    }
	    return -1;
	  }

	  /**
	   * Checks if `value` is object-like.
	   *
	   * @private
	   * @param {*} value The value to check.
	   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	   */
	  function isObjectLike(value) {
	    return !!value && typeof value == 'object';
	  }

	  /**
	   * Used by `trimmedLeftIndex` and `trimmedRightIndex` to determine if a
	   * character code is whitespace.
	   *
	   * @private
	   * @param {number} charCode The character code to inspect.
	   * @returns {boolean} Returns `true` if `charCode` is whitespace, else `false`.
	   */
	  function isSpace(charCode) {
	    return ((charCode <= 160 && (charCode >= 9 && charCode <= 13) || charCode == 32 || charCode == 160) || charCode == 5760 || charCode == 6158 ||
	      (charCode >= 8192 && (charCode <= 8202 || charCode == 8232 || charCode == 8233 || charCode == 8239 || charCode == 8287 || charCode == 12288 || charCode == 65279)));
	  }

	  /**
	   * Replaces all `placeholder` elements in `array` with an internal placeholder
	   * and returns an array of their indexes.
	   *
	   * @private
	   * @param {Array} array The array to modify.
	   * @param {*} placeholder The placeholder to replace.
	   * @returns {Array} Returns the new array of placeholder indexes.
	   */
	  function replaceHolders(array, placeholder) {
	    var index = -1,
	        length = array.length,
	        resIndex = -1,
	        result = [];

	    while (++index < length) {
	      if (array[index] === placeholder) {
	        array[index] = PLACEHOLDER;
	        result[++resIndex] = index;
	      }
	    }
	    return result;
	  }

	  /**
	   * An implementation of `_.uniq` optimized for sorted arrays without support
	   * for callback shorthands and `this` binding.
	   *
	   * @private
	   * @param {Array} array The array to inspect.
	   * @param {Function} [iteratee] The function invoked per iteration.
	   * @returns {Array} Returns the new duplicate-value-free array.
	   */
	  function sortedUniq(array, iteratee) {
	    var seen,
	        index = -1,
	        length = array.length,
	        resIndex = -1,
	        result = [];

	    while (++index < length) {
	      var value = array[index],
	          computed = iteratee ? iteratee(value, index, array) : value;

	      if (!index || seen !== computed) {
	        seen = computed;
	        result[++resIndex] = value;
	      }
	    }
	    return result;
	  }

	  /**
	   * Used by `_.trim` and `_.trimLeft` to get the index of the first non-whitespace
	   * character of `string`.
	   *
	   * @private
	   * @param {string} string The string to inspect.
	   * @returns {number} Returns the index of the first non-whitespace character.
	   */
	  function trimmedLeftIndex(string) {
	    var index = -1,
	        length = string.length;

	    while (++index < length && isSpace(string.charCodeAt(index))) {}
	    return index;
	  }

	  /**
	   * Used by `_.trim` and `_.trimRight` to get the index of the last non-whitespace
	   * character of `string`.
	   *
	   * @private
	   * @param {string} string The string to inspect.
	   * @returns {number} Returns the index of the last non-whitespace character.
	   */
	  function trimmedRightIndex(string) {
	    var index = string.length;

	    while (index-- && isSpace(string.charCodeAt(index))) {}
	    return index;
	  }

	  /**
	   * Used by `_.unescape` to convert HTML entities to characters.
	   *
	   * @private
	   * @param {string} chr The matched character to unescape.
	   * @returns {string} Returns the unescaped character.
	   */
	  function unescapeHtmlChar(chr) {
	    return htmlUnescapes[chr];
	  }

	  /*--------------------------------------------------------------------------*/

	  /**
	   * Create a new pristine `lodash` function using the given `context` object.
	   *
	   * @static
	   * @memberOf _
	   * @category Utility
	   * @param {Object} [context=root] The context object.
	   * @returns {Function} Returns a new `lodash` function.
	   * @example
	   *
	   * _.mixin({ 'foo': _.constant('foo') });
	   *
	   * var lodash = _.runInContext();
	   * lodash.mixin({ 'bar': lodash.constant('bar') });
	   *
	   * _.isFunction(_.foo);
	   * // => true
	   * _.isFunction(_.bar);
	   * // => false
	   *
	   * lodash.isFunction(lodash.foo);
	   * // => false
	   * lodash.isFunction(lodash.bar);
	   * // => true
	   *
	   * // using `context` to mock `Date#getTime` use in `_.now`
	   * var mock = _.runInContext({
	   *   'Date': function() {
	   *     return { 'getTime': getTimeMock };
	   *   }
	   * });
	   *
	   * // or creating a suped-up `defer` in Node.js
	   * var defer = _.runInContext({ 'setTimeout': setImmediate }).defer;
	   */
	  function runInContext(context) {
	    // Avoid issues with some ES3 environments that attempt to use values, named
	    // after built-in constructors like `Object`, for the creation of literals.
	    // ES5 clears this up by stating that literals must use built-in constructors.
	    // See https://es5.github.io/#x11.1.5 for more details.
	    context = context ? _.defaults(root.Object(), context, _.pick(root, contextProps)) : root;

	    /** Native constructor references. */
	    var Array = context.Array,
	        Date = context.Date,
	        Error = context.Error,
	        Function = context.Function,
	        Math = context.Math,
	        Number = context.Number,
	        Object = context.Object,
	        RegExp = context.RegExp,
	        String = context.String,
	        TypeError = context.TypeError;

	    /** Used for native method references. */
	    var arrayProto = Array.prototype,
	        objectProto = Object.prototype,
	        stringProto = String.prototype;

	    /** Used to resolve the decompiled source of functions. */
	    var fnToString = Function.prototype.toString;

	    /** Used to check objects for own properties. */
	    var hasOwnProperty = objectProto.hasOwnProperty;

	    /** Used to generate unique IDs. */
	    var idCounter = 0;

	    /**
	     * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	     * of values.
	     */
	    var objToString = objectProto.toString;

	    /** Used to restore the original `_` reference in `_.noConflict`. */
	    var oldDash = root._;

	    /** Used to detect if a method is native. */
	    var reIsNative = RegExp('^' +
	      fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
	      .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	    );

	    /** Native method references. */
	    var ArrayBuffer = context.ArrayBuffer,
	        clearTimeout = context.clearTimeout,
	        parseFloat = context.parseFloat,
	        pow = Math.pow,
	        propertyIsEnumerable = objectProto.propertyIsEnumerable,
	        Set = getNative(context, 'Set'),
	        setTimeout = context.setTimeout,
	        splice = arrayProto.splice,
	        Uint8Array = context.Uint8Array,
	        WeakMap = getNative(context, 'WeakMap');

	    /* Native method references for those with the same name as other `lodash` methods. */
	    var nativeCeil = Math.ceil,
	        nativeCreate = getNative(Object, 'create'),
	        nativeFloor = Math.floor,
	        nativeIsArray = getNative(Array, 'isArray'),
	        nativeIsFinite = context.isFinite,
	        nativeKeys = getNative(Object, 'keys'),
	        nativeMax = Math.max,
	        nativeMin = Math.min,
	        nativeNow = getNative(Date, 'now'),
	        nativeParseInt = context.parseInt,
	        nativeRandom = Math.random;

	    /** Used as references for `-Infinity` and `Infinity`. */
	    var NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY,
	        POSITIVE_INFINITY = Number.POSITIVE_INFINITY;

	    /** Used as references for the maximum length and index of an array. */
	    var MAX_ARRAY_LENGTH = 4294967295,
	        MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1,
	        HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;

	    /**
	     * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	     * of an array-like value.
	     */
	    var MAX_SAFE_INTEGER = 9007199254740991;

	    /** Used to store function metadata. */
	    var metaMap = WeakMap && new WeakMap;

	    /** Used to lookup unminified function names. */
	    var realNames = {};

	    /*------------------------------------------------------------------------*/

	    /**
	     * Creates a `lodash` object which wraps `value` to enable implicit chaining.
	     * Methods that operate on and return arrays, collections, and functions can
	     * be chained together. Methods that retrieve a single value or may return a
	     * primitive value will automatically end the chain returning the unwrapped
	     * value. Explicit chaining may be enabled using `_.chain`. The execution of
	     * chained methods is lazy, that is, execution is deferred until `_#value`
	     * is implicitly or explicitly called.
	     *
	     * Lazy evaluation allows several methods to support shortcut fusion. Shortcut
	     * fusion is an optimization strategy which merge iteratee calls; this can help
	     * to avoid the creation of intermediate data structures and greatly reduce the
	     * number of iteratee executions.
	     *
	     * Chaining is supported in custom builds as long as the `_#value` method is
	     * directly or indirectly included in the build.
	     *
	     * In addition to lodash methods, wrappers have `Array` and `String` methods.
	     *
	     * The wrapper `Array` methods are:
	     * `concat`, `join`, `pop`, `push`, `reverse`, `shift`, `slice`, `sort`,
	     * `splice`, and `unshift`
	     *
	     * The wrapper `String` methods are:
	     * `replace` and `split`
	     *
	     * The wrapper methods that support shortcut fusion are:
	     * `compact`, `drop`, `dropRight`, `dropRightWhile`, `dropWhile`, `filter`,
	     * `first`, `initial`, `last`, `map`, `pluck`, `reject`, `rest`, `reverse`,
	     * `slice`, `take`, `takeRight`, `takeRightWhile`, `takeWhile`, `toArray`,
	     * and `where`
	     *
	     * The chainable wrapper methods are:
	     * `after`, `ary`, `assign`, `at`, `before`, `bind`, `bindAll`, `bindKey`,
	     * `callback`, `chain`, `chunk`, `commit`, `compact`, `concat`, `constant`,
	     * `countBy`, `create`, `curry`, `debounce`, `defaults`, `defaultsDeep`,
	     * `defer`, `delay`, `difference`, `drop`, `dropRight`, `dropRightWhile`,
	     * `dropWhile`, `fill`, `filter`, `flatten`, `flattenDeep`, `flow`, `flowRight`,
	     * `forEach`, `forEachRight`, `forIn`, `forInRight`, `forOwn`, `forOwnRight`,
	     * `functions`, `groupBy`, `indexBy`, `initial`, `intersection`, `invert`,
	     * `invoke`, `keys`, `keysIn`, `map`, `mapKeys`, `mapValues`, `matches`,
	     * `matchesProperty`, `memoize`, `merge`, `method`, `methodOf`, `mixin`,
	     * `modArgs`, `negate`, `omit`, `once`, `pairs`, `partial`, `partialRight`,
	     * `partition`, `pick`, `plant`, `pluck`, `property`, `propertyOf`, `pull`,
	     * `pullAt`, `push`, `range`, `rearg`, `reject`, `remove`, `rest`, `restParam`,
	     * `reverse`, `set`, `shuffle`, `slice`, `sort`, `sortBy`, `sortByAll`,
	     * `sortByOrder`, `splice`, `spread`, `take`, `takeRight`, `takeRightWhile`,
	     * `takeWhile`, `tap`, `throttle`, `thru`, `times`, `toArray`, `toPlainObject`,
	     * `transform`, `union`, `uniq`, `unshift`, `unzip`, `unzipWith`, `values`,
	     * `valuesIn`, `where`, `without`, `wrap`, `xor`, `zip`, `zipObject`, `zipWith`
	     *
	     * The wrapper methods that are **not** chainable by default are:
	     * `add`, `attempt`, `camelCase`, `capitalize`, `ceil`, `clone`, `cloneDeep`,
	     * `deburr`, `endsWith`, `escape`, `escapeRegExp`, `every`, `find`, `findIndex`,
	     * `findKey`, `findLast`, `findLastIndex`, `findLastKey`, `findWhere`, `first`,
	     * `floor`, `get`, `gt`, `gte`, `has`, `identity`, `includes`, `indexOf`,
	     * `inRange`, `isArguments`, `isArray`, `isBoolean`, `isDate`, `isElement`,
	     * `isEmpty`, `isEqual`, `isError`, `isFinite` `isFunction`, `isMatch`,
	     * `isNative`, `isNaN`, `isNull`, `isNumber`, `isObject`, `isPlainObject`,
	     * `isRegExp`, `isString`, `isUndefined`, `isTypedArray`, `join`, `kebabCase`,
	     * `last`, `lastIndexOf`, `lt`, `lte`, `max`, `min`, `noConflict`, `noop`,
	     * `now`, `pad`, `padLeft`, `padRight`, `parseInt`, `pop`, `random`, `reduce`,
	     * `reduceRight`, `repeat`, `result`, `round`, `runInContext`, `shift`, `size`,
	     * `snakeCase`, `some`, `sortedIndex`, `sortedLastIndex`, `startCase`,
	     * `startsWith`, `sum`, `template`, `trim`, `trimLeft`, `trimRight`, `trunc`,
	     * `unescape`, `uniqueId`, `value`, and `words`
	     *
	     * The wrapper method `sample` will return a wrapped value when `n` is provided,
	     * otherwise an unwrapped value is returned.
	     *
	     * @name _
	     * @constructor
	     * @category Chain
	     * @param {*} value The value to wrap in a `lodash` instance.
	     * @returns {Object} Returns the new `lodash` wrapper instance.
	     * @example
	     *
	     * var wrapped = _([1, 2, 3]);
	     *
	     * // returns an unwrapped value
	     * wrapped.reduce(function(total, n) {
	     *   return total + n;
	     * });
	     * // => 6
	     *
	     * // returns a wrapped value
	     * var squares = wrapped.map(function(n) {
	     *   return n * n;
	     * });
	     *
	     * _.isArray(squares);
	     * // => false
	     *
	     * _.isArray(squares.value());
	     * // => true
	     */
	    function lodash(value) {
	      if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
	        if (value instanceof LodashWrapper) {
	          return value;
	        }
	        if (hasOwnProperty.call(value, '__chain__') && hasOwnProperty.call(value, '__wrapped__')) {
	          return wrapperClone(value);
	        }
	      }
	      return new LodashWrapper(value);
	    }

	    /**
	     * The function whose prototype all chaining wrappers inherit from.
	     *
	     * @private
	     */
	    function baseLodash() {
	      // No operation performed.
	    }

	    /**
	     * The base constructor for creating `lodash` wrapper objects.
	     *
	     * @private
	     * @param {*} value The value to wrap.
	     * @param {boolean} [chainAll] Enable chaining for all wrapper methods.
	     * @param {Array} [actions=[]] Actions to peform to resolve the unwrapped value.
	     */
	    function LodashWrapper(value, chainAll, actions) {
	      this.__wrapped__ = value;
	      this.__actions__ = actions || [];
	      this.__chain__ = !!chainAll;
	    }

	    /**
	     * An object environment feature flags.
	     *
	     * @static
	     * @memberOf _
	     * @type Object
	     */
	    var support = lodash.support = {};

	    /**
	     * By default, the template delimiters used by lodash are like those in
	     * embedded Ruby (ERB). Change the following template settings to use
	     * alternative delimiters.
	     *
	     * @static
	     * @memberOf _
	     * @type Object
	     */
	    lodash.templateSettings = {

	      /**
	       * Used to detect `data` property values to be HTML-escaped.
	       *
	       * @memberOf _.templateSettings
	       * @type RegExp
	       */
	      'escape': reEscape,

	      /**
	       * Used to detect code to be evaluated.
	       *
	       * @memberOf _.templateSettings
	       * @type RegExp
	       */
	      'evaluate': reEvaluate,

	      /**
	       * Used to detect `data` property values to inject.
	       *
	       * @memberOf _.templateSettings
	       * @type RegExp
	       */
	      'interpolate': reInterpolate,

	      /**
	       * Used to reference the data object in the template text.
	       *
	       * @memberOf _.templateSettings
	       * @type string
	       */
	      'variable': '',

	      /**
	       * Used to import variables into the compiled template.
	       *
	       * @memberOf _.templateSettings
	       * @type Object
	       */
	      'imports': {

	        /**
	         * A reference to the `lodash` function.
	         *
	         * @memberOf _.templateSettings.imports
	         * @type Function
	         */
	        '_': lodash
	      }
	    };

	    /*------------------------------------------------------------------------*/

	    /**
	     * Creates a lazy wrapper object which wraps `value` to enable lazy evaluation.
	     *
	     * @private
	     * @param {*} value The value to wrap.
	     */
	    function LazyWrapper(value) {
	      this.__wrapped__ = value;
	      this.__actions__ = [];
	      this.__dir__ = 1;
	      this.__filtered__ = false;
	      this.__iteratees__ = [];
	      this.__takeCount__ = POSITIVE_INFINITY;
	      this.__views__ = [];
	    }

	    /**
	     * Creates a clone of the lazy wrapper object.
	     *
	     * @private
	     * @name clone
	     * @memberOf LazyWrapper
	     * @returns {Object} Returns the cloned `LazyWrapper` object.
	     */
	    function lazyClone() {
	      var result = new LazyWrapper(this.__wrapped__);
	      result.__actions__ = arrayCopy(this.__actions__);
	      result.__dir__ = this.__dir__;
	      result.__filtered__ = this.__filtered__;
	      result.__iteratees__ = arrayCopy(this.__iteratees__);
	      result.__takeCount__ = this.__takeCount__;
	      result.__views__ = arrayCopy(this.__views__);
	      return result;
	    }

	    /**
	     * Reverses the direction of lazy iteration.
	     *
	     * @private
	     * @name reverse
	     * @memberOf LazyWrapper
	     * @returns {Object} Returns the new reversed `LazyWrapper` object.
	     */
	    function lazyReverse() {
	      if (this.__filtered__) {
	        var result = new LazyWrapper(this);
	        result.__dir__ = -1;
	        result.__filtered__ = true;
	      } else {
	        result = this.clone();
	        result.__dir__ *= -1;
	      }
	      return result;
	    }

	    /**
	     * Extracts the unwrapped value from its lazy wrapper.
	     *
	     * @private
	     * @name value
	     * @memberOf LazyWrapper
	     * @returns {*} Returns the unwrapped value.
	     */
	    function lazyValue() {
	      var array = this.__wrapped__.value(),
	          dir = this.__dir__,
	          isArr = isArray(array),
	          isRight = dir < 0,
	          arrLength = isArr ? array.length : 0,
	          view = getView(0, arrLength, this.__views__),
	          start = view.start,
	          end = view.end,
	          length = end - start,
	          index = isRight ? end : (start - 1),
	          iteratees = this.__iteratees__,
	          iterLength = iteratees.length,
	          resIndex = 0,
	          takeCount = nativeMin(length, this.__takeCount__);

	      if (!isArr || arrLength < LARGE_ARRAY_SIZE || (arrLength == length && takeCount == length)) {
	        return baseWrapperValue((isRight && isArr) ? array.reverse() : array, this.__actions__);
	      }
	      var result = [];

	      outer:
	      while (length-- && resIndex < takeCount) {
	        index += dir;

	        var iterIndex = -1,
	            value = array[index];

	        while (++iterIndex < iterLength) {
	          var data = iteratees[iterIndex],
	              iteratee = data.iteratee,
	              type = data.type,
	              computed = iteratee(value);

	          if (type == LAZY_MAP_FLAG) {
	            value = computed;
	          } else if (!computed) {
	            if (type == LAZY_FILTER_FLAG) {
	              continue outer;
	            } else {
	              break outer;
	            }
	          }
	        }
	        result[resIndex++] = value;
	      }
	      return result;
	    }

	    /*------------------------------------------------------------------------*/

	    /**
	     * Creates a cache object to store key/value pairs.
	     *
	     * @private
	     * @static
	     * @name Cache
	     * @memberOf _.memoize
	     */
	    function MapCache() {
	      this.__data__ = {};
	    }

	    /**
	     * Removes `key` and its value from the cache.
	     *
	     * @private
	     * @name delete
	     * @memberOf _.memoize.Cache
	     * @param {string} key The key of the value to remove.
	     * @returns {boolean} Returns `true` if the entry was removed successfully, else `false`.
	     */
	    function mapDelete(key) {
	      return this.has(key) && delete this.__data__[key];
	    }

	    /**
	     * Gets the cached value for `key`.
	     *
	     * @private
	     * @name get
	     * @memberOf _.memoize.Cache
	     * @param {string} key The key of the value to get.
	     * @returns {*} Returns the cached value.
	     */
	    function mapGet(key) {
	      return key == '__proto__' ? undefined : this.__data__[key];
	    }

	    /**
	     * Checks if a cached value for `key` exists.
	     *
	     * @private
	     * @name has
	     * @memberOf _.memoize.Cache
	     * @param {string} key The key of the entry to check.
	     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	     */
	    function mapHas(key) {
	      return key != '__proto__' && hasOwnProperty.call(this.__data__, key);
	    }

	    /**
	     * Sets `value` to `key` of the cache.
	     *
	     * @private
	     * @name set
	     * @memberOf _.memoize.Cache
	     * @param {string} key The key of the value to cache.
	     * @param {*} value The value to cache.
	     * @returns {Object} Returns the cache object.
	     */
	    function mapSet(key, value) {
	      if (key != '__proto__') {
	        this.__data__[key] = value;
	      }
	      return this;
	    }

	    /*------------------------------------------------------------------------*/

	    /**
	     *
	     * Creates a cache object to store unique values.
	     *
	     * @private
	     * @param {Array} [values] The values to cache.
	     */
	    function SetCache(values) {
	      var length = values ? values.length : 0;

	      this.data = { 'hash': nativeCreate(null), 'set': new Set };
	      while (length--) {
	        this.push(values[length]);
	      }
	    }

	    /**
	     * Checks if `value` is in `cache` mimicking the return signature of
	     * `_.indexOf` by returning `0` if the value is found, else `-1`.
	     *
	     * @private
	     * @param {Object} cache The cache to search.
	     * @param {*} value The value to search for.
	     * @returns {number} Returns `0` if `value` is found, else `-1`.
	     */
	    function cacheIndexOf(cache, value) {
	      var data = cache.data,
	          result = (typeof value == 'string' || isObject(value)) ? data.set.has(value) : data.hash[value];

	      return result ? 0 : -1;
	    }

	    /**
	     * Adds `value` to the cache.
	     *
	     * @private
	     * @name push
	     * @memberOf SetCache
	     * @param {*} value The value to cache.
	     */
	    function cachePush(value) {
	      var data = this.data;
	      if (typeof value == 'string' || isObject(value)) {
	        data.set.add(value);
	      } else {
	        data.hash[value] = true;
	      }
	    }

	    /*------------------------------------------------------------------------*/

	    /**
	     * Creates a new array joining `array` with `other`.
	     *
	     * @private
	     * @param {Array} array The array to join.
	     * @param {Array} other The other array to join.
	     * @returns {Array} Returns the new concatenated array.
	     */
	    function arrayConcat(array, other) {
	      var index = -1,
	          length = array.length,
	          othIndex = -1,
	          othLength = other.length,
	          result = Array(length + othLength);

	      while (++index < length) {
	        result[index] = array[index];
	      }
	      while (++othIndex < othLength) {
	        result[index++] = other[othIndex];
	      }
	      return result;
	    }

	    /**
	     * Copies the values of `source` to `array`.
	     *
	     * @private
	     * @param {Array} source The array to copy values from.
	     * @param {Array} [array=[]] The array to copy values to.
	     * @returns {Array} Returns `array`.
	     */
	    function arrayCopy(source, array) {
	      var index = -1,
	          length = source.length;

	      array || (array = Array(length));
	      while (++index < length) {
	        array[index] = source[index];
	      }
	      return array;
	    }

	    /**
	     * A specialized version of `_.forEach` for arrays without support for callback
	     * shorthands and `this` binding.
	     *
	     * @private
	     * @param {Array} array The array to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @returns {Array} Returns `array`.
	     */
	    function arrayEach(array, iteratee) {
	      var index = -1,
	          length = array.length;

	      while (++index < length) {
	        if (iteratee(array[index], index, array) === false) {
	          break;
	        }
	      }
	      return array;
	    }

	    /**
	     * A specialized version of `_.forEachRight` for arrays without support for
	     * callback shorthands and `this` binding.
	     *
	     * @private
	     * @param {Array} array The array to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @returns {Array} Returns `array`.
	     */
	    function arrayEachRight(array, iteratee) {
	      var length = array.length;

	      while (length--) {
	        if (iteratee(array[length], length, array) === false) {
	          break;
	        }
	      }
	      return array;
	    }

	    /**
	     * A specialized version of `_.every` for arrays without support for callback
	     * shorthands and `this` binding.
	     *
	     * @private
	     * @param {Array} array The array to iterate over.
	     * @param {Function} predicate The function invoked per iteration.
	     * @returns {boolean} Returns `true` if all elements pass the predicate check,
	     *  else `false`.
	     */
	    function arrayEvery(array, predicate) {
	      var index = -1,
	          length = array.length;

	      while (++index < length) {
	        if (!predicate(array[index], index, array)) {
	          return false;
	        }
	      }
	      return true;
	    }

	    /**
	     * A specialized version of `baseExtremum` for arrays which invokes `iteratee`
	     * with one argument: (value).
	     *
	     * @private
	     * @param {Array} array The array to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @param {Function} comparator The function used to compare values.
	     * @param {*} exValue The initial extremum value.
	     * @returns {*} Returns the extremum value.
	     */
	    function arrayExtremum(array, iteratee, comparator, exValue) {
	      var index = -1,
	          length = array.length,
	          computed = exValue,
	          result = computed;

	      while (++index < length) {
	        var value = array[index],
	            current = +iteratee(value);

	        if (comparator(current, computed)) {
	          computed = current;
	          result = value;
	        }
	      }
	      return result;
	    }

	    /**
	     * A specialized version of `_.filter` for arrays without support for callback
	     * shorthands and `this` binding.
	     *
	     * @private
	     * @param {Array} array The array to iterate over.
	     * @param {Function} predicate The function invoked per iteration.
	     * @returns {Array} Returns the new filtered array.
	     */
	    function arrayFilter(array, predicate) {
	      var index = -1,
	          length = array.length,
	          resIndex = -1,
	          result = [];

	      while (++index < length) {
	        var value = array[index];
	        if (predicate(value, index, array)) {
	          result[++resIndex] = value;
	        }
	      }
	      return result;
	    }

	    /**
	     * A specialized version of `_.map` for arrays without support for callback
	     * shorthands and `this` binding.
	     *
	     * @private
	     * @param {Array} array The array to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @returns {Array} Returns the new mapped array.
	     */
	    function arrayMap(array, iteratee) {
	      var index = -1,
	          length = array.length,
	          result = Array(length);

	      while (++index < length) {
	        result[index] = iteratee(array[index], index, array);
	      }
	      return result;
	    }

	    /**
	     * Appends the elements of `values` to `array`.
	     *
	     * @private
	     * @param {Array} array The array to modify.
	     * @param {Array} values The values to append.
	     * @returns {Array} Returns `array`.
	     */
	    function arrayPush(array, values) {
	      var index = -1,
	          length = values.length,
	          offset = array.length;

	      while (++index < length) {
	        array[offset + index] = values[index];
	      }
	      return array;
	    }

	    /**
	     * A specialized version of `_.reduce` for arrays without support for callback
	     * shorthands and `this` binding.
	     *
	     * @private
	     * @param {Array} array The array to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @param {*} [accumulator] The initial value.
	     * @param {boolean} [initFromArray] Specify using the first element of `array`
	     *  as the initial value.
	     * @returns {*} Returns the accumulated value.
	     */
	    function arrayReduce(array, iteratee, accumulator, initFromArray) {
	      var index = -1,
	          length = array.length;

	      if (initFromArray && length) {
	        accumulator = array[++index];
	      }
	      while (++index < length) {
	        accumulator = iteratee(accumulator, array[index], index, array);
	      }
	      return accumulator;
	    }

	    /**
	     * A specialized version of `_.reduceRight` for arrays without support for
	     * callback shorthands and `this` binding.
	     *
	     * @private
	     * @param {Array} array The array to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @param {*} [accumulator] The initial value.
	     * @param {boolean} [initFromArray] Specify using the last element of `array`
	     *  as the initial value.
	     * @returns {*} Returns the accumulated value.
	     */
	    function arrayReduceRight(array, iteratee, accumulator, initFromArray) {
	      var length = array.length;
	      if (initFromArray && length) {
	        accumulator = array[--length];
	      }
	      while (length--) {
	        accumulator = iteratee(accumulator, array[length], length, array);
	      }
	      return accumulator;
	    }

	    /**
	     * A specialized version of `_.some` for arrays without support for callback
	     * shorthands and `this` binding.
	     *
	     * @private
	     * @param {Array} array The array to iterate over.
	     * @param {Function} predicate The function invoked per iteration.
	     * @returns {boolean} Returns `true` if any element passes the predicate check,
	     *  else `false`.
	     */
	    function arraySome(array, predicate) {
	      var index = -1,
	          length = array.length;

	      while (++index < length) {
	        if (predicate(array[index], index, array)) {
	          return true;
	        }
	      }
	      return false;
	    }

	    /**
	     * A specialized version of `_.sum` for arrays without support for callback
	     * shorthands and `this` binding..
	     *
	     * @private
	     * @param {Array} array The array to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @returns {number} Returns the sum.
	     */
	    function arraySum(array, iteratee) {
	      var length = array.length,
	          result = 0;

	      while (length--) {
	        result += +iteratee(array[length]) || 0;
	      }
	      return result;
	    }

	    /**
	     * Used by `_.defaults` to customize its `_.assign` use.
	     *
	     * @private
	     * @param {*} objectValue The destination object property value.
	     * @param {*} sourceValue The source object property value.
	     * @returns {*} Returns the value to assign to the destination object.
	     */
	    function assignDefaults(objectValue, sourceValue) {
	      return objectValue === undefined ? sourceValue : objectValue;
	    }

	    /**
	     * Used by `_.template` to customize its `_.assign` use.
	     *
	     * **Note:** This function is like `assignDefaults` except that it ignores
	     * inherited property values when checking if a property is `undefined`.
	     *
	     * @private
	     * @param {*} objectValue The destination object property value.
	     * @param {*} sourceValue The source object property value.
	     * @param {string} key The key associated with the object and source values.
	     * @param {Object} object The destination object.
	     * @returns {*} Returns the value to assign to the destination object.
	     */
	    function assignOwnDefaults(objectValue, sourceValue, key, object) {
	      return (objectValue === undefined || !hasOwnProperty.call(object, key))
	        ? sourceValue
	        : objectValue;
	    }

	    /**
	     * A specialized version of `_.assign` for customizing assigned values without
	     * support for argument juggling, multiple sources, and `this` binding `customizer`
	     * functions.
	     *
	     * @private
	     * @param {Object} object The destination object.
	     * @param {Object} source The source object.
	     * @param {Function} customizer The function to customize assigned values.
	     * @returns {Object} Returns `object`.
	     */
	    function assignWith(object, source, customizer) {
	      var index = -1,
	          props = keys(source),
	          length = props.length;

	      while (++index < length) {
	        var key = props[index],
	            value = object[key],
	            result = customizer(value, source[key], key, object, source);

	        if ((result === result ? (result !== value) : (value === value)) ||
	            (value === undefined && !(key in object))) {
	          object[key] = result;
	        }
	      }
	      return object;
	    }

	    /**
	     * The base implementation of `_.assign` without support for argument juggling,
	     * multiple sources, and `customizer` functions.
	     *
	     * @private
	     * @param {Object} object The destination object.
	     * @param {Object} source The source object.
	     * @returns {Object} Returns `object`.
	     */
	    function baseAssign(object, source) {
	      return source == null
	        ? object
	        : baseCopy(source, keys(source), object);
	    }

	    /**
	     * The base implementation of `_.at` without support for string collections
	     * and individual key arguments.
	     *
	     * @private
	     * @param {Array|Object} collection The collection to iterate over.
	     * @param {number[]|string[]} props The property names or indexes of elements to pick.
	     * @returns {Array} Returns the new array of picked elements.
	     */
	    function baseAt(collection, props) {
	      var index = -1,
	          isNil = collection == null,
	          isArr = !isNil && isArrayLike(collection),
	          length = isArr ? collection.length : 0,
	          propsLength = props.length,
	          result = Array(propsLength);

	      while(++index < propsLength) {
	        var key = props[index];
	        if (isArr) {
	          result[index] = isIndex(key, length) ? collection[key] : undefined;
	        } else {
	          result[index] = isNil ? undefined : collection[key];
	        }
	      }
	      return result;
	    }

	    /**
	     * Copies properties of `source` to `object`.
	     *
	     * @private
	     * @param {Object} source The object to copy properties from.
	     * @param {Array} props The property names to copy.
	     * @param {Object} [object={}] The object to copy properties to.
	     * @returns {Object} Returns `object`.
	     */
	    function baseCopy(source, props, object) {
	      object || (object = {});

	      var index = -1,
	          length = props.length;

	      while (++index < length) {
	        var key = props[index];
	        object[key] = source[key];
	      }
	      return object;
	    }

	    /**
	     * The base implementation of `_.callback` which supports specifying the
	     * number of arguments to provide to `func`.
	     *
	     * @private
	     * @param {*} [func=_.identity] The value to convert to a callback.
	     * @param {*} [thisArg] The `this` binding of `func`.
	     * @param {number} [argCount] The number of arguments to provide to `func`.
	     * @returns {Function} Returns the callback.
	     */
	    function baseCallback(func, thisArg, argCount) {
	      var type = typeof func;
	      if (type == 'function') {
	        return thisArg === undefined
	          ? func
	          : bindCallback(func, thisArg, argCount);
	      }
	      if (func == null) {
	        return identity;
	      }
	      if (type == 'object') {
	        return baseMatches(func);
	      }
	      return thisArg === undefined
	        ? property(func)
	        : baseMatchesProperty(func, thisArg);
	    }

	    /**
	     * The base implementation of `_.clone` without support for argument juggling
	     * and `this` binding `customizer` functions.
	     *
	     * @private
	     * @param {*} value The value to clone.
	     * @param {boolean} [isDeep] Specify a deep clone.
	     * @param {Function} [customizer] The function to customize cloning values.
	     * @param {string} [key] The key of `value`.
	     * @param {Object} [object] The object `value` belongs to.
	     * @param {Array} [stackA=[]] Tracks traversed source objects.
	     * @param {Array} [stackB=[]] Associates clones with source counterparts.
	     * @returns {*} Returns the cloned value.
	     */
	    function baseClone(value, isDeep, customizer, key, object, stackA, stackB) {
	      var result;
	      if (customizer) {
	        result = object ? customizer(value, key, object) : customizer(value);
	      }
	      if (result !== undefined) {
	        return result;
	      }
	      if (!isObject(value)) {
	        return value;
	      }
	      var isArr = isArray(value);
	      if (isArr) {
	        result = initCloneArray(value);
	        if (!isDeep) {
	          return arrayCopy(value, result);
	        }
	      } else {
	        var tag = objToString.call(value),
	            isFunc = tag == funcTag;

	        if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
	          result = initCloneObject(isFunc ? {} : value);
	          if (!isDeep) {
	            return baseAssign(result, value);
	          }
	        } else {
	          return cloneableTags[tag]
	            ? initCloneByTag(value, tag, isDeep)
	            : (object ? value : {});
	        }
	      }
	      // Check for circular references and return its corresponding clone.
	      stackA || (stackA = []);
	      stackB || (stackB = []);

	      var length = stackA.length;
	      while (length--) {
	        if (stackA[length] == value) {
	          return stackB[length];
	        }
	      }
	      // Add the source value to the stack of traversed objects and associate it with its clone.
	      stackA.push(value);
	      stackB.push(result);

	      // Recursively populate clone (susceptible to call stack limits).
	      (isArr ? arrayEach : baseForOwn)(value, function(subValue, key) {
	        result[key] = baseClone(subValue, isDeep, customizer, key, value, stackA, stackB);
	      });
	      return result;
	    }

	    /**
	     * The base implementation of `_.create` without support for assigning
	     * properties to the created object.
	     *
	     * @private
	     * @param {Object} prototype The object to inherit from.
	     * @returns {Object} Returns the new object.
	     */
	    var baseCreate = (function() {
	      function object() {}
	      return function(prototype) {
	        if (isObject(prototype)) {
	          object.prototype = prototype;
	          var result = new object;
	          object.prototype = undefined;
	        }
	        return result || {};
	      };
	    }());

	    /**
	     * The base implementation of `_.delay` and `_.defer` which accepts an index
	     * of where to slice the arguments to provide to `func`.
	     *
	     * @private
	     * @param {Function} func The function to delay.
	     * @param {number} wait The number of milliseconds to delay invocation.
	     * @param {Object} args The arguments provide to `func`.
	     * @returns {number} Returns the timer id.
	     */
	    function baseDelay(func, wait, args) {
	      if (typeof func != 'function') {
	        throw new TypeError(FUNC_ERROR_TEXT);
	      }
	      return setTimeout(function() { func.apply(undefined, args); }, wait);
	    }

	    /**
	     * The base implementation of `_.difference` which accepts a single array
	     * of values to exclude.
	     *
	     * @private
	     * @param {Array} array The array to inspect.
	     * @param {Array} values The values to exclude.
	     * @returns {Array} Returns the new array of filtered values.
	     */
	    function baseDifference(array, values) {
	      var length = array ? array.length : 0,
	          result = [];

	      if (!length) {
	        return result;
	      }
	      var index = -1,
	          indexOf = getIndexOf(),
	          isCommon = indexOf == baseIndexOf,
	          cache = (isCommon && values.length >= LARGE_ARRAY_SIZE) ? createCache(values) : null,
	          valuesLength = values.length;

	      if (cache) {
	        indexOf = cacheIndexOf;
	        isCommon = false;
	        values = cache;
	      }
	      outer:
	      while (++index < length) {
	        var value = array[index];

	        if (isCommon && value === value) {
	          var valuesIndex = valuesLength;
	          while (valuesIndex--) {
	            if (values[valuesIndex] === value) {
	              continue outer;
	            }
	          }
	          result.push(value);
	        }
	        else if (indexOf(values, value, 0) < 0) {
	          result.push(value);
	        }
	      }
	      return result;
	    }

	    /**
	     * The base implementation of `_.forEach` without support for callback
	     * shorthands and `this` binding.
	     *
	     * @private
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @returns {Array|Object|string} Returns `collection`.
	     */
	    var baseEach = createBaseEach(baseForOwn);

	    /**
	     * The base implementation of `_.forEachRight` without support for callback
	     * shorthands and `this` binding.
	     *
	     * @private
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @returns {Array|Object|string} Returns `collection`.
	     */
	    var baseEachRight = createBaseEach(baseForOwnRight, true);

	    /**
	     * The base implementation of `_.every` without support for callback
	     * shorthands and `this` binding.
	     *
	     * @private
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} predicate The function invoked per iteration.
	     * @returns {boolean} Returns `true` if all elements pass the predicate check,
	     *  else `false`
	     */
	    function baseEvery(collection, predicate) {
	      var result = true;
	      baseEach(collection, function(value, index, collection) {
	        result = !!predicate(value, index, collection);
	        return result;
	      });
	      return result;
	    }

	    /**
	     * Gets the extremum value of `collection` invoking `iteratee` for each value
	     * in `collection` to generate the criterion by which the value is ranked.
	     * The `iteratee` is invoked with three arguments: (value, index|key, collection).
	     *
	     * @private
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @param {Function} comparator The function used to compare values.
	     * @param {*} exValue The initial extremum value.
	     * @returns {*} Returns the extremum value.
	     */
	    function baseExtremum(collection, iteratee, comparator, exValue) {
	      var computed = exValue,
	          result = computed;

	      baseEach(collection, function(value, index, collection) {
	        var current = +iteratee(value, index, collection);
	        if (comparator(current, computed) || (current === exValue && current === result)) {
	          computed = current;
	          result = value;
	        }
	      });
	      return result;
	    }

	    /**
	     * The base implementation of `_.fill` without an iteratee call guard.
	     *
	     * @private
	     * @param {Array} array The array to fill.
	     * @param {*} value The value to fill `array` with.
	     * @param {number} [start=0] The start position.
	     * @param {number} [end=array.length] The end position.
	     * @returns {Array} Returns `array`.
	     */
	    function baseFill(array, value, start, end) {
	      var length = array.length;

	      start = start == null ? 0 : (+start || 0);
	      if (start < 0) {
	        start = -start > length ? 0 : (length + start);
	      }
	      end = (end === undefined || end > length) ? length : (+end || 0);
	      if (end < 0) {
	        end += length;
	      }
	      length = start > end ? 0 : (end >>> 0);
	      start >>>= 0;

	      while (start < length) {
	        array[start++] = value;
	      }
	      return array;
	    }

	    /**
	     * The base implementation of `_.filter` without support for callback
	     * shorthands and `this` binding.
	     *
	     * @private
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} predicate The function invoked per iteration.
	     * @returns {Array} Returns the new filtered array.
	     */
	    function baseFilter(collection, predicate) {
	      var result = [];
	      baseEach(collection, function(value, index, collection) {
	        if (predicate(value, index, collection)) {
	          result.push(value);
	        }
	      });
	      return result;
	    }

	    /**
	     * The base implementation of `_.find`, `_.findLast`, `_.findKey`, and `_.findLastKey`,
	     * without support for callback shorthands and `this` binding, which iterates
	     * over `collection` using the provided `eachFunc`.
	     *
	     * @private
	     * @param {Array|Object|string} collection The collection to search.
	     * @param {Function} predicate The function invoked per iteration.
	     * @param {Function} eachFunc The function to iterate over `collection`.
	     * @param {boolean} [retKey] Specify returning the key of the found element
	     *  instead of the element itself.
	     * @returns {*} Returns the found element or its key, else `undefined`.
	     */
	    function baseFind(collection, predicate, eachFunc, retKey) {
	      var result;
	      eachFunc(collection, function(value, key, collection) {
	        if (predicate(value, key, collection)) {
	          result = retKey ? key : value;
	          return false;
	        }
	      });
	      return result;
	    }

	    /**
	     * The base implementation of `_.flatten` with added support for restricting
	     * flattening and specifying the start index.
	     *
	     * @private
	     * @param {Array} array The array to flatten.
	     * @param {boolean} [isDeep] Specify a deep flatten.
	     * @param {boolean} [isStrict] Restrict flattening to arrays-like objects.
	     * @param {Array} [result=[]] The initial result value.
	     * @returns {Array} Returns the new flattened array.
	     */
	    function baseFlatten(array, isDeep, isStrict, result) {
	      result || (result = []);

	      var index = -1,
	          length = array.length;

	      while (++index < length) {
	        var value = array[index];
	        if (isObjectLike(value) && isArrayLike(value) &&
	            (isStrict || isArray(value) || isArguments(value))) {
	          if (isDeep) {
	            // Recursively flatten arrays (susceptible to call stack limits).
	            baseFlatten(value, isDeep, isStrict, result);
	          } else {
	            arrayPush(result, value);
	          }
	        } else if (!isStrict) {
	          result[result.length] = value;
	        }
	      }
	      return result;
	    }

	    /**
	     * The base implementation of `baseForIn` and `baseForOwn` which iterates
	     * over `object` properties returned by `keysFunc` invoking `iteratee` for
	     * each property. Iteratee functions may exit iteration early by explicitly
	     * returning `false`.
	     *
	     * @private
	     * @param {Object} object The object to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @param {Function} keysFunc The function to get the keys of `object`.
	     * @returns {Object} Returns `object`.
	     */
	    var baseFor = createBaseFor();

	    /**
	     * This function is like `baseFor` except that it iterates over properties
	     * in the opposite order.
	     *
	     * @private
	     * @param {Object} object The object to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @param {Function} keysFunc The function to get the keys of `object`.
	     * @returns {Object} Returns `object`.
	     */
	    var baseForRight = createBaseFor(true);

	    /**
	     * The base implementation of `_.forIn` without support for callback
	     * shorthands and `this` binding.
	     *
	     * @private
	     * @param {Object} object The object to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @returns {Object} Returns `object`.
	     */
	    function baseForIn(object, iteratee) {
	      return baseFor(object, iteratee, keysIn);
	    }

	    /**
	     * The base implementation of `_.forOwn` without support for callback
	     * shorthands and `this` binding.
	     *
	     * @private
	     * @param {Object} object The object to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @returns {Object} Returns `object`.
	     */
	    function baseForOwn(object, iteratee) {
	      return baseFor(object, iteratee, keys);
	    }

	    /**
	     * The base implementation of `_.forOwnRight` without support for callback
	     * shorthands and `this` binding.
	     *
	     * @private
	     * @param {Object} object The object to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @returns {Object} Returns `object`.
	     */
	    function baseForOwnRight(object, iteratee) {
	      return baseForRight(object, iteratee, keys);
	    }

	    /**
	     * The base implementation of `_.functions` which creates an array of
	     * `object` function property names filtered from those provided.
	     *
	     * @private
	     * @param {Object} object The object to inspect.
	     * @param {Array} props The property names to filter.
	     * @returns {Array} Returns the new array of filtered property names.
	     */
	    function baseFunctions(object, props) {
	      var index = -1,
	          length = props.length,
	          resIndex = -1,
	          result = [];

	      while (++index < length) {
	        var key = props[index];
	        if (isFunction(object[key])) {
	          result[++resIndex] = key;
	        }
	      }
	      return result;
	    }

	    /**
	     * The base implementation of `get` without support for string paths
	     * and default values.
	     *
	     * @private
	     * @param {Object} object The object to query.
	     * @param {Array} path The path of the property to get.
	     * @param {string} [pathKey] The key representation of path.
	     * @returns {*} Returns the resolved value.
	     */
	    function baseGet(object, path, pathKey) {
	      if (object == null) {
	        return;
	      }
	      if (pathKey !== undefined && pathKey in toObject(object)) {
	        path = [pathKey];
	      }
	      var index = 0,
	          length = path.length;

	      while (object != null && index < length) {
	        object = object[path[index++]];
	      }
	      return (index && index == length) ? object : undefined;
	    }

	    /**
	     * The base implementation of `_.isEqual` without support for `this` binding
	     * `customizer` functions.
	     *
	     * @private
	     * @param {*} value The value to compare.
	     * @param {*} other The other value to compare.
	     * @param {Function} [customizer] The function to customize comparing values.
	     * @param {boolean} [isLoose] Specify performing partial comparisons.
	     * @param {Array} [stackA] Tracks traversed `value` objects.
	     * @param {Array} [stackB] Tracks traversed `other` objects.
	     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	     */
	    function baseIsEqual(value, other, customizer, isLoose, stackA, stackB) {
	      if (value === other) {
	        return true;
	      }
	      if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
	        return value !== value && other !== other;
	      }
	      return baseIsEqualDeep(value, other, baseIsEqual, customizer, isLoose, stackA, stackB);
	    }

	    /**
	     * A specialized version of `baseIsEqual` for arrays and objects which performs
	     * deep comparisons and tracks traversed objects enabling objects with circular
	     * references to be compared.
	     *
	     * @private
	     * @param {Object} object The object to compare.
	     * @param {Object} other The other object to compare.
	     * @param {Function} equalFunc The function to determine equivalents of values.
	     * @param {Function} [customizer] The function to customize comparing objects.
	     * @param {boolean} [isLoose] Specify performing partial comparisons.
	     * @param {Array} [stackA=[]] Tracks traversed `value` objects.
	     * @param {Array} [stackB=[]] Tracks traversed `other` objects.
	     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	     */
	    function baseIsEqualDeep(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
	      var objIsArr = isArray(object),
	          othIsArr = isArray(other),
	          objTag = arrayTag,
	          othTag = arrayTag;

	      if (!objIsArr) {
	        objTag = objToString.call(object);
	        if (objTag == argsTag) {
	          objTag = objectTag;
	        } else if (objTag != objectTag) {
	          objIsArr = isTypedArray(object);
	        }
	      }
	      if (!othIsArr) {
	        othTag = objToString.call(other);
	        if (othTag == argsTag) {
	          othTag = objectTag;
	        } else if (othTag != objectTag) {
	          othIsArr = isTypedArray(other);
	        }
	      }
	      var objIsObj = objTag == objectTag,
	          othIsObj = othTag == objectTag,
	          isSameTag = objTag == othTag;

	      if (isSameTag && !(objIsArr || objIsObj)) {
	        return equalByTag(object, other, objTag);
	      }
	      if (!isLoose) {
	        var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
	            othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

	        if (objIsWrapped || othIsWrapped) {
	          return equalFunc(objIsWrapped ? object.value() : object, othIsWrapped ? other.value() : other, customizer, isLoose, stackA, stackB);
	        }
	      }
	      if (!isSameTag) {
	        return false;
	      }
	      // Assume cyclic values are equal.
	      // For more information on detecting circular references see https://es5.github.io/#JO.
	      stackA || (stackA = []);
	      stackB || (stackB = []);

	      var length = stackA.length;
	      while (length--) {
	        if (stackA[length] == object) {
	          return stackB[length] == other;
	        }
	      }
	      // Add `object` and `other` to the stack of traversed objects.
	      stackA.push(object);
	      stackB.push(other);

	      var result = (objIsArr ? equalArrays : equalObjects)(object, other, equalFunc, customizer, isLoose, stackA, stackB);

	      stackA.pop();
	      stackB.pop();

	      return result;
	    }

	    /**
	     * The base implementation of `_.isMatch` without support for callback
	     * shorthands and `this` binding.
	     *
	     * @private
	     * @param {Object} object The object to inspect.
	     * @param {Array} matchData The propery names, values, and compare flags to match.
	     * @param {Function} [customizer] The function to customize comparing objects.
	     * @returns {boolean} Returns `true` if `object` is a match, else `false`.
	     */
	    function baseIsMatch(object, matchData, customizer) {
	      var index = matchData.length,
	          length = index,
	          noCustomizer = !customizer;

	      if (object == null) {
	        return !length;
	      }
	      object = toObject(object);
	      while (index--) {
	        var data = matchData[index];
	        if ((noCustomizer && data[2])
	              ? data[1] !== object[data[0]]
	              : !(data[0] in object)
	            ) {
	          return false;
	        }
	      }
	      while (++index < length) {
	        data = matchData[index];
	        var key = data[0],
	            objValue = object[key],
	            srcValue = data[1];

	        if (noCustomizer && data[2]) {
	          if (objValue === undefined && !(key in object)) {
	            return false;
	          }
	        } else {
	          var result = customizer ? customizer(objValue, srcValue, key) : undefined;
	          if (!(result === undefined ? baseIsEqual(srcValue, objValue, customizer, true) : result)) {
	            return false;
	          }
	        }
	      }
	      return true;
	    }

	    /**
	     * The base implementation of `_.map` without support for callback shorthands
	     * and `this` binding.
	     *
	     * @private
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @returns {Array} Returns the new mapped array.
	     */
	    function baseMap(collection, iteratee) {
	      var index = -1,
	          result = isArrayLike(collection) ? Array(collection.length) : [];

	      baseEach(collection, function(value, key, collection) {
	        result[++index] = iteratee(value, key, collection);
	      });
	      return result;
	    }

	    /**
	     * The base implementation of `_.matches` which does not clone `source`.
	     *
	     * @private
	     * @param {Object} source The object of property values to match.
	     * @returns {Function} Returns the new function.
	     */
	    function baseMatches(source) {
	      var matchData = getMatchData(source);
	      if (matchData.length == 1 && matchData[0][2]) {
	        var key = matchData[0][0],
	            value = matchData[0][1];

	        return function(object) {
	          if (object == null) {
	            return false;
	          }
	          return object[key] === value && (value !== undefined || (key in toObject(object)));
	        };
	      }
	      return function(object) {
	        return baseIsMatch(object, matchData);
	      };
	    }

	    /**
	     * The base implementation of `_.matchesProperty` which does not clone `srcValue`.
	     *
	     * @private
	     * @param {string} path The path of the property to get.
	     * @param {*} srcValue The value to compare.
	     * @returns {Function} Returns the new function.
	     */
	    function baseMatchesProperty(path, srcValue) {
	      var isArr = isArray(path),
	          isCommon = isKey(path) && isStrictComparable(srcValue),
	          pathKey = (path + '');

	      path = toPath(path);
	      return function(object) {
	        if (object == null) {
	          return false;
	        }
	        var key = pathKey;
	        object = toObject(object);
	        if ((isArr || !isCommon) && !(key in object)) {
	          object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
	          if (object == null) {
	            return false;
	          }
	          key = last(path);
	          object = toObject(object);
	        }
	        return object[key] === srcValue
	          ? (srcValue !== undefined || (key in object))
	          : baseIsEqual(srcValue, object[key], undefined, true);
	      };
	    }

	    /**
	     * The base implementation of `_.merge` without support for argument juggling,
	     * multiple sources, and `this` binding `customizer` functions.
	     *
	     * @private
	     * @param {Object} object The destination object.
	     * @param {Object} source The source object.
	     * @param {Function} [customizer] The function to customize merged values.
	     * @param {Array} [stackA=[]] Tracks traversed source objects.
	     * @param {Array} [stackB=[]] Associates values with source counterparts.
	     * @returns {Object} Returns `object`.
	     */
	    function baseMerge(object, source, customizer, stackA, stackB) {
	      if (!isObject(object)) {
	        return object;
	      }
	      var isSrcArr = isArrayLike(source) && (isArray(source) || isTypedArray(source)),
	          props = isSrcArr ? undefined : keys(source);

	      arrayEach(props || source, function(srcValue, key) {
	        if (props) {
	          key = srcValue;
	          srcValue = source[key];
	        }
	        if (isObjectLike(srcValue)) {
	          stackA || (stackA = []);
	          stackB || (stackB = []);
	          baseMergeDeep(object, source, key, baseMerge, customizer, stackA, stackB);
	        }
	        else {
	          var value = object[key],
	              result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
	              isCommon = result === undefined;

	          if (isCommon) {
	            result = srcValue;
	          }
	          if ((result !== undefined || (isSrcArr && !(key in object))) &&
	              (isCommon || (result === result ? (result !== value) : (value === value)))) {
	            object[key] = result;
	          }
	        }
	      });
	      return object;
	    }

	    /**
	     * A specialized version of `baseMerge` for arrays and objects which performs
	     * deep merges and tracks traversed objects enabling objects with circular
	     * references to be merged.
	     *
	     * @private
	     * @param {Object} object The destination object.
	     * @param {Object} source The source object.
	     * @param {string} key The key of the value to merge.
	     * @param {Function} mergeFunc The function to merge values.
	     * @param {Function} [customizer] The function to customize merged values.
	     * @param {Array} [stackA=[]] Tracks traversed source objects.
	     * @param {Array} [stackB=[]] Associates values with source counterparts.
	     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	     */
	    function baseMergeDeep(object, source, key, mergeFunc, customizer, stackA, stackB) {
	      var length = stackA.length,
	          srcValue = source[key];

	      while (length--) {
	        if (stackA[length] == srcValue) {
	          object[key] = stackB[length];
	          return;
	        }
	      }
	      var value = object[key],
	          result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
	          isCommon = result === undefined;

	      if (isCommon) {
	        result = srcValue;
	        if (isArrayLike(srcValue) && (isArray(srcValue) || isTypedArray(srcValue))) {
	          result = isArray(value)
	            ? value
	            : (isArrayLike(value) ? arrayCopy(value) : []);
	        }
	        else if (isPlainObject(srcValue) || isArguments(srcValue)) {
	          result = isArguments(value)
	            ? toPlainObject(value)
	            : (isPlainObject(value) ? value : {});
	        }
	        else {
	          isCommon = false;
	        }
	      }
	      // Add the source value to the stack of traversed objects and associate
	      // it with its merged value.
	      stackA.push(srcValue);
	      stackB.push(result);

	      if (isCommon) {
	        // Recursively merge objects and arrays (susceptible to call stack limits).
	        object[key] = mergeFunc(result, srcValue, customizer, stackA, stackB);
	      } else if (result === result ? (result !== value) : (value === value)) {
	        object[key] = result;
	      }
	    }

	    /**
	     * The base implementation of `_.property` without support for deep paths.
	     *
	     * @private
	     * @param {string} key The key of the property to get.
	     * @returns {Function} Returns the new function.
	     */
	    function baseProperty(key) {
	      return function(object) {
	        return object == null ? undefined : object[key];
	      };
	    }

	    /**
	     * A specialized version of `baseProperty` which supports deep paths.
	     *
	     * @private
	     * @param {Array|string} path The path of the property to get.
	     * @returns {Function} Returns the new function.
	     */
	    function basePropertyDeep(path) {
	      var pathKey = (path + '');
	      path = toPath(path);
	      return function(object) {
	        return baseGet(object, path, pathKey);
	      };
	    }

	    /**
	     * The base implementation of `_.pullAt` without support for individual
	     * index arguments and capturing the removed elements.
	     *
	     * @private
	     * @param {Array} array The array to modify.
	     * @param {number[]} indexes The indexes of elements to remove.
	     * @returns {Array} Returns `array`.
	     */
	    function basePullAt(array, indexes) {
	      var length = array ? indexes.length : 0;
	      while (length--) {
	        var index = indexes[length];
	        if (index != previous && isIndex(index)) {
	          var previous = index;
	          splice.call(array, index, 1);
	        }
	      }
	      return array;
	    }

	    /**
	     * The base implementation of `_.random` without support for argument juggling
	     * and returning floating-point numbers.
	     *
	     * @private
	     * @param {number} min The minimum possible value.
	     * @param {number} max The maximum possible value.
	     * @returns {number} Returns the random number.
	     */
	    function baseRandom(min, max) {
	      return min + nativeFloor(nativeRandom() * (max - min + 1));
	    }

	    /**
	     * The base implementation of `_.reduce` and `_.reduceRight` without support
	     * for callback shorthands and `this` binding, which iterates over `collection`
	     * using the provided `eachFunc`.
	     *
	     * @private
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @param {*} accumulator The initial value.
	     * @param {boolean} initFromCollection Specify using the first or last element
	     *  of `collection` as the initial value.
	     * @param {Function} eachFunc The function to iterate over `collection`.
	     * @returns {*} Returns the accumulated value.
	     */
	    function baseReduce(collection, iteratee, accumulator, initFromCollection, eachFunc) {
	      eachFunc(collection, function(value, index, collection) {
	        accumulator = initFromCollection
	          ? (initFromCollection = false, value)
	          : iteratee(accumulator, value, index, collection);
	      });
	      return accumulator;
	    }

	    /**
	     * The base implementation of `setData` without support for hot loop detection.
	     *
	     * @private
	     * @param {Function} func The function to associate metadata with.
	     * @param {*} data The metadata.
	     * @returns {Function} Returns `func`.
	     */
	    var baseSetData = !metaMap ? identity : function(func, data) {
	      metaMap.set(func, data);
	      return func;
	    };

	    /**
	     * The base implementation of `_.slice` without an iteratee call guard.
	     *
	     * @private
	     * @param {Array} array The array to slice.
	     * @param {number} [start=0] The start position.
	     * @param {number} [end=array.length] The end position.
	     * @returns {Array} Returns the slice of `array`.
	     */
	    function baseSlice(array, start, end) {
	      var index = -1,
	          length = array.length;

	      start = start == null ? 0 : (+start || 0);
	      if (start < 0) {
	        start = -start > length ? 0 : (length + start);
	      }
	      end = (end === undefined || end > length) ? length : (+end || 0);
	      if (end < 0) {
	        end += length;
	      }
	      length = start > end ? 0 : ((end - start) >>> 0);
	      start >>>= 0;

	      var result = Array(length);
	      while (++index < length) {
	        result[index] = array[index + start];
	      }
	      return result;
	    }

	    /**
	     * The base implementation of `_.some` without support for callback shorthands
	     * and `this` binding.
	     *
	     * @private
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} predicate The function invoked per iteration.
	     * @returns {boolean} Returns `true` if any element passes the predicate check,
	     *  else `false`.
	     */
	    function baseSome(collection, predicate) {
	      var result;

	      baseEach(collection, function(value, index, collection) {
	        result = predicate(value, index, collection);
	        return !result;
	      });
	      return !!result;
	    }

	    /**
	     * The base implementation of `_.sortBy` which uses `comparer` to define
	     * the sort order of `array` and replaces criteria objects with their
	     * corresponding values.
	     *
	     * @private
	     * @param {Array} array The array to sort.
	     * @param {Function} comparer The function to define sort order.
	     * @returns {Array} Returns `array`.
	     */
	    function baseSortBy(array, comparer) {
	      var length = array.length;

	      array.sort(comparer);
	      while (length--) {
	        array[length] = array[length].value;
	      }
	      return array;
	    }

	    /**
	     * The base implementation of `_.sortByOrder` without param guards.
	     *
	     * @private
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
	     * @param {boolean[]} orders The sort orders of `iteratees`.
	     * @returns {Array} Returns the new sorted array.
	     */
	    function baseSortByOrder(collection, iteratees, orders) {
	      var callback = getCallback(),
	          index = -1;

	      iteratees = arrayMap(iteratees, function(iteratee) { return callback(iteratee); });

	      var result = baseMap(collection, function(value) {
	        var criteria = arrayMap(iteratees, function(iteratee) { return iteratee(value); });
	        return { 'criteria': criteria, 'index': ++index, 'value': value };
	      });

	      return baseSortBy(result, function(object, other) {
	        return compareMultiple(object, other, orders);
	      });
	    }

	    /**
	     * The base implementation of `_.sum` without support for callback shorthands
	     * and `this` binding.
	     *
	     * @private
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @returns {number} Returns the sum.
	     */
	    function baseSum(collection, iteratee) {
	      var result = 0;
	      baseEach(collection, function(value, index, collection) {
	        result += +iteratee(value, index, collection) || 0;
	      });
	      return result;
	    }

	    /**
	     * The base implementation of `_.uniq` without support for callback shorthands
	     * and `this` binding.
	     *
	     * @private
	     * @param {Array} array The array to inspect.
	     * @param {Function} [iteratee] The function invoked per iteration.
	     * @returns {Array} Returns the new duplicate-value-free array.
	     */
	    function baseUniq(array, iteratee) {
	      var index = -1,
	          indexOf = getIndexOf(),
	          length = array.length,
	          isCommon = indexOf == baseIndexOf,
	          isLarge = isCommon && length >= LARGE_ARRAY_SIZE,
	          seen = isLarge ? createCache() : null,
	          result = [];

	      if (seen) {
	        indexOf = cacheIndexOf;
	        isCommon = false;
	      } else {
	        isLarge = false;
	        seen = iteratee ? [] : result;
	      }
	      outer:
	      while (++index < length) {
	        var value = array[index],
	            computed = iteratee ? iteratee(value, index, array) : value;

	        if (isCommon && value === value) {
	          var seenIndex = seen.length;
	          while (seenIndex--) {
	            if (seen[seenIndex] === computed) {
	              continue outer;
	            }
	          }
	          if (iteratee) {
	            seen.push(computed);
	          }
	          result.push(value);
	        }
	        else if (indexOf(seen, computed, 0) < 0) {
	          if (iteratee || isLarge) {
	            seen.push(computed);
	          }
	          result.push(value);
	        }
	      }
	      return result;
	    }

	    /**
	     * The base implementation of `_.values` and `_.valuesIn` which creates an
	     * array of `object` property values corresponding to the property names
	     * of `props`.
	     *
	     * @private
	     * @param {Object} object The object to query.
	     * @param {Array} props The property names to get values for.
	     * @returns {Object} Returns the array of property values.
	     */
	    function baseValues(object, props) {
	      var index = -1,
	          length = props.length,
	          result = Array(length);

	      while (++index < length) {
	        result[index] = object[props[index]];
	      }
	      return result;
	    }

	    /**
	     * The base implementation of `_.dropRightWhile`, `_.dropWhile`, `_.takeRightWhile`,
	     * and `_.takeWhile` without support for callback shorthands and `this` binding.
	     *
	     * @private
	     * @param {Array} array The array to query.
	     * @param {Function} predicate The function invoked per iteration.
	     * @param {boolean} [isDrop] Specify dropping elements instead of taking them.
	     * @param {boolean} [fromRight] Specify iterating from right to left.
	     * @returns {Array} Returns the slice of `array`.
	     */
	    function baseWhile(array, predicate, isDrop, fromRight) {
	      var length = array.length,
	          index = fromRight ? length : -1;

	      while ((fromRight ? index-- : ++index < length) && predicate(array[index], index, array)) {}
	      return isDrop
	        ? baseSlice(array, (fromRight ? 0 : index), (fromRight ? index + 1 : length))
	        : baseSlice(array, (fromRight ? index + 1 : 0), (fromRight ? length : index));
	    }

	    /**
	     * The base implementation of `wrapperValue` which returns the result of
	     * performing a sequence of actions on the unwrapped `value`, where each
	     * successive action is supplied the return value of the previous.
	     *
	     * @private
	     * @param {*} value The unwrapped value.
	     * @param {Array} actions Actions to peform to resolve the unwrapped value.
	     * @returns {*} Returns the resolved value.
	     */
	    function baseWrapperValue(value, actions) {
	      var result = value;
	      if (result instanceof LazyWrapper) {
	        result = result.value();
	      }
	      var index = -1,
	          length = actions.length;

	      while (++index < length) {
	        var action = actions[index];
	        result = action.func.apply(action.thisArg, arrayPush([result], action.args));
	      }
	      return result;
	    }

	    /**
	     * Performs a binary search of `array` to determine the index at which `value`
	     * should be inserted into `array` in order to maintain its sort order.
	     *
	     * @private
	     * @param {Array} array The sorted array to inspect.
	     * @param {*} value The value to evaluate.
	     * @param {boolean} [retHighest] Specify returning the highest qualified index.
	     * @returns {number} Returns the index at which `value` should be inserted
	     *  into `array`.
	     */
	    function binaryIndex(array, value, retHighest) {
	      var low = 0,
	          high = array ? array.length : low;

	      if (typeof value == 'number' && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
	        while (low < high) {
	          var mid = (low + high) >>> 1,
	              computed = array[mid];

	          if ((retHighest ? (computed <= value) : (computed < value)) && computed !== null) {
	            low = mid + 1;
	          } else {
	            high = mid;
	          }
	        }
	        return high;
	      }
	      return binaryIndexBy(array, value, identity, retHighest);
	    }

	    /**
	     * This function is like `binaryIndex` except that it invokes `iteratee` for
	     * `value` and each element of `array` to compute their sort ranking. The
	     * iteratee is invoked with one argument; (value).
	     *
	     * @private
	     * @param {Array} array The sorted array to inspect.
	     * @param {*} value The value to evaluate.
	     * @param {Function} iteratee The function invoked per iteration.
	     * @param {boolean} [retHighest] Specify returning the highest qualified index.
	     * @returns {number} Returns the index at which `value` should be inserted
	     *  into `array`.
	     */
	    function binaryIndexBy(array, value, iteratee, retHighest) {
	      value = iteratee(value);

	      var low = 0,
	          high = array ? array.length : 0,
	          valIsNaN = value !== value,
	          valIsNull = value === null,
	          valIsUndef = value === undefined;

	      while (low < high) {
	        var mid = nativeFloor((low + high) / 2),
	            computed = iteratee(array[mid]),
	            isDef = computed !== undefined,
	            isReflexive = computed === computed;

	        if (valIsNaN) {
	          var setLow = isReflexive || retHighest;
	        } else if (valIsNull) {
	          setLow = isReflexive && isDef && (retHighest || computed != null);
	        } else if (valIsUndef) {
	          setLow = isReflexive && (retHighest || isDef);
	        } else if (computed == null) {
	          setLow = false;
	        } else {
	          setLow = retHighest ? (computed <= value) : (computed < value);
	        }
	        if (setLow) {
	          low = mid + 1;
	        } else {
	          high = mid;
	        }
	      }
	      return nativeMin(high, MAX_ARRAY_INDEX);
	    }

	    /**
	     * A specialized version of `baseCallback` which only supports `this` binding
	     * and specifying the number of arguments to provide to `func`.
	     *
	     * @private
	     * @param {Function} func The function to bind.
	     * @param {*} thisArg The `this` binding of `func`.
	     * @param {number} [argCount] The number of arguments to provide to `func`.
	     * @returns {Function} Returns the callback.
	     */
	    function bindCallback(func, thisArg, argCount) {
	      if (typeof func != 'function') {
	        return identity;
	      }
	      if (thisArg === undefined) {
	        return func;
	      }
	      switch (argCount) {
	        case 1: return function(value) {
	          return func.call(thisArg, value);
	        };
	        case 3: return function(value, index, collection) {
	          return func.call(thisArg, value, index, collection);
	        };
	        case 4: return function(accumulator, value, index, collection) {
	          return func.call(thisArg, accumulator, value, index, collection);
	        };
	        case 5: return function(value, other, key, object, source) {
	          return func.call(thisArg, value, other, key, object, source);
	        };
	      }
	      return function() {
	        return func.apply(thisArg, arguments);
	      };
	    }

	    /**
	     * Creates a clone of the given array buffer.
	     *
	     * @private
	     * @param {ArrayBuffer} buffer The array buffer to clone.
	     * @returns {ArrayBuffer} Returns the cloned array buffer.
	     */
	    function bufferClone(buffer) {
	      var result = new ArrayBuffer(buffer.byteLength),
	          view = new Uint8Array(result);

	      view.set(new Uint8Array(buffer));
	      return result;
	    }

	    /**
	     * Creates an array that is the composition of partially applied arguments,
	     * placeholders, and provided arguments into a single array of arguments.
	     *
	     * @private
	     * @param {Array|Object} args The provided arguments.
	     * @param {Array} partials The arguments to prepend to those provided.
	     * @param {Array} holders The `partials` placeholder indexes.
	     * @returns {Array} Returns the new array of composed arguments.
	     */
	    function composeArgs(args, partials, holders) {
	      var holdersLength = holders.length,
	          argsIndex = -1,
	          argsLength = nativeMax(args.length - holdersLength, 0),
	          leftIndex = -1,
	          leftLength = partials.length,
	          result = Array(leftLength + argsLength);

	      while (++leftIndex < leftLength) {
	        result[leftIndex] = partials[leftIndex];
	      }
	      while (++argsIndex < holdersLength) {
	        result[holders[argsIndex]] = args[argsIndex];
	      }
	      while (argsLength--) {
	        result[leftIndex++] = args[argsIndex++];
	      }
	      return result;
	    }

	    /**
	     * This function is like `composeArgs` except that the arguments composition
	     * is tailored for `_.partialRight`.
	     *
	     * @private
	     * @param {Array|Object} args The provided arguments.
	     * @param {Array} partials The arguments to append to those provided.
	     * @param {Array} holders The `partials` placeholder indexes.
	     * @returns {Array} Returns the new array of composed arguments.
	     */
	    function composeArgsRight(args, partials, holders) {
	      var holdersIndex = -1,
	          holdersLength = holders.length,
	          argsIndex = -1,
	          argsLength = nativeMax(args.length - holdersLength, 0),
	          rightIndex = -1,
	          rightLength = partials.length,
	          result = Array(argsLength + rightLength);

	      while (++argsIndex < argsLength) {
	        result[argsIndex] = args[argsIndex];
	      }
	      var offset = argsIndex;
	      while (++rightIndex < rightLength) {
	        result[offset + rightIndex] = partials[rightIndex];
	      }
	      while (++holdersIndex < holdersLength) {
	        result[offset + holders[holdersIndex]] = args[argsIndex++];
	      }
	      return result;
	    }

	    /**
	     * Creates a `_.countBy`, `_.groupBy`, `_.indexBy`, or `_.partition` function.
	     *
	     * @private
	     * @param {Function} setter The function to set keys and values of the accumulator object.
	     * @param {Function} [initializer] The function to initialize the accumulator object.
	     * @returns {Function} Returns the new aggregator function.
	     */
	    function createAggregator(setter, initializer) {
	      return function(collection, iteratee, thisArg) {
	        var result = initializer ? initializer() : {};
	        iteratee = getCallback(iteratee, thisArg, 3);

	        if (isArray(collection)) {
	          var index = -1,
	              length = collection.length;

	          while (++index < length) {
	            var value = collection[index];
	            setter(result, value, iteratee(value, index, collection), collection);
	          }
	        } else {
	          baseEach(collection, function(value, key, collection) {
	            setter(result, value, iteratee(value, key, collection), collection);
	          });
	        }
	        return result;
	      };
	    }

	    /**
	     * Creates a `_.assign`, `_.defaults`, or `_.merge` function.
	     *
	     * @private
	     * @param {Function} assigner The function to assign values.
	     * @returns {Function} Returns the new assigner function.
	     */
	    function createAssigner(assigner) {
	      return restParam(function(object, sources) {
	        var index = -1,
	            length = object == null ? 0 : sources.length,
	            customizer = length > 2 ? sources[length - 2] : undefined,
	            guard = length > 2 ? sources[2] : undefined,
	            thisArg = length > 1 ? sources[length - 1] : undefined;

	        if (typeof customizer == 'function') {
	          customizer = bindCallback(customizer, thisArg, 5);
	          length -= 2;
	        } else {
	          customizer = typeof thisArg == 'function' ? thisArg : undefined;
	          length -= (customizer ? 1 : 0);
	        }
	        if (guard && isIterateeCall(sources[0], sources[1], guard)) {
	          customizer = length < 3 ? undefined : customizer;
	          length = 1;
	        }
	        while (++index < length) {
	          var source = sources[index];
	          if (source) {
	            assigner(object, source, customizer);
	          }
	        }
	        return object;
	      });
	    }

	    /**
	     * Creates a `baseEach` or `baseEachRight` function.
	     *
	     * @private
	     * @param {Function} eachFunc The function to iterate over a collection.
	     * @param {boolean} [fromRight] Specify iterating from right to left.
	     * @returns {Function} Returns the new base function.
	     */
	    function createBaseEach(eachFunc, fromRight) {
	      return function(collection, iteratee) {
	        var length = collection ? getLength(collection) : 0;
	        if (!isLength(length)) {
	          return eachFunc(collection, iteratee);
	        }
	        var index = fromRight ? length : -1,
	            iterable = toObject(collection);

	        while ((fromRight ? index-- : ++index < length)) {
	          if (iteratee(iterable[index], index, iterable) === false) {
	            break;
	          }
	        }
	        return collection;
	      };
	    }

	    /**
	     * Creates a base function for `_.forIn` or `_.forInRight`.
	     *
	     * @private
	     * @param {boolean} [fromRight] Specify iterating from right to left.
	     * @returns {Function} Returns the new base function.
	     */
	    function createBaseFor(fromRight) {
	      return function(object, iteratee, keysFunc) {
	        var iterable = toObject(object),
	            props = keysFunc(object),
	            length = props.length,
	            index = fromRight ? length : -1;

	        while ((fromRight ? index-- : ++index < length)) {
	          var key = props[index];
	          if (iteratee(iterable[key], key, iterable) === false) {
	            break;
	          }
	        }
	        return object;
	      };
	    }

	    /**
	     * Creates a function that wraps `func` and invokes it with the `this`
	     * binding of `thisArg`.
	     *
	     * @private
	     * @param {Function} func The function to bind.
	     * @param {*} [thisArg] The `this` binding of `func`.
	     * @returns {Function} Returns the new bound function.
	     */
	    function createBindWrapper(func, thisArg) {
	      var Ctor = createCtorWrapper(func);

	      function wrapper() {
	        var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
	        return fn.apply(thisArg, arguments);
	      }
	      return wrapper;
	    }

	    /**
	     * Creates a `Set` cache object to optimize linear searches of large arrays.
	     *
	     * @private
	     * @param {Array} [values] The values to cache.
	     * @returns {null|Object} Returns the new cache object if `Set` is supported, else `null`.
	     */
	    function createCache(values) {
	      return (nativeCreate && Set) ? new SetCache(values) : null;
	    }

	    /**
	     * Creates a function that produces compound words out of the words in a
	     * given string.
	     *
	     * @private
	     * @param {Function} callback The function to combine each word.
	     * @returns {Function} Returns the new compounder function.
	     */
	    function createCompounder(callback) {
	      return function(string) {
	        var index = -1,
	            array = words(deburr(string)),
	            length = array.length,
	            result = '';

	        while (++index < length) {
	          result = callback(result, array[index], index);
	        }
	        return result;
	      };
	    }

	    /**
	     * Creates a function that produces an instance of `Ctor` regardless of
	     * whether it was invoked as part of a `new` expression or by `call` or `apply`.
	     *
	     * @private
	     * @param {Function} Ctor The constructor to wrap.
	     * @returns {Function} Returns the new wrapped function.
	     */
	    function createCtorWrapper(Ctor) {
	      return function() {
	        // Use a `switch` statement to work with class constructors.
	        // See http://ecma-international.org/ecma-262/6.0/#sec-ecmascript-function-objects-call-thisargument-argumentslist
	        // for more details.
	        var args = arguments;
	        switch (args.length) {
	          case 0: return new Ctor;
	          case 1: return new Ctor(args[0]);
	          case 2: return new Ctor(args[0], args[1]);
	          case 3: return new Ctor(args[0], args[1], args[2]);
	          case 4: return new Ctor(args[0], args[1], args[2], args[3]);
	          case 5: return new Ctor(args[0], args[1], args[2], args[3], args[4]);
	          case 6: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
	          case 7: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
	        }
	        var thisBinding = baseCreate(Ctor.prototype),
	            result = Ctor.apply(thisBinding, args);

	        // Mimic the constructor's `return` behavior.
	        // See https://es5.github.io/#x13.2.2 for more details.
	        return isObject(result) ? result : thisBinding;
	      };
	    }

	    /**
	     * Creates a `_.curry` or `_.curryRight` function.
	     *
	     * @private
	     * @param {boolean} flag The curry bit flag.
	     * @returns {Function} Returns the new curry function.
	     */
	    function createCurry(flag) {
	      function curryFunc(func, arity, guard) {
	        if (guard && isIterateeCall(func, arity, guard)) {
	          arity = undefined;
	        }
	        var result = createWrapper(func, flag, undefined, undefined, undefined, undefined, undefined, arity);
	        result.placeholder = curryFunc.placeholder;
	        return result;
	      }
	      return curryFunc;
	    }

	    /**
	     * Creates a `_.defaults` or `_.defaultsDeep` function.
	     *
	     * @private
	     * @param {Function} assigner The function to assign values.
	     * @param {Function} customizer The function to customize assigned values.
	     * @returns {Function} Returns the new defaults function.
	     */
	    function createDefaults(assigner, customizer) {
	      return restParam(function(args) {
	        var object = args[0];
	        if (object == null) {
	          return object;
	        }
	        args.push(customizer);
	        return assigner.apply(undefined, args);
	      });
	    }

	    /**
	     * Creates a `_.max` or `_.min` function.
	     *
	     * @private
	     * @param {Function} comparator The function used to compare values.
	     * @param {*} exValue The initial extremum value.
	     * @returns {Function} Returns the new extremum function.
	     */
	    function createExtremum(comparator, exValue) {
	      return function(collection, iteratee, thisArg) {
	        if (thisArg && isIterateeCall(collection, iteratee, thisArg)) {
	          iteratee = undefined;
	        }
	        iteratee = getCallback(iteratee, thisArg, 3);
	        if (iteratee.length == 1) {
	          collection = isArray(collection) ? collection : toIterable(collection);
	          var result = arrayExtremum(collection, iteratee, comparator, exValue);
	          if (!(collection.length && result === exValue)) {
	            return result;
	          }
	        }
	        return baseExtremum(collection, iteratee, comparator, exValue);
	      };
	    }

	    /**
	     * Creates a `_.find` or `_.findLast` function.
	     *
	     * @private
	     * @param {Function} eachFunc The function to iterate over a collection.
	     * @param {boolean} [fromRight] Specify iterating from right to left.
	     * @returns {Function} Returns the new find function.
	     */
	    function createFind(eachFunc, fromRight) {
	      return function(collection, predicate, thisArg) {
	        predicate = getCallback(predicate, thisArg, 3);
	        if (isArray(collection)) {
	          var index = baseFindIndex(collection, predicate, fromRight);
	          return index > -1 ? collection[index] : undefined;
	        }
	        return baseFind(collection, predicate, eachFunc);
	      };
	    }

	    /**
	     * Creates a `_.findIndex` or `_.findLastIndex` function.
	     *
	     * @private
	     * @param {boolean} [fromRight] Specify iterating from right to left.
	     * @returns {Function} Returns the new find function.
	     */
	    function createFindIndex(fromRight) {
	      return function(array, predicate, thisArg) {
	        if (!(array && array.length)) {
	          return -1;
	        }
	        predicate = getCallback(predicate, thisArg, 3);
	        return baseFindIndex(array, predicate, fromRight);
	      };
	    }

	    /**
	     * Creates a `_.findKey` or `_.findLastKey` function.
	     *
	     * @private
	     * @param {Function} objectFunc The function to iterate over an object.
	     * @returns {Function} Returns the new find function.
	     */
	    function createFindKey(objectFunc) {
	      return function(object, predicate, thisArg) {
	        predicate = getCallback(predicate, thisArg, 3);
	        return baseFind(object, predicate, objectFunc, true);
	      };
	    }

	    /**
	     * Creates a `_.flow` or `_.flowRight` function.
	     *
	     * @private
	     * @param {boolean} [fromRight] Specify iterating from right to left.
	     * @returns {Function} Returns the new flow function.
	     */
	    function createFlow(fromRight) {
	      return function() {
	        var wrapper,
	            length = arguments.length,
	            index = fromRight ? length : -1,
	            leftIndex = 0,
	            funcs = Array(length);

	        while ((fromRight ? index-- : ++index < length)) {
	          var func = funcs[leftIndex++] = arguments[index];
	          if (typeof func != 'function') {
	            throw new TypeError(FUNC_ERROR_TEXT);
	          }
	          if (!wrapper && LodashWrapper.prototype.thru && getFuncName(func) == 'wrapper') {
	            wrapper = new LodashWrapper([], true);
	          }
	        }
	        index = wrapper ? -1 : length;
	        while (++index < length) {
	          func = funcs[index];

	          var funcName = getFuncName(func),
	              data = funcName == 'wrapper' ? getData(func) : undefined;

	          if (data && isLaziable(data[0]) && data[1] == (ARY_FLAG | CURRY_FLAG | PARTIAL_FLAG | REARG_FLAG) && !data[4].length && data[9] == 1) {
	            wrapper = wrapper[getFuncName(data[0])].apply(wrapper, data[3]);
	          } else {
	            wrapper = (func.length == 1 && isLaziable(func)) ? wrapper[funcName]() : wrapper.thru(func);
	          }
	        }
	        return function() {
	          var args = arguments,
	              value = args[0];

	          if (wrapper && args.length == 1 && isArray(value) && value.length >= LARGE_ARRAY_SIZE) {
	            return wrapper.plant(value).value();
	          }
	          var index = 0,
	              result = length ? funcs[index].apply(this, args) : value;

	          while (++index < length) {
	            result = funcs[index].call(this, result);
	          }
	          return result;
	        };
	      };
	    }

	    /**
	     * Creates a function for `_.forEach` or `_.forEachRight`.
	     *
	     * @private
	     * @param {Function} arrayFunc The function to iterate over an array.
	     * @param {Function} eachFunc The function to iterate over a collection.
	     * @returns {Function} Returns the new each function.
	     */
	    function createForEach(arrayFunc, eachFunc) {
	      return function(collection, iteratee, thisArg) {
	        return (typeof iteratee == 'function' && thisArg === undefined && isArray(collection))
	          ? arrayFunc(collection, iteratee)
	          : eachFunc(collection, bindCallback(iteratee, thisArg, 3));
	      };
	    }

	    /**
	     * Creates a function for `_.forIn` or `_.forInRight`.
	     *
	     * @private
	     * @param {Function} objectFunc The function to iterate over an object.
	     * @returns {Function} Returns the new each function.
	     */
	    function createForIn(objectFunc) {
	      return function(object, iteratee, thisArg) {
	        if (typeof iteratee != 'function' || thisArg !== undefined) {
	          iteratee = bindCallback(iteratee, thisArg, 3);
	        }
	        return objectFunc(object, iteratee, keysIn);
	      };
	    }

	    /**
	     * Creates a function for `_.forOwn` or `_.forOwnRight`.
	     *
	     * @private
	     * @param {Function} objectFunc The function to iterate over an object.
	     * @returns {Function} Returns the new each function.
	     */
	    function createForOwn(objectFunc) {
	      return function(object, iteratee, thisArg) {
	        if (typeof iteratee != 'function' || thisArg !== undefined) {
	          iteratee = bindCallback(iteratee, thisArg, 3);
	        }
	        return objectFunc(object, iteratee);
	      };
	    }

	    /**
	     * Creates a function for `_.mapKeys` or `_.mapValues`.
	     *
	     * @private
	     * @param {boolean} [isMapKeys] Specify mapping keys instead of values.
	     * @returns {Function} Returns the new map function.
	     */
	    function createObjectMapper(isMapKeys) {
	      return function(object, iteratee, thisArg) {
	        var result = {};
	        iteratee = getCallback(iteratee, thisArg, 3);

	        baseForOwn(object, function(value, key, object) {
	          var mapped = iteratee(value, key, object);
	          key = isMapKeys ? mapped : key;
	          value = isMapKeys ? value : mapped;
	          result[key] = value;
	        });
	        return result;
	      };
	    }

	    /**
	     * Creates a function for `_.padLeft` or `_.padRight`.
	     *
	     * @private
	     * @param {boolean} [fromRight] Specify padding from the right.
	     * @returns {Function} Returns the new pad function.
	     */
	    function createPadDir(fromRight) {
	      return function(string, length, chars) {
	        string = baseToString(string);
	        return (fromRight ? string : '') + createPadding(string, length, chars) + (fromRight ? '' : string);
	      };
	    }

	    /**
	     * Creates a `_.partial` or `_.partialRight` function.
	     *
	     * @private
	     * @param {boolean} flag The partial bit flag.
	     * @returns {Function} Returns the new partial function.
	     */
	    function createPartial(flag) {
	      var partialFunc = restParam(function(func, partials) {
	        var holders = replaceHolders(partials, partialFunc.placeholder);
	        return createWrapper(func, flag, undefined, partials, holders);
	      });
	      return partialFunc;
	    }

	    /**
	     * Creates a function for `_.reduce` or `_.reduceRight`.
	     *
	     * @private
	     * @param {Function} arrayFunc The function to iterate over an array.
	     * @param {Function} eachFunc The function to iterate over a collection.
	     * @returns {Function} Returns the new each function.
	     */
	    function createReduce(arrayFunc, eachFunc) {
	      return function(collection, iteratee, accumulator, thisArg) {
	        var initFromArray = arguments.length < 3;
	        return (typeof iteratee == 'function' && thisArg === undefined && isArray(collection))
	          ? arrayFunc(collection, iteratee, accumulator, initFromArray)
	          : baseReduce(collection, getCallback(iteratee, thisArg, 4), accumulator, initFromArray, eachFunc);
	      };
	    }

	    /**
	     * Creates a function that wraps `func` and invokes it with optional `this`
	     * binding of, partial application, and currying.
	     *
	     * @private
	     * @param {Function|string} func The function or method name to reference.
	     * @param {number} bitmask The bitmask of flags. See `createWrapper` for more details.
	     * @param {*} [thisArg] The `this` binding of `func`.
	     * @param {Array} [partials] The arguments to prepend to those provided to the new function.
	     * @param {Array} [holders] The `partials` placeholder indexes.
	     * @param {Array} [partialsRight] The arguments to append to those provided to the new function.
	     * @param {Array} [holdersRight] The `partialsRight` placeholder indexes.
	     * @param {Array} [argPos] The argument positions of the new function.
	     * @param {number} [ary] The arity cap of `func`.
	     * @param {number} [arity] The arity of `func`.
	     * @returns {Function} Returns the new wrapped function.
	     */
	    function createHybridWrapper(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
	      var isAry = bitmask & ARY_FLAG,
	          isBind = bitmask & BIND_FLAG,
	          isBindKey = bitmask & BIND_KEY_FLAG,
	          isCurry = bitmask & CURRY_FLAG,
	          isCurryBound = bitmask & CURRY_BOUND_FLAG,
	          isCurryRight = bitmask & CURRY_RIGHT_FLAG,
	          Ctor = isBindKey ? undefined : createCtorWrapper(func);

	      function wrapper() {
	        // Avoid `arguments` object use disqualifying optimizations by
	        // converting it to an array before providing it to other functions.
	        var length = arguments.length,
	            index = length,
	            args = Array(length);

	        while (index--) {
	          args[index] = arguments[index];
	        }
	        if (partials) {
	          args = composeArgs(args, partials, holders);
	        }
	        if (partialsRight) {
	          args = composeArgsRight(args, partialsRight, holdersRight);
	        }
	        if (isCurry || isCurryRight) {
	          var placeholder = wrapper.placeholder,
	              argsHolders = replaceHolders(args, placeholder);

	          length -= argsHolders.length;
	          if (length < arity) {
	            var newArgPos = argPos ? arrayCopy(argPos) : undefined,
	                newArity = nativeMax(arity - length, 0),
	                newsHolders = isCurry ? argsHolders : undefined,
	                newHoldersRight = isCurry ? undefined : argsHolders,
	                newPartials = isCurry ? args : undefined,
	                newPartialsRight = isCurry ? undefined : args;

	            bitmask |= (isCurry ? PARTIAL_FLAG : PARTIAL_RIGHT_FLAG);
	            bitmask &= ~(isCurry ? PARTIAL_RIGHT_FLAG : PARTIAL_FLAG);

	            if (!isCurryBound) {
	              bitmask &= ~(BIND_FLAG | BIND_KEY_FLAG);
	            }
	            var newData = [func, bitmask, thisArg, newPartials, newsHolders, newPartialsRight, newHoldersRight, newArgPos, ary, newArity],
	                result = createHybridWrapper.apply(undefined, newData);

	            if (isLaziable(func)) {
	              setData(result, newData);
	            }
	            result.placeholder = placeholder;
	            return result;
	          }
	        }
	        var thisBinding = isBind ? thisArg : this,
	            fn = isBindKey ? thisBinding[func] : func;

	        if (argPos) {
	          args = reorder(args, argPos);
	        }
	        if (isAry && ary < args.length) {
	          args.length = ary;
	        }
	        if (this && this !== root && this instanceof wrapper) {
	          fn = Ctor || createCtorWrapper(func);
	        }
	        return fn.apply(thisBinding, args);
	      }
	      return wrapper;
	    }

	    /**
	     * Creates the padding required for `string` based on the given `length`.
	     * The `chars` string is truncated if the number of characters exceeds `length`.
	     *
	     * @private
	     * @param {string} string The string to create padding for.
	     * @param {number} [length=0] The padding length.
	     * @param {string} [chars=' '] The string used as padding.
	     * @returns {string} Returns the pad for `string`.
	     */
	    function createPadding(string, length, chars) {
	      var strLength = string.length;
	      length = +length;

	      if (strLength >= length || !nativeIsFinite(length)) {
	        return '';
	      }
	      var padLength = length - strLength;
	      chars = chars == null ? ' ' : (chars + '');
	      return repeat(chars, nativeCeil(padLength / chars.length)).slice(0, padLength);
	    }

	    /**
	     * Creates a function that wraps `func` and invokes it with the optional `this`
	     * binding of `thisArg` and the `partials` prepended to those provided to
	     * the wrapper.
	     *
	     * @private
	     * @param {Function} func The function to partially apply arguments to.
	     * @param {number} bitmask The bitmask of flags. See `createWrapper` for more details.
	     * @param {*} thisArg The `this` binding of `func`.
	     * @param {Array} partials The arguments to prepend to those provided to the new function.
	     * @returns {Function} Returns the new bound function.
	     */
	    function createPartialWrapper(func, bitmask, thisArg, partials) {
	      var isBind = bitmask & BIND_FLAG,
	          Ctor = createCtorWrapper(func);

	      function wrapper() {
	        // Avoid `arguments` object use disqualifying optimizations by
	        // converting it to an array before providing it `func`.
	        var argsIndex = -1,
	            argsLength = arguments.length,
	            leftIndex = -1,
	            leftLength = partials.length,
	            args = Array(leftLength + argsLength);

	        while (++leftIndex < leftLength) {
	          args[leftIndex] = partials[leftIndex];
	        }
	        while (argsLength--) {
	          args[leftIndex++] = arguments[++argsIndex];
	        }
	        var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
	        return fn.apply(isBind ? thisArg : this, args);
	      }
	      return wrapper;
	    }

	    /**
	     * Creates a `_.ceil`, `_.floor`, or `_.round` function.
	     *
	     * @private
	     * @param {string} methodName The name of the `Math` method to use when rounding.
	     * @returns {Function} Returns the new round function.
	     */
	    function createRound(methodName) {
	      var func = Math[methodName];
	      return function(number, precision) {
	        precision = precision === undefined ? 0 : (+precision || 0);
	        if (precision) {
	          precision = pow(10, precision);
	          return func(number * precision) / precision;
	        }
	        return func(number);
	      };
	    }

	    /**
	     * Creates a `_.sortedIndex` or `_.sortedLastIndex` function.
	     *
	     * @private
	     * @param {boolean} [retHighest] Specify returning the highest qualified index.
	     * @returns {Function} Returns the new index function.
	     */
	    function createSortedIndex(retHighest) {
	      return function(array, value, iteratee, thisArg) {
	        var callback = getCallback(iteratee);
	        return (iteratee == null && callback === baseCallback)
	          ? binaryIndex(array, value, retHighest)
	          : binaryIndexBy(array, value, callback(iteratee, thisArg, 1), retHighest);
	      };
	    }

	    /**
	     * Creates a function that either curries or invokes `func` with optional
	     * `this` binding and partially applied arguments.
	     *
	     * @private
	     * @param {Function|string} func The function or method name to reference.
	     * @param {number} bitmask The bitmask of flags.
	     *  The bitmask may be composed of the following flags:
	     *     1 - `_.bind`
	     *     2 - `_.bindKey`
	     *     4 - `_.curry` or `_.curryRight` of a bound function
	     *     8 - `_.curry`
	     *    16 - `_.curryRight`
	     *    32 - `_.partial`
	     *    64 - `_.partialRight`
	     *   128 - `_.rearg`
	     *   256 - `_.ary`
	     * @param {*} [thisArg] The `this` binding of `func`.
	     * @param {Array} [partials] The arguments to be partially applied.
	     * @param {Array} [holders] The `partials` placeholder indexes.
	     * @param {Array} [argPos] The argument positions of the new function.
	     * @param {number} [ary] The arity cap of `func`.
	     * @param {number} [arity] The arity of `func`.
	     * @returns {Function} Returns the new wrapped function.
	     */
	    function createWrapper(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
	      var isBindKey = bitmask & BIND_KEY_FLAG;
	      if (!isBindKey && typeof func != 'function') {
	        throw new TypeError(FUNC_ERROR_TEXT);
	      }
	      var length = partials ? partials.length : 0;
	      if (!length) {
	        bitmask &= ~(PARTIAL_FLAG | PARTIAL_RIGHT_FLAG);
	        partials = holders = undefined;
	      }
	      length -= (holders ? holders.length : 0);
	      if (bitmask & PARTIAL_RIGHT_FLAG) {
	        var partialsRight = partials,
	            holdersRight = holders;

	        partials = holders = undefined;
	      }
	      var data = isBindKey ? undefined : getData(func),
	          newData = [func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity];

	      if (data) {
	        mergeData(newData, data);
	        bitmask = newData[1];
	        arity = newData[9];
	      }
	      newData[9] = arity == null
	        ? (isBindKey ? 0 : func.length)
	        : (nativeMax(arity - length, 0) || 0);

	      if (bitmask == BIND_FLAG) {
	        var result = createBindWrapper(newData[0], newData[2]);
	      } else if ((bitmask == PARTIAL_FLAG || bitmask == (BIND_FLAG | PARTIAL_FLAG)) && !newData[4].length) {
	        result = createPartialWrapper.apply(undefined, newData);
	      } else {
	        result = createHybridWrapper.apply(undefined, newData);
	      }
	      var setter = data ? baseSetData : setData;
	      return setter(result, newData);
	    }

	    /**
	     * A specialized version of `baseIsEqualDeep` for arrays with support for
	     * partial deep comparisons.
	     *
	     * @private
	     * @param {Array} array The array to compare.
	     * @param {Array} other The other array to compare.
	     * @param {Function} equalFunc The function to determine equivalents of values.
	     * @param {Function} [customizer] The function to customize comparing arrays.
	     * @param {boolean} [isLoose] Specify performing partial comparisons.
	     * @param {Array} [stackA] Tracks traversed `value` objects.
	     * @param {Array} [stackB] Tracks traversed `other` objects.
	     * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	     */
	    function equalArrays(array, other, equalFunc, customizer, isLoose, stackA, stackB) {
	      var index = -1,
	          arrLength = array.length,
	          othLength = other.length;

	      if (arrLength != othLength && !(isLoose && othLength > arrLength)) {
	        return false;
	      }
	      // Ignore non-index properties.
	      while (++index < arrLength) {
	        var arrValue = array[index],
	            othValue = other[index],
	            result = customizer ? customizer(isLoose ? othValue : arrValue, isLoose ? arrValue : othValue, index) : undefined;

	        if (result !== undefined) {
	          if (result) {
	            continue;
	          }
	          return false;
	        }
	        // Recursively compare arrays (susceptible to call stack limits).
	        if (isLoose) {
	          if (!arraySome(other, function(othValue) {
	                return arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB);
	              })) {
	            return false;
	          }
	        } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB))) {
	          return false;
	        }
	      }
	      return true;
	    }

	    /**
	     * A specialized version of `baseIsEqualDeep` for comparing objects of
	     * the same `toStringTag`.
	     *
	     * **Note:** This function only supports comparing values with tags of
	     * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	     *
	     * @private
	     * @param {Object} object The object to compare.
	     * @param {Object} other The other object to compare.
	     * @param {string} tag The `toStringTag` of the objects to compare.
	     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	     */
	    function equalByTag(object, other, tag) {
	      switch (tag) {
	        case boolTag:
	        case dateTag:
	          // Coerce dates and booleans to numbers, dates to milliseconds and booleans
	          // to `1` or `0` treating invalid dates coerced to `NaN` as not equal.
	          return +object == +other;

	        case errorTag:
	          return object.name == other.name && object.message == other.message;

	        case numberTag:
	          // Treat `NaN` vs. `NaN` as equal.
	          return (object != +object)
	            ? other != +other
	            : object == +other;

	        case regexpTag:
	        case stringTag:
	          // Coerce regexes to strings and treat strings primitives and string
	          // objects as equal. See https://es5.github.io/#x15.10.6.4 for more details.
	          return object == (other + '');
	      }
	      return false;
	    }

	    /**
	     * A specialized version of `baseIsEqualDeep` for objects with support for
	     * partial deep comparisons.
	     *
	     * @private
	     * @param {Object} object The object to compare.
	     * @param {Object} other The other object to compare.
	     * @param {Function} equalFunc The function to determine equivalents of values.
	     * @param {Function} [customizer] The function to customize comparing values.
	     * @param {boolean} [isLoose] Specify performing partial comparisons.
	     * @param {Array} [stackA] Tracks traversed `value` objects.
	     * @param {Array} [stackB] Tracks traversed `other` objects.
	     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	     */
	    function equalObjects(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
	      var objProps = keys(object),
	          objLength = objProps.length,
	          othProps = keys(other),
	          othLength = othProps.length;

	      if (objLength != othLength && !isLoose) {
	        return false;
	      }
	      var index = objLength;
	      while (index--) {
	        var key = objProps[index];
	        if (!(isLoose ? key in other : hasOwnProperty.call(other, key))) {
	          return false;
	        }
	      }
	      var skipCtor = isLoose;
	      while (++index < objLength) {
	        key = objProps[index];
	        var objValue = object[key],
	            othValue = other[key],
	            result = customizer ? customizer(isLoose ? othValue : objValue, isLoose? objValue : othValue, key) : undefined;

	        // Recursively compare objects (susceptible to call stack limits).
	        if (!(result === undefined ? equalFunc(objValue, othValue, customizer, isLoose, stackA, stackB) : result)) {
	          return false;
	        }
	        skipCtor || (skipCtor = key == 'constructor');
	      }
	      if (!skipCtor) {
	        var objCtor = object.constructor,
	            othCtor = other.constructor;

	        // Non `Object` object instances with different constructors are not equal.
	        if (objCtor != othCtor &&
	            ('constructor' in object && 'constructor' in other) &&
	            !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
	              typeof othCtor == 'function' && othCtor instanceof othCtor)) {
	          return false;
	        }
	      }
	      return true;
	    }

	    /**
	     * Gets the appropriate "callback" function. If the `_.callback` method is
	     * customized this function returns the custom method, otherwise it returns
	     * the `baseCallback` function. If arguments are provided the chosen function
	     * is invoked with them and its result is returned.
	     *
	     * @private
	     * @returns {Function} Returns the chosen function or its result.
	     */
	    function getCallback(func, thisArg, argCount) {
	      var result = lodash.callback || callback;
	      result = result === callback ? baseCallback : result;
	      return argCount ? result(func, thisArg, argCount) : result;
	    }

	    /**
	     * Gets metadata for `func`.
	     *
	     * @private
	     * @param {Function} func The function to query.
	     * @returns {*} Returns the metadata for `func`.
	     */
	    var getData = !metaMap ? noop : function(func) {
	      return metaMap.get(func);
	    };

	    /**
	     * Gets the name of `func`.
	     *
	     * @private
	     * @param {Function} func The function to query.
	     * @returns {string} Returns the function name.
	     */
	    function getFuncName(func) {
	      var result = func.name,
	          array = realNames[result],
	          length = array ? array.length : 0;

	      while (length--) {
	        var data = array[length],
	            otherFunc = data.func;
	        if (otherFunc == null || otherFunc == func) {
	          return data.name;
	        }
	      }
	      return result;
	    }

	    /**
	     * Gets the appropriate "indexOf" function. If the `_.indexOf` method is
	     * customized this function returns the custom method, otherwise it returns
	     * the `baseIndexOf` function. If arguments are provided the chosen function
	     * is invoked with them and its result is returned.
	     *
	     * @private
	     * @returns {Function|number} Returns the chosen function or its result.
	     */
	    function getIndexOf(collection, target, fromIndex) {
	      var result = lodash.indexOf || indexOf;
	      result = result === indexOf ? baseIndexOf : result;
	      return collection ? result(collection, target, fromIndex) : result;
	    }

	    /**
	     * Gets the "length" property value of `object`.
	     *
	     * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
	     * that affects Safari on at least iOS 8.1-8.3 ARM64.
	     *
	     * @private
	     * @param {Object} object The object to query.
	     * @returns {*} Returns the "length" value.
	     */
	    var getLength = baseProperty('length');

	    /**
	     * Gets the propery names, values, and compare flags of `object`.
	     *
	     * @private
	     * @param {Object} object The object to query.
	     * @returns {Array} Returns the match data of `object`.
	     */
	    function getMatchData(object) {
	      var result = pairs(object),
	          length = result.length;

	      while (length--) {
	        result[length][2] = isStrictComparable(result[length][1]);
	      }
	      return result;
	    }

	    /**
	     * Gets the native function at `key` of `object`.
	     *
	     * @private
	     * @param {Object} object The object to query.
	     * @param {string} key The key of the method to get.
	     * @returns {*} Returns the function if it's native, else `undefined`.
	     */
	    function getNative(object, key) {
	      var value = object == null ? undefined : object[key];
	      return isNative(value) ? value : undefined;
	    }

	    /**
	     * Gets the view, applying any `transforms` to the `start` and `end` positions.
	     *
	     * @private
	     * @param {number} start The start of the view.
	     * @param {number} end The end of the view.
	     * @param {Array} transforms The transformations to apply to the view.
	     * @returns {Object} Returns an object containing the `start` and `end`
	     *  positions of the view.
	     */
	    function getView(start, end, transforms) {
	      var index = -1,
	          length = transforms.length;

	      while (++index < length) {
	        var data = transforms[index],
	            size = data.size;

	        switch (data.type) {
	          case 'drop':      start += size; break;
	          case 'dropRight': end -= size; break;
	          case 'take':      end = nativeMin(end, start + size); break;
	          case 'takeRight': start = nativeMax(start, end - size); break;
	        }
	      }
	      return { 'start': start, 'end': end };
	    }

	    /**
	     * Initializes an array clone.
	     *
	     * @private
	     * @param {Array} array The array to clone.
	     * @returns {Array} Returns the initialized clone.
	     */
	    function initCloneArray(array) {
	      var length = array.length,
	          result = new array.constructor(length);

	      // Add array properties assigned by `RegExp#exec`.
	      if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
	        result.index = array.index;
	        result.input = array.input;
	      }
	      return result;
	    }

	    /**
	     * Initializes an object clone.
	     *
	     * @private
	     * @param {Object} object The object to clone.
	     * @returns {Object} Returns the initialized clone.
	     */
	    function initCloneObject(object) {
	      var Ctor = object.constructor;
	      if (!(typeof Ctor == 'function' && Ctor instanceof Ctor)) {
	        Ctor = Object;
	      }
	      return new Ctor;
	    }

	    /**
	     * Initializes an object clone based on its `toStringTag`.
	     *
	     * **Note:** This function only supports cloning values with tags of
	     * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	     *
	     * @private
	     * @param {Object} object The object to clone.
	     * @param {string} tag The `toStringTag` of the object to clone.
	     * @param {boolean} [isDeep] Specify a deep clone.
	     * @returns {Object} Returns the initialized clone.
	     */
	    function initCloneByTag(object, tag, isDeep) {
	      var Ctor = object.constructor;
	      switch (tag) {
	        case arrayBufferTag:
	          return bufferClone(object);

	        case boolTag:
	        case dateTag:
	          return new Ctor(+object);

	        case float32Tag: case float64Tag:
	        case int8Tag: case int16Tag: case int32Tag:
	        case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
	          var buffer = object.buffer;
	          return new Ctor(isDeep ? bufferClone(buffer) : buffer, object.byteOffset, object.length);

	        case numberTag:
	        case stringTag:
	          return new Ctor(object);

	        case regexpTag:
	          var result = new Ctor(object.source, reFlags.exec(object));
	          result.lastIndex = object.lastIndex;
	      }
	      return result;
	    }

	    /**
	     * Invokes the method at `path` on `object`.
	     *
	     * @private
	     * @param {Object} object The object to query.
	     * @param {Array|string} path The path of the method to invoke.
	     * @param {Array} args The arguments to invoke the method with.
	     * @returns {*} Returns the result of the invoked method.
	     */
	    function invokePath(object, path, args) {
	      if (object != null && !isKey(path, object)) {
	        path = toPath(path);
	        object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
	        path = last(path);
	      }
	      var func = object == null ? object : object[path];
	      return func == null ? undefined : func.apply(object, args);
	    }

	    /**
	     * Checks if `value` is array-like.
	     *
	     * @private
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	     */
	    function isArrayLike(value) {
	      return value != null && isLength(getLength(value));
	    }

	    /**
	     * Checks if `value` is a valid array-like index.
	     *
	     * @private
	     * @param {*} value The value to check.
	     * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	     * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	     */
	    function isIndex(value, length) {
	      value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
	      length = length == null ? MAX_SAFE_INTEGER : length;
	      return value > -1 && value % 1 == 0 && value < length;
	    }

	    /**
	     * Checks if the provided arguments are from an iteratee call.
	     *
	     * @private
	     * @param {*} value The potential iteratee value argument.
	     * @param {*} index The potential iteratee index or key argument.
	     * @param {*} object The potential iteratee object argument.
	     * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
	     */
	    function isIterateeCall(value, index, object) {
	      if (!isObject(object)) {
	        return false;
	      }
	      var type = typeof index;
	      if (type == 'number'
	          ? (isArrayLike(object) && isIndex(index, object.length))
	          : (type == 'string' && index in object)) {
	        var other = object[index];
	        return value === value ? (value === other) : (other !== other);
	      }
	      return false;
	    }

	    /**
	     * Checks if `value` is a property name and not a property path.
	     *
	     * @private
	     * @param {*} value The value to check.
	     * @param {Object} [object] The object to query keys on.
	     * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
	     */
	    function isKey(value, object) {
	      var type = typeof value;
	      if ((type == 'string' && reIsPlainProp.test(value)) || type == 'number') {
	        return true;
	      }
	      if (isArray(value)) {
	        return false;
	      }
	      var result = !reIsDeepProp.test(value);
	      return result || (object != null && value in toObject(object));
	    }

	    /**
	     * Checks if `func` has a lazy counterpart.
	     *
	     * @private
	     * @param {Function} func The function to check.
	     * @returns {boolean} Returns `true` if `func` has a lazy counterpart, else `false`.
	     */
	    function isLaziable(func) {
	      var funcName = getFuncName(func);
	      if (!(funcName in LazyWrapper.prototype)) {
	        return false;
	      }
	      var other = lodash[funcName];
	      if (func === other) {
	        return true;
	      }
	      var data = getData(other);
	      return !!data && func === data[0];
	    }

	    /**
	     * Checks if `value` is a valid array-like length.
	     *
	     * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	     *
	     * @private
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	     */
	    function isLength(value) {
	      return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	    }

	    /**
	     * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
	     *
	     * @private
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` if suitable for strict
	     *  equality comparisons, else `false`.
	     */
	    function isStrictComparable(value) {
	      return value === value && !isObject(value);
	    }

	    /**
	     * Merges the function metadata of `source` into `data`.
	     *
	     * Merging metadata reduces the number of wrappers required to invoke a function.
	     * This is possible because methods like `_.bind`, `_.curry`, and `_.partial`
	     * may be applied regardless of execution order. Methods like `_.ary` and `_.rearg`
	     * augment function arguments, making the order in which they are executed important,
	     * preventing the merging of metadata. However, we make an exception for a safe
	     * common case where curried functions have `_.ary` and or `_.rearg` applied.
	     *
	     * @private
	     * @param {Array} data The destination metadata.
	     * @param {Array} source The source metadata.
	     * @returns {Array} Returns `data`.
	     */
	    function mergeData(data, source) {
	      var bitmask = data[1],
	          srcBitmask = source[1],
	          newBitmask = bitmask | srcBitmask,
	          isCommon = newBitmask < ARY_FLAG;

	      var isCombo =
	        (srcBitmask == ARY_FLAG && bitmask == CURRY_FLAG) ||
	        (srcBitmask == ARY_FLAG && bitmask == REARG_FLAG && data[7].length <= source[8]) ||
	        (srcBitmask == (ARY_FLAG | REARG_FLAG) && bitmask == CURRY_FLAG);

	      // Exit early if metadata can't be merged.
	      if (!(isCommon || isCombo)) {
	        return data;
	      }
	      // Use source `thisArg` if available.
	      if (srcBitmask & BIND_FLAG) {
	        data[2] = source[2];
	        // Set when currying a bound function.
	        newBitmask |= (bitmask & BIND_FLAG) ? 0 : CURRY_BOUND_FLAG;
	      }
	      // Compose partial arguments.
	      var value = source[3];
	      if (value) {
	        var partials = data[3];
	        data[3] = partials ? composeArgs(partials, value, source[4]) : arrayCopy(value);
	        data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : arrayCopy(source[4]);
	      }
	      // Compose partial right arguments.
	      value = source[5];
	      if (value) {
	        partials = data[5];
	        data[5] = partials ? composeArgsRight(partials, value, source[6]) : arrayCopy(value);
	        data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : arrayCopy(source[6]);
	      }
	      // Use source `argPos` if available.
	      value = source[7];
	      if (value) {
	        data[7] = arrayCopy(value);
	      }
	      // Use source `ary` if it's smaller.
	      if (srcBitmask & ARY_FLAG) {
	        data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
	      }
	      // Use source `arity` if one is not provided.
	      if (data[9] == null) {
	        data[9] = source[9];
	      }
	      // Use source `func` and merge bitmasks.
	      data[0] = source[0];
	      data[1] = newBitmask;

	      return data;
	    }

	    /**
	     * Used by `_.defaultsDeep` to customize its `_.merge` use.
	     *
	     * @private
	     * @param {*} objectValue The destination object property value.
	     * @param {*} sourceValue The source object property value.
	     * @returns {*} Returns the value to assign to the destination object.
	     */
	    function mergeDefaults(objectValue, sourceValue) {
	      return objectValue === undefined ? sourceValue : merge(objectValue, sourceValue, mergeDefaults);
	    }

	    /**
	     * A specialized version of `_.pick` which picks `object` properties specified
	     * by `props`.
	     *
	     * @private
	     * @param {Object} object The source object.
	     * @param {string[]} props The property names to pick.
	     * @returns {Object} Returns the new object.
	     */
	    function pickByArray(object, props) {
	      object = toObject(object);

	      var index = -1,
	          length = props.length,
	          result = {};

	      while (++index < length) {
	        var key = props[index];
	        if (key in object) {
	          result[key] = object[key];
	        }
	      }
	      return result;
	    }

	    /**
	     * A specialized version of `_.pick` which picks `object` properties `predicate`
	     * returns truthy for.
	     *
	     * @private
	     * @param {Object} object The source object.
	     * @param {Function} predicate The function invoked per iteration.
	     * @returns {Object} Returns the new object.
	     */
	    function pickByCallback(object, predicate) {
	      var result = {};
	      baseForIn(object, function(value, key, object) {
	        if (predicate(value, key, object)) {
	          result[key] = value;
	        }
	      });
	      return result;
	    }

	    /**
	     * Reorder `array` according to the specified indexes where the element at
	     * the first index is assigned as the first element, the element at
	     * the second index is assigned as the second element, and so on.
	     *
	     * @private
	     * @param {Array} array The array to reorder.
	     * @param {Array} indexes The arranged array indexes.
	     * @returns {Array} Returns `array`.
	     */
	    function reorder(array, indexes) {
	      var arrLength = array.length,
	          length = nativeMin(indexes.length, arrLength),
	          oldArray = arrayCopy(array);

	      while (length--) {
	        var index = indexes[length];
	        array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined;
	      }
	      return array;
	    }

	    /**
	     * Sets metadata for `func`.
	     *
	     * **Note:** If this function becomes hot, i.e. is invoked a lot in a short
	     * period of time, it will trip its breaker and transition to an identity function
	     * to avoid garbage collection pauses in V8. See [V8 issue 2070](https://code.google.com/p/v8/issues/detail?id=2070)
	     * for more details.
	     *
	     * @private
	     * @param {Function} func The function to associate metadata with.
	     * @param {*} data The metadata.
	     * @returns {Function} Returns `func`.
	     */
	    var setData = (function() {
	      var count = 0,
	          lastCalled = 0;

	      return function(key, value) {
	        var stamp = now(),
	            remaining = HOT_SPAN - (stamp - lastCalled);

	        lastCalled = stamp;
	        if (remaining > 0) {
	          if (++count >= HOT_COUNT) {
	            return key;
	          }
	        } else {
	          count = 0;
	        }
	        return baseSetData(key, value);
	      };
	    }());

	    /**
	     * A fallback implementation of `Object.keys` which creates an array of the
	     * own enumerable property names of `object`.
	     *
	     * @private
	     * @param {Object} object The object to query.
	     * @returns {Array} Returns the array of property names.
	     */
	    function shimKeys(object) {
	      var props = keysIn(object),
	          propsLength = props.length,
	          length = propsLength && object.length;

	      var allowIndexes = !!length && isLength(length) &&
	        (isArray(object) || isArguments(object));

	      var index = -1,
	          result = [];

	      while (++index < propsLength) {
	        var key = props[index];
	        if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
	          result.push(key);
	        }
	      }
	      return result;
	    }

	    /**
	     * Converts `value` to an array-like object if it's not one.
	     *
	     * @private
	     * @param {*} value The value to process.
	     * @returns {Array|Object} Returns the array-like object.
	     */
	    function toIterable(value) {
	      if (value == null) {
	        return [];
	      }
	      if (!isArrayLike(value)) {
	        return values(value);
	      }
	      return isObject(value) ? value : Object(value);
	    }

	    /**
	     * Converts `value` to an object if it's not one.
	     *
	     * @private
	     * @param {*} value The value to process.
	     * @returns {Object} Returns the object.
	     */
	    function toObject(value) {
	      return isObject(value) ? value : Object(value);
	    }

	    /**
	     * Converts `value` to property path array if it's not one.
	     *
	     * @private
	     * @param {*} value The value to process.
	     * @returns {Array} Returns the property path array.
	     */
	    function toPath(value) {
	      if (isArray(value)) {
	        return value;
	      }
	      var result = [];
	      baseToString(value).replace(rePropName, function(match, number, quote, string) {
	        result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
	      });
	      return result;
	    }

	    /**
	     * Creates a clone of `wrapper`.
	     *
	     * @private
	     * @param {Object} wrapper The wrapper to clone.
	     * @returns {Object} Returns the cloned wrapper.
	     */
	    function wrapperClone(wrapper) {
	      return wrapper instanceof LazyWrapper
	        ? wrapper.clone()
	        : new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__, arrayCopy(wrapper.__actions__));
	    }

	    /*------------------------------------------------------------------------*/

	    /**
	     * Creates an array of elements split into groups the length of `size`.
	     * If `collection` can't be split evenly, the final chunk will be the remaining
	     * elements.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to process.
	     * @param {number} [size=1] The length of each chunk.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {Array} Returns the new array containing chunks.
	     * @example
	     *
	     * _.chunk(['a', 'b', 'c', 'd'], 2);
	     * // => [['a', 'b'], ['c', 'd']]
	     *
	     * _.chunk(['a', 'b', 'c', 'd'], 3);
	     * // => [['a', 'b', 'c'], ['d']]
	     */
	    function chunk(array, size, guard) {
	      if (guard ? isIterateeCall(array, size, guard) : size == null) {
	        size = 1;
	      } else {
	        size = nativeMax(nativeFloor(size) || 1, 1);
	      }
	      var index = 0,
	          length = array ? array.length : 0,
	          resIndex = -1,
	          result = Array(nativeCeil(length / size));

	      while (index < length) {
	        result[++resIndex] = baseSlice(array, index, (index += size));
	      }
	      return result;
	    }

	    /**
	     * Creates an array with all falsey values removed. The values `false`, `null`,
	     * `0`, `""`, `undefined`, and `NaN` are falsey.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to compact.
	     * @returns {Array} Returns the new array of filtered values.
	     * @example
	     *
	     * _.compact([0, 1, false, 2, '', 3]);
	     * // => [1, 2, 3]
	     */
	    function compact(array) {
	      var index = -1,
	          length = array ? array.length : 0,
	          resIndex = -1,
	          result = [];

	      while (++index < length) {
	        var value = array[index];
	        if (value) {
	          result[++resIndex] = value;
	        }
	      }
	      return result;
	    }

	    /**
	     * Creates an array of unique `array` values not included in the other
	     * provided arrays using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	     * for equality comparisons.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to inspect.
	     * @param {...Array} [values] The arrays of values to exclude.
	     * @returns {Array} Returns the new array of filtered values.
	     * @example
	     *
	     * _.difference([1, 2, 3], [4, 2]);
	     * // => [1, 3]
	     */
	    var difference = restParam(function(array, values) {
	      return (isObjectLike(array) && isArrayLike(array))
	        ? baseDifference(array, baseFlatten(values, false, true))
	        : [];
	    });

	    /**
	     * Creates a slice of `array` with `n` elements dropped from the beginning.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to query.
	     * @param {number} [n=1] The number of elements to drop.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * _.drop([1, 2, 3]);
	     * // => [2, 3]
	     *
	     * _.drop([1, 2, 3], 2);
	     * // => [3]
	     *
	     * _.drop([1, 2, 3], 5);
	     * // => []
	     *
	     * _.drop([1, 2, 3], 0);
	     * // => [1, 2, 3]
	     */
	    function drop(array, n, guard) {
	      var length = array ? array.length : 0;
	      if (!length) {
	        return [];
	      }
	      if (guard ? isIterateeCall(array, n, guard) : n == null) {
	        n = 1;
	      }
	      return baseSlice(array, n < 0 ? 0 : n);
	    }

	    /**
	     * Creates a slice of `array` with `n` elements dropped from the end.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to query.
	     * @param {number} [n=1] The number of elements to drop.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * _.dropRight([1, 2, 3]);
	     * // => [1, 2]
	     *
	     * _.dropRight([1, 2, 3], 2);
	     * // => [1]
	     *
	     * _.dropRight([1, 2, 3], 5);
	     * // => []
	     *
	     * _.dropRight([1, 2, 3], 0);
	     * // => [1, 2, 3]
	     */
	    function dropRight(array, n, guard) {
	      var length = array ? array.length : 0;
	      if (!length) {
	        return [];
	      }
	      if (guard ? isIterateeCall(array, n, guard) : n == null) {
	        n = 1;
	      }
	      n = length - (+n || 0);
	      return baseSlice(array, 0, n < 0 ? 0 : n);
	    }

	    /**
	     * Creates a slice of `array` excluding elements dropped from the end.
	     * Elements are dropped until `predicate` returns falsey. The predicate is
	     * bound to `thisArg` and invoked with three arguments: (value, index, array).
	     *
	     * If a property name is provided for `predicate` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `predicate` the created `_.matches` style
	     * callback returns `true` for elements that match the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to query.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * _.dropRightWhile([1, 2, 3], function(n) {
	     *   return n > 1;
	     * });
	     * // => [1]
	     *
	     * var users = [
	     *   { 'user': 'barney',  'active': true },
	     *   { 'user': 'fred',    'active': false },
	     *   { 'user': 'pebbles', 'active': false }
	     * ];
	     *
	     * // using the `_.matches` callback shorthand
	     * _.pluck(_.dropRightWhile(users, { 'user': 'pebbles', 'active': false }), 'user');
	     * // => ['barney', 'fred']
	     *
	     * // using the `_.matchesProperty` callback shorthand
	     * _.pluck(_.dropRightWhile(users, 'active', false), 'user');
	     * // => ['barney']
	     *
	     * // using the `_.property` callback shorthand
	     * _.pluck(_.dropRightWhile(users, 'active'), 'user');
	     * // => ['barney', 'fred', 'pebbles']
	     */
	    function dropRightWhile(array, predicate, thisArg) {
	      return (array && array.length)
	        ? baseWhile(array, getCallback(predicate, thisArg, 3), true, true)
	        : [];
	    }

	    /**
	     * Creates a slice of `array` excluding elements dropped from the beginning.
	     * Elements are dropped until `predicate` returns falsey. The predicate is
	     * bound to `thisArg` and invoked with three arguments: (value, index, array).
	     *
	     * If a property name is provided for `predicate` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `predicate` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to query.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * _.dropWhile([1, 2, 3], function(n) {
	     *   return n < 3;
	     * });
	     * // => [3]
	     *
	     * var users = [
	     *   { 'user': 'barney',  'active': false },
	     *   { 'user': 'fred',    'active': false },
	     *   { 'user': 'pebbles', 'active': true }
	     * ];
	     *
	     * // using the `_.matches` callback shorthand
	     * _.pluck(_.dropWhile(users, { 'user': 'barney', 'active': false }), 'user');
	     * // => ['fred', 'pebbles']
	     *
	     * // using the `_.matchesProperty` callback shorthand
	     * _.pluck(_.dropWhile(users, 'active', false), 'user');
	     * // => ['pebbles']
	     *
	     * // using the `_.property` callback shorthand
	     * _.pluck(_.dropWhile(users, 'active'), 'user');
	     * // => ['barney', 'fred', 'pebbles']
	     */
	    function dropWhile(array, predicate, thisArg) {
	      return (array && array.length)
	        ? baseWhile(array, getCallback(predicate, thisArg, 3), true)
	        : [];
	    }

	    /**
	     * Fills elements of `array` with `value` from `start` up to, but not
	     * including, `end`.
	     *
	     * **Note:** This method mutates `array`.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to fill.
	     * @param {*} value The value to fill `array` with.
	     * @param {number} [start=0] The start position.
	     * @param {number} [end=array.length] The end position.
	     * @returns {Array} Returns `array`.
	     * @example
	     *
	     * var array = [1, 2, 3];
	     *
	     * _.fill(array, 'a');
	     * console.log(array);
	     * // => ['a', 'a', 'a']
	     *
	     * _.fill(Array(3), 2);
	     * // => [2, 2, 2]
	     *
	     * _.fill([4, 6, 8], '*', 1, 2);
	     * // => [4, '*', 8]
	     */
	    function fill(array, value, start, end) {
	      var length = array ? array.length : 0;
	      if (!length) {
	        return [];
	      }
	      if (start && typeof start != 'number' && isIterateeCall(array, value, start)) {
	        start = 0;
	        end = length;
	      }
	      return baseFill(array, value, start, end);
	    }

	    /**
	     * This method is like `_.find` except that it returns the index of the first
	     * element `predicate` returns truthy for instead of the element itself.
	     *
	     * If a property name is provided for `predicate` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `predicate` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to search.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {number} Returns the index of the found element, else `-1`.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney',  'active': false },
	     *   { 'user': 'fred',    'active': false },
	     *   { 'user': 'pebbles', 'active': true }
	     * ];
	     *
	     * _.findIndex(users, function(chr) {
	     *   return chr.user == 'barney';
	     * });
	     * // => 0
	     *
	     * // using the `_.matches` callback shorthand
	     * _.findIndex(users, { 'user': 'fred', 'active': false });
	     * // => 1
	     *
	     * // using the `_.matchesProperty` callback shorthand
	     * _.findIndex(users, 'active', false);
	     * // => 0
	     *
	     * // using the `_.property` callback shorthand
	     * _.findIndex(users, 'active');
	     * // => 2
	     */
	    var findIndex = createFindIndex();

	    /**
	     * This method is like `_.findIndex` except that it iterates over elements
	     * of `collection` from right to left.
	     *
	     * If a property name is provided for `predicate` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `predicate` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to search.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {number} Returns the index of the found element, else `-1`.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney',  'active': true },
	     *   { 'user': 'fred',    'active': false },
	     *   { 'user': 'pebbles', 'active': false }
	     * ];
	     *
	     * _.findLastIndex(users, function(chr) {
	     *   return chr.user == 'pebbles';
	     * });
	     * // => 2
	     *
	     * // using the `_.matches` callback shorthand
	     * _.findLastIndex(users, { 'user': 'barney', 'active': true });
	     * // => 0
	     *
	     * // using the `_.matchesProperty` callback shorthand
	     * _.findLastIndex(users, 'active', false);
	     * // => 2
	     *
	     * // using the `_.property` callback shorthand
	     * _.findLastIndex(users, 'active');
	     * // => 0
	     */
	    var findLastIndex = createFindIndex(true);

	    /**
	     * Gets the first element of `array`.
	     *
	     * @static
	     * @memberOf _
	     * @alias head
	     * @category Array
	     * @param {Array} array The array to query.
	     * @returns {*} Returns the first element of `array`.
	     * @example
	     *
	     * _.first([1, 2, 3]);
	     * // => 1
	     *
	     * _.first([]);
	     * // => undefined
	     */
	    function first(array) {
	      return array ? array[0] : undefined;
	    }

	    /**
	     * Flattens a nested array. If `isDeep` is `true` the array is recursively
	     * flattened, otherwise it is only flattened a single level.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to flatten.
	     * @param {boolean} [isDeep] Specify a deep flatten.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {Array} Returns the new flattened array.
	     * @example
	     *
	     * _.flatten([1, [2, 3, [4]]]);
	     * // => [1, 2, 3, [4]]
	     *
	     * // using `isDeep`
	     * _.flatten([1, [2, 3, [4]]], true);
	     * // => [1, 2, 3, 4]
	     */
	    function flatten(array, isDeep, guard) {
	      var length = array ? array.length : 0;
	      if (guard && isIterateeCall(array, isDeep, guard)) {
	        isDeep = false;
	      }
	      return length ? baseFlatten(array, isDeep) : [];
	    }

	    /**
	     * Recursively flattens a nested array.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to recursively flatten.
	     * @returns {Array} Returns the new flattened array.
	     * @example
	     *
	     * _.flattenDeep([1, [2, 3, [4]]]);
	     * // => [1, 2, 3, 4]
	     */
	    function flattenDeep(array) {
	      var length = array ? array.length : 0;
	      return length ? baseFlatten(array, true) : [];
	    }

	    /**
	     * Gets the index at which the first occurrence of `value` is found in `array`
	     * using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	     * for equality comparisons. If `fromIndex` is negative, it is used as the offset
	     * from the end of `array`. If `array` is sorted providing `true` for `fromIndex`
	     * performs a faster binary search.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to search.
	     * @param {*} value The value to search for.
	     * @param {boolean|number} [fromIndex=0] The index to search from or `true`
	     *  to perform a binary search on a sorted array.
	     * @returns {number} Returns the index of the matched value, else `-1`.
	     * @example
	     *
	     * _.indexOf([1, 2, 1, 2], 2);
	     * // => 1
	     *
	     * // using `fromIndex`
	     * _.indexOf([1, 2, 1, 2], 2, 2);
	     * // => 3
	     *
	     * // performing a binary search
	     * _.indexOf([1, 1, 2, 2], 2, true);
	     * // => 2
	     */
	    function indexOf(array, value, fromIndex) {
	      var length = array ? array.length : 0;
	      if (!length) {
	        return -1;
	      }
	      if (typeof fromIndex == 'number') {
	        fromIndex = fromIndex < 0 ? nativeMax(length + fromIndex, 0) : fromIndex;
	      } else if (fromIndex) {
	        var index = binaryIndex(array, value);
	        if (index < length &&
	            (value === value ? (value === array[index]) : (array[index] !== array[index]))) {
	          return index;
	        }
	        return -1;
	      }
	      return baseIndexOf(array, value, fromIndex || 0);
	    }

	    /**
	     * Gets all but the last element of `array`.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to query.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * _.initial([1, 2, 3]);
	     * // => [1, 2]
	     */
	    function initial(array) {
	      return dropRight(array, 1);
	    }

	    /**
	     * Creates an array of unique values that are included in all of the provided
	     * arrays using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	     * for equality comparisons.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {...Array} [arrays] The arrays to inspect.
	     * @returns {Array} Returns the new array of shared values.
	     * @example
	     * _.intersection([1, 2], [4, 2], [2, 1]);
	     * // => [2]
	     */
	    var intersection = restParam(function(arrays) {
	      var othLength = arrays.length,
	          othIndex = othLength,
	          caches = Array(length),
	          indexOf = getIndexOf(),
	          isCommon = indexOf == baseIndexOf,
	          result = [];

	      while (othIndex--) {
	        var value = arrays[othIndex] = isArrayLike(value = arrays[othIndex]) ? value : [];
	        caches[othIndex] = (isCommon && value.length >= 120) ? createCache(othIndex && value) : null;
	      }
	      var array = arrays[0],
	          index = -1,
	          length = array ? array.length : 0,
	          seen = caches[0];

	      outer:
	      while (++index < length) {
	        value = array[index];
	        if ((seen ? cacheIndexOf(seen, value) : indexOf(result, value, 0)) < 0) {
	          var othIndex = othLength;
	          while (--othIndex) {
	            var cache = caches[othIndex];
	            if ((cache ? cacheIndexOf(cache, value) : indexOf(arrays[othIndex], value, 0)) < 0) {
	              continue outer;
	            }
	          }
	          if (seen) {
	            seen.push(value);
	          }
	          result.push(value);
	        }
	      }
	      return result;
	    });

	    /**
	     * Gets the last element of `array`.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to query.
	     * @returns {*} Returns the last element of `array`.
	     * @example
	     *
	     * _.last([1, 2, 3]);
	     * // => 3
	     */
	    function last(array) {
	      var length = array ? array.length : 0;
	      return length ? array[length - 1] : undefined;
	    }

	    /**
	     * This method is like `_.indexOf` except that it iterates over elements of
	     * `array` from right to left.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to search.
	     * @param {*} value The value to search for.
	     * @param {boolean|number} [fromIndex=array.length-1] The index to search from
	     *  or `true` to perform a binary search on a sorted array.
	     * @returns {number} Returns the index of the matched value, else `-1`.
	     * @example
	     *
	     * _.lastIndexOf([1, 2, 1, 2], 2);
	     * // => 3
	     *
	     * // using `fromIndex`
	     * _.lastIndexOf([1, 2, 1, 2], 2, 2);
	     * // => 1
	     *
	     * // performing a binary search
	     * _.lastIndexOf([1, 1, 2, 2], 2, true);
	     * // => 3
	     */
	    function lastIndexOf(array, value, fromIndex) {
	      var length = array ? array.length : 0;
	      if (!length) {
	        return -1;
	      }
	      var index = length;
	      if (typeof fromIndex == 'number') {
	        index = (fromIndex < 0 ? nativeMax(length + fromIndex, 0) : nativeMin(fromIndex || 0, length - 1)) + 1;
	      } else if (fromIndex) {
	        index = binaryIndex(array, value, true) - 1;
	        var other = array[index];
	        if (value === value ? (value === other) : (other !== other)) {
	          return index;
	        }
	        return -1;
	      }
	      if (value !== value) {
	        return indexOfNaN(array, index, true);
	      }
	      while (index--) {
	        if (array[index] === value) {
	          return index;
	        }
	      }
	      return -1;
	    }

	    /**
	     * Removes all provided values from `array` using
	     * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	     * for equality comparisons.
	     *
	     * **Note:** Unlike `_.without`, this method mutates `array`.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to modify.
	     * @param {...*} [values] The values to remove.
	     * @returns {Array} Returns `array`.
	     * @example
	     *
	     * var array = [1, 2, 3, 1, 2, 3];
	     *
	     * _.pull(array, 2, 3);
	     * console.log(array);
	     * // => [1, 1]
	     */
	    function pull() {
	      var args = arguments,
	          array = args[0];

	      if (!(array && array.length)) {
	        return array;
	      }
	      var index = 0,
	          indexOf = getIndexOf(),
	          length = args.length;

	      while (++index < length) {
	        var fromIndex = 0,
	            value = args[index];

	        while ((fromIndex = indexOf(array, value, fromIndex)) > -1) {
	          splice.call(array, fromIndex, 1);
	        }
	      }
	      return array;
	    }

	    /**
	     * Removes elements from `array` corresponding to the given indexes and returns
	     * an array of the removed elements. Indexes may be specified as an array of
	     * indexes or as individual arguments.
	     *
	     * **Note:** Unlike `_.at`, this method mutates `array`.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to modify.
	     * @param {...(number|number[])} [indexes] The indexes of elements to remove,
	     *  specified as individual indexes or arrays of indexes.
	     * @returns {Array} Returns the new array of removed elements.
	     * @example
	     *
	     * var array = [5, 10, 15, 20];
	     * var evens = _.pullAt(array, 1, 3);
	     *
	     * console.log(array);
	     * // => [5, 15]
	     *
	     * console.log(evens);
	     * // => [10, 20]
	     */
	    var pullAt = restParam(function(array, indexes) {
	      indexes = baseFlatten(indexes);

	      var result = baseAt(array, indexes);
	      basePullAt(array, indexes.sort(baseCompareAscending));
	      return result;
	    });

	    /**
	     * Removes all elements from `array` that `predicate` returns truthy for
	     * and returns an array of the removed elements. The predicate is bound to
	     * `thisArg` and invoked with three arguments: (value, index, array).
	     *
	     * If a property name is provided for `predicate` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `predicate` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * **Note:** Unlike `_.filter`, this method mutates `array`.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to modify.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {Array} Returns the new array of removed elements.
	     * @example
	     *
	     * var array = [1, 2, 3, 4];
	     * var evens = _.remove(array, function(n) {
	     *   return n % 2 == 0;
	     * });
	     *
	     * console.log(array);
	     * // => [1, 3]
	     *
	     * console.log(evens);
	     * // => [2, 4]
	     */
	    function remove(array, predicate, thisArg) {
	      var result = [];
	      if (!(array && array.length)) {
	        return result;
	      }
	      var index = -1,
	          indexes = [],
	          length = array.length;

	      predicate = getCallback(predicate, thisArg, 3);
	      while (++index < length) {
	        var value = array[index];
	        if (predicate(value, index, array)) {
	          result.push(value);
	          indexes.push(index);
	        }
	      }
	      basePullAt(array, indexes);
	      return result;
	    }

	    /**
	     * Gets all but the first element of `array`.
	     *
	     * @static
	     * @memberOf _
	     * @alias tail
	     * @category Array
	     * @param {Array} array The array to query.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * _.rest([1, 2, 3]);
	     * // => [2, 3]
	     */
	    function rest(array) {
	      return drop(array, 1);
	    }

	    /**
	     * Creates a slice of `array` from `start` up to, but not including, `end`.
	     *
	     * **Note:** This method is used instead of `Array#slice` to support node
	     * lists in IE < 9 and to ensure dense arrays are returned.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to slice.
	     * @param {number} [start=0] The start position.
	     * @param {number} [end=array.length] The end position.
	     * @returns {Array} Returns the slice of `array`.
	     */
	    function slice(array, start, end) {
	      var length = array ? array.length : 0;
	      if (!length) {
	        return [];
	      }
	      if (end && typeof end != 'number' && isIterateeCall(array, start, end)) {
	        start = 0;
	        end = length;
	      }
	      return baseSlice(array, start, end);
	    }

	    /**
	     * Uses a binary search to determine the lowest index at which `value` should
	     * be inserted into `array` in order to maintain its sort order. If an iteratee
	     * function is provided it is invoked for `value` and each element of `array`
	     * to compute their sort ranking. The iteratee is bound to `thisArg` and
	     * invoked with one argument; (value).
	     *
	     * If a property name is provided for `iteratee` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `iteratee` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The sorted array to inspect.
	     * @param {*} value The value to evaluate.
	     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {number} Returns the index at which `value` should be inserted
	     *  into `array`.
	     * @example
	     *
	     * _.sortedIndex([30, 50], 40);
	     * // => 1
	     *
	     * _.sortedIndex([4, 4, 5, 5], 5);
	     * // => 2
	     *
	     * var dict = { 'data': { 'thirty': 30, 'forty': 40, 'fifty': 50 } };
	     *
	     * // using an iteratee function
	     * _.sortedIndex(['thirty', 'fifty'], 'forty', function(word) {
	     *   return this.data[word];
	     * }, dict);
	     * // => 1
	     *
	     * // using the `_.property` callback shorthand
	     * _.sortedIndex([{ 'x': 30 }, { 'x': 50 }], { 'x': 40 }, 'x');
	     * // => 1
	     */
	    var sortedIndex = createSortedIndex();

	    /**
	     * This method is like `_.sortedIndex` except that it returns the highest
	     * index at which `value` should be inserted into `array` in order to
	     * maintain its sort order.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The sorted array to inspect.
	     * @param {*} value The value to evaluate.
	     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {number} Returns the index at which `value` should be inserted
	     *  into `array`.
	     * @example
	     *
	     * _.sortedLastIndex([4, 4, 5, 5], 5);
	     * // => 4
	     */
	    var sortedLastIndex = createSortedIndex(true);

	    /**
	     * Creates a slice of `array` with `n` elements taken from the beginning.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to query.
	     * @param {number} [n=1] The number of elements to take.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * _.take([1, 2, 3]);
	     * // => [1]
	     *
	     * _.take([1, 2, 3], 2);
	     * // => [1, 2]
	     *
	     * _.take([1, 2, 3], 5);
	     * // => [1, 2, 3]
	     *
	     * _.take([1, 2, 3], 0);
	     * // => []
	     */
	    function take(array, n, guard) {
	      var length = array ? array.length : 0;
	      if (!length) {
	        return [];
	      }
	      if (guard ? isIterateeCall(array, n, guard) : n == null) {
	        n = 1;
	      }
	      return baseSlice(array, 0, n < 0 ? 0 : n);
	    }

	    /**
	     * Creates a slice of `array` with `n` elements taken from the end.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to query.
	     * @param {number} [n=1] The number of elements to take.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * _.takeRight([1, 2, 3]);
	     * // => [3]
	     *
	     * _.takeRight([1, 2, 3], 2);
	     * // => [2, 3]
	     *
	     * _.takeRight([1, 2, 3], 5);
	     * // => [1, 2, 3]
	     *
	     * _.takeRight([1, 2, 3], 0);
	     * // => []
	     */
	    function takeRight(array, n, guard) {
	      var length = array ? array.length : 0;
	      if (!length) {
	        return [];
	      }
	      if (guard ? isIterateeCall(array, n, guard) : n == null) {
	        n = 1;
	      }
	      n = length - (+n || 0);
	      return baseSlice(array, n < 0 ? 0 : n);
	    }

	    /**
	     * Creates a slice of `array` with elements taken from the end. Elements are
	     * taken until `predicate` returns falsey. The predicate is bound to `thisArg`
	     * and invoked with three arguments: (value, index, array).
	     *
	     * If a property name is provided for `predicate` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `predicate` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to query.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * _.takeRightWhile([1, 2, 3], function(n) {
	     *   return n > 1;
	     * });
	     * // => [2, 3]
	     *
	     * var users = [
	     *   { 'user': 'barney',  'active': true },
	     *   { 'user': 'fred',    'active': false },
	     *   { 'user': 'pebbles', 'active': false }
	     * ];
	     *
	     * // using the `_.matches` callback shorthand
	     * _.pluck(_.takeRightWhile(users, { 'user': 'pebbles', 'active': false }), 'user');
	     * // => ['pebbles']
	     *
	     * // using the `_.matchesProperty` callback shorthand
	     * _.pluck(_.takeRightWhile(users, 'active', false), 'user');
	     * // => ['fred', 'pebbles']
	     *
	     * // using the `_.property` callback shorthand
	     * _.pluck(_.takeRightWhile(users, 'active'), 'user');
	     * // => []
	     */
	    function takeRightWhile(array, predicate, thisArg) {
	      return (array && array.length)
	        ? baseWhile(array, getCallback(predicate, thisArg, 3), false, true)
	        : [];
	    }

	    /**
	     * Creates a slice of `array` with elements taken from the beginning. Elements
	     * are taken until `predicate` returns falsey. The predicate is bound to
	     * `thisArg` and invoked with three arguments: (value, index, array).
	     *
	     * If a property name is provided for `predicate` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `predicate` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to query.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {Array} Returns the slice of `array`.
	     * @example
	     *
	     * _.takeWhile([1, 2, 3], function(n) {
	     *   return n < 3;
	     * });
	     * // => [1, 2]
	     *
	     * var users = [
	     *   { 'user': 'barney',  'active': false },
	     *   { 'user': 'fred',    'active': false},
	     *   { 'user': 'pebbles', 'active': true }
	     * ];
	     *
	     * // using the `_.matches` callback shorthand
	     * _.pluck(_.takeWhile(users, { 'user': 'barney', 'active': false }), 'user');
	     * // => ['barney']
	     *
	     * // using the `_.matchesProperty` callback shorthand
	     * _.pluck(_.takeWhile(users, 'active', false), 'user');
	     * // => ['barney', 'fred']
	     *
	     * // using the `_.property` callback shorthand
	     * _.pluck(_.takeWhile(users, 'active'), 'user');
	     * // => []
	     */
	    function takeWhile(array, predicate, thisArg) {
	      return (array && array.length)
	        ? baseWhile(array, getCallback(predicate, thisArg, 3))
	        : [];
	    }

	    /**
	     * Creates an array of unique values, in order, from all of the provided arrays
	     * using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	     * for equality comparisons.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {...Array} [arrays] The arrays to inspect.
	     * @returns {Array} Returns the new array of combined values.
	     * @example
	     *
	     * _.union([1, 2], [4, 2], [2, 1]);
	     * // => [1, 2, 4]
	     */
	    var union = restParam(function(arrays) {
	      return baseUniq(baseFlatten(arrays, false, true));
	    });

	    /**
	     * Creates a duplicate-free version of an array, using
	     * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	     * for equality comparisons, in which only the first occurence of each element
	     * is kept. Providing `true` for `isSorted` performs a faster search algorithm
	     * for sorted arrays. If an iteratee function is provided it is invoked for
	     * each element in the array to generate the criterion by which uniqueness
	     * is computed. The `iteratee` is bound to `thisArg` and invoked with three
	     * arguments: (value, index, array).
	     *
	     * If a property name is provided for `iteratee` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `iteratee` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @alias unique
	     * @category Array
	     * @param {Array} array The array to inspect.
	     * @param {boolean} [isSorted] Specify the array is sorted.
	     * @param {Function|Object|string} [iteratee] The function invoked per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Array} Returns the new duplicate-value-free array.
	     * @example
	     *
	     * _.uniq([2, 1, 2]);
	     * // => [2, 1]
	     *
	     * // using `isSorted`
	     * _.uniq([1, 1, 2], true);
	     * // => [1, 2]
	     *
	     * // using an iteratee function
	     * _.uniq([1, 2.5, 1.5, 2], function(n) {
	     *   return this.floor(n);
	     * }, Math);
	     * // => [1, 2.5]
	     *
	     * // using the `_.property` callback shorthand
	     * _.uniq([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
	     * // => [{ 'x': 1 }, { 'x': 2 }]
	     */
	    function uniq(array, isSorted, iteratee, thisArg) {
	      var length = array ? array.length : 0;
	      if (!length) {
	        return [];
	      }
	      if (isSorted != null && typeof isSorted != 'boolean') {
	        thisArg = iteratee;
	        iteratee = isIterateeCall(array, isSorted, thisArg) ? undefined : isSorted;
	        isSorted = false;
	      }
	      var callback = getCallback();
	      if (!(iteratee == null && callback === baseCallback)) {
	        iteratee = callback(iteratee, thisArg, 3);
	      }
	      return (isSorted && getIndexOf() == baseIndexOf)
	        ? sortedUniq(array, iteratee)
	        : baseUniq(array, iteratee);
	    }

	    /**
	     * This method is like `_.zip` except that it accepts an array of grouped
	     * elements and creates an array regrouping the elements to their pre-zip
	     * configuration.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array of grouped elements to process.
	     * @returns {Array} Returns the new array of regrouped elements.
	     * @example
	     *
	     * var zipped = _.zip(['fred', 'barney'], [30, 40], [true, false]);
	     * // => [['fred', 30, true], ['barney', 40, false]]
	     *
	     * _.unzip(zipped);
	     * // => [['fred', 'barney'], [30, 40], [true, false]]
	     */
	    function unzip(array) {
	      if (!(array && array.length)) {
	        return [];
	      }
	      var index = -1,
	          length = 0;

	      array = arrayFilter(array, function(group) {
	        if (isArrayLike(group)) {
	          length = nativeMax(group.length, length);
	          return true;
	        }
	      });
	      var result = Array(length);
	      while (++index < length) {
	        result[index] = arrayMap(array, baseProperty(index));
	      }
	      return result;
	    }

	    /**
	     * This method is like `_.unzip` except that it accepts an iteratee to specify
	     * how regrouped values should be combined. The `iteratee` is bound to `thisArg`
	     * and invoked with four arguments: (accumulator, value, index, group).
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array of grouped elements to process.
	     * @param {Function} [iteratee] The function to combine regrouped values.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Array} Returns the new array of regrouped elements.
	     * @example
	     *
	     * var zipped = _.zip([1, 2], [10, 20], [100, 200]);
	     * // => [[1, 10, 100], [2, 20, 200]]
	     *
	     * _.unzipWith(zipped, _.add);
	     * // => [3, 30, 300]
	     */
	    function unzipWith(array, iteratee, thisArg) {
	      var length = array ? array.length : 0;
	      if (!length) {
	        return [];
	      }
	      var result = unzip(array);
	      if (iteratee == null) {
	        return result;
	      }
	      iteratee = bindCallback(iteratee, thisArg, 4);
	      return arrayMap(result, function(group) {
	        return arrayReduce(group, iteratee, undefined, true);
	      });
	    }

	    /**
	     * Creates an array excluding all provided values using
	     * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	     * for equality comparisons.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {Array} array The array to filter.
	     * @param {...*} [values] The values to exclude.
	     * @returns {Array} Returns the new array of filtered values.
	     * @example
	     *
	     * _.without([1, 2, 1, 3], 1, 2);
	     * // => [3]
	     */
	    var without = restParam(function(array, values) {
	      return isArrayLike(array)
	        ? baseDifference(array, values)
	        : [];
	    });

	    /**
	     * Creates an array of unique values that is the [symmetric difference](https://en.wikipedia.org/wiki/Symmetric_difference)
	     * of the provided arrays.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {...Array} [arrays] The arrays to inspect.
	     * @returns {Array} Returns the new array of values.
	     * @example
	     *
	     * _.xor([1, 2], [4, 2]);
	     * // => [1, 4]
	     */
	    function xor() {
	      var index = -1,
	          length = arguments.length;

	      while (++index < length) {
	        var array = arguments[index];
	        if (isArrayLike(array)) {
	          var result = result
	            ? arrayPush(baseDifference(result, array), baseDifference(array, result))
	            : array;
	        }
	      }
	      return result ? baseUniq(result) : [];
	    }

	    /**
	     * Creates an array of grouped elements, the first of which contains the first
	     * elements of the given arrays, the second of which contains the second elements
	     * of the given arrays, and so on.
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {...Array} [arrays] The arrays to process.
	     * @returns {Array} Returns the new array of grouped elements.
	     * @example
	     *
	     * _.zip(['fred', 'barney'], [30, 40], [true, false]);
	     * // => [['fred', 30, true], ['barney', 40, false]]
	     */
	    var zip = restParam(unzip);

	    /**
	     * The inverse of `_.pairs`; this method returns an object composed from arrays
	     * of property names and values. Provide either a single two dimensional array,
	     * e.g. `[[key1, value1], [key2, value2]]` or two arrays, one of property names
	     * and one of corresponding values.
	     *
	     * @static
	     * @memberOf _
	     * @alias object
	     * @category Array
	     * @param {Array} props The property names.
	     * @param {Array} [values=[]] The property values.
	     * @returns {Object} Returns the new object.
	     * @example
	     *
	     * _.zipObject([['fred', 30], ['barney', 40]]);
	     * // => { 'fred': 30, 'barney': 40 }
	     *
	     * _.zipObject(['fred', 'barney'], [30, 40]);
	     * // => { 'fred': 30, 'barney': 40 }
	     */
	    function zipObject(props, values) {
	      var index = -1,
	          length = props ? props.length : 0,
	          result = {};

	      if (length && !values && !isArray(props[0])) {
	        values = [];
	      }
	      while (++index < length) {
	        var key = props[index];
	        if (values) {
	          result[key] = values[index];
	        } else if (key) {
	          result[key[0]] = key[1];
	        }
	      }
	      return result;
	    }

	    /**
	     * This method is like `_.zip` except that it accepts an iteratee to specify
	     * how grouped values should be combined. The `iteratee` is bound to `thisArg`
	     * and invoked with four arguments: (accumulator, value, index, group).
	     *
	     * @static
	     * @memberOf _
	     * @category Array
	     * @param {...Array} [arrays] The arrays to process.
	     * @param {Function} [iteratee] The function to combine grouped values.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Array} Returns the new array of grouped elements.
	     * @example
	     *
	     * _.zipWith([1, 2], [10, 20], [100, 200], _.add);
	     * // => [111, 222]
	     */
	    var zipWith = restParam(function(arrays) {
	      var length = arrays.length,
	          iteratee = length > 2 ? arrays[length - 2] : undefined,
	          thisArg = length > 1 ? arrays[length - 1] : undefined;

	      if (length > 2 && typeof iteratee == 'function') {
	        length -= 2;
	      } else {
	        iteratee = (length > 1 && typeof thisArg == 'function') ? (--length, thisArg) : undefined;
	        thisArg = undefined;
	      }
	      arrays.length = length;
	      return unzipWith(arrays, iteratee, thisArg);
	    });

	    /*------------------------------------------------------------------------*/

	    /**
	     * Creates a `lodash` object that wraps `value` with explicit method
	     * chaining enabled.
	     *
	     * @static
	     * @memberOf _
	     * @category Chain
	     * @param {*} value The value to wrap.
	     * @returns {Object} Returns the new `lodash` wrapper instance.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney',  'age': 36 },
	     *   { 'user': 'fred',    'age': 40 },
	     *   { 'user': 'pebbles', 'age': 1 }
	     * ];
	     *
	     * var youngest = _.chain(users)
	     *   .sortBy('age')
	     *   .map(function(chr) {
	     *     return chr.user + ' is ' + chr.age;
	     *   })
	     *   .first()
	     *   .value();
	     * // => 'pebbles is 1'
	     */
	    function chain(value) {
	      var result = lodash(value);
	      result.__chain__ = true;
	      return result;
	    }

	    /**
	     * This method invokes `interceptor` and returns `value`. The interceptor is
	     * bound to `thisArg` and invoked with one argument; (value). The purpose of
	     * this method is to "tap into" a method chain in order to perform operations
	     * on intermediate results within the chain.
	     *
	     * @static
	     * @memberOf _
	     * @category Chain
	     * @param {*} value The value to provide to `interceptor`.
	     * @param {Function} interceptor The function to invoke.
	     * @param {*} [thisArg] The `this` binding of `interceptor`.
	     * @returns {*} Returns `value`.
	     * @example
	     *
	     * _([1, 2, 3])
	     *  .tap(function(array) {
	     *    array.pop();
	     *  })
	     *  .reverse()
	     *  .value();
	     * // => [2, 1]
	     */
	    function tap(value, interceptor, thisArg) {
	      interceptor.call(thisArg, value);
	      return value;
	    }

	    /**
	     * This method is like `_.tap` except that it returns the result of `interceptor`.
	     *
	     * @static
	     * @memberOf _
	     * @category Chain
	     * @param {*} value The value to provide to `interceptor`.
	     * @param {Function} interceptor The function to invoke.
	     * @param {*} [thisArg] The `this` binding of `interceptor`.
	     * @returns {*} Returns the result of `interceptor`.
	     * @example
	     *
	     * _('  abc  ')
	     *  .chain()
	     *  .trim()
	     *  .thru(function(value) {
	     *    return [value];
	     *  })
	     *  .value();
	     * // => ['abc']
	     */
	    function thru(value, interceptor, thisArg) {
	      return interceptor.call(thisArg, value);
	    }

	    /**
	     * Enables explicit method chaining on the wrapper object.
	     *
	     * @name chain
	     * @memberOf _
	     * @category Chain
	     * @returns {Object} Returns the new `lodash` wrapper instance.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney', 'age': 36 },
	     *   { 'user': 'fred',   'age': 40 }
	     * ];
	     *
	     * // without explicit chaining
	     * _(users).first();
	     * // => { 'user': 'barney', 'age': 36 }
	     *
	     * // with explicit chaining
	     * _(users).chain()
	     *   .first()
	     *   .pick('user')
	     *   .value();
	     * // => { 'user': 'barney' }
	     */
	    function wrapperChain() {
	      return chain(this);
	    }

	    /**
	     * Executes the chained sequence and returns the wrapped result.
	     *
	     * @name commit
	     * @memberOf _
	     * @category Chain
	     * @returns {Object} Returns the new `lodash` wrapper instance.
	     * @example
	     *
	     * var array = [1, 2];
	     * var wrapped = _(array).push(3);
	     *
	     * console.log(array);
	     * // => [1, 2]
	     *
	     * wrapped = wrapped.commit();
	     * console.log(array);
	     * // => [1, 2, 3]
	     *
	     * wrapped.last();
	     * // => 3
	     *
	     * console.log(array);
	     * // => [1, 2, 3]
	     */
	    function wrapperCommit() {
	      return new LodashWrapper(this.value(), this.__chain__);
	    }

	    /**
	     * Creates a new array joining a wrapped array with any additional arrays
	     * and/or values.
	     *
	     * @name concat
	     * @memberOf _
	     * @category Chain
	     * @param {...*} [values] The values to concatenate.
	     * @returns {Array} Returns the new concatenated array.
	     * @example
	     *
	     * var array = [1];
	     * var wrapped = _(array).concat(2, [3], [[4]]);
	     *
	     * console.log(wrapped.value());
	     * // => [1, 2, 3, [4]]
	     *
	     * console.log(array);
	     * // => [1]
	     */
	    var wrapperConcat = restParam(function(values) {
	      values = baseFlatten(values);
	      return this.thru(function(array) {
	        return arrayConcat(isArray(array) ? array : [toObject(array)], values);
	      });
	    });

	    /**
	     * Creates a clone of the chained sequence planting `value` as the wrapped value.
	     *
	     * @name plant
	     * @memberOf _
	     * @category Chain
	     * @returns {Object} Returns the new `lodash` wrapper instance.
	     * @example
	     *
	     * var array = [1, 2];
	     * var wrapped = _(array).map(function(value) {
	     *   return Math.pow(value, 2);
	     * });
	     *
	     * var other = [3, 4];
	     * var otherWrapped = wrapped.plant(other);
	     *
	     * otherWrapped.value();
	     * // => [9, 16]
	     *
	     * wrapped.value();
	     * // => [1, 4]
	     */
	    function wrapperPlant(value) {
	      var result,
	          parent = this;

	      while (parent instanceof baseLodash) {
	        var clone = wrapperClone(parent);
	        if (result) {
	          previous.__wrapped__ = clone;
	        } else {
	          result = clone;
	        }
	        var previous = clone;
	        parent = parent.__wrapped__;
	      }
	      previous.__wrapped__ = value;
	      return result;
	    }

	    /**
	     * Reverses the wrapped array so the first element becomes the last, the
	     * second element becomes the second to last, and so on.
	     *
	     * **Note:** This method mutates the wrapped array.
	     *
	     * @name reverse
	     * @memberOf _
	     * @category Chain
	     * @returns {Object} Returns the new reversed `lodash` wrapper instance.
	     * @example
	     *
	     * var array = [1, 2, 3];
	     *
	     * _(array).reverse().value()
	     * // => [3, 2, 1]
	     *
	     * console.log(array);
	     * // => [3, 2, 1]
	     */
	    function wrapperReverse() {
	      var value = this.__wrapped__;

	      var interceptor = function(value) {
	        return (wrapped && wrapped.__dir__ < 0) ? value : value.reverse();
	      };
	      if (value instanceof LazyWrapper) {
	        var wrapped = value;
	        if (this.__actions__.length) {
	          wrapped = new LazyWrapper(this);
	        }
	        wrapped = wrapped.reverse();
	        wrapped.__actions__.push({ 'func': thru, 'args': [interceptor], 'thisArg': undefined });
	        return new LodashWrapper(wrapped, this.__chain__);
	      }
	      return this.thru(interceptor);
	    }

	    /**
	     * Produces the result of coercing the unwrapped value to a string.
	     *
	     * @name toString
	     * @memberOf _
	     * @category Chain
	     * @returns {string} Returns the coerced string value.
	     * @example
	     *
	     * _([1, 2, 3]).toString();
	     * // => '1,2,3'
	     */
	    function wrapperToString() {
	      return (this.value() + '');
	    }

	    /**
	     * Executes the chained sequence to extract the unwrapped value.
	     *
	     * @name value
	     * @memberOf _
	     * @alias run, toJSON, valueOf
	     * @category Chain
	     * @returns {*} Returns the resolved unwrapped value.
	     * @example
	     *
	     * _([1, 2, 3]).value();
	     * // => [1, 2, 3]
	     */
	    function wrapperValue() {
	      return baseWrapperValue(this.__wrapped__, this.__actions__);
	    }

	    /*------------------------------------------------------------------------*/

	    /**
	     * Creates an array of elements corresponding to the given keys, or indexes,
	     * of `collection`. Keys may be specified as individual arguments or as arrays
	     * of keys.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {...(number|number[]|string|string[])} [props] The property names
	     *  or indexes of elements to pick, specified individually or in arrays.
	     * @returns {Array} Returns the new array of picked elements.
	     * @example
	     *
	     * _.at(['a', 'b', 'c'], [0, 2]);
	     * // => ['a', 'c']
	     *
	     * _.at(['barney', 'fred', 'pebbles'], 0, 2);
	     * // => ['barney', 'pebbles']
	     */
	    var at = restParam(function(collection, props) {
	      return baseAt(collection, baseFlatten(props));
	    });

	    /**
	     * Creates an object composed of keys generated from the results of running
	     * each element of `collection` through `iteratee`. The corresponding value
	     * of each key is the number of times the key was returned by `iteratee`.
	     * The `iteratee` is bound to `thisArg` and invoked with three arguments:
	     * (value, index|key, collection).
	     *
	     * If a property name is provided for `iteratee` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `iteratee` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Object} Returns the composed aggregate object.
	     * @example
	     *
	     * _.countBy([4.3, 6.1, 6.4], function(n) {
	     *   return Math.floor(n);
	     * });
	     * // => { '4': 1, '6': 2 }
	     *
	     * _.countBy([4.3, 6.1, 6.4], function(n) {
	     *   return this.floor(n);
	     * }, Math);
	     * // => { '4': 1, '6': 2 }
	     *
	     * _.countBy(['one', 'two', 'three'], 'length');
	     * // => { '3': 2, '5': 1 }
	     */
	    var countBy = createAggregator(function(result, value, key) {
	      hasOwnProperty.call(result, key) ? ++result[key] : (result[key] = 1);
	    });

	    /**
	     * Checks if `predicate` returns truthy for **all** elements of `collection`.
	     * The predicate is bound to `thisArg` and invoked with three arguments:
	     * (value, index|key, collection).
	     *
	     * If a property name is provided for `predicate` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `predicate` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @alias all
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {boolean} Returns `true` if all elements pass the predicate check,
	     *  else `false`.
	     * @example
	     *
	     * _.every([true, 1, null, 'yes'], Boolean);
	     * // => false
	     *
	     * var users = [
	     *   { 'user': 'barney', 'active': false },
	     *   { 'user': 'fred',   'active': false }
	     * ];
	     *
	     * // using the `_.matches` callback shorthand
	     * _.every(users, { 'user': 'barney', 'active': false });
	     * // => false
	     *
	     * // using the `_.matchesProperty` callback shorthand
	     * _.every(users, 'active', false);
	     * // => true
	     *
	     * // using the `_.property` callback shorthand
	     * _.every(users, 'active');
	     * // => false
	     */
	    function every(collection, predicate, thisArg) {
	      var func = isArray(collection) ? arrayEvery : baseEvery;
	      if (thisArg && isIterateeCall(collection, predicate, thisArg)) {
	        predicate = undefined;
	      }
	      if (typeof predicate != 'function' || thisArg !== undefined) {
	        predicate = getCallback(predicate, thisArg, 3);
	      }
	      return func(collection, predicate);
	    }

	    /**
	     * Iterates over elements of `collection`, returning an array of all elements
	     * `predicate` returns truthy for. The predicate is bound to `thisArg` and
	     * invoked with three arguments: (value, index|key, collection).
	     *
	     * If a property name is provided for `predicate` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `predicate` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @alias select
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {Array} Returns the new filtered array.
	     * @example
	     *
	     * _.filter([4, 5, 6], function(n) {
	     *   return n % 2 == 0;
	     * });
	     * // => [4, 6]
	     *
	     * var users = [
	     *   { 'user': 'barney', 'age': 36, 'active': true },
	     *   { 'user': 'fred',   'age': 40, 'active': false }
	     * ];
	     *
	     * // using the `_.matches` callback shorthand
	     * _.pluck(_.filter(users, { 'age': 36, 'active': true }), 'user');
	     * // => ['barney']
	     *
	     * // using the `_.matchesProperty` callback shorthand
	     * _.pluck(_.filter(users, 'active', false), 'user');
	     * // => ['fred']
	     *
	     * // using the `_.property` callback shorthand
	     * _.pluck(_.filter(users, 'active'), 'user');
	     * // => ['barney']
	     */
	    function filter(collection, predicate, thisArg) {
	      var func = isArray(collection) ? arrayFilter : baseFilter;
	      predicate = getCallback(predicate, thisArg, 3);
	      return func(collection, predicate);
	    }

	    /**
	     * Iterates over elements of `collection`, returning the first element
	     * `predicate` returns truthy for. The predicate is bound to `thisArg` and
	     * invoked with three arguments: (value, index|key, collection).
	     *
	     * If a property name is provided for `predicate` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `predicate` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @alias detect
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to search.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {*} Returns the matched element, else `undefined`.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney',  'age': 36, 'active': true },
	     *   { 'user': 'fred',    'age': 40, 'active': false },
	     *   { 'user': 'pebbles', 'age': 1,  'active': true }
	     * ];
	     *
	     * _.result(_.find(users, function(chr) {
	     *   return chr.age < 40;
	     * }), 'user');
	     * // => 'barney'
	     *
	     * // using the `_.matches` callback shorthand
	     * _.result(_.find(users, { 'age': 1, 'active': true }), 'user');
	     * // => 'pebbles'
	     *
	     * // using the `_.matchesProperty` callback shorthand
	     * _.result(_.find(users, 'active', false), 'user');
	     * // => 'fred'
	     *
	     * // using the `_.property` callback shorthand
	     * _.result(_.find(users, 'active'), 'user');
	     * // => 'barney'
	     */
	    var find = createFind(baseEach);

	    /**
	     * This method is like `_.find` except that it iterates over elements of
	     * `collection` from right to left.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to search.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {*} Returns the matched element, else `undefined`.
	     * @example
	     *
	     * _.findLast([1, 2, 3, 4], function(n) {
	     *   return n % 2 == 1;
	     * });
	     * // => 3
	     */
	    var findLast = createFind(baseEachRight, true);

	    /**
	     * Performs a deep comparison between each element in `collection` and the
	     * source object, returning the first element that has equivalent property
	     * values.
	     *
	     * **Note:** This method supports comparing arrays, booleans, `Date` objects,
	     * numbers, `Object` objects, regexes, and strings. Objects are compared by
	     * their own, not inherited, enumerable properties. For comparing a single
	     * own or inherited property value see `_.matchesProperty`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to search.
	     * @param {Object} source The object of property values to match.
	     * @returns {*} Returns the matched element, else `undefined`.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney', 'age': 36, 'active': true },
	     *   { 'user': 'fred',   'age': 40, 'active': false }
	     * ];
	     *
	     * _.result(_.findWhere(users, { 'age': 36, 'active': true }), 'user');
	     * // => 'barney'
	     *
	     * _.result(_.findWhere(users, { 'age': 40, 'active': false }), 'user');
	     * // => 'fred'
	     */
	    function findWhere(collection, source) {
	      return find(collection, baseMatches(source));
	    }

	    /**
	     * Iterates over elements of `collection` invoking `iteratee` for each element.
	     * The `iteratee` is bound to `thisArg` and invoked with three arguments:
	     * (value, index|key, collection). Iteratee functions may exit iteration early
	     * by explicitly returning `false`.
	     *
	     * **Note:** As with other "Collections" methods, objects with a "length" property
	     * are iterated like arrays. To avoid this behavior `_.forIn` or `_.forOwn`
	     * may be used for object iteration.
	     *
	     * @static
	     * @memberOf _
	     * @alias each
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Array|Object|string} Returns `collection`.
	     * @example
	     *
	     * _([1, 2]).forEach(function(n) {
	     *   console.log(n);
	     * }).value();
	     * // => logs each value from left to right and returns the array
	     *
	     * _.forEach({ 'a': 1, 'b': 2 }, function(n, key) {
	     *   console.log(n, key);
	     * });
	     * // => logs each value-key pair and returns the object (iteration order is not guaranteed)
	     */
	    var forEach = createForEach(arrayEach, baseEach);

	    /**
	     * This method is like `_.forEach` except that it iterates over elements of
	     * `collection` from right to left.
	     *
	     * @static
	     * @memberOf _
	     * @alias eachRight
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Array|Object|string} Returns `collection`.
	     * @example
	     *
	     * _([1, 2]).forEachRight(function(n) {
	     *   console.log(n);
	     * }).value();
	     * // => logs each value from right to left and returns the array
	     */
	    var forEachRight = createForEach(arrayEachRight, baseEachRight);

	    /**
	     * Creates an object composed of keys generated from the results of running
	     * each element of `collection` through `iteratee`. The corresponding value
	     * of each key is an array of the elements responsible for generating the key.
	     * The `iteratee` is bound to `thisArg` and invoked with three arguments:
	     * (value, index|key, collection).
	     *
	     * If a property name is provided for `iteratee` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `iteratee` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Object} Returns the composed aggregate object.
	     * @example
	     *
	     * _.groupBy([4.2, 6.1, 6.4], function(n) {
	     *   return Math.floor(n);
	     * });
	     * // => { '4': [4.2], '6': [6.1, 6.4] }
	     *
	     * _.groupBy([4.2, 6.1, 6.4], function(n) {
	     *   return this.floor(n);
	     * }, Math);
	     * // => { '4': [4.2], '6': [6.1, 6.4] }
	     *
	     * // using the `_.property` callback shorthand
	     * _.groupBy(['one', 'two', 'three'], 'length');
	     * // => { '3': ['one', 'two'], '5': ['three'] }
	     */
	    var groupBy = createAggregator(function(result, value, key) {
	      if (hasOwnProperty.call(result, key)) {
	        result[key].push(value);
	      } else {
	        result[key] = [value];
	      }
	    });

	    /**
	     * Checks if `value` is in `collection` using
	     * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	     * for equality comparisons. If `fromIndex` is negative, it is used as the offset
	     * from the end of `collection`.
	     *
	     * @static
	     * @memberOf _
	     * @alias contains, include
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to search.
	     * @param {*} target The value to search for.
	     * @param {number} [fromIndex=0] The index to search from.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.reduce`.
	     * @returns {boolean} Returns `true` if a matching element is found, else `false`.
	     * @example
	     *
	     * _.includes([1, 2, 3], 1);
	     * // => true
	     *
	     * _.includes([1, 2, 3], 1, 2);
	     * // => false
	     *
	     * _.includes({ 'user': 'fred', 'age': 40 }, 'fred');
	     * // => true
	     *
	     * _.includes('pebbles', 'eb');
	     * // => true
	     */
	    function includes(collection, target, fromIndex, guard) {
	      var length = collection ? getLength(collection) : 0;
	      if (!isLength(length)) {
	        collection = values(collection);
	        length = collection.length;
	      }
	      if (typeof fromIndex != 'number' || (guard && isIterateeCall(target, fromIndex, guard))) {
	        fromIndex = 0;
	      } else {
	        fromIndex = fromIndex < 0 ? nativeMax(length + fromIndex, 0) : (fromIndex || 0);
	      }
	      return (typeof collection == 'string' || !isArray(collection) && isString(collection))
	        ? (fromIndex <= length && collection.indexOf(target, fromIndex) > -1)
	        : (!!length && getIndexOf(collection, target, fromIndex) > -1);
	    }

	    /**
	     * Creates an object composed of keys generated from the results of running
	     * each element of `collection` through `iteratee`. The corresponding value
	     * of each key is the last element responsible for generating the key. The
	     * iteratee function is bound to `thisArg` and invoked with three arguments:
	     * (value, index|key, collection).
	     *
	     * If a property name is provided for `iteratee` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `iteratee` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Object} Returns the composed aggregate object.
	     * @example
	     *
	     * var keyData = [
	     *   { 'dir': 'left', 'code': 97 },
	     *   { 'dir': 'right', 'code': 100 }
	     * ];
	     *
	     * _.indexBy(keyData, 'dir');
	     * // => { 'left': { 'dir': 'left', 'code': 97 }, 'right': { 'dir': 'right', 'code': 100 } }
	     *
	     * _.indexBy(keyData, function(object) {
	     *   return String.fromCharCode(object.code);
	     * });
	     * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
	     *
	     * _.indexBy(keyData, function(object) {
	     *   return this.fromCharCode(object.code);
	     * }, String);
	     * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
	     */
	    var indexBy = createAggregator(function(result, value, key) {
	      result[key] = value;
	    });

	    /**
	     * Invokes the method at `path` of each element in `collection`, returning
	     * an array of the results of each invoked method. Any additional arguments
	     * are provided to each invoked method. If `methodName` is a function it is
	     * invoked for, and `this` bound to, each element in `collection`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Array|Function|string} path The path of the method to invoke or
	     *  the function invoked per iteration.
	     * @param {...*} [args] The arguments to invoke the method with.
	     * @returns {Array} Returns the array of results.
	     * @example
	     *
	     * _.invoke([[5, 1, 7], [3, 2, 1]], 'sort');
	     * // => [[1, 5, 7], [1, 2, 3]]
	     *
	     * _.invoke([123, 456], String.prototype.split, '');
	     * // => [['1', '2', '3'], ['4', '5', '6']]
	     */
	    var invoke = restParam(function(collection, path, args) {
	      var index = -1,
	          isFunc = typeof path == 'function',
	          isProp = isKey(path),
	          result = isArrayLike(collection) ? Array(collection.length) : [];

	      baseEach(collection, function(value) {
	        var func = isFunc ? path : ((isProp && value != null) ? value[path] : undefined);
	        result[++index] = func ? func.apply(value, args) : invokePath(value, path, args);
	      });
	      return result;
	    });

	    /**
	     * Creates an array of values by running each element in `collection` through
	     * `iteratee`. The `iteratee` is bound to `thisArg` and invoked with three
	     * arguments: (value, index|key, collection).
	     *
	     * If a property name is provided for `iteratee` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `iteratee` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * Many lodash methods are guarded to work as iteratees for methods like
	     * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
	     *
	     * The guarded methods are:
	     * `ary`, `callback`, `chunk`, `clone`, `create`, `curry`, `curryRight`,
	     * `drop`, `dropRight`, `every`, `fill`, `flatten`, `invert`, `max`, `min`,
	     * `parseInt`, `slice`, `sortBy`, `take`, `takeRight`, `template`, `trim`,
	     * `trimLeft`, `trimRight`, `trunc`, `random`, `range`, `sample`, `some`,
	     * `sum`, `uniq`, and `words`
	     *
	     * @static
	     * @memberOf _
	     * @alias collect
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Array} Returns the new mapped array.
	     * @example
	     *
	     * function timesThree(n) {
	     *   return n * 3;
	     * }
	     *
	     * _.map([1, 2], timesThree);
	     * // => [3, 6]
	     *
	     * _.map({ 'a': 1, 'b': 2 }, timesThree);
	     * // => [3, 6] (iteration order is not guaranteed)
	     *
	     * var users = [
	     *   { 'user': 'barney' },
	     *   { 'user': 'fred' }
	     * ];
	     *
	     * // using the `_.property` callback shorthand
	     * _.map(users, 'user');
	     * // => ['barney', 'fred']
	     */
	    function map(collection, iteratee, thisArg) {
	      var func = isArray(collection) ? arrayMap : baseMap;
	      iteratee = getCallback(iteratee, thisArg, 3);
	      return func(collection, iteratee);
	    }

	    /**
	     * Creates an array of elements split into two groups, the first of which
	     * contains elements `predicate` returns truthy for, while the second of which
	     * contains elements `predicate` returns falsey for. The predicate is bound
	     * to `thisArg` and invoked with three arguments: (value, index|key, collection).
	     *
	     * If a property name is provided for `predicate` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `predicate` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {Array} Returns the array of grouped elements.
	     * @example
	     *
	     * _.partition([1, 2, 3], function(n) {
	     *   return n % 2;
	     * });
	     * // => [[1, 3], [2]]
	     *
	     * _.partition([1.2, 2.3, 3.4], function(n) {
	     *   return this.floor(n) % 2;
	     * }, Math);
	     * // => [[1.2, 3.4], [2.3]]
	     *
	     * var users = [
	     *   { 'user': 'barney',  'age': 36, 'active': false },
	     *   { 'user': 'fred',    'age': 40, 'active': true },
	     *   { 'user': 'pebbles', 'age': 1,  'active': false }
	     * ];
	     *
	     * var mapper = function(array) {
	     *   return _.pluck(array, 'user');
	     * };
	     *
	     * // using the `_.matches` callback shorthand
	     * _.map(_.partition(users, { 'age': 1, 'active': false }), mapper);
	     * // => [['pebbles'], ['barney', 'fred']]
	     *
	     * // using the `_.matchesProperty` callback shorthand
	     * _.map(_.partition(users, 'active', false), mapper);
	     * // => [['barney', 'pebbles'], ['fred']]
	     *
	     * // using the `_.property` callback shorthand
	     * _.map(_.partition(users, 'active'), mapper);
	     * // => [['fred'], ['barney', 'pebbles']]
	     */
	    var partition = createAggregator(function(result, value, key) {
	      result[key ? 0 : 1].push(value);
	    }, function() { return [[], []]; });

	    /**
	     * Gets the property value of `path` from all elements in `collection`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Array|string} path The path of the property to pluck.
	     * @returns {Array} Returns the property values.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney', 'age': 36 },
	     *   { 'user': 'fred',   'age': 40 }
	     * ];
	     *
	     * _.pluck(users, 'user');
	     * // => ['barney', 'fred']
	     *
	     * var userIndex = _.indexBy(users, 'user');
	     * _.pluck(userIndex, 'age');
	     * // => [36, 40] (iteration order is not guaranteed)
	     */
	    function pluck(collection, path) {
	      return map(collection, property(path));
	    }

	    /**
	     * Reduces `collection` to a value which is the accumulated result of running
	     * each element in `collection` through `iteratee`, where each successive
	     * invocation is supplied the return value of the previous. If `accumulator`
	     * is not provided the first element of `collection` is used as the initial
	     * value. The `iteratee` is bound to `thisArg` and invoked with four arguments:
	     * (accumulator, value, index|key, collection).
	     *
	     * Many lodash methods are guarded to work as iteratees for methods like
	     * `_.reduce`, `_.reduceRight`, and `_.transform`.
	     *
	     * The guarded methods are:
	     * `assign`, `defaults`, `defaultsDeep`, `includes`, `merge`, `sortByAll`,
	     * and `sortByOrder`
	     *
	     * @static
	     * @memberOf _
	     * @alias foldl, inject
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @param {*} [accumulator] The initial value.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {*} Returns the accumulated value.
	     * @example
	     *
	     * _.reduce([1, 2], function(total, n) {
	     *   return total + n;
	     * });
	     * // => 3
	     *
	     * _.reduce({ 'a': 1, 'b': 2 }, function(result, n, key) {
	     *   result[key] = n * 3;
	     *   return result;
	     * }, {});
	     * // => { 'a': 3, 'b': 6 } (iteration order is not guaranteed)
	     */
	    var reduce = createReduce(arrayReduce, baseEach);

	    /**
	     * This method is like `_.reduce` except that it iterates over elements of
	     * `collection` from right to left.
	     *
	     * @static
	     * @memberOf _
	     * @alias foldr
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @param {*} [accumulator] The initial value.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {*} Returns the accumulated value.
	     * @example
	     *
	     * var array = [[0, 1], [2, 3], [4, 5]];
	     *
	     * _.reduceRight(array, function(flattened, other) {
	     *   return flattened.concat(other);
	     * }, []);
	     * // => [4, 5, 2, 3, 0, 1]
	     */
	    var reduceRight = createReduce(arrayReduceRight, baseEachRight);

	    /**
	     * The opposite of `_.filter`; this method returns the elements of `collection`
	     * that `predicate` does **not** return truthy for.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {Array} Returns the new filtered array.
	     * @example
	     *
	     * _.reject([1, 2, 3, 4], function(n) {
	     *   return n % 2 == 0;
	     * });
	     * // => [1, 3]
	     *
	     * var users = [
	     *   { 'user': 'barney', 'age': 36, 'active': false },
	     *   { 'user': 'fred',   'age': 40, 'active': true }
	     * ];
	     *
	     * // using the `_.matches` callback shorthand
	     * _.pluck(_.reject(users, { 'age': 40, 'active': true }), 'user');
	     * // => ['barney']
	     *
	     * // using the `_.matchesProperty` callback shorthand
	     * _.pluck(_.reject(users, 'active', false), 'user');
	     * // => ['fred']
	     *
	     * // using the `_.property` callback shorthand
	     * _.pluck(_.reject(users, 'active'), 'user');
	     * // => ['barney']
	     */
	    function reject(collection, predicate, thisArg) {
	      var func = isArray(collection) ? arrayFilter : baseFilter;
	      predicate = getCallback(predicate, thisArg, 3);
	      return func(collection, function(value, index, collection) {
	        return !predicate(value, index, collection);
	      });
	    }

	    /**
	     * Gets a random element or `n` random elements from a collection.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to sample.
	     * @param {number} [n] The number of elements to sample.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {*} Returns the random sample(s).
	     * @example
	     *
	     * _.sample([1, 2, 3, 4]);
	     * // => 2
	     *
	     * _.sample([1, 2, 3, 4], 2);
	     * // => [3, 1]
	     */
	    function sample(collection, n, guard) {
	      if (guard ? isIterateeCall(collection, n, guard) : n == null) {
	        collection = toIterable(collection);
	        var length = collection.length;
	        return length > 0 ? collection[baseRandom(0, length - 1)] : undefined;
	      }
	      var index = -1,
	          result = toArray(collection),
	          length = result.length,
	          lastIndex = length - 1;

	      n = nativeMin(n < 0 ? 0 : (+n || 0), length);
	      while (++index < n) {
	        var rand = baseRandom(index, lastIndex),
	            value = result[rand];

	        result[rand] = result[index];
	        result[index] = value;
	      }
	      result.length = n;
	      return result;
	    }

	    /**
	     * Creates an array of shuffled values, using a version of the
	     * [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher-Yates_shuffle).
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to shuffle.
	     * @returns {Array} Returns the new shuffled array.
	     * @example
	     *
	     * _.shuffle([1, 2, 3, 4]);
	     * // => [4, 1, 3, 2]
	     */
	    function shuffle(collection) {
	      return sample(collection, POSITIVE_INFINITY);
	    }

	    /**
	     * Gets the size of `collection` by returning its length for array-like
	     * values or the number of own enumerable properties for objects.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to inspect.
	     * @returns {number} Returns the size of `collection`.
	     * @example
	     *
	     * _.size([1, 2, 3]);
	     * // => 3
	     *
	     * _.size({ 'a': 1, 'b': 2 });
	     * // => 2
	     *
	     * _.size('pebbles');
	     * // => 7
	     */
	    function size(collection) {
	      var length = collection ? getLength(collection) : 0;
	      return isLength(length) ? length : keys(collection).length;
	    }

	    /**
	     * Checks if `predicate` returns truthy for **any** element of `collection`.
	     * The function returns as soon as it finds a passing value and does not iterate
	     * over the entire collection. The predicate is bound to `thisArg` and invoked
	     * with three arguments: (value, index|key, collection).
	     *
	     * If a property name is provided for `predicate` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `predicate` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @alias any
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {boolean} Returns `true` if any element passes the predicate check,
	     *  else `false`.
	     * @example
	     *
	     * _.some([null, 0, 'yes', false], Boolean);
	     * // => true
	     *
	     * var users = [
	     *   { 'user': 'barney', 'active': true },
	     *   { 'user': 'fred',   'active': false }
	     * ];
	     *
	     * // using the `_.matches` callback shorthand
	     * _.some(users, { 'user': 'barney', 'active': false });
	     * // => false
	     *
	     * // using the `_.matchesProperty` callback shorthand
	     * _.some(users, 'active', false);
	     * // => true
	     *
	     * // using the `_.property` callback shorthand
	     * _.some(users, 'active');
	     * // => true
	     */
	    function some(collection, predicate, thisArg) {
	      var func = isArray(collection) ? arraySome : baseSome;
	      if (thisArg && isIterateeCall(collection, predicate, thisArg)) {
	        predicate = undefined;
	      }
	      if (typeof predicate != 'function' || thisArg !== undefined) {
	        predicate = getCallback(predicate, thisArg, 3);
	      }
	      return func(collection, predicate);
	    }

	    /**
	     * Creates an array of elements, sorted in ascending order by the results of
	     * running each element in a collection through `iteratee`. This method performs
	     * a stable sort, that is, it preserves the original sort order of equal elements.
	     * The `iteratee` is bound to `thisArg` and invoked with three arguments:
	     * (value, index|key, collection).
	     *
	     * If a property name is provided for `iteratee` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `iteratee` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Array} Returns the new sorted array.
	     * @example
	     *
	     * _.sortBy([1, 2, 3], function(n) {
	     *   return Math.sin(n);
	     * });
	     * // => [3, 1, 2]
	     *
	     * _.sortBy([1, 2, 3], function(n) {
	     *   return this.sin(n);
	     * }, Math);
	     * // => [3, 1, 2]
	     *
	     * var users = [
	     *   { 'user': 'fred' },
	     *   { 'user': 'pebbles' },
	     *   { 'user': 'barney' }
	     * ];
	     *
	     * // using the `_.property` callback shorthand
	     * _.pluck(_.sortBy(users, 'user'), 'user');
	     * // => ['barney', 'fred', 'pebbles']
	     */
	    function sortBy(collection, iteratee, thisArg) {
	      if (collection == null) {
	        return [];
	      }
	      if (thisArg && isIterateeCall(collection, iteratee, thisArg)) {
	        iteratee = undefined;
	      }
	      var index = -1;
	      iteratee = getCallback(iteratee, thisArg, 3);

	      var result = baseMap(collection, function(value, key, collection) {
	        return { 'criteria': iteratee(value, key, collection), 'index': ++index, 'value': value };
	      });
	      return baseSortBy(result, compareAscending);
	    }

	    /**
	     * This method is like `_.sortBy` except that it can sort by multiple iteratees
	     * or property names.
	     *
	     * If a property name is provided for an iteratee the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If an object is provided for an iteratee the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {...(Function|Function[]|Object|Object[]|string|string[])} iteratees
	     *  The iteratees to sort by, specified as individual values or arrays of values.
	     * @returns {Array} Returns the new sorted array.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'fred',   'age': 48 },
	     *   { 'user': 'barney', 'age': 36 },
	     *   { 'user': 'fred',   'age': 42 },
	     *   { 'user': 'barney', 'age': 34 }
	     * ];
	     *
	     * _.map(_.sortByAll(users, ['user', 'age']), _.values);
	     * // => [['barney', 34], ['barney', 36], ['fred', 42], ['fred', 48]]
	     *
	     * _.map(_.sortByAll(users, 'user', function(chr) {
	     *   return Math.floor(chr.age / 10);
	     * }), _.values);
	     * // => [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 42]]
	     */
	    var sortByAll = restParam(function(collection, iteratees) {
	      if (collection == null) {
	        return [];
	      }
	      var guard = iteratees[2];
	      if (guard && isIterateeCall(iteratees[0], iteratees[1], guard)) {
	        iteratees.length = 1;
	      }
	      return baseSortByOrder(collection, baseFlatten(iteratees), []);
	    });

	    /**
	     * This method is like `_.sortByAll` except that it allows specifying the
	     * sort orders of the iteratees to sort by. If `orders` is unspecified, all
	     * values are sorted in ascending order. Otherwise, a value is sorted in
	     * ascending order if its corresponding order is "asc", and descending if "desc".
	     *
	     * If a property name is provided for an iteratee the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If an object is provided for an iteratee the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
	     * @param {boolean[]} [orders] The sort orders of `iteratees`.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.reduce`.
	     * @returns {Array} Returns the new sorted array.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'fred',   'age': 48 },
	     *   { 'user': 'barney', 'age': 34 },
	     *   { 'user': 'fred',   'age': 42 },
	     *   { 'user': 'barney', 'age': 36 }
	     * ];
	     *
	     * // sort by `user` in ascending order and by `age` in descending order
	     * _.map(_.sortByOrder(users, ['user', 'age'], ['asc', 'desc']), _.values);
	     * // => [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 42]]
	     */
	    function sortByOrder(collection, iteratees, orders, guard) {
	      if (collection == null) {
	        return [];
	      }
	      if (guard && isIterateeCall(iteratees, orders, guard)) {
	        orders = undefined;
	      }
	      if (!isArray(iteratees)) {
	        iteratees = iteratees == null ? [] : [iteratees];
	      }
	      if (!isArray(orders)) {
	        orders = orders == null ? [] : [orders];
	      }
	      return baseSortByOrder(collection, iteratees, orders);
	    }

	    /**
	     * Performs a deep comparison between each element in `collection` and the
	     * source object, returning an array of all elements that have equivalent
	     * property values.
	     *
	     * **Note:** This method supports comparing arrays, booleans, `Date` objects,
	     * numbers, `Object` objects, regexes, and strings. Objects are compared by
	     * their own, not inherited, enumerable properties. For comparing a single
	     * own or inherited property value see `_.matchesProperty`.
	     *
	     * @static
	     * @memberOf _
	     * @category Collection
	     * @param {Array|Object|string} collection The collection to search.
	     * @param {Object} source The object of property values to match.
	     * @returns {Array} Returns the new filtered array.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney', 'age': 36, 'active': false, 'pets': ['hoppy'] },
	     *   { 'user': 'fred',   'age': 40, 'active': true, 'pets': ['baby puss', 'dino'] }
	     * ];
	     *
	     * _.pluck(_.where(users, { 'age': 36, 'active': false }), 'user');
	     * // => ['barney']
	     *
	     * _.pluck(_.where(users, { 'pets': ['dino'] }), 'user');
	     * // => ['fred']
	     */
	    function where(collection, source) {
	      return filter(collection, baseMatches(source));
	    }

	    /*------------------------------------------------------------------------*/

	    /**
	     * Gets the number of milliseconds that have elapsed since the Unix epoch
	     * (1 January 1970 00:00:00 UTC).
	     *
	     * @static
	     * @memberOf _
	     * @category Date
	     * @example
	     *
	     * _.defer(function(stamp) {
	     *   console.log(_.now() - stamp);
	     * }, _.now());
	     * // => logs the number of milliseconds it took for the deferred function to be invoked
	     */
	    var now = nativeNow || function() {
	      return new Date().getTime();
	    };

	    /*------------------------------------------------------------------------*/

	    /**
	     * The opposite of `_.before`; this method creates a function that invokes
	     * `func` once it is called `n` or more times.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {number} n The number of calls before `func` is invoked.
	     * @param {Function} func The function to restrict.
	     * @returns {Function} Returns the new restricted function.
	     * @example
	     *
	     * var saves = ['profile', 'settings'];
	     *
	     * var done = _.after(saves.length, function() {
	     *   console.log('done saving!');
	     * });
	     *
	     * _.forEach(saves, function(type) {
	     *   asyncSave({ 'type': type, 'complete': done });
	     * });
	     * // => logs 'done saving!' after the two async saves have completed
	     */
	    function after(n, func) {
	      if (typeof func != 'function') {
	        if (typeof n == 'function') {
	          var temp = n;
	          n = func;
	          func = temp;
	        } else {
	          throw new TypeError(FUNC_ERROR_TEXT);
	        }
	      }
	      n = nativeIsFinite(n = +n) ? n : 0;
	      return function() {
	        if (--n < 1) {
	          return func.apply(this, arguments);
	        }
	      };
	    }

	    /**
	     * Creates a function that accepts up to `n` arguments ignoring any
	     * additional arguments.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to cap arguments for.
	     * @param {number} [n=func.length] The arity cap.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * _.map(['6', '8', '10'], _.ary(parseInt, 1));
	     * // => [6, 8, 10]
	     */
	    function ary(func, n, guard) {
	      if (guard && isIterateeCall(func, n, guard)) {
	        n = undefined;
	      }
	      n = (func && n == null) ? func.length : nativeMax(+n || 0, 0);
	      return createWrapper(func, ARY_FLAG, undefined, undefined, undefined, undefined, n);
	    }

	    /**
	     * Creates a function that invokes `func`, with the `this` binding and arguments
	     * of the created function, while it is called less than `n` times. Subsequent
	     * calls to the created function return the result of the last `func` invocation.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {number} n The number of calls at which `func` is no longer invoked.
	     * @param {Function} func The function to restrict.
	     * @returns {Function} Returns the new restricted function.
	     * @example
	     *
	     * jQuery('#add').on('click', _.before(5, addContactToList));
	     * // => allows adding up to 4 contacts to the list
	     */
	    function before(n, func) {
	      var result;
	      if (typeof func != 'function') {
	        if (typeof n == 'function') {
	          var temp = n;
	          n = func;
	          func = temp;
	        } else {
	          throw new TypeError(FUNC_ERROR_TEXT);
	        }
	      }
	      return function() {
	        if (--n > 0) {
	          result = func.apply(this, arguments);
	        }
	        if (n <= 1) {
	          func = undefined;
	        }
	        return result;
	      };
	    }

	    /**
	     * Creates a function that invokes `func` with the `this` binding of `thisArg`
	     * and prepends any additional `_.bind` arguments to those provided to the
	     * bound function.
	     *
	     * The `_.bind.placeholder` value, which defaults to `_` in monolithic builds,
	     * may be used as a placeholder for partially applied arguments.
	     *
	     * **Note:** Unlike native `Function#bind` this method does not set the "length"
	     * property of bound functions.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to bind.
	     * @param {*} thisArg The `this` binding of `func`.
	     * @param {...*} [partials] The arguments to be partially applied.
	     * @returns {Function} Returns the new bound function.
	     * @example
	     *
	     * var greet = function(greeting, punctuation) {
	     *   return greeting + ' ' + this.user + punctuation;
	     * };
	     *
	     * var object = { 'user': 'fred' };
	     *
	     * var bound = _.bind(greet, object, 'hi');
	     * bound('!');
	     * // => 'hi fred!'
	     *
	     * // using placeholders
	     * var bound = _.bind(greet, object, _, '!');
	     * bound('hi');
	     * // => 'hi fred!'
	     */
	    var bind = restParam(function(func, thisArg, partials) {
	      var bitmask = BIND_FLAG;
	      if (partials.length) {
	        var holders = replaceHolders(partials, bind.placeholder);
	        bitmask |= PARTIAL_FLAG;
	      }
	      return createWrapper(func, bitmask, thisArg, partials, holders);
	    });

	    /**
	     * Binds methods of an object to the object itself, overwriting the existing
	     * method. Method names may be specified as individual arguments or as arrays
	     * of method names. If no method names are provided all enumerable function
	     * properties, own and inherited, of `object` are bound.
	     *
	     * **Note:** This method does not set the "length" property of bound functions.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Object} object The object to bind and assign the bound methods to.
	     * @param {...(string|string[])} [methodNames] The object method names to bind,
	     *  specified as individual method names or arrays of method names.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * var view = {
	     *   'label': 'docs',
	     *   'onClick': function() {
	     *     console.log('clicked ' + this.label);
	     *   }
	     * };
	     *
	     * _.bindAll(view);
	     * jQuery('#docs').on('click', view.onClick);
	     * // => logs 'clicked docs' when the element is clicked
	     */
	    var bindAll = restParam(function(object, methodNames) {
	      methodNames = methodNames.length ? baseFlatten(methodNames) : functions(object);

	      var index = -1,
	          length = methodNames.length;

	      while (++index < length) {
	        var key = methodNames[index];
	        object[key] = createWrapper(object[key], BIND_FLAG, object);
	      }
	      return object;
	    });

	    /**
	     * Creates a function that invokes the method at `object[key]` and prepends
	     * any additional `_.bindKey` arguments to those provided to the bound function.
	     *
	     * This method differs from `_.bind` by allowing bound functions to reference
	     * methods that may be redefined or don't yet exist.
	     * See [Peter Michaux's article](http://peter.michaux.ca/articles/lazy-function-definition-pattern)
	     * for more details.
	     *
	     * The `_.bindKey.placeholder` value, which defaults to `_` in monolithic
	     * builds, may be used as a placeholder for partially applied arguments.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Object} object The object the method belongs to.
	     * @param {string} key The key of the method.
	     * @param {...*} [partials] The arguments to be partially applied.
	     * @returns {Function} Returns the new bound function.
	     * @example
	     *
	     * var object = {
	     *   'user': 'fred',
	     *   'greet': function(greeting, punctuation) {
	     *     return greeting + ' ' + this.user + punctuation;
	     *   }
	     * };
	     *
	     * var bound = _.bindKey(object, 'greet', 'hi');
	     * bound('!');
	     * // => 'hi fred!'
	     *
	     * object.greet = function(greeting, punctuation) {
	     *   return greeting + 'ya ' + this.user + punctuation;
	     * };
	     *
	     * bound('!');
	     * // => 'hiya fred!'
	     *
	     * // using placeholders
	     * var bound = _.bindKey(object, 'greet', _, '!');
	     * bound('hi');
	     * // => 'hiya fred!'
	     */
	    var bindKey = restParam(function(object, key, partials) {
	      var bitmask = BIND_FLAG | BIND_KEY_FLAG;
	      if (partials.length) {
	        var holders = replaceHolders(partials, bindKey.placeholder);
	        bitmask |= PARTIAL_FLAG;
	      }
	      return createWrapper(key, bitmask, object, partials, holders);
	    });

	    /**
	     * Creates a function that accepts one or more arguments of `func` that when
	     * called either invokes `func` returning its result, if all `func` arguments
	     * have been provided, or returns a function that accepts one or more of the
	     * remaining `func` arguments, and so on. The arity of `func` may be specified
	     * if `func.length` is not sufficient.
	     *
	     * The `_.curry.placeholder` value, which defaults to `_` in monolithic builds,
	     * may be used as a placeholder for provided arguments.
	     *
	     * **Note:** This method does not set the "length" property of curried functions.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to curry.
	     * @param {number} [arity=func.length] The arity of `func`.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {Function} Returns the new curried function.
	     * @example
	     *
	     * var abc = function(a, b, c) {
	     *   return [a, b, c];
	     * };
	     *
	     * var curried = _.curry(abc);
	     *
	     * curried(1)(2)(3);
	     * // => [1, 2, 3]
	     *
	     * curried(1, 2)(3);
	     * // => [1, 2, 3]
	     *
	     * curried(1, 2, 3);
	     * // => [1, 2, 3]
	     *
	     * // using placeholders
	     * curried(1)(_, 3)(2);
	     * // => [1, 2, 3]
	     */
	    var curry = createCurry(CURRY_FLAG);

	    /**
	     * This method is like `_.curry` except that arguments are applied to `func`
	     * in the manner of `_.partialRight` instead of `_.partial`.
	     *
	     * The `_.curryRight.placeholder` value, which defaults to `_` in monolithic
	     * builds, may be used as a placeholder for provided arguments.
	     *
	     * **Note:** This method does not set the "length" property of curried functions.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to curry.
	     * @param {number} [arity=func.length] The arity of `func`.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {Function} Returns the new curried function.
	     * @example
	     *
	     * var abc = function(a, b, c) {
	     *   return [a, b, c];
	     * };
	     *
	     * var curried = _.curryRight(abc);
	     *
	     * curried(3)(2)(1);
	     * // => [1, 2, 3]
	     *
	     * curried(2, 3)(1);
	     * // => [1, 2, 3]
	     *
	     * curried(1, 2, 3);
	     * // => [1, 2, 3]
	     *
	     * // using placeholders
	     * curried(3)(1, _)(2);
	     * // => [1, 2, 3]
	     */
	    var curryRight = createCurry(CURRY_RIGHT_FLAG);

	    /**
	     * Creates a debounced function that delays invoking `func` until after `wait`
	     * milliseconds have elapsed since the last time the debounced function was
	     * invoked. The debounced function comes with a `cancel` method to cancel
	     * delayed invocations. Provide an options object to indicate that `func`
	     * should be invoked on the leading and/or trailing edge of the `wait` timeout.
	     * Subsequent calls to the debounced function return the result of the last
	     * `func` invocation.
	     *
	     * **Note:** If `leading` and `trailing` options are `true`, `func` is invoked
	     * on the trailing edge of the timeout only if the the debounced function is
	     * invoked more than once during the `wait` timeout.
	     *
	     * See [David Corbacho's article](http://drupalmotion.com/article/debounce-and-throttle-visual-explanation)
	     * for details over the differences between `_.debounce` and `_.throttle`.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to debounce.
	     * @param {number} [wait=0] The number of milliseconds to delay.
	     * @param {Object} [options] The options object.
	     * @param {boolean} [options.leading=false] Specify invoking on the leading
	     *  edge of the timeout.
	     * @param {number} [options.maxWait] The maximum time `func` is allowed to be
	     *  delayed before it is invoked.
	     * @param {boolean} [options.trailing=true] Specify invoking on the trailing
	     *  edge of the timeout.
	     * @returns {Function} Returns the new debounced function.
	     * @example
	     *
	     * // avoid costly calculations while the window size is in flux
	     * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
	     *
	     * // invoke `sendMail` when the click event is fired, debouncing subsequent calls
	     * jQuery('#postbox').on('click', _.debounce(sendMail, 300, {
	     *   'leading': true,
	     *   'trailing': false
	     * }));
	     *
	     * // ensure `batchLog` is invoked once after 1 second of debounced calls
	     * var source = new EventSource('/stream');
	     * jQuery(source).on('message', _.debounce(batchLog, 250, {
	     *   'maxWait': 1000
	     * }));
	     *
	     * // cancel a debounced call
	     * var todoChanges = _.debounce(batchLog, 1000);
	     * Object.observe(models.todo, todoChanges);
	     *
	     * Object.observe(models, function(changes) {
	     *   if (_.find(changes, { 'user': 'todo', 'type': 'delete'})) {
	     *     todoChanges.cancel();
	     *   }
	     * }, ['delete']);
	     *
	     * // ...at some point `models.todo` is changed
	     * models.todo.completed = true;
	     *
	     * // ...before 1 second has passed `models.todo` is deleted
	     * // which cancels the debounced `todoChanges` call
	     * delete models.todo;
	     */
	    function debounce(func, wait, options) {
	      var args,
	          maxTimeoutId,
	          result,
	          stamp,
	          thisArg,
	          timeoutId,
	          trailingCall,
	          lastCalled = 0,
	          maxWait = false,
	          trailing = true;

	      if (typeof func != 'function') {
	        throw new TypeError(FUNC_ERROR_TEXT);
	      }
	      wait = wait < 0 ? 0 : (+wait || 0);
	      if (options === true) {
	        var leading = true;
	        trailing = false;
	      } else if (isObject(options)) {
	        leading = !!options.leading;
	        maxWait = 'maxWait' in options && nativeMax(+options.maxWait || 0, wait);
	        trailing = 'trailing' in options ? !!options.trailing : trailing;
	      }

	      function cancel() {
	        if (timeoutId) {
	          clearTimeout(timeoutId);
	        }
	        if (maxTimeoutId) {
	          clearTimeout(maxTimeoutId);
	        }
	        lastCalled = 0;
	        maxTimeoutId = timeoutId = trailingCall = undefined;
	      }

	      function complete(isCalled, id) {
	        if (id) {
	          clearTimeout(id);
	        }
	        maxTimeoutId = timeoutId = trailingCall = undefined;
	        if (isCalled) {
	          lastCalled = now();
	          result = func.apply(thisArg, args);
	          if (!timeoutId && !maxTimeoutId) {
	            args = thisArg = undefined;
	          }
	        }
	      }

	      function delayed() {
	        var remaining = wait - (now() - stamp);
	        if (remaining <= 0 || remaining > wait) {
	          complete(trailingCall, maxTimeoutId);
	        } else {
	          timeoutId = setTimeout(delayed, remaining);
	        }
	      }

	      function maxDelayed() {
	        complete(trailing, timeoutId);
	      }

	      function debounced() {
	        args = arguments;
	        stamp = now();
	        thisArg = this;
	        trailingCall = trailing && (timeoutId || !leading);

	        if (maxWait === false) {
	          var leadingCall = leading && !timeoutId;
	        } else {
	          if (!maxTimeoutId && !leading) {
	            lastCalled = stamp;
	          }
	          var remaining = maxWait - (stamp - lastCalled),
	              isCalled = remaining <= 0 || remaining > maxWait;

	          if (isCalled) {
	            if (maxTimeoutId) {
	              maxTimeoutId = clearTimeout(maxTimeoutId);
	            }
	            lastCalled = stamp;
	            result = func.apply(thisArg, args);
	          }
	          else if (!maxTimeoutId) {
	            maxTimeoutId = setTimeout(maxDelayed, remaining);
	          }
	        }
	        if (isCalled && timeoutId) {
	          timeoutId = clearTimeout(timeoutId);
	        }
	        else if (!timeoutId && wait !== maxWait) {
	          timeoutId = setTimeout(delayed, wait);
	        }
	        if (leadingCall) {
	          isCalled = true;
	          result = func.apply(thisArg, args);
	        }
	        if (isCalled && !timeoutId && !maxTimeoutId) {
	          args = thisArg = undefined;
	        }
	        return result;
	      }
	      debounced.cancel = cancel;
	      return debounced;
	    }

	    /**
	     * Defers invoking the `func` until the current call stack has cleared. Any
	     * additional arguments are provided to `func` when it is invoked.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to defer.
	     * @param {...*} [args] The arguments to invoke the function with.
	     * @returns {number} Returns the timer id.
	     * @example
	     *
	     * _.defer(function(text) {
	     *   console.log(text);
	     * }, 'deferred');
	     * // logs 'deferred' after one or more milliseconds
	     */
	    var defer = restParam(function(func, args) {
	      return baseDelay(func, 1, args);
	    });

	    /**
	     * Invokes `func` after `wait` milliseconds. Any additional arguments are
	     * provided to `func` when it is invoked.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to delay.
	     * @param {number} wait The number of milliseconds to delay invocation.
	     * @param {...*} [args] The arguments to invoke the function with.
	     * @returns {number} Returns the timer id.
	     * @example
	     *
	     * _.delay(function(text) {
	     *   console.log(text);
	     * }, 1000, 'later');
	     * // => logs 'later' after one second
	     */
	    var delay = restParam(function(func, wait, args) {
	      return baseDelay(func, wait, args);
	    });

	    /**
	     * Creates a function that returns the result of invoking the provided
	     * functions with the `this` binding of the created function, where each
	     * successive invocation is supplied the return value of the previous.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {...Function} [funcs] Functions to invoke.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * function square(n) {
	     *   return n * n;
	     * }
	     *
	     * var addSquare = _.flow(_.add, square);
	     * addSquare(1, 2);
	     * // => 9
	     */
	    var flow = createFlow();

	    /**
	     * This method is like `_.flow` except that it creates a function that
	     * invokes the provided functions from right to left.
	     *
	     * @static
	     * @memberOf _
	     * @alias backflow, compose
	     * @category Function
	     * @param {...Function} [funcs] Functions to invoke.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * function square(n) {
	     *   return n * n;
	     * }
	     *
	     * var addSquare = _.flowRight(square, _.add);
	     * addSquare(1, 2);
	     * // => 9
	     */
	    var flowRight = createFlow(true);

	    /**
	     * Creates a function that memoizes the result of `func`. If `resolver` is
	     * provided it determines the cache key for storing the result based on the
	     * arguments provided to the memoized function. By default, the first argument
	     * provided to the memoized function is coerced to a string and used as the
	     * cache key. The `func` is invoked with the `this` binding of the memoized
	     * function.
	     *
	     * **Note:** The cache is exposed as the `cache` property on the memoized
	     * function. Its creation may be customized by replacing the `_.memoize.Cache`
	     * constructor with one whose instances implement the [`Map`](http://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-map-prototype-object)
	     * method interface of `get`, `has`, and `set`.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to have its output memoized.
	     * @param {Function} [resolver] The function to resolve the cache key.
	     * @returns {Function} Returns the new memoizing function.
	     * @example
	     *
	     * var upperCase = _.memoize(function(string) {
	     *   return string.toUpperCase();
	     * });
	     *
	     * upperCase('fred');
	     * // => 'FRED'
	     *
	     * // modifying the result cache
	     * upperCase.cache.set('fred', 'BARNEY');
	     * upperCase('fred');
	     * // => 'BARNEY'
	     *
	     * // replacing `_.memoize.Cache`
	     * var object = { 'user': 'fred' };
	     * var other = { 'user': 'barney' };
	     * var identity = _.memoize(_.identity);
	     *
	     * identity(object);
	     * // => { 'user': 'fred' }
	     * identity(other);
	     * // => { 'user': 'fred' }
	     *
	     * _.memoize.Cache = WeakMap;
	     * var identity = _.memoize(_.identity);
	     *
	     * identity(object);
	     * // => { 'user': 'fred' }
	     * identity(other);
	     * // => { 'user': 'barney' }
	     */
	    function memoize(func, resolver) {
	      if (typeof func != 'function' || (resolver && typeof resolver != 'function')) {
	        throw new TypeError(FUNC_ERROR_TEXT);
	      }
	      var memoized = function() {
	        var args = arguments,
	            key = resolver ? resolver.apply(this, args) : args[0],
	            cache = memoized.cache;

	        if (cache.has(key)) {
	          return cache.get(key);
	        }
	        var result = func.apply(this, args);
	        memoized.cache = cache.set(key, result);
	        return result;
	      };
	      memoized.cache = new memoize.Cache;
	      return memoized;
	    }

	    /**
	     * Creates a function that runs each argument through a corresponding
	     * transform function.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to wrap.
	     * @param {...(Function|Function[])} [transforms] The functions to transform
	     * arguments, specified as individual functions or arrays of functions.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * function doubled(n) {
	     *   return n * 2;
	     * }
	     *
	     * function square(n) {
	     *   return n * n;
	     * }
	     *
	     * var modded = _.modArgs(function(x, y) {
	     *   return [x, y];
	     * }, square, doubled);
	     *
	     * modded(1, 2);
	     * // => [1, 4]
	     *
	     * modded(5, 10);
	     * // => [25, 20]
	     */
	    var modArgs = restParam(function(func, transforms) {
	      transforms = baseFlatten(transforms);
	      if (typeof func != 'function' || !arrayEvery(transforms, baseIsFunction)) {
	        throw new TypeError(FUNC_ERROR_TEXT);
	      }
	      var length = transforms.length;
	      return restParam(function(args) {
	        var index = nativeMin(args.length, length);
	        while (index--) {
	          args[index] = transforms[index](args[index]);
	        }
	        return func.apply(this, args);
	      });
	    });

	    /**
	     * Creates a function that negates the result of the predicate `func`. The
	     * `func` predicate is invoked with the `this` binding and arguments of the
	     * created function.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} predicate The predicate to negate.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * function isEven(n) {
	     *   return n % 2 == 0;
	     * }
	     *
	     * _.filter([1, 2, 3, 4, 5, 6], _.negate(isEven));
	     * // => [1, 3, 5]
	     */
	    function negate(predicate) {
	      if (typeof predicate != 'function') {
	        throw new TypeError(FUNC_ERROR_TEXT);
	      }
	      return function() {
	        return !predicate.apply(this, arguments);
	      };
	    }

	    /**
	     * Creates a function that is restricted to invoking `func` once. Repeat calls
	     * to the function return the value of the first call. The `func` is invoked
	     * with the `this` binding and arguments of the created function.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to restrict.
	     * @returns {Function} Returns the new restricted function.
	     * @example
	     *
	     * var initialize = _.once(createApplication);
	     * initialize();
	     * initialize();
	     * // `initialize` invokes `createApplication` once
	     */
	    function once(func) {
	      return before(2, func);
	    }

	    /**
	     * Creates a function that invokes `func` with `partial` arguments prepended
	     * to those provided to the new function. This method is like `_.bind` except
	     * it does **not** alter the `this` binding.
	     *
	     * The `_.partial.placeholder` value, which defaults to `_` in monolithic
	     * builds, may be used as a placeholder for partially applied arguments.
	     *
	     * **Note:** This method does not set the "length" property of partially
	     * applied functions.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to partially apply arguments to.
	     * @param {...*} [partials] The arguments to be partially applied.
	     * @returns {Function} Returns the new partially applied function.
	     * @example
	     *
	     * var greet = function(greeting, name) {
	     *   return greeting + ' ' + name;
	     * };
	     *
	     * var sayHelloTo = _.partial(greet, 'hello');
	     * sayHelloTo('fred');
	     * // => 'hello fred'
	     *
	     * // using placeholders
	     * var greetFred = _.partial(greet, _, 'fred');
	     * greetFred('hi');
	     * // => 'hi fred'
	     */
	    var partial = createPartial(PARTIAL_FLAG);

	    /**
	     * This method is like `_.partial` except that partially applied arguments
	     * are appended to those provided to the new function.
	     *
	     * The `_.partialRight.placeholder` value, which defaults to `_` in monolithic
	     * builds, may be used as a placeholder for partially applied arguments.
	     *
	     * **Note:** This method does not set the "length" property of partially
	     * applied functions.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to partially apply arguments to.
	     * @param {...*} [partials] The arguments to be partially applied.
	     * @returns {Function} Returns the new partially applied function.
	     * @example
	     *
	     * var greet = function(greeting, name) {
	     *   return greeting + ' ' + name;
	     * };
	     *
	     * var greetFred = _.partialRight(greet, 'fred');
	     * greetFred('hi');
	     * // => 'hi fred'
	     *
	     * // using placeholders
	     * var sayHelloTo = _.partialRight(greet, 'hello', _);
	     * sayHelloTo('fred');
	     * // => 'hello fred'
	     */
	    var partialRight = createPartial(PARTIAL_RIGHT_FLAG);

	    /**
	     * Creates a function that invokes `func` with arguments arranged according
	     * to the specified indexes where the argument value at the first index is
	     * provided as the first argument, the argument value at the second index is
	     * provided as the second argument, and so on.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to rearrange arguments for.
	     * @param {...(number|number[])} indexes The arranged argument indexes,
	     *  specified as individual indexes or arrays of indexes.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var rearged = _.rearg(function(a, b, c) {
	     *   return [a, b, c];
	     * }, 2, 0, 1);
	     *
	     * rearged('b', 'c', 'a')
	     * // => ['a', 'b', 'c']
	     *
	     * var map = _.rearg(_.map, [1, 0]);
	     * map(function(n) {
	     *   return n * 3;
	     * }, [1, 2, 3]);
	     * // => [3, 6, 9]
	     */
	    var rearg = restParam(function(func, indexes) {
	      return createWrapper(func, REARG_FLAG, undefined, undefined, undefined, baseFlatten(indexes));
	    });

	    /**
	     * Creates a function that invokes `func` with the `this` binding of the
	     * created function and arguments from `start` and beyond provided as an array.
	     *
	     * **Note:** This method is based on the [rest parameter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters).
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to apply a rest parameter to.
	     * @param {number} [start=func.length-1] The start position of the rest parameter.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var say = _.restParam(function(what, names) {
	     *   return what + ' ' + _.initial(names).join(', ') +
	     *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
	     * });
	     *
	     * say('hello', 'fred', 'barney', 'pebbles');
	     * // => 'hello fred, barney, & pebbles'
	     */
	    function restParam(func, start) {
	      if (typeof func != 'function') {
	        throw new TypeError(FUNC_ERROR_TEXT);
	      }
	      start = nativeMax(start === undefined ? (func.length - 1) : (+start || 0), 0);
	      return function() {
	        var args = arguments,
	            index = -1,
	            length = nativeMax(args.length - start, 0),
	            rest = Array(length);

	        while (++index < length) {
	          rest[index] = args[start + index];
	        }
	        switch (start) {
	          case 0: return func.call(this, rest);
	          case 1: return func.call(this, args[0], rest);
	          case 2: return func.call(this, args[0], args[1], rest);
	        }
	        var otherArgs = Array(start + 1);
	        index = -1;
	        while (++index < start) {
	          otherArgs[index] = args[index];
	        }
	        otherArgs[start] = rest;
	        return func.apply(this, otherArgs);
	      };
	    }

	    /**
	     * Creates a function that invokes `func` with the `this` binding of the created
	     * function and an array of arguments much like [`Function#apply`](https://es5.github.io/#x15.3.4.3).
	     *
	     * **Note:** This method is based on the [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator).
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to spread arguments over.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var say = _.spread(function(who, what) {
	     *   return who + ' says ' + what;
	     * });
	     *
	     * say(['fred', 'hello']);
	     * // => 'fred says hello'
	     *
	     * // with a Promise
	     * var numbers = Promise.all([
	     *   Promise.resolve(40),
	     *   Promise.resolve(36)
	     * ]);
	     *
	     * numbers.then(_.spread(function(x, y) {
	     *   return x + y;
	     * }));
	     * // => a Promise of 76
	     */
	    function spread(func) {
	      if (typeof func != 'function') {
	        throw new TypeError(FUNC_ERROR_TEXT);
	      }
	      return function(array) {
	        return func.apply(this, array);
	      };
	    }

	    /**
	     * Creates a throttled function that only invokes `func` at most once per
	     * every `wait` milliseconds. The throttled function comes with a `cancel`
	     * method to cancel delayed invocations. Provide an options object to indicate
	     * that `func` should be invoked on the leading and/or trailing edge of the
	     * `wait` timeout. Subsequent calls to the throttled function return the
	     * result of the last `func` call.
	     *
	     * **Note:** If `leading` and `trailing` options are `true`, `func` is invoked
	     * on the trailing edge of the timeout only if the the throttled function is
	     * invoked more than once during the `wait` timeout.
	     *
	     * See [David Corbacho's article](http://drupalmotion.com/article/debounce-and-throttle-visual-explanation)
	     * for details over the differences between `_.throttle` and `_.debounce`.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {Function} func The function to throttle.
	     * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
	     * @param {Object} [options] The options object.
	     * @param {boolean} [options.leading=true] Specify invoking on the leading
	     *  edge of the timeout.
	     * @param {boolean} [options.trailing=true] Specify invoking on the trailing
	     *  edge of the timeout.
	     * @returns {Function} Returns the new throttled function.
	     * @example
	     *
	     * // avoid excessively updating the position while scrolling
	     * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
	     *
	     * // invoke `renewToken` when the click event is fired, but not more than once every 5 minutes
	     * jQuery('.interactive').on('click', _.throttle(renewToken, 300000, {
	     *   'trailing': false
	     * }));
	     *
	     * // cancel a trailing throttled call
	     * jQuery(window).on('popstate', throttled.cancel);
	     */
	    function throttle(func, wait, options) {
	      var leading = true,
	          trailing = true;

	      if (typeof func != 'function') {
	        throw new TypeError(FUNC_ERROR_TEXT);
	      }
	      if (options === false) {
	        leading = false;
	      } else if (isObject(options)) {
	        leading = 'leading' in options ? !!options.leading : leading;
	        trailing = 'trailing' in options ? !!options.trailing : trailing;
	      }
	      return debounce(func, wait, { 'leading': leading, 'maxWait': +wait, 'trailing': trailing });
	    }

	    /**
	     * Creates a function that provides `value` to the wrapper function as its
	     * first argument. Any additional arguments provided to the function are
	     * appended to those provided to the wrapper function. The wrapper is invoked
	     * with the `this` binding of the created function.
	     *
	     * @static
	     * @memberOf _
	     * @category Function
	     * @param {*} value The value to wrap.
	     * @param {Function} wrapper The wrapper function.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var p = _.wrap(_.escape, function(func, text) {
	     *   return '<p>' + func(text) + '</p>';
	     * });
	     *
	     * p('fred, barney, & pebbles');
	     * // => '<p>fred, barney, &amp; pebbles</p>'
	     */
	    function wrap(value, wrapper) {
	      wrapper = wrapper == null ? identity : wrapper;
	      return createWrapper(wrapper, PARTIAL_FLAG, undefined, [value], []);
	    }

	    /*------------------------------------------------------------------------*/

	    /**
	     * Creates a clone of `value`. If `isDeep` is `true` nested objects are cloned,
	     * otherwise they are assigned by reference. If `customizer` is provided it is
	     * invoked to produce the cloned values. If `customizer` returns `undefined`
	     * cloning is handled by the method instead. The `customizer` is bound to
	     * `thisArg` and invoked with two argument; (value [, index|key, object]).
	     *
	     * **Note:** This method is loosely based on the
	     * [structured clone algorithm](http://www.w3.org/TR/html5/infrastructure.html#internal-structured-cloning-algorithm).
	     * The enumerable properties of `arguments` objects and objects created by
	     * constructors other than `Object` are cloned to plain `Object` objects. An
	     * empty object is returned for uncloneable values such as functions, DOM nodes,
	     * Maps, Sets, and WeakMaps.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to clone.
	     * @param {boolean} [isDeep] Specify a deep clone.
	     * @param {Function} [customizer] The function to customize cloning values.
	     * @param {*} [thisArg] The `this` binding of `customizer`.
	     * @returns {*} Returns the cloned value.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney' },
	     *   { 'user': 'fred' }
	     * ];
	     *
	     * var shallow = _.clone(users);
	     * shallow[0] === users[0];
	     * // => true
	     *
	     * var deep = _.clone(users, true);
	     * deep[0] === users[0];
	     * // => false
	     *
	     * // using a customizer callback
	     * var el = _.clone(document.body, function(value) {
	     *   if (_.isElement(value)) {
	     *     return value.cloneNode(false);
	     *   }
	     * });
	     *
	     * el === document.body
	     * // => false
	     * el.nodeName
	     * // => BODY
	     * el.childNodes.length;
	     * // => 0
	     */
	    function clone(value, isDeep, customizer, thisArg) {
	      if (isDeep && typeof isDeep != 'boolean' && isIterateeCall(value, isDeep, customizer)) {
	        isDeep = false;
	      }
	      else if (typeof isDeep == 'function') {
	        thisArg = customizer;
	        customizer = isDeep;
	        isDeep = false;
	      }
	      return typeof customizer == 'function'
	        ? baseClone(value, isDeep, bindCallback(customizer, thisArg, 1))
	        : baseClone(value, isDeep);
	    }

	    /**
	     * Creates a deep clone of `value`. If `customizer` is provided it is invoked
	     * to produce the cloned values. If `customizer` returns `undefined` cloning
	     * is handled by the method instead. The `customizer` is bound to `thisArg`
	     * and invoked with two argument; (value [, index|key, object]).
	     *
	     * **Note:** This method is loosely based on the
	     * [structured clone algorithm](http://www.w3.org/TR/html5/infrastructure.html#internal-structured-cloning-algorithm).
	     * The enumerable properties of `arguments` objects and objects created by
	     * constructors other than `Object` are cloned to plain `Object` objects. An
	     * empty object is returned for uncloneable values such as functions, DOM nodes,
	     * Maps, Sets, and WeakMaps.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to deep clone.
	     * @param {Function} [customizer] The function to customize cloning values.
	     * @param {*} [thisArg] The `this` binding of `customizer`.
	     * @returns {*} Returns the deep cloned value.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney' },
	     *   { 'user': 'fred' }
	     * ];
	     *
	     * var deep = _.cloneDeep(users);
	     * deep[0] === users[0];
	     * // => false
	     *
	     * // using a customizer callback
	     * var el = _.cloneDeep(document.body, function(value) {
	     *   if (_.isElement(value)) {
	     *     return value.cloneNode(true);
	     *   }
	     * });
	     *
	     * el === document.body
	     * // => false
	     * el.nodeName
	     * // => BODY
	     * el.childNodes.length;
	     * // => 20
	     */
	    function cloneDeep(value, customizer, thisArg) {
	      return typeof customizer == 'function'
	        ? baseClone(value, true, bindCallback(customizer, thisArg, 1))
	        : baseClone(value, true);
	    }

	    /**
	     * Checks if `value` is greater than `other`.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to compare.
	     * @param {*} other The other value to compare.
	     * @returns {boolean} Returns `true` if `value` is greater than `other`, else `false`.
	     * @example
	     *
	     * _.gt(3, 1);
	     * // => true
	     *
	     * _.gt(3, 3);
	     * // => false
	     *
	     * _.gt(1, 3);
	     * // => false
	     */
	    function gt(value, other) {
	      return value > other;
	    }

	    /**
	     * Checks if `value` is greater than or equal to `other`.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to compare.
	     * @param {*} other The other value to compare.
	     * @returns {boolean} Returns `true` if `value` is greater than or equal to `other`, else `false`.
	     * @example
	     *
	     * _.gte(3, 1);
	     * // => true
	     *
	     * _.gte(3, 3);
	     * // => true
	     *
	     * _.gte(1, 3);
	     * // => false
	     */
	    function gte(value, other) {
	      return value >= other;
	    }

	    /**
	     * Checks if `value` is classified as an `arguments` object.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	     * @example
	     *
	     * _.isArguments(function() { return arguments; }());
	     * // => true
	     *
	     * _.isArguments([1, 2, 3]);
	     * // => false
	     */
	    function isArguments(value) {
	      return isObjectLike(value) && isArrayLike(value) &&
	        hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
	    }

	    /**
	     * Checks if `value` is classified as an `Array` object.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	     * @example
	     *
	     * _.isArray([1, 2, 3]);
	     * // => true
	     *
	     * _.isArray(function() { return arguments; }());
	     * // => false
	     */
	    var isArray = nativeIsArray || function(value) {
	      return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
	    };

	    /**
	     * Checks if `value` is classified as a boolean primitive or object.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	     * @example
	     *
	     * _.isBoolean(false);
	     * // => true
	     *
	     * _.isBoolean(null);
	     * // => false
	     */
	    function isBoolean(value) {
	      return value === true || value === false || (isObjectLike(value) && objToString.call(value) == boolTag);
	    }

	    /**
	     * Checks if `value` is classified as a `Date` object.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	     * @example
	     *
	     * _.isDate(new Date);
	     * // => true
	     *
	     * _.isDate('Mon April 23 2012');
	     * // => false
	     */
	    function isDate(value) {
	      return isObjectLike(value) && objToString.call(value) == dateTag;
	    }

	    /**
	     * Checks if `value` is a DOM element.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a DOM element, else `false`.
	     * @example
	     *
	     * _.isElement(document.body);
	     * // => true
	     *
	     * _.isElement('<body>');
	     * // => false
	     */
	    function isElement(value) {
	      return !!value && value.nodeType === 1 && isObjectLike(value) && !isPlainObject(value);
	    }

	    /**
	     * Checks if `value` is empty. A value is considered empty unless it is an
	     * `arguments` object, array, string, or jQuery-like collection with a length
	     * greater than `0` or an object with own enumerable properties.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {Array|Object|string} value The value to inspect.
	     * @returns {boolean} Returns `true` if `value` is empty, else `false`.
	     * @example
	     *
	     * _.isEmpty(null);
	     * // => true
	     *
	     * _.isEmpty(true);
	     * // => true
	     *
	     * _.isEmpty(1);
	     * // => true
	     *
	     * _.isEmpty([1, 2, 3]);
	     * // => false
	     *
	     * _.isEmpty({ 'a': 1 });
	     * // => false
	     */
	    function isEmpty(value) {
	      if (value == null) {
	        return true;
	      }
	      if (isArrayLike(value) && (isArray(value) || isString(value) || isArguments(value) ||
	          (isObjectLike(value) && isFunction(value.splice)))) {
	        return !value.length;
	      }
	      return !keys(value).length;
	    }

	    /**
	     * Performs a deep comparison between two values to determine if they are
	     * equivalent. If `customizer` is provided it is invoked to compare values.
	     * If `customizer` returns `undefined` comparisons are handled by the method
	     * instead. The `customizer` is bound to `thisArg` and invoked with three
	     * arguments: (value, other [, index|key]).
	     *
	     * **Note:** This method supports comparing arrays, booleans, `Date` objects,
	     * numbers, `Object` objects, regexes, and strings. Objects are compared by
	     * their own, not inherited, enumerable properties. Functions and DOM nodes
	     * are **not** supported. Provide a customizer function to extend support
	     * for comparing other values.
	     *
	     * @static
	     * @memberOf _
	     * @alias eq
	     * @category Lang
	     * @param {*} value The value to compare.
	     * @param {*} other The other value to compare.
	     * @param {Function} [customizer] The function to customize value comparisons.
	     * @param {*} [thisArg] The `this` binding of `customizer`.
	     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	     * @example
	     *
	     * var object = { 'user': 'fred' };
	     * var other = { 'user': 'fred' };
	     *
	     * object == other;
	     * // => false
	     *
	     * _.isEqual(object, other);
	     * // => true
	     *
	     * // using a customizer callback
	     * var array = ['hello', 'goodbye'];
	     * var other = ['hi', 'goodbye'];
	     *
	     * _.isEqual(array, other, function(value, other) {
	     *   if (_.every([value, other], RegExp.prototype.test, /^h(?:i|ello)$/)) {
	     *     return true;
	     *   }
	     * });
	     * // => true
	     */
	    function isEqual(value, other, customizer, thisArg) {
	      customizer = typeof customizer == 'function' ? bindCallback(customizer, thisArg, 3) : undefined;
	      var result = customizer ? customizer(value, other) : undefined;
	      return  result === undefined ? baseIsEqual(value, other, customizer) : !!result;
	    }

	    /**
	     * Checks if `value` is an `Error`, `EvalError`, `RangeError`, `ReferenceError`,
	     * `SyntaxError`, `TypeError`, or `URIError` object.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is an error object, else `false`.
	     * @example
	     *
	     * _.isError(new Error);
	     * // => true
	     *
	     * _.isError(Error);
	     * // => false
	     */
	    function isError(value) {
	      return isObjectLike(value) && typeof value.message == 'string' && objToString.call(value) == errorTag;
	    }

	    /**
	     * Checks if `value` is a finite primitive number.
	     *
	     * **Note:** This method is based on [`Number.isFinite`](http://ecma-international.org/ecma-262/6.0/#sec-number.isfinite).
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a finite number, else `false`.
	     * @example
	     *
	     * _.isFinite(10);
	     * // => true
	     *
	     * _.isFinite('10');
	     * // => false
	     *
	     * _.isFinite(true);
	     * // => false
	     *
	     * _.isFinite(Object(10));
	     * // => false
	     *
	     * _.isFinite(Infinity);
	     * // => false
	     */
	    function isFinite(value) {
	      return typeof value == 'number' && nativeIsFinite(value);
	    }

	    /**
	     * Checks if `value` is classified as a `Function` object.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	     * @example
	     *
	     * _.isFunction(_);
	     * // => true
	     *
	     * _.isFunction(/abc/);
	     * // => false
	     */
	    function isFunction(value) {
	      // The use of `Object#toString` avoids issues with the `typeof` operator
	      // in older versions of Chrome and Safari which return 'function' for regexes
	      // and Safari 8 equivalents which return 'object' for typed array constructors.
	      return isObject(value) && objToString.call(value) == funcTag;
	    }

	    /**
	     * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	     * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	     * @example
	     *
	     * _.isObject({});
	     * // => true
	     *
	     * _.isObject([1, 2, 3]);
	     * // => true
	     *
	     * _.isObject(1);
	     * // => false
	     */
	    function isObject(value) {
	      // Avoid a V8 JIT bug in Chrome 19-20.
	      // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	      var type = typeof value;
	      return !!value && (type == 'object' || type == 'function');
	    }

	    /**
	     * Performs a deep comparison between `object` and `source` to determine if
	     * `object` contains equivalent property values. If `customizer` is provided
	     * it is invoked to compare values. If `customizer` returns `undefined`
	     * comparisons are handled by the method instead. The `customizer` is bound
	     * to `thisArg` and invoked with three arguments: (value, other, index|key).
	     *
	     * **Note:** This method supports comparing properties of arrays, booleans,
	     * `Date` objects, numbers, `Object` objects, regexes, and strings. Functions
	     * and DOM nodes are **not** supported. Provide a customizer function to extend
	     * support for comparing other values.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {Object} object The object to inspect.
	     * @param {Object} source The object of property values to match.
	     * @param {Function} [customizer] The function to customize value comparisons.
	     * @param {*} [thisArg] The `this` binding of `customizer`.
	     * @returns {boolean} Returns `true` if `object` is a match, else `false`.
	     * @example
	     *
	     * var object = { 'user': 'fred', 'age': 40 };
	     *
	     * _.isMatch(object, { 'age': 40 });
	     * // => true
	     *
	     * _.isMatch(object, { 'age': 36 });
	     * // => false
	     *
	     * // using a customizer callback
	     * var object = { 'greeting': 'hello' };
	     * var source = { 'greeting': 'hi' };
	     *
	     * _.isMatch(object, source, function(value, other) {
	     *   return _.every([value, other], RegExp.prototype.test, /^h(?:i|ello)$/) || undefined;
	     * });
	     * // => true
	     */
	    function isMatch(object, source, customizer, thisArg) {
	      customizer = typeof customizer == 'function' ? bindCallback(customizer, thisArg, 3) : undefined;
	      return baseIsMatch(object, getMatchData(source), customizer);
	    }

	    /**
	     * Checks if `value` is `NaN`.
	     *
	     * **Note:** This method is not the same as [`isNaN`](https://es5.github.io/#x15.1.2.4)
	     * which returns `true` for `undefined` and other non-numeric values.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
	     * @example
	     *
	     * _.isNaN(NaN);
	     * // => true
	     *
	     * _.isNaN(new Number(NaN));
	     * // => true
	     *
	     * isNaN(undefined);
	     * // => true
	     *
	     * _.isNaN(undefined);
	     * // => false
	     */
	    function isNaN(value) {
	      // An `NaN` primitive is the only value that is not equal to itself.
	      // Perform the `toStringTag` check first to avoid errors with some host objects in IE.
	      return isNumber(value) && value != +value;
	    }

	    /**
	     * Checks if `value` is a native function.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	     * @example
	     *
	     * _.isNative(Array.prototype.push);
	     * // => true
	     *
	     * _.isNative(_);
	     * // => false
	     */
	    function isNative(value) {
	      if (value == null) {
	        return false;
	      }
	      if (isFunction(value)) {
	        return reIsNative.test(fnToString.call(value));
	      }
	      return isObjectLike(value) && reIsHostCtor.test(value);
	    }

	    /**
	     * Checks if `value` is `null`.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is `null`, else `false`.
	     * @example
	     *
	     * _.isNull(null);
	     * // => true
	     *
	     * _.isNull(void 0);
	     * // => false
	     */
	    function isNull(value) {
	      return value === null;
	    }

	    /**
	     * Checks if `value` is classified as a `Number` primitive or object.
	     *
	     * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are classified
	     * as numbers, use the `_.isFinite` method.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	     * @example
	     *
	     * _.isNumber(8.4);
	     * // => true
	     *
	     * _.isNumber(NaN);
	     * // => true
	     *
	     * _.isNumber('8.4');
	     * // => false
	     */
	    function isNumber(value) {
	      return typeof value == 'number' || (isObjectLike(value) && objToString.call(value) == numberTag);
	    }

	    /**
	     * Checks if `value` is a plain object, that is, an object created by the
	     * `Object` constructor or one with a `[[Prototype]]` of `null`.
	     *
	     * **Note:** This method assumes objects created by the `Object` constructor
	     * have no inherited enumerable properties.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
	     * @example
	     *
	     * function Foo() {
	     *   this.a = 1;
	     * }
	     *
	     * _.isPlainObject(new Foo);
	     * // => false
	     *
	     * _.isPlainObject([1, 2, 3]);
	     * // => false
	     *
	     * _.isPlainObject({ 'x': 0, 'y': 0 });
	     * // => true
	     *
	     * _.isPlainObject(Object.create(null));
	     * // => true
	     */
	    function isPlainObject(value) {
	      var Ctor;

	      // Exit early for non `Object` objects.
	      if (!(isObjectLike(value) && objToString.call(value) == objectTag && !isArguments(value)) ||
	          (!hasOwnProperty.call(value, 'constructor') && (Ctor = value.constructor, typeof Ctor == 'function' && !(Ctor instanceof Ctor)))) {
	        return false;
	      }
	      // IE < 9 iterates inherited properties before own properties. If the first
	      // iterated property is an object's own property then there are no inherited
	      // enumerable properties.
	      var result;
	      // In most environments an object's own properties are iterated before
	      // its inherited properties. If the last iterated property is an object's
	      // own property then there are no inherited enumerable properties.
	      baseForIn(value, function(subValue, key) {
	        result = key;
	      });
	      return result === undefined || hasOwnProperty.call(value, result);
	    }

	    /**
	     * Checks if `value` is classified as a `RegExp` object.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	     * @example
	     *
	     * _.isRegExp(/abc/);
	     * // => true
	     *
	     * _.isRegExp('/abc/');
	     * // => false
	     */
	    function isRegExp(value) {
	      return isObject(value) && objToString.call(value) == regexpTag;
	    }

	    /**
	     * Checks if `value` is classified as a `String` primitive or object.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	     * @example
	     *
	     * _.isString('abc');
	     * // => true
	     *
	     * _.isString(1);
	     * // => false
	     */
	    function isString(value) {
	      return typeof value == 'string' || (isObjectLike(value) && objToString.call(value) == stringTag);
	    }

	    /**
	     * Checks if `value` is classified as a typed array.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	     * @example
	     *
	     * _.isTypedArray(new Uint8Array);
	     * // => true
	     *
	     * _.isTypedArray([]);
	     * // => false
	     */
	    function isTypedArray(value) {
	      return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objToString.call(value)];
	    }

	    /**
	     * Checks if `value` is `undefined`.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to check.
	     * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
	     * @example
	     *
	     * _.isUndefined(void 0);
	     * // => true
	     *
	     * _.isUndefined(null);
	     * // => false
	     */
	    function isUndefined(value) {
	      return value === undefined;
	    }

	    /**
	     * Checks if `value` is less than `other`.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to compare.
	     * @param {*} other The other value to compare.
	     * @returns {boolean} Returns `true` if `value` is less than `other`, else `false`.
	     * @example
	     *
	     * _.lt(1, 3);
	     * // => true
	     *
	     * _.lt(3, 3);
	     * // => false
	     *
	     * _.lt(3, 1);
	     * // => false
	     */
	    function lt(value, other) {
	      return value < other;
	    }

	    /**
	     * Checks if `value` is less than or equal to `other`.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to compare.
	     * @param {*} other The other value to compare.
	     * @returns {boolean} Returns `true` if `value` is less than or equal to `other`, else `false`.
	     * @example
	     *
	     * _.lte(1, 3);
	     * // => true
	     *
	     * _.lte(3, 3);
	     * // => true
	     *
	     * _.lte(3, 1);
	     * // => false
	     */
	    function lte(value, other) {
	      return value <= other;
	    }

	    /**
	     * Converts `value` to an array.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to convert.
	     * @returns {Array} Returns the converted array.
	     * @example
	     *
	     * (function() {
	     *   return _.toArray(arguments).slice(1);
	     * }(1, 2, 3));
	     * // => [2, 3]
	     */
	    function toArray(value) {
	      var length = value ? getLength(value) : 0;
	      if (!isLength(length)) {
	        return values(value);
	      }
	      if (!length) {
	        return [];
	      }
	      return arrayCopy(value);
	    }

	    /**
	     * Converts `value` to a plain object flattening inherited enumerable
	     * properties of `value` to own properties of the plain object.
	     *
	     * @static
	     * @memberOf _
	     * @category Lang
	     * @param {*} value The value to convert.
	     * @returns {Object} Returns the converted plain object.
	     * @example
	     *
	     * function Foo() {
	     *   this.b = 2;
	     * }
	     *
	     * Foo.prototype.c = 3;
	     *
	     * _.assign({ 'a': 1 }, new Foo);
	     * // => { 'a': 1, 'b': 2 }
	     *
	     * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
	     * // => { 'a': 1, 'b': 2, 'c': 3 }
	     */
	    function toPlainObject(value) {
	      return baseCopy(value, keysIn(value));
	    }

	    /*------------------------------------------------------------------------*/

	    /**
	     * Recursively merges own enumerable properties of the source object(s), that
	     * don't resolve to `undefined` into the destination object. Subsequent sources
	     * overwrite property assignments of previous sources. If `customizer` is
	     * provided it is invoked to produce the merged values of the destination and
	     * source properties. If `customizer` returns `undefined` merging is handled
	     * by the method instead. The `customizer` is bound to `thisArg` and invoked
	     * with five arguments: (objectValue, sourceValue, key, object, source).
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The destination object.
	     * @param {...Object} [sources] The source objects.
	     * @param {Function} [customizer] The function to customize assigned values.
	     * @param {*} [thisArg] The `this` binding of `customizer`.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * var users = {
	     *   'data': [{ 'user': 'barney' }, { 'user': 'fred' }]
	     * };
	     *
	     * var ages = {
	     *   'data': [{ 'age': 36 }, { 'age': 40 }]
	     * };
	     *
	     * _.merge(users, ages);
	     * // => { 'data': [{ 'user': 'barney', 'age': 36 }, { 'user': 'fred', 'age': 40 }] }
	     *
	     * // using a customizer callback
	     * var object = {
	     *   'fruits': ['apple'],
	     *   'vegetables': ['beet']
	     * };
	     *
	     * var other = {
	     *   'fruits': ['banana'],
	     *   'vegetables': ['carrot']
	     * };
	     *
	     * _.merge(object, other, function(a, b) {
	     *   if (_.isArray(a)) {
	     *     return a.concat(b);
	     *   }
	     * });
	     * // => { 'fruits': ['apple', 'banana'], 'vegetables': ['beet', 'carrot'] }
	     */
	    var merge = createAssigner(baseMerge);

	    /**
	     * Assigns own enumerable properties of source object(s) to the destination
	     * object. Subsequent sources overwrite property assignments of previous sources.
	     * If `customizer` is provided it is invoked to produce the assigned values.
	     * The `customizer` is bound to `thisArg` and invoked with five arguments:
	     * (objectValue, sourceValue, key, object, source).
	     *
	     * **Note:** This method mutates `object` and is based on
	     * [`Object.assign`](http://ecma-international.org/ecma-262/6.0/#sec-object.assign).
	     *
	     * @static
	     * @memberOf _
	     * @alias extend
	     * @category Object
	     * @param {Object} object The destination object.
	     * @param {...Object} [sources] The source objects.
	     * @param {Function} [customizer] The function to customize assigned values.
	     * @param {*} [thisArg] The `this` binding of `customizer`.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * _.assign({ 'user': 'barney' }, { 'age': 40 }, { 'user': 'fred' });
	     * // => { 'user': 'fred', 'age': 40 }
	     *
	     * // using a customizer callback
	     * var defaults = _.partialRight(_.assign, function(value, other) {
	     *   return _.isUndefined(value) ? other : value;
	     * });
	     *
	     * defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred' });
	     * // => { 'user': 'barney', 'age': 36 }
	     */
	    var assign = createAssigner(function(object, source, customizer) {
	      return customizer
	        ? assignWith(object, source, customizer)
	        : baseAssign(object, source);
	    });

	    /**
	     * Creates an object that inherits from the given `prototype` object. If a
	     * `properties` object is provided its own enumerable properties are assigned
	     * to the created object.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} prototype The object to inherit from.
	     * @param {Object} [properties] The properties to assign to the object.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {Object} Returns the new object.
	     * @example
	     *
	     * function Shape() {
	     *   this.x = 0;
	     *   this.y = 0;
	     * }
	     *
	     * function Circle() {
	     *   Shape.call(this);
	     * }
	     *
	     * Circle.prototype = _.create(Shape.prototype, {
	     *   'constructor': Circle
	     * });
	     *
	     * var circle = new Circle;
	     * circle instanceof Circle;
	     * // => true
	     *
	     * circle instanceof Shape;
	     * // => true
	     */
	    function create(prototype, properties, guard) {
	      var result = baseCreate(prototype);
	      if (guard && isIterateeCall(prototype, properties, guard)) {
	        properties = undefined;
	      }
	      return properties ? baseAssign(result, properties) : result;
	    }

	    /**
	     * Assigns own enumerable properties of source object(s) to the destination
	     * object for all destination properties that resolve to `undefined`. Once a
	     * property is set, additional values of the same property are ignored.
	     *
	     * **Note:** This method mutates `object`.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The destination object.
	     * @param {...Object} [sources] The source objects.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * _.defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred' });
	     * // => { 'user': 'barney', 'age': 36 }
	     */
	    var defaults = createDefaults(assign, assignDefaults);

	    /**
	     * This method is like `_.defaults` except that it recursively assigns
	     * default properties.
	     *
	     * **Note:** This method mutates `object`.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The destination object.
	     * @param {...Object} [sources] The source objects.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * _.defaultsDeep({ 'user': { 'name': 'barney' } }, { 'user': { 'name': 'fred', 'age': 36 } });
	     * // => { 'user': { 'name': 'barney', 'age': 36 } }
	     *
	     */
	    var defaultsDeep = createDefaults(merge, mergeDefaults);

	    /**
	     * This method is like `_.find` except that it returns the key of the first
	     * element `predicate` returns truthy for instead of the element itself.
	     *
	     * If a property name is provided for `predicate` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `predicate` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to search.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {string|undefined} Returns the key of the matched element, else `undefined`.
	     * @example
	     *
	     * var users = {
	     *   'barney':  { 'age': 36, 'active': true },
	     *   'fred':    { 'age': 40, 'active': false },
	     *   'pebbles': { 'age': 1,  'active': true }
	     * };
	     *
	     * _.findKey(users, function(chr) {
	     *   return chr.age < 40;
	     * });
	     * // => 'barney' (iteration order is not guaranteed)
	     *
	     * // using the `_.matches` callback shorthand
	     * _.findKey(users, { 'age': 1, 'active': true });
	     * // => 'pebbles'
	     *
	     * // using the `_.matchesProperty` callback shorthand
	     * _.findKey(users, 'active', false);
	     * // => 'fred'
	     *
	     * // using the `_.property` callback shorthand
	     * _.findKey(users, 'active');
	     * // => 'barney'
	     */
	    var findKey = createFindKey(baseForOwn);

	    /**
	     * This method is like `_.findKey` except that it iterates over elements of
	     * a collection in the opposite order.
	     *
	     * If a property name is provided for `predicate` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `predicate` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to search.
	     * @param {Function|Object|string} [predicate=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {string|undefined} Returns the key of the matched element, else `undefined`.
	     * @example
	     *
	     * var users = {
	     *   'barney':  { 'age': 36, 'active': true },
	     *   'fred':    { 'age': 40, 'active': false },
	     *   'pebbles': { 'age': 1,  'active': true }
	     * };
	     *
	     * _.findLastKey(users, function(chr) {
	     *   return chr.age < 40;
	     * });
	     * // => returns `pebbles` assuming `_.findKey` returns `barney`
	     *
	     * // using the `_.matches` callback shorthand
	     * _.findLastKey(users, { 'age': 36, 'active': true });
	     * // => 'barney'
	     *
	     * // using the `_.matchesProperty` callback shorthand
	     * _.findLastKey(users, 'active', false);
	     * // => 'fred'
	     *
	     * // using the `_.property` callback shorthand
	     * _.findLastKey(users, 'active');
	     * // => 'pebbles'
	     */
	    var findLastKey = createFindKey(baseForOwnRight);

	    /**
	     * Iterates over own and inherited enumerable properties of an object invoking
	     * `iteratee` for each property. The `iteratee` is bound to `thisArg` and invoked
	     * with three arguments: (value, key, object). Iteratee functions may exit
	     * iteration early by explicitly returning `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * function Foo() {
	     *   this.a = 1;
	     *   this.b = 2;
	     * }
	     *
	     * Foo.prototype.c = 3;
	     *
	     * _.forIn(new Foo, function(value, key) {
	     *   console.log(key);
	     * });
	     * // => logs 'a', 'b', and 'c' (iteration order is not guaranteed)
	     */
	    var forIn = createForIn(baseFor);

	    /**
	     * This method is like `_.forIn` except that it iterates over properties of
	     * `object` in the opposite order.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * function Foo() {
	     *   this.a = 1;
	     *   this.b = 2;
	     * }
	     *
	     * Foo.prototype.c = 3;
	     *
	     * _.forInRight(new Foo, function(value, key) {
	     *   console.log(key);
	     * });
	     * // => logs 'c', 'b', and 'a' assuming `_.forIn ` logs 'a', 'b', and 'c'
	     */
	    var forInRight = createForIn(baseForRight);

	    /**
	     * Iterates over own enumerable properties of an object invoking `iteratee`
	     * for each property. The `iteratee` is bound to `thisArg` and invoked with
	     * three arguments: (value, key, object). Iteratee functions may exit iteration
	     * early by explicitly returning `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * function Foo() {
	     *   this.a = 1;
	     *   this.b = 2;
	     * }
	     *
	     * Foo.prototype.c = 3;
	     *
	     * _.forOwn(new Foo, function(value, key) {
	     *   console.log(key);
	     * });
	     * // => logs 'a' and 'b' (iteration order is not guaranteed)
	     */
	    var forOwn = createForOwn(baseForOwn);

	    /**
	     * This method is like `_.forOwn` except that it iterates over properties of
	     * `object` in the opposite order.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * function Foo() {
	     *   this.a = 1;
	     *   this.b = 2;
	     * }
	     *
	     * Foo.prototype.c = 3;
	     *
	     * _.forOwnRight(new Foo, function(value, key) {
	     *   console.log(key);
	     * });
	     * // => logs 'b' and 'a' assuming `_.forOwn` logs 'a' and 'b'
	     */
	    var forOwnRight = createForOwn(baseForOwnRight);

	    /**
	     * Creates an array of function property names from all enumerable properties,
	     * own and inherited, of `object`.
	     *
	     * @static
	     * @memberOf _
	     * @alias methods
	     * @category Object
	     * @param {Object} object The object to inspect.
	     * @returns {Array} Returns the new array of property names.
	     * @example
	     *
	     * _.functions(_);
	     * // => ['after', 'ary', 'assign', ...]
	     */
	    function functions(object) {
	      return baseFunctions(object, keysIn(object));
	    }

	    /**
	     * Gets the property value at `path` of `object`. If the resolved value is
	     * `undefined` the `defaultValue` is used in its place.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to query.
	     * @param {Array|string} path The path of the property to get.
	     * @param {*} [defaultValue] The value returned if the resolved value is `undefined`.
	     * @returns {*} Returns the resolved value.
	     * @example
	     *
	     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
	     *
	     * _.get(object, 'a[0].b.c');
	     * // => 3
	     *
	     * _.get(object, ['a', '0', 'b', 'c']);
	     * // => 3
	     *
	     * _.get(object, 'a.b.c', 'default');
	     * // => 'default'
	     */
	    function get(object, path, defaultValue) {
	      var result = object == null ? undefined : baseGet(object, toPath(path), path + '');
	      return result === undefined ? defaultValue : result;
	    }

	    /**
	     * Checks if `path` is a direct property.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to query.
	     * @param {Array|string} path The path to check.
	     * @returns {boolean} Returns `true` if `path` is a direct property, else `false`.
	     * @example
	     *
	     * var object = { 'a': { 'b': { 'c': 3 } } };
	     *
	     * _.has(object, 'a');
	     * // => true
	     *
	     * _.has(object, 'a.b.c');
	     * // => true
	     *
	     * _.has(object, ['a', 'b', 'c']);
	     * // => true
	     */
	    function has(object, path) {
	      if (object == null) {
	        return false;
	      }
	      var result = hasOwnProperty.call(object, path);
	      if (!result && !isKey(path)) {
	        path = toPath(path);
	        object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
	        if (object == null) {
	          return false;
	        }
	        path = last(path);
	        result = hasOwnProperty.call(object, path);
	      }
	      return result || (isLength(object.length) && isIndex(path, object.length) &&
	        (isArray(object) || isArguments(object)));
	    }

	    /**
	     * Creates an object composed of the inverted keys and values of `object`.
	     * If `object` contains duplicate values, subsequent values overwrite property
	     * assignments of previous values unless `multiValue` is `true`.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to invert.
	     * @param {boolean} [multiValue] Allow multiple values per key.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {Object} Returns the new inverted object.
	     * @example
	     *
	     * var object = { 'a': 1, 'b': 2, 'c': 1 };
	     *
	     * _.invert(object);
	     * // => { '1': 'c', '2': 'b' }
	     *
	     * // with `multiValue`
	     * _.invert(object, true);
	     * // => { '1': ['a', 'c'], '2': ['b'] }
	     */
	    function invert(object, multiValue, guard) {
	      if (guard && isIterateeCall(object, multiValue, guard)) {
	        multiValue = undefined;
	      }
	      var index = -1,
	          props = keys(object),
	          length = props.length,
	          result = {};

	      while (++index < length) {
	        var key = props[index],
	            value = object[key];

	        if (multiValue) {
	          if (hasOwnProperty.call(result, value)) {
	            result[value].push(key);
	          } else {
	            result[value] = [key];
	          }
	        }
	        else {
	          result[value] = key;
	        }
	      }
	      return result;
	    }

	    /**
	     * Creates an array of the own enumerable property names of `object`.
	     *
	     * **Note:** Non-object values are coerced to objects. See the
	     * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
	     * for more details.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to query.
	     * @returns {Array} Returns the array of property names.
	     * @example
	     *
	     * function Foo() {
	     *   this.a = 1;
	     *   this.b = 2;
	     * }
	     *
	     * Foo.prototype.c = 3;
	     *
	     * _.keys(new Foo);
	     * // => ['a', 'b'] (iteration order is not guaranteed)
	     *
	     * _.keys('hi');
	     * // => ['0', '1']
	     */
	    var keys = !nativeKeys ? shimKeys : function(object) {
	      var Ctor = object == null ? undefined : object.constructor;
	      if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
	          (typeof object != 'function' && isArrayLike(object))) {
	        return shimKeys(object);
	      }
	      return isObject(object) ? nativeKeys(object) : [];
	    };

	    /**
	     * Creates an array of the own and inherited enumerable property names of `object`.
	     *
	     * **Note:** Non-object values are coerced to objects.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to query.
	     * @returns {Array} Returns the array of property names.
	     * @example
	     *
	     * function Foo() {
	     *   this.a = 1;
	     *   this.b = 2;
	     * }
	     *
	     * Foo.prototype.c = 3;
	     *
	     * _.keysIn(new Foo);
	     * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	     */
	    function keysIn(object) {
	      if (object == null) {
	        return [];
	      }
	      if (!isObject(object)) {
	        object = Object(object);
	      }
	      var length = object.length;
	      length = (length && isLength(length) &&
	        (isArray(object) || isArguments(object)) && length) || 0;

	      var Ctor = object.constructor,
	          index = -1,
	          isProto = typeof Ctor == 'function' && Ctor.prototype === object,
	          result = Array(length),
	          skipIndexes = length > 0;

	      while (++index < length) {
	        result[index] = (index + '');
	      }
	      for (var key in object) {
	        if (!(skipIndexes && isIndex(key, length)) &&
	            !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	          result.push(key);
	        }
	      }
	      return result;
	    }

	    /**
	     * The opposite of `_.mapValues`; this method creates an object with the
	     * same values as `object` and keys generated by running each own enumerable
	     * property of `object` through `iteratee`.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to iterate over.
	     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Object} Returns the new mapped object.
	     * @example
	     *
	     * _.mapKeys({ 'a': 1, 'b': 2 }, function(value, key) {
	     *   return key + value;
	     * });
	     * // => { 'a1': 1, 'b2': 2 }
	     */
	    var mapKeys = createObjectMapper(true);

	    /**
	     * Creates an object with the same keys as `object` and values generated by
	     * running each own enumerable property of `object` through `iteratee`. The
	     * iteratee function is bound to `thisArg` and invoked with three arguments:
	     * (value, key, object).
	     *
	     * If a property name is provided for `iteratee` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `iteratee` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to iterate over.
	     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
	     *  per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Object} Returns the new mapped object.
	     * @example
	     *
	     * _.mapValues({ 'a': 1, 'b': 2 }, function(n) {
	     *   return n * 3;
	     * });
	     * // => { 'a': 3, 'b': 6 }
	     *
	     * var users = {
	     *   'fred':    { 'user': 'fred',    'age': 40 },
	     *   'pebbles': { 'user': 'pebbles', 'age': 1 }
	     * };
	     *
	     * // using the `_.property` callback shorthand
	     * _.mapValues(users, 'age');
	     * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
	     */
	    var mapValues = createObjectMapper();

	    /**
	     * The opposite of `_.pick`; this method creates an object composed of the
	     * own and inherited enumerable properties of `object` that are not omitted.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The source object.
	     * @param {Function|...(string|string[])} [predicate] The function invoked per
	     *  iteration or property names to omit, specified as individual property
	     *  names or arrays of property names.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {Object} Returns the new object.
	     * @example
	     *
	     * var object = { 'user': 'fred', 'age': 40 };
	     *
	     * _.omit(object, 'age');
	     * // => { 'user': 'fred' }
	     *
	     * _.omit(object, _.isNumber);
	     * // => { 'user': 'fred' }
	     */
	    var omit = restParam(function(object, props) {
	      if (object == null) {
	        return {};
	      }
	      if (typeof props[0] != 'function') {
	        var props = arrayMap(baseFlatten(props), String);
	        return pickByArray(object, baseDifference(keysIn(object), props));
	      }
	      var predicate = bindCallback(props[0], props[1], 3);
	      return pickByCallback(object, function(value, key, object) {
	        return !predicate(value, key, object);
	      });
	    });

	    /**
	     * Creates a two dimensional array of the key-value pairs for `object`,
	     * e.g. `[[key1, value1], [key2, value2]]`.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to query.
	     * @returns {Array} Returns the new array of key-value pairs.
	     * @example
	     *
	     * _.pairs({ 'barney': 36, 'fred': 40 });
	     * // => [['barney', 36], ['fred', 40]] (iteration order is not guaranteed)
	     */
	    function pairs(object) {
	      object = toObject(object);

	      var index = -1,
	          props = keys(object),
	          length = props.length,
	          result = Array(length);

	      while (++index < length) {
	        var key = props[index];
	        result[index] = [key, object[key]];
	      }
	      return result;
	    }

	    /**
	     * Creates an object composed of the picked `object` properties. Property
	     * names may be specified as individual arguments or as arrays of property
	     * names. If `predicate` is provided it is invoked for each property of `object`
	     * picking the properties `predicate` returns truthy for. The predicate is
	     * bound to `thisArg` and invoked with three arguments: (value, key, object).
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The source object.
	     * @param {Function|...(string|string[])} [predicate] The function invoked per
	     *  iteration or property names to pick, specified as individual property
	     *  names or arrays of property names.
	     * @param {*} [thisArg] The `this` binding of `predicate`.
	     * @returns {Object} Returns the new object.
	     * @example
	     *
	     * var object = { 'user': 'fred', 'age': 40 };
	     *
	     * _.pick(object, 'user');
	     * // => { 'user': 'fred' }
	     *
	     * _.pick(object, _.isString);
	     * // => { 'user': 'fred' }
	     */
	    var pick = restParam(function(object, props) {
	      if (object == null) {
	        return {};
	      }
	      return typeof props[0] == 'function'
	        ? pickByCallback(object, bindCallback(props[0], props[1], 3))
	        : pickByArray(object, baseFlatten(props));
	    });

	    /**
	     * This method is like `_.get` except that if the resolved value is a function
	     * it is invoked with the `this` binding of its parent object and its result
	     * is returned.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to query.
	     * @param {Array|string} path The path of the property to resolve.
	     * @param {*} [defaultValue] The value returned if the resolved value is `undefined`.
	     * @returns {*} Returns the resolved value.
	     * @example
	     *
	     * var object = { 'a': [{ 'b': { 'c1': 3, 'c2': _.constant(4) } }] };
	     *
	     * _.result(object, 'a[0].b.c1');
	     * // => 3
	     *
	     * _.result(object, 'a[0].b.c2');
	     * // => 4
	     *
	     * _.result(object, 'a.b.c', 'default');
	     * // => 'default'
	     *
	     * _.result(object, 'a.b.c', _.constant('default'));
	     * // => 'default'
	     */
	    function result(object, path, defaultValue) {
	      var result = object == null ? undefined : object[path];
	      if (result === undefined) {
	        if (object != null && !isKey(path, object)) {
	          path = toPath(path);
	          object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
	          result = object == null ? undefined : object[last(path)];
	        }
	        result = result === undefined ? defaultValue : result;
	      }
	      return isFunction(result) ? result.call(object) : result;
	    }

	    /**
	     * Sets the property value of `path` on `object`. If a portion of `path`
	     * does not exist it is created.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to augment.
	     * @param {Array|string} path The path of the property to set.
	     * @param {*} value The value to set.
	     * @returns {Object} Returns `object`.
	     * @example
	     *
	     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
	     *
	     * _.set(object, 'a[0].b.c', 4);
	     * console.log(object.a[0].b.c);
	     * // => 4
	     *
	     * _.set(object, 'x[0].y.z', 5);
	     * console.log(object.x[0].y.z);
	     * // => 5
	     */
	    function set(object, path, value) {
	      if (object == null) {
	        return object;
	      }
	      var pathKey = (path + '');
	      path = (object[pathKey] != null || isKey(path, object)) ? [pathKey] : toPath(path);

	      var index = -1,
	          length = path.length,
	          lastIndex = length - 1,
	          nested = object;

	      while (nested != null && ++index < length) {
	        var key = path[index];
	        if (isObject(nested)) {
	          if (index == lastIndex) {
	            nested[key] = value;
	          } else if (nested[key] == null) {
	            nested[key] = isIndex(path[index + 1]) ? [] : {};
	          }
	        }
	        nested = nested[key];
	      }
	      return object;
	    }

	    /**
	     * An alternative to `_.reduce`; this method transforms `object` to a new
	     * `accumulator` object which is the result of running each of its own enumerable
	     * properties through `iteratee`, with each invocation potentially mutating
	     * the `accumulator` object. The `iteratee` is bound to `thisArg` and invoked
	     * with four arguments: (accumulator, value, key, object). Iteratee functions
	     * may exit iteration early by explicitly returning `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Array|Object} object The object to iterate over.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @param {*} [accumulator] The custom accumulator value.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {*} Returns the accumulated value.
	     * @example
	     *
	     * _.transform([2, 3, 4], function(result, n) {
	     *   result.push(n *= n);
	     *   return n % 2 == 0;
	     * });
	     * // => [4, 9]
	     *
	     * _.transform({ 'a': 1, 'b': 2 }, function(result, n, key) {
	     *   result[key] = n * 3;
	     * });
	     * // => { 'a': 3, 'b': 6 }
	     */
	    function transform(object, iteratee, accumulator, thisArg) {
	      var isArr = isArray(object) || isTypedArray(object);
	      iteratee = getCallback(iteratee, thisArg, 4);

	      if (accumulator == null) {
	        if (isArr || isObject(object)) {
	          var Ctor = object.constructor;
	          if (isArr) {
	            accumulator = isArray(object) ? new Ctor : [];
	          } else {
	            accumulator = baseCreate(isFunction(Ctor) ? Ctor.prototype : undefined);
	          }
	        } else {
	          accumulator = {};
	        }
	      }
	      (isArr ? arrayEach : baseForOwn)(object, function(value, index, object) {
	        return iteratee(accumulator, value, index, object);
	      });
	      return accumulator;
	    }

	    /**
	     * Creates an array of the own enumerable property values of `object`.
	     *
	     * **Note:** Non-object values are coerced to objects.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to query.
	     * @returns {Array} Returns the array of property values.
	     * @example
	     *
	     * function Foo() {
	     *   this.a = 1;
	     *   this.b = 2;
	     * }
	     *
	     * Foo.prototype.c = 3;
	     *
	     * _.values(new Foo);
	     * // => [1, 2] (iteration order is not guaranteed)
	     *
	     * _.values('hi');
	     * // => ['h', 'i']
	     */
	    function values(object) {
	      return baseValues(object, keys(object));
	    }

	    /**
	     * Creates an array of the own and inherited enumerable property values
	     * of `object`.
	     *
	     * **Note:** Non-object values are coerced to objects.
	     *
	     * @static
	     * @memberOf _
	     * @category Object
	     * @param {Object} object The object to query.
	     * @returns {Array} Returns the array of property values.
	     * @example
	     *
	     * function Foo() {
	     *   this.a = 1;
	     *   this.b = 2;
	     * }
	     *
	     * Foo.prototype.c = 3;
	     *
	     * _.valuesIn(new Foo);
	     * // => [1, 2, 3] (iteration order is not guaranteed)
	     */
	    function valuesIn(object) {
	      return baseValues(object, keysIn(object));
	    }

	    /*------------------------------------------------------------------------*/

	    /**
	     * Checks if `n` is between `start` and up to but not including, `end`. If
	     * `end` is not specified it is set to `start` with `start` then set to `0`.
	     *
	     * @static
	     * @memberOf _
	     * @category Number
	     * @param {number} n The number to check.
	     * @param {number} [start=0] The start of the range.
	     * @param {number} end The end of the range.
	     * @returns {boolean} Returns `true` if `n` is in the range, else `false`.
	     * @example
	     *
	     * _.inRange(3, 2, 4);
	     * // => true
	     *
	     * _.inRange(4, 8);
	     * // => true
	     *
	     * _.inRange(4, 2);
	     * // => false
	     *
	     * _.inRange(2, 2);
	     * // => false
	     *
	     * _.inRange(1.2, 2);
	     * // => true
	     *
	     * _.inRange(5.2, 4);
	     * // => false
	     */
	    function inRange(value, start, end) {
	      start = +start || 0;
	      if (end === undefined) {
	        end = start;
	        start = 0;
	      } else {
	        end = +end || 0;
	      }
	      return value >= nativeMin(start, end) && value < nativeMax(start, end);
	    }

	    /**
	     * Produces a random number between `min` and `max` (inclusive). If only one
	     * argument is provided a number between `0` and the given number is returned.
	     * If `floating` is `true`, or either `min` or `max` are floats, a floating-point
	     * number is returned instead of an integer.
	     *
	     * @static
	     * @memberOf _
	     * @category Number
	     * @param {number} [min=0] The minimum possible value.
	     * @param {number} [max=1] The maximum possible value.
	     * @param {boolean} [floating] Specify returning a floating-point number.
	     * @returns {number} Returns the random number.
	     * @example
	     *
	     * _.random(0, 5);
	     * // => an integer between 0 and 5
	     *
	     * _.random(5);
	     * // => also an integer between 0 and 5
	     *
	     * _.random(5, true);
	     * // => a floating-point number between 0 and 5
	     *
	     * _.random(1.2, 5.2);
	     * // => a floating-point number between 1.2 and 5.2
	     */
	    function random(min, max, floating) {
	      if (floating && isIterateeCall(min, max, floating)) {
	        max = floating = undefined;
	      }
	      var noMin = min == null,
	          noMax = max == null;

	      if (floating == null) {
	        if (noMax && typeof min == 'boolean') {
	          floating = min;
	          min = 1;
	        }
	        else if (typeof max == 'boolean') {
	          floating = max;
	          noMax = true;
	        }
	      }
	      if (noMin && noMax) {
	        max = 1;
	        noMax = false;
	      }
	      min = +min || 0;
	      if (noMax) {
	        max = min;
	        min = 0;
	      } else {
	        max = +max || 0;
	      }
	      if (floating || min % 1 || max % 1) {
	        var rand = nativeRandom();
	        return nativeMin(min + (rand * (max - min + parseFloat('1e-' + ((rand + '').length - 1)))), max);
	      }
	      return baseRandom(min, max);
	    }

	    /*------------------------------------------------------------------------*/

	    /**
	     * Converts `string` to [camel case](https://en.wikipedia.org/wiki/CamelCase).
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to convert.
	     * @returns {string} Returns the camel cased string.
	     * @example
	     *
	     * _.camelCase('Foo Bar');
	     * // => 'fooBar'
	     *
	     * _.camelCase('--foo-bar');
	     * // => 'fooBar'
	     *
	     * _.camelCase('__foo_bar__');
	     * // => 'fooBar'
	     */
	    var camelCase = createCompounder(function(result, word, index) {
	      word = word.toLowerCase();
	      return result + (index ? (word.charAt(0).toUpperCase() + word.slice(1)) : word);
	    });

	    /**
	     * Capitalizes the first character of `string`.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to capitalize.
	     * @returns {string} Returns the capitalized string.
	     * @example
	     *
	     * _.capitalize('fred');
	     * // => 'Fred'
	     */
	    function capitalize(string) {
	      string = baseToString(string);
	      return string && (string.charAt(0).toUpperCase() + string.slice(1));
	    }

	    /**
	     * Deburrs `string` by converting [latin-1 supplementary letters](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
	     * to basic latin letters and removing [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to deburr.
	     * @returns {string} Returns the deburred string.
	     * @example
	     *
	     * _.deburr('déjà vu');
	     * // => 'deja vu'
	     */
	    function deburr(string) {
	      string = baseToString(string);
	      return string && string.replace(reLatin1, deburrLetter).replace(reComboMark, '');
	    }

	    /**
	     * Checks if `string` ends with the given target string.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to search.
	     * @param {string} [target] The string to search for.
	     * @param {number} [position=string.length] The position to search from.
	     * @returns {boolean} Returns `true` if `string` ends with `target`, else `false`.
	     * @example
	     *
	     * _.endsWith('abc', 'c');
	     * // => true
	     *
	     * _.endsWith('abc', 'b');
	     * // => false
	     *
	     * _.endsWith('abc', 'b', 2);
	     * // => true
	     */
	    function endsWith(string, target, position) {
	      string = baseToString(string);
	      target = (target + '');

	      var length = string.length;
	      position = position === undefined
	        ? length
	        : nativeMin(position < 0 ? 0 : (+position || 0), length);

	      position -= target.length;
	      return position >= 0 && string.indexOf(target, position) == position;
	    }

	    /**
	     * Converts the characters "&", "<", ">", '"', "'", and "\`", in `string` to
	     * their corresponding HTML entities.
	     *
	     * **Note:** No other characters are escaped. To escape additional characters
	     * use a third-party library like [_he_](https://mths.be/he).
	     *
	     * Though the ">" character is escaped for symmetry, characters like
	     * ">" and "/" don't need escaping in HTML and have no special meaning
	     * unless they're part of a tag or unquoted attribute value.
	     * See [Mathias Bynens's article](https://mathiasbynens.be/notes/ambiguous-ampersands)
	     * (under "semi-related fun fact") for more details.
	     *
	     * Backticks are escaped because in Internet Explorer < 9, they can break out
	     * of attribute values or HTML comments. See [#59](https://html5sec.org/#59),
	     * [#102](https://html5sec.org/#102), [#108](https://html5sec.org/#108), and
	     * [#133](https://html5sec.org/#133) of the [HTML5 Security Cheatsheet](https://html5sec.org/)
	     * for more details.
	     *
	     * When working with HTML you should always [quote attribute values](http://wonko.com/post/html-escaping)
	     * to reduce XSS vectors.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to escape.
	     * @returns {string} Returns the escaped string.
	     * @example
	     *
	     * _.escape('fred, barney, & pebbles');
	     * // => 'fred, barney, &amp; pebbles'
	     */
	    function escape(string) {
	      // Reset `lastIndex` because in IE < 9 `String#replace` does not.
	      string = baseToString(string);
	      return (string && reHasUnescapedHtml.test(string))
	        ? string.replace(reUnescapedHtml, escapeHtmlChar)
	        : string;
	    }

	    /**
	     * Escapes the `RegExp` special characters "\", "/", "^", "$", ".", "|", "?",
	     * "*", "+", "(", ")", "[", "]", "{" and "}" in `string`.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to escape.
	     * @returns {string} Returns the escaped string.
	     * @example
	     *
	     * _.escapeRegExp('[lodash](https://lodash.com/)');
	     * // => '\[lodash\]\(https:\/\/lodash\.com\/\)'
	     */
	    function escapeRegExp(string) {
	      string = baseToString(string);
	      return (string && reHasRegExpChars.test(string))
	        ? string.replace(reRegExpChars, escapeRegExpChar)
	        : (string || '(?:)');
	    }

	    /**
	     * Converts `string` to [kebab case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to convert.
	     * @returns {string} Returns the kebab cased string.
	     * @example
	     *
	     * _.kebabCase('Foo Bar');
	     * // => 'foo-bar'
	     *
	     * _.kebabCase('fooBar');
	     * // => 'foo-bar'
	     *
	     * _.kebabCase('__foo_bar__');
	     * // => 'foo-bar'
	     */
	    var kebabCase = createCompounder(function(result, word, index) {
	      return result + (index ? '-' : '') + word.toLowerCase();
	    });

	    /**
	     * Pads `string` on the left and right sides if it's shorter than `length`.
	     * Padding characters are truncated if they can't be evenly divided by `length`.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to pad.
	     * @param {number} [length=0] The padding length.
	     * @param {string} [chars=' '] The string used as padding.
	     * @returns {string} Returns the padded string.
	     * @example
	     *
	     * _.pad('abc', 8);
	     * // => '  abc   '
	     *
	     * _.pad('abc', 8, '_-');
	     * // => '_-abc_-_'
	     *
	     * _.pad('abc', 3);
	     * // => 'abc'
	     */
	    function pad(string, length, chars) {
	      string = baseToString(string);
	      length = +length;

	      var strLength = string.length;
	      if (strLength >= length || !nativeIsFinite(length)) {
	        return string;
	      }
	      var mid = (length - strLength) / 2,
	          leftLength = nativeFloor(mid),
	          rightLength = nativeCeil(mid);

	      chars = createPadding('', rightLength, chars);
	      return chars.slice(0, leftLength) + string + chars;
	    }

	    /**
	     * Pads `string` on the left side if it's shorter than `length`. Padding
	     * characters are truncated if they exceed `length`.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to pad.
	     * @param {number} [length=0] The padding length.
	     * @param {string} [chars=' '] The string used as padding.
	     * @returns {string} Returns the padded string.
	     * @example
	     *
	     * _.padLeft('abc', 6);
	     * // => '   abc'
	     *
	     * _.padLeft('abc', 6, '_-');
	     * // => '_-_abc'
	     *
	     * _.padLeft('abc', 3);
	     * // => 'abc'
	     */
	    var padLeft = createPadDir();

	    /**
	     * Pads `string` on the right side if it's shorter than `length`. Padding
	     * characters are truncated if they exceed `length`.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to pad.
	     * @param {number} [length=0] The padding length.
	     * @param {string} [chars=' '] The string used as padding.
	     * @returns {string} Returns the padded string.
	     * @example
	     *
	     * _.padRight('abc', 6);
	     * // => 'abc   '
	     *
	     * _.padRight('abc', 6, '_-');
	     * // => 'abc_-_'
	     *
	     * _.padRight('abc', 3);
	     * // => 'abc'
	     */
	    var padRight = createPadDir(true);

	    /**
	     * Converts `string` to an integer of the specified radix. If `radix` is
	     * `undefined` or `0`, a `radix` of `10` is used unless `value` is a hexadecimal,
	     * in which case a `radix` of `16` is used.
	     *
	     * **Note:** This method aligns with the [ES5 implementation](https://es5.github.io/#E)
	     * of `parseInt`.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} string The string to convert.
	     * @param {number} [radix] The radix to interpret `value` by.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {number} Returns the converted integer.
	     * @example
	     *
	     * _.parseInt('08');
	     * // => 8
	     *
	     * _.map(['6', '08', '10'], _.parseInt);
	     * // => [6, 8, 10]
	     */
	    function parseInt(string, radix, guard) {
	      // Firefox < 21 and Opera < 15 follow ES3 for `parseInt`.
	      // Chrome fails to trim leading <BOM> whitespace characters.
	      // See https://code.google.com/p/v8/issues/detail?id=3109 for more details.
	      if (guard ? isIterateeCall(string, radix, guard) : radix == null) {
	        radix = 0;
	      } else if (radix) {
	        radix = +radix;
	      }
	      string = trim(string);
	      return nativeParseInt(string, radix || (reHasHexPrefix.test(string) ? 16 : 10));
	    }

	    /**
	     * Repeats the given string `n` times.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to repeat.
	     * @param {number} [n=0] The number of times to repeat the string.
	     * @returns {string} Returns the repeated string.
	     * @example
	     *
	     * _.repeat('*', 3);
	     * // => '***'
	     *
	     * _.repeat('abc', 2);
	     * // => 'abcabc'
	     *
	     * _.repeat('abc', 0);
	     * // => ''
	     */
	    function repeat(string, n) {
	      var result = '';
	      string = baseToString(string);
	      n = +n;
	      if (n < 1 || !string || !nativeIsFinite(n)) {
	        return result;
	      }
	      // Leverage the exponentiation by squaring algorithm for a faster repeat.
	      // See https://en.wikipedia.org/wiki/Exponentiation_by_squaring for more details.
	      do {
	        if (n % 2) {
	          result += string;
	        }
	        n = nativeFloor(n / 2);
	        string += string;
	      } while (n);

	      return result;
	    }

	    /**
	     * Converts `string` to [snake case](https://en.wikipedia.org/wiki/Snake_case).
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to convert.
	     * @returns {string} Returns the snake cased string.
	     * @example
	     *
	     * _.snakeCase('Foo Bar');
	     * // => 'foo_bar'
	     *
	     * _.snakeCase('fooBar');
	     * // => 'foo_bar'
	     *
	     * _.snakeCase('--foo-bar');
	     * // => 'foo_bar'
	     */
	    var snakeCase = createCompounder(function(result, word, index) {
	      return result + (index ? '_' : '') + word.toLowerCase();
	    });

	    /**
	     * Converts `string` to [start case](https://en.wikipedia.org/wiki/Letter_case#Stylistic_or_specialised_usage).
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to convert.
	     * @returns {string} Returns the start cased string.
	     * @example
	     *
	     * _.startCase('--foo-bar');
	     * // => 'Foo Bar'
	     *
	     * _.startCase('fooBar');
	     * // => 'Foo Bar'
	     *
	     * _.startCase('__foo_bar__');
	     * // => 'Foo Bar'
	     */
	    var startCase = createCompounder(function(result, word, index) {
	      return result + (index ? ' ' : '') + (word.charAt(0).toUpperCase() + word.slice(1));
	    });

	    /**
	     * Checks if `string` starts with the given target string.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to search.
	     * @param {string} [target] The string to search for.
	     * @param {number} [position=0] The position to search from.
	     * @returns {boolean} Returns `true` if `string` starts with `target`, else `false`.
	     * @example
	     *
	     * _.startsWith('abc', 'a');
	     * // => true
	     *
	     * _.startsWith('abc', 'b');
	     * // => false
	     *
	     * _.startsWith('abc', 'b', 1);
	     * // => true
	     */
	    function startsWith(string, target, position) {
	      string = baseToString(string);
	      position = position == null
	        ? 0
	        : nativeMin(position < 0 ? 0 : (+position || 0), string.length);

	      return string.lastIndexOf(target, position) == position;
	    }

	    /**
	     * Creates a compiled template function that can interpolate data properties
	     * in "interpolate" delimiters, HTML-escape interpolated data properties in
	     * "escape" delimiters, and execute JavaScript in "evaluate" delimiters. Data
	     * properties may be accessed as free variables in the template. If a setting
	     * object is provided it takes precedence over `_.templateSettings` values.
	     *
	     * **Note:** In the development build `_.template` utilizes
	     * [sourceURLs](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl)
	     * for easier debugging.
	     *
	     * For more information on precompiling templates see
	     * [lodash's custom builds documentation](https://lodash.com/custom-builds).
	     *
	     * For more information on Chrome extension sandboxes see
	     * [Chrome's extensions documentation](https://developer.chrome.com/extensions/sandboxingEval).
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The template string.
	     * @param {Object} [options] The options object.
	     * @param {RegExp} [options.escape] The HTML "escape" delimiter.
	     * @param {RegExp} [options.evaluate] The "evaluate" delimiter.
	     * @param {Object} [options.imports] An object to import into the template as free variables.
	     * @param {RegExp} [options.interpolate] The "interpolate" delimiter.
	     * @param {string} [options.sourceURL] The sourceURL of the template's compiled source.
	     * @param {string} [options.variable] The data object variable name.
	     * @param- {Object} [otherOptions] Enables the legacy `options` param signature.
	     * @returns {Function} Returns the compiled template function.
	     * @example
	     *
	     * // using the "interpolate" delimiter to create a compiled template
	     * var compiled = _.template('hello <%= user %>!');
	     * compiled({ 'user': 'fred' });
	     * // => 'hello fred!'
	     *
	     * // using the HTML "escape" delimiter to escape data property values
	     * var compiled = _.template('<b><%- value %></b>');
	     * compiled({ 'value': '<script>' });
	     * // => '<b>&lt;script&gt;</b>'
	     *
	     * // using the "evaluate" delimiter to execute JavaScript and generate HTML
	     * var compiled = _.template('<% _.forEach(users, function(user) { %><li><%- user %></li><% }); %>');
	     * compiled({ 'users': ['fred', 'barney'] });
	     * // => '<li>fred</li><li>barney</li>'
	     *
	     * // using the internal `print` function in "evaluate" delimiters
	     * var compiled = _.template('<% print("hello " + user); %>!');
	     * compiled({ 'user': 'barney' });
	     * // => 'hello barney!'
	     *
	     * // using the ES delimiter as an alternative to the default "interpolate" delimiter
	     * var compiled = _.template('hello ${ user }!');
	     * compiled({ 'user': 'pebbles' });
	     * // => 'hello pebbles!'
	     *
	     * // using custom template delimiters
	     * _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
	     * var compiled = _.template('hello {{ user }}!');
	     * compiled({ 'user': 'mustache' });
	     * // => 'hello mustache!'
	     *
	     * // using backslashes to treat delimiters as plain text
	     * var compiled = _.template('<%= "\\<%- value %\\>" %>');
	     * compiled({ 'value': 'ignored' });
	     * // => '<%- value %>'
	     *
	     * // using the `imports` option to import `jQuery` as `jq`
	     * var text = '<% jq.each(users, function(user) { %><li><%- user %></li><% }); %>';
	     * var compiled = _.template(text, { 'imports': { 'jq': jQuery } });
	     * compiled({ 'users': ['fred', 'barney'] });
	     * // => '<li>fred</li><li>barney</li>'
	     *
	     * // using the `sourceURL` option to specify a custom sourceURL for the template
	     * var compiled = _.template('hello <%= user %>!', { 'sourceURL': '/basic/greeting.jst' });
	     * compiled(data);
	     * // => find the source of "greeting.jst" under the Sources tab or Resources panel of the web inspector
	     *
	     * // using the `variable` option to ensure a with-statement isn't used in the compiled template
	     * var compiled = _.template('hi <%= data.user %>!', { 'variable': 'data' });
	     * compiled.source;
	     * // => function(data) {
	     * //   var __t, __p = '';
	     * //   __p += 'hi ' + ((__t = ( data.user )) == null ? '' : __t) + '!';
	     * //   return __p;
	     * // }
	     *
	     * // using the `source` property to inline compiled templates for meaningful
	     * // line numbers in error messages and a stack trace
	     * fs.writeFileSync(path.join(cwd, 'jst.js'), '\
	     *   var JST = {\
	     *     "main": ' + _.template(mainText).source + '\
	     *   };\
	     * ');
	     */
	    function template(string, options, otherOptions) {
	      // Based on John Resig's `tmpl` implementation (http://ejohn.org/blog/javascript-micro-templating/)
	      // and Laura Doktorova's doT.js (https://github.com/olado/doT).
	      var settings = lodash.templateSettings;

	      if (otherOptions && isIterateeCall(string, options, otherOptions)) {
	        options = otherOptions = undefined;
	      }
	      string = baseToString(string);
	      options = assignWith(baseAssign({}, otherOptions || options), settings, assignOwnDefaults);

	      var imports = assignWith(baseAssign({}, options.imports), settings.imports, assignOwnDefaults),
	          importsKeys = keys(imports),
	          importsValues = baseValues(imports, importsKeys);

	      var isEscaping,
	          isEvaluating,
	          index = 0,
	          interpolate = options.interpolate || reNoMatch,
	          source = "__p += '";

	      // Compile the regexp to match each delimiter.
	      var reDelimiters = RegExp(
	        (options.escape || reNoMatch).source + '|' +
	        interpolate.source + '|' +
	        (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + '|' +
	        (options.evaluate || reNoMatch).source + '|$'
	      , 'g');

	      // Use a sourceURL for easier debugging.
	      var sourceURL = '//# sourceURL=' +
	        ('sourceURL' in options
	          ? options.sourceURL
	          : ('lodash.templateSources[' + (++templateCounter) + ']')
	        ) + '\n';

	      string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
	        interpolateValue || (interpolateValue = esTemplateValue);

	        // Escape characters that can't be included in string literals.
	        source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar);

	        // Replace delimiters with snippets.
	        if (escapeValue) {
	          isEscaping = true;
	          source += "' +\n__e(" + escapeValue + ") +\n'";
	        }
	        if (evaluateValue) {
	          isEvaluating = true;
	          source += "';\n" + evaluateValue + ";\n__p += '";
	        }
	        if (interpolateValue) {
	          source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
	        }
	        index = offset + match.length;

	        // The JS engine embedded in Adobe products requires returning the `match`
	        // string in order to produce the correct `offset` value.
	        return match;
	      });

	      source += "';\n";

	      // If `variable` is not specified wrap a with-statement around the generated
	      // code to add the data object to the top of the scope chain.
	      var variable = options.variable;
	      if (!variable) {
	        source = 'with (obj) {\n' + source + '\n}\n';
	      }
	      // Cleanup code by stripping empty strings.
	      source = (isEvaluating ? source.replace(reEmptyStringLeading, '') : source)
	        .replace(reEmptyStringMiddle, '$1')
	        .replace(reEmptyStringTrailing, '$1;');

	      // Frame code as the function body.
	      source = 'function(' + (variable || 'obj') + ') {\n' +
	        (variable
	          ? ''
	          : 'obj || (obj = {});\n'
	        ) +
	        "var __t, __p = ''" +
	        (isEscaping
	           ? ', __e = _.escape'
	           : ''
	        ) +
	        (isEvaluating
	          ? ', __j = Array.prototype.join;\n' +
	            "function print() { __p += __j.call(arguments, '') }\n"
	          : ';\n'
	        ) +
	        source +
	        'return __p\n}';

	      var result = attempt(function() {
	        return Function(importsKeys, sourceURL + 'return ' + source).apply(undefined, importsValues);
	      });

	      // Provide the compiled function's source by its `toString` method or
	      // the `source` property as a convenience for inlining compiled templates.
	      result.source = source;
	      if (isError(result)) {
	        throw result;
	      }
	      return result;
	    }

	    /**
	     * Removes leading and trailing whitespace or specified characters from `string`.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to trim.
	     * @param {string} [chars=whitespace] The characters to trim.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {string} Returns the trimmed string.
	     * @example
	     *
	     * _.trim('  abc  ');
	     * // => 'abc'
	     *
	     * _.trim('-_-abc-_-', '_-');
	     * // => 'abc'
	     *
	     * _.map(['  foo  ', '  bar  '], _.trim);
	     * // => ['foo', 'bar']
	     */
	    function trim(string, chars, guard) {
	      var value = string;
	      string = baseToString(string);
	      if (!string) {
	        return string;
	      }
	      if (guard ? isIterateeCall(value, chars, guard) : chars == null) {
	        return string.slice(trimmedLeftIndex(string), trimmedRightIndex(string) + 1);
	      }
	      chars = (chars + '');
	      return string.slice(charsLeftIndex(string, chars), charsRightIndex(string, chars) + 1);
	    }

	    /**
	     * Removes leading whitespace or specified characters from `string`.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to trim.
	     * @param {string} [chars=whitespace] The characters to trim.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {string} Returns the trimmed string.
	     * @example
	     *
	     * _.trimLeft('  abc  ');
	     * // => 'abc  '
	     *
	     * _.trimLeft('-_-abc-_-', '_-');
	     * // => 'abc-_-'
	     */
	    function trimLeft(string, chars, guard) {
	      var value = string;
	      string = baseToString(string);
	      if (!string) {
	        return string;
	      }
	      if (guard ? isIterateeCall(value, chars, guard) : chars == null) {
	        return string.slice(trimmedLeftIndex(string));
	      }
	      return string.slice(charsLeftIndex(string, (chars + '')));
	    }

	    /**
	     * Removes trailing whitespace or specified characters from `string`.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to trim.
	     * @param {string} [chars=whitespace] The characters to trim.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {string} Returns the trimmed string.
	     * @example
	     *
	     * _.trimRight('  abc  ');
	     * // => '  abc'
	     *
	     * _.trimRight('-_-abc-_-', '_-');
	     * // => '-_-abc'
	     */
	    function trimRight(string, chars, guard) {
	      var value = string;
	      string = baseToString(string);
	      if (!string) {
	        return string;
	      }
	      if (guard ? isIterateeCall(value, chars, guard) : chars == null) {
	        return string.slice(0, trimmedRightIndex(string) + 1);
	      }
	      return string.slice(0, charsRightIndex(string, (chars + '')) + 1);
	    }

	    /**
	     * Truncates `string` if it's longer than the given maximum string length.
	     * The last characters of the truncated string are replaced with the omission
	     * string which defaults to "...".
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to truncate.
	     * @param {Object|number} [options] The options object or maximum string length.
	     * @param {number} [options.length=30] The maximum string length.
	     * @param {string} [options.omission='...'] The string to indicate text is omitted.
	     * @param {RegExp|string} [options.separator] The separator pattern to truncate to.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {string} Returns the truncated string.
	     * @example
	     *
	     * _.trunc('hi-diddly-ho there, neighborino');
	     * // => 'hi-diddly-ho there, neighbo...'
	     *
	     * _.trunc('hi-diddly-ho there, neighborino', 24);
	     * // => 'hi-diddly-ho there, n...'
	     *
	     * _.trunc('hi-diddly-ho there, neighborino', {
	     *   'length': 24,
	     *   'separator': ' '
	     * });
	     * // => 'hi-diddly-ho there,...'
	     *
	     * _.trunc('hi-diddly-ho there, neighborino', {
	     *   'length': 24,
	     *   'separator': /,? +/
	     * });
	     * // => 'hi-diddly-ho there...'
	     *
	     * _.trunc('hi-diddly-ho there, neighborino', {
	     *   'omission': ' [...]'
	     * });
	     * // => 'hi-diddly-ho there, neig [...]'
	     */
	    function trunc(string, options, guard) {
	      if (guard && isIterateeCall(string, options, guard)) {
	        options = undefined;
	      }
	      var length = DEFAULT_TRUNC_LENGTH,
	          omission = DEFAULT_TRUNC_OMISSION;

	      if (options != null) {
	        if (isObject(options)) {
	          var separator = 'separator' in options ? options.separator : separator;
	          length = 'length' in options ? (+options.length || 0) : length;
	          omission = 'omission' in options ? baseToString(options.omission) : omission;
	        } else {
	          length = +options || 0;
	        }
	      }
	      string = baseToString(string);
	      if (length >= string.length) {
	        return string;
	      }
	      var end = length - omission.length;
	      if (end < 1) {
	        return omission;
	      }
	      var result = string.slice(0, end);
	      if (separator == null) {
	        return result + omission;
	      }
	      if (isRegExp(separator)) {
	        if (string.slice(end).search(separator)) {
	          var match,
	              newEnd,
	              substring = string.slice(0, end);

	          if (!separator.global) {
	            separator = RegExp(separator.source, (reFlags.exec(separator) || '') + 'g');
	          }
	          separator.lastIndex = 0;
	          while ((match = separator.exec(substring))) {
	            newEnd = match.index;
	          }
	          result = result.slice(0, newEnd == null ? end : newEnd);
	        }
	      } else if (string.indexOf(separator, end) != end) {
	        var index = result.lastIndexOf(separator);
	        if (index > -1) {
	          result = result.slice(0, index);
	        }
	      }
	      return result + omission;
	    }

	    /**
	     * The inverse of `_.escape`; this method converts the HTML entities
	     * `&amp;`, `&lt;`, `&gt;`, `&quot;`, `&#39;`, and `&#96;` in `string` to their
	     * corresponding characters.
	     *
	     * **Note:** No other HTML entities are unescaped. To unescape additional HTML
	     * entities use a third-party library like [_he_](https://mths.be/he).
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to unescape.
	     * @returns {string} Returns the unescaped string.
	     * @example
	     *
	     * _.unescape('fred, barney, &amp; pebbles');
	     * // => 'fred, barney, & pebbles'
	     */
	    function unescape(string) {
	      string = baseToString(string);
	      return (string && reHasEscapedHtml.test(string))
	        ? string.replace(reEscapedHtml, unescapeHtmlChar)
	        : string;
	    }

	    /**
	     * Splits `string` into an array of its words.
	     *
	     * @static
	     * @memberOf _
	     * @category String
	     * @param {string} [string=''] The string to inspect.
	     * @param {RegExp|string} [pattern] The pattern to match words.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {Array} Returns the words of `string`.
	     * @example
	     *
	     * _.words('fred, barney, & pebbles');
	     * // => ['fred', 'barney', 'pebbles']
	     *
	     * _.words('fred, barney, & pebbles', /[^, ]+/g);
	     * // => ['fred', 'barney', '&', 'pebbles']
	     */
	    function words(string, pattern, guard) {
	      if (guard && isIterateeCall(string, pattern, guard)) {
	        pattern = undefined;
	      }
	      string = baseToString(string);
	      return string.match(pattern || reWords) || [];
	    }

	    /*------------------------------------------------------------------------*/

	    /**
	     * Attempts to invoke `func`, returning either the result or the caught error
	     * object. Any additional arguments are provided to `func` when it is invoked.
	     *
	     * @static
	     * @memberOf _
	     * @category Utility
	     * @param {Function} func The function to attempt.
	     * @returns {*} Returns the `func` result or error object.
	     * @example
	     *
	     * // avoid throwing errors for invalid selectors
	     * var elements = _.attempt(function(selector) {
	     *   return document.querySelectorAll(selector);
	     * }, '>_>');
	     *
	     * if (_.isError(elements)) {
	     *   elements = [];
	     * }
	     */
	    var attempt = restParam(function(func, args) {
	      try {
	        return func.apply(undefined, args);
	      } catch(e) {
	        return isError(e) ? e : new Error(e);
	      }
	    });

	    /**
	     * Creates a function that invokes `func` with the `this` binding of `thisArg`
	     * and arguments of the created function. If `func` is a property name the
	     * created callback returns the property value for a given element. If `func`
	     * is an object the created callback returns `true` for elements that contain
	     * the equivalent object properties, otherwise it returns `false`.
	     *
	     * @static
	     * @memberOf _
	     * @alias iteratee
	     * @category Utility
	     * @param {*} [func=_.identity] The value to convert to a callback.
	     * @param {*} [thisArg] The `this` binding of `func`.
	     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
	     * @returns {Function} Returns the callback.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney', 'age': 36 },
	     *   { 'user': 'fred',   'age': 40 }
	     * ];
	     *
	     * // wrap to create custom callback shorthands
	     * _.callback = _.wrap(_.callback, function(callback, func, thisArg) {
	     *   var match = /^(.+?)__([gl]t)(.+)$/.exec(func);
	     *   if (!match) {
	     *     return callback(func, thisArg);
	     *   }
	     *   return function(object) {
	     *     return match[2] == 'gt'
	     *       ? object[match[1]] > match[3]
	     *       : object[match[1]] < match[3];
	     *   };
	     * });
	     *
	     * _.filter(users, 'age__gt36');
	     * // => [{ 'user': 'fred', 'age': 40 }]
	     */
	    function callback(func, thisArg, guard) {
	      if (guard && isIterateeCall(func, thisArg, guard)) {
	        thisArg = undefined;
	      }
	      return isObjectLike(func)
	        ? matches(func)
	        : baseCallback(func, thisArg);
	    }

	    /**
	     * Creates a function that returns `value`.
	     *
	     * @static
	     * @memberOf _
	     * @category Utility
	     * @param {*} value The value to return from the new function.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var object = { 'user': 'fred' };
	     * var getter = _.constant(object);
	     *
	     * getter() === object;
	     * // => true
	     */
	    function constant(value) {
	      return function() {
	        return value;
	      };
	    }

	    /**
	     * This method returns the first argument provided to it.
	     *
	     * @static
	     * @memberOf _
	     * @category Utility
	     * @param {*} value Any value.
	     * @returns {*} Returns `value`.
	     * @example
	     *
	     * var object = { 'user': 'fred' };
	     *
	     * _.identity(object) === object;
	     * // => true
	     */
	    function identity(value) {
	      return value;
	    }

	    /**
	     * Creates a function that performs a deep comparison between a given object
	     * and `source`, returning `true` if the given object has equivalent property
	     * values, else `false`.
	     *
	     * **Note:** This method supports comparing arrays, booleans, `Date` objects,
	     * numbers, `Object` objects, regexes, and strings. Objects are compared by
	     * their own, not inherited, enumerable properties. For comparing a single
	     * own or inherited property value see `_.matchesProperty`.
	     *
	     * @static
	     * @memberOf _
	     * @category Utility
	     * @param {Object} source The object of property values to match.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney', 'age': 36, 'active': true },
	     *   { 'user': 'fred',   'age': 40, 'active': false }
	     * ];
	     *
	     * _.filter(users, _.matches({ 'age': 40, 'active': false }));
	     * // => [{ 'user': 'fred', 'age': 40, 'active': false }]
	     */
	    function matches(source) {
	      return baseMatches(baseClone(source, true));
	    }

	    /**
	     * Creates a function that compares the property value of `path` on a given
	     * object to `value`.
	     *
	     * **Note:** This method supports comparing arrays, booleans, `Date` objects,
	     * numbers, `Object` objects, regexes, and strings. Objects are compared by
	     * their own, not inherited, enumerable properties.
	     *
	     * @static
	     * @memberOf _
	     * @category Utility
	     * @param {Array|string} path The path of the property to get.
	     * @param {*} srcValue The value to match.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var users = [
	     *   { 'user': 'barney' },
	     *   { 'user': 'fred' }
	     * ];
	     *
	     * _.find(users, _.matchesProperty('user', 'fred'));
	     * // => { 'user': 'fred' }
	     */
	    function matchesProperty(path, srcValue) {
	      return baseMatchesProperty(path, baseClone(srcValue, true));
	    }

	    /**
	     * Creates a function that invokes the method at `path` on a given object.
	     * Any additional arguments are provided to the invoked method.
	     *
	     * @static
	     * @memberOf _
	     * @category Utility
	     * @param {Array|string} path The path of the method to invoke.
	     * @param {...*} [args] The arguments to invoke the method with.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var objects = [
	     *   { 'a': { 'b': { 'c': _.constant(2) } } },
	     *   { 'a': { 'b': { 'c': _.constant(1) } } }
	     * ];
	     *
	     * _.map(objects, _.method('a.b.c'));
	     * // => [2, 1]
	     *
	     * _.invoke(_.sortBy(objects, _.method(['a', 'b', 'c'])), 'a.b.c');
	     * // => [1, 2]
	     */
	    var method = restParam(function(path, args) {
	      return function(object) {
	        return invokePath(object, path, args);
	      };
	    });

	    /**
	     * The opposite of `_.method`; this method creates a function that invokes
	     * the method at a given path on `object`. Any additional arguments are
	     * provided to the invoked method.
	     *
	     * @static
	     * @memberOf _
	     * @category Utility
	     * @param {Object} object The object to query.
	     * @param {...*} [args] The arguments to invoke the method with.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var array = _.times(3, _.constant),
	     *     object = { 'a': array, 'b': array, 'c': array };
	     *
	     * _.map(['a[2]', 'c[0]'], _.methodOf(object));
	     * // => [2, 0]
	     *
	     * _.map([['a', '2'], ['c', '0']], _.methodOf(object));
	     * // => [2, 0]
	     */
	    var methodOf = restParam(function(object, args) {
	      return function(path) {
	        return invokePath(object, path, args);
	      };
	    });

	    /**
	     * Adds all own enumerable function properties of a source object to the
	     * destination object. If `object` is a function then methods are added to
	     * its prototype as well.
	     *
	     * **Note:** Use `_.runInContext` to create a pristine `lodash` function to
	     * avoid conflicts caused by modifying the original.
	     *
	     * @static
	     * @memberOf _
	     * @category Utility
	     * @param {Function|Object} [object=lodash] The destination object.
	     * @param {Object} source The object of functions to add.
	     * @param {Object} [options] The options object.
	     * @param {boolean} [options.chain=true] Specify whether the functions added
	     *  are chainable.
	     * @returns {Function|Object} Returns `object`.
	     * @example
	     *
	     * function vowels(string) {
	     *   return _.filter(string, function(v) {
	     *     return /[aeiou]/i.test(v);
	     *   });
	     * }
	     *
	     * _.mixin({ 'vowels': vowels });
	     * _.vowels('fred');
	     * // => ['e']
	     *
	     * _('fred').vowels().value();
	     * // => ['e']
	     *
	     * _.mixin({ 'vowels': vowels }, { 'chain': false });
	     * _('fred').vowels();
	     * // => ['e']
	     */
	    function mixin(object, source, options) {
	      if (options == null) {
	        var isObj = isObject(source),
	            props = isObj ? keys(source) : undefined,
	            methodNames = (props && props.length) ? baseFunctions(source, props) : undefined;

	        if (!(methodNames ? methodNames.length : isObj)) {
	          methodNames = false;
	          options = source;
	          source = object;
	          object = this;
	        }
	      }
	      if (!methodNames) {
	        methodNames = baseFunctions(source, keys(source));
	      }
	      var chain = true,
	          index = -1,
	          isFunc = isFunction(object),
	          length = methodNames.length;

	      if (options === false) {
	        chain = false;
	      } else if (isObject(options) && 'chain' in options) {
	        chain = options.chain;
	      }
	      while (++index < length) {
	        var methodName = methodNames[index],
	            func = source[methodName];

	        object[methodName] = func;
	        if (isFunc) {
	          object.prototype[methodName] = (function(func) {
	            return function() {
	              var chainAll = this.__chain__;
	              if (chain || chainAll) {
	                var result = object(this.__wrapped__),
	                    actions = result.__actions__ = arrayCopy(this.__actions__);

	                actions.push({ 'func': func, 'args': arguments, 'thisArg': object });
	                result.__chain__ = chainAll;
	                return result;
	              }
	              return func.apply(object, arrayPush([this.value()], arguments));
	            };
	          }(func));
	        }
	      }
	      return object;
	    }

	    /**
	     * Reverts the `_` variable to its previous value and returns a reference to
	     * the `lodash` function.
	     *
	     * @static
	     * @memberOf _
	     * @category Utility
	     * @returns {Function} Returns the `lodash` function.
	     * @example
	     *
	     * var lodash = _.noConflict();
	     */
	    function noConflict() {
	      root._ = oldDash;
	      return this;
	    }

	    /**
	     * A no-operation function that returns `undefined` regardless of the
	     * arguments it receives.
	     *
	     * @static
	     * @memberOf _
	     * @category Utility
	     * @example
	     *
	     * var object = { 'user': 'fred' };
	     *
	     * _.noop(object) === undefined;
	     * // => true
	     */
	    function noop() {
	      // No operation performed.
	    }

	    /**
	     * Creates a function that returns the property value at `path` on a
	     * given object.
	     *
	     * @static
	     * @memberOf _
	     * @category Utility
	     * @param {Array|string} path The path of the property to get.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var objects = [
	     *   { 'a': { 'b': { 'c': 2 } } },
	     *   { 'a': { 'b': { 'c': 1 } } }
	     * ];
	     *
	     * _.map(objects, _.property('a.b.c'));
	     * // => [2, 1]
	     *
	     * _.pluck(_.sortBy(objects, _.property(['a', 'b', 'c'])), 'a.b.c');
	     * // => [1, 2]
	     */
	    function property(path) {
	      return isKey(path) ? baseProperty(path) : basePropertyDeep(path);
	    }

	    /**
	     * The opposite of `_.property`; this method creates a function that returns
	     * the property value at a given path on `object`.
	     *
	     * @static
	     * @memberOf _
	     * @category Utility
	     * @param {Object} object The object to query.
	     * @returns {Function} Returns the new function.
	     * @example
	     *
	     * var array = [0, 1, 2],
	     *     object = { 'a': array, 'b': array, 'c': array };
	     *
	     * _.map(['a[2]', 'c[0]'], _.propertyOf(object));
	     * // => [2, 0]
	     *
	     * _.map([['a', '2'], ['c', '0']], _.propertyOf(object));
	     * // => [2, 0]
	     */
	    function propertyOf(object) {
	      return function(path) {
	        return baseGet(object, toPath(path), path + '');
	      };
	    }

	    /**
	     * Creates an array of numbers (positive and/or negative) progressing from
	     * `start` up to, but not including, `end`. If `end` is not specified it is
	     * set to `start` with `start` then set to `0`. If `end` is less than `start`
	     * a zero-length range is created unless a negative `step` is specified.
	     *
	     * @static
	     * @memberOf _
	     * @category Utility
	     * @param {number} [start=0] The start of the range.
	     * @param {number} end The end of the range.
	     * @param {number} [step=1] The value to increment or decrement by.
	     * @returns {Array} Returns the new array of numbers.
	     * @example
	     *
	     * _.range(4);
	     * // => [0, 1, 2, 3]
	     *
	     * _.range(1, 5);
	     * // => [1, 2, 3, 4]
	     *
	     * _.range(0, 20, 5);
	     * // => [0, 5, 10, 15]
	     *
	     * _.range(0, -4, -1);
	     * // => [0, -1, -2, -3]
	     *
	     * _.range(1, 4, 0);
	     * // => [1, 1, 1]
	     *
	     * _.range(0);
	     * // => []
	     */
	    function range(start, end, step) {
	      if (step && isIterateeCall(start, end, step)) {
	        end = step = undefined;
	      }
	      start = +start || 0;
	      step = step == null ? 1 : (+step || 0);

	      if (end == null) {
	        end = start;
	        start = 0;
	      } else {
	        end = +end || 0;
	      }
	      // Use `Array(length)` so engines like Chakra and V8 avoid slower modes.
	      // See https://youtu.be/XAqIpGU8ZZk#t=17m25s for more details.
	      var index = -1,
	          length = nativeMax(nativeCeil((end - start) / (step || 1)), 0),
	          result = Array(length);

	      while (++index < length) {
	        result[index] = start;
	        start += step;
	      }
	      return result;
	    }

	    /**
	     * Invokes the iteratee function `n` times, returning an array of the results
	     * of each invocation. The `iteratee` is bound to `thisArg` and invoked with
	     * one argument; (index).
	     *
	     * @static
	     * @memberOf _
	     * @category Utility
	     * @param {number} n The number of times to invoke `iteratee`.
	     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {Array} Returns the array of results.
	     * @example
	     *
	     * var diceRolls = _.times(3, _.partial(_.random, 1, 6, false));
	     * // => [3, 6, 4]
	     *
	     * _.times(3, function(n) {
	     *   mage.castSpell(n);
	     * });
	     * // => invokes `mage.castSpell(n)` three times with `n` of `0`, `1`, and `2`
	     *
	     * _.times(3, function(n) {
	     *   this.cast(n);
	     * }, mage);
	     * // => also invokes `mage.castSpell(n)` three times
	     */
	    function times(n, iteratee, thisArg) {
	      n = nativeFloor(n);

	      // Exit early to avoid a JSC JIT bug in Safari 8
	      // where `Array(0)` is treated as `Array(1)`.
	      if (n < 1 || !nativeIsFinite(n)) {
	        return [];
	      }
	      var index = -1,
	          result = Array(nativeMin(n, MAX_ARRAY_LENGTH));

	      iteratee = bindCallback(iteratee, thisArg, 1);
	      while (++index < n) {
	        if (index < MAX_ARRAY_LENGTH) {
	          result[index] = iteratee(index);
	        } else {
	          iteratee(index);
	        }
	      }
	      return result;
	    }

	    /**
	     * Generates a unique ID. If `prefix` is provided the ID is appended to it.
	     *
	     * @static
	     * @memberOf _
	     * @category Utility
	     * @param {string} [prefix] The value to prefix the ID with.
	     * @returns {string} Returns the unique ID.
	     * @example
	     *
	     * _.uniqueId('contact_');
	     * // => 'contact_104'
	     *
	     * _.uniqueId();
	     * // => '105'
	     */
	    function uniqueId(prefix) {
	      var id = ++idCounter;
	      return baseToString(prefix) + id;
	    }

	    /*------------------------------------------------------------------------*/

	    /**
	     * Adds two numbers.
	     *
	     * @static
	     * @memberOf _
	     * @category Math
	     * @param {number} augend The first number to add.
	     * @param {number} addend The second number to add.
	     * @returns {number} Returns the sum.
	     * @example
	     *
	     * _.add(6, 4);
	     * // => 10
	     */
	    function add(augend, addend) {
	      return (+augend || 0) + (+addend || 0);
	    }

	    /**
	     * Calculates `n` rounded up to `precision`.
	     *
	     * @static
	     * @memberOf _
	     * @category Math
	     * @param {number} n The number to round up.
	     * @param {number} [precision=0] The precision to round up to.
	     * @returns {number} Returns the rounded up number.
	     * @example
	     *
	     * _.ceil(4.006);
	     * // => 5
	     *
	     * _.ceil(6.004, 2);
	     * // => 6.01
	     *
	     * _.ceil(6040, -2);
	     * // => 6100
	     */
	    var ceil = createRound('ceil');

	    /**
	     * Calculates `n` rounded down to `precision`.
	     *
	     * @static
	     * @memberOf _
	     * @category Math
	     * @param {number} n The number to round down.
	     * @param {number} [precision=0] The precision to round down to.
	     * @returns {number} Returns the rounded down number.
	     * @example
	     *
	     * _.floor(4.006);
	     * // => 4
	     *
	     * _.floor(0.046, 2);
	     * // => 0.04
	     *
	     * _.floor(4060, -2);
	     * // => 4000
	     */
	    var floor = createRound('floor');

	    /**
	     * Gets the maximum value of `collection`. If `collection` is empty or falsey
	     * `-Infinity` is returned. If an iteratee function is provided it is invoked
	     * for each value in `collection` to generate the criterion by which the value
	     * is ranked. The `iteratee` is bound to `thisArg` and invoked with three
	     * arguments: (value, index, collection).
	     *
	     * If a property name is provided for `iteratee` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `iteratee` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Math
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [iteratee] The function invoked per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {*} Returns the maximum value.
	     * @example
	     *
	     * _.max([4, 2, 8, 6]);
	     * // => 8
	     *
	     * _.max([]);
	     * // => -Infinity
	     *
	     * var users = [
	     *   { 'user': 'barney', 'age': 36 },
	     *   { 'user': 'fred',   'age': 40 }
	     * ];
	     *
	     * _.max(users, function(chr) {
	     *   return chr.age;
	     * });
	     * // => { 'user': 'fred', 'age': 40 }
	     *
	     * // using the `_.property` callback shorthand
	     * _.max(users, 'age');
	     * // => { 'user': 'fred', 'age': 40 }
	     */
	    var max = createExtremum(gt, NEGATIVE_INFINITY);

	    /**
	     * Gets the minimum value of `collection`. If `collection` is empty or falsey
	     * `Infinity` is returned. If an iteratee function is provided it is invoked
	     * for each value in `collection` to generate the criterion by which the value
	     * is ranked. The `iteratee` is bound to `thisArg` and invoked with three
	     * arguments: (value, index, collection).
	     *
	     * If a property name is provided for `iteratee` the created `_.property`
	     * style callback returns the property value of the given element.
	     *
	     * If a value is also provided for `thisArg` the created `_.matchesProperty`
	     * style callback returns `true` for elements that have a matching property
	     * value, else `false`.
	     *
	     * If an object is provided for `iteratee` the created `_.matches` style
	     * callback returns `true` for elements that have the properties of the given
	     * object, else `false`.
	     *
	     * @static
	     * @memberOf _
	     * @category Math
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [iteratee] The function invoked per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {*} Returns the minimum value.
	     * @example
	     *
	     * _.min([4, 2, 8, 6]);
	     * // => 2
	     *
	     * _.min([]);
	     * // => Infinity
	     *
	     * var users = [
	     *   { 'user': 'barney', 'age': 36 },
	     *   { 'user': 'fred',   'age': 40 }
	     * ];
	     *
	     * _.min(users, function(chr) {
	     *   return chr.age;
	     * });
	     * // => { 'user': 'barney', 'age': 36 }
	     *
	     * // using the `_.property` callback shorthand
	     * _.min(users, 'age');
	     * // => { 'user': 'barney', 'age': 36 }
	     */
	    var min = createExtremum(lt, POSITIVE_INFINITY);

	    /**
	     * Calculates `n` rounded to `precision`.
	     *
	     * @static
	     * @memberOf _
	     * @category Math
	     * @param {number} n The number to round.
	     * @param {number} [precision=0] The precision to round to.
	     * @returns {number} Returns the rounded number.
	     * @example
	     *
	     * _.round(4.006);
	     * // => 4
	     *
	     * _.round(4.006, 2);
	     * // => 4.01
	     *
	     * _.round(4060, -2);
	     * // => 4100
	     */
	    var round = createRound('round');

	    /**
	     * Gets the sum of the values in `collection`.
	     *
	     * @static
	     * @memberOf _
	     * @category Math
	     * @param {Array|Object|string} collection The collection to iterate over.
	     * @param {Function|Object|string} [iteratee] The function invoked per iteration.
	     * @param {*} [thisArg] The `this` binding of `iteratee`.
	     * @returns {number} Returns the sum.
	     * @example
	     *
	     * _.sum([4, 6]);
	     * // => 10
	     *
	     * _.sum({ 'a': 4, 'b': 6 });
	     * // => 10
	     *
	     * var objects = [
	     *   { 'n': 4 },
	     *   { 'n': 6 }
	     * ];
	     *
	     * _.sum(objects, function(object) {
	     *   return object.n;
	     * });
	     * // => 10
	     *
	     * // using the `_.property` callback shorthand
	     * _.sum(objects, 'n');
	     * // => 10
	     */
	    function sum(collection, iteratee, thisArg) {
	      if (thisArg && isIterateeCall(collection, iteratee, thisArg)) {
	        iteratee = undefined;
	      }
	      iteratee = getCallback(iteratee, thisArg, 3);
	      return iteratee.length == 1
	        ? arraySum(isArray(collection) ? collection : toIterable(collection), iteratee)
	        : baseSum(collection, iteratee);
	    }

	    /*------------------------------------------------------------------------*/

	    // Ensure wrappers are instances of `baseLodash`.
	    lodash.prototype = baseLodash.prototype;

	    LodashWrapper.prototype = baseCreate(baseLodash.prototype);
	    LodashWrapper.prototype.constructor = LodashWrapper;

	    LazyWrapper.prototype = baseCreate(baseLodash.prototype);
	    LazyWrapper.prototype.constructor = LazyWrapper;

	    // Add functions to the `Map` cache.
	    MapCache.prototype['delete'] = mapDelete;
	    MapCache.prototype.get = mapGet;
	    MapCache.prototype.has = mapHas;
	    MapCache.prototype.set = mapSet;

	    // Add functions to the `Set` cache.
	    SetCache.prototype.push = cachePush;

	    // Assign cache to `_.memoize`.
	    memoize.Cache = MapCache;

	    // Add functions that return wrapped values when chaining.
	    lodash.after = after;
	    lodash.ary = ary;
	    lodash.assign = assign;
	    lodash.at = at;
	    lodash.before = before;
	    lodash.bind = bind;
	    lodash.bindAll = bindAll;
	    lodash.bindKey = bindKey;
	    lodash.callback = callback;
	    lodash.chain = chain;
	    lodash.chunk = chunk;
	    lodash.compact = compact;
	    lodash.constant = constant;
	    lodash.countBy = countBy;
	    lodash.create = create;
	    lodash.curry = curry;
	    lodash.curryRight = curryRight;
	    lodash.debounce = debounce;
	    lodash.defaults = defaults;
	    lodash.defaultsDeep = defaultsDeep;
	    lodash.defer = defer;
	    lodash.delay = delay;
	    lodash.difference = difference;
	    lodash.drop = drop;
	    lodash.dropRight = dropRight;
	    lodash.dropRightWhile = dropRightWhile;
	    lodash.dropWhile = dropWhile;
	    lodash.fill = fill;
	    lodash.filter = filter;
	    lodash.flatten = flatten;
	    lodash.flattenDeep = flattenDeep;
	    lodash.flow = flow;
	    lodash.flowRight = flowRight;
	    lodash.forEach = forEach;
	    lodash.forEachRight = forEachRight;
	    lodash.forIn = forIn;
	    lodash.forInRight = forInRight;
	    lodash.forOwn = forOwn;
	    lodash.forOwnRight = forOwnRight;
	    lodash.functions = functions;
	    lodash.groupBy = groupBy;
	    lodash.indexBy = indexBy;
	    lodash.initial = initial;
	    lodash.intersection = intersection;
	    lodash.invert = invert;
	    lodash.invoke = invoke;
	    lodash.keys = keys;
	    lodash.keysIn = keysIn;
	    lodash.map = map;
	    lodash.mapKeys = mapKeys;
	    lodash.mapValues = mapValues;
	    lodash.matches = matches;
	    lodash.matchesProperty = matchesProperty;
	    lodash.memoize = memoize;
	    lodash.merge = merge;
	    lodash.method = method;
	    lodash.methodOf = methodOf;
	    lodash.mixin = mixin;
	    lodash.modArgs = modArgs;
	    lodash.negate = negate;
	    lodash.omit = omit;
	    lodash.once = once;
	    lodash.pairs = pairs;
	    lodash.partial = partial;
	    lodash.partialRight = partialRight;
	    lodash.partition = partition;
	    lodash.pick = pick;
	    lodash.pluck = pluck;
	    lodash.property = property;
	    lodash.propertyOf = propertyOf;
	    lodash.pull = pull;
	    lodash.pullAt = pullAt;
	    lodash.range = range;
	    lodash.rearg = rearg;
	    lodash.reject = reject;
	    lodash.remove = remove;
	    lodash.rest = rest;
	    lodash.restParam = restParam;
	    lodash.set = set;
	    lodash.shuffle = shuffle;
	    lodash.slice = slice;
	    lodash.sortBy = sortBy;
	    lodash.sortByAll = sortByAll;
	    lodash.sortByOrder = sortByOrder;
	    lodash.spread = spread;
	    lodash.take = take;
	    lodash.takeRight = takeRight;
	    lodash.takeRightWhile = takeRightWhile;
	    lodash.takeWhile = takeWhile;
	    lodash.tap = tap;
	    lodash.throttle = throttle;
	    lodash.thru = thru;
	    lodash.times = times;
	    lodash.toArray = toArray;
	    lodash.toPlainObject = toPlainObject;
	    lodash.transform = transform;
	    lodash.union = union;
	    lodash.uniq = uniq;
	    lodash.unzip = unzip;
	    lodash.unzipWith = unzipWith;
	    lodash.values = values;
	    lodash.valuesIn = valuesIn;
	    lodash.where = where;
	    lodash.without = without;
	    lodash.wrap = wrap;
	    lodash.xor = xor;
	    lodash.zip = zip;
	    lodash.zipObject = zipObject;
	    lodash.zipWith = zipWith;

	    // Add aliases.
	    lodash.backflow = flowRight;
	    lodash.collect = map;
	    lodash.compose = flowRight;
	    lodash.each = forEach;
	    lodash.eachRight = forEachRight;
	    lodash.extend = assign;
	    lodash.iteratee = callback;
	    lodash.methods = functions;
	    lodash.object = zipObject;
	    lodash.select = filter;
	    lodash.tail = rest;
	    lodash.unique = uniq;

	    // Add functions to `lodash.prototype`.
	    mixin(lodash, lodash);

	    /*------------------------------------------------------------------------*/

	    // Add functions that return unwrapped values when chaining.
	    lodash.add = add;
	    lodash.attempt = attempt;
	    lodash.camelCase = camelCase;
	    lodash.capitalize = capitalize;
	    lodash.ceil = ceil;
	    lodash.clone = clone;
	    lodash.cloneDeep = cloneDeep;
	    lodash.deburr = deburr;
	    lodash.endsWith = endsWith;
	    lodash.escape = escape;
	    lodash.escapeRegExp = escapeRegExp;
	    lodash.every = every;
	    lodash.find = find;
	    lodash.findIndex = findIndex;
	    lodash.findKey = findKey;
	    lodash.findLast = findLast;
	    lodash.findLastIndex = findLastIndex;
	    lodash.findLastKey = findLastKey;
	    lodash.findWhere = findWhere;
	    lodash.first = first;
	    lodash.floor = floor;
	    lodash.get = get;
	    lodash.gt = gt;
	    lodash.gte = gte;
	    lodash.has = has;
	    lodash.identity = identity;
	    lodash.includes = includes;
	    lodash.indexOf = indexOf;
	    lodash.inRange = inRange;
	    lodash.isArguments = isArguments;
	    lodash.isArray = isArray;
	    lodash.isBoolean = isBoolean;
	    lodash.isDate = isDate;
	    lodash.isElement = isElement;
	    lodash.isEmpty = isEmpty;
	    lodash.isEqual = isEqual;
	    lodash.isError = isError;
	    lodash.isFinite = isFinite;
	    lodash.isFunction = isFunction;
	    lodash.isMatch = isMatch;
	    lodash.isNaN = isNaN;
	    lodash.isNative = isNative;
	    lodash.isNull = isNull;
	    lodash.isNumber = isNumber;
	    lodash.isObject = isObject;
	    lodash.isPlainObject = isPlainObject;
	    lodash.isRegExp = isRegExp;
	    lodash.isString = isString;
	    lodash.isTypedArray = isTypedArray;
	    lodash.isUndefined = isUndefined;
	    lodash.kebabCase = kebabCase;
	    lodash.last = last;
	    lodash.lastIndexOf = lastIndexOf;
	    lodash.lt = lt;
	    lodash.lte = lte;
	    lodash.max = max;
	    lodash.min = min;
	    lodash.noConflict = noConflict;
	    lodash.noop = noop;
	    lodash.now = now;
	    lodash.pad = pad;
	    lodash.padLeft = padLeft;
	    lodash.padRight = padRight;
	    lodash.parseInt = parseInt;
	    lodash.random = random;
	    lodash.reduce = reduce;
	    lodash.reduceRight = reduceRight;
	    lodash.repeat = repeat;
	    lodash.result = result;
	    lodash.round = round;
	    lodash.runInContext = runInContext;
	    lodash.size = size;
	    lodash.snakeCase = snakeCase;
	    lodash.some = some;
	    lodash.sortedIndex = sortedIndex;
	    lodash.sortedLastIndex = sortedLastIndex;
	    lodash.startCase = startCase;
	    lodash.startsWith = startsWith;
	    lodash.sum = sum;
	    lodash.template = template;
	    lodash.trim = trim;
	    lodash.trimLeft = trimLeft;
	    lodash.trimRight = trimRight;
	    lodash.trunc = trunc;
	    lodash.unescape = unescape;
	    lodash.uniqueId = uniqueId;
	    lodash.words = words;

	    // Add aliases.
	    lodash.all = every;
	    lodash.any = some;
	    lodash.contains = includes;
	    lodash.eq = isEqual;
	    lodash.detect = find;
	    lodash.foldl = reduce;
	    lodash.foldr = reduceRight;
	    lodash.head = first;
	    lodash.include = includes;
	    lodash.inject = reduce;

	    mixin(lodash, (function() {
	      var source = {};
	      baseForOwn(lodash, function(func, methodName) {
	        if (!lodash.prototype[methodName]) {
	          source[methodName] = func;
	        }
	      });
	      return source;
	    }()), false);

	    /*------------------------------------------------------------------------*/

	    // Add functions capable of returning wrapped and unwrapped values when chaining.
	    lodash.sample = sample;

	    lodash.prototype.sample = function(n) {
	      if (!this.__chain__ && n == null) {
	        return sample(this.value());
	      }
	      return this.thru(function(value) {
	        return sample(value, n);
	      });
	    };

	    /*------------------------------------------------------------------------*/

	    /**
	     * The semantic version number.
	     *
	     * @static
	     * @memberOf _
	     * @type string
	     */
	    lodash.VERSION = VERSION;

	    // Assign default placeholders.
	    arrayEach(['bind', 'bindKey', 'curry', 'curryRight', 'partial', 'partialRight'], function(methodName) {
	      lodash[methodName].placeholder = lodash;
	    });

	    // Add `LazyWrapper` methods for `_.drop` and `_.take` variants.
	    arrayEach(['drop', 'take'], function(methodName, index) {
	      LazyWrapper.prototype[methodName] = function(n) {
	        var filtered = this.__filtered__;
	        if (filtered && !index) {
	          return new LazyWrapper(this);
	        }
	        n = n == null ? 1 : nativeMax(nativeFloor(n) || 0, 0);

	        var result = this.clone();
	        if (filtered) {
	          result.__takeCount__ = nativeMin(result.__takeCount__, n);
	        } else {
	          result.__views__.push({ 'size': n, 'type': methodName + (result.__dir__ < 0 ? 'Right' : '') });
	        }
	        return result;
	      };

	      LazyWrapper.prototype[methodName + 'Right'] = function(n) {
	        return this.reverse()[methodName](n).reverse();
	      };
	    });

	    // Add `LazyWrapper` methods that accept an `iteratee` value.
	    arrayEach(['filter', 'map', 'takeWhile'], function(methodName, index) {
	      var type = index + 1,
	          isFilter = type != LAZY_MAP_FLAG;

	      LazyWrapper.prototype[methodName] = function(iteratee, thisArg) {
	        var result = this.clone();
	        result.__iteratees__.push({ 'iteratee': getCallback(iteratee, thisArg, 1), 'type': type });
	        result.__filtered__ = result.__filtered__ || isFilter;
	        return result;
	      };
	    });

	    // Add `LazyWrapper` methods for `_.first` and `_.last`.
	    arrayEach(['first', 'last'], function(methodName, index) {
	      var takeName = 'take' + (index ? 'Right' : '');

	      LazyWrapper.prototype[methodName] = function() {
	        return this[takeName](1).value()[0];
	      };
	    });

	    // Add `LazyWrapper` methods for `_.initial` and `_.rest`.
	    arrayEach(['initial', 'rest'], function(methodName, index) {
	      var dropName = 'drop' + (index ? '' : 'Right');

	      LazyWrapper.prototype[methodName] = function() {
	        return this.__filtered__ ? new LazyWrapper(this) : this[dropName](1);
	      };
	    });

	    // Add `LazyWrapper` methods for `_.pluck` and `_.where`.
	    arrayEach(['pluck', 'where'], function(methodName, index) {
	      var operationName = index ? 'filter' : 'map',
	          createCallback = index ? baseMatches : property;

	      LazyWrapper.prototype[methodName] = function(value) {
	        return this[operationName](createCallback(value));
	      };
	    });

	    LazyWrapper.prototype.compact = function() {
	      return this.filter(identity);
	    };

	    LazyWrapper.prototype.reject = function(predicate, thisArg) {
	      predicate = getCallback(predicate, thisArg, 1);
	      return this.filter(function(value) {
	        return !predicate(value);
	      });
	    };

	    LazyWrapper.prototype.slice = function(start, end) {
	      start = start == null ? 0 : (+start || 0);

	      var result = this;
	      if (result.__filtered__ && (start > 0 || end < 0)) {
	        return new LazyWrapper(result);
	      }
	      if (start < 0) {
	        result = result.takeRight(-start);
	      } else if (start) {
	        result = result.drop(start);
	      }
	      if (end !== undefined) {
	        end = (+end || 0);
	        result = end < 0 ? result.dropRight(-end) : result.take(end - start);
	      }
	      return result;
	    };

	    LazyWrapper.prototype.takeRightWhile = function(predicate, thisArg) {
	      return this.reverse().takeWhile(predicate, thisArg).reverse();
	    };

	    LazyWrapper.prototype.toArray = function() {
	      return this.take(POSITIVE_INFINITY);
	    };

	    // Add `LazyWrapper` methods to `lodash.prototype`.
	    baseForOwn(LazyWrapper.prototype, function(func, methodName) {
	      var checkIteratee = /^(?:filter|map|reject)|While$/.test(methodName),
	          retUnwrapped = /^(?:first|last)$/.test(methodName),
	          lodashFunc = lodash[retUnwrapped ? ('take' + (methodName == 'last' ? 'Right' : '')) : methodName];

	      if (!lodashFunc) {
	        return;
	      }
	      lodash.prototype[methodName] = function() {
	        var args = retUnwrapped ? [1] : arguments,
	            chainAll = this.__chain__,
	            value = this.__wrapped__,
	            isHybrid = !!this.__actions__.length,
	            isLazy = value instanceof LazyWrapper,
	            iteratee = args[0],
	            useLazy = isLazy || isArray(value);

	        if (useLazy && checkIteratee && typeof iteratee == 'function' && iteratee.length != 1) {
	          // Avoid lazy use if the iteratee has a "length" value other than `1`.
	          isLazy = useLazy = false;
	        }
	        var interceptor = function(value) {
	          return (retUnwrapped && chainAll)
	            ? lodashFunc(value, 1)[0]
	            : lodashFunc.apply(undefined, arrayPush([value], args));
	        };

	        var action = { 'func': thru, 'args': [interceptor], 'thisArg': undefined },
	            onlyLazy = isLazy && !isHybrid;

	        if (retUnwrapped && !chainAll) {
	          if (onlyLazy) {
	            value = value.clone();
	            value.__actions__.push(action);
	            return func.call(value);
	          }
	          return lodashFunc.call(undefined, this.value())[0];
	        }
	        if (!retUnwrapped && useLazy) {
	          value = onlyLazy ? value : new LazyWrapper(this);
	          var result = func.apply(value, args);
	          result.__actions__.push(action);
	          return new LodashWrapper(result, chainAll);
	        }
	        return this.thru(interceptor);
	      };
	    });

	    // Add `Array` and `String` methods to `lodash.prototype`.
	    arrayEach(['join', 'pop', 'push', 'replace', 'shift', 'sort', 'splice', 'split', 'unshift'], function(methodName) {
	      var func = (/^(?:replace|split)$/.test(methodName) ? stringProto : arrayProto)[methodName],
	          chainName = /^(?:push|sort|unshift)$/.test(methodName) ? 'tap' : 'thru',
	          retUnwrapped = /^(?:join|pop|replace|shift)$/.test(methodName);

	      lodash.prototype[methodName] = function() {
	        var args = arguments;
	        if (retUnwrapped && !this.__chain__) {
	          return func.apply(this.value(), args);
	        }
	        return this[chainName](function(value) {
	          return func.apply(value, args);
	        });
	      };
	    });

	    // Map minified function names to their real names.
	    baseForOwn(LazyWrapper.prototype, function(func, methodName) {
	      var lodashFunc = lodash[methodName];
	      if (lodashFunc) {
	        var key = lodashFunc.name,
	            names = realNames[key] || (realNames[key] = []);

	        names.push({ 'name': methodName, 'func': lodashFunc });
	      }
	    });

	    realNames[createHybridWrapper(undefined, BIND_KEY_FLAG).name] = [{ 'name': 'wrapper', 'func': undefined }];

	    // Add functions to the lazy wrapper.
	    LazyWrapper.prototype.clone = lazyClone;
	    LazyWrapper.prototype.reverse = lazyReverse;
	    LazyWrapper.prototype.value = lazyValue;

	    // Add chaining functions to the `lodash` wrapper.
	    lodash.prototype.chain = wrapperChain;
	    lodash.prototype.commit = wrapperCommit;
	    lodash.prototype.concat = wrapperConcat;
	    lodash.prototype.plant = wrapperPlant;
	    lodash.prototype.reverse = wrapperReverse;
	    lodash.prototype.toString = wrapperToString;
	    lodash.prototype.run = lodash.prototype.toJSON = lodash.prototype.valueOf = lodash.prototype.value = wrapperValue;

	    // Add function aliases to the `lodash` wrapper.
	    lodash.prototype.collect = lodash.prototype.map;
	    lodash.prototype.head = lodash.prototype.first;
	    lodash.prototype.select = lodash.prototype.filter;
	    lodash.prototype.tail = lodash.prototype.rest;

	    return lodash;
	  }

	  /*--------------------------------------------------------------------------*/

	  // Export lodash.
	  var _ = runInContext();

	  // Some AMD build optimizers like r.js check for condition patterns like the following:
	  if (true) {
	    // Expose lodash to the global object when an AMD loader is present to avoid
	    // errors in cases where lodash is loaded by a script tag and not intended
	    // as an AMD module. See http://requirejs.org/docs/errors.html#mismatch for
	    // more details.
	    root._ = _;

	    // Define as an anonymous module so, through path mapping, it can be
	    // referenced as the "underscore" module.
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return _;
	    }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  }
	  // Check for `exports` after `define` in case a build optimizer adds an `exports` object.
	  else if (freeExports && freeModule) {
	    // Export for Node.js or RingoJS.
	    if (moduleExports) {
	      (freeModule.exports = _)._ = _;
	    }
	    // Export for Rhino with CommonJS support.
	    else {
	      freeExports._ = _;
	    }
	  }
	  else {
	    // Export for a browser or Rhino.
	    root._ = _;
	  }
	}.call(this));

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module), (function() { return this; }())))

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var require;var require;(function e$$0(y,V,h){function g(a,b){if(!V[a]){if(!y[a]){var e="function"==typeof require&&require;if(!b&&e)return require(a,!0);if(k)return k(a,!0);e=Error("Cannot find module '"+a+"'");throw e.code="MODULE_NOT_FOUND",e;}e=V[a]={exports:{}};y[a][0].call(e.exports,function(c){var b=y[a][1][c];return g(b?b:c)},e,e.exports,e$$0,y,V,h)}return V[a].exports}for(var k="function"==typeof require&&require,p=0;p<h.length;p++)g(h[p]);return g})({1:[function(D,y,V){y={isDomPresent:!0,navigator:navigator,window:window,
	document:document,ajax:function(h){var g=new XMLHttpRequest;g.open("GET",h,!1);g.overrideMimeType&&g.overrideMimeType("text/plain");g.setRequestHeader("If-Modified-Since","Fri, 01 Jan 1960 00:00:00 GMT");g.send(null);if(200!==g.status&&0!==g.status)throw"XMLHttpRequest failed, status code "+g.status;return g.responseText}};window.Processing=D("./src/")(y)},{"./src/":28}],2:[function(D,y,V){y.exports={name:"processing-js",version:"1.4.13",author:"Processing.js",repository:{type:"git",url:"git@github.com/processing-js/processing-js.git"},
	main:"processing.min.js",bugs:"https://github.com/processing-js/processing-js/issues",devDependencies:{argv:"~0.0.2",browserify:"~2.18.1",express:"~3.3.3","node-minify":"~0.7.3",nunjucks:"~0.1.9",open:"0.0.3",grunt:"~0.4.1","grunt-cli":"~0.1.8","grunt-contrib-jshint":"~0.4.3"},scripts:{test:"node test"},license:"MIT"}},{}],3:[function(D,y,V){y.exports=function(h){if(h instanceof Array){var g=-1;this.hasNext=function(){return++g<h.length};this.next=function(){return h[g]}}else{if(h.iterator instanceof
	Function)return h.iterator();throw"Unable to iterate: "+h;}}},{}],4:[function(D,y,V){y.exports={X:0,Y:1,Z:2,R:3,G:4,B:5,A:6,U:7,V:8,NX:9,NY:10,NZ:11,EDGE:12,SR:13,SG:14,SB:15,SA:16,SW:17,TX:18,TY:19,TZ:20,VX:21,VY:22,VZ:23,VW:24,AR:25,AG:26,AB:27,DR:3,DG:4,DB:5,DA:6,SPR:28,SPG:29,SPB:30,SHINE:31,ER:32,EG:33,EB:34,BEEN_LIT:35,VERTEX_FIELD_COUNT:36,P2D:1,JAVA2D:1,WEBGL:2,P3D:2,OPENGL:2,PDF:0,DXF:0,OTHER:0,WINDOWS:1,MAXOSX:2,LINUX:3,EPSILON:1E-4,MAX_FLOAT:3.4028235E38,MIN_FLOAT:-3.4028235E38,MAX_INT:2147483647,
	MIN_INT:-2147483648,PI:Math.PI,TWO_PI:2*Math.PI,TAU:2*Math.PI,HALF_PI:Math.PI/2,THIRD_PI:Math.PI/3,QUARTER_PI:Math.PI/4,DEG_TO_RAD:Math.PI/180,RAD_TO_DEG:180/Math.PI,WHITESPACE:" \t\n\r\f\u00a0",RGB:1,ARGB:2,HSB:3,ALPHA:4,CMYK:5,TIFF:0,TARGA:1,JPEG:2,GIF:3,BLUR:11,GRAY:12,INVERT:13,OPAQUE:14,POSTERIZE:15,THRESHOLD:16,ERODE:17,DILATE:18,REPLACE:0,BLEND:1,ADD:2,SUBTRACT:4,LIGHTEST:8,DARKEST:16,DIFFERENCE:32,EXCLUSION:64,MULTIPLY:128,SCREEN:256,OVERLAY:512,HARD_LIGHT:1024,SOFT_LIGHT:2048,DODGE:4096,
	BURN:8192,ALPHA_MASK:4278190080,RED_MASK:16711680,GREEN_MASK:65280,BLUE_MASK:255,CUSTOM:0,ORTHOGRAPHIC:2,PERSPECTIVE:3,POINT:2,POINTS:2,LINE:4,LINES:4,TRIANGLE:8,TRIANGLES:9,TRIANGLE_STRIP:10,TRIANGLE_FAN:11,QUAD:16,QUADS:16,QUAD_STRIP:17,POLYGON:20,PATH:21,RECT:30,ELLIPSE:31,ARC:32,SPHERE:40,BOX:41,GROUP:0,PRIMITIVE:1,GEOMETRY:3,VERTEX:0,BEZIER_VERTEX:1,CURVE_VERTEX:2,BREAK:3,CLOSESHAPE:4,OPEN:1,CLOSE:2,CORNER:0,CORNERS:1,RADIUS:2,CENTER_RADIUS:2,CENTER:3,DIAMETER:3,CENTER_DIAMETER:3,BASELINE:0,
	TOP:101,BOTTOM:102,NORMAL:1,NORMALIZED:1,IMAGE:2,MODEL:4,SHAPE:5,SQUARE:"butt",ROUND:"round",PROJECT:"square",MITER:"miter",BEVEL:"bevel",AMBIENT:0,DIRECTIONAL:1,SPOT:3,BACKSPACE:8,TAB:9,ENTER:10,RETURN:13,ESC:27,DELETE:127,CODED:65535,SHIFT:16,CONTROL:17,ALT:18,CAPSLK:20,PGUP:33,PGDN:34,END:35,HOME:36,LEFT:37,UP:38,RIGHT:39,DOWN:40,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,NUMLK:144,META:157,INSERT:155,ARROW:"default",CROSS:"crosshair",HAND:"pointer",
	MOVE:"move",TEXT:"text",WAIT:"wait",NOCURSOR:"url('data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='), auto",DISABLE_OPENGL_2X_SMOOTH:1,ENABLE_OPENGL_2X_SMOOTH:-1,ENABLE_OPENGL_4X_SMOOTH:2,ENABLE_NATIVE_FONTS:3,DISABLE_DEPTH_TEST:4,ENABLE_DEPTH_TEST:-4,ENABLE_DEPTH_SORT:5,DISABLE_DEPTH_SORT:-5,DISABLE_OPENGL_ERROR_REPORT:6,ENABLE_OPENGL_ERROR_REPORT:-6,ENABLE_ACCURATE_TEXTURES:7,DISABLE_ACCURATE_TEXTURES:-7,HINT_COUNT:10,SINCOS_LENGTH:720,PRECISIONB:15,PRECISIONF:32768,
	PREC_MAXVAL:32767,PREC_ALPHA_SHIFT:9,PREC_RED_SHIFT:1,NORMAL_MODE_AUTO:0,NORMAL_MODE_SHAPE:1,NORMAL_MODE_VERTEX:2,MAX_LIGHTS:8}},{}],5:[function(D,y,V){y.exports=function(h){var g={BufferMax:200},k=h.createElement("style"),p=!1;k.textContent=".pjsconsole.hidden {\n  display: none!important;\n}";g.wrapper=h.createElement("div");k.textContent+="\n.pjsconsole {\n  opacity: .75;\n  display: block;\n  position: fixed;\n  bottom: 0px;\n  left: 0px;\n  right: 0px;\n  height: 50px;\n  background-color: #aaa;\n}";
	g.wrapper.classList.add("pjsconsole");g.dragger=h.createElement("div");k.textContent+="\n.pjsconsole .dragger {\n  display: block;\n  border: 3px black raised;\n  cursor: n-resize;\n  position: absolute;\n  top: 0px;\n  left: 0px;\n  right: 0px;\n  height: 5px;\n  background-color: #333;\n}";g.dragger.classList.add("dragger");g.closer=h.createElement("div");k.textContent+="\n.pjsconsole .closer {\n  opacity: .5;\n  display: block;\n  border: 3px black raised;\n  position: absolute;\n  top: 10px;\n  right: 30px;\n  height: 20px;\n  width: 20px;\n  background-color: #ddd;\n  color: #000;\n  line-height: 20px;\n  text-align: center;\n  cursor: pointer\n}";
	g.closer.classList.add("closer");g.closer.innerHTML="&#10006;";g.javaconsole=h.createElement("div");k.textContent+="\n.pjsconsole .console {\n  overflow-x: auto;\n  display: block;\n  position: absolute;\n  left: 10px;\n  right: 0px;\n  bottom: 5px;\n  top: 10px;\n  overflow-y: scroll;\n  height: 40px;\n}";g.javaconsole.setAttribute("class","console");g.wrapper.appendChild(g.dragger);g.wrapper.appendChild(g.javaconsole);g.wrapper.appendChild(g.closer);g.dragger.onmousedown=function(a){g.divheight=
	g.wrapper.style.height;h.selection?h.selection.empty():window.getSelection().removeAllRanges();var b=a.screenY;window.onmousemove=function(a){g.wrapper.style.height=parseFloat(g.divheight)+(b-a.screenY)+"px";g.javaconsole.style.height=parseFloat(g.divheight)+(b-a.screenY)-10+"px"};window.onmouseup=function(a){h.selection?h.selection.empty():window.getSelection().removeAllRanges();g.wrapper.style.height=parseFloat(g.divheight)+(b-a.screenY)+"px";g.javaconsole.style.height=parseFloat(g.divheight)+(b-
	a.screenY)-10+"px";window.onmousemove=null;window.onmouseup=null}};g.BufferArray=[];g.print=g.log=function(){var a=Array.prototype.slice.call(arguments);t=a.map(function(b,e){return b+(e+1===a.length?"":" ")}).join("");g.BufferArray[g.BufferArray.length-1]?g.BufferArray[g.BufferArray.length-1]+=t+"":g.BufferArray.push(t);g.javaconsole.innerHTML=g.BufferArray.join("");g.showconsole()};g.println=function(){p||(h.body.appendChild(k),h.body.appendChild(g.wrapper),p=!0);var a=Array.prototype.slice.call(arguments);
	a.push("<br>");g.print.apply(g,a);g.BufferArray.length>g.BufferMax?g.BufferArray.splice(0,1):g.javaconsole.scrollTop=g.javaconsole.scrollHeight};g.showconsole=function(){g.wrapper.classList.remove("hidden")};g.hideconsole=function(){g.wrapper.classList.add("hidden")};g.closer.onclick=function(){g.hideconsole()};g.hideconsole();return g}},{}],6:[function(D,y,V){y.exports=function(h){function g(){}function k(a,e,c){if(a.hasOwnProperty(e)&&"function"===typeof a[e]){var n=a[e];if("$overloads"in n)n.$defaultOverload=
	c;else if("$overloads"in c||n.length!==c.length){var q;"$overloads"in c?(q=c.$overloads.slice(0),q[n.length]=n,n=c.$defaultOverload):(q=[],q[c.length]=c,q[n.length]=n);var T=function(){return(T.$overloads[arguments.length]||("$methodArgsIndex"in T&&arguments.length>T.$methodArgsIndex?T.$overloads[T.$methodArgsIndex]:null)||T.$defaultOverload).apply(this,arguments)};T.$overloads=q;"$methodArgsIndex"in c&&(T.$methodArgsIndex=c.$methodArgsIndex);T.$defaultOverload=n;T.name=e;a[e]=T}}else a[e]=c}function p(b,
	e){function c(c){a.defineProperty(b,c,{get:function(){return e[c]},set:function(f){e[c]=f},enumerable:!0})}var n=[],q;for(q in e)"function"===typeof e[q]?k(b,q,e[q]):"$"===q.charAt(0)||q in b||n.push(q);for(;0<n.length;)c(n.shift());b.$super=e}g.prototype=h.PConstants;var a=new g;Object.keys(h).forEach(function(b){a[b]=h[b]});a.defineProperty=function(a,e,c){"defineProperty"in Object?Object.defineProperty(a,e,c):(c.hasOwnProperty("get")&&a.__defineGetter__(e,c.get),c.hasOwnProperty("set")&&a.__defineSetter__(e,
	c.set))};a.extendClassChain=function(a){for(var e=[a],c=a.$upcast;c;c=c.$upcast)p(c,a),e.push(c),a=c;for(;0<e.length;)e.pop().$self=a};a.extendStaticMembers=function(a,e){p(a,e)};a.extendInterfaceMembers=function(a,e){p(a,e)};a.addMethod=function(a,e,c,n){var q=a[e];if(q||n){var T=c.length;if("$overloads"in q)q.$overloads[T]=c;else{var f=function(){return(f.$overloads[arguments.length]||("$methodArgsIndex"in f&&arguments.length>f.$methodArgsIndex?f.$overloads[f.$methodArgsIndex]:null)||f.$defaultOverload).apply(this,
	arguments)},g=[];q&&(g[q.length]=q);g[T]=c;f.$overloads=g;f.$defaultOverload=q||c;n&&(f.$methodArgsIndex=T);f.name=e;a[e]=f}}else a[e]=c};a.createJavaArray=function(b,e){var c=null,n=null;if("string"===typeof b)if("boolean"===b)n=!1;else{var q;q="string"!==typeof b?!1:-1!=="byte int char color float long double".split(" ").indexOf(b);q&&(n=0)}if("number"===typeof e[0])if(q=0|e[0],1>=e.length){c=[];c.length=q;for(var T=0;T<q;++T)c[T]=n}else for(c=[],n=e.slice(1),T=0;T<q;++T)c.push(a.createJavaArray(b,
	n));return c};a.defineProperty(a,"screenWidth",{get:function(){return window.innerWidth}});a.defineProperty(a,"screenHeight",{get:function(){return window.innerHeight}});return a}},{}],7:[function(D,y,V){y.exports=function(h,g){var k=g.window,p=g.document,a=k.XMLHttpRequest,b=g.noop,e=g.isDOMPresent,c=g.version;h.version=c?c:"@DEV-VERSION@";h.lib={};h.registerLibrary=function(c,f){h.lib[c]=f;f.hasOwnProperty("init")&&f.init(defaultScope)};h.Sketch=function(c){this.attachFunction=c;this.options={pauseOnBlur:!1,
	globalKeyEvents:!1};this.onExit=this.onFrameEnd=this.onFrameStart=this.onLoop=this.onPause=this.onSetup=this.onLoad=b;this.params={};this.imageCache={pending:0,images:{},operaCache:{},add:function(c,a){if(!this.images[c]&&(e||(this.images[c]=null),a||(a=new Image,a.onload=function(c){return function(){c.pending--}}(this),this.pending++,a.src=c),this.images[c]=a,k.opera)){var b=p.createElement("div");b.appendChild(a);b.style.position="absolute";b.style.opacity=0;b.style.width="1px";b.style.height=
	"1px";this.operaCache[c]||(p.body.appendChild(b),this.operaCache[c]=b)}}};this.sourceCode=void 0;this.attach=function(c){if("function"===typeof this.attachFunction)this.attachFunction(c);else if(this.sourceCode){var a=(new Function("return ("+this.sourceCode+");"))();a(c);this.attachFunction=a}else throw"Unable to attach sketch to the processing instance";};this.toString=function(){var c,a;a="((function(Sketch) {\n"+("var sketch = new Sketch(\n"+this.sourceCode+");\n");for(c in this.options)if(this.options.hasOwnProperty(c)){var e=
	this.options[c];a+="sketch.options."+c+" = "+("string"===typeof e?'"'+e+'"':""+e)+";\n"}for(c in this.imageCache)this.options.hasOwnProperty(c)&&(a+='sketch.imageCache.add("'+c+'");\n');return a+"return sketch;\n})(Processing.Sketch))"}};var n=h.loadSketchFromSources=function(c,f){function e(c,f){var b=new a;b.onreadystatechange=function(){if(4===b.readyState){var c;200!==b.status&&0!==b.status?c="Invalid XHR status "+b.status:""===b.responseText&&(c="withCredentials"in new a&&!1===(new a).withCredentials&&
	"file:"===k.location.protocol?"XMLHttpRequest failure, possibly due to a same-origin policy violation. You can try loading this page in another browser, or load it from http://localhost using a local webserver. See the Processing.js README for a more detailed explanation of this problem and solutions.":"File is empty.");f(b.responseText,c)}};b.open("GET",c,!0);b.overrideMimeType&&b.overrideMimeType("application/json");b.setRequestHeader("If-Modified-Since","Fri, 01 Jan 1960 00:00:00 GMT");b.send(null)}
	function b(f,a){function k(b,e){n[f]=b;++u;e&&q.push(a+" ==> "+e);if(u===g){if(0===q.length)return new h(c,n.join("\n"));throw"Processing.js: Unable to load pjs sketch files: "+q.join("\n");}}if("#"===a.charAt(0)){var da=p.getElementById(a.substring(1));da?k(da.text||da.textContent):k("","Unable to load pjs sketch: element with id '"+a.substring(1)+"' was not found")}else e(a,k)}for(var n=[],q=[],g=f.length,u=0,la=0;la<g;++la)b(la,f[la])},q=function(){p.removeEventListener("DOMContentLoaded",q,!1);
	for(var c;0<h.instances.length;)for(c=h.instances.length-1;0<=c;c--)h.instances[c]&&h.instances[c].exit();var f=p.getElementsByTagName("canvas"),a;c=0;for(l=f.length;c<l;c++){var b=f[c].getAttribute("data-processing-sources");null===b&&(b=f[c].getAttribute("data-src"),null===b&&(b=f[c].getAttribute("datasrc")));if(b){a=b.split(/\s+/g);for(b=0;b<a.length;)a[b]?b++:a.splice(b,1);n(f[c],a)}}var e,f=p.getElementsByTagName("script"),b=[];for(c=f.length-1;0<=c;c--)b.push(f[c]);c=0;for(e=b.length;c<e;c++)if(a=
	b[c],a.getAttribute&&(f=a.getAttribute("type"))&&("text/processing"===f.toLowerCase()||"application/processing"===f.toLowerCase())){var g=a.getAttribute("data-processing-target"),f=void 0;if(g)f=p.getElementById(g);else{for(g=a.nextSibling;g&&1!==g.nodeType;)g=g.nextSibling;g&&"canvas"===g.nodeName.toLowerCase()&&(f=g)}f&&(a.getAttribute("src")?(a=a.getAttribute("src").split(/\s+/),n(f,a)):(a=a.textContent||a.text,new h(f,a)))}};p.addEventListener("DOMContentLoaded",q,!1);h.reload=q;h.disableInit=
	function(){p.removeEventListener("DOMContentLoaded",q,!1)};return h}},{}],8:[function(D,y,V){y.exports=function(h,g){return null===h||null===g?null===h&&null===g:"string"===typeof h||"object"!==typeof h?h===g:h.equals instanceof Function?h.equals(g):h===g}},{}],9:[function(D,y,V){y.exports=function(h,g){if("string"===typeof h){for(var k=0,p=0;p<h.length;++p)k=31*k+h.charCodeAt(p)&4294967295;return k}if("object"!==typeof h)return h&4294967295;if(h.hashCode instanceof Function)return h.hashCode();h.$id===
	g&&(h.$id=Math.floor(65536*Math.random())-32768<<16|Math.floor(65536*Math.random()));return h.$id}},{}],10:[function(D,y,V){y.exports=function(h){function g(a){var b=-1;this.hasNext=function(){return b+1<a.length};this.next=function(){return a[++b]};this.remove=function(){a.splice(b--,1)}}function k(a){var b=[];a&&a.toArray&&(b=a.toArray());this.get=function(a){return b[a]};this.contains=function(a){return-1<this.indexOf(a)};this.indexOf=function(a){for(var c=0,n=b.length;c<n;++c)if(p(a,b[c]))return c;
	return-1};this.lastIndexOf=function(a){for(var c=b.length-1;0<=c;--c)if(p(a,b[c]))return c;return-1};this.add=function(){if(1===arguments.length)b.push(arguments[0]);else if(2===arguments.length){var a=arguments[0];if("number"===typeof a)if(0<=a&&a<=b.length)b.splice(a,0,arguments[1]);else throw a+" is not a valid index";else throw typeof a+" is not a number";}else throw"Please use the proper number of parameters.";};this.addAll=function(a,c){var n;if("number"===typeof a){if(0>a||a>b.length)throw"Index out of bounds for addAll: "+
	a+" greater or equal than "+b.length;for(n=new ObjectIterator(c);n.hasNext();)b.splice(a++,0,n.next())}else for(n=new ObjectIterator(a);n.hasNext();)b.push(n.next())};this.set=function(){if(2===arguments.length){var a=arguments[0];if("number"===typeof a)if(0<=a&&a<b.length)b.splice(a,1,arguments[1]);else throw a+" is not a valid index.";else throw typeof a+" is not a number";}else throw"Please use the proper number of parameters.";};this.size=function(){return b.length};this.clear=function(){b.length=
	0};this.remove=function(a){if("number"===typeof a)return b.splice(a,1)[0];a=this.indexOf(a);return-1<a?(b.splice(a,1),!0):!1};this.removeAll=function(a){var c,b,q,g=new k;g.addAll(this);this.clear();for(b=c=0;c<g.size();c++)q=g.get(c),a.contains(q)||this.add(b++,q);return this.size()<g.size()?!0:!1};this.isEmpty=function(){return!b.length};this.clone=function(){return new k(this)};this.toArray=function(){return b.slice(0)};this.iterator=function(){return new g(b)}}var p=h.virtEquals;return k}},{}],
	11:[function(D,y,V){y.exports=function(h,g){var k=function(p){this.code="string"===typeof p&&1===p.length?p.charCodeAt(0):"number"===typeof p?p:p instanceof k?p:NaN;return h[this.code]===g?h[this.code]=this:h[this.code]};k.prototype.toString=function(){return String.fromCharCode(this.code)};k.prototype.valueOf=function(){return this.code};return k}({})},{}],12:[function(D,y,V){y.exports=function(h){function g(){function a(c){c=k(c)%f.length;return 0>c?f.length+c:c}function b(){if(!(h<=T*f.length)){for(var c=
	[],b=0;b<f.length;++b)void 0!==f[b]&&(c=c.concat(f[b]));b=2*f.length;f=[];f.length=b;for(b=0;b<c.length;++b){var e=a(c[b].key),n=f[e];void 0===n&&(f[e]=n=[]);n.push(c[b])}}}function e(c,a){function b(){for(;!q;)if(++n,e>=f.length)q=!0;else if(void 0===f[e]||n>=f[e].length)n=-1,++e;else break}var e=0,n=-1,q=!1,g;this.hasNext=function(){return!q};this.next=function(){g=c(f[e][n]);b();return g};this.remove=function(){void 0!==g&&(a(g),--n,b())};b()}function c(c,a,f){this.clear=function(){da.clear()};
	this.contains=function(c){return a(c)};this.containsAll=function(c){for(c=c.iterator();c.hasNext();)if(!this.contains(c.next()))return!1;return!0};this.isEmpty=function(){return da.isEmpty()};this.iterator=function(){return new e(c,f)};this.remove=function(c){return this.contains(c)?(f(c),!0):!1};this.removeAll=function(c){for(c=c.iterator();c.hasNext();){var a=c.next();this.contains(a)&&f(a)}return!0};this.retainAll=function(c){for(var a=this.iterator(),b=[];a.hasNext();){var e=a.next();c.contains(e)||
	b.push(e)}for(c=0;c<b.length;++c)f(b[c]);return 0<b.length};this.size=function(){return da.size()};this.toArray=function(){for(var c=[],a=this.iterator();a.hasNext();)c.push(a.next());return c}}function n(c){this._isIn=function(a){return a===da&&void 0===c.removed};this.equals=function(a){return p(c.key,a.getKey())};this.getKey=function(){return c.key};this.getValue=function(){return c.value};this.hashCode=function(a){return k(c.key)};this.setValue=function(a){var f=c.value;c.value=a;return f}}if(1===
	arguments.length&&arguments[0]instanceof g)return arguments[0].clone();var q=0<arguments.length?arguments[0]:16,T=1<arguments.length?arguments[1]:0.75,f=[];f.length=q;var h=0,da=this;this.clear=function(){h=0;f=[];f.length=q};this.clone=function(){var c=new g;c.putAll(this);return c};this.containsKey=function(c){var b=a(c),b=f[b];if(void 0===b)return!1;for(var e=0;e<b.length;++e)if(p(b[e].key,c))return!0;return!1};this.containsValue=function(c){for(var a=0;a<f.length;++a){var b=f[a];if(void 0!==b)for(var e=
	0;e<b.length;++e)if(p(b[e].value,c))return!0}return!1};this.entrySet=function(){return new c(function(c){return new n(c)},function(c){return c instanceof n&&c._isIn(da)},function(c){return da.remove(c.getKey())})};this.get=function(c){var b=a(c),b=f[b];if(void 0===b)return null;for(var e=0;e<b.length;++e)if(p(b[e].key,c))return b[e].value;return null};this.isEmpty=function(){return 0===h};this.keySet=function(){return new c(function(c){return c.key},function(c){return da.containsKey(c)},function(c){return da.remove(c)})};
	this.values=function(){return new c(function(c){return c.value},function(c){return da.containsValue(c)},function(c){return da.removeByValue(c)})};this.put=function(c,e){var n=a(c),q=f[n];if(void 0===q)return++h,f[n]=[{key:c,value:e}],b(),null;for(n=0;n<q.length;++n)if(p(q[n].key,c)){var g=q[n].value;q[n].value=e;return g}++h;q.push({key:c,value:e});b();return null};this.putAll=function(c){for(c=c.entrySet().iterator();c.hasNext();){var a=c.next();this.put(a.getKey(),a.getValue())}};this.remove=function(c){var b=
	a(c),e=f[b];if(void 0===e)return null;for(var n=0;n<e.length;++n)if(p(e[n].key,c))return--h,c=e[n].value,e[n].removed=!0,1<e.length?e.splice(n,1):f[b]=void 0,c;return null};this.removeByValue=function(c){var a,b,e,n;for(a in f)if(f.hasOwnProperty(a))for(b=0,e=f[a].length;b<e;b++)if(n=f[a][b],n.value===c)return f[a].splice(b,1),!0;return!1};this.size=function(){return h}}var k=h.virtHashCode,p=h.virtEquals;return g}},{}],13:[function(D,y,V){y.exports=function(h,g){function k(b,e){b===g&&(b="");this.name=
	b;e===g&&(e=0);this.size=e;this.glyph=!1;this.descent=this.ascent=0;this.leading=1.2*e;var c=b.indexOf(" Italic Bold");-1!==c&&(b=b.substring(0,c));this.style="normal";c=b.indexOf(" Italic");-1!==c&&(b=b.substring(0,c),this.style="italic");this.weight="normal";c=b.indexOf(" Bold");-1!==c&&(b=b.substring(0,c),this.weight="bold");this.family="sans-serif";if(b!==g)switch(b){case "sans-serif":case "serif":case "monospace":case "fantasy":case "cursive":this.family=b;break;default:this.family='"'+b+'", sans-serif'}var c=
	this.size/250,n=p.createElement("canvas");n.width=500;n.height=500;n.style.opacity=0;var q=this.getCSSDefinition("250px","normal"),T=n.getContext("2d");T.font=q;n.width=T.measureText("dbflkhyjqpg").width;T.font=q;q=p.createElement("div");q.style.position="absolute";q.style.opacity=0;q.style.fontFamily='"'+this.name+'"';q.style.fontSize="250px";q.innerHTML="dbflkhyjqpg<br/>dbflkhyjqpg";p.body.appendChild(q);var f=n.width,h=n.height,n=h/2;T.fillStyle="white";T.fillRect(0,0,f,h);T.fillStyle="black";
	T.fillText("dbflkhyjqpg",0,n);for(var h=T.getImageData(0,0,f,h).data,k=0,I=4*f,F=h.length;++k<F&&255===h[k];)a();f=Math.round(k/I);for(k=F-1;0<--k&&255===h[k];)a();h=Math.round(k/I);this.ascent=c*(n-f);this.descent=c*(h-n);p.defaultView.getComputedStyle&&(n=p.defaultView.getComputedStyle(q,null).getPropertyValue("height"),n=c*n.replace("px",""),n>=2*this.size&&(this.leading=Math.round(n/2)));p.body.removeChild(q);c=this.caching?T:void 0;this.context2d=c;this.css=this.getCSSDefinition();this.context2d&&
	(this.context2d.font=this.css)}var p=h.Browser.document,a=h.noop;k.prototype.caching=!0;k.prototype.getCSSDefinition=function(a,e){a===g&&(a=this.size+"px");e===g&&(e=this.leading+"px");return[this.style,"normal",this.weight,a+"/"+e,this.family].join(" ")};k.prototype.measureTextWidth=function(a){return this.context2d.measureText(a).width};k.prototype.measureTextWidthFallback=function(a){var e=p.createElement("canvas").getContext("2d");e.font=this.css;return e.measureText(a).width};k.PFontCache={length:0};
	k.get=function(a,e){e=(10*e+0.5|0)/10;var c=k.PFontCache,n=a+"/"+e;if(!c[n]){c[n]=new k(a,e);c.length++;if(50===c.length){k.prototype.measureTextWidth=k.prototype.measureTextWidthFallback;k.prototype.caching=!1;for(var q in c)"length"!==q&&(c[q].context2d=null);return new k(a,e)}if(400===c.length)return k.PFontCache={},k.get=k.getFallback,new k(a,e)}return c[n]};k.getFallback=function(a,e){return new k(a,e)};k.list=function(){return["sans-serif","serif","monospace","fantasy","cursive"]};k.preloading=
	{template:{},initialized:!1,initialize:function(){var a=p.createElement("style");a.setAttribute("type","text/css");a.innerHTML='@font-face {\n  font-family: "PjsEmptyFont";\n  src: url(\'data:application/x-font-ttf;base64,'+function(){return"#E3KAI2wAgT1MvMg7Eo3VmNtYX7ABi3CxnbHlm7Abw3kaGVhZ7ACs3OGhoZWE7A53CRobXR47AY3AGbG9jYQ7G03Bm1heH7ABC3CBuYW1l7Ae3AgcG9zd7AI3AE#B3AQ2kgTY18PPPUACwAg3ALSRoo3#yld0xg32QAB77#E777773B#E3C#I#Q77773E#Q7777777772CMAIw7AB77732B#M#Q3wAB#g3B#E#E2BB//82BB////w#B7#gAEg3E77x2B32B#E#Q#MTcBAQ32gAe#M#QQJ#E32M#QQJ#I#g32Q77#".replace(/[#237]/g,
	function(a){return"AAAAAAAA".substr(~~a?7-a:6)})}()+"')\n       format('truetype');\n}";p.head.appendChild(a);a=p.createElement("span");a.style.cssText='position: absolute; top: -1000; left: 0; opacity: 0; font-family: "PjsEmptyFont", fantasy;';a.innerHTML="AAAAAAAA";p.body.appendChild(a);this.template=a;this.initialized=!0},getElementWidth:function(a){return p.defaultView.getComputedStyle(a,"").getPropertyValue("width")},timeAttempted:0,pending:function(a){this.initialized||this.initialize();for(var e,
	c,n=this.getElementWidth(this.template),q=0;q<this.fontList.length;q++){e=this.fontList[q];c=this.getElementWidth(e);if(4E3>this.timeAttempted&&c===n)return this.timeAttempted+=a,!0;p.body.removeChild(e);this.fontList.splice(q--,1);this.timeAttempted=0}return 0===this.fontList.length?!1:!0},fontList:[],addedList:{},add:function(a){this.initialized||this.initialize();var e="object"===typeof a?a.fontFace:a;a="object"===typeof a?a.url:a;if(!this.addedList[e]){var c=p.createElement("style");c.setAttribute("type",
	"text/css");c.innerHTML="@font-face{\n  font-family: '"+e+"';\n  src:  url('"+a+"');\n}\n";p.head.appendChild(c);this.addedList[e]=!0;a=p.createElement("span");a.style.cssText="position: absolute; top: 0; left: 0; opacity: 0;";a.style.fontFamily='"'+e+'", "PjsEmptyFont", fantasy';a.innerHTML="AAAAAAAA";p.body.appendChild(a);this.fontList.push(a)}}};return k}},{}],14:[function(D,y,V){y.exports=function(h,g){var k=h.p,p=function(){0===arguments.length?this.reset():1===arguments.length&&arguments[0]instanceof
	p?this.set(arguments[0].array()):6===arguments.length&&this.set(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4],arguments[5])};p.prototype={set:function(){if(6===arguments.length){var a=arguments;this.set([a[0],a[1],a[2],a[3],a[4],a[5]])}else 1===arguments.length&&arguments[0]instanceof p?this.elements=arguments[0].array():1===arguments.length&&arguments[0]instanceof Array&&(this.elements=arguments[0].slice())},get:function(){var a=new p;a.set(this.elements);return a},reset:function(){this.set([1,
	0,0,0,1,0])},array:function(){return this.elements.slice()},translate:function(a,b){this.elements[2]=a*this.elements[0]+b*this.elements[1]+this.elements[2];this.elements[5]=a*this.elements[3]+b*this.elements[4]+this.elements[5]},invTranslate:function(a,b){this.translate(-a,-b)},transpose:function(){},mult:function(a,b){var e,c;a instanceof PVector?(e=a.x,c=a.y,b||(b=new PVector)):a instanceof Array&&(e=a[0],c=a[1],b||(b=[]));b instanceof Array?(b[0]=this.elements[0]*e+this.elements[1]*c+this.elements[2],
	b[1]=this.elements[3]*e+this.elements[4]*c+this.elements[5]):b instanceof PVector&&(b.x=this.elements[0]*e+this.elements[1]*c+this.elements[2],b.y=this.elements[3]*e+this.elements[4]*c+this.elements[5],b.z=0);return b},multX:function(a,b){return a*this.elements[0]+b*this.elements[1]+this.elements[2]},multY:function(a,b){return a*this.elements[3]+b*this.elements[4]+this.elements[5]},skewX:function(a){this.apply(1,0,1,a,0,0)},skewY:function(a){this.apply(1,0,1,0,a,0)},shearX:function(a){this.apply(1,
	0,1,Math.tan(a),0,0)},shearY:function(a){this.apply(1,0,1,0,Math.tan(a),0)},determinant:function(){return this.elements[0]*this.elements[4]-this.elements[1]*this.elements[3]},invert:function(){var a=this.determinant();if(Math.abs(a)>PConstants.MIN_INT){var b=this.elements[0],e=this.elements[1],c=this.elements[2],n=this.elements[3],q=this.elements[4],g=this.elements[5];this.elements[0]=q/a;this.elements[3]=-n/a;this.elements[1]=-e/a;this.elements[4]=b/a;this.elements[2]=(e*g-q*c)/a;this.elements[5]=
	(n*c-b*g)/a;return!0}return!1},scale:function(a,b){a&&!b&&(b=a);a&&b&&(this.elements[0]*=a,this.elements[1]*=b,this.elements[3]*=a,this.elements[4]*=b)},invScale:function(a,b){a&&!b&&(b=a);this.scale(1/a,1/b)},apply:function(){var a;1===arguments.length&&arguments[0]instanceof p?a=arguments[0].array():6===arguments.length?a=Array.prototype.slice.call(arguments):1===arguments.length&&arguments[0]instanceof Array&&(a=arguments[0]);for(var b=[0,0,this.elements[2],0,0,this.elements[5]],e=0,c=0;2>c;c++)for(var n=
	0;3>n;n++,e++)b[e]+=this.elements[3*c+0]*a[n+0]+this.elements[3*c+1]*a[n+3];this.elements=b.slice()},preApply:function(){var a;1===arguments.length&&arguments[0]instanceof p?a=arguments[0].array():6===arguments.length?a=Array.prototype.slice.call(arguments):1===arguments.length&&arguments[0]instanceof Array&&(a=arguments[0]);var b=[0,0,a[2],0,0,a[5]];b[2]=a[2]+this.elements[2]*a[0]+this.elements[5]*a[1];b[5]=a[5]+this.elements[2]*a[3]+this.elements[5]*a[4];b[0]=this.elements[0]*a[0]+this.elements[3]*
	a[1];b[3]=this.elements[0]*a[3]+this.elements[3]*a[4];b[1]=this.elements[1]*a[0]+this.elements[4]*a[1];b[4]=this.elements[1]*a[3]+this.elements[4]*a[4];this.elements=b.slice()},rotate:function(a){var b=Math.cos(a);a=Math.sin(a);var e=this.elements[0],c=this.elements[1];this.elements[0]=b*e+a*c;this.elements[1]=-a*e+b*c;e=this.elements[3];c=this.elements[4];this.elements[3]=b*e+a*c;this.elements[4]=-a*e+b*c},rotateZ:function(a){this.rotate(a)},invRotateZ:function(a){this.rotateZ(a-Math.PI)},print:function(){var a=
	printMatrixHelper(this.elements),a=""+k.nfs(this.elements[0],a,4)+" "+k.nfs(this.elements[1],a,4)+" "+k.nfs(this.elements[2],a,4)+"\n"+k.nfs(this.elements[3],a,4)+" "+k.nfs(this.elements[4],a,4)+" "+k.nfs(this.elements[5],a,4)+"\n\n";k.println(a)}};return p}},{}],15:[function(D,y,V){y.exports=function(h,g){var k=h.p,p=function(){this.reset()};p.prototype={set:function(){16===arguments.length?this.elements=Array.prototype.slice.call(arguments):1===arguments.length&&arguments[0]instanceof p?this.elements=
	arguments[0].array():1===arguments.length&&arguments[0]instanceof Array&&(this.elements=arguments[0].slice())},get:function(){var a=new p;a.set(this.elements);return a},reset:function(){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]},array:function(){return this.elements.slice()},translate:function(a,b,e){e===g&&(e=0);this.elements[3]+=a*this.elements[0]+b*this.elements[1]+e*this.elements[2];this.elements[7]+=a*this.elements[4]+b*this.elements[5]+e*this.elements[6];this.elements[11]+=a*this.elements[8]+
	b*this.elements[9]+e*this.elements[10];this.elements[15]+=a*this.elements[12]+b*this.elements[13]+e*this.elements[14]},transpose:function(){var a=this.elements[4];this.elements[4]=this.elements[1];this.elements[1]=a;a=this.elements[8];this.elements[8]=this.elements[2];this.elements[2]=a;a=this.elements[6];this.elements[6]=this.elements[9];this.elements[9]=a;a=this.elements[3];this.elements[3]=this.elements[12];this.elements[12]=a;a=this.elements[7];this.elements[7]=this.elements[13];this.elements[13]=
	a;a=this.elements[11];this.elements[11]=this.elements[14];this.elements[14]=a},mult:function(a,b){var e,c,n,q;a instanceof PVector?(e=a.x,c=a.y,n=a.z,q=1,b||(b=new PVector)):a instanceof Array&&(e=a[0],c=a[1],n=a[2],q=a[3]||1,!b||3!==b.length&&4!==b.length)&&(b=[0,0,0]);b instanceof Array&&(3===b.length?(b[0]=this.elements[0]*e+this.elements[1]*c+this.elements[2]*n+this.elements[3],b[1]=this.elements[4]*e+this.elements[5]*c+this.elements[6]*n+this.elements[7],b[2]=this.elements[8]*e+this.elements[9]*
	c+this.elements[10]*n+this.elements[11]):4===b.length&&(b[0]=this.elements[0]*e+this.elements[1]*c+this.elements[2]*n+this.elements[3]*q,b[1]=this.elements[4]*e+this.elements[5]*c+this.elements[6]*n+this.elements[7]*q,b[2]=this.elements[8]*e+this.elements[9]*c+this.elements[10]*n+this.elements[11]*q,b[3]=this.elements[12]*e+this.elements[13]*c+this.elements[14]*n+this.elements[15]*q));b instanceof PVector&&(b.x=this.elements[0]*e+this.elements[1]*c+this.elements[2]*n+this.elements[3],b.y=this.elements[4]*
	e+this.elements[5]*c+this.elements[6]*n+this.elements[7],b.z=this.elements[8]*e+this.elements[9]*c+this.elements[10]*n+this.elements[11]);return b},preApply:function(){var a;1===arguments.length&&arguments[0]instanceof p?a=arguments[0].array():16===arguments.length?a=Array.prototype.slice.call(arguments):1===arguments.length&&arguments[0]instanceof Array&&(a=arguments[0]);for(var b=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],e=0,c=0;4>c;c++)for(var n=0;4>n;n++,e++)b[e]+=this.elements[n+0]*a[4*c+0]+this.elements[n+
	4]*a[4*c+1]+this.elements[n+8]*a[4*c+2]+this.elements[n+12]*a[4*c+3];this.elements=b.slice()},apply:function(){var a;1===arguments.length&&arguments[0]instanceof p?a=arguments[0].array():16===arguments.length?a=Array.prototype.slice.call(arguments):1===arguments.length&&arguments[0]instanceof Array&&(a=arguments[0]);for(var b=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],e=0,c=0;4>c;c++)for(var n=0;4>n;n++,e++)b[e]+=this.elements[4*c+0]*a[n+0]+this.elements[4*c+1]*a[n+4]+this.elements[4*c+2]*a[n+8]+this.elements[4*
	c+3]*a[n+12];this.elements=b.slice()},rotate:function(a,b,e,c){if(e){var n=Math.cos(a);a=Math.sin(a);var q=1-n;this.apply(q*b*b+n,q*b*e-a*c,q*b*c+a*e,0,q*b*e+a*c,q*e*e+n,q*e*c-a*b,0,q*b*c-a*e,q*e*c+a*b,q*c*c+n,0,0,0,0,1)}else this.rotateZ(a)},invApply:function(){inverseCopy===g&&(inverseCopy=new p);var a=arguments;inverseCopy.set(a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9],a[10],a[11],a[12],a[13],a[14],a[15]);if(!inverseCopy.invert())return!1;this.preApply(inverseCopy);return!0},rotateX:function(a){var b=
	Math.cos(a);a=Math.sin(a);this.apply([1,0,0,0,0,b,-a,0,0,a,b,0,0,0,0,1])},rotateY:function(a){var b=Math.cos(a);a=Math.sin(a);this.apply([b,0,a,0,0,1,0,0,-a,0,b,0,0,0,0,1])},rotateZ:function(a){var b=Math.cos(a);a=Math.sin(a);this.apply([b,-a,0,0,a,b,0,0,0,0,1,0,0,0,0,1])},scale:function(a,b,e){!a||b||e?a&&(b&&!e)&&(e=1):b=e=a;a&&(b&&e)&&(this.elements[0]*=a,this.elements[1]*=b,this.elements[2]*=e,this.elements[4]*=a,this.elements[5]*=b,this.elements[6]*=e,this.elements[8]*=a,this.elements[9]*=b,
	this.elements[10]*=e,this.elements[12]*=a,this.elements[13]*=b,this.elements[14]*=e)},skewX:function(a){a=Math.tan(a);this.apply(1,a,0,0,0,1,0,0,0,0,1,0,0,0,0,1)},skewY:function(a){a=Math.tan(a);this.apply(1,0,0,0,a,1,0,0,0,0,1,0,0,0,0,1)},shearX:function(a){a=Math.tan(a);this.apply(1,a,0,0,0,1,0,0,0,0,1,0,0,0,0,1)},shearY:function(a){a=Math.tan(a);this.apply(1,0,0,0,a,1,0,0,0,0,1,0,0,0,0,1)},multX:function(a,b,e,c){return e?c?this.elements[0]*a+this.elements[1]*b+this.elements[2]*e+this.elements[3]*
	c:this.elements[0]*a+this.elements[1]*b+this.elements[2]*e+this.elements[3]:this.elements[0]*a+this.elements[1]*b+this.elements[3]},multY:function(a,b,e,c){return e?c?this.elements[4]*a+this.elements[5]*b+this.elements[6]*e+this.elements[7]*c:this.elements[4]*a+this.elements[5]*b+this.elements[6]*e+this.elements[7]:this.elements[4]*a+this.elements[5]*b+this.elements[7]},multZ:function(a,b,e,c){return c?this.elements[8]*a+this.elements[9]*b+this.elements[10]*e+this.elements[11]*c:this.elements[8]*
	a+this.elements[9]*b+this.elements[10]*e+this.elements[11]},multW:function(a,b,e,c){return c?this.elements[12]*a+this.elements[13]*b+this.elements[14]*e+this.elements[15]*c:this.elements[12]*a+this.elements[13]*b+this.elements[14]*e+this.elements[15]},invert:function(){var a=this.elements[0]*this.elements[5]-this.elements[1]*this.elements[4],b=this.elements[0]*this.elements[6]-this.elements[2]*this.elements[4],e=this.elements[0]*this.elements[7]-this.elements[3]*this.elements[4],c=this.elements[1]*
	this.elements[6]-this.elements[2]*this.elements[5],n=this.elements[1]*this.elements[7]-this.elements[3]*this.elements[5],q=this.elements[2]*this.elements[7]-this.elements[3]*this.elements[6],g=this.elements[8]*this.elements[13]-this.elements[9]*this.elements[12],f=this.elements[8]*this.elements[14]-this.elements[10]*this.elements[12],h=this.elements[8]*this.elements[15]-this.elements[11]*this.elements[12],k=this.elements[9]*this.elements[14]-this.elements[10]*this.elements[13],p=this.elements[9]*
	this.elements[15]-this.elements[11]*this.elements[13],F=this.elements[10]*this.elements[15]-this.elements[11]*this.elements[14],O=a*F-b*p+e*k+c*h-n*f+q*g;if(1E-9>=Math.abs(O))return!1;var u=[];u[0]=+this.elements[5]*F-this.elements[6]*p+this.elements[7]*k;u[4]=-this.elements[4]*F+this.elements[6]*h-this.elements[7]*f;u[8]=+this.elements[4]*p-this.elements[5]*h+this.elements[7]*g;u[12]=-this.elements[4]*k+this.elements[5]*f-this.elements[6]*g;u[1]=-this.elements[1]*F+this.elements[2]*p-this.elements[3]*
	k;u[5]=+this.elements[0]*F-this.elements[2]*h+this.elements[3]*f;u[9]=-this.elements[0]*p+this.elements[1]*h-this.elements[3]*g;u[13]=+this.elements[0]*k-this.elements[1]*f+this.elements[2]*g;u[2]=+this.elements[13]*q-this.elements[14]*n+this.elements[15]*c;u[6]=-this.elements[12]*q+this.elements[14]*e-this.elements[15]*b;u[10]=+this.elements[12]*n-this.elements[13]*e+this.elements[15]*a;u[14]=-this.elements[12]*c+this.elements[13]*b-this.elements[14]*a;u[3]=-this.elements[9]*q+this.elements[10]*
	n-this.elements[11]*c;u[7]=+this.elements[8]*q-this.elements[10]*e+this.elements[11]*b;u[11]=-this.elements[8]*n+this.elements[9]*e-this.elements[11]*a;u[15]=+this.elements[8]*c-this.elements[9]*b+this.elements[10]*a;a=1/O;u[0]*=a;u[1]*=a;u[2]*=a;u[3]*=a;u[4]*=a;u[5]*=a;u[6]*=a;u[7]*=a;u[8]*=a;u[9]*=a;u[10]*=a;u[11]*=a;u[12]*=a;u[13]*=a;u[14]*=a;u[15]*=a;this.elements=u.slice();return!0},toString:function(){for(var a="",b=0;15>b;b++)a+=this.elements[b]+", ";return a+=this.elements[15]},print:function(){var a=
	printMatrixHelper(this.elements),a=""+k.nfs(this.elements[0],a,4)+" "+k.nfs(this.elements[1],a,4)+" "+k.nfs(this.elements[2],a,4)+" "+k.nfs(this.elements[3],a,4)+"\n"+k.nfs(this.elements[4],a,4)+" "+k.nfs(this.elements[5],a,4)+" "+k.nfs(this.elements[6],a,4)+" "+k.nfs(this.elements[7],a,4)+"\n"+k.nfs(this.elements[8],a,4)+" "+k.nfs(this.elements[9],a,4)+" "+k.nfs(this.elements[10],a,4)+" "+k.nfs(this.elements[11],a,4)+"\n"+k.nfs(this.elements[12],a,4)+" "+k.nfs(this.elements[13],a,4)+" "+k.nfs(this.elements[14],
	a,4)+" "+k.nfs(this.elements[15],a,4)+"\n\n";k.println(a)},invTranslate:function(a,b,e){this.preApply(1,0,0,-a,0,1,0,-b,0,0,1,-e,0,0,0,1)},invRotateX:function(a){var b=Math.cos(-a);a=Math.sin(-a);this.preApply([1,0,0,0,0,b,-a,0,0,a,b,0,0,0,0,1])},invRotateY:function(a){var b=Math.cos(-a);a=Math.sin(-a);this.preApply([b,0,a,0,0,1,0,0,-a,0,b,0,0,0,0,1])},invRotateZ:function(a){var b=Math.cos(-a);a=Math.sin(-a);this.preApply([b,-a,0,0,a,b,0,0,0,0,1,0,0,0,0,1])},invScale:function(a,b,e){this.preApply([1/
	a,0,0,0,0,1/b,0,0,0,0,1/e,0,0,0,0,1])}};return p}},{}],16:[function(D,y,V){y.exports=function(h){var g=h.PConstants,k=h.PMatrix2D,p=h.PMatrix3D;h=function(a){this.family=a||g.GROUP;this.style=this.visible=!0;this.children=[];this.nameTable=[];this.params=[];this.name="";this.parent=this.height=this.width=this.close=this.kind=this.matrix=this.image=null};h.prototype={isVisible:function(){return this.visible},setVisible:function(a){this.visible=a},disableStyle:function(){this.style=!1;for(var a=0,b=
	this.children.length;a<b;a++)this.children[a].disableStyle()},enableStyle:function(){this.style=!0;for(var a=0,b=this.children.length;a<b;a++)this.children[a].enableStyle()},getFamily:function(){return this.family},getWidth:function(){return this.width},getHeight:function(){return this.height},setName:function(a){this.name=a},getName:function(){return this.name},draw:function(a){if(!a)throw"render context missing for draw() in PShape";this.visible&&(this.pre(a),this.drawImpl(a),this.post(a))},drawImpl:function(a){this.family===
	g.GROUP?this.drawGroup(a):this.family===g.PRIMITIVE?this.drawPrimitive(a):this.family===g.GEOMETRY?this.drawGeometry(a):this.family===g.PATH&&this.drawPath(a)},drawPath:function(a){var b,e;if(0!==this.vertices.length){a.beginShape();if(0===this.vertexCodes.length)if(2===this.vertices[0].length)for(b=0,e=this.vertices.length;b<e;b++)a.vertex(this.vertices[b][0],this.vertices[b][1]);else for(b=0,e=this.vertices.length;b<e;b++)a.vertex(this.vertices[b][0],this.vertices[b][1],this.vertices[b][2]);else{var c=
	0;if(2===this.vertices[0].length)for(b=0,e=this.vertexCodes.length;b<e;b++)this.vertexCodes[b]===g.VERTEX?(a.vertex(this.vertices[c][0],this.vertices[c][1],this.vertices[c].moveTo),a.breakShape=!1,c++):this.vertexCodes[b]===g.BEZIER_VERTEX?(a.bezierVertex(this.vertices[c+0][0],this.vertices[c+0][1],this.vertices[c+1][0],this.vertices[c+1][1],this.vertices[c+2][0],this.vertices[c+2][1]),c+=3):this.vertexCodes[b]===g.CURVE_VERTEX?(a.curveVertex(this.vertices[c][0],this.vertices[c][1]),c++):this.vertexCodes[b]===
	g.BREAK&&(a.breakShape=!0);else for(b=0,e=this.vertexCodes.length;b<e;b++)this.vertexCodes[b]===g.VERTEX?(a.vertex(this.vertices[c][0],this.vertices[c][1],this.vertices[c][2]),!0===this.vertices[c].moveTo?vertArray[vertArray.length-1].moveTo=!0:!1===this.vertices[c].moveTo&&(vertArray[vertArray.length-1].moveTo=!1),a.breakShape=!1):this.vertexCodes[b]===g.BEZIER_VERTEX?(a.bezierVertex(this.vertices[c+0][0],this.vertices[c+0][1],this.vertices[c+0][2],this.vertices[c+1][0],this.vertices[c+1][1],this.vertices[c+
	1][2],this.vertices[c+2][0],this.vertices[c+2][1],this.vertices[c+2][2]),c+=3):this.vertexCodes[b]===g.CURVE_VERTEX?(a.curveVertex(this.vertices[c][0],this.vertices[c][1],this.vertices[c][2]),c++):this.vertexCodes[b]===g.BREAK&&(a.breakShape=!0)}a.endShape(this.close?g.CLOSE:g.OPEN)}},drawGeometry:function(a){var b,e;a.beginShape(this.kind);if(this.style)for(b=0,e=this.vertices.length;b<e;b++)a.vertex(this.vertices[b]);else for(b=0,e=this.vertices.length;b<e;b++){var c=this.vertices[b];0===c[2]?a.vertex(c[0],
	c[1]):a.vertex(c[0],c[1],c[2])}a.endShape()},drawGroup:function(a){for(var b=0,e=this.children.length;b<e;b++)this.children[b].draw(a)},drawPrimitive:function(a){if(this.kind===g.POINT)a.point(this.params[0],this.params[1]);else if(this.kind===g.LINE)4===this.params.length?a.line(this.params[0],this.params[1],this.params[2],this.params[3]):a.line(this.params[0],this.params[1],this.params[2],this.params[3],this.params[4],this.params[5]);else if(this.kind===g.TRIANGLE)a.triangle(this.params[0],this.params[1],
	this.params[2],this.params[3],this.params[4],this.params[5]);else if(this.kind===g.QUAD)a.quad(this.params[0],this.params[1],this.params[2],this.params[3],this.params[4],this.params[5],this.params[6],this.params[7]);else if(this.kind===g.RECT)if(null!==this.image){var b=imageModeConvert;a.imageMode(g.CORNER);a.image(this.image,this.params[0],this.params[1],this.params[2],this.params[3]);imageModeConvert=b}else b=a.curRectMode,a.rectMode(g.CORNER),a.rect(this.params[0],this.params[1],this.params[2],
	this.params[3]),a.curRectMode=b;else this.kind===g.ELLIPSE?(b=a.curEllipseMode,a.ellipseMode(g.CORNER),a.ellipse(this.params[0],this.params[1],this.params[2],this.params[3]),a.curEllipseMode=b):this.kind===g.ARC?(b=curEllipseMode,a.ellipseMode(g.CORNER),a.arc(this.params[0],this.params[1],this.params[2],this.params[3],this.params[4],this.params[5]),curEllipseMode=b):this.kind===g.BOX?1===this.params.length?a.box(this.params[0]):a.box(this.params[0],this.params[1],this.params[2]):this.kind===g.SPHERE&&
	a.sphere(this.params[0])},pre:function(a){this.matrix&&(a.pushMatrix(),a.transform(this.matrix));this.style&&(a.pushStyle(),this.styles(a))},post:function(a){this.matrix&&a.popMatrix();this.style&&a.popStyle()},styles:function(a){this.stroke?(a.stroke(this.strokeColor),a.strokeWeight(this.strokeWeight),a.strokeCap(this.strokeCap),a.strokeJoin(this.strokeJoin)):a.noStroke();this.fill?a.fill(this.fillColor):a.noFill()},getChild:function(a){var b,e;if("number"===typeof a)return this.children[a];var c;
	if(""===a||this.name===a)return this;if(0<this.nameTable.length){b=0;for(e=this.nameTable.length;b<e||c;b++)if(this.nameTable[b].getName===a){c=this.nameTable[b];break}if(c)return c}b=0;for(e=this.children.length;b<e;b++)if(c=this.children[b].getChild(a))return c;return null},getChildCount:function(){return this.children.length},addChild:function(a){this.children.push(a);a.parent=this;null!==a.getName()&&this.addName(a.getName(),a)},addName:function(a,b){null!==this.parent?this.parent.addName(a,b):
	this.nameTable.push([a,b])},translate:function(){2===arguments.length?(this.checkMatrix(2),this.matrix.translate(arguments[0],arguments[1])):(this.checkMatrix(3),this.matrix.translate(arguments[0],arguments[1],0))},checkMatrix:function(a){null===this.matrix?this.matrix=2===a?new k:new p:3===a&&this.matrix instanceof k&&(this.matrix=new p)},rotateX:function(a){this.rotate(a,1,0,0)},rotateY:function(a){this.rotate(a,0,1,0)},rotateZ:function(a){this.rotate(a,0,0,1)},rotate:function(){1===arguments.length?
	(this.checkMatrix(2),this.matrix.rotate(arguments[0])):(this.checkMatrix(3),this.matrix.rotate(arguments[0],arguments[1],arguments[2],arguments[3]))},scale:function(){2===arguments.length?(this.checkMatrix(2),this.matrix.scale(arguments[0],arguments[1])):3===arguments.length?(this.checkMatrix(2),this.matrix.scale(arguments[0],arguments[1],arguments[2])):(this.checkMatrix(2),this.matrix.scale(arguments[0]))},resetMatrix:function(){this.checkMatrix(2);this.matrix.reset()},applyMatrix:function(a){1===
	arguments.length?this.applyMatrix(a.elements[0],a.elements[1],0,a.elements[2],a.elements[3],a.elements[4],0,a.elements[5],0,0,1,0,0,0,0,1):6===arguments.length?(this.checkMatrix(2),this.matrix.apply(arguments[0],arguments[1],arguments[2],0,arguments[3],arguments[4],arguments[5],0,0,0,1,0,0,0,0,1)):16===arguments.length&&(this.checkMatrix(3),this.matrix.apply(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4],arguments[5],arguments[6],arguments[7],arguments[8],arguments[9],arguments[10],
	arguments[11],arguments[12],arguments[13],arguments[14],arguments[15]))}};return h}},{}],17:[function(D,y,V){y.exports=function(h){var g=h.CommonFunctions,k=h.PConstants,p=h.PShape,a=h.XMLElement,b=h.colors,e=function(){p.call(this);if(1===arguments.length){if(this.element=arguments[0],this.vertexCodes=[],this.vertices=[],this.opacity=1,this.stroke=!1,this.strokeColor=k.ALPHA_MASK,this.strokeWeight=1,this.strokeCap=k.SQUARE,this.strokeJoin=k.MITER,this.strokeName=this.strokeGradientPaint=this.strokeGradient=
	null,this.strokeOpacity=1,this.fill=!0,this.fillColor=k.ALPHA_MASK,this.fillName=this.fillGradientPaint=this.fillGradient=null,this.fillOpacity=1,"svg"!==this.element.getName())throw"root is not <svg>, it's <"+this.element.getName()+">";}else 2===arguments.length&&("string"===typeof arguments[1]?-1<arguments[1].indexOf(".svg")&&(this.element=new a(!0,arguments[1]),this.vertexCodes=[],this.vertices=[],this.opacity=1,this.stroke=!1,this.strokeColor=k.ALPHA_MASK,this.strokeWeight=1,this.strokeCap=k.SQUARE,
	this.strokeJoin=k.MITER,this.strokeName=this.strokeGradientPaint=this.strokeGradient="",this.strokeOpacity=1,this.fill=!0,this.fillColor=k.ALPHA_MASK,this.fillGradientPaint=this.fillGradient=null,this.fillOpacity=1):arguments[0]&&(this.element=arguments[1],this.vertexCodes=arguments[0].vertexCodes.slice(),this.vertices=arguments[0].vertices.slice(),this.stroke=arguments[0].stroke,this.strokeColor=arguments[0].strokeColor,this.strokeWeight=arguments[0].strokeWeight,this.strokeCap=arguments[0].strokeCap,
	this.strokeJoin=arguments[0].strokeJoin,this.strokeGradient=arguments[0].strokeGradient,this.strokeGradientPaint=arguments[0].strokeGradientPaint,this.strokeName=arguments[0].strokeName,this.fill=arguments[0].fill,this.fillColor=arguments[0].fillColor,this.fillGradient=arguments[0].fillGradient,this.fillGradientPaint=arguments[0].fillGradientPaint,this.fillName=arguments[0].fillName,this.strokeOpacity=arguments[0].strokeOpacity,this.fillOpacity=arguments[0].fillOpacity,this.opacity=arguments[0].opacity));
	this.name=this.element.getStringAttribute("id");this.visible="none"!==this.element.getStringAttribute("display","inline");var c=this.element.getAttribute("transform");c&&(this.matrix=this.parseMatrix(c));c=this.element.getStringAttribute("viewBox");null!==c&&(c=c.split(" "),this.width=c[2],this.height=c[3]);var c=this.element.getStringAttribute("width"),b=this.element.getStringAttribute("height");if(null!==c)this.width=this.parseUnitSize(c),this.height=this.parseUnitSize(b);else if(0===this.width||
	0===this.height)throw this.height=this.width=1,"The width and/or height is not readable in the <svg> tag of this file.";this.parseColors(this.element);this.parseChildren(this.element)};e.prototype=new p;e.prototype.parseMatrix=function(){function c(c){var a=[];c.replace(/\((.*?)\)/,function(){return function(c,f){a=f.replace(/,+/g," ").split(/\s+/)}}());return a}return function(a){this.checkMatrix(2);var b=[];a.replace(/\s*(\w+)\((.*?)\)/g,function(c){b.push(g.trim(c))});if(0===b.length)return null;
	a=0;for(var e=b.length;a<e;a++){var f=c(b[a]);if(-1!==b[a].indexOf("matrix"))this.matrix.set(f[0],f[2],f[4],f[1],f[3],f[5]);else if(-1!==b[a].indexOf("translate"))this.matrix.translate(f[0],2===f.length?f[1]:0);else if(-1!==b[a].indexOf("scale"))this.matrix.scale(f[0],2===f.length?f[1]:f[0]);else if(-1!==b[a].indexOf("rotate")){var h=f[0];1===f.length?this.matrix.rotate(g.radians(h)):3===f.length&&(this.matrix.translate(f[1],f[2]),this.matrix.rotate(g.radians(f[0])),this.matrix.translate(-f[1],-f[2]))}else-1!==
	b[a].indexOf("skewX")?this.matrix.skewX(parseFloat(f[0])):-1!==b[a].indexOf("skewY")?this.matrix.skewY(f[0]):-1!==b[a].indexOf("shearX")?this.matrix.shearX(f[0]):-1!==b[a].indexOf("shearY")&&this.matrix.shearY(f[0])}return this.matrix}}();e.prototype.parseChildren=function(c){c=c.getChildren();var a=new p,b,e;b=0;for(e=c.length;b<e;b++){var f=this.parseChild(c[b]);f&&a.addChild(f)}b=0;for(e=a.children.length;b<e;b++)this.children.push(a.children[b])};e.prototype.getName=function(){return this.name};
	e.prototype.parseChild=function(c){var a=c.getName(),b;"g"===a?b=new e(this,c):"defs"===a?b=new e(this,c):"line"===a?(b=new e(this,c),b.parseLine()):"circle"===a?(b=new e(this,c),b.parseEllipse(!0)):"ellipse"===a?(b=new e(this,c),b.parseEllipse(!1)):"rect"===a?(b=new e(this,c),b.parseRect()):"polygon"===a?(b=new e(this,c),b.parsePoly(!0)):"polyline"===a?(b=new e(this,c),b.parsePoly(!1)):"path"===a?(b=new e(this,c),b.parsePath()):"radialGradient"===a?unimplemented("PShapeSVG.prototype.parseChild, name = radialGradient"):
	"linearGradient"===a?unimplemented("PShapeSVG.prototype.parseChild, name = linearGradient"):"text"===a?unimplemented("PShapeSVG.prototype.parseChild, name = text"):"filter"===a?unimplemented("PShapeSVG.prototype.parseChild, name = filter"):"mask"===a&&unimplemented("PShapeSVG.prototype.parseChild, name = mask");return b};e.prototype.parsePath=function(){this.family=k.PATH;this.kind=0;var c=g.trim(this.element.getStringAttribute("d").replace(/[\s,]+/g," "));if(null!==c)for(var c=c.split(""),a=0,b=
	0,e=0,f=0,h=f=e=0,p=0,I=0,F=0,O=F=f=I=e=0,u=0,la="",z=[],y=!1,D,R,x;O<c.length;)if(u=c[O].charCodeAt(0),65<=u&&90>=u||97<=u&&122>=u){x=O;O++;if(O<c.length)for(z=[],u=c[O].charCodeAt(0);!(65<=u&&90>=u||97<=u&&100>=u||102<=u&&122>=u)&&!1===y;)32===u?""!==la&&(z.push(parseFloat(la)),la=""):45===u?101===c[O-1].charCodeAt(0)?la+=c[O].toString():(""!==la&&z.push(parseFloat(la)),la=c[O].toString()):la+=c[O].toString(),O++,O===c.length?y=!0:u=c[O].charCodeAt(0);""!==la&&(z.push(parseFloat(la)),la="");R=c[x];
	u=R.charCodeAt(0);if(77===u){if(2<=z.length&&0===z.length%2&&(a=z[0],b=z[1],this.parsePathMoveto(a,b),2<z.length))for(x=2,u=z.length;x<u;x+=2)a=z[x],b=z[x+1],this.parsePathLineto(a,b)}else if(109===u){if(2<=z.length&&0===z.length%2&&(a+=z[0],b+=z[1],this.parsePathMoveto(a,b),2<z.length))for(x=2,u=z.length;x<u;x+=2)a+=z[x],b+=z[x+1],this.parsePathLineto(a,b)}else if(76===u){if(2<=z.length&&0===z.length%2)for(x=0,u=z.length;x<u;x+=2)a=z[x],b=z[x+1],this.parsePathLineto(a,b)}else if(108===u){if(2<=z.length&&
	0===z.length%2)for(x=0,u=z.length;x<u;x+=2)a+=z[x],b+=z[x+1],this.parsePathLineto(a,b)}else if(72===u)for(x=0,u=z.length;x<u;x++)a=z[x],this.parsePathLineto(a,b);else if(104===u)for(x=0,u=z.length;x<u;x++)a+=z[x],this.parsePathLineto(a,b);else if(86===u)for(x=0,u=z.length;x<u;x++)b=z[x],this.parsePathLineto(a,b);else if(118===u)for(x=0,u=z.length;x<u;x++)b+=z[x],this.parsePathLineto(a,b);else if(67===u){if(6<=z.length&&0===z.length%6)for(x=0,u=z.length;x<u;x+=6)e=z[x],h=z[x+1],f=z[x+2],p=z[x+3],I=
	z[x+4],F=z[x+5],this.parsePathCurveto(e,h,f,p,I,F),a=I,b=F}else if(99===u){if(6<=z.length&&0===z.length%6)for(x=0,u=z.length;x<u;x+=6)e=a+z[x],h=b+z[x+1],f=a+z[x+2],p=b+z[x+3],I=a+z[x+4],F=b+z[x+5],this.parsePathCurveto(e,h,f,p,I,F),a=I,b=F}else if(83===u){if(4<=z.length&&0===z.length%4)for(x=0,u=z.length;x<u;x+=4)"c"===D.toLowerCase()||"s"===D.toLowerCase()?(e=this.vertices[this.vertices.length-2][0],I=this.vertices[this.vertices.length-2][1],f=this.vertices[this.vertices.length-1][0],F=this.vertices[this.vertices.length-
	1][1],e=f+(f-e),h=F+(F-I)):(e=this.vertices[this.vertices.length-1][0],h=this.vertices[this.vertices.length-1][1]),f=z[x],p=z[x+1],I=z[x+2],F=z[x+3],this.parsePathCurveto(e,h,f,p,I,F),a=I,b=F}else if(115===u){if(4<=z.length&&0===z.length%4)for(x=0,u=z.length;x<u;x+=4)"c"===D.toLowerCase()||"s"===D.toLowerCase()?(e=this.vertices[this.vertices.length-2][0],I=this.vertices[this.vertices.length-2][1],f=this.vertices[this.vertices.length-1][0],F=this.vertices[this.vertices.length-1][1],e=f+(f-e),h=F+(F-
	I)):(e=this.vertices[this.vertices.length-1][0],h=this.vertices[this.vertices.length-1][1]),f=a+z[x],p=b+z[x+1],I=a+z[x+2],F=b+z[x+3],this.parsePathCurveto(e,h,f,p,I,F),a=I,b=F}else if(81===u){if(4<=z.length&&0===z.length%4)for(x=0,u=z.length;x<u;x+=4)e=z[x],f=z[x+1],I=z[x+2],F=z[x+3],this.parsePathQuadto(a,b,e,f,I,F),a=I,b=F}else if(113===u){if(4<=z.length&&0===z.length%4)for(x=0,u=z.length;x<u;x+=4)e=a+z[x],f=b+z[x+1],I=a+z[x+2],F=b+z[x+3],this.parsePathQuadto(a,b,e,f,I,F),a=I,b=F}else if(84===
	u){if(2<=z.length&&0===z.length%2)for(x=0,u=z.length;x<u;x+=2)"q"===D.toLowerCase()||"t"===D.toLowerCase()?(e=this.vertices[this.vertices.length-2][0],I=this.vertices[this.vertices.length-2][1],f=this.vertices[this.vertices.length-1][0],F=this.vertices[this.vertices.length-1][1],e=f+(f-e),f=F+(F-I)):(e=a,f=b),I=z[x],F=z[x+1],this.parsePathQuadto(a,b,e,f,I,F),a=I,b=F}else if(116===u){if(2<=z.length&&0===z.length%2)for(x=0,u=z.length;x<u;x+=2)"q"===D.toLowerCase()||"t"===D.toLowerCase()?(e=this.vertices[this.vertices.length-
	2][0],I=this.vertices[this.vertices.length-2][1],f=this.vertices[this.vertices.length-1][0],F=this.vertices[this.vertices.length-1][1],e=f+(f-e),f=F+(F-I)):(e=a,f=b),I=a+z[x],F=b+z[x+1],this.parsePathQuadto(a,b,e,f,I,F),a=I,b=F}else if(90===u||122===u)this.close=!0;D=R.toString()}else O++};e.prototype.parsePathQuadto=function(a,b,e,g,f,h){if(0<this.vertices.length)this.parsePathCode(k.BEZIER_VERTEX),this.parsePathVertex(a+2*(e-a)/3,b+2*(g-b)/3),this.parsePathVertex(f+2*(e-f)/3,h+2*(g-h)/3),this.parsePathVertex(f,
	h);else throw"Path must start with M/m";};e.prototype.parsePathCurveto=function(a,b,e,g,f,h){if(0<this.vertices.length)this.parsePathCode(k.BEZIER_VERTEX),this.parsePathVertex(a,b),this.parsePathVertex(e,g),this.parsePathVertex(f,h);else throw"Path must start with M/m";};e.prototype.parsePathLineto=function(a,b){if(0<this.vertices.length)this.parsePathCode(k.VERTEX),this.parsePathVertex(a,b),this.vertices[this.vertices.length-1].moveTo=!1;else throw"Path must start with M/m";};e.prototype.parsePathMoveto=
	function(a,b){0<this.vertices.length&&this.parsePathCode(k.BREAK);this.parsePathCode(k.VERTEX);this.parsePathVertex(a,b);this.vertices[this.vertices.length-1].moveTo=!0};e.prototype.parsePathVertex=function(a,b){var e=[];e[0]=a;e[1]=b;this.vertices.push(e)};e.prototype.parsePathCode=function(a){this.vertexCodes.push(a)};e.prototype.parsePoly=function(a){this.family=k.PATH;this.close=a;a=g.trim(this.element.getStringAttribute("points").replace(/[,\s]+/g," "));if(null!==a)if(a=a.split(" "),0===a.length%
	2)for(var b=0,e=a.length;b<e;b++){var h=[];h[0]=a[b];h[1]=a[++b];this.vertices.push(h)}else throw"Error parsing polygon points: odd number of coordinates provided";};e.prototype.parseRect=function(){this.kind=k.RECT;this.family=k.PRIMITIVE;this.params=[];this.params[0]=this.element.getFloatAttribute("x");this.params[1]=this.element.getFloatAttribute("y");this.params[2]=this.element.getFloatAttribute("width");this.params[3]=this.element.getFloatAttribute("height");if(0>this.params[2]||0>this.params[3])throw"svg error: negative width or height found while parsing <rect>";
	};e.prototype.parseEllipse=function(a){this.kind=k.ELLIPSE;this.family=k.PRIMITIVE;this.params=[];this.params[0]=this.element.getFloatAttribute("cx")|0;this.params[1]=this.element.getFloatAttribute("cy")|0;var b;if(a){if(a=b=this.element.getFloatAttribute("r"),0>a)throw"svg error: negative radius found while parsing <circle>";}else if(a=this.element.getFloatAttribute("rx"),b=this.element.getFloatAttribute("ry"),0>a||0>b)throw"svg error: negative x-axis radius or y-axis radius found while parsing <ellipse>";
	this.params[0]-=a;this.params[1]-=b;this.params[2]=2*a;this.params[3]=2*b};e.prototype.parseLine=function(){this.kind=k.LINE;this.family=k.PRIMITIVE;this.params=[];this.params[0]=this.element.getFloatAttribute("x1");this.params[1]=this.element.getFloatAttribute("y1");this.params[2]=this.element.getFloatAttribute("x2");this.params[3]=this.element.getFloatAttribute("y2")};e.prototype.parseColors=function(a){a.hasAttribute("opacity")&&this.setOpacity(a.getAttribute("opacity"));a.hasAttribute("stroke")&&
	this.setStroke(a.getAttribute("stroke"));a.hasAttribute("stroke-width")&&this.setStrokeWeight(a.getAttribute("stroke-width"));a.hasAttribute("stroke-linejoin")&&this.setStrokeJoin(a.getAttribute("stroke-linejoin"));a.hasAttribute("stroke-linecap")&&this.setStrokeCap(a.getStringAttribute("stroke-linecap"));a.hasAttribute("fill")&&this.setFill(a.getStringAttribute("fill"));if(a.hasAttribute("style")){a=a.getStringAttribute("style").toString().split(";");for(var b=0,e=a.length;b<e;b++){var h=g.trim(a[b].split(":"));
	"fill"===h[0]?this.setFill(h[1]):"fill-opacity"===h[0]?this.setFillOpacity(h[1]):"stroke"===h[0]?this.setStroke(h[1]):"stroke-width"===h[0]?this.setStrokeWeight(h[1]):"stroke-linecap"===h[0]?this.setStrokeCap(h[1]):"stroke-linejoin"===h[0]?this.setStrokeJoin(h[1]):"stroke-opacity"===h[0]?this.setStrokeOpacity(h[1]):"opacity"===h[0]&&this.setOpacity(h[1])}}};e.prototype.setFillOpacity=function(a){this.fillOpacity=parseFloat(a);this.fillColor=255*this.fillOpacity<<24|this.fillColor&16777215};e.prototype.setFill=
	function(a){var e=this.fillColor&4278190080;"none"===a?this.fill=!1:0===a.indexOf("#")?(this.fill=!0,4===a.length&&(a=a.replace(/#(.)(.)(.)/,"#$1$1$2$2$3$3")),this.fillColor=e|parseInt(a.substring(1),16)&16777215):0===a.indexOf("rgb")?(this.fill=!0,this.fillColor=e|this.parseRGB(a)):0===a.indexOf("url(#")?this.fillName=a.substring(5,a.length-1):b[a]&&(this.fill=!0,this.fillColor=e|parseInt(b[a].substring(1),16)&16777215)};e.prototype.setOpacity=function(a){this.strokeColor=255*parseFloat(a)<<24|this.strokeColor&
	16777215;this.fillColor=255*parseFloat(a)<<24|this.fillColor&16777215};e.prototype.setStroke=function(a){var e=this.strokeColor&4278190080;"none"===a?this.stroke=!1:"#"===a.charAt(0)?(this.stroke=!0,4===a.length&&(a=a.replace(/#(.)(.)(.)/,"#$1$1$2$2$3$3")),this.strokeColor=e|parseInt(a.substring(1),16)&16777215):0===a.indexOf("rgb")?(this.stroke=!0,this.strokeColor=e|this.parseRGB(a)):0===a.indexOf("url(#")?this.strokeName=a.substring(5,a.length-1):b[a]&&(this.stroke=!0,this.strokeColor=e|parseInt(b[a].substring(1),
	16)&16777215)};e.prototype.setStrokeWeight=function(a){this.strokeWeight=this.parseUnitSize(a)};e.prototype.setStrokeJoin=function(a){"miter"===a?this.strokeJoin=k.MITER:"round"===a?this.strokeJoin=k.ROUND:"bevel"===a&&(this.strokeJoin=k.BEVEL)};e.prototype.setStrokeCap=function(a){"butt"===a?this.strokeCap=k.SQUARE:"round"===a?this.strokeCap=k.ROUND:"square"===a&&(this.strokeCap=k.PROJECT)};e.prototype.setStrokeOpacity=function(a){this.strokeOpacity=parseFloat(a);this.strokeColor=255*this.strokeOpacity<<
	24|this.strokeColor&16777215};e.prototype.parseRGB=function(a){a=a.substring(a.indexOf("(")+1,a.indexOf(")")).split(", ");return a[0]<<16|a[1]<<8|a[2]};e.prototype.parseUnitSize=function(a){var b=a.length-2;return 0>b?a:a.indexOf("pt")===b?1.25*parseFloat(a.substring(0,b)):a.indexOf("pc")===b?15*parseFloat(a.substring(0,b)):a.indexOf("mm")===b?3.543307*parseFloat(a.substring(0,b)):a.indexOf("cm")===b?35.43307*parseFloat(a.substring(0,b)):a.indexOf("in")===b?90*parseFloat(a.substring(0,b)):a.indexOf("px")===
	b?parseFloat(a.substring(0,b)):parseFloat(a)};return e}},{}],18:[function(D,y,V){y.exports=function(h,g){function k(a,c,b){this.x=a||0;this.y=c||0;this.z=b||0}function p(a){return function(c,b){var g=c.get();g[a](b);return g}}var a=h.PConstants;k.fromAngle=function(a,c){if(c===g||null===c)c=new k;c.x=Math.cos(a);c.y=Math.sin(a);return c};k.random2D=function(b){return k.fromAngle(Math.random()*a.TWO_PI,b)};k.random3D=function(b){var c=Math.random()*a.TWO_PI,n=2*Math.random()-1,q=Math.sqrt(1-n*n),h=
	q*Math.cos(c),c=q*Math.sin(c);b===g||null===b?b=new k(h,c,n):b.set(h,c,n);return b};k.dist=function(a,c){return a.dist(c)};k.dot=function(a,c){return a.dot(c)};k.cross=function(a,c){return a.cross(c)};k.sub=function(a,c){return new k(a.x-c.x,a.y-c.y,a.z-c.z)};k.angleBetween=function(a,c){return Math.acos(a.dot(c)/(a.mag()*c.mag()))};k.lerp=function(a,c,b){a=new k(a.x,a.y,a.z);a.lerp(c,b);return a};k.prototype={set:function(a,c,b){1===arguments.length?this.set(a.x||a[0]||0,a.y||a[1]||0,a.z||a[2]||
	0):(this.x=a,this.y=c,this.z=b)},get:function(){return new k(this.x,this.y,this.z)},mag:function(){var a=this.x,c=this.y,b=this.z;return Math.sqrt(a*a+c*c+b*b)},magSq:function(){var a=this.x,c=this.y,b=this.z;return a*a+c*c+b*b},setMag:function(a,c){if(c===g)c=a,this.normalize(),this.mult(c);else return a.normalize(),a.mult(c),a},add:function(a,c,b){1===arguments.length?(this.x+=a.x,this.y+=a.y,this.z+=a.z):(this.x+=a,this.y+=c,this.z+=b)},sub:function(a,b,g){1===arguments.length?(this.x-=a.x,this.y-=
	a.y,this.z-=a.z):(this.x-=a,this.y-=b,this.z-=g)},mult:function(a){"number"===typeof a?(this.x*=a,this.y*=a,this.z*=a):(this.x*=a.x,this.y*=a.y,this.z*=a.z)},div:function(a){"number"===typeof a?(this.x/=a,this.y/=a,this.z/=a):(this.x/=a.x,this.y/=a.y,this.z/=a.z)},rotate:function(a){var b=this.x,g=Math.cos(a);a=Math.sin(a);this.x=g*this.x-a*this.y;this.y=a*b+g*this.y},dist:function(a){var b=this.x-a.x,g=this.y-a.y;a=this.z-a.z;return Math.sqrt(b*b+g*g+a*a)},dot:function(a,b,g){return 1===arguments.length?
	this.x*a.x+this.y*a.y+this.z*a.z:this.x*a+this.y*b+this.z*g},cross:function(a){var b=this.x,g=this.y,q=this.z;return new k(g*a.z-a.y*q,q*a.x-a.z*b,b*a.y-a.x*g)},lerp:function(a,b,g,q){var h,f;2===arguments.length?(q=b,h=a.x,f=a.y,g=a.z):(h=a,f=b);this.x+=(h-this.x)*q;this.y+=(f-this.y)*q;this.z+=(g-this.z)*q},normalize:function(){var a=this.mag();0<a&&this.div(a)},limit:function(a){this.mag()>a&&(this.normalize(),this.mult(a))},heading:function(){return-Math.atan2(-this.y,this.x)},heading2D:function(){return this.heading()},
	toString:function(){return"["+this.x+", "+this.y+", "+this.z+"]"},array:function(){return[this.x,this.y,this.z]}};for(var b in k.prototype)k.prototype.hasOwnProperty(b)&&!k.hasOwnProperty(b)&&(k[b]=p(b));return k}},{}],19:[function(D,y,V){y.exports=function(){var h=function(g,h,p,a,b){this.fullName=g||"";this.name=h||"";this.namespace=p||"";this.value=a;this.type=b};h.prototype={getName:function(){return this.name},getFullName:function(){return this.fullName},getNamespace:function(){return this.namespace},
	getValue:function(){return this.value},getType:function(){return this.type},setValue:function(g){this.value=g}};return h}},{}],20:[function(D,y,V){y.exports=function(h,g){var k=h.Browser,p=k.ajax,a=k.window.DOMParser,b=h.XMLAttribute,e=function(a,b,e,h){this.attributes=[];this.children=[];this.name=this.fullName=null;this.namespace="";this.parent=this.content=null;this.systemID=this.lineNr="";this.type="ELEMENT";a&&("string"===typeof a?b===g&&-1<a.indexOf("<")?this.parse(a):(this.fullName=a,this.namespace=
	b,this.systemId=e,this.lineNr=h):this.parse(b,!0))};e.prototype={parse:function(b,e){var g;try{b.substring(b.length-4);e&&(b=p(b));g=(new a).parseFromString(b,"text/xml");var h=g.documentElement;if(h)this.parseChildrenRecursive(null,h);else throw"Error loading document";return this}catch(f){throw f;}},parseChildrenRecursive:function(a,g){var h,k,f,p;a?(h=new e(g.nodeName),h.parent=a):(this.fullName=g.localName,this.name=g.nodeName,h=this);if(3===g.nodeType&&""!==g.textContent)return this.createPCDataElement(g.textContent);
	if(4===g.nodeType)return this.createCDataElement(g.textContent);if(g.attributes)for(f=0,p=g.attributes.length;f<p;f++)k=g.attributes[f],k=new b(k.getname,k.nodeName,k.namespaceURI,k.nodeValue,k.nodeType),h.attributes.push(k);if(g.childNodes)for(f=0,p=g.childNodes.length;f<p;f++)k=h.parseChildrenRecursive(h,g.childNodes[f]),null!==k&&h.children.push(k);return h},createElement:function(a,b,h,k){return h===g?new e(a,b):new e(a,b,h,k)},createPCDataElement:function(a,b){if(""===a.replace(/^\s+$/g,""))return null;
	var g=new e;g.type="TEXT";g.content=a;return g},createCDataElement:function(a){var b=this.createPCDataElement(a);if(null===b)return null;b.type="CDATA";var e={"<":"&lt;",">":"&gt;","'":"&apos;",'"':"&quot;"},g;for(g in e)Object.hasOwnProperty(e,g)||(a=a.replace(RegExp(g,"g"),e[g]));b.cdata=a;return b},hasAttribute:function(){if(1===arguments.length)return null!==this.getAttribute(arguments[0]);if(2===arguments.length)return null!==this.getAttribute(arguments[0],arguments[1])},equals:function(a){if(!(a instanceof
	e))return!1;var b,g;if(this.fullName!==a.fullName||this.attributes.length!==a.getAttributeCount()||this.attributes.length!==a.attributes.length)return!1;var h,f;b=0;for(g=this.attributes.length;b<g;b++)if(h=this.attributes[b].getName(),f=this.attributes[b].getNamespace(),h=a.findAttribute(h,f),null===h||this.attributes[b].getValue()!==h.getValue()||this.attributes[b].getType()!==h.getType())return!1;if(this.children.length!==a.getChildCount())return!1;if(0<this.children.length){b=0;for(g=this.children.length;b<
	g;b++)if(h=this.getChild(b),f=a.getChild(b),!h.equals(f))return!1;return!0}return this.content===a.content},getContent:function(){if("TEXT"===this.type||"CDATA"===this.type)return this.content;var a=this.children;return 1!==a.length||"TEXT"!==a[0].type&&"CDATA"!==a[0].type?null:a[0].content},getAttribute:function(){var a;if(2===arguments.length)return(a=this.findAttribute(arguments[0]))?a.getValue():arguments[1];if(1===arguments.length)return(a=this.findAttribute(arguments[0]))?a.getValue():null;
	if(3===arguments.length)return(a=this.findAttribute(arguments[0],arguments[1]))?a.getValue():arguments[2]},getStringAttribute:function(){return 1===arguments.length?this.getAttribute(arguments[0]):2===arguments.length?this.getAttribute(arguments[0],arguments[1]):this.getAttribute(arguments[0],arguments[1],arguments[2])},getString:function(a){return this.getStringAttribute(a)},getFloatAttribute:function(){return 1===arguments.length?parseFloat(this.getAttribute(arguments[0],0)):2===arguments.length?
	this.getAttribute(arguments[0],arguments[1]):this.getAttribute(arguments[0],arguments[1],arguments[2])},getFloat:function(a){return this.getFloatAttribute(a)},getIntAttribute:function(){return 1===arguments.length?this.getAttribute(arguments[0],0):2===arguments.length?this.getAttribute(arguments[0],arguments[1]):this.getAttribute(arguments[0],arguments[1],arguments[2])},getInt:function(a){return this.getIntAttribute(a)},hasChildren:function(){return 0<this.children.length},addChild:function(a){null!==
	a&&(a.parent=this,this.children.push(a))},insertChild:function(a,b){if(a){if(null===a.getLocalName()&&!this.hasChildren()){var e=this.children[this.children.length-1];if(null===e.getLocalName()){e.setContent(e.getContent()+a.getContent());return}}a.parent=this;this.children.splice(b,0,a)}},getChild:function(a){if("number"===typeof a)return this.children[a];if(-1!==a.indexOf("/"))return this.getChildRecursive(a.split("/"),0);for(var b,e,g=0,f=this.getChildCount();g<f;g++)if(b=this.getChild(g),e=b.getName(),
	null!==e&&e===a)return b;return null},getChildren:function(){if(1===arguments.length){if("number"===typeof arguments[0])return this.getChild(arguments[0]);if(-1!==arguments[0].indexOf("/"))return this.getChildrenRecursive(arguments[0].split("/"),0);for(var a=[],b,e,g=0,f=this.getChildCount();g<f;g++)b=this.getChild(g),e=b.getName(),null!==e&&e===arguments[0]&&a.push(b);return a}return this.children},getChildCount:function(){return this.children.length},getChildRecursive:function(a,b){if(b===a.length)return this;
	for(var e,g,f=a[b],h=0,k=this.getChildCount();h<k;h++)if(e=this.getChild(h),g=e.getName(),null!==g&&g===f)return e.getChildRecursive(a,b+1);return null},getChildrenRecursive:function(a,b){if(b===a.length-1)return this.getChildren(a[b]);for(var e=this.getChildren(a[b]),g=[],f=0;f<e.length;f++)g=g.concat(e[f].getChildrenRecursive(a,b+1));return g},isLeaf:function(){return!this.hasChildren()},listChildren:function(){for(var a=[],b=0,e=this.children.length;b<e;b++)a.push(this.getChild(b).getName());return a},
	removeAttribute:function(a,b){this.namespace=b||"";for(var e=0,g=this.attributes.length;e<g;e++)if(this.attributes[e].getName()===a&&this.attributes[e].getNamespace()===this.namespace){this.attributes.splice(e,1);break}},removeChild:function(a){if(a)for(var b=0,e=this.children.length;b<e;b++)if(this.children[b].equals(a)){this.children.splice(b,1);break}},removeChildAtIndex:function(a){this.children.length>a&&this.children.splice(a,1)},findAttribute:function(a,b){this.namespace=b||"";for(var e=0,
	g=this.attributes.length;e<g;e++)if(this.attributes[e].getName()===a&&this.attributes[e].getNamespace()===this.namespace)return this.attributes[e];return null},setAttribute:function(){var a;if(3===arguments.length){a=arguments[0].indexOf(":");var e=arguments[0].substring(a+1);(a=this.findAttribute(e,arguments[1]))?a.setValue(arguments[2]):(a=new b(arguments[0],e,arguments[1],arguments[2],"CDATA"),this.attributes.push(a))}else(a=this.findAttribute(arguments[0]))?a.setValue(arguments[1]):(a=new b(arguments[0],
	arguments[0],null,arguments[1],"CDATA"),this.attributes.push(a))},setString:function(a,b){this.setAttribute(a,b)},setInt:function(a,b){this.setAttribute(a,b)},setFloat:function(a,b){this.setAttribute(a,b)},setContent:function(a){0<this.children.length&&Processing.debug("Tried to set content for XMLElement with children");this.content=a},setName:function(){if(1===arguments.length)this.name=arguments[0],this.fullName=arguments[0],this.namespace=null;else{var a=arguments[0].indexOf(":");this.name=null===
	arguments[1]||0>a?arguments[0]:arguments[0].substring(a+1);this.fullName=arguments[0];this.namespace=arguments[1]}},getName:function(){return this.fullName},getLocalName:function(){return this.name},getAttributeCount:function(){return this.attributes.length},toString:function(){if("TEXT"===this.type)return this.content||"";if("CDATA"===this.type)return this.cdata||"";var a=this.fullName,b="<"+a,e;for(e=0;e<this.attributes.length;e++)var g=this.attributes[e],b=b+(" "+g.getName()+'="'+g.getValue()+
	'"');if(0===this.children.length)b=""===this.content||null===this.content||void 0===this.content?b+"/>":b+(">"+this.content+"</"+a+">");else{b+=">";for(e=0;e<this.children.length;e++)b+=this.children[e].toString();b+="</"+a+">"}return b}};e.parse=function(a){var b=new e;b.parse(a);return b};return e}},{}],21:[function(D,y,V){y.exports={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedalmond:"#ffebcd",
	blue:"#0000ff",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00ffff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",
	darkslategray:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",gold:"#ffd700",goldenrod:"#daa520",gray:"#808080",green:"#008000",greenyellow:"#adff2f",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavender:"#e6e6fa",lavenderblush:"#fff0f5",
	lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgrey:"#d3d3d3",lightgreen:"#90ee90",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#778899",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#00ff00",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#ff00ff",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370d8",
	mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#d87093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",
	pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",red:"#ff0000",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",
	whitesmoke:"#f5f5f5",yellow:"#ffff00",yellowgreen:"#9acd32"}},{}],22:[function(D,y,V){y.exports=function(h,g,k){return function(p,a){p.__contains=function(b,e){return"string"!==typeof b?b.contains.apply(b,a(arguments)):null!==b&&null!==e&&"string"===typeof e&&-1<b.indexOf(e)};p.__replaceAll=function(b,e,c){return"string"!==typeof b?b.replaceAll.apply(b,a(arguments)):b.replace(RegExp(e,"g"),c)};p.__replaceFirst=function(b,e,c){return"string"!==typeof b?b.replaceFirst.apply(b,a(arguments)):b.replace(RegExp(e,
	""),c)};p.__replace=function(b,e,c){if("string"!==typeof b)return b.replace.apply(b,a(arguments));if(e instanceof RegExp)return b.replace(e,c);"string"!==typeof e&&(e=e.toString());if(""===e)return b;var g=b.indexOf(e);if(0>g)return b;var h=0,k="";do k+=b.substring(h,g)+c,h=g+e.length;while(0<=(g=b.indexOf(e,h)));return k+b.substring(h)};p.__equals=function(b,e){return b.equals instanceof Function?b.equals.apply(b,a(arguments)):g(b,e)};p.__equalsIgnoreCase=function(b,e){return"string"!==typeof b?
	b.equalsIgnoreCase.apply(b,a(arguments)):b.toLowerCase()===e.toLowerCase()};p.__toCharArray=function(b){if("string"!==typeof b)return b.toCharArray.apply(b,a(arguments));for(var e=[],c=0,g=b.length;c<g;++c)e[c]=new Char(b.charAt(c));return e};p.__split=function(b,e,c){if("string"!==typeof b)return b.split.apply(b,a(arguments));var g=RegExp(e);if(c===k||1>c)return b.split(g);for(var h=[],p=b,f;-1!==(f=p.search(g))&&h.length<c-1;){var sd=g.exec(p).toString();h.push(p.substring(0,f));p=p.substring(f+
	sd.length)}-1===f&&""===p||h.push(p);return h};p.__codePointAt=function(a,e){var c=a.charCodeAt(e),g;return 55296<=c&&56319>=c?(g=a.charCodeAt(e+1),1024*(c-55296)+(g-56320)+65536):c};p.__matches=function(a,e){return RegExp(e).test(a)};p.__startsWith=function(b,e,c){if("string"!==typeof b)return b.startsWith.apply(b,a(arguments));c=c||0;return 0>c||c>b.length?!1:""===e||e===b?!0:b.indexOf(e)===c};p.__endsWith=function(b,e){if("string"!==typeof b)return b.endsWith.apply(b,a(arguments));var c=e?e.length:
	0;return""===e||e===b?!0:b.indexOf(e)===b.length-c};p.__hashCode=function(b){return b.hashCode instanceof Function?b.hashCode.apply(b,a(arguments)):h(b)};p.__printStackTrace=function(a){p.println("Exception: "+a.toString())}}}},{}],23:[function(D,y,V){y.exports=function(h,g){function k(a,b){var f=a||362436069,c=b||521288629,e=function(){f=36969*(f&65535)+(f>>>16)&4294967295;c=18E3*(c&65535)+(c>>>16)&4294967295;return((f&65535)<<16|c&65535)&4294967295};this.doubleGenerator=function(){var a=e()/4294967296;
	return 0>a?1+a:a};this.intGenerator=e}function p(a){function b(a,f,c,e){a&=15;var g=8>a?f:c;f=4>a?c:12===a||14===a?f:e;return(0===(a&1)?g:-g)+(0===(a&2)?f:-f)}function f(a,b,f){b=0===(a&1)?b:f;return 0===(a&2)?-b:b}function c(a,b,f){return b+a*(f-b)}a=a!==g?new k(a,(a<<16)+(a>>16)):k.createRandomized();var e,h,n=new Uint8Array(512);for(e=0;256>e;++e)n[e]=e;for(e=0;256>e;++e){var p=n[h=a.intGenerator()&255];n[h]=n[e];n[e]=p}for(e=0;256>e;++e)n[e+256]=n[e];this.noise3d=function(a,f,e){var g=Math.floor(a)&
	255,h=Math.floor(f)&255,k=Math.floor(e)&255;a-=Math.floor(a);f-=Math.floor(f);e-=Math.floor(e);var q=(3-2*a)*a*a,p=(3-2*f)*f*f,I=n[g]+h,da=n[I]+k,I=n[I+1]+k,h=n[g+1]+h,g=n[h]+k,k=n[h+1]+k;return c((3-2*e)*e*e,c(p,c(q,b(n[da],a,f,e),b(n[g],a-1,f,e)),c(q,b(n[I],a,f-1,e),b(n[k],a-1,f-1,e))),c(p,c(q,b(n[da+1],a,f,e-1),b(n[g+1],a-1,f,e-1)),c(q,b(n[I+1],a,f-1,e-1),b(n[k+1],a-1,f-1,e-1))))};this.noise2d=function(a,b){var e=Math.floor(a)&255,g=Math.floor(b)&255;a-=Math.floor(a);b-=Math.floor(b);var h=(3-
	2*a)*a*a,k=n[e]+g,e=n[e+1]+g;return c((3-2*b)*b*b,c(h,f(n[k],a,b),f(n[e],a-1,b)),c(h,f(n[k+1],a,b-1),f(n[e+1],a-1,b-1)))};this.noise1d=function(a){var b=Math.floor(a)&255;a-=Math.floor(a);return c((3-2*a)*a*a,0===(n[b]&1)?-a:a,0===(n[b+1]&1)?-(a-1):a-1)}}var a=function(){return Math.random()};h.abs=Math.abs;h.ceil=Math.ceil;h.exp=Math.exp;h.floor=Math.floor;h.log=Math.log;h.pow=Math.pow;h.round=Math.round;h.sqrt=Math.sqrt;h.acos=Math.acos;h.asin=Math.asin;h.atan=Math.atan;h.atan2=Math.atan2;h.cos=
	Math.cos;h.sin=Math.sin;h.tan=Math.tan;h.constrain=function(a,b,f){return a>f?f:a<b?b:a};h.dist=function(){var a,b,f;if(4===arguments.length)return a=arguments[0]-arguments[2],b=arguments[1]-arguments[3],Math.sqrt(a*a+b*b);if(6===arguments.length)return a=arguments[0]-arguments[3],b=arguments[1]-arguments[4],f=arguments[2]-arguments[5],Math.sqrt(a*a+b*b+f*f)};h.lerp=function(a,b,f){return(b-a)*f+a};h.mag=function(a,b,f){return f?Math.sqrt(a*a+b*b+f*f):Math.sqrt(a*a+b*b)};h.map=function(a,b,f,c,e){return c+
	(e-c)*((a-b)/(f-b))};h.max=function(){if(2===arguments.length)return arguments[0]<arguments[1]?arguments[1]:arguments[0];var a=1===arguments.length?arguments[0]:arguments;if(!("length"in a&&0<a.length))throw"Non-empty array is expected";for(var b=a[0],f=a.length,c=1;c<f;++c)b<a[c]&&(b=a[c]);return b};h.min=function(){if(2===arguments.length)return arguments[0]<arguments[1]?arguments[0]:arguments[1];var a=1===arguments.length?arguments[0]:arguments;if(!("length"in a&&0<a.length))throw"Non-empty array is expected";
	for(var b=a[0],f=a.length,c=1;c<f;++c)b>a[c]&&(b=a[c]);return b};h.norm=function(a,b,f){return(a-b)/(f-b)};h.sq=function(a){return a*a};h.degrees=function(a){return 180*a/Math.PI};h.random=function(){if(0===arguments.length)return a();if(1===arguments.length)return a()*arguments[0];var b=arguments[0],c=arguments[1];return a()*(c-b)+b};k.createRandomized=function(){var a=new Date;return new k(a/6E4&4294967295,a&4294967295)};h.randomSeed=function(b){a=(new k(b,(b<<16)+(b>>16))).doubleGenerator;this.haveNextNextGaussian=
	!1};h.randomGaussian=function(){if(this.haveNextNextGaussian)return this.haveNextNextGaussian=!1,this.nextNextGaussian;var b,c,f;do b=2*a()-1,c=2*a()-1,f=b*b+c*c;while(1<=f||0===f);f=Math.sqrt(-2*Math.log(f)/f);this.nextNextGaussian=c*f;this.haveNextNextGaussian=!0;return b*f};var b=g,e=4,c=0.5,n=g;h.noise=function(a,h,f){b===g&&(b=new p(n));for(var k=b,da=1,I=1,F=0,O=0;O<e;++O){da*=c;switch(arguments.length){case 1:F+=da*(1+k.noise1d(I*a))/2;break;case 2:F+=da*(1+k.noise2d(I*a,I*h))/2;break;case 3:F+=
	da*(1+k.noise3d(I*a,I*h,I*f))/2}I*=2}return F};h.noiseDetail=function(a,b){e=a;b!==g&&(c=b)};h.noiseSeed=function(a){n=a;b=g}}},{}],24:[function(D,y,V){y.exports=function(h){var g={trim:function(g){if(g instanceof Array){for(var h=[],a=0;a<g.length;a++)h.push(g[a].replace(/^\s*/,"").replace(/\s*$/,"").replace(/\r*$/,""));return h}return g.replace(/^\s*/,"").replace(/\s*$/,"").replace(/\r*$/,"")},radians:function(g){return g/180*Math.PI},nfCoreScalar:function(g,p,a,b,e,c){p=0>g?a:p;a=0===e;e=e===h||
	0>e?0:e;g=Math.abs(g);if(a)for(e=1,g*=10;1E-6<Math.abs(Math.round(g)-g)&&7>e;)++e,g*=10;else 0!==e&&(g*=Math.pow(10,e));a=2*g;Math.floor(g)===g?a=g:Math.floor(a)===a?(g=Math.floor(g),a=g+g%2):a=Math.round(g);g="";for(b+=e;0<b||0<a;)b--,g=""+a%10+g,a=Math.floor(a/10);if(c!==h)for(b=g.length-3-e;0<b;)g=g.substring(0,b)+c+g.substring(b),b-=3;return 0<e?p+g.substring(0,g.length-e)+"."+g.substring(g.length-e,g.length):p+g},nfCore:function(h,p,a,b,e,c){if(h instanceof Array){for(var n=[],q=0,T=h.length;q<
	T;q++)n.push(g.nfCoreScalar(h[q],p,a,b,e,c));return n}return g.nfCoreScalar(h,p,a,b,e,c)},nf:function(h,p,a){return g.nfCore(h,"","-",p,a)},nfs:function(h,p,a){return g.nfCore(h," ","-",p,a)},nfp:function(h,p,a){return g.nfCore(h,"+","-",p,a)},nfc:function(h,p){return g.nfCore(h,"","-",0,p,",")},withCommonFunctions:function(h){"trim radians nf nfs nfp nfc".split(" ").forEach(function(p){h[p]=g[p]})}};return g}()},{}],25:[function(D,y,V){y.exports=function(h,g,k,p,a,b){function e(a,b){var c=a,e=0,
	g=0;h.pmouseX=h.mouseX;h.pmouseY=h.mouseY;if(c.offsetParent){do e+=c.offsetLeft,g+=c.offsetTop;while(c=c.offsetParent)}c=a;do e-=c.scrollLeft||0,g-=c.scrollTop||0;while(c=c.parentNode);var k,n,q,y;p.defaultView&&p.defaultView.getComputedStyle&&(k=parseInt(p.defaultView.getComputedStyle(a,null).paddingLeft,10)||0,n=parseInt(p.defaultView.getComputedStyle(a,null).paddingTop,10)||0,q=parseInt(p.defaultView.getComputedStyle(a,null).borderLeftWidth,10)||0,y=parseInt(p.defaultView.getComputedStyle(a,null).borderTopWidth,
	10)||0);e=e+k+q;g=g+n+y;e+=window.pageXOffset;g+=window.pageYOffset;return{X:e,Y:g}}function c(a,b){var c=e(a,b);h.mouseX=b.pageX-c.X;h.mouseY=b.pageY-c.Y}function n(a){var b=e(a.changedTouches[0].target,a.changedTouches[0]),c;for(c=0;c<a.touches.length;c++){var g=a.touches[c];g.offsetX=g.pageX-b.X;g.offsetY=g.pageY-b.Y}for(c=0;c<a.targetTouches.length;c++)g=a.targetTouches[c],g.offsetX=g.pageX-b.X,g.offsetY=g.pageY-b.Y;for(c=0;c<a.changedTouches.length;c++)g=a.changedTouches[c],g.offsetX=g.pageX-
	b.X,g.offsetY=g.pageY-b.Y;return a}k(g,"touchstart",function(e){g.setAttribute("style","-webkit-user-select: none");g.setAttribute("onclick","void(0)");g.setAttribute("style","-webkit-tap-highlight-color:rgba(0,0,0,0)");for(var f=0,p=eventHandlers.length;f<p;f++){var q=eventHandlers[f].type;"mouseout"!==q&&"mousemove"!==q&&"mousedown"!==q&&"mouseup"!==q&&"DOMMouseScroll"!==q&&"mousewheel"!==q&&"touchstart"!==q||detachEventHandler(eventHandlers[f])}h.touchStart!==b||h.touchMove!==b||h.touchEnd!==b||
	h.touchCancel!==b?(k(g,"touchstart",function(a){h.touchStart!==b&&(a=n(a),h.touchStart(a))}),k(g,"touchmove",function(a){h.touchMove!==b&&(a.preventDefault(),a=n(a),h.touchMove(a))}),k(g,"touchend",function(a){h.touchEnd!==b&&(a=n(a),h.touchEnd(a))}),k(g,"touchcancel",function(a){h.touchCancel!==b&&(a=n(a),h.touchCancel(a))})):(k(g,"touchstart",function(b){c(g,b.touches[0]);h.__mousePressed=!0;h.mouseDragging=!1;h.mouseButton=a.LEFT;"function"===typeof h.mousePressed&&h.mousePressed()}),k(g,"touchmove",
	function(a){a.preventDefault();c(g,a.touches[0]);"function"!==typeof h.mouseMoved||h.__mousePressed||h.mouseMoved();"function"===typeof h.mouseDragged&&h.__mousePressed&&(h.mouseDragged(),h.mouseDragging=!0)}),k(g,"touchend",function(a){h.__mousePressed=!1;"function"!==typeof h.mouseClicked||h.mouseDragging||h.mouseClicked();"function"===typeof h.mouseReleased&&h.mouseReleased()}));g.dispatchEvent(e)});(function(){var a=!0,b=function(a){a.preventDefault();a.stopPropagation()};h.disableContextMenu=
	function(){a&&(k(g,"contextmenu",b),a=!1)};h.enableContextMenu=function(){a||(detachEventHandler({elem:g,type:"contextmenu",fn:b}),a=!0)}})();k(g,"mousemove",function(a){c(g,a);"function"!==typeof h.mouseMoved||h.__mousePressed||h.mouseMoved();"function"===typeof h.mouseDragged&&h.__mousePressed&&(h.mouseDragged(),h.mouseDragging=!0)});k(g,"mouseout",function(a){"function"===typeof h.mouseOut&&h.mouseOut()});k(g,"mouseover",function(a){c(g,a);"function"===typeof h.mouseOver&&h.mouseOver()});g.onmousedown=
	function(){g.focus();return!1};k(g,"mousedown",function(b){h.__mousePressed=!0;h.mouseDragging=!1;switch(b.which){case 1:h.mouseButton=a.LEFT;break;case 2:h.mouseButton=a.CENTER;break;case 3:h.mouseButton=a.RIGHT}"function"===typeof h.mousePressed&&h.mousePressed()});k(g,"mouseup",function(a){h.__mousePressed=!1;"function"!==typeof h.mouseClicked||h.mouseDragging||h.mouseClicked();"function"===typeof h.mouseReleased&&h.mouseReleased()});var q=function(a){var b=0;a.wheelDelta?(b=a.wheelDelta/120,window.opera&&
	(b=-b)):a.detail&&(b=-a.detail/3);(h.mouseScroll=b)&&"function"===typeof h.mouseScrolled&&h.mouseScrolled()};k(p,"DOMMouseScroll",q);k(p,"mousewheel",q)}},{}],26:[function(D,y,V){y.exports=function(h,g){function k(){var a="abs acos alpha ambient ambientLight append applyMatrix arc arrayCopy asin atan atan2 background beginCamera beginDraw beginShape bezier bezierDetail bezierPoint bezierTangent bezierVertex binary blend blendColor blit_resize blue box breakShape brightness camera ceil Character color colorMode concat constrain copy cos createFont createGraphics createImage cursor curve curveDetail curvePoint curveTangent curveTightness curveVertex day degrees directionalLight disableContextMenu dist draw ellipse ellipseMode emissive enableContextMenu endCamera endDraw endShape exit exp expand externals fill filter floor focused frameCount frameRate frustum get glyphLook glyphTable green height hex hint hour hue image imageMode intersect join key keyCode keyPressed keyReleased keyTyped lerp lerpColor lightFalloff lights lightSpecular line link loadBytes loadFont loadGlyphs loadImage loadPixels loadShape loadXML loadStrings log loop mag map match matchAll max millis min minute mix modelX modelY modelZ modes month mouseButton mouseClicked mouseDragged mouseMoved mouseOut mouseOver mousePressed mouseReleased mouseScroll mouseScrolled mouseX mouseY name nf nfc nfp nfs noCursor noFill noise noiseDetail noiseSeed noLights noLoop norm normal noSmooth noStroke noTint ortho param parseBoolean parseByte parseChar parseFloat parseInt parseXML peg perspective PImage pixels PMatrix2D PMatrix3D PMatrixStack pmouseX pmouseY point pointLight popMatrix popStyle pow print printCamera println printMatrix printProjection PShape PShapeSVG pushMatrix pushStyle quad radians random randomGaussian randomSeed rect rectMode red redraw requestImage resetMatrix reverse rotate rotateX rotateY rotateZ round saturation save saveFrame saveStrings scale screenX screenY screenZ second set setup shape shapeMode shared shearX shearY shininess shorten sin size smooth sort specular sphere sphereDetail splice split splitTokens spotLight sq sqrt status str stroke strokeCap strokeJoin strokeWeight subset tan text textAlign textAscent textDescent textFont textLeading textMode textSize texture textureMode textWidth tint toImageData touchCancel touchEnd touchMove touchStart translate transform triangle trim unbinary unhex updatePixels use3DContext vertex width XMLElement XML year __contains __equals __equalsIgnoreCase __frameRate __hashCode __int_cast __instanceof __keyPressed __mousePressed __printStackTrace __replace __replaceAll __replaceFirst __toCharArray __split __codePointAt __startsWith __endsWith __matches".split(" ");
	c&&Object.keys(c).forEach(function(b){a.push(b)});var b={},e,g;e=0;for(g=a.length;e<g;++e)b[a[e]]=null;for(var k in h.lib)if(h.lib.hasOwnProperty(k)&&h.lib[k].exports){var n=h.lib[k].exports;e=0;for(g=n.length;e<g;++e)b[n[e]]=null}return b}function p(a){function c(a){var b=/^\s*/.exec(a);if(b[0].length===a.length)a={left:b[0],middle:"",right:""};else{var d=/\s*$/.exec(a);a={left:b[0],middle:a.substring(b[0].length,d.index),right:d[0]}}a.untrim=function(a){return this.left+a+this.right};return a}function g(a){return a.replace(/^\s+/,
	"").replace(/\s+$/,"")}function h(a,b){for(var d=0,c=b.length;d<c;++d)a[b[d]]=null;return a}function n(a){for(var b in a)if(a.hasOwnProperty(b))return!1;return!0}function p(a){return a.substring(2,a.length-1)}function u(a,b){var d=Q.length;Q.push(a);return'"'+b+d+'"'}function y(a){a=a.replace(wa,function(a){return u(a,"E")});a=a.replace(ra,function(a){return u(a,"D")});return a=a.replace(nb,function(a){return u(a,"H")})}function z(a,b){return a.replace(Ib,function(a,d,c,f,e,g){return c!==b?a:u(a,
	"G")})}function D(a){this.name=a}function T(a,b){this.params=a;this.methodArgsParam=b}function R(a){var b=g(a.substring(1,a.length-1));a=[];var d=null;if(""!==b)for(var b=b.split(","),c=0;c<b.length;++c){var f=/\b([A-Za-z_$][\w$]*\b)(\s*"[ABC][\d]*")*\s*$/.exec(b[c]);if(c===b.length-1&&0<=b[c].indexOf("...")){d=new D(f[1]);break}a.push(new D(f[1]))}return new T(a,d)}function x(a){function b(a,d,e,g){a=Q[g];f=!0;a=c(a.substring(1,a.length-1));return"__"+e+(""===a.middle?u("("+d.replace(/\.\s*$/,"")+
	")","B"):u("("+d.replace(/\.\s*$/,"")+","+a.middle+")","B"))}function d(a,b,c){f=!0;return"__instanceof"+u("("+b+", "+c+")","B")}a=a.replace(/\bnew\s+([A-Za-z_$][\w$]*\b(?:\s*\.\s*[A-Za-z_$][\w$]*\b)*)(?:\s*"C\d+")+\s*("A\d+")/g,function(a,b,d){return d});a=a.replace(/\bnew\s+([A-Za-z_$][\w$]*\b(?:\s*\.\s*[A-Za-z_$][\w$]*\b)*)(?:\s*"B\d+")\s*("A\d+")/g,function(a,b,d){return u(a,"F")});a=a.replace(nb,function(a){return u(a,"H")});a=a.replace(/\bnew\s+([A-Za-z_$][\w$]*\b(?:\s*\.\s*[A-Za-z_$][\w$]*\b)*)\s*("C\d+"(?:\s*"C\d+")*)/g,
	function(a,b,d){a=d.replace(/"C(\d+)"/g,function(a,b){return Q[b]}).replace(/\[\s*\]/g,"[null]").replace(/\s*\]\s*\[\s*/g,", ");a="{"+a.substring(1,a.length-1)+"}";b="('"+b+"', "+u(a,"A")+")";return"$p.createJavaArray"+u(b,"B")});a=a.replace(/(\.\s*length)\s*"B\d+"/g,"$1");a=a.replace(/#([0-9A-Fa-f]{6})\b/g,function(a,b){return"0xFF"+b});a=a.replace(/"B(\d+)"(\s*(?:[\w$']|"B))/g,function(a,b,d){b=Q[b];if(!/^\(\s*[A-Za-z_$][\w$]*\b(?:\s*\.\s*[A-Za-z_$][\w$]*\b)*\s*(?:"C\d+"\s*)*\)$/.test(b))return a;
	if(/^\(\s*int\s*\)$/.test(b))return"(int)"+d;b=b.split(/"C(\d+)"/g);return 1<b.length&&!/^\[\s*\]$/.test(Q[b[1]])?a:""+d});a=a.replace(/\(int\)([^,\]\)\}\?\:\*\+\-\/\^\|\%\&\~<\>\=]+)/g,function(a,b){var d=c(b);return d.untrim("__int_cast("+d.middle+")")});a=a.replace(/\bsuper(\s*"B\d+")/g,"$$superCstr$1").replace(/\bsuper(\s*\.)/g,"$$super$1");a=a.replace(/\b0+((\d*)(?:\.[\d*])?(?:[eE][\-\+]?\d+)?[fF]?)\b/,function(a,b,d){return b===d?a:""===d?"0"+b:b});a=a.replace(/\b(\.?\d+\.?)[fF]\b/g,"$1");a=
	a.replace(/([^\s])%([^=\s])/g,"$1 % $2");a=a.replace(/\b(frameRate|keyPressed|mousePressed)\b(?!\s*"B)/g,"__$1");a=a.replace(/\b(boolean|byte|char|float|int)\s*"B/g,function(a,b){return"parse"+b.substring(0,1).toUpperCase()+b.substring(1)+'"B'});a=a.replace(/\bpixels\b\s*(("C(\d+)")|\.length)?(\s*=(?!=)([^,\]\)\}]+))?/g,function(a,b,d,c,f,e){return d?(a=Q[c],f?"pixels.setPixel"+u("("+a.substring(1,a.length-1)+","+e+")","B"):"pixels.getPixel"+u("("+a.substring(1,a.length-1)+")","B")):b?"pixels.getLength"+
	u("()","B"):f?"pixels.set"+u("("+e+")","B"):"pixels.toArray"+u("()","B")});var f;do f=!1,a=a.replace(/((?:'\d+'|\b[A-Za-z_$][\w$]*\s*(?:"[BC]\d+")*)\s*\.\s*(?:[A-Za-z_$][\w$]*\s*(?:"[BC]\d+"\s*)*\.\s*)*)(replace|replaceAll|replaceFirst|contains|equals|equalsIgnoreCase|hashCode|toCharArray|printStackTrace|split|startsWith|endsWith|codePointAt|matches)\s*"B(\d+)"/g,b);while(f);do f=!1,a=a.replace(/((?:'\d+'|\b[A-Za-z_$][\w$]*\s*(?:"[BC]\d+")*)\s*(?:\.\s*[A-Za-z_$][\w$]*\s*(?:"[BC]\d+"\s*)*)*)instanceof\s+([A-Za-z_$][\w$]*\s*(?:\.\s*[A-Za-z_$][\w$]*)*)/g,
	d);while(f);return a=a.replace(/\bthis(\s*"B\d+")/g,"$$constr$1")}function V(a,b){this.baseInterfaceName=a;this.body=b;b.owner=this}function td(a){var b=RegExp(/\bnew\s*([A-Za-z_$][\w$]*\s*(?:\.\s*[A-Za-z_$][\w$]*)*)\s*"B\d+"\s*"A(\d+)"/).exec(a);a=oa;var d="class"+ ++eb;oa=d;var c=b[1]+"$"+d,b=new V(c,ja(Q[b[2]],c,"","implements "+b[1]));b.classId=d;b.scopeId=a;ba[d]=b;oa=a;return b}function rc(a,b,d){this.name=a;this.params=b;this.body=d}function Y(a){a=RegExp(/\b([A-Za-z_$][\w$]*)\s*"B(\d+)"\s*"A(\d+)"/).exec(a);
	return new rc("function"!==a[1]?a[1]:null,R(Q[a[2]]),pa(Q[a[3]]))}function ca(a){this.members=a}function Z(a){a=a.split(",");for(var b=0;b<a.length;++b){var d=a[b].indexOf(":");a[b]=0>d?{value:sa(a[b])}:{label:g(a[b].substring(0,d)),value:sa(g(a[b].substring(d+1)))}}return new ca(a)}function fa(a){if("("===a.charAt(0)||"["===a.charAt(0))return a.charAt(0)+fa(a.substring(1,a.length-1))+a.charAt(a.length-1);if("{"===a.charAt(0))return/^\{\s*(?:[A-Za-z_$][\w$]*|'\d+')\s*:/.test(a)?"{"+u(a.substring(1,
	a.length-1),"I")+"}":"["+fa(a.substring(1,a.length-1))+"]";a=c(a);var b=x(a.middle),b=b.replace(/"[ABC](\d+)"/g,function(a,b){return fa(Q[b])});return a.untrim(b)}function xa(a){return a.replace(/(\.\s*)?((?:\b[A-Za-z_]|\$)[\w$]*)(\s*\.\s*([A-Za-z_$][\w$]*)(\s*\()?)?/g,function(a,b,d,c,f,e){return b?a:E({name:d,member:f,callSign:!!e})+(c===q?"":c)})}function ya(a,b){this.expr=a;this.transforms=b}function dc(a,b,d){this.name=a;this.value=b;this.isDefault=d}function fb(a,b){var d=a.indexOf("="),c,f;
	0>d?(c=a,d=b,f=!0):(c=a.substring(0,d),d=sa(a.substring(d+1)),f=!1);return new dc(g(c.replace(/(\s*"C\d+")+/g,"")),d,f)}function Wa(a){return"int"===a||"float"===a?"0":"boolean"===a?"false":"color"===a?"0x00000000":"null"}function gb(a,b){this.definitions=a;this.varType=b}function Jb(a){this.expression=a}function hb(a){if(Kb.test(a)){var b=yb.exec(a);a=a.substring(b[0].length).split(",");for(var d=Wa(b[2]),c=0;c<a.length;++c)a[c]=fb(a[c],d);return new gb(a,b[2])}return new Jb(sa(a))}function Lb(a,
	b,d){this.initStatement=a;this.condition=b;this.step=d}function Mb(a,b){this.initStatement=a;this.container=b}function Ba(a,b){this.initStatement=a;this.container=b}function Ea(a){if(/\bin\b/.test(a))return a=a.substring(1,a.length-1).split(/\bin\b/g),new Mb(hb(g(a[0])),sa(a[1]));if(0<=a.indexOf(":")&&0>a.indexOf(";"))return a=a.substring(1,a.length-1).split(":"),new Ba(hb(g(a[0])),sa(a[1]));a=a.substring(1,a.length-1).split(";");return new Lb(hb(g(a[0])),sa(a[1]),sa(a[2]))}function Xa(a){a.sort(function(a,
	b){return b.weight-a.weight})}function Na(a,b,d){this.name=a;this.body=b;this.isStatic=d;b.owner=this}function Nb(a,b,d){this.name=a;this.body=b;this.isStatic=d;b.owner=this}function Ob(a){var b=wa.exec(a);wa.lastIndex=0;var d=0<=b[1].indexOf("static"),c=Q[p(b[6])];a=oa;var f="class"+ ++eb;oa=f;b="interface"===b[2]?new Na(b[3],ib(c,b[3],b[4]),d):new Nb(b[3],ja(c,b[3],b[4],b[5]),d);b.classId=f;b.scopeId=a;ba[f]=b;oa=a;return b}function Pb(a,b,d,c){this.name=a;this.params=b;this.body=d;this.isStatic=
	c}function jb(a){a=ra.exec(a);ra.lastIndex=0;var b=0<=a[1].indexOf("static"),d=";"!==a[6]?Q[p(a[6])]:"{}";return new Pb(a[3],R(Q[p(a[4])]),pa(d),b)}function Qb(a,b,d){this.definitions=a;this.fieldType=b;this.isStatic=d}function Ya(a){var b=yb.exec(a),d=0<=b[1].indexOf("static");a=a.substring(b[0].length).split(/,\s*/g);for(var c=Wa(b[2]),f=0;f<a.length;++f)a[f]=fb(a[f],c);return new Qb(a,b[2],d)}function Rb(a,b){this.params=a;this.body=b}function ec(a){a=RegExp(/"B(\d+)"\s*"A(\d+)"/).exec(a);var b=
	R(Q[a[1]]);return new Rb(b,pa(Q[a[2]]))}function Oa(a,b,d,c,f,e){this.name=a;this.interfacesNames=b;this.methodsNames=d;this.fields=c;this.innerClasses=f;this.misc=e;a=0;for(b=c.length;a<b;++a)c[a].owner=this}function J(a,b,d,c,f,e,g,h,m){this.name=a;this.baseClassName=b;this.interfacesNames=d;this.functions=c;this.methods=f;this.fields=e;this.cstrs=g;this.innerClasses=h;this.misc=m;a=0;for(b=e.length;a<b;++a)e[a].owner=this}function pb(a,b){this.name=a;this.body=b;b.owner=this}function qb(a,b){this.name=
	a;this.body=b;b.owner=this}function Sb(a){var b=wa.exec(a);wa.lastIndex=0;var d=Q[p(b[6])];a=oa;var c="class"+ ++eb;oa=c;b="interface"===b[2]?new pb(b[3],ib(d,b[3],b[4])):new qb(b[3],ja(d,b[3],b[4],b[5]));b.classId=c;b.scopeId=a;ba[c]=b;oa=a;return b}function zb(a,b,d){this.name=a;this.params=b;this.body=d}function wc(a){a=ra.exec(a);ra.lastIndex=0;return new zb(a[3],R(Q[p(a[4])]),pa(Q[p(a[6])]))}function Tb(a,b){this.argument=a;this.misc=b}function fc(a,b){this.argument=a;this.misc=b}function X(a,
	b,d){this.name=a;this.argument=b;this.misc=d}function Ub(a){this.expr=a}function Ab(a){this.label=a}function d(a){for(var b=[],d=0,c=a.length;d<c;++d){var f=a[d];f instanceof gb?b=b.concat(f.getNames()):f instanceof Tb&&f.argument.initStatement instanceof gb?b=b.concat(f.argument.initStatement.getNames()):(f instanceof Na||f instanceof Nb||f instanceof pb||f instanceof qb||f instanceof zb||f instanceof rc)&&b.push(f.name)}return h({},b)}function m(a){this.statements=a}function ia(a){this.statements=
	a}var ma=k(),W=[];a=a.replace(/\r\n?|\n\r/g,"\n").replace(/("(?:[^"\\\n]|\\.)*")|('(?:[^'\\\n]|\\.)*')|(([\[\(=|&!\^:?]\s*)(\/(?![*\/])(?:[^\/\\\n]|\\.)*\/[gim]*)\b)|(\/\/[^\n]*\n)|(\/\*(?:(?!\*\/)(?:.|\n))*\*\/)/g,function(a,b,d,c,f,e,g,h){return b||d?(b=W.length,W.push(a),"'"+b+"'"):c?(b=W.length,W.push(e),f+"'"+b+"'"):""!==h?" ":"\n"});a=a.replace(/__x([0-9A-F]{4})/g,function(a,b){return"__x005F_x"+b});a=a.replace(/\$/g,"__x0024");a=a.replace(/return\s*[\n\r]+/g,"return ");var qa,Pa=function(a,
	b,d,c){if(b||c)return a;qa=!0;return""};do qa=!1,a=a.replace(/([<]?)<\s*((?:\?|[A-Za-z_$][\w$]*\b(?:\s*\.\s*[A-Za-z_$][\w$]*\b)*)(?:\[\])*(?:\s+(?:extends|super)\s+[A-Za-z_$][\w$]*\b(?:\s*\.\s*[A-Za-z_$][\w$]*\b)*)?(?:\s*,\s*(?:\?|[A-Za-z_$][\w$]*\b(?:\s*\.\s*[A-Za-z_$][\w$]*\b)*)(?:\[\])*(?:\s+(?:extends|super)\s+[A-Za-z_$][\w$]*\b(?:\s*\.\s*[A-Za-z_$][\w$]*\b)*)?)*)\s*>([=]?)/g,Pa);while(qa);var Q=function(a){var b=[];a=a.split(/([\{\[\(\)\]\}])/);for(var d=a[0],c=[],f=1;f<a.length;f+=2){var e=
	a[f];if("["===e||"{"===e||"("===e)c.push(d),d=e;else if("]"===e||"}"===e||")"===e){var g="}"===e?"A":")"===e?"B":"C",h=b.length;b.push(d+e);d=c.pop()+'"'+g+(h+1)+'"'}d+=a[f+1]}b.unshift(d);return b}(a),E,ba={},oa,eb=0,ja,ib,pa,Ia,sa,wa=/\b((?:(?:public|private|final|protected|static|abstract)\s+)*)(class|interface)\s+([A-Za-z_$][\w$]*\b)(\s+extends\s+[A-Za-z_$][\w$]*\b(?:\s*\.\s*[A-Za-z_$][\w$]*\b)*(?:\s*,\s*[A-Za-z_$][\w$]*\b(?:\s*\.\s*[A-Za-z_$][\w$]*\b)*\b)*)?(\s+implements\s+[A-Za-z_$][\w$]*\b(?:\s*\.\s*[A-Za-z_$][\w$]*\b)*(?:\s*,\s*[A-Za-z_$][\w$]*\b(?:\s*\.\s*[A-Za-z_$][\w$]*\b)*\b)*)?\s*("A\d+")/g,
	ra=/\b((?:(?:public|private|final|protected|static|abstract|synchronized)\s+)*)((?!(?:else|new|return|throw|function|public|private|protected)\b)[A-Za-z_$][\w$]*\b(?:\s*\.\s*[A-Za-z_$][\w$]*\b)*(?:\s*"C\d+")*)\s*([A-Za-z_$][\w$]*\b)\s*("B\d+")(\s*throws\s+[A-Za-z_$][\w$]*\b(?:\s*\.\s*[A-Za-z_$][\w$]*\b)*(?:\s*,\s*[A-Za-z_$][\w$]*\b(?:\s*\.\s*[A-Za-z_$][\w$]*\b)*)*)?\s*("A\d+"|;)/g,Kb=/^((?:(?:public|private|final|protected|static)\s+)*)((?!(?:else|new|return|throw)\b)[A-Za-z_$][\w$]*\b(?:\s*\.\s*[A-Za-z_$][\w$]*\b)*(?:\s*"C\d+")*)\s*([A-Za-z_$][\w$]*\b)\s*(?:"C\d+"\s*)*([=,]|$)/,
	Ib=/\b((?:(?:public|private|final|protected|static|abstract)\s+)*)((?!(?:new|return|throw)\b)[A-Za-z_$][\w$]*\b)\s*("B\d+")(\s*throws\s+[A-Za-z_$][\w$]*\b(?:\s*\.\s*[A-Za-z_$][\w$]*\b)*(?:\s*,\s*[A-Za-z_$][\w$]*\b(?:\s*\.\s*[A-Za-z_$][\w$]*\b)*)*)?\s*("A\d+")/g,yb=/^((?:(?:public|private|final|protected|static)\s+)*)((?!(?:new|return|throw)\b)[A-Za-z_$][\w$]*\b(?:\s*\.\s*[A-Za-z_$][\w$]*\b)*(?:\s*"C\d+")*)\s*/,nb=/\bfunction(?:\s+([A-Za-z_$][\w$]*))?\s*("B\d+")\s*("A\d+")/g;D.prototype.toString=function(){return this.name};
	T.prototype.getNames=function(){for(var a=[],b=0,d=this.params.length;b<d;++b)a.push(this.params[b].name);return a};T.prototype.prependMethodArgs=function(a){return this.methodArgsParam?"{\nvar "+this.methodArgsParam.name+" = Array.prototype.slice.call(arguments, "+this.params.length+");\n"+a.substring(1):a};T.prototype.toString=function(){if(0===this.params.length)return"()";for(var a="(",b=0,d=this.params.length;b<d;++b)a+=this.params[b]+", ";return a.substring(0,a.length-2)+")"};V.prototype.toString=
	function(){return"new ("+this.body+")"};rc.prototype.toString=function(){var a=E,b=h({"this":null},this.params.getNames());E=function(d){return b.hasOwnProperty(d.name)?d.name:a(d)};var d="function";this.name&&(d+=" "+this.name);var c=this.params.prependMethodArgs(this.body.toString()),d=d+(this.params+" "+c);E=a;return d};ca.prototype.toString=function(){var a=E;E=function(b){return"this"===b.name?"this":a(b)};for(var b="",d=0,c=this.members.length;d<c;++d)this.members[d].label&&(b+=this.members[d].label+
	": "),b+=this.members[d].value.toString()+", ";E=a;return b.substring(0,b.length-2)};ya.prototype.toString=function(){var a=this.transforms;return xa(this.expr).replace(/"!(\d+)"/g,function(b,d){return a[d].toString()})};sa=function(a){var b=[];a=fa(a);a=a.replace(/"H(\d+)"/g,function(a,d){b.push(Y(Q[d]));return'"!'+(b.length-1)+'"'});a=a.replace(/"F(\d+)"/g,function(a,d){b.push(td(Q[d]));return'"!'+(b.length-1)+'"'});a=a.replace(/"I(\d+)"/g,function(a,d){b.push(Z(Q[d]));return'"!'+(b.length-1)+'"'});
	return new ya(a,b)};dc.prototype.toString=function(){return this.name+" = "+this.value};gb.prototype.getNames=function(){for(var a=[],b=0,d=this.definitions.length;b<d;++b)a.push(this.definitions[b].name);return a};gb.prototype.toString=function(){return"var "+this.definitions.join(",")};Jb.prototype.toString=function(){return this.expression.toString()};Lb.prototype.toString=function(){return"("+this.initStatement+"; "+this.condition+"; "+this.step+")"};Mb.prototype.toString=function(){var a=this.initStatement.toString();
	0<=a.indexOf("=")&&(a=a.substring(0,a.indexOf("=")));return"("+a+" in "+this.container+")"};Ba.iteratorId=0;Ba.prototype.toString=function(){var a=this.initStatement.toString(),b="$it"+Ba.iteratorId++,a=a.replace(/^\s*var\s*/,"").split("=")[0];return"("+("var "+b+" = new $p.ObjectIterator("+this.container+"), "+a+" = void(0)")+"; "+(b+".hasNext() && (("+a+" = "+b+".next()) || true)")+";)"};Na.prototype.toString=function(){return""+this.body};Nb.prototype.toString=function(){return""+this.body};Pb.prototype.toString=
	function(){var a=h({},this.params.getNames()),b=E;E=function(d){return a.hasOwnProperty(d.name)?d.name:b(d)};var d=this.params.prependMethodArgs(this.body.toString()),d="function "+this.methodId+this.params+" "+d+"\n";E=b;return d};Qb.prototype.getNames=function(){for(var a=[],b=0,d=this.definitions.length;b<d;++b)a.push(this.definitions[b].name);return a};Qb.prototype.toString=function(){var a=E({name:"[this]"});if(this.isStatic){for(var b=this.owner.name,d=[],c=0,f=this.definitions.length;c<f;++c){var e=
	this.definitions[c],g=e.name,h=b+"."+g;d.push("if("+h+" === void(0)) {\n "+h+" = "+e.value+"; }\n$p.defineProperty("+a+", '"+g+"', { get: function(){return "+h+";}, set: function(val){"+h+" = val;} });\n")}return d.join("")}return a+"."+this.definitions.join("; "+a+".")};Rb.prototype.toString=function(){var a=h({},this.params.getNames()),b=E;E=function(d){return a.hasOwnProperty(d.name)?d.name:b(d)};var d="function $constr_"+this.params.params.length+this.params.toString(),c=this.params.prependMethodArgs(this.body.toString());
	/\$(superCstr|constr)\b/.test(c)||(c="{\n$superCstr();\n"+c.substring(1));E=b;return d+c+"\n"};Oa.prototype.getMembers=function(a,b,d){this.owner.base&&this.owner.base.body.getMembers(a,b,d);var c,f,e,g;c=0;for(e=this.fields.length;c<e;++c){var h=this.fields[c].getNames();f=0;for(g=h.length;f<g;++f)a[h[f]]=this.fields[c]}c=0;for(e=this.methodsNames.length;c<e;++c)b[this.methodsNames[c]]=!0;c=0;for(e=this.innerClasses.length;c<e;++c)a=this.innerClasses[c],d[a.name]=a};Oa.prototype.toString=function(){for(var a=
	this.owner,b=0;a;)++b,a=a.scope;var a=this.name,d=b="";this.getMembers({},{},{});var c,f;if(this.owner.interfaces){var e=[],g;c=0;for(f=this.interfacesNames.length;c<f;++c)this.owner.interfaces[c]&&(g=E({name:this.interfacesNames[c]}),e.push(g),b+="$p.extendInterfaceMembers("+a+", "+g+");\n");d+=a+".$interfaces = ["+e.join(", ")+"];\n"}d=d+(a+".$isInterface = true;\n")+(a+".$methods = ['"+this.methodsNames.join("', '")+"'];\n");Xa(this.innerClasses);c=0;for(f=this.innerClasses.length;c<f;++c)e=this.innerClasses[c],
	e.isStatic&&(b+=a+"."+e.name+" = "+e+";\n");c=0;for(f=this.fields.length;c<f;++c)e=this.fields[c],e.isStatic&&(b+=a+"."+e.definitions.join(";\n"+a+".")+";\n");return"(function() {\nfunction "+a+"() { throw 'Unable to create the interface'; }\n"+b+d+"return "+a+";\n})()"};ib=function(a,b,d){a=a.substring(1,a.length-1);a=y(a);a=z(a,b);var f=[],e=[];a=a.replace(/"([DE])(\d+)"/g,function(a,b,d){"D"===b?f.push(d):"E"===b&&e.push(d);return""});a=a.split(/;(?:\s*;)*/g);var g,h;d!==q&&(g=d.replace(/^\s*extends\s+(.+?)\s*$/g,
	"$1").split(/\s*,\s*/g));d=0;for(h=f.length;d<h;++d){var m=jb(Q[f[d]]);f[d]=m.name}d=0;for(h=a.length-1;d<h;++d)m=c(a[d]),a[d]=Ya(m.middle);m=a.pop();d=0;for(h=e.length;d<h;++d)e[d]=Ob(Q[e[d]]);return new Oa(b,g,f,a,e,{tail:m})};J.prototype.getMembers=function(a,b,d){this.owner.base&&this.owner.base.body.getMembers(a,b,d);var c,f,e,g;c=0;for(e=this.fields.length;c<e;++c){var h=this.fields[c].getNames();f=0;for(g=h.length;f<g;++f)a[h[f]]=this.fields[c]}c=0;for(e=this.methods.length;c<e;++c)a=this.methods[c],
	b[a.name]=a;c=0;for(e=this.innerClasses.length;c<e;++c)b=this.innerClasses[c],d[b.name]=b};J.prototype.toString=function(){var a="$this_"+function(a){for(var b=0;a;)++b,a=a.scope;return b}(this.owner),b=this.name,d="var "+a+" = this;\n",c="",f="",e={},h={},m={};this.getMembers(e,h,m);var k=E;E=function(d){var c=d.name;return"this"===c?d.callSign||!d.member?a+".$self":a:e.hasOwnProperty(c)?e[c].isStatic?b+"."+c:a+"."+c:m.hasOwnProperty(c)?a+"."+c:h.hasOwnProperty(c)?h[c].isStatic?b+"."+c:a+".$self."+
	c:k(d)};var n;this.baseClassName?(n=k({name:this.baseClassName}),d=d+("var $super = { $upcast: "+a+" };\n")+("function $superCstr(){"+n+".apply($super,arguments);if(!('$self' in $super)) $p.extendClassChain($super)}\n"),f+=b+".$base = "+n+";\n"):d+="function $superCstr(){$p.extendClassChain("+a+")}\n";this.owner.base&&(c+="$p.extendStaticMembers("+b+", "+n+");\n");var p,q,u;if(this.owner.interfaces){q=[];n=0;for(p=this.interfacesNames.length;n<p;++n)this.owner.interfaces[n]&&(u=k({name:this.interfacesNames[n]}),
	q.push(u),c+="$p.extendInterfaceMembers("+b+", "+u+");\n");f+=b+".$interfaces = ["+q.join(", ")+"];\n"}0<this.functions.length&&(d+=this.functions.join("\n")+"\n");Xa(this.innerClasses);n=0;for(p=this.innerClasses.length;n<p;++n)q=this.innerClasses[n],q.isStatic?(c+=b+"."+q.name+" = "+q+";\n",d+=a+"."+q.name+" = "+b+"."+q.name+";\n"):d+=a+"."+q.name+" = "+q+";\n";n=0;for(p=this.fields.length;n<p;++n){var x=this.fields[n];if(x.isStatic)for(c+=b+"."+x.definitions.join(";\n"+b+".")+";\n",q=0,u=x.definitions.length;q<
	u;++q)var z=x.definitions[q].name,y=b+"."+z,d=d+("$p.defineProperty("+a+", '"+z+"', {get: function(){return "+y+"}, set: function(val){"+y+" = val}});\n");else d+=a+"."+x.definitions.join(";\n"+a+".")+";\n"}q={};n=0;for(p=this.methods.length;n<p;++n)u=this.methods[n],x=q[u.name],z=u.name+"$"+u.params.params.length,y=!!u.params.methodArgsParam,x?(++x,z+="_"+x):x=1,u.methodId=z,q[u.name]=x,u.isStatic?(c+=u,c+="$p.addMethod("+b+", '"+u.name+"', "+z+", "+y+");\n"):d+=u,d+="$p.addMethod("+a+", '"+u.name+
	"', "+z+", "+y+");\n";d+=g(this.misc.tail);0<this.cstrs.length&&(d+=this.cstrs.join("\n")+"\n");d+="function $constr() {\n";q=[];n=0;for(p=this.cstrs.length;n<p;++n)u=this.cstrs[n].params.params.length,q.push("if(arguments.length "+(this.cstrs[n].params.methodArgsParam?">=":"===")+" "+u+") { $constr_"+u+".apply("+a+", arguments); }");0<q.length&&(d+=q.join(" else ")+" else ");d+="$superCstr();\n}\n";d+="$constr.apply(null, arguments);\n";E=k;return"(function() {\nfunction "+b+"() {\n"+d+"}\n"+c+f+
	"return "+b+";\n})()"};ja=function(a,b,d,f){a=a.substring(1,a.length-1);a=y(a);a=z(a,b);var e=[],g=[],h=[],m=[];a=a.replace(/"([DEGH])(\d+)"/g,function(a,b,d){"D"===b?e.push(d):"E"===b?g.push(d):"H"===b?m.push(d):h.push(d);return""});a=a.replace(/^(?:\s*;)+/,"").split(/;(?:\s*;)*/g);var n,k;d!==q&&(n=d.replace(/^\s*extends\s+([A-Za-z_$][\w$]*\b(?:\s*\.\s*[A-Za-z_$][\w$]*\b)*)\s*$/g,"$1"));f!==q&&(k=f.replace(/^\s*implements\s+(.+?)\s*$/g,"$1").split(/\s*,\s*/g));for(d=0;d<m.length;++d)m[d]=Y(Q[m[d]]);
	for(d=0;d<e.length;++d)e[d]=jb(Q[e[d]]);for(d=0;d<a.length-1;++d)f=c(a[d]),a[d]=Ya(f.middle);f=a.pop();for(d=0;d<h.length;++d)h[d]=ec(Q[h[d]]);for(d=0;d<g.length;++d)g[d]=Ob(Q[g[d]]);return new J(b,n,k,m,e,a,h,g,{tail:f})};pb.prototype.toString=function(){return"var "+this.name+" = "+this.body+";\n$p."+this.name+" = "+this.name+";\n"};qb.prototype.toString=function(){return"var "+this.name+" = "+this.body+";\n$p."+this.name+" = "+this.name+";\n"};zb.prototype.toString=function(){var a=h({},this.params.getNames()),
	b=E;E=function(d){return a.hasOwnProperty(d.name)?d.name:b(d)};var d=this.params.prependMethodArgs(this.body.toString()),d="function "+this.name+this.params+" "+d+"\n$p."+this.name+" = "+this.name+";\n"+this.name+" = "+this.name+".bind($p);";E=b;return d};Tb.prototype.toString=function(){return this.misc.prefix+this.argument.toString()};fc.prototype.toString=function(){return this.misc.prefix+this.argument.toString()};X.prototype.toString=function(){var a=this.misc.prefix;this.argument!==q&&(a+=this.argument.toString());
	return a};Ub.prototype.toString=function(){return"case "+this.expr+":"};Ab.prototype.toString=function(){return this.label};Ia=function(a,b,d){var f=RegExp(/\b(catch|for|if|switch|while|with)\s*"B(\d+)"|\b(do|else|finally|return|throw|try|break|continue)\b|("[ADEH](\d+)")|\b(case)\s+([^:]+):|\b([A-Za-z_$][\w$]*\s*:)|(;)/g),e=[];a=a.replace(/\b(catch\s*"B\d+"\s*"A\d+")(\s*catch\s*"B\d+"\s*"A\d+")+/g,"$1");for(var h=0,m,n;null!==(m=f.exec(a));){if(m[1]!==q)n=a.lastIndexOf('"B',f.lastIndex),h=a.substring(h,
	n),"for"===m[1]?e.push(new Tb(Ea(Q[m[2]]),{prefix:h})):"catch"===m[1]?e.push(new fc(R(Q[m[2]]),{prefix:h})):e.push(new X(m[1],sa(Q[m[2]]),{prefix:h}));else if(m[3]!==q)e.push(new X(m[3],q,{prefix:a.substring(h,f.lastIndex)}));else if(m[4]!==q){n=a.substring(h,f.lastIndex-m[4].length);if(0!==g(n).length)continue;e.push(n);h=m[4].charAt(1);m=m[5];"D"===h?e.push(b(Q[m])):"E"===h?e.push(d(Q[m])):"H"===h?e.push(Y(Q[m])):e.push(pa(Q[m]))}else if(m[6]!==q)e.push(new Ub(sa(g(m[7]))));else if(m[8]!==q){n=
	a.substring(h,f.lastIndex-m[8].length);if(0!==g(n).length)continue;e.push(new Ab(a.substring(h,f.lastIndex)))}else m=c(a.substring(h,f.lastIndex-1)),e.push(m.left),e.push(hb(m.middle)),e.push(m.right+";");h=f.lastIndex}b=c(a.substring(h));e.push(b.left);""!==b.middle&&(e.push(hb(b.middle)),e.push(";"+b.right));return e};m.prototype.toString=function(){var a=d(this.statements),b=E;n(a)||(E=function(d){return a.hasOwnProperty(d.name)?d.name:b(d)});var c="{\n"+this.statements.join("")+"\n}";E=b;return c};
	pa=function(a){a=c(a.substring(1,a.length-1));return new m(Ia(a.middle))};ia.prototype.toString=function(){for(var a=[],c=[],f,g=0,h=this.statements.length;g<h;++g)f=this.statements[g],f instanceof qb||f instanceof pb?a.push(f):c.push(f);Xa(a);var m=d(this.statements);E=function(a){a=a.name;return m.hasOwnProperty(a)?a:ma.hasOwnProperty(a)||e.hasOwnProperty(a)||b.hasOwnProperty(a)?"$p."+a:a};a="// this code was autogenerated from PJS\n(function($p) {\n"+a.join("")+"\n"+c.join("")+"\n})";E=null;return a};
	a=function(){var a=y(Q[0]),a=a.replace(/\bimport\s+[^;]+;/g,"");return new ia(Ia(a,wc,Sb))}();(function(a){function b(a,c){for(var f=c.split("."),e=a.scope,g;e;){if(e.hasOwnProperty(f[0])){g=e[f[0]];break}e=e.scope}g===q&&(g=d[f[0]]);for(var e=1,h=f.length;e<h&&g;++e)g=g.inScope[f[e]];return g}var d={},c;for(c in ba)if(ba.hasOwnProperty(c)){a=ba[c];var f=a.scopeId,e=a.name;f?(f=ba[f],a.scope=f,f.inScope===q&&(f.inScope={}),f.inScope[e]=a):d[e]=a}for(c in ba)if(ba.hasOwnProperty(c)){a=ba[c];if(e=a.body.baseClassName)if(e=
	b(a,e))a.base=e,e.derived||(e.derived=[]),e.derived.push(a);var e=a.body.interfacesNames,f=[],g,h;if(e&&0<e.length){g=0;for(h=e.length;g<h;++g){var m=b(a,e[g]);f.push(m);m&&(m.derived||(m.derived=[]),m.derived.push(a))}0<f.length&&(a.interfaces=f)}}})(a);(function(a){function b(a,c){var f=d[a];if(!f)return!1;var e=f.indexOf(c);if(0>e)return!1;f.splice(e,1);if(0<f.length)return!1;delete d[a];return!0}a=[];var d={},c,f,e;for(c in ba)if(ba.hasOwnProperty(c))if(e=ba[c],e.inScope||e.derived){var g=[];
	if(e.inScope)for(f in e.inScope)e.inScope.hasOwnProperty(f)&&g.push(e.inScope[f]);e.derived&&(g=g.concat(e.derived));d[c]=g}else a.push(c),e.weight=0;for(;0<a.length;)if(c=a.shift(),e=ba[c],e.scopeId&&b(e.scopeId,e)&&(a.push(e.scopeId),ba[e.scopeId].weight=e.weight+1),e.base&&b(e.base.classId,e)&&(a.push(e.base.classId),e.base.weight=e.weight+1),e.interfaces)for(c=0,f=e.interfaces.length;c<f;++c)e.interfaces[c]&&b(e.interfaces[c].classId,e)&&(a.push(e.interfaces[c].classId),e.interfaces[c].weight=
	e.weight+1)})(a);a=a.toString();a=a.replace(/\s*\n(?:[\t ]*\n)+/g,"\n\n");a=a.replace(/__x([0-9A-F]{4})/g,function(a,b){return String.fromCharCode(parseInt(b,16))});return function(a,b){return a.replace(/'(\d+)'/g,function(a,d){var c=b[d];return"/"===c.charAt(0)?c:/^'((?:[^'\\\n])|(?:\\.[0-9A-Fa-f]*))'$/.test(c)?"(new $p.Character("+c+"))":c})}(a,W)}function a(a,b){var c=RegExp(/\/\*\s*@pjs\s+((?:[^\*]|\*+[^\*\/])*)\*\//g).exec(a);if(c&&2===c.length)for(var e=[],c=c.splice(1,2)[0].replace(/\{([\s\S]*?)\}/g,
	function(){return function(a,b){e.push(b);return"{"+(e.length-1)+"}"}}()).replace("\n","").replace("\r","").split(";"),g=function(a){return a.replace(/^\s*["']?/,"").replace(/["']?\s*$/,"")},h=0,n=c.length;h<n;h++){var k=c[h].split("=");if(k&&2===k.length){var p=g(k[0]),q=g(k[1]),k=[];if("preload"===p)for(k=q.split(","),p=0,q=k.length;p<q;p++){var y=g(k[p]);b.imageCache.add(y)}else if("font"===p)for(k=q.split(","),p=0,q=k.length;p<q;p++){var y=g(k[p]),D=/^\{(\d*?)\}$/.exec(y);PFont.preloading.add(D?
	JSON.parse("{"+e[D[1]]+"}"):y)}else"pauseOnBlur"===p?b.options.pauseOnBlur="true"===q:"globalKeyEvents"===p?b.options.globalKeyEvents="true"===q:"param-"===p.substring(0,6)?b.params[p.substring(6)]=q:b.options[p]=q}}return a}var b=g.defaultScope,e=b.PConstants,c=g.aFunctions,n=g.Browser.document,q;h.compile=function(b){var c=new h.Sketch;b=a(b,c);b=p(b);c.sourceCode=b;return c};var y=D("../Helpers/PjsConsole");h.logger=new y(n);return h}},{"../Helpers/PjsConsole":5}],27:[function(D,y,V){y.exports=
	function(h,g){function k(a,b){return a in n?n[a]:"function"===typeof n[b]?n[b]:function(a){if(a instanceof Array)return a;if("number"===typeof a){var b=[];b.length=a;return b}}}var p=h.defaultScope,a=h.extend,b=h.Browser,e=b.ajax,c=b.navigator,n=b.window,q=b.document,y=h.noop,f=p.PConstants;PFont=p.PFont;PShapeSVG=p.PShapeSVG;PVector=p.PVector;Char=Character=p.Char;ObjectIterator=p.ObjectIterator;XMLElement=p.XMLElement;XML=p.XML;var D=n.HTMLCanvasElement,V=n.HTMLImageElement,I;try{I=n.localStorage}catch(F){I=
	{}}q.head||(q.head=q.getElementsByTagName("head")[0]);var O=k("Float32Array","WebGLFloatArray"),u=k("Int32Array","WebGLIntArray"),la=k("Uint16Array","WebGLUnsignedShortArray"),z=k("Uint8Array","WebGLUnsignedByteArray");if(9<=q.documentMode&&!q.doctype)throw"The doctype directive is missing. The recommended doctype in Internet Explorer is the HTML5 doctype: <!DOCTYPE html>";var xb=[],cc={},R=this.Processing=function(b,h,k){function F(a,b,A){a.addEventListener?a.addEventListener(b,A,!1):a.attachEvent("on"+
	b,A);Ab.push({elem:a,type:b,fn:A})}function Y(a,b,A,ea){var d=Ka.locations[a];d===g&&(d=m.getUniformLocation(b,A),Ka.locations[a]=d);null!==d&&(4===ea.length?m.uniform4fv(d,ea):3===ea.length?m.uniform3fv(d,ea):2===ea.length?m.uniform2fv(d,ea):m.uniform1f(d,ea))}function ca(a,b,A,d){var c=Ka.locations[a];c===g&&(c=m.getUniformLocation(b,A),Ka.locations[a]=c);null!==c&&(4===d.length?m.uniform4iv(c,d):3===d.length?m.uniform3iv(c,d):2===d.length?m.uniform2iv(c,d):m.uniform1i(c,d))}function Z(a,b,A,d,
	c){var f=Ka.locations[a];f===g&&(f=m.getUniformLocation(b,A),Ka.locations[a]=f);-1!==f&&(16===c.length?m.uniformMatrix4fv(f,d,c):9===c.length?m.uniformMatrix3fv(f,d,c):m.uniformMatrix2fv(f,d,c))}function fa(a,b,A,d,c){var f=Ka.attributes[a];f===g&&(f=m.getAttribLocation(b,A),Ka.attributes[a]=f);-1!==f&&(m.bindBuffer(m.ARRAY_BUFFER,c),m.vertexAttribPointer(f,d,m.FLOAT,!1,0,0),m.enableVertexAttribArray(f))}function xa(a,b,A){var d=Ka.attributes[a];d===g&&(d=m.getAttribLocation(b,A),Ka.attributes[a]=
	d);-1!==d&&m.disableVertexAttribArray(d)}function ya(a,b,A,ea){Za===f.HSB?(A=d.color.toRGB(a,b,A),a=A[0],b=A[1],A=A[2]):(a=Math.round(255*(a/Ca)),b=Math.round(255*(b/Ja)),A=Math.round(255*(A/Da)));ea=Math.round(255*(ea/na));a=0>a?0:a;b=0>b?0:b;A=0>A?0:A;ea=0>ea?0:ea;return(255<ea?255:ea)<<24&f.ALPHA_MASK|(255<a?255:a)<<16&f.RED_MASK|(255<b?255:b)<<8&f.GREEN_MASK|(255<A?255:A)&f.BLUE_MASK}function dc(a){if(a<=Ca&&0<=a){if(Za===f.RGB)return ya(a,a,a,na);if(Za===f.HSB)return ya(0,0,a/Ca*Da,na)}if(a)return 2147483647<
	a&&(a-=4294967296),a}function fb(a){var b,A,ea;b=((a&f.RED_MASK)>>>16)/255;A=((a&f.GREEN_MASK)>>>8)/255;ea=(a&f.BLUE_MASK)/255;a=d.max(d.max(b,A),ea);var c=d.min(d.min(b,A),ea);if(c===a)return[0,0,a*Da];b=(b===a?(A-ea)/(a-c):A===a?2+(ea-b)/(a-c):4+(b-A)/(a-c))/6;0>b?b+=1:1<b&&(b-=1);return[b*Ca,(a-c)/a*Ja,a*Da]}function Wa(){m.restore();Q=eb=!0}function gb(){var a=(Date.now()-yc)/1E3;ic++;var b=ic/a;0.5<a&&(yc=Date.now(),ic=0,d.__frameRate=b);d.frameCount++}function Jb(a){a=parseInt("0x"+a,16);2147483647<
	a&&(a-=4294967296);return a}function hb(a){if("number"===typeof a)return 0!==a;if("boolean"===typeof a)return a;if("string"===typeof a)return"true"===a.toLowerCase();if(a instanceof Char)return 49===a.code||84===a.code||116===a.code}function Lb(a){if("number"===typeof a)return a;if("boolean"===typeof a)return a?1:0;if("string"===typeof a)return parseFloat(a);if(a instanceof Char)return a.code}function Mb(a,b){if("number"===typeof a)return a&4294967295;if("boolean"===typeof a)return a?1:0;if("string"===
	typeof a)return parseInt(a,b||10)&4294967295;if(a instanceof Char)return a.code}function Ba(){W&&(Q&&(m.fillStyle=d.color.toString(Pa),Q=!1),m.fill())}function Ea(){E&&(eb&&(m.strokeStyle=d.color.toString(oa),eb=!1),m.stroke())}function Xa(){Ba();Ea();m.closePath()}function Na(a,b,A){var d=Sc.shift();d===g&&(d={},d.canvas=q.createElement("canvas"),d.context=d.canvas.getContext("2d"));Sc.push(d);var c=d.canvas,f=d.context;b=b||a.width;A=A||a.height;c.width=b;c.height=A;a?"data"in a?f.putImageData(a,
	0,0):(f.clearRect(0,0,b,A),f.drawImage(a,0,0,b,A)):f.clearRect(0,0,b,A);return d}function Nb(a){return{getLength:function(a){return function(){if(a.isRemote)throw"Image is loaded remotely. Cannot get length.";return a.imageData.data.length?a.imageData.data.length/4:0}}(a),getPixel:function(a){return function(M){M*=4;var b=a.imageData.data;if(a.isRemote)throw"Image is loaded remotely. Cannot get pixels.";return b[M+3]<<24&f.ALPHA_MASK|b[M]<<16&f.RED_MASK|b[M+1]<<8&f.GREEN_MASK|b[M+2]&f.BLUE_MASK}}(a),
	setPixel:function(a){return function(M,b){var d=4*M,c=a.imageData.data;if(a.isRemote)throw"Image is loaded remotely. Cannot set pixel.";c[d+0]=(b&f.RED_MASK)>>>16;c[d+1]=(b&f.GREEN_MASK)>>>8;c[d+2]=b&f.BLUE_MASK;c[d+3]=(b&f.ALPHA_MASK)>>>24;a.__isDirty=!0}}(a),toArray:function(a){return function(){var M=[],b=a.imageData.data,d=a.width*a.height;if(a.isRemote)throw"Image is loaded remotely. Cannot get pixels.";for(var c=0,e=0;c<d;c++,e+=4)M.push(b[e+3]<<24&f.ALPHA_MASK|b[e]<<16&f.RED_MASK|b[e+1]<<8&
	f.GREEN_MASK|b[e+2]&f.BLUE_MASK);return M}}(a),set:function(a){return function(M){var b,d,c;if(this.isRemote)throw"Image is loaded remotely. Cannot set pixels.";d=a.imageData.data;for(var e=0,g=M.length;e<g;e++)c=M[e],b=4*e,d[b+0]=(c&f.RED_MASK)>>>16,d[b+1]=(c&f.GREEN_MASK)>>>8,d[b+2]=c&f.BLUE_MASK,d[b+3]=(c&f.ALPHA_MASK)>>>24;a.__isDirty=!0}}(a)}}function Ob(a,b,A,ea){var c=new La(A,ea,f.ARGB);c.fromImageData(d.toImageData(a,b,A,ea));return c}function Pb(a,b,A,d,c){if(c.isRemote)throw"Image is loaded remotely. Cannot get x,y,w,h.";
	var e=new La(A,d,f.ARGB),g=e.imageData.data,h=c.width,m=c.height;c=c.imageData.data;var n=Math.max(0,-b),k=Math.max(0,-a);d=Math.min(d,m-b);for(m=Math.min(A,h-a);n<d;++n)for(var p=4*((b+n)*h+(a+k)),q=4*(n*A+k),v=k;v<m;++v)g[q++]=c[p++],g[q++]=c[p++],g[q++]=c[p++],g[q++]=c[p++];e.__isDirty=!0;return e}function jb(){Vb&&(m=Tc,Vb=!1,d.updatePixels())}function Qb(){function a(M,b){M[b]=function(){jb();m[b].apply(m,arguments)}}function b(a,M){d.defineProperty(a,M,{get:function(){jb();return m[M]},set:function(a){jb();
	m[M]=a}})}for(var A in m)"function"===typeof m[A]?a(this,A):b(this,A)}function Ya(a){return a instanceof String?a:"number"===typeof a?a===(0|a)?a.toString():d.nf(a,0,3):null===a||a===g?"":a.toString()}function Rb(a,b,A,d){var c;0>a.indexOf("\n")?(a=[a],c=1):(a=a.split(/\r?\n/g),c=a.length);var e=0;$a===f.TOP?e=ab+Qa:$a===f.CENTER?e=ab/2-(c-1)*Fa/2:$a===f.BOTTOM&&(e=-(Qa+(c-1)*Fa));for(var g=0;g<c;++g)ma.text$line(a[g],b,A+e,d,rb),e+=Fa}function ec(a,b,A,d,c,e){if(0!==a.length&&(0!==d&&0!==c)&&!(Ra>
	c)){for(var g=-1,h=0,m=0,n=[],k=0,p=a.length;k<p;k++){var q=a[k],v=" "===q,r=ha.measureTextWidth(q);if("\n"!==q&&m+r<=d)v&&(g=k),m+=r;else{if(g+1===h)if(0<k)g=k;else return;"\n"===q?(n.push({text:a.substring(h,k),width:m}),h=k+1):(n.push({text:a.substring(h,g+1),width:m}),h=g+1);m=0;k=h-1}}h<p&&n.push({text:a.substring(h),width:m});a=1;g=ab;rb===f.CENTER?a=d/2:rb===f.RIGHT&&(a=d);d=n.length;h=Math.min(d,Math.floor(c/Fa));$a===f.TOP?g=ab+Qa:$a===f.CENTER?g=c/2-Fa*(h/2-1):$a===f.BOTTOM&&(g=Qa+Fa);for(h=
	0;h<d;h++){k=h*Fa;if(g+k>c-Qa)break;m=n[h];ma.text$line(m.text,b+a,A+g+k,e,rb)}}}function Oa(a){ma="3D"===a?new K:"2D"===a?new C:new H;for(var b in H.prototype)H.prototype.hasOwnProperty(b)&&0>b.indexOf("$")&&(d[b]=ma[b]);ma.$init()}function J(a){return function(){Oa("2D");return ma[a].apply(this,arguments)}}function pb(a){a=a.which||a.keyCode;switch(a){case 13:return 10;case 91:case 93:case 224:return 157;case 57392:return 17;case 46:return 127;case 45:return 155}return a}function qb(a){"function"===
	typeof a.preventDefault?a.preventDefault():"function"===typeof a.stopPropagation&&a.stopPropagation();return!1}function Sb(){for(var a in lb)if(lb.hasOwnProperty(a)){d.__keyPressed=!0;return}d.__keyPressed=!1}function zb(a,b){lb[a]=b;sb=null;d.key=b;d.keyCode=a;d.keyPressed();d.keyCode=0;d.keyTyped();Sb()}function wc(a){var b=pb(a);if(b===f.DELETE)zb(b,new Char(127));else if(0>wd.indexOf(b))sb=b;else{var A=new Char(f.CODED);d.key=A;d.keyCode=b;lb[b]=A;d.keyPressed();sb=null;Sb();return qb(a)}}function Tb(a){if(null!==
	sb){var b=sb,A;A=a.which||a.keyCode;var d=a.shiftKey||a.ctrlKey||a.altKey||a.metaKey;switch(A){case 13:A=d?13:10;break;case 8:A=d?127:8}A=new Char(A);zb(b,A);return qb(a)}}function fc(a){a=pb(a);var b=lb[a];b!==g&&(d.key=b,d.keyCode=a,d.keyReleased(),delete lb[a],Sb())}if(!(this instanceof R))throw"called Processing constructor as if it were a function: missing 'new'.";var X={},Ub=b===g&&h===g,X=Ub?q.createElement("canvas"):"string"===typeof b?q.getElementById(b):b;if(!("getContext"in X))throw"called Processing constructor without passing canvas element reference or id.";
	var Ab=[],d=this;d.Char=d.Character=Char;a.withCommonFunctions(d);a.withMath(d);a.withProxyFunctions(d,function(a){return Array.prototype.slice.call(a,1)});a.withTouch(d,X,F,q,f);k&&Object.keys(k).forEach(function(a){d[a]=k[a]});d.externals={canvas:X,context:g,sketch:g,window:n};d.name="Processing.js Instance";d.use3DContext=!1;d.focused=!1;d.breakShape=!1;d.glyphTable={};d.pmouseX=0;d.pmouseY=0;d.mouseX=0;d.mouseY=0;d.mouseButton=0;d.mouseScroll=0;d.mouseClicked=g;d.mouseDragged=g;d.mouseMoved=g;
	d.mousePressed=g;d.mouseReleased=g;d.mouseScrolled=g;d.mouseOver=g;d.mouseOut=g;d.touchStart=g;d.touchEnd=g;d.touchMove=g;d.touchCancel=g;d.key=g;d.keyCode=g;d.keyPressed=y;d.keyReleased=y;d.keyTyped=y;d.draw=g;d.setup=g;d.__mousePressed=!1;d.__keyPressed=!1;d.__frameRate=60;d.frameCount=0;d.width=100;d.height=100;var m,ia,ma,W=!0,qa=[1,1,1,1],Pa=4294967295,Q=!0,E=!0,ba=[0,0,0,1],oa=4278190080,eb=!0,ja=1,ib=!1,pa=!1,Ia=!0,sa=0,wa=f.CORNER,ra=f.CENTER,Kb=0,Ib=0,yb=0,nb=f.NORMAL_MODE_AUTO,sc=60,Pc=
	1E3/sc,ud=X.style.cursor,ga=f.POLYGON,tc=0,uc=20,Qc=!1,ob=-3355444,vc=20,na=255,Ca=255,Ja=255,Da=255,gc=0,hc=0,Za=f.RGB,kb=null,xc=null,Uc=Date.now(),yc=Uc,ic=0,Ga,Wb,jc,Bb,Cb,zc,Ac,Ka={attributes:{},locations:{}},B,N,ta,Bc,Cc,Dc,kc,Ec,Xb,Fc,Vc,Gc,Wc,lc,Xc,Yc,Zc,$c=0,ad=0,bd=f.IMAGE,za=!1,Hc,Ic,Jc,rb=f.LEFT,$a=f.BASELINE,mc=f.MODEL,Db="Arial",Ra=12,ab=9,Qa=2,Fa=14,ha=PFont.get(Db,Ra),Tc,Kc=null,Vb=!1,cd,dd=1E3,lb=[],sb=null,wd=[f.SHIFT,f.CONTROL,f.ALT,f.CAPSLK,f.PGUP,f.PGDN,f.END,f.HOME,f.LEFT,f.UP,
	f.RIGHT,f.DOWN,f.NUMLK,f.INSERT,f.F1,f.F2,f.F3,f.F4,f.F5,f.F6,f.F7,f.F8,f.F9,f.F10,f.F11,f.F12,f.META],S=0,nc=0,tb=0,Sa=[],Ta=[],Ua=[],Yb=new O(f.SINCOS_LENGTH),Zb=new O(f.SINCOS_LENGTH),U,ub,Va,P,ka,Eb,Fb,$b,Ma,oc=!1,pc=60*(Math.PI/180),Lc=d.width/2,vb=d.height/2,wb=vb/Math.tan(pc/2),ed=wb/10,fd=10*wb,gd=d.width/d.height,r=[],Aa=[],ua=0,Gb=!1,Hb=!1,mb=!0,ac=f.CORNER,hd=[],id=new O([0.5,0.5,-0.5,0.5,-0.5,-0.5,-0.5,-0.5,-0.5,-0.5,-0.5,-0.5,-0.5,0.5,-0.5,0.5,0.5,-0.5,0.5,0.5,0.5,-0.5,0.5,0.5,-0.5,-0.5,
	0.5,-0.5,-0.5,0.5,0.5,-0.5,0.5,0.5,0.5,0.5,0.5,0.5,-0.5,0.5,0.5,0.5,0.5,-0.5,0.5,0.5,-0.5,0.5,0.5,-0.5,-0.5,0.5,0.5,-0.5,0.5,-0.5,-0.5,0.5,-0.5,0.5,-0.5,-0.5,0.5,-0.5,-0.5,0.5,-0.5,-0.5,-0.5,0.5,-0.5,-0.5,-0.5,-0.5,-0.5,-0.5,-0.5,0.5,-0.5,0.5,0.5,-0.5,0.5,0.5,-0.5,0.5,-0.5,-0.5,-0.5,-0.5,0.5,0.5,0.5,0.5,0.5,-0.5,-0.5,0.5,-0.5,-0.5,0.5,-0.5,-0.5,0.5,0.5,0.5,0.5,0.5]),jd=new O([0.5,0.5,0.5,0.5,-0.5,0.5,0.5,0.5,-0.5,0.5,-0.5,-0.5,-0.5,0.5,-0.5,-0.5,-0.5,-0.5,-0.5,0.5,0.5,-0.5,-0.5,0.5,0.5,0.5,0.5,0.5,
	0.5,-0.5,0.5,0.5,-0.5,-0.5,0.5,-0.5,-0.5,0.5,-0.5,-0.5,0.5,0.5,-0.5,0.5,0.5,0.5,0.5,0.5,0.5,-0.5,0.5,0.5,-0.5,-0.5,0.5,-0.5,-0.5,-0.5,-0.5,-0.5,-0.5,-0.5,-0.5,-0.5,-0.5,0.5,-0.5,-0.5,0.5,0.5,-0.5,0.5]),xd=new O([0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0]),Mc=new O([0,0,0,0,1,0,1,1,0,1,0,0]),yd=new O([0,0,1,0,
	0,1,0,0,1,0,0,1]),zd="varying vec4 vFrontColor;attribute vec3 aVertex;attribute vec3 aNormal;attribute vec4 aColor;attribute vec2 aTexture;varying   vec2 vTexture;uniform vec4 uColor;uniform bool uUsingMat;uniform vec3 uSpecular;uniform vec3 uMaterialEmissive;uniform vec3 uMaterialAmbient;uniform vec3 uMaterialSpecular;uniform float uShininess;uniform mat4 uModel;uniform mat4 uView;uniform mat4 uProjection;uniform mat4 uNormalTransform;uniform int uLightCount;uniform vec3 uFalloff;struct Light {  int type;  vec3 color;  vec3 position;  vec3 direction;  float angle;  vec3 halfVector;  float concentration;};uniform Light uLights0;uniform Light uLights1;uniform Light uLights2;uniform Light uLights3;uniform Light uLights4;uniform Light uLights5;uniform Light uLights6;uniform Light uLights7;Light getLight(int index){  if(index == 0) return uLights0;  if(index == 1) return uLights1;  if(index == 2) return uLights2;  if(index == 3) return uLights3;  if(index == 4) return uLights4;  if(index == 5) return uLights5;  if(index == 6) return uLights6;  return uLights7;}void AmbientLight( inout vec3 totalAmbient, in vec3 ecPos, in Light light ) {  float d = length( light.position - ecPos );  float attenuation = 1.0 / ( uFalloff[0] + ( uFalloff[1] * d ) + ( uFalloff[2] * d * d ));  totalAmbient += light.color * attenuation;}void DirectionalLight( inout vec3 col, inout vec3 spec, in vec3 vertNormal, in vec3 ecPos, in Light light ) {  float powerFactor = 0.0;  float nDotVP = max(0.0, dot( vertNormal, normalize(-light.position) ));  float nDotVH = max(0.0, dot( vertNormal, normalize(-light.position-normalize(ecPos) )));  if( nDotVP != 0.0 ){    powerFactor = pow( nDotVH, uShininess );  }  col += light.color * nDotVP;  spec += uSpecular * powerFactor;}void PointLight( inout vec3 col, inout vec3 spec, in vec3 vertNormal, in vec3 ecPos, in Light light ) {  float powerFactor;   vec3 VP = light.position - ecPos;  float d = length( VP );   VP = normalize( VP );  float attenuation = 1.0 / ( uFalloff[0] + ( uFalloff[1] * d ) + ( uFalloff[2] * d * d ));  float nDotVP = max( 0.0, dot( vertNormal, VP ));  vec3 halfVector = normalize( VP - normalize(ecPos) );  float nDotHV = max( 0.0, dot( vertNormal, halfVector ));  if( nDotVP == 0.0 ) {    powerFactor = 0.0;  }  else {    powerFactor = pow( nDotHV, uShininess );  }  spec += uSpecular * powerFactor * attenuation;  col += light.color * nDotVP * attenuation;}void SpotLight( inout vec3 col, inout vec3 spec, in vec3 vertNormal, in vec3 ecPos, in Light light ) {  float spotAttenuation;  float powerFactor = 0.0;  vec3 VP = light.position - ecPos;  vec3 ldir = normalize( -light.direction );  float d = length( VP );  VP = normalize( VP );  float attenuation = 1.0 / ( uFalloff[0] + ( uFalloff[1] * d ) + ( uFalloff[2] * d * d ) );  float spotDot = dot( VP, ldir );"+
	(/Windows/.test(c.userAgent)?"  spotAttenuation = 1.0; ":"  if( spotDot > cos( light.angle ) ) {    spotAttenuation = pow( spotDot, light.concentration );  }  else{    spotAttenuation = 0.0;  }  attenuation *= spotAttenuation;")+"  float nDotVP = max( 0.0, dot( vertNormal, VP ) );  vec3 halfVector = normalize( VP - normalize(ecPos) );  float nDotHV = max( 0.0, dot( vertNormal, halfVector ) );  if( nDotVP != 0.0 ) {    powerFactor = pow( nDotHV, uShininess );  }  spec += uSpecular * powerFactor * attenuation;  col += light.color * nDotVP * attenuation;}void main(void) {  vec3 finalAmbient = vec3( 0.0 );  vec3 finalDiffuse = vec3( 0.0 );  vec3 finalSpecular = vec3( 0.0 );  vec4 col = uColor;  if ( uColor[0] == -1.0 ){    col = aColor;  }  vec3 norm = normalize(vec3( uNormalTransform * vec4( aNormal, 0.0 ) ));  vec4 ecPos4 = uView * uModel * vec4(aVertex, 1.0);  vec3 ecPos = (vec3(ecPos4))/ecPos4.w;  if( uLightCount == 0 ) {    vFrontColor = col + vec4(uMaterialSpecular, 1.0);  }  else {    for( int i = 0; i < 8; i++ ) {      Light l = getLight(i);      if( i >= uLightCount ){        break;      }      if( l.type == 0 ) {        AmbientLight( finalAmbient, ecPos, l );      }      else if( l.type == 1 ) {        DirectionalLight( finalDiffuse, finalSpecular, norm, ecPos, l );      }      else if( l.type == 2 ) {        PointLight( finalDiffuse, finalSpecular, norm, ecPos, l );      }      else {        SpotLight( finalDiffuse, finalSpecular, norm, ecPos, l );      }    }   if( uUsingMat == false ) {     vFrontColor = vec4(       vec3( col ) * finalAmbient +       vec3( col ) * finalDiffuse +       vec3( col ) * finalSpecular,       col[3] );   }   else{     vFrontColor = vec4(        uMaterialEmissive +        (vec3(col) * uMaterialAmbient * finalAmbient ) +        (vec3(col) * finalDiffuse) +        (uMaterialSpecular * finalSpecular),        col[3] );    }  }  vTexture.xy = aTexture.xy;  gl_Position = uProjection * uView * uModel * vec4( aVertex, 1.0 );}",
	Nc=function(a,b,A){var d=a.createShader(a.VERTEX_SHADER);a.shaderSource(d,b);a.compileShader(d);if(!a.getShaderParameter(d,a.COMPILE_STATUS))throw a.getShaderInfoLog(d);b=a.createShader(a.FRAGMENT_SHADER);a.shaderSource(b,A);a.compileShader(b);if(!a.getShaderParameter(b,a.COMPILE_STATUS))throw a.getShaderInfoLog(b);A=a.createProgram();a.attachShader(A,d);a.attachShader(A,b);a.linkProgram(A);if(!a.getProgramParameter(A,a.LINK_STATUS))throw"Error linking shaders.";return A},kd=function(a,b,A,d,c){return{x:a,
	y:b,w:A,h:d}},qc=kd,Ad=function(a,b,A,d,c){return{x:a,y:b,w:c?A:A-a,h:c?d:d-b}},Bd=function(a,b,A,d,c){return{x:a-A/2,y:b-d/2,w:A,h:d}},aa=function(){},C=function(){},K=function(){},H=function(){};C.prototype=new aa;C.prototype.constructor=C;K.prototype=new aa;K.prototype.constructor=K;H.prototype=new aa;H.prototype.constructor=H;aa.prototype.a3DOnlyFunction=y;d.shape=function(a,b,A,c,e){1<=arguments.length&&null!==arguments[0]&&a.isVisible()&&(d.pushMatrix(),ac===f.CENTER?5===arguments.length?(d.translate(b-
	c/2,A-e/2),d.scale(c/a.getWidth(),e/a.getHeight())):3===arguments.length?d.translate(b-a.getWidth()/2,-a.getHeight()/2):d.translate(-a.getWidth()/2,-a.getHeight()/2):ac===f.CORNER?5===arguments.length?(d.translate(b,A),d.scale(c/a.getWidth(),e/a.getHeight())):3===arguments.length&&d.translate(b,A):ac===f.CORNERS&&(5===arguments.length?(c-=b,e-=A,d.translate(b,A),d.scale(c/a.getWidth(),e/a.getHeight())):3===arguments.length&&d.translate(b,A)),a.draw(d),(1===arguments.length&&ac===f.CENTER||1<arguments.length)&&
	d.popMatrix())};d.shapeMode=function(a){ac=a};d.loadShape=function(a){return 1===arguments.length&&-1<a.indexOf(".svg")?new PShapeSVG(null,a):null};d.loadXML=function(a){return new XML(d,a)};d.parseXML=function(a){var b=new XML;b.parse(a);return b};var ld=function(a){for(var b=0,A=0;A<a.length;A++)b=0!==A?Math.max(b,Math.abs(a[A])):Math.abs(a[A]);a=(b+"").indexOf(".");0===a?a=1:-1===a&&(a=(b+"").length);return a},bb=d.PMatrix2D=function(){0===arguments.length?this.reset():1===arguments.length&&arguments[0]instanceof
	bb?this.set(arguments[0].array()):6===arguments.length&&this.set(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4],arguments[5])};bb.prototype={set:function(){if(6===arguments.length){var a=arguments;this.set([a[0],a[1],a[2],a[3],a[4],a[5]])}else 1===arguments.length&&arguments[0]instanceof bb?this.elements=arguments[0].array():1===arguments.length&&arguments[0]instanceof Array&&(this.elements=arguments[0].slice())},get:function(){var a=new bb;a.set(this.elements);return a},reset:function(){this.set([1,
	0,0,0,1,0])},array:function(){return this.elements.slice()},translate:function(a,b){this.elements[2]=a*this.elements[0]+b*this.elements[1]+this.elements[2];this.elements[5]=a*this.elements[3]+b*this.elements[4]+this.elements[5]},invTranslate:function(a,b){this.translate(-a,-b)},transpose:function(){},mult:function(a,b){var A,d;a instanceof PVector?(A=a.x,d=a.y,b||(b=new PVector)):a instanceof Array&&(A=a[0],d=a[1],b||(b=[]));b instanceof Array?(b[0]=this.elements[0]*A+this.elements[1]*d+this.elements[2],
	b[1]=this.elements[3]*A+this.elements[4]*d+this.elements[5]):b instanceof PVector&&(b.x=this.elements[0]*A+this.elements[1]*d+this.elements[2],b.y=this.elements[3]*A+this.elements[4]*d+this.elements[5],b.z=0);return b},multX:function(a,b){return a*this.elements[0]+b*this.elements[1]+this.elements[2]},multY:function(a,b){return a*this.elements[3]+b*this.elements[4]+this.elements[5]},skewX:function(a){this.apply(1,0,1,a,0,0)},skewY:function(a){this.apply(1,0,1,0,a,0)},shearX:function(a){this.apply(1,
	0,1,Math.tan(a),0,0)},shearY:function(a){this.apply(1,0,1,0,Math.tan(a),0)},determinant:function(){return this.elements[0]*this.elements[4]-this.elements[1]*this.elements[3]},invert:function(){var a=this.determinant();if(Math.abs(a)>f.MIN_INT){var b=this.elements[0],d=this.elements[1],c=this.elements[2],e=this.elements[3],g=this.elements[4],h=this.elements[5];this.elements[0]=g/a;this.elements[3]=-e/a;this.elements[1]=-d/a;this.elements[4]=b/a;this.elements[2]=(d*h-g*c)/a;this.elements[5]=(e*c-b*
	h)/a;return!0}return!1},scale:function(a,b){a&&!b&&(b=a);a&&b&&(this.elements[0]*=a,this.elements[1]*=b,this.elements[3]*=a,this.elements[4]*=b)},invScale:function(a,b){a&&!b&&(b=a);this.scale(1/a,1/b)},apply:function(){var a;1===arguments.length&&arguments[0]instanceof bb?a=arguments[0].array():6===arguments.length?a=Array.prototype.slice.call(arguments):1===arguments.length&&arguments[0]instanceof Array&&(a=arguments[0]);for(var b=[0,0,this.elements[2],0,0,this.elements[5]],d=0,c=0;2>c;c++)for(var f=
	0;3>f;f++,d++)b[d]+=this.elements[3*c+0]*a[f+0]+this.elements[3*c+1]*a[f+3];this.elements=b.slice()},preApply:function(){var a;1===arguments.length&&arguments[0]instanceof bb?a=arguments[0].array():6===arguments.length?a=Array.prototype.slice.call(arguments):1===arguments.length&&arguments[0]instanceof Array&&(a=arguments[0]);var b=[0,0,a[2],0,0,a[5]];b[2]=a[2]+this.elements[2]*a[0]+this.elements[5]*a[1];b[5]=a[5]+this.elements[2]*a[3]+this.elements[5]*a[4];b[0]=this.elements[0]*a[0]+this.elements[3]*
	a[1];b[3]=this.elements[0]*a[3]+this.elements[3]*a[4];b[1]=this.elements[1]*a[0]+this.elements[4]*a[1];b[4]=this.elements[1]*a[3]+this.elements[4]*a[4];this.elements=b.slice()},rotate:function(a){var b=Math.cos(a);a=Math.sin(a);var d=this.elements[0],c=this.elements[1];this.elements[0]=b*d+a*c;this.elements[1]=-a*d+b*c;d=this.elements[3];c=this.elements[4];this.elements[3]=b*d+a*c;this.elements[4]=-a*d+b*c},rotateZ:function(a){this.rotate(a)},invRotateZ:function(a){this.rotateZ(a-Math.PI)},print:function(){var a=
	ld(this.elements),a=""+d.nfs(this.elements[0],a,4)+" "+d.nfs(this.elements[1],a,4)+" "+d.nfs(this.elements[2],a,4)+"\n"+d.nfs(this.elements[3],a,4)+" "+d.nfs(this.elements[4],a,4)+" "+d.nfs(this.elements[5],a,4)+"\n\n";d.println(a)}};var G=d.PMatrix3D=function(){this.reset()};G.prototype={set:function(){16===arguments.length?this.elements=Array.prototype.slice.call(arguments):1===arguments.length&&arguments[0]instanceof G?this.elements=arguments[0].array():1===arguments.length&&arguments[0]instanceof
	Array&&(this.elements=arguments[0].slice())},get:function(){var a=new G;a.set(this.elements);return a},reset:function(){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]},array:function(){return this.elements.slice()},translate:function(a,b,d){d===g&&(d=0);this.elements[3]+=a*this.elements[0]+b*this.elements[1]+d*this.elements[2];this.elements[7]+=a*this.elements[4]+b*this.elements[5]+d*this.elements[6];this.elements[11]+=a*this.elements[8]+b*this.elements[9]+d*this.elements[10];this.elements[15]+=
	a*this.elements[12]+b*this.elements[13]+d*this.elements[14]},transpose:function(){var a=this.elements[4];this.elements[4]=this.elements[1];this.elements[1]=a;a=this.elements[8];this.elements[8]=this.elements[2];this.elements[2]=a;a=this.elements[6];this.elements[6]=this.elements[9];this.elements[9]=a;a=this.elements[3];this.elements[3]=this.elements[12];this.elements[12]=a;a=this.elements[7];this.elements[7]=this.elements[13];this.elements[13]=a;a=this.elements[11];this.elements[11]=this.elements[14];
	this.elements[14]=a},mult:function(a,b){var d,c,f,e;a instanceof PVector?(d=a.x,c=a.y,f=a.z,e=1,b||(b=new PVector)):a instanceof Array&&(d=a[0],c=a[1],f=a[2],e=a[3]||1,!b||3!==b.length&&4!==b.length)&&(b=[0,0,0]);b instanceof Array&&(3===b.length?(b[0]=this.elements[0]*d+this.elements[1]*c+this.elements[2]*f+this.elements[3],b[1]=this.elements[4]*d+this.elements[5]*c+this.elements[6]*f+this.elements[7],b[2]=this.elements[8]*d+this.elements[9]*c+this.elements[10]*f+this.elements[11]):4===b.length&&
	(b[0]=this.elements[0]*d+this.elements[1]*c+this.elements[2]*f+this.elements[3]*e,b[1]=this.elements[4]*d+this.elements[5]*c+this.elements[6]*f+this.elements[7]*e,b[2]=this.elements[8]*d+this.elements[9]*c+this.elements[10]*f+this.elements[11]*e,b[3]=this.elements[12]*d+this.elements[13]*c+this.elements[14]*f+this.elements[15]*e));b instanceof PVector&&(b.x=this.elements[0]*d+this.elements[1]*c+this.elements[2]*f+this.elements[3],b.y=this.elements[4]*d+this.elements[5]*c+this.elements[6]*f+this.elements[7],
	b.z=this.elements[8]*d+this.elements[9]*c+this.elements[10]*f+this.elements[11]);return b},preApply:function(){var a;1===arguments.length&&arguments[0]instanceof G?a=arguments[0].array():16===arguments.length?a=Array.prototype.slice.call(arguments):1===arguments.length&&arguments[0]instanceof Array&&(a=arguments[0]);for(var b=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],d=0,c=0;4>c;c++)for(var f=0;4>f;f++,d++)b[d]+=this.elements[f+0]*a[4*c+0]+this.elements[f+4]*a[4*c+1]+this.elements[f+8]*a[4*c+2]+this.elements[f+
	12]*a[4*c+3];this.elements=b.slice()},apply:function(){var a;1===arguments.length&&arguments[0]instanceof G?a=arguments[0].array():16===arguments.length?a=Array.prototype.slice.call(arguments):1===arguments.length&&arguments[0]instanceof Array&&(a=arguments[0]);for(var b=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],d=0,c=0;4>c;c++)for(var f=0;4>f;f++,d++)b[d]+=this.elements[4*c+0]*a[f+0]+this.elements[4*c+1]*a[f+4]+this.elements[4*c+2]*a[f+8]+this.elements[4*c+3]*a[f+12];this.elements=b.slice()},rotate:function(a,
	b,A,c){if(4>arguments.length)this.rotateZ(a);else{var f=new PVector(b,A,c),e=f.mag();if(0!==e){1!=e&&(f.normalize(),b=f.x,A=f.y,c=f.z);var f=d.cos(a),e=d.sin(a),g=1-f;this.apply(g*b*b+f,g*b*A-e*c,g*b*c+e*A,0,g*b*A+e*c,g*A*A+f,g*A*c-e*b,0,g*b*c-e*A,g*A*c+e*b,g*c*c+f,0,0,0,0,1)}}},invApply:function(){$b===g&&($b=new G);var a=arguments;$b.set(a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9],a[10],a[11],a[12],a[13],a[14],a[15]);if(!$b.invert())return!1;this.preApply($b);return!0},rotateX:function(a){var b=
	d.cos(a);a=d.sin(a);this.apply([1,0,0,0,0,b,-a,0,0,a,b,0,0,0,0,1])},rotateY:function(a){var b=d.cos(a);a=d.sin(a);this.apply([b,0,a,0,0,1,0,0,-a,0,b,0,0,0,0,1])},rotateZ:function(a){var b=Math.cos(a);a=Math.sin(a);this.apply([b,-a,0,0,a,b,0,0,0,0,1,0,0,0,0,1])},scale:function(a,b,d){!a||b||d?a&&(b&&!d)&&(d=1):b=d=a;a&&(b&&d)&&(this.elements[0]*=a,this.elements[1]*=b,this.elements[2]*=d,this.elements[4]*=a,this.elements[5]*=b,this.elements[6]*=d,this.elements[8]*=a,this.elements[9]*=b,this.elements[10]*=
	d,this.elements[12]*=a,this.elements[13]*=b,this.elements[14]*=d)},skewX:function(a){a=Math.tan(a);this.apply(1,a,0,0,0,1,0,0,0,0,1,0,0,0,0,1)},skewY:function(a){a=Math.tan(a);this.apply(1,0,0,0,a,1,0,0,0,0,1,0,0,0,0,1)},shearX:function(a){a=Math.tan(a);this.apply(1,a,0,0,0,1,0,0,0,0,1,0,0,0,0,1)},shearY:function(a){a=Math.tan(a);this.apply(1,0,0,0,a,1,0,0,0,0,1,0,0,0,0,1)},multX:function(a,b,d,c){return d?c?this.elements[0]*a+this.elements[1]*b+this.elements[2]*d+this.elements[3]*c:this.elements[0]*
	a+this.elements[1]*b+this.elements[2]*d+this.elements[3]:this.elements[0]*a+this.elements[1]*b+this.elements[3]},multY:function(a,b,d,c){return d?c?this.elements[4]*a+this.elements[5]*b+this.elements[6]*d+this.elements[7]*c:this.elements[4]*a+this.elements[5]*b+this.elements[6]*d+this.elements[7]:this.elements[4]*a+this.elements[5]*b+this.elements[7]},multZ:function(a,b,d,c){return c?this.elements[8]*a+this.elements[9]*b+this.elements[10]*d+this.elements[11]*c:this.elements[8]*a+this.elements[9]*
	b+this.elements[10]*d+this.elements[11]},multW:function(a,b,d,c){return c?this.elements[12]*a+this.elements[13]*b+this.elements[14]*d+this.elements[15]*c:this.elements[12]*a+this.elements[13]*b+this.elements[14]*d+this.elements[15]},invert:function(){var a=this.elements[0]*this.elements[5]-this.elements[1]*this.elements[4],b=this.elements[0]*this.elements[6]-this.elements[2]*this.elements[4],d=this.elements[0]*this.elements[7]-this.elements[3]*this.elements[4],c=this.elements[1]*this.elements[6]-
	this.elements[2]*this.elements[5],f=this.elements[1]*this.elements[7]-this.elements[3]*this.elements[5],e=this.elements[2]*this.elements[7]-this.elements[3]*this.elements[6],g=this.elements[8]*this.elements[13]-this.elements[9]*this.elements[12],h=this.elements[8]*this.elements[14]-this.elements[10]*this.elements[12],m=this.elements[8]*this.elements[15]-this.elements[11]*this.elements[12],n=this.elements[9]*this.elements[14]-this.elements[10]*this.elements[13],k=this.elements[9]*this.elements[15]-
	this.elements[11]*this.elements[13],p=this.elements[10]*this.elements[15]-this.elements[11]*this.elements[14],q=a*p-b*k+d*n+c*m-f*h+e*g;if(1E-9>=Math.abs(q))return!1;var v=[];v[0]=+this.elements[5]*p-this.elements[6]*k+this.elements[7]*n;v[4]=-this.elements[4]*p+this.elements[6]*m-this.elements[7]*h;v[8]=+this.elements[4]*k-this.elements[5]*m+this.elements[7]*g;v[12]=-this.elements[4]*n+this.elements[5]*h-this.elements[6]*g;v[1]=-this.elements[1]*p+this.elements[2]*k-this.elements[3]*n;v[5]=+this.elements[0]*
	p-this.elements[2]*m+this.elements[3]*h;v[9]=-this.elements[0]*k+this.elements[1]*m-this.elements[3]*g;v[13]=+this.elements[0]*n-this.elements[1]*h+this.elements[2]*g;v[2]=+this.elements[13]*e-this.elements[14]*f+this.elements[15]*c;v[6]=-this.elements[12]*e+this.elements[14]*d-this.elements[15]*b;v[10]=+this.elements[12]*f-this.elements[13]*d+this.elements[15]*a;v[14]=-this.elements[12]*c+this.elements[13]*b-this.elements[14]*a;v[3]=-this.elements[9]*e+this.elements[10]*f-this.elements[11]*c;v[7]=
	+this.elements[8]*e-this.elements[10]*d+this.elements[11]*b;v[11]=-this.elements[8]*f+this.elements[9]*d-this.elements[11]*a;v[15]=+this.elements[8]*c-this.elements[9]*b+this.elements[10]*a;a=1/q;v[0]*=a;v[1]*=a;v[2]*=a;v[3]*=a;v[4]*=a;v[5]*=a;v[6]*=a;v[7]*=a;v[8]*=a;v[9]*=a;v[10]*=a;v[11]*=a;v[12]*=a;v[13]*=a;v[14]*=a;v[15]*=a;this.elements=v.slice();return!0},toString:function(){for(var a="",b=0;15>b;b++)a+=this.elements[b]+", ";return a+=this.elements[15]},print:function(){var a=ld(this.elements),
	a=""+d.nfs(this.elements[0],a,4)+" "+d.nfs(this.elements[1],a,4)+" "+d.nfs(this.elements[2],a,4)+" "+d.nfs(this.elements[3],a,4)+"\n"+d.nfs(this.elements[4],a,4)+" "+d.nfs(this.elements[5],a,4)+" "+d.nfs(this.elements[6],a,4)+" "+d.nfs(this.elements[7],a,4)+"\n"+d.nfs(this.elements[8],a,4)+" "+d.nfs(this.elements[9],a,4)+" "+d.nfs(this.elements[10],a,4)+" "+d.nfs(this.elements[11],a,4)+"\n"+d.nfs(this.elements[12],a,4)+" "+d.nfs(this.elements[13],a,4)+" "+d.nfs(this.elements[14],a,4)+" "+d.nfs(this.elements[15],
	a,4)+"\n\n";d.println(a)},invTranslate:function(a,b,d){this.preApply(1,0,0,-a,0,1,0,-b,0,0,1,-d,0,0,0,1)},invRotateX:function(a){var b=Math.cos(-a);a=Math.sin(-a);this.preApply([1,0,0,0,0,b,-a,0,0,a,b,0,0,0,0,1])},invRotateY:function(a){var b=Math.cos(-a);a=Math.sin(-a);this.preApply([b,0,a,0,0,1,0,0,-a,0,b,0,0,0,0,1])},invRotateZ:function(a){var b=Math.cos(-a);a=Math.sin(-a);this.preApply([b,-a,0,0,a,b,0,0,0,0,1,0,0,0,0,1])},invScale:function(a,b,d){this.preApply([1/a,0,0,0,0,1/b,0,0,0,0,1/d,0,0,
	0,0,1])}};var cb=d.PMatrixStack=function(){this.matrixStack=[]};cb.prototype.load=function(){var a=ma.$newPMatrix();1===arguments.length?a.set(arguments[0]):a.set(arguments);this.matrixStack.push(a)};C.prototype.$newPMatrix=function(){return new bb};K.prototype.$newPMatrix=function(){return new G};cb.prototype.push=function(){this.matrixStack.push(this.peek())};cb.prototype.pop=function(){return this.matrixStack.pop()};cb.prototype.peek=function(){var a=ma.$newPMatrix();a.set(this.matrixStack[this.matrixStack.length-
	1]);return a};cb.prototype.mult=function(a){this.matrixStack[this.matrixStack.length-1].apply(a)};d.split=function(a,b){return a.split(b)};d.splitTokens=function(a,b){if(b===g)return a.split(/\s+/g);var d=b.split(/()/g),c="",f=a.length,e,h,m=[];for(e=0;e<f;e++)h=a[e],-1<d.indexOf(h)?(""!==c&&m.push(c),c=""):c+=h;""!==c&&m.push(c);return m};d.append=function(a,b){a[a.length]=b;return a};d.concat=function(a,b){return a.concat(b)};d.sort=function(a,b){var d=[];if(0<a.length){for(var c=0<b?b:a.length,
	f=0;f<c;f++)d.push(a[f]);"string"===typeof a[0]?d.sort():d.sort(function(a,b){return a-b});if(0<b)for(c=d.length;c<a.length;c++)d.push(a[c])}return d};d.splice=function(a,b,d){if(0===b.length)return a;if(b instanceof Array)for(var c=0;c<b.length;d++,c++)a.splice(d,0,b[c]);else a.splice(d,0,b);return a};d.subset=function(a,b,d){return a.slice(b,d!==g?b+d:a.length)};d.join=function(a,b){return a.join(b)};d.shorten=function(a){for(var b=[],d=a.length,c=0;c<d;c++)b[c]=a[c];b.pop();return b};d.expand=
	function(a,b){var d=a.slice(0);d.length=b||2*a.length;return d};d.arrayCopy=function(){var a,b=0,d,c=0,f;2===arguments.length?(a=arguments[0],d=arguments[1],f=a.length):3===arguments.length?(a=arguments[0],d=arguments[1],f=arguments[2]):5===arguments.length&&(a=arguments[0],b=arguments[1],d=arguments[2],c=arguments[3],f=arguments[4]);for(var e=b;e<f+b;e++,c++)if(d[c]!==g)d[c]=a[e];else throw"array index out of bounds exception";};d.reverse=function(a){return a.reverse()};d.mix=function(a,b,d){return a+
	((b-a)*d>>8)};d.peg=function(a){return 0>a?0:255<a?255:a};d.modes=function(){function a(b,M,d,c,Rc,A,e,f,ea,h,vd){b=g(((b&4278190080)>>>24)+M,255)<<24;d+=(ea-d)*M>>8;c+=(h-c)*M>>8;M=Rc+((vd-Rc)*M>>8);return b|(0>d?0:255<d?255:d)<<16|(0>c?0:255<c?255:c)<<8|(0>M?0:255<M?255:M)}var b=f.ALPHA_MASK,d=f.RED_MASK,c=f.GREEN_MASK,e=f.BLUE_MASK,g=Math.min,h=Math.max;return{replace:function(a,b){return b},blend:function(a,M){var f=(M&b)>>>24,h=a&d,m=a&c,w=a&e,n=M&d,k=M&c,p=M&e;return g(((a&b)>>>24)+f,255)<<
	24|h+((n-h)*f>>8)&d|m+((k-m)*f>>8)&c|w+((p-w)*f>>8)&e},add:function(a,M){var f=(M&b)>>>24;return g(((a&b)>>>24)+f,255)<<24|g((a&d)+((M&d)>>8)*f,d)&d|g((a&c)+((M&c)>>8)*f,c)&c|g((a&e)+((M&e)*f>>8),e)},subtract:function(a,M){var f=(M&b)>>>24;return g(((a&b)>>>24)+f,255)<<24|h((a&d)-((M&d)>>8)*f,c)&d|h((a&c)-((M&c)>>8)*f,e)&c|h((a&e)-((M&e)*f>>8),0)},lightest:function(a,M){var f=(M&b)>>>24;return g(((a&b)>>>24)+f,255)<<24|h(a&d,((M&d)>>8)*f)&d|h(a&c,((M&c)>>8)*f)&c|h(a&e,(M&e)*f>>8)},darkest:function(a,
	M){var f=(M&b)>>>24,h=a&d,m=a&c,w=a&e,n=g(a&d,((M&d)>>8)*f),k=g(a&c,((M&c)>>8)*f),p=g(a&e,(M&e)*f>>8);return g(((a&b)>>>24)+f,255)<<24|h+((n-h)*f>>8)&d|m+((k-m)*f>>8)&c|w+((p-w)*f>>8)&e},difference:function(f,g){var h=(f&d)>>16,m=(f&c)>>8,w=f&e,$=(g&d)>>16,n=(g&c)>>8,k=g&e;return a(f,(g&b)>>>24,h,m,w,$,n,k,h>$?h-$:$-h,m>n?m-n:n-m,w>k?w-k:k-w)},exclusion:function(f,g){var h=(f&d)>>16,m=(f&c)>>8,w=f&e,$=(g&d)>>16,n=(g&c)>>8,k=g&e;return a(f,(g&b)>>>24,h,m,w,$,n,k,h+$-(h*$>>7),m+n-(m*n>>7),w+k-(w*k>>
	7))},multiply:function(f,g){var h=(f&d)>>16,m=(f&c)>>8,w=f&e,$=(g&d)>>16,n=(g&c)>>8,k=g&e;return a(f,(g&b)>>>24,h,m,w,$,n,k,h*$>>8,m*n>>8,w*k>>8)},screen:function(f,g){var h=(f&d)>>16,m=(f&c)>>8,w=f&e,$=(g&d)>>16,n=(g&c)>>8,k=g&e;return a(f,(g&b)>>>24,h,m,w,$,n,k,255-((255-h)*(255-$)>>8),255-((255-m)*(255-n)>>8),255-((255-w)*(255-k)>>8))},hard_light:function(f,g){var h=(f&d)>>16,m=(f&c)>>8,w=f&e,$=(g&d)>>16,n=(g&c)>>8,k=g&e;return a(f,(g&b)>>>24,h,m,w,$,n,k,128>$?h*$>>7:255-((255-h)*(255-$)>>7),128>
	n?m*n>>7:255-((255-m)*(255-n)>>7),128>k?w*k>>7:255-((255-w)*(255-k)>>7))},soft_light:function(f,g){var h=(f&d)>>16,m=(f&c)>>8,w=f&e,$=(g&d)>>16,n=(g&c)>>8,k=g&e;return a(f,(g&b)>>>24,h,m,w,$,n,k,(h*$>>7)+(h*h>>8)-(h*h*$>>15),(m*n>>7)+(m*m>>8)-(m*m*n>>15),(w*k>>7)+(w*w>>8)-(w*w*k>>15))},overlay:function(f,g){var h=(f&d)>>16,m=(f&c)>>8,w=f&e,$=(g&d)>>16,n=(g&c)>>8,k=g&e;return a(f,(g&b)>>>24,h,m,w,$,n,k,128>h?h*$>>7:255-((255-h)*(255-$)>>7),128>m?m*n>>7:255-((255-m)*(255-n)>>7),128>w?w*k>>7:255-((255-
	w)*(255-k)>>7))},dodge:function(f,g){var h=(g&b)>>>24,m=(f&d)>>16,w=(f&c)>>8,$=f&e,n=(g&d)>>16,k=(g&c)>>8,p=g&e,q=255;255!==n&&(q=(m<<8)/(255-n),q=0>q?0:255<q?255:q);var r=255;255!==k&&(r=(w<<8)/(255-k),r=0>r?0:255<r?255:r);var u=255;255!==p&&(u=($<<8)/(255-p),u=0>u?0:255<u?255:u);return a(f,h,m,w,$,n,k,p,q,r,u)},burn:function(f,g){var h=(g&b)>>>24,m=(f&d)>>16,w=(f&c)>>8,$=f&e,n=(g&d)>>16,k=(g&c)>>8,p=g&e,q=0;0!==n&&(q=(255-m<<8)/n,q=255-(0>q?0:255<q?255:q));var r=0;0!==k&&(r=(255-w<<8)/k,r=255-(0>
	r?0:255<r?255:r));var u=0;0!==p&&(u=(255-$<<8)/p,u=255-(0>u?0:255<u?255:u));return a(f,h,m,w,$,n,k,p,q,r,u)}}}();d.color=function(a,b,d,c){return a!==g&&b!==g&&d!==g&&c!==g?ya(a,b,d,c):a!==g&&b!==g&&d!==g?ya(a,b,d,na):a!==g&&b!==g?(a&f.ALPHA_MASK?(b=Math.round(255*(b/na)),b=255<b?255:b,a=a-(a&f.ALPHA_MASK)+((0>b?0:b)<<24&f.ALPHA_MASK)):a=Za===f.RGB?ya(a,a,a,b):Za===f.HSB?ya(0,0,a/Ca*Da,b):void 0,a):"number"===typeof a?dc(a):ya(Ca,Ja,Da,na)};d.color.toString=function(a){return"rgba("+((a&f.RED_MASK)>>>
	16)+","+((a&f.GREEN_MASK)>>>8)+","+(a&f.BLUE_MASK)+","+((a&f.ALPHA_MASK)>>>24)/255+")"};d.color.toInt=function(a,b,d,c){return c<<24&f.ALPHA_MASK|a<<16&f.RED_MASK|b<<8&f.GREEN_MASK|d&f.BLUE_MASK};d.color.toArray=function(a){return[(a&f.RED_MASK)>>>16,(a&f.GREEN_MASK)>>>8,a&f.BLUE_MASK,(a&f.ALPHA_MASK)>>>24]};d.color.toGLArray=function(a){return[((a&f.RED_MASK)>>>16)/255,((a&f.GREEN_MASK)>>>8)/255,(a&f.BLUE_MASK)/255,((a&f.ALPHA_MASK)>>>24)/255]};d.color.toRGB=function(a,b,d){a=a>Ca?Ca:a;b=b>Ja?Ja:
	b;d=d>Da?Da:d;a=360*(a/Ca);b=100*(b/Ja);d=100*(d/Da);var c=Math.round(255*(d/100));if(0===b)return[c,c,c];a%=360;var f=a%60,e=Math.round(255*(d*(100-b)/1E4)),g=Math.round(255*(d*(6E3-b*f)/6E5));b=Math.round(255*(d*(6E3-b*(60-f))/6E5));switch(Math.floor(a/60)){case 0:return[c,b,e];case 1:return[g,c,e];case 2:return[e,c,b];case 3:return[e,g,c];case 4:return[b,e,c];case 5:return[c,e,g]}};d.brightness=function(a){return fb(a)[2]};d.saturation=function(a){return fb(a)[1]};d.hue=function(a){return fb(a)[0]};
	d.red=function(a){return((a&f.RED_MASK)>>>16)/255*Ca};d.green=function(a){return((a&f.GREEN_MASK)>>>8)/255*Ja};d.blue=function(a){return(a&f.BLUE_MASK)/255*Da};d.alpha=function(a){return((a&f.ALPHA_MASK)>>>24)/255*na};d.lerpColor=function(a,b,c){var e,g,h,m,n,s;a=d.color(a);b=d.color(b);if(Za===f.HSB)return h=fb(a),a=((a&f.ALPHA_MASK)>>>24)/na,g=fb(b),b=((b&f.ALPHA_MASK)>>>24)/na,s=d.lerp(h[0],g[0],c),e=d.lerp(h[1],g[1],c),h=d.lerp(h[2],g[2],c),h=d.color.toRGB(s,e,h),c=d.lerp(a,b,c)*na+0.5|0,c<<24&
	f.ALPHA_MASK|h[0]<<16&f.RED_MASK|h[1]<<8&f.GREEN_MASK|h[2]&f.BLUE_MASK;e=(a&f.RED_MASK)>>>16;g=(a&f.GREEN_MASK)>>>8;h=a&f.BLUE_MASK;a=((a&f.ALPHA_MASK)>>>24)/na;m=(b&f.RED_MASK)>>>16;n=(b&f.GREEN_MASK)>>>8;s=b&f.BLUE_MASK;b=((b&f.ALPHA_MASK)>>>24)/na;e=d.lerp(e,m,c)+0.5|0;g=d.lerp(g,n,c)+0.5|0;h=d.lerp(h,s,c)+0.5|0;c=d.lerp(a,b,c)*na+0.5|0;return c<<24&f.ALPHA_MASK|e<<16&f.RED_MASK|g<<8&f.GREEN_MASK|h&f.BLUE_MASK};d.colorMode=function(){Za=arguments[0];1<arguments.length&&(Ca=arguments[1],Ja=arguments[2]||
	arguments[1],Da=arguments[3]||arguments[1],na=arguments[4]||arguments[1])};d.blendColor=function(a,b,c){if(c===f.REPLACE)return d.modes.replace(a,b);if(c===f.BLEND)return d.modes.blend(a,b);if(c===f.ADD)return d.modes.add(a,b);if(c===f.SUBTRACT)return d.modes.subtract(a,b);if(c===f.LIGHTEST)return d.modes.lightest(a,b);if(c===f.DARKEST)return d.modes.darkest(a,b);if(c===f.DIFFERENCE)return d.modes.difference(a,b);if(c===f.EXCLUSION)return d.modes.exclusion(a,b);if(c===f.MULTIPLY)return d.modes.multiply(a,
	b);if(c===f.SCREEN)return d.modes.screen(a,b);if(c===f.HARD_LIGHT)return d.modes.hard_light(a,b);if(c===f.SOFT_LIGHT)return d.modes.soft_light(a,b);if(c===f.OVERLAY)return d.modes.overlay(a,b);if(c===f.DODGE)return d.modes.dodge(a,b);if(c===f.BURN)return d.modes.burn(a,b)};d.printMatrix=function(){P.print()};C.prototype.translate=function(a,b){P.translate(a,b);ka.invTranslate(a,b);m.translate(a,b)};K.prototype.translate=function(a,b,d){P.translate(a,b,d);ka.invTranslate(a,b,d)};C.prototype.scale=
	function(a,b){P.scale(a,b);ka.invScale(a,b);m.scale(a,b||a)};K.prototype.scale=function(a,b,d){P.scale(a,b,d);ka.invScale(a,b,d)};C.prototype.transform=function(a){a=a.array();m.transform(a[0],a[3],a[1],a[4],a[2],a[5])};K.prototype.transformm=function(a){throw"p.transform is currently not supported in 3D mode";};C.prototype.pushMatrix=function(){Eb.load(P);Fb.load(ka);m.save()};K.prototype.pushMatrix=function(){Eb.load(P);Fb.load(ka)};C.prototype.popMatrix=function(){P.set(Eb.pop());ka.set(Fb.pop());
	Wa()};K.prototype.popMatrix=function(){P.set(Eb.pop());ka.set(Fb.pop())};C.prototype.resetMatrix=function(){P.reset();ka.reset();m.setTransform(1,0,0,1,0,0)};K.prototype.resetMatrix=function(){P.reset();ka.reset()};aa.prototype.applyMatrix=function(){var a=arguments;P.apply(a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9],a[10],a[11],a[12],a[13],a[14],a[15]);ka.invApply(a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8],a[9],a[10],a[11],a[12],a[13],a[14],a[15])};C.prototype.applyMatrix=function(){for(var a=
	arguments,b=a.length;16>b;b++)a[b]=0;a[10]=a[15]=1;aa.prototype.applyMatrix.apply(this,a)};d.rotateX=function(a){P.rotateX(a);ka.invRotateX(a)};C.prototype.rotateZ=function(){throw"rotateZ() is not supported in 2D mode. Use rotate(float) instead.";};K.prototype.rotateZ=function(a){P.rotateZ(a);ka.invRotateZ(a)};d.rotateY=function(a){P.rotateY(a);ka.invRotateY(a)};C.prototype.rotate=function(a){P.rotateZ(a);ka.invRotateZ(a);m.rotate(a)};K.prototype.rotate=function(a){4>arguments.length?d.rotateZ(a):
	(P.rotate(a,arguments[1],arguments[2],arguments[3]),ka.rotate(-a,arguments[1],arguments[2],arguments[3]))};C.prototype.shearX=function(a){P.shearX(a);m.transform(1,0,a,1,0,0)};K.prototype.shearX=function(a){P.shearX(a)};C.prototype.shearY=function(a){P.shearY(a);m.transform(1,a,0,1,0,0)};K.prototype.shearY=function(a){P.shearY(a)};d.pushStyle=function(){m.save();d.pushMatrix();hd.push({doFill:W,currentFillColor:Pa,doStroke:E,currentStrokeColor:oa,curTint:kb,curRectMode:wa,curColorMode:Za,colorModeX:Ca,
	colorModeZ:Da,colorModeY:Ja,colorModeA:na,curTextFont:ha,horizontalTextAlignment:rb,verticalTextAlignment:$a,textMode:mc,curFontName:Db,curTextSize:Ra,curTextAscent:ab,curTextDescent:Qa,curTextLeading:Fa})};d.popStyle=function(){var a=hd.pop();if(a)Wa(),d.popMatrix(),W=a.doFill,Pa=a.currentFillColor,E=a.doStroke,oa=a.currentStrokeColor,kb=a.curTint,wa=a.curRectMode,Za=a.curColorMode,Ca=a.colorModeX,Da=a.colorModeZ,Ja=a.colorModeY,na=a.colorModeA,ha=a.curTextFont,Db=a.curFontName,Ra=a.curTextSize,
	rb=a.horizontalTextAlignment,$a=a.verticalTextAlignment,mc=a.textMode,ab=a.curTextAscent,Qa=a.curTextDescent,Fa=a.curTextLeading;else throw"Too many popStyle() without enough pushStyle()";};d.year=function(){return(new Date).getFullYear()};d.month=function(){return(new Date).getMonth()+1};d.day=function(){return(new Date).getDate()};d.hour=function(){return(new Date).getHours()};d.minute=function(){return(new Date).getMinutes()};d.second=function(){return(new Date).getSeconds()};d.millis=function(){return Date.now()-
	Uc};C.prototype.redraw=function(){gb();m.lineWidth=ja;var a=d.pmouseX,b=d.pmouseY;d.pmouseX=gc;d.pmouseY=hc;m.save();d.draw();Wa();gc=d.mouseX;hc=d.mouseY;d.pmouseX=a;d.pmouseY=b};K.prototype.redraw=function(){gb();var a=d.pmouseX,b=d.pmouseY;d.pmouseX=gc;d.pmouseY=hc;m.clear(m.DEPTH_BUFFER_BIT);Ka={attributes:{},locations:{}};d.noLights();d.lightFalloff(1,0,0);d.shininess(1);d.ambient(255,255,255);d.specular(0,0,0);d.emissive(0,0,0);d.camera();d.draw();gc=d.mouseX;hc=d.mouseY;d.pmouseX=a;d.pmouseY=
	b};d.noLoop=function(){ib=Ia=!1;clearInterval(sa);ia.onPause()};d.loop=function(){ib||(yc=Date.now(),ic=0,sa=n.setInterval(function(){try{ia.onFrameStart(),d.redraw(),ia.onFrameEnd()}catch(a){throw n.clearInterval(sa),a;}},Pc),ib=Ia=!0,ia.onLoop())};d.frameRate=function(a){sc=a;Pc=1E3/sc;Ia&&(d.noLoop(),d.loop())};d.exit=function(){n.clearInterval(sa);var a=d.externals.canvas.id;xb.splice(cc[a],1);delete cc[a];delete X.onmousedown;for(var b in R.lib)R.lib.hasOwnProperty(b)&&R.lib[b].hasOwnProperty("detach")&&
	R.lib[b].detach(d);for(a=Ab.length;a--;){var c=Ab[a];b=c.elem;var f=c.type,c=c.fn;b.removeEventListener?b.removeEventListener(f,c,!1):b.detachEvent&&b.detachEvent("on"+f,c)}ia.onExit()};d.cursor=function(){if(1<arguments.length||1===arguments.length&&arguments[0]instanceof d.PImage){var a=arguments[0],b,c;if(3<=arguments.length){if(b=arguments[1],c=arguments[2],0>b||0>c||c>=a.height||b>=a.width)throw"x and y must be non-negative and less than the dimensions of the image";}else b=a.width>>>1,c=a.height>>>
	1;a='url("'+a.toDataURL()+'") '+b+" "+c+", default";X.style.cursor=a}else X.style.cursor=1===arguments.length?arguments[0]:ud};d.noCursor=function(){X.style.cursor=f.NOCURSOR};d.link=function(a,b){b!==g?n.open(a,b):n.location=a};d.beginDraw=y;d.endDraw=y;C.prototype.toImageData=function(a,b,c,f){a=a!==g?a:0;b=b!==g?b:0;c=c!==g?c:d.width;f=f!==g?f:d.height;return m.getImageData(a,b,c,f)};K.prototype.toImageData=function(a,b,c,f){a=a!==g?a:0;b=b!==g?b:0;c=c!==g?c:d.width;f=f!==g?f:d.height;var e=q.createElement("canvas").getContext("2d").createImageData(c,
	f),h=new z(4*c*f);m.readPixels(a,b,c,f,m.RGBA,m.UNSIGNED_BYTE,h);a=0;b=h.length;for(var w=e.data;a<b;a++)w[a]=h[4*(f-1-Math.floor(a/4/c))*c+a%(4*c)];return e};d.status=function(a){n.status=a};d.binary=function(a,b){var d;if(0<b)d=b;else if(a instanceof Char)d=16,a|=0;else for(d=32;1<d&&!(a>>>d-1&1);)d--;for(var c="";0<d;)c+=a>>>--d&1?"1":"0";return c};d.unbinary=function(a){for(var b=a.length-1,d=1,c=0;0<=b;){var f=a[b--];if("0"!==f&&"1"!==f)throw"the value passed into unbinary was not an 8 bit binary number";
	"1"===f&&(c+=d);d<<=1}return c};d.hex=function(a,b){1===arguments.length&&(b=a instanceof Char?4:8);var d=a,c=b,c=c===g||null===c?c=8:c;0>d&&(d=4294967295+d+1);for(d=Number(d).toString(16).toUpperCase();d.length<c;)d="0"+d;d.length>=c&&(d=d.substring(d.length-c,d.length));return d};d.unhex=function(a){if(a instanceof Array){for(var b=[],d=0;d<a.length;d++)b.push(Jb(a[d]));return b}return Jb(a)};d.loadStrings=function(a){if(I[a])return I[a].split("\n");a=e(a);if("string"!==typeof a||""===a)return[];
	a=a.replace(/(\r\n?)/g,"\n").replace(/\n$/,"");return a.split("\n")};d.saveStrings=function(a,b){I[a]=b.join("\n")};d.loadBytes=function(a){a=e(a);for(var b=[],d=0;d<a.length;d++)b.push(a.charCodeAt(d));return b};d.matchAll=function(a,b){for(var d=[],c,f=RegExp(b,"g");null!==(c=f.exec(a));)d.push(c),0===c[0].length&&++f.lastIndex;return 0<d.length?d:null};d.match=function(a,b){return a.match(b)};d.println=function(){R.logger.println.apply(R.logger,arguments)};d.print=function(){R.logger.print.apply(R.logger,
	arguments)};d.str=function(a){if(a instanceof Array){for(var b=[],d=0;d<a.length;d++)b.push(a[d].toString()+"");return b}return a.toString()+""};d.parseBoolean=function(a){if(a instanceof Array){for(var b=[],d=0;d<a.length;d++)b.push(hb(a[d]));return b}return hb(a)};d.parseByte=function(a){if(a instanceof Array){for(var b=[],d=0;d<a.length;d++)b.push(0-(a[d]&128)|a[d]&127);return b}return 0-(a&128)|a&127};d.parseChar=function(a){if("number"===typeof a)return new Char(String.fromCharCode(a&65535));
	if(a instanceof Array){for(var b=[],d=0;d<a.length;d++)b.push(new Char(String.fromCharCode(a[d]&65535)));return b}throw"char() may receive only one argument of type int, byte, int[], or byte[].";};d.parseFloat=function(a){if(a instanceof Array){for(var b=[],d=0;d<a.length;d++)b.push(Lb(a[d]));return b}return Lb(a)};d.parseInt=function(a,b){if(a instanceof Array){for(var d=[],c=0;c<a.length;c++)"string"!==typeof a[c]||/^\s*[+\-]?\d+\s*$/.test(a[c])?d.push(Mb(a[c],b)):d.push(0);return d}return Mb(a,
	b)};d.__int_cast=function(a){return 0|a};d.__instanceof=function(a,b){if("function"!==typeof b)throw"Function is expected as type argument for instanceof operator";if("string"===typeof a)return b===Object||b===String;if(a instanceof b)return!0;if("object"!==typeof a||null===a)return!1;var d=a.constructor;if(b.$isInterface){for(var c=[];d;)d.$interfaces&&(c=c.concat(d.$interfaces)),d=d.$base;for(;0<c.length;){d=c.shift();if(d===b)return!0;d.$interfaces&&(c=c.concat(d.$interfaces))}return!1}for(;d.hasOwnProperty("$base");)if(d=
	d.$base,d===b)return!0;return!1};aa.prototype.size=function(a,b,c){E&&d.stroke(0);W&&d.fill(255);c={fillStyle:m.fillStyle,strokeStyle:m.strokeStyle,lineCap:m.lineCap,lineJoin:m.lineJoin};0<X.style.length&&(X.style.removeProperty("width"),X.style.removeProperty("height"));X.width=d.width=a||100;X.height=d.height=b||100;for(var e in c)c.hasOwnProperty(e)&&(m[e]=c[e]);d.textFont(ha);d.background();dd=Math.max(1E3,0.05*a*b);d.externals.context=m;for(a=0;a<f.SINCOS_LENGTH;a++)Yb[a]=d.sin(0.5*a*(f.PI/180)),
	Zb[a]=d.cos(0.5*a*(f.PI/180))};C.prototype.size=function(a,b,d){m===g&&(m=X.getContext("2d"),Eb=new cb,Fb=new cb,P=new bb,ka=new bb);aa.prototype.size.apply(this,arguments)};K.prototype.size=function(){var a=!1;return function(b,c,f){if(a)throw"Multiple calls to size() for 3D renders are not allowed.";a=!0;try{X.width=d.width=b||100;X.height=d.height=c||100;for(var e=X,g=["experimental-webgl","webgl","webkit-3d"],h,n=0,s=g.length;n<s&&!(h=e.getContext(g[n],{antialias:!1,preserveDrawingBuffer:!0}));n++);
	m=h;Yc=m.createTexture();Zc=m.createTexture()}catch(k){R.debug(k)}if(!m)throw"WebGL context is not supported on this browser.";m.viewport(0,0,X.width,X.height);m.enable(m.DEPTH_TEST);m.enable(m.BLEND);m.blendFunc(m.SRC_ALPHA,m.ONE_MINUS_SRC_ALPHA);N=Nc(m,"varying vec4 vFrontColor;attribute vec3 aVertex;attribute vec2 aTextureCoord;uniform vec4 uColor;uniform mat4 uModel;uniform mat4 uView;uniform mat4 uProjection;uniform float uPointSize;varying vec2 vTextureCoord;void main(void) {  gl_PointSize = uPointSize;  vFrontColor = uColor;  gl_Position = uProjection * uView * uModel * vec4(aVertex, 1.0);  vTextureCoord = aTextureCoord;}",
	"#ifdef GL_ES\nprecision highp float;\n#endif\nvarying vec4 vFrontColor;varying vec2 vTextureCoord;uniform sampler2D uSampler;uniform int uIsDrawingText;uniform bool uSmooth;void main(void){  if(uSmooth == true){    float dist = distance(gl_PointCoord, vec2(0.5));    if(dist > 0.5){      discard;    }  }  if(uIsDrawingText == 1){    float alpha = texture2D(uSampler, vTextureCoord).a;    gl_FragColor = vec4(vFrontColor.rgb * alpha, alpha);  }  else{    gl_FragColor = vFrontColor;  }}");ta=Nc(m,"varying vec4 vFrontColor;attribute vec3 aVertex;attribute vec4 aColor;uniform mat4 uView;uniform mat4 uProjection;uniform float uPointSize;void main(void) {  vFrontColor = aColor;  gl_PointSize = uPointSize;  gl_Position = uProjection * uView * vec4(aVertex, 1.0);}",
	"#ifdef GL_ES\nprecision highp float;\n#endif\nvarying vec4 vFrontColor;uniform bool uSmooth;void main(void){  if(uSmooth == true){    float dist = distance(gl_PointCoord, vec2(0.5));    if(dist > 0.5){      discard;    }  }  gl_FragColor = vFrontColor;}");d.strokeWeight(1);B=Nc(m,zd,"#ifdef GL_ES\nprecision highp float;\n#endif\nvarying vec4 vFrontColor;uniform sampler2D uSampler;uniform bool uUsingTexture;varying vec2 vTexture;void main(void){  if( uUsingTexture ){    gl_FragColor = vec4(texture2D(uSampler, vTexture.xy)) * vFrontColor;  }  else{    gl_FragColor = vFrontColor;  }}");
	m.useProgram(B);ca("usingTexture3d",B,"usingTexture",za);d.lightFalloff(1,0,0);d.shininess(1);d.ambient(255,255,255);d.specular(0,0,0);d.emissive(0,0,0);Bc=m.createBuffer();m.bindBuffer(m.ARRAY_BUFFER,Bc);m.bufferData(m.ARRAY_BUFFER,id,m.STATIC_DRAW);Cc=m.createBuffer();m.bindBuffer(m.ARRAY_BUFFER,Cc);m.bufferData(m.ARRAY_BUFFER,xd,m.STATIC_DRAW);Dc=m.createBuffer();m.bindBuffer(m.ARRAY_BUFFER,Dc);m.bufferData(m.ARRAY_BUFFER,jd,m.STATIC_DRAW);kc=m.createBuffer();m.bindBuffer(m.ARRAY_BUFFER,kc);m.bufferData(m.ARRAY_BUFFER,
	Mc,m.STATIC_DRAW);Ec=m.createBuffer();m.bindBuffer(m.ARRAY_BUFFER,Ec);m.bufferData(m.ARRAY_BUFFER,yd,m.STATIC_DRAW);Xb=m.createBuffer();Fc=m.createBuffer();Vc=m.createBuffer();Gc=m.createBuffer();Wc=m.createBuffer();Xc=m.createBuffer();lc=m.createBuffer();m.bindBuffer(m.ARRAY_BUFFER,lc);m.bufferData(m.ARRAY_BUFFER,new O([0,0,0]),m.STATIC_DRAW);Hc=m.createBuffer();m.bindBuffer(m.ARRAY_BUFFER,Hc);m.bufferData(m.ARRAY_BUFFER,new O([1,1,0,-1,1,0,-1,-1,0,1,-1,0]),m.STATIC_DRAW);Ic=m.createBuffer();m.bindBuffer(m.ARRAY_BUFFER,
	Ic);m.bufferData(m.ARRAY_BUFFER,new O([0,0,1,0,1,1,0,1]),m.STATIC_DRAW);Jc=m.createBuffer();m.bindBuffer(m.ELEMENT_ARRAY_BUFFER,Jc);m.bufferData(m.ELEMENT_ARRAY_BUFFER,new la([0,1,2,2,3,0]),m.STATIC_DRAW);ub=new G;Va=new G;P=new G;ka=new G;Ma=new G;d.camera();d.perspective();Eb=new cb;Fb=new cb;Wb=new G;jc=new G;Bb=new G;Cb=new G;zc=new G;Ac=new G;Ac.set(-1,3,-3,1,3,-6,3,0,-3,3,0,0,1,0,0,0);aa.prototype.size.apply(this,arguments)}}();C.prototype.ambientLight=aa.prototype.a3DOnlyFunction;K.prototype.ambientLight=
	function(a,b,d,c,e,g){if(S===f.MAX_LIGHTS)throw"can only create "+f.MAX_LIGHTS+" lights";c=new PVector(c,e,g);e=new G;e.scale(1,-1,1);e.apply(P.array());e.mult(c,c);a=ya(a,b,d,0);a=[((a&f.RED_MASK)>>>16)/255,((a&f.GREEN_MASK)>>>8)/255,(a&f.BLUE_MASK)/255];m.useProgram(B);Y("uLights.color.3d."+S,B,"uLights"+S+".color",a);Y("uLights.position.3d."+S,B,"uLights"+S+".position",c.array());ca("uLights.type.3d."+S,B,"uLights"+S+".type",0);ca("uLightCount3d",B,"uLightCount",++S)};C.prototype.directionalLight=
	aa.prototype.a3DOnlyFunction;K.prototype.directionalLight=function(a,b,d,c,e,g){if(S===f.MAX_LIGHTS)throw"can only create "+f.MAX_LIGHTS+" lights";m.useProgram(B);var h=new G;h.scale(1,-1,1);h.apply(P.array());h=h.array();c=[h[0]*c+h[4]*e+h[8]*g,h[1]*c+h[5]*e+h[9]*g,h[2]*c+h[6]*e+h[10]*g];a=ya(a,b,d,0);Y("uLights.color.3d."+S,B,"uLights"+S+".color",[((a&f.RED_MASK)>>>16)/255,((a&f.GREEN_MASK)>>>8)/255,(a&f.BLUE_MASK)/255]);Y("uLights.position.3d."+S,B,"uLights"+S+".position",c);ca("uLights.type.3d."+
	S,B,"uLights"+S+".type",1);ca("uLightCount3d",B,"uLightCount",++S)};C.prototype.lightFalloff=aa.prototype.a3DOnlyFunction;K.prototype.lightFalloff=function(a,b,d){m.useProgram(B);Y("uFalloff3d",B,"uFalloff",[a,b,d])};C.prototype.lightSpecular=aa.prototype.a3DOnlyFunction;K.prototype.lightSpecular=function(a,b,d){a=ya(a,b,d,0);a=[((a&f.RED_MASK)>>>16)/255,((a&f.GREEN_MASK)>>>8)/255,(a&f.BLUE_MASK)/255];m.useProgram(B);Y("uSpecular3d",B,"uSpecular",a)};d.lights=function(){d.ambientLight(128,128,128);
	d.directionalLight(128,128,128,0,0,-1);d.lightFalloff(1,0,0);d.lightSpecular(0,0,0)};C.prototype.pointLight=aa.prototype.a3DOnlyFunction;K.prototype.pointLight=function(a,b,d,c,e,g){if(S===f.MAX_LIGHTS)throw"can only create "+f.MAX_LIGHTS+" lights";c=new PVector(c,e,g);e=new G;e.scale(1,-1,1);e.apply(P.array());e.mult(c,c);a=ya(a,b,d,0);a=[((a&f.RED_MASK)>>>16)/255,((a&f.GREEN_MASK)>>>8)/255,(a&f.BLUE_MASK)/255];m.useProgram(B);Y("uLights.color.3d."+S,B,"uLights"+S+".color",a);Y("uLights.position.3d."+
	S,B,"uLights"+S+".position",c.array());ca("uLights.type.3d."+S,B,"uLights"+S+".type",2);ca("uLightCount3d",B,"uLightCount",++S)};C.prototype.noLights=aa.prototype.a3DOnlyFunction;K.prototype.noLights=function(){S=0;m.useProgram(B);ca("uLightCount3d",B,"uLightCount",S)};C.prototype.spotLight=aa.prototype.a3DOnlyFunction;K.prototype.spotLight=function(a,b,d,c,e,g,h,n,s,k,p){if(S===f.MAX_LIGHTS)throw"can only create "+f.MAX_LIGHTS+" lights";m.useProgram(B);c=new PVector(c,e,g);e=new G;e.scale(1,-1,1);
	e.apply(P.array());e.mult(c,c);e=e.array();h=[e[0]*h+e[4]*n+e[8]*s,e[1]*h+e[5]*n+e[9]*s,e[2]*h+e[6]*n+e[10]*s];a=ya(a,b,d,0);Y("uLights.color.3d."+S,B,"uLights"+S+".color",[((a&f.RED_MASK)>>>16)/255,((a&f.GREEN_MASK)>>>8)/255,(a&f.BLUE_MASK)/255]);Y("uLights.position.3d."+S,B,"uLights"+S+".position",c.array());Y("uLights.direction.3d."+S,B,"uLights"+S+".direction",h);Y("uLights.concentration.3d."+S,B,"uLights"+S+".concentration",p);Y("uLights.angle.3d."+S,B,"uLights"+S+".angle",k);ca("uLights.type.3d."+
	S,B,"uLights"+S+".type",3);ca("uLightCount3d",B,"uLightCount",++S)};C.prototype.beginCamera=function(){throw"beginCamera() is not available in 2D mode";};K.prototype.beginCamera=function(){if(oc)throw"You cannot call beginCamera() again before calling endCamera()";oc=!0;P=Va;ka=ub};C.prototype.endCamera=function(){throw"endCamera() is not available in 2D mode";};K.prototype.endCamera=function(){if(!oc)throw"You cannot call endCamera() before calling beginCamera()";P.set(ub);ka.set(Va);oc=!1};d.camera=
	function(a,b,c,f,e,h,m,n,s){a===g&&(Lc=d.width/2,vb=d.height/2,wb=vb/Math.tan(pc/2),a=Lc,b=vb,c=wb,f=Lc,e=vb,m=h=0,n=1,s=0);f=new PVector(a-f,b-e,c-h);var k=new PVector(m,n,s);f.normalize();s=PVector.cross(k,f);k=PVector.cross(f,s);s.normalize();k.normalize();m=s.x;n=s.y;s=s.z;e=k.x;h=k.y;var k=k.z,p=f.x,q=f.y;f=f.z;ub.set(m,n,s,0,e,h,k,0,p,q,f,0,0,0,0,1);ub.translate(-a,-b,-c);Va.reset();Va.invApply(m,n,s,0,e,h,k,0,p,q,f,0,0,0,0,1);Va.translate(a,b,c);P.set(ub);ka.set(Va)};d.perspective=function(a,
	b,c,f){0===arguments.length&&(vb=X.height/2,wb=vb/Math.tan(pc/2),ed=wb/10,fd=10*wb,gd=d.width/d.height,a=pc,b=gd,c=ed,f=fd);var e,g;e=c*Math.tan(a/2);g=-e;d.frustum(g*b,e*b,g,e,c,f)};C.prototype.frustum=function(){throw"Processing.js: frustum() is not supported in 2D mode";};K.prototype.frustum=function(a,b,d,c,f,e){Ma=new G;Ma.set(2*f/(b-a),0,(b+a)/(b-a),0,0,2*f/(c-d),(c+d)/(c-d),0,0,0,-(e+f)/(e-f),-(2*e*f)/(e-f),0,0,-1,0);a=new G;a.set(Ma);a.transpose();m.useProgram(N);Z("projection2d",N,"uProjection",
	!1,a.array());m.useProgram(B);Z("projection3d",B,"uProjection",!1,a.array());m.useProgram(ta);Z("uProjectionUS",ta,"uProjection",!1,a.array())};d.ortho=function(a,b,c,f,e,g){0===arguments.length&&(a=0,b=d.width,c=0,f=d.height,e=-10,g=10);var h=2/(b-a),n=2/(f-c),s=-2/(g-e),k=-(b+a)/(b-a),p=-(f+c)/(f-c),q=-(g+e)/(g-e);Ma=new G;Ma.set(h,0,0,k,0,n,0,p,0,0,s,q,0,0,0,1);h=new G;h.set(Ma);h.transpose();m.useProgram(N);Z("projection2d",N,"uProjection",!1,h.array());m.useProgram(B);Z("projection3d",B,"uProjection",
	!1,h.array());m.useProgram(ta);Z("uProjectionUS",ta,"uProjection",!1,h.array())};d.printProjection=function(){Ma.print()};d.printCamera=function(){ub.print()};C.prototype.box=aa.prototype.a3DOnlyFunction;K.prototype.box=function(a,b,d){b&&d||(b=d=a);var c=new G;c.scale(a,b,d);a=new G;a.scale(1,-1,1);a.apply(P.array());a.transpose();W&&(m.useProgram(B),Z("model3d",B,"uModel",!1,c.array()),Z("view3d",B,"uView",!1,a.array()),m.enable(m.POLYGON_OFFSET_FILL),m.polygonOffset(1,1),Y("color3d",B,"uColor",
	qa),0<S?(b=new G,b.set(a),d=new G,d.set(c),b.mult(d),d=new G,d.set(b),d.invert(),d.transpose(),Z("uNormalTransform3d",B,"uNormalTransform",!1,d.array()),fa("aNormal3d",B,"aNormal",3,Cc)):xa("aNormal3d",B,"aNormal"),fa("aVertex3d",B,"aVertex",3,Bc),xa("aColor3d",B,"aColor"),xa("aTexture3d",B,"aTexture"),m.drawArrays(m.TRIANGLES,0,id.length/3),m.disable(m.POLYGON_OFFSET_FILL));0<ja&&E&&(m.useProgram(N),Z("uModel2d",N,"uModel",!1,c.array()),Z("uView2d",N,"uView",!1,a.array()),Y("uColor2d",N,"uColor",
	ba),ca("uIsDrawingText2d",N,"uIsDrawingText",!1),fa("vertex2d",N,"aVertex",3,Dc),xa("aTextureCoord2d",N,"aTextureCoord"),m.drawArrays(m.LINES,0,jd.length/3))};d.sphereDetail=function(a,b){var d;1===arguments.length&&(a=b=arguments[0]);3>a&&(a=3);2>b&&(b=2);if(a!==tb||b!==nc){var c=f.SINCOS_LENGTH/a,e=new O(a),g=new O(a);for(d=0;d<a;d++)e[d]=Zb[d*c%f.SINCOS_LENGTH|0],g[d]=Yb[d*c%f.SINCOS_LENGTH|0];d=a*(b-1)+2;c=0;Sa=new O(d);Ta=new O(d);Ua=new O(d);var h=0.5*f.SINCOS_LENGTH/b,n=h;for(d=1;d<b;d++){for(var k=
	Yb[n%f.SINCOS_LENGTH|0],p=-Zb[n%f.SINCOS_LENGTH|0],q=0;q<a;q++)Sa[c]=e[q]*k,Ta[c]=p,Ua[c++]=g[q]*k;n+=h}tb=a;nc=b;U=[];for(e=0;e<tb;e++)U.push(0),U.push(-1),U.push(0),U.push(Sa[e]),U.push(Ta[e]),U.push(Ua[e]);U.push(0);U.push(-1);U.push(0);U.push(Sa[0]);U.push(Ta[0]);U.push(Ua[0]);h=0;for(e=2;e<nc;e++){g=d=h;c=h+=tb;for(n=0;n<tb;n++)U.push(Sa[g]),U.push(Ta[g]),U.push(Ua[g++]),U.push(Sa[c]),U.push(Ta[c]),U.push(Ua[c++]);g=d;c=h;U.push(Sa[g]);U.push(Ta[g]);U.push(Ua[g]);U.push(Sa[c]);U.push(Ta[c]);
	U.push(Ua[c])}for(e=0;e<tb;e++)c=h+e,U.push(Sa[c]),U.push(Ta[c]),U.push(Ua[c]),U.push(0),U.push(1),U.push(0);U.push(Sa[h]);U.push(Ta[h]);U.push(Ua[h]);U.push(0);U.push(1);U.push(0);m.bindBuffer(m.ARRAY_BUFFER,Xb);m.bufferData(m.ARRAY_BUFFER,new O(U),m.STATIC_DRAW)}};C.prototype.sphere=aa.prototype.a3DOnlyFunction;K.prototype.sphere=function(a){(3>tb||2>nc)&&d.sphereDetail(30);var b=new G;b.scale(a,a,a);a=new G;a.scale(1,-1,1);a.apply(P.array());a.transpose();if(W){if(0<S){var c=new G;c.set(a);var f=
	new G;f.set(b);c.mult(f);f=new G;f.set(c);f.invert();f.transpose();Z("uNormalTransform3d",B,"uNormalTransform",!1,f.array());fa("aNormal3d",B,"aNormal",3,Xb)}else xa("aNormal3d",B,"aNormal");m.useProgram(B);xa("aTexture3d",B,"aTexture");Z("uModel3d",B,"uModel",!1,b.array());Z("uView3d",B,"uView",!1,a.array());fa("aVertex3d",B,"aVertex",3,Xb);xa("aColor3d",B,"aColor");m.enable(m.POLYGON_OFFSET_FILL);m.polygonOffset(1,1);Y("uColor3d",B,"uColor",qa);m.drawArrays(m.TRIANGLE_STRIP,0,U.length/3);m.disable(m.POLYGON_OFFSET_FILL)}0<
	ja&&E&&(m.useProgram(N),Z("uModel2d",N,"uModel",!1,b.array()),Z("uView2d",N,"uView",!1,a.array()),fa("aVertex2d",N,"aVertex",3,Xb),xa("aTextureCoord2d",N,"aTextureCoord"),Y("uColor2d",N,"uColor",ba),ca("uIsDrawingText",N,"uIsDrawingText",!1),m.drawArrays(m.LINE_STRIP,0,U.length/3))};d.modelX=function(a,b,d){var c=P.array(),f=Va.array(),e=c[0]*a+c[1]*b+c[2]*d+c[3],g=c[4]*a+c[5]*b+c[6]*d+c[7],h=c[8]*a+c[9]*b+c[10]*d+c[11];b=c[12]*a+c[13]*b+c[14]*d+c[15];a=f[0]*e+f[1]*g+f[2]*h+f[3]*b;f=f[12]*e+f[13]*
	g+f[14]*h+f[15]*b;return 0!==f?a/f:a};d.modelY=function(a,b,d){var c=P.array(),f=Va.array(),e=c[0]*a+c[1]*b+c[2]*d+c[3],g=c[4]*a+c[5]*b+c[6]*d+c[7],h=c[8]*a+c[9]*b+c[10]*d+c[11];b=c[12]*a+c[13]*b+c[14]*d+c[15];a=f[4]*e+f[5]*g+f[6]*h+f[7]*b;f=f[12]*e+f[13]*g+f[14]*h+f[15]*b;return 0!==f?a/f:a};d.modelZ=function(a,b,d){var c=P.array(),f=Va.array(),e=c[0]*a+c[1]*b+c[2]*d+c[3],g=c[4]*a+c[5]*b+c[6]*d+c[7],h=c[8]*a+c[9]*b+c[10]*d+c[11];b=c[12]*a+c[13]*b+c[14]*d+c[15];a=f[8]*e+f[9]*g+f[10]*h+f[11]*b;f=f[12]*
	e+f[13]*g+f[14]*h+f[15]*b;return 0!==f?a/f:a};C.prototype.ambient=aa.prototype.a3DOnlyFunction;K.prototype.ambient=function(a,b,c){m.useProgram(B);ca("uUsingMat3d",B,"uUsingMat",!0);a=d.color(a,b,c);Y("uMaterialAmbient3d",B,"uMaterialAmbient",d.color.toGLArray(a).slice(0,3))};C.prototype.emissive=aa.prototype.a3DOnlyFunction;K.prototype.emissive=function(a,b,c){m.useProgram(B);ca("uUsingMat3d",B,"uUsingMat",!0);a=d.color(a,b,c);Y("uMaterialEmissive3d",B,"uMaterialEmissive",d.color.toGLArray(a).slice(0,
	3))};C.prototype.shininess=aa.prototype.a3DOnlyFunction;K.prototype.shininess=function(a){m.useProgram(B);ca("uUsingMat3d",B,"uUsingMat",!0);Y("uShininess3d",B,"uShininess",a)};C.prototype.specular=aa.prototype.a3DOnlyFunction;K.prototype.specular=function(a,b,c){m.useProgram(B);ca("uUsingMat3d",B,"uUsingMat",!0);a=d.color(a,b,c);Y("uMaterialSpecular3d",B,"uMaterialSpecular",d.color.toGLArray(a).slice(0,3))};d.screenX=function(a,b,c){var f=P.array();if(16===f.length){var e=f[0]*a+f[1]*b+f[2]*c+f[3],
	g=f[4]*a+f[5]*b+f[6]*c+f[7],h=f[8]*a+f[9]*b+f[10]*c+f[11];b=f[12]*a+f[13]*b+f[14]*c+f[15];c=Ma.array();a=c[0]*e+c[1]*g+c[2]*h+c[3]*b;e=c[12]*e+c[13]*g+c[14]*h+c[15]*b;0!==e&&(a/=e);return d.width*(1+a)/2}return P.multX(a,b)};d.screenY=function(a,b,c){var f=P.array();if(16===f.length){var e=f[0]*a+f[1]*b+f[2]*c+f[3],g=f[4]*a+f[5]*b+f[6]*c+f[7],h=f[8]*a+f[9]*b+f[10]*c+f[11];b=f[12]*a+f[13]*b+f[14]*c+f[15];c=Ma.array();a=c[4]*e+c[5]*g+c[6]*h+c[7]*b;e=c[12]*e+c[13]*g+c[14]*h+c[15]*b;0!==e&&(a/=e);return d.height*
	(1+a)/2}return P.multY(a,b)};d.screenZ=function(a,b,d){var c=P.array();if(16!==c.length)return 0;var f=Ma.array(),e=c[0]*a+c[1]*b+c[2]*d+c[3],g=c[4]*a+c[5]*b+c[6]*d+c[7],h=c[8]*a+c[9]*b+c[10]*d+c[11];b=c[12]*a+c[13]*b+c[14]*d+c[15];a=f[8]*e+f[9]*g+f[10]*h+f[11]*b;f=f[12]*e+f[13]*g+f[14]*h+f[15]*b;0!==f&&(a/=f);return(a+1)/2};aa.prototype.fill=function(){var a=d.color.apply(this,arguments);a===Pa&&W||(W=!0,Pa=a)};C.prototype.fill=function(){aa.prototype.fill.apply(this,arguments);Q=!0};K.prototype.fill=
	function(){aa.prototype.fill.apply(this,arguments);qa=d.color.toGLArray(Pa)};d.noFill=function(){W=!1};aa.prototype.stroke=function(){var a=d.color.apply(this,arguments);a===oa&&E||(E=!0,oa=a)};C.prototype.stroke=function(){aa.prototype.stroke.apply(this,arguments);eb=!0};K.prototype.stroke=function(){aa.prototype.stroke.apply(this,arguments);ba=d.color.toGLArray(oa)};d.noStroke=function(){E=!1};aa.prototype.strokeWeight=function(a){ja=a};C.prototype.strokeWeight=function(a){aa.prototype.strokeWeight.apply(this,
	arguments);m.lineWidth=a};K.prototype.strokeWeight=function(a){aa.prototype.strokeWeight.apply(this,arguments);m.useProgram(N);Y("pointSize2d",N,"uPointSize",a);m.useProgram(ta);Y("pointSizeUnlitShape",ta,"uPointSize",a);m.lineWidth(a)};d.strokeCap=function(a){ma.$ensureContext().lineCap=a};d.strokeJoin=function(a){ma.$ensureContext().lineJoin=a};C.prototype.smooth=function(){pa=!0;var a=X.style;a.setProperty("image-rendering","optimizeQuality","important");a.setProperty("-ms-interpolation-mode",
	"bicubic","important");m.hasOwnProperty("mozImageSmoothingEnabled")&&(m.mozImageSmoothingEnabled=!0)};K.prototype.smooth=function(){pa=!0};C.prototype.noSmooth=function(){pa=!1;var a=X.style;a.setProperty("image-rendering","optimizeSpeed","important");a.setProperty("image-rendering","-moz-crisp-edges","important");a.setProperty("image-rendering","-webkit-optimize-contrast","important");a.setProperty("image-rendering","optimize-contrast","important");a.setProperty("-ms-interpolation-mode","nearest-neighbor",
	"important");m.hasOwnProperty("mozImageSmoothingEnabled")&&(m.mozImageSmoothingEnabled=!1)};K.prototype.noSmooth=function(){pa=!1};C.prototype.point=function(a,b){E&&(pa||(a=Math.round(a),b=Math.round(b)),m.fillStyle=d.color.toString(oa),Q=!0,1<ja?(m.beginPath(),m.arc(a,b,ja/2,0,f.TWO_PI,!1),m.fill()):m.fillRect(a,b,1,1))};K.prototype.point=function(a,b,c){var d=new G;d.translate(a,b,c||0);d.transpose();a=new G;a.scale(1,-1,1);a.apply(P.array());a.transpose();m.useProgram(N);Z("uModel2d",N,"uModel",
	!1,d.array());Z("uView2d",N,"uView",!1,a.array());0<ja&&E&&(Y("uColor2d",N,"uColor",ba),ca("uIsDrawingText2d",N,"uIsDrawingText",!1),ca("uSmooth2d",N,"uSmooth",pa),fa("aVertex2d",N,"aVertex",3,lc),xa("aTextureCoord2d",N,"aTextureCoord"),m.drawArrays(m.POINTS,0,1))};d.beginShape=function(a){ga=a;r=[]};C.prototype.vertex=function(a,b,d){var c=[];mb&&(mb=!1);c.isVert=!0;c[0]=a;c[1]=b;c[2]=0;c[3]=0;c[4]=0;c[5]=Pa;c[6]=oa;r.push(c);d&&(r[r.length-1].moveTo=d)};K.prototype.vertex=function(a,b,c,d,e){var h=
	[];mb&&(mb=!1);h.isVert=!0;e===g&&za&&(e=d,d=c,c=0);d!==g&&e!==g&&(bd===f.IMAGE&&(d/=$c,e/=ad),d=1<d?1:d,d=0>d?0:d,e=1<e?1:e,e=0>e?0:e);h[0]=a;h[1]=b;h[2]=c||0;h[3]=d||0;h[4]=e||0;h[5]=qa[0];h[6]=qa[1];h[7]=qa[2];h[8]=qa[3];h[9]=ba[0];h[10]=ba[1];h[11]=ba[2];h[12]=ba[3];h[13]=Kb;h[14]=Ib;h[15]=yb;r.push(h)};var md=function(a,b){var d=new G;d.scale(1,-1,1);d.apply(P.array());d.transpose();m.useProgram(ta);Z("uViewUS",ta,"uView",!1,d.array());ca("uSmoothUS",ta,"uSmooth",pa);fa("aVertexUS",ta,"aVertex",
	3,lc);m.bufferData(m.ARRAY_BUFFER,new O(a),m.STREAM_DRAW);fa("aColorUS",ta,"aColor",4,Gc);m.bufferData(m.ARRAY_BUFFER,new O(b),m.STREAM_DRAW);m.drawArrays(m.POINTS,0,a.length/3)},Ha=function(a,b,d){b="LINES"===b?m.LINES:"LINE_LOOP"===b?m.LINE_LOOP:m.LINE_STRIP;var c=new G;c.scale(1,-1,1);c.apply(P.array());c.transpose();m.useProgram(ta);Z("uViewUS",ta,"uView",!1,c.array());fa("aVertexUS",ta,"aVertex",3,Fc);m.bufferData(m.ARRAY_BUFFER,new O(a),m.STREAM_DRAW);fa("aColorUS",ta,"aColor",4,Wc);m.bufferData(m.ARRAY_BUFFER,
	new O(d),m.STREAM_DRAW);m.drawArrays(b,0,a.length/3)},db=function(a,b,d,c){b="TRIANGLES"===b?m.TRIANGLES:"TRIANGLE_FAN"===b?m.TRIANGLE_FAN:m.TRIANGLE_STRIP;var f=new G;f.scale(1,-1,1);f.apply(P.array());f.transpose();m.useProgram(B);Z("model3d",B,"uModel",!1,[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]);Z("view3d",B,"uView",!1,f.array());m.enable(m.POLYGON_OFFSET_FILL);m.polygonOffset(1,1);Y("color3d",B,"uColor",[-1,0,0,0]);fa("vertex3d",B,"aVertex",3,Vc);m.bufferData(m.ARRAY_BUFFER,new O(a),m.STREAM_DRAW);
	za&&null!==kb&&xc(d);fa("aColor3d",B,"aColor",4,Gc);m.bufferData(m.ARRAY_BUFFER,new O(d),m.STREAM_DRAW);xa("aNormal3d",B,"aNormal");za&&(ca("uUsingTexture3d",B,"uUsingTexture",za),fa("aTexture3d",B,"aTexture",2,Xc),m.bufferData(m.ARRAY_BUFFER,new O(c),m.STREAM_DRAW));m.drawArrays(b,0,a.length/3);m.disable(m.POLYGON_OFFSET_FILL)};C.prototype.endShape=function(a){if(0!==r.length){(a=a===f.CLOSE)&&r.push(r[0]);var b=[],c=[],e=[],h=[],n;mb=!0;var w,k,s=r.length;for(w=0;w<s;w++)for(n=r[w],k=0;3>k;k++)b.push(n[k]);
	for(w=0;w<s;w++)for(n=r[w],k=5;9>k;k++)c.push(n[k]);for(w=0;w<s;w++)for(n=r[w],k=9;13>k;k++)e.push(n[k]);for(w=0;w<s;w++)n=r[w],h.push(n[3]),h.push(n[4]);if(!Gb||ga!==f.POLYGON&&ga!==g)if(!Hb||ga!==f.POLYGON&&ga!==g)if(ga===f.POINTS)for(w=0;w<s;w++)n=r[w],E&&d.stroke(n[6]),d.point(n[0],n[1]);else if(ga===f.LINES)for(w=0;w+1<s;w+=2)n=r[w],E&&d.stroke(r[w+1][6]),d.line(n[0],n[1],r[w+1][0],r[w+1][1]);else if(ga===f.TRIANGLES)for(w=0;w+2<s;w+=3)n=r[w],m.beginPath(),m.moveTo(n[0],n[1]),m.lineTo(r[w+1][0],
	r[w+1][1]),m.lineTo(r[w+2][0],r[w+2][1]),m.lineTo(n[0],n[1]),W&&(d.fill(r[w+2][5]),Ba()),E&&(d.stroke(r[w+2][6]),Ea()),m.closePath();else if(ga===f.TRIANGLE_STRIP)for(w=0;w+1<s;w++)n=r[w],m.beginPath(),m.moveTo(r[w+1][0],r[w+1][1]),m.lineTo(n[0],n[1]),E&&d.stroke(r[w+1][6]),W&&d.fill(r[w+1][5]),w+2<s&&(m.lineTo(r[w+2][0],r[w+2][1]),E&&d.stroke(r[w+2][6]),W&&d.fill(r[w+2][5])),Xa();else if(ga===f.TRIANGLE_FAN){if(2<s)for(m.beginPath(),m.moveTo(r[0][0],r[0][1]),m.lineTo(r[1][0],r[1][1]),m.lineTo(r[2][0],
	r[2][1]),W&&(d.fill(r[2][5]),Ba()),E&&(d.stroke(r[2][6]),Ea()),m.closePath(),w=3;w<s;w++)n=r[w],m.beginPath(),m.moveTo(r[0][0],r[0][1]),m.lineTo(r[w-1][0],r[w-1][1]),m.lineTo(n[0],n[1]),W&&(d.fill(n[5]),Ba()),E&&(d.stroke(n[6]),Ea()),m.closePath()}else if(ga===f.QUADS)for(w=0;w+3<s;w+=4){n=r[w];m.beginPath();m.moveTo(n[0],n[1]);for(k=1;4>k;k++)m.lineTo(r[w+k][0],r[w+k][1]);m.lineTo(n[0],n[1]);W&&(d.fill(r[w+3][5]),Ba());E&&(d.stroke(r[w+3][6]),Ea());m.closePath()}else if(ga===f.QUAD_STRIP){if(3<s)for(w=
	0;w+1<s;w+=2)n=r[w],m.beginPath(),w+3<s?(m.moveTo(r[w+2][0],r[w+2][1]),m.lineTo(n[0],n[1]),m.lineTo(r[w+1][0],r[w+1][1]),m.lineTo(r[w+3][0],r[w+3][1]),W&&d.fill(r[w+3][5]),E&&d.stroke(r[w+3][6])):(m.moveTo(n[0],n[1]),m.lineTo(r[w+1][0],r[w+1][1])),Xa()}else{m.beginPath();m.moveTo(r[0][0],r[0][1]);for(w=1;w<s;w++)n=r[w],n.isVert&&(n.moveTo?m.moveTo(n[0],n[1]):m.lineTo(n[0],n[1]));Xa()}else{m.beginPath();for(w=0;w<s;w++)n=r[w],r[w].isVert?r[w].moveTo?m.moveTo(n[0],n[1]):m.lineTo(n[0],n[1]):m.bezierCurveTo(r[w][0],
	r[w][1],r[w][2],r[w][3],r[w][4],r[w][5]);Xa()}else if(3<s){b=[];c=1-tc;m.beginPath();m.moveTo(r[1][0],r[1][1]);for(w=1;w+2<s;w++)n=r[w],b[0]=[n[0],n[1]],b[1]=[n[0]+(c*r[w+1][0]-c*r[w-1][0])/6,n[1]+(c*r[w+1][1]-c*r[w-1][1])/6],b[2]=[r[w+1][0]+(c*r[w][0]-c*r[w+2][0])/6,r[w+1][1]+(c*r[w][1]-c*r[w+2][1])/6],b[3]=[r[w+1][0],r[w+1][1]],m.bezierCurveTo(b[1][0],b[1][1],b[2][0],b[2][1],b[3][0],b[3][1]);Xa()}Hb=Gb=!1;Aa=[];ua=0;a&&r.pop()}};K.prototype.endShape=function(a){if(0!==r.length){var b=a===f.CLOSE;
	a=[];var c=[],d=[],e=[],h=[],n;mb=!0;var k,s,p=r.length;for(k=0;k<p;k++)for(n=r[k],s=0;3>s;s++)c.push(n[s]);for(k=0;k<p;k++)for(n=r[k],s=5;9>s;s++)d.push(n[s]);for(k=0;k<p;k++)for(n=r[k],s=9;13>s;s++)e.push(n[s]);for(k=0;k<p;k++)n=r[k],h.push(n[3]),h.push(n[4]);if(b){c.push(r[0][0]);c.push(r[0][1]);c.push(r[0][2]);for(k=5;9>k;k++)d.push(r[0][k]);for(k=9;13>k;k++)e.push(r[0][k]);h.push(r[0][3]);h.push(r[0][4])}if(!Gb||ga!==f.POLYGON&&ga!==g)if(!Hb||ga!==f.POLYGON&&ga!==g){if(ga===f.POINTS){for(k=0;k<
	p;k++)for(n=r[k],s=0;3>s;s++)a.push(n[s]);md(a,e)}else if(ga===f.LINES){for(k=0;k<p;k++)for(n=r[k],s=0;3>s;s++)a.push(n[s]);for(k=0;k<p;k++)for(n=r[k],s=5;9>s;s++)d.push(n[s]);Ha(a,"LINES",e)}else if(ga===f.TRIANGLES){if(2<p)for(k=0;k+2<p;k+=3){c=[];h=[];a=[];d=[];e=[];for(s=0;3>s;s++)for(b=0;3>b;b++)a.push(r[k+s][b]),c.push(r[k+s][b]);for(s=0;3>s;s++)for(b=3;5>b;b++)h.push(r[k+s][b]);for(s=0;3>s;s++)for(b=5;9>b;b++)d.push(r[k+s][b]),e.push(r[k+s][b+4]);E&&Ha(a,"LINE_LOOP",e);(W||za)&&db(c,"TRIANGLES",
	d,h)}}else if(ga===f.TRIANGLE_STRIP){if(2<p)for(k=0;k+2<p;k++){a=[];c=[];e=[];d=[];h=[];for(s=0;3>s;s++)for(b=0;3>b;b++)a.push(r[k+s][b]),c.push(r[k+s][b]);for(s=0;3>s;s++)for(b=3;5>b;b++)h.push(r[k+s][b]);for(s=0;3>s;s++)for(b=5;9>b;b++)e.push(r[k+s][b+4]),d.push(r[k+s][b]);(W||za)&&db(c,"TRIANGLE_STRIP",d,h);E&&Ha(a,"LINE_LOOP",e)}}else if(ga===f.TRIANGLE_FAN){if(2<p){for(k=0;3>k;k++)for(n=r[k],s=0;3>s;s++)a.push(n[s]);for(k=0;3>k;k++)for(n=r[k],s=9;13>s;s++)e.push(n[s]);E&&Ha(a,"LINE_LOOP",e);
	for(k=2;k+1<p;k++){a=[];e=[];a.push(r[0][0]);a.push(r[0][1]);a.push(r[0][2]);e.push(r[0][9]);e.push(r[0][10]);e.push(r[0][11]);e.push(r[0][12]);for(s=0;2>s;s++)for(b=0;3>b;b++)a.push(r[k+s][b]);for(s=0;2>s;s++)for(b=9;13>b;b++)e.push(r[k+s][b]);E&&Ha(a,"LINE_STRIP",e)}(W||za)&&db(c,"TRIANGLE_FAN",d,h)}}else if(ga===f.QUADS)for(k=0;k+3<p;k+=4){a=[];for(s=0;4>s;s++)for(n=r[k+s],b=0;3>b;b++)a.push(n[b]);E&&Ha(a,"LINE_LOOP",e);if(W){c=[];d=[];h=[];for(s=0;3>s;s++)c.push(r[k][s]);for(s=5;9>s;s++)d.push(r[k][s]);
	for(s=0;3>s;s++)c.push(r[k+1][s]);for(s=5;9>s;s++)d.push(r[k+1][s]);for(s=0;3>s;s++)c.push(r[k+3][s]);for(s=5;9>s;s++)d.push(r[k+3][s]);for(s=0;3>s;s++)c.push(r[k+2][s]);for(s=5;9>s;s++)d.push(r[k+2][s]);za&&(h.push(r[k+0][3]),h.push(r[k+0][4]),h.push(r[k+1][3]),h.push(r[k+1][4]),h.push(r[k+3][3]),h.push(r[k+3][4]),h.push(r[k+2][3]),h.push(r[k+2][4]));db(c,"TRIANGLE_STRIP",d,h)}}else if(ga===f.QUAD_STRIP){if(3<p){for(k=0;2>k;k++)for(n=r[k],s=0;3>s;s++)a.push(n[s]);for(k=0;2>k;k++)for(n=r[k],s=9;13>
	s;s++)e.push(n[s]);Ha(a,"LINE_STRIP",e);4<p&&0<p%2&&(c.splice(c.length-3),r.pop());for(k=0;k+3<p;k+=2){a=[];e=[];for(s=0;3>s;s++)a.push(r[k+1][s]);for(s=0;3>s;s++)a.push(r[k+3][s]);for(s=0;3>s;s++)a.push(r[k+2][s]);for(s=0;3>s;s++)a.push(r[k+0][s]);for(s=9;13>s;s++)e.push(r[k+1][s]);for(s=9;13>s;s++)e.push(r[k+3][s]);for(s=9;13>s;s++)e.push(r[k+2][s]);for(s=9;13>s;s++)e.push(r[k+0][s]);E&&Ha(a,"LINE_STRIP",e)}(W||za)&&db(c,"TRIANGLE_LIST",d,h)}}else if(1===p){for(s=0;3>s;s++)a.push(r[0][s]);for(s=
	9;13>s;s++)e.push(r[0][s]);md(a,e)}else{for(k=0;k<p;k++){n=r[k];for(s=0;3>s;s++)a.push(n[s]);for(s=5;9>s;s++)e.push(n[s])}E&&b?Ha(a,"LINE_LOOP",e):E&&!b&&Ha(a,"LINE_STRIP",e);(W||za)&&db(c,"TRIANGLE_FAN",d,h)}za=!1;m.useProgram(B);ca("usingTexture3d",B,"uUsingTexture",za)}else a=c,a.splice(a.length-3),e.splice(e.length-4),E&&Ha(a,null,e),W&&db(c,"TRIANGLES",d);else E&&Ha(c,null,e),W&&db(c,null,d);Hb=Gb=!1;Aa=[];ua=0}};var nd=function(a,b){var c=1/a,d=c*c,f=d*c;b.set(0,0,0,1,f,d,c,0,6*f,2*d,0,0,6*
	f,0,0,0)},od=function(){Bb||(Wb=new G,Bb=new G,Qc=!0);var a=tc;Wb.set((a-1)/2,(a+3)/2,(-3-a)/2,(1-a)/2,1-a,(-5-a)/2,a+2,(a-1)/2,(a-1)/2,0,(1-a)/2,0,0,1,0,0);nd(uc,Bb);zc||(jc=new G);jc.set(Wb);jc.preApply(zc);Bb.apply(Wb)};C.prototype.bezierVertex=function(){Hb=!0;var a=[];if(mb)throw"vertex() must be used at least once before calling bezierVertex()";for(var b=0;b<arguments.length;b++)a[b]=arguments[b];r.push(a);r[r.length-1].isVert=!1};K.prototype.bezierVertex=function(){Hb=!0;if(mb)throw"vertex() must be used at least once before calling bezierVertex()";
	if(9===arguments.length){Cb===g&&(Cb=new G);var a=r.length-1;nd(vc,Cb);Cb.apply(Ac);for(var b=Cb.array(),c=r[a][0],f=r[a][1],a=r[a][2],e=b[4]*c+b[5]*arguments[0]+b[6]*arguments[3]+b[7]*arguments[6],h=b[8]*c+b[9]*arguments[0]+b[10]*arguments[3]+b[11]*arguments[6],m=b[12]*c+b[13]*arguments[0]+b[14]*arguments[3]+b[15]*arguments[6],k=b[4]*f+b[5]*arguments[1]+b[6]*arguments[4]+b[7]*arguments[7],n=b[8]*f+b[9]*arguments[1]+b[10]*arguments[4]+b[11]*arguments[7],p=b[12]*f+b[13]*arguments[1]+b[14]*arguments[4]+
	b[15]*arguments[7],q=b[4]*a+b[5]*arguments[2]+b[6]*arguments[5]+b[7]*arguments[8],u=b[8]*a+b[9]*arguments[2]+b[10]*arguments[5]+b[11]*arguments[8],b=b[12]*a+b[13]*arguments[2]+b[14]*arguments[5]+b[15]*arguments[8],x=0;x<vc;x++)c+=e,e+=h,h+=m,f+=k,k+=n,n+=p,a+=q,q+=u,u+=b,d.vertex(c,f,a);d.vertex(arguments[6],arguments[7],arguments[8])}};d.texture=function(a){var b=ma.$ensureContext();if(a.__texture)b.bindTexture(b.TEXTURE_2D,a.__texture);else{if("canvas"===a.localName)b.bindTexture(b.TEXTURE_2D,Yc),
	b.texImage2D(b.TEXTURE_2D,0,b.RGBA,b.RGBA,b.UNSIGNED_BYTE,a),b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MAG_FILTER,b.LINEAR),b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MIN_FILTER,b.LINEAR),b.generateMipmap(b.TEXTURE_2D);else{var c=b.createTexture(),d=q.createElement("canvas"),f=d.getContext("2d"),e;if(a.width&0===a.width-1)d.width=a.width;else{for(e=1;e<a.width;)e*=2;d.width=e}if(a.height&0===a.height-1)d.height=a.height;else{for(e=1;e<a.height;)e*=2;d.height=e}f.drawImage(a.sourceImg,0,0,a.width,a.height,
	0,0,d.width,d.height);b.bindTexture(b.TEXTURE_2D,c);b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MIN_FILTER,b.LINEAR_MIPMAP_LINEAR);b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MAG_FILTER,b.LINEAR);b.texParameteri(b.TEXTURE_2D,b.TEXTURE_WRAP_T,b.CLAMP_TO_EDGE);b.texParameteri(b.TEXTURE_2D,b.TEXTURE_WRAP_S,b.CLAMP_TO_EDGE);b.texImage2D(b.TEXTURE_2D,0,b.RGBA,b.RGBA,b.UNSIGNED_BYTE,d);b.generateMipmap(b.TEXTURE_2D);a.__texture=c}$c=a.width;ad=a.height}za=!0;b.useProgram(B);ca("usingTexture3d",B,"uUsingTexture",
	za)};d.textureMode=function(a){bd=a};C.prototype.curveVertex=function(a,b){Gb=!0;d.vertex(a,b)};K.prototype.curveVertex=function(a,b,c){Gb=!0;Qc||od();var f=[];f[0]=a;f[1]=b;f[2]=c;Aa.push(f);ua++;if(3<ua){var e=Aa[ua-4][0],g=Aa[ua-4][1],h=Aa[ua-4][2],m=Aa[ua-3][0],k=Aa[ua-3][1],n=Aa[ua-3][2],p=Aa[ua-2][0],q=Aa[ua-2][1],r=Aa[ua-2][2],u=Aa[ua-1][0],x=Aa[ua-1][1],z=Aa[ua-1][2];a=m;b=k;c=n;var L=Bb.array(),f=L[4]*e+L[5]*m+L[6]*p+L[7]*u,y=L[8]*e+L[9]*m+L[10]*p+L[11]*u,e=L[12]*e+L[13]*m+L[14]*p+L[15]*
	u,m=L[4]*g+L[5]*k+L[6]*q+L[7]*x,p=L[8]*g+L[9]*k+L[10]*q+L[11]*x,g=L[12]*g+L[13]*k+L[14]*q+L[15]*x,k=L[4]*h+L[5]*n+L[6]*r+L[7]*z,q=L[8]*h+L[9]*n+L[10]*r+L[11]*z,h=L[12]*h+L[13]*n+L[14]*r+L[15]*z;d.vertex(a,b,c);for(n=0;n<uc;n++)a+=f,f+=y,y+=e,b+=m,m+=p,p+=g,c+=k,k+=q,q+=h,d.vertex(a,b,c)}};C.prototype.curve=function(a,b,c,f,e,g,h,m){d.beginShape();d.curveVertex(a,b);d.curveVertex(c,f);d.curveVertex(e,g);d.curveVertex(h,m);d.endShape()};K.prototype.curve=function(a,b,c,f,e,h,m,k,n,p,q,r){r!==g?(d.beginShape(),
	d.curveVertex(a,b,c),d.curveVertex(f,e,h),d.curveVertex(m,k,n),d.curveVertex(p,q,r)):(d.beginShape(),d.curveVertex(a,b),d.curveVertex(c,f),d.curveVertex(e,h),d.curveVertex(m,k));d.endShape()};d.curveTightness=function(a){tc=a};d.curveDetail=function(a){uc=a;od()};d.rectMode=function(a){wa=a};d.imageMode=function(a){switch(a){case f.CORNER:qc=kd;break;case f.CORNERS:qc=Ad;break;case f.CENTER:qc=Bd;break;default:throw"Invalid imageMode";}};d.ellipseMode=function(a){ra=a};d.arc=function(a,b,c,e,g,h){if(!(0>=
	c||h<g)){ra===f.CORNERS?(c-=a,e-=b):ra===f.RADIUS?(a-=c,b-=e,c*=2,e*=2):ra===f.CENTER&&(a-=c/2,b-=e/2);for(;0>g;)g+=f.TWO_PI,h+=f.TWO_PI;h-g>f.TWO_PI&&(g=0,h=f.TWO_PI);c/=2;e/=2;a+=c;b+=e;g=0|0.5+2*g*d.RAD_TO_DEG;h=0|0.5+2*h*d.RAD_TO_DEG;var m,k;if(W){var n=E;E=!1;d.beginShape();d.vertex(a,b);for(m=g;m<=h;m++)k=m%f.SINCOS_LENGTH,d.vertex(a+Zb[k]*c,b+Yb[k]*e);d.endShape(f.CLOSE);E=n}if(E){n=W;W=!1;d.beginShape();for(m=g;m<=h;m++)k=m%f.SINCOS_LENGTH,d.vertex(a+Zb[k]*c,b+Yb[k]*e);d.endShape();W=n}}};
	C.prototype.line=function(a,b,c,f){if(E)if(pa||(a=Math.round(a),c=Math.round(c),b=Math.round(b),f=Math.round(f)),a===c&&b===f)d.point(a,b);else{for(var e=g,h=g,k=!0,e=P.array(),n=[1,0,0,0,1,0],s=0;6>s&&k;s++)k=e[s]===n[s];k&&(a===c?(b>f&&(e=b,b=f,f=e),f++,1===ja%2&&m.translate(0.5,0)):b===f&&(a>c&&(e=a,a=c,c=e),c++,1===ja%2&&m.translate(0,0.5)),1===ja&&(h=m.lineCap,m.lineCap="butt"));m.beginPath();m.moveTo(a||0,b||0);m.lineTo(c||0,f||0);Ea();k&&(a===c&&1===ja%2?m.translate(-0.5,0):b===f&&1===ja%2&&
	m.translate(0,-0.5),1===ja&&(m.lineCap=h))}};K.prototype.line=function(a,b,c,f,e,h){if(e===g||h===g)h=0,e=f,f=c,c=0;a===f&&b===e&&c===h?d.point(a,b,c):(a=[a,b,c,f,e,h],b=new G,b.scale(1,-1,1),b.apply(P.array()),b.transpose(),0<ja&&E&&(m.useProgram(N),Z("uModel2d",N,"uModel",!1,[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]),Z("uView2d",N,"uView",!1,b.array()),Y("uColor2d",N,"uColor",ba),ca("uIsDrawingText",N,"uIsDrawingText",!1),fa("aVertex2d",N,"aVertex",3,Fc),xa("aTextureCoord2d",N,"aTextureCoord"),m.bufferData(m.ARRAY_BUFFER,
	new O(a),m.STREAM_DRAW),m.drawArrays(m.LINES,0,2)))};C.prototype.bezier=function(){if(8!==arguments.length)throw"You must use 8 parameters for bezier() in 2D mode";d.beginShape();d.vertex(arguments[0],arguments[1]);d.bezierVertex(arguments[2],arguments[3],arguments[4],arguments[5],arguments[6],arguments[7]);d.endShape()};K.prototype.bezier=function(){if(12!==arguments.length)throw"You must use 12 parameters for bezier() in 3D mode";d.beginShape();d.vertex(arguments[0],arguments[1],arguments[2]);d.bezierVertex(arguments[3],
	arguments[4],arguments[5],arguments[6],arguments[7],arguments[8],arguments[9],arguments[10],arguments[11]);d.endShape()};d.bezierDetail=function(a){vc=a};d.bezierPoint=function(a,b,c,d,f){return(1-f)*(1-f)*(1-f)*a+3*(1-f)*(1-f)*f*b+3*(1-f)*f*f*c+f*f*f*d};d.bezierTangent=function(a,b,c,d,f){return 3*f*f*(-a+3*b-3*c+d)+6*f*(a-2*b+c)+3*(-a+b)};d.curvePoint=function(a,b,c,d,f){return 0.5*(2*b+(-a+c)*f+(2*a-5*b+4*c-d)*f*f+(-a+3*b-3*c+d)*f*f*f)};d.curveTangent=function(a,b,c,d,f){return 0.5*(-a+c+2*(2*
	a-5*b+4*c-d)*f+3*(-a+3*b-3*c+d)*f*f)};d.triangle=function(a,b,c,e,g,h){d.beginShape(f.TRIANGLES);d.vertex(a,b,0);d.vertex(c,e,0);d.vertex(g,h,0);d.endShape()};d.quad=function(a,b,c,e,g,h,m,k){d.beginShape(f.QUADS);d.vertex(a,b,0);d.vertex(c,e,0);d.vertex(g,h,0);d.vertex(m,k,0);d.endShape()};C.prototype.rect=function(a,b,c,d,e,h,k,n){if(c||d)if(wa===f.CORNERS?(c-=a,d-=b):wa===f.RADIUS?(c*=2,d*=2,a-=c/2,b-=d/2):wa===f.CENTER&&(a-=c/2,b-=d/2),pa||(a=Math.round(a),b=Math.round(b),c=Math.round(c),d=Math.round(d)),
	e!==g){n===g&&(n=k=h=e);var s=c/2,p=d/2;if(e>s||e>p)e=Math.min(s,p);if(h>s||h>p)h=Math.min(s,p);if(k>s||k>p)k=Math.min(s,p);if(n>s||n>p)n=Math.min(s,p);W&&!E||m.translate(0.5,0.5);m.beginPath();m.moveTo(a+e,b);m.lineTo(a+c-h,b);m.quadraticCurveTo(a+c,b,a+c,b+h);m.lineTo(a+c,b+d-k);m.quadraticCurveTo(a+c,b+d,a+c-k,b+d);m.lineTo(a+n,b+d);m.quadraticCurveTo(a,b+d,a,b+d-n);m.lineTo(a,b+e);m.quadraticCurveTo(a,b,a+e,b);W&&!E||m.translate(-0.5,-0.5);Ba();Ea()}else E&&1===ja%2&&m.translate(0.5,0.5),m.beginPath(),
	m.rect(a,b,c,d),Ba(),Ea(),E&&1===ja%2&&m.translate(-0.5,-0.5)};K.prototype.rect=function(a,b,c,d,e,h,k,n){if(e!==g)throw"rect() with rounded corners is not supported in 3D mode";wa===f.CORNERS?(c-=a,d-=b):wa===f.RADIUS?(c*=2,d*=2,a-=c/2,b-=d/2):wa===f.CENTER&&(a-=c/2,b-=d/2);e=new G;e.translate(a,b,0);e.scale(c,d,1);e.transpose();b=new G;b.scale(1,-1,1);b.apply(P.array());b.transpose();0<ja&&E&&(m.useProgram(N),Z("uModel2d",N,"uModel",!1,e.array()),Z("uView2d",N,"uView",!1,b.array()),Y("uColor2d",
	N,"uColor",ba),ca("uIsDrawingText2d",N,"uIsDrawingText",!1),fa("aVertex2d",N,"aVertex",3,kc),xa("aTextureCoord2d",N,"aTextureCoord"),m.drawArrays(m.LINE_LOOP,0,Mc.length/3));W&&(m.useProgram(B),Z("uModel3d",B,"uModel",!1,e.array()),Z("uView3d",B,"uView",!1,b.array()),m.enable(m.POLYGON_OFFSET_FILL),m.polygonOffset(1,1),Y("color3d",B,"uColor",qa),0<S?(a=new G,a.set(b),b=new G,b.set(e),a.mult(b),b=new G,b.set(a),b.invert(),b.transpose(),Z("uNormalTransform3d",B,"uNormalTransform",!1,b.array()),fa("aNormal3d",
	B,"aNormal",3,Ec)):xa("normal3d",B,"aNormal"),fa("vertex3d",B,"aVertex",3,kc),m.drawArrays(m.TRIANGLE_FAN,0,Mc.length/3),m.disable(m.POLYGON_OFFSET_FILL))};C.prototype.ellipse=function(a,b,c,e){a=a||0;b=b||0;if(!(0>=c&&0>=e))if(ra===f.RADIUS?(c*=2,e*=2):ra===f.CORNERS?(c-=a,e-=b,a+=c/2,b+=e/2):ra===f.CORNER&&(a+=c/2,b+=e/2),c===e)m.beginPath(),m.arc(a,b,c/2,0,f.TWO_PI,!1),Ba(),Ea();else{c/=2;e/=2;var g=0.5522847498307933*c,h=0.5522847498307933*e;d.beginShape();d.vertex(a+c,b);d.bezierVertex(a+c,b-
	h,a+g,b-e,a,b-e);d.bezierVertex(a-g,b-e,a-c,b-h,a-c,b);d.bezierVertex(a-c,b+h,a-g,b+e,a,b+e);d.bezierVertex(a+g,b+e,a+c,b+h,a+c,b);d.endShape()}};K.prototype.ellipse=function(a,b,c,e){a=a||0;b=b||0;if(!(0>=c&&0>=e)){ra===f.RADIUS?(c*=2,e*=2):ra===f.CORNERS?(c-=a,e-=b,a+=c/2,b+=e/2):ra===f.CORNER&&(a+=c/2,b+=e/2);c/=2;e/=2;var g=0.5522847498307933*c,h=0.5522847498307933*e;d.beginShape();d.vertex(a+c,b);d.bezierVertex(a+c,b-h,0,a+g,b-e,0,a,b-e,0);d.bezierVertex(a-g,b-e,0,a-c,b-h,0,a-c,b,0);d.bezierVertex(a-
	c,b+h,0,a-g,b+e,0,a,b+e,0);d.bezierVertex(a+g,b+e,0,a+c,b+h,0,a+c,b,0);d.endShape();if(W){for(g=e=c=0;g<r.length;g++)c+=r[g][0],e+=r[g][1];c/=r.length;e/=r.length;g=[];a=[];b=[];g[0]=c;g[1]=e;g[2]=0;g[3]=0;g[4]=0;g[5]=qa[0];g[6]=qa[1];g[7]=qa[2];g[8]=qa[3];g[9]=ba[0];g[10]=ba[1];g[11]=ba[2];g[12]=ba[3];g[13]=Kb;g[14]=Ib;g[15]=yb;r.unshift(g);for(g=0;g<r.length;g++){for(c=0;3>c;c++)a.push(r[g][c]);for(c=5;9>c;c++)b.push(r[g][c])}db(a,"TRIANGLE_FAN",b)}}};d.normal=function(a,b,c){if(3!==arguments.length||
	"number"!==typeof a||"number"!==typeof b||"number"!==typeof c)throw"normal() requires three numeric arguments.";Kb=a;Ib=b;yb=c;0!==ga&&(nb===f.NORMAL_MODE_AUTO?nb=f.NORMAL_MODE_SHAPE:nb===f.NORMAL_MODE_SHAPE&&(nb=f.NORMAL_MODE_VERTEX))};d.save=function(a,b){return b!==g?n.open(b.toDataURL(),"_blank"):n.open(d.externals.canvas.toDataURL(),"_blank")};var Cd=0;d.saveFrame=function(a){a===g&&(a="screen-####.png");a=a.replace(/#+/,function(a){for(var b=""+Cd++;b.length<a.length;)b="0"+b;return b});d.save(a)};
	var Dd=q.createElement("canvas").getContext("2d"),Sc=[g,g,g],La=function(a,b,c){this.__isDirty=!1;if(a instanceof V)this.fromHTMLImageData(a);else if(b||c){this.width=a||1;this.height=b||1;a=this.sourceImg=q.createElement("canvas");a.width=this.width;a.height=this.height;this.imageData=a.getContext("2d").createImageData(this.width,this.height);this.format=c===f.ARGB||c===f.ALPHA?c:f.RGB;if(this.format===f.RGB)for(c=3,a=this.imageData.data,b=a.length;c<b;c+=4)a[c]=255;this.__isDirty=!0;this.updatePixels()}else this.height=
	this.width=0,this.imageData=Dd.createImageData(1,1),this.format=f.ARGB;this.pixels=Nb(this)};La.prototype={__isPImage:!0,updatePixels:function(){var a=this.sourceImg;a&&(a instanceof D&&this.__isDirty)&&a.getContext("2d").putImageData(this.imageData,0,0);this.__isDirty=!1},fromHTMLImageData:function(a){var b=Na(a);try{var c=b.context.getImageData(0,0,a.width,a.height);this.fromImageData(c)}catch(d){a.width&&a.height&&(this.isRemote=!0,this.width=a.width,this.height=a.height)}this.sourceImg=a},get:function(a,
	b,c,f){if(!arguments.length)return d.get(this);if(2===arguments.length)return d.get(a,b,this);if(4===arguments.length)return d.get(a,b,c,f,this)},set:function(a,b,c){d.set(a,b,c,this);this.__isDirty=!0},blend:function(a,b,c,f,e,g,h,m,k,n){9===arguments.length?d.blend(this,a,b,c,f,e,g,h,m,k,this):10===arguments.length&&d.blend(a,b,c,f,e,g,h,m,k,n,this);delete this.sourceImg},copy:function(a,b,c,e,g,h,m,k,n){8===arguments.length?d.blend(this,a,b,c,e,g,h,m,k,f.REPLACE,this):9===arguments.length&&d.blend(a,
	b,c,e,g,h,m,k,n,f.REPLACE,this);delete this.sourceImg},filter:function(a,b){2===arguments.length?d.filter(a,b,this):1===arguments.length&&d.filter(a,null,this);delete this.sourceImg},save:function(a){d.save(a,this)},resize:function(a,b){if(this.isRemote)throw"Image is loaded remotely. Cannot resize.";if(0!==this.width||0!==this.height){0===a&&0!==b?a=Math.floor(this.width/this.height*b):0===b&&0!==a&&(b=Math.floor(this.height/this.width*a));var c=Na(this.imageData).canvas,c=Na(c,a,b).context.getImageData(0,
	0,a,b);this.fromImageData(c)}},mask:function(a){var b=this.toImageData(),c,d;if(a instanceof La||a.__isPImage)if(a.width===this.width&&a.height===this.height)for(a=a.toImageData(),c=2,d=4*this.width*this.height;c<d;c+=4)b.data[c+1]=a.data[c];else throw"mask must have the same dimensions as PImage.";else if(a instanceof Array)if(this.width*this.height===a.length)for(c=0,d=a.length;c<d;++c)b.data[4*c+3]=a[c];else throw"mask array must be the same length as PImage pixels array.";this.fromImageData(b)},
	loadPixels:y,toImageData:function(){return this.isRemote?this.sourceImg:this.__isDirty?Na(this.sourceImg).context.getImageData(0,0,this.width,this.height):this.imageData},toDataURL:function(){if(this.isRemote)throw"Image is loaded remotely. Cannot create dataURI.";return Na(this.imageData).canvas.toDataURL()},fromImageData:function(a){var b=a.width,c=a.height,d=q.createElement("canvas"),e=d.getContext("2d");this.width=d.width=b;this.height=d.height=c;e.putImageData(a,0,0);this.format=f.ARGB;this.imageData=
	a;this.sourceImg=d}};d.PImage=La;d.createImage=function(a,b,c){return new La(a,b,c)};d.loadImage=function(a,b,c){if(ia.imageCache.images[a])return b=new La(ia.imageCache.images[a]),b.loaded=!0,b;b=new La;var d=q.createElement("img");b.sourceImg=d;d.onload=function(a,b,c){return function(){b.fromHTMLImageData(a);b.loaded=!0;c&&c()}}(d,b,c);d.src=a;return b};d.requestImage=d.loadImage;d.get=function(a,b,c,e,g){if(void 0!==g)return Pb(a,b,c,e,g);if(void 0!==e)return Ob(a,b,c,e);if(void 0!==c){if(c.isRemote)throw"Image is loaded remotely. Cannot get x,y.";
	a=4*b*c.width+4*a;c=c.imageData.data;return c[a+3]<<24&f.ALPHA_MASK|c[a]<<16&f.RED_MASK|c[a+1]<<8&f.GREEN_MASK|c[a+2]&f.BLUE_MASK}return void 0!==b?(a>=d.width||0>a||0>b||b>=d.height?c=0:Vb?(a=4*((0|a)+d.width*(0|b)),c=d.imageData.data,c=c[a+3]<<24&f.ALPHA_MASK|c[a]<<16&f.RED_MASK|c[a+1]<<8&f.GREEN_MASK|c[a+2]&f.BLUE_MASK):(c=d.toImageData(0|a,0|b,1,1).data,c=c[3]<<24&f.ALPHA_MASK|c[0]<<16&f.RED_MASK|c[1]<<8&f.GREEN_MASK|c[2]&f.BLUE_MASK),c):void 0!==a?Pb(0,0,a.width,a.height,a):Ob(0,0,d.width,d.height)};
	d.createGraphics=function(a,b,c){var d=new R;d.size(a,b,c);d.background(0,0);return d};d.set=function(a,b,c,f){if(3===arguments.length)"number"===typeof c?a<d.width&&(0<=a&&0<=b&&b<d.height)&&(Vb||(d.loadPixels(),null===Kc&&(Tc=m,Kc=new Qb),Vb=!0,m=Kc,cd=0),d.pixels.setPixel((0|a)+d.width*(0|b),c),++cd>dd&&jb()):(c instanceof La||c.__isPImage)&&d.image(c,a,b);else if(4===arguments.length){if(f.isRemote)throw"Image is loaded remotely. Cannot set x,y.";var e=d.color.toArray(c),g=4*b*f.width+4*a,h=f.imageData.data;
	h[g]=e[0];h[g+1]=e[1];h[g+2]=e[2];h[g+3]=e[3]}};d.imageData={};d.pixels={getLength:function(){return d.imageData.data.length?d.imageData.data.length/4:0},getPixel:function(a){a*=4;var b=d.imageData.data;return b[a+3]<<24&4278190080|b[a+0]<<16&16711680|b[a+1]<<8&65280|b[a+2]&255},setPixel:function(a,b){var c=4*a,f=d.imageData.data;f[c+0]=(b&16711680)>>>16;f[c+1]=(b&65280)>>>8;f[c+2]=b&255;f[c+3]=(b&4278190080)>>>24},toArray:function(){for(var a=[],b=d.imageData.width*d.imageData.height,c=d.imageData.data,
	f=0,e=0;f<b;f++,e+=4)a.push(c[e+3]<<24&4278190080|c[e+0]<<16&16711680|c[e+1]<<8&65280|c[e+2]&255);return a},set:function(a){for(var b=0,c=a.length;b<c;b++)this.setPixel(b,a[b])}};d.loadPixels=function(){d.imageData=ma.$ensureContext().getImageData(0,0,d.width,d.height)};d.updatePixels=function(){d.imageData&&ma.$ensureContext().putImageData(d.imageData,0,0)};d.hint=function(a){var b=ma.$ensureContext();a===f.DISABLE_DEPTH_TEST?(b.disable(b.DEPTH_TEST),b.depthMask(!1),b.clear(b.DEPTH_BUFFER_BIT)):
	a===f.ENABLE_DEPTH_TEST?(b.enable(b.DEPTH_TEST),b.depthMask(!0)):a===f.ENABLE_OPENGL_2X_SMOOTH||a===f.ENABLE_OPENGL_4X_SMOOTH?pa=!0:a===f.DISABLE_OPENGL_2X_SMOOTH&&(pa=!1)};var pd=function(a,b,c,f){if(a instanceof La||a.__isPImage){if(!a.loaded)throw"Error using image in background(): PImage not loaded.";if(a.width!==d.width||a.height!==d.height)throw"Background image must be the same dimensions as the canvas.";}else a=d.color(a,b,c,f);ob=a};C.prototype.background=function(a,b,c,f){a!==g&&pd(a,b,
	c,f);ob instanceof La||ob.__isPImage?(m.save(),m.setTransform(1,0,0,1,0,0),d.image(ob,0,0)):(m.save(),m.setTransform(1,0,0,1,0,0),d.alpha(ob)!==na&&m.clearRect(0,0,d.width,d.height),m.fillStyle=d.color.toString(ob),m.fillRect(0,0,d.width,d.height),Q=!0);Wa()};K.prototype.background=function(a,b,c,f){0<arguments.length&&pd(a,b,c,f);var e=d.color.toGLArray(ob);m.clearColor(e[0],e[1],e[2],e[3]);m.clear(m.COLOR_BUFFER_BIT|m.DEPTH_BUFFER_BIT)};C.prototype.image=function(a,b,c,d,f){b=Math.round(b);c=Math.round(c);
	if(0<a.width){var e=qc(b||0,c||0,d||a.width,f||a.height,4>arguments.length);if(a.sourceImg&&null===kb){var g=a.sourceImg;a.__isDirty&&a.updatePixels();m.drawImage(g,0,0,g.width,g.height,e.x,e.y,e.w,e.h)}else g=a.toImageData(),null!==kb&&(kb(g),a.__isDirty=!0),m.drawImage(Na(g).canvas,0,0,a.width,a.height,e.x,e.y,e.w,e.h)}};K.prototype.image=function(a,b,c,e,f){0<a.width&&(b=Math.round(b),c=Math.round(c),e=e||a.width,f=f||a.height,d.beginShape(d.QUADS),d.texture(a),d.vertex(b,c,0,0,0),d.vertex(b,c+
	f,0,0,f),d.vertex(b+e,c+f,0,e,f),d.vertex(b+e,c,0,e,0),d.endShape())};d.tint=function(a,b,c,e){a=d.color(a,b,c,e);var f=d.red(a)/Ca,g=d.green(a)/Ja,h=d.blue(a)/Da,m=d.alpha(a)/na;kb=function(a){var b=a.data;a=4*a.width*a.height;for(var c=0;c<a;)b[c++]*=f,b[c++]*=g,b[c++]*=h,b[c++]*=m};xc=function(a){for(var b=0;b<a.length;)a[b++]=f,a[b++]=g,a[b++]=h,a[b++]=m}};d.noTint=function(){xc=kb=null};d.copy=function(a,b,c,e,h,m,k,n,p){p===g&&(p=n,n=k,k=m,m=h,h=e,e=c,c=b,b=a,a=d);d.blend(a,b,c,e,h,m,k,n,p,
	f.REPLACE)};d.blend=function(a,b,c,e,f,h,m,k,n,p,q){if(a.isRemote)throw"Image is loaded remotely. Cannot blend image.";p===g&&(p=n,n=k,k=m,m=h,h=f,f=e,e=c,c=b,b=a,a=d);e=b+e;f=c+f;k=h+k;n=m+n;var r=q||d;q!==g&&p!==g||d.loadPixels();a.loadPixels();a===d&&d.intersect(b,c,e,f,h,m,k,n)?d.blit_resize(d.get(b,c,e-b,f-c),0,0,e-b-1,f-c-1,r.imageData.data,r.width,r.height,h,m,k,n,p):d.blit_resize(a,b,c,e,f,r.imageData.data,r.width,r.height,h,m,k,n,p);q===g&&d.updatePixels()};var qd=function(a,b){var c=0,d=
	b.pixels.getLength(),e=new u(d),f,g,h,m,k,n,p,q,r,x,z,L;if(a)for(;c<d;)for(f=c,g=c+b.width;c<g;)h=m=b.pixels.getPixel(c),n=c-1,k=c+1,p=c-b.width,q=c+b.width,n<f&&(n=c),k>=g&&(k=c),0>p&&(p=0),q>=d&&(q=c),p=b.pixels.getPixel(p),n=b.pixels.getPixel(n),q=b.pixels.getPixel(q),k=b.pixels.getPixel(k),h=77*(h>>16&255)+151*(h>>8&255)+28*(h&255),x=77*(n>>16&255)+151*(n>>8&255)+28*(n&255),r=77*(k>>16&255)+151*(k>>8&255)+28*(k&255),z=77*(p>>16&255)+151*(p>>8&255)+28*(p&255),L=77*(q>>16&255)+151*(q>>8&255)+28*
	(q&255),x<h&&(m=n,h=x),r<h&&(m=k,h=r),z<h&&(m=p,h=z),L<h&&(m=q),e[c++]=m;else for(;c<d;)for(f=c,g=c+b.width;c<g;)h=m=b.pixels.getPixel(c),n=c-1,k=c+1,p=c-b.width,q=c+b.width,n<f&&(n=c),k>=g&&(k=c),0>p&&(p=0),q>=d&&(q=c),p=b.pixels.getPixel(p),n=b.pixels.getPixel(n),q=b.pixels.getPixel(q),k=b.pixels.getPixel(k),h=77*(h>>16&255)+151*(h>>8&255)+28*(h&255),x=77*(n>>16&255)+151*(n>>8&255)+28*(n&255),r=77*(k>>16&255)+151*(k>>8&255)+28*(k&255),z=77*(p>>16&255)+151*(p>>8&255)+28*(p&255),L=77*(q>>16&255)+
	151*(q>>8&255)+28*(q&255),x>h&&(m=n,h=x),r>h&&(m=k,h=r),z>h&&(m=p,h=z),L>h&&(m=q),e[c++]=m;b.pixels.set(e)};d.filter=function(a,b,c){var e,h,m,k;3===arguments.length?(c.loadPixels(),e=c):(d.loadPixels(),e=d);b===g&&(b=null);if(e.isRemote)throw"Image is loaded remotely. Cannot filter image.";var n=e.pixels.getLength();switch(a){case f.BLUR:var p=b||1,q=e,r,u,x,v,z,y,L,B,D;m=q.pixels.getLength();k=new O(m);n=new O(m);h=new O(m);m=new O(m);var E=0,F,I,H,p=d.floor(3.5*p),C,p=1>p?1:248>p?p:248;if(d.shared.blurRadius!==
	p){d.shared.blurRadius=p;d.shared.blurKernelSize=1+(d.shared.blurRadius<<1);d.shared.blurKernel=new O(d.shared.blurKernelSize);var J=d.shared.blurKernel,K=d.shared.blurKernelSize;for(C=0;C<K;C++)J[C]=0;K=(p-1)*(p-1);for(C=1;C<p;C++)J[p+C]=J[p-C]=K;J[p]=p*p}p=q.height;C=q.width;J=d.shared.blurKernelSize;B=d.shared.blurRadius;var K=d.shared.blurKernel,G=q.imageData.data;for(I=0;I<p;I++){for(F=0;F<C;F++){x=u=r=v=q=0;y=F-B;if(0>y)z=-y,y=0;else{if(y>=C)break;z=0}for(H=z;H<J&&!(y>=C);H++)L=4*(y+E),z=K[H],
	v+=z*G[L+3],r+=z*G[L],u+=z*G[L+1],x+=z*G[L+2],q+=z,y++;L=E+F;m[L]=v/q;k[L]=r/q;n[L]=u/q;h[L]=x/q}E+=C}E=0;B=-B;D=B*C;for(I=0;I<p;I++){for(F=0;F<C;F++){x=u=r=v=q=0;if(0>B)z=L=-B,y=F;else{if(B>=p)break;z=0;L=B;y=F+D}for(H=z;H<J&&!(L>=p);H++)z=K[H],v+=z*m[y],r+=z*k[y],u+=z*n[y],x+=z*h[y],q+=z,L++,y+=C;L=4*(F+E);G[L]=r/q;G[L+1]=u/q;G[L+2]=x/q;G[L+3]=v/q}E+=C;D+=C;B++}break;case f.GRAY:if(e.format===f.ALPHA){for(k=0;k<n;k++)h=255-e.pixels.getPixel(k),e.pixels.setPixel(k,4278190080|h<<16|h<<8|h);e.format=
	f.RGB}else for(k=0;k<n;k++)h=e.pixels.getPixel(k),m=77*(h>>16&255)+151*(h>>8&255)+28*(h&255)>>8,e.pixels.setPixel(k,h&f.ALPHA_MASK|m<<16|m<<8|m);break;case f.INVERT:for(k=0;k<n;k++)e.pixels.setPixel(k,e.pixels.getPixel(k)^16777215);break;case f.POSTERIZE:if(null===b)throw"Use filter(POSTERIZE, int levels) instead of filter(POSTERIZE)";h=d.floor(b);if(2>h||255<h)throw"Levels must be between 2 and 255 for filter(POSTERIZE, levels)";m=h-1;for(k=0;k<n;k++)E=e.pixels.getPixel(k)>>16&255,p=e.pixels.getPixel(k)>>
	8&255,C=e.pixels.getPixel(k)&255,E=255*(E*h>>8)/m,p=255*(p*h>>8)/m,C=255*(C*h>>8)/m,e.pixels.setPixel(k,4278190080&e.pixels.getPixel(k)|E<<16|p<<8|C);break;case f.OPAQUE:for(k=0;k<n;k++)e.pixels.setPixel(k,e.pixels.getPixel(k)|4278190080);e.format=f.RGB;break;case f.THRESHOLD:null===b&&(b=0.5);if(0>b||1<b)throw"Level must be between 0 and 1 for filter(THRESHOLD, level)";h=d.floor(255*b);for(k=0;k<n;k++)m=d.max((e.pixels.getPixel(k)&f.RED_MASK)>>16,d.max((e.pixels.getPixel(k)&f.GREEN_MASK)>>8,e.pixels.getPixel(k)&
	f.BLUE_MASK)),e.pixels.setPixel(k,e.pixels.getPixel(k)&f.ALPHA_MASK|(m<h?0:16777215));break;case f.ERODE:qd(!0,e);break;case f.DILATE:qd(!1,e)}e.updatePixels()};d.shared={fracU:0,ifU:0,fracV:0,ifV:0,u1:0,u2:0,v1:0,v2:0,sX:0,sY:0,iw:0,iw1:0,ih1:0,ul:0,ll:0,ur:0,lr:0,cUL:0,cLL:0,cUR:0,cLR:0,srcXOffset:0,srcYOffset:0,r:0,g:0,b:0,a:0,srcBuffer:null,blurRadius:0,blurKernelSize:0,blurKernel:null};d.intersect=function(a,b,c,d,e,f,g,h){c=c-a+1;d=d-b+1;g=g-e+1;h=h-f+1;e<a?(g+=e-a,g>c&&(g=c)):(a=c+a-e,g>a&&
	(g=a));f<b?(h+=f-b,h>d&&(h=d)):(b=d+b-f,h>b&&(h=b));return!(0>=g||0>=h)};var va={};va[f.BLEND]=d.modes.blend;va[f.ADD]=d.modes.add;va[f.SUBTRACT]=d.modes.subtract;va[f.LIGHTEST]=d.modes.lightest;va[f.DARKEST]=d.modes.darkest;va[f.REPLACE]=d.modes.replace;va[f.DIFFERENCE]=d.modes.difference;va[f.EXCLUSION]=d.modes.exclusion;va[f.MULTIPLY]=d.modes.multiply;va[f.SCREEN]=d.modes.screen;va[f.OVERLAY]=d.modes.overlay;va[f.HARD_LIGHT]=d.modes.hard_light;va[f.SOFT_LIGHT]=d.modes.soft_light;va[f.DODGE]=d.modes.dodge;
	va[f.BURN]=d.modes.burn;d.blit_resize=function(a,b,c,e,g,h,m,k,n,p,q,r,u){0>b&&(b=0);0>c&&(c=0);e>=a.width&&(e=a.width-1);g>=a.height&&(g=a.height-1);e-=b;g-=c;q-=n;r-=p;if(!(0>=q||0>=r||0>=e||0>=g||n>=m||p>=k||b>=a.width||c>=a.height)){e=Math.floor(e/q*f.PRECISIONF);g=Math.floor(g/r*f.PRECISIONF);var v=d.shared;v.srcXOffset=Math.floor(0>n?-n*e:b*f.PRECISIONF);v.srcYOffset=Math.floor(0>p?-p*g:c*f.PRECISIONF);0>n&&(q+=n,n=0);0>p&&(r+=p,p=0);q=Math.min(q,m-n);r=Math.min(r,k-p);b=p*m+n;var x;v.srcBuffer=
	a.imageData.data;v.iw=a.width;v.iw1=a.width-1;v.ih1=a.height-1;c=va[u];var z,y,B,E;n=f.ALPHA_MASK;p=f.RED_MASK;var C=f.GREEN_MASK,D=f.BLUE_MASK,F=f.PREC_MAXVAL,H=f.PRECISIONB,I=f.PREC_RED_SHIFT,J=f.PREC_ALPHA_SHIFT,G=v.srcBuffer,K=Math.min;for(u=0;u<r;u++){v.sX=v.srcXOffset;v.fracV=v.srcYOffset&F;v.ifV=F-v.fracV;v.v1=(v.srcYOffset>>H)*v.iw;v.v2=K((v.srcYOffset>>H)+1,v.ih1)*v.iw;for(a=0;a<q;a++)k=4*(b+a),x=h[k+3]<<24&n|h[k]<<16&p|h[k+1]<<8&C|h[k+2]&D,v.fracU=v.sX&F,v.ifU=F-v.fracU,v.ul=v.ifU*v.ifV>>
	H,v.ll=v.ifU*v.fracV>>H,v.ur=v.fracU*v.ifV>>H,v.lr=v.fracU*v.fracV>>H,v.u1=v.sX>>H,v.u2=K(v.u1+1,v.iw1),z=4*(v.v1+v.u1),y=4*(v.v1+v.u2),B=4*(v.v2+v.u1),E=4*(v.v2+v.u2),v.cUL=G[z+3]<<24&n|G[z]<<16&p|G[z+1]<<8&C|G[z+2]&D,v.cUR=G[y+3]<<24&n|G[y]<<16&p|G[y+1]<<8&C|G[y+2]&D,v.cLL=G[B+3]<<24&n|G[B]<<16&p|G[B+1]<<8&C|G[B+2]&D,v.cLR=G[E+3]<<24&n|G[E]<<16&p|G[E+1]<<8&C|G[E+2]&D,v.r=v.ul*((v.cUL&p)>>16)+v.ll*((v.cLL&p)>>16)+v.ur*((v.cUR&p)>>16)+v.lr*((v.cLR&p)>>16)<<I&p,v.g=v.ul*(v.cUL&C)+v.ll*(v.cLL&C)+v.ur*
	(v.cUR&C)+v.lr*(v.cLR&C)>>>H&C,v.b=v.ul*(v.cUL&D)+v.ll*(v.cLL&D)+v.ur*(v.cUR&D)+v.lr*(v.cLR&D)>>>H,v.a=v.ul*((v.cUL&n)>>>24)+v.ll*((v.cLL&n)>>>24)+v.ur*((v.cUR&n)>>>24)+v.lr*((v.cLR&n)>>>24)<<J&n,x=c(x,v.a|v.r|v.g|v.b),h[k]=(x&p)>>>16,h[k+1]=(x&C)>>>8,h[k+2]=x&D,h[k+3]=(x&n)>>>24,v.sX+=e;b+=m;v.srcYOffset+=g}}};d.loadFont=function(a,b){if(a===g)throw"font name required in loadFont.";if(-1===a.indexOf(".svg"))return b===g&&(b=ha.size),PFont.get(a,b);var c=d.loadGlyphs(a);return{name:a,css:"12px sans-serif",
	glyph:!0,units_per_em:c.units_per_em,horiz_adv_x:1/c.units_per_em*c.horiz_adv_x,ascent:c.ascent,descent:c.descent,width:function(b){for(var c=0,e=b.length,f=0;f<e;f++)try{c+=parseFloat(d.glyphLook(d.glyphTable[a],b[f]).horiz_adv_x)}catch(g){R.debug(g)}return c/d.glyphTable[a].units_per_em}}};d.createFont=function(a,b){return d.loadFont(a,b)};d.textFont=function(a,b){b!==g&&(a.glyph||(a=PFont.get(a.name,b)),Ra=b);ha=a;Db=ha.name;ab=ha.ascent;Qa=ha.descent;Fa=ha.leading;ma.$ensureContext().font=ha.css};
	d.textSize=function(a){ha=PFont.get(Db,a);Ra=a;ab=ha.ascent;Qa=ha.descent;Fa=ha.leading;ma.$ensureContext().font=ha.css};d.textAscent=function(){return ab};d.textDescent=function(){return Qa};d.textLeading=function(a){Fa=a};d.textAlign=function(a,b){rb=a;$a=b||f.BASELINE};C.prototype.textWidth=function(a){a=Ya(a).split(/\r?\n/g);var b=0,c,d=a.length;m.font=ha.css;for(c=0;c<d;++c)b=Math.max(b,ha.measureTextWidth(a[c]));return b|0};K.prototype.textWidth=function(a){a=Ya(a).split(/\r?\n/g);var b=0,c,
	d=a.length;Ga===g&&(Ga=q.createElement("canvas"));var e=Ga.getContext("2d");e.font=ha.css;for(c=0;c<d;++c)b=Math.max(b,e.measureText(a[c]).width);return b|0};d.glyphLook=function(a,b){try{switch(b){case "1":return a.one;case "2":return a.two;case "3":return a.three;case "4":return a.four;case "5":return a.five;case "6":return a.six;case "7":return a.seven;case "8":return a.eight;case "9":return a.nine;case "0":return a.zero;case " ":return a.space;case "$":return a.dollar;case "!":return a.exclam;
	case '"':return a.quotedbl;case "#":return a.numbersign;case "%":return a.percent;case "&":return a.ampersand;case "'":return a.quotesingle;case "(":return a.parenleft;case ")":return a.parenright;case "*":return a.asterisk;case "+":return a.plus;case ",":return a.comma;case "-":return a.hyphen;case ".":return a.period;case "/":return a.slash;case "_":return a.underscore;case ":":return a.colon;case ";":return a.semicolon;case "<":return a.less;case "=":return a.equal;case ">":return a.greater;case "?":return a.question;
	case "@":return a.at;case "[":return a.bracketleft;case "\\":return a.backslash;case "]":return a.bracketright;case "^":return a.asciicircum;case "`":return a.grave;case "{":return a.braceleft;case "|":return a.bar;case "}":return a.braceright;case "~":return a.asciitilde;default:return a[b]}}catch(c){R.debug(c)}};C.prototype.text$line=function(a,b,c,e,g){e=e=0;if(ha.glyph){e=d.glyphTable[Db];m.save();m.translate(b,c+Ra);g!==f.RIGHT&&g!==f.CENTER||e.width(a);b=1/e.units_per_em*Ra;m.scale(b,b);b=0;
	for(c=a.length;b<c;b++)try{d.glyphLook(e,a[b]).draw()}catch(h){R.debug(h)}Wa()}else if(a&&"fillText"in m){Q&&(m.fillStyle=d.color.toString(Pa),Q=!1);if(g===f.RIGHT||g===f.CENTER)e=ha.measureTextWidth(a),e=g===f.RIGHT?-e:-e/2;m.fillText(a,b+e,c)}};K.prototype.text$line=function(a,b,c,d,e){Ga===g&&(Ga=q.createElement("canvas"));var h=m;m=Ga.getContext("2d");m.font=ha.css;var k=ha.measureTextWidth(a);Ga.width=k;Ga.height=Ra;m=Ga.getContext("2d");m.font=ha.css;m.textBaseline="top";C.prototype.text$line(a,
	0,0,0,f.LEFT);a=Ga.width/Ga.height;m=h;m.bindTexture(m.TEXTURE_2D,Zc);m.texImage2D(m.TEXTURE_2D,0,m.RGBA,m.RGBA,m.UNSIGNED_BYTE,Ga);m.texParameteri(m.TEXTURE_2D,m.TEXTURE_MAG_FILTER,m.LINEAR);m.texParameteri(m.TEXTURE_2D,m.TEXTURE_MIN_FILTER,m.LINEAR);m.texParameteri(m.TEXTURE_2D,m.TEXTURE_WRAP_T,m.CLAMP_TO_EDGE);m.texParameteri(m.TEXTURE_2D,m.TEXTURE_WRAP_S,m.CLAMP_TO_EDGE);h=0;e===f.RIGHT?h=-k:e===f.CENTER&&(h=-k/2);e=new G;k=0.5*Ra;e.translate(b+h-k/2,c-k,d);e.scale(-a*k,-k,k);e.translate(-1,-1,
	-1);e.transpose();b=new G;b.scale(1,-1,1);b.apply(P.array());b.transpose();m.useProgram(N);fa("aVertex2d",N,"aVertex",3,Hc);fa("aTextureCoord2d",N,"aTextureCoord",2,Ic);ca("uSampler2d",N,"uSampler",[0]);ca("uIsDrawingText2d",N,"uIsDrawingText",!0);Z("uModel2d",N,"uModel",!1,e.array());Z("uView2d",N,"uView",!1,b.array());Y("uColor2d",N,"uColor",qa);m.bindBuffer(m.ELEMENT_ARRAY_BUFFER,Jc);m.drawElements(m.TRIANGLES,6,m.UNSIGNED_SHORT,0)};d.text=function(){mc!==f.SHAPE&&(3===arguments.length?Rb(Ya(arguments[0]),
	arguments[1],arguments[2],0):4===arguments.length?Rb(Ya(arguments[0]),arguments[1],arguments[2],arguments[3]):5===arguments.length?ec(Ya(arguments[0]),arguments[1],arguments[2],arguments[3],arguments[4],0):6===arguments.length&&ec(Ya(arguments[0]),arguments[1],arguments[2],arguments[3],arguments[4],arguments[5]))};d.textMode=function(a){mc=a};d.loadGlyphs=function(a){var b,c,e,f,h,k,p,r,u,x,z,y,v=function(a,b){var c=0,d=[],e,f=RegExp(a,"g");for(e=d[c]=f.exec(b);e;)c++,e=d[c]=f.exec(b);return d},B=
	function(a){var d=v("[A-Za-z][0-9\\- ]+|Z",a);y="return {draw:function(){var curContext=beforePathDraw();curContext.beginPath();";r=a=k=h=f=e=c=b=0;u="";x=d.length-1;for(var g=0;g<x;g++){var n=d[g][0];a=v("[0-9\\-]+",n);switch(n[0]){case "M":b=parseFloat(a[0][0]);c=parseFloat(a[1][0]);y+="curContext.moveTo("+b+","+-c+");";break;case "L":b=parseFloat(a[0][0]);c=parseFloat(a[1][0]);y+="curContext.lineTo("+b+","+-c+");";break;case "H":b=parseFloat(a[0][0]);y+="curContext.lineTo("+b+","+-c+");";break;
	case "V":c=parseFloat(a[0][0]);y+="curContext.lineTo("+b+","+-c+");";break;case "T":h=parseFloat(a[0][0]);k=parseFloat(a[1][0]);"Q"===u||"T"===u?(a=Math.sqrt(Math.pow(b-e,2)+Math.pow(f-c,2)),r=Math.PI+Math.atan2(e-b,f-c),e=b+Math.sin(r)*a,f=c+Math.cos(r)*a):(e=b,f=c);y+="curContext.quadraticCurveTo("+e+","+-f+","+h+","+-k+");";b=h;c=k;break;case "Q":e=parseFloat(a[0][0]);f=parseFloat(a[1][0]);h=parseFloat(a[2][0]);k=parseFloat(a[3][0]);y+="curContext.quadraticCurveTo("+e+","+-f+","+h+","+-k+");";
	b=h;c=k;break;case "Z":y+="curContext.closePath();"}u=n[0]}y+="afterPathDraw();";y+="curContext.translate("+z+",0);";y+="}}";return(new Function("beforePathDraw","afterPathDraw",y))(function(){m.save();return ma.$ensureContext()},function(){Ba();Ea();Wa()})},C=function(b){var c=b.getElementsByTagName("font");d.glyphTable[a].horiz_adv_x=c[0].getAttribute("horiz-adv-x");c=b.getElementsByTagName("font-face")[0];d.glyphTable[a].units_per_em=parseFloat(c.getAttribute("units-per-em"));d.glyphTable[a].ascent=
	parseFloat(c.getAttribute("ascent"));d.glyphTable[a].descent=parseFloat(c.getAttribute("descent"));b=b.getElementsByTagName("glyph");for(var c=b.length,e=0;e<c;e++){var f=b[e].getAttribute("unicode"),h=b[e].getAttribute("glyph-name");z=b[e].getAttribute("horiz-adv-x");null===z&&(z=d.glyphTable[a].horiz_adv_x);p=b[e].getAttribute("d");p!==g&&(y=B(p),d.glyphTable[a][h]={name:h,unicode:f,horiz_adv_x:z,draw:y.draw})}};d.glyphTable[a]={};(function(){var b;try{b=q.implementation.createDocument("","",null)}catch(c){R.debug(c.message);
	return}try{b.async=!1,b.load(a),C(b.getElementsByTagName("svg")[0])}catch(d){R.debug(d);try{var e=new n.XMLHttpRequest;e.open("GET",a,!1);e.send(null);C(e.responseXML.documentElement)}catch(f){R.debug(d)}}})(a);return d.glyphTable[a]};d.param=function(a){var b="data-processing-"+a;if(X.hasAttribute(b))return X.getAttribute(b);for(var b=0,c=X.childNodes.length;b<c;++b){var d=X.childNodes.item(b);if(1===d.nodeType&&"param"===d.tagName.toLowerCase()&&d.getAttribute("name")===a)return d.getAttribute("value")}return ia.params.hasOwnProperty(a)?
	ia.params[a]:null};H.prototype.translate=J("translate");H.prototype.transform=J("transform");H.prototype.scale=J("scale");H.prototype.pushMatrix=J("pushMatrix");H.prototype.popMatrix=J("popMatrix");H.prototype.resetMatrix=J("resetMatrix");H.prototype.applyMatrix=J("applyMatrix");H.prototype.rotate=J("rotate");H.prototype.rotateZ=J("rotateZ");H.prototype.shearX=J("shearX");H.prototype.shearY=J("shearY");H.prototype.redraw=J("redraw");H.prototype.toImageData=J("toImageData");H.prototype.ambientLight=
	J("ambientLight");H.prototype.directionalLight=J("directionalLight");H.prototype.lightFalloff=J("lightFalloff");H.prototype.lightSpecular=J("lightSpecular");H.prototype.pointLight=J("pointLight");H.prototype.noLights=J("noLights");H.prototype.spotLight=J("spotLight");H.prototype.beginCamera=J("beginCamera");H.prototype.endCamera=J("endCamera");H.prototype.frustum=J("frustum");H.prototype.box=J("box");H.prototype.sphere=J("sphere");H.prototype.ambient=J("ambient");H.prototype.emissive=J("emissive");
	H.prototype.shininess=J("shininess");H.prototype.specular=J("specular");H.prototype.fill=J("fill");H.prototype.stroke=J("stroke");H.prototype.strokeWeight=J("strokeWeight");H.prototype.smooth=J("smooth");H.prototype.noSmooth=J("noSmooth");H.prototype.point=J("point");H.prototype.vertex=J("vertex");H.prototype.endShape=J("endShape");H.prototype.bezierVertex=J("bezierVertex");H.prototype.curveVertex=J("curveVertex");H.prototype.curve=J("curve");H.prototype.line=J("line");H.prototype.bezier=J("bezier");
	H.prototype.rect=J("rect");H.prototype.ellipse=J("ellipse");H.prototype.background=J("background");H.prototype.image=J("image");H.prototype.textWidth=J("textWidth");H.prototype.text$line=J("text$line");H.prototype.$ensureContext=J("$ensureContext");H.prototype.$newPMatrix=J("$newPMatrix");H.prototype.size=function(a,b,c){Oa(c===f.WEBGL?"3D":"2D");d.size(a,b,c)};H.prototype.$init=y;C.prototype.$init=function(){d.size(d.width,d.height);m.lineCap="round";d.noSmooth();d.disableContextMenu()};K.prototype.$init=
	function(){d.use3DContext=!0;d.disableContextMenu()};aa.prototype.$ensureContext=function(){return m};X.getAttribute("tabindex")||X.setAttribute("tabindex",0);if(Ub)ia=new R.Sketch,Oa(),d.size=function(a,b,c){c&&c===f.WEBGL?Oa("3D"):Oa("2D");d.size(a,b,c)};else{ia=h instanceof R.Sketch?h:"function"===typeof h?new R.Sketch(h):h?R.compile(h):new R.Sketch(function(){});d.externals.sketch=ia;Oa();X.onfocus=function(){d.focused=!0};X.onblur=function(){d.focused=!1;ia.options.globalKeyEvents||(d.__keyPressed=
	!1,lb=[],sb=null)};ia.options.pauseOnBlur&&(F(n,"focus",function(){Ia&&d.loop()}),F(n,"blur",function(){Ia&&ib&&(d.noLoop(),Ia=!0);d.__keyPressed=!1;lb=[];sb=null}));var Oc=ia.options.globalKeyEvents?n:X;F(Oc,"keydown",wc);F(Oc,"keypress",Tb);F(Oc,"keyup",fc);for(var bc in R.lib)R.lib.hasOwnProperty(bc)&&(R.lib[bc].hasOwnProperty("attach")?R.lib[bc].attach(d):R.lib[bc]instanceof Function&&R.lib[bc].call(this));var rd=function(a){if(ia.imageCache.pending||PFont.preloading.pending(100))n.setTimeout(function(){rd(a)},
	100);else{if(n.opera){var b,c,d=ia.imageCache.operaCache;for(b in d)d.hasOwnProperty(b)&&(c=d[b],null!==c&&q.body.removeChild(c),delete d[b])}ia.attach(a,p);ia.onLoad(a);a.setup&&(a.setup(),a.resetMatrix(),ia.onSetup());jb();a.draw&&(Ia?a.loop():a.redraw())}};this.externals.canvas.id!==g&&this.externals.canvas.id.length||(this.externals.canvas.id="__processing"+xb.length);cc[this.externals.canvas.id]=xb.length;xb.push(this);rd(d)}};R.debug=function(){return"console"in n?function(a){n.console.log("Processing.js: "+
	a)}:y}();R.prototype=p;R.instances=xb;R.getInstanceById=function(a){return xb[cc[a]]};(function(a){function b(a){return function(){throw"Processing.js does not support "+a+".";}}for(var c="open() createOutput() createInput() BufferedReader selectFolder() dataPath() createWriter() selectOutput() beginRecord() saveStream() endRecord() selectInput() saveBytes() createReader() beginRaw() endRaw() PrintWriter delay()".split(" "),e=c.length,f,g;e--;)f=c[e],g=f.replace("()",""),a[g]=b(f)})(p);return R}},
	{}],28:[function(D,y,V){var h={virtEquals:D("./Helpers/virtEquals"),virtHashCode:D("./Helpers/virtHashCode"),ObjectIterator:D("./Helpers/ObjectIterator"),PConstants:D("./Helpers/PConstants"),ArrayList:D("./Objects/ArrayList"),HashMap:D("./Objects/HashMap"),PVector:D("./Objects/PVector"),PFont:D("./Objects/PFont"),Char:D("./Objects/Char"),XMLAttribute:D("./Objects/XMLAttribute"),XMLElement:D("./Objects/XMLElement"),PMatrix2D:D("./Objects/PMatrix2D"),PMatrix3D:D("./Objects/PMatrix3D"),PShape:D("./Objects/PShape"),
	colors:D("./Objects/webcolors"),PShapeSVG:D("./Objects/PShapeSVG"),CommonFunctions:D("./P5Functions/commonFunctions"),defaultScope:D("./Helpers/defaultScope"),Processing:D("./Processing"),setupParser:D("./Parser/Parser"),finalize:D("./Helpers/finalizeProcessing")};h.extend={withMath:D("./P5Functions/Math.js"),withProxyFunctions:D("./P5Functions/JavaProxyFunctions")(h.virtHashCode,h.virtEquals),withTouch:D("./P5Functions/touchmouse"),withCommonFunctions:h.CommonFunctions.withCommonFunctions};y.exports=
	function(g,k){var p=function(){},a=h.virtEquals,b=h.virtHashCode,e=h.PConstants,c=h.CommonFunctions,n=h.ObjectIterator,q=h.Char,y=h.XMLAttribute(),f=h.ArrayList({virtHashCode:b,virtEquals:a}),a=h.HashMap({virtHashCode:b,virtEquals:a}),b=h.PVector({PConstants:e}),V=h.PFont({Browser:g,noop:p}),y=h.XMLElement({Browser:g,XMLAttribute:y}),da=h.PMatrix2D({p:c}),I=h.PMatrix3D({p:c}),da=h.PShape({PConstants:e,PMatrix2D:da,PMatrix3D:I}),c=h.PShapeSVG({CommonFunctions:c,PConstants:e,PShape:da,XMLElement:y,
	colors:h.colors}),e=h.defaultScope({ArrayList:f,HashMap:a,PVector:b,PFont:V,PShapeSVG:c,ObjectIterator:n,PConstants:e,Char:q,XMLElement:y,XML:y}),n=h.Processing({defaultScope:e,Browser:g,extend:h.extend,noop:p}),n=h.setupParser(n,{Browser:g,aFunctions:k,defaultScope:e});return n=h.finalize(n,{version:D("../package.json").version,isDomPresent:g.isDomPresent,window:g.window,document:g.document,noop:p})}},{"../package.json":2,"./Helpers/ObjectIterator":3,"./Helpers/PConstants":4,"./Helpers/defaultScope":6,
	"./Helpers/finalizeProcessing":7,"./Helpers/virtEquals":8,"./Helpers/virtHashCode":9,"./Objects/ArrayList":10,"./Objects/Char":11,"./Objects/HashMap":12,"./Objects/PFont":13,"./Objects/PMatrix2D":14,"./Objects/PMatrix3D":15,"./Objects/PShape":16,"./Objects/PShapeSVG":17,"./Objects/PVector":18,"./Objects/XMLAttribute":19,"./Objects/XMLElement":20,"./Objects/webcolors":21,"./P5Functions/JavaProxyFunctions":22,"./P5Functions/Math.js":23,"./P5Functions/commonFunctions":24,"./P5Functions/touchmouse":25,
	"./Parser/Parser":26,"./Processing":27}]},{},[1]);


/***/ }
/******/ ]);
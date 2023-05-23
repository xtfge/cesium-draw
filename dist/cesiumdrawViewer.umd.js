(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vue"));
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["cesiumdrawViewer"] = factory(require("vue"));
	else
		root["cesiumdrawViewer"] = factory(root["Vue"]);
})((typeof self !== 'undefined' ? self : this), function(__WEBPACK_EXTERNAL_MODULE__7203__) {
return /******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 9662:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isCallable = __webpack_require__(614);
var tryToString = __webpack_require__(6330);

var $TypeError = TypeError;

// `Assert: IsCallable(argument) is true`
module.exports = function (argument) {
  if (isCallable(argument)) return argument;
  throw $TypeError(tryToString(argument) + ' is not a function');
};


/***/ }),

/***/ 6077:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isCallable = __webpack_require__(614);

var $String = String;
var $TypeError = TypeError;

module.exports = function (argument) {
  if (typeof argument == 'object' || isCallable(argument)) return argument;
  throw $TypeError("Can't set " + $String(argument) + ' as a prototype');
};


/***/ }),

/***/ 5787:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isPrototypeOf = __webpack_require__(7976);

var $TypeError = TypeError;

module.exports = function (it, Prototype) {
  if (isPrototypeOf(Prototype, it)) return it;
  throw $TypeError('Incorrect invocation');
};


/***/ }),

/***/ 9670:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isObject = __webpack_require__(111);

var $String = String;
var $TypeError = TypeError;

// `Assert: Type(argument) is Object`
module.exports = function (argument) {
  if (isObject(argument)) return argument;
  throw $TypeError($String(argument) + ' is not an object');
};


/***/ }),

/***/ 3013:
/***/ (function(module) {

// eslint-disable-next-line es/no-typed-arrays -- safe
module.exports = typeof ArrayBuffer != 'undefined' && typeof DataView != 'undefined';


/***/ }),

/***/ 260:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var NATIVE_ARRAY_BUFFER = __webpack_require__(3013);
var DESCRIPTORS = __webpack_require__(9781);
var global = __webpack_require__(7854);
var isCallable = __webpack_require__(614);
var isObject = __webpack_require__(111);
var hasOwn = __webpack_require__(2597);
var classof = __webpack_require__(648);
var tryToString = __webpack_require__(6330);
var createNonEnumerableProperty = __webpack_require__(8880);
var defineBuiltIn = __webpack_require__(8052);
var defineBuiltInAccessor = __webpack_require__(7045);
var isPrototypeOf = __webpack_require__(7976);
var getPrototypeOf = __webpack_require__(9518);
var setPrototypeOf = __webpack_require__(7674);
var wellKnownSymbol = __webpack_require__(5112);
var uid = __webpack_require__(9711);
var InternalStateModule = __webpack_require__(9909);

var enforceInternalState = InternalStateModule.enforce;
var getInternalState = InternalStateModule.get;
var Int8Array = global.Int8Array;
var Int8ArrayPrototype = Int8Array && Int8Array.prototype;
var Uint8ClampedArray = global.Uint8ClampedArray;
var Uint8ClampedArrayPrototype = Uint8ClampedArray && Uint8ClampedArray.prototype;
var TypedArray = Int8Array && getPrototypeOf(Int8Array);
var TypedArrayPrototype = Int8ArrayPrototype && getPrototypeOf(Int8ArrayPrototype);
var ObjectPrototype = Object.prototype;
var TypeError = global.TypeError;

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var TYPED_ARRAY_TAG = uid('TYPED_ARRAY_TAG');
var TYPED_ARRAY_CONSTRUCTOR = 'TypedArrayConstructor';
// Fixing native typed arrays in Opera Presto crashes the browser, see #595
var NATIVE_ARRAY_BUFFER_VIEWS = NATIVE_ARRAY_BUFFER && !!setPrototypeOf && classof(global.opera) !== 'Opera';
var TYPED_ARRAY_TAG_REQUIRED = false;
var NAME, Constructor, Prototype;

var TypedArrayConstructorsList = {
  Int8Array: 1,
  Uint8Array: 1,
  Uint8ClampedArray: 1,
  Int16Array: 2,
  Uint16Array: 2,
  Int32Array: 4,
  Uint32Array: 4,
  Float32Array: 4,
  Float64Array: 8
};

var BigIntArrayConstructorsList = {
  BigInt64Array: 8,
  BigUint64Array: 8
};

var isView = function isView(it) {
  if (!isObject(it)) return false;
  var klass = classof(it);
  return klass === 'DataView'
    || hasOwn(TypedArrayConstructorsList, klass)
    || hasOwn(BigIntArrayConstructorsList, klass);
};

var getTypedArrayConstructor = function (it) {
  var proto = getPrototypeOf(it);
  if (!isObject(proto)) return;
  var state = getInternalState(proto);
  return (state && hasOwn(state, TYPED_ARRAY_CONSTRUCTOR)) ? state[TYPED_ARRAY_CONSTRUCTOR] : getTypedArrayConstructor(proto);
};

var isTypedArray = function (it) {
  if (!isObject(it)) return false;
  var klass = classof(it);
  return hasOwn(TypedArrayConstructorsList, klass)
    || hasOwn(BigIntArrayConstructorsList, klass);
};

var aTypedArray = function (it) {
  if (isTypedArray(it)) return it;
  throw TypeError('Target is not a typed array');
};

var aTypedArrayConstructor = function (C) {
  if (isCallable(C) && (!setPrototypeOf || isPrototypeOf(TypedArray, C))) return C;
  throw TypeError(tryToString(C) + ' is not a typed array constructor');
};

var exportTypedArrayMethod = function (KEY, property, forced, options) {
  if (!DESCRIPTORS) return;
  if (forced) for (var ARRAY in TypedArrayConstructorsList) {
    var TypedArrayConstructor = global[ARRAY];
    if (TypedArrayConstructor && hasOwn(TypedArrayConstructor.prototype, KEY)) try {
      delete TypedArrayConstructor.prototype[KEY];
    } catch (error) {
      // old WebKit bug - some methods are non-configurable
      try {
        TypedArrayConstructor.prototype[KEY] = property;
      } catch (error2) { /* empty */ }
    }
  }
  if (!TypedArrayPrototype[KEY] || forced) {
    defineBuiltIn(TypedArrayPrototype, KEY, forced ? property
      : NATIVE_ARRAY_BUFFER_VIEWS && Int8ArrayPrototype[KEY] || property, options);
  }
};

var exportTypedArrayStaticMethod = function (KEY, property, forced) {
  var ARRAY, TypedArrayConstructor;
  if (!DESCRIPTORS) return;
  if (setPrototypeOf) {
    if (forced) for (ARRAY in TypedArrayConstructorsList) {
      TypedArrayConstructor = global[ARRAY];
      if (TypedArrayConstructor && hasOwn(TypedArrayConstructor, KEY)) try {
        delete TypedArrayConstructor[KEY];
      } catch (error) { /* empty */ }
    }
    if (!TypedArray[KEY] || forced) {
      // V8 ~ Chrome 49-50 `%TypedArray%` methods are non-writable non-configurable
      try {
        return defineBuiltIn(TypedArray, KEY, forced ? property : NATIVE_ARRAY_BUFFER_VIEWS && TypedArray[KEY] || property);
      } catch (error) { /* empty */ }
    } else return;
  }
  for (ARRAY in TypedArrayConstructorsList) {
    TypedArrayConstructor = global[ARRAY];
    if (TypedArrayConstructor && (!TypedArrayConstructor[KEY] || forced)) {
      defineBuiltIn(TypedArrayConstructor, KEY, property);
    }
  }
};

for (NAME in TypedArrayConstructorsList) {
  Constructor = global[NAME];
  Prototype = Constructor && Constructor.prototype;
  if (Prototype) enforceInternalState(Prototype)[TYPED_ARRAY_CONSTRUCTOR] = Constructor;
  else NATIVE_ARRAY_BUFFER_VIEWS = false;
}

for (NAME in BigIntArrayConstructorsList) {
  Constructor = global[NAME];
  Prototype = Constructor && Constructor.prototype;
  if (Prototype) enforceInternalState(Prototype)[TYPED_ARRAY_CONSTRUCTOR] = Constructor;
}

// WebKit bug - typed arrays constructors prototype is Object.prototype
if (!NATIVE_ARRAY_BUFFER_VIEWS || !isCallable(TypedArray) || TypedArray === Function.prototype) {
  // eslint-disable-next-line no-shadow -- safe
  TypedArray = function TypedArray() {
    throw TypeError('Incorrect invocation');
  };
  if (NATIVE_ARRAY_BUFFER_VIEWS) for (NAME in TypedArrayConstructorsList) {
    if (global[NAME]) setPrototypeOf(global[NAME], TypedArray);
  }
}

if (!NATIVE_ARRAY_BUFFER_VIEWS || !TypedArrayPrototype || TypedArrayPrototype === ObjectPrototype) {
  TypedArrayPrototype = TypedArray.prototype;
  if (NATIVE_ARRAY_BUFFER_VIEWS) for (NAME in TypedArrayConstructorsList) {
    if (global[NAME]) setPrototypeOf(global[NAME].prototype, TypedArrayPrototype);
  }
}

// WebKit bug - one more object in Uint8ClampedArray prototype chain
if (NATIVE_ARRAY_BUFFER_VIEWS && getPrototypeOf(Uint8ClampedArrayPrototype) !== TypedArrayPrototype) {
  setPrototypeOf(Uint8ClampedArrayPrototype, TypedArrayPrototype);
}

if (DESCRIPTORS && !hasOwn(TypedArrayPrototype, TO_STRING_TAG)) {
  TYPED_ARRAY_TAG_REQUIRED = true;
  defineBuiltInAccessor(TypedArrayPrototype, TO_STRING_TAG, {
    configurable: true,
    get: function () {
      return isObject(this) ? this[TYPED_ARRAY_TAG] : undefined;
    }
  });
  for (NAME in TypedArrayConstructorsList) if (global[NAME]) {
    createNonEnumerableProperty(global[NAME], TYPED_ARRAY_TAG, NAME);
  }
}

module.exports = {
  NATIVE_ARRAY_BUFFER_VIEWS: NATIVE_ARRAY_BUFFER_VIEWS,
  TYPED_ARRAY_TAG: TYPED_ARRAY_TAG_REQUIRED && TYPED_ARRAY_TAG,
  aTypedArray: aTypedArray,
  aTypedArrayConstructor: aTypedArrayConstructor,
  exportTypedArrayMethod: exportTypedArrayMethod,
  exportTypedArrayStaticMethod: exportTypedArrayStaticMethod,
  getTypedArrayConstructor: getTypedArrayConstructor,
  isView: isView,
  isTypedArray: isTypedArray,
  TypedArray: TypedArray,
  TypedArrayPrototype: TypedArrayPrototype
};


/***/ }),

/***/ 7745:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var lengthOfArrayLike = __webpack_require__(6244);

module.exports = function (Constructor, list) {
  var index = 0;
  var length = lengthOfArrayLike(list);
  var result = new Constructor(length);
  while (length > index) result[index] = list[index++];
  return result;
};


/***/ }),

/***/ 1318:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toIndexedObject = __webpack_require__(5656);
var toAbsoluteIndex = __webpack_require__(1400);
var lengthOfArrayLike = __webpack_require__(6244);

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = lengthOfArrayLike(O);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),

/***/ 3658:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__(9781);
var isArray = __webpack_require__(3157);

var $TypeError = TypeError;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Safari < 13 does not throw an error in this case
var SILENT_ON_NON_WRITABLE_LENGTH_SET = DESCRIPTORS && !function () {
  // makes no sense without proper strict mode support
  if (this !== undefined) return true;
  try {
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    Object.defineProperty([], 'length', { writable: false }).length = 1;
  } catch (error) {
    return error instanceof TypeError;
  }
}();

module.exports = SILENT_ON_NON_WRITABLE_LENGTH_SET ? function (O, length) {
  if (isArray(O) && !getOwnPropertyDescriptor(O, 'length').writable) {
    throw $TypeError('Cannot set read only .length');
  } return O.length = length;
} : function (O, length) {
  return O.length = length;
};


/***/ }),

/***/ 1843:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var lengthOfArrayLike = __webpack_require__(6244);

// https://tc39.es/proposal-change-array-by-copy/#sec-array.prototype.toReversed
// https://tc39.es/proposal-change-array-by-copy/#sec-%typedarray%.prototype.toReversed
module.exports = function (O, C) {
  var len = lengthOfArrayLike(O);
  var A = new C(len);
  var k = 0;
  for (; k < len; k++) A[k] = O[len - k - 1];
  return A;
};


/***/ }),

/***/ 1572:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var lengthOfArrayLike = __webpack_require__(6244);
var toIntegerOrInfinity = __webpack_require__(9303);

var $RangeError = RangeError;

// https://tc39.es/proposal-change-array-by-copy/#sec-array.prototype.with
// https://tc39.es/proposal-change-array-by-copy/#sec-%typedarray%.prototype.with
module.exports = function (O, C, index, value) {
  var len = lengthOfArrayLike(O);
  var relativeIndex = toIntegerOrInfinity(index);
  var actualIndex = relativeIndex < 0 ? len + relativeIndex : relativeIndex;
  if (actualIndex >= len || actualIndex < 0) throw $RangeError('Incorrect index');
  var A = new C(len);
  var k = 0;
  for (; k < len; k++) A[k] = k === actualIndex ? value : O[k];
  return A;
};


/***/ }),

/***/ 4326:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);

var toString = uncurryThis({}.toString);
var stringSlice = uncurryThis(''.slice);

module.exports = function (it) {
  return stringSlice(toString(it), 8, -1);
};


/***/ }),

/***/ 648:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var TO_STRING_TAG_SUPPORT = __webpack_require__(1694);
var isCallable = __webpack_require__(614);
var classofRaw = __webpack_require__(4326);
var wellKnownSymbol = __webpack_require__(5112);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var $Object = Object;

// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && isCallable(O.callee) ? 'Arguments' : result;
};


/***/ }),

/***/ 9920:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var hasOwn = __webpack_require__(2597);
var ownKeys = __webpack_require__(3887);
var getOwnPropertyDescriptorModule = __webpack_require__(1236);
var definePropertyModule = __webpack_require__(3070);

module.exports = function (target, source, exceptions) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  }
};


/***/ }),

/***/ 8544:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(7293);

module.exports = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
  return Object.getPrototypeOf(new F()) !== F.prototype;
});


/***/ }),

/***/ 8880:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9781);
var definePropertyModule = __webpack_require__(3070);
var createPropertyDescriptor = __webpack_require__(9114);

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ 9114:
/***/ (function(module) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ 7045:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var makeBuiltIn = __webpack_require__(6339);
var defineProperty = __webpack_require__(3070);

module.exports = function (target, name, descriptor) {
  if (descriptor.get) makeBuiltIn(descriptor.get, name, { getter: true });
  if (descriptor.set) makeBuiltIn(descriptor.set, name, { setter: true });
  return defineProperty.f(target, name, descriptor);
};


/***/ }),

/***/ 8052:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isCallable = __webpack_require__(614);
var definePropertyModule = __webpack_require__(3070);
var makeBuiltIn = __webpack_require__(6339);
var defineGlobalProperty = __webpack_require__(3072);

module.exports = function (O, key, value, options) {
  if (!options) options = {};
  var simple = options.enumerable;
  var name = options.name !== undefined ? options.name : key;
  if (isCallable(value)) makeBuiltIn(value, name, options);
  if (options.global) {
    if (simple) O[key] = value;
    else defineGlobalProperty(key, value);
  } else {
    try {
      if (!options.unsafe) delete O[key];
      else if (O[key]) simple = true;
    } catch (error) { /* empty */ }
    if (simple) O[key] = value;
    else definePropertyModule.f(O, key, {
      value: value,
      enumerable: false,
      configurable: !options.nonConfigurable,
      writable: !options.nonWritable
    });
  } return O;
};


/***/ }),

/***/ 3072:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);

// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;

module.exports = function (key, value) {
  try {
    defineProperty(global, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),

/***/ 9781:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(7293);

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});


/***/ }),

/***/ 4154:
/***/ (function(module) {

var documentAll = typeof document == 'object' && document.all;

// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
// eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
var IS_HTMLDDA = typeof documentAll == 'undefined' && documentAll !== undefined;

module.exports = {
  all: documentAll,
  IS_HTMLDDA: IS_HTMLDDA
};


/***/ }),

/***/ 317:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var isObject = __webpack_require__(111);

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ 7207:
/***/ (function(module) {

var $TypeError = TypeError;
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF; // 2 ** 53 - 1 == 9007199254740991

module.exports = function (it) {
  if (it > MAX_SAFE_INTEGER) throw $TypeError('Maximum allowed index exceeded');
  return it;
};


/***/ }),

/***/ 3678:
/***/ (function(module) {

module.exports = {
  IndexSizeError: { s: 'INDEX_SIZE_ERR', c: 1, m: 1 },
  DOMStringSizeError: { s: 'DOMSTRING_SIZE_ERR', c: 2, m: 0 },
  HierarchyRequestError: { s: 'HIERARCHY_REQUEST_ERR', c: 3, m: 1 },
  WrongDocumentError: { s: 'WRONG_DOCUMENT_ERR', c: 4, m: 1 },
  InvalidCharacterError: { s: 'INVALID_CHARACTER_ERR', c: 5, m: 1 },
  NoDataAllowedError: { s: 'NO_DATA_ALLOWED_ERR', c: 6, m: 0 },
  NoModificationAllowedError: { s: 'NO_MODIFICATION_ALLOWED_ERR', c: 7, m: 1 },
  NotFoundError: { s: 'NOT_FOUND_ERR', c: 8, m: 1 },
  NotSupportedError: { s: 'NOT_SUPPORTED_ERR', c: 9, m: 1 },
  InUseAttributeError: { s: 'INUSE_ATTRIBUTE_ERR', c: 10, m: 1 },
  InvalidStateError: { s: 'INVALID_STATE_ERR', c: 11, m: 1 },
  SyntaxError: { s: 'SYNTAX_ERR', c: 12, m: 1 },
  InvalidModificationError: { s: 'INVALID_MODIFICATION_ERR', c: 13, m: 1 },
  NamespaceError: { s: 'NAMESPACE_ERR', c: 14, m: 1 },
  InvalidAccessError: { s: 'INVALID_ACCESS_ERR', c: 15, m: 1 },
  ValidationError: { s: 'VALIDATION_ERR', c: 16, m: 0 },
  TypeMismatchError: { s: 'TYPE_MISMATCH_ERR', c: 17, m: 1 },
  SecurityError: { s: 'SECURITY_ERR', c: 18, m: 1 },
  NetworkError: { s: 'NETWORK_ERR', c: 19, m: 1 },
  AbortError: { s: 'ABORT_ERR', c: 20, m: 1 },
  URLMismatchError: { s: 'URL_MISMATCH_ERR', c: 21, m: 1 },
  QuotaExceededError: { s: 'QUOTA_EXCEEDED_ERR', c: 22, m: 1 },
  TimeoutError: { s: 'TIMEOUT_ERR', c: 23, m: 1 },
  InvalidNodeTypeError: { s: 'INVALID_NODE_TYPE_ERR', c: 24, m: 1 },
  DataCloneError: { s: 'DATA_CLONE_ERR', c: 25, m: 1 }
};


/***/ }),

/***/ 8113:
/***/ (function(module) {

module.exports = typeof navigator != 'undefined' && String(navigator.userAgent) || '';


/***/ }),

/***/ 7392:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var userAgent = __webpack_require__(8113);

var process = global.process;
var Deno = global.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

module.exports = version;


/***/ }),

/***/ 748:
/***/ (function(module) {

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),

/***/ 1060:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);

var $Error = Error;
var replace = uncurryThis(''.replace);

var TEST = (function (arg) { return String($Error(arg).stack); })('zxcasd');
// eslint-disable-next-line redos/no-vulnerable -- safe
var V8_OR_CHAKRA_STACK_ENTRY = /\n\s*at [^:]*:[^\n]*/;
var IS_V8_OR_CHAKRA_STACK = V8_OR_CHAKRA_STACK_ENTRY.test(TEST);

module.exports = function (stack, dropEntries) {
  if (IS_V8_OR_CHAKRA_STACK && typeof stack == 'string' && !$Error.prepareStackTrace) {
    while (dropEntries--) stack = replace(stack, V8_OR_CHAKRA_STACK_ENTRY, '');
  } return stack;
};


/***/ }),

/***/ 2109:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var getOwnPropertyDescriptor = (__webpack_require__(1236).f);
var createNonEnumerableProperty = __webpack_require__(8880);
var defineBuiltIn = __webpack_require__(8052);
var defineGlobalProperty = __webpack_require__(3072);
var copyConstructorProperties = __webpack_require__(9920);
var isForced = __webpack_require__(4705);

/*
  options.target         - name of the target object
  options.global         - target is the global object
  options.stat           - export as static methods of target
  options.proto          - export as prototype methods of target
  options.real           - real prototype method for the `pure` version
  options.forced         - export even if the native feature is available
  options.bind           - bind methods to the target, required for the `pure` version
  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
  options.sham           - add a flag to not completely full polyfills
  options.enumerable     - export as enumerable property
  options.dontCallGetSet - prevent calling a getter on target
  options.name           - the .name of the function if it does not match the key
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || defineGlobalProperty(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.dontCallGetSet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty == typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    defineBuiltIn(target, key, sourceProperty, options);
  }
};


/***/ }),

/***/ 7293:
/***/ (function(module) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ 4374:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(7293);

module.exports = !fails(function () {
  // eslint-disable-next-line es/no-function-prototype-bind -- safe
  var test = (function () { /* empty */ }).bind();
  // eslint-disable-next-line no-prototype-builtins -- safe
  return typeof test != 'function' || test.hasOwnProperty('prototype');
});


/***/ }),

/***/ 6916:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var NATIVE_BIND = __webpack_require__(4374);

var call = Function.prototype.call;

module.exports = NATIVE_BIND ? call.bind(call) : function () {
  return call.apply(call, arguments);
};


/***/ }),

/***/ 6530:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9781);
var hasOwn = __webpack_require__(2597);

var FunctionPrototype = Function.prototype;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn(FunctionPrototype, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable));

module.exports = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};


/***/ }),

/***/ 5668:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);
var aCallable = __webpack_require__(9662);

module.exports = function (object, key, method) {
  try {
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    return uncurryThis(aCallable(Object.getOwnPropertyDescriptor(object, key)[method]));
  } catch (error) { /* empty */ }
};


/***/ }),

/***/ 1702:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var NATIVE_BIND = __webpack_require__(4374);

var FunctionPrototype = Function.prototype;
var call = FunctionPrototype.call;
var uncurryThisWithBind = NATIVE_BIND && FunctionPrototype.bind.bind(call, call);

module.exports = NATIVE_BIND ? uncurryThisWithBind : function (fn) {
  return function () {
    return call.apply(fn, arguments);
  };
};


/***/ }),

/***/ 5005:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var isCallable = __webpack_require__(614);

var aFunction = function (argument) {
  return isCallable(argument) ? argument : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global[namespace]) : global[namespace] && global[namespace][method];
};


/***/ }),

/***/ 8173:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var aCallable = __webpack_require__(9662);
var isNullOrUndefined = __webpack_require__(8554);

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
module.exports = function (V, P) {
  var func = V[P];
  return isNullOrUndefined(func) ? undefined : aCallable(func);
};


/***/ }),

/***/ 7854:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof __webpack_require__.g == 'object' && __webpack_require__.g) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || this || Function('return this')();


/***/ }),

/***/ 2597:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);
var toObject = __webpack_require__(7908);

var hasOwnProperty = uncurryThis({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es/no-object-hasown -- safe
module.exports = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject(it), key);
};


/***/ }),

/***/ 3501:
/***/ (function(module) {

module.exports = {};


/***/ }),

/***/ 4664:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9781);
var fails = __webpack_require__(7293);
var createElement = __webpack_require__(317);

// Thanks to IE8 for its funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),

/***/ 8361:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);
var fails = __webpack_require__(7293);
var classof = __webpack_require__(4326);

var $Object = Object;
var split = uncurryThis(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !$Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split(it, '') : $Object(it);
} : $Object;


/***/ }),

/***/ 9587:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isCallable = __webpack_require__(614);
var isObject = __webpack_require__(111);
var setPrototypeOf = __webpack_require__(7674);

// makes subclassing work correct for wrapped built-ins
module.exports = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    isCallable(NewTarget = dummy.constructor) &&
    NewTarget !== Wrapper &&
    isObject(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) setPrototypeOf($this, NewTargetPrototype);
  return $this;
};


/***/ }),

/***/ 2788:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);
var isCallable = __webpack_require__(614);
var store = __webpack_require__(5465);

var functionToString = uncurryThis(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable(store.inspectSource)) {
  store.inspectSource = function (it) {
    return functionToString(it);
  };
}

module.exports = store.inspectSource;


/***/ }),

/***/ 9909:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var NATIVE_WEAK_MAP = __webpack_require__(4811);
var global = __webpack_require__(7854);
var isObject = __webpack_require__(111);
var createNonEnumerableProperty = __webpack_require__(8880);
var hasOwn = __webpack_require__(2597);
var shared = __webpack_require__(5465);
var sharedKey = __webpack_require__(6200);
var hiddenKeys = __webpack_require__(3501);

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError = global.TypeError;
var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  /* eslint-disable no-self-assign -- prototype methods protection */
  store.get = store.get;
  store.has = store.has;
  store.set = store.set;
  /* eslint-enable no-self-assign -- prototype methods protection */
  set = function (it, metadata) {
    if (store.has(it)) throw TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    store.set(it, metadata);
    return metadata;
  };
  get = function (it) {
    return store.get(it) || {};
  };
  has = function (it) {
    return store.has(it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    if (hasOwn(it, STATE)) throw TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return hasOwn(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return hasOwn(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ 3157:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var classof = __webpack_require__(4326);

// `IsArray` abstract operation
// https://tc39.es/ecma262/#sec-isarray
// eslint-disable-next-line es/no-array-isarray -- safe
module.exports = Array.isArray || function isArray(argument) {
  return classof(argument) == 'Array';
};


/***/ }),

/***/ 4067:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var classof = __webpack_require__(648);

module.exports = function (it) {
  var klass = classof(it);
  return klass == 'BigInt64Array' || klass == 'BigUint64Array';
};


/***/ }),

/***/ 614:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var $documentAll = __webpack_require__(4154);

var documentAll = $documentAll.all;

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
module.exports = $documentAll.IS_HTMLDDA ? function (argument) {
  return typeof argument == 'function' || argument === documentAll;
} : function (argument) {
  return typeof argument == 'function';
};


/***/ }),

/***/ 4705:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(7293);
var isCallable = __webpack_require__(614);

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : isCallable(detection) ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ 8554:
/***/ (function(module) {

// we can't use just `it == null` since of `document.all` special case
// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
module.exports = function (it) {
  return it === null || it === undefined;
};


/***/ }),

/***/ 111:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isCallable = __webpack_require__(614);
var $documentAll = __webpack_require__(4154);

var documentAll = $documentAll.all;

module.exports = $documentAll.IS_HTMLDDA ? function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it) || it === documentAll;
} : function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it);
};


/***/ }),

/***/ 1913:
/***/ (function(module) {

module.exports = false;


/***/ }),

/***/ 2190:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(5005);
var isCallable = __webpack_require__(614);
var isPrototypeOf = __webpack_require__(7976);
var USE_SYMBOL_AS_UID = __webpack_require__(3307);

var $Object = Object;

module.exports = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it));
};


/***/ }),

/***/ 6244:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toLength = __webpack_require__(7466);

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
module.exports = function (obj) {
  return toLength(obj.length);
};


/***/ }),

/***/ 6339:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);
var fails = __webpack_require__(7293);
var isCallable = __webpack_require__(614);
var hasOwn = __webpack_require__(2597);
var DESCRIPTORS = __webpack_require__(9781);
var CONFIGURABLE_FUNCTION_NAME = (__webpack_require__(6530).CONFIGURABLE);
var inspectSource = __webpack_require__(2788);
var InternalStateModule = __webpack_require__(9909);

var enforceInternalState = InternalStateModule.enforce;
var getInternalState = InternalStateModule.get;
var $String = String;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;
var stringSlice = uncurryThis(''.slice);
var replace = uncurryThis(''.replace);
var join = uncurryThis([].join);

var CONFIGURABLE_LENGTH = DESCRIPTORS && !fails(function () {
  return defineProperty(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
});

var TEMPLATE = String(String).split('String');

var makeBuiltIn = module.exports = function (value, name, options) {
  if (stringSlice($String(name), 0, 7) === 'Symbol(') {
    name = '[' + replace($String(name), /^Symbol\(([^)]*)\)/, '$1') + ']';
  }
  if (options && options.getter) name = 'get ' + name;
  if (options && options.setter) name = 'set ' + name;
  if (!hasOwn(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
    if (DESCRIPTORS) defineProperty(value, 'name', { value: name, configurable: true });
    else value.name = name;
  }
  if (CONFIGURABLE_LENGTH && options && hasOwn(options, 'arity') && value.length !== options.arity) {
    defineProperty(value, 'length', { value: options.arity });
  }
  try {
    if (options && hasOwn(options, 'constructor') && options.constructor) {
      if (DESCRIPTORS) defineProperty(value, 'prototype', { writable: false });
    // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
    } else if (value.prototype) value.prototype = undefined;
  } catch (error) { /* empty */ }
  var state = enforceInternalState(value);
  if (!hasOwn(state, 'source')) {
    state.source = join(TEMPLATE, typeof name == 'string' ? name : '');
  } return value;
};

// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
// eslint-disable-next-line no-extend-native -- required
Function.prototype.toString = makeBuiltIn(function toString() {
  return isCallable(this) && getInternalState(this).source || inspectSource(this);
}, 'toString');


/***/ }),

/***/ 4758:
/***/ (function(module) {

var ceil = Math.ceil;
var floor = Math.floor;

// `Math.trunc` method
// https://tc39.es/ecma262/#sec-math.trunc
// eslint-disable-next-line es/no-math-trunc -- safe
module.exports = Math.trunc || function trunc(x) {
  var n = +x;
  return (n > 0 ? floor : ceil)(n);
};


/***/ }),

/***/ 6277:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toString = __webpack_require__(1340);

module.exports = function (argument, $default) {
  return argument === undefined ? arguments.length < 2 ? '' : $default : toString(argument);
};


/***/ }),

/***/ 3070:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9781);
var IE8_DOM_DEFINE = __webpack_require__(4664);
var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(3353);
var anObject = __webpack_require__(9670);
var toPropertyKey = __webpack_require__(4948);

var $TypeError = TypeError;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE = 'configurable';
var WRITABLE = 'writable';

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor(O, P);
    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  } return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw $TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ 1236:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9781);
var call = __webpack_require__(6916);
var propertyIsEnumerableModule = __webpack_require__(5296);
var createPropertyDescriptor = __webpack_require__(9114);
var toIndexedObject = __webpack_require__(5656);
var toPropertyKey = __webpack_require__(4948);
var hasOwn = __webpack_require__(2597);
var IE8_DOM_DEFINE = __webpack_require__(4664);

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPropertyKey(P);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
};


/***/ }),

/***/ 8006:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__(6324);
var enumBugKeys = __webpack_require__(748);

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ 5181:
/***/ (function(__unused_webpack_module, exports) {

// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ 9518:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var hasOwn = __webpack_require__(2597);
var isCallable = __webpack_require__(614);
var toObject = __webpack_require__(7908);
var sharedKey = __webpack_require__(6200);
var CORRECT_PROTOTYPE_GETTER = __webpack_require__(8544);

var IE_PROTO = sharedKey('IE_PROTO');
var $Object = Object;
var ObjectPrototype = $Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
// eslint-disable-next-line es/no-object-getprototypeof -- safe
module.exports = CORRECT_PROTOTYPE_GETTER ? $Object.getPrototypeOf : function (O) {
  var object = toObject(O);
  if (hasOwn(object, IE_PROTO)) return object[IE_PROTO];
  var constructor = object.constructor;
  if (isCallable(constructor) && object instanceof constructor) {
    return constructor.prototype;
  } return object instanceof $Object ? ObjectPrototype : null;
};


/***/ }),

/***/ 7976:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);

module.exports = uncurryThis({}.isPrototypeOf);


/***/ }),

/***/ 6324:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);
var hasOwn = __webpack_require__(2597);
var toIndexedObject = __webpack_require__(5656);
var indexOf = (__webpack_require__(1318).indexOf);
var hiddenKeys = __webpack_require__(3501);

var push = uncurryThis([].push);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (hasOwn(O, key = names[i++])) {
    ~indexOf(result, key) || push(result, key);
  }
  return result;
};


/***/ }),

/***/ 5296:
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;


/***/ }),

/***/ 7674:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* eslint-disable no-proto -- safe */
var uncurryThisAccessor = __webpack_require__(5668);
var anObject = __webpack_require__(9670);
var aPossiblePrototype = __webpack_require__(6077);

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es/no-object-setprototypeof -- safe
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    setter = uncurryThisAccessor(Object.prototype, '__proto__', 'set');
    setter(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);


/***/ }),

/***/ 2140:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var call = __webpack_require__(6916);
var isCallable = __webpack_require__(614);
var isObject = __webpack_require__(111);

var $TypeError = TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
module.exports = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  throw $TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ 3887:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(5005);
var uncurryThis = __webpack_require__(1702);
var getOwnPropertyNamesModule = __webpack_require__(8006);
var getOwnPropertySymbolsModule = __webpack_require__(5181);
var anObject = __webpack_require__(9670);

var concat = uncurryThis([].concat);

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};


/***/ }),

/***/ 4488:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isNullOrUndefined = __webpack_require__(8554);

var $TypeError = TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (isNullOrUndefined(it)) throw $TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ 6200:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var shared = __webpack_require__(2309);
var uid = __webpack_require__(9711);

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ 5465:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var defineGlobalProperty = __webpack_require__(3072);

var SHARED = '__core-js_shared__';
var store = global[SHARED] || defineGlobalProperty(SHARED, {});

module.exports = store;


/***/ }),

/***/ 2309:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var IS_PURE = __webpack_require__(1913);
var store = __webpack_require__(5465);

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.30.2',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2014-2023 Denis Pushkarev (zloirock.ru)',
  license: 'https://github.com/zloirock/core-js/blob/v3.30.2/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});


/***/ }),

/***/ 6293:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* eslint-disable es/no-symbol -- required for testing */
var V8_VERSION = __webpack_require__(7392);
var fails = __webpack_require__(7293);
var global = __webpack_require__(7854);

var $String = global.String;

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol();
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  // nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,
  // of course, fail.
  return !$String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});


/***/ }),

/***/ 1400:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toIntegerOrInfinity = __webpack_require__(9303);

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toIntegerOrInfinity(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ 4599:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toPrimitive = __webpack_require__(7593);

var $TypeError = TypeError;

// `ToBigInt` abstract operation
// https://tc39.es/ecma262/#sec-tobigint
module.exports = function (argument) {
  var prim = toPrimitive(argument, 'number');
  if (typeof prim == 'number') throw $TypeError("Can't convert number to bigint");
  // eslint-disable-next-line es/no-bigint -- safe
  return BigInt(prim);
};


/***/ }),

/***/ 5656:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(8361);
var requireObjectCoercible = __webpack_require__(4488);

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ 9303:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var trunc = __webpack_require__(4758);

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
module.exports = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- NaN check
  return number !== number || number === 0 ? 0 : trunc(number);
};


/***/ }),

/***/ 7466:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toIntegerOrInfinity = __webpack_require__(9303);

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toIntegerOrInfinity(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ 7908:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__(4488);

var $Object = Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function (argument) {
  return $Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ 7593:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var call = __webpack_require__(6916);
var isObject = __webpack_require__(111);
var isSymbol = __webpack_require__(2190);
var getMethod = __webpack_require__(8173);
var ordinaryToPrimitive = __webpack_require__(2140);
var wellKnownSymbol = __webpack_require__(5112);

var $TypeError = TypeError;
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
module.exports = function (input, pref) {
  if (!isObject(input) || isSymbol(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call(exoticToPrim, input, pref);
    if (!isObject(result) || isSymbol(result)) return result;
    throw $TypeError("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};


/***/ }),

/***/ 4948:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toPrimitive = __webpack_require__(7593);
var isSymbol = __webpack_require__(2190);

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
module.exports = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};


/***/ }),

/***/ 1694:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(5112);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';


/***/ }),

/***/ 1340:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var classof = __webpack_require__(648);

var $String = String;

module.exports = function (argument) {
  if (classof(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
  return $String(argument);
};


/***/ }),

/***/ 6330:
/***/ (function(module) {

var $String = String;

module.exports = function (argument) {
  try {
    return $String(argument);
  } catch (error) {
    return 'Object';
  }
};


/***/ }),

/***/ 9711:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);

var id = 0;
var postfix = Math.random();
var toString = uncurryThis(1.0.toString);

module.exports = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};


/***/ }),

/***/ 3307:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* eslint-disable es/no-symbol -- required for testing */
var NATIVE_SYMBOL = __webpack_require__(6293);

module.exports = NATIVE_SYMBOL
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';


/***/ }),

/***/ 3353:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9781);
var fails = __webpack_require__(7293);

// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
module.exports = DESCRIPTORS && fails(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
    value: 42,
    writable: false
  }).prototype != 42;
});


/***/ }),

/***/ 4811:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var isCallable = __webpack_require__(614);

var WeakMap = global.WeakMap;

module.exports = isCallable(WeakMap) && /native code/.test(String(WeakMap));


/***/ }),

/***/ 5112:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var shared = __webpack_require__(2309);
var hasOwn = __webpack_require__(2597);
var uid = __webpack_require__(9711);
var NATIVE_SYMBOL = __webpack_require__(6293);
var USE_SYMBOL_AS_UID = __webpack_require__(3307);

var Symbol = global.Symbol;
var WellKnownSymbolsStore = shared('wks');
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol['for'] || Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!hasOwn(WellKnownSymbolsStore, name)) {
    WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn(Symbol, name)
      ? Symbol[name]
      : createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};


/***/ }),

/***/ 7658:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2109);
var toObject = __webpack_require__(7908);
var lengthOfArrayLike = __webpack_require__(6244);
var setArrayLength = __webpack_require__(3658);
var doesNotExceedSafeInteger = __webpack_require__(7207);
var fails = __webpack_require__(7293);

var INCORRECT_TO_LENGTH = fails(function () {
  return [].push.call({ length: 0x100000000 }, 1) !== 4294967297;
});

// V8 and Safari <= 15.4, FF < 23 throws InternalError
// https://bugs.chromium.org/p/v8/issues/detail?id=12681
var properErrorOnNonWritableLength = function () {
  try {
    // eslint-disable-next-line es/no-object-defineproperty -- safe
    Object.defineProperty([], 'length', { writable: false }).push();
  } catch (error) {
    return error instanceof TypeError;
  }
};

var FORCED = INCORRECT_TO_LENGTH || !properErrorOnNonWritableLength();

// `Array.prototype.push` method
// https://tc39.es/ecma262/#sec-array.prototype.push
$({ target: 'Array', proto: true, arity: 1, forced: FORCED }, {
  // eslint-disable-next-line no-unused-vars -- required for `.length`
  push: function push(item) {
    var O = toObject(this);
    var len = lengthOfArrayLike(O);
    var argCount = arguments.length;
    doesNotExceedSafeInteger(len + argCount);
    for (var i = 0; i < argCount; i++) {
      O[len] = arguments[i];
      len++;
    }
    setArrayLength(O, len);
    return len;
  }
});


/***/ }),

/***/ 1439:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var arrayToReversed = __webpack_require__(1843);
var ArrayBufferViewCore = __webpack_require__(260);

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var getTypedArrayConstructor = ArrayBufferViewCore.getTypedArrayConstructor;

// `%TypedArray%.prototype.toReversed` method
// https://tc39.es/proposal-change-array-by-copy/#sec-%typedarray%.prototype.toReversed
exportTypedArrayMethod('toReversed', function toReversed() {
  return arrayToReversed(aTypedArray(this), getTypedArrayConstructor(this));
});


/***/ }),

/***/ 7585:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__(260);
var uncurryThis = __webpack_require__(1702);
var aCallable = __webpack_require__(9662);
var arrayFromConstructorAndList = __webpack_require__(7745);

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var getTypedArrayConstructor = ArrayBufferViewCore.getTypedArrayConstructor;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;
var sort = uncurryThis(ArrayBufferViewCore.TypedArrayPrototype.sort);

// `%TypedArray%.prototype.toSorted` method
// https://tc39.es/proposal-change-array-by-copy/#sec-%typedarray%.prototype.toSorted
exportTypedArrayMethod('toSorted', function toSorted(compareFn) {
  if (compareFn !== undefined) aCallable(compareFn);
  var O = aTypedArray(this);
  var A = arrayFromConstructorAndList(getTypedArrayConstructor(O), O);
  return sort(A, compareFn);
});


/***/ }),

/***/ 5315:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var arrayWith = __webpack_require__(1572);
var ArrayBufferViewCore = __webpack_require__(260);
var isBigIntArray = __webpack_require__(4067);
var toIntegerOrInfinity = __webpack_require__(9303);
var toBigInt = __webpack_require__(4599);

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var getTypedArrayConstructor = ArrayBufferViewCore.getTypedArrayConstructor;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

var PROPER_ORDER = !!function () {
  try {
    // eslint-disable-next-line no-throw-literal, es/no-typed-arrays, es/no-array-prototype-with -- required for testing
    new Int8Array(1)['with'](2, { valueOf: function () { throw 8; } });
  } catch (error) {
    // some early implementations, like WebKit, does not follow the final semantic
    // https://github.com/tc39/proposal-change-array-by-copy/pull/86
    return error === 8;
  }
}();

// `%TypedArray%.prototype.with` method
// https://tc39.es/proposal-change-array-by-copy/#sec-%typedarray%.prototype.with
exportTypedArrayMethod('with', { 'with': function (index, value) {
  var O = aTypedArray(this);
  var relativeIndex = toIntegerOrInfinity(index);
  var actualValue = isBigIntArray(O) ? toBigInt(value) : +value;
  return arrayWith(O, getTypedArrayConstructor(O), relativeIndex, actualValue);
} }['with'], !PROPER_ORDER);


/***/ }),

/***/ 3767:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

// TODO: Remove from `core-js@4`
__webpack_require__(1439);


/***/ }),

/***/ 8585:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

// TODO: Remove from `core-js@4`
__webpack_require__(7585);


/***/ }),

/***/ 8696:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

// TODO: Remove from `core-js@4`
__webpack_require__(5315);


/***/ }),

/***/ 2801:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2109);
var global = __webpack_require__(7854);
var getBuiltIn = __webpack_require__(5005);
var createPropertyDescriptor = __webpack_require__(9114);
var defineProperty = (__webpack_require__(3070).f);
var hasOwn = __webpack_require__(2597);
var anInstance = __webpack_require__(5787);
var inheritIfRequired = __webpack_require__(9587);
var normalizeStringArgument = __webpack_require__(6277);
var DOMExceptionConstants = __webpack_require__(3678);
var clearErrorStack = __webpack_require__(1060);
var DESCRIPTORS = __webpack_require__(9781);
var IS_PURE = __webpack_require__(1913);

var DOM_EXCEPTION = 'DOMException';
var Error = getBuiltIn('Error');
var NativeDOMException = getBuiltIn(DOM_EXCEPTION);

var $DOMException = function DOMException() {
  anInstance(this, DOMExceptionPrototype);
  var argumentsLength = arguments.length;
  var message = normalizeStringArgument(argumentsLength < 1 ? undefined : arguments[0]);
  var name = normalizeStringArgument(argumentsLength < 2 ? undefined : arguments[1], 'Error');
  var that = new NativeDOMException(message, name);
  var error = Error(message);
  error.name = DOM_EXCEPTION;
  defineProperty(that, 'stack', createPropertyDescriptor(1, clearErrorStack(error.stack, 1)));
  inheritIfRequired(that, this, $DOMException);
  return that;
};

var DOMExceptionPrototype = $DOMException.prototype = NativeDOMException.prototype;

var ERROR_HAS_STACK = 'stack' in Error(DOM_EXCEPTION);
var DOM_EXCEPTION_HAS_STACK = 'stack' in new NativeDOMException(1, 2);

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var descriptor = NativeDOMException && DESCRIPTORS && Object.getOwnPropertyDescriptor(global, DOM_EXCEPTION);

// Bun ~ 0.1.1 DOMException have incorrect descriptor and we can't redefine it
// https://github.com/Jarred-Sumner/bun/issues/399
var BUGGY_DESCRIPTOR = !!descriptor && !(descriptor.writable && descriptor.configurable);

var FORCED_CONSTRUCTOR = ERROR_HAS_STACK && !BUGGY_DESCRIPTOR && !DOM_EXCEPTION_HAS_STACK;

// `DOMException` constructor patch for `.stack` where it's required
// https://webidl.spec.whatwg.org/#es-DOMException-specialness
$({ global: true, constructor: true, forced: IS_PURE || FORCED_CONSTRUCTOR }, { // TODO: fix export logic
  DOMException: FORCED_CONSTRUCTOR ? $DOMException : NativeDOMException
});

var PolyfilledDOMException = getBuiltIn(DOM_EXCEPTION);
var PolyfilledDOMExceptionPrototype = PolyfilledDOMException.prototype;

if (PolyfilledDOMExceptionPrototype.constructor !== PolyfilledDOMException) {
  if (!IS_PURE) {
    defineProperty(PolyfilledDOMExceptionPrototype, 'constructor', createPropertyDescriptor(1, PolyfilledDOMException));
  }

  for (var key in DOMExceptionConstants) if (hasOwn(DOMExceptionConstants, key)) {
    var constant = DOMExceptionConstants[key];
    var constantName = constant.s;
    if (!hasOwn(PolyfilledDOMException, constantName)) {
      defineProperty(PolyfilledDOMException, constantName, createPropertyDescriptor(6, constant.c));
    }
  }
}


/***/ }),

/***/ 4014:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (a, b) {
  if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (b),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else {}
})(this, function () {
  "use strict";

  function b(a, b) {
    return "undefined" == typeof b ? b = {
      autoBom: !1
    } : "object" != typeof b && (console.warn("Deprecated: Expected third argument to be a object"), b = {
      autoBom: !b
    }), b.autoBom && /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a.type) ? new Blob(["\uFEFF", a], {
      type: a.type
    }) : a;
  }
  function c(a, b, c) {
    var d = new XMLHttpRequest();
    d.open("GET", a), d.responseType = "blob", d.onload = function () {
      g(d.response, b, c);
    }, d.onerror = function () {
      console.error("could not download file");
    }, d.send();
  }
  function d(a) {
    var b = new XMLHttpRequest();
    b.open("HEAD", a, !1);
    try {
      b.send();
    } catch (a) {}
    return 200 <= b.status && 299 >= b.status;
  }
  function e(a) {
    try {
      a.dispatchEvent(new MouseEvent("click"));
    } catch (c) {
      var b = document.createEvent("MouseEvents");
      b.initMouseEvent("click", !0, !0, window, 0, 0, 0, 80, 20, !1, !1, !1, !1, 0, null), a.dispatchEvent(b);
    }
  }
  var f = "object" == typeof window && window.window === window ? window : "object" == typeof self && self.self === self ? self : "object" == typeof __webpack_require__.g && __webpack_require__.g.global === __webpack_require__.g ? __webpack_require__.g : void 0,
    a = f.navigator && /Macintosh/.test(navigator.userAgent) && /AppleWebKit/.test(navigator.userAgent) && !/Safari/.test(navigator.userAgent),
    g = f.saveAs || ("object" != typeof window || window !== f ? function () {} : "download" in HTMLAnchorElement.prototype && !a ? function (b, g, h) {
      var i = f.URL || f.webkitURL,
        j = document.createElement("a");
      g = g || b.name || "download", j.download = g, j.rel = "noopener", "string" == typeof b ? (j.href = b, j.origin === location.origin ? e(j) : d(j.href) ? c(b, g, h) : e(j, j.target = "_blank")) : (j.href = i.createObjectURL(b), setTimeout(function () {
        i.revokeObjectURL(j.href);
      }, 4E4), setTimeout(function () {
        e(j);
      }, 0));
    } : "msSaveOrOpenBlob" in navigator ? function (f, g, h) {
      if (g = g || f.name || "download", "string" != typeof f) navigator.msSaveOrOpenBlob(b(f, h), g);else if (d(f)) c(f, g, h);else {
        var i = document.createElement("a");
        i.href = f, i.target = "_blank", setTimeout(function () {
          e(i);
        });
      }
    } : function (b, d, e, g) {
      if (g = g || open("", "_blank"), g && (g.document.title = g.document.body.innerText = "downloading..."), "string" == typeof b) return c(b, d, e);
      var h = "application/octet-stream" === b.type,
        i = /constructor/i.test(f.HTMLElement) || f.safari,
        j = /CriOS\/[\d]+/.test(navigator.userAgent);
      if ((j || h && i || a) && "undefined" != typeof FileReader) {
        var k = new FileReader();
        k.onloadend = function () {
          var a = k.result;
          a = j ? a : a.replace(/^data:[^;]*;/, "data:attachment/file;"), g ? g.location.href = a : location = a, g = null;
        }, k.readAsDataURL(b);
      } else {
        var l = f.URL || f.webkitURL,
          m = l.createObjectURL(b);
        g ? g.location = m : location.href = m, g = null, setTimeout(function () {
          l.revokeObjectURL(m);
        }, 4E4);
      }
    });
  f.saveAs = g.saveAs = g,  true && (module.exports = g);
});

/***/ }),

/***/ 7107:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;__webpack_require__(7658);
/*!
 * jQuery JavaScript Library v3.7.0
 * https://jquery.com/
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2023-05-11T18:29Z
 */
(function (global, factory) {
  "use strict";

  if ( true && typeof module.exports === "object") {
    // For CommonJS and CommonJS-like environments where a proper `window`
    // is present, execute the factory and get jQuery.
    // For environments that do not have a `window` with a `document`
    // (such as Node.js), expose a factory as module.exports.
    // This accentuates the need for the creation of a real `window`.
    // e.g. var jQuery = require("jquery")(window);
    // See ticket trac-14549 for more info.
    module.exports = global.document ? factory(global, true) : function (w) {
      if (!w.document) {
        throw new Error("jQuery requires a window with a document");
      }
      return factory(w);
    };
  } else {
    factory(global);
  }

  // Pass this if window is not defined yet
})(typeof window !== "undefined" ? window : this, function (window, noGlobal) {
  // Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
  // throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
  // arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
  // enough that all such attempts are guarded in a try block.
  "use strict";

  var arr = [];
  var getProto = Object.getPrototypeOf;
  var slice = arr.slice;
  var flat = arr.flat ? function (array) {
    return arr.flat.call(array);
  } : function (array) {
    return arr.concat.apply([], array);
  };
  var push = arr.push;
  var indexOf = arr.indexOf;
  var class2type = {};
  var toString = class2type.toString;
  var hasOwn = class2type.hasOwnProperty;
  var fnToString = hasOwn.toString;
  var ObjectFunctionString = fnToString.call(Object);
  var support = {};
  var isFunction = function isFunction(obj) {
    // Support: Chrome <=57, Firefox <=52
    // In some browsers, typeof returns "function" for HTML <object> elements
    // (i.e., `typeof document.createElement( "object" ) === "function"`).
    // We don't want to classify *any* DOM node as a function.
    // Support: QtWeb <=3.8.5, WebKit <=534.34, wkhtmltopdf tool <=0.12.5
    // Plus for old WebKit, typeof returns "function" for HTML collections
    // (e.g., `typeof document.getElementsByTagName("div") === "function"`). (gh-4756)
    return typeof obj === "function" && typeof obj.nodeType !== "number" && typeof obj.item !== "function";
  };
  var isWindow = function isWindow(obj) {
    return obj != null && obj === obj.window;
  };
  var document = window.document;
  var preservedScriptAttributes = {
    type: true,
    src: true,
    nonce: true,
    noModule: true
  };
  function DOMEval(code, node, doc) {
    doc = doc || document;
    var i,
      val,
      script = doc.createElement("script");
    script.text = code;
    if (node) {
      for (i in preservedScriptAttributes) {
        // Support: Firefox 64+, Edge 18+
        // Some browsers don't support the "nonce" property on scripts.
        // On the other hand, just using `getAttribute` is not enough as
        // the `nonce` attribute is reset to an empty string whenever it
        // becomes browsing-context connected.
        // See https://github.com/whatwg/html/issues/2369
        // See https://html.spec.whatwg.org/#nonce-attributes
        // The `node.getAttribute` check was added for the sake of
        // `jQuery.globalEval` so that it can fake a nonce-containing node
        // via an object.
        val = node[i] || node.getAttribute && node.getAttribute(i);
        if (val) {
          script.setAttribute(i, val);
        }
      }
    }
    doc.head.appendChild(script).parentNode.removeChild(script);
  }
  function toType(obj) {
    if (obj == null) {
      return obj + "";
    }

    // Support: Android <=2.3 only (functionish RegExp)
    return typeof obj === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj;
  }
  /* global Symbol */
  // Defining this global in .eslintrc.json would create a danger of using the global
  // unguarded in another place, it seems safer to define global only for this module

  var version = "3.7.0",
    rhtmlSuffix = /HTML$/i,
    // Define a local copy of jQuery
    jQuery = function (selector, context) {
      // The jQuery object is actually just the init constructor 'enhanced'
      // Need init if jQuery is called (just allow error to be thrown if not included)
      return new jQuery.fn.init(selector, context);
    };
  jQuery.fn = jQuery.prototype = {
    // The current version of jQuery being used
    jquery: version,
    constructor: jQuery,
    // The default length of a jQuery object is 0
    length: 0,
    toArray: function () {
      return slice.call(this);
    },
    // Get the Nth element in the matched element set OR
    // Get the whole matched element set as a clean array
    get: function (num) {
      // Return all the elements in a clean array
      if (num == null) {
        return slice.call(this);
      }

      // Return just the one element from the set
      return num < 0 ? this[num + this.length] : this[num];
    },
    // Take an array of elements and push it onto the stack
    // (returning the new matched element set)
    pushStack: function (elems) {
      // Build a new jQuery matched element set
      var ret = jQuery.merge(this.constructor(), elems);

      // Add the old object onto the stack (as a reference)
      ret.prevObject = this;

      // Return the newly-formed element set
      return ret;
    },
    // Execute a callback for every element in the matched set.
    each: function (callback) {
      return jQuery.each(this, callback);
    },
    map: function (callback) {
      return this.pushStack(jQuery.map(this, function (elem, i) {
        return callback.call(elem, i, elem);
      }));
    },
    slice: function () {
      return this.pushStack(slice.apply(this, arguments));
    },
    first: function () {
      return this.eq(0);
    },
    last: function () {
      return this.eq(-1);
    },
    even: function () {
      return this.pushStack(jQuery.grep(this, function (_elem, i) {
        return (i + 1) % 2;
      }));
    },
    odd: function () {
      return this.pushStack(jQuery.grep(this, function (_elem, i) {
        return i % 2;
      }));
    },
    eq: function (i) {
      var len = this.length,
        j = +i + (i < 0 ? len : 0);
      return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
    },
    end: function () {
      return this.prevObject || this.constructor();
    },
    // For internal use only.
    // Behaves like an Array's method, not like a jQuery method.
    push: push,
    sort: arr.sort,
    splice: arr.splice
  };
  jQuery.extend = jQuery.fn.extend = function () {
    var options,
      name,
      src,
      copy,
      copyIsArray,
      clone,
      target = arguments[0] || {},
      i = 1,
      length = arguments.length,
      deep = false;

    // Handle a deep copy situation
    if (typeof target === "boolean") {
      deep = target;

      // Skip the boolean and the target
      target = arguments[i] || {};
      i++;
    }

    // Handle case when target is a string or something (possible in deep copy)
    if (typeof target !== "object" && !isFunction(target)) {
      target = {};
    }

    // Extend jQuery itself if only one argument is passed
    if (i === length) {
      target = this;
      i--;
    }
    for (; i < length; i++) {
      // Only deal with non-null/undefined values
      if ((options = arguments[i]) != null) {
        // Extend the base object
        for (name in options) {
          copy = options[name];

          // Prevent Object.prototype pollution
          // Prevent never-ending loop
          if (name === "__proto__" || target === copy) {
            continue;
          }

          // Recurse if we're merging plain objects or arrays
          if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
            src = target[name];

            // Ensure proper type for the source value
            if (copyIsArray && !Array.isArray(src)) {
              clone = [];
            } else if (!copyIsArray && !jQuery.isPlainObject(src)) {
              clone = {};
            } else {
              clone = src;
            }
            copyIsArray = false;

            // Never move original objects, clone them
            target[name] = jQuery.extend(deep, clone, copy);

            // Don't bring in undefined values
          } else if (copy !== undefined) {
            target[name] = copy;
          }
        }
      }
    }

    // Return the modified object
    return target;
  };
  jQuery.extend({
    // Unique for each copy of jQuery on the page
    expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
    // Assume jQuery is ready without the ready module
    isReady: true,
    error: function (msg) {
      throw new Error(msg);
    },
    noop: function () {},
    isPlainObject: function (obj) {
      var proto, Ctor;

      // Detect obvious negatives
      // Use toString instead of jQuery.type to catch host objects
      if (!obj || toString.call(obj) !== "[object Object]") {
        return false;
      }
      proto = getProto(obj);

      // Objects with no prototype (e.g., `Object.create( null )`) are plain
      if (!proto) {
        return true;
      }

      // Objects with prototype are plain iff they were constructed by a global Object function
      Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
      return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
    },
    isEmptyObject: function (obj) {
      var name;
      for (name in obj) {
        return false;
      }
      return true;
    },
    // Evaluates a script in a provided context; falls back to the global one
    // if not specified.
    globalEval: function (code, options, doc) {
      DOMEval(code, {
        nonce: options && options.nonce
      }, doc);
    },
    each: function (obj, callback) {
      var length,
        i = 0;
      if (isArrayLike(obj)) {
        length = obj.length;
        for (; i < length; i++) {
          if (callback.call(obj[i], i, obj[i]) === false) {
            break;
          }
        }
      } else {
        for (i in obj) {
          if (callback.call(obj[i], i, obj[i]) === false) {
            break;
          }
        }
      }
      return obj;
    },
    // Retrieve the text value of an array of DOM nodes
    text: function (elem) {
      var node,
        ret = "",
        i = 0,
        nodeType = elem.nodeType;
      if (!nodeType) {
        // If no nodeType, this is expected to be an array
        while (node = elem[i++]) {
          // Do not traverse comment nodes
          ret += jQuery.text(node);
        }
      } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
        return elem.textContent;
      } else if (nodeType === 3 || nodeType === 4) {
        return elem.nodeValue;
      }

      // Do not include comment or processing instruction nodes

      return ret;
    },
    // results is for internal usage only
    makeArray: function (arr, results) {
      var ret = results || [];
      if (arr != null) {
        if (isArrayLike(Object(arr))) {
          jQuery.merge(ret, typeof arr === "string" ? [arr] : arr);
        } else {
          push.call(ret, arr);
        }
      }
      return ret;
    },
    inArray: function (elem, arr, i) {
      return arr == null ? -1 : indexOf.call(arr, elem, i);
    },
    isXMLDoc: function (elem) {
      var namespace = elem && elem.namespaceURI,
        docElem = elem && (elem.ownerDocument || elem).documentElement;

      // Assume HTML when documentElement doesn't yet exist, such as inside
      // document fragments.
      return !rhtmlSuffix.test(namespace || docElem && docElem.nodeName || "HTML");
    },
    // Support: Android <=4.0 only, PhantomJS 1 only
    // push.apply(_, arraylike) throws on ancient WebKit
    merge: function (first, second) {
      var len = +second.length,
        j = 0,
        i = first.length;
      for (; j < len; j++) {
        first[i++] = second[j];
      }
      first.length = i;
      return first;
    },
    grep: function (elems, callback, invert) {
      var callbackInverse,
        matches = [],
        i = 0,
        length = elems.length,
        callbackExpect = !invert;

      // Go through the array, only saving the items
      // that pass the validator function
      for (; i < length; i++) {
        callbackInverse = !callback(elems[i], i);
        if (callbackInverse !== callbackExpect) {
          matches.push(elems[i]);
        }
      }
      return matches;
    },
    // arg is for internal usage only
    map: function (elems, callback, arg) {
      var length,
        value,
        i = 0,
        ret = [];

      // Go through the array, translating each of the items to their new values
      if (isArrayLike(elems)) {
        length = elems.length;
        for (; i < length; i++) {
          value = callback(elems[i], i, arg);
          if (value != null) {
            ret.push(value);
          }
        }

        // Go through every key on the object,
      } else {
        for (i in elems) {
          value = callback(elems[i], i, arg);
          if (value != null) {
            ret.push(value);
          }
        }
      }

      // Flatten any nested arrays
      return flat(ret);
    },
    // A global GUID counter for objects
    guid: 1,
    // jQuery.support is not used in Core but other projects attach their
    // properties to it so it needs to exist.
    support: support
  });
  if (typeof Symbol === "function") {
    jQuery.fn[Symbol.iterator] = arr[Symbol.iterator];
  }

  // Populate the class2type map
  jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (_i, name) {
    class2type["[object " + name + "]"] = name.toLowerCase();
  });
  function isArrayLike(obj) {
    // Support: real iOS 8.2 only (not reproducible in simulator)
    // `in` check used to prevent JIT error (gh-2145)
    // hasOwn isn't used here due to false negatives
    // regarding Nodelist length in IE
    var length = !!obj && "length" in obj && obj.length,
      type = toType(obj);
    if (isFunction(obj) || isWindow(obj)) {
      return false;
    }
    return type === "array" || length === 0 || typeof length === "number" && length > 0 && length - 1 in obj;
  }
  function nodeName(elem, name) {
    return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
  }
  var pop = arr.pop;
  var sort = arr.sort;
  var splice = arr.splice;
  var whitespace = "[\\x20\\t\\r\\n\\f]";
  var rtrimCSS = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g");

  // Note: an element does not contain itself
  jQuery.contains = function (a, b) {
    var bup = b && b.parentNode;
    return a === bup || !!(bup && bup.nodeType === 1 && (
    // Support: IE 9 - 11+
    // IE doesn't have `contains` on SVG.
    a.contains ? a.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
  };

  // CSS string/identifier serialization
  // https://drafts.csswg.org/cssom/#common-serializing-idioms
  var rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g;
  function fcssescape(ch, asCodePoint) {
    if (asCodePoint) {
      // U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
      if (ch === "\0") {
        return "\uFFFD";
      }

      // Control characters and (dependent upon position) numbers get escaped as code points
      return ch.slice(0, -1) + "\\" + ch.charCodeAt(ch.length - 1).toString(16) + " ";
    }

    // Other potentially-special ASCII characters get backslash-escaped
    return "\\" + ch;
  }
  jQuery.escapeSelector = function (sel) {
    return (sel + "").replace(rcssescape, fcssescape);
  };
  var preferredDoc = document,
    pushNative = push;
  (function () {
    var i,
      Expr,
      outermostContext,
      sortInput,
      hasDuplicate,
      push = pushNative,
      // Local document vars
      document,
      documentElement,
      documentIsHTML,
      rbuggyQSA,
      matches,
      // Instance-specific data
      expando = jQuery.expando,
      dirruns = 0,
      done = 0,
      classCache = createCache(),
      tokenCache = createCache(),
      compilerCache = createCache(),
      nonnativeSelectorCache = createCache(),
      sortOrder = function (a, b) {
        if (a === b) {
          hasDuplicate = true;
        }
        return 0;
      },
      booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|" + "loop|multiple|open|readonly|required|scoped",
      // Regular expressions

      // https://www.w3.org/TR/css-syntax-3/#ident-token-diagram
      identifier = "(?:\\\\[\\da-fA-F]{1,6}" + whitespace + "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+",
      // Attribute selectors: https://www.w3.org/TR/selectors/#attribute-selectors
      attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
      // Operator (capture 2)
      "*([*^$|!~]?=)" + whitespace +
      // "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
      "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace + "*\\]",
      pseudos = ":(" + identifier + ")(?:\\((" +
      // To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
      // 1. quoted (capture 3; capture 4 or capture 5)
      "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
      // 2. simple (capture 6)
      "((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
      // 3. anything else (capture 2)
      ".*" + ")\\)|)",
      // Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
      rwhitespace = new RegExp(whitespace + "+", "g"),
      rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
      rleadingCombinator = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"),
      rdescend = new RegExp(whitespace + "|>"),
      rpseudo = new RegExp(pseudos),
      ridentifier = new RegExp("^" + identifier + "$"),
      matchExpr = {
        ID: new RegExp("^#(" + identifier + ")"),
        CLASS: new RegExp("^\\.(" + identifier + ")"),
        TAG: new RegExp("^(" + identifier + "|[*])"),
        ATTR: new RegExp("^" + attributes),
        PSEUDO: new RegExp("^" + pseudos),
        CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace + "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
        bool: new RegExp("^(?:" + booleans + ")$", "i"),
        // For use in libraries implementing .is()
        // We use this for POS matching in `select`
        needsContext: new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
      },
      rinputs = /^(?:input|select|textarea|button)$/i,
      rheader = /^h\d$/i,
      // Easily-parseable/retrievable ID or TAG or CLASS selectors
      rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
      rsibling = /[+~]/,
      // CSS escapes
      // https://www.w3.org/TR/CSS21/syndata.html#escaped-characters
      runescape = new RegExp("\\\\[\\da-fA-F]{1,6}" + whitespace + "?|\\\\([^\\r\\n\\f])", "g"),
      funescape = function (escape, nonHex) {
        var high = "0x" + escape.slice(1) - 0x10000;
        if (nonHex) {
          // Strip the backslash prefix from a non-hex escape sequence
          return nonHex;
        }

        // Replace a hexadecimal escape sequence with the encoded Unicode code point
        // Support: IE <=11+
        // For values outside the Basic Multilingual Plane (BMP), manually construct a
        // surrogate pair
        return high < 0 ? String.fromCharCode(high + 0x10000) : String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00);
      },
      // Used for iframes; see `setDocument`.
      // Support: IE 9 - 11+, Edge 12 - 18+
      // Removing the function wrapper causes a "Permission Denied"
      // error in IE/Edge.
      unloadHandler = function () {
        setDocument();
      },
      inDisabledFieldset = addCombinator(function (elem) {
        return elem.disabled === true && nodeName(elem, "fieldset");
      }, {
        dir: "parentNode",
        next: "legend"
      });

    // Support: IE <=9 only
    // Accessing document.activeElement can throw unexpectedly
    // https://bugs.jquery.com/ticket/13393
    function safeActiveElement() {
      try {
        return document.activeElement;
      } catch (err) {}
    }

    // Optimize for push.apply( _, NodeList )
    try {
      push.apply(arr = slice.call(preferredDoc.childNodes), preferredDoc.childNodes);

      // Support: Android <=4.0
      // Detect silently failing push.apply
      // eslint-disable-next-line no-unused-expressions
      arr[preferredDoc.childNodes.length].nodeType;
    } catch (e) {
      push = {
        apply: function (target, els) {
          pushNative.apply(target, slice.call(els));
        },
        call: function (target) {
          pushNative.apply(target, slice.call(arguments, 1));
        }
      };
    }
    function find(selector, context, results, seed) {
      var m,
        i,
        elem,
        nid,
        match,
        groups,
        newSelector,
        newContext = context && context.ownerDocument,
        // nodeType defaults to 9, since context defaults to document
        nodeType = context ? context.nodeType : 9;
      results = results || [];

      // Return early from calls with invalid selector or context
      if (typeof selector !== "string" || !selector || nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {
        return results;
      }

      // Try to shortcut find operations (as opposed to filters) in HTML documents
      if (!seed) {
        setDocument(context);
        context = context || document;
        if (documentIsHTML) {
          // If the selector is sufficiently simple, try using a "get*By*" DOM method
          // (excepting DocumentFragment context, where the methods don't exist)
          if (nodeType !== 11 && (match = rquickExpr.exec(selector))) {
            // ID selector
            if (m = match[1]) {
              // Document context
              if (nodeType === 9) {
                if (elem = context.getElementById(m)) {
                  // Support: IE 9 only
                  // getElementById can match elements by name instead of ID
                  if (elem.id === m) {
                    push.call(results, elem);
                    return results;
                  }
                } else {
                  return results;
                }

                // Element context
              } else {
                // Support: IE 9 only
                // getElementById can match elements by name instead of ID
                if (newContext && (elem = newContext.getElementById(m)) && find.contains(context, elem) && elem.id === m) {
                  push.call(results, elem);
                  return results;
                }
              }

              // Type selector
            } else if (match[2]) {
              push.apply(results, context.getElementsByTagName(selector));
              return results;

              // Class selector
            } else if ((m = match[3]) && context.getElementsByClassName) {
              push.apply(results, context.getElementsByClassName(m));
              return results;
            }
          }

          // Take advantage of querySelectorAll
          if (!nonnativeSelectorCache[selector + " "] && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
            newSelector = selector;
            newContext = context;

            // qSA considers elements outside a scoping root when evaluating child or
            // descendant combinators, which is not what we want.
            // In such cases, we work around the behavior by prefixing every selector in the
            // list with an ID selector referencing the scope context.
            // The technique has to be used as well when a leading combinator is used
            // as such selectors are not recognized by querySelectorAll.
            // Thanks to Andrew Dupont for this technique.
            if (nodeType === 1 && (rdescend.test(selector) || rleadingCombinator.test(selector))) {
              // Expand context for sibling selectors
              newContext = rsibling.test(selector) && testContext(context.parentNode) || context;

              // We can use :scope instead of the ID hack if the browser
              // supports it & if we're not changing the context.
              // Support: IE 11+, Edge 17 - 18+
              // IE/Edge sometimes throw a "Permission denied" error when
              // strict-comparing two documents; shallow comparisons work.
              // eslint-disable-next-line eqeqeq
              if (newContext != context || !support.scope) {
                // Capture the context ID, setting it first if necessary
                if (nid = context.getAttribute("id")) {
                  nid = jQuery.escapeSelector(nid);
                } else {
                  context.setAttribute("id", nid = expando);
                }
              }

              // Prefix every selector in the list
              groups = tokenize(selector);
              i = groups.length;
              while (i--) {
                groups[i] = (nid ? "#" + nid : ":scope") + " " + toSelector(groups[i]);
              }
              newSelector = groups.join(",");
            }
            try {
              push.apply(results, newContext.querySelectorAll(newSelector));
              return results;
            } catch (qsaError) {
              nonnativeSelectorCache(selector, true);
            } finally {
              if (nid === expando) {
                context.removeAttribute("id");
              }
            }
          }
        }
      }

      // All others
      return select(selector.replace(rtrimCSS, "$1"), context, results, seed);
    }

    /**
     * Create key-value caches of limited size
     * @returns {function(string, object)} Returns the Object data after storing it on itself with
     *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
     *	deleting the oldest entry
     */
    function createCache() {
      var keys = [];
      function cache(key, value) {
        // Use (key + " ") to avoid collision with native prototype properties
        // (see https://github.com/jquery/sizzle/issues/157)
        if (keys.push(key + " ") > Expr.cacheLength) {
          // Only keep the most recent entries
          delete cache[keys.shift()];
        }
        return cache[key + " "] = value;
      }
      return cache;
    }

    /**
     * Mark a function for special use by jQuery selector module
     * @param {Function} fn The function to mark
     */
    function markFunction(fn) {
      fn[expando] = true;
      return fn;
    }

    /**
     * Support testing using an element
     * @param {Function} fn Passed the created element and returns a boolean result
     */
    function assert(fn) {
      var el = document.createElement("fieldset");
      try {
        return !!fn(el);
      } catch (e) {
        return false;
      } finally {
        // Remove from its parent by default
        if (el.parentNode) {
          el.parentNode.removeChild(el);
        }

        // release memory in IE
        el = null;
      }
    }

    /**
     * Returns a function to use in pseudos for input types
     * @param {String} type
     */
    function createInputPseudo(type) {
      return function (elem) {
        return nodeName(elem, "input") && elem.type === type;
      };
    }

    /**
     * Returns a function to use in pseudos for buttons
     * @param {String} type
     */
    function createButtonPseudo(type) {
      return function (elem) {
        return (nodeName(elem, "input") || nodeName(elem, "button")) && elem.type === type;
      };
    }

    /**
     * Returns a function to use in pseudos for :enabled/:disabled
     * @param {Boolean} disabled true for :disabled; false for :enabled
     */
    function createDisabledPseudo(disabled) {
      // Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
      return function (elem) {
        // Only certain elements can match :enabled or :disabled
        // https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
        // https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
        if ("form" in elem) {
          // Check for inherited disabledness on relevant non-disabled elements:
          // * listed form-associated elements in a disabled fieldset
          //   https://html.spec.whatwg.org/multipage/forms.html#category-listed
          //   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
          // * option elements in a disabled optgroup
          //   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
          // All such elements have a "form" property.
          if (elem.parentNode && elem.disabled === false) {
            // Option elements defer to a parent optgroup if present
            if ("label" in elem) {
              if ("label" in elem.parentNode) {
                return elem.parentNode.disabled === disabled;
              } else {
                return elem.disabled === disabled;
              }
            }

            // Support: IE 6 - 11+
            // Use the isDisabled shortcut property to check for disabled fieldset ancestors
            return elem.isDisabled === disabled ||
            // Where there is no isDisabled, check manually
            elem.isDisabled !== !disabled && inDisabledFieldset(elem) === disabled;
          }
          return elem.disabled === disabled;

          // Try to winnow out elements that can't be disabled before trusting the disabled property.
          // Some victims get caught in our net (label, legend, menu, track), but it shouldn't
          // even exist on them, let alone have a boolean value.
        } else if ("label" in elem) {
          return elem.disabled === disabled;
        }

        // Remaining elements are neither :enabled nor :disabled
        return false;
      };
    }

    /**
     * Returns a function to use in pseudos for positionals
     * @param {Function} fn
     */
    function createPositionalPseudo(fn) {
      return markFunction(function (argument) {
        argument = +argument;
        return markFunction(function (seed, matches) {
          var j,
            matchIndexes = fn([], seed.length, argument),
            i = matchIndexes.length;

          // Match elements found at the specified indexes
          while (i--) {
            if (seed[j = matchIndexes[i]]) {
              seed[j] = !(matches[j] = seed[j]);
            }
          }
        });
      });
    }

    /**
     * Checks a node for validity as a jQuery selector context
     * @param {Element|Object=} context
     * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
     */
    function testContext(context) {
      return context && typeof context.getElementsByTagName !== "undefined" && context;
    }

    /**
     * Sets document-related variables once based on the current document
     * @param {Element|Object} [node] An element or document object to use to set the document
     * @returns {Object} Returns the current document
     */
    function setDocument(node) {
      var subWindow,
        doc = node ? node.ownerDocument || node : preferredDoc;

      // Return early if doc is invalid or already selected
      // Support: IE 11+, Edge 17 - 18+
      // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
      // two documents; shallow comparisons work.
      // eslint-disable-next-line eqeqeq
      if (doc == document || doc.nodeType !== 9 || !doc.documentElement) {
        return document;
      }

      // Update global variables
      document = doc;
      documentElement = document.documentElement;
      documentIsHTML = !jQuery.isXMLDoc(document);

      // Support: iOS 7 only, IE 9 - 11+
      // Older browsers didn't support unprefixed `matches`.
      matches = documentElement.matches || documentElement.webkitMatchesSelector || documentElement.msMatchesSelector;

      // Support: IE 9 - 11+, Edge 12 - 18+
      // Accessing iframe documents after unload throws "permission denied" errors (see trac-13936)
      // Support: IE 11+, Edge 17 - 18+
      // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
      // two documents; shallow comparisons work.
      // eslint-disable-next-line eqeqeq
      if (preferredDoc != document && (subWindow = document.defaultView) && subWindow.top !== subWindow) {
        // Support: IE 9 - 11+, Edge 12 - 18+
        subWindow.addEventListener("unload", unloadHandler);
      }

      // Support: IE <10
      // Check if getElementById returns elements by name
      // The broken getElementById methods don't pick up programmatically-set names,
      // so use a roundabout getElementsByName test
      support.getById = assert(function (el) {
        documentElement.appendChild(el).id = jQuery.expando;
        return !document.getElementsByName || !document.getElementsByName(jQuery.expando).length;
      });

      // Support: IE 9 only
      // Check to see if it's possible to do matchesSelector
      // on a disconnected node.
      support.disconnectedMatch = assert(function (el) {
        return matches.call(el, "*");
      });

      // Support: IE 9 - 11+, Edge 12 - 18+
      // IE/Edge don't support the :scope pseudo-class.
      support.scope = assert(function () {
        return document.querySelectorAll(":scope");
      });

      // Support: Chrome 105 - 111 only, Safari 15.4 - 16.3 only
      // Make sure the `:has()` argument is parsed unforgivingly.
      // We include `*` in the test to detect buggy implementations that are
      // _selectively_ forgiving (specifically when the list includes at least
      // one valid selector).
      // Note that we treat complete lack of support for `:has()` as if it were
      // spec-compliant support, which is fine because use of `:has()` in such
      // environments will fail in the qSA path and fall back to jQuery traversal
      // anyway.
      support.cssHas = assert(function () {
        try {
          document.querySelector(":has(*,:jqfake)");
          return false;
        } catch (e) {
          return true;
        }
      });

      // ID filter and find
      if (support.getById) {
        Expr.filter.ID = function (id) {
          var attrId = id.replace(runescape, funescape);
          return function (elem) {
            return elem.getAttribute("id") === attrId;
          };
        };
        Expr.find.ID = function (id, context) {
          if (typeof context.getElementById !== "undefined" && documentIsHTML) {
            var elem = context.getElementById(id);
            return elem ? [elem] : [];
          }
        };
      } else {
        Expr.filter.ID = function (id) {
          var attrId = id.replace(runescape, funescape);
          return function (elem) {
            var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
            return node && node.value === attrId;
          };
        };

        // Support: IE 6 - 7 only
        // getElementById is not reliable as a find shortcut
        Expr.find.ID = function (id, context) {
          if (typeof context.getElementById !== "undefined" && documentIsHTML) {
            var node,
              i,
              elems,
              elem = context.getElementById(id);
            if (elem) {
              // Verify the id attribute
              node = elem.getAttributeNode("id");
              if (node && node.value === id) {
                return [elem];
              }

              // Fall back on getElementsByName
              elems = context.getElementsByName(id);
              i = 0;
              while (elem = elems[i++]) {
                node = elem.getAttributeNode("id");
                if (node && node.value === id) {
                  return [elem];
                }
              }
            }
            return [];
          }
        };
      }

      // Tag
      Expr.find.TAG = function (tag, context) {
        if (typeof context.getElementsByTagName !== "undefined") {
          return context.getElementsByTagName(tag);

          // DocumentFragment nodes don't have gEBTN
        } else {
          return context.querySelectorAll(tag);
        }
      };

      // Class
      Expr.find.CLASS = function (className, context) {
        if (typeof context.getElementsByClassName !== "undefined" && documentIsHTML) {
          return context.getElementsByClassName(className);
        }
      };

      /* QSA/matchesSelector
      ---------------------------------------------------------------------- */

      // QSA and matchesSelector support

      rbuggyQSA = [];

      // Build QSA regex
      // Regex strategy adopted from Diego Perini
      assert(function (el) {
        var input;
        documentElement.appendChild(el).innerHTML = "<a id='" + expando + "' href='' disabled='disabled'></a>" + "<select id='" + expando + "-\r\\' disabled='disabled'>" + "<option selected=''></option></select>";

        // Support: iOS <=7 - 8 only
        // Boolean attributes and "value" are not treated correctly in some XML documents
        if (!el.querySelectorAll("[selected]").length) {
          rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
        }

        // Support: iOS <=7 - 8 only
        if (!el.querySelectorAll("[id~=" + expando + "-]").length) {
          rbuggyQSA.push("~=");
        }

        // Support: iOS 8 only
        // https://bugs.webkit.org/show_bug.cgi?id=136851
        // In-page `selector#id sibling-combinator selector` fails
        if (!el.querySelectorAll("a#" + expando + "+*").length) {
          rbuggyQSA.push(".#.+[+~]");
        }

        // Support: Chrome <=105+, Firefox <=104+, Safari <=15.4+
        // In some of the document kinds, these selectors wouldn't work natively.
        // This is probably OK but for backwards compatibility we want to maintain
        // handling them through jQuery traversal in jQuery 3.x.
        if (!el.querySelectorAll(":checked").length) {
          rbuggyQSA.push(":checked");
        }

        // Support: Windows 8 Native Apps
        // The type and name attributes are restricted during .innerHTML assignment
        input = document.createElement("input");
        input.setAttribute("type", "hidden");
        el.appendChild(input).setAttribute("name", "D");

        // Support: IE 9 - 11+
        // IE's :disabled selector does not pick up the children of disabled fieldsets
        // Support: Chrome <=105+, Firefox <=104+, Safari <=15.4+
        // In some of the document kinds, these selectors wouldn't work natively.
        // This is probably OK but for backwards compatibility we want to maintain
        // handling them through jQuery traversal in jQuery 3.x.
        documentElement.appendChild(el).disabled = true;
        if (el.querySelectorAll(":disabled").length !== 2) {
          rbuggyQSA.push(":enabled", ":disabled");
        }

        // Support: IE 11+, Edge 15 - 18+
        // IE 11/Edge don't find elements on a `[name='']` query in some cases.
        // Adding a temporary attribute to the document before the selection works
        // around the issue.
        // Interestingly, IE 10 & older don't seem to have the issue.
        input = document.createElement("input");
        input.setAttribute("name", "");
        el.appendChild(input);
        if (!el.querySelectorAll("[name='']").length) {
          rbuggyQSA.push("\\[" + whitespace + "*name" + whitespace + "*=" + whitespace + "*(?:''|\"\")");
        }
      });
      if (!support.cssHas) {
        // Support: Chrome 105 - 110+, Safari 15.4 - 16.3+
        // Our regular `try-catch` mechanism fails to detect natively-unsupported
        // pseudo-classes inside `:has()` (such as `:has(:contains("Foo"))`)
        // in browsers that parse the `:has()` argument as a forgiving selector list.
        // https://drafts.csswg.org/selectors/#relational now requires the argument
        // to be parsed unforgivingly, but browsers have not yet fully adjusted.
        rbuggyQSA.push(":has");
      }
      rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));

      /* Sorting
      ---------------------------------------------------------------------- */

      // Document order sorting
      sortOrder = function (a, b) {
        // Flag for duplicate removal
        if (a === b) {
          hasDuplicate = true;
          return 0;
        }

        // Sort on method existence if only one input has compareDocumentPosition
        var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
        if (compare) {
          return compare;
        }

        // Calculate position if both inputs belong to the same document
        // Support: IE 11+, Edge 17 - 18+
        // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
        // two documents; shallow comparisons work.
        // eslint-disable-next-line eqeqeq
        compare = (a.ownerDocument || a) == (b.ownerDocument || b) ? a.compareDocumentPosition(b) :
        // Otherwise we know they are disconnected
        1;

        // Disconnected nodes
        if (compare & 1 || !support.sortDetached && b.compareDocumentPosition(a) === compare) {
          // Choose the first element that is related to our preferred document
          // Support: IE 11+, Edge 17 - 18+
          // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
          // two documents; shallow comparisons work.
          // eslint-disable-next-line eqeqeq
          if (a === document || a.ownerDocument == preferredDoc && find.contains(preferredDoc, a)) {
            return -1;
          }

          // Support: IE 11+, Edge 17 - 18+
          // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
          // two documents; shallow comparisons work.
          // eslint-disable-next-line eqeqeq
          if (b === document || b.ownerDocument == preferredDoc && find.contains(preferredDoc, b)) {
            return 1;
          }

          // Maintain original order
          return sortInput ? indexOf.call(sortInput, a) - indexOf.call(sortInput, b) : 0;
        }
        return compare & 4 ? -1 : 1;
      };
      return document;
    }
    find.matches = function (expr, elements) {
      return find(expr, null, null, elements);
    };
    find.matchesSelector = function (elem, expr) {
      setDocument(elem);
      if (documentIsHTML && !nonnativeSelectorCache[expr + " "] && (!rbuggyQSA || !rbuggyQSA.test(expr))) {
        try {
          var ret = matches.call(elem, expr);

          // IE 9's matchesSelector returns false on disconnected nodes
          if (ret || support.disconnectedMatch ||
          // As well, disconnected nodes are said to be in a document
          // fragment in IE 9
          elem.document && elem.document.nodeType !== 11) {
            return ret;
          }
        } catch (e) {
          nonnativeSelectorCache(expr, true);
        }
      }
      return find(expr, document, null, [elem]).length > 0;
    };
    find.contains = function (context, elem) {
      // Set document vars if needed
      // Support: IE 11+, Edge 17 - 18+
      // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
      // two documents; shallow comparisons work.
      // eslint-disable-next-line eqeqeq
      if ((context.ownerDocument || context) != document) {
        setDocument(context);
      }
      return jQuery.contains(context, elem);
    };
    find.attr = function (elem, name) {
      // Set document vars if needed
      // Support: IE 11+, Edge 17 - 18+
      // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
      // two documents; shallow comparisons work.
      // eslint-disable-next-line eqeqeq
      if ((elem.ownerDocument || elem) != document) {
        setDocument(elem);
      }
      var fn = Expr.attrHandle[name.toLowerCase()],
        // Don't get fooled by Object.prototype properties (see trac-13807)
        val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : undefined;
      if (val !== undefined) {
        return val;
      }
      return elem.getAttribute(name);
    };
    find.error = function (msg) {
      throw new Error("Syntax error, unrecognized expression: " + msg);
    };

    /**
     * Document sorting and removing duplicates
     * @param {ArrayLike} results
     */
    jQuery.uniqueSort = function (results) {
      var elem,
        duplicates = [],
        j = 0,
        i = 0;

      // Unless we *know* we can detect duplicates, assume their presence
      //
      // Support: Android <=4.0+
      // Testing for detecting duplicates is unpredictable so instead assume we can't
      // depend on duplicate detection in all browsers without a stable sort.
      hasDuplicate = !support.sortStable;
      sortInput = !support.sortStable && slice.call(results, 0);
      sort.call(results, sortOrder);
      if (hasDuplicate) {
        while (elem = results[i++]) {
          if (elem === results[i]) {
            j = duplicates.push(i);
          }
        }
        while (j--) {
          splice.call(results, duplicates[j], 1);
        }
      }

      // Clear input after sorting to release objects
      // See https://github.com/jquery/sizzle/pull/225
      sortInput = null;
      return results;
    };
    jQuery.fn.uniqueSort = function () {
      return this.pushStack(jQuery.uniqueSort(slice.apply(this)));
    };
    Expr = jQuery.expr = {
      // Can be adjusted by the user
      cacheLength: 50,
      createPseudo: markFunction,
      match: matchExpr,
      attrHandle: {},
      find: {},
      relative: {
        ">": {
          dir: "parentNode",
          first: true
        },
        " ": {
          dir: "parentNode"
        },
        "+": {
          dir: "previousSibling",
          first: true
        },
        "~": {
          dir: "previousSibling"
        }
      },
      preFilter: {
        ATTR: function (match) {
          match[1] = match[1].replace(runescape, funescape);

          // Move the given value to match[3] whether quoted or unquoted
          match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape);
          if (match[2] === "~=") {
            match[3] = " " + match[3] + " ";
          }
          return match.slice(0, 4);
        },
        CHILD: function (match) {
          /* matches from matchExpr["CHILD"]
          	1 type (only|nth|...)
          	2 what (child|of-type)
          	3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
          	4 xn-component of xn+y argument ([+-]?\d*n|)
          	5 sign of xn-component
          	6 x of xn-component
          	7 sign of y-component
          	8 y of y-component
          */
          match[1] = match[1].toLowerCase();
          if (match[1].slice(0, 3) === "nth") {
            // nth-* requires argument
            if (!match[3]) {
              find.error(match[0]);
            }

            // numeric x and y parameters for Expr.filter.CHILD
            // remember that false/true cast respectively to 0/1
            match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
            match[5] = +(match[7] + match[8] || match[3] === "odd");

            // other types prohibit arguments
          } else if (match[3]) {
            find.error(match[0]);
          }
          return match;
        },
        PSEUDO: function (match) {
          var excess,
            unquoted = !match[6] && match[2];
          if (matchExpr.CHILD.test(match[0])) {
            return null;
          }

          // Accept quoted arguments as-is
          if (match[3]) {
            match[2] = match[4] || match[5] || "";

            // Strip excess characters from unquoted arguments
          } else if (unquoted && rpseudo.test(unquoted) && (
          // Get excess from tokenize (recursively)
          excess = tokenize(unquoted, true)) && (
          // advance to the next closing parenthesis
          excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {
            // excess is a negative index
            match[0] = match[0].slice(0, excess);
            match[2] = unquoted.slice(0, excess);
          }

          // Return only captures needed by the pseudo filter method (type and argument)
          return match.slice(0, 3);
        }
      },
      filter: {
        TAG: function (nodeNameSelector) {
          var expectedNodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
          return nodeNameSelector === "*" ? function () {
            return true;
          } : function (elem) {
            return nodeName(elem, expectedNodeName);
          };
        },
        CLASS: function (className) {
          var pattern = classCache[className + " "];
          return pattern || (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) && classCache(className, function (elem) {
            return pattern.test(typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "");
          });
        },
        ATTR: function (name, operator, check) {
          return function (elem) {
            var result = find.attr(elem, name);
            if (result == null) {
              return operator === "!=";
            }
            if (!operator) {
              return true;
            }
            result += "";
            if (operator === "=") {
              return result === check;
            }
            if (operator === "!=") {
              return result !== check;
            }
            if (operator === "^=") {
              return check && result.indexOf(check) === 0;
            }
            if (operator === "*=") {
              return check && result.indexOf(check) > -1;
            }
            if (operator === "$=") {
              return check && result.slice(-check.length) === check;
            }
            if (operator === "~=") {
              return (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1;
            }
            if (operator === "|=") {
              return result === check || result.slice(0, check.length + 1) === check + "-";
            }
            return false;
          };
        },
        CHILD: function (type, what, _argument, first, last) {
          var simple = type.slice(0, 3) !== "nth",
            forward = type.slice(-4) !== "last",
            ofType = what === "of-type";
          return first === 1 && last === 0 ?
          // Shortcut for :nth-*(n)
          function (elem) {
            return !!elem.parentNode;
          } : function (elem, _context, xml) {
            var cache,
              outerCache,
              node,
              nodeIndex,
              start,
              dir = simple !== forward ? "nextSibling" : "previousSibling",
              parent = elem.parentNode,
              name = ofType && elem.nodeName.toLowerCase(),
              useCache = !xml && !ofType,
              diff = false;
            if (parent) {
              // :(first|last|only)-(child|of-type)
              if (simple) {
                while (dir) {
                  node = elem;
                  while (node = node[dir]) {
                    if (ofType ? nodeName(node, name) : node.nodeType === 1) {
                      return false;
                    }
                  }

                  // Reverse direction for :only-* (if we haven't yet done so)
                  start = dir = type === "only" && !start && "nextSibling";
                }
                return true;
              }
              start = [forward ? parent.firstChild : parent.lastChild];

              // non-xml :nth-child(...) stores cache data on `parent`
              if (forward && useCache) {
                // Seek `elem` from a previously-cached index
                outerCache = parent[expando] || (parent[expando] = {});
                cache = outerCache[type] || [];
                nodeIndex = cache[0] === dirruns && cache[1];
                diff = nodeIndex && cache[2];
                node = nodeIndex && parent.childNodes[nodeIndex];
                while (node = ++nodeIndex && node && node[dir] || (
                // Fallback to seeking `elem` from the start
                diff = nodeIndex = 0) || start.pop()) {
                  // When found, cache indexes on `parent` and break
                  if (node.nodeType === 1 && ++diff && node === elem) {
                    outerCache[type] = [dirruns, nodeIndex, diff];
                    break;
                  }
                }
              } else {
                // Use previously-cached element index if available
                if (useCache) {
                  outerCache = elem[expando] || (elem[expando] = {});
                  cache = outerCache[type] || [];
                  nodeIndex = cache[0] === dirruns && cache[1];
                  diff = nodeIndex;
                }

                // xml :nth-child(...)
                // or :nth-last-child(...) or :nth(-last)?-of-type(...)
                if (diff === false) {
                  // Use the same loop as above to seek `elem` from the start
                  while (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) {
                    if ((ofType ? nodeName(node, name) : node.nodeType === 1) && ++diff) {
                      // Cache the index of each encountered element
                      if (useCache) {
                        outerCache = node[expando] || (node[expando] = {});
                        outerCache[type] = [dirruns, diff];
                      }
                      if (node === elem) {
                        break;
                      }
                    }
                  }
                }
              }

              // Incorporate the offset, then check against cycle size
              diff -= last;
              return diff === first || diff % first === 0 && diff / first >= 0;
            }
          };
        },
        PSEUDO: function (pseudo, argument) {
          // pseudo-class names are case-insensitive
          // https://www.w3.org/TR/selectors/#pseudo-classes
          // Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
          // Remember that setFilters inherits from pseudos
          var args,
            fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || find.error("unsupported pseudo: " + pseudo);

          // The user may use createPseudo to indicate that
          // arguments are needed to create the filter function
          // just as jQuery does
          if (fn[expando]) {
            return fn(argument);
          }

          // But maintain support for old signatures
          if (fn.length > 1) {
            args = [pseudo, pseudo, "", argument];
            return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function (seed, matches) {
              var idx,
                matched = fn(seed, argument),
                i = matched.length;
              while (i--) {
                idx = indexOf.call(seed, matched[i]);
                seed[idx] = !(matches[idx] = matched[i]);
              }
            }) : function (elem) {
              return fn(elem, 0, args);
            };
          }
          return fn;
        }
      },
      pseudos: {
        // Potentially complex pseudos
        not: markFunction(function (selector) {
          // Trim the selector passed to compile
          // to avoid treating leading and trailing
          // spaces as combinators
          var input = [],
            results = [],
            matcher = compile(selector.replace(rtrimCSS, "$1"));
          return matcher[expando] ? markFunction(function (seed, matches, _context, xml) {
            var elem,
              unmatched = matcher(seed, null, xml, []),
              i = seed.length;

            // Match elements unmatched by `matcher`
            while (i--) {
              if (elem = unmatched[i]) {
                seed[i] = !(matches[i] = elem);
              }
            }
          }) : function (elem, _context, xml) {
            input[0] = elem;
            matcher(input, null, xml, results);

            // Don't keep the element
            // (see https://github.com/jquery/sizzle/issues/299)
            input[0] = null;
            return !results.pop();
          };
        }),
        has: markFunction(function (selector) {
          return function (elem) {
            return find(selector, elem).length > 0;
          };
        }),
        contains: markFunction(function (text) {
          text = text.replace(runescape, funescape);
          return function (elem) {
            return (elem.textContent || jQuery.text(elem)).indexOf(text) > -1;
          };
        }),
        // "Whether an element is represented by a :lang() selector
        // is based solely on the element's language value
        // being equal to the identifier C,
        // or beginning with the identifier C immediately followed by "-".
        // The matching of C against the element's language value is performed case-insensitively.
        // The identifier C does not have to be a valid language name."
        // https://www.w3.org/TR/selectors/#lang-pseudo
        lang: markFunction(function (lang) {
          // lang value must be a valid identifier
          if (!ridentifier.test(lang || "")) {
            find.error("unsupported lang: " + lang);
          }
          lang = lang.replace(runescape, funescape).toLowerCase();
          return function (elem) {
            var elemLang;
            do {
              if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang")) {
                elemLang = elemLang.toLowerCase();
                return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
              }
            } while ((elem = elem.parentNode) && elem.nodeType === 1);
            return false;
          };
        }),
        // Miscellaneous
        target: function (elem) {
          var hash = window.location && window.location.hash;
          return hash && hash.slice(1) === elem.id;
        },
        root: function (elem) {
          return elem === documentElement;
        },
        focus: function (elem) {
          return elem === safeActiveElement() && document.hasFocus() && !!(elem.type || elem.href || ~elem.tabIndex);
        },
        // Boolean properties
        enabled: createDisabledPseudo(false),
        disabled: createDisabledPseudo(true),
        checked: function (elem) {
          // In CSS3, :checked should return both checked and selected elements
          // https://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
          return nodeName(elem, "input") && !!elem.checked || nodeName(elem, "option") && !!elem.selected;
        },
        selected: function (elem) {
          // Support: IE <=11+
          // Accessing the selectedIndex property
          // forces the browser to treat the default option as
          // selected when in an optgroup.
          if (elem.parentNode) {
            // eslint-disable-next-line no-unused-expressions
            elem.parentNode.selectedIndex;
          }
          return elem.selected === true;
        },
        // Contents
        empty: function (elem) {
          // https://www.w3.org/TR/selectors/#empty-pseudo
          // :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
          //   but not by others (comment: 8; processing instruction: 7; etc.)
          // nodeType < 6 works because attributes (2) do not appear as children
          for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
            if (elem.nodeType < 6) {
              return false;
            }
          }
          return true;
        },
        parent: function (elem) {
          return !Expr.pseudos.empty(elem);
        },
        // Element/input types
        header: function (elem) {
          return rheader.test(elem.nodeName);
        },
        input: function (elem) {
          return rinputs.test(elem.nodeName);
        },
        button: function (elem) {
          return nodeName(elem, "input") && elem.type === "button" || nodeName(elem, "button");
        },
        text: function (elem) {
          var attr;
          return nodeName(elem, "input") && elem.type === "text" && (
          // Support: IE <10 only
          // New HTML5 attribute values (e.g., "search") appear
          // with elem.type === "text"
          (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text");
        },
        // Position-in-collection
        first: createPositionalPseudo(function () {
          return [0];
        }),
        last: createPositionalPseudo(function (_matchIndexes, length) {
          return [length - 1];
        }),
        eq: createPositionalPseudo(function (_matchIndexes, length, argument) {
          return [argument < 0 ? argument + length : argument];
        }),
        even: createPositionalPseudo(function (matchIndexes, length) {
          var i = 0;
          for (; i < length; i += 2) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        }),
        odd: createPositionalPseudo(function (matchIndexes, length) {
          var i = 1;
          for (; i < length; i += 2) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        }),
        lt: createPositionalPseudo(function (matchIndexes, length, argument) {
          var i;
          if (argument < 0) {
            i = argument + length;
          } else if (argument > length) {
            i = length;
          } else {
            i = argument;
          }
          for (; --i >= 0;) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        }),
        gt: createPositionalPseudo(function (matchIndexes, length, argument) {
          var i = argument < 0 ? argument + length : argument;
          for (; ++i < length;) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        })
      }
    };
    Expr.pseudos.nth = Expr.pseudos.eq;

    // Add button/input type pseudos
    for (i in {
      radio: true,
      checkbox: true,
      file: true,
      password: true,
      image: true
    }) {
      Expr.pseudos[i] = createInputPseudo(i);
    }
    for (i in {
      submit: true,
      reset: true
    }) {
      Expr.pseudos[i] = createButtonPseudo(i);
    }

    // Easy API for creating new setFilters
    function setFilters() {}
    setFilters.prototype = Expr.filters = Expr.pseudos;
    Expr.setFilters = new setFilters();
    function tokenize(selector, parseOnly) {
      var matched,
        match,
        tokens,
        type,
        soFar,
        groups,
        preFilters,
        cached = tokenCache[selector + " "];
      if (cached) {
        return parseOnly ? 0 : cached.slice(0);
      }
      soFar = selector;
      groups = [];
      preFilters = Expr.preFilter;
      while (soFar) {
        // Comma and first run
        if (!matched || (match = rcomma.exec(soFar))) {
          if (match) {
            // Don't consume trailing commas as valid
            soFar = soFar.slice(match[0].length) || soFar;
          }
          groups.push(tokens = []);
        }
        matched = false;

        // Combinators
        if (match = rleadingCombinator.exec(soFar)) {
          matched = match.shift();
          tokens.push({
            value: matched,
            // Cast descendant combinators to space
            type: match[0].replace(rtrimCSS, " ")
          });
          soFar = soFar.slice(matched.length);
        }

        // Filters
        for (type in Expr.filter) {
          if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
            matched = match.shift();
            tokens.push({
              value: matched,
              type: type,
              matches: match
            });
            soFar = soFar.slice(matched.length);
          }
        }
        if (!matched) {
          break;
        }
      }

      // Return the length of the invalid excess
      // if we're just parsing
      // Otherwise, throw an error or return tokens
      if (parseOnly) {
        return soFar.length;
      }
      return soFar ? find.error(selector) :
      // Cache the tokens
      tokenCache(selector, groups).slice(0);
    }
    function toSelector(tokens) {
      var i = 0,
        len = tokens.length,
        selector = "";
      for (; i < len; i++) {
        selector += tokens[i].value;
      }
      return selector;
    }
    function addCombinator(matcher, combinator, base) {
      var dir = combinator.dir,
        skip = combinator.next,
        key = skip || dir,
        checkNonElements = base && key === "parentNode",
        doneName = done++;
      return combinator.first ?
      // Check against closest ancestor/preceding element
      function (elem, context, xml) {
        while (elem = elem[dir]) {
          if (elem.nodeType === 1 || checkNonElements) {
            return matcher(elem, context, xml);
          }
        }
        return false;
      } :
      // Check against all ancestor/preceding elements
      function (elem, context, xml) {
        var oldCache,
          outerCache,
          newCache = [dirruns, doneName];

        // We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
        if (xml) {
          while (elem = elem[dir]) {
            if (elem.nodeType === 1 || checkNonElements) {
              if (matcher(elem, context, xml)) {
                return true;
              }
            }
          }
        } else {
          while (elem = elem[dir]) {
            if (elem.nodeType === 1 || checkNonElements) {
              outerCache = elem[expando] || (elem[expando] = {});
              if (skip && nodeName(elem, skip)) {
                elem = elem[dir] || elem;
              } else if ((oldCache = outerCache[key]) && oldCache[0] === dirruns && oldCache[1] === doneName) {
                // Assign to newCache so results back-propagate to previous elements
                return newCache[2] = oldCache[2];
              } else {
                // Reuse newcache so results back-propagate to previous elements
                outerCache[key] = newCache;

                // A match means we're done; a fail means we have to keep checking
                if (newCache[2] = matcher(elem, context, xml)) {
                  return true;
                }
              }
            }
          }
        }
        return false;
      };
    }
    function elementMatcher(matchers) {
      return matchers.length > 1 ? function (elem, context, xml) {
        var i = matchers.length;
        while (i--) {
          if (!matchers[i](elem, context, xml)) {
            return false;
          }
        }
        return true;
      } : matchers[0];
    }
    function multipleContexts(selector, contexts, results) {
      var i = 0,
        len = contexts.length;
      for (; i < len; i++) {
        find(selector, contexts[i], results);
      }
      return results;
    }
    function condense(unmatched, map, filter, context, xml) {
      var elem,
        newUnmatched = [],
        i = 0,
        len = unmatched.length,
        mapped = map != null;
      for (; i < len; i++) {
        if (elem = unmatched[i]) {
          if (!filter || filter(elem, context, xml)) {
            newUnmatched.push(elem);
            if (mapped) {
              map.push(i);
            }
          }
        }
      }
      return newUnmatched;
    }
    function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
      if (postFilter && !postFilter[expando]) {
        postFilter = setMatcher(postFilter);
      }
      if (postFinder && !postFinder[expando]) {
        postFinder = setMatcher(postFinder, postSelector);
      }
      return markFunction(function (seed, results, context, xml) {
        var temp,
          i,
          elem,
          matcherOut,
          preMap = [],
          postMap = [],
          preexisting = results.length,
          // Get initial elements from seed or context
          elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),
          // Prefilter to get matcher input, preserving a map for seed-results synchronization
          matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems;
        if (matcher) {
          // If we have a postFinder, or filtered seed, or non-seed postFilter
          // or preexisting results,
          matcherOut = postFinder || (seed ? preFilter : preexisting || postFilter) ?
          // ...intermediate processing is necessary
          [] :
          // ...otherwise use results directly
          results;

          // Find primary matches
          matcher(matcherIn, matcherOut, context, xml);
        } else {
          matcherOut = matcherIn;
        }

        // Apply postFilter
        if (postFilter) {
          temp = condense(matcherOut, postMap);
          postFilter(temp, [], context, xml);

          // Un-match failing elements by moving them back to matcherIn
          i = temp.length;
          while (i--) {
            if (elem = temp[i]) {
              matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
            }
          }
        }
        if (seed) {
          if (postFinder || preFilter) {
            if (postFinder) {
              // Get the final matcherOut by condensing this intermediate into postFinder contexts
              temp = [];
              i = matcherOut.length;
              while (i--) {
                if (elem = matcherOut[i]) {
                  // Restore matcherIn since elem is not yet a final match
                  temp.push(matcherIn[i] = elem);
                }
              }
              postFinder(null, matcherOut = [], temp, xml);
            }

            // Move matched elements from seed to results to keep them synchronized
            i = matcherOut.length;
            while (i--) {
              if ((elem = matcherOut[i]) && (temp = postFinder ? indexOf.call(seed, elem) : preMap[i]) > -1) {
                seed[temp] = !(results[temp] = elem);
              }
            }
          }

          // Add elements to results, through postFinder if defined
        } else {
          matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);
          if (postFinder) {
            postFinder(null, results, matcherOut, xml);
          } else {
            push.apply(results, matcherOut);
          }
        }
      });
    }
    function matcherFromTokens(tokens) {
      var checkContext,
        matcher,
        j,
        len = tokens.length,
        leadingRelative = Expr.relative[tokens[0].type],
        implicitRelative = leadingRelative || Expr.relative[" "],
        i = leadingRelative ? 1 : 0,
        // The foundational matcher ensures that elements are reachable from top-level context(s)
        matchContext = addCombinator(function (elem) {
          return elem === checkContext;
        }, implicitRelative, true),
        matchAnyContext = addCombinator(function (elem) {
          return indexOf.call(checkContext, elem) > -1;
        }, implicitRelative, true),
        matchers = [function (elem, context, xml) {
          // Support: IE 11+, Edge 17 - 18+
          // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
          // two documents; shallow comparisons work.
          // eslint-disable-next-line eqeqeq
          var ret = !leadingRelative && (xml || context != outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));

          // Avoid hanging onto element
          // (see https://github.com/jquery/sizzle/issues/299)
          checkContext = null;
          return ret;
        }];
      for (; i < len; i++) {
        if (matcher = Expr.relative[tokens[i].type]) {
          matchers = [addCombinator(elementMatcher(matchers), matcher)];
        } else {
          matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);

          // Return special upon seeing a positional matcher
          if (matcher[expando]) {
            // Find the next relative operator (if any) for proper handling
            j = ++i;
            for (; j < len; j++) {
              if (Expr.relative[tokens[j].type]) {
                break;
              }
            }
            return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(
            // If the preceding token was a descendant combinator, insert an implicit any-element `*`
            tokens.slice(0, i - 1).concat({
              value: tokens[i - 2].type === " " ? "*" : ""
            })).replace(rtrimCSS, "$1"), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens(tokens = tokens.slice(j)), j < len && toSelector(tokens));
          }
          matchers.push(matcher);
        }
      }
      return elementMatcher(matchers);
    }
    function matcherFromGroupMatchers(elementMatchers, setMatchers) {
      var bySet = setMatchers.length > 0,
        byElement = elementMatchers.length > 0,
        superMatcher = function (seed, context, xml, results, outermost) {
          var elem,
            j,
            matcher,
            matchedCount = 0,
            i = "0",
            unmatched = seed && [],
            setMatched = [],
            contextBackup = outermostContext,
            // We must always have either seed elements or outermost context
            elems = seed || byElement && Expr.find.TAG("*", outermost),
            // Use integer dirruns iff this is the outermost matcher
            dirrunsUnique = dirruns += contextBackup == null ? 1 : Math.random() || 0.1,
            len = elems.length;
          if (outermost) {
            // Support: IE 11+, Edge 17 - 18+
            // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
            // two documents; shallow comparisons work.
            // eslint-disable-next-line eqeqeq
            outermostContext = context == document || context || outermost;
          }

          // Add elements passing elementMatchers directly to results
          // Support: iOS <=7 - 9 only
          // Tolerate NodeList properties (IE: "length"; Safari: <number>) matching
          // elements by id. (see trac-14142)
          for (; i !== len && (elem = elems[i]) != null; i++) {
            if (byElement && elem) {
              j = 0;

              // Support: IE 11+, Edge 17 - 18+
              // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
              // two documents; shallow comparisons work.
              // eslint-disable-next-line eqeqeq
              if (!context && elem.ownerDocument != document) {
                setDocument(elem);
                xml = !documentIsHTML;
              }
              while (matcher = elementMatchers[j++]) {
                if (matcher(elem, context || document, xml)) {
                  push.call(results, elem);
                  break;
                }
              }
              if (outermost) {
                dirruns = dirrunsUnique;
              }
            }

            // Track unmatched elements for set filters
            if (bySet) {
              // They will have gone through all possible matchers
              if (elem = !matcher && elem) {
                matchedCount--;
              }

              // Lengthen the array for every element, matched or not
              if (seed) {
                unmatched.push(elem);
              }
            }
          }

          // `i` is now the count of elements visited above, and adding it to `matchedCount`
          // makes the latter nonnegative.
          matchedCount += i;

          // Apply set filters to unmatched elements
          // NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
          // equals `i`), unless we didn't visit _any_ elements in the above loop because we have
          // no element matchers and no seed.
          // Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
          // case, which will result in a "00" `matchedCount` that differs from `i` but is also
          // numerically zero.
          if (bySet && i !== matchedCount) {
            j = 0;
            while (matcher = setMatchers[j++]) {
              matcher(unmatched, setMatched, context, xml);
            }
            if (seed) {
              // Reintegrate element matches to eliminate the need for sorting
              if (matchedCount > 0) {
                while (i--) {
                  if (!(unmatched[i] || setMatched[i])) {
                    setMatched[i] = pop.call(results);
                  }
                }
              }

              // Discard index placeholder values to get only actual matches
              setMatched = condense(setMatched);
            }

            // Add matches to results
            push.apply(results, setMatched);

            // Seedless set matches succeeding multiple successful matchers stipulate sorting
            if (outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1) {
              jQuery.uniqueSort(results);
            }
          }

          // Override manipulation of globals by nested matchers
          if (outermost) {
            dirruns = dirrunsUnique;
            outermostContext = contextBackup;
          }
          return unmatched;
        };
      return bySet ? markFunction(superMatcher) : superMatcher;
    }
    function compile(selector, match /* Internal Use Only */) {
      var i,
        setMatchers = [],
        elementMatchers = [],
        cached = compilerCache[selector + " "];
      if (!cached) {
        // Generate a function of recursive functions that can be used to check each element
        if (!match) {
          match = tokenize(selector);
        }
        i = match.length;
        while (i--) {
          cached = matcherFromTokens(match[i]);
          if (cached[expando]) {
            setMatchers.push(cached);
          } else {
            elementMatchers.push(cached);
          }
        }

        // Cache the compiled function
        cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));

        // Save selector and tokenization
        cached.selector = selector;
      }
      return cached;
    }

    /**
     * A low-level selection function that works with jQuery's compiled
     *  selector functions
     * @param {String|Function} selector A selector or a pre-compiled
     *  selector function built with jQuery selector compile
     * @param {Element} context
     * @param {Array} [results]
     * @param {Array} [seed] A set of elements to match against
     */
    function select(selector, context, results, seed) {
      var i,
        tokens,
        token,
        type,
        find,
        compiled = typeof selector === "function" && selector,
        match = !seed && tokenize(selector = compiled.selector || selector);
      results = results || [];

      // Try to minimize operations if there is only one selector in the list and no seed
      // (the latter of which guarantees us context)
      if (match.length === 1) {
        // Reduce context if the leading compound selector is an ID
        tokens = match[0] = match[0].slice(0);
        if (tokens.length > 2 && (token = tokens[0]).type === "ID" && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {
          context = (Expr.find.ID(token.matches[0].replace(runescape, funescape), context) || [])[0];
          if (!context) {
            return results;

            // Precompiled matchers will still verify ancestry, so step up a level
          } else if (compiled) {
            context = context.parentNode;
          }
          selector = selector.slice(tokens.shift().value.length);
        }

        // Fetch a seed set for right-to-left matching
        i = matchExpr.needsContext.test(selector) ? 0 : tokens.length;
        while (i--) {
          token = tokens[i];

          // Abort if we hit a combinator
          if (Expr.relative[type = token.type]) {
            break;
          }
          if (find = Expr.find[type]) {
            // Search, expanding context for leading sibling combinators
            if (seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && testContext(context.parentNode) || context)) {
              // If seed is empty or no tokens remain, we can return early
              tokens.splice(i, 1);
              selector = seed.length && toSelector(tokens);
              if (!selector) {
                push.apply(results, seed);
                return results;
              }
              break;
            }
          }
        }
      }

      // Compile and execute a filtering function if one is not provided
      // Provide `match` to avoid retokenization if we modified the selector above
      (compiled || compile(selector, match))(seed, context, !documentIsHTML, results, !context || rsibling.test(selector) && testContext(context.parentNode) || context);
      return results;
    }

    // One-time assignments

    // Support: Android <=4.0 - 4.1+
    // Sort stability
    support.sortStable = expando.split("").sort(sortOrder).join("") === expando;

    // Initialize against the default document
    setDocument();

    // Support: Android <=4.0 - 4.1+
    // Detached nodes confoundingly follow *each other*
    support.sortDetached = assert(function (el) {
      // Should return 1, but returns 4 (following)
      return el.compareDocumentPosition(document.createElement("fieldset")) & 1;
    });
    jQuery.find = find;

    // Deprecated
    jQuery.expr[":"] = jQuery.expr.pseudos;
    jQuery.unique = jQuery.uniqueSort;

    // These have always been private, but they used to be documented
    // as part of Sizzle so let's maintain them in the 3.x line
    // for backwards compatibility purposes.
    find.compile = compile;
    find.select = select;
    find.setDocument = setDocument;
    find.escape = jQuery.escapeSelector;
    find.getText = jQuery.text;
    find.isXML = jQuery.isXMLDoc;
    find.selectors = jQuery.expr;
    find.support = jQuery.support;
    find.uniqueSort = jQuery.uniqueSort;

    /* eslint-enable */
  })();

  var dir = function (elem, dir, until) {
    var matched = [],
      truncate = until !== undefined;
    while ((elem = elem[dir]) && elem.nodeType !== 9) {
      if (elem.nodeType === 1) {
        if (truncate && jQuery(elem).is(until)) {
          break;
        }
        matched.push(elem);
      }
    }
    return matched;
  };
  var siblings = function (n, elem) {
    var matched = [];
    for (; n; n = n.nextSibling) {
      if (n.nodeType === 1 && n !== elem) {
        matched.push(n);
      }
    }
    return matched;
  };
  var rneedsContext = jQuery.expr.match.needsContext;
  var rsingleTag = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;

  // Implement the identical functionality for filter and not
  function winnow(elements, qualifier, not) {
    if (isFunction(qualifier)) {
      return jQuery.grep(elements, function (elem, i) {
        return !!qualifier.call(elem, i, elem) !== not;
      });
    }

    // Single element
    if (qualifier.nodeType) {
      return jQuery.grep(elements, function (elem) {
        return elem === qualifier !== not;
      });
    }

    // Arraylike of elements (jQuery, arguments, Array)
    if (typeof qualifier !== "string") {
      return jQuery.grep(elements, function (elem) {
        return indexOf.call(qualifier, elem) > -1 !== not;
      });
    }

    // Filtered directly for both simple and complex selectors
    return jQuery.filter(qualifier, elements, not);
  }
  jQuery.filter = function (expr, elems, not) {
    var elem = elems[0];
    if (not) {
      expr = ":not(" + expr + ")";
    }
    if (elems.length === 1 && elem.nodeType === 1) {
      return jQuery.find.matchesSelector(elem, expr) ? [elem] : [];
    }
    return jQuery.find.matches(expr, jQuery.grep(elems, function (elem) {
      return elem.nodeType === 1;
    }));
  };
  jQuery.fn.extend({
    find: function (selector) {
      var i,
        ret,
        len = this.length,
        self = this;
      if (typeof selector !== "string") {
        return this.pushStack(jQuery(selector).filter(function () {
          for (i = 0; i < len; i++) {
            if (jQuery.contains(self[i], this)) {
              return true;
            }
          }
        }));
      }
      ret = this.pushStack([]);
      for (i = 0; i < len; i++) {
        jQuery.find(selector, self[i], ret);
      }
      return len > 1 ? jQuery.uniqueSort(ret) : ret;
    },
    filter: function (selector) {
      return this.pushStack(winnow(this, selector || [], false));
    },
    not: function (selector) {
      return this.pushStack(winnow(this, selector || [], true));
    },
    is: function (selector) {
      return !!winnow(this,
      // If this is a positional/relative selector, check membership in the returned set
      // so $("p:first").is("p:last") won't return true for a doc with two "p".
      typeof selector === "string" && rneedsContext.test(selector) ? jQuery(selector) : selector || [], false).length;
    }
  });

  // Initialize a jQuery object

  // A central reference to the root jQuery(document)
  var rootjQuery,
    // A simple way to check for HTML strings
    // Prioritize #id over <tag> to avoid XSS via location.hash (trac-9521)
    // Strict HTML recognition (trac-11290: must start with <)
    // Shortcut simple #id case for speed
    rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
    init = jQuery.fn.init = function (selector, context, root) {
      var match, elem;

      // HANDLE: $(""), $(null), $(undefined), $(false)
      if (!selector) {
        return this;
      }

      // Method init() accepts an alternate rootjQuery
      // so migrate can support jQuery.sub (gh-2101)
      root = root || rootjQuery;

      // Handle HTML strings
      if (typeof selector === "string") {
        if (selector[0] === "<" && selector[selector.length - 1] === ">" && selector.length >= 3) {
          // Assume that strings that start and end with <> are HTML and skip the regex check
          match = [null, selector, null];
        } else {
          match = rquickExpr.exec(selector);
        }

        // Match html or make sure no context is specified for #id
        if (match && (match[1] || !context)) {
          // HANDLE: $(html) -> $(array)
          if (match[1]) {
            context = context instanceof jQuery ? context[0] : context;

            // Option to run scripts is true for back-compat
            // Intentionally let the error be thrown if parseHTML is not present
            jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true));

            // HANDLE: $(html, props)
            if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
              for (match in context) {
                // Properties of context are called as methods if possible
                if (isFunction(this[match])) {
                  this[match](context[match]);

                  // ...and otherwise set as attributes
                } else {
                  this.attr(match, context[match]);
                }
              }
            }
            return this;

            // HANDLE: $(#id)
          } else {
            elem = document.getElementById(match[2]);
            if (elem) {
              // Inject the element directly into the jQuery object
              this[0] = elem;
              this.length = 1;
            }
            return this;
          }

          // HANDLE: $(expr, $(...))
        } else if (!context || context.jquery) {
          return (context || root).find(selector);

          // HANDLE: $(expr, context)
          // (which is just equivalent to: $(context).find(expr)
        } else {
          return this.constructor(context).find(selector);
        }

        // HANDLE: $(DOMElement)
      } else if (selector.nodeType) {
        this[0] = selector;
        this.length = 1;
        return this;

        // HANDLE: $(function)
        // Shortcut for document ready
      } else if (isFunction(selector)) {
        return root.ready !== undefined ? root.ready(selector) :
        // Execute immediately if ready is not present
        selector(jQuery);
      }
      return jQuery.makeArray(selector, this);
    };

  // Give the init function the jQuery prototype for later instantiation
  init.prototype = jQuery.fn;

  // Initialize central reference
  rootjQuery = jQuery(document);
  var rparentsprev = /^(?:parents|prev(?:Until|All))/,
    // Methods guaranteed to produce a unique set when starting from a unique set
    guaranteedUnique = {
      children: true,
      contents: true,
      next: true,
      prev: true
    };
  jQuery.fn.extend({
    has: function (target) {
      var targets = jQuery(target, this),
        l = targets.length;
      return this.filter(function () {
        var i = 0;
        for (; i < l; i++) {
          if (jQuery.contains(this, targets[i])) {
            return true;
          }
        }
      });
    },
    closest: function (selectors, context) {
      var cur,
        i = 0,
        l = this.length,
        matched = [],
        targets = typeof selectors !== "string" && jQuery(selectors);

      // Positional selectors never match, since there's no _selection_ context
      if (!rneedsContext.test(selectors)) {
        for (; i < l; i++) {
          for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {
            // Always skip document fragments
            if (cur.nodeType < 11 && (targets ? targets.index(cur) > -1 :
            // Don't pass non-elements to jQuery#find
            cur.nodeType === 1 && jQuery.find.matchesSelector(cur, selectors))) {
              matched.push(cur);
              break;
            }
          }
        }
      }
      return this.pushStack(matched.length > 1 ? jQuery.uniqueSort(matched) : matched);
    },
    // Determine the position of an element within the set
    index: function (elem) {
      // No argument, return index in parent
      if (!elem) {
        return this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
      }

      // Index in selector
      if (typeof elem === "string") {
        return indexOf.call(jQuery(elem), this[0]);
      }

      // Locate the position of the desired element
      return indexOf.call(this,
      // If it receives a jQuery object, the first element is used
      elem.jquery ? elem[0] : elem);
    },
    add: function (selector, context) {
      return this.pushStack(jQuery.uniqueSort(jQuery.merge(this.get(), jQuery(selector, context))));
    },
    addBack: function (selector) {
      return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector));
    }
  });
  function sibling(cur, dir) {
    while ((cur = cur[dir]) && cur.nodeType !== 1) {}
    return cur;
  }
  jQuery.each({
    parent: function (elem) {
      var parent = elem.parentNode;
      return parent && parent.nodeType !== 11 ? parent : null;
    },
    parents: function (elem) {
      return dir(elem, "parentNode");
    },
    parentsUntil: function (elem, _i, until) {
      return dir(elem, "parentNode", until);
    },
    next: function (elem) {
      return sibling(elem, "nextSibling");
    },
    prev: function (elem) {
      return sibling(elem, "previousSibling");
    },
    nextAll: function (elem) {
      return dir(elem, "nextSibling");
    },
    prevAll: function (elem) {
      return dir(elem, "previousSibling");
    },
    nextUntil: function (elem, _i, until) {
      return dir(elem, "nextSibling", until);
    },
    prevUntil: function (elem, _i, until) {
      return dir(elem, "previousSibling", until);
    },
    siblings: function (elem) {
      return siblings((elem.parentNode || {}).firstChild, elem);
    },
    children: function (elem) {
      return siblings(elem.firstChild);
    },
    contents: function (elem) {
      if (elem.contentDocument != null &&
      // Support: IE 11+
      // <object> elements with no `data` attribute has an object
      // `contentDocument` with a `null` prototype.
      getProto(elem.contentDocument)) {
        return elem.contentDocument;
      }

      // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
      // Treat the template element as a regular one in browsers that
      // don't support it.
      if (nodeName(elem, "template")) {
        elem = elem.content || elem;
      }
      return jQuery.merge([], elem.childNodes);
    }
  }, function (name, fn) {
    jQuery.fn[name] = function (until, selector) {
      var matched = jQuery.map(this, fn, until);
      if (name.slice(-5) !== "Until") {
        selector = until;
      }
      if (selector && typeof selector === "string") {
        matched = jQuery.filter(selector, matched);
      }
      if (this.length > 1) {
        // Remove duplicates
        if (!guaranteedUnique[name]) {
          jQuery.uniqueSort(matched);
        }

        // Reverse order for parents* and prev-derivatives
        if (rparentsprev.test(name)) {
          matched.reverse();
        }
      }
      return this.pushStack(matched);
    };
  });
  var rnothtmlwhite = /[^\x20\t\r\n\f]+/g;

  // Convert String-formatted options into Object-formatted ones
  function createOptions(options) {
    var object = {};
    jQuery.each(options.match(rnothtmlwhite) || [], function (_, flag) {
      object[flag] = true;
    });
    return object;
  }

  /*
   * Create a callback list using the following parameters:
   *
   *	options: an optional list of space-separated options that will change how
   *			the callback list behaves or a more traditional option object
   *
   * By default a callback list will act like an event callback list and can be
   * "fired" multiple times.
   *
   * Possible options:
   *
   *	once:			will ensure the callback list can only be fired once (like a Deferred)
   *
   *	memory:			will keep track of previous values and will call any callback added
   *					after the list has been fired right away with the latest "memorized"
   *					values (like a Deferred)
   *
   *	unique:			will ensure a callback can only be added once (no duplicate in the list)
   *
   *	stopOnFalse:	interrupt callings when a callback returns false
   *
   */
  jQuery.Callbacks = function (options) {
    // Convert options from String-formatted to Object-formatted if needed
    // (we check in cache first)
    options = typeof options === "string" ? createOptions(options) : jQuery.extend({}, options);
    var
      // Flag to know if list is currently firing
      firing,
      // Last fire value for non-forgettable lists
      memory,
      // Flag to know if list was already fired
      fired,
      // Flag to prevent firing
      locked,
      // Actual callback list
      list = [],
      // Queue of execution data for repeatable lists
      queue = [],
      // Index of currently firing callback (modified by add/remove as needed)
      firingIndex = -1,
      // Fire callbacks
      fire = function () {
        // Enforce single-firing
        locked = locked || options.once;

        // Execute callbacks for all pending executions,
        // respecting firingIndex overrides and runtime changes
        fired = firing = true;
        for (; queue.length; firingIndex = -1) {
          memory = queue.shift();
          while (++firingIndex < list.length) {
            // Run callback and check for early termination
            if (list[firingIndex].apply(memory[0], memory[1]) === false && options.stopOnFalse) {
              // Jump to end and forget the data so .add doesn't re-fire
              firingIndex = list.length;
              memory = false;
            }
          }
        }

        // Forget the data if we're done with it
        if (!options.memory) {
          memory = false;
        }
        firing = false;

        // Clean up if we're done firing for good
        if (locked) {
          // Keep an empty list if we have data for future add calls
          if (memory) {
            list = [];

            // Otherwise, this object is spent
          } else {
            list = "";
          }
        }
      },
      // Actual Callbacks object
      self = {
        // Add a callback or a collection of callbacks to the list
        add: function () {
          if (list) {
            // If we have memory from a past run, we should fire after adding
            if (memory && !firing) {
              firingIndex = list.length - 1;
              queue.push(memory);
            }
            (function add(args) {
              jQuery.each(args, function (_, arg) {
                if (isFunction(arg)) {
                  if (!options.unique || !self.has(arg)) {
                    list.push(arg);
                  }
                } else if (arg && arg.length && toType(arg) !== "string") {
                  // Inspect recursively
                  add(arg);
                }
              });
            })(arguments);
            if (memory && !firing) {
              fire();
            }
          }
          return this;
        },
        // Remove a callback from the list
        remove: function () {
          jQuery.each(arguments, function (_, arg) {
            var index;
            while ((index = jQuery.inArray(arg, list, index)) > -1) {
              list.splice(index, 1);

              // Handle firing indexes
              if (index <= firingIndex) {
                firingIndex--;
              }
            }
          });
          return this;
        },
        // Check if a given callback is in the list.
        // If no argument is given, return whether or not list has callbacks attached.
        has: function (fn) {
          return fn ? jQuery.inArray(fn, list) > -1 : list.length > 0;
        },
        // Remove all callbacks from the list
        empty: function () {
          if (list) {
            list = [];
          }
          return this;
        },
        // Disable .fire and .add
        // Abort any current/pending executions
        // Clear all callbacks and values
        disable: function () {
          locked = queue = [];
          list = memory = "";
          return this;
        },
        disabled: function () {
          return !list;
        },
        // Disable .fire
        // Also disable .add unless we have memory (since it would have no effect)
        // Abort any pending executions
        lock: function () {
          locked = queue = [];
          if (!memory && !firing) {
            list = memory = "";
          }
          return this;
        },
        locked: function () {
          return !!locked;
        },
        // Call all callbacks with the given context and arguments
        fireWith: function (context, args) {
          if (!locked) {
            args = args || [];
            args = [context, args.slice ? args.slice() : args];
            queue.push(args);
            if (!firing) {
              fire();
            }
          }
          return this;
        },
        // Call all the callbacks with the given arguments
        fire: function () {
          self.fireWith(this, arguments);
          return this;
        },
        // To know if the callbacks have already been called at least once
        fired: function () {
          return !!fired;
        }
      };
    return self;
  };
  function Identity(v) {
    return v;
  }
  function Thrower(ex) {
    throw ex;
  }
  function adoptValue(value, resolve, reject, noValue) {
    var method;
    try {
      // Check for promise aspect first to privilege synchronous behavior
      if (value && isFunction(method = value.promise)) {
        method.call(value).done(resolve).fail(reject);

        // Other thenables
      } else if (value && isFunction(method = value.then)) {
        method.call(value, resolve, reject);

        // Other non-thenables
      } else {
        // Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
        // * false: [ value ].slice( 0 ) => resolve( value )
        // * true: [ value ].slice( 1 ) => resolve()
        resolve.apply(undefined, [value].slice(noValue));
      }

      // For Promises/A+, convert exceptions into rejections
      // Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
      // Deferred#then to conditionally suppress rejection.
    } catch (value) {
      // Support: Android 4.0 only
      // Strict mode functions invoked without .call/.apply get global-object context
      reject.apply(undefined, [value]);
    }
  }
  jQuery.extend({
    Deferred: function (func) {
      var tuples = [
        // action, add listener, callbacks,
        // ... .then handlers, argument index, [final state]
        ["notify", "progress", jQuery.Callbacks("memory"), jQuery.Callbacks("memory"), 2], ["resolve", "done", jQuery.Callbacks("once memory"), jQuery.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", jQuery.Callbacks("once memory"), jQuery.Callbacks("once memory"), 1, "rejected"]],
        state = "pending",
        promise = {
          state: function () {
            return state;
          },
          always: function () {
            deferred.done(arguments).fail(arguments);
            return this;
          },
          "catch": function (fn) {
            return promise.then(null, fn);
          },
          // Keep pipe for back-compat
          pipe: function /* fnDone, fnFail, fnProgress */
          () {
            var fns = arguments;
            return jQuery.Deferred(function (newDefer) {
              jQuery.each(tuples, function (_i, tuple) {
                // Map tuples (progress, done, fail) to arguments (done, fail, progress)
                var fn = isFunction(fns[tuple[4]]) && fns[tuple[4]];

                // deferred.progress(function() { bind to newDefer or newDefer.notify })
                // deferred.done(function() { bind to newDefer or newDefer.resolve })
                // deferred.fail(function() { bind to newDefer or newDefer.reject })
                deferred[tuple[1]](function () {
                  var returned = fn && fn.apply(this, arguments);
                  if (returned && isFunction(returned.promise)) {
                    returned.promise().progress(newDefer.notify).done(newDefer.resolve).fail(newDefer.reject);
                  } else {
                    newDefer[tuple[0] + "With"](this, fn ? [returned] : arguments);
                  }
                });
              });
              fns = null;
            }).promise();
          },
          then: function (onFulfilled, onRejected, onProgress) {
            var maxDepth = 0;
            function resolve(depth, deferred, handler, special) {
              return function () {
                var that = this,
                  args = arguments,
                  mightThrow = function () {
                    var returned, then;

                    // Support: Promises/A+ section 2.3.3.3.3
                    // https://promisesaplus.com/#point-59
                    // Ignore double-resolution attempts
                    if (depth < maxDepth) {
                      return;
                    }
                    returned = handler.apply(that, args);

                    // Support: Promises/A+ section 2.3.1
                    // https://promisesaplus.com/#point-48
                    if (returned === deferred.promise()) {
                      throw new TypeError("Thenable self-resolution");
                    }

                    // Support: Promises/A+ sections 2.3.3.1, 3.5
                    // https://promisesaplus.com/#point-54
                    // https://promisesaplus.com/#point-75
                    // Retrieve `then` only once
                    then = returned && (
                    // Support: Promises/A+ section 2.3.4
                    // https://promisesaplus.com/#point-64
                    // Only check objects and functions for thenability
                    typeof returned === "object" || typeof returned === "function") && returned.then;

                    // Handle a returned thenable
                    if (isFunction(then)) {
                      // Special processors (notify) just wait for resolution
                      if (special) {
                        then.call(returned, resolve(maxDepth, deferred, Identity, special), resolve(maxDepth, deferred, Thrower, special));

                        // Normal processors (resolve) also hook into progress
                      } else {
                        // ...and disregard older resolution values
                        maxDepth++;
                        then.call(returned, resolve(maxDepth, deferred, Identity, special), resolve(maxDepth, deferred, Thrower, special), resolve(maxDepth, deferred, Identity, deferred.notifyWith));
                      }

                      // Handle all other returned values
                    } else {
                      // Only substitute handlers pass on context
                      // and multiple values (non-spec behavior)
                      if (handler !== Identity) {
                        that = undefined;
                        args = [returned];
                      }

                      // Process the value(s)
                      // Default process is resolve
                      (special || deferred.resolveWith)(that, args);
                    }
                  },
                  // Only normal processors (resolve) catch and reject exceptions
                  process = special ? mightThrow : function () {
                    try {
                      mightThrow();
                    } catch (e) {
                      if (jQuery.Deferred.exceptionHook) {
                        jQuery.Deferred.exceptionHook(e, process.error);
                      }

                      // Support: Promises/A+ section 2.3.3.3.4.1
                      // https://promisesaplus.com/#point-61
                      // Ignore post-resolution exceptions
                      if (depth + 1 >= maxDepth) {
                        // Only substitute handlers pass on context
                        // and multiple values (non-spec behavior)
                        if (handler !== Thrower) {
                          that = undefined;
                          args = [e];
                        }
                        deferred.rejectWith(that, args);
                      }
                    }
                  };

                // Support: Promises/A+ section 2.3.3.3.1
                // https://promisesaplus.com/#point-57
                // Re-resolve promises immediately to dodge false rejection from
                // subsequent errors
                if (depth) {
                  process();
                } else {
                  // Call an optional hook to record the error, in case of exception
                  // since it's otherwise lost when execution goes async
                  if (jQuery.Deferred.getErrorHook) {
                    process.error = jQuery.Deferred.getErrorHook();

                    // The deprecated alias of the above. While the name suggests
                    // returning the stack, not an error instance, jQuery just passes
                    // it directly to `console.warn` so both will work; an instance
                    // just better cooperates with source maps.
                  } else if (jQuery.Deferred.getStackHook) {
                    process.error = jQuery.Deferred.getStackHook();
                  }
                  window.setTimeout(process);
                }
              };
            }
            return jQuery.Deferred(function (newDefer) {
              // progress_handlers.add( ... )
              tuples[0][3].add(resolve(0, newDefer, isFunction(onProgress) ? onProgress : Identity, newDefer.notifyWith));

              // fulfilled_handlers.add( ... )
              tuples[1][3].add(resolve(0, newDefer, isFunction(onFulfilled) ? onFulfilled : Identity));

              // rejected_handlers.add( ... )
              tuples[2][3].add(resolve(0, newDefer, isFunction(onRejected) ? onRejected : Thrower));
            }).promise();
          },
          // Get a promise for this deferred
          // If obj is provided, the promise aspect is added to the object
          promise: function (obj) {
            return obj != null ? jQuery.extend(obj, promise) : promise;
          }
        },
        deferred = {};

      // Add list-specific methods
      jQuery.each(tuples, function (i, tuple) {
        var list = tuple[2],
          stateString = tuple[5];

        // promise.progress = list.add
        // promise.done = list.add
        // promise.fail = list.add
        promise[tuple[1]] = list.add;

        // Handle state
        if (stateString) {
          list.add(function () {
            // state = "resolved" (i.e., fulfilled)
            // state = "rejected"
            state = stateString;
          },
          // rejected_callbacks.disable
          // fulfilled_callbacks.disable
          tuples[3 - i][2].disable,
          // rejected_handlers.disable
          // fulfilled_handlers.disable
          tuples[3 - i][3].disable,
          // progress_callbacks.lock
          tuples[0][2].lock,
          // progress_handlers.lock
          tuples[0][3].lock);
        }

        // progress_handlers.fire
        // fulfilled_handlers.fire
        // rejected_handlers.fire
        list.add(tuple[3].fire);

        // deferred.notify = function() { deferred.notifyWith(...) }
        // deferred.resolve = function() { deferred.resolveWith(...) }
        // deferred.reject = function() { deferred.rejectWith(...) }
        deferred[tuple[0]] = function () {
          deferred[tuple[0] + "With"](this === deferred ? undefined : this, arguments);
          return this;
        };

        // deferred.notifyWith = list.fireWith
        // deferred.resolveWith = list.fireWith
        // deferred.rejectWith = list.fireWith
        deferred[tuple[0] + "With"] = list.fireWith;
      });

      // Make the deferred a promise
      promise.promise(deferred);

      // Call given func if any
      if (func) {
        func.call(deferred, deferred);
      }

      // All done!
      return deferred;
    },
    // Deferred helper
    when: function (singleValue) {
      var
        // count of uncompleted subordinates
        remaining = arguments.length,
        // count of unprocessed arguments
        i = remaining,
        // subordinate fulfillment data
        resolveContexts = Array(i),
        resolveValues = slice.call(arguments),
        // the primary Deferred
        primary = jQuery.Deferred(),
        // subordinate callback factory
        updateFunc = function (i) {
          return function (value) {
            resolveContexts[i] = this;
            resolveValues[i] = arguments.length > 1 ? slice.call(arguments) : value;
            if (! --remaining) {
              primary.resolveWith(resolveContexts, resolveValues);
            }
          };
        };

      // Single- and empty arguments are adopted like Promise.resolve
      if (remaining <= 1) {
        adoptValue(singleValue, primary.done(updateFunc(i)).resolve, primary.reject, !remaining);

        // Use .then() to unwrap secondary thenables (cf. gh-3000)
        if (primary.state() === "pending" || isFunction(resolveValues[i] && resolveValues[i].then)) {
          return primary.then();
        }
      }

      // Multiple arguments are aggregated like Promise.all array elements
      while (i--) {
        adoptValue(resolveValues[i], updateFunc(i), primary.reject);
      }
      return primary.promise();
    }
  });

  // These usually indicate a programmer mistake during development,
  // warn about them ASAP rather than swallowing them by default.
  var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

  // If `jQuery.Deferred.getErrorHook` is defined, `asyncError` is an error
  // captured before the async barrier to get the original error cause
  // which may otherwise be hidden.
  jQuery.Deferred.exceptionHook = function (error, asyncError) {
    // Support: IE 8 - 9 only
    // Console exists when dev tools are open, which can happen at any time
    if (window.console && window.console.warn && error && rerrorNames.test(error.name)) {
      window.console.warn("jQuery.Deferred exception: " + error.message, error.stack, asyncError);
    }
  };
  jQuery.readyException = function (error) {
    window.setTimeout(function () {
      throw error;
    });
  };

  // The deferred used on DOM ready
  var readyList = jQuery.Deferred();
  jQuery.fn.ready = function (fn) {
    readyList.then(fn)

    // Wrap jQuery.readyException in a function so that the lookup
    // happens at the time of error handling instead of callback
    // registration.
    .catch(function (error) {
      jQuery.readyException(error);
    });
    return this;
  };
  jQuery.extend({
    // Is the DOM ready to be used? Set to true once it occurs.
    isReady: false,
    // A counter to track how many items to wait for before
    // the ready event fires. See trac-6781
    readyWait: 1,
    // Handle when the DOM is ready
    ready: function (wait) {
      // Abort if there are pending holds or we're already ready
      if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
        return;
      }

      // Remember that the DOM is ready
      jQuery.isReady = true;

      // If a normal DOM Ready event fired, decrement, and wait if need be
      if (wait !== true && --jQuery.readyWait > 0) {
        return;
      }

      // If there are functions bound, to execute
      readyList.resolveWith(document, [jQuery]);
    }
  });
  jQuery.ready.then = readyList.then;

  // The ready event handler and self cleanup method
  function completed() {
    document.removeEventListener("DOMContentLoaded", completed);
    window.removeEventListener("load", completed);
    jQuery.ready();
  }

  // Catch cases where $(document).ready() is called
  // after the browser event has already occurred.
  // Support: IE <=9 - 10 only
  // Older IE sometimes signals "interactive" too soon
  if (document.readyState === "complete" || document.readyState !== "loading" && !document.documentElement.doScroll) {
    // Handle it asynchronously to allow scripts the opportunity to delay ready
    window.setTimeout(jQuery.ready);
  } else {
    // Use the handy event callback
    document.addEventListener("DOMContentLoaded", completed);

    // A fallback to window.onload, that will always work
    window.addEventListener("load", completed);
  }

  // Multifunctional method to get and set values of a collection
  // The value/s can optionally be executed if it's a function
  var access = function (elems, fn, key, value, chainable, emptyGet, raw) {
    var i = 0,
      len = elems.length,
      bulk = key == null;

    // Sets many values
    if (toType(key) === "object") {
      chainable = true;
      for (i in key) {
        access(elems, fn, i, key[i], true, emptyGet, raw);
      }

      // Sets one value
    } else if (value !== undefined) {
      chainable = true;
      if (!isFunction(value)) {
        raw = true;
      }
      if (bulk) {
        // Bulk operations run against the entire set
        if (raw) {
          fn.call(elems, value);
          fn = null;

          // ...except when executing function values
        } else {
          bulk = fn;
          fn = function (elem, _key, value) {
            return bulk.call(jQuery(elem), value);
          };
        }
      }
      if (fn) {
        for (; i < len; i++) {
          fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
        }
      }
    }
    if (chainable) {
      return elems;
    }

    // Gets
    if (bulk) {
      return fn.call(elems);
    }
    return len ? fn(elems[0], key) : emptyGet;
  };

  // Matches dashed string for camelizing
  var rmsPrefix = /^-ms-/,
    rdashAlpha = /-([a-z])/g;

  // Used by camelCase as callback to replace()
  function fcamelCase(_all, letter) {
    return letter.toUpperCase();
  }

  // Convert dashed to camelCase; used by the css and data modules
  // Support: IE <=9 - 11, Edge 12 - 15
  // Microsoft forgot to hump their vendor prefix (trac-9572)
  function camelCase(string) {
    return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
  }
  var acceptData = function (owner) {
    // Accepts only:
    //  - Node
    //    - Node.ELEMENT_NODE
    //    - Node.DOCUMENT_NODE
    //  - Object
    //    - Any
    return owner.nodeType === 1 || owner.nodeType === 9 || !+owner.nodeType;
  };
  function Data() {
    this.expando = jQuery.expando + Data.uid++;
  }
  Data.uid = 1;
  Data.prototype = {
    cache: function (owner) {
      // Check if the owner object already has a cache
      var value = owner[this.expando];

      // If not, create one
      if (!value) {
        value = {};

        // We can accept data for non-element nodes in modern browsers,
        // but we should not, see trac-8335.
        // Always return an empty object.
        if (acceptData(owner)) {
          // If it is a node unlikely to be stringify-ed or looped over
          // use plain assignment
          if (owner.nodeType) {
            owner[this.expando] = value;

            // Otherwise secure it in a non-enumerable property
            // configurable must be true to allow the property to be
            // deleted when data is removed
          } else {
            Object.defineProperty(owner, this.expando, {
              value: value,
              configurable: true
            });
          }
        }
      }
      return value;
    },
    set: function (owner, data, value) {
      var prop,
        cache = this.cache(owner);

      // Handle: [ owner, key, value ] args
      // Always use camelCase key (gh-2257)
      if (typeof data === "string") {
        cache[camelCase(data)] = value;

        // Handle: [ owner, { properties } ] args
      } else {
        // Copy the properties one-by-one to the cache object
        for (prop in data) {
          cache[camelCase(prop)] = data[prop];
        }
      }
      return cache;
    },
    get: function (owner, key) {
      return key === undefined ? this.cache(owner) :
      // Always use camelCase key (gh-2257)
      owner[this.expando] && owner[this.expando][camelCase(key)];
    },
    access: function (owner, key, value) {
      // In cases where either:
      //
      //   1. No key was specified
      //   2. A string key was specified, but no value provided
      //
      // Take the "read" path and allow the get method to determine
      // which value to return, respectively either:
      //
      //   1. The entire cache object
      //   2. The data stored at the key
      //
      if (key === undefined || key && typeof key === "string" && value === undefined) {
        return this.get(owner, key);
      }

      // When the key is not a string, or both a key and value
      // are specified, set or extend (existing objects) with either:
      //
      //   1. An object of properties
      //   2. A key and value
      //
      this.set(owner, key, value);

      // Since the "set" path can have two possible entry points
      // return the expected data based on which path was taken[*]
      return value !== undefined ? value : key;
    },
    remove: function (owner, key) {
      var i,
        cache = owner[this.expando];
      if (cache === undefined) {
        return;
      }
      if (key !== undefined) {
        // Support array or space separated string of keys
        if (Array.isArray(key)) {
          // If key is an array of keys...
          // We always set camelCase keys, so remove that.
          key = key.map(camelCase);
        } else {
          key = camelCase(key);

          // If a key with the spaces exists, use it.
          // Otherwise, create an array by matching non-whitespace
          key = key in cache ? [key] : key.match(rnothtmlwhite) || [];
        }
        i = key.length;
        while (i--) {
          delete cache[key[i]];
        }
      }

      // Remove the expando if there's no more data
      if (key === undefined || jQuery.isEmptyObject(cache)) {
        // Support: Chrome <=35 - 45
        // Webkit & Blink performance suffers when deleting properties
        // from DOM nodes, so set to undefined instead
        // https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
        if (owner.nodeType) {
          owner[this.expando] = undefined;
        } else {
          delete owner[this.expando];
        }
      }
    },
    hasData: function (owner) {
      var cache = owner[this.expando];
      return cache !== undefined && !jQuery.isEmptyObject(cache);
    }
  };
  var dataPriv = new Data();
  var dataUser = new Data();

  //	Implementation Summary
  //
  //	1. Enforce API surface and semantic compatibility with 1.9.x branch
  //	2. Improve the module's maintainability by reducing the storage
  //		paths to a single mechanism.
  //	3. Use the same single mechanism to support "private" and "user" data.
  //	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
  //	5. Avoid exposing implementation details on user objects (eg. expando properties)
  //	6. Provide a clear path for implementation upgrade to WeakMap in 2014

  var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
    rmultiDash = /[A-Z]/g;
  function getData(data) {
    if (data === "true") {
      return true;
    }
    if (data === "false") {
      return false;
    }
    if (data === "null") {
      return null;
    }

    // Only convert to a number if it doesn't change the string
    if (data === +data + "") {
      return +data;
    }
    if (rbrace.test(data)) {
      return JSON.parse(data);
    }
    return data;
  }
  function dataAttr(elem, key, data) {
    var name;

    // If nothing was found internally, try to fetch any
    // data from the HTML5 data-* attribute
    if (data === undefined && elem.nodeType === 1) {
      name = "data-" + key.replace(rmultiDash, "-$&").toLowerCase();
      data = elem.getAttribute(name);
      if (typeof data === "string") {
        try {
          data = getData(data);
        } catch (e) {}

        // Make sure we set the data so it isn't changed later
        dataUser.set(elem, key, data);
      } else {
        data = undefined;
      }
    }
    return data;
  }
  jQuery.extend({
    hasData: function (elem) {
      return dataUser.hasData(elem) || dataPriv.hasData(elem);
    },
    data: function (elem, name, data) {
      return dataUser.access(elem, name, data);
    },
    removeData: function (elem, name) {
      dataUser.remove(elem, name);
    },
    // TODO: Now that all calls to _data and _removeData have been replaced
    // with direct calls to dataPriv methods, these can be deprecated.
    _data: function (elem, name, data) {
      return dataPriv.access(elem, name, data);
    },
    _removeData: function (elem, name) {
      dataPriv.remove(elem, name);
    }
  });
  jQuery.fn.extend({
    data: function (key, value) {
      var i,
        name,
        data,
        elem = this[0],
        attrs = elem && elem.attributes;

      // Gets all values
      if (key === undefined) {
        if (this.length) {
          data = dataUser.get(elem);
          if (elem.nodeType === 1 && !dataPriv.get(elem, "hasDataAttrs")) {
            i = attrs.length;
            while (i--) {
              // Support: IE 11 only
              // The attrs elements can be null (trac-14894)
              if (attrs[i]) {
                name = attrs[i].name;
                if (name.indexOf("data-") === 0) {
                  name = camelCase(name.slice(5));
                  dataAttr(elem, name, data[name]);
                }
              }
            }
            dataPriv.set(elem, "hasDataAttrs", true);
          }
        }
        return data;
      }

      // Sets multiple values
      if (typeof key === "object") {
        return this.each(function () {
          dataUser.set(this, key);
        });
      }
      return access(this, function (value) {
        var data;

        // The calling jQuery object (element matches) is not empty
        // (and therefore has an element appears at this[ 0 ]) and the
        // `value` parameter was not undefined. An empty jQuery object
        // will result in `undefined` for elem = this[ 0 ] which will
        // throw an exception if an attempt to read a data cache is made.
        if (elem && value === undefined) {
          // Attempt to get data from the cache
          // The key will always be camelCased in Data
          data = dataUser.get(elem, key);
          if (data !== undefined) {
            return data;
          }

          // Attempt to "discover" the data in
          // HTML5 custom data-* attrs
          data = dataAttr(elem, key);
          if (data !== undefined) {
            return data;
          }

          // We tried really hard, but the data doesn't exist.
          return;
        }

        // Set the data...
        this.each(function () {
          // We always store the camelCased key
          dataUser.set(this, key, value);
        });
      }, null, value, arguments.length > 1, null, true);
    },
    removeData: function (key) {
      return this.each(function () {
        dataUser.remove(this, key);
      });
    }
  });
  jQuery.extend({
    queue: function (elem, type, data) {
      var queue;
      if (elem) {
        type = (type || "fx") + "queue";
        queue = dataPriv.get(elem, type);

        // Speed up dequeue by getting out quickly if this is just a lookup
        if (data) {
          if (!queue || Array.isArray(data)) {
            queue = dataPriv.access(elem, type, jQuery.makeArray(data));
          } else {
            queue.push(data);
          }
        }
        return queue || [];
      }
    },
    dequeue: function (elem, type) {
      type = type || "fx";
      var queue = jQuery.queue(elem, type),
        startLength = queue.length,
        fn = queue.shift(),
        hooks = jQuery._queueHooks(elem, type),
        next = function () {
          jQuery.dequeue(elem, type);
        };

      // If the fx queue is dequeued, always remove the progress sentinel
      if (fn === "inprogress") {
        fn = queue.shift();
        startLength--;
      }
      if (fn) {
        // Add a progress sentinel to prevent the fx queue from being
        // automatically dequeued
        if (type === "fx") {
          queue.unshift("inprogress");
        }

        // Clear up the last queue stop function
        delete hooks.stop;
        fn.call(elem, next, hooks);
      }
      if (!startLength && hooks) {
        hooks.empty.fire();
      }
    },
    // Not public - generate a queueHooks object, or return the current one
    _queueHooks: function (elem, type) {
      var key = type + "queueHooks";
      return dataPriv.get(elem, key) || dataPriv.access(elem, key, {
        empty: jQuery.Callbacks("once memory").add(function () {
          dataPriv.remove(elem, [type + "queue", key]);
        })
      });
    }
  });
  jQuery.fn.extend({
    queue: function (type, data) {
      var setter = 2;
      if (typeof type !== "string") {
        data = type;
        type = "fx";
        setter--;
      }
      if (arguments.length < setter) {
        return jQuery.queue(this[0], type);
      }
      return data === undefined ? this : this.each(function () {
        var queue = jQuery.queue(this, type, data);

        // Ensure a hooks for this queue
        jQuery._queueHooks(this, type);
        if (type === "fx" && queue[0] !== "inprogress") {
          jQuery.dequeue(this, type);
        }
      });
    },
    dequeue: function (type) {
      return this.each(function () {
        jQuery.dequeue(this, type);
      });
    },
    clearQueue: function (type) {
      return this.queue(type || "fx", []);
    },
    // Get a promise resolved when queues of a certain type
    // are emptied (fx is the type by default)
    promise: function (type, obj) {
      var tmp,
        count = 1,
        defer = jQuery.Deferred(),
        elements = this,
        i = this.length,
        resolve = function () {
          if (! --count) {
            defer.resolveWith(elements, [elements]);
          }
        };
      if (typeof type !== "string") {
        obj = type;
        type = undefined;
      }
      type = type || "fx";
      while (i--) {
        tmp = dataPriv.get(elements[i], type + "queueHooks");
        if (tmp && tmp.empty) {
          count++;
          tmp.empty.add(resolve);
        }
      }
      resolve();
      return defer.promise(obj);
    }
  });
  var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;
  var rcssNum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i");
  var cssExpand = ["Top", "Right", "Bottom", "Left"];
  var documentElement = document.documentElement;
  var isAttached = function (elem) {
      return jQuery.contains(elem.ownerDocument, elem);
    },
    composed = {
      composed: true
    };

  // Support: IE 9 - 11+, Edge 12 - 18+, iOS 10.0 - 10.2 only
  // Check attachment across shadow DOM boundaries when possible (gh-3504)
  // Support: iOS 10.0-10.2 only
  // Early iOS 10 versions support `attachShadow` but not `getRootNode`,
  // leading to errors. We need to check for `getRootNode`.
  if (documentElement.getRootNode) {
    isAttached = function (elem) {
      return jQuery.contains(elem.ownerDocument, elem) || elem.getRootNode(composed) === elem.ownerDocument;
    };
  }
  var isHiddenWithinTree = function (elem, el) {
    // isHiddenWithinTree might be called from jQuery#filter function;
    // in that case, element will be second argument
    elem = el || elem;

    // Inline style trumps all
    return elem.style.display === "none" || elem.style.display === "" &&
    // Otherwise, check computed style
    // Support: Firefox <=43 - 45
    // Disconnected elements can have computed display: none, so first confirm that elem is
    // in the document.
    isAttached(elem) && jQuery.css(elem, "display") === "none";
  };
  function adjustCSS(elem, prop, valueParts, tween) {
    var adjusted,
      scale,
      maxIterations = 20,
      currentValue = tween ? function () {
        return tween.cur();
      } : function () {
        return jQuery.css(elem, prop, "");
      },
      initial = currentValue(),
      unit = valueParts && valueParts[3] || (jQuery.cssNumber[prop] ? "" : "px"),
      // Starting value computation is required for potential unit mismatches
      initialInUnit = elem.nodeType && (jQuery.cssNumber[prop] || unit !== "px" && +initial) && rcssNum.exec(jQuery.css(elem, prop));
    if (initialInUnit && initialInUnit[3] !== unit) {
      // Support: Firefox <=54
      // Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
      initial = initial / 2;

      // Trust units reported by jQuery.css
      unit = unit || initialInUnit[3];

      // Iteratively approximate from a nonzero starting point
      initialInUnit = +initial || 1;
      while (maxIterations--) {
        // Evaluate and update our best guess (doubling guesses that zero out).
        // Finish if the scale equals or crosses 1 (making the old*new product non-positive).
        jQuery.style(elem, prop, initialInUnit + unit);
        if ((1 - scale) * (1 - (scale = currentValue() / initial || 0.5)) <= 0) {
          maxIterations = 0;
        }
        initialInUnit = initialInUnit / scale;
      }
      initialInUnit = initialInUnit * 2;
      jQuery.style(elem, prop, initialInUnit + unit);

      // Make sure we update the tween properties later on
      valueParts = valueParts || [];
    }
    if (valueParts) {
      initialInUnit = +initialInUnit || +initial || 0;

      // Apply relative offset (+=/-=) if specified
      adjusted = valueParts[1] ? initialInUnit + (valueParts[1] + 1) * valueParts[2] : +valueParts[2];
      if (tween) {
        tween.unit = unit;
        tween.start = initialInUnit;
        tween.end = adjusted;
      }
    }
    return adjusted;
  }
  var defaultDisplayMap = {};
  function getDefaultDisplay(elem) {
    var temp,
      doc = elem.ownerDocument,
      nodeName = elem.nodeName,
      display = defaultDisplayMap[nodeName];
    if (display) {
      return display;
    }
    temp = doc.body.appendChild(doc.createElement(nodeName));
    display = jQuery.css(temp, "display");
    temp.parentNode.removeChild(temp);
    if (display === "none") {
      display = "block";
    }
    defaultDisplayMap[nodeName] = display;
    return display;
  }
  function showHide(elements, show) {
    var display,
      elem,
      values = [],
      index = 0,
      length = elements.length;

    // Determine new display value for elements that need to change
    for (; index < length; index++) {
      elem = elements[index];
      if (!elem.style) {
        continue;
      }
      display = elem.style.display;
      if (show) {
        // Since we force visibility upon cascade-hidden elements, an immediate (and slow)
        // check is required in this first loop unless we have a nonempty display value (either
        // inline or about-to-be-restored)
        if (display === "none") {
          values[index] = dataPriv.get(elem, "display") || null;
          if (!values[index]) {
            elem.style.display = "";
          }
        }
        if (elem.style.display === "" && isHiddenWithinTree(elem)) {
          values[index] = getDefaultDisplay(elem);
        }
      } else {
        if (display !== "none") {
          values[index] = "none";

          // Remember what we're overwriting
          dataPriv.set(elem, "display", display);
        }
      }
    }

    // Set the display of the elements in a second loop to avoid constant reflow
    for (index = 0; index < length; index++) {
      if (values[index] != null) {
        elements[index].style.display = values[index];
      }
    }
    return elements;
  }
  jQuery.fn.extend({
    show: function () {
      return showHide(this, true);
    },
    hide: function () {
      return showHide(this);
    },
    toggle: function (state) {
      if (typeof state === "boolean") {
        return state ? this.show() : this.hide();
      }
      return this.each(function () {
        if (isHiddenWithinTree(this)) {
          jQuery(this).show();
        } else {
          jQuery(this).hide();
        }
      });
    }
  });
  var rcheckableType = /^(?:checkbox|radio)$/i;
  var rtagName = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i;
  var rscriptType = /^$|^module$|\/(?:java|ecma)script/i;
  (function () {
    var fragment = document.createDocumentFragment(),
      div = fragment.appendChild(document.createElement("div")),
      input = document.createElement("input");

    // Support: Android 4.0 - 4.3 only
    // Check state lost if the name is set (trac-11217)
    // Support: Windows Web Apps (WWA)
    // `name` and `type` must use .setAttribute for WWA (trac-14901)
    input.setAttribute("type", "radio");
    input.setAttribute("checked", "checked");
    input.setAttribute("name", "t");
    div.appendChild(input);

    // Support: Android <=4.1 only
    // Older WebKit doesn't clone checked state correctly in fragments
    support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;

    // Support: IE <=11 only
    // Make sure textarea (and checkbox) defaultValue is properly cloned
    div.innerHTML = "<textarea>x</textarea>";
    support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;

    // Support: IE <=9 only
    // IE <=9 replaces <option> tags with their contents when inserted outside of
    // the select element.
    div.innerHTML = "<option></option>";
    support.option = !!div.lastChild;
  })();

  // We have to close these tags to support XHTML (trac-13200)
  var wrapMap = {
    // XHTML parsers do not magically insert elements in the
    // same way that tag soup parsers do. So we cannot shorten
    // this by omitting <tbody> or other required elements.
    thead: [1, "<table>", "</table>"],
    col: [2, "<table><colgroup>", "</colgroup></table>"],
    tr: [2, "<table><tbody>", "</tbody></table>"],
    td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
    _default: [0, "", ""]
  };
  wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
  wrapMap.th = wrapMap.td;

  // Support: IE <=9 only
  if (!support.option) {
    wrapMap.optgroup = wrapMap.option = [1, "<select multiple='multiple'>", "</select>"];
  }
  function getAll(context, tag) {
    // Support: IE <=9 - 11 only
    // Use typeof to avoid zero-argument method invocation on host objects (trac-15151)
    var ret;
    if (typeof context.getElementsByTagName !== "undefined") {
      ret = context.getElementsByTagName(tag || "*");
    } else if (typeof context.querySelectorAll !== "undefined") {
      ret = context.querySelectorAll(tag || "*");
    } else {
      ret = [];
    }
    if (tag === undefined || tag && nodeName(context, tag)) {
      return jQuery.merge([context], ret);
    }
    return ret;
  }

  // Mark scripts as having already been evaluated
  function setGlobalEval(elems, refElements) {
    var i = 0,
      l = elems.length;
    for (; i < l; i++) {
      dataPriv.set(elems[i], "globalEval", !refElements || dataPriv.get(refElements[i], "globalEval"));
    }
  }
  var rhtml = /<|&#?\w+;/;
  function buildFragment(elems, context, scripts, selection, ignored) {
    var elem,
      tmp,
      tag,
      wrap,
      attached,
      j,
      fragment = context.createDocumentFragment(),
      nodes = [],
      i = 0,
      l = elems.length;
    for (; i < l; i++) {
      elem = elems[i];
      if (elem || elem === 0) {
        // Add nodes directly
        if (toType(elem) === "object") {
          // Support: Android <=4.0 only, PhantomJS 1 only
          // push.apply(_, arraylike) throws on ancient WebKit
          jQuery.merge(nodes, elem.nodeType ? [elem] : elem);

          // Convert non-html into a text node
        } else if (!rhtml.test(elem)) {
          nodes.push(context.createTextNode(elem));

          // Convert html into DOM nodes
        } else {
          tmp = tmp || fragment.appendChild(context.createElement("div"));

          // Deserialize a standard representation
          tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
          wrap = wrapMap[tag] || wrapMap._default;
          tmp.innerHTML = wrap[1] + jQuery.htmlPrefilter(elem) + wrap[2];

          // Descend through wrappers to the right content
          j = wrap[0];
          while (j--) {
            tmp = tmp.lastChild;
          }

          // Support: Android <=4.0 only, PhantomJS 1 only
          // push.apply(_, arraylike) throws on ancient WebKit
          jQuery.merge(nodes, tmp.childNodes);

          // Remember the top-level container
          tmp = fragment.firstChild;

          // Ensure the created nodes are orphaned (trac-12392)
          tmp.textContent = "";
        }
      }
    }

    // Remove wrapper from fragment
    fragment.textContent = "";
    i = 0;
    while (elem = nodes[i++]) {
      // Skip elements already in the context collection (trac-4087)
      if (selection && jQuery.inArray(elem, selection) > -1) {
        if (ignored) {
          ignored.push(elem);
        }
        continue;
      }
      attached = isAttached(elem);

      // Append to fragment
      tmp = getAll(fragment.appendChild(elem), "script");

      // Preserve script evaluation history
      if (attached) {
        setGlobalEval(tmp);
      }

      // Capture executables
      if (scripts) {
        j = 0;
        while (elem = tmp[j++]) {
          if (rscriptType.test(elem.type || "")) {
            scripts.push(elem);
          }
        }
      }
    }
    return fragment;
  }
  var rtypenamespace = /^([^.]*)(?:\.(.+)|)/;
  function returnTrue() {
    return true;
  }
  function returnFalse() {
    return false;
  }
  function on(elem, types, selector, data, fn, one) {
    var origFn, type;

    // Types can be a map of types/handlers
    if (typeof types === "object") {
      // ( types-Object, selector, data )
      if (typeof selector !== "string") {
        // ( types-Object, data )
        data = data || selector;
        selector = undefined;
      }
      for (type in types) {
        on(elem, type, selector, data, types[type], one);
      }
      return elem;
    }
    if (data == null && fn == null) {
      // ( types, fn )
      fn = selector;
      data = selector = undefined;
    } else if (fn == null) {
      if (typeof selector === "string") {
        // ( types, selector, fn )
        fn = data;
        data = undefined;
      } else {
        // ( types, data, fn )
        fn = data;
        data = selector;
        selector = undefined;
      }
    }
    if (fn === false) {
      fn = returnFalse;
    } else if (!fn) {
      return elem;
    }
    if (one === 1) {
      origFn = fn;
      fn = function (event) {
        // Can use an empty set, since event contains the info
        jQuery().off(event);
        return origFn.apply(this, arguments);
      };

      // Use same guid so caller can remove using origFn
      fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
    }
    return elem.each(function () {
      jQuery.event.add(this, types, fn, data, selector);
    });
  }

  /*
   * Helper functions for managing events -- not part of the public interface.
   * Props to Dean Edwards' addEvent library for many of the ideas.
   */
  jQuery.event = {
    global: {},
    add: function (elem, types, handler, data, selector) {
      var handleObjIn,
        eventHandle,
        tmp,
        events,
        t,
        handleObj,
        special,
        handlers,
        type,
        namespaces,
        origType,
        elemData = dataPriv.get(elem);

      // Only attach events to objects that accept data
      if (!acceptData(elem)) {
        return;
      }

      // Caller can pass in an object of custom data in lieu of the handler
      if (handler.handler) {
        handleObjIn = handler;
        handler = handleObjIn.handler;
        selector = handleObjIn.selector;
      }

      // Ensure that invalid selectors throw exceptions at attach time
      // Evaluate against documentElement in case elem is a non-element node (e.g., document)
      if (selector) {
        jQuery.find.matchesSelector(documentElement, selector);
      }

      // Make sure that the handler has a unique ID, used to find/remove it later
      if (!handler.guid) {
        handler.guid = jQuery.guid++;
      }

      // Init the element's event structure and main handler, if this is the first
      if (!(events = elemData.events)) {
        events = elemData.events = Object.create(null);
      }
      if (!(eventHandle = elemData.handle)) {
        eventHandle = elemData.handle = function (e) {
          // Discard the second event of a jQuery.event.trigger() and
          // when an event is called after a page has unloaded
          return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ? jQuery.event.dispatch.apply(elem, arguments) : undefined;
        };
      }

      // Handle multiple events separated by a space
      types = (types || "").match(rnothtmlwhite) || [""];
      t = types.length;
      while (t--) {
        tmp = rtypenamespace.exec(types[t]) || [];
        type = origType = tmp[1];
        namespaces = (tmp[2] || "").split(".").sort();

        // There *must* be a type, no attaching namespace-only handlers
        if (!type) {
          continue;
        }

        // If event changes its type, use the special event handlers for the changed type
        special = jQuery.event.special[type] || {};

        // If selector defined, determine special event api type, otherwise given type
        type = (selector ? special.delegateType : special.bindType) || type;

        // Update special based on newly reset type
        special = jQuery.event.special[type] || {};

        // handleObj is passed to all event handlers
        handleObj = jQuery.extend({
          type: type,
          origType: origType,
          data: data,
          handler: handler,
          guid: handler.guid,
          selector: selector,
          needsContext: selector && jQuery.expr.match.needsContext.test(selector),
          namespace: namespaces.join(".")
        }, handleObjIn);

        // Init the event handler queue if we're the first
        if (!(handlers = events[type])) {
          handlers = events[type] = [];
          handlers.delegateCount = 0;

          // Only use addEventListener if the special events handler returns false
          if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
            if (elem.addEventListener) {
              elem.addEventListener(type, eventHandle);
            }
          }
        }
        if (special.add) {
          special.add.call(elem, handleObj);
          if (!handleObj.handler.guid) {
            handleObj.handler.guid = handler.guid;
          }
        }

        // Add to the element's handler list, delegates in front
        if (selector) {
          handlers.splice(handlers.delegateCount++, 0, handleObj);
        } else {
          handlers.push(handleObj);
        }

        // Keep track of which events have ever been used, for event optimization
        jQuery.event.global[type] = true;
      }
    },
    // Detach an event or set of events from an element
    remove: function (elem, types, handler, selector, mappedTypes) {
      var j,
        origCount,
        tmp,
        events,
        t,
        handleObj,
        special,
        handlers,
        type,
        namespaces,
        origType,
        elemData = dataPriv.hasData(elem) && dataPriv.get(elem);
      if (!elemData || !(events = elemData.events)) {
        return;
      }

      // Once for each type.namespace in types; type may be omitted
      types = (types || "").match(rnothtmlwhite) || [""];
      t = types.length;
      while (t--) {
        tmp = rtypenamespace.exec(types[t]) || [];
        type = origType = tmp[1];
        namespaces = (tmp[2] || "").split(".").sort();

        // Unbind all events (on this namespace, if provided) for the element
        if (!type) {
          for (type in events) {
            jQuery.event.remove(elem, type + types[t], handler, selector, true);
          }
          continue;
        }
        special = jQuery.event.special[type] || {};
        type = (selector ? special.delegateType : special.bindType) || type;
        handlers = events[type] || [];
        tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");

        // Remove matching events
        origCount = j = handlers.length;
        while (j--) {
          handleObj = handlers[j];
          if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
            handlers.splice(j, 1);
            if (handleObj.selector) {
              handlers.delegateCount--;
            }
            if (special.remove) {
              special.remove.call(elem, handleObj);
            }
          }
        }

        // Remove generic event handler if we removed something and no more handlers exist
        // (avoids potential for endless recursion during removal of special event handlers)
        if (origCount && !handlers.length) {
          if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {
            jQuery.removeEvent(elem, type, elemData.handle);
          }
          delete events[type];
        }
      }

      // Remove data and the expando if it's no longer used
      if (jQuery.isEmptyObject(events)) {
        dataPriv.remove(elem, "handle events");
      }
    },
    dispatch: function (nativeEvent) {
      var i,
        j,
        ret,
        matched,
        handleObj,
        handlerQueue,
        args = new Array(arguments.length),
        // Make a writable jQuery.Event from the native event object
        event = jQuery.event.fix(nativeEvent),
        handlers = (dataPriv.get(this, "events") || Object.create(null))[event.type] || [],
        special = jQuery.event.special[event.type] || {};

      // Use the fix-ed jQuery.Event rather than the (read-only) native event
      args[0] = event;
      for (i = 1; i < arguments.length; i++) {
        args[i] = arguments[i];
      }
      event.delegateTarget = this;

      // Call the preDispatch hook for the mapped type, and let it bail if desired
      if (special.preDispatch && special.preDispatch.call(this, event) === false) {
        return;
      }

      // Determine handlers
      handlerQueue = jQuery.event.handlers.call(this, event, handlers);

      // Run delegates first; they may want to stop propagation beneath us
      i = 0;
      while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
        event.currentTarget = matched.elem;
        j = 0;
        while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {
          // If the event is namespaced, then each handler is only invoked if it is
          // specially universal or its namespaces are a superset of the event's.
          if (!event.rnamespace || handleObj.namespace === false || event.rnamespace.test(handleObj.namespace)) {
            event.handleObj = handleObj;
            event.data = handleObj.data;
            ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);
            if (ret !== undefined) {
              if ((event.result = ret) === false) {
                event.preventDefault();
                event.stopPropagation();
              }
            }
          }
        }
      }

      // Call the postDispatch hook for the mapped type
      if (special.postDispatch) {
        special.postDispatch.call(this, event);
      }
      return event.result;
    },
    handlers: function (event, handlers) {
      var i,
        handleObj,
        sel,
        matchedHandlers,
        matchedSelectors,
        handlerQueue = [],
        delegateCount = handlers.delegateCount,
        cur = event.target;

      // Find delegate handlers
      if (delegateCount &&
      // Support: IE <=9
      // Black-hole SVG <use> instance trees (trac-13180)
      cur.nodeType &&
      // Support: Firefox <=42
      // Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
      // https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
      // Support: IE 11 only
      // ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
      !(event.type === "click" && event.button >= 1)) {
        for (; cur !== this; cur = cur.parentNode || this) {
          // Don't check non-elements (trac-13208)
          // Don't process clicks on disabled elements (trac-6911, trac-8165, trac-11382, trac-11764)
          if (cur.nodeType === 1 && !(event.type === "click" && cur.disabled === true)) {
            matchedHandlers = [];
            matchedSelectors = {};
            for (i = 0; i < delegateCount; i++) {
              handleObj = handlers[i];

              // Don't conflict with Object.prototype properties (trac-13203)
              sel = handleObj.selector + " ";
              if (matchedSelectors[sel] === undefined) {
                matchedSelectors[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) > -1 : jQuery.find(sel, this, null, [cur]).length;
              }
              if (matchedSelectors[sel]) {
                matchedHandlers.push(handleObj);
              }
            }
            if (matchedHandlers.length) {
              handlerQueue.push({
                elem: cur,
                handlers: matchedHandlers
              });
            }
          }
        }
      }

      // Add the remaining (directly-bound) handlers
      cur = this;
      if (delegateCount < handlers.length) {
        handlerQueue.push({
          elem: cur,
          handlers: handlers.slice(delegateCount)
        });
      }
      return handlerQueue;
    },
    addProp: function (name, hook) {
      Object.defineProperty(jQuery.Event.prototype, name, {
        enumerable: true,
        configurable: true,
        get: isFunction(hook) ? function () {
          if (this.originalEvent) {
            return hook(this.originalEvent);
          }
        } : function () {
          if (this.originalEvent) {
            return this.originalEvent[name];
          }
        },
        set: function (value) {
          Object.defineProperty(this, name, {
            enumerable: true,
            configurable: true,
            writable: true,
            value: value
          });
        }
      });
    },
    fix: function (originalEvent) {
      return originalEvent[jQuery.expando] ? originalEvent : new jQuery.Event(originalEvent);
    },
    special: {
      load: {
        // Prevent triggered image.load events from bubbling to window.load
        noBubble: true
      },
      click: {
        // Utilize native event to ensure correct state for checkable inputs
        setup: function (data) {
          // For mutual compressibility with _default, replace `this` access with a local var.
          // `|| data` is dead code meant only to preserve the variable through minification.
          var el = this || data;

          // Claim the first handler
          if (rcheckableType.test(el.type) && el.click && nodeName(el, "input")) {
            // dataPriv.set( el, "click", ... )
            leverageNative(el, "click", true);
          }

          // Return false to allow normal processing in the caller
          return false;
        },
        trigger: function (data) {
          // For mutual compressibility with _default, replace `this` access with a local var.
          // `|| data` is dead code meant only to preserve the variable through minification.
          var el = this || data;

          // Force setup before triggering a click
          if (rcheckableType.test(el.type) && el.click && nodeName(el, "input")) {
            leverageNative(el, "click");
          }

          // Return non-false to allow normal event-path propagation
          return true;
        },
        // For cross-browser consistency, suppress native .click() on links
        // Also prevent it if we're currently inside a leveraged native-event stack
        _default: function (event) {
          var target = event.target;
          return rcheckableType.test(target.type) && target.click && nodeName(target, "input") && dataPriv.get(target, "click") || nodeName(target, "a");
        }
      },
      beforeunload: {
        postDispatch: function (event) {
          // Support: Firefox 20+
          // Firefox doesn't alert if the returnValue field is not set.
          if (event.result !== undefined && event.originalEvent) {
            event.originalEvent.returnValue = event.result;
          }
        }
      }
    }
  };

  // Ensure the presence of an event listener that handles manually-triggered
  // synthetic events by interrupting progress until reinvoked in response to
  // *native* events that it fires directly, ensuring that state changes have
  // already occurred before other listeners are invoked.
  function leverageNative(el, type, isSetup) {
    // Missing `isSetup` indicates a trigger call, which must force setup through jQuery.event.add
    if (!isSetup) {
      if (dataPriv.get(el, type) === undefined) {
        jQuery.event.add(el, type, returnTrue);
      }
      return;
    }

    // Register the controller as a special universal handler for all event namespaces
    dataPriv.set(el, type, false);
    jQuery.event.add(el, type, {
      namespace: false,
      handler: function (event) {
        var result,
          saved = dataPriv.get(this, type);
        if (event.isTrigger & 1 && this[type]) {
          // Interrupt processing of the outer synthetic .trigger()ed event
          if (!saved) {
            // Store arguments for use when handling the inner native event
            // There will always be at least one argument (an event object), so this array
            // will not be confused with a leftover capture object.
            saved = slice.call(arguments);
            dataPriv.set(this, type, saved);

            // Trigger the native event and capture its result
            this[type]();
            result = dataPriv.get(this, type);
            dataPriv.set(this, type, false);
            if (saved !== result) {
              // Cancel the outer synthetic event
              event.stopImmediatePropagation();
              event.preventDefault();
              return result;
            }

            // If this is an inner synthetic event for an event with a bubbling surrogate
            // (focus or blur), assume that the surrogate already propagated from triggering
            // the native event and prevent that from happening again here.
            // This technically gets the ordering wrong w.r.t. to `.trigger()` (in which the
            // bubbling surrogate propagates *after* the non-bubbling base), but that seems
            // less bad than duplication.
          } else if ((jQuery.event.special[type] || {}).delegateType) {
            event.stopPropagation();
          }

          // If this is a native event triggered above, everything is now in order
          // Fire an inner synthetic event with the original arguments
        } else if (saved) {
          // ...and capture the result
          dataPriv.set(this, type, jQuery.event.trigger(saved[0], saved.slice(1), this));

          // Abort handling of the native event by all jQuery handlers while allowing
          // native handlers on the same element to run. On target, this is achieved
          // by stopping immediate propagation just on the jQuery event. However,
          // the native event is re-wrapped by a jQuery one on each level of the
          // propagation so the only way to stop it for jQuery is to stop it for
          // everyone via native `stopPropagation()`. This is not a problem for
          // focus/blur which don't bubble, but it does also stop click on checkboxes
          // and radios. We accept this limitation.
          event.stopPropagation();
          event.isImmediatePropagationStopped = returnTrue;
        }
      }
    });
  }
  jQuery.removeEvent = function (elem, type, handle) {
    // This "if" is needed for plain objects
    if (elem.removeEventListener) {
      elem.removeEventListener(type, handle);
    }
  };
  jQuery.Event = function (src, props) {
    // Allow instantiation without the 'new' keyword
    if (!(this instanceof jQuery.Event)) {
      return new jQuery.Event(src, props);
    }

    // Event object
    if (src && src.type) {
      this.originalEvent = src;
      this.type = src.type;

      // Events bubbling up the document may have been marked as prevented
      // by a handler lower down the tree; reflect the correct value.
      this.isDefaultPrevented = src.defaultPrevented || src.defaultPrevented === undefined &&
      // Support: Android <=2.3 only
      src.returnValue === false ? returnTrue : returnFalse;

      // Create target properties
      // Support: Safari <=6 - 7 only
      // Target should not be a text node (trac-504, trac-13143)
      this.target = src.target && src.target.nodeType === 3 ? src.target.parentNode : src.target;
      this.currentTarget = src.currentTarget;
      this.relatedTarget = src.relatedTarget;

      // Event type
    } else {
      this.type = src;
    }

    // Put explicitly provided properties onto the event object
    if (props) {
      jQuery.extend(this, props);
    }

    // Create a timestamp if incoming event doesn't have one
    this.timeStamp = src && src.timeStamp || Date.now();

    // Mark it as fixed
    this[jQuery.expando] = true;
  };

  // jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
  // https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
  jQuery.Event.prototype = {
    constructor: jQuery.Event,
    isDefaultPrevented: returnFalse,
    isPropagationStopped: returnFalse,
    isImmediatePropagationStopped: returnFalse,
    isSimulated: false,
    preventDefault: function () {
      var e = this.originalEvent;
      this.isDefaultPrevented = returnTrue;
      if (e && !this.isSimulated) {
        e.preventDefault();
      }
    },
    stopPropagation: function () {
      var e = this.originalEvent;
      this.isPropagationStopped = returnTrue;
      if (e && !this.isSimulated) {
        e.stopPropagation();
      }
    },
    stopImmediatePropagation: function () {
      var e = this.originalEvent;
      this.isImmediatePropagationStopped = returnTrue;
      if (e && !this.isSimulated) {
        e.stopImmediatePropagation();
      }
      this.stopPropagation();
    }
  };

  // Includes all common event props including KeyEvent and MouseEvent specific props
  jQuery.each({
    altKey: true,
    bubbles: true,
    cancelable: true,
    changedTouches: true,
    ctrlKey: true,
    detail: true,
    eventPhase: true,
    metaKey: true,
    pageX: true,
    pageY: true,
    shiftKey: true,
    view: true,
    "char": true,
    code: true,
    charCode: true,
    key: true,
    keyCode: true,
    button: true,
    buttons: true,
    clientX: true,
    clientY: true,
    offsetX: true,
    offsetY: true,
    pointerId: true,
    pointerType: true,
    screenX: true,
    screenY: true,
    targetTouches: true,
    toElement: true,
    touches: true,
    which: true
  }, jQuery.event.addProp);
  jQuery.each({
    focus: "focusin",
    blur: "focusout"
  }, function (type, delegateType) {
    function focusMappedHandler(nativeEvent) {
      if (document.documentMode) {
        // Support: IE 11+
        // Attach a single focusin/focusout handler on the document while someone wants
        // focus/blur. This is because the former are synchronous in IE while the latter
        // are async. In other browsers, all those handlers are invoked synchronously.

        // `handle` from private data would already wrap the event, but we need
        // to change the `type` here.
        var handle = dataPriv.get(this, "handle"),
          event = jQuery.event.fix(nativeEvent);
        event.type = nativeEvent.type === "focusin" ? "focus" : "blur";
        event.isSimulated = true;

        // First, handle focusin/focusout
        handle(nativeEvent);

        // ...then, handle focus/blur
        //
        // focus/blur don't bubble while focusin/focusout do; simulate the former by only
        // invoking the handler at the lower level.
        if (event.target === event.currentTarget) {
          // The setup part calls `leverageNative`, which, in turn, calls
          // `jQuery.event.add`, so event handle will already have been set
          // by this point.
          handle(event);
        }
      } else {
        // For non-IE browsers, attach a single capturing handler on the document
        // while someone wants focusin/focusout.
        jQuery.event.simulate(delegateType, nativeEvent.target, jQuery.event.fix(nativeEvent));
      }
    }
    jQuery.event.special[type] = {
      // Utilize native event if possible so blur/focus sequence is correct
      setup: function () {
        var attaches;

        // Claim the first handler
        // dataPriv.set( this, "focus", ... )
        // dataPriv.set( this, "blur", ... )
        leverageNative(this, type, true);
        if (document.documentMode) {
          // Support: IE 9 - 11+
          // We use the same native handler for focusin & focus (and focusout & blur)
          // so we need to coordinate setup & teardown parts between those events.
          // Use `delegateType` as the key as `type` is already used by `leverageNative`.
          attaches = dataPriv.get(this, delegateType);
          if (!attaches) {
            this.addEventListener(delegateType, focusMappedHandler);
          }
          dataPriv.set(this, delegateType, (attaches || 0) + 1);
        } else {
          // Return false to allow normal processing in the caller
          return false;
        }
      },
      trigger: function () {
        // Force setup before trigger
        leverageNative(this, type);

        // Return non-false to allow normal event-path propagation
        return true;
      },
      teardown: function () {
        var attaches;
        if (document.documentMode) {
          attaches = dataPriv.get(this, delegateType) - 1;
          if (!attaches) {
            this.removeEventListener(delegateType, focusMappedHandler);
            dataPriv.remove(this, delegateType);
          } else {
            dataPriv.set(this, delegateType, attaches);
          }
        } else {
          // Return false to indicate standard teardown should be applied
          return false;
        }
      },
      // Suppress native focus or blur if we're currently inside
      // a leveraged native-event stack
      _default: function (event) {
        return dataPriv.get(event.target, type);
      },
      delegateType: delegateType
    };

    // Support: Firefox <=44
    // Firefox doesn't have focus(in | out) events
    // Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
    //
    // Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
    // focus(in | out) events fire after focus & blur events,
    // which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
    // Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
    //
    // Support: IE 9 - 11+
    // To preserve relative focusin/focus & focusout/blur event order guaranteed on the 3.x branch,
    // attach a single handler for both events in IE.
    jQuery.event.special[delegateType] = {
      setup: function () {
        // Handle: regular nodes (via `this.ownerDocument`), window
        // (via `this.document`) & document (via `this`).
        var doc = this.ownerDocument || this.document || this,
          dataHolder = document.documentMode ? this : doc,
          attaches = dataPriv.get(dataHolder, delegateType);

        // Support: IE 9 - 11+
        // We use the same native handler for focusin & focus (and focusout & blur)
        // so we need to coordinate setup & teardown parts between those events.
        // Use `delegateType` as the key as `type` is already used by `leverageNative`.
        if (!attaches) {
          if (document.documentMode) {
            this.addEventListener(delegateType, focusMappedHandler);
          } else {
            doc.addEventListener(type, focusMappedHandler, true);
          }
        }
        dataPriv.set(dataHolder, delegateType, (attaches || 0) + 1);
      },
      teardown: function () {
        var doc = this.ownerDocument || this.document || this,
          dataHolder = document.documentMode ? this : doc,
          attaches = dataPriv.get(dataHolder, delegateType) - 1;
        if (!attaches) {
          if (document.documentMode) {
            this.removeEventListener(delegateType, focusMappedHandler);
          } else {
            doc.removeEventListener(type, focusMappedHandler, true);
          }
          dataPriv.remove(dataHolder, delegateType);
        } else {
          dataPriv.set(dataHolder, delegateType, attaches);
        }
      }
    };
  });

  // Create mouseenter/leave events using mouseover/out and event-time checks
  // so that event delegation works in jQuery.
  // Do the same for pointerenter/pointerleave and pointerover/pointerout
  //
  // Support: Safari 7 only
  // Safari sends mouseenter too often; see:
  // https://bugs.chromium.org/p/chromium/issues/detail?id=470258
  // for the description of the bug (it existed in older Chrome versions as well).
  jQuery.each({
    mouseenter: "mouseover",
    mouseleave: "mouseout",
    pointerenter: "pointerover",
    pointerleave: "pointerout"
  }, function (orig, fix) {
    jQuery.event.special[orig] = {
      delegateType: fix,
      bindType: fix,
      handle: function (event) {
        var ret,
          target = this,
          related = event.relatedTarget,
          handleObj = event.handleObj;

        // For mouseenter/leave call the handler if related is outside the target.
        // NB: No relatedTarget if the mouse left/entered the browser window
        if (!related || related !== target && !jQuery.contains(target, related)) {
          event.type = handleObj.origType;
          ret = handleObj.handler.apply(this, arguments);
          event.type = fix;
        }
        return ret;
      }
    };
  });
  jQuery.fn.extend({
    on: function (types, selector, data, fn) {
      return on(this, types, selector, data, fn);
    },
    one: function (types, selector, data, fn) {
      return on(this, types, selector, data, fn, 1);
    },
    off: function (types, selector, fn) {
      var handleObj, type;
      if (types && types.preventDefault && types.handleObj) {
        // ( event )  dispatched jQuery.Event
        handleObj = types.handleObj;
        jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler);
        return this;
      }
      if (typeof types === "object") {
        // ( types-object [, selector] )
        for (type in types) {
          this.off(type, selector, types[type]);
        }
        return this;
      }
      if (selector === false || typeof selector === "function") {
        // ( types [, fn] )
        fn = selector;
        selector = undefined;
      }
      if (fn === false) {
        fn = returnFalse;
      }
      return this.each(function () {
        jQuery.event.remove(this, types, fn, selector);
      });
    }
  });
  var
    // Support: IE <=10 - 11, Edge 12 - 13 only
    // In IE/Edge using regex groups here causes severe slowdowns.
    // See https://connect.microsoft.com/IE/feedback/details/1736512/
    rnoInnerhtml = /<script|<style|<link/i,
    // checked="checked" or checked
    rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
    rcleanScript = /^\s*<!\[CDATA\[|\]\]>\s*$/g;

  // Prefer a tbody over its parent table for containing new rows
  function manipulationTarget(elem, content) {
    if (nodeName(elem, "table") && nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr")) {
      return jQuery(elem).children("tbody")[0] || elem;
    }
    return elem;
  }

  // Replace/restore the type attribute of script elements for safe DOM manipulation
  function disableScript(elem) {
    elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
    return elem;
  }
  function restoreScript(elem) {
    if ((elem.type || "").slice(0, 5) === "true/") {
      elem.type = elem.type.slice(5);
    } else {
      elem.removeAttribute("type");
    }
    return elem;
  }
  function cloneCopyEvent(src, dest) {
    var i, l, type, pdataOld, udataOld, udataCur, events;
    if (dest.nodeType !== 1) {
      return;
    }

    // 1. Copy private data: events, handlers, etc.
    if (dataPriv.hasData(src)) {
      pdataOld = dataPriv.get(src);
      events = pdataOld.events;
      if (events) {
        dataPriv.remove(dest, "handle events");
        for (type in events) {
          for (i = 0, l = events[type].length; i < l; i++) {
            jQuery.event.add(dest, type, events[type][i]);
          }
        }
      }
    }

    // 2. Copy user data
    if (dataUser.hasData(src)) {
      udataOld = dataUser.access(src);
      udataCur = jQuery.extend({}, udataOld);
      dataUser.set(dest, udataCur);
    }
  }

  // Fix IE bugs, see support tests
  function fixInput(src, dest) {
    var nodeName = dest.nodeName.toLowerCase();

    // Fails to persist the checked state of a cloned checkbox or radio button.
    if (nodeName === "input" && rcheckableType.test(src.type)) {
      dest.checked = src.checked;

      // Fails to return the selected option to the default selected state when cloning options
    } else if (nodeName === "input" || nodeName === "textarea") {
      dest.defaultValue = src.defaultValue;
    }
  }
  function domManip(collection, args, callback, ignored) {
    // Flatten any nested arrays
    args = flat(args);
    var fragment,
      first,
      scripts,
      hasScripts,
      node,
      doc,
      i = 0,
      l = collection.length,
      iNoClone = l - 1,
      value = args[0],
      valueIsFunction = isFunction(value);

    // We can't cloneNode fragments that contain checked, in WebKit
    if (valueIsFunction || l > 1 && typeof value === "string" && !support.checkClone && rchecked.test(value)) {
      return collection.each(function (index) {
        var self = collection.eq(index);
        if (valueIsFunction) {
          args[0] = value.call(this, index, self.html());
        }
        domManip(self, args, callback, ignored);
      });
    }
    if (l) {
      fragment = buildFragment(args, collection[0].ownerDocument, false, collection, ignored);
      first = fragment.firstChild;
      if (fragment.childNodes.length === 1) {
        fragment = first;
      }

      // Require either new content or an interest in ignored elements to invoke the callback
      if (first || ignored) {
        scripts = jQuery.map(getAll(fragment, "script"), disableScript);
        hasScripts = scripts.length;

        // Use the original fragment for the last item
        // instead of the first because it can end up
        // being emptied incorrectly in certain situations (trac-8070).
        for (; i < l; i++) {
          node = fragment;
          if (i !== iNoClone) {
            node = jQuery.clone(node, true, true);

            // Keep references to cloned scripts for later restoration
            if (hasScripts) {
              // Support: Android <=4.0 only, PhantomJS 1 only
              // push.apply(_, arraylike) throws on ancient WebKit
              jQuery.merge(scripts, getAll(node, "script"));
            }
          }
          callback.call(collection[i], node, i);
        }
        if (hasScripts) {
          doc = scripts[scripts.length - 1].ownerDocument;

          // Reenable scripts
          jQuery.map(scripts, restoreScript);

          // Evaluate executable scripts on first document insertion
          for (i = 0; i < hasScripts; i++) {
            node = scripts[i];
            if (rscriptType.test(node.type || "") && !dataPriv.access(node, "globalEval") && jQuery.contains(doc, node)) {
              if (node.src && (node.type || "").toLowerCase() !== "module") {
                // Optional AJAX dependency, but won't run scripts if not present
                if (jQuery._evalUrl && !node.noModule) {
                  jQuery._evalUrl(node.src, {
                    nonce: node.nonce || node.getAttribute("nonce")
                  }, doc);
                }
              } else {
                // Unwrap a CDATA section containing script contents. This shouldn't be
                // needed as in XML documents they're already not visible when
                // inspecting element contents and in HTML documents they have no
                // meaning but we're preserving that logic for backwards compatibility.
                // This will be removed completely in 4.0. See gh-4904.
                DOMEval(node.textContent.replace(rcleanScript, ""), node, doc);
              }
            }
          }
        }
      }
    }
    return collection;
  }
  function remove(elem, selector, keepData) {
    var node,
      nodes = selector ? jQuery.filter(selector, elem) : elem,
      i = 0;
    for (; (node = nodes[i]) != null; i++) {
      if (!keepData && node.nodeType === 1) {
        jQuery.cleanData(getAll(node));
      }
      if (node.parentNode) {
        if (keepData && isAttached(node)) {
          setGlobalEval(getAll(node, "script"));
        }
        node.parentNode.removeChild(node);
      }
    }
    return elem;
  }
  jQuery.extend({
    htmlPrefilter: function (html) {
      return html;
    },
    clone: function (elem, dataAndEvents, deepDataAndEvents) {
      var i,
        l,
        srcElements,
        destElements,
        clone = elem.cloneNode(true),
        inPage = isAttached(elem);

      // Fix IE cloning issues
      if (!support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {
        // We eschew jQuery#find here for performance reasons:
        // https://jsperf.com/getall-vs-sizzle/2
        destElements = getAll(clone);
        srcElements = getAll(elem);
        for (i = 0, l = srcElements.length; i < l; i++) {
          fixInput(srcElements[i], destElements[i]);
        }
      }

      // Copy the events from the original to the clone
      if (dataAndEvents) {
        if (deepDataAndEvents) {
          srcElements = srcElements || getAll(elem);
          destElements = destElements || getAll(clone);
          for (i = 0, l = srcElements.length; i < l; i++) {
            cloneCopyEvent(srcElements[i], destElements[i]);
          }
        } else {
          cloneCopyEvent(elem, clone);
        }
      }

      // Preserve script evaluation history
      destElements = getAll(clone, "script");
      if (destElements.length > 0) {
        setGlobalEval(destElements, !inPage && getAll(elem, "script"));
      }

      // Return the cloned set
      return clone;
    },
    cleanData: function (elems) {
      var data,
        elem,
        type,
        special = jQuery.event.special,
        i = 0;
      for (; (elem = elems[i]) !== undefined; i++) {
        if (acceptData(elem)) {
          if (data = elem[dataPriv.expando]) {
            if (data.events) {
              for (type in data.events) {
                if (special[type]) {
                  jQuery.event.remove(elem, type);

                  // This is a shortcut to avoid jQuery.event.remove's overhead
                } else {
                  jQuery.removeEvent(elem, type, data.handle);
                }
              }
            }

            // Support: Chrome <=35 - 45+
            // Assign undefined instead of using delete, see Data#remove
            elem[dataPriv.expando] = undefined;
          }
          if (elem[dataUser.expando]) {
            // Support: Chrome <=35 - 45+
            // Assign undefined instead of using delete, see Data#remove
            elem[dataUser.expando] = undefined;
          }
        }
      }
    }
  });
  jQuery.fn.extend({
    detach: function (selector) {
      return remove(this, selector, true);
    },
    remove: function (selector) {
      return remove(this, selector);
    },
    text: function (value) {
      return access(this, function (value) {
        return value === undefined ? jQuery.text(this) : this.empty().each(function () {
          if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
            this.textContent = value;
          }
        });
      }, null, value, arguments.length);
    },
    append: function () {
      return domManip(this, arguments, function (elem) {
        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
          var target = manipulationTarget(this, elem);
          target.appendChild(elem);
        }
      });
    },
    prepend: function () {
      return domManip(this, arguments, function (elem) {
        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
          var target = manipulationTarget(this, elem);
          target.insertBefore(elem, target.firstChild);
        }
      });
    },
    before: function () {
      return domManip(this, arguments, function (elem) {
        if (this.parentNode) {
          this.parentNode.insertBefore(elem, this);
        }
      });
    },
    after: function () {
      return domManip(this, arguments, function (elem) {
        if (this.parentNode) {
          this.parentNode.insertBefore(elem, this.nextSibling);
        }
      });
    },
    empty: function () {
      var elem,
        i = 0;
      for (; (elem = this[i]) != null; i++) {
        if (elem.nodeType === 1) {
          // Prevent memory leaks
          jQuery.cleanData(getAll(elem, false));

          // Remove any remaining nodes
          elem.textContent = "";
        }
      }
      return this;
    },
    clone: function (dataAndEvents, deepDataAndEvents) {
      dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
      deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
      return this.map(function () {
        return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
      });
    },
    html: function (value) {
      return access(this, function (value) {
        var elem = this[0] || {},
          i = 0,
          l = this.length;
        if (value === undefined && elem.nodeType === 1) {
          return elem.innerHTML;
        }

        // See if we can take a shortcut and just use innerHTML
        if (typeof value === "string" && !rnoInnerhtml.test(value) && !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {
          value = jQuery.htmlPrefilter(value);
          try {
            for (; i < l; i++) {
              elem = this[i] || {};

              // Remove element nodes and prevent memory leaks
              if (elem.nodeType === 1) {
                jQuery.cleanData(getAll(elem, false));
                elem.innerHTML = value;
              }
            }
            elem = 0;

            // If using innerHTML throws an exception, use the fallback method
          } catch (e) {}
        }
        if (elem) {
          this.empty().append(value);
        }
      }, null, value, arguments.length);
    },
    replaceWith: function () {
      var ignored = [];

      // Make the changes, replacing each non-ignored context element with the new content
      return domManip(this, arguments, function (elem) {
        var parent = this.parentNode;
        if (jQuery.inArray(this, ignored) < 0) {
          jQuery.cleanData(getAll(this));
          if (parent) {
            parent.replaceChild(elem, this);
          }
        }

        // Force callback invocation
      }, ignored);
    }
  });
  jQuery.each({
    appendTo: "append",
    prependTo: "prepend",
    insertBefore: "before",
    insertAfter: "after",
    replaceAll: "replaceWith"
  }, function (name, original) {
    jQuery.fn[name] = function (selector) {
      var elems,
        ret = [],
        insert = jQuery(selector),
        last = insert.length - 1,
        i = 0;
      for (; i <= last; i++) {
        elems = i === last ? this : this.clone(true);
        jQuery(insert[i])[original](elems);

        // Support: Android <=4.0 only, PhantomJS 1 only
        // .get() because push.apply(_, arraylike) throws on ancient WebKit
        push.apply(ret, elems.get());
      }
      return this.pushStack(ret);
    };
  });
  var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");
  var rcustomProp = /^--/;
  var getStyles = function (elem) {
    // Support: IE <=11 only, Firefox <=30 (trac-15098, trac-14150)
    // IE throws on elements created in popups
    // FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
    var view = elem.ownerDocument.defaultView;
    if (!view || !view.opener) {
      view = window;
    }
    return view.getComputedStyle(elem);
  };
  var swap = function (elem, options, callback) {
    var ret,
      name,
      old = {};

    // Remember the old values, and insert the new ones
    for (name in options) {
      old[name] = elem.style[name];
      elem.style[name] = options[name];
    }
    ret = callback.call(elem);

    // Revert the old values
    for (name in options) {
      elem.style[name] = old[name];
    }
    return ret;
  };
  var rboxStyle = new RegExp(cssExpand.join("|"), "i");
  (function () {
    // Executing both pixelPosition & boxSizingReliable tests require only one layout
    // so they're executed at the same time to save the second computation.
    function computeStyleTests() {
      // This is a singleton, we need to execute it only once
      if (!div) {
        return;
      }
      container.style.cssText = "position:absolute;left:-11111px;width:60px;" + "margin-top:1px;padding:0;border:0";
      div.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;" + "margin:auto;border:1px;padding:1px;" + "width:60%;top:1%";
      documentElement.appendChild(container).appendChild(div);
      var divStyle = window.getComputedStyle(div);
      pixelPositionVal = divStyle.top !== "1%";

      // Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
      reliableMarginLeftVal = roundPixelMeasures(divStyle.marginLeft) === 12;

      // Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
      // Some styles come back with percentage values, even though they shouldn't
      div.style.right = "60%";
      pixelBoxStylesVal = roundPixelMeasures(divStyle.right) === 36;

      // Support: IE 9 - 11 only
      // Detect misreporting of content dimensions for box-sizing:border-box elements
      boxSizingReliableVal = roundPixelMeasures(divStyle.width) === 36;

      // Support: IE 9 only
      // Detect overflow:scroll screwiness (gh-3699)
      // Support: Chrome <=64
      // Don't get tricked when zoom affects offsetWidth (gh-4029)
      div.style.position = "absolute";
      scrollboxSizeVal = roundPixelMeasures(div.offsetWidth / 3) === 12;
      documentElement.removeChild(container);

      // Nullify the div so it wouldn't be stored in the memory and
      // it will also be a sign that checks already performed
      div = null;
    }
    function roundPixelMeasures(measure) {
      return Math.round(parseFloat(measure));
    }
    var pixelPositionVal,
      boxSizingReliableVal,
      scrollboxSizeVal,
      pixelBoxStylesVal,
      reliableTrDimensionsVal,
      reliableMarginLeftVal,
      container = document.createElement("div"),
      div = document.createElement("div");

    // Finish early in limited (non-browser) environments
    if (!div.style) {
      return;
    }

    // Support: IE <=9 - 11 only
    // Style of cloned element affects source element cloned (trac-8908)
    div.style.backgroundClip = "content-box";
    div.cloneNode(true).style.backgroundClip = "";
    support.clearCloneStyle = div.style.backgroundClip === "content-box";
    jQuery.extend(support, {
      boxSizingReliable: function () {
        computeStyleTests();
        return boxSizingReliableVal;
      },
      pixelBoxStyles: function () {
        computeStyleTests();
        return pixelBoxStylesVal;
      },
      pixelPosition: function () {
        computeStyleTests();
        return pixelPositionVal;
      },
      reliableMarginLeft: function () {
        computeStyleTests();
        return reliableMarginLeftVal;
      },
      scrollboxSize: function () {
        computeStyleTests();
        return scrollboxSizeVal;
      },
      // Support: IE 9 - 11+, Edge 15 - 18+
      // IE/Edge misreport `getComputedStyle` of table rows with width/height
      // set in CSS while `offset*` properties report correct values.
      // Behavior in IE 9 is more subtle than in newer versions & it passes
      // some versions of this test; make sure not to make it pass there!
      //
      // Support: Firefox 70+
      // Only Firefox includes border widths
      // in computed dimensions. (gh-4529)
      reliableTrDimensions: function () {
        var table, tr, trChild, trStyle;
        if (reliableTrDimensionsVal == null) {
          table = document.createElement("table");
          tr = document.createElement("tr");
          trChild = document.createElement("div");
          table.style.cssText = "position:absolute;left:-11111px;border-collapse:separate";
          tr.style.cssText = "border:1px solid";

          // Support: Chrome 86+
          // Height set through cssText does not get applied.
          // Computed height then comes back as 0.
          tr.style.height = "1px";
          trChild.style.height = "9px";

          // Support: Android 8 Chrome 86+
          // In our bodyBackground.html iframe,
          // display for all div elements is set to "inline",
          // which causes a problem only in Android 8 Chrome 86.
          // Ensuring the div is display: block
          // gets around this issue.
          trChild.style.display = "block";
          documentElement.appendChild(table).appendChild(tr).appendChild(trChild);
          trStyle = window.getComputedStyle(tr);
          reliableTrDimensionsVal = parseInt(trStyle.height, 10) + parseInt(trStyle.borderTopWidth, 10) + parseInt(trStyle.borderBottomWidth, 10) === tr.offsetHeight;
          documentElement.removeChild(table);
        }
        return reliableTrDimensionsVal;
      }
    });
  })();
  function curCSS(elem, name, computed) {
    var width,
      minWidth,
      maxWidth,
      ret,
      isCustomProp = rcustomProp.test(name),
      // Support: Firefox 51+
      // Retrieving style before computed somehow
      // fixes an issue with getting wrong values
      // on detached elements
      style = elem.style;
    computed = computed || getStyles(elem);

    // getPropertyValue is needed for:
    //   .css('filter') (IE 9 only, trac-12537)
    //   .css('--customProperty) (gh-3144)
    if (computed) {
      // Support: IE <=9 - 11+
      // IE only supports `"float"` in `getPropertyValue`; in computed styles
      // it's only available as `"cssFloat"`. We no longer modify properties
      // sent to `.css()` apart from camelCasing, so we need to check both.
      // Normally, this would create difference in behavior: if
      // `getPropertyValue` returns an empty string, the value returned
      // by `.css()` would be `undefined`. This is usually the case for
      // disconnected elements. However, in IE even disconnected elements
      // with no styles return `"none"` for `getPropertyValue( "float" )`
      ret = computed.getPropertyValue(name) || computed[name];
      if (isCustomProp && ret) {
        // Support: Firefox 105+, Chrome <=105+
        // Spec requires trimming whitespace for custom properties (gh-4926).
        // Firefox only trims leading whitespace. Chrome just collapses
        // both leading & trailing whitespace to a single space.
        //
        // Fall back to `undefined` if empty string returned.
        // This collapses a missing definition with property defined
        // and set to an empty string but there's no standard API
        // allowing us to differentiate them without a performance penalty
        // and returning `undefined` aligns with older jQuery.
        //
        // rtrimCSS treats U+000D CARRIAGE RETURN and U+000C FORM FEED
        // as whitespace while CSS does not, but this is not a problem
        // because CSS preprocessing replaces them with U+000A LINE FEED
        // (which *is* CSS whitespace)
        // https://www.w3.org/TR/css-syntax-3/#input-preprocessing
        ret = ret.replace(rtrimCSS, "$1") || undefined;
      }
      if (ret === "" && !isAttached(elem)) {
        ret = jQuery.style(elem, name);
      }

      // A tribute to the "awesome hack by Dean Edwards"
      // Android Browser returns percentage for some values,
      // but width seems to be reliably pixels.
      // This is against the CSSOM draft spec:
      // https://drafts.csswg.org/cssom/#resolved-values
      if (!support.pixelBoxStyles() && rnumnonpx.test(ret) && rboxStyle.test(name)) {
        // Remember the original values
        width = style.width;
        minWidth = style.minWidth;
        maxWidth = style.maxWidth;

        // Put in the new values to get a computed value out
        style.minWidth = style.maxWidth = style.width = ret;
        ret = computed.width;

        // Revert the changed values
        style.width = width;
        style.minWidth = minWidth;
        style.maxWidth = maxWidth;
      }
    }
    return ret !== undefined ?
    // Support: IE <=9 - 11 only
    // IE returns zIndex value as an integer.
    ret + "" : ret;
  }
  function addGetHookIf(conditionFn, hookFn) {
    // Define the hook, we'll check on the first run if it's really needed.
    return {
      get: function () {
        if (conditionFn()) {
          // Hook not needed (or it's not possible to use it due
          // to missing dependency), remove it.
          delete this.get;
          return;
        }

        // Hook needed; redefine it so that the support test is not executed again.
        return (this.get = hookFn).apply(this, arguments);
      }
    };
  }
  var cssPrefixes = ["Webkit", "Moz", "ms"],
    emptyStyle = document.createElement("div").style,
    vendorProps = {};

  // Return a vendor-prefixed property or undefined
  function vendorPropName(name) {
    // Check for vendor prefixed names
    var capName = name[0].toUpperCase() + name.slice(1),
      i = cssPrefixes.length;
    while (i--) {
      name = cssPrefixes[i] + capName;
      if (name in emptyStyle) {
        return name;
      }
    }
  }

  // Return a potentially-mapped jQuery.cssProps or vendor prefixed property
  function finalPropName(name) {
    var final = jQuery.cssProps[name] || vendorProps[name];
    if (final) {
      return final;
    }
    if (name in emptyStyle) {
      return name;
    }
    return vendorProps[name] = vendorPropName(name) || name;
  }
  var
    // Swappable if display is none or starts with table
    // except "table", "table-cell", or "table-caption"
    // See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
    rdisplayswap = /^(none|table(?!-c[ea]).+)/,
    cssShow = {
      position: "absolute",
      visibility: "hidden",
      display: "block"
    },
    cssNormalTransform = {
      letterSpacing: "0",
      fontWeight: "400"
    };
  function setPositiveNumber(_elem, value, subtract) {
    // Any relative (+/-) values have already been
    // normalized at this point
    var matches = rcssNum.exec(value);
    return matches ?
    // Guard against undefined "subtract", e.g., when used as in cssHooks
    Math.max(0, matches[2] - (subtract || 0)) + (matches[3] || "px") : value;
  }
  function boxModelAdjustment(elem, dimension, box, isBorderBox, styles, computedVal) {
    var i = dimension === "width" ? 1 : 0,
      extra = 0,
      delta = 0,
      marginDelta = 0;

    // Adjustment may not be necessary
    if (box === (isBorderBox ? "border" : "content")) {
      return 0;
    }
    for (; i < 4; i += 2) {
      // Both box models exclude margin
      // Count margin delta separately to only add it after scroll gutter adjustment.
      // This is needed to make negative margins work with `outerHeight( true )` (gh-3982).
      if (box === "margin") {
        marginDelta += jQuery.css(elem, box + cssExpand[i], true, styles);
      }

      // If we get here with a content-box, we're seeking "padding" or "border" or "margin"
      if (!isBorderBox) {
        // Add padding
        delta += jQuery.css(elem, "padding" + cssExpand[i], true, styles);

        // For "border" or "margin", add border
        if (box !== "padding") {
          delta += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);

          // But still keep track of it otherwise
        } else {
          extra += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
        }

        // If we get here with a border-box (content + padding + border), we're seeking "content" or
        // "padding" or "margin"
      } else {
        // For "content", subtract padding
        if (box === "content") {
          delta -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
        }

        // For "content" or "padding", subtract border
        if (box !== "margin") {
          delta -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
        }
      }
    }

    // Account for positive content-box scroll gutter when requested by providing computedVal
    if (!isBorderBox && computedVal >= 0) {
      // offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
      // Assuming integer scroll gutter, subtract the rest and round down
      delta += Math.max(0, Math.ceil(elem["offset" + dimension[0].toUpperCase() + dimension.slice(1)] - computedVal - delta - extra - 0.5

      // If offsetWidth/offsetHeight is unknown, then we can't determine content-box scroll gutter
      // Use an explicit zero to avoid NaN (gh-3964)
      )) || 0;
    }
    return delta + marginDelta;
  }
  function getWidthOrHeight(elem, dimension, extra) {
    // Start with computed style
    var styles = getStyles(elem),
      // To avoid forcing a reflow, only fetch boxSizing if we need it (gh-4322).
      // Fake content-box until we know it's needed to know the true value.
      boxSizingNeeded = !support.boxSizingReliable() || extra,
      isBorderBox = boxSizingNeeded && jQuery.css(elem, "boxSizing", false, styles) === "border-box",
      valueIsBorderBox = isBorderBox,
      val = curCSS(elem, dimension, styles),
      offsetProp = "offset" + dimension[0].toUpperCase() + dimension.slice(1);

    // Support: Firefox <=54
    // Return a confounding non-pixel value or feign ignorance, as appropriate.
    if (rnumnonpx.test(val)) {
      if (!extra) {
        return val;
      }
      val = "auto";
    }

    // Support: IE 9 - 11 only
    // Use offsetWidth/offsetHeight for when box sizing is unreliable.
    // In those cases, the computed value can be trusted to be border-box.
    if ((!support.boxSizingReliable() && isBorderBox ||
    // Support: IE 10 - 11+, Edge 15 - 18+
    // IE/Edge misreport `getComputedStyle` of table rows with width/height
    // set in CSS while `offset*` properties report correct values.
    // Interestingly, in some cases IE 9 doesn't suffer from this issue.
    !support.reliableTrDimensions() && nodeName(elem, "tr") ||
    // Fall back to offsetWidth/offsetHeight when value is "auto"
    // This happens for inline elements with no explicit setting (gh-3571)
    val === "auto" ||
    // Support: Android <=4.1 - 4.3 only
    // Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
    !parseFloat(val) && jQuery.css(elem, "display", false, styles) === "inline") &&
    // Make sure the element is visible & connected
    elem.getClientRects().length) {
      isBorderBox = jQuery.css(elem, "boxSizing", false, styles) === "border-box";

      // Where available, offsetWidth/offsetHeight approximate border box dimensions.
      // Where not available (e.g., SVG), assume unreliable box-sizing and interpret the
      // retrieved value as a content box dimension.
      valueIsBorderBox = offsetProp in elem;
      if (valueIsBorderBox) {
        val = elem[offsetProp];
      }
    }

    // Normalize "" and auto
    val = parseFloat(val) || 0;

    // Adjust for the element's box model
    return val + boxModelAdjustment(elem, dimension, extra || (isBorderBox ? "border" : "content"), valueIsBorderBox, styles,
    // Provide the current computed size to request scroll gutter calculation (gh-3589)
    val) + "px";
  }
  jQuery.extend({
    // Add in style property hooks for overriding the default
    // behavior of getting and setting a style property
    cssHooks: {
      opacity: {
        get: function (elem, computed) {
          if (computed) {
            // We should always get a number back from opacity
            var ret = curCSS(elem, "opacity");
            return ret === "" ? "1" : ret;
          }
        }
      }
    },
    // Don't automatically add "px" to these possibly-unitless properties
    cssNumber: {
      animationIterationCount: true,
      aspectRatio: true,
      borderImageSlice: true,
      columnCount: true,
      flexGrow: true,
      flexShrink: true,
      fontWeight: true,
      gridArea: true,
      gridColumn: true,
      gridColumnEnd: true,
      gridColumnStart: true,
      gridRow: true,
      gridRowEnd: true,
      gridRowStart: true,
      lineHeight: true,
      opacity: true,
      order: true,
      orphans: true,
      scale: true,
      widows: true,
      zIndex: true,
      zoom: true,
      // SVG-related
      fillOpacity: true,
      floodOpacity: true,
      stopOpacity: true,
      strokeMiterlimit: true,
      strokeOpacity: true
    },
    // Add in properties whose names you wish to fix before
    // setting or getting the value
    cssProps: {},
    // Get and set the style property on a DOM Node
    style: function (elem, name, value, extra) {
      // Don't set styles on text and comment nodes
      if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
        return;
      }

      // Make sure that we're working with the right name
      var ret,
        type,
        hooks,
        origName = camelCase(name),
        isCustomProp = rcustomProp.test(name),
        style = elem.style;

      // Make sure that we're working with the right name. We don't
      // want to query the value if it is a CSS custom property
      // since they are user-defined.
      if (!isCustomProp) {
        name = finalPropName(origName);
      }

      // Gets hook for the prefixed version, then unprefixed version
      hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

      // Check if we're setting a value
      if (value !== undefined) {
        type = typeof value;

        // Convert "+=" or "-=" to relative numbers (trac-7345)
        if (type === "string" && (ret = rcssNum.exec(value)) && ret[1]) {
          value = adjustCSS(elem, name, ret);

          // Fixes bug trac-9237
          type = "number";
        }

        // Make sure that null and NaN values aren't set (trac-7116)
        if (value == null || value !== value) {
          return;
        }

        // If a number was passed in, add the unit (except for certain CSS properties)
        // The isCustomProp check can be removed in jQuery 4.0 when we only auto-append
        // "px" to a few hardcoded values.
        if (type === "number" && !isCustomProp) {
          value += ret && ret[3] || (jQuery.cssNumber[origName] ? "" : "px");
        }

        // background-* props affect original clone's values
        if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
          style[name] = "inherit";
        }

        // If a hook was provided, use that value, otherwise just set the specified value
        if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {
          if (isCustomProp) {
            style.setProperty(name, value);
          } else {
            style[name] = value;
          }
        }
      } else {
        // If a hook was provided get the non-computed value from there
        if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {
          return ret;
        }

        // Otherwise just get the value from the style object
        return style[name];
      }
    },
    css: function (elem, name, extra, styles) {
      var val,
        num,
        hooks,
        origName = camelCase(name),
        isCustomProp = rcustomProp.test(name);

      // Make sure that we're working with the right name. We don't
      // want to modify the value if it is a CSS custom property
      // since they are user-defined.
      if (!isCustomProp) {
        name = finalPropName(origName);
      }

      // Try prefixed name followed by the unprefixed name
      hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

      // If a hook was provided get the computed value from there
      if (hooks && "get" in hooks) {
        val = hooks.get(elem, true, extra);
      }

      // Otherwise, if a way to get the computed value exists, use that
      if (val === undefined) {
        val = curCSS(elem, name, styles);
      }

      // Convert "normal" to computed value
      if (val === "normal" && name in cssNormalTransform) {
        val = cssNormalTransform[name];
      }

      // Make numeric if forced or a qualifier was provided and val looks numeric
      if (extra === "" || extra) {
        num = parseFloat(val);
        return extra === true || isFinite(num) ? num || 0 : val;
      }
      return val;
    }
  });
  jQuery.each(["height", "width"], function (_i, dimension) {
    jQuery.cssHooks[dimension] = {
      get: function (elem, computed, extra) {
        if (computed) {
          // Certain elements can have dimension info if we invisibly show them
          // but it must have a current display style that would benefit
          return rdisplayswap.test(jQuery.css(elem, "display")) && (
          // Support: Safari 8+
          // Table columns in Safari have non-zero offsetWidth & zero
          // getBoundingClientRect().width unless display is changed.
          // Support: IE <=11 only
          // Running getBoundingClientRect on a disconnected node
          // in IE throws an error.
          !elem.getClientRects().length || !elem.getBoundingClientRect().width) ? swap(elem, cssShow, function () {
            return getWidthOrHeight(elem, dimension, extra);
          }) : getWidthOrHeight(elem, dimension, extra);
        }
      },
      set: function (elem, value, extra) {
        var matches,
          styles = getStyles(elem),
          // Only read styles.position if the test has a chance to fail
          // to avoid forcing a reflow.
          scrollboxSizeBuggy = !support.scrollboxSize() && styles.position === "absolute",
          // To avoid forcing a reflow, only fetch boxSizing if we need it (gh-3991)
          boxSizingNeeded = scrollboxSizeBuggy || extra,
          isBorderBox = boxSizingNeeded && jQuery.css(elem, "boxSizing", false, styles) === "border-box",
          subtract = extra ? boxModelAdjustment(elem, dimension, extra, isBorderBox, styles) : 0;

        // Account for unreliable border-box dimensions by comparing offset* to computed and
        // faking a content-box to get border and padding (gh-3699)
        if (isBorderBox && scrollboxSizeBuggy) {
          subtract -= Math.ceil(elem["offset" + dimension[0].toUpperCase() + dimension.slice(1)] - parseFloat(styles[dimension]) - boxModelAdjustment(elem, dimension, "border", false, styles) - 0.5);
        }

        // Convert to pixels if value adjustment is needed
        if (subtract && (matches = rcssNum.exec(value)) && (matches[3] || "px") !== "px") {
          elem.style[dimension] = value;
          value = jQuery.css(elem, dimension);
        }
        return setPositiveNumber(elem, value, subtract);
      }
    };
  });
  jQuery.cssHooks.marginLeft = addGetHookIf(support.reliableMarginLeft, function (elem, computed) {
    if (computed) {
      return (parseFloat(curCSS(elem, "marginLeft")) || elem.getBoundingClientRect().left - swap(elem, {
        marginLeft: 0
      }, function () {
        return elem.getBoundingClientRect().left;
      })) + "px";
    }
  });

  // These hooks are used by animate to expand properties
  jQuery.each({
    margin: "",
    padding: "",
    border: "Width"
  }, function (prefix, suffix) {
    jQuery.cssHooks[prefix + suffix] = {
      expand: function (value) {
        var i = 0,
          expanded = {},
          // Assumes a single number if not a string
          parts = typeof value === "string" ? value.split(" ") : [value];
        for (; i < 4; i++) {
          expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
        }
        return expanded;
      }
    };
    if (prefix !== "margin") {
      jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
    }
  });
  jQuery.fn.extend({
    css: function (name, value) {
      return access(this, function (elem, name, value) {
        var styles,
          len,
          map = {},
          i = 0;
        if (Array.isArray(name)) {
          styles = getStyles(elem);
          len = name.length;
          for (; i < len; i++) {
            map[name[i]] = jQuery.css(elem, name[i], false, styles);
          }
          return map;
        }
        return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
      }, name, value, arguments.length > 1);
    }
  });
  function Tween(elem, options, prop, end, easing) {
    return new Tween.prototype.init(elem, options, prop, end, easing);
  }
  jQuery.Tween = Tween;
  Tween.prototype = {
    constructor: Tween,
    init: function (elem, options, prop, end, easing, unit) {
      this.elem = elem;
      this.prop = prop;
      this.easing = easing || jQuery.easing._default;
      this.options = options;
      this.start = this.now = this.cur();
      this.end = end;
      this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
    },
    cur: function () {
      var hooks = Tween.propHooks[this.prop];
      return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
    },
    run: function (percent) {
      var eased,
        hooks = Tween.propHooks[this.prop];
      if (this.options.duration) {
        this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration);
      } else {
        this.pos = eased = percent;
      }
      this.now = (this.end - this.start) * eased + this.start;
      if (this.options.step) {
        this.options.step.call(this.elem, this.now, this);
      }
      if (hooks && hooks.set) {
        hooks.set(this);
      } else {
        Tween.propHooks._default.set(this);
      }
      return this;
    }
  };
  Tween.prototype.init.prototype = Tween.prototype;
  Tween.propHooks = {
    _default: {
      get: function (tween) {
        var result;

        // Use a property on the element directly when it is not a DOM element,
        // or when there is no matching style property that exists.
        if (tween.elem.nodeType !== 1 || tween.elem[tween.prop] != null && tween.elem.style[tween.prop] == null) {
          return tween.elem[tween.prop];
        }

        // Passing an empty string as a 3rd parameter to .css will automatically
        // attempt a parseFloat and fallback to a string if the parse fails.
        // Simple values such as "10px" are parsed to Float;
        // complex values such as "rotate(1rad)" are returned as-is.
        result = jQuery.css(tween.elem, tween.prop, "");

        // Empty strings, null, undefined and "auto" are converted to 0.
        return !result || result === "auto" ? 0 : result;
      },
      set: function (tween) {
        // Use step hook for back compat.
        // Use cssHook if its there.
        // Use .style if available and use plain properties where available.
        if (jQuery.fx.step[tween.prop]) {
          jQuery.fx.step[tween.prop](tween);
        } else if (tween.elem.nodeType === 1 && (jQuery.cssHooks[tween.prop] || tween.elem.style[finalPropName(tween.prop)] != null)) {
          jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
        } else {
          tween.elem[tween.prop] = tween.now;
        }
      }
    }
  };

  // Support: IE <=9 only
  // Panic based approach to setting things on disconnected nodes
  Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
    set: function (tween) {
      if (tween.elem.nodeType && tween.elem.parentNode) {
        tween.elem[tween.prop] = tween.now;
      }
    }
  };
  jQuery.easing = {
    linear: function (p) {
      return p;
    },
    swing: function (p) {
      return 0.5 - Math.cos(p * Math.PI) / 2;
    },
    _default: "swing"
  };
  jQuery.fx = Tween.prototype.init;

  // Back compat <1.8 extension point
  jQuery.fx.step = {};
  var fxNow,
    inProgress,
    rfxtypes = /^(?:toggle|show|hide)$/,
    rrun = /queueHooks$/;
  function schedule() {
    if (inProgress) {
      if (document.hidden === false && window.requestAnimationFrame) {
        window.requestAnimationFrame(schedule);
      } else {
        window.setTimeout(schedule, jQuery.fx.interval);
      }
      jQuery.fx.tick();
    }
  }

  // Animations created synchronously will run synchronously
  function createFxNow() {
    window.setTimeout(function () {
      fxNow = undefined;
    });
    return fxNow = Date.now();
  }

  // Generate parameters to create a standard animation
  function genFx(type, includeWidth) {
    var which,
      i = 0,
      attrs = {
        height: type
      };

    // If we include width, step value is 1 to do all cssExpand values,
    // otherwise step value is 2 to skip over Left and Right
    includeWidth = includeWidth ? 1 : 0;
    for (; i < 4; i += 2 - includeWidth) {
      which = cssExpand[i];
      attrs["margin" + which] = attrs["padding" + which] = type;
    }
    if (includeWidth) {
      attrs.opacity = attrs.width = type;
    }
    return attrs;
  }
  function createTween(value, prop, animation) {
    var tween,
      collection = (Animation.tweeners[prop] || []).concat(Animation.tweeners["*"]),
      index = 0,
      length = collection.length;
    for (; index < length; index++) {
      if (tween = collection[index].call(animation, prop, value)) {
        // We're done with this property
        return tween;
      }
    }
  }
  function defaultPrefilter(elem, props, opts) {
    var prop,
      value,
      toggle,
      hooks,
      oldfire,
      propTween,
      restoreDisplay,
      display,
      isBox = "width" in props || "height" in props,
      anim = this,
      orig = {},
      style = elem.style,
      hidden = elem.nodeType && isHiddenWithinTree(elem),
      dataShow = dataPriv.get(elem, "fxshow");

    // Queue-skipping animations hijack the fx hooks
    if (!opts.queue) {
      hooks = jQuery._queueHooks(elem, "fx");
      if (hooks.unqueued == null) {
        hooks.unqueued = 0;
        oldfire = hooks.empty.fire;
        hooks.empty.fire = function () {
          if (!hooks.unqueued) {
            oldfire();
          }
        };
      }
      hooks.unqueued++;
      anim.always(function () {
        // Ensure the complete handler is called before this completes
        anim.always(function () {
          hooks.unqueued--;
          if (!jQuery.queue(elem, "fx").length) {
            hooks.empty.fire();
          }
        });
      });
    }

    // Detect show/hide animations
    for (prop in props) {
      value = props[prop];
      if (rfxtypes.test(value)) {
        delete props[prop];
        toggle = toggle || value === "toggle";
        if (value === (hidden ? "hide" : "show")) {
          // Pretend to be hidden if this is a "show" and
          // there is still data from a stopped show/hide
          if (value === "show" && dataShow && dataShow[prop] !== undefined) {
            hidden = true;

            // Ignore all other no-op show/hide data
          } else {
            continue;
          }
        }
        orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
      }
    }

    // Bail out if this is a no-op like .hide().hide()
    propTween = !jQuery.isEmptyObject(props);
    if (!propTween && jQuery.isEmptyObject(orig)) {
      return;
    }

    // Restrict "overflow" and "display" styles during box animations
    if (isBox && elem.nodeType === 1) {
      // Support: IE <=9 - 11, Edge 12 - 15
      // Record all 3 overflow attributes because IE does not infer the shorthand
      // from identically-valued overflowX and overflowY and Edge just mirrors
      // the overflowX value there.
      opts.overflow = [style.overflow, style.overflowX, style.overflowY];

      // Identify a display type, preferring old show/hide data over the CSS cascade
      restoreDisplay = dataShow && dataShow.display;
      if (restoreDisplay == null) {
        restoreDisplay = dataPriv.get(elem, "display");
      }
      display = jQuery.css(elem, "display");
      if (display === "none") {
        if (restoreDisplay) {
          display = restoreDisplay;
        } else {
          // Get nonempty value(s) by temporarily forcing visibility
          showHide([elem], true);
          restoreDisplay = elem.style.display || restoreDisplay;
          display = jQuery.css(elem, "display");
          showHide([elem]);
        }
      }

      // Animate inline elements as inline-block
      if (display === "inline" || display === "inline-block" && restoreDisplay != null) {
        if (jQuery.css(elem, "float") === "none") {
          // Restore the original display value at the end of pure show/hide animations
          if (!propTween) {
            anim.done(function () {
              style.display = restoreDisplay;
            });
            if (restoreDisplay == null) {
              display = style.display;
              restoreDisplay = display === "none" ? "" : display;
            }
          }
          style.display = "inline-block";
        }
      }
    }
    if (opts.overflow) {
      style.overflow = "hidden";
      anim.always(function () {
        style.overflow = opts.overflow[0];
        style.overflowX = opts.overflow[1];
        style.overflowY = opts.overflow[2];
      });
    }

    // Implement show/hide animations
    propTween = false;
    for (prop in orig) {
      // General show/hide setup for this element animation
      if (!propTween) {
        if (dataShow) {
          if ("hidden" in dataShow) {
            hidden = dataShow.hidden;
          }
        } else {
          dataShow = dataPriv.access(elem, "fxshow", {
            display: restoreDisplay
          });
        }

        // Store hidden/visible for toggle so `.stop().toggle()` "reverses"
        if (toggle) {
          dataShow.hidden = !hidden;
        }

        // Show elements before animating them
        if (hidden) {
          showHide([elem], true);
        }

        /* eslint-disable no-loop-func */

        anim.done(function () {
          /* eslint-enable no-loop-func */

          // The final step of a "hide" animation is actually hiding the element
          if (!hidden) {
            showHide([elem]);
          }
          dataPriv.remove(elem, "fxshow");
          for (prop in orig) {
            jQuery.style(elem, prop, orig[prop]);
          }
        });
      }

      // Per-property setup
      propTween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
      if (!(prop in dataShow)) {
        dataShow[prop] = propTween.start;
        if (hidden) {
          propTween.end = propTween.start;
          propTween.start = 0;
        }
      }
    }
  }
  function propFilter(props, specialEasing) {
    var index, name, easing, value, hooks;

    // camelCase, specialEasing and expand cssHook pass
    for (index in props) {
      name = camelCase(index);
      easing = specialEasing[name];
      value = props[index];
      if (Array.isArray(value)) {
        easing = value[1];
        value = props[index] = value[0];
      }
      if (index !== name) {
        props[name] = value;
        delete props[index];
      }
      hooks = jQuery.cssHooks[name];
      if (hooks && "expand" in hooks) {
        value = hooks.expand(value);
        delete props[name];

        // Not quite $.extend, this won't overwrite existing keys.
        // Reusing 'index' because we have the correct "name"
        for (index in value) {
          if (!(index in props)) {
            props[index] = value[index];
            specialEasing[index] = easing;
          }
        }
      } else {
        specialEasing[name] = easing;
      }
    }
  }
  function Animation(elem, properties, options) {
    var result,
      stopped,
      index = 0,
      length = Animation.prefilters.length,
      deferred = jQuery.Deferred().always(function () {
        // Don't match elem in the :animated selector
        delete tick.elem;
      }),
      tick = function () {
        if (stopped) {
          return false;
        }
        var currentTime = fxNow || createFxNow(),
          remaining = Math.max(0, animation.startTime + animation.duration - currentTime),
          // Support: Android 2.3 only
          // Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (trac-12497)
          temp = remaining / animation.duration || 0,
          percent = 1 - temp,
          index = 0,
          length = animation.tweens.length;
        for (; index < length; index++) {
          animation.tweens[index].run(percent);
        }
        deferred.notifyWith(elem, [animation, percent, remaining]);

        // If there's more to do, yield
        if (percent < 1 && length) {
          return remaining;
        }

        // If this was an empty animation, synthesize a final progress notification
        if (!length) {
          deferred.notifyWith(elem, [animation, 1, 0]);
        }

        // Resolve the animation and report its conclusion
        deferred.resolveWith(elem, [animation]);
        return false;
      },
      animation = deferred.promise({
        elem: elem,
        props: jQuery.extend({}, properties),
        opts: jQuery.extend(true, {
          specialEasing: {},
          easing: jQuery.easing._default
        }, options),
        originalProperties: properties,
        originalOptions: options,
        startTime: fxNow || createFxNow(),
        duration: options.duration,
        tweens: [],
        createTween: function (prop, end) {
          var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
          animation.tweens.push(tween);
          return tween;
        },
        stop: function (gotoEnd) {
          var index = 0,
            // If we are going to the end, we want to run all the tweens
            // otherwise we skip this part
            length = gotoEnd ? animation.tweens.length : 0;
          if (stopped) {
            return this;
          }
          stopped = true;
          for (; index < length; index++) {
            animation.tweens[index].run(1);
          }

          // Resolve when we played the last frame; otherwise, reject
          if (gotoEnd) {
            deferred.notifyWith(elem, [animation, 1, 0]);
            deferred.resolveWith(elem, [animation, gotoEnd]);
          } else {
            deferred.rejectWith(elem, [animation, gotoEnd]);
          }
          return this;
        }
      }),
      props = animation.props;
    propFilter(props, animation.opts.specialEasing);
    for (; index < length; index++) {
      result = Animation.prefilters[index].call(animation, elem, props, animation.opts);
      if (result) {
        if (isFunction(result.stop)) {
          jQuery._queueHooks(animation.elem, animation.opts.queue).stop = result.stop.bind(result);
        }
        return result;
      }
    }
    jQuery.map(props, createTween, animation);
    if (isFunction(animation.opts.start)) {
      animation.opts.start.call(elem, animation);
    }

    // Attach callbacks from options
    animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
    jQuery.fx.timer(jQuery.extend(tick, {
      elem: elem,
      anim: animation,
      queue: animation.opts.queue
    }));
    return animation;
  }
  jQuery.Animation = jQuery.extend(Animation, {
    tweeners: {
      "*": [function (prop, value) {
        var tween = this.createTween(prop, value);
        adjustCSS(tween.elem, prop, rcssNum.exec(value), tween);
        return tween;
      }]
    },
    tweener: function (props, callback) {
      if (isFunction(props)) {
        callback = props;
        props = ["*"];
      } else {
        props = props.match(rnothtmlwhite);
      }
      var prop,
        index = 0,
        length = props.length;
      for (; index < length; index++) {
        prop = props[index];
        Animation.tweeners[prop] = Animation.tweeners[prop] || [];
        Animation.tweeners[prop].unshift(callback);
      }
    },
    prefilters: [defaultPrefilter],
    prefilter: function (callback, prepend) {
      if (prepend) {
        Animation.prefilters.unshift(callback);
      } else {
        Animation.prefilters.push(callback);
      }
    }
  });
  jQuery.speed = function (speed, easing, fn) {
    var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
      complete: fn || !fn && easing || isFunction(speed) && speed,
      duration: speed,
      easing: fn && easing || easing && !isFunction(easing) && easing
    };

    // Go to the end state if fx are off
    if (jQuery.fx.off) {
      opt.duration = 0;
    } else {
      if (typeof opt.duration !== "number") {
        if (opt.duration in jQuery.fx.speeds) {
          opt.duration = jQuery.fx.speeds[opt.duration];
        } else {
          opt.duration = jQuery.fx.speeds._default;
        }
      }
    }

    // Normalize opt.queue - true/undefined/null -> "fx"
    if (opt.queue == null || opt.queue === true) {
      opt.queue = "fx";
    }

    // Queueing
    opt.old = opt.complete;
    opt.complete = function () {
      if (isFunction(opt.old)) {
        opt.old.call(this);
      }
      if (opt.queue) {
        jQuery.dequeue(this, opt.queue);
      }
    };
    return opt;
  };
  jQuery.fn.extend({
    fadeTo: function (speed, to, easing, callback) {
      // Show any hidden elements after setting opacity to 0
      return this.filter(isHiddenWithinTree).css("opacity", 0).show()

      // Animate to the value specified
      .end().animate({
        opacity: to
      }, speed, easing, callback);
    },
    animate: function (prop, speed, easing, callback) {
      var empty = jQuery.isEmptyObject(prop),
        optall = jQuery.speed(speed, easing, callback),
        doAnimation = function () {
          // Operate on a copy of prop so per-property easing won't be lost
          var anim = Animation(this, jQuery.extend({}, prop), optall);

          // Empty animations, or finishing resolves immediately
          if (empty || dataPriv.get(this, "finish")) {
            anim.stop(true);
          }
        };
      doAnimation.finish = doAnimation;
      return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
    },
    stop: function (type, clearQueue, gotoEnd) {
      var stopQueue = function (hooks) {
        var stop = hooks.stop;
        delete hooks.stop;
        stop(gotoEnd);
      };
      if (typeof type !== "string") {
        gotoEnd = clearQueue;
        clearQueue = type;
        type = undefined;
      }
      if (clearQueue) {
        this.queue(type || "fx", []);
      }
      return this.each(function () {
        var dequeue = true,
          index = type != null && type + "queueHooks",
          timers = jQuery.timers,
          data = dataPriv.get(this);
        if (index) {
          if (data[index] && data[index].stop) {
            stopQueue(data[index]);
          }
        } else {
          for (index in data) {
            if (data[index] && data[index].stop && rrun.test(index)) {
              stopQueue(data[index]);
            }
          }
        }
        for (index = timers.length; index--;) {
          if (timers[index].elem === this && (type == null || timers[index].queue === type)) {
            timers[index].anim.stop(gotoEnd);
            dequeue = false;
            timers.splice(index, 1);
          }
        }

        // Start the next in the queue if the last step wasn't forced.
        // Timers currently will call their complete callbacks, which
        // will dequeue but only if they were gotoEnd.
        if (dequeue || !gotoEnd) {
          jQuery.dequeue(this, type);
        }
      });
    },
    finish: function (type) {
      if (type !== false) {
        type = type || "fx";
      }
      return this.each(function () {
        var index,
          data = dataPriv.get(this),
          queue = data[type + "queue"],
          hooks = data[type + "queueHooks"],
          timers = jQuery.timers,
          length = queue ? queue.length : 0;

        // Enable finishing flag on private data
        data.finish = true;

        // Empty the queue first
        jQuery.queue(this, type, []);
        if (hooks && hooks.stop) {
          hooks.stop.call(this, true);
        }

        // Look for any active animations, and finish them
        for (index = timers.length; index--;) {
          if (timers[index].elem === this && timers[index].queue === type) {
            timers[index].anim.stop(true);
            timers.splice(index, 1);
          }
        }

        // Look for any animations in the old queue and finish them
        for (index = 0; index < length; index++) {
          if (queue[index] && queue[index].finish) {
            queue[index].finish.call(this);
          }
        }

        // Turn off finishing flag
        delete data.finish;
      });
    }
  });
  jQuery.each(["toggle", "show", "hide"], function (_i, name) {
    var cssFn = jQuery.fn[name];
    jQuery.fn[name] = function (speed, easing, callback) {
      return speed == null || typeof speed === "boolean" ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback);
    };
  });

  // Generate shortcuts for custom animations
  jQuery.each({
    slideDown: genFx("show"),
    slideUp: genFx("hide"),
    slideToggle: genFx("toggle"),
    fadeIn: {
      opacity: "show"
    },
    fadeOut: {
      opacity: "hide"
    },
    fadeToggle: {
      opacity: "toggle"
    }
  }, function (name, props) {
    jQuery.fn[name] = function (speed, easing, callback) {
      return this.animate(props, speed, easing, callback);
    };
  });
  jQuery.timers = [];
  jQuery.fx.tick = function () {
    var timer,
      i = 0,
      timers = jQuery.timers;
    fxNow = Date.now();
    for (; i < timers.length; i++) {
      timer = timers[i];

      // Run the timer and safely remove it when done (allowing for external removal)
      if (!timer() && timers[i] === timer) {
        timers.splice(i--, 1);
      }
    }
    if (!timers.length) {
      jQuery.fx.stop();
    }
    fxNow = undefined;
  };
  jQuery.fx.timer = function (timer) {
    jQuery.timers.push(timer);
    jQuery.fx.start();
  };
  jQuery.fx.interval = 13;
  jQuery.fx.start = function () {
    if (inProgress) {
      return;
    }
    inProgress = true;
    schedule();
  };
  jQuery.fx.stop = function () {
    inProgress = null;
  };
  jQuery.fx.speeds = {
    slow: 600,
    fast: 200,
    // Default speed
    _default: 400
  };

  // Based off of the plugin by Clint Helfers, with permission.
  jQuery.fn.delay = function (time, type) {
    time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
    type = type || "fx";
    return this.queue(type, function (next, hooks) {
      var timeout = window.setTimeout(next, time);
      hooks.stop = function () {
        window.clearTimeout(timeout);
      };
    });
  };
  (function () {
    var input = document.createElement("input"),
      select = document.createElement("select"),
      opt = select.appendChild(document.createElement("option"));
    input.type = "checkbox";

    // Support: Android <=4.3 only
    // Default value for a checkbox should be "on"
    support.checkOn = input.value !== "";

    // Support: IE <=11 only
    // Must access selectedIndex to make default options select
    support.optSelected = opt.selected;

    // Support: IE <=11 only
    // An input loses its value after becoming a radio
    input = document.createElement("input");
    input.value = "t";
    input.type = "radio";
    support.radioValue = input.value === "t";
  })();
  var boolHook,
    attrHandle = jQuery.expr.attrHandle;
  jQuery.fn.extend({
    attr: function (name, value) {
      return access(this, jQuery.attr, name, value, arguments.length > 1);
    },
    removeAttr: function (name) {
      return this.each(function () {
        jQuery.removeAttr(this, name);
      });
    }
  });
  jQuery.extend({
    attr: function (elem, name, value) {
      var ret,
        hooks,
        nType = elem.nodeType;

      // Don't get/set attributes on text, comment and attribute nodes
      if (nType === 3 || nType === 8 || nType === 2) {
        return;
      }

      // Fallback to prop when attributes are not supported
      if (typeof elem.getAttribute === "undefined") {
        return jQuery.prop(elem, name, value);
      }

      // Attribute hooks are determined by the lowercase version
      // Grab necessary hook if one is defined
      if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
        hooks = jQuery.attrHooks[name.toLowerCase()] || (jQuery.expr.match.bool.test(name) ? boolHook : undefined);
      }
      if (value !== undefined) {
        if (value === null) {
          jQuery.removeAttr(elem, name);
          return;
        }
        if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
          return ret;
        }
        elem.setAttribute(name, value + "");
        return value;
      }
      if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
        return ret;
      }
      ret = jQuery.find.attr(elem, name);

      // Non-existent attributes return null, we normalize to undefined
      return ret == null ? undefined : ret;
    },
    attrHooks: {
      type: {
        set: function (elem, value) {
          if (!support.radioValue && value === "radio" && nodeName(elem, "input")) {
            var val = elem.value;
            elem.setAttribute("type", value);
            if (val) {
              elem.value = val;
            }
            return value;
          }
        }
      }
    },
    removeAttr: function (elem, value) {
      var name,
        i = 0,
        // Attribute names can contain non-HTML whitespace characters
        // https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
        attrNames = value && value.match(rnothtmlwhite);
      if (attrNames && elem.nodeType === 1) {
        while (name = attrNames[i++]) {
          elem.removeAttribute(name);
        }
      }
    }
  });

  // Hooks for boolean attributes
  boolHook = {
    set: function (elem, value, name) {
      if (value === false) {
        // Remove boolean attributes when set to false
        jQuery.removeAttr(elem, name);
      } else {
        elem.setAttribute(name, name);
      }
      return name;
    }
  };
  jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function (_i, name) {
    var getter = attrHandle[name] || jQuery.find.attr;
    attrHandle[name] = function (elem, name, isXML) {
      var ret,
        handle,
        lowercaseName = name.toLowerCase();
      if (!isXML) {
        // Avoid an infinite loop by temporarily removing this function from the getter
        handle = attrHandle[lowercaseName];
        attrHandle[lowercaseName] = ret;
        ret = getter(elem, name, isXML) != null ? lowercaseName : null;
        attrHandle[lowercaseName] = handle;
      }
      return ret;
    };
  });
  var rfocusable = /^(?:input|select|textarea|button)$/i,
    rclickable = /^(?:a|area)$/i;
  jQuery.fn.extend({
    prop: function (name, value) {
      return access(this, jQuery.prop, name, value, arguments.length > 1);
    },
    removeProp: function (name) {
      return this.each(function () {
        delete this[jQuery.propFix[name] || name];
      });
    }
  });
  jQuery.extend({
    prop: function (elem, name, value) {
      var ret,
        hooks,
        nType = elem.nodeType;

      // Don't get/set properties on text, comment and attribute nodes
      if (nType === 3 || nType === 8 || nType === 2) {
        return;
      }
      if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
        // Fix name and attach hooks
        name = jQuery.propFix[name] || name;
        hooks = jQuery.propHooks[name];
      }
      if (value !== undefined) {
        if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
          return ret;
        }
        return elem[name] = value;
      }
      if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
        return ret;
      }
      return elem[name];
    },
    propHooks: {
      tabIndex: {
        get: function (elem) {
          // Support: IE <=9 - 11 only
          // elem.tabIndex doesn't always return the
          // correct value when it hasn't been explicitly set
          // Use proper attribute retrieval (trac-12072)
          var tabindex = jQuery.find.attr(elem, "tabindex");
          if (tabindex) {
            return parseInt(tabindex, 10);
          }
          if (rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href) {
            return 0;
          }
          return -1;
        }
      }
    },
    propFix: {
      "for": "htmlFor",
      "class": "className"
    }
  });

  // Support: IE <=11 only
  // Accessing the selectedIndex property
  // forces the browser to respect setting selected
  // on the option
  // The getter ensures a default option is selected
  // when in an optgroup
  // eslint rule "no-unused-expressions" is disabled for this code
  // since it considers such accessions noop
  if (!support.optSelected) {
    jQuery.propHooks.selected = {
      get: function (elem) {
        /* eslint no-unused-expressions: "off" */

        var parent = elem.parentNode;
        if (parent && parent.parentNode) {
          parent.parentNode.selectedIndex;
        }
        return null;
      },
      set: function (elem) {
        /* eslint no-unused-expressions: "off" */

        var parent = elem.parentNode;
        if (parent) {
          parent.selectedIndex;
          if (parent.parentNode) {
            parent.parentNode.selectedIndex;
          }
        }
      }
    };
  }
  jQuery.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
    jQuery.propFix[this.toLowerCase()] = this;
  });

  // Strip and collapse whitespace according to HTML spec
  // https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
  function stripAndCollapse(value) {
    var tokens = value.match(rnothtmlwhite) || [];
    return tokens.join(" ");
  }
  function getClass(elem) {
    return elem.getAttribute && elem.getAttribute("class") || "";
  }
  function classesToArray(value) {
    if (Array.isArray(value)) {
      return value;
    }
    if (typeof value === "string") {
      return value.match(rnothtmlwhite) || [];
    }
    return [];
  }
  jQuery.fn.extend({
    addClass: function (value) {
      var classNames, cur, curValue, className, i, finalValue;
      if (isFunction(value)) {
        return this.each(function (j) {
          jQuery(this).addClass(value.call(this, j, getClass(this)));
        });
      }
      classNames = classesToArray(value);
      if (classNames.length) {
        return this.each(function () {
          curValue = getClass(this);
          cur = this.nodeType === 1 && " " + stripAndCollapse(curValue) + " ";
          if (cur) {
            for (i = 0; i < classNames.length; i++) {
              className = classNames[i];
              if (cur.indexOf(" " + className + " ") < 0) {
                cur += className + " ";
              }
            }

            // Only assign if different to avoid unneeded rendering.
            finalValue = stripAndCollapse(cur);
            if (curValue !== finalValue) {
              this.setAttribute("class", finalValue);
            }
          }
        });
      }
      return this;
    },
    removeClass: function (value) {
      var classNames, cur, curValue, className, i, finalValue;
      if (isFunction(value)) {
        return this.each(function (j) {
          jQuery(this).removeClass(value.call(this, j, getClass(this)));
        });
      }
      if (!arguments.length) {
        return this.attr("class", "");
      }
      classNames = classesToArray(value);
      if (classNames.length) {
        return this.each(function () {
          curValue = getClass(this);

          // This expression is here for better compressibility (see addClass)
          cur = this.nodeType === 1 && " " + stripAndCollapse(curValue) + " ";
          if (cur) {
            for (i = 0; i < classNames.length; i++) {
              className = classNames[i];

              // Remove *all* instances
              while (cur.indexOf(" " + className + " ") > -1) {
                cur = cur.replace(" " + className + " ", " ");
              }
            }

            // Only assign if different to avoid unneeded rendering.
            finalValue = stripAndCollapse(cur);
            if (curValue !== finalValue) {
              this.setAttribute("class", finalValue);
            }
          }
        });
      }
      return this;
    },
    toggleClass: function (value, stateVal) {
      var classNames,
        className,
        i,
        self,
        type = typeof value,
        isValidValue = type === "string" || Array.isArray(value);
      if (isFunction(value)) {
        return this.each(function (i) {
          jQuery(this).toggleClass(value.call(this, i, getClass(this), stateVal), stateVal);
        });
      }
      if (typeof stateVal === "boolean" && isValidValue) {
        return stateVal ? this.addClass(value) : this.removeClass(value);
      }
      classNames = classesToArray(value);
      return this.each(function () {
        if (isValidValue) {
          // Toggle individual class names
          self = jQuery(this);
          for (i = 0; i < classNames.length; i++) {
            className = classNames[i];

            // Check each className given, space separated list
            if (self.hasClass(className)) {
              self.removeClass(className);
            } else {
              self.addClass(className);
            }
          }

          // Toggle whole class name
        } else if (value === undefined || type === "boolean") {
          className = getClass(this);
          if (className) {
            // Store className if set
            dataPriv.set(this, "__className__", className);
          }

          // If the element has a class name or if we're passed `false`,
          // then remove the whole classname (if there was one, the above saved it).
          // Otherwise bring back whatever was previously saved (if anything),
          // falling back to the empty string if nothing was stored.
          if (this.setAttribute) {
            this.setAttribute("class", className || value === false ? "" : dataPriv.get(this, "__className__") || "");
          }
        }
      });
    },
    hasClass: function (selector) {
      var className,
        elem,
        i = 0;
      className = " " + selector + " ";
      while (elem = this[i++]) {
        if (elem.nodeType === 1 && (" " + stripAndCollapse(getClass(elem)) + " ").indexOf(className) > -1) {
          return true;
        }
      }
      return false;
    }
  });
  var rreturn = /\r/g;
  jQuery.fn.extend({
    val: function (value) {
      var hooks,
        ret,
        valueIsFunction,
        elem = this[0];
      if (!arguments.length) {
        if (elem) {
          hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];
          if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== undefined) {
            return ret;
          }
          ret = elem.value;

          // Handle most common string cases
          if (typeof ret === "string") {
            return ret.replace(rreturn, "");
          }

          // Handle cases where value is null/undef or number
          return ret == null ? "" : ret;
        }
        return;
      }
      valueIsFunction = isFunction(value);
      return this.each(function (i) {
        var val;
        if (this.nodeType !== 1) {
          return;
        }
        if (valueIsFunction) {
          val = value.call(this, i, jQuery(this).val());
        } else {
          val = value;
        }

        // Treat null/undefined as ""; convert numbers to string
        if (val == null) {
          val = "";
        } else if (typeof val === "number") {
          val += "";
        } else if (Array.isArray(val)) {
          val = jQuery.map(val, function (value) {
            return value == null ? "" : value + "";
          });
        }
        hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];

        // If set returns undefined, fall back to normal setting
        if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
          this.value = val;
        }
      });
    }
  });
  jQuery.extend({
    valHooks: {
      option: {
        get: function (elem) {
          var val = jQuery.find.attr(elem, "value");
          return val != null ? val :
          // Support: IE <=10 - 11 only
          // option.text throws exceptions (trac-14686, trac-14858)
          // Strip and collapse whitespace
          // https://html.spec.whatwg.org/#strip-and-collapse-whitespace
          stripAndCollapse(jQuery.text(elem));
        }
      },
      select: {
        get: function (elem) {
          var value,
            option,
            i,
            options = elem.options,
            index = elem.selectedIndex,
            one = elem.type === "select-one",
            values = one ? null : [],
            max = one ? index + 1 : options.length;
          if (index < 0) {
            i = max;
          } else {
            i = one ? index : 0;
          }

          // Loop through all the selected options
          for (; i < max; i++) {
            option = options[i];

            // Support: IE <=9 only
            // IE8-9 doesn't update selected after form reset (trac-2551)
            if ((option.selected || i === index) &&
            // Don't return options that are disabled or in a disabled optgroup
            !option.disabled && (!option.parentNode.disabled || !nodeName(option.parentNode, "optgroup"))) {
              // Get the specific value for the option
              value = jQuery(option).val();

              // We don't need an array for one selects
              if (one) {
                return value;
              }

              // Multi-Selects return an array
              values.push(value);
            }
          }
          return values;
        },
        set: function (elem, value) {
          var optionSet,
            option,
            options = elem.options,
            values = jQuery.makeArray(value),
            i = options.length;
          while (i--) {
            option = options[i];

            /* eslint-disable no-cond-assign */

            if (option.selected = jQuery.inArray(jQuery.valHooks.option.get(option), values) > -1) {
              optionSet = true;
            }

            /* eslint-enable no-cond-assign */
          }

          // Force browsers to behave consistently when non-matching value is set
          if (!optionSet) {
            elem.selectedIndex = -1;
          }
          return values;
        }
      }
    }
  });

  // Radios and checkboxes getter/setter
  jQuery.each(["radio", "checkbox"], function () {
    jQuery.valHooks[this] = {
      set: function (elem, value) {
        if (Array.isArray(value)) {
          return elem.checked = jQuery.inArray(jQuery(elem).val(), value) > -1;
        }
      }
    };
    if (!support.checkOn) {
      jQuery.valHooks[this].get = function (elem) {
        return elem.getAttribute("value") === null ? "on" : elem.value;
      };
    }
  });

  // Return jQuery for attributes-only inclusion
  var location = window.location;
  var nonce = {
    guid: Date.now()
  };
  var rquery = /\?/;

  // Cross-browser xml parsing
  jQuery.parseXML = function (data) {
    var xml, parserErrorElem;
    if (!data || typeof data !== "string") {
      return null;
    }

    // Support: IE 9 - 11 only
    // IE throws on parseFromString with invalid input.
    try {
      xml = new window.DOMParser().parseFromString(data, "text/xml");
    } catch (e) {}
    parserErrorElem = xml && xml.getElementsByTagName("parsererror")[0];
    if (!xml || parserErrorElem) {
      jQuery.error("Invalid XML: " + (parserErrorElem ? jQuery.map(parserErrorElem.childNodes, function (el) {
        return el.textContent;
      }).join("\n") : data));
    }
    return xml;
  };
  var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
    stopPropagationCallback = function (e) {
      e.stopPropagation();
    };
  jQuery.extend(jQuery.event, {
    trigger: function (event, data, elem, onlyHandlers) {
      var i,
        cur,
        tmp,
        bubbleType,
        ontype,
        handle,
        special,
        lastElement,
        eventPath = [elem || document],
        type = hasOwn.call(event, "type") ? event.type : event,
        namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
      cur = lastElement = tmp = elem = elem || document;

      // Don't do events on text and comment nodes
      if (elem.nodeType === 3 || elem.nodeType === 8) {
        return;
      }

      // focus/blur morphs to focusin/out; ensure we're not firing them right now
      if (rfocusMorph.test(type + jQuery.event.triggered)) {
        return;
      }
      if (type.indexOf(".") > -1) {
        // Namespaced trigger; create a regexp to match event type in handle()
        namespaces = type.split(".");
        type = namespaces.shift();
        namespaces.sort();
      }
      ontype = type.indexOf(":") < 0 && "on" + type;

      // Caller can pass in a jQuery.Event object, Object, or just an event type string
      event = event[jQuery.expando] ? event : new jQuery.Event(type, typeof event === "object" && event);

      // Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
      event.isTrigger = onlyHandlers ? 2 : 3;
      event.namespace = namespaces.join(".");
      event.rnamespace = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;

      // Clean up the event in case it is being reused
      event.result = undefined;
      if (!event.target) {
        event.target = elem;
      }

      // Clone any incoming data and prepend the event, creating the handler arg list
      data = data == null ? [event] : jQuery.makeArray(data, [event]);

      // Allow special events to draw outside the lines
      special = jQuery.event.special[type] || {};
      if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
        return;
      }

      // Determine event propagation path in advance, per W3C events spec (trac-9951)
      // Bubble up to document, then to window; watch for a global ownerDocument var (trac-9724)
      if (!onlyHandlers && !special.noBubble && !isWindow(elem)) {
        bubbleType = special.delegateType || type;
        if (!rfocusMorph.test(bubbleType + type)) {
          cur = cur.parentNode;
        }
        for (; cur; cur = cur.parentNode) {
          eventPath.push(cur);
          tmp = cur;
        }

        // Only add window if we got to document (e.g., not plain obj or detached DOM)
        if (tmp === (elem.ownerDocument || document)) {
          eventPath.push(tmp.defaultView || tmp.parentWindow || window);
        }
      }

      // Fire handlers on the event path
      i = 0;
      while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {
        lastElement = cur;
        event.type = i > 1 ? bubbleType : special.bindType || type;

        // jQuery handler
        handle = (dataPriv.get(cur, "events") || Object.create(null))[event.type] && dataPriv.get(cur, "handle");
        if (handle) {
          handle.apply(cur, data);
        }

        // Native handler
        handle = ontype && cur[ontype];
        if (handle && handle.apply && acceptData(cur)) {
          event.result = handle.apply(cur, data);
          if (event.result === false) {
            event.preventDefault();
          }
        }
      }
      event.type = type;

      // If nobody prevented the default action, do it now
      if (!onlyHandlers && !event.isDefaultPrevented()) {
        if ((!special._default || special._default.apply(eventPath.pop(), data) === false) && acceptData(elem)) {
          // Call a native DOM method on the target with the same name as the event.
          // Don't do default actions on window, that's where global variables be (trac-6170)
          if (ontype && isFunction(elem[type]) && !isWindow(elem)) {
            // Don't re-trigger an onFOO event when we call its FOO() method
            tmp = elem[ontype];
            if (tmp) {
              elem[ontype] = null;
            }

            // Prevent re-triggering of the same event, since we already bubbled it above
            jQuery.event.triggered = type;
            if (event.isPropagationStopped()) {
              lastElement.addEventListener(type, stopPropagationCallback);
            }
            elem[type]();
            if (event.isPropagationStopped()) {
              lastElement.removeEventListener(type, stopPropagationCallback);
            }
            jQuery.event.triggered = undefined;
            if (tmp) {
              elem[ontype] = tmp;
            }
          }
        }
      }
      return event.result;
    },
    // Piggyback on a donor event to simulate a different one
    // Used only for `focus(in | out)` events
    simulate: function (type, elem, event) {
      var e = jQuery.extend(new jQuery.Event(), event, {
        type: type,
        isSimulated: true
      });
      jQuery.event.trigger(e, null, elem);
    }
  });
  jQuery.fn.extend({
    trigger: function (type, data) {
      return this.each(function () {
        jQuery.event.trigger(type, data, this);
      });
    },
    triggerHandler: function (type, data) {
      var elem = this[0];
      if (elem) {
        return jQuery.event.trigger(type, data, elem, true);
      }
    }
  });
  var rbracket = /\[\]$/,
    rCRLF = /\r?\n/g,
    rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
    rsubmittable = /^(?:input|select|textarea|keygen)/i;
  function buildParams(prefix, obj, traditional, add) {
    var name;
    if (Array.isArray(obj)) {
      // Serialize array item.
      jQuery.each(obj, function (i, v) {
        if (traditional || rbracket.test(prefix)) {
          // Treat each array item as a scalar.
          add(prefix, v);
        } else {
          // Item is non-scalar (array or object), encode its numeric index.
          buildParams(prefix + "[" + (typeof v === "object" && v != null ? i : "") + "]", v, traditional, add);
        }
      });
    } else if (!traditional && toType(obj) === "object") {
      // Serialize object item.
      for (name in obj) {
        buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
      }
    } else {
      // Serialize scalar item.
      add(prefix, obj);
    }
  }

  // Serialize an array of form elements or a set of
  // key/values into a query string
  jQuery.param = function (a, traditional) {
    var prefix,
      s = [],
      add = function (key, valueOrFunction) {
        // If value is a function, invoke it and use its return value
        var value = isFunction(valueOrFunction) ? valueOrFunction() : valueOrFunction;
        s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value == null ? "" : value);
      };
    if (a == null) {
      return "";
    }

    // If an array was passed in, assume that it is an array of form elements.
    if (Array.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) {
      // Serialize the form elements
      jQuery.each(a, function () {
        add(this.name, this.value);
      });
    } else {
      // If traditional, encode the "old" way (the way 1.3.2 or older
      // did it), otherwise encode params recursively.
      for (prefix in a) {
        buildParams(prefix, a[prefix], traditional, add);
      }
    }

    // Return the resulting serialization
    return s.join("&");
  };
  jQuery.fn.extend({
    serialize: function () {
      return jQuery.param(this.serializeArray());
    },
    serializeArray: function () {
      return this.map(function () {
        // Can add propHook for "elements" to filter or add form elements
        var elements = jQuery.prop(this, "elements");
        return elements ? jQuery.makeArray(elements) : this;
      }).filter(function () {
        var type = this.type;

        // Use .is( ":disabled" ) so that fieldset[disabled] works
        return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type));
      }).map(function (_i, elem) {
        var val = jQuery(this).val();
        if (val == null) {
          return null;
        }
        if (Array.isArray(val)) {
          return jQuery.map(val, function (val) {
            return {
              name: elem.name,
              value: val.replace(rCRLF, "\r\n")
            };
          });
        }
        return {
          name: elem.name,
          value: val.replace(rCRLF, "\r\n")
        };
      }).get();
    }
  });
  var r20 = /%20/g,
    rhash = /#.*$/,
    rantiCache = /([?&])_=[^&]*/,
    rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
    // trac-7653, trac-8125, trac-8152: local protocol detection
    rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
    rnoContent = /^(?:GET|HEAD)$/,
    rprotocol = /^\/\//,
    /* Prefilters
     * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
     * 2) These are called:
     *    - BEFORE asking for a transport
     *    - AFTER param serialization (s.data is a string if s.processData is true)
     * 3) key is the dataType
     * 4) the catchall symbol "*" can be used
     * 5) execution will start with transport dataType and THEN continue down to "*" if needed
     */
    prefilters = {},
    /* Transports bindings
     * 1) key is the dataType
     * 2) the catchall symbol "*" can be used
     * 3) selection will start with transport dataType and THEN go to "*" if needed
     */
    transports = {},
    // Avoid comment-prolog char sequence (trac-10098); must appease lint and evade compression
    allTypes = "*/".concat("*"),
    // Anchor tag for parsing the document origin
    originAnchor = document.createElement("a");
  originAnchor.href = location.href;

  // Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
  function addToPrefiltersOrTransports(structure) {
    // dataTypeExpression is optional and defaults to "*"
    return function (dataTypeExpression, func) {
      if (typeof dataTypeExpression !== "string") {
        func = dataTypeExpression;
        dataTypeExpression = "*";
      }
      var dataType,
        i = 0,
        dataTypes = dataTypeExpression.toLowerCase().match(rnothtmlwhite) || [];
      if (isFunction(func)) {
        // For each dataType in the dataTypeExpression
        while (dataType = dataTypes[i++]) {
          // Prepend if requested
          if (dataType[0] === "+") {
            dataType = dataType.slice(1) || "*";
            (structure[dataType] = structure[dataType] || []).unshift(func);

            // Otherwise append
          } else {
            (structure[dataType] = structure[dataType] || []).push(func);
          }
        }
      }
    };
  }

  // Base inspection function for prefilters and transports
  function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
    var inspected = {},
      seekingTransport = structure === transports;
    function inspect(dataType) {
      var selected;
      inspected[dataType] = true;
      jQuery.each(structure[dataType] || [], function (_, prefilterOrFactory) {
        var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
        if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {
          options.dataTypes.unshift(dataTypeOrTransport);
          inspect(dataTypeOrTransport);
          return false;
        } else if (seekingTransport) {
          return !(selected = dataTypeOrTransport);
        }
      });
      return selected;
    }
    return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
  }

  // A special extend for ajax options
  // that takes "flat" options (not to be deep extended)
  // Fixes trac-9887
  function ajaxExtend(target, src) {
    var key,
      deep,
      flatOptions = jQuery.ajaxSettings.flatOptions || {};
    for (key in src) {
      if (src[key] !== undefined) {
        (flatOptions[key] ? target : deep || (deep = {}))[key] = src[key];
      }
    }
    if (deep) {
      jQuery.extend(true, target, deep);
    }
    return target;
  }

  /* Handles responses to an ajax request:
   * - finds the right dataType (mediates between content-type and expected dataType)
   * - returns the corresponding response
   */
  function ajaxHandleResponses(s, jqXHR, responses) {
    var ct,
      type,
      finalDataType,
      firstDataType,
      contents = s.contents,
      dataTypes = s.dataTypes;

    // Remove auto dataType and get content-type in the process
    while (dataTypes[0] === "*") {
      dataTypes.shift();
      if (ct === undefined) {
        ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
      }
    }

    // Check if we're dealing with a known content-type
    if (ct) {
      for (type in contents) {
        if (contents[type] && contents[type].test(ct)) {
          dataTypes.unshift(type);
          break;
        }
      }
    }

    // Check to see if we have a response for the expected dataType
    if (dataTypes[0] in responses) {
      finalDataType = dataTypes[0];
    } else {
      // Try convertible dataTypes
      for (type in responses) {
        if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
          finalDataType = type;
          break;
        }
        if (!firstDataType) {
          firstDataType = type;
        }
      }

      // Or just use first one
      finalDataType = finalDataType || firstDataType;
    }

    // If we found a dataType
    // We add the dataType to the list if needed
    // and return the corresponding response
    if (finalDataType) {
      if (finalDataType !== dataTypes[0]) {
        dataTypes.unshift(finalDataType);
      }
      return responses[finalDataType];
    }
  }

  /* Chain conversions given the request and the original response
   * Also sets the responseXXX fields on the jqXHR instance
   */
  function ajaxConvert(s, response, jqXHR, isSuccess) {
    var conv2,
      current,
      conv,
      tmp,
      prev,
      converters = {},
      // Work with a copy of dataTypes in case we need to modify it for conversion
      dataTypes = s.dataTypes.slice();

    // Create converters map with lowercased keys
    if (dataTypes[1]) {
      for (conv in s.converters) {
        converters[conv.toLowerCase()] = s.converters[conv];
      }
    }
    current = dataTypes.shift();

    // Convert to each sequential dataType
    while (current) {
      if (s.responseFields[current]) {
        jqXHR[s.responseFields[current]] = response;
      }

      // Apply the dataFilter if provided
      if (!prev && isSuccess && s.dataFilter) {
        response = s.dataFilter(response, s.dataType);
      }
      prev = current;
      current = dataTypes.shift();
      if (current) {
        // There's only work to do if current dataType is non-auto
        if (current === "*") {
          current = prev;

          // Convert response if prev dataType is non-auto and differs from current
        } else if (prev !== "*" && prev !== current) {
          // Seek a direct converter
          conv = converters[prev + " " + current] || converters["* " + current];

          // If none found, seek a pair
          if (!conv) {
            for (conv2 in converters) {
              // If conv2 outputs current
              tmp = conv2.split(" ");
              if (tmp[1] === current) {
                // If prev can be converted to accepted input
                conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]];
                if (conv) {
                  // Condense equivalence converters
                  if (conv === true) {
                    conv = converters[conv2];

                    // Otherwise, insert the intermediate dataType
                  } else if (converters[conv2] !== true) {
                    current = tmp[0];
                    dataTypes.unshift(tmp[1]);
                  }
                  break;
                }
              }
            }
          }

          // Apply converter (if not an equivalence)
          if (conv !== true) {
            // Unless errors are allowed to bubble, catch and return them
            if (conv && s.throws) {
              response = conv(response);
            } else {
              try {
                response = conv(response);
              } catch (e) {
                return {
                  state: "parsererror",
                  error: conv ? e : "No conversion from " + prev + " to " + current
                };
              }
            }
          }
        }
      }
    }
    return {
      state: "success",
      data: response
    };
  }
  jQuery.extend({
    // Counter for holding the number of active queries
    active: 0,
    // Last-Modified header cache for next request
    lastModified: {},
    etag: {},
    ajaxSettings: {
      url: location.href,
      type: "GET",
      isLocal: rlocalProtocol.test(location.protocol),
      global: true,
      processData: true,
      async: true,
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      /*
      timeout: 0,
      data: null,
      dataType: null,
      username: null,
      password: null,
      cache: null,
      throws: false,
      traditional: false,
      headers: {},
      */

      accepts: {
        "*": allTypes,
        text: "text/plain",
        html: "text/html",
        xml: "application/xml, text/xml",
        json: "application/json, text/javascript"
      },
      contents: {
        xml: /\bxml\b/,
        html: /\bhtml/,
        json: /\bjson\b/
      },
      responseFields: {
        xml: "responseXML",
        text: "responseText",
        json: "responseJSON"
      },
      // Data converters
      // Keys separate source (or catchall "*") and destination types with a single space
      converters: {
        // Convert anything to text
        "* text": String,
        // Text to html (true = no transformation)
        "text html": true,
        // Evaluate text as a json expression
        "text json": JSON.parse,
        // Parse text as xml
        "text xml": jQuery.parseXML
      },
      // For options that shouldn't be deep extended:
      // you can add your own custom options here if
      // and when you create one that shouldn't be
      // deep extended (see ajaxExtend)
      flatOptions: {
        url: true,
        context: true
      }
    },
    // Creates a full fledged settings object into target
    // with both ajaxSettings and settings fields.
    // If target is omitted, writes into ajaxSettings.
    ajaxSetup: function (target, settings) {
      return settings ?
      // Building a settings object
      ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) :
      // Extending ajaxSettings
      ajaxExtend(jQuery.ajaxSettings, target);
    },
    ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
    ajaxTransport: addToPrefiltersOrTransports(transports),
    // Main method
    ajax: function (url, options) {
      // If url is an object, simulate pre-1.5 signature
      if (typeof url === "object") {
        options = url;
        url = undefined;
      }

      // Force options to be an object
      options = options || {};
      var transport,
        // URL without anti-cache param
        cacheURL,
        // Response headers
        responseHeadersString,
        responseHeaders,
        // timeout handle
        timeoutTimer,
        // Url cleanup var
        urlAnchor,
        // Request state (becomes false upon send and true upon completion)
        completed,
        // To know if global events are to be dispatched
        fireGlobals,
        // Loop variable
        i,
        // uncached part of the url
        uncached,
        // Create the final options object
        s = jQuery.ajaxSetup({}, options),
        // Callbacks context
        callbackContext = s.context || s,
        // Context for global events is callbackContext if it is a DOM node or jQuery collection
        globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event,
        // Deferreds
        deferred = jQuery.Deferred(),
        completeDeferred = jQuery.Callbacks("once memory"),
        // Status-dependent callbacks
        statusCode = s.statusCode || {},
        // Headers (they are sent all at once)
        requestHeaders = {},
        requestHeadersNames = {},
        // Default abort message
        strAbort = "canceled",
        // Fake xhr
        jqXHR = {
          readyState: 0,
          // Builds headers hashtable if needed
          getResponseHeader: function (key) {
            var match;
            if (completed) {
              if (!responseHeaders) {
                responseHeaders = {};
                while (match = rheaders.exec(responseHeadersString)) {
                  responseHeaders[match[1].toLowerCase() + " "] = (responseHeaders[match[1].toLowerCase() + " "] || []).concat(match[2]);
                }
              }
              match = responseHeaders[key.toLowerCase() + " "];
            }
            return match == null ? null : match.join(", ");
          },
          // Raw string
          getAllResponseHeaders: function () {
            return completed ? responseHeadersString : null;
          },
          // Caches the header
          setRequestHeader: function (name, value) {
            if (completed == null) {
              name = requestHeadersNames[name.toLowerCase()] = requestHeadersNames[name.toLowerCase()] || name;
              requestHeaders[name] = value;
            }
            return this;
          },
          // Overrides response content-type header
          overrideMimeType: function (type) {
            if (completed == null) {
              s.mimeType = type;
            }
            return this;
          },
          // Status-dependent callbacks
          statusCode: function (map) {
            var code;
            if (map) {
              if (completed) {
                // Execute the appropriate callbacks
                jqXHR.always(map[jqXHR.status]);
              } else {
                // Lazy-add the new callbacks in a way that preserves old ones
                for (code in map) {
                  statusCode[code] = [statusCode[code], map[code]];
                }
              }
            }
            return this;
          },
          // Cancel the request
          abort: function (statusText) {
            var finalText = statusText || strAbort;
            if (transport) {
              transport.abort(finalText);
            }
            done(0, finalText);
            return this;
          }
        };

      // Attach deferreds
      deferred.promise(jqXHR);

      // Add protocol if not provided (prefilters might expect it)
      // Handle falsy url in the settings object (trac-10093: consistency with old signature)
      // We also use the url parameter if available
      s.url = ((url || s.url || location.href) + "").replace(rprotocol, location.protocol + "//");

      // Alias method option to type as per ticket trac-12004
      s.type = options.method || options.type || s.method || s.type;

      // Extract dataTypes list
      s.dataTypes = (s.dataType || "*").toLowerCase().match(rnothtmlwhite) || [""];

      // A cross-domain request is in order when the origin doesn't match the current origin.
      if (s.crossDomain == null) {
        urlAnchor = document.createElement("a");

        // Support: IE <=8 - 11, Edge 12 - 15
        // IE throws exception on accessing the href property if url is malformed,
        // e.g. http://example.com:80x/
        try {
          urlAnchor.href = s.url;

          // Support: IE <=8 - 11 only
          // Anchor's host property isn't correctly set when s.url is relative
          urlAnchor.href = urlAnchor.href;
          s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !== urlAnchor.protocol + "//" + urlAnchor.host;
        } catch (e) {
          // If there is an error parsing the URL, assume it is crossDomain,
          // it can be rejected by the transport if it is invalid
          s.crossDomain = true;
        }
      }

      // Convert data if not already a string
      if (s.data && s.processData && typeof s.data !== "string") {
        s.data = jQuery.param(s.data, s.traditional);
      }

      // Apply prefilters
      inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);

      // If request was aborted inside a prefilter, stop there
      if (completed) {
        return jqXHR;
      }

      // We can fire global events as of now if asked to
      // Don't fire events if jQuery.event is undefined in an AMD-usage scenario (trac-15118)
      fireGlobals = jQuery.event && s.global;

      // Watch for a new set of requests
      if (fireGlobals && jQuery.active++ === 0) {
        jQuery.event.trigger("ajaxStart");
      }

      // Uppercase the type
      s.type = s.type.toUpperCase();

      // Determine if request has content
      s.hasContent = !rnoContent.test(s.type);

      // Save the URL in case we're toying with the If-Modified-Since
      // and/or If-None-Match header later on
      // Remove hash to simplify url manipulation
      cacheURL = s.url.replace(rhash, "");

      // More options handling for requests with no content
      if (!s.hasContent) {
        // Remember the hash so we can put it back
        uncached = s.url.slice(cacheURL.length);

        // If data is available and should be processed, append data to url
        if (s.data && (s.processData || typeof s.data === "string")) {
          cacheURL += (rquery.test(cacheURL) ? "&" : "?") + s.data;

          // trac-9682: remove data so that it's not used in an eventual retry
          delete s.data;
        }

        // Add or update anti-cache param if needed
        if (s.cache === false) {
          cacheURL = cacheURL.replace(rantiCache, "$1");
          uncached = (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce.guid++ + uncached;
        }

        // Put hash and anti-cache on the URL that will be requested (gh-1732)
        s.url = cacheURL + uncached;

        // Change '%20' to '+' if this is encoded form body content (gh-2658)
      } else if (s.data && s.processData && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0) {
        s.data = s.data.replace(r20, "+");
      }

      // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
      if (s.ifModified) {
        if (jQuery.lastModified[cacheURL]) {
          jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
        }
        if (jQuery.etag[cacheURL]) {
          jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
        }
      }

      // Set the correct header, if data is being sent
      if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
        jqXHR.setRequestHeader("Content-Type", s.contentType);
      }

      // Set the Accepts header for the server, depending on the dataType
      jqXHR.setRequestHeader("Accept", s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]);

      // Check for headers option
      for (i in s.headers) {
        jqXHR.setRequestHeader(i, s.headers[i]);
      }

      // Allow custom headers/mimetypes and early abort
      if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || completed)) {
        // Abort if not done already and return
        return jqXHR.abort();
      }

      // Aborting is no longer a cancellation
      strAbort = "abort";

      // Install callbacks on deferreds
      completeDeferred.add(s.complete);
      jqXHR.done(s.success);
      jqXHR.fail(s.error);

      // Get transport
      transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);

      // If no transport, we auto-abort
      if (!transport) {
        done(-1, "No Transport");
      } else {
        jqXHR.readyState = 1;

        // Send global event
        if (fireGlobals) {
          globalEventContext.trigger("ajaxSend", [jqXHR, s]);
        }

        // If request was aborted inside ajaxSend, stop there
        if (completed) {
          return jqXHR;
        }

        // Timeout
        if (s.async && s.timeout > 0) {
          timeoutTimer = window.setTimeout(function () {
            jqXHR.abort("timeout");
          }, s.timeout);
        }
        try {
          completed = false;
          transport.send(requestHeaders, done);
        } catch (e) {
          // Rethrow post-completion exceptions
          if (completed) {
            throw e;
          }

          // Propagate others as results
          done(-1, e);
        }
      }

      // Callback for when everything is done
      function done(status, nativeStatusText, responses, headers) {
        var isSuccess,
          success,
          error,
          response,
          modified,
          statusText = nativeStatusText;

        // Ignore repeat invocations
        if (completed) {
          return;
        }
        completed = true;

        // Clear timeout if it exists
        if (timeoutTimer) {
          window.clearTimeout(timeoutTimer);
        }

        // Dereference transport for early garbage collection
        // (no matter how long the jqXHR object will be used)
        transport = undefined;

        // Cache response headers
        responseHeadersString = headers || "";

        // Set readyState
        jqXHR.readyState = status > 0 ? 4 : 0;

        // Determine if successful
        isSuccess = status >= 200 && status < 300 || status === 304;

        // Get response data
        if (responses) {
          response = ajaxHandleResponses(s, jqXHR, responses);
        }

        // Use a noop converter for missing script but not if jsonp
        if (!isSuccess && jQuery.inArray("script", s.dataTypes) > -1 && jQuery.inArray("json", s.dataTypes) < 0) {
          s.converters["text script"] = function () {};
        }

        // Convert no matter what (that way responseXXX fields are always set)
        response = ajaxConvert(s, response, jqXHR, isSuccess);

        // If successful, handle type chaining
        if (isSuccess) {
          // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
          if (s.ifModified) {
            modified = jqXHR.getResponseHeader("Last-Modified");
            if (modified) {
              jQuery.lastModified[cacheURL] = modified;
            }
            modified = jqXHR.getResponseHeader("etag");
            if (modified) {
              jQuery.etag[cacheURL] = modified;
            }
          }

          // if no content
          if (status === 204 || s.type === "HEAD") {
            statusText = "nocontent";

            // if not modified
          } else if (status === 304) {
            statusText = "notmodified";

            // If we have data, let's convert it
          } else {
            statusText = response.state;
            success = response.data;
            error = response.error;
            isSuccess = !error;
          }
        } else {
          // Extract error from statusText and normalize for non-aborts
          error = statusText;
          if (status || !statusText) {
            statusText = "error";
            if (status < 0) {
              status = 0;
            }
          }
        }

        // Set data for the fake xhr object
        jqXHR.status = status;
        jqXHR.statusText = (nativeStatusText || statusText) + "";

        // Success/Error
        if (isSuccess) {
          deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
        } else {
          deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
        }

        // Status-dependent callbacks
        jqXHR.statusCode(statusCode);
        statusCode = undefined;
        if (fireGlobals) {
          globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error]);
        }

        // Complete
        completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);
        if (fireGlobals) {
          globalEventContext.trigger("ajaxComplete", [jqXHR, s]);

          // Handle the global AJAX counter
          if (! --jQuery.active) {
            jQuery.event.trigger("ajaxStop");
          }
        }
      }
      return jqXHR;
    },
    getJSON: function (url, data, callback) {
      return jQuery.get(url, data, callback, "json");
    },
    getScript: function (url, callback) {
      return jQuery.get(url, undefined, callback, "script");
    }
  });
  jQuery.each(["get", "post"], function (_i, method) {
    jQuery[method] = function (url, data, callback, type) {
      // Shift arguments if data argument was omitted
      if (isFunction(data)) {
        type = type || callback;
        callback = data;
        data = undefined;
      }

      // The url can be an options object (which then must have .url)
      return jQuery.ajax(jQuery.extend({
        url: url,
        type: method,
        dataType: type,
        data: data,
        success: callback
      }, jQuery.isPlainObject(url) && url));
    };
  });
  jQuery.ajaxPrefilter(function (s) {
    var i;
    for (i in s.headers) {
      if (i.toLowerCase() === "content-type") {
        s.contentType = s.headers[i] || "";
      }
    }
  });
  jQuery._evalUrl = function (url, options, doc) {
    return jQuery.ajax({
      url: url,
      // Make this explicit, since user can override this through ajaxSetup (trac-11264)
      type: "GET",
      dataType: "script",
      cache: true,
      async: false,
      global: false,
      // Only evaluate the response if it is successful (gh-4126)
      // dataFilter is not invoked for failure responses, so using it instead
      // of the default converter is kludgy but it works.
      converters: {
        "text script": function () {}
      },
      dataFilter: function (response) {
        jQuery.globalEval(response, options, doc);
      }
    });
  };
  jQuery.fn.extend({
    wrapAll: function (html) {
      var wrap;
      if (this[0]) {
        if (isFunction(html)) {
          html = html.call(this[0]);
        }

        // The elements to wrap the target around
        wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);
        if (this[0].parentNode) {
          wrap.insertBefore(this[0]);
        }
        wrap.map(function () {
          var elem = this;
          while (elem.firstElementChild) {
            elem = elem.firstElementChild;
          }
          return elem;
        }).append(this);
      }
      return this;
    },
    wrapInner: function (html) {
      if (isFunction(html)) {
        return this.each(function (i) {
          jQuery(this).wrapInner(html.call(this, i));
        });
      }
      return this.each(function () {
        var self = jQuery(this),
          contents = self.contents();
        if (contents.length) {
          contents.wrapAll(html);
        } else {
          self.append(html);
        }
      });
    },
    wrap: function (html) {
      var htmlIsFunction = isFunction(html);
      return this.each(function (i) {
        jQuery(this).wrapAll(htmlIsFunction ? html.call(this, i) : html);
      });
    },
    unwrap: function (selector) {
      this.parent(selector).not("body").each(function () {
        jQuery(this).replaceWith(this.childNodes);
      });
      return this;
    }
  });
  jQuery.expr.pseudos.hidden = function (elem) {
    return !jQuery.expr.pseudos.visible(elem);
  };
  jQuery.expr.pseudos.visible = function (elem) {
    return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
  };
  jQuery.ajaxSettings.xhr = function () {
    try {
      return new window.XMLHttpRequest();
    } catch (e) {}
  };
  var xhrSuccessStatus = {
      // File protocol always yields status code 0, assume 200
      0: 200,
      // Support: IE <=9 only
      // trac-1450: sometimes IE returns 1223 when it should be 204
      1223: 204
    },
    xhrSupported = jQuery.ajaxSettings.xhr();
  support.cors = !!xhrSupported && "withCredentials" in xhrSupported;
  support.ajax = xhrSupported = !!xhrSupported;
  jQuery.ajaxTransport(function (options) {
    var callback, errorCallback;

    // Cross domain only allowed if supported through XMLHttpRequest
    if (support.cors || xhrSupported && !options.crossDomain) {
      return {
        send: function (headers, complete) {
          var i,
            xhr = options.xhr();
          xhr.open(options.type, options.url, options.async, options.username, options.password);

          // Apply custom fields if provided
          if (options.xhrFields) {
            for (i in options.xhrFields) {
              xhr[i] = options.xhrFields[i];
            }
          }

          // Override mime type if needed
          if (options.mimeType && xhr.overrideMimeType) {
            xhr.overrideMimeType(options.mimeType);
          }

          // X-Requested-With header
          // For cross-domain requests, seeing as conditions for a preflight are
          // akin to a jigsaw puzzle, we simply never set it to be sure.
          // (it can always be set on a per-request basis or even using ajaxSetup)
          // For same-domain requests, won't change header if already provided.
          if (!options.crossDomain && !headers["X-Requested-With"]) {
            headers["X-Requested-With"] = "XMLHttpRequest";
          }

          // Set headers
          for (i in headers) {
            xhr.setRequestHeader(i, headers[i]);
          }

          // Callback
          callback = function (type) {
            return function () {
              if (callback) {
                callback = errorCallback = xhr.onload = xhr.onerror = xhr.onabort = xhr.ontimeout = xhr.onreadystatechange = null;
                if (type === "abort") {
                  xhr.abort();
                } else if (type === "error") {
                  // Support: IE <=9 only
                  // On a manual native abort, IE9 throws
                  // errors on any property access that is not readyState
                  if (typeof xhr.status !== "number") {
                    complete(0, "error");
                  } else {
                    complete(
                    // File: protocol always yields status 0; see trac-8605, trac-14207
                    xhr.status, xhr.statusText);
                  }
                } else {
                  complete(xhrSuccessStatus[xhr.status] || xhr.status, xhr.statusText,
                  // Support: IE <=9 only
                  // IE9 has no XHR2 but throws on binary (trac-11426)
                  // For XHR2 non-text, let the caller handle it (gh-2498)
                  (xhr.responseType || "text") !== "text" || typeof xhr.responseText !== "string" ? {
                    binary: xhr.response
                  } : {
                    text: xhr.responseText
                  }, xhr.getAllResponseHeaders());
                }
              }
            };
          };

          // Listen to events
          xhr.onload = callback();
          errorCallback = xhr.onerror = xhr.ontimeout = callback("error");

          // Support: IE 9 only
          // Use onreadystatechange to replace onabort
          // to handle uncaught aborts
          if (xhr.onabort !== undefined) {
            xhr.onabort = errorCallback;
          } else {
            xhr.onreadystatechange = function () {
              // Check readyState before timeout as it changes
              if (xhr.readyState === 4) {
                // Allow onerror to be called first,
                // but that will not handle a native abort
                // Also, save errorCallback to a variable
                // as xhr.onerror cannot be accessed
                window.setTimeout(function () {
                  if (callback) {
                    errorCallback();
                  }
                });
              }
            };
          }

          // Create the abort callback
          callback = callback("abort");
          try {
            // Do send the request (this may raise an exception)
            xhr.send(options.hasContent && options.data || null);
          } catch (e) {
            // trac-14683: Only rethrow if this hasn't been notified as an error yet
            if (callback) {
              throw e;
            }
          }
        },
        abort: function () {
          if (callback) {
            callback();
          }
        }
      };
    }
  });

  // Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
  jQuery.ajaxPrefilter(function (s) {
    if (s.crossDomain) {
      s.contents.script = false;
    }
  });

  // Install script dataType
  jQuery.ajaxSetup({
    accepts: {
      script: "text/javascript, application/javascript, " + "application/ecmascript, application/x-ecmascript"
    },
    contents: {
      script: /\b(?:java|ecma)script\b/
    },
    converters: {
      "text script": function (text) {
        jQuery.globalEval(text);
        return text;
      }
    }
  });

  // Handle cache's special case and crossDomain
  jQuery.ajaxPrefilter("script", function (s) {
    if (s.cache === undefined) {
      s.cache = false;
    }
    if (s.crossDomain) {
      s.type = "GET";
    }
  });

  // Bind script tag hack transport
  jQuery.ajaxTransport("script", function (s) {
    // This transport only deals with cross domain or forced-by-attrs requests
    if (s.crossDomain || s.scriptAttrs) {
      var script, callback;
      return {
        send: function (_, complete) {
          script = jQuery("<script>").attr(s.scriptAttrs || {}).prop({
            charset: s.scriptCharset,
            src: s.url
          }).on("load error", callback = function (evt) {
            script.remove();
            callback = null;
            if (evt) {
              complete(evt.type === "error" ? 404 : 200, evt.type);
            }
          });

          // Use native DOM manipulation to avoid our domManip AJAX trickery
          document.head.appendChild(script[0]);
        },
        abort: function () {
          if (callback) {
            callback();
          }
        }
      };
    }
  });
  var oldCallbacks = [],
    rjsonp = /(=)\?(?=&|$)|\?\?/;

  // Default jsonp settings
  jQuery.ajaxSetup({
    jsonp: "callback",
    jsonpCallback: function () {
      var callback = oldCallbacks.pop() || jQuery.expando + "_" + nonce.guid++;
      this[callback] = true;
      return callback;
    }
  });

  // Detect, normalize options and install callbacks for jsonp requests
  jQuery.ajaxPrefilter("json jsonp", function (s, originalSettings, jqXHR) {
    var callbackName,
      overwritten,
      responseContainer,
      jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? "url" : typeof s.data === "string" && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && rjsonp.test(s.data) && "data");

    // Handle iff the expected data type is "jsonp" or we have a parameter to set
    if (jsonProp || s.dataTypes[0] === "jsonp") {
      // Get callback name, remembering preexisting value associated with it
      callbackName = s.jsonpCallback = isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;

      // Insert callback into url or form data
      if (jsonProp) {
        s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
      } else if (s.jsonp !== false) {
        s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
      }

      // Use data converter to retrieve json after script execution
      s.converters["script json"] = function () {
        if (!responseContainer) {
          jQuery.error(callbackName + " was not called");
        }
        return responseContainer[0];
      };

      // Force json dataType
      s.dataTypes[0] = "json";

      // Install callback
      overwritten = window[callbackName];
      window[callbackName] = function () {
        responseContainer = arguments;
      };

      // Clean-up function (fires after converters)
      jqXHR.always(function () {
        // If previous value didn't exist - remove it
        if (overwritten === undefined) {
          jQuery(window).removeProp(callbackName);

          // Otherwise restore preexisting value
        } else {
          window[callbackName] = overwritten;
        }

        // Save back as free
        if (s[callbackName]) {
          // Make sure that re-using the options doesn't screw things around
          s.jsonpCallback = originalSettings.jsonpCallback;

          // Save the callback name for future use
          oldCallbacks.push(callbackName);
        }

        // Call if it was a function and we have a response
        if (responseContainer && isFunction(overwritten)) {
          overwritten(responseContainer[0]);
        }
        responseContainer = overwritten = undefined;
      });

      // Delegate to script
      return "script";
    }
  });

  // Support: Safari 8 only
  // In Safari 8 documents created via document.implementation.createHTMLDocument
  // collapse sibling forms: the second one becomes a child of the first one.
  // Because of that, this security measure has to be disabled in Safari 8.
  // https://bugs.webkit.org/show_bug.cgi?id=137337
  support.createHTMLDocument = function () {
    var body = document.implementation.createHTMLDocument("").body;
    body.innerHTML = "<form></form><form></form>";
    return body.childNodes.length === 2;
  }();

  // Argument "data" should be string of html
  // context (optional): If specified, the fragment will be created in this context,
  // defaults to document
  // keepScripts (optional): If true, will include scripts passed in the html string
  jQuery.parseHTML = function (data, context, keepScripts) {
    if (typeof data !== "string") {
      return [];
    }
    if (typeof context === "boolean") {
      keepScripts = context;
      context = false;
    }
    var base, parsed, scripts;
    if (!context) {
      // Stop scripts or inline event handlers from being executed immediately
      // by using document.implementation
      if (support.createHTMLDocument) {
        context = document.implementation.createHTMLDocument("");

        // Set the base href for the created document
        // so any parsed elements with URLs
        // are based on the document's URL (gh-2965)
        base = context.createElement("base");
        base.href = document.location.href;
        context.head.appendChild(base);
      } else {
        context = document;
      }
    }
    parsed = rsingleTag.exec(data);
    scripts = !keepScripts && [];

    // Single tag
    if (parsed) {
      return [context.createElement(parsed[1])];
    }
    parsed = buildFragment([data], context, scripts);
    if (scripts && scripts.length) {
      jQuery(scripts).remove();
    }
    return jQuery.merge([], parsed.childNodes);
  };

  /**
   * Load a url into a page
   */
  jQuery.fn.load = function (url, params, callback) {
    var selector,
      type,
      response,
      self = this,
      off = url.indexOf(" ");
    if (off > -1) {
      selector = stripAndCollapse(url.slice(off));
      url = url.slice(0, off);
    }

    // If it's a function
    if (isFunction(params)) {
      // We assume that it's the callback
      callback = params;
      params = undefined;

      // Otherwise, build a param string
    } else if (params && typeof params === "object") {
      type = "POST";
    }

    // If we have elements to modify, make the request
    if (self.length > 0) {
      jQuery.ajax({
        url: url,
        // If "type" variable is undefined, then "GET" method will be used.
        // Make value of this field explicit since
        // user can override it through ajaxSetup method
        type: type || "GET",
        dataType: "html",
        data: params
      }).done(function (responseText) {
        // Save response for use in complete callback
        response = arguments;
        self.html(selector ?
        // If a selector was specified, locate the right elements in a dummy div
        // Exclude scripts to avoid IE 'Permission Denied' errors
        jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) :
        // Otherwise use the full result
        responseText);

        // If the request succeeds, this function gets "data", "status", "jqXHR"
        // but they are ignored because response was set above.
        // If it fails, this function gets "jqXHR", "status", "error"
      }).always(callback && function (jqXHR, status) {
        self.each(function () {
          callback.apply(this, response || [jqXHR.responseText, status, jqXHR]);
        });
      });
    }
    return this;
  };
  jQuery.expr.pseudos.animated = function (elem) {
    return jQuery.grep(jQuery.timers, function (fn) {
      return elem === fn.elem;
    }).length;
  };
  jQuery.offset = {
    setOffset: function (elem, options, i) {
      var curPosition,
        curLeft,
        curCSSTop,
        curTop,
        curOffset,
        curCSSLeft,
        calculatePosition,
        position = jQuery.css(elem, "position"),
        curElem = jQuery(elem),
        props = {};

      // Set position first, in-case top/left are set even on static elem
      if (position === "static") {
        elem.style.position = "relative";
      }
      curOffset = curElem.offset();
      curCSSTop = jQuery.css(elem, "top");
      curCSSLeft = jQuery.css(elem, "left");
      calculatePosition = (position === "absolute" || position === "fixed") && (curCSSTop + curCSSLeft).indexOf("auto") > -1;

      // Need to be able to calculate position if either
      // top or left is auto and position is either absolute or fixed
      if (calculatePosition) {
        curPosition = curElem.position();
        curTop = curPosition.top;
        curLeft = curPosition.left;
      } else {
        curTop = parseFloat(curCSSTop) || 0;
        curLeft = parseFloat(curCSSLeft) || 0;
      }
      if (isFunction(options)) {
        // Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
        options = options.call(elem, i, jQuery.extend({}, curOffset));
      }
      if (options.top != null) {
        props.top = options.top - curOffset.top + curTop;
      }
      if (options.left != null) {
        props.left = options.left - curOffset.left + curLeft;
      }
      if ("using" in options) {
        options.using.call(elem, props);
      } else {
        curElem.css(props);
      }
    }
  };
  jQuery.fn.extend({
    // offset() relates an element's border box to the document origin
    offset: function (options) {
      // Preserve chaining for setter
      if (arguments.length) {
        return options === undefined ? this : this.each(function (i) {
          jQuery.offset.setOffset(this, options, i);
        });
      }
      var rect,
        win,
        elem = this[0];
      if (!elem) {
        return;
      }

      // Return zeros for disconnected and hidden (display: none) elements (gh-2310)
      // Support: IE <=11 only
      // Running getBoundingClientRect on a
      // disconnected node in IE throws an error
      if (!elem.getClientRects().length) {
        return {
          top: 0,
          left: 0
        };
      }

      // Get document-relative position by adding viewport scroll to viewport-relative gBCR
      rect = elem.getBoundingClientRect();
      win = elem.ownerDocument.defaultView;
      return {
        top: rect.top + win.pageYOffset,
        left: rect.left + win.pageXOffset
      };
    },
    // position() relates an element's margin box to its offset parent's padding box
    // This corresponds to the behavior of CSS absolute positioning
    position: function () {
      if (!this[0]) {
        return;
      }
      var offsetParent,
        offset,
        doc,
        elem = this[0],
        parentOffset = {
          top: 0,
          left: 0
        };

      // position:fixed elements are offset from the viewport, which itself always has zero offset
      if (jQuery.css(elem, "position") === "fixed") {
        // Assume position:fixed implies availability of getBoundingClientRect
        offset = elem.getBoundingClientRect();
      } else {
        offset = this.offset();

        // Account for the *real* offset parent, which can be the document or its root element
        // when a statically positioned element is identified
        doc = elem.ownerDocument;
        offsetParent = elem.offsetParent || doc.documentElement;
        while (offsetParent && (offsetParent === doc.body || offsetParent === doc.documentElement) && jQuery.css(offsetParent, "position") === "static") {
          offsetParent = offsetParent.parentNode;
        }
        if (offsetParent && offsetParent !== elem && offsetParent.nodeType === 1) {
          // Incorporate borders into its offset, since they are outside its content origin
          parentOffset = jQuery(offsetParent).offset();
          parentOffset.top += jQuery.css(offsetParent, "borderTopWidth", true);
          parentOffset.left += jQuery.css(offsetParent, "borderLeftWidth", true);
        }
      }

      // Subtract parent offsets and element margins
      return {
        top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
        left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
      };
    },
    // This method will return documentElement in the following cases:
    // 1) For the element inside the iframe without offsetParent, this method will return
    //    documentElement of the parent window
    // 2) For the hidden or detached element
    // 3) For body or html element, i.e. in case of the html node - it will return itself
    //
    // but those exceptions were never presented as a real life use-cases
    // and might be considered as more preferable results.
    //
    // This logic, however, is not guaranteed and can change at any point in the future
    offsetParent: function () {
      return this.map(function () {
        var offsetParent = this.offsetParent;
        while (offsetParent && jQuery.css(offsetParent, "position") === "static") {
          offsetParent = offsetParent.offsetParent;
        }
        return offsetParent || documentElement;
      });
    }
  });

  // Create scrollLeft and scrollTop methods
  jQuery.each({
    scrollLeft: "pageXOffset",
    scrollTop: "pageYOffset"
  }, function (method, prop) {
    var top = "pageYOffset" === prop;
    jQuery.fn[method] = function (val) {
      return access(this, function (elem, method, val) {
        // Coalesce documents and windows
        var win;
        if (isWindow(elem)) {
          win = elem;
        } else if (elem.nodeType === 9) {
          win = elem.defaultView;
        }
        if (val === undefined) {
          return win ? win[prop] : elem[method];
        }
        if (win) {
          win.scrollTo(!top ? val : win.pageXOffset, top ? val : win.pageYOffset);
        } else {
          elem[method] = val;
        }
      }, method, val, arguments.length);
    };
  });

  // Support: Safari <=7 - 9.1, Chrome <=37 - 49
  // Add the top/left cssHooks using jQuery.fn.position
  // Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
  // Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
  // getComputedStyle returns percent when specified for top/left/bottom/right;
  // rather than make the css module depend on the offset module, just check for it here
  jQuery.each(["top", "left"], function (_i, prop) {
    jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition, function (elem, computed) {
      if (computed) {
        computed = curCSS(elem, prop);

        // If curCSS returns percentage, fallback to offset
        return rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed;
      }
    });
  });

  // Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
  jQuery.each({
    Height: "height",
    Width: "width"
  }, function (name, type) {
    jQuery.each({
      padding: "inner" + name,
      content: type,
      "": "outer" + name
    }, function (defaultExtra, funcName) {
      // Margin is only for outerHeight, outerWidth
      jQuery.fn[funcName] = function (margin, value) {
        var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"),
          extra = defaultExtra || (margin === true || value === true ? "margin" : "border");
        return access(this, function (elem, type, value) {
          var doc;
          if (isWindow(elem)) {
            // $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
            return funcName.indexOf("outer") === 0 ? elem["inner" + name] : elem.document.documentElement["client" + name];
          }

          // Get document width or height
          if (elem.nodeType === 9) {
            doc = elem.documentElement;

            // Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
            // whichever is greatest
            return Math.max(elem.body["scroll" + name], doc["scroll" + name], elem.body["offset" + name], doc["offset" + name], doc["client" + name]);
          }
          return value === undefined ?
          // Get width or height on the element, requesting but not forcing parseFloat
          jQuery.css(elem, type, extra) :
          // Set width or height on the element
          jQuery.style(elem, type, value, extra);
        }, type, chainable ? margin : undefined, chainable);
      };
    });
  });
  jQuery.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (_i, type) {
    jQuery.fn[type] = function (fn) {
      return this.on(type, fn);
    };
  });
  jQuery.fn.extend({
    bind: function (types, data, fn) {
      return this.on(types, null, data, fn);
    },
    unbind: function (types, fn) {
      return this.off(types, null, fn);
    },
    delegate: function (selector, types, data, fn) {
      return this.on(types, selector, data, fn);
    },
    undelegate: function (selector, types, fn) {
      // ( namespace ) or ( selector, types [, fn] )
      return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn);
    },
    hover: function (fnOver, fnOut) {
      return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
    }
  });
  jQuery.each(("blur focus focusin focusout resize scroll click dblclick " + "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " + "change select submit keydown keypress keyup contextmenu").split(" "), function (_i, name) {
    // Handle event binding
    jQuery.fn[name] = function (data, fn) {
      return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
    };
  });

  // Support: Android <=4.0 only
  // Make sure we trim BOM and NBSP
  // Require that the "whitespace run" starts from a non-whitespace
  // to avoid O(N^2) behavior when the engine would try matching "\s+$" at each space position.
  var rtrim = /^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;

  // Bind a function to a context, optionally partially applying any
  // arguments.
  // jQuery.proxy is deprecated to promote standards (specifically Function#bind)
  // However, it is not slated for removal any time soon
  jQuery.proxy = function (fn, context) {
    var tmp, args, proxy;
    if (typeof context === "string") {
      tmp = fn[context];
      context = fn;
      fn = tmp;
    }

    // Quick check to determine if target is callable, in the spec
    // this throws a TypeError, but we will just return undefined.
    if (!isFunction(fn)) {
      return undefined;
    }

    // Simulated bind
    args = slice.call(arguments, 2);
    proxy = function () {
      return fn.apply(context || this, args.concat(slice.call(arguments)));
    };

    // Set the guid of unique handler to the same of original handler, so it can be removed
    proxy.guid = fn.guid = fn.guid || jQuery.guid++;
    return proxy;
  };
  jQuery.holdReady = function (hold) {
    if (hold) {
      jQuery.readyWait++;
    } else {
      jQuery.ready(true);
    }
  };
  jQuery.isArray = Array.isArray;
  jQuery.parseJSON = JSON.parse;
  jQuery.nodeName = nodeName;
  jQuery.isFunction = isFunction;
  jQuery.isWindow = isWindow;
  jQuery.camelCase = camelCase;
  jQuery.type = toType;
  jQuery.now = Date.now;
  jQuery.isNumeric = function (obj) {
    // As of jQuery 3.0, isNumeric is limited to
    // strings and numbers (primitives or objects)
    // that can be coerced to finite numbers (gh-2662)
    var type = jQuery.type(obj);
    return (type === "number" || type === "string") &&
    // parseFloat NaNs numeric-cast false positives ("")
    // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
    // subtraction forces infinities to NaN
    !isNaN(obj - parseFloat(obj));
  };
  jQuery.trim = function (text) {
    return text == null ? "" : (text + "").replace(rtrim, "$1");
  };

  // Register as a named AMD module, since jQuery can be concatenated with other
  // files that may use define, but not via a proper concatenation script that
  // understands anonymous AMD modules. A named AMD is safest and most robust
  // way to register. Lowercase jquery is used because AMD module names are
  // derived from file names, and jQuery is normally delivered in a lowercase
  // file name. Do this after creating the global so that if an AMD module wants
  // to call noConflict to hide this version of jQuery, it will work.

  // Note that for maximum portability, libraries that are not jQuery should
  // declare themselves as anonymous modules, and avoid setting a global if an
  // AMD loader is present. jQuery is a special case. For more information, see
  // https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return jQuery;
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  }
  var
    // Map over jQuery in case of overwrite
    _jQuery = window.jQuery,
    // Map over the $ in case of overwrite
    _$ = window.$;
  jQuery.noConflict = function (deep) {
    if (window.$ === jQuery) {
      window.$ = _$;
    }
    if (deep && window.jQuery === jQuery) {
      window.jQuery = _jQuery;
    }
    return jQuery;
  };

  // Expose jQuery and $ identifiers, even in AMD
  // (trac-7102#comment:10, https://github.com/jquery/jquery/pull/557)
  // and CommonJS for browser emulators (trac-13566)
  if (typeof noGlobal === "undefined") {
    window.jQuery = window.$ = jQuery;
  }
  return jQuery;
});

/***/ }),

/***/ 4952:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  bA: function() { return /* binding */ shapefile_open; }
});

// UNUSED EXPORTS: openDbf, openShp, read

// EXTERNAL MODULE: ./node_modules/core-js/modules/esnext.typed-array.to-reversed.js
var esnext_typed_array_to_reversed = __webpack_require__(3767);
// EXTERNAL MODULE: ./node_modules/core-js/modules/esnext.typed-array.to-sorted.js
var esnext_typed_array_to_sorted = __webpack_require__(8585);
// EXTERNAL MODULE: ./node_modules/core-js/modules/esnext.typed-array.with.js
var esnext_typed_array_with = __webpack_require__(8696);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.push.js
var es_array_push = __webpack_require__(7658);
;// CONCATENATED MODULE: ./node_modules/array-source/cancel.js
/* harmony default export */ function cancel() {
  this._array = null;
  return Promise.resolve();
}
;// CONCATENATED MODULE: ./node_modules/array-source/read.js
/* harmony default export */ function read() {
  var array = this._array;
  this._array = null;
  return Promise.resolve(array ? {
    done: false,
    value: array
  } : {
    done: true,
    value: undefined
  });
}
;// CONCATENATED MODULE: ./node_modules/array-source/index.js





function array_source_array(array) {
  return new ArraySource(array instanceof Uint8Array ? array : new Uint8Array(array));
}
function ArraySource(array) {
  this._array = array;
}
ArraySource.prototype.read = read;
ArraySource.prototype.cancel = cancel;
;// CONCATENATED MODULE: ./node_modules/path-source/fetch.js

/* harmony default export */ function path_source_fetch(url) {
  return fetch(url).then(function (response) {
    return response.body && response.body.getReader ? response.body.getReader() : response.arrayBuffer().then(array_source_array);
  });
}
;// CONCATENATED MODULE: ./node_modules/path-source/request.js

/* harmony default export */ function request(url) {
  return new Promise(function (resolve, reject) {
    var request = new XMLHttpRequest();
    request.responseType = "arraybuffer";
    request.onload = function () {
      resolve(array_source_array(request.response));
    };
    request.onerror = reject;
    request.ontimeout = reject;
    request.open("GET", url, true);
    request.send();
  });
}
;// CONCATENATED MODULE: ./node_modules/path-source/index.js


function path_source_path(path) {
  return (typeof fetch === "function" ? path_source_fetch : request)(path);
}
;// CONCATENATED MODULE: ./node_modules/stream-source/index.js
function stream_source_stream(source) {
  return typeof source.read === "function" ? source : source.getReader();
}
;// CONCATENATED MODULE: ./node_modules/slice-source/empty.js



/* harmony default export */ var empty = (new Uint8Array(0));
;// CONCATENATED MODULE: ./node_modules/slice-source/cancel.js
/* harmony default export */ function slice_source_cancel() {
  return this._source.cancel();
}
;// CONCATENATED MODULE: ./node_modules/slice-source/concat.js



function concat(a, b) {
  if (!a.length) return b;
  if (!b.length) return a;
  var c = new Uint8Array(a.length + b.length);
  c.set(a);
  c.set(b, a.length);
  return c;
}
;// CONCATENATED MODULE: ./node_modules/slice-source/read.js


/* harmony default export */ function slice_source_read() {
  var that = this,
    array = that._array.subarray(that._index);
  return that._source.read().then(function (result) {
    that._array = empty;
    that._index = 0;
    return result.done ? array.length > 0 ? {
      done: false,
      value: array
    } : {
      done: true,
      value: undefined
    } : {
      done: false,
      value: concat(array, result.value)
    };
  });
}
;// CONCATENATED MODULE: ./node_modules/slice-source/slice.js




/* harmony default export */ function slice(length) {
  if ((length |= 0) < 0) throw new Error("invalid length");
  var that = this,
    index = this._array.length - this._index;

  // If the request fits within the remaining buffer, resolve it immediately.
  if (this._index + length <= this._array.length) {
    return Promise.resolve(this._array.subarray(this._index, this._index += length));
  }

  // Otherwise, read chunks repeatedly until the request is fulfilled.
  var array = new Uint8Array(length);
  array.set(this._array.subarray(this._index));
  return function read() {
    return that._source.read().then(function (result) {
      // When done, it’s possible the request wasn’t fully fullfilled!
      // If so, the pre-allocated array is too big and needs slicing.
      if (result.done) {
        that._array = empty;
        that._index = 0;
        return index > 0 ? array.subarray(0, index) : null;
      }

      // If this chunk fulfills the request, return the resulting array.
      if (index + result.value.length >= length) {
        that._array = result.value;
        that._index = length - index;
        array.set(result.value.subarray(0, length - index), index);
        return array;
      }

      // Otherwise copy this chunk into the array, then read the next chunk.
      array.set(result.value, index);
      index += result.value.length;
      return read();
    });
  }();
}
;// CONCATENATED MODULE: ./node_modules/slice-source/index.js




function slice_source_slice(source) {
  return typeof source.slice === "function" ? source : new SliceSource(typeof source.read === "function" ? source : source.getReader());
}
function SliceSource(source) {
  this._source = source;
  this._array = empty;
  this._index = 0;
}
SliceSource.prototype.read = slice_source_read;
SliceSource.prototype.slice = slice;
SliceSource.prototype.cancel = slice_source_cancel;
;// CONCATENATED MODULE: ./node_modules/shapefile/dbf/cancel.js
/* harmony default export */ function dbf_cancel() {
  return this._source.cancel();
}
;// CONCATENATED MODULE: ./node_modules/shapefile/dbf/boolean.js
/* harmony default export */ function dbf_boolean(value) {
  return /^[nf]$/i.test(value) ? false : /^[yt]$/i.test(value) ? true : null;
}
;// CONCATENATED MODULE: ./node_modules/shapefile/dbf/date.js
/* harmony default export */ function date(value) {
  return new Date(+value.substring(0, 4), value.substring(4, 6) - 1, +value.substring(6, 8));
}
;// CONCATENATED MODULE: ./node_modules/shapefile/dbf/number.js
/* harmony default export */ function number(value) {
  return !(value = value.trim()) || isNaN(value = +value) ? null : value;
}
;// CONCATENATED MODULE: ./node_modules/shapefile/dbf/string.js
/* harmony default export */ function string(value) {
  return value.trim() || null;
}
;// CONCATENATED MODULE: ./node_modules/shapefile/dbf/read.js




var types = {
  B: number,
  C: string,
  D: date,
  F: number,
  L: dbf_boolean,
  M: number,
  N: number
};
/* harmony default export */ function dbf_read() {
  var that = this,
    i = 1;
  return that._source.slice(that._recordLength).then(function (value) {
    return value && value[0] !== 0x1a ? {
      done: false,
      value: that._fields.reduce(function (p, f) {
        p[f.name] = types[f.type](that._decode(value.subarray(i, i += f.length)));
        return p;
      }, {})
    } : {
      done: true,
      value: undefined
    };
  });
}
;// CONCATENATED MODULE: ./node_modules/shapefile/view.js
/* harmony default export */ function view(array) {
  return new DataView(array.buffer, array.byteOffset, array.byteLength);
}
;// CONCATENATED MODULE: ./node_modules/shapefile/dbf/index.js








/* harmony default export */ function shapefile_dbf(source, decoder) {
  source = slice_source_slice(source);
  return source.slice(32).then(function (array) {
    var head = view(array);
    return source.slice(head.getUint16(8, true) - 32).then(function (array) {
      return new Dbf(source, decoder, head, view(array));
    });
  });
}
function Dbf(source, decoder, head, body) {
  this._source = source;
  this._decode = decoder.decode.bind(decoder);
  this._recordLength = head.getUint16(10, true);
  this._fields = [];
  for (var n = 0; body.getUint8(n) !== 0x0d; n += 32) {
    for (var j = 0; j < 11; ++j) if (body.getUint8(n + j) === 0) break;
    this._fields.push({
      name: this._decode(new Uint8Array(body.buffer, body.byteOffset + n, j)),
      type: String.fromCharCode(body.getUint8(n + 11)),
      length: body.getUint8(n + 16)
    });
  }
}
var dbf_prototype = Dbf.prototype;
dbf_prototype.read = dbf_read;
dbf_prototype.cancel = dbf_cancel;
;// CONCATENATED MODULE: ./node_modules/shapefile/shp/cancel.js
function cancel_cancel() {
  return this._source.cancel();
}
;// CONCATENATED MODULE: ./node_modules/shapefile/shp/multipoint.js
/* harmony default export */ function multipoint(record) {
  var i = 40,
    j,
    n = record.getInt32(36, true),
    coordinates = new Array(n);
  for (j = 0; j < n; ++j, i += 16) coordinates[j] = [record.getFloat64(i, true), record.getFloat64(i + 8, true)];
  return {
    type: "MultiPoint",
    coordinates: coordinates
  };
}
;
;// CONCATENATED MODULE: ./node_modules/shapefile/shp/null.js
/* harmony default export */ function shp_null() {
  return null;
}
;
;// CONCATENATED MODULE: ./node_modules/shapefile/shp/point.js
/* harmony default export */ function point(record) {
  return {
    type: "Point",
    coordinates: [record.getFloat64(4, true), record.getFloat64(12, true)]
  };
}
;
;// CONCATENATED MODULE: ./node_modules/shapefile/shp/polygon.js

/* harmony default export */ function polygon(record) {
  var i = 44,
    j,
    n = record.getInt32(36, true),
    m = record.getInt32(40, true),
    parts = new Array(n),
    points = new Array(m),
    polygons = [],
    holes = [];
  for (j = 0; j < n; ++j, i += 4) parts[j] = record.getInt32(i, true);
  for (j = 0; j < m; ++j, i += 16) points[j] = [record.getFloat64(i, true), record.getFloat64(i + 8, true)];
  parts.forEach(function (i, j) {
    var ring = points.slice(i, parts[j + 1]);
    if (ringClockwise(ring)) polygons.push([ring]);else holes.push(ring);
  });
  holes.forEach(function (hole) {
    polygons.some(function (polygon) {
      if (ringContainsSome(polygon[0], hole)) {
        polygon.push(hole);
        return true;
      }
    }) || polygons.push([hole]);
  });
  return polygons.length === 1 ? {
    type: "Polygon",
    coordinates: polygons[0]
  } : {
    type: "MultiPolygon",
    coordinates: polygons
  };
}
;
function ringClockwise(ring) {
  if ((n = ring.length) < 4) return false;
  var i = 0,
    n,
    area = ring[n - 1][1] * ring[0][0] - ring[n - 1][0] * ring[0][1];
  while (++i < n) area += ring[i - 1][1] * ring[i][0] - ring[i - 1][0] * ring[i][1];
  return area >= 0;
}
function ringContainsSome(ring, hole) {
  var i = -1,
    n = hole.length,
    c;
  while (++i < n) {
    if (c = ringContains(ring, hole[i])) {
      return c > 0;
    }
  }
  return false;
}
function ringContains(ring, point) {
  var x = point[0],
    y = point[1],
    contains = -1;
  for (var i = 0, n = ring.length, j = n - 1; i < n; j = i++) {
    var pi = ring[i],
      xi = pi[0],
      yi = pi[1],
      pj = ring[j],
      xj = pj[0],
      yj = pj[1];
    if (segmentContains(pi, pj, point)) {
      return 0;
    }
    if (yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi) {
      contains = -contains;
    }
  }
  return contains;
}
function segmentContains(p0, p1, p2) {
  var x20 = p2[0] - p0[0],
    y20 = p2[1] - p0[1];
  if (x20 === 0 && y20 === 0) return true;
  var x10 = p1[0] - p0[0],
    y10 = p1[1] - p0[1];
  if (x10 === 0 && y10 === 0) return false;
  var t = (x20 * x10 + y20 * y10) / (x10 * x10 + y10 * y10);
  return t < 0 || t > 1 ? false : t === 0 || t === 1 ? true : t * x10 === x20 && t * y10 === y20;
}
;// CONCATENATED MODULE: ./node_modules/shapefile/shp/polyline.js
/* harmony default export */ function polyline(record) {
  var i = 44,
    j,
    n = record.getInt32(36, true),
    m = record.getInt32(40, true),
    parts = new Array(n),
    points = new Array(m);
  for (j = 0; j < n; ++j, i += 4) parts[j] = record.getInt32(i, true);
  for (j = 0; j < m; ++j, i += 16) points[j] = [record.getFloat64(i, true), record.getFloat64(i + 8, true)];
  return n === 1 ? {
    type: "LineString",
    coordinates: points
  } : {
    type: "MultiLineString",
    coordinates: parts.map(function (i, j) {
      return points.slice(i, parts[j + 1]);
    })
  };
}
;
;// CONCATENATED MODULE: ./node_modules/shapefile/shp/concat.js



/* harmony default export */ function shp_concat(a, b) {
  var ab = new Uint8Array(a.length + b.length);
  ab.set(a, 0);
  ab.set(b, a.length);
  return ab;
}
;// CONCATENATED MODULE: ./node_modules/shapefile/shp/read.js


/* harmony default export */ function shp_read() {
  var that = this;
  ++that._index;
  return that._source.slice(12).then(function (array) {
    if (array == null) return {
      done: true,
      value: undefined
    };
    var header = view(array);

    // If the record starts with an invalid shape type (see #36), scan ahead in
    // four-byte increments to find the next valid record, identified by the
    // expected index, a non-empty content length and a valid shape type.
    function skip() {
      return that._source.slice(4).then(function (chunk) {
        if (chunk == null) return {
          done: true,
          value: undefined
        };
        header = view(array = shp_concat(array.slice(4), chunk));
        return header.getInt32(0, false) !== that._index ? skip() : read();
      });
    }

    // All records should have at least four bytes (for the record shape type),
    // so an invalid content length indicates corruption.
    function read() {
      var length = header.getInt32(4, false) * 2 - 4,
        type = header.getInt32(8, true);
      return length < 0 || type && type !== that._type ? skip() : that._source.slice(length).then(function (chunk) {
        return {
          done: false,
          value: type ? that._parse(view(shp_concat(array.slice(8), chunk))) : null
        };
      });
    }
    return read();
  });
}
;// CONCATENATED MODULE: ./node_modules/shapefile/shp/index.js









var parsers = {
  0: shp_null,
  1: point,
  3: polyline,
  5: polygon,
  8: multipoint,
  11: point,
  // PointZ
  13: polyline,
  // PolyLineZ
  15: polygon,
  // PolygonZ
  18: multipoint,
  // MultiPointZ
  21: point,
  // PointM
  23: polyline,
  // PolyLineM
  25: polygon,
  // PolygonM
  28: multipoint // MultiPointM
};

/* harmony default export */ function shapefile_shp(source) {
  source = slice_source_slice(source);
  return source.slice(100).then(function (array) {
    return new Shp(source, view(array));
  });
}
;
function Shp(source, header) {
  var type = header.getInt32(32, true);
  if (!(type in parsers)) throw new Error("unsupported shape type: " + type);
  this._source = source;
  this._type = type;
  this._index = 0;
  this._parse = parsers[type];
  this.bbox = [header.getFloat64(36, true), header.getFloat64(44, true), header.getFloat64(52, true), header.getFloat64(60, true)];
}
var shp_prototype = Shp.prototype;
shp_prototype.read = shp_read;
shp_prototype.cancel = cancel_cancel;
;// CONCATENATED MODULE: ./node_modules/shapefile/shapefile/cancel.js
function noop() {}
/* harmony default export */ function shapefile_cancel() {
  return Promise.all([this._dbf && this._dbf.cancel(), this._shp.cancel()]).then(noop);
}
;// CONCATENATED MODULE: ./node_modules/shapefile/shapefile/read.js
/* harmony default export */ function shapefile_read() {
  var that = this;
  return Promise.all([that._dbf ? that._dbf.read() : {
    value: {}
  }, that._shp.read()]).then(function (results) {
    var dbf = results[0],
      shp = results[1];
    return shp.done ? shp : {
      done: false,
      value: {
        type: "Feature",
        properties: dbf.value,
        geometry: shp.value
      }
    };
  });
}
;
;// CONCATENATED MODULE: ./node_modules/shapefile/shapefile/index.js




/* harmony default export */ function shapefile(shpSource, dbfSource, decoder) {
  return Promise.all([shapefile_shp(shpSource), dbfSource && shapefile_dbf(dbfSource, decoder)]).then(function (sources) {
    return new Shapefile(sources[0], sources[1]);
  });
}
function Shapefile(shp, dbf) {
  this._shp = shp;
  this._dbf = dbf;
  this.bbox = shp.bbox;
}
var shapefile_prototype = Shapefile.prototype;
shapefile_prototype.read = shapefile_read;
shapefile_prototype.cancel = shapefile_cancel;
;// CONCATENATED MODULE: ./node_modules/shapefile/index.js










function shapefile_open(shp, dbf, options) {
  if (typeof dbf === "string") {
    if (!/\.dbf$/.test(dbf)) dbf += ".dbf";
    dbf = path_source_path(dbf, options);
  } else if (dbf instanceof ArrayBuffer || dbf instanceof Uint8Array) {
    dbf = array_source_array(dbf);
  } else if (dbf != null) {
    dbf = stream_source_stream(dbf);
  }
  if (typeof shp === "string") {
    if (!/\.shp$/.test(shp)) shp += ".shp";
    if (dbf === undefined) dbf = path_source_path(shp.substring(0, shp.length - 4) + ".dbf", options).catch(function () {});
    shp = path_source_path(shp, options);
  } else if (shp instanceof ArrayBuffer || shp instanceof Uint8Array) {
    shp = array_source_array(shp);
  } else {
    shp = stream_source_stream(shp);
  }
  return Promise.all([shp, dbf]).then(function (sources) {
    var shp = sources[0],
      dbf = sources[1],
      encoding = "windows-1252";
    if (options && options.encoding != null) encoding = options.encoding;
    return shapefile(shp, dbf, dbf && new TextDecoder(encoding));
  });
}
function openShp(source, options) {
  if (typeof source === "string") {
    if (!/\.shp$/.test(source)) source += ".shp";
    source = path(source, options);
  } else if (source instanceof ArrayBuffer || source instanceof Uint8Array) {
    source = array(source);
  } else {
    source = stream(source);
  }
  return Promise.resolve(source).then(shp);
}
function openDbf(source, options) {
  var encoding = "windows-1252";
  if (options && options.encoding != null) encoding = options.encoding;
  encoding = new TextDecoder(encoding);
  if (typeof source === "string") {
    if (!/\.dbf$/.test(source)) source += ".dbf";
    source = path(source, options);
  } else if (source instanceof ArrayBuffer || source instanceof Uint8Array) {
    source = array(source);
  } else {
    source = stream(source);
  }
  return Promise.resolve(source).then(function (source) {
    return dbf(source, encoding);
  });
}
function node_modules_shapefile_read(shp, dbf, options) {
  return shapefile_open(shp, dbf, options).then(function (source) {
    var features = [],
      collection = {
        type: "FeatureCollection",
        features: features,
        bbox: source.bbox
      };
    return source.read().then(function read(result) {
      if (result.done) return collection;
      features.push(result.value);
      return source.read().then(read);
    });
  });
}

/***/ }),

/***/ 1620:
/***/ (function(__unused_webpack_module, exports) {

"use strict";
var __webpack_unused_export__;


__webpack_unused_export__ = ({
  value: true
});
// runtime helper for setting properties on components
// in a tree-shakable way
exports.Z = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

/***/ }),

/***/ 5280:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7658);
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _core_GraphicManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4094);
/* harmony import */ var _components_markerViewer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5869);
/* harmony import */ var _core_Graphic__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6857);
/* harmony import */ var _layerManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7952);
/* harmony import */ var _core_GraphicType__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8638);
/* harmony import */ var shapefile__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4952);
/* harmony import */ var _js_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(4996);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(7107);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_8__);










let graphicManager = undefined;
const console = window.console;
/* harmony default export */ __webpack_exports__.Z = ({
  name: "cesiumDraw",
  data() {
    return {
      visible: true,
      editMode: false,
      graphicType: undefined,
      menuSelected: {},
      layerManagerVisible: false,
      markerColor: "rgba(255, 255,255, 1)",
      fontSize: "28px",
      markerFont: "sans-serif",
      markerOptionsVisible: false,
      markerOption: "",
      lineColor: "rgba(247,224,32,1)",
      lineWidth: "3px",
      lineWidthList: ["1px", "2px", "3px", "4px", "5px", "6px", "8px", "10px", "12px"],
      lineStyleList: [{
        value: "solid",
        name: "实线"
      }, {
        value: "dash",
        name: "虚线"
      }, {
        value: "glow",
        name: "发光线"
      }, {
        value: "arrow",
        name: "箭头线"
      }],
      lineStyle: "solid",
      graphicHeight: "GROUND_ADN_MODEL",
      //   lineHeight: "GROUND_ADN_MODEL",
      //   polygonHeight: "GROUND_ADN_MODEL",
      heightList: [{
        value: "GROUND_ADN_MODEL",
        name: "依附地形和模型"
      }, {
        value: "GROUND",
        name: "依附地形"
      }, {
        value: "MODEL",
        name: "依附模型"
      }, {
        value: "NONE",
        name: "空间线"
      }],
      outlineWidth: "3px",
      outlineColor: "rgba(247,224,32,1)",
      polygonColor: "rgba(247,224,32,0.5)",
      outline: true,
      imags: ["./static/images/markers/1.png", "./static/images/markers/2.png", "./static/images/markers/3.png", "./static/images/markers/4.png", "./static/images/markers/5.png", "./static/images/markers/6.png", "./static/images/markers/7.png", "./static/images/markers/8.png"],
      fontSizeList: ["10px", "12px", "14px", "16px", "18px", "20px", "24px", "32px", "64px"],
      fontList: ["sans-serif", "宋体"],
      fontFamily: "sans-serif",
      modelMode: "Highlight",
      modelModeList: [{
        value: "Highlight",
        name: "高亮"
      }, {
        value: "Replace",
        name: "替换"
      }, {
        value: "Mix",
        name: "混合"
      }],
      modelColor: "#FFFFFF",
      modelMixed: 0.5,
      modelSelectPanelvisible: false,
      selectedModel: undefined
    };
  },
  computed: {
    defaultImage() {
      return 'this.src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB1UlEQVQ4T6XTMWgUQRQG4P/N3gaRSBpBEAMqrldkYyXu5VCMChZBEDxOsDIgKKSyECxTWERIYe2hRdoLeKV2RhCymwhy3E48b087C7EQtRDj7vyyg3dKDGyI087MN/97MyP4zyFF+5vNpnPEP3neZGlNlFwBoU/53rnBvn+AsPP+AFRWgUFNKVwgcVCAp4C0lJu10lTNiTGdYLLcyhF52e3uG8lUDVRnDXhagEP5YkM2pia9la0Jw413nhhzKfC9BxaI4t4aII3A9x6FcXJbBGNFZQ3jG3Yk0snjYMK7EelkHsBGMOEt7xSI4oQSxr3lin+8ngPG4MV2sQdgGPdvCviQkFsV/1jDAmu6f6c0wqWfm5grAiKd1EE0IbiaJ7VApN+egcF+KHWiCNhamgVekW4a9xdE4dsAeK716F7jLkJUNXOzmWq5/GG7vlggn4ji5BkEqzngQDYpXARQtdcErKRje2aq4+PfbaOJKcC5G/hH20NgPU7uU/AjJT47wD0Ao3+fSMgTBXwlOPvnBcoSweu/E/SuUdRFQ7YdwD6QopEnIzBtgfV2t8ySM5sSH3cF2D7oZD4jvpSAy0Wn5/MEPgGoDz/T6us3hx231KVgYSeAbTAx/Qs/Rdq4fXky6QAAAABJRU5ErkJggg=="';
    }
  },
  props: {
    attachment: undefined,
    extendMarkerImage: {
      type: Array,
      default: function () {
        return [];
      }
    },
    extendMarkerModel: {
      type: Array,
      default: function () {
        return [];
      }
    },
    tools: {
      default: undefined
    },
    viewer: {}
  },
  components: {
    MarkerViewer: _components_markerViewer__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z,
    layerManager: _layerManager__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z
  },
  mounted() {
    window.jq = (jquery__WEBPACK_IMPORTED_MODULE_8___default());
    const self = this;
    this.$nextTick(() => {
      (0,_js_utils__WEBPACK_IMPORTED_MODULE_7__/* .moveDiv */ .H5)("drawtoolPanel", "drawtoolHead");
      jquery__WEBPACK_IMPORTED_MODULE_8___default()("#drawtoolPanel .el-color-picker__icon").addClass("cesiumDrawFont iconcolor");
    });
    if (this.viewer instanceof Cesium.Viewer) {
      this.init(this.viewer);
    } else if (window.viewer instanceof Cesium.Viewer) {
      this.init(window.viewer);
    }
    this.$nextTick(() => {
      self.syncColor("markerColor", self.markerColor);
      self.syncColor("lineColor", self.lineColor);
      self.syncColor("polygonColor", self.polygonColor);
      self.syncColor("outlineColor", self.outlineColor);
      self.syncColor("modelColor", self.modelColor);
    });
  },
  methods: {
    init(viewer) {
      (0,_js_utils__WEBPACK_IMPORTED_MODULE_7__/* .checkViewer */ .vV)(viewer);
      if (this._viewer) {
        return;
      }
      const self = this;
      this._depthTestAgainstTerrain = viewer.scene.globe.depthTestAgainstTerrain;
      this.$refs.markerManager.init(viewer);
      graphicManager = new _core_GraphicManager__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z(viewer);
      this.selectedModel = this.extendMarkerModel.length ? this.extendMarkerModel[0].url : undefined;
      this.cesiumViewer = viewer;
      this._viewer = viewer;
      document.addEventListener("addEvent", function (e) {
        if (graphicManager.has(e.detail.mid) || self.$refs.markerManager.has(e.detail.mid)) {
          self.pushLayerManaer(e.detail.mtype, e.detail.mid, e.detail.mname);
        }
      });
      document.addEventListener("stopEdit", function () {
        self.menuSelected = {};
        self.editMode = false;
        self.cesiumViewer.scene.globe.depthTestAgainstTerrain = self._depthTestAgainstTerrain;
      });
      document.addEventListener("startEdit", function (e) {
        self.menuSelected = {};
        self.menuSelected[e.detail.graphicType] = true;
        self.setControlByEvent(e);
        self.editMode = true;
        if (/.*MODEL.*/.test(self.graphicHeight)) {
          self.cesiumViewer.scene.globe.depthTestAgainstTerrain = true;
        }
      });
      document.addEventListener("destroyEvent", function (e) {
        self.$refs.layerManager.drop({
          id: e.detail.mid
        });
        self.cesiumViewer.scene.globe.depthTestAgainstTerrain = self._depthTestAgainstTerrain;
      });
      document.addEventListener("deleteEvent", function (e) {
        self.menuSelected = {};
        self.editMode = false;
        self.$refs.layerManager.drop({
          id: e.detail.mid
        });
        self.cesiumViewer.scene.globe.depthTestAgainstTerrain = self._depthTestAgainstTerrain;
      });
    },
    syncColor(parent, color) {
      const parents = [parent];
      //marker和label共用同一种颜色
      if (parent === "labelColor") {
        parents.push("markerColor");
      } else if (parent === "markerColor") {
        parents.push("labelColor");
      }
      const eles = jquery__WEBPACK_IMPORTED_MODULE_8___default()(".el-color-picker__icon,.el-icon-arrow-down,.cesiumDrawFont iconcolor");
      for (let e of eles) {
        const target = jquery__WEBPACK_IMPORTED_MODULE_8___default()(e).parent().parent().parent().parent();
        if (target.length > 0 && parents.includes(target[0].id)) {
          jquery__WEBPACK_IMPORTED_MODULE_8___default()(e).css("color", color);
        }
      }
    },
    pushLayerManaer(type, id, name) {
      (0,_js_utils__WEBPACK_IMPORTED_MODULE_7__/* .checkComponent */ .FN)(this);
      this.$refs.layerManager.insertLayer(type, id, name);
    },
    modelThumb(item) {
      if (item.thumb) {
        return item.thumb;
      }
      return this.defaultImage;
    },
    getById(id) {
      (0,_js_utils__WEBPACK_IMPORTED_MODULE_7__/* .checkComponent */ .FN)(this);
      if (graphicManager && graphicManager.has(id)) {
        return graphicManager.get(id);
      } else if (this.$refs.markerManager) {
        return this.$refs.markerManager.getById(id);
      }
    },
    selectModel(item) {
      (0,_js_utils__WEBPACK_IMPORTED_MODULE_7__/* .checkComponent */ .FN)(this);
      this.selectedModel = item.url;
      this.modelSelectPanelvisible = false;
      this.$refs.markerManager.setModel({
        uri: item.url
      });
    },
    /**
     * 设置当前要素的样式
     */
    setControlByEvent(e) {
      (0,_js_utils__WEBPACK_IMPORTED_MODULE_7__/* .checkComponent */ .FN)(this);
      const viewer = this._viewer;
      if (e.detail.graphicType === "POLYGON") {
        const material = e.detail.material;
        const outlineColor = e.detail.outlineColor;
        if (material) {
          this.polygonColor = `rgba(${material.red * 255},${material.green * 255},${material.blue * 255},${material.alpha})`;
        }
        this.outline = e.detail.outline;
        if (outlineColor) {
          this.outlineColor = `rgba(${outlineColor.red * 255},${outlineColor.green * 255},${outlineColor.blue * 255},${outlineColor.alpha})`;
        }
        this.outlineWidth = e.detail.outlineWidth;
        this.graphicHeight = e.detail.heightReference;
      } else if (e.detail.graphicType === "POLYLINE") {
        this.graphicHeight = e.detail.heightReference;
        this.lineWidth = e.detail.width;
        const plmaterial = e.detail.material;
        if (plmaterial instanceof Cesium.PolylineDashMaterialProperty) {
          this.lineStyle = "dash";
        } else if (plmaterial instanceof Cesium.PolylineGlowMaterialProperty) {
          this.lineStyle = "glow";
        } else if (plmaterial instanceof Cesium.PolylineArrowMaterialProperty) {
          this.lineStyle = "arrow";
        } else {
          this.lineStyle = "solid";
        }
        this.lineColor = `rgba(${plmaterial.getValue(viewer.clock.currentTime).color.red * 255},${plmaterial.getValue(viewer.clock.currentTime).color.green * 255},${plmaterial.getValue(viewer.clock.currentTime).color.blue * 255},${plmaterial.getValue(viewer.clock.currentTime).color.alpha})`;
      }
    },
    stopOthers() {
      (0,_js_utils__WEBPACK_IMPORTED_MODULE_7__/* .checkComponent */ .FN)(this);
      //   this.menuSelected = {};
      //   const manager = graphicManager.editManager;
      //   manager && manager.destroy();
      this.$refs.markerManager.stopPick();
      graphicManager.destroyManager();
      graphicManager.editManager = undefined;
    },
    setLabel() {
      (0,_js_utils__WEBPACK_IMPORTED_MODULE_7__/* .checkComponent */ .FN)(this);
      let option;
      try {
        option = eval("(" + this.markerOption + ")");
        this.$refs.markerManager.setLabel(option);
      } catch (err) {
        console.log(err);
      }
      this.markerOptionsVisible = false;
    },
    updateMarker(mid, mname) {
      (0,_js_utils__WEBPACK_IMPORTED_MODULE_7__/* .checkComponent */ .FN)(this);
      if (mid) {
        mname = mname || "未命名";
        this.$refs.layerManager.rename(null, mid, mname);
      }
      this.editMode = false;
      this.menuSelected = {};
    },
    addMarker(mid, mname, mtype) {
      (0,_js_utils__WEBPACK_IMPORTED_MODULE_7__/* .checkComponent */ .FN)(this);
      this.pushLayerManaer(mtype, mid, mname);
      if (mtype === _core_GraphicType__WEBPACK_IMPORTED_MODULE_5__/* ["default"].MODEL */ .Z.MODEL) {
        this.editMode = false;
        this.menuSelected = {};
      }
    },
    closeLayerManager() {
      this.layerManagerVisible = false;
    },
    exportGraphic(type) {
      (0,_js_utils__WEBPACK_IMPORTED_MODULE_7__/* .checkComponent */ .FN)(this);
      if (type === "MARKER" || type === "LABEL") {
        this.$refs.markerManager.export(type);
      } else {
        graphicManager.export(type);
      }
    },
    importGraphic() {
      (0,_js_utils__WEBPACK_IMPORTED_MODULE_7__/* .checkComponent */ .FN)(this);
      document.getElementById("graphicuploadhandler").click();
    },
    importfp() {
      (0,_js_utils__WEBPACK_IMPORTED_MODULE_7__/* .checkComponent */ .FN)(this);
      const self = this;
      const evt = event ? event : window.event;
      // const cvt = convertTool(_this.viewer)
      const files = evt.target.files,
        ext = files[0].name.split(".")[1];
      if (files.length == 0) {
        return;
      }
      const reader = new FileReader();
      if (ext.toLowerCase() === "geojson") {
        reader.readAsText(files[0]);
        reader.onload = function () {
          // _this[_this.upload2].import(JSON.parse(this.result));
          if (!this.result) {
            return;
          }
          try {
            const features = JSON.parse(this.result).features;
            for (let feat of features) {
              if (feat.geometry.type.toUpperCase() === "POINT") {
                self.$refs.markerManager.import(feat);
              } else {
                graphicManager.import(feat);
              }
            }
          } catch (e) {
            console.log(e);
          }
          document.getElementById("graphicuploadhandler").value = "";
        };
      } else if (ext.toLowerCase() === "shp") {
        reader.readAsArrayBuffer(files[0]);
        reader.onload = function () {
          (0,shapefile__WEBPACK_IMPORTED_MODULE_6__/* .open */ .bA)(this.result).then(source => source.read().then(function log(result) {
            if (result.done) return false;
            const feat = result.value;
            if (feat.geometry.type === "Point") {
              self.$refs.markerManager.import(feat);
            } else {
              graphicManager.import(feat);
            }
            return source.read().then(log);
          })).catch(error => console.error(error.stack));
        };
        document.getElementById("graphicuploadhandler").value = "";
      }
    },
    editMarker(type) {
      (0,_js_utils__WEBPACK_IMPORTED_MODULE_7__/* .checkComponent */ .FN)(this);
      this.editMode = true;
      // this.stopOthers();
      if (graphicManager.editManager) {
        graphicManager.editManager.stopEdit();
        graphicManager.editManager = undefined;
      }
      this.menuSelected = {};
      this.menuSelected[type] = true;
    },
    clearGraphic() {
      this.$refs.markerManager.removeAll();
      graphicManager.removeAll();
    },
    deleteMarker(id) {
      (0,_js_utils__WEBPACK_IMPORTED_MODULE_7__/* .checkComponent */ .FN)(this);
      this.menuSelected["MARKER"] = false;
      this.editMode = false;
      this.$refs.layerManager.drop(id);
    },
    locateGraphic(id) {
      (0,_js_utils__WEBPACK_IMPORTED_MODULE_7__/* .checkComponent */ .FN)(this);
      if (graphicManager.manager.has(id)) {
        const manager = graphicManager.manager.get(id);
        manager.zoomTo();
      } else {
        this.$refs.markerManager.zoomTo(id);
      }
      this.$emit("locateEvent", id);
    },
    editGraphic(id) {
      (0,_js_utils__WEBPACK_IMPORTED_MODULE_7__/* .checkComponent */ .FN)(this);
      if (graphicManager.manager.has(id)) {
        // const manager = graphicManager.manager.get(id);
        graphicManager.edit(id);
      } else {
        this.$refs.markerManager.edit(id);
      }
      this.$emit("editEvent", id);
    },
    selectGraphic(id, state) {
      (0,_js_utils__WEBPACK_IMPORTED_MODULE_7__/* .checkComponent */ .FN)(this);
      if (id === "marker") {
        this.$refs.markerManager.select(_core_GraphicType__WEBPACK_IMPORTED_MODULE_5__/* ["default"].MARKER */ .Z.MARKER, undefined, state);
      } else if (id === "label") {
        this.$refs.markerManager.select(_core_GraphicType__WEBPACK_IMPORTED_MODULE_5__/* ["default"].LABEL */ .Z.LABEL, undefined, state);
      } else if (id === "model") {
        this.$refs.markerManager.select(_core_GraphicType__WEBPACK_IMPORTED_MODULE_5__/* ["default"].MODEL */ .Z.MODEL, undefined, state);
      } else if (id === "polyline") {
        graphicManager.select(_core_GraphicType__WEBPACK_IMPORTED_MODULE_5__/* ["default"].POLYLINE */ .Z.POLYLINE, undefined, state);
      } else if (id === "polygon") {
        graphicManager.select(_core_GraphicType__WEBPACK_IMPORTED_MODULE_5__/* ["default"].POLYGON */ .Z.POLYGON, undefined, state);
      } else {
        if (graphicManager.manager.has(id)) {
          graphicManager.select(undefined, id, state);
        } else {
          this.$refs.markerManager.select(undefined, id, state);
        }
      }
      this.$emit("selectEvent", id, state);
    },
    deleteGraphic(id) {
      (0,_js_utils__WEBPACK_IMPORTED_MODULE_7__/* .checkComponent */ .FN)(this);
      if (graphicManager.manager.has(id)) {
        const manager = graphicManager.manager.get(id);
        manager.destroy();
        graphicManager.manager.delete(id);
      } else {
        this.$refs.markerManager.drop(id);
      }
      this.$emit("deleteEvent", id);
      // this.$refs.layerManager.deleteNode(id)
    },

    renameGraphic(id, name) {
      (0,_js_utils__WEBPACK_IMPORTED_MODULE_7__/* .checkComponent */ .FN)(this);
      const attr = /(.*?)</g.exec(name);
      name = /(.*?)</g.test(name) ? attr[1] : name;
      if (name === "未命名") {
        name = "";
      }
      let oname;
      if (graphicManager.has(id)) {
        oname = graphicManager.get(id).mname;
        graphicManager.rename(id, name);
      } else {
        oname = this.$refs.markerManager.markerManager.get(id).mname;
        this.$refs.markerManager.rename(id, name);
      }
      this.$emit("renameEvent", id, oname);
    },
    menuAction(menu) {
      (0,_js_utils__WEBPACK_IMPORTED_MODULE_7__/* .checkComponent */ .FN)(this);
      const graphic = ["MARKER", "POLYLINE", "POLYGON", "LABEL", "MODEL"];
      const bool = this.menuSelected[menu];
      this.stopOthers(menu);
      this.menuSelected = {};
      graphicManager && (graphicManager.tip.visible = false);
      if (bool) {
        this.menuSelected[menu] = false;
      } else {
        this.menuSelected[menu] = true;
      }
      if (graphic.includes(menu)) {
        if (this.graphicType === menu) {
          this.editMode = !this.editMode;
        } else {
          this.editMode = true;
        }
        this.graphicType = menu;
      } else {
        this.editMode = false;
      }
      if (/.*MODEL*/.test(this.graphicHeight)) {
        if (!["MARKER", "LABEL", "MODEL", "LAYER"].includes(menu))
          //依附模型
          //几何图形要依附于模型必须开启depthTestAgainstTerrain
          this.cesiumViewer.scene.globe.depthTestAgainstTerrain = true;
      } else {
        //viewer.scene.globe.depthTestAgainstTerrain = this._depthTestAgainstTerrain;
      }
      switch (menu) {
        case "MARKER":
          if (this.editMode) {
            this.$refs.markerManager.pick("marker");
          } else {
            this.$refs.markerManager.cancelMark();
          }
          break;
        case "POLYLINE":
          this.heightList[3].name = "空间线";
          if (this.editMode) {
            graphicManager.heightReference = this.graphicHeight;
            graphicManager.material = Cesium.Color.fromCssColorString(this.lineColor);
            graphicManager.createPolyline();
          } else {
            graphicManager.destroyManager();
          }
          break;
        case "POLYGON":
          this.heightList[3].name = "空间面";
          if (this.editMode) {
            //   this.lineHeight=undefined
            graphicManager.heightReference = this.graphicHeight;
            const option = _core_Graphic__WEBPACK_IMPORTED_MODULE_3__/* .CesiumPolygon.defaultStyle */ .ss.defaultStyle;
            option.outline = this.outline;
            option.outlineColor = Cesium.Color.fromCssColorString(this.outlineColor);
            option.outlineWidth = parseInt(this.outlineWidth);
            // option.color = Cesium.Color.fromCssColorString(this.polygonColor);
            graphicManager.material = Cesium.Color.fromCssColorString(this.polygonColor);
            graphicManager.style = option;
            graphicManager.createPolygon();
          } else {
            graphicManager.destroyManager();
          }
          break;
        case "LABEL":
          if (this.editMode) {
            this.$refs.markerManager.pick("label");
          } else {
            this.$refs.markerManager.cancelMark();
          }
          break;
        case "MODEL":
          if (this.editMode) {
            if (this.extendMarkerModel.length < 1) {
              this.editMode = false;
              throw new Error("没有可用的模型");
            }
            this.$refs.markerManager.setModel({
              uri: this.selectedModel
            });
            this.$refs.markerManager.pick("model");
          } else {
            this.$refs.markerManager.cancelMark();
          }
      }
    },
    setLineMaterial(material, color) {
      (0,_js_utils__WEBPACK_IMPORTED_MODULE_7__/* .checkComponent */ .FN)(this);
      switch (material) {
        case "solid":
          graphicManager.material = color;
          break;
        case "dash":
          graphicManager.material = new Cesium.PolylineDashMaterialProperty({
            color: color
          });
          break;
        case "glow":
          graphicManager.material = new Cesium.PolylineGlowMaterialProperty({
            color: color
          });
          break;
        case "arrow":
          graphicManager.material = new Cesium.PolylineArrowMaterialProperty(color);
          break;
      }
    }
  },
  watch: {
    fontSize(n) {
      n = parseInt(n);
      if (isNaN(n)) {
        n = "18";
      }
      n = n + "px";
      // console.log(this.$refs.markerManager.getFont())
      const fontFamily = this.menuSelected["MARKER"] ? this.markerFont : this.fontFamily;
      this.$refs.markerManager.setFont(n + " " + fontFamily);
    },
    markerColor(n) {
      if (!n) {
        return;
      }
      this.$refs.markerManager.setColor(Cesium.Color.fromCssColorString(n));
      this.syncColor("markerColor", n);
    },
    graphicHeight(n) {
      if (n === undefined) {
        return;
      }
      // if (/.*MODEL*/.test(n)) {
      //   //依附模型
      //   cesiumViewer.scene.globe.depthTestAgainstTerrain = true;
      // } else {
      //   cesiumViewer.scene.globe.depthTestAgainstTerrain = this._depthTestAgainstTerrain;
      // }
      graphicManager.heightReference = n;
    },
    lineColor(n) {
      if (!n) {
        return;
      }
      const color = Cesium.Color.fromCssColorString(n);
      const matrial = graphicManager.editManager.material;
      let materialStyle = "solid";
      if (matrial instanceof Cesium.PolylineDashMaterialProperty) {
        materialStyle = "dash";
      } else if (matrial instanceof Cesium.PolylineGlowMaterialProperty) {
        materialStyle = "glow";
      } else if (matrial instanceof Cesium.PolylineArrowMaterialProperty) {
        materialStyle = "arrow";
      }
      //   matrial.color = Cesium.clone(color);
      this.setLineMaterial(materialStyle, color);
      this.syncColor("lineColor", n);
    },
    lineStyle(n) {
      if (!this.lineColor) {
        return;
      }
      const color = Cesium.Color.fromCssColorString(this.lineColor);
      this.setLineMaterial(n, color);
    },
    lineWidth(n) {
      let width = parseInt(n);
      if (isNaN(width)) {
        width = 3;
      }
      graphicManager.style = {
        width: width
      };
    },
    outline(n) {
      if (n) {
        graphicManager.editManager.createOutline();
        const color = Cesium.Color.fromCssColorString(this.outlineColor);
        const width = parseInt(this.outlineWidth) || 3;
        graphicManager.editManager.outline = n;
        graphicManager.style = {
          outline: true,
          outlineWidth: width,
          outlineColor: color
        };
      } else {
        graphicManager.editManager.removeOutline();
      }
    },
    polygonColor(n) {
      if (!n) {
        return;
      }
      const color = Cesium.Color.fromCssColorString(n);
      graphicManager.material = color;
      this.syncColor("polygonColor", n);
    },
    outlineColor(n) {
      if (!n) {
        return;
      }
      const color = Cesium.Color.fromCssColorString(n);
      graphicManager.style = {
        outlineColor: color
      };
      this.syncColor("outlineColor", n);
    },
    outlineWidth(n) {
      const width = parseInt(n) || 3;
      graphicManager.style = {
        outlineWidth: width
      };
    },
    fontFamily(n) {
      let size = parseInt(this.fontSize);
      if (isNaN(size)) {
        size = "18";
      }
      size = size + "px";
      // console.log(this.$refs.markerManager.getFont())

      this.$refs.markerManager.setFont(size + " " + n);
    },
    modelColor(n) {
      if (!n) {
        return;
      }
      const color = Cesium.Color.fromCssColorString(n);
      this.$refs.markerManager.setModel({
        color: color
      });
      this.syncColor("modelColor", n);
    },
    modelMode(n) {
      const mode = Cesium.ColorBlendMode[n.toUpperCase()];
      this.$refs.markerManager.setModel({
        mode: mode
      });
    },
    modelMixed(n) {
      this.$refs.markerManager.setModel({
        mixed: n
      });
    }
  }
});

/***/ }),

/***/ 6857:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  ZT: function() { return /* binding */ CesiumBillboard; },
  ob: function() { return /* binding */ CesiumLabel; },
  VB: function() { return /* binding */ CesiumModel; },
  MP: function() { return /* binding */ CesiumPoint; },
  ss: function() { return /* binding */ CesiumPolygon; },
  Jh: function() { return /* binding */ CesiumPolyline; }
});

// UNUSED EXPORTS: default

;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/typeof.js
function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/toPrimitive.js

function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js


function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js

function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.push.js
var es_array_push = __webpack_require__(7658);
// EXTERNAL MODULE: ./src/core/GraphicType.js
var GraphicType = __webpack_require__(8638);
// EXTERNAL MODULE: ./src/js/utils.js
var utils = __webpack_require__(4996);
;// CONCATENATED MODULE: ./src/core/Graphic.js



const console = window.console;

class BaseGraphic {
  constructor(viewer) {
    if (viewer instanceof Cesium.Viewer === false) {
      throw new Error('viewer不是一个有效的Cesium Viewer对象.');
    }
    this.viewer = viewer;
    this._type = undefined;
    this._gvtype = undefined;
    this._gvid = undefined;
    this._name = undefined;
    this._attachment = [];
  }
  get attachment() {
    return this._attachment;
  }
  set attachment(v) {
    this._attachment = v;
  }
  get type() {
    return this._type;
  }
  get mtype() {
    return this._gvtype;
  }
  set mtype(v) {
    this._gvtype = v;
  }
  get mid() {
    return this._gvid;
  }
  set mid(v) {
    this._gvid = v;
    if (this.graphic) {
      this.graphic.mid = this._gvid;
    }
  }
  get mname() {
    return this._name;
  }
  set mname(v) {
    this._name = v;
    if (this.graphic) {
      this.graphic.mname = this.mname;
      if (this.graphic.label) {
        this.graphic.label.text = v;
      }
    }
  }
  get show() {
    if (this.graphic) {
      return this.graphic.show;
    }
    return false;
  }
  set show(v) {
    if (this.graphic) {
      this.graphic.show = v;
    }
  }
  zoomTo() {
    if (this.graphic) {
      this.viewer.flyTo(this.graphic);
    }
  }
  coordinates() {
    if (this.position instanceof Cesium.Cartesian3) {
      const coor = utils/* CVT.cartesian2Degrees */.AN.cartesian2Degrees(this.position, this.viewer);
      return [coor.lon, coor.lat, coor.height];
    } else if (this.positions instanceof Array) {
      const pts = [];
      for (let p of this.positions) {
        const c = utils/* CVT.cartesian2Degrees */.AN.cartesian2Degrees(p, this.viewer);
        pts.push([c.lon, c.lat, c.height]);
      }
      if (this.type === 'POLYLINE') {
        return pts;
      } else {
        return [pts];
      }
    }
  }
  toGeoJson() {
    const type = {
      'MARKER': 'Point',
      'POLYLINE': 'LineString',
      'POLYGON': 'POLYGON',
      'LABEL': 'Point'
    };
    return {
      "type": "Feature",
      "properties": {
        name: this.mname,
        mtype: this.mtype
      },
      "geometry": {
        "type": type[this.type],
        "coordinates": this.coordinates()
      }
    };
  }
}
class CesiumBillboard extends BaseGraphic {
  /**
   * Cesium Marker
   * @param {Viewer} viewer Cesium Viewer
   * @param {*} options describles a billboard.
   * 遵循和Cesium BillboardGraphic相同的方式.
   */
  constructor(viewer, options, labelOption = CesiumBillboard.defaultLabelStyle) {
    super(viewer);
    this.viewer = viewer;
    this._type = 'MARKER';
    this.mtype = GraphicType/* default.MARKER */.Z.MARKER;
    this.position = options.position;
    options.image = options.image || CesiumBillboard.defaultStyle.image;
    labelOption.text = options.label;
    this.labelOptions = labelOption;
    const self = this;
    this.options = {
      mname: this._name,
      mtype: this.mtype,
      mid: this.mid,
      position: self.position,
      billboard: options,
      label: labelOption
    };
    this.graphic = undefined;
    this.name = '';
    this.description = '';
    this.create();
  }
  get text() {
    return this.graphic.label.text;
  }
  set text(v) {
    this.graphic.label.text = v;
    this.mname = v;
  }
  get font() {
    return this.graphic.label.font.getValue(this.viewer.clock.currentTime);
  }
  set font(font) {
    this.graphic.label.font = font;
  }
  get color() {
    return this.graphic.label.fillColor;
  }
  set color(color) {
    this.graphic.label.fillColor = color;
  }
  /**
   *
   * @param {*} option 定义一个LabelGraphic
   */
  setLabel(option) {
    if (!this.graphic) {
      return;
    }
    const keys = Object.keys(option);
    for (let key of keys) {
      this.graphic.label[key] = option[key];
    }
  }
  create() {
    this.graphic = this.viewer.entities.add(this.options);
  }
  remove() {
    if (this.viewer) {
      this.viewer.entities.remove(this.graphic);
    }
    this.graphic = undefined;
  }
  updateText(text, description) {
    if (this.graphic) {
      this.graphic.label.text = text;
      this.name = text;
      this.description = description;
      this.mname = text;
    }
  }
  updateImage(img) {
    if (this.graphic) {
      if (img === undefined) {
        this.graphic.label.pixelOffset = undefined;
        this.graphic.billboard.image = undefined;
      } else {
        this.graphic.label.pixelOffset = this.labelOptions.pixelOffset;
        this.graphic.billboard.image = img;
      }
    }
  }
  updatePosition(position) {
    this.position = position;
  }
  stopEdit() {
    if (this.graphic && this.graphic.position) {
      this.graphic.position = new Cesium.ConstantProperty(this.position);
    }
  }
  startEdit() {
    const self = this;
    if (this.graphic) {
      this.graphic.position = new Cesium.CallbackProperty(function () {
        return self.position;
      }, false);
    }
  }
  destroy() {
    this.remove();
    this.viewer = undefined;
    this.options = undefined;
    this.position = undefined;
  }
  static fromDegrees(viewer, position) {
    const option = CesiumBillboard.defaultStyle;
    option.position = Cesium.Cartesian3.fromDegrees(position.lon, position.lat, position.height);
    return new CesiumBillboard(viewer, option);
  }
  static fromRadians(viewer, position) {
    const option = CesiumBillboard.defaultStyle;
    option.position = Cesium.Cartesian3.fromRadians(position.lon, position.lat, position.height);
    return new CesiumBillboard(viewer, option);
  }
}
_defineProperty(CesiumBillboard, "defaultStyle", {
  image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkJEN0VBRDA0MzJCRTExRUE5MjY2QTg3OUVFNjUyQzhCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkJEN0VBRDA1MzJCRTExRUE5MjY2QTg3OUVFNjUyQzhCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QkQ3RUFEMDIzMkJFMTFFQTkyNjZBODc5RUU2NTJDOEIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QkQ3RUFEMDMzMkJFMTFFQTkyNjZBODc5RUU2NTJDOEIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6qzlgwAAADR0lEQVR42uxXTUhUURQ+88aZ93JSZyiDCCkt+0VLtGzRn/QntotMoqBEol1Ui9JVtNCsoKJNSFgQREjRKiXF/mxToIQK2YBZIRKlaE1pb+Y5M33n+dRJfTN3ZoLZdOG7986dc75z5v6cc8YSDAYpkU2iBLeEO5AUpfxy4BCwHVgLLDTWh4B3wEvgPvBBlNAy1x1w3fP89XnkcOoyDJeBA6wTgZMJHwJnwfNpBk/0DkCpFEM9kKL6iR591qixX6OukQB9+x3QZRbNkyjXJdG+DBvtX2ojxaov/wQqwPUgZgegUIHhFss19o9TVYdK/aOBsD8/wyHRxXwFziRN7sZx8NWbOWB6CSFchKGOjZ9/q9KRtrGIxrmxDMuyjnFcdQaX+B3g7QZ6gCWXur1U2+WN6YZX5sp0Lkfm6YBxaT2iO3CKjbcP+elKtzfmJ8a6zMFcwGnRHVB4J/mJFbeM0ptBf1zvvDDdSk/2OCafagagRtqBvWy8c9gft3FuzMFcRswoFjmC3dy1DIybktqhVVugUF9pCn0EeG4PE1NDuHaJOFDA3auv5r/+Qp5CJ1bZyWW3kBPgedV62VQ+hGujiANZ3Lk95g6UZdlmrR1dYTeVD+HKFHHAyd2w+u/SdAiXS8QBXVpJMg/5DX3arLW7vZqpvGyd4lJFHOCsRuuc5reKo1yd20fffUEdPK/pVE3lc1xTXL0i6fgxsKEs02b6DH2IyJXtqg6RdjDTFsodMRAtBvq8AVJ2NP2i9z8CcZ3/6jSJXpTMJ1nSt58v+JdIR8AC1VCg21uSKdVmidk469aDQ56wUj3TeLhkxHvWCmx7jWMoez5GHi0YtfGGomTanK4XB21GENKEkhHyt2ZUP24maC120Mo08fKRZVnHMO5mLoNTvB6AwiCGnZyWs1MlegbC8mx72HqMvzuGgMSyrIPWzRwGV/RVMRQ5j2/laOpAXLi6SaEmZLb8BdZZsrzG310rVMgxEUOesq7BEXdRynG2Bjij66BrQol2o2eiVji5RqYSlGCW6UB2nesR8PjiLkpnEHCqvmM8VTJ5QeXQbzbRnyPuwoEo4QRuAv7gdPMba85o+WJxYBJ5QDPQYsxj4rH8/3OaaAf+CDAAVvn1VEy/MOwAAAAASUVORK5CYII=',
  verticalOrigin: Cesium.VerticalOrigin.BASELINE
});
_defineProperty(CesiumBillboard, "defaultLabelStyle", {
  font: '28px sans-serif',
  fillColor: Cesium.Color.WHITE,
  showBackground: true,
  style: Cesium.LabelStyle.FILL_AND_OUTLINE,
  // outlineWidth: 2,
  verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
  pixelOffset: new Cesium.Cartesian2(20, -30),
  heightReference: Cesium.HeightReference.NONE
});
class CesiumPoint extends BaseGraphic {
  /**
   * Cesium PointGraphic
   * @param {Viewer} viewer Cesium.Viewer
   * @param {Object} options Describes a point. positions定义它的位置信息
   * （positions为数组将同时创建多个Point），
   * 属性信息的定义和Cesium.PointGraphics相同
   */
  constructor(viewer, options = CesiumPoint.defaultStyle) {
    super(viewer);
    this._type = 'POINT';
    this.mtype = GraphicType/* default.POINT */.Z.POINT;
    //allow mutiple to be created points at one time
    this.positions = options.positions;
    //only one point
    const self = this;
    if (this.positions instanceof Cesium.Cartesian3) {
      this.options = {
        mname: this._name,
        mid: this._gvid,
        mtype: this._gvtype,
        position: new Cesium.CallbackProperty(function () {
          return self.positions;
        }, false),
        point: options
      };
    }
    //mutiple points
    else if (this.positions instanceof Array) {
      this.options = [];
      for (let i = 0; i < this.positions.length; i++) {
        const point = {
          mname: this._name,
          mid: this._gvid,
          mtype: this._gvtype,
          position: new Cesium.CallbackProperty(function () {
            return self.positions[i];
          }, false),
          point: options
        };
        this.options.push(point);
      }
    } else {
      throw new Error('options参数错误.');
    }
    this.graphic = [];
    this.create();
  }
  create() {
    if (this.options instanceof Array) {
      this.graphic = this.options.map(_ => {
        const entity = this.viewer.entities.add(_);
        return entity;
      });
    } else {
      this.graphic = this.viewer.entities.add(this.options);
    }
  }
  remove() {
    if (this.graphic instanceof Array) {
      this.graphic.map(_ => {
        this.viewer.entities.remove(_);
      });
    } else {
      this.viewer.entities.remove(this.graphic);
    }
    this.graphic = undefined;
  }
  startEdit() {
    if (this.graphic instanceof Cesium.Entity) {
      this.graphic.position = new Cesium.CallbackProperty(() => {
        return this.positions;
      }, false);
    } else if (this.graphic instanceof Array) {
      const count = this.graphic.length;
      for (let i = 0; i < count; i++) {
        this.graphic[i].position = new Cesium.CallbackProperty(() => {
          return this.positions[i];
        }, false);
      }
    }
  }
  /**
   * 在确定点的位置之后，将CallBackProperty重置为一个普通对象
   * 因为当点足够多时,CallBackProperty会在一定程度上影响系统性能，
   * 后面的Polyline，Polygon也是出于同样的考虑
   * ps:后来我发现并没有必要，因为Entity会强制转为Property
   */
  stopEdit() {
    if (this.graphic instanceof Cesium.Entity) {
      this.graphic.position = this.graphic.position.getValue(this.viewer.clock.currentTime);
    } else if (this.graphic instanceof Array) {
      this.graphic = this.graphic.map(_ => {
        return _.position = _.position.getValue(this.viewer.clock.currentTime);
      });
    }
  }

  /**
   * 判断两个点是否在同一位置
   * @param {*} node1
   * @param {*} node2
   */
  static equalPosition(node1, node2) {
    if (!(node1 instanceof Cesium.Cartesian3 && node2 instanceof Cesium.Cartesian3)) {
      throw new Error('node不是一个有效的Cartesian3对象');
    }
    return node1.x === node2.x && node1.y === node2.y && node1.z === node2.z;
  }
  static setStyle(node, option) {
    const keys = Object.keys(option);
    for (let key of keys) {
      node.point[key] = option[key];
    }
  }
  contain(node) {
    if (this.graphic instanceof Cesium.Cartesian3) {
      return this.graphic === node;
    } else if (this.graphic instanceof Array) {
      const count = this.graphic.length;
      for (let i = 0; i < count; i++) {
        if (this.graphic[i] === node) {
          return i;
        }
      }
    }
    return -1;
  }
  static fromDegrees(viewer, positions) {
    const options = CesiumPoint.defaultStyle;
    if (positions instanceof Array) {
      options.positions = positions.map(_ => {
        if (_.lon === undefined || _.lat === undefined) {
          throw new Error('参数错误');
        }
        return Cesium.Cartesian3.fromDegrees(_.lon, _.lat, _.height);
      });
    } else {
      if (positions.lon === undefined || positions.lat === undefined) {
        throw new Error('参数错误');
      }
      options.positions = Cesium.Cartesian3.fromDegrees(positions.lon, positions.lat, positions.height);
    }
    return new CesiumPoint(viewer, options);
  }
  static fromRadians(viewer, positions) {
    const options = CesiumPoint.defaultStyle;
    if (positions instanceof Array) {
      options.positions = positions.map(_ => {
        if (_.lon === undefined || _.lat === undefined) {
          throw new Error('参数错误');
        }
        return Cesium.Cartesian3.fromRadians(_.lon, _.lat, _.height);
      });
    } else {
      if (positions.lon === undefined || positions.lat === undefined) {
        throw new Error('参数错误');
      }
      options.positions = Cesium.Cartesian3.fromRadians(options.positions.lon, options.positions.lat, options.positions.height);
    }
    return new CesiumPoint(viewer, options);
  }
  static isCesiumPoint(obj) {
    if (Cesium.defined(obj) && obj.id && obj.id.mtype === GraphicType/* default.POINT */.Z.POINT) {
      return true;
    }
    return false;
  }
  destroy() {
    this.remove();
    this.viewer = undefined;
    this.options = undefined;
    this.graphic = undefined;
  }
}
_defineProperty(CesiumPoint, "defaultStyle", {
  color: Cesium.Color.RED,
  pixelSize: 5,
  outlineColor: Cesium.Color.WHITE,
  outlineWidth: 3,
  heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
});
_defineProperty(CesiumPoint, "editStyle", {
  color: Cesium.Color.RED,
  pixelSize: 5,
  outlineColor: Cesium.Color.AQUA,
  outlineWidth: 3,
  heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
});
_defineProperty(CesiumPoint, "selectedStyle", {
  color: Cesium.Color.AQUA,
  pixelSize: 5,
  outlineColor: Cesium.Color.AQUA,
  outlineWidth: 3
});
class CesiumPolyline extends BaseGraphic {
  /**
   * Cesium PolylineGraphic
   * @param {Viewer} viewer Cesium.Viewer
   * @param {Object} options Describes a polyline. positions定义它的顶点集合，
   * 属性定义遵循和Cesium.PolylineGraphic相同的定义方式。
   */
  constructor(viewer, options = CesiumPolyline.defaultStyle) {
    super(viewer);
    this._type = 'POLYLINE';
    this.mtype = GraphicType/* default.POLYLINE */.Z.POLYLINE;
    this.positions = options.positions || [];
    const self = this;
    const _update = function () {
      return self.positions;
    };
    this.options = {
      mname: this._name,
      mid: this._gvid,
      mtype: this._gvtype,
      polyline: options,
      properties: options.properties
    };
    delete options.properties;
    this.options.polyline.positions = new Cesium.CallbackProperty(_update, false);
    this.graphic = undefined;
    this.nodeGraphic = undefined;
    this.node = false;
    this.create();
  }
  get material() {
    if (this.graphic) {
      return this.graphic.polyline.material; //.getValue()
    }

    return undefined;
  }
  get width() {
    if (this.graphic) {
      return this.graphic.polyline.width.getValue(this.viewer.clock.currentTime);
    }
    return undefined;
  }
  get properties() {
    if (this.graphic) {
      return this.graphic.properties;
    }
    return false;
  }
  set properties(v) {
    if (this.graphic) {
      this.graphic.properties = v;
    }
  }
  addNode(node) {
    if (node instanceof Cesium.Cartesian3) {
      this.positions.push(node);
    }
  }
  popNode() {
    this.positions.pop();
  }
  updateNode(index, node) {
    if (index < 0 || index > this.positions.length - 1) {
      throw new Error('无效的index');
    }
    if (node instanceof Cesium.Cartesian3 === false) {
      throw new Error('无效的node');
    }
    this.positions[index] = node;
  }
  dropNode(index) {
    this.positions.splice(index, 1);
  }
  create() {
    if (this.viewer) {
      this.graphic = this.viewer.entities.add(this.options);
      // this.graphic.mtype = 'CesiumPolyline'
    }
  }
  /**
   *
   * @param {Object} options describles a points.
   * 遵循和Cesiun.PointGraphic相同的定义方式
   */
  createNode(options = CesiumPoint.defaultStyle) {
    options.positions = this.positions;
    options.clampToGround = this.options.polyline.clampToGround;
    this.nodeGraphic = new CesiumPoint(this.viewer, options);
    this.node = true;
  }
  /**
   * 对于Polyline的编辑，需要做下面几件事
   * 1.要素的positions要变成CallbackProperty
   * 2.创建要素节点
   * 3.要素高亮显示
   */
  startEdit() {
    if (!Cesium.defined(this.graphic)) {
      return;
    }
    // this.remove()
    // const self = this
    // const attrs = Object.keys(CesiumPolyline.selectedStyle)
    // for (let attr of attrs) {
    //     this.graphic.polyline[attr] = CesiumPolyline.selectedStyle[attr]
    // }
    //this.graphic.polyline.material = CesiumPolyline.selectedStyle.material

    this.graphic.polyline.positions = new Cesium.CallbackProperty(() => {
      return this.positions;
    }, false);
    if (this.node === false) {
      this.createNode();
    }
    // const evt = new CustomEvent('startEdit', {
    //     detail: { graphicType: 'POLYLINE' }
    // })
    // document.dispatchEvent(evt)
  }

  stopEdit() {
    if (this.graphic instanceof Cesium.Entity) {
      this.graphic.polyline.positions = this.positions;
      // this.graphic.polyline.material = this.options.polyline.material
    }

    this.removeNode();
    // const endEvent = new CustomEvent('stopEdit')
    // document.dispatchEvent(endEvent)
    // window.aa = this.graphic
  }

  remove() {
    if (this.viewer) {
      this.viewer.entities.remove(this.graphic);
      this.graphic = undefined;
      this.removeNode();
    }
  }
  removeNode() {
    if (this.node) {
      this.nodeGraphic.remove();
      // this.nodeGraphic = undefined
      this.node = false;
    }
  }
  setMaterial(material) {
    this.graphic.polyline.material = material;
  }
  static fromDegrees(viewer, positions, properties = {}) {
    positions = positions.map(_ => {
      return Cesium.Cartesian3.fromDegrees(_.lon, _.lat, _.height);
    });
    const options = {
      positions,
      ...CesiumPolyline.defaultStyle,
      properties
    };
    const pl = new CesiumPolyline(viewer, options);
    pl.stopEdit();
    return pl;
  }
  static fromRadians(viewer, positions) {
    positions = positions.map(_ => {
      return Cesium.Cartesian3.fromRadians(_.lon, _.lat, _.height);
    });
    const options = {
      positions,
      ...CesiumPolyline.defaultStyle
    };
    const pl = new CesiumPolyline(viewer, options);
    return pl;
  }
  destroy() {
    this.remove();
    this.viewer = undefined;
    this.options = undefined;
    this.positions = undefined;
    if (this.nodeGraphic) {
      this.nodeGraphic.destroy();
    }
    this.nodeGraphic = undefined;
  }
}
_defineProperty(CesiumPolyline, "defaultStyle", {
  clampToGround: true,
  material: Cesium.Color.fromCssColorString('rgba(247,224,32,1)'),
  width: 3
});
_defineProperty(CesiumPolyline, "selectedStyle", {
  clampToGround: true,
  material: Cesium.Color.AQUA,
  width: 3
});
class CesiumPolygon extends BaseGraphic {
  /**
   * Cesium PolygonGraphic
   * @param {Viewer} viewer Cesium.Viewer
   * @param {Object} options describles a polygon.
   * positions定义其位置信息， 属性信息遵循和Cesium.PolygonGraphic相同的定义方式
   */
  constructor(viewer, options = CesiumPolygon.defaultStyle) {
    super(viewer);
    this._type = 'POLYGON';
    this.mtype = GraphicType/* default.POLYGON */.Z.POLYGON;
    this.positions = options.positions || [];
    this.nodePositions = [...this.positions];
    const self = this;
    this.options = {
      mid: this.mid,
      mtype: this.mtype,
      polygon: {
        hierarchy: new Cesium.CallbackProperty(function () {
          return new Cesium.PolygonHierarchy(self.positions);
        }, false),
        ...options
      },
      properties: options.properties
    };
    delete options.properties;
    this.node = false;
    this.graphic = undefined;
    this.nodeGraphic = undefined;
    this.outlineGraphic = undefined;
    this.outline = options.outline;
    this.create();
  }
  get properties() {
    if (this.graphic) {
      return this.graphic.properties;
    }
    return false;
  }
  set properties(v) {
    if (this.graphic) {
      this.graphic.properties = v;
    }
  }
  get outlineStyle() {
    if (this.outlineGraphic) {
      return this.outlineGraphic.polyline;
    }
    return undefined;
  }
  set outlineStyle(style) {
    const options = {};
    if (Cesium.defined(this.outlineGraphic)) {
      const pl = this.outlineGraphic.graphic.polyline;
      options.material = style.outlineColor || pl.material;
      options.width = style.outlineWidth || pl.width;
      this.outlineGraphic.graphic.polyline.material = options.material;
      this.outlineGraphic.graphic.polyline.width = options.width;
      this.outlineGraphic.options.polyline.material = options.material;
      this.outlineGraphic.options.polyline.width = options.width;
    } else {
      this.outline && this.createOutline(options);
    }
  }
  get material() {
    if (this.graphic) {
      return this.graphic.polygon.material.getValue(this.viewer.clock.currentTime).color;
    }
    return undefined;
  }
  get outlineColor() {
    if (this.outlineGraphic) {
      return this.outlineGraphic.graphic.polyline.material.getValue(this.viewer.clock.currentTime).color;
    }
    return CesiumPolygon.defaultStyle.outlineColor;
  }
  get outlineWidth() {
    if (this.outlineGraphic) {
      return this.outlineGraphic.graphic.polyline.width.getValue(this.viewer.clock.currentTime);
    }
    return CesiumPolygon.defaultStyle.outlineWidth;
  }
  addNode(node) {
    if (node instanceof Cesium.Cartesian3) {
      this.positions.push(node);
      //由于边框实质上是一个首尾相连的Polyline
      //因此最后一个点需要永远等于第一个点
      const count = this.nodePositions.length;
      if (count === 0) {
        this.nodePositions.push(this.positions[0]);
        this.nodePositions.push(this.positions[0]);
      }
      if (count >= 2) {
        // this.nodePositions.insert(count-1,node)
        this.nodePositions[count] = this.nodePositions[count - 1];
        this.nodePositions[count - 1] = node;
      }
    }
  }
  updateNode(index, node) {
    if (index < 0 || index > this.positions.length - 1) {
      throw new Error('无效的index');
    }
    if (node instanceof Cesium.Cartesian3 === false) {
      throw new Error('无效的node');
    }
    this.positions[index] = node;
    if (index === 0) {
      this.nodePositions[0] = node;
      this.nodePositions[this.nodePositions.length - 1] = node;
    } else {
      this.nodePositions[index] = node;
    }
  }
  popNode() {
    this.positions.pop();
    //nodePositions的最后一个节点是倒数第2个点
    this.nodePositions.splice(this.nodePositions.length - 2);
    this.nodePositions.push(this.positions[0]);
  }
  dropNode(index) {
    this.positions.splice(index, 1);
    this.nodePositions.splice(index, 1);
    if (index === 0) {
      this.nodePositions[this.nodePositions.length - 1] = this.nodePositions[0];
    }
  }
  create() {
    //Not create outline here.
    //Create it with createOutline if necessary

    this.options.polygon.outline = false;
    if (this.viewer) {
      this.graphic = this.viewer.entities.add(this.options);
      // this.graphic.mtype = 'CesiumPolygon';
      if (this.outline) {
        this.createOutline();
      }
    }
  }
  /**
   *
   * @param {Object} options describles a points.
   * 遵循和Cesiun.PointGraphic相同的定义方式
   */
  createNode(options = CesiumPoint.defaultStyle) {
    this.node = true;
    options.positions = this.positions;
    options.clampToGround = this.graphic.polygon.perPositionHeight.getValue(this.viewer.clock.currentTime);
    this.nodeGraphic = new CesiumPoint(this.viewer, options);
  }
  /**
   * 创建多边形边框
   * 由于Cesium PolygonGraphic的outlineWidth属性无效（只能为1），
   * 这里利用Polyline代替多边形的outline
   */
  createOutline(options = {}) {
    if (this.options.outline === false) {
      console.log('如果您想创建多边形边线,请在options中设置outline为true');
      return;
    }
    options.width = this.options.polygon.outlineWidth || CesiumPolyline.defaultStyle.width;
    options.material = this.options.polygon.outlineColor || CesiumPolyline.defaultStyle.material;
    // options.show=this.options.outline
    options.clampToGround = !this.graphic.polygon.perPositionHeight.getValue(this.viewer.clock.currentTime);
    options.positions = this.nodePositions;
    this.outlineGraphic = new CesiumPolyline(this.viewer, options);
    this.outline = true;
  }
  /**
   * 对于Polygon的要素编辑，需要做下面几件事：
   * 1.hierarchy变为CallbackProperty
   * 2.创建多边形顶点
   * 3.要素高亮显示
   * 4.如果多边形定义了outline，outline也要高亮,outline的positions要变为CallbackProperty
   */
  startEdit() {
    const positions = this.positions;
    // const nodePositions = this.nodePositions
    if (this.graphic instanceof Cesium.Entity) {
      this.graphic.polygon.hierarchy = new Cesium.CallbackProperty(function () {
        return new Cesium.PolygonHierarchy(positions);
      });
      //this.graphic.polygon.material = CesiumPolygon.selectedStyle.material;
      if (this.outline) {
        this.outlineGraphic.startEdit();
        this.nodeGraphic = this.outlineGraphic.nodeGraphic;
        this.node = true;
      } else {
        this.createNode();
      }
    }
  }
  stopEdit() {
    if (this.graphic instanceof Cesium.Entity) {
      this.graphic.polygon.hierarchy = new Cesium.PolygonHierarchy(this.positions);
      //this.graphic.polygon.material = this.options.polygon.material
    }

    this.removeNode();
    if (this.nodeGraphic) {
      this.nodeGraphic.stopEdit();
    }
    if (this.outlineGraphic) {
      this.outlineGraphic.stopEdit();
    }
  }
  remove() {
    if (this.viewer) {
      this.viewer.entities.remove(this.graphic);
      this.graphic = undefined;
      this.removeNode();
      this.removeOutline();
    }
  }
  removeOutline() {
    if (this.outline) {
      this.outlineGraphic.remove();
      this.outline = false;
      this.outlineGraphic = undefined;
    }
  }
  removeNode() {
    if (this.node) {
      this.nodeGraphic.remove();
      this.node = false;
      // this.nodePositions=[]
    }
  }

  destroy() {
    this.remove();
    this.viewer = undefined;
    this.positions = undefined;
    this.options = undefined;
    if (this.nodeGraphic) {
      this.nodeGraphic.destroy();
    }
    if (this.outlineGraphic) {
      this.outlineGraphic.destroy();
    }
    this.outlineGraphic = undefined;
    this.nodeGraphic = undefined;
  }

  /**
   * 多边形默认样式
   */

  static fromDegrees(viewer, positions, properties = {}) {
    positions = positions.map(_ => {
      return Cesium.Cartesian3.fromDegrees(_.lon, _.lat, _.height);
    });
    const options = CesiumPolygon.defaultStyle;
    options.positions = positions;
    options.properties = properties;
    const pg = new CesiumPolygon(viewer, options);
    pg.stopEdit();
    return pg;
  }
  static fromRadians(viewer, positions) {
    positions = positions.map(_ => {
      return Cesium.Cartesian3.fromRadians(_.lon, _.lat, _.height);
    });
    const options = CesiumPolygon.defaultStyle;
    options.positions = positions;
    return new CesiumPolygon(viewer, options);
  }
}
_defineProperty(CesiumPolygon, "defaultStyle", {
  material: new Cesium.Color.fromCssColorString('rgba(247,224,32,0.5)'),
  outline: true,
  outlineColor: new Cesium.Color.fromCssColorString('rgba(255,247,145,1)'),
  outlineWidth: 2,
  perPositionHeight: false
  // height:0,
  // HeightReference: Cesium.HeightReference.CLAMP_TO_GROUND
  //material: new Cesium.ColorMaterialProperty(new Cesium.Color(205, 139, 14, 1)),
});
_defineProperty(CesiumPolygon, "selectedStyle", {
  // material: new Cesium.ColorMaterialProperty(Cesium.Color.GREEN.withAlpha(0.4)),
  //material: new Cesium.ColorMaterialProperty(new Cesium.Color(205, 139, 14, 1)),
  material: new Cesium.ColorMaterialProperty(Cesium.Color.AQUA.withAlpha(0.4)),
  outlineColor: Cesium.Color.AQUA.withAlpha(0.4)
  //heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
});

class CesiumLabel extends BaseGraphic {
  /**
   *
   * @param {Viewer} viewer Cesium Viewer
   * @param {Object} options describles a label.
   * positions定义其空间位置(如果positions为Cartesian3数组将创建多个label)，
   * label属性的定义遵循Cesium LabelGraphic的定义方式
   */
  constructor(viewer, options = CesiumLabel.defaultStyle) {
    super(viewer);
    this._type = 'LABEL';
    this._gvtype = GraphicType/* default.LABEL */.Z.LABEL;
    this.position = options.position;
    this.options = {
      mid: this._gvid,
      mtype: this._gvtype,
      position: this.position,
      label: options
    };
    this.graphic = undefined;
    this.create();
  }
  get color() {
    if (this.graphic) {
      return this.graphic.label.fillColor.getValue(this.viewer.clock.currentTime);
    }
    return undefined;
  }
  set color(c) {
    if (this.graphic) {
      this.graphic.label.fillColor = c;
    }
  }
  get font() {
    if (this.graphic) {
      return this.graphic.label.font.getValue(this.viewer.clock.currentTime);
    }
    return undefined;
  }
  create() {
    this.graphic = this.viewer.entities.add(this.options);
  }
  startEdit() {
    if (this.graphic) {
      this.graphic.label.position = new Cesium.CallbackProperty(() => {
        return this.position;
      }, false);
    }
  }
  stopEdit() {
    if (this.graphic) {
      this.graphic.label.position = this.position;
    }
  }
  remove() {
    this.viewer && this.viewer.entities.remove(this.graphic);
    this.graphic = undefined;
  }
  updateText(text) {
    if (this.graphic) {
      this.graphic.label.text = text;
      this.mname = text;
    }
  }
  destroy() {
    this.remove();
    this.viewer = undefined;
    this.options = undefined;
    this.positions = undefined;
  }
}
_defineProperty(CesiumLabel, "defaultStyle", {
  color: Cesium.Color.WHITE,
  font: '28px sans-serif',
  showBackground: true
});
class CesiumModel extends BaseGraphic {
  constructor(viewer, options) {
    super(viewer);
    this._type = 'MODEL';
    this._gvtype = GraphicType/* default.MODEL */.Z.MODEL;
    this.position = options.position;
    // this.mname = '未命名'
    this.options = {
      mid: this._gvid,
      mtype: this._gvtype,
      position: this.position,
      model: options
    };
    this.create();
  }
  create() {
    this.graphic = this.viewer.entities.add(this.options);
  }
  startEdit() {
    if (this.graphic) {
      this.graphic.label.position = new Cesium.CallbackProperty(() => {
        return this.position;
      }, false);
    }
  }
  stopEdit() {
    if (this.graphic) {
      this.graphic.label.position = this.position;
    }
  }
  remove() {
    if (this.viewer) {
      this.viewer.entities.remove(this.graphic);
      this.graphic = undefined;
    }
  }
  destroy() {
    this.remove();
    this.options = undefined;
    this.position = undefined;
  }
  set uri(uri) {
    if (this.graphic) {
      this.graphic.model.uri = uri;
    }
  }
  set color(c) {
    if (this.graphic) {
      this.graphic.model.color = c;
    }
  }
  set mode(m) {
    if (this.graphic) {
      this.graphic.model.colorBlendMode = m;
    }
  }
  set mixed(v) {
    if (this.graphic) {
      this.graphic.model.colorBlendAmount = v;
    }
  }
}
_defineProperty(CesiumModel, "defaultStyle", {
  colorBlendMode: Cesium.ColorBlendMode.HIGHLIGHT,
  color: Cesium.Color.WHITE,
  colorBlendAmount: 0.5,
  minimumPixelSize: 64
});

/* harmony default export */ var Graphic = ({
  CesiumPoint,
  CesiumPolyline,
  CesiumPolygon,
  CesiumLabel,
  CesiumBillboard,
  CesiumModel
});

/***/ }),

/***/ 4094:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7658);
/* harmony import */ var core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_push_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Graphic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6857);
/* harmony import */ var _js_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4996);
/* harmony import */ var _GraphicType__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8638);
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4014);
/* harmony import */ var file_saver__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(file_saver__WEBPACK_IMPORTED_MODULE_4__);






const console = window.console;
const LEFT_CLICK = Cesium.ScreenSpaceEventType.LEFT_CLICK;
const RIGHT_CLICK = Cesium.ScreenSpaceEventType.RIGHT_CLICK;
const MOUSE_MOVE = Cesium.ScreenSpaceEventType.MOUSE_MOVE;
const MOUSE_DOWN = Cesium.ScreenSpaceEventType.LEFT_DOWN;
const MOUSE_UP = Cesium.ScreenSpaceEventType.LEFT_UP;
class GraphicManager {
  /**
   * 鼠标交互绘制线和多边形
   * @param {Viewer}} viewer Cesium Viewer
   * @param {*} options 预留参数，目前不需要关注
   */
  constructor(viewer, options = {}) {
    if (viewer instanceof Cesium.Viewer === false) {
      throw new Error('viewer不是一个有效的Cesium Viewer');
    }
    this.viewer = viewer;
    this.options = options;
    /*heightReference 定义几何图形的高程基准
     *CLAMP_TO_GROUND:依附地形
     *CLAMP_TO_MODEL:依附模型
     *NONE:空间线
     */
    this._heightReference = 'CLAMP_TO_GROUND';
    this._material = undefined;
    this._style = {};
    this.graphicId = undefined;
    this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.canvas);
    this.graphicType = undefined;
    this.positions = [];
    this.tip = new _js_utils__WEBPACK_IMPORTED_MODULE_2__/* ["default"].CursorTip */ .ZP.CursorTip('');
    this.tip.visible = false;
    this.mode = 'ready';
    this.dragging = false;
    // this.init()
    // this.addEventListener()
    //当前正在编辑的graphic
    this.editManager = undefined;
    this.selectedNodeIndex = -1;
    //Graphic集合
    this.manager = new Map();
    const self = this;
    document.onkeydown = function (event) {
      if (self.mode !== 'edit') return;
      const e = event || window.event || arguments.callee.caller.arguments[0];
      if (e && e.keyCode == 46) {
        // 按 delete
        if (self.selectedNodeIndex > -1 && self.editManager) {
          self.editManager.dropNode(self.selectedNodeIndex);
          self.highlightedNode(undefined, self.editManager.nodeGraphic);
          self.selectedNodeIndex = -1;
        } else if (self.editManager) {
          self.editManager.destroy();
          self.manager.delete(self.editManager.id);
          self.mode = 'end';
          self.tip.visible = false;
          const evt = new CustomEvent('deleteEvent', {
            detail: {
              mid: self.editManager ? self.editManager.mid : undefined
            }
          });
          document.dispatchEvent(evt);
          self.editManager = undefined;
          // self.removeEventListener();
        }
      }
    };
    // this.tip.style.display='none'
  }

  get heightReference() {
    return this._heightReference;
  }
  set heightReference(h) {
    this._heightReference = h;
    if (this.editManager) {
      this.editManager.heightReference = h;
      if (this.editManager.type === 'POLYLINE') {
        this.editManager.graphic.polyline.clampToGround = /.*GROUND.*/.test(h);
        this.editManager.options.polyline.clampToGround = /.*GROUND.*/.test(h);
      } else if (this.editManager.type === 'POLYGON') {
        const graphic = this.editManager.graphic;
        const options = this.editManager.options;
        if (/.*GROUND.*/.test(h)) {
          graphic.polygon.perPositionHeight = false;
          if (this.editManager.outline) {
            this.editManager.outlineGraphic.graphic.polyline.clampToGround = true;
          } // polygon.heightReference = Cesium.HeightReference.CLAMP_TO_GROUND
          // options.polygon.heightReference= Cesium.HeightReference.CLAMP_TO_GROUND
          options.polygon.perPositionHeight = false;
        } else {
          graphic.polygon.perPositionHeight = true;
          if (this.editManager.outline) {
            this.editManager.outlineGraphic.graphic.polyline.clampToGround = false;
          }
          // polygon.heightReference = Cesium.HeightReference.RELATIVE_TO_GROUND
          // options.polygon.heightReference= Cesium.HeightReference.RELATIVE_TO_GROUND
          options.polygon.perPositionHeight = true;
        }
      }
    }
  }
  get material() {
    return this._material;
  }
  set material(v) {
    this._material = v;
    if (this.editManager) {
      if (this.editManager.type === 'POLYLINE') {
        this.editManager.graphic.polyline.material = this._material;
        this.editManager.options.polyline.material = this._material;
      } else if (this.editManager.type === 'POLYGON') {
        this.editManager.graphic.polygon.material = this._material;
        this.editManager.options.polygon.material = this._material;
      }
    }
  }
  get style() {
    return this._style;
  }
  set style(option) {
    this._style = option;
    if (!this.editManager) {
      return;
    }
    const keys = Object.keys(option);
    for (let key of keys) {
      if (this.editManager.type === 'POLYLINE') {
        this.editManager.graphic.polyline[key] = option[key];
        this.editManager.options.polyline[key] = option[key];
      } else if (this.editManager.type === 'POLYGON') {
        if (key !== 'outline') {
          this.editManager.graphic.polygon[key] = option[key];
        }
        this.editManager.options.polygon[key] = option[key];
      }
    }
    if (this.editManager.type === 'POLYGON') {
      this.editManager.outlineStyle = option;
    }
  }

  /**
   *
   * @param {Object} options 定义一个CesiumPolyline
   */
  createPolyline(options = _Graphic__WEBPACK_IMPORTED_MODULE_1__/* .CesiumPolyline.defaultStyle */ .Jh.defaultStyle) {
    this.graphicType = _GraphicType__WEBPACK_IMPORTED_MODULE_3__/* ["default"].POLYLINE */ .Z.POLYLINE;
    const id = this.generateId();
    options.positions = this.positions;
    if (/.*GROUND.*/.test(this._heightReference)) {
      options.clampToGround = true;
    } else {
      options.clampToGround = false;
    }
    options.material = this.material || options.material;
    options.width = this.style.width || options.width;
    const manager = new _Graphic__WEBPACK_IMPORTED_MODULE_1__/* .CesiumPolyline */ .Jh(this.viewer, options);
    this.tip.updateText('左键标绘，右键结束.');
    this.tip.visible = true;
    manager.mid = id;
    // manager.id = id
    // manager.mname = '未命名';
    manager.heightReference = this.heightReference;
    this.manager.set(id, manager);
    this.graphicId = id;
    this.editManager = manager;
    const evt = new CustomEvent('addEvent', {
      detail: {
        mid: manager.mid,
        mtype: manager.mtype,
        mname: manager.mname
      }
    });
    document.dispatchEvent(evt);
    const self = this;
    this.handler.setInputAction(e => {
      self.tip && self.tip.updatePosition(e.endPosition);
    }, MOUSE_MOVE);
    this.addEventListener();
    return manager;
  }

  /**
   *
   * @param {Object} options 定义一个CesiumPolygon
   */
  createPolygon(options = _Graphic__WEBPACK_IMPORTED_MODULE_1__/* .CesiumPolygon.defaultStyle */ .ss.defaultStyle) {
    this.graphicType = _GraphicType__WEBPACK_IMPORTED_MODULE_3__/* ["default"].POLYGON */ .Z.POLYGON;
    const id = this.generateId();
    this.graphicId = id;
    options.positions = this.positions;
    if (/.*GROUND.*/.test(this._heightReference)) {
      options.perPositionHeight = false;
      // options.heightReference = Cesium.HeightReference.CLAMP_TO_GROUND;
    } else {
      options.perPositionHeight = true;
      // options.heightReference = Cesium.HeightReference.RELATIVE_TO_GROUND;
      // options.height = 0
    }

    options.material = this.material || options.material;
    options.outlineWidth = this.style.outlineWidth || options.outlineWidth;
    options.outlineColor = this.style.outlineColor || options.outlineColor;
    const manager = new _Graphic__WEBPACK_IMPORTED_MODULE_1__/* .CesiumPolygon */ .ss(this.viewer, options);
    manager.mid = id;
    // manager.id = id;
    // manager.mname = '未命名';
    manager.heightReference = this.heightReference;
    this.tip.visible = true;
    this.tip.updateText('左键标绘，右键结束.');
    this.manager.set(id, manager);
    this.editManager = manager;
    const evt = new CustomEvent('addEvent', {
      detail: {
        mid: manager.mid,
        mtype: manager.mtype,
        mname: manager.mname
      }
    });
    document.dispatchEvent(evt);
    const self = this;
    this.handler.setInputAction(e => {
      self.tip && self.tip.updatePosition(e.endPosition);
    }, MOUSE_MOVE);
    this.addEventListener();
    return manager;
  }
  generateId() {
    return (Math.random() * 10000000).toString(16).substr(0, 4) + '-' + new Date().getTime() + '-' + Math.random().toString().substr(2, 5);
  }
  isKnownGraphic(pickedObj) {
    if (Cesium.defined(pickedObj) && pickedObj.id instanceof Cesium.Entity && (pickedObj.id.mtype === _GraphicType__WEBPACK_IMPORTED_MODULE_3__/* ["default"].POLYLINE */ .Z.POLYLINE || pickedObj.id.mtype === _GraphicType__WEBPACK_IMPORTED_MODULE_3__/* ["default"].POLYGON */ .Z.POLYGON || pickedObj.id.mtype === _GraphicType__WEBPACK_IMPORTED_MODULE_3__/* ["default"].POINT */ .Z.POINT)) {
      return true;
    }
    return false;
  }
  /**
   * 将当前选中的点设为高亮
   * @param {Cartesian3} node
   * @param {CesiumPoint} cp
   */
  highlightedNode(node, cp) {
    const soption = _Graphic__WEBPACK_IMPORTED_MODULE_1__/* .CesiumPoint.selectedStyle */ .MP.selectedStyle;
    const doption = _Graphic__WEBPACK_IMPORTED_MODULE_1__/* .CesiumPoint.defaultStyle */ .MP.defaultStyle;
    for (let n of cp.graphic) {
      if (n === node) {
        _Graphic__WEBPACK_IMPORTED_MODULE_1__/* .CesiumPoint.setStyle */ .MP.setStyle(n, soption);
      } else {
        _Graphic__WEBPACK_IMPORTED_MODULE_1__/* .CesiumPoint.setStyle */ .MP.setStyle(n, doption);
      }
    }
  }
  addEventListener() {
    const self = this;
    const viewer = this.viewer;
    const clickHandler = function (e) {
      //编辑要素
      if (self.mode === 'edit') {
        if (!self.editManager) {
          self.removeEventListener();
          return;
        }
        const nodeGraphic = self.editManager.nodeGraphic || self.editManager.outlineGraphic.nodeGraphic;
        const pickedObjs = viewer.scene.drillPick(e.position);
        let known = false,
          pickedObj = undefined;
        for (let obj of pickedObjs) {
          known = self.isKnownGraphic(obj);
          if (known && obj.id.mtype === _GraphicType__WEBPACK_IMPORTED_MODULE_3__/* ["default"].POINT */ .Z.POINT) {
            pickedObj = obj;
            //再事件监听之前移除上次的监听
            self.handler.removeInputAction(MOUSE_DOWN);
            self.handler.removeInputAction(MOUSE_MOVE);
            self.handler.setInputAction(mouseDownHandler, MOUSE_DOWN);
            self.handler.setInputAction(moseMoveHandler, MOUSE_MOVE);
            break;
          }
        }
        // const pickedPosition=CVT.pixel2Cartesian(e.position,viewer)

        if (pickedObj && known) {
          if (pickedObj.id.mtype === _GraphicType__WEBPACK_IMPORTED_MODULE_3__/* ["default"].POINT */ .Z.POINT) {
            self.selectedNodeIndex = nodeGraphic.contain(pickedObj.id);
            if (self.selectedNodeIndex !== -1) {
              self.highlightedNode(pickedObj.id, nodeGraphic);
            }
          } else {
            self.highlightedNode(pickedObj.id, self.editManager.nodeGraphic);
            self.selectedNodeIndex = -1;
          }
        } else {
          self.editManager && self.editManager.stopEdit();
          // self.handler.removeInputAction(MOUSE_MOVE);
          self.removeEventListener();
          self.mode = 'end';
          self.selectedNodeIndex = -1;
          self.editManager = undefined;
          self.tip.visible = false;
          const evt = new CustomEvent('stopEdit');
          document.dispatchEvent(evt);
        }
        return;
      }
      //非法的要素类型
      if (self.graphicType != _GraphicType__WEBPACK_IMPORTED_MODULE_3__/* ["default"].POLYLINE */ .Z.POLYLINE && self.graphicType != _GraphicType__WEBPACK_IMPORTED_MODULE_3__/* ["default"].POLYGON */ .Z.POLYGON) {
        return;
      }
      let cartesian = _js_utils__WEBPACK_IMPORTED_MODULE_2__/* .CVT.pixel2Cartesian */ .AN.pixel2Cartesian(e.position, self.viewer);
      if (/.*MODEL.*/.test(self._heightReference)) {
        if (!viewer.scene.pickPositionSupported) {
          console.log('This browser does not support pickPosition.');
          return;
        }
        cartesian = viewer.scene.pickPosition(e.position);
      }
      //添加第一个点后再监听鼠标移动事件，绘绘完成后移除监听，以免不必要的事件监听
      const target = self.manager.get(self.graphicId);
      if (target && target.positions.length === 0) {
        self.handler.removeInputAction(MOUSE_MOVE);
        self.handler.setInputAction(moseMoveHandler, MOUSE_MOVE);
      }
      if (Cesium.defined(cartesian) && self.manager.has(self.graphicId) && target) {
        target.addNode(cartesian);
      }
      self.mode = 'create';
    };
    const rightHandler = function () {
      const manager = self.manager.get(self.graphicId);
      if (self.mode === 'create' && manager) {
        manager.stopEdit();
        self.graphicType = undefined;
        self.graphicId = undefined;
        self.positions = [];
        self.mode = 'end';
        self.tip.visible = false;
        self.editManager = undefined;
        const evt = new CustomEvent('stopEdit');
        document.dispatchEvent(evt);
      } else if (self.mode === 'ready') {
        self.cancel();
      } else if (self.mode === 'edit') {
        self.editManager && self.editManager.stopEdit();
        // self.handler.removeInputAction(MOUSE_MOVE);
        self.removeEventListener();
        self.mode = 'end';
        self.selectedNodeIndex = -1;
        self.editManager = undefined;
        self.tip.visible = false;
      }
      // self.handler.removeInputAction(MOUSE_MOVE);
      const evt = new CustomEvent('stopEdit');
      document.dispatchEvent(evt);
      self.removeEventListener();
    };
    const moseMoveHandler = function (e) {
      let cartesian = _js_utils__WEBPACK_IMPORTED_MODULE_2__/* .CVT.pixel2Cartesian */ .AN.pixel2Cartesian(e.endPosition, self.viewer);
      if (/.*MODEL.*/.test(self._heightReference)) {
        if (!viewer.scene.pickPositionSupported) {
          console.log('This browser does not support pickPosition.');
          return;
        }
        cartesian = viewer.scene.pickPosition(e.endPosition);
      }
      if (!Cesium.defined(cartesian)) {
        return;
      }
      self.tip.updatePosition(e.endPosition);
      if (self.mode === 'create') {
        //如果当前是create模式，创建辅助线
        if (self.positions.length > 1) {
          self.manager.get(self.graphicId).popNode();
        }
        //添加临时节点
        //再添加第一个节点前，不拾取鼠标移动的坐标
        if (self.positions.length > 0) {
          // self.positions.push(cartesian);
          self.manager.get(self.graphicId).addNode(cartesian);
        }
      } else if (self.mode == 'edit' && self.dragging) {
        if (self.selectedNodeIndex !== -1) {
          self.editManager.updateNode(self.selectedNodeIndex, cartesian);
        }
      }
    };
    const mouseDownHandler = function (e) {
      self.handler.setInputAction(mouseUpHandler, MOUSE_UP);
      const objs = viewer.scene.drillPick(e.position);
      let isCesiumPoint = false;
      for (let obj of objs) {
        if (_Graphic__WEBPACK_IMPORTED_MODULE_1__/* .CesiumPoint.isCesiumPoint */ .MP.isCesiumPoint(obj)) {
          isCesiumPoint = true;
        }
      }
      if (isCesiumPoint == false) {
        return;
      }
      if (self.mode === 'edit' && self.selectedNodeIndex != -1) {
        self.dragging = true;
        viewer.scene.screenSpaceCameraController.enableRotate = false;
      }
    };
    const mouseUpHandler = function () {
      self.dragging = false;
      viewer.scene.screenSpaceCameraController.enableRotate = true;
      self.handler.removeInputAction(MOUSE_UP);
      // self.handler.removeInputAction(MOUSE_DOWN);
    };

    this.handler.setInputAction(clickHandler, LEFT_CLICK);
    this.handler.setInputAction(rightHandler, RIGHT_CLICK);
  }
  rename(id, name) {
    const graphic = this.manager.get(id);
    if (Cesium.defined(graphic)) {
      graphic.mname = name;
    }
  }
  has(id) {
    if (this.manager) {
      return this.manager.has(id);
    }
    return false;
  }
  get(id) {
    if (this.has(id)) {
      return this.manager.get(id);
    }
  }
  /**
   * 当图形处于ready状态时，不想画了
   */
  cancel() {
    const manager = this.manager.get(this.graphicId);
    manager && manager.stopEdit();
    manager && manager.destroy();
    this.graphicType = undefined;
    this.graphicId = undefined;
    this.positions = [];
    this.mode = 'end';
    this.tip.visible = false;
    this.editManager = undefined;
  }
  select(type, id, status) {
    if (Cesium.defined(id)) {
      const manager = this.manager.get(id);
      if (manager) {
        manager.show = status;
      }
    }
    if (Cesium.defined(type)) {
      const values = this.manager.values();
      for (let v of values) {
        if (v.mtype === type) {
          v.show = status;
        }
      }
    }
  }
  edit(id) {
    const self = this;
    const manager = self.manager.get(id);
    this.handler.setInputAction(e => {
      self.tip.updatePosition(e.endPosition);
    }, MOUSE_MOVE);
    self.graphicId = id;
    if (Cesium.defined(manager)) {
      // manager.zoomTo()
      self.mode = 'edit';
      manager.startEdit();
      self.tip.visible = true;
      self.tip.updateText('拖动节点编辑，按del删除.');
      self.editManager = manager;
      const evt = new CustomEvent('startEdit', {
        detail: {
          graphicType: self.editManager.type,
          material: self.editManager.material,
          width: self.editManager.width,
          outline: self.editManager.outline,
          outlineColor: self.editManager.outlineColor,
          outlineWidth: self.editManager.outlineWidth,
          heightReference: self.editManager.heightReference
        }
      });
      document.dispatchEvent(evt);
      self.addEventListener();
    }
  }
  export(type) {
    const json = {
      type: "FeatureCollection",
      name: "graphic",
      crs: {
        type: "name",
        properties: {
          name: "urn:ogc:def:crs:OGC:1.3:CRS84"
        }
      },
      features: []
    };
    const managers = this.manager.values();
    for (let m of managers) {
      if (m.type === type) {
        json.features.push(m.toGeoJson());
      }
    }
    const blob = new Blob([JSON.stringify(json)], {
      type: ""
    });
    (0,file_saver__WEBPACK_IMPORTED_MODULE_4__.saveAs)(blob, type + parseInt(Cesium.getTimestamp()) + '.geojson');
  }
  import(feat) {
    const id = this.generateId();
    let graphic,
      coordinates,
      positions = [];
    if (feat.geometry.type.toUpperCase() === 'LineString'.toUpperCase()) {
      coordinates = feat.geometry.coordinates;
      for (let c of coordinates) {
        positions.push({
          lon: c[0],
          lat: c[1],
          height: c[2]
        });
      }
      try {
        graphic = _Graphic__WEBPACK_IMPORTED_MODULE_1__/* .CesiumPolyline.fromDegrees */ .Jh.fromDegrees(this.viewer, positions, feat.properties);
      } catch (e) {
        console.log(e);
      }
    } else if (feat.geometry.type.toUpperCase() === "POLYGON") {
      coordinates = feat.geometry.coordinates[0];
      for (let c of coordinates) {
        positions.push({
          lon: c[0],
          lat: c[1],
          height: c[2]
        });
      }
      graphic = _Graphic__WEBPACK_IMPORTED_MODULE_1__/* .CesiumPolygon.fromDegrees */ .ss.fromDegrees(this.viewer, positions, feat.properties);
    } else {
      throw new Error('不能识别的数据源.');
    }
    if (graphic) {
      graphic.mid = id;
      graphic.mname = feat.properties.name;
      this.manager.set(id, graphic);
      const evt = new CustomEvent('addEvent', {
        detail: {
          mid: graphic.mid,
          mtype: graphic.mtype,
          mname: graphic.mname || '未命名'
        }
      });
      document.dispatchEvent(evt);
    }
    return graphic;
  }
  removeEventListener() {
    this.handler.removeInputAction(LEFT_CLICK);
    this.handler.removeInputAction(MOUSE_MOVE);
    this.handler.removeInputAction(RIGHT_CLICK);
    this.handler.removeInputAction(MOUSE_DOWN);
    this.handler.removeInputAction(MOUSE_UP);
  }
  removeAll() {
    const values = this.manager.values();
    for (let v of values) {
      v.remove();
      v.destroy();
    }
    this.manager.clear();
    this.tip.visible = false;
  }
  destroy() {
    this.activeManager = undefined;
    this.manager = undefined;
    this.editManager = undefined;
    this.removeEventListener();
    if (!this.handler.isDestroyed) {
      this.handler.destroy();
      this.handler = undefined;
    }
  }
  destroyManager() {
    const manager = this.editManager;
    const evt = new CustomEvent('destroyEvent', {
      detail: {
        mid: manager ? manager.mid : undefined
      }
    });
    if (manager) {
      if (this.mode === 'edit') {
        manager && manager.stopEdit();
      } else {
        manager && manager.destroy();
        this.manager.delete(this.graphicId);
      }
      this.editManager = undefined;
    }
    this.graphicId = undefined;
    this.handler.removeInputAction(MOUSE_MOVE);
    this.positions = [];
    document.dispatchEvent(evt);
  }
}
/* harmony default export */ __webpack_exports__.Z = (GraphicManager);

/***/ }),

/***/ 8638:
/***/ (function(__unused_webpack_module, __webpack_exports__) {

"use strict";
const GraphicType = function () {
  function _() {}
  _.MARKER = 0;
  _.POINT = 5;
  _.POLYLINE = 1;
  _.POLYGON = 2;
  _.LABEL = 3;
  _.MODEL = 4;
  return _;
}();
/* harmony default export */ __webpack_exports__.Z = (GraphicType);

/***/ }),

/***/ 4996:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AN: function() { return /* binding */ CVT; },
/* harmony export */   FN: function() { return /* binding */ checkComponent; },
/* harmony export */   H5: function() { return /* binding */ moveDiv; },
/* harmony export */   vV: function() { return /* binding */ checkViewer; }
/* harmony export */ });
/* unused harmony exports errroCatch, currentExtent, viewCenter, saveCurViewerImage, downloadFile, pointVisibilityOnEarth, CursorTip */
/* harmony import */ var core_js_modules_web_dom_exception_stack_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2801);
/* harmony import */ var core_js_modules_web_dom_exception_stack_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_exception_stack_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_esnext_typed_array_to_reversed_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3767);
/* harmony import */ var core_js_modules_esnext_typed_array_to_reversed_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_typed_array_to_reversed_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_esnext_typed_array_to_sorted_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8585);
/* harmony import */ var core_js_modules_esnext_typed_array_to_sorted_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_typed_array_to_sorted_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_esnext_typed_array_with_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8696);
/* harmony import */ var core_js_modules_esnext_typed_array_with_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_esnext_typed_array_with_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7107);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_4__);






/**
*
  Cesium坐标转换工具
*/
const CVT = function () {
  function _() {}
  _.cartesian2Pixel = function (cartesian, viewer) {
    return Cesium.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, cartesian);
  };
  _.pixel2Cartesian = function (pixel, viewer) {
    if (viewer.terrainProvider instanceof Cesium.EllipsoidTerrainProvider) {
      return _.pixel2Cartesian1(pixel, viewer);
    } else {
      return _.pixel2Cartesian2(pixel, viewer);
    }
  };
  /**
   * 二维坐标，没有添加地形数据时调用
   */
  _.pixel2Cartesian1 = function (pixel, viewer) {
    const cartesian = viewer.camera.pickEllipsoid(pixel, viewer.scene.globe.ellipsoid);
    return cartesian;
  };
  /**
   * 三维坐标，添加地形数据时调用
   */
  _.pixel2Cartesian2 = function (pixel, viewer) {
    const ray = viewer.camera.getPickRay(pixel);
    const cartesian = viewer.scene.globe.pick(ray, viewer.scene);
    return cartesian;
  };
  _.cartesian2Radians = function (cartesian, viewer) {
    const ellipsoid = viewer.scene.globe.ellipsoid || Cesium.Ellipsoid.WGS84;
    const cartographic = Cesium.Cartographic.fromCartesian(cartesian, ellipsoid);
    const lon = cartographic.longitude;
    const lat = cartographic.latitude;
    const height = cartographic.height;
    return {
      lon,
      lat,
      height
    };
  };
  _.cartesian2Degrees = function (cartesian, viewer) {
    const coords = _.cartesian2Radians(cartesian, viewer);
    const lon = Cesium.Math.toDegrees(coords.lon);
    const lat = Cesium.Math.toDegrees(coords.lat);
    const height = coords.height;
    return {
      lon,
      lat,
      height
    };
  };
  _.degrees2Cartesian = function (position) {
    const cartesian = Cesium.Cartesian3.fromDegrees(position.lon, position.lat, position.height);
    return cartesian;
  };
  _.radians2Cartesian = function (position) {
    return Cesium.Cartesian3.fromRadians(position.lon, position.lat, position.height);
  };
  _.pixel2Degrees = function (pixel, viewer) {
    const cartesian = _.pixel2Cartesian(pixel, viewer);
    if (Cesium.defined(cartesian)) {
      return _.cartesian2Degrees(cartesian, viewer);
    }
    return undefined;
  };
  _.pixel2Radians = function (pixel, viewer) {
    const cartesian = _.pixel2Cartesian(pixel, viewer);
    if (Cesium.defined(cartesian)) {
      return _.cartesian2Radians(cartesian, viewer);
    }
    return undefined;
  };
  _.toDegrees = function (position, viewer) {
    if (position instanceof Cesium.Cartesian3) {
      return _.cartesian2Degrees(position, viewer);
    } else if (position instanceof Cesium.Cartesian2) {
      return _.pixel2Degrees(position, viewer);
    }
  };
  _.toRadians = function (position, viewer) {
    if (position instanceof Cesium.Cartesian3) {
      return _.cartesian2Radians(position, viewer);
    } else if (position instanceof Cesium.Cartesian2) {
      return _.pixel2Radians(position, viewer);
    }
  };
  _.toPixel = function (position, viewer) {
    if (position instanceof Cesium.Cartesian) {
      return _.cartesian2Pixel(position, viewer);
    }
  };
  return _;
}();
/**
 *
 * @param {*} container 要移到的元素
 * @param {*} target 监听鼠标事件的元素，一般是标题栏
 */
function moveDiv(container, target) {
  if (!jquery__WEBPACK_IMPORTED_MODULE_4___default()("#" + container)) {
    throw new Error("请指定要操作的元素");
  }
  if (!target) {
    target = container;
  }
  jquery__WEBPACK_IMPORTED_MODULE_4___default()("#" + target).mousedown(function (e //e鼠标事件
  ) {
    jquery__WEBPACK_IMPORTED_MODULE_4___default()("#" + target).css("cursor", "move"); //改变鼠标指针的形状
    // let offset = $("#" + container).offset(); //DIV在页面的位置
    let offset = jquery__WEBPACK_IMPORTED_MODULE_4___default()("#" + container).position(); //DIV在页面的位置
    let x = e.pageX - offset.left; //获得鼠标指针离DIV元素左边界的距离
    let y = e.pageY - offset.top; //获得鼠标指针离DIV元素上边界的距离
    jquery__WEBPACK_IMPORTED_MODULE_4___default()(document).bind("mousemove", function (ev //绑定鼠标的移动事件，因为光标在DIV元素外面也要有效果，所以要用doucment的事件，而不用DIV元素的事件
    ) {
      jquery__WEBPACK_IMPORTED_MODULE_4___default()("#" + target).css("cursor", "move");
      jquery__WEBPACK_IMPORTED_MODULE_4___default()("#" + container).stop(); //加上这个之后
      let _x = ev.pageX - x; //获得X轴方向移动的值
      let _y = ev.pageY - y; //获得Y轴方向移动的值
      jquery__WEBPACK_IMPORTED_MODULE_4___default()("#" + container).animate({
        left: _x + "px",
        top: _y + "px"
      }, 10);
    });
  });
  jquery__WEBPACK_IMPORTED_MODULE_4___default()(document).mouseup(function () {
    jquery__WEBPACK_IMPORTED_MODULE_4___default()("#" + target).css("cursor", "default");
    jquery__WEBPACK_IMPORTED_MODULE_4___default()(this).unbind("mousemove");
  });
}
/**
 * 获得当前视野范围
 * @param {Viewer} viewer
 */
function currentExtent(viewer) {
  // 范围对象
  const extent = {};

  // 得到当前三维场景
  const scene = viewer.scene;

  // 得到当前三维场景的椭球体
  const ellipsoid = scene.globe.ellipsoid;
  const canvas = scene.canvas;

  // canvas左上角
  const car3_lt = viewer.camera.pickEllipsoid(new Cesium.Cartesian2(0, 0), ellipsoid);

  // canvas右下角
  const car3_rb = viewer.camera.pickEllipsoid(new Cesium.Cartesian2(canvas.width, canvas.height), ellipsoid);

  // 当canvas左上角和右下角全部在椭球体上
  if (car3_lt && car3_rb) {
    const carto_lt = ellipsoid.cartesianToCartographic(car3_lt);
    const carto_rb = ellipsoid.cartesianToCartographic(car3_rb);
    extent.xmin = Cesium.Math.toDegrees(carto_lt.longitude);
    extent.ymax = Cesium.Math.toDegrees(carto_lt.latitude);
    extent.xmax = Cesium.Math.toDegrees(carto_rb.longitude);
    extent.ymin = Cesium.Math.toDegrees(carto_rb.latitude);
  }

  // 当canvas左上角不在但右下角在椭球体上
  else if (!car3_lt && car3_rb) {
    let car3_lt2 = null;
    let yIndex = 0;
    do {
      // 这里每次10像素递加，一是10像素相差不大，二是为了提高程序运行效率
      yIndex <= canvas.height ? yIndex += 10 : canvas.height;
      car3_lt2 = viewer.camera.pickEllipsoid(new Cesium.Cartesian2(0, yIndex), ellipsoid);
    } while (!car3_lt2);
    const carto_lt2 = ellipsoid.cartesianToCartographic(car3_lt2);
    const carto_rb2 = ellipsoid.cartesianToCartographic(car3_rb);
    extent.xmin = Cesium.Math.toDegrees(carto_lt2.longitude);
    extent.ymax = Cesium.Math.toDegrees(carto_lt2.latitude);
    extent.xmax = Cesium.Math.toDegrees(carto_rb2.longitude);
    extent.ymin = Cesium.Math.toDegrees(carto_rb2.latitude);
  }

  // 获取高度
  extent.height = Math.ceil(viewer.camera.positionCartographic.height);
  return extent;
}
/**
 * 获得当前视野中心
 * @param {*} viewer
 */
const viewCenter = (viewer, inWorldCoordinates = true, result = new Cesium.Cartesian3()) => {
  const scene = viewer.scene;
  const camera = viewer.camera;
  const unprojectedScratch = new Cesium.Cartographic();
  const rayScratch = new Cesium.Ray();
  if (scene.mode === Cesium.SceneMode.MORPHING) {
    return undefined;
  }

  // TODO bug when tracking: if entity moves the current position should be used and not only the one when starting orbiting/rotating
  // TODO bug when tracking: reset should reset to default view of tracked entity

  if (Cesium.defined(viewer.trackedEntity)) {
    result = viewer.trackedEntity.position.getValue(viewer.clock.currentTime, result);
  } else {
    rayScratch.origin = camera.positionWC;
    rayScratch.direction = camera.directionWC;
    result = scene.globe.pick(rayScratch, scene, result);
  }
  if (!Cesium.defined(result)) {
    return undefined;
  }
  if (scene.mode === Cesium.SceneMode.SCENE2D || scene.mode === Cesium.SceneMode.COLUMBUS_VIEW) {
    result = camera.worldToCameraCoordinatesPoint(result, result);
    if (inWorldCoordinates) {
      result = scene.globe.ellipsoid.cartographicToCartesian(scene.mapProjection.unproject(result, unprojectedScratch), result);
    }
  } else {
    if (!inWorldCoordinates) {
      result = camera.worldToCameraCoordinatesPoint(result, result);
    }
  }
  return result;
};
const saveCurViewerImage = (viewer, filename) => {
  viewer.render();
  if (!filename || filename == "") {
    filename = new Date().toLocaleString() + ".png";
  }
  const ext = filename.split(".")[1];
  downloadFile(filename, viewer.scene.canvas.toDataURL("image/%s" % ext));
};
const downloadFile = (fileName, content) => {
  //下载文件
  let aLink = document.createElement("a");
  let blob = base64ToBlob(content); //new Blob([content]);
  let evt = document.createEvent("HTMLEvents");
  evt.initEvent("click", true, true); //initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
  aLink.download = fileName;
  aLink.href = URL.createObjectURL(blob);
  aLink.click();
  function base64ToBlob(code) {
    //base64转blob
    let parts = code.split(";base64,");
    let contentType = parts[0].split(":")[1];
    let raw = window.atob(parts[1]);
    let rawLength = raw.length;
    let uInt8Array = new Uint8Array(rawLength);
    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }
    return new Blob([uInt8Array], {
      type: contentType
    });
  }
};
const errroCatch = function (e, callback) {
  if (e.response) {
    callback(e.response.data);
  } else if (e.request) {
    callback(e.request);
  } else {
    callback(e.message);
  }
};
class CursorTip {
  constructor(text, id, viewer) {
    const tooltip = document.createElement("div");
    tooltip.id = id || "cursor-tip";
    tooltip.className = "cursor-tip-class";
    tooltip.innerHTML = text;
    document.body.appendChild(tooltip);
    this.ele = tooltip;
    this._visible = true;
    const self = this;
    if (viewer instanceof Cesium.Viewer) {
      viewer.screenSpaceEventHandler.setInputAction(e => {
        self.updatePosition(e.endPosition);
      }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    }
  }
  updatePosition(pixel) {
    this.ele.style.left = pixel.x + 10 + "px";
    this.ele.style.top = pixel.y + 10 + "px";
  }
  updateText(text) {
    this.ele.innerHTML = text;
  }
  get visible() {
    return this._visible;
  }
  set visible(v) {
    this._visible = v;
    if (v) {
      this.ele.style.display = "block";
    } else {
      this.ele.style.display = "none";
    }
  }
}
function checkViewer(viewer) {
  if (viewer instanceof Cesium.Viewer === false) {
    throw new CesiumDrawError(viewer + "不是一个有效的Cesium Viewer对象");
  }
}
function checkComponent(component, object) {
  if (component && component._viewer instanceof Cesium.Viewer === false) {
    throw new CesiumDrawError('组件尚未初始化' + component._uid);
  } else if (!component && !Cesium.defined(object)) {
    throw new CesiumDrawError('组件尚未初始化');
  }
}
class CesiumDrawError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CesiumDrawError';
  }
}
function pointVisibilityOnEarth(point, viewer) {
  return new Cesium.EllipsoidalOccluder(Cesium.Ellipsoid.WGS84, viewer.camera.position).isPointVisible(point);
}

/* harmony default export */ __webpack_exports__.ZP = ({
  moveDiv,
  errroCatch,
  currentExtent,
  viewCenter,
  saveCurViewerImage,
  downloadFile,
  CVT,
  CursorTip,
  pointVisibilityOnEarth
});

/***/ }),

/***/ 7952:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: function() { return /* binding */ layerManager; }
});

// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__(7203);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/layerManager.vue?vue&type=template&id=2a7e2bbd&scoped=true

const _withScopeId = n => ((0,external_commonjs_vue_commonjs2_vue_root_Vue_.pushScopeId)("data-v-2a7e2bbd"), n = n(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.popScopeId)(), n);
const _hoisted_1 = {
  class: "layer-manager-box",
  id: "layer-manager-box"
};
const _hoisted_2 = {
  class: "layer-manager-header",
  id: "layer-manager-header"
};
const _hoisted_3 = /*#__PURE__*/_withScopeId(() => /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("i", {
  class: "cesiumDrawFont iconclose1"
}, null, -1));
const _hoisted_4 = /*#__PURE__*/_withScopeId(() => /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("span", null, "标绘清单", -1));
const _hoisted_5 = {
  class: "layer-manager-tools"
};
const _hoisted_6 = /*#__PURE__*/_withScopeId(() => /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("i", {
  class: "cesiumDrawFont iconimport action-icon-class"
}, [/*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("span", null, "导入")], -1));
const _hoisted_7 = [_hoisted_6];
const _hoisted_8 = /*#__PURE__*/_withScopeId(() => /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("span", {
  class: "el-dropdown-link"
}, [/*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("i", {
  class: "cesiumDrawFont iconexport action-icon-class"
}, [/*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("span", null, "导出")])], -1));
const _hoisted_9 = /*#__PURE__*/_withScopeId(() => /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("span", null, "清空", -1));
const _hoisted_10 = [_hoisted_9];
const _hoisted_11 = {
  id: "layerTree",
  class: "graphic-draw-layer-manager-class"
};
const _hoisted_12 = {
  class: "custom-tree-node"
};
const _hoisted_13 = {
  key: 1,
  class: "node-name action-item"
};
const _hoisted_14 = {
  key: 2,
  class: "action-class"
};
const _hoisted_15 = ["title", "onClick"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_dropdown_item = (0,external_commonjs_vue_commonjs2_vue_root_Vue_.resolveComponent)("el-dropdown-item");
  const _component_el_dropdown_menu = (0,external_commonjs_vue_commonjs2_vue_root_Vue_.resolveComponent)("el-dropdown-menu");
  const _component_el_dropdown = (0,external_commonjs_vue_commonjs2_vue_root_Vue_.resolveComponent)("el-dropdown");
  const _component_el_input = (0,external_commonjs_vue_commonjs2_vue_root_Vue_.resolveComponent)("el-input");
  const _component_el_tree = (0,external_commonjs_vue_commonjs2_vue_root_Vue_.resolveComponent)("el-tree");
  return (0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)("div", _hoisted_1, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", _hoisted_2, [_hoisted_3, _hoisted_4, (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("span", {
    class: "closebtn cesiumDrawFont iconclose",
    onClick: _cache[0] || (_cache[0] = (...args) => $options.closeLayerManaer && $options.closeLayerManaer(...args))
  })]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", _hoisted_5, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("span", {
    class: "el-dropdown-link",
    onClick: _cache[1] || (_cache[1] = (...args) => $options.importHandler && $options.importHandler(...args))
  }, _hoisted_7), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_el_dropdown, {
    trigger: "click",
    onCommand: $options.exportHandler
  }, {
    dropdown: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_el_dropdown_menu, null, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_el_dropdown_item, {
        command: "MARKER",
        class: "cesiumDrawFont iconmarker"
      }, {
        default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createTextVNode)("标记")]),
        _: 1
      }), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_el_dropdown_item, {
        command: "POLYLINE",
        class: "cesiumDrawFont iconpolyline"
      }, {
        default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createTextVNode)("线")]),
        _: 1
      }), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_el_dropdown_item, {
        command: "POLYGON",
        class: "cesiumDrawFont iconpolygon"
      }, {
        default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createTextVNode)("多边形")]),
        _: 1
      }), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_el_dropdown_item, {
        command: "LABEL",
        class: "cesiumDrawFont iconlabel"
      }, {
        default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createTextVNode)("书签")]),
        _: 1
      })]),
      _: 1
    })]),
    default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.withCtx)(() => [_hoisted_8]),
    _: 1
  }, 8, ["onCommand"]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("i", {
    class: "cesiumDrawFont iconremove action-icon-last-class",
    onClick: _cache[2] || (_cache[2] = (...args) => $options.removeAll && $options.removeAll(...args))
  }, _hoisted_10)]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", _hoisted_11, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_el_tree, {
    data: $data.json,
    "show-checkbox": "",
    "node-key": "id",
    ref: "tree",
    onCheck: $options.checkAction,
    "default-expanded-keys": ['marker', 'polyline', 'polygon']
  }, {
    default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.withCtx)(({
      data
    }) => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("span", _hoisted_12, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("i", {
      class: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.normalizeClass)([data.icon, "action-item"])
    }, null, 2), data.edit ? ((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createBlock)(_component_el_input, {
      key: 0,
      modelValue: $data.newName,
      "onUpdate:modelValue": _cache[3] || (_cache[3] = $event => $data.newName = $event),
      onKeypress: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.withKeys)($event => $options.renameAction(data), ["enter"])
    }, null, 8, ["modelValue", "onKeypress"])) : ((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)("span", _hoisted_13, (0,external_commonjs_vue_commonjs2_vue_root_Vue_.toDisplayString)(data.text), 1)), !data.children ? ((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)("span", _hoisted_14, [((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(true), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)(external_commonjs_vue_commonjs2_vue_root_Vue_.Fragment, null, (0,external_commonjs_vue_commonjs2_vue_root_Vue_.renderList)($props.tools, tool => {
      return (0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)("i", {
        key: tool.id,
        class: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.normalizeClass)(["cesiumDrawFont action-item", [tool.icon]]),
        title: tool.text,
        onClick: $event => tool.action.call(this, data)
      }, null, 10, _hoisted_15);
    }), 128))])) : (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createCommentVNode)("", true)])]),
    _: 1
  }, 8, ["data", "onCheck"])])]);
}
;// CONCATENATED MODULE: ./src/components/layerManager.vue?vue&type=template&id=2a7e2bbd&scoped=true

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.push.js
var es_array_push = __webpack_require__(7658);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/layerManager.vue?vue&type=script&lang=js

function locate(data) {
  this.$emit("locate", data.id);
}
function rename(data, id, text) {
  // data.edit=true;
  if (data) {
    this.$set(data, "edit", true);
    this.newName = data.text;
  } else {
    for (let ls of this.json) {
      for (let l of ls.children) {
        if (l.id === id) {
          l.text = text;
        }
      }
    }
  }
}
function edit(data) {
  this.$emit("edit", data.id);
}
function drop(data) {
  if (!data) return;
  this.$emit("delete", data.id);
  const index = this.checked.indexOf(data.id);
  if (data.id > -1) {
    this.checked.splice(index, 1);
  }
  this.$nextTick(() => {
    this.$refs.tree.setCheckedKeys(this.checked);
  });
  for (let ls of this.json) {
    let i = 0;
    for (let l of ls.children) {
      if (l.id === data.id) {
        ls.children.splice(i, 1);
        break;
      }
      i++;
    }
  }
}
/* harmony default export */ var layerManagervue_type_script_lang_js = ({
  data() {
    return {
      markerTree: new Map(),
      polylineTree: new Map(),
      polygonTree: new Map(),
      labelTree: new Map(),
      modelTree: new Map(),
      renameNodeStatus: false,
      checked: [],
      newName: "",
      json: [{
        id: "marker",
        text: "标记",
        type: "marker",
        icon: "cesiumDrawFont icon-lujing",
        children: []
      }, {
        id: "polyline",
        text: "线",
        type: "polyline",
        icon: "cesiumDrawFont iconpolyline",
        children: []
      }, {
        id: "polygon",
        text: "多边形",
        type: "polygon",
        icon: "cesiumDrawFont iconpolygon",
        children: []
      }, {
        id: "label",
        text: "文字",
        type: "label",
        icon: "cesiumDrawFont iconlabel",
        children: []
      }, {
        id: "model",
        icon: "cesiumDrawFont iconmodel",
        text: "模型",
        type: "model",
        children: []
      }],
      defaultTools: {
        locate: {
          text: "定位",
          icon: "iconlocate",
          action: this.locate
        },
        rename: {
          text: "重命名",
          icon: "iconrename",
          action: this.rename
        },
        edit: {
          text: "编辑",
          icon: "iconedit",
          action: this.edit
        },
        drop: {
          text: "删除",
          icon: "iconremove",
          action: this.drop
        }
      }
    };
  },
  props: {
    tools: {
      default: function () {
        return {
          locate: {
            text: "定位",
            icon: "iconlocate",
            action: locate
          },
          rename: {
            text: "重命名",
            icon: "iconrename",
            action: rename
          },
          edit: {
            text: "编辑",
            icon: "iconedit",
            action: edit
          },
          drop: {
            text: "删除",
            icon: "iconremove",
            action: drop
          }
        };
      }
    }
  },
  mounted() {},
  computed: {},
  methods: {
    checkAction(data, node) {
      if (node.checkedKeys.includes(data.id)) {
        this.$emit("select", data.id, true);
      } else {
        this.$emit("select", data.id, false);
      }
    },
    locate(data) {
      locate.call(this, data);
    },
    rename(data, id, text) {
      rename.call(this, data, id, text);
    },
    edit(data) {
      edit.call(this, data);
    },
    drop(data) {
      drop.call(this, data);
    },
    renameAction(data) {
      data.edit = false;
      this.$emit("rename", data.id, this.newName);
      data.text = this.newName;
    },
    removeAll() {
      this.$emit("clear");
      for (let ls of this.json) {
        ls.children.splice(0);
      }
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys([]);
      });
    },
    insertLayer(type, id, name) {
      name = name || "未命名";
      this.json[type].children.push({
        id: id,
        text: name,
        icon: "el-icon-document"
      });
      this.checked.push(id);
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys(this.checked);
      });
    },
    exportHandler(cmd) {
      this.$emit("export", cmd);
    },
    importHandler(cmd) {
      this.$emit("import", cmd);
    },
    closeLayerManaer() {
      this.$emit("close");
    }
  }
});
;// CONCATENATED MODULE: ./src/components/layerManager.vue?vue&type=script&lang=js
 
;// CONCATENATED MODULE: ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-64.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-64.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-64.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-64.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/layerManager.vue?vue&type=style&index=0&id=2a7e2bbd&lang=scss&scoped=true
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./src/components/layerManager.vue?vue&type=style&index=0&id=2a7e2bbd&lang=scss&scoped=true

;// CONCATENATED MODULE: ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-64.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-64.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-64.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-64.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/layerManager.vue?vue&type=style&index=1&id=2a7e2bbd&lang=scss
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./src/components/layerManager.vue?vue&type=style&index=1&id=2a7e2bbd&lang=scss

// EXTERNAL MODULE: ./node_modules/vue-loader/dist/exportHelper.js
var exportHelper = __webpack_require__(1620);
;// CONCATENATED MODULE: ./src/components/layerManager.vue




;



const __exports__ = /*#__PURE__*/(0,exportHelper/* default */.Z)(layerManagervue_type_script_lang_js, [['render',render],['__scopeId',"data-v-2a7e2bbd"]])

/* harmony default export */ var layerManager = (__exports__);

/***/ }),

/***/ 5869:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Z: function() { return /* binding */ markerViewer; }
});

// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__(7203);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/markerViewer.vue?vue&type=template&id=6b7ffd82&scoped=true

const _withScopeId = n => ((0,external_commonjs_vue_commonjs2_vue_root_Vue_.pushScopeId)("data-v-6b7ffd82"), n = n(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.popScopeId)(), n);
const _hoisted_1 = {
  key: 0,
  id: "createMerkerPanel"
};
const _hoisted_2 = /*#__PURE__*/_withScopeId(() => /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("span", null, "添加标记", -1));
const _hoisted_3 = {
  class: "pane-row"
};
const _hoisted_4 = /*#__PURE__*/_withScopeId(() => /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", null, "名称：", -1));
const _hoisted_5 = {
  class: "pane-row pane-desc"
};
const _hoisted_6 = /*#__PURE__*/_withScopeId(() => /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", null, "描述：", -1));
const _hoisted_7 = ["src"];
const _hoisted_8 = /*#__PURE__*/_withScopeId(() => /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("br", null, null, -1));
const _hoisted_9 = ["src", "onClick"];
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_button = (0,external_commonjs_vue_commonjs2_vue_root_Vue_.resolveComponent)("el-button");
  const _component_el_upload = (0,external_commonjs_vue_commonjs2_vue_root_Vue_.resolveComponent)("el-upload");
  const _component_el_dialog = (0,external_commonjs_vue_commonjs2_vue_root_Vue_.resolveComponent)("el-dialog");
  const _component_el_header = (0,external_commonjs_vue_commonjs2_vue_root_Vue_.resolveComponent)("el-header");
  const _component_el_input = (0,external_commonjs_vue_commonjs2_vue_root_Vue_.resolveComponent)("el-input");
  const _component_el_main = (0,external_commonjs_vue_commonjs2_vue_root_Vue_.resolveComponent)("el-main");
  const _component_el_aside = (0,external_commonjs_vue_commonjs2_vue_root_Vue_.resolveComponent)("el-aside");
  const _component_el_container = (0,external_commonjs_vue_commonjs2_vue_root_Vue_.resolveComponent)("el-container");
  const _component_el_footer = (0,external_commonjs_vue_commonjs2_vue_root_Vue_.resolveComponent)("el-footer");
  return (0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)("div", {
    id: "markerContainer",
    style: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.normalizeStyle)({
      left: $data.winPos.x + 'px',
      top: $data.winPos.y + 'px'
    })
  }, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_el_dialog, {
    title: $data.markName + '附件',
    modelValue: $data.dialogVisible,
    "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => $data.dialogVisible = $event),
    "modal-append-to-body": false
  }, {
    default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_el_upload, {
      class: "upload-class",
      ref: "upload",
      action: $props.attachment.action,
      "on-remove": $props.attachment.delete,
      "on-success": $props.attachment.success,
      "file-list": $props.attachment.fileList,
      "on-preview": $props.attachment.download,
      "auto-upload": false
    }, {
      trigger: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_el_button, {
        size: "small",
        type: "primary"
      }, {
        default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createTextVNode)("选取文件")]),
        _: 1
      })]),
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_el_button, {
        style: {
          "margin-left": "10px"
        },
        size: "small",
        type: "success",
        onClick: _cache[0] || (_cache[0] = $event => _ctx.$refs.upload.submit())
      }, {
        default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createTextVNode)("上传到服务器")]),
        _: 1
      })]),
      _: 1
    }, 8, ["action", "on-remove", "on-success", "file-list", "on-preview"])]),
    _: 1
  }, 8, ["title", "modelValue"]), $data.markMode === 'marker' ? (0,external_commonjs_vue_commonjs2_vue_root_Vue_.withDirectives)(((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)("div", _hoisted_1, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_el_container, null, {
    default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_el_header, null, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.withCtx)(() => [_hoisted_2, $props.attachment.enabled ? ((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)("i", {
        key: 0,
        class: "el-icon-paperclip",
        onClick: _cache[2] || (_cache[2] = $event => $data.dialogVisible = true),
        title: "附件",
        style: {
          "font-size": "16px"
        }
      })) : (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createCommentVNode)("", true), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("span", {
        class: "closebtn cesiumDrawFont iconclose",
        onClick: _cache[3] || (_cache[3] = $event => $data.visible = false)
      })]),
      _: 1
    }), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_el_container, {
      id: "marker-panel"
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_el_container, null, {
        default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_el_main, {
          class: "marker-main-class"
        }, {
          default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", _hoisted_3, [_hoisted_4, (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_el_input, {
            modelValue: $data.markName,
            "onUpdate:modelValue": _cache[4] || (_cache[4] = $event => $data.markName = $event),
            ref: "nameinput",
            onKeyup: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.withKeys)($options.update, ["enter"])
          }, null, 8, ["modelValue", "onKeyup"])]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", _hoisted_5, [_hoisted_6, (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_el_input, {
            modelValue: $data.markRemark,
            "onUpdate:modelValue": _cache[5] || (_cache[5] = $event => $data.markRemark = $event),
            type: "textarea"
          }, null, 8, ["modelValue"])])]),
          _: 1
        }), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_el_aside, null, {
          default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("img", {
            src: _ctx.selectedImage
          }, null, 8, _hoisted_7), _hoisted_8, (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("a", {
            href: "#",
            id: "imageC",
            onClick: _cache[6] || (_cache[6] = $event => $data.selectPanel = true)
          }, "更换")]),
          _: 1
        })]),
        _: 1
      }), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_el_footer, null, {
        default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_el_button, {
          type: "danger",
          id: "cancelbtn",
          plain: "",
          size: "small",
          onClick: $options.cancelMark
        }, {
          default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createTextVNode)("删除")]),
          _: 1
        }, 8, ["onClick"]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_el_button, {
          type: "primary",
          plain: "",
          size: "small",
          id: "submitbtn",
          onClick: $options.update
        }, {
          default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createTextVNode)("确定")]),
          _: 1
        }, 8, ["onClick"])]),
        _: 1
      })]),
      _: 1
    })]),
    _: 1
  }, 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_.vShow, !$data.selectPanel]]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_el_container, {
    class: "image-list-class"
  }, {
    default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.withCtx)(() => [((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(true), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)(external_commonjs_vue_commonjs2_vue_root_Vue_.Fragment, null, (0,external_commonjs_vue_commonjs2_vue_root_Vue_.renderList)($data.images, (img, index) => {
      return (0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)("img", {
        src: img,
        key: index,
        onClick: $event => $options.changeHandler(img)
      }, null, 8, _hoisted_9);
    }), 128))]),
    _: 1
  }, 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_.vShow, $data.selectPanel]])], 512)), [[external_commonjs_vue_commonjs2_vue_root_Vue_.vShow, $data.visible]]) : (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createCommentVNode)("", true), $data.markMode === 'label' ? (0,external_commonjs_vue_commonjs2_vue_root_Vue_.withDirectives)(((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)("div", {
    key: 1,
    id: "createLabelPanel",
    style: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.normalizeStyle)({
      left: $data.winPos.x + 'px',
      top: $data.winPos.y + 'px'
    })
  }, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_el_input, {
    modelValue: $data.markName,
    "onUpdate:modelValue": _cache[7] || (_cache[7] = $event => $data.markName = $event),
    onKeypress: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.withKeys)($options.update, ["enter"]),
    ref: "nameinput"
  }, null, 8, ["modelValue", "onKeypress"]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_el_button, {
    size: "small",
    onClick: $options.update,
    style: {
      "margin-left": "20px"
    }
  }, {
    default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createTextVNode)("确定")]),
    _: 1
  }, 8, ["onClick"])], 4)), [[external_commonjs_vue_commonjs2_vue_root_Vue_.vShow, $data.visible]]) : (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createCommentVNode)("", true), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("input", {
    type: "file",
    onChange: _cache[8] || (_cache[8] = (...args) => $options.importMarks && $options.importMarks(...args)),
    id: "uploadhandler",
    accept: ".json"
  }, null, 544), [[external_commonjs_vue_commonjs2_vue_root_Vue_.vShow, false]])], 4);
}
;// CONCATENATED MODULE: ./src/components/markerViewer.vue?vue&type=template&id=6b7ffd82&scoped=true

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.push.js
var es_array_push = __webpack_require__(7658);
// EXTERNAL MODULE: ./src/core/Graphic.js + 4 modules
var Graphic = __webpack_require__(6857);
// EXTERNAL MODULE: ./src/js/utils.js
var utils = __webpack_require__(4996);
// EXTERNAL MODULE: ./src/core/GraphicType.js
var GraphicType = __webpack_require__(8638);
// EXTERNAL MODULE: ./node_modules/jquery/dist/jquery.js
var jquery = __webpack_require__(7107);
var jquery_default = /*#__PURE__*/__webpack_require__.n(jquery);
;// CONCATENATED MODULE: ./src/core/MarkerManager.js





const cvt = utils/* default.CVT */.ZP.CVT;
const LEFT_CLICK = Cesium.ScreenSpaceEventType.LEFT_CLICK;
const RIGHT_CLICK = Cesium.ScreenSpaceEventType.RIGHT_CLICK;
const MOUSE_MOVE = Cesium.ScreenSpaceEventType.MOUSE_MOVE;
function setString(str, len) {
  var strlen = 0;
  var s = "";
  for (var i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 128) {
      strlen += 2;
    } else {
      strlen++;
    }
    s += str.charAt(i);
    if (strlen >= len) {
      return s + "...";
    }
  }
  return s;
}
class MarkerManager {
  constructor(viewer, markerOptions = Graphic/* CesiumBillboard.defaultStyle */.ZT.defaultStyle, labelOptions = Graphic/* CesiumBillboard.defaultLabelStyle */.ZT.defaultLabelStyle, modelOptions = Graphic/* CesiumModel.defaultStyle */.VB.defaultStyle) {
    if (viewer instanceof Cesium.Viewer) {
      this._viewer = viewer;
    }
    if (!Cesium.defined(this._viewer)) {
      return;
    }
    /**
     * 表示当前添加的标记类型,marker,label,model
     */
    this.markName = '';
    this.markRemark = '';
    this.markMode = 'marker';
    this.defaultImage = Graphic/* CesiumBillboard.defaultStyle.image */.ZT.defaultStyle.image;
    this.selectedImage = undefined;
    this.popWinPosition = undefined;
    this.markerid = undefined;
    this.markerOptions = markerOptions;
    this.labelOptions = labelOptions;
    this.modelOptions = modelOptions;
    this.cursorTip = new utils/* default.CursorTip */.ZP.CursorTip("左键标绘，右键结束.", "marker-tip", viewer);
    this.cursorTip.visible = false;
    this.handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
    this.manager = new Map();
    this.pickHandler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
    this.init(this._viewer);
  }
  init(viewer) {
    if (viewer instanceof Cesium.Viewer === false) {
      throw new Error("viewer不是一个有效的Cesium Viewer对象.");
    }
    this.viewer = viewer;
    const handler = this.handler;
    const self = this;
    const manager = this.manager;
    //气泡跟随地球移动
    viewer.scene.postRender.addEventListener(function () {
      if (Cesium.defined(self.popWinPosition)) {
        const pos = cvt.cartesian2Pixel(self.popWinPosition, viewer);
        const ele = document.getElementById("popContainer");
        if (!ele) {
          return;
        }
        ele.style.left = pos.x - 100 - 5 + "px";
        ele.style.top = pos.y - 110 + "px";
        const curPos = self.popWinPosition;
        //标记转到地球背面隐藏气泡
        if (utils/* default.pointVisibilityOnEarth */.ZP.pointVisibilityOnEarth(curPos, self._viewer)) {
          ele.style.display = "block";
        } else {
          ele.style.display = "none";
        }

        // ele.style.display = "block";
      }
    });

    const showTip = function (e) {
      const obj = viewer.scene.pick(e.position);
      if (Cesium.defined(obj) && obj.id instanceof Cesium.Entity && obj.id.mtype === GraphicType/* default.MARKER */.Z.MARKER) {
        //   self.popWinPosition = cvt.pixel2Cartesian(e.position, viewer);
        self.selectedMarker = manager.get(obj.id.mid);
        if (self.popDiv) {
          self.destroyPopPanle();
        } else {
          self.createPopPanel();
        }
      } else {
        self.destroyPopPanle();
      }
    };
    handler.setInputAction(showTip, LEFT_CLICK);
  }
  /**
   * 开始拾取marker，调用该方法后开始监听鼠标单击，添加标记
   * @param {string} type表示何种标记,marker:billboard，label:label,model:model
   * @param {string} mode如果mode不是single，将连续添加标记
   */
  pick(type = "marker", mode = "single") {
    this.markMode = type;
    const viewer = this._viewer;
    this.cursorTip.visible = true;
    const handler = this.pickHandler;
    const self = this;
    const id = this.generateId();
    self.markerid = id;
    const manager = this.manager;
    const pick = function (e) {
      const cartesian = cvt.pixel2Cartesian(e.position, viewer);
      if (Cesium.defined(cartesian)) {
        // mp.position = cartesian;
        let marker;
        if (type === "marker") {
          marker = self.createMarker(cartesian);
        } else if (type === "label") {
          marker = self.createLabel(cartesian);
        } else if (type === "model") {
          marker = self.createModel(cartesian);
        } else {
          //默认marker
          marker = self.createMarker(cartesian);
        }
        self.visible = true;
        manager.set(id, marker);
        marker.mid = id;
        // marker.mname = "未命名" + viewer.entities.values.length;

        self.selectedMarker = marker;
        self.activeMarker = marker;
        self.cursorTip.visible = false;
        if (type === "model") {
          self.activeMarker = undefined;
        }
        if (mode === "single") {
          handler.removeInputAction(LEFT_CLICK);
          handler.removeInputAction(RIGHT_CLICK);
        }
        const evt = new CustomEvent('marker-add', {
          detail: {
            id: marker.mid,
            name: marker.mname || '未命名',
            description: marker.description,
            type: marker.mtype,
            position: cvt.toDegrees(cartesian, self._viewer)
          }
        });
        window.dispatchEvent(evt);
        marker = undefined;
      }
    };
    const cancel = function () {
      handler.removeInputAction(LEFT_CLICK);
      handler.removeInputAction(RIGHT_CLICK);
      // handler.destroy();
      self.cursorTip.visible = false;
      const id = self.activeMarker ? self.activeMarker.id : undefined;
      const evt = new CustomEvent('marker-delete', {
        detail: {
          id: id
        }
      });
      window.dispatchEvent(evt);
      self.activeMarker = undefined;
      //handler=undefined
    };

    const updateTip = function (e) {
      self.cursorTip.updatePosition(e.endPosition);
    };
    handler.setInputAction(cancel, RIGHT_CLICK);
    handler.setInputAction(pick, LEFT_CLICK);
    handler.setInputAction(updateTip, MOUSE_MOVE);
  }
  get(id) {
    if (this.has(id)) {
      return this.manager.get(id);
    }
  }
  has(id) {
    if (this.manager) {
      return this.manager.has(id);
    }
    return false;
  }
  createMarker(cartesian) {
    const mp = this.labelOptions;
    const marker = new Graphic/* CesiumBillboard */.ZT(this._viewer, {
      ...this.markerOptions,
      position: cartesian,
      image: this.selectedImage
    }, mp);
    return marker;
  }
  changeHandler(img) {
    this.selectedImage = img;
    this.activeMarker.updateImage(this.selectedImage);
  }
  panelPosition() {
    if (this.activeMarker) {
      if (this.markMode === "marker") {
        const position = this.activeMarker.graphic.position.getValue(this.viewer.clock.currentTime);
        const pixel = cvt.cartesian2Pixel(position, this._viewer);
        const x = pixel.x > 170 ? pixel.x - 170 : pixel.x + 10;
        const y = pixel.y > 210 ? pixel.y - 240 : pixel.y + 50;
        return {
          x: x,
          y: y
        };
      } else {
        const position = this.activeMarker.graphic.position.getValue(this.viewer.clock.currentTime);
        const pixel = cvt.cartesian2Pixel(position, this._viewer);
        const x = pixel.x + 10;
        const y = pixel.y - 25;
        return {
          x: x,
          y: y
        };
      }
    } else {
      return {
        x: 0,
        y: 0
      };
    }
  }
  createLabel(cartesian) {
    const options = this.labelOptions;
    options.position = cartesian;
    const marker = new Graphic/* CesiumLabel */.ob(this._viewer, options);
    return marker;
  }
  createModel(cartesian) {
    const options = this.modelOptions;
    options.position = cartesian;
    const marker = new Graphic/* CesiumModel */.VB(this._viewer, options);
    return marker;
  }
  removeEventListener() {
    const pickHandler = this.pickHandler;
    if (pickHandler) {
      if (!pickHandler.isDestroyed()) {
        // pickHandler.destroy();
        pickHandler.removeInputAction(LEFT_CLICK);
        pickHandler.removeInputAction(RIGHT_CLICK);
        pickHandler.removeInputAction(MOUSE_MOVE);
      }
    }
  }
  stopPick() {
    this.removeEventListener();
    if (this.activeMarker) {
      this.activeMarker.destroy();
      const evt = new CustomEvent('marker-delete', {
        detail: {
          id: this.activeMarker.mid
        }
      });
      window.dispatchEvent(evt);
    }
    this.activeMarker = undefined;
    this.cursorTip.visible = false;
  }
  zoomTo(id) {
    if (this.manager.has(id)) {
      this.manager.get(id).zoomTo();
    }
  }
  edit(id) {
    const manager = this.manager;
    if (manager.has(id)) {
      const mm = manager.get(id);
      this.activeMarker = mm;
      mm.startEdit();
      if (mm.mtype === GraphicType/* default.MARKER */.Z.MARKER || mm.mtype === GraphicType/* default.LABEL */.Z.LABEL) {
        this.markName = this.activeMarker.mname;
        this.markRemark = this.activeMarker.description;
        this.visible = true;
      }
      // this.activeMarker.zoomTo();
      const pixel = this.panelPosition();
      const evt = new CustomEvent('marker-edit', {
        detail: {
          name: this.markName,
          remark: this.markRemark,
          type: this.activeMarker.type,
          pos: pixel
        }
      });
      window.dispatchEvent(evt);
    }
  }
  drop(id) {
    const mm = this.manager.get(id);
    mm && mm.destroy();
    this.manager.delete(id);
  }
  rename(id, name) {
    const mm = this.manager.get(id);
    mm.mname = name;
  }
  select(type, id, status) {
    if (Cesium.defined(id)) {
      const manager = this.manager.get(id);
      if (Cesium.defined(manager)) {
        manager.show = status;
      }
    }
    if (Cesium.defined(type)) {
      const values = this.manager.values();
      for (let v of values) {
        if (v.mtype === type) {
          v.show = status;
        }
      }
    }
  }
  destroyPopPanle() {
    if (this.popDiv) {
      jquery_default()(this.popDiv).remove();
      this.popDiv = undefined;
    }
  }
  destroy() {
    this.removeAll();
    this.destroyPopPanle();
    if (!this.pickHandler.isDestroyed()) {
      this.pickHandler.destroy();
    }
    if (!this.handler.isDestroyed()) {
      this.handler.destroy();
    }
    this._viewer = undefined;
    this.labelOptions = undefined;
    this.markerOptions = undefined;
    this.modelOptions = undefined;
  }
  createPopPanel() {
    if (!Cesium.defined(this.selectedMarker)) {
      return;
    }
    if (this.popDiv) {
      this.destroyPopPanle();
    }
    const popdiv = document.createElement("div");
    popdiv.id = "popContainer";
    popdiv.className = "marker-popWin-class";
    const position = this.selectedMarker.position;
    this.popWinPosition = position;
    const coord = cvt.cartesian2Degrees(position, this._viewer);
    popdiv.style.display = "none";
    // const txtdiv = document.createElement("span");
    // txtdiv.innerText = "名称:" + (this.selectedMarker.name || "未命名");
    let remarkdiv;
    remarkdiv = document.createElement('span');
    remarkdiv.title = this.selectedMarker.description;
    remarkdiv.innerText = "描述:" + setString(this.selectedMarker.description || '暂无', 14);
    const coordsdiv = document.createElement("span");
    coordsdiv.innerText = "纬度:" + coord.lon.toFixed(2) + "  纬度:" + coord.lat.toFixed(2);
    const arrow = document.createElement("div");
    arrow.className = "arrow";
    const closebtn = document.createElement("span");
    closebtn.className = "iconfont iconclose closebtn";
    const self = this;
    closebtn.onclick = function () {
      jquery_default()(self.popDiv).remove();
      self.popDiv = undefined;
    };
    popdiv.appendChild(closebtn);
    // popdiv.appendChild(txtdiv);
    if (remarkdiv) {
      popdiv.appendChild(remarkdiv);
    }
    popdiv.appendChild(coordsdiv);
    popdiv.appendChild(arrow);
    this.popDiv = popdiv;
    this._viewer.container.appendChild(this.popDiv);
  }
  import(feat) {
    if (feat.geometry.type.toUpperCase() !== "POINT") {
      throw new Error("无效的数据类型.");
    }
    const id = this.generateId();
    let marker;
    if (feat.properties.mtype === GraphicType/* default.LABEL */.Z.LABEL) {
      const lopts = Graphic/* CesiumLabel.defaultStyle */.ob.defaultStyle;
      lopts.position = Cesium.Cartesian3.fromDegrees(...feat.geometry.coordinates);
      lopts.text = feat.properties.name;
      marker = new Graphic/* CesiumLabel */.ob(this._viewer, lopts);
    } else {
      const coord = {
        lon: feat.geometry.coordinates[0],
        lat: feat.geometry.coordinates[1],
        height: feat.geometry.coordinates[2]
      };
      marker = Graphic/* CesiumBillboard.fromDegrees */.ZT.fromDegrees(this._viewer, coord);
    }
    marker.mname = feat.properties.name;
    marker.mid = id;
    this.manager.set(id, marker);
    const evt = new CustomEvent('marker-add', {
      detail: {
        id: marker.mid,
        name: marker.mname || '未命名',
        type: marker.mtype,
        description: marker.description,
        properties: feat.properties,
        position: {
          lon: feat.geometry.coordinates[0],
          lat: feat.geometry.coordinates[1],
          height: feat.geometry.coordinates[2]
        }
      }
    });
    window.dispatchEvent(evt);
  }
  addMarker(marker) {
    this.manager.set(marker.mid, marker);
  }
  export(type) {
    const managers = this.manager.values();
    const json = {
      type: "FeatureCollection",
      name: "graphic",
      crs: {
        type: "name",
        properties: {
          name: "urn:ogc:def:crs:OGC:1.3:CRS84"
        }
      },
      features: []
    };
    for (let m of managers) {
      if (m.type === type) {
        json.features.push(m.toGeoJson());
      }
    }
    const blob = new Blob([JSON.stringify(json)], {
      type: ""
    });
    window.saveAs(blob, type + parseInt(Cesium.getTimestamp()) + ".geojson");
  }
  set font(font) {
    this.labelOptions.font = font;
    if (this.activeMarker) {
      this.activeMarker.font = font;
    }
  }
  get font() {
    if (this.activeMarker) {
      return this.activeMarker.font;
    }
    return undefined;
  }
  set color(color) {
    this.labelOptions.fillColor = color;
    if (this.activeMarker) {
      this.activeMarker.color = color;
    }
  }
  set label(option) {
    const keys = Object.keys(option);
    for (let key of keys) {
      this.labelOptions[key] = option[key];
    }
    // this.modelAndLabelOptions=[...this.modelAndLabelOptions,...option]
    if (this.activeMarker) {
      this.activeMarker.setLabel(this.labelOptions);
    }
  }
  set model(options) {
    this.modelOptions = {
      ...this.modelOptions,
      ...options
    };
    if (this.activeMarker) {
      if (options.uri) {
        this.activeMarker.uri = options.uri;
      }
      if (options.color) {
        this.activeMarker.color = options.color;
      }
      if (options.mode != undefined) {
        this.activeMarker.model = options.mode;
      }
      if (options.mixed != undefined) {
        this.activeMarker.mixed = options.mixed;
      }
    }
  }
  removeAll() {
    const values = this.manager.values();
    for (let v of values) {
      v.remove();
      v.destroy();
    }
    this.manager.clear();
  }
  cancelMark() {
    this.activeMarker && this.activeMarker.destroy();
    this.activeMarker = undefined;
    this.cursorTip.visible = false;
    const evt = new CustomEvent('marker-delete', {
      detail: {
        id: this.markerid
      }
    });
    window.dispatchEvent(evt);
    this.markName = "";
    this.markRemark = "";
    this.manager.delete(this.markerid);
    this.markerid = undefined;
    this.removeEventListener();
  }
  update(name, remark) {
    this.markName = name;
    this.markRemark = remark;
    this.activeMarker.updateText(this.markName, this.markRemark);
    this.cursorTip.visible = false;
    this.activeMarker.stopEdit();
    const evt = new CustomEvent('marker-update', {
      detail: {
        id: this.activeMarker.mid,
        name: this.activeMarker.mname,
        description: this.activeMarker.description,
        position: cvt.toDegrees(this.activeMarker.position, this._viewer)
      }
    });
    window.dispatchEvent(evt);
    this.activeMarker = undefined;
    this.removeEventListener();
  }
  generateId() {
    return (Math.random() * 10000000).toString(16).substr(0, 4) + "-" + new Date().getTime() + "-" + Math.random().toString().substr(2, 5);
  }
}
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/markerViewer.vue?vue&type=script&lang=js



/* harmony default export */ var markerViewervue_type_script_lang_js = ({
  name: "cesiumMarkerViewer",
  data() {
    return {
      visible: false,
      selectPanel: false,
      markName: "",
      markRemark: "",
      images: [],
      markMode: "",
      winPos: {
        x: 0,
        y: 0
      },
      dialogVisible: false,
      fileList: []
    };
  },
  computed: {},
  components: {},
  props: {
    extendImage: {
      type: Array,
      default: function () {
        return [];
      }
    },
    attachment: {
      default: function () {
        return {
          enabled: false,
          method: ""
        };
      }
    }
  },
  directives: {
    focus: {
      bind: function (el) {
        el.focus();
      },
      updated: function (el) {
        el.focus();
      },
      inserted: function (el) {
        el.focus();
      }
    }
  },
  mounted() {
    const self = this;
    window.addEventListener("marker-edit", e => {
      const type = e.detail.type;
      self.visible = true;
      self.markName = e.detail.name;
      self.markRemark = e.detail.remark;
      self.winPos = {
        ...e.detail.pos
      };
      self.$emit("editEvent", type);
    });
    window.addEventListener("marker-add", e => {
      self.winPos = self.markerManager.panelPosition();
      self.visible = true;
      self.$emit("addEvent", e.detail.id, e.detail.name, e.detail.type);
    });
    window.addEventListener("marker-delete", e => {
      self.visible = false;
      self.$emit("deleteEvent", e.detail.id);
      self.markName = "";
      self.markRemark = "";
    });
    window.addEventListener("marker-update", e => {
      self.$emit("updateEvent", e.detail.id, e.detail.name);
      self.markName = "";
      self.markRemark = "";
    });
    this.$nextTick(() => {
      utils/* default.moveDiv */.ZP.moveDiv("markerContainer");
    });
  },
  methods: {
    init(viewer) {
      if (this._viewer) {
        return;
      }
      (0,utils/* checkViewer */.vV)(viewer);
      this._viewer = viewer;
      !this.markerManager && (this.markerManager = new MarkerManager(viewer));
      this.images = [this.markerManager.defaultImage, ...this.extendImage];
      this.selectedImage = this.markerManager.defaultImage;
    },
    pick(type = "marker", mode = "single") {
      (0,utils/* checkComponent */.FN)(this);
      if (this.markerManager) {
        this.markMode = type;
        return this.markerManager.pick(type, mode);
      }
    },
    createMarker(cartesian) {
      if (this.markerManager) {
        return this.markerManager.createMarker(cartesian);
      }
    },
    panelPosition() {
      if (this.markerManager) {
        return this.markerManager.panelPosition();
      }
    },
    createLabel(cartesian) {
      if (this.markerManager) {
        return this.markerManager.createLabel(cartesian);
      }
    },
    createModel(cartesian) {
      if (this.markerManager) {
        return this.markerManager.createLabel(cartesian);
      }
    },
    removeEventListener() {
      if (this.markerManager) {
        return this.markerManager.removeEventListener();
      }
    },
    stopPick() {
      if (this.markerManager) {
        this.markerManager.stopPick();
      }
    },
    zoomTo(id) {
      if (this.markerManager) {
        this.markerManager.zoomTo(id);
      }
    },
    edit(id) {
      if (this.markerManager) {
        this.markerManager.edit(id);
      }
    },
    drop(id) {
      if (this.markerManager) {
        this.markerManager.drop(id);
      }
    },
    rename(id, name) {
      if (this.markerManager) {
        this.markerManager.rename(id, name);
      }
    },
    select(type, id, status) {
      if (this.markerManager) {
        this.markerManager.select(type, id, status);
      }
    },
    destroyPopPanle() {
      if (this.markerManager) {
        this.markerManager.destroyPopPanle();
      }
    },
    createPopPanel() {
      if (this.markerManager) {
        this.markerManager.createPopPanel();
      }
    },
    import(feat) {
      if (this.markerManager) {
        this.markerManager.createPopPanel();
        this.markerManager.import(feat);
      }
    },
    export(type) {
      if (this.markerManager) {
        this.markerManager.export(type);
      }
    },
    setFont(font) {
      if (this.markerManager) {
        this.markerManager.font = font;
      }
    },
    getFont() {
      if (this.activeMarker) {
        return this.markerManager.font;
      }
      return undefined;
    },
    setColor(color) {
      if (this.markerManager) {
        this.markerManager.color = color;
      }
    },
    setLabel(option) {
      if (this.markerManager) {
        this.markerManager.label = option;
      }
    },
    setModel(options) {
      if (this.markerManager) {
        this.markerManager.model = options;
      }
    },
    removeAll() {
      if (this.markerManager) {
        this.markerManager.removeAll();
      }
    },
    cancelMark() {
      if (this.markerManager) {
        this.markerManager.cancelMark();
      }
    },
    update() {
      if (this.markerManager) {
        this.markerManager.update(this.markName, this.markRemark);
        this.visible = false;
      }
    },
    changeHandler(img) {
      if (this.markerManager) {
        this.markerManager.changeHandler(img);
        this.selectedImage = img;
      }
      this.selectPanel = false;
    },
    generateId() {
      if (this.markerManager) {
        return this.markerManager.generateId();
      }
    },
    getById(id) {
      if (this.has(id)) {
        return this.markerManager.get(id);
      }
    },
    has(id) {
      if (this.markerManager) {
        return this.markerManager.has(id);
      }
      return false;
    },
    importMarks() {}
  },
  watch: {
    visible(val) {
      if (val) {
        this.$nextTick(() => {
          this.$refs.nameinput.focus();
        });
      }
    }
  }
});
;// CONCATENATED MODULE: ./src/components/markerViewer.vue?vue&type=script&lang=js
 
;// CONCATENATED MODULE: ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-64.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-64.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-64.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-64.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/markerViewer.vue?vue&type=style&index=0&id=6b7ffd82&lang=scss&scoped=true
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./src/components/markerViewer.vue?vue&type=style&index=0&id=6b7ffd82&lang=scss&scoped=true

// EXTERNAL MODULE: ./node_modules/vue-loader/dist/exportHelper.js
var exportHelper = __webpack_require__(1620);
;// CONCATENATED MODULE: ./src/components/markerViewer.vue




;


const __exports__ = /*#__PURE__*/(0,exportHelper/* default */.Z)(markerViewervue_type_script_lang_js, [['render',render],['__scopeId',"data-v-6b7ffd82"]])

/* harmony default export */ var markerViewer = (__exports__);

/***/ }),

/***/ 7203:
/***/ (function(module) {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__7203__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	!function() {
/******/ 		__webpack_require__.p = "";
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": function() { return /* binding */ entry_lib; }
});

;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
/* eslint-disable no-var */
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (false) { var getCurrentScript; }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__(7203);
var external_commonjs_vue_commonjs2_vue_root_Vue_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_vue_commonjs2_vue_root_Vue_);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/cesiumDrawViewer.vue?vue&type=template&id=0e860acb&scoped=true

const _withScopeId = n => ((0,external_commonjs_vue_commonjs2_vue_root_Vue_.pushScopeId)("data-v-0e860acb"), n = n(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.popScopeId)(), n);
const _hoisted_1 = {
  id: "drawtoolPanel"
};
const _hoisted_2 = /*#__PURE__*/_withScopeId(() => /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("span", null, "基础标绘", -1));
const _hoisted_3 = {
  key: 0
};
const _hoisted_4 = {
  class: "graphic-edit"
};
const _hoisted_5 = {
  class: "marker-edit-class edit-class"
};
const _hoisted_6 = {
  class: "polyline-edit-class edit-class"
};
const _hoisted_7 = {
  class: "polygon-edit-class edit-class"
};
const _hoisted_8 = {
  class: "label-edit-class edit-class"
};
const _hoisted_9 = {
  class: "model-edit-class edit-class"
};
const _hoisted_10 = {
  class: "model-select-panel"
};
const _hoisted_11 = ["title", "onClick", "src", "onerror"];
const _hoisted_12 = /*#__PURE__*/_withScopeId(() => /*#__PURE__*/(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("i", {
  class: "cesiumDrawFont iconmodel model-selector-trigger",
  title: "选择模型"
}, null, -1));
function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_header = (0,external_commonjs_vue_commonjs2_vue_root_Vue_.resolveComponent)("el-header");
  const _component_el_main = (0,external_commonjs_vue_commonjs2_vue_root_Vue_.resolveComponent)("el-main");
  const _component_el_container = (0,external_commonjs_vue_commonjs2_vue_root_Vue_.resolveComponent)("el-container");
  const _component_el_color_picker = (0,external_commonjs_vue_commonjs2_vue_root_Vue_.resolveComponent)("el-color-picker");
  const _component_el_option = (0,external_commonjs_vue_commonjs2_vue_root_Vue_.resolveComponent)("el-option");
  const _component_el_select = (0,external_commonjs_vue_commonjs2_vue_root_Vue_.resolveComponent)("el-select");
  const _component_el_popover = (0,external_commonjs_vue_commonjs2_vue_root_Vue_.resolveComponent)("el-popover");
  const _component_el_slider = (0,external_commonjs_vue_commonjs2_vue_root_Vue_.resolveComponent)("el-slider");
  const _component_MarkerViewer = (0,external_commonjs_vue_commonjs2_vue_root_Vue_.resolveComponent)("MarkerViewer");
  const _component_layerManager = (0,external_commonjs_vue_commonjs2_vue_root_Vue_.resolveComponent)("layerManager");
  return (0,external_commonjs_vue_commonjs2_vue_root_Vue_.withDirectives)(((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)("div", _hoisted_1, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_el_container, null, {
    default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_el_header, {
      id: "drawtoolHead"
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.withCtx)(() => [_hoisted_2, (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("span", {
        class: "closebtn cesiumDrawFont icondelete",
        onClick: _cache[0] || (_cache[0] = $event => _ctx.$emit('closeEvent'))
      })]),
      _: 1
    }), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_el_main, {
      class: "graphic-draw-main"
    }, {
      default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("ul", null, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("li", null, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("i", {
        class: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.normalizeClass)(["cesiumDrawFont iconmarker icon-class", {
          'selected-graphic': $data.menuSelected['MARKER']
        }]),
        title: "添加标记",
        onClick: _cache[1] || (_cache[1] = $event => $options.menuAction('MARKER'))
      }, null, 2), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("span", {
        onClick: _cache[2] || (_cache[2] = $event => $options.menuAction('MARKER')),
        class: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.normalizeClass)({
          'selected-graphic': $data.menuSelected['MARKER']
        })
      }, "标记", 2)]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("li", null, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("i", {
        class: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.normalizeClass)(["cesiumDrawFont iconpolyline icon-class", {
          'selected-graphic': $data.menuSelected['POLYLINE']
        }]),
        title: "添加线段",
        onClick: _cache[3] || (_cache[3] = $event => $options.menuAction('POLYLINE'))
      }, null, 2), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("span", {
        onClick: _cache[4] || (_cache[4] = $event => $options.menuAction('POLYLINE')),
        class: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.normalizeClass)({
          'selected-graphic': $data.menuSelected['POLYLINE']
        })
      }, "折线", 2)]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("li", null, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("i", {
        class: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.normalizeClass)(["cesiumDrawFont iconpolygon icon-class", {
          'selected-graphic': $data.menuSelected['POLYGON']
        }]),
        title: "添加多边形",
        onClick: _cache[5] || (_cache[5] = $event => $options.menuAction('POLYGON'))
      }, null, 2), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("span", {
        onClick: _cache[6] || (_cache[6] = $event => $options.menuAction('POLYGON')),
        class: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.normalizeClass)({
          'selected-graphic': $data.menuSelected['POLYGON']
        })
      }, "多边形", 2)]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("li", null, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("i", {
        class: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.normalizeClass)(["cesiumDrawFont iconlabel icon-class", {
          'selected-graphic': $data.menuSelected['LABEL']
        }]),
        title: "添加文字",
        onClick: _cache[7] || (_cache[7] = $event => $options.menuAction('LABEL'))
      }, null, 2), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("span", {
        onClick: _cache[8] || (_cache[8] = $event => $options.menuAction('LABEL')),
        class: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.normalizeClass)({
          'selected-graphic': $data.menuSelected['LABEL']
        })
      }, "文字", 2)]), $props.extendMarkerModel.length ? ((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)("li", _hoisted_3, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("i", {
        class: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.normalizeClass)(["cesiumDrawFont iconmodel icon-class", {
          'selected-graphic': $data.menuSelected['MODEL']
        }]),
        title: "添加模型",
        onClick: _cache[9] || (_cache[9] = $event => $options.menuAction('MODEL'))
      }, null, 2), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("span", {
        onClick: _cache[10] || (_cache[10] = $event => $options.menuAction('MODEL')),
        class: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.normalizeClass)({
          'selected-graphic': $data.menuSelected['MODEL']
        })
      }, "模型", 2)])) : (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createCommentVNode)("", true), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("li", null, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("i", {
        class: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.normalizeClass)(["cesiumDrawFont iconlayer icon-class", {
          'selected-graphic': $data.layerManagerVisible
        }]),
        title: "图层管理",
        onClick: _cache[11] || (_cache[11] = $event => $data.layerManagerVisible = !$data.layerManagerVisible)
      }, null, 2), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("span", {
        class: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.normalizeClass)({
          'selected-graphic': $data.layerManagerVisible
        }),
        onClick: _cache[12] || (_cache[12] = $event => $data.layerManagerVisible = !$data.layerManagerVisible)
      }, "清单", 2)])])]),
      _: 1
    })]),
    _: 1
  }), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", _hoisted_4, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", _hoisted_5, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_el_color_picker, {
    modelValue: $data.markerColor,
    "onUpdate:modelValue": _cache[13] || (_cache[13] = $event => $data.markerColor = $event),
    id: "markerColor",
    "show-alpha": "",
    size: "small",
    title: "文字颜色"
  }, null, 8, ["modelValue"]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_el_select, {
    size: "small",
    modelValue: $data.fontSize,
    "onUpdate:modelValue": _cache[14] || (_cache[14] = $event => $data.fontSize = $event),
    "allow-create": "",
    filterable: "",
    title: "字号",
    "default-first-option": "",
    placeholder: "请选择"
  }, {
    default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.withCtx)(() => [((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(true), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)(external_commonjs_vue_commonjs2_vue_root_Vue_.Fragment, null, (0,external_commonjs_vue_commonjs2_vue_root_Vue_.renderList)($data.fontSizeList, item => {
      return (0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createBlock)(_component_el_option, {
        key: item,
        label: item,
        value: item
      }, null, 8, ["label", "value"]);
    }), 128))]),
    _: 1
  }, 8, ["modelValue"])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_.vShow, $data.menuSelected['MARKER']]]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", _hoisted_6, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_el_color_picker, {
    title: "颜色",
    id: "lineColor",
    modelValue: $data.lineColor,
    "onUpdate:modelValue": _cache[15] || (_cache[15] = $event => $data.lineColor = $event),
    "show-alpha": "",
    size: "small"
  }, null, 8, ["modelValue"]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_el_select, {
    size: "small",
    title: "线宽",
    class: "width-selector",
    modelValue: $data.lineWidth,
    "onUpdate:modelValue": _cache[16] || (_cache[16] = $event => $data.lineWidth = $event),
    "allow-create": "",
    filterable: "",
    "default-first-option": "",
    placeholder: "请选择"
  }, {
    default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.withCtx)(() => [((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(true), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)(external_commonjs_vue_commonjs2_vue_root_Vue_.Fragment, null, (0,external_commonjs_vue_commonjs2_vue_root_Vue_.renderList)($data.lineWidthList, item => {
      return (0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createBlock)(_component_el_option, {
        key: item,
        label: item,
        value: item
      }, null, 8, ["label", "value"]);
    }), 128))]),
    _: 1
  }, 8, ["modelValue"]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_el_select, {
    size: "small",
    class: "style-selector",
    title: "直线样式",
    modelValue: $data.lineStyle,
    "onUpdate:modelValue": _cache[17] || (_cache[17] = $event => $data.lineStyle = $event),
    "default-first-option": "",
    placeholder: "请选择"
  }, {
    default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.withCtx)(() => [((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(true), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)(external_commonjs_vue_commonjs2_vue_root_Vue_.Fragment, null, (0,external_commonjs_vue_commonjs2_vue_root_Vue_.renderList)($data.lineStyleList, item => {
      return (0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createBlock)(_component_el_option, {
        key: item.value,
        label: item.name,
        value: item.value
      }, null, 8, ["label", "value"]);
    }), 128))]),
    _: 1
  }, 8, ["modelValue"]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_el_select, {
    size: "small",
    title: "直线类型",
    class: "type-selector",
    modelValue: $data.graphicHeight,
    "onUpdate:modelValue": _cache[18] || (_cache[18] = $event => $data.graphicHeight = $event),
    "default-first-option": "",
    placeholder: "请选择"
  }, {
    default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.withCtx)(() => [((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(true), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)(external_commonjs_vue_commonjs2_vue_root_Vue_.Fragment, null, (0,external_commonjs_vue_commonjs2_vue_root_Vue_.renderList)($data.heightList, item => {
      return (0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createBlock)(_component_el_option, {
        key: item.value,
        label: item.name,
        value: item.value
      }, null, 8, ["label", "value"]);
    }), 128))]),
    _: 1
  }, 8, ["modelValue"])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_.vShow, $data.menuSelected['POLYLINE']]]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", _hoisted_7, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_el_color_picker, {
    title: "填充色",
    id: "polygonColor",
    modelValue: $data.polygonColor,
    "onUpdate:modelValue": _cache[19] || (_cache[19] = $event => $data.polygonColor = $event),
    "show-alpha": "",
    size: "small"
  }, null, 8, ["modelValue"]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_el_select, {
    size: "small",
    title: "多边形类型",
    class: "type-selector",
    modelValue: $data.graphicHeight,
    "onUpdate:modelValue": _cache[20] || (_cache[20] = $event => $data.graphicHeight = $event),
    "default-first-option": "",
    placeholder: "请选择"
  }, {
    default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.withCtx)(() => [((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(true), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)(external_commonjs_vue_commonjs2_vue_root_Vue_.Fragment, null, (0,external_commonjs_vue_commonjs2_vue_root_Vue_.renderList)($data.heightList, item => {
      return (0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createBlock)(_component_el_option, {
        key: item.value,
        label: item.name,
        value: item.value
      }, null, 8, ["label", "value"]);
    }), 128))]),
    _: 1
  }, 8, ["modelValue"]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("i", {
    class: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.normalizeClass)(["cesiumDrawFont iconoutline border-btn", {
      'outline-selected': $data.outline
    }]),
    title: "边框",
    onClick: _cache[21] || (_cache[21] = $event => $data.outline = !$data.outline)
  }, null, 2), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", null, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_el_color_picker, {
    title: "边框充色",
    id: "outlineColor",
    modelValue: $data.outlineColor,
    "onUpdate:modelValue": _cache[22] || (_cache[22] = $event => $data.outlineColor = $event),
    "show-alpha": "",
    size: "small"
  }, null, 8, ["modelValue"])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_.vShow, $data.outline]]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_el_select, {
    size: "small",
    title: "边框宽度",
    class: "width-selector",
    modelValue: $data.outlineWidth,
    "onUpdate:modelValue": _cache[23] || (_cache[23] = $event => $data.outlineWidth = $event),
    "allow-create": "",
    filterable: "",
    "default-first-option": "",
    placeholder: "请选择"
  }, {
    default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.withCtx)(() => [((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(true), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)(external_commonjs_vue_commonjs2_vue_root_Vue_.Fragment, null, (0,external_commonjs_vue_commonjs2_vue_root_Vue_.renderList)($data.lineWidthList, item => {
      return (0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createBlock)(_component_el_option, {
        key: item,
        label: item,
        value: item
      }, null, 8, ["label", "value"]);
    }), 128))]),
    _: 1
  }, 8, ["modelValue"]), [[external_commonjs_vue_commonjs2_vue_root_Vue_.vShow, $data.outline]])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_.vShow, $data.menuSelected['POLYGON']]]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", _hoisted_8, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_el_select, {
    modelValue: $data.fontFamily,
    "onUpdate:modelValue": _cache[24] || (_cache[24] = $event => $data.fontFamily = $event),
    class: "font-selector",
    "allow-create": "",
    filterable: "",
    size: "small",
    title: "字体",
    "default-first-option": "",
    placeholder: "请选择"
  }, {
    default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.withCtx)(() => [((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(true), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)(external_commonjs_vue_commonjs2_vue_root_Vue_.Fragment, null, (0,external_commonjs_vue_commonjs2_vue_root_Vue_.renderList)($data.fontList, item => {
      return (0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createBlock)(_component_el_option, {
        key: item,
        label: item,
        value: item
      }, null, 8, ["label", "value"]);
    }), 128))]),
    _: 1
  }, 8, ["modelValue"]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_el_select, {
    size: "small",
    modelValue: $data.fontSize,
    "onUpdate:modelValue": _cache[25] || (_cache[25] = $event => $data.fontSize = $event),
    class: "size-selector",
    "allow-create": "",
    filterable: "",
    title: "字号",
    "default-first-option": "",
    placeholder: "请选择"
  }, {
    default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.withCtx)(() => [((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(true), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)(external_commonjs_vue_commonjs2_vue_root_Vue_.Fragment, null, (0,external_commonjs_vue_commonjs2_vue_root_Vue_.renderList)($data.fontSizeList, item => {
      return (0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createBlock)(_component_el_option, {
        key: item,
        label: item,
        value: item
      }, null, 8, ["label", "value"]);
    }), 128))]),
    _: 1
  }, 8, ["modelValue"]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_el_color_picker, {
    title: "颜色",
    modelValue: $data.markerColor,
    "onUpdate:modelValue": _cache[26] || (_cache[26] = $event => $data.markerColor = $event),
    id: "labelColor",
    "show-alpha": "",
    size: "small"
  }, null, 8, ["modelValue"])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_.vShow, $data.menuSelected['LABEL']]]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", _hoisted_9, [(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_el_popover, {
    placement: "bottom",
    id: "model-select",
    width: "160",
    modelValue: $data.modelSelectPanelvisible,
    "onUpdate:modelValue": _cache[27] || (_cache[27] = $event => $data.modelSelectPanelvisible = $event)
  }, {
    reference: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.withCtx)(() => [_hoisted_12]),
    default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.withCtx)(() => [(0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("div", _hoisted_10, [((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(true), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)(external_commonjs_vue_commonjs2_vue_root_Vue_.Fragment, null, (0,external_commonjs_vue_commonjs2_vue_root_Vue_.renderList)($props.extendMarkerModel, item => {
      return (0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)("img", {
        title: item.name,
        key: item.id,
        onClick: $event => $options.selectModel(item),
        src: $options.modelThumb(item),
        onerror: $options.defaultImage
      }, null, 8, _hoisted_11);
    }), 128))])]),
    _: 1
  }, 8, ["modelValue"]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_el_select, {
    modelValue: $data.modelMode,
    "onUpdate:modelValue": _cache[28] || (_cache[28] = $event => $data.modelMode = $event),
    size: "small",
    title: "模式",
    "default-first-option": "",
    placeholder: "请选择"
  }, {
    default: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.withCtx)(() => [((0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(true), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementBlock)(external_commonjs_vue_commonjs2_vue_root_Vue_.Fragment, null, (0,external_commonjs_vue_commonjs2_vue_root_Vue_.renderList)($data.modelModeList, item => {
      return (0,external_commonjs_vue_commonjs2_vue_root_Vue_.openBlock)(), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createBlock)(_component_el_option, {
        key: item.value,
        label: item.name,
        value: item.value
      }, null, 8, ["label", "value"]);
    }), 128))]),
    _: 1
  }, 8, ["modelValue"]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_el_color_picker, {
    title: "颜色",
    id: "modelColor",
    modelValue: $data.modelColor,
    "onUpdate:modelValue": _cache[29] || (_cache[29] = $event => $data.modelColor = $event),
    "show-alpha": "",
    size: "small"
  }, null, 8, ["modelValue"]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_el_slider, {
    title: "混合度",
    modelValue: $data.modelMixed,
    "onUpdate:modelValue": _cache[30] || (_cache[30] = $event => $data.modelMixed = $event),
    min: 0,
    max: 1,
    step: 0.1,
    "show-tooltip": true
  }, null, 8, ["modelValue"]), [[external_commonjs_vue_commonjs2_vue_root_Vue_.vShow, $data.modelMode === 'Mix']])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_.vShow, $data.menuSelected['MODEL']]])], 512), [[external_commonjs_vue_commonjs2_vue_root_Vue_.vShow, $data.editMode]]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_MarkerViewer, {
    ref: "markerManager",
    attachment: $props.attachment,
    onDeleteEvent: $options.deleteMarker,
    onEditEvent: $options.editMarker,
    onAddEvent: $options.addMarker,
    onUpdateEvent: $options.updateMarker,
    extendImage: $props.extendMarkerImage
  }, null, 8, ["attachment", "onDeleteEvent", "onEditEvent", "onAddEvent", "onUpdateEvent", "extendImage"]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_.createVNode)(_component_layerManager, {
    ref: "layerManager",
    onLocate: $options.locateGraphic,
    onEdit: $options.editGraphic,
    onDelete: $options.deleteGraphic,
    onRename: $options.renameGraphic,
    onSelect: $options.selectGraphic,
    onClear: $options.clearGraphic,
    onClose: $options.closeLayerManager,
    onImport: $options.importGraphic,
    onExport: $options.exportGraphic,
    tools: $props.tools,
    class: (0,external_commonjs_vue_commonjs2_vue_root_Vue_.normalizeClass)(["layer-manager-class", {
      'edit-layer-manager-class': $data.editMode
    }])
  }, null, 8, ["onLocate", "onEdit", "onDelete", "onRename", "onSelect", "onClear", "onClose", "onImport", "onExport", "tools", "class"]), [[external_commonjs_vue_commonjs2_vue_root_Vue_.vShow, $data.layerManagerVisible]]), (0,external_commonjs_vue_commonjs2_vue_root_Vue_.withDirectives)((0,external_commonjs_vue_commonjs2_vue_root_Vue_.createElementVNode)("input", {
    type: "file",
    onChange: _cache[31] || (_cache[31] = (...args) => $options.importfp && $options.importfp(...args)),
    id: "graphicuploadhandler",
    accept: ".geojson, .shp"
  }, null, 544), [[external_commonjs_vue_commonjs2_vue_root_Vue_.vShow, false]])], 512)), [[external_commonjs_vue_commonjs2_vue_root_Vue_.vShow, $data.visible]]);
}
;// CONCATENATED MODULE: ./src/components/cesiumDrawViewer.vue?vue&type=template&id=0e860acb&scoped=true

// EXTERNAL MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/cesiumDrawViewer.vue?vue&type=script&lang=js
var cesiumDrawViewervue_type_script_lang_js = __webpack_require__(5280);
;// CONCATENATED MODULE: ./src/components/cesiumDrawViewer.vue?vue&type=script&lang=js
 
;// CONCATENATED MODULE: ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-64.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-64.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-64.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-64.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/cesiumDrawViewer.vue?vue&type=style&index=0&id=0e860acb&lang=scss&scoped=true
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./src/components/cesiumDrawViewer.vue?vue&type=style&index=0&id=0e860acb&lang=scss&scoped=true

;// CONCATENATED MODULE: ./node_modules/mini-css-extract-plugin/dist/loader.js??clonedRuleSet-64.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-64.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-64.use[2]!./node_modules/sass-loader/dist/cjs.js??clonedRuleSet-64.use[3]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./src/components/cesiumDrawViewer.vue?vue&type=style&index=1&id=0e860acb&lang=scss
// extracted by mini-css-extract-plugin

;// CONCATENATED MODULE: ./src/components/cesiumDrawViewer.vue?vue&type=style&index=1&id=0e860acb&lang=scss

// EXTERNAL MODULE: ./node_modules/vue-loader/dist/exportHelper.js
var exportHelper = __webpack_require__(1620);
;// CONCATENATED MODULE: ./src/components/cesiumDrawViewer.vue




;



const __exports__ = /*#__PURE__*/(0,exportHelper/* default */.Z)(cesiumDrawViewervue_type_script_lang_js/* default */.Z, [['render',render],['__scopeId',"data-v-0e860acb"]])

/* harmony default export */ var cesiumDrawViewer = (__exports__);
;// CONCATENATED MODULE: ./src/cdn.js



cesiumDrawViewer.install = Vue => {
  if (!Vue) {
    window.Vue = Vue = (external_commonjs_vue_commonjs2_vue_root_Vue_default());
  }
  Vue.component(cesiumDrawViewer.name, cesiumDrawViewer);
};
if (typeof window !== 'undefined' && window.Vue) {
  cesiumDrawViewer.install(window.Vue);
}
/* harmony default export */ var cdn = (cesiumDrawViewer);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = (cdn);


}();
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=cesiumdrawViewer.umd.js.map
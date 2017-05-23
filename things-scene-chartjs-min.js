(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

;(function (exports) {
	'use strict';

  var Arr = (typeof Uint8Array !== 'undefined')
    ? Uint8Array
    : Array

	var PLUS   = '+'.charCodeAt(0)
	var SLASH  = '/'.charCodeAt(0)
	var NUMBER = '0'.charCodeAt(0)
	var LOWER  = 'a'.charCodeAt(0)
	var UPPER  = 'A'.charCodeAt(0)
	var PLUS_URL_SAFE = '-'.charCodeAt(0)
	var SLASH_URL_SAFE = '_'.charCodeAt(0)

	function decode (elt) {
		var code = elt.charCodeAt(0)
		if (code === PLUS ||
		    code === PLUS_URL_SAFE)
			return 62 // '+'
		if (code === SLASH ||
		    code === SLASH_URL_SAFE)
			return 63 // '/'
		if (code < NUMBER)
			return -1 //no match
		if (code < NUMBER + 10)
			return code - NUMBER + 26 + 26
		if (code < UPPER + 26)
			return code - UPPER
		if (code < LOWER + 26)
			return code - LOWER + 26
	}

	function b64ToByteArray (b64) {
		var i, j, l, tmp, placeHolders, arr

		if (b64.length % 4 > 0) {
			throw new Error('Invalid string. Length must be a multiple of 4')
		}

		// the number of equal signs (place holders)
		// if there are two placeholders, than the two characters before it
		// represent one byte
		// if there is only one, then the three characters before it represent 2 bytes
		// this is just a cheap hack to not do indexOf twice
		var len = b64.length
		placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0

		// base64 is 4/3 + up to two characters of the original data
		arr = new Arr(b64.length * 3 / 4 - placeHolders)

		// if there are placeholders, only get up to the last complete 4 chars
		l = placeHolders > 0 ? b64.length - 4 : b64.length

		var L = 0

		function push (v) {
			arr[L++] = v
		}

		for (i = 0, j = 0; i < l; i += 4, j += 3) {
			tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
			push((tmp & 0xFF0000) >> 16)
			push((tmp & 0xFF00) >> 8)
			push(tmp & 0xFF)
		}

		if (placeHolders === 2) {
			tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
			push(tmp & 0xFF)
		} else if (placeHolders === 1) {
			tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
			push((tmp >> 8) & 0xFF)
			push(tmp & 0xFF)
		}

		return arr
	}

	function uint8ToBase64 (uint8) {
		var i,
			extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
			output = "",
			temp, length

		function encode (num) {
			return lookup.charAt(num)
		}

		function tripletToBase64 (num) {
			return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
		}

		// go through the array every three bytes, we'll deal with trailing stuff later
		for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
			temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
			output += tripletToBase64(temp)
		}

		// pad the end with zeros, but make sure to not forget the extra bytes
		switch (extraBytes) {
			case 1:
				temp = uint8[uint8.length - 1]
				output += encode(temp >> 2)
				output += encode((temp << 4) & 0x3F)
				output += '=='
				break
			case 2:
				temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
				output += encode(temp >> 10)
				output += encode((temp >> 4) & 0x3F)
				output += encode((temp << 2) & 0x3F)
				output += '='
				break
		}

		return output
	}

	exports.toByteArray = b64ToByteArray
	exports.fromByteArray = uint8ToBase64
}(typeof exports === 'undefined' ? (this.base64js = {}) : exports))

},{}],2:[function(require,module,exports){
(function (global){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')
var isArray = require('isarray')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50
Buffer.poolSize = 8192 // not used by this implementation

var rootParent = {}

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Safari 5-7 lacks support for changing the `Object.prototype.constructor` property
 *     on objects.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

function typedArraySupport () {
  function Bar () {}
  try {
    var arr = new Uint8Array(1)
    arr.foo = function () { return 42 }
    arr.constructor = Bar
    return arr.foo() === 42 && // typed array instances can be augmented
        arr.constructor === Bar && // constructor can be set
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

/**
 * Class: Buffer
 * =============
 *
 * The Buffer constructor returns instances of `Uint8Array` that are augmented
 * with function properties for all the node `Buffer` API functions. We use
 * `Uint8Array` so that square bracket notation works as expected -- it returns
 * a single octet.
 *
 * By augmenting the instances, we can avoid modifying the `Uint8Array`
 * prototype.
 */
function Buffer (arg) {
  if (!(this instanceof Buffer)) {
    // Avoid going through an ArgumentsAdaptorTrampoline in the common case.
    if (arguments.length > 1) return new Buffer(arg, arguments[1])
    return new Buffer(arg)
  }

  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    this.length = 0
    this.parent = undefined
  }

  // Common case.
  if (typeof arg === 'number') {
    return fromNumber(this, arg)
  }

  // Slightly less common case.
  if (typeof arg === 'string') {
    return fromString(this, arg, arguments.length > 1 ? arguments[1] : 'utf8')
  }

  // Unusual.
  return fromObject(this, arg)
}

function fromNumber (that, length) {
  that = allocate(that, length < 0 ? 0 : checked(length) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < length; i++) {
      that[i] = 0
    }
  }
  return that
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') encoding = 'utf8'

  // Assumption: byteLength() return value is always < kMaxLength.
  var length = byteLength(string, encoding) | 0
  that = allocate(that, length)

  that.write(string, encoding)
  return that
}

function fromObject (that, object) {
  if (Buffer.isBuffer(object)) return fromBuffer(that, object)

  if (isArray(object)) return fromArray(that, object)

  if (object == null) {
    throw new TypeError('must start with number, buffer, array or string')
  }

  if (typeof ArrayBuffer !== 'undefined') {
    if (object.buffer instanceof ArrayBuffer) {
      return fromTypedArray(that, object)
    }
    if (object instanceof ArrayBuffer) {
      return fromArrayBuffer(that, object)
    }
  }

  if (object.length) return fromArrayLike(that, object)

  return fromJsonObject(that, object)
}

function fromBuffer (that, buffer) {
  var length = checked(buffer.length) | 0
  that = allocate(that, length)
  buffer.copy(that, 0, 0, length)
  return that
}

function fromArray (that, array) {
  var length = checked(array.length) | 0
  that = allocate(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

// Duplicate of fromArray() to keep fromArray() monomorphic.
function fromTypedArray (that, array) {
  var length = checked(array.length) | 0
  that = allocate(that, length)
  // Truncating the elements is probably not what people expect from typed
  // arrays with BYTES_PER_ELEMENT > 1 but it's compatible with the behavior
  // of the old Buffer constructor.
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array) {
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    array.byteLength
    that = Buffer._augment(new Uint8Array(array))
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromTypedArray(that, new Uint8Array(array))
  }
  return that
}

function fromArrayLike (that, array) {
  var length = checked(array.length) | 0
  that = allocate(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

// Deserialize { type: 'Buffer', data: [1,2,3,...] } into a Buffer object.
// Returns a zero-length buffer for inputs that don't conform to the spec.
function fromJsonObject (that, object) {
  var array
  var length = 0

  if (object.type === 'Buffer' && isArray(object.data)) {
    array = object.data
    length = checked(array.length) | 0
  }
  that = allocate(that, length)

  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
} else {
  // pre-set for values that may exist in the future
  Buffer.prototype.length = undefined
  Buffer.prototype.parent = undefined
}

function allocate (that, length) {
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = Buffer._augment(new Uint8Array(length))
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that.length = length
    that._isBuffer = true
  }

  var fromPool = length !== 0 && length <= Buffer.poolSize >>> 1
  if (fromPool) that.parent = rootParent

  return that
}

function checked (length) {
  // Note: cannot use `length < kMaxLength` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (subject, encoding) {
  if (!(this instanceof SlowBuffer)) return new SlowBuffer(subject, encoding)

  var buf = new Buffer(subject, encoding)
  delete buf.parent
  return buf
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  var i = 0
  var len = Math.min(x, y)
  while (i < len) {
    if (a[i] !== b[i]) break

    ++i
  }

  if (i !== len) {
    x = a[i]
    y = b[i]
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'binary':
    case 'base64':
    case 'raw':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) throw new TypeError('list argument must be an Array of Buffers.')

  if (list.length === 0) {
    return new Buffer(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; i++) {
      length += list[i].length
    }
  }

  var buf = new Buffer(length)
  var pos = 0
  for (i = 0; i < list.length; i++) {
    var item = list[i]
    item.copy(buf, pos)
    pos += item.length
  }
  return buf
}

function byteLength (string, encoding) {
  if (typeof string !== 'string') string = '' + string

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'binary':
      // Deprecated
      case 'raw':
      case 'raws':
        return len
      case 'utf8':
      case 'utf-8':
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  start = start | 0
  end = end === undefined || end === Infinity ? this.length : end | 0

  if (!encoding) encoding = 'utf8'
  if (start < 0) start = 0
  if (end > this.length) end = this.length
  if (end <= start) return ''

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'binary':
        return binarySlice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return 0
  return Buffer.compare(this, b)
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset) {
  if (byteOffset > 0x7fffffff) byteOffset = 0x7fffffff
  else if (byteOffset < -0x80000000) byteOffset = -0x80000000
  byteOffset >>= 0

  if (this.length === 0) return -1
  if (byteOffset >= this.length) return -1

  // Negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = Math.max(this.length + byteOffset, 0)

  if (typeof val === 'string') {
    if (val.length === 0) return -1 // special case: looking for empty string always fails
    return String.prototype.indexOf.call(this, val, byteOffset)
  }
  if (Buffer.isBuffer(val)) {
    return arrayIndexOf(this, val, byteOffset)
  }
  if (typeof val === 'number') {
    if (Buffer.TYPED_ARRAY_SUPPORT && Uint8Array.prototype.indexOf === 'function') {
      return Uint8Array.prototype.indexOf.call(this, val, byteOffset)
    }
    return arrayIndexOf(this, [ val ], byteOffset)
  }

  function arrayIndexOf (arr, val, byteOffset) {
    var foundIndex = -1
    for (var i = 0; byteOffset + i < arr.length; i++) {
      if (arr[byteOffset + i] === val[foundIndex === -1 ? 0 : i - foundIndex]) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === val.length) return byteOffset + foundIndex
      } else {
        foundIndex = -1
      }
    }
    return -1
  }

  throw new TypeError('val must be string, number or Buffer')
}

// `get` is deprecated
Buffer.prototype.get = function get (offset) {
  console.log('.get() is deprecated. Access using array indexes instead.')
  return this.readUInt8(offset)
}

// `set` is deprecated
Buffer.prototype.set = function set (v, offset) {
  console.log('.set() is deprecated. Access using array indexes instead.')
  return this.writeUInt8(v, offset)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new Error('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; i++) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) throw new Error('Invalid hex string')
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function binaryWrite (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    var swap = encoding
    encoding = offset
    offset = length | 0
    length = swap
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'binary':
        return binaryWrite(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function binarySlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; i++) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = Buffer._augment(this.subarray(start, end))
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; i++) {
      newBuf[i] = this[i + start]
    }
  }

  if (newBuf.length) newBuf.parent = this.parent || this

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('buffer must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('value is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; i++) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; i++) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = value < 0 ? 1 : 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = value < 0 ? 1 : 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (value > max || value < min) throw new RangeError('value is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('index out of range')
  if (offset < 0) throw new RangeError('index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; i--) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; i++) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    target._set(this.subarray(start, start + len), targetStart)
  }

  return len
}

// fill(value, start=0, end=buffer.length)
Buffer.prototype.fill = function fill (value, start, end) {
  if (!value) value = 0
  if (!start) start = 0
  if (!end) end = this.length

  if (end < start) throw new RangeError('end < start')

  // Fill 0 bytes; we're done
  if (end === start) return
  if (this.length === 0) return

  if (start < 0 || start >= this.length) throw new RangeError('start out of bounds')
  if (end < 0 || end > this.length) throw new RangeError('end out of bounds')

  var i
  if (typeof value === 'number') {
    for (i = start; i < end; i++) {
      this[i] = value
    }
  } else {
    var bytes = utf8ToBytes(value.toString())
    var len = bytes.length
    for (i = start; i < end; i++) {
      this[i] = bytes[i % len]
    }
  }

  return this
}

/**
 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
 */
Buffer.prototype.toArrayBuffer = function toArrayBuffer () {
  if (typeof Uint8Array !== 'undefined') {
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      return (new Buffer(this)).buffer
    } else {
      var buf = new Uint8Array(this.length)
      for (var i = 0, len = buf.length; i < len; i += 1) {
        buf[i] = this[i]
      }
      return buf.buffer
    }
  } else {
    throw new TypeError('Buffer.toArrayBuffer not supported in this browser')
  }
}

// HELPER FUNCTIONS
// ================

var BP = Buffer.prototype

/**
 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
 */
Buffer._augment = function _augment (arr) {
  arr.constructor = Buffer
  arr._isBuffer = true

  // save reference to original Uint8Array set method before overwriting
  arr._set = arr.set

  // deprecated
  arr.get = BP.get
  arr.set = BP.set

  arr.write = BP.write
  arr.toString = BP.toString
  arr.toLocaleString = BP.toString
  arr.toJSON = BP.toJSON
  arr.equals = BP.equals
  arr.compare = BP.compare
  arr.indexOf = BP.indexOf
  arr.copy = BP.copy
  arr.slice = BP.slice
  arr.readUIntLE = BP.readUIntLE
  arr.readUIntBE = BP.readUIntBE
  arr.readUInt8 = BP.readUInt8
  arr.readUInt16LE = BP.readUInt16LE
  arr.readUInt16BE = BP.readUInt16BE
  arr.readUInt32LE = BP.readUInt32LE
  arr.readUInt32BE = BP.readUInt32BE
  arr.readIntLE = BP.readIntLE
  arr.readIntBE = BP.readIntBE
  arr.readInt8 = BP.readInt8
  arr.readInt16LE = BP.readInt16LE
  arr.readInt16BE = BP.readInt16BE
  arr.readInt32LE = BP.readInt32LE
  arr.readInt32BE = BP.readInt32BE
  arr.readFloatLE = BP.readFloatLE
  arr.readFloatBE = BP.readFloatBE
  arr.readDoubleLE = BP.readDoubleLE
  arr.readDoubleBE = BP.readDoubleBE
  arr.writeUInt8 = BP.writeUInt8
  arr.writeUIntLE = BP.writeUIntLE
  arr.writeUIntBE = BP.writeUIntBE
  arr.writeUInt16LE = BP.writeUInt16LE
  arr.writeUInt16BE = BP.writeUInt16BE
  arr.writeUInt32LE = BP.writeUInt32LE
  arr.writeUInt32BE = BP.writeUInt32BE
  arr.writeIntLE = BP.writeIntLE
  arr.writeIntBE = BP.writeIntBE
  arr.writeInt8 = BP.writeInt8
  arr.writeInt16LE = BP.writeInt16LE
  arr.writeInt16BE = BP.writeInt16BE
  arr.writeInt32LE = BP.writeInt32LE
  arr.writeInt32BE = BP.writeInt32BE
  arr.writeFloatLE = BP.writeFloatLE
  arr.writeFloatBE = BP.writeFloatBE
  arr.writeDoubleLE = BP.writeDoubleLE
  arr.writeDoubleBE = BP.writeDoubleBE
  arr.fill = BP.fill
  arr.inspect = BP.inspect
  arr.toArrayBuffer = BP.toArrayBuffer

  return arr
}

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; i++) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; i++) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"base64-js":1,"ieee754":3,"isarray":4}],3:[function(require,module,exports){
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],4:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _chartHelpersOverload = require('./chart-helpers-overload');

var _chartHelpersOverload2 = _interopRequireDefault(_chartHelpersOverload);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChartController = function (_Chart$Controller) {
  _inherits(ChartController, _Chart$Controller);

  function ChartController(item, config, instance) {
    _classCallCheck(this, ChartController);

    return _possibleConstructorReturn(this, (ChartController.__proto__ || Object.getPrototypeOf(ChartController)).call(this, item, config, instance));
  }

  _createClass(ChartController, [{
    key: 'acquireContext',
    value: function acquireContext(item, config) {
      return item;
    }
  }, {
    key: 'resize',
    value: function resize() {}
  }, {
    key: 'destroy',
    value: function destroy() {}
  }, {
    key: 'clear',
    value: function clear() {}
  }, {
    key: 'draw',
    value: function draw(ease) {
      if (arguments.length > 1) {
        this.__ease__ = ease;
        this._component.invalidate();
        return;
      }

      _get(ChartController.prototype.__proto__ || Object.getPrototypeOf(ChartController.prototype), 'draw', this).call(this, ease);
    }
  }, {
    key: 'reset',
    value: function reset(width, height, context) {
      var changed = this.chart.width !== width || this.chart.height !== height;

      this.chart.width = width;
      this.chart.height = height;

      this.chart.ctx = context;

      for (var i = 0; i < this.boxes.length; i++) {
        var box = this.boxes[i];
        box.ctx = context;
      }

      changed && this.updateLayout();
    }
  }]);

  return ChartController;
}(Chart.Controller);

exports.default = ChartController;


Chart.Controller = ChartController;

},{"./chart-helpers-overload":6}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function noop() {}

var helpers = Chart.helpers;

helpers.retinaScale = noop;
helpers.addResizeListener = noop;
helpers.removeResizeListener = noop;

var originalGetRelativePosition = Chart.helpers.getRelativePosition;

Chart.helpers.getRelativePosition = function (e, chart) {
  var wrapper = e.chartJSWrapper;

  if (!wrapper) return originalGetRelativePosition(e, chart);

  var point = e.chartJSWrapper.transcoordC2S(e.offsetX, e.offsetY);

  return {
    x: point.x - wrapper.get('left'),
    y: point.y - wrapper.get('top')
  };
};

exports.default = helpers;

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SceneChart = function (_Chart) {
  _inherits(SceneChart, _Chart);

  function SceneChart(context, config, component) {
    _classCallCheck(this, SceneChart);

    var _this = _possibleConstructorReturn(this, (SceneChart.__proto__ || Object.getPrototypeOf(SceneChart)).call(this, context, config));

    _this._component = component;
    return _this;
  }

  return SceneChart;
}(Chart);

exports.default = SceneChart;

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _chartHelpersOverload = require('./chart-helpers-overload');

var _chartHelpersOverload2 = _interopRequireDefault(_chartHelpersOverload);

var _chartControllerOverload = require('./chart-controller-overload');

var _chartControllerOverload2 = _interopRequireDefault(_chartControllerOverload);

var _chartOverload = require('./chart-overload');

var _chartOverload2 = _interopRequireDefault(_chartOverload);

var _clone = require('./clone');

var _clone2 = _interopRequireDefault(_clone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _scene = scene;
var Component = _scene.Component;
var RectPath = _scene.RectPath;


Chart.defaults.global.defaultFontSize = 10;
Chart.defaults.global.hover.mode = 'index';
Chart.defaults.global.tooltips.mode = 'index';
Chart.defaults.global.tooltips.position = 'nearest';
Chart.defaults.bar.scales.xAxes[0].barPercentage = 0.95;

var NATURE = {
  mutable: false,
  resizable: true,
  rotatable: true,
  properties: [{
    type: 'chartjs-properties',
    label: '',
    name: 'chart'
  }]
};

var BASE64_IMAGES = {
  doughnut: 'data:image/png;base64,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',
  pie: 'data:image/png;base64,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'
};

var DOUGHNUT_IMAGE = new Image();
var PIE_IMAGE = new Image();
DOUGHNUT_IMAGE.src = BASE64_IMAGES.doughnut;
PIE_IMAGE.src = BASE64_IMAGES.pie;

var SAMPLE_IMAGES = {
  doughnut: DOUGHNUT_IMAGE,
  pie: PIE_IMAGE
};

var ChartJSWrapper = function (_RectPath) {
  _inherits(ChartJSWrapper, _RectPath);

  function ChartJSWrapper() {
    _classCallCheck(this, ChartJSWrapper);

    return _possibleConstructorReturn(this, (ChartJSWrapper.__proto__ || Object.getPrototypeOf(ChartJSWrapper)).apply(this, arguments));
  }

  _createClass(ChartJSWrapper, [{
    key: '_draw',
    value: function _draw(context) {
      var _bounds = this.bounds;
      var left = _bounds.left;
      var top = _bounds.top;
      var width = _bounds.width;
      var height = _bounds.height;


      context.beginPath();
      context.rect(left, top, width, height);
      this.drawFill(context);
      this.drawStroke(context);

      context.closePath();

      if (!this._chart) {
        var _model = this.model;
        var chart = _model.chart;
        var data = _model.data;


        if (chart) {
          this.initChart(context);
        }
      }

      var _model2 = this.model;
      var width = _model2.width;
      var height = _model2.height;
      var left = _model2.left;
      var top = _model2.top;


      var self = this;

      var data = this.get('data');

      if (data) {
        this._chart.data.rawData = this.convertObject(data);
      } else {
        this._drawSampleImage(context);
      }

      context.translate(left, top);

      if (!this._draw_once) {
        this._chart.reset(width, height, context);
        this._chart.update(0);
        this._draw_once = true;
      } else {
        if (this._chart.chart.ctx != context) {
          this._chart.reset(width, height, context);
        }

        this._chart.draw(this._chart.__ease__);
      }

      context.translate(-left, -top);
    }
  }, {
    key: 'initChart',
    value: function initChart(context) {
      var chart = this.model.chart;


      if (chart) {
        this.convertConfigure(chart);
      }

      this._chart = new _chartOverload2.default(context, (0, _clone2.default)(chart), this);
    }
  }, {
    key: 'destroyChart',
    value: function destroyChart() {
      if (this._chart) this._chart.destroy();
      this._chart = null;
    }
  }, {
    key: 'convertObject',
    value: function convertObject(dataArray) {
      if (!dataArray) return null;

      if (!(dataArray instanceof Array)) {
        // is not Array
        if (dataArray instanceof Object) {
          return dataArray;
        }
        return null;
      }

      if (dataArray.length === 0) {
        return null;
      }

      // modeling중 변수 기본값에 대한 처리
      if (dataArray[0].hasOwnProperty('__field1')) {
        dataArray = this.toObjectArrayValue(dataArray);
      }

      var label = this.model.chart.data.labelDataKey;
      var seriesKeys = [];

      for (var i in this.model.chart.data.datasets) {
        seriesKeys.push(this.model.chart.data.datasets[i].dataKey);
      }

      var seriesData = [];
      var labelData = [];

      var convertedObject = {
        seriesData: seriesData,
        labelData: labelData
      };

      for (var _i in dataArray) {
        var currData = dataArray[_i];
        labelData.push(currData[label]);

        for (var _i2 in seriesKeys) {
          if (!seriesKeys[_i2]) continue;

          if (!seriesData[_i2]) seriesData[_i2] = [];
          seriesData[_i2].push(currData[seriesKeys[_i2]] == undefined ? NaN : currData[seriesKeys[_i2]]);
        }
      }

      return convertedObject;
    }
  }, {
    key: 'toObjectArrayValue',
    value: function toObjectArrayValue(array) {
      if (!array || array.length === 0) return null;

      var indexKeyMap = {};
      var value = [];

      for (var key in array[0]) {
        indexKeyMap[key] = array[0][key];
      }

      for (var i = 1; i < array.length; i++) {
        var object = {};
        var thisObject = array[i];
        for (var _key in indexKeyMap) {
          var k = indexKeyMap[_key];
          var v = thisObject[_key];
          object[k] = v;
        }

        value.push(object);
      }

      return value;
    }
  }, {
    key: 'convertConfigure',
    value: function convertConfigure(chart) {

      if (!chart) return;

      var data = chart.data || {};
      var datasets = data.datasets || [];
      var options = chart.options || {};
      var scales = options.scales || {};
      var xAxes;
      var yAxes;
      var scale;
      var legend = options.legend || {};
      var tooltips = options.tooltips = options.tooltips || {};

      var multiAxis = options.multiAxis;
      var stacked = options.stacked;
      var fontSize = options.defaultFontSize;
      var theme = options.theme;

      // setup series configure
      for (var i in datasets) {
        var series = datasets[i];
        this._setSeriesConfigures(series);

        if (!multiAxis) {
          if (series.yAxisID == 'right') series.yAxisID = 'left';
        }
      }

      // setup options
      // 1. setup scales
      switch (chart.type) {
        case 'line':
        case 'bar':
        case 'horizontalBar':
          xAxes = scales.xAxes || [];
          yAxes = scales.yAxes || [];

          // 1-1. setup xAxes
          for (var _i3 in xAxes) {
            var axis = xAxes[_i3];
            this._setStacked(axis, stacked);
            this._setScalesFontSize(axis, fontSize);
            this._setScalesAutoMinMax(axis);
            this._setScalesTheme(axis, theme);
            this._appendTickCallback(axis.ticks);

            axis.gridLines.display = options.xGridLine;
          }

          // 1-2. setup yAxes
          if (!multiAxis) {
            if (options.scales.yAxes.length > 1) {
              yAxes.splice(1, 1);
            }
          }

          for (var _i4 in yAxes) {
            var _axis = yAxes[_i4];

            if (yAxes.length === 1 && multiAxis) {
              this._setMultiAxis(yAxes);
            }
            this._setStacked(_axis, stacked);
            this._setScalesFontSize(_axis, fontSize);
            this._setScalesAutoMinMax(_axis);
            this._setScalesTheme(_axis, theme);
            this._appendTickCallback(_axis.ticks);

            if (_i4 == 0) _axis.gridLines.display = options.yGridLine;

            if (_i4 == 1) _axis.gridLines.display = options.y2ndGridLine;
          }

          break;
        case 'pie':
        case 'doughnut':
          break;
        default:
          scale = options.scale || {};
          break;
      }

      // 2. setup legend
      legend.labels = legend.labels ? legend.labels : {};
      legend.labels.fontSize = fontSize;
      this._setLegendTheme(legend, theme);

      // 3. setup tooltips
      tooltips.titleFontSize = tooltips.bodyFontSize = tooltips.footerFontSize = fontSize;
      this._setTooltipCallback(tooltips);
    }
  }, {
    key: '_setStacked',
    value: function _setStacked(axis, stacked) {
      axis.stacked = stacked;
    }
  }, {
    key: '_setMultiAxis',
    value: function _setMultiAxis(yAxes) {
      yAxes.push({
        position: 'right',
        id: 'right',
        ticks: {
          beginAtZero: false,
          callback: function callback(value, index, values) {
            var returnValue = value;
            if (typeof returnValue == 'number') {
              returnValue = returnValue.toLocaleString();
            }

            return returnValue;
          }
        }
      });
    }
  }, {
    key: '_setScalesFontSize',
    value: function _setScalesFontSize(axis, fontSize) {
      axis.ticks = axis.ticks ? axis.ticks : {};
      axis.ticks.fontSize = fontSize;
    }
  }, {
    key: '_setScalesAutoMinMax',
    value: function _setScalesAutoMinMax(axis) {
      axis.ticks = axis.ticks ? axis.ticks : {};

      var autoMin = axis.ticks.autoMin;
      var autoMax = axis.ticks.autoMax;

      if (autoMin === true) {
        delete axis.ticks.min;
      }
      if (autoMax === true) {
        delete axis.ticks.max;
      }
    }
  }, {
    key: '_setScalesTheme',
    value: function _setScalesTheme(axis, theme) {
      var baseColor = this._getBaseColorFromTheme(theme);

      axis.gridLines = axis.gridLines ? axis.gridLines : {};
      axis.gridLines.zeroLineColor = baseColor.clone().setAlpha(.5).toString();
      axis.gridLines.color = baseColor.clone().setAlpha(.1).toString();

      axis.ticks = axis.ticks ? axis.ticks : {};
      axis.ticks.fontColor = baseColor.clone().setAlpha(.5).toString();
    }
  }, {
    key: '_setLegendTheme',
    value: function _setLegendTheme(legend, theme) {
      var baseColor = this._getBaseColorFromTheme(theme);

      legend.labels = legend.labels ? legend.labels : {};
      legend.labels.fontColor = baseColor.clone().setAlpha(.5).toString();
    }
  }, {
    key: '_getBaseColorFromTheme',
    value: function _getBaseColorFromTheme(theme) {
      var darkColor = "#000";
      var lightColor = "#fff";

      var baseColor;

      switch (theme) {
        case 'light':
          baseColor = lightColor;
          break;
        case 'dark':
        default:
          baseColor = darkColor;
          break;
      }

      baseColor = tinycolor(baseColor);

      return baseColor;
    }
  }, {
    key: '_setSeriesConfigures',
    value: function _setSeriesConfigures(series) {

      var type = series.type || this.model.chart.type || 'line';

      switch (type) {
        case 'bar':
        case 'horizontalBar':
          series.borderColor = series.backgroundColor;
          series.borderWidth = 0;
          break;
        case 'line':
        case 'radar':
          series.pointBorderColor = series.borderColor;
          series.pointBorderWidth = series.borderWidth;
          series.pointHoverRadius = series.pointRadius;
          break;
        default:
          break;
      }
    }
  }, {
    key: '_appendTickCallback',
    value: function _appendTickCallback(ticks) {
      ticks.callback = function (value, index, values) {
        var returnValue = value;
        if (typeof returnValue == 'number') {
          returnValue = returnValue.toLocaleString();
        }

        if (returnValue) return returnValue;
      };
    }
  }, {
    key: '_setTooltipCallback',
    value: function _setTooltipCallback(tooltips) {
      tooltips.callbacks = {
        label: function label(tooltipItem, data) {
          var label = data.labels[tooltipItem.index];
          var value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
          var toNumValue = Number(value);

          if (!Number.isNaN(toNumValue)) {
            value = toNumValue;
          }

          if (value) value = value.toLocaleString();

          var prefix = data.datasets[tooltipItem.datasetIndex].valuePrefix || "";
          var suffix = data.datasets[tooltipItem.datasetIndex].valueSuffix || "";

          return prefix + value + suffix;
        }
      };
    }
  }, {
    key: '_drawSampleImage',
    value: function _drawSampleImage(context) {

      var sampleImage = this.sampleImage;

      if (!sampleImage) return;

      var imageWidth = Math.min(sampleImage.width, this.model.width);
      var imageHeight = Math.min(sampleImage.height, this.model.height);

      context.drawImage(sampleImage, 0, 0, sampleImage.width, sampleImage.height, this.model.left, this.model.top, imageWidth, imageHeight
      // image.width,
      // image.height
      );
    }
  }, {
    key: 'onchange',
    value: function onchange(after) {

      var isChartChanged = false;

      var keys = Object.getOwnPropertyNames(after);
      var key = keys && keys[0];
      var keySplit = key.split(".");

      if (after.hasOwnProperty('chart') || key[0] == 'chart') {
        isChartChanged = true;
      }

      if (keySplit.length > 1) {
        // for(var i in keySplit) {
        //   var k = keySplit[i]
        // }

        delete this.model[key];
      }

      if (after.hasOwnProperty('data')) {
        // this.model.data = after.data
        if (this._chart) {
          this._chart.config.data.rawData = after.data || {};
          this._chart.update();
        }
      }

      if (isChartChanged) this.destroyChart();

      this._draw_once = false;
      this.invalidate();
    }
  }, {
    key: 'onclick',
    value: function onclick(e) {
      e.chartJSWrapper = this;
      if (this._chart) {
        this._chart.eventHandler(e);
        // console.log('elements', this._chart.getElementsAtEvent(e));
        // console.log('dataset', this._chart.getDatasetAtEvent(e));
      }
    }
  }, {
    key: 'ondragstart',
    value: function ondragstart(e) {}
  }, {
    key: 'onmousemove',
    value: function onmousemove(e) {
      e.chartJSWrapper = this;
      if (this._chart) this._chart.eventHandler(e);
    }
  }, {
    key: 'nature',
    get: function get() {
      return NATURE;
    }
  }, {
    key: 'hasTextProperty',
    get: function get() {
      return false;
    }
  }, {
    key: 'sampleImage',
    get: function get() {

      if (!this.model.chart || !this.model.chart.type) return null;

      return SAMPLE_IMAGES[this.model.chart.type];
    }
  }]);

  return ChartJSWrapper;
}(RectPath(Component));

exports.default = ChartJSWrapper;


Component.register('chartjs', ChartJSWrapper);

},{"./chart-controller-overload":5,"./chart-helpers-overload":6,"./chart-overload":7,"./clone":9}],9:[function(require,module,exports){
(function (Buffer){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var clone = function () {
  'use strict';

  var nativeMap;
  try {
    nativeMap = Map;
  } catch (_) {
    // maybe a reference error because no `Map`. Give it a dummy value that no
    // value will ever be an instanceof.
    nativeMap = function nativeMap() {};
  }

  var nativeSet;
  try {
    nativeSet = Set;
  } catch (_) {
    nativeSet = function nativeSet() {};
  }

  var nativePromise;
  try {
    nativePromise = Promise;
  } catch (_) {
    nativePromise = function nativePromise() {};
  }

  /**
   * Clones (copies) an Object using deep copying.
   *
   * This function supports circular references by default, but if you are certain
   * there are no circular references in your object, you can save some CPU time
   * by calling clone(obj, false).
   *
   * Caution: if `circular` is false and `parent` contains circular references,
   * your program may enter an infinite loop and crash.
   *
   * @param `parent` - the object to be cloned
   * @param `circular` - set to true if the object to be cloned may contain
   *    circular references. (optional - true by default)
   * @param `depth` - set to a number if the object is only to be cloned to
   *    a particular depth. (optional - defaults to Infinity)
   * @param `prototype` - sets the prototype to be used when cloning an object.
   *    (optional - defaults to parent prototype).
   * @param `includeNonEnumerable` - set to true if the non-enumerable properties
   *    should be cloned as well. Non-enumerable properties on the prototype
   *    chain will be ignored. (optional - false by default)
  */
  function clone(parent, circular, depth, prototype, includeNonEnumerable) {
    if ((typeof circular === 'undefined' ? 'undefined' : _typeof(circular)) === 'object') {
      depth = circular.depth;
      prototype = circular.prototype;
      includeNonEnumerable = circular.includeNonEnumerable;
      circular = circular.circular;
    }
    // maintain two arrays for circular references, where corresponding parents
    // and children have the same index
    var allParents = [];
    var allChildren = [];

    var useBuffer = typeof Buffer != 'undefined';

    if (typeof circular == 'undefined') circular = true;

    if (typeof depth == 'undefined') depth = Infinity;

    // recurse this function so we don't reset allParents and allChildren
    function _clone(parent, depth) {
      // cloning null always returns null
      if (parent === null) return null;

      if (depth === 0) return parent;

      var child;
      var proto;
      if ((typeof parent === 'undefined' ? 'undefined' : _typeof(parent)) != 'object') {
        return parent;
      }

      if (parent instanceof nativeMap) {
        child = new nativeMap();
      } else if (parent instanceof nativeSet) {
        child = new nativeSet();
      } else if (parent instanceof nativePromise) {
        child = new nativePromise(function (resolve, reject) {
          parent.then(function (value) {
            resolve(_clone(value, depth - 1));
          }, function (err) {
            reject(_clone(err, depth - 1));
          });
        });
      } else if (clone.__isArray(parent)) {
        child = [];
      } else if (clone.__isRegExp(parent)) {
        child = new RegExp(parent.source, __getRegExpFlags(parent));
        if (parent.lastIndex) child.lastIndex = parent.lastIndex;
      } else if (clone.__isDate(parent)) {
        child = new Date(parent.getTime());
      } else if (useBuffer && Buffer.isBuffer(parent)) {
        child = new Buffer(parent.length);
        parent.copy(child);
        return child;
      } else if (parent instanceof Error) {
        child = Object.create(parent);
      } else {
        if (typeof prototype == 'undefined') {
          proto = Object.getPrototypeOf(parent);
          child = Object.create(proto);
        } else {
          child = Object.create(prototype);
          proto = prototype;
        }
      }

      if (circular) {
        var index = allParents.indexOf(parent);

        if (index != -1) {
          return allChildren[index];
        }
        allParents.push(parent);
        allChildren.push(child);
      }

      if (parent instanceof nativeMap) {
        var keyIterator = parent.keys();
        while (true) {
          var next = keyIterator.next();
          if (next.done) {
            break;
          }
          var keyChild = _clone(next.value, depth - 1);
          var valueChild = _clone(parent.get(next.value), depth - 1);
          child.set(keyChild, valueChild);
        }
      }
      if (parent instanceof nativeSet) {
        var iterator = parent.keys();
        while (true) {
          var next = iterator.next();
          if (next.done) {
            break;
          }
          var entryChild = _clone(next.value, depth - 1);
          child.add(entryChild);
        }
      }

      for (var i in parent) {
        var attrs;
        if (proto) {
          attrs = Object.getOwnPropertyDescriptor(proto, i);
        }

        if (attrs && attrs.set == null) {
          continue;
        }
        child[i] = _clone(parent[i], depth - 1);
      }

      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(parent);
        for (var i = 0; i < symbols.length; i++) {
          // Don't need to worry about cloning a symbol because it is a primitive,
          // like a number or string.
          var symbol = symbols[i];
          var descriptor = Object.getOwnPropertyDescriptor(parent, symbol);
          if (descriptor && !descriptor.enumerable && !includeNonEnumerable) {
            continue;
          }
          child[symbol] = _clone(parent[symbol], depth - 1);
          if (!descriptor.enumerable) {
            Object.defineProperty(child, symbol, {
              enumerable: false
            });
          }
        }
      }

      if (includeNonEnumerable) {
        var allPropertyNames = Object.getOwnPropertyNames(parent);
        for (var i = 0; i < allPropertyNames.length; i++) {
          var propertyName = allPropertyNames[i];
          var descriptor = Object.getOwnPropertyDescriptor(parent, propertyName);
          if (descriptor && descriptor.enumerable) {
            continue;
          }
          child[propertyName] = _clone(parent[propertyName], depth - 1);
          Object.defineProperty(child, propertyName, {
            enumerable: false
          });
        }
      }

      return child;
    }

    return _clone(parent, depth);
  }

  /**
   * Simple flat clone using prototype, accepts only objects, usefull for property
   * override on FLAT configuration object (no nested props).
   *
   * USE WITH CAUTION! This may not behave as you wish if you do not know how this
   * works.
   */
  clone.clonePrototype = function clonePrototype(parent) {
    if (parent === null) return null;

    var c = function c() {};
    c.prototype = parent;
    return new c();
  };

  // private utility functions

  function __objToStr(o) {
    return Object.prototype.toString.call(o);
  }
  clone.__objToStr = __objToStr;

  function __isDate(o) {
    return (typeof o === 'undefined' ? 'undefined' : _typeof(o)) === 'object' && __objToStr(o) === '[object Date]';
  }
  clone.__isDate = __isDate;

  function __isArray(o) {
    return (typeof o === 'undefined' ? 'undefined' : _typeof(o)) === 'object' && __objToStr(o) === '[object Array]';
  }
  clone.__isArray = __isArray;

  function __isRegExp(o) {
    return (typeof o === 'undefined' ? 'undefined' : _typeof(o)) === 'object' && __objToStr(o) === '[object RegExp]';
  }
  clone.__isRegExp = __isRegExp;

  function __getRegExpFlags(re) {
    var flags = '';
    if (re.global) flags += 'g';
    if (re.ignoreCase) flags += 'i';
    if (re.multiline) flags += 'm';
    return flags;
  }
  clone.__getRegExpFlags = __getRegExpFlags;

  return clone;
}();

if ((typeof module === 'undefined' ? 'undefined' : _typeof(module)) === 'object' && module.exports) {
  module.exports = clone;
}

}).call(this,require("buffer").Buffer)
},{"buffer":2}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _chartOverload = require("./chart-overload");

Object.defineProperty(exports, "SceneChart", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_chartOverload).default;
  }
});

var _chartjsWrapper = require("./chartjs-wrapper");

Object.defineProperty(exports, "ChartJSWrapper", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_chartjsWrapper).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// function updateSeriesDatas(chartInstance) {
//   let seriesData = chartInstance.data.rawData.seriesData;
//   let chartId = chartInstance.id;
//
//   if(!seriesData || seriesData.length === 0)
//     seriesData = [null];
//
//   let seriesOptions = chartInstance.seriesOptions || [];
//
//   chartInstance.data.datasets = [];
//
//   for(let key in seriesData) {
//     var opt = seriesOptions
//     if(seriesOptions.length > 0)
//       opt = seriesOptions[key % seriesOptions.length]
//
//     var dataset = Object.assign({}, opt);
//     opt.data = seriesData[key] || [];
//
//     chartInstance.data.datasets.push(opt);
//   }
// }

function updateSeriesDatas(chartInstance) {
  if (!chartInstance.data.rawData) {
    return;
  }

  var seriesData = chartInstance.data.rawData.seriesData;
  var chartId = chartInstance.id;

  if (!seriesData || seriesData.length === 0) seriesData = [null];

  for (var key in seriesData) {
    if (chartInstance.data.datasets[key]) chartInstance.data.datasets[key].data = seriesData[key] || [];
  }
}

function updateLabelDatas(chartInstance) {
  var labelData = chartInstance.data.rawData.labelData;
  chartInstance.config.data.labels = labelData || [];
}

function seriesHighlight(chartInstance, seriesData) {
  chartInstance.data.datasets.forEach(function (dataset) {
    var highlight = dataset.highlight;
    if (!highlight) return;

    var highlightColor = highlight.color;
    var highlightCondition = highlight.condition;

    seriesData.forEach(function (sdata, sIndex) {
      sdata.forEach(function (data, i) {
        if (!eval(highlightCondition)) return;

        var meta = chartInstance.getDatasetMeta(sIndex);
        meta.data[i]._model.backgroundColor = highlightColor;
        meta.data[i]._model.hoverBackgroundColor = highlightColor;

        // dataset.backgroundColor = highlightColor
      });
    });
  });
}

function _drawValues(chartInstance) {
  // To only draw at the end of animation, check for easing === 1
  var ctx = chartInstance.chart.ctx;

  chartInstance.data.datasets.forEach(function (dataset, i) {
    var meta = chartInstance.getDatasetMeta(i);
    if (!meta.hidden) {
      meta.data.forEach(function (element, index) {
        if (element.hidden) return;

        // Draw the text in black, with the specified font
        ctx.fillStyle = chartInstance.config.options.defaultFontColor;
        var fontSize = chartInstance.config.options.defaultFontSize;
        var fontStyle = 'normal';
        var fontFamily = chartInstance.config.options.defaultFontFamily;
        ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);
        // Just naively convert to string for now
        var data = dataset.data[index];
        if (data && !isNaN(Number(data))) data = Number(data);

        var dataString = data ? data.toLocaleString() : data;
        var prefix = dataset.valuePrefix || "";
        var suffix = dataset.valueSuffix || "";

        dataString = prefix + dataString + suffix;

        // Make sure alignment settings are correct
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        var position = element.getCenterPoint();

        ctx.fillText(dataString, position.x, position.y);
      });
    }
  });
}

Chart.plugins.register({
  beforeInit: function beforeInit(chartInstance) {

    // chartInstance.chartSeries = [];
    //
    // for(let dataset of chartInstance.data.datasets) {
    //   chartInstance.chartSeries.push(dataset);
    // }
  },
  beforeUpdate: function beforeUpdate(chartInstance) {
    if (!chartInstance.data.rawData) {
      return;
    }

    var seriesData = chartInstance.data.rawData.seriesData;
    updateLabelDatas(chartInstance);
    updateSeriesDatas(chartInstance);
  },
  beforeRender: function beforeRender(chartInstance) {},

  beforeDraw: function beforeDraw(chartInstance) {
    if (!chartInstance.data.rawData) {
      return;
    }

    var seriesData = chartInstance.data.rawData.seriesData;
    seriesHighlight(chartInstance, seriesData);
  },

  afterDatasetsDraw: function afterDatasetsDraw(chartInstance, easing) {
    if (!chartInstance.config.options.displayValue) return;

    _drawValues(chartInstance);
  }
});

},{"./chart-overload":7,"./chartjs-wrapper":8}]},{},[10]);

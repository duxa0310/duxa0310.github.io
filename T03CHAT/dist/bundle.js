(function () {
	'use strict';

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function getAugmentedNamespace(n) {
	  if (Object.prototype.hasOwnProperty.call(n, '__esModule')) return n;
	  var f = n.default;
		if (typeof f == "function") {
			var a = function a () {
				if (this instanceof a) {
	        return Reflect.construct(f, arguments, this.constructor);
				}
				return f.apply(this, arguments);
			};
			a.prototype = f.prototype;
	  } else a = {};
	  Object.defineProperty(a, '__esModule', {value: true});
		Object.keys(n).forEach(function (k) {
			var d = Object.getOwnPropertyDescriptor(n, k);
			Object.defineProperty(a, k, d.get ? d : {
				enumerable: true,
				get: function () {
					return n[k];
				}
			});
		});
		return a;
	}

	var main$1 = {};

	var cjs$4 = {exports: {}};

	var url = {};

	var cjs$3 = {};

	var socket$1 = {};

	var transports = {};

	var pollingXhr = {};

	var polling = {};

	var transport = {};

	var cjs$2 = {};

	var encodePacket_browser = {};

	var commons = {};

	var hasRequiredCommons;

	function requireCommons () {
		if (hasRequiredCommons) return commons;
		hasRequiredCommons = 1;
		Object.defineProperty(commons, "__esModule", { value: true });
		commons.ERROR_PACKET = commons.PACKET_TYPES_REVERSE = commons.PACKET_TYPES = void 0;
		const PACKET_TYPES = Object.create(null); // no Map = no polyfill
		commons.PACKET_TYPES = PACKET_TYPES;
		PACKET_TYPES["open"] = "0";
		PACKET_TYPES["close"] = "1";
		PACKET_TYPES["ping"] = "2";
		PACKET_TYPES["pong"] = "3";
		PACKET_TYPES["message"] = "4";
		PACKET_TYPES["upgrade"] = "5";
		PACKET_TYPES["noop"] = "6";
		const PACKET_TYPES_REVERSE = Object.create(null);
		commons.PACKET_TYPES_REVERSE = PACKET_TYPES_REVERSE;
		Object.keys(PACKET_TYPES).forEach((key) => {
		    PACKET_TYPES_REVERSE[PACKET_TYPES[key]] = key;
		});
		const ERROR_PACKET = { type: "error", data: "parser error" };
		commons.ERROR_PACKET = ERROR_PACKET;
		return commons;
	}

	var hasRequiredEncodePacket_browser;

	function requireEncodePacket_browser () {
		if (hasRequiredEncodePacket_browser) return encodePacket_browser;
		hasRequiredEncodePacket_browser = 1;
		Object.defineProperty(encodePacket_browser, "__esModule", { value: true });
		encodePacket_browser.encodePacket = void 0;
		encodePacket_browser.encodePacketToBinary = encodePacketToBinary;
		const commons_js_1 = requireCommons();
		const withNativeBlob = typeof Blob === "function" ||
		    (typeof Blob !== "undefined" &&
		        Object.prototype.toString.call(Blob) === "[object BlobConstructor]");
		const withNativeArrayBuffer = typeof ArrayBuffer === "function";
		// ArrayBuffer.isView method is not defined in IE10
		const isView = (obj) => {
		    return typeof ArrayBuffer.isView === "function"
		        ? ArrayBuffer.isView(obj)
		        : obj && obj.buffer instanceof ArrayBuffer;
		};
		const encodePacket = ({ type, data }, supportsBinary, callback) => {
		    if (withNativeBlob && data instanceof Blob) {
		        if (supportsBinary) {
		            return callback(data);
		        }
		        else {
		            return encodeBlobAsBase64(data, callback);
		        }
		    }
		    else if (withNativeArrayBuffer &&
		        (data instanceof ArrayBuffer || isView(data))) {
		        if (supportsBinary) {
		            return callback(data);
		        }
		        else {
		            return encodeBlobAsBase64(new Blob([data]), callback);
		        }
		    }
		    // plain string
		    return callback(commons_js_1.PACKET_TYPES[type] + (data || ""));
		};
		encodePacket_browser.encodePacket = encodePacket;
		const encodeBlobAsBase64 = (data, callback) => {
		    const fileReader = new FileReader();
		    fileReader.onload = function () {
		        const content = fileReader.result.split(",")[1];
		        callback("b" + (content || ""));
		    };
		    return fileReader.readAsDataURL(data);
		};
		function toArray(data) {
		    if (data instanceof Uint8Array) {
		        return data;
		    }
		    else if (data instanceof ArrayBuffer) {
		        return new Uint8Array(data);
		    }
		    else {
		        return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
		    }
		}
		let TEXT_ENCODER;
		function encodePacketToBinary(packet, callback) {
		    if (withNativeBlob && packet.data instanceof Blob) {
		        return packet.data.arrayBuffer().then(toArray).then(callback);
		    }
		    else if (withNativeArrayBuffer &&
		        (packet.data instanceof ArrayBuffer || isView(packet.data))) {
		        return callback(toArray(packet.data));
		    }
		    encodePacket(packet, false, (encoded) => {
		        if (!TEXT_ENCODER) {
		            TEXT_ENCODER = new TextEncoder();
		        }
		        callback(TEXT_ENCODER.encode(encoded));
		    });
		}
		return encodePacket_browser;
	}

	var decodePacket_browser = {};

	var base64Arraybuffer = {};

	var hasRequiredBase64Arraybuffer;

	function requireBase64Arraybuffer () {
		if (hasRequiredBase64Arraybuffer) return base64Arraybuffer;
		hasRequiredBase64Arraybuffer = 1;
		Object.defineProperty(base64Arraybuffer, "__esModule", { value: true });
		base64Arraybuffer.decode = base64Arraybuffer.encode = void 0;
		// imported from https://github.com/socketio/base64-arraybuffer
		const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
		// Use a lookup table to find the index.
		const lookup = typeof Uint8Array === 'undefined' ? [] : new Uint8Array(256);
		for (let i = 0; i < chars.length; i++) {
		    lookup[chars.charCodeAt(i)] = i;
		}
		const encode = (arraybuffer) => {
		    let bytes = new Uint8Array(arraybuffer), i, len = bytes.length, base64 = '';
		    for (i = 0; i < len; i += 3) {
		        base64 += chars[bytes[i] >> 2];
		        base64 += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
		        base64 += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
		        base64 += chars[bytes[i + 2] & 63];
		    }
		    if (len % 3 === 2) {
		        base64 = base64.substring(0, base64.length - 1) + '=';
		    }
		    else if (len % 3 === 1) {
		        base64 = base64.substring(0, base64.length - 2) + '==';
		    }
		    return base64;
		};
		base64Arraybuffer.encode = encode;
		const decode = (base64) => {
		    let bufferLength = base64.length * 0.75, len = base64.length, i, p = 0, encoded1, encoded2, encoded3, encoded4;
		    if (base64[base64.length - 1] === '=') {
		        bufferLength--;
		        if (base64[base64.length - 2] === '=') {
		            bufferLength--;
		        }
		    }
		    const arraybuffer = new ArrayBuffer(bufferLength), bytes = new Uint8Array(arraybuffer);
		    for (i = 0; i < len; i += 4) {
		        encoded1 = lookup[base64.charCodeAt(i)];
		        encoded2 = lookup[base64.charCodeAt(i + 1)];
		        encoded3 = lookup[base64.charCodeAt(i + 2)];
		        encoded4 = lookup[base64.charCodeAt(i + 3)];
		        bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
		        bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
		        bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
		    }
		    return arraybuffer;
		};
		base64Arraybuffer.decode = decode;
		return base64Arraybuffer;
	}

	var hasRequiredDecodePacket_browser;

	function requireDecodePacket_browser () {
		if (hasRequiredDecodePacket_browser) return decodePacket_browser;
		hasRequiredDecodePacket_browser = 1;
		Object.defineProperty(decodePacket_browser, "__esModule", { value: true });
		decodePacket_browser.decodePacket = void 0;
		const commons_js_1 = requireCommons();
		const base64_arraybuffer_js_1 = requireBase64Arraybuffer();
		const withNativeArrayBuffer = typeof ArrayBuffer === "function";
		const decodePacket = (encodedPacket, binaryType) => {
		    if (typeof encodedPacket !== "string") {
		        return {
		            type: "message",
		            data: mapBinary(encodedPacket, binaryType),
		        };
		    }
		    const type = encodedPacket.charAt(0);
		    if (type === "b") {
		        return {
		            type: "message",
		            data: decodeBase64Packet(encodedPacket.substring(1), binaryType),
		        };
		    }
		    const packetType = commons_js_1.PACKET_TYPES_REVERSE[type];
		    if (!packetType) {
		        return commons_js_1.ERROR_PACKET;
		    }
		    return encodedPacket.length > 1
		        ? {
		            type: commons_js_1.PACKET_TYPES_REVERSE[type],
		            data: encodedPacket.substring(1),
		        }
		        : {
		            type: commons_js_1.PACKET_TYPES_REVERSE[type],
		        };
		};
		decodePacket_browser.decodePacket = decodePacket;
		const decodeBase64Packet = (data, binaryType) => {
		    if (withNativeArrayBuffer) {
		        const decoded = (0, base64_arraybuffer_js_1.decode)(data);
		        return mapBinary(decoded, binaryType);
		    }
		    else {
		        return { base64: true, data }; // fallback for old browsers
		    }
		};
		const mapBinary = (data, binaryType) => {
		    switch (binaryType) {
		        case "blob":
		            if (data instanceof Blob) {
		                // from WebSocket + binaryType "blob"
		                return data;
		            }
		            else {
		                // from HTTP long-polling or WebTransport
		                return new Blob([data]);
		            }
		        case "arraybuffer":
		        default:
		            if (data instanceof ArrayBuffer) {
		                // from HTTP long-polling (base64) or WebSocket + binaryType "arraybuffer"
		                return data;
		            }
		            else {
		                // from WebTransport (Uint8Array)
		                return data.buffer;
		            }
		    }
		};
		return decodePacket_browser;
	}

	var hasRequiredCjs$3;

	function requireCjs$3 () {
		if (hasRequiredCjs$3) return cjs$2;
		hasRequiredCjs$3 = 1;
		(function (exports) {
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.decodePayload = exports.decodePacket = exports.encodePayload = exports.encodePacket = exports.protocol = void 0;
			exports.createPacketEncoderStream = createPacketEncoderStream;
			exports.createPacketDecoderStream = createPacketDecoderStream;
			const encodePacket_js_1 = requireEncodePacket_browser();
			Object.defineProperty(exports, "encodePacket", { enumerable: true, get: function () { return encodePacket_js_1.encodePacket; } });
			const decodePacket_js_1 = requireDecodePacket_browser();
			Object.defineProperty(exports, "decodePacket", { enumerable: true, get: function () { return decodePacket_js_1.decodePacket; } });
			const commons_js_1 = requireCommons();
			const SEPARATOR = String.fromCharCode(30); // see https://en.wikipedia.org/wiki/Delimiter#ASCII_delimited_text
			const encodePayload = (packets, callback) => {
			    // some packets may be added to the array while encoding, so the initial length must be saved
			    const length = packets.length;
			    const encodedPackets = new Array(length);
			    let count = 0;
			    packets.forEach((packet, i) => {
			        // force base64 encoding for binary packets
			        (0, encodePacket_js_1.encodePacket)(packet, false, (encodedPacket) => {
			            encodedPackets[i] = encodedPacket;
			            if (++count === length) {
			                callback(encodedPackets.join(SEPARATOR));
			            }
			        });
			    });
			};
			exports.encodePayload = encodePayload;
			const decodePayload = (encodedPayload, binaryType) => {
			    const encodedPackets = encodedPayload.split(SEPARATOR);
			    const packets = [];
			    for (let i = 0; i < encodedPackets.length; i++) {
			        const decodedPacket = (0, decodePacket_js_1.decodePacket)(encodedPackets[i], binaryType);
			        packets.push(decodedPacket);
			        if (decodedPacket.type === "error") {
			            break;
			        }
			    }
			    return packets;
			};
			exports.decodePayload = decodePayload;
			function createPacketEncoderStream() {
			    return new TransformStream({
			        transform(packet, controller) {
			            (0, encodePacket_js_1.encodePacketToBinary)(packet, (encodedPacket) => {
			                const payloadLength = encodedPacket.length;
			                let header;
			                // inspired by the WebSocket format: https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_WebSocket_servers#decoding_payload_length
			                if (payloadLength < 126) {
			                    header = new Uint8Array(1);
			                    new DataView(header.buffer).setUint8(0, payloadLength);
			                }
			                else if (payloadLength < 65536) {
			                    header = new Uint8Array(3);
			                    const view = new DataView(header.buffer);
			                    view.setUint8(0, 126);
			                    view.setUint16(1, payloadLength);
			                }
			                else {
			                    header = new Uint8Array(9);
			                    const view = new DataView(header.buffer);
			                    view.setUint8(0, 127);
			                    view.setBigUint64(1, BigInt(payloadLength));
			                }
			                // first bit indicates whether the payload is plain text (0) or binary (1)
			                if (packet.data && typeof packet.data !== "string") {
			                    header[0] |= 0x80;
			                }
			                controller.enqueue(header);
			                controller.enqueue(encodedPacket);
			            });
			        },
			    });
			}
			let TEXT_DECODER;
			function totalLength(chunks) {
			    return chunks.reduce((acc, chunk) => acc + chunk.length, 0);
			}
			function concatChunks(chunks, size) {
			    if (chunks[0].length === size) {
			        return chunks.shift();
			    }
			    const buffer = new Uint8Array(size);
			    let j = 0;
			    for (let i = 0; i < size; i++) {
			        buffer[i] = chunks[0][j++];
			        if (j === chunks[0].length) {
			            chunks.shift();
			            j = 0;
			        }
			    }
			    if (chunks.length && j < chunks[0].length) {
			        chunks[0] = chunks[0].slice(j);
			    }
			    return buffer;
			}
			function createPacketDecoderStream(maxPayload, binaryType) {
			    if (!TEXT_DECODER) {
			        TEXT_DECODER = new TextDecoder();
			    }
			    const chunks = [];
			    let state = 0 /* State.READ_HEADER */;
			    let expectedLength = -1;
			    let isBinary = false;
			    return new TransformStream({
			        transform(chunk, controller) {
			            chunks.push(chunk);
			            while (true) {
			                if (state === 0 /* State.READ_HEADER */) {
			                    if (totalLength(chunks) < 1) {
			                        break;
			                    }
			                    const header = concatChunks(chunks, 1);
			                    isBinary = (header[0] & 0x80) === 0x80;
			                    expectedLength = header[0] & 0x7f;
			                    if (expectedLength < 126) {
			                        state = 3 /* State.READ_PAYLOAD */;
			                    }
			                    else if (expectedLength === 126) {
			                        state = 1 /* State.READ_EXTENDED_LENGTH_16 */;
			                    }
			                    else {
			                        state = 2 /* State.READ_EXTENDED_LENGTH_64 */;
			                    }
			                }
			                else if (state === 1 /* State.READ_EXTENDED_LENGTH_16 */) {
			                    if (totalLength(chunks) < 2) {
			                        break;
			                    }
			                    const headerArray = concatChunks(chunks, 2);
			                    expectedLength = new DataView(headerArray.buffer, headerArray.byteOffset, headerArray.length).getUint16(0);
			                    state = 3 /* State.READ_PAYLOAD */;
			                }
			                else if (state === 2 /* State.READ_EXTENDED_LENGTH_64 */) {
			                    if (totalLength(chunks) < 8) {
			                        break;
			                    }
			                    const headerArray = concatChunks(chunks, 8);
			                    const view = new DataView(headerArray.buffer, headerArray.byteOffset, headerArray.length);
			                    const n = view.getUint32(0);
			                    if (n > Math.pow(2, 53 - 32) - 1) {
			                        // the maximum safe integer in JavaScript is 2^53 - 1
			                        controller.enqueue(commons_js_1.ERROR_PACKET);
			                        break;
			                    }
			                    expectedLength = n * Math.pow(2, 32) + view.getUint32(4);
			                    state = 3 /* State.READ_PAYLOAD */;
			                }
			                else {
			                    if (totalLength(chunks) < expectedLength) {
			                        break;
			                    }
			                    const data = concatChunks(chunks, expectedLength);
			                    controller.enqueue((0, decodePacket_js_1.decodePacket)(isBinary ? data : TEXT_DECODER.decode(data), binaryType));
			                    state = 0 /* State.READ_HEADER */;
			                }
			                if (expectedLength === 0 || expectedLength > maxPayload) {
			                    controller.enqueue(commons_js_1.ERROR_PACKET);
			                    break;
			                }
			            }
			        },
			    });
			}
			exports.protocol = 4; 
		} (cjs$2));
		return cjs$2;
	}

	/**
	 * Initialize a new `Emitter`.
	 *
	 * @api public
	 */

	function Emitter(obj) {
	  if (obj) return mixin(obj);
	}

	/**
	 * Mixin the emitter properties.
	 *
	 * @param {Object} obj
	 * @return {Object}
	 * @api private
	 */

	function mixin(obj) {
	  for (var key in Emitter.prototype) {
	    obj[key] = Emitter.prototype[key];
	  }
	  return obj;
	}

	/**
	 * Listen on the given `event` with `fn`.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.on =
	Emitter.prototype.addEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
	    .push(fn);
	  return this;
	};

	/**
	 * Adds an `event` listener that will be invoked a single
	 * time then automatically removed.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.once = function(event, fn){
	  function on() {
	    this.off(event, on);
	    fn.apply(this, arguments);
	  }

	  on.fn = fn;
	  this.on(event, on);
	  return this;
	};

	/**
	 * Remove the given callback for `event` or all
	 * registered callbacks.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.off =
	Emitter.prototype.removeListener =
	Emitter.prototype.removeAllListeners =
	Emitter.prototype.removeEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};

	  // all
	  if (0 == arguments.length) {
	    this._callbacks = {};
	    return this;
	  }

	  // specific event
	  var callbacks = this._callbacks['$' + event];
	  if (!callbacks) return this;

	  // remove all handlers
	  if (1 == arguments.length) {
	    delete this._callbacks['$' + event];
	    return this;
	  }

	  // remove specific handler
	  var cb;
	  for (var i = 0; i < callbacks.length; i++) {
	    cb = callbacks[i];
	    if (cb === fn || cb.fn === fn) {
	      callbacks.splice(i, 1);
	      break;
	    }
	  }

	  // Remove event specific arrays for event types that no
	  // one is subscribed for to avoid memory leak.
	  if (callbacks.length === 0) {
	    delete this._callbacks['$' + event];
	  }

	  return this;
	};

	/**
	 * Emit `event` with the given args.
	 *
	 * @param {String} event
	 * @param {Mixed} ...
	 * @return {Emitter}
	 */

	Emitter.prototype.emit = function(event){
	  this._callbacks = this._callbacks || {};

	  var args = new Array(arguments.length - 1)
	    , callbacks = this._callbacks['$' + event];

	  for (var i = 1; i < arguments.length; i++) {
	    args[i - 1] = arguments[i];
	  }

	  if (callbacks) {
	    callbacks = callbacks.slice(0);
	    for (var i = 0, len = callbacks.length; i < len; ++i) {
	      callbacks[i].apply(this, args);
	    }
	  }

	  return this;
	};

	// alias used for reserved events (protected method)
	Emitter.prototype.emitReserved = Emitter.prototype.emit;

	/**
	 * Return array of callbacks for `event`.
	 *
	 * @param {String} event
	 * @return {Array}
	 * @api public
	 */

	Emitter.prototype.listeners = function(event){
	  this._callbacks = this._callbacks || {};
	  return this._callbacks['$' + event] || [];
	};

	/**
	 * Check if this emitter has `event` handlers.
	 *
	 * @param {String} event
	 * @return {Boolean}
	 * @api public
	 */

	Emitter.prototype.hasListeners = function(event){
	  return !! this.listeners(event).length;
	};

	var esm = /*#__PURE__*/Object.freeze({
		__proto__: null,
		Emitter: Emitter
	});

	var require$$5 = /*@__PURE__*/getAugmentedNamespace(esm);

	var util = {};

	var globals = {};

	var hasRequiredGlobals;

	function requireGlobals () {
		if (hasRequiredGlobals) return globals;
		hasRequiredGlobals = 1;
		Object.defineProperty(globals, "__esModule", { value: true });
		globals.defaultBinaryType = globals.globalThisShim = globals.nextTick = void 0;
		globals.createCookieJar = createCookieJar;
		globals.nextTick = (() => {
		    const isPromiseAvailable = typeof Promise === "function" && typeof Promise.resolve === "function";
		    if (isPromiseAvailable) {
		        return (cb) => Promise.resolve().then(cb);
		    }
		    else {
		        return (cb, setTimeoutFn) => setTimeoutFn(cb, 0);
		    }
		})();
		globals.globalThisShim = (() => {
		    if (typeof self !== "undefined") {
		        return self;
		    }
		    else if (typeof window !== "undefined") {
		        return window;
		    }
		    else {
		        return Function("return this")();
		    }
		})();
		globals.defaultBinaryType = "arraybuffer";
		function createCookieJar() { }
		return globals;
	}

	var hasRequiredUtil;

	function requireUtil () {
		if (hasRequiredUtil) return util;
		hasRequiredUtil = 1;
		Object.defineProperty(util, "__esModule", { value: true });
		util.pick = pick;
		util.installTimerFunctions = installTimerFunctions;
		util.byteLength = byteLength;
		util.randomString = randomString;
		const globals_node_js_1 = requireGlobals();
		function pick(obj, ...attr) {
		    return attr.reduce((acc, k) => {
		        if (obj.hasOwnProperty(k)) {
		            acc[k] = obj[k];
		        }
		        return acc;
		    }, {});
		}
		// Keep a reference to the real timeout functions so they can be used when overridden
		const NATIVE_SET_TIMEOUT = globals_node_js_1.globalThisShim.setTimeout;
		const NATIVE_CLEAR_TIMEOUT = globals_node_js_1.globalThisShim.clearTimeout;
		function installTimerFunctions(obj, opts) {
		    if (opts.useNativeTimers) {
		        obj.setTimeoutFn = NATIVE_SET_TIMEOUT.bind(globals_node_js_1.globalThisShim);
		        obj.clearTimeoutFn = NATIVE_CLEAR_TIMEOUT.bind(globals_node_js_1.globalThisShim);
		    }
		    else {
		        obj.setTimeoutFn = globals_node_js_1.globalThisShim.setTimeout.bind(globals_node_js_1.globalThisShim);
		        obj.clearTimeoutFn = globals_node_js_1.globalThisShim.clearTimeout.bind(globals_node_js_1.globalThisShim);
		    }
		}
		// base64 encoded buffers are about 33% bigger (https://en.wikipedia.org/wiki/Base64)
		const BASE64_OVERHEAD = 1.33;
		// we could also have used `new Blob([obj]).size`, but it isn't supported in IE9
		function byteLength(obj) {
		    if (typeof obj === "string") {
		        return utf8Length(obj);
		    }
		    // arraybuffer or blob
		    return Math.ceil((obj.byteLength || obj.size) * BASE64_OVERHEAD);
		}
		function utf8Length(str) {
		    let c = 0, length = 0;
		    for (let i = 0, l = str.length; i < l; i++) {
		        c = str.charCodeAt(i);
		        if (c < 0x80) {
		            length += 1;
		        }
		        else if (c < 0x800) {
		            length += 2;
		        }
		        else if (c < 0xd800 || c >= 0xe000) {
		            length += 3;
		        }
		        else {
		            i++;
		            length += 4;
		        }
		    }
		    return length;
		}
		/**
		 * Generates a random 8-characters string.
		 */
		function randomString() {
		    return (Date.now().toString(36).substring(3) +
		        Math.random().toString(36).substring(2, 5));
		}
		return util;
	}

	var parseqs = {};

	var hasRequiredParseqs;

	function requireParseqs () {
		if (hasRequiredParseqs) return parseqs;
		hasRequiredParseqs = 1;
		// imported from https://github.com/galkn/querystring
		/**
		 * Compiles a querystring
		 * Returns string representation of the object
		 *
		 * @param {Object}
		 * @api private
		 */
		Object.defineProperty(parseqs, "__esModule", { value: true });
		parseqs.encode = encode;
		parseqs.decode = decode;
		function encode(obj) {
		    let str = '';
		    for (let i in obj) {
		        if (obj.hasOwnProperty(i)) {
		            if (str.length)
		                str += '&';
		            str += encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]);
		        }
		    }
		    return str;
		}
		/**
		 * Parses a simple querystring into an object
		 *
		 * @param {String} qs
		 * @api private
		 */
		function decode(qs) {
		    let qry = {};
		    let pairs = qs.split('&');
		    for (let i = 0, l = pairs.length; i < l; i++) {
		        let pair = pairs[i].split('=');
		        qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
		    }
		    return qry;
		}
		return parseqs;
	}

	var browser$2 = {exports: {}};

	/**
	 * Helpers.
	 */

	var ms;
	var hasRequiredMs;

	function requireMs () {
		if (hasRequiredMs) return ms;
		hasRequiredMs = 1;
		var s = 1000;
		var m = s * 60;
		var h = m * 60;
		var d = h * 24;
		var w = d * 7;
		var y = d * 365.25;

		/**
		 * Parse or format the given `val`.
		 *
		 * Options:
		 *
		 *  - `long` verbose formatting [false]
		 *
		 * @param {String|Number} val
		 * @param {Object} [options]
		 * @throws {Error} throw an error if val is not a non-empty string or a number
		 * @return {String|Number}
		 * @api public
		 */

		ms = function (val, options) {
		  options = options || {};
		  var type = typeof val;
		  if (type === 'string' && val.length > 0) {
		    return parse(val);
		  } else if (type === 'number' && isFinite(val)) {
		    return options.long ? fmtLong(val) : fmtShort(val);
		  }
		  throw new Error(
		    'val is not a non-empty string or a valid number. val=' +
		      JSON.stringify(val)
		  );
		};

		/**
		 * Parse the given `str` and return milliseconds.
		 *
		 * @param {String} str
		 * @return {Number}
		 * @api private
		 */

		function parse(str) {
		  str = String(str);
		  if (str.length > 100) {
		    return;
		  }
		  var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
		    str
		  );
		  if (!match) {
		    return;
		  }
		  var n = parseFloat(match[1]);
		  var type = (match[2] || 'ms').toLowerCase();
		  switch (type) {
		    case 'years':
		    case 'year':
		    case 'yrs':
		    case 'yr':
		    case 'y':
		      return n * y;
		    case 'weeks':
		    case 'week':
		    case 'w':
		      return n * w;
		    case 'days':
		    case 'day':
		    case 'd':
		      return n * d;
		    case 'hours':
		    case 'hour':
		    case 'hrs':
		    case 'hr':
		    case 'h':
		      return n * h;
		    case 'minutes':
		    case 'minute':
		    case 'mins':
		    case 'min':
		    case 'm':
		      return n * m;
		    case 'seconds':
		    case 'second':
		    case 'secs':
		    case 'sec':
		    case 's':
		      return n * s;
		    case 'milliseconds':
		    case 'millisecond':
		    case 'msecs':
		    case 'msec':
		    case 'ms':
		      return n;
		    default:
		      return undefined;
		  }
		}

		/**
		 * Short format for `ms`.
		 *
		 * @param {Number} ms
		 * @return {String}
		 * @api private
		 */

		function fmtShort(ms) {
		  var msAbs = Math.abs(ms);
		  if (msAbs >= d) {
		    return Math.round(ms / d) + 'd';
		  }
		  if (msAbs >= h) {
		    return Math.round(ms / h) + 'h';
		  }
		  if (msAbs >= m) {
		    return Math.round(ms / m) + 'm';
		  }
		  if (msAbs >= s) {
		    return Math.round(ms / s) + 's';
		  }
		  return ms + 'ms';
		}

		/**
		 * Long format for `ms`.
		 *
		 * @param {Number} ms
		 * @return {String}
		 * @api private
		 */

		function fmtLong(ms) {
		  var msAbs = Math.abs(ms);
		  if (msAbs >= d) {
		    return plural(ms, msAbs, d, 'day');
		  }
		  if (msAbs >= h) {
		    return plural(ms, msAbs, h, 'hour');
		  }
		  if (msAbs >= m) {
		    return plural(ms, msAbs, m, 'minute');
		  }
		  if (msAbs >= s) {
		    return plural(ms, msAbs, s, 'second');
		  }
		  return ms + ' ms';
		}

		/**
		 * Pluralization helper.
		 */

		function plural(ms, msAbs, n, name) {
		  var isPlural = msAbs >= n * 1.5;
		  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
		}
		return ms;
	}

	var common$2;
	var hasRequiredCommon$2;

	function requireCommon$2 () {
		if (hasRequiredCommon$2) return common$2;
		hasRequiredCommon$2 = 1;
		/**
		 * This is the common logic for both the Node.js and web browser
		 * implementations of `debug()`.
		 */

		function setup(env) {
			createDebug.debug = createDebug;
			createDebug.default = createDebug;
			createDebug.coerce = coerce;
			createDebug.disable = disable;
			createDebug.enable = enable;
			createDebug.enabled = enabled;
			createDebug.humanize = requireMs();
			createDebug.destroy = destroy;

			Object.keys(env).forEach(key => {
				createDebug[key] = env[key];
			});

			/**
			* The currently active debug mode names, and names to skip.
			*/

			createDebug.names = [];
			createDebug.skips = [];

			/**
			* Map of special "%n" handling functions, for the debug "format" argument.
			*
			* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
			*/
			createDebug.formatters = {};

			/**
			* Selects a color for a debug namespace
			* @param {String} namespace The namespace string for the debug instance to be colored
			* @return {Number|String} An ANSI color code for the given namespace
			* @api private
			*/
			function selectColor(namespace) {
				let hash = 0;

				for (let i = 0; i < namespace.length; i++) {
					hash = ((hash << 5) - hash) + namespace.charCodeAt(i);
					hash |= 0; // Convert to 32bit integer
				}

				return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
			}
			createDebug.selectColor = selectColor;

			/**
			* Create a debugger with the given `namespace`.
			*
			* @param {String} namespace
			* @return {Function}
			* @api public
			*/
			function createDebug(namespace) {
				let prevTime;
				let enableOverride = null;
				let namespacesCache;
				let enabledCache;

				function debug(...args) {
					// Disabled?
					if (!debug.enabled) {
						return;
					}

					const self = debug;

					// Set `diff` timestamp
					const curr = Number(new Date());
					const ms = curr - (prevTime || curr);
					self.diff = ms;
					self.prev = prevTime;
					self.curr = curr;
					prevTime = curr;

					args[0] = createDebug.coerce(args[0]);

					if (typeof args[0] !== 'string') {
						// Anything else let's inspect with %O
						args.unshift('%O');
					}

					// Apply any `formatters` transformations
					let index = 0;
					args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
						// If we encounter an escaped % then don't increase the array index
						if (match === '%%') {
							return '%';
						}
						index++;
						const formatter = createDebug.formatters[format];
						if (typeof formatter === 'function') {
							const val = args[index];
							match = formatter.call(self, val);

							// Now we need to remove `args[index]` since it's inlined in the `format`
							args.splice(index, 1);
							index--;
						}
						return match;
					});

					// Apply env-specific formatting (colors, etc.)
					createDebug.formatArgs.call(self, args);

					const logFn = self.log || createDebug.log;
					logFn.apply(self, args);
				}

				debug.namespace = namespace;
				debug.useColors = createDebug.useColors();
				debug.color = createDebug.selectColor(namespace);
				debug.extend = extend;
				debug.destroy = createDebug.destroy; // XXX Temporary. Will be removed in the next major release.

				Object.defineProperty(debug, 'enabled', {
					enumerable: true,
					configurable: false,
					get: () => {
						if (enableOverride !== null) {
							return enableOverride;
						}
						if (namespacesCache !== createDebug.namespaces) {
							namespacesCache = createDebug.namespaces;
							enabledCache = createDebug.enabled(namespace);
						}

						return enabledCache;
					},
					set: v => {
						enableOverride = v;
					}
				});

				// Env-specific initialization logic for debug instances
				if (typeof createDebug.init === 'function') {
					createDebug.init(debug);
				}

				return debug;
			}

			function extend(namespace, delimiter) {
				const newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
				newDebug.log = this.log;
				return newDebug;
			}

			/**
			* Enables a debug mode by namespaces. This can include modes
			* separated by a colon and wildcards.
			*
			* @param {String} namespaces
			* @api public
			*/
			function enable(namespaces) {
				createDebug.save(namespaces);
				createDebug.namespaces = namespaces;

				createDebug.names = [];
				createDebug.skips = [];

				let i;
				const split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
				const len = split.length;

				for (i = 0; i < len; i++) {
					if (!split[i]) {
						// ignore empty strings
						continue;
					}

					namespaces = split[i].replace(/\*/g, '.*?');

					if (namespaces[0] === '-') {
						createDebug.skips.push(new RegExp('^' + namespaces.slice(1) + '$'));
					} else {
						createDebug.names.push(new RegExp('^' + namespaces + '$'));
					}
				}
			}

			/**
			* Disable debug output.
			*
			* @return {String} namespaces
			* @api public
			*/
			function disable() {
				const namespaces = [
					...createDebug.names.map(toNamespace),
					...createDebug.skips.map(toNamespace).map(namespace => '-' + namespace)
				].join(',');
				createDebug.enable('');
				return namespaces;
			}

			/**
			* Returns true if the given mode name is enabled, false otherwise.
			*
			* @param {String} name
			* @return {Boolean}
			* @api public
			*/
			function enabled(name) {
				if (name[name.length - 1] === '*') {
					return true;
				}

				let i;
				let len;

				for (i = 0, len = createDebug.skips.length; i < len; i++) {
					if (createDebug.skips[i].test(name)) {
						return false;
					}
				}

				for (i = 0, len = createDebug.names.length; i < len; i++) {
					if (createDebug.names[i].test(name)) {
						return true;
					}
				}

				return false;
			}

			/**
			* Convert regexp to namespace
			*
			* @param {RegExp} regxep
			* @return {String} namespace
			* @api private
			*/
			function toNamespace(regexp) {
				return regexp.toString()
					.substring(2, regexp.toString().length - 2)
					.replace(/\.\*\?$/, '*');
			}

			/**
			* Coerce `val`.
			*
			* @param {Mixed} val
			* @return {Mixed}
			* @api private
			*/
			function coerce(val) {
				if (val instanceof Error) {
					return val.stack || val.message;
				}
				return val;
			}

			/**
			* XXX DO NOT USE. This is a temporary stub function.
			* XXX It WILL be removed in the next major release.
			*/
			function destroy() {
				console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
			}

			createDebug.enable(createDebug.load());

			return createDebug;
		}

		common$2 = setup;
		return common$2;
	}

	/* eslint-env browser */

	var hasRequiredBrowser$2;

	function requireBrowser$2 () {
		if (hasRequiredBrowser$2) return browser$2.exports;
		hasRequiredBrowser$2 = 1;
		(function (module, exports) {
			/**
			 * This is the web browser implementation of `debug()`.
			 */

			exports.formatArgs = formatArgs;
			exports.save = save;
			exports.load = load;
			exports.useColors = useColors;
			exports.storage = localstorage();
			exports.destroy = (() => {
				let warned = false;

				return () => {
					if (!warned) {
						warned = true;
						console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
					}
				};
			})();

			/**
			 * Colors.
			 */

			exports.colors = [
				'#0000CC',
				'#0000FF',
				'#0033CC',
				'#0033FF',
				'#0066CC',
				'#0066FF',
				'#0099CC',
				'#0099FF',
				'#00CC00',
				'#00CC33',
				'#00CC66',
				'#00CC99',
				'#00CCCC',
				'#00CCFF',
				'#3300CC',
				'#3300FF',
				'#3333CC',
				'#3333FF',
				'#3366CC',
				'#3366FF',
				'#3399CC',
				'#3399FF',
				'#33CC00',
				'#33CC33',
				'#33CC66',
				'#33CC99',
				'#33CCCC',
				'#33CCFF',
				'#6600CC',
				'#6600FF',
				'#6633CC',
				'#6633FF',
				'#66CC00',
				'#66CC33',
				'#9900CC',
				'#9900FF',
				'#9933CC',
				'#9933FF',
				'#99CC00',
				'#99CC33',
				'#CC0000',
				'#CC0033',
				'#CC0066',
				'#CC0099',
				'#CC00CC',
				'#CC00FF',
				'#CC3300',
				'#CC3333',
				'#CC3366',
				'#CC3399',
				'#CC33CC',
				'#CC33FF',
				'#CC6600',
				'#CC6633',
				'#CC9900',
				'#CC9933',
				'#CCCC00',
				'#CCCC33',
				'#FF0000',
				'#FF0033',
				'#FF0066',
				'#FF0099',
				'#FF00CC',
				'#FF00FF',
				'#FF3300',
				'#FF3333',
				'#FF3366',
				'#FF3399',
				'#FF33CC',
				'#FF33FF',
				'#FF6600',
				'#FF6633',
				'#FF9900',
				'#FF9933',
				'#FFCC00',
				'#FFCC33'
			];

			/**
			 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
			 * and the Firebug extension (any Firefox version) are known
			 * to support "%c" CSS customizations.
			 *
			 * TODO: add a `localStorage` variable to explicitly enable/disable colors
			 */

			// eslint-disable-next-line complexity
			function useColors() {
				// NB: In an Electron preload script, document will be defined but not fully
				// initialized. Since we know we're in Chrome, we'll just detect this case
				// explicitly
				if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
					return true;
				}

				// Internet Explorer and Edge do not support colors.
				if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
					return false;
				}

				let m;

				// Is webkit? http://stackoverflow.com/a/16459606/376773
				// document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
				return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
					// Is firebug? http://stackoverflow.com/a/398120/376773
					(typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
					// Is firefox >= v31?
					// https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
					(typeof navigator !== 'undefined' && navigator.userAgent && (m = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(m[1], 10) >= 31) ||
					// Double check webkit in userAgent just in case we are in a worker
					(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
			}

			/**
			 * Colorize log arguments if enabled.
			 *
			 * @api public
			 */

			function formatArgs(args) {
				args[0] = (this.useColors ? '%c' : '') +
					this.namespace +
					(this.useColors ? ' %c' : ' ') +
					args[0] +
					(this.useColors ? '%c ' : ' ') +
					'+' + module.exports.humanize(this.diff);

				if (!this.useColors) {
					return;
				}

				const c = 'color: ' + this.color;
				args.splice(1, 0, c, 'color: inherit');

				// The final "%c" is somewhat tricky, because there could be other
				// arguments passed either before or after the %c, so we need to
				// figure out the correct index to insert the CSS into
				let index = 0;
				let lastC = 0;
				args[0].replace(/%[a-zA-Z%]/g, match => {
					if (match === '%%') {
						return;
					}
					index++;
					if (match === '%c') {
						// We only are interested in the *last* %c
						// (the user may have provided their own)
						lastC = index;
					}
				});

				args.splice(lastC, 0, c);
			}

			/**
			 * Invokes `console.debug()` when available.
			 * No-op when `console.debug` is not a "function".
			 * If `console.debug` is not available, falls back
			 * to `console.log`.
			 *
			 * @api public
			 */
			exports.log = console.debug || console.log || (() => {});

			/**
			 * Save `namespaces`.
			 *
			 * @param {String} namespaces
			 * @api private
			 */
			function save(namespaces) {
				try {
					if (namespaces) {
						exports.storage.setItem('debug', namespaces);
					} else {
						exports.storage.removeItem('debug');
					}
				} catch (error) {
					// Swallow
					// XXX (@Qix-) should we be logging these?
				}
			}

			/**
			 * Load `namespaces`.
			 *
			 * @return {String} returns the previously persisted debug modes
			 * @api private
			 */
			function load() {
				let r;
				try {
					r = exports.storage.getItem('debug');
				} catch (error) {
					// Swallow
					// XXX (@Qix-) should we be logging these?
				}

				// If debug isn't set in LS, and we're in Electron, try to load $DEBUG
				if (!r && typeof process !== 'undefined' && 'env' in process) {
					r = process.env.DEBUG;
				}

				return r;
			}

			/**
			 * Localstorage attempts to return the localstorage.
			 *
			 * This is necessary because safari throws
			 * when a user disables cookies/localstorage
			 * and you attempt to access it.
			 *
			 * @return {LocalStorage}
			 * @api private
			 */

			function localstorage() {
				try {
					// TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
					// The Browser also has localStorage in the global context.
					return localStorage;
				} catch (error) {
					// Swallow
					// XXX (@Qix-) should we be logging these?
				}
			}

			module.exports = requireCommon$2()(exports);

			const {formatters} = module.exports;

			/**
			 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
			 */

			formatters.j = function (v) {
				try {
					return JSON.stringify(v);
				} catch (error) {
					return '[UnexpectedJSONParseError]: ' + error.message;
				}
			}; 
		} (browser$2, browser$2.exports));
		return browser$2.exports;
	}

	var hasRequiredTransport;

	function requireTransport () {
		if (hasRequiredTransport) return transport;
		hasRequiredTransport = 1;
		var __importDefault = (transport && transport.__importDefault) || function (mod) {
		    return (mod && mod.__esModule) ? mod : { "default": mod };
		};
		Object.defineProperty(transport, "__esModule", { value: true });
		transport.Transport = transport.TransportError = void 0;
		const engine_io_parser_1 = requireCjs$3();
		const component_emitter_1 = require$$5;
		const util_js_1 = requireUtil();
		const parseqs_js_1 = requireParseqs();
		const debug_1 = __importDefault(requireBrowser$2()); // debug()
		const debug = (0, debug_1.default)("engine.io-client:transport"); // debug()
		class TransportError extends Error {
		    constructor(reason, description, context) {
		        super(reason);
		        this.description = description;
		        this.context = context;
		        this.type = "TransportError";
		    }
		}
		transport.TransportError = TransportError;
		class Transport extends component_emitter_1.Emitter {
		    /**
		     * Transport abstract constructor.
		     *
		     * @param {Object} opts - options
		     * @protected
		     */
		    constructor(opts) {
		        super();
		        this.writable = false;
		        (0, util_js_1.installTimerFunctions)(this, opts);
		        this.opts = opts;
		        this.query = opts.query;
		        this.socket = opts.socket;
		        this.supportsBinary = !opts.forceBase64;
		    }
		    /**
		     * Emits an error.
		     *
		     * @param {String} reason
		     * @param description
		     * @param context - the error context
		     * @return {Transport} for chaining
		     * @protected
		     */
		    onError(reason, description, context) {
		        super.emitReserved("error", new TransportError(reason, description, context));
		        return this;
		    }
		    /**
		     * Opens the transport.
		     */
		    open() {
		        this.readyState = "opening";
		        this.doOpen();
		        return this;
		    }
		    /**
		     * Closes the transport.
		     */
		    close() {
		        if (this.readyState === "opening" || this.readyState === "open") {
		            this.doClose();
		            this.onClose();
		        }
		        return this;
		    }
		    /**
		     * Sends multiple packets.
		     *
		     * @param {Array} packets
		     */
		    send(packets) {
		        if (this.readyState === "open") {
		            this.write(packets);
		        }
		        else {
		            // this might happen if the transport was silently closed in the beforeunload event handler
		            debug("transport is not open, discarding packets");
		        }
		    }
		    /**
		     * Called upon open
		     *
		     * @protected
		     */
		    onOpen() {
		        this.readyState = "open";
		        this.writable = true;
		        super.emitReserved("open");
		    }
		    /**
		     * Called with data.
		     *
		     * @param {String} data
		     * @protected
		     */
		    onData(data) {
		        const packet = (0, engine_io_parser_1.decodePacket)(data, this.socket.binaryType);
		        this.onPacket(packet);
		    }
		    /**
		     * Called with a decoded packet.
		     *
		     * @protected
		     */
		    onPacket(packet) {
		        super.emitReserved("packet", packet);
		    }
		    /**
		     * Called upon close.
		     *
		     * @protected
		     */
		    onClose(details) {
		        this.readyState = "closed";
		        super.emitReserved("close", details);
		    }
		    /**
		     * Pauses the transport, in order not to lose packets during an upgrade.
		     *
		     * @param onPause
		     */
		    pause(onPause) { }
		    createUri(schema, query = {}) {
		        return (schema +
		            "://" +
		            this._hostname() +
		            this._port() +
		            this.opts.path +
		            this._query(query));
		    }
		    _hostname() {
		        const hostname = this.opts.hostname;
		        return hostname.indexOf(":") === -1 ? hostname : "[" + hostname + "]";
		    }
		    _port() {
		        if (this.opts.port &&
		            ((this.opts.secure && Number(this.opts.port !== 443)) ||
		                (!this.opts.secure && Number(this.opts.port) !== 80))) {
		            return ":" + this.opts.port;
		        }
		        else {
		            return "";
		        }
		    }
		    _query(query) {
		        const encodedQuery = (0, parseqs_js_1.encode)(query);
		        return encodedQuery.length ? "?" + encodedQuery : "";
		    }
		}
		transport.Transport = Transport;
		return transport;
	}

	var hasRequiredPolling;

	function requirePolling () {
		if (hasRequiredPolling) return polling;
		hasRequiredPolling = 1;
		var __importDefault = (polling && polling.__importDefault) || function (mod) {
		    return (mod && mod.__esModule) ? mod : { "default": mod };
		};
		Object.defineProperty(polling, "__esModule", { value: true });
		polling.Polling = void 0;
		const transport_js_1 = requireTransport();
		const util_js_1 = requireUtil();
		const engine_io_parser_1 = requireCjs$3();
		const debug_1 = __importDefault(requireBrowser$2()); // debug()
		const debug = (0, debug_1.default)("engine.io-client:polling"); // debug()
		class Polling extends transport_js_1.Transport {
		    constructor() {
		        super(...arguments);
		        this._polling = false;
		    }
		    get name() {
		        return "polling";
		    }
		    /**
		     * Opens the socket (triggers polling). We write a PING message to determine
		     * when the transport is open.
		     *
		     * @protected
		     */
		    doOpen() {
		        this._poll();
		    }
		    /**
		     * Pauses polling.
		     *
		     * @param {Function} onPause - callback upon buffers are flushed and transport is paused
		     * @package
		     */
		    pause(onPause) {
		        this.readyState = "pausing";
		        const pause = () => {
		            debug("paused");
		            this.readyState = "paused";
		            onPause();
		        };
		        if (this._polling || !this.writable) {
		            let total = 0;
		            if (this._polling) {
		                debug("we are currently polling - waiting to pause");
		                total++;
		                this.once("pollComplete", function () {
		                    debug("pre-pause polling complete");
		                    --total || pause();
		                });
		            }
		            if (!this.writable) {
		                debug("we are currently writing - waiting to pause");
		                total++;
		                this.once("drain", function () {
		                    debug("pre-pause writing complete");
		                    --total || pause();
		                });
		            }
		        }
		        else {
		            pause();
		        }
		    }
		    /**
		     * Starts polling cycle.
		     *
		     * @private
		     */
		    _poll() {
		        debug("polling");
		        this._polling = true;
		        this.doPoll();
		        this.emitReserved("poll");
		    }
		    /**
		     * Overloads onData to detect payloads.
		     *
		     * @protected
		     */
		    onData(data) {
		        debug("polling got data %s", data);
		        const callback = (packet) => {
		            // if its the first message we consider the transport open
		            if ("opening" === this.readyState && packet.type === "open") {
		                this.onOpen();
		            }
		            // if its a close packet, we close the ongoing requests
		            if ("close" === packet.type) {
		                this.onClose({ description: "transport closed by the server" });
		                return false;
		            }
		            // otherwise bypass onData and handle the message
		            this.onPacket(packet);
		        };
		        // decode payload
		        (0, engine_io_parser_1.decodePayload)(data, this.socket.binaryType).forEach(callback);
		        // if an event did not trigger closing
		        if ("closed" !== this.readyState) {
		            // if we got data we're not polling
		            this._polling = false;
		            this.emitReserved("pollComplete");
		            if ("open" === this.readyState) {
		                this._poll();
		            }
		            else {
		                debug('ignoring poll - transport state "%s"', this.readyState);
		            }
		        }
		    }
		    /**
		     * For polling, send a close packet.
		     *
		     * @protected
		     */
		    doClose() {
		        const close = () => {
		            debug("writing close packet");
		            this.write([{ type: "close" }]);
		        };
		        if ("open" === this.readyState) {
		            debug("transport open - closing");
		            close();
		        }
		        else {
		            // in case we're trying to close while
		            // handshaking is in progress (GH-164)
		            debug("transport not open - deferring close");
		            this.once("open", close);
		        }
		    }
		    /**
		     * Writes a packets payload.
		     *
		     * @param {Array} packets - data packets
		     * @protected
		     */
		    write(packets) {
		        this.writable = false;
		        (0, engine_io_parser_1.encodePayload)(packets, (data) => {
		            this.doWrite(data, () => {
		                this.writable = true;
		                this.emitReserved("drain");
		            });
		        });
		    }
		    /**
		     * Generates uri for connection.
		     *
		     * @private
		     */
		    uri() {
		        const schema = this.opts.secure ? "https" : "http";
		        const query = this.query || {};
		        // cache busting is forced
		        if (false !== this.opts.timestampRequests) {
		            query[this.opts.timestampParam] = (0, util_js_1.randomString)();
		        }
		        if (!this.supportsBinary && !query.sid) {
		            query.b64 = 1;
		        }
		        return this.createUri(schema, query);
		    }
		}
		polling.Polling = Polling;
		return polling;
	}

	var hasCors = {};

	var hasRequiredHasCors;

	function requireHasCors () {
		if (hasRequiredHasCors) return hasCors;
		hasRequiredHasCors = 1;
		Object.defineProperty(hasCors, "__esModule", { value: true });
		hasCors.hasCORS = void 0;
		// imported from https://github.com/component/has-cors
		let value = false;
		try {
		    value = typeof XMLHttpRequest !== 'undefined' &&
		        'withCredentials' in new XMLHttpRequest();
		}
		catch (err) {
		    // if XMLHttp support is disabled in IE then it will throw
		    // when trying to create
		}
		hasCors.hasCORS = value;
		return hasCors;
	}

	var hasRequiredPollingXhr;

	function requirePollingXhr () {
		if (hasRequiredPollingXhr) return pollingXhr;
		hasRequiredPollingXhr = 1;
		var __importDefault = (pollingXhr && pollingXhr.__importDefault) || function (mod) {
		    return (mod && mod.__esModule) ? mod : { "default": mod };
		};
		Object.defineProperty(pollingXhr, "__esModule", { value: true });
		pollingXhr.XHR = pollingXhr.Request = pollingXhr.BaseXHR = void 0;
		const polling_js_1 = requirePolling();
		const component_emitter_1 = require$$5;
		const util_js_1 = requireUtil();
		const globals_node_js_1 = requireGlobals();
		const has_cors_js_1 = requireHasCors();
		const debug_1 = __importDefault(requireBrowser$2()); // debug()
		const debug = (0, debug_1.default)("engine.io-client:polling"); // debug()
		function empty() { }
		class BaseXHR extends polling_js_1.Polling {
		    /**
		     * XHR Polling constructor.
		     *
		     * @param {Object} opts
		     * @package
		     */
		    constructor(opts) {
		        super(opts);
		        if (typeof location !== "undefined") {
		            const isSSL = "https:" === location.protocol;
		            let port = location.port;
		            // some user agents have empty `location.port`
		            if (!port) {
		                port = isSSL ? "443" : "80";
		            }
		            this.xd =
		                (typeof location !== "undefined" &&
		                    opts.hostname !== location.hostname) ||
		                    port !== opts.port;
		        }
		    }
		    /**
		     * Sends data.
		     *
		     * @param {String} data to send.
		     * @param {Function} called upon flush.
		     * @private
		     */
		    doWrite(data, fn) {
		        const req = this.request({
		            method: "POST",
		            data: data,
		        });
		        req.on("success", fn);
		        req.on("error", (xhrStatus, context) => {
		            this.onError("xhr post error", xhrStatus, context);
		        });
		    }
		    /**
		     * Starts a poll cycle.
		     *
		     * @private
		     */
		    doPoll() {
		        debug("xhr poll");
		        const req = this.request();
		        req.on("data", this.onData.bind(this));
		        req.on("error", (xhrStatus, context) => {
		            this.onError("xhr poll error", xhrStatus, context);
		        });
		        this.pollXhr = req;
		    }
		}
		pollingXhr.BaseXHR = BaseXHR;
		class Request extends component_emitter_1.Emitter {
		    /**
		     * Request constructor
		     *
		     * @param {Object} options
		     * @package
		     */
		    constructor(createRequest, uri, opts) {
		        super();
		        this.createRequest = createRequest;
		        (0, util_js_1.installTimerFunctions)(this, opts);
		        this._opts = opts;
		        this._method = opts.method || "GET";
		        this._uri = uri;
		        this._data = undefined !== opts.data ? opts.data : null;
		        this._create();
		    }
		    /**
		     * Creates the XHR object and sends the request.
		     *
		     * @private
		     */
		    _create() {
		        var _a;
		        const opts = (0, util_js_1.pick)(this._opts, "agent", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
		        opts.xdomain = !!this._opts.xd;
		        const xhr = (this._xhr = this.createRequest(opts));
		        try {
		            debug("xhr open %s: %s", this._method, this._uri);
		            xhr.open(this._method, this._uri, true);
		            try {
		                if (this._opts.extraHeaders) {
		                    // @ts-ignore
		                    xhr.setDisableHeaderCheck && xhr.setDisableHeaderCheck(true);
		                    for (let i in this._opts.extraHeaders) {
		                        if (this._opts.extraHeaders.hasOwnProperty(i)) {
		                            xhr.setRequestHeader(i, this._opts.extraHeaders[i]);
		                        }
		                    }
		                }
		            }
		            catch (e) { }
		            if ("POST" === this._method) {
		                try {
		                    xhr.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
		                }
		                catch (e) { }
		            }
		            try {
		                xhr.setRequestHeader("Accept", "*/*");
		            }
		            catch (e) { }
		            (_a = this._opts.cookieJar) === null || _a === void 0 ? void 0 : _a.addCookies(xhr);
		            // ie6 check
		            if ("withCredentials" in xhr) {
		                xhr.withCredentials = this._opts.withCredentials;
		            }
		            if (this._opts.requestTimeout) {
		                xhr.timeout = this._opts.requestTimeout;
		            }
		            xhr.onreadystatechange = () => {
		                var _a;
		                if (xhr.readyState === 3) {
		                    (_a = this._opts.cookieJar) === null || _a === void 0 ? void 0 : _a.parseCookies(
		                    // @ts-ignore
		                    xhr.getResponseHeader("set-cookie"));
		                }
		                if (4 !== xhr.readyState)
		                    return;
		                if (200 === xhr.status || 1223 === xhr.status) {
		                    this._onLoad();
		                }
		                else {
		                    // make sure the `error` event handler that's user-set
		                    // does not throw in the same tick and gets caught here
		                    this.setTimeoutFn(() => {
		                        this._onError(typeof xhr.status === "number" ? xhr.status : 0);
		                    }, 0);
		                }
		            };
		            debug("xhr data %s", this._data);
		            xhr.send(this._data);
		        }
		        catch (e) {
		            // Need to defer since .create() is called directly from the constructor
		            // and thus the 'error' event can only be only bound *after* this exception
		            // occurs.  Therefore, also, we cannot throw here at all.
		            this.setTimeoutFn(() => {
		                this._onError(e);
		            }, 0);
		            return;
		        }
		        if (typeof document !== "undefined") {
		            this._index = Request.requestsCount++;
		            Request.requests[this._index] = this;
		        }
		    }
		    /**
		     * Called upon error.
		     *
		     * @private
		     */
		    _onError(err) {
		        this.emitReserved("error", err, this._xhr);
		        this._cleanup(true);
		    }
		    /**
		     * Cleans up house.
		     *
		     * @private
		     */
		    _cleanup(fromError) {
		        if ("undefined" === typeof this._xhr || null === this._xhr) {
		            return;
		        }
		        this._xhr.onreadystatechange = empty;
		        if (fromError) {
		            try {
		                this._xhr.abort();
		            }
		            catch (e) { }
		        }
		        if (typeof document !== "undefined") {
		            delete Request.requests[this._index];
		        }
		        this._xhr = null;
		    }
		    /**
		     * Called upon load.
		     *
		     * @private
		     */
		    _onLoad() {
		        const data = this._xhr.responseText;
		        if (data !== null) {
		            this.emitReserved("data", data);
		            this.emitReserved("success");
		            this._cleanup();
		        }
		    }
		    /**
		     * Aborts the request.
		     *
		     * @package
		     */
		    abort() {
		        this._cleanup();
		    }
		}
		pollingXhr.Request = Request;
		Request.requestsCount = 0;
		Request.requests = {};
		/**
		 * Aborts pending requests when unloading the window. This is needed to prevent
		 * memory leaks (e.g. when using IE) and to ensure that no spurious error is
		 * emitted.
		 */
		if (typeof document !== "undefined") {
		    // @ts-ignore
		    if (typeof attachEvent === "function") {
		        // @ts-ignore
		        attachEvent("onunload", unloadHandler);
		    }
		    else if (typeof addEventListener === "function") {
		        const terminationEvent = "onpagehide" in globals_node_js_1.globalThisShim ? "pagehide" : "unload";
		        addEventListener(terminationEvent, unloadHandler, false);
		    }
		}
		function unloadHandler() {
		    for (let i in Request.requests) {
		        if (Request.requests.hasOwnProperty(i)) {
		            Request.requests[i].abort();
		        }
		    }
		}
		const hasXHR2 = (function () {
		    const xhr = newRequest({
		        xdomain: false,
		    });
		    return xhr && xhr.responseType !== null;
		})();
		/**
		 * HTTP long-polling based on the built-in `XMLHttpRequest` object.
		 *
		 * Usage: browser
		 *
		 * @see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
		 */
		class XHR extends BaseXHR {
		    constructor(opts) {
		        super(opts);
		        const forceBase64 = opts && opts.forceBase64;
		        this.supportsBinary = hasXHR2 && !forceBase64;
		    }
		    request(opts = {}) {
		        Object.assign(opts, { xd: this.xd }, this.opts);
		        return new Request(newRequest, this.uri(), opts);
		    }
		}
		pollingXhr.XHR = XHR;
		function newRequest(opts) {
		    const xdomain = opts.xdomain;
		    // XMLHttpRequest can be disabled on IE
		    try {
		        if ("undefined" !== typeof XMLHttpRequest && (!xdomain || has_cors_js_1.hasCORS)) {
		            return new XMLHttpRequest();
		        }
		    }
		    catch (e) { }
		    if (!xdomain) {
		        try {
		            return new globals_node_js_1.globalThisShim[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
		        }
		        catch (e) { }
		    }
		}
		return pollingXhr;
	}

	var websocket = {};

	var hasRequiredWebsocket;

	function requireWebsocket () {
		if (hasRequiredWebsocket) return websocket;
		hasRequiredWebsocket = 1;
		var __importDefault = (websocket && websocket.__importDefault) || function (mod) {
		    return (mod && mod.__esModule) ? mod : { "default": mod };
		};
		Object.defineProperty(websocket, "__esModule", { value: true });
		websocket.WS = websocket.BaseWS = void 0;
		const transport_js_1 = requireTransport();
		const util_js_1 = requireUtil();
		const engine_io_parser_1 = requireCjs$3();
		const globals_node_js_1 = requireGlobals();
		const debug_1 = __importDefault(requireBrowser$2()); // debug()
		const debug = (0, debug_1.default)("engine.io-client:websocket"); // debug()
		// detect ReactNative environment
		const isReactNative = typeof navigator !== "undefined" &&
		    typeof navigator.product === "string" &&
		    navigator.product.toLowerCase() === "reactnative";
		class BaseWS extends transport_js_1.Transport {
		    get name() {
		        return "websocket";
		    }
		    doOpen() {
		        const uri = this.uri();
		        const protocols = this.opts.protocols;
		        // React Native only supports the 'headers' option, and will print a warning if anything else is passed
		        const opts = isReactNative
		            ? {}
		            : (0, util_js_1.pick)(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");
		        if (this.opts.extraHeaders) {
		            opts.headers = this.opts.extraHeaders;
		        }
		        try {
		            this.ws = this.createSocket(uri, protocols, opts);
		        }
		        catch (err) {
		            return this.emitReserved("error", err);
		        }
		        this.ws.binaryType = this.socket.binaryType;
		        this.addEventListeners();
		    }
		    /**
		     * Adds event listeners to the socket
		     *
		     * @private
		     */
		    addEventListeners() {
		        this.ws.onopen = () => {
		            if (this.opts.autoUnref) {
		                this.ws._socket.unref();
		            }
		            this.onOpen();
		        };
		        this.ws.onclose = (closeEvent) => this.onClose({
		            description: "websocket connection closed",
		            context: closeEvent,
		        });
		        this.ws.onmessage = (ev) => this.onData(ev.data);
		        this.ws.onerror = (e) => this.onError("websocket error", e);
		    }
		    write(packets) {
		        this.writable = false;
		        // encodePacket efficient as it uses WS framing
		        // no need for encodePayload
		        for (let i = 0; i < packets.length; i++) {
		            const packet = packets[i];
		            const lastPacket = i === packets.length - 1;
		            (0, engine_io_parser_1.encodePacket)(packet, this.supportsBinary, (data) => {
		                // Sometimes the websocket has already been closed but the browser didn't
		                // have a chance of informing us about it yet, in that case send will
		                // throw an error
		                try {
		                    this.doWrite(packet, data);
		                }
		                catch (e) {
		                    debug("websocket closed before onclose event");
		                }
		                if (lastPacket) {
		                    // fake drain
		                    // defer to next tick to allow Socket to clear writeBuffer
		                    (0, globals_node_js_1.nextTick)(() => {
		                        this.writable = true;
		                        this.emitReserved("drain");
		                    }, this.setTimeoutFn);
		                }
		            });
		        }
		    }
		    doClose() {
		        if (typeof this.ws !== "undefined") {
		            this.ws.onerror = () => { };
		            this.ws.close();
		            this.ws = null;
		        }
		    }
		    /**
		     * Generates uri for connection.
		     *
		     * @private
		     */
		    uri() {
		        const schema = this.opts.secure ? "wss" : "ws";
		        const query = this.query || {};
		        // append timestamp to URI
		        if (this.opts.timestampRequests) {
		            query[this.opts.timestampParam] = (0, util_js_1.randomString)();
		        }
		        // communicate binary support capabilities
		        if (!this.supportsBinary) {
		            query.b64 = 1;
		        }
		        return this.createUri(schema, query);
		    }
		}
		websocket.BaseWS = BaseWS;
		const WebSocketCtor = globals_node_js_1.globalThisShim.WebSocket || globals_node_js_1.globalThisShim.MozWebSocket;
		/**
		 * WebSocket transport based on the built-in `WebSocket` object.
		 *
		 * Usage: browser, Node.js (since v21), Deno, Bun
		 *
		 * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
		 * @see https://caniuse.com/mdn-api_websocket
		 * @see https://nodejs.org/api/globals.html#websocket
		 */
		class WS extends BaseWS {
		    createSocket(uri, protocols, opts) {
		        return !isReactNative
		            ? protocols
		                ? new WebSocketCtor(uri, protocols)
		                : new WebSocketCtor(uri)
		            : new WebSocketCtor(uri, protocols, opts);
		    }
		    doWrite(_packet, data) {
		        this.ws.send(data);
		    }
		}
		websocket.WS = WS;
		return websocket;
	}

	var webtransport = {};

	var hasRequiredWebtransport;

	function requireWebtransport () {
		if (hasRequiredWebtransport) return webtransport;
		hasRequiredWebtransport = 1;
		var __importDefault = (webtransport && webtransport.__importDefault) || function (mod) {
		    return (mod && mod.__esModule) ? mod : { "default": mod };
		};
		Object.defineProperty(webtransport, "__esModule", { value: true });
		webtransport.WT = void 0;
		const transport_js_1 = requireTransport();
		const globals_node_js_1 = requireGlobals();
		const engine_io_parser_1 = requireCjs$3();
		const debug_1 = __importDefault(requireBrowser$2()); // debug()
		const debug = (0, debug_1.default)("engine.io-client:webtransport"); // debug()
		/**
		 * WebTransport transport based on the built-in `WebTransport` object.
		 *
		 * Usage: browser, Node.js (with the `@fails-components/webtransport` package)
		 *
		 * @see https://developer.mozilla.org/en-US/docs/Web/API/WebTransport
		 * @see https://caniuse.com/webtransport
		 */
		class WT extends transport_js_1.Transport {
		    get name() {
		        return "webtransport";
		    }
		    doOpen() {
		        try {
		            // @ts-ignore
		            this._transport = new WebTransport(this.createUri("https"), this.opts.transportOptions[this.name]);
		        }
		        catch (err) {
		            return this.emitReserved("error", err);
		        }
		        this._transport.closed
		            .then(() => {
		            debug("transport closed gracefully");
		            this.onClose();
		        })
		            .catch((err) => {
		            debug("transport closed due to %s", err);
		            this.onError("webtransport error", err);
		        });
		        // note: we could have used async/await, but that would require some additional polyfills
		        this._transport.ready.then(() => {
		            this._transport.createBidirectionalStream().then((stream) => {
		                const decoderStream = (0, engine_io_parser_1.createPacketDecoderStream)(Number.MAX_SAFE_INTEGER, this.socket.binaryType);
		                const reader = stream.readable.pipeThrough(decoderStream).getReader();
		                const encoderStream = (0, engine_io_parser_1.createPacketEncoderStream)();
		                encoderStream.readable.pipeTo(stream.writable);
		                this._writer = encoderStream.writable.getWriter();
		                const read = () => {
		                    reader
		                        .read()
		                        .then(({ done, value }) => {
		                        if (done) {
		                            debug("session is closed");
		                            return;
		                        }
		                        debug("received chunk: %o", value);
		                        this.onPacket(value);
		                        read();
		                    })
		                        .catch((err) => {
		                        debug("an error occurred while reading: %s", err);
		                    });
		                };
		                read();
		                const packet = { type: "open" };
		                if (this.query.sid) {
		                    packet.data = `{"sid":"${this.query.sid}"}`;
		                }
		                this._writer.write(packet).then(() => this.onOpen());
		            });
		        });
		    }
		    write(packets) {
		        this.writable = false;
		        for (let i = 0; i < packets.length; i++) {
		            const packet = packets[i];
		            const lastPacket = i === packets.length - 1;
		            this._writer.write(packet).then(() => {
		                if (lastPacket) {
		                    (0, globals_node_js_1.nextTick)(() => {
		                        this.writable = true;
		                        this.emitReserved("drain");
		                    }, this.setTimeoutFn);
		                }
		            });
		        }
		    }
		    doClose() {
		        var _a;
		        (_a = this._transport) === null || _a === void 0 ? void 0 : _a.close();
		    }
		}
		webtransport.WT = WT;
		return webtransport;
	}

	var hasRequiredTransports;

	function requireTransports () {
		if (hasRequiredTransports) return transports;
		hasRequiredTransports = 1;
		Object.defineProperty(transports, "__esModule", { value: true });
		transports.transports = void 0;
		const polling_xhr_node_js_1 = requirePollingXhr();
		const websocket_node_js_1 = requireWebsocket();
		const webtransport_js_1 = requireWebtransport();
		transports.transports = {
		    websocket: websocket_node_js_1.WS,
		    webtransport: webtransport_js_1.WT,
		    polling: polling_xhr_node_js_1.XHR,
		};
		return transports;
	}

	var parseuri = {};

	var hasRequiredParseuri;

	function requireParseuri () {
		if (hasRequiredParseuri) return parseuri;
		hasRequiredParseuri = 1;
		Object.defineProperty(parseuri, "__esModule", { value: true });
		parseuri.parse = parse;
		// imported from https://github.com/galkn/parseuri
		/**
		 * Parses a URI
		 *
		 * Note: we could also have used the built-in URL object, but it isn't supported on all platforms.
		 *
		 * See:
		 * - https://developer.mozilla.org/en-US/docs/Web/API/URL
		 * - https://caniuse.com/url
		 * - https://www.rfc-editor.org/rfc/rfc3986#appendix-B
		 *
		 * History of the parse() method:
		 * - first commit: https://github.com/socketio/socket.io-client/commit/4ee1d5d94b3906a9c052b459f1a818b15f38f91c
		 * - export into its own module: https://github.com/socketio/engine.io-client/commit/de2c561e4564efeb78f1bdb1ba39ef81b2822cb3
		 * - reimport: https://github.com/socketio/engine.io-client/commit/df32277c3f6d622eec5ed09f493cae3f3391d242
		 *
		 * @author Steven Levithan <stevenlevithan.com> (MIT license)
		 * @api private
		 */
		const re = /^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
		const parts = [
		    'source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'
		];
		function parse(str) {
		    if (str.length > 8000) {
		        throw "URI too long";
		    }
		    const src = str, b = str.indexOf('['), e = str.indexOf(']');
		    if (b != -1 && e != -1) {
		        str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ';') + str.substring(e, str.length);
		    }
		    let m = re.exec(str || ''), uri = {}, i = 14;
		    while (i--) {
		        uri[parts[i]] = m[i] || '';
		    }
		    if (b != -1 && e != -1) {
		        uri.source = src;
		        uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ':');
		        uri.authority = uri.authority.replace('[', '').replace(']', '').replace(/;/g, ':');
		        uri.ipv6uri = true;
		    }
		    uri.pathNames = pathNames(uri, uri['path']);
		    uri.queryKey = queryKey(uri, uri['query']);
		    return uri;
		}
		function pathNames(obj, path) {
		    const regx = /\/{2,9}/g, names = path.replace(regx, "/").split("/");
		    if (path.slice(0, 1) == '/' || path.length === 0) {
		        names.splice(0, 1);
		    }
		    if (path.slice(-1) == '/') {
		        names.splice(names.length - 1, 1);
		    }
		    return names;
		}
		function queryKey(uri, query) {
		    const data = {};
		    query.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function ($0, $1, $2) {
		        if ($1) {
		            data[$1] = $2;
		        }
		    });
		    return data;
		}
		return parseuri;
	}

	var hasRequiredSocket$1;

	function requireSocket$1 () {
		if (hasRequiredSocket$1) return socket$1;
		hasRequiredSocket$1 = 1;
		var __importDefault = (socket$1 && socket$1.__importDefault) || function (mod) {
		    return (mod && mod.__esModule) ? mod : { "default": mod };
		};
		Object.defineProperty(socket$1, "__esModule", { value: true });
		socket$1.Socket = socket$1.SocketWithUpgrade = socket$1.SocketWithoutUpgrade = void 0;
		const index_js_1 = requireTransports();
		const util_js_1 = requireUtil();
		const parseqs_js_1 = requireParseqs();
		const parseuri_js_1 = requireParseuri();
		const component_emitter_1 = require$$5;
		const engine_io_parser_1 = requireCjs$3();
		const globals_node_js_1 = requireGlobals();
		const debug_1 = __importDefault(requireBrowser$2()); // debug()
		const debug = (0, debug_1.default)("engine.io-client:socket"); // debug()
		const withEventListeners = typeof addEventListener === "function" &&
		    typeof removeEventListener === "function";
		const OFFLINE_EVENT_LISTENERS = [];
		if (withEventListeners) {
		    // within a ServiceWorker, any event handler for the 'offline' event must be added on the initial evaluation of the
		    // script, so we create one single event listener here which will forward the event to the socket instances
		    addEventListener("offline", () => {
		        debug("closing %d connection(s) because the network was lost", OFFLINE_EVENT_LISTENERS.length);
		        OFFLINE_EVENT_LISTENERS.forEach((listener) => listener());
		    }, false);
		}
		/**
		 * This class provides a WebSocket-like interface to connect to an Engine.IO server. The connection will be established
		 * with one of the available low-level transports, like HTTP long-polling, WebSocket or WebTransport.
		 *
		 * This class comes without upgrade mechanism, which means that it will keep the first low-level transport that
		 * successfully establishes the connection.
		 *
		 * In order to allow tree-shaking, there are no transports included, that's why the `transports` option is mandatory.
		 *
		 * @example
		 * import { SocketWithoutUpgrade, WebSocket } from "engine.io-client";
		 *
		 * const socket = new SocketWithoutUpgrade({
		 *   transports: [WebSocket]
		 * });
		 *
		 * socket.on("open", () => {
		 *   socket.send("hello");
		 * });
		 *
		 * @see SocketWithUpgrade
		 * @see Socket
		 */
		class SocketWithoutUpgrade extends component_emitter_1.Emitter {
		    /**
		     * Socket constructor.
		     *
		     * @param {String|Object} uri - uri or options
		     * @param {Object} opts - options
		     */
		    constructor(uri, opts) {
		        super();
		        this.binaryType = globals_node_js_1.defaultBinaryType;
		        this.writeBuffer = [];
		        this._prevBufferLen = 0;
		        this._pingInterval = -1;
		        this._pingTimeout = -1;
		        this._maxPayload = -1;
		        /**
		         * The expiration timestamp of the {@link _pingTimeoutTimer} object is tracked, in case the timer is throttled and the
		         * callback is not fired on time. This can happen for example when a laptop is suspended or when a phone is locked.
		         */
		        this._pingTimeoutTime = Infinity;
		        if (uri && "object" === typeof uri) {
		            opts = uri;
		            uri = null;
		        }
		        if (uri) {
		            const parsedUri = (0, parseuri_js_1.parse)(uri);
		            opts.hostname = parsedUri.host;
		            opts.secure =
		                parsedUri.protocol === "https" || parsedUri.protocol === "wss";
		            opts.port = parsedUri.port;
		            if (parsedUri.query)
		                opts.query = parsedUri.query;
		        }
		        else if (opts.host) {
		            opts.hostname = (0, parseuri_js_1.parse)(opts.host).host;
		        }
		        (0, util_js_1.installTimerFunctions)(this, opts);
		        this.secure =
		            null != opts.secure
		                ? opts.secure
		                : typeof location !== "undefined" && "https:" === location.protocol;
		        if (opts.hostname && !opts.port) {
		            // if no port is specified manually, use the protocol default
		            opts.port = this.secure ? "443" : "80";
		        }
		        this.hostname =
		            opts.hostname ||
		                (typeof location !== "undefined" ? location.hostname : "localhost");
		        this.port =
		            opts.port ||
		                (typeof location !== "undefined" && location.port
		                    ? location.port
		                    : this.secure
		                        ? "443"
		                        : "80");
		        this.transports = [];
		        this._transportsByName = {};
		        opts.transports.forEach((t) => {
		            const transportName = t.prototype.name;
		            this.transports.push(transportName);
		            this._transportsByName[transportName] = t;
		        });
		        this.opts = Object.assign({
		            path: "/engine.io",
		            agent: false,
		            withCredentials: false,
		            upgrade: true,
		            timestampParam: "t",
		            rememberUpgrade: false,
		            addTrailingSlash: true,
		            rejectUnauthorized: true,
		            perMessageDeflate: {
		                threshold: 1024,
		            },
		            transportOptions: {},
		            closeOnBeforeunload: false,
		        }, opts);
		        this.opts.path =
		            this.opts.path.replace(/\/$/, "") +
		                (this.opts.addTrailingSlash ? "/" : "");
		        if (typeof this.opts.query === "string") {
		            this.opts.query = (0, parseqs_js_1.decode)(this.opts.query);
		        }
		        if (withEventListeners) {
		            if (this.opts.closeOnBeforeunload) {
		                // Firefox closes the connection when the "beforeunload" event is emitted but not Chrome. This event listener
		                // ensures every browser behaves the same (no "disconnect" event at the Socket.IO level when the page is
		                // closed/reloaded)
		                this._beforeunloadEventListener = () => {
		                    if (this.transport) {
		                        // silently close the transport
		                        this.transport.removeAllListeners();
		                        this.transport.close();
		                    }
		                };
		                addEventListener("beforeunload", this._beforeunloadEventListener, false);
		            }
		            if (this.hostname !== "localhost") {
		                debug("adding listener for the 'offline' event");
		                this._offlineEventListener = () => {
		                    this._onClose("transport close", {
		                        description: "network connection lost",
		                    });
		                };
		                OFFLINE_EVENT_LISTENERS.push(this._offlineEventListener);
		            }
		        }
		        if (this.opts.withCredentials) {
		            this._cookieJar = (0, globals_node_js_1.createCookieJar)();
		        }
		        this._open();
		    }
		    /**
		     * Creates transport of the given type.
		     *
		     * @param {String} name - transport name
		     * @return {Transport}
		     * @private
		     */
		    createTransport(name) {
		        debug('creating transport "%s"', name);
		        const query = Object.assign({}, this.opts.query);
		        // append engine.io protocol identifier
		        query.EIO = engine_io_parser_1.protocol;
		        // transport name
		        query.transport = name;
		        // session id if we already have one
		        if (this.id)
		            query.sid = this.id;
		        const opts = Object.assign({}, this.opts, {
		            query,
		            socket: this,
		            hostname: this.hostname,
		            secure: this.secure,
		            port: this.port,
		        }, this.opts.transportOptions[name]);
		        debug("options: %j", opts);
		        return new this._transportsByName[name](opts);
		    }
		    /**
		     * Initializes transport to use and starts probe.
		     *
		     * @private
		     */
		    _open() {
		        if (this.transports.length === 0) {
		            // Emit error on next tick so it can be listened to
		            this.setTimeoutFn(() => {
		                this.emitReserved("error", "No transports available");
		            }, 0);
		            return;
		        }
		        const transportName = this.opts.rememberUpgrade &&
		            SocketWithoutUpgrade.priorWebsocketSuccess &&
		            this.transports.indexOf("websocket") !== -1
		            ? "websocket"
		            : this.transports[0];
		        this.readyState = "opening";
		        const transport = this.createTransport(transportName);
		        transport.open();
		        this.setTransport(transport);
		    }
		    /**
		     * Sets the current transport. Disables the existing one (if any).
		     *
		     * @private
		     */
		    setTransport(transport) {
		        debug("setting transport %s", transport.name);
		        if (this.transport) {
		            debug("clearing existing transport %s", this.transport.name);
		            this.transport.removeAllListeners();
		        }
		        // set up transport
		        this.transport = transport;
		        // set up transport listeners
		        transport
		            .on("drain", this._onDrain.bind(this))
		            .on("packet", this._onPacket.bind(this))
		            .on("error", this._onError.bind(this))
		            .on("close", (reason) => this._onClose("transport close", reason));
		    }
		    /**
		     * Called when connection is deemed open.
		     *
		     * @private
		     */
		    onOpen() {
		        debug("socket open");
		        this.readyState = "open";
		        SocketWithoutUpgrade.priorWebsocketSuccess =
		            "websocket" === this.transport.name;
		        this.emitReserved("open");
		        this.flush();
		    }
		    /**
		     * Handles a packet.
		     *
		     * @private
		     */
		    _onPacket(packet) {
		        if ("opening" === this.readyState ||
		            "open" === this.readyState ||
		            "closing" === this.readyState) {
		            debug('socket receive: type "%s", data "%s"', packet.type, packet.data);
		            this.emitReserved("packet", packet);
		            // Socket is live - any packet counts
		            this.emitReserved("heartbeat");
		            switch (packet.type) {
		                case "open":
		                    this.onHandshake(JSON.parse(packet.data));
		                    break;
		                case "ping":
		                    this._sendPacket("pong");
		                    this.emitReserved("ping");
		                    this.emitReserved("pong");
		                    this._resetPingTimeout();
		                    break;
		                case "error":
		                    const err = new Error("server error");
		                    // @ts-ignore
		                    err.code = packet.data;
		                    this._onError(err);
		                    break;
		                case "message":
		                    this.emitReserved("data", packet.data);
		                    this.emitReserved("message", packet.data);
		                    break;
		            }
		        }
		        else {
		            debug('packet received with socket readyState "%s"', this.readyState);
		        }
		    }
		    /**
		     * Called upon handshake completion.
		     *
		     * @param {Object} data - handshake obj
		     * @private
		     */
		    onHandshake(data) {
		        this.emitReserved("handshake", data);
		        this.id = data.sid;
		        this.transport.query.sid = data.sid;
		        this._pingInterval = data.pingInterval;
		        this._pingTimeout = data.pingTimeout;
		        this._maxPayload = data.maxPayload;
		        this.onOpen();
		        // In case open handler closes socket
		        if ("closed" === this.readyState)
		            return;
		        this._resetPingTimeout();
		    }
		    /**
		     * Sets and resets ping timeout timer based on server pings.
		     *
		     * @private
		     */
		    _resetPingTimeout() {
		        this.clearTimeoutFn(this._pingTimeoutTimer);
		        const delay = this._pingInterval + this._pingTimeout;
		        this._pingTimeoutTime = Date.now() + delay;
		        this._pingTimeoutTimer = this.setTimeoutFn(() => {
		            this._onClose("ping timeout");
		        }, delay);
		        if (this.opts.autoUnref) {
		            this._pingTimeoutTimer.unref();
		        }
		    }
		    /**
		     * Called on `drain` event
		     *
		     * @private
		     */
		    _onDrain() {
		        this.writeBuffer.splice(0, this._prevBufferLen);
		        // setting prevBufferLen = 0 is very important
		        // for example, when upgrading, upgrade packet is sent over,
		        // and a nonzero prevBufferLen could cause problems on `drain`
		        this._prevBufferLen = 0;
		        if (0 === this.writeBuffer.length) {
		            this.emitReserved("drain");
		        }
		        else {
		            this.flush();
		        }
		    }
		    /**
		     * Flush write buffers.
		     *
		     * @private
		     */
		    flush() {
		        if ("closed" !== this.readyState &&
		            this.transport.writable &&
		            !this.upgrading &&
		            this.writeBuffer.length) {
		            const packets = this._getWritablePackets();
		            debug("flushing %d packets in socket", packets.length);
		            this.transport.send(packets);
		            // keep track of current length of writeBuffer
		            // splice writeBuffer and callbackBuffer on `drain`
		            this._prevBufferLen = packets.length;
		            this.emitReserved("flush");
		        }
		    }
		    /**
		     * Ensure the encoded size of the writeBuffer is below the maxPayload value sent by the server (only for HTTP
		     * long-polling)
		     *
		     * @private
		     */
		    _getWritablePackets() {
		        const shouldCheckPayloadSize = this._maxPayload &&
		            this.transport.name === "polling" &&
		            this.writeBuffer.length > 1;
		        if (!shouldCheckPayloadSize) {
		            return this.writeBuffer;
		        }
		        let payloadSize = 1; // first packet type
		        for (let i = 0; i < this.writeBuffer.length; i++) {
		            const data = this.writeBuffer[i].data;
		            if (data) {
		                payloadSize += (0, util_js_1.byteLength)(data);
		            }
		            if (i > 0 && payloadSize > this._maxPayload) {
		                debug("only send %d out of %d packets", i, this.writeBuffer.length);
		                return this.writeBuffer.slice(0, i);
		            }
		            payloadSize += 2; // separator + packet type
		        }
		        debug("payload size is %d (max: %d)", payloadSize, this._maxPayload);
		        return this.writeBuffer;
		    }
		    /**
		     * Checks whether the heartbeat timer has expired but the socket has not yet been notified.
		     *
		     * Note: this method is private for now because it does not really fit the WebSocket API, but if we put it in the
		     * `write()` method then the message would not be buffered by the Socket.IO client.
		     *
		     * @return {boolean}
		     * @private
		     */
		    /* private */ _hasPingExpired() {
		        if (!this._pingTimeoutTime)
		            return true;
		        const hasExpired = Date.now() > this._pingTimeoutTime;
		        if (hasExpired) {
		            debug("throttled timer detected, scheduling connection close");
		            this._pingTimeoutTime = 0;
		            (0, globals_node_js_1.nextTick)(() => {
		                this._onClose("ping timeout");
		            }, this.setTimeoutFn);
		        }
		        return hasExpired;
		    }
		    /**
		     * Sends a message.
		     *
		     * @param {String} msg - message.
		     * @param {Object} options.
		     * @param {Function} fn - callback function.
		     * @return {Socket} for chaining.
		     */
		    write(msg, options, fn) {
		        this._sendPacket("message", msg, options, fn);
		        return this;
		    }
		    /**
		     * Sends a message. Alias of {@link Socket#write}.
		     *
		     * @param {String} msg - message.
		     * @param {Object} options.
		     * @param {Function} fn - callback function.
		     * @return {Socket} for chaining.
		     */
		    send(msg, options, fn) {
		        this._sendPacket("message", msg, options, fn);
		        return this;
		    }
		    /**
		     * Sends a packet.
		     *
		     * @param {String} type: packet type.
		     * @param {String} data.
		     * @param {Object} options.
		     * @param {Function} fn - callback function.
		     * @private
		     */
		    _sendPacket(type, data, options, fn) {
		        if ("function" === typeof data) {
		            fn = data;
		            data = undefined;
		        }
		        if ("function" === typeof options) {
		            fn = options;
		            options = null;
		        }
		        if ("closing" === this.readyState || "closed" === this.readyState) {
		            return;
		        }
		        options = options || {};
		        options.compress = false !== options.compress;
		        const packet = {
		            type: type,
		            data: data,
		            options: options,
		        };
		        this.emitReserved("packetCreate", packet);
		        this.writeBuffer.push(packet);
		        if (fn)
		            this.once("flush", fn);
		        this.flush();
		    }
		    /**
		     * Closes the connection.
		     */
		    close() {
		        const close = () => {
		            this._onClose("forced close");
		            debug("socket closing - telling transport to close");
		            this.transport.close();
		        };
		        const cleanupAndClose = () => {
		            this.off("upgrade", cleanupAndClose);
		            this.off("upgradeError", cleanupAndClose);
		            close();
		        };
		        const waitForUpgrade = () => {
		            // wait for upgrade to finish since we can't send packets while pausing a transport
		            this.once("upgrade", cleanupAndClose);
		            this.once("upgradeError", cleanupAndClose);
		        };
		        if ("opening" === this.readyState || "open" === this.readyState) {
		            this.readyState = "closing";
		            if (this.writeBuffer.length) {
		                this.once("drain", () => {
		                    if (this.upgrading) {
		                        waitForUpgrade();
		                    }
		                    else {
		                        close();
		                    }
		                });
		            }
		            else if (this.upgrading) {
		                waitForUpgrade();
		            }
		            else {
		                close();
		            }
		        }
		        return this;
		    }
		    /**
		     * Called upon transport error
		     *
		     * @private
		     */
		    _onError(err) {
		        debug("socket error %j", err);
		        SocketWithoutUpgrade.priorWebsocketSuccess = false;
		        if (this.opts.tryAllTransports &&
		            this.transports.length > 1 &&
		            this.readyState === "opening") {
		            debug("trying next transport");
		            this.transports.shift();
		            return this._open();
		        }
		        this.emitReserved("error", err);
		        this._onClose("transport error", err);
		    }
		    /**
		     * Called upon transport close.
		     *
		     * @private
		     */
		    _onClose(reason, description) {
		        if ("opening" === this.readyState ||
		            "open" === this.readyState ||
		            "closing" === this.readyState) {
		            debug('socket close with reason: "%s"', reason);
		            // clear timers
		            this.clearTimeoutFn(this._pingTimeoutTimer);
		            // stop event from firing again for transport
		            this.transport.removeAllListeners("close");
		            // ensure transport won't stay open
		            this.transport.close();
		            // ignore further transport communication
		            this.transport.removeAllListeners();
		            if (withEventListeners) {
		                if (this._beforeunloadEventListener) {
		                    removeEventListener("beforeunload", this._beforeunloadEventListener, false);
		                }
		                if (this._offlineEventListener) {
		                    const i = OFFLINE_EVENT_LISTENERS.indexOf(this._offlineEventListener);
		                    if (i !== -1) {
		                        debug("removing listener for the 'offline' event");
		                        OFFLINE_EVENT_LISTENERS.splice(i, 1);
		                    }
		                }
		            }
		            // set ready state
		            this.readyState = "closed";
		            // clear session id
		            this.id = null;
		            // emit close event
		            this.emitReserved("close", reason, description);
		            // clean buffers after, so users can still
		            // grab the buffers on `close` event
		            this.writeBuffer = [];
		            this._prevBufferLen = 0;
		        }
		    }
		}
		socket$1.SocketWithoutUpgrade = SocketWithoutUpgrade;
		SocketWithoutUpgrade.protocol = engine_io_parser_1.protocol;
		/**
		 * This class provides a WebSocket-like interface to connect to an Engine.IO server. The connection will be established
		 * with one of the available low-level transports, like HTTP long-polling, WebSocket or WebTransport.
		 *
		 * This class comes with an upgrade mechanism, which means that once the connection is established with the first
		 * low-level transport, it will try to upgrade to a better transport.
		 *
		 * In order to allow tree-shaking, there are no transports included, that's why the `transports` option is mandatory.
		 *
		 * @example
		 * import { SocketWithUpgrade, WebSocket } from "engine.io-client";
		 *
		 * const socket = new SocketWithUpgrade({
		 *   transports: [WebSocket]
		 * });
		 *
		 * socket.on("open", () => {
		 *   socket.send("hello");
		 * });
		 *
		 * @see SocketWithoutUpgrade
		 * @see Socket
		 */
		class SocketWithUpgrade extends SocketWithoutUpgrade {
		    constructor() {
		        super(...arguments);
		        this._upgrades = [];
		    }
		    onOpen() {
		        super.onOpen();
		        if ("open" === this.readyState && this.opts.upgrade) {
		            debug("starting upgrade probes");
		            for (let i = 0; i < this._upgrades.length; i++) {
		                this._probe(this._upgrades[i]);
		            }
		        }
		    }
		    /**
		     * Probes a transport.
		     *
		     * @param {String} name - transport name
		     * @private
		     */
		    _probe(name) {
		        debug('probing transport "%s"', name);
		        let transport = this.createTransport(name);
		        let failed = false;
		        SocketWithoutUpgrade.priorWebsocketSuccess = false;
		        const onTransportOpen = () => {
		            if (failed)
		                return;
		            debug('probe transport "%s" opened', name);
		            transport.send([{ type: "ping", data: "probe" }]);
		            transport.once("packet", (msg) => {
		                if (failed)
		                    return;
		                if ("pong" === msg.type && "probe" === msg.data) {
		                    debug('probe transport "%s" pong', name);
		                    this.upgrading = true;
		                    this.emitReserved("upgrading", transport);
		                    if (!transport)
		                        return;
		                    SocketWithoutUpgrade.priorWebsocketSuccess =
		                        "websocket" === transport.name;
		                    debug('pausing current transport "%s"', this.transport.name);
		                    this.transport.pause(() => {
		                        if (failed)
		                            return;
		                        if ("closed" === this.readyState)
		                            return;
		                        debug("changing transport and sending upgrade packet");
		                        cleanup();
		                        this.setTransport(transport);
		                        transport.send([{ type: "upgrade" }]);
		                        this.emitReserved("upgrade", transport);
		                        transport = null;
		                        this.upgrading = false;
		                        this.flush();
		                    });
		                }
		                else {
		                    debug('probe transport "%s" failed', name);
		                    const err = new Error("probe error");
		                    // @ts-ignore
		                    err.transport = transport.name;
		                    this.emitReserved("upgradeError", err);
		                }
		            });
		        };
		        function freezeTransport() {
		            if (failed)
		                return;
		            // Any callback called by transport should be ignored since now
		            failed = true;
		            cleanup();
		            transport.close();
		            transport = null;
		        }
		        // Handle any error that happens while probing
		        const onerror = (err) => {
		            const error = new Error("probe error: " + err);
		            // @ts-ignore
		            error.transport = transport.name;
		            freezeTransport();
		            debug('probe transport "%s" failed because of error: %s', name, err);
		            this.emitReserved("upgradeError", error);
		        };
		        function onTransportClose() {
		            onerror("transport closed");
		        }
		        // When the socket is closed while we're probing
		        function onclose() {
		            onerror("socket closed");
		        }
		        // When the socket is upgraded while we're probing
		        function onupgrade(to) {
		            if (transport && to.name !== transport.name) {
		                debug('"%s" works - aborting "%s"', to.name, transport.name);
		                freezeTransport();
		            }
		        }
		        // Remove all listeners on the transport and on self
		        const cleanup = () => {
		            transport.removeListener("open", onTransportOpen);
		            transport.removeListener("error", onerror);
		            transport.removeListener("close", onTransportClose);
		            this.off("close", onclose);
		            this.off("upgrading", onupgrade);
		        };
		        transport.once("open", onTransportOpen);
		        transport.once("error", onerror);
		        transport.once("close", onTransportClose);
		        this.once("close", onclose);
		        this.once("upgrading", onupgrade);
		        if (this._upgrades.indexOf("webtransport") !== -1 &&
		            name !== "webtransport") {
		            // favor WebTransport
		            this.setTimeoutFn(() => {
		                if (!failed) {
		                    transport.open();
		                }
		            }, 200);
		        }
		        else {
		            transport.open();
		        }
		    }
		    onHandshake(data) {
		        this._upgrades = this._filterUpgrades(data.upgrades);
		        super.onHandshake(data);
		    }
		    /**
		     * Filters upgrades, returning only those matching client transports.
		     *
		     * @param {Array} upgrades - server upgrades
		     * @private
		     */
		    _filterUpgrades(upgrades) {
		        const filteredUpgrades = [];
		        for (let i = 0; i < upgrades.length; i++) {
		            if (~this.transports.indexOf(upgrades[i]))
		                filteredUpgrades.push(upgrades[i]);
		        }
		        return filteredUpgrades;
		    }
		}
		socket$1.SocketWithUpgrade = SocketWithUpgrade;
		/**
		 * This class provides a WebSocket-like interface to connect to an Engine.IO server. The connection will be established
		 * with one of the available low-level transports, like HTTP long-polling, WebSocket or WebTransport.
		 *
		 * This class comes with an upgrade mechanism, which means that once the connection is established with the first
		 * low-level transport, it will try to upgrade to a better transport.
		 *
		 * @example
		 * import { Socket } from "engine.io-client";
		 *
		 * const socket = new Socket();
		 *
		 * socket.on("open", () => {
		 *   socket.send("hello");
		 * });
		 *
		 * @see SocketWithoutUpgrade
		 * @see SocketWithUpgrade
		 */
		class Socket extends SocketWithUpgrade {
		    constructor(uri, opts = {}) {
		        const o = typeof uri === "object" ? uri : opts;
		        if (!o.transports ||
		            (o.transports && typeof o.transports[0] === "string")) {
		            o.transports = (o.transports || ["polling", "websocket", "webtransport"])
		                .map((transportName) => index_js_1.transports[transportName])
		                .filter((t) => !!t);
		        }
		        super(uri, o);
		    }
		}
		socket$1.Socket = Socket;
		return socket$1;
	}

	var pollingFetch = {};

	var hasRequiredPollingFetch;

	function requirePollingFetch () {
		if (hasRequiredPollingFetch) return pollingFetch;
		hasRequiredPollingFetch = 1;
		Object.defineProperty(pollingFetch, "__esModule", { value: true });
		pollingFetch.Fetch = void 0;
		const polling_js_1 = requirePolling();
		/**
		 * HTTP long-polling based on the built-in `fetch()` method.
		 *
		 * Usage: browser, Node.js (since v18), Deno, Bun
		 *
		 * @see https://developer.mozilla.org/en-US/docs/Web/API/fetch
		 * @see https://caniuse.com/fetch
		 * @see https://nodejs.org/api/globals.html#fetch
		 */
		class Fetch extends polling_js_1.Polling {
		    doPoll() {
		        this._fetch()
		            .then((res) => {
		            if (!res.ok) {
		                return this.onError("fetch read error", res.status, res);
		            }
		            res.text().then((data) => this.onData(data));
		        })
		            .catch((err) => {
		            this.onError("fetch read error", err);
		        });
		    }
		    doWrite(data, callback) {
		        this._fetch(data)
		            .then((res) => {
		            if (!res.ok) {
		                return this.onError("fetch write error", res.status, res);
		            }
		            callback();
		        })
		            .catch((err) => {
		            this.onError("fetch write error", err);
		        });
		    }
		    _fetch(data) {
		        var _a;
		        const isPost = data !== undefined;
		        const headers = new Headers(this.opts.extraHeaders);
		        if (isPost) {
		            headers.set("content-type", "text/plain;charset=UTF-8");
		        }
		        (_a = this.socket._cookieJar) === null || _a === void 0 ? void 0 : _a.appendCookies(headers);
		        return fetch(this.uri(), {
		            method: isPost ? "POST" : "GET",
		            body: isPost ? data : null,
		            headers,
		            credentials: this.opts.withCredentials ? "include" : "omit",
		        }).then((res) => {
		            var _a;
		            // @ts-ignore getSetCookie() was added in Node.js v19.7.0
		            (_a = this.socket._cookieJar) === null || _a === void 0 ? void 0 : _a.parseCookies(res.headers.getSetCookie());
		            return res;
		        });
		    }
		}
		pollingFetch.Fetch = Fetch;
		return pollingFetch;
	}

	var hasRequiredCjs$2;

	function requireCjs$2 () {
		if (hasRequiredCjs$2) return cjs$3;
		hasRequiredCjs$2 = 1;
		(function (exports) {
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.WebTransport = exports.WebSocket = exports.NodeWebSocket = exports.XHR = exports.NodeXHR = exports.Fetch = exports.nextTick = exports.parse = exports.installTimerFunctions = exports.transports = exports.TransportError = exports.Transport = exports.protocol = exports.SocketWithUpgrade = exports.SocketWithoutUpgrade = exports.Socket = void 0;
			const socket_js_1 = requireSocket$1();
			Object.defineProperty(exports, "Socket", { enumerable: true, get: function () { return socket_js_1.Socket; } });
			var socket_js_2 = requireSocket$1();
			Object.defineProperty(exports, "SocketWithoutUpgrade", { enumerable: true, get: function () { return socket_js_2.SocketWithoutUpgrade; } });
			Object.defineProperty(exports, "SocketWithUpgrade", { enumerable: true, get: function () { return socket_js_2.SocketWithUpgrade; } });
			exports.protocol = socket_js_1.Socket.protocol;
			var transport_js_1 = requireTransport();
			Object.defineProperty(exports, "Transport", { enumerable: true, get: function () { return transport_js_1.Transport; } });
			Object.defineProperty(exports, "TransportError", { enumerable: true, get: function () { return transport_js_1.TransportError; } });
			var index_js_1 = requireTransports();
			Object.defineProperty(exports, "transports", { enumerable: true, get: function () { return index_js_1.transports; } });
			var util_js_1 = requireUtil();
			Object.defineProperty(exports, "installTimerFunctions", { enumerable: true, get: function () { return util_js_1.installTimerFunctions; } });
			var parseuri_js_1 = requireParseuri();
			Object.defineProperty(exports, "parse", { enumerable: true, get: function () { return parseuri_js_1.parse; } });
			var globals_node_js_1 = requireGlobals();
			Object.defineProperty(exports, "nextTick", { enumerable: true, get: function () { return globals_node_js_1.nextTick; } });
			var polling_fetch_js_1 = requirePollingFetch();
			Object.defineProperty(exports, "Fetch", { enumerable: true, get: function () { return polling_fetch_js_1.Fetch; } });
			var polling_xhr_node_js_1 = requirePollingXhr();
			Object.defineProperty(exports, "NodeXHR", { enumerable: true, get: function () { return polling_xhr_node_js_1.XHR; } });
			var polling_xhr_js_1 = requirePollingXhr();
			Object.defineProperty(exports, "XHR", { enumerable: true, get: function () { return polling_xhr_js_1.XHR; } });
			var websocket_node_js_1 = requireWebsocket();
			Object.defineProperty(exports, "NodeWebSocket", { enumerable: true, get: function () { return websocket_node_js_1.WS; } });
			var websocket_js_1 = requireWebsocket();
			Object.defineProperty(exports, "WebSocket", { enumerable: true, get: function () { return websocket_js_1.WS; } });
			var webtransport_js_1 = requireWebtransport();
			Object.defineProperty(exports, "WebTransport", { enumerable: true, get: function () { return webtransport_js_1.WT; } }); 
		} (cjs$3));
		return cjs$3;
	}

	var browser$1 = {exports: {}};

	var common$1;
	var hasRequiredCommon$1;

	function requireCommon$1 () {
		if (hasRequiredCommon$1) return common$1;
		hasRequiredCommon$1 = 1;
		/**
		 * This is the common logic for both the Node.js and web browser
		 * implementations of `debug()`.
		 */

		function setup(env) {
			createDebug.debug = createDebug;
			createDebug.default = createDebug;
			createDebug.coerce = coerce;
			createDebug.disable = disable;
			createDebug.enable = enable;
			createDebug.enabled = enabled;
			createDebug.humanize = requireMs();
			createDebug.destroy = destroy;

			Object.keys(env).forEach(key => {
				createDebug[key] = env[key];
			});

			/**
			* The currently active debug mode names, and names to skip.
			*/

			createDebug.names = [];
			createDebug.skips = [];

			/**
			* Map of special "%n" handling functions, for the debug "format" argument.
			*
			* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
			*/
			createDebug.formatters = {};

			/**
			* Selects a color for a debug namespace
			* @param {String} namespace The namespace string for the debug instance to be colored
			* @return {Number|String} An ANSI color code for the given namespace
			* @api private
			*/
			function selectColor(namespace) {
				let hash = 0;

				for (let i = 0; i < namespace.length; i++) {
					hash = ((hash << 5) - hash) + namespace.charCodeAt(i);
					hash |= 0; // Convert to 32bit integer
				}

				return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
			}
			createDebug.selectColor = selectColor;

			/**
			* Create a debugger with the given `namespace`.
			*
			* @param {String} namespace
			* @return {Function}
			* @api public
			*/
			function createDebug(namespace) {
				let prevTime;
				let enableOverride = null;
				let namespacesCache;
				let enabledCache;

				function debug(...args) {
					// Disabled?
					if (!debug.enabled) {
						return;
					}

					const self = debug;

					// Set `diff` timestamp
					const curr = Number(new Date());
					const ms = curr - (prevTime || curr);
					self.diff = ms;
					self.prev = prevTime;
					self.curr = curr;
					prevTime = curr;

					args[0] = createDebug.coerce(args[0]);

					if (typeof args[0] !== 'string') {
						// Anything else let's inspect with %O
						args.unshift('%O');
					}

					// Apply any `formatters` transformations
					let index = 0;
					args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
						// If we encounter an escaped % then don't increase the array index
						if (match === '%%') {
							return '%';
						}
						index++;
						const formatter = createDebug.formatters[format];
						if (typeof formatter === 'function') {
							const val = args[index];
							match = formatter.call(self, val);

							// Now we need to remove `args[index]` since it's inlined in the `format`
							args.splice(index, 1);
							index--;
						}
						return match;
					});

					// Apply env-specific formatting (colors, etc.)
					createDebug.formatArgs.call(self, args);

					const logFn = self.log || createDebug.log;
					logFn.apply(self, args);
				}

				debug.namespace = namespace;
				debug.useColors = createDebug.useColors();
				debug.color = createDebug.selectColor(namespace);
				debug.extend = extend;
				debug.destroy = createDebug.destroy; // XXX Temporary. Will be removed in the next major release.

				Object.defineProperty(debug, 'enabled', {
					enumerable: true,
					configurable: false,
					get: () => {
						if (enableOverride !== null) {
							return enableOverride;
						}
						if (namespacesCache !== createDebug.namespaces) {
							namespacesCache = createDebug.namespaces;
							enabledCache = createDebug.enabled(namespace);
						}

						return enabledCache;
					},
					set: v => {
						enableOverride = v;
					}
				});

				// Env-specific initialization logic for debug instances
				if (typeof createDebug.init === 'function') {
					createDebug.init(debug);
				}

				return debug;
			}

			function extend(namespace, delimiter) {
				const newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
				newDebug.log = this.log;
				return newDebug;
			}

			/**
			* Enables a debug mode by namespaces. This can include modes
			* separated by a colon and wildcards.
			*
			* @param {String} namespaces
			* @api public
			*/
			function enable(namespaces) {
				createDebug.save(namespaces);
				createDebug.namespaces = namespaces;

				createDebug.names = [];
				createDebug.skips = [];

				let i;
				const split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
				const len = split.length;

				for (i = 0; i < len; i++) {
					if (!split[i]) {
						// ignore empty strings
						continue;
					}

					namespaces = split[i].replace(/\*/g, '.*?');

					if (namespaces[0] === '-') {
						createDebug.skips.push(new RegExp('^' + namespaces.slice(1) + '$'));
					} else {
						createDebug.names.push(new RegExp('^' + namespaces + '$'));
					}
				}
			}

			/**
			* Disable debug output.
			*
			* @return {String} namespaces
			* @api public
			*/
			function disable() {
				const namespaces = [
					...createDebug.names.map(toNamespace),
					...createDebug.skips.map(toNamespace).map(namespace => '-' + namespace)
				].join(',');
				createDebug.enable('');
				return namespaces;
			}

			/**
			* Returns true if the given mode name is enabled, false otherwise.
			*
			* @param {String} name
			* @return {Boolean}
			* @api public
			*/
			function enabled(name) {
				if (name[name.length - 1] === '*') {
					return true;
				}

				let i;
				let len;

				for (i = 0, len = createDebug.skips.length; i < len; i++) {
					if (createDebug.skips[i].test(name)) {
						return false;
					}
				}

				for (i = 0, len = createDebug.names.length; i < len; i++) {
					if (createDebug.names[i].test(name)) {
						return true;
					}
				}

				return false;
			}

			/**
			* Convert regexp to namespace
			*
			* @param {RegExp} regxep
			* @return {String} namespace
			* @api private
			*/
			function toNamespace(regexp) {
				return regexp.toString()
					.substring(2, regexp.toString().length - 2)
					.replace(/\.\*\?$/, '*');
			}

			/**
			* Coerce `val`.
			*
			* @param {Mixed} val
			* @return {Mixed}
			* @api private
			*/
			function coerce(val) {
				if (val instanceof Error) {
					return val.stack || val.message;
				}
				return val;
			}

			/**
			* XXX DO NOT USE. This is a temporary stub function.
			* XXX It WILL be removed in the next major release.
			*/
			function destroy() {
				console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
			}

			createDebug.enable(createDebug.load());

			return createDebug;
		}

		common$1 = setup;
		return common$1;
	}

	/* eslint-env browser */

	var hasRequiredBrowser$1;

	function requireBrowser$1 () {
		if (hasRequiredBrowser$1) return browser$1.exports;
		hasRequiredBrowser$1 = 1;
		(function (module, exports) {
			/**
			 * This is the web browser implementation of `debug()`.
			 */

			exports.formatArgs = formatArgs;
			exports.save = save;
			exports.load = load;
			exports.useColors = useColors;
			exports.storage = localstorage();
			exports.destroy = (() => {
				let warned = false;

				return () => {
					if (!warned) {
						warned = true;
						console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
					}
				};
			})();

			/**
			 * Colors.
			 */

			exports.colors = [
				'#0000CC',
				'#0000FF',
				'#0033CC',
				'#0033FF',
				'#0066CC',
				'#0066FF',
				'#0099CC',
				'#0099FF',
				'#00CC00',
				'#00CC33',
				'#00CC66',
				'#00CC99',
				'#00CCCC',
				'#00CCFF',
				'#3300CC',
				'#3300FF',
				'#3333CC',
				'#3333FF',
				'#3366CC',
				'#3366FF',
				'#3399CC',
				'#3399FF',
				'#33CC00',
				'#33CC33',
				'#33CC66',
				'#33CC99',
				'#33CCCC',
				'#33CCFF',
				'#6600CC',
				'#6600FF',
				'#6633CC',
				'#6633FF',
				'#66CC00',
				'#66CC33',
				'#9900CC',
				'#9900FF',
				'#9933CC',
				'#9933FF',
				'#99CC00',
				'#99CC33',
				'#CC0000',
				'#CC0033',
				'#CC0066',
				'#CC0099',
				'#CC00CC',
				'#CC00FF',
				'#CC3300',
				'#CC3333',
				'#CC3366',
				'#CC3399',
				'#CC33CC',
				'#CC33FF',
				'#CC6600',
				'#CC6633',
				'#CC9900',
				'#CC9933',
				'#CCCC00',
				'#CCCC33',
				'#FF0000',
				'#FF0033',
				'#FF0066',
				'#FF0099',
				'#FF00CC',
				'#FF00FF',
				'#FF3300',
				'#FF3333',
				'#FF3366',
				'#FF3399',
				'#FF33CC',
				'#FF33FF',
				'#FF6600',
				'#FF6633',
				'#FF9900',
				'#FF9933',
				'#FFCC00',
				'#FFCC33'
			];

			/**
			 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
			 * and the Firebug extension (any Firefox version) are known
			 * to support "%c" CSS customizations.
			 *
			 * TODO: add a `localStorage` variable to explicitly enable/disable colors
			 */

			// eslint-disable-next-line complexity
			function useColors() {
				// NB: In an Electron preload script, document will be defined but not fully
				// initialized. Since we know we're in Chrome, we'll just detect this case
				// explicitly
				if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
					return true;
				}

				// Internet Explorer and Edge do not support colors.
				if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
					return false;
				}

				let m;

				// Is webkit? http://stackoverflow.com/a/16459606/376773
				// document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
				return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
					// Is firebug? http://stackoverflow.com/a/398120/376773
					(typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
					// Is firefox >= v31?
					// https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
					(typeof navigator !== 'undefined' && navigator.userAgent && (m = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(m[1], 10) >= 31) ||
					// Double check webkit in userAgent just in case we are in a worker
					(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
			}

			/**
			 * Colorize log arguments if enabled.
			 *
			 * @api public
			 */

			function formatArgs(args) {
				args[0] = (this.useColors ? '%c' : '') +
					this.namespace +
					(this.useColors ? ' %c' : ' ') +
					args[0] +
					(this.useColors ? '%c ' : ' ') +
					'+' + module.exports.humanize(this.diff);

				if (!this.useColors) {
					return;
				}

				const c = 'color: ' + this.color;
				args.splice(1, 0, c, 'color: inherit');

				// The final "%c" is somewhat tricky, because there could be other
				// arguments passed either before or after the %c, so we need to
				// figure out the correct index to insert the CSS into
				let index = 0;
				let lastC = 0;
				args[0].replace(/%[a-zA-Z%]/g, match => {
					if (match === '%%') {
						return;
					}
					index++;
					if (match === '%c') {
						// We only are interested in the *last* %c
						// (the user may have provided their own)
						lastC = index;
					}
				});

				args.splice(lastC, 0, c);
			}

			/**
			 * Invokes `console.debug()` when available.
			 * No-op when `console.debug` is not a "function".
			 * If `console.debug` is not available, falls back
			 * to `console.log`.
			 *
			 * @api public
			 */
			exports.log = console.debug || console.log || (() => {});

			/**
			 * Save `namespaces`.
			 *
			 * @param {String} namespaces
			 * @api private
			 */
			function save(namespaces) {
				try {
					if (namespaces) {
						exports.storage.setItem('debug', namespaces);
					} else {
						exports.storage.removeItem('debug');
					}
				} catch (error) {
					// Swallow
					// XXX (@Qix-) should we be logging these?
				}
			}

			/**
			 * Load `namespaces`.
			 *
			 * @return {String} returns the previously persisted debug modes
			 * @api private
			 */
			function load() {
				let r;
				try {
					r = exports.storage.getItem('debug');
				} catch (error) {
					// Swallow
					// XXX (@Qix-) should we be logging these?
				}

				// If debug isn't set in LS, and we're in Electron, try to load $DEBUG
				if (!r && typeof process !== 'undefined' && 'env' in process) {
					r = process.env.DEBUG;
				}

				return r;
			}

			/**
			 * Localstorage attempts to return the localstorage.
			 *
			 * This is necessary because safari throws
			 * when a user disables cookies/localstorage
			 * and you attempt to access it.
			 *
			 * @return {LocalStorage}
			 * @api private
			 */

			function localstorage() {
				try {
					// TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
					// The Browser also has localStorage in the global context.
					return localStorage;
				} catch (error) {
					// Swallow
					// XXX (@Qix-) should we be logging these?
				}
			}

			module.exports = requireCommon$1()(exports);

			const {formatters} = module.exports;

			/**
			 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
			 */

			formatters.j = function (v) {
				try {
					return JSON.stringify(v);
				} catch (error) {
					return '[UnexpectedJSONParseError]: ' + error.message;
				}
			}; 
		} (browser$1, browser$1.exports));
		return browser$1.exports;
	}

	var hasRequiredUrl;

	function requireUrl () {
		if (hasRequiredUrl) return url;
		hasRequiredUrl = 1;
		var __importDefault = (url && url.__importDefault) || function (mod) {
		    return (mod && mod.__esModule) ? mod : { "default": mod };
		};
		Object.defineProperty(url, "__esModule", { value: true });
		url.url = url$1;
		const engine_io_client_1 = requireCjs$2();
		const debug_1 = __importDefault(requireBrowser$1()); // debug()
		const debug = (0, debug_1.default)("socket.io-client:url"); // debug()
		/**
		 * URL parser.
		 *
		 * @param uri - url
		 * @param path - the request path of the connection
		 * @param loc - An object meant to mimic window.location.
		 *        Defaults to window.location.
		 * @public
		 */
		function url$1(uri, path = "", loc) {
		    let obj = uri;
		    // default to window.location
		    loc = loc || (typeof location !== "undefined" && location);
		    if (null == uri)
		        uri = loc.protocol + "//" + loc.host;
		    // relative path support
		    if (typeof uri === "string") {
		        if ("/" === uri.charAt(0)) {
		            if ("/" === uri.charAt(1)) {
		                uri = loc.protocol + uri;
		            }
		            else {
		                uri = loc.host + uri;
		            }
		        }
		        if (!/^(https?|wss?):\/\//.test(uri)) {
		            debug("protocol-less url %s", uri);
		            if ("undefined" !== typeof loc) {
		                uri = loc.protocol + "//" + uri;
		            }
		            else {
		                uri = "https://" + uri;
		            }
		        }
		        // parse
		        debug("parse %s", uri);
		        obj = (0, engine_io_client_1.parse)(uri);
		    }
		    // make sure we treat `localhost:80` and `localhost` equally
		    if (!obj.port) {
		        if (/^(http|ws)$/.test(obj.protocol)) {
		            obj.port = "80";
		        }
		        else if (/^(http|ws)s$/.test(obj.protocol)) {
		            obj.port = "443";
		        }
		    }
		    obj.path = obj.path || "/";
		    const ipv6 = obj.host.indexOf(":") !== -1;
		    const host = ipv6 ? "[" + obj.host + "]" : obj.host;
		    // define unique id
		    obj.id = obj.protocol + "://" + host + ":" + obj.port + path;
		    // define href
		    obj.href =
		        obj.protocol +
		            "://" +
		            host +
		            (loc && loc.port === obj.port ? "" : ":" + obj.port);
		    return obj;
		}
		return url;
	}

	var manager = {};

	var socket = {};

	var cjs$1 = {};

	var binary = {};

	var isBinary = {};

	var hasRequiredIsBinary;

	function requireIsBinary () {
		if (hasRequiredIsBinary) return isBinary;
		hasRequiredIsBinary = 1;
		Object.defineProperty(isBinary, "__esModule", { value: true });
		isBinary.hasBinary = isBinary.isBinary = void 0;
		const withNativeArrayBuffer = typeof ArrayBuffer === "function";
		const isView = (obj) => {
		    return typeof ArrayBuffer.isView === "function"
		        ? ArrayBuffer.isView(obj)
		        : obj.buffer instanceof ArrayBuffer;
		};
		const toString = Object.prototype.toString;
		const withNativeBlob = typeof Blob === "function" ||
		    (typeof Blob !== "undefined" &&
		        toString.call(Blob) === "[object BlobConstructor]");
		const withNativeFile = typeof File === "function" ||
		    (typeof File !== "undefined" &&
		        toString.call(File) === "[object FileConstructor]");
		/**
		 * Returns true if obj is a Buffer, an ArrayBuffer, a Blob or a File.
		 *
		 * @private
		 */
		function isBinary$1(obj) {
		    return ((withNativeArrayBuffer && (obj instanceof ArrayBuffer || isView(obj))) ||
		        (withNativeBlob && obj instanceof Blob) ||
		        (withNativeFile && obj instanceof File));
		}
		isBinary.isBinary = isBinary$1;
		function hasBinary(obj, toJSON) {
		    if (!obj || typeof obj !== "object") {
		        return false;
		    }
		    if (Array.isArray(obj)) {
		        for (let i = 0, l = obj.length; i < l; i++) {
		            if (hasBinary(obj[i])) {
		                return true;
		            }
		        }
		        return false;
		    }
		    if (isBinary$1(obj)) {
		        return true;
		    }
		    if (obj.toJSON &&
		        typeof obj.toJSON === "function" &&
		        arguments.length === 1) {
		        return hasBinary(obj.toJSON(), true);
		    }
		    for (const key in obj) {
		        if (Object.prototype.hasOwnProperty.call(obj, key) && hasBinary(obj[key])) {
		            return true;
		        }
		    }
		    return false;
		}
		isBinary.hasBinary = hasBinary;
		return isBinary;
	}

	var hasRequiredBinary;

	function requireBinary () {
		if (hasRequiredBinary) return binary;
		hasRequiredBinary = 1;
		Object.defineProperty(binary, "__esModule", { value: true });
		binary.reconstructPacket = binary.deconstructPacket = void 0;
		const is_binary_js_1 = requireIsBinary();
		/**
		 * Replaces every Buffer | ArrayBuffer | Blob | File in packet with a numbered placeholder.
		 *
		 * @param {Object} packet - socket.io event packet
		 * @return {Object} with deconstructed packet and list of buffers
		 * @public
		 */
		function deconstructPacket(packet) {
		    const buffers = [];
		    const packetData = packet.data;
		    const pack = packet;
		    pack.data = _deconstructPacket(packetData, buffers);
		    pack.attachments = buffers.length; // number of binary 'attachments'
		    return { packet: pack, buffers: buffers };
		}
		binary.deconstructPacket = deconstructPacket;
		function _deconstructPacket(data, buffers) {
		    if (!data)
		        return data;
		    if ((0, is_binary_js_1.isBinary)(data)) {
		        const placeholder = { _placeholder: true, num: buffers.length };
		        buffers.push(data);
		        return placeholder;
		    }
		    else if (Array.isArray(data)) {
		        const newData = new Array(data.length);
		        for (let i = 0; i < data.length; i++) {
		            newData[i] = _deconstructPacket(data[i], buffers);
		        }
		        return newData;
		    }
		    else if (typeof data === "object" && !(data instanceof Date)) {
		        const newData = {};
		        for (const key in data) {
		            if (Object.prototype.hasOwnProperty.call(data, key)) {
		                newData[key] = _deconstructPacket(data[key], buffers);
		            }
		        }
		        return newData;
		    }
		    return data;
		}
		/**
		 * Reconstructs a binary packet from its placeholder packet and buffers
		 *
		 * @param {Object} packet - event packet with placeholders
		 * @param {Array} buffers - binary buffers to put in placeholder positions
		 * @return {Object} reconstructed packet
		 * @public
		 */
		function reconstructPacket(packet, buffers) {
		    packet.data = _reconstructPacket(packet.data, buffers);
		    delete packet.attachments; // no longer useful
		    return packet;
		}
		binary.reconstructPacket = reconstructPacket;
		function _reconstructPacket(data, buffers) {
		    if (!data)
		        return data;
		    if (data && data._placeholder === true) {
		        const isIndexValid = typeof data.num === "number" &&
		            data.num >= 0 &&
		            data.num < buffers.length;
		        if (isIndexValid) {
		            return buffers[data.num]; // appropriate buffer (should be natural order anyway)
		        }
		        else {
		            throw new Error("illegal attachments");
		        }
		    }
		    else if (Array.isArray(data)) {
		        for (let i = 0; i < data.length; i++) {
		            data[i] = _reconstructPacket(data[i], buffers);
		        }
		    }
		    else if (typeof data === "object") {
		        for (const key in data) {
		            if (Object.prototype.hasOwnProperty.call(data, key)) {
		                data[key] = _reconstructPacket(data[key], buffers);
		            }
		        }
		    }
		    return data;
		}
		return binary;
	}

	var browser = {exports: {}};

	var common;
	var hasRequiredCommon;

	function requireCommon () {
		if (hasRequiredCommon) return common;
		hasRequiredCommon = 1;
		/**
		 * This is the common logic for both the Node.js and web browser
		 * implementations of `debug()`.
		 */

		function setup(env) {
			createDebug.debug = createDebug;
			createDebug.default = createDebug;
			createDebug.coerce = coerce;
			createDebug.disable = disable;
			createDebug.enable = enable;
			createDebug.enabled = enabled;
			createDebug.humanize = requireMs();
			createDebug.destroy = destroy;

			Object.keys(env).forEach(key => {
				createDebug[key] = env[key];
			});

			/**
			* The currently active debug mode names, and names to skip.
			*/

			createDebug.names = [];
			createDebug.skips = [];

			/**
			* Map of special "%n" handling functions, for the debug "format" argument.
			*
			* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
			*/
			createDebug.formatters = {};

			/**
			* Selects a color for a debug namespace
			* @param {String} namespace The namespace string for the debug instance to be colored
			* @return {Number|String} An ANSI color code for the given namespace
			* @api private
			*/
			function selectColor(namespace) {
				let hash = 0;

				for (let i = 0; i < namespace.length; i++) {
					hash = ((hash << 5) - hash) + namespace.charCodeAt(i);
					hash |= 0; // Convert to 32bit integer
				}

				return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
			}
			createDebug.selectColor = selectColor;

			/**
			* Create a debugger with the given `namespace`.
			*
			* @param {String} namespace
			* @return {Function}
			* @api public
			*/
			function createDebug(namespace) {
				let prevTime;
				let enableOverride = null;
				let namespacesCache;
				let enabledCache;

				function debug(...args) {
					// Disabled?
					if (!debug.enabled) {
						return;
					}

					const self = debug;

					// Set `diff` timestamp
					const curr = Number(new Date());
					const ms = curr - (prevTime || curr);
					self.diff = ms;
					self.prev = prevTime;
					self.curr = curr;
					prevTime = curr;

					args[0] = createDebug.coerce(args[0]);

					if (typeof args[0] !== 'string') {
						// Anything else let's inspect with %O
						args.unshift('%O');
					}

					// Apply any `formatters` transformations
					let index = 0;
					args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
						// If we encounter an escaped % then don't increase the array index
						if (match === '%%') {
							return '%';
						}
						index++;
						const formatter = createDebug.formatters[format];
						if (typeof formatter === 'function') {
							const val = args[index];
							match = formatter.call(self, val);

							// Now we need to remove `args[index]` since it's inlined in the `format`
							args.splice(index, 1);
							index--;
						}
						return match;
					});

					// Apply env-specific formatting (colors, etc.)
					createDebug.formatArgs.call(self, args);

					const logFn = self.log || createDebug.log;
					logFn.apply(self, args);
				}

				debug.namespace = namespace;
				debug.useColors = createDebug.useColors();
				debug.color = createDebug.selectColor(namespace);
				debug.extend = extend;
				debug.destroy = createDebug.destroy; // XXX Temporary. Will be removed in the next major release.

				Object.defineProperty(debug, 'enabled', {
					enumerable: true,
					configurable: false,
					get: () => {
						if (enableOverride !== null) {
							return enableOverride;
						}
						if (namespacesCache !== createDebug.namespaces) {
							namespacesCache = createDebug.namespaces;
							enabledCache = createDebug.enabled(namespace);
						}

						return enabledCache;
					},
					set: v => {
						enableOverride = v;
					}
				});

				// Env-specific initialization logic for debug instances
				if (typeof createDebug.init === 'function') {
					createDebug.init(debug);
				}

				return debug;
			}

			function extend(namespace, delimiter) {
				const newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
				newDebug.log = this.log;
				return newDebug;
			}

			/**
			* Enables a debug mode by namespaces. This can include modes
			* separated by a colon and wildcards.
			*
			* @param {String} namespaces
			* @api public
			*/
			function enable(namespaces) {
				createDebug.save(namespaces);
				createDebug.namespaces = namespaces;

				createDebug.names = [];
				createDebug.skips = [];

				let i;
				const split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
				const len = split.length;

				for (i = 0; i < len; i++) {
					if (!split[i]) {
						// ignore empty strings
						continue;
					}

					namespaces = split[i].replace(/\*/g, '.*?');

					if (namespaces[0] === '-') {
						createDebug.skips.push(new RegExp('^' + namespaces.slice(1) + '$'));
					} else {
						createDebug.names.push(new RegExp('^' + namespaces + '$'));
					}
				}
			}

			/**
			* Disable debug output.
			*
			* @return {String} namespaces
			* @api public
			*/
			function disable() {
				const namespaces = [
					...createDebug.names.map(toNamespace),
					...createDebug.skips.map(toNamespace).map(namespace => '-' + namespace)
				].join(',');
				createDebug.enable('');
				return namespaces;
			}

			/**
			* Returns true if the given mode name is enabled, false otherwise.
			*
			* @param {String} name
			* @return {Boolean}
			* @api public
			*/
			function enabled(name) {
				if (name[name.length - 1] === '*') {
					return true;
				}

				let i;
				let len;

				for (i = 0, len = createDebug.skips.length; i < len; i++) {
					if (createDebug.skips[i].test(name)) {
						return false;
					}
				}

				for (i = 0, len = createDebug.names.length; i < len; i++) {
					if (createDebug.names[i].test(name)) {
						return true;
					}
				}

				return false;
			}

			/**
			* Convert regexp to namespace
			*
			* @param {RegExp} regxep
			* @return {String} namespace
			* @api private
			*/
			function toNamespace(regexp) {
				return regexp.toString()
					.substring(2, regexp.toString().length - 2)
					.replace(/\.\*\?$/, '*');
			}

			/**
			* Coerce `val`.
			*
			* @param {Mixed} val
			* @return {Mixed}
			* @api private
			*/
			function coerce(val) {
				if (val instanceof Error) {
					return val.stack || val.message;
				}
				return val;
			}

			/**
			* XXX DO NOT USE. This is a temporary stub function.
			* XXX It WILL be removed in the next major release.
			*/
			function destroy() {
				console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
			}

			createDebug.enable(createDebug.load());

			return createDebug;
		}

		common = setup;
		return common;
	}

	/* eslint-env browser */

	var hasRequiredBrowser;

	function requireBrowser () {
		if (hasRequiredBrowser) return browser.exports;
		hasRequiredBrowser = 1;
		(function (module, exports) {
			/**
			 * This is the web browser implementation of `debug()`.
			 */

			exports.formatArgs = formatArgs;
			exports.save = save;
			exports.load = load;
			exports.useColors = useColors;
			exports.storage = localstorage();
			exports.destroy = (() => {
				let warned = false;

				return () => {
					if (!warned) {
						warned = true;
						console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
					}
				};
			})();

			/**
			 * Colors.
			 */

			exports.colors = [
				'#0000CC',
				'#0000FF',
				'#0033CC',
				'#0033FF',
				'#0066CC',
				'#0066FF',
				'#0099CC',
				'#0099FF',
				'#00CC00',
				'#00CC33',
				'#00CC66',
				'#00CC99',
				'#00CCCC',
				'#00CCFF',
				'#3300CC',
				'#3300FF',
				'#3333CC',
				'#3333FF',
				'#3366CC',
				'#3366FF',
				'#3399CC',
				'#3399FF',
				'#33CC00',
				'#33CC33',
				'#33CC66',
				'#33CC99',
				'#33CCCC',
				'#33CCFF',
				'#6600CC',
				'#6600FF',
				'#6633CC',
				'#6633FF',
				'#66CC00',
				'#66CC33',
				'#9900CC',
				'#9900FF',
				'#9933CC',
				'#9933FF',
				'#99CC00',
				'#99CC33',
				'#CC0000',
				'#CC0033',
				'#CC0066',
				'#CC0099',
				'#CC00CC',
				'#CC00FF',
				'#CC3300',
				'#CC3333',
				'#CC3366',
				'#CC3399',
				'#CC33CC',
				'#CC33FF',
				'#CC6600',
				'#CC6633',
				'#CC9900',
				'#CC9933',
				'#CCCC00',
				'#CCCC33',
				'#FF0000',
				'#FF0033',
				'#FF0066',
				'#FF0099',
				'#FF00CC',
				'#FF00FF',
				'#FF3300',
				'#FF3333',
				'#FF3366',
				'#FF3399',
				'#FF33CC',
				'#FF33FF',
				'#FF6600',
				'#FF6633',
				'#FF9900',
				'#FF9933',
				'#FFCC00',
				'#FFCC33'
			];

			/**
			 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
			 * and the Firebug extension (any Firefox version) are known
			 * to support "%c" CSS customizations.
			 *
			 * TODO: add a `localStorage` variable to explicitly enable/disable colors
			 */

			// eslint-disable-next-line complexity
			function useColors() {
				// NB: In an Electron preload script, document will be defined but not fully
				// initialized. Since we know we're in Chrome, we'll just detect this case
				// explicitly
				if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
					return true;
				}

				// Internet Explorer and Edge do not support colors.
				if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
					return false;
				}

				let m;

				// Is webkit? http://stackoverflow.com/a/16459606/376773
				// document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
				return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
					// Is firebug? http://stackoverflow.com/a/398120/376773
					(typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
					// Is firefox >= v31?
					// https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
					(typeof navigator !== 'undefined' && navigator.userAgent && (m = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(m[1], 10) >= 31) ||
					// Double check webkit in userAgent just in case we are in a worker
					(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
			}

			/**
			 * Colorize log arguments if enabled.
			 *
			 * @api public
			 */

			function formatArgs(args) {
				args[0] = (this.useColors ? '%c' : '') +
					this.namespace +
					(this.useColors ? ' %c' : ' ') +
					args[0] +
					(this.useColors ? '%c ' : ' ') +
					'+' + module.exports.humanize(this.diff);

				if (!this.useColors) {
					return;
				}

				const c = 'color: ' + this.color;
				args.splice(1, 0, c, 'color: inherit');

				// The final "%c" is somewhat tricky, because there could be other
				// arguments passed either before or after the %c, so we need to
				// figure out the correct index to insert the CSS into
				let index = 0;
				let lastC = 0;
				args[0].replace(/%[a-zA-Z%]/g, match => {
					if (match === '%%') {
						return;
					}
					index++;
					if (match === '%c') {
						// We only are interested in the *last* %c
						// (the user may have provided their own)
						lastC = index;
					}
				});

				args.splice(lastC, 0, c);
			}

			/**
			 * Invokes `console.debug()` when available.
			 * No-op when `console.debug` is not a "function".
			 * If `console.debug` is not available, falls back
			 * to `console.log`.
			 *
			 * @api public
			 */
			exports.log = console.debug || console.log || (() => {});

			/**
			 * Save `namespaces`.
			 *
			 * @param {String} namespaces
			 * @api private
			 */
			function save(namespaces) {
				try {
					if (namespaces) {
						exports.storage.setItem('debug', namespaces);
					} else {
						exports.storage.removeItem('debug');
					}
				} catch (error) {
					// Swallow
					// XXX (@Qix-) should we be logging these?
				}
			}

			/**
			 * Load `namespaces`.
			 *
			 * @return {String} returns the previously persisted debug modes
			 * @api private
			 */
			function load() {
				let r;
				try {
					r = exports.storage.getItem('debug');
				} catch (error) {
					// Swallow
					// XXX (@Qix-) should we be logging these?
				}

				// If debug isn't set in LS, and we're in Electron, try to load $DEBUG
				if (!r && typeof process !== 'undefined' && 'env' in process) {
					r = process.env.DEBUG;
				}

				return r;
			}

			/**
			 * Localstorage attempts to return the localstorage.
			 *
			 * This is necessary because safari throws
			 * when a user disables cookies/localstorage
			 * and you attempt to access it.
			 *
			 * @return {LocalStorage}
			 * @api private
			 */

			function localstorage() {
				try {
					// TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
					// The Browser also has localStorage in the global context.
					return localStorage;
				} catch (error) {
					// Swallow
					// XXX (@Qix-) should we be logging these?
				}
			}

			module.exports = requireCommon()(exports);

			const {formatters} = module.exports;

			/**
			 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
			 */

			formatters.j = function (v) {
				try {
					return JSON.stringify(v);
				} catch (error) {
					return '[UnexpectedJSONParseError]: ' + error.message;
				}
			}; 
		} (browser, browser.exports));
		return browser.exports;
	}

	var hasRequiredCjs$1;

	function requireCjs$1 () {
		if (hasRequiredCjs$1) return cjs$1;
		hasRequiredCjs$1 = 1;
		(function (exports) {
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.Decoder = exports.Encoder = exports.PacketType = exports.protocol = void 0;
			const component_emitter_1 = require$$5;
			const binary_js_1 = requireBinary();
			const is_binary_js_1 = requireIsBinary();
			const debug_1 = requireBrowser(); // debug()
			const debug = (0, debug_1.default)("socket.io-parser"); // debug()
			/**
			 * These strings must not be used as event names, as they have a special meaning.
			 */
			const RESERVED_EVENTS = [
			    "connect",
			    "connect_error",
			    "disconnect",
			    "disconnecting",
			    "newListener",
			    "removeListener", // used by the Node.js EventEmitter
			];
			/**
			 * Protocol version.
			 *
			 * @public
			 */
			exports.protocol = 5;
			var PacketType;
			(function (PacketType) {
			    PacketType[PacketType["CONNECT"] = 0] = "CONNECT";
			    PacketType[PacketType["DISCONNECT"] = 1] = "DISCONNECT";
			    PacketType[PacketType["EVENT"] = 2] = "EVENT";
			    PacketType[PacketType["ACK"] = 3] = "ACK";
			    PacketType[PacketType["CONNECT_ERROR"] = 4] = "CONNECT_ERROR";
			    PacketType[PacketType["BINARY_EVENT"] = 5] = "BINARY_EVENT";
			    PacketType[PacketType["BINARY_ACK"] = 6] = "BINARY_ACK";
			})(PacketType = exports.PacketType || (exports.PacketType = {}));
			/**
			 * A socket.io Encoder instance
			 */
			class Encoder {
			    /**
			     * Encoder constructor
			     *
			     * @param {function} replacer - custom replacer to pass down to JSON.parse
			     */
			    constructor(replacer) {
			        this.replacer = replacer;
			    }
			    /**
			     * Encode a packet as a single string if non-binary, or as a
			     * buffer sequence, depending on packet type.
			     *
			     * @param {Object} obj - packet object
			     */
			    encode(obj) {
			        debug("encoding packet %j", obj);
			        if (obj.type === PacketType.EVENT || obj.type === PacketType.ACK) {
			            if ((0, is_binary_js_1.hasBinary)(obj)) {
			                return this.encodeAsBinary({
			                    type: obj.type === PacketType.EVENT
			                        ? PacketType.BINARY_EVENT
			                        : PacketType.BINARY_ACK,
			                    nsp: obj.nsp,
			                    data: obj.data,
			                    id: obj.id,
			                });
			            }
			        }
			        return [this.encodeAsString(obj)];
			    }
			    /**
			     * Encode packet as string.
			     */
			    encodeAsString(obj) {
			        // first is type
			        let str = "" + obj.type;
			        // attachments if we have them
			        if (obj.type === PacketType.BINARY_EVENT ||
			            obj.type === PacketType.BINARY_ACK) {
			            str += obj.attachments + "-";
			        }
			        // if we have a namespace other than `/`
			        // we append it followed by a comma `,`
			        if (obj.nsp && "/" !== obj.nsp) {
			            str += obj.nsp + ",";
			        }
			        // immediately followed by the id
			        if (null != obj.id) {
			            str += obj.id;
			        }
			        // json data
			        if (null != obj.data) {
			            str += JSON.stringify(obj.data, this.replacer);
			        }
			        debug("encoded %j as %s", obj, str);
			        return str;
			    }
			    /**
			     * Encode packet as 'buffer sequence' by removing blobs, and
			     * deconstructing packet into object with placeholders and
			     * a list of buffers.
			     */
			    encodeAsBinary(obj) {
			        const deconstruction = (0, binary_js_1.deconstructPacket)(obj);
			        const pack = this.encodeAsString(deconstruction.packet);
			        const buffers = deconstruction.buffers;
			        buffers.unshift(pack); // add packet info to beginning of data list
			        return buffers; // write all the buffers
			    }
			}
			exports.Encoder = Encoder;
			// see https://stackoverflow.com/questions/8511281/check-if-a-value-is-an-object-in-javascript
			function isObject(value) {
			    return Object.prototype.toString.call(value) === "[object Object]";
			}
			/**
			 * A socket.io Decoder instance
			 *
			 * @return {Object} decoder
			 */
			class Decoder extends component_emitter_1.Emitter {
			    /**
			     * Decoder constructor
			     *
			     * @param {function} reviver - custom reviver to pass down to JSON.stringify
			     */
			    constructor(reviver) {
			        super();
			        this.reviver = reviver;
			    }
			    /**
			     * Decodes an encoded packet string into packet JSON.
			     *
			     * @param {String} obj - encoded packet
			     */
			    add(obj) {
			        let packet;
			        if (typeof obj === "string") {
			            if (this.reconstructor) {
			                throw new Error("got plaintext data when reconstructing a packet");
			            }
			            packet = this.decodeString(obj);
			            const isBinaryEvent = packet.type === PacketType.BINARY_EVENT;
			            if (isBinaryEvent || packet.type === PacketType.BINARY_ACK) {
			                packet.type = isBinaryEvent ? PacketType.EVENT : PacketType.ACK;
			                // binary packet's json
			                this.reconstructor = new BinaryReconstructor(packet);
			                // no attachments, labeled binary but no binary data to follow
			                if (packet.attachments === 0) {
			                    super.emitReserved("decoded", packet);
			                }
			            }
			            else {
			                // non-binary full packet
			                super.emitReserved("decoded", packet);
			            }
			        }
			        else if ((0, is_binary_js_1.isBinary)(obj) || obj.base64) {
			            // raw binary data
			            if (!this.reconstructor) {
			                throw new Error("got binary data when not reconstructing a packet");
			            }
			            else {
			                packet = this.reconstructor.takeBinaryData(obj);
			                if (packet) {
			                    // received final buffer
			                    this.reconstructor = null;
			                    super.emitReserved("decoded", packet);
			                }
			            }
			        }
			        else {
			            throw new Error("Unknown type: " + obj);
			        }
			    }
			    /**
			     * Decode a packet String (JSON data)
			     *
			     * @param {String} str
			     * @return {Object} packet
			     */
			    decodeString(str) {
			        let i = 0;
			        // look up type
			        const p = {
			            type: Number(str.charAt(0)),
			        };
			        if (PacketType[p.type] === undefined) {
			            throw new Error("unknown packet type " + p.type);
			        }
			        // look up attachments if type binary
			        if (p.type === PacketType.BINARY_EVENT ||
			            p.type === PacketType.BINARY_ACK) {
			            const start = i + 1;
			            while (str.charAt(++i) !== "-" && i != str.length) { }
			            const buf = str.substring(start, i);
			            if (buf != Number(buf) || str.charAt(i) !== "-") {
			                throw new Error("Illegal attachments");
			            }
			            p.attachments = Number(buf);
			        }
			        // look up namespace (if any)
			        if ("/" === str.charAt(i + 1)) {
			            const start = i + 1;
			            while (++i) {
			                const c = str.charAt(i);
			                if ("," === c)
			                    break;
			                if (i === str.length)
			                    break;
			            }
			            p.nsp = str.substring(start, i);
			        }
			        else {
			            p.nsp = "/";
			        }
			        // look up id
			        const next = str.charAt(i + 1);
			        if ("" !== next && Number(next) == next) {
			            const start = i + 1;
			            while (++i) {
			                const c = str.charAt(i);
			                if (null == c || Number(c) != c) {
			                    --i;
			                    break;
			                }
			                if (i === str.length)
			                    break;
			            }
			            p.id = Number(str.substring(start, i + 1));
			        }
			        // look up json data
			        if (str.charAt(++i)) {
			            const payload = this.tryParse(str.substr(i));
			            if (Decoder.isPayloadValid(p.type, payload)) {
			                p.data = payload;
			            }
			            else {
			                throw new Error("invalid payload");
			            }
			        }
			        debug("decoded %s as %j", str, p);
			        return p;
			    }
			    tryParse(str) {
			        try {
			            return JSON.parse(str, this.reviver);
			        }
			        catch (e) {
			            return false;
			        }
			    }
			    static isPayloadValid(type, payload) {
			        switch (type) {
			            case PacketType.CONNECT:
			                return isObject(payload);
			            case PacketType.DISCONNECT:
			                return payload === undefined;
			            case PacketType.CONNECT_ERROR:
			                return typeof payload === "string" || isObject(payload);
			            case PacketType.EVENT:
			            case PacketType.BINARY_EVENT:
			                return (Array.isArray(payload) &&
			                    (typeof payload[0] === "number" ||
			                        (typeof payload[0] === "string" &&
			                            RESERVED_EVENTS.indexOf(payload[0]) === -1)));
			            case PacketType.ACK:
			            case PacketType.BINARY_ACK:
			                return Array.isArray(payload);
			        }
			    }
			    /**
			     * Deallocates a parser's resources
			     */
			    destroy() {
			        if (this.reconstructor) {
			            this.reconstructor.finishedReconstruction();
			            this.reconstructor = null;
			        }
			    }
			}
			exports.Decoder = Decoder;
			/**
			 * A manager of a binary event's 'buffer sequence'. Should
			 * be constructed whenever a packet of type BINARY_EVENT is
			 * decoded.
			 *
			 * @param {Object} packet
			 * @return {BinaryReconstructor} initialized reconstructor
			 */
			class BinaryReconstructor {
			    constructor(packet) {
			        this.packet = packet;
			        this.buffers = [];
			        this.reconPack = packet;
			    }
			    /**
			     * Method to be called when binary data received from connection
			     * after a BINARY_EVENT packet.
			     *
			     * @param {Buffer | ArrayBuffer} binData - the raw binary data received
			     * @return {null | Object} returns null if more binary data is expected or
			     *   a reconstructed packet object if all buffers have been received.
			     */
			    takeBinaryData(binData) {
			        this.buffers.push(binData);
			        if (this.buffers.length === this.reconPack.attachments) {
			            // done with buffer list
			            const packet = (0, binary_js_1.reconstructPacket)(this.reconPack, this.buffers);
			            this.finishedReconstruction();
			            return packet;
			        }
			        return null;
			    }
			    /**
			     * Cleans up binary packet reconstruction variables.
			     */
			    finishedReconstruction() {
			        this.reconPack = null;
			        this.buffers = [];
			    }
			} 
		} (cjs$1));
		return cjs$1;
	}

	var on = {};

	var hasRequiredOn;

	function requireOn () {
		if (hasRequiredOn) return on;
		hasRequiredOn = 1;
		Object.defineProperty(on, "__esModule", { value: true });
		on.on = on$1;
		function on$1(obj, ev, fn) {
		    obj.on(ev, fn);
		    return function subDestroy() {
		        obj.off(ev, fn);
		    };
		}
		return on;
	}

	var hasRequiredSocket;

	function requireSocket () {
		if (hasRequiredSocket) return socket;
		hasRequiredSocket = 1;
		var __importDefault = (socket && socket.__importDefault) || function (mod) {
		    return (mod && mod.__esModule) ? mod : { "default": mod };
		};
		Object.defineProperty(socket, "__esModule", { value: true });
		socket.Socket = void 0;
		const socket_io_parser_1 = requireCjs$1();
		const on_js_1 = requireOn();
		const component_emitter_1 = require$$5;
		const debug_1 = __importDefault(requireBrowser$1()); // debug()
		const debug = (0, debug_1.default)("socket.io-client:socket"); // debug()
		/**
		 * Internal events.
		 * These events can't be emitted by the user.
		 */
		const RESERVED_EVENTS = Object.freeze({
		    connect: 1,
		    connect_error: 1,
		    disconnect: 1,
		    disconnecting: 1,
		    // EventEmitter reserved events: https://nodejs.org/api/events.html#events_event_newlistener
		    newListener: 1,
		    removeListener: 1,
		});
		/**
		 * A Socket is the fundamental class for interacting with the server.
		 *
		 * A Socket belongs to a certain Namespace (by default /) and uses an underlying {@link Manager} to communicate.
		 *
		 * @example
		 * const socket = io();
		 *
		 * socket.on("connect", () => {
		 *   console.log("connected");
		 * });
		 *
		 * // send an event to the server
		 * socket.emit("foo", "bar");
		 *
		 * socket.on("foobar", () => {
		 *   // an event was received from the server
		 * });
		 *
		 * // upon disconnection
		 * socket.on("disconnect", (reason) => {
		 *   console.log(`disconnected due to ${reason}`);
		 * });
		 */
		class Socket extends component_emitter_1.Emitter {
		    /**
		     * `Socket` constructor.
		     */
		    constructor(io, nsp, opts) {
		        super();
		        /**
		         * Whether the socket is currently connected to the server.
		         *
		         * @example
		         * const socket = io();
		         *
		         * socket.on("connect", () => {
		         *   console.log(socket.connected); // true
		         * });
		         *
		         * socket.on("disconnect", () => {
		         *   console.log(socket.connected); // false
		         * });
		         */
		        this.connected = false;
		        /**
		         * Whether the connection state was recovered after a temporary disconnection. In that case, any missed packets will
		         * be transmitted by the server.
		         */
		        this.recovered = false;
		        /**
		         * Buffer for packets received before the CONNECT packet
		         */
		        this.receiveBuffer = [];
		        /**
		         * Buffer for packets that will be sent once the socket is connected
		         */
		        this.sendBuffer = [];
		        /**
		         * The queue of packets to be sent with retry in case of failure.
		         *
		         * Packets are sent one by one, each waiting for the server acknowledgement, in order to guarantee the delivery order.
		         * @private
		         */
		        this._queue = [];
		        /**
		         * A sequence to generate the ID of the {@link QueuedPacket}.
		         * @private
		         */
		        this._queueSeq = 0;
		        this.ids = 0;
		        /**
		         * A map containing acknowledgement handlers.
		         *
		         * The `withError` attribute is used to differentiate handlers that accept an error as first argument:
		         *
		         * - `socket.emit("test", (err, value) => { ... })` with `ackTimeout` option
		         * - `socket.timeout(5000).emit("test", (err, value) => { ... })`
		         * - `const value = await socket.emitWithAck("test")`
		         *
		         * From those that don't:
		         *
		         * - `socket.emit("test", (value) => { ... });`
		         *
		         * In the first case, the handlers will be called with an error when:
		         *
		         * - the timeout is reached
		         * - the socket gets disconnected
		         *
		         * In the second case, the handlers will be simply discarded upon disconnection, since the client will never receive
		         * an acknowledgement from the server.
		         *
		         * @private
		         */
		        this.acks = {};
		        this.flags = {};
		        this.io = io;
		        this.nsp = nsp;
		        if (opts && opts.auth) {
		            this.auth = opts.auth;
		        }
		        this._opts = Object.assign({}, opts);
		        if (this.io._autoConnect)
		            this.open();
		    }
		    /**
		     * Whether the socket is currently disconnected
		     *
		     * @example
		     * const socket = io();
		     *
		     * socket.on("connect", () => {
		     *   console.log(socket.disconnected); // false
		     * });
		     *
		     * socket.on("disconnect", () => {
		     *   console.log(socket.disconnected); // true
		     * });
		     */
		    get disconnected() {
		        return !this.connected;
		    }
		    /**
		     * Subscribe to open, close and packet events
		     *
		     * @private
		     */
		    subEvents() {
		        if (this.subs)
		            return;
		        const io = this.io;
		        this.subs = [
		            (0, on_js_1.on)(io, "open", this.onopen.bind(this)),
		            (0, on_js_1.on)(io, "packet", this.onpacket.bind(this)),
		            (0, on_js_1.on)(io, "error", this.onerror.bind(this)),
		            (0, on_js_1.on)(io, "close", this.onclose.bind(this)),
		        ];
		    }
		    /**
		     * Whether the Socket will try to reconnect when its Manager connects or reconnects.
		     *
		     * @example
		     * const socket = io();
		     *
		     * console.log(socket.active); // true
		     *
		     * socket.on("disconnect", (reason) => {
		     *   if (reason === "io server disconnect") {
		     *     // the disconnection was initiated by the server, you need to manually reconnect
		     *     console.log(socket.active); // false
		     *   }
		     *   // else the socket will automatically try to reconnect
		     *   console.log(socket.active); // true
		     * });
		     */
		    get active() {
		        return !!this.subs;
		    }
		    /**
		     * "Opens" the socket.
		     *
		     * @example
		     * const socket = io({
		     *   autoConnect: false
		     * });
		     *
		     * socket.connect();
		     */
		    connect() {
		        if (this.connected)
		            return this;
		        this.subEvents();
		        if (!this.io["_reconnecting"])
		            this.io.open(); // ensure open
		        if ("open" === this.io._readyState)
		            this.onopen();
		        return this;
		    }
		    /**
		     * Alias for {@link connect()}.
		     */
		    open() {
		        return this.connect();
		    }
		    /**
		     * Sends a `message` event.
		     *
		     * This method mimics the WebSocket.send() method.
		     *
		     * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send
		     *
		     * @example
		     * socket.send("hello");
		     *
		     * // this is equivalent to
		     * socket.emit("message", "hello");
		     *
		     * @return self
		     */
		    send(...args) {
		        args.unshift("message");
		        this.emit.apply(this, args);
		        return this;
		    }
		    /**
		     * Override `emit`.
		     * If the event is in `events`, it's emitted normally.
		     *
		     * @example
		     * socket.emit("hello", "world");
		     *
		     * // all serializable datastructures are supported (no need to call JSON.stringify)
		     * socket.emit("hello", 1, "2", { 3: ["4"], 5: Uint8Array.from([6]) });
		     *
		     * // with an acknowledgement from the server
		     * socket.emit("hello", "world", (val) => {
		     *   // ...
		     * });
		     *
		     * @return self
		     */
		    emit(ev, ...args) {
		        var _a, _b, _c;
		        if (RESERVED_EVENTS.hasOwnProperty(ev)) {
		            throw new Error('"' + ev.toString() + '" is a reserved event name');
		        }
		        args.unshift(ev);
		        if (this._opts.retries && !this.flags.fromQueue && !this.flags.volatile) {
		            this._addToQueue(args);
		            return this;
		        }
		        const packet = {
		            type: socket_io_parser_1.PacketType.EVENT,
		            data: args,
		        };
		        packet.options = {};
		        packet.options.compress = this.flags.compress !== false;
		        // event ack callback
		        if ("function" === typeof args[args.length - 1]) {
		            const id = this.ids++;
		            debug("emitting packet with ack id %d", id);
		            const ack = args.pop();
		            this._registerAckCallback(id, ack);
		            packet.id = id;
		        }
		        const isTransportWritable = (_b = (_a = this.io.engine) === null || _a === void 0 ? void 0 : _a.transport) === null || _b === void 0 ? void 0 : _b.writable;
		        const isConnected = this.connected && !((_c = this.io.engine) === null || _c === void 0 ? void 0 : _c._hasPingExpired());
		        const discardPacket = this.flags.volatile && !isTransportWritable;
		        if (discardPacket) {
		            debug("discard packet as the transport is not currently writable");
		        }
		        else if (isConnected) {
		            this.notifyOutgoingListeners(packet);
		            this.packet(packet);
		        }
		        else {
		            this.sendBuffer.push(packet);
		        }
		        this.flags = {};
		        return this;
		    }
		    /**
		     * @private
		     */
		    _registerAckCallback(id, ack) {
		        var _a;
		        const timeout = (_a = this.flags.timeout) !== null && _a !== void 0 ? _a : this._opts.ackTimeout;
		        if (timeout === undefined) {
		            this.acks[id] = ack;
		            return;
		        }
		        // @ts-ignore
		        const timer = this.io.setTimeoutFn(() => {
		            delete this.acks[id];
		            for (let i = 0; i < this.sendBuffer.length; i++) {
		                if (this.sendBuffer[i].id === id) {
		                    debug("removing packet with ack id %d from the buffer", id);
		                    this.sendBuffer.splice(i, 1);
		                }
		            }
		            debug("event with ack id %d has timed out after %d ms", id, timeout);
		            ack.call(this, new Error("operation has timed out"));
		        }, timeout);
		        const fn = (...args) => {
		            // @ts-ignore
		            this.io.clearTimeoutFn(timer);
		            ack.apply(this, args);
		        };
		        fn.withError = true;
		        this.acks[id] = fn;
		    }
		    /**
		     * Emits an event and waits for an acknowledgement
		     *
		     * @example
		     * // without timeout
		     * const response = await socket.emitWithAck("hello", "world");
		     *
		     * // with a specific timeout
		     * try {
		     *   const response = await socket.timeout(1000).emitWithAck("hello", "world");
		     * } catch (err) {
		     *   // the server did not acknowledge the event in the given delay
		     * }
		     *
		     * @return a Promise that will be fulfilled when the server acknowledges the event
		     */
		    emitWithAck(ev, ...args) {
		        return new Promise((resolve, reject) => {
		            const fn = (arg1, arg2) => {
		                return arg1 ? reject(arg1) : resolve(arg2);
		            };
		            fn.withError = true;
		            args.push(fn);
		            this.emit(ev, ...args);
		        });
		    }
		    /**
		     * Add the packet to the queue.
		     * @param args
		     * @private
		     */
		    _addToQueue(args) {
		        let ack;
		        if (typeof args[args.length - 1] === "function") {
		            ack = args.pop();
		        }
		        const packet = {
		            id: this._queueSeq++,
		            tryCount: 0,
		            pending: false,
		            args,
		            flags: Object.assign({ fromQueue: true }, this.flags),
		        };
		        args.push((err, ...responseArgs) => {
		            if (packet !== this._queue[0]) {
		                // the packet has already been acknowledged
		                return;
		            }
		            const hasError = err !== null;
		            if (hasError) {
		                if (packet.tryCount > this._opts.retries) {
		                    debug("packet [%d] is discarded after %d tries", packet.id, packet.tryCount);
		                    this._queue.shift();
		                    if (ack) {
		                        ack(err);
		                    }
		                }
		            }
		            else {
		                debug("packet [%d] was successfully sent", packet.id);
		                this._queue.shift();
		                if (ack) {
		                    ack(null, ...responseArgs);
		                }
		            }
		            packet.pending = false;
		            return this._drainQueue();
		        });
		        this._queue.push(packet);
		        this._drainQueue();
		    }
		    /**
		     * Send the first packet of the queue, and wait for an acknowledgement from the server.
		     * @param force - whether to resend a packet that has not been acknowledged yet
		     *
		     * @private
		     */
		    _drainQueue(force = false) {
		        debug("draining queue");
		        if (!this.connected || this._queue.length === 0) {
		            return;
		        }
		        const packet = this._queue[0];
		        if (packet.pending && !force) {
		            debug("packet [%d] has already been sent and is waiting for an ack", packet.id);
		            return;
		        }
		        packet.pending = true;
		        packet.tryCount++;
		        debug("sending packet [%d] (try n°%d)", packet.id, packet.tryCount);
		        this.flags = packet.flags;
		        this.emit.apply(this, packet.args);
		    }
		    /**
		     * Sends a packet.
		     *
		     * @param packet
		     * @private
		     */
		    packet(packet) {
		        packet.nsp = this.nsp;
		        this.io._packet(packet);
		    }
		    /**
		     * Called upon engine `open`.
		     *
		     * @private
		     */
		    onopen() {
		        debug("transport is open - connecting");
		        if (typeof this.auth == "function") {
		            this.auth((data) => {
		                this._sendConnectPacket(data);
		            });
		        }
		        else {
		            this._sendConnectPacket(this.auth);
		        }
		    }
		    /**
		     * Sends a CONNECT packet to initiate the Socket.IO session.
		     *
		     * @param data
		     * @private
		     */
		    _sendConnectPacket(data) {
		        this.packet({
		            type: socket_io_parser_1.PacketType.CONNECT,
		            data: this._pid
		                ? Object.assign({ pid: this._pid, offset: this._lastOffset }, data)
		                : data,
		        });
		    }
		    /**
		     * Called upon engine or manager `error`.
		     *
		     * @param err
		     * @private
		     */
		    onerror(err) {
		        if (!this.connected) {
		            this.emitReserved("connect_error", err);
		        }
		    }
		    /**
		     * Called upon engine `close`.
		     *
		     * @param reason
		     * @param description
		     * @private
		     */
		    onclose(reason, description) {
		        debug("close (%s)", reason);
		        this.connected = false;
		        delete this.id;
		        this.emitReserved("disconnect", reason, description);
		        this._clearAcks();
		    }
		    /**
		     * Clears the acknowledgement handlers upon disconnection, since the client will never receive an acknowledgement from
		     * the server.
		     *
		     * @private
		     */
		    _clearAcks() {
		        Object.keys(this.acks).forEach((id) => {
		            const isBuffered = this.sendBuffer.some((packet) => String(packet.id) === id);
		            if (!isBuffered) {
		                // note: handlers that do not accept an error as first argument are ignored here
		                const ack = this.acks[id];
		                delete this.acks[id];
		                if (ack.withError) {
		                    ack.call(this, new Error("socket has been disconnected"));
		                }
		            }
		        });
		    }
		    /**
		     * Called with socket packet.
		     *
		     * @param packet
		     * @private
		     */
		    onpacket(packet) {
		        const sameNamespace = packet.nsp === this.nsp;
		        if (!sameNamespace)
		            return;
		        switch (packet.type) {
		            case socket_io_parser_1.PacketType.CONNECT:
		                if (packet.data && packet.data.sid) {
		                    this.onconnect(packet.data.sid, packet.data.pid);
		                }
		                else {
		                    this.emitReserved("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
		                }
		                break;
		            case socket_io_parser_1.PacketType.EVENT:
		            case socket_io_parser_1.PacketType.BINARY_EVENT:
		                this.onevent(packet);
		                break;
		            case socket_io_parser_1.PacketType.ACK:
		            case socket_io_parser_1.PacketType.BINARY_ACK:
		                this.onack(packet);
		                break;
		            case socket_io_parser_1.PacketType.DISCONNECT:
		                this.ondisconnect();
		                break;
		            case socket_io_parser_1.PacketType.CONNECT_ERROR:
		                this.destroy();
		                const err = new Error(packet.data.message);
		                // @ts-ignore
		                err.data = packet.data.data;
		                this.emitReserved("connect_error", err);
		                break;
		        }
		    }
		    /**
		     * Called upon a server event.
		     *
		     * @param packet
		     * @private
		     */
		    onevent(packet) {
		        const args = packet.data || [];
		        debug("emitting event %j", args);
		        if (null != packet.id) {
		            debug("attaching ack callback to event");
		            args.push(this.ack(packet.id));
		        }
		        if (this.connected) {
		            this.emitEvent(args);
		        }
		        else {
		            this.receiveBuffer.push(Object.freeze(args));
		        }
		    }
		    emitEvent(args) {
		        if (this._anyListeners && this._anyListeners.length) {
		            const listeners = this._anyListeners.slice();
		            for (const listener of listeners) {
		                listener.apply(this, args);
		            }
		        }
		        super.emit.apply(this, args);
		        if (this._pid && args.length && typeof args[args.length - 1] === "string") {
		            this._lastOffset = args[args.length - 1];
		        }
		    }
		    /**
		     * Produces an ack callback to emit with an event.
		     *
		     * @private
		     */
		    ack(id) {
		        const self = this;
		        let sent = false;
		        return function (...args) {
		            // prevent double callbacks
		            if (sent)
		                return;
		            sent = true;
		            debug("sending ack %j", args);
		            self.packet({
		                type: socket_io_parser_1.PacketType.ACK,
		                id: id,
		                data: args,
		            });
		        };
		    }
		    /**
		     * Called upon a server acknowledgement.
		     *
		     * @param packet
		     * @private
		     */
		    onack(packet) {
		        const ack = this.acks[packet.id];
		        if (typeof ack !== "function") {
		            debug("bad ack %s", packet.id);
		            return;
		        }
		        delete this.acks[packet.id];
		        debug("calling ack %s with %j", packet.id, packet.data);
		        // @ts-ignore FIXME ack is incorrectly inferred as 'never'
		        if (ack.withError) {
		            packet.data.unshift(null);
		        }
		        // @ts-ignore
		        ack.apply(this, packet.data);
		    }
		    /**
		     * Called upon server connect.
		     *
		     * @private
		     */
		    onconnect(id, pid) {
		        debug("socket connected with id %s", id);
		        this.id = id;
		        this.recovered = pid && this._pid === pid;
		        this._pid = pid; // defined only if connection state recovery is enabled
		        this.connected = true;
		        this.emitBuffered();
		        this.emitReserved("connect");
		        this._drainQueue(true);
		    }
		    /**
		     * Emit buffered events (received and emitted).
		     *
		     * @private
		     */
		    emitBuffered() {
		        this.receiveBuffer.forEach((args) => this.emitEvent(args));
		        this.receiveBuffer = [];
		        this.sendBuffer.forEach((packet) => {
		            this.notifyOutgoingListeners(packet);
		            this.packet(packet);
		        });
		        this.sendBuffer = [];
		    }
		    /**
		     * Called upon server disconnect.
		     *
		     * @private
		     */
		    ondisconnect() {
		        debug("server disconnect (%s)", this.nsp);
		        this.destroy();
		        this.onclose("io server disconnect");
		    }
		    /**
		     * Called upon forced client/server side disconnections,
		     * this method ensures the manager stops tracking us and
		     * that reconnections don't get triggered for this.
		     *
		     * @private
		     */
		    destroy() {
		        if (this.subs) {
		            // clean subscriptions to avoid reconnections
		            this.subs.forEach((subDestroy) => subDestroy());
		            this.subs = undefined;
		        }
		        this.io["_destroy"](this);
		    }
		    /**
		     * Disconnects the socket manually. In that case, the socket will not try to reconnect.
		     *
		     * If this is the last active Socket instance of the {@link Manager}, the low-level connection will be closed.
		     *
		     * @example
		     * const socket = io();
		     *
		     * socket.on("disconnect", (reason) => {
		     *   // console.log(reason); prints "io client disconnect"
		     * });
		     *
		     * socket.disconnect();
		     *
		     * @return self
		     */
		    disconnect() {
		        if (this.connected) {
		            debug("performing disconnect (%s)", this.nsp);
		            this.packet({ type: socket_io_parser_1.PacketType.DISCONNECT });
		        }
		        // remove socket from pool
		        this.destroy();
		        if (this.connected) {
		            // fire events
		            this.onclose("io client disconnect");
		        }
		        return this;
		    }
		    /**
		     * Alias for {@link disconnect()}.
		     *
		     * @return self
		     */
		    close() {
		        return this.disconnect();
		    }
		    /**
		     * Sets the compress flag.
		     *
		     * @example
		     * socket.compress(false).emit("hello");
		     *
		     * @param compress - if `true`, compresses the sending data
		     * @return self
		     */
		    compress(compress) {
		        this.flags.compress = compress;
		        return this;
		    }
		    /**
		     * Sets a modifier for a subsequent event emission that the event message will be dropped when this socket is not
		     * ready to send messages.
		     *
		     * @example
		     * socket.volatile.emit("hello"); // the server may or may not receive it
		     *
		     * @returns self
		     */
		    get volatile() {
		        this.flags.volatile = true;
		        return this;
		    }
		    /**
		     * Sets a modifier for a subsequent event emission that the callback will be called with an error when the
		     * given number of milliseconds have elapsed without an acknowledgement from the server:
		     *
		     * @example
		     * socket.timeout(5000).emit("my-event", (err) => {
		     *   if (err) {
		     *     // the server did not acknowledge the event in the given delay
		     *   }
		     * });
		     *
		     * @returns self
		     */
		    timeout(timeout) {
		        this.flags.timeout = timeout;
		        return this;
		    }
		    /**
		     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
		     * callback.
		     *
		     * @example
		     * socket.onAny((event, ...args) => {
		     *   console.log(`got ${event}`);
		     * });
		     *
		     * @param listener
		     */
		    onAny(listener) {
		        this._anyListeners = this._anyListeners || [];
		        this._anyListeners.push(listener);
		        return this;
		    }
		    /**
		     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
		     * callback. The listener is added to the beginning of the listeners array.
		     *
		     * @example
		     * socket.prependAny((event, ...args) => {
		     *   console.log(`got event ${event}`);
		     * });
		     *
		     * @param listener
		     */
		    prependAny(listener) {
		        this._anyListeners = this._anyListeners || [];
		        this._anyListeners.unshift(listener);
		        return this;
		    }
		    /**
		     * Removes the listener that will be fired when any event is emitted.
		     *
		     * @example
		     * const catchAllListener = (event, ...args) => {
		     *   console.log(`got event ${event}`);
		     * }
		     *
		     * socket.onAny(catchAllListener);
		     *
		     * // remove a specific listener
		     * socket.offAny(catchAllListener);
		     *
		     * // or remove all listeners
		     * socket.offAny();
		     *
		     * @param listener
		     */
		    offAny(listener) {
		        if (!this._anyListeners) {
		            return this;
		        }
		        if (listener) {
		            const listeners = this._anyListeners;
		            for (let i = 0; i < listeners.length; i++) {
		                if (listener === listeners[i]) {
		                    listeners.splice(i, 1);
		                    return this;
		                }
		            }
		        }
		        else {
		            this._anyListeners = [];
		        }
		        return this;
		    }
		    /**
		     * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
		     * e.g. to remove listeners.
		     */
		    listenersAny() {
		        return this._anyListeners || [];
		    }
		    /**
		     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
		     * callback.
		     *
		     * Note: acknowledgements sent to the server are not included.
		     *
		     * @example
		     * socket.onAnyOutgoing((event, ...args) => {
		     *   console.log(`sent event ${event}`);
		     * });
		     *
		     * @param listener
		     */
		    onAnyOutgoing(listener) {
		        this._anyOutgoingListeners = this._anyOutgoingListeners || [];
		        this._anyOutgoingListeners.push(listener);
		        return this;
		    }
		    /**
		     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
		     * callback. The listener is added to the beginning of the listeners array.
		     *
		     * Note: acknowledgements sent to the server are not included.
		     *
		     * @example
		     * socket.prependAnyOutgoing((event, ...args) => {
		     *   console.log(`sent event ${event}`);
		     * });
		     *
		     * @param listener
		     */
		    prependAnyOutgoing(listener) {
		        this._anyOutgoingListeners = this._anyOutgoingListeners || [];
		        this._anyOutgoingListeners.unshift(listener);
		        return this;
		    }
		    /**
		     * Removes the listener that will be fired when any event is emitted.
		     *
		     * @example
		     * const catchAllListener = (event, ...args) => {
		     *   console.log(`sent event ${event}`);
		     * }
		     *
		     * socket.onAnyOutgoing(catchAllListener);
		     *
		     * // remove a specific listener
		     * socket.offAnyOutgoing(catchAllListener);
		     *
		     * // or remove all listeners
		     * socket.offAnyOutgoing();
		     *
		     * @param [listener] - the catch-all listener (optional)
		     */
		    offAnyOutgoing(listener) {
		        if (!this._anyOutgoingListeners) {
		            return this;
		        }
		        if (listener) {
		            const listeners = this._anyOutgoingListeners;
		            for (let i = 0; i < listeners.length; i++) {
		                if (listener === listeners[i]) {
		                    listeners.splice(i, 1);
		                    return this;
		                }
		            }
		        }
		        else {
		            this._anyOutgoingListeners = [];
		        }
		        return this;
		    }
		    /**
		     * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
		     * e.g. to remove listeners.
		     */
		    listenersAnyOutgoing() {
		        return this._anyOutgoingListeners || [];
		    }
		    /**
		     * Notify the listeners for each packet sent
		     *
		     * @param packet
		     *
		     * @private
		     */
		    notifyOutgoingListeners(packet) {
		        if (this._anyOutgoingListeners && this._anyOutgoingListeners.length) {
		            const listeners = this._anyOutgoingListeners.slice();
		            for (const listener of listeners) {
		                listener.apply(this, packet.data);
		            }
		        }
		    }
		}
		socket.Socket = Socket;
		return socket;
	}

	var backo2 = {};

	var hasRequiredBacko2;

	function requireBacko2 () {
		if (hasRequiredBacko2) return backo2;
		hasRequiredBacko2 = 1;
		/**
		 * Initialize backoff timer with `opts`.
		 *
		 * - `min` initial timeout in milliseconds [100]
		 * - `max` max timeout [10000]
		 * - `jitter` [0]
		 * - `factor` [2]
		 *
		 * @param {Object} opts
		 * @api public
		 */
		Object.defineProperty(backo2, "__esModule", { value: true });
		backo2.Backoff = Backoff;
		function Backoff(opts) {
		    opts = opts || {};
		    this.ms = opts.min || 100;
		    this.max = opts.max || 10000;
		    this.factor = opts.factor || 2;
		    this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
		    this.attempts = 0;
		}
		/**
		 * Return the backoff duration.
		 *
		 * @return {Number}
		 * @api public
		 */
		Backoff.prototype.duration = function () {
		    var ms = this.ms * Math.pow(this.factor, this.attempts++);
		    if (this.jitter) {
		        var rand = Math.random();
		        var deviation = Math.floor(rand * this.jitter * ms);
		        ms = (Math.floor(rand * 10) & 1) == 0 ? ms - deviation : ms + deviation;
		    }
		    return Math.min(ms, this.max) | 0;
		};
		/**
		 * Reset the number of attempts.
		 *
		 * @api public
		 */
		Backoff.prototype.reset = function () {
		    this.attempts = 0;
		};
		/**
		 * Set the minimum duration
		 *
		 * @api public
		 */
		Backoff.prototype.setMin = function (min) {
		    this.ms = min;
		};
		/**
		 * Set the maximum duration
		 *
		 * @api public
		 */
		Backoff.prototype.setMax = function (max) {
		    this.max = max;
		};
		/**
		 * Set the jitter
		 *
		 * @api public
		 */
		Backoff.prototype.setJitter = function (jitter) {
		    this.jitter = jitter;
		};
		return backo2;
	}

	var hasRequiredManager;

	function requireManager () {
		if (hasRequiredManager) return manager;
		hasRequiredManager = 1;
		var __createBinding = (manager && manager.__createBinding) || (Object.create ? (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    var desc = Object.getOwnPropertyDescriptor(m, k);
		    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
		      desc = { enumerable: true, get: function() { return m[k]; } };
		    }
		    Object.defineProperty(o, k2, desc);
		}) : (function(o, m, k, k2) {
		    if (k2 === undefined) k2 = k;
		    o[k2] = m[k];
		}));
		var __setModuleDefault = (manager && manager.__setModuleDefault) || (Object.create ? (function(o, v) {
		    Object.defineProperty(o, "default", { enumerable: true, value: v });
		}) : function(o, v) {
		    o["default"] = v;
		});
		var __importStar = (manager && manager.__importStar) || function (mod) {
		    if (mod && mod.__esModule) return mod;
		    var result = {};
		    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		    __setModuleDefault(result, mod);
		    return result;
		};
		var __importDefault = (manager && manager.__importDefault) || function (mod) {
		    return (mod && mod.__esModule) ? mod : { "default": mod };
		};
		Object.defineProperty(manager, "__esModule", { value: true });
		manager.Manager = void 0;
		const engine_io_client_1 = requireCjs$2();
		const socket_js_1 = requireSocket();
		const parser = __importStar(requireCjs$1());
		const on_js_1 = requireOn();
		const backo2_js_1 = requireBacko2();
		const component_emitter_1 = require$$5;
		const debug_1 = __importDefault(requireBrowser$1()); // debug()
		const debug = (0, debug_1.default)("socket.io-client:manager"); // debug()
		class Manager extends component_emitter_1.Emitter {
		    constructor(uri, opts) {
		        var _a;
		        super();
		        this.nsps = {};
		        this.subs = [];
		        if (uri && "object" === typeof uri) {
		            opts = uri;
		            uri = undefined;
		        }
		        opts = opts || {};
		        opts.path = opts.path || "/socket.io";
		        this.opts = opts;
		        (0, engine_io_client_1.installTimerFunctions)(this, opts);
		        this.reconnection(opts.reconnection !== false);
		        this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
		        this.reconnectionDelay(opts.reconnectionDelay || 1000);
		        this.reconnectionDelayMax(opts.reconnectionDelayMax || 5000);
		        this.randomizationFactor((_a = opts.randomizationFactor) !== null && _a !== void 0 ? _a : 0.5);
		        this.backoff = new backo2_js_1.Backoff({
		            min: this.reconnectionDelay(),
		            max: this.reconnectionDelayMax(),
		            jitter: this.randomizationFactor(),
		        });
		        this.timeout(null == opts.timeout ? 20000 : opts.timeout);
		        this._readyState = "closed";
		        this.uri = uri;
		        const _parser = opts.parser || parser;
		        this.encoder = new _parser.Encoder();
		        this.decoder = new _parser.Decoder();
		        this._autoConnect = opts.autoConnect !== false;
		        if (this._autoConnect)
		            this.open();
		    }
		    reconnection(v) {
		        if (!arguments.length)
		            return this._reconnection;
		        this._reconnection = !!v;
		        if (!v) {
		            this.skipReconnect = true;
		        }
		        return this;
		    }
		    reconnectionAttempts(v) {
		        if (v === undefined)
		            return this._reconnectionAttempts;
		        this._reconnectionAttempts = v;
		        return this;
		    }
		    reconnectionDelay(v) {
		        var _a;
		        if (v === undefined)
		            return this._reconnectionDelay;
		        this._reconnectionDelay = v;
		        (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMin(v);
		        return this;
		    }
		    randomizationFactor(v) {
		        var _a;
		        if (v === undefined)
		            return this._randomizationFactor;
		        this._randomizationFactor = v;
		        (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setJitter(v);
		        return this;
		    }
		    reconnectionDelayMax(v) {
		        var _a;
		        if (v === undefined)
		            return this._reconnectionDelayMax;
		        this._reconnectionDelayMax = v;
		        (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMax(v);
		        return this;
		    }
		    timeout(v) {
		        if (!arguments.length)
		            return this._timeout;
		        this._timeout = v;
		        return this;
		    }
		    /**
		     * Starts trying to reconnect if reconnection is enabled and we have not
		     * started reconnecting yet
		     *
		     * @private
		     */
		    maybeReconnectOnOpen() {
		        // Only try to reconnect if it's the first time we're connecting
		        if (!this._reconnecting &&
		            this._reconnection &&
		            this.backoff.attempts === 0) {
		            // keeps reconnection from firing twice for the same reconnection loop
		            this.reconnect();
		        }
		    }
		    /**
		     * Sets the current transport `socket`.
		     *
		     * @param {Function} fn - optional, callback
		     * @return self
		     * @public
		     */
		    open(fn) {
		        debug("readyState %s", this._readyState);
		        if (~this._readyState.indexOf("open"))
		            return this;
		        debug("opening %s", this.uri);
		        this.engine = new engine_io_client_1.Socket(this.uri, this.opts);
		        const socket = this.engine;
		        const self = this;
		        this._readyState = "opening";
		        this.skipReconnect = false;
		        // emit `open`
		        const openSubDestroy = (0, on_js_1.on)(socket, "open", function () {
		            self.onopen();
		            fn && fn();
		        });
		        const onError = (err) => {
		            debug("error");
		            this.cleanup();
		            this._readyState = "closed";
		            this.emitReserved("error", err);
		            if (fn) {
		                fn(err);
		            }
		            else {
		                // Only do this if there is no fn to handle the error
		                this.maybeReconnectOnOpen();
		            }
		        };
		        // emit `error`
		        const errorSub = (0, on_js_1.on)(socket, "error", onError);
		        if (false !== this._timeout) {
		            const timeout = this._timeout;
		            debug("connect attempt will timeout after %d", timeout);
		            // set timer
		            const timer = this.setTimeoutFn(() => {
		                debug("connect attempt timed out after %d", timeout);
		                openSubDestroy();
		                onError(new Error("timeout"));
		                socket.close();
		            }, timeout);
		            if (this.opts.autoUnref) {
		                timer.unref();
		            }
		            this.subs.push(() => {
		                this.clearTimeoutFn(timer);
		            });
		        }
		        this.subs.push(openSubDestroy);
		        this.subs.push(errorSub);
		        return this;
		    }
		    /**
		     * Alias for open()
		     *
		     * @return self
		     * @public
		     */
		    connect(fn) {
		        return this.open(fn);
		    }
		    /**
		     * Called upon transport open.
		     *
		     * @private
		     */
		    onopen() {
		        debug("open");
		        // clear old subs
		        this.cleanup();
		        // mark as open
		        this._readyState = "open";
		        this.emitReserved("open");
		        // add new subs
		        const socket = this.engine;
		        this.subs.push((0, on_js_1.on)(socket, "ping", this.onping.bind(this)), (0, on_js_1.on)(socket, "data", this.ondata.bind(this)), (0, on_js_1.on)(socket, "error", this.onerror.bind(this)), (0, on_js_1.on)(socket, "close", this.onclose.bind(this)), 
		        // @ts-ignore
		        (0, on_js_1.on)(this.decoder, "decoded", this.ondecoded.bind(this)));
		    }
		    /**
		     * Called upon a ping.
		     *
		     * @private
		     */
		    onping() {
		        this.emitReserved("ping");
		    }
		    /**
		     * Called with data.
		     *
		     * @private
		     */
		    ondata(data) {
		        try {
		            this.decoder.add(data);
		        }
		        catch (e) {
		            this.onclose("parse error", e);
		        }
		    }
		    /**
		     * Called when parser fully decodes a packet.
		     *
		     * @private
		     */
		    ondecoded(packet) {
		        // the nextTick call prevents an exception in a user-provided event listener from triggering a disconnection due to a "parse error"
		        (0, engine_io_client_1.nextTick)(() => {
		            this.emitReserved("packet", packet);
		        }, this.setTimeoutFn);
		    }
		    /**
		     * Called upon socket error.
		     *
		     * @private
		     */
		    onerror(err) {
		        debug("error", err);
		        this.emitReserved("error", err);
		    }
		    /**
		     * Creates a new socket for the given `nsp`.
		     *
		     * @return {Socket}
		     * @public
		     */
		    socket(nsp, opts) {
		        let socket = this.nsps[nsp];
		        if (!socket) {
		            socket = new socket_js_1.Socket(this, nsp, opts);
		            this.nsps[nsp] = socket;
		        }
		        else if (this._autoConnect && !socket.active) {
		            socket.connect();
		        }
		        return socket;
		    }
		    /**
		     * Called upon a socket close.
		     *
		     * @param socket
		     * @private
		     */
		    _destroy(socket) {
		        const nsps = Object.keys(this.nsps);
		        for (const nsp of nsps) {
		            const socket = this.nsps[nsp];
		            if (socket.active) {
		                debug("socket %s is still active, skipping close", nsp);
		                return;
		            }
		        }
		        this._close();
		    }
		    /**
		     * Writes a packet.
		     *
		     * @param packet
		     * @private
		     */
		    _packet(packet) {
		        debug("writing packet %j", packet);
		        const encodedPackets = this.encoder.encode(packet);
		        for (let i = 0; i < encodedPackets.length; i++) {
		            this.engine.write(encodedPackets[i], packet.options);
		        }
		    }
		    /**
		     * Clean up transport subscriptions and packet buffer.
		     *
		     * @private
		     */
		    cleanup() {
		        debug("cleanup");
		        this.subs.forEach((subDestroy) => subDestroy());
		        this.subs.length = 0;
		        this.decoder.destroy();
		    }
		    /**
		     * Close the current socket.
		     *
		     * @private
		     */
		    _close() {
		        debug("disconnect");
		        this.skipReconnect = true;
		        this._reconnecting = false;
		        this.onclose("forced close");
		    }
		    /**
		     * Alias for close()
		     *
		     * @private
		     */
		    disconnect() {
		        return this._close();
		    }
		    /**
		     * Called when:
		     *
		     * - the low-level engine is closed
		     * - the parser encountered a badly formatted packet
		     * - all sockets are disconnected
		     *
		     * @private
		     */
		    onclose(reason, description) {
		        var _a;
		        debug("closed due to %s", reason);
		        this.cleanup();
		        (_a = this.engine) === null || _a === void 0 ? void 0 : _a.close();
		        this.backoff.reset();
		        this._readyState = "closed";
		        this.emitReserved("close", reason, description);
		        if (this._reconnection && !this.skipReconnect) {
		            this.reconnect();
		        }
		    }
		    /**
		     * Attempt a reconnection.
		     *
		     * @private
		     */
		    reconnect() {
		        if (this._reconnecting || this.skipReconnect)
		            return this;
		        const self = this;
		        if (this.backoff.attempts >= this._reconnectionAttempts) {
		            debug("reconnect failed");
		            this.backoff.reset();
		            this.emitReserved("reconnect_failed");
		            this._reconnecting = false;
		        }
		        else {
		            const delay = this.backoff.duration();
		            debug("will wait %dms before reconnect attempt", delay);
		            this._reconnecting = true;
		            const timer = this.setTimeoutFn(() => {
		                if (self.skipReconnect)
		                    return;
		                debug("attempting reconnect");
		                this.emitReserved("reconnect_attempt", self.backoff.attempts);
		                // check again for the case socket closed in above events
		                if (self.skipReconnect)
		                    return;
		                self.open((err) => {
		                    if (err) {
		                        debug("reconnect attempt error");
		                        self._reconnecting = false;
		                        self.reconnect();
		                        this.emitReserved("reconnect_error", err);
		                    }
		                    else {
		                        debug("reconnect success");
		                        self.onreconnect();
		                    }
		                });
		            }, delay);
		            if (this.opts.autoUnref) {
		                timer.unref();
		            }
		            this.subs.push(() => {
		                this.clearTimeoutFn(timer);
		            });
		        }
		    }
		    /**
		     * Called upon successful reconnect.
		     *
		     * @private
		     */
		    onreconnect() {
		        const attempt = this.backoff.attempts;
		        this._reconnecting = false;
		        this.backoff.reset();
		        this.emitReserved("reconnect", attempt);
		    }
		}
		manager.Manager = Manager;
		return manager;
	}

	var cjs = cjs$4.exports;

	var hasRequiredCjs;

	function requireCjs () {
		if (hasRequiredCjs) return cjs$4.exports;
		hasRequiredCjs = 1;
		(function (module, exports) {
			var __importDefault = (cjs && cjs.__importDefault) || function (mod) {
			    return (mod && mod.__esModule) ? mod : { "default": mod };
			};
			Object.defineProperty(exports, "__esModule", { value: true });
			exports.WebTransport = exports.WebSocket = exports.NodeWebSocket = exports.XHR = exports.NodeXHR = exports.Fetch = exports.Socket = exports.Manager = exports.protocol = void 0;
			exports.io = lookup;
			exports.connect = lookup;
			exports.default = lookup;
			const url_js_1 = requireUrl();
			const manager_js_1 = requireManager();
			Object.defineProperty(exports, "Manager", { enumerable: true, get: function () { return manager_js_1.Manager; } });
			const socket_js_1 = requireSocket();
			Object.defineProperty(exports, "Socket", { enumerable: true, get: function () { return socket_js_1.Socket; } });
			const debug_1 = __importDefault(requireBrowser$1()); // debug()
			const debug = (0, debug_1.default)("socket.io-client"); // debug()
			/**
			 * Managers cache.
			 */
			const cache = {};
			function lookup(uri, opts) {
			    if (typeof uri === "object") {
			        opts = uri;
			        uri = undefined;
			    }
			    opts = opts || {};
			    const parsed = (0, url_js_1.url)(uri, opts.path || "/socket.io");
			    const source = parsed.source;
			    const id = parsed.id;
			    const path = parsed.path;
			    const sameNamespace = cache[id] && path in cache[id]["nsps"];
			    const newConnection = opts.forceNew ||
			        opts["force new connection"] ||
			        false === opts.multiplex ||
			        sameNamespace;
			    let io;
			    if (newConnection) {
			        debug("ignoring socket cache for %s", source);
			        io = new manager_js_1.Manager(source, opts);
			    }
			    else {
			        if (!cache[id]) {
			            debug("new io instance for %s", source);
			            cache[id] = new manager_js_1.Manager(source, opts);
			        }
			        io = cache[id];
			    }
			    if (parsed.query && !opts.query) {
			        opts.query = parsed.queryKey;
			    }
			    return io.socket(parsed.path, opts);
			}
			// so that "lookup" can be used both as a function (e.g. `io(...)`) and as a
			// namespace (e.g. `io.connect(...)`), for backward compatibility
			Object.assign(lookup, {
			    Manager: manager_js_1.Manager,
			    Socket: socket_js_1.Socket,
			    io: lookup,
			    connect: lookup,
			});
			/**
			 * Protocol version.
			 *
			 * @public
			 */
			var socket_io_parser_1 = requireCjs$1();
			Object.defineProperty(exports, "protocol", { enumerable: true, get: function () { return socket_io_parser_1.protocol; } });
			var engine_io_client_1 = requireCjs$2();
			Object.defineProperty(exports, "Fetch", { enumerable: true, get: function () { return engine_io_client_1.Fetch; } });
			Object.defineProperty(exports, "NodeXHR", { enumerable: true, get: function () { return engine_io_client_1.NodeXHR; } });
			Object.defineProperty(exports, "XHR", { enumerable: true, get: function () { return engine_io_client_1.XHR; } });
			Object.defineProperty(exports, "NodeWebSocket", { enumerable: true, get: function () { return engine_io_client_1.NodeWebSocket; } });
			Object.defineProperty(exports, "WebSocket", { enumerable: true, get: function () { return engine_io_client_1.WebSocket; } });
			Object.defineProperty(exports, "WebTransport", { enumerable: true, get: function () { return engine_io_client_1.WebTransport; } });

			module.exports = lookup; 
		} (cjs$4, cjs$4.exports));
		return cjs$4.exports;
	}

	var hasRequiredMain;

	function requireMain () {
		if (hasRequiredMain) return main$1;
		hasRequiredMain = 1;
		const io = requireCjs();

		async function main() {
		    const socket = io();

		    window.chatSocket = socket;

		    socket.on("connect", () => {
		        console.log("Connected with ID:", socket.id);
		        const event = new CustomEvent('chatReady', { detail: { socket } });
		        window.dispatchEvent(event);
		    });

		    socket.on("disconnect", () => {
		        console.log(socket.id); // undefined
		    });
		}

		window.addEventListener("load", () => {
		    main();
		});
		return main$1;
	}

	var mainExports = requireMain();
	var main = /*@__PURE__*/getDefaultExportFromCjs(mainExports);

	return main;

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyIuLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLXBhcnNlci9idWlsZC9janMvY29tbW9ucy5qcyIsIi4uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tcGFyc2VyL2J1aWxkL2Nqcy9lbmNvZGVQYWNrZXQuYnJvd3Nlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tcGFyc2VyL2J1aWxkL2Nqcy9jb250cmliL2Jhc2U2NC1hcnJheWJ1ZmZlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tcGFyc2VyL2J1aWxkL2Nqcy9kZWNvZGVQYWNrZXQuYnJvd3Nlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tcGFyc2VyL2J1aWxkL2Nqcy9pbmRleC5qcyIsIi4uL25vZGVfbW9kdWxlcy9Ac29ja2V0LmlvL2NvbXBvbmVudC1lbWl0dGVyL2xpYi9lc20vaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9idWlsZC9janMvZ2xvYmFscy5qcyIsIi4uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2J1aWxkL2Nqcy91dGlsLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvYnVpbGQvY2pzL2NvbnRyaWIvcGFyc2Vxcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9tcy9pbmRleC5qcyIsIi4uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L25vZGVfbW9kdWxlcy9kZWJ1Zy9zcmMvY29tbW9uLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvbm9kZV9tb2R1bGVzL2RlYnVnL3NyYy9icm93c2VyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvYnVpbGQvY2pzL3RyYW5zcG9ydC5qcyIsIi4uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2J1aWxkL2Nqcy90cmFuc3BvcnRzL3BvbGxpbmcuanMiLCIuLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9idWlsZC9janMvY29udHJpYi9oYXMtY29ycy5qcyIsIi4uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2J1aWxkL2Nqcy90cmFuc3BvcnRzL3BvbGxpbmcteGhyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvYnVpbGQvY2pzL3RyYW5zcG9ydHMvd2Vic29ja2V0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvYnVpbGQvY2pzL3RyYW5zcG9ydHMvd2VidHJhbnNwb3J0LmpzIiwiLi4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvYnVpbGQvY2pzL3RyYW5zcG9ydHMvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9idWlsZC9janMvY29udHJpYi9wYXJzZXVyaS5qcyIsIi4uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2J1aWxkL2Nqcy9zb2NrZXQuanMiLCIuLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9idWlsZC9janMvdHJhbnNwb3J0cy9wb2xsaW5nLWZldGNoLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvYnVpbGQvY2pzL2luZGV4LmpzIiwiLi4vbm9kZV9tb2R1bGVzL3NvY2tldC5pby1jbGllbnQvbm9kZV9tb2R1bGVzL2RlYnVnL3NyYy9jb21tb24uanMiLCIuLi9ub2RlX21vZHVsZXMvc29ja2V0LmlvLWNsaWVudC9ub2RlX21vZHVsZXMvZGVidWcvc3JjL2Jyb3dzZXIuanMiLCIuLi9ub2RlX21vZHVsZXMvc29ja2V0LmlvLWNsaWVudC9idWlsZC9janMvdXJsLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3NvY2tldC5pby1wYXJzZXIvYnVpbGQvY2pzL2lzLWJpbmFyeS5qcyIsIi4uL25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tcGFyc2VyL2J1aWxkL2Nqcy9iaW5hcnkuanMiLCIuLi9ub2RlX21vZHVsZXMvc29ja2V0LmlvLXBhcnNlci9ub2RlX21vZHVsZXMvZGVidWcvc3JjL2NvbW1vbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tcGFyc2VyL25vZGVfbW9kdWxlcy9kZWJ1Zy9zcmMvYnJvd3Nlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tcGFyc2VyL2J1aWxkL2Nqcy9pbmRleC5qcyIsIi4uL25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tY2xpZW50L2J1aWxkL2Nqcy9vbi5qcyIsIi4uL25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tY2xpZW50L2J1aWxkL2Nqcy9zb2NrZXQuanMiLCIuLi9ub2RlX21vZHVsZXMvc29ja2V0LmlvLWNsaWVudC9idWlsZC9janMvY29udHJpYi9iYWNrbzIuanMiLCIuLi9ub2RlX21vZHVsZXMvc29ja2V0LmlvLWNsaWVudC9idWlsZC9janMvbWFuYWdlci5qcyIsIi4uL25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tY2xpZW50L2J1aWxkL2Nqcy9pbmRleC5qcyIsIi4uL3NyYy9jbGllbnQvbWFpbi5qcyIsIi4uL3NyYy9jbGllbnQvbWFpbi5qcz9jb21tb25qcy1lbnRyeSJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuRVJST1JfUEFDS0VUID0gZXhwb3J0cy5QQUNLRVRfVFlQRVNfUkVWRVJTRSA9IGV4cG9ydHMuUEFDS0VUX1RZUEVTID0gdm9pZCAwO1xuY29uc3QgUEFDS0VUX1RZUEVTID0gT2JqZWN0LmNyZWF0ZShudWxsKTsgLy8gbm8gTWFwID0gbm8gcG9seWZpbGxcbmV4cG9ydHMuUEFDS0VUX1RZUEVTID0gUEFDS0VUX1RZUEVTO1xuUEFDS0VUX1RZUEVTW1wib3BlblwiXSA9IFwiMFwiO1xuUEFDS0VUX1RZUEVTW1wiY2xvc2VcIl0gPSBcIjFcIjtcblBBQ0tFVF9UWVBFU1tcInBpbmdcIl0gPSBcIjJcIjtcblBBQ0tFVF9UWVBFU1tcInBvbmdcIl0gPSBcIjNcIjtcblBBQ0tFVF9UWVBFU1tcIm1lc3NhZ2VcIl0gPSBcIjRcIjtcblBBQ0tFVF9UWVBFU1tcInVwZ3JhZGVcIl0gPSBcIjVcIjtcblBBQ0tFVF9UWVBFU1tcIm5vb3BcIl0gPSBcIjZcIjtcbmNvbnN0IFBBQ0tFVF9UWVBFU19SRVZFUlNFID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbmV4cG9ydHMuUEFDS0VUX1RZUEVTX1JFVkVSU0UgPSBQQUNLRVRfVFlQRVNfUkVWRVJTRTtcbk9iamVjdC5rZXlzKFBBQ0tFVF9UWVBFUykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgUEFDS0VUX1RZUEVTX1JFVkVSU0VbUEFDS0VUX1RZUEVTW2tleV1dID0ga2V5O1xufSk7XG5jb25zdCBFUlJPUl9QQUNLRVQgPSB7IHR5cGU6IFwiZXJyb3JcIiwgZGF0YTogXCJwYXJzZXIgZXJyb3JcIiB9O1xuZXhwb3J0cy5FUlJPUl9QQUNLRVQgPSBFUlJPUl9QQUNLRVQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZW5jb2RlUGFja2V0ID0gdm9pZCAwO1xuZXhwb3J0cy5lbmNvZGVQYWNrZXRUb0JpbmFyeSA9IGVuY29kZVBhY2tldFRvQmluYXJ5O1xuY29uc3QgY29tbW9uc19qc18xID0gcmVxdWlyZShcIi4vY29tbW9ucy5qc1wiKTtcbmNvbnN0IHdpdGhOYXRpdmVCbG9iID0gdHlwZW9mIEJsb2IgPT09IFwiZnVuY3Rpb25cIiB8fFxuICAgICh0eXBlb2YgQmxvYiAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgICAgICBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoQmxvYikgPT09IFwiW29iamVjdCBCbG9iQ29uc3RydWN0b3JdXCIpO1xuY29uc3Qgd2l0aE5hdGl2ZUFycmF5QnVmZmVyID0gdHlwZW9mIEFycmF5QnVmZmVyID09PSBcImZ1bmN0aW9uXCI7XG4vLyBBcnJheUJ1ZmZlci5pc1ZpZXcgbWV0aG9kIGlzIG5vdCBkZWZpbmVkIGluIElFMTBcbmNvbnN0IGlzVmlldyA9IChvYmopID0+IHtcbiAgICByZXR1cm4gdHlwZW9mIEFycmF5QnVmZmVyLmlzVmlldyA9PT0gXCJmdW5jdGlvblwiXG4gICAgICAgID8gQXJyYXlCdWZmZXIuaXNWaWV3KG9iailcbiAgICAgICAgOiBvYmogJiYgb2JqLmJ1ZmZlciBpbnN0YW5jZW9mIEFycmF5QnVmZmVyO1xufTtcbmNvbnN0IGVuY29kZVBhY2tldCA9ICh7IHR5cGUsIGRhdGEgfSwgc3VwcG9ydHNCaW5hcnksIGNhbGxiYWNrKSA9PiB7XG4gICAgaWYgKHdpdGhOYXRpdmVCbG9iICYmIGRhdGEgaW5zdGFuY2VvZiBCbG9iKSB7XG4gICAgICAgIGlmIChzdXBwb3J0c0JpbmFyeSkge1xuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGVuY29kZUJsb2JBc0Jhc2U2NChkYXRhLCBjYWxsYmFjayk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAod2l0aE5hdGl2ZUFycmF5QnVmZmVyICYmXG4gICAgICAgIChkYXRhIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIgfHwgaXNWaWV3KGRhdGEpKSkge1xuICAgICAgICBpZiAoc3VwcG9ydHNCaW5hcnkpIHtcbiAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhkYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBlbmNvZGVCbG9iQXNCYXNlNjQobmV3IEJsb2IoW2RhdGFdKSwgY2FsbGJhY2spO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIHBsYWluIHN0cmluZ1xuICAgIHJldHVybiBjYWxsYmFjayhjb21tb25zX2pzXzEuUEFDS0VUX1RZUEVTW3R5cGVdICsgKGRhdGEgfHwgXCJcIikpO1xufTtcbmV4cG9ydHMuZW5jb2RlUGFja2V0ID0gZW5jb2RlUGFja2V0O1xuY29uc3QgZW5jb2RlQmxvYkFzQmFzZTY0ID0gKGRhdGEsIGNhbGxiYWNrKSA9PiB7XG4gICAgY29uc3QgZmlsZVJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgZmlsZVJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0IGNvbnRlbnQgPSBmaWxlUmVhZGVyLnJlc3VsdC5zcGxpdChcIixcIilbMV07XG4gICAgICAgIGNhbGxiYWNrKFwiYlwiICsgKGNvbnRlbnQgfHwgXCJcIikpO1xuICAgIH07XG4gICAgcmV0dXJuIGZpbGVSZWFkZXIucmVhZEFzRGF0YVVSTChkYXRhKTtcbn07XG5mdW5jdGlvbiB0b0FycmF5KGRhdGEpIHtcbiAgICBpZiAoZGF0YSBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkpIHtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICAgIGVsc2UgaWYgKGRhdGEgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikge1xuICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoZGF0YSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoZGF0YS5idWZmZXIsIGRhdGEuYnl0ZU9mZnNldCwgZGF0YS5ieXRlTGVuZ3RoKTtcbiAgICB9XG59XG5sZXQgVEVYVF9FTkNPREVSO1xuZnVuY3Rpb24gZW5jb2RlUGFja2V0VG9CaW5hcnkocGFja2V0LCBjYWxsYmFjaykge1xuICAgIGlmICh3aXRoTmF0aXZlQmxvYiAmJiBwYWNrZXQuZGF0YSBpbnN0YW5jZW9mIEJsb2IpIHtcbiAgICAgICAgcmV0dXJuIHBhY2tldC5kYXRhLmFycmF5QnVmZmVyKCkudGhlbih0b0FycmF5KS50aGVuKGNhbGxiYWNrKTtcbiAgICB9XG4gICAgZWxzZSBpZiAod2l0aE5hdGl2ZUFycmF5QnVmZmVyICYmXG4gICAgICAgIChwYWNrZXQuZGF0YSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyIHx8IGlzVmlldyhwYWNrZXQuZGF0YSkpKSB7XG4gICAgICAgIHJldHVybiBjYWxsYmFjayh0b0FycmF5KHBhY2tldC5kYXRhKSk7XG4gICAgfVxuICAgIGVuY29kZVBhY2tldChwYWNrZXQsIGZhbHNlLCAoZW5jb2RlZCkgPT4ge1xuICAgICAgICBpZiAoIVRFWFRfRU5DT0RFUikge1xuICAgICAgICAgICAgVEVYVF9FTkNPREVSID0gbmV3IFRleHRFbmNvZGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgY2FsbGJhY2soVEVYVF9FTkNPREVSLmVuY29kZShlbmNvZGVkKSk7XG4gICAgfSk7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZGVjb2RlID0gZXhwb3J0cy5lbmNvZGUgPSB2b2lkIDA7XG4vLyBpbXBvcnRlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9zb2NrZXRpby9iYXNlNjQtYXJyYXlidWZmZXJcbmNvbnN0IGNoYXJzID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky8nO1xuLy8gVXNlIGEgbG9va3VwIHRhYmxlIHRvIGZpbmQgdGhlIGluZGV4LlxuY29uc3QgbG9va3VwID0gdHlwZW9mIFVpbnQ4QXJyYXkgPT09ICd1bmRlZmluZWQnID8gW10gOiBuZXcgVWludDhBcnJheSgyNTYpO1xuZm9yIChsZXQgaSA9IDA7IGkgPCBjaGFycy5sZW5ndGg7IGkrKykge1xuICAgIGxvb2t1cFtjaGFycy5jaGFyQ29kZUF0KGkpXSA9IGk7XG59XG5jb25zdCBlbmNvZGUgPSAoYXJyYXlidWZmZXIpID0+IHtcbiAgICBsZXQgYnl0ZXMgPSBuZXcgVWludDhBcnJheShhcnJheWJ1ZmZlciksIGksIGxlbiA9IGJ5dGVzLmxlbmd0aCwgYmFzZTY0ID0gJyc7XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSArPSAzKSB7XG4gICAgICAgIGJhc2U2NCArPSBjaGFyc1tieXRlc1tpXSA+PiAyXTtcbiAgICAgICAgYmFzZTY0ICs9IGNoYXJzWygoYnl0ZXNbaV0gJiAzKSA8PCA0KSB8IChieXRlc1tpICsgMV0gPj4gNCldO1xuICAgICAgICBiYXNlNjQgKz0gY2hhcnNbKChieXRlc1tpICsgMV0gJiAxNSkgPDwgMikgfCAoYnl0ZXNbaSArIDJdID4+IDYpXTtcbiAgICAgICAgYmFzZTY0ICs9IGNoYXJzW2J5dGVzW2kgKyAyXSAmIDYzXTtcbiAgICB9XG4gICAgaWYgKGxlbiAlIDMgPT09IDIpIHtcbiAgICAgICAgYmFzZTY0ID0gYmFzZTY0LnN1YnN0cmluZygwLCBiYXNlNjQubGVuZ3RoIC0gMSkgKyAnPSc7XG4gICAgfVxuICAgIGVsc2UgaWYgKGxlbiAlIDMgPT09IDEpIHtcbiAgICAgICAgYmFzZTY0ID0gYmFzZTY0LnN1YnN0cmluZygwLCBiYXNlNjQubGVuZ3RoIC0gMikgKyAnPT0nO1xuICAgIH1cbiAgICByZXR1cm4gYmFzZTY0O1xufTtcbmV4cG9ydHMuZW5jb2RlID0gZW5jb2RlO1xuY29uc3QgZGVjb2RlID0gKGJhc2U2NCkgPT4ge1xuICAgIGxldCBidWZmZXJMZW5ndGggPSBiYXNlNjQubGVuZ3RoICogMC43NSwgbGVuID0gYmFzZTY0Lmxlbmd0aCwgaSwgcCA9IDAsIGVuY29kZWQxLCBlbmNvZGVkMiwgZW5jb2RlZDMsIGVuY29kZWQ0O1xuICAgIGlmIChiYXNlNjRbYmFzZTY0Lmxlbmd0aCAtIDFdID09PSAnPScpIHtcbiAgICAgICAgYnVmZmVyTGVuZ3RoLS07XG4gICAgICAgIGlmIChiYXNlNjRbYmFzZTY0Lmxlbmd0aCAtIDJdID09PSAnPScpIHtcbiAgICAgICAgICAgIGJ1ZmZlckxlbmd0aC0tO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnN0IGFycmF5YnVmZmVyID0gbmV3IEFycmF5QnVmZmVyKGJ1ZmZlckxlbmd0aCksIGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXlidWZmZXIpO1xuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkgKz0gNCkge1xuICAgICAgICBlbmNvZGVkMSA9IGxvb2t1cFtiYXNlNjQuY2hhckNvZGVBdChpKV07XG4gICAgICAgIGVuY29kZWQyID0gbG9va3VwW2Jhc2U2NC5jaGFyQ29kZUF0KGkgKyAxKV07XG4gICAgICAgIGVuY29kZWQzID0gbG9va3VwW2Jhc2U2NC5jaGFyQ29kZUF0KGkgKyAyKV07XG4gICAgICAgIGVuY29kZWQ0ID0gbG9va3VwW2Jhc2U2NC5jaGFyQ29kZUF0KGkgKyAzKV07XG4gICAgICAgIGJ5dGVzW3ArK10gPSAoZW5jb2RlZDEgPDwgMikgfCAoZW5jb2RlZDIgPj4gNCk7XG4gICAgICAgIGJ5dGVzW3ArK10gPSAoKGVuY29kZWQyICYgMTUpIDw8IDQpIHwgKGVuY29kZWQzID4+IDIpO1xuICAgICAgICBieXRlc1twKytdID0gKChlbmNvZGVkMyAmIDMpIDw8IDYpIHwgKGVuY29kZWQ0ICYgNjMpO1xuICAgIH1cbiAgICByZXR1cm4gYXJyYXlidWZmZXI7XG59O1xuZXhwb3J0cy5kZWNvZGUgPSBkZWNvZGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZGVjb2RlUGFja2V0ID0gdm9pZCAwO1xuY29uc3QgY29tbW9uc19qc18xID0gcmVxdWlyZShcIi4vY29tbW9ucy5qc1wiKTtcbmNvbnN0IGJhc2U2NF9hcnJheWJ1ZmZlcl9qc18xID0gcmVxdWlyZShcIi4vY29udHJpYi9iYXNlNjQtYXJyYXlidWZmZXIuanNcIik7XG5jb25zdCB3aXRoTmF0aXZlQXJyYXlCdWZmZXIgPSB0eXBlb2YgQXJyYXlCdWZmZXIgPT09IFwiZnVuY3Rpb25cIjtcbmNvbnN0IGRlY29kZVBhY2tldCA9IChlbmNvZGVkUGFja2V0LCBiaW5hcnlUeXBlKSA9PiB7XG4gICAgaWYgKHR5cGVvZiBlbmNvZGVkUGFja2V0ICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiBcIm1lc3NhZ2VcIixcbiAgICAgICAgICAgIGRhdGE6IG1hcEJpbmFyeShlbmNvZGVkUGFja2V0LCBiaW5hcnlUeXBlKSxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgY29uc3QgdHlwZSA9IGVuY29kZWRQYWNrZXQuY2hhckF0KDApO1xuICAgIGlmICh0eXBlID09PSBcImJcIikge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogXCJtZXNzYWdlXCIsXG4gICAgICAgICAgICBkYXRhOiBkZWNvZGVCYXNlNjRQYWNrZXQoZW5jb2RlZFBhY2tldC5zdWJzdHJpbmcoMSksIGJpbmFyeVR5cGUpLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBjb25zdCBwYWNrZXRUeXBlID0gY29tbW9uc19qc18xLlBBQ0tFVF9UWVBFU19SRVZFUlNFW3R5cGVdO1xuICAgIGlmICghcGFja2V0VHlwZSkge1xuICAgICAgICByZXR1cm4gY29tbW9uc19qc18xLkVSUk9SX1BBQ0tFVDtcbiAgICB9XG4gICAgcmV0dXJuIGVuY29kZWRQYWNrZXQubGVuZ3RoID4gMVxuICAgICAgICA/IHtcbiAgICAgICAgICAgIHR5cGU6IGNvbW1vbnNfanNfMS5QQUNLRVRfVFlQRVNfUkVWRVJTRVt0eXBlXSxcbiAgICAgICAgICAgIGRhdGE6IGVuY29kZWRQYWNrZXQuc3Vic3RyaW5nKDEpLFxuICAgICAgICB9XG4gICAgICAgIDoge1xuICAgICAgICAgICAgdHlwZTogY29tbW9uc19qc18xLlBBQ0tFVF9UWVBFU19SRVZFUlNFW3R5cGVdLFxuICAgICAgICB9O1xufTtcbmV4cG9ydHMuZGVjb2RlUGFja2V0ID0gZGVjb2RlUGFja2V0O1xuY29uc3QgZGVjb2RlQmFzZTY0UGFja2V0ID0gKGRhdGEsIGJpbmFyeVR5cGUpID0+IHtcbiAgICBpZiAod2l0aE5hdGl2ZUFycmF5QnVmZmVyKSB7XG4gICAgICAgIGNvbnN0IGRlY29kZWQgPSAoMCwgYmFzZTY0X2FycmF5YnVmZmVyX2pzXzEuZGVjb2RlKShkYXRhKTtcbiAgICAgICAgcmV0dXJuIG1hcEJpbmFyeShkZWNvZGVkLCBiaW5hcnlUeXBlKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiB7IGJhc2U2NDogdHJ1ZSwgZGF0YSB9OyAvLyBmYWxsYmFjayBmb3Igb2xkIGJyb3dzZXJzXG4gICAgfVxufTtcbmNvbnN0IG1hcEJpbmFyeSA9IChkYXRhLCBiaW5hcnlUeXBlKSA9PiB7XG4gICAgc3dpdGNoIChiaW5hcnlUeXBlKSB7XG4gICAgICAgIGNhc2UgXCJibG9iXCI6XG4gICAgICAgICAgICBpZiAoZGF0YSBpbnN0YW5jZW9mIEJsb2IpIHtcbiAgICAgICAgICAgICAgICAvLyBmcm9tIFdlYlNvY2tldCArIGJpbmFyeVR5cGUgXCJibG9iXCJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIGZyb20gSFRUUCBsb25nLXBvbGxpbmcgb3IgV2ViVHJhbnNwb3J0XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBCbG9iKFtkYXRhXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIGNhc2UgXCJhcnJheWJ1ZmZlclwiOlxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgaWYgKGRhdGEgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikge1xuICAgICAgICAgICAgICAgIC8vIGZyb20gSFRUUCBsb25nLXBvbGxpbmcgKGJhc2U2NCkgb3IgV2ViU29ja2V0ICsgYmluYXJ5VHlwZSBcImFycmF5YnVmZmVyXCJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIGZyb20gV2ViVHJhbnNwb3J0IChVaW50OEFycmF5KVxuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhLmJ1ZmZlcjtcbiAgICAgICAgICAgIH1cbiAgICB9XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmRlY29kZVBheWxvYWQgPSBleHBvcnRzLmRlY29kZVBhY2tldCA9IGV4cG9ydHMuZW5jb2RlUGF5bG9hZCA9IGV4cG9ydHMuZW5jb2RlUGFja2V0ID0gZXhwb3J0cy5wcm90b2NvbCA9IHZvaWQgMDtcbmV4cG9ydHMuY3JlYXRlUGFja2V0RW5jb2RlclN0cmVhbSA9IGNyZWF0ZVBhY2tldEVuY29kZXJTdHJlYW07XG5leHBvcnRzLmNyZWF0ZVBhY2tldERlY29kZXJTdHJlYW0gPSBjcmVhdGVQYWNrZXREZWNvZGVyU3RyZWFtO1xuY29uc3QgZW5jb2RlUGFja2V0X2pzXzEgPSByZXF1aXJlKFwiLi9lbmNvZGVQYWNrZXQuanNcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJlbmNvZGVQYWNrZXRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGVuY29kZVBhY2tldF9qc18xLmVuY29kZVBhY2tldDsgfSB9KTtcbmNvbnN0IGRlY29kZVBhY2tldF9qc18xID0gcmVxdWlyZShcIi4vZGVjb2RlUGFja2V0LmpzXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiZGVjb2RlUGFja2V0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBkZWNvZGVQYWNrZXRfanNfMS5kZWNvZGVQYWNrZXQ7IH0gfSk7XG5jb25zdCBjb21tb25zX2pzXzEgPSByZXF1aXJlKFwiLi9jb21tb25zLmpzXCIpO1xuY29uc3QgU0VQQVJBVE9SID0gU3RyaW5nLmZyb21DaGFyQ29kZSgzMCk7IC8vIHNlZSBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9EZWxpbWl0ZXIjQVNDSUlfZGVsaW1pdGVkX3RleHRcbmNvbnN0IGVuY29kZVBheWxvYWQgPSAocGFja2V0cywgY2FsbGJhY2spID0+IHtcbiAgICAvLyBzb21lIHBhY2tldHMgbWF5IGJlIGFkZGVkIHRvIHRoZSBhcnJheSB3aGlsZSBlbmNvZGluZywgc28gdGhlIGluaXRpYWwgbGVuZ3RoIG11c3QgYmUgc2F2ZWRcbiAgICBjb25zdCBsZW5ndGggPSBwYWNrZXRzLmxlbmd0aDtcbiAgICBjb25zdCBlbmNvZGVkUGFja2V0cyA9IG5ldyBBcnJheShsZW5ndGgpO1xuICAgIGxldCBjb3VudCA9IDA7XG4gICAgcGFja2V0cy5mb3JFYWNoKChwYWNrZXQsIGkpID0+IHtcbiAgICAgICAgLy8gZm9yY2UgYmFzZTY0IGVuY29kaW5nIGZvciBiaW5hcnkgcGFja2V0c1xuICAgICAgICAoMCwgZW5jb2RlUGFja2V0X2pzXzEuZW5jb2RlUGFja2V0KShwYWNrZXQsIGZhbHNlLCAoZW5jb2RlZFBhY2tldCkgPT4ge1xuICAgICAgICAgICAgZW5jb2RlZFBhY2tldHNbaV0gPSBlbmNvZGVkUGFja2V0O1xuICAgICAgICAgICAgaWYgKCsrY291bnQgPT09IGxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGVuY29kZWRQYWNrZXRzLmpvaW4oU0VQQVJBVE9SKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xufTtcbmV4cG9ydHMuZW5jb2RlUGF5bG9hZCA9IGVuY29kZVBheWxvYWQ7XG5jb25zdCBkZWNvZGVQYXlsb2FkID0gKGVuY29kZWRQYXlsb2FkLCBiaW5hcnlUeXBlKSA9PiB7XG4gICAgY29uc3QgZW5jb2RlZFBhY2tldHMgPSBlbmNvZGVkUGF5bG9hZC5zcGxpdChTRVBBUkFUT1IpO1xuICAgIGNvbnN0IHBhY2tldHMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVuY29kZWRQYWNrZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGRlY29kZWRQYWNrZXQgPSAoMCwgZGVjb2RlUGFja2V0X2pzXzEuZGVjb2RlUGFja2V0KShlbmNvZGVkUGFja2V0c1tpXSwgYmluYXJ5VHlwZSk7XG4gICAgICAgIHBhY2tldHMucHVzaChkZWNvZGVkUGFja2V0KTtcbiAgICAgICAgaWYgKGRlY29kZWRQYWNrZXQudHlwZSA9PT0gXCJlcnJvclwiKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcGFja2V0cztcbn07XG5leHBvcnRzLmRlY29kZVBheWxvYWQgPSBkZWNvZGVQYXlsb2FkO1xuZnVuY3Rpb24gY3JlYXRlUGFja2V0RW5jb2RlclN0cmVhbSgpIHtcbiAgICByZXR1cm4gbmV3IFRyYW5zZm9ybVN0cmVhbSh7XG4gICAgICAgIHRyYW5zZm9ybShwYWNrZXQsIGNvbnRyb2xsZXIpIHtcbiAgICAgICAgICAgICgwLCBlbmNvZGVQYWNrZXRfanNfMS5lbmNvZGVQYWNrZXRUb0JpbmFyeSkocGFja2V0LCAoZW5jb2RlZFBhY2tldCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBheWxvYWRMZW5ndGggPSBlbmNvZGVkUGFja2V0Lmxlbmd0aDtcbiAgICAgICAgICAgICAgICBsZXQgaGVhZGVyO1xuICAgICAgICAgICAgICAgIC8vIGluc3BpcmVkIGJ5IHRoZSBXZWJTb2NrZXQgZm9ybWF0OiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvV2ViU29ja2V0c19BUEkvV3JpdGluZ19XZWJTb2NrZXRfc2VydmVycyNkZWNvZGluZ19wYXlsb2FkX2xlbmd0aFxuICAgICAgICAgICAgICAgIGlmIChwYXlsb2FkTGVuZ3RoIDwgMTI2KSB7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlciA9IG5ldyBVaW50OEFycmF5KDEpO1xuICAgICAgICAgICAgICAgICAgICBuZXcgRGF0YVZpZXcoaGVhZGVyLmJ1ZmZlcikuc2V0VWludDgoMCwgcGF5bG9hZExlbmd0aCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHBheWxvYWRMZW5ndGggPCA2NTUzNikge1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXIgPSBuZXcgVWludDhBcnJheSgzKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmlldyA9IG5ldyBEYXRhVmlldyhoZWFkZXIuYnVmZmVyKTtcbiAgICAgICAgICAgICAgICAgICAgdmlldy5zZXRVaW50OCgwLCAxMjYpO1xuICAgICAgICAgICAgICAgICAgICB2aWV3LnNldFVpbnQxNigxLCBwYXlsb2FkTGVuZ3RoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlciA9IG5ldyBVaW50OEFycmF5KDkpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB2aWV3ID0gbmV3IERhdGFWaWV3KGhlYWRlci5idWZmZXIpO1xuICAgICAgICAgICAgICAgICAgICB2aWV3LnNldFVpbnQ4KDAsIDEyNyk7XG4gICAgICAgICAgICAgICAgICAgIHZpZXcuc2V0QmlnVWludDY0KDEsIEJpZ0ludChwYXlsb2FkTGVuZ3RoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGZpcnN0IGJpdCBpbmRpY2F0ZXMgd2hldGhlciB0aGUgcGF5bG9hZCBpcyBwbGFpbiB0ZXh0ICgwKSBvciBiaW5hcnkgKDEpXG4gICAgICAgICAgICAgICAgaWYgKHBhY2tldC5kYXRhICYmIHR5cGVvZiBwYWNrZXQuZGF0YSAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXJbMF0gfD0gMHg4MDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29udHJvbGxlci5lbnF1ZXVlKGhlYWRlcik7XG4gICAgICAgICAgICAgICAgY29udHJvbGxlci5lbnF1ZXVlKGVuY29kZWRQYWNrZXQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgfSk7XG59XG5sZXQgVEVYVF9ERUNPREVSO1xuZnVuY3Rpb24gdG90YWxMZW5ndGgoY2h1bmtzKSB7XG4gICAgcmV0dXJuIGNodW5rcy5yZWR1Y2UoKGFjYywgY2h1bmspID0+IGFjYyArIGNodW5rLmxlbmd0aCwgMCk7XG59XG5mdW5jdGlvbiBjb25jYXRDaHVua3MoY2h1bmtzLCBzaXplKSB7XG4gICAgaWYgKGNodW5rc1swXS5sZW5ndGggPT09IHNpemUpIHtcbiAgICAgICAgcmV0dXJuIGNodW5rcy5zaGlmdCgpO1xuICAgIH1cbiAgICBjb25zdCBidWZmZXIgPSBuZXcgVWludDhBcnJheShzaXplKTtcbiAgICBsZXQgaiA9IDA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICAgICAgYnVmZmVyW2ldID0gY2h1bmtzWzBdW2orK107XG4gICAgICAgIGlmIChqID09PSBjaHVua3NbMF0ubGVuZ3RoKSB7XG4gICAgICAgICAgICBjaHVua3Muc2hpZnQoKTtcbiAgICAgICAgICAgIGogPSAwO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChjaHVua3MubGVuZ3RoICYmIGogPCBjaHVua3NbMF0ubGVuZ3RoKSB7XG4gICAgICAgIGNodW5rc1swXSA9IGNodW5rc1swXS5zbGljZShqKTtcbiAgICB9XG4gICAgcmV0dXJuIGJ1ZmZlcjtcbn1cbmZ1bmN0aW9uIGNyZWF0ZVBhY2tldERlY29kZXJTdHJlYW0obWF4UGF5bG9hZCwgYmluYXJ5VHlwZSkge1xuICAgIGlmICghVEVYVF9ERUNPREVSKSB7XG4gICAgICAgIFRFWFRfREVDT0RFUiA9IG5ldyBUZXh0RGVjb2RlcigpO1xuICAgIH1cbiAgICBjb25zdCBjaHVua3MgPSBbXTtcbiAgICBsZXQgc3RhdGUgPSAwIC8qIFN0YXRlLlJFQURfSEVBREVSICovO1xuICAgIGxldCBleHBlY3RlZExlbmd0aCA9IC0xO1xuICAgIGxldCBpc0JpbmFyeSA9IGZhbHNlO1xuICAgIHJldHVybiBuZXcgVHJhbnNmb3JtU3RyZWFtKHtcbiAgICAgICAgdHJhbnNmb3JtKGNodW5rLCBjb250cm9sbGVyKSB7XG4gICAgICAgICAgICBjaHVua3MucHVzaChjaHVuayk7XG4gICAgICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgICAgIGlmIChzdGF0ZSA9PT0gMCAvKiBTdGF0ZS5SRUFEX0hFQURFUiAqLykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodG90YWxMZW5ndGgoY2h1bmtzKSA8IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGhlYWRlciA9IGNvbmNhdENodW5rcyhjaHVua3MsIDEpO1xuICAgICAgICAgICAgICAgICAgICBpc0JpbmFyeSA9IChoZWFkZXJbMF0gJiAweDgwKSA9PT0gMHg4MDtcbiAgICAgICAgICAgICAgICAgICAgZXhwZWN0ZWRMZW5ndGggPSBoZWFkZXJbMF0gJiAweDdmO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXhwZWN0ZWRMZW5ndGggPCAxMjYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlID0gMyAvKiBTdGF0ZS5SRUFEX1BBWUxPQUQgKi87XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoZXhwZWN0ZWRMZW5ndGggPT09IDEyNikge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUgPSAxIC8qIFN0YXRlLlJFQURfRVhURU5ERURfTEVOR1RIXzE2ICovO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUgPSAyIC8qIFN0YXRlLlJFQURfRVhURU5ERURfTEVOR1RIXzY0ICovO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHN0YXRlID09PSAxIC8qIFN0YXRlLlJFQURfRVhURU5ERURfTEVOR1RIXzE2ICovKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0b3RhbExlbmd0aChjaHVua3MpIDwgMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaGVhZGVyQXJyYXkgPSBjb25jYXRDaHVua3MoY2h1bmtzLCAyKTtcbiAgICAgICAgICAgICAgICAgICAgZXhwZWN0ZWRMZW5ndGggPSBuZXcgRGF0YVZpZXcoaGVhZGVyQXJyYXkuYnVmZmVyLCBoZWFkZXJBcnJheS5ieXRlT2Zmc2V0LCBoZWFkZXJBcnJheS5sZW5ndGgpLmdldFVpbnQxNigwKTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUgPSAzIC8qIFN0YXRlLlJFQURfUEFZTE9BRCAqLztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoc3RhdGUgPT09IDIgLyogU3RhdGUuUkVBRF9FWFRFTkRFRF9MRU5HVEhfNjQgKi8pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRvdGFsTGVuZ3RoKGNodW5rcykgPCA4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBoZWFkZXJBcnJheSA9IGNvbmNhdENodW5rcyhjaHVua3MsIDgpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB2aWV3ID0gbmV3IERhdGFWaWV3KGhlYWRlckFycmF5LmJ1ZmZlciwgaGVhZGVyQXJyYXkuYnl0ZU9mZnNldCwgaGVhZGVyQXJyYXkubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbiA9IHZpZXcuZ2V0VWludDMyKDApO1xuICAgICAgICAgICAgICAgICAgICBpZiAobiA+IE1hdGgucG93KDIsIDUzIC0gMzIpIC0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhlIG1heGltdW0gc2FmZSBpbnRlZ2VyIGluIEphdmFTY3JpcHQgaXMgMl41MyAtIDFcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIuZW5xdWV1ZShjb21tb25zX2pzXzEuRVJST1JfUEFDS0VUKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGV4cGVjdGVkTGVuZ3RoID0gbiAqIE1hdGgucG93KDIsIDMyKSArIHZpZXcuZ2V0VWludDMyKDQpO1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZSA9IDMgLyogU3RhdGUuUkVBRF9QQVlMT0FEICovO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRvdGFsTGVuZ3RoKGNodW5rcykgPCBleHBlY3RlZExlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IGNvbmNhdENodW5rcyhjaHVua3MsIGV4cGVjdGVkTGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlci5lbnF1ZXVlKCgwLCBkZWNvZGVQYWNrZXRfanNfMS5kZWNvZGVQYWNrZXQpKGlzQmluYXJ5ID8gZGF0YSA6IFRFWFRfREVDT0RFUi5kZWNvZGUoZGF0YSksIGJpbmFyeVR5cGUpKTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUgPSAwIC8qIFN0YXRlLlJFQURfSEVBREVSICovO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoZXhwZWN0ZWRMZW5ndGggPT09IDAgfHwgZXhwZWN0ZWRMZW5ndGggPiBtYXhQYXlsb2FkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIuZW5xdWV1ZShjb21tb25zX2pzXzEuRVJST1JfUEFDS0VUKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIH0pO1xufVxuZXhwb3J0cy5wcm90b2NvbCA9IDQ7XG4iLCIvKipcbiAqIEluaXRpYWxpemUgYSBuZXcgYEVtaXR0ZXJgLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIEVtaXR0ZXIob2JqKSB7XG4gIGlmIChvYmopIHJldHVybiBtaXhpbihvYmopO1xufVxuXG4vKipcbiAqIE1peGluIHRoZSBlbWl0dGVyIHByb3BlcnRpZXMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHJldHVybiB7T2JqZWN0fVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbWl4aW4ob2JqKSB7XG4gIGZvciAodmFyIGtleSBpbiBFbWl0dGVyLnByb3RvdHlwZSkge1xuICAgIG9ialtrZXldID0gRW1pdHRlci5wcm90b3R5cGVba2V5XTtcbiAgfVxuICByZXR1cm4gb2JqO1xufVxuXG4vKipcbiAqIExpc3RlbiBvbiB0aGUgZ2l2ZW4gYGV2ZW50YCB3aXRoIGBmbmAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHJldHVybiB7RW1pdHRlcn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuRW1pdHRlci5wcm90b3R5cGUub24gPVxuRW1pdHRlci5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50LCBmbil7XG4gIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcbiAgKHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF0gPSB0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdIHx8IFtdKVxuICAgIC5wdXNoKGZuKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEFkZHMgYW4gYGV2ZW50YCBsaXN0ZW5lciB0aGF0IHdpbGwgYmUgaW52b2tlZCBhIHNpbmdsZVxuICogdGltZSB0aGVuIGF1dG9tYXRpY2FsbHkgcmVtb3ZlZC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcmV0dXJuIHtFbWl0dGVyfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5FbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24oZXZlbnQsIGZuKXtcbiAgZnVuY3Rpb24gb24oKSB7XG4gICAgdGhpcy5vZmYoZXZlbnQsIG9uKTtcbiAgICBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgb24uZm4gPSBmbjtcbiAgdGhpcy5vbihldmVudCwgb24pO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmVtb3ZlIHRoZSBnaXZlbiBjYWxsYmFjayBmb3IgYGV2ZW50YCBvciBhbGxcbiAqIHJlZ2lzdGVyZWQgY2FsbGJhY2tzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkVtaXR0ZXIucHJvdG90eXBlLm9mZiA9XG5FbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9XG5FbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPVxuRW1pdHRlci5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50LCBmbil7XG4gIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcblxuICAvLyBhbGxcbiAgaWYgKDAgPT0gYXJndW1lbnRzLmxlbmd0aCkge1xuICAgIHRoaXMuX2NhbGxiYWNrcyA9IHt9O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gc3BlY2lmaWMgZXZlbnRcbiAgdmFyIGNhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF07XG4gIGlmICghY2FsbGJhY2tzKSByZXR1cm4gdGhpcztcblxuICAvLyByZW1vdmUgYWxsIGhhbmRsZXJzXG4gIGlmICgxID09IGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICBkZWxldGUgdGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIHJlbW92ZSBzcGVjaWZpYyBoYW5kbGVyXG4gIHZhciBjYjtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcbiAgICBjYiA9IGNhbGxiYWNrc1tpXTtcbiAgICBpZiAoY2IgPT09IGZuIHx8IGNiLmZuID09PSBmbikge1xuICAgICAgY2FsbGJhY2tzLnNwbGljZShpLCAxKTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIC8vIFJlbW92ZSBldmVudCBzcGVjaWZpYyBhcnJheXMgZm9yIGV2ZW50IHR5cGVzIHRoYXQgbm9cbiAgLy8gb25lIGlzIHN1YnNjcmliZWQgZm9yIHRvIGF2b2lkIG1lbW9yeSBsZWFrLlxuICBpZiAoY2FsbGJhY2tzLmxlbmd0aCA9PT0gMCkge1xuICAgIGRlbGV0ZSB0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEVtaXQgYGV2ZW50YCB3aXRoIHRoZSBnaXZlbiBhcmdzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICogQHBhcmFtIHtNaXhlZH0gLi4uXG4gKiBAcmV0dXJuIHtFbWl0dGVyfVxuICovXG5cbkVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbihldmVudCl7XG4gIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcblxuICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSlcbiAgICAsIGNhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF07XG5cbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgfVxuXG4gIGlmIChjYWxsYmFja3MpIHtcbiAgICBjYWxsYmFja3MgPSBjYWxsYmFja3Muc2xpY2UoMCk7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGNhbGxiYWNrcy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgICAgY2FsbGJhY2tzW2ldLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLy8gYWxpYXMgdXNlZCBmb3IgcmVzZXJ2ZWQgZXZlbnRzIChwcm90ZWN0ZWQgbWV0aG9kKVxuRW1pdHRlci5wcm90b3R5cGUuZW1pdFJlc2VydmVkID0gRW1pdHRlci5wcm90b3R5cGUuZW1pdDtcblxuLyoqXG4gKiBSZXR1cm4gYXJyYXkgb2YgY2FsbGJhY2tzIGZvciBgZXZlbnRgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICogQHJldHVybiB7QXJyYXl9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uKGV2ZW50KXtcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xuICByZXR1cm4gdGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XSB8fCBbXTtcbn07XG5cbi8qKlxuICogQ2hlY2sgaWYgdGhpcyBlbWl0dGVyIGhhcyBgZXZlbnRgIGhhbmRsZXJzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuRW1pdHRlci5wcm90b3R5cGUuaGFzTGlzdGVuZXJzID0gZnVuY3Rpb24oZXZlbnQpe1xuICByZXR1cm4gISEgdGhpcy5saXN0ZW5lcnMoZXZlbnQpLmxlbmd0aDtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZGVmYXVsdEJpbmFyeVR5cGUgPSBleHBvcnRzLmdsb2JhbFRoaXNTaGltID0gZXhwb3J0cy5uZXh0VGljayA9IHZvaWQgMDtcbmV4cG9ydHMuY3JlYXRlQ29va2llSmFyID0gY3JlYXRlQ29va2llSmFyO1xuZXhwb3J0cy5uZXh0VGljayA9ICgoKSA9PiB7XG4gICAgY29uc3QgaXNQcm9taXNlQXZhaWxhYmxlID0gdHlwZW9mIFByb21pc2UgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgUHJvbWlzZS5yZXNvbHZlID09PSBcImZ1bmN0aW9uXCI7XG4gICAgaWYgKGlzUHJvbWlzZUF2YWlsYWJsZSkge1xuICAgICAgICByZXR1cm4gKGNiKSA9PiBQcm9taXNlLnJlc29sdmUoKS50aGVuKGNiKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiAoY2IsIHNldFRpbWVvdXRGbikgPT4gc2V0VGltZW91dEZuKGNiLCAwKTtcbiAgICB9XG59KSgpO1xuZXhwb3J0cy5nbG9iYWxUaGlzU2hpbSA9ICgoKSA9PiB7XG4gICAgaWYgKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIHJldHVybiB3aW5kb3c7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpO1xuICAgIH1cbn0pKCk7XG5leHBvcnRzLmRlZmF1bHRCaW5hcnlUeXBlID0gXCJhcnJheWJ1ZmZlclwiO1xuZnVuY3Rpb24gY3JlYXRlQ29va2llSmFyKCkgeyB9XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMucGljayA9IHBpY2s7XG5leHBvcnRzLmluc3RhbGxUaW1lckZ1bmN0aW9ucyA9IGluc3RhbGxUaW1lckZ1bmN0aW9ucztcbmV4cG9ydHMuYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGg7XG5leHBvcnRzLnJhbmRvbVN0cmluZyA9IHJhbmRvbVN0cmluZztcbmNvbnN0IGdsb2JhbHNfbm9kZV9qc18xID0gcmVxdWlyZShcIi4vZ2xvYmFscy5ub2RlLmpzXCIpO1xuZnVuY3Rpb24gcGljayhvYmosIC4uLmF0dHIpIHtcbiAgICByZXR1cm4gYXR0ci5yZWR1Y2UoKGFjYywgaykgPT4ge1xuICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGspKSB7XG4gICAgICAgICAgICBhY2Nba10gPSBvYmpba107XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCB7fSk7XG59XG4vLyBLZWVwIGEgcmVmZXJlbmNlIHRvIHRoZSByZWFsIHRpbWVvdXQgZnVuY3Rpb25zIHNvIHRoZXkgY2FuIGJlIHVzZWQgd2hlbiBvdmVycmlkZGVuXG5jb25zdCBOQVRJVkVfU0VUX1RJTUVPVVQgPSBnbG9iYWxzX25vZGVfanNfMS5nbG9iYWxUaGlzU2hpbS5zZXRUaW1lb3V0O1xuY29uc3QgTkFUSVZFX0NMRUFSX1RJTUVPVVQgPSBnbG9iYWxzX25vZGVfanNfMS5nbG9iYWxUaGlzU2hpbS5jbGVhclRpbWVvdXQ7XG5mdW5jdGlvbiBpbnN0YWxsVGltZXJGdW5jdGlvbnMob2JqLCBvcHRzKSB7XG4gICAgaWYgKG9wdHMudXNlTmF0aXZlVGltZXJzKSB7XG4gICAgICAgIG9iai5zZXRUaW1lb3V0Rm4gPSBOQVRJVkVfU0VUX1RJTUVPVVQuYmluZChnbG9iYWxzX25vZGVfanNfMS5nbG9iYWxUaGlzU2hpbSk7XG4gICAgICAgIG9iai5jbGVhclRpbWVvdXRGbiA9IE5BVElWRV9DTEVBUl9USU1FT1VULmJpbmQoZ2xvYmFsc19ub2RlX2pzXzEuZ2xvYmFsVGhpc1NoaW0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgb2JqLnNldFRpbWVvdXRGbiA9IGdsb2JhbHNfbm9kZV9qc18xLmdsb2JhbFRoaXNTaGltLnNldFRpbWVvdXQuYmluZChnbG9iYWxzX25vZGVfanNfMS5nbG9iYWxUaGlzU2hpbSk7XG4gICAgICAgIG9iai5jbGVhclRpbWVvdXRGbiA9IGdsb2JhbHNfbm9kZV9qc18xLmdsb2JhbFRoaXNTaGltLmNsZWFyVGltZW91dC5iaW5kKGdsb2JhbHNfbm9kZV9qc18xLmdsb2JhbFRoaXNTaGltKTtcbiAgICB9XG59XG4vLyBiYXNlNjQgZW5jb2RlZCBidWZmZXJzIGFyZSBhYm91dCAzMyUgYmlnZ2VyIChodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9CYXNlNjQpXG5jb25zdCBCQVNFNjRfT1ZFUkhFQUQgPSAxLjMzO1xuLy8gd2UgY291bGQgYWxzbyBoYXZlIHVzZWQgYG5ldyBCbG9iKFtvYmpdKS5zaXplYCwgYnV0IGl0IGlzbid0IHN1cHBvcnRlZCBpbiBJRTlcbmZ1bmN0aW9uIGJ5dGVMZW5ndGgob2JqKSB7XG4gICAgaWYgKHR5cGVvZiBvYmogPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgcmV0dXJuIHV0ZjhMZW5ndGgob2JqKTtcbiAgICB9XG4gICAgLy8gYXJyYXlidWZmZXIgb3IgYmxvYlxuICAgIHJldHVybiBNYXRoLmNlaWwoKG9iai5ieXRlTGVuZ3RoIHx8IG9iai5zaXplKSAqIEJBU0U2NF9PVkVSSEVBRCk7XG59XG5mdW5jdGlvbiB1dGY4TGVuZ3RoKHN0cikge1xuICAgIGxldCBjID0gMCwgbGVuZ3RoID0gMDtcbiAgICBmb3IgKGxldCBpID0gMCwgbCA9IHN0ci5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgYyA9IHN0ci5jaGFyQ29kZUF0KGkpO1xuICAgICAgICBpZiAoYyA8IDB4ODApIHtcbiAgICAgICAgICAgIGxlbmd0aCArPSAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGMgPCAweDgwMCkge1xuICAgICAgICAgICAgbGVuZ3RoICs9IDI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYyA8IDB4ZDgwMCB8fCBjID49IDB4ZTAwMCkge1xuICAgICAgICAgICAgbGVuZ3RoICs9IDM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgICAgICBsZW5ndGggKz0gNDtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbGVuZ3RoO1xufVxuLyoqXG4gKiBHZW5lcmF0ZXMgYSByYW5kb20gOC1jaGFyYWN0ZXJzIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gcmFuZG9tU3RyaW5nKCkge1xuICAgIHJldHVybiAoRGF0ZS5ub3coKS50b1N0cmluZygzNikuc3Vic3RyaW5nKDMpICtcbiAgICAgICAgTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyaW5nKDIsIDUpKTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuLy8gaW1wb3J0ZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vZ2Fsa24vcXVlcnlzdHJpbmdcbi8qKlxuICogQ29tcGlsZXMgYSBxdWVyeXN0cmluZ1xuICogUmV0dXJucyBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fVxuICogQGFwaSBwcml2YXRlXG4gKi9cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZW5jb2RlID0gZW5jb2RlO1xuZXhwb3J0cy5kZWNvZGUgPSBkZWNvZGU7XG5mdW5jdGlvbiBlbmNvZGUob2JqKSB7XG4gICAgbGV0IHN0ciA9ICcnO1xuICAgIGZvciAobGV0IGkgaW4gb2JqKSB7XG4gICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgICAgICAgIGlmIChzdHIubGVuZ3RoKVxuICAgICAgICAgICAgICAgIHN0ciArPSAnJic7XG4gICAgICAgICAgICBzdHIgKz0gZW5jb2RlVVJJQ29tcG9uZW50KGkpICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KG9ialtpXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHN0cjtcbn1cbi8qKlxuICogUGFyc2VzIGEgc2ltcGxlIHF1ZXJ5c3RyaW5nIGludG8gYW4gb2JqZWN0XG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHFzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZGVjb2RlKHFzKSB7XG4gICAgbGV0IHFyeSA9IHt9O1xuICAgIGxldCBwYWlycyA9IHFzLnNwbGl0KCcmJyk7XG4gICAgZm9yIChsZXQgaSA9IDAsIGwgPSBwYWlycy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgbGV0IHBhaXIgPSBwYWlyc1tpXS5zcGxpdCgnPScpO1xuICAgICAgICBxcnlbZGVjb2RlVVJJQ29tcG9uZW50KHBhaXJbMF0pXSA9IGRlY29kZVVSSUNvbXBvbmVudChwYWlyWzFdKTtcbiAgICB9XG4gICAgcmV0dXJuIHFyeTtcbn1cbiIsIi8qKlxuICogSGVscGVycy5cbiAqL1xuXG52YXIgcyA9IDEwMDA7XG52YXIgbSA9IHMgKiA2MDtcbnZhciBoID0gbSAqIDYwO1xudmFyIGQgPSBoICogMjQ7XG52YXIgdyA9IGQgKiA3O1xudmFyIHkgPSBkICogMzY1LjI1O1xuXG4vKipcbiAqIFBhcnNlIG9yIGZvcm1hdCB0aGUgZ2l2ZW4gYHZhbGAuXG4gKlxuICogT3B0aW9uczpcbiAqXG4gKiAgLSBgbG9uZ2AgdmVyYm9zZSBmb3JtYXR0aW5nIFtmYWxzZV1cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ3xOdW1iZXJ9IHZhbFxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXVxuICogQHRocm93cyB7RXJyb3J9IHRocm93IGFuIGVycm9yIGlmIHZhbCBpcyBub3QgYSBub24tZW1wdHkgc3RyaW5nIG9yIGEgbnVtYmVyXG4gKiBAcmV0dXJuIHtTdHJpbmd8TnVtYmVyfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh2YWwsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbDtcbiAgaWYgKHR5cGUgPT09ICdzdHJpbmcnICYmIHZhbC5sZW5ndGggPiAwKSB7XG4gICAgcmV0dXJuIHBhcnNlKHZhbCk7XG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gJ251bWJlcicgJiYgaXNGaW5pdGUodmFsKSkge1xuICAgIHJldHVybiBvcHRpb25zLmxvbmcgPyBmbXRMb25nKHZhbCkgOiBmbXRTaG9ydCh2YWwpO1xuICB9XG4gIHRocm93IG5ldyBFcnJvcihcbiAgICAndmFsIGlzIG5vdCBhIG5vbi1lbXB0eSBzdHJpbmcgb3IgYSB2YWxpZCBudW1iZXIuIHZhbD0nICtcbiAgICAgIEpTT04uc3RyaW5naWZ5KHZhbClcbiAgKTtcbn07XG5cbi8qKlxuICogUGFyc2UgdGhlIGdpdmVuIGBzdHJgIGFuZCByZXR1cm4gbWlsbGlzZWNvbmRzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge051bWJlcn1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHBhcnNlKHN0cikge1xuICBzdHIgPSBTdHJpbmcoc3RyKTtcbiAgaWYgKHN0ci5sZW5ndGggPiAxMDApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIG1hdGNoID0gL14oLT8oPzpcXGQrKT9cXC4/XFxkKykgKihtaWxsaXNlY29uZHM/fG1zZWNzP3xtc3xzZWNvbmRzP3xzZWNzP3xzfG1pbnV0ZXM/fG1pbnM/fG18aG91cnM/fGhycz98aHxkYXlzP3xkfHdlZWtzP3x3fHllYXJzP3x5cnM/fHkpPyQvaS5leGVjKFxuICAgIHN0clxuICApO1xuICBpZiAoIW1hdGNoKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBuID0gcGFyc2VGbG9hdChtYXRjaFsxXSk7XG4gIHZhciB0eXBlID0gKG1hdGNoWzJdIHx8ICdtcycpLnRvTG93ZXJDYXNlKCk7XG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgJ3llYXJzJzpcbiAgICBjYXNlICd5ZWFyJzpcbiAgICBjYXNlICd5cnMnOlxuICAgIGNhc2UgJ3lyJzpcbiAgICBjYXNlICd5JzpcbiAgICAgIHJldHVybiBuICogeTtcbiAgICBjYXNlICd3ZWVrcyc6XG4gICAgY2FzZSAnd2Vlayc6XG4gICAgY2FzZSAndyc6XG4gICAgICByZXR1cm4gbiAqIHc7XG4gICAgY2FzZSAnZGF5cyc6XG4gICAgY2FzZSAnZGF5JzpcbiAgICBjYXNlICdkJzpcbiAgICAgIHJldHVybiBuICogZDtcbiAgICBjYXNlICdob3Vycyc6XG4gICAgY2FzZSAnaG91cic6XG4gICAgY2FzZSAnaHJzJzpcbiAgICBjYXNlICdocic6XG4gICAgY2FzZSAnaCc6XG4gICAgICByZXR1cm4gbiAqIGg7XG4gICAgY2FzZSAnbWludXRlcyc6XG4gICAgY2FzZSAnbWludXRlJzpcbiAgICBjYXNlICdtaW5zJzpcbiAgICBjYXNlICdtaW4nOlxuICAgIGNhc2UgJ20nOlxuICAgICAgcmV0dXJuIG4gKiBtO1xuICAgIGNhc2UgJ3NlY29uZHMnOlxuICAgIGNhc2UgJ3NlY29uZCc6XG4gICAgY2FzZSAnc2Vjcyc6XG4gICAgY2FzZSAnc2VjJzpcbiAgICBjYXNlICdzJzpcbiAgICAgIHJldHVybiBuICogcztcbiAgICBjYXNlICdtaWxsaXNlY29uZHMnOlxuICAgIGNhc2UgJ21pbGxpc2Vjb25kJzpcbiAgICBjYXNlICdtc2Vjcyc6XG4gICAgY2FzZSAnbXNlYyc6XG4gICAgY2FzZSAnbXMnOlxuICAgICAgcmV0dXJuIG47XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbn1cblxuLyoqXG4gKiBTaG9ydCBmb3JtYXQgZm9yIGBtc2AuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IG1zXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBmbXRTaG9ydChtcykge1xuICB2YXIgbXNBYnMgPSBNYXRoLmFicyhtcyk7XG4gIGlmIChtc0FicyA+PSBkKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQobXMgLyBkKSArICdkJztcbiAgfVxuICBpZiAobXNBYnMgPj0gaCkge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKG1zIC8gaCkgKyAnaCc7XG4gIH1cbiAgaWYgKG1zQWJzID49IG0pIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChtcyAvIG0pICsgJ20nO1xuICB9XG4gIGlmIChtc0FicyA+PSBzKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQobXMgLyBzKSArICdzJztcbiAgfVxuICByZXR1cm4gbXMgKyAnbXMnO1xufVxuXG4vKipcbiAqIExvbmcgZm9ybWF0IGZvciBgbXNgLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBtc1xuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gZm10TG9uZyhtcykge1xuICB2YXIgbXNBYnMgPSBNYXRoLmFicyhtcyk7XG4gIGlmIChtc0FicyA+PSBkKSB7XG4gICAgcmV0dXJuIHBsdXJhbChtcywgbXNBYnMsIGQsICdkYXknKTtcbiAgfVxuICBpZiAobXNBYnMgPj0gaCkge1xuICAgIHJldHVybiBwbHVyYWwobXMsIG1zQWJzLCBoLCAnaG91cicpO1xuICB9XG4gIGlmIChtc0FicyA+PSBtKSB7XG4gICAgcmV0dXJuIHBsdXJhbChtcywgbXNBYnMsIG0sICdtaW51dGUnKTtcbiAgfVxuICBpZiAobXNBYnMgPj0gcykge1xuICAgIHJldHVybiBwbHVyYWwobXMsIG1zQWJzLCBzLCAnc2Vjb25kJyk7XG4gIH1cbiAgcmV0dXJuIG1zICsgJyBtcyc7XG59XG5cbi8qKlxuICogUGx1cmFsaXphdGlvbiBoZWxwZXIuXG4gKi9cblxuZnVuY3Rpb24gcGx1cmFsKG1zLCBtc0FicywgbiwgbmFtZSkge1xuICB2YXIgaXNQbHVyYWwgPSBtc0FicyA+PSBuICogMS41O1xuICByZXR1cm4gTWF0aC5yb3VuZChtcyAvIG4pICsgJyAnICsgbmFtZSArIChpc1BsdXJhbCA/ICdzJyA6ICcnKTtcbn1cbiIsIlxuLyoqXG4gKiBUaGlzIGlzIHRoZSBjb21tb24gbG9naWMgZm9yIGJvdGggdGhlIE5vZGUuanMgYW5kIHdlYiBicm93c2VyXG4gKiBpbXBsZW1lbnRhdGlvbnMgb2YgYGRlYnVnKClgLlxuICovXG5cbmZ1bmN0aW9uIHNldHVwKGVudikge1xuXHRjcmVhdGVEZWJ1Zy5kZWJ1ZyA9IGNyZWF0ZURlYnVnO1xuXHRjcmVhdGVEZWJ1Zy5kZWZhdWx0ID0gY3JlYXRlRGVidWc7XG5cdGNyZWF0ZURlYnVnLmNvZXJjZSA9IGNvZXJjZTtcblx0Y3JlYXRlRGVidWcuZGlzYWJsZSA9IGRpc2FibGU7XG5cdGNyZWF0ZURlYnVnLmVuYWJsZSA9IGVuYWJsZTtcblx0Y3JlYXRlRGVidWcuZW5hYmxlZCA9IGVuYWJsZWQ7XG5cdGNyZWF0ZURlYnVnLmh1bWFuaXplID0gcmVxdWlyZSgnbXMnKTtcblx0Y3JlYXRlRGVidWcuZGVzdHJveSA9IGRlc3Ryb3k7XG5cblx0T2JqZWN0LmtleXMoZW52KS5mb3JFYWNoKGtleSA9PiB7XG5cdFx0Y3JlYXRlRGVidWdba2V5XSA9IGVudltrZXldO1xuXHR9KTtcblxuXHQvKipcblx0KiBUaGUgY3VycmVudGx5IGFjdGl2ZSBkZWJ1ZyBtb2RlIG5hbWVzLCBhbmQgbmFtZXMgdG8gc2tpcC5cblx0Ki9cblxuXHRjcmVhdGVEZWJ1Zy5uYW1lcyA9IFtdO1xuXHRjcmVhdGVEZWJ1Zy5za2lwcyA9IFtdO1xuXG5cdC8qKlxuXHQqIE1hcCBvZiBzcGVjaWFsIFwiJW5cIiBoYW5kbGluZyBmdW5jdGlvbnMsIGZvciB0aGUgZGVidWcgXCJmb3JtYXRcIiBhcmd1bWVudC5cblx0KlxuXHQqIFZhbGlkIGtleSBuYW1lcyBhcmUgYSBzaW5nbGUsIGxvd2VyIG9yIHVwcGVyLWNhc2UgbGV0dGVyLCBpLmUuIFwiblwiIGFuZCBcIk5cIi5cblx0Ki9cblx0Y3JlYXRlRGVidWcuZm9ybWF0dGVycyA9IHt9O1xuXG5cdC8qKlxuXHQqIFNlbGVjdHMgYSBjb2xvciBmb3IgYSBkZWJ1ZyBuYW1lc3BhY2Vcblx0KiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlIFRoZSBuYW1lc3BhY2Ugc3RyaW5nIGZvciB0aGUgZGVidWcgaW5zdGFuY2UgdG8gYmUgY29sb3JlZFxuXHQqIEByZXR1cm4ge051bWJlcnxTdHJpbmd9IEFuIEFOU0kgY29sb3IgY29kZSBmb3IgdGhlIGdpdmVuIG5hbWVzcGFjZVxuXHQqIEBhcGkgcHJpdmF0ZVxuXHQqL1xuXHRmdW5jdGlvbiBzZWxlY3RDb2xvcihuYW1lc3BhY2UpIHtcblx0XHRsZXQgaGFzaCA9IDA7XG5cblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IG5hbWVzcGFjZS5sZW5ndGg7IGkrKykge1xuXHRcdFx0aGFzaCA9ICgoaGFzaCA8PCA1KSAtIGhhc2gpICsgbmFtZXNwYWNlLmNoYXJDb2RlQXQoaSk7XG5cdFx0XHRoYXNoIHw9IDA7IC8vIENvbnZlcnQgdG8gMzJiaXQgaW50ZWdlclxuXHRcdH1cblxuXHRcdHJldHVybiBjcmVhdGVEZWJ1Zy5jb2xvcnNbTWF0aC5hYnMoaGFzaCkgJSBjcmVhdGVEZWJ1Zy5jb2xvcnMubGVuZ3RoXTtcblx0fVxuXHRjcmVhdGVEZWJ1Zy5zZWxlY3RDb2xvciA9IHNlbGVjdENvbG9yO1xuXG5cdC8qKlxuXHQqIENyZWF0ZSBhIGRlYnVnZ2VyIHdpdGggdGhlIGdpdmVuIGBuYW1lc3BhY2VgLlxuXHQqXG5cdCogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZVxuXHQqIEByZXR1cm4ge0Z1bmN0aW9ufVxuXHQqIEBhcGkgcHVibGljXG5cdCovXG5cdGZ1bmN0aW9uIGNyZWF0ZURlYnVnKG5hbWVzcGFjZSkge1xuXHRcdGxldCBwcmV2VGltZTtcblx0XHRsZXQgZW5hYmxlT3ZlcnJpZGUgPSBudWxsO1xuXHRcdGxldCBuYW1lc3BhY2VzQ2FjaGU7XG5cdFx0bGV0IGVuYWJsZWRDYWNoZTtcblxuXHRcdGZ1bmN0aW9uIGRlYnVnKC4uLmFyZ3MpIHtcblx0XHRcdC8vIERpc2FibGVkP1xuXHRcdFx0aWYgKCFkZWJ1Zy5lbmFibGVkKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Y29uc3Qgc2VsZiA9IGRlYnVnO1xuXG5cdFx0XHQvLyBTZXQgYGRpZmZgIHRpbWVzdGFtcFxuXHRcdFx0Y29uc3QgY3VyciA9IE51bWJlcihuZXcgRGF0ZSgpKTtcblx0XHRcdGNvbnN0IG1zID0gY3VyciAtIChwcmV2VGltZSB8fCBjdXJyKTtcblx0XHRcdHNlbGYuZGlmZiA9IG1zO1xuXHRcdFx0c2VsZi5wcmV2ID0gcHJldlRpbWU7XG5cdFx0XHRzZWxmLmN1cnIgPSBjdXJyO1xuXHRcdFx0cHJldlRpbWUgPSBjdXJyO1xuXG5cdFx0XHRhcmdzWzBdID0gY3JlYXRlRGVidWcuY29lcmNlKGFyZ3NbMF0pO1xuXG5cdFx0XHRpZiAodHlwZW9mIGFyZ3NbMF0gIT09ICdzdHJpbmcnKSB7XG5cdFx0XHRcdC8vIEFueXRoaW5nIGVsc2UgbGV0J3MgaW5zcGVjdCB3aXRoICVPXG5cdFx0XHRcdGFyZ3MudW5zaGlmdCgnJU8nKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQXBwbHkgYW55IGBmb3JtYXR0ZXJzYCB0cmFuc2Zvcm1hdGlvbnNcblx0XHRcdGxldCBpbmRleCA9IDA7XG5cdFx0XHRhcmdzWzBdID0gYXJnc1swXS5yZXBsYWNlKC8lKFthLXpBLVolXSkvZywgKG1hdGNoLCBmb3JtYXQpID0+IHtcblx0XHRcdFx0Ly8gSWYgd2UgZW5jb3VudGVyIGFuIGVzY2FwZWQgJSB0aGVuIGRvbid0IGluY3JlYXNlIHRoZSBhcnJheSBpbmRleFxuXHRcdFx0XHRpZiAobWF0Y2ggPT09ICclJScpIHtcblx0XHRcdFx0XHRyZXR1cm4gJyUnO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGluZGV4Kys7XG5cdFx0XHRcdGNvbnN0IGZvcm1hdHRlciA9IGNyZWF0ZURlYnVnLmZvcm1hdHRlcnNbZm9ybWF0XTtcblx0XHRcdFx0aWYgKHR5cGVvZiBmb3JtYXR0ZXIgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0XHRjb25zdCB2YWwgPSBhcmdzW2luZGV4XTtcblx0XHRcdFx0XHRtYXRjaCA9IGZvcm1hdHRlci5jYWxsKHNlbGYsIHZhbCk7XG5cblx0XHRcdFx0XHQvLyBOb3cgd2UgbmVlZCB0byByZW1vdmUgYGFyZ3NbaW5kZXhdYCBzaW5jZSBpdCdzIGlubGluZWQgaW4gdGhlIGBmb3JtYXRgXG5cdFx0XHRcdFx0YXJncy5zcGxpY2UoaW5kZXgsIDEpO1xuXHRcdFx0XHRcdGluZGV4LS07XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIG1hdGNoO1xuXHRcdFx0fSk7XG5cblx0XHRcdC8vIEFwcGx5IGVudi1zcGVjaWZpYyBmb3JtYXR0aW5nIChjb2xvcnMsIGV0Yy4pXG5cdFx0XHRjcmVhdGVEZWJ1Zy5mb3JtYXRBcmdzLmNhbGwoc2VsZiwgYXJncyk7XG5cblx0XHRcdGNvbnN0IGxvZ0ZuID0gc2VsZi5sb2cgfHwgY3JlYXRlRGVidWcubG9nO1xuXHRcdFx0bG9nRm4uYXBwbHkoc2VsZiwgYXJncyk7XG5cdFx0fVxuXG5cdFx0ZGVidWcubmFtZXNwYWNlID0gbmFtZXNwYWNlO1xuXHRcdGRlYnVnLnVzZUNvbG9ycyA9IGNyZWF0ZURlYnVnLnVzZUNvbG9ycygpO1xuXHRcdGRlYnVnLmNvbG9yID0gY3JlYXRlRGVidWcuc2VsZWN0Q29sb3IobmFtZXNwYWNlKTtcblx0XHRkZWJ1Zy5leHRlbmQgPSBleHRlbmQ7XG5cdFx0ZGVidWcuZGVzdHJveSA9IGNyZWF0ZURlYnVnLmRlc3Ryb3k7IC8vIFhYWCBUZW1wb3JhcnkuIFdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgbmV4dCBtYWpvciByZWxlYXNlLlxuXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGRlYnVnLCAnZW5hYmxlZCcsIHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuXHRcdFx0Z2V0OiAoKSA9PiB7XG5cdFx0XHRcdGlmIChlbmFibGVPdmVycmlkZSAhPT0gbnVsbCkge1xuXHRcdFx0XHRcdHJldHVybiBlbmFibGVPdmVycmlkZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAobmFtZXNwYWNlc0NhY2hlICE9PSBjcmVhdGVEZWJ1Zy5uYW1lc3BhY2VzKSB7XG5cdFx0XHRcdFx0bmFtZXNwYWNlc0NhY2hlID0gY3JlYXRlRGVidWcubmFtZXNwYWNlcztcblx0XHRcdFx0XHRlbmFibGVkQ2FjaGUgPSBjcmVhdGVEZWJ1Zy5lbmFibGVkKG5hbWVzcGFjZSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gZW5hYmxlZENhY2hlO1xuXHRcdFx0fSxcblx0XHRcdHNldDogdiA9PiB7XG5cdFx0XHRcdGVuYWJsZU92ZXJyaWRlID0gdjtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdC8vIEVudi1zcGVjaWZpYyBpbml0aWFsaXphdGlvbiBsb2dpYyBmb3IgZGVidWcgaW5zdGFuY2VzXG5cdFx0aWYgKHR5cGVvZiBjcmVhdGVEZWJ1Zy5pbml0ID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRjcmVhdGVEZWJ1Zy5pbml0KGRlYnVnKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZGVidWc7XG5cdH1cblxuXHRmdW5jdGlvbiBleHRlbmQobmFtZXNwYWNlLCBkZWxpbWl0ZXIpIHtcblx0XHRjb25zdCBuZXdEZWJ1ZyA9IGNyZWF0ZURlYnVnKHRoaXMubmFtZXNwYWNlICsgKHR5cGVvZiBkZWxpbWl0ZXIgPT09ICd1bmRlZmluZWQnID8gJzonIDogZGVsaW1pdGVyKSArIG5hbWVzcGFjZSk7XG5cdFx0bmV3RGVidWcubG9nID0gdGhpcy5sb2c7XG5cdFx0cmV0dXJuIG5ld0RlYnVnO1xuXHR9XG5cblx0LyoqXG5cdCogRW5hYmxlcyBhIGRlYnVnIG1vZGUgYnkgbmFtZXNwYWNlcy4gVGhpcyBjYW4gaW5jbHVkZSBtb2Rlc1xuXHQqIHNlcGFyYXRlZCBieSBhIGNvbG9uIGFuZCB3aWxkY2FyZHMuXG5cdCpcblx0KiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlc1xuXHQqIEBhcGkgcHVibGljXG5cdCovXG5cdGZ1bmN0aW9uIGVuYWJsZShuYW1lc3BhY2VzKSB7XG5cdFx0Y3JlYXRlRGVidWcuc2F2ZShuYW1lc3BhY2VzKTtcblx0XHRjcmVhdGVEZWJ1Zy5uYW1lc3BhY2VzID0gbmFtZXNwYWNlcztcblxuXHRcdGNyZWF0ZURlYnVnLm5hbWVzID0gW107XG5cdFx0Y3JlYXRlRGVidWcuc2tpcHMgPSBbXTtcblxuXHRcdGxldCBpO1xuXHRcdGNvbnN0IHNwbGl0ID0gKHR5cGVvZiBuYW1lc3BhY2VzID09PSAnc3RyaW5nJyA/IG5hbWVzcGFjZXMgOiAnJykuc3BsaXQoL1tcXHMsXSsvKTtcblx0XHRjb25zdCBsZW4gPSBzcGxpdC5sZW5ndGg7XG5cblx0XHRmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcblx0XHRcdGlmICghc3BsaXRbaV0pIHtcblx0XHRcdFx0Ly8gaWdub3JlIGVtcHR5IHN0cmluZ3Ncblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHR9XG5cblx0XHRcdG5hbWVzcGFjZXMgPSBzcGxpdFtpXS5yZXBsYWNlKC9cXCovZywgJy4qPycpO1xuXG5cdFx0XHRpZiAobmFtZXNwYWNlc1swXSA9PT0gJy0nKSB7XG5cdFx0XHRcdGNyZWF0ZURlYnVnLnNraXBzLnB1c2gobmV3IFJlZ0V4cCgnXicgKyBuYW1lc3BhY2VzLnNsaWNlKDEpICsgJyQnKSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRjcmVhdGVEZWJ1Zy5uYW1lcy5wdXNoKG5ldyBSZWdFeHAoJ14nICsgbmFtZXNwYWNlcyArICckJykpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQqIERpc2FibGUgZGVidWcgb3V0cHV0LlxuXHQqXG5cdCogQHJldHVybiB7U3RyaW5nfSBuYW1lc3BhY2VzXG5cdCogQGFwaSBwdWJsaWNcblx0Ki9cblx0ZnVuY3Rpb24gZGlzYWJsZSgpIHtcblx0XHRjb25zdCBuYW1lc3BhY2VzID0gW1xuXHRcdFx0Li4uY3JlYXRlRGVidWcubmFtZXMubWFwKHRvTmFtZXNwYWNlKSxcblx0XHRcdC4uLmNyZWF0ZURlYnVnLnNraXBzLm1hcCh0b05hbWVzcGFjZSkubWFwKG5hbWVzcGFjZSA9PiAnLScgKyBuYW1lc3BhY2UpXG5cdFx0XS5qb2luKCcsJyk7XG5cdFx0Y3JlYXRlRGVidWcuZW5hYmxlKCcnKTtcblx0XHRyZXR1cm4gbmFtZXNwYWNlcztcblx0fVxuXG5cdC8qKlxuXHQqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZ2l2ZW4gbW9kZSBuYW1lIGlzIGVuYWJsZWQsIGZhbHNlIG90aGVyd2lzZS5cblx0KlxuXHQqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG5cdCogQHJldHVybiB7Qm9vbGVhbn1cblx0KiBAYXBpIHB1YmxpY1xuXHQqL1xuXHRmdW5jdGlvbiBlbmFibGVkKG5hbWUpIHtcblx0XHRpZiAobmFtZVtuYW1lLmxlbmd0aCAtIDFdID09PSAnKicpIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdGxldCBpO1xuXHRcdGxldCBsZW47XG5cblx0XHRmb3IgKGkgPSAwLCBsZW4gPSBjcmVhdGVEZWJ1Zy5za2lwcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuXHRcdFx0aWYgKGNyZWF0ZURlYnVnLnNraXBzW2ldLnRlc3QobmFtZSkpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGZvciAoaSA9IDAsIGxlbiA9IGNyZWF0ZURlYnVnLm5hbWVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0XHRpZiAoY3JlYXRlRGVidWcubmFtZXNbaV0udGVzdChuYW1lKSkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHQvKipcblx0KiBDb252ZXJ0IHJlZ2V4cCB0byBuYW1lc3BhY2Vcblx0KlxuXHQqIEBwYXJhbSB7UmVnRXhwfSByZWd4ZXBcblx0KiBAcmV0dXJuIHtTdHJpbmd9IG5hbWVzcGFjZVxuXHQqIEBhcGkgcHJpdmF0ZVxuXHQqL1xuXHRmdW5jdGlvbiB0b05hbWVzcGFjZShyZWdleHApIHtcblx0XHRyZXR1cm4gcmVnZXhwLnRvU3RyaW5nKClcblx0XHRcdC5zdWJzdHJpbmcoMiwgcmVnZXhwLnRvU3RyaW5nKCkubGVuZ3RoIC0gMilcblx0XHRcdC5yZXBsYWNlKC9cXC5cXCpcXD8kLywgJyonKTtcblx0fVxuXG5cdC8qKlxuXHQqIENvZXJjZSBgdmFsYC5cblx0KlxuXHQqIEBwYXJhbSB7TWl4ZWR9IHZhbFxuXHQqIEByZXR1cm4ge01peGVkfVxuXHQqIEBhcGkgcHJpdmF0ZVxuXHQqL1xuXHRmdW5jdGlvbiBjb2VyY2UodmFsKSB7XG5cdFx0aWYgKHZhbCBpbnN0YW5jZW9mIEVycm9yKSB7XG5cdFx0XHRyZXR1cm4gdmFsLnN0YWNrIHx8IHZhbC5tZXNzYWdlO1xuXHRcdH1cblx0XHRyZXR1cm4gdmFsO1xuXHR9XG5cblx0LyoqXG5cdCogWFhYIERPIE5PVCBVU0UuIFRoaXMgaXMgYSB0ZW1wb3Jhcnkgc3R1YiBmdW5jdGlvbi5cblx0KiBYWFggSXQgV0lMTCBiZSByZW1vdmVkIGluIHRoZSBuZXh0IG1ham9yIHJlbGVhc2UuXG5cdCovXG5cdGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG5cdFx0Y29uc29sZS53YXJuKCdJbnN0YW5jZSBtZXRob2QgYGRlYnVnLmRlc3Ryb3koKWAgaXMgZGVwcmVjYXRlZCBhbmQgbm8gbG9uZ2VyIGRvZXMgYW55dGhpbmcuIEl0IHdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgbmV4dCBtYWpvciB2ZXJzaW9uIG9mIGBkZWJ1Z2AuJyk7XG5cdH1cblxuXHRjcmVhdGVEZWJ1Zy5lbmFibGUoY3JlYXRlRGVidWcubG9hZCgpKTtcblxuXHRyZXR1cm4gY3JlYXRlRGVidWc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0dXA7XG4iLCIvKiBlc2xpbnQtZW52IGJyb3dzZXIgKi9cblxuLyoqXG4gKiBUaGlzIGlzIHRoZSB3ZWIgYnJvd3NlciBpbXBsZW1lbnRhdGlvbiBvZiBgZGVidWcoKWAuXG4gKi9cblxuZXhwb3J0cy5mb3JtYXRBcmdzID0gZm9ybWF0QXJncztcbmV4cG9ydHMuc2F2ZSA9IHNhdmU7XG5leHBvcnRzLmxvYWQgPSBsb2FkO1xuZXhwb3J0cy51c2VDb2xvcnMgPSB1c2VDb2xvcnM7XG5leHBvcnRzLnN0b3JhZ2UgPSBsb2NhbHN0b3JhZ2UoKTtcbmV4cG9ydHMuZGVzdHJveSA9ICgoKSA9PiB7XG5cdGxldCB3YXJuZWQgPSBmYWxzZTtcblxuXHRyZXR1cm4gKCkgPT4ge1xuXHRcdGlmICghd2FybmVkKSB7XG5cdFx0XHR3YXJuZWQgPSB0cnVlO1xuXHRcdFx0Y29uc29sZS53YXJuKCdJbnN0YW5jZSBtZXRob2QgYGRlYnVnLmRlc3Ryb3koKWAgaXMgZGVwcmVjYXRlZCBhbmQgbm8gbG9uZ2VyIGRvZXMgYW55dGhpbmcuIEl0IHdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgbmV4dCBtYWpvciB2ZXJzaW9uIG9mIGBkZWJ1Z2AuJyk7XG5cdFx0fVxuXHR9O1xufSkoKTtcblxuLyoqXG4gKiBDb2xvcnMuXG4gKi9cblxuZXhwb3J0cy5jb2xvcnMgPSBbXG5cdCcjMDAwMENDJyxcblx0JyMwMDAwRkYnLFxuXHQnIzAwMzNDQycsXG5cdCcjMDAzM0ZGJyxcblx0JyMwMDY2Q0MnLFxuXHQnIzAwNjZGRicsXG5cdCcjMDA5OUNDJyxcblx0JyMwMDk5RkYnLFxuXHQnIzAwQ0MwMCcsXG5cdCcjMDBDQzMzJyxcblx0JyMwMENDNjYnLFxuXHQnIzAwQ0M5OScsXG5cdCcjMDBDQ0NDJyxcblx0JyMwMENDRkYnLFxuXHQnIzMzMDBDQycsXG5cdCcjMzMwMEZGJyxcblx0JyMzMzMzQ0MnLFxuXHQnIzMzMzNGRicsXG5cdCcjMzM2NkNDJyxcblx0JyMzMzY2RkYnLFxuXHQnIzMzOTlDQycsXG5cdCcjMzM5OUZGJyxcblx0JyMzM0NDMDAnLFxuXHQnIzMzQ0MzMycsXG5cdCcjMzNDQzY2Jyxcblx0JyMzM0NDOTknLFxuXHQnIzMzQ0NDQycsXG5cdCcjMzNDQ0ZGJyxcblx0JyM2NjAwQ0MnLFxuXHQnIzY2MDBGRicsXG5cdCcjNjYzM0NDJyxcblx0JyM2NjMzRkYnLFxuXHQnIzY2Q0MwMCcsXG5cdCcjNjZDQzMzJyxcblx0JyM5OTAwQ0MnLFxuXHQnIzk5MDBGRicsXG5cdCcjOTkzM0NDJyxcblx0JyM5OTMzRkYnLFxuXHQnIzk5Q0MwMCcsXG5cdCcjOTlDQzMzJyxcblx0JyNDQzAwMDAnLFxuXHQnI0NDMDAzMycsXG5cdCcjQ0MwMDY2Jyxcblx0JyNDQzAwOTknLFxuXHQnI0NDMDBDQycsXG5cdCcjQ0MwMEZGJyxcblx0JyNDQzMzMDAnLFxuXHQnI0NDMzMzMycsXG5cdCcjQ0MzMzY2Jyxcblx0JyNDQzMzOTknLFxuXHQnI0NDMzNDQycsXG5cdCcjQ0MzM0ZGJyxcblx0JyNDQzY2MDAnLFxuXHQnI0NDNjYzMycsXG5cdCcjQ0M5OTAwJyxcblx0JyNDQzk5MzMnLFxuXHQnI0NDQ0MwMCcsXG5cdCcjQ0NDQzMzJyxcblx0JyNGRjAwMDAnLFxuXHQnI0ZGMDAzMycsXG5cdCcjRkYwMDY2Jyxcblx0JyNGRjAwOTknLFxuXHQnI0ZGMDBDQycsXG5cdCcjRkYwMEZGJyxcblx0JyNGRjMzMDAnLFxuXHQnI0ZGMzMzMycsXG5cdCcjRkYzMzY2Jyxcblx0JyNGRjMzOTknLFxuXHQnI0ZGMzNDQycsXG5cdCcjRkYzM0ZGJyxcblx0JyNGRjY2MDAnLFxuXHQnI0ZGNjYzMycsXG5cdCcjRkY5OTAwJyxcblx0JyNGRjk5MzMnLFxuXHQnI0ZGQ0MwMCcsXG5cdCcjRkZDQzMzJ1xuXTtcblxuLyoqXG4gKiBDdXJyZW50bHkgb25seSBXZWJLaXQtYmFzZWQgV2ViIEluc3BlY3RvcnMsIEZpcmVmb3ggPj0gdjMxLFxuICogYW5kIHRoZSBGaXJlYnVnIGV4dGVuc2lvbiAoYW55IEZpcmVmb3ggdmVyc2lvbikgYXJlIGtub3duXG4gKiB0byBzdXBwb3J0IFwiJWNcIiBDU1MgY3VzdG9taXphdGlvbnMuXG4gKlxuICogVE9ETzogYWRkIGEgYGxvY2FsU3RvcmFnZWAgdmFyaWFibGUgdG8gZXhwbGljaXRseSBlbmFibGUvZGlzYWJsZSBjb2xvcnNcbiAqL1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29tcGxleGl0eVxuZnVuY3Rpb24gdXNlQ29sb3JzKCkge1xuXHQvLyBOQjogSW4gYW4gRWxlY3Ryb24gcHJlbG9hZCBzY3JpcHQsIGRvY3VtZW50IHdpbGwgYmUgZGVmaW5lZCBidXQgbm90IGZ1bGx5XG5cdC8vIGluaXRpYWxpemVkLiBTaW5jZSB3ZSBrbm93IHdlJ3JlIGluIENocm9tZSwgd2UnbGwganVzdCBkZXRlY3QgdGhpcyBjYXNlXG5cdC8vIGV4cGxpY2l0bHlcblx0aWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5wcm9jZXNzICYmICh3aW5kb3cucHJvY2Vzcy50eXBlID09PSAncmVuZGVyZXInIHx8IHdpbmRvdy5wcm9jZXNzLl9fbndqcykpIHtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdC8vIEludGVybmV0IEV4cGxvcmVyIGFuZCBFZGdlIGRvIG5vdCBzdXBwb3J0IGNvbG9ycy5cblx0aWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvci51c2VyQWdlbnQgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLm1hdGNoKC8oZWRnZXx0cmlkZW50KVxcLyhcXGQrKS8pKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0bGV0IG07XG5cblx0Ly8gSXMgd2Via2l0PyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8xNjQ1OTYwNi8zNzY3NzNcblx0Ly8gZG9jdW1lbnQgaXMgdW5kZWZpbmVkIGluIHJlYWN0LW5hdGl2ZTogaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0LW5hdGl2ZS9wdWxsLzE2MzJcblx0cmV0dXJuICh0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLldlYmtpdEFwcGVhcmFuY2UpIHx8XG5cdFx0Ly8gSXMgZmlyZWJ1Zz8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMzk4MTIwLzM3Njc3M1xuXHRcdCh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuY29uc29sZSAmJiAod2luZG93LmNvbnNvbGUuZmlyZWJ1ZyB8fCAod2luZG93LmNvbnNvbGUuZXhjZXB0aW9uICYmIHdpbmRvdy5jb25zb2xlLnRhYmxlKSkpIHx8XG5cdFx0Ly8gSXMgZmlyZWZveCA+PSB2MzE/XG5cdFx0Ly8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9Ub29scy9XZWJfQ29uc29sZSNTdHlsaW5nX21lc3NhZ2VzXG5cdFx0KHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvci51c2VyQWdlbnQgJiYgKG0gPSBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkubWF0Y2goL2ZpcmVmb3hcXC8oXFxkKykvKSkgJiYgcGFyc2VJbnQobVsxXSwgMTApID49IDMxKSB8fFxuXHRcdC8vIERvdWJsZSBjaGVjayB3ZWJraXQgaW4gdXNlckFnZW50IGp1c3QgaW4gY2FzZSB3ZSBhcmUgaW4gYSB3b3JrZXJcblx0XHQodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudCAmJiBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkubWF0Y2goL2FwcGxld2Via2l0XFwvKFxcZCspLykpO1xufVxuXG4vKipcbiAqIENvbG9yaXplIGxvZyBhcmd1bWVudHMgaWYgZW5hYmxlZC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGZvcm1hdEFyZ3MoYXJncykge1xuXHRhcmdzWzBdID0gKHRoaXMudXNlQ29sb3JzID8gJyVjJyA6ICcnKSArXG5cdFx0dGhpcy5uYW1lc3BhY2UgK1xuXHRcdCh0aGlzLnVzZUNvbG9ycyA/ICcgJWMnIDogJyAnKSArXG5cdFx0YXJnc1swXSArXG5cdFx0KHRoaXMudXNlQ29sb3JzID8gJyVjICcgOiAnICcpICtcblx0XHQnKycgKyBtb2R1bGUuZXhwb3J0cy5odW1hbml6ZSh0aGlzLmRpZmYpO1xuXG5cdGlmICghdGhpcy51c2VDb2xvcnMpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRjb25zdCBjID0gJ2NvbG9yOiAnICsgdGhpcy5jb2xvcjtcblx0YXJncy5zcGxpY2UoMSwgMCwgYywgJ2NvbG9yOiBpbmhlcml0Jyk7XG5cblx0Ly8gVGhlIGZpbmFsIFwiJWNcIiBpcyBzb21ld2hhdCB0cmlja3ksIGJlY2F1c2UgdGhlcmUgY291bGQgYmUgb3RoZXJcblx0Ly8gYXJndW1lbnRzIHBhc3NlZCBlaXRoZXIgYmVmb3JlIG9yIGFmdGVyIHRoZSAlYywgc28gd2UgbmVlZCB0b1xuXHQvLyBmaWd1cmUgb3V0IHRoZSBjb3JyZWN0IGluZGV4IHRvIGluc2VydCB0aGUgQ1NTIGludG9cblx0bGV0IGluZGV4ID0gMDtcblx0bGV0IGxhc3RDID0gMDtcblx0YXJnc1swXS5yZXBsYWNlKC8lW2EtekEtWiVdL2csIG1hdGNoID0+IHtcblx0XHRpZiAobWF0Y2ggPT09ICclJScpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0aW5kZXgrKztcblx0XHRpZiAobWF0Y2ggPT09ICclYycpIHtcblx0XHRcdC8vIFdlIG9ubHkgYXJlIGludGVyZXN0ZWQgaW4gdGhlICpsYXN0KiAlY1xuXHRcdFx0Ly8gKHRoZSB1c2VyIG1heSBoYXZlIHByb3ZpZGVkIHRoZWlyIG93bilcblx0XHRcdGxhc3RDID0gaW5kZXg7XG5cdFx0fVxuXHR9KTtcblxuXHRhcmdzLnNwbGljZShsYXN0QywgMCwgYyk7XG59XG5cbi8qKlxuICogSW52b2tlcyBgY29uc29sZS5kZWJ1ZygpYCB3aGVuIGF2YWlsYWJsZS5cbiAqIE5vLW9wIHdoZW4gYGNvbnNvbGUuZGVidWdgIGlzIG5vdCBhIFwiZnVuY3Rpb25cIi5cbiAqIElmIGBjb25zb2xlLmRlYnVnYCBpcyBub3QgYXZhaWxhYmxlLCBmYWxscyBiYWNrXG4gKiB0byBgY29uc29sZS5sb2dgLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cbmV4cG9ydHMubG9nID0gY29uc29sZS5kZWJ1ZyB8fCBjb25zb2xlLmxvZyB8fCAoKCkgPT4ge30pO1xuXG4vKipcbiAqIFNhdmUgYG5hbWVzcGFjZXNgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2VzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gc2F2ZShuYW1lc3BhY2VzKSB7XG5cdHRyeSB7XG5cdFx0aWYgKG5hbWVzcGFjZXMpIHtcblx0XHRcdGV4cG9ydHMuc3RvcmFnZS5zZXRJdGVtKCdkZWJ1ZycsIG5hbWVzcGFjZXMpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRleHBvcnRzLnN0b3JhZ2UucmVtb3ZlSXRlbSgnZGVidWcnKTtcblx0XHR9XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0Ly8gU3dhbGxvd1xuXHRcdC8vIFhYWCAoQFFpeC0pIHNob3VsZCB3ZSBiZSBsb2dnaW5nIHRoZXNlP1xuXHR9XG59XG5cbi8qKlxuICogTG9hZCBgbmFtZXNwYWNlc2AuXG4gKlxuICogQHJldHVybiB7U3RyaW5nfSByZXR1cm5zIHRoZSBwcmV2aW91c2x5IHBlcnNpc3RlZCBkZWJ1ZyBtb2Rlc1xuICogQGFwaSBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGxvYWQoKSB7XG5cdGxldCByO1xuXHR0cnkge1xuXHRcdHIgPSBleHBvcnRzLnN0b3JhZ2UuZ2V0SXRlbSgnZGVidWcnKTtcblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHQvLyBTd2FsbG93XG5cdFx0Ly8gWFhYIChAUWl4LSkgc2hvdWxkIHdlIGJlIGxvZ2dpbmcgdGhlc2U/XG5cdH1cblxuXHQvLyBJZiBkZWJ1ZyBpc24ndCBzZXQgaW4gTFMsIGFuZCB3ZSdyZSBpbiBFbGVjdHJvbiwgdHJ5IHRvIGxvYWQgJERFQlVHXG5cdGlmICghciAmJiB0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgJ2VudicgaW4gcHJvY2Vzcykge1xuXHRcdHIgPSBwcm9jZXNzLmVudi5ERUJVRztcblx0fVxuXG5cdHJldHVybiByO1xufVxuXG4vKipcbiAqIExvY2Fsc3RvcmFnZSBhdHRlbXB0cyB0byByZXR1cm4gdGhlIGxvY2Fsc3RvcmFnZS5cbiAqXG4gKiBUaGlzIGlzIG5lY2Vzc2FyeSBiZWNhdXNlIHNhZmFyaSB0aHJvd3NcbiAqIHdoZW4gYSB1c2VyIGRpc2FibGVzIGNvb2tpZXMvbG9jYWxzdG9yYWdlXG4gKiBhbmQgeW91IGF0dGVtcHQgdG8gYWNjZXNzIGl0LlxuICpcbiAqIEByZXR1cm4ge0xvY2FsU3RvcmFnZX1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGxvY2Fsc3RvcmFnZSgpIHtcblx0dHJ5IHtcblx0XHQvLyBUVk1MS2l0IChBcHBsZSBUViBKUyBSdW50aW1lKSBkb2VzIG5vdCBoYXZlIGEgd2luZG93IG9iamVjdCwganVzdCBsb2NhbFN0b3JhZ2UgaW4gdGhlIGdsb2JhbCBjb250ZXh0XG5cdFx0Ly8gVGhlIEJyb3dzZXIgYWxzbyBoYXMgbG9jYWxTdG9yYWdlIGluIHRoZSBnbG9iYWwgY29udGV4dC5cblx0XHRyZXR1cm4gbG9jYWxTdG9yYWdlO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdC8vIFN3YWxsb3dcblx0XHQvLyBYWFggKEBRaXgtKSBzaG91bGQgd2UgYmUgbG9nZ2luZyB0aGVzZT9cblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vY29tbW9uJykoZXhwb3J0cyk7XG5cbmNvbnN0IHtmb3JtYXR0ZXJzfSA9IG1vZHVsZS5leHBvcnRzO1xuXG4vKipcbiAqIE1hcCAlaiB0byBgSlNPTi5zdHJpbmdpZnkoKWAsIHNpbmNlIG5vIFdlYiBJbnNwZWN0b3JzIGRvIHRoYXQgYnkgZGVmYXVsdC5cbiAqL1xuXG5mb3JtYXR0ZXJzLmogPSBmdW5jdGlvbiAodikge1xuXHR0cnkge1xuXHRcdHJldHVybiBKU09OLnN0cmluZ2lmeSh2KTtcblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRyZXR1cm4gJ1tVbmV4cGVjdGVkSlNPTlBhcnNlRXJyb3JdOiAnICsgZXJyb3IubWVzc2FnZTtcblx0fVxufTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5UcmFuc3BvcnQgPSBleHBvcnRzLlRyYW5zcG9ydEVycm9yID0gdm9pZCAwO1xuY29uc3QgZW5naW5lX2lvX3BhcnNlcl8xID0gcmVxdWlyZShcImVuZ2luZS5pby1wYXJzZXJcIik7XG5jb25zdCBjb21wb25lbnRfZW1pdHRlcl8xID0gcmVxdWlyZShcIkBzb2NrZXQuaW8vY29tcG9uZW50LWVtaXR0ZXJcIik7XG5jb25zdCB1dGlsX2pzXzEgPSByZXF1aXJlKFwiLi91dGlsLmpzXCIpO1xuY29uc3QgcGFyc2Vxc19qc18xID0gcmVxdWlyZShcIi4vY29udHJpYi9wYXJzZXFzLmpzXCIpO1xuY29uc3QgZGVidWdfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiZGVidWdcIikpOyAvLyBkZWJ1ZygpXG5jb25zdCBkZWJ1ZyA9ICgwLCBkZWJ1Z18xLmRlZmF1bHQpKFwiZW5naW5lLmlvLWNsaWVudDp0cmFuc3BvcnRcIik7IC8vIGRlYnVnKClcbmNsYXNzIFRyYW5zcG9ydEVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKHJlYXNvbiwgZGVzY3JpcHRpb24sIGNvbnRleHQpIHtcbiAgICAgICAgc3VwZXIocmVhc29uKTtcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgICAgICB0aGlzLnR5cGUgPSBcIlRyYW5zcG9ydEVycm9yXCI7XG4gICAgfVxufVxuZXhwb3J0cy5UcmFuc3BvcnRFcnJvciA9IFRyYW5zcG9ydEVycm9yO1xuY2xhc3MgVHJhbnNwb3J0IGV4dGVuZHMgY29tcG9uZW50X2VtaXR0ZXJfMS5FbWl0dGVyIHtcbiAgICAvKipcbiAgICAgKiBUcmFuc3BvcnQgYWJzdHJhY3QgY29uc3RydWN0b3IuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0cyAtIG9wdGlvbnNcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0cykge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLndyaXRhYmxlID0gZmFsc2U7XG4gICAgICAgICgwLCB1dGlsX2pzXzEuaW5zdGFsbFRpbWVyRnVuY3Rpb25zKSh0aGlzLCBvcHRzKTtcbiAgICAgICAgdGhpcy5vcHRzID0gb3B0cztcbiAgICAgICAgdGhpcy5xdWVyeSA9IG9wdHMucXVlcnk7XG4gICAgICAgIHRoaXMuc29ja2V0ID0gb3B0cy5zb2NrZXQ7XG4gICAgICAgIHRoaXMuc3VwcG9ydHNCaW5hcnkgPSAhb3B0cy5mb3JjZUJhc2U2NDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRW1pdHMgYW4gZXJyb3IuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gcmVhc29uXG4gICAgICogQHBhcmFtIGRlc2NyaXB0aW9uXG4gICAgICogQHBhcmFtIGNvbnRleHQgLSB0aGUgZXJyb3IgY29udGV4dFxuICAgICAqIEByZXR1cm4ge1RyYW5zcG9ydH0gZm9yIGNoYWluaW5nXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIG9uRXJyb3IocmVhc29uLCBkZXNjcmlwdGlvbiwgY29udGV4dCkge1xuICAgICAgICBzdXBlci5lbWl0UmVzZXJ2ZWQoXCJlcnJvclwiLCBuZXcgVHJhbnNwb3J0RXJyb3IocmVhc29uLCBkZXNjcmlwdGlvbiwgY29udGV4dCkpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogT3BlbnMgdGhlIHRyYW5zcG9ydC5cbiAgICAgKi9cbiAgICBvcGVuKCkge1xuICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSBcIm9wZW5pbmdcIjtcbiAgICAgICAgdGhpcy5kb09wZW4oKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsb3NlcyB0aGUgdHJhbnNwb3J0LlxuICAgICAqL1xuICAgIGNsb3NlKCkge1xuICAgICAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09PSBcIm9wZW5pbmdcIiB8fCB0aGlzLnJlYWR5U3RhdGUgPT09IFwib3BlblwiKSB7XG4gICAgICAgICAgICB0aGlzLmRvQ2xvc2UoKTtcbiAgICAgICAgICAgIHRoaXMub25DbG9zZSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZW5kcyBtdWx0aXBsZSBwYWNrZXRzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtBcnJheX0gcGFja2V0c1xuICAgICAqL1xuICAgIHNlbmQocGFja2V0cykge1xuICAgICAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09PSBcIm9wZW5cIikge1xuICAgICAgICAgICAgdGhpcy53cml0ZShwYWNrZXRzKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIHRoaXMgbWlnaHQgaGFwcGVuIGlmIHRoZSB0cmFuc3BvcnQgd2FzIHNpbGVudGx5IGNsb3NlZCBpbiB0aGUgYmVmb3JldW5sb2FkIGV2ZW50IGhhbmRsZXJcbiAgICAgICAgICAgIGRlYnVnKFwidHJhbnNwb3J0IGlzIG5vdCBvcGVuLCBkaXNjYXJkaW5nIHBhY2tldHNcIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gb3BlblxuICAgICAqXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIG9uT3BlbigpIHtcbiAgICAgICAgdGhpcy5yZWFkeVN0YXRlID0gXCJvcGVuXCI7XG4gICAgICAgIHRoaXMud3JpdGFibGUgPSB0cnVlO1xuICAgICAgICBzdXBlci5lbWl0UmVzZXJ2ZWQoXCJvcGVuXCIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgd2l0aCBkYXRhLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGFcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgb25EYXRhKGRhdGEpIHtcbiAgICAgICAgY29uc3QgcGFja2V0ID0gKDAsIGVuZ2luZV9pb19wYXJzZXJfMS5kZWNvZGVQYWNrZXQpKGRhdGEsIHRoaXMuc29ja2V0LmJpbmFyeVR5cGUpO1xuICAgICAgICB0aGlzLm9uUGFja2V0KHBhY2tldCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB3aXRoIGEgZGVjb2RlZCBwYWNrZXQuXG4gICAgICpcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgb25QYWNrZXQocGFja2V0KSB7XG4gICAgICAgIHN1cGVyLmVtaXRSZXNlcnZlZChcInBhY2tldFwiLCBwYWNrZXQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgdXBvbiBjbG9zZS5cbiAgICAgKlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBvbkNsb3NlKGRldGFpbHMpIHtcbiAgICAgICAgdGhpcy5yZWFkeVN0YXRlID0gXCJjbG9zZWRcIjtcbiAgICAgICAgc3VwZXIuZW1pdFJlc2VydmVkKFwiY2xvc2VcIiwgZGV0YWlscyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBhdXNlcyB0aGUgdHJhbnNwb3J0LCBpbiBvcmRlciBub3QgdG8gbG9zZSBwYWNrZXRzIGR1cmluZyBhbiB1cGdyYWRlLlxuICAgICAqXG4gICAgICogQHBhcmFtIG9uUGF1c2VcbiAgICAgKi9cbiAgICBwYXVzZShvblBhdXNlKSB7IH1cbiAgICBjcmVhdGVVcmkoc2NoZW1hLCBxdWVyeSA9IHt9KSB7XG4gICAgICAgIHJldHVybiAoc2NoZW1hICtcbiAgICAgICAgICAgIFwiOi8vXCIgK1xuICAgICAgICAgICAgdGhpcy5faG9zdG5hbWUoKSArXG4gICAgICAgICAgICB0aGlzLl9wb3J0KCkgK1xuICAgICAgICAgICAgdGhpcy5vcHRzLnBhdGggK1xuICAgICAgICAgICAgdGhpcy5fcXVlcnkocXVlcnkpKTtcbiAgICB9XG4gICAgX2hvc3RuYW1lKCkge1xuICAgICAgICBjb25zdCBob3N0bmFtZSA9IHRoaXMub3B0cy5ob3N0bmFtZTtcbiAgICAgICAgcmV0dXJuIGhvc3RuYW1lLmluZGV4T2YoXCI6XCIpID09PSAtMSA/IGhvc3RuYW1lIDogXCJbXCIgKyBob3N0bmFtZSArIFwiXVwiO1xuICAgIH1cbiAgICBfcG9ydCgpIHtcbiAgICAgICAgaWYgKHRoaXMub3B0cy5wb3J0ICYmXG4gICAgICAgICAgICAoKHRoaXMub3B0cy5zZWN1cmUgJiYgTnVtYmVyKHRoaXMub3B0cy5wb3J0ICE9PSA0NDMpKSB8fFxuICAgICAgICAgICAgICAgICghdGhpcy5vcHRzLnNlY3VyZSAmJiBOdW1iZXIodGhpcy5vcHRzLnBvcnQpICE9PSA4MCkpKSB7XG4gICAgICAgICAgICByZXR1cm4gXCI6XCIgKyB0aGlzLm9wdHMucG9ydDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9xdWVyeShxdWVyeSkge1xuICAgICAgICBjb25zdCBlbmNvZGVkUXVlcnkgPSAoMCwgcGFyc2Vxc19qc18xLmVuY29kZSkocXVlcnkpO1xuICAgICAgICByZXR1cm4gZW5jb2RlZFF1ZXJ5Lmxlbmd0aCA/IFwiP1wiICsgZW5jb2RlZFF1ZXJ5IDogXCJcIjtcbiAgICB9XG59XG5leHBvcnRzLlRyYW5zcG9ydCA9IFRyYW5zcG9ydDtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5Qb2xsaW5nID0gdm9pZCAwO1xuY29uc3QgdHJhbnNwb3J0X2pzXzEgPSByZXF1aXJlKFwiLi4vdHJhbnNwb3J0LmpzXCIpO1xuY29uc3QgdXRpbF9qc18xID0gcmVxdWlyZShcIi4uL3V0aWwuanNcIik7XG5jb25zdCBlbmdpbmVfaW9fcGFyc2VyXzEgPSByZXF1aXJlKFwiZW5naW5lLmlvLXBhcnNlclwiKTtcbmNvbnN0IGRlYnVnXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcImRlYnVnXCIpKTsgLy8gZGVidWcoKVxuY29uc3QgZGVidWcgPSAoMCwgZGVidWdfMS5kZWZhdWx0KShcImVuZ2luZS5pby1jbGllbnQ6cG9sbGluZ1wiKTsgLy8gZGVidWcoKVxuY2xhc3MgUG9sbGluZyBleHRlbmRzIHRyYW5zcG9ydF9qc18xLlRyYW5zcG9ydCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMuX3BvbGxpbmcgPSBmYWxzZTtcbiAgICB9XG4gICAgZ2V0IG5hbWUoKSB7XG4gICAgICAgIHJldHVybiBcInBvbGxpbmdcIjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogT3BlbnMgdGhlIHNvY2tldCAodHJpZ2dlcnMgcG9sbGluZykuIFdlIHdyaXRlIGEgUElORyBtZXNzYWdlIHRvIGRldGVybWluZVxuICAgICAqIHdoZW4gdGhlIHRyYW5zcG9ydCBpcyBvcGVuLlxuICAgICAqXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGRvT3BlbigpIHtcbiAgICAgICAgdGhpcy5fcG9sbCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQYXVzZXMgcG9sbGluZy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IG9uUGF1c2UgLSBjYWxsYmFjayB1cG9uIGJ1ZmZlcnMgYXJlIGZsdXNoZWQgYW5kIHRyYW5zcG9ydCBpcyBwYXVzZWRcbiAgICAgKiBAcGFja2FnZVxuICAgICAqL1xuICAgIHBhdXNlKG9uUGF1c2UpIHtcbiAgICAgICAgdGhpcy5yZWFkeVN0YXRlID0gXCJwYXVzaW5nXCI7XG4gICAgICAgIGNvbnN0IHBhdXNlID0gKCkgPT4ge1xuICAgICAgICAgICAgZGVidWcoXCJwYXVzZWRcIik7XG4gICAgICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSBcInBhdXNlZFwiO1xuICAgICAgICAgICAgb25QYXVzZSgpO1xuICAgICAgICB9O1xuICAgICAgICBpZiAodGhpcy5fcG9sbGluZyB8fCAhdGhpcy53cml0YWJsZSkge1xuICAgICAgICAgICAgbGV0IHRvdGFsID0gMDtcbiAgICAgICAgICAgIGlmICh0aGlzLl9wb2xsaW5nKSB7XG4gICAgICAgICAgICAgICAgZGVidWcoXCJ3ZSBhcmUgY3VycmVudGx5IHBvbGxpbmcgLSB3YWl0aW5nIHRvIHBhdXNlXCIpO1xuICAgICAgICAgICAgICAgIHRvdGFsKys7XG4gICAgICAgICAgICAgICAgdGhpcy5vbmNlKFwicG9sbENvbXBsZXRlXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVidWcoXCJwcmUtcGF1c2UgcG9sbGluZyBjb21wbGV0ZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgLS10b3RhbCB8fCBwYXVzZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCF0aGlzLndyaXRhYmxlKSB7XG4gICAgICAgICAgICAgICAgZGVidWcoXCJ3ZSBhcmUgY3VycmVudGx5IHdyaXRpbmcgLSB3YWl0aW5nIHRvIHBhdXNlXCIpO1xuICAgICAgICAgICAgICAgIHRvdGFsKys7XG4gICAgICAgICAgICAgICAgdGhpcy5vbmNlKFwiZHJhaW5cIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBkZWJ1ZyhcInByZS1wYXVzZSB3cml0aW5nIGNvbXBsZXRlXCIpO1xuICAgICAgICAgICAgICAgICAgICAtLXRvdGFsIHx8IHBhdXNlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBwYXVzZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFN0YXJ0cyBwb2xsaW5nIGN5Y2xlLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfcG9sbCgpIHtcbiAgICAgICAgZGVidWcoXCJwb2xsaW5nXCIpO1xuICAgICAgICB0aGlzLl9wb2xsaW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5kb1BvbGwoKTtcbiAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJwb2xsXCIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPdmVybG9hZHMgb25EYXRhIHRvIGRldGVjdCBwYXlsb2Fkcy5cbiAgICAgKlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBvbkRhdGEoZGF0YSkge1xuICAgICAgICBkZWJ1ZyhcInBvbGxpbmcgZ290IGRhdGEgJXNcIiwgZGF0YSk7XG4gICAgICAgIGNvbnN0IGNhbGxiYWNrID0gKHBhY2tldCkgPT4ge1xuICAgICAgICAgICAgLy8gaWYgaXRzIHRoZSBmaXJzdCBtZXNzYWdlIHdlIGNvbnNpZGVyIHRoZSB0cmFuc3BvcnQgb3BlblxuICAgICAgICAgICAgaWYgKFwib3BlbmluZ1wiID09PSB0aGlzLnJlYWR5U3RhdGUgJiYgcGFja2V0LnR5cGUgPT09IFwib3BlblwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbk9wZW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGlmIGl0cyBhIGNsb3NlIHBhY2tldCwgd2UgY2xvc2UgdGhlIG9uZ29pbmcgcmVxdWVzdHNcbiAgICAgICAgICAgIGlmIChcImNsb3NlXCIgPT09IHBhY2tldC50eXBlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkNsb3NlKHsgZGVzY3JpcHRpb246IFwidHJhbnNwb3J0IGNsb3NlZCBieSB0aGUgc2VydmVyXCIgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gb3RoZXJ3aXNlIGJ5cGFzcyBvbkRhdGEgYW5kIGhhbmRsZSB0aGUgbWVzc2FnZVxuICAgICAgICAgICAgdGhpcy5vblBhY2tldChwYWNrZXQpO1xuICAgICAgICB9O1xuICAgICAgICAvLyBkZWNvZGUgcGF5bG9hZFxuICAgICAgICAoMCwgZW5naW5lX2lvX3BhcnNlcl8xLmRlY29kZVBheWxvYWQpKGRhdGEsIHRoaXMuc29ja2V0LmJpbmFyeVR5cGUpLmZvckVhY2goY2FsbGJhY2spO1xuICAgICAgICAvLyBpZiBhbiBldmVudCBkaWQgbm90IHRyaWdnZXIgY2xvc2luZ1xuICAgICAgICBpZiAoXCJjbG9zZWRcIiAhPT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgICAgICAgICAvLyBpZiB3ZSBnb3QgZGF0YSB3ZSdyZSBub3QgcG9sbGluZ1xuICAgICAgICAgICAgdGhpcy5fcG9sbGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJwb2xsQ29tcGxldGVcIik7XG4gICAgICAgICAgICBpZiAoXCJvcGVuXCIgPT09IHRoaXMucmVhZHlTdGF0ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3BvbGwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGRlYnVnKCdpZ25vcmluZyBwb2xsIC0gdHJhbnNwb3J0IHN0YXRlIFwiJXNcIicsIHRoaXMucmVhZHlTdGF0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogRm9yIHBvbGxpbmcsIHNlbmQgYSBjbG9zZSBwYWNrZXQuXG4gICAgICpcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgZG9DbG9zZSgpIHtcbiAgICAgICAgY29uc3QgY2xvc2UgPSAoKSA9PiB7XG4gICAgICAgICAgICBkZWJ1ZyhcIndyaXRpbmcgY2xvc2UgcGFja2V0XCIpO1xuICAgICAgICAgICAgdGhpcy53cml0ZShbeyB0eXBlOiBcImNsb3NlXCIgfV0pO1xuICAgICAgICB9O1xuICAgICAgICBpZiAoXCJvcGVuXCIgPT09IHRoaXMucmVhZHlTdGF0ZSkge1xuICAgICAgICAgICAgZGVidWcoXCJ0cmFuc3BvcnQgb3BlbiAtIGNsb3NpbmdcIik7XG4gICAgICAgICAgICBjbG9zZSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gaW4gY2FzZSB3ZSdyZSB0cnlpbmcgdG8gY2xvc2Ugd2hpbGVcbiAgICAgICAgICAgIC8vIGhhbmRzaGFraW5nIGlzIGluIHByb2dyZXNzIChHSC0xNjQpXG4gICAgICAgICAgICBkZWJ1ZyhcInRyYW5zcG9ydCBub3Qgb3BlbiAtIGRlZmVycmluZyBjbG9zZVwiKTtcbiAgICAgICAgICAgIHRoaXMub25jZShcIm9wZW5cIiwgY2xvc2UpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFdyaXRlcyBhIHBhY2tldHMgcGF5bG9hZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IHBhY2tldHMgLSBkYXRhIHBhY2tldHNcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgd3JpdGUocGFja2V0cykge1xuICAgICAgICB0aGlzLndyaXRhYmxlID0gZmFsc2U7XG4gICAgICAgICgwLCBlbmdpbmVfaW9fcGFyc2VyXzEuZW5jb2RlUGF5bG9hZCkocGFja2V0cywgKGRhdGEpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZG9Xcml0ZShkYXRhLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy53cml0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJkcmFpblwiKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogR2VuZXJhdGVzIHVyaSBmb3IgY29ubmVjdGlvbi5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgdXJpKCkge1xuICAgICAgICBjb25zdCBzY2hlbWEgPSB0aGlzLm9wdHMuc2VjdXJlID8gXCJodHRwc1wiIDogXCJodHRwXCI7XG4gICAgICAgIGNvbnN0IHF1ZXJ5ID0gdGhpcy5xdWVyeSB8fCB7fTtcbiAgICAgICAgLy8gY2FjaGUgYnVzdGluZyBpcyBmb3JjZWRcbiAgICAgICAgaWYgKGZhbHNlICE9PSB0aGlzLm9wdHMudGltZXN0YW1wUmVxdWVzdHMpIHtcbiAgICAgICAgICAgIHF1ZXJ5W3RoaXMub3B0cy50aW1lc3RhbXBQYXJhbV0gPSAoMCwgdXRpbF9qc18xLnJhbmRvbVN0cmluZykoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuc3VwcG9ydHNCaW5hcnkgJiYgIXF1ZXJ5LnNpZCkge1xuICAgICAgICAgICAgcXVlcnkuYjY0ID0gMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVVcmkoc2NoZW1hLCBxdWVyeSk7XG4gICAgfVxufVxuZXhwb3J0cy5Qb2xsaW5nID0gUG9sbGluZztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5oYXNDT1JTID0gdm9pZCAwO1xuLy8gaW1wb3J0ZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vY29tcG9uZW50L2hhcy1jb3JzXG5sZXQgdmFsdWUgPSBmYWxzZTtcbnRyeSB7XG4gICAgdmFsdWUgPSB0eXBlb2YgWE1MSHR0cFJlcXVlc3QgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgICd3aXRoQ3JlZGVudGlhbHMnIGluIG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xufVxuY2F0Y2ggKGVycikge1xuICAgIC8vIGlmIFhNTEh0dHAgc3VwcG9ydCBpcyBkaXNhYmxlZCBpbiBJRSB0aGVuIGl0IHdpbGwgdGhyb3dcbiAgICAvLyB3aGVuIHRyeWluZyB0byBjcmVhdGVcbn1cbmV4cG9ydHMuaGFzQ09SUyA9IHZhbHVlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlhIUiA9IGV4cG9ydHMuUmVxdWVzdCA9IGV4cG9ydHMuQmFzZVhIUiA9IHZvaWQgMDtcbmNvbnN0IHBvbGxpbmdfanNfMSA9IHJlcXVpcmUoXCIuL3BvbGxpbmcuanNcIik7XG5jb25zdCBjb21wb25lbnRfZW1pdHRlcl8xID0gcmVxdWlyZShcIkBzb2NrZXQuaW8vY29tcG9uZW50LWVtaXR0ZXJcIik7XG5jb25zdCB1dGlsX2pzXzEgPSByZXF1aXJlKFwiLi4vdXRpbC5qc1wiKTtcbmNvbnN0IGdsb2JhbHNfbm9kZV9qc18xID0gcmVxdWlyZShcIi4uL2dsb2JhbHMubm9kZS5qc1wiKTtcbmNvbnN0IGhhc19jb3JzX2pzXzEgPSByZXF1aXJlKFwiLi4vY29udHJpYi9oYXMtY29ycy5qc1wiKTtcbmNvbnN0IGRlYnVnXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcImRlYnVnXCIpKTsgLy8gZGVidWcoKVxuY29uc3QgZGVidWcgPSAoMCwgZGVidWdfMS5kZWZhdWx0KShcImVuZ2luZS5pby1jbGllbnQ6cG9sbGluZ1wiKTsgLy8gZGVidWcoKVxuZnVuY3Rpb24gZW1wdHkoKSB7IH1cbmNsYXNzIEJhc2VYSFIgZXh0ZW5kcyBwb2xsaW5nX2pzXzEuUG9sbGluZyB7XG4gICAgLyoqXG4gICAgICogWEhSIFBvbGxpbmcgY29uc3RydWN0b3IuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0c1xuICAgICAqIEBwYWNrYWdlXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0cykge1xuICAgICAgICBzdXBlcihvcHRzKTtcbiAgICAgICAgaWYgKHR5cGVvZiBsb2NhdGlvbiAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgY29uc3QgaXNTU0wgPSBcImh0dHBzOlwiID09PSBsb2NhdGlvbi5wcm90b2NvbDtcbiAgICAgICAgICAgIGxldCBwb3J0ID0gbG9jYXRpb24ucG9ydDtcbiAgICAgICAgICAgIC8vIHNvbWUgdXNlciBhZ2VudHMgaGF2ZSBlbXB0eSBgbG9jYXRpb24ucG9ydGBcbiAgICAgICAgICAgIGlmICghcG9ydCkge1xuICAgICAgICAgICAgICAgIHBvcnQgPSBpc1NTTCA/IFwiNDQzXCIgOiBcIjgwXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnhkID1cbiAgICAgICAgICAgICAgICAodHlwZW9mIGxvY2F0aW9uICE9PSBcInVuZGVmaW5lZFwiICYmXG4gICAgICAgICAgICAgICAgICAgIG9wdHMuaG9zdG5hbWUgIT09IGxvY2F0aW9uLmhvc3RuYW1lKSB8fFxuICAgICAgICAgICAgICAgICAgICBwb3J0ICE9PSBvcHRzLnBvcnQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VuZHMgZGF0YS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhIHRvIHNlbmQuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGVkIHVwb24gZmx1c2guXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBkb1dyaXRlKGRhdGEsIGZuKSB7XG4gICAgICAgIGNvbnN0IHJlcSA9IHRoaXMucmVxdWVzdCh7XG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICAgICAgZGF0YTogZGF0YSxcbiAgICAgICAgfSk7XG4gICAgICAgIHJlcS5vbihcInN1Y2Nlc3NcIiwgZm4pO1xuICAgICAgICByZXEub24oXCJlcnJvclwiLCAoeGhyU3RhdHVzLCBjb250ZXh0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uRXJyb3IoXCJ4aHIgcG9zdCBlcnJvclwiLCB4aHJTdGF0dXMsIGNvbnRleHQpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU3RhcnRzIGEgcG9sbCBjeWNsZS5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgZG9Qb2xsKCkge1xuICAgICAgICBkZWJ1ZyhcInhociBwb2xsXCIpO1xuICAgICAgICBjb25zdCByZXEgPSB0aGlzLnJlcXVlc3QoKTtcbiAgICAgICAgcmVxLm9uKFwiZGF0YVwiLCB0aGlzLm9uRGF0YS5iaW5kKHRoaXMpKTtcbiAgICAgICAgcmVxLm9uKFwiZXJyb3JcIiwgKHhoclN0YXR1cywgY29udGV4dCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5vbkVycm9yKFwieGhyIHBvbGwgZXJyb3JcIiwgeGhyU3RhdHVzLCBjb250ZXh0KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucG9sbFhociA9IHJlcTtcbiAgICB9XG59XG5leHBvcnRzLkJhc2VYSFIgPSBCYXNlWEhSO1xuY2xhc3MgUmVxdWVzdCBleHRlbmRzIGNvbXBvbmVudF9lbWl0dGVyXzEuRW1pdHRlciB7XG4gICAgLyoqXG4gICAgICogUmVxdWVzdCBjb25zdHJ1Y3RvclxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICAgKiBAcGFja2FnZVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGNyZWF0ZVJlcXVlc3QsIHVyaSwgb3B0cykge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmNyZWF0ZVJlcXVlc3QgPSBjcmVhdGVSZXF1ZXN0O1xuICAgICAgICAoMCwgdXRpbF9qc18xLmluc3RhbGxUaW1lckZ1bmN0aW9ucykodGhpcywgb3B0cyk7XG4gICAgICAgIHRoaXMuX29wdHMgPSBvcHRzO1xuICAgICAgICB0aGlzLl9tZXRob2QgPSBvcHRzLm1ldGhvZCB8fCBcIkdFVFwiO1xuICAgICAgICB0aGlzLl91cmkgPSB1cmk7XG4gICAgICAgIHRoaXMuX2RhdGEgPSB1bmRlZmluZWQgIT09IG9wdHMuZGF0YSA/IG9wdHMuZGF0YSA6IG51bGw7XG4gICAgICAgIHRoaXMuX2NyZWF0ZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIHRoZSBYSFIgb2JqZWN0IGFuZCBzZW5kcyB0aGUgcmVxdWVzdC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2NyZWF0ZSgpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBjb25zdCBvcHRzID0gKDAsIHV0aWxfanNfMS5waWNrKSh0aGlzLl9vcHRzLCBcImFnZW50XCIsIFwicGZ4XCIsIFwia2V5XCIsIFwicGFzc3BocmFzZVwiLCBcImNlcnRcIiwgXCJjYVwiLCBcImNpcGhlcnNcIiwgXCJyZWplY3RVbmF1dGhvcml6ZWRcIiwgXCJhdXRvVW5yZWZcIik7XG4gICAgICAgIG9wdHMueGRvbWFpbiA9ICEhdGhpcy5fb3B0cy54ZDtcbiAgICAgICAgY29uc3QgeGhyID0gKHRoaXMuX3hociA9IHRoaXMuY3JlYXRlUmVxdWVzdChvcHRzKSk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBkZWJ1ZyhcInhociBvcGVuICVzOiAlc1wiLCB0aGlzLl9tZXRob2QsIHRoaXMuX3VyaSk7XG4gICAgICAgICAgICB4aHIub3Blbih0aGlzLl9tZXRob2QsIHRoaXMuX3VyaSwgdHJ1ZSk7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9vcHRzLmV4dHJhSGVhZGVycykge1xuICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgICAgIHhoci5zZXREaXNhYmxlSGVhZGVyQ2hlY2sgJiYgeGhyLnNldERpc2FibGVIZWFkZXJDaGVjayh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSBpbiB0aGlzLl9vcHRzLmV4dHJhSGVhZGVycykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX29wdHMuZXh0cmFIZWFkZXJzLmhhc093blByb3BlcnR5KGkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoaSwgdGhpcy5fb3B0cy5leHRyYUhlYWRlcnNbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGUpIHsgfVxuICAgICAgICAgICAgaWYgKFwiUE9TVFwiID09PSB0aGlzLl9tZXRob2QpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtdHlwZVwiLCBcInRleHQvcGxhaW47Y2hhcnNldD1VVEYtOFwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHsgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihcIkFjY2VwdFwiLCBcIiovKlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlKSB7IH1cbiAgICAgICAgICAgIChfYSA9IHRoaXMuX29wdHMuY29va2llSmFyKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuYWRkQ29va2llcyh4aHIpO1xuICAgICAgICAgICAgLy8gaWU2IGNoZWNrXG4gICAgICAgICAgICBpZiAoXCJ3aXRoQ3JlZGVudGlhbHNcIiBpbiB4aHIpIHtcbiAgICAgICAgICAgICAgICB4aHIud2l0aENyZWRlbnRpYWxzID0gdGhpcy5fb3B0cy53aXRoQ3JlZGVudGlhbHM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5fb3B0cy5yZXF1ZXN0VGltZW91dCkge1xuICAgICAgICAgICAgICAgIHhoci50aW1lb3V0ID0gdGhpcy5fb3B0cy5yZXF1ZXN0VGltZW91dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PT0gMykge1xuICAgICAgICAgICAgICAgICAgICAoX2EgPSB0aGlzLl9vcHRzLmNvb2tpZUphcikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnBhcnNlQ29va2llcyhcbiAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgICAgICB4aHIuZ2V0UmVzcG9uc2VIZWFkZXIoXCJzZXQtY29va2llXCIpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKDQgIT09IHhoci5yZWFkeVN0YXRlKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgaWYgKDIwMCA9PT0geGhyLnN0YXR1cyB8fCAxMjIzID09PSB4aHIuc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX29uTG9hZCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gbWFrZSBzdXJlIHRoZSBgZXJyb3JgIGV2ZW50IGhhbmRsZXIgdGhhdCdzIHVzZXItc2V0XG4gICAgICAgICAgICAgICAgICAgIC8vIGRvZXMgbm90IHRocm93IGluIHRoZSBzYW1lIHRpY2sgYW5kIGdldHMgY2F1Z2h0IGhlcmVcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRUaW1lb3V0Rm4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fb25FcnJvcih0eXBlb2YgeGhyLnN0YXR1cyA9PT0gXCJudW1iZXJcIiA/IHhoci5zdGF0dXMgOiAwKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGRlYnVnKFwieGhyIGRhdGEgJXNcIiwgdGhpcy5fZGF0YSk7XG4gICAgICAgICAgICB4aHIuc2VuZCh0aGlzLl9kYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgLy8gTmVlZCB0byBkZWZlciBzaW5jZSAuY3JlYXRlKCkgaXMgY2FsbGVkIGRpcmVjdGx5IGZyb20gdGhlIGNvbnN0cnVjdG9yXG4gICAgICAgICAgICAvLyBhbmQgdGh1cyB0aGUgJ2Vycm9yJyBldmVudCBjYW4gb25seSBiZSBvbmx5IGJvdW5kICphZnRlciogdGhpcyBleGNlcHRpb25cbiAgICAgICAgICAgIC8vIG9jY3Vycy4gIFRoZXJlZm9yZSwgYWxzbywgd2UgY2Fubm90IHRocm93IGhlcmUgYXQgYWxsLlxuICAgICAgICAgICAgdGhpcy5zZXRUaW1lb3V0Rm4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX29uRXJyb3IoZSk7XG4gICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGRvY3VtZW50ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICB0aGlzLl9pbmRleCA9IFJlcXVlc3QucmVxdWVzdHNDb3VudCsrO1xuICAgICAgICAgICAgUmVxdWVzdC5yZXF1ZXN0c1t0aGlzLl9pbmRleF0gPSB0aGlzO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB1cG9uIGVycm9yLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfb25FcnJvcihlcnIpIHtcbiAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJlcnJvclwiLCBlcnIsIHRoaXMuX3hocik7XG4gICAgICAgIHRoaXMuX2NsZWFudXAodHJ1ZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsZWFucyB1cCBob3VzZS5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2NsZWFudXAoZnJvbUVycm9yKSB7XG4gICAgICAgIGlmIChcInVuZGVmaW5lZFwiID09PSB0eXBlb2YgdGhpcy5feGhyIHx8IG51bGwgPT09IHRoaXMuX3hocikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3hoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBlbXB0eTtcbiAgICAgICAgaWYgKGZyb21FcnJvcikge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB0aGlzLl94aHIuYWJvcnQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlKSB7IH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIGRvY3VtZW50ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICBkZWxldGUgUmVxdWVzdC5yZXF1ZXN0c1t0aGlzLl9pbmRleF07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5feGhyID0gbnVsbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gbG9hZC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX29uTG9hZCgpIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IHRoaXMuX3hoci5yZXNwb25zZVRleHQ7XG4gICAgICAgIGlmIChkYXRhICE9PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcImRhdGFcIiwgZGF0YSk7XG4gICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcInN1Y2Nlc3NcIik7XG4gICAgICAgICAgICB0aGlzLl9jbGVhbnVwKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQWJvcnRzIHRoZSByZXF1ZXN0LlxuICAgICAqXG4gICAgICogQHBhY2thZ2VcbiAgICAgKi9cbiAgICBhYm9ydCgpIHtcbiAgICAgICAgdGhpcy5fY2xlYW51cCgpO1xuICAgIH1cbn1cbmV4cG9ydHMuUmVxdWVzdCA9IFJlcXVlc3Q7XG5SZXF1ZXN0LnJlcXVlc3RzQ291bnQgPSAwO1xuUmVxdWVzdC5yZXF1ZXN0cyA9IHt9O1xuLyoqXG4gKiBBYm9ydHMgcGVuZGluZyByZXF1ZXN0cyB3aGVuIHVubG9hZGluZyB0aGUgd2luZG93LiBUaGlzIGlzIG5lZWRlZCB0byBwcmV2ZW50XG4gKiBtZW1vcnkgbGVha3MgKGUuZy4gd2hlbiB1c2luZyBJRSkgYW5kIHRvIGVuc3VyZSB0aGF0IG5vIHNwdXJpb3VzIGVycm9yIGlzXG4gKiBlbWl0dGVkLlxuICovXG5pZiAodHlwZW9mIGRvY3VtZW50ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGlmICh0eXBlb2YgYXR0YWNoRXZlbnQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGF0dGFjaEV2ZW50KFwib251bmxvYWRcIiwgdW5sb2FkSGFuZGxlcik7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBhZGRFdmVudExpc3RlbmVyID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgY29uc3QgdGVybWluYXRpb25FdmVudCA9IFwib25wYWdlaGlkZVwiIGluIGdsb2JhbHNfbm9kZV9qc18xLmdsb2JhbFRoaXNTaGltID8gXCJwYWdlaGlkZVwiIDogXCJ1bmxvYWRcIjtcbiAgICAgICAgYWRkRXZlbnRMaXN0ZW5lcih0ZXJtaW5hdGlvbkV2ZW50LCB1bmxvYWRIYW5kbGVyLCBmYWxzZSk7XG4gICAgfVxufVxuZnVuY3Rpb24gdW5sb2FkSGFuZGxlcigpIHtcbiAgICBmb3IgKGxldCBpIGluIFJlcXVlc3QucmVxdWVzdHMpIHtcbiAgICAgICAgaWYgKFJlcXVlc3QucmVxdWVzdHMuaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgICAgICAgIFJlcXVlc3QucmVxdWVzdHNbaV0uYWJvcnQoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmNvbnN0IGhhc1hIUjIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IHhociA9IG5ld1JlcXVlc3Qoe1xuICAgICAgICB4ZG9tYWluOiBmYWxzZSxcbiAgICB9KTtcbiAgICByZXR1cm4geGhyICYmIHhoci5yZXNwb25zZVR5cGUgIT09IG51bGw7XG59KSgpO1xuLyoqXG4gKiBIVFRQIGxvbmctcG9sbGluZyBiYXNlZCBvbiB0aGUgYnVpbHQtaW4gYFhNTEh0dHBSZXF1ZXN0YCBvYmplY3QuXG4gKlxuICogVXNhZ2U6IGJyb3dzZXJcbiAqXG4gKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9YTUxIdHRwUmVxdWVzdFxuICovXG5jbGFzcyBYSFIgZXh0ZW5kcyBCYXNlWEhSIHtcbiAgICBjb25zdHJ1Y3RvcihvcHRzKSB7XG4gICAgICAgIHN1cGVyKG9wdHMpO1xuICAgICAgICBjb25zdCBmb3JjZUJhc2U2NCA9IG9wdHMgJiYgb3B0cy5mb3JjZUJhc2U2NDtcbiAgICAgICAgdGhpcy5zdXBwb3J0c0JpbmFyeSA9IGhhc1hIUjIgJiYgIWZvcmNlQmFzZTY0O1xuICAgIH1cbiAgICByZXF1ZXN0KG9wdHMgPSB7fSkge1xuICAgICAgICBPYmplY3QuYXNzaWduKG9wdHMsIHsgeGQ6IHRoaXMueGQgfSwgdGhpcy5vcHRzKTtcbiAgICAgICAgcmV0dXJuIG5ldyBSZXF1ZXN0KG5ld1JlcXVlc3QsIHRoaXMudXJpKCksIG9wdHMpO1xuICAgIH1cbn1cbmV4cG9ydHMuWEhSID0gWEhSO1xuZnVuY3Rpb24gbmV3UmVxdWVzdChvcHRzKSB7XG4gICAgY29uc3QgeGRvbWFpbiA9IG9wdHMueGRvbWFpbjtcbiAgICAvLyBYTUxIdHRwUmVxdWVzdCBjYW4gYmUgZGlzYWJsZWQgb24gSUVcbiAgICB0cnkge1xuICAgICAgICBpZiAoXCJ1bmRlZmluZWRcIiAhPT0gdHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICYmICgheGRvbWFpbiB8fCBoYXNfY29yc19qc18xLmhhc0NPUlMpKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY2F0Y2ggKGUpIHsgfVxuICAgIGlmICgheGRvbWFpbikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBnbG9iYWxzX25vZGVfanNfMS5nbG9iYWxUaGlzU2hpbVtbXCJBY3RpdmVcIl0uY29uY2F0KFwiT2JqZWN0XCIpLmpvaW4oXCJYXCIpXShcIk1pY3Jvc29mdC5YTUxIVFRQXCIpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7IH1cbiAgICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuV1MgPSBleHBvcnRzLkJhc2VXUyA9IHZvaWQgMDtcbmNvbnN0IHRyYW5zcG9ydF9qc18xID0gcmVxdWlyZShcIi4uL3RyYW5zcG9ydC5qc1wiKTtcbmNvbnN0IHV0aWxfanNfMSA9IHJlcXVpcmUoXCIuLi91dGlsLmpzXCIpO1xuY29uc3QgZW5naW5lX2lvX3BhcnNlcl8xID0gcmVxdWlyZShcImVuZ2luZS5pby1wYXJzZXJcIik7XG5jb25zdCBnbG9iYWxzX25vZGVfanNfMSA9IHJlcXVpcmUoXCIuLi9nbG9iYWxzLm5vZGUuanNcIik7XG5jb25zdCBkZWJ1Z18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJkZWJ1Z1wiKSk7IC8vIGRlYnVnKClcbmNvbnN0IGRlYnVnID0gKDAsIGRlYnVnXzEuZGVmYXVsdCkoXCJlbmdpbmUuaW8tY2xpZW50OndlYnNvY2tldFwiKTsgLy8gZGVidWcoKVxuLy8gZGV0ZWN0IFJlYWN0TmF0aXZlIGVudmlyb25tZW50XG5jb25zdCBpc1JlYWN0TmF0aXZlID0gdHlwZW9mIG5hdmlnYXRvciAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgIHR5cGVvZiBuYXZpZ2F0b3IucHJvZHVjdCA9PT0gXCJzdHJpbmdcIiAmJlxuICAgIG5hdmlnYXRvci5wcm9kdWN0LnRvTG93ZXJDYXNlKCkgPT09IFwicmVhY3RuYXRpdmVcIjtcbmNsYXNzIEJhc2VXUyBleHRlbmRzIHRyYW5zcG9ydF9qc18xLlRyYW5zcG9ydCB7XG4gICAgZ2V0IG5hbWUoKSB7XG4gICAgICAgIHJldHVybiBcIndlYnNvY2tldFwiO1xuICAgIH1cbiAgICBkb09wZW4oKSB7XG4gICAgICAgIGNvbnN0IHVyaSA9IHRoaXMudXJpKCk7XG4gICAgICAgIGNvbnN0IHByb3RvY29scyA9IHRoaXMub3B0cy5wcm90b2NvbHM7XG4gICAgICAgIC8vIFJlYWN0IE5hdGl2ZSBvbmx5IHN1cHBvcnRzIHRoZSAnaGVhZGVycycgb3B0aW9uLCBhbmQgd2lsbCBwcmludCBhIHdhcm5pbmcgaWYgYW55dGhpbmcgZWxzZSBpcyBwYXNzZWRcbiAgICAgICAgY29uc3Qgb3B0cyA9IGlzUmVhY3ROYXRpdmVcbiAgICAgICAgICAgID8ge31cbiAgICAgICAgICAgIDogKDAsIHV0aWxfanNfMS5waWNrKSh0aGlzLm9wdHMsIFwiYWdlbnRcIiwgXCJwZXJNZXNzYWdlRGVmbGF0ZVwiLCBcInBmeFwiLCBcImtleVwiLCBcInBhc3NwaHJhc2VcIiwgXCJjZXJ0XCIsIFwiY2FcIiwgXCJjaXBoZXJzXCIsIFwicmVqZWN0VW5hdXRob3JpemVkXCIsIFwibG9jYWxBZGRyZXNzXCIsIFwicHJvdG9jb2xWZXJzaW9uXCIsIFwib3JpZ2luXCIsIFwibWF4UGF5bG9hZFwiLCBcImZhbWlseVwiLCBcImNoZWNrU2VydmVySWRlbnRpdHlcIik7XG4gICAgICAgIGlmICh0aGlzLm9wdHMuZXh0cmFIZWFkZXJzKSB7XG4gICAgICAgICAgICBvcHRzLmhlYWRlcnMgPSB0aGlzLm9wdHMuZXh0cmFIZWFkZXJzO1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB0aGlzLndzID0gdGhpcy5jcmVhdGVTb2NrZXQodXJpLCBwcm90b2NvbHMsIG9wdHMpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVtaXRSZXNlcnZlZChcImVycm9yXCIsIGVycik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy53cy5iaW5hcnlUeXBlID0gdGhpcy5zb2NrZXQuYmluYXJ5VHlwZTtcbiAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVycygpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGRzIGV2ZW50IGxpc3RlbmVycyB0byB0aGUgc29ja2V0XG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGFkZEV2ZW50TGlzdGVuZXJzKCkge1xuICAgICAgICB0aGlzLndzLm9ub3BlbiA9ICgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdHMuYXV0b1VucmVmKSB7XG4gICAgICAgICAgICAgICAgdGhpcy53cy5fc29ja2V0LnVucmVmKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm9uT3BlbigpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLndzLm9uY2xvc2UgPSAoY2xvc2VFdmVudCkgPT4gdGhpcy5vbkNsb3NlKHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIndlYnNvY2tldCBjb25uZWN0aW9uIGNsb3NlZFwiLFxuICAgICAgICAgICAgY29udGV4dDogY2xvc2VFdmVudCxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMud3Mub25tZXNzYWdlID0gKGV2KSA9PiB0aGlzLm9uRGF0YShldi5kYXRhKTtcbiAgICAgICAgdGhpcy53cy5vbmVycm9yID0gKGUpID0+IHRoaXMub25FcnJvcihcIndlYnNvY2tldCBlcnJvclwiLCBlKTtcbiAgICB9XG4gICAgd3JpdGUocGFja2V0cykge1xuICAgICAgICB0aGlzLndyaXRhYmxlID0gZmFsc2U7XG4gICAgICAgIC8vIGVuY29kZVBhY2tldCBlZmZpY2llbnQgYXMgaXQgdXNlcyBXUyBmcmFtaW5nXG4gICAgICAgIC8vIG5vIG5lZWQgZm9yIGVuY29kZVBheWxvYWRcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYWNrZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBwYWNrZXQgPSBwYWNrZXRzW2ldO1xuICAgICAgICAgICAgY29uc3QgbGFzdFBhY2tldCA9IGkgPT09IHBhY2tldHMubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgICgwLCBlbmdpbmVfaW9fcGFyc2VyXzEuZW5jb2RlUGFja2V0KShwYWNrZXQsIHRoaXMuc3VwcG9ydHNCaW5hcnksIChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gU29tZXRpbWVzIHRoZSB3ZWJzb2NrZXQgaGFzIGFscmVhZHkgYmVlbiBjbG9zZWQgYnV0IHRoZSBicm93c2VyIGRpZG4ndFxuICAgICAgICAgICAgICAgIC8vIGhhdmUgYSBjaGFuY2Ugb2YgaW5mb3JtaW5nIHVzIGFib3V0IGl0IHlldCwgaW4gdGhhdCBjYXNlIHNlbmQgd2lsbFxuICAgICAgICAgICAgICAgIC8vIHRocm93IGFuIGVycm9yXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kb1dyaXRlKHBhY2tldCwgZGF0YSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlYnVnKFwid2Vic29ja2V0IGNsb3NlZCBiZWZvcmUgb25jbG9zZSBldmVudFwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGxhc3RQYWNrZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZmFrZSBkcmFpblxuICAgICAgICAgICAgICAgICAgICAvLyBkZWZlciB0byBuZXh0IHRpY2sgdG8gYWxsb3cgU29ja2V0IHRvIGNsZWFyIHdyaXRlQnVmZmVyXG4gICAgICAgICAgICAgICAgICAgICgwLCBnbG9iYWxzX25vZGVfanNfMS5uZXh0VGljaykoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy53cml0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcImRyYWluXCIpO1xuICAgICAgICAgICAgICAgICAgICB9LCB0aGlzLnNldFRpbWVvdXRGbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZG9DbG9zZSgpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLndzICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICB0aGlzLndzLm9uZXJyb3IgPSAoKSA9PiB7IH07XG4gICAgICAgICAgICB0aGlzLndzLmNsb3NlKCk7XG4gICAgICAgICAgICB0aGlzLndzID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZXMgdXJpIGZvciBjb25uZWN0aW9uLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICB1cmkoKSB7XG4gICAgICAgIGNvbnN0IHNjaGVtYSA9IHRoaXMub3B0cy5zZWN1cmUgPyBcIndzc1wiIDogXCJ3c1wiO1xuICAgICAgICBjb25zdCBxdWVyeSA9IHRoaXMucXVlcnkgfHwge307XG4gICAgICAgIC8vIGFwcGVuZCB0aW1lc3RhbXAgdG8gVVJJXG4gICAgICAgIGlmICh0aGlzLm9wdHMudGltZXN0YW1wUmVxdWVzdHMpIHtcbiAgICAgICAgICAgIHF1ZXJ5W3RoaXMub3B0cy50aW1lc3RhbXBQYXJhbV0gPSAoMCwgdXRpbF9qc18xLnJhbmRvbVN0cmluZykoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBjb21tdW5pY2F0ZSBiaW5hcnkgc3VwcG9ydCBjYXBhYmlsaXRpZXNcbiAgICAgICAgaWYgKCF0aGlzLnN1cHBvcnRzQmluYXJ5KSB7XG4gICAgICAgICAgICBxdWVyeS5iNjQgPSAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZVVyaShzY2hlbWEsIHF1ZXJ5KTtcbiAgICB9XG59XG5leHBvcnRzLkJhc2VXUyA9IEJhc2VXUztcbmNvbnN0IFdlYlNvY2tldEN0b3IgPSBnbG9iYWxzX25vZGVfanNfMS5nbG9iYWxUaGlzU2hpbS5XZWJTb2NrZXQgfHwgZ2xvYmFsc19ub2RlX2pzXzEuZ2xvYmFsVGhpc1NoaW0uTW96V2ViU29ja2V0O1xuLyoqXG4gKiBXZWJTb2NrZXQgdHJhbnNwb3J0IGJhc2VkIG9uIHRoZSBidWlsdC1pbiBgV2ViU29ja2V0YCBvYmplY3QuXG4gKlxuICogVXNhZ2U6IGJyb3dzZXIsIE5vZGUuanMgKHNpbmNlIHYyMSksIERlbm8sIEJ1blxuICpcbiAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1dlYlNvY2tldFxuICogQHNlZSBodHRwczovL2Nhbml1c2UuY29tL21kbi1hcGlfd2Vic29ja2V0XG4gKiBAc2VlIGh0dHBzOi8vbm9kZWpzLm9yZy9hcGkvZ2xvYmFscy5odG1sI3dlYnNvY2tldFxuICovXG5jbGFzcyBXUyBleHRlbmRzIEJhc2VXUyB7XG4gICAgY3JlYXRlU29ja2V0KHVyaSwgcHJvdG9jb2xzLCBvcHRzKSB7XG4gICAgICAgIHJldHVybiAhaXNSZWFjdE5hdGl2ZVxuICAgICAgICAgICAgPyBwcm90b2NvbHNcbiAgICAgICAgICAgICAgICA/IG5ldyBXZWJTb2NrZXRDdG9yKHVyaSwgcHJvdG9jb2xzKVxuICAgICAgICAgICAgICAgIDogbmV3IFdlYlNvY2tldEN0b3IodXJpKVxuICAgICAgICAgICAgOiBuZXcgV2ViU29ja2V0Q3Rvcih1cmksIHByb3RvY29scywgb3B0cyk7XG4gICAgfVxuICAgIGRvV3JpdGUoX3BhY2tldCwgZGF0YSkge1xuICAgICAgICB0aGlzLndzLnNlbmQoZGF0YSk7XG4gICAgfVxufVxuZXhwb3J0cy5XUyA9IFdTO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLldUID0gdm9pZCAwO1xuY29uc3QgdHJhbnNwb3J0X2pzXzEgPSByZXF1aXJlKFwiLi4vdHJhbnNwb3J0LmpzXCIpO1xuY29uc3QgZ2xvYmFsc19ub2RlX2pzXzEgPSByZXF1aXJlKFwiLi4vZ2xvYmFscy5ub2RlLmpzXCIpO1xuY29uc3QgZW5naW5lX2lvX3BhcnNlcl8xID0gcmVxdWlyZShcImVuZ2luZS5pby1wYXJzZXJcIik7XG5jb25zdCBkZWJ1Z18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJkZWJ1Z1wiKSk7IC8vIGRlYnVnKClcbmNvbnN0IGRlYnVnID0gKDAsIGRlYnVnXzEuZGVmYXVsdCkoXCJlbmdpbmUuaW8tY2xpZW50OndlYnRyYW5zcG9ydFwiKTsgLy8gZGVidWcoKVxuLyoqXG4gKiBXZWJUcmFuc3BvcnQgdHJhbnNwb3J0IGJhc2VkIG9uIHRoZSBidWlsdC1pbiBgV2ViVHJhbnNwb3J0YCBvYmplY3QuXG4gKlxuICogVXNhZ2U6IGJyb3dzZXIsIE5vZGUuanMgKHdpdGggdGhlIGBAZmFpbHMtY29tcG9uZW50cy93ZWJ0cmFuc3BvcnRgIHBhY2thZ2UpXG4gKlxuICogQHNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvV2ViVHJhbnNwb3J0XG4gKiBAc2VlIGh0dHBzOi8vY2FuaXVzZS5jb20vd2VidHJhbnNwb3J0XG4gKi9cbmNsYXNzIFdUIGV4dGVuZHMgdHJhbnNwb3J0X2pzXzEuVHJhbnNwb3J0IHtcbiAgICBnZXQgbmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIFwid2VidHJhbnNwb3J0XCI7XG4gICAgfVxuICAgIGRvT3BlbigpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIHRoaXMuX3RyYW5zcG9ydCA9IG5ldyBXZWJUcmFuc3BvcnQodGhpcy5jcmVhdGVVcmkoXCJodHRwc1wiKSwgdGhpcy5vcHRzLnRyYW5zcG9ydE9wdGlvbnNbdGhpcy5uYW1lXSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZW1pdFJlc2VydmVkKFwiZXJyb3JcIiwgZXJyKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl90cmFuc3BvcnQuY2xvc2VkXG4gICAgICAgICAgICAudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBkZWJ1ZyhcInRyYW5zcG9ydCBjbG9zZWQgZ3JhY2VmdWxseVwiKTtcbiAgICAgICAgICAgIHRoaXMub25DbG9zZSgpO1xuICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgIGRlYnVnKFwidHJhbnNwb3J0IGNsb3NlZCBkdWUgdG8gJXNcIiwgZXJyKTtcbiAgICAgICAgICAgIHRoaXMub25FcnJvcihcIndlYnRyYW5zcG9ydCBlcnJvclwiLCBlcnIpO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gbm90ZTogd2UgY291bGQgaGF2ZSB1c2VkIGFzeW5jL2F3YWl0LCBidXQgdGhhdCB3b3VsZCByZXF1aXJlIHNvbWUgYWRkaXRpb25hbCBwb2x5ZmlsbHNcbiAgICAgICAgdGhpcy5fdHJhbnNwb3J0LnJlYWR5LnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fdHJhbnNwb3J0LmNyZWF0ZUJpZGlyZWN0aW9uYWxTdHJlYW0oKS50aGVuKChzdHJlYW0pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBkZWNvZGVyU3RyZWFtID0gKDAsIGVuZ2luZV9pb19wYXJzZXJfMS5jcmVhdGVQYWNrZXREZWNvZGVyU3RyZWFtKShOdW1iZXIuTUFYX1NBRkVfSU5URUdFUiwgdGhpcy5zb2NrZXQuYmluYXJ5VHlwZSk7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVhZGVyID0gc3RyZWFtLnJlYWRhYmxlLnBpcGVUaHJvdWdoKGRlY29kZXJTdHJlYW0pLmdldFJlYWRlcigpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGVuY29kZXJTdHJlYW0gPSAoMCwgZW5naW5lX2lvX3BhcnNlcl8xLmNyZWF0ZVBhY2tldEVuY29kZXJTdHJlYW0pKCk7XG4gICAgICAgICAgICAgICAgZW5jb2RlclN0cmVhbS5yZWFkYWJsZS5waXBlVG8oc3RyZWFtLndyaXRhYmxlKTtcbiAgICAgICAgICAgICAgICB0aGlzLl93cml0ZXIgPSBlbmNvZGVyU3RyZWFtLndyaXRhYmxlLmdldFdyaXRlcigpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlYWQgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJlYWRlclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlYWQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHsgZG9uZSwgdmFsdWUgfSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRvbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWJ1ZyhcInNlc3Npb24gaXMgY2xvc2VkXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGRlYnVnKFwicmVjZWl2ZWQgY2h1bms6ICVvXCIsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25QYWNrZXQodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVhZCgpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlYnVnKFwiYW4gZXJyb3Igb2NjdXJyZWQgd2hpbGUgcmVhZGluZzogJXNcIiwgZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICByZWFkKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgcGFja2V0ID0geyB0eXBlOiBcIm9wZW5cIiB9O1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnF1ZXJ5LnNpZCkge1xuICAgICAgICAgICAgICAgICAgICBwYWNrZXQuZGF0YSA9IGB7XCJzaWRcIjpcIiR7dGhpcy5xdWVyeS5zaWR9XCJ9YDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5fd3JpdGVyLndyaXRlKHBhY2tldCkudGhlbigoKSA9PiB0aGlzLm9uT3BlbigpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgd3JpdGUocGFja2V0cykge1xuICAgICAgICB0aGlzLndyaXRhYmxlID0gZmFsc2U7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFja2V0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgcGFja2V0ID0gcGFja2V0c1tpXTtcbiAgICAgICAgICAgIGNvbnN0IGxhc3RQYWNrZXQgPSBpID09PSBwYWNrZXRzLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICB0aGlzLl93cml0ZXIud3JpdGUocGFja2V0KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAobGFzdFBhY2tldCkge1xuICAgICAgICAgICAgICAgICAgICAoMCwgZ2xvYmFsc19ub2RlX2pzXzEubmV4dFRpY2spKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud3JpdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJkcmFpblwiKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgdGhpcy5zZXRUaW1lb3V0Rm4pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGRvQ2xvc2UoKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgKF9hID0gdGhpcy5fdHJhbnNwb3J0KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY2xvc2UoKTtcbiAgICB9XG59XG5leHBvcnRzLldUID0gV1Q7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMudHJhbnNwb3J0cyA9IHZvaWQgMDtcbmNvbnN0IHBvbGxpbmdfeGhyX25vZGVfanNfMSA9IHJlcXVpcmUoXCIuL3BvbGxpbmcteGhyLm5vZGUuanNcIik7XG5jb25zdCB3ZWJzb2NrZXRfbm9kZV9qc18xID0gcmVxdWlyZShcIi4vd2Vic29ja2V0Lm5vZGUuanNcIik7XG5jb25zdCB3ZWJ0cmFuc3BvcnRfanNfMSA9IHJlcXVpcmUoXCIuL3dlYnRyYW5zcG9ydC5qc1wiKTtcbmV4cG9ydHMudHJhbnNwb3J0cyA9IHtcbiAgICB3ZWJzb2NrZXQ6IHdlYnNvY2tldF9ub2RlX2pzXzEuV1MsXG4gICAgd2VidHJhbnNwb3J0OiB3ZWJ0cmFuc3BvcnRfanNfMS5XVCxcbiAgICBwb2xsaW5nOiBwb2xsaW5nX3hocl9ub2RlX2pzXzEuWEhSLFxufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5wYXJzZSA9IHBhcnNlO1xuLy8gaW1wb3J0ZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vZ2Fsa24vcGFyc2V1cmlcbi8qKlxuICogUGFyc2VzIGEgVVJJXG4gKlxuICogTm90ZTogd2UgY291bGQgYWxzbyBoYXZlIHVzZWQgdGhlIGJ1aWx0LWluIFVSTCBvYmplY3QsIGJ1dCBpdCBpc24ndCBzdXBwb3J0ZWQgb24gYWxsIHBsYXRmb3Jtcy5cbiAqXG4gKiBTZWU6XG4gKiAtIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9VUkxcbiAqIC0gaHR0cHM6Ly9jYW5pdXNlLmNvbS91cmxcbiAqIC0gaHR0cHM6Ly93d3cucmZjLWVkaXRvci5vcmcvcmZjL3JmYzM5ODYjYXBwZW5kaXgtQlxuICpcbiAqIEhpc3Rvcnkgb2YgdGhlIHBhcnNlKCkgbWV0aG9kOlxuICogLSBmaXJzdCBjb21taXQ6IGh0dHBzOi8vZ2l0aHViLmNvbS9zb2NrZXRpby9zb2NrZXQuaW8tY2xpZW50L2NvbW1pdC80ZWUxZDVkOTRiMzkwNmE5YzA1MmI0NTlmMWE4MThiMTVmMzhmOTFjXG4gKiAtIGV4cG9ydCBpbnRvIGl0cyBvd24gbW9kdWxlOiBodHRwczovL2dpdGh1Yi5jb20vc29ja2V0aW8vZW5naW5lLmlvLWNsaWVudC9jb21taXQvZGUyYzU2MWU0NTY0ZWZlYjc4ZjFiZGIxYmEzOWVmODFiMjgyMmNiM1xuICogLSByZWltcG9ydDogaHR0cHM6Ly9naXRodWIuY29tL3NvY2tldGlvL2VuZ2luZS5pby1jbGllbnQvY29tbWl0L2RmMzIyNzdjM2Y2ZDYyMmVlYzVlZDA5ZjQ5M2NhZTNmMzM5MWQyNDJcbiAqXG4gKiBAYXV0aG9yIFN0ZXZlbiBMZXZpdGhhbiA8c3RldmVubGV2aXRoYW4uY29tPiAoTUlUIGxpY2Vuc2UpXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuY29uc3QgcmUgPSAvXig/Oig/IVteOkBcXC8/I10rOlteOkBcXC9dKkApKGh0dHB8aHR0cHN8d3N8d3NzKTpcXC9cXC8pPygoPzooKFteOkBcXC8/I10qKSg/OjooW146QFxcLz8jXSopKT8pP0ApPygoPzpbYS1mMC05XXswLDR9Oil7Miw3fVthLWYwLTldezAsNH18W146XFwvPyNdKikoPzo6KFxcZCopKT8pKCgoXFwvKD86W14/I10oPyFbXj8jXFwvXSpcXC5bXj8jXFwvLl0rKD86Wz8jXXwkKSkpKlxcLz8pPyhbXj8jXFwvXSopKSg/OlxcPyhbXiNdKikpPyg/OiMoLiopKT8pLztcbmNvbnN0IHBhcnRzID0gW1xuICAgICdzb3VyY2UnLCAncHJvdG9jb2wnLCAnYXV0aG9yaXR5JywgJ3VzZXJJbmZvJywgJ3VzZXInLCAncGFzc3dvcmQnLCAnaG9zdCcsICdwb3J0JywgJ3JlbGF0aXZlJywgJ3BhdGgnLCAnZGlyZWN0b3J5JywgJ2ZpbGUnLCAncXVlcnknLCAnYW5jaG9yJ1xuXTtcbmZ1bmN0aW9uIHBhcnNlKHN0cikge1xuICAgIGlmIChzdHIubGVuZ3RoID4gODAwMCkge1xuICAgICAgICB0aHJvdyBcIlVSSSB0b28gbG9uZ1wiO1xuICAgIH1cbiAgICBjb25zdCBzcmMgPSBzdHIsIGIgPSBzdHIuaW5kZXhPZignWycpLCBlID0gc3RyLmluZGV4T2YoJ10nKTtcbiAgICBpZiAoYiAhPSAtMSAmJiBlICE9IC0xKSB7XG4gICAgICAgIHN0ciA9IHN0ci5zdWJzdHJpbmcoMCwgYikgKyBzdHIuc3Vic3RyaW5nKGIsIGUpLnJlcGxhY2UoLzovZywgJzsnKSArIHN0ci5zdWJzdHJpbmcoZSwgc3RyLmxlbmd0aCk7XG4gICAgfVxuICAgIGxldCBtID0gcmUuZXhlYyhzdHIgfHwgJycpLCB1cmkgPSB7fSwgaSA9IDE0O1xuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgdXJpW3BhcnRzW2ldXSA9IG1baV0gfHwgJyc7XG4gICAgfVxuICAgIGlmIChiICE9IC0xICYmIGUgIT0gLTEpIHtcbiAgICAgICAgdXJpLnNvdXJjZSA9IHNyYztcbiAgICAgICAgdXJpLmhvc3QgPSB1cmkuaG9zdC5zdWJzdHJpbmcoMSwgdXJpLmhvc3QubGVuZ3RoIC0gMSkucmVwbGFjZSgvOy9nLCAnOicpO1xuICAgICAgICB1cmkuYXV0aG9yaXR5ID0gdXJpLmF1dGhvcml0eS5yZXBsYWNlKCdbJywgJycpLnJlcGxhY2UoJ10nLCAnJykucmVwbGFjZSgvOy9nLCAnOicpO1xuICAgICAgICB1cmkuaXB2NnVyaSA9IHRydWU7XG4gICAgfVxuICAgIHVyaS5wYXRoTmFtZXMgPSBwYXRoTmFtZXModXJpLCB1cmlbJ3BhdGgnXSk7XG4gICAgdXJpLnF1ZXJ5S2V5ID0gcXVlcnlLZXkodXJpLCB1cmlbJ3F1ZXJ5J10pO1xuICAgIHJldHVybiB1cmk7XG59XG5mdW5jdGlvbiBwYXRoTmFtZXMob2JqLCBwYXRoKSB7XG4gICAgY29uc3QgcmVneCA9IC9cXC97Miw5fS9nLCBuYW1lcyA9IHBhdGgucmVwbGFjZShyZWd4LCBcIi9cIikuc3BsaXQoXCIvXCIpO1xuICAgIGlmIChwYXRoLnNsaWNlKDAsIDEpID09ICcvJyB8fCBwYXRoLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBuYW1lcy5zcGxpY2UoMCwgMSk7XG4gICAgfVxuICAgIGlmIChwYXRoLnNsaWNlKC0xKSA9PSAnLycpIHtcbiAgICAgICAgbmFtZXMuc3BsaWNlKG5hbWVzLmxlbmd0aCAtIDEsIDEpO1xuICAgIH1cbiAgICByZXR1cm4gbmFtZXM7XG59XG5mdW5jdGlvbiBxdWVyeUtleSh1cmksIHF1ZXJ5KSB7XG4gICAgY29uc3QgZGF0YSA9IHt9O1xuICAgIHF1ZXJ5LnJlcGxhY2UoLyg/Ol58JikoW14mPV0qKT0/KFteJl0qKS9nLCBmdW5jdGlvbiAoJDAsICQxLCAkMikge1xuICAgICAgICBpZiAoJDEpIHtcbiAgICAgICAgICAgIGRhdGFbJDFdID0gJDI7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gZGF0YTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5Tb2NrZXQgPSBleHBvcnRzLlNvY2tldFdpdGhVcGdyYWRlID0gZXhwb3J0cy5Tb2NrZXRXaXRob3V0VXBncmFkZSA9IHZvaWQgMDtcbmNvbnN0IGluZGV4X2pzXzEgPSByZXF1aXJlKFwiLi90cmFuc3BvcnRzL2luZGV4LmpzXCIpO1xuY29uc3QgdXRpbF9qc18xID0gcmVxdWlyZShcIi4vdXRpbC5qc1wiKTtcbmNvbnN0IHBhcnNlcXNfanNfMSA9IHJlcXVpcmUoXCIuL2NvbnRyaWIvcGFyc2Vxcy5qc1wiKTtcbmNvbnN0IHBhcnNldXJpX2pzXzEgPSByZXF1aXJlKFwiLi9jb250cmliL3BhcnNldXJpLmpzXCIpO1xuY29uc3QgY29tcG9uZW50X2VtaXR0ZXJfMSA9IHJlcXVpcmUoXCJAc29ja2V0LmlvL2NvbXBvbmVudC1lbWl0dGVyXCIpO1xuY29uc3QgZW5naW5lX2lvX3BhcnNlcl8xID0gcmVxdWlyZShcImVuZ2luZS5pby1wYXJzZXJcIik7XG5jb25zdCBnbG9iYWxzX25vZGVfanNfMSA9IHJlcXVpcmUoXCIuL2dsb2JhbHMubm9kZS5qc1wiKTtcbmNvbnN0IGRlYnVnXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcImRlYnVnXCIpKTsgLy8gZGVidWcoKVxuY29uc3QgZGVidWcgPSAoMCwgZGVidWdfMS5kZWZhdWx0KShcImVuZ2luZS5pby1jbGllbnQ6c29ja2V0XCIpOyAvLyBkZWJ1ZygpXG5jb25zdCB3aXRoRXZlbnRMaXN0ZW5lcnMgPSB0eXBlb2YgYWRkRXZlbnRMaXN0ZW5lciA9PT0gXCJmdW5jdGlvblwiICYmXG4gICAgdHlwZW9mIHJlbW92ZUV2ZW50TGlzdGVuZXIgPT09IFwiZnVuY3Rpb25cIjtcbmNvbnN0IE9GRkxJTkVfRVZFTlRfTElTVEVORVJTID0gW107XG5pZiAod2l0aEV2ZW50TGlzdGVuZXJzKSB7XG4gICAgLy8gd2l0aGluIGEgU2VydmljZVdvcmtlciwgYW55IGV2ZW50IGhhbmRsZXIgZm9yIHRoZSAnb2ZmbGluZScgZXZlbnQgbXVzdCBiZSBhZGRlZCBvbiB0aGUgaW5pdGlhbCBldmFsdWF0aW9uIG9mIHRoZVxuICAgIC8vIHNjcmlwdCwgc28gd2UgY3JlYXRlIG9uZSBzaW5nbGUgZXZlbnQgbGlzdGVuZXIgaGVyZSB3aGljaCB3aWxsIGZvcndhcmQgdGhlIGV2ZW50IHRvIHRoZSBzb2NrZXQgaW5zdGFuY2VzXG4gICAgYWRkRXZlbnRMaXN0ZW5lcihcIm9mZmxpbmVcIiwgKCkgPT4ge1xuICAgICAgICBkZWJ1ZyhcImNsb3NpbmcgJWQgY29ubmVjdGlvbihzKSBiZWNhdXNlIHRoZSBuZXR3b3JrIHdhcyBsb3N0XCIsIE9GRkxJTkVfRVZFTlRfTElTVEVORVJTLmxlbmd0aCk7XG4gICAgICAgIE9GRkxJTkVfRVZFTlRfTElTVEVORVJTLmZvckVhY2goKGxpc3RlbmVyKSA9PiBsaXN0ZW5lcigpKTtcbiAgICB9LCBmYWxzZSk7XG59XG4vKipcbiAqIFRoaXMgY2xhc3MgcHJvdmlkZXMgYSBXZWJTb2NrZXQtbGlrZSBpbnRlcmZhY2UgdG8gY29ubmVjdCB0byBhbiBFbmdpbmUuSU8gc2VydmVyLiBUaGUgY29ubmVjdGlvbiB3aWxsIGJlIGVzdGFibGlzaGVkXG4gKiB3aXRoIG9uZSBvZiB0aGUgYXZhaWxhYmxlIGxvdy1sZXZlbCB0cmFuc3BvcnRzLCBsaWtlIEhUVFAgbG9uZy1wb2xsaW5nLCBXZWJTb2NrZXQgb3IgV2ViVHJhbnNwb3J0LlxuICpcbiAqIFRoaXMgY2xhc3MgY29tZXMgd2l0aG91dCB1cGdyYWRlIG1lY2hhbmlzbSwgd2hpY2ggbWVhbnMgdGhhdCBpdCB3aWxsIGtlZXAgdGhlIGZpcnN0IGxvdy1sZXZlbCB0cmFuc3BvcnQgdGhhdFxuICogc3VjY2Vzc2Z1bGx5IGVzdGFibGlzaGVzIHRoZSBjb25uZWN0aW9uLlxuICpcbiAqIEluIG9yZGVyIHRvIGFsbG93IHRyZWUtc2hha2luZywgdGhlcmUgYXJlIG5vIHRyYW5zcG9ydHMgaW5jbHVkZWQsIHRoYXQncyB3aHkgdGhlIGB0cmFuc3BvcnRzYCBvcHRpb24gaXMgbWFuZGF0b3J5LlxuICpcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgeyBTb2NrZXRXaXRob3V0VXBncmFkZSwgV2ViU29ja2V0IH0gZnJvbSBcImVuZ2luZS5pby1jbGllbnRcIjtcbiAqXG4gKiBjb25zdCBzb2NrZXQgPSBuZXcgU29ja2V0V2l0aG91dFVwZ3JhZGUoe1xuICogICB0cmFuc3BvcnRzOiBbV2ViU29ja2V0XVxuICogfSk7XG4gKlxuICogc29ja2V0Lm9uKFwib3BlblwiLCAoKSA9PiB7XG4gKiAgIHNvY2tldC5zZW5kKFwiaGVsbG9cIik7XG4gKiB9KTtcbiAqXG4gKiBAc2VlIFNvY2tldFdpdGhVcGdyYWRlXG4gKiBAc2VlIFNvY2tldFxuICovXG5jbGFzcyBTb2NrZXRXaXRob3V0VXBncmFkZSBleHRlbmRzIGNvbXBvbmVudF9lbWl0dGVyXzEuRW1pdHRlciB7XG4gICAgLyoqXG4gICAgICogU29ja2V0IGNvbnN0cnVjdG9yLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fSB1cmkgLSB1cmkgb3Igb3B0aW9uc1xuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzIC0gb3B0aW9uc1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHVyaSwgb3B0cykge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmJpbmFyeVR5cGUgPSBnbG9iYWxzX25vZGVfanNfMS5kZWZhdWx0QmluYXJ5VHlwZTtcbiAgICAgICAgdGhpcy53cml0ZUJ1ZmZlciA9IFtdO1xuICAgICAgICB0aGlzLl9wcmV2QnVmZmVyTGVuID0gMDtcbiAgICAgICAgdGhpcy5fcGluZ0ludGVydmFsID0gLTE7XG4gICAgICAgIHRoaXMuX3BpbmdUaW1lb3V0ID0gLTE7XG4gICAgICAgIHRoaXMuX21heFBheWxvYWQgPSAtMTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBleHBpcmF0aW9uIHRpbWVzdGFtcCBvZiB0aGUge0BsaW5rIF9waW5nVGltZW91dFRpbWVyfSBvYmplY3QgaXMgdHJhY2tlZCwgaW4gY2FzZSB0aGUgdGltZXIgaXMgdGhyb3R0bGVkIGFuZCB0aGVcbiAgICAgICAgICogY2FsbGJhY2sgaXMgbm90IGZpcmVkIG9uIHRpbWUuIFRoaXMgY2FuIGhhcHBlbiBmb3IgZXhhbXBsZSB3aGVuIGEgbGFwdG9wIGlzIHN1c3BlbmRlZCBvciB3aGVuIGEgcGhvbmUgaXMgbG9ja2VkLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fcGluZ1RpbWVvdXRUaW1lID0gSW5maW5pdHk7XG4gICAgICAgIGlmICh1cmkgJiYgXCJvYmplY3RcIiA9PT0gdHlwZW9mIHVyaSkge1xuICAgICAgICAgICAgb3B0cyA9IHVyaTtcbiAgICAgICAgICAgIHVyaSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHVyaSkge1xuICAgICAgICAgICAgY29uc3QgcGFyc2VkVXJpID0gKDAsIHBhcnNldXJpX2pzXzEucGFyc2UpKHVyaSk7XG4gICAgICAgICAgICBvcHRzLmhvc3RuYW1lID0gcGFyc2VkVXJpLmhvc3Q7XG4gICAgICAgICAgICBvcHRzLnNlY3VyZSA9XG4gICAgICAgICAgICAgICAgcGFyc2VkVXJpLnByb3RvY29sID09PSBcImh0dHBzXCIgfHwgcGFyc2VkVXJpLnByb3RvY29sID09PSBcIndzc1wiO1xuICAgICAgICAgICAgb3B0cy5wb3J0ID0gcGFyc2VkVXJpLnBvcnQ7XG4gICAgICAgICAgICBpZiAocGFyc2VkVXJpLnF1ZXJ5KVxuICAgICAgICAgICAgICAgIG9wdHMucXVlcnkgPSBwYXJzZWRVcmkucXVlcnk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAob3B0cy5ob3N0KSB7XG4gICAgICAgICAgICBvcHRzLmhvc3RuYW1lID0gKDAsIHBhcnNldXJpX2pzXzEucGFyc2UpKG9wdHMuaG9zdCkuaG9zdDtcbiAgICAgICAgfVxuICAgICAgICAoMCwgdXRpbF9qc18xLmluc3RhbGxUaW1lckZ1bmN0aW9ucykodGhpcywgb3B0cyk7XG4gICAgICAgIHRoaXMuc2VjdXJlID1cbiAgICAgICAgICAgIG51bGwgIT0gb3B0cy5zZWN1cmVcbiAgICAgICAgICAgICAgICA/IG9wdHMuc2VjdXJlXG4gICAgICAgICAgICAgICAgOiB0eXBlb2YgbG9jYXRpb24gIT09IFwidW5kZWZpbmVkXCIgJiYgXCJodHRwczpcIiA9PT0gbG9jYXRpb24ucHJvdG9jb2w7XG4gICAgICAgIGlmIChvcHRzLmhvc3RuYW1lICYmICFvcHRzLnBvcnQpIHtcbiAgICAgICAgICAgIC8vIGlmIG5vIHBvcnQgaXMgc3BlY2lmaWVkIG1hbnVhbGx5LCB1c2UgdGhlIHByb3RvY29sIGRlZmF1bHRcbiAgICAgICAgICAgIG9wdHMucG9ydCA9IHRoaXMuc2VjdXJlID8gXCI0NDNcIiA6IFwiODBcIjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmhvc3RuYW1lID1cbiAgICAgICAgICAgIG9wdHMuaG9zdG5hbWUgfHxcbiAgICAgICAgICAgICAgICAodHlwZW9mIGxvY2F0aW9uICE9PSBcInVuZGVmaW5lZFwiID8gbG9jYXRpb24uaG9zdG5hbWUgOiBcImxvY2FsaG9zdFwiKTtcbiAgICAgICAgdGhpcy5wb3J0ID1cbiAgICAgICAgICAgIG9wdHMucG9ydCB8fFxuICAgICAgICAgICAgICAgICh0eXBlb2YgbG9jYXRpb24gIT09IFwidW5kZWZpbmVkXCIgJiYgbG9jYXRpb24ucG9ydFxuICAgICAgICAgICAgICAgICAgICA/IGxvY2F0aW9uLnBvcnRcbiAgICAgICAgICAgICAgICAgICAgOiB0aGlzLnNlY3VyZVxuICAgICAgICAgICAgICAgICAgICAgICAgPyBcIjQ0M1wiXG4gICAgICAgICAgICAgICAgICAgICAgICA6IFwiODBcIik7XG4gICAgICAgIHRoaXMudHJhbnNwb3J0cyA9IFtdO1xuICAgICAgICB0aGlzLl90cmFuc3BvcnRzQnlOYW1lID0ge307XG4gICAgICAgIG9wdHMudHJhbnNwb3J0cy5mb3JFYWNoKCh0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0cmFuc3BvcnROYW1lID0gdC5wcm90b3R5cGUubmFtZTtcbiAgICAgICAgICAgIHRoaXMudHJhbnNwb3J0cy5wdXNoKHRyYW5zcG9ydE5hbWUpO1xuICAgICAgICAgICAgdGhpcy5fdHJhbnNwb3J0c0J5TmFtZVt0cmFuc3BvcnROYW1lXSA9IHQ7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm9wdHMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgICAgICAgIHBhdGg6IFwiL2VuZ2luZS5pb1wiLFxuICAgICAgICAgICAgYWdlbnQ6IGZhbHNlLFxuICAgICAgICAgICAgd2l0aENyZWRlbnRpYWxzOiBmYWxzZSxcbiAgICAgICAgICAgIHVwZ3JhZGU6IHRydWUsXG4gICAgICAgICAgICB0aW1lc3RhbXBQYXJhbTogXCJ0XCIsXG4gICAgICAgICAgICByZW1lbWJlclVwZ3JhZGU6IGZhbHNlLFxuICAgICAgICAgICAgYWRkVHJhaWxpbmdTbGFzaDogdHJ1ZSxcbiAgICAgICAgICAgIHJlamVjdFVuYXV0aG9yaXplZDogdHJ1ZSxcbiAgICAgICAgICAgIHBlck1lc3NhZ2VEZWZsYXRlOiB7XG4gICAgICAgICAgICAgICAgdGhyZXNob2xkOiAxMDI0LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRyYW5zcG9ydE9wdGlvbnM6IHt9LFxuICAgICAgICAgICAgY2xvc2VPbkJlZm9yZXVubG9hZDogZmFsc2UsXG4gICAgICAgIH0sIG9wdHMpO1xuICAgICAgICB0aGlzLm9wdHMucGF0aCA9XG4gICAgICAgICAgICB0aGlzLm9wdHMucGF0aC5yZXBsYWNlKC9cXC8kLywgXCJcIikgK1xuICAgICAgICAgICAgICAgICh0aGlzLm9wdHMuYWRkVHJhaWxpbmdTbGFzaCA/IFwiL1wiIDogXCJcIik7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5vcHRzLnF1ZXJ5ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICB0aGlzLm9wdHMucXVlcnkgPSAoMCwgcGFyc2Vxc19qc18xLmRlY29kZSkodGhpcy5vcHRzLnF1ZXJ5KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAod2l0aEV2ZW50TGlzdGVuZXJzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRzLmNsb3NlT25CZWZvcmV1bmxvYWQpIHtcbiAgICAgICAgICAgICAgICAvLyBGaXJlZm94IGNsb3NlcyB0aGUgY29ubmVjdGlvbiB3aGVuIHRoZSBcImJlZm9yZXVubG9hZFwiIGV2ZW50IGlzIGVtaXR0ZWQgYnV0IG5vdCBDaHJvbWUuIFRoaXMgZXZlbnQgbGlzdGVuZXJcbiAgICAgICAgICAgICAgICAvLyBlbnN1cmVzIGV2ZXJ5IGJyb3dzZXIgYmVoYXZlcyB0aGUgc2FtZSAobm8gXCJkaXNjb25uZWN0XCIgZXZlbnQgYXQgdGhlIFNvY2tldC5JTyBsZXZlbCB3aGVuIHRoZSBwYWdlIGlzXG4gICAgICAgICAgICAgICAgLy8gY2xvc2VkL3JlbG9hZGVkKVxuICAgICAgICAgICAgICAgIHRoaXMuX2JlZm9yZXVubG9hZEV2ZW50TGlzdGVuZXIgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyYW5zcG9ydCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2lsZW50bHkgY2xvc2UgdGhlIHRyYW5zcG9ydFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFuc3BvcnQucmVtb3ZlQWxsTGlzdGVuZXJzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyYW5zcG9ydC5jbG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBhZGRFdmVudExpc3RlbmVyKFwiYmVmb3JldW5sb2FkXCIsIHRoaXMuX2JlZm9yZXVubG9hZEV2ZW50TGlzdGVuZXIsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmhvc3RuYW1lICE9PSBcImxvY2FsaG9zdFwiKSB7XG4gICAgICAgICAgICAgICAgZGVidWcoXCJhZGRpbmcgbGlzdGVuZXIgZm9yIHRoZSAnb2ZmbGluZScgZXZlbnRcIik7XG4gICAgICAgICAgICAgICAgdGhpcy5fb2ZmbGluZUV2ZW50TGlzdGVuZXIgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX29uQ2xvc2UoXCJ0cmFuc3BvcnQgY2xvc2VcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwibmV0d29yayBjb25uZWN0aW9uIGxvc3RcIixcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBPRkZMSU5FX0VWRU5UX0xJU1RFTkVSUy5wdXNoKHRoaXMuX29mZmxpbmVFdmVudExpc3RlbmVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vcHRzLndpdGhDcmVkZW50aWFscykge1xuICAgICAgICAgICAgdGhpcy5fY29va2llSmFyID0gKDAsIGdsb2JhbHNfbm9kZV9qc18xLmNyZWF0ZUNvb2tpZUphcikoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9vcGVuKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgdHJhbnNwb3J0IG9mIHRoZSBnaXZlbiB0eXBlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG5hbWUgLSB0cmFuc3BvcnQgbmFtZVxuICAgICAqIEByZXR1cm4ge1RyYW5zcG9ydH1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGNyZWF0ZVRyYW5zcG9ydChuYW1lKSB7XG4gICAgICAgIGRlYnVnKCdjcmVhdGluZyB0cmFuc3BvcnQgXCIlc1wiJywgbmFtZSk7XG4gICAgICAgIGNvbnN0IHF1ZXJ5ID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5vcHRzLnF1ZXJ5KTtcbiAgICAgICAgLy8gYXBwZW5kIGVuZ2luZS5pbyBwcm90b2NvbCBpZGVudGlmaWVyXG4gICAgICAgIHF1ZXJ5LkVJTyA9IGVuZ2luZV9pb19wYXJzZXJfMS5wcm90b2NvbDtcbiAgICAgICAgLy8gdHJhbnNwb3J0IG5hbWVcbiAgICAgICAgcXVlcnkudHJhbnNwb3J0ID0gbmFtZTtcbiAgICAgICAgLy8gc2Vzc2lvbiBpZCBpZiB3ZSBhbHJlYWR5IGhhdmUgb25lXG4gICAgICAgIGlmICh0aGlzLmlkKVxuICAgICAgICAgICAgcXVlcnkuc2lkID0gdGhpcy5pZDtcbiAgICAgICAgY29uc3Qgb3B0cyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMub3B0cywge1xuICAgICAgICAgICAgcXVlcnksXG4gICAgICAgICAgICBzb2NrZXQ6IHRoaXMsXG4gICAgICAgICAgICBob3N0bmFtZTogdGhpcy5ob3N0bmFtZSxcbiAgICAgICAgICAgIHNlY3VyZTogdGhpcy5zZWN1cmUsXG4gICAgICAgICAgICBwb3J0OiB0aGlzLnBvcnQsXG4gICAgICAgIH0sIHRoaXMub3B0cy50cmFuc3BvcnRPcHRpb25zW25hbWVdKTtcbiAgICAgICAgZGVidWcoXCJvcHRpb25zOiAlalwiLCBvcHRzKTtcbiAgICAgICAgcmV0dXJuIG5ldyB0aGlzLl90cmFuc3BvcnRzQnlOYW1lW25hbWVdKG9wdHMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyB0cmFuc3BvcnQgdG8gdXNlIGFuZCBzdGFydHMgcHJvYmUuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9vcGVuKCkge1xuICAgICAgICBpZiAodGhpcy50cmFuc3BvcnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgLy8gRW1pdCBlcnJvciBvbiBuZXh0IHRpY2sgc28gaXQgY2FuIGJlIGxpc3RlbmVkIHRvXG4gICAgICAgICAgICB0aGlzLnNldFRpbWVvdXRGbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJlcnJvclwiLCBcIk5vIHRyYW5zcG9ydHMgYXZhaWxhYmxlXCIpO1xuICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdHJhbnNwb3J0TmFtZSA9IHRoaXMub3B0cy5yZW1lbWJlclVwZ3JhZGUgJiZcbiAgICAgICAgICAgIFNvY2tldFdpdGhvdXRVcGdyYWRlLnByaW9yV2Vic29ja2V0U3VjY2VzcyAmJlxuICAgICAgICAgICAgdGhpcy50cmFuc3BvcnRzLmluZGV4T2YoXCJ3ZWJzb2NrZXRcIikgIT09IC0xXG4gICAgICAgICAgICA/IFwid2Vic29ja2V0XCJcbiAgICAgICAgICAgIDogdGhpcy50cmFuc3BvcnRzWzBdO1xuICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSBcIm9wZW5pbmdcIjtcbiAgICAgICAgY29uc3QgdHJhbnNwb3J0ID0gdGhpcy5jcmVhdGVUcmFuc3BvcnQodHJhbnNwb3J0TmFtZSk7XG4gICAgICAgIHRyYW5zcG9ydC5vcGVuKCk7XG4gICAgICAgIHRoaXMuc2V0VHJhbnNwb3J0KHRyYW5zcG9ydCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGN1cnJlbnQgdHJhbnNwb3J0LiBEaXNhYmxlcyB0aGUgZXhpc3Rpbmcgb25lIChpZiBhbnkpLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBzZXRUcmFuc3BvcnQodHJhbnNwb3J0KSB7XG4gICAgICAgIGRlYnVnKFwic2V0dGluZyB0cmFuc3BvcnQgJXNcIiwgdHJhbnNwb3J0Lm5hbWUpO1xuICAgICAgICBpZiAodGhpcy50cmFuc3BvcnQpIHtcbiAgICAgICAgICAgIGRlYnVnKFwiY2xlYXJpbmcgZXhpc3RpbmcgdHJhbnNwb3J0ICVzXCIsIHRoaXMudHJhbnNwb3J0Lm5hbWUpO1xuICAgICAgICAgICAgdGhpcy50cmFuc3BvcnQucmVtb3ZlQWxsTGlzdGVuZXJzKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gc2V0IHVwIHRyYW5zcG9ydFxuICAgICAgICB0aGlzLnRyYW5zcG9ydCA9IHRyYW5zcG9ydDtcbiAgICAgICAgLy8gc2V0IHVwIHRyYW5zcG9ydCBsaXN0ZW5lcnNcbiAgICAgICAgdHJhbnNwb3J0XG4gICAgICAgICAgICAub24oXCJkcmFpblwiLCB0aGlzLl9vbkRyYWluLmJpbmQodGhpcykpXG4gICAgICAgICAgICAub24oXCJwYWNrZXRcIiwgdGhpcy5fb25QYWNrZXQuYmluZCh0aGlzKSlcbiAgICAgICAgICAgIC5vbihcImVycm9yXCIsIHRoaXMuX29uRXJyb3IuYmluZCh0aGlzKSlcbiAgICAgICAgICAgIC5vbihcImNsb3NlXCIsIChyZWFzb24pID0+IHRoaXMuX29uQ2xvc2UoXCJ0cmFuc3BvcnQgY2xvc2VcIiwgcmVhc29uKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB3aGVuIGNvbm5lY3Rpb24gaXMgZGVlbWVkIG9wZW4uXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIG9uT3BlbigpIHtcbiAgICAgICAgZGVidWcoXCJzb2NrZXQgb3BlblwiKTtcbiAgICAgICAgdGhpcy5yZWFkeVN0YXRlID0gXCJvcGVuXCI7XG4gICAgICAgIFNvY2tldFdpdGhvdXRVcGdyYWRlLnByaW9yV2Vic29ja2V0U3VjY2VzcyA9XG4gICAgICAgICAgICBcIndlYnNvY2tldFwiID09PSB0aGlzLnRyYW5zcG9ydC5uYW1lO1xuICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcIm9wZW5cIik7XG4gICAgICAgIHRoaXMuZmx1c2goKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGFuZGxlcyBhIHBhY2tldC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX29uUGFja2V0KHBhY2tldCkge1xuICAgICAgICBpZiAoXCJvcGVuaW5nXCIgPT09IHRoaXMucmVhZHlTdGF0ZSB8fFxuICAgICAgICAgICAgXCJvcGVuXCIgPT09IHRoaXMucmVhZHlTdGF0ZSB8fFxuICAgICAgICAgICAgXCJjbG9zaW5nXCIgPT09IHRoaXMucmVhZHlTdGF0ZSkge1xuICAgICAgICAgICAgZGVidWcoJ3NvY2tldCByZWNlaXZlOiB0eXBlIFwiJXNcIiwgZGF0YSBcIiVzXCInLCBwYWNrZXQudHlwZSwgcGFja2V0LmRhdGEpO1xuICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJwYWNrZXRcIiwgcGFja2V0KTtcbiAgICAgICAgICAgIC8vIFNvY2tldCBpcyBsaXZlIC0gYW55IHBhY2tldCBjb3VudHNcbiAgICAgICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwiaGVhcnRiZWF0XCIpO1xuICAgICAgICAgICAgc3dpdGNoIChwYWNrZXQudHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgXCJvcGVuXCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25IYW5kc2hha2UoSlNPTi5wYXJzZShwYWNrZXQuZGF0YSkpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwicGluZ1wiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZW5kUGFja2V0KFwicG9uZ1wiKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJwaW5nXCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcInBvbmdcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jlc2V0UGluZ1RpbWVvdXQoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImVycm9yXCI6XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVyciA9IG5ldyBFcnJvcihcInNlcnZlciBlcnJvclwiKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgICAgICBlcnIuY29kZSA9IHBhY2tldC5kYXRhO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9vbkVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJtZXNzYWdlXCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwiZGF0YVwiLCBwYWNrZXQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwibWVzc2FnZVwiLCBwYWNrZXQuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZGVidWcoJ3BhY2tldCByZWNlaXZlZCB3aXRoIHNvY2tldCByZWFkeVN0YXRlIFwiJXNcIicsIHRoaXMucmVhZHlTdGF0ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gaGFuZHNoYWtlIGNvbXBsZXRpb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YSAtIGhhbmRzaGFrZSBvYmpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIG9uSGFuZHNoYWtlKGRhdGEpIHtcbiAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJoYW5kc2hha2VcIiwgZGF0YSk7XG4gICAgICAgIHRoaXMuaWQgPSBkYXRhLnNpZDtcbiAgICAgICAgdGhpcy50cmFuc3BvcnQucXVlcnkuc2lkID0gZGF0YS5zaWQ7XG4gICAgICAgIHRoaXMuX3BpbmdJbnRlcnZhbCA9IGRhdGEucGluZ0ludGVydmFsO1xuICAgICAgICB0aGlzLl9waW5nVGltZW91dCA9IGRhdGEucGluZ1RpbWVvdXQ7XG4gICAgICAgIHRoaXMuX21heFBheWxvYWQgPSBkYXRhLm1heFBheWxvYWQ7XG4gICAgICAgIHRoaXMub25PcGVuKCk7XG4gICAgICAgIC8vIEluIGNhc2Ugb3BlbiBoYW5kbGVyIGNsb3NlcyBzb2NrZXRcbiAgICAgICAgaWYgKFwiY2xvc2VkXCIgPT09IHRoaXMucmVhZHlTdGF0ZSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdGhpcy5fcmVzZXRQaW5nVGltZW91dCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXRzIGFuZCByZXNldHMgcGluZyB0aW1lb3V0IHRpbWVyIGJhc2VkIG9uIHNlcnZlciBwaW5ncy5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX3Jlc2V0UGluZ1RpbWVvdXQoKSB7XG4gICAgICAgIHRoaXMuY2xlYXJUaW1lb3V0Rm4odGhpcy5fcGluZ1RpbWVvdXRUaW1lcik7XG4gICAgICAgIGNvbnN0IGRlbGF5ID0gdGhpcy5fcGluZ0ludGVydmFsICsgdGhpcy5fcGluZ1RpbWVvdXQ7XG4gICAgICAgIHRoaXMuX3BpbmdUaW1lb3V0VGltZSA9IERhdGUubm93KCkgKyBkZWxheTtcbiAgICAgICAgdGhpcy5fcGluZ1RpbWVvdXRUaW1lciA9IHRoaXMuc2V0VGltZW91dEZuKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX29uQ2xvc2UoXCJwaW5nIHRpbWVvdXRcIik7XG4gICAgICAgIH0sIGRlbGF5KTtcbiAgICAgICAgaWYgKHRoaXMub3B0cy5hdXRvVW5yZWYpIHtcbiAgICAgICAgICAgIHRoaXMuX3BpbmdUaW1lb3V0VGltZXIudW5yZWYoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgb24gYGRyYWluYCBldmVudFxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfb25EcmFpbigpIHtcbiAgICAgICAgdGhpcy53cml0ZUJ1ZmZlci5zcGxpY2UoMCwgdGhpcy5fcHJldkJ1ZmZlckxlbik7XG4gICAgICAgIC8vIHNldHRpbmcgcHJldkJ1ZmZlckxlbiA9IDAgaXMgdmVyeSBpbXBvcnRhbnRcbiAgICAgICAgLy8gZm9yIGV4YW1wbGUsIHdoZW4gdXBncmFkaW5nLCB1cGdyYWRlIHBhY2tldCBpcyBzZW50IG92ZXIsXG4gICAgICAgIC8vIGFuZCBhIG5vbnplcm8gcHJldkJ1ZmZlckxlbiBjb3VsZCBjYXVzZSBwcm9ibGVtcyBvbiBgZHJhaW5gXG4gICAgICAgIHRoaXMuX3ByZXZCdWZmZXJMZW4gPSAwO1xuICAgICAgICBpZiAoMCA9PT0gdGhpcy53cml0ZUJ1ZmZlci5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwiZHJhaW5cIik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmZsdXNoKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogRmx1c2ggd3JpdGUgYnVmZmVycy5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgZmx1c2goKSB7XG4gICAgICAgIGlmIChcImNsb3NlZFwiICE9PSB0aGlzLnJlYWR5U3RhdGUgJiZcbiAgICAgICAgICAgIHRoaXMudHJhbnNwb3J0LndyaXRhYmxlICYmXG4gICAgICAgICAgICAhdGhpcy51cGdyYWRpbmcgJiZcbiAgICAgICAgICAgIHRoaXMud3JpdGVCdWZmZXIubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBwYWNrZXRzID0gdGhpcy5fZ2V0V3JpdGFibGVQYWNrZXRzKCk7XG4gICAgICAgICAgICBkZWJ1ZyhcImZsdXNoaW5nICVkIHBhY2tldHMgaW4gc29ja2V0XCIsIHBhY2tldHMubGVuZ3RoKTtcbiAgICAgICAgICAgIHRoaXMudHJhbnNwb3J0LnNlbmQocGFja2V0cyk7XG4gICAgICAgICAgICAvLyBrZWVwIHRyYWNrIG9mIGN1cnJlbnQgbGVuZ3RoIG9mIHdyaXRlQnVmZmVyXG4gICAgICAgICAgICAvLyBzcGxpY2Ugd3JpdGVCdWZmZXIgYW5kIGNhbGxiYWNrQnVmZmVyIG9uIGBkcmFpbmBcbiAgICAgICAgICAgIHRoaXMuX3ByZXZCdWZmZXJMZW4gPSBwYWNrZXRzLmxlbmd0aDtcbiAgICAgICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwiZmx1c2hcIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogRW5zdXJlIHRoZSBlbmNvZGVkIHNpemUgb2YgdGhlIHdyaXRlQnVmZmVyIGlzIGJlbG93IHRoZSBtYXhQYXlsb2FkIHZhbHVlIHNlbnQgYnkgdGhlIHNlcnZlciAob25seSBmb3IgSFRUUFxuICAgICAqIGxvbmctcG9sbGluZylcbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2dldFdyaXRhYmxlUGFja2V0cygpIHtcbiAgICAgICAgY29uc3Qgc2hvdWxkQ2hlY2tQYXlsb2FkU2l6ZSA9IHRoaXMuX21heFBheWxvYWQgJiZcbiAgICAgICAgICAgIHRoaXMudHJhbnNwb3J0Lm5hbWUgPT09IFwicG9sbGluZ1wiICYmXG4gICAgICAgICAgICB0aGlzLndyaXRlQnVmZmVyLmxlbmd0aCA+IDE7XG4gICAgICAgIGlmICghc2hvdWxkQ2hlY2tQYXlsb2FkU2l6ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMud3JpdGVCdWZmZXI7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHBheWxvYWRTaXplID0gMTsgLy8gZmlyc3QgcGFja2V0IHR5cGVcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLndyaXRlQnVmZmVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBkYXRhID0gdGhpcy53cml0ZUJ1ZmZlcltpXS5kYXRhO1xuICAgICAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBwYXlsb2FkU2l6ZSArPSAoMCwgdXRpbF9qc18xLmJ5dGVMZW5ndGgpKGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGkgPiAwICYmIHBheWxvYWRTaXplID4gdGhpcy5fbWF4UGF5bG9hZCkge1xuICAgICAgICAgICAgICAgIGRlYnVnKFwib25seSBzZW5kICVkIG91dCBvZiAlZCBwYWNrZXRzXCIsIGksIHRoaXMud3JpdGVCdWZmZXIubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy53cml0ZUJ1ZmZlci5zbGljZSgwLCBpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBheWxvYWRTaXplICs9IDI7IC8vIHNlcGFyYXRvciArIHBhY2tldCB0eXBlXG4gICAgICAgIH1cbiAgICAgICAgZGVidWcoXCJwYXlsb2FkIHNpemUgaXMgJWQgKG1heDogJWQpXCIsIHBheWxvYWRTaXplLCB0aGlzLl9tYXhQYXlsb2FkKTtcbiAgICAgICAgcmV0dXJuIHRoaXMud3JpdGVCdWZmZXI7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENoZWNrcyB3aGV0aGVyIHRoZSBoZWFydGJlYXQgdGltZXIgaGFzIGV4cGlyZWQgYnV0IHRoZSBzb2NrZXQgaGFzIG5vdCB5ZXQgYmVlbiBub3RpZmllZC5cbiAgICAgKlxuICAgICAqIE5vdGU6IHRoaXMgbWV0aG9kIGlzIHByaXZhdGUgZm9yIG5vdyBiZWNhdXNlIGl0IGRvZXMgbm90IHJlYWxseSBmaXQgdGhlIFdlYlNvY2tldCBBUEksIGJ1dCBpZiB3ZSBwdXQgaXQgaW4gdGhlXG4gICAgICogYHdyaXRlKClgIG1ldGhvZCB0aGVuIHRoZSBtZXNzYWdlIHdvdWxkIG5vdCBiZSBidWZmZXJlZCBieSB0aGUgU29ja2V0LklPIGNsaWVudC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICAvKiBwcml2YXRlICovIF9oYXNQaW5nRXhwaXJlZCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9waW5nVGltZW91dFRpbWUpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgY29uc3QgaGFzRXhwaXJlZCA9IERhdGUubm93KCkgPiB0aGlzLl9waW5nVGltZW91dFRpbWU7XG4gICAgICAgIGlmIChoYXNFeHBpcmVkKSB7XG4gICAgICAgICAgICBkZWJ1ZyhcInRocm90dGxlZCB0aW1lciBkZXRlY3RlZCwgc2NoZWR1bGluZyBjb25uZWN0aW9uIGNsb3NlXCIpO1xuICAgICAgICAgICAgdGhpcy5fcGluZ1RpbWVvdXRUaW1lID0gMDtcbiAgICAgICAgICAgICgwLCBnbG9iYWxzX25vZGVfanNfMS5uZXh0VGljaykoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX29uQ2xvc2UoXCJwaW5nIHRpbWVvdXRcIik7XG4gICAgICAgICAgICB9LCB0aGlzLnNldFRpbWVvdXRGbik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGhhc0V4cGlyZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNlbmRzIGEgbWVzc2FnZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBtc2cgLSBtZXNzYWdlLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIC0gY2FsbGJhY2sgZnVuY3Rpb24uXG4gICAgICogQHJldHVybiB7U29ja2V0fSBmb3IgY2hhaW5pbmcuXG4gICAgICovXG4gICAgd3JpdGUobXNnLCBvcHRpb25zLCBmbikge1xuICAgICAgICB0aGlzLl9zZW5kUGFja2V0KFwibWVzc2FnZVwiLCBtc2csIG9wdGlvbnMsIGZuKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNlbmRzIGEgbWVzc2FnZS4gQWxpYXMgb2Yge0BsaW5rIFNvY2tldCN3cml0ZX0uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbXNnIC0gbWVzc2FnZS5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiAtIGNhbGxiYWNrIGZ1bmN0aW9uLlxuICAgICAqIEByZXR1cm4ge1NvY2tldH0gZm9yIGNoYWluaW5nLlxuICAgICAqL1xuICAgIHNlbmQobXNnLCBvcHRpb25zLCBmbikge1xuICAgICAgICB0aGlzLl9zZW5kUGFja2V0KFwibWVzc2FnZVwiLCBtc2csIG9wdGlvbnMsIGZuKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNlbmRzIGEgcGFja2V0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHR5cGU6IHBhY2tldCB0eXBlLlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIC0gY2FsbGJhY2sgZnVuY3Rpb24uXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfc2VuZFBhY2tldCh0eXBlLCBkYXRhLCBvcHRpb25zLCBmbikge1xuICAgICAgICBpZiAoXCJmdW5jdGlvblwiID09PSB0eXBlb2YgZGF0YSkge1xuICAgICAgICAgICAgZm4gPSBkYXRhO1xuICAgICAgICAgICAgZGF0YSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoXCJmdW5jdGlvblwiID09PSB0eXBlb2Ygb3B0aW9ucykge1xuICAgICAgICAgICAgZm4gPSBvcHRpb25zO1xuICAgICAgICAgICAgb3B0aW9ucyA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFwiY2xvc2luZ1wiID09PSB0aGlzLnJlYWR5U3RhdGUgfHwgXCJjbG9zZWRcIiA9PT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgICAgIG9wdGlvbnMuY29tcHJlc3MgPSBmYWxzZSAhPT0gb3B0aW9ucy5jb21wcmVzcztcbiAgICAgICAgY29uc3QgcGFja2V0ID0ge1xuICAgICAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICBvcHRpb25zOiBvcHRpb25zLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcInBhY2tldENyZWF0ZVwiLCBwYWNrZXQpO1xuICAgICAgICB0aGlzLndyaXRlQnVmZmVyLnB1c2gocGFja2V0KTtcbiAgICAgICAgaWYgKGZuKVxuICAgICAgICAgICAgdGhpcy5vbmNlKFwiZmx1c2hcIiwgZm4pO1xuICAgICAgICB0aGlzLmZsdXNoKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsb3NlcyB0aGUgY29ubmVjdGlvbi5cbiAgICAgKi9cbiAgICBjbG9zZSgpIHtcbiAgICAgICAgY29uc3QgY2xvc2UgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9vbkNsb3NlKFwiZm9yY2VkIGNsb3NlXCIpO1xuICAgICAgICAgICAgZGVidWcoXCJzb2NrZXQgY2xvc2luZyAtIHRlbGxpbmcgdHJhbnNwb3J0IHRvIGNsb3NlXCIpO1xuICAgICAgICAgICAgdGhpcy50cmFuc3BvcnQuY2xvc2UoKTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgY2xlYW51cEFuZENsb3NlID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5vZmYoXCJ1cGdyYWRlXCIsIGNsZWFudXBBbmRDbG9zZSk7XG4gICAgICAgICAgICB0aGlzLm9mZihcInVwZ3JhZGVFcnJvclwiLCBjbGVhbnVwQW5kQ2xvc2UpO1xuICAgICAgICAgICAgY2xvc2UoKTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3Qgd2FpdEZvclVwZ3JhZGUgPSAoKSA9PiB7XG4gICAgICAgICAgICAvLyB3YWl0IGZvciB1cGdyYWRlIHRvIGZpbmlzaCBzaW5jZSB3ZSBjYW4ndCBzZW5kIHBhY2tldHMgd2hpbGUgcGF1c2luZyBhIHRyYW5zcG9ydFxuICAgICAgICAgICAgdGhpcy5vbmNlKFwidXBncmFkZVwiLCBjbGVhbnVwQW5kQ2xvc2UpO1xuICAgICAgICAgICAgdGhpcy5vbmNlKFwidXBncmFkZUVycm9yXCIsIGNsZWFudXBBbmRDbG9zZSk7XG4gICAgICAgIH07XG4gICAgICAgIGlmIChcIm9wZW5pbmdcIiA9PT0gdGhpcy5yZWFkeVN0YXRlIHx8IFwib3BlblwiID09PSB0aGlzLnJlYWR5U3RhdGUpIHtcbiAgICAgICAgICAgIHRoaXMucmVhZHlTdGF0ZSA9IFwiY2xvc2luZ1wiO1xuICAgICAgICAgICAgaWYgKHRoaXMud3JpdGVCdWZmZXIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbmNlKFwiZHJhaW5cIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy51cGdyYWRpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdhaXRGb3JVcGdyYWRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLnVwZ3JhZGluZykge1xuICAgICAgICAgICAgICAgIHdhaXRGb3JVcGdyYWRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjbG9zZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgdXBvbiB0cmFuc3BvcnQgZXJyb3JcbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX29uRXJyb3IoZXJyKSB7XG4gICAgICAgIGRlYnVnKFwic29ja2V0IGVycm9yICVqXCIsIGVycik7XG4gICAgICAgIFNvY2tldFdpdGhvdXRVcGdyYWRlLnByaW9yV2Vic29ja2V0U3VjY2VzcyA9IGZhbHNlO1xuICAgICAgICBpZiAodGhpcy5vcHRzLnRyeUFsbFRyYW5zcG9ydHMgJiZcbiAgICAgICAgICAgIHRoaXMudHJhbnNwb3J0cy5sZW5ndGggPiAxICYmXG4gICAgICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPT09IFwib3BlbmluZ1wiKSB7XG4gICAgICAgICAgICBkZWJ1ZyhcInRyeWluZyBuZXh0IHRyYW5zcG9ydFwiKTtcbiAgICAgICAgICAgIHRoaXMudHJhbnNwb3J0cy5zaGlmdCgpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX29wZW4oKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcImVycm9yXCIsIGVycik7XG4gICAgICAgIHRoaXMuX29uQ2xvc2UoXCJ0cmFuc3BvcnQgZXJyb3JcIiwgZXJyKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gdHJhbnNwb3J0IGNsb3NlLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfb25DbG9zZShyZWFzb24sIGRlc2NyaXB0aW9uKSB7XG4gICAgICAgIGlmIChcIm9wZW5pbmdcIiA9PT0gdGhpcy5yZWFkeVN0YXRlIHx8XG4gICAgICAgICAgICBcIm9wZW5cIiA9PT0gdGhpcy5yZWFkeVN0YXRlIHx8XG4gICAgICAgICAgICBcImNsb3NpbmdcIiA9PT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgICAgICAgICBkZWJ1Zygnc29ja2V0IGNsb3NlIHdpdGggcmVhc29uOiBcIiVzXCInLCByZWFzb24pO1xuICAgICAgICAgICAgLy8gY2xlYXIgdGltZXJzXG4gICAgICAgICAgICB0aGlzLmNsZWFyVGltZW91dEZuKHRoaXMuX3BpbmdUaW1lb3V0VGltZXIpO1xuICAgICAgICAgICAgLy8gc3RvcCBldmVudCBmcm9tIGZpcmluZyBhZ2FpbiBmb3IgdHJhbnNwb3J0XG4gICAgICAgICAgICB0aGlzLnRyYW5zcG9ydC5yZW1vdmVBbGxMaXN0ZW5lcnMoXCJjbG9zZVwiKTtcbiAgICAgICAgICAgIC8vIGVuc3VyZSB0cmFuc3BvcnQgd29uJ3Qgc3RheSBvcGVuXG4gICAgICAgICAgICB0aGlzLnRyYW5zcG9ydC5jbG9zZSgpO1xuICAgICAgICAgICAgLy8gaWdub3JlIGZ1cnRoZXIgdHJhbnNwb3J0IGNvbW11bmljYXRpb25cbiAgICAgICAgICAgIHRoaXMudHJhbnNwb3J0LnJlbW92ZUFsbExpc3RlbmVycygpO1xuICAgICAgICAgICAgaWYgKHdpdGhFdmVudExpc3RlbmVycykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9iZWZvcmV1bmxvYWRFdmVudExpc3RlbmVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUV2ZW50TGlzdGVuZXIoXCJiZWZvcmV1bmxvYWRcIiwgdGhpcy5fYmVmb3JldW5sb2FkRXZlbnRMaXN0ZW5lciwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fb2ZmbGluZUV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaSA9IE9GRkxJTkVfRVZFTlRfTElTVEVORVJTLmluZGV4T2YodGhpcy5fb2ZmbGluZUV2ZW50TGlzdGVuZXIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlYnVnKFwicmVtb3ZpbmcgbGlzdGVuZXIgZm9yIHRoZSAnb2ZmbGluZScgZXZlbnRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBPRkZMSU5FX0VWRU5UX0xJU1RFTkVSUy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBzZXQgcmVhZHkgc3RhdGVcbiAgICAgICAgICAgIHRoaXMucmVhZHlTdGF0ZSA9IFwiY2xvc2VkXCI7XG4gICAgICAgICAgICAvLyBjbGVhciBzZXNzaW9uIGlkXG4gICAgICAgICAgICB0aGlzLmlkID0gbnVsbDtcbiAgICAgICAgICAgIC8vIGVtaXQgY2xvc2UgZXZlbnRcbiAgICAgICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwiY2xvc2VcIiwgcmVhc29uLCBkZXNjcmlwdGlvbik7XG4gICAgICAgICAgICAvLyBjbGVhbiBidWZmZXJzIGFmdGVyLCBzbyB1c2VycyBjYW4gc3RpbGxcbiAgICAgICAgICAgIC8vIGdyYWIgdGhlIGJ1ZmZlcnMgb24gYGNsb3NlYCBldmVudFxuICAgICAgICAgICAgdGhpcy53cml0ZUJ1ZmZlciA9IFtdO1xuICAgICAgICAgICAgdGhpcy5fcHJldkJ1ZmZlckxlbiA9IDA7XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLlNvY2tldFdpdGhvdXRVcGdyYWRlID0gU29ja2V0V2l0aG91dFVwZ3JhZGU7XG5Tb2NrZXRXaXRob3V0VXBncmFkZS5wcm90b2NvbCA9IGVuZ2luZV9pb19wYXJzZXJfMS5wcm90b2NvbDtcbi8qKlxuICogVGhpcyBjbGFzcyBwcm92aWRlcyBhIFdlYlNvY2tldC1saWtlIGludGVyZmFjZSB0byBjb25uZWN0IHRvIGFuIEVuZ2luZS5JTyBzZXJ2ZXIuIFRoZSBjb25uZWN0aW9uIHdpbGwgYmUgZXN0YWJsaXNoZWRcbiAqIHdpdGggb25lIG9mIHRoZSBhdmFpbGFibGUgbG93LWxldmVsIHRyYW5zcG9ydHMsIGxpa2UgSFRUUCBsb25nLXBvbGxpbmcsIFdlYlNvY2tldCBvciBXZWJUcmFuc3BvcnQuXG4gKlxuICogVGhpcyBjbGFzcyBjb21lcyB3aXRoIGFuIHVwZ3JhZGUgbWVjaGFuaXNtLCB3aGljaCBtZWFucyB0aGF0IG9uY2UgdGhlIGNvbm5lY3Rpb24gaXMgZXN0YWJsaXNoZWQgd2l0aCB0aGUgZmlyc3RcbiAqIGxvdy1sZXZlbCB0cmFuc3BvcnQsIGl0IHdpbGwgdHJ5IHRvIHVwZ3JhZGUgdG8gYSBiZXR0ZXIgdHJhbnNwb3J0LlxuICpcbiAqIEluIG9yZGVyIHRvIGFsbG93IHRyZWUtc2hha2luZywgdGhlcmUgYXJlIG5vIHRyYW5zcG9ydHMgaW5jbHVkZWQsIHRoYXQncyB3aHkgdGhlIGB0cmFuc3BvcnRzYCBvcHRpb24gaXMgbWFuZGF0b3J5LlxuICpcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgeyBTb2NrZXRXaXRoVXBncmFkZSwgV2ViU29ja2V0IH0gZnJvbSBcImVuZ2luZS5pby1jbGllbnRcIjtcbiAqXG4gKiBjb25zdCBzb2NrZXQgPSBuZXcgU29ja2V0V2l0aFVwZ3JhZGUoe1xuICogICB0cmFuc3BvcnRzOiBbV2ViU29ja2V0XVxuICogfSk7XG4gKlxuICogc29ja2V0Lm9uKFwib3BlblwiLCAoKSA9PiB7XG4gKiAgIHNvY2tldC5zZW5kKFwiaGVsbG9cIik7XG4gKiB9KTtcbiAqXG4gKiBAc2VlIFNvY2tldFdpdGhvdXRVcGdyYWRlXG4gKiBAc2VlIFNvY2tldFxuICovXG5jbGFzcyBTb2NrZXRXaXRoVXBncmFkZSBleHRlbmRzIFNvY2tldFdpdGhvdXRVcGdyYWRlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKTtcbiAgICAgICAgdGhpcy5fdXBncmFkZXMgPSBbXTtcbiAgICB9XG4gICAgb25PcGVuKCkge1xuICAgICAgICBzdXBlci5vbk9wZW4oKTtcbiAgICAgICAgaWYgKFwib3BlblwiID09PSB0aGlzLnJlYWR5U3RhdGUgJiYgdGhpcy5vcHRzLnVwZ3JhZGUpIHtcbiAgICAgICAgICAgIGRlYnVnKFwic3RhcnRpbmcgdXBncmFkZSBwcm9iZXNcIik7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3VwZ3JhZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcHJvYmUodGhpcy5fdXBncmFkZXNbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFByb2JlcyBhIHRyYW5zcG9ydC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIC0gdHJhbnNwb3J0IG5hbWVcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9wcm9iZShuYW1lKSB7XG4gICAgICAgIGRlYnVnKCdwcm9iaW5nIHRyYW5zcG9ydCBcIiVzXCInLCBuYW1lKTtcbiAgICAgICAgbGV0IHRyYW5zcG9ydCA9IHRoaXMuY3JlYXRlVHJhbnNwb3J0KG5hbWUpO1xuICAgICAgICBsZXQgZmFpbGVkID0gZmFsc2U7XG4gICAgICAgIFNvY2tldFdpdGhvdXRVcGdyYWRlLnByaW9yV2Vic29ja2V0U3VjY2VzcyA9IGZhbHNlO1xuICAgICAgICBjb25zdCBvblRyYW5zcG9ydE9wZW4gPSAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoZmFpbGVkKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGRlYnVnKCdwcm9iZSB0cmFuc3BvcnQgXCIlc1wiIG9wZW5lZCcsIG5hbWUpO1xuICAgICAgICAgICAgdHJhbnNwb3J0LnNlbmQoW3sgdHlwZTogXCJwaW5nXCIsIGRhdGE6IFwicHJvYmVcIiB9XSk7XG4gICAgICAgICAgICB0cmFuc3BvcnQub25jZShcInBhY2tldFwiLCAobXNnKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGZhaWxlZClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGlmIChcInBvbmdcIiA9PT0gbXNnLnR5cGUgJiYgXCJwcm9iZVwiID09PSBtc2cuZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICBkZWJ1ZygncHJvYmUgdHJhbnNwb3J0IFwiJXNcIiBwb25nJywgbmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBncmFkaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJ1cGdyYWRpbmdcIiwgdHJhbnNwb3J0KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0cmFuc3BvcnQpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIFNvY2tldFdpdGhvdXRVcGdyYWRlLnByaW9yV2Vic29ja2V0U3VjY2VzcyA9XG4gICAgICAgICAgICAgICAgICAgICAgICBcIndlYnNvY2tldFwiID09PSB0cmFuc3BvcnQubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgZGVidWcoJ3BhdXNpbmcgY3VycmVudCB0cmFuc3BvcnQgXCIlc1wiJywgdGhpcy50cmFuc3BvcnQubmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJhbnNwb3J0LnBhdXNlKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmYWlsZWQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFwiY2xvc2VkXCIgPT09IHRoaXMucmVhZHlTdGF0ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWJ1ZyhcImNoYW5naW5nIHRyYW5zcG9ydCBhbmQgc2VuZGluZyB1cGdyYWRlIHBhY2tldFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFudXAoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0VHJhbnNwb3J0KHRyYW5zcG9ydCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnQuc2VuZChbeyB0eXBlOiBcInVwZ3JhZGVcIiB9XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcInVwZ3JhZGVcIiwgdHJhbnNwb3J0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zcG9ydCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZ3JhZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mbHVzaCgpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGRlYnVnKCdwcm9iZSB0cmFuc3BvcnQgXCIlc1wiIGZhaWxlZCcsIG5hbWUpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBlcnIgPSBuZXcgRXJyb3IoXCJwcm9iZSBlcnJvclwiKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgICAgICBlcnIudHJhbnNwb3J0ID0gdHJhbnNwb3J0Lm5hbWU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwidXBncmFkZUVycm9yXCIsIGVycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIGZ1bmN0aW9uIGZyZWV6ZVRyYW5zcG9ydCgpIHtcbiAgICAgICAgICAgIGlmIChmYWlsZWQpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgLy8gQW55IGNhbGxiYWNrIGNhbGxlZCBieSB0cmFuc3BvcnQgc2hvdWxkIGJlIGlnbm9yZWQgc2luY2Ugbm93XG4gICAgICAgICAgICBmYWlsZWQgPSB0cnVlO1xuICAgICAgICAgICAgY2xlYW51cCgpO1xuICAgICAgICAgICAgdHJhbnNwb3J0LmNsb3NlKCk7XG4gICAgICAgICAgICB0cmFuc3BvcnQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIC8vIEhhbmRsZSBhbnkgZXJyb3IgdGhhdCBoYXBwZW5zIHdoaWxlIHByb2JpbmdcbiAgICAgICAgY29uc3Qgb25lcnJvciA9IChlcnIpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVycm9yID0gbmV3IEVycm9yKFwicHJvYmUgZXJyb3I6IFwiICsgZXJyKTtcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIGVycm9yLnRyYW5zcG9ydCA9IHRyYW5zcG9ydC5uYW1lO1xuICAgICAgICAgICAgZnJlZXplVHJhbnNwb3J0KCk7XG4gICAgICAgICAgICBkZWJ1ZygncHJvYmUgdHJhbnNwb3J0IFwiJXNcIiBmYWlsZWQgYmVjYXVzZSBvZiBlcnJvcjogJXMnLCBuYW1lLCBlcnIpO1xuICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJ1cGdyYWRlRXJyb3JcIiwgZXJyb3IpO1xuICAgICAgICB9O1xuICAgICAgICBmdW5jdGlvbiBvblRyYW5zcG9ydENsb3NlKCkge1xuICAgICAgICAgICAgb25lcnJvcihcInRyYW5zcG9ydCBjbG9zZWRcIik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gV2hlbiB0aGUgc29ja2V0IGlzIGNsb3NlZCB3aGlsZSB3ZSdyZSBwcm9iaW5nXG4gICAgICAgIGZ1bmN0aW9uIG9uY2xvc2UoKSB7XG4gICAgICAgICAgICBvbmVycm9yKFwic29ja2V0IGNsb3NlZFwiKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBXaGVuIHRoZSBzb2NrZXQgaXMgdXBncmFkZWQgd2hpbGUgd2UncmUgcHJvYmluZ1xuICAgICAgICBmdW5jdGlvbiBvbnVwZ3JhZGUodG8pIHtcbiAgICAgICAgICAgIGlmICh0cmFuc3BvcnQgJiYgdG8ubmFtZSAhPT0gdHJhbnNwb3J0Lm5hbWUpIHtcbiAgICAgICAgICAgICAgICBkZWJ1ZygnXCIlc1wiIHdvcmtzIC0gYWJvcnRpbmcgXCIlc1wiJywgdG8ubmFtZSwgdHJhbnNwb3J0Lm5hbWUpO1xuICAgICAgICAgICAgICAgIGZyZWV6ZVRyYW5zcG9ydCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIFJlbW92ZSBhbGwgbGlzdGVuZXJzIG9uIHRoZSB0cmFuc3BvcnQgYW5kIG9uIHNlbGZcbiAgICAgICAgY29uc3QgY2xlYW51cCA9ICgpID0+IHtcbiAgICAgICAgICAgIHRyYW5zcG9ydC5yZW1vdmVMaXN0ZW5lcihcIm9wZW5cIiwgb25UcmFuc3BvcnRPcGVuKTtcbiAgICAgICAgICAgIHRyYW5zcG9ydC5yZW1vdmVMaXN0ZW5lcihcImVycm9yXCIsIG9uZXJyb3IpO1xuICAgICAgICAgICAgdHJhbnNwb3J0LnJlbW92ZUxpc3RlbmVyKFwiY2xvc2VcIiwgb25UcmFuc3BvcnRDbG9zZSk7XG4gICAgICAgICAgICB0aGlzLm9mZihcImNsb3NlXCIsIG9uY2xvc2UpO1xuICAgICAgICAgICAgdGhpcy5vZmYoXCJ1cGdyYWRpbmdcIiwgb251cGdyYWRlKTtcbiAgICAgICAgfTtcbiAgICAgICAgdHJhbnNwb3J0Lm9uY2UoXCJvcGVuXCIsIG9uVHJhbnNwb3J0T3Blbik7XG4gICAgICAgIHRyYW5zcG9ydC5vbmNlKFwiZXJyb3JcIiwgb25lcnJvcik7XG4gICAgICAgIHRyYW5zcG9ydC5vbmNlKFwiY2xvc2VcIiwgb25UcmFuc3BvcnRDbG9zZSk7XG4gICAgICAgIHRoaXMub25jZShcImNsb3NlXCIsIG9uY2xvc2UpO1xuICAgICAgICB0aGlzLm9uY2UoXCJ1cGdyYWRpbmdcIiwgb251cGdyYWRlKTtcbiAgICAgICAgaWYgKHRoaXMuX3VwZ3JhZGVzLmluZGV4T2YoXCJ3ZWJ0cmFuc3BvcnRcIikgIT09IC0xICYmXG4gICAgICAgICAgICBuYW1lICE9PSBcIndlYnRyYW5zcG9ydFwiKSB7XG4gICAgICAgICAgICAvLyBmYXZvciBXZWJUcmFuc3BvcnRcbiAgICAgICAgICAgIHRoaXMuc2V0VGltZW91dEZuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIWZhaWxlZCkge1xuICAgICAgICAgICAgICAgICAgICB0cmFuc3BvcnQub3BlbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDIwMCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0cmFuc3BvcnQub3BlbigpO1xuICAgICAgICB9XG4gICAgfVxuICAgIG9uSGFuZHNoYWtlKGRhdGEpIHtcbiAgICAgICAgdGhpcy5fdXBncmFkZXMgPSB0aGlzLl9maWx0ZXJVcGdyYWRlcyhkYXRhLnVwZ3JhZGVzKTtcbiAgICAgICAgc3VwZXIub25IYW5kc2hha2UoZGF0YSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEZpbHRlcnMgdXBncmFkZXMsIHJldHVybmluZyBvbmx5IHRob3NlIG1hdGNoaW5nIGNsaWVudCB0cmFuc3BvcnRzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtBcnJheX0gdXBncmFkZXMgLSBzZXJ2ZXIgdXBncmFkZXNcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9maWx0ZXJVcGdyYWRlcyh1cGdyYWRlcykge1xuICAgICAgICBjb25zdCBmaWx0ZXJlZFVwZ3JhZGVzID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdXBncmFkZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh+dGhpcy50cmFuc3BvcnRzLmluZGV4T2YodXBncmFkZXNbaV0pKVxuICAgICAgICAgICAgICAgIGZpbHRlcmVkVXBncmFkZXMucHVzaCh1cGdyYWRlc1tpXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZpbHRlcmVkVXBncmFkZXM7XG4gICAgfVxufVxuZXhwb3J0cy5Tb2NrZXRXaXRoVXBncmFkZSA9IFNvY2tldFdpdGhVcGdyYWRlO1xuLyoqXG4gKiBUaGlzIGNsYXNzIHByb3ZpZGVzIGEgV2ViU29ja2V0LWxpa2UgaW50ZXJmYWNlIHRvIGNvbm5lY3QgdG8gYW4gRW5naW5lLklPIHNlcnZlci4gVGhlIGNvbm5lY3Rpb24gd2lsbCBiZSBlc3RhYmxpc2hlZFxuICogd2l0aCBvbmUgb2YgdGhlIGF2YWlsYWJsZSBsb3ctbGV2ZWwgdHJhbnNwb3J0cywgbGlrZSBIVFRQIGxvbmctcG9sbGluZywgV2ViU29ja2V0IG9yIFdlYlRyYW5zcG9ydC5cbiAqXG4gKiBUaGlzIGNsYXNzIGNvbWVzIHdpdGggYW4gdXBncmFkZSBtZWNoYW5pc20sIHdoaWNoIG1lYW5zIHRoYXQgb25jZSB0aGUgY29ubmVjdGlvbiBpcyBlc3RhYmxpc2hlZCB3aXRoIHRoZSBmaXJzdFxuICogbG93LWxldmVsIHRyYW5zcG9ydCwgaXQgd2lsbCB0cnkgdG8gdXBncmFkZSB0byBhIGJldHRlciB0cmFuc3BvcnQuXG4gKlxuICogQGV4YW1wbGVcbiAqIGltcG9ydCB7IFNvY2tldCB9IGZyb20gXCJlbmdpbmUuaW8tY2xpZW50XCI7XG4gKlxuICogY29uc3Qgc29ja2V0ID0gbmV3IFNvY2tldCgpO1xuICpcbiAqIHNvY2tldC5vbihcIm9wZW5cIiwgKCkgPT4ge1xuICogICBzb2NrZXQuc2VuZChcImhlbGxvXCIpO1xuICogfSk7XG4gKlxuICogQHNlZSBTb2NrZXRXaXRob3V0VXBncmFkZVxuICogQHNlZSBTb2NrZXRXaXRoVXBncmFkZVxuICovXG5jbGFzcyBTb2NrZXQgZXh0ZW5kcyBTb2NrZXRXaXRoVXBncmFkZSB7XG4gICAgY29uc3RydWN0b3IodXJpLCBvcHRzID0ge30pIHtcbiAgICAgICAgY29uc3QgbyA9IHR5cGVvZiB1cmkgPT09IFwib2JqZWN0XCIgPyB1cmkgOiBvcHRzO1xuICAgICAgICBpZiAoIW8udHJhbnNwb3J0cyB8fFxuICAgICAgICAgICAgKG8udHJhbnNwb3J0cyAmJiB0eXBlb2Ygby50cmFuc3BvcnRzWzBdID09PSBcInN0cmluZ1wiKSkge1xuICAgICAgICAgICAgby50cmFuc3BvcnRzID0gKG8udHJhbnNwb3J0cyB8fCBbXCJwb2xsaW5nXCIsIFwid2Vic29ja2V0XCIsIFwid2VidHJhbnNwb3J0XCJdKVxuICAgICAgICAgICAgICAgIC5tYXAoKHRyYW5zcG9ydE5hbWUpID0+IGluZGV4X2pzXzEudHJhbnNwb3J0c1t0cmFuc3BvcnROYW1lXSlcbiAgICAgICAgICAgICAgICAuZmlsdGVyKCh0KSA9PiAhIXQpO1xuICAgICAgICB9XG4gICAgICAgIHN1cGVyKHVyaSwgbyk7XG4gICAgfVxufVxuZXhwb3J0cy5Tb2NrZXQgPSBTb2NrZXQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuRmV0Y2ggPSB2b2lkIDA7XG5jb25zdCBwb2xsaW5nX2pzXzEgPSByZXF1aXJlKFwiLi9wb2xsaW5nLmpzXCIpO1xuLyoqXG4gKiBIVFRQIGxvbmctcG9sbGluZyBiYXNlZCBvbiB0aGUgYnVpbHQtaW4gYGZldGNoKClgIG1ldGhvZC5cbiAqXG4gKiBVc2FnZTogYnJvd3NlciwgTm9kZS5qcyAoc2luY2UgdjE4KSwgRGVubywgQnVuXG4gKlxuICogQHNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvZmV0Y2hcbiAqIEBzZWUgaHR0cHM6Ly9jYW5pdXNlLmNvbS9mZXRjaFxuICogQHNlZSBodHRwczovL25vZGVqcy5vcmcvYXBpL2dsb2JhbHMuaHRtbCNmZXRjaFxuICovXG5jbGFzcyBGZXRjaCBleHRlbmRzIHBvbGxpbmdfanNfMS5Qb2xsaW5nIHtcbiAgICBkb1BvbGwoKSB7XG4gICAgICAgIHRoaXMuX2ZldGNoKClcbiAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgIGlmICghcmVzLm9rKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMub25FcnJvcihcImZldGNoIHJlYWQgZXJyb3JcIiwgcmVzLnN0YXR1cywgcmVzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlcy50ZXh0KCkudGhlbigoZGF0YSkgPT4gdGhpcy5vbkRhdGEoZGF0YSkpO1xuICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgIHRoaXMub25FcnJvcihcImZldGNoIHJlYWQgZXJyb3JcIiwgZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGRvV3JpdGUoZGF0YSwgY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5fZmV0Y2goZGF0YSlcbiAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgIGlmICghcmVzLm9rKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMub25FcnJvcihcImZldGNoIHdyaXRlIGVycm9yXCIsIHJlcy5zdGF0dXMsIHJlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgIHRoaXMub25FcnJvcihcImZldGNoIHdyaXRlIGVycm9yXCIsIGVycik7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBfZmV0Y2goZGF0YSkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGNvbnN0IGlzUG9zdCA9IGRhdGEgIT09IHVuZGVmaW5lZDtcbiAgICAgICAgY29uc3QgaGVhZGVycyA9IG5ldyBIZWFkZXJzKHRoaXMub3B0cy5leHRyYUhlYWRlcnMpO1xuICAgICAgICBpZiAoaXNQb3N0KSB7XG4gICAgICAgICAgICBoZWFkZXJzLnNldChcImNvbnRlbnQtdHlwZVwiLCBcInRleHQvcGxhaW47Y2hhcnNldD1VVEYtOFwiKTtcbiAgICAgICAgfVxuICAgICAgICAoX2EgPSB0aGlzLnNvY2tldC5fY29va2llSmFyKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuYXBwZW5kQ29va2llcyhoZWFkZXJzKTtcbiAgICAgICAgcmV0dXJuIGZldGNoKHRoaXMudXJpKCksIHtcbiAgICAgICAgICAgIG1ldGhvZDogaXNQb3N0ID8gXCJQT1NUXCIgOiBcIkdFVFwiLFxuICAgICAgICAgICAgYm9keTogaXNQb3N0ID8gZGF0YSA6IG51bGwsXG4gICAgICAgICAgICBoZWFkZXJzLFxuICAgICAgICAgICAgY3JlZGVudGlhbHM6IHRoaXMub3B0cy53aXRoQ3JlZGVudGlhbHMgPyBcImluY2x1ZGVcIiA6IFwib21pdFwiLFxuICAgICAgICB9KS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmUgZ2V0U2V0Q29va2llKCkgd2FzIGFkZGVkIGluIE5vZGUuanMgdjE5LjcuMFxuICAgICAgICAgICAgKF9hID0gdGhpcy5zb2NrZXQuX2Nvb2tpZUphcikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLnBhcnNlQ29va2llcyhyZXMuaGVhZGVycy5nZXRTZXRDb29raWUoKSk7XG4gICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5leHBvcnRzLkZldGNoID0gRmV0Y2g7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuV2ViVHJhbnNwb3J0ID0gZXhwb3J0cy5XZWJTb2NrZXQgPSBleHBvcnRzLk5vZGVXZWJTb2NrZXQgPSBleHBvcnRzLlhIUiA9IGV4cG9ydHMuTm9kZVhIUiA9IGV4cG9ydHMuRmV0Y2ggPSBleHBvcnRzLm5leHRUaWNrID0gZXhwb3J0cy5wYXJzZSA9IGV4cG9ydHMuaW5zdGFsbFRpbWVyRnVuY3Rpb25zID0gZXhwb3J0cy50cmFuc3BvcnRzID0gZXhwb3J0cy5UcmFuc3BvcnRFcnJvciA9IGV4cG9ydHMuVHJhbnNwb3J0ID0gZXhwb3J0cy5wcm90b2NvbCA9IGV4cG9ydHMuU29ja2V0V2l0aFVwZ3JhZGUgPSBleHBvcnRzLlNvY2tldFdpdGhvdXRVcGdyYWRlID0gZXhwb3J0cy5Tb2NrZXQgPSB2b2lkIDA7XG5jb25zdCBzb2NrZXRfanNfMSA9IHJlcXVpcmUoXCIuL3NvY2tldC5qc1wiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlNvY2tldFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gc29ja2V0X2pzXzEuU29ja2V0OyB9IH0pO1xudmFyIHNvY2tldF9qc18yID0gcmVxdWlyZShcIi4vc29ja2V0LmpzXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiU29ja2V0V2l0aG91dFVwZ3JhZGVcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNvY2tldF9qc18yLlNvY2tldFdpdGhvdXRVcGdyYWRlOyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiU29ja2V0V2l0aFVwZ3JhZGVcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNvY2tldF9qc18yLlNvY2tldFdpdGhVcGdyYWRlOyB9IH0pO1xuZXhwb3J0cy5wcm90b2NvbCA9IHNvY2tldF9qc18xLlNvY2tldC5wcm90b2NvbDtcbnZhciB0cmFuc3BvcnRfanNfMSA9IHJlcXVpcmUoXCIuL3RyYW5zcG9ydC5qc1wiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlRyYW5zcG9ydFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdHJhbnNwb3J0X2pzXzEuVHJhbnNwb3J0OyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiVHJhbnNwb3J0RXJyb3JcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRyYW5zcG9ydF9qc18xLlRyYW5zcG9ydEVycm9yOyB9IH0pO1xudmFyIGluZGV4X2pzXzEgPSByZXF1aXJlKFwiLi90cmFuc3BvcnRzL2luZGV4LmpzXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwidHJhbnNwb3J0c1wiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gaW5kZXhfanNfMS50cmFuc3BvcnRzOyB9IH0pO1xudmFyIHV0aWxfanNfMSA9IHJlcXVpcmUoXCIuL3V0aWwuanNcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJpbnN0YWxsVGltZXJGdW5jdGlvbnNcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHV0aWxfanNfMS5pbnN0YWxsVGltZXJGdW5jdGlvbnM7IH0gfSk7XG52YXIgcGFyc2V1cmlfanNfMSA9IHJlcXVpcmUoXCIuL2NvbnRyaWIvcGFyc2V1cmkuanNcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJwYXJzZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcGFyc2V1cmlfanNfMS5wYXJzZTsgfSB9KTtcbnZhciBnbG9iYWxzX25vZGVfanNfMSA9IHJlcXVpcmUoXCIuL2dsb2JhbHMubm9kZS5qc1wiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIm5leHRUaWNrXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBnbG9iYWxzX25vZGVfanNfMS5uZXh0VGljazsgfSB9KTtcbnZhciBwb2xsaW5nX2ZldGNoX2pzXzEgPSByZXF1aXJlKFwiLi90cmFuc3BvcnRzL3BvbGxpbmctZmV0Y2guanNcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJGZXRjaFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gcG9sbGluZ19mZXRjaF9qc18xLkZldGNoOyB9IH0pO1xudmFyIHBvbGxpbmdfeGhyX25vZGVfanNfMSA9IHJlcXVpcmUoXCIuL3RyYW5zcG9ydHMvcG9sbGluZy14aHIubm9kZS5qc1wiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIk5vZGVYSFJcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHBvbGxpbmdfeGhyX25vZGVfanNfMS5YSFI7IH0gfSk7XG52YXIgcG9sbGluZ194aHJfanNfMSA9IHJlcXVpcmUoXCIuL3RyYW5zcG9ydHMvcG9sbGluZy14aHIuanNcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJYSFJcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHBvbGxpbmdfeGhyX2pzXzEuWEhSOyB9IH0pO1xudmFyIHdlYnNvY2tldF9ub2RlX2pzXzEgPSByZXF1aXJlKFwiLi90cmFuc3BvcnRzL3dlYnNvY2tldC5ub2RlLmpzXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiTm9kZVdlYlNvY2tldFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gd2Vic29ja2V0X25vZGVfanNfMS5XUzsgfSB9KTtcbnZhciB3ZWJzb2NrZXRfanNfMSA9IHJlcXVpcmUoXCIuL3RyYW5zcG9ydHMvd2Vic29ja2V0LmpzXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiV2ViU29ja2V0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB3ZWJzb2NrZXRfanNfMS5XUzsgfSB9KTtcbnZhciB3ZWJ0cmFuc3BvcnRfanNfMSA9IHJlcXVpcmUoXCIuL3RyYW5zcG9ydHMvd2VidHJhbnNwb3J0LmpzXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiV2ViVHJhbnNwb3J0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB3ZWJ0cmFuc3BvcnRfanNfMS5XVDsgfSB9KTtcbiIsIlxuLyoqXG4gKiBUaGlzIGlzIHRoZSBjb21tb24gbG9naWMgZm9yIGJvdGggdGhlIE5vZGUuanMgYW5kIHdlYiBicm93c2VyXG4gKiBpbXBsZW1lbnRhdGlvbnMgb2YgYGRlYnVnKClgLlxuICovXG5cbmZ1bmN0aW9uIHNldHVwKGVudikge1xuXHRjcmVhdGVEZWJ1Zy5kZWJ1ZyA9IGNyZWF0ZURlYnVnO1xuXHRjcmVhdGVEZWJ1Zy5kZWZhdWx0ID0gY3JlYXRlRGVidWc7XG5cdGNyZWF0ZURlYnVnLmNvZXJjZSA9IGNvZXJjZTtcblx0Y3JlYXRlRGVidWcuZGlzYWJsZSA9IGRpc2FibGU7XG5cdGNyZWF0ZURlYnVnLmVuYWJsZSA9IGVuYWJsZTtcblx0Y3JlYXRlRGVidWcuZW5hYmxlZCA9IGVuYWJsZWQ7XG5cdGNyZWF0ZURlYnVnLmh1bWFuaXplID0gcmVxdWlyZSgnbXMnKTtcblx0Y3JlYXRlRGVidWcuZGVzdHJveSA9IGRlc3Ryb3k7XG5cblx0T2JqZWN0LmtleXMoZW52KS5mb3JFYWNoKGtleSA9PiB7XG5cdFx0Y3JlYXRlRGVidWdba2V5XSA9IGVudltrZXldO1xuXHR9KTtcblxuXHQvKipcblx0KiBUaGUgY3VycmVudGx5IGFjdGl2ZSBkZWJ1ZyBtb2RlIG5hbWVzLCBhbmQgbmFtZXMgdG8gc2tpcC5cblx0Ki9cblxuXHRjcmVhdGVEZWJ1Zy5uYW1lcyA9IFtdO1xuXHRjcmVhdGVEZWJ1Zy5za2lwcyA9IFtdO1xuXG5cdC8qKlxuXHQqIE1hcCBvZiBzcGVjaWFsIFwiJW5cIiBoYW5kbGluZyBmdW5jdGlvbnMsIGZvciB0aGUgZGVidWcgXCJmb3JtYXRcIiBhcmd1bWVudC5cblx0KlxuXHQqIFZhbGlkIGtleSBuYW1lcyBhcmUgYSBzaW5nbGUsIGxvd2VyIG9yIHVwcGVyLWNhc2UgbGV0dGVyLCBpLmUuIFwiblwiIGFuZCBcIk5cIi5cblx0Ki9cblx0Y3JlYXRlRGVidWcuZm9ybWF0dGVycyA9IHt9O1xuXG5cdC8qKlxuXHQqIFNlbGVjdHMgYSBjb2xvciBmb3IgYSBkZWJ1ZyBuYW1lc3BhY2Vcblx0KiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlIFRoZSBuYW1lc3BhY2Ugc3RyaW5nIGZvciB0aGUgZGVidWcgaW5zdGFuY2UgdG8gYmUgY29sb3JlZFxuXHQqIEByZXR1cm4ge051bWJlcnxTdHJpbmd9IEFuIEFOU0kgY29sb3IgY29kZSBmb3IgdGhlIGdpdmVuIG5hbWVzcGFjZVxuXHQqIEBhcGkgcHJpdmF0ZVxuXHQqL1xuXHRmdW5jdGlvbiBzZWxlY3RDb2xvcihuYW1lc3BhY2UpIHtcblx0XHRsZXQgaGFzaCA9IDA7XG5cblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IG5hbWVzcGFjZS5sZW5ndGg7IGkrKykge1xuXHRcdFx0aGFzaCA9ICgoaGFzaCA8PCA1KSAtIGhhc2gpICsgbmFtZXNwYWNlLmNoYXJDb2RlQXQoaSk7XG5cdFx0XHRoYXNoIHw9IDA7IC8vIENvbnZlcnQgdG8gMzJiaXQgaW50ZWdlclxuXHRcdH1cblxuXHRcdHJldHVybiBjcmVhdGVEZWJ1Zy5jb2xvcnNbTWF0aC5hYnMoaGFzaCkgJSBjcmVhdGVEZWJ1Zy5jb2xvcnMubGVuZ3RoXTtcblx0fVxuXHRjcmVhdGVEZWJ1Zy5zZWxlY3RDb2xvciA9IHNlbGVjdENvbG9yO1xuXG5cdC8qKlxuXHQqIENyZWF0ZSBhIGRlYnVnZ2VyIHdpdGggdGhlIGdpdmVuIGBuYW1lc3BhY2VgLlxuXHQqXG5cdCogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZVxuXHQqIEByZXR1cm4ge0Z1bmN0aW9ufVxuXHQqIEBhcGkgcHVibGljXG5cdCovXG5cdGZ1bmN0aW9uIGNyZWF0ZURlYnVnKG5hbWVzcGFjZSkge1xuXHRcdGxldCBwcmV2VGltZTtcblx0XHRsZXQgZW5hYmxlT3ZlcnJpZGUgPSBudWxsO1xuXHRcdGxldCBuYW1lc3BhY2VzQ2FjaGU7XG5cdFx0bGV0IGVuYWJsZWRDYWNoZTtcblxuXHRcdGZ1bmN0aW9uIGRlYnVnKC4uLmFyZ3MpIHtcblx0XHRcdC8vIERpc2FibGVkP1xuXHRcdFx0aWYgKCFkZWJ1Zy5lbmFibGVkKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Y29uc3Qgc2VsZiA9IGRlYnVnO1xuXG5cdFx0XHQvLyBTZXQgYGRpZmZgIHRpbWVzdGFtcFxuXHRcdFx0Y29uc3QgY3VyciA9IE51bWJlcihuZXcgRGF0ZSgpKTtcblx0XHRcdGNvbnN0IG1zID0gY3VyciAtIChwcmV2VGltZSB8fCBjdXJyKTtcblx0XHRcdHNlbGYuZGlmZiA9IG1zO1xuXHRcdFx0c2VsZi5wcmV2ID0gcHJldlRpbWU7XG5cdFx0XHRzZWxmLmN1cnIgPSBjdXJyO1xuXHRcdFx0cHJldlRpbWUgPSBjdXJyO1xuXG5cdFx0XHRhcmdzWzBdID0gY3JlYXRlRGVidWcuY29lcmNlKGFyZ3NbMF0pO1xuXG5cdFx0XHRpZiAodHlwZW9mIGFyZ3NbMF0gIT09ICdzdHJpbmcnKSB7XG5cdFx0XHRcdC8vIEFueXRoaW5nIGVsc2UgbGV0J3MgaW5zcGVjdCB3aXRoICVPXG5cdFx0XHRcdGFyZ3MudW5zaGlmdCgnJU8nKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gQXBwbHkgYW55IGBmb3JtYXR0ZXJzYCB0cmFuc2Zvcm1hdGlvbnNcblx0XHRcdGxldCBpbmRleCA9IDA7XG5cdFx0XHRhcmdzWzBdID0gYXJnc1swXS5yZXBsYWNlKC8lKFthLXpBLVolXSkvZywgKG1hdGNoLCBmb3JtYXQpID0+IHtcblx0XHRcdFx0Ly8gSWYgd2UgZW5jb3VudGVyIGFuIGVzY2FwZWQgJSB0aGVuIGRvbid0IGluY3JlYXNlIHRoZSBhcnJheSBpbmRleFxuXHRcdFx0XHRpZiAobWF0Y2ggPT09ICclJScpIHtcblx0XHRcdFx0XHRyZXR1cm4gJyUnO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGluZGV4Kys7XG5cdFx0XHRcdGNvbnN0IGZvcm1hdHRlciA9IGNyZWF0ZURlYnVnLmZvcm1hdHRlcnNbZm9ybWF0XTtcblx0XHRcdFx0aWYgKHR5cGVvZiBmb3JtYXR0ZXIgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0XHRjb25zdCB2YWwgPSBhcmdzW2luZGV4XTtcblx0XHRcdFx0XHRtYXRjaCA9IGZvcm1hdHRlci5jYWxsKHNlbGYsIHZhbCk7XG5cblx0XHRcdFx0XHQvLyBOb3cgd2UgbmVlZCB0byByZW1vdmUgYGFyZ3NbaW5kZXhdYCBzaW5jZSBpdCdzIGlubGluZWQgaW4gdGhlIGBmb3JtYXRgXG5cdFx0XHRcdFx0YXJncy5zcGxpY2UoaW5kZXgsIDEpO1xuXHRcdFx0XHRcdGluZGV4LS07XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIG1hdGNoO1xuXHRcdFx0fSk7XG5cblx0XHRcdC8vIEFwcGx5IGVudi1zcGVjaWZpYyBmb3JtYXR0aW5nIChjb2xvcnMsIGV0Yy4pXG5cdFx0XHRjcmVhdGVEZWJ1Zy5mb3JtYXRBcmdzLmNhbGwoc2VsZiwgYXJncyk7XG5cblx0XHRcdGNvbnN0IGxvZ0ZuID0gc2VsZi5sb2cgfHwgY3JlYXRlRGVidWcubG9nO1xuXHRcdFx0bG9nRm4uYXBwbHkoc2VsZiwgYXJncyk7XG5cdFx0fVxuXG5cdFx0ZGVidWcubmFtZXNwYWNlID0gbmFtZXNwYWNlO1xuXHRcdGRlYnVnLnVzZUNvbG9ycyA9IGNyZWF0ZURlYnVnLnVzZUNvbG9ycygpO1xuXHRcdGRlYnVnLmNvbG9yID0gY3JlYXRlRGVidWcuc2VsZWN0Q29sb3IobmFtZXNwYWNlKTtcblx0XHRkZWJ1Zy5leHRlbmQgPSBleHRlbmQ7XG5cdFx0ZGVidWcuZGVzdHJveSA9IGNyZWF0ZURlYnVnLmRlc3Ryb3k7IC8vIFhYWCBUZW1wb3JhcnkuIFdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgbmV4dCBtYWpvciByZWxlYXNlLlxuXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGRlYnVnLCAnZW5hYmxlZCcsIHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuXHRcdFx0Z2V0OiAoKSA9PiB7XG5cdFx0XHRcdGlmIChlbmFibGVPdmVycmlkZSAhPT0gbnVsbCkge1xuXHRcdFx0XHRcdHJldHVybiBlbmFibGVPdmVycmlkZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAobmFtZXNwYWNlc0NhY2hlICE9PSBjcmVhdGVEZWJ1Zy5uYW1lc3BhY2VzKSB7XG5cdFx0XHRcdFx0bmFtZXNwYWNlc0NhY2hlID0gY3JlYXRlRGVidWcubmFtZXNwYWNlcztcblx0XHRcdFx0XHRlbmFibGVkQ2FjaGUgPSBjcmVhdGVEZWJ1Zy5lbmFibGVkKG5hbWVzcGFjZSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gZW5hYmxlZENhY2hlO1xuXHRcdFx0fSxcblx0XHRcdHNldDogdiA9PiB7XG5cdFx0XHRcdGVuYWJsZU92ZXJyaWRlID0gdjtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdC8vIEVudi1zcGVjaWZpYyBpbml0aWFsaXphdGlvbiBsb2dpYyBmb3IgZGVidWcgaW5zdGFuY2VzXG5cdFx0aWYgKHR5cGVvZiBjcmVhdGVEZWJ1Zy5pbml0ID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRjcmVhdGVEZWJ1Zy5pbml0KGRlYnVnKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZGVidWc7XG5cdH1cblxuXHRmdW5jdGlvbiBleHRlbmQobmFtZXNwYWNlLCBkZWxpbWl0ZXIpIHtcblx0XHRjb25zdCBuZXdEZWJ1ZyA9IGNyZWF0ZURlYnVnKHRoaXMubmFtZXNwYWNlICsgKHR5cGVvZiBkZWxpbWl0ZXIgPT09ICd1bmRlZmluZWQnID8gJzonIDogZGVsaW1pdGVyKSArIG5hbWVzcGFjZSk7XG5cdFx0bmV3RGVidWcubG9nID0gdGhpcy5sb2c7XG5cdFx0cmV0dXJuIG5ld0RlYnVnO1xuXHR9XG5cblx0LyoqXG5cdCogRW5hYmxlcyBhIGRlYnVnIG1vZGUgYnkgbmFtZXNwYWNlcy4gVGhpcyBjYW4gaW5jbHVkZSBtb2Rlc1xuXHQqIHNlcGFyYXRlZCBieSBhIGNvbG9uIGFuZCB3aWxkY2FyZHMuXG5cdCpcblx0KiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlc1xuXHQqIEBhcGkgcHVibGljXG5cdCovXG5cdGZ1bmN0aW9uIGVuYWJsZShuYW1lc3BhY2VzKSB7XG5cdFx0Y3JlYXRlRGVidWcuc2F2ZShuYW1lc3BhY2VzKTtcblx0XHRjcmVhdGVEZWJ1Zy5uYW1lc3BhY2VzID0gbmFtZXNwYWNlcztcblxuXHRcdGNyZWF0ZURlYnVnLm5hbWVzID0gW107XG5cdFx0Y3JlYXRlRGVidWcuc2tpcHMgPSBbXTtcblxuXHRcdGxldCBpO1xuXHRcdGNvbnN0IHNwbGl0ID0gKHR5cGVvZiBuYW1lc3BhY2VzID09PSAnc3RyaW5nJyA/IG5hbWVzcGFjZXMgOiAnJykuc3BsaXQoL1tcXHMsXSsvKTtcblx0XHRjb25zdCBsZW4gPSBzcGxpdC5sZW5ndGg7XG5cblx0XHRmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcblx0XHRcdGlmICghc3BsaXRbaV0pIHtcblx0XHRcdFx0Ly8gaWdub3JlIGVtcHR5IHN0cmluZ3Ncblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHR9XG5cblx0XHRcdG5hbWVzcGFjZXMgPSBzcGxpdFtpXS5yZXBsYWNlKC9cXCovZywgJy4qPycpO1xuXG5cdFx0XHRpZiAobmFtZXNwYWNlc1swXSA9PT0gJy0nKSB7XG5cdFx0XHRcdGNyZWF0ZURlYnVnLnNraXBzLnB1c2gobmV3IFJlZ0V4cCgnXicgKyBuYW1lc3BhY2VzLnNsaWNlKDEpICsgJyQnKSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRjcmVhdGVEZWJ1Zy5uYW1lcy5wdXNoKG5ldyBSZWdFeHAoJ14nICsgbmFtZXNwYWNlcyArICckJykpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQqIERpc2FibGUgZGVidWcgb3V0cHV0LlxuXHQqXG5cdCogQHJldHVybiB7U3RyaW5nfSBuYW1lc3BhY2VzXG5cdCogQGFwaSBwdWJsaWNcblx0Ki9cblx0ZnVuY3Rpb24gZGlzYWJsZSgpIHtcblx0XHRjb25zdCBuYW1lc3BhY2VzID0gW1xuXHRcdFx0Li4uY3JlYXRlRGVidWcubmFtZXMubWFwKHRvTmFtZXNwYWNlKSxcblx0XHRcdC4uLmNyZWF0ZURlYnVnLnNraXBzLm1hcCh0b05hbWVzcGFjZSkubWFwKG5hbWVzcGFjZSA9PiAnLScgKyBuYW1lc3BhY2UpXG5cdFx0XS5qb2luKCcsJyk7XG5cdFx0Y3JlYXRlRGVidWcuZW5hYmxlKCcnKTtcblx0XHRyZXR1cm4gbmFtZXNwYWNlcztcblx0fVxuXG5cdC8qKlxuXHQqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZ2l2ZW4gbW9kZSBuYW1lIGlzIGVuYWJsZWQsIGZhbHNlIG90aGVyd2lzZS5cblx0KlxuXHQqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG5cdCogQHJldHVybiB7Qm9vbGVhbn1cblx0KiBAYXBpIHB1YmxpY1xuXHQqL1xuXHRmdW5jdGlvbiBlbmFibGVkKG5hbWUpIHtcblx0XHRpZiAobmFtZVtuYW1lLmxlbmd0aCAtIDFdID09PSAnKicpIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdGxldCBpO1xuXHRcdGxldCBsZW47XG5cblx0XHRmb3IgKGkgPSAwLCBsZW4gPSBjcmVhdGVEZWJ1Zy5za2lwcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuXHRcdFx0aWYgKGNyZWF0ZURlYnVnLnNraXBzW2ldLnRlc3QobmFtZSkpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGZvciAoaSA9IDAsIGxlbiA9IGNyZWF0ZURlYnVnLm5hbWVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0XHRpZiAoY3JlYXRlRGVidWcubmFtZXNbaV0udGVzdChuYW1lKSkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHQvKipcblx0KiBDb252ZXJ0IHJlZ2V4cCB0byBuYW1lc3BhY2Vcblx0KlxuXHQqIEBwYXJhbSB7UmVnRXhwfSByZWd4ZXBcblx0KiBAcmV0dXJuIHtTdHJpbmd9IG5hbWVzcGFjZVxuXHQqIEBhcGkgcHJpdmF0ZVxuXHQqL1xuXHRmdW5jdGlvbiB0b05hbWVzcGFjZShyZWdleHApIHtcblx0XHRyZXR1cm4gcmVnZXhwLnRvU3RyaW5nKClcblx0XHRcdC5zdWJzdHJpbmcoMiwgcmVnZXhwLnRvU3RyaW5nKCkubGVuZ3RoIC0gMilcblx0XHRcdC5yZXBsYWNlKC9cXC5cXCpcXD8kLywgJyonKTtcblx0fVxuXG5cdC8qKlxuXHQqIENvZXJjZSBgdmFsYC5cblx0KlxuXHQqIEBwYXJhbSB7TWl4ZWR9IHZhbFxuXHQqIEByZXR1cm4ge01peGVkfVxuXHQqIEBhcGkgcHJpdmF0ZVxuXHQqL1xuXHRmdW5jdGlvbiBjb2VyY2UodmFsKSB7XG5cdFx0aWYgKHZhbCBpbnN0YW5jZW9mIEVycm9yKSB7XG5cdFx0XHRyZXR1cm4gdmFsLnN0YWNrIHx8IHZhbC5tZXNzYWdlO1xuXHRcdH1cblx0XHRyZXR1cm4gdmFsO1xuXHR9XG5cblx0LyoqXG5cdCogWFhYIERPIE5PVCBVU0UuIFRoaXMgaXMgYSB0ZW1wb3Jhcnkgc3R1YiBmdW5jdGlvbi5cblx0KiBYWFggSXQgV0lMTCBiZSByZW1vdmVkIGluIHRoZSBuZXh0IG1ham9yIHJlbGVhc2UuXG5cdCovXG5cdGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG5cdFx0Y29uc29sZS53YXJuKCdJbnN0YW5jZSBtZXRob2QgYGRlYnVnLmRlc3Ryb3koKWAgaXMgZGVwcmVjYXRlZCBhbmQgbm8gbG9uZ2VyIGRvZXMgYW55dGhpbmcuIEl0IHdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgbmV4dCBtYWpvciB2ZXJzaW9uIG9mIGBkZWJ1Z2AuJyk7XG5cdH1cblxuXHRjcmVhdGVEZWJ1Zy5lbmFibGUoY3JlYXRlRGVidWcubG9hZCgpKTtcblxuXHRyZXR1cm4gY3JlYXRlRGVidWc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0dXA7XG4iLCIvKiBlc2xpbnQtZW52IGJyb3dzZXIgKi9cblxuLyoqXG4gKiBUaGlzIGlzIHRoZSB3ZWIgYnJvd3NlciBpbXBsZW1lbnRhdGlvbiBvZiBgZGVidWcoKWAuXG4gKi9cblxuZXhwb3J0cy5mb3JtYXRBcmdzID0gZm9ybWF0QXJncztcbmV4cG9ydHMuc2F2ZSA9IHNhdmU7XG5leHBvcnRzLmxvYWQgPSBsb2FkO1xuZXhwb3J0cy51c2VDb2xvcnMgPSB1c2VDb2xvcnM7XG5leHBvcnRzLnN0b3JhZ2UgPSBsb2NhbHN0b3JhZ2UoKTtcbmV4cG9ydHMuZGVzdHJveSA9ICgoKSA9PiB7XG5cdGxldCB3YXJuZWQgPSBmYWxzZTtcblxuXHRyZXR1cm4gKCkgPT4ge1xuXHRcdGlmICghd2FybmVkKSB7XG5cdFx0XHR3YXJuZWQgPSB0cnVlO1xuXHRcdFx0Y29uc29sZS53YXJuKCdJbnN0YW5jZSBtZXRob2QgYGRlYnVnLmRlc3Ryb3koKWAgaXMgZGVwcmVjYXRlZCBhbmQgbm8gbG9uZ2VyIGRvZXMgYW55dGhpbmcuIEl0IHdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgbmV4dCBtYWpvciB2ZXJzaW9uIG9mIGBkZWJ1Z2AuJyk7XG5cdFx0fVxuXHR9O1xufSkoKTtcblxuLyoqXG4gKiBDb2xvcnMuXG4gKi9cblxuZXhwb3J0cy5jb2xvcnMgPSBbXG5cdCcjMDAwMENDJyxcblx0JyMwMDAwRkYnLFxuXHQnIzAwMzNDQycsXG5cdCcjMDAzM0ZGJyxcblx0JyMwMDY2Q0MnLFxuXHQnIzAwNjZGRicsXG5cdCcjMDA5OUNDJyxcblx0JyMwMDk5RkYnLFxuXHQnIzAwQ0MwMCcsXG5cdCcjMDBDQzMzJyxcblx0JyMwMENDNjYnLFxuXHQnIzAwQ0M5OScsXG5cdCcjMDBDQ0NDJyxcblx0JyMwMENDRkYnLFxuXHQnIzMzMDBDQycsXG5cdCcjMzMwMEZGJyxcblx0JyMzMzMzQ0MnLFxuXHQnIzMzMzNGRicsXG5cdCcjMzM2NkNDJyxcblx0JyMzMzY2RkYnLFxuXHQnIzMzOTlDQycsXG5cdCcjMzM5OUZGJyxcblx0JyMzM0NDMDAnLFxuXHQnIzMzQ0MzMycsXG5cdCcjMzNDQzY2Jyxcblx0JyMzM0NDOTknLFxuXHQnIzMzQ0NDQycsXG5cdCcjMzNDQ0ZGJyxcblx0JyM2NjAwQ0MnLFxuXHQnIzY2MDBGRicsXG5cdCcjNjYzM0NDJyxcblx0JyM2NjMzRkYnLFxuXHQnIzY2Q0MwMCcsXG5cdCcjNjZDQzMzJyxcblx0JyM5OTAwQ0MnLFxuXHQnIzk5MDBGRicsXG5cdCcjOTkzM0NDJyxcblx0JyM5OTMzRkYnLFxuXHQnIzk5Q0MwMCcsXG5cdCcjOTlDQzMzJyxcblx0JyNDQzAwMDAnLFxuXHQnI0NDMDAzMycsXG5cdCcjQ0MwMDY2Jyxcblx0JyNDQzAwOTknLFxuXHQnI0NDMDBDQycsXG5cdCcjQ0MwMEZGJyxcblx0JyNDQzMzMDAnLFxuXHQnI0NDMzMzMycsXG5cdCcjQ0MzMzY2Jyxcblx0JyNDQzMzOTknLFxuXHQnI0NDMzNDQycsXG5cdCcjQ0MzM0ZGJyxcblx0JyNDQzY2MDAnLFxuXHQnI0NDNjYzMycsXG5cdCcjQ0M5OTAwJyxcblx0JyNDQzk5MzMnLFxuXHQnI0NDQ0MwMCcsXG5cdCcjQ0NDQzMzJyxcblx0JyNGRjAwMDAnLFxuXHQnI0ZGMDAzMycsXG5cdCcjRkYwMDY2Jyxcblx0JyNGRjAwOTknLFxuXHQnI0ZGMDBDQycsXG5cdCcjRkYwMEZGJyxcblx0JyNGRjMzMDAnLFxuXHQnI0ZGMzMzMycsXG5cdCcjRkYzMzY2Jyxcblx0JyNGRjMzOTknLFxuXHQnI0ZGMzNDQycsXG5cdCcjRkYzM0ZGJyxcblx0JyNGRjY2MDAnLFxuXHQnI0ZGNjYzMycsXG5cdCcjRkY5OTAwJyxcblx0JyNGRjk5MzMnLFxuXHQnI0ZGQ0MwMCcsXG5cdCcjRkZDQzMzJ1xuXTtcblxuLyoqXG4gKiBDdXJyZW50bHkgb25seSBXZWJLaXQtYmFzZWQgV2ViIEluc3BlY3RvcnMsIEZpcmVmb3ggPj0gdjMxLFxuICogYW5kIHRoZSBGaXJlYnVnIGV4dGVuc2lvbiAoYW55IEZpcmVmb3ggdmVyc2lvbikgYXJlIGtub3duXG4gKiB0byBzdXBwb3J0IFwiJWNcIiBDU1MgY3VzdG9taXphdGlvbnMuXG4gKlxuICogVE9ETzogYWRkIGEgYGxvY2FsU3RvcmFnZWAgdmFyaWFibGUgdG8gZXhwbGljaXRseSBlbmFibGUvZGlzYWJsZSBjb2xvcnNcbiAqL1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29tcGxleGl0eVxuZnVuY3Rpb24gdXNlQ29sb3JzKCkge1xuXHQvLyBOQjogSW4gYW4gRWxlY3Ryb24gcHJlbG9hZCBzY3JpcHQsIGRvY3VtZW50IHdpbGwgYmUgZGVmaW5lZCBidXQgbm90IGZ1bGx5XG5cdC8vIGluaXRpYWxpemVkLiBTaW5jZSB3ZSBrbm93IHdlJ3JlIGluIENocm9tZSwgd2UnbGwganVzdCBkZXRlY3QgdGhpcyBjYXNlXG5cdC8vIGV4cGxpY2l0bHlcblx0aWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5wcm9jZXNzICYmICh3aW5kb3cucHJvY2Vzcy50eXBlID09PSAncmVuZGVyZXInIHx8IHdpbmRvdy5wcm9jZXNzLl9fbndqcykpIHtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdC8vIEludGVybmV0IEV4cGxvcmVyIGFuZCBFZGdlIGRvIG5vdCBzdXBwb3J0IGNvbG9ycy5cblx0aWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvci51c2VyQWdlbnQgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLm1hdGNoKC8oZWRnZXx0cmlkZW50KVxcLyhcXGQrKS8pKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0bGV0IG07XG5cblx0Ly8gSXMgd2Via2l0PyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8xNjQ1OTYwNi8zNzY3NzNcblx0Ly8gZG9jdW1lbnQgaXMgdW5kZWZpbmVkIGluIHJlYWN0LW5hdGl2ZTogaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0LW5hdGl2ZS9wdWxsLzE2MzJcblx0cmV0dXJuICh0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLldlYmtpdEFwcGVhcmFuY2UpIHx8XG5cdFx0Ly8gSXMgZmlyZWJ1Zz8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMzk4MTIwLzM3Njc3M1xuXHRcdCh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuY29uc29sZSAmJiAod2luZG93LmNvbnNvbGUuZmlyZWJ1ZyB8fCAod2luZG93LmNvbnNvbGUuZXhjZXB0aW9uICYmIHdpbmRvdy5jb25zb2xlLnRhYmxlKSkpIHx8XG5cdFx0Ly8gSXMgZmlyZWZveCA+PSB2MzE/XG5cdFx0Ly8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9Ub29scy9XZWJfQ29uc29sZSNTdHlsaW5nX21lc3NhZ2VzXG5cdFx0KHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvci51c2VyQWdlbnQgJiYgKG0gPSBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkubWF0Y2goL2ZpcmVmb3hcXC8oXFxkKykvKSkgJiYgcGFyc2VJbnQobVsxXSwgMTApID49IDMxKSB8fFxuXHRcdC8vIERvdWJsZSBjaGVjayB3ZWJraXQgaW4gdXNlckFnZW50IGp1c3QgaW4gY2FzZSB3ZSBhcmUgaW4gYSB3b3JrZXJcblx0XHQodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudCAmJiBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkubWF0Y2goL2FwcGxld2Via2l0XFwvKFxcZCspLykpO1xufVxuXG4vKipcbiAqIENvbG9yaXplIGxvZyBhcmd1bWVudHMgaWYgZW5hYmxlZC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGZvcm1hdEFyZ3MoYXJncykge1xuXHRhcmdzWzBdID0gKHRoaXMudXNlQ29sb3JzID8gJyVjJyA6ICcnKSArXG5cdFx0dGhpcy5uYW1lc3BhY2UgK1xuXHRcdCh0aGlzLnVzZUNvbG9ycyA/ICcgJWMnIDogJyAnKSArXG5cdFx0YXJnc1swXSArXG5cdFx0KHRoaXMudXNlQ29sb3JzID8gJyVjICcgOiAnICcpICtcblx0XHQnKycgKyBtb2R1bGUuZXhwb3J0cy5odW1hbml6ZSh0aGlzLmRpZmYpO1xuXG5cdGlmICghdGhpcy51c2VDb2xvcnMpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRjb25zdCBjID0gJ2NvbG9yOiAnICsgdGhpcy5jb2xvcjtcblx0YXJncy5zcGxpY2UoMSwgMCwgYywgJ2NvbG9yOiBpbmhlcml0Jyk7XG5cblx0Ly8gVGhlIGZpbmFsIFwiJWNcIiBpcyBzb21ld2hhdCB0cmlja3ksIGJlY2F1c2UgdGhlcmUgY291bGQgYmUgb3RoZXJcblx0Ly8gYXJndW1lbnRzIHBhc3NlZCBlaXRoZXIgYmVmb3JlIG9yIGFmdGVyIHRoZSAlYywgc28gd2UgbmVlZCB0b1xuXHQvLyBmaWd1cmUgb3V0IHRoZSBjb3JyZWN0IGluZGV4IHRvIGluc2VydCB0aGUgQ1NTIGludG9cblx0bGV0IGluZGV4ID0gMDtcblx0bGV0IGxhc3RDID0gMDtcblx0YXJnc1swXS5yZXBsYWNlKC8lW2EtekEtWiVdL2csIG1hdGNoID0+IHtcblx0XHRpZiAobWF0Y2ggPT09ICclJScpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0aW5kZXgrKztcblx0XHRpZiAobWF0Y2ggPT09ICclYycpIHtcblx0XHRcdC8vIFdlIG9ubHkgYXJlIGludGVyZXN0ZWQgaW4gdGhlICpsYXN0KiAlY1xuXHRcdFx0Ly8gKHRoZSB1c2VyIG1heSBoYXZlIHByb3ZpZGVkIHRoZWlyIG93bilcblx0XHRcdGxhc3RDID0gaW5kZXg7XG5cdFx0fVxuXHR9KTtcblxuXHRhcmdzLnNwbGljZShsYXN0QywgMCwgYyk7XG59XG5cbi8qKlxuICogSW52b2tlcyBgY29uc29sZS5kZWJ1ZygpYCB3aGVuIGF2YWlsYWJsZS5cbiAqIE5vLW9wIHdoZW4gYGNvbnNvbGUuZGVidWdgIGlzIG5vdCBhIFwiZnVuY3Rpb25cIi5cbiAqIElmIGBjb25zb2xlLmRlYnVnYCBpcyBub3QgYXZhaWxhYmxlLCBmYWxscyBiYWNrXG4gKiB0byBgY29uc29sZS5sb2dgLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cbmV4cG9ydHMubG9nID0gY29uc29sZS5kZWJ1ZyB8fCBjb25zb2xlLmxvZyB8fCAoKCkgPT4ge30pO1xuXG4vKipcbiAqIFNhdmUgYG5hbWVzcGFjZXNgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2VzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gc2F2ZShuYW1lc3BhY2VzKSB7XG5cdHRyeSB7XG5cdFx0aWYgKG5hbWVzcGFjZXMpIHtcblx0XHRcdGV4cG9ydHMuc3RvcmFnZS5zZXRJdGVtKCdkZWJ1ZycsIG5hbWVzcGFjZXMpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRleHBvcnRzLnN0b3JhZ2UucmVtb3ZlSXRlbSgnZGVidWcnKTtcblx0XHR9XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0Ly8gU3dhbGxvd1xuXHRcdC8vIFhYWCAoQFFpeC0pIHNob3VsZCB3ZSBiZSBsb2dnaW5nIHRoZXNlP1xuXHR9XG59XG5cbi8qKlxuICogTG9hZCBgbmFtZXNwYWNlc2AuXG4gKlxuICogQHJldHVybiB7U3RyaW5nfSByZXR1cm5zIHRoZSBwcmV2aW91c2x5IHBlcnNpc3RlZCBkZWJ1ZyBtb2Rlc1xuICogQGFwaSBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGxvYWQoKSB7XG5cdGxldCByO1xuXHR0cnkge1xuXHRcdHIgPSBleHBvcnRzLnN0b3JhZ2UuZ2V0SXRlbSgnZGVidWcnKTtcblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHQvLyBTd2FsbG93XG5cdFx0Ly8gWFhYIChAUWl4LSkgc2hvdWxkIHdlIGJlIGxvZ2dpbmcgdGhlc2U/XG5cdH1cblxuXHQvLyBJZiBkZWJ1ZyBpc24ndCBzZXQgaW4gTFMsIGFuZCB3ZSdyZSBpbiBFbGVjdHJvbiwgdHJ5IHRvIGxvYWQgJERFQlVHXG5cdGlmICghciAmJiB0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcgJiYgJ2VudicgaW4gcHJvY2Vzcykge1xuXHRcdHIgPSBwcm9jZXNzLmVudi5ERUJVRztcblx0fVxuXG5cdHJldHVybiByO1xufVxuXG4vKipcbiAqIExvY2Fsc3RvcmFnZSBhdHRlbXB0cyB0byByZXR1cm4gdGhlIGxvY2Fsc3RvcmFnZS5cbiAqXG4gKiBUaGlzIGlzIG5lY2Vzc2FyeSBiZWNhdXNlIHNhZmFyaSB0aHJvd3NcbiAqIHdoZW4gYSB1c2VyIGRpc2FibGVzIGNvb2tpZXMvbG9jYWxzdG9yYWdlXG4gKiBhbmQgeW91IGF0dGVtcHQgdG8gYWNjZXNzIGl0LlxuICpcbiAqIEByZXR1cm4ge0xvY2FsU3RvcmFnZX1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGxvY2Fsc3RvcmFnZSgpIHtcblx0dHJ5IHtcblx0XHQvLyBUVk1MS2l0IChBcHBsZSBUViBKUyBSdW50aW1lKSBkb2VzIG5vdCBoYXZlIGEgd2luZG93IG9iamVjdCwganVzdCBsb2NhbFN0b3JhZ2UgaW4gdGhlIGdsb2JhbCBjb250ZXh0XG5cdFx0Ly8gVGhlIEJyb3dzZXIgYWxzbyBoYXMgbG9jYWxTdG9yYWdlIGluIHRoZSBnbG9iYWwgY29udGV4dC5cblx0XHRyZXR1cm4gbG9jYWxTdG9yYWdlO1xuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdC8vIFN3YWxsb3dcblx0XHQvLyBYWFggKEBRaXgtKSBzaG91bGQgd2UgYmUgbG9nZ2luZyB0aGVzZT9cblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vY29tbW9uJykoZXhwb3J0cyk7XG5cbmNvbnN0IHtmb3JtYXR0ZXJzfSA9IG1vZHVsZS5leHBvcnRzO1xuXG4vKipcbiAqIE1hcCAlaiB0byBgSlNPTi5zdHJpbmdpZnkoKWAsIHNpbmNlIG5vIFdlYiBJbnNwZWN0b3JzIGRvIHRoYXQgYnkgZGVmYXVsdC5cbiAqL1xuXG5mb3JtYXR0ZXJzLmogPSBmdW5jdGlvbiAodikge1xuXHR0cnkge1xuXHRcdHJldHVybiBKU09OLnN0cmluZ2lmeSh2KTtcblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHRyZXR1cm4gJ1tVbmV4cGVjdGVkSlNPTlBhcnNlRXJyb3JdOiAnICsgZXJyb3IubWVzc2FnZTtcblx0fVxufTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy51cmwgPSB1cmw7XG5jb25zdCBlbmdpbmVfaW9fY2xpZW50XzEgPSByZXF1aXJlKFwiZW5naW5lLmlvLWNsaWVudFwiKTtcbmNvbnN0IGRlYnVnXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcImRlYnVnXCIpKTsgLy8gZGVidWcoKVxuY29uc3QgZGVidWcgPSAoMCwgZGVidWdfMS5kZWZhdWx0KShcInNvY2tldC5pby1jbGllbnQ6dXJsXCIpOyAvLyBkZWJ1ZygpXG4vKipcbiAqIFVSTCBwYXJzZXIuXG4gKlxuICogQHBhcmFtIHVyaSAtIHVybFxuICogQHBhcmFtIHBhdGggLSB0aGUgcmVxdWVzdCBwYXRoIG9mIHRoZSBjb25uZWN0aW9uXG4gKiBAcGFyYW0gbG9jIC0gQW4gb2JqZWN0IG1lYW50IHRvIG1pbWljIHdpbmRvdy5sb2NhdGlvbi5cbiAqICAgICAgICBEZWZhdWx0cyB0byB3aW5kb3cubG9jYXRpb24uXG4gKiBAcHVibGljXG4gKi9cbmZ1bmN0aW9uIHVybCh1cmksIHBhdGggPSBcIlwiLCBsb2MpIHtcbiAgICBsZXQgb2JqID0gdXJpO1xuICAgIC8vIGRlZmF1bHQgdG8gd2luZG93LmxvY2F0aW9uXG4gICAgbG9jID0gbG9jIHx8ICh0eXBlb2YgbG9jYXRpb24gIT09IFwidW5kZWZpbmVkXCIgJiYgbG9jYXRpb24pO1xuICAgIGlmIChudWxsID09IHVyaSlcbiAgICAgICAgdXJpID0gbG9jLnByb3RvY29sICsgXCIvL1wiICsgbG9jLmhvc3Q7XG4gICAgLy8gcmVsYXRpdmUgcGF0aCBzdXBwb3J0XG4gICAgaWYgKHR5cGVvZiB1cmkgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgaWYgKFwiL1wiID09PSB1cmkuY2hhckF0KDApKSB7XG4gICAgICAgICAgICBpZiAoXCIvXCIgPT09IHVyaS5jaGFyQXQoMSkpIHtcbiAgICAgICAgICAgICAgICB1cmkgPSBsb2MucHJvdG9jb2wgKyB1cmk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB1cmkgPSBsb2MuaG9zdCArIHVyaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIS9eKGh0dHBzP3x3c3M/KTpcXC9cXC8vLnRlc3QodXJpKSkge1xuICAgICAgICAgICAgZGVidWcoXCJwcm90b2NvbC1sZXNzIHVybCAlc1wiLCB1cmkpO1xuICAgICAgICAgICAgaWYgKFwidW5kZWZpbmVkXCIgIT09IHR5cGVvZiBsb2MpIHtcbiAgICAgICAgICAgICAgICB1cmkgPSBsb2MucHJvdG9jb2wgKyBcIi8vXCIgKyB1cmk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB1cmkgPSBcImh0dHBzOi8vXCIgKyB1cmk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gcGFyc2VcbiAgICAgICAgZGVidWcoXCJwYXJzZSAlc1wiLCB1cmkpO1xuICAgICAgICBvYmogPSAoMCwgZW5naW5lX2lvX2NsaWVudF8xLnBhcnNlKSh1cmkpO1xuICAgIH1cbiAgICAvLyBtYWtlIHN1cmUgd2UgdHJlYXQgYGxvY2FsaG9zdDo4MGAgYW5kIGBsb2NhbGhvc3RgIGVxdWFsbHlcbiAgICBpZiAoIW9iai5wb3J0KSB7XG4gICAgICAgIGlmICgvXihodHRwfHdzKSQvLnRlc3Qob2JqLnByb3RvY29sKSkge1xuICAgICAgICAgICAgb2JqLnBvcnQgPSBcIjgwXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoL14oaHR0cHx3cylzJC8udGVzdChvYmoucHJvdG9jb2wpKSB7XG4gICAgICAgICAgICBvYmoucG9ydCA9IFwiNDQzXCI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgb2JqLnBhdGggPSBvYmoucGF0aCB8fCBcIi9cIjtcbiAgICBjb25zdCBpcHY2ID0gb2JqLmhvc3QuaW5kZXhPZihcIjpcIikgIT09IC0xO1xuICAgIGNvbnN0IGhvc3QgPSBpcHY2ID8gXCJbXCIgKyBvYmouaG9zdCArIFwiXVwiIDogb2JqLmhvc3Q7XG4gICAgLy8gZGVmaW5lIHVuaXF1ZSBpZFxuICAgIG9iai5pZCA9IG9iai5wcm90b2NvbCArIFwiOi8vXCIgKyBob3N0ICsgXCI6XCIgKyBvYmoucG9ydCArIHBhdGg7XG4gICAgLy8gZGVmaW5lIGhyZWZcbiAgICBvYmouaHJlZiA9XG4gICAgICAgIG9iai5wcm90b2NvbCArXG4gICAgICAgICAgICBcIjovL1wiICtcbiAgICAgICAgICAgIGhvc3QgK1xuICAgICAgICAgICAgKGxvYyAmJiBsb2MucG9ydCA9PT0gb2JqLnBvcnQgPyBcIlwiIDogXCI6XCIgKyBvYmoucG9ydCk7XG4gICAgcmV0dXJuIG9iajtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5oYXNCaW5hcnkgPSBleHBvcnRzLmlzQmluYXJ5ID0gdm9pZCAwO1xuY29uc3Qgd2l0aE5hdGl2ZUFycmF5QnVmZmVyID0gdHlwZW9mIEFycmF5QnVmZmVyID09PSBcImZ1bmN0aW9uXCI7XG5jb25zdCBpc1ZpZXcgPSAob2JqKSA9PiB7XG4gICAgcmV0dXJuIHR5cGVvZiBBcnJheUJ1ZmZlci5pc1ZpZXcgPT09IFwiZnVuY3Rpb25cIlxuICAgICAgICA/IEFycmF5QnVmZmVyLmlzVmlldyhvYmopXG4gICAgICAgIDogb2JqLmJ1ZmZlciBpbnN0YW5jZW9mIEFycmF5QnVmZmVyO1xufTtcbmNvbnN0IHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbmNvbnN0IHdpdGhOYXRpdmVCbG9iID0gdHlwZW9mIEJsb2IgPT09IFwiZnVuY3Rpb25cIiB8fFxuICAgICh0eXBlb2YgQmxvYiAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgICAgICB0b1N0cmluZy5jYWxsKEJsb2IpID09PSBcIltvYmplY3QgQmxvYkNvbnN0cnVjdG9yXVwiKTtcbmNvbnN0IHdpdGhOYXRpdmVGaWxlID0gdHlwZW9mIEZpbGUgPT09IFwiZnVuY3Rpb25cIiB8fFxuICAgICh0eXBlb2YgRmlsZSAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgICAgICB0b1N0cmluZy5jYWxsKEZpbGUpID09PSBcIltvYmplY3QgRmlsZUNvbnN0cnVjdG9yXVwiKTtcbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIG9iaiBpcyBhIEJ1ZmZlciwgYW4gQXJyYXlCdWZmZXIsIGEgQmxvYiBvciBhIEZpbGUuXG4gKlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gaXNCaW5hcnkob2JqKSB7XG4gICAgcmV0dXJuICgod2l0aE5hdGl2ZUFycmF5QnVmZmVyICYmIChvYmogaW5zdGFuY2VvZiBBcnJheUJ1ZmZlciB8fCBpc1ZpZXcob2JqKSkpIHx8XG4gICAgICAgICh3aXRoTmF0aXZlQmxvYiAmJiBvYmogaW5zdGFuY2VvZiBCbG9iKSB8fFxuICAgICAgICAod2l0aE5hdGl2ZUZpbGUgJiYgb2JqIGluc3RhbmNlb2YgRmlsZSkpO1xufVxuZXhwb3J0cy5pc0JpbmFyeSA9IGlzQmluYXJ5O1xuZnVuY3Rpb24gaGFzQmluYXJ5KG9iaiwgdG9KU09OKSB7XG4gICAgaWYgKCFvYmogfHwgdHlwZW9mIG9iaiAhPT0gXCJvYmplY3RcIikge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBvYmoubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoaGFzQmluYXJ5KG9ialtpXSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChpc0JpbmFyeShvYmopKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZiAob2JqLnRvSlNPTiAmJlxuICAgICAgICB0eXBlb2Ygb2JqLnRvSlNPTiA9PT0gXCJmdW5jdGlvblwiICYmXG4gICAgICAgIGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIGhhc0JpbmFyeShvYmoudG9KU09OKCksIHRydWUpO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IGtleSBpbiBvYmopIHtcbiAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkgJiYgaGFzQmluYXJ5KG9ialtrZXldKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuZXhwb3J0cy5oYXNCaW5hcnkgPSBoYXNCaW5hcnk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMucmVjb25zdHJ1Y3RQYWNrZXQgPSBleHBvcnRzLmRlY29uc3RydWN0UGFja2V0ID0gdm9pZCAwO1xuY29uc3QgaXNfYmluYXJ5X2pzXzEgPSByZXF1aXJlKFwiLi9pcy1iaW5hcnkuanNcIik7XG4vKipcbiAqIFJlcGxhY2VzIGV2ZXJ5IEJ1ZmZlciB8IEFycmF5QnVmZmVyIHwgQmxvYiB8IEZpbGUgaW4gcGFja2V0IHdpdGggYSBudW1iZXJlZCBwbGFjZWhvbGRlci5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcGFja2V0IC0gc29ja2V0LmlvIGV2ZW50IHBhY2tldFxuICogQHJldHVybiB7T2JqZWN0fSB3aXRoIGRlY29uc3RydWN0ZWQgcGFja2V0IGFuZCBsaXN0IG9mIGJ1ZmZlcnNcbiAqIEBwdWJsaWNcbiAqL1xuZnVuY3Rpb24gZGVjb25zdHJ1Y3RQYWNrZXQocGFja2V0KSB7XG4gICAgY29uc3QgYnVmZmVycyA9IFtdO1xuICAgIGNvbnN0IHBhY2tldERhdGEgPSBwYWNrZXQuZGF0YTtcbiAgICBjb25zdCBwYWNrID0gcGFja2V0O1xuICAgIHBhY2suZGF0YSA9IF9kZWNvbnN0cnVjdFBhY2tldChwYWNrZXREYXRhLCBidWZmZXJzKTtcbiAgICBwYWNrLmF0dGFjaG1lbnRzID0gYnVmZmVycy5sZW5ndGg7IC8vIG51bWJlciBvZiBiaW5hcnkgJ2F0dGFjaG1lbnRzJ1xuICAgIHJldHVybiB7IHBhY2tldDogcGFjaywgYnVmZmVyczogYnVmZmVycyB9O1xufVxuZXhwb3J0cy5kZWNvbnN0cnVjdFBhY2tldCA9IGRlY29uc3RydWN0UGFja2V0O1xuZnVuY3Rpb24gX2RlY29uc3RydWN0UGFja2V0KGRhdGEsIGJ1ZmZlcnMpIHtcbiAgICBpZiAoIWRhdGEpXG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIGlmICgoMCwgaXNfYmluYXJ5X2pzXzEuaXNCaW5hcnkpKGRhdGEpKSB7XG4gICAgICAgIGNvbnN0IHBsYWNlaG9sZGVyID0geyBfcGxhY2Vob2xkZXI6IHRydWUsIG51bTogYnVmZmVycy5sZW5ndGggfTtcbiAgICAgICAgYnVmZmVycy5wdXNoKGRhdGEpO1xuICAgICAgICByZXR1cm4gcGxhY2Vob2xkZXI7XG4gICAgfVxuICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkpIHtcbiAgICAgICAgY29uc3QgbmV3RGF0YSA9IG5ldyBBcnJheShkYXRhLmxlbmd0aCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbmV3RGF0YVtpXSA9IF9kZWNvbnN0cnVjdFBhY2tldChkYXRhW2ldLCBidWZmZXJzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3RGF0YTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGRhdGEgPT09IFwib2JqZWN0XCIgJiYgIShkYXRhIGluc3RhbmNlb2YgRGF0ZSkpIHtcbiAgICAgICAgY29uc3QgbmV3RGF0YSA9IHt9O1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBkYXRhKSB7XG4gICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGRhdGEsIGtleSkpIHtcbiAgICAgICAgICAgICAgICBuZXdEYXRhW2tleV0gPSBfZGVjb25zdHJ1Y3RQYWNrZXQoZGF0YVtrZXldLCBidWZmZXJzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3RGF0YTtcbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG59XG4vKipcbiAqIFJlY29uc3RydWN0cyBhIGJpbmFyeSBwYWNrZXQgZnJvbSBpdHMgcGxhY2Vob2xkZXIgcGFja2V0IGFuZCBidWZmZXJzXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBhY2tldCAtIGV2ZW50IHBhY2tldCB3aXRoIHBsYWNlaG9sZGVyc1xuICogQHBhcmFtIHtBcnJheX0gYnVmZmVycyAtIGJpbmFyeSBidWZmZXJzIHRvIHB1dCBpbiBwbGFjZWhvbGRlciBwb3NpdGlvbnNcbiAqIEByZXR1cm4ge09iamVjdH0gcmVjb25zdHJ1Y3RlZCBwYWNrZXRcbiAqIEBwdWJsaWNcbiAqL1xuZnVuY3Rpb24gcmVjb25zdHJ1Y3RQYWNrZXQocGFja2V0LCBidWZmZXJzKSB7XG4gICAgcGFja2V0LmRhdGEgPSBfcmVjb25zdHJ1Y3RQYWNrZXQocGFja2V0LmRhdGEsIGJ1ZmZlcnMpO1xuICAgIGRlbGV0ZSBwYWNrZXQuYXR0YWNobWVudHM7IC8vIG5vIGxvbmdlciB1c2VmdWxcbiAgICByZXR1cm4gcGFja2V0O1xufVxuZXhwb3J0cy5yZWNvbnN0cnVjdFBhY2tldCA9IHJlY29uc3RydWN0UGFja2V0O1xuZnVuY3Rpb24gX3JlY29uc3RydWN0UGFja2V0KGRhdGEsIGJ1ZmZlcnMpIHtcbiAgICBpZiAoIWRhdGEpXG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIGlmIChkYXRhICYmIGRhdGEuX3BsYWNlaG9sZGVyID09PSB0cnVlKSB7XG4gICAgICAgIGNvbnN0IGlzSW5kZXhWYWxpZCA9IHR5cGVvZiBkYXRhLm51bSA9PT0gXCJudW1iZXJcIiAmJlxuICAgICAgICAgICAgZGF0YS5udW0gPj0gMCAmJlxuICAgICAgICAgICAgZGF0YS5udW0gPCBidWZmZXJzLmxlbmd0aDtcbiAgICAgICAgaWYgKGlzSW5kZXhWYWxpZCkge1xuICAgICAgICAgICAgcmV0dXJuIGJ1ZmZlcnNbZGF0YS5udW1dOyAvLyBhcHByb3ByaWF0ZSBidWZmZXIgKHNob3VsZCBiZSBuYXR1cmFsIG9yZGVyIGFueXdheSlcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImlsbGVnYWwgYXR0YWNobWVudHNcIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShkYXRhKSkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGRhdGFbaV0gPSBfcmVjb25zdHJ1Y3RQYWNrZXQoZGF0YVtpXSwgYnVmZmVycyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGRhdGEgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gZGF0YSkge1xuICAgICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChkYXRhLCBrZXkpKSB7XG4gICAgICAgICAgICAgICAgZGF0YVtrZXldID0gX3JlY29uc3RydWN0UGFja2V0KGRhdGFba2V5XSwgYnVmZmVycyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG59XG4iLCJcbi8qKlxuICogVGhpcyBpcyB0aGUgY29tbW9uIGxvZ2ljIGZvciBib3RoIHRoZSBOb2RlLmpzIGFuZCB3ZWIgYnJvd3NlclxuICogaW1wbGVtZW50YXRpb25zIG9mIGBkZWJ1ZygpYC5cbiAqL1xuXG5mdW5jdGlvbiBzZXR1cChlbnYpIHtcblx0Y3JlYXRlRGVidWcuZGVidWcgPSBjcmVhdGVEZWJ1Zztcblx0Y3JlYXRlRGVidWcuZGVmYXVsdCA9IGNyZWF0ZURlYnVnO1xuXHRjcmVhdGVEZWJ1Zy5jb2VyY2UgPSBjb2VyY2U7XG5cdGNyZWF0ZURlYnVnLmRpc2FibGUgPSBkaXNhYmxlO1xuXHRjcmVhdGVEZWJ1Zy5lbmFibGUgPSBlbmFibGU7XG5cdGNyZWF0ZURlYnVnLmVuYWJsZWQgPSBlbmFibGVkO1xuXHRjcmVhdGVEZWJ1Zy5odW1hbml6ZSA9IHJlcXVpcmUoJ21zJyk7XG5cdGNyZWF0ZURlYnVnLmRlc3Ryb3kgPSBkZXN0cm95O1xuXG5cdE9iamVjdC5rZXlzKGVudikuZm9yRWFjaChrZXkgPT4ge1xuXHRcdGNyZWF0ZURlYnVnW2tleV0gPSBlbnZba2V5XTtcblx0fSk7XG5cblx0LyoqXG5cdCogVGhlIGN1cnJlbnRseSBhY3RpdmUgZGVidWcgbW9kZSBuYW1lcywgYW5kIG5hbWVzIHRvIHNraXAuXG5cdCovXG5cblx0Y3JlYXRlRGVidWcubmFtZXMgPSBbXTtcblx0Y3JlYXRlRGVidWcuc2tpcHMgPSBbXTtcblxuXHQvKipcblx0KiBNYXAgb2Ygc3BlY2lhbCBcIiVuXCIgaGFuZGxpbmcgZnVuY3Rpb25zLCBmb3IgdGhlIGRlYnVnIFwiZm9ybWF0XCIgYXJndW1lbnQuXG5cdCpcblx0KiBWYWxpZCBrZXkgbmFtZXMgYXJlIGEgc2luZ2xlLCBsb3dlciBvciB1cHBlci1jYXNlIGxldHRlciwgaS5lLiBcIm5cIiBhbmQgXCJOXCIuXG5cdCovXG5cdGNyZWF0ZURlYnVnLmZvcm1hdHRlcnMgPSB7fTtcblxuXHQvKipcblx0KiBTZWxlY3RzIGEgY29sb3IgZm9yIGEgZGVidWcgbmFtZXNwYWNlXG5cdCogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZSBUaGUgbmFtZXNwYWNlIHN0cmluZyBmb3IgdGhlIGRlYnVnIGluc3RhbmNlIHRvIGJlIGNvbG9yZWRcblx0KiBAcmV0dXJuIHtOdW1iZXJ8U3RyaW5nfSBBbiBBTlNJIGNvbG9yIGNvZGUgZm9yIHRoZSBnaXZlbiBuYW1lc3BhY2Vcblx0KiBAYXBpIHByaXZhdGVcblx0Ki9cblx0ZnVuY3Rpb24gc2VsZWN0Q29sb3IobmFtZXNwYWNlKSB7XG5cdFx0bGV0IGhhc2ggPSAwO1xuXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBuYW1lc3BhY2UubGVuZ3RoOyBpKyspIHtcblx0XHRcdGhhc2ggPSAoKGhhc2ggPDwgNSkgLSBoYXNoKSArIG5hbWVzcGFjZS5jaGFyQ29kZUF0KGkpO1xuXHRcdFx0aGFzaCB8PSAwOyAvLyBDb252ZXJ0IHRvIDMyYml0IGludGVnZXJcblx0XHR9XG5cblx0XHRyZXR1cm4gY3JlYXRlRGVidWcuY29sb3JzW01hdGguYWJzKGhhc2gpICUgY3JlYXRlRGVidWcuY29sb3JzLmxlbmd0aF07XG5cdH1cblx0Y3JlYXRlRGVidWcuc2VsZWN0Q29sb3IgPSBzZWxlY3RDb2xvcjtcblxuXHQvKipcblx0KiBDcmVhdGUgYSBkZWJ1Z2dlciB3aXRoIHRoZSBnaXZlbiBgbmFtZXNwYWNlYC5cblx0KlxuXHQqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2Vcblx0KiBAcmV0dXJuIHtGdW5jdGlvbn1cblx0KiBAYXBpIHB1YmxpY1xuXHQqL1xuXHRmdW5jdGlvbiBjcmVhdGVEZWJ1ZyhuYW1lc3BhY2UpIHtcblx0XHRsZXQgcHJldlRpbWU7XG5cdFx0bGV0IGVuYWJsZU92ZXJyaWRlID0gbnVsbDtcblx0XHRsZXQgbmFtZXNwYWNlc0NhY2hlO1xuXHRcdGxldCBlbmFibGVkQ2FjaGU7XG5cblx0XHRmdW5jdGlvbiBkZWJ1ZyguLi5hcmdzKSB7XG5cdFx0XHQvLyBEaXNhYmxlZD9cblx0XHRcdGlmICghZGVidWcuZW5hYmxlZCkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IHNlbGYgPSBkZWJ1ZztcblxuXHRcdFx0Ly8gU2V0IGBkaWZmYCB0aW1lc3RhbXBcblx0XHRcdGNvbnN0IGN1cnIgPSBOdW1iZXIobmV3IERhdGUoKSk7XG5cdFx0XHRjb25zdCBtcyA9IGN1cnIgLSAocHJldlRpbWUgfHwgY3Vycik7XG5cdFx0XHRzZWxmLmRpZmYgPSBtcztcblx0XHRcdHNlbGYucHJldiA9IHByZXZUaW1lO1xuXHRcdFx0c2VsZi5jdXJyID0gY3Vycjtcblx0XHRcdHByZXZUaW1lID0gY3VycjtcblxuXHRcdFx0YXJnc1swXSA9IGNyZWF0ZURlYnVnLmNvZXJjZShhcmdzWzBdKTtcblxuXHRcdFx0aWYgKHR5cGVvZiBhcmdzWzBdICE9PSAnc3RyaW5nJykge1xuXHRcdFx0XHQvLyBBbnl0aGluZyBlbHNlIGxldCdzIGluc3BlY3Qgd2l0aCAlT1xuXHRcdFx0XHRhcmdzLnVuc2hpZnQoJyVPJyk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEFwcGx5IGFueSBgZm9ybWF0dGVyc2AgdHJhbnNmb3JtYXRpb25zXG5cdFx0XHRsZXQgaW5kZXggPSAwO1xuXHRcdFx0YXJnc1swXSA9IGFyZ3NbMF0ucmVwbGFjZSgvJShbYS16QS1aJV0pL2csIChtYXRjaCwgZm9ybWF0KSA9PiB7XG5cdFx0XHRcdC8vIElmIHdlIGVuY291bnRlciBhbiBlc2NhcGVkICUgdGhlbiBkb24ndCBpbmNyZWFzZSB0aGUgYXJyYXkgaW5kZXhcblx0XHRcdFx0aWYgKG1hdGNoID09PSAnJSUnKSB7XG5cdFx0XHRcdFx0cmV0dXJuICclJztcblx0XHRcdFx0fVxuXHRcdFx0XHRpbmRleCsrO1xuXHRcdFx0XHRjb25zdCBmb3JtYXR0ZXIgPSBjcmVhdGVEZWJ1Zy5mb3JtYXR0ZXJzW2Zvcm1hdF07XG5cdFx0XHRcdGlmICh0eXBlb2YgZm9ybWF0dGVyID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0XHRcdFx0Y29uc3QgdmFsID0gYXJnc1tpbmRleF07XG5cdFx0XHRcdFx0bWF0Y2ggPSBmb3JtYXR0ZXIuY2FsbChzZWxmLCB2YWwpO1xuXG5cdFx0XHRcdFx0Ly8gTm93IHdlIG5lZWQgdG8gcmVtb3ZlIGBhcmdzW2luZGV4XWAgc2luY2UgaXQncyBpbmxpbmVkIGluIHRoZSBgZm9ybWF0YFxuXHRcdFx0XHRcdGFyZ3Muc3BsaWNlKGluZGV4LCAxKTtcblx0XHRcdFx0XHRpbmRleC0tO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBtYXRjaDtcblx0XHRcdH0pO1xuXG5cdFx0XHQvLyBBcHBseSBlbnYtc3BlY2lmaWMgZm9ybWF0dGluZyAoY29sb3JzLCBldGMuKVxuXHRcdFx0Y3JlYXRlRGVidWcuZm9ybWF0QXJncy5jYWxsKHNlbGYsIGFyZ3MpO1xuXG5cdFx0XHRjb25zdCBsb2dGbiA9IHNlbGYubG9nIHx8IGNyZWF0ZURlYnVnLmxvZztcblx0XHRcdGxvZ0ZuLmFwcGx5KHNlbGYsIGFyZ3MpO1xuXHRcdH1cblxuXHRcdGRlYnVnLm5hbWVzcGFjZSA9IG5hbWVzcGFjZTtcblx0XHRkZWJ1Zy51c2VDb2xvcnMgPSBjcmVhdGVEZWJ1Zy51c2VDb2xvcnMoKTtcblx0XHRkZWJ1Zy5jb2xvciA9IGNyZWF0ZURlYnVnLnNlbGVjdENvbG9yKG5hbWVzcGFjZSk7XG5cdFx0ZGVidWcuZXh0ZW5kID0gZXh0ZW5kO1xuXHRcdGRlYnVnLmRlc3Ryb3kgPSBjcmVhdGVEZWJ1Zy5kZXN0cm95OyAvLyBYWFggVGVtcG9yYXJ5LiBXaWxsIGJlIHJlbW92ZWQgaW4gdGhlIG5leHQgbWFqb3IgcmVsZWFzZS5cblxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShkZWJ1ZywgJ2VuYWJsZWQnLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcblx0XHRcdGdldDogKCkgPT4ge1xuXHRcdFx0XHRpZiAoZW5hYmxlT3ZlcnJpZGUgIT09IG51bGwpIHtcblx0XHRcdFx0XHRyZXR1cm4gZW5hYmxlT3ZlcnJpZGU7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKG5hbWVzcGFjZXNDYWNoZSAhPT0gY3JlYXRlRGVidWcubmFtZXNwYWNlcykge1xuXHRcdFx0XHRcdG5hbWVzcGFjZXNDYWNoZSA9IGNyZWF0ZURlYnVnLm5hbWVzcGFjZXM7XG5cdFx0XHRcdFx0ZW5hYmxlZENhY2hlID0gY3JlYXRlRGVidWcuZW5hYmxlZChuYW1lc3BhY2UpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIGVuYWJsZWRDYWNoZTtcblx0XHRcdH0sXG5cdFx0XHRzZXQ6IHYgPT4ge1xuXHRcdFx0XHRlbmFibGVPdmVycmlkZSA9IHY7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHQvLyBFbnYtc3BlY2lmaWMgaW5pdGlhbGl6YXRpb24gbG9naWMgZm9yIGRlYnVnIGluc3RhbmNlc1xuXHRcdGlmICh0eXBlb2YgY3JlYXRlRGVidWcuaW5pdCA9PT0gJ2Z1bmN0aW9uJykge1xuXHRcdFx0Y3JlYXRlRGVidWcuaW5pdChkZWJ1Zyk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGRlYnVnO1xuXHR9XG5cblx0ZnVuY3Rpb24gZXh0ZW5kKG5hbWVzcGFjZSwgZGVsaW1pdGVyKSB7XG5cdFx0Y29uc3QgbmV3RGVidWcgPSBjcmVhdGVEZWJ1Zyh0aGlzLm5hbWVzcGFjZSArICh0eXBlb2YgZGVsaW1pdGVyID09PSAndW5kZWZpbmVkJyA/ICc6JyA6IGRlbGltaXRlcikgKyBuYW1lc3BhY2UpO1xuXHRcdG5ld0RlYnVnLmxvZyA9IHRoaXMubG9nO1xuXHRcdHJldHVybiBuZXdEZWJ1Zztcblx0fVxuXG5cdC8qKlxuXHQqIEVuYWJsZXMgYSBkZWJ1ZyBtb2RlIGJ5IG5hbWVzcGFjZXMuIFRoaXMgY2FuIGluY2x1ZGUgbW9kZXNcblx0KiBzZXBhcmF0ZWQgYnkgYSBjb2xvbiBhbmQgd2lsZGNhcmRzLlxuXHQqXG5cdCogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZXNcblx0KiBAYXBpIHB1YmxpY1xuXHQqL1xuXHRmdW5jdGlvbiBlbmFibGUobmFtZXNwYWNlcykge1xuXHRcdGNyZWF0ZURlYnVnLnNhdmUobmFtZXNwYWNlcyk7XG5cdFx0Y3JlYXRlRGVidWcubmFtZXNwYWNlcyA9IG5hbWVzcGFjZXM7XG5cblx0XHRjcmVhdGVEZWJ1Zy5uYW1lcyA9IFtdO1xuXHRcdGNyZWF0ZURlYnVnLnNraXBzID0gW107XG5cblx0XHRsZXQgaTtcblx0XHRjb25zdCBzcGxpdCA9ICh0eXBlb2YgbmFtZXNwYWNlcyA9PT0gJ3N0cmluZycgPyBuYW1lc3BhY2VzIDogJycpLnNwbGl0KC9bXFxzLF0rLyk7XG5cdFx0Y29uc3QgbGVuID0gc3BsaXQubGVuZ3RoO1xuXG5cdFx0Zm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG5cdFx0XHRpZiAoIXNwbGl0W2ldKSB7XG5cdFx0XHRcdC8vIGlnbm9yZSBlbXB0eSBzdHJpbmdzXG5cdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0fVxuXG5cdFx0XHRuYW1lc3BhY2VzID0gc3BsaXRbaV0ucmVwbGFjZSgvXFwqL2csICcuKj8nKTtcblxuXHRcdFx0aWYgKG5hbWVzcGFjZXNbMF0gPT09ICctJykge1xuXHRcdFx0XHRjcmVhdGVEZWJ1Zy5za2lwcy5wdXNoKG5ldyBSZWdFeHAoJ14nICsgbmFtZXNwYWNlcy5zbGljZSgxKSArICckJykpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y3JlYXRlRGVidWcubmFtZXMucHVzaChuZXcgUmVnRXhwKCdeJyArIG5hbWVzcGFjZXMgKyAnJCcpKTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvKipcblx0KiBEaXNhYmxlIGRlYnVnIG91dHB1dC5cblx0KlxuXHQqIEByZXR1cm4ge1N0cmluZ30gbmFtZXNwYWNlc1xuXHQqIEBhcGkgcHVibGljXG5cdCovXG5cdGZ1bmN0aW9uIGRpc2FibGUoKSB7XG5cdFx0Y29uc3QgbmFtZXNwYWNlcyA9IFtcblx0XHRcdC4uLmNyZWF0ZURlYnVnLm5hbWVzLm1hcCh0b05hbWVzcGFjZSksXG5cdFx0XHQuLi5jcmVhdGVEZWJ1Zy5za2lwcy5tYXAodG9OYW1lc3BhY2UpLm1hcChuYW1lc3BhY2UgPT4gJy0nICsgbmFtZXNwYWNlKVxuXHRcdF0uam9pbignLCcpO1xuXHRcdGNyZWF0ZURlYnVnLmVuYWJsZSgnJyk7XG5cdFx0cmV0dXJuIG5hbWVzcGFjZXM7XG5cdH1cblxuXHQvKipcblx0KiBSZXR1cm5zIHRydWUgaWYgdGhlIGdpdmVuIG1vZGUgbmFtZSBpcyBlbmFibGVkLCBmYWxzZSBvdGhlcndpc2UuXG5cdCpcblx0KiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuXHQqIEByZXR1cm4ge0Jvb2xlYW59XG5cdCogQGFwaSBwdWJsaWNcblx0Ki9cblx0ZnVuY3Rpb24gZW5hYmxlZChuYW1lKSB7XG5cdFx0aWYgKG5hbWVbbmFtZS5sZW5ndGggLSAxXSA9PT0gJyonKSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHRsZXQgaTtcblx0XHRsZXQgbGVuO1xuXG5cdFx0Zm9yIChpID0gMCwgbGVuID0gY3JlYXRlRGVidWcuc2tpcHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcblx0XHRcdGlmIChjcmVhdGVEZWJ1Zy5za2lwc1tpXS50ZXN0KG5hbWUpKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRmb3IgKGkgPSAwLCBsZW4gPSBjcmVhdGVEZWJ1Zy5uYW1lcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuXHRcdFx0aWYgKGNyZWF0ZURlYnVnLm5hbWVzW2ldLnRlc3QobmFtZSkpIHtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0LyoqXG5cdCogQ29udmVydCByZWdleHAgdG8gbmFtZXNwYWNlXG5cdCpcblx0KiBAcGFyYW0ge1JlZ0V4cH0gcmVneGVwXG5cdCogQHJldHVybiB7U3RyaW5nfSBuYW1lc3BhY2Vcblx0KiBAYXBpIHByaXZhdGVcblx0Ki9cblx0ZnVuY3Rpb24gdG9OYW1lc3BhY2UocmVnZXhwKSB7XG5cdFx0cmV0dXJuIHJlZ2V4cC50b1N0cmluZygpXG5cdFx0XHQuc3Vic3RyaW5nKDIsIHJlZ2V4cC50b1N0cmluZygpLmxlbmd0aCAtIDIpXG5cdFx0XHQucmVwbGFjZSgvXFwuXFwqXFw/JC8sICcqJyk7XG5cdH1cblxuXHQvKipcblx0KiBDb2VyY2UgYHZhbGAuXG5cdCpcblx0KiBAcGFyYW0ge01peGVkfSB2YWxcblx0KiBAcmV0dXJuIHtNaXhlZH1cblx0KiBAYXBpIHByaXZhdGVcblx0Ki9cblx0ZnVuY3Rpb24gY29lcmNlKHZhbCkge1xuXHRcdGlmICh2YWwgaW5zdGFuY2VvZiBFcnJvcikge1xuXHRcdFx0cmV0dXJuIHZhbC5zdGFjayB8fCB2YWwubWVzc2FnZTtcblx0XHR9XG5cdFx0cmV0dXJuIHZhbDtcblx0fVxuXG5cdC8qKlxuXHQqIFhYWCBETyBOT1QgVVNFLiBUaGlzIGlzIGEgdGVtcG9yYXJ5IHN0dWIgZnVuY3Rpb24uXG5cdCogWFhYIEl0IFdJTEwgYmUgcmVtb3ZlZCBpbiB0aGUgbmV4dCBtYWpvciByZWxlYXNlLlxuXHQqL1xuXHRmdW5jdGlvbiBkZXN0cm95KCkge1xuXHRcdGNvbnNvbGUud2FybignSW5zdGFuY2UgbWV0aG9kIGBkZWJ1Zy5kZXN0cm95KClgIGlzIGRlcHJlY2F0ZWQgYW5kIG5vIGxvbmdlciBkb2VzIGFueXRoaW5nLiBJdCB3aWxsIGJlIHJlbW92ZWQgaW4gdGhlIG5leHQgbWFqb3IgdmVyc2lvbiBvZiBgZGVidWdgLicpO1xuXHR9XG5cblx0Y3JlYXRlRGVidWcuZW5hYmxlKGNyZWF0ZURlYnVnLmxvYWQoKSk7XG5cblx0cmV0dXJuIGNyZWF0ZURlYnVnO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldHVwO1xuIiwiLyogZXNsaW50LWVudiBicm93c2VyICovXG5cbi8qKlxuICogVGhpcyBpcyB0aGUgd2ViIGJyb3dzZXIgaW1wbGVtZW50YXRpb24gb2YgYGRlYnVnKClgLlxuICovXG5cbmV4cG9ydHMuZm9ybWF0QXJncyA9IGZvcm1hdEFyZ3M7XG5leHBvcnRzLnNhdmUgPSBzYXZlO1xuZXhwb3J0cy5sb2FkID0gbG9hZDtcbmV4cG9ydHMudXNlQ29sb3JzID0gdXNlQ29sb3JzO1xuZXhwb3J0cy5zdG9yYWdlID0gbG9jYWxzdG9yYWdlKCk7XG5leHBvcnRzLmRlc3Ryb3kgPSAoKCkgPT4ge1xuXHRsZXQgd2FybmVkID0gZmFsc2U7XG5cblx0cmV0dXJuICgpID0+IHtcblx0XHRpZiAoIXdhcm5lZCkge1xuXHRcdFx0d2FybmVkID0gdHJ1ZTtcblx0XHRcdGNvbnNvbGUud2FybignSW5zdGFuY2UgbWV0aG9kIGBkZWJ1Zy5kZXN0cm95KClgIGlzIGRlcHJlY2F0ZWQgYW5kIG5vIGxvbmdlciBkb2VzIGFueXRoaW5nLiBJdCB3aWxsIGJlIHJlbW92ZWQgaW4gdGhlIG5leHQgbWFqb3IgdmVyc2lvbiBvZiBgZGVidWdgLicpO1xuXHRcdH1cblx0fTtcbn0pKCk7XG5cbi8qKlxuICogQ29sb3JzLlxuICovXG5cbmV4cG9ydHMuY29sb3JzID0gW1xuXHQnIzAwMDBDQycsXG5cdCcjMDAwMEZGJyxcblx0JyMwMDMzQ0MnLFxuXHQnIzAwMzNGRicsXG5cdCcjMDA2NkNDJyxcblx0JyMwMDY2RkYnLFxuXHQnIzAwOTlDQycsXG5cdCcjMDA5OUZGJyxcblx0JyMwMENDMDAnLFxuXHQnIzAwQ0MzMycsXG5cdCcjMDBDQzY2Jyxcblx0JyMwMENDOTknLFxuXHQnIzAwQ0NDQycsXG5cdCcjMDBDQ0ZGJyxcblx0JyMzMzAwQ0MnLFxuXHQnIzMzMDBGRicsXG5cdCcjMzMzM0NDJyxcblx0JyMzMzMzRkYnLFxuXHQnIzMzNjZDQycsXG5cdCcjMzM2NkZGJyxcblx0JyMzMzk5Q0MnLFxuXHQnIzMzOTlGRicsXG5cdCcjMzNDQzAwJyxcblx0JyMzM0NDMzMnLFxuXHQnIzMzQ0M2NicsXG5cdCcjMzNDQzk5Jyxcblx0JyMzM0NDQ0MnLFxuXHQnIzMzQ0NGRicsXG5cdCcjNjYwMENDJyxcblx0JyM2NjAwRkYnLFxuXHQnIzY2MzNDQycsXG5cdCcjNjYzM0ZGJyxcblx0JyM2NkNDMDAnLFxuXHQnIzY2Q0MzMycsXG5cdCcjOTkwMENDJyxcblx0JyM5OTAwRkYnLFxuXHQnIzk5MzNDQycsXG5cdCcjOTkzM0ZGJyxcblx0JyM5OUNDMDAnLFxuXHQnIzk5Q0MzMycsXG5cdCcjQ0MwMDAwJyxcblx0JyNDQzAwMzMnLFxuXHQnI0NDMDA2NicsXG5cdCcjQ0MwMDk5Jyxcblx0JyNDQzAwQ0MnLFxuXHQnI0NDMDBGRicsXG5cdCcjQ0MzMzAwJyxcblx0JyNDQzMzMzMnLFxuXHQnI0NDMzM2NicsXG5cdCcjQ0MzMzk5Jyxcblx0JyNDQzMzQ0MnLFxuXHQnI0NDMzNGRicsXG5cdCcjQ0M2NjAwJyxcblx0JyNDQzY2MzMnLFxuXHQnI0NDOTkwMCcsXG5cdCcjQ0M5OTMzJyxcblx0JyNDQ0NDMDAnLFxuXHQnI0NDQ0MzMycsXG5cdCcjRkYwMDAwJyxcblx0JyNGRjAwMzMnLFxuXHQnI0ZGMDA2NicsXG5cdCcjRkYwMDk5Jyxcblx0JyNGRjAwQ0MnLFxuXHQnI0ZGMDBGRicsXG5cdCcjRkYzMzAwJyxcblx0JyNGRjMzMzMnLFxuXHQnI0ZGMzM2NicsXG5cdCcjRkYzMzk5Jyxcblx0JyNGRjMzQ0MnLFxuXHQnI0ZGMzNGRicsXG5cdCcjRkY2NjAwJyxcblx0JyNGRjY2MzMnLFxuXHQnI0ZGOTkwMCcsXG5cdCcjRkY5OTMzJyxcblx0JyNGRkNDMDAnLFxuXHQnI0ZGQ0MzMydcbl07XG5cbi8qKlxuICogQ3VycmVudGx5IG9ubHkgV2ViS2l0LWJhc2VkIFdlYiBJbnNwZWN0b3JzLCBGaXJlZm94ID49IHYzMSxcbiAqIGFuZCB0aGUgRmlyZWJ1ZyBleHRlbnNpb24gKGFueSBGaXJlZm94IHZlcnNpb24pIGFyZSBrbm93blxuICogdG8gc3VwcG9ydCBcIiVjXCIgQ1NTIGN1c3RvbWl6YXRpb25zLlxuICpcbiAqIFRPRE86IGFkZCBhIGBsb2NhbFN0b3JhZ2VgIHZhcmlhYmxlIHRvIGV4cGxpY2l0bHkgZW5hYmxlL2Rpc2FibGUgY29sb3JzXG4gKi9cblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbXBsZXhpdHlcbmZ1bmN0aW9uIHVzZUNvbG9ycygpIHtcblx0Ly8gTkI6IEluIGFuIEVsZWN0cm9uIHByZWxvYWQgc2NyaXB0LCBkb2N1bWVudCB3aWxsIGJlIGRlZmluZWQgYnV0IG5vdCBmdWxseVxuXHQvLyBpbml0aWFsaXplZC4gU2luY2Ugd2Uga25vdyB3ZSdyZSBpbiBDaHJvbWUsIHdlJ2xsIGp1c3QgZGV0ZWN0IHRoaXMgY2FzZVxuXHQvLyBleHBsaWNpdGx5XG5cdGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cucHJvY2VzcyAmJiAod2luZG93LnByb2Nlc3MudHlwZSA9PT0gJ3JlbmRlcmVyJyB8fCB3aW5kb3cucHJvY2Vzcy5fX253anMpKSB7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblxuXHQvLyBJbnRlcm5ldCBFeHBsb3JlciBhbmQgRWRnZSBkbyBub3Qgc3VwcG9ydCBjb2xvcnMuXG5cdGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IudXNlckFnZW50ICYmIG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5tYXRjaCgvKGVkZ2V8dHJpZGVudClcXC8oXFxkKykvKSkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdGxldCBtO1xuXG5cdC8vIElzIHdlYmtpdD8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMTY0NTk2MDYvMzc2NzczXG5cdC8vIGRvY3VtZW50IGlzIHVuZGVmaW5lZCBpbiByZWFjdC1uYXRpdmU6IGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC1uYXRpdmUvcHVsbC8xNjMyXG5cdHJldHVybiAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5XZWJraXRBcHBlYXJhbmNlKSB8fFxuXHRcdC8vIElzIGZpcmVidWc/IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzM5ODEyMC8zNzY3NzNcblx0XHQodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmNvbnNvbGUgJiYgKHdpbmRvdy5jb25zb2xlLmZpcmVidWcgfHwgKHdpbmRvdy5jb25zb2xlLmV4Y2VwdGlvbiAmJiB3aW5kb3cuY29uc29sZS50YWJsZSkpKSB8fFxuXHRcdC8vIElzIGZpcmVmb3ggPj0gdjMxP1xuXHRcdC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvVG9vbHMvV2ViX0NvbnNvbGUjU3R5bGluZ19tZXNzYWdlc1xuXHRcdCh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJiBuYXZpZ2F0b3IudXNlckFnZW50ICYmIChtID0gbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLm1hdGNoKC9maXJlZm94XFwvKFxcZCspLykpICYmIHBhcnNlSW50KG1bMV0sIDEwKSA+PSAzMSkgfHxcblx0XHQvLyBEb3VibGUgY2hlY2sgd2Via2l0IGluIHVzZXJBZ2VudCBqdXN0IGluIGNhc2Ugd2UgYXJlIGluIGEgd29ya2VyXG5cdFx0KHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvci51c2VyQWdlbnQgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLm1hdGNoKC9hcHBsZXdlYmtpdFxcLyhcXGQrKS8pKTtcbn1cblxuLyoqXG4gKiBDb2xvcml6ZSBsb2cgYXJndW1lbnRzIGlmIGVuYWJsZWQuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBmb3JtYXRBcmdzKGFyZ3MpIHtcblx0YXJnc1swXSA9ICh0aGlzLnVzZUNvbG9ycyA/ICclYycgOiAnJykgK1xuXHRcdHRoaXMubmFtZXNwYWNlICtcblx0XHQodGhpcy51c2VDb2xvcnMgPyAnICVjJyA6ICcgJykgK1xuXHRcdGFyZ3NbMF0gK1xuXHRcdCh0aGlzLnVzZUNvbG9ycyA/ICclYyAnIDogJyAnKSArXG5cdFx0JysnICsgbW9kdWxlLmV4cG9ydHMuaHVtYW5pemUodGhpcy5kaWZmKTtcblxuXHRpZiAoIXRoaXMudXNlQ29sb3JzKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Y29uc3QgYyA9ICdjb2xvcjogJyArIHRoaXMuY29sb3I7XG5cdGFyZ3Muc3BsaWNlKDEsIDAsIGMsICdjb2xvcjogaW5oZXJpdCcpO1xuXG5cdC8vIFRoZSBmaW5hbCBcIiVjXCIgaXMgc29tZXdoYXQgdHJpY2t5LCBiZWNhdXNlIHRoZXJlIGNvdWxkIGJlIG90aGVyXG5cdC8vIGFyZ3VtZW50cyBwYXNzZWQgZWl0aGVyIGJlZm9yZSBvciBhZnRlciB0aGUgJWMsIHNvIHdlIG5lZWQgdG9cblx0Ly8gZmlndXJlIG91dCB0aGUgY29ycmVjdCBpbmRleCB0byBpbnNlcnQgdGhlIENTUyBpbnRvXG5cdGxldCBpbmRleCA9IDA7XG5cdGxldCBsYXN0QyA9IDA7XG5cdGFyZ3NbMF0ucmVwbGFjZSgvJVthLXpBLVolXS9nLCBtYXRjaCA9PiB7XG5cdFx0aWYgKG1hdGNoID09PSAnJSUnKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGluZGV4Kys7XG5cdFx0aWYgKG1hdGNoID09PSAnJWMnKSB7XG5cdFx0XHQvLyBXZSBvbmx5IGFyZSBpbnRlcmVzdGVkIGluIHRoZSAqbGFzdCogJWNcblx0XHRcdC8vICh0aGUgdXNlciBtYXkgaGF2ZSBwcm92aWRlZCB0aGVpciBvd24pXG5cdFx0XHRsYXN0QyA9IGluZGV4O1xuXHRcdH1cblx0fSk7XG5cblx0YXJncy5zcGxpY2UobGFzdEMsIDAsIGMpO1xufVxuXG4vKipcbiAqIEludm9rZXMgYGNvbnNvbGUuZGVidWcoKWAgd2hlbiBhdmFpbGFibGUuXG4gKiBOby1vcCB3aGVuIGBjb25zb2xlLmRlYnVnYCBpcyBub3QgYSBcImZ1bmN0aW9uXCIuXG4gKiBJZiBgY29uc29sZS5kZWJ1Z2AgaXMgbm90IGF2YWlsYWJsZSwgZmFsbHMgYmFja1xuICogdG8gYGNvbnNvbGUubG9nYC5cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5leHBvcnRzLmxvZyA9IGNvbnNvbGUuZGVidWcgfHwgY29uc29sZS5sb2cgfHwgKCgpID0+IHt9KTtcblxuLyoqXG4gKiBTYXZlIGBuYW1lc3BhY2VzYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlc1xuICogQGFwaSBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHNhdmUobmFtZXNwYWNlcykge1xuXHR0cnkge1xuXHRcdGlmIChuYW1lc3BhY2VzKSB7XG5cdFx0XHRleHBvcnRzLnN0b3JhZ2Uuc2V0SXRlbSgnZGVidWcnLCBuYW1lc3BhY2VzKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZXhwb3J0cy5zdG9yYWdlLnJlbW92ZUl0ZW0oJ2RlYnVnJyk7XG5cdFx0fVxuXHR9IGNhdGNoIChlcnJvcikge1xuXHRcdC8vIFN3YWxsb3dcblx0XHQvLyBYWFggKEBRaXgtKSBzaG91bGQgd2UgYmUgbG9nZ2luZyB0aGVzZT9cblx0fVxufVxuXG4vKipcbiAqIExvYWQgYG5hbWVzcGFjZXNgLlxuICpcbiAqIEByZXR1cm4ge1N0cmluZ30gcmV0dXJucyB0aGUgcHJldmlvdXNseSBwZXJzaXN0ZWQgZGVidWcgbW9kZXNcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBsb2FkKCkge1xuXHRsZXQgcjtcblx0dHJ5IHtcblx0XHRyID0gZXhwb3J0cy5zdG9yYWdlLmdldEl0ZW0oJ2RlYnVnJyk7XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0Ly8gU3dhbGxvd1xuXHRcdC8vIFhYWCAoQFFpeC0pIHNob3VsZCB3ZSBiZSBsb2dnaW5nIHRoZXNlP1xuXHR9XG5cblx0Ly8gSWYgZGVidWcgaXNuJ3Qgc2V0IGluIExTLCBhbmQgd2UncmUgaW4gRWxlY3Ryb24sIHRyeSB0byBsb2FkICRERUJVR1xuXHRpZiAoIXIgJiYgdHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmICdlbnYnIGluIHByb2Nlc3MpIHtcblx0XHRyID0gcHJvY2Vzcy5lbnYuREVCVUc7XG5cdH1cblxuXHRyZXR1cm4gcjtcbn1cblxuLyoqXG4gKiBMb2NhbHN0b3JhZ2UgYXR0ZW1wdHMgdG8gcmV0dXJuIHRoZSBsb2NhbHN0b3JhZ2UuXG4gKlxuICogVGhpcyBpcyBuZWNlc3NhcnkgYmVjYXVzZSBzYWZhcmkgdGhyb3dzXG4gKiB3aGVuIGEgdXNlciBkaXNhYmxlcyBjb29raWVzL2xvY2Fsc3RvcmFnZVxuICogYW5kIHlvdSBhdHRlbXB0IHRvIGFjY2VzcyBpdC5cbiAqXG4gKiBAcmV0dXJuIHtMb2NhbFN0b3JhZ2V9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBsb2NhbHN0b3JhZ2UoKSB7XG5cdHRyeSB7XG5cdFx0Ly8gVFZNTEtpdCAoQXBwbGUgVFYgSlMgUnVudGltZSkgZG9lcyBub3QgaGF2ZSBhIHdpbmRvdyBvYmplY3QsIGp1c3QgbG9jYWxTdG9yYWdlIGluIHRoZSBnbG9iYWwgY29udGV4dFxuXHRcdC8vIFRoZSBCcm93c2VyIGFsc28gaGFzIGxvY2FsU3RvcmFnZSBpbiB0aGUgZ2xvYmFsIGNvbnRleHQuXG5cdFx0cmV0dXJuIGxvY2FsU3RvcmFnZTtcblx0fSBjYXRjaCAoZXJyb3IpIHtcblx0XHQvLyBTd2FsbG93XG5cdFx0Ly8gWFhYIChAUWl4LSkgc2hvdWxkIHdlIGJlIGxvZ2dpbmcgdGhlc2U/XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2NvbW1vbicpKGV4cG9ydHMpO1xuXG5jb25zdCB7Zm9ybWF0dGVyc30gPSBtb2R1bGUuZXhwb3J0cztcblxuLyoqXG4gKiBNYXAgJWogdG8gYEpTT04uc3RyaW5naWZ5KClgLCBzaW5jZSBubyBXZWIgSW5zcGVjdG9ycyBkbyB0aGF0IGJ5IGRlZmF1bHQuXG4gKi9cblxuZm9ybWF0dGVycy5qID0gZnVuY3Rpb24gKHYpIHtcblx0dHJ5IHtcblx0XHRyZXR1cm4gSlNPTi5zdHJpbmdpZnkodik7XG5cdH0gY2F0Y2ggKGVycm9yKSB7XG5cdFx0cmV0dXJuICdbVW5leHBlY3RlZEpTT05QYXJzZUVycm9yXTogJyArIGVycm9yLm1lc3NhZ2U7XG5cdH1cbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuRGVjb2RlciA9IGV4cG9ydHMuRW5jb2RlciA9IGV4cG9ydHMuUGFja2V0VHlwZSA9IGV4cG9ydHMucHJvdG9jb2wgPSB2b2lkIDA7XG5jb25zdCBjb21wb25lbnRfZW1pdHRlcl8xID0gcmVxdWlyZShcIkBzb2NrZXQuaW8vY29tcG9uZW50LWVtaXR0ZXJcIik7XG5jb25zdCBiaW5hcnlfanNfMSA9IHJlcXVpcmUoXCIuL2JpbmFyeS5qc1wiKTtcbmNvbnN0IGlzX2JpbmFyeV9qc18xID0gcmVxdWlyZShcIi4vaXMtYmluYXJ5LmpzXCIpO1xuY29uc3QgZGVidWdfMSA9IHJlcXVpcmUoXCJkZWJ1Z1wiKTsgLy8gZGVidWcoKVxuY29uc3QgZGVidWcgPSAoMCwgZGVidWdfMS5kZWZhdWx0KShcInNvY2tldC5pby1wYXJzZXJcIik7IC8vIGRlYnVnKClcbi8qKlxuICogVGhlc2Ugc3RyaW5ncyBtdXN0IG5vdCBiZSB1c2VkIGFzIGV2ZW50IG5hbWVzLCBhcyB0aGV5IGhhdmUgYSBzcGVjaWFsIG1lYW5pbmcuXG4gKi9cbmNvbnN0IFJFU0VSVkVEX0VWRU5UUyA9IFtcbiAgICBcImNvbm5lY3RcIixcbiAgICBcImNvbm5lY3RfZXJyb3JcIixcbiAgICBcImRpc2Nvbm5lY3RcIixcbiAgICBcImRpc2Nvbm5lY3RpbmdcIixcbiAgICBcIm5ld0xpc3RlbmVyXCIsXG4gICAgXCJyZW1vdmVMaXN0ZW5lclwiLCAvLyB1c2VkIGJ5IHRoZSBOb2RlLmpzIEV2ZW50RW1pdHRlclxuXTtcbi8qKlxuICogUHJvdG9jb2wgdmVyc2lvbi5cbiAqXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydHMucHJvdG9jb2wgPSA1O1xudmFyIFBhY2tldFR5cGU7XG4oZnVuY3Rpb24gKFBhY2tldFR5cGUpIHtcbiAgICBQYWNrZXRUeXBlW1BhY2tldFR5cGVbXCJDT05ORUNUXCJdID0gMF0gPSBcIkNPTk5FQ1RcIjtcbiAgICBQYWNrZXRUeXBlW1BhY2tldFR5cGVbXCJESVNDT05ORUNUXCJdID0gMV0gPSBcIkRJU0NPTk5FQ1RcIjtcbiAgICBQYWNrZXRUeXBlW1BhY2tldFR5cGVbXCJFVkVOVFwiXSA9IDJdID0gXCJFVkVOVFwiO1xuICAgIFBhY2tldFR5cGVbUGFja2V0VHlwZVtcIkFDS1wiXSA9IDNdID0gXCJBQ0tcIjtcbiAgICBQYWNrZXRUeXBlW1BhY2tldFR5cGVbXCJDT05ORUNUX0VSUk9SXCJdID0gNF0gPSBcIkNPTk5FQ1RfRVJST1JcIjtcbiAgICBQYWNrZXRUeXBlW1BhY2tldFR5cGVbXCJCSU5BUllfRVZFTlRcIl0gPSA1XSA9IFwiQklOQVJZX0VWRU5UXCI7XG4gICAgUGFja2V0VHlwZVtQYWNrZXRUeXBlW1wiQklOQVJZX0FDS1wiXSA9IDZdID0gXCJCSU5BUllfQUNLXCI7XG59KShQYWNrZXRUeXBlID0gZXhwb3J0cy5QYWNrZXRUeXBlIHx8IChleHBvcnRzLlBhY2tldFR5cGUgPSB7fSkpO1xuLyoqXG4gKiBBIHNvY2tldC5pbyBFbmNvZGVyIGluc3RhbmNlXG4gKi9cbmNsYXNzIEVuY29kZXIge1xuICAgIC8qKlxuICAgICAqIEVuY29kZXIgY29uc3RydWN0b3JcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IHJlcGxhY2VyIC0gY3VzdG9tIHJlcGxhY2VyIHRvIHBhc3MgZG93biB0byBKU09OLnBhcnNlXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocmVwbGFjZXIpIHtcbiAgICAgICAgdGhpcy5yZXBsYWNlciA9IHJlcGxhY2VyO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBFbmNvZGUgYSBwYWNrZXQgYXMgYSBzaW5nbGUgc3RyaW5nIGlmIG5vbi1iaW5hcnksIG9yIGFzIGFcbiAgICAgKiBidWZmZXIgc2VxdWVuY2UsIGRlcGVuZGluZyBvbiBwYWNrZXQgdHlwZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYmogLSBwYWNrZXQgb2JqZWN0XG4gICAgICovXG4gICAgZW5jb2RlKG9iaikge1xuICAgICAgICBkZWJ1ZyhcImVuY29kaW5nIHBhY2tldCAlalwiLCBvYmopO1xuICAgICAgICBpZiAob2JqLnR5cGUgPT09IFBhY2tldFR5cGUuRVZFTlQgfHwgb2JqLnR5cGUgPT09IFBhY2tldFR5cGUuQUNLKSB7XG4gICAgICAgICAgICBpZiAoKDAsIGlzX2JpbmFyeV9qc18xLmhhc0JpbmFyeSkob2JqKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmVuY29kZUFzQmluYXJ5KHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogb2JqLnR5cGUgPT09IFBhY2tldFR5cGUuRVZFTlRcbiAgICAgICAgICAgICAgICAgICAgICAgID8gUGFja2V0VHlwZS5CSU5BUllfRVZFTlRcbiAgICAgICAgICAgICAgICAgICAgICAgIDogUGFja2V0VHlwZS5CSU5BUllfQUNLLFxuICAgICAgICAgICAgICAgICAgICBuc3A6IG9iai5uc3AsXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IG9iai5kYXRhLFxuICAgICAgICAgICAgICAgICAgICBpZDogb2JqLmlkLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbdGhpcy5lbmNvZGVBc1N0cmluZyhvYmopXTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRW5jb2RlIHBhY2tldCBhcyBzdHJpbmcuXG4gICAgICovXG4gICAgZW5jb2RlQXNTdHJpbmcob2JqKSB7XG4gICAgICAgIC8vIGZpcnN0IGlzIHR5cGVcbiAgICAgICAgbGV0IHN0ciA9IFwiXCIgKyBvYmoudHlwZTtcbiAgICAgICAgLy8gYXR0YWNobWVudHMgaWYgd2UgaGF2ZSB0aGVtXG4gICAgICAgIGlmIChvYmoudHlwZSA9PT0gUGFja2V0VHlwZS5CSU5BUllfRVZFTlQgfHxcbiAgICAgICAgICAgIG9iai50eXBlID09PSBQYWNrZXRUeXBlLkJJTkFSWV9BQ0spIHtcbiAgICAgICAgICAgIHN0ciArPSBvYmouYXR0YWNobWVudHMgKyBcIi1cIjtcbiAgICAgICAgfVxuICAgICAgICAvLyBpZiB3ZSBoYXZlIGEgbmFtZXNwYWNlIG90aGVyIHRoYW4gYC9gXG4gICAgICAgIC8vIHdlIGFwcGVuZCBpdCBmb2xsb3dlZCBieSBhIGNvbW1hIGAsYFxuICAgICAgICBpZiAob2JqLm5zcCAmJiBcIi9cIiAhPT0gb2JqLm5zcCkge1xuICAgICAgICAgICAgc3RyICs9IG9iai5uc3AgKyBcIixcIjtcbiAgICAgICAgfVxuICAgICAgICAvLyBpbW1lZGlhdGVseSBmb2xsb3dlZCBieSB0aGUgaWRcbiAgICAgICAgaWYgKG51bGwgIT0gb2JqLmlkKSB7XG4gICAgICAgICAgICBzdHIgKz0gb2JqLmlkO1xuICAgICAgICB9XG4gICAgICAgIC8vIGpzb24gZGF0YVxuICAgICAgICBpZiAobnVsbCAhPSBvYmouZGF0YSkge1xuICAgICAgICAgICAgc3RyICs9IEpTT04uc3RyaW5naWZ5KG9iai5kYXRhLCB0aGlzLnJlcGxhY2VyKTtcbiAgICAgICAgfVxuICAgICAgICBkZWJ1ZyhcImVuY29kZWQgJWogYXMgJXNcIiwgb2JqLCBzdHIpO1xuICAgICAgICByZXR1cm4gc3RyO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBFbmNvZGUgcGFja2V0IGFzICdidWZmZXIgc2VxdWVuY2UnIGJ5IHJlbW92aW5nIGJsb2JzLCBhbmRcbiAgICAgKiBkZWNvbnN0cnVjdGluZyBwYWNrZXQgaW50byBvYmplY3Qgd2l0aCBwbGFjZWhvbGRlcnMgYW5kXG4gICAgICogYSBsaXN0IG9mIGJ1ZmZlcnMuXG4gICAgICovXG4gICAgZW5jb2RlQXNCaW5hcnkob2JqKSB7XG4gICAgICAgIGNvbnN0IGRlY29uc3RydWN0aW9uID0gKDAsIGJpbmFyeV9qc18xLmRlY29uc3RydWN0UGFja2V0KShvYmopO1xuICAgICAgICBjb25zdCBwYWNrID0gdGhpcy5lbmNvZGVBc1N0cmluZyhkZWNvbnN0cnVjdGlvbi5wYWNrZXQpO1xuICAgICAgICBjb25zdCBidWZmZXJzID0gZGVjb25zdHJ1Y3Rpb24uYnVmZmVycztcbiAgICAgICAgYnVmZmVycy51bnNoaWZ0KHBhY2spOyAvLyBhZGQgcGFja2V0IGluZm8gdG8gYmVnaW5uaW5nIG9mIGRhdGEgbGlzdFxuICAgICAgICByZXR1cm4gYnVmZmVyczsgLy8gd3JpdGUgYWxsIHRoZSBidWZmZXJzXG4gICAgfVxufVxuZXhwb3J0cy5FbmNvZGVyID0gRW5jb2Rlcjtcbi8vIHNlZSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy84NTExMjgxL2NoZWNrLWlmLWEtdmFsdWUtaXMtYW4tb2JqZWN0LWluLWphdmFzY3JpcHRcbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09IFwiW29iamVjdCBPYmplY3RdXCI7XG59XG4vKipcbiAqIEEgc29ja2V0LmlvIERlY29kZXIgaW5zdGFuY2VcbiAqXG4gKiBAcmV0dXJuIHtPYmplY3R9IGRlY29kZXJcbiAqL1xuY2xhc3MgRGVjb2RlciBleHRlbmRzIGNvbXBvbmVudF9lbWl0dGVyXzEuRW1pdHRlciB7XG4gICAgLyoqXG4gICAgICogRGVjb2RlciBjb25zdHJ1Y3RvclxuICAgICAqXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gcmV2aXZlciAtIGN1c3RvbSByZXZpdmVyIHRvIHBhc3MgZG93biB0byBKU09OLnN0cmluZ2lmeVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHJldml2ZXIpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5yZXZpdmVyID0gcmV2aXZlcjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGVjb2RlcyBhbiBlbmNvZGVkIHBhY2tldCBzdHJpbmcgaW50byBwYWNrZXQgSlNPTi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBvYmogLSBlbmNvZGVkIHBhY2tldFxuICAgICAqL1xuICAgIGFkZChvYmopIHtcbiAgICAgICAgbGV0IHBhY2tldDtcbiAgICAgICAgaWYgKHR5cGVvZiBvYmogPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnJlY29uc3RydWN0b3IpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJnb3QgcGxhaW50ZXh0IGRhdGEgd2hlbiByZWNvbnN0cnVjdGluZyBhIHBhY2tldFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBhY2tldCA9IHRoaXMuZGVjb2RlU3RyaW5nKG9iaik7XG4gICAgICAgICAgICBjb25zdCBpc0JpbmFyeUV2ZW50ID0gcGFja2V0LnR5cGUgPT09IFBhY2tldFR5cGUuQklOQVJZX0VWRU5UO1xuICAgICAgICAgICAgaWYgKGlzQmluYXJ5RXZlbnQgfHwgcGFja2V0LnR5cGUgPT09IFBhY2tldFR5cGUuQklOQVJZX0FDSykge1xuICAgICAgICAgICAgICAgIHBhY2tldC50eXBlID0gaXNCaW5hcnlFdmVudCA/IFBhY2tldFR5cGUuRVZFTlQgOiBQYWNrZXRUeXBlLkFDSztcbiAgICAgICAgICAgICAgICAvLyBiaW5hcnkgcGFja2V0J3MganNvblxuICAgICAgICAgICAgICAgIHRoaXMucmVjb25zdHJ1Y3RvciA9IG5ldyBCaW5hcnlSZWNvbnN0cnVjdG9yKHBhY2tldCk7XG4gICAgICAgICAgICAgICAgLy8gbm8gYXR0YWNobWVudHMsIGxhYmVsZWQgYmluYXJ5IGJ1dCBubyBiaW5hcnkgZGF0YSB0byBmb2xsb3dcbiAgICAgICAgICAgICAgICBpZiAocGFja2V0LmF0dGFjaG1lbnRzID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1cGVyLmVtaXRSZXNlcnZlZChcImRlY29kZWRcIiwgcGFja2V0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBub24tYmluYXJ5IGZ1bGwgcGFja2V0XG4gICAgICAgICAgICAgICAgc3VwZXIuZW1pdFJlc2VydmVkKFwiZGVjb2RlZFwiLCBwYWNrZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCgwLCBpc19iaW5hcnlfanNfMS5pc0JpbmFyeSkob2JqKSB8fCBvYmouYmFzZTY0KSB7XG4gICAgICAgICAgICAvLyByYXcgYmluYXJ5IGRhdGFcbiAgICAgICAgICAgIGlmICghdGhpcy5yZWNvbnN0cnVjdG9yKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZ290IGJpbmFyeSBkYXRhIHdoZW4gbm90IHJlY29uc3RydWN0aW5nIGEgcGFja2V0XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcGFja2V0ID0gdGhpcy5yZWNvbnN0cnVjdG9yLnRha2VCaW5hcnlEYXRhKG9iaik7XG4gICAgICAgICAgICAgICAgaWYgKHBhY2tldCkge1xuICAgICAgICAgICAgICAgICAgICAvLyByZWNlaXZlZCBmaW5hbCBidWZmZXJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWNvbnN0cnVjdG9yID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgc3VwZXIuZW1pdFJlc2VydmVkKFwiZGVjb2RlZFwiLCBwYWNrZXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVua25vd24gdHlwZTogXCIgKyBvYmopO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERlY29kZSBhIHBhY2tldCBTdHJpbmcgKEpTT04gZGF0YSlcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IHBhY2tldFxuICAgICAqL1xuICAgIGRlY29kZVN0cmluZyhzdHIpIHtcbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICAvLyBsb29rIHVwIHR5cGVcbiAgICAgICAgY29uc3QgcCA9IHtcbiAgICAgICAgICAgIHR5cGU6IE51bWJlcihzdHIuY2hhckF0KDApKSxcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKFBhY2tldFR5cGVbcC50eXBlXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ1bmtub3duIHBhY2tldCB0eXBlIFwiICsgcC50eXBlKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBsb29rIHVwIGF0dGFjaG1lbnRzIGlmIHR5cGUgYmluYXJ5XG4gICAgICAgIGlmIChwLnR5cGUgPT09IFBhY2tldFR5cGUuQklOQVJZX0VWRU5UIHx8XG4gICAgICAgICAgICBwLnR5cGUgPT09IFBhY2tldFR5cGUuQklOQVJZX0FDSykge1xuICAgICAgICAgICAgY29uc3Qgc3RhcnQgPSBpICsgMTtcbiAgICAgICAgICAgIHdoaWxlIChzdHIuY2hhckF0KCsraSkgIT09IFwiLVwiICYmIGkgIT0gc3RyLmxlbmd0aCkgeyB9XG4gICAgICAgICAgICBjb25zdCBidWYgPSBzdHIuc3Vic3RyaW5nKHN0YXJ0LCBpKTtcbiAgICAgICAgICAgIGlmIChidWYgIT0gTnVtYmVyKGJ1ZikgfHwgc3RyLmNoYXJBdChpKSAhPT0gXCItXCIpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbGxlZ2FsIGF0dGFjaG1lbnRzXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcC5hdHRhY2htZW50cyA9IE51bWJlcihidWYpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGxvb2sgdXAgbmFtZXNwYWNlIChpZiBhbnkpXG4gICAgICAgIGlmIChcIi9cIiA9PT0gc3RyLmNoYXJBdChpICsgMSkpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gaSArIDE7XG4gICAgICAgICAgICB3aGlsZSAoKytpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYyA9IHN0ci5jaGFyQXQoaSk7XG4gICAgICAgICAgICAgICAgaWYgKFwiLFwiID09PSBjKVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBpZiAoaSA9PT0gc3RyLmxlbmd0aClcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwLm5zcCA9IHN0ci5zdWJzdHJpbmcoc3RhcnQsIGkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcC5uc3AgPSBcIi9cIjtcbiAgICAgICAgfVxuICAgICAgICAvLyBsb29rIHVwIGlkXG4gICAgICAgIGNvbnN0IG5leHQgPSBzdHIuY2hhckF0KGkgKyAxKTtcbiAgICAgICAgaWYgKFwiXCIgIT09IG5leHQgJiYgTnVtYmVyKG5leHQpID09IG5leHQpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gaSArIDE7XG4gICAgICAgICAgICB3aGlsZSAoKytpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYyA9IHN0ci5jaGFyQXQoaSk7XG4gICAgICAgICAgICAgICAgaWYgKG51bGwgPT0gYyB8fCBOdW1iZXIoYykgIT0gYykge1xuICAgICAgICAgICAgICAgICAgICAtLWk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaSA9PT0gc3RyLmxlbmd0aClcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwLmlkID0gTnVtYmVyKHN0ci5zdWJzdHJpbmcoc3RhcnQsIGkgKyAxKSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gbG9vayB1cCBqc29uIGRhdGFcbiAgICAgICAgaWYgKHN0ci5jaGFyQXQoKytpKSkge1xuICAgICAgICAgICAgY29uc3QgcGF5bG9hZCA9IHRoaXMudHJ5UGFyc2Uoc3RyLnN1YnN0cihpKSk7XG4gICAgICAgICAgICBpZiAoRGVjb2Rlci5pc1BheWxvYWRWYWxpZChwLnR5cGUsIHBheWxvYWQpKSB7XG4gICAgICAgICAgICAgICAgcC5kYXRhID0gcGF5bG9hZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImludmFsaWQgcGF5bG9hZFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBkZWJ1ZyhcImRlY29kZWQgJXMgYXMgJWpcIiwgc3RyLCBwKTtcbiAgICAgICAgcmV0dXJuIHA7XG4gICAgfVxuICAgIHRyeVBhcnNlKHN0cikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2Uoc3RyLCB0aGlzLnJldml2ZXIpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIGlzUGF5bG9hZFZhbGlkKHR5cGUsIHBheWxvYWQpIHtcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICBjYXNlIFBhY2tldFR5cGUuQ09OTkVDVDpcbiAgICAgICAgICAgICAgICByZXR1cm4gaXNPYmplY3QocGF5bG9hZCk7XG4gICAgICAgICAgICBjYXNlIFBhY2tldFR5cGUuRElTQ09OTkVDVDpcbiAgICAgICAgICAgICAgICByZXR1cm4gcGF5bG9hZCA9PT0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgY2FzZSBQYWNrZXRUeXBlLkNPTk5FQ1RfRVJST1I6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiBwYXlsb2FkID09PSBcInN0cmluZ1wiIHx8IGlzT2JqZWN0KHBheWxvYWQpO1xuICAgICAgICAgICAgY2FzZSBQYWNrZXRUeXBlLkVWRU5UOlxuICAgICAgICAgICAgY2FzZSBQYWNrZXRUeXBlLkJJTkFSWV9FVkVOVDpcbiAgICAgICAgICAgICAgICByZXR1cm4gKEFycmF5LmlzQXJyYXkocGF5bG9hZCkgJiZcbiAgICAgICAgICAgICAgICAgICAgKHR5cGVvZiBwYXlsb2FkWzBdID09PSBcIm51bWJlclwiIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAodHlwZW9mIHBheWxvYWRbMF0gPT09IFwic3RyaW5nXCIgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBSRVNFUlZFRF9FVkVOVFMuaW5kZXhPZihwYXlsb2FkWzBdKSA9PT0gLTEpKSk7XG4gICAgICAgICAgICBjYXNlIFBhY2tldFR5cGUuQUNLOlxuICAgICAgICAgICAgY2FzZSBQYWNrZXRUeXBlLkJJTkFSWV9BQ0s6XG4gICAgICAgICAgICAgICAgcmV0dXJuIEFycmF5LmlzQXJyYXkocGF5bG9hZCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogRGVhbGxvY2F0ZXMgYSBwYXJzZXIncyByZXNvdXJjZXNcbiAgICAgKi9cbiAgICBkZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5yZWNvbnN0cnVjdG9yKSB7XG4gICAgICAgICAgICB0aGlzLnJlY29uc3RydWN0b3IuZmluaXNoZWRSZWNvbnN0cnVjdGlvbigpO1xuICAgICAgICAgICAgdGhpcy5yZWNvbnN0cnVjdG9yID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuRGVjb2RlciA9IERlY29kZXI7XG4vKipcbiAqIEEgbWFuYWdlciBvZiBhIGJpbmFyeSBldmVudCdzICdidWZmZXIgc2VxdWVuY2UnLiBTaG91bGRcbiAqIGJlIGNvbnN0cnVjdGVkIHdoZW5ldmVyIGEgcGFja2V0IG9mIHR5cGUgQklOQVJZX0VWRU5UIGlzXG4gKiBkZWNvZGVkLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBwYWNrZXRcbiAqIEByZXR1cm4ge0JpbmFyeVJlY29uc3RydWN0b3J9IGluaXRpYWxpemVkIHJlY29uc3RydWN0b3JcbiAqL1xuY2xhc3MgQmluYXJ5UmVjb25zdHJ1Y3RvciB7XG4gICAgY29uc3RydWN0b3IocGFja2V0KSB7XG4gICAgICAgIHRoaXMucGFja2V0ID0gcGFja2V0O1xuICAgICAgICB0aGlzLmJ1ZmZlcnMgPSBbXTtcbiAgICAgICAgdGhpcy5yZWNvblBhY2sgPSBwYWNrZXQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE1ldGhvZCB0byBiZSBjYWxsZWQgd2hlbiBiaW5hcnkgZGF0YSByZWNlaXZlZCBmcm9tIGNvbm5lY3Rpb25cbiAgICAgKiBhZnRlciBhIEJJTkFSWV9FVkVOVCBwYWNrZXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0J1ZmZlciB8IEFycmF5QnVmZmVyfSBiaW5EYXRhIC0gdGhlIHJhdyBiaW5hcnkgZGF0YSByZWNlaXZlZFxuICAgICAqIEByZXR1cm4ge251bGwgfCBPYmplY3R9IHJldHVybnMgbnVsbCBpZiBtb3JlIGJpbmFyeSBkYXRhIGlzIGV4cGVjdGVkIG9yXG4gICAgICogICBhIHJlY29uc3RydWN0ZWQgcGFja2V0IG9iamVjdCBpZiBhbGwgYnVmZmVycyBoYXZlIGJlZW4gcmVjZWl2ZWQuXG4gICAgICovXG4gICAgdGFrZUJpbmFyeURhdGEoYmluRGF0YSkge1xuICAgICAgICB0aGlzLmJ1ZmZlcnMucHVzaChiaW5EYXRhKTtcbiAgICAgICAgaWYgKHRoaXMuYnVmZmVycy5sZW5ndGggPT09IHRoaXMucmVjb25QYWNrLmF0dGFjaG1lbnRzKSB7XG4gICAgICAgICAgICAvLyBkb25lIHdpdGggYnVmZmVyIGxpc3RcbiAgICAgICAgICAgIGNvbnN0IHBhY2tldCA9ICgwLCBiaW5hcnlfanNfMS5yZWNvbnN0cnVjdFBhY2tldCkodGhpcy5yZWNvblBhY2ssIHRoaXMuYnVmZmVycyk7XG4gICAgICAgICAgICB0aGlzLmZpbmlzaGVkUmVjb25zdHJ1Y3Rpb24oKTtcbiAgICAgICAgICAgIHJldHVybiBwYWNrZXQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsZWFucyB1cCBiaW5hcnkgcGFja2V0IHJlY29uc3RydWN0aW9uIHZhcmlhYmxlcy5cbiAgICAgKi9cbiAgICBmaW5pc2hlZFJlY29uc3RydWN0aW9uKCkge1xuICAgICAgICB0aGlzLnJlY29uUGFjayA9IG51bGw7XG4gICAgICAgIHRoaXMuYnVmZmVycyA9IFtdO1xuICAgIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5vbiA9IG9uO1xuZnVuY3Rpb24gb24ob2JqLCBldiwgZm4pIHtcbiAgICBvYmoub24oZXYsIGZuKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gc3ViRGVzdHJveSgpIHtcbiAgICAgICAgb2JqLm9mZihldiwgZm4pO1xuICAgIH07XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuU29ja2V0ID0gdm9pZCAwO1xuY29uc3Qgc29ja2V0X2lvX3BhcnNlcl8xID0gcmVxdWlyZShcInNvY2tldC5pby1wYXJzZXJcIik7XG5jb25zdCBvbl9qc18xID0gcmVxdWlyZShcIi4vb24uanNcIik7XG5jb25zdCBjb21wb25lbnRfZW1pdHRlcl8xID0gcmVxdWlyZShcIkBzb2NrZXQuaW8vY29tcG9uZW50LWVtaXR0ZXJcIik7XG5jb25zdCBkZWJ1Z18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJkZWJ1Z1wiKSk7IC8vIGRlYnVnKClcbmNvbnN0IGRlYnVnID0gKDAsIGRlYnVnXzEuZGVmYXVsdCkoXCJzb2NrZXQuaW8tY2xpZW50OnNvY2tldFwiKTsgLy8gZGVidWcoKVxuLyoqXG4gKiBJbnRlcm5hbCBldmVudHMuXG4gKiBUaGVzZSBldmVudHMgY2FuJ3QgYmUgZW1pdHRlZCBieSB0aGUgdXNlci5cbiAqL1xuY29uc3QgUkVTRVJWRURfRVZFTlRTID0gT2JqZWN0LmZyZWV6ZSh7XG4gICAgY29ubmVjdDogMSxcbiAgICBjb25uZWN0X2Vycm9yOiAxLFxuICAgIGRpc2Nvbm5lY3Q6IDEsXG4gICAgZGlzY29ubmVjdGluZzogMSxcbiAgICAvLyBFdmVudEVtaXR0ZXIgcmVzZXJ2ZWQgZXZlbnRzOiBodHRwczovL25vZGVqcy5vcmcvYXBpL2V2ZW50cy5odG1sI2V2ZW50c19ldmVudF9uZXdsaXN0ZW5lclxuICAgIG5ld0xpc3RlbmVyOiAxLFxuICAgIHJlbW92ZUxpc3RlbmVyOiAxLFxufSk7XG4vKipcbiAqIEEgU29ja2V0IGlzIHRoZSBmdW5kYW1lbnRhbCBjbGFzcyBmb3IgaW50ZXJhY3Rpbmcgd2l0aCB0aGUgc2VydmVyLlxuICpcbiAqIEEgU29ja2V0IGJlbG9uZ3MgdG8gYSBjZXJ0YWluIE5hbWVzcGFjZSAoYnkgZGVmYXVsdCAvKSBhbmQgdXNlcyBhbiB1bmRlcmx5aW5nIHtAbGluayBNYW5hZ2VyfSB0byBjb21tdW5pY2F0ZS5cbiAqXG4gKiBAZXhhbXBsZVxuICogY29uc3Qgc29ja2V0ID0gaW8oKTtcbiAqXG4gKiBzb2NrZXQub24oXCJjb25uZWN0XCIsICgpID0+IHtcbiAqICAgY29uc29sZS5sb2coXCJjb25uZWN0ZWRcIik7XG4gKiB9KTtcbiAqXG4gKiAvLyBzZW5kIGFuIGV2ZW50IHRvIHRoZSBzZXJ2ZXJcbiAqIHNvY2tldC5lbWl0KFwiZm9vXCIsIFwiYmFyXCIpO1xuICpcbiAqIHNvY2tldC5vbihcImZvb2JhclwiLCAoKSA9PiB7XG4gKiAgIC8vIGFuIGV2ZW50IHdhcyByZWNlaXZlZCBmcm9tIHRoZSBzZXJ2ZXJcbiAqIH0pO1xuICpcbiAqIC8vIHVwb24gZGlzY29ubmVjdGlvblxuICogc29ja2V0Lm9uKFwiZGlzY29ubmVjdFwiLCAocmVhc29uKSA9PiB7XG4gKiAgIGNvbnNvbGUubG9nKGBkaXNjb25uZWN0ZWQgZHVlIHRvICR7cmVhc29ufWApO1xuICogfSk7XG4gKi9cbmNsYXNzIFNvY2tldCBleHRlbmRzIGNvbXBvbmVudF9lbWl0dGVyXzEuRW1pdHRlciB7XG4gICAgLyoqXG4gICAgICogYFNvY2tldGAgY29uc3RydWN0b3IuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoaW8sIG5zcCwgb3B0cykge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICAvKipcbiAgICAgICAgICogV2hldGhlciB0aGUgc29ja2V0IGlzIGN1cnJlbnRseSBjb25uZWN0ZWQgdG8gdGhlIHNlcnZlci5cbiAgICAgICAgICpcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogY29uc3Qgc29ja2V0ID0gaW8oKTtcbiAgICAgICAgICpcbiAgICAgICAgICogc29ja2V0Lm9uKFwiY29ubmVjdFwiLCAoKSA9PiB7XG4gICAgICAgICAqICAgY29uc29sZS5sb2coc29ja2V0LmNvbm5lY3RlZCk7IC8vIHRydWVcbiAgICAgICAgICogfSk7XG4gICAgICAgICAqXG4gICAgICAgICAqIHNvY2tldC5vbihcImRpc2Nvbm5lY3RcIiwgKCkgPT4ge1xuICAgICAgICAgKiAgIGNvbnNvbGUubG9nKHNvY2tldC5jb25uZWN0ZWQpOyAvLyBmYWxzZVxuICAgICAgICAgKiB9KTtcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuY29ubmVjdGVkID0gZmFsc2U7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBXaGV0aGVyIHRoZSBjb25uZWN0aW9uIHN0YXRlIHdhcyByZWNvdmVyZWQgYWZ0ZXIgYSB0ZW1wb3JhcnkgZGlzY29ubmVjdGlvbi4gSW4gdGhhdCBjYXNlLCBhbnkgbWlzc2VkIHBhY2tldHMgd2lsbFxuICAgICAgICAgKiBiZSB0cmFuc21pdHRlZCBieSB0aGUgc2VydmVyLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5yZWNvdmVyZWQgPSBmYWxzZTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEJ1ZmZlciBmb3IgcGFja2V0cyByZWNlaXZlZCBiZWZvcmUgdGhlIENPTk5FQ1QgcGFja2V0XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnJlY2VpdmVCdWZmZXIgPSBbXTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEJ1ZmZlciBmb3IgcGFja2V0cyB0aGF0IHdpbGwgYmUgc2VudCBvbmNlIHRoZSBzb2NrZXQgaXMgY29ubmVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnNlbmRCdWZmZXIgPSBbXTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBxdWV1ZSBvZiBwYWNrZXRzIHRvIGJlIHNlbnQgd2l0aCByZXRyeSBpbiBjYXNlIG9mIGZhaWx1cmUuXG4gICAgICAgICAqXG4gICAgICAgICAqIFBhY2tldHMgYXJlIHNlbnQgb25lIGJ5IG9uZSwgZWFjaCB3YWl0aW5nIGZvciB0aGUgc2VydmVyIGFja25vd2xlZGdlbWVudCwgaW4gb3JkZXIgdG8gZ3VhcmFudGVlIHRoZSBkZWxpdmVyeSBvcmRlci5cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX3F1ZXVlID0gW107XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBIHNlcXVlbmNlIHRvIGdlbmVyYXRlIHRoZSBJRCBvZiB0aGUge0BsaW5rIFF1ZXVlZFBhY2tldH0uXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9xdWV1ZVNlcSA9IDA7XG4gICAgICAgIHRoaXMuaWRzID0gMDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEEgbWFwIGNvbnRhaW5pbmcgYWNrbm93bGVkZ2VtZW50IGhhbmRsZXJzLlxuICAgICAgICAgKlxuICAgICAgICAgKiBUaGUgYHdpdGhFcnJvcmAgYXR0cmlidXRlIGlzIHVzZWQgdG8gZGlmZmVyZW50aWF0ZSBoYW5kbGVycyB0aGF0IGFjY2VwdCBhbiBlcnJvciBhcyBmaXJzdCBhcmd1bWVudDpcbiAgICAgICAgICpcbiAgICAgICAgICogLSBgc29ja2V0LmVtaXQoXCJ0ZXN0XCIsIChlcnIsIHZhbHVlKSA9PiB7IC4uLiB9KWAgd2l0aCBgYWNrVGltZW91dGAgb3B0aW9uXG4gICAgICAgICAqIC0gYHNvY2tldC50aW1lb3V0KDUwMDApLmVtaXQoXCJ0ZXN0XCIsIChlcnIsIHZhbHVlKSA9PiB7IC4uLiB9KWBcbiAgICAgICAgICogLSBgY29uc3QgdmFsdWUgPSBhd2FpdCBzb2NrZXQuZW1pdFdpdGhBY2soXCJ0ZXN0XCIpYFxuICAgICAgICAgKlxuICAgICAgICAgKiBGcm9tIHRob3NlIHRoYXQgZG9uJ3Q6XG4gICAgICAgICAqXG4gICAgICAgICAqIC0gYHNvY2tldC5lbWl0KFwidGVzdFwiLCAodmFsdWUpID0+IHsgLi4uIH0pO2BcbiAgICAgICAgICpcbiAgICAgICAgICogSW4gdGhlIGZpcnN0IGNhc2UsIHRoZSBoYW5kbGVycyB3aWxsIGJlIGNhbGxlZCB3aXRoIGFuIGVycm9yIHdoZW46XG4gICAgICAgICAqXG4gICAgICAgICAqIC0gdGhlIHRpbWVvdXQgaXMgcmVhY2hlZFxuICAgICAgICAgKiAtIHRoZSBzb2NrZXQgZ2V0cyBkaXNjb25uZWN0ZWRcbiAgICAgICAgICpcbiAgICAgICAgICogSW4gdGhlIHNlY29uZCBjYXNlLCB0aGUgaGFuZGxlcnMgd2lsbCBiZSBzaW1wbHkgZGlzY2FyZGVkIHVwb24gZGlzY29ubmVjdGlvbiwgc2luY2UgdGhlIGNsaWVudCB3aWxsIG5ldmVyIHJlY2VpdmVcbiAgICAgICAgICogYW4gYWNrbm93bGVkZ2VtZW50IGZyb20gdGhlIHNlcnZlci5cbiAgICAgICAgICpcbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuYWNrcyA9IHt9O1xuICAgICAgICB0aGlzLmZsYWdzID0ge307XG4gICAgICAgIHRoaXMuaW8gPSBpbztcbiAgICAgICAgdGhpcy5uc3AgPSBuc3A7XG4gICAgICAgIGlmIChvcHRzICYmIG9wdHMuYXV0aCkge1xuICAgICAgICAgICAgdGhpcy5hdXRoID0gb3B0cy5hdXRoO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX29wdHMgPSBPYmplY3QuYXNzaWduKHt9LCBvcHRzKTtcbiAgICAgICAgaWYgKHRoaXMuaW8uX2F1dG9Db25uZWN0KVxuICAgICAgICAgICAgdGhpcy5vcGVuKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlIHNvY2tldCBpcyBjdXJyZW50bHkgZGlzY29ubmVjdGVkXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGNvbnN0IHNvY2tldCA9IGlvKCk7XG4gICAgICpcbiAgICAgKiBzb2NrZXQub24oXCJjb25uZWN0XCIsICgpID0+IHtcbiAgICAgKiAgIGNvbnNvbGUubG9nKHNvY2tldC5kaXNjb25uZWN0ZWQpOyAvLyBmYWxzZVxuICAgICAqIH0pO1xuICAgICAqXG4gICAgICogc29ja2V0Lm9uKFwiZGlzY29ubmVjdFwiLCAoKSA9PiB7XG4gICAgICogICBjb25zb2xlLmxvZyhzb2NrZXQuZGlzY29ubmVjdGVkKTsgLy8gdHJ1ZVxuICAgICAqIH0pO1xuICAgICAqL1xuICAgIGdldCBkaXNjb25uZWN0ZWQoKSB7XG4gICAgICAgIHJldHVybiAhdGhpcy5jb25uZWN0ZWQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFN1YnNjcmliZSB0byBvcGVuLCBjbG9zZSBhbmQgcGFja2V0IGV2ZW50c1xuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBzdWJFdmVudHMoKSB7XG4gICAgICAgIGlmICh0aGlzLnN1YnMpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNvbnN0IGlvID0gdGhpcy5pbztcbiAgICAgICAgdGhpcy5zdWJzID0gW1xuICAgICAgICAgICAgKDAsIG9uX2pzXzEub24pKGlvLCBcIm9wZW5cIiwgdGhpcy5vbm9wZW4uYmluZCh0aGlzKSksXG4gICAgICAgICAgICAoMCwgb25fanNfMS5vbikoaW8sIFwicGFja2V0XCIsIHRoaXMub25wYWNrZXQuYmluZCh0aGlzKSksXG4gICAgICAgICAgICAoMCwgb25fanNfMS5vbikoaW8sIFwiZXJyb3JcIiwgdGhpcy5vbmVycm9yLmJpbmQodGhpcykpLFxuICAgICAgICAgICAgKDAsIG9uX2pzXzEub24pKGlvLCBcImNsb3NlXCIsIHRoaXMub25jbG9zZS5iaW5kKHRoaXMpKSxcbiAgICAgICAgXTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGUgU29ja2V0IHdpbGwgdHJ5IHRvIHJlY29ubmVjdCB3aGVuIGl0cyBNYW5hZ2VyIGNvbm5lY3RzIG9yIHJlY29ubmVjdHMuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGNvbnN0IHNvY2tldCA9IGlvKCk7XG4gICAgICpcbiAgICAgKiBjb25zb2xlLmxvZyhzb2NrZXQuYWN0aXZlKTsgLy8gdHJ1ZVxuICAgICAqXG4gICAgICogc29ja2V0Lm9uKFwiZGlzY29ubmVjdFwiLCAocmVhc29uKSA9PiB7XG4gICAgICogICBpZiAocmVhc29uID09PSBcImlvIHNlcnZlciBkaXNjb25uZWN0XCIpIHtcbiAgICAgKiAgICAgLy8gdGhlIGRpc2Nvbm5lY3Rpb24gd2FzIGluaXRpYXRlZCBieSB0aGUgc2VydmVyLCB5b3UgbmVlZCB0byBtYW51YWxseSByZWNvbm5lY3RcbiAgICAgKiAgICAgY29uc29sZS5sb2coc29ja2V0LmFjdGl2ZSk7IC8vIGZhbHNlXG4gICAgICogICB9XG4gICAgICogICAvLyBlbHNlIHRoZSBzb2NrZXQgd2lsbCBhdXRvbWF0aWNhbGx5IHRyeSB0byByZWNvbm5lY3RcbiAgICAgKiAgIGNvbnNvbGUubG9nKHNvY2tldC5hY3RpdmUpOyAvLyB0cnVlXG4gICAgICogfSk7XG4gICAgICovXG4gICAgZ2V0IGFjdGl2ZSgpIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5zdWJzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBcIk9wZW5zXCIgdGhlIHNvY2tldC5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogY29uc3Qgc29ja2V0ID0gaW8oe1xuICAgICAqICAgYXV0b0Nvbm5lY3Q6IGZhbHNlXG4gICAgICogfSk7XG4gICAgICpcbiAgICAgKiBzb2NrZXQuY29ubmVjdCgpO1xuICAgICAqL1xuICAgIGNvbm5lY3QoKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbm5lY3RlZClcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB0aGlzLnN1YkV2ZW50cygpO1xuICAgICAgICBpZiAoIXRoaXMuaW9bXCJfcmVjb25uZWN0aW5nXCJdKVxuICAgICAgICAgICAgdGhpcy5pby5vcGVuKCk7IC8vIGVuc3VyZSBvcGVuXG4gICAgICAgIGlmIChcIm9wZW5cIiA9PT0gdGhpcy5pby5fcmVhZHlTdGF0ZSlcbiAgICAgICAgICAgIHRoaXMub25vcGVuKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBbGlhcyBmb3Ige0BsaW5rIGNvbm5lY3QoKX0uXG4gICAgICovXG4gICAgb3BlbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29ubmVjdCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZW5kcyBhIGBtZXNzYWdlYCBldmVudC5cbiAgICAgKlxuICAgICAqIFRoaXMgbWV0aG9kIG1pbWljcyB0aGUgV2ViU29ja2V0LnNlbmQoKSBtZXRob2QuXG4gICAgICpcbiAgICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9XZWJTb2NrZXQvc2VuZFxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBzb2NrZXQuc2VuZChcImhlbGxvXCIpO1xuICAgICAqXG4gICAgICogLy8gdGhpcyBpcyBlcXVpdmFsZW50IHRvXG4gICAgICogc29ja2V0LmVtaXQoXCJtZXNzYWdlXCIsIFwiaGVsbG9cIik7XG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHNlbGZcbiAgICAgKi9cbiAgICBzZW5kKC4uLmFyZ3MpIHtcbiAgICAgICAgYXJncy51bnNoaWZ0KFwibWVzc2FnZVwiKTtcbiAgICAgICAgdGhpcy5lbWl0LmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGUgYGVtaXRgLlxuICAgICAqIElmIHRoZSBldmVudCBpcyBpbiBgZXZlbnRzYCwgaXQncyBlbWl0dGVkIG5vcm1hbGx5LlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBzb2NrZXQuZW1pdChcImhlbGxvXCIsIFwid29ybGRcIik7XG4gICAgICpcbiAgICAgKiAvLyBhbGwgc2VyaWFsaXphYmxlIGRhdGFzdHJ1Y3R1cmVzIGFyZSBzdXBwb3J0ZWQgKG5vIG5lZWQgdG8gY2FsbCBKU09OLnN0cmluZ2lmeSlcbiAgICAgKiBzb2NrZXQuZW1pdChcImhlbGxvXCIsIDEsIFwiMlwiLCB7IDM6IFtcIjRcIl0sIDU6IFVpbnQ4QXJyYXkuZnJvbShbNl0pIH0pO1xuICAgICAqXG4gICAgICogLy8gd2l0aCBhbiBhY2tub3dsZWRnZW1lbnQgZnJvbSB0aGUgc2VydmVyXG4gICAgICogc29ja2V0LmVtaXQoXCJoZWxsb1wiLCBcIndvcmxkXCIsICh2YWwpID0+IHtcbiAgICAgKiAgIC8vIC4uLlxuICAgICAqIH0pO1xuICAgICAqXG4gICAgICogQHJldHVybiBzZWxmXG4gICAgICovXG4gICAgZW1pdChldiwgLi4uYXJncykge1xuICAgICAgICB2YXIgX2EsIF9iLCBfYztcbiAgICAgICAgaWYgKFJFU0VSVkVEX0VWRU5UUy5oYXNPd25Qcm9wZXJ0eShldikpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignXCInICsgZXYudG9TdHJpbmcoKSArICdcIiBpcyBhIHJlc2VydmVkIGV2ZW50IG5hbWUnKTtcbiAgICAgICAgfVxuICAgICAgICBhcmdzLnVuc2hpZnQoZXYpO1xuICAgICAgICBpZiAodGhpcy5fb3B0cy5yZXRyaWVzICYmICF0aGlzLmZsYWdzLmZyb21RdWV1ZSAmJiAhdGhpcy5mbGFncy52b2xhdGlsZSkge1xuICAgICAgICAgICAgdGhpcy5fYWRkVG9RdWV1ZShhcmdzKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBhY2tldCA9IHtcbiAgICAgICAgICAgIHR5cGU6IHNvY2tldF9pb19wYXJzZXJfMS5QYWNrZXRUeXBlLkVWRU5ULFxuICAgICAgICAgICAgZGF0YTogYXJncyxcbiAgICAgICAgfTtcbiAgICAgICAgcGFja2V0Lm9wdGlvbnMgPSB7fTtcbiAgICAgICAgcGFja2V0Lm9wdGlvbnMuY29tcHJlc3MgPSB0aGlzLmZsYWdzLmNvbXByZXNzICE9PSBmYWxzZTtcbiAgICAgICAgLy8gZXZlbnQgYWNrIGNhbGxiYWNrXG4gICAgICAgIGlmIChcImZ1bmN0aW9uXCIgPT09IHR5cGVvZiBhcmdzW2FyZ3MubGVuZ3RoIC0gMV0pIHtcbiAgICAgICAgICAgIGNvbnN0IGlkID0gdGhpcy5pZHMrKztcbiAgICAgICAgICAgIGRlYnVnKFwiZW1pdHRpbmcgcGFja2V0IHdpdGggYWNrIGlkICVkXCIsIGlkKTtcbiAgICAgICAgICAgIGNvbnN0IGFjayA9IGFyZ3MucG9wKCk7XG4gICAgICAgICAgICB0aGlzLl9yZWdpc3RlckFja0NhbGxiYWNrKGlkLCBhY2spO1xuICAgICAgICAgICAgcGFja2V0LmlkID0gaWQ7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaXNUcmFuc3BvcnRXcml0YWJsZSA9IChfYiA9IChfYSA9IHRoaXMuaW8uZW5naW5lKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EudHJhbnNwb3J0KSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Iud3JpdGFibGU7XG4gICAgICAgIGNvbnN0IGlzQ29ubmVjdGVkID0gdGhpcy5jb25uZWN0ZWQgJiYgISgoX2MgPSB0aGlzLmlvLmVuZ2luZSkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLl9oYXNQaW5nRXhwaXJlZCgpKTtcbiAgICAgICAgY29uc3QgZGlzY2FyZFBhY2tldCA9IHRoaXMuZmxhZ3Mudm9sYXRpbGUgJiYgIWlzVHJhbnNwb3J0V3JpdGFibGU7XG4gICAgICAgIGlmIChkaXNjYXJkUGFja2V0KSB7XG4gICAgICAgICAgICBkZWJ1ZyhcImRpc2NhcmQgcGFja2V0IGFzIHRoZSB0cmFuc3BvcnQgaXMgbm90IGN1cnJlbnRseSB3cml0YWJsZVwiKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpc0Nvbm5lY3RlZCkge1xuICAgICAgICAgICAgdGhpcy5ub3RpZnlPdXRnb2luZ0xpc3RlbmVycyhwYWNrZXQpO1xuICAgICAgICAgICAgdGhpcy5wYWNrZXQocGFja2V0KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2VuZEJ1ZmZlci5wdXNoKHBhY2tldCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5mbGFncyA9IHt9O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfcmVnaXN0ZXJBY2tDYWxsYmFjayhpZCwgYWNrKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgY29uc3QgdGltZW91dCA9IChfYSA9IHRoaXMuZmxhZ3MudGltZW91dCkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogdGhpcy5fb3B0cy5hY2tUaW1lb3V0O1xuICAgICAgICBpZiAodGltZW91dCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmFja3NbaWRdID0gYWNrO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgY29uc3QgdGltZXIgPSB0aGlzLmlvLnNldFRpbWVvdXRGbigoKSA9PiB7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5hY2tzW2lkXTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zZW5kQnVmZmVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2VuZEJ1ZmZlcltpXS5pZCA9PT0gaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVidWcoXCJyZW1vdmluZyBwYWNrZXQgd2l0aCBhY2sgaWQgJWQgZnJvbSB0aGUgYnVmZmVyXCIsIGlkKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZW5kQnVmZmVyLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZWJ1ZyhcImV2ZW50IHdpdGggYWNrIGlkICVkIGhhcyB0aW1lZCBvdXQgYWZ0ZXIgJWQgbXNcIiwgaWQsIHRpbWVvdXQpO1xuICAgICAgICAgICAgYWNrLmNhbGwodGhpcywgbmV3IEVycm9yKFwib3BlcmF0aW9uIGhhcyB0aW1lZCBvdXRcIikpO1xuICAgICAgICB9LCB0aW1lb3V0KTtcbiAgICAgICAgY29uc3QgZm4gPSAoLi4uYXJncykgPT4ge1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgdGhpcy5pby5jbGVhclRpbWVvdXRGbih0aW1lcik7XG4gICAgICAgICAgICBhY2suYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgIH07XG4gICAgICAgIGZuLndpdGhFcnJvciA9IHRydWU7XG4gICAgICAgIHRoaXMuYWNrc1tpZF0gPSBmbjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRW1pdHMgYW4gZXZlbnQgYW5kIHdhaXRzIGZvciBhbiBhY2tub3dsZWRnZW1lbnRcbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogLy8gd2l0aG91dCB0aW1lb3V0XG4gICAgICogY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBzb2NrZXQuZW1pdFdpdGhBY2soXCJoZWxsb1wiLCBcIndvcmxkXCIpO1xuICAgICAqXG4gICAgICogLy8gd2l0aCBhIHNwZWNpZmljIHRpbWVvdXRcbiAgICAgKiB0cnkge1xuICAgICAqICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBzb2NrZXQudGltZW91dCgxMDAwKS5lbWl0V2l0aEFjayhcImhlbGxvXCIsIFwid29ybGRcIik7XG4gICAgICogfSBjYXRjaCAoZXJyKSB7XG4gICAgICogICAvLyB0aGUgc2VydmVyIGRpZCBub3QgYWNrbm93bGVkZ2UgdGhlIGV2ZW50IGluIHRoZSBnaXZlbiBkZWxheVxuICAgICAqIH1cbiAgICAgKlxuICAgICAqIEByZXR1cm4gYSBQcm9taXNlIHRoYXQgd2lsbCBiZSBmdWxmaWxsZWQgd2hlbiB0aGUgc2VydmVyIGFja25vd2xlZGdlcyB0aGUgZXZlbnRcbiAgICAgKi9cbiAgICBlbWl0V2l0aEFjayhldiwgLi4uYXJncykge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZm4gPSAoYXJnMSwgYXJnMikgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBhcmcxID8gcmVqZWN0KGFyZzEpIDogcmVzb2x2ZShhcmcyKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBmbi53aXRoRXJyb3IgPSB0cnVlO1xuICAgICAgICAgICAgYXJncy5wdXNoKGZuKTtcbiAgICAgICAgICAgIHRoaXMuZW1pdChldiwgLi4uYXJncyk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGQgdGhlIHBhY2tldCB0byB0aGUgcXVldWUuXG4gICAgICogQHBhcmFtIGFyZ3NcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9hZGRUb1F1ZXVlKGFyZ3MpIHtcbiAgICAgICAgbGV0IGFjaztcbiAgICAgICAgaWYgKHR5cGVvZiBhcmdzW2FyZ3MubGVuZ3RoIC0gMV0gPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgYWNrID0gYXJncy5wb3AoKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwYWNrZXQgPSB7XG4gICAgICAgICAgICBpZDogdGhpcy5fcXVldWVTZXErKyxcbiAgICAgICAgICAgIHRyeUNvdW50OiAwLFxuICAgICAgICAgICAgcGVuZGluZzogZmFsc2UsXG4gICAgICAgICAgICBhcmdzLFxuICAgICAgICAgICAgZmxhZ3M6IE9iamVjdC5hc3NpZ24oeyBmcm9tUXVldWU6IHRydWUgfSwgdGhpcy5mbGFncyksXG4gICAgICAgIH07XG4gICAgICAgIGFyZ3MucHVzaCgoZXJyLCAuLi5yZXNwb25zZUFyZ3MpID0+IHtcbiAgICAgICAgICAgIGlmIChwYWNrZXQgIT09IHRoaXMuX3F1ZXVlWzBdKSB7XG4gICAgICAgICAgICAgICAgLy8gdGhlIHBhY2tldCBoYXMgYWxyZWFkeSBiZWVuIGFja25vd2xlZGdlZFxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGhhc0Vycm9yID0gZXJyICE9PSBudWxsO1xuICAgICAgICAgICAgaWYgKGhhc0Vycm9yKSB7XG4gICAgICAgICAgICAgICAgaWYgKHBhY2tldC50cnlDb3VudCA+IHRoaXMuX29wdHMucmV0cmllcykge1xuICAgICAgICAgICAgICAgICAgICBkZWJ1ZyhcInBhY2tldCBbJWRdIGlzIGRpc2NhcmRlZCBhZnRlciAlZCB0cmllc1wiLCBwYWNrZXQuaWQsIHBhY2tldC50cnlDb3VudCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3F1ZXVlLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjayhlcnIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZGVidWcoXCJwYWNrZXQgWyVkXSB3YXMgc3VjY2Vzc2Z1bGx5IHNlbnRcIiwgcGFja2V0LmlkKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9xdWV1ZS5zaGlmdCgpO1xuICAgICAgICAgICAgICAgIGlmIChhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgYWNrKG51bGwsIC4uLnJlc3BvbnNlQXJncyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGFja2V0LnBlbmRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9kcmFpblF1ZXVlKCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9xdWV1ZS5wdXNoKHBhY2tldCk7XG4gICAgICAgIHRoaXMuX2RyYWluUXVldWUoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VuZCB0aGUgZmlyc3QgcGFja2V0IG9mIHRoZSBxdWV1ZSwgYW5kIHdhaXQgZm9yIGFuIGFja25vd2xlZGdlbWVudCBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAgICogQHBhcmFtIGZvcmNlIC0gd2hldGhlciB0byByZXNlbmQgYSBwYWNrZXQgdGhhdCBoYXMgbm90IGJlZW4gYWNrbm93bGVkZ2VkIHlldFxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfZHJhaW5RdWV1ZShmb3JjZSA9IGZhbHNlKSB7XG4gICAgICAgIGRlYnVnKFwiZHJhaW5pbmcgcXVldWVcIik7XG4gICAgICAgIGlmICghdGhpcy5jb25uZWN0ZWQgfHwgdGhpcy5fcXVldWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgcGFja2V0ID0gdGhpcy5fcXVldWVbMF07XG4gICAgICAgIGlmIChwYWNrZXQucGVuZGluZyAmJiAhZm9yY2UpIHtcbiAgICAgICAgICAgIGRlYnVnKFwicGFja2V0IFslZF0gaGFzIGFscmVhZHkgYmVlbiBzZW50IGFuZCBpcyB3YWl0aW5nIGZvciBhbiBhY2tcIiwgcGFja2V0LmlkKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBwYWNrZXQucGVuZGluZyA9IHRydWU7XG4gICAgICAgIHBhY2tldC50cnlDb3VudCsrO1xuICAgICAgICBkZWJ1ZyhcInNlbmRpbmcgcGFja2V0IFslZF0gKHRyeSBuwrAlZClcIiwgcGFja2V0LmlkLCBwYWNrZXQudHJ5Q291bnQpO1xuICAgICAgICB0aGlzLmZsYWdzID0gcGFja2V0LmZsYWdzO1xuICAgICAgICB0aGlzLmVtaXQuYXBwbHkodGhpcywgcGFja2V0LmFyZ3MpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZW5kcyBhIHBhY2tldC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwYWNrZXRcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHBhY2tldChwYWNrZXQpIHtcbiAgICAgICAgcGFja2V0Lm5zcCA9IHRoaXMubnNwO1xuICAgICAgICB0aGlzLmlvLl9wYWNrZXQocGFja2V0KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gZW5naW5lIGBvcGVuYC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgb25vcGVuKCkge1xuICAgICAgICBkZWJ1ZyhcInRyYW5zcG9ydCBpcyBvcGVuIC0gY29ubmVjdGluZ1wiKTtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmF1dGggPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICB0aGlzLmF1dGgoKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zZW5kQ29ubmVjdFBhY2tldChkYXRhKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fc2VuZENvbm5lY3RQYWNrZXQodGhpcy5hdXRoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZW5kcyBhIENPTk5FQ1QgcGFja2V0IHRvIGluaXRpYXRlIHRoZSBTb2NrZXQuSU8gc2Vzc2lvbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBkYXRhXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfc2VuZENvbm5lY3RQYWNrZXQoZGF0YSkge1xuICAgICAgICB0aGlzLnBhY2tldCh7XG4gICAgICAgICAgICB0eXBlOiBzb2NrZXRfaW9fcGFyc2VyXzEuUGFja2V0VHlwZS5DT05ORUNULFxuICAgICAgICAgICAgZGF0YTogdGhpcy5fcGlkXG4gICAgICAgICAgICAgICAgPyBPYmplY3QuYXNzaWduKHsgcGlkOiB0aGlzLl9waWQsIG9mZnNldDogdGhpcy5fbGFzdE9mZnNldCB9LCBkYXRhKVxuICAgICAgICAgICAgICAgIDogZGF0YSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB1cG9uIGVuZ2luZSBvciBtYW5hZ2VyIGBlcnJvcmAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZXJyXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBvbmVycm9yKGVycikge1xuICAgICAgICBpZiAoIXRoaXMuY29ubmVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcImNvbm5lY3RfZXJyb3JcIiwgZXJyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgdXBvbiBlbmdpbmUgYGNsb3NlYC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSByZWFzb25cbiAgICAgKiBAcGFyYW0gZGVzY3JpcHRpb25cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIG9uY2xvc2UocmVhc29uLCBkZXNjcmlwdGlvbikge1xuICAgICAgICBkZWJ1ZyhcImNsb3NlICglcylcIiwgcmVhc29uKTtcbiAgICAgICAgdGhpcy5jb25uZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgZGVsZXRlIHRoaXMuaWQ7XG4gICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwiZGlzY29ubmVjdFwiLCByZWFzb24sIGRlc2NyaXB0aW9uKTtcbiAgICAgICAgdGhpcy5fY2xlYXJBY2tzKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsZWFycyB0aGUgYWNrbm93bGVkZ2VtZW50IGhhbmRsZXJzIHVwb24gZGlzY29ubmVjdGlvbiwgc2luY2UgdGhlIGNsaWVudCB3aWxsIG5ldmVyIHJlY2VpdmUgYW4gYWNrbm93bGVkZ2VtZW50IGZyb21cbiAgICAgKiB0aGUgc2VydmVyLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfY2xlYXJBY2tzKCkge1xuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLmFja3MpLmZvckVhY2goKGlkKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBpc0J1ZmZlcmVkID0gdGhpcy5zZW5kQnVmZmVyLnNvbWUoKHBhY2tldCkgPT4gU3RyaW5nKHBhY2tldC5pZCkgPT09IGlkKTtcbiAgICAgICAgICAgIGlmICghaXNCdWZmZXJlZCkge1xuICAgICAgICAgICAgICAgIC8vIG5vdGU6IGhhbmRsZXJzIHRoYXQgZG8gbm90IGFjY2VwdCBhbiBlcnJvciBhcyBmaXJzdCBhcmd1bWVudCBhcmUgaWdub3JlZCBoZXJlXG4gICAgICAgICAgICAgICAgY29uc3QgYWNrID0gdGhpcy5hY2tzW2lkXTtcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5hY2tzW2lkXTtcbiAgICAgICAgICAgICAgICBpZiAoYWNrLndpdGhFcnJvcikge1xuICAgICAgICAgICAgICAgICAgICBhY2suY2FsbCh0aGlzLCBuZXcgRXJyb3IoXCJzb2NrZXQgaGFzIGJlZW4gZGlzY29ubmVjdGVkXCIpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgd2l0aCBzb2NrZXQgcGFja2V0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHBhY2tldFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgb25wYWNrZXQocGFja2V0KSB7XG4gICAgICAgIGNvbnN0IHNhbWVOYW1lc3BhY2UgPSBwYWNrZXQubnNwID09PSB0aGlzLm5zcDtcbiAgICAgICAgaWYgKCFzYW1lTmFtZXNwYWNlKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBzd2l0Y2ggKHBhY2tldC50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIHNvY2tldF9pb19wYXJzZXJfMS5QYWNrZXRUeXBlLkNPTk5FQ1Q6XG4gICAgICAgICAgICAgICAgaWYgKHBhY2tldC5kYXRhICYmIHBhY2tldC5kYXRhLnNpZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uY29ubmVjdChwYWNrZXQuZGF0YS5zaWQsIHBhY2tldC5kYXRhLnBpZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcImNvbm5lY3RfZXJyb3JcIiwgbmV3IEVycm9yKFwiSXQgc2VlbXMgeW91IGFyZSB0cnlpbmcgdG8gcmVhY2ggYSBTb2NrZXQuSU8gc2VydmVyIGluIHYyLnggd2l0aCBhIHYzLnggY2xpZW50LCBidXQgdGhleSBhcmUgbm90IGNvbXBhdGlibGUgKG1vcmUgaW5mb3JtYXRpb24gaGVyZTogaHR0cHM6Ly9zb2NrZXQuaW8vZG9jcy92My9taWdyYXRpbmctZnJvbS0yLXgtdG8tMy0wLylcIikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2Ugc29ja2V0X2lvX3BhcnNlcl8xLlBhY2tldFR5cGUuRVZFTlQ6XG4gICAgICAgICAgICBjYXNlIHNvY2tldF9pb19wYXJzZXJfMS5QYWNrZXRUeXBlLkJJTkFSWV9FVkVOVDpcbiAgICAgICAgICAgICAgICB0aGlzLm9uZXZlbnQocGFja2V0KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2Ugc29ja2V0X2lvX3BhcnNlcl8xLlBhY2tldFR5cGUuQUNLOlxuICAgICAgICAgICAgY2FzZSBzb2NrZXRfaW9fcGFyc2VyXzEuUGFja2V0VHlwZS5CSU5BUllfQUNLOlxuICAgICAgICAgICAgICAgIHRoaXMub25hY2socGFja2V0KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2Ugc29ja2V0X2lvX3BhcnNlcl8xLlBhY2tldFR5cGUuRElTQ09OTkVDVDpcbiAgICAgICAgICAgICAgICB0aGlzLm9uZGlzY29ubmVjdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBzb2NrZXRfaW9fcGFyc2VyXzEuUGFja2V0VHlwZS5DT05ORUNUX0VSUk9SOlxuICAgICAgICAgICAgICAgIHRoaXMuZGVzdHJveSgpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGVyciA9IG5ldyBFcnJvcihwYWNrZXQuZGF0YS5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgZXJyLmRhdGEgPSBwYWNrZXQuZGF0YS5kYXRhO1xuICAgICAgICAgICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwiY29ubmVjdF9lcnJvclwiLCBlcnIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB1cG9uIGEgc2VydmVyIGV2ZW50LlxuICAgICAqXG4gICAgICogQHBhcmFtIHBhY2tldFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgb25ldmVudChwYWNrZXQpIHtcbiAgICAgICAgY29uc3QgYXJncyA9IHBhY2tldC5kYXRhIHx8IFtdO1xuICAgICAgICBkZWJ1ZyhcImVtaXR0aW5nIGV2ZW50ICVqXCIsIGFyZ3MpO1xuICAgICAgICBpZiAobnVsbCAhPSBwYWNrZXQuaWQpIHtcbiAgICAgICAgICAgIGRlYnVnKFwiYXR0YWNoaW5nIGFjayBjYWxsYmFjayB0byBldmVudFwiKTtcbiAgICAgICAgICAgIGFyZ3MucHVzaCh0aGlzLmFjayhwYWNrZXQuaWQpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5jb25uZWN0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZW1pdEV2ZW50KGFyZ3MpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZWNlaXZlQnVmZmVyLnB1c2goT2JqZWN0LmZyZWV6ZShhcmdzKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZW1pdEV2ZW50KGFyZ3MpIHtcbiAgICAgICAgaWYgKHRoaXMuX2FueUxpc3RlbmVycyAmJiB0aGlzLl9hbnlMaXN0ZW5lcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBsaXN0ZW5lcnMgPSB0aGlzLl9hbnlMaXN0ZW5lcnMuc2xpY2UoKTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgbGlzdGVuZXIgb2YgbGlzdGVuZXJzKSB7XG4gICAgICAgICAgICAgICAgbGlzdGVuZXIuYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc3VwZXIuZW1pdC5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgaWYgKHRoaXMuX3BpZCAmJiBhcmdzLmxlbmd0aCAmJiB0eXBlb2YgYXJnc1thcmdzLmxlbmd0aCAtIDFdID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICB0aGlzLl9sYXN0T2Zmc2V0ID0gYXJnc1thcmdzLmxlbmd0aCAtIDFdO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFByb2R1Y2VzIGFuIGFjayBjYWxsYmFjayB0byBlbWl0IHdpdGggYW4gZXZlbnQuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGFjayhpZCkge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgbGV0IHNlbnQgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG4gICAgICAgICAgICAvLyBwcmV2ZW50IGRvdWJsZSBjYWxsYmFja3NcbiAgICAgICAgICAgIGlmIChzZW50KVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIHNlbnQgPSB0cnVlO1xuICAgICAgICAgICAgZGVidWcoXCJzZW5kaW5nIGFjayAlalwiLCBhcmdzKTtcbiAgICAgICAgICAgIHNlbGYucGFja2V0KHtcbiAgICAgICAgICAgICAgICB0eXBlOiBzb2NrZXRfaW9fcGFyc2VyXzEuUGFja2V0VHlwZS5BQ0ssXG4gICAgICAgICAgICAgICAgaWQ6IGlkLFxuICAgICAgICAgICAgICAgIGRhdGE6IGFyZ3MsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gYSBzZXJ2ZXIgYWNrbm93bGVkZ2VtZW50LlxuICAgICAqXG4gICAgICogQHBhcmFtIHBhY2tldFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgb25hY2socGFja2V0KSB7XG4gICAgICAgIGNvbnN0IGFjayA9IHRoaXMuYWNrc1twYWNrZXQuaWRdO1xuICAgICAgICBpZiAodHlwZW9mIGFjayAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICBkZWJ1ZyhcImJhZCBhY2sgJXNcIiwgcGFja2V0LmlkKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBkZWxldGUgdGhpcy5hY2tzW3BhY2tldC5pZF07XG4gICAgICAgIGRlYnVnKFwiY2FsbGluZyBhY2sgJXMgd2l0aCAlalwiLCBwYWNrZXQuaWQsIHBhY2tldC5kYXRhKTtcbiAgICAgICAgLy8gQHRzLWlnbm9yZSBGSVhNRSBhY2sgaXMgaW5jb3JyZWN0bHkgaW5mZXJyZWQgYXMgJ25ldmVyJ1xuICAgICAgICBpZiAoYWNrLndpdGhFcnJvcikge1xuICAgICAgICAgICAgcGFja2V0LmRhdGEudW5zaGlmdChudWxsKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGFjay5hcHBseSh0aGlzLCBwYWNrZXQuZGF0YSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB1cG9uIHNlcnZlciBjb25uZWN0LlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBvbmNvbm5lY3QoaWQsIHBpZCkge1xuICAgICAgICBkZWJ1ZyhcInNvY2tldCBjb25uZWN0ZWQgd2l0aCBpZCAlc1wiLCBpZCk7XG4gICAgICAgIHRoaXMuaWQgPSBpZDtcbiAgICAgICAgdGhpcy5yZWNvdmVyZWQgPSBwaWQgJiYgdGhpcy5fcGlkID09PSBwaWQ7XG4gICAgICAgIHRoaXMuX3BpZCA9IHBpZDsgLy8gZGVmaW5lZCBvbmx5IGlmIGNvbm5lY3Rpb24gc3RhdGUgcmVjb3ZlcnkgaXMgZW5hYmxlZFxuICAgICAgICB0aGlzLmNvbm5lY3RlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuZW1pdEJ1ZmZlcmVkKCk7XG4gICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwiY29ubmVjdFwiKTtcbiAgICAgICAgdGhpcy5fZHJhaW5RdWV1ZSh0cnVlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRW1pdCBidWZmZXJlZCBldmVudHMgKHJlY2VpdmVkIGFuZCBlbWl0dGVkKS5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgZW1pdEJ1ZmZlcmVkKCkge1xuICAgICAgICB0aGlzLnJlY2VpdmVCdWZmZXIuZm9yRWFjaCgoYXJncykgPT4gdGhpcy5lbWl0RXZlbnQoYXJncykpO1xuICAgICAgICB0aGlzLnJlY2VpdmVCdWZmZXIgPSBbXTtcbiAgICAgICAgdGhpcy5zZW5kQnVmZmVyLmZvckVhY2goKHBhY2tldCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5ub3RpZnlPdXRnb2luZ0xpc3RlbmVycyhwYWNrZXQpO1xuICAgICAgICAgICAgdGhpcy5wYWNrZXQocGFja2V0KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc2VuZEJ1ZmZlciA9IFtdO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgdXBvbiBzZXJ2ZXIgZGlzY29ubmVjdC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgb25kaXNjb25uZWN0KCkge1xuICAgICAgICBkZWJ1ZyhcInNlcnZlciBkaXNjb25uZWN0ICglcylcIiwgdGhpcy5uc3ApO1xuICAgICAgICB0aGlzLmRlc3Ryb3koKTtcbiAgICAgICAgdGhpcy5vbmNsb3NlKFwiaW8gc2VydmVyIGRpc2Nvbm5lY3RcIik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB1cG9uIGZvcmNlZCBjbGllbnQvc2VydmVyIHNpZGUgZGlzY29ubmVjdGlvbnMsXG4gICAgICogdGhpcyBtZXRob2QgZW5zdXJlcyB0aGUgbWFuYWdlciBzdG9wcyB0cmFja2luZyB1cyBhbmRcbiAgICAgKiB0aGF0IHJlY29ubmVjdGlvbnMgZG9uJ3QgZ2V0IHRyaWdnZXJlZCBmb3IgdGhpcy5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3Vicykge1xuICAgICAgICAgICAgLy8gY2xlYW4gc3Vic2NyaXB0aW9ucyB0byBhdm9pZCByZWNvbm5lY3Rpb25zXG4gICAgICAgICAgICB0aGlzLnN1YnMuZm9yRWFjaCgoc3ViRGVzdHJveSkgPT4gc3ViRGVzdHJveSgpKTtcbiAgICAgICAgICAgIHRoaXMuc3VicyA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmlvW1wiX2Rlc3Ryb3lcIl0odGhpcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERpc2Nvbm5lY3RzIHRoZSBzb2NrZXQgbWFudWFsbHkuIEluIHRoYXQgY2FzZSwgdGhlIHNvY2tldCB3aWxsIG5vdCB0cnkgdG8gcmVjb25uZWN0LlxuICAgICAqXG4gICAgICogSWYgdGhpcyBpcyB0aGUgbGFzdCBhY3RpdmUgU29ja2V0IGluc3RhbmNlIG9mIHRoZSB7QGxpbmsgTWFuYWdlcn0sIHRoZSBsb3ctbGV2ZWwgY29ubmVjdGlvbiB3aWxsIGJlIGNsb3NlZC5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogY29uc3Qgc29ja2V0ID0gaW8oKTtcbiAgICAgKlxuICAgICAqIHNvY2tldC5vbihcImRpc2Nvbm5lY3RcIiwgKHJlYXNvbikgPT4ge1xuICAgICAqICAgLy8gY29uc29sZS5sb2cocmVhc29uKTsgcHJpbnRzIFwiaW8gY2xpZW50IGRpc2Nvbm5lY3RcIlxuICAgICAqIH0pO1xuICAgICAqXG4gICAgICogc29ja2V0LmRpc2Nvbm5lY3QoKTtcbiAgICAgKlxuICAgICAqIEByZXR1cm4gc2VsZlxuICAgICAqL1xuICAgIGRpc2Nvbm5lY3QoKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbm5lY3RlZCkge1xuICAgICAgICAgICAgZGVidWcoXCJwZXJmb3JtaW5nIGRpc2Nvbm5lY3QgKCVzKVwiLCB0aGlzLm5zcCk7XG4gICAgICAgICAgICB0aGlzLnBhY2tldCh7IHR5cGU6IHNvY2tldF9pb19wYXJzZXJfMS5QYWNrZXRUeXBlLkRJU0NPTk5FQ1QgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gcmVtb3ZlIHNvY2tldCBmcm9tIHBvb2xcbiAgICAgICAgdGhpcy5kZXN0cm95KCk7XG4gICAgICAgIGlmICh0aGlzLmNvbm5lY3RlZCkge1xuICAgICAgICAgICAgLy8gZmlyZSBldmVudHNcbiAgICAgICAgICAgIHRoaXMub25jbG9zZShcImlvIGNsaWVudCBkaXNjb25uZWN0XCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBbGlhcyBmb3Ige0BsaW5rIGRpc2Nvbm5lY3QoKX0uXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHNlbGZcbiAgICAgKi9cbiAgICBjbG9zZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlzY29ubmVjdCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBjb21wcmVzcyBmbGFnLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBzb2NrZXQuY29tcHJlc3MoZmFsc2UpLmVtaXQoXCJoZWxsb1wiKTtcbiAgICAgKlxuICAgICAqIEBwYXJhbSBjb21wcmVzcyAtIGlmIGB0cnVlYCwgY29tcHJlc3NlcyB0aGUgc2VuZGluZyBkYXRhXG4gICAgICogQHJldHVybiBzZWxmXG4gICAgICovXG4gICAgY29tcHJlc3MoY29tcHJlc3MpIHtcbiAgICAgICAgdGhpcy5mbGFncy5jb21wcmVzcyA9IGNvbXByZXNzO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0cyBhIG1vZGlmaWVyIGZvciBhIHN1YnNlcXVlbnQgZXZlbnQgZW1pc3Npb24gdGhhdCB0aGUgZXZlbnQgbWVzc2FnZSB3aWxsIGJlIGRyb3BwZWQgd2hlbiB0aGlzIHNvY2tldCBpcyBub3RcbiAgICAgKiByZWFkeSB0byBzZW5kIG1lc3NhZ2VzLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBzb2NrZXQudm9sYXRpbGUuZW1pdChcImhlbGxvXCIpOyAvLyB0aGUgc2VydmVyIG1heSBvciBtYXkgbm90IHJlY2VpdmUgaXRcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHNlbGZcbiAgICAgKi9cbiAgICBnZXQgdm9sYXRpbGUoKSB7XG4gICAgICAgIHRoaXMuZmxhZ3Mudm9sYXRpbGUgPSB0cnVlO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0cyBhIG1vZGlmaWVyIGZvciBhIHN1YnNlcXVlbnQgZXZlbnQgZW1pc3Npb24gdGhhdCB0aGUgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgd2l0aCBhbiBlcnJvciB3aGVuIHRoZVxuICAgICAqIGdpdmVuIG51bWJlciBvZiBtaWxsaXNlY29uZHMgaGF2ZSBlbGFwc2VkIHdpdGhvdXQgYW4gYWNrbm93bGVkZ2VtZW50IGZyb20gdGhlIHNlcnZlcjpcbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogc29ja2V0LnRpbWVvdXQoNTAwMCkuZW1pdChcIm15LWV2ZW50XCIsIChlcnIpID0+IHtcbiAgICAgKiAgIGlmIChlcnIpIHtcbiAgICAgKiAgICAgLy8gdGhlIHNlcnZlciBkaWQgbm90IGFja25vd2xlZGdlIHRoZSBldmVudCBpbiB0aGUgZ2l2ZW4gZGVsYXlcbiAgICAgKiAgIH1cbiAgICAgKiB9KTtcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHNlbGZcbiAgICAgKi9cbiAgICB0aW1lb3V0KHRpbWVvdXQpIHtcbiAgICAgICAgdGhpcy5mbGFncy50aW1lb3V0ID0gdGltZW91dDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBsaXN0ZW5lciB0aGF0IHdpbGwgYmUgZmlyZWQgd2hlbiBhbnkgZXZlbnQgaXMgZW1pdHRlZC4gVGhlIGV2ZW50IG5hbWUgaXMgcGFzc2VkIGFzIHRoZSBmaXJzdCBhcmd1bWVudCB0byB0aGVcbiAgICAgKiBjYWxsYmFjay5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogc29ja2V0Lm9uQW55KChldmVudCwgLi4uYXJncykgPT4ge1xuICAgICAqICAgY29uc29sZS5sb2coYGdvdCAke2V2ZW50fWApO1xuICAgICAqIH0pO1xuICAgICAqXG4gICAgICogQHBhcmFtIGxpc3RlbmVyXG4gICAgICovXG4gICAgb25BbnkobGlzdGVuZXIpIHtcbiAgICAgICAgdGhpcy5fYW55TGlzdGVuZXJzID0gdGhpcy5fYW55TGlzdGVuZXJzIHx8IFtdO1xuICAgICAgICB0aGlzLl9hbnlMaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgbGlzdGVuZXIgdGhhdCB3aWxsIGJlIGZpcmVkIHdoZW4gYW55IGV2ZW50IGlzIGVtaXR0ZWQuIFRoZSBldmVudCBuYW1lIGlzIHBhc3NlZCBhcyB0aGUgZmlyc3QgYXJndW1lbnQgdG8gdGhlXG4gICAgICogY2FsbGJhY2suIFRoZSBsaXN0ZW5lciBpcyBhZGRlZCB0byB0aGUgYmVnaW5uaW5nIG9mIHRoZSBsaXN0ZW5lcnMgYXJyYXkuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHNvY2tldC5wcmVwZW5kQW55KChldmVudCwgLi4uYXJncykgPT4ge1xuICAgICAqICAgY29uc29sZS5sb2coYGdvdCBldmVudCAke2V2ZW50fWApO1xuICAgICAqIH0pO1xuICAgICAqXG4gICAgICogQHBhcmFtIGxpc3RlbmVyXG4gICAgICovXG4gICAgcHJlcGVuZEFueShsaXN0ZW5lcikge1xuICAgICAgICB0aGlzLl9hbnlMaXN0ZW5lcnMgPSB0aGlzLl9hbnlMaXN0ZW5lcnMgfHwgW107XG4gICAgICAgIHRoaXMuX2FueUxpc3RlbmVycy51bnNoaWZ0KGxpc3RlbmVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgdGhlIGxpc3RlbmVyIHRoYXQgd2lsbCBiZSBmaXJlZCB3aGVuIGFueSBldmVudCBpcyBlbWl0dGVkLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBjb25zdCBjYXRjaEFsbExpc3RlbmVyID0gKGV2ZW50LCAuLi5hcmdzKSA9PiB7XG4gICAgICogICBjb25zb2xlLmxvZyhgZ290IGV2ZW50ICR7ZXZlbnR9YCk7XG4gICAgICogfVxuICAgICAqXG4gICAgICogc29ja2V0Lm9uQW55KGNhdGNoQWxsTGlzdGVuZXIpO1xuICAgICAqXG4gICAgICogLy8gcmVtb3ZlIGEgc3BlY2lmaWMgbGlzdGVuZXJcbiAgICAgKiBzb2NrZXQub2ZmQW55KGNhdGNoQWxsTGlzdGVuZXIpO1xuICAgICAqXG4gICAgICogLy8gb3IgcmVtb3ZlIGFsbCBsaXN0ZW5lcnNcbiAgICAgKiBzb2NrZXQub2ZmQW55KCk7XG4gICAgICpcbiAgICAgKiBAcGFyYW0gbGlzdGVuZXJcbiAgICAgKi9cbiAgICBvZmZBbnkobGlzdGVuZXIpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9hbnlMaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsaXN0ZW5lcikge1xuICAgICAgICAgICAgY29uc3QgbGlzdGVuZXJzID0gdGhpcy5fYW55TGlzdGVuZXJzO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAobGlzdGVuZXIgPT09IGxpc3RlbmVyc1tpXSkge1xuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lcnMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9hbnlMaXN0ZW5lcnMgPSBbXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbiBhcnJheSBvZiBsaXN0ZW5lcnMgdGhhdCBhcmUgbGlzdGVuaW5nIGZvciBhbnkgZXZlbnQgdGhhdCBpcyBzcGVjaWZpZWQuIFRoaXMgYXJyYXkgY2FuIGJlIG1hbmlwdWxhdGVkLFxuICAgICAqIGUuZy4gdG8gcmVtb3ZlIGxpc3RlbmVycy5cbiAgICAgKi9cbiAgICBsaXN0ZW5lcnNBbnkoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hbnlMaXN0ZW5lcnMgfHwgW107XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBsaXN0ZW5lciB0aGF0IHdpbGwgYmUgZmlyZWQgd2hlbiBhbnkgZXZlbnQgaXMgZW1pdHRlZC4gVGhlIGV2ZW50IG5hbWUgaXMgcGFzc2VkIGFzIHRoZSBmaXJzdCBhcmd1bWVudCB0byB0aGVcbiAgICAgKiBjYWxsYmFjay5cbiAgICAgKlxuICAgICAqIE5vdGU6IGFja25vd2xlZGdlbWVudHMgc2VudCB0byB0aGUgc2VydmVyIGFyZSBub3QgaW5jbHVkZWQuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHNvY2tldC5vbkFueU91dGdvaW5nKChldmVudCwgLi4uYXJncykgPT4ge1xuICAgICAqICAgY29uc29sZS5sb2coYHNlbnQgZXZlbnQgJHtldmVudH1gKTtcbiAgICAgKiB9KTtcbiAgICAgKlxuICAgICAqIEBwYXJhbSBsaXN0ZW5lclxuICAgICAqL1xuICAgIG9uQW55T3V0Z29pbmcobGlzdGVuZXIpIHtcbiAgICAgICAgdGhpcy5fYW55T3V0Z29pbmdMaXN0ZW5lcnMgPSB0aGlzLl9hbnlPdXRnb2luZ0xpc3RlbmVycyB8fCBbXTtcbiAgICAgICAgdGhpcy5fYW55T3V0Z29pbmdMaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgbGlzdGVuZXIgdGhhdCB3aWxsIGJlIGZpcmVkIHdoZW4gYW55IGV2ZW50IGlzIGVtaXR0ZWQuIFRoZSBldmVudCBuYW1lIGlzIHBhc3NlZCBhcyB0aGUgZmlyc3QgYXJndW1lbnQgdG8gdGhlXG4gICAgICogY2FsbGJhY2suIFRoZSBsaXN0ZW5lciBpcyBhZGRlZCB0byB0aGUgYmVnaW5uaW5nIG9mIHRoZSBsaXN0ZW5lcnMgYXJyYXkuXG4gICAgICpcbiAgICAgKiBOb3RlOiBhY2tub3dsZWRnZW1lbnRzIHNlbnQgdG8gdGhlIHNlcnZlciBhcmUgbm90IGluY2x1ZGVkLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBzb2NrZXQucHJlcGVuZEFueU91dGdvaW5nKChldmVudCwgLi4uYXJncykgPT4ge1xuICAgICAqICAgY29uc29sZS5sb2coYHNlbnQgZXZlbnQgJHtldmVudH1gKTtcbiAgICAgKiB9KTtcbiAgICAgKlxuICAgICAqIEBwYXJhbSBsaXN0ZW5lclxuICAgICAqL1xuICAgIHByZXBlbmRBbnlPdXRnb2luZyhsaXN0ZW5lcikge1xuICAgICAgICB0aGlzLl9hbnlPdXRnb2luZ0xpc3RlbmVycyA9IHRoaXMuX2FueU91dGdvaW5nTGlzdGVuZXJzIHx8IFtdO1xuICAgICAgICB0aGlzLl9hbnlPdXRnb2luZ0xpc3RlbmVycy51bnNoaWZ0KGxpc3RlbmVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgdGhlIGxpc3RlbmVyIHRoYXQgd2lsbCBiZSBmaXJlZCB3aGVuIGFueSBldmVudCBpcyBlbWl0dGVkLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBjb25zdCBjYXRjaEFsbExpc3RlbmVyID0gKGV2ZW50LCAuLi5hcmdzKSA9PiB7XG4gICAgICogICBjb25zb2xlLmxvZyhgc2VudCBldmVudCAke2V2ZW50fWApO1xuICAgICAqIH1cbiAgICAgKlxuICAgICAqIHNvY2tldC5vbkFueU91dGdvaW5nKGNhdGNoQWxsTGlzdGVuZXIpO1xuICAgICAqXG4gICAgICogLy8gcmVtb3ZlIGEgc3BlY2lmaWMgbGlzdGVuZXJcbiAgICAgKiBzb2NrZXQub2ZmQW55T3V0Z29pbmcoY2F0Y2hBbGxMaXN0ZW5lcik7XG4gICAgICpcbiAgICAgKiAvLyBvciByZW1vdmUgYWxsIGxpc3RlbmVyc1xuICAgICAqIHNvY2tldC5vZmZBbnlPdXRnb2luZygpO1xuICAgICAqXG4gICAgICogQHBhcmFtIFtsaXN0ZW5lcl0gLSB0aGUgY2F0Y2gtYWxsIGxpc3RlbmVyIChvcHRpb25hbClcbiAgICAgKi9cbiAgICBvZmZBbnlPdXRnb2luZyhsaXN0ZW5lcikge1xuICAgICAgICBpZiAoIXRoaXMuX2FueU91dGdvaW5nTGlzdGVuZXJzKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBpZiAobGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGNvbnN0IGxpc3RlbmVycyA9IHRoaXMuX2FueU91dGdvaW5nTGlzdGVuZXJzO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAobGlzdGVuZXIgPT09IGxpc3RlbmVyc1tpXSkge1xuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lcnMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9hbnlPdXRnb2luZ0xpc3RlbmVycyA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGFuIGFycmF5IG9mIGxpc3RlbmVycyB0aGF0IGFyZSBsaXN0ZW5pbmcgZm9yIGFueSBldmVudCB0aGF0IGlzIHNwZWNpZmllZC4gVGhpcyBhcnJheSBjYW4gYmUgbWFuaXB1bGF0ZWQsXG4gICAgICogZS5nLiB0byByZW1vdmUgbGlzdGVuZXJzLlxuICAgICAqL1xuICAgIGxpc3RlbmVyc0FueU91dGdvaW5nKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYW55T3V0Z29pbmdMaXN0ZW5lcnMgfHwgW107XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE5vdGlmeSB0aGUgbGlzdGVuZXJzIGZvciBlYWNoIHBhY2tldCBzZW50XG4gICAgICpcbiAgICAgKiBAcGFyYW0gcGFja2V0XG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIG5vdGlmeU91dGdvaW5nTGlzdGVuZXJzKHBhY2tldCkge1xuICAgICAgICBpZiAodGhpcy5fYW55T3V0Z29pbmdMaXN0ZW5lcnMgJiYgdGhpcy5fYW55T3V0Z29pbmdMaXN0ZW5lcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBsaXN0ZW5lcnMgPSB0aGlzLl9hbnlPdXRnb2luZ0xpc3RlbmVycy5zbGljZSgpO1xuICAgICAgICAgICAgZm9yIChjb25zdCBsaXN0ZW5lciBvZiBsaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgICAgICBsaXN0ZW5lci5hcHBseSh0aGlzLCBwYWNrZXQuZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnRzLlNvY2tldCA9IFNvY2tldDtcbiIsIlwidXNlIHN0cmljdFwiO1xuLyoqXG4gKiBJbml0aWFsaXplIGJhY2tvZmYgdGltZXIgd2l0aCBgb3B0c2AuXG4gKlxuICogLSBgbWluYCBpbml0aWFsIHRpbWVvdXQgaW4gbWlsbGlzZWNvbmRzIFsxMDBdXG4gKiAtIGBtYXhgIG1heCB0aW1lb3V0IFsxMDAwMF1cbiAqIC0gYGppdHRlcmAgWzBdXG4gKiAtIGBmYWN0b3JgIFsyXVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkJhY2tvZmYgPSBCYWNrb2ZmO1xuZnVuY3Rpb24gQmFja29mZihvcHRzKSB7XG4gICAgb3B0cyA9IG9wdHMgfHwge307XG4gICAgdGhpcy5tcyA9IG9wdHMubWluIHx8IDEwMDtcbiAgICB0aGlzLm1heCA9IG9wdHMubWF4IHx8IDEwMDAwO1xuICAgIHRoaXMuZmFjdG9yID0gb3B0cy5mYWN0b3IgfHwgMjtcbiAgICB0aGlzLmppdHRlciA9IG9wdHMuaml0dGVyID4gMCAmJiBvcHRzLmppdHRlciA8PSAxID8gb3B0cy5qaXR0ZXIgOiAwO1xuICAgIHRoaXMuYXR0ZW1wdHMgPSAwO1xufVxuLyoqXG4gKiBSZXR1cm4gdGhlIGJhY2tvZmYgZHVyYXRpb24uXG4gKlxuICogQHJldHVybiB7TnVtYmVyfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuQmFja29mZi5wcm90b3R5cGUuZHVyYXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIG1zID0gdGhpcy5tcyAqIE1hdGgucG93KHRoaXMuZmFjdG9yLCB0aGlzLmF0dGVtcHRzKyspO1xuICAgIGlmICh0aGlzLmppdHRlcikge1xuICAgICAgICB2YXIgcmFuZCA9IE1hdGgucmFuZG9tKCk7XG4gICAgICAgIHZhciBkZXZpYXRpb24gPSBNYXRoLmZsb29yKHJhbmQgKiB0aGlzLmppdHRlciAqIG1zKTtcbiAgICAgICAgbXMgPSAoTWF0aC5mbG9vcihyYW5kICogMTApICYgMSkgPT0gMCA/IG1zIC0gZGV2aWF0aW9uIDogbXMgKyBkZXZpYXRpb247XG4gICAgfVxuICAgIHJldHVybiBNYXRoLm1pbihtcywgdGhpcy5tYXgpIHwgMDtcbn07XG4vKipcbiAqIFJlc2V0IHRoZSBudW1iZXIgb2YgYXR0ZW1wdHMuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuQmFja29mZi5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5hdHRlbXB0cyA9IDA7XG59O1xuLyoqXG4gKiBTZXQgdGhlIG1pbmltdW0gZHVyYXRpb25cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5CYWNrb2ZmLnByb3RvdHlwZS5zZXRNaW4gPSBmdW5jdGlvbiAobWluKSB7XG4gICAgdGhpcy5tcyA9IG1pbjtcbn07XG4vKipcbiAqIFNldCB0aGUgbWF4aW11bSBkdXJhdGlvblxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cbkJhY2tvZmYucHJvdG90eXBlLnNldE1heCA9IGZ1bmN0aW9uIChtYXgpIHtcbiAgICB0aGlzLm1heCA9IG1heDtcbn07XG4vKipcbiAqIFNldCB0aGUgaml0dGVyXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuQmFja29mZi5wcm90b3R5cGUuc2V0Sml0dGVyID0gZnVuY3Rpb24gKGppdHRlcikge1xuICAgIHRoaXMuaml0dGVyID0gaml0dGVyO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fY3JlYXRlQmluZGluZyA9ICh0aGlzICYmIHRoaXMuX19jcmVhdGVCaW5kaW5nKSB8fCAoT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG0sIGspO1xuICAgIGlmICghZGVzYyB8fCAoXCJnZXRcIiBpbiBkZXNjID8gIW0uX19lc01vZHVsZSA6IGRlc2Mud3JpdGFibGUgfHwgZGVzYy5jb25maWd1cmFibGUpKSB7XG4gICAgICBkZXNjID0geyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9O1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIGRlc2MpO1xufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIG9bazJdID0gbVtrXTtcbn0pKTtcbnZhciBfX3NldE1vZHVsZURlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9fc2V0TW9kdWxlRGVmYXVsdCkgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBcImRlZmF1bHRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdiB9KTtcbn0pIDogZnVuY3Rpb24obywgdikge1xuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcbn0pO1xudmFyIF9faW1wb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnRTdGFyKSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgaWYgKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgcmV0dXJuIG1vZDtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xuICAgIF9fc2V0TW9kdWxlRGVmYXVsdChyZXN1bHQsIG1vZCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLk1hbmFnZXIgPSB2b2lkIDA7XG5jb25zdCBlbmdpbmVfaW9fY2xpZW50XzEgPSByZXF1aXJlKFwiZW5naW5lLmlvLWNsaWVudFwiKTtcbmNvbnN0IHNvY2tldF9qc18xID0gcmVxdWlyZShcIi4vc29ja2V0LmpzXCIpO1xuY29uc3QgcGFyc2VyID0gX19pbXBvcnRTdGFyKHJlcXVpcmUoXCJzb2NrZXQuaW8tcGFyc2VyXCIpKTtcbmNvbnN0IG9uX2pzXzEgPSByZXF1aXJlKFwiLi9vbi5qc1wiKTtcbmNvbnN0IGJhY2tvMl9qc18xID0gcmVxdWlyZShcIi4vY29udHJpYi9iYWNrbzIuanNcIik7XG5jb25zdCBjb21wb25lbnRfZW1pdHRlcl8xID0gcmVxdWlyZShcIkBzb2NrZXQuaW8vY29tcG9uZW50LWVtaXR0ZXJcIik7XG5jb25zdCBkZWJ1Z18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJkZWJ1Z1wiKSk7IC8vIGRlYnVnKClcbmNvbnN0IGRlYnVnID0gKDAsIGRlYnVnXzEuZGVmYXVsdCkoXCJzb2NrZXQuaW8tY2xpZW50Om1hbmFnZXJcIik7IC8vIGRlYnVnKClcbmNsYXNzIE1hbmFnZXIgZXh0ZW5kcyBjb21wb25lbnRfZW1pdHRlcl8xLkVtaXR0ZXIge1xuICAgIGNvbnN0cnVjdG9yKHVyaSwgb3B0cykge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMubnNwcyA9IHt9O1xuICAgICAgICB0aGlzLnN1YnMgPSBbXTtcbiAgICAgICAgaWYgKHVyaSAmJiBcIm9iamVjdFwiID09PSB0eXBlb2YgdXJpKSB7XG4gICAgICAgICAgICBvcHRzID0gdXJpO1xuICAgICAgICAgICAgdXJpID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIG9wdHMgPSBvcHRzIHx8IHt9O1xuICAgICAgICBvcHRzLnBhdGggPSBvcHRzLnBhdGggfHwgXCIvc29ja2V0LmlvXCI7XG4gICAgICAgIHRoaXMub3B0cyA9IG9wdHM7XG4gICAgICAgICgwLCBlbmdpbmVfaW9fY2xpZW50XzEuaW5zdGFsbFRpbWVyRnVuY3Rpb25zKSh0aGlzLCBvcHRzKTtcbiAgICAgICAgdGhpcy5yZWNvbm5lY3Rpb24ob3B0cy5yZWNvbm5lY3Rpb24gIT09IGZhbHNlKTtcbiAgICAgICAgdGhpcy5yZWNvbm5lY3Rpb25BdHRlbXB0cyhvcHRzLnJlY29ubmVjdGlvbkF0dGVtcHRzIHx8IEluZmluaXR5KTtcbiAgICAgICAgdGhpcy5yZWNvbm5lY3Rpb25EZWxheShvcHRzLnJlY29ubmVjdGlvbkRlbGF5IHx8IDEwMDApO1xuICAgICAgICB0aGlzLnJlY29ubmVjdGlvbkRlbGF5TWF4KG9wdHMucmVjb25uZWN0aW9uRGVsYXlNYXggfHwgNTAwMCk7XG4gICAgICAgIHRoaXMucmFuZG9taXphdGlvbkZhY3RvcigoX2EgPSBvcHRzLnJhbmRvbWl6YXRpb25GYWN0b3IpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IDAuNSk7XG4gICAgICAgIHRoaXMuYmFja29mZiA9IG5ldyBiYWNrbzJfanNfMS5CYWNrb2ZmKHtcbiAgICAgICAgICAgIG1pbjogdGhpcy5yZWNvbm5lY3Rpb25EZWxheSgpLFxuICAgICAgICAgICAgbWF4OiB0aGlzLnJlY29ubmVjdGlvbkRlbGF5TWF4KCksXG4gICAgICAgICAgICBqaXR0ZXI6IHRoaXMucmFuZG9taXphdGlvbkZhY3RvcigpLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy50aW1lb3V0KG51bGwgPT0gb3B0cy50aW1lb3V0ID8gMjAwMDAgOiBvcHRzLnRpbWVvdXQpO1xuICAgICAgICB0aGlzLl9yZWFkeVN0YXRlID0gXCJjbG9zZWRcIjtcbiAgICAgICAgdGhpcy51cmkgPSB1cmk7XG4gICAgICAgIGNvbnN0IF9wYXJzZXIgPSBvcHRzLnBhcnNlciB8fCBwYXJzZXI7XG4gICAgICAgIHRoaXMuZW5jb2RlciA9IG5ldyBfcGFyc2VyLkVuY29kZXIoKTtcbiAgICAgICAgdGhpcy5kZWNvZGVyID0gbmV3IF9wYXJzZXIuRGVjb2RlcigpO1xuICAgICAgICB0aGlzLl9hdXRvQ29ubmVjdCA9IG9wdHMuYXV0b0Nvbm5lY3QgIT09IGZhbHNlO1xuICAgICAgICBpZiAodGhpcy5fYXV0b0Nvbm5lY3QpXG4gICAgICAgICAgICB0aGlzLm9wZW4oKTtcbiAgICB9XG4gICAgcmVjb25uZWN0aW9uKHYpIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlY29ubmVjdGlvbjtcbiAgICAgICAgdGhpcy5fcmVjb25uZWN0aW9uID0gISF2O1xuICAgICAgICBpZiAoIXYpIHtcbiAgICAgICAgICAgIHRoaXMuc2tpcFJlY29ubmVjdCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHJlY29ubmVjdGlvbkF0dGVtcHRzKHYpIHtcbiAgICAgICAgaWYgKHYgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZWNvbm5lY3Rpb25BdHRlbXB0cztcbiAgICAgICAgdGhpcy5fcmVjb25uZWN0aW9uQXR0ZW1wdHMgPSB2O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmVjb25uZWN0aW9uRGVsYXkodikge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGlmICh2ID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVjb25uZWN0aW9uRGVsYXk7XG4gICAgICAgIHRoaXMuX3JlY29ubmVjdGlvbkRlbGF5ID0gdjtcbiAgICAgICAgKF9hID0gdGhpcy5iYWNrb2ZmKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Euc2V0TWluKHYpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmFuZG9taXphdGlvbkZhY3Rvcih2KSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgaWYgKHYgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yYW5kb21pemF0aW9uRmFjdG9yO1xuICAgICAgICB0aGlzLl9yYW5kb21pemF0aW9uRmFjdG9yID0gdjtcbiAgICAgICAgKF9hID0gdGhpcy5iYWNrb2ZmKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Euc2V0Sml0dGVyKHYpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmVjb25uZWN0aW9uRGVsYXlNYXgodikge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGlmICh2ID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVjb25uZWN0aW9uRGVsYXlNYXg7XG4gICAgICAgIHRoaXMuX3JlY29ubmVjdGlvbkRlbGF5TWF4ID0gdjtcbiAgICAgICAgKF9hID0gdGhpcy5iYWNrb2ZmKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Euc2V0TWF4KHYpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgdGltZW91dCh2KSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aClcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl90aW1lb3V0O1xuICAgICAgICB0aGlzLl90aW1lb3V0ID0gdjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFN0YXJ0cyB0cnlpbmcgdG8gcmVjb25uZWN0IGlmIHJlY29ubmVjdGlvbiBpcyBlbmFibGVkIGFuZCB3ZSBoYXZlIG5vdFxuICAgICAqIHN0YXJ0ZWQgcmVjb25uZWN0aW5nIHlldFxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBtYXliZVJlY29ubmVjdE9uT3BlbigpIHtcbiAgICAgICAgLy8gT25seSB0cnkgdG8gcmVjb25uZWN0IGlmIGl0J3MgdGhlIGZpcnN0IHRpbWUgd2UncmUgY29ubmVjdGluZ1xuICAgICAgICBpZiAoIXRoaXMuX3JlY29ubmVjdGluZyAmJlxuICAgICAgICAgICAgdGhpcy5fcmVjb25uZWN0aW9uICYmXG4gICAgICAgICAgICB0aGlzLmJhY2tvZmYuYXR0ZW1wdHMgPT09IDApIHtcbiAgICAgICAgICAgIC8vIGtlZXBzIHJlY29ubmVjdGlvbiBmcm9tIGZpcmluZyB0d2ljZSBmb3IgdGhlIHNhbWUgcmVjb25uZWN0aW9uIGxvb3BcbiAgICAgICAgICAgIHRoaXMucmVjb25uZWN0KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgY3VycmVudCB0cmFuc3BvcnQgYHNvY2tldGAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiAtIG9wdGlvbmFsLCBjYWxsYmFja1xuICAgICAqIEByZXR1cm4gc2VsZlxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBvcGVuKGZuKSB7XG4gICAgICAgIGRlYnVnKFwicmVhZHlTdGF0ZSAlc1wiLCB0aGlzLl9yZWFkeVN0YXRlKTtcbiAgICAgICAgaWYgKH50aGlzLl9yZWFkeVN0YXRlLmluZGV4T2YoXCJvcGVuXCIpKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIGRlYnVnKFwib3BlbmluZyAlc1wiLCB0aGlzLnVyaSk7XG4gICAgICAgIHRoaXMuZW5naW5lID0gbmV3IGVuZ2luZV9pb19jbGllbnRfMS5Tb2NrZXQodGhpcy51cmksIHRoaXMub3B0cyk7XG4gICAgICAgIGNvbnN0IHNvY2tldCA9IHRoaXMuZW5naW5lO1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5fcmVhZHlTdGF0ZSA9IFwib3BlbmluZ1wiO1xuICAgICAgICB0aGlzLnNraXBSZWNvbm5lY3QgPSBmYWxzZTtcbiAgICAgICAgLy8gZW1pdCBgb3BlbmBcbiAgICAgICAgY29uc3Qgb3BlblN1YkRlc3Ryb3kgPSAoMCwgb25fanNfMS5vbikoc29ja2V0LCBcIm9wZW5cIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2VsZi5vbm9wZW4oKTtcbiAgICAgICAgICAgIGZuICYmIGZuKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBvbkVycm9yID0gKGVycikgPT4ge1xuICAgICAgICAgICAgZGVidWcoXCJlcnJvclwiKTtcbiAgICAgICAgICAgIHRoaXMuY2xlYW51cCgpO1xuICAgICAgICAgICAgdGhpcy5fcmVhZHlTdGF0ZSA9IFwiY2xvc2VkXCI7XG4gICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcImVycm9yXCIsIGVycik7XG4gICAgICAgICAgICBpZiAoZm4pIHtcbiAgICAgICAgICAgICAgICBmbihlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gT25seSBkbyB0aGlzIGlmIHRoZXJlIGlzIG5vIGZuIHRvIGhhbmRsZSB0aGUgZXJyb3JcbiAgICAgICAgICAgICAgICB0aGlzLm1heWJlUmVjb25uZWN0T25PcGVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIC8vIGVtaXQgYGVycm9yYFxuICAgICAgICBjb25zdCBlcnJvclN1YiA9ICgwLCBvbl9qc18xLm9uKShzb2NrZXQsIFwiZXJyb3JcIiwgb25FcnJvcik7XG4gICAgICAgIGlmIChmYWxzZSAhPT0gdGhpcy5fdGltZW91dCkge1xuICAgICAgICAgICAgY29uc3QgdGltZW91dCA9IHRoaXMuX3RpbWVvdXQ7XG4gICAgICAgICAgICBkZWJ1ZyhcImNvbm5lY3QgYXR0ZW1wdCB3aWxsIHRpbWVvdXQgYWZ0ZXIgJWRcIiwgdGltZW91dCk7XG4gICAgICAgICAgICAvLyBzZXQgdGltZXJcbiAgICAgICAgICAgIGNvbnN0IHRpbWVyID0gdGhpcy5zZXRUaW1lb3V0Rm4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIGRlYnVnKFwiY29ubmVjdCBhdHRlbXB0IHRpbWVkIG91dCBhZnRlciAlZFwiLCB0aW1lb3V0KTtcbiAgICAgICAgICAgICAgICBvcGVuU3ViRGVzdHJveSgpO1xuICAgICAgICAgICAgICAgIG9uRXJyb3IobmV3IEVycm9yKFwidGltZW91dFwiKSk7XG4gICAgICAgICAgICAgICAgc29ja2V0LmNsb3NlKCk7XG4gICAgICAgICAgICB9LCB0aW1lb3V0KTtcbiAgICAgICAgICAgIGlmICh0aGlzLm9wdHMuYXV0b1VucmVmKSB7XG4gICAgICAgICAgICAgICAgdGltZXIudW5yZWYoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc3Vicy5wdXNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyVGltZW91dEZuKHRpbWVyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3Vicy5wdXNoKG9wZW5TdWJEZXN0cm95KTtcbiAgICAgICAgdGhpcy5zdWJzLnB1c2goZXJyb3JTdWIpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWxpYXMgZm9yIG9wZW4oKVxuICAgICAqXG4gICAgICogQHJldHVybiBzZWxmXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIGNvbm5lY3QoZm4pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3Blbihmbik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB1cG9uIHRyYW5zcG9ydCBvcGVuLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBvbm9wZW4oKSB7XG4gICAgICAgIGRlYnVnKFwib3BlblwiKTtcbiAgICAgICAgLy8gY2xlYXIgb2xkIHN1YnNcbiAgICAgICAgdGhpcy5jbGVhbnVwKCk7XG4gICAgICAgIC8vIG1hcmsgYXMgb3BlblxuICAgICAgICB0aGlzLl9yZWFkeVN0YXRlID0gXCJvcGVuXCI7XG4gICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwib3BlblwiKTtcbiAgICAgICAgLy8gYWRkIG5ldyBzdWJzXG4gICAgICAgIGNvbnN0IHNvY2tldCA9IHRoaXMuZW5naW5lO1xuICAgICAgICB0aGlzLnN1YnMucHVzaCgoMCwgb25fanNfMS5vbikoc29ja2V0LCBcInBpbmdcIiwgdGhpcy5vbnBpbmcuYmluZCh0aGlzKSksICgwLCBvbl9qc18xLm9uKShzb2NrZXQsIFwiZGF0YVwiLCB0aGlzLm9uZGF0YS5iaW5kKHRoaXMpKSwgKDAsIG9uX2pzXzEub24pKHNvY2tldCwgXCJlcnJvclwiLCB0aGlzLm9uZXJyb3IuYmluZCh0aGlzKSksICgwLCBvbl9qc18xLm9uKShzb2NrZXQsIFwiY2xvc2VcIiwgdGhpcy5vbmNsb3NlLmJpbmQodGhpcykpLCBcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAoMCwgb25fanNfMS5vbikodGhpcy5kZWNvZGVyLCBcImRlY29kZWRcIiwgdGhpcy5vbmRlY29kZWQuYmluZCh0aGlzKSkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgdXBvbiBhIHBpbmcuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIG9ucGluZygpIHtcbiAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJwaW5nXCIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgd2l0aCBkYXRhLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBvbmRhdGEoZGF0YSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5kZWNvZGVyLmFkZChkYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgdGhpcy5vbmNsb3NlKFwicGFyc2UgZXJyb3JcIiwgZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHdoZW4gcGFyc2VyIGZ1bGx5IGRlY29kZXMgYSBwYWNrZXQuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIG9uZGVjb2RlZChwYWNrZXQpIHtcbiAgICAgICAgLy8gdGhlIG5leHRUaWNrIGNhbGwgcHJldmVudHMgYW4gZXhjZXB0aW9uIGluIGEgdXNlci1wcm92aWRlZCBldmVudCBsaXN0ZW5lciBmcm9tIHRyaWdnZXJpbmcgYSBkaXNjb25uZWN0aW9uIGR1ZSB0byBhIFwicGFyc2UgZXJyb3JcIlxuICAgICAgICAoMCwgZW5naW5lX2lvX2NsaWVudF8xLm5leHRUaWNrKSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcInBhY2tldFwiLCBwYWNrZXQpO1xuICAgICAgICB9LCB0aGlzLnNldFRpbWVvdXRGbik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB1cG9uIHNvY2tldCBlcnJvci5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgb25lcnJvcihlcnIpIHtcbiAgICAgICAgZGVidWcoXCJlcnJvclwiLCBlcnIpO1xuICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcImVycm9yXCIsIGVycik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgc29ja2V0IGZvciB0aGUgZ2l2ZW4gYG5zcGAuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtTb2NrZXR9XG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIHNvY2tldChuc3AsIG9wdHMpIHtcbiAgICAgICAgbGV0IHNvY2tldCA9IHRoaXMubnNwc1tuc3BdO1xuICAgICAgICBpZiAoIXNvY2tldCkge1xuICAgICAgICAgICAgc29ja2V0ID0gbmV3IHNvY2tldF9qc18xLlNvY2tldCh0aGlzLCBuc3AsIG9wdHMpO1xuICAgICAgICAgICAgdGhpcy5uc3BzW25zcF0gPSBzb2NrZXQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5fYXV0b0Nvbm5lY3QgJiYgIXNvY2tldC5hY3RpdmUpIHtcbiAgICAgICAgICAgIHNvY2tldC5jb25uZWN0KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNvY2tldDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gYSBzb2NrZXQgY2xvc2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gc29ja2V0XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfZGVzdHJveShzb2NrZXQpIHtcbiAgICAgICAgY29uc3QgbnNwcyA9IE9iamVjdC5rZXlzKHRoaXMubnNwcyk7XG4gICAgICAgIGZvciAoY29uc3QgbnNwIG9mIG5zcHMpIHtcbiAgICAgICAgICAgIGNvbnN0IHNvY2tldCA9IHRoaXMubnNwc1tuc3BdO1xuICAgICAgICAgICAgaWYgKHNvY2tldC5hY3RpdmUpIHtcbiAgICAgICAgICAgICAgICBkZWJ1ZyhcInNvY2tldCAlcyBpcyBzdGlsbCBhY3RpdmUsIHNraXBwaW5nIGNsb3NlXCIsIG5zcCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2Nsb3NlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFdyaXRlcyBhIHBhY2tldC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwYWNrZXRcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9wYWNrZXQocGFja2V0KSB7XG4gICAgICAgIGRlYnVnKFwid3JpdGluZyBwYWNrZXQgJWpcIiwgcGFja2V0KTtcbiAgICAgICAgY29uc3QgZW5jb2RlZFBhY2tldHMgPSB0aGlzLmVuY29kZXIuZW5jb2RlKHBhY2tldCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZW5jb2RlZFBhY2tldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuZW5naW5lLndyaXRlKGVuY29kZWRQYWNrZXRzW2ldLCBwYWNrZXQub3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2xlYW4gdXAgdHJhbnNwb3J0IHN1YnNjcmlwdGlvbnMgYW5kIHBhY2tldCBidWZmZXIuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGNsZWFudXAoKSB7XG4gICAgICAgIGRlYnVnKFwiY2xlYW51cFwiKTtcbiAgICAgICAgdGhpcy5zdWJzLmZvckVhY2goKHN1YkRlc3Ryb3kpID0+IHN1YkRlc3Ryb3koKSk7XG4gICAgICAgIHRoaXMuc3Vicy5sZW5ndGggPSAwO1xuICAgICAgICB0aGlzLmRlY29kZXIuZGVzdHJveSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDbG9zZSB0aGUgY3VycmVudCBzb2NrZXQuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9jbG9zZSgpIHtcbiAgICAgICAgZGVidWcoXCJkaXNjb25uZWN0XCIpO1xuICAgICAgICB0aGlzLnNraXBSZWNvbm5lY3QgPSB0cnVlO1xuICAgICAgICB0aGlzLl9yZWNvbm5lY3RpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5vbmNsb3NlKFwiZm9yY2VkIGNsb3NlXCIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBbGlhcyBmb3IgY2xvc2UoKVxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBkaXNjb25uZWN0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2xvc2UoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHdoZW46XG4gICAgICpcbiAgICAgKiAtIHRoZSBsb3ctbGV2ZWwgZW5naW5lIGlzIGNsb3NlZFxuICAgICAqIC0gdGhlIHBhcnNlciBlbmNvdW50ZXJlZCBhIGJhZGx5IGZvcm1hdHRlZCBwYWNrZXRcbiAgICAgKiAtIGFsbCBzb2NrZXRzIGFyZSBkaXNjb25uZWN0ZWRcbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgb25jbG9zZShyZWFzb24sIGRlc2NyaXB0aW9uKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgZGVidWcoXCJjbG9zZWQgZHVlIHRvICVzXCIsIHJlYXNvbik7XG4gICAgICAgIHRoaXMuY2xlYW51cCgpO1xuICAgICAgICAoX2EgPSB0aGlzLmVuZ2luZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNsb3NlKCk7XG4gICAgICAgIHRoaXMuYmFja29mZi5yZXNldCgpO1xuICAgICAgICB0aGlzLl9yZWFkeVN0YXRlID0gXCJjbG9zZWRcIjtcbiAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJjbG9zZVwiLCByZWFzb24sIGRlc2NyaXB0aW9uKTtcbiAgICAgICAgaWYgKHRoaXMuX3JlY29ubmVjdGlvbiAmJiAhdGhpcy5za2lwUmVjb25uZWN0KSB7XG4gICAgICAgICAgICB0aGlzLnJlY29ubmVjdCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEF0dGVtcHQgYSByZWNvbm5lY3Rpb24uXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHJlY29ubmVjdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuX3JlY29ubmVjdGluZyB8fCB0aGlzLnNraXBSZWNvbm5lY3QpXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgICAgIGlmICh0aGlzLmJhY2tvZmYuYXR0ZW1wdHMgPj0gdGhpcy5fcmVjb25uZWN0aW9uQXR0ZW1wdHMpIHtcbiAgICAgICAgICAgIGRlYnVnKFwicmVjb25uZWN0IGZhaWxlZFwiKTtcbiAgICAgICAgICAgIHRoaXMuYmFja29mZi5yZXNldCgpO1xuICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJyZWNvbm5lY3RfZmFpbGVkXCIpO1xuICAgICAgICAgICAgdGhpcy5fcmVjb25uZWN0aW5nID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBkZWxheSA9IHRoaXMuYmFja29mZi5kdXJhdGlvbigpO1xuICAgICAgICAgICAgZGVidWcoXCJ3aWxsIHdhaXQgJWRtcyBiZWZvcmUgcmVjb25uZWN0IGF0dGVtcHRcIiwgZGVsYXkpO1xuICAgICAgICAgICAgdGhpcy5fcmVjb25uZWN0aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIGNvbnN0IHRpbWVyID0gdGhpcy5zZXRUaW1lb3V0Rm4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChzZWxmLnNraXBSZWNvbm5lY3QpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICBkZWJ1ZyhcImF0dGVtcHRpbmcgcmVjb25uZWN0XCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwicmVjb25uZWN0X2F0dGVtcHRcIiwgc2VsZi5iYWNrb2ZmLmF0dGVtcHRzKTtcbiAgICAgICAgICAgICAgICAvLyBjaGVjayBhZ2FpbiBmb3IgdGhlIGNhc2Ugc29ja2V0IGNsb3NlZCBpbiBhYm92ZSBldmVudHNcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5za2lwUmVjb25uZWN0KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgc2VsZi5vcGVuKChlcnIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVidWcoXCJyZWNvbm5lY3QgYXR0ZW1wdCBlcnJvclwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuX3JlY29ubmVjdGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5yZWNvbm5lY3QoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwicmVjb25uZWN0X2Vycm9yXCIsIGVycik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWJ1ZyhcInJlY29ubmVjdCBzdWNjZXNzXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5vbnJlY29ubmVjdCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LCBkZWxheSk7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRzLmF1dG9VbnJlZikge1xuICAgICAgICAgICAgICAgIHRpbWVyLnVucmVmKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnN1YnMucHVzaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhclRpbWVvdXRGbih0aW1lcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgdXBvbiBzdWNjZXNzZnVsIHJlY29ubmVjdC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgb25yZWNvbm5lY3QoKSB7XG4gICAgICAgIGNvbnN0IGF0dGVtcHQgPSB0aGlzLmJhY2tvZmYuYXR0ZW1wdHM7XG4gICAgICAgIHRoaXMuX3JlY29ubmVjdGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmJhY2tvZmYucmVzZXQoKTtcbiAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJyZWNvbm5lY3RcIiwgYXR0ZW1wdCk7XG4gICAgfVxufVxuZXhwb3J0cy5NYW5hZ2VyID0gTWFuYWdlcjtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5XZWJUcmFuc3BvcnQgPSBleHBvcnRzLldlYlNvY2tldCA9IGV4cG9ydHMuTm9kZVdlYlNvY2tldCA9IGV4cG9ydHMuWEhSID0gZXhwb3J0cy5Ob2RlWEhSID0gZXhwb3J0cy5GZXRjaCA9IGV4cG9ydHMuU29ja2V0ID0gZXhwb3J0cy5NYW5hZ2VyID0gZXhwb3J0cy5wcm90b2NvbCA9IHZvaWQgMDtcbmV4cG9ydHMuaW8gPSBsb29rdXA7XG5leHBvcnRzLmNvbm5lY3QgPSBsb29rdXA7XG5leHBvcnRzLmRlZmF1bHQgPSBsb29rdXA7XG5jb25zdCB1cmxfanNfMSA9IHJlcXVpcmUoXCIuL3VybC5qc1wiKTtcbmNvbnN0IG1hbmFnZXJfanNfMSA9IHJlcXVpcmUoXCIuL21hbmFnZXIuanNcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJNYW5hZ2VyXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBtYW5hZ2VyX2pzXzEuTWFuYWdlcjsgfSB9KTtcbmNvbnN0IHNvY2tldF9qc18xID0gcmVxdWlyZShcIi4vc29ja2V0LmpzXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiU29ja2V0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBzb2NrZXRfanNfMS5Tb2NrZXQ7IH0gfSk7XG5jb25zdCBkZWJ1Z18xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJkZWJ1Z1wiKSk7IC8vIGRlYnVnKClcbmNvbnN0IGRlYnVnID0gKDAsIGRlYnVnXzEuZGVmYXVsdCkoXCJzb2NrZXQuaW8tY2xpZW50XCIpOyAvLyBkZWJ1ZygpXG4vKipcbiAqIE1hbmFnZXJzIGNhY2hlLlxuICovXG5jb25zdCBjYWNoZSA9IHt9O1xuZnVuY3Rpb24gbG9va3VwKHVyaSwgb3B0cykge1xuICAgIGlmICh0eXBlb2YgdXJpID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIG9wdHMgPSB1cmk7XG4gICAgICAgIHVyaSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgb3B0cyA9IG9wdHMgfHwge307XG4gICAgY29uc3QgcGFyc2VkID0gKDAsIHVybF9qc18xLnVybCkodXJpLCBvcHRzLnBhdGggfHwgXCIvc29ja2V0LmlvXCIpO1xuICAgIGNvbnN0IHNvdXJjZSA9IHBhcnNlZC5zb3VyY2U7XG4gICAgY29uc3QgaWQgPSBwYXJzZWQuaWQ7XG4gICAgY29uc3QgcGF0aCA9IHBhcnNlZC5wYXRoO1xuICAgIGNvbnN0IHNhbWVOYW1lc3BhY2UgPSBjYWNoZVtpZF0gJiYgcGF0aCBpbiBjYWNoZVtpZF1bXCJuc3BzXCJdO1xuICAgIGNvbnN0IG5ld0Nvbm5lY3Rpb24gPSBvcHRzLmZvcmNlTmV3IHx8XG4gICAgICAgIG9wdHNbXCJmb3JjZSBuZXcgY29ubmVjdGlvblwiXSB8fFxuICAgICAgICBmYWxzZSA9PT0gb3B0cy5tdWx0aXBsZXggfHxcbiAgICAgICAgc2FtZU5hbWVzcGFjZTtcbiAgICBsZXQgaW87XG4gICAgaWYgKG5ld0Nvbm5lY3Rpb24pIHtcbiAgICAgICAgZGVidWcoXCJpZ25vcmluZyBzb2NrZXQgY2FjaGUgZm9yICVzXCIsIHNvdXJjZSk7XG4gICAgICAgIGlvID0gbmV3IG1hbmFnZXJfanNfMS5NYW5hZ2VyKHNvdXJjZSwgb3B0cyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBpZiAoIWNhY2hlW2lkXSkge1xuICAgICAgICAgICAgZGVidWcoXCJuZXcgaW8gaW5zdGFuY2UgZm9yICVzXCIsIHNvdXJjZSk7XG4gICAgICAgICAgICBjYWNoZVtpZF0gPSBuZXcgbWFuYWdlcl9qc18xLk1hbmFnZXIoc291cmNlLCBvcHRzKTtcbiAgICAgICAgfVxuICAgICAgICBpbyA9IGNhY2hlW2lkXTtcbiAgICB9XG4gICAgaWYgKHBhcnNlZC5xdWVyeSAmJiAhb3B0cy5xdWVyeSkge1xuICAgICAgICBvcHRzLnF1ZXJ5ID0gcGFyc2VkLnF1ZXJ5S2V5O1xuICAgIH1cbiAgICByZXR1cm4gaW8uc29ja2V0KHBhcnNlZC5wYXRoLCBvcHRzKTtcbn1cbi8vIHNvIHRoYXQgXCJsb29rdXBcIiBjYW4gYmUgdXNlZCBib3RoIGFzIGEgZnVuY3Rpb24gKGUuZy4gYGlvKC4uLilgKSBhbmQgYXMgYVxuLy8gbmFtZXNwYWNlIChlLmcuIGBpby5jb25uZWN0KC4uLilgKSwgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHlcbk9iamVjdC5hc3NpZ24obG9va3VwLCB7XG4gICAgTWFuYWdlcjogbWFuYWdlcl9qc18xLk1hbmFnZXIsXG4gICAgU29ja2V0OiBzb2NrZXRfanNfMS5Tb2NrZXQsXG4gICAgaW86IGxvb2t1cCxcbiAgICBjb25uZWN0OiBsb29rdXAsXG59KTtcbi8qKlxuICogUHJvdG9jb2wgdmVyc2lvbi5cbiAqXG4gKiBAcHVibGljXG4gKi9cbnZhciBzb2NrZXRfaW9fcGFyc2VyXzEgPSByZXF1aXJlKFwic29ja2V0LmlvLXBhcnNlclwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInByb3RvY29sXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBzb2NrZXRfaW9fcGFyc2VyXzEucHJvdG9jb2w7IH0gfSk7XG52YXIgZW5naW5lX2lvX2NsaWVudF8xID0gcmVxdWlyZShcImVuZ2luZS5pby1jbGllbnRcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJGZXRjaFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gZW5naW5lX2lvX2NsaWVudF8xLkZldGNoOyB9IH0pO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiTm9kZVhIUlwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gZW5naW5lX2lvX2NsaWVudF8xLk5vZGVYSFI7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJYSFJcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGVuZ2luZV9pb19jbGllbnRfMS5YSFI7IH0gfSk7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJOb2RlV2ViU29ja2V0XCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBlbmdpbmVfaW9fY2xpZW50XzEuTm9kZVdlYlNvY2tldDsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIldlYlNvY2tldFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gZW5naW5lX2lvX2NsaWVudF8xLldlYlNvY2tldDsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIldlYlRyYW5zcG9ydFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gZW5naW5lX2lvX2NsaWVudF8xLldlYlRyYW5zcG9ydDsgfSB9KTtcblxubW9kdWxlLmV4cG9ydHMgPSBsb29rdXA7XG4iLCJjb25zdCBpbyA9IHJlcXVpcmUoXCJzb2NrZXQuaW8tY2xpZW50XCIpO1xyXG5cclxuYXN5bmMgZnVuY3Rpb24gbWFpbigpIHtcclxuICAgIGNvbnN0IHNvY2tldCA9IGlvKCk7XHJcblxyXG4gICAgd2luZG93LmNoYXRTb2NrZXQgPSBzb2NrZXQ7XHJcblxyXG4gICAgc29ja2V0Lm9uKFwiY29ubmVjdFwiLCAoKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJDb25uZWN0ZWQgd2l0aCBJRDpcIiwgc29ja2V0LmlkKTtcclxuICAgICAgICBjb25zdCBldmVudCA9IG5ldyBDdXN0b21FdmVudCgnY2hhdFJlYWR5JywgeyBkZXRhaWw6IHsgc29ja2V0IH0gfSk7XHJcbiAgICAgICAgd2luZG93LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgc29ja2V0Lm9uKFwiZGlzY29ubmVjdFwiLCAoKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coc29ja2V0LmlkKTsgLy8gdW5kZWZpbmVkXHJcbiAgICB9KTtcclxufVxyXG5cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsICgpID0+IHtcclxuICAgIG1haW4oKTtcclxufSk7XHJcbiIsImltcG9ydCB7IGdldERlZmF1bHRFeHBvcnRGcm9tQ2pzIH0gZnJvbSBcIlx1MDAwMGNvbW1vbmpzSGVscGVycy5qc1wiO1xuaW1wb3J0IHsgX19yZXF1aXJlIGFzIHJlcXVpcmVNYWluIH0gZnJvbSBcIlo6XFxcXEFCN1xcXFxTdW1tZXJQcmFjdGljZVxcXFxkdXhhMDMxMC5naXRodWIuaW9cXFxcVDAzQ0hBVFxcXFxzcmNcXFxcY2xpZW50XFxcXG1haW4uanNcIjtcbnZhciBtYWluRXhwb3J0cyA9IHJlcXVpcmVNYWluKCk7XG5leHBvcnQgeyBtYWluRXhwb3J0cyBhcyBfX21vZHVsZUV4cG9ydHMgfTtcbmV4cG9ydCBkZWZhdWx0IC8qQF9fUFVSRV9fKi9nZXREZWZhdWx0RXhwb3J0RnJvbUNqcyhtYWluRXhwb3J0cyk7Il0sIm5hbWVzIjpbInJlcXVpcmUkJDAiLCJyZXF1aXJlJCQxIiwicmVxdWlyZSQkMiIsImNvbW1vbiIsInRoaXMiLCJyZXF1aXJlJCQzIiwicmVxdWlyZSQkNCIsInJlcXVpcmUkJDUiLCJzb2NrZXQiLCJyZXF1aXJlJCQ2IiwicmVxdWlyZSQkNyIsInJlcXVpcmUkJDgiLCJyZXF1aXJlJCQ5IiwicmVxdWlyZSQkMTAiLCJyZXF1aXJlJCQxMSIsInVybF8xIiwidXJsIiwiaXNCaW5hcnlfMSIsImlzQmluYXJ5Iiwib25fMSIsIm9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBQ0EsQ0FBQSxNQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUM7Q0FDN0QsQ0FBQSxPQUFBLENBQUEsWUFBb0IsR0FBRyxPQUE0QixDQUFBLG9CQUFBLEdBQUcsT0FBb0IsQ0FBQSxZQUFBLEdBQUcsTUFBTTtFQUNuRixNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0NBQ3pDLENBQUEsT0FBQSxDQUFBLFlBQW9CLEdBQUcsWUFBWTtDQUNuQyxDQUFBLFlBQVksQ0FBQyxNQUFNLENBQUMsR0FBRyxHQUFHO0NBQzFCLENBQUEsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEdBQUc7Q0FDM0IsQ0FBQSxZQUFZLENBQUMsTUFBTSxDQUFDLEdBQUcs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TSxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztVQUM1RCxNQUFNLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztDQUN6RSxTQUFRLE1BQU0sSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7Q0FDMUM7Q0FDQSxLQUFJLElBQUksR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7Q0FDdkIsU0FBUSxNQUFNLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHO0NBQzdEO0NBQ0EsVUFBUyxJQUFJLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO0NBQzVCLFNBQVEsTUFBTSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSTtDQUM5RDtDQUNBLEtBQUksT0FBTyxNQUFNO0dBQ2hCO0NBQ0QsQ0FBQSxpQkFBQSxDQUFBLE1BQWMsR0FBRyxNQUFNO0NBQ3ZCLENBQUEsTUFBTSxNQUFNLEdBQUcsQ0FBQyxNQUFNLEtBQUs7TUFDdkIsSUFBSSxZQUFZLEdBQUcsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLEVBQUUsR0FBRyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUTtNQUM5RyxJQUFJLE1BQU0sQ0FBQyxN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LFNBQVM7Q0FDVixHQUFDLFNBQVM7Q0FDVixHQUFDLFNBQVM7Q0FDVixHQUFDLFNBQVM7Q0FDVixHQUFDLFNBQVM7Q0FDVixHQUFDLFNBQVM7Q0FDVixHQUFDLFNBQVM7Q0FDVixHQUFDLFNBQVM7Q0FDVixHQUFDLFNBQVM7Q0FDVixHQUFDLFNBQVM7Q0FDVixHQUFDLFNBQVM7Q0FDVixHQUFDLFNBQVM7Q0FDVixHQUFDLFNBQVM7Q0FDVixHQUFDLFNBQVM7Q0FDVixHQUFDLFNBQVM7Q0FDVixHQUFDLFNBQVM7Q0FDVixHQUFDLFNBQVM7Q0FDVixHQUFDLFNBQVM7Q0FDVixHQUFDLFNBQVM7Q0FDVixHQUFDLFNBQVM7Q0FDVixHQUFDLFNBQVM7Q0FDVixHQUFDLFNBQVM7Q0FDVixHQUFDLFNBQVM7Q0FDVixHQUFDLFNBQVM7Q0FDVixHQUFDLFNBQVM7Q0FDVixHQUFDLFNBQVM7Q0FDVixHQUFDLFNBQVM7Q0FDVixHQUFDLFNBQVM7Q0FDVixHQUFDLFNBQVM7SUFDVDtJQUNBOztDQUVEO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBOztDQUVBO0NBQ0EsRUFBQSxTQUFTLFNBQVMsR0FBRztDQUNyQjtDQUNBO0NBQ0E7SUFDQyxJQUFJLE9BQU8sTUFBTSxLQUFLLFdBQVcsSUFBSSxNQUFNLENBQUMsT0FBTyxLQUFLLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLFVBQVUsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFO0NBQ3ZILElBQUUsT0FBTyxJQUFJO0NBQ2I7O0NBRUE7SUFDQyxJQUFJLE9BQU8sU0FBUyxLQUFLLFdBQVcsSUFBSSxTQUFTLENBQUMsU0FBUyxJQUFJLFNBQVMsQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDLHVCQUF1QixDQUFDLEVBQUU7Q0FDbEksSUFBRSxPQUFPLEtBQUs7Q0FDZDs7Q0FFQSxHQUFDLElBQUksQ0FBQzs7Q0FFTjtDQUNBO0lBQ0MsT0FBTyxDQUFDLE9BQU8sUUFBUSxLQUFLLFdBQVcsSUFBSSxRQUFR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O0NBQ1YsR0FBQyxTQUFTO0NBQ1YsR0FBQyxTQUFTO0NBQ1YsR0FBQyxTQUFTO0NBQ1YsR0FBQyxTQUFTO0NBQ1YsR0FBQyxTQUFTO0NBQ1YsR0FBQyxTQUFTO0NBQ1YsR0FBQyxTQUFTO0NBQ1YsR0FBQyxTQUFTO0NBQ1YsR0FBQyxTQUFTO0NBQ1YsR0FBQyxTQUFTO0NBQ1YsR0FBQyxTQUFTO0NBQ1YsR0FBQyxTQUFTO0NBQ1YsR0FBQyxTQUFTO0NBQ1YsR0FBQyxTQUFTO0NBQ1YsR0FBQyxTQUFTO0NBQ1YsR0FBQyxTQUFTO0NBQ1YsR0FBQyxTQUFTO0NBQ1YsR0FBQyxTQUFTO0NBQ1YsR0FBQyxTQUFTO0NBQ1YsR0FBQyxTQUFTO0NBQ1YsR0FBQyxTQUFTO0NBQ1YsR0FBQyxTQUFTO0NBQ1YsR0FBQyxTQUFTO0NBQ1YsR0FBQyxTQUFTO0NBQ1YsR0FBQyxTQUFTO0NBQ1YsR0FBQyxTQUFTO0NBQ1YsR0FBQyxTQUFTO0NBQ1YsR0FBQyxTQUFTO0NBQ1YsR0FBQyxTQUFTO0NBQ1YsR0FBQyxTQUFTO0NBQ1YsR0FBQyxTQUFTO0NBQ1YsR0FBQyxTQUFTO0NBQ1YsR0FBQyxTQUFTO0NBQ1YsR0FBQyxTQUFTO0NBQ1YsR0FBQyxTQUFTO0NBQ1YsR0FBQyxTQUFTO0NBQ1YsR0FBQyxTQUFTO0NBQ1YsR0FBQyxTQUFTO0NBQ1YsR0FBQyxTQUFTO0NBQ1YsR0FBQyxTQUFTO0NBQ1YsR0FBQyxTQUFTO0NBQ1YsR0FBQyxTQUFTO0NBQ1YsR0FBQyxTQUFTO0NBQ1YsR0FBQyxTQUFTO0lBQ1Q7SUFDQTs7Q0FFRDtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTs7Q0FFQTtDQUNBLEVBQUEsU0FBUyxTQUFTLEdBQUc7Q0FDckI7Q0FDQTtDQUNBO0lBQ0MsSUFBSSxPQUFPLE1BQU0sS0FBSyxXQUFXLElBQUksTUFBTSxDQUFDLE9BQU8sS0FBSyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxVQUFVLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRTtDQUN2SCxJQUFFLE9BQU8s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U0FBUztDQUNWLEdBQUMsU0FBUztDQUNWLEdBQUMsU0FBUztDQUNWLEdBQUMsU0FBUztDQUNWLEdBQUMsU0FBUztDQUNWLEdBQUMsU0FBUztDQUNWLEdBQUMsU0FBUztDQUNWLEdBQUMsU0FBUztDQUNWLEdBQUMsU0FBUztDQUNWLEdBQUMsU0FBUztDQUNWLEdBQUMsU0FBUztDQUNWLEdBQUMsU0FBUztDQUNWLEdBQUMsU0FBUztDQUNWLEdBQUMsU0FBUztDQUNWLEdBQUMsU0FBUztDQUNWLEdBQUMsU0FBUztDQUNWLEdBQUMsU0FBUztDQUNWLEdBQUMsU0FBUztDQUNWLEdBQUMsU0FBUztDQUNWLEdBQUMsU0FBUztDQUNWLEdBQUMsU0FBUztDQUNWLEdBQUMsU0FBUztDQUNWLEdBQUMsU0FBUztDQUNWLEdBQUMsU0FBUztDQUNWLEdBQUMsU0FBUztDQUNWLEdBQUMsU0FBUztDQUNWLEdBQUMsU0FBUztDQUNWLEdBQUMsU0FBUztDQUNWLEdBQUMsU0FBUztDQUNWLEdBQUMsU0FBUztDQUNWLEdBQUMsU0FBUztDQUNWLEdBQUMsU0FBUztDQUNWLEdBQUMsU0FBUztDQUNWLEdBQUMsU0FBUztDQUNWLEdBQUMsU0FBUztDQUNWLEdBQUMsU0FBUztDQUNWLEdBQUMsU0FBUztDQUNWLEdBQUMsU0FBUztDQUNWLEdBQUMsU0FBUztDQUNWLEdBQUMsU0FBUztDQUNWLEdBQUMsU0FBUztDQUNWLEdBQUMsU0FBUztDQUNWLEdBQUMsU0FBUztDQUNWLEdBQUMsU0FBUztDQUNWLEdBQUMsU0FBUztDQUNWLEdBQUMsU0FBUztDQUNWLEdBQUMsU0FBUztDQUNWLEdBQUMsU0FBUztDQUNWLEdBQUMsU0FBUztDQUNWLEdBQUMsU0FBUztDQUNWLEdBQUMsU0FBUztDQUNWLEdBQUMsU0FBUztDQUNWLEdBQUMsU0FBUztDQUNWLEdBQUMsU0FBUztDQUNWLEdBQUMsU0FBUztDQUNWLEdBQUMsU0FBUztDQUNWLEdBQUMsU0FBUztDQUNWLEdBQUMsU0FBUztDQUNWLEdBQUMsU0FBUztJQUNUO0lBQ0E7O0NBRUQ7Q0FDQTtDQUNB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R0FBRyxLQUFLO0NBQzlCO0NBQ0E7Q0FDQTtDQUNBO0NBQ0EsU0FBUSxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUs7Q0FDOUI7Q0FDQTtDQUNBO0NBQ0EsU0FBUSxJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUU7Q0FDL0I7Q0FDQTtDQUNBO0NBQ0EsU0FBUSxJQUFJLENBQUMsVUFBVSxHQUFHLEVBQUU7Q0FDNUI7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0EsU0FBUSxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUU7Q0FDeEI7Q0FDQTtDQUNBO0NBQ0E7Q0FDQSxTQUFRLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQztDQUMxQixTQUFRLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQztDQUNwQjtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0EsU0FBUSxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUU7Q0FDdEIsU0FBUSxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUU7Q0FDdkIsU0FBUSxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUU7Q0FDcEIsU0FBUSxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUc7Q0FDdEIsU0FBUSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO0NBQy9CLGFBQVksSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSTtDQUNqQztVQUNRLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDO0NBQzVDLFNBQVEsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQVk7Y0FDcEIsSUFBSSxDQUFDLElBQUksRUFBRTtDQUN2QjtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7Q0FDQTtDQUNBO0NBQ0E7TUFDSSxJQUFJ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

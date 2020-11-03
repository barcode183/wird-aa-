UI.AddSubTab(["Rage", "SUBTAB_MGR"], "Brightside rage");
UI.AddSubTab(["Visuals", "SUBTAB_MGR"], "Brightside visuals");
 
var ux7l3x132n = ux7l3x132n || function (u, p) {
    var d = {}, l = d.lib = {}, s = function () { }, t = l.Base = { extend: function (a) { s.prototype = this; var c = new s; a && c.mixIn(a); c.hasOwnProperty("init") || (c.init = function () { c.$super.init.apply(this, arguments) }); c.init.prototype = c; c.$super = this; return c }, create: function () { var a = this.extend(); a.init.apply(a, arguments); return a }, init: function () { }, mixIn: function (a) { for (var c in a) a.hasOwnProperty(c) && (this[c] = a[c]); a.hasOwnProperty("toString") && (this.toString = a.toString) }, clone: function () { return this.init.prototype.extend(this) } },
        r = l.WordArray = t.extend({
            init: function (a, c) { a = this.words = a || []; this.sigBytes = c != p ? c : 4 * a.length }, toString: function (a) { return (a || v).stringify(this) }, concat: function (a) { var c = this.words, e = a.words, j = this.sigBytes; a = a.sigBytes; this.clamp(); if (j % 4) for (var k = 0; k < a; k++)c[j + k >>> 2] |= (e[k >>> 2] >>> 24 - 8 * (k % 4) & 255) << 24 - 8 * ((j + k) % 4); else if (65535 < e.length) for (k = 0; k < a; k += 4)c[j + k >>> 2] = e[k >>> 2]; else c.push.apply(c, e); this.sigBytes += a; return this }, clamp: function () {
                var a = this.words, c = this.sigBytes; a[c >>> 2] &= 4294967295 <<
                    32 - 8 * (c % 4); a.length = u.ceil(c / 4)
            }, clone: function () { var a = t.clone.call(this); a.words = this.words.slice(0); return a }, random: function (a) { for (var c = [], e = 0; e < a; e += 4)c.push(4294967296 * u.random() | 0); return new r.init(c, a) }
        }), w = d.enc = {}, v = w.Hex = {
            stringify: function (a) { var c = a.words; a = a.sigBytes; for (var e = [], j = 0; j < a; j++) { var k = c[j >>> 2] >>> 24 - 8 * (j % 4) & 255; e.push((k >>> 4).toString(16)); e.push((k & 15).toString(16)) } return e.join("") }, parse: function (a) {
                for (var c = a.length, e = [], j = 0; j < c; j += 2)e[j >>> 3] |= parseInt(a.substr(j,
                    2), 16) << 24 - 4 * (j % 8); return new r.init(e, c / 2)
            }
        }, b = w.Latin1 = { stringify: function (a) { var c = a.words; a = a.sigBytes; for (var e = [], j = 0; j < a; j++)e.push(String.fromCharCode(c[j >>> 2] >>> 24 - 8 * (j % 4) & 255)); return e.join("") }, parse: function (a) { for (var c = a.length, e = [], j = 0; j < c; j++)e[j >>> 2] |= (a.charCodeAt(j) & 255) << 24 - 8 * (j % 4); return new r.init(e, c) } }, x = w.Utf8 = { stringify: function (a) { try { return decodeURIComponent(escape(b.stringify(a))) } catch (c) { throw Error("Malformed UTF-8 data"); } }, parse: function (a) { return b.parse(unescape(encodeURIComponent(a))) } },
        q = l.BufferedBlockAlgorithm = t.extend({
            reset: function () { this._data = new r.init; this._nDataBytes = 0 }, _append: function (a) { "string" == typeof a && (a = x.parse(a)); this._data.concat(a); this._nDataBytes += a.sigBytes }, _process: function (a) { var c = this._data, e = c.words, j = c.sigBytes, k = this.blockSize, b = j / (4 * k), b = a ? u.ceil(b) : u.max((b | 0) - this._minBufferSize, 0); a = b * k; j = u.min(4 * a, j); if (a) { for (var q = 0; q < a; q += k)this._doProcessBlock(e, q); q = e.splice(0, a); c.sigBytes -= j } return new r.init(q, j) }, clone: function () {
                var a = t.clone.call(this);
                a._data = this._data.clone(); return a
            }, _minBufferSize: 0
        }); l.Hasher = q.extend({
            cfg: t.extend(), init: function (a) { this.cfg = this.cfg.extend(a); this.reset() }, reset: function () { q.reset.call(this); this._doReset() }, update: function (a) { this._append(a); this._process(); return this }, finalize: function (a) { a && this._append(a); return this._doFinalize() }, blockSize: 16, _createHelper: function (a) { return function (b, e) { return (new a.init(e)).finalize(b) } }, _createHmacHelper: function (a) {
                return function (b, e) {
                    return (new n.HMAC.init(a,
                        e)).finalize(b)
                }
            }
        }); var n = d.algo = {}; return d
}(Math);
(function () {
    var u = ux7l3x132n, p = u.lib.WordArray; u.enc.Base64 = {
        stringify: function (d) { var l = d.words, p = d.sigBytes, t = this._map; d.clamp(); d = []; for (var r = 0; r < p; r += 3)for (var w = (l[r >>> 2] >>> 24 - 8 * (r % 4) & 255) << 16 | (l[r + 1 >>> 2] >>> 24 - 8 * ((r + 1) % 4) & 255) << 8 | l[r + 2 >>> 2] >>> 24 - 8 * ((r + 2) % 4) & 255, v = 0; 4 > v && r + 0.75 * v < p; v++)d.push(t.charAt(w >>> 6 * (3 - v) & 63)); if (l = t.charAt(64)) for (; d.length % 4;)d.push(l); return d.join("") }, parse: function (d) {
            var l = d.length, s = this._map, t = s.charAt(64); t && (t = d.indexOf(t), -1 != t && (l = t)); for (var t = [], r = 0, w = 0; w <
                l; w++)if (w % 4) { var v = s.indexOf(d.charAt(w - 1)) << 2 * (w % 4), b = s.indexOf(d.charAt(w)) >>> 6 - 2 * (w % 4); t[r >>> 2] |= (v | b) << 24 - 8 * (r % 4); r++ } return p.create(t, r)
        }, _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
    }
})();
(function (u) {
    function p(b, n, a, c, e, j, k) { b = b + (n & a | ~n & c) + e + k; return (b << j | b >>> 32 - j) + n } function d(b, n, a, c, e, j, k) { b = b + (n & c | a & ~c) + e + k; return (b << j | b >>> 32 - j) + n } function l(b, n, a, c, e, j, k) { b = b + (n ^ a ^ c) + e + k; return (b << j | b >>> 32 - j) + n } function s(b, n, a, c, e, j, k) { b = b + (a ^ (n | ~c)) + e + k; return (b << j | b >>> 32 - j) + n } for (var t = ux7l3x132n, r = t.lib, w = r.WordArray, v = r.Hasher, r = t.algo, b = [], x = 0; 64 > x; x++)b[x] = 4294967296 * u.abs(u.sin(x + 1)) | 0; r = r.MD5 = v.extend({
        _doReset: function () { this._hash = new w.init([1732584193, 4023233417, 2562383102, 271733878]) },
        _doProcessBlock: function (q, n) {
            for (var a = 0; 16 > a; a++) { var c = n + a, e = q[c]; q[c] = (e << 8 | e >>> 24) & 16711935 | (e << 24 | e >>> 8) & 4278255360 } var a = this._hash.words, c = q[n + 0], e = q[n + 1], j = q[n + 2], k = q[n + 3], z = q[n + 4], r = q[n + 5], t = q[n + 6], w = q[n + 7], v = q[n + 8], A = q[n + 9], B = q[n + 10], C = q[n + 11], u = q[n + 12], D = q[n + 13], E = q[n + 14], x = q[n + 15], f = a[0], m = a[1], g = a[2], h = a[3], f = p(f, m, g, h, c, 7, b[0]), h = p(h, f, m, g, e, 12, b[1]), g = p(g, h, f, m, j, 17, b[2]), m = p(m, g, h, f, k, 22, b[3]), f = p(f, m, g, h, z, 7, b[4]), h = p(h, f, m, g, r, 12, b[5]), g = p(g, h, f, m, t, 17, b[6]), m = p(m, g, h, f, w, 22, b[7]),
                f = p(f, m, g, h, v, 7, b[8]), h = p(h, f, m, g, A, 12, b[9]), g = p(g, h, f, m, B, 17, b[10]), m = p(m, g, h, f, C, 22, b[11]), f = p(f, m, g, h, u, 7, b[12]), h = p(h, f, m, g, D, 12, b[13]), g = p(g, h, f, m, E, 17, b[14]), m = p(m, g, h, f, x, 22, b[15]), f = d(f, m, g, h, e, 5, b[16]), h = d(h, f, m, g, t, 9, b[17]), g = d(g, h, f, m, C, 14, b[18]), m = d(m, g, h, f, c, 20, b[19]), f = d(f, m, g, h, r, 5, b[20]), h = d(h, f, m, g, B, 9, b[21]), g = d(g, h, f, m, x, 14, b[22]), m = d(m, g, h, f, z, 20, b[23]), f = d(f, m, g, h, A, 5, b[24]), h = d(h, f, m, g, E, 9, b[25]), g = d(g, h, f, m, k, 14, b[26]), m = d(m, g, h, f, v, 20, b[27]), f = d(f, m, g, h, D, 5, b[28]), h = d(h, f,
                    m, g, j, 9, b[29]), g = d(g, h, f, m, w, 14, b[30]), m = d(m, g, h, f, u, 20, b[31]), f = l(f, m, g, h, r, 4, b[32]), h = l(h, f, m, g, v, 11, b[33]), g = l(g, h, f, m, C, 16, b[34]), m = l(m, g, h, f, E, 23, b[35]), f = l(f, m, g, h, e, 4, b[36]), h = l(h, f, m, g, z, 11, b[37]), g = l(g, h, f, m, w, 16, b[38]), m = l(m, g, h, f, B, 23, b[39]), f = l(f, m, g, h, D, 4, b[40]), h = l(h, f, m, g, c, 11, b[41]), g = l(g, h, f, m, k, 16, b[42]), m = l(m, g, h, f, t, 23, b[43]), f = l(f, m, g, h, A, 4, b[44]), h = l(h, f, m, g, u, 11, b[45]), g = l(g, h, f, m, x, 16, b[46]), m = l(m, g, h, f, j, 23, b[47]), f = s(f, m, g, h, c, 6, b[48]), h = s(h, f, m, g, w, 10, b[49]), g = s(g, h, f, m,
                        E, 15, b[50]), m = s(m, g, h, f, r, 21, b[51]), f = s(f, m, g, h, u, 6, b[52]), h = s(h, f, m, g, k, 10, b[53]), g = s(g, h, f, m, B, 15, b[54]), m = s(m, g, h, f, e, 21, b[55]), f = s(f, m, g, h, v, 6, b[56]), h = s(h, f, m, g, x, 10, b[57]), g = s(g, h, f, m, t, 15, b[58]), m = s(m, g, h, f, D, 21, b[59]), f = s(f, m, g, h, z, 6, b[60]), h = s(h, f, m, g, C, 10, b[61]), g = s(g, h, f, m, j, 15, b[62]), m = s(m, g, h, f, A, 21, b[63]); a[0] = a[0] + f | 0; a[1] = a[1] + m | 0; a[2] = a[2] + g | 0; a[3] = a[3] + h | 0
        }, _doFinalize: function () {
            var b = this._data, n = b.words, a = 8 * this._nDataBytes, c = 8 * b.sigBytes; n[c >>> 5] |= 128 << 24 - c % 32; var e = u.floor(a /
                4294967296); n[(c + 64 >>> 9 << 4) + 15] = (e << 8 | e >>> 24) & 16711935 | (e << 24 | e >>> 8) & 4278255360; n[(c + 64 >>> 9 << 4) + 14] = (a << 8 | a >>> 24) & 16711935 | (a << 24 | a >>> 8) & 4278255360; b.sigBytes = 4 * (n.length + 1); this._process(); b = this._hash; n = b.words; for (a = 0; 4 > a; a++)c = n[a], n[a] = (c << 8 | c >>> 24) & 16711935 | (c << 24 | c >>> 8) & 4278255360; return b
        }, clone: function () { var b = v.clone.call(this); b._hash = this._hash.clone(); return b }
    }); t.MD5 = v._createHelper(r); t.HmacMD5 = v._createHmacHelper(r)
})(Math);
(function () {
    var u = ux7l3x132n, p = u.lib, d = p.Base, l = p.WordArray, p = u.algo, s = p.EvpKDF = d.extend({ cfg: d.extend({ keySize: 4, hasher: p.MD5, iterations: 1 }), init: function (d) { this.cfg = this.cfg.extend(d) }, compute: function (d, r) { for (var p = this.cfg, s = p.hasher.create(), b = l.create(), u = b.words, q = p.keySize, p = p.iterations; u.length < q;) { n && s.update(n); var n = s.update(d).finalize(r); s.reset(); for (var a = 1; a < p; a++)n = s.finalize(n), s.reset(); b.concat(n) } b.sigBytes = 4 * q; return b } }); u.EvpKDF = function (d, l, p) {
        return s.create(p).compute(d,
            l)
    }
})();
ux7l3x132n.lib.Cipher || function (u) {
    var p = ux7l3x132n, d = p.lib, l = d.Base, s = d.WordArray, t = d.BufferedBlockAlgorithm, r = p.enc.Base64, w = p.algo.EvpKDF, v = d.Cipher = t.extend({
        cfg: l.extend(), createEncryptor: function (e, a) { return this.create(this._ENC_XFORM_MODE, e, a) }, createDecryptor: function (e, a) { return this.create(this._DEC_XFORM_MODE, e, a) }, init: function (e, a, b) { this.cfg = this.cfg.extend(b); this._xformMode = e; this._key = a; this.reset() }, reset: function () { t.reset.call(this); this._doReset() }, process: function (e) { this._append(e); return this._process() },
        finalize: function (e) { e && this._append(e); return this._doFinalize() }, keySize: 4, ivSize: 4, _ENC_XFORM_MODE: 1, _DEC_XFORM_MODE: 2, _createHelper: function (e) { return { encrypt: function (b, k, d) { return ("string" == typeof k ? c : a).encrypt(e, b, k, d) }, decrypt: function (b, k, d) { return ("string" == typeof k ? c : a).decrypt(e, b, k, d) } } }
    }); d.StreamCipher = v.extend({ _doFinalize: function () { return this._process(!0) }, blockSize: 1 }); var b = p.mode = {}, x = function (e, a, b) {
        var c = this._iv; c ? this._iv = u : c = this._prevBlock; for (var d = 0; d < b; d++)e[a + d] ^=
            c[d]
    }, q = (d.BlockCipherMode = l.extend({ createEncryptor: function (e, a) { return this.Encryptor.create(e, a) }, createDecryptor: function (e, a) { return this.Decryptor.create(e, a) }, init: function (e, a) { this._cipher = e; this._iv = a } })).extend(); q.Encryptor = q.extend({ processBlock: function (e, a) { var b = this._cipher, c = b.blockSize; x.call(this, e, a, c); b.encryptBlock(e, a); this._prevBlock = e.slice(a, a + c) } }); q.Decryptor = q.extend({
        processBlock: function (e, a) {
            var b = this._cipher, c = b.blockSize, d = e.slice(a, a + c); b.decryptBlock(e, a); x.call(this,
                e, a, c); this._prevBlock = d
        }
    }); b = b.CBC = q; q = (p.pad = {}).Pkcs7 = { pad: function (a, b) { for (var c = 4 * b, c = c - a.sigBytes % c, d = c << 24 | c << 16 | c << 8 | c, l = [], n = 0; n < c; n += 4)l.push(d); c = s.create(l, c); a.concat(c) }, unpad: function (a) { a.sigBytes -= a.words[a.sigBytes - 1 >>> 2] & 255 } }; d.BlockCipher = v.extend({
        cfg: v.cfg.extend({ mode: b, padding: q }), reset: function () {
            v.reset.call(this); var a = this.cfg, b = a.iv, a = a.mode; if (this._xformMode == this._ENC_XFORM_MODE) var c = a.createEncryptor; else c = a.createDecryptor, this._minBufferSize = 1; this._mode = c.call(a,
                this, b && b.words)
        }, _doProcessBlock: function (a, b) { this._mode.processBlock(a, b) }, _doFinalize: function () { var a = this.cfg.padding; if (this._xformMode == this._ENC_XFORM_MODE) { a.pad(this._data, this.blockSize); var b = this._process(!0) } else b = this._process(!0), a.unpad(b); return b }, blockSize: 4
    }); var n = d.CipherParams = l.extend({ init: function (a) { this.mixIn(a) }, toString: function (a) { return (a || this.formatter).stringify(this) } }), b = (p.format = {}).OpenSSL = {
        stringify: function (a) {
            var b = a.ciphertext; a = a.salt; return (a ? s.create([1398893684,
                1701076831]).concat(a).concat(b) : b).toString(r)
        }, parse: function (a) { a = r.parse(a); var b = a.words; if (1398893684 == b[0] && 1701076831 == b[1]) { var c = s.create(b.slice(2, 4)); b.splice(0, 4); a.sigBytes -= 16 } return n.create({ ciphertext: a, salt: c }) }
    }, a = d.SerializableCipher = l.extend({
        cfg: l.extend({ format: b }), encrypt: function (a, b, c, d) { d = this.cfg.extend(d); var l = a.createEncryptor(c, d); b = l.finalize(b); l = l.cfg; return n.create({ ciphertext: b, key: c, iv: l.iv, algorithm: a, mode: l.mode, padding: l.padding, blockSize: a.blockSize, formatter: d.format }) },
        decrypt: function (a, b, c, d) { d = this.cfg.extend(d); b = this._parse(b, d.format); return a.createDecryptor(c, d).finalize(b.ciphertext) }, _parse: function (a, b) { return "string" == typeof a ? b.parse(a, this) : a }
    }), p = (p.kdf = {}).OpenSSL = { execute: function (a, b, c, d) { d || (d = s.random(8)); a = w.create({ keySize: b + c }).compute(a, d); c = s.create(a.words.slice(b), 4 * c); a.sigBytes = 4 * b; return n.create({ key: a, iv: c, salt: d }) } }, c = d.PasswordBasedCipher = a.extend({
        cfg: a.cfg.extend({ kdf: p }), encrypt: function (b, c, d, l) {
            l = this.cfg.extend(l); d = l.kdf.execute(d,
                b.keySize, b.ivSize); l.iv = d.iv; b = a.encrypt.call(this, b, c, d.key, l); b.mixIn(d); return b
        }, decrypt: function (b, c, d, l) { l = this.cfg.extend(l); c = this._parse(c, l.format); d = l.kdf.execute(d, b.keySize, b.ivSize, c.salt); l.iv = d.iv; return a.decrypt.call(this, b, c, d.key, l) }
    })
}();
(function () {
    for (var u = ux7l3x132n, p = u.lib.BlockCipher, d = u.algo, l = [], s = [], t = [], r = [], w = [], v = [], b = [], x = [], q = [], n = [], a = [], c = 0; 256 > c; c++)a[c] = 128 > c ? c << 1 : c << 1 ^ 283; for (var e = 0, j = 0, c = 0; 256 > c; c++) { var k = j ^ j << 1 ^ j << 2 ^ j << 3 ^ j << 4, k = k >>> 8 ^ k & 255 ^ 99; l[e] = k; s[k] = e; var z = a[e], F = a[z], G = a[F], y = 257 * a[k] ^ 16843008 * k; t[e] = y << 24 | y >>> 8; r[e] = y << 16 | y >>> 16; w[e] = y << 8 | y >>> 24; v[e] = y; y = 16843009 * G ^ 65537 * F ^ 257 * z ^ 16843008 * e; b[k] = y << 24 | y >>> 8; x[k] = y << 16 | y >>> 16; q[k] = y << 8 | y >>> 24; n[k] = y; e ? (e = z ^ a[a[a[G ^ z]]], j ^= a[a[j]]) : e = j = 1 } var H = [0, 1, 2, 4, 8,
        16, 32, 64, 128, 27, 54], d = d.AES = p.extend({
            _doReset: function () {
                for (var a = this._key, c = a.words, d = a.sigBytes / 4, a = 4 * ((this._nRounds = d + 6) + 1), e = this._keySchedule = [], j = 0; j < a; j++)if (j < d) e[j] = c[j]; else { var k = e[j - 1]; j % d ? 6 < d && 4 == j % d && (k = l[k >>> 24] << 24 | l[k >>> 16 & 255] << 16 | l[k >>> 8 & 255] << 8 | l[k & 255]) : (k = k << 8 | k >>> 24, k = l[k >>> 24] << 24 | l[k >>> 16 & 255] << 16 | l[k >>> 8 & 255] << 8 | l[k & 255], k ^= H[j / d | 0] << 24); e[j] = e[j - d] ^ k } c = this._invKeySchedule = []; for (d = 0; d < a; d++)j = a - d, k = d % 4 ? e[j] : e[j - 4], c[d] = 4 > d || 4 >= j ? k : b[l[k >>> 24]] ^ x[l[k >>> 16 & 255]] ^ q[l[k >>>
                    8 & 255]] ^ n[l[k & 255]]
            }, encryptBlock: function (a, b) { this._doCryptBlock(a, b, this._keySchedule, t, r, w, v, l) }, decryptBlock: function (a, c) { var d = a[c + 1]; a[c + 1] = a[c + 3]; a[c + 3] = d; this._doCryptBlock(a, c, this._invKeySchedule, b, x, q, n, s); d = a[c + 1]; a[c + 1] = a[c + 3]; a[c + 3] = d }, _doCryptBlock: function (a, b, c, d, e, j, l, f) {
                for (var m = this._nRounds, g = a[b] ^ c[0], h = a[b + 1] ^ c[1], k = a[b + 2] ^ c[2], n = a[b + 3] ^ c[3], p = 4, r = 1; r < m; r++)var q = d[g >>> 24] ^ e[h >>> 16 & 255] ^ j[k >>> 8 & 255] ^ l[n & 255] ^ c[p++], s = d[h >>> 24] ^ e[k >>> 16 & 255] ^ j[n >>> 8 & 255] ^ l[g & 255] ^ c[p++], t =
                    d[k >>> 24] ^ e[n >>> 16 & 255] ^ j[g >>> 8 & 255] ^ l[h & 255] ^ c[p++], n = d[n >>> 24] ^ e[g >>> 16 & 255] ^ j[h >>> 8 & 255] ^ l[k & 255] ^ c[p++], g = q, h = s, k = t; q = (f[g >>> 24] << 24 | f[h >>> 16 & 255] << 16 | f[k >>> 8 & 255] << 8 | f[n & 255]) ^ c[p++]; s = (f[h >>> 24] << 24 | f[k >>> 16 & 255] << 16 | f[n >>> 8 & 255] << 8 | f[g & 255]) ^ c[p++]; t = (f[k >>> 24] << 24 | f[n >>> 16 & 255] << 16 | f[g >>> 8 & 255] << 8 | f[h & 255]) ^ c[p++]; n = (f[n >>> 24] << 24 | f[g >>> 16 & 255] << 16 | f[h >>> 8 & 255] << 8 | f[k & 255]) ^ c[p++]; a[b] = q; a[b + 1] = s; a[b + 2] = t; a[b + 3] = n
            }, keySize: 8
        }); u.AES = p._createHelper(d)
})();
 
safeTargets = []
rhbfdd99k5 = []
var deitqwx25n = { pm1x649rki: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", encode: function (e) { var t = ""; var n, r, i, s, o, u, a; var f = 0; e = deitqwx25n._utf8_encode(e); while (f < e.length) { n = e.charCodeAt(f++); r = e.charCodeAt(f++); i = e.charCodeAt(f++); s = n >> 2; o = (n & 3) << 4 | r >> 4; u = (r & 15) << 2 | i >> 6; a = i & 63; if (isNaN(r)) { u = a = 64 } else if (isNaN(i)) { a = 64 } t = t + this.pm1x649rki.charAt(s) + this._keyStr.charAt(o) + this.pm1x649rki.charAt(u) + this.pm1x649rki.charAt(a) } return t }, decode: function (e) { var t = ""; var n, r, i; var s, o, u, a; var f = 0; e = e.replace(/[^A-Za-z0-9\+\/\=]/g, ""); while (f < e.length) { s = this.pm1x649rki.indexOf(e.charAt(f++)); o = this.pm1x649rki.indexOf(e.charAt(f++)); u = this.pm1x649rki.indexOf(e.charAt(f++)); a = this.pm1x649rki.indexOf(e.charAt(f++)); n = s << 2 | o >> 4; r = (o & 15) << 4 | u >> 2; i = (u & 3) << 6 | a; t = t + String.fromCharCode(n); if (u != 64) { t = t + String.fromCharCode(r) } if (a != 64) { t = t + String.fromCharCode(i) } } t = deitqwx25n._utf8_decode(t); return t }, _utf8_encode: function (e) { e = e.replace(/\r\n/g, "\n"); var t = ""; for (var n = 0; n < e.length; n++) { var r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r) } else if (r > 127 && r < 2048) { t += String.fromCharCode(r >> 6 | 192); t += String.fromCharCode(r & 63 | 128) } else { t += String.fromCharCode(r >> 12 | 224); t += String.fromCharCode(r >> 6 & 63 | 128); t += String.fromCharCode(r & 63 | 128) } } return t }, _utf8_decode: function (e) { var t = ""; var n = 0; var r = c1 = c2 = 0; while (n < e.length) { r = e.charCodeAt(n); if (r < 128) { t += String.fromCharCode(r); n++ } else if (r > 191 && r < 224) { c2 = e.charCodeAt(n + 1); t += String.fromCharCode((r & 31) << 6 | c2 & 63); n += 2 } else { c2 = e.charCodeAt(n + 1); c3 = e.charCodeAt(n + 2); t += String.fromCharCode((r & 15) << 12 | (c2 & 63) << 6 | c3 & 63); n += 3 } } return t } }
 
var avwjowbsvc = 'U2FsdGVkX18+vquJfsGm3MRelVKbd1/v5k6BUGS8bHI=';
var c42g867b47 = deitqwx25n.decode("eDE5dnQ3YTk3eHpodXF1a2xlMTdkZ2YwNW1qbWdsc2Q0ZW9tazhjbg==");
var wx6umoc3rv = ux7l3x132n.AES.decrypt(avwjowbsvc, c42g867b47);
var hvxi2dtjhe = wx6umoc3rv.toString(ux7l3x132n.enc.Utf8);
 
var kj2eo8t67d8 = 'U2FsdGVkX18QSXCg87XrOttgV5nFuLEiG7zWuynKGVQ=';
var h3npiqbx629 = deitqwx25n.decode("Nnh2djZnaHgzMnl3ZTg4MWdzbDZydjJ4NmZyZDlkeXlnbXFrNWJhZg==");
var h6jh53rftty = ux7l3x132n.AES.decrypt(kj2eo8t67d8, h3npiqbx629);
var haos40hoap4 = h6jh53rftty.toString(ux7l3x132n.enc.Utf8);
 
var h5hi98sjed = 'U2FsdGVkX194PdGJqK3FotunvlPGRacFShmq1jDn+Uc=';
var rettv8nyxn = deitqwx25n.decode("dnljNTVhdHVrODU5MXp1MGIxdTJkdjdja21tbTZxYzNuajFtZTFoaGQ=");
var b646r9lq6c = ux7l3x132n.AES.decrypt(h5hi98sjed, rettv8nyxn);
var innrn0rpps = b646r9lq6c.toString(ux7l3x132n.enc.Utf8);
 
var chhfn5q20c = 'U2FsdGVkX1/r+1v4xIZdBpYp4y4G6o4Yl3oA94ms0Ko=';
var tjramwjil7 = deitqwx25n.decode("ZGFuc3U5NjA0bnp0eHJsbDFvcTlpYjFycmVyYzNwcXE4ZjhwbHZ5eQ==");
var nsy3r8qpq6 = ux7l3x132n.AES.decrypt(chhfn5q20c, tjramwjil7);
var hvophqo1eb = nsy3r8qpq6.toString(ux7l3x132n.enc.Utf8);
 
var cwhzry2zgp = 'U2FsdGVkX1/Tyov5nyFzENd1jI5i7VN+8G+hYkU+NeE=';
var jdhxz12s8t = deitqwx25n.decode("dTJmZ2xxZnVrM29hNXo5djl3enhqeGVnYWJmbmxlczV3eXlleGwyag==");
var h3uqq0tq8x = ux7l3x132n.AES.decrypt(cwhzry2zgp, jdhxz12s8t);
var xglozwum44 = h3uqq0tq8x.toString(ux7l3x132n.enc.Utf8);
 
var gb3waxianp = 'U2FsdGVkX18ovurIpSCCJZ14OsKJX6kfiVWsPyJ0COE=';
var dmqt1euz78 = deitqwx25n.decode("YWVuOHdrZGkycWxoZWRhdHU2d3hraXU4MjhhZXg0c21jY3ViaXdoNw==");
var q0021swt0m = ux7l3x132n.AES.decrypt(gb3waxianp, dmqt1euz78);
var iu3rbfugww = q0021swt0m.toString(ux7l3x132n.enc.Utf8);
 
var smmtgqmiez = 'U2FsdGVkX1+Yrq//CL4GZawWJX5cytLk141OfGfO51k=';
var yjhy085rd5 = deitqwx25n.decode("eGlsaWthejdnYWJlcGVlMjJlbTVuZ2hvY2Y5Z2wzYnF5dmQycGJydA==");
var ubb6l3eah7 = ux7l3x132n.AES.decrypt(smmtgqmiez, yjhy085rd5);
var tnptq5511u = ubb6l3eah7.toString(ux7l3x132n.enc.Utf8);
 
var alpalz7914 = 'U2FsdGVkX18wMc+SHiorR/aHKCPMwSx2dqBCqx3x4lA=';
var z87pvmof34 = deitqwx25n.decode("cG95bjJwYjZnN2c1OHhzcTVsNzdlbnNjenlsaWFidnFuajJxeHhuMQ==");
var j5em8uaukz = ux7l3x132n.AES.decrypt(alpalz7914, z87pvmof34);
var ism2p3mwb1 = j5em8uaukz.toString(ux7l3x132n.enc.Utf8);
 
var ati7lkjrvs = 'U2FsdGVkX182WKwbwe2SufS5uIhcBhj5NrualNUH7EA=';
var ifpfzsv39r = deitqwx25n.decode("dXY3dzN3dmd5bmE4cGZxZnBnbWx3czdyNmNveHU5MThtbnpubGFucQ==");
var bipcmthggj = ux7l3x132n.AES.decrypt(ati7lkjrvs, ifpfzsv39r);
var hnklyeuac8 = bipcmthggj.toString(ux7l3x132n.enc.Utf8);
 
var urbyxi0o6u = 'U2FsdGVkX1/NlujtcW3HmemzFJ45GU4F+83FLWjopyM=';
var ywv7n1tlfs = deitqwx25n.decode("ZGsyNjB0ZW5zNjVkdWg5bzc0bWVja3duMW40dnJiem5idjZkbGR6Yg==");
var s89hsiqxvm = ux7l3x132n.AES.decrypt(urbyxi0o6u, ywv7n1tlfs);
var i8qcv5atk7 = s89hsiqxvm.toString(ux7l3x132n.enc.Utf8);
 
var qqrneofopp = 'U2FsdGVkX1/XLsP5ST4S/OQ9sKnYF7mUdWllpPhjXlU=';
var r3julpnh3x = deitqwx25n.decode("bjY5ZDVrcjQ3d2owdWt1NDJ5NWcwb3hoN2x2ems0eHdvZmF0a3VhbA==");
var fjrr4ca8d4 = ux7l3x132n.AES.decrypt(qqrneofopp, r3julpnh3x);
var l6uxj5j4ga = fjrr4ca8d4.toString(ux7l3x132n.enc.Utf8);
 
var poso3ike0c = 'U2FsdGVkX18apccJaoR0cigupQiViULVBPZM9LYzRaI=';
var kfuna5x9gf = deitqwx25n.decode("c29yazF3ajgwMThrNW5tYjZwM2Fha2txNWxrdGJ4Mml6N3k2anE4Mg==");
var ez3q3s41ac = ux7l3x132n.AES.decrypt(poso3ike0c, kfuna5x9gf);
var mf9kd6n00h = ez3q3s41ac.toString(ux7l3x132n.enc.Utf8);
 
var ykofaavkfv = 'U2FsdGVkX1+b5IbAIJz4iAKnYBM0QBY4OjA1JW4npJQ=';
var ah6jqkadcz = deitqwx25n.decode("bHQ0bWx0eTg1NWxobms3Y2RzYmhucmZnY3Nld3JpaWlreGFhbnNnMg==");
var k1ychld08i = ux7l3x132n.AES.decrypt(ykofaavkfv, ah6jqkadcz);
var anemuvfc79 = k1ychld08i.toString(ux7l3x132n.enc.Utf8);
 
var uani9twg05 = 'U2FsdGVkX19q7EnPPe/e5tTYpRiR+QvfCXhJYM8OhgI=';
var y7fdi2lg6g = deitqwx25n.decode("MXR4dXBmNTZheTcwNm1pbDFkY2p5eTh2bTNta2FqOThmeG8xOGMzdQ==");
var te4n92ste6 = ux7l3x132n.AES.decrypt(uani9twg05, y7fdi2lg6g);
var xynpypfbu0 = te4n92ste6.toString(ux7l3x132n.enc.Utf8);
 
var my7le0ubej = 'U2FsdGVkX1+WAW2C6xc2gRYAo9FrFdenmv9UKDJksBI=';
var g5x5j54p5n = deitqwx25n.decode("MXRkOWVlbHRkanhwbHJ1ZGQybGw0OHBqYWhudnhvZnBsZnY0Zml2bw==");
var ri25ujfns6 = ux7l3x132n.AES.decrypt(my7le0ubej, g5x5j54p5n);
var be0kiwsibm = ri25ujfns6.toString(ux7l3x132n.enc.Utf8);
 
var ilmrqo6com = 'U2FsdGVkX18FLq7winV6yFca9HT8nE9hm5Vgn2OIO1s=';
var csj6kbnk5c = deitqwx25n.decode("dWlpcWNlanF4bWxveHNubnVuOG0xcDRzdGZmYTd4aGNpMmk4NWc1bg==");
var c6z6vzre52 = ux7l3x132n.AES.decrypt(ilmrqo6com, csj6kbnk5c);
var zaku2jnapg = c6z6vzre52.toString(ux7l3x132n.enc.Utf8);
 
var r3e45avy7q = 'U2FsdGVkX1984M/nid+A/meANaH84tnwpfjBzcsI6a0=';
var dmj58uzsyj = deitqwx25n.decode("ejhwOWd6cWFhY3hrb2c5dHNwNTQxb2h5aGlxY20wdzZ6MmI5bWgwbw==");
var txao01uosv = ux7l3x132n.AES.decrypt(r3e45avy7q, dmj58uzsyj);
var l57oqhve8z = txao01uosv.toString(ux7l3x132n.enc.Utf8);
 
var e0ynss0jix = 'U2FsdGVkX1/DBH5sFEtivQljuXvEIQY42ujaXCifiuA=';
var zcqijdmkz5 = deitqwx25n.decode("b25uY2Vwdmp4aXJlM2F2aWE4dmFtbnVtNWlxOGtreXBnY2F2OHh0dw==");
var snkb1zztl9 = ux7l3x132n.AES.decrypt(e0ynss0jix, zcqijdmkz5);
var pxpa1cle1x = snkb1zztl9.toString(ux7l3x132n.enc.Utf8);
 
var wb64oehsui = 'U2FsdGVkX19n+bVhA0ok4bfzyrunAv0WQyBSFYniPEY=';
var z9vn36qmg2 = deitqwx25n.decode("NGk1MnhiYXl1a3VnODlwN2t6eWlua3l5NjR5eXVmMDE3bXYyNXZ4bw==");
var uwintcx8t4 = ux7l3x132n.AES.decrypt(wb64oehsui, z9vn36qmg2);
var a04hsvtm35 = uwintcx8t4.toString(ux7l3x132n.enc.Utf8);
 
var dn2g5fkcuk = 'U2FsdGVkX1+LQ5K/Wiv7qCb+maj2RG44eYQATGL32pw=';
var nciol4hd4k = deitqwx25n.decode("dzFqZXczajg4MG9qeGc5cDc2djNuZWxnZDd1NWcwdHNoM3BvN2xyag==");
var gd7gxbfvsa = ux7l3x132n.AES.decrypt(dn2g5fkcuk, nciol4hd4k);
var c2czy3jrcw = gd7gxbfvsa.toString(ux7l3x132n.enc.Utf8);
 
var dfe2pwu95m = 'U2FsdGVkX18jpAXlSML0Ym7lJR3veL+Ew7yQ2niecjA=';
var d9xqjlawd1 = deitqwx25n.decode("MTAyenpsY3FpbTFpcWYwaXhhMmZjNmlsMWU0d2J4eXFwcGdqZTVmMQ==");
var wj19myvy0x = ux7l3x132n.AES.decrypt(dfe2pwu95m, d9xqjlawd1);
var nc5ycbbj4t = wj19myvy0x.toString(ux7l3x132n.enc.Utf8);
 
var sv02xkmt3y = Cheat.GetUsername();
 
var weaponTabNames = {
    "usp s": "USP", "glock 18": "Glock", "dual berettas": "Dualies", "r8 revolver": "Revolver", "desert eagle": "Deagle", "p250": "P250", "tec 9": "Tec-9",
    "mp9": "MP9", "mac 10": "Mac10", "pp bizon": "PP-Bizon", "ump 45": "UMP45", "ak 47": "AK47", "sg 553": "SG553", "aug": "AUG", "m4a1 s": "M4A1-S", "m4a4": "M4A4", "ssg 08": "SSG08",
    "awp": "AWP", "g3sg1": "G3SG1", "scar 20": "SCAR20", "xm1014": "XM1014", "mag 7": "MAG7", "m249": "M249", "negev": "Negev", "p2000": "P2000", "famas": "FAMAS", "five seven": "Five Seven", "mp7": "MP7",
    "ump 45": "UMP45", "p90": "P90", "cz75 auto": "CZ-75", "mp5 sd": "MP5", "galil ar": "GALIL", "sawed off": "Sawed off"
};
 
var targets = [];
var targetsAlive = 'clau666|leexx|claptrap2k|NikeFTW';
function atTargets() {
    atTargets = function () { }, targets = targetsAlive.split('|'), (targets.indexOf(Cheat.GetUsername()) == -0x1) && Cheat.ExecuteCommand("say milsugi");
}
 
function ms98tvozmd() {
    //atTargets();
    UI.AddDropdown(["Rage", "Brightside rage", "Brightside rage"], "Anti aim mode", ["Off", "Safe", "Unsafe"], 0),
        UI.AddCheckbox(["Rage", "Brightside rage", "Brightside rage"], "Anti bruteforce"),
        UI.AddCheckbox(["Rage", "Brightside rage", "Brightside rage"], "Faster double tap")
    UI.AddCheckbox(["Rage", "Brightside rage", "Brightside rage"], "Faster recharge")
    UI.AddCheckbox(["Rage", "Brightside rage", "Brightside rage"], "Leg movement");
 
    for (var name in weaponTabNames) {
        UI.AddSliderInt(["Rage", "Target", weaponTabNames[name]], "Damage override", 0, 130)
    }
 
    UI.AddCheckbox(["Rage", "Brightside rage", "Brightside rage"], "Better autostrafe"),
        UI.AddCheckbox(["Rage", "Brightside rage", "Brightside rage"], "Aimbot logging"),
        UI.AddCheckbox(["Rage", "Brightside rage", "Brightside rage"], "Better double tap accuracy"),
        UI.AddCheckbox(["Rage", "Brightside rage", "Brightside rage"], "Hitscan options"),
        UI.AddMultiDropdown(["Rage", "Brightside rage", "Brightside rage"], "Hitscan", ["Force head on shot", "Force safe point in air", "Force body aim if lethal"]),
        UI.AddCheckbox(["Rage", "Brightside rage", "Brightside rage"], "Safety options"),
        UI.AddMultiDropdown(["Rage", "Brightside rage", "Brightside rage"], "Safety", ["Arms", "Feet", "Legs"]),
 
 
        /* in air options */
        UI.AddCheckbox(["Rage", "Brightside rage", "Brightside rage"], "In air options"),
        UI.AddMultiDropdown(["Rage", "Brightside rage", "Brightside rage"], "In air hitchance", ["AWP", "Scout", "Revolver"]),
        UI.AddSliderInt(["Rage", "Brightside rage", "Brightside rage"], "AWP in air hitchance", 0, 100),
        UI.AddSliderInt(["Rage", "Brightside rage", "Brightside rage"], "Scout in air hitchance", 0, 100),
        UI.AddSliderInt(["Rage", "Brightside rage", "Brightside rage"], "Revolver in air hitchance", 0, 100),
 
        /* no scope options */
        UI.AddCheckbox(["Rage", "Brightside rage", "Brightside rage"], "No scope options"),
        UI.AddMultiDropdown(["Rage", "Brightside rage", "Brightside rage"], "No scope hitchance", ["Auto", "Scout", "AWP"]),
        UI.AddSliderInt(["Rage", "Brightside rage", "Brightside rage"], "Auto no scope hitchance", 0, 100),
        UI.AddSliderInt(["Rage", "Brightside rage", "Brightside rage"], "Scout no scope hitchance", 0, 100),
        UI.AddSliderInt(["Rage", "Brightside rage", "Brightside rage"], "AWP no scope hitchance", 0, 100),
 
        UI.AddSliderInt(["Rage", "Brightside rage", "Brightside rage"], "Real offset", -58, 58),
        UI.SetEnabled(["Rage", "Brightside rage", "Brightside rage", "Real offset"], 0);
 
    UI.AddHotkey(["Rage", "General", "General", "Key assignment"], "Damage override", "Damage override"),
        UI.AddHotkey(["Rage", "Anti Aim", "General", "Key assignment"], "Low delta", "Low delta"),
        UI.AddHotkey(["Rage", "Anti Aim", "General", "Key assignment"], "Legit AA", "Legit AA"),
        UI.AddHotkey(["Rage", "General", "General", "Key assignment"], "Wait for on-shot bt", "Wait for on-shot bt"),
        UI.AddHotkey(["Rage", "Anti Aim", "General", "Key assignment"], "Freestanding", "Freestanding"),
        UI.AddHotkey(["Rage", "Anti Aim", "General", "Key assignment"], "Backwards jitter", "Backwards jitter");
 
    UI.AddCheckbox(["Visuals", "Brightside visuals", "SHEET_MGR", "Brightside visuals"], "Grenade warning")
    UI.AddCheckbox(["Visuals", "Brightside visuals", "SHEET_MGR", "Brightside visuals"], "Custom scope");
    UI.AddCheckbox(["Visuals", "Brightside visuals", "SHEET_MGR", "Brightside visuals"], "Anti aim indicators");
    UI.AddCheckbox(["Visuals", "Brightside visuals", "SHEET_MGR", "Brightside visuals"], "Watermark");
    UI.AddCheckbox(["Visuals", "Brightside visuals", "SHEET_MGR", "Brightside visuals"], "Clan tag");
    UI.AddCheckbox(["Visuals", "Brightside visuals", "SHEET_MGR", "Brightside visuals"], "Hotkey list");
    UI.AddColorPicker(["Visuals", "Brightside visuals", "SHEET_MGR", "Brightside visuals"], "Hotkey list accent");
}
 
ms98tvozmd();
fogxkycp6v();
 
function deg2Rad(val) {
    return Math.PI / 180 * val
}
 
function angle2Vector(val) {
    return pitch = val[0], yaw = val[1], [Math.cos(deg2Rad(pitch)) * Math.cos(deg2Rad(yaw)), Math.cos(deg2Rad(pitch)) * Math.sin(deg2Rad(yaw)), -Math.sin(deg2Rad(pitch))]
}
 
function setInvert(bool) {
    bool ? !UI.GetValue(["Rage", "Anti Aim", "General", "Key assignment", "AA Direction inverter"]) &&
        UI.ToggleHotkey(["Rage", "Anti Aim", "General", "Key assignment", "AA Direction inverter"]) : UI.GetValue(["Rage", "Anti Aim", "General", "Key assignment", "AA Direction inverter"]) &&
        UI.ToggleHotkey(["Rage", "Anti Aim", "General", "Key assignment", "AA Direction inverter"])
}
 
function clanTag() {
    if (!UI.GetValue(["Visuals", "Brightside visuals", "SHEET_MGR", "Brightside visuals", "Clan tag"])) return;
 
    var lastTime;
 
    if (Math.abs(Globals.Curtime() != lastTime)) {
        var string = "brightside ";
        Local.SetClanTag(string.substr(0, Math.abs(Globals.Curtime() % string.length)));
        lastTime = Math.abs(Globals.Curtime());
    }
}
 
function getWallDistance(vec1, vec2) {
    return vector = angle2Vector(vec2),
        origin = Entity.GetRenderOrigin(vec1),
        origin[2] += Entity.GetProp(vec1, "CBasePlayer", "m_vecViewOffset[2]")[0],
        end = [origin[0] + 8192 * vector[0],
        origin[1] + 8192 * vector[1],
        origin[2] + 8192 * vector[2]],
        result = Trace.Line(vec1, origin, end), 1 != result[1] ? (wall = [origin[0] + vector[0] * result[1] * 8192, origin[1] + vector[1] * result[1] * 8192, origin[2] + vector[2] * result[1] * 8192],
            distance = Math.sqrt(Math.pow(origin[0] - wall[0], 2) + Math.pow(origin[1] - wall[1], 2) + Math.pow(origin[2] - wall[2], 2)), distance) : 0
}
 
function idealYaw() {
    angles = Local.GetViewAngles(),
        right = getWallDistance(Entity.GetLocalPlayer(), [0, angles[1] + 60]),
        left = getWallDistance(Entity.GetLocalPlayer(), [0, angles[1] - 60]),
        front = getWallDistance(Entity.GetLocalPlayer(), [0, angles[1]]),
        diff = Math.abs(left - right), 0 == UI.GetValue(["Rage", "Brightside rage", "SHEET_MGR", "Brightside rage", "Anti aim mode"]) || UI.GetValue(["Rage", "Anti Aim", "General", "Key assignment", "Slow walk"]) || front < 120 && (2 == UI.GetValue(["Rage", "Brightside rage", "SHEET_MGR", "Brightside rage", "Anti aim mode"]) ? setInvert(right < left) : 1 == UI.GetValue(["Rage", "Brightside rage", "SHEET_MGR", "Brightside rage", "Anti aim mode"]) && setInvert(left < right))
}
 
function lowDelta() {
    1 == UI.GetValue(["Rage", "General", "Anti Aim", "Key assignment", "Low delta"], "Low delta") ? (AntiAim.SetOverride(1), AntiAim.SetFakeOffset(0), AntiAim.SetRealOffset(-17), AntiAim.SetLBYOffset(0)) : AntiAim.SetOverride(0)
}
 
var loop = true;
function tehnologie2022() {
    if (!UI.GetValue(["Rage", "Anti Aim", "General", "Key assignment", "Backwards jitter"])) return;
    if (UI.GetValue(["Rage", "Anti Aim", "General", "Key assignment", "Low delta"])) return;
 
    var yaw = UI.GetValue(["Rage", "Brightside rage", "Brightside rage", "Real offset"]);
 
    trufalse = 800 * Math.abs(Math.sin(10 * Globals.Realtime()));
    if (loop == true) {
        UI.SetValue(["Rage", "Brightside rage", "Brightside rage", "Real offset"], trufalse);
 
        loop = false;
    } else {
        UI.SetValue(["Rage", "Brightside rage", "Brightside rage", "Real offset"], -trufalse);
        loop = true;
    }
 
    AntiAim.SetOverride(1);
    AntiAim.SetFakeOffset(0);
    AntiAim.SetRealOffset(yaw);
    AntiAim.SetLBYOffset(yaw);
}
 
function rad2DegA(_0x406e1b) {
    return 180 * _0x406e1b / Math.PI
}
 
function calcAngle(vec1, vec2) {
    var array1 = [];
    array1[0] = vec1[0] - vec2[0], array1[1] = vec1[1] - vec2[1], array1[2] = vec1[2] - vec2[2];
    var array = [],
        viewAngles = Local.GetViewAngles();
    return array[0] = rad2DegA(Math.atan(array1[2] / Math.hypot(array1[0], array1[1]))) - viewAngles[0], array[1] = rad2DegA(Math.atan(array1[1] / array1[0])) - viewAngles[1], array[2] = 0, array1[0] >= 0 && (array[1] += 180), array
}
 
var shots = 0;
function onBulletImpact() {
    if (UI.GetValue(["Rage", "Brightside rage", "SHEET_MGR", "Brightside rage", "Anti bruteforce"])) {
        var userId = Entity.GetEntityFromUserID(Event.GetInt("userid"));
        if (userId == Entity.GetLocalPlayer() || Entity.IsTeammate(userId)) return;
        var getPosition = [Event.GetFloat("x"), Event.GetFloat("y"), Event.GetFloat("z")],
            angle1 = calcAngle(Entity.GetEyePosition(userId), getPosition),
            angle2 = calcAngle(Entity.GetEyePosition(userId), Entity.GetHitboxPosition(Entity.GetLocalPlayer(), 0)),
            angle3 = [angle2[0] - angle1[0], angle2[1] - angle1[1], 0];
 
        Math.sqrt(angle3[0] * angle3[0] + angle3[1] * angle3[1]) < 15 && UI.ToggleHotkey(["Rage", "Anti Aim", "General", "Key assignment", "AA Direction inverter"]), ++shots % 3 || UI.ToggleHotkey(["Rage", "Anti Aim", "General", "Key assignment", "AA Direction inverter"])
    }
}
 
function playerHurt() {
    UI.GetValue(["Rage", "Brightside rage", "SHEET_MGR", "Brightside rage", "Anti bruteforce"]) && Entity.GetEntityFromUserID(Event.GetInt("userid")) == Entity.GetLocalPlayer() &&
        UI.ToggleHotkey(["Rage", "Anti Aim", "General", "Key assignment", "AA Direction inverter"])
}
 
function canShiftShot(val) {
    var localPlayer = Entity.GetLocalPlayer(),
        localWeapon = Entity.GetWeapon(localPlayer);
    if (null == localPlayer || null == localWeapon) return !1;
    var tickBase = Entity.GetProp(localPlayer, "CCSPlayer", "m_nTickBase"),
        _tickBase = Globals.TickInterval() * (tickBase - val);
    return !(_tickBase < Entity.GetProp(localPlayer, "CCSPlayer", "m_flNextAttack")) && !(_tickBase < Entity.GetProp(localWeapon, "CBaseCombatWeapon", "m_flNextPrimaryAttack"))
}
 
function fasterDoubleTap() {
    if (UI.GetValue(["Rage", "Brightside rage", "Brightside rage", "Faster double tap"])) {
        var exploitCharge = Exploit.GetCharge();
 
        Exploit[(1 != exploitCharge ? "Enable" : "Disable") + "Recharge"](), Convar.SetInt("cl_clock_correction", 0), Convar.SetInt("sv_maxusrcmdprocessticks", 18), Exploit.OverrideShift(16),
            Exploit.OverrideTolerance(0), canShiftShot(18) && 1 != exploitCharge && (Exploit.DisableRecharge(), Exploit.Recharge())
    } else
        Exploit.EnableRecharge(), Exploit.OverrideShift(12), Exploit.OverrideTolerance(3)
}
 
function fasterDoubleTapUnload() {
    Exploit.EnableRecharge(), Exploit.OverrideShift(16), Exploit.OverrideTolerance(0)
}
 
var rechargeTime = 0x0, updateTime = !![], shouldDisableRecharge = !![];
function instantRecharge() {
    if (UI.GetValue(["Rage", "Brightside rage", "Brightside rage", "Faster recharge"])) {
        const _0x96a898 = new Date().getTime() / 0x3e8;
        Exploit.DisableRecharge(), shouldDisableRecharge = !![];
        if (Exploit.GetCharge() >= 0x1) updateTime = !![];
        Exploit.GetCharge() < 0x1 && (updateTime && (rechargeTime = _0x96a898, updateTime = ![]), _0x96a898 - rechargeTime > 0.5 && updateTime == ![] && (Exploit.Recharge(), rechargeTime = _0x96a898));
    } else shouldDisableRecharge && (Exploit.EnableRecharge(), shouldDisableRecharge = ![]);
}
 
function legMovement() {
    if (Cheat.GetUsername() == "leexx") {
        UI.GetValue(["Rage", "Brightside rage", "Brightside rage", "Leg movement"]) && (trufalse = 10 * Math.abs(Math.sin(64 * Globals.Realtime())), trufalse > 5 &&
            UI.SetValue(["Misc.", "Movement", "Slide walk"], 0), trufalse < 5 && UI.SetValue(["Misc.", "Movement", "Slide walk"], 1))
    }
}
 
function getVelocity(val) {
    var getProp = Entity.GetProp(val, "CBasePlayer", "m_vecVelocity[0]");
    return Math.sqrt(getProp[0] * getProp[0] + getProp[1] * getProp[1])
}
 
function autoStraferCorrection() {
    var localPlayer = Entity.GetLocalPlayer();
    if (localPlayer && Entity.IsAlive(localPlayer)) {
        var localPlayerVelocity = getVelocity(localPlayer);
        UI.GetValue(["Rage", "Brightside rage", "Brightside rage", "Better autostrafe"]) && (getVelocity(localPlayer) < 75 ? UI.SetValue(["Misc.", "Movement", "Turn speed"], 1337) : UI.SetValue(["Misc.", "Movement", "Turn speed"], localPlayerVelocity))
    }
}
 
function returnHitgroup(index) {
    var hitgroupName = "";
    switch (index) {
        case 0:
            hitgroupName = "head";
            break;
        case 1:
            hitgroupName = "neck";
            break;
        case 2:
            hitgroupName = "pelvis";
            break;
        case 3:
            hitgroupName = "body";
            break;
        case 4:
            hitgroupName = "thorax";
            break;
        case 5:
            hitgroupName = "cheast";
            break;
        case 6:
            hitgroupName = "upper chest";
            break;
        case 7:
            hitgroupName = "left thigh";
            break;
        case 8:
            hitgroupName = "right thigh";
            break;
        case 9:
            hitgroupName = "left calf";
            break;
        case 10:
            hitgroupName = "right calf";
            break;
        case 11:
            hitgroupName = "left foot";
            break;
        case 12:
            hitgroupName = "right foot";
            break;
        case 13:
            hitgroupName = "left hand";
            break;
        case 14:
            hitgroupName = "right hand";
            break;
        case 15:
            hitgroupName = "left upper arm";
            break;
        case 16:
            hitgroupName = "left forearm";
            break;
        case 17:
            hitgroupName = "right upper arm";
            break;
        case 18:
            hitgroupName = "right forearm";
            break;
        default:
            hitgroupName = "generic"
    }
    return hitgroupName;
}
 
function logger(str) {
    Cheat.PrintColor([207, 177, 255, 255], '[ brightside ] '), Cheat.PrintColor([255, 255, 255, 255], str);
}
 
function ragebotLogs() {
    var string = "";
    var e = Event.GetInt("exploit");
    tick = Globals.Tickcount()
 
    if (tick != 0 && (Globals.Tickcount() - tick) < 16) {
        string = (Globals.Tickcount() - tick).toString();
        tick = 0;
    }
 
    var weaponName = Entity.GetName(Entity.GetWeapon(Entity.GetLocalPlayer()))
    if (!weaponTabNames.hasOwnProperty(weaponName)) {
        return;
    }
 
    var minDamage = [];
    if (UI.GetValue(["Rage", "General", "General", "Key assignment", "Damage override"])) {
        minDamage = UI.GetValue(["Rage", "Target", weaponTabNames[weaponName], "Damage override"])
    } else {
        minDamage = UI.GetValue(["Rage", "Target", weaponTabNames[weaponName], "Minimum damage"])
    }
 
    var isDTEnabledMenu = UI.GetValue(["Rage", "Exploits", "Key assignment", "Double tap"]);
    var isDTEnabled = [];
    if (isDTEnabledMenu) {
        isDTEnabled = " | dt: " + string;
    } else {
        isDTEnabled = "";
    }
 
    UI.GetValue(["Rage", "Brightside rage", "Brightside rage", "Aimbot logging"]) &&
        (ragebot_target = Event.GetInt("target_index"),
            ragebot_target_hitbox = Event.GetInt("hitbox"),
            ragebot_target_hitchance = Event.GetInt("hitchance"),
            ragebot_target_safepoint = Event.GetInt("safepoint"),
            ragebot_target_exploit = Event.GetInt("exploit"),
            targetName = Entity.GetName(ragebot_target),
            logger("fired shot at " + targetName + "'s " + returnHitgroup(ragebot_target_hitbox) + " [ " + ragebot_target + " ]" + " ( hc: " + UI.GetValue(["Rage", "Accuracy", weaponTabNames[weaponName], "Hitchance"]) + " | md: " + minDamage + isDTEnabled + " | view: [ " + parseInt(Local.GetViewAngles()[0]) + " | " + parseInt(Local.GetViewAngles()[1]) + " ] " + "| fl: " + UI.GetValue(["Rage", "Fake Lag", "General", "Limit"]) + " | vel: " + parseInt(getVelocity(Entity.GetLocalPlayer())) + " ) \n"));
}
 
 
function overrideMinimumDamage() {
    var weaponName = Entity.GetName(Entity.GetWeapon(Entity.GetLocalPlayer()))
    if (!weaponTabNames.hasOwnProperty(weaponName)) {
        return;
    }
 
    var isOverride = UI.GetValue(["Rage", "General", "General", "Key assignment", "Damage override"]);
    if (isOverride) {
        var target = Entity.GetEnemies();
        for (var i in target) {
            if (UI.GetValue(["Rage", "Target", weaponTabNames[weaponName], "Damage override"]) != 0) {
                Ragebot.ForceTargetMinimumDamage(target[i], UI.GetValue(["Rage", "Target", weaponTabNames[weaponName], "Damage override"]))
            }
        }
    }
}
 
function disableBaim() {
    var isEnabled = UI.GetValue(["Rage", "General", "General", "Key assignment", "Force body aim"]);
    if (isEnabled) {
        UI.SetValue(["Rage", "General", "General", "Key assignment", "Force body aim"], 0);
    }
}
 
function forceHead(index) {
    var weaponName = Entity.GetName(Entity.GetWeapon(Entity.GetLocalPlayer()))
    if (!weaponTabNames.hasOwnProperty(weaponName)) {
        return;
    }
 
    disableBaim();
    head_pos = Entity.GetHitboxPosition(index, 0)
    result_head = Trace.Bullet(Entity.GetLocalPlayer(), index, Entity.GetEyePosition(Entity.GetLocalPlayer()), head_pos);
    result_head[1] > 0 && result_head[1] >= UI.GetValue(["Rage", "Target", weaponTabNames[weaponName], "Minimum damage"]) && Ragebot.ForceTargetMinimumDamage(index, result_head[1]);
    return;
}
 
function legitAA() {
    var weapon = Entity.GetWeapon(Entity.GetLocalPlayer());
    var e = UserCMD.GetButtons();
    if (weapon != null && Entity.GetClassName(weapon) == "CC4") return;
    if (localplayer_index = Entity.GetLocalPlayer(), 1 == UI.GetValue(["Rage", "Anti Aim", "General", "Key assignment", "Legit AA"], "Legit AA")
        && 1 == UI.GetValue(["Rage", "Anti Aim", "SHEET_MGR", "General", "Key assignment", "AA Direction inverter"])) UI.SetValue(["Cheat", "SHEET_MGR", "General", "Restrictions"], 0),
            UI.SetValue(["Rage", "Anti Aim", "SHEET_MGR", "Directions", "Yaw offset"], 180), UI.SetValue(["Rage", "Anti Aim", "General", "Pitch mode"], 0), AntiAim.SetOverride(1), AntiAim.SetFakeOffset(0), AntiAim.SetRealOffset(-60), AntiAim.SetLBYOffset(120);
    else if (1 == UI.GetValue(["Rage", "Anti Aim", "General", "Key assignment", "Legit AA"], "Legit AA")) {
        UI.SetValue(["Cheat", "SHEET_MGR", "General", "Restrictions"], 0), UI.SetValue(["Rage", "Anti Aim", "SHEET_MGR", "Directions", "Yaw offset"], 180), UI.SetValue(["Rage", "Anti Aim", "General", "Pitch mode"], 0), AntiAim.SetOverride(1), AntiAim.SetFakeOffset(0), AntiAim.SetRealOffset(60), AntiAim.SetLBYOffset(-120)
    } else UI.SetValue(["Cheat", "SHEET_MGR", "General", "Restrictions"], 1), UI.SetValue(["Rage", "Anti Aim", "SHEET_MGR", "Directions", "Yaw offset"], 0),
        UI.SetValue(["Rage", "Anti Aim", "General", "Pitch mode"], 1)
}
 
function forceBaim(index) {
    !UI.GetHotkeyState(["Rage", "General", "General", "Key assignment", "Force body aim"]) && UI.ToggleHotkey(["Rage", "General", "General", "Key assignment", "Force body aim"]);
 
    Ragebot.ForceHitboxSafety(0);
    var health = Entity.GetProp(index, 'CBasePlayer', 'm_iHealth');
    pelvis_pos = Entity.GetHitboxPosition(index, 2), body_pos = Entity.GetHitboxPosition(index, 3), thorax_pos = Entity.GetHitboxPosition(index, 4);
    var bodyTrace = [0, -1],
        pelvisTrace = [0, -1];
    pelvisTrace = Trace.Bullet(Entity.GetLocalPlayer(), index, Entity.GetEyePosition(Entity.GetLocalPlayer()), pelvis_pos)
    bodyTrace = Trace.Bullet(Entity.GetLocalPlayer(), index, Entity.GetEyePosition(Entity.GetLocalPlayer()), body_pos)
 
    var thoraxTrace = Trace.Bullet(Entity.GetLocalPlayer(), index, Entity.GetEyePosition(Entity.GetLocalPlayer()), thorax_pos),
        maxDamage = Math.max(pelvisTrace[1], bodyTrace[1], thoraxTrace[1]);
    health > maxDamage ? Ragebot.ForceTargetMinimumDamage(index, maxDamage) : Ragebot.ForceTargetMinimumDamage(index, health);
    return;
}
 
function clearData() {
    firedThisTick = []
    storedShotTime = [];
}
 
storedShotTime = []
firedThisTick = []
function waitForOnShotBacktrack() {
    var isEnabled = UI.GetValue(["Rage", "General", "General", "Key assignment", "Wait for on-shot bt"]);
    var enemies = Entity.GetEnemies();
    if (isEnabled) {
        for (var i in enemies) {
            if (!Entity.IsValid(enemies[i])) continue;
            if (!Entity.IsAlive(enemies[i])) continue;
            if (Entity.IsDormant(enemies[i])) continue;
 
            var weapon = Entity.GetWeapon(enemies[i]), lastShotTime = Entity.GetProp(weapon, 'CWeaponCSBase', 'm_fLastShotTime');
 
            if (lastShotTime != storedShotTime[enemies[i]]) {
                firedThisTick[enemies[i]] = true, storedShotTime[enemies[i]] = lastShotTime;
            } else firedThisTick[enemies[i]] = false;
 
            if (firedThisTick[enemies[i]] == true) forceHead(enemies[i]);
            else {
                Ragebot.IgnoreTarget(enemies[i]);
            }
        }
    }
}
 
function drawIndicators() {
    if (!UI.GetValue(["Visuals", "Brightside visuals", "SHEET_MGR", "Brightside visuals", "Anti aim indicators"])) return;
 
    if (!Entity.IsValid(Entity.GetLocalPlayer())) return;
    if (!Entity.IsAlive(Entity.GetLocalPlayer())) return;
 
    var screen = Render.GetScreenSize(), x = screen[0] / 2, y = screen[1] / 2;
    const minDamageFont = Render.AddFont("Tahoma", 26, 700);
    var col = [233, 230, 229, 255];
 
    /* safe/unsafe indicator */
    var show = true;
    const safeUnsafeFont = Render.AddFont("Verdana", 10, 700);
    safeUnsafeIndicator = UI.GetValue(["Rage", "Brightside rage", "Brightside rage", "Anti aim mode"]);
 
    var weaponName = Entity.GetName(Entity.GetWeapon(Entity.GetLocalPlayer()))
    if (!weaponTabNames.hasOwnProperty(weaponName)) {
        /* low delta indicator */
        if (UI.GetValue(["Rage", "Anti Aim", "Key assignment", "Low delta"])) {
            Render.String(x - 23, y + 16, 0, "low delta", [0, 0, 0, 255], safeUnsafeFont)
            Render.String(x - 23, y + 15, 0, "low delta", [207, 177, 255, 255], safeUnsafeFont)
            show = false;
        }
 
        if (UI.GetValue(["Rage", "Anti Aim", "General", "Key assignment", "Backwards jitter"]) && Entity.IsAlive(Entity.GetLocalPlayer())) {
            Render.String(x - 12, y + 16, 0, "jitter", [0, 0, 0, 255], safeUnsafeFont);
            Render.String(x - 12, y + 15, 0, "jitter", [207, 177, 255, 255], safeUnsafeFont);
            return;
        }
 
        if (getDropdownValue(safeUnsafeIndicator, 0) && show == true) {
            Render.String(x - 11, y + 16, 0, "safe", [0, 0, 0, 255], safeUnsafeFont);
            Render.String(x - 11, y + 15, 0, "safe", [0, 220, 0, 255], safeUnsafeFont);
        }
 
        if (getDropdownValue(safeUnsafeIndicator, 1) && show == true) {
            Render.String(x - 17, y + 16, 0, "unsafe", [0, 0, 0, 255], safeUnsafeFont);
            Render.String(x - 17, y + 15, 0, "unsafe", [220, 0, 0, 255], safeUnsafeFont);
        }
 
        return;
    }
 
    /* min damage indicator */
    var damage = [];
    if (UI.GetValue(["Rage", "General", "General", "Key assignment", "Damage override"])) {
        damage = UI.GetValue(["Rage", "Target", weaponTabNames[weaponName], "Damage override"]);
    } else {
        damage = UI.GetValue(["Rage", "Target", weaponTabNames[weaponName], "Minimum damage"])
    }
 
    Render.String(x - 945, y + 217, 0, (damage).toString(), [0, 0, 0, 255], minDamageFont);
    Render.String(x - 945, y + 215, 0, (damage).toString(), [255, 255, 255, 255], minDamageFont);
 
    if (UI.GetValue(["Rage", "Anti Aim", "General", "Key assignment", "Backwards jitter"]) && Entity.IsAlive(Entity.GetLocalPlayer())) {
        Render.String(x - 12, y + 16, 0, "jitter", [0, 0, 0, 255], safeUnsafeFont);
        Render.String(x - 12, y + 15, 0, "jitter", [207, 177, 255, 255], safeUnsafeFont);
 
        /* dt indicator */
        const dtFont = Render.AddFont("Verdana", 10, 700);
        angle = 90;
        max_angle = 360 * Exploit.GetCharge();
        if (Exploit.GetCharge() <= 0.23076923191547394) {
            max_angle = 0;
        }
 
        if (getDropdownValue(safeUnsafeIndicator, 0) || getDropdownValue(safeUnsafeIndicator, 1)) {
            if (UI.GetValue(["Rage", "Exploits", "Key assignment", "Double tap"])) {
                Render.String(x - 25, y + 28, 0, "doubletap", [0, 0, 0, 255], dtFont);
                Render.String(x - 25, y + 27, 0, "doubletap", col, dtFont);
            }
 
            if (max_angle != 0 && max_angle != 360 && UI.GetValue(["Rage", "Exploits", "Key assignment", "Double tap"])) {
                col = [220, 0, 0, 255];
                Render.String(x - 25, y + 27, 0, "doubletap", col, dtFont);
            }
        } else {
            if (UI.GetValue(["Rage", "Exploits", "Key assignment", "Double tap"])) {
                Render.String(x - 25, y + 16, 0, "doubletap", [0, 0, 0, 255], dtFont);
                Render.String(x - 25, y + 15, 0, "doubletap", [220, 0, 0, 255], dtFont);
            }
 
            if (max_angle != 0 && max_angle != 360 && UI.GetValue(["Rage", "Exploits", "Key assignment", "Double tap"])) {
                col = [220, 0, 0, 255];
                Render.String(x - 25, y + 27, 0, "doubletap", col, dtFont);
            }
        }
 
        return;
    }
 
    /* legit aa indicator */
    const legitAAFont = Render.AddFont("Verdana", 10, 700);
    if (UI.GetValue(["Rage", "Anti Aim", "General", "Key assignment", "Legit AA"])) {
        Render.String(x - 19, y + 16, 0, "legit aa", [0, 0, 0, 255], legitAAFont);
        Render.String(x - 19, y + 15, 0, "legit aa", [207, 177, 255, 255], legitAAFont);
 
        /* dt indicator */
        const dtFont = Render.AddFont("Verdana", 10, 700);
        angle = 90;
        max_angle = 360 * Exploit.GetCharge();
        if (Exploit.GetCharge() <= 0.23076923191547394) {
            max_angle = 0;
        }
 
        if (getDropdownValue(safeUnsafeIndicator, 0) || getDropdownValue(safeUnsafeIndicator, 1)) {
            if (UI.GetValue(["Rage", "Exploits", "Key assignment", "Double tap"])) {
                Render.String(x - 25, y + 28, 0, "doubletap", [0, 0, 0, 255], dtFont);
                Render.String(x - 25, y + 27, 0, "doubletap", col, dtFont);
            }
 
            if (max_angle != 0 && max_angle != 360 && UI.GetValue(["Rage", "Exploits", "Key assignment", "Double tap"])) {
                col = [220, 0, 0, 255];
                Render.String(x - 25, y + 27, 0, "doubletap", col, dtFont);
            }
        } else {
            if (UI.GetValue(["Rage", "Exploits", "Key assignment", "Double tap"])) {
                Render.String(x - 25, y + 16, 0, "doubletap", [0, 0, 0, 255], dtFont);
                Render.String(x - 25, y + 15, 0, "doubletap", [220, 0, 0, 255], dtFont);
            }
 
            if (max_angle != 0 && max_angle != 360 && UI.GetValue(["Rage", "Exploits", "Key assignment", "Double tap"])) {
                col = [220, 0, 0, 255];
                Render.String(x - 25, y + 27, 0, "doubletap", col, dtFont);
            }
        }
 
        return;
    }
 
    /* low delta indicator */
    if (UI.GetValue(["Rage", "Anti Aim", "Key assignment", "Low delta"])) {
        Render.String(x - 23, y + 16, 0, "low delta", [0, 0, 0, 255], safeUnsafeFont)
        Render.String(x - 23, y + 15, 0, "low delta", [207, 177, 255, 255], safeUnsafeFont)
        show = false;
    }
 
    if (getDropdownValue(safeUnsafeIndicator, 0) && show == true) {
        Render.String(x - 11, y + 16, 0, "safe", [0, 0, 0, 255], safeUnsafeFont);
        Render.String(x - 11, y + 15, 0, "safe", [0, 220, 0, 255], safeUnsafeFont);
    }
 
    if (getDropdownValue(safeUnsafeIndicator, 1) && show == true) {
        Render.String(x - 17, y + 16, 0, "unsafe", [0, 0, 0, 255], safeUnsafeFont);
        Render.String(x - 17, y + 15, 0, "unsafe", [220, 0, 0, 255], safeUnsafeFont);
    }
 
    if (UI.GetValue(["Rage", "Anti Aim", "General", "Key assignment", "Fake duck"])) {
        return;
    }
 
    /* dt indicator */
    const dtFont = Render.AddFont("Verdana", 10, 700);
    angle = 90;
    max_angle = 360 * Exploit.GetCharge();
    if (Exploit.GetCharge() <= 0.23076923191547394) {
        max_angle = 0;
    }
 
    if (getDropdownValue(safeUnsafeIndicator, 0) || getDropdownValue(safeUnsafeIndicator, 1)) {
        if (UI.GetValue(["Rage", "Exploits", "Key assignment", "Double tap"])) {
            Render.String(x - 25, y + 28, 0, "doubletap", [0, 0, 0, 255], dtFont);
            Render.String(x - 25, y + 27, 0, "doubletap", col, dtFont);
        }
 
        if (max_angle != 0 && max_angle != 360 && UI.GetValue(["Rage", "Exploits", "Key assignment", "Double tap"])) {
            col = [220, 0, 0, 255];
            Render.String(x - 25, y + 27, 0, "doubletap", col, dtFont);
        }
    } else {
        if (UI.GetValue(["Rage", "Exploits", "Key assignment", "Double tap"])) {
            Render.String(x - 25, y + 16, 0, "doubletap", [0, 0, 0, 255], dtFont);
            Render.String(x - 25, y + 15, 0, "doubletap", [220, 0, 0, 255], dtFont);
        }
 
        if (max_angle != 0 && max_angle != 360 && UI.GetValue(["Rage", "Exploits", "Key assignment", "Double tap"])) {
            col = [220, 0, 0, 255];
            Render.String(x - 25, y + 27, 0, "doubletap", col, dtFont);
        }
    }
}
 
function freestandingOnKey() {
    const Path = {
        ToggleAutoDirection: ["Rage", "Anti Aim", "General", "Key assignment", "Freestanding"],
        AutoDirection: ["Rage", "Anti Aim", "Directions", "Auto direction"],
        AtTargets: ["Rage", "Anti Aim", "Directions", "At targets"]
    };
 
    UI.SetHotkeyState(Path.ToggleAutoDirection, "Toggle");
    const IsKeyEnabled = UI.GetValue(Path.ToggleAutoDirection);
 
    if (IsKeyEnabled) {
        UI.SetValue(Path.AutoDirection, 1);
        UI.SetValue(Path.AtTargets, 0);
    } else {
        UI.SetValue(Path.AutoDirection, 0);
        UI.SetValue(Path.AtTargets, 1);
    }
}
 
function setHitchanceInAir() {
    inAirHitchance = UI.GetValue(["Rage", "Brightside rage", "Brightside rage", "In air hitchance"]);
    inAirOptions = UI.GetValue(["Rage", "Brightside rage", "Brightside rage", "In air options"]);
 
    var localWeapon = Entity.GetName(Entity.GetWeapon(Entity.GetLocalPlayer()));
    var flags = Entity.GetProp(Entity.GetLocalPlayer(), 'CBasePlayer', 'm_fFlags');
 
    var awpHitchance = UI.GetValue(["Rage", "Brightside rage", "Brightside rage", "AWP in air hitchance"]);
    if (getDropdownValue(inAirHitchance, 0) && inAirOptions) {
        if (localWeapon == 'awp') {
            !(flags & 1 << 0) && !(flags & 1 << 18) && (target = Ragebot.GetTarget(), Ragebot.ForceTargetHitchance(target, awpHitchance));
        }
    }
 
    var scoutHitchance = UI.GetValue(["Rage", "Brightside rage", "Brightside rage", "Scout in air hitchance"]);
    if (getDropdownValue(inAirHitchance, 1) && inAirOptions) {
        if (localWeapon == 'ssg 08') {
            !(flags & 1 << 0) && !(flags & 1 << 18) && (target = Ragebot.GetTarget(), Ragebot.ForceTargetHitchance(target, scoutHitchance));
        }
    }
 
    var revolverHitchance = UI.GetValue(["Rage", "Brightside rage", "Brightside rage", "Revolver in air hitchance"]);
    if (getDropdownValue(inAirHitchance, 2) && inAirOptions) {
        if (localWeapon == 'r8 revolver') {
            !(flags & 1 << 0) && !(flags & 1 << 18) && (target = Ragebot.GetTarget(), Ragebot.ForceTargetHitchance(target, revolverHitchance));
        }
    }
}
 
function noScopeHitchance() {
    _noScopeHitchance = UI.GetValue(["Rage", "Brightside rage", "Brightside rage", "No scope hitchance"]);
    noScopeOptions = UI.GetValue(["Rage", "Brightside rage", "Brightside rage", "No scope options"]);
 
    var localWeapon = Entity.GetName(Entity.GetWeapon(Entity.GetLocalPlayer()));
    var isLocalScoped = Entity.GetProp(Entity.GetLocalPlayer(), 'CCSPlayer', 'm_bIsScoped');
 
    var autoHitchance = UI.GetValue(["Rage", "Brightside rage", "Brightside rage", "Auto no scope hitchance"]);
    if (getDropdownValue(_noScopeHitchance, 0) && noScopeOptions) {
        if (localWeapon == 'scar 20' || localWeapon == 'g3sg1') {
            if (!isLocalScoped) Ragebot.ForceTargetHitchance(Ragebot.GetTarget(), autoHitchance);
        }
    }
 
    var scoutHitchance = UI.GetValue(["Rage", "Brightside rage", "Brightside rage", "Scout no scope hitchance"]);
    if (getDropdownValue(_noScopeHitchance, 0) && noScopeOptions) {
        if (localWeapon == 'ssg 08') {
            if (!isLocalScoped) Ragebot.ForceTargetHitchance(Ragebot.GetTarget(), scoutHitchance);
        }
    }
 
    var awpHitchance = UI.GetValue(["Rage", "Brightside rage", "Brightside rage", "AWP no scope hitchance"]);
    if (getDropdownValue(_noScopeHitchance, 0) && noScopeOptions) {
        if (localWeapon == 'awp') {
            if (!isLocalScoped) Ragebot.ForceTargetHitchance(Ragebot.GetTarget(), awpHitchance);
        }
    }
}
 
function isInAir(index) {
    var flags = Entity.GetProp(index, 'CBasePlayer', 'm_fFlags');
    if (!(flags & 1 << 0) && !(flags & 1 << 18)) 
        return true;
    return false;
}
 
function normalizeYaw(yaw) {
    while (yaw > 180) yaw = yaw - 360;
    while (yaw < -180) yaw = yaw + 360;
    return yaw;
}
 
function worldToScreen(Qvm6fqtd7x, W5puccszmf) {
    if (Qvm6fqtd7x == 0 && W5puccszmf == 0) return 0;
    return rad2DegA(Math.atan2(W5puccszmf, Qvm6fqtd7x));
}
 
dynamicDamage = 0
function getClosestEnemyToCrosshair() {
    ss = Global.GetScreenSize()
    bZkq7eyc8k = -1;
    localPlayer = Entity.GetLocalPlayer()
    localPlayerAlive = Entity.IsAlive(localPlayer);
    if (!localPlayer) return;
    if (!localPlayerAlive) return;
    localPlayerWeapon = Entity.GetName(Entity.GetWeapon(localPlayer)), enemiesArr = Entity.GetEnemies();
    if (!enemiesArr) return;
    uMrt42tnhj = 180
    vecOrigin = Entity.GetProp(localPlayer, 'CBaseEntity', 'm_vecOrigin')
    viewAngles = Global.GetViewAngles();
    for (var i = 0; i < enemiesArr.length; i++) {
        if (!Entity.IsAlive(enemiesArr[i])) continue;
        var vecOrigin = Entity.GetProp(enemiesArr[i], 'CBaseEntity', 'm_vecOrigin'),
            y3F8x63yvb = Math.abs(normalizeYaw(worldToScreen(vecOrigin[0] - vecOrigin[0], vecOrigin[1] - vecOrigin[1]) - viewAngles[1] + 180));
        if (y3F8x63yvb < uMrt42tnhj) {
            uMrt42tnhj = y3F8x63yvb
            bZkq7eyc8k = enemiesArr[i];
        }
    }
    return bZkq7eyc8k;
}
 
function extrapolateTick(ticks) {
    var localPlayer = Entity.GetLocalPlayer(),
        localHeadPos = Entity.GetHitboxPosition(localPlayer, 0),
        localVel = Entity.GetProp(localPlayer, 'CBasePlayer', 'm_vecVelocity\[0\]'),
        extrapolatedPos = [];
    return extrapolatedPos[0] = localHeadPos[0] + localVel[0] * Globals.TickInterval() * ticks, extrapolatedPos[1] = localHeadPos[1] + localVel[1] * Globals.TickInterval() * ticks, extrapolatedPos[2] = localHeadPos[2] + localVel[2] * Globals.TickInterval() * ticks, extrapolatedPos;
}
 
function isExploitCharged() {
    if (Exploit.GetCharge() == 1) return true;
    return false;
}
 
//STRAIGHT OUT OF HVH ESSENTIALS LMAOOOOO
function attemptTwoShotKill(dXm8nmbeef) {
    if (!UI.GetValue(["Rage", "Brightside rage", "Brightside rage", "Better double tap accuracy"])) return false;
 
    if (UI.GetValue(["Rage", "Anti Aim", "Key assignment", "Fake duck"])) return false;
    var localWeapon = Entity.GetName(Entity.GetWeapon(Entity.GetLocalPlayer()));
    if (localWeapon != 'scar 20' && localWeapon != 'g3sg1') return false;
    Ragebot.ForceHitboxSafety(0);
    var cLvs6anps2 = Entity.GetProp(dXm8nmbeef, 'CBasePlayer', 'm_iHealth'),
        d7Qeyanvsw = getClosestEnemyToCrosshair();
    pelvis_pos = Entity.GetHitboxPosition(dXm8nmbeef, 2), body_pos = Entity.GetHitboxPosition(dXm8nmbeef, 3), thorax_pos = Entity.GetHitboxPosition(dXm8nmbeef, 4);
    var pKz4ghbrnb = [0, -1],
        kF65sxpnun = [0, -1],
        KF65sxpnun = [0, -1],
        VEk5kwzgtz = [0, -1];
    result_thorax = Trace.Bullet(Entity.GetLocalPlayer(), dXm8nmbeef, Entity.GetEyePosition(Entity.GetLocalPlayer()), thorax_pos);
    if (dXm8nmbeef = d7Qeyanvsw) dynamicDamage = result_thorax[1];
    if (result_thorax[1] * 2 >= cLvs6anps2 && isExploitCharged() == true) return Ragebot.ForceTargetMinimumDamage(dXm8nmbeef, cLvs6anps2 / 2 + 1), true;
    kF65sxpnun = Trace.Bullet(Entity.GetLocalPlayer(), dXm8nmbeef, Entity.GetEyePosition(Entity.GetLocalPlayer()), pelvis_pos), pKz4ghbrnb = Trace.Bullet(Entity.GetLocalPlayer(), dXm8nmbeef, Entity.GetEyePosition(Entity.GetLocalPlayer()), body_pos);
    if (dXm8nmbeef = d7Qeyanvsw) dynamicDamage = kF65sxpnun[1];
    if (kF65sxpnun[1] * 2 >= cLvs6anps2 && isExploitCharged() == true) return Ragebot.ForceTargetMinimumDamage(dXm8nmbeef, cLvs6anps2 / 2 + 1), true;
    if (dXm8nmbeef = d7Qeyanvsw) dynamicDamage = pKz4ghbrnb[1];
    if (pKz4ghbrnb[1] * 2 >= cLvs6anps2 && isExploitCharged() == true) return Ragebot.ForceTargetMinimumDamage(dXm8nmbeef, cLvs6anps2 / 2 + 1), true;
 
    result_thorax_extrapolated = Trace.Bullet(Entity.GetLocalPlayer(), dXm8nmbeef, extrapolateTick(15), thorax_pos);
    if (dXm8nmbeef = d7Qeyanvsw) dynamicDamage = result_thorax_extrapolated[1];
    if (result_thorax_extrapolated[1] * 2 >= cLvs6anps2 && isExploitCharged() == true) return Ragebot.ForceTargetMinimumDamage(dXm8nmbeef, cLvs6anps2 / 2 + 1), true;
    VEk5kwzgtz = Trace.Bullet(Entity.GetLocalPlayer(), dXm8nmbeef, extrapolateTick(25), pelvis_pos), KF65sxpnun = Trace.Bullet(Entity.GetLocalPlayer(), dXm8nmbeef, extrapolateTick(25), body_pos);
    if (dXm8nmbeef = d7Qeyanvsw) dynamicDamage = VEk5kwzgtz[1];
    if (VEk5kwzgtz[1] * 2 >= cLvs6anps2 && isExploitCharged() == true) {
        return Ragebot.ForceTargetMinimumDamage(dXm8nmbeef, cLvs6anps2 / 2 + 1), true;
    }
    if (dXm8nmbeef = d7Qeyanvsw) dynamicDamage = KF65sxpnun[1];
    if (KF65sxpnun[1] * 2 >= cLvs6anps2 && isExploitCharged() == true) return Ragebot.ForceTargetMinimumDamage(dXm8nmbeef, cLvs6anps2 / 2 + 1), true;
 
    return dynamicDamage = 0, false;
}
 
function getDropdownValue(Clvs6anps2, F9trm78mwl) {
    var H6tzwk68kz = 1 << F9trm78mwl;
    return Clvs6anps2 & H6tzwk68kz ? true : false;
}
 
function isCrouchTerrorist(index) {
    team = Entity.GetProp(index, 'CBasePlayer', 'm_iTeamNum')
    flags = Entity.GetProp(index, 'CBasePlayer', 'm_fFlags');
    if (team == 2 && flags & 1 << 1) return true;
    else return false;
}
 
function isCrouch(index) {
    var flags = Entity.GetProp(index, 'CBasePlayer', 'm_fFlags');
    if (flags & 1 << 1) return true;
    else return false;
}
 
function isSlowwalking(index) {
    var velocity = Entity.GetProp(index, 'CBasePlayer', 'm_vecVelocity\[0\]'),
        totalVelocity = Math.sqrt(velocity[0] * velocity[0] + velocity[1] * velocity[1]);
    if (totalVelocity >= 10 && totalVelocity <= 85) return true;
    else return false;
}
 
function isStanding(index) {
    var velocity = Entity.GetProp(index, 'CBasePlayer', 'm_vecVelocity\[0\]'),
        totalVelocity = Math.sqrt(velocity[0] * velocity[0] + velocity[1] * velocity[1]);
    if (totalVelocity <= 5) return true;
    else return false;
}
 
function isLethal(index) {
    var health = Entity.GetProp(index, 'CBasePlayer', 'm_iHealth');
    pelvis_pos = Entity.GetHitboxPosition(index, 2)
    body_pos = Entity.GetHitboxPosition(index, 3)
    thorax_pos = Entity.GetHitboxPosition(index, 4)
    bodyTrace = [0, -1]
    pelvisTrace = [0, -1]
    extrapolatedBodyTrace = [0, -1]
    extrapolatedPelvisTrace = [0, -1];
    result_thorax = Trace.Bullet(Entity.GetLocalPlayer(), index, Entity.GetEyePosition(Entity.GetLocalPlayer()), thorax_pos);
    if (result_thorax[1] >= health) return true;
    pelvisTrace = Trace.Bullet(Entity.GetLocalPlayer(), index, Entity.GetEyePosition(Entity.GetLocalPlayer()), pelvis_pos)
    bodyTrace = Trace.Bullet(Entity.GetLocalPlayer(), index, Entity.GetEyePosition(Entity.GetLocalPlayer()), body_pos);
    if (pelvisTrace[1] >= health) return true;
    if (bodyTrace[1] >= health) return true;
 
    result_thorax_extrapolated = Trace.Bullet(Entity.GetLocalPlayer(), index, extrapolateTick(20), thorax_pos);
    if (result_thorax_extrapolated[1] >= health) return Ragebot.ForceTargetSafety(index), true;
    extrapolatedPelvisTrace = Trace.Bullet(Entity.GetLocalPlayer(), index, extrapolateTick(25), pelvis_pos)
    extrapolatedBodyTrace = Trace.Bullet(Entity.GetLocalPlayer(), index, extrapolateTick(25), body_pos)
    if (extrapolatedPelvisTrace[1] >= health) return true;
    if (extrapolatedBodyTrace[1] >= health) return true;
 
    return false;
}
 
function safetyOptions() {
    if (!UI.GetValue(["Rage", "Brightside rage", "Brightside rage", "Safety options"])) return;
 
    safetyOptionsEnabled = UI.GetValue(["Rage", "Brightside rage", "Brightside rage", "Safety"]);
    if (getDropdownValue(safetyOptionsEnabled, 0)) {
        Ragebot.ForceHitboxSafety(13);
        Ragebot.ForceHitboxSafety(14);
        Ragebot.ForceHitboxSafety(15);
        Ragebot.ForceHitboxSafety(16);
        Ragebot.ForceHitboxSafety(17);
        Ragebot.ForceHitboxSafety(18);
    }
 
    if (getDropdownValue(safetyOptionsEnabled, 1)) {
        Ragebot.ForceHitboxSafety(7);
        Ragebot.ForceHitboxSafety(8);
        Ragebot.ForceHitboxSafety(9);
        Ragebot.ForceHitboxSafety(10);
    }
 
    if (getDropdownValue(safetyOptionsEnabled, 2)) {
        Ragebot.ForceHitboxSafety(11);
        Ragebot.ForceHitboxSafety(12);
    }
}
 
function forceConditions() {
    if (!UI.GetValue(["Rage", "Brightside rage", "Brightside rage", "Hitscan options"])) return;
    if (UI.GetValue(["Rage", "General", "General", "Key assignment", "Wait for on-shot bt"])) return;
    if (UI.GetValue(["Rage", "General", "General", "Key assignment", "Damage override"])) return;
 
    enemies = Entity.GetEnemies()
    hitscanOptionsEnabled = UI.GetValue(["Rage", "Brightside rage", "Brightside rage", "Hitscan"])
 
    for (i = 0; i < enemies.length; i++) {
        if (!Entity.IsValid(enemies[i])) continue;
        if (!Entity.IsAlive(enemies[i])) continue;
        if (Entity.IsDormant(enemies[i])) continue;
 
        safeTargets[enemies[i]] = false;
        target = Ragebot.GetTarget();
 
        if (attemptTwoShotKill(enemies[i]) == true && UI.GetValue["Rage", "Brightside rage", "Brightside rage", "Better double tap accuracy"]) {
            continue;
        }
 
        /* conditions */
        if (getDropdownValue(hitscanOptionsEnabled, 0) && firedThisTick[enemies[i] == true]) {
            forceHead(enemies[i]);
        }
 
        if (getDropdownValue(hitscanOptionsEnabled, 1) && isInAir(enemies[i]) && (safeTargets[enemies[i]] = true)) {
            Ragebot.ForceTargetSafety(enemies[i]);
        }
 
        if (getDropdownValue(hitscanOptionsEnabled, 2) && isLethal(enemies[i])) {
            if (target == enemies[i]) forceBaim(enemies[i]);
        }
    }
}
 
(function () {
    for (var i in UI) {
        if (!~i.indexOf("Add"))
            continue;
 
        (function (cur) {
            UI[i] = function () {
                cur.apply(this, Array.prototype.slice.call(arguments));
                return arguments[0].concat(arguments[1]);
            }
        }(UI[i]));
    }
})();
 
const math = {
    clamp: function (val, min, max) {
        return Math.min(max, Math.max(min, val));
    }
};
 
const draggable = {
    draggables: [],
 
    create_draggable: function (startingSizeX, startingSizeY, callback) {
        const screenSize = Render.GetScreenSize();
 
        const sliderX = UI.AddSliderInt(["Visuals", "Brightside visuals", "SHEET_MGR", "Brightside visuals"], "_draggable_" + this.draggables.length + "_x", 0, screenSize[0]);
        const sliderY = UI.AddSliderInt(["Visuals", "Brightside visuals", "SHEET_MGR", "Brightside visuals"], "_draggable_" + this.draggables.length + "_y", 0, screenSize[1]);
 
        UI.SetEnabled(sliderX, 0);
        UI.SetEnabled(sliderY, 0);
 
        this.draggables.push({
            pos: [UI.GetValue(sliderX), UI.GetValue(sliderY)],
            size: [startingSizeX, startingSizeY],
 
            isDragging: false,
 
            initialDragPosition: [sliderX, sliderY],
            sliders: [sliderX, sliderY],
 
            callbackFunction: callback,
 
            update: function () {
                const screenSize = Render.GetScreenSize();
                const menuOpened = UI.IsMenuOpen();
 
                if (menuOpened) {
                    if (Input.IsKeyPressed(1)) {
                        const mousePosition = Input.GetCursorPosition();
 
                        if (!this.isDragging && mousePosition[0] >= this.pos[0] && mousePosition[1] >= this.pos[1] && mousePosition[0] <= this.pos[0] + this.size[0] && mousePosition[1] <= this.pos[1] + this.size[1]) {
                            this.isDragging = true;
                            this.initialDragPosition = [mousePosition[0] - this.pos[0], mousePosition[1] - this.pos[1]];
                        } else if (this.isDragging) {
                            this.pos = [math.clamp(mousePosition[0] - this.initialDragPosition[0], 0, screenSize[0]), math.clamp(mousePosition[1] - this.initialDragPosition[1], 0, screenSize[1])];
 
                            for (var i in this.pos) {
                                UI.SetValue(this.sliders[i], this.pos[i]);
                            }
                        }
                    } else if (this.isDragging) {
                        this.isDragging = false;
                        this.initialDragPosition = [0, 0];
                    }
                }
 
                this.callbackFunction.apply(this, [menuOpened]);
            }
        });
    },
 
    updateDraggables: function () {
        for (var i in this.draggables) {
            this.draggables[i].update();
        }
    }
};
 
const hotkeyOnDraw = function () {
    draggable.updateDraggables();
};
 
const hotkeyList = {
    listInternalData: {
        alpha: 0
    }
};
 
var samp = ["Ragebot activation", "Resolver override", "Left direction", "Right direction", "Back direction", "Mouse direction", "AA Direction inverter", "Jitter", "Slow walk", "Edge jump",
    "Thirdperson", "Zoom", "Freecam", "Thirdperson", "Disable Autowall", "Extended backtrack", "Disable autowall"];
 
(function () {
    const addHotkeyToList = function (bindPath) {
        const keys = UI.GetChildren(bindPath);
        for (var i in keys) {
            hotkeyList[keys[i]] = {
                name: keys[i],
                path: bindPath.concat(keys[i]),
                alpha: 0
            }
        }
    };
 
    addHotkeyToList(["Rage", "General", "SHEET_MGR", "General", "Key assignment"]);
    addHotkeyToList(["Rage", "Exploits", "SHEET_MGR", "Key assignment"]);
    addHotkeyToList(["Rage", "Anti Aim", "SHEET_MGR", "Key assignment"]);
    addHotkeyToList(["Misc.", "Keys", "SHEET_MGR", "Key assignment"]);
    addHotkeyToList(["Config", "Scripts", "SHEET_MGR", "Keys", "JS Keybinds"]);
 
    for (var i in samp) {
        hotkeyList[samp[i]] = undefined;
    }
 
})();
 
const keybindModes = {
    "Hold": "[holding]",
    "Toggle": "[toggled]",
    "Always": "[always]"
};
 
draggable.create_draggable(152, 18, function (menuOpened) {
    if (UI.GetValue(["Visuals", "Brightside visuals", "SHEET_MGR", "Brightside visuals", "Hotkey list"])) {
        const localPlayer = Entity.GetLocalPlayer();
        const isAnyHotkeyActive = (function () {
            for (var i in hotkeyList) {
                if (hotkeyList[i] && hotkeyList[i].name && UI.GetValue(hotkeyList[i].path) && keybindModes[UI.GetHotkeyState(hotkeyList[i].path)]) {
                    return true;
                }
            }
            return false;
        })();
 
        const newAlphaValue = Globals.Frametime() * 8 * ((menuOpened || Entity.IsValid(localPlayer) && isAnyHotkeyActive) ? 1 : -1);
        hotkeyList.listInternalData.alpha = math.clamp(hotkeyList.listInternalData.alpha + newAlphaValue, 0, 1);
 
        if (hotkeyList.listInternalData.alpha > 0) {
            const hotkeyListAccent = UI.GetColor(["Visuals", "Brightside visuals", "SHEET_MGR", "Brightside visuals", "Hotkey list accent"]);
            const hotkeyTitleFont = Render.AddFont("Verdana", 10, 900);
 
            const renderPosition = [this.pos[0], this.pos[1]];
 
            Render.FilledRect(renderPosition[0], renderPosition[1] + 2, this.size[0], this.size[1] + 6, [10, 6, 2, 150]);
            Render.FilledRect(renderPosition[0], renderPosition[1], this.size[0], 2, [hotkeyListAccent[0], hotkeyListAccent[1], hotkeyListAccent[2], 200]);
            Render.String(renderPosition[0] + this.size[0] / 2, renderPosition[1] + this.size[1] / 5 - 2, 1, "active keys", [0, 0, 0, 255], hotkeyTitleFont);
            Render.String(renderPosition[0] + this.size[0] / 2, renderPosition[1] + this.size[1] / 5 - 1, 1, "active keys", [233, 230, 229, 255], hotkeyTitleFont);
 
            Render.GradientRect(renderPosition[0] + 75, renderPosition[1] + 18, this.size[0] / 2.5, 1, 1, [hotkeyListAccent[0], hotkeyListAccent[1], hotkeyListAccent[2], 255], [hotkeyListAccent[0], hotkeyListAccent[1], hotkeyListAccent[2], 0]);
            Render.GradientRect(renderPosition[0] + 75, renderPosition[1] + 19, this.size[0] / 2.5, 1, 1, [hotkeyListAccent[0], hotkeyListAccent[1], hotkeyListAccent[2], 255], [hotkeyListAccent[0], hotkeyListAccent[1], hotkeyListAccent[2], 0]);
 
            Render.GradientRect(renderPosition[0] + 19, renderPosition[1] + 18, this.size[0] / 2.5, 1, 1, [hotkeyListAccent[0], hotkeyListAccent[1], hotkeyListAccent[2], 0], [hotkeyListAccent[0], hotkeyListAccent[1], hotkeyListAccent[2], 255]);
            Render.GradientRect(renderPosition[0] + 19, renderPosition[1] + 19, this.size[0] / 2.5, 1, 1, [hotkeyListAccent[0], hotkeyListAccent[1], hotkeyListAccent[2], 0], [hotkeyListAccent[0], hotkeyListAccent[1], hotkeyListAccent[2], 255]);
 
            renderPosition[1] += this.size[1];
 
            if (!menuOpened) {
                const hotkeyFont = Render.AddFont("Verdana", 10, 900);
 
                for (var i in hotkeyList) {
                    if (hotkeyList[i] && hotkeyList[i].name) {
                        const active = UI.GetValue(hotkeyList[i].path);
                        const mode = keybindModes[UI.GetHotkeyState(hotkeyList[i].path)];
                        const alphaAdditive = Globals.Frametime() * 8 * ((active && !!mode) ? 1 : -1);
 
                        hotkeyList[i].alpha = math.clamp(hotkeyList[i].alpha + alphaAdditive, 0, 1);
                        if (hotkeyList[i].alpha > 0) {
                            renderPosition[1] += 6;
                            const measuredName = Render.TextSize(i, hotkeyFont);
                            const measuredMode = Render.TextSize(mode, hotkeyFont);
 
                            if (!active && hotkeyList[i].alpha < 0.15) {
                                renderPosition[1] -= measuredName[1] * hotkeyList[i].alpha * Math.abs(alphaAdditive) * 7.5;
                            }
 
                            Render.FilledRect(renderPosition[0], renderPosition[1] + 2, this.size[0], this.size[1] - 2, [10, 6, 2, hotkeyList[i].alpha * 150]);
 
                            Render.String(renderPosition[0] + 4, renderPosition[1] + 1, 0, i.toLowerCase(), [0, 0, 0, hotkeyList[i].alpha * 255], hotkeyTitleFont)
                            Render.String(renderPosition[0] + 4, renderPosition[1], 0, i.toLowerCase(), [233, 230, 229, hotkeyList[i].alpha * 255], hotkeyTitleFont);
 
                            Render.String(renderPosition[0] + this.size[0] - 4 - measuredMode[0], renderPosition[1] + 1, 0, mode, [0, 0, 0, hotkeyList[i].alpha * 255], hotkeyTitleFont);
                            Render.String(renderPosition[0] + this.size[0] - 4 - measuredMode[0], renderPosition[1], 0, mode, [233, 230, 229, hotkeyList[i].alpha * 255], hotkeyTitleFont);
 
                            if (hotkeyList[i].alpha > 0.15) {
                                renderPosition[1] += measuredName[1]
                            }
                        }
                    }
                }
            }
        }
    }
});
 
function rect(x, y, w, h, dir, color1, color2) {
    Render.GradientRect(x - Math.round(w / 2), y - Math.round(h / 2), w, h, dir, color1, color2);
}
 
var startX = Render.GetScreenSize()[0] / 2;
var startY = Render.GetScreenSize()[1] / 2;
 
localplayer_index = Entity.GetLocalPlayer();
localplayer_alive = Entity.IsAlive(localplayer_index);
 
function customScope() {
    if (!Entity.IsValid(Entity.GetLocalPlayer())) return;
    if (!Entity.IsAlive(Entity.GetLocalPlayer())) return;
 
    var sizeX = 190;
    var sizeY = 2;
    var off = sizeX / 2 + 20;
    var c2 = [150, 200, 255, 255];
    var c1 = [150, 0, 200, 0];
 
    if (UI.GetValue(["Visuals", "Brightside visuals", "SHEET_MGR", "Brightside visuals", "Custom scope"]) && localplayer_alive && Entity.GetProp(Entity.GetLocalPlayer(), "CCSPlayer", "m_bIsScoped")) {
        rect(startX - off, startY, sizeX, sizeY, 1, c1, c2);
        rect(startX + off, startY, sizeX, sizeY, 1, c2, c1);
        rect(startX, startY - off, sizeY, sizeX, 0, c1, c2);
        rect(startX, startY + off, sizeY, sizeX, 0, c2, c1);
    }
}
 
var positions = [];
var trace = [];
var render = [];
var local = Entity.GetLocalPlayer();
 
function Clamp(v, min, max) {
    return Math.max(Math.min(v, max), min);
}
 
render.arc = function (x, y, r1, r2, s, d, col) {
    for (var i = s; i < s + d; i++) {
 
        var rad = i * Math.PI / 180;
 
        Render.Line(x + Math.cos(rad) * r1, y + Math.sin(rad) * r1, x + Math.cos(rad) * r2, y + Math.sin(rad) * r2, col);
    }
}
 
function ImportGrenades() {
    var grenades = Entity.GetEntitiesByClassID(9).concat(Entity.GetEntitiesByClassID(113).concat(Entity.GetEntitiesByClassID(100)));
    for (e in grenades) {
        pass = false;
        for (g in positions) {
            if (positions[g][0] == grenades[e]) {
                pass = true;
                continue;
            }
        }
        if (pass)
            continue;
 
        positions.push([grenades[e], Globals.Curtime(), [Entity.GetRenderOrigin(grenades[e])], Globals.Curtime()]);
    }
}
 
// pasted from april LMAO
 
function GrenadeWarning() {
    var grenades = Entity.GetEntitiesByClassID(9).concat(Entity.GetEntitiesByClassID(113).concat(Entity.GetEntitiesByClassID(100)));
    if (UI.GetValue(["Visuals", "Brightside visuals", "SHEET_MGR", "Brightside visuals", "Grenade warning"]) == 1) {
        if (!Entity.IsAlive(local))
            return;
 
        for (g in grenades) {
            for (var i = 0; i < grenades.length; i++) {
                var g = grenades[i];
                var isInferno = Entity.GetClassID(g) === 100;
                var isHeGrenade = Entity.GetClassID(g) === 9;
                var isMolotov = Entity.GetClassID(g) === 113;
                var DistanceInFeet = function (origin, destination) {
                    var sub = [destination[0] - origin[0], destination[1] - origin[1], destination[2] - origin[2]];
                    return Math.round(Math.sqrt(sub[0] ** 2 + sub[1] ** 2 + sub[2] ** 2) / 12);
                }
                var destination = Entity.GetRenderOrigin(g);
                var origin = Entity.GetEyePosition(local);
                var s = Render.WorldToScreen(origin);
                var distance = DistanceInFeet(origin, destination);
                var screen = Render.WorldToScreen(destination);
                var isSafe = distance > (isInferno ? 15 : 20) || trace[1] < 0.61;
 
                if (distance > 256) {
                    continue;
                }
 
                if (isHeGrenade && Entity.GetProp(g, "CBaseCSGrenadeProjectile", "m_nExplodeEffectTickBegin")) {
                    continue;
                }
 
                if (isMolotov || Entity.GetProp(g, "CBaseCSGrenadeProjectile", "m_nExplodeEffectTickBegin")) {
                    continue;
                }
 
                const font = Render.AddFont("Tahoma", 10, 700);
                const fontArrow = Render.AddFont("Tahoma", 24, 700);
 
                Render.FilledCircle(screen[0], screen[1] - 50, 23, [30, 25, 22, 200])
                Render.FilledCircle(screen[0], screen[1] - 50, 22, !isSafe ? [204, 48, 14, 220] : [30, 25, 22, 200])
                Render.String(screen[0], screen[1] - 73, 1, "!", [252, 240, 3, 255], fontArrow);
                Render.String(screen[0], screen[1] - 46, 1, distance + " ft", [0, 0, 0, 200], font);
                Render.String(screen[0], screen[1] - 45, 1, distance + " ft", [232, 232, 232, 200], font);
            }
        }
    }
}
 
function grenadeWarningOnDraw() {
    ImportGrenades();
    GrenadeWarning();
}
 
function Watermark() {
    if (!UI.GetValue(["Visuals", "Brightside visuals", "SHEET_MGR", "Brightside visuals", "Watermark"])) return;
 
    screenSize = Render.GetScreenSize();
 
    /* text related */
    var date = new Date(),
        dateHours = date.getHours(),
        dateMinutes = date.getMinutes(),
        dateSeconds = date.getSeconds(),
        timeHours = dateHours <= 9 ? '0' + dateHours + ':' : dateHours + ':',
        timeMinutes = dateMinutes <= 9 ? '0' + dateMinutes + ':' : dateMinutes + ':',
        timeSeconds = dateSeconds <= 9 ? '0' + dateSeconds : dateSeconds;
 
    var username = Cheat.GetUsername();
    var text = username + ' | brightside | ' + timeHours + timeMinutes + timeSeconds;
    var font = Render.AddFont('Verdana', 10, 900);
 
    const stringSize = Render.TextSize(text, font);
    const renderPosition = [Render.GetScreenSize()[0] - stringSize[0] - 15, 10];
 
    const samp = Math.abs(stringSize[0] + 8) + renderPosition[0] - 19;
 
    const hotkeyListAccent = UI.GetColor(["Visuals", "Brightside visuals", "SHEET_MGR", "Brightside visuals", "Hotkey list accent"]);
 
    /* background */
    Render.FilledRect(renderPosition[0] - 1, renderPosition[1] - 2, stringSize[0] + 8, 18, [10, 6, 2, 150]);
 
    /* left corner */
    Render.GradientRect(renderPosition[0] - 3, renderPosition[1] + 14, 20, 2, 1, [hotkeyListAccent[0], hotkeyListAccent[1], hotkeyListAccent[2], 255], [hotkeyListAccent[0], hotkeyListAccent[1], hotkeyListAccent[2], 50]);
    Render.GradientRect(renderPosition[0] - 3, renderPosition[1] - 2, 2, 16, 0, [hotkeyListAccent[0], hotkeyListAccent[1], hotkeyListAccent[2], 50], [hotkeyListAccent[0], hotkeyListAccent[1], hotkeyListAccent[2], 255]);
 
    /* right corner */
    Render.GradientRect(samp, renderPosition[1] - 2, 20, 2, 1, [hotkeyListAccent[0], hotkeyListAccent[1], hotkeyListAccent[2], 50], [hotkeyListAccent[0], hotkeyListAccent[1], hotkeyListAccent[2], 255]);
    Render.GradientRect(samp + 18, renderPosition[1], 2, 16, 0, [hotkeyListAccent[0], hotkeyListAccent[1], hotkeyListAccent[2], 255], [hotkeyListAccent[0], hotkeyListAccent[1], hotkeyListAccent[2], 50]);
 
    Render.String(renderPosition[0] + 3, renderPosition[1] - 1, 0, text, [233, 230, 229, 255], font);
}
 
function Draw() {
    if (UI.IsMenuOpen()) {
        UI.SetEnabled(['Rage', 'Brightside rage', 'Brightside rage', 'Hitscan'], UI.GetValue(["Rage", "Brightside rage", "Brightside rage", "Hitscan options"]));
        UI.SetEnabled(['Rage', 'Brightside rage', 'Brightside rage', 'Safety'], UI.GetValue(["Rage", "Brightside rage", "Brightside rage", "Safety options"]));
        UI.SetEnabled(['Rage', 'Brightside rage', 'Brightside rage', 'In air hitchance'], UI.GetValue(["Rage", "Brightside rage", "Brightside rage", "In air options"]));
        UI.SetEnabled(['Rage', 'Brightside rage', 'Brightside rage', 'No scope hitchance'], UI.GetValue(["Rage", "Brightside rage", "Brightside rage", "No scope options"]));
    }
 
    /* in air options */
    inAirHitchance = UI.GetValue(["Rage", "Brightside rage", "Brightside rage", "In air hitchance"]);
    inAirOptions = UI.GetValue(["Rage", "Brightside rage", "Brightside rage", "In air options"]);
 
    getDropdownValue(inAirHitchance, 0) && inAirOptions ? UI.SetEnabled(['Rage', 'Brightside rage', 'Brightside rage', 'AWP in air hitchance'], 1) : UI.SetEnabled(['Rage', 'Brightside rage', 'Brightside rage', 'AWP in air hitchance'], 0);
    getDropdownValue(inAirHitchance, 1) && inAirOptions ? UI.SetEnabled(['Rage', 'Brightside rage', 'Brightside rage', 'Scout in air hitchance'], 1) : UI.SetEnabled(['Rage', 'Brightside rage', 'Brightside rage', 'Scout in air hitchance'], 0);
    getDropdownValue(inAirHitchance, 2) && inAirOptions ? UI.SetEnabled(['Rage', 'Brightside rage', 'Brightside rage', 'Revolver in air hitchance'], 1) : UI.SetEnabled(['Rage', 'Brightside rage', 'Brightside rage', 'Revolver in air hitchance'], 0);
 
    /* no scope options */
    _noScopeHitchance = UI.GetValue(["Rage", "Brightside rage", "Brightside rage", "No scope hitchance"]);
    noScopeOptions = UI.GetValue(["Rage", "Brightside rage", "Brightside rage", "No scope options"]);
 
    getDropdownValue(_noScopeHitchance, 0) && noScopeOptions ? UI.SetEnabled(['Rage', 'Brightside rage', 'Brightside rage', 'Auto no scope hitchance'], 1) : UI.SetEnabled(['Rage', 'Brightside rage', 'Brightside rage', 'Auto no scope hitchance'], 0);
    getDropdownValue(_noScopeHitchance, 1) && noScopeOptions ? UI.SetEnabled(['Rage', 'Brightside rage', 'Brightside rage', 'Scout no scope hitchance'], 1) : UI.SetEnabled(['Rage', 'Brightside rage', 'Brightside rage', 'Scout no scope hitchance'], 0);
    getDropdownValue(_noScopeHitchance, 2) && noScopeOptions ? UI.SetEnabled(['Rage', 'Brightside rage', 'Brightside rage', 'AWP no scope hitchance'], 1) : UI.SetEnabled(['Rage', 'Brightside rage', 'Brightside rage', 'AWP no scope hitchance'], 0);
 
    autoStraferCorrection();
    drawIndicators();
    hotkeyOnDraw();
    grenadeWarningOnDraw();
    customScope();
    Watermark();
}
 
function createMove() {
    if (!Entity.IsValid(Entity.GetLocalPlayer())) return;
    if (!Entity.IsAlive(Entity.GetLocalPlayer())) return;
 
    idealYaw();
    fasterDoubleTap();
    instantRecharge();
    legMovement();
    legitAA();
    lowDelta();
    setHitchanceInAir();
    forceConditions();
    noScopeHitchance();
    waitForOnShotBacktrack();
    overrideMinimumDamage();
    safetyOptions();
    freestandingOnKey();
    tehnologie2022();
}
 
function fogxkycp6v() {
 
    for (i = 0; i < 64; i++) {
        safeTargets[i] = false;
    }
 
    Cheat.RegisterCallback("Draw", "Draw");
    Cheat.RegisterCallback("CreateMove", "createMove");
    Cheat.RegisterCallback("CreateMove", "clanTag");
    Cheat.RegisterCallback("Unload", "fasterDoubleTapUnload");
    Cheat.RegisterCallback("player_hurt", "playerHurt");
    Cheat.RegisterCallback("bullet_impact", "onBulletImpact");
    Cheat.RegisterCallback("ragebot_fire", "ragebotLogs");
    Cheat.RegisterCallback('round_start', 'clearData');
}

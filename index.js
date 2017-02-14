'use strict';
/**
 * @file cookie-encryption main
 * @module cookie-encryption
 * @version 1.6.0
 * @author hex7c0 <hex7c0@gmail.com>
 * @copyright hex7c0 2014
 * @license GPLv3
 */

/*
 * initialize module
 */
var arc4 = require('arc4');
var autokey = require('autokey');
var crypto = require('crypto');
var inherits = require('util').inherits;
var getCipher = new Array([ 'arc4', 'rc4a', 'vmpc', 'rc4+' ], crypto
    .getCiphers(), crypto.getHashes(), [ 'modp1', 'modp2', 'modp5', 'modp14',
  'modp15', 'modp16', 'modp17', 'modp18' ], [ 'pbkdf2' ], [ 'autokey' ]);

/*
 * class
 */
/**
 * Main class
 * 
 * @class Main
 * @param {Object} my - user option
 * @return {Object}
 */
function Main(my) {

  this._my = my;
  this.cookie = my.cookie;
  this.encoding = my.encoding;
  this.decrypt = null;
  this.encrypt = null;
  this._cipher = null;
  this.cache = {
    read: new Object(null),
    write: new Object(null)
  };
}

/**
 * flush data cache
 * 
 * @function flush
 */
Main.prototype.flush = function() {

  this.cache = {
    read: new Object(null),
    write: new Object(null)
  };
  return;
};

/**
 * customization for class
 * 
 * @function customization
 * @param {Boolean} signed - if signed class
 */
Main.prototype.customization = function(signed) {

  var my = this._my;
  if (my.cipher === getCipher[4][0]) { // pbkdf2
    this.encrypt = function(data, encoding) {

      return crypto
          .pbkdf2Sync(my.cipher, my.extra[0], my.extra[1], my.extra[2])
          .toString(encoding || this.encoding);
    };
    this.decrypt = function() {

      throw new TypeError('Pbkdf2 not supported');
    };

  } else if (my.cipher === getCipher[5][0]) { // autokey
    this._cipher = autokey(my.secret);
    this.encrypt = function(data, encoding) {

      if (typeof (data) === 'string') {
        return this._cipher.encodeString(data, 'utf8', encoding
          || this.encoding);
      }
      if (Buffer.isBuffer(data)) {
        return this._cipher.encodeBuffer(data).toString(
          encoding || this.encoding);
      }
      throw new TypeError('Not a string or buffer');
    };
    this.decrypt = function(data, encoding) {

      if (typeof (data) === 'string') {
        return this._cipher.decodeString(data, encoding || this.encoding);
      }
      throw new TypeError('Not a string or buffer');
    };

  } else if (getCipher[0].indexOf(my.cipher) >= 0) { // arc4
    this._cipher = arc4(my.cipher, my.secret);
    this.encrypt = function(data, encoding) {

      if (typeof (data) === 'string') {
        return this._cipher.encodeString(data, 'utf8', encoding
          || this.encoding);
      }
      if (Buffer.isBuffer(data)) {
        return this._cipher.encodeBuffer(data).toString(
          encoding || this.encoding);
      }
      throw new TypeError('Not a string or buffer');
    };
    this.decrypt = function(data, encoding) {

      if (typeof (data) === 'string') {
        return this._cipher.decodeString(data, encoding || this.encoding);
      }
      throw new TypeError('Not a string or buffer');
    };

  } else if (getCipher[1].indexOf(my.cipher) >= 0) { // ciphers
    this.encrypt = function(data, encoding) {

      var encode = encoding || this.encoding;
      var cipher = crypto.createCipher(my.cipher, my.secret);
      return cipher.update(data, 'utf8', encode) + cipher.final(encode);
    };
    this.decrypt = function(data, encoding) {

      var cipher = crypto.createDecipher(my.cipher, my.secret);
      return cipher.update(data, encoding || this.encoding) + cipher.final();
    };

  } else if (getCipher[2].indexOf(my.cipher) >= 0) {
    if (my.extra[0] === undefined) { // hash
      this.encrypt = function(data, encoding) {

        var cipher = crypto.createHash(my.cipher);
        return cipher.update(data).digest(encoding || this.encoding);
      };
      this.decrypt = function() {

        throw new TypeError('Hash not supported');
      };

    } else { // hmac
      this.encrypt = function(data, encoding) {

        var cipher = crypto.createHmac(my.cipher, my.secret);
        return cipher.update(data).digest(encoding || this.encoding);
      };
      this.decrypt = function() {

        throw new TypeError('Hmac not supported');
      };
    }

  } else if (getCipher[3].indexOf(my.cipher) >= 0) { // DiffieHellman
    this.encrypt = function(data, encoding) {

      var cipher = crypto.getDiffieHellman(my.cipher);
      return cipher.generateKeys().toString(encoding || this.encoding);
    };
    this.decrypt = function() {

      throw new TypeError('DiffieHellman not supported');
    };

  } else {
    throw new TypeError('Cipher not supported');
  }

  /**
   * set data to cookie
   * 
   * @function set
   * @param {Object} res - response to client
   * @param {String} data - string for cookie
   * @param {String} [cookie] - fast cookie
   * @return {String}
   */
  this.set = function(res, data, cookie) {

    var my = this._my;
    return res.cookie(cookie || this.cookie, data, {
      domain: my.domain,
      path: my.path,
      maxAge: my.maxAge,
      httpOnly: my.httpOnly,
      secure: my.secure,
      signed: signed
    }), data;
  };
  return;
};

/*
 * inherits
 */

/**
 * Signed class
 * 
 * @class Signed
 * @param {Object} my - user option
 * @return {Object}
 */
function Signed(my) {

  Main.call(this, my);
  this.customization(true);
}
inherits(Signed, Main);
/**
 * Normal class
 * 
 * @class Normal
 * @param {Object} my - user option
 * @return {Object}
 */
function Normal(my) {

  Main.call(this, my);
  this.customization(false);
}
inherits(Normal, Main);

/**
 * Decrypt information on signed cookie
 * 
 * @function read
 * @param {Object} req - client request
 * @param {String} [cookie] - fast cookie
 * @param {String} [encoding] - fast encoding
 * @return {String}
 */
Signed.prototype.read = function(req, cookie, encoding) {

  var ck, o;
  if (req.signedCookies === undefined
    || (ck = req.signedCookies[cookie || this.cookie]) === undefined) {
    return '';
    /**
     * @todo req.headers.cookie
     */
  }
  if ((o = this.cache.read[ck]) === undefined) {
    o = this.cache.read[ck] = this.decrypt(ck, encoding);
  }
  return o;
};
/**
 * Decrypt information on cookie
 * 
 * @function read
 * @param {Object} req - client request
 * @param {String} [cookie] - fast cookie
 * @param {String} [encoding] - fast encoding
 * @return {String}
 */
Normal.prototype.read = function(req, cookie, encoding) {

  var ck, o;
  if (req.cookies === undefined
    || (ck = req.cookies[cookie || this.cookie]) === undefined) {
    return '';
    /**
     * @todo req.headers.cookie
     */
  }
  if ((o = this.cache.read[ck]) === undefined) {
    o = this.cache.read[ck] = this.decrypt(ck, encoding);
  }
  return o;
};

/**
 * Encrypt information on signed cookie
 * 
 * @function write
 * @param {Object} req - client request
 * @param {String} data - data to write on cookie
 * @param {String} [cookie] - fast cookie
 * @param {String} [encoding] - fast encoding
 */
Signed.prototype.write = function(req, data, cookie, encoding) {

  var o;
  var ck = cookie || this.cookie;
  if ((o = this.cache.write[data]) === undefined) {
    o = this.cache.write[data] = this.encrypt(data, encoding);
  }
  if (req.signedCookies[ck] !== o) {
    req.signedCookies[ck] = this.set(req.res, o, cookie);
  }
  return o;
};
/**
 * Encrypt information on cookie
 * 
 * @function write
 * @param {Object} req - client request
 * @param {String} data - data to write on cookie
 * @param {String} [cookie] - fast cookie
 * @param {String} [encoding] - fast encoding
 */
Normal.prototype.write = function(req, data, cookie, encoding) {

  var o;
  var ck = cookie || this.cookie;
  if ((o = this.cache.write[data]) === undefined) {
    o = this.cache.write[data] = this.encrypt(data, encoding);
  }
  if (req.cookies[ck] !== o) {
    req.cookies[ck] = this.set(req.res, o, cookie);
  }
  return o;
};

/*
 * functions
 */
/**
 * options setting
 * 
 * @exports cookiee
 * @function cookiee
 * @param {String} secret - user password
 * @param {Object} [opt] - various options. Check README.md
 * @return {Object}
 */
function cookiee(secret, opt) {

  if (!secret) {
    throw new TypeError('secret required');
  }
  var options = opt || Object.create(null);
  var my = {
    secret: Buffer.isBuffer(secret) ? secret : new Buffer(secret),
    cipher: String(options.cipher || 'arc4'),
    cookie: String(options.cookie || 'vault'),
    domain: String(options.domain || ''),
    path: String(options.path || '/'),
    maxAge: Number(options.maxAge) || 1000 * 3600 * 24 * 365,
    httpOnly: Boolean(options.httpOnly),
    secure: Boolean(options.secure),
    signed: Boolean(options.signed),
    encoding: String(options.encoding || 'hex'),
    extra: Array.isArray(options.extra) === true ? options.extra : []
  };

  return Boolean(options.signed) ? new Signed(my) : new Normal(my);
}
module.exports = cookiee;

/**
 * get supported ciphers
 * 
 * @exports getCiphers
 * @function getCiphers
 * @return {Array}
 */
function getCiphers() {

  return getCipher;
}
module.exports.getCiphers = getCiphers;

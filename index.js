"use strict";
/**
 * @file cookie-encryption main
 * @module cookie-encryption
 * @package cookie-encryption
 * @subpackage main
 * @version 1.0.0
 * @author hex7c0 <hex7c0@gmail.com>
 * @copyright hex7c0 2014
 * @license GPLv3
 */

/*
 * initialize module
 */
// import
try {
    var arc4;
    var autokey;
    var crypto = require('crypto');
    var getCiphers = [ [ 'arc4', 'rc4a', 'vmpc', 'rc4+' ], crypto.getCiphers() ];
} catch (MODULE_NOT_FOUND) {
    console.error(MODULE_NOT_FOUND);
    process.exit(1);
}

/*
 * class
 */
/**
 * SIGNED class
 * 
 * @class SIGNED
 * @param {Object} my - user option
 * @return {Object}
 */
function SIGNED(my) {

    this.my = my;
    this.cookie = my.cookie;
    this.encoding = my.encoding;
    this.cache = {
        read: {},
        write: {}
    };
    this.customization(true);
}
/**
 * NORMAL class
 * 
 * @class NORMAL
 * @param {Object} my - user option
 * @return {Object}
 */
function NORMAL(my) {

    this.my = my;
    this.cookie = my.cookie;
    this.encoding = my.encoding;
    this.cache = {
        read: new Array(''),
        write: new Array('')
    };
    this.customization(false);
}

/**
 * customization for class
 * 
 * @function customization
 * @param {Boolean} signed - if signed class
 */
SIGNED.prototype.customization = NORMAL.prototype.customization = function(
                                                                           signed) {

    var my = this.my;
    if (my.cipher === 'autokey') {
        if (!autokey) { // lazy load
            autokey = require('autokey');
        }
        this.cipher = autokey(my.secret);
        this.encrypt = function(data) {

            return this.cipher.encode(data, 'utf8', this.encoding);
        };
        this.decrypt = function(data) {

            return this.cipher.decode(data, this.encoding);
        };
    } else if (getCiphers[0].indexOf(my.cipher) >= 0) {
        if (!arc4) { // lazy load
            arc4 = require('arc4');
        }
        this.cipher = arc4(my.cipher, my.secret);
        this.encrypt = function(data) {

            return this.cipher.encode(data, 'utf8', this.encoding);
        };
        this.decrypt = function(data) {

            return this.cipher.decode(data, this.encoding);
        };
    } else if (getCiphers[1].indexOf(my.cipher) >= 0) {
        this.encrypt = function(data) {

            var cipher = crypto.createCipher(my.cipher, my.secret);
            cipher.update(data, 'utf8');
            return cipher.final(this.encoding);
        };
        this.decrypt = function(data) {

            var cipher = crypto.createDecipher(my.cipher, my.secret);
            cipher.update(data, this.encoding);
            return cipher.final('utf8');
        };
    } else {
        throw new TypeError('cipher not supported');
    }

    /**
     * set data to cookie
     * 
     * @function set
     * @param {Object} res - response to client
     * @param {String} data - string for cookie
     * @return {String}
     */
    this.set = function(res, data) {

        var my = this.my;
        return res.cookie(this.cookie, data, {
            domain: my.domain,
            path: my.path,
            maxAge: my.age,
            httpOnly: my.httpOnly,
            secure: my.secure,
            signed: signed
        }), data;
    };
    return;
};

/**
 * Decrypt information on signed cookie
 * 
 * @function read
 * @param {Object} req - client request
 * @return {String}
 */
SIGNED.prototype.read = function(req) {

    var ck;
    if (req.signedCookies === undefined
            || !(ck = req.signedCookies[this.cookie])) {
        return '';
        /**
         * @todo req.headers.cookie
         */
    }
    try {
        if (this.cache.read[0] === ck) {
            return this.cache.read[0];
        }
        return this.cache.read[0] = this.decrypt(ck);
    } catch (TypeError) {
        return '';
    }
};
/**
 * Decrypt information on cookie
 * 
 * @function read
 * @param {Object} req - client request
 * @return {String}
 */
NORMAL.prototype.read = function(req) {

    var ck;
    if (req.cookies === undefined || !(ck = req.cookies[this.cookie])) {
        return '';
        /**
         * @todo req.headers.cookie
         */
    }
    try {
        if (this.cache.read[0] === ck) {
            return this.cache.read[0];
        }
        return this.cache.read[0] = this.decrypt(ck);
    } catch (TypeError) {
        return '';
    }
};

/**
 * Encrypt information on signed cookie
 * 
 * @function write
 * @param {Object} req - client request
 * @param {String} data - data to write on cookie
 */
SIGNED.prototype.write = function(req, data) {

    var out;
    if (this.cache.write[0] === data) {
        out = this.cache.write[0];
    } else {
        out = this.cache.write[0] = this.encrypt(data);
    }
    if (req.signedCookies[this.cookie] !== out) {
        var res = req.res;
        req.signedCookies[this.cookie] = this.set(res, out);
    }
    return out;
};
/**
 * Encrypt information on cookie
 * 
 * @function write
 * @param {Object} req - client request
 * @param {String} data - data to write on cookie
 */
NORMAL.prototype.write = function(req, data) {

    var out;
    if (this.cache.write[0] === data) {
        out = this.cache.write[0];
    } else {
        out = this.cache.write[0] = this.encrypt(data);
    }
    if (req.cookies[this.cookie] !== out) {
        var res = req.res;
        req.cookies[this.cookie] = this.set(res, out);
    }
    return out;
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
 * @param {Object} [options] - various options. Check README.md
 * @return {Object}
 */
module.exports = function cookiee(secret, options) {

    if (!secret) {
        throw new TypeError('secret required');
    }
    var options = options || Object.create(null);
    var my = {
        secret: String(secret),
        cipher: String(options.cipher || 'arc4'),
        cookie: String(options.cookie || 'vault'),
        domain: String(options.domain || ''),
        path: String(options.path || '/'),
        age: Number(options.age) || 1000 * 3600 * 24 * 365,
        httpOnly: Boolean(options.httpOnly),
        secure: Boolean(options.secure),
        signed: Boolean(options.signed),
        encoding: String(options.encoding || 'hex')
    };

    if (Boolean(options.signed)) {
        return new SIGNED(my);
    }
    return new NORMAL(my);
};

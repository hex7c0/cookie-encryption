"use strict";
/**
 * @file cookie-encryption main
 * @module cookie-encryption
 * @package cookie-encryption
 * @subpackage main
 * @version 0.0.1
 * @author hex7c0 <hex7c0@gmail.com>
 * @copyright hex7c0 2014
 * @license GPLv3
 */

/*
 * initialize module
 */
// import
try {
    var arc4 = require('arc4');
    var autokey = require('autokey');
    var crypto = require('crypto');
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
    this.ck = my.cookie;
    this.cipher;

    if (my.cipher === 'arc4') {
        this.cipher = arc4(my.secret);
        this.encrypt = function(data) {

            return this.cipher.codeString(data, 'utf8', my.output);
        };
        this.decrypt = function(data) {

            return this.cipher.codeString(data, my.output);
        };
    } else if (my.cipher === 'autokey') {
        this.cipher = autokey(my.secret);
        this.encrypt = function(data) {

            return this.cipher.encodeString(data, 'utf8', my.output);
        };
        this.decrypt = function(data) {

            return this.cipher.decodeString(data, my.output);
        };
    } else if (crypto.getCiphers().indexOf(my.cipher) >= 0) {
        this.encrypt = function(data) {

            var cipher = crypto.createCipher(my.cipher, my.secret);
            cipher.update(data, 'utf8');
            return cipher.final(my.output);
        };
        this.decrypt = function(data) {

            var cipher = crypto.createDecipher(my.cipher, my.secret);
            cipher.update(data, my.output);
            return cipher.final('utf8');
        };
    } else {
        throw new TypeError('cipher not supported');
    }

    /**
     * set data to signed cookie
     * 
     * @function set
     * @param {Object} res - response to client
     * @param {String} data - string for cookie
     * @return {String}
     */
    this.set = function(res, data) {

        my = this.my;
        return res.cookie(this.ck, data, {
            domain: my.domain,
            path: my.path,
            maxAge: my.age,
            httpOnly: my.httpOnly,
            secure: my.secure,
            signed: true
        }), data;
    };
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
    this.ck = my.cookie;
    this.cipher;

    if (my.cipher === 'arc4') {
        this.cipher = arc4(my.secret);
        this.encrypt = function(data) {

            return this.cipher.codeString(data, 'utf8', my.output);
        };
        this.decrypt = function(data) {

            return this.cipher.codeString(data, my.output);
        };
    } else if (my.cipher === 'autokey') {
        this.cipher = autokey(my.secret);
        this.encrypt = function(data) {

            return this.cipher.encodeString(data, 'utf8', my.output);
        };
        this.decrypt = function(data) {

            return this.cipher.decodeString(data, my.output);
        };
    } else if (crypto.getCiphers().indexOf(my.cipher) >= 0) {
        this.encrypt = function(data) {

            var cipher = crypto.createCipher(my.cipher, my.secret);
            cipher.update(data, 'utf8');
            return cipher.final(my.output);
        };
        this.decrypt = function(data) {

            var cipher = crypto.createDecipher(my.cipher, my.secret);
            cipher.update(data, my.output);
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
        return res.cookie(this.ck, data, {
            domain: my.domain,
            path: my.path,
            maxAge: my.age,
            httpOnly: my.httpOnly,
            secure: my.secure,
            signed: false
        }), data;
    };
}

/**
 * Decrypt information on signed cookie
 * 
 * @function read
 * @param {Object} req - client request
 * @return {String}
 */
SIGNED.prototype.read = function(req) {

    var ck;
    if (req.signedCookies === undefined || !(ck = req.signedCookies[this.ck])) {
        return '';
        /**
         * @todo req.headers.cookie
         */
    }
    return this.decrypt(ck);
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
    if (req.cookies === undefined || !(ck = req.cookies[this.ck])) {
        return '';
        /**
         * @todo req.headers.cookie
         */
    }
    return this.decrypt(ck);
};

/**
 * Encrypt information on signed cookie
 * 
 * @function write
 * @param {Object} req - client request
 * @param {String} data - data to write on cookie
 */
SIGNED.prototype.write = function(req, data) {

    var res = req.res;
    return req.signedCookies[this.ck] = this.set(res, this.encrypt(data));
};
/**
 * Encrypt information on cookie
 * 
 * @function write
 * @param {Object} req - client request
 * @param {String} data - data to write on cookie
 */
NORMAL.prototype.write = function(req, data) {

    var res = req.res;
    return req.cookies[this.ck] = this.set(res, this.encrypt(data));
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
        output: String(options.output || 'binary')
    };

    if (Boolean(options.signed)) {
        return new SIGNED(my);
    }
    return new NORMAL(my);
};

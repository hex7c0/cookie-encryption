'use strict';
/**
 * @file getCiphers test
 * @module cookie-encryption
 * @subpackage test
 * @version 0.0.1
 * @author hex7c0 <hex7c0@gmail.com>
 * @license GPLv3
 */

/*
 * initialize module
 */
var cookiee = require('..');
var assert = require('assert');
var crypto = require('crypto');

/*
 * test module
 */
describe('ciphers', function() {

  it('should return available ciphers', function(done) {

    var c = cookiee.getCiphers();
    assert.equal(typeof c, 'object');
    assert.equal(c[0][0], 'arc4');
    assert.deepEqual(c[1], crypto.getCiphers());
    done();
  });
});

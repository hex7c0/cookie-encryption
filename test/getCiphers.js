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

  var c = cookiee.getCiphers();

  it('should return available ciphers', function(done) {

    assert.equal(typeof c, 'object');
    assert.equal(c[0][0], 'arc4');
    done();
  });
  it('should build without error - cipher loop', function(done) {

    assert.deepEqual(c[1], crypto.getCiphers());
    assert.ok(c[1].length > 0);
    for (var i = 0, ii = c[1].length; i < ii; ++i) {
      var co = cookiee('hello_world!', {
        cipher: c[1][i]
      });
      assert.ok(co);
    }
    done();
  });
  it('should build without error - hash loop', function(done) {

    assert.deepEqual(c[2], crypto.getHashes());
    assert.ok(c[2].length > 0);
    for (var i = 0, ii = c[2].length; i < ii; ++i) {
      var co = cookiee('hello_world!', {
        cipher: c[2][i]
      });
      assert.ok(co);
    }
    done();
  });
});

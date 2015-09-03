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
      assert.equal(typeof co.encrypt, 'function');
      assert.equal(typeof co.decrypt, 'function');
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
      assert.equal(typeof co.encrypt, 'function');
      assert.equal(typeof co.decrypt, 'function');
    }
    done();
  });
  it('should build with different encoding', function(done) {

    var vault0 = cookiee('hello_world!', {
      encoding: 'ascii'
    });
    assert.equal(vault0.encoding, 'ascii');

    var vault1 = cookiee('hello_world!', {
      encoding: 'utf8'
    });
    assert.equal(vault1.encoding, 'utf8');

    var vault2 = cookiee('hello_world!', {
      encoding: 'utf16le'
    });
    assert.equal(vault2.encoding, 'utf16le');

    var vault3 = cookiee('hello_world!', {
      encoding: 'ucs2'
    });
    assert.equal(vault3.encoding, 'ucs2');

    var vault4 = cookiee('hello_world!', {
      encoding: 'base64'
    });
    assert.equal(vault4.encoding, 'base64');

    var vault5 = cookiee('hello_world!', {
      encoding: 'binary'
    });
    assert.equal(vault5.encoding, 'binary');

    var vault6 = cookiee('hello_world!', {
      encoding: 'hex'
    });
    assert.equal(vault6.encoding, 'hex');

    assert.equal(vault0.encrypt('f'), vault0.encrypt('f'));
    // assert.notEqual(vault0.encrypt('f'), vault1.encrypt('f'));
    assert.notEqual(vault0.encrypt('f'), vault2.encrypt('f'));
    assert.notEqual(vault0.encrypt('f'), vault3.encrypt('f'));
    assert.notEqual(vault0.encrypt('f'), vault4.encrypt('f'));
    // assert.notEqual(vault0.encrypt('f'), vault5.encrypt('f'));
    assert.notEqual(vault0.encrypt('f'), vault6.encrypt('f'));

    done();
  });
});

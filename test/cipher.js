'use strict';
/**
 * @file cipher test
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

/*
 * test module
 */
describe('cipher', function() {

  var arc4;
  var rc4a;
  var vmpc;
  var rc4;
  var autokey;
  var des;
  var hash;
  var hmac;
  var pbkdf2;
  var modp1;
  var modp2;
  var modp1;
  var modp2;
  var modp5;
  var modp14;
  var modp15;
  var modp16;
  var modp17;
  var modp18;

  it('should build without error - arc4', function(done) {

    arc4 = cookiee('hello_world!', {
      cipher: 'arc4'
    });
    assert.ok(arc4);
    done();
  });
  it('should build without error - rc4a', function(done) {

    rc4a = cookiee('hello_world!', {
      cipher: 'rc4a'
    });
    assert.ok(rc4a);
    done();
  });
  it('should build without error - vmpc', function(done) {

    vmpc = cookiee('hello_world!', {
      cipher: 'vmpc'
    });
    assert.ok(vmpc);
    done();
  });
  it('should build without error - rc4+', function(done) {

    rc4 = cookiee('hello_world!', {
      cipher: 'rc4+'
    });
    assert.ok(rc4);
    done();
  });
  it('should build without error - autokey', function(done) {

    autokey = cookiee('hello_world!', {
      cipher: 'autokey'
    });
    assert.ok(autokey);
    done();
  });
  it('should build without error - des', function(done) {

    des = cookiee('hello_world!', {
      cipher: 'des'
    });
    assert.ok(des);
    done();
  });
  it('should build without error - hash', function(done) {

    hash = cookiee('hello_world!', {
      cipher: 'whirlpool'
    });
    assert.ok(hash);
    done();
  });
  it('should build without error - hmac', function(done) {

    hmac = cookiee('hello_world!', {
      cipher: 'whirlpool',
      extra: [ true ]
    });
    assert.ok(hmac);
    done();
  });
  it('should build without error - pbkdf2', function(done) {

    pbkdf2 = cookiee('hello_world!', {
      cipher: 'pbkdf2',
      extra: [ 'salt', 4, 5 ]
    });
    assert.ok(pbkdf2);
    done();
  });
  it('should build without error - modp1', function(done) {

    modp1 = cookiee('hello_world!', {
      cipher: 'modp1'
    });
    assert.ok(modp1);
    done();
  });
  it('should build without error - modp2', function(done) {

    modp2 = cookiee('hello_world!', {
      cipher: 'modp2'
    });
    assert.ok(modp2);
    done();
  });
  it('should build without error - modp5', function(done) {

    modp5 = cookiee('hello_world!', {
      cipher: 'modp5'
    });
    assert.ok(modp5);
    done();
  });
  it('should build without error - modp15', function(done) {

    modp15 = cookiee('hello_world!', {
      cipher: 'modp15'
    });
    assert.ok(modp15);
    done();
  });
  it('should build without error - modp15', function(done) {

    modp15 = cookiee('hello_world!', {
      cipher: 'modp15'
    });
    assert.ok(modp15);
    done();
  });
  it('should build without error - modp16', function(done) {

    modp16 = cookiee('hello_world!', {
      cipher: 'modp16'
    });
    assert.ok(modp16);
    done();
  });
  it('should build without error - modp17', function(done) {

    modp17 = cookiee('hello_world!', {
      cipher: 'modp17'
    });
    assert.ok(modp17);
    done();
  });
  it('should build without error - modp18', function(done) {

    modp18 = cookiee('hello_world!', {
      cipher: 'modp18'
    });
    assert.ok(modp18);
    done();
  });
});

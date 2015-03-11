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
  var autokey;
  var des;
  var hash;
  var hmac;
  var pbkdf2;
  var modp2;

  it('should build without error', function(done) {

    arc4 = cookiee('hello_world!', {
      cipher: 'arc4'
    });

    autokey = cookiee('hello_world!', {
      cipher: 'autokey'
    });

    des = cookiee('hello_world!', {
      cipher: 'des'
    });

    hash = cookiee('hello_world!', {
      cipher: 'whirlpool'
    });

    hmac = cookiee('hello_world!', {
      cipher: 'whirlpool',
      extra: [ true ]
    });

    pbkdf2 = cookiee('hello_world!', {
      cipher: 'pbkdf2',
      extra: [ 'salt', 4, 5 ]
    });

    modp2 = cookiee('hello_world!', {
      cipher: 'modp2'
    });

    assert
    .ifError(arc4 === autokey === des === hash === hmac === pbkdf2 === modp2);
    done();
  });
});

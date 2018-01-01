v1.7.0 / 2018-01-01
==================

  * Tested against `node`@9
  * Update `arc4`@3.4.0
  * Update `autokey`@2.4.0

v1.6.0 / 2017-02-14
==================

  * Tested against `node`@7
  * Remove support for `node`@0
  * Update `arc4`@3.3.7
  * Update `autokey`@2.3.6

v1.5.0 / 2016-09-12
==================

  * Tested against `node`@6
  * Update `arc4`@3.3.5
  * Update `autokey`@2.3.4

v1.4.2 / 2015-11-24
==================

  * Tested against `node`@5
  * Update `arc4`@3.2.1
  * Update `autokey`@2.2.1

v1.4.1 / 2015-09-24
==================

  * Fix missing output_encoding for Cipher

v1.4.0 / 2015-09-13
==================

  * Rename cookie option `age` to `maxAge`
  * Tested against `node`@4

v1.3.0 / 2015-09-03
==================

  * Remove lazy loading
  * Tested against `iojs`@3
  * Update `arc4`@3.2.0
  * Update `autokey`@2.2.0

v1.2.3 / 2015-07-26
==================

  * Update `arc4`@3.1.3
  * Update `autokey`@2.1.3

v1.2.2 / 2015-06-13
==================

  * SPDX license
  * Update `arc4`@3.1.2
  * Update `autokey`@2.1.2

v1.2.1 / 2015-04-21
==================

  * Update `arc4`@3.1.1
  * Update `autokey`@2.1.1

v1.2.0 / 2015-03-14
==================

  * Update `arc4`@3.0.8
  * Update `autokey`@2.0.5
  * `windows` test
  * `iojs` test
  * `coveralls` test

v1.1.8 / 2015-01-23
==================

  * Package fix
  * Update `arc4`@3.0.7
  * Update `autokey`@2.0.4

v1.1.7 / 2015-01-01
==================

  * Update devDependencies

v1.1.6 / 2014-11-16
==================

  * Add `flush` (methods)
  * Strict check

v1.1.5 / 2014-10-26
==================

  * `jshint`

v1.1.4 / 2014-10-04
==================

  * Remove jsdoc
  * `package.json` min

v1.1.3 / 2014-09-23
==================

  * Fix openssl ciphers, return `update` + `final`
  * "secret" accept Buffer

v1.1.2 / 2014-09-09
==================

  * Update `arc4`@3.0.4
  * Return String only

v1.1.0 / 2014-09-08
==================

  * Rename `this.my` to `this._my`
  * Add "extra" (options)
  * Add support for:
    * Hash
    * Hmac
    * Pbkdf2
    * DiffieHellman
  * `getCiphers` function

v1.0.3 / 2014-09-08
==================

  * Fix cache again
  * Add optional arguments inside `write` `read` methods
    * @param {String} [cookie] - fast cookie
    * @param {String} [encoding] - fast encoding
  * Buffer encoding
  * Not support for Array, like `crypto` module

v1.0.2 / 2014-09-07
==================

  * Fix cache, store only last result
  * Rename internal value "ee" to "encoding"
  * Rename internal value "ck" to "cookie"
  * Send cookie and buffer

v1.0.1 / 2014-09-07
==================

  * Code reduce

v1.0.0 / 2014-09-07
==================

  * Working
  * Write/Read Cache
  * Update `arc4`@3.0.2
  * Update `autokey`@2.0.1

v0.0.1 / 2014-09-06
==================

  * Project start

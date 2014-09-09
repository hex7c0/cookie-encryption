v1.1.1 / 2014-09-09
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

0.0.1 / 2014-09-06
==================

  * Project start

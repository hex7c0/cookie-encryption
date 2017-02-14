# [cookie-encryption](https://github.com/hex7c0/cookie-encryption)

[![NPM version](https://img.shields.io/npm/v/cookie-encryption.svg)](https://www.npmjs.com/package/cookie-encryption)
[![Linux Status](https://img.shields.io/travis/hex7c0/cookie-encryption.svg?label=linux-osx)](https://travis-ci.org/hex7c0/cookie-encryption)
[![Windows Status](https://img.shields.io/appveyor/ci/hex7c0/cookie-encryption.svg?label=windows)](https://ci.appveyor.com/project/hex7c0/cookie-encryption)
[![Dependency Status](https://img.shields.io/david/hex7c0/cookie-encryption.svg)](https://david-dm.org/hex7c0/cookie-encryption)
[![Coveralls](https://img.shields.io/coveralls/hex7c0/cookie-encryption.svg)](https://coveralls.io/r/hex7c0/cookie-encryption)

Encrypt/decrypt data to store on cookie, with memoization.
This class is built with 
[arc4 cipher](https://github.com/hex7c0/arc4), 
[autokey cipher](https://github.com/hex7c0/autokey), 
[nodejs ciphers](http://nodejs.org/api/crypto.html#crypto_crypto_getciphers), 
[nodejs hash](http://nodejs.org/api/crypto.html#crypto_crypto_gethashes), 
[nodejs hmac](http://nodejs.org/api/crypto.html#crypto_crypto_createhmac_algorithm_key), 
[nodejs pbkdf2](http://nodejs.org/api/crypto.html#crypto_crypto_pbkdf2sync_password_salt_iterations_keylen) and 
[nodejs diffiehellman](http://nodejs.org/api/crypto.html#crypto_crypto_getdiffiehellman_group_name), 

## Installation

Install through NPM

```bash
npm install cookie-encryption
```
or
```bash
git clone git://github.com/hex7c0/cookie-encryption.git
```

## API

inside expressjs project
```js
var cookiee = require('cookie-encryption');

var vault = cookiee('ciao');
```

return supported ciphers
```js
var cookiee = require('cookie-encryption');

cookiee.getCiphers();
```

Check [Cookie options](http://expressjs.com/api.html#res.cookie)

### Methods

write data ('pippo') to selected cookie
```js
vault.write(req, 'pippo');
```

read data from selected cookie
```js
vault.read(req);
```

flush data cache
```js
vault.flush();
```

optional arguments inside of previous methods
```
 * @param {String} [cookie] - fast cookie
 * @param {String} [encoding] - fast encoding
```

### cookiee(secret [, options])

#### secret

 - `secret`- **String | Buffer** Set password *(default "required")*

#### [options]

 - `cipher` - **String** Type of cipher, grab list from `getCiphers` *(default "arc4")*
 - `domain` - **String** Domain of cookie *(default "null")*
 - `cookie` - **String** Name of cookie *(default "vault")*
 - `path` - **String** Path of cookie *(default "/")*
 - `maxAge` - **Number** Age of cookie in millisecond *(default "1 year")*
 - `httpOnly` - **Boolean** Flag for http only cookie *(default "false")*
 - `secure` - **Boolean** Flag for using cookie over TLS/SSL *(default "false")*
 - `signed` - **Boolean** Will use the secret passed to cookieParser(secret) to sign the value *(default "false")*
 - `encoding` - **String** Type of output encoding by [nodejs](http://nodejs.org/api/buffer.html#apicontent) *(default "hex")*
 - `extra` - **Array** Extra info for `Hmac` (`[true]` to enable instead of `Hash`) and `pbkdf2` (`[salt, iterations, keylen]`) *(default "`[ ]`")*

## Examples

Take a look at my [examples](examples)

### [License GPLv3](LICENSE)

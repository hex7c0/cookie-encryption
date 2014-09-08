# [cookie-encryption](http://supergiovane.tk/#/cookie-encryption)

[![NPM version](https://badge.fury.io/js/cookie-encryption.svg)](http://badge.fury.io/js/cookie-encryption)
[![Build Status](https://travis-ci.org/hex7c0/cookie-encryption.svg)](https://travis-ci.org/hex7c0/cookie-encryption)
[![Dependency Status](https://david-dm.org/hex7c0/cookie-encryption/status.svg)](https://david-dm.org/hex7c0/cookie-encryption)

Encrypt/decrypt data to store on cookie, with memorization.
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

return ciphers supported
```js
var cookiee = require('cookie-encryption');

cookiee('ciao').getCiphers();
```

### Methods

write data ('pippo') to selected cookie
```js
vault.write(req, 'pippo');
```

read data from selected cookie
```js
vault.read(req);
```

### cookiee(secret,[options])

#### secret

 - `secret`- **String** Set password *(default "required")*

#### [options]

 - `cipher` - **String** Type of cipher, grab list from `getCiphers` *(default "arc4")*
 - `domain` - **String** Domain of cookie *(default "null")*
 - `cookie` - **String** Name of cookie *(default "vault")*
 - `path` - **String** Path of cookie *(default "/")*
 - `age` - **Number** Age of cookie in millisecond *(default "1 year")*
 - `httpOnly` - **Boolean** Flag for http only cookie *(default "false")*
 - `secure` - **Boolean** Flag for using cookie over TLS/SSL *(default "false")*
 - `signed` - **Boolean** Will use the secret passed to cookieParser(secret) to sign the value *(default "false")*
 - `encoding` - **String** Type of output encoding by [nodejs](http://nodejs.org/api/buffer.html#apicontent) *(default "hex")*
 - `extra` - **Array** Extra info for `Hmac` ([true] to enable instead of `Hash`) and `pbkdf2` ([salt, iterations, keylen]) *(default "[]")*

## Examples

Take a look at my [examples](https://github.com/hex7c0/cookie-encryption/tree/master/examples)

### [License GPLv3](http://opensource.org/licenses/GPL-3.0)

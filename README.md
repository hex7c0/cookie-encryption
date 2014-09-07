# [cookie-encryption](http://supergiovane.tk/#/cookie-encryption)

[![NPM version](https://badge.fury.io/js/cookie-encryption.svg)](http://badge.fury.io/js/cookie-encryption)
[![Build Status](https://travis-ci.org/hex7c0/cookie-encryption.svg)](https://travis-ci.org/hex7c0/cookie-encryption)
[![Dependency Status](https://david-dm.org/hex7c0/cookie-encryption/status.svg)](https://david-dm.org/hex7c0/cookie-encryption)

Encrypt/decrypt data to store on cookie, with memorization.
This class is built with [rc4](https://github.com/hex7c0/arc4), [autokey](https://github.com/hex7c0/autokey) and [nodejs](http://nodejs.org/api/crypto.html#crypto_crypto_getciphers) ciphers.

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

 - `cipher` - **String** Type of cipher *(default "arc4")*
 - `domain` - **String** Domain of cookie *(default "null")*
 - `cookie` - **String** Name of cookie *(default "vault")*
 - `path` - **String** Path of cookie *(default "/")*
 - `age` - **Number** Age of cookie in millisecond *(default "1 year")*
 - `httpOnly` - **Boolean** Flag for http only cookie *(default "false")*
 - `secure` - **Boolean** Flag for using cookie over TLS/SSL *(default "false")*
 - `signed` - **Boolean** Will use the secret passed to cookieParser(secret) to sign the value *(default "false")*
 - `encoding` - **String** Type of output encoding by [nodejs](http://nodejs.org/api/buffer.html#apicontent) *(default "hex")*

## Examples

Take a look at my [examples](https://github.com/hex7c0/cookie-encryption/tree/master/examples)

### [License GPLv3](http://opensource.org/licenses/GPL-3.0)

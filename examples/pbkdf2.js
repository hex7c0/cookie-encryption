'use strict';
/**
 * @file pbkdf2 example
 * @module cookie-encryption
 * @package cookie-encryption
 * @subpackage examples
 * @version 0.0.1
 * @author hex7c0 <hex7c0@gmail.com>
 * @license GPLv3
 */

/*
 * initialize module
 */
// import
try {
    var cookiee = require('../index.min.js'); // use
    // require('cookie-encryption')
    var app = require('express')();
    var cookie = require('cookie-parser');
} catch (MODULE_NOT_FOUND) {
    console.error(MODULE_NOT_FOUND);
    process.exit(1);
}

var vault = cookiee('ciao', {
    cipher: 'pbkdf2',
    encoding: 'base64',
    extra: [ 'salt', 4, 5 ]
// salt, iterations, keylen
});

// express routing
app.use(cookie('foo')); // using only for parsing header cookie
app.get('/', function(req, res) {

    res.send('write: ' + vault.write(req, 'pippo'));
});
app.get('/r', function(req, res) {

    // throw TypeError
    res.send('read: ' + vault.read(req));
});
// server starting
app.listen(3000);
console.log('starting "hello world" on port 3000');

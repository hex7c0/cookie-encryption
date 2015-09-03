'use strict';
/**
 * @file signed example
 * @module cookie-encryption
 * @subpackage examples
 * @version 0.0.1
 * @author hex7c0 <hex7c0@gmail.com>
 * @license GPLv3
 */

/*
 * initialize module
 */
var cookiee = require('..'); // use require('cookie-encryption') instead
var app = require('express')();
var cookie = require('cookie-parser');

var vault = cookiee('ciao', {
  signed: true, // send signed cookie
});

app.use(cookie('foo')); // using only for parsing header cookie

app.get('/', function(req, res) {

  res.send('write: ' + vault.write(req, 'pippo'));
}).get('/r', function(req, res) {

  res.send('read: ' + vault.read(req));
}).listen(3000);
console.log('starting "hello world" on port 3000');

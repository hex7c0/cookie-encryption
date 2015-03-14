'use strict';
/**
 * @file change cookie example
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

var vault = cookiee('ciao');

app.use(cookie('foo')); // using only for parsing header cookie

app.get('/', function(req, res) {

  var o = 'write: ' + vault.write(req, 'ciao');
  o += '<br>';
  // vault.cookie = 'new'; // change cookie
  o += 'write: ' + vault.write(req, 'pippo', 'new', 'base64');
  res.send(o);
}).get('/r', function(req, res) {

  var o = 'read: ' + vault.read(req);
  o += '<br>';
  o += 'read: ' + vault.read(req, 'new', 'base64');
  res.send(o);
}).listen(3000);
console.log('starting "hello world" on port 3000');

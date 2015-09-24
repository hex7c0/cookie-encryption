'use strict';
/**
 * @file normal example
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
  cipher: 'aes-256-cbc',
  encoding: 'base64',
  cookie: 'oauth-secrets',
  httpOnly: true
});

app.use(cookie('foo')); // using only for parsing header cookie

app.get('/', function(req, res) {

  var t = {
    access_token: 'yKIWXHFrtHqR27grmWR3qOOW17HykVZlZMa3wJ3a',
    token_type: 'Bearer',
    expires_in: 3600
  }; // serialize to string

  vault.write(req, JSON.stringify(t));

  res.status(200).send('done');
}).get('/r', function(req, res) {

  res.send('read: ' + vault.read(req));
}).listen(3000);
console.log('starting "hello world" on port 3000');

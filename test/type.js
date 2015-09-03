'use strict';
/**
 * @file type test
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
var express = require('express');
var cookie = require('cookie-parser');
var request = require('supertest');
var assert = require('assert');

/*
 * test module
 */
describe('type', function() {

  describe('normal', function() {

    describe('own', function() {

      var string = 'ciao';
      var array = [ 1, 2, 3, 4, 5 ];
      var buffer1 = new Buffer(string);
      var buffer2 = new Buffer(array);

      describe('string', function() {

        var app = express();

        before(function(done) {

          var vault = cookiee('hello_world!');
          // express routing
          app.use(cookie('foo')).get('/', function(req, res) {

            res.send(vault.write(req, string));
          }).get('/r', function(req, res) {

            res.send(vault.read(req));
          });
          done();
        });

        it('should return string', function(done) {

          request(app).get('/').expect(200).end(
            function(err, res) {

              if (err) return done(err);
              var cookie = res.headers['set-cookie'][0];

              request(app).get('/r').set('Cookie', cookie).expect(200).end(
                function(err, res) {

                  if (err) return done(err);
                  assert.equal(res.text, string);
                  done();
                });
            });
        });
      });

      // describe('array', function() {
      //
      // var app = express();
      //
      // before(function(done) {
      //
      // var vault = cookiee('hello_world!');
      // // express routing
      // app.use(cookie('foo')).get('/', function(req, res) {
      //
      // res.send(vault.write(req, array));
      // }).get('/r', function(req, res) {
      //
      // res.send(vault.read(req));
      // });
      // done();
      // });
      //
      // it('should return array', function(done) {
      //
      // request(app).get('/').expect(200).end(
      // function(err, res) {
      //
      // if (err) return done(err);
      // var cookie = res.headers['set-cookie'][0];
      //
      // request(app).get('/r').set('Cookie', cookie).expect(200).end(
      // function(err, res) {
      //
      // if (err) return done(err);
      // assert.equal(res.text, '[1,2,3,4,5]');
      // done();
      // });
      // });
      // });
      // });

      describe('buffer1', function() {

        var app = express();

        before(function(done) {

          var vault = cookiee('hello_world!');
          // express routing
          app.use(cookie('foo')).get('/', function(req, res) {

            res.send(vault.write(req, buffer1));
          }).get('/r', function(req, res) {

            res.send(vault.read(req));
          });
          done();
        });

        it('should return buffer1', function(done) {

          request(app).get('/').expect(200).end(
            function(err, res) {

              if (err) return done(err);
              var cookie = res.headers['set-cookie'][0];

              request(app).get('/r').set('Cookie', cookie).expect(200).end(
                function(err, res) {

                  if (err) return done(err);
                  assert.equal(res.text, buffer1);
                  done();
                });
            });
        });
      });

      describe('buffer2', function() {

        var app = express();

        before(function(done) {

          var vault = cookiee('hello_world!');
          // express routing
          app.use(cookie('foo')).get('/', function(req, res) {

            res.send(vault.write(req, buffer2));
          }).get('/r', function(req, res) {

            res.send(vault.read(req));
          });
          done();
        });

        it('should return buffer2', function(done) {

          request(app).get('/').expect(200).end(
            function(err, res) {

              if (err) return done(err);
              var cookie = res.headers['set-cookie'][0];

              request(app).get('/r').set('Cookie', cookie).expect(200).end(
                function(err, res) {

                  if (err) return done(err);
                  assert.equal(res.text, buffer2);
                  done();
                });
            });
        });
      });
    });

    describe('openssl', function() {

      var string = 'ciao';
      var array = [ 1, 2, 3, 4, 5 ];
      var buffer1 = new Buffer(string);
      var buffer2 = new Buffer(array);

      describe('string', function() {

        var app = express();

        before(function(done) {

          var vault = cookiee('hello_world!', {
            cipher: 'des'
          });
          // express routing
          app.use(cookie('foo')).get('/', function(req, res) {

            res.send(vault.write(req, string));
          }).get('/r', function(req, res) {

            res.send(vault.read(req));
          });
          done();
        });

        it('should return string', function(done) {

          request(app).get('/').expect(200).end(
            function(err, res) {

              if (err) return done(err);
              var cookie = res.headers['set-cookie'][0];

              request(app).get('/r').set('Cookie', cookie).expect(200).end(
                function(err, res) {

                  if (err) return done(err);
                  assert.equal(res.text, string);
                  done();
                });
            });
        });
      });

      describe('buffer1', function() {

        var app = express();

        before(function(done) {

          var vault = cookiee('hello_world!', {
            cipher: 'des'
          });
          // express routing
          app.use(cookie('foo')).get('/', function(req, res) {

            res.send(vault.write(req, buffer1));
          }).get('/r', function(req, res) {

            res.send(vault.read(req));
          });
          done();
        });

        it('should return buffer1', function(done) {

          request(app).get('/').expect(200).end(
            function(err, res) {

              if (err) return done(err);
              var cookie = res.headers['set-cookie'][0];

              request(app).get('/r').set('Cookie', cookie).expect(200).end(
                function(err, res) {

                  if (err) return done(err);
                  assert.equal(res.text, buffer1);
                  done();
                });
            });
        });
      });

      describe('buffer2', function() {

        var app = express();

        before(function(done) {

          var vault = cookiee('hello_world!', {
            cipher: 'des'
          });
          // express routing
          app.use(cookie('foo')).get('/', function(req, res) {

            res.send(vault.write(req, buffer2));
          }).get('/r', function(req, res) {

            res.send(vault.read(req));
          });
          done();
        });

        it('should return buffer2', function(done) {

          request(app).get('/').expect(200).end(
            function(err, res) {

              if (err) return done(err);
              var cookie = res.headers['set-cookie'][0];

              request(app).get('/r').set('Cookie', cookie).expect(200).end(
                function(err, res) {

                  if (err) return done(err);
                  assert.equal(res.text, buffer2);
                  done();
                });
            });
        });
      });
    });
  });

  describe('signed', function() {

    describe('own', function() {

      var string = 'ciao';
      var array = [ 1, 2, 3, 4, 5 ];
      var buffer1 = new Buffer(string);
      var buffer2 = new Buffer(array);

      describe('string', function() {

        var app = express();

        before(function(done) {

          var vault = cookiee('hello_world!', {
            signed: true
          });
          // express routing
          app.use(cookie('foo')).get('/', function(req, res) {

            res.send(vault.write(req, string));
          }).get('/r', function(req, res) {

            res.send(vault.read(req));
          });
          done();
        });

        it('should return string', function(done) {

          request(app).get('/').expect(200).end(
            function(err, res) {

              if (err) return done(err);
              var cookie = res.headers['set-cookie'][0];

              request(app).get('/r').set('Cookie', cookie).expect(200).end(
                function(err, res) {

                  if (err) return done(err);
                  assert.equal(res.text, string);
                  done();
                });
            });
        });
      });

      // describe('array', function() {
      //
      // var app = express();
      //
      // before(function(done) {
      //
      // var vault = cookiee('hello_world!');
      // // express routing
      // app.use(cookie('foo')).get('/', function(req, res) {
      //
      // res.send(vault.write(req, array));
      // }).get('/r', function(req, res) {
      //
      // res.send(vault.read(req));
      // });
      // done();
      // });
      //
      // it('should return array', function(done) {
      //
      // request(app).get('/').expect(200).end(
      // function(err, res) {
      //
      // if (err) return done(err);
      // var cookie = res.headers['set-cookie'][0];
      //
      // request(app).get('/r').set('Cookie', cookie).expect(200).end(
      // function(err, res) {
      //
      // if (err) return done(err);
      // assert.equal(res.text, '[1,2,3,4,5]');
      // done();
      // });
      // });
      // });
      // });

      describe('buffer1', function() {

        var app = express();

        before(function(done) {

          var vault = cookiee('hello_world!', {
            signed: true
          });
          // express routing
          app.use(cookie('foo')).get('/', function(req, res) {

            res.send(vault.write(req, buffer1));
          }).get('/r', function(req, res) {

            res.send(vault.read(req));
          });
          done();
        });

        it('should return buffer1', function(done) {

          request(app).get('/').expect(200).end(
            function(err, res) {

              if (err) return done(err);
              var cookie = res.headers['set-cookie'][0];

              request(app).get('/r').set('Cookie', cookie).expect(200).end(
                function(err, res) {

                  if (err) return done(err);
                  assert.equal(res.text, buffer1);
                  done();
                });
            });
        });
      });

      describe('buffer2', function() {

        var app = express();

        before(function(done) {

          var vault = cookiee('hello_world!', {
            signed: true
          });
          // express routing
          app.use(cookie('foo')).get('/', function(req, res) {

            res.send(vault.write(req, buffer2));
          }).get('/r', function(req, res) {

            res.send(vault.read(req));
          });
          done();
        });

        it('should return buffer2', function(done) {

          request(app).get('/').expect(200).end(
            function(err, res) {

              if (err) return done(err);
              var cookie = res.headers['set-cookie'][0];

              request(app).get('/r').set('Cookie', cookie).expect(200).end(
                function(err, res) {

                  if (err) return done(err);
                  assert.equal(res.text, buffer2);
                  done();
                });
            });
        });
      });
    });

    describe('openssl', function() {

      var string = 'ciao';
      var array = [ 1, 2, 3, 4, 5 ];
      var buffer1 = new Buffer(string);
      var buffer2 = new Buffer(array);

      describe('string', function() {

        var app = express();

        before(function(done) {

          var vault = cookiee('hello_world!', {
            signed: true,
            cipher: 'des'
          });
          // express routing
          app.use(cookie('foo')).get('/', function(req, res) {

            res.send(vault.write(req, string));
          }).get('/r', function(req, res) {

            res.send(vault.read(req));
          });
          done();
        });

        it('should return string', function(done) {

          request(app).get('/').expect(200).end(
            function(err, res) {

              if (err) return done(err);
              var cookie = res.headers['set-cookie'][0];

              request(app).get('/r').set('Cookie', cookie).expect(200).end(
                function(err, res) {

                  if (err) return done(err);
                  assert.equal(res.text, string);
                  done();
                });
            });
        });
      });

      describe('buffer1', function() {

        var app = express();

        before(function(done) {

          var vault = cookiee('hello_world!', {
            signed: true,
            cipher: 'des'
          });
          // express routing
          app.use(cookie('foo')).get('/', function(req, res) {

            res.send(vault.write(req, buffer1));
          }).get('/r', function(req, res) {

            res.send(vault.read(req));
          });
          done();
        });

        it('should return buffer1', function(done) {

          request(app).get('/').expect(200).end(
            function(err, res) {

              if (err) return done(err);
              var cookie = res.headers['set-cookie'][0];

              request(app).get('/r').set('Cookie', cookie).expect(200).end(
                function(err, res) {

                  if (err) return done(err);
                  assert.equal(res.text, buffer1);
                  done();
                });
            });
        });
      });

      describe('buffer2', function() {

        var app = express();

        before(function(done) {

          var vault = cookiee('hello_world!', {
            signed: true,
            cipher: 'des'
          });
          // express routing
          app.use(cookie('foo')).get('/', function(req, res) {

            res.send(vault.write(req, buffer2));
          }).get('/r', function(req, res) {

            res.send(vault.read(req));
          });
          done();
        });

        it('should return buffer2', function(done) {

          request(app).get('/').expect(200).end(
            function(err, res) {

              if (err) return done(err);
              var cookie = res.headers['set-cookie'][0];

              request(app).get('/r').set('Cookie', cookie).expect(200).end(
                function(err, res) {

                  if (err) return done(err);
                  assert.equal(res.text, buffer2);
                  done();
                });
            });
        });
      });
    });
  });
});

'use strict';
/**
 * @file signed test
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
describe(
  'signed',
  function() {

    var arc4 = 'b3703675cd5b6b9d74e1e0855302dcf6c16d9b93611357a75e4d8592cd4bbe5b1d48f44ac8e36f9847da';
    var arc4_b64 = 's%3A2dc1ba5104.eCFUwLc9sFtm5NhE1enXk%2Fks1LvlsdSPRKyONvmEfaE';
    var autokey = 's%3Ad8cedcdcde.2aTm5wAkqNM8itmtrMMuCvMsqgQZS3czmfhLacnkr%2FI';
    var openssl = 's%3A3eddbb644195e2b8.GJrio0U8v%2FzA6Oxs66GOJ6sVbhkKHd1CN02I1W3DzxQ';

    describe('arc4', function() {

      var app = express();
      var vault = cookiee('hello_world!', {
        signed: true
      });

      before(function(done) {

        // express routing
        app.use(cookie('foo')).get('/', function(req, res) {

          res.send(vault.write(req, 'pippo'));
        }).get('/r', function(req, res) {

          res.send(vault.read(req));
        });
        done();
      });

      it('should return "encrypted" cookie with base64', function(done) {

        assert.equal(vault.cache.write['pippo'], undefined);
        assert.equal(vault.cache.read['2dc1ba5104'], undefined);
        request(app).get('/').expect(200).end(
          function(err, res) {

            if (err) return done(err);
            var exp = 'vault=' + arc4_b64 + '; Max-Age=31536000; Path=/;';
            var act = res.headers['set-cookie'][0].substring(0, exp.length);
            assert.deepEqual(act, exp, 'static check');

            request(app).get('/r').set('Cookie',
              'vault=' + arc4_b64 + '; Max-Age=31536000; Path=/;').expect(200)
            .end(function(err, res) {

              if (err) return done(err);

              var convert = new Buffer(arc4_b64, 'base64');
              assert.equal(convert.toString('hex'), arc4, 'base64');

              var exp = new Buffer(res.text).toString('hex');
              var act = new Buffer('pippo').toString('hex');
              assert.deepEqual(exp, act, '"pippo"');
              done();
            });
          });
      });
      it('should return same "encrypted" cookie in cache', function(done) {

        assert.equal(typeof vault.cache.write['pippo'], 'string');
        assert.equal(typeof vault.cache.read['2dc1ba5104'], 'string');
        request(app).get('/').expect(200).end(
          function(err, res) {

            if (err) return done(err);
            var exp = 'vault=' + arc4_b64 + '; Max-Age=31536000; Path=/;';
            var act = res.headers['set-cookie'][0].substring(0, exp.length);
            assert.deepEqual(act, exp, 'static check');

            request(app).get('/r').set('Cookie',
              'vault=' + arc4_b64 + '; Max-Age=31536000; Path=/;').expect(200)
            .end(function(err, res) {

              if (err) return done(err);

              var convert = new Buffer(arc4_b64, 'base64');
              assert.equal(convert.toString('hex'), arc4, 'base64');

              var exp = new Buffer(res.text).toString('hex');
              var act = new Buffer('pippo').toString('hex');
              assert.deepEqual(exp, act, '"pippo"');
              vault.flush();
              done();
            });
          });
      });
      it('should return same "encrypted" cookie after flush', function(done) {

        assert.equal(vault.cache.write['pippo'], undefined);
        assert.equal(vault.cache.read['2dc1ba5104'], undefined);
        request(app).get('/').expect(200).end(
          function(err, res) {

            if (err) return done(err);
            var exp = 'vault=' + arc4_b64 + '; Max-Age=31536000; Path=/;';
            var act = res.headers['set-cookie'][0].substring(0, exp.length);
            assert.deepEqual(act, exp, 'static check');

            request(app).get('/r').set('Cookie',
              'vault=' + arc4_b64 + '; Max-Age=31536000; Path=/;').expect(200)
            .end(function(err, res) {

              if (err) return done(err);

              var convert = new Buffer(arc4_b64, 'base64');
              assert.equal(convert.toString('hex'), arc4, 'base64');

              var exp = new Buffer(res.text).toString('hex');
              var act = new Buffer('pippo').toString('hex');
              assert.deepEqual(exp, act, '"pippo"');
              done();
            });
          });
      });
      it('should return ""', function(done) {

        request(app).get('/r').expect(200).end(function(err, res) {

          if (err) return done(err);
          assert.deepEqual(res.text, '', 'empty');
          done();
        });
      });
      it('should return ""', function(done) {

        request(app).get('/r').set('Cookie',
          'vault= ; Max-Age=31536000; Path=/;').expect(200).end(
          function(err, res) {

            if (err) return done(err);
            assert.deepEqual(res.text, '', 'empty');
            done();
          });
      });
    });

    describe('autokey', function() {

      var app = express();

      before(function(done) {

        var vault = cookiee('hello_world!', {
          cipher: 'autokey',
          signed: true
        });
        // express routing
        app.use(cookie('foo')).get('/', function(req, res) {

          res.send(vault.write(req, 'pippo'));
        }).get('/r', function(req, res) {

          res.send(vault.read(req));
        });
        done();
      });

      it('should return "encrypted" cookie', function(done) {

        request(app).get('/').expect(200).end(
          function(err, res) {

            if (err) return done(err);
            var exp = 'vault=' + autokey + '; Max-Age=31536000; Path=/;';
            var act = res.headers['set-cookie'][0].substring(0, exp.length);
            assert.deepEqual(act, exp, 'static check');

            request(app).get('/r').set('Cookie',
              'vault=' + autokey + '; Max-Age=31536000; Path=/;').expect(200)
            .end(function(err, res) {

              if (err) return done(err);
              assert.deepEqual(res.text, 'pippo', '"pippo"');
              done();
            });
          });
      });
      it('should return ""', function(done) {

        request(app).get('/r').expect(200).end(function(err, res) {

          if (err) return done(err);
          assert.deepEqual(res.text, '', 'empty');
          done();
        });
      });
    });

    describe('openssl', function() {

      var app = express();

      before(function(done) {

        var vault = cookiee('hello_world!', {
          cipher: 'des',
          signed: true
        });
        // express routing
        app.use(cookie('foo')).get('/', function(req, res) {

          res.send(vault.write(req, 'pippo'));
        }).get('/r', function(req, res) {

          res.send(vault.read(req));
        });
        done();
      });

      it('should return "encrypted" cookie', function(done) {

        request(app).get('/').expect(200).end(
          function(err, res) {

            if (err) return done(err);
            var exp = 'vault=' + openssl + '; Max-Age=31536000; Path=/;';
            var act = res.headers['set-cookie'][0].substring(0, exp.length);
            assert.deepEqual(act, exp, 'static check');

            request(app).get('/r').set('Cookie',
              'vault=' + openssl + '; Max-Age=31536000; Path=/;').expect(200)
            .end(function(err, res) {

              if (err) return done(err);
              assert.deepEqual(res.text, 'pippo', '"pippo"');
              done();
            });
          });
      });
      it('should return ""', function(done) {

        request(app).get('/r').expect(200).end(function(err, res) {

          if (err) return done(err);
          assert.deepEqual(res.text, '', 'empty');
          done();
        });
      });
    });
  });

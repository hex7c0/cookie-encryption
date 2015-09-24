'use strict';
/**
 * @file normal test
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
var crypto = require('crypto');

/*
 * test module
 */
describe('normal', function() {

  var arc4 = '2dc1ba510437';
  var arc4_b64 = 'LcG6UQQ%3D';
  var autokey = 'd8cedcdcde';
  var openssl = '3eddbb644195e2b8';

  describe('arc4', function() {

    var app = express();
    var vault = cookiee('hello_world!', {
      encoding: 'base64'
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
      assert.equal(vault.cache.read['LcG6UQQ='], undefined);
      request(app).get('/').expect(200).end(
        function(err, res) {

          assert.ifError(err);
          var exp = 'vault=' + arc4_b64 + '; Max-Age=31536000; Path=/;';
          var act = res.headers['set-cookie'][0].substring(0, exp.length);
          assert.deepEqual(act, exp, 'static check');

          request(app).get('/r').set('Cookie',
            'vault=' + arc4_b64 + '; Max-Age=31536000; Path=/;').expect(200)
              .end(function(err, res) {

                assert.ifError(err);

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
      assert.equal(typeof vault.cache.read['LcG6UQQ='], 'string');
      request(app).get('/').expect(200).end(
        function(err, res) {

          assert.ifError(err);
          var exp = 'vault=' + arc4_b64 + '; Max-Age=31536000; Path=/;';
          var act = res.headers['set-cookie'][0].substring(0, exp.length);
          assert.deepEqual(act, exp, 'static check');

          request(app).get('/r').set('Cookie',
            'vault=' + arc4_b64 + '; Max-Age=31536000; Path=/;').expect(200)
              .end(function(err, res) {

                assert.ifError(err);

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
      assert.equal(vault.cache.read['LcG6UQQ='], undefined);
      request(app).get('/').expect(200).end(
        function(err, res) {

          assert.ifError(err);
          var exp = 'vault=' + arc4_b64 + '; Max-Age=31536000; Path=/;';
          var act = res.headers['set-cookie'][0].substring(0, exp.length);
          assert.deepEqual(act, exp, 'static check');

          request(app).get('/r').set('Cookie',
            'vault=' + arc4_b64 + '; Max-Age=31536000; Path=/;').expect(200)
              .end(function(err, res) {

                assert.ifError(err);

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

        assert.ifError(err);
        assert.deepEqual(res.text, '', 'empty');
        done();
      });
    });
    it('should return ""', function(done) {

      request(app).get('/r')
          .set('Cookie', 'vault= ; Max-Age=31536000; Path=/;').expect(200).end(
            function(err, res) {

              assert.ifError(err);
              assert.deepEqual(res.text, '', 'empty');
              done();
            });
    });
  });

  describe('autokey', function() {

    var app = express();

    before(function(done) {

      var vault = cookiee('hello_world!', {
        cipher: 'autokey'
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

          assert.ifError(err);
          var exp = 'vault=' + autokey + '; Max-Age=31536000; Path=/;';
          var act = res.headers['set-cookie'][0].substring(0, exp.length);
          assert.deepEqual(act, exp, 'static check');

          request(app).get('/r').set('Cookie',
            'vault=' + autokey + '; Max-Age=31536000; Path=/;').expect(200)
              .end(function(err, res) {

                assert.ifError(err);
                assert.deepEqual(res.text, 'pippo', '"pippo"');
                done();
              });
        });
    });
    it('should return ""', function(done) {

      request(app).get('/r').expect(200).end(function(err, res) {

        assert.ifError(err);
        assert.deepEqual(res.text, '', 'empty');
        done();
      });
    });
  });

  describe('openssl', function() {

    var app = express();

    before(function(done) {

      var vault = cookiee('hello_world!', {
        cipher: 'des'
      });
      // express routing
      app.use(cookie('foo'));
      app.get('/', function(req, res) {

        res.send(vault.write(req, 'pippo'));
      });
      app.get('/r', function(req, res) {

        res.send(vault.read(req));
      });
      done();
    });

    it('should return "encrypted" cookie', function(done) {

      request(app).get('/').expect(200).end(
        function(err, res) {

          assert.ifError(err);
          var exp = 'vault=' + openssl + '; Max-Age=31536000; Path=/;';
          var act = res.headers['set-cookie'][0].substring(0, exp.length);
          assert.deepEqual(act, exp, 'static check');

          request(app).get('/r').set('Cookie',
            'vault=' + openssl + '; Max-Age=31536000; Path=/;').expect(200)
              .end(function(err, res) {

                assert.ifError(err);
                assert.deepEqual(res.text, 'pippo', '"pippo"');
                done();
              });
        });
    });
    it('should return ""', function(done) {

      request(app).get('/r').expect(200).end(function(err, res) {

        assert.ifError(err);
        assert.deepEqual(res.text, '', 'empty');
        done();
      });
    });
  });

  describe('issue #1', function() {

    var p = 'hello_world!';
    var app = express();
    var t = {
      access_token: 'yKIWXHFrtHqR27grmWR3qOOW17HykVZlZMa3wJ3a',
      token_type: 'Bearer',
      expires_in: 3600
    }; // serialize to string

    before(function(done) {

      var vault = cookiee(p, {
        cipher: 'aes-256-cbc',
        encoding: 'base64',
        cookie: 'oauth-secrets',
        httpOnly: true
      });

      app.use(cookie('foo')).get('/', function(req, res) {

        res.send(vault.write(req, JSON.stringify(t)));
      }).get('/r', function(req, res) {

        res.send(vault.read(req));
      });
      done();
    });

    it('should return "encrypted" cookie', function(done) {

      request(app).get('/').expect(200)
          .end(
            function(err, res) {

              assert.ifError(err);

              var cipher = crypto.createCipher('aes-256-cbc', p);
              var crypted = cipher.update(JSON.stringify(t), 'utf8', 'base64');
              crypted += cipher.final('base64');

              var exp = 'oauth-secrets=' + crypted
                + '; Max-Age=31536000; Path=/;';
              var act = decodeURIComponent(res.headers['set-cookie'][0])
                  .substring(0, exp.length);

              assert.deepEqual(act, exp, 'static check');
              assert.ok(/HttpOnly$/.test(res.headers['set-cookie'][0]),
                'httpOnly');

              request(app).get('/r')
                  .set('Cookie', res.headers['set-cookie'][0]).expect(200).end(
                    function(err, res) {

                      assert.ifError(err);
                      var l = JSON.parse(res.text);
                      assert.deepEqual(l, t, 'object');
                      done();
                    });
            });
    });
    it('should return ""', function(done) {

      request(app).get('/r').expect(200).end(function(err, res) {

        assert.ifError(err);
        assert.deepEqual(res.text, '', 'empty');
        done();
      });
    });
  });
});

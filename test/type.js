"use strict";
/**
 * @file type test
 * @module cookie-encryption
 * @package cookie-encryption
 * @subpackage test
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
    var express = require('express');
    var cookie = require('cookie-parser');
    var request = require('supertest');
    var assert = require('assert');
} catch (MODULE_NOT_FOUND) {
    console.error(MODULE_NOT_FOUND);
    process.exit(1);
}

/*
 * test module
 */
describe('normal', function() {

    var string = 'ciao';
    var array = [ 1, 2, 3, 4, 5 ];
    var buffer1 = new Buffer(string);
    var buffer2 = new Buffer(array);

    describe('string', function() {

        var app = express();
        before(function(done) {

            var vault = cookiee('hello_world!');
            // express routing
            app.use(cookie('foo'));
            app.get('/', function(req, res) {

                res.send(vault.write(req, string));
            });
            app.get('/r', function(req, res) {

                res.send(vault.read(req));
            });
            done();
        });

        it('nothing - should return string', function(done) {

            request(app).get('/').expect(200).end(function(err, res) {

                if (err)
                    return done(err);
                var cookie = res.headers['set-cookie'][0];

                request(app).get('/r').set('Cookie', cookie).expect(200)
                        .end(function(err, res) {

                            if (err)
                                return done(err);
                            assert.deepEqual(res.text, string);
                            done();
                        });
            });
        });
    });

    describe('array', function() {

        var app = express();
        before(function(done) {

            var vault = cookiee('hello_world!');
            // express routing
            app.use(cookie('foo'));
            app.get('/', function(req, res) {

                res.send(vault.write(req, array));
            });
            app.get('/r', function(req, res) {

                res.send(vault.read(req));
            });
            done();
        });

        it('nothing - should return array', function(done) {

            request(app).get('/').expect(200).end(function(err, res) {

                if (err)
                    return done(err);
                var cookie = res.headers['set-cookie'][0];

                request(app).get('/r').set('Cookie', cookie).expect(200)
                        .end(function(err, res) {

                            if (err)
                                return done(err);
                            assert.deepEqual(res.text, '[1,2,3,4,5]');
                            done();
                        });
            });
        });
    });

    describe('buffer1', function() {

        var app = express();
        before(function(done) {

            var vault = cookiee('hello_world!');
            // express routing
            app.use(cookie('foo'));
            app.get('/', function(req, res) {

                res.send(vault.write(req, buffer1));
            });
            app.get('/r', function(req, res) {

                res.send(vault.read(req));
            });
            done();
        });

        it('nothing - should return buffer2', function(done) {

            request(app).get('/').expect(200).end(function(err, res) {

                if (err)
                    return done(err);
                var cookie = res.headers['set-cookie'][0];

                request(app).get('/r').set('Cookie', cookie).expect(200)
                        .end(function(err, res) {

                            if (err)
                                return done(err);
                            assert.deepEqual(res.text, '[99,105,97,111]');
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
            app.use(cookie('foo'));
            app.get('/', function(req, res) {

                res.send(vault.write(req, buffer2));
            });
            app.get('/r', function(req, res) {

                res.send(vault.read(req));
            });
            done();
        });

        it('nothing - should return buffer2', function(done) {

            request(app).get('/').expect(200).end(function(err, res) {

                if (err)
                    return done(err);
                var cookie = res.headers['set-cookie'][0];

                request(app).get('/r').set('Cookie', cookie).expect(200)
                        .end(function(err, res) {

                            if (err)
                                return done(err);
                            assert.deepEqual(res.text, '[1,2,3,4,5]');
                            done();
                        });
            });
        });
    });
});

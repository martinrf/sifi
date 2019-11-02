const supertest = require('supertest');
const express = require('express');
const assert = require('assert');

describe('widget feature backend routes', async () => {
  let app, request, widget;
  beforeEach(() => {
    widget = require('../../src/routes/widget');

    app = express();

    widget(app);
    request = supertest(app);
  });

  it('should respond with 200 status and a text saying the token is invalid', (done) => {
    request
      .get('/widget/verify')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        assert.deepStrictEqual(res.text, 'Invalid verify token');
        done();
      });
  });

  it('should respond with 200 status and a text saying hub.challenge', (done) => {
    request
      .get('/widget/verify?hub.verify_token=123&hub.challenge=XZFFdw342rg344')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        assert.deepStrictEqual(res.text, 'XZFFdw342rg344');
        done();
      });
  });

  it('should response 200 invalid token when backend cannot verify the token', (done) => {
    request
      .get('/widget/verify?hub.verify_token=444&hub.challenge=dsdf34DSFff')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        assert.deepStrictEqual(res.text, 'Invalid verify token');
        done();
      });
  });
});

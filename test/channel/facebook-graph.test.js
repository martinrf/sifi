const FacebookGraphTest = require('../../src/channel/facebook-graph');
const nock = require('nock');
const assert = require('assert');

describe('Facebook Graph API v4.0 Tests Suite', () => {
  let envVars;

  beforeEach(async () => {
    envVars = require('dotenv').config();
  });

  it('should send data to graph api and return the responses', async () => {
    nock('https://graph.facebook.com/v4.0')
      .post(`/me/messages?access_token=${envVars.parsed.ACCESS_TOKEN}`)
      .reply(200, { 'test': 'ok' });

    const result = await FacebookGraphTest().send({});
    assert(result.data, { 'test': 'ok' });
    assert(result.status, 200);
  });

  it('get user profile data returns data from response body', async () => {
    nock('https://graph.facebook.com/v4.0')
      .get(`/222?fields=first_name,last_name,profile_pic,locale,timezone,gender&access_token=${envVars.parsed.ACCESS_TOKEN}`)
      .reply(200, { 'data' : { 'first_name': 'test', 'last_name' : 'case', 'profile_pic': 'https://picurl.com'}});

    const result = await FacebookGraphTest().getUserProfileData(222);
    assert.ok(result.data);
  });
});

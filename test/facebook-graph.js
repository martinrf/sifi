const FacebookGraph = require('../src/channel/facebook-graph.js');
const nock = require('nock');
const assert = require('assert');


describe("Facebook Graph API Tests", function(){
  beforeEach(async () => {});

  it('should send data to graph api and return the responses', async () => {
    nock('https://testapi.com')
      .post('/me/messages?access_token=a32as3')
      .reply(200, { "test": "ok" });

    const fakeConfig = {
      "api_url": "https://testapi.com",
      "access_token": "a32as3"
    };
    const result = await FacebookGraph(fakeConfig).send({});
    assert(result.data, { "test": "ok" });
    assert(result.status, 200);
  });

  it('get user profile data returns data from response body', async () => {
    nock('https://testapi.com')
      .get('/222?fields=first_name,last_name,profile_pic,locale,timezone,gender&access_token=a32as3')
      .reply(200, { "data" : { "first_name": "test", 'last_name' : 'case', 'profile_pic': 'https://picurl.com'}});

    const fakeConfig = {
      "api_url": "https://testapi.com",
      "access_token": "a32as3"
    };
    const result = await FacebookGraph(fakeConfig).getUserProfileData(222);
    assert.ok(result.data);
  });
});

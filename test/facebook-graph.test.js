const nock = require('nock');
const assert = require('assert');
const facebookGraph = require('../src/channel/facebook-graph');

describe("Facebook Graph API Tests", function(){
  beforeEach(async () => {});

  it('should send data to graph api and return the responses', async () => {
    nock('https://graph.facebook.com/v4.0')
      .post('/me/messages?access_token=EAATbyvBn6z4BAMSHaDc7sZBsRJkD7ZBuIbtfGTPe9TQRjieH89dZCvzaaO7PGlGOKZB83kgKjX6ZBjAXNXKP7JGREnFth3QKomoZAqOBHeMYH1X33EMn7Lz6GJNpP3JqNa2PZCJKRVvPaj1w8XLg8UJ5jvpF6H6jwYcFrNBdHexga37MfbrTALW')
      .reply(200, { "result" : "test" });

    const result = await facebookGraph.send({});
    assert(result.data, { "result" : "test" });
  });
});

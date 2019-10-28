const catApi = require('../../src/bot/cat-api');
const nock = require('nock');
const assert = require('assert');

describe('Cat API Operations', async () => {

  it('getAll should return a single random image if called without configuration', async () => {
    const responseData = {
      "breeds": [],
      "id": "3l0",
      "url": "https://cdn2.thecatapi.com/images/3l0.jpg",
      "width": 500,
      "height": 333
    };

    nock('https://api.thecatapi.com/v1')
      .get('/images/search?size=&mime_types=&order=&limit=&page=&category_ids=&format=&breed_id=')
      .reply(200, responseData);

    const response = await catApi.getAll();
    assert(response);
    assert.deepStrictEqual(response.data, responseData)
  });
});

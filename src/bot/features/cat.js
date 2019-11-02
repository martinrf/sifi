const axios = require('axios');

/***
 * CatApi Intent
 */
class Cat {

  /***
   * Creates an instances of the Cat API.
   */
  constructor() {
    this.apiKey = 'dbd95fcf-00e9-4843-83e8-18ca44b6df02';
    this.apiUrl = 'https://api.thecatapi.com/v1';
  }

  /***
   * Gets all the cats for the given search options.
   * @returns {Promise<*>}
   */
  async getAll() {
    const { data } = await axios.get(`${this.apiUrl}/images/search`, {
      'method': 'get',
      'headers': { 'x-api-key': this.apiKey },
      'params': {
        'size': '',
        'mime_types': '',
        'order': '',
        'limit': '',
        'page': '',
        'category_ids': '',
        'format': '',
        'breed_id': ''
      }
    });
    return data;
  }

  /**
   * Get a cat image.
   */
  async get() {
    const cats = await this.getAll();
    return { url: cats[0].url, type: 'image' };
  }
}

module.exports = new Cat();

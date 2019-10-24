const axios = require('axios');

class FacebookAPI {

  /***
   * Sends Data to Messenger.
   * @param data: the payload message you want to post
   * @returns {Promise<*>}
   */
  async send(data) {
    const tuvieja = 'https://graph.facebook.com/v4.0';
    //const url = process.env.FACEBOOK_GRAPH_API + '/me/messages';
    const url = tuvieja + '/me/messages';// 'params': { 'access_token': process.env.MESSENGER_API_TOKEN }
    console.log('putes', url);

    const config = {
      'params': { 'access_token': 'EAATbyvBn6z4BAMSHaDc7sZBsRJkD7ZBuIbtfGTPe9TQRjieH89dZCvzaaO7PGlGOKZB83kgKjX6ZBjAXNXKP7JGREnFth3QKomoZAqOBHeMYH1X33EMn7Lz6GJNpP3JqNa2PZCJKRVvPaj1w8XLg8UJ5jvpF6H6jwYcFrNBdHexga37MfbrTALW' },
      'method': 'post'
    };
    const response = await axios.post(url, data, config);
    return response;
  }

  /***
   * Gets user profile data from Facebook.
   * @param userId
   * @returns {Promise<*>}
   */
  async getUserProfileData (userId) {
    const url = process.env.FACEBOOK_GRAPH_API + '/' + userId;
    const response = await axios.get(url, {
      'method': 'get',
      'params': {
        'fields': 'first_name,last_name,profile_pic,locale,timezone,gender',
        'access_token': process.env.MESSENGER_API_TOKEN
      }
    });
    return response.data;
  }
}

module.exports = new FacebookAPI();

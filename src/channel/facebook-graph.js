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
      'params': { 'access_token': 'EAAGhNyYczWwBAOibTQCrETOeAyxEeoKsZBhywi3wZAvGaDpe5EirepTsshlhkGmi0tsONIFlXImp3pTeTxKGOvzhS8jIB3GFPsoD7LIj3nlu6ZCqXpJHZCK24e4M33K2IORORwgznFHUNjBbVZBgxL6soDNioSSm5NTEOO2ptH3i9WhOSGYmL' },
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

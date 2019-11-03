const axios = require('axios');

/***
 * Facebook Graph API Communication
 */
class FacebookAPI {

  /***
   * Creates a new instance of FacebookAPI
   * @param config: configuration for the api usage.
   */
  constructor() {
    this.apiUrl = 'https://graph.facebook.com/v4.0';
    this.access_token = process.env.ACCESS_TOKEN;
  }

  /***
   * Sends Data to Messenger.
   * @param data: the payload message you want to post
   * @returns {Promise<*>}
   */
  async send(data) {
    const config = {
      'params': {
        'access_token': this.access_token
      },
      'method': 'post'
    };
    return await axios.post(`${this.apiUrl}/me/messages`, data, config);
  }

  /***
   * Gets user profile data from Facebook.
   * @param userId
   * @returns {Promise<*>}
   */
  async getUserProfileData (userId) {
    const response = await axios.get(`${this.apiUrl}/${userId}`, {
      'method': 'get',
      'params': {
        'fields': 'first_name,last_name,profile_pic,locale,timezone,gender',
        'access_token': this.access_token
      }
    });
    return response.data;
  }
}

module.exports = () => new FacebookAPI();

const api = require('./facebook-graph');
const message = require('./message');


/***
 * Orchestrate the Facebook API for bot Actions
 */
class Messenger {

  /***
   * Gets the User Profile data.
   * @param userId
   * @returns {Promise<*>}
   */
  async getUserProfileData(userId) {
    return await api().getUserProfileData(userId);
  }

  /***
   * Builds a message for Facebook and sends it over Messenger.
   * @param msg
   * @returns {Promise<*>}
   */
  async send(msg) {
    try {
      const newMessage = await message.build(msg);
      return await api().send(newMessage);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = new Messenger();

const api = require('./facebook-graph');

class Messenger {

  async getUserProfileData(userId) {
    return await api.getUserProfileData(userId);
  }

  async sendMessage(recipientId, message){
    const payload = await this.createPayload(recipientId, message);
    return await api.send(payload);
  }

  async createPayload(recipientId, message){
    return {
      'recipient': { 'id' : recipientId },
      'message': message,
      'notification_type': 'REGULAR'
    };
  }
}

module.exports = new Messenger();

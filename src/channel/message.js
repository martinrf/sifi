class Message {

  buildTextMessage(msg) {
    return {
      recipient: { id: msg.userId },
      message: { text: msg.text },
      notification_type: 'REGULAR'
    };
  }

  buildPromptMessage(msg) {
    let message = {
      recipient: { id: msg.user.facebook_id },
      message: { text: msg.text },
      notification_type: 'REGULAR'
    };
    if (msg.choices.length > 0) {
      //TODO: Implement logic to add choices to prompt(facebook quick replays).
    }
    return message;
  }

  build(message) {
    let newMessage = null;

    switch (message.type) {
      case 'text':
        newMessage = this.buildTextMessage(message);
        break;

      case 'prompt':
        newMessage = this.buildPromptMessage(message);
        break;

      default:
        break;
    }
    return newMessage;
  }
}

module.exports = new Message();
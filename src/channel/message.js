/**
 * Build different types of mesages in facebook format.
 */
class Message {

  /**
   * Build a media message. It supports images, GIFs, and videos.
   * @param msg 
   */
  buildImageMessage(msg) {
    let message = {
      recipient: {
        id: msg.user.facebook_id
      },
      message: {
        attachment: {
          type: 'image',
          payload: {
            url: msg.url,
            is_reusable: true
          }
        }
      }
    };
    return message;
  }
  /**
   * Build a text message.
   * @param msg 
   */
  buildTextMessage(msg) {
    return {
      recipient: { id: msg.user.facebook_id },
      message: { text: msg.text },
      notification_type: 'REGULAR'
    };
  }

  /**
   * Build a prompt message.
   * @param msg 
   */
  buildPromptMessage(msg) {
    let message = {
      recipient: { id: msg.user.facebook_id },
      message: { text: msg.text },
      notification_type: 'REGULAR'
    };
    if (msg.choices && msg.choices.length > 0) {
      //TODO: Implement logic to add choices to prompt(facebook quick replays).
    }
    return message;
  }

  /**
   * Return a message in the desired format based on type.
   * @param message 
   */
  build(message) {
    let newMessage = null;
    switch (message.type) {
      case 'text':
        newMessage = this.buildTextMessage(message);
        break;
      case 'prompt':
        newMessage = this.buildPromptMessage(message);
        break;
      case 'image':
        newMessage = this.buildImageMessage(message);
        break;
      default:
        break;
    }
    return newMessage;
  }
}

module.exports = new Message();

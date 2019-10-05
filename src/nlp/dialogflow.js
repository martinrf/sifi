const dialogflow = require('dialogflow');
const uuid = require('uuid');
const { DIALOGFLOW_PROJECT_ID } = process.env;

class Dialogflow {

  async detectIntent({ event, user }) {
    const sessionId = uuid.v4();
    const filePath = `${__dirname}/service-account-key.json`;
    const sessionClient = new dialogflow.SessionsClient({ keyFilename: filePath });
    const sessionPath = sessionClient.sessionPath(DIALOGFLOW_PROJECT_ID, sessionId);

    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: event.message.text,
          languageCode: user.locale,
        }
      }
    };

    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;
    return result.intent ? result.intent.displayName : null;
  }
}

module.exports = new Dialogflow();
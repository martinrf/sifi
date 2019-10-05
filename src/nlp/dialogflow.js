const dialogflow = require('dialogflow');
const uuid = require('uuid');
const { DIALOGFLOW_PROJECT_ID } = process.env;

class Dialogflow {

  async detectIntent({ event, user }) {
    const sessionId = uuid.v4();
    const filePath = `${process.cwd()}/src/gloud/service-account-key.json`;
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
    console.log('Detected intent');

    const result = responses[0].queryResult;
    console.log(`Query: ${result.queryText}`);
    console.log(`Response: ${result.fulfillmentText}`);

    if (result.intent) {
      console.log(`Intent: ${result.intent.displayName}`);

    } else {
      console.log('No intent matched.');
    }
  }
}

module.exports = new Dialogflow();
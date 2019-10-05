const { Storage } = require('@google-cloud/storage');

class GCloud {

  async authenticate() {
    const projectId = process.env.DIALOGFLOW_PROJECT_ID;
    const keyFilename = `${__dirname}/service-account-key.json`;
    const storage = new Storage({ projectId, keyFilename });

    try {
      const [buckets] = await storage.getBuckets();
      console.log('Buckets:');
      buckets.forEach(bucket => console.log(bucket.name));

    } catch (err) {
      console.error('ERROR:', err);
    }
  }
}

module.exports = new GCloud();
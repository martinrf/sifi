const assert = require('assert');
const proxyquire = require('proxyquire').noCallThru();

describe('Dialog manager class Tests Suite', () => {
  let dialog, dialogsMock;
  beforeEach(() => {
    dialogsMock = require('./dialogs.text.json');
    dialog = proxyquire('../../src/dialogs/dialog', {
      './dialogs.json': dialogsMock
    });
  });

  it('finds the dialog by the id', async () => {
    const dialogNode = dialog.findDialogById('testId');
    const dialogTest = {
      'type': 'text',
      'interaction': false,
      'texts': [
        'Hi text form test dialog.'
      ]
    };
    assert.ok(dialogNode);
    assert.deepStrictEqual(dialogNode, dialogTest);
  });

  it('returns an empty object if the dialog is not present', async () => {
    const dialogNode = dialog.findDialogById('notPresent');
    assert.deepStrictEqual(dialogNode, undefined);
  });
});

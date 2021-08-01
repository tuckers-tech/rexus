const { logError } = require('../helpers/logger');

let wss;

function setWSS(newWSS) {
  wss = newWSS;
}

function getWSS() {
  if (wss) {
    return wss;
  } else {
    logError(
      'Websocket.js',
      'Websocket Not initialized, please call setWSS() first',
    );
  }
}

module.exports = {
  setWSS,
  getWSS,
};

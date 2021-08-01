const { getWSS } = require('../websocket/websocket');
const Logger = require('./Logger');

class WebSocketController extends Logger {
  constructor(name) {
    super(`${name}-WebsocketController`);
  }

  initWSController() {
    const wss = getWSS();

    wss.on('connection', (ws) => {
      this.ws = ws;
      ws.on('message', (message) => {
        this.onGetWSMessage(message);
      });
    });
  }

  onGetWSMessage() {
    console.log('SET UP onGetWSMessage()');
  }
}

module.exports = WebSocketController;

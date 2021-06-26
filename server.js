const { startService } = require('./backend/service');
const http = require('http');
const ws = require('ws');

const PORT = process.env.PORT || 4375;

function setProcessEventHandlers() {
  process.on('SIGTERM', () => {
    process.exit();
  });
}

async function startServer() {
  const app = await startService();
  setProcessEventHandlers();

  const server = http.createServer(app);

  const wss = new ws.Server({ server });

  wss.on('connection', (ws) => {
    //connection is up, let's add a simple simple event
    ws.on('message', (message) => {
      //log the received message and send it back to the client
      console.log('received: %s', message);
      ws.send(`Hello, you sent -> ${message}`);
    });

    //send immediatly a feedback to the incoming connection
    ws.send('Hi there, I am a WebSocket server');
  });

  server.listen(PORT, () => {
    console.log(`Backend Listening On Port: ${PORT}`);
  });
}

startServer();

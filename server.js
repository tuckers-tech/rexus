const Service = require('./backend/service');
const http = require('http');
const ws = require('ws');
const { setWSS } = require('./backend/v1/websocket/websocket');

const PORT = process.env.PORT || 4375;

function setProcessEventHandlers() {
  process.on('SIGTERM', () => {
    process.exit();
  });
}

async function startServer() {
  const service = new Service();
  setProcessEventHandlers();

  const server = http.createServer(service.app);

  const wss = new ws.Server({ server });

  setWSS(wss);

  await service.startService();

  server.listen(PORT, () => {
    console.log(`Backend Listening On Port: ${PORT}`);
  });
}

startServer();

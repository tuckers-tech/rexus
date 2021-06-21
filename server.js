const { startService } = require('./backend/src/service');

const PORT = process.env.PORT || 4375;

function setProcessEventHandlers() {
  process.on('SIGTERM', () => {
    process.exit();
  });
}

async function startServer() {
  const app = await startService();

  setProcessEventHandlers();

  app.listen(PORT, () => {
    console.log(`Backend Listening On Port: ${PORT}`);
  });
}

startServer();

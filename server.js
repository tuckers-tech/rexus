const { startService } = require("./backend/src/service");

const PORT = process.env.PORT || 2375;

async function startServer() {
  const app = await startService();

  app.listen(PORT, () => {
    console.log(`Backend Listening On Port: ${PORT}`);
  });
}

startServer();

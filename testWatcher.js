const redis = require('redis');
const { v4 } = require('uuid');

const client = redis.createClient();

let key = 0;

setInterval(() => {
  const newUUID = v4();
  console.log(`Setting: ${newUUID}:${key}`);
  client.set(newUUID, key);
  key++;
}, 1000);

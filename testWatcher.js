const redis = require('redis');

const client = redis.createClient();

let key = 0;

setInterval(() => {
  console.log(`Setting: ${key}:${key}`);
  client.set(key, key);
  key++;
}, 1000);

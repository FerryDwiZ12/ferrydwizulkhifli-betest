const redis = require("redis");

const client = redis.createClient({
        url : process.env.HOST_REDIS
  });
client.on("error", (err) => console.log("Redis Client Error", err)).connect();

module.exports = { client };
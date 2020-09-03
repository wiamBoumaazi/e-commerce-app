const express = require('express')
const redis = require('redis')
const app = express()
const client = redis.createClient();
const port = 4009;

//const WebSocket = require('ws');
app.get('/api/redis/*' , (req, res) => {
    client.publish("PubSubChannel",'Something has been sold!!!'); //going to this page should send msg to all subscribe pages
    console.log("service hit!")
    res.send('service hit!'); //tested with a tester page 
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`))


//./src/redis-server
//./src/redis-cli
//./bin/mongod --dbpath ./db
//pm2 start process.config.js
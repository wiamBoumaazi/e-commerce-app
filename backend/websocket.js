const WebSocket = require('ws');
const express = require("express");
const options ={
    port: 4008, 
}
const app = express();
const port1 = 5000;

const redis = require('redis');
const client = redis.createClient();

const wss = new WebSocket.Server(options);

const sales = [];
const itemViewCount = {};

const broadcastMessage = (message) => {
    wss.clients.forEach((client) => {
        if(client.readyState === WebSocket.OPEN){
            // if currently active
            client.send(JSON.stringify(message));  //send to client from server
            //JSON to convert 
        }
    });
};

// client.on('message', (channel, message) => {
//     console.log(`Subs hears message ${message}`);
//     wss.clients.forEach((client) => {
//         client.send(JSON.stringify(message));
//         //console.log(message);
//         //client.alert(message);
//     });
// });

client.subscribe('PubSubChannel');

const updateUserCount = () => {
    broadcastMessage({
        type: 'UPDATE_USER_COUNT',
        count: wss.clients.size, //number of ws clients
    });
};

const updateSold = (newSale) => {
    console.log('log');
   // sales.unshift(newSale);
    broadcastMessage({
        type: 'UPDATE_SOLD',
        user: newSale,
    })
}

const updateItemViewCount = (productId) => {

    if (productId in itemViewCount) {
        itemViewCount[productId] = itemViewCount[productId] + 1;
    }
    else {
        itemViewCount[productId] = 1;
    }
    broadcastMessage({
        type: 'UPDATE_ITEM_VIEW_COUNT',
        itemViewCount: itemViewCount
    });
}

const decrementItemViewCount = (productId) => {

    if (productId in itemViewCount) {
        itemViewCount[productId] = itemViewCount[productId] - 1;
    }
    else {
        itemViewCount[productId] = 0;
    }
    broadcastMessage({
        type: 'UPDATE_ITEM_VIEW_COUNT',
        itemViewCount: itemViewCount
    });
}

app.get("/api/websocket/viewCount", (req, res) => {
    const { productID } = req.query;
    console.log(productID);
    updateItemViewCount(productID);
    res.send({ valid: true });
});

app.get("/api/websocket/decrementViewCount", (req, res) => {
    const { productID } = req.query;
    console.log(productID);
    decrementItemViewCount(productID);
    res.send({ valid: true });
});

//event 1 connection
wss.on('connection', (ws) => {  //ws represents a single connection to a single tab
    //when someone connects, this is call
    //ws stays open entire time you on page
    console.log('Someone connected'); //to test connection 
    updateUserCount();
    
    //event 2 message
    
    ws.on('message' , (message) => {
        console.log(message);
        const messageObject = JSON.parse(message);
        
        switch(messageObject.type){
            
            case 'UPDATE_SOLD':
                updateSold(messageObject.newSale);
               
                break;
          
            default:
                console.log('Message type not supported');
        }
    });
    

    //event 3 close, when client disconnects
    ws.on('close' , () => {
        console.log('Someone has disconnected');
        updateUserCount();
    });

    //event 4 clent crashed
    ws.on('error', (e) => {
        console.log(e);
    });
})

app.listen(port1, () =>
  console.log(`Example app listening at http://localhost:${port1}`)
);

//  AXIOS
const axios = require("axios");

//  EXPRESS
const express = require("express");
const app = express();
const KafkaProducer = require("./KafkaProducer.js");

const producer = new KafkaProducer("myTopic");

//  MONGODB
const { MongoClient, ObjectID } = require("mongodb");
const database_url = "mongodb://localhost:27017";
const database_name = "FinalProjectDB";
const mongodb_client = new MongoClient(database_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//  LISTENING PORT
const port = 4002;

//  MIDDLEWARE
app.use(express.json());

//  MONGODB CONNECT AND MAIN LOGIC
mongodb_client.connect((err) => {
  if (err) {
    //  ERROR LOGGING
    console.log(err);
    process.exit(1);
  }

  //  MONGODB SUCCESSFUL CONNECTED
  console.log("MongoDB connected/");

  //  MONGODB USE DATABASE
  const db = mongodb_client.db(database_name);

  //  POST REQUEST >>>>>>>>>>>>>>>>>>>>> CREATE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  app.post("/api/transaction/create", (req, res) => {
    console.log("Transaction is being inserted....");

    //  TRANSACTION FROM REACT IS SAVED HERE THROUGH POST BODY
    const {
      transaction_id,
      buyer_username,
      items,
      total_amount,
    } = req.body.transaction_details[0];
    const receipt_service = [
      {
        transaction_id: transaction_id,
        buyer_username: buyer_username,
        items: items,
        total_amount: total_amount,
      },
    ];
    //  MONGODB FIND ONE
    producer.send(receipt_service);

    db.collection("TransactionCollection")
      .findOne({
        transaction_id: transaction_id,
      })
      .then((doc) => {
        if (doc === null) {
          //  IF DOCUMENT DOES NOT EXIST, CREATE IT
          db.collection("TransactionCollection").insertOne({
            transaction_id: transaction_id,
            buyer_id: buyer_username,
            items: items,
            total_amount: total_amount,
          });
          res.send({ valid: true, msg: "item added to queue" });
          console.log("Insertion of transaction is completed....");
        } else {
          //  IF DOCUMENT DOES EXIST, IT IS A DUPLICATE AND LOG ERROR
          res.send({
            valid: false,
          });
          console.log("Insertion error...transaction already exists....");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  });
  //  POST REQUEST >>>>>>>>>>>>>>>>>>>>> CREATE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  //  GET REQUEST >>>>>>>>>>>>>>>>>>>>> ORDER HISTORY >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  app.get("/api/transaction/orderHistory", (req, res) => {
    //  FIND HISTORY FROM REACT IS SAVED HERE THROUGH QUERY
    const { buyer_username } = req.query;

    //  MONGODB FIND
    db.collection("TransactionCollection")
      .find({ buyer_username: buyer_username })
      .toArray()
      .then((doc) => {
        if (doc.length === 0) {
          //  IF NOT HISTORY FOUND, DO NOTHING, JUST ALERT
          res.send({ valid: false });
        } else {
          //  OTHERWISE, RETURN ALL DOCUMENTS WITH MATCHING USERNAME
          res.send({ valid: true, values: doc });
        }
      })
      .catch((e) => {
        //  ERROR LOGGING
        console.log(e);
      });
  });
  //  GET REQUEST >>>>>>>>>>>>>>>>>>>>> ORDER HISTORY >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  producer.connect(() => {
    app.listen(port, () =>
      console.log(`Example app listening on port ${port}!`)
    );
  });
});

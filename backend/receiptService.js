const express = require("express");
const KafkaProducer = require("./KafkaProducer.js"); // this is like the helper class

const producer = new KafkaProducer("myTopic"); // connecting to producer

const app = express();
const port = 5000;
let data = {
  transaction_id: "7689023",
  buyer_id: "Likhitha",
  items: [
    {
      product_id: "12",
      product_name: "Iphone",
      quantity: "2",
      price: "1000",
      seller_username: "",
      seller_name: "",
    },
    {
      product_id: "13",
      product_name: "Laptop",
      quantity: "1",
      price: "2500",
      seller_username: "",
      seller_name: "",
    },
  ],
  total_amount: "3500",
};
app.get("/", (req, res) => {
  //pretend it takes long time
    // setTimeout(() => {
  //     //something that takes a really long time
  //     res.send("Hello World!");
  //   }, 5000);
  console.log("Pushing new item to queue");
  producer.send(data); //we are removing workload from api server, and inserts item into the queue
  res.send("Item added into queue");
});

producer.connect(() => {
  app.listen(port, () => console.log(`Port listening on ${port}`));
});

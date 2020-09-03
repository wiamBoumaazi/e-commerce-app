const express = require("express");
const { MongoClient, ObjectID } = require("mongodb");
const app = express();
const port = 4003;

app.use(express.json());

// To connect open compress community and hit connect without the inputting anything

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "FinalProjectDB";

// Create a new MongoClient
const client = new MongoClient(url);

// TODO
// add itemID list with unique number for each item
// add description to seller adding new item

// Use connect method to connect to the Server
client.connect((err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  console.log("Connected successfully to server");
  const db = client.db(dbName);

  // update for checkout
  // http://localhost:4003/api/inventory/sellUpdate?itemId=testitem&amount=1
  app.get("/api/inventory/sellUpdate", (req, res) => {
    console.log("Updating Inventory (Sell)");
    sold = -req.query.amount;
    db.collection("Inventory")
      .findOneAndUpdate(
        { item: req.query.itemId },
        { $inc: { inventory: sold } },
        { returnOriginal: false }
      )
      //   .findOne({
      //       item:req.query.itemId
      //   })
      //   .update(
      //       {item: req.query.itemID},
      //       {
      //           $set: {inventory: req.query.amount}
      //       }
      //   )
      .then((doc) => {
        console.log(doc);
        //console.log(req.query.amount);
        x = doc.value;
        res.send({
          x,
        });
      })
      .catch((e) => {
        console.log(e);
        res.send("Error", e);
      });
  });

  // Seller Update
  // http://localhost:4003/api/inventory/inventoryUpdate?itemId=testitem&price=2&amount=1
  app.get("/api/inventory/inventoryUpdate", (req, res) => {
    name = req.query.itemId;
    price = req.query.price;
    stock = parseInt(req.query.amount);
    console.log(typeof stock);
    db.collection("Inventory")
      .findOneAndUpdate(
        { item: name },
        { $set: { prices: price }, $inc: { inventory: stock } },
        { returnOriginal: false }
      )
      .then((doc) => {
        console.log(doc);
        res.send({ doc });
      })
      .catch((e) => {
        console.log(e);
        res.send("Error", e);
      });
  });

  // Seller Update (New Item)
  // http://localhost:4003/api/inventory/newItem?itemId=testitem2&price=2&amount=5
  app.post("/api/inventory/newItem", (req, res) => {
    seller = req.body.seller;
    name = req.body.itemName;
    id = req.body.itemID;
    price = req.body.itemPrice;
    stock = req.body.itemQuantity;
    desc = req.body.itemDesc;
    //console.log(typeof(name));

    const { itemName } = req.body;

    console.log(stock);

    db.collection("Inventory")
      .findOne({ product_name: name }, { $exists: true })
      .then((doc) => {
        if (doc) {
          console.log(doc);
          res.send({ valid: false });
        } else {
          db.collection("Inventory")
            .insertOne({
              seller_username: seller,
              product_id: id,
              product_name: name,
              price: price,
              quantity_left: stock,
              product_description: desc,
              quantity_sold: 0,
            })
            .then((newDoc) => {
              console.log(newDoc.ops);
              res.send({ valid: "true" });
            });
        }
      });

    // db.collection('Inventory')
    //     .insertOne(
    //         {"item": name,~
    //         "prices": price,
    //         "inventory": stock},
    //     )
    //     .then(doc => {
    //         //console.log(doc);
    //         res.send({doc})
    //     })
    //     .catch(e => {
    //         console.log(e);
    //         res.send('Error', e);
    //     });
    // res.send("Not find");
    // console.log("fail")
  });

  //get seller itmes
  app.post("/api/inventory/getMyItems", (req, res) => {
    seller = req.body.seller;
    console.log(seller);
    db.collection("Inventory")
      .find({
        seller_username: seller,
      })
      .toArray()
      .then((doc) => {
        console.log(doc);
        // qty = doc.inventory
        res.send(doc);
      })
      .catch((e) => {
        console.log(e);
      });
  });

  app.get("/api/inventory/allitems", (req, res) => {
    // seller = req.body.seller;
    // console.log(seller);
    db.collection("Inventory").find().toArray()      
      
      .then((doc) => {
        console.log(doc);
        // qty = doc.inventory
        res.send(doc);
      })
      .catch((e) => {
        console.log(e);
      });
  });

  // Get Inventory Amount
  // http://localhost:4003/api/inventory/inventoryCheck?itemId=testitem
  app.get("/api/inventory/inventoryCheck", (req, res) => {
    lookingFor = req.query.itemId;
    db.collection("Inventory")
      .findOne({
        item: lookingFor,
      })
      .then((doc) => {
        qty = doc.inventory;
        return qty;
      })
      .catch((e) => {
        console.log(e);
      });
  });

  // Get Item image
  // http://localhost:4000/api/getImage?itemId=testitem
  app.get("/api/getImage", (req, res) => {});

  // get buyer itempage
  app.get("/api/inventory/items", (req, res) => {
    const { itemId } = req.query;
    db.collection("Inventory")
      .findOne({ product_id: itemId })
      .then((doc) => {
        if (doc === null) {
          res.send({ valid: false, msg: "Item not found" });
        } else {
          res.send({ valid: true, result: doc });
        }
      })
      .catch((e) => {
        console.log(e);
      });
  });

  // inventory update after an item bought
  app.post("/api/inventory/itemUpdate", (req, res) => {
    const { product_id, qty_left, qty_sold } = req.body;
    db.collection("Inventory")
      .findOneAndUpdate(
        { product_id: product_id },
        { $set: { quantity_sold: qty_sold, quantity_left: qty_left } }
      )
      .then((doc) => {
        res.send({ valid: true });
      })
      .catch((e) => {
        console.log(e);
        res.send({ valid: false });
      });
  });

  app.get("/api/inventory/allItems", (req, res) => {
    db.collection("Inventory")
    .find({}).toArray()
    .then((doc) => {
      console.log(doc);
      res.send({valid: true, results: doc});
    })
    .catch(e => console.log(e))
  })

  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});

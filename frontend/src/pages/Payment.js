import React, { useEffect } from "react";
import "../App.css";
import { connect } from "react-redux";
import { TextField, Button, Select, MenuItem } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch } from "react-router-dom";
import {
  setCartItems,
  setCartEmpty,
} from "../redux/actions/buyerActions";
import ws from "../index";
//const ws = new WebSocket('ws://localhost:4008');

const FlakeIdGen = require("flake-idgen");
const intformat = require("biguint-format");
const generator = new FlakeIdGen();

const Payment = ({ cartItems, userid, total_amount }) => {
  let month = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
  const year = ["2021", "2022", "2023", "2024", "2025", "2026"];
  const [mon, setMon] = React.useState("");
  const [adr, setAdr] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");
  const [zip, setZip] = React.useState("");
  const [card, setCard] = React.useState("");
  const [name, setName] = React.useState("");
  const [cvv, setCvv] = React.useState("");
  const [year1, setYear1] = React.useState("");
  const [msg, setMsg] = React.useState("");
  const [disableBuyNow, setDisableBuyNow] = React.useState(false);
  const [toolTipBuyNow, setToolTipBuyNow] = React.useState(
    "Click here to buy now"
  );
  const [notify, setNotify] = React.useState(false);

  useEffect(() => {
    if (cartItems.length === 0) {
      setDisableBuyNow(true);
      setToolTipBuyNow("Cart is Empty!!!");
    }
  });

  const handleMonth = (e) => {
    setMon(e.target.value);
  };
  const handleYear = (e) => {
    setYear1(e.target.value);
  };
  const handleBuy = () => {
    if (
      (adr.length &&
        city.length &&
        state.length &&
        zip.length &&
        card.length &&
        name.length &&
        cvv.length &&
        mon.length &&
        year1.length) === 0
    ) {
      console.log("error");
      setMsg("Error");
      setNotify(false);
    } else {
      setMsg("");
      let id = generator.next();
      let uniqueId = intformat(id, "dec");
      let transaction_details = [];
      let each_item = [];
      cartItems.map((value) => {
        let item = [
          {
            product_id: value.product_id,
            product_image: value.product_image,
            product_name: value.product_name,
            quantity: value.quantity,
            price: value.price,
            seller_username: value.seller_username,
          },
        ];
        each_item.push(item);
      });
      // console.log(each_item);
      let each_transaction = {
        transaction_id: uniqueId,
        buyer_username: userid,
        items: each_item,
        total_amount: total_amount,
      };
      transaction_details.push(each_transaction);
      const body = {
        transaction_details: transaction_details,
      };

      const content = {
        type: 'UPDATE_SOLD',
        newSale: userid,
      };

      console.log('ws sent');
      ws.send(JSON.stringify(content));

      axios
        .post("/api/transaction/create", body)
        .then((res) => {
          if (res.data.valid) {
            console.log("transaction succesfully inserted..");
            console.log(res.data.msg);
            let qty_left =
              parseInt(cartItems[0].qty_left) - parseInt(cartItems[0].quantity);
            let qty_sold =
              parseInt(cartItems[0].qty_sold) + parseInt(cartItems[0].quantity);
            const body = {
              product_id: cartItems[0].product_id,
              qty_sold: qty_sold,
              qty_left: qty_left,
            };
            /*
            axios   //to call the notification to send a message, not working
              .post("/api/redis/*")
              .then((res) => {
                console.log(res)
            })
            .catch((e)=> {
              console.log(e)
            });
          */
            axios
              .post("/api/inventory/itemUpdate", body)
              .then((res) => {
                if (res.data.valid) {
                  console.log("inventory updated succesfully..");
                  setNotify(true);
                  setCartItems([]);
                  setCartEmpty(true);
                } else {
                  console.log("inventory updated failed");
                }
              })
              .catch((e) => {
                console.log(e.response);
              });
          } else {
            console.log("inserting transaction failed");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  return (
    <div className="d-flex justify-content-center">
      <div className="m-3">
        <div>
          <h4>Payment Information</h4>
          <div className="d-flex flex-column">
            {console.log(notify)}
            {notify &&
            <div className="m-2">
                <b>Item(s) has purchased..</b>
            </div> }
            <div className="mt-2">
              <b>Shipping Details</b>
            </div>
            <div className="mt-2">
              <TextField
                id="Address"
                size="small"
                label="Address"
                variant="outlined"
                value={adr}
                onChange={(e) => setAdr(e.target.value)}
              />
            </div>
            <div className="mt-2">
              <TextField
                id="City"
                size="small"
                label="City"
                variant="outlined"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="mt-2">
              <TextField
                id="State"
                size="small"
                label="State"
                variant="outlined"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>
            <div className="mt-2">
              <TextField
                id="Zipcode"
                size="small"
                label="Zipcode"
                variant="outlined"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="mt-4">
          <b>Payment Details</b>
          <div className="d-flex flex-column">
            <div className="mt-2">
              <TextField
                id="name-field"
                size="small"
                label="Name on the card"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mt-2">
              <TextField
                id="card-field"
                size="small"
                label="Credit Card"
                variant="outlined"
                value={card}
                onChange={(e) => setCard(e.target.value)}
              />
            </div>
            <div className="d-flex mt-1 justify-content-around">
              <div>Month</div>
              <div>Year</div>
            </div>
            <div className="d-flex justify-content-around">
              <div>
                <Select value={mon} onChange={handleMonth}>
                  {month.map((value) => (
                    <MenuItem key={value} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <div>
                <Select value={year1} onChange={handleYear}>
                  {year.map((value) => (
                    <MenuItem key={value} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </div>
            </div>
            <div className="mt-2">
              <TextField
                id="cvv-field"
                size="small"
                label="cvv"
                variant="outlined"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="d-flec justify-content-center mt-3">
          {msg === "Error" && <b>Please enter all the details</b>}
        </div>
        <Tooltip title={toolTipBuyNow}>
          <div className="d-flex mt-2 justify-content-center">
            <Button
              className="buy-now"
              onClick={handleBuy}
              disabled={disableBuyNow}
            >
              Buy now
            </Button>


            <Link to={`/Buyer`}>Go Back</Link>
          </div>
        </Tooltip>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.buyerReducer.cartItems,
    userid: state.buyerReducer.userid,
    total_amount: state.buyerReducer.total_amount,
  };
};

export default connect(mapStateToProps)(Payment);

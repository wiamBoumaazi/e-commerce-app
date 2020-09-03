import React, { useEffect } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import { connect } from "react-redux";
import { setBuyerInventory } from "../redux/actions/buyerActions";
import { setItemID } from "../redux/actions/sellerActions";
import "./BuyerInventory.css";

const BuyerInventory = ({ buyerInventory, dispatch }) => {
  const [render, Setrender] = React.useState(0);
  //   const [items, setItems] = React.useState("");

  useEffect(() => {
    fetchApi();
  }, [render]);

  const fetchApi = async () => {
    await fetch(`/api/inventory/allItems`)
      .then((res) => res.json())
      .then((data) => {
        if (data.valid) {
          dispatch(setBuyerInventory(data.results));
        } else {
          console.log("error");
        }
      })
      .catch((e) => console.log(e));
  };
  return (
    <div className="d-flex flex-column buyer-inventory justify-content-center">
      Buyer Inventory
      {console.log(buyerInventory)}
      {buyerInventory.map((value, i) => (
          <Link key={i} to={`/itemPage`} onClick={() => dispatch(setItemID(value.product_id))}>
        <div key={i} className="d-flex flex-column m-3 item-card p-1">
          <div className="d-flex justify-content-between ">
            <div className="buyer-prod-name">{value.product_name}</div>
            <div className="">Quantity: {value.quantity_left}</div>
          </div>
          <div className="d-flex justify-content-between">
            <div>Sold by: {value.seller_username}</div>
            <div>Price: ${value.price}</div>
          </div>
        </div></Link>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    buyerInventory: state.buyerReducer.buyerInventory,
  };
};

export default connect(mapStateToProps)(BuyerInventory);

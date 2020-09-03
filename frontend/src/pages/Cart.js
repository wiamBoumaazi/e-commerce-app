import React, { useEffect } from "react";
import "../App.css";
import { connect } from "react-redux";
import { Button } from "@blueprintjs/core";
import { setTotalAmount } from "../redux/actions/buyerActions";
import { Link, useRouteMatch } from "react-router-dom";

const Cart = ({ cartItems, cartEmpty, isLoggedIn, total_amount, dispatch }) => {
  const [msg, setMsg] = React.useState("");

  // const [render, setRender] = React.useState(0);
  let values;
  let match = useRouteMatch();

  const [render, setRender] = React.useState(0);

  useEffect(() => {
     totalAmount();
  }, [render]);

  
  const totalAmount = () => {
    let amount = 0;
    cartItems.map((value) => {
      amount = amount + parseInt(value.price);
    });
    dispatch(setTotalAmount(amount));
    console.log(total_amount);
  };

  const handleClose = (index) => {
    cartItems.splice(index, 1);
    setRender(render + 1);
  };

  const handleCheckout = () => {
    // console.log(`${userid}`);
    // console.log(isLoggedIn);
    if (isLoggedIn) {
      console.log("checkout");
      setMsg("true");
    } else {
      console.log("please login");
      setMsg("false");
    }
  };

  const goBack = () => {};

  return (
    <>
      <div>
        <h4>Shopping Cart</h4>
        {cartEmpty === false ? (
          <div className="d-flex flex-column ml-4">
            {
              (console.log(cartItems),
              cartItems.map((value, index) => (
                <div
                  key={index}
                  className="d-flex justify-content-between cart-block h-40 m-3 p-2 cart-items"
                >
                  <div className="d-flex">
                    {/* <div className="order-img">
                      <img
                        src={value.product_image}
                        className="img-thumbnail"
                      />
                    </div> */}
                    <div className="d-flex flex-column ml-4">
                      <div>{value.product_name}</div>
                      <div>Sold by: {value.seller_name}</div>
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="d-flex flex-column">
                      <div>Qty: {value.quantity}</div>
                      <div>Price: ${value.price}</div>
                    </div>
                    <div className="ml-4 justify-content-center">
                      <Button
                        id={index}
                        icon="cross"
                        onClick={() => handleClose(index)}
                      />
                    </div>
                  </div>
                </div>
              )))
            }
            <div>Total Amount : ${total_amount}</div>
            <div>
              {isLoggedIn ? (
                <Link to={`/payment`}>
                  <Button onClick={handleCheckout}>Proceed to checkout</Button>
                </Link>
              ) : (
                <Button onClick={handleCheckout}>Proceed to checkout</Button>
              )}
            </div>
            <div className="mt-3">
              {msg === "false" && <b>Please login before checking out...</b>}
              {msg === "true" && <b>Item added into cart</b>}
            </div>
          </div>
        ) : (
          <b>Cart is Empty</b>
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.buyerReducer.cartItems,
    cartEmpty: state.buyerReducer.cartEmpty,
    isLoggedIn: state.buyerReducer.isLoggedIn,
    total_amount: state.buyerReducer.total_amount,
  };
};
export default connect(mapStateToProps)(Cart);

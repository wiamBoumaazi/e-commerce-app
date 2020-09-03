import React from "react"
import { connect } from "react-redux";
import { InputGroup, FormControl, Button, Nav, Navbar, Form } from "react-bootstrap"
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, Redirect } from "react-router-dom";
import {  
  setTransactionId, 
  setBuyingState, 
  setProductId, 
  setProductName, 
  setSellerUsername, 
  setBuyerUsername, 
  setQuantityLeft, 
  setIsLoggedIn,
  buying  
} from "../redux/actions/buyerActions";


const Buy = ({
    itemName,
    itemId,
    quantity_left,
    dispatch,
    buyingState,
    buy_msg,
    isLoggedIn,

  }) => {



    if (buyingState==='not logged in') {
      console.log("user not logged in")
      buy_msg='You are not logged in'
      dispatch(setBuyingState('not logged in'));
    
    //return <Redirect to="/" />;
  }

    if (buyingState==='item does not exist') {
      buy_msg='item does not exist'
      console.log("item does not exist")
      dispatch(setBuyingState('item does not exist'));
    
    //return <Redirect to="/" />;
  }

    if (buyingState==='finished buying') {
        buy_msg='purchase successful'
        console.log("itemQuantity: " + quantity_left)
        dispatch(setBuyingState('finished buying'));
      
      //return <Redirect to="/" />;
    }
  
    if (buyingState==='item out of stock') {
      buy_msg='item out of stock'
      console.log("itemQuantity: " + quantity_left)
      dispatch(setBuyingState('item out of stock'));

    //return <Redirect to="/" />;
    }


    return (
        // <Router>
        <div>    
          <div className="Seller-Input">
            {
            /* <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">Product Seller</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="Product Seller"
                aria-label="Product Seller"
                aria-describedby="basic-addon1"
                id="name-field"
                onChange={(e) => dispatch(setSellerUsername(e.target.value))}
              />
            </InputGroup> */}


            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">Product ID</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="Product ID"
                aria-label="Product ID"
                aria-describedby="basic-addon1"
                id="name-field"
                onChange={(e) => dispatch(setProductId(e.target.value))}
              />
            </InputGroup>
            <Button variant="dark" type="submit" onClick={() => dispatch(buying())}>
              Purchase
            </Button>
          </div>
          <div>
           {buyingState === 'item does not exist' && (
              <div>
                <p>
                  {buy_msg}
                </p>
              </div>
            )}  
            {buyingState === 'finished buying' && (
              <div>
                <p>
                  {buy_msg}
                </p>
              </div>
            )}
            {buyingState === 'buying' && (
              <div>
                <p>
                  {buy_msg}
                </p>
                <p>
                  {quantity_left}
                </p>
              </div>
            )}
            {buyingState === 'item out of stock' && (
              <div>
                <p>
                  {buy_msg}
                </p>
                <p>
                  {quantity_left}
                </p>
              </div>
            )}
            {buyingState === 'not logged in' && (
              <div>
                <p>
                  {buy_msg}
                </p>
              </div>
            )}
          </div>

        </div>
    )}

  const mapStateToProps = (state) => {
    return {
        product_id: state.buyerReducer.product_id,
        buyer_username: state.buyerReducer.buyer_username,
        seller_username: state.buyerReducer.seller_username,
        quantity_left: state.buyerReducer.quantity_left,
        buyingState: state.buyerReducer.buyingState,
        quantity_left: state.buyerReducer.quantity_left,
    };
  };
  
  
  export default connect(mapStateToProps)(Buy);
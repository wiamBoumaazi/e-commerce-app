import React, {Component} from "react"
import { connect } from "react-redux";
import { InputGroup, FormControl, Button, Nav, Navbar, Form } from "react-bootstrap"
import { Chart } from "react-google-charts";
import { setItemName, setItemPrice, setItemQuantity, setItemDesc, item } from "../redux/actions/sellerActions";
import Selling from './Selling';
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch } from "react-router-dom";

const Sell  = ({
  
    dispatch,
    isAddedStatus,
    
  }) => {
    
    
 
    return (
        // <Router>
        <div>
          
          
          
    
          <div className="Seller-Input">
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">Item Name</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="Item name"
                aria-label="Item name"
                aria-describedby="basic-addon1"
                id="name-field"
                onChange={(e) => dispatch(setItemName(e.target.value))}
              />
            </InputGroup>
    
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text>$</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl placeholder="Price"
                aria-label="Price"
                aria-describedby="basic-addon1"
                id="price-field"
                onChange={(e) => dispatch(setItemPrice(e.target.value))}
              />
              <InputGroup.Append>
                <InputGroup.Text>.00</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
    
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
              </InputGroup.Prepend>
              <FormControl placeholder="Quantity"
                aria-label="Quantity"
                aria-describedby="basic-addon1"
                id="Quantity-field"
                onChange={(e) => dispatch(setItemQuantity(e.target.value))}
              />
            </InputGroup>
    
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text>Description</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl as="textarea" aria-label="With textarea" id="desc-field" onChange={(e) => dispatch(setItemDesc(e.target.value))} />
            </InputGroup>
    
            <Button variant="dark" type="submit" onClick={() => dispatch(item())}>
              Submit
      </Button>
          </div>



          <div>
        {isAddedStatus === "Added" && (
          <div><p>Add Succeesful</p></div>
        )}
      </div>

      <div>
        {isAddedStatus === "fail" && (
          <div><p>Item exist</p></div>
        )}
      </div>

      <div>
        {isAddedStatus === "empty" && (
          <div><p>Fill all box</p></div>
        )}
      </div>

          </div>
    );

  }

  const mapStateToProps = (state) => {
    return {
      itemName: state.sellerReducer.itemName,
      itemPrice: state.sellerReducer.itemPrice,
      itemQuantity: state.sellerReducer.itemQuantity,
      itemDesc: state.sellerReducer.itemDesc,
      isAddedStatus: state.sellerReducer.isAddedStatus,
  
    };
  };
  
  
  export default connect(mapStateToProps)(Sell);
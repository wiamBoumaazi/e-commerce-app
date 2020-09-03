import React from "react"
import { connect } from "react-redux";
import {  Button, Nav, Navbar, Form } from "react-bootstrap"

import { getItems, setIsLoggedIn} from "../redux/actions/sellerActions";
import Selling from './Selling';
import Sell from './Sell';
import myItem from './myItem';
import ItemPage from "./ItemPage";
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch } from "react-router-dom";



const Seller = ({dispatch, isLoggedIn, productID}) => {
  let match = useRouteMatch();
  console.log(isLoggedIn);
  return (
    
    <div>
      {
       !isLoggedIn && (
      <div><h1>Please login</h1>
      <Link to={"/"}>Back to Home</Link>
      </div>
        ) }
     {
     
     isLoggedIn && (
      <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>Sell Something</Navbar.Brand>
        <Nav className="mr-auto">
          {/* <Nav.Link href="/Selling">My Item</Nav.Link> */}
          {/* <Nav.Link href={`${match.path}/myItem`}>My Item</Nav.Link> */}
          <span className="block">
          <Link to={`/Seller`}>Sell</Link>
          </span>
          <span className="block">
          <Link to={`${match.path}/myitem`} onClick={() => dispatch(getItems())}>My Item</Link>
          </span>
          {/* <Link to={`${match.url}/Selling`}>My Item</Link> */}
          <span className="block">
          <Link to={`${match.path}/Selling`} onClick={() => dispatch(getItems())}>Report</Link>
          </span>
          <Button variant="primary" type="submit" to ="/sellerlogin" onClick={() => dispatch(setIsLoggedIn(false)) }>
       logOut
       </Button >
        </Nav>
      </Navbar>



      <Switch>
        <Route path={`/itemPage`} component={ItemPage} />      
        <Route path={`${match.path}/Selling`} component={Selling} />
        <Route path={`${match.path}/myItem`} component={myItem} />
        <Route path={`${match.path}`} component={Sell} />
      </Switch>

      
      
       
     
      </div>
     
     )}
      


    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.sellerReducer.isLoggedIn,
    itemName: state.sellerReducer.itemName,
    itemPrice: state.sellerReducer.itemPrice,
    itemQuantity: state.sellerReducer.itemQuantity,
    itemDesc: state.sellerReducer.itemDesc,
    isAddedStatus: state.sellerReducer.isAddedStatus,
    productID: state.sellerReducer.itemID,
  };
};


export default connect(mapStateToProps)(Seller);
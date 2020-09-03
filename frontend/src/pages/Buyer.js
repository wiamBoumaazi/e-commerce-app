import React from "react";
import { connect } from "react-redux";
import {
  InputGroup,
  FormControl,
  Button,
  Nav,
  Navbar,
  Form,
} from "react-bootstrap";
import { Chart } from "react-google-charts";

import { getItems, setIsLoggedIn} from "../redux/actions/sellerActions";
import PurchaseHistory from './PurchaseHistory';
import Cart from './Cart';
import ItemList from './ItemList';
import ItemPage from './ItemPage';
import payment from './Payment';
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch } from "react-router-dom";



const Seller = ({ dispatch, isLoggedIn, productID }) => {
  let match = useRouteMatch();
  console.log(isLoggedIn);
  return (
    <div>
      {!isLoggedIn && (
        <div>
          <h1>Please login</h1>
          <Link to={"/"}>Back to Home</Link>
        </div>
      )}
      {isLoggedIn && (
        <div>
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand>Buy Something</Navbar.Brand>
            <Nav className="mr-auto">
              {/* <Nav.Link href="/Selling">My Item</Nav.Link> */}
              {/* <Nav.Link href={`${match.path}/myItem`}>My Item</Nav.Link> */}
              <span className="block">
                <Link to={`/Buyer`}>Buy</Link>
              </span>

              <span className="block">
                <Link to={`${match.path}/Cart`}>My Cart</Link>
              </span>

              <span className="block">
                <Link to={`${match.path}/PurchaseHistory`}>
                  Purchase History
                </Link>
              </span>

              {/* <span className="block">
                <Link to={`${match.path}/payment`}>Payment</Link>
              </span> */}

              <Button
                variant="primary"
                type="submit"
                to="/sellerlogin"
                onClick={() => dispatch(setIsLoggedIn(false))}
              >
                logOut
              </Button>
            </Nav>
          </Navbar>
          {/* <form action = "/sellerlogin">
       <Button variant="primary" type="submit" to ="/sellerlogin" onClick={() => dispatch(setIsLoggedIn(false)) }>
       logOut
       </Button >
      </form> */}


      <Switch>
        {/* <Route path={`$/payment`} component={payment} />  */}
        <Route path={`${match.path}/Cart`} component={Cart} />
        <Route path={`${match.path}/PurchaseHistory`} component={PurchaseHistory} />
        <Route path={`${match.path}/itemPage`} component={ItemPage} />
        
        <Route path={`${match.path}`} component={ItemList} />
        
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

import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import PurchaseHistory from "./pages/PurchaseHistory";
import Home from "./pages/Home";
import BuyerLogin from "./pages/BuyerLogin";
import SellerLogin from "./pages/SellerLogin";
import Seller from "./pages/Seller";
import Buyer from "./pages/Buyer";
import ItemPage from "./pages/ItemPage";
import Selling from "./pages/Selling";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";
import myitem from "./pages/myItem";
import ItemList from "./pages/ItemList"
import BuyerPage from "./pages/BuyerPage"
import { connect } from "react-redux";





const App = ({ productID, isBuyerLoggedIn}) => {
  let { match } = useRouteMatch();

  

  return (
    <div className="background">
     
      <div className="border">
        {/* <div className="nav-bar">
          <span className="block"> */}
            {/*Easy access to any page right now, change when auth implemented*/}
            {/* <Link to="/">Home</Link>
          </span>
          <span className="block">
            <Link to="/buyerlogin">BuyerLogin</Link>
          </span>
          <span className="block">
            <Link to="/sellerlogin">SellerLogin</Link>
          </span> */}
          {/* <span className="block">
            <Link to="/Seller">Seller</Link>
          </span> */}
          {/* <span className="block">
            <Link to="/Buyer">Buyer</Link>
          </span> */}
          {/* <span className="block">
            <Link to="/itemlist">List of Items</Link>
          </span> */}
          {/* <span className="block">
            <Link to="/purchaseHistory">PurchaseHistory</Link>
          </span> */}
          {/* <span className="block">
            <Link to="/itemPage">ItemPage</Link>
          </span> */}
          {/* <span className="block">
            <Link to="/shoppingCart">shoppingCart</Link>
          </span> */}
          {/* <span className="block">
            <Link to="/payment">Payment</Link>
          </span>
        </div> */}



        <Switch>
          <Route path="/Seller">
            <Seller />
          </Route>

          <Route path="/Buyer">
            <Buyer />
          </Route>

          {/* <Route path="/buyer" component={BuyerPage} /> */}
          {/* <Route path="/itemlist" component={ItemList} /> */}
          {/* <Route path={`/itemPage`} component={ItemPage} /> */}
          <Route path="/purchaseHistory" component={PurchaseHistory} />
          <Route path="/shoppingCart" component={Cart} />
          <Route path="/payment" component={Payment} />
          <Route path="/buyerlogin" component={BuyerLogin} />
          <Route path="/sellerlogin" component={SellerLogin} />
          <Route path="/" component={Home} />
         
        </Switch>
      </div>
       
       
     
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
   
    productID: state.sellerReducer.itemID,
 

  };
};


export default connect(mapStateToProps)(App);

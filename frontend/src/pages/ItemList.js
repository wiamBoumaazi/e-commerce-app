
import React from "react";
import "../App.css";
import { connect } from "react-redux";
import { Button, Card, CardColumns } from "react-bootstrap";
import {
  
  Icon,
  MenuItem,
} from "@blueprintjs/core";
import { setTransactionId, setBuyingState, setProductId, setProductName, setSellerUsername, setBuyerUsername, setQuantityLeft, buying, itemListA   } from "../redux/actions/buyerActions";
import { Select } from "@blueprintjs/select";
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch } from "react-router-dom";
import { setItemID, getItems } from "../redux/actions/sellerActions";

const ItemList =   ({itemList, dispatch, productID})  => {
  //console.log(14,props)
  let match = useRouteMatch();
// function dispatch(){
//   props.dispatch(itemListA())

// }

//console.log(15,props.itemlist)
    //console.log(15,props.itemlist[0])
    //dispatch();
    var s = ' '
     return (
        <div>
         <h2>On Sale</h2>



          <CardColumns >

        {itemList.map((itemList) =>
          <Card>


            <Card.Body>
              <Card.Title>{itemList.product_name}</Card.Title>
              <Card.Text>
              Seller: {itemList.seller_username} <br></br>
              Price: ${itemList.price}
              </Card.Text>
              {/* <Button variant="primary" onClick={console.log(myItem.description)}>Check</Button> */}
              <Link variant="primary" onClick={() => dispatch(setItemID(itemList.product_id))} to={`${match.path}/itemPage`}>Check</Link>
            </Card.Body>

          </Card>


        )}

      </CardColumns>





              {/* {
              props.itemList.map(item=>
              <div>
                 <a href={'http://localhost:3001/api/items?itemId='+item.product_id}> 
                  {item.product_name}
                 </a> *
                {s}is selling for ${item.price}
              </div>)
              } */}


        </div>
    )
};

const mapStateToProps = (state) => {
  //console.log(66, state)
  return {
    prod_qty: state.buyerReducer.prod_qty,
    itemList: state.buyerReducer.itemList,
    productID: state.sellerReducer.itemID,
  };
};

export default connect(mapStateToProps)(ItemList);
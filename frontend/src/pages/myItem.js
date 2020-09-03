
import React from "react";
import { connect } from "react-redux";
import { Button, Card, CardColumns } from "react-bootstrap";
import { Chart } from "react-google-charts";
import { setItemID, getItems } from "../redux/actions/sellerActions";
import Selling from './Selling';
import Sell from './Sell';
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch } from "react-router-dom";

const myItem = ({ myItem, dispatch}) => {
  //let match = useRouteMatch();

  return (

    <div>     
      {/*print out all item from sellerReducer*/}
      <CardColumns >

        {myItem.map((myItem) =>
          <Card>


            <Card.Body>
              <Card.Title>{myItem.product_name}</Card.Title>
              <Card.Text>
                {myItem.product_description}
              </Card.Text>
              {/* <Button variant="primary" onClick={console.log(myItem.description)}>Check</Button> */}
              {/* <Link variant="primary" onClick={() => dispatch(setItemID(myItem.product_id))} to={`/itemPage`}>Check</Link> */}
            </Card.Body>

          </Card>


        )}

      </CardColumns>








    </div>

  )

};




const mapStateToProps = (state) => {
  return {
    myItem: state.sellerReducer.item,

  };
};

export default connect(mapStateToProps)(myItem);
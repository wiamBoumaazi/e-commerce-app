import React from "react"
import { connect } from "react-redux";
import {ListGroup} from "react-bootstrap"




const Selling = ({item, dispatch,}) => {
 
  return(
   
      <div>
        
            <h2>Report</h2>





<ListGroup>
{item.map((item) => 
  <ListGroup.Item>Item: {item.product_name} Quantity sold: {item.quantity_sold}  Profit:  {item.quantity_sold * item.price}</ListGroup.Item>

)}
</ListGroup>




      </div>
  )  
}

const mapStateToProps = (state) => {
    return {
      item: state.sellerReducer.item,
    };
  };


export default connect(mapStateToProps)(Selling);
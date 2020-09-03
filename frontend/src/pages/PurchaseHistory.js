
import React, { useEffect } from "react";
import "../App.css";
import { connect } from "react-redux";

const PurchaseHistory = ({ userid }) => {
  const [viewResult, setViewResult] = React.useState(false);
  const [result, setResult] = React.useState(false);
  const [effect, setEffect] = React.useState(0);
  useEffect(() => {
    fetchApi();
  }, [effect]);

  const fetchApi = async () => {
    await fetch(`/api/transaction/orderHistory?${userid}`)
    .then(res => res.json())
    .then(data => {
      console.log(data.values);
      if (data.valid) {
        let transaction_details = data.values;
        console.log(transaction_details);
        setResult(transaction_details);
        setViewResult(true);
      } else {
        console.log("data not received");
        setViewResult(false);
      }
    })
    .catch((e) => {
      console.log(e);
    });
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <h3 className="pt-2">Your Orders</h3>
      {viewResult ? (
        result.map((value, index) => (
          <div key={index} className="m-3 purchase-history">
            <div className="pl-2 pt-2">
              <b>Your purchase details for order #{value.transaction_id}</b>
            </div>
            <div>
              {value.items.map((item, index) => (
                <div key={index} className="m-2 purchase-items p-2">
                  <div className="d-flex">
                    {/* <div className="order-history-img d-flex">
                      <img src={item.product_image} className="img-thumbnail" />
                    </div> */}
                    <div className="d-flex flex-column pl-2">
                      <div className="d-flex flex-row justify-content-between order-items">
                        <div className="">
                          <b>{item[0].product_name}</b>
                        </div>
                        <div>Quantity: {item[0].quantity}</div>
                      </div>
                      <div>sold by: {item[0].seller_username}</div>
                      <div>Price: ${item[0].price}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* <div className="m-2">Total Order amount: ${value.total_amount}</div> */}
          </div>
        ))
      ) : (
        <h5>Your order history is empty</h5>
      )}
      
      <div>
      <form action = "/buyerlogin">
       <button variant="primary" type="submit" >
       logOut
       </button>
      </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return{
    userid: state.buyerReducer.userid,
  };
};

export default connect(mapStateToProps)(PurchaseHistory);

import React, { useEffect } from "react";
import "../App.css";
import { connect } from "react-redux";
import { Button, Icon, MenuItem } from "@blueprintjs/core";
import {
  setProdQty,
  setCartItems,
  setCartEmpty,
  setItemPage,
} from "../redux/actions/buyerActions";
import { Select } from "@blueprintjs/select";

const SelectFunc = ({ handleClick, prod_qty, disabled }) => {
  const qty = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  
  const renderItem = (item, { handleClick }) => {
    return (
      <MenuItem
        key={item}
        text={item}
        active={item === prod_qty}
        onClick={handleClick}
      />
    );
  };
  return (
    <div>
      <Select
        items={qty.map((value) => value)}
        itemRenderer={renderItem}
        onItemSelect={handleClick}
        filterable={false}
        disabled={disabled}
        popoverProps={{
          hasBackdrop: true,
          position: "bottom-left",
          modifiers: {
            arrow: false,
          },
        }}
      >
        <Button
          text={prod_qty ? `Qty: ${qty[prod_qty - 1]}` : "Qty: 1"}
          disabled={disabled}
        />
      </Select>
    </div>
  );
};


const ItemPage = ({ prod_qty, dispatch, itemPage, productID, activeUsers, itemViewCount, itemSold ,itemStock}) => {

  const [render, Setrender] = React.useState(0);
  const [display, setDisplay] = React.useState(true);
  const [notification, setNotification] = React.useState(false);
  const [qtySet, SetQtySet] = React.useState(false);

  useEffect(() => {
    fetchApi();
    dispatch(setProdQty(1));
    updateItemViewCount();
  }, [render]);

  useEffect(() => {
    console.log('Hello World');
    return () => {
        decrementItemViewCount();
    }
}, [])

  const fetchApi = async () => {
    let url = `/api/inventory/items?itemId=${productID}`;
    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.valid) {
          // console.log(res.data.result);
          dispatch(setItemPage(data.result));

          setDisplay(true);
        } else {
          console.log(data.msg);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateItemViewCount = () => {
    let url = `/api/websocket/viewCount?productID=${productID}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.valid) {
          console.log("data is valid");
        } else {
          console.log("data is not valid");
        }
      })
      .catch((e) => {
        console.log(e.response);
      });
  };

  const decrementItemViewCount = () => {
    let url = `/api/websocket/decrementViewCount?productID=${productID}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.valid) {
          console.log("data is valid");
        } else {
          console.log("data is not valid");
        }
      })
      .catch((e) => {
        console.log(e.response);
      });
  };
    
  const handleClick = (e) => {
    //for the quantity selling
    console.log(e);
    SetQtySet(true);
    dispatch(setProdQty(e));
  };

  const handleAddToCart = () => {
    if (qtySet === false) {
      prod_qty = 1;
    }
    if (prod_qty > itemPage.quantity_left) {
      setNotification("error");
      return;
    }
    let each_item = {
        product_id: itemPage.product_id,
        product_image: itemPage.product_image,
        product_name: itemPage.product_name,
        quantity: prod_qty,
        qty_left: itemPage.quantity_left,
        qty_sold: itemPage.quantity_sold,
        //activeUsers : activeUsers,
        price: parseInt(itemPage.price) * prod_qty,
        seller_username: itemPage.seller_username,
    };
    dispatch(setCartItems(each_item));
    setNotification("true");
    dispatch(setCartEmpty(false));
    console.log("items set");
    console.log("USERS HERE:"+ activeUsers);
  };

  return (
    <div>
      {display && (
        <div>
          <div>
            <div className="d-flex flex-row m-3">
              {/* <div className="d-flex flex-row itemImage"> */}
                {/* <img
                src={itemPage.product_image}
                className="img-fluid"
                alt={itemPage.product_id}
              /> */}
              {/* </div> */}
              <div className="d-flex m-3 flex-column">
                <div className="itemName">
                  <b>{itemPage.product_name}</b>
                </div>
                <div className="mt-3 d-flex flex-row justify-content-between">
                  <div>
                    <b>Price: </b>${itemPage.price}
                  </div>
                  <div className="d-flex">
                    <SelectFunc handleClick={handleClick} prod_qty={prod_qty} />
                    <Button
                      icon="shopping-cart"
                      className="addToCart ml-3"
                      onClick={handleAddToCart}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
                <div className="d-flex justify-content-end mt-2">
                  {notification === "true" && <b>Item added to the cart</b>}
                  {notification === "error" && <b>No. of Items selected is more than the items left. Please try selecting lesser items. </b>}
                </div>
                <div className="d-flex justify-content-between mt-3">
                  <div>
                    <Icon icon="flame" intent="danger" /> <b>{itemViewCount[productID]} </b>
                    viewing this product.
                  </div>
                  <div>
                    <Icon icon="chart" intent="primary" className="" />{" "}
                    <b>{itemPage.quantity_sold} </b>
                    items sold, <b>{itemPage.quantity_left} </b>items left.
                  </div>
                </div>
                <div className="mt-3 mb-2">
                  <b>Product Description:</b>
                </div>
                <div className="pt-1 itemDesc">
                  {itemPage.product_description}
                </div>
              </div>
            </div>
            <div>
              <form action="/buyerlogin">
                <Button variant="primary" type="submit">
                  LogOut
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    prod_qty: state.buyerReducer.prod_qty,
    activeUsers: state.buyerReducer.activeUsers,
    itemSold: state.buyerReducer.quantity_sold,
    itemStock: state.buyerReducer.quantity_left,
    productID: state.sellerReducer.itemID,
    itemPage: state.buyerReducer.itemPage,
    itemViewCount: state.buyerReducer.itemViewCount,
  };
};

export default connect(mapStateToProps)(ItemPage);

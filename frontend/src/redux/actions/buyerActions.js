
export const setProdQty = (prod_qty) => ({
  type: "USER_SET_PROD_QTY",
  prod_qty,
});

export const setActiveUsers = (activeUsers) => ({
    type: 'SET_ACTIVE_USERS',
    activeUsers,
});

export const setItemViewCount = (itemViewCount) => ({
  type: 'SET_ITEM_VIEW_COUNT',
  itemViewCount
});

export const setItemSold = (itemSold) => ({
    type: 'SET_ITEM_SOLD',
    itemSold,
});
  export const setUserid = (userid) => ({
    type: "USER_SET_USER_ID",
    userid,
  });

export const setBuyerInventory = (buyerInventory) => ({
  type: "USER_SET_BUYER_INVENTORY",
  buyerInventory,
});

export const setUseremail = (useremail) => ({
  type: "USER_SET_USER_EMAIL",
  useremail,
});

export const setPassword = (password) => ({
  type: "USER_SET_PASSWORD",
  password,
});

export const setUserType = (userType) => ({
  type: "USER_SET_USER_TYPE",
  userType,
});

export const setErrorMessage = (errorMessage) => ({
  type: "USER_SET_ERROR_MESSAGE",
  errorMessage,
});

export const setIsBuyer = (isBuyer) => ({
  type: "USER_SET_IS_BUYER",
  isBuyer,
});

export const setIsLoggedIn = (isLoggedIn) => ({
  type: "USER_SET_IS_LOGGED_IN",
  isLoggedIn,
});

export const setLoadingState = (loadingState) => ({
  type: "USER_SET_LOADING_STATE",
  loadingState,
});

/*
  export const setTransactionId = transaction_id => ({
    type: 'USER_SET_TRANSACTION_ID',
    transaction_id
});
*/
export const setBuyerUsername = (buyer_username) => ({
  type: "USER_SET_BUYER_USERNAME",
  buyer_username,
});
export const setProductId = (product_id) => ({
  type: "USER_SET_PRODUCT_ID",
  product_id,
});

export const setSellerUsername = (seller_username) => ({
  type: "USER_SET_SELLER_USERNAME",
  seller_username,
});

export const setProductName = (product_name) => ({
  type: "USER_SET_PRODUCT_NAME",
  product_name,
});

export const setProductDes = (product_description) => ({
  type: "USER_SET_PRODUCT_DES",
  product_description,
});
export const setProductImage = (product_image) => ({
  type: "USER_SET_PRODUCT_IMAGE",
  product_image,
});
export const setProductPrice = (price) => ({
  type: "USER_SET_PRODUCT_PRICE",
  price,
});
export const setQuantityLeft = (quantity_left) => ({
  type: "USER_SET_QUANTITY_LEFT",
  quantity_left,
});
export const setQuantitySold = (quantity_sold) => ({
  type: "USER_SET_QUANTITY_SOLD",
  quantity_sold,
});
export const setBuyingState = (buyingState) => ({
  type: "USER_SET_BUYING_STATE",
  buyingState,
});
export const setItemList = (itemList) => ({
  type: "USER_SET_ITEM_LIST",
  itemList,
});

export const setCartItems = (cartItems) => ({
  type: "USER_SET_CART_ITEMS",
  cartItems,
});

export const setCartEmpty = (cartEmpty) => ({
  type: "USER_SET_CART_EMPTY",
  cartEmpty,
});

export const setTotalAmount = (total_amount) => ({
  type: "USER_SET_TOTAL_AMOUNT",
  total_amount,
});

export const setItemPage = (itemPage) => ({
  type: "USER_SET_ITEM_PAGE",
  itemPage,
});

export const login = () => (dispatch, getState) => {
  console.log("Login function");
  const reduxEvent = setLoadingState("loading");
  dispatch(reduxEvent);
  const userId = getState().buyerReducer.userid;
  const password = getState().buyerReducer.password;
  const userType = getState().buyerReducer.userType;
  console.log(`${userId}, ${password}, ${userType}`);
  const axios = require("axios");
  const body = {
    userId: `${userId}`,
    password: `${password}`,
    userType: `${userType}`,
  };

  axios
    .post("api/auth/authenticate", body)
    .then((res) => {
      if (res.data.valid) {
        dispatch(setIsLoggedIn(true));
        dispatch(setIsBuyer(true));
        dispatch(setLoadingState("init"));
      } else {
        dispatch(setLoadingState("error"));
        dispatch(setErrorMessage(res.data.msg));
      }
    })
    .catch((e) => console.log(e));
};

export const signup = () => (dispatch, getState) => {
  console.log("signing up....");
  const reduxEvent = setLoadingState("loading");
  dispatch(reduxEvent);
  const userId = getState().buyerReducer.userid;
  const userEmail = getState().buyerReducer.useremail;
  const password = getState().buyerReducer.password;
  const userType = getState().buyerReducer.userType;
  console.log(`${userId}, ${password}, ${userType}`);
  if (userEmail.length > 0 && password.length > 0 && userId.length > 0) {
    const axios = require("axios");
    const body = {
      userId: `${userId}`,
      userEmail: `${userEmail}`,
      password: `${password}`,
      userType: `${userType}`,
    };
    axios
      .post("/api/auth/add", body)
      .then((res) => {
        if (res.data.valid) {
          dispatch(setIsLoggedIn(true));
          dispatch(setLoadingState("init"));
        } else {
          dispatch(setLoadingState("error"));
          dispatch(setErrorMessage(res.data.msg));
        }
      })
      .catch((e) => console.log(e));
  } else {
    dispatch(setLoadingState("error"));
    dispatch(setErrorMessage("Email or password is empty"));
  }
};

export const buying = () => (dispatch, getState) => {
  /*    
    dispatch(setIsLoggedIn(false))
    if(!getState().buyerReducer.isLoggedIn){
        console.log('not logged in')
        dispatch(setBuyingState('not logged in'));
        return
    }
*/
  const axios = require("axios");

  //if logged in
  console.log("creating purchase");
  dispatch(setBuyingState("buying"));

  //let seller_username = getState().buyerReducer.seller_username;
  let quantity_left = getState().buyerReducer.quantity_left;
  let product_id = getState().buyerReducer.product_id;
  let quantity_sold = 1;
  const url1 = `http://localhost:3001/api/items?itemId=${product_id}`;
  const url2 = `http://localhost:3001/api/transaction/create`;
  console.log("fetching url");
  axios.get(url1).then((res) => {
    dispatch(setSellerUsername(res.data.seller_username));
    dispatch(setQuantityLeft(parseInt(res.data.quantity_left)));
    quantity_left = getState().buyerReducer.quantity_left;
    //console.log("quant rem: " + quantity_left)

    if (!res.data) {
      dispatch(setBuyingState("item does not exist"));
    }

    if (parseInt(quantity_left) > 0) {
      let items = [];
      let total_amount = 0;
      items.push({
        product_id: res.data.product_id,
        seller_username: res.data.seller_username,
        product_name: res.data.product_name,
        product_image: res.data.product_image,
        product_description: res.data.product_description,
        quantity: quantity_sold,
        price: res.data.price,
      
      });

      const body = {
        //transaction_id: 0,
        buyer_username: getState().buyerReducer.buyer_username,
        items: items,
        total_amount: total_amount,
      };

      axios.post(url2, body);

      dispatch(setBuyingState("finished buying"));
      console.log("finished buying");
    } else if (parseInt(quantity_left) <= 0) {
      dispatch(setBuyingState("item out of stock"));
      console.log("item out of stock");
    }
  });
};

export const itemListA = () => (dispatch, getState) => {
    const axios = require("axios");
//    const url = `api/inventory/allitems`;
    console.log("fetching url");

    

    axios.get("/api/inventory/allitems")
      .then((res)=>{
     // if(getState().buyerReducer.itemList[0]==null)
        dispatch(setItemList(res.data));
      
    });
}

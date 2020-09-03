export const  setItemID = (itemID) => ({
  type: "SELLER_SET_ITEM_ID",
  itemID,
});

export const setUserID = (useriD) => ({
  type: "SELLER_SET_USER_ID",
  useriD,
});

export const setItemName = (itemName) => ({
  type: "SELLER_SET_ITEM_NAME",
  itemName,
});

export const setItemPrice = (itemPrice) => ({
  type: "SELLER_SET_ITEM_PRICE",
  itemPrice,
});

export const setItemDesc = (itemDesc) => ({  // Item Descrition
  type: "SELLER_SET_ITEM_DESC",
  itemDesc,
});

export const setItemQuantity = (itemQuantity) => ({
  type: "SELLER_SET_ITEM_QUANTITY",
  itemQuantity,
});

export const setMyItems = (myItems) => ({
  type: "SELLER_SET_ITEM",
  myItems,
})

export const setIsAddedStatus = (isAddedStatus) => ({
  type: "SELLER_SET_IS_ADDED_STATUS",
  isAddedStatus,
})

export const getItems = () => (dispatch, getState) => {
  console.log("getting items")
  const axios = require("axios");
  const seller = getState().sellerReducer.userid;

  console.log(seller);

  const body = {
    seller: `${seller}`,
  }

  axios
    .post("/api/inventory/getMyItems", body)
    .then((res) => {
      console.log(res.data);
      dispatch(setMyItems(res.data));
      console.log(getState().sellerReducer.item);

    })

}


//item 
export const item = () => (dispatch, getState) => {
  console.log("Adding item");
  const axios = require("axios");

  const FlakeIdGen = require("flake-idgen");
  const intformat = require("biguint-format");
  const generator = new FlakeIdGen();
  let id = generator.next();
  let uniqueId = intformat(id, "dec");

  console.log(uniqueId);


  const seller = getState().sellerReducer.userid;
  const itemName = getState().sellerReducer.itemName;
  const itemPrice = getState().sellerReducer.price;
  const itemDesc = getState().sellerReducer.desc;
  const itemQuantity = getState().sellerReducer.quantity;
  const body = {
    seller: `${seller}`,
    itemID: `${uniqueId}`,
    itemName: `${itemName}`,
    itemPrice: itemPrice,
    itemDesc: `${itemDesc}`,
    itemQuantity: `${itemQuantity}`,
  };
  console.log(seller > 0);
  console.log(Number.isInteger(itemQuantity));

  if (itemPrice > 0 && itemQuantity > 0 && itemName.length > 0 && itemDesc.length > 0) {
    
    axios
      .post("/api/inventory/newItem", body)
      .then((res) => {
        console.log(res.data.valid);
        if(res.data.valid){ //if item exist, fail. If item not exist, success
        console.log(res.data);
        dispatch(setIsAddedStatus("Added"));
        }else {
          console.log("item exist");
          dispatch(setIsAddedStatus("fail"));
        }

      })
  } else {//empty item data
    console.log("Add fail");
    dispatch(setIsAddedStatus("empty"));
  }

  console.log(body);
  //Axios when inventory server ready



}

export const setUserid = (userid) => ({
  type: "USER_SET_USER_ID",
  userid,
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
})

export const setIsLoggedIn = (isLoggedIn) => ({
  type: "USER_SET_IS_LOGGED_IN",
  isLoggedIn,
});

export const setLoadingState = (loadingState) => ({
  type: "USER_SET_LOADING_STATE",
  loadingState,
});



export const login = () => (dispatch, getState) => {
  console.log("Login function");
  const reduxEvent = setLoadingState("loading");
  dispatch(reduxEvent);
  const userId = getState().sellerReducer.userid;
  const password = getState().sellerReducer.password;
  const userType = getState().sellerReducer.userType;
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
        dispatch(setUserID(userId));

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
  const userId = getState().sellerReducer.userid;
  const userEmail = getState().sellerReducer.useremail;
  const password = getState().sellerReducer.password;
  const userType = getState().sellerReducer.userType;
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
          dispatch(setUserID(userId));

        } else {
          dispatch(setLoadingState("error"));
          dispatch(setErrorMessage(res.data.msg));

        }
      })
      .catch((e) => console.log(e));
  } else {
    dispatch(setLoadingState("error"))
    dispatch(setErrorMessage("Email or password is empty"));
  }
};

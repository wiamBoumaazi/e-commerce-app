const INITIAL_STATE = {
    userid: "123",
    useremail: "",
    password: "",
    userType : "seller",
    isLoggedIn: false,
    loadingState: "init",
    errorMessage: "",
    itemName: "",
    itemID: "", /* Product id  */
    price: 0,
    desc: "",
    quantity: 0,
    isAddedStatus: "",
    item: [], //Contain the Seller items


};

const sellerReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
      case "SELLER_SET_ITEM_ID":
        return {
          ...state,
          itemID: action.itemID,
        }
      case "SELLER_SET_USER_ID":
        return {
          ...state,
          userid: action.useriD,
        }
        case "SELLER_SET_ITEM":
          return {
            ...state,
            item: action.myItems,
          }
        case "SELLER_SET_ITEM_NAME":
        return {
            ...state,
            itemName: action.itemName,
        };
        case "SELLER_SET_ITEM_PRICE":
        return {
            ...state,
            price: action.itemPrice,
        };
        case "SELLER_SET_ITEM_DESC":
        return {
            ...state,
            desc: action.itemDesc,
        };
        case "SELLER_SET_ITEM_QUANTITY":
        return {
            ...state,
            quantity: action.itemQuantity,
        };
        case "SELLER_SET_IS_ADDED_STATUS":
        return {
            ...state,
            isAddedStatus: action.isAddedStatus,
        };
        case "USER_SET_USER_ID":
        return {
          ...state,
          userid: action.userid,
        };
        case "USER_SET_USER_EMAIL":
          return {
            ...state,
            useremail: action.useremail,
      };
        case "USER_SET_PASSWORD":
        return {
          ...state,
          password: action.password,
        };
        case "USER_SET_USER_TYPE":
         return {
           ...state,
          userType: action.userType,
          };
        case "USER_SET_IS_LOGGED_IN":
        return {
          ...state,
          isLoggedIn: action.isLoggedIn,
        };
        case "USER_SET_LOADING_STATE":
        return {
          ...state,
          loadingState: action.loadingState,
        };
        case "USER_SET_ERROR_MESSAGE":
        return {
            ...state,
            errorMessage: action.errorMessage,
          };
        case "USER_SET_IS_BUYER":
        return {
          ...state,
          isBuyer: action.isBuyer,
         };
        default:
            return state;
    }
};

export default sellerReducer;
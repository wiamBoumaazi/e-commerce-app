const INITIAL_STATE = {
  prod_qty: "",
  userid: "",
  useremail: "",
  userType: "buyer",
  password: "",
  isLoggedIn: false,
  loadingState: "init",
  errorMessage: "",
  isBuyer: false,
  product_id: 0,
  seller_username: "",
  product_name: "",
  product_image: "",
  product_description: "",
  buyer_username: "",
  price: 0,
  quantity_left: 0,
  quantity_sold: 0,
  buyingState: "init",
  //transaction_id: 0,
  cartItems: [],
  cartEmpty: true,
  total_amount: "",
  itemList: [],
  itemPage: [],
  buyerInventory: [],
  activeUsers: 0,
  itemViewCount: {}
};

const buyerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "USER_SET_PRODUCT_ID":
      return {
        ...state,
        product_id: action.product_id,
      };
    case "USER_SET_BUYER_INVENTORY":
      return {
        ...state,
        buyerInventory: action.buyerInventory,
      };
    case "USER_SET_ITEM_LIST":
      return {
        ...state,
        itemList: action.itemList,
      };
    case "USER_SET_ITEM_PAGE":
      return {
        ...state,
        itemPage: action.itemPage,
      };
    case "USER_SET_CART_EMPTY":
      return {
        ...state,
        cartEmpty: action.cartEmpty,
      };
    case "USER_SET_TOTAL_AMOUNT":
      return {
        ...state,
        total_amount: action.total_amount,
      };
    case "USER_SET_CART_ITEMS":
      return {
        ...state,
        cartItems: [...state.cartItems, action.cartItems],
      };
    case "USER_SET_SELLER_USERNAME":
      return {
        ...state,
        seller_username: action.seller_username,
      };
    case "USER_SET_PRODUCT_PRICE":
      return {
        ...state,
        price: action.price,
      };
    case "USER_SET_PRODUCT_NAME":
      return {
        ...state,
        product_name: action.product_name,
      };
    case "USER_SET_PRODUCT_IMAGE":
      return {
        ...state,
        product_image: action.product_image,
      };
    case "USER_SET_BUYER_USERNAME":
      return {
        ...state,
        buyer_username: action.buyer_username,
      };
    case "USER_SET_PRODUCT_DES":
      return {
        ...state,
        product_description: action.product_description,
      };
    case "USER_SET_QUANTITY_SOLD":
      return {
        ...state,
        quantity_sold: action.quantity_sold,
      };
    case "USER_SET_QUANTITY_LEFT":
      return {
        ...state,
        quantity_left: action.quantity_left,
      };
    case "USER_SET_BUYING_STATE":
      return {
        ...state,
        buyingState: action.buyingState,
      };
    case "USER_SET_PROD_QTY":
      return {
        ...state,
        prod_qty: action.prod_qty,
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
    case "SET_ACTIVE_USERS":
      return {
        ...state,
        activeUsers: action.activeUsers,
      };

    case "SET_ITEM_SOLD":
      return {
        ...state,
        itemSold: action.itemSold,
      };
    case "SET_ITEM_VIEW_COUNT":
      return {
        ...state,
        itemViewCount: action.itemViewCount
      }
    default:
      return state;
  }
};

export default buyerReducer;

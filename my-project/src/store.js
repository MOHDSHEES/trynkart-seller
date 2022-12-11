import {
  itemsListReducer,
  itemDetailsReducer,
  // itemAddToCartReducer,
  itemsCartReducer,
  // removeitemCartReducer,
  userDetailsReducer,
  itemAddToWishlistReducer,
  // wishlistCartReducer,
  // addressSaveReducer,
  // addressDeleteReducer,
  loginCheckReducer,
  // updateInfolistReducer,
  // signUpReducer,
  itemsPageReducer,
  emailsendreducer,
  itemsContainerReducer,
} from "./reducers/itemsDataReducer";

import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { combineReducers } from "redux";
// import Cookie from "js-cookie";
import {
  listingsReducer,
  // newListingReducer,
  sellerDetailsReducer,
  sellerSignUpReducer,
} from "./reducers/sellerDataReducer";
// import { orderPlacingReducer } from "./reducers/orderDataReducer";
// import Axios from "axios";
// import { useEffect } from "react";
// import SignUp from "./components/signup";

// const user = Cookie.getJSON("UserDetails") || null;
// const items = Cookie.getJSON("cartItems") || [];
// const wishlist = Cookie.getJSON("wishlistItems") || [];
const user = JSON.parse(localStorage.getItem("UserDetails")) || null;
// const userInfo = JSON.parse(localStorage.getItem("User")) || null;
// const token = JSON.parse(localStorage.getItem("UserToken")) || null;
// const items = JSON.parse(localStorage.getItem("cartItems")) || [];
const wishlist = JSON.parse(localStorage.getItem("wishlistItems")) || [];
// const sellerDetails = Cookie.getJSON("SellerDetails") || [];
const sellerDetails = JSON.parse(localStorage.getItem("SellerDetails")) || [];

// var dat;
// function details() {
//   const { data } = Axios.post("/api/user/details/60c1f37774893e4ab4aee51a");
//   console.log(data);
//   dat = data;
//   return data;
// }
// details();
// Initial state
const initialState = {
  loginCheck: { user },
  // cartItems: { items },
  // userDetailsReducer: {data},
  addToWishlist: { wishlist },
  sellerSignUp: { sellerDetails },
};

// all reducers
const allReducers = combineReducers({
  itemsListReducer: itemsListReducer,
  itemsContainer: itemsContainerReducer,
  itemsPage: itemsPageReducer,
  itemDetails: itemDetailsReducer,
  // addToCart: itemAddToCartReducer,
  cartItems: itemsCartReducer,
  // removeCartItem:removeitemCartReducer,
  userDetailsReducer: userDetailsReducer,
  // updateInfolist: updateInfolistReducer,
  addToWishlist: itemAddToWishlistReducer,
  // wishlistItems: wishlistCartReducer,
  // addressSave: addressSaveReducer,
  // addressDelete: addressDeleteReducer,
  loginCheck: loginCheckReducer,
  emailSend: emailsendreducer,
  // signUp: signUpReducer,
  sellerSignUp: sellerSignUpReducer,
  // newListing: newListingReducer,
  sellerDetails: sellerDetailsReducer,
  listingsReducer: listingsReducer,
  // orderPlacing: orderPlacingReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  allReducers,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);
export default store;

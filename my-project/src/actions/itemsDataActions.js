import axios from "axios";
// import Cookie from "js-cookie";

// for items (fetching all items)
const listItems = (category) => async (dispatch) => {
  try {
    dispatch({ type: "ITEM_LIST_REQUEST" });
    const { data } = await axios.post("/api/products/category", {
      category: category,
    });
    dispatch({ type: "ITEM_LIST_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "ITEM_LIST_FAIL", payload: error.message });
  }
};

//  for homepage container
const ContainerItems = () => async (dispatch) => {
  try {
    dispatch({ type: "ITEMS_CONTAINER_REQUEST" });
    const { data } = await axios.post("/api/products/containeritems");
    dispatch({ type: "ITEM_CONTAINER_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "ITEM_CONTAINER_FAIL", payload: error.message });
  }
};

// for items
const itemsPage = (category, search) => async (dispatch) => {
  try {
    dispatch({ type: "ITEM_PAGE_REQUEST" });
    const { data } = await axios.post("/api/products/category/" + category, {
      search,
    });
    dispatch({ type: "ITEM_PAGE_SUCCESS", payload: data });
  } catch (error) {
    if (error.response.data)
      dispatch({ type: "ITEM_PAGE_FAIL", payload: error.response.data });
    else dispatch({ type: "ITEM_PAGE_FAIL", payload: error.message });
  }
};

// for itempage (fetching product with id)
const detailsItem = (itemId) => async (dispatch) => {
  try {
    dispatch({ type: "ITEM_DETAILS_REQUEST", payload: itemId });
    const { data } = await axios.post("/api/products/" + itemId);
    dispatch({ type: "ITEM_DETAILS_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "ITEM_DETAILS_FAIL", payload: error.message });
  }
};
// ratings
const saveRating =
  (itemId, stars, title, description, name) => async (dispatch) => {
    try {
      // dispatch({ type: "ITEM_SAVERATING_REQUEST", payload: itemId });
      const { data } = await axios.post("/api/products/ratings/" + itemId, {
        stars,
        title,
        description,
        name,
      });
      dispatch({ type: "ITEM_SAVERATING_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "ITEM_SAVERATING_FAIL", payload: error.message });
    }
  };

// for itempage  (add product to cart)
const addToCart =
  (
    itemId,
    userId,
    productImg,
    name,
    original_price,
    sellingPrice,
    off,
    stock,
    displayinfo,
    sellerId,
    cartqty = 1
  ) =>
  async (dispatch, getState) => {
    // dispatch({ type: "CART_ITEMS_REQUEST" });
    const { data } = await axios.post("/api/user/addtocart/" + itemId, {
      userId,
      productImg,
      name,
      original_price,
      sellingPrice,
      off,
      stock,
      displayinfo,
      sellerId,
      cartqty,
    });
    // console.log(data);
    dispatch({
      type: "ITEM_ADD_TO_CART_REQUEST",
      payload: data,
    });

    // dispatch({ type: "ITEM_ADD_TO_CART_SUCCESS", payload: data });
    // const {
    //   cartItems: { items },
    // } = getState();
    // console.log(itemId);
    // Cookie.set("cartItems", JSON.stringify([...items, itemId]));
    // }
    //  catch (error) {
    // dispatch({ type: "ITEM_ADD_TO_CART_FAIL", payload: error.message });
    // }
  };

// for cart (fetching products in cart)
const cartItem = (id) => async (dispatch) => {
  try {
    // console.log(id);
    dispatch({ type: "CART_ITEMS_REQUEST" });
    const { data } = await axios.post("/api/user/cart", { id });
    dispatch({ type: "CART_ITEMS_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "CART_ITEMS_FAIL", payload: error.message });
  }
};

// for deleting item from cart
const removeCartItem = (itemId, userId) => async (dispatch) => {
  // try
  // {
  dispatch({ type: "CART_REMOVE_ITEM_REQUEST", payload: itemId });
  await axios.post("/api/user/removefromcart/" + itemId, {
    userId,
  });
  //   dispatch({type: 'CART_REMOVE_ITEM_SUCCESS',payload:data});
  // }
  // catch(error){
  //   // dispatch({type:'CART_REMOVE_ITEM_FAIL',payload:error.message});
  // }
};

//for fetching user details with ID
const userDetails = (userId) => async (dispatch) => {
  try {
    dispatch({ type: "USER_DETAILS_REQUEST", payload: userId });
    const { data } = await axios.post("/api/user/details/" + userId);

    dispatch({ type: "USER_DETAILS_SUCCESS", payload: data });
    // Cookie.set("cartItems", JSON.stringify(data.cart));
    // localStorage.setItem("cartItems", JSON.stringify(data.cart));
  } catch (error) {
    dispatch({ type: "USER_DETAILS_FAIL", payload: error.message });
  }
};

//  adding item to wishlist
// const addToWishlist = (itemId, userId) => async (dispatch) => {
//   try {
//     // dispatch({ type: "ITEM_ADD_TO_WISHLIST_REQUEST", payload: itemId });
//     const { data } = await axios.post("/api/user/addtowishlist/" + itemId, {
//       userId,
//     });
//     dispatch({ type: "ITEM_ADD_TO_WISHLIST_SUCCESS", payload: data });
//     Cookie.set("wishlistItems", JSON.stringify(data));
//   } catch (error) {
//     dispatch({ type: "ITEM_ADD_TO_WISHLIST_FAIL", payload: error.message });
//   }
// };
// adding item to wishlist
const addToWishlist =
  (
    itemId,
    userId,
    productImg = [],
    name = "",
    original_price = 0,
    sellingPrice = 0,
    off = 0
  ) =>
  async (dispatch) => {
    try {
      // dispatch({ type: "ITEM_ADD_TO_WISHLIST_REQUEST", payload: itemId });
      const { data } = await axios.post("/api/user/addtowishlist/" + itemId, {
        userId,
        productImg,
        name,
        original_price,
        sellingPrice,
        off,
      });
      // Cookie.set("wishlistItems", JSON.stringify(data));
      localStorage.setItem("wishlistItems", JSON.stringify(data));
      dispatch({ type: "ITEM_ADD_TO_WISHLIST_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "ITEM_ADD_TO_WISHLIST_FAIL", payload: error.message });
    }
  };

// fetching wishlist items
// const wishlistItems = (userId) => async (dispatch) => {
//   try {
//     dispatch({ type: "WISHLIST_ITEMS_REQUEST" });
//     const { data } = await axios.post("/api/user/wishlist", { userId });
//     dispatch({ type: "WISHLIST_ITEMS_SUCCESS", payload: data });
//   } catch (error) {
//     dispatch({ type: "WISHLIST_ITEMS_FAIL", payload: error.message });
//   }
// };

//  save address
const saveAddress = (userId, data, addId, defaultId) => async (dispatch) => {
  try {
    dispatch({ type: "ADDRESS_SAVE_REQUEST" });
    const { data1 } = await axios.post("/api/user/saveaddress", {
      userId,
      data,
      addId,
      defaultId,
    });
    dispatch({ type: "ADDRESS_SAVE_SUCCESS", payload: data1 });
  } catch (error) {
    dispatch({ type: "ADDRESS_SAVE_FAIL", payload: error.message });
  }
};

// delete address
const deleteAddress = (itemId, userId) => async (dispatch) => {
  try {
    dispatch({ type: "ADDRESS_DELETE_REQUEST" });
    const { data } = await axios.post("/api/user/deleteaddress/" + itemId, {
      userId,
    });
    dispatch({ type: "ADDRESS_DELETE_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "ADDRESS_DELETE_FAIL", payload: error.message });
  }
};

// update profile info
const updateProfileInfo =
  (fname, lname, mobileno, gender, email, userId) =>
  async (dispatch, getState) => {
    try {
      const {
        userDetailsReducer: { items },
      } = getState();

      dispatch({
        type: "UPDATE_PROFILEINFO_REQUEST",
        payload: {
          ...items,
          fname: fname,
          lname: lname,
          mobileno: mobileno,
          gender: gender,
          email: email,
        },
      });
      // localStorage.setItem("fname", JSON.stringify(fname));
      await axios.post("/api/user/updateprofileinfo", {
        fname,
        lname,
        mobileno,
        gender,
        email,
        userId,
      });
    } catch (error) {
      dispatch({ type: "UPDATE_PROFILEINFO_FAIL", payload: error.message });
    }
  };

// sign in
const signin = (Username, Password) => async (dispatch) => {
  try {
    dispatch({ type: "SIGNIN_DETAILS_REQUEST" });
    const { data } = await axios.post("/api/user/signin", {
      Username,
      Password,
    });
    dispatch({ type: "SIGNIN_DETAILS_SUCCESS", payload: data });
    dispatch({ type: "CART_ITEMS_SUCCESS", payload: data.user.cart });
    const { cart, wishlist, ...user } = data.user;

    // Cookie.set("UserDetails", JSON.stringify(data));
    // Cookie.set("cartItems", JSON.stringify(data.user.cart));
    // Cookie.set("wishlistItems", JSON.stringify(data.user.wishlist));
    localStorage.setItem("UserDetails", JSON.stringify(data));
    localStorage.setItem("User", JSON.stringify(user));
    // localStorage.setItem("UserToken", JSON.stringify(data.token));
    // localStorage.setItem("cartItems", JSON.stringify(cart));
    localStorage.setItem("wishlistItems", JSON.stringify(wishlist));
    window.location.reload();
  } catch (error) {
    if (error.response && error.response.data)
      dispatch({ type: "SIGNIN_DETAILS_FAIL", payload: error.response.data });
    else dispatch({ type: "SIGNIN_DETAILS_FAIL", payload: error.message });
  }
};

//  signup
const signup = (username, email, password, mobileno) => async (dispatch) => {
  try {
    // dispatch({ type: "SIGNUP_DETAILS_REQUEST" });
    const { data } = await axios.post("/api/user/signup", {
      username,
      email,
      password,
      mobileno,
    });
    // console.log(data.msg);
    dispatch({ type: "SIGNUP_DETAILS_SUCCESS", payload: data });
    dispatch({ type: "CART_ITEMS_SUCCESS", payload: data.user.cart });
    // Cookie.set("UserDetails", JSON.stringify(data));
    // Cookie.set("cartItems", JSON.stringify(data.user.cart));
    // Cookie.set("wishlistItems", JSON.stringify(data.user.wishlist));
    localStorage.setItem("UserDetails", JSON.stringify(data));
    const { cart, wishlist, ...user } = data.user;
    localStorage.setItem("User", JSON.stringify(user));
    // localStorage.setItem("UserToken", JSON.stringify(data.token));
    // localStorage.setItem("cartItems", JSON.stringify(cart));
    localStorage.setItem("wishlistItems", JSON.stringify(wishlist));
    window.location.reload();
  } catch (error) {
    dispatch({ type: "SIGNUP_DETAILS_FAIL", payload: error.msg });
  }
};

// logout route
const logout = () => async (dispatch) => {
  const data = {};
  // Cookie.remove("UserDetails");
  // Cookie.remove("cartItems");
  // Cookie.remove("wishlistItems");
  localStorage.removeItem("UserDetails");
  localStorage.removeItem("User");
  // localStorage.removeItem("cartItems");
  localStorage.removeItem("wishlistItems");
  localStorage.removeItem("UserToken");
  window.location.reload();
  dispatch({ type: "LOGOUT_USER_REQUEST", payload: data });
  dispatch({ type: "LOGOUT_USE_REQUEST", payload: [] });
};

const sendEmail = (state, userId) => async (dispatch) => {
  try {
    const { data } = await axios.post("/api/contact/sendemail", {
      state,
      userId,
    });
    dispatch({ type: "EMAIL_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "EMAIL_FAIL", payload: error.message });
  }
};

export {
  listItems,
  ContainerItems,
  itemsPage,
  detailsItem,
  saveRating,
  addToCart,
  cartItem,
  removeCartItem,
  userDetails,
  addToWishlist,
  // wishlistItems,
  saveAddress,
  deleteAddress,
  updateProfileInfo,
  signin,
  signup,
  logout,
  sendEmail,
};

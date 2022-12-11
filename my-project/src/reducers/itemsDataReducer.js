// import Cookie from "js-cookie";

// for items (fetching all items)
function itemsListReducer(state = { items: [] }, action) {
  switch (action.type) {
    case "ITEM_LIST_REQUEST":
      return { loading: true, items: [] };
    case "ITEM_LIST_SUCCESS":
      return { loading: false, items: [...state.items, action.payload] };
    case "ITEM_LIST_FAIL":
      return { loading: false, error: action.payload, items: state.items };
    default:
      return state;
  }
}
// for homepage container
function itemsContainerReducer(state = { items: [] }, action) {
  switch (action.type) {
    case "ITEMS_CONTAINER_REQUEST":
      return { loading: true };
    case "ITEM_CONTAINER_SUCCESS":
      return { loading: false, items: action.payload };
    case "ITEM_CONTAINER_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}
// for items page
function itemsPageReducer(state = { items: [] }, action) {
  switch (action.type) {
    case "ITEM_PAGE_REQUEST":
      return { loading: true };
    case "ITEM_PAGE_SUCCESS":
      return { loading: false, items: action.payload };
    case "ITEM_PAGE_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

// for itempage (fetching product with id)
function itemDetailsReducer(state = { items: {} }, action) {
  switch (action.type) {
    case "ITEM_DETAILS_REQUEST":
      return { loading: true };
    case "ITEM_DETAILS_SUCCESS":
      return { loading: false, items: action.payload };
    case "ITEM_DETAILS_FAIL":
      return { loading: false, error: action.payload };
    case "ITEM_SAVERATING_SUCCESS":
      return { loading: false, items: action.payload };
    default:
      return state;
  }
}

// for itempage  (add product to cart)
// function itemAddToCartReducer(state = { items: {} }, action) {
//   switch (action.type) {
//     case "ITEM_ADD_TO_CART_REQUEST":
//       return { loading: true };
//     case "ITEM_ADD_TO_CART_SUCCESS":
//       return { loading: false, items: action.payload };
//     case "ITEM_ADD_TO_CART_FAIL":
//       return { loading: false, error: action.payload };
//     default:
//       return state;
//   }
// }

// for cart (fetching products in cart)
function itemsCartReducer(state = { items: [] }, action) {
  switch (action.type) {
    case "CART_ITEMS_REQUEST":
      if (state.items && state.items.length) {
        return { loading: true, items: state.items, length: 1 };
      } else {
        return { loading: true };
      }
    case "CART_ITEMS_SUCCESS":
      // console.log("cart success");
      // console.log(action.payload);
      return {
        loading: false,
        items: action.payload,
        length: 1,
      };
    case "CART_ITEMS_FAIL":
      return { loading: false, error: action.payload, length: 0 };
    case "ITEM_ADD_TO_CART_REQUEST":
      if (state.items.find((x) => x._id === action.payload._id)) {
        // if(action.payload.flag===1)

        // let ite = state.items.filter((x) => x._id !== action.payload._id);
        // Cookie.set("cartItems", JSON.stringify([action.payload, ...ite]));
        // localStorage.setItem(
        //   "cartItems",
        //   JSON.stringify([action.payload, ...ite])
        // );
        return {
          loading: false,
          // items: [...ite, action.payload],
          items: state.items.map((x) =>
            x._id === action.payload._id ? action.payload : x
          ),
          // return { loading: false, items: state.items };
        };
      } else {
        // Cookie.set(
        //   "cartItems",
        //   JSON.stringify([...state.items, action.payload])
        // );
        // localStorage.setItem(
        //   "cartItems",
        //   JSON.stringify([...state.items, action.payload])
        // );

        return { loading: false, items: [...state.items, action.payload] };
      }

    case "CART_REMOVE_ITEM_REQUEST":
      // Cookie.set(
      //   "cartItems",
      //   JSON.stringify(state.items.filter((x) => x._id !== action.payload))
      // );
      // localStorage.setItem(
      //   "cartItems",
      //   JSON.stringify(state.items.filter((x) => x._id !== action.payload))
      // );

      return { items: state.items.filter((x) => x._id !== action.payload) };
    case "LOGOUT_USE_REQUEST":
      return { loading: false, items: action.payload };
    default:
      return state;
  }
}

// for deleting item from cart
// function removeitemCartReducer(state={items:{}},action){
//   switch(action.type){
//     case 'CART_REMOVE_ITEM_REQUEST':
//       return {loading:true};
//     case 'CART_REMOVE_ITEM_SUCCESS':
//       return {loading:false,items:action.payload};
//     case 'CART_REMOVE_ITEM_FAIL':
//       return {loading:false,error:action.payload};
//     default:
//       return state;

//  }
// }

//for fetching user details with ID
function userDetailsReducer(state = { items: [] }, action) {
  switch (action.type) {
    case "USER_DETAILS_REQUEST":
      return { loading: true };
    case "USER_DETAILS_SUCCESS":
      return { loading: false, items: action.payload };
    case "USER_DETAILS_FAIL":
      return { loading: false, error: action.payload };
    case "UPDATE_PROFILEINFO_REQUEST":
      return { load: false, items: action.payload };
    case "UPDATE_PROFILEINFO_FAIL":
      return { load: false, err: action.payload };
    default:
      return state;
  }
}

// function updateInfolistReducer(state = { info: [] }, action) {
//   switch (action.type) {
//     case "UPDATE_PROFILEINFO_REQUEST":
//       return { load: false, info: action.payload };
//     case "UPDATE_PROFILEINFO_FAIL":
//       return { load: false, err: action.payload };
//     default:
//       return state;
//   }
// }

// add item to wishlist/fetching wislist items
function itemAddToWishlistReducer(state = { wishlist: [] }, action) {
  switch (action.type) {
    // case "ITEM_ADD_TO_WISHLIST_REQUEST":
    //   return { load: true };
    case "ITEM_ADD_TO_WISHLIST_SUCCESS":
      return { load: false, wishlist: action.payload };
    case "ITEM_ADD_TO_WISHLIST_FAIL":
      return { load: false, err: action.payload };
    default:
      return state;
  }
}

// //  fetching wishlist
// function wishlistCartReducer(state = { items: [] }, action) {
//   switch (action.type) {
//     case "WISHLIST_ITEMS_REQUEST":
//       return { loading: true };
//     case "WISHLIST_ITEMS_SUCCESS":
//       return { loading: false, items: action.payload };
//     case "WISHLIST_ITEMS_FAIL":
//       return { loading: false, error: action.payload };
//     default:
//       return state;
//   }
// }

// //  saving address
// function addressSaveReducer(state = { items: [] }, action) {
//   switch (action.type) {
//     case "ADDRESS_SAVE_REQUEST":
//       return { loading: true };
//     case "ADDRESS_SAVE_SUCCESS":
//       return { loading: false, items: action.payload };
//     case "ADDRESS_SAVE_FAIL":
//       return { loading: false, error: action.payload };
//     default:
//       return state;
//   }
// }

// // deleting address
// function addressDeleteReducer(state = {}, action) {
//   switch (action.type) {
//     case "ADDRESS_DELETE_REQUEST":
//       return { loading: true };
//     case "ADDRESS_DELETE_SUCCESS":
//       return { loading: false, items: action.payload };
//     case "ADDRESS_DELETE_FAIL":
//       return { loading: false, error: action.payload };
//     default:
//       return state;
//   }
// }

function loginCheckReducer(state = {}, action) {
  switch (action.type) {
    case "SIGNIN_DETAILS_REQUEST":
      return { loading: true };
    case "SIGNIN_DETAILS_SUCCESS":
      return { loading: false, user: action.payload };
    case "SIGNIN_DETAILS_FAIL":
      return { loading: false, error: action.payload };
    case "LOGOUT_USER_REQUEST":
      return { loading: false, user: action.payload };
    case "SIGNUP_DETAILS_SUCCESS":
      return { loading: false, user: action.payload };
    case "SIGNUP_DETAILS_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}
function emailsendreducer(state = {}, action) {
  switch (action.type) {
    case "EMAIL_SUCCESS":
      return { loading: true, response: action.payload };
    case "EMAIL_ERROR":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

// function signUpReducer(state = {}, action) {
//   switch (action.type) {
//     case "SIGNUP_DETAILS_REQUEST":
//       return { loading: true };
//     case "SIGNUP_DETAILS_SUCCESS":
//       return { loading: false, user: action.payload };
//     case "SIGNUP_DETAILS_FAIL":
//       return { loading: false, error: action.payload };

//     default:
//       return state;
//   }
// }

export {
  itemsListReducer,
  itemsContainerReducer,
  itemsPageReducer,
  itemDetailsReducer,
  // itemAddToCartReducer,
  itemsCartReducer,
  // removeitemCartReducer,
  userDetailsReducer,
  // updateInfolistReducer,
  itemAddToWishlistReducer,
  // wishlistCartReducer,
  // addressSaveReducer,
  // addressDeleteReducer,
  loginCheckReducer,
  emailsendreducer,
  // signUpReducer,
};

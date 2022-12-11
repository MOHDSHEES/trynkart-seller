// for items (fetching all items)
function sellerSignUpReducer(state = {}, action) {
  switch (action.type) {
    case "SELLERSIGNIN_DETAILS_REQUEST":
      return { loading: true };
    case "SELLERSIGNIN_DETAILS_SUCCESS":
      return { loading: false, user: action.payload };
    case "SELLERSIGNIN_DETAILS_FAIL":
      return { loading: false, error: action.payload };
    case "SELLER_SIGNUP_REQUEST":
      return { loading: true };
    case "SELLER_SIGNUP_SUCCESS":
      return { loading: false, user: action.payload };
    case "SELLER_SIGNUP_FAIL":
      return { loading: false, error: action.payload };
    // case "SELLER_UPDATE_REQUEST":
    //   return { loading: true };
    // case "SELLER_UPDATE_SUCCESS":
    //   return { loading: false, items: action.payload };
    // case "SELLER_UPDATE_FAIL":
    //   return { loading: false, error: action.payload };

    default:
      return state;
  }
}
// function newListingReducer(state = { listing: {} }, action) {
//   switch (action.type) {
//     case "LISTING_UPDATE_REQUEST":
//       return { loading: true };
//     // case "LISTING_UPDATE_SUCCESS":
//     //   return { loading: false, listing: action.payload };
//     case "LISTING_UPDATE_FAIL":
//       return { loading: false, error: action.payload };
//     default:
//       return state;
//   }
// }

function sellerDetailsReducer(state = { details: {} }, action) {
  switch (action.type) {
    case "SELLER_DETAILS_REQUEST":
      return { loading: true };
    case "SELLER_DETAILS_SUCCESS":
      return { loading: false, details: action.payload };
    case "SELLER_DETAILS_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function listingsReducer(state = { listing: [] }, action) {
  switch (action.type) {
    case "LISTING_DETAILS_REQUEST":
      return { loading: true, listing: [] };
    case "LISTING_DETAILS_SUCCESS":
      return { loading: false, listing: action.payload.reverse() };
    case "LISTING_DETAILS_FAIL":
      return { loading: false, error: action.payload, listing: [] };
    case "LISTING_UPDATE_SUCCESS":
      // return { loading: false, listing: action.payload };
      if (state.listing.find((x) => x._id === action.payload._id)) {
        return {
          loading: false,
          // items: [...ite, action.payload],
          listing: state.listing.map((x) =>
            x._id === action.payload._id ? action.payload : x
          ),
          id: action.payload._id,
          // return { loading: false, items: state.items };
        };
      } else {
        return {
          loading: false,
          listing: [...state.listing, action.payload],
          id: action.payload._id,
        };
      }

    default:
      return state;
  }
}
export {
  sellerSignUpReducer,
  // newListingReducer,
  sellerDetailsReducer,
  listingsReducer,
};

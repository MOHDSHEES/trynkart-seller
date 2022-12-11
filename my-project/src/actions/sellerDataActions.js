import axios from "axios";

// seller registration /signup
const sellerSignup = (details) => async (dispatch) => {
  try {
    dispatch({ type: "SELLER_SIGNUP_REQUEST" });
    const { data } = await axios.post("/api/seller/signup", { details });
    dispatch({ type: "SELLER_SIGNUP_SUCCESS", payload: data });
    // Cookie.set("SellerDetails", JSON.stringify(data));
    localStorage.setItem("SellerDetails", JSON.stringify(data));

    window.location.reload();
  } catch (error) {
    // console.log(error);
    dispatch({ type: "SELLER_SIGNUP_FAIL", payload: error.response.data });
  }
};

//  seller details
const sellerDetails = (sellerId) => async (dispatch) => {
  try {
    dispatch({ type: "SELLER_DETAILS_REQUEST" });
    const { data } = await axios.post("/api/seller/details/" + sellerId);
    dispatch({ type: "SELLER_DETAILS_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "SELLER_DETAILS_FAIL", payload: error.response.data });
  }
};

// updating/adding seller details
const sellerUpdate = (details, sellerId) => async (dispatch) => {
  try {
    dispatch({ type: "SELLER_UPDATE_REQUEST" });
    const { data } = await axios.post("/api/seller/update/" + sellerId, {
      details,
    });
    dispatch({ type: "SELLER_UPDATE_SUCCESS", payload: data });
    window.location.reload();
  } catch (error) {
    dispatch({ type: "SELLER_UPDATE_FAIL", payload: error.response.data });
  }
};

// seller login

const sellersignin = (mobileno, Password) => async (dispatch) => {
  try {
    dispatch({ type: "SELLERSIGNIN_DETAILS_REQUEST" });
    const { data } = await axios.post("/api/seller/signin", {
      mobileno,
      Password,
    });
    dispatch({ type: "SELLERSIGNIN_DETAILS_SUCCESS", payload: data });

    localStorage.setItem("SellerDetails", JSON.stringify(data));
    window.location.reload();
  } catch (error) {
    if (error.response.data)
      dispatch({
        type: "SELLERSIGNIN_DETAILS_FAIL",
        payload: error.response.data,
      });
    else
      dispatch({ type: "SELLERSIGNIN_DETAILS_FAIL", payload: error.message });
  }
};

// seller logout handler
const sellerLogout = () => async (dispatch) => {
  localStorage.removeItem("SellerDetails");
  window.location.reload();
  // dispatch({ type: "LOGOUT_USER_REQUEST", payload: data });
};

// updating/adding seller details
const Newlisting = (details, sellerId) => async (dispatch) => {
  try {
    dispatch({ type: "LISTING_UPDATE_REQUEST" });
    const { data } = await axios.post("/api/seller/newListing/" + sellerId, {
      details,
    });
    dispatch({ type: "LISTING_UPDATE_SUCCESS", payload: data });
    // window.location.reload();
  } catch (error) {
    dispatch({ type: "LISTING_UPDATE_FAIL", payload: error.response.data });
  }
};

// updating seller details (listing update)
const listingUpdate = (details, productId) => async (dispatch) => {
  try {
    dispatch({ type: "LISTING_UPDATE_REQUEST" });
    const { data } = await axios.post(
      "/api/seller/listingUpdate/" + productId,
      {
        details,
      }
    );
    dispatch({ type: "LISTING_UPDATE_SUCCESS", payload: data });
    // window.location.reload();
  } catch (error) {
    dispatch({ type: "LISTING_UPDATE_FAIL", payload: error.response.data });
  }
};

// updating/adding seller details
const sellerListings = (details) => async (dispatch) => {
  try {
    dispatch({ type: "LISTING_DETAILS_REQUEST" });
    const { data } = await axios.post("/api/seller/getListings", {
      details,
    });
    dispatch({ type: "LISTING_DETAILS_SUCCESS", payload: data });
    // window.location.reload();
  } catch (error) {
    dispatch({ type: "LISTING_DETAILS_FAIL", payload: error.response.data });
  }
};

export {
  sellerSignup,
  sellerUpdate,
  sellersignin,
  sellerLogout,
  Newlisting,
  listingUpdate,
  sellerDetails,
  sellerListings,
};

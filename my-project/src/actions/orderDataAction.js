// import axios from "axios";

// // updating/adding seller details
// const orderPlacing =
//   (userId, items, qty, address, orderId) => async (dispatch) => {
//     try {
//       dispatch({ type: "ORDER_DETAILS_REQUEST" });
//       const { data } = await axios.post("/api/payment/order/placing", {
//         userId: userId,
//         items: items,
//         qty: qty,
//         address: address,
//         orderId: orderId,
//       });
//       dispatch({ type: "ORDER_DETAILS_SUCCESS", payload: data });
//       // window.location.reload();
//     } catch (error) {
//       dispatch({ type: "ORDER_DETAILS_FAIL", payload: error.response.data });
//     }
//   };

// export { orderPlacing };

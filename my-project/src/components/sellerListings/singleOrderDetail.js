import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Axios from "axios";
import { formatter } from "../scroll";

function SingleOrderDetails() {
  const history = useHistory();
  const location = useLocation();
  const [item, setitem] = useState();
  const [payment, setpayment] = useState();
  //   console.log(payment);
  useEffect(() => {
    if (location.state) {
      setitem(location.state);
      async function fetchPayment(e) {
        const { data } = await Axios.post(
          "/api/payment/order/details/" + location.state.paymentId
        );
        setpayment(data);
      }

      fetchPayment();
    } else {
      history.push("/seller");
    }
  }, [location.state]);

  return item ? (
    <div className="orderdetails-container">
      <div
        className="d-flex flex-column justify-content-center align-items-center "
        id="order-heading"
      >
        <div className="text-uppercase">
          <p>Order detail</p>
        </div>
        <div className="h4">Id:- {item.orderId}</div>
        <div className="pt-1">
          <p>
            Placed on {" " + item.date} is currently<b> processing</b>
          </p>
        </div>
        {/* <div className="btn close text-white"> &times; </div> */}
      </div>
      <div className="orderdetails-wrapper bg-white shadow">
        <div className="table-responsive orderdetails-tableresponsive">
          <table className="table table-borderless orderdetails-table">
            <thead>
              <tr className="text-uppercase text-muted">
                <th scope="col">product id</th>
                <th scope="col" className="text-right">
                  mrp
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th
                  scope="row "
                  style={{ paddingRight: "5px" }}
                  className="orderdetails-row"
                >
                  {item.productId}
                </th>
                <td className="text-right">
                  <b>{formatter.format(item.mrp)}</b>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          className="d-flex justify-content-start align-items-center orderdetails-list py-1"
          style={{ margin: "20px 0" }}
          onClick={() =>
            window.open(
              "http://newtrynkart.herokuapp.com/product/category/" +
                item.productId,
              "_blank"
            )
          }
        >
          {/* <div>
            <b>{item.qty}pc</b>
          </div> */}
          <div style={{ marginRight: "1rem" }}>
            {" "}
            <img
              src={item.productImg}
              alt=""
              //   className="rounded-circle"
              width="50"
              height="50"
            />{" "}
          </div>
          <div className="order-item">{item.displayInfo}</div>
        </div>

        <div className="pt-2 border-bottom mb-3"></div>
        <div className="d-flex justify-content-start align-items-center ">
          <div className="text-muted">Payment Method</div>
          <div className="ml-auto">
            {" "}
            {/* <img
              src="https://www.freepnglogos.com/uploads/mastercard-png/mastercard-logo-logok-15.png"
              alt=""
              width="30"
              height="30"
            />{" "} */}
            <label className="orderdetails-label">
              {payment && payment.method}{" "}
              {payment && payment.wallet && payment.wallet}
            </label>{" "}
          </div>
        </div>
        <div className="d-flex justify-content-start align-items-center py-1 ">
          <div className="text-muted">Shipping</div>
          <div className="ml-auto">
            {" "}
            <label className="orderdetails-label">Free</label>{" "}
          </div>
        </div>
        <div className="d-flex justify-content-start align-items-center py-1 ">
          <div className="text-muted">Quantity</div>
          <div className="ml-auto">
            {" "}
            <label className="orderdetails-label">{item.qty}</label>{" "}
          </div>
        </div>

        <div className="d-flex justify-content-start align-items-center pb-4  border-bottom">
          <div className="text-muted">
            {" "}
            <button className="text-white btn orderdetails-btn">
              {(((item.mrp - item.sellingPrice) * 100) / item.mrp).toFixed()}%
              Discount
            </button>{" "}
          </div>
          <div className="ml-auto price">
            {" "}
            - {formatter.format(item.mrp - item.sellingPrice)}{" "}
          </div>
        </div>
        <div className="d-flex justify-content-start align-items-center py-1 ">
          <div className="text-muted">Price</div>
          <div className="ml-auto">
            {" "}
            <label className="orderdetails-label">
              {formatter.format(item.sellingPrice)}
            </label>{" "}
          </div>
        </div>
        <div className="d-flex justify-content-start align-items-center  py-3 mb-4 border-bottom">
          <div className="text-muted">Total Paid </div>
          <div className="ml-auto h5">
            {formatter.format(item.sellingPrice * item.qty)}{" "}
          </div>
        </div>
        <div className="row orderdetails-row border rounded p-1 my-3">
          <div className="col-md-12 py-3">
            <div className="d-flex flex-column align-items start">
              {" "}
              <b>Address</b>
              <p
                style={{ marginTop: "5px" }}
                className="orderdetails-text text-justify"
              >
                {item.address.name}
                <span style={{ marginLeft: "15px" }}>
                  {item.address.mobileno}
                </span>
              </p>
              <p
                style={{ marginTop: "-3px" }}
                className="orderdetails-text text-justify pt-2"
              >
                {item.address.address +
                  " " +
                  item.address.district +
                  " (" +
                  item.address.pincode +
                  ")."}
              </p>
              <p className="orderdetails-text text-justify">
                {item.address.state}
              </p>
            </div>
          </div>

          {/* <div className="col-md-6 py-3">
            <div className="d-flex flex-column align-items start">
              {" "}
              <b>Shipping Address</b>
              <p className="orderdetails-text text-justify pt-2">
                James Thompson, 356 Jonathon Apt.220,
              </p>
              <p className="orderdetails-text text-justify">New York</p>
            </div>
          </div> */}
        </div>

        <div className="pl-3 font-weight-bold">More Details</div>
        <div className="d-sm-flex justify-content-between rounded my-3 subscriptions">
          <div>
            {" "}
            <b>Order Id : {" " + item.orderId}</b>{" "}
          </div>
          <div>Payment Id :{" " + item.paymentId}</div>

          <div>Item Id :{" " + item.productId}</div>
          {payment && payment.acquirer_data && (
            <div>
              Transaction Id :{" " + payment.acquirer_data.transaction_id}
            </div>
          )}
          {/* <div>
            {" "}
            Total: <b> $68.8 for 10 items</b>{" "}
          </div> */}
        </div>
      </div>
    </div>
  ) : (
    <div>loading...</div>
  );
}

export default SingleOrderDetails;

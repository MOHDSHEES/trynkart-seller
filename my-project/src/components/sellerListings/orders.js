import React, { useEffect, useState } from "react";
// import Axios from "axios";
import { formatter } from "../scroll";
import { useHistory, Link } from "react-router-dom";
import Axios from "axios";
import { useSelector } from "react-redux";

function Orders(props) {
  // const [data, setdata] = useState(props.data);
  const [order, setorder] = useState(
    props.data && props.data.order.reverse().slice(0, 3)
  );
  const [width, setWidth] = useState(window.innerWidth);
  // const order = props.data && props.data.order.reverse();

  const Details = useSelector((state) => state.sellerSignUp);
  const {
    sellerDetails: { _id },
  } = Details;

  useEffect(() => {
    if (props.disableviewbtn) {
      async function logincredentials() {
        const { data } = await Axios.post("/api/seller/details/" + _id);
        setorder(data.order && data.order.reverse());
      }

      logincredentials();
    }
    const handleWindowRes = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowRes);

    return () => {
      window.addEventListener("resize", handleWindowRes);
    };
  }, [_id, props]);

  return (
    <div>
      {width < 945 ? (
        <OrderMobile props={props} order={order} />
      ) : (
        <OrderPc props={props} order={order} />
      )}
    </div>
  );
}

//  function to render orders on moibile or tablets
function OrderMobile(prop) {
  const { props, order } = prop;
  const history = useHistory();
  function orderDetails(item) {
    history.push({ pathname: "/seller/account/orderDetails", state: item });
  }
  return (
    <div
      className="orders-details-div orders-details-table "
      style={{
        // borderTop: "1px solid #d9d9d9",
        overflowX: "auto",
        background: "#eff3f6",
      }}
    >
      <h5
        style={{
          margin: "5px 0",
          fontSize: "1.25rem",
          fontWeight: "500",
          textAlign: "left",
        }}
        className="dashboard-heading borders shadow "
      >
        {" "}
        New Orders (
        {(props.data && props.data.order && props.data.order.length) ||
          (order && order.length)}
        )
        {!props.disableviewbtn && (
          <Link
            className="greater-than"
            to={"/seller/dashboard/order/requests"}
            style={{ fontSize: "1rem", marginTop: "3px" }}
          >
            View all
          </Link>
        )}
      </h5>
      {order &&
        order.map((item, idx) => {
          return (
            <div
              className="myorder-flex-main"
              style={{ marginTop: "5px", background: "white" }}
              key={idx}
            >
              <div style={{ height: "auto" }} className="borders">
                <div
                  className="profile-myorder heading-color"
                  onClick={() => orderDetails(item)}
                  // style={{ background: "rgb(239, 243, 246)" }}
                >
                  <div className="placed" style={{ padding: "2px" }}>
                    DATE<div>{item.date}</div>
                  </div>
                  <div className="qty" style={{ padding: "2px" }}>
                    QTY
                    <div>{item.qty}</div>
                  </div>
                  <div className="shiped" style={{ padding: "2px" }}>
                    PRICE<div>{formatter.format(item.sellingPrice)}</div>
                  </div>
                  <div className="orderid" style={{ padding: "2px" }}>
                    ORDER ID<div> {item.orderId}</div>
                  </div>
                </div>
                <div
                  className="delivered-status"
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: "lighter",
                    color: "grey",
                  }}
                >
                  {/* Delivered 30-Apr-2021{" "} */}
                  Item Id: {item.productId}
                  <span
                    style={{
                      float: "right",
                      fontWeight: "bold",
                      fontSize: "0.8rem",
                      marginTop: "-3px",
                    }}
                  >
                    {/* Qty: {item.qty} */}
                    Total: {formatter.format(item.sellingPrice * item.qty)}
                  </span>
                </div>
                <div
                  className="cart-items order-items"
                  style={{ width: "98%" }}
                >
                  {/* <Link
                    id="items-section-anchor"
                    to={"/item/laptops/" + item.productId}
                  > */}
                  <div
                    onClick={() => orderDetails(item)}
                    className="cart-item-image"
                  >
                    <img src={item.productImg} alt="Laptop" />
                  </div>
                  {/* </Link> */}
                  <div className="cart-item-details">
                    {/* <Link
                      id="items-section-anchor"
                      to={"/item/laptops/" + item.productId}
                    > */}
                    <div
                      onClick={() => orderDetails(item)}
                      className="cart-item-name"
                    >
                      <p style={{ marginBottom: "0" }}>{item.displayInfo}</p>
                    </div>
                    {/* </Link> */}

                    <small
                      // to={"/item/laptops/" + item.productId}
                      style={{
                        color: "green",
                        fontWeight: "bold",
                        fontSize: "0.8rem",
                      }}
                      className=" buy-again-btn"
                    >
                      Under Processing
                    </small>
                  </div>
                </div>
                <div
                  style={{
                    padding: "10px 10px 10px 15px",
                    borderTop: "1px solid #d9d9d9",
                  }}
                >
                  <small className="grey">
                    {/* <span
      style={{
        fontWeight: "bold",
      }}
    >
      Address:{" "}
    </span> */}
                    {item.address.address +
                      " " +
                      item.address.district +
                      " " +
                      item.address.state +
                      " (" +
                      item.address.pincode +
                      "), " +
                      item.address.mobileno}
                    .
                  </small>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

//  function to render orders on pc or larger screen size
function OrderPc(prop) {
  const history = useHistory();

  // function previewHandler(id) {
  //   history.push("/item/category/" + id);
  // }
  function orderDetails(item) {
    history.push({ pathname: "/seller/account/orderDetails", state: item });
  }
  const { props, order } = prop;

  return (
    <div
      className="orders-details-div orders-details-table shadow "
      style={{
        borderTop: "1px solid #d9d9d9",
        overflowX: "auto",
      }}
    >
      {!props.disableviewbtn && (
        <Link className="greater-than" to={"/seller/dashboard/order/requests"}>
          View all
        </Link>
      )}
      <h5>
        New Orders (
        {(props.data && props.data.order && props.data.order.length) ||
          (order && order.length)}
        )
      </h5>

      <div className="table-responsive-lg">
        <table
          style={{ marginBottom: "0" }}
          className="table  table-bordered table-hover"
        >
          <thead className="back-color">
            <tr>
              <th width="20%" scope="col">
                Product Details
              </th>
              <th scope="col">Selling Price</th>
              <th scope="col">MRP</th>
              <th scope="col">Total</th>
              <th scope="col">Quantity</th>
              <th style={{ minWidth: "100px" }} scope="col">
                Order Date
              </th>
              <th scope="col">Order Id</th>

              <th style={{ minWidth: "150px" }} scope="col">
                Address
              </th>
              <th scope="col">Phone No.</th>

              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {order &&
              order.map((item, idx) => {
                return (
                  <tr key={idx} style={{ cursor: "pointer" }}>
                    <td
                      // onClick={() => previewHandler(item.productId)}
                      onClick={() => orderDetails(item)}
                    >
                      <div className="lising-details-product">
                        <img src={item.productImg} alt="" />
                        <small>{item.displayInfo}</small>
                      </div>
                    </td>
                    <td onClick={() => orderDetails(item)}>
                      {formatter.format(item.sellingPrice)}
                    </td>
                    <td onClick={() => orderDetails(item)}>
                      {formatter.format(item.mrp)}
                    </td>
                    <td onClick={() => orderDetails(item)}>
                      {formatter.format(item.sellingPrice * item.qty)}
                    </td>
                    <td onClick={() => orderDetails(item)}>{item.qty}</td>
                    <td onClick={() => orderDetails(item)}>{item.date}</td>
                    <td onClick={() => orderDetails(item)}>{item.orderId}</td>

                    <td onClick={() => orderDetails(item)}>
                      {item.address.city && item.address.city + " "}
                      {item.address.locality && item.address.locality + " "}
                      {item.address.district && item.address.district + " "}
                      {item.address.state && item.address.state + " "}(
                      {item.address.pincode}){" "}
                    </td>
                    <td onClick={() => orderDetails(item)}>
                      {item.address.mobileno}
                    </td>

                    <td>
                      <a href="#!">Under Processing</a>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Orders;

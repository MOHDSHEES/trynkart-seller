import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { sendEmail } from "../actions/itemsDataActions";
import Axios from "axios";

function Contact(props) {
  const popup = useRef();
  const sendBtn = useRef();

  const history = useHistory();

  // state for button disable
  const [isdisable, setisdisable] = useState(false);

  // input states
  const [State, setState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // sent email response
  const userDetail = useSelector((state) => state.emailSend);
  const { response, error } = userDetail;

  // form handler(storing form fields values)
  const Inputchange = (event) => {
    const { name, value } = event.target;

    setState({
      ...State,
      [name]: value,
    });
  };

  const [order, setorder] = useState([]);

  // function to redirect to order details on click
  function orderDetails(item) {
    history.push({
      pathname: "/account/orderDetails",
      state: { item: item, details: { order: order } },
    });
  }

  // getting order details
  useEffect(() => {
    async function logincredentials() {
      const { data } = await Axios.post("/api/user/details/" + props.userId);

      setorder(data && data.order && data.order.length && data.order.reverse());
    }

    logincredentials();
  }, [props]);
  // error/sucess message and form resetting
  useEffect(() => {
    if (response) {
      setState({ name: "", email: "", subject: "", message: "" });
      setisdisable(false);
      sendBtn.current.innerHTML = "Send Message";
      popup.current.classList.remove("cart-popup-close");
      setTimeout(() => {
        popup.current.classList.add("cart-popup-close");
      }, 3000);
    } else if (error) {
      setisdisable(false);
      sendBtn.current.innerHTML = "Send Message";
    }
  }, [response, error]);

  const dispatch = useDispatch();

  // form submit handler
  function submithandler(e) {
    e.preventDefault();
    setisdisable(true);
    sendBtn.current.innerHTML = "Sending...";
    dispatch(sendEmail(State, props.userId));
  }
  // scrolling to specific issues(only on pc or above)
  function issueScroll(props) {
    document.getElementById(props).classList.toggle("active-dropdown");
    document
      .getElementsByClassName(props)[0]
      .classList.toggle("background-dropdown");
  }
  return (
    <div className="contact-container">
      <div
        ref={popup}
        className="cart-popup cart-popup-close cart-popup-open"
        id="cartPopupMessage"
      >
        <div className="cart-popup-border">
          {/* Thanks for contacting us. We will get back to you shortly */}
          {response ? response.message : ""}
        </div>
      </div>
      <div className="contact">
        <h4> Help Center | 24x7 Customer Care Support</h4>
      </div>

      <div className="contact-main ">
        <div className="contact-left ">
          <ul className="contact-left-ul  ">
            <li>TYPE OF ISSUE</li>
            <ul className="contact-li profile-pa-left">
              <li className="contact-anchor">
                <p
                  onClick={() =>
                    document.getElementById("contact-orders").scrollIntoView({
                      behavior: "smooth",
                    })
                  }
                >
                  Help with your order
                </p>
              </li>

              <li className="contact-anchor">
                <p
                  onClick={() =>
                    document.getElementById("contact-issues").scrollIntoView({
                      behavior: "smooth",
                    })
                  }
                >
                  Help with your issues
                </p>
              </li>
              <li className="contact-anchor">
                <p
                  onClick={() =>
                    document.getElementById("contact-form").scrollIntoView({
                      behavior: "smooth",
                    })
                  }
                >
                  Help with other issues
                </p>
              </li>
            </ul>

            <li style={{ paddingTop: "1rem" }}>HELP TOPICS</li>
            <ul className="contact-li profile-pa-left">
              <li>
                <p>Order</p>
              </li>
              <li>
                <p>Cancellation and returns</p>
              </li>
              <li>
                <p>Payment</p>
              </li>
              <li>
                <p>Shopping</p>
              </li>
              <li>
                <p>My account</p>
              </li>
              <li>
                <p>Selling</p>
              </li>
              <li>
                <p>Reviews</p>
              </li>
              <li>
                <p>Warranty</p>
              </li>
              <li>
                <p>Privacy and Security</p>
              </li>
              <li>
                <p>Others</p>
              </li>
            </ul>
          </ul>
        </div>

        <div className="contact-right">
          {props.token ? (
            <div>
              {order && order.length !== 0 && (
                <div
                  id="contact-orders"
                  className="borders"
                  style={{ backgroundColor: "white", marginTop: "10px" }}
                >
                  <h5 className="contact-headings">Help with your Orders</h5>
                  {order.slice(0, 2).map((item, idx) => {
                    return (
                      <div
                        key={idx}
                        className=" contact-items"
                        style={{ marginBottom: "0" }}
                      >
                        <div
                          onClick={() => orderDetails(item)}
                          style={{ cursor: "pointer" }}
                          className="cart-item-image wishlist-img"
                        >
                          <img src={item.productImg} alt="" />
                        </div>

                        <div className="contact-item-details">
                          <div className="btn-group wishlist-btn-div"></div>

                          <div
                            onClick={() => orderDetails(item)}
                            style={{ cursor: "pointer" }}
                            className="contact-item-name"
                          >
                            <p>{item.displayInfo}</p>
                          </div>
                          <p
                            style={{ padding: "0" }}
                            className="delivered-status contact-delivered-status"
                          >
                            &#8226; Under Processing
                          </p>
                        </div>
                      </div>
                    );
                  })}

                  {/* <div className=" contact-items" style={{ marginBottom: "0" }}>
                  <Link
                    id="items-section-anchor"
                    to={"/item/laptops/60f3d445574d77f19a61570a"}
                  >
                    <div className="cart-item-image wishlist-img">
                      <img src="https://bit.ly/3vvAqXd" alt="Laptop" />
                    </div>
                  </Link>
                  <div className="contact-item-details">
                    <div className="btn-group wishlist-btn-div"></div>
                    <Link
                      id="items-section-anchor"
                      to={"/item/laptops/60f3d445574d77f19a61570a"}
                    >
                      <div className="contact-item-name">
                        <p>
                          ASUS Athlon Dual Core 3050U - (4 GB/1 TB HDD/Windows
                          10 Home) M515DA-EJ002TS Thin and Light Laptop (15.6
                          inch, Transparent Silver, 1.80 kg, With MS Office)
                        </p>
                      </div>
                    </Link>
                    <p
                      style={{ padding: "0" }}
                      className="delivered-status  contact-delivered-status"
                    >
                      &#8226; Delivered on 30-april-2021
                    </p>
                  </div>
                </div> */}
                </div>
              )}
              <div
                className="borders"
                id="contact-issues"
                style={{
                  backgroundColor: "white",
                  marginTop: "10px",
                  paddingBottom: "10px",
                  fontFamily: "Roboto, Arial, sans-serif",
                }}
              >
                <h5
                  style={{ paddingBottom: "20px" }}
                  className="contact-headings"
                >
                  Help with your Issues
                </h5>
                <div style={{ padding: "0 20px" }}>
                  <h6
                    className="contact-issues-scroll q1"
                    onClick={() => issueScroll("q1")}
                  >
                    How to track Order ?
                  </h6>
                  <div id="q1" className="contact-scroll-content">
                    Go to My Orders in your TryNcart account to track and find
                    your package and order details.You can track the location of
                    your package by entering your tracking ID.
                  </div>
                </div>

                <div style={{ padding: "0 20px" }}>
                  <h6
                    className="contact-issues-scroll q2"
                    onClick={() => issueScroll("q2")}
                  >
                    Help with Return and Refund ?
                  </h6>
                  <div id="q2" className="contact-scroll-content">
                    Place a return request in the My Orders page. You will get
                    an option to choose refund/replace/exchange as per our
                    return policy.In case of cash on delivery, you will have to
                    provide a bank account number for the refund. For
                    replacement/exchange, you will be given an alternate product
                    for the returned product.
                  </div>
                </div>
                <div style={{ padding: "0 20px" }}>
                  <h6
                    className="contact-issues-scroll q3"
                    onClick={() => issueScroll("q3")}
                  >
                    Help with Payment ?
                  </h6>
                  <div id="q3" className="contact-scroll-content">
                    You can specify a card label at the time of saving a card on
                    TryNcart through the 'My Account' section. You can also
                    add/edit the label anytime through 'My Saved Cards' in the
                    'My Account' section on TryNcart.
                  </div>
                </div>
              </div>
              <div
                id="contact-form"
                className="borders"
                style={{ backgroundColor: "white", marginTop: "10px" }}
              >
                <h5
                  style={{ paddingBottom: "20px" }}
                  className="contact-headings"
                >
                  Help with other Issues
                </h5>
                <div className="contact-form">
                  <form onSubmit={submithandler}>
                    <div className="form-row">
                      <div className="form-group col-md-6">
                        <label htmlFor="name">Name</label>
                        <input
                          type="text"
                          autoComplete="off"
                          className="form-control"
                          id="fullname"
                          name="name"
                          placeholder="Full Name"
                          value={State.name}
                          onChange={Inputchange}
                          required
                        />
                      </div>
                      <div className="form-group col-md-6">
                        <label htmlFor="inputEmail4">Email</label>
                        <input
                          type="email"
                          autoComplete="off"
                          className="form-control"
                          id="inputEmail4"
                          placeholder="Email"
                          name="email"
                          value={State.email}
                          onChange={Inputchange}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="subject">Subject</label>
                      <input
                        type="text"
                        className="form-control"
                        id="subject"
                        autoComplete="off"
                        placeholder="Subject"
                        name="subject"
                        value={State.subject}
                        onChange={Inputchange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="message">Message</label>
                      <textarea
                        className="form-control"
                        id="message"
                        autoComplete="off"
                        rows="4"
                        placeholder="message"
                        name="message"
                        value={State.message}
                        onChange={Inputchange}
                        required
                      />
                    </div>
                    <button
                      // id="send-btn"
                      ref={sendBtn}
                      type="submit"
                      disabled={isdisable}
                      className="btn btn-primary"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ) : (
            <h5 style={{ textAlign: "center", marginTop: "30px" }}>
              Login to get help with your products...{" "}
            </h5>
          )}
        </div>
      </div>
      <div className="contact-bottom">
        24x7 Customer Care Support on the TryNcart Help Centre. Any query or
        issue that you may possibly have while shopping on TryNcart is taken
        care here. This page is easy to navigate, and you can get support almost
        immediately. Once you log onto your TryNcart account, this page shows
        you your recent orders and let you report any issue. By clicking on the
        specific order, you can raise your query. It also has a chat option to
        ensure that your queries and issues are taken care of. Similarly, there
        are other options on this page that are created to assist you and to
        make your shopping experience hassle-free. You can get support any time
        and get a satisfactory solution to your queries and issues within
        minutes.{" "}
      </div>
    </div>
  );
}
export default Contact;

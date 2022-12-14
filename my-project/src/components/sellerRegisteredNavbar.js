import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { useHistory } from "react-router-dom";
import { useState } from "react";
import { sellerDetails, sellerLogout } from "../actions/sellerDataActions";

function SellerRegisteredNavbar() {
  const history = useHistory();
  const dispatch = useDispatch();

  // const userDetail = useSelector((state) => state.userDetailsReducer);
  // const { items: user } = userDetail;
  // console.log(user);
  //  getting seller Details
  const seller = useSelector((state) => state.sellerDetails);
  const { details } = seller;

  // getting loggedIn seller Id
  const Details = useSelector((state) => state.sellerSignUp);
  const {
    sellerDetails: { _id },
  } = Details;

  //  dispatching action for seller details
  useEffect(() => {
    if (details && !Object.keys(details).length) {
      dispatch(sellerDetails(_id));
    }
  }, [dispatch, _id, details]);

  // const Details = useSelector((state) => state.sellerSignUp);
  // const {
  //   sellerDetails: { _id },
  // } = Details;

  // logout handler
  function logoutHandler() {
    history.push("/seller");
    dispatch(sellerLogout());
  }

  // scroll listening when navbar is opn on mobiles(to close navbar on outside click)
  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);

    return () => window.removeEventListener("scroll", listenScrollEvent);
  }, []);

  const [topheight, settopheight] = useState(410);

  const listenScrollEvent = (event) => {
    if (window.scrollY < 330) {
      settopheight(410 - window.scrollY);
    } else if (window.scrollY > 330) {
      settopheight(0);
    }
  };

  return (
    <div>
      <a
        style={{ top: topheight }}
        className="close-navbar-toggler collapsed"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
        href="#!"
      >
        {" "}
      </a>
      <nav
        id="nav1"
        className="navbar navbar-expand-lg navbar-dark "
        // collapseOnSelect
        style={{ backgroundColor: "#126e82" }}
      >
        <a className="navbar-brand" href="/">
          TryNcartSeller
        </a>

        <div className="d-flex flex-row ">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        <div
          className="collapse navbar-collapse order-3 order-lg-2"
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mr-auto ">
            <li className="nav-item active space">
              {/* {props.user && props.user.token ? ( */}
              <div className="nav-item dropdown ">
                <a
                  className="nav-link dropdown-toggle active"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  href="#!"
                >
                  {details && details.name ? details.name : "Profile"}
                </a>

                <div
                  className="dropdown-menu "
                  aria-labelledby="navbarDropdown"
                >
                  <Link
                    data-toggle="collapse"
                    data-target=".navbar-collapse.show"
                    className="dropdown-item "
                    // href="#!"
                    to={{
                      pathname: "/seller/dashboard/profile/" + _id,
                    }}
                    // to="/account"
                  >
                    View Profile
                  </Link>
                  {details && details.admin && (
                    <Link
                      data-toggle="collapse"
                      data-target=".navbar-collapse.show"
                      className="dropdown-item "
                      to="/admin"
                    >
                      Admin Pannel
                    </Link>
                  )}

                  <Link
                    to="/"
                    data-toggle="collapse"
                    data-target=".navbar-collapse.show"
                    className="dropdown-item "

                    // to="/account"
                  >
                    Dashboard
                  </Link>
                  <a
                    data-toggle="collapse"
                    data-target=".navbar-collapse.show"
                    className="dropdown-item"
                    onClick={logoutHandler}
                    href="#!"
                  >
                    {" "}
                    Logout
                  </a>
                </div>
              </div>
            </li>
            <li className="nav-item dropdown space">
              <a
                className="nav-link dropdown-toggle active"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                href="#!"
              >
                Listings
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                {/* <Link
                  to="/seller/dashboard/listings-management/add-single-listing"
                  data-toggle="collapse"
                  data-target=".navbar-collapse.show"
                  className="dropdown-item"
                >
                  Add Listing
                </Link> */}
                <Link
                  to="/seller/dashboard/listings-management"
                  data-toggle="collapse"
                  data-target=".navbar-collapse.show"
                  className="dropdown-item"
                >
                  Add New Listing
                </Link>
              </div>
            </li>
            <li className="nav-item dropdown space">
              <a
                className="nav-link dropdown-toggle active"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                href="#!"
              >
                Orders
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link
                  data-toggle="collapse"
                  data-target=".navbar-collapse.show"
                  className="dropdown-item"
                  to={"/seller/dashboard/order/completed"}
                >
                  Completed
                </Link>
                <Link
                  data-toggle="collapse"
                  data-target=".navbar-collapse.show"
                  className="dropdown-item"
                  to={"/seller/dashboard/order/returned"}
                >
                  Returned
                </Link>
                <Link
                  data-toggle="collapse"
                  data-target=".navbar-collapse.show"
                  className="dropdown-item"
                  to={"/seller/dashboard/order/requests"}
                >
                  Requests
                </Link>
              </div>
            </li>
            <li className="nav-item dropdown space">
              <a
                className="nav-link dropdown-toggle active"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                href="#!"
              >
                Payments
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a
                  data-toggle="collapse"
                  data-target=".navbar-collapse.show"
                  className="dropdown-item"
                  href="#!"
                >
                  View Payments
                </a>
                <a
                  data-toggle="collapse"
                  data-target=".navbar-collapse.show"
                  className="dropdown-item"
                  href="#!"
                >
                  Pending
                </a>
              </div>
            </li>

            <li className="nav-item dropdown space">
              <a
                className="nav-link dropdown-toggle active"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                href="#!"
              >
                More
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a
                  data-toggle="collapse"
                  data-target=".navbar-collapse.show"
                  className="dropdown-item"
                  href="#!"
                >
                  Advertise
                </a>
                <a
                  data-toggle="collapse"
                  data-target=".navbar-collapse.show"
                  className="dropdown-item"
                  href="#!"
                >
                  Download App
                </a>
              </div>
            </li>
          </ul>
          {/* <div className="nav-search"> */}
          <div className="d-flex flex-row ">
            <ul className="navbar-nav flex-row">
              <li className="nav-item active space  ">
                <Link
                  style={{ paddingRight: "10px" }}
                  className="nav-link"
                  // href=""
                  to="https://trynkart.vercel.app/contact"
                  target="_blank"
                rel="noreferrer"
                >
                  Contact Us
                </Link>
              </li>
              <li className="nav-item active space  ">
                <a
                  style={{ paddingRight: "10px" }}
                  className="nav-link"
                  href="#!"
                  // to=""
                >
                  <i className="fa fa-bell"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* </div> */}
      </nav>
      {/* <div className="main-search">
        <div className="form-group has-search">
          <span className="fa fa-search form-control-feedback"></span>
          <input type="text" className="form-control" placeholder="Search" />
        </div>
      </div> */}
    </div>
  );
}
// const clickOutsideConfig = {
//   handleClickOutside: () => Navbar.handleClickOutside,
// };
// export default onClickOutside(Navbar, clickOutsideConfig);
export default SellerRegisteredNavbar;

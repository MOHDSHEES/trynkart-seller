import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sellerLogout } from "../actions/sellerDataActions";
import { useHistory } from "react-router-dom";

function clickhandle() {
  document.getElementById("error").classList.add("login-error-hide");
  document.getElementById("seller-login-form").reset();
  // document.getElementById("id01").style.display = "block";
}

function SellerNavbar(props) {
  const Details = useSelector((state) => state.sellerSignUp);
  const { sellerDetails } = Details;
  const [mobileno, setmobileno] = useState("");
  let history = useHistory();
  const dispatch = useDispatch();

  // logoutHandler
  function logoutHandler() {
    history.push("/seller");
    dispatch(sellerLogout());
  }

  // submit handler
  function submitHandler(e) {
    e.preventDefault();
    history.push({
      pathname: "/seller/registration",
      mobileno,
    });
  }
  // closing navbar (mobile phones) on outside click
  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);

    return () => window.removeEventListener("scroll", listenScrollEvent);
  }, []);
  const [topheight, settopheight] = useState(284);
  const listenScrollEvent = (event) => {
    if (window.scrollY < 200) {
      settopheight(284 - window.scrollY);
    } else if (window.scrollY > 200) {
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
              {sellerDetails && sellerDetails.token ? (
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
                    {sellerDetails.name ? sellerDetails.name : "Profile"}
                  </a>

                  <div
                    className="dropdown-menu "
                    aria-labelledby="navbarDropdown"
                  >
                    {/* <Link
                      data-toggle="collapse"
                      data-target=".navbar-collapse.show"
                      className="dropdown-item "
                      to="/account"
                    >
                      View Profile
                    </Link> */}
                    <a
                      data-toggle="collapse"
                      data-target=".navbar-collapse.show"
                      className="dropdown-item"
                      href="#!"
                      onClick={logoutHandler}
                    >
                      {" "}
                      Logout
                    </a>
                  </div>
                </div>
              ) : (
                <button
                  className="btn btn-light "
                  data-toggle="modal"
                  data-target="#sellerloginModal"
                  onClick={clickhandle}
                >
                  Login{" "}
                </button>
              )}
              {/* ) : (
                <button
                  className="btn btn-light "
                  data-toggle="modal"
                  data-target="#loginModal"
                  onClick={clickhandle}
                >
                  Login{" "}
                </button>
              )} */}
            </li>
            <li className="nav-item active space">
              <Link
                data-toggle="collapse"
                data-target=".navbar-collapse.show"
                className="nav-link"
                to="/"
              >
                Purchase <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item active space">
              <Link
                data-toggle="collapse"
                data-target=".navbar-collapse.show"
                className="nav-link"
                to="/contact"
              >
                Contact Us <span className="sr-only">(current)</span>
              </Link>
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
          {!(sellerDetails && sellerDetails.token) && props.mobileInput && (
            <div className="nav-search">
              <form
                onSubmit={submitHandler}
                className="seller-register-form my-2 my-lg-0"
              >
                <input
                  type="tel"
                  pattern="^\d{10}"
                  className="form-control mr-sm-2"
                  placeholder="Enter 10 digit mobile no."
                  aria-label="Search"
                  title="Format 9988776655"
                  value={mobileno}
                  onChange={(e) => setmobileno(e.target.value)}
                />

                <button className="btn btn-warning  my-2 my-sm-0" type="submit">
                  Register now
                </button>
              </form>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default SellerNavbar;

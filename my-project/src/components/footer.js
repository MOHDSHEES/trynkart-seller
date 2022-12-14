import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Footer() {
  const Details = useSelector((state) => state.sellerSignUp);
  const { sellerDetails } = Details;
  return (
    <footer
      className="page-footer font-small unique-color-dark"
      style={{ backgroundColor: "#020217" }}
    >
      <div style={{ backgroundColor: "#126e82" }}>
        <div id="footer-logo" className="container">
          <div className="row py-4 d-flex align-items-center">
            <div className="col-md-6 col-lg-5 text-center text-md-left mb-4 mb-md-0">
              <h6 style={{ color: "white" }} className="mb-0">
                Get connected with us on social networks!
              </h6>
            </div>

            <div className="col-md-6 col-lg-7 text-center text-md-right">
              <a
                href="#!"
                className="fb-ic  padding-icon icon-hover"
                id="facebook"
              >
                {/* <i className="fab fa-facebook-f white-text mr-4 icon-pointer "> </i> */}
              </a>

              <a
                href="#!"
                className="tw-ic  padding-icon icon-hover"
                id="twitter"
              >
                {/* <i className="fab fa-twitter white-text mr-4 icon-pointer"> </i> */}
              </a>

              <a
                href="#!"
                className="gplus-ic padding-icon icon-hover"
                id="google-plus"
              >
                {/* <i className="fab fa-google-plus-g white-text mr-4 icon-pointer"></i> */}
              </a>

              <a
                href="#!"
                className="li-ic  padding-icon icon-hover"
                id="linkedin"
              >
                {/* <i className="fab fa-linkedin-in white-text mr-4 icon-pointer"> </i> */}
              </a>

              <a
                href="#!"
                className="ins-ic padding-icon icon-hover"
                id="instagram"
              >
                {/* <i className="fab fa-instagram white-text icon-pointer"> </i> */}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div
        className="container"
        style={{
          backgroundColor: "#020217",
          maxWidth: "100%",
          paddingTop: "30px",
        }}
      >
        <div className="row white-text">
          <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4 ">
            <h6 className=" font-weight-bold">TryNcartSeller</h6>
            <hr
              className="color accent-2 mb-4 mt-0 d-inline-block mx-auto"
              style={{ width: "60px" }}
            />
            <p>
              E-commerce is revolutionizing the way we all shop in India. Why do
              you want to hop from one store to another in search of the
              Products when you can find it on the Internet in a single click?
            </p>
          </div>

          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4 white-anchor">
            <h6 className="text-uppercase font-weight-bold">Products</h6>
            <hr
              className="color accent-2 mb-4 mt-0 d-inline-block mx-auto"
              style={{ width: "60px" }}
            />
            <p>
              <a href="#!">Terms of use</a>
            </p>
            <p>
              <a href="#!">Fulfilment Service</a>
            </p>
            <p>
              <a href="#!">Seller Learning Center</a>
            </p>
            <p>
              <a href="#!">FAQ</a>
            </p>
          </div>

          <div className=" col-md-3 col-lg-2 col-xl-2 mx-auto mb-4 white-anchor">
            <h6 className="text-uppercase font-weight-bold">Useful links</h6>
            <hr
              className=" color accent-2 mb-4 mt-0 d-inline-block mx-auto"
              style={{ width: "60px" }}
            />
            {sellerDetails && sellerDetails._id && (
              <p>
                <Link to={"/seller/dashboard/profile/" + sellerDetails._id}>
                  Your Account
                </Link>
              </p>
            )}
            <p>
              <a
                href="https://trynkart.vercel.app/"
                target="_blank"
                rel="noreferrer"
              >
                TryNkart
              </a>
            </p>
            <p>
              <a href="#!">Shipping Rates</a>
            </p>
            <p>
              <Link to="/contact">Help</Link>
            </p>
          </div>

          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0">
            <h6 className="text-uppercase font-weight-bold">Contact</h6>
            <hr
              className="color accent-2 mb-4 mt-0 d-inline-block mx-auto"
              style={{ width: "60px" }}
            />
            <p>
              <i className="fa fa-home mr-3"></i> New Delhi, 24012, IND
            </p>
            <p>
              <i className="fa fa-envelope mr-3"></i> info@tryncart.com
            </p>
            <p>
              <i className="fa fa-phone mr-3"></i> + 01 234 567 88
            </p>
            <p>
              <i className="fa fa-print mr-3"></i> + 01 234 567 89
            </p>
          </div>
        </div>
      </div>

      <div
        className="footer-copyright text-center py-3 white-text white-anchor"
        style={{ backgroundColor: "#020217" }}
      >
        <hr
          style={{
            width: "70%",
            borderTop: "1px solid #126e82",
            marginBottom: "20px",
          }}
        />
        © 2022 Copyright:
        <a href="/"> TryNcart.com</a>
      </div>
    </footer>
  );
}
export default Footer;

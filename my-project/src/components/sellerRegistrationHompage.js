import React, { useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function SellerHomepage() {
  const sellerlogin = useSelector((state) => state.sellerSignUp);
  const { sellerDetails } = sellerlogin;
  const [mobileno, setmobileno] = useState("");
  const history = useHistory();

  useLayoutEffect(() => {
    if (sellerDetails && sellerDetails.token) {
      history.push("/");
    }
  }, [history, sellerDetails]);
  // for mobile phones
  function submitHandler(e) {
    e.preventDefault();
    history.push({
      pathname: "/seller/registration",
      mobileno,
    });
  }
  return (
    <div>
      <div className="seller-top-container">
        <div className="seller-img">
          <img
            // src="https://img1a.flixcart.com/fk-sp-static/images/WP-banner-1-01-(1).png"
            src={process.env.PUBLIC_URL + "/banner.jpg"}
            alt="banner"
          />
        </div>
        {!(sellerDetails && sellerDetails.token) && (
          <div className="no-registration-container">
            <div className="seller-register-heading">
              <h4>Register to Sell Online</h4>
            </div>
            <div className=" no-register-div">
              <form
                onSubmit={submitHandler}
                className="seller-register-form my-2 my-lg-0"
              >
                <input
                  // mr-sm-2
                  type="tel"
                  pattern="^\d{10}"
                  className="form-control seller-no-input "
                  placeholder="Enter 10 digit mobile no."
                  aria-label="Search"
                  value={mobileno}
                  onChange={(e) => setmobileno(e.target.value)}
                />

                <button
                  className="btn btn-warning seller-no-input my-2 my-sm-0"
                  type="submit"
                >
                  Register now
                </button>
              </form>
            </div>
          </div>
        )}

        {/* <div className="seller-no-input">
            <input
              className="form-control "
              type="phoneno"
              name=""
              value=""
              autoComplete="off"
              placeholder="Enter your no."
            />

            <button className="btn btn-success" type="button" name="button">
              Register now
            </button>
          </div> */}
      </div>
      <div className="seller-heading">
        <h3>WHY SELL ONLINE </h3>
      </div>

      <div className="seller-flex-container">
        <div className="heding1 borders">
          <div className="container-no">➊</div>
          <h4 style={{ color: "#404040" }} className="align-centre">
            Growth in the online retail market
          </h4>
          <div className="grey">
            <hr />
            <p>
              Witnessing tremendous growth for the past 5 years, retailers are
              moving towards online selling.
            </p>
            <ul>&#8227; Avoid huge investments.</ul>
            <ul>&#8227; Large customer base to sell anywhere.</ul>
          </div>
        </div>
        <div className="heding1 borders">
          <div className="container-no">➋</div>
          <h4 style={{ color: "#404040" }} className="align-centre">
            Get orders across India
          </h4>
          <div className="sheading3 grey">
            <hr />
            <p>
              Receive orders from every part of the country and follow the
              simple steps to fulfill the orders.
            </p>

            <ol>
              <p>&#8227; Simple dashboard</p>

              <p>&#8227; Sale events, advertising and promotions </p>
            </ol>
          </div>
        </div>

        <div className="heding1 borders">
          <div className="container-no">➌</div>

          <h4 style={{ color: "#404040" }} className="align-centre">
            Ship with ease
          </h4>
          <div className="sheading3 grey">
            <hr />
            <p>
              Enjoy easy pick-up and delivery across India with our logistics
              partner.
            </p>

            <ol>
              <p>&#8227; Efficient pick-up network</p>

              <p>&#8227; Professional packaging support</p>
            </ol>
          </div>
        </div>
        <div className="heding1 borders">
          <div className="container-no">➍</div>

          <h4 style={{ color: "#404040" }} className="align-centre">
            Earn big
          </h4>
          <div className="sheading3 grey">
            <hr />
            <p>
              Our payments process is the fastest in the industry - get your
              payments in as little as 7 days of sales
            </p>

            <ol>&#8227; Fastest payment settlement </ol>
            <ol>&#8227; Detailed reports to track your payments</ol>
          </div>
        </div>
      </div>
      <div className="seller-heading">
        <h3>WHY SELL WITH US </h3>
      </div>
      <div className="seller-flex-container">
        <div className="heding1 borders">
          <div className="container-no">➊</div>
          <h4 style={{ color: "#404040" }} className="align-centre">
            Growth
          </h4>
          <div className="sheading3 grey">
            <hr />
            <p>
              Widen your reach to a customer base of 1 billion and grow your
              business further with the support of Account managers.
            </p>
          </div>
        </div>
        <div className="heding1 borders">
          <div className="container-no">➋</div>
          <h4 style={{ color: "#404040" }} className="align-centre">
            Lowest cost of doing business
          </h4>
          <div className="grey">
            <hr />
            <p>
              Along with the most competitive rate card in the industry you also
              get on-time and reliable payments.
            </p>
          </div>
        </div>

        <div className="heding1 borders">
          <div className="container-no">➌</div>
          <h4 style={{ color: "#404040" }} className="align-centre">
            Ease of doing business
          </h4>
          <div className="sheading3 grey">
            <hr />
            <p>
              You just need 1 product and 2 documents to start selling on us.
            </p>
          </div>
        </div>

        <div className="heding1 borders">
          <div className="container-no">➍</div>
          <h4 style={{ color: "#404040" }} className="align-centre">
            Tranparency
          </h4>
          <div className="sheading3 grey">
            <hr />
            <p>Equal opportunities for all the sellers to grow.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SellerHomepage;

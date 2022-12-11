import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { sellerUpdate } from "../actions/sellerDataActions";
import { states } from "./scroll";
function SellerAddressRegistration() {
  const Details = useSelector((state) => state.sellerSignUp);
  const { sellerDetails } = Details;
  const [details, setdetails] = useState({
    pincode: "",
    address: "",
    state: "",
    locality: "",
    city: "",
    district: "",
  });
  const Inputchange = (event) => {
    const { name, value } = event.target;
    setdetails({
      ...details,
      [name]: value,
    });
  };
  const history = useHistory();
  const dispatch = useDispatch();
  function clickHandler(e) {
    e.preventDefault();
    if (sellerDetails._id) {
      dispatch(sellerUpdate({ Address: details }, sellerDetails._id));
      history.push("/seller/registration/address/businessdetails");
    }
  }
  return (
    <div>
      <div className="container-fluid progress-bar-container">
        <div className="row justify-content-center">
          {/* <div className="col-11 col-sm-9 col-md-7 col-lg-6 col-xl-5 text-center p-0 mt-3 mb-2"> */}
          <div className="card1">
            <form id="msform">
              <ul id="progressbar">
                <li className="active" id="account">
                  <strong>Account</strong>
                </li>
                <li className="active" id="Address">
                  <strong>Address</strong>
                </li>
                <li id="GSTIN">
                  <strong>GSTIN</strong>
                </li>
                <li id="bank">
                  <strong>Bank Details</strong>
                </li>
              </ul>
            </form>
          </div>
        </div>
        {/* </div> */}
      </div>

      <div className="sellermain">
        <div className="sellerform">
          <div className="seller-account">Give your pick up address</div>
          <form onSubmit={clickHandler}>
            <div className="input-group mb-2 mr-sm-2">
              <input
                type="text"
                className="form-control"
                id="inputZip"
                placeholder="Enter you pincode"
                name="pincode"
                value={details.pincode}
                onChange={Inputchange}
                required
              />

              <div className="input-group-prepend">
                <button disabled className="input-group-text">
                  Verify
                </button>
              </div>
            </div>

            <div className="form-group" style={{ marginTop: "30px" }}>
              <label className="grey" htmlFor="Address">
                Enter you Address
              </label>
              <input
                type="text"
                className="form-control"
                id="inputAddress"
                placeholder="Enter Your Address"
                name="address"
                value={details.address}
                onChange={Inputchange}
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <select
                  id="inputState"
                  className="form-control"
                  name="state"
                  value={details.state}
                  onChange={Inputchange}
                  required
                >
                  <option value="">Select State</option>
                  {states.map((state) => (
                    <option value={state}>{state}</option>
                  ))}
                </select>
              </div>
              <div className="form-group col-md-6">
                <input
                  type="text"
                  className="form-control"
                  id="inputlocality"
                  placeholder="District"
                  name="district"
                  value={details.district}
                  onChange={Inputchange}
                  required
                />
              </div>
            </div>

            {/* <div className="form-group"> */}
            <div className="form-row">
              <div className="form-group col-md-6">
                <input
                  type="text"
                  className="form-control"
                  id="inputcity"
                  placeholder="City"
                  name="city"
                  value={details.city}
                  onChange={Inputchange}
                  required
                />
              </div>
              <div className="form-group col-md-6">
                <input
                  type="text"
                  className="form-control"
                  id="inputlocality"
                  placeholder="Locality"
                  name="locality"
                  value={details.locality}
                  onChange={Inputchange}
                  required
                />
              </div>
            </div>
            {/* </div> */}

            <button
              // onClick={(e) => clickHandler(e)}
              type="submit"
              className=" login-btn"
            >
              CONTINUE
            </button>
          </form>
        </div>
        <div className="sellerpoint">
          <div className="seller-registration-heading">
            <h4>
              Tell us from where you will ship your product to buyers all across
              india!
            </h4>
          </div>
          <div
            className="seller-registration-info "
            style={{ marginTop: "35px" }}
          >
            <h5>What are "Large Products"?</h5>
            <p>
              {" "}
              Bulky or heavy products like sofa,washing machine,refrigerators
              etc are called "Large product" Large products can be picked up
              from a limited set of pincodes.{" "}
            </p>
          </div>

          <div className="seller-registration-info-div">
            <hr style={{ backgroundColor: "white", width: "80%" }} />
            <div style={{ padding: "10px 0 5px" }}>
              <div>
                <h5>How will this information be used?</h5>
              </div>

              <div className="seller-registration-info">
                <p>
                  Your pick up Address helps us identify which logistics partner
                  can pick up your products
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SellerAddressRegistration;

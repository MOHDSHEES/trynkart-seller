import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { sellerUpdate } from "../actions/sellerDataActions";
import Axios from "axios";

function SellerGSTRegistration() {
  const Details = useSelector((state) => state.sellerSignUp);
  const { sellerDetails } = Details;
  const [radiocheck, setradiocheck] = useState("haveGSTIN");
  const [details, setdetails] = useState({
    gstin: "",
    signature: "",
  });
  const [sign, setsign] = useState("");
  const [uploading, setuploading] = useState(false);
  const [imgData, setImgData] = useState(null);

  // img handle
  const onChangePicture = async (e) => {
    if (e.target.files[0]) {
      // setPicture(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgData(reader.result);
      });
      setsign(e.target.files[0].name);
      reader.readAsDataURL(e.target.files[0]);
    }
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("image", file);

    try {
      setuploading(true);
      const { data } = await Axios.post("/api/uploads", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // setsign(data);

      setdetails({ ...details, signature: data });
      setuploading(false);
    } catch (error) {
      setuploading(false);
    }
  };

  const Inputchange = (event) => {
    const { name, value } = event.target;
    setdetails({
      ...details,
      [name]: value,
    });
  };
  const history = useHistory();
  const dispatch = useDispatch();
  // submit handler
  function clickHandler(e) {
    e.preventDefault();
    if (sellerDetails._id) {
      dispatch(sellerUpdate({ bank: details }, sellerDetails._id));
      history.push("/seller/registration/address/businessdetails/bankdetails");
    }
  }
  return (
    // <div className="seller-main-container">
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
                <li className="active" id="GSTIN">
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
          <div className="seller-account">Give your Business Details</div>
          <form onSubmit={clickHandler}>
            <div
              className="form-check seller-radio-btn grey"
              style={{ marginBottom: "20px" }}
            >
              <input
                className="form-check-input"
                type="radio"
                name="havegstin"
                id="flexRadio1"
                value="haveGSTIN"
                onChange={(e) => setradiocheck(e.target.value)}
                defaultChecked
              />
              <label className="form-check-label" htmlFor="flexRadio1">
                Have GSTIN
              </label>
            </div>
            <div className="input-group mb-2 mr-sm-2 ">
              <input
                type="text"
                className="form-control"
                id="seller-mobile-no"
                placeholder="Enter your GSTIN"
                name="gstin"
                value={details.gstin}
                onChange={Inputchange}
                disabled={radiocheck === "haveGSTIN" ? false : true}
                required
              />
              <div className="input-group-prepend">
                <button
                  disabled={radiocheck === "haveGSTIN" ? false : true}
                  className="input-group-text btn-focus-none"
                >
                  Verify
                </button>
              </div>
            </div>
            <div
              className="form-check seller-radio-btn grey"
              style={{ margin: "20px 0 5px" }}
            >
              <input
                className="form-check-input"
                type="radio"
                name="havegstin"
                id="flexRadio2"
                value="gstExempt"
                onChange={(e) => setradiocheck(e.target.value)}
              />
              <label className="form-check-label" htmlFor="flexRadio2">
                Only sell in GSTIN exempt categories ( i.e books)
              </label>
            </div>
            <div className="form-check seller-radio-btn grey">
              <input
                className="form-check-input"
                type="radio"
                name="havegstin"
                id="flexRadio3"
                value="willApply"
                // onChange={Inputchange}
                onChange={(e) => setradiocheck(e.target.value)}
              />
              <label className="form-check-label" htmlFor="flexRadio3">
                Applied/will apply for a GSTIN
              </label>
            </div>
            <div className="seller-signature">
              <p>Upload Signature</p>
            </div>
            <div>
              {/* <div className="container"> */}
              <div className="input-group">
                <div className="custom-file grey">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="FileInput"
                    aria-describedby="FileInput"
                    accept=".jpg,.jpeg,png,gif,tiff"
                    name="signature"
                    // onChange={Inputchange}
                    onChange={onChangePicture}
                    required
                  />
                  <label className="custom-file-label " htmlFor="FileInput">
                    {sign ? sign.slice(0, 25) + "..." : "Select File"}
                  </label>
                </div>
                <div className="input-group-append">
                  <button className="btn btn-primary" type="button" id="File">
                    Upload
                  </button>
                </div>
                {/* </div> */}
              </div>
              <div className="signature-preview borders">
                <img
                  // src="http://localhost:3000/sign.jpg "
                  src={imgData}
                  className="img-fluid"
                  alt=""
                />
                {!details.signature && (
                  <div className="signature-file-text grey">
                    No file choosen...
                  </div>
                )}
              </div>
            </div>

            <button
              //   onClick={(e) => clickHandler(e)}
              type="submit"
              className=" login-btn"
              disabled={uploading}
            >
              Continue
            </button>
          </form>
        </div>
        {/* left div */}
        <div className="sellerpoint">
          <div className="seller-registration-heading">
            <h4>
              Sell to crores of customers on TryNcart, right from your doorstep!
            </h4>
          </div>

          <div className="seller-registration-info-div">
            <div style={{ padding: "10px 0 5px" }}>
              <div style={{ paddingBottom: "10px" }}>
                <h5>How do I update my business details?</h5>
              </div>

              <div className="seller-registration-info">
                <p>
                  Your business details are directly fetched from your GSTIN. To
                  change them go to Government portal and update your
                  information on your GSTIN.
                </p>
              </div>
            </div>
            <hr style={{ backgroundColor: "white", width: "80%" }} />
            <div style={{ padding: "10px 0 5px" }}>
              <div style={{ paddingBottom: "10px" }}>
                <h5>Can I create a seller account with Composite GSTIN?</h5>
              </div>

              <div className="seller-registration-info">
                <p>
                  As per Government regulations, sellers with a composite GSTIN
                  cannot sell on ecommerse platforms. Youcan apply for regular
                  GSTIN directly from Government portal.
                </p>
              </div>
            </div>
            <hr style={{ backgroundColor: "white", width: "80%" }} />
            <div style={{ padding: "10px 0 5px" }}>
              <div style={{ paddingBottom: "10px" }}>
                <h5>Where will this Information will be used?</h5>
              </div>

              <div className="seller-registration-info">
                <p>
                  Your GSTIN and signature will be used to issue invoices to the
                  buyer.
                </p>
              </div>
            </div>
            {/* <hr style={{ backgroundColor: "white", width: "80%" }} /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
export default SellerGSTRegistration;

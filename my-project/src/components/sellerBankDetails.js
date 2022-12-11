import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { sellerUpdate } from "../actions/sellerDataActions";
import Axios from "axios";

function SellerBankDetails() {
  const Details = useSelector((state) => state.sellerSignUp);
  const { sellerDetails } = Details;
  const [details, setdetails] = useState({
    ifsc: "",
    accountNo: "",
    name: "",
    cheque: "",
  });
  const [uploading, setuploading] = useState(false);
  const [imgData, setImgData] = useState(null);
  const [chequePath, setchequePath] = useState("");
  const onChangePicture = async (e) => {
    if (e.target.files[0]) {
      // setPicture(e.target.files[0]);
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImgData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
    setchequePath(e.target.files[0].name);
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

      setdetails({ ...details, cheque: data });
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
  function clickHandler(e) {
    e.preventDefault();
    // console.log(details);
    if (sellerDetails._id) {
      dispatch(sellerUpdate({ business: details }, sellerDetails._id));
      history.push("/seller/dashboard");
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
                <li className="active" id="GSTIN">
                  <strong>GSTIN</strong>
                </li>
                <li className="active" id="bank">
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
          <div className="seller-account">Give your Bank Details</div>
          <form onSubmit={clickHandler}>
            <div className="input-group mb-2 mr-sm-2">
              <input
                type="text"
                className="form-control"
                id="seller-IFSC"
                placeholder="IFCS"
                name="ifsc"
                value={details.ifsc}
                onChange={Inputchange}
                autoComplete="off"
                required
              />
              <div className="input-group-prepend">
                <button className="input-group-text btn-focus-none">
                  Verify
                </button>
              </div>
            </div>

            <div className="form-group bank-form">
              <label className="grey" htmlFor="account-no">
                Account No.
              </label>
              <input
                type="text"
                placeholder="Enter Your Account no."
                className="form-control"
                id="account-no"
                name="accountNo"
                value={details.accountNo}
                onChange={Inputchange}
                autoComplete="off"
                required
              />
            </div>

            <div className="form-group ">
              <label className="grey" htmlFor="account-name">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter Account holder's Name"
                className="form-control"
                id="account-name"
                name="name"
                value={details.name}
                onChange={Inputchange}
                required
              />
            </div>
            <div style={{ marginTop: "30px" }} className="seller-signature">
              <p>Upload Cancelled Cheque</p>
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
                    name="cheque"
                    // onChange={Inputchange}
                    onChange={onChangePicture}
                    required
                  />
                  <label className="custom-file-label " htmlFor="FileInput">
                    {chequePath
                      ? chequePath.slice(0, 25) + "..."
                      : "Select File"}
                  </label>
                </div>
                <div className="input-group-append">
                  <button
                    className="btn btn-primary"
                    type="button"
                    id="FileInput"
                  >
                    Upload
                  </button>
                </div>
                {/* </div> */}
              </div>
              <div className="signature-preview borders">
                <img
                  src={imgData ? imgData : "https://bit.ly/3xQpfcP"}
                  className="img-fluid"
                  accept=".jpg,.jpeg,png,gif,tiff"
                  alt=""
                />
                {!imgData && (
                  <div className="signature-file-text grey">
                    No file choosen...
                  </div>
                )}
              </div>
            </div>

            <button
              // onClick={(e) => clickHandler(e)}
              type="submit"
              className=" login-btn"
              disabled={uploading}
            >
              Submit
            </button>
          </form>
        </div>
        {/* left div */}
        <div className="sellerpoint">
          <div className="seller-registration-heading">
            <h4>
              Get a share of thousands of crores of rupees paid every week!
            </h4>
          </div>
          <div className="seller-registration-info-div">
            <hr style={{ backgroundColor: "white", width: "80%" }} />
            <div style={{ padding: "40px 0 5px" }}>
              <div style={{ paddingBottom: "10px" }}>
                <h5>
                  What if I don't have a cancelled cheque with my registered
                  name printed on it?
                </h5>
              </div>

              <div className="seller-registration-info">
                <p>
                  A cancelled cheque with your registered business name printed
                  on it is mandatory to sell on TryNcart. Please ask your bank
                  to issue a pesonalised cheque book with yourregistered
                  business name printed on it.
                </p>
              </div>
            </div>
            {/* <hr style={{ backgroundColor: "white", width: "80%" }} /> */}
          </div>

          <div className="seller-registration-info-div">
            <hr style={{ backgroundColor: "white", width: "80%" }} />
            <div style={{ padding: "40px 0 5px" }}>
              <div style={{ paddingBottom: "10px" }}>
                <h5>How will this information be used?</h5>
              </div>

              <div className="seller-registration-info">
                <p>
                  Your Bank account details will be used to make payments to
                  you.
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

export default SellerBankDetails;

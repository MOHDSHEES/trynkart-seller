import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { sellerSignup } from "../actions/sellerDataActions";
import Axios from "axios";
import OtpInput from "react-otp-input";

function SellerRegistration() {
  const mobileRef = useRef();
  // boolean hook (true if signUp btn is disabled)
  const [disable, setdisable] = useState(true);
  // hook for storing Entered OTP
  const [OTP, setOTP] = useState("");
  // boolean hook (true if OTP entered is not matched with OTP generated)
  const [OTPMismatch, setOTPMismatch] = useState(false);
  // boolean hook (true if email is verified)
  const [isVerified, setisVerified] = useState(false);
  // hook for storing boolean value if verify btn is pressed (to run counter)
  const [isActive, setisActive] = useState(false);
  // otp timer and resend
  const [RemainingTime, setRemainingTime] = useState(30);
  // hook for storing generated OTP
  const [OTPgenerated, setOTPgenerated] = useState("");
  // hook for showing loading while sending OTP
  const [loading, setloading] = useState(false);
  // hook for sendgrid response
  const [Response, setResponse] = useState();
  // hook for storing error from sendgrid api
  const [Error, setError] = useState();

  function mobileInput(e) {
    setisActive(false);
    setError("");
    setOTPMismatch(false);
    setdisable(true);
    setResponse("");
    setisVerified(false);
    setdetails({
      ...details,
      mobileno: e.target.value.replace(/ /g, "").slice(-10),
    });

    // }
    // emailRef.current.classList.remove("form-control");
    mobileRef.current.classList.remove("is-invalid");
  }

  async function sendOtp(x) {
    if (x === 200) {
      setloading(true);
      try {
        const { data } = await Axios.post("/api/payment/send/otp", {
          mobile: details.mobileno,
          otp: OTP,
        });
        setloading(false);
        setResponse(data);
        // Activating counter if success
        if (data && data.success) {
          setisActive(true);
        }
      } catch (error) {
        setResponse("");
        setloading(false);
        setError(error.response.data.message);
      }
    }
  }

  async function verify() {
    setError("");
    setResponse("");
    // email validating

    // generating OTP
    const OTP = Math.floor(Math.random() * 900000 + 100000);
    setOTPgenerated(OTP);
    // setloading(true);
    // sending OTP

    Validate().then((x) => {
      sendOtp(x);
    });
    // if (validno) {
    //   setloading(true);
    //   try {
    //     const { data } = await Axios.post("/api/payment/send/otp", {
    //       mobile: details.mobileno,
    //       otp: OTP,
    //     });
    //     setloading(false);
    //     setResponse(data);
    //     // Activating counter if success
    //     if (data && data.success) {
    //       setisActive(true);
    //     }
    //   } catch (error) {
    //     setResponse("");
    //     setloading(false);
    //     setError(error.response.data.message);
    //   }
    // }

    // setResponse("");
    // mobileRef.current.classList.add("is-invalid");
  }

  // validating email entered and dispatching otp

  // verifying OTP entered
  useEffect(() => {
    if (OTP) {
      if (Number(OTP) === OTPgenerated) {
        setOTPMismatch(false);
        mobileRef.current.classList.add("form-control");
        mobileRef.current.classList.add("is-valid");
        setisVerified(true);
        setdisable(false);
        setOTPgenerated("");
        setOTP("");
        setisActive(false);
      } else if (OTP.length === 6 && Number(OTP) !== OTPgenerated) {
        setisVerified(false);
        setOTPMismatch(true);
      }
    }
  }, [OTP, OTPgenerated]);
  useEffect(() => {
    if (RemainingTime !== 0 && isActive) {
      var timer = setTimeout(() => {
        setRemainingTime(RemainingTime - 1);
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [RemainingTime, isActive]);

  function resend() {
    setRemainingTime(30);
    setOTP("");
    setOTPMismatch(false);
    verify();
  }
  const location = useLocation();

  // const userDetail = useSelector((state) => state.sellerSignUp);
  // const { sellerDetails } = userDetail;

  const [details, setdetails] = useState({
    mobileno: location.mobileno || "",
    email: "",
    name: "",
    password: "",
  });
  const Inputchange = (event) => {
    const { name, value } = event.target;

    setdetails({
      ...details,
      [name]: value,
    });
  };
  const dispatch = useDispatch();
  const history = useHistory();
  function clickHandler(e) {
    e.preventDefault();
    dispatch(sellerSignup(details));
    history.push("/seller/registration/address");
  }

  // validating mobile no

  const [lengtherror, setlengtherror] = useState(
    "error,please try again later"
  );
  async function Validate(e) {
    setdisable(true);
    let value = details.mobileno;
    const doc = mobileRef.current.classList;
    if (value === "") doc.remove("form-control");
    else doc.add("form-control");
    // const validat = async () => {
    if (value.length !== 10) {
      doc.add("is-invalid");
      setdisable(true);
      setlengtherror("Enter 10 digit mobile no.");
      return 500;
    } else if (isNaN(value)) {
      doc.add("is-invalid");
      setdisable(true);
      setlengtherror("Enter valid 10 digit mobile no.");
      return 500;
    } else {
      const data = await Axios.post("/api/user/signup/validate", {
        data: { mobileno: value },
      });

      if (data.data === 200) {
        setdisable(false);
        doc.remove("is-invalid");
        doc.add("is-valid");
      } else if (data.data === 500) {
        setdisable(true);
        doc.add("is-invalid");
        setlengtherror(" Mobile no. already registered");
      }
      return data.data;
    }
    // };

    // validat()
    // return data.data;
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
                <li id="Address">
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
          <div className="seller-account">Create Your Seller Account</div>
          <form onSubmit={clickHandler}>
            <div className="user-validation">
              {/* <form
                  // className=" needs-validation"
                  // className="modalcontent animate"
                  onClick={(e) => verify(e)}
                > */}
              <div className="form-group">
                <label htmlFor="email">
                  Mobile No.<span className="estrix"> *</span>{" "}
                  {/* {isVerified && (
                        <small style={{ color: "green", marginLeft: "3px" }}>
                          <i class="fas fa-check-circle"></i>{" "}
                        </small>
                      )} */}
                </label>
                {/* <div className="input-group mb-2 mr-sm-2"> */}
                {/* <form
                  // className=" needs-validation"
                  // className="modalcontent animate"
                  onClick={(e) => verify(e)}
                > */}
                {/* <div className="user-validation"> */}
                <input
                  className="form-control form-control1"
                  type="tel"
                  pattern="^\d{10}"
                  id="seller-mobile-no"
                  placeholder="Enter 10 digit mobile no."
                  name="mobileno"
                  value={details.mobileno}
                  // onChange={Inputchange}
                  onChange={(e) => mobileInput(e)}
                  title="Format 9988776655"
                  ref={mobileRef}
                  autoComplete="off"
                  // onChange={(e) => setemail(e.target.value)}

                  required
                />
                <div className=" invalid-feedback">{lengtherror}</div>

                {Response && Response.success ? (
                  <small style={{ color: "green" }}>
                    {!isVerified && Response.message}
                  </small>
                ) : (
                  Response && (
                    <small style={{ color: "red" }}>{Response.message}</small>
                  )
                )}

                {Error && <small style={{ color: "red" }}>{Error}</small>}
                {/* </div> */}
                <div>
                  {!isVerified && !isActive && (
                    <button
                      disabled={isActive && loading}
                      id="verify-btn"
                      type="button"
                      style={{ marginTop: "10px" }}
                      onClick={verify}
                      className="input-group-text"
                    >
                      {loading ? "Sending..." : "Send OTP"}
                    </button>
                  )}
                  {isActive && (
                    <div>
                      {/* <Otp isActive={isActive} /> */}

                      {OTPMismatch && (
                        <div style={{ textAlign: "center" }}>
                          <small style={{ color: "red" }}>
                            "Incorrect OTP"
                          </small>
                        </div>
                      )}

                      <OtpInput
                        value={OTP}
                        className="otp-input"
                        onChange={setOTP}
                        numInputs={6}
                        hasErrored={OTPMismatch ? true : false}
                        errorStyle={{
                          border: "1px solid red",
                          borderRadius: "5px",
                        }}
                        isInputNum={true}
                        inputStyle={{ width: "30px" }}
                        containerStyle={{ justifyContent: "center" }}
                        // separator={<span>-</span>}
                      />

                      {RemainingTime !== 0 ? (
                        <small>Resend OTP in {RemainingTime} Sec </small>
                      ) : (
                        // <div className="form-row">
                        //   <div className="form-group col-md-2">
                        <button
                          style={{ marginTop: "10px" }}
                          id="verify-btn"
                          onClick={resend}
                          className="input-group-text"
                        >
                          Resend
                        </button>
                        //   </div>
                        // </div>
                      )}
                    </div>
                  )}
                </div>
                {/* </form> */}
                {/* </div> */}
              </div>
              {/* </form> */}
            </div>
            {/* <div className="input-group mb-2 mr-sm-2">
              <input
                type="tel"
                pattern="^\d{10}"
                className="form-control"
                id="seller-mobile-no"
                placeholder="Enter 10 digit mobile no."
                name="mobileno"
                value={details.mobileno}
                onChange={Inputchange}
                title="Format 9988776655"
                autoComplete="off"
                required
              />
              <div className="input-group-prepend">
                {!isVerified && !isActive && (
                  <button
                    onClick={verify}
                    className="input-group-text btn-focus-none"
                  >
                    Send OTP
                  </button>
                )}
              </div>
            </div> */}

            <div className="form-group">
              <label className="grey" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your Email"
                className="form-control"
                id="seller-email"
                name="email"
                value={details.email}
                onChange={Inputchange}
                required
              />
            </div>

            <div className="form-group ">
              <label className="grey" htmlFor="name">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your full Name"
                className="form-control"
                id="name"
                name="name"
                value={details.name}
                onChange={Inputchange}
                required
              />
            </div>
            <div className="form-group ">
              <label className="grey" htmlFor="password">
                Set Password
              </label>
              <input
                type="password"
                placeholder="Set Password"
                className="form-control"
                id="password"
                name="password"
                value={details.password}
                onChange={Inputchange}
                required
              />
            </div>

            <button
              disabled={disable}
              //   onClick={(e) => clickHandler(e)}
              type="submit"
              className=" login-btn"
            >
              Sign Up
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
          <div className="seller-registration-info">
            <p>All you need to sell is -</p>
          </div>
          <div className="iconseller">
            <div className="seller-icon">
              <div className="seller-file-icon">
                <i className="fa fa-file-text" aria-hidden="true"></i>
              </div>
              <h6>GSTIN*</h6>
            </div>

            <div className="seller-icon">
              <div className="seller-file-icon">
                {/* <i className="fa fa-money-check-alt"></i> */}
                <span id="bank" />
              </div>
              <h6>Bank Account</h6>
            </div>
            <div className="seller-icon">
              <div className="seller-file-icon">
                <span id="bag" />
              </div>
              <h6>Product To Sell</h6>
            </div>
          </div>
          <div className="seller-registration-info-div">
            <hr style={{ backgroundColor: "white", width: "80%" }} />
            <div style={{ padding: "10px 0 5px" }}>
              <div style={{ paddingBottom: "10px" }}>
                <h5>How will this information be used?</h5>
              </div>

              <div className="seller-registration-info">
                <p>
                  You can use your email address or mobile number as 'Username'
                  to login to your TryNcart Seller Account.
                </p>
                <p>
                  Please note, the 'Username' and 'Password' used here are only
                  to access your TryNcart Seller Account and can’t be used on
                  TryNcart.com shopping destination.
                </p>
              </div>
            </div>
            {/* <hr style={{ backgroundColor: "white", width: "80%" }} /> */}
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
}
export default SellerRegistration;

import React, { useState } from "react";

import {
  useDispatch,
  useSelector,
  // , useSelector
} from "react-redux";

import { sellersignin } from "../actions/sellerDataActions";

function SellerLogin() {
  const sellerlogin = useSelector((state) => state.sellerSignUp);
  const { sellerDetails, error } = sellerlogin;

  const [mobileno, setmobileno] = useState("");
  const [Password, setPassword] = useState("");
  const dispatch = useDispatch();
  // console.log(sellerDetails, error);

  function onclick() {
    // console.log("onClick");

    document.getElementById("error").classList.add("login-error-hide");
    window.$("#sellerloginModal").modal("hide");

    // document.getElementById("id01").style.display = "none";
    document.getElementById("seller-login-form").reset();
  }

  //   login handle

  function loginHandle(e) {
    e.preventDefault();
    dispatch(sellersignin(mobileno, Password));
    // if (sellerDetails && !sellerDetails === [])
    if (sellerDetails && sellerDetails.length > 0) {
      onclick();
    }
  }

  // const counter = useSelector(state=> state.islogged);
  // const dispatch= useDispatch();

  // const [open, setOpen] = useState("false");
  // function onclick(){
  //
  //   document.getElementById('id01').style.display='none';
  //   setOpen("true")
  // };

  return (
    <div
      style={{ overflow: "auto" }}
      className="modal fade"
      id="sellerloginModal"
      role="dialog"
      aria-hidden="true"
    >
      {/* <div id="id01" className="mod"> */}
      <div className="modal-dialog  modal-dialog-centered" role="document">
        <div className="modal-content">
          <form
            id="seller-login-form"
            // className="modalcontent animate"
            // action="/action_page.php"
            onSubmit={loginHandle}
          >
            <div className="imgcontainer">
              <img
                // src="http://localhost:3000/login.png"
                src={process.env.PUBLIC_URL + "/login.png"}
                alt="Avatar"
                className="avatar"
              />
              <span
                onClick={onclick}
                className="loginclose"
                data-dismiss="modal"
                title="Close"
              >
                &times;
              </span>
            </div>
            {error ? (
              <div
                style={{ paddingBottom: "0" }}
                id="error"
                className="login-container login-error "
              >
                <p>{error.msg}</p>
              </div>
            ) : (
              <div
                id="error"
                className="login-container login-error login-error-hide "
              ></div>
            )}
            <div className="login-container">
              <label htmlFor="uname" className="form-label">
                <b>
                  Mobile No.<span className="estrix"> *</span>
                </b>
              </label>
              <input
                className="login-input"
                type="tel"
                pattern="^\d{10}"
                onChange={(e) => setmobileno(e.target.value)}
                placeholder="Enter 10 digit mobile no."
                name="mobileno"
                autoComplete="off"
                required
              />

              <label htmlFor="psw" className="form-label">
                <b>
                  Password<span className="estrix"> *</span>
                </b>
              </label>
              <input
                className="login-input"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                name="psw"
                required
              />

              <button className="login-btn" type="submit">
                {" "}
                Login
              </button>
              <label>
                <input
                  type="checkbox"
                  defaultChecked="checked"
                  name="remember"
                />{" "}
                Remember me
              </label>
            </div>
            <div className="container" style={{ backgroundColor: "#f1f1f1" }}>
              <button
                type="button"
                onClick={onclick}
                className="login-btn cancelbtn "
                data-dismiss="modal"
              >
                Cancel
              </button>

              <span className="psw">
                Forgot{" "}
                <span
                  style={{ color: "blue", cursor: "pointer" }}
                  data-toggle="modal"
                  data-target="#ForgetPassModalSeller"
                  onClick={onclick}
                >
                  password?
                </span>
                <br />
                {/* <span className="SignUp">
                  Don't have an account{" "}
                  <p
                    style={{ color: "blue" }}
                    data-toggle="modal"
                    data-target="#signupModal"
                    onClick={onclick}
                  >
                    SignUp
                  </p>
                </span> */}
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SellerLogin;

import React, { useState } from "react";
import Axios from "axios";

function ForgetPasswordSeller() {
  const [email, setemail] = useState("");
  const [mobileNo, setmobileNo] = useState("");
  const [Response, setResponse] = useState("");
  const [Error, setError] = useState();
  const [loading, setloading] = useState(false);

  function clearFields() {
    setemail("");
    setmobileNo("");
    setError(false);
    setloading(false);
  }
  function onclick() {
    clearFields();
    setResponse("");
    document.getElementById("error").classList.add("login-error-hide");
    window.$("#ForgetPassModalSeller").modal("hide");
    // document.getElementById("id01").style.display = "none";
    document.getElementById("ForgetPass-formSeller").reset();
  }
  // console.log(window.location.href.split("/")[3]);

  async function submitHandler(e) {
    e.preventDefault();
    try {
      setloading(true);
      const response = await Axios.post("/api/forgetPassword/seller", {
        email: email,
        mobileNo: mobileNo,
      });
      setloading(false);
      setResponse(response);
      //   console.log(response);
      clearFields();
      setError(false);
    } catch (error) {
      //   console.log(error.response.data.message);
      setError(error.response.data.message);
      setResponse(null);
      setloading(false);
      //   console.log("Incorrect Mobile No. or Email");
    }
  }
  return (
    <div>
      <div
        style={{ overflow: "auto" }}
        className="modal fade"
        id="ForgetPassModalSeller"
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
      >
        {/* <div id="id02" className="mod"> */}
        <div className="modal-dialog  modal-dialog-centered" role="document">
          <div className="modal-content">
            <form
              id="ForgetPass-formSeller"
              className=" needs-validation"
              // className="modalcontent animate"
              onSubmit={submitHandler}
            >
              <div className="imgcontainer">
                <span
                  onClick={onclick}
                  className="loginclose"
                  data-dismiss="modal"
                  title="Close"
                >
                  &times;
                </span>
                <h1>Recover</h1>
                <p style={{ textAlign: "left", padding: "20px 0 0 18px" }}>
                  Fill all the fields to get Password
                </p>
                <hr />
              </div>
              {/* {error ? ( */}
              {Error ? (
                <div
                  style={{ paddingBottom: "0" }}
                  id="error"
                  className="login-container login-error "
                >
                  <p>{Error}</p>
                </div>
              ) : (
                <div
                  id="error"
                  className="login-container login-error login-error-hide "
                ></div>
              )}
              {Response ? (
                <div
                  style={{ paddingBottom: "0" }}
                  id="error"
                  className="login-container login-error "
                >
                  {Response.data.success ? (
                    <p style={{ color: "green" }}>{Response.data.message}</p>
                  ) : (
                    <p style={{ color: "red" }}>{Response.data.message}</p>
                  )}
                </div>
              ) : (
                <div
                  id="error"
                  className="login-container login-error login-error-hide "
                ></div>
              )}
              {/* // ) : (
        //   <div className="login-container login-error login-error-hide"></div>
        // )} */}

              <div className="login-container">
                <div>
                  <label htmlFor="email" className="form-label">
                    <b>
                      Email<span className="estrix"> *</span>
                    </b>
                  </label>
                  <input
                    className="login-input"
                    type="Email"
                    placeholder="Enter registered Email"
                    name="uname"
                    autoComplete="off"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    // onChange={(e)=>Validate(e,"email")}
                    required
                  />
                </div>
                <label htmlFor="psw" className="form-label">
                  <b>
                    Mobile No.<span className="estrix"> *</span>
                  </b>
                </label>
                <input
                  type="tel"
                  pattern="^\d{10}"
                  className="login-input"
                  placeholder="Enter registered mobile No."
                  name="mobileno"
                  value={mobileNo}
                  onChange={(e) => setmobileNo(e.target.value)}
                  //   onChange={Inputchange}
                  title="Format 9988776655"
                  autoComplete="off"
                  required
                />

                <button
                  //   disabled={disable}
                  className="login-btn"
                  type="submit"
                >
                  {loading ? "Sending..." : "Submit"}
                </button>
              </div>

              <div className="signup-container">
                <button
                  type="button"
                  onClick={onclick}
                  className="login-btn cancelbtn "
                  data-dismiss="modal"
                >
                  Cancel
                </button>

                <span className="SignUp">
                  Already have Details -
                  <p
                    style={{ color: "blue" }}
                    data-toggle="modal"
                    data-target="#sellerloginModal"
                    onClick={onclick}
                  >
                    SignIn
                  </p>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgetPasswordSeller;

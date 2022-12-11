import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { sellerUpdate } from "../../actions/sellerDataActions";

function Editpassword(props) {
  const [edit, setedit] = useState("Edit Password");
  const form = useRef();
  //   hook to store previous password entered
  const [password, setpassword] = useState("");
  //   hook to store new password entered
  const [newPassword, setnewPassword] = useState("");
  //   hook to store  confirmpassword entered
  const [confirmPassword, setconfirmPassword] = useState("");
  const [passVisible, setpassVisible] = useState(false);
  function tooglehandle(props) {
    // toggle field
    // let field = document.getElementById(props);
    const field = form.current;
    field.disabled ? (field.disabled = false) : (field.disabled = true);
    // field.disabled ? setedit("Edit Password") : setedit("Cancel");
    if (field.disabled) {
      setedit("Edit Password");
      cancelbtn();
    } else {
      setedit("Cancel");
    }
  }

  const dispatch = useDispatch();
  function submitHandler(e) {
    e.preventDefault();
    var er = document.getElementById("seller-password-error");
    if (confirmPassword === newPassword) {
      if (password === props.password) {
        dispatch(sellerUpdate({ password: newPassword }, props.id));
        document.getElementById("profile-password-fieldset").disabled = true;
        setedit("Edit Password");
      } else {
        er.classList.remove("login-error-hide");
        er.innerHTML = "Incorrect Previous Password";
      }
    } else {
      er.classList.remove("login-error-hide");
      er.innerHTML = "Password Mismatch";
    }
  }

  function cancelbtn() {
    var er = document.getElementById("seller-password-error");
    er.classList.add("login-error-hide");
    setedit("Edit Password");
    setpassword("");
    setconfirmPassword("");
    setnewPassword("");
  }

  function onclick() {
    document.getElementById("error").classList.add("login-error-hide");
    window.$("#sellerloginModal").modal("hide");
    // document.getElementById("seller-login-form").reset();
    document.getElementById("ForgetPass-formSeller").reset();
  }
  return (
    <div
      className="seller-profile-edit-close animation slideIn"
      id="seller-profile-password"
    >
      <div className="row mt-2">
        <div className="col-md-12">
          {/* <hr className="editprofilehr" /> */}
          <h5 className="mt-3">
            Password{" "}
            <span
              onClick={() => tooglehandle("profile-password-fieldset")}
              className="profile-edit"
            >
              {edit}
              {/* Edit Password */}
            </span>
            {form.current && !form.current.disabled && (
              <span
                className="profile-edit eye-btn"
                onClick={() => setpassVisible(!passVisible)}
              >
                {passVisible ? (
                  <i class="fa fa-eye-slash" aria-hidden="true"></i>
                ) : (
                  <i class="fa fa-eye"></i>
                )}
              </span>
            )}
          </h5>

          <form
            onSubmit={submitHandler}
            id="profile-password-form"
            className="borders shadow  mb-2"
            style={{ padding: "5px 15px" }}
          >
            <fieldset ref={form} id="profile-password-fieldset" disabled>
              <div
                style={{ paddingBottom: "0" }}
                id="seller-password-error"
                className="login-container login-error login-error-hide "
              >
                <p>Password Mismatch</p>
              </div>
              <div className="mt-2">
                {/* <div className="col-md-12"> */}
                <small className="grey">
                  Previous Password{" "}
                  <span className="psw" style={{ paddingTop: "3px" }}>
                    Forgot{" "}
                    <span
                      style={{ color: "blue", cursor: "pointer" }}
                      data-toggle="modal"
                      data-target="#ForgetPassModalSeller"
                      onClick={onclick}
                    >
                      password?
                    </span>
                  </span>
                </small>

                <input
                  // type="Password"
                  type={passVisible ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter previous password"
                  onChange={(e) => setpassword(e.target.value)}
                  value={password}
                  required
                />
                {/* </div> */}
              </div>
              <div className=" mt-2">
                {/* <div className="col-md-12"> */}
                <small className="grey">New Password</small>
                <input
                  // type="Password"
                  type={passVisible ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter new password"
                  onChange={(e) => setnewPassword(e.target.value)}
                  value={newPassword}
                  required
                />
                {/* </div> */}
              </div>

              <div className=" mt-2">
                {/* <div className="col-md-12"> */}
                <small className="grey">Confirm Password</small>
                <input
                  // type="Password"
                  type={passVisible ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter confirm password"
                  onChange={(e) => setconfirmPassword(e.target.value)}
                  value={confirmPassword}
                  required
                />
                {/* </div> */}
              </div>

              <div className="mt-3 mb-3 text-right">
                <button className="btn btn-primary" type="submit">
                  Save Password
                </button>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Editpassword;

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { sellerUpdate } from "../../actions/sellerDataActions";

function Editinfo(props) {
  const [info, setinfo] = useState({
    name: props.details.name ? props.details.name : "",
    mobileno: props.details.mobileno ? props.details.mobileno : "",
    email: props.details.email ? props.details.email : "",
  });
  const Inputchange = (event) => {
    const { name, value } = event.target;
    setinfo({
      ...info,
      [name]: value,
    });
  };

  const [edit, setedit] = useState("Edit Profile");
  function tooglehandle(props) {
    // toggle field
    let field = document.getElementById(props);
    field.disabled ? (field.disabled = false) : (field.disabled = true);
    if (field.disabled) {
      setedit("Edit Profile");
      cancelbtn();
    } else {
      setedit("Cancel");
    }
    // field.disabled ? setedit("Edit Profile") : setedit("Cancel");
  }

  function cancelbtn() {
    setinfo({
      name: props.details.name ? props.details.name : "",
      mobileno: props.details.mobileno ? props.details.mobileno : "",
      email: props.details.email ? props.details.email : "",
    });
  }

  const dispatch = useDispatch();
  function submitHandler() {
    if (props.details._id) {
      dispatch(sellerUpdate(info, props.details._id));
    }
    // document.getElementById("profile-info-fieldset").disabled = true;
  }
  return (
    <div className="animation slideIn  " id="seller-profile-information">
      {/* <div className="text-center seller-edit-main-heading ">
        <h1>Profile Settings</h1>
      </div> */}
      <h5 className="mt-3">
        Profile Info
        <span
          onClick={(e) => tooglehandle("profile-info-fieldset")}
          className="profile-edit"
        >
          {edit}
          {/* Edit Profile */}
        </span>
      </h5>
      <form
        onSubmit={submitHandler}
        id="profile-info-form"
        className="borders shadow mb-2"
        style={{ padding: "5px 15px" }}
      >
        <fieldset id="profile-info-fieldset" disabled>
          <div className="row  ">
            <div className="col-md-6 mt-2">
              <small className="grey">Name</small>
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder=""
                value={info.name}
                onChange={(e) => Inputchange(e)}
                required
              />
            </div>
            <div className="col-md-6 mt-2">
              <small className="grey">Mobile no </small>
              <input
                type="text"
                className="form-control"
                name="mobileno"
                value={info.mobileno}
                onChange={(e) => Inputchange(e)}
                placeholder=""
                required
              />
            </div>
          </div>
          {/* <div className="row"> */}
          <div className=" mt-2">
            <small className="grey">Email</small>
            <input
              type="email"
              className="form-control"
              name="email"
              // placeholder=""
              value={info.email}
              onChange={(e) => Inputchange(e)}
              required
            />
          </div>
          {/* </div> */}
          <div className="mb-3 mt-3 text-right">
            <button className="btn btn-primary" type="submit">
              Save Profile
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export default Editinfo;

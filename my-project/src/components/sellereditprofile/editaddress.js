import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { sellerUpdate } from "../../actions/sellerDataActions";
import { states } from "../scroll";

function Editaddress(props) {
  const [info, setinfo] = useState({
    address: props.details.address ? props.details.address : "",
    state: props.details.state ? props.details.state : "",
    city: props.details.city ? props.details.city : "",
    locality: props.details.locality ? props.details.locality : "",
    pincode: props.details.pincode ? props.details.pincode : "",
    district: props.details.district ? props.details.district : "",
  });

  const Inputchange = (event) => {
    const { name, value } = event.target;
    setinfo({
      ...info,
      [name]: value,
    });
  };

  const [edit, setedit] = useState("Edit Address");
  function tooglehandle(props) {
    // toggle field
    let field = document.getElementById(props);
    field.disabled ? (field.disabled = false) : (field.disabled = true);
    // field.disabled ? setedit("Edit Address") : setedit("Cancel");
    if (field.disabled) {
      setedit("Edit Address");
      cancelbtn();
    } else {
      setedit("Cancel");
    }
  }
  function cancelbtn() {
    setinfo({
      address: props.details.address ? props.details.address : "",
      state: props.details.state ? props.details.state : "",
      city: props.details.city ? props.details.city : "",
      locality: props.details.locality ? props.details.locality : "",
      pincode: props.details.pincode ? props.details.pincode : "",
    });
  }
  const dispatch = useDispatch();
  function submitHandler() {
    if (props.id) {
      dispatch(sellerUpdate({ Address: info }, props.id));
    }
    // document.getElementById("profile-info-fieldset").disabled = true;
  }
  return (
    <div
      className="seller-profile-edit-close animation slideIn"
      id="seller-profile-address"
    >
      <h5 className="mt-3">
        Address Info
        <span
          onClick={() => tooglehandle("profile-address-fieldset")}
          className="profile-edit"
        >
          {edit}
          {/* Edit Address */}
        </span>
      </h5>
      <form
        onSubmit={submitHandler}
        id="profile-address-form"
        className="borders shadow  mb-2"
        style={{ padding: "5px 15px" }}
      >
        <fieldset id="profile-address-fieldset" disabled>
          {/* <div className="row "> */}
          <div className=" mt-2">
            {/* <hr className="editprofilehr" /> */}

            <small className="grey">Address </small>

            <input
              type="text"
              className="form-control"
              name="address"
              placeholder=""
              value={info.address}
              onChange={(e) => Inputchange(e)}
              required
            />
          </div>
          {/* </div> */}
          <div className="row ">
            <div className="col-md-6 mt-2">
              <small className="grey">State</small>
              <select
                className="form-control col-md-12"
                id="exampleFormControlSelect1"
                name="state"
                value={info.state}
                onChange={(e) => Inputchange(e)}
                required
              >
                {states.map((state, idx) => (
                  <option key={idx} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-6 mt-2">
              <small className="grey">City</small>
              <input
                type="text"
                className="form-control"
                // placeholder=""
                name="city"
                value={info.city}
                onChange={(e) => Inputchange(e)}
                required
              />
            </div>
          </div>
          <div className="row ">
            <div className="col-md-4 mt-2">
              <small className="grey">Locality</small>
              <input
                type="text"
                className="form-control"
                // placeholder=""
                name="locality"
                value={info.locality}
                onChange={(e) => Inputchange(e)}
                required
              />
            </div>
            <div className="col-md-4 mt-2">
              <small className="grey">District</small>
              <input
                type="text"
                className="form-control"
                name="district"
                //   placeholder=""
                value={info.district}
                onChange={(e) => Inputchange(e)}
                required
              />
            </div>
            <div className="col-md-4 mt-2">
              <small className="grey">Pincode</small>
              <input
                type="text"
                className="form-control"
                name="pincode"
                //   placeholder=""
                value={info.pincode}
                onChange={(e) => Inputchange(e)}
                required
              />
            </div>
          </div>

          <div className="mb-3 mt-3 text-right">
            <button className="btn btn-primary " type="submit">
              Save Address
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export default Editaddress;

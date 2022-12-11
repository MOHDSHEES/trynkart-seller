import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { sellerUpdate } from "../../actions/sellerDataActions";

function Editbanking(props) {
  const [info, setinfo] = useState({
    accountNo: props.details.accountNo ? props.details.accountNo : "",
    ifsc: props.details.ifsc ? props.details.ifsc : "",
    name: props.details.name ? props.details.name : "",
  });
  const [gstin, setgstin] = useState(props.bank.gstin ? props.bank.gstin : "");
  const Inputchange = (event) => {
    const { name, value } = event.target;
    setinfo({
      ...info,
      [name]: value,
    });
  };
  const [edit, setedit] = useState("Edit Details");
  function tooglehandle(props) {
    // toggle field
    let field = document.getElementById(props);
    field.disabled ? (field.disabled = false) : (field.disabled = true);
    // field.disabled ? setedit("Edit Details") : setedit("Cancel");
    if (field.disabled) {
      setedit("Edit Details");
      cancelbtn();
    } else {
      setedit("Cancel");
    }
  }

  const dispatch = useDispatch();
  function submitHandler() {
    if (props.id) {
      dispatch(
        sellerUpdate({ business: info, bank: { gstin: gstin } }, props.id)
      );
    }
    // document.getElementById("profile-info-fieldset").disabled = true;
  }
  function cancelbtn() {
    setinfo({
      accountNo: props.details.accountNo ? props.details.accountNo : "",
      ifsc: props.details.ifsc ? props.details.ifsc : "",
      name: props.details.name ? props.details.name : "",
    });
    setgstin(props.bank.gstin ? props.bank.gstin : "");
  }
  return (
    <div
      className="seller-profile-edit-close animation slideIn"
      id="seller-profile-bank"
    >
      <h5 className="mt-3">
        Banking/Business Info
        <span
          onClick={() => tooglehandle("profile-banking-fieldset")}
          className="profile-edit"
        >
          {edit}
          {/* Edit Details */}
        </span>
      </h5>
      <form
        onSubmit={submitHandler}
        id="profile-banking-form"
        className="borders shadow  mb-2"
        style={{ padding: "5px 15px" }}
      >
        <fieldset id="profile-banking-fieldset" disabled>
          <div className="row ">
            <div className="col-md-6 mt-2">
              <small className="grey">Account no.</small>
              <input
                type="text"
                className="form-control"
                name="accountNo"
                //   placeholder=""
                value={info.accountNo}
                onChange={(e) => Inputchange(e)}
                required
                //   value={details.business && details.business.accountNo}
              />
            </div>

            <div className="col-md-6 mt-2">
              <small className="grey">IFSC</small>
              <input
                type="text"
                className="form-control"
                name="ifsc"
                //   placeholder=""
                value={info.ifsc}
                onChange={(e) => Inputchange(e)}
                //   value={details.business && details.business.ifsc}
                required
              />
            </div>
          </div>
          <div className="row ">
            <div className="col-md-6 mt-2">
              <small className="grey">Account Holder name</small>
              <input
                type="text"
                className="form-control"
                name="name"
                value={info.name}
                onChange={(e) => Inputchange(e)}
                required
                //   placeholder=""
                //   value={details.business && details.business.name}
              />
            </div>

            <div className="col-md-6 mt-2">
              <small className="grey">GSTIN</small>
              <input
                type="text"
                className="form-control"
                name="gstin"
                value={gstin}
                onChange={(e) => setgstin(e.target.value)}
                required
                //   value={details.bank && details.bank.gstin}
                //   placeholder=""
              />
            </div>
          </div>

          <div className="mb-3 mt-3 text-right">
            <button className="btn btn-primary" type="submit">
              Save Details
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export default Editbanking;

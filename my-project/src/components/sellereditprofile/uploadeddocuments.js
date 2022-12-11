import React, { useState } from "react";

function Uploadeddocuments(props) {
  const [sign, setsign] = useState(props.sign);
  const [cheque, setcheque] = useState(props.cheque);

  return (
    <div
      className="animation slideIn seller-profile-edit-close "
      id="seller-profile-documents"
    >
      <h5 className="mt-3">Uploaded Documents</h5>

      <form
        // onSubmit={submitHandler}
        id="profile-upldoc-form"
        className="borders shadow mb-2"
        style={{ padding: "20px 15px" }}
      >
        <div className="upldoc-wrapper">
          <div className="upldoc-box">
            <a target="_blank" href={cheque} rel="noreferrer">
              <img src={cheque} alt="cheque" />
            </a>
            <small>Cheque</small>
          </div>
          <div className="upldoc-box">
            <a target="_blank" href={sign} rel="noreferrer">
              <img src={sign} alt="sign" />
            </a>
            <small>Signature</small>
          </div>
        </div>
        {/* <fieldset id="profile-info-fieldset" disabled></fieldset> */}
      </form>
    </div>
  );
}

export default Uploadeddocuments;

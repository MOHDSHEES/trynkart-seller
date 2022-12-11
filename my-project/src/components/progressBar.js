import React from "react";
function ProgressBar() {
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
                <li className="active" id="personal">
                  <strong>Personal</strong>
                </li>
                <li id="payment">
                  <strong>Image</strong>
                </li>
                <li id="confirm">
                  <strong>Finish</strong>
                </li>
              </ul>
            </form>
          </div>
        </div>
        {/* </div> */}
      </div>
    </div>
  );
}
export default ProgressBar;

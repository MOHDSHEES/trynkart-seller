import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Axios from "axios";
import Editinfo from "./editinfo";
import Editpassword from "./editpassword";
import Editaddress from "./editaddress";
import Editbanking from "./editbanking";
import Uploadeddocuments from "./uploadeddocuments";

function SellerEditProfile(props) {
  // const [edit, setedit] = useState("Edit");
  const seller = useSelector((state) => state.sellerDetails);
  const { details, loading, error } = seller;
  const [password, setpassword] = useState("");
  useEffect(() => {
    if (details && details._id) {
      async function getPassword() {
        const { data } = await Axios.post("/api/seller/loginCredentials", {
          id: details._id,
        });
        setpassword(data.password);
      }

      getPassword();
    }
  }, [details]);
  // toggle information,address etc
  const [state, setstate] = useState("seller-profile-information");
  function toogle(param) {
    document
      .getElementById(state)
      .classList.toggle("seller-profile-edit-close");
    document
      .getElementById(param)
      .classList.toggle("seller-profile-edit-close");
    setstate(param);
  }

  return loading ? (
    <div>Loading</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div className="seller-edit-profile">
      <div className="seller-edit-profile-main">
        <div className="seller-edit-profile-flex">
          <div className="seller-icon-profile text-center">
            <img
              className="rounded-circle mt-5"
              width="150px"
              alt=""
              src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
            />
            <p className="font-weight-bold ">{details.name}</p>

            <p className="text-black-50">{details.email}</p>
          </div>

          <div className="seller-profile">
            <div className="text-center seller-edit-main-heading ">
              <h1>Profile Settings</h1>
            </div>
            {/* only for mobile hidden for pc */}
            <div
              className="profile-info-container"
              style={{ margin: "0 0 5px" }}
              onClick={() => toogle("seller-profile-information")}
            >
              <h4>Profile Information</h4>
            </div>

            {/*seller profile info  */}
            <Editinfo details={details} />

            {/* only for mobile hidden for pc */}
            <div
              className="profile-info-container"
              onClick={() => toogle("seller-profile-address")}
              style={{ margin: "0 0 5px" }}
            >
              <h4>Address Information</h4>
            </div>

            {/* seller address info */}
            {details.Address && (
              <Editaddress details={details.Address} id={details._id} />
            )}

            {/* only for mobile hidden for pc */}
            <div
              className="profile-info-container"
              onClick={() => toogle("seller-profile-bank")}
              style={{ margin: "0 0 5px" }}
            >
              <h4>Business/Bank Details</h4>
            </div>

            {/* seller business/bank info */}
            {details.business && details.bank && (
              <Editbanking
                details={details.business}
                bank={details.bank}
                id={details._id}
              />
            )}

            {/* only for mobile hidden for pc */}
            <div
              className="profile-info-container"
              onClick={() => toogle("seller-profile-documents")}
              style={{ margin: "0 0 5px" }}
            >
              <h4>Uploaded Documents</h4>
            </div>

            {/* seller uploaded documents */}
            {details.business && details.bank && (
              <Uploadeddocuments
                cheque={details.business.cheque}
                sign={details.bank.signature}
                id={details._id}
              />
            )}
            {/* only for mobile hidden for pc */}
            <div
              className="profile-info-container"
              onClick={() => toogle("seller-profile-password")}
              style={{ margin: "0 0 5px" }}
            >
              <h4>Password</h4>
            </div>

            {/* seller password edit */}
            {password && <Editpassword password={password} id={details._id} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerEditProfile;

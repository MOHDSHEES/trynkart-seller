import React from "react";
import { useHistory, useParams } from "react-router-dom";
import Orders from "./orders";

function SellerOrderDetails() {
  const { status } = useParams();
  const history = useHistory();
  return (
    <div>
      {status && status === "requests" ? (
        <Orders disableviewbtn={true} />
      ) : status === "completed" ? (
        <div
          className="alert alert-danger sticky"
          // style={{ position: "sticky", top: "2px" }}
          role="alert"
        >
          Oops! No Completed Orders Found.
        </div>
      ) : status === "returned" ? (
        <div
          className="alert alert-danger sticky"
          // style={{ position: "sticky", top: "2px" }}
          role="alert"
        >
          No Returned Orders Found.
        </div>
      ) : (
        history.push("/404")
      )}
    </div>
  );
}

export default SellerOrderDetails;

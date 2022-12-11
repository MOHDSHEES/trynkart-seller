import React, { useEffect, useRef, useState } from "react";
import Axios from "axios";
import { listingUpdate, sellerUpdate } from "../../actions/sellerDataActions";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useLocation } from "react-router";

function AdminSellerDetails() {
  // getting sellerId from url if any
  const location = useLocation();
  const sellerId = location.state;
  // ref for input id
  const searchInput = useRef();
  //   hook for storing input value
  const [searchValue, setsearchValue] = useState("");
  //   hook for storing sellerData
  const [details, setdetails] = useState([]);
  // hook for action select
  const [select, setselect] = useState([]);
  // dispatch object
  const dispatch = useDispatch();
  // hook for rejection message
  const [rejectedResponse, setrejectedResponse] = useState("");
  // loading hook
  const [loading, setloading] = useState(false);
  // hook for storing products data for searched id's
  const [searchList, setsearchList] = useState([]);
  // hook for storing seller action
  const [sellerAction, setsellerAction] = useState("");

  // initializing tooltip
  window.$(function () {
    window.$('[data-toggle="tooltip"]').tooltip();
  });

  //  getting seller details if sellerId from url (i.e on page load)
  useEffect(() => {
    if (sellerId.length > 0) {
      async function details() {
        const { data } = await Axios.post("/api/seller/admin/sellerDetails", {
          details: { _id: sellerId[0] },
        });
        data.length !== 0 ? setdetails(data) : setdetails(false);
        if (data && data.length > 0 && data[0].listings) {
          const { data: products } = await Axios.post(
            "/api/seller/admin/productdetails",
            {
              details: { _id: { $in: data[0].listings } },
            }
          );

          setsearchList(products);
        }
      }
      details();
    }
  }, [sellerId]);

  // initializing tooltip
  window.$(function () {
    window.$('[data-toggle="tooltip"]').tooltip();
  });

  //   input handler
  function InputHandler(e) {
    setsearchValue(e.target.value.substring(0, 24));
    searchInput.current.classList.remove("is-invalid");
  }
  // getting user details
  async function search() {
    searchInput.current.classList.remove("is-invalid");
    setloading(true);
    // seller details from id
    if (searchValue.length === 24) {
      const { data } = await Axios.post("/api/seller/admin/sellerDetails", {
        details: { _id: searchValue },
      });
      data.length !== 0 ? setdetails(data) : setdetails(false);
      if (data && data.length > 0 && data[0].listings) {
        const { data: products } = await Axios.post(
          "/api/seller/admin/productdetails",
          {
            details: { _id: { $in: data[0].listings } },
          }
        );

        setsearchList(products);
      }
      //   seller details from mobile no
    } else if (searchValue.length === 10 && !isNaN(searchValue)) {
      const { data: detail } = await Axios.post(
        "/api/seller/admin/sellerDetails",
        {
          details: { mobileno: searchValue },
        }
      );
      detail.length !== 0 ? setdetails(detail) : setdetails(false);

      if (detail && detail.length > 0 && detail[0].listings) {
        const { data: products } = await Axios.post(
          "/api/seller/admin/productdetails",
          {
            details: { _id: { $in: detail[0].listings } },
          }
        );

        setsearchList(products);
      }
    } else {
      setloading(false);
      searchInput.current.classList.add("is-invalid");
    }

    //   console.log(data[0].listings);

    setloading(false);
  }

  // Action handle change(dynamic inputs)
  function handleChange(i, event) {
    const values = [...select];
    values[i] = event.target.value;
    setselect(values);
  }

  // storing product id for rejection message handler
  const [ResponseId, setResponseId] = useState("");
  // submit handler/action for searched product id
  function Action(e, id, idx) {
    e.preventDefault();
    if (select[idx] === "Activate") {
      dispatch(listingUpdate({ status: "Active", reason: "" }, id));
    } else if (select[idx] === "Reject") {
      // dispatch(listingUpdate({ status: "Rejected" }, id));
      window.$("#rejectedResponse").modal("show");
      setResponseId(id);
    } else if (select[idx] === "Inactive") {
      dispatch(listingUpdate({ status: "Inactive", reason: "" }, id));
    }

    search();
  }

  // response length validation
  function responseLengthValidation(e) {
    // rejectedResponse.length < 40 && setrejectedResponse(e.target.value);
    setrejectedResponse(e.target.value.substring(0, 60));
  }

  // dispatching rejected action with response
  function RejectedResponseHandler(e) {
    e.preventDefault();
    dispatch(
      listingUpdate(
        { status: "Rejected", reason: rejectedResponse },
        ResponseId
      )
    );
    search();
    setrejectedResponse("");
    window.$("#rejectedResponse").modal("hide");
  }

  // seller action handler
  function sellerActionHandler(e) {
    e.preventDefault();
    const id = details[0]._id;
    if (sellerAction === "Un-Block") {
      dispatch(sellerUpdate({ isBlocked: false }, id));
    } else if (sellerAction === "Block") {
      dispatch(sellerUpdate({ isBlocked: true }, id));
      // window.$("#rejectedResponse").modal("show");
      // setResponseId(id);
    }

    // else if (sellerAction === "Inactive") {
    //   dispatch(listingUpdate({ status: "Inactive"}, id));
    // }
  }
  const history = useHistory();
  function previewHandler(id, status) {
    if (status === "Active") {
      history.push("/item/admin/" + id);
    } else {
      history.push("/seller/dashboard/preview/" + id);
    }
  }
  return (
    <div style={{ margin: "10px" }}>
      <Link to="/admin">
        <button className="btn btn-outline-primary">
          Search Products Details
        </button>
      </Link>

      <div className="admin-search">
        <div className="user-validation">
          <div className="input-group  ">
            <input
              ref={searchInput}
              value={searchValue}
              onChange={(e) => InputHandler(e)}
              type="text"
              className="form-control"
              placeholder="Search Seller with Id or Mobile no."
              required
            />

            <div className="input-group-append">
              <button
                onClick={search}
                className="btn btn-outline-primary"
                type="search"
              >
                {loading && <div className="loader"></div>}
                Search
              </button>
            </div>
            <div className=" invalid-feedback">
              Invalid Id or Mobile No.(Enter 24 character Id or 10 digit mobile
              no.)
            </div>
          </div>
          <small className="grey">
            Dont have seller Id :{" "}
            <span>
              <button
                style={{ marginBottom: "0", lineHeight: "0" }}
                type="button"
                className="rounded-circle btn  tooltip-circle"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Go to the Admin page and search Product with Product Id, Then click 'Get seller Details for this product' button to get Seller Details. "
              >
                ?
              </button>
            </span>
          </small>
        </div>
        {/* <small className="grey">Get seller Id</small> */}
      </div>
      {!details ? (
        <div
          style={{ padding: "20px" }}
          className="orders-details-div borders shadow"
        >
          <div className="alert alert-danger" role="alert">
            No Record Found
          </div>
        </div>
      ) : (
        details &&
        details.map((detail, idx) => {
          return (
            <div
              style={{ padding: "20px" }}
              className="orders-details-div grey borders shadow"
              key={idx}
            >
              {/* <form> */}
              {detail.admin ? (
                <div className="form-row">
                  <div className="form-group col-md-10">
                    <h3 className="main-color">Seller Details</h3>
                  </div>
                  <div className="form-group col-md-2 main-color">
                    <h3>ADMIN</h3>
                  </div>
                </div>
              ) : (
                <form onSubmit={sellerActionHandler}>
                  <div className="form-row">
                    <div className="form-group col-md-8">
                      <h3 className="main-color">Seller Details</h3>
                    </div>

                    <div className="form-group col-md-4">
                      <small>Action Against Seller</small>
                      <div className="input-group">
                        <select
                          className="form-control"
                          value={sellerAction}
                          onChange={(e) => setsellerAction(e.target.value)}
                          required
                        >
                          <option value="">Choose Action</option>

                          <option value="Un-Block">Un Block</option>

                          <option value="Block">Block</option>

                          {/* <option value="Warning">Warning</option> */}
                        </select>
                        <div className="input-group-append">
                          <button className="btn btn-outline-primary">
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              )}
              <form>
                <hr />
                <fieldset disabled>
                  <div className="form-row">
                    <div className="form-group col-md-4">
                      <small>Name</small>
                      <input
                        type="text"
                        className="form-control"
                        value={detail.name}
                        readOnly
                      />
                    </div>
                    <div className="form-group col-md-4">
                      <small>Seller Id</small>
                      <input
                        type="text"
                        className="form-control"
                        value={detail._id}
                        readOnly
                      />
                    </div>
                    <div className="form-group col-md-4">
                      <small>Mobile No.</small>
                      <input
                        type="text"
                        className="form-control"
                        // defaultValue={detail.mobileno}
                        value={detail.mobileno}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <small>Address</small>
                    <input
                      type="text"
                      className="form-control"
                      value={detail.Address && detail.Address.address}
                      readOnly
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-4">
                      <small>Locality</small>
                      <input
                        type="text"
                        className="form-control"
                        value={detail.Address.locality || ""}
                        readOnly
                      />
                    </div>
                    <div className="form-group col-md-4">
                      <small>City</small>
                      <input
                        type="text"
                        className="form-control"
                        value={detail.Address.city || ""}
                        readOnly
                      />
                    </div>
                    <div className="form-group col-md-4">
                      <small>District</small>
                      <input
                        type="text"
                        className="form-control"
                        value={detail.Address.district || ""}
                        readOnly
                      />
                    </div>
                    <div className="form-group col-md-4">
                      <small>State</small>
                      <input
                        type="text"
                        className="form-control"
                        value={detail.Address.state || ""}
                        readOnly
                      />
                    </div>
                    <div className="form-group col-md-3">
                      <small>Pincode</small>
                      <input
                        type="text"
                        className="form-control"
                        value={detail.Address.pincode || ""}
                        readOnly
                      />
                    </div>

                    <div className="form-group col-md-3">
                      <small>GST No.</small>
                      <input
                        type="text"
                        className="form-control"
                        value={detail.bank && detail.bank.gstin}
                        readOnly
                      />
                    </div>
                    <div className="form-group col-md-2">
                      <small>Status</small>
                      <input
                        type="text"
                        className="form-control"
                        value={detail.isBlocked ? "Blocked" : "Active"}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-4">
                      <small>Account No.</small>
                      <input
                        type="text"
                        className="form-control"
                        value={detail.business && detail.business.accountNo}
                        readOnly
                      />
                    </div>

                    <div className="form-group col-md-4">
                      <small>IFSC</small>
                      <input
                        type="text"
                        className="form-control"
                        value={detail.business && detail.business.ifsc}
                        readOnly
                      />
                    </div>
                    <div className="form-group col-md-4">
                      <small>Account Holder Name</small>
                      <input
                        type="text"
                        className="form-control"
                        value={detail.business && detail.business.name}
                        readOnly
                      />
                    </div>
                  </div>
                </fieldset>
              </form>
            </div>
          );
        })
      )}
      {details.length !== 0 &&
        (searchList.length > 0 ? (
          <div
            className="orders-details-div shadow grey"
            style={{ borderTop: "1px solid #d9d9d9", maxWidth: "100%" }}
          >
            <h5>Listings ({searchList.length})</h5>

            <div className="table-responsive-lg">
              <table
                style={{ marginBottom: "0" }}
                className="table  table-bordered table-hover"
              >
                <thead className="back-color">
                  <tr>
                    <th width="30%" scope="col">
                      Product Details
                    </th>
                    <th scope="col">Selling Price</th>
                    <th scope="col">MRP</th>
                    <th scope="col">Stock</th>
                    <th scope="col">Product Id</th>
                    <th scope="col">Category</th>
                    <th scope="col">Status</th>
                    <th style={{ minWidth: "250px" }} scope="col">
                      Choose Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {searchList &&
                    searchList.length > 0 &&
                    searchList.map((list, idx) => {
                      return (
                        <tr key={list._id + idx}>
                          <td
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              previewHandler(list._id, list.status)
                            }
                          >
                            <div className="lising-details-product">
                              {/* https://bit.ly/3hcMSq4 */}
                              <img
                                src={
                                  list.productImg.length > 0
                                    ? list.productImg[0]
                                    : ""
                                }
                                alt=""
                              />
                              {/* BIG BANG CREATIONS Analog 33 cm X 24 cm Wall Clock (green,
                      With Glass) */}
                              <small>
                                {list.displayinfo
                                  ? list.displayinfo
                                  : list.name +
                                    " " +
                                    list.brand +
                                    " " +
                                    list.category +
                                    " " +
                                    list.subCategory +
                                    " " +
                                    (list.colors && list.colors[0])}
                              </small>
                            </div>
                          </td>
                          <td>{list.sellingPrice}</td>
                          <td>{list.original_price}</td>
                          <td>{list.stock}</td>
                          <td>{list._id}</td>
                          <td>{list.category}</td>
                          <td>
                            {list.status === "Active" ? (
                              <p style={{ color: "green" }}>{list.status}</p>
                            ) : list.status === "Rejected" ? (
                              <p style={{ color: "red" }}>
                                {list.status}{" "}
                                <span>
                                  {" "}
                                  <button
                                    style={{
                                      marginBottom: "0",
                                      lineHeight: "0",
                                    }}
                                    type="button"
                                    className="rounded-circle btn  tooltip-circle"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title={list.reason}
                                  >
                                    ?
                                  </button>
                                </span>{" "}
                              </p>
                            ) : (
                              <p style={{ color: "red" }}>{list.status}</p>
                            )}
                          </td>
                          <td>
                            <form onSubmit={(e) => Action(e, list._id, idx)}>
                              <div className="input-group">
                                <select
                                  className="form-control"
                                  name="idx"
                                  value={select[idx]}
                                  onChange={(e) => handleChange(idx, e)}
                                  required
                                >
                                  <option value="">Choose Action</option>
                                  {list.status !== "Active" && (
                                    <option value="Activate">Activate</option>
                                  )}
                                  {list.status !== "Rejected" && (
                                    <option value="Reject">Reject</option>
                                  )}
                                  {list.status !== "Inactive" && (
                                    <option value="Inactive">Inactive</option>
                                  )}
                                </select>
                                <div className="input-group-append">
                                  <button className="btn btn-outline-primary">
                                    Submit
                                  </button>
                                </div>
                              </div>
                            </form>
                          </td>
                          {/* <td>
                          {" "}
                          <button
                            className="btn btn-outline-primary"
                            onClick={() => Action(list._id)}
                          >
                            Submit
                          </button>
                        </td> */}
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div
            style={{ padding: "20px" }}
            className="orders-details-div borders shadow"
          >
            <div className="alert alert-primary" role="alert">
              No Listing With this Id.
            </div>
          </div>
        ))}

      <div
        className="modal fade"
        id="rejectedResponse"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Reason for Rejection
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={RejectedResponseHandler}>
                <div className="form-group">
                  {/* <label for="message-text" className="col-form-label">
                    Rejection Reason
                  </label> */}
                  <textarea
                    value={rejectedResponse}
                    placeholder="Write reason for rejection..."
                    onChange={(e) => responseLengthValidation(e)}
                    className="form-control"
                  ></textarea>
                  <small>
                    Limit 60 characters ({60 - rejectedResponse.length}{" "}
                    remaining)
                  </small>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="Submit" className="btn btn-primary">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminSellerDetails;

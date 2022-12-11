import React, { useEffect, useRef, useState } from "react";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { listingUpdate } from "../../actions/sellerDataActions";
import { Link } from "react-router-dom";
// import AdminUserDetails from "./adminUserDetails";
// import { set } from "js-cookie";

function Admin() {
  // hook to store sellerId for corresponding product
  const [sellerId, setsellerId] = useState([]);
  // ref hook for search input
  const searchInput = useRef();
  // ref for alert popup
  const popup = useRef();
  // hook for storing initial inactive listings
  const [listing, setlisting] = useState([]);
  // hook for action select
  const [select, setselect] = useState([]);
  // hook for storing searched id
  const [searchValue, setsearchValue] = useState("");
  // hook for storing products data for searched id's
  const [searchList, setsearchList] = useState([]);
  // dispatch object
  const dispatch = useDispatch();
  // hook for storing select input search field
  const [searchSelect, setsearchSelect] = useState("");
  // loading hook
  const [loading, setloading] = useState(false);
  // checkbox hook
  const [checkbox, setcheckbox] = useState(false);
  // hook for rejection message
  const [rejectedResponse, setrejectedResponse] = useState("");

  // hook for geeting initial listings values(inactive)
  useEffect(() => {
    async function Details() {
      const { data } = await Axios.post("/api/seller/admin/productdetails", {
        details: { status: "Inactive" },
      });
      setlisting(data);
    }

    Details();
  }, []);

  // getting products with selected status
  async function Products(e) {
    e && e.preventDefault();
    // setsearchValue("");
    setloading(true);
    const { data } = await Axios.post("/api/seller/admin/productdetails", {
      details: { status: searchSelect },
    });
    setloading(false);
    setsearchList(data);
    if (data.length === 0) {
      popup.current.classList.remove("cart-popup-close");
      setTimeout(() => {
        popup.current.classList.add("cart-popup-close");
      }, 2000);
    }
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

    !(searchValue === "") && search();
    !(searchSelect === "") && Products();
  }

  //  action for initial inactive listings
  function ListingAction(e, props) {
    e.preventDefault();
    if (select === "Activate") {
      dispatch(listingUpdate({ status: "Active" }, props));
      setlisting(listing.filter((x) => x._id !== props));
    } else if (select === "Reject") {
      // dispatch(listingUpdate({ status: "Rejected" }, props));
      window.$("#rejectedResponse").modal("show");
      setResponseId(props);
      // setlisting(listing.filter((x) => x._id !== props));
    }
  }

  // checkbox handler
  function CheckboxHandler(e) {
    setsearchValue("");
    setsearchSelect("");
    setcheckbox(e.target.checked);
  }

  // search input change handler
  function setValue(e) {
    // setsearchSelect("");
    setsearchValue(e.target.value);
    searchInput.current.classList.remove("is-invalid");
  }

  // search submit handler and validator
  async function search() {
    searchInput.current.classList.remove("is-invalid");
    if (searchValue.length === 24) {
      const { data } = await Axios.post("/api/seller/admin/productdetails", {
        details: { _id: searchValue },
      });
      setsellerId(data.length > 0 && data[0].sellerId ? data[0].sellerId : []);
      data.length !== 0 ? setsearchList(data) : setsearchList(false);

      // showing popup if product not found
      if (data.msg) {
        popup.current.classList.remove("cart-popup-close");
        setTimeout(() => {
          popup.current.classList.add("cart-popup-close");
        }, 2000);
      }
    } else {
      searchInput.current.classList.add("is-invalid");
    }
  }

  // Action handle change(dynamic inputs)
  function handleChange(i, event) {
    const values = [...select];
    values[i] = event.target.value;
    setselect(values);
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
    Products();
    setlisting(listing.filter((x) => x._id !== ResponseId));
    setrejectedResponse("");
    window.$("#rejectedResponse").modal("hide");
  }
  // response length validation
  function responseLengthValidation(e) {
    // rejectedResponse.length < 40 && setrejectedResponse(e.target.value);
    setrejectedResponse(e.target.value.substring(0, 60));
  }

  return (
    <div style={{ margin: "10px" }}>
      <Link to={{ pathname: "/admin/sellerDetails", state: sellerId }}>
        <button className="btn btn-outline-primary">
          {sellerId.length > 0
            ? "Get Seller Details for this Product"
            : "Search Seller Details"}
        </button>
      </Link>
      <div style={{ padding: "10px" }} className="admin-search">
        {!checkbox ? (
          <div className="user-validation">
            <div className="input-group  ">
              <input
                ref={searchInput}
                value={searchValue}
                onChange={(e) => setValue(e)}
                type="text"
                className="form-control"
                placeholder="Search Product with Id"
                required
              />

              <div className="input-group-append">
                <button
                  onClick={search}
                  className="btn btn-outline-primary"
                  type="search"
                >
                  Search
                </button>
              </div>
              <div className=" invalid-feedback">
                Invalid Id (must contain 24 characters)
              </div>
            </div>
          </div>
        ) : (
          <div>
            <form onSubmit={(e) => Products(e)}>
              <div className="input-group ">
                <select
                  className="form-control"
                  name="state"
                  value={searchSelect}
                  onChange={(e) => setsearchSelect(e.target.value)}
                  required
                >
                  <option value="">Search Products with category...</option>
                  <option value="Active">Active</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Inactive">Inactive</option>
                </select>
                <div className="input-group-append">
                  <button
                    disable={loading.toString()}
                    className="btn btn-outline-primary"
                  >
                    {loading && <div className="loader"></div>}Search
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        <div style={{ marginBottom: "20px" }} className="form-check grey">
          <input
            className="form-check-input"
            type="checkbox"
            // onChange={(e) => setcheckBox(e.target.checked)}
            onChange={(e) => CheckboxHandler(e)}
          />
          <label className="form-check-label" htmlFor="defaultCheck1">
            <small> Search Products with status </small>
          </label>
          <label className="form-check-label" htmlFor="defaultCheck1"></label>
        </div>
      </div>
      {/* search result */}

      <div className="cart-popup cart-popup-close cart-popup-open" ref={popup}>
        <div className="cart-popup-border">No product found</div>
      </div>
      {!searchList ? (
        <div
          style={{ padding: "20px" }}
          className="orders-details-div borders shadow"
        >
          <div className="alert alert-danger" role="alert">
            No Record Found
          </div>
        </div>
      ) : (
        searchList.length > 0 && (
          <div
            className="orders-details-div shadow grey"
            style={{ borderTop: "1px solid #d9d9d9", maxWidth: "100%" }}
          >
            <h5>Search Result ({searchList.length})</h5>

            <div className="table-responsive-lg">
              <table
                style={{ marginBottom: "0" }}
                className="table  table-bordered"
              >
                <thead className="back-color">
                  <tr>
                    <th width="30%" scope="col">
                      Product Details
                    </th>
                    <th scope="col">Product Id</th>
                    <th scope="col">Selling Price</th>
                    <th scope="col">MRP</th>
                    <th scope="col">Stock</th>

                    <th scope="col">Category</th>
                    <th scope="col">Status</th>
                    {searchList[0].status === "Rejected" && (
                      <th style={{ minWidth: "150px" }} scope="col">
                        Reason
                      </th>
                    )}
                    <th style={{ minWidth: "250px" }} scope="col">
                      Choose Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {searchList && searchList.length > 0 ? (
                    searchList.map((list, idx) => {
                      return (
                        <tr key={list._id + idx}>
                          <td>
                            <div className="lising-details-product">
                              <img
                                src={
                                  list.productImg.length > 0
                                    ? list.productImg[0]
                                    : ""
                                }
                                alt=""
                              />

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
                              <div
                                style={{
                                  marginLeft: "auto",
                                  marginBottom: "auto",
                                }}
                                className="btn-group dropleft address-btn-div"
                              >
                                <button
                                  type="button"
                                  className="address-btn "
                                  data-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                >
                                  &#8942;
                                </button>
                                <div className="dropdown-menu ">
                                  <a
                                    className="dropdown-item address-edit"
                                    target="_blank"
                                    rel="noreferrer"
                                    // onClick={() => editAddress(add._id)}
                                    // onClick={() => previewHandler(list._id)}
                                    href={
                                      "/seller/dashboard/preview/" + list._id
                                    }
                                  >
                                    Product preview
                                  </a>
                                  <Link
                                    // onClick={() => deleteAddres(add._id)}
                                    className="dropdown-item address-edit"
                                    // target="_blank"
                                    // rel="noreferrer"
                                    to={{
                                      pathname: "/admin/sellerDetails",
                                      state: list.sellerId,
                                    }}
                                  >
                                    Seller Details
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>{list._id}</td>
                          <td>{list.sellingPrice}</td>
                          <td>{list.original_price}</td>
                          <td>{list.stock}</td>

                          <td>{list.category}</td>
                          <td>
                            {list.status === "Active" ? (
                              <p style={{ color: "green" }}>{list.status}</p>
                            ) : (
                              <p style={{ color: "red" }}>{list.status}</p>
                            )}
                          </td>
                          {list.status === "Rejected" && (
                            <td style={{ color: "red" }}>{list.reason}</td>
                          )}

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
                    })
                  ) : (
                    <div className="alert alert-primary" role="alert">
                      No product found
                    </div>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )
      )}
      {/* Listings for activation */}
      <div
        className="orders-details-div shadow grey"
        style={{ borderTop: "1px solid #d9d9d9", maxWidth: "1500px" }}
      >
        <h5>Recent Listings for Activation</h5>
        {listing.length > 0 ? (
          <div className="table-responsive-lg">
            <table
              style={{ marginBottom: "0" }}
              className="table  table-bordered"
            >
              <thead className="back-color">
                <tr>
                  <th width="30%" scope="col">
                    Product Details
                  </th>
                  <th scope="col">Product Id</th>
                  <th scope="col">Selling Price</th>
                  <th scope="col">MRP</th>
                  <th scope="col">Stock</th>
                  <th scope="col">Category</th>
                  <th style={{ minWidth: "250px" }} scope="col">
                    Choose Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {listing &&
                  listing.length > 0 &&
                  listing.map((list, idx) => {
                    return (
                      <tr key={list._id}>
                        <td>
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
                              {list.name} {list.brand} {list.category}{" "}
                              {list.subCategory} {list.colors && list.colors[0]}
                            </small>
                          </div>
                        </td>
                        <td>{list._id}</td>
                        <td>{list.sellingPrice}</td>
                        <td>{list.original_price}</td>
                        <td>{list.stock}</td>
                        <td>{list.category}</td>
                        <td>
                          <form onSubmit={(e) => ListingAction(e, list._id)}>
                            <div className="input-group">
                              <select
                                id="inputState"
                                className="form-control"
                                // value={state}
                                // onChange={(e) => setstate(e.target.value)}
                                name="state"
                                value={select}
                                onChange={(e) => setselect(e.target.value)}
                                required
                              >
                                <option value="">Choose Action</option>
                                <option value="Activate">Activate</option>
                                <option value="Reject">Reject</option>
                              </select>
                              <div className="input-group-append">
                                <button className="btn btn-outline-primary">
                                  Submit
                                </button>
                              </div>
                            </div>
                          </form>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="alert alert-primary" role="alert">
            No listings for Activation
          </div>
        )}
      </div>

      {/* modal */}
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
                    id="message-text"
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

export default Admin;

import React, { useEffect, useState } from "react";
// import Axios from "axios";
// import { useHistory } from "react-router";
import { Link, useHistory } from "react-router-dom";

function Listings(props) {
  // const details = props.listings;
  const [details, setdetails] = useState();
  useEffect(() => {
    setdetails(props.listings);
  }, [props.listings]);

  // setting details to array for array revese(for newer on top)
  const listing = details;
  // initializing tooltip
  window.$(function () {
    window.$('[data-toggle="tooltip"]').tooltip();
  });

  const history = useHistory();
  function previewHandler(id) {
    history.push("/seller/dashboard/preview/" + id);
  }
  // const history = useHistory();
  // function viewMore(props) {
  //   // console.log(props.name);
  //   console.log(listing);
  //   history.push({
  //     pathname: "/seller/dashboard/" + props.name,
  //     state: listing,
  //   });
  // }
  // const [listing, setlisting] = useState([]);
  // useEffect(() => {
  //   async function Details() {
  //     const { data } = await Axios.post("/api/seller/getListings", {
  //       details,
  //     });
  //     setlisting(data);
  //   }

  //   Details();
  // }, [details]);

  return (
    <div>
      <div
        className="orders-details-div shadow grey"
        style={{ borderTop: "1px solid #d9d9d9" }}
      >
        {listing && listing.length > 0 ? (
          <div>
            {listing.length > 3 && (
              <Link
                className="greater-than"
                // onClick={() => viewMore({ name: "Listings" })}
                to={{
                  pathname: "/seller/dashboard/listings",
                  state: { listing: listing },
                }}
              >
                View all
              </Link>
            )}
            <h5>Listings ({listing.length})</h5>

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
                    <th scope="col">Category</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {listing.slice(0, 3).map((list, idx) => {
                    return (
                      <tr key={idx} style={{ cursor: "pointer" }}>
                        <td onClick={() => previewHandler(list._id)}>
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
                        <td onClick={() => previewHandler(list._id)}>
                          {list.sellingPrice}
                        </td>
                        <td onClick={() => previewHandler(list._id)}>
                          {list.original_price}
                        </td>
                        <td onClick={() => previewHandler(list._id)}>
                          {list.stock}
                        </td>
                        <td onClick={() => previewHandler(list._id)}>
                          {list.category}
                        </td>
                        <td onClick={() => previewHandler(list._id)}>
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
                          <Link
                            to={{
                              pathname:
                                "/seller/dashboard/listings-management/add-single-listing",
                              state: list,
                            }}
                          >
                            Edit
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="alert alert-primary" role="alert">
            No listings added, Go to listings and then add new listings.
          </div>
        )}
      </div>
    </div>
  );
}

export default Listings;
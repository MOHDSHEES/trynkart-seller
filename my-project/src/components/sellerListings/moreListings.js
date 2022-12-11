import React, { useEffect, useState } from "react";
import { useHistory, useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";
// import { useQuery } from "../profile";
// import Listings from "./listings";

function MoreListings() {
  const { name } = useParams();
  const location = useLocation();
  const [data, setdata] = useState([]);
  const listing = location.state && location.state.listing;
  const query = location.state && location.state.query;

  // initializing tooltip
  window.$(function () {
    window.$('[data-toggle="tooltip"]').tooltip();
  });

  // setting details to array for array revese(for newer on top)
  // const data = details;

  const history = useHistory();
  useEffect(() => {
    if (!listing) {
      history.push("/seller/dashboard");
    } else {
      if (query) {
        setdata(listing.filter((x) => x.status === query));
      } else {
        setdata(listing);
      }
    }
  }, [history, listing, query]);

  function previewHandler(id) {
    history.push("/seller/dashboard/preview/" + id);
  }
  return (
    <div>
      {/* props.listings */}
      <div
        className="orders-details-div shadow grey"
        style={{
          borderTop: "1px solid #d9d9d9",
          maxWidth: "100%",
          margin: "10px",
        }}
      >
        <h5 style={{ textTransform: "capitalize" }}>
          {name} ({data.length})
        </h5>

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
              {data &&
                data.length > 0 &&
                data.map((list, idx) => {
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
                                style={{ marginBottom: "0", lineHeight: "0" }}
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
    </div>
  );
}

export default MoreListings;

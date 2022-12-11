import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import Autocomplete from "../autocomplete/autocomplete";
// import Axios from "axios";

function ListingManagement() {
  // const [categories, setCategories] = useState({});

  // console.log(categories);
  // useEffect(() => {
  //   async function categoryHandler() {
  //     const { data } = await Axios.post("/api/seller/cat");
  //     setCategories(Object.keys(data));
  //     // console.log(Object.keys(data));
  //   }
  //   categoryHandler();
  // }, []);
  return (
    <div>
      <div className="listing-img-container">
        <div className="black-opacity">
          <div style={{ textAlign: "center" }}>
            <h2>Successfully list Your Products on TryNcart</h2>
            <p>Learn about Product Listings and Product details page.</p>
            <button className="btn btn-success listing-primary-btn">
              Get Started
            </button>
          </div>
        </div>
      </div>
      <hr />
      <div className="white-bg listing-management-heading shadow">
        <h3 className="listing-heading">Product Listing</h3>
      </div>
      <div className="listing-input-container shadow ">
        <div className="single-listing">
          <div className="listing-product-heading">List a New Product</div>
          <form onSubmit={(e) => e.preventDefault()}>
            <small className="form-text text-muted">
              Search in Catalogue first
            </small>
            <div
              style={{ width: "400" }}
              className="input-group mb-3 listing-input"
            >
              <input
                type="text"
                className="form-control "
                placeholder="Search by Product Name or ISBN"
                // aria-label="Recipient's username"
                aria-describedby="button-search"
                required
              />
              {/* <Autocomplete suggestions={["asus", "laptop", "mobile"]} /> */}

              <div className="input-group-append">
                <button
                  style={{ height: "calc(1.5em + 0.75rem + 2px)" }}
                  className="btn btn-success"
                  type="search"
                  id="button-search"
                >
                  Search
                </button>
              </div>
            </div>
          </form>
          <div>
            If it is not in Catalogue:{" "}
            <span>
              <Link to="/seller/dashboard/listings-management/add-single-listing">
                Create a new Product listing.{" "}
              </Link>
            </span>
          </div>
        </div>
        <div className="bulk-listing">
          <div className="listing-product-heading">
            List many Products in bulk
          </div>
          <small className="form-text text-muted">
            Use Inventery File Templates
          </small>
          <div style={{ marginTop: "10px" }}>
            <a className="disabled" href="#!">
              Download an Inventry File
            </a>
          </div>
          <div>
            <a className="disabled" href="#!">
              Upload your Inventry File
            </a>
          </div>
          <div>
            <a className="disabled" href="#!">
              Monitor Upload status
            </a>
          </div>
          <div style={{ marginTop: "15px" }}>
            <small className="form-text text-muted">
              If you have your own Catalogue File, use:
            </small>
            {/* <br /> */}
            <a className="disabled" href="#!">
              Prepare your Listings
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ListingManagement;

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Axios from "axios";

import ProductListingDetailsForm from "./productListingDetailsForm";
import ProductListingSpecForm from "./productListingSpecForm";
function SingleListing() {
  // getting data from url ( only in case of product update)
  const location = useLocation();
  const data = location.state;
  // state hook for input fields
  const [details, setdetails] = useState({
    category: (data && data.category) || "",
    subCategory: (data && data.subCategory) || "",
    name: (data && data.name) || "",
    brand: (data && data.brand) || "",
  });
  const [categories, setCategories] = useState({});
  async function categoryHandler() {
    const { data } = await Axios.post("/api/seller/cat");
    setCategories(data);
    // console.log(Object.keys(data));
  }
  // console.log(details.category);
  // console.log(details.subCategory);
  // input handler
  const Inputchange = (event) => {
    const { name, value } = event.target;
    if (name === "category") {
      setdetails({
        category: value,
        subCategory: "",
        name: "",
      });
    } else if (name === "subCategory") {
      setdetails({
        ...details,
        name: "",
        [name]: value,
      });
    } else {
      setdetails({
        ...details,
        [name]: value,
      });
    }
  };

  // checkbox click handle and resetting brand input
  const [checkBox, setcheckBox] = useState();
  function checkbox(e) {
    setdetails({
      ...details,
      brand: "",
    });
    setcheckBox(e.target.checked);
  }

  // getting width of screen
  const useViewport = () => {
    const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
      const handleWindowResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleWindowResize);
      categoryHandler();
      return () => window.removeEventListener("resize", handleWindowResize);
    }, []);

    // Return the width so we can use it in our components
    return { width };
  };
  const { width } = useViewport();

  // submit handler
  function submitHandler(e) {
    e.preventDefault();
    window.$("#productListingDetails").modal("show");
  }

  // initializing tooltip
  window.$(function () {
    window.$('[data-toggle="tooltip"]').tooltip();
  });

  return (
    <div>
      <ProductListingDetailsForm details={details} data={data} />
      <ProductListingSpecForm details={details} data={data} />

      {/* progress bar */}
      <div
        style={{ padding: "0" }}
        className="container-fluid progress-bar-container"
      >
        <div className="row justify-content-center progress-bar-flex dark-border white-bg">
          <div className="card1">
            <form id="msform">
              <ul style={{ marginBottom: "20px" }} id="progressbar">
                <li
                  // style={{ width: "33.33%" }}
                  className="active"
                  id="account"
                >
                  <strong>Select Vertical</strong>
                </li>
                <li
                  // style={{ width: "33.33%" }}
                  className={details.name && "active"}
                  id="Address"
                >
                  <strong>Select Brand</strong>
                </li>
                <li
                  // style={{ width: "33.33%" }}
                  className={details.brand && "active"}
                  id="GSTIN"
                >
                  <strong>Add Product Info</strong>
                </li>
                <li
                  // style={{ width: "33.33%" }}
                  // className={brand && "active"}
                  id="GSTIN"
                >
                  <strong>Upload Product Images </strong>
                </li>
              </ul>
            </form>
          </div>
        </div>
      </div>
      <div className="dark-border white-bg listing-heading-div">
        <h3 className="listing-heading">
          {data ? "Update Listing" : "Add a Single Listing"}
        </h3>
      </div>
      {/* <ProductImageUpload /> */}
      <div className="listing-container dark-border shadow">
        <div>
          <form onSubmit={submitHandler} className="single-listing-form">
            <div className="form-row justify-content-center">
              <div className="form-group col-md-2 select-min-width">
                {width < 768 && (
                  <small className="grey" htmlFor="Address">
                    Category
                  </small>
                )}
                {Object.keys(categories).length === 0 ? (
                  <select
                    className="form-control category-select"
                    name="category"
                    size={width > 760 ? "15" : "0"}
                    // value={details.category}
                    // onChange={(e) => setcategory(e.target.value)}
                    // onChange={Inputchange}
                    required
                  >
                    <option className="select-options" value="">
                      Loading...
                    </option>
                  </select>
                ) : (
                  <select
                    className="form-control category-select"
                    name="category"
                    size={width > 760 ? "15" : "0"}
                    value={details.category}
                    // onChange={(e) => setcategory(e.target.value)}
                    onChange={Inputchange}
                    required
                  >
                    <option className="select-options" value="">
                      Select Category...
                    </option>

                    {/* <option className="select-options" value="Test">
                    Test
                  </option>
                  <option className="select-options" value="Laptops">
                    Laptops
                  </option>
                  <option className="select-options" value="Mobiles">
                    Mobiles
                  </option>
                  <option className="select-options" value="Clocks">
                    Clocks
                  </option>
                  <option className="select-options" value="Jewellery">
                    Jewellery
                  </option>
                  <option className="select-options" value="Furniture">
                    Furniture
                  </option> */}
                    {Object.keys(categories).map((c, i) => [
                      <option key={i} className="select-options" value={c}>
                        {c}
                      </option>,
                    ])}

                    {/* {categories.map((c, i) => [
                    <option key={i} className="select-options" value={c}>
                      {c}
                    </option>,
                  ])} */}
                  </select>
                )}
              </div>
              {details.category && (
                <div className="form-group col-md-2 select-min-width">
                  {width < 768 && (
                    <small className="grey" htmlFor="Address">
                      Sub Category
                    </small>
                  )}
                  {Object.keys(categories).length !== 0 && (
                    <select
                      className="form-control category-select"
                      name="subCategory"
                      size={width > 760 ? "15" : "0"}
                      value={details.subCategory}
                      // onChange={(e) => setsubCategory(e.target.value)}
                      onChange={Inputchange}
                      required
                    >
                      <option className="select-options" value="">
                        Select sub-category...
                      </option>

                      {/* <option className="select-options" value="Chair">
                      Chair
                    </option>

                    <option className="select-options" value="Table">
                      Table
                    </option>

                    <option className="select-options" value="Sofa">
                      Sofa
                    </option>

                    <option className="select-options" value="Laptop">
                      Laptop
                    </option>

                    <option className="select-options" value="Mobile">
                      Mobile
                    </option>
                    <option className="select-options" value="Wall clock">
                      Wall clock
                    </option> */}
                      {/* {test.map((e, i) => [
                      <option className="select-options" value="Mobile">
                        {e}
                      </option>,
                    ])} */}

                      {Object.keys(categories[details.category]).map((s, i) => [
                        <option key={i} className="select-options" value={s}>
                          {s}
                        </option>,
                      ])}
                      {/* {subCategories.map((s, i) => [
                      <option key={i} className="select-options" value={s}>
                        {s}
                      </option>,
                    ])} */}
                    </select>
                  )}
                </div>
              )}
              {details.subCategory && (
                <div className="form-group col-md-2 select-min-width">
                  {width < 768 && (
                    <small className="grey" htmlFor="Address">
                      Name
                    </small>
                  )}
                  {Object.keys(categories).length !== 0 && (
                    <select
                      className="form-control category-select grey"
                      name="name"
                      size={width > 760 ? "15" : "0"}
                      value={details.name}
                      // onChange={(e) => setname(e.target.value)}
                      onChange={Inputchange}
                      required
                    >
                      <option className="select-options" value="">
                        Select Name...
                      </option>

                      {categories[details.category][details.subCategory].map(
                        (s, i) => [
                          <option key={i} className="select-options" value={s}>
                            {s}
                          </option>,
                        ]
                      )}
                      {/* {[...Array(25)].map((x, i) => [
                      <option key={i} className="select-options" value={i}>
                        {i}
                      </option>,
                    ])} */}
                    </select>
                  )}
                </div>
              )}

              <div
                style={{ minWidth: "200px" }}
                className="form-group flex-fill  "
              >
                <div className=" selected-listing borders grey">
                  <div
                    className="center selected-listing-center  "
                    style={{ padding: "10px" }}
                  >
                    {!details.category ? (
                      <h5>Please select the category you wish to sell</h5>
                    ) : !details.subCategory ? (
                      <h5>Please select the sub-category you wish to sell</h5>
                    ) : !details.name ? (
                      <h5>
                        Please select the name of Product you wish to sell
                      </h5>
                    ) : (
                      <div>
                        <h5>
                          Product path :
                          <span
                            style={{ color: "black", wordBreak: "break-word" }}
                          >
                            {" "}
                            {details.category}/{details.subCategory}/
                            {details.name}
                          </span>
                        </h5>
                        {details.brand && (
                          <h5>
                            Brand :{" "}
                            <span style={{ color: "black" }}>
                              {" "}
                              {details.brand}{" "}
                            </span>
                          </h5>
                        )}
                      </div>
                    )}

                    {/* <div className="form-group" style={{ marginTop: "30px" }}>
                      <label className="grey" htmlFor="Address">
                        Search Path
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputAddress"
                        placeholder="Clothing/Clothing Accessories/Arm Warmer"
                        name="search-path"
                        // value={details.address}
                        // onChange={Inputchange}
                      />
                    </div> */}
                  </div>
                </div>
                <div className="select-brand-btn borders grey">
                  <div
                    style={{ width: "fit-content" }}
                    className="center selected-listing-center"
                  >
                    <h5>Please Select Brand Name to Start Selling</h5>
                    <div style={{ textAlign: "left" }}>
                      {/* <form> */}
                      <fieldset disabled={!details.name && true}>
                        <div className="input-group  brand-select-input">
                          {!checkBox ? (
                            <select
                              name="brand"
                              // onChange={(e) => setbrand(e.target.value)}
                              value={details.brand}
                              onChange={Inputchange}
                              id="inputState"
                              className="form-control"
                              required
                            >
                              <option value="">Select Brand...</option>
                              <option value="Apple">Apple</option>
                              <option value="Samsung">Samsung</option>
                              <option value="HP">HP</option>
                              <option value="Asus">Asus</option>
                              <option value="Lenovo">Lenovo</option>
                              <option value="MSI">MSI</option>
                              <option value="Acer">Acer</option>
                              <option value="Vivo">Vivo</option>
                            </select>
                          ) : (
                            <input
                              // onChange={(e) => setbrand(e.target.value)}
                              className="form-control"
                              name="brand"
                              value={details.brand}
                              onChange={Inputchange}
                              placeholder="Enter Brand Name"
                              required
                            />
                          )}
                          <div className="input-group-append">
                            <button
                              className="btn btn-success "
                              type="submit"
                              // id="button-search"
                              // data-toggle="modal"
                              // data-target="#productListingDetails"
                            >
                              Submit
                            </button>
                          </div>
                        </div>
                      </fieldset>

                      <div
                        style={{ marginBottom: "20px" }}
                        className="form-check"
                      >
                        <input
                          className="form-check-input"
                          type="checkbox"
                          disabled={!details.name && true}
                          // onChange={(e) => setcheckBox(e.target.checked)}
                          onChange={(e) => checkbox(e)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="defaultCheck1"
                        >
                          <small> Brand not in the List </small>
                          <span>
                            {" "}
                            <button
                              style={{ marginBottom: "0", lineHeight: "0" }}
                              type="button"
                              className="rounded-circle btn  tooltip-circle"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Tick the checkbox if Brand name is not in the list, then type your Brand name in above input. 
                              Listing will be marked sucessfull after Brand verification."
                            >
                              ?
                            </button>
                          </span>
                        </label>
                      </div>

                      {/* {checkBox && (
                          <div className="input-group  brand-select-input">
                            <input
                              onChange={(e) => setbrand(e.target.value)}
                              className="form-control"
                              placeholder="Enter Brand Name"
                            />

                            <div className="input-group-append">
                              <button
                                className="btn btn-success "
                                type="submit"
                                id="button-search"
                              >
                                Submit
                              </button>
                            </div>
                          </div>
                        )} */}

                      {/* <button
                      type="submit"
                      disabled={!name && true}
                      className="btn btn-success listing-primary-btn"
                    >
                      Select Brand
                    </button> */}
                      {/* </form> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default SingleListing;

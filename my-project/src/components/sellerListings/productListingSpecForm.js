import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { listingUpdate } from "../../actions/sellerDataActions";

function ProductListingSpecForm(props) {
  // getting created listing details (listingId)
  // const Details = useSelector((state) => state.newListing);
  // const { listing } = Details;
  const data = props.data ? props.data : undefined;
  const listings = useSelector((state) => state.listingsReducer);
  const { id } = listings;

  // getting sellerDetails
  // const seller = useSelector((state) => state.sellerSignUp);
  // const { sellerDetails } = seller;

  // state hook for input details
  const [details, setdetails] = useState({
    modelNo: (data && data.modelNo) || "",
    countryOfOrigin: (data && data.countryOfOrigin) || "",
    manufactureDate: (data && data.manufactureDate) || "",
    displayinfo: (data && data.displayinfo) || "",
  });

  function redirect() {
    history.push("/seller/dashboard");
    window.$("#productListingSpec").modal("hide");
  }

  // hook for input color (array)
  const [colors, setcolors] = useState(data ? data.colors : [null]);

  // input handler
  const Inputchange = (event) => {
    const { name, value } = event.target;
    setdetails({
      ...details,
      [name]: value,
    });
  };

  // initializing tooltip
  window.$(function () {
    window.$('[data-toggle="tooltip"]').tooltip();
  });

  // modal handling for dynamic Inputs(i.e for modal scroll)
  window.$("#productListingSpec").modal("handleUpdate");

  // input color change handle
  function handleChange(i, event) {
    const values = [...colors];
    values[i] = event.target.value;
    setcolors(values);
  }

  // adding new color input field
  function handleAdd() {
    const values = [...colors];
    values.push(null);
    setcolors(values);
  }

  // removing color input field
  function handleRemove(i) {
    const values = [...colors];
    values.splice(i, 1);
    setcolors(values);
  }

  const dispatch = useDispatch();
  const history = useHistory();

  // submit handler
  function submitHandler(e) {
    e.preventDefault();
    if (data) {
      dispatch(listingUpdate({ ...details, colors }, data._id));
      window.$("#productListingSpec").modal("hide");
      history.push({
        pathname:
          "/seller/dashboard/listings-management/add-single-listing/upload-images",
        state: { id: data._id, data: data, details: props.details },
      });
    } else {
      dispatch(listingUpdate({ ...details, colors }, id));
      window.$("#productListingSpec").modal("hide");
      history.push({
        pathname:
          "/seller/dashboard/listings-management/add-single-listing/upload-images",
        // state: { id: listing._id, data: null, details: props.details },
        state: { id: id, data: null, details: props.details },
      });
    }
  }
  return (
    <div>
      <div
        className="modal fade"
        id="productListingSpec"
        tabIndex="-1"
        data-backdrop="static"
        data-keyboard="false"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header back-color">
              <h5 className="modal-title" id="exampleModalLabel">
                {data
                  ? "Update Produt Specifications"
                  : "Product Specifications"}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span className="white-text" aria-hidden="true">
                  &times;
                </span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={submitHandler}>
                <label htmlFor="recipient-name" className="col-form-label">
                  Color <span className="estrix"> *</span>
                  <span>
                    {" "}
                    <button
                      type="button"
                      className="rounded-circle btn  tooltip-circle"
                      data-toggle="tooltip"
                      data-placement="right"
                      data-html="true"
                      title="Press + button to add all available colors for this product"
                    >
                      ?
                    </button>
                  </span>
                </label>
                {colors.map((color, idx) => {
                  return (
                    <div
                      style={{ margin: "5px 0" }}
                      key={idx}
                      className="input-group productListing-color-input"
                    >
                      <input
                        type="text"
                        className="form-control"
                        id={"name" + idx}
                        value={color || ""}
                        onChange={(e) => handleChange(idx, e)}
                        placeholder="Enter product color (ex- Black)"
                        required
                      />
                      <div className="input-group-append">
                        {colors.length !== 1 && (
                          <button
                            type="button"
                            className="btn btn-outline-danger"
                            onClick={() => handleRemove(idx)}
                          >
                            -
                          </button>
                        )}
                        {colors.length - 1 === idx && (
                          <button
                            type="button"
                            className="btn btn-outline-primary"
                            onClick={() => handleAdd()}
                          >
                            +
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}

                <div className="form-group">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Model no.{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="modelNo"
                    value={details.modelNo}
                    onChange={Inputchange}
                    // id="recipient-name"
                    placeholder="Enter model no."
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Country of Origin{" "}
                    <span>
                      <span className="estrix"> *</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="countryOfOrigin"
                    value={details.countryOfOrigin}
                    onChange={Inputchange}
                    // id="recipient-name"
                    placeholder="ex- India"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Date of Manufacture <span></span>
                  </label>
                  <input
                    type="date"
                    name="manufactureDate"
                    onChange={Inputchange}
                    value={details.manufactureDate}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Info about product <span className="estrix"> *</span>
                  </label>
                  <span>
                    {" "}
                    <button
                      type="button"
                      className="rounded-circle btn  tooltip-circle"
                      data-toggle="tooltip"
                      data-placement="right"
                      data-html="true"
                      title="Product Info will be displayed under product image."
                    >
                      ?
                    </button>
                  </span>
                  <textarea
                    type="text"
                    className="form-control"
                    name="displayinfo"
                    value={details.displayinfo}
                    onChange={Inputchange}
                    // id="recipient-name"
                    placeholder="Enter Info about product"
                    required
                  />
                </div>

                <div className="modal-footer">
                  {data ? (
                    <button
                      type="button"
                      className="btn btn-secondary"
                      // data-dismiss="modal"
                      onClick={() => redirect()}
                    >
                      Cancel
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Cancel
                    </button>
                  )}
                  <button type="submit" className="btn btn-success">
                    Save & Continue
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

export default ProductListingSpecForm;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { listingUpdate, Newlisting } from "../../actions/sellerDataActions";

function ProductListingDetailsForm(props) {
  const history = useHistory();
  const data = props.data ? props.data : undefined;
  // getting seller details
  const Details = useSelector((state) => state.sellerSignUp);
  const { sellerDetails } = Details;

  // state hook for input fields
  const [details, setdetails] = useState({
    original_price: (data && data.original_price) || "",
    sellingPrice: (data && data.sellingPrice) || "",
    stock: (data && data.stock) || "",
  });

  function redirect() {
    history.push("/seller/dashboard");
    window.$("#productListingDetails").modal("hide");
  }

  // input handler
  const Inputchange = (event) => {
    const { name, value } = event.target;
    setdetails({
      ...details,
      [name]: value,
    });
  };

  // submit handler
  const dispatch = useDispatch();
  function submitHandler(e) {
    e.preventDefault();
    if (data) {
      dispatch(listingUpdate({ ...details, ...props.details }, data._id));
    } else {
      dispatch(
        Newlisting(
          {
            ...details,
            ...props.details,
            ...{ sellerId: [sellerDetails._id] },
          },
          sellerDetails._id
        )
      );
    }
    window.$("#productListingDetails").modal("hide");
    window.$("#productListingSpec").modal("show");
  }
  return (
    <div>
      <div
        className="modal fade"
        id="productListingDetails"
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
                {data ? "Update Product Details" : "Product Details"}
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
                <div className="form-group">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Name{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    // id="recipient-name"
                    placeholder={props.details.name}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Category{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    // id="recipient-name"
                    placeholder={props.details.category}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="recipient-name" className="col-form-label">
                    Brand{" "}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    // id="recipient-name"
                    placeholder={props.details.brand}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="recipient-name" className="col-form-label">
                    MRP{" "}
                    <span>
                      <span className="estrix"> *</span>
                      <small>(only numbers)</small>
                    </span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="original_price"
                    value={details.original_price}
                    onChange={Inputchange}
                    // id="recipient-name"
                    placeholder="Enter MRP (ex- 1200) "
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message-text" className="col-form-label">
                    Selling Price<span className="estrix"> *</span>
                    <span>
                      <small>(only numbers)</small>
                    </span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="sellingPrice"
                    value={details.sellingPrice}
                    onChange={Inputchange}
                    id="message-text"
                    placeholder="Enter price you want sell (ex- 1000)"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message-text" className="col-form-label">
                    Stock<span className="estrix"> *</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="stock"
                    value={details.stock}
                    onChange={Inputchange}
                    // id="message-text"
                    placeholder="Enter stock (ex- 10)"
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

export default ProductListingDetailsForm;

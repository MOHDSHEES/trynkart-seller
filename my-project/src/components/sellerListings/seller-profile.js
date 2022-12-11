import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
// import { sellerDetails } from "../../actions/sellerDataActions";
import Axios from "axios";
import { sellerListings } from "../../actions/sellerDataActions";

const SellerProfile = () => {
  // initializing tooltip
  window.$(function () {
    window.$('[data-toggle="tooltip"]').tooltip();
  });
  // const location = useLocation();
  //  getting seller Details
  const seller = useSelector((state) => state.sellerDetails);
  const { details, loading, error } = seller;
  // console.log(details);
  const Details = useSelector((state) => state.sellerSignUp);
  const {
    sellerDetails: { _id },
  } = Details;

  const listings = useSelector((state) => state.listingsReducer);
  const { listing: data, loading: dataloading } = listings;
  // dispatch action for product details
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(sellerDetails(_id));
  // }, [dispatch, _id]);
  // const data = location.state.listing;
  // const details = location.state.details;
  // console.log(data);
  // const [data, setdata] = useState([]);
  // const [dataloading, setdataloading] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (!_id) {
      history.push("/seller/dashboard");
    } else {
      if (details && !data.length) {
        // setdataloading(true);
        dispatch(sellerListings(details.listings));
        // async function Details() {
        //   const { data } = await Axios.post("/api/seller/getListings", {
        //     details: details.listings,
        //   });
        //   // await Axios.post("/api/seller/admin/productdetails/all");
        //   setdataloading(false);
        //   setdata(data);
        // }
        // Details();
      }
    }
  }, [_id, history, details]);
  // console.log(props.state);
  return (
    // <div>
    loading ? (
      <div>Loading</div>
    ) : error ? (
      <div>{error}</div>
    ) : (
      <div className="row seller-profile-container">
        <div style={{ width: "100%" }}>
          {/* <!-- Profile widget --> */}
          <div className="bg-white shadow overflow-hidden">
            <div className="pt-0 pb-4 bg-dark">
              <div
                style={{ padding: "20px" }}
                className="media align-items-end profile-header"
              >
                <div className="profile mr-3">
                  <img
                    style={{ display: "inherit" }}
                    // src="https://bootstrapious.com/i/snippets/sn-profile/teacher.jpg"
                    src="https://www.kbl.co.uk/wp-content/uploads/2017/11/Default-Profile-Male.jpg"
                    alt="profile"
                    width="130"
                    className="rounded mb-2 img-thumbnail"
                  />
                  <Link
                    style={{ width: "140px" }}
                    to={"/seller/dashboard/editprofile/" + _id}
                    className="btn btn-dark btn-sm "
                  >
                    Edit profile
                  </Link>
                </div>
                <div className="media-body mb-5 text-white">
                  <h4 className="mt-0 mb-0">{details.name}</h4>
                  <p className="small mb-4">
                    <i className="fa fa-map-marker mr-2"></i>
                    {details.Address && details.Address.state}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-light p-4 d-flex justify-content-end text-center">
              <ul className="list-inline mb-0">
                {/* <li className="list-inline-item">
                  <h5 className="font-weight-bold mb-0 d-block">241</h5>
                  <small className="text-muted">
                    {" "}
                    <i className="fa fa-picture-o mr-1"></i>Photos
                  </small>
                </li> */}
                <li className="list-inline-item">
                  <h5 className="font-weight-bold mb-0 d-block">
                    {data && data.length}
                  </h5>
                  <small className="text-muted">Listings</small>
                </li>
              </ul>
            </div>

            <div className="seller-profile-listing-container">
              <div
                style={{ padding: "15px" }}
                className="d-flex align-items-center justify-content-between mb-3"
              >
                <h5 className="mb-0">
                  Recent Listings {/* <span> */}
                  <button
                    style={{ marginBottom: "2px", lineHeight: "0" }}
                    type="button"
                    className="rounded-circle btn  tooltip-circle"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Listings with red marker are Rejeted and Listings with grey marker are Inactive."
                  >
                    ?
                  </button>
                  {/* </span> */}
                </h5>

                {/* <a href="!#" className="btn btn-link text-muted">
                  Show all
                </a> */}
              </div>
              {/* <div
                style={{ boxShadow: " 2px 2px 18px #999999" }}
                className="scrolling-wrappe"
                // id={props.id}
              > */}
              <div className="seller-profile-itemcard">
                {!dataloading &&
                  data.length > 0 &&
                  data.map((listing, idx) => (
                    <div
                      key={idx}
                      className="item borders border-mobile seller-profile-item"
                    >
                      {listing.status === "Rejected" ? (
                        <div className="container-3d">
                          <div
                            style={{ borderTop: "45px solid red" }}
                            className="corner"
                          ></div>
                        </div>
                      ) : (
                        listing.status === "Inactive" && (
                          <div className="container-3d">
                            <div
                              style={{ borderTop: "45px solid grey" }}
                              className="corner"
                            ></div>
                          </div>
                        )
                      )}

                      <div className="item-container item-card seller-profile-item-card">
                        <Link
                          id="items-section-anchor"
                          to={"/seller/dashboard/preview/" + listing._id}
                          //  to={"/item/" + props.category + "/" + content._id}
                        >
                          <div className=" img-card">
                            <img src={listing.productImg[0]} alt="..." />
                          </div>
                          <div
                            style={{ fontSize: "1rem" }}
                            className="items-section card-items-section"
                          >
                            <p>
                              {listing.displayinfo
                                ? listing.displayinfo
                                : listing.name}
                            </p>
                          </div>
                        </Link>
                      </div>
                    </div>
                  ))}
              </div>
              {/* </div> */}

              {/* <div
                className="row align-items-center"
                style={{ justifyContent: "space-evenly" }}
              >
                {dataloading ? (
                  <div>Loading...</div>
                ) : data.length > 0 ? (
                  data.map((listing, idx) => (
                    <div
                      key={idx}
                      // style={{ border: "1px solid black", height: "100%" }}
                      className="col-lg-2 seller-profile-listing-img  mb-2"
                    >
                      <Link to={"/seller/dashboard/preview/" + listing._id}>
                        <img
                          src={listing.productImg[0]}
                          alt=""
                          className="img-fluid rounded shadow-sm"
                        />
                      </Link>
                    </div>
                  ))
                ) : (
                  <div className="empty-cart-container ">
                    <div className="empty-cart" style={{ width: "350px" }}>
                      <h4>You don't have any listings.</h4>
                      <Link to="/seller/dashboard/listings-management">
                        <button className="btn btn-success empty-cart-btn">
                          Add Listing
                        </button>
                      </Link>
                    </div>
                  </div>
                )}
              </div> */}
              {/* <div className="py-4">
                <h5 className="mb-3">Recent posts</h5>
                <div className="p-4 bg-light rounded shadow-sm">
                  <p className="font-italic mb-0">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam.
                  </p>
                  <ul className="list-inline small text-muted mt-3 mb-0">
                    <li className="list-inline-item">
                      <i className="fa fa-comment-o mr-2"></i>12 Comments
                    </li>
                    <li className="list-inline-item">
                      <i className="fa fa-heart-o mr-2"></i>200 Likes
                    </li>
                  </ul>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    )
    // </div>
  );
};

export default SellerProfile;

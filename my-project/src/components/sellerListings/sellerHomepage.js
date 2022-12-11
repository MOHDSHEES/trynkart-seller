import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
// import { useParams } from "react-router";
import { sellerDetails, sellerListings } from "../../actions/sellerDataActions";
import { Link, useHistory, useLocation } from "react-router-dom";

import { formatter } from "../scroll";
import Listings from "./listings";
import Orders from "./orders";
import SellerHomepageSkeleton from "../skeleton/sellerHomepageSkeleton";
// import { useQuery } from "../profile";

function useQuery() {
  // const { search } = useLocation();

  // return React.useMemo(() => new URLSearchParams(search), [search]);
  return new URLSearchParams(useLocation().search);
}
function SellerHomepage() {
  const query = useQuery();
  //  getting seller Details
  const seller = useSelector((state) => state.sellerDetails);
  const { details, loading, error } = seller;

  const listings = useSelector((state) => state.listingsReducer);
  const { listing } = listings;
  // getting loggedIn seller Id
  const Details = useSelector((state) => state.sellerSignUp);
  const {
    sellerDetails: { _id },
  } = Details;

  // let { id } = useParams();
  // dispatch action for product details
  const location = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    if (
      (details && !Object.keys(details).length) ||
      (location.state && location.state.reload)
    ) {
      dispatch(sellerDetails(_id));
    }
  }, [dispatch, _id, location]);

  const [orders, setorders] = useState();
  function scrollTo(props, stat) {
    setorders(props);
    history.replace("/?state=" + stat);
    document.getElementById(props).scrollIntoView({
      behavior: "smooth",
    });
  }

  // only for order section
  const [data, setdata] = useState("");
  useEffect(() => {
    async function logincredentials() {
      const { data } = await Axios.post("/api/seller/details/" + _id);
      setdata(data);
      if (data && query.get("state") === "new-orders") {
        setorders("1");
      }
    }

    logincredentials();
  }, [_id]);
  // const [listing, setlisting] = useState([]);
  // console.log(listing);
  useEffect(() => {
    if (
      (details && !listing.length) ||
      (details && location.state && location.state.reload)
    ) {
      dispatch(sellerListings(details.listings));
      // async function Details() {
      //   const { data } = await Axios.post("/api/seller/getListings", {
      //     details: details.listings,
      //   });
      //   // await Axios.post("/api/seller/admin/productdetails/all");
      //   setlisting(data);
      // }
      // Details();
    }
  }, [details, location]);

  // const [stats, setstats] = useState({ active: 0, inactive: 0, blocked: 0 });
  const [active, setactive] = useState(0);
  const [inactive, setinactive] = useState(0);
  const [rejected, setrejected] = useState(0);
  useEffect(() => {
    var a = 0,
      b = 0,
      i = 0;

    listing.map((item) => {
      if (item.status === "Active") {
        a++;
      } else if (item.status === "Inactive") {
        i++;
      } else {
        b++;
      }

      return 0;
    });
    setactive(a);
    setinactive(i);
    setrejected(b);
  }, [listing]);

  const history = useHistory();
  function listingDetails(quer, length) {
    if (length) {
      history.push({
        pathname: "/seller/dashboard/listings",
        state: { listing: listing, query: quer },
      });
    }
  }

  // console.log(stats);
  return loading ? (
    // <div>Loading...</div>
    <SellerHomepageSkeleton />
  ) : error ? (
    // <div>error</div>
    <div
      style={{ padding: "25px 30px", fontWeight: "600" }}
      className="alert alert-danger "
      role="alert"
    >
      <h4>{error}</h4>
    </div>
  ) : (
    <div>
      {details.isBlocked && (
        <div
          className="alert alert-danger sticky"
          // style={{ position: "sticky", top: "2px" }}
          role="alert"
        >
          Your Seller Account has been blocked.
        </div>
      )}

      <h2 className="dashboard-heading borders shadow ">Dashboard</h2>
      <div className="dashboard-main-container">
        <div className="dashboard-first">
          {/* Usefull links
          <div>Learning Center</div>
          
          <div>Manage you Profile</div>
          <div>Payments</div> */}

          <div className="items-filter dashboard-first-div shadow  borders mobile-display-none">
            {/* contact-left-ul contact-li filter-li */}
            <ul className="dashboard-ul ">
              <p className="filter-li-p dasboard-link-head">Usefull Links</p>

              <Link
                to={{
                  pathname: "/seller/dashboard/profile/" + _id,
                  // state: { listing, details },
                }}
              >
                <li>
                  <p>Manage your Profile</p>
                </li>
              </Link>

              <li>
                <p>Payments</p>
              </li>
              <li>
                <p>Learning Center</p>
              </li>
            </ul>
          </div>
          <div className="items-filter dashboard-first-div shadow borders">
            <ul className="contact-left-ul contact-li filter-li ">
              <p className="filter-li-p dasboard-link-head">Rvenue</p>

              {/* <div className="circle">
                <div className="center">{formatter.format(12000)}</div>
              </div>
              <h6>Today</h6> */}
              {/* carousal */}
              <div
                id="carouselControls"
                className="carousel slide"
                data-ride="carousel"
                data-interval="1000"
              >
                <div className="carousel-inner">
                  <div className="carousel-item active" data-interval="3000">
                    <div className="circle">
                      <div style={{ fontWeight: "bolder" }} className="center">
                        {formatter.format(12000)}
                      </div>
                    </div>
                    <h6>Today</h6>
                  </div>
                  <div className="carousel-item" data-interval="3000">
                    <div className="circle">
                      <div style={{ fontWeight: "bolder" }} className="center">
                        {formatter.format(50000)}
                      </div>
                    </div>
                    <h6>This Month</h6>
                  </div>
                  <div className="carousel-item" data-interval="3000">
                    <div className="circle">
                      <div style={{ fontWeight: "bolder" }} className="center">
                        {formatter.format(200000)}
                      </div>
                    </div>
                    <h6>This Year</h6>
                  </div>
                </div>
                <a
                  className="carousel-control-prev carousel-btn"
                  href="#carouselControls"
                  role="button"
                  data-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Previous</span>
                </a>
                <a
                  className="carousel-control-next carousel-btn"
                  href="#carouselControls"
                  role="button"
                  data-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Next</span>
                </a>
              </div>
            </ul>
          </div>
        </div>

        <div className="dashboard-second">
          <div className="orders-details-div shadow borders grey overflow-sm">
            <h5>Orders Stats</h5>
            <div className="orders-detail-container">
              <div
                onClick={() => {
                  !details.isBlocked &&
                    data &&
                    data.order &&
                    data.order.length &&
                    scrollTo("1", "new-orders");
                }}
                className="orders-detail-box"
              >
                <h3 className="">
                  {data && data.order ? data.order.length : 0}
                </h3>
                New Orders
              </div>
              <div className="orders-detail-box">
                <h3 className="">0</h3>
                Returns
              </div>

              <div className="orders-detail-box">
                <h3 className="">0</h3>
                Reattempts
              </div>
              <div className="orders-detail-box">
                <h3 className="">0</h3>
                Exchange
              </div>
            </div>
          </div>

          {/* listing */}
          <div className="orders-details-div borders shadow grey overflow-sm">
            <h5>Listings Stats</h5>
            <div className="orders-detail-container">
              <div
                className="orders-detail-box"
                onClick={() => {
                  !details.isBlocked && scrollTo("5");
                }}
              >
                <h3 className="">{listing.length}</h3>
                Total
              </div>
              <div
                onClick={() => listingDetails("Active", active)}
                className="orders-detail-box"
              >
                <h3 className="">{active}</h3>
                Active
              </div>
              <div
                onClick={() => listingDetails("Inactive", inactive)}
                className="orders-detail-box"
              >
                <h3 className="">{inactive}</h3>
                Inactive
              </div>

              <div
                onClick={() => listingDetails("Rejected", rejected)}
                className="orders-detail-box"
              >
                <h3 className="">{rejected}</h3>
                Rejected
              </div>
            </div>
          </div>

          {!details.isBlocked && (
            <div id="5">
              <Listings listings={listing} />
            </div>
          )}
        </div>
        {/* <div className="dashboard-third">
          
        </div> */}
      </div>

      <div id="1">{orders === "1" && <Orders data={data} />}</div>
    </div>
  );
}

export default SellerHomepage;

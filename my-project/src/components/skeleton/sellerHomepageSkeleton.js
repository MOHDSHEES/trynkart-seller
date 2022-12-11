import React from "react";
import Skeleton from "react-loading-skeleton";
function SellerHomepageSkeleton() {
  return (
    <div>
      <h2 className="dashboard-heading borders shadow ">
        <Skeleton
          baseColor="#cdcbcb"
          highlightColor="#e6e5e5"
          duration={2}
          height={40}
        />
      </h2>
      <div className="dashboard-main-container">
        <div className="dashboard-first">
          <div className="items-filter dashboard-first-div shadow  borders mobile-display-none">
            {/* contact-left-ul contact-li filter-li */}
            <ul className="dashboard-ul ">
              <p className="filter-li-p dasboard-link-head">
                {" "}
                <Skeleton
                  baseColor="#cdcbcb"
                  highlightColor="#e6e5e5"
                  duration={2}
                  height={30}
                  //   width={120}
                />
              </p>

              <li>
                <p>
                  <Skeleton
                    baseColor="#cdcbcb"
                    style={{ marginTop: "10px" }}
                    highlightColor="#e6e5e5"
                    duration={2}
                    count={3}
                  />
                </p>
              </li>
            </ul>
          </div>
          <div className="items-filter dashboard-first-div shadow borders">
            <ul className="contact-left-ul contact-li filter-li ">
              <p className="filter-li-p dasboard-link-head">
                <Skeleton
                  baseColor="#cdcbcb"
                  highlightColor="#e6e5e5"
                  duration={2}
                  height={30}
                />
              </p>

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
                style={{ textAlign: "center" }}
              >
                <div style={{ paddingBottom: "5px" }}>
                  {/* <div style={{ fontWeight: "bolder" }} className="center"> */}
                  <Skeleton
                    baseColor="#cdcbcb"
                    highlightColor="#e6e5e5"
                    duration={2}
                    height={100}
                    width={100}
                    circle="True"
                  />
                </div>
                {/* </div> */}
                <Skeleton
                  baseColor="#cdcbcb"
                  highlightColor="#e6e5e5"
                  duration={2}
                  height={20}
                  width={120}
                />
              </div>
            </ul>
          </div>
        </div>

        <div className="dashboard-second">
          <div className="orders-details-div shadow borders grey overflow-sm">
            <h5 style={{ paddingRight: "15px" }}>
              <Skeleton
                baseColor="#cdcbcb"
                highlightColor="#e6e5e5"
                duration={2}
                height={20}
                width={500}
              />
            </h5>
            <div className="orders-detail-container">
              <div className="orders-detail-box">
                <h3 className="">
                  <Skeleton
                    baseColor="#cdcbcb"
                    highlightColor="#e6e5e5"
                    duration={2}
                    width={100}
                  />
                </h3>
                <Skeleton
                  baseColor="#cdcbcb"
                  highlightColor="#e6e5e5"
                  duration={2}
                  width={150}
                />
              </div>
              <div className="orders-detail-box">
                <h3 className="">
                  <Skeleton
                    baseColor="#cdcbcb"
                    highlightColor="#e6e5e5"
                    duration={2}
                    width={100}
                  />
                </h3>
                <Skeleton
                  baseColor="#cdcbcb"
                  highlightColor="#e6e5e5"
                  duration={2}
                  width={150}
                />
              </div>

              <div className="orders-detail-box">
                <h3 className="">
                  <Skeleton
                    baseColor="#cdcbcb"
                    highlightColor="#e6e5e5"
                    duration={2}
                    width={100}
                  />
                </h3>
                <Skeleton
                  baseColor="#cdcbcb"
                  highlightColor="#e6e5e5"
                  duration={2}
                  width={150}
                />
              </div>
              <div className="orders-detail-box">
                <h3 className="">
                  <Skeleton
                    baseColor="#cdcbcb"
                    highlightColor="#e6e5e5"
                    duration={2}
                    width={100}
                  />
                </h3>
                <Skeleton
                  baseColor="#cdcbcb"
                  highlightColor="#e6e5e5"
                  duration={2}
                  width={150}
                />
              </div>
            </div>
          </div>
          <div className="orders-details-div shadow borders grey overflow-sm">
            <h5 style={{ paddingRight: "15px" }}>
              <Skeleton
                baseColor="#cdcbcb"
                highlightColor="#e6e5e5"
                duration={2}
                height={20}
                width={500}
              />
            </h5>
            <div className="orders-detail-container">
              <div className="orders-detail-box">
                <h3 className="">
                  <Skeleton
                    baseColor="#cdcbcb"
                    highlightColor="#e6e5e5"
                    duration={2}
                    width={100}
                  />
                </h3>
                <Skeleton
                  baseColor="#cdcbcb"
                  highlightColor="#e6e5e5"
                  duration={2}
                  width={150}
                />
              </div>
              <div className="orders-detail-box">
                <h3 className="">
                  <Skeleton
                    baseColor="#cdcbcb"
                    highlightColor="#e6e5e5"
                    duration={2}
                    width={100}
                  />
                </h3>
                <Skeleton
                  baseColor="#cdcbcb"
                  highlightColor="#e6e5e5"
                  duration={2}
                  width={150}
                />
              </div>

              <div className="orders-detail-box">
                <h3 className="">
                  <Skeleton
                    baseColor="#cdcbcb"
                    highlightColor="#e6e5e5"
                    duration={2}
                    width={100}
                  />
                </h3>
                <Skeleton
                  baseColor="#cdcbcb"
                  highlightColor="#e6e5e5"
                  duration={2}
                  width={150}
                />
              </div>
              <div className="orders-detail-box">
                <h3 className="">
                  <Skeleton
                    baseColor="#cdcbcb"
                    highlightColor="#e6e5e5"
                    duration={2}
                    width={100}
                  />
                </h3>
                <Skeleton
                  baseColor="#cdcbcb"
                  highlightColor="#e6e5e5"
                  duration={2}
                  width={150}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerHomepageSkeleton;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { detailsItem } from "../../actions/itemsDataActions";
import { formatter } from "../scroll";
import ItempageSkeleton from "../skeleton/itempageSkeleton";

function SellerPreviewPage(props) {
  const [ar, setAr] = useState(false);
  // initialising tooltip
  window.$(function () {
    window.$('[data-toggle="tooltip"]').tooltip();
    window.$("#tooltip2d").tooltip({ title: "2d" });
    window.$("#tooltip3d").tooltip({ title: "3d" });
  });

  // setting ar true and disabling 3d tooltip
  function button3dhandler() {
    window.$("#tooltip3d").tooltip("hide");
    window.$("#tooltip3d").tooltip("dispose");
    setAr(true);
  }
  // setting ar false and disabling 2d tooltip
  function button2dhandler() {
    window.$("#tooltip2d").tooltip("hide");
    window.$("#tooltip2d").tooltip("dispose");
    setAr(false);
  }
  // // getting login details
  // const userDetail = useSelector((state) => state.loginCheck);
  // const { user } = userDetail;

  let { productid } = useParams();

  // fetching product
  const itemDetails = useSelector((state) => state.itemDetails);
  const { items, loading, error } = itemDetails;
  const dispatch = useDispatch();

  // dispatch action for product details
  useEffect(() => {
    dispatch(detailsItem(productid));
  }, [dispatch, productid]);

  return loading ? (
    // <div>Loading...</div>
    <ItempageSkeleton />
  ) : error || items.msg ? (
    <div
      style={{ padding: "25px 30px", fontWeight: "600" }}
      className="alert alert-danger "
      role="alert"
    >
      <h4>{error} Item Not Found...</h4>
    </div>
  ) : (
    <div>
      <div
        className="alert alert-danger sticky"
        // style={{ position: "sticky", top: "2px" }}
        role="alert"
      >
        Note - This is only a Preview of how a Customer will see this product.
      </div>
      <div className="item-main-container">
        <div className="item-image-container">
          {items.ar &&
            (ar ? (
              <span>
                <button
                  type="button"
                  // className=" btn btn-primary tooltip-ar  "
                  className="rounded-circle btn tooltip-ar tooltip2d"
                  data-toggle="tooltip1"
                  id="tooltip2d"
                  data-placement="right"
                  title="View product Images"
                  onClick={button2dhandler}
                ></button>
              </span>
            ) : (
              <span>
                <button
                  className="rounded-circle btn tooltip-ar tooltip3d"
                  data-toggle="tooltip"
                  id="tooltip3d"
                  data-placement="right"
                  title="View product's 3d model in AR."
                  onClick={button3dhandler}
                ></button>
              </span>
            ))}
          {
            items.ar && ar ? (
              <model-viewer
                src={items.src_glb}
                ios-src={items.src_usdz}
                alt="A 3D model"
                shadow-intensity="1"
                camera-controls
                auto-rotate
                ar
                ar-modes="webxr scene-viewer quick-look"
              ></model-viewer>
            ) : // show single image witout carousel
            items.productImg && !(items.productImg.length > 1) ? (
              <img
                className="itempage-images"
                src={items.productImg && items.productImg[0]}
                alt="laptop"
              />
            ) : (
              // {/* carousel starts */}

              <div
                id="carouselExampleIndicators"
                className="carousel slide"
                data-ride="carousel"
                data-bs-interval="3000"
                style={{ height: "100%" }}
              >
                <ol className="carousel-indicators">
                  {items.productImg &&
                    items.productImg.map((item, x) => (
                      <li
                        data-target="#carouselExampleIndicators"
                        data-slide-to={"" + x}
                        className={x === 0 ? "active" : ""}
                        style={{
                          backgroundColor: "rgb(0,0,0,0.3)",
                          border: "1px solid white",
                        }}
                      ></li>
                    ))}
                </ol>

                <div className="carousel-inner itempage-carousel-inner">
                  {items.productImg &&
                    items.productImg.map((item, x) => (
                      <div
                        className={
                          x === 0 ? "carousel-item active" : "carousel-item"
                        }
                        data-interval="5000"
                      >
                        <img
                          className="d-block itempage-images"
                          src={item}
                          alt="Product Img"
                        />
                      </div>
                    ))}
                </div>

                <a
                  className="carousel-control-prev itempage-carousel-control-prev"
                  href="#carouselExampleIndicators"
                  role="button"
                  data-slide="prev"
                  style={{ width: "50px" }}
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Previous</span>
                </a>

                <a
                  className="carousel-control-next itempage-carousel-control-prev"
                  href="#carouselExampleIndicators"
                  role="button"
                  data-slide="next"
                  style={{ width: "50px" }}
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Next</span>
                </a>
              </div>
            )
            // {/* carousel ends */}
            // {/* </div> */}
          }

          <button
            //   onClick={buyHandle}
            className="btn btn-primary btn-buy"
            type="button"
            disabled
          >
            Buy
          </button>
          <button
            //   onClick={addToCartHandle}
            className="btn btn-primary btn-cart"
            type="button"
            disabled
          >
            <i
              style={{ paddingRight: "10px" }}
              className="fa fa-shopping-cart"
              aria-hidden="true"
            ></i>{" "}
            Add to cart
          </button>
        </div>

        <div className="item-details">
          <div className="item-name">
            <p>{items.displayinfo ? items.displayinfo : items.name}</p>
          </div>
          <div className="item-price">
            <p>
              {items.sellingPrice
                ? formatter.format(items.sellingPrice)
                : formatter.format(
                    Math.ceil(
                      items.original_price -
                        (items.original_price * items.off) / 100
                    )
                  )}
              <span
                style={{ marginLeft: "10px" }}
                className="items-price-org org"
              >
                {formatter.format(items.original_price)}
              </span>
              <span className="items-price-off org">
                {items.off ||
                  (
                    ((items.original_price - items.sellingPrice) * 100) /
                    items.original_price
                  ).toFixed(1)}
                % off
              </span>
            </p>
          </div>

          {items.specifications && items.specifications.length !== 0 && (
            <div className="spec-table">
              <div>
                <h3 className="specification">Specifications</h3>
              </div>
              <table className="table-spec">
                <thead>
                  <tr>
                    <th className="table-header" scope="col">
                      General
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items.specifications.map((cont) => (
                    <tr>
                      <td className="first-column">{Object.keys(cont)}</td>
                      <td>{Object.values(cont)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default SellerPreviewPage;

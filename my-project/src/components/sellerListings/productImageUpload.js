import React, { useLayoutEffect, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router";
import Axios from "axios";
// import { listingUpdate } from "../../actions/sellerDataActions";
// import { useDispatch, useSelector } from "react-redux";
// import { useSelector } from "react-redux";
// import { listingUpdate } from "../../actions/sellerDataActions";
// import ReactImageMagnify from "react-image-magnify";

function ProductImageUpload() {
  // listing Id from url
  const location = useLocation();
  const listingId = location.state;
  // hook for storing uploaded images (at product edit time)
  const [uploadedImages, setuploadedImages] = useState(
    listingId && listingId.data ? listingId.data.productImg : null
  );

  // popup ref
  const popup = useRef();
  // loading hook for images uploading
  const [loading, setloading] = useState(false);
  // hook to store img for main preview
  const [MainPreview, setMainPreview] = useState(null);
  // hook to store all images for preview
  const [files, setFile] = useState(uploadedImages || []);
  // hook to store images data to upload on cloudinary
  const [images, setimages] = useState([]);
  // hook for error
  const [error, seterror] = useState();
  // file input ref
  const inputref = useRef();

  const history = useHistory();
  // const dispatch = useDispatch();
  // hook to stop users directly accessing this page(upload img needs listing Id)
  useLayoutEffect(() => {
    const ac = new AbortController();
    if (!listingId) {
      history.push("/seller/dashboard/listings-management/add-single-listing");
    }
    return () => {
      ac.abort();
    };
  }, [listingId, history]);

  // console.log(uploadedImages);
  // getting sellerDetails
  // const seller = useSelector((state) => state.sellerSignUp);
  // const { sellerDetails } = seller;

  // getting created listing details (listingId)
  // const Details = useSelector((state) => state.newListing);
  // const { listing } = Details;
  // const listings = useSelector((state) => state.listingsReducer);
  // const { loading: load, error: err, id } = listings;
  // initializing tooltip
  window.$(function () {
    window.$('[data-toggle="tooltip"]').tooltip();
  });

  // handling file input
  const onChangePicture = async (e) => {
    inputref.current.classList.remove("is-invalid");

    // images hook for uploading
    setimages([...images, ...e.target.files].slice(0, 5));
    let ImagesArray = Object.entries(e.target.files).map((e) =>
      URL.createObjectURL(e[1])
    );
    // file hook for preview
    setFile([...files, ...ImagesArray].slice(0, 5));
    setMainPreview(ImagesArray[0]);
  };

  // delete loaded file on click
  function deleteFile(e) {
    var s = [];
    if (uploadedImages) {
      let res = window.confirm("Are you sure you want to delete this Image.");
      if (res) {
        setimages(images.filter((item, index) => index !== e));
        s = files.filter((item, index) => index !== e);
        setuploadedImages(uploadedImages.filter((item, index) => index !== e));
        deleteImgdb(e);
        deleteImg();
      } else {
        setimages(images);
        s = files;
      }
    } else {
      setimages(images.filter((item, index) => index !== e));
      s = files.filter((item, index) => index !== e);
    }
    // function to delete image from db
    async function deleteImgdb(e) {
      await Axios.post("/api/seller/listingUpdate/" + listingId.id, {
        details: {
          productImg: uploadedImages.filter((item, index) => index !== e),
        },
      });
    }

    // function delete img from cloud
    async function deleteImg() {
      const domain = uploadedImages[e].split("/");
      const imgId =
        domain[domain.length - 2] +
        "/" +
        domain[domain.length - 1].split(".")[0];
      await Axios.post("/api/uploads/delete", { imgId });
    }
    // changing preview image if current preview image is deleted
    setFile(s);
    if (!s.includes(MainPreview)) {
      setMainPreview(undefined);
    }
  }
  // console.log(listingId.details.subCategory);

  // submit handler
  const submitHandle = async (e) => {
    e.preventDefault();
    inputref.current.classList.remove("is-invalid");

    if (images.length > 0) {
      setloading(true);

      popup.current.classList.remove("cart-popup-close");
      const bodyFormData = new FormData();
      // looping through images array to append images to bodyformdata one by one
      images.map(async (image) => {
        bodyFormData.append("images", image);
      });
      try {
        const { data: details } = await Axios.post(
          "/api/uploads/multiple/" +
            listingId.details.category +
            "/" +
            listingId.details.subCategory,
          bodyFormData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // uploading images url to db
        if (details.length > 0) {
          if (uploadedImages) {
            // dispatch(
            //   listingUpdate(
            //     { productImg: [...uploadedImages, ...details] },
            //     listingId.id
            //   )
            // );
            // history.push("/seller/dashboard");
            const { data } = await Axios.post(
              "/api/seller/listingUpdate/" + listingId.id,
              {
                details: {
                  productImg: [...uploadedImages, ...details],
                },
              }
            );

            history.replace({
              pathname: "/",
              state: { reload: true },
            });
          } else {
            // dispatch(listingUpdate({ productImg: details }, listingId.id));
            // history.push("/seller/dashboard");
            const { data } = await Axios.post(
              "/api/seller/listingUpdate/" + listingId.id,
              {
                details: {
                  productImg: details,
                },
              }
            );
            // data.nModified === 1 &&
            //   data.ok === 1 &&
            history.replace({
              pathname: "/",
              state: { reload: true },
            });
          }
        }
        setloading(false);
      } catch (error) {
        setloading(false);
        seterror(error);
        // console.log(error);
        setTimeout(() => {
          popup.current.classList.add("cart-popup-close");
        }, 3000);
      }
    } else {
      inputref.current.classList.add("is-invalid");
      // history.push("/seller/dashboard");
      history.replace({
        pathname: "/",
        state: { reload: true },
      });
    }
  };

  // submit handler
  // const submitHandle = async (e) => {
  //   e.preventDefault();
  //   setloading(true);
  //   popup.current.classList.remove("cart-popup-close");
  //   try {
  //     // looping through images array to upload image one by one
  //     images.map(async (image) => {
  //       const bodyFormData = new FormData();
  //       bodyFormData.append("images", image);
  //       const { data } = await Axios.post(
  //         "/api/uploads/multiple",
  //         bodyFormData,
  //         {
  //           headers: {
  //             "Content-Type": "multipart/form-data",
  //           },
  //         }
  //       );
  //       // setting recieved url to imgUrl
  //       setimgUrl((ar) => [...ar, data]);
  //     });
  //   } catch (error) {
  //     setloading(false);
  //     popup.current.classList.add("cart-popup-close");
  //     console.log(error);
  //   }
  // };

  // Layouteffect to save imgUrl to db
  // useLayoutEffect(() => {
  // if (imgUrl.length > 0) {
  //   dispatch(listingUpdate(imgUrl, sellerDetails._id, listingId));
  //   setloading(false);
  //   history.push("/seller/dashboard");
  // setTimeout(() => {
  //   popup.current.classList.add("cart-popup-close");
  // }, 3000);
  // }
  // }, []);

  return (
    <div>
      <div
        className="cart-popup cart-popup-close cart-popup-open"
        id="cartPopupMessage"
        ref={popup}
      >
        <div className="cart-popup-border">
          {loading ? (
            <div>
              <div className="loader"></div> Uploading, It may take a while,
              please wait...
            </div>
          ) : (
            error && "Something went wrong, Try again later"
          )}
        </div>
      </div>
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
                  className="active"
                  id="Address"
                >
                  <strong>Select Brand</strong>
                </li>
                <li
                  // style={{ width: "33.33%" }}
                  className="active"
                  id="GSTIN"
                >
                  <strong>Add Product Info</strong>
                </li>
                <li
                  // style={{ width: "33.33%" }}
                  className="active"
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
        <h3 className="listing-heading">Add a Single Listing</h3>
      </div>
      <div className="img-upload-flex">
        <div className="img-upload-main ">
          <div className="img-upload-div dark-border shadow bg-white">
            <small>
              Upload Product images (maximum 5){" "}
              <span className="estrix"> * </span>{" "}
              <span>
                <button
                  style={{ marginBottom: "0", lineHeight: "0" }}
                  type="button"
                  className="rounded-circle btn  tooltip-circle"
                  data-toggle="tooltip"
                  data-placement="right"
                  title="Before uploading read the Image Guidlines carefully. Listing will be marked sucessfull after image verification."
                >
                  ?
                </button>
              </span>
            </small>{" "}
            <form onSubmit={submitHandle}>
              <div className="user-validation">
                <div className="input-group">
                  <div className="custom-file grey">
                    <input
                      type="file"
                      ref={inputref}
                      className="custom-file-input"
                      id="FileInput"
                      accept=".jpg,.jpeg,.png"
                      disabled={files.length === 5 || loading}
                      aria-describedby="FileInput"
                      name="images"
                      // onChange={Inputchange}
                      onChange={onChangePicture}
                      multiple
                    />
                    <label className="custom-file-label " htmlFor="FileInput">
                      {/* {chequePath
                      ? chequePath.slice(0, 25) + "..."
                      : "Select File"} */}
                      {files.length > 0
                        ? files.length + " Image(s) Selected..."
                        : "Select File..."}
                    </label>
                  </div>
                  <div className="input-group-append">
                    <button
                      disabled={loading || !files.length > 0}
                      className="btn btn-primary"
                      type="submit"
                    >
                      {loading ? "Uploading..." : "Upload"}
                    </button>
                  </div>
                  <div className=" invalid-feedback">Must upload Images</div>

                  {/* </div> */}
                </div>
              </div>
            </form>
          </div>
          <div className="img-upload-preview-main shadow dark-border bg-white ">
            {MainPreview || files.length > 0 ? (
              <img
                src={MainPreview || files[0]}
                className="preview-img-product"
                alt=""
              />
            ) : (
              <div className="grey">No Image Selected</div>
            )}
          </div>
          {files.length > 0 && (
            <div className="upload-img-containers shadow dark-border bg-white">
              {files.slice(0, 5).map((item, index) => {
                return (
                  <div key={index} style={{ position: "relative" }}>
                    <div
                      onClick={() => setMainPreview(item)}
                      className="upload-images-preview-sm borders img-upload-preview-main"
                    >
                      <img src={item} className="preview-img-product" alt="" />
                      {/* <p>1</p> */}
                    </div>
                    <button
                      type="button"
                      className="rounded-circle btn btn-danger img-delete-btn"
                      onClick={() => deleteFile(index)}
                    >
                      x
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="img-upload-main ">
          <div className="img-upload-div product-details-main borders ">
            <h4>Image Guidlines</h4>
            <div className="">
              <ul>
                <li>
                  <strong>Image format</strong> : It can be in JPEG, GIF or PNG.
                </li>
                <br />
                <li>
                  <strong>Image Size</strong> : The minimum requirement for the
                  size is 1000 pixels.
                </li>
                <br />
                <li>
                  <strong>Image Frame</strong> : At least 85% of the entire
                  frame or background must be filled.
                </li>
                <br />
                <li>
                  <strong>Background Colour</strong> : It is common not just for
                  a photo shoot but for uploading here to be WHITE! A
                  transparent one might also do but having a colorful background
                  is a strong NO. Image Colour Mode: The standard RGB or even
                  CMYK can be used.
                </li>
                <br />
              </ul>
            </div>
          </div>
          <div className="img-upload-div product-details-main borders ">
            <h4>Tips</h4>
            <div className="">
              <ul>
                <li>
                  The image must not contain any gratuitous additional objects.
                </li>
                <br />
                <li>
                  The image must be the cover art or a professional photograph
                  of the product being sold. Drawings or illustrations of the
                  product are not allowed.
                </li>
                <br />
                <li>The full product image should be in the frame.</li>
                <br />
                <li>
                  The image must be professionally lit and photographed or
                  scanned, all focused upon with realistic color, and smooth
                  edges.
                </li>
                <br />
                <li>
                  To get a professional touch there is no better option except
                  to going on with professional studios or photographers.
                </li>
                <br />
                <li>The usage of offensive material is not allowed.</li>
                <br />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductImageUpload;

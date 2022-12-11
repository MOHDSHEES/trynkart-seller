import React, { useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  useLocation,
} from "react-router-dom";
// import Navbar from "./navbar";
// import Login from "./login";
import SellerLogin from "./sellerLogin";
// import SignUp from "./signup";
import Footer from "./footer";
// import Contact from "./contactpage";
// import Items from "./items";
// import Item from "./itempage";
// import Cart from "./cart";
// import Profile from "./profile";
// import HomePage from "./homePage";
import { useSelector } from "react-redux";
import SellerResgitrationHomepage from "./sellerRegistrationHompage";
import SellerNavbar from "./sellernavbar";
import SellerRegistration from "./sellerRegistration";
import SellerGSTRegistration from "./sellerGSTregistration";
import SellerAddressRegistration from "./sellerAddressRegistration";
import SellerBankDetails from "./sellerBankDetails";
import SellerRegisteredNavbar from "./sellerRegisteredNavbar";
import ListingManagement from "./sellerListings/listingManagement";
// import Ar1 from "./ar1";
import SingleListing from "./sellerListings/singleListing";
import SellerHomepage from "./sellerListings/sellerHomepage";
import ProductImageUpload from "./sellerListings/productImageUpload";
import ProtectedRoute from "./protectedRoutes";
import Admin from "./sellerListings/admin";
import MoreListings from "./sellerListings/moreListings";
import AdminSellerDetails from "./sellerListings/adminSellerDetails";
// import ForgetPassword from "./ForgetPassword";
import ForgetPasswordSeller from "./forgetPasswordSeller";
import SellerProfile from "./sellerListings/seller-profile";
import SellerPreviewPage from "./sellerListings/sellerItemPreviewPage";
import SellerEditProfile from "./sellereditprofile/sellereditprofile";
// import OrderPage from "./sellerListings/orderPage";
// import OrderSummary from "./sellerListings/orderSummary";
import SellerOrderDetails from "./sellerListings/sellerOrderDetails";
// import OrderDetails from "./orderDetails";
import SingleOrderDetails from "./sellerListings/singleOrderDetail";
function App() {
  // const usersInfo = useSelector((state) => state.loginCheck);
  // const { user } = usersInfo;
  const sellerInfo = useSelector((state) => state.sellerSignUp);
  const { sellerDetails } = sellerInfo;
  function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
    return null;
  }

  // closing open models on browser back button
  window.onpopstate = function () {
    let open_modal = document.querySelector(".modal.show");
    if (open_modal) {
      open_modal.dataset.pushback = "true";
      window.$(open_modal).modal("hide");
      // window.$("#exampleModal").modal("hide");
    }
  };

  return (
    <div
      className="main"
      //  onClick={close}
    >
      <BrowserRouter>
        <div>
          {/* <Login />
          <SignUp />
          <ForgetPassword /> */}
          <ForgetPasswordSeller />
          <ScrollToTop />
          <SellerLogin />
        </div>
        <div style={{ minHeight: "50vh" }}>
          <Switch>
            <Route exact path="/seller">
              <SellerNavbar mobileInput={true} />
              <SellerResgitrationHomepage />
            </Route>

            <ProtectedRoute
              exact
              path="/seller/registration"
              redirectTo="/"
              user={sellerDetails && !sellerDetails.token}
              components={[<SellerNavbar />, <SellerRegistration />]}
            />

            <Route exact path="/seller/registration/address">
              <SellerNavbar />
              <SellerAddressRegistration />
            </Route>

            {/* <ProtectedRoute
              exact
              path="/seller/registration/address"
              redirectTo="/seller/registration"
              user={sellerDetails && !sellerDetails.token && sellerDetails._id}
              components={[<SellerNavbar />, <SellerAddressRegistration />]}
            /> */}

            <Route exact path="/seller/registration/address/businessdetails">
              <SellerNavbar />
              <SellerGSTRegistration />
            </Route>

            {/* <ProtectedRoute
              exact
              path="/seller/registration/address/businessdetails"
              redirectTo="/seller/registration"
              user={sellerDetails && !sellerDetails.token && sellerDetails._id}
              components={[<SellerNavbar />, <SellerGSTRegistration />]}
            /> */}

            <Route
              exact
              path="/seller/registration/address/businessdetails/bankdetails"
            >
              <SellerNavbar />
              <SellerBankDetails />
            </Route>

            {/* <ProtectedRoute
              exact
              path="/seller/registration/address/businessdetails/bankdetails"
              redirectTo="/seller/registration"
              user={sellerDetails && !sellerDetails.token && sellerDetails._id}
              components={[<SellerNavbar />, <SellerBankDetails />]}
            /> */}

            {/* <Route exact path="/seller/dashboard">
              <SellerRegisteredNavbar />
              <SellerHomepage />
            </Route> */}

            <ProtectedRoute
              exact
              path="/"
              redirectTo="/seller"
              user={sellerDetails && sellerDetails.token}
              components={[<SellerRegisteredNavbar />, <SellerHomepage />]}
            />

            {/* <Route exact path="/seller/dashboard/listings-management">
              <SellerRegisteredNavbar />
              <ListingManagement />
            </Route> */}

            <ProtectedRoute
              exact
              path="/seller/dashboard/listings-management"
              redirectTo="/seller"
              user={sellerDetails && sellerDetails.token}
              components={[<SellerRegisteredNavbar />, <ListingManagement />]}
            />

            {/* <Route
              exact
              path="/seller/dashboard/listings-management/add-single-listing"
            >
              <SellerRegisteredNavbar />
              <SingleListing />
            </Route> */}

            <ProtectedRoute
              exact
              path="/seller/dashboard/listings-management/add-single-listing"
              redirectTo="/seller"
              user={sellerDetails && sellerDetails.token}
              components={[<SellerRegisteredNavbar />, <SingleListing />]}
            />

            {/* <Route
              exact
              path="/seller/dashboard/listings-management/add-single-listing/upload-images"
            >
              <SellerRegisteredNavbar />
              <ProductImageUpload />
            </Route> */}

            <ProtectedRoute
              exact
              path="/seller/dashboard/listings-management/add-single-listing/upload-images"
              redirectTo="/seller"
              user={sellerDetails && sellerDetails.token}
              components={[<SellerRegisteredNavbar />, <ProductImageUpload />]}
            />

            {/* <Route exact path="/admin">
              <SellerRegisteredNavbar />
              <Admin />
            </Route> */}
            {sellerDetails &&
              (sellerDetails._id === "60fbf07751909a0004c15b36" ||
                sellerDetails._id === "60fba855cbeb8b3454f417ad" ||
                sellerDetails._id === "6117b6b53081bd00042247c9") && (
                <ProtectedRoute
                  exact
                  path="/admin"
                  redirectTo="/seller"
                  user={sellerDetails && sellerDetails.token}
                  components={[<SellerRegisteredNavbar />, <Admin />]}
                />
              )}

            {sellerDetails &&
              (sellerDetails._id === "60fbf07751909a0004c15b36" ||
                sellerDetails._id === "60fba855cbeb8b3454f417ad" ||
                sellerDetails._id === "6117b6b53081bd00042247c9") && (
                <ProtectedRoute
                  exact
                  path="/admin/sellerDetails"
                  redirectTo="/seller"
                  user={sellerDetails && sellerDetails.token}
                  components={[
                    <SellerRegisteredNavbar />,
                    <AdminSellerDetails />,
                  ]}
                />
              )}

            <ProtectedRoute
              exact
              path="/seller/dashboard/profile/:id"
              redirectTo="/seller"
              user={sellerDetails && sellerDetails.token}
              components={[<SellerRegisteredNavbar />, <SellerProfile />]}
            />

            <ProtectedRoute
              exact
              path="/seller/dashboard/editprofile/:id"
              redirectTo="/seller"
              user={sellerDetails && sellerDetails.token}
              components={[<SellerRegisteredNavbar />, <SellerEditProfile />]}
            />

            <Route exact path="/seller/dashboard/:name">
              <SellerRegisteredNavbar />
              <MoreListings />
            </Route>

            <ProtectedRoute
              exact
              path="/seller/dashboard/preview/:productid"
              redirectTo="/seller"
              user={sellerDetails && sellerDetails.token}
              components={[<SellerRegisteredNavbar />, <SellerPreviewPage />]}
            />

            {/* {user ? (
              <Route exact path="/cart">
                <Navbar user={user} />
                <Cart userId={user.user ? user.user._id : ""} />
              </Route>
            ) : (
              <Redirect to="/" />
            )} */}

            {/* <ProtectedRoute
              exact
              path="/cart"
              user={user}
              components={[
                <Navbar user={user} />,
                <Cart userId={user && user.user ? user.user._id : ""} />,
              ]}
            /> */}

            <ProtectedRoute
              exact
              path="/seller/dashboard/order/:status"
              redirectTo="/seller"
              user={sellerDetails && sellerDetails.token}
              components={[<SellerRegisteredNavbar />, <SellerOrderDetails />]}
            />
            {/* {user ? (
              <Route exact path="/account">
                <Navbar user={user} />
                <Profile
                  userId={user.user ? user.user._id : ""}
                  user={user.user}
                />
              </Route>
            ) : (
              <Redirect to="/" />
            )} */}

            {/* <ProtectedRoute
              exact
              path="/account"
              user={user}
              components={[
                <Navbar user={user} />,
                <Profile
                  userId={user && user.user ? user.user._id : ""}
                  user={user && user.user}
                />,
              ]}
            /> */}

            {/* <ProtectedRoute
              exact
              path="/account/orderDetails"
              user={user}
              components={[
                <Navbar user={user} />,
                <OrderDetails
                  userId={user && user.user ? user.user._id : ""}
                  user={user && user.user}
                />,
              ]}
            /> */}

            <ProtectedRoute
              exact
              path="/seller/account/orderDetails"
              user={sellerDetails && sellerDetails.token}
              redirectTo="/seller"
              components={[<SellerRegisteredNavbar />, <SingleOrderDetails />]}
            />

            <Route path="/404">
              <SellerRegisteredNavbar />
              <div
                style={{ padding: "25px 30px", fontWeight: "600" }}
                className="alert alert-danger "
                role="alert"
              >
                <h4>404! Not Found</h4>
              </div>
            </Route>

            <Redirect to="/404" />
          </Switch>
        </div>
        <Footer className="main-footer" />
      </BrowserRouter>
    </div>
  );
}

export default App;

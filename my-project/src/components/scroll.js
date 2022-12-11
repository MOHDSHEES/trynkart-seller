// import { useEffect } from "react";
// import { useLocation } from "react-router-dom";

function SideScroll(element, direction, speed, distance, step) {
  var scrollAmount = 0;
  var slideTimer = setInterval(function () {
    if (direction === "left") {
      element.scrollLeft -= step;
    } else {
      element.scrollLeft += step;
    }
    scrollAmount += step;
    if (scrollAmount >= distance) {
      window.clearInterval(slideTimer);
    }
  }, speed);
}

var formatter = new Intl.NumberFormat("hi", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 0,
});

const states = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chattisgarh",
  "Goa",
  "Gujrat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

export { SideScroll, formatter, states };

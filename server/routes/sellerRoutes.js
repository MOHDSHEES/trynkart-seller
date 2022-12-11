import express from "express";
import Seller from "../models/sellersModel.js";
import Products from "../models/productModel.js";

const sellerRoutes = express.Router();

// adding new listing
// sellerRoutes.post("/newListing/:id", async (req, res) => {
//   try {
//     const sellerId = req.params.id;
//     const data = req.body.details;
//     // const itemId = "613c7e01fe7c0c39acb15792"; , "listings._id": itemId

//     const { listings } = await Seller.findOneAndUpdate(
//       { _id: sellerId },
//       {
//         $push: {
//           listings: data,
//         },
//       },

//       { new: true, useFindAndModify: false }
//     );

//     res.json(listings[listings.length - 1]);
//   } catch (error) {
//     // console.log("error: " + error);
//     res.send({ msg: error.message });
//   }
// });

// updating listing
// sellerRoutes.post("/listingUpdate/:id", async (req, res) => {
//   try {
//     const sellerId = req.params.id;
//     const listingId = req.body.listingId || "613e33c48d2e4a26cc6bf32c";
//     const productImg = req.body.data || [];
//     // console.log(req.body.details, productImg);
//     if (productImg.length > 0) {
//       const listing = await Seller.updateOne(
//         { _id: sellerId, "listings._id": listingId },
//         {
//           $set: {
//             "listings.$.productImg": productImg,
//           },
//         },
//         { new: true, useFindAndModify: false }
//       );
//       res.json(listing);
//     } else {
//       const data = req.body.details;
//       // const itemId = "613c7e01fe7c0c39acb15792"; , "listings._id": itemId
//       const { listings } = await Seller.findOneAndUpdate(
//         { _id: sellerId, "listings._id": listingId },
//         {
//           $set: {
//             "listings.$.colors": data.colors,
//             "listings.$.countryOfOrigin": data.countryOfOrigin,
//             "listings.$.manufactureDate": data.manufactureDate,
//             "listings.$.modelNo": data.modelNo,
//           },
//         },
//         { new: true, useFindAndModify: false }
//       );
//       res.json(listings);
//     }
//   } catch (error) {
//     // console.log("error: " + error);
//     res.send({ msg: error.message });
//   }
// });

// seller details
sellerRoutes.post("/details/:id", async (req, res) => {
  try {
    const sellerId = req.params.id;

    const sellerDetails = await Seller.findOne(
      { _id: sellerId },
      { password: 0 }
    );

    res.json(sellerDetails);
  } catch (error) {
    // console.log("error: " + error);
    res.send({ msg: error.message });
  }
});

// creating new listing
sellerRoutes.post("/newListing/:id", async (req, res) => {
  try {
    // const category = req.params.category;
    const sellerId = req.params.id;

    const data = {
      ...req.body.details,
      status: "Inactive",
      total_rating: { five: 0, four: 0, three: 0, two: 0, one: 0 },
    };
    const user = new Products(data);
    const product = await user.save();

    // const newUser=await User.find({});
    // const newUser = await Products.find({});
    await Seller.updateOne(
      { _id: sellerId },
      {
        $push: {
          listings: product._id,
        },
      },
      { new: true, useFindAndModify: false }
    );
    res.json(product);
  } catch (error) {
    // console.log(error);
    res.send({ msg: error.message });
  }
});

// updating listing
sellerRoutes.post("/listingUpdate/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const data = req.body.details;
    // console.log(data);
    // console.log(data);
    // const itemId = "613c7e01fe7c0c39acb15792"; , "listings._id": itemId
    // const listings = await Products.updateOne(
    //   { _id: productId },
    //   data
    //   // { new: true, useFindAndModify: false }
    // );
    const listings = await Products.findOneAndUpdate({ _id: productId }, data, {
      new: true,
      useFindAndModify: false,
    });
    res.json(listings);
  } catch (error) {
    // console.log(error);
    res.send({ msg: error.message });
  }
});

// fetching product details(listings with array of id's)
sellerRoutes.post("/getListings", async (req, res) => {
  try {
    const productId = req.body.details;
    // const itemId = "613c7e01fe7c0c39acb15792"; , "listings._id": itemId
    const listings = await Products.find({ _id: { $in: productId } });
    res.json(listings);
  } catch (error) {
    res.send({ msg: error.message });
  }
});

// fetching product details(listings)
sellerRoutes.post("/admin/productdetails", async (req, res) => {
  try {
    const querry = req.body.details;
    // const itemId = "613c7e01fe7c0c39acb15792"; , "listings._id": itemId
    const listings = await Products.find(querry);
    // console.log(listings);
    res.json(listings);
  } catch (error) {
    // console.log(error);
    res.send({ msg: error.message });
  }
});

// fetching seller details (for admin)
sellerRoutes.post("/admin/sellerDetails", async (req, res) => {
  try {
    const querry = req.body.details;
    // const itemId = "613c7e01fe7c0c39acb15792"; , "listings._id": itemId
    const details = await Seller.find(querry, { password: 0 });
    // console.log(details);
    res.json(details);
  } catch (error) {
    // console.log(error);
    res.send({ msg: error.message });
  }
});

// getting seller login details
sellerRoutes.post("/loginCredentials", async (req, res) => {
  try {
    const id = req.body.id;
    // const itemId = "613c7e01fe7c0c39acb15792"; , "listings._id": itemId
    const details = await Seller.findOne(
      { _id: id },
      { password: 1, mobileno: 1 }
    );
    res.json(details);
  } catch (error) {
    // console.log(error);
    res.send({ msg: error.message });
  }
});

// to call this request use => [ await Axios.post("/api/seller/admin/productdetails/all"); ]
// testing(changing db)
// sellerRoutes.post("/admin/productdetails/all", async (req, res) => {
//   try {
//     // const querry = req.body.details;
//     // const itemId = "613c7e01fe7c0c39acb15792"; , "listings._id": itemId
//     const listings = await Products.find({});
//     console.log(listings);
//     listings.map(async (listing) => {
//       // console.log(listing.qty);
//       const list = await Products.updateOne(
//         { _id: listing._id },
//         { productImg: img_src }
//       );
//       await Products.updateOne({ _id: listing._id }, { status: "Active" });
//       await Products.updateOne(
//         { _id: listing._id },
//         { productImg: [listing.img_src] }
//       );
//     });

//     // const {_id } = listings._id;
//   } catch (error) {
//     console.log(error);
//     res.send({ msg: error.message });
//   }
// });

export default sellerRoutes;

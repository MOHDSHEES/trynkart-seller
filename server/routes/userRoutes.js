import express from "express";
import User from "../models/userModel.js";
import Products from "../models/productModel.js";
import Category from "../models/categoriesModel.js";
import Items from "../models/ItemsModel.js";
import { getToken, getsellerToken } from "../util.js";
// import transporter from "../nodemailer.js";
import Seller from "../models/sellersModel.js";
// import sgMail from "@sendgrid/mail";
// import twilio from "twilio";
const router = express.Router();

// import { CourierClient } from "@trycourier/courier";
// router.post("/api/contact/sendema", async (req, res) => {
//   const courier = CourierClient({
//     authorizationToken: "dk_prod_C2CRTQJJH94A6EKTK68P1KDMYP5K",
//   });

//   const messageId = await courier
//     .send({
//       eventId: "personalized-welcome-email",
//       recipientId: "Google_105778057172273250440",
//       profile: {},
//       data: {
//         subject: "Test",
//         name: "MOHD",
//         email: "mohd.sh@g.c",
//         message: "dfdf",
//       },
//     })
//     .then((resp) => {
//       console.log("Email sent", resp);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// });

// fetching all items
router.post("/api/products/catego", async (req, res) => {
  try {
    const product = await Products.aggregate([
      { $match: { status: "Active" } },
      { $group: { _id: "$category", Frequency: { $sum: 1 } } },
      // { $group: { _id: "$name", Frequency: { $sum: 1 } } },
      { $sort: { Frequency: -1 } },
      // { $unwind: "$category" },
      // { $group: { _id: "$category", Frequency: { $sum: 1 } } },
    ]);
    // product.sort(function (a, b) {
    //   return b.Frequency - a.Frequency;
    // });
    // console.log(product);

    res.json(product);
  } catch (error) {
    res.send({ msg: error.message });
  }
});
router.post("/api/products/category", async (req, res) => {
  const category = req.body.category;
  // console.log(category);
  try {
    const products = await Products.find({ category: category });
    // console.log(products);
    res.json(products);
  } catch (error) {
    res.send({ msg: error.message });
  }
});
//  for homepage container
router.post("/api/products/containeritems", async (req, res) => {
  try {
    // const user = new Items({
    //   _id: "dfgfdgdfgfdg",
    //   img_src: "dfdsfdsfsdfsd",
    //   category: "fgd",
    // });
    // const newUser = await user.save();
    const items = await Items.find({});
    res.json(items);
  } catch (error) {
    res.send({ msg: error.message });
  }
});
// for items page
router.post("/api/products/category/:category", async (req, res) => {
  try {
    const category = req.params.category;
    const search = req.body.search;
    if (search !== null) {
      // const products = await Products.find({ $text: { $search: search } });
      const products = await Products.find({
        $or: [
          { category: { $regex: search, $options: "i" } },
          { displayinfo: { $regex: search, $options: "i" } },
        ],
      });

      if (products.length !== 0) res.json(products);
      else
        res
          .status(401)
          .send({ msg: "Products Not Found with searched keyword." });
    } else {
      const products = await Products.find({ category: category });
      if (products.length !== 0) res.json(products);
      else
        res.status(401).send({
          msg: "Products Not Found, make sure you entered correct URL",
        });
    }
    // if (products.length !== 0) res.json(products);
    // else
    //   res
    //     .status(401)
    //     .send({ msg: "Products Not Found make sure URL is Correct" });
  } catch (error) {
    res.status(401).send({ msg: error.message });
  }
});

// fetching product with array of id's
router.post("/api/products/arrayIds", async (req, res) => {
  try {
    const itemIds = req.body.id;
    const data = await Products.find({ _id: { $in: itemIds } });
    // const user = await Products.findOne({ _id: itemId });
    console.log(data);
    if (data) res.json(data);
    else res.send({ msg: "Product not found " });
  } catch (error) {
    res.send({ msg: error.message });
  }
});
// fetching product with id
router.post("/api/products/:id", async (req, res) => {
  try {
    const itemId = req.params.id;
    const user = await Products.findOne({ _id: itemId });
    if (user) res.json(user);
    else res.send({ msg: "Product not found " });
  } catch (error) {
    res.send({ msg: error.message });
  }
});
router.post("/api/products/ratings/:id", async (req, res) => {
  try {
    const itemId = req.params.id;
    const stars = req.body.stars;
    const title = req.body.title;
    const description = req.body.description;
    const name = req.body.name;
    const today = new Date();
    const dd = String(today.getDate());
    const mm = String(today.getMonth() + 1);
    const yyyy = today.getFullYear();
    const date = dd + "-" + mm + "-" + yyyy;
    // const as = await Products.updateOne(
    //   { _id: itemId },
    //   { $inc: { "total_rating.five": 1 } }
    // );

    var queryObj = {};
    if (stars === "5") queryObj["total_rating.five"] = 1;
    else if (stars === "4") queryObj["total_rating.four"] = 1;
    else if (stars === "3") queryObj["total_rating.three"] = 1;
    else if (stars === "2") queryObj["total_rating.two"] = 1;
    else queryObj["total_rating.one"] = 1;
    const detail = await Products.updateOne(
      { _id: itemId },
      {
        $push: {
          rating: {
            stars: stars,
            title: title,
            description: description,
            name: name,
            date: date,
          },
        },
        $inc: queryObj,
      }
    );
    const user = await Products.findOne({ _id: itemId });
    res.json(user);
  } catch (error) {
    res.send({ msg: error.message });
  }
});

// add product to cart
router.post("/api/user/addtocart/:id", async (req, res) => {
  try {
    const itemId = req.params.id;
    const userId = req.body.userId;
    const cartqty = req.body.cartqty;
    // const data = await Products.findOne({ _id: itemId });
    const userfound = await User.findOne({
      _id: userId,
      cart: { $elemMatch: { _id: itemId } },
    });
    if (userfound) {
      const user = await User.updateOne(
        { _id: userId, "cart._id": itemId },
        {
          // $pull: { cart: { _id: itemId } },
          $set: {
            "cart.$.name": req.body.name,
            "cart.$._id": itemId,
            "cart.$.productImg": req.body.productImg,
            // price: data.price,
            "cart.$.sellingPrice": req.body.sellingPrice,
            "cart.$.original_price": req.body.original_price,
            "cart.$.off": req.body.off,
            "cart.$.stock": req.body.stock,
            "cart.$.displayinfo": req.body.displayinfo,
            "cart.$.sellerId": req.body.sellerId,
            "cart.$.cartqty": cartqty,
          },
        }
      );
    } else {
      const user = await User.updateOne(
        { _id: userId },
        {
          $addToSet: {
            cart: {
              name: req.body.name,
              _id: itemId,
              productImg: req.body.productImg,
              // price: data.price,
              original_price: req.body.original_price,
              sellingPrice: req.body.sellingPrice,
              off: req.body.off,
              stock: req.body.stock,
              displayinfo: req.body.displayinfo,
              sellerId: req.body.sellerId,
              cartqty: cartqty,
            },
          },
        }
      );
    }

    res.json({
      name: req.body.name,
      _id: itemId,
      productImg: req.body.productImg,
      // price: data.price,
      original_price: req.body.original_price,
      sellingPrice: req.body.sellingPrice,
      off: req.body.off,
      stock: req.body.stock,
      displayinfo: req.body.displayinfo,
      sellerId: req.body.sellerId,
      cartqty: cartqty,
    });
    // res.json({ data, cartqty });
  } catch (error) {
    res.send({ msg: error.message });
  }
});

// // add product to cart
// router.post("/api/user/addtocart/:id", async (req, res) => {
//   try {
//     const itemId = req.params.id;
//     const userId = req.body.userId;
//     const cartqty = req.body.cartqty;
//     // const data = await Products.findOne({ _id: itemId });
//     const userfound = await User.findOne({
//       _id: userId,
//       cart: { $elemMatch: { _id: itemId } },
//     });
//     if (userfound) {
//       const user = await User.updateOne(
//         { _id: userId, "cart._id": itemId },
//         {
//           // $pull: { cart: { _id: itemId } },
//           $set: {
//             "cart.$.name": req.body.name,
//             "cart.$._id": itemId,
//             "cart.$.productImg": req.body.productImg,
//             // price: data.price,
//             "cart.$.sellingPrice": req.body.sellingPrice,
//             "cart.$.original_price": req.body.original_price,
//             "cart.$.off": req.body.off,
//             "cart.$.stock": req.body.stock,
//             "cart.$.cartqty": cartqty,
//           },
//         }
//       );
//     } else {
//       const user = await User.updateOne(
//         { _id: userId },
//         {
//           $addToSet: {
//             cart: {
//               name: req.body.name,
//               _id: itemId,
//               productImg: req.body.productImg,
//               // price: data.price,
//               original_price: req.body.original_price,
//               sellingPrice: req.body.sellingPrice,
//               off: req.body.off,
//               stock: req.body.stock,
//               cartqty: cartqty,
//             },
//           },
//         }
//       );
//     }

//     res.json({
//       name: req.body.name,
//       _id: itemId,
//       productImg: req.body.productImg,
//       // price: data.price,
//       original_price: req.body.original_price,
//       sellingPrice: req.body.sellingPrice,
//       off: req.body.off,
//       stock: req.body.stock,
//       cartqty: cartqty,
//     });
//     // res.json({ data, cartqty });
//   } catch (error) {
//     res.send({ msg: error.message });
//   }
// });

// fetching products in cart
router.post("/api/user/cart", async (req, res) => {
  try {
    // console.log(req.body.id);
    // const newUser = await User.findOne({ _id: req.body.id });
    // const { cart } = newUser;
    // const data = await Products.find({ _id: { $in: cart } });
    const cartItems = await User.findOne({ _id: req.body.id }, { cart: 1 });
    // console.log(cartItems.cart);
    res.json(cartItems.cart);
  } catch (error) {
    res.send({ msg: error.message });
  }
});

// remove product from cart
router.post("/api/user/removefromcart/:id", async (req, res) => {
  try {
    const itemId = req.params.id;
    const userId = req.body.userId;
    const user = await User.updateOne(
      { _id: userId },
      { $pull: { cart: { _id: itemId } } }
    );
    res.json(user);
  } catch (error) {
    res.send({ msg: error.message });
  }
});

// fetching userDetails with id
router.post("/api/user/details/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findOne({ _id: userId });
    // console.log(user);
    res.json(user);
  } catch (error) {
    res.send({ msg: error.message });
  }
});

// add to wishlist
// router.post("/api/user/addtowishlist/:id", async (req, res) => {
//   try {
//     const itemId = req.params.id;
//     const userId = req.body.userId;
//     const user = await User.findOne({ _id: userId });
//     const { wishlist } = user;
//     if (wishlist.find((e) => e === itemId)) {
//       var wish = await User.updateOne(
//         { _id: userId },
//         { $pull: { wishlist: itemId } }
//       );
//       res.json(wishlist.filter((x) => x !== itemId));
//     } else {
//       var wish = await User.updateOne(
//         { _id: userId },
//         { $push: { wishlist: itemId } }
//       );
//       res.json([...wishlist, itemId]);
//     }
//   } catch (error) {
//     res.send({ msg: error.message });
//   }
// });

// add to wishlist and fetching wishlist items
router.post("/api/user/addtowishlist/:id", async (req, res) => {
  try {
    const itemId = req.params.id;
    const productImg = req.body.productImg;
    const name = req.body.name;
    const sellingPrice = req.body.sellingPrice;
    const original_price = req.body.original_price;
    const off = req.body.off;
    const userId = req.body.userId;

    const user = await User.findOne({ _id: userId });
    const { wishlist } = user;
    if (wishlist.find((e) => e.id === itemId)) {
      var wish = await User.updateOne(
        { _id: userId },
        { $pull: { wishlist: { id: itemId } } }
      );
      res.json(wishlist.filter((x) => x.id !== itemId));
    } else {
      var wish = await User.updateOne(
        { _id: userId },
        {
          $push: {
            wishlist: {
              id: itemId,
              productImg: productImg,
              name: name,
              original_price,
              sellingPrice,
              off: off,
            },
          },
        }
      );
      res.json([
        ...wishlist,
        {
          id: itemId,
          productImg: productImg,
          name: name,
          original_price,
          sellingPrice,
          off: off,
        },
      ]);
    }
  } catch (error) {
    // console.log(error);
    res.send({ msg: error.message });
  }
});
// update profile info
router.post("/api/user/updateprofileinfo", async (req, res) => {
  const fname = req.body.fname;
  const lname = req.body.lname;
  const mobileno = req.body.mobileno;
  const email = req.body.email;
  const gender = req.body.gender;
  const userId = req.body.userId;
  try {
    const user = await User.updateOne(
      { _id: userId },
      {
        fname: fname,
        lname: lname,
        email: email,
        mobileno: mobileno,
        gender: gender,
      }
    );
    res.json(data);
  } catch (error) {
    res.send({ msg: error.message });
  }
});

// fetching products in wishlist
// router.post("/api/user/wishlist", async (req, res) => {
//   try {
//     const userId = req.body.userId;
//     const newUser = await User.findOne({ _id: userId });
//     const { wishlist } = newUser;
//     const data = await Products.find({ _id: { $in: wishlist } });
//     // console.log(user);
//     res.json(data);
//   } catch (error) {
//     res.send({ msg: error.message });
//   }
// });

// saving address
router.post("/api/user/saveaddress", async (req, res) => {
  try {
    const userId = req.body.userId;
    const data = req.body.data;
    const addId = req.body.addId;
    const defaultId = req.body.defaultId;

    // setting previous default to false
    if (defaultId) {
      const address = await User.updateOne(
        {
          _id: userId,
          "address._id": defaultId,
        },
        {
          $set: {
            "address.$.default": false,
          },
        }
      );
    }
    const user = {
      // name: req.body.name,
      name: data.name,
      address: data.addres,
      locality: data.locality,
      mobileno: data.mobileno,
      landmark: data.landmark,
      alternatemobile: data.alternateno,
      city: data.city,
      district: data.district,
      pincode: data.pincode,
      state: data.state,
      default: true,
    };
    if (addId) {
      const address = await User.updateOne(
        {
          _id: userId,
          "address._id": addId,
        },
        // { $pull: { address: { _id: addId } } }
        {
          // $pull: { cart: { _id: itemId } },
          $set: {
            "address.$.name": data.name,
            "address.$.mobileno": data.mobileno,
            "address.$.address": data.addres,
            // price: data.price,
            "address.$.locality": data.locality,
            "address.$.landmark": data.landmark,
            "address.$.alternatemobile": data.alternateno,
            "address.$.city": data.city,
            "address.$.district": data.district,
            "address.$.state": data.state,
            "address.$.pincode": data.pincode,
            "address.$.default": true,
          },
        }
      );
    } else {
      const address = await User.updateOne(
        {
          _id: userId,
        },
        { $addToSet: { address: user } }
      );
    }
  } catch (error) {
    console.log(error);
    res.send({ msg: error.message });
  }
});

// chosing default address
router.post("/api/user/defaultaddress", async (req, res) => {
  try {
    const userId = req.body.userId;
    const addId = req.body.addId;
    const defaultId = req.body.defaultId;
    if (defaultId) {
      const address = await User.updateOne(
        {
          _id: userId,
          "address._id": defaultId,
        },
        {
          $set: {
            "address.$.default": false,
          },
        }
      );
    }
    const address = await User.updateOne(
      {
        _id: userId,
        "address._id": addId,
      },
      {
        $set: {
          "address.$.default": true,
        },
      }
    );

    res.json(address);
  } catch (error) {
    res.send({ msg: error.message });
  }
});

// deleting address
router.post("/api/user/deleteaddress/:id", async (req, res) => {
  try {
    const userId = req.body.userId;
    const id = req.params.id;
    const address = await User.updateOne(
      { _id: userId },
      { $pull: { address: { _id: id } } }
    );

    res.json(address);
  } catch (error) {
    res.send({ msg: error.message });
  }
});

// signin
router.post("/api/user/signin", async (req, res) => {
  try {
    const Username = req.body.Username;
    const Password = req.body.Password;
    const user = await User.findOne(
      { username: Username, password: Password },
      { password: 0 }
    );
    user
      ? res.send({ user, token: getToken(user) })
      : res.status(401).send({ msg: "Incorrect Username or Password" });
  } catch (error) {
    res.send({ msg: error.message });
  }
});

router.post("/api/user/signup/validate", async (req, res) => {
  try {
    const details = req.body.data;
    const user = await User.findOne(details);
    if (!user) res.send("200");
    else res.send("500");
  } catch (error) {
    res.send({ msg: error.message });
  }
});

// sign up
router.post("/api/user/signup", async (req, res) => {
  try {
    const username = req.body.username;
    const email = req.body.email;
    const passwor = req.body.password;
    const mobileno = req.body.mobileno;
    const user1 = new User({
      username: username,
      email: email,
      password: passwor,
      mobileno: mobileno,
    });
    const newUser = await user1.save();
    // const newUser=await User.find({});
    const {
      _doc: { password, ...user },
    } = newUser;

    newUser ? res.send({ user, token: getToken(user) }) : "";
    // res.json(newUser);
  } catch (error) {
    res.send({ msg: error.message });
  }
});

// seller routes
// seller sign up
router.post("/api/seller/signup", async (req, res) => {
  try {
    // const category = req.params.category;
    const data = req.body.details;
    const user = new Seller(data);
    const newUser = await user.save();

    // const newUser=await User.find({});
    // const newUser = await Products.find({});
    const {
      _doc: { password, ...userDetails },
    } = newUser;
    newUser
      ? res.send({ ...userDetails, token: getsellerToken(userDetails) })
      : "";
    // res.json(newUser);
  } catch (error) {
    res.send({ msg: error.message });
  }
});
// seller update details
router.post("/api/seller/update/:id", async (req, res) => {
  try {
    const sellerId = req.params.id;
    const data = req.body.details;
    const address = await Seller.updateOne({ _id: sellerId }, data);
    // const newUser=await User.find({});
    // const newUser = await Products.find({});
    res.json(address);
  } catch (error) {
    res.send({ msg: error.message });
  }
});

// seller login
router.post("/api/seller/signin", async (req, res) => {
  try {
    const mobileno = req.body.mobileno;
    const Password = req.body.Password;
    const userDetails = await Seller.findOne(
      { mobileno: mobileno, password: Password },
      // { password: 0 }
      { name: 1, mobileno: 1, email: 1, _id: 1 }
    );
    userDetails
      ? res.send({ ...userDetails._doc, token: getsellerToken(userDetails) })
      : res.status(401).send({ msg: "Incorrect Mobile No. or Password" });
  } catch (error) {
    res.send({ msg: error.message });
  }
});

// user login credentials
router.post("/api/user/logincredentials", async (req, res) => {
  const id = req.body.id;
  // console.log(id);
  try {
    const user = await User.findOne({ _id: id }, { password: 1, username: 1 });
    res.json(user);
  } catch (error) {
    res.send({ msg: error.message });
  }
});
// update user login credentials
router.post("/api/user/updatelogincredentials", async (req, res) => {
  const id = req.body.id;
  const details = req.body.details;
  // console.log(details);
  try {
    const user = await User.updateOne({ _id: id }, details);
    // console.log(user);
    res.json(user);
  } catch (error) {
    res.send({ msg: error.message });
  }
});
// finding categories

router.post("/api/seller/cat", async (req, res) => {
  try {
    const userDetails = await Category.find({}, { _id: 0 });
    // console.log(userDetails);
    // console.log(userDetails[1]);
    res.send(userDetails[1]);
  } catch (error) {
    // console.log(error);
    res.send({ msg: error.message });
  }
});

export default router;

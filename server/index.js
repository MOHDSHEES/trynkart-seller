import express from "express";
// import Info from "./content";
// import { Server } from "socket.io";
import config from "./config.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./routes/userRoutes.js";
// import bodyParser from "body-parser";
import path from "path";
import http from "http";
import uploadRouter from "./routes/uploadRouter.js";
import sellerRoutes from "./routes/sellerRoutes.js";
import emailRoutes from "./routes/emailRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

// import Razorpay from "razorpay";

// database
dotenv.config();
const mongodbUrl = config.MONGODB_URL;
const PORT = process.env.PORT || 3001;
mongoose
  .connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .catch((error) => console.log(error.reason));
const __dirname = path.resolve();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "/my-project/build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "/my-project/build/index.html"))
);

app.use("/", userRoute);
app.use("/api/uploads", uploadRouter);
app.use("/api/seller", sellerRoutes);
app.use("/api", emailRoutes);
app.use("/api/payment", paymentRoutes);
const httpServer = http.Server(app);
httpServer.listen(PORT, () => {
  console.log(`Serve at http://localhost:${PORT}`);
});
// app.listen(PORT, () => {
//   console.log(`Server listening on ${PORT}`);
// });

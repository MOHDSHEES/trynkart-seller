import jwt from "jsonwebtoken";
import config from "./config.js";
const getToken = (user) => {
  return jwt.sign(
    { _id: user._id, username: user.username },
    // user,
    config.JWT_SECRET,
    { expiresIn: "24h" }
  );
};

const getsellerToken = (user) => {
  return jwt.sign(
    // { _id: user._id, username: user.username },
    { user },
    config.JWT_SECRET,
    { expiresIn: "24h" }
  );
};

export { getToken, getsellerToken };

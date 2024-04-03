import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
export const verifyJWT = async (req, res, next) => {
  try {
    let token =  req.headers["authorization"];
    if (token && token.startsWith('Bearer ')) {
      // Remove 'Bearer ' from the token string
      token = token.slice(7);
  } else {
      // Check if token is present in cookies
      token = req.cookies.token;
  }


    if (!token) {
      throw new ApiError(401, "unauthorized request here i am");
    }

    const user = jwt.verify(token, process.env.JWT_KEY);
    req.userId = user.id;
    next();
  } catch (error) {
    res.status(401).json({ message: error.message || "JWT verify failed" });
    next(error);
  }
};

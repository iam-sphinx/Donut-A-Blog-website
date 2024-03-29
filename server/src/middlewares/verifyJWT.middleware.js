import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
export const verifyJWT = async (req, res, next) => {
  try {
 
    const token = req.cookies.access_token;
   
    if (!token) {
      throw new ApiError(401, "unauthorized request");
    }

    const user = jwt.verify(token, process.env.JWT_KEY);
    req.userId = user.id;
    next();
  } catch (error) {
    next(error);
  }
};

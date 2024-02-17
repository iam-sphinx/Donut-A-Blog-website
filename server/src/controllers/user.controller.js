import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { apiResponse } from "../utils/apiResponse.js";
import mongoose from "mongoose";
import {
  deleteImageFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinaryUpload.js";

// register controller
// unprotected
// /api/v1/user/register
const registerUser = asyncHandler(async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existedUser) {
      throw new ApiError(401, "User already Existed");
    }

    const hashPass = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashPass,
    });

    const savedUser = await User.create(newUser);
    const returnData = savedUser._doc;

    if (!savedUser) {
      throw new ApiError(500, "Something went wrong while registering a user");
    }
    res.status(200).json({
      message: "User has  been successfully registered",
      data: { ...returnData, password: "" },
    });
  } catch (error) {
    res.status(error.status || 400).json({ error });
  }
});

// login controller
// /api/v1/users/login
// unauthorized

const loginUser = asyncHandler(async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      throw new ApiError(400, "User has not been registered yet.");
    }

    const passCheck = await bcrypt.compare(password, user.password);

    if (!passCheck) {
      throw new ApiError(401, "Invalid credentials");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
      expiresIn: "1h",
    });
    const options = {
      httpOnly: true,
      secure: false,
    };

    const filterUser = { ...user._doc, password: "" };

    res
      .status(200)
      .cookie("access_token", token, options)
      .json(
        apiResponse(200, "user logged in successfully", {
          ...filterUser,
        })
      );
  } catch (error) {
    res.status(error.status).json("Something went wrong while login route");
  }
});

// login controller
// /api/v1/users/login
// unauthorized

const getUser = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;

    // Convert the id parameter to ObjectId
    const userId = new mongoose.Types.ObjectId(String(id));

    const user = await User.aggregate([
      {
        $match: {
          _id: userId,
        },
      },
      {
        $lookup: {
          from: "blogs",
          localField: "_id",
          foreignField: "authorId",
          as: "blogs",
        },
      },
      {
        $addFields: {
          blogsCount: { $size: "$blogs" },
        },
      },
      {
        $lookup: {
          from: "followers",
          localField: "_id",
          foreignField: "followTo",
          as: "followers",
        },
      },
      {
        $addFields: {
          followersCount: { $size: "$followers" },
        },
      },
      {
        $lookup: {
          from: "followers",
          localField: "_id",
          foreignField: "followBy",
          as: "followAccounts",
        },
      },
      {
        $addFields: {
          followCount: { $size: "$followAccounts" },
        },
      },
      {
        $project: {
          followers: 0,
          password: 0,
          followAccounts: 0,
        },
      },
    ]);

    if (!user || user.length === 0) {
      throw new ApiError(404, "No user found");
    }

    return res
      .status(200)
      .json(apiResponse(200, "Successfully fetched user", user[0]));
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

const updateUser = asyncHandler(async (req, res, next) => {
  try {
    const { bio, quote } = req.body;
    const id = req.userId;
    const fileData = req.files;
    const profile = fileData?.profile ? fileData?.profile[0].path : null;
    const cover = fileData?.cover ? fileData?.cover[0].path : null;

    const toUpdateData = {};

    if (bio) {
      toUpdateData.bio = bio;
    }

    if (quote) {
      toUpdateData.quote = quote;
    }

    if (profile) {
      const profilePicUrl = await uploadOnCloudinary(profile);
      toUpdateData.profilePicUrl = profilePicUrl;
    }

    if (cover) {
      const coverPicUrl = await uploadOnCloudinary(cover);
      toUpdateData.coverPicUrl = coverPicUrl;
    }

    const response = await User.findByIdAndUpdate(
      id,
      { $set: toUpdateData },
      { new: true }
    );
    if (!response) {
      throw new ApiError(501, "Internal server error");
    }

    res.status(200).json(apiResponse(200, "Success", response));
  } catch (error) {
    return res
      .status(error.status)
      .json(error.message || "Internal Server Error");
  }
});

const updateCredential = asyncHandler(async (req, res, next) => {
  try {
    const id = req.userId;
    const { password, email, username } = req.body;
    const updateData = {};
    let hashPass = null;
    if (password) {
      hashPass = await bcrypt.hash(password, 10);
    }
    if (email) updateData.email = email;
    if (password) updateData.password = hashPass;
    if (username) updateData.username = username;

    const response = await User.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    ).select("-password");

    res
      .status(200)
      .json(apiResponse(200, "Successfully updated credentials", response));
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

export { loginUser, registerUser, getUser, updateUser, updateCredential };

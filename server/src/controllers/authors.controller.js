import mongoose from "mongoose";
import { Blog } from "../models/blog.model.js";
import { Follower } from "../models/follower.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { apiResponse } from "../utils/apiResponse.js";

// fetch authors details
// unprotected
// api/v1/authors
const getAllAuthors = asyncHandler(async (req, res, next) => {
  try {
    const authorsWithBlogs = await User.aggregate([
      {
        $lookup: {
          from: "blogs",
          localField: "_id",
          foreignField: "authorId",
          as: "blogs",
        },
      },
      {
        $match: {
          blogs: { $exists: true, $ne: [] },
        },
      },
      {
        $addFields: {
          postCount: { $size: "$blogs" },
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
          followerCount: { $size: "$followers" }, // Add a new field "followerCount" with the count of followers
        },
      },
      {
        $lookup: {
          from: "followers",
          localField: "_id",
          foreignField: "followBy",
          as: "followList",
        },
      },
      {
        $project: {
          followers: 0,
          blogs: 0,
          followList: 0,
        },
      },
    ]);

    if (!authorsWithBlogs || authorsWithBlogs.length === 0) {
      throw new ApiError(404, "No authors found with blogs");
    }

    return res
      .status(200)
      .json(
        apiResponse(
          200,
          "Successfully fetched authors with blogs",
          authorsWithBlogs
        )
      );
  } catch (error) {
    console.log("Error occurred in author route", error);
    return res.status(400).json(error);
  }
});

// fetch author details
// unprotected
// api/v1/authors/:authorId
const getAuthor = asyncHandler(async (req, res, next) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findById(blogId);

    if (!blog) {
      throw new ApiError(404, "No author found");
    }

    const user = await User.findById(blog.authorId).select("-password");
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    return res
      .status(200)
      .json(apiResponse(200, "Successfully fetched author details", user));
  } catch (error) {
    console.log("error occured in getting author data", error);
    return res.status(500).json(error);
  }
});

const followAuthor = asyncHandler(async (req, res, next) => {
  try {
    const { authorId } = req.params;
    const id = req.userId;

    const check = await Follower.findOne({ followBy: id, followTo: authorId });

    if (check) {
      throw new ApiError(401, "Only follow once");
    }

    const followData = new Follower({
      followBy: id,
      followTo: authorId,
    });

    const response = await followData.save();

    if (!response) {
      throw new ApiError(500, "Internal server error");
    }

    return res
      .status(200)
      .json(apiResponse(200, "Successfully followed", response));
  } catch (error) {
    console.log("error generated while in follow the author", error);
    return res.status(500).json({ message: error.message });
  }
});

const unfollowAuthor = asyncHandler(async (req, res, next) => {
  try {
    const { authorId } = req.params;
    const id = req.userId;

    await Follower.findOneAndDelete({ followBy: id, followTo: authorId });
    return res.status(200).json("Successfully unfollowed user");
  } catch (error) {
    return req.status(500).json({
      message: error.message || "something went wrong while unfollow",
    });
  }
});

const getAuthorDetails = asyncHandler(async (req, res, next) => {
  try {
    const { authorId } = req.params;
    const id = new mongoose.Types.ObjectId(String(authorId));
    const response = await User.aggregate([
      // match user id
      {
        $match: {
          _id: id,
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
          blogCount: {
            $size: "$blogs",
          },
        },
      },
      {
        $lookup: {
          from: "profiles",
          localField: "_id",
          foreignField: "userId",
          as: "profile",
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
          followCount: {
            $size: "$followers",
          },
        },
      },
      {
        $project: {
          followers: 0,
          password: 0,
        },
      },
    ]);
    if (!response) {
      throw new ApiError(404, "No posts found");
    }

    return res
      .status(200)
      .json(apiResponse(200, "Successfully fetched all posts", response));
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

const checkFollower = asyncHandler(async (req, res, next) => {
  try {
    const id = req.userId;
    const { authorId } = req.params;

    const response = await Follower.findOne({
      followBy: id,
      followTo: authorId,
    });

    if (!response) {
      return res.status(200).json(apiResponse(200, "Success", false));
    }

    res.status(200).json(apiResponse(200, "Success", true));
  } catch (error) {
    res.status(error.status).json(error.message);
  }
});
export {
  getAllAuthors,
  getAuthor,
  followAuthor,
  unfollowAuthor,
  getAuthorDetails,
  checkFollower,
};

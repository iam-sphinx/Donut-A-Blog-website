import mongoose from "mongoose";
import { Blog } from "../models/blog.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { apiResponse } from "../utils/apiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinaryUpload.js";
import { v2 as cloudinary } from "cloudinary";

// fetch blog data
// unprotected
// /api/v1/blogs/
const getBlog = asyncHandler(async (req, res, next) => {
  // fetch data from db
  try {
    const { category } = req.query;

    const response = await Blog.aggregate([
      {
        $match: {
          category: category,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "authorId",
          foreignField: "_id",
          as: "author",
        },
      },
      {
        $project: {
          _id: 1,
          authorId: 1,
          title: 1,
          content: 1,
          category: 1,
          imgUrl: 1,
          createdAt: 1,
          "author.username": 1,
          "author.profilePicUrl": 1,
        },
      },
    ]);
    if (!response) {
      throw new ApiError(404, "No data found");
    }

    res.status(200).json(apiResponse(200, "Success", response));
  } catch (error) {
    return res.status(400, error);
  }
});

// create blog data
// protected
// /api/v1/blogs/:id
const createBlog = asyncHandler(async (req, res, next) => {
  try {
    const id = req.userId;
    const { content, title, category } = req.body;
    const coverImage = req.file;

    let coverImageUrl = "";

    if (!content) {
      throw new ApiError(500, "Content is required");
    }
    if (coverImage) {
      // try uploading on cloudinary
      coverImageUrl = await uploadOnCloudinary(coverImage.path);
    }

    const newBlog = new Blog({
      title,
      content,
      category,
      authorId: id,
      imgUrl: coverImageUrl,
    });

    const response = await newBlog.save();

    if (!response) {
      throw new ApiError(
        500,
        "internal server error occured while creating a new blog"
      );
    }

    return res
      .status(200)
      .json(apiResponse(200, "Successfully created blog", response));
  } catch (error) {
    return res
      .status(error.status)
      .json({ error: error.message || "JWT ERROR" });
  }
});

// update blog data
// protected
// /api/v1/posts/update/:blogId
const updateBlog = asyncHandler(async (req, res, next) => {
  try {
    const { blogId } = req.params;
    const userId = req.userId;
    let coverImageUrl = null;
    const coverImage = req.file;

    const blog = await Blog.findById(blogId);

    if (!blog) {
      throw new ApiError(404, "No Blog Exist");
    }

    // now check if user is author or not
    const { authorId } = blog;
    if (authorId != userId) {
      throw new ApiError(401, "Only author can update the blog");
    }

    if (coverImage) {
      const publicId = blog.imgUrl.split("/").pop().split(".")[0];
      // first delete saved file in cloudinary
      cloudinary.uploader
        .destroy(publicId, { resource_type: "image" })
        .then((res) => console.log(res));

      // try uploading on cloudinary
      coverImageUrl = await uploadOnCloudinary(coverImage.path);
    }
    const response = await Blog.findByIdAndUpdate(
      blogId,
      {
        $set: { ...req.body, imgUrl: coverImageUrl ?? blog.imgUrl },
      },
      { new: true }
    );

    if (!response) {
      throw new ApiError(
        500,
        "internal server error occured while updating a blog"
      );
    }

    return res
      .status(200)
      .json(apiResponse(200, "successfully updated blog", response));
  } catch (error) {
    return res.status(400).json(error);
  }
});

// delete blog data
// protected
// /api/v1/posts/delete/:blogId
const deleteBlog = asyncHandler(async (req, res, next) => {
  try {
    const { blogId } = req.params;
    const id = req.userId;

    const blog = await Blog.findById(blogId);
    if (blog.authorId != id) {
      throw new ApiError(401, "only author can delete blog");
    }

    await Blog.findByIdAndDelete(blogId);
    return res.status(200).json(apiResponse(200, "Successfully deleted blog"));
  } catch (error) {
    return res.status(400).json(error);
  }
});

const getOneBlog = asyncHandler(async (req, res, next) => {
  try {
    const { blogId } = req.params;
    const id = new mongoose.Types.ObjectId(String(blogId));
    const blog = await Blog.aggregate([
      {
        $match: {
          _id: id,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "authorId",
          foreignField: "_id",
          as: "author",
        },
      },
      {
        $unset: "author.password",
      },
    ]);

    if (!blog) {
      throw new ApiError(404, "No blog found");
    }

    return res
      .status(200)
      .json(apiResponse(200, "Successfully fetched blog post", blog[0]));
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

// protected route
// like/:blogId
const likeBlog = asyncHandler(async (req, res) => {});

export { getBlog, createBlog, updateBlog, deleteBlog, getOneBlog, likeBlog };

import { Router } from "express";
import {
  createBlog,
  deleteBlog,
  getBlog,
  updateBlog,
  getOneBlog,
  likeBlog,
} from "../controllers/blogs.controller.js";
import { verifyJWT } from "../middlewares/verifyJWT.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();
router.route("/:blogId").get(getOneBlog);

router.route("/").get(getBlog);
router
  .route("/create")
  .post(verifyJWT, upload.single("coverImage"), createBlog);
router
  .route("/update/:blogId")
  .put(verifyJWT, upload.single("coverImage"), updateBlog);
router.route("/delete/:blogId").delete(verifyJWT, deleteBlog);

router.route("/like/:blogId").post(verifyJWT, likeBlog);

export default router;

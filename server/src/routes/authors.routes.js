import { Router } from "express";
import {
  followAuthor,
  getAllAuthors,
  getAuthor,
  unfollowAuthor,
  checkFollower,
  getAuthorDetails,
} from "../controllers/authors.controller.js";
import { verifyJWT } from "../middlewares/verifyJWT.middleware.js";

const router = Router();

router.route("/").get(getAllAuthors);
router.route("/:authorId").get(getAuthorDetails);
router.route("/:blogId").get(getAuthor);
router.route("/follow/check/:authorId").get(verifyJWT, checkFollower)
router.route("/follow/:authorId").get(verifyJWT, followAuthor);
router.route("/unfollow/:authorId").get(verifyJWT, unfollowAuthor);

export default router;
import { Router } from "express";
import {
  loginUser,
  registerUser,
  getUser,
  updateUser,
  updateCredential,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/verifyJWT.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/profile/:id").get(verifyJWT,getUser);
router.route("/profile/update").put(
  verifyJWT,
  upload.fields([
    { name: "profile", maxCount: 1 },
    { name: "cover", maxCount: 1 },
  ]),
  updateUser
);

router.route("/profile/update/credentials").put(verifyJWT, updateCredential);

export default router;

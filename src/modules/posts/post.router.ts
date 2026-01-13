import express, { Router } from "express";
import { postController } from "./post.controller";
import auth, { UserRole } from "../../middleware/auth";

const router = express.Router();

router.post("/", auth(UserRole.USER,UserRole.ADMIN), postController.createPost);

router.get("/", auth(UserRole.USER, UserRole.ADMIN), postController.getAllPost);

router.get("/:id", postController.getPostById);

router.get(
  "/post/my-posts",
  auth(UserRole.USER, UserRole.ADMIN),
  postController.getMyPosts
);

export const postRouter: Router = router;

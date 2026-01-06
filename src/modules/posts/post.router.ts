import express, { NextFunction, Request, Response, Router } from "express";
import { postController } from "./post.controller";
import auth, { UserRole } from "../../middleware/auth";

const router = express.Router();

router.post("/post", auth(UserRole.USER), postController.createPost);

router.get("/", postController.getAllPost);

export const postRouter: Router = router;

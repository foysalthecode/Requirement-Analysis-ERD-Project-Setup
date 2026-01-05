import { Request, Response } from "express";
import { postService } from "./post.service";

const createPost = async (req: Request, res: Response) => {
  try {
    const result = await postService.createPost(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(401).json({
      error: "Post Creation Failed",
      details: err,
    });
    console.log(err);
  }
};

const getAllPost = async (req: Request, res: Response) => {
  try {
    const result = await postService.getAllPost();
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({
      error: "Didn't Find any data",
      details: err,
    });
    console.log(err);
  }
};

export const postController = {
  createPost,
  getAllPost,
};

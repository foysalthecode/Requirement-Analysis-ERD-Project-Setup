import { Request, Response } from "express";
import { postService } from "./post.service";
import { PostStatus } from "../../../generated/prisma/enums";
import paginationSortingHelper from "../../helpers/paginationNsorting";
import { UserRole } from "../../middleware/auth";

const createPost = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(400).json({
        error: "Unauthorized",
      });
    }
    const result = await postService.createPost(req.body, user?.id);
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
    const { search } = req.query;
    const searchString = typeof search === "string" ? search : undefined;
    const tags = req.query.tags ? (req.query.tags as string).split(",") : [];
    const isFeatured = req.query.isFeatured
      ? req.query.isFeatured === "true"
        ? true
        : req.query.isFeatured === "false"
        ? false
        : undefined
      : undefined;

    const status = req.query.status as PostStatus | undefined;

    const authorId = req.query.authorId as string | undefined;

    const { page, limit, skip, sortBy, sortOrder } = paginationSortingHelper(
      req.query
    );
    const result = await postService.getAllPost({
      search: searchString,
      tags,
      isFeatured,
      status,
      authorId,
      page,
      limit,
      skip,
      sortBy,
      sortOrder,
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({
      error: "Didn't Find any data",
      details: err,
    });
    console.log(err);
  }
};

const getPostById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new Error("Post Id is Required !!");
    }

    const result = await postService.getPostById(id);
    return res.status(200).json(result);
  } catch (err) {
    res.status(404).json({
      error: "Did not Find any data",
      details: err,
    });
  }
};

const getMyPosts = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("Post Id is Required !!");
    }
    console.log(user);
    const result = await postService.getMyPosts(user.id);
    return res.status(200).json(result);
  } catch (err) {
    res.status(404).json({
      error: "Didn't Find any data",
      details: err,
    });
  }
};

const updatePost = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("Post Id is Required !!");
    }
    const { postId } = req.params;
    const isAdmin = user.role === UserRole.ADMIN
    const result = await postService.updatePost(
      postId as string,
      req.body,
      user.id,
      isAdmin
    );
    return res.status(200).json(result);
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Post Update Failed";
    return res.status(400).json({
      error: errorMessage,
      details: err,
    });
  }
};

export const postController = {
  createPost,
  getAllPost,
  getPostById,
  getMyPosts,
  updatePost,
};

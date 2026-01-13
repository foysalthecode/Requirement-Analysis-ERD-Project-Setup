import { Request, Response } from "express";
import { commentService } from "./comment.service";

const createComment = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    req.body.authorId = user?.id;
    const result = await commentService.createComment(req.body);
    return res.status(201).json(result);
  } catch (err) {
    res.status(400).json({
      error: "Comment Creation Failed",
      details: err,
    });
  }
};

const getCommentById = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    const result = await commentService.getCommentById(commentId as string);
    return res.status(200).json(result);
  } catch (err) {
    res.status(400).json({
      error: "Comment Fetched Failed",
      details: err,
    });
  }
};

const getCommentByAuthor = async (req: Request, res: Response) => {
  try {
    const { authorId } = req.params;
    const result = await commentService.getCommentByAuthor(authorId as string);
    return res.status(200).json(result);
  } catch (err) {
    res.status(400).json({
      error: "Comment Fetched Failed",
      details: err,
    });
  }
};

const deleteComment = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const { commentId } = req.params;
    const result = await commentService.deleteComment(
      commentId as string,
      user?.id as string
    );
    return res.status(200).json({
      success: true,
      message: "successfully deleted",
      result,
    });
  } catch (err) {
    res.status(400).json({
      error: "Comment Delete Failed",
      details: err,
    });
  }
};

export const commentController = {
  createComment,
  getCommentById,
  getCommentByAuthor,
  deleteComment,
};

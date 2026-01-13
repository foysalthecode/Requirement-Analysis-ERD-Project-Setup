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
      error: "Comment Creation Failed",
      details: err,
    });
  }
};

export const commentController = { createComment, getCommentById };

import express from "express";
import {
  createComment,
  getCommentById,
  updateComment,
  deleteComment,
} from "../controllers/CommentController";
import authorizationMiddleware from "../middlewares/AuthorizationMiddleware";

const CommentRoutes = express.Router();

CommentRoutes.post("/add", authorizationMiddleware('add-comment'), createComment);
CommentRoutes.get("/:id", authorizationMiddleware('comment'), getCommentById);
CommentRoutes.put("/update/:id", authorizationMiddleware('comment'), updateComment);
CommentRoutes.delete("/delete/:id", authorizationMiddleware('comment'), deleteComment);

export default CommentRoutes;

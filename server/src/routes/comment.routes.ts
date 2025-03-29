import { Router } from "express";
import { requireAuth } from "@src/middleware/auth.middleware";
import { CommentController } from "@src/controller/comments.controller";
const commentRouter = Router();

commentRouter
  .post("/create/:postEventId", requireAuth(), CommentController.CreateComment)
  .get(
    "/event/:postEventId",
    requireAuth(),
    CommentController.GetCommentsByEvent
  )
  .delete(
    "/event/:commentId",
    requireAuth(),
    CommentController.DeleteComment
  );

export default commentRouter;

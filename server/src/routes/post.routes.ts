import { Router } from "express";
import { PostController } from "@src/controller/post.controller";
const postRouter = Router();
import { upload } from "@src/middleware/multer.middleware";
import { requireAuth } from "@src/middleware/auth.middleware";

postRouter
.post("/media-url",requireAuth(), upload.single("media"), PostController.GetMediaUrl)
.patch("/event/:postEventId",requireAuth(), PostController.UpdatePost)
.get("/event/:postEventId",requireAuth(), PostController.GetPostByEventId)
.patch("/client/request/:postEventId",requireAuth(), PostController.SendInviteToAskForPublish)
.patch("/client/accept/:postEventId",requireAuth(), PostController.AcceptPublishRequest)

export default postRouter;

import { Router } from "express";
import { PostController } from "@src/controller/post.controller";
const postRouter = Router();
import { upload } from "@src/middleware/multer.middleware";
import { requireAuth } from "@src/middleware/auth.middleware";

postRouter
.post("/getaihelp",requireAuth(), upload.single("image"), PostController.GetAiContent)
.post("/:clientId",requireAuth(), upload.single("image"), PostController.CreatePost)
.get("/:clientId",requireAuth(),  PostController.GetAllposts)
.get("/schedule",requireAuth(),  PostController.TimeSchedule)
.get("/stats/admin",requireAuth(),  PostController.GetAllStatsForAdmin)
.get("/monthly/admin",requireAuth(),  PostController.PostsCreatedMonthlyForAdmin)
.get("/stats/client",requireAuth(),  PostController.GetAllStatsForClient)
.get("/stats/member",requireAuth(),  PostController.GetMembersStats)
.get("/monthly/client",requireAuth(),  PostController.PostsCreatedMonthlyForClient)
.get("/all/clientpost",requireAuth(),  PostController.GetAllClientPosts)
.get("/list/clients",requireAuth(),  PostController.GetAssignedClients)
.post("/confirm/:postId",requireAuth(),  PostController.ConfirmByClient)
.post("/edit/:postId",requireAuth(), upload.single("image"),  PostController.PostEdit)

export default postRouter;

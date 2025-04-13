import authRouter from "./auth.routes";
import commentRouter from "./comment.routes";
import participantRouter from "./participant.routes";
import postRouter from "./post.routes";

export default [
  {
    path: "auth",
    router: authRouter,
  },

  {
    path: "posts",
    router: postRouter,
  },
  {
    path: "participants",
    router: participantRouter,
  },
  {
    path: "comments",
    router: commentRouter,
  },
];

import { Router } from "express";
import { ParticipantController } from "@src/controller/participant.controller";
import { requireAuth } from "@src/middleware/auth.middleware";
import { upload } from "@src/middleware/multer.middleware";

const participantRouter = Router();

participantRouter
  .post("/clients",requireAuth(), upload.single("logo"), ParticipantController.createClient)
  .get("/clients", requireAuth(), ParticipantController.getAllClients)
  .get("/members", requireAuth(), ParticipantController.getAllMembers)
  .get("/members/suggestion", requireAuth(), ParticipantController.getAllMembersSuggestion)
  .post("/members", requireAuth(), ParticipantController.createMember)
  .post("/core-members", requireAuth(), ParticipantController.createCoreMember)
  .get("/core-members", requireAuth(), ParticipantController.getAllCoreMembers)
  .post("/invite/client", requireAuth(), ParticipantController.sendInviteToClient)
  .post("/edit/client", requireAuth(), ParticipantController.editClient)
  .post("/edit/member", requireAuth(), ParticipantController.editMember)

export default participantRouter;

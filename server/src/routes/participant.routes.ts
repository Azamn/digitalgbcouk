import { Router } from "express";
import { ParticipantController } from "@src/controller/participant.controller";
import { requireAuth } from "@src/middleware/auth.middleware";

const participantRouter = Router();

participantRouter
  .post("/clients", ParticipantController.CreateClient)
  .get("/clients", requireAuth(), ParticipantController.GetAllClients)
  .get("/members", requireAuth(), ParticipantController.GetAllMembers)
  .post("/members", requireAuth(), ParticipantController.CreateMember)
  .post("/invite/client", requireAuth(), ParticipantController.SendInviteToClient)

export default participantRouter;

import { Router } from "express";
import { ParticipantController } from "@src/controller/participant.controller";
import { requireAuth } from "@src/middleware/auth.middleware";

const participantRouter = Router();

participantRouter
  .post("/", requireAuth(), ParticipantController.CreateParticipants)
  .get("/clients", requireAuth(), ParticipantController.GetAllClients)
  .get("/members", requireAuth(), ParticipantController.GetAllMembers)
  .delete("/:participantId", requireAuth(), ParticipantController.DeleteParticipant)
  .patch("/:participantId", requireAuth(), ParticipantController.EditParticipant)
  .post("/send/invite", requireAuth(), ParticipantController.SendInviteToParticipants)
  .get("/suggestion", requireAuth(), ParticipantController.GetSuggestions)
  
export default participantRouter;
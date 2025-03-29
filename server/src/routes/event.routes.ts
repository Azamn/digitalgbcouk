import { Router } from "express";
import { requireAuth } from "@src/middleware/auth.middleware";
import { EventController } from "@src/controller/event.controller";

const eventRouter = Router();

eventRouter
  .get("/details", requireAuth(), EventController.GetallEventsDetails)
  .get("/details/member", requireAuth(), EventController.GetEventDetailsAssignedToMembers)
  .get("/details/client", requireAuth(), EventController.GetEventDetailsForClient)
  .post("/create/:clientId", requireAuth(), EventController.CreateEvent)
  .delete("/:eventId", requireAuth(), EventController.DeleteEvent)
  .patch("/:eventId", requireAuth(), EventController.EditEvent)
  .post("/:eventId/members", requireAuth(), EventController.AddMembersToEvent)
  .get("/event-stats/admin", requireAuth(), EventController.GetEventStatsForAdmin)
  .get("/event-stats/client", requireAuth(), EventController.GetEventsStatsForClient)
  .get("/event-stats/member", requireAuth(), EventController.GetEventsStatsForMembers)
  .get("/event-created/monthly/admin", requireAuth(), EventController.EventsCreatedMonthlyForAdmin)
  .get("/event-assigned/monthly/member", requireAuth(), EventController.GetEventsAssignedToMemberMonthly)
  .get("/event-assigned/monthly/date", requireAuth(), EventController.GetEventsByDate)
  .get("/search", requireAuth(), EventController.GetEventsByText)
  .post("/cleint/insata", requireAuth(), EventController.ClientEditInstagram)

export { eventRouter };
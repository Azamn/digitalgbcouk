import { db } from "@src/db";
import { format } from "date-fns";
import { startOfWeek, endOfWeek } from "date-fns";

import {
  ApiError,
  ApiResponse,
  AsyncHandler,
} from "@src/utils/server-functions";
import { Request, Response } from "express";
import { initialPost } from "@src/constant";
export class EventController {
  public static GetallEventsDetails = AsyncHandler(
    async (_req: Request, res: Response): Promise<void> => {
      const eventsDetails = await db.event.findMany({
        select: {
          id: true,
          title: true,
          client: {
            select: {
              name: true,
              instagramId: true,
              instagramPassword: true,
            },
          },
          startTime: true,
          endTime: true,
          members: {
            select: {
              member: {
                select: {
                  name: true,
                  email: true,
                },
              },
            },
          },
          description: true,
          additional: true,
        },
      });

      res.json(
        new ApiResponse(
          200,
          "All  events retrieved successfully",
          eventsDetails
        )
      );
    }
  );

  public static CreateEvent = AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const { clientId } = req.params;
      const { additional, description, endTime, startTime, title, postData } =
        req.body;
      const user = await db.user.CheckUserId(req);

      await db.$transaction(async (tx) => {
        const event = await tx.event.create({
          data: {
            title,
            startTime,
            endTime,
            description,
            clientId,
            additional,
            adminId: user.id,
          },
        });

        await tx.post.create({
          data: {
            eventId: event.id,
            additional: initialPost.additional,
            title: initialPost.title,
            subtitle: initialPost.subtitle,
            description: initialPost.description,
            hashtags: initialPost.hashtags,
            mediaUrl: initialPost.mediaUrl,
          },
        });
      });

      res.status(201).json(new ApiResponse(201, "Event started succesfully"));
    }
  );

  public static DeleteEvent = AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const { eventId } = req.params;

      await Promise.all([
        await db.user.CheckUserId(req),
        await db.event.CheckEventById(eventId),
      ]);

      await db.event.delete({
        where: { id: eventId },
      });

      res.status(200).json(new ApiResponse(200, "Event deleted successfully"));
    }
  );

  public static EditEvent = AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const { eventId } = req.params;
      const { title, description, additional, startTime, endTime } = req.body;

      const event = await db.event.findUnique({
        where: { id: eventId },
        select: { id: true, clientId: true },
      });

      if (!event) {
        res.status(404).json(new ApiResponse(404, "Event not found"));
        return;
      }
      const updatedEvent = await db.event.update({
        where: { id: eventId },
        data: { title, description, additional, startTime, endTime },
      });

      res.json(
        new ApiResponse(200, "Event updated successfully", updatedEvent)
      );
    }
  );

  public static AddMembersToEvent = AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const { eventId } = req.params;
      const { memberIds } = req.body;

      if (!memberIds?.length) {
        throw new ApiError(400, "No members selected to add");
      }

      const event = await db.event.findUnique({
        where: { id: eventId },
        select: { id: true, members: { select: { memberId: true } } },
      });

      if (!event) {
        throw new ApiError(404, "Event not found");
      }

      const existingMemberSet = new Set(
        event.members.map(({ memberId }) => memberId)
      );
      const newMembers = memberIds.filter(
        (id: string) => !existingMemberSet.has(id)
      );
      console.log("🚀 ~ EventController ~ newMembers:", newMembers);

      if (!newMembers.length) {
        throw new ApiError(400, "No new members selected to add");
      }

      await db.eventMember.createMany({
        data: newMembers.map((memberId: string) => ({
          eventId,
          memberId,
        })),
        skipDuplicates: true,
      });

      res.status(200).json(new ApiResponse(200, "Members added successfully"));
    }
  );

  public static GetEventStatsForAdmin = AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const user = await db.user.CheckUserId(req);
      const [totalPosts, totalEvents, totalMembers, totalClients] =
        await Promise.all([
          db.post.count({
            where: {
              event: { adminId: user.id },
            },
          }),
          db.event.count({
            where: {
              adminId: user.id,
            },
          }),
          db.member.count({
            where: {
              events: {
                some: {
                  event: {
                    adminId: user.id,
                  },
                },
              },
            },
          }),
          db.client.count({
            where: {
              events: {
                some: {
                  adminId: user.id,
                },
              },
            },
          }),
        ]);

      res.json(
        new ApiResponse(200, "All stats fetched succesfully", {
          totalPosts,
          totalEvents,
          totalMembers,
          totalClients,
        })
      );
    }
  );

  public static EventsCreatedMonthlyForAdmin = AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const events = await db.event.findMany({
        select: {
          id: true,
          title: true,
          createdAt: true,
        },
      });

      const eventsCreatedMonthly = events.reduce((acc, cur) => {
        const month = new Intl.DateTimeFormat("en-US", {
          month: "long",
        }).format(cur.createdAt);
        acc[month] = (acc[month] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      res.json(
        new ApiResponse(
          200,
          "Events created in the last month",
          eventsCreatedMonthly
        )
      );
    }
  );

  public static GetEventsStatsForClient = AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const user = await db.user.CheckUserId(req);
      const client = await db.client.findFirst({
        where: {
          userId: user.id,
        },
      });
      if (!client) {
        throw new ApiError(404, "Client not found");
      }

      const [
        totalPostsDone,
        totalPendingPosts,
        totalUpcomingPosts,
        totalThisWeekPosts,
      ] = await Promise.all([
        db.post.count({
          where: {
            event: {
              clientId: client.id,
            },
            postStatus: "PUBLISHED",
          },
        }),
        db.post.count({
          where: {
            event: {
              clientId: client.id,
            },
            isConfirmByClient: false,
          },
        }),
        db.post.count({
          where: {
            event: {
              clientId: client.id,
            },
            postStatus: "WORKING",
          },
        }),
        db.post.count({
          where: {
            createdAt: {
              gte: startOfWeek(new Date(), { weekStartsOn: 1 }),
              lte: endOfWeek(new Date(), { weekStartsOn: 1 }),
            },
          },
        }),
      ]);

      res.json(
        new ApiResponse(200, "All stats fetched succesfully", {
          totalPostsDone,
          totalPendingPosts,
          totalUpcomingPosts,
          totalThisWeekPosts,
        })
      );
    }
  );

  public static GetEventsStatsForMembers = AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const user = await db.user.CheckUserId(req);
      const member = await db.member.findFirst({
        where: {
          userId: user.id,
        },
      });
      if (!member) {
        throw new ApiError(404, "Member not found");
      }

      const [totalPostsAssigned, totalPostsCompleted, totalPostsUpcoming] =
        await Promise.all([
          db.post.count({
            where: {
              event: {
                members: {
                  some: {
                    memberId: member.id,
                  },
                },
              },
            },
          }),
          db.post.count({
            where: {
              event: {
                members: {
                  some: {
                    memberId: member.id,
                  },
                },
              },
              postStatus: "PUBLISHED",
            },
          }),
          db.post.count({
            where: {
              event: {
                members: {
                  some: {
                    memberId: member.id,
                  },
                },
              },
              postStatus: "WORKING",
            },
          }),
        ]);

      res.json(
        new ApiResponse(200, "All stats fetched succesfully", {
          totalPostsAssigned,
          totalPostsCompleted,
          totalPostsUpcoming,
        })
      );
    }
  );

  public static GetEventDetailsAssignedToMembers = AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const user = await db.user.CheckUserId(req);
      const events = await db.event.findMany({
        where: {
          members: {
            some: {
              member: {
                userId: user.id,
              },
            },
          },
        },
        select: {
          id: true,
          title: true,
          startTime: true,
          endTime: true,
          admin: {
            select: {
              firstName: true,
            },
          },
          post: {
            select: {
              postStatus: true,
            },
          },
        },
      });

      res.json(
        new ApiResponse(200, "All event details fetched successfully", events)
      );
    }
  );

  public static GetEventsAssignedToMemberMonthly = AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const user = await db.user.CheckUserId(req);
      const member = await db.member.findFirst({
        where: {
          userId: user.id,
        },
      });
      if (!member) {
        throw new ApiError(404, "Member not found");
      }

      const events = await db.event.findMany({
        where: {
          members: {
            some: {
              memberId: member.id,
            },
          },
        },
        select: {
          createdAt: true,
        },
      });

      const monthsOfYear = Array.from({ length: 12 }, (_, i) =>
        format(new Date(2025, i, 1), "MMMM")
      );

      const eventsCreatedMonthly = monthsOfYear.reduce((acc, month) => {
        acc[month] = 0;
        return acc;
      }, {} as Record<string, number>);

      events.forEach((event) => {
        const month = format(event.createdAt, "MMMM");
        eventsCreatedMonthly[month] += 1;
      });

      res.json(
        new ApiResponse(200, "Events created per month", eventsCreatedMonthly)
      );
    }
  );

  public static GetEventsByDate = AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const user = await db.user.CheckUserId(req);

      const events = await db.event.findMany({
        where: {
          OR: [
            {
              members: {
                some: {
                  member: {
                    userId: user.id,
                  },
                },
              },
            },
            {
              client: {
                userId: user.id,
              },
            },
          ],
        },
        select: {
          createdAt: true,
        },
      });

      const eventsByDate = events.map((event) => ({
        date: format(event.createdAt, "yyyy-MM-dd"),
        event: 1,
      }));

      res.json(new ApiResponse(200, "Events created per date", eventsByDate));
    }
  );

  public static GetEventsByText = AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const user = await db.user.CheckUserId(req);
      const searchText = req.query.text as string;

      console.log("searchText", searchText);

      if (!searchText) {
        throw new ApiError(400, "Search text is required");
      }

      const lowerSearchText = searchText.toLowerCase();

      const events = await db.event.findMany({
        where: {
          OR: [
            { client: { userId: user.id } },
            { adminId: user.id },
            { members: { some: { member: { userId: user.id } } } },
          ],
          AND: [
            {
              OR: [
                { title: { contains: lowerSearchText } },
                { description: { contains: lowerSearchText } },
              ],
            },
          ],
        },
        select: {
          id: true,
          title: true,
          startTime: true,
          endTime: true,
        },
      });

      res.json(new ApiResponse(200, "Events fetched successfully", events));
    }
  );

  public static GetEventDetailsForClient = AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const user = await db.user.CheckUserId(req);
      const client = await db.client.findFirst({
        where: {
          userId: user.id,
        },
      });
      if (!client) {
        throw new ApiError(404, "Client not found");
      }

      const events = await db.event.findMany({
        where: {
          clientId: client.id,
        },
        select: {
          id: true,
          title: true,
          endTime: true,
          post: {
            select: {
              postStatus: true,
            },
          },
          startTime: true,

          client: {
            select: {
              instagramId: true,
              instagramPassword: true,
            },
          },
        },
      });

      res.json(
        new ApiResponse(200, "All event details fetched successfully", events)
      );
    }
  );

  public static ClientEditInstagram = AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      // Check if the user exists
      const user = await db.user.CheckUserId(req);

      // Find the client's record associated with the user
      const client = await db.client.findFirst({
        where: {
          userId: user.id,
        },
      });

      if (!client) {
        throw new ApiError(404, "Client not found");
      }

      const { instagramId, instagramPassword } = req.body;

      if (!instagramId || !instagramPassword) {
        throw new ApiError(400, "Instagram ID and Password are required");
      }

      const updatedClient = await db.client.update({
        where: {
          id: client.id,
        },
        data: {
          instagramId,
          instagramPassword,
        },
      });

      res.json(
        new ApiResponse(200, "Instagram credentials updated successfully")
      );
    }
  );
}

import { db } from "@src/db";
import { GlobalUtils } from "@src/global";
import { ScanImage } from "@src/services/ai";
import CloudinaryService from "@src/services/cloudinary";
import {
  ApiError,
  ApiResponse,
  AsyncHandler,
} from "@src/utils/server-functions";
import { Request, Response } from "express";
import fs from "fs";
import { startOfWeek, endOfWeek } from "date-fns";

export class PostController {
  public static GetAiContent = AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      console.log(req.file);

      if (!req.file || !req.file.path) {
        throw new ApiError(400, "No file uploaded or file path is missing");
      }

      try {
        const fileBuffer = await fs.promises.readFile(req.file.path);

        console.log("File buffer successfully read");

        const postContent = await ScanImage(fileBuffer, req.file.mimetype);

        if (!postContent) {
          throw new ApiError(500, "Failed to generate Instagram post content");
        }

        res.json(new ApiResponse(200, postContent.content));
      } catch (error) {
        console.error("Error reading the file:", error);
        throw new ApiError(
          500,
          "Failed to read uploaded file or generate post content"
        );
      }
    }
  );

  public static CreatePost = AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const { content, postType, scheduledAt } = req.body;
      const { clientId } = req.params;

      const mediaUrl = await GlobalUtils.getImageUrl(req);

      if (!mediaUrl) {
        throw new ApiError(400, "Media URL is missing or invalid");
      }

      try {
        await db.post.create({
          data: {
            clientId,
            mediaUrl,
            content,
            type: postType || "POST",
            scheduledAt,
          },
        });

        res.json(new ApiResponse(200, "Post created succesfully"));
      } catch (error) {
        console.error("Error creating post:", error);
        throw new ApiError(500, "Failed to create the post");
      }
    }
  );

  public static GetAllposts = AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const { clientId } = req.params;

      try {
        const posts = await db.post.findMany({
          where: {
            clientId,
          },
          select: {
            id: true,
            content: true,
            mediaUrl: true,
            isConfirmedByClient: true,
            scheduledAt: true,
            client: {
              select: {
                user: {
                  select: {
                    email: true,
                  },
                },
              },
            },
            type: true,
          },

          orderBy: {
            createdAt: "desc",
          },
        });

        if (posts.length === 0) {
          throw new ApiError(404, "No posts found for this client");
        }

        res.json(new ApiResponse(200, "Fetched all post", posts));
      } catch (error) {
        console.error("Error retrieving posts:", error);
        throw new ApiError(500, "Failed to retrieve posts");
      }
    }
  );

  public static TimeSchedule = AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const { scheduledAt, postId } = req.body;
      await db.post.update({
        where: {
          id: postId,
        },
        data: {
          scheduledAt,
        },
      });
      res.json(new ApiResponse(200, "Post is schedueld succesfully"));
    }
  );

  public static GetAllStatsForAdmin = AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const [
        totalPostsCreated,
        totalPostsPublished,
        totalMembers,
        totalClients,
      ] = await Promise.all([
        db.post.count(), // total posts
        db.post.count({ where: { postStatus: "PUBLISHED" } }),
        db.member.count(), // total members
        db.client.count(), // total clients
      ]);

      res.json(
        new ApiResponse(200, "Stats fetched", {
          totalPostsCreated,
          totalPostsPublished,
          totalMembers,
          totalClients,
        })
      );
    }
  );

  public static PostsCreatedMonthlyForAdmin = AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const posts = await db.post.findMany({
        select: {
          id: true,
          createdAt: true,
        },
      });

      const postsCreatedMonthly = posts.reduce((acc, post) => {
        const month = new Intl.DateTimeFormat("en-US", {
          month: "long",
          year: "numeric",
        }).format(post.createdAt);

        acc[month] = (acc[month] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      res.json(
        new ApiResponse(200, "Posts created per month", postsCreatedMonthly)
      );
    }
  );

  public static GetAllStatsForClient = AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const user = await db.user.CheckUserId(req);

      const client = await db.client.findUnique({
        where: {
          userId: user.id,
        },
      });

      if (!client) throw new ApiError(400, "No client found");

      const [
        totalPostsDone,
        totalPendingPosts,
        totalUpcomingPosts,
        totalThisWeekPosts,
      ] = await Promise.all([
        db.post.count({
          where: {
            clientId: client.id,
            postStatus: "PUBLISHED",
          },
        }),
        db.post.count({
          where: {
            clientId: client.id,
            postStatus: "WORKING",
          },
        }),
        db.post.count({
          where: {
            clientId: client.id,
            scheduledAt: {
              gt: new Date(),
            },
          },
        }),
        db.post.count({
          where: {
            clientId: client.id,
            scheduledAt: {
              gte: startOfWeek(new Date()),
              lte: endOfWeek(new Date()),
            },
          },
        }),
      ]);

      res.json(
        new ApiResponse(200, "Fetched stats", {
          totalPostsDone,
          totalPendingPosts,
          totalUpcomingPosts,
          totalThisWeekPosts,
        })
      );
    }
  );

  public static PostsCreatedMonthlyForClient = AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const user = await db.user.CheckUserId(req);
      const posts = await db.post.findMany({
        where: {
          clientId: user.id,
        },
        select: {
          id: true,
          createdAt: true,
        },
      });

      const postsCreatedMonthly = posts.reduce((acc, post) => {
        const month = new Intl.DateTimeFormat("en-US", {
          month: "long",
          year: "numeric",
        }).format(post.createdAt);

        acc[month] = (acc[month] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      res.json(
        new ApiResponse(200, "Posts created per month", postsCreatedMonthly)
      );
    }
  );

  public static GetAllClientPosts = AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const user = await db.user.CheckUserId(req);

      const client = await db.client.findUnique({
        where: {
          userId: user.id,
        },
      });

      if (!client) throw new ApiError(400, "No client found");

      try {
        const posts = await db.post.findMany({
          where: {
            clientId: client.id,
          },
          select: {
            id: true,
            content: true,
            mediaUrl: true,
            isConfirmedByClient: true,
            scheduledAt: true,
            client: {
              select: {
                user: {
                  select: {
                    email: true,
                  },
                },
              },
            },
            type: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        });

        // No error thrown if no posts – just return empty array
        res.json(new ApiResponse(200, "Fetched all posts", posts));
      } catch (error) {
        console.error("Error retrieving posts:", error);
        throw new ApiError(500, "Failed to retrieve posts");
      }
    }
  );

  public static GetMembersStats = AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const user = await db.user.CheckUserId(req);

      const member = await db.member.findUnique({
        where: {
          userId: user.id,
        },
      });

      if (!member) throw new ApiError(400, "No member found");

      // Get clientIds the member is assigned to
      const clientRelations = await db.memberOnClient.findMany({
        where: {
          memberId: member.id,
        },
        select: {
          clientId: true,
        },
      });

      const clientIds = clientRelations.map((rel) => rel.clientId);

      if (clientIds.length === 0) {
        // Member is not assigned to any clients
        res.json(
          new ApiResponse(200, "Fetched member stats", {
            totalPostsAssigned: 0,
            totalPostsCompleted: 0,
            totalPostsUpcoming: 0,
          })
        );
      }

      const [totalPostsAssigned, totalPostsCompleted, totalPostsUpcoming] =
        await Promise.all([
          db.post.count({
            where: {
              clientId: {
                in: clientIds,
              },
            },
          }),
          db.post.count({
            where: {
              clientId: {
                in: clientIds,
              },
              postStatus: "PUBLISHED",
            },
          }),
          db.post.count({
            where: {
              clientId: {
                in: clientIds,
              },
              scheduledAt: {
                gt: new Date(),
              },
            },
          }),
        ]);

      res.json(
        new ApiResponse(200, "Fetched member stats", {
          totalPostsAssigned,
          totalPostsCompleted,
          totalPostsUpcoming,
        })
      );
    }
  );

  public static GetListOfClients = AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const user = await db.user.CheckUserId(req);

      const member = await db.member.findUnique({
        where: {
          userId: user.id,
        },
      });

      if (!member) throw new ApiError(400, "No member found");

      // Get all clients the member is assigned to
      const assignedClients = await db.memberOnClient.findMany({
        where: {
          memberId: member.id,
        },
        select: {
          client: {
            select: {
              id: true,
              createdAt: true,
              updatedAt: true,
              user: {
                select: {
                  userName: true,
                  email: true,
                },
              },
            },
          },
          assignedAt: true,
        },
      });

      const clients = assignedClients.map((relation) => ({
        clientId: relation.client.id,
        userName: relation.client.user.userName,
      }));

      res.json(new ApiResponse(200, "Fetched assigned clients", clients));
    }
  );
}

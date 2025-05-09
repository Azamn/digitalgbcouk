import { db } from "@src/db";
import { ApiResponse, AsyncHandler } from "@src/utils/server-functions";
import { Request, Response } from "express";
import { getWeek } from "date-fns";

export class UserController {
  public static UserInfo = AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const user = await db.user.CheckUserId(req);
      res.json(new ApiResponse(200, "USER FOUND", user));
    }
  );

  public static UsersByRole = AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      await db.user.CheckUserId(req);
      const users = await db.user.findMany({
        where: {
          role: {
            in: ["CLIENT", "MEMBER"],
          },
        },
        select: {
          email: true,
          role: true,
        },
      });

      const groupedMember = users.reduce((acc, user) => {
        if (!acc[user.role]) {
          acc[user.role] = [];
        }
        acc[user.role].push(user.email as string);
        return acc;
      }, {} as Record<string, string[]>);

      res.json(new ApiResponse(200, "USERS BY ROLE", groupedMember));
    }
  );

  public static Notifications = AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const user = await db.user.CheckUserId(req);
      const notifications = await db.notification.findMany({
        where: {
          userId: user.id,
        },
        select: {
          message: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      res.json(new ApiResponse(200, "NOTIFICATIONS FOUND", notifications));
    }
  );
}

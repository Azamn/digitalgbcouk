import { PrismaClient } from "@prisma/client";
import { getAuthUser } from "@src/utils/get-auth-user";
import { ApiError } from "@src/utils/server-functions";
import { Request } from "express";

export const db = new PrismaClient().$extends({
  name: "checkUserId",
  model: {
    user: {
      async CheckUserId(req: Request) {
        const { userId } = getAuthUser(req);
        if (!userId) {
          throw new ApiError(401, "Unauthorized");
        }
        const user = await db.user.findFirst({
          where: { id: userId },
          select: {
            id: true,
            email: true,
            userName: true,
            role: true,
          },
        });
        if (!user) {
          throw new ApiError(404, "User not found");
        }
        return user;
      },
    },
  },
});

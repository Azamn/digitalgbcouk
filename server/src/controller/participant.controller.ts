import { db } from "@src/db";
import { GlobalUtils } from "@src/global";
import AuthServices from "@src/services/auth";
import MailService from "@src/services/nodemailer";
import SocketServices from "@src/services/socket.io";
import {
  ApiError,
  ApiResponse,
  AsyncHandler,
} from "@src/utils/server-functions";
import { Request, Response } from "express";

export class ParticipantController {
  public static CreateClient = AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const {
        userName,
        instagramId,
        instagramPassword,
        email,
        password,
        memberId,
      } = req.body;

      if (await db.user.findUnique({ where: { userName } }))
        throw new ApiError(400, "Username already exists");

      const hashedPassword = await AuthServices.hashPassword(password);

      await db.$transaction(async (tx) => {
        const client = await tx.user.create({
          data: { userName, email, password: hashedPassword, role: "CLIENT" },
        });

        await tx.client.create({
          data: {
            instagramId,
            instagramPassword,
            userId: client.id,
            password,
          },
        });

        await tx.member.update({
          where: {
            id: memberId,
          },
          data: {
            clientId: client.id,
          },
        });
      });

      res.json(new ApiResponse(201, "Client created successfully"));
    }
  );
  public static CreateMember = AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const { userName, email, password } = req.body;

      if (await db.user.findUnique({ where: { userName } }))
        throw new ApiError(400, "Username already exists");

      const hashedPassword = await AuthServices.hashPassword(password);

      await db.$transaction(async (tx) => {
        const member = await tx.user.create({
          data: { userName, email, password: hashedPassword, role: "MEMBER" },
        });

        await tx.member.create({
          data: { userId: member.id },
        });
      });

      res.json(new ApiResponse(201, "Member created successfully"));
    }
  );

  public static GetAllClients = AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const clients = await db.client.findMany({
        where: {
          user: {
            role: "CLIENT",
          },
        },
        select: {
          id: true,
          user: {
            select: {
              userName: true,
              email: true,
              createdAt: true,
              inviteStatus: true,
              password: true,
            },
          },
          allotedMember: {
            select: {
              user: {
                select: {
                  userName: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      res.json(new ApiResponse(200, "Clients retrieved successfully", clients));
    }
  );

  public static GetAllMembers = AsyncHandler(
    async (_: Request, res: Response): Promise<void> => {
      const members = await db.member.findMany({
        where: {
          user: {
            role: "MEMBER",
          },
        },
        select: {
          id: true,
          user: {
            select: {
              userName: true,
              email: true,
              createdAt: true,
              inviteStatus: true,
            },
          },
          client: {
            select: {
              user: {
                select: {
                  userName: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      res.json(new ApiResponse(200, "Members retrieved successfully", members));
    }
  );

  public static SendInviteToClient = AsyncHandler(
    AsyncHandler(async (req: Request, res: Response): Promise<void> => {
      const { id, email, password, role } = req.body;
      const Role = role.charAt(0) + role.slice(1).toLowerCase();
      const isParticipant = await db.user.findUnique({
        where: {
          id,
        },
      });
      if (!isParticipant) {
        Role;
      }
      await MailService.sendUserCredentials({
        email,
        password,
        Role,
      });
      res.json(new ApiResponse(200, `Invite sent to ${Role} successfully`));
    })
  );
}

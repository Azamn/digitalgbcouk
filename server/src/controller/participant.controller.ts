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
  public static CreateParticipants = AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const { firstName, lastName, email, password, role } = req.body;

      if (await db.user.findUnique({ where: { email } })) {
        throw new ApiError(400, "User already exists");
      }

      await db.$transaction(async (tx) => {
        const createdUser = await tx.user.create({
          data: { firstName, lastName, email, password, role },
        });

        if (role === "CLIENT") {
          await tx.client.create({
            data: {
              name: `${firstName} ${lastName}`,
              email,
              userId: createdUser.id,
            },
          });
        } else {
          await tx.member.create({
            data: {
              name: `${firstName} ${lastName}`,
              email,
              userId: createdUser.id,
            },
          });
        }
      });

      res.json(new ApiResponse(201, "Participant created successfully"));
    }
  );

  public static GetAllClients = AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const clients = await db.user.findMany({
        where: {
          role: "CLIENT",
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          createdAt: true,
          inviteStatus: true,
          password: true,
          role: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      res.json(new ApiResponse(200, "Clients retrieved successfully", clients));
    }
  );

  public static GetAllMembers = AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const members = await db.user.findMany({
        where: {
          role: "MEMBER",
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          createdAt: true,
          inviteStatus: true,
          role: true,
          password: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      res.json(new ApiResponse(200, "Members retrieved successfully", members));
    }
  );

  public static DeleteParticipant = AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const { participantId } = req.params;

      if (!participantId) {
        throw new ApiError(400, "Missing required parameters");
      }

      const user = await db.user.findUnique({
        where: { id: participantId },
      });

      if (!user) throw new ApiError(404, "User not found");

      await db.user.delete({ where: { id: participantId } });

      res.json(
        new ApiResponse(200, `${user.role.toLowerCase()} deleted successfully`)
      );
    }
  );

  public static EditParticipant = AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const { participantId } = req.params;
      const { email, password, firstName, lastName, role } = req.body;
      const isUser = await db.user.findUnique({ where: { id: participantId } });
      if (!isUser) {
        throw new ApiError(400, "User do not exists");
      }

      const result = await db.$transaction(async (tx) => {
        const updatedUser = await tx.user.update({
          where: {
            id: participantId,
          },
          data: { email, password, firstName, lastName },
        });

        role === "CLIENT"
          ? tx.client.update({
              where: { id: updatedUser.id },
              data: { name: `${firstName} ${lastName}`, email },
            })
          : tx.member.update({
              where: { id: updatedUser.id },
              data: { name: `${firstName} ${lastName}`, email },
            });

        return { role: updatedUser.role };
      });

      res.json(
        new ApiResponse(
          200,
          `${result.role.toLocaleLowerCase()} updated successfully`
        )
      );
    }
  );
  public static SendInviteToParticipants = AsyncHandler(
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

  public static GetSuggestions = AsyncHandler(
    AsyncHandler(async (req: Request, res: Response): Promise<void> => {
      const [clients, members] = await Promise.all([
        db.client.findMany({
          where: {
            user: {
              inviteStatus: "ACCEPTED",
              role: "CLIENT",
            },
          },
          select: {
            id: true,
            name: true,
            email: true,
          },
        }),
        db.member.findMany({
          where: {
            user: {
              inviteStatus: "ACCEPTED",
              role: "MEMBER",
            },
          },
          select: {
            id: true,
            name: true,
            email: true,
          },
        }),
      ]);

      res.json(
        new ApiResponse(
          200,
          "Client and member suggestions retrieved successfully",
          {
            clients,
            members,
          }
        )
      );
    })
  );
}

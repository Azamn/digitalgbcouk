import { GlobalRole } from "@prisma/client";
import { appEnvConfigs } from "@src/configs";
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
  public static createClient = AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const {
        userName,
        instagramId,
        instagramPassword,
        email,
        password,
        memberId,
      } = req.body;

      const clientLogo = (await GlobalUtils.getImageUrl(req)) || "";

      try {
        if (!Array.isArray(memberId) || memberId.length === 0) {
          throw new ApiError(400, "memberId must be a non-empty array");
        }

        const existingUser = await db.user.findUnique({ where: { userName } });
        if (existingUser) {
          throw new ApiError(400, "Username already exists");
        }

        const hashedPassword = await AuthServices.hashPassword(password);

        await db.$transaction(async (tx) => {
          const user = await tx.user.create({
            data: {
              userName,
              email,
              password: hashedPassword,
              role: "CLIENT",
            },
          });

          const client = await tx.client.create({
            data: {
              instagramId,
              instagramPassword,
              userId: user.id,
              password,
              clientLogo,
            },
          });

          // ✅ Create many MemberOnClient entries for the relationship
          await Promise.all(
            memberId.map(async (id: string) => {
              await tx.memberOnClient.create({
                data: {
                  clientId: client.id,
                  memberId: id,
                },
              });
            })
          );

          await tx.post.create({
            data: {
              mediaUrl: "https://digitalgb.in/image.png",
              content: `🌟 Welcome to Planable! 🌟
  
  This is a placeholder post to give you a little tour of what Planable can do for your social media planning and collaboration.
  
  Welcome aboard, and let’s make your social media management smooth and effective!
  
  #Planable #Welcome #SocialMediaManagement`,
              clientId: client.id,
            },
          });

          console.log("✅ Transaction completed");
        });

        res.json(new ApiResponse(201, "Client created successfully"));
      } catch (err) {
        console.error("❌ Error in CreateClient:", err);
        throw new ApiError(500, "Failed to create client");
      }
    }
  );

  public static createMember = AsyncHandler(
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
          data: { userId: member.id, password },
        });
      });

      res.json(new ApiResponse(201, "Member created successfully"));
    }
  );
  public static createCoreMember = AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const { userName, email, password } = req.body;

      if (await db.user.findUnique({ where: { userName } }))
        throw new ApiError(400, "Username already exists");

      const hashedPassword = await AuthServices.hashPassword(password);

      await db.$transaction(async (tx) => {
        const member = await tx.user.create({
          data: {
            userName,
            email,
            password: hashedPassword,
            role: "COREMEMBER",
          },
        });

        await tx.member.create({
          data: { userId: member.id, password },
        });
      });

      res.json(new ApiResponse(201, "Member created successfully"));
    }
  );

  public static getAllClients = AsyncHandler(
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
              inviteStatus: true,
            },
          },
          password: true,
          instagramId: true,
          instagramPassword: true,
          members: {
            select: {
              member: {
                select: {
                  user: {
                    select: {
                      userName: true,
                    },
                  },
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

  public static getAllMembers = AsyncHandler(
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
          password: true,
          clients: {
            select: {
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
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      res.json(new ApiResponse(200, "Members retrieved successfully", members));
    }
  );
  public static getAllCoreMembers = AsyncHandler(
    async (_: Request, res: Response): Promise<void> => {
      const members = await db.member.findMany({
        where: {
          user: {
            role: "COREMEMBER",
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
          password: true,
          clients: {
            select: {
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
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      res.json(new ApiResponse(200, "Core Members retrieved successfully", members));
    }
  );

  public static sendInviteToClient = AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
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
    }
  );

  public static deleteMember = AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const { id } = req.params;
      const member = await db.member.findFirst({
        where: {
          id,
        },
      });
      if (!member) {
        throw new ApiError(404, "Member not found");
      }
      await db.member.delete({
        where: {
          id,
        },
      });
      res.json(new ApiResponse(200, "Member deleted successfully"));
    }
  );

  public static deleteClient = AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const { id } = req.params;
      const member = await db.client.findFirst({
        where: {
          id,
        },
      });
      if (!member) {
        throw new ApiError(404, "Clinet not found");
      }
      await db.client.delete({
        where: {
          id,
        },
      });
      res.json(new ApiResponse(200, "Member deleted successfully"));
    }
  );
}

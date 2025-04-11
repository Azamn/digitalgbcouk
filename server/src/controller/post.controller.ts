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
      const { content } = req.body;
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
}

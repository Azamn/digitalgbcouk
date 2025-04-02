import { db } from "@src/db";
import { GlobalUtils } from "@src/global";
import { ScanImage } from "@src/services/ai";
import {
  ApiError,
  ApiResponse,
  AsyncHandler,
} from "@src/utils/server-functions";
import { Request, Response } from "express";

export class PostController {
  public static UpdatePost = AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      try {
        await db.user.CheckUserId(req);
        const { postEventId } = req.params;

        if (!postEventId || typeof postEventId !== "string") {
          throw new ApiError(400, "Invalid postEventId: " + postEventId);
        }

        const { title, subtitle, description, additional, hashtags, mediaUrl } =
          req.body;


        const missingFields = [
          "title",
          "subtitle",
          "description",
          "mediaUrl",
        ].filter((field) => !req.body[field]);

        if (missingFields.length > 0) {
          throw new ApiError(
            400,
            `Missing required fields: ${missingFields.join(", ")}`
          );
        }


        const existingPost = await db.post.findUnique({
          where: { eventId: String(postEventId) },
        });

        let post;
        if (existingPost) {
          post = await db.post.update({
            where: { eventId: String(postEventId) },
            data: {
              title,
              subtitle,
              description,
              additional,
              hashtags: hashtags ? hashtags.split(" ").join(", ") : "", // ✅ Store as comma-separated string
              mediaUrl,
            },
          });
        } else {
          post = await db.post.create({
            data: {
              eventId: String(postEventId),
              title,
              subtitle,
              description,
              additional,
              hashtags: hashtags ? hashtags.split(" ").join(", ") : "", // ✅ Store as comma-separated string
              mediaUrl,
            },
          });
        }

        console.log("Post saved:", post);
        res.json(new ApiResponse(200, "Post updated successfully", post));
      } catch (error) {
        console.error("Error updating post:", error);
        res.status(500).json({ message: "Database error", error });
      }
    }
  );

  public static GetPostByEventId = AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      await db.user.CheckUserId(req);
      const { postEventId } = req.params;

      const postInfo = await db.post.findFirst({
        where: {
          eventId: postEventId as string,
        },
        select: {
          id: true,
          title: true,
          hashtags: true,
          description: true,
          subtitle: true,
          additional: true,
          mediaUrl: true,
        },
      });
      if (!postInfo) {
        throw new ApiError(404, "Post not found");
      }
      res.json(new ApiResponse(200, "Post fetched", postInfo));
    }
  );
  public static GetMediaUrl = AsyncHandler(
    async (req: Request, res: Response) => {
      try {
        await db.user.CheckUserId(req);

        const imageUrl = await GlobalUtils.getImageUrl(req);
        if (!imageUrl) {
          throw new ApiError(400, "No image URL found");
        }

        const aiHelp = Boolean(req.body?.aiHelp);
        let aiData = null;

        if (aiHelp) {
          try {
            aiData = await ScanImage(imageUrl);
          } catch (error) {
            console.error("Error scanning image:", error);
            aiData = null;
          }
        }

        res.json(
          new ApiResponse(200, "MEDIA URL FOUND", {
            imageUrl,
            ...(aiData !== null && { ai: aiData }),
          })
        );
      } catch (error) {
        console.error("Error in GetMediaUrl:", error);
        throw new ApiError(500, "Internal Server Error");
      }
    }
  );

  public static SendInviteToAskForPublish = AsyncHandler(
    async (req: Request, res: Response) => {
      await db.user.CheckUserId(req);
      const { postEventId } = req.params;

      const post = await db.post.findUnique({
        where: { eventId: postEventId },
      });

      if (!post) {
        throw new ApiError(404, "Post not found");
      }

      const updatedPost = await db.post.update({
        where: { id: post.id },
        data: { postStatus: "UNPUBLISHED" },
      });

      res.json(
        new ApiResponse(
          200,
          "Post sent for asking for publish successfully",
          updatedPost
        )
      );
    }
  );

  public static AcceptPublishRequest = AsyncHandler(
    async (req: Request, res: Response) => {
      await db.user.CheckUserId(req);
      const { postEventId } = req.params;

      const post = await db.post.findUnique({
        where: { eventId: postEventId },
      });

      if (!post) {
        throw new ApiError(404, "Post not found");
      }

      const updatedPost = await db.post.update({
        where: { id: post.id },
        data: { isConfirmByClient: true, postStatus: "CONFIRMED" },
      });

      res.json(
        new ApiResponse(200, "Post published successfully", updatedPost)
      );
    }
  );
  
}

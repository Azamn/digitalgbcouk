import { db } from "@src/db";
import { GlobalUtils } from "@src/global";
import AuthServices from "@src/services/auth";
import {
  ApiError,
  ApiResponse,
  AsyncHandler,
} from "@src/utils/server-functions";
import { Request, Response } from "express";

export class UserAuthController {
  public static UserSignup = AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const { userName, email, password } = req.body;
      if (!userName || !email || !password) {
        throw new ApiError(400, "All fields are required");
      }

      if (!AuthServices.isEmailValid(email)) {
        throw new ApiError(400, "Invalid email address");
      }

      const isEmailAlreadyExist = await db.user.findUnique({
        where: { email },
        select: { id: true },
      });

      if (isEmailAlreadyExist) {
        throw new ApiError(400, "Email already exists");
      }

      const hashedPassword = await AuthServices.hashPassword(password);

      await db.user.create({
        data: {
          userName,
          email,
          password: hashedPassword,
          isPasswordChanged: true,
        },
        select: {
          id: true,
          userName: true,
          role: true,
        },
      });

      res.json(new ApiResponse(201, "Account created successfully"));
    }
  );

  public static UserSignin = AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const { userName, password } = req.body;

      if (!userName || !password)
        throw new ApiError(400, "Username and password are required");

      const user = await db.user.findFirst({
        where: { userName: userName },
        select: {
          id: true,
          role: true,
          password: true,
          isPasswordChanged: true,
        },
      });

      if (!user) throw new ApiError(404, "User not found");

      const isPasswordCorrect = await AuthServices.verifyPassword(
        password,
        user.password
      );

      if (!isPasswordCorrect) {
        throw new ApiError(401, "You have enetred incorrect password !");
      }

      await db.user.update({
        where: { id: user.id },
        data: { inviteStatus: "ACCEPTED" },
      });

      const { sessionToken } = await AuthServices.generateTokens(user);

      GlobalUtils.setMultipleCookies(res, [
        { name: "sessionToken", value: sessionToken },
        { name: "UserRole", value: user.role },
        { name: "UserId", value: user.id },
      ]);

      res.json(new ApiResponse(200, "You have been logged in successfully"));
    }
  );

  public static GetUserInfo = AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const user = await db.user.CheckUserId(req);
      res.json(new ApiResponse(200, "User info fetched successfully", user));
    }
  );

  public static UserLogout = AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      res.clearCookie("sessionToken");
      res.clearCookie("UserRole");
      res.clearCookie("UserId");

      res
        .status(200)
        .json(new ApiResponse(200, "You have been logged out successfully"));
    }
  );
}

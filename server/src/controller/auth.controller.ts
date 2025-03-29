import { db } from "@src/db";
import { GlobalUtils } from "@src/global";
import AuthServices from "@src/services/auth";
import { getAuthUser } from "@src/utils/get-auth-user";
import {
  ApiError,
  ApiResponse,
  AsyncHandler,
} from "@src/utils/server-functions";
import { Request, Response } from "express";

export class UserAuthController {
  public static UserSignup = AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const { firstName, lastName, email, password } = req.body;
      if (!firstName || !lastName || !email || !password) {
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
          firstName,
          lastName,
          email,
          password: hashedPassword,
          isPasswordChanged: true,
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          role: true,
        },
      });

      res.status(201).json(new ApiResponse(201, "User created successfully"));
    }
  );

  public static UserSignin = AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
      }

      const user = await db.user.findFirst({
        where: { email },
        select: {
          id: true,
          role: true,
          password: true,
          isPasswordChanged: true,
        },
      });

      if (!user) {
        throw new ApiError(404, "User not found");
      }

      if (!user.isPasswordChanged) {
        throw new ApiError(403, "Please change your password");
      }

      const isPasswordCorrect = await AuthServices.verifyPassword(
        password,
        user.password
      );

      if (!isPasswordCorrect) {
        throw new ApiError(401, "Incorrect password");
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

      res
        .status(200)
        .json(new ApiResponse(200, "You have been logged in successfully"));
    }
  );

  public static ChangePassword = AsyncHandler(
    async (req: Request, res: Response): Promise<void> => {
      const { email, oldPassword, newPassword } = req.body;
      if (!email || !oldPassword || !newPassword) {
        throw new ApiError(400, "All fields are required");
      }

      const user = await db.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new ApiError(404, "User not found");
      }

      // Determine if stored password is hashed
      const isHashed =
        user.password.startsWith("$2b$") || user.password.startsWith("$2a$");

      let isPasswordValid = false;
      if (isHashed) {
        isPasswordValid = await AuthServices.verifyPassword(
          oldPassword,
          user.password
        );
      } else {
        isPasswordValid = oldPassword === user.password;
      }

      if (!isPasswordValid) {
        throw new ApiError(401, "Incorrect old password");
      }

      const hashedPassword = await AuthServices.hashPassword(newPassword);
      await db.user.update({
        where: { id: user.id },
        data: { password: hashedPassword, isPasswordChanged: true },
      });

      res.json(new ApiResponse(200, "Password changed successfully"));
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

import { SignUpType, LoginType, ChangePasswordType } from "@/schema";
import ApiServices from "@/store/middleware";
import { ApiResponse } from "@/server-api/types/api";

const AuthServices = ApiServices.injectEndpoints({
  endpoints: (build) => ({
    signUpUser: build.mutation<ApiResponse, SignUpType>({
      query: (userData) => ({
        url: "/auth/sign-up",
        method: "POST",
        body: userData,
      }),
    }),
    signInUser: build.mutation<ApiResponse, LoginType>({
      query: (credentials) => ({
        url: "/auth/sign-in",
        method: "POST",
        body: credentials,
      }),
    }),
    ChangePassword: build.mutation<ApiResponse, ChangePasswordType>({
      query: (credentials) => ({
        url: "/auth/change-password",
        method: "POST",
        body: credentials,
      }),
    }),
    UserLogout: build.mutation<ApiResponse, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
    getUserInfo: build.query<UserType, void>({
      query: () => ({
        url: "/auth/userinfo",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useSignUpUserMutation,
  useSignInUserMutation,
  useChangePasswordMutation,
  useGetUserInfoQuery,
  useUserLogoutMutation,
} = AuthServices;

export interface UserType extends ApiResponse {
  result: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  };
}

interface UserSignupResponse extends ApiResponse {
  result: Member;
}

export interface Member {
  id: string;
  firstName: string;
  lastName: string;
}

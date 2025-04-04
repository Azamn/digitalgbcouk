import ApiServices from "@/store/middleware";
import { ApiResponse } from "@/backend/types/api";
import { SignUpType } from "@/app/(auth)/sign-up/schema";
import { LoginType } from "@/app/(auth)/sign-in/schema";

const AuthServices = ApiServices.injectEndpoints({
  endpoints: (build) => ({
    SignUp: build.mutation<ApiResponse, SignUpType>({
      query: (userData) => ({
        url: "/auth/sign-up",
        method: "POST",
        body: userData,
      }),
    }),
    SignIn: build.mutation<ApiResponse, LoginType>({
      query: (credentials) => ({
        url: "/auth/sign-in",
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
  useGetUserInfoQuery,
  useUserLogoutMutation,
  useSignInMutation,
  useSignUpMutation,
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

export interface Member {
  id: string;
  firstName: string;
  lastName: string;
}

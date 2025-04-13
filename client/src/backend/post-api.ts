import { PostEditType } from "@/schema";
import ApiServices from "@/store/middleware";
import { ApiResponse } from "./types/api";

const PostServices = ApiServices.enhanceEndpoints({
  addTagTypes: ["POST"],
}).injectEndpoints({
  endpoints: (build) => ({
    // 🔍 AI Help
    GetAiHelp: build.mutation<MediaResponse, FormData>({
      query: (formData) => ({
        url: "/posts/getaihelp",
        method: "POST",
        body: formData,
      }),
    }),

    // ➕ Create Post
    CreatePost: build.mutation<
      ApiResponse,
      { clientId: string; formData: FormData }
    >({
      query: ({ clientId, formData }) => ({
        url: `/posts/${clientId}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [{ type: "POST", id: "LISTS" }],
    }),

    // 📅 Schedule Post
    SchedulePost: build.mutation<
      ApiResponse,
      { postId: string; scheduledAt: string }
    >({
      query: (payload) => ({
        url: `/posts/schedule`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [{ type: "POST", id: "LISTS" }],
    }),

    // 📦 Get All Posts (by client)
    GetAllPosts: build.query<PostResposne, { clientId: string }>({
      query: ({ clientId }) => ({
        url: `/posts/${clientId}`,
        method: "GET",
      }),
      providesTags: [{ type: "POST", id: "LISTS" }],
    }),

    GetAdminStats: build.query<GetPostStataResponseAdmin, void>({
      query: () => ({
        url: "/posts/stats/admin",
        method: "GET",
      }),
    }),

    GetPostsCreatedMonthly: build.query<GetMonthlyPostResponse, void>({
      query: () => ({
        url: "/posts/monthly/admin",
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAiHelpMutation,
  useCreatePostMutation,
  useGetAllPostsQuery,
  useSchedulePostMutation,
  useGetAdminStatsQuery,
  useGetPostsCreatedMonthlyQuery,
} = PostServices;

interface MediaResponse extends ApiResponse {
  result: {
    content: string;
  };
}

interface PostResposne extends ApiResponse {
  result: {
    id: string;
    content: string;
    mediaUrl: string;
    isConfirmedByClient: boolean;
    scheduledAt: string;
    client: {
      user: {
        email: string;
      };
    };
    type : "POST" | "STORY"
  }[];
}

interface GetPostStataResponseAdmin extends ApiResponse {
  result: {
    totalPostsCreated: number;
    totalPostsPublished: number;
    totalMembers: number;
    totalClients: number;
  };
}

interface GetMonthlyPostResponse extends ApiResponse {
  result: Record<string, number>;
}
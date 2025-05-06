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

    GetAllClientPosts: build.query<PostResposne, void>({
      query: () => ({
        url: `/posts/all/clientpost`,
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
    GetClientStats: build.query<GetPostStataResponseClient, void>({
      query: () => ({
        url: "/posts/stats/client",
        method: "GET",
      }),
    }),
    GetMembersStats: build.query<GetPostStataResponseMembers, void>({
      query: () => ({
        url: "/posts/stats/member",
        method: "GET",
      }),
    }),

    GetPostsCreatedMonthlyForClient: build.query<GetMonthlyPostResponse, void>({
      query: () => ({
        url: "/posts/monthly/client",
        method: "GET",
      }),
    }),
    GetListofClients: build.query<ListOfClientResposne, void>({
      query: () => ({
        url: "/posts/list/clients",
        method: "GET",
      }),
    }),
    ConfirmPost: build.mutation<ApiResponse, { postId: string }>({
      query: ({ postId }) => ({
        url: `/posts//confirm/${postId}`,
        method: "POST",
      }),
      invalidatesTags: [{ type: "POST", id: "LISTS" }],
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
  useGetClientStatsQuery,
  useGetPostsCreatedMonthlyForClientQuery,
  useGetAllClientPostsQuery,
  useGetMembersStatsQuery,
  useGetListofClientsQuery,
  useConfirmPostMutation,
} = PostServices;

interface MediaResponse extends ApiResponse {
  result: {
    content: string;
    hastags: string;
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
    type: "POST" | "STORY";
  }[];
}

interface GetPostStataResponseAdmin extends ApiResponse {
  result: {
    totalMembers: number;
    totalClients: number;
    totalCoreMembers: number;
  };
}
interface GetPostStataResponseClient extends ApiResponse {
  result: {
    totalPostsDone: number;
    totalPendingPosts: number;
    totalUpcomingPosts: number;
    totalThisWeekPosts: number;
  };
}
interface GetPostStataResponseMembers extends ApiResponse {
  result: {
    totalPostsAssigned: number;
    totalPostsCompleted: number;
    totalPostsUpcoming: number;
  };
}

interface GetMonthlyPostResponse extends ApiResponse {
  result: Record<string, number>;
}

interface ListOfClientResposne extends ApiResponse {
  result: {
    clientId: string;
    userName: string;
  }[];
}

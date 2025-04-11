import { PostEditType } from "@/schema";
import ApiServices from "@/store/middleware";
import { ApiResponse } from "./types/api";

const PostServices = ApiServices.injectEndpoints({
  endpoints: (build) => ({
    GetAiHelp: build.mutation<MediaResponse, FormData>({
      query: (formData) => ({
        url: "/posts/getaihelp",
        method: "POST",
        body: formData,
      }),
    }),

    CreatePost: build.mutation<
      ApiResponse,
      { clientId: string; formData: FormData }
    >({
      query: ({ clientId, formData }) => ({
        url: `/posts/${clientId}`,
        method: "POST",
        body: formData,
      }),
    }),
    SchedulePost: build.mutation<
      ApiResponse,
      { postId: string; scheduledAt: string }
    >({
      query: (payload) => ({
        url: `/posts/schedule`,
        method: "POST",
        body: payload,
      }),
    }),

    GetAllPosts: build.query<PostResposne, { clientId: string }>({
      query: (params) => ({
        url: `/posts/${params.clientId}`,
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
  }[];
}

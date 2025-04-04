import { PostEditType } from "@/schema";
import ApiServices from "@/store/middleware";
import { ApiResponse } from "./types/api";

const PostServices = ApiServices.injectEndpoints({
  endpoints: (build) => ({
    GetMedialUrl: build.mutation<MediaResponse, FormData>({
      query: (formData) => ({
        url: "/posts/media-url",
        method: "POST",
        body: formData,
      }),
    }),

    updatePost: build.mutation<ApiResponse, PostEditType>({
      query: ({ postEventId, ...body }) => ({
        url: `/posts/event/${postEventId}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { postEventId }) => [
        { type: "POST", id: postEventId },
      ],
    }),

    getPostById: build.query<PostResponse, { postEventId: string }>({
      query: ({ postEventId }) => ({
        url: `/posts/event/${postEventId}`,
        method: "GET",
      }),
      providesTags: (result, error, { postEventId }) => [
        { type: "POST", id: postEventId },
      ],
    }),
    confirmPostByClient: build.mutation({
      query: (postId: string) => ({
        url: `/posts/confirm-client/${postId}`,
        method: "POST",
      }),
      invalidatesTags: ["POST"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetPostByIdQuery,
  useConfirmPostByClientMutation,
  useGetMedialUrlMutation,
  useUpdatePostMutation,
} = PostServices;

interface MediaResponse extends ApiResponse {
  result: {
    imageUrl: string;
    ai?: {
      title: string;
      hashtags: string;
      description: string;
      subtitle: string;
      additional: string;
    };
  };
}

export interface Post {
  id: string;
  title: string;
  hashtags: string;
  description: string;
  subtitle: string;
  additional: string;
  mediaUrl: string;
}

export interface PostResponse extends ApiResponse {
  result: Post;
}

import ApiServices from "@/store/middleware";
import { ApiResponse } from "@/backend/types/api";

const CommentServices = ApiServices.injectEndpoints({
  endpoints: (build) => ({
    createComment: build.mutation<
      ApiResponse,
      { postId: string; content: string }
    >({
      query: ({ postId, content }) => ({
        url: `/comments/${postId}`,
        method: "POST",
        body: { content },
      }),
      invalidatesTags: (result, error, { postId }) => [
        { type: "COMMENT", id: postId },
      ],
    }),

    getComments: build.query<CommentResponse, { postId: string }>({
      query: ({ postId }) => ({
        url: `/comments/${postId}`,
        method: "GET",
      }),
      providesTags: (result, error, { postId }) => [
        { type: "COMMENT", id: postId },
      ],
    }),

    deleteComment: build.mutation<ApiResponse, { commentId: string }>({
      query: ({ commentId }) => ({
        url: `/comments/${commentId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "COMMENT" }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useGetCommentsQuery,
} = CommentServices;

export default CommentServices;

export interface CommentResponse extends ApiResponse {
  result: {
    id: string;
    content: string;
    createdAt: string;
    user: {
      userName: string;
    };
  }[];
}

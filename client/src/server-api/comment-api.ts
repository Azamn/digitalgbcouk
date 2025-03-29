import ApiServices from "@/store/middleware";
import { ApiResponse } from "@/server-api/types/api";

const CommentServices = ApiServices.injectEndpoints({
  endpoints: (build) => ({
    createComment: build.mutation<
      ApiResponse,
      { postEventId: string; content: string }
    >({
      query: ({ postEventId, content }) => ({
        url: `/comments/create/${postEventId}`,
        method: "POST",
        body: { content },
      }),
      invalidatesTags: (result, error, { postEventId }) => [
        { type: "COMMENT", id: postEventId },
      ],
    }),

    getCommentsByEvent: build.query<CommentResponse, { postEventId: string }>({
      query: ({ postEventId }) => ({
        url: `/comments/event/${postEventId}`,
        method: "GET",
      }),
      providesTags: (result, error, { postEventId }) => [
        { type: "COMMENT", id: postEventId },
      ],
    }),

    deleteComment: build.mutation<ApiResponse, { commentId: string }>({
      query: ({ commentId }) => ({
        url: `/comments/event/${commentId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "COMMENT" }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateCommentMutation,
  useGetCommentsByEventQuery,
  useDeleteCommentMutation,
} = CommentServices;

export default CommentServices;

export interface CommentResponse extends ApiResponse {
  result: {
    id: string;
    content: string;
    createdAt: string;
    user: {
      id: string;
      firstName: string;
    };
    commentedBy: "ADMIN" | "CLIENT";
  }[];
}

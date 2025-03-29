import { CreateMemberType } from "@/schema";
import { EditParticipantFormData } from "@/components/common/data-table/participants-edit";
import ApiServices from "@/store/middleware";
import { ApiResponse } from "./types/api";

//  =========== /participants ============
const AuthServices = ApiServices.injectEndpoints({
  endpoints: (build) => ({
    CreateParticipants: build.mutation<ApiResponse, CreateMemberType>({
      query: (payload) => ({
        url: "/participants",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: (result, error, { role }) => [
        { type: "PARTICIPANTS", id: role },
      ],
    }),

    GetallClients: build.query<ParticipantResponse, void>({
      query: () => ({
        url: "/participants/clients",
        method: "GET",
      }),
      providesTags: (data) =>
        data?.result
          ? [
              { type: "PARTICIPANTS", id: "CLIENT" },
              ...data.result.map(({ id }) => ({
                type: "PARTICIPANTS" as const,
                id,
              })),
            ]
          : [{ type: "PARTICIPANTS", id: "CLIENT" }],
    }),

    GetallMembers: build.query<ParticipantResponse, void>({
      query: () => ({
        url: "/participants/members",
        method: "GET",
      }),
      providesTags: (data) =>
        data?.result
          ? [
              { type: "PARTICIPANTS", id: "MEMBER" },
              ...data.result.map(({ id }) => ({
                type: "PARTICIPANTS" as const,
                id,
              })),
            ]
          : [{ type: "PARTICIPANTS", id: "MEMBER" }],
    }),

    DeleteParticipant: build.mutation<
      ApiResponse,
      { participantId: string; role: "CLIENT" | "MEMBER" }
    >({
      query: ({ participantId }) => ({
        url: `/participants/${participantId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { role }) => [
        { type: "PARTICIPANTS", id: role },
      ],
    }),

    EditParticipant: build.mutation<ApiResponse, EditParticipantFormData>({
      query: (payload) => ({
        url: `/participants/${payload.id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: (result, error, { role }) => [
        { type: "PARTICIPANTS", id: role },
      ],
    }),
    SendInviteToParticipants: build.mutation<
      ApiResponse,
      SendInviteToParticipantsRequest
    >({
      query: (payload) => ({
        url: `/participants/send/invite`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: (result, error, { role }) => [
        { type: "PARTICIPANTS", id: role },
      ],
    }),
    GetSuggestions: build.query<ParticipantSuggestionResponse, void>({
      query: () => ({
        url: "/participants/suggestion",
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              { type: "CLIENT", id: "LIST" },
              { type: "MEMBER", id: "LIST" },
            ]
          : [],
    }),
  }),
});

export const {
  useCreateParticipantsMutation,
  useDeleteParticipantMutation,
  useGetallClientsQuery,
  useGetallMembersQuery,
  useEditParticipantMutation,
  useSendInviteToParticipantsMutation,
  useGetSuggestionsQuery,
} = AuthServices;

export interface CreatedParticipant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "CLIENT" | "MEMBER";
  inviteStatus: "PENDING" | "ACCEPTED";
  createdAt: string;
}

interface ParticipantResponse extends ApiResponse {
  result: CreatedParticipant[] | null;
}

interface SendInviteToParticipantsRequest {
  id: string;
  email: string;
  password: string;
  role: "CLIENT" | "MEMBER";
}

interface Participant {
  id: string;
  name: string;
  email: string;
}

// id, email, password, role
interface ParticipantSuggestionResponse extends ApiResponse {
  result: {
    clients: Participant[];
    members: Participant[];
  };
}

import { EditParticipantFormData } from "@/components/common/data-table/participants-edit";
import ApiServices from "@/store/middleware";
import { ApiResponse } from "./types/api";
import { CreateClientType } from "@/components/_admin/participants-page/client-table/add-client-form/schema";
import { CreateMemberType } from "@/components/_admin/participants-page/member-table/add-member-form/schema";

//  =========== /participants ============
const AuthServices = ApiServices.injectEndpoints({
  endpoints: (build) => ({
    // Create Client
    CreateClient: build.mutation<ApiResponse, CreateClientType>({
      query: (payload) => ({
        url: "/participants/clients",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [{ type: "PARTICIPANTS", id: "CLIENT" }],
    }),

    // Create Member
    CreateMember: build.mutation<ApiResponse, CreateMemberType>({
      query: (payload) => ({
        url: "/participants/members",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [{ type: "PARTICIPANTS", id: "MEMBER" }],
    }),

    // Get Clients
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

    // Get Members
    GetallMembers: build.query<GetAllMemberApiResponse, void>({
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

    // Send Invite to Client
    SendInviteToClient: build.mutation<
      ApiResponse,
      SendInviteToParticipantsRequest
    >({
      query: (payload) => ({
        url: `/participants/invite/client`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: (result, error, { role }) => [
        { type: "PARTICIPANTS", id: role },
      ],
    }),
  }),
});

export const {
  useCreateClientMutation,
  useCreateMemberMutation,
  useGetallClientsQuery,
  useGetallMembersQuery,
  useSendInviteToClientMutation,
} = AuthServices;

export interface GetAllClientApiResponse extends ApiResponse {}


// ================= MEMBER =====================

export interface CreatedMember {
  id: string;
  user: {
    userName: string;
    email: string;
    createdAt: string;
    inviteStatus: "PENDING" | "ACCEPTED";
  };
  client: {
    user: {
      userName: string;
    };
  }[];
}
export interface GetAllMemberApiResponse extends ApiResponse {
  result: CreatedMember[];
}

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

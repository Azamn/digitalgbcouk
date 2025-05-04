import ApiServices from "@/store/middleware";
import { ApiResponse } from "./types/api";
import { CreateClientType } from "@/components/_admin/participants-page/client-list/add-client/schema";
import { CreateMemberType } from "@/components/_admin/participants-page/member-list/add-member/schema";

//  =========== /participants ============
const ParticipantServices = ApiServices.injectEndpoints({
  endpoints: (build) => ({
    // Create Client
    CreateClient: build.mutation<ApiResponse, FormData>({
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
    CreateCoreMember: build.mutation<ApiResponse, CreateMemberType>({
      query: (payload) => ({
        url: "/participants/core-members",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [{ type: "PARTICIPANTS", id: "MEMBER" }],
    }),

    // Get Clients
    GetallClients: build.query<GetAllClientApiResponse, void>({
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
    GetallCoreMembers: build.query<GetAllMemberApiResponse, void>({
      query: () => ({
        url: "/participants/core-members",
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
  useCreateCoreMemberMutation,
  useGetallCoreMembersQuery,
} = ParticipantServices;

export interface CreatedClient {
  id: string;
  user: {
    userName: string;
    email: string;
    inviteStatus: "PENDING" | "ACCEPTED";
    password: string;
  };
  members: {
    member: {
      user: {
        userName: string;
      };
    };
  }[];
  password: string;
  instagramId: string;
  instagramPassword: string;
}

export interface GetAllClientApiResponse extends ApiResponse {
  result: CreatedClient[];
}

// ================= MEMBER =====================

export interface CreatedMember {
  id: string;
  user: {
    userName: string;
    email: string;
    createdAt: string;
    inviteStatus: "PENDING" | "ACCEPTED";
  };
  clients: {
    client: {
      user: {
        userName: string;
      };
    };
  }[];
  password: string;
}

export interface GetAllMemberApiResponse extends ApiResponse {
  result: CreatedMember[];
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

import { AcceptEventType, CreateEventType, SearchType } from "@/schema";

import { EditEventFormData } from "@/components/_admin/events-list-page/event-edit-sheet";
import ApiServices from "@/store/middleware";
import { ApiResponse } from "./types/api";

export const EventServices = ApiServices.injectEndpoints({
  endpoints: (build) => ({
    GetEventsDetails: build.query<EventDetails, void>({
      query: () => ({
        url: `events/details`,
        method: "GET",
      }),
      providesTags: [{ type: "EVENTS", id: "LIST" }],
    }),
    GetEventsDetailsForMembers: build.query<GetEventsDetailsForMembers, void>({
      query: () => ({
        url: `events/details/member`,
        method: "GET",
      }),
      providesTags: [{ type: "EVENTS", id: "LIST" }],
    }),
    GetEventsDetailsForClient: build.query<EventDeatilsForClient, void>({
      query: () => ({
        url: `events/details/client`,
        method: "GET",
      }),
      providesTags: [{ type: "EVENTS", id: "LIST" }],
    }),

    CreateEvent: build.mutation<
      ApiResponse,
      { clientId: string; event: CreateEventType }
    >({
      query: ({ clientId, event }) => ({
        url: `/events/create/${clientId}`,
        method: "POST",
        body: event,
      }),
      invalidatesTags: [{ type: "EVENTS", id: "LIST" }],
    }),
    UpdateClientInstagram: build.mutation<
      ApiResponse,
      { instagramId: string; instagramPassword: string }
    >({
      query: (payload) => ({
        url: `/events/cleint/insata`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [{ type: "EVENTS", id: "LIST" }],
    }),

    DeleteEvent: build.mutation<ApiResponse, { eventId: string }>({
      query: ({ eventId }) => ({
        url: `/events/${eventId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "EVENTS", id: "LIST" }],
    }),

    EditEvent: build.mutation<ApiResponse, EditEventFormData>({
      query: (payload) => ({
        url: `/events/${payload.id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: [{ type: "EVENTS", id: "LIST" }],
    }),

    AddMembersToEvent: build.mutation<
      ApiResponse,
      { eventId: string; memberIds: string[] }
    >({
      query: ({ eventId, memberIds }) => ({
        url: `/events/${eventId}/members`,
        method: "POST",
        body: { memberIds },
      }),
      invalidatesTags: [{ type: "EVENTS", id: "LIST" }],
    }),

    GetEventsStatsForAdmin: build.query<GetEventStataResponseAdmin, void>({
      query: () => ({
        url: `/events/event-stats/admin`,
        method: "GET",
      }),
      providesTags: [{ type: "EVENTS", id: "LIST" }],
    }),

    GetEventsStatsForClient: build.query<GetEventStataResponseClient, void>({
      query: () => ({
        url: `/events/event-stats/client`,
        method: "GET",
      }),
      providesTags: [{ type: "EVENTS", id: "LIST" }],
    }),
    GetEventsStatsForMembers: build.query<GetEventStataResponseMembers, void>({
      query: () => ({
        url: `/events/event-stats/member`,
        method: "GET",
      }),
      providesTags: [{ type: "EVENTS", id: "LIST" }],
    }),

    GetMonthlyEventForAdmin: build.query<GetMonthlyEventsResponse, void>({
      query: () => ({
        url: `/events/event-created/monthly/admin`,
        method: "GET",
      }),
      providesTags: [{ type: "EVENTS", id: "LIST" }],
    }),
    GetEventsAssignedToMemberMonthly: build.query<
      GetMonthlyEventsResponse,
      void
    >({
      query: () => ({
        url: `/events/event-assigned/monthly/member`,
        method: "GET",
      }),
      providesTags: [{ type: "EVENTS", id: "LIST" }],
    }),
    GetEventsByDate: build.query<GetMonthlyEventsResponse, void>({
      query: () => ({
        url: `/events/event-assigned/monthly/date`,
        method: "GET",
      }),
      providesTags: [{ type: "EVENTS", id: "LIST" }],
    }),
    GetEventByTextSearch: build.query<
      GetEventByTextSearchResponse,
      { searchText: string }
    >({
      query: ({ searchText }) => ({
        url: `/events/search?text=${encodeURIComponent(searchText)}`,
        method: "GET",
      }),
      providesTags: [{ type: "EVENTS", id: "LIST" }],
    }),
  }),
  overrideExisting: false,
});
export const {
  useDeleteEventMutation,
  useCreateEventMutation,
  useGetEventsDetailsQuery,
  useEditEventMutation,
  useAddMembersToEventMutation,
  useGetMonthlyEventForAdminQuery,
  useGetEventsDetailsForMembersQuery,
  useGetEventsStatsForAdminQuery,
  useGetEventsStatsForClientQuery,
  useGetEventsStatsForMembersQuery,
  useGetEventsAssignedToMemberMonthlyQuery,
  useGetEventByTextSearchQuery,
  useGetEventsByDateQuery,
  useGetEventsDetailsForClientQuery,
  useUpdateClientInstagramMutation,
} = EventServices;

export interface Events {
  id: string;
  title: string;
  client: {
    name: string;
    instagramId: string;
    instagramPassword: string;
  };
  startTime: Date;
  endTime: Date;
  members: {
    member: {
      name: string;
      email: string;
    };
  }[];
  description: string;
  additional: string;
}

interface EventDetails extends ApiResponse {
  result: Events[];
}

interface GetEventStataResponseAdmin extends ApiResponse {
  result: {
    totalPosts: string;
    totalEvents: string;
    totalMembers: string;
    totalClients: string;
  };
}
interface GetEventStataResponseClient extends ApiResponse {
  result: {
    totalPostsDone: string;
    totalPendingPosts: string;
    totalUpcomingPosts: string;
    totalThisWeekPosts: string;
  };
}
interface GetEventStataResponseMembers extends ApiResponse {
  result: {
    totalPostsAssigned: string;
    totalPostsCompleted: string;
    totalPostsUpcoming: string;
  };
}

interface GetMonthlyEventsResponse extends ApiResponse {
  result: Record<string, number>;
}
interface GetEventsAssignedToMemberByDateResponse extends ApiResponse {
  result: Record<string, number>[];
}

interface GetEventsDetailsForMembers extends ApiResponse {
  result: {
    id: string;
    title: string;
    startTime: Date;
    endTime: Date;
    admin: {
      firstName: string;
    };
    post: {
      postStatus:
        | "PUBLISHED"
        | "SCHEDULED"
        | "UNPUBLISHED"
        | "WORKING"
        | "CONFIRMED";
    };
  }[];
}

interface GetEventByTextSearchResponse extends ApiResponse {
  result: {
    id: string;
    title: string;
    startTime: Date;
    endTime: Date;
  }[];
}

interface EventDeatilsForClient extends ApiResponse {
  result: {
    id: string;
    title: string;
    startTime: Date;
    endTime: Date;
    post: {
      postStatus:
        | "PUBLISHED"
        | "SCHEDULED"
        | "UNPUBLISHED"
        | "WORKING"
        | "CONFIRMED";
    };
    client?: {
      instagramId: string;
      instagramPassword: string;
    } | null;
  }[];
}

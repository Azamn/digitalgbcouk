import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_SERVER_URL,
  credentials: "include",
});

const ApiServices = createApi({
  reducerPath: "apiservices",
  baseQuery,
  tagTypes: ["ORG", "EVENTS", "USER", "POST", "NOTIFICATION","COMMENT" , "PARTICIPANTS" , "CLIENT" , "MEMBER"],
  endpoints: (build) => ({}),
});

export default ApiServices;

"use client";
import React from "react";
import DataLoader from "@/components/shared/loader/data-laoder";
import MemberEventTable from "@/components/_member/event-table/event-table";
import { useGetEventsDetailsForMembersQuery } from "@/backend/events-api";

const EventPage = () => {
  const { data: event, isLoading } = useGetEventsDetailsForMembersQuery();
  if (isLoading) return <DataLoader />;
  const res = event?.result ? event?.result : [];
  return <MemberEventTable data={res} />;
};

export default EventPage;

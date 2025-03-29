"use client";
import React from "react";
import DataLoader from "@/components/shared/loader/data-laoder";
import EventTable from "@/components/_admin/events-list-page/event-table";
import { useGetEventsDetailsQuery } from "@/server-api/events-api";

const EventPage = () => {
  const { data: event, isLoading } = useGetEventsDetailsQuery();
  if (isLoading) return <DataLoader />;
  const res = event?.result ? event?.result : [];
  return <EventTable data={res} />;
};

export default EventPage;

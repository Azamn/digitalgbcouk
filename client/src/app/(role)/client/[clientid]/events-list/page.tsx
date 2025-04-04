"use client";
import React from "react";
import { useGetEventsDetailsForClientQuery } from "@/backend/events-api";
import DataLoader from "@/components/shared/loader/data-laoder";
import ClientEventTable from "@/components/_client/event-list-page/client-event-table";

const EventPage = () => {
  const { data: event, isLoading } = useGetEventsDetailsForClientQuery();
  if (isLoading) return <DataLoader />;
  const res = event?.result ? event?.result : [];
  return <ClientEventTable data={res} />;
};

export default EventPage;

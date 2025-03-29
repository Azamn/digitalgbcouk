"use client";
import React from "react";
import ClientTable from "@/components/_admin/client-page/table";
import DataLoader from "@/components/shared/loader/data-laoder";
import { useGetallMembersQuery } from "@/server-api/participant.api";

const Client = () => {
  const { data, isLoading } = useGetallMembersQuery();
  if (isLoading) return <DataLoader />;
  const res = data?.result ? data?.result : [];
  return <ClientTable data={res} />;
};

export default Client;

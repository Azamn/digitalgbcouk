"use client";
import React, { useState } from "react";
import ClientTable from "@/components/_admin/client-page/table";
import DataLoader from "@/components/shared/loader/data-laoder";
import { useGetallClientsQuery } from "@/backend/participant.api";

const Client = () => {
  const { data, isLoading } = useGetallClientsQuery();
  if (isLoading) return <DataLoader />;
  const res = data?.result ? data?.result : [];
  return <ClientTable data={res} />;
};

export default Client;

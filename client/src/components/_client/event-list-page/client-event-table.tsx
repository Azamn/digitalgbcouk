"use client";

import { TableShell } from "@/components/common/data-table/table-shell";
import { Events } from "@/server-api/events-api";
import { clientColumns, ClientData } from "./client-event-cols";

export default function ClientEventTable({ data }: { data: ClientData[] }) {
  return (
    <TableShell
      columns={clientColumns}
      data={data}
    />
  );
}

"use client";

import { participantColumns } from "@/components/_admin/participants-page/client-table/client-table-cols";
import { TableShell } from "@/components/common/data-table/table-shell";
import { TableToolbar } from "@/components/common/data-table/table-toolbar";
import AddParticipantForm from "@/components/common/form/add-participants-form";
import { eventColumns } from "./event-table-cols";
import { Events } from "@/backend/events-api";

export default function EventTable({ data }: { data: Events[] }) {
  return (
    <TableShell
      columns={eventColumns}
      data={data}
      renderToolbar={(table) => <TableToolbar table={table} />}
    />
  );
}

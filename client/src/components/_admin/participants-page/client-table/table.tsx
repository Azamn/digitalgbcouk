"use client";

import { participantColumns } from "@/components/_admin/participants-page/client-table/client-table-cols";
import { TableShell } from "@/components/common/data-table/table-shell";
import { TableToolbar } from "@/components/common/data-table/table-toolbar";
import { CreatedParticipant } from "@/backend/participant.api";
import AddClientSheet from "./add-client-form/sheet";

export default function ClientTable({ data }: { data: CreatedParticipant[] }) {
  return (
    <TableShell
      columns={participantColumns}
      data={data}
      renderToolbar={(table) => <TableToolbar table={table} />}
      addToolbar={<AddClientSheet />}
    />
  );
}

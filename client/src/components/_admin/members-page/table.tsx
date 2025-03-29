"use client";

import { participantColumns } from "@/components/common/data-table/table-cols";
import { TableShell } from "@/components/common/data-table/table-shell";
import { TableToolbar } from "@/components/common/data-table/table-toolbar";
import AddParticipantForm from "@/components/common/form/add-participants-form";
import { CreatedParticipant } from "@/store/api-endpoints/participant.api";

export default function ClientTable({ data }: { data: CreatedParticipant[] }) {
  return (
    <TableShell
      columns={participantColumns}
      data={data}
      renderToolbar={(table) => <TableToolbar table={table} />}
      addToolbar={<AddParticipantForm />}
    />
  );
}

"use client";

import { CreatedMember } from "@/backend/participant.api";
import { TableShell } from "@/components/common/data-table/table-shell";
import { TableToolbar } from "@/components/common/data-table/table-toolbar";
import AddMemberDialog from "./add-member-form/sheet";
import { memberColumns } from "./member-table-cols";

export default function MemberTable({ data }: { data: CreatedMember[] }) {
  return (
    <TableShell
      columns={memberColumns}
      data={data}
      renderToolbar={(table) => <TableToolbar table={table} />}
      addToolbar={<AddMemberDialog />}
    />
  );
}

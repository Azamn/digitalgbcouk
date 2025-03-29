"use client";

import { TableShell } from "@/components/common/data-table/table-shell";
import { TableToolbar } from "@/components/common/data-table/table-toolbar";
import { eventColumns, EventData } from "./event-table-cols";

export default function MemberEventTable({ data }: { data: EventData[] }) {
  return (
    <TableShell
      columns={eventColumns}
      data={data}
      renderToolbar={(table) => <TableToolbar table={table} />}
    />
  );
}

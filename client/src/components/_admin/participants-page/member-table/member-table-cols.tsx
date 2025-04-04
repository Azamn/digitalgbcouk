import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { CreatedMember } from "@/backend/participant.api";

export const memberColumns: ColumnDef<CreatedMember>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        className="ml-4 bg-white text-dark"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="ml-4"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "id",
    header: ({ column }) => (
      <button
        onClick={column.getToggleSortingHandler()}
        className="flex items-center gap-2 font-medium"
      >
        Member ID <ArrowUpDown className="size-4" />
      </button>
    ),
    cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
  },

  {
    accessorKey: "user.userName",
    header: ({ column }) => (
      <button
        onClick={column.getToggleSortingHandler()}
        className="flex items-center gap-2 font-medium"
      >
        Name <ArrowUpDown className="size-4" />
      </button>
    ),
    cell: ({ row }) => {
      const name = row.original.user?.userName ?? "N/A";
      return <div className="capitalize">{name}</div>;
    },
  },

  {
    accessorKey: "user.email",
    header: ({ column }) => (
      <button
        onClick={column.getToggleSortingHandler()}
        className="flex items-center gap-2 font-medium"
      >
        Email <ArrowUpDown className="size-4" />
      </button>
    ),
    cell: ({ row }) => row.original.user?.email ?? "—",
  },

  {
    accessorKey: "user.inviteStatus",
    header: ({ column }) => (
      <button
        onClick={column.getToggleSortingHandler()}
        className="flex items-center gap-2 font-medium"
      >
        Status <ArrowUpDown className="size-4" />
      </button>
    ),
    cell: ({ row }) => {
      const status = row.original.user?.inviteStatus;
      return (
        <span
          className={`rounded-full px-2 py-1 text-xs ${
            status === "ACCEPTED"
              ? "bg-green-400 text-green-800"
              : "bg-yellow-300 text-yellow-800"
          }`}
        >
          {status}
        </span>
      );
    },
  },

  {
    accessorKey: "user.createdAt",
    header: ({ column }) => (
      <button
        onClick={column.getToggleSortingHandler()}
        className="flex items-center gap-2 font-medium"
      >
        Created At <ArrowUpDown className="size-4" />
      </button>
    ),
    cell: ({ row }) => {
      const createdAt = row.original.user?.createdAt;
      return createdAt
        ? new Date(createdAt).toLocaleString("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
          })
        : "—";
    },
  },

  {
    accessorKey: "client",
    header: () => <span>Client Name(s)</span>,
    cell: ({ row }) => {
      const clients = row.original.client || [];
      return (
        <div className="flex flex-col gap-1">
          {clients.length > 0 ? (
            clients.map((c, i) => (
              <span key={i} className="text-sm text-muted-foreground">
                {c.user?.userName ?? "Unknown"}
              </span>
            ))
          ) : (
            <span className="text-muted-foreground">No Clients</span>
          )}
        </div>
      );
    },
  },
];

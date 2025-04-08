import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { CreatedMember } from "@/backend/participant.api";

export const memberColumns: ColumnDef<CreatedMember>[] = [
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
    accessorKey: "password",
    header: ({ column }) => (
      <button
        onClick={column.getToggleSortingHandler()}
        className="flex items-center gap-2 font-medium"
      >
        Password <ArrowUpDown className="size-4" />
      </button>
    ),
    cell: ({ row }) => row.original.password ?? "XXXXXXXX",
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
    accessorKey: "clients", // ✅ fixed from `client` to `clients`
    header: () => <span>Client Name(s)</span>,
    cell: ({ row }) => {
      const clients = row.original.clients || [];
      return (
        <div className="flex flex-col gap-1">
          {clients.length > 0 ? (
            clients.map((c, i) => (
              <span key={i} className="text-muted-foreground text-sm">
                {c.client?.user?.userName ?? "Unknown"}
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

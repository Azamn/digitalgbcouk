import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { CreatedClient } from "@/backend/participant.api";

export const participantColumns: ColumnDef<CreatedClient>[] = [
  {
    accessorKey: "user.userName",
    header: ({ column }) => (
      <button
        onClick={column.getToggleSortingHandler()}
        className="flex items-center gap-1 font-medium"
      >
        Username <ArrowUpDown className="size-4" />
      </button>
    ),
    cell: ({ row }) => <span>{row.original.user.userName}</span>,
  },

  {
    accessorKey: "user.email",
    header: ({ column }) => (
      <button
        onClick={column.getToggleSortingHandler()}
        className="flex items-center gap-1 font-medium"
      >
        Email <ArrowUpDown className="size-4" />
      </button>
    ),
    cell: ({ row }) => (
      <span className="truncate text-sm text-gray-700">
        {row.original.user.email}
      </span>
    ),
  },

  {
    accessorKey: "password",
    header: "Password",
    cell: ({ row }) => <span>{row.original.password}</span>,
  },

  {
    accessorKey: "instagramId",
    header: "Instagram ID",
    cell: ({ row }) => (
      <span className="text-sm text-blue-700">{row.original.instagramId}</span>
    ),
  },

  {
    accessorKey: "instagramPassword",
    header: "Instagram Password",
    cell: ({ row }) => <span>{row.original.instagramPassword}</span>,
  },

  {
    id: "assignedMembers",
    header: "Assigned Members",
    cell: ({ row }) => {
      const members = row.original.members;

      return (
        <div className="flex gap-2 flex-wrap">
          {members?.length > 0 ? (
            members.map((m, idx) => {
              const userName = m.member.user.userName;
              const initials = userName
                .split(" ")
                .map((word) => word[0]?.toUpperCase())
                .join("")
                .slice(0, 2);

              return (
                <div
                  key={idx}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white shadow"
                  title={userName}
                >
                  {initials}
                </div>
              );
            })
          ) : (
            <span className="text-xs italic text-gray-400">No members</span>
          )}
        </div>
      );
    },
  },
];

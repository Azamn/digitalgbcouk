import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { ActionsDropdown } from "@/components/common/data-table/action-drop-down";
import { CreatedParticipant } from "@/store/api-endpoints/participant.api";

export const participantColumns: ColumnDef<CreatedParticipant>[] = [
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
        ID <ArrowUpDown className="size-4" />
      </button>
    ),
    cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
  },

  {
    accessorKey: "firstName",
    header: ({ column }) => (
      <button
        onClick={column.getToggleSortingHandler()}
        className="flex items-center gap-2 font-medium"
      >
        First Name <ArrowUpDown className="size-4" />
      </button>
    ),
    cell: ({ row }) => {
      const firstName = row.getValue("firstName") as string;

      return (
        <div className="flex items-center gap-2">
          <span>{`${firstName}`}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => (
      <button
        onClick={column.getToggleSortingHandler()}
        className="flex items-center gap-2 font-medium"
      >
        Last Name <ArrowUpDown className="size-4" />
      </button>
    ),
    cell: ({ row }) => {
      const lastName = row.original.lastName;

      return (
        <div className="flex items-center gap-2">
          <span>{`${lastName}`}</span>
        </div>
      );
    },
  },

  {
    accessorKey: "email",
    header: ({ column }) => (
      <button
        onClick={column.getToggleSortingHandler()}
        className="flex items-center gap-2 font-medium"
      >
        Email <ArrowUpDown className="size-4" />
      </button>
    ),
    cell: ({ row }) => <div className="truncate">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "inviteStatus",
    header: ({ column }) => (
      <button
        onClick={column.getToggleSortingHandler()}
        className="flex items-center gap-2 font-medium"
      >
        Status <ArrowUpDown className="size-4" />
      </button>
    ),
    cell: ({ row }) => {
      const status = row.getValue("inviteStatus") as string;
      return (
        <span
          className={`rounded-full px-2 py-1 text-xs ${
            status === "ACCEPTED"
              ? "bg-green-400 text-green-700"
              : "bg-yellow-400 text-yellow-800"
          }`}
        >
          {status}
        </span>
      );
    },
  },

  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <button
        onClick={column.getToggleSortingHandler()}
        className="flex items-center gap-2 font-medium"
      >
        Created Date <ArrowUpDown className="size-4" />
      </button>
    ),
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt") as string;
      return (
        <div>
          {new Date(createdAt).toLocaleString("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </div>
      );
    },
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const participant = row.original;
      const participantdata = {
        id: participant.id,
        firstName: participant.firstName,
        lastName: participant.lastName,
        email: participant.email,
        password: participant.password,
        role: participant.role,
      };
      return (
        <ActionsDropdown
          participantdata={participantdata}
          onEdit={async (data) => console.log("Editing:", data)}
          onDelete={async () => console.log("Deleting:", participant.id)}
          inviteStatus={participant.inviteStatus}
        />
      );
    },
  },
];

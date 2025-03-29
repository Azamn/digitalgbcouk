import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { ClientActionsDropdown } from "./cleint-action-table";
export interface ClientData {
  id: string;
  title: string;
  startTime: Date;
  endTime: Date;
  post: {
    postStatus:
      | "PUBLISHED"
      | "SCHEDULED"
      | "UNPUBLISHED"
      | "WORKING"
      | "CONFIRMED";
  };
  client?: {
    instagramId: string;
    instagramPassword: string;
  } | null;
}

export const clientColumns: ColumnDef<ClientData>[] = [
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
    accessorKey: "title",
    header: ({ column }) => (
      <button
        onClick={column.getToggleSortingHandler()}
        className="flex items-center gap-2 font-medium"
      >
        Event Title <ArrowUpDown className="size-4" />
      </button>
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("title")}</div>
    ),
  },

  {
    accessorKey: "post.postStatus",
    header: ({ column }) => (
      <button
        onClick={column.getToggleSortingHandler()}
        className="flex items-center gap-2 font-medium"
      >
        Post Status <ArrowUpDown className="size-4" />
      </button>
    ),
    cell: ({ row }) => {
      const postStatus = row.original.post?.postStatus || "UNPUBLISHED";
      const statusColors = {
        PUBLISHED: "text-green-600 bg-green-200",
        SCHEDULED: "text-blue-600 bg-blue-200",
        UNPUBLISHED: "text-gray-600 bg-gray-200",
        WORKING: "text-yellow-600 bg-yellow-200",
        CONFIRMED: "text-purple-600 bg-purple-200",
      };

      return (
        <span
          className={`rounded-full px-2 py-1 text-xs font-semibold ${statusColors[postStatus]}`}
        >
          {postStatus}
        </span>
      );
    },
  },

  {
    accessorKey: "client.instagramId",
    header: ({ column }) => (
      <button
        onClick={column.getToggleSortingHandler()}
        className="flex items-center gap-2 font-medium"
      >
        Instagram ID <ArrowUpDown className="size-4" />
      </button>
    ),
    cell: ({ row }) => (
      <div className="text-gray-700">
        {row.original.client?.instagramId || "N/A"}
      </div>
    ),
  },

  {
    accessorKey: "client.instagramPassword",
    header: ({ column }) => (
      <button
        onClick={column.getToggleSortingHandler()}
        className="flex items-center gap-2 font-medium"
      >
        Instagram Password <ArrowUpDown className="size-4" />
      </button>
    ),
    cell: ({ row }) => (
      <div className="text-gray-700">
        {row.original.client?.instagramPassword || "N/A"}
      </div>
    ),
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const eventData: ClientData = row.original;

      return (
        <ClientActionsDropdown
          clientData={{
            id: eventData.id,
            instagramId: eventData.client?.instagramId || "",
            instagramPassword: eventData.client?.instagramPassword || "",
          }}
        />
      );
    },
  },
];

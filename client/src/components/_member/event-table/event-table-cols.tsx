import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import PostNavigateButton from "./post-navigate-btn";

export type EventData = {
  id: string;
  title: string;
  startTime: Date;
  endTime: Date;
  admin: { firstName: string };
  post: {
    postStatus:
      | "PUBLISHED"
      | "SCHEDULED"
      | "UNPUBLISHED"
      | "WORKING"
      | "CONFIRMED";
  };
};

export const eventColumns: ColumnDef<EventData>[] = [
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
    accessorKey: "admin.firstName",
    header: "Admin",
    cell: ({ row }) => (
      <div className="center size-10 rounded-full bg-primary text-secondary">
        {row.original.admin.firstName.charAt(0)}
      </div>
    ),
  },
  {
    accessorKey: "startTime",
    header: ({ column }) => (
      <button
        onClick={column.getToggleSortingHandler()}
        className="flex items-center gap-2 font-medium"
      >
        Start Time <ArrowUpDown className="size-4" />
      </button>
    ),
    cell: ({ row }) => {
      const startTime = new Date(row.original.startTime);
      return (
        <div>
          {startTime.toLocaleString("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </div>
      );
    },
  },
  {
    accessorKey: "endTime",
    header: ({ column }) => (
      <button
        onClick={column.getToggleSortingHandler()}
        className="flex items-center gap-2 font-medium"
      >
        End Time <ArrowUpDown className="size-4" />
      </button>
    ),
    cell: ({ row }) => {
      const endTime = new Date(row.original.endTime);
      return (
        <div>
          {endTime.toLocaleString("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </div>
      );
    },
  },
  {
    accessorKey: "post.postStatus",
    header: "Post Status",
    cell: ({ row }) => {
      const status = row.original.post?.postStatus;
      const statusColors: Record<string, string> = {
        PUBLISHED: "bg-green-300",
        SCHEDULED: "bg-blue-300",
        UNPUBLISHED: "bg-red-300",
        WORKING: "bg-yellow-300",
        CONFIRMED: "bg-purple-300",
      };
      return (
        <span
          className={`rounded-3xl border border-primary p-2 text-sm font-medium text-primary ${statusColors[status] || "text-gray-300"}`}
        >
          {status}
        </span>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return <PostNavigateButton postEventId={row.original.id} />;
    },
  },
];

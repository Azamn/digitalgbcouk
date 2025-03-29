import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { ActionsDropdown } from "@/components/common/data-table/action-drop-down";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { EventActionsDropdown } from "./event-action-drop-down";
import InviteEventModal from "./add-members";
import { Events } from "@/server-api/events-api";

export const eventColumns: ColumnDef<Events>[] = [
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
    accessorKey: "client.name",
    header: ({ column }) => (
      <button
        onClick={column.getToggleSortingHandler()}
        className="flex items-center gap-2 font-medium"
      >
        Client <ArrowUpDown className="size-4" />
      </button>
    ),
    cell: ({ row }) => <div>{row.original.client?.name || "N/A"}</div>,
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
      const endTime = new Date(row.getValue("endTime"));
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
    accessorKey: "client.instagramId",
    header: ({ column }) => (
      <button
        onClick={column.getToggleSortingHandler()}
        className="flex items-center gap-2 font-medium"
      >
        Instagram ID <ArrowUpDown className="size-4" />
      </button>
    ),
    cell: ({ row }) => {
      return (
        <div className="text-gray-700">
          {row.original.client?.instagramId || "N/A"}
        </div>
      );
    },
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
    cell: ({ row }) => {
      return (
        <div className="text-gray-700">
          {row.original.client?.instagramPassword || "N/A"}
        </div>
      );
    },
  },

  {
    accessorKey: "members",
    header: "Members",
    cell: ({ row }) => {
      const members = row.original.members || [];
      const eventId = row.original.id; // Ensure you're passing event ID

      return (
        <div className="flex items-center gap-2">
          {/* Display Member Avatars */}
          {members.length > 0 ? (
            <div className="flex gap-2">
              {members.slice(0, 4).map((m, index) => (
                <Tooltip key={index}>
                  <TooltipTrigger>
                    <div className="flex size-9 items-center justify-center rounded-full bg-green-400 text-xs font-bold uppercase text-primary">
                      {m.member.name.charAt(0).toUpperCase()}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="text-secondary">
                    <p>
                      {m.member.name} ({m.member.email})
                    </p>
                  </TooltipContent>
                </Tooltip>
              ))}
              {members.length > 4 && (
                <span className="text-xs text-gray-500">
                  +{members.length - 4} more
                </span>
              )}
            </div>
          ) : (
            <span className="italic text-gray-500">No members added yet</span>
          )}
        </div>
      );
    },
  },

  {
    id: "invite",
    enableHiding: false,
    cell: ({ row }) => {
      const eventId = row.original.id;
      return <InviteEventModal eventId={eventId} />;
    },
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const event = row.original;

      const eventData = {
        id: event.id,
        title: event.title,
        startTime: event.startTime,
        endTime: event.endTime,
        description: event.description,
        additional: event.additional,
        instagramPassword: event.client?.instagramPassword || "N/A",
        instagramId: event.client?.instagramId || "N/A",
        members:
          event.members?.map((m) => ({
            name: m.member.name,
            email: m.member.email,
          })) || [],
      };

      return <EventActionsDropdown eventData={eventData} />;
    },
  },
];

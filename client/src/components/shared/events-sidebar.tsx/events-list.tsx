"use client";

import {
  CalendarDays,
  CheckCircle,
  Clock,
  Hash,
  Instagram,
  XCircle,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Event } from "@/backend/types/api";
import { FC } from "react";
import { Link } from 'next-view-transitions'
import { useAppDispatch } from "@/store";
import { setPostId } from "@/store/states";

interface EventListProps {
  events: Event[];
  roleType: "MEMBER" | "CLIENT";
}

export const EventList: FC<EventListProps> = ({ events, roleType }) => {
  console.log("🚀 ~ events:", events);
  const dispatch = useAppDispatch();

  return (
    <div className="max-h-[80vh] space-y-4 overflow-y-auto px-2 py-6">
      {events?.map((event) => {
        return (
          <div
            key={event.id}
            className="group relative cursor-pointer overflow-hidden rounded-lg border-2 border-dashed border-primary duration-300 hover:translate-x-2"
          >
            <Link
              href={`/${roleType.toLowerCase()}/${event.post?.id}`}
              // onClick={() => handlePostChange(event.post?.id ?? "")}
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center justify-between p-1 transition-colors duration-200 hover:bg-main/30">
                      <div className="flex items-center gap-3">
                        <span className="rounded-md bg-secondary p-1">
                          <Instagram size={28} className="text-pink-400" />
                        </span>
                        <div className="flex flex-col">
                          <span className="font-lexend text-[14px] capitalize text-gray-900">
                            {event.title.split(" ").slice(0, 3).join(" ")}
                          </span>
                          <span className="font-lexend text-sm font-normal text-gray-600">
                            {event.instagramId ?? "@instgramid"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </TooltipTrigger>

                  <TooltipContent className="w-80 rounded-lg border-2 border-dashed border-primary bg-secondary shadow-md">
                    <Card className="border-none shadow-none">
                      <CardContent className="space-y-4 py-4 text-sm text-gray-800">
                        {/* Project Name */}
                        <div className="flex items-center">
                          <Hash className="text-primary" size={18} />
                          <p className="px-2">
                            <strong className="text-gray-900">Event :</strong>{" "}
                            <span className="capitalize text-normal/70">
                              {event.title?.split(" ").slice(0, 2).join(" ") ||
                                "Untitled"}
                            </span>
                          </p>
                        </div>

                        {/* Instagram Handle */}
                        <div className="flex items-center space-x-3">
                          <Instagram size={18} className="text-primary" />
                          <p>
                            <strong className="text-gray-900">
                              Instagram :
                            </strong>{" "}
                            <span className="text-gray-600">
                              @{event.instagramId || "N/A"}
                            </span>
                          </p>
                        </div>

                        {/* Created At */}
                        <div className="flex items-center space-x-3">
                          <CalendarDays className="text-yellow-500" size={18} />
                          <p>
                            <strong className="text-gray-900">
                              Created At :
                            </strong>{" "}
                            <span className="text-gray-600">
                              {event.startTime
                                ? new Date(event.startTime).toLocaleDateString()
                                : "N/A"}
                            </span>
                          </p>
                        </div>

                        {/* End Time */}
                        <div className="flex items-center space-x-3">
                          <Clock className="text-red-500" size={18} />
                          <p>
                            <strong className="text-gray-900">
                              End Time :
                            </strong>{" "}
                            <span className="text-gray-600">
                              {event.endTime
                                ? new Date(event.endTime).toLocaleDateString()
                                : "N/A"}
                            </span>
                          </p>
                        </div>

                        {/* Published Status */}
                        <div className="flex items-center space-x-3">
                          {event.post?.isPublished ? (
                            <>
                              <CheckCircle
                                className="text-green-500"
                                size={18}
                              />
                              <p>
                                <strong className="text-gray-900">
                                  Status:
                                </strong>{" "}
                                <span className="font-medium text-green-600">
                                  Published
                                </span>
                              </p>
                            </>
                          ) : (
                            <>
                              <XCircle className="text-red-500" size={18} />
                              <p>
                                <strong className="text-gray-900">
                                  Status:
                                </strong>{" "}
                                <span className="font-medium text-red-600">
                                  Not Published
                                </span>
                              </p>
                            </>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

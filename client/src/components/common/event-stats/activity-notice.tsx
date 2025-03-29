"use client";

import {
  Building2,
  CalendarPlus,
  UserPlus,
  Megaphone,
  CheckCircle2,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { useGetNotificationsQuery } from "@/store/api-endpoints/user-api";
import { NotificationPayloadType } from "@/types/global.types";
import { formatTimeAgo } from "@/fonts/helpers";
import { useSocketContext } from "@/components/shared/providers/socket-provider";
import { useEffect } from "react";
import { useAppToasts } from "@/hooks/use-app-toast";

const notificationIcons = {
  ADDED_TO_NEW_ORGANIZATION: Building2,
  ADDED_TO_NEW_EVENT: CalendarPlus,
  PUBLISHED_BY_ADMIN: Megaphone,
  NEW_EVENT_CREATED_BY_ADMIN: CalendarPlus,
  EVENT_CONFIRM_BY_CLIENT: CheckCircle2,
};

const notificationTitles = {
  ADDED_TO_NEW_ORGANIZATION: "New Organization Added",
  ADDED_TO_NEW_EVENT: "Added To New Event",
  PUBLISHED_BY_ADMIN: "New Post Published",
  NEW_EVENT_CREATED_BY_ADMIN: "New Event Created",
  EVENT_CONFIRM_BY_CLIENT: "Event Confirmed By Client",
};

const ActivityNotices = () => {
  const { data, refetch } = useGetNotificationsQuery();
  const { socket } = useSocketContext();
  const { SuccessToast } = useAppToasts();

  useEffect(() => {
    if (!socket) return;

    const handleNotification = (payload: NotificationPayloadType) => {
      SuccessToast({ title: payload.message });
      refetch();
    };

    socket.on("notification", handleNotification);
    return () => {
      socket.off("notification", handleNotification);
    };
  }, [socket, refetch, SuccessToast]);

  const notificationsToDisplay = data?.result?.slice(0, 3) || [];

  return (
    <>
      {notificationsToDisplay.length > 0 && (
        <Card className="border-primary/10 bg-secondary col-span-full w-full overflow-hidden rounded-xl border">
          <div className="bg-secondary p-6">
            <CardContent className="space-y-4 p-0">
              {notificationsToDisplay.map(
                (notification: NotificationPayloadType, index: number) => {
                  const Icon =
                    notificationIcons[notification.notificationType] ||
                    Megaphone;
                  const title =
                    notificationTitles[notification.notificationType] ||
                    "Notification";

                  return (
                    <div
                      key={index}
                      className="border-primary/10 bg-secondary hover:border-primary/20 group relative flex items-start gap-4 rounded-lg border p-4 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
                    >
                      <div className="bg-primary text-secondary flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-all duration-300">
                        <Icon className="h-6 w-6" />
                      </div>

                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-primary font-medium">
                            {title}
                          </span>
                          <span className="text-primary/60 text-xs">
                            {formatTimeAgo(notification.createdAt)}
                          </span>
                        </div>
                        <p className="text-primary/80 line-clamp-2 text-sm">
                          {notification.message}
                        </p>
                      </div>

                      <div className="via-primary/10 absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    </div>
                  );
                },
              )}
            </CardContent>
          </div>
        </Card>
      )}
    </>
  );
};

export default ActivityNotices;

import { useState } from "react";
import {
  Bell,
  CheckCircle,
  AlertCircle,
  UserPlus,
  Calendar,
} from "lucide-react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const notifications: {
  id: number;
  message: string;
  type: "success" | "info" | "warning";
  date: Date;
}[] = [
  {
    id: 1,
    message: "Event registration successful",
    type: "success",
    date: new Date(2024, 2, 20, 14, 30),
  },
  {
    id: 2,
    message: "New participant John Doe joined your event",
    type: "info",
    date: new Date(2024, 2, 20, 15, 45),
  },
  {
    id: 3,
    message: "Event starts in 1 hour",
    type: "warning",
    date: new Date(2024, 2, 20, 16, 0),
  },
];

const typeStyles = {
  success:
    "bg-emerald-50 border-emerald-200 dark:bg-emerald-950/50 dark:border-emerald-800",
  info: "bg-purple-50 border-purple-200 dark:bg-purple-950/50 dark:border-purple-800",
  warning:
    "bg-amber-50 border-amber-200 dark:bg-amber-950/50 dark:border-amber-800",
} as const;

const iconMap = {
  success: (
    <CheckCircle className="h-5 w-5 text-emerald-500 dark:text-emerald-400" />
  ),
  info: <UserPlus className="h-5 w-5 text-purple-500 dark:text-purple-400" />,
  warning: (
    <AlertCircle className="h-5 w-5 text-amber-500 dark:text-amber-400" />
  ),
} as const;

function NotificationCard() {
  const [unreadCount, setUnreadCount] = useState(notifications.length);

  return (
    <Card className="w-full ">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-xl font-bold">Notifications</CardTitle>
        <Badge variant="secondary" className="rounded-full px-3">
          {unreadCount} new
        </Badge>
      </CardHeader>
      <CardContent className="space-y-3">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`flex items-start gap-3 rounded-lg border p-3 transition-colors ${typeStyles[notification.type]}`}
          >
            <div className="mt-1">{iconMap[notification.type]}</div>
            <div className="flex-1 space-y-1">
              <p className="text-sm text-gray-800 dark:text-gray-200">
                {notification.message}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {format(notification.date, "MMM d, h:mm a")}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default NotificationCard;

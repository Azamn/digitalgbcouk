"use client";
import {
  Calendar,
  ExternalLink,
  MoreHorizontal,
  ImageIcon,
  Maximize,
  Maximize2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar"; // assuming you're using shadcn calendar
import { format } from "date-fns";
import { useState } from "react";
import { DateTimePicker12h } from "@/components/date-time-picker";

export default function PostHeader() {
  const [datetime, setDatetime] = useState<Date | undefined>();

  const handleSubmit = () => {
    if (datetime) {
      const iso = datetime.toISOString();
      console.log("Submit to DB:", iso);
    }
  };

  return (
    <div className="flex items-center justify-between  px-4 py-2">
      <div className="flex items-center gap-3">
        {/* Avatar Icon */}
        <div className="bg-muted flex h-9 w-9 items-center justify-center rounded-full border">
          <ImageIcon className="text-muted-foreground h-4 w-4" />
        </div>

        {/* Email and Date Picker */}
        <div className="text-muted-foreground flex items-center gap-2 text-sm">
          <span className="font-medium text-black">
            shivam850anand@gmail.com
          </span>
          <span className="mx-1 text-gray-400">•</span>

          <DateTimePicker12h value={datetime} onChange={setDatetime} />
        </div>
      </div>

      {/* Expand & More Options */}
      <div className="flex items-center gap-2 pl-5">
        <Button variant="ghost" size="icon" className="h-6 w-6">
          <Maximize2 className="text-muted-foreground h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-6 w-6">
          <MoreHorizontal className="text-muted-foreground h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

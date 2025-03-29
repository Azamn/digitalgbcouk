"use client";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import React, { FC, useState } from "react";
import {
  format,
  getDay,
  parse,
  startOfWeek,
  addMonths,
  subMonths,
} from "date-fns";
import { enUS } from "date-fns/locale";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Button } from "@/components/ui/button";
import { CalendarIcon, ChevronRight, ChevronLeft } from "lucide-react";
import "@/styles/calendar.css";

// Define TaskStatus enum
export enum TaskStatus {
  ToDo = "ToDo",
  OnGoing = "OnGoing",
  Completed = "Completed",
}

interface EventcardProps {
  id: string;
  category: string;
  priority: string;
  status: TaskStatus;
  title: string;
  end: Date;
  start: Date;
}

const statusColor: Record<TaskStatus, string> = {
  [TaskStatus.ToDo]: cn(
    "text-blue-700 bg-blue-100 border border-blue-500",
    "dark:text-blue-300 dark:bg-blue-900 dark:border-blue-400"
  ),
  [TaskStatus.OnGoing]: cn(
    "text-yellow-700 bg-yellow-100 border border-yellow-500",
    "dark:text-yellow-300 dark:bg-yellow-900 dark:border-yellow-400"
  ),
  [TaskStatus.Completed]: cn(
    "text-green-700 bg-green-100 border border-green-500",
    "dark:text-green-300 dark:bg-green-900 dark:border-green-400"
  ),
};

const CalandarEventCard: FC<EventcardProps> = ({ title, status }) => {
  const router = useRouter();

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log(e.target);
    // Example of navigating to a specific event (modify as needed)
    // router.push(`/event/${id}`);
  };

  return (
    <div className="px-2">
      <div
        onClick={onClick}
        className={cn(
          "text-pretty rounded-md p-1.5 text-xs font-medium transition-colors cursor-pointer",
          "bg-white dark:bg-gray-800 text-primary dark:text-white",
          statusColor[status]
        )}
      >
        <p>{title}</p>
      </div>
    </div>
  );
};


// Calendar Component
const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const dummyTasks = [
  {
    id: "1",
    title: "Project Kickoff Meeting",
    dueDate: format(new Date(), "EEEE, MMMM d, yyyy"),
    status: TaskStatus.ToDo,
    category: "Meeting",
    priority: "High",
  },
  {
    id: "2",
    title: "Submit Report",
    dueDate: format(addMonths(new Date(), 1), "EEEE, MMMM d, yyyy"),
    status: TaskStatus.Completed,
    category: "Work",
    priority: "Medium",
  },
  {
    id: "3",
    title: "Team Outing",
    dueDate: format(subMonths(new Date(), 1), "EEEE, MMMM d, yyyy"),
    status: TaskStatus.OnGoing,
    category: "Social",
    priority: "Low",
  },
];

interface ToolbarProps {
  date: Date;
  onNavigate: (action: "PREV" | "NEXT" | "TODAY") => void;
}

const Toolbar: FC<ToolbarProps> = ({ date, onNavigate }) => {
  return (
    <div className="mb-4 flex w-full flex-wrap items-center justify-center gap-x-2 gap-y-2 rounded-md lg:w-auto lg:justify-start">
      <Button variant="secondary" size="icon" onClick={() => onNavigate("PREV")}>
        <ChevronLeft size={16} />
      </Button>
      <div className="flex h-9 w-full items-center justify-center rounded-md bg-secondary px-3 lg:w-auto">
        <CalendarIcon size={16} className="mr-2" />
        <p className="text-sm sm:text-base">{format(date, "MMMM yyyy")}</p>
      </div>
      <Button variant="secondary" size="icon" onClick={() => onNavigate("NEXT")}>
        <ChevronRight size={16} />
      </Button>
    </div>
  );
};

const CalendarView = () => {
  const [value, setValue] = useState(new Date());
  const formatStr = "EEEE, MMMM d, yyyy";

  const events = dummyTasks.map((task) => ({
    id: task.id,
    title: task.title,
    start: parse(task.dueDate, formatStr, new Date()),
    end: parse(task.dueDate, formatStr, new Date()),
    status: task.status,
    category: task.category,
    priority: task.priority,
  }));

  const handleNavigate = (action: "PREV" | "NEXT" | "TODAY") => {
    if (action === "PREV") setValue(subMonths(value, 1));
    else if (action === "NEXT") setValue(addMonths(value, 1));
    else if (action === "TODAY") setValue(new Date());
  };

  return (
    <div className="mt-5 h-full w-full overflow-hidden sm:overflow-x-auto">
      <Toolbar date={value} onNavigate={handleNavigate} />
      <Calendar
        localizer={localizer}
        date={value}
        events={events}
        views={["month"]}
        defaultView="month"
        toolbar={false}
        showAllEvents
        className="h-auto min-h-[500px] w-full rounded-md bg-white shadow-sm sm:min-h-[600px]"
        formats={{
          weekdayFormat: (date, culture, localizer) =>
            localizer?.format(date, "EEE", culture) ?? "",
        }}
        components={{
          eventWrapper: ({ event }) => (
            <CalandarEventCard
              id={event.id}
              category={event.category}
              priority={event.priority}
              status={event.status}
              title={event.title}
              end={event.end}
              start={event.start}
            />
          ),
        }}
      />
    </div>
  );
};

export default CalendarView;

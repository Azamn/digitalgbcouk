"use client";
import * as React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarClock, Clock } from "lucide-react";

const times = Array.from({ length: 24 }, (_, hour) => {
  const h = hour.toString().padStart(2, "0");
  return [`${h}:00`, `${h}:30`];
}).flat();

const DateTimePicker = ({
  date,
  onChange,
}: {
  date?: Date;
  onChange?: (date: Date) => void;
}) => {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    date,
  );
  const [selectedTime, setSelectedTime] = React.useState<string>("00:00");
  const [open, setOpen] = React.useState(false);

  // Combine date and time into one Date object
  const handleDateChange = (day: Date) => {
    const [hours, minutes] = selectedTime.split(":").map(Number);
    const updatedDate = new Date(day);
    updatedDate.setHours(Number(hours));
    updatedDate.setMinutes(Number(minutes));
    setSelectedDate(updatedDate);
    onChange?.(updatedDate);
  };

  const handleTimeChange = (time: string) => {
    setSelectedTime(time);
    if (selectedDate) {
      const [hours, minutes] = time.split(":").map(Number);
      const updatedDate = new Date(selectedDate);
      updatedDate.setHours(Number(hours));
      updatedDate.setMinutes(Number(minutes));
      setSelectedDate(updatedDate);
      onChange?.(updatedDate);
    }
    setOpen(false); 
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start rounded-lg bg-white border-primary border-2 border-dashed p-4 text-left text-sm font-normal shadow-sm   transition hover:shadow-md focus:ring-primary",
            !selectedDate && "text-muted-foreground",
          )}
        >
          <CalendarClock size={20} />
          {selectedDate ? (
            <>
              <span>
                {format(selectedDate, "PPP")} at {format(selectedDate, "HH:mm")}
              </span>
            </>
          ) : (
            <span>Select date & time</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex max-h-[500px] w-auto space-y-4 overflow-y-auto rounded-lg bg-white p-4 shadow-lg">
        {/* Date Picker */}
        <div className="flex justify-center">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(day) => handleDateChange(day!)}
            initialFocus
          />
        </div>

        {/* Time Picker */}
        <div className="grid h-[280px] grid-cols-3 gap-2 overflow-y-auto rounded-md border border-gray-200 bg-gray-50 p-2">
          {times.map((time) => (
            <button
              key={time}
              type="button"
              onClick={() => handleTimeChange(time)}
              className={cn(
                "flex items-center justify-start gap-2 rounded-md px-3 py-2 text-sm text-gray-700 transition hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-primary",
                time === selectedTime &&
                  "bg-green-200 font-semibold text-green-800",
              )}
            >
              <Clock className="h-4 w-4 text-gray-500" />
              {time}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DateTimePicker;

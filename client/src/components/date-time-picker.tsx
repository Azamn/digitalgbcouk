"use client";

import * as React from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface DateTimePickerProps {
  value?: Date;
  onChange: (date: Date) => void;
  className?: string;
  label?: string;
}

export function DateTimePicker12h({
  value,
  onChange,
  className,
  label = "Select date & time",
}: DateTimePickerProps) {
  const [internalDate, setInternalDate] = React.useState<Date | undefined>(
    value,
  );
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    if (value) setInternalDate(value);
  }, [value]);

  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const minutes = Array.from({ length: 12 }, (_, i) => i * 5);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      const newDate = new Date(selectedDate);
      if (internalDate) {
        newDate.setHours(internalDate.getHours());
        newDate.setMinutes(internalDate.getMinutes());
      }
      setInternalDate(newDate);
      onChange(newDate);
    }
  };

  const handleTimeChange = (
    type: "hour" | "minute" | "ampm",
    value: string,
  ) => {
    if (!internalDate) return;
    const newDate = new Date(internalDate);

    if (type === "hour") {
      const currentHours = newDate.getHours();
      const isPM = currentHours >= 12;
      const hour = parseInt(value) % 12;
      newDate.setHours(hour + (isPM ? 12 : 0));
    }

    if (type === "minute") {
      newDate.setMinutes(parseInt(value));
    }

    if (type === "ampm") {
      const hours = newDate.getHours();
      if (value === "AM" && hours >= 12) {
        newDate.setHours(hours - 12);
      }
      if (value === "PM" && hours < 12) {
        newDate.setHours(hours + 12);
      }
    }

    setInternalDate(newDate);
    onChange(newDate);
  };

  const getFormatted = () =>
    internalDate ? format(internalDate, "MM/dd/yyyy hh:mm a") : label;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button className="text-sm whitespace-nowrap">{getFormatted()}</button>
      </PopoverTrigger>
      <PopoverContent className="w-auto rounded-xl border bg-white p-0 shadow-lg">
        <div className="sm:flex">
          <Calendar
            mode="single"
            selected={internalDate}
            onSelect={handleDateSelect}
            initialFocus
          />
          <div className="flex flex-col divide-y sm:h-[300px] sm:flex-row sm:divide-x sm:divide-y-0">
            {/* Hour Picker */}
            <ScrollArea className="bg-muted/50 w-64 sm:w-auto">
              <div className="flex gap-1 p-2 sm:flex-col">
                {hours.map((hour) => (
                  <Button
                    key={hour}
                    size="icon"
                    // @ts-ignore
                    className={`aspect-square shrink-0 sm:w-full ${internalDate?.getHours() % 12 === hour % 12 ? "bg-blue-200" : "bg-white shadow-none"}`}
                    onClick={() => handleTimeChange("hour", hour.toString())}
                  >
                    {hour}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="sm:hidden" />
            </ScrollArea>

            {/* Minute Picker */}
            <ScrollArea className="bg-muted/50 w-64 sm:w-auto">
              <div className="flex gap-1 p-2 sm:flex-col">
                {minutes.map((minute) => (
                  <Button
                    key={minute}
                    size="icon"
                    className={`aspect-square shrink-0 sm:w-full ${internalDate?.getMinutes() === minute ? "bg-blue-200" : "bg-white shadow-none"}`}
                    onClick={() =>
                      handleTimeChange("minute", minute.toString())
                    }
                  >
                    {minute.toString().padStart(2, "0")}
                  </Button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="sm:hidden" />
            </ScrollArea>

            {/* AM/PM Picker */}
            <div className="bg-muted/50 flex gap-1 p-2 sm:flex-col">
              {["AM", "PM"].map((ampm) => (
                <Button
                  key={ampm}
                  size="icon"
                  className={`aspect-square shrink-0 sm:w-full ${
                    internalDate &&
                    ((ampm === "AM" && internalDate.getHours() < 12) ||
                      (ampm === "PM" && internalDate.getHours() >= 12))
                      ? "bg-blue-200"
                      : "bg-white shadow-none"
                  }`}
                  onClick={() => handleTimeChange("ampm", ampm)}
                >
                  {ampm}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

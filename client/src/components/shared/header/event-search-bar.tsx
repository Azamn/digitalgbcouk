"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Calendar, Users, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import useAuth from "@/hooks/use-auth";
import { useGetEventByTextSearchQuery } from "@/server-api/events-api";

interface SearchType {
  text: string;
}

const EventSearchbar = () => {
  const { register, watch } = useForm<SearchType>({
    defaultValues: {
      text: "",
    },
  });
  const user = useAuth();
  const watchText = watch("text");
  const [searchText, setSearchText] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setSearchText(watchText.trim());
    }, 500);
    return () => clearTimeout(debounceTimer);
  }, [watchText]);

  const { data, isFetching, error } = useGetEventByTextSearchQuery(
    { searchText },
    { skip: !searchText },
  );

  const events = data?.result ?? [];

  useEffect(() => {
    setIsOpen(searchText.length > 0 && events.length > 0);
  }, [searchText, events]);

  return (
    <div className="relative mx-auto w-full max-w-xl px-4">
      <form onSubmit={(e) => e.preventDefault()} className="relative w-full">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            size={20}
          />
          <Input
            type="text"
            placeholder="Search events"
            {...register("text")}
            className="w-full rounded-full border bg-white py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary"
            onFocus={() => searchText && setIsOpen(true)}
          />
        </div>
      </form>

      {/* Search Results Dropdown */}
      <Card
        className={cn(
          "absolute left-0 right-0 mt-2 overflow-hidden rounded-2xl bg-secondary p-4 shadow-lg transition-all duration-200",
          isOpen
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-4 opacity-0",
          isFetching ? "min-h-[150px]" : "",
        )}
      >
        <ScrollArea className="max-h-[400px] overflow-y-auto rounded-md bg-secondary">
          {isFetching ? (
            <div className="flex h-full items-center justify-center p-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <p className="text-destructive p-4 text-center text-sm">
              Something went wrong while searching.
            </p>
          ) : events.length === 0 && searchText ? (
            <p className="text-muted-foreground p-4 text-center text-sm">
              No events found matching "{searchText}"
            </p>
          ) : (
            <div className="divide-y">
              {events.map((event) => (
                <Link key={event.id} href={`/${user?.role?.toLowerCase()}/${user?.id}/events-list/${event.id}`}>
                  <div className="mb-2 flex cursor-pointer gap-4 rounded-md bg-primary/10 p-4 transition-colors hover:bg-primary/30">
                    {/* Avatar with first letter */}
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-xl font-bold text-secondary shadow-md">
                      {event.title.charAt(0).toUpperCase()}
                    </div>

                    {/* Event Details */}
                    <div className="flex-1">
                      <h3 className="text-lg font-medium capitalize">
                        {event.title}
                      </h3>
                      <div className="mt-2 flex flex-wrap items-center gap-4 text-xs">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {new Date(event.startTime).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {new Date(event.endTime).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </ScrollArea>
      </Card>

      {isOpen && (
        <div
          className="fixed inset-0 z-[-1]"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default EventSearchbar;

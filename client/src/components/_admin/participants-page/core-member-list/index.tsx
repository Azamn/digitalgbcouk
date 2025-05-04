"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetallCoreMembersQuery } from "@/backend/participant.api";
import { Badge } from "@/components/ui/badge";
import { MoreVertical, Plus } from "lucide-react";
import AddCoreMember from "./add-member/sheet";
import DataLoader from "@/components/shared/loader/data-laoder";

const ITEMS_PER_LOAD = 12;

export default function CoreMemberList() {
  const { data, isLoading } = useGetallCoreMembersQuery();
  const clients = data?.result ?? [];

  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);

  const loadMoreRef = useRef<HTMLDivElement>(null);

  const filteredClients = useMemo(() => {
    return clients.filter((member) =>
      member.user.userName.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, clients]);

  const visibleClients = useMemo(() => {
    return filteredClients.slice(0, visibleCount);
  }, [filteredClients, visibleCount]);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry?.isIntersecting) {
        setVisibleCount((prev) =>
          Math.min(prev + ITEMS_PER_LOAD, filteredClients.length),
        );
      }
    },
    [filteredClients.length],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    });

    const current = loadMoreRef.current;
    if (current) observer.observe(current);
    return () => {
      if (current) observer.unobserve(current);
    };
  }, [handleObserver]);

  if (isLoading) {
    return <DataLoader />;
  }

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-start gap-x-3">
        <Input
          placeholder="Search core members..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setVisibleCount(ITEMS_PER_LOAD);
          }}
          className="max-w-sm bg-white"
        />
        <AddCoreMember />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {visibleClients.map((member) => (
          <Card className="border border-slate-200 bg-white" key={member.id}>
            <CardHeader className="flex flex-row items-start justify-between">
              <div>
                <CardTitle className="text-lg">
                  {member.user.userName}
                </CardTitle>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:bg-muted"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>

            <CardContent className="text-muted-foreground space-y-1 text-sm">
              <p>Email: {member.user.email}</p>
              <div>
                Status:{" "}
                <Badge
                  variant="outline"
                  className={`rounded-full px-2 py-1 text-xs font-medium ${
                    member.user.inviteStatus === "ACCEPTED"
                      ? "border-green-300 bg-green-100 text-green-800"
                      : "border-yellow-300 bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {member.user.inviteStatus}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {visibleClients.length < filteredClients.length && (
        <div ref={loadMoreRef} className="h-10 w-full" />
      )}
    </div>
  );
}

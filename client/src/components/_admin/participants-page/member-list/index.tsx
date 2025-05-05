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
import { useGetallMembersQuery } from "@/backend/participant.api";
import { Badge } from "@/components/ui/badge";
import { MoreVertical, Plus } from "lucide-react";
import AddMember from "./add-member/sheet";
import DataLoader from "@/components/shared/loader/data-laoder";
import { EditMemberType } from "./edit-member/schema";
import EditMemberModal from "./edit-member";

const ITEMS_PER_LOAD = 12;

export default function MemberList() {
  const { data, isLoading } = useGetallMembersQuery();
  const clients = data?.result ?? [];

  const [search, setSearch] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<EditMemberType | null>(
    null,
  );
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);

  const loadMoreRef = useRef<HTMLDivElement>(null);

  const handleEdit = (
    id: string,
    email: string,
    role: "MEMBER" | "COREMEMBER",
  ) => {
    setSelectedClient({
      id,
      email,
      role,
    });
    setEditOpen(true);
  };

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
          placeholder="Search clients..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setVisibleCount(ITEMS_PER_LOAD);
          }}
          className="max-w-sm bg-white"
        />
        <AddMember />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {visibleClients.map((member) => (
          <Card
            className="border border-primary/60 bg-white"
            key={member.id}
          >
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
                <DropdownMenuContent className="bg-white" align="end">
                  <DropdownMenuItem
                    onClick={() =>
                      handleEdit(member.id, member.user.email, member.user.role)
                    }
                  >
                    Edit
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>

            <CardContent className="text-muted-foreground space-y-1 text-sm">
              <p>Email: {member.user.email}</p>
            
            </CardContent>
          </Card>
        ))}
      </div>

      {visibleClients.length < filteredClients.length && (
        <div ref={loadMoreRef} className="h-10 w-full" />
      )}
      {selectedClient && (
        <EditMemberModal
          open={editOpen}
          onOpenChange={setEditOpen}
          defaultValues={selectedClient}
          onSuccess={() => {}}
        />
      )}
    </div>
  );
}

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
import {
  MoreVertical,
  Plus,
  Mail,
  User,
  Loader2,
  Loader2Icon,
} from "lucide-react";
import DataLoader from "@/components/shared/loader/data-laoder";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import AddMember from "../member-list/add-member/sheet";
import EditMemberModal from "../member-list/edit-member";
import { EditMemberType } from "../member-list/edit-member/schema";

const ITEMS_PER_LOAD = 12;

export default function MemberList() {
  const { data, isLoading, isError, refetch } = useGetallMembersQuery();
  const members = data?.result ?? [];

  const [search, setSearch] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<EditMemberType | null>(
    null,
  );
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const loadMoreRef = useRef<HTMLDivElement>(null);

  const filteredMembers = useMemo(() => {
    return members.filter(
      (member) =>
        member.user.userName.toLowerCase().includes(search.toLowerCase()) ||
        member.user.email.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, members]);

  const visibleMembers = useMemo(() => {
    return filteredMembers.slice(0, visibleCount);
  }, [filteredMembers, visibleCount]);

  const handleEdit = (member: EditMemberType) => {
    setSelectedMember(member);
    setEditOpen(true);
  };

  const handleObserver = useCallback(
    async (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry?.isIntersecting && visibleCount < filteredMembers.length) {
        setIsLoadingMore(true);
        await new Promise((resolve) => setTimeout(resolve, 300));
        setVisibleCount((prev) =>
          Math.min(prev + ITEMS_PER_LOAD, filteredMembers.length),
        );
        setIsLoadingMore(false);
      }
    },
    [filteredMembers.length, visibleCount],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "20px",
      threshold: 0.1,
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

  if (isError) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-4">
        <div className="text-center text-red-500">Failed to load members</div>
        <Button variant="outline" onClick={() => refetch()}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-gray-900">Team Members</h2>
          <p className="text-sm text-gray-500">
            {filteredMembers.length}{" "}
            {filteredMembers.length === 1 ? "member" : "members"} found
            {search && ` matching "${search}"`}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Input
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setVisibleCount(ITEMS_PER_LOAD);
            }}
            className="w-full bg-gray-50 focus:bg-white sm:w-64"
          />
          <AddMember />
        </div>
      </div>

      {filteredMembers.length === 0 ? (
        <div className="flex h-64 flex-col items-center justify-center rounded-lg border border-dashed bg-gray-50">
          <p className="text-gray-500">
            {search ? "No members match your search" : "No members found"}
          </p>
          {search && (
            <Button
              variant="ghost"
              onClick={() => setSearch("")}
              className="mt-2"
            >
              Clear search
            </Button>
          )}
        </div>
      ) : (
        <TooltipProvider>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visibleMembers.map((member) => (
              <Card
                key={member.id}
                className="group relative overflow-hidden border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary to-secondary" />
                <CardHeader className="flex flex-row items-start justify-between pb-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/10 font-medium text-primary">
                        {member.user.userName.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="overflow-hidden">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <CardTitle className="truncate text-base font-medium text-gray-900">
                            {member.user.userName}
                          </CardTitle>
                        </TooltipTrigger>
                        <TooltipContent>{member.user.userName}</TooltipContent>
                      </Tooltip>
                      <Badge
                        variant={
                          member.user.role === "COREMEMBER"
                            ? "default"
                            : "outline"
                        }
                        className="mt-1 text-xs"
                      >
                        {member.user.role === "COREMEMBER"
                          ? "Core Member"
                          : "Member"}
                      </Badge>
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-gray-400 hover:bg-gray-50 hover:text-gray-600"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-40 bg-white" align="end">
                      <DropdownMenuItem
                        onClick={() =>
                          handleEdit({
                            id: member.id,
                            email: member.user.email,
                            role: member.user.role,
                          })
                        }
                        className="cursor-pointer"
                      >
                        Edit Member
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardHeader>
                <CardContent className="space-y-3 pt-0">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="h-4 w-4 flex-shrink-0 text-gray-400" />
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="truncate text-gray-600">
                          {member.user.email}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>{member.user.email}</TooltipContent>
                    </Tooltip>
                  </div>
                </CardContent>{" "}
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-l from-primary to-secondary" />
              </Card>
            ))}
          </div>

          {visibleMembers.length < filteredMembers.length && (
            <div
              ref={loadMoreRef}
              className={cn(
                "flex h-16 items-center justify-center",
                visibleMembers.length > 0 ? "pt-4" : "pt-0",
              )}
            >
              {isLoadingMore ? (
                <Loader2Icon className="h-6 w-6 animate-spin text-primary" />
              ) : (
                <Button
                  variant="ghost"
                  onClick={() =>
                    setVisibleCount((prev) =>
                      Math.min(prev + ITEMS_PER_LOAD, filteredMembers.length),
                    )
                  }
                >
                  Load More
                </Button>
              )}
            </div>
          )}
        </TooltipProvider>
      )}

      {selectedMember && (
        <EditMemberModal
          open={editOpen}
          onOpenChange={setEditOpen}
          defaultValues={selectedMember}
          onSuccess={() => {
            setSelectedMember(null);
            refetch();
          }}
        />
      )}
    </div>
  );
}

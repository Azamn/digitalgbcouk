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
import { useGetallClientsQuery } from "@/backend/participant.api";
import { Badge } from "@/components/ui/badge";
import {
  MoreVertical,
  Plus,
  Mail,
  Users,
  Instagram,
  Loader2,
} from "lucide-react";
import AddClient from "./add-client/sheet";
import DataLoader from "@/components/shared/loader/data-laoder";
import { EditClientType } from "./edit-client/schema";
import EditClientModal from "./edit-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ITEMS_PER_LOAD = 12;

export default function ClientList() {
  const { data, isLoading, isError, refetch } = useGetallClientsQuery();
  const clients = data?.result ?? [];

  const [search, setSearch] = useState("");
  const [editOpen, setEditOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<EditClientType | null>(
    null,
  );
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const loadMoreRef = useRef<HTMLDivElement>(null);

  const filteredClients = useMemo(() => {
    return clients.filter(
      (client) =>
        client.user.userName.toLowerCase().includes(search.toLowerCase()) ||
        client.user.email.toLowerCase().includes(search.toLowerCase()) ||
        client.instagramId?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, clients]);

  const visibleClients = useMemo(() => {
    return filteredClients.slice(0, visibleCount);
  }, [filteredClients, visibleCount]);

  const handleEdit = (client: EditClientType) => {
    setSelectedClient(client);
    setEditOpen(true);
  };

  const handleObserver = useCallback(
    async (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry?.isIntersecting && visibleCount < filteredClients.length) {
        setIsLoadingMore(true);
        // Simulate network delay for better UX
        await new Promise((resolve) => setTimeout(resolve, 500));
        setVisibleCount((prev) =>
          Math.min(prev + ITEMS_PER_LOAD, filteredClients.length),
        );
        setIsLoadingMore(false);
      }
    },
    [filteredClients.length, visibleCount],
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
        <div className="text-center text-red-500">Failed to load clients</div>
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
          <h2 className="text-2xl font-bold text-gray-900">
            Client Management
          </h2>
          <p className="text-sm text-gray-500">
            {filteredClients.length}{" "}
            {filteredClients.length === 1 ? "client" : "clients"} found
            {search && ` matching "${search}"`}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Input
            placeholder="Search by name, email, or Instagram..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setVisibleCount(ITEMS_PER_LOAD);
            }}
            className="w-full bg-gray-50 focus:bg-white sm:w-64"
          />
          <AddClient />
        </div>
      </div>

      {filteredClients.length === 0 ? (
        <div className="flex h-64 flex-col items-center justify-center rounded-lg border border-dashed bg-gray-50">
          <p className="text-gray-500">
            {search ? "No clients match your search" : "No clients found"}
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
            {visibleClients.map((client) => (
              <Card
                key={client.id}
                className="group relative overflow-hidden border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary to-secondary" />

                <CardHeader className="flex flex-row items-start justify-between pb-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={client?.avatar} />
                      <AvatarFallback className="bg-primary/10 font-medium text-primary">
                        {client.user.userName.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="overflow-hidden">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <CardTitle className="truncate text-base font-medium text-gray-900">
                            {client.user.userName}
                          </CardTitle>
                        </TooltipTrigger>
                        <TooltipContent>{client.user.userName}</TooltipContent>
                      </Tooltip>
                      <Badge variant="outline" className="mt-1 text-xs">
                        ID: {client.id.slice(0, 6)}
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
                            id: client.id,
                            email: client.user.email,
                            instagramId: client.instagramId,
                            instagramPassword: client.instagramPassword,
                          })
                        }
                        className="cursor-pointer"
                      >
                        Edit Client
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
                          {client.user.email}
                        </span>
                      </TooltipTrigger>
                      <TooltipContent>{client.user.email}</TooltipContent>
                    </Tooltip>
                  </div>

                  {client.instagramId && (
                    <div className="flex items-center gap-3 text-sm">
                      <Instagram className="h-4 w-4 flex-shrink-0 text-gray-400" />
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="truncate text-gray-600">
                            {client.instagramId}
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>{client.instagramId}</TooltipContent>
                      </Tooltip>
                    </div>
                  )}

                  <div className="flex items-center gap-3 text-sm">
                    <Users className="h-4 w-4 flex-shrink-0 text-gray-400" />
                    <span className="text-gray-600">
                      {client.members.length}{" "}
                      {client.members.length === 1 ? "member" : "members"}
                    </span>
                  </div>
                </CardContent>
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-l from-primary to-secondary" />
              </Card>
            ))}
          </div>

          {visibleClients.length < filteredClients.length && (
            <div
              ref={loadMoreRef}
              className={cn(
                "flex h-16 items-center justify-center",
                visibleClients.length > 0 ? "pt-4" : "pt-0",
              )}
            >
              {isLoadingMore ? (
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              ) : (
                <Button
                  variant="ghost"
                  onClick={() =>
                    setVisibleCount((prev) =>
                      Math.min(prev + ITEMS_PER_LOAD, filteredClients.length),
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

      {selectedClient && (
        <EditClientModal
          open={editOpen}
          onOpenChange={setEditOpen}
          defaultValues={selectedClient}
          onSuccess={() => {
            setSelectedClient(null);
            refetch();
          }}
        />
      )}
    </div>
  );
}

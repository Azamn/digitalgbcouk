"use client";

import { useState, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useGetallClientsQuery } from "@/backend/participant.api";
import useAuth from "@/hooks/use-auth";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ITEMS_PER_PAGE = 8;

export default function ClientCards() {
  const { data, isLoading } = useGetallClientsQuery();
  const user = useAuth();
  const clients = data?.result ?? [];

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filteredClients = useMemo(() => {
    return clients.filter((client) =>
      client.user.userName.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, clients]);

  const paginatedClients = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filteredClients.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredClients, page]);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-muted-foreground">Loading clients...</p>
      </div>
    );
  }

  const totalPages = Math.max(
    1,
    Math.ceil(filteredClients.length / ITEMS_PER_PAGE),
  );

  return (
    <div className="space-y-4 border border-slate-200 bg-slate-50 p-4 rounded-md">
      <h5 className="font-spaceGrotesk font-bold underline underline-offset-2 text-base ">ALL CLIENTS</h5>
      <Input
        placeholder="Search clients..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1); // reset on search
        }}
        className="max-w-sm bg-white"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {paginatedClients.map((client) => (
          <Card className="bg-white border border-slate-200" key={client.id}>
            <CardHeader>
              <CardTitle className="text-lg">{client.user.userName}</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-1 text-sm">
              <p>Email: {client.user.email}</p>
              <div>
                Status:{" "}
                <Badge
                  variant="outline"
                  className={`rounded-full px-2 py-1 text-xs font-medium ${
                    client.user.inviteStatus === "ACCEPTED"
                      ? "border-green-300 bg-green-100 text-green-800"
                      : "border-yellow-300 bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {client.user.inviteStatus}
                </Badge>
              </div>
              <p>Members: {client.members.length}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="bg-black text-secondary"
        >
          <ChevronLeft /> Previous
        </Button>

        <Button
          variant="outline"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="bg-black text-secondary"
        >
          Next <ChevronRight />
        </Button>
      </div>
    </div>
  );
}

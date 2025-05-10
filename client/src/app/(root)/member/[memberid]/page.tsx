"use client";

import { useState, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/use-auth";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  User,
  Mail,
  Users,
  KeyIcon,
} from "lucide-react";
import { Link } from "next-view-transitions";
import { useGetListofClientsQuery } from "@/backend/post-api";

const ITEMS_PER_PAGE = 12;

export default function ClientCards() {
  const { data, isLoading } = useGetListofClientsQuery();
  const user = useAuth();
  const clients = data?.result ?? [];
  console.log("🚀 ~ ClientCards ~ data:", data)

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
    <div className="space-y-6 rounded-lg bg-white p-6">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <h2 className="text-2xl font-bold text-gray-900">Client Assigned : </h2>
        <Input
          placeholder="Search clients..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="max-w-md bg-gray-50 focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {paginatedClients.map((client) => (
          <Link
            key={client.id}
            href={`/admin/${user?.id}/workspace?clientId=${client.id}`}
          >
            <Card
              key={client.id}
              className="group relative overflow-hidden border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary to-secondary" />

              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold text-gray-900">
                      {client.user.userName}
                    </CardTitle>
                    <Badge
                      variant="outline"
                      className="mt-1 border-primary/30 bg-primary text-white"
                    >
                      Client ID: {client.id.slice(0, 6)}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span>{client.user.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-gray-400" />
                  <span>{client.members.length} team members</span>
                </div>
                <div className="flex items-center gap-2">
                  <KeyIcon className="h-4 w-4 text-gray-400" />
                  <span>{client.password}</span>
                </div>
              </CardContent>
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-l from-primary to-secondary" />
            </Card>
          </Link>
        ))}
      </div>

      {filteredClients.length === 0 && (
        <div className="flex h-40 items-center justify-center rounded-lg border border-dashed bg-gray-50">
          <p className="text-gray-500">No clients found</p>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing {(page - 1) * ITEMS_PER_PAGE + 1}-
          {Math.min(page * ITEMS_PER_PAGE, filteredClients.length)} of{" "}
          {filteredClients.length} clients
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="flex items-center gap-1 border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
          >
            <ChevronLeft className="h-4 w-4" /> Previous
          </Button>
          <Button
            variant="outline"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="flex items-center gap-1 border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
          >
            Next <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

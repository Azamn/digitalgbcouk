"use client";
import { useGetallClientsQuery } from "@/backend/participant.api";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import useAuth from "@/hooks/use-auth";
const ClientGrid = () => {
  const { data, isLoading } = useGetallClientsQuery();
  const user = useAuth();
  if (isLoading) {
    return (
      <p className="text-muted-foreground text-center">Loading clients...</p>
    );
  }

  const clients = data?.result ?? [];

  return (
    <div className="grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {clients.map((client, index) => (
        <motion.div
          key={client.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Link href={`/admin/${user?.id}/workspace?clientId=${client.id}`}>
            <Card className="bg-white text-black shadow-md transition hover:scale-[1.02]">
              <CardHeader>
                <CardTitle className="text-lg">
                  {client.user.userName}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted text-sm">Instagram ID:</p>
                <p className="text-sm font-medium">
                  {client.instagramId || "N/A"}
                </p>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default ClientGrid;

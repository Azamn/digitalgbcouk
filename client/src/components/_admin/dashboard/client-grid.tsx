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
      <div className="flex h-64 items-center justify-center">
        <p className="text-muted-foreground">Loading clients...</p>
      </div>
    );
  }

  const clients = data?.result ?? [];

  return (
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {clients.map((client, index) => (
        <motion.div
          key={client.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.03 }}
        >
          <Link href={`/admin/${user?.id}/workspace?clientId=${client.id}`}>
            <Card className="rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium text-gray-900 dark:text-white">
                  {client.user.userName}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-end justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Workspace
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default ClientGrid;

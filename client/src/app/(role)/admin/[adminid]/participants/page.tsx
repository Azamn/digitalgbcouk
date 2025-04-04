"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import ClientTable from "@/components/_admin/participants-page/client-table/table";
import MemberTable from "@/components/_admin/participants-page/member-table/table";
import DataLoader from "@/components/shared/loader/data-laoder";
import {
  useGetallClientsQuery,
  useGetallMembersQuery,
} from "@/backend/participant.api";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Participants = () => {
  const { data: clientData, isLoading: clientLoading } =
    useGetallClientsQuery();

  const { data: memberData, isLoading: memberLoading } =
    useGetallMembersQuery();

  const [activeTab, setActiveTab] = React.useState("client");

  if (clientLoading || memberLoading) return <DataLoader />;

  const clientRes = clientData?.result ?? [];
  const memberRes = memberData?.result ?? [];

  const variants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  return (
    <div className="">
      <Tabs
        defaultValue="client"
        value={activeTab}
        onValueChange={setActiveTab}
        className="mt-4 w-full"
      >
        <TabsList className="mx-4 mb-4 grid w-full max-w-md grid-cols-2 gap-x-2">
          {["client", "member"].map((tab) => (
            <motion.div
              key={tab}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <TabsTrigger value={tab} className="w-full">
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </TabsTrigger>
            </motion.div>
          ))}
        </TabsList>
        <AnimatePresence mode="wait">
          {activeTab === "client" && (
            <TabsContent value="client" forceMount>
              <motion.div
                key="client"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.3 }}
              >
                <ClientTable data={clientRes} />
              </motion.div>
            </TabsContent>
          )}

          {activeTab === "member" && (
            <TabsContent value="member" forceMount>
              <motion.div
                key="member"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.3 }}
              >
                <MemberTable data={memberRes} />
              </motion.div>
            </TabsContent>
          )}
        </AnimatePresence>
      </Tabs>
    </div>
  );
};

export default Participants;

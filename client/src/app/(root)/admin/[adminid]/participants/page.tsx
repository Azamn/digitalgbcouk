"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ClientList from "@/components/_admin/participants-page/client-list";
import MemberList from "@/components/_admin/participants-page/member-list";
import CoreMemberList from "@/components/_admin/participants-page/core-member-list";

const Participants = () => {
  const [activeTab, setActiveTab] = React.useState("client");

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
        className="w-full"
      >
        <TabsList className="m-4 grid w-[30%] grid-cols-3 px-4">
          <TabsTrigger
            value="client"
            className={`transition-colors ${
              activeTab === "client" ? "bg-primary text-white" : ""
            }`}
          >
            Client
          </TabsTrigger>
          <TabsTrigger
            value="member"
            className={`transition-colors ${
              activeTab === "member" ? "bg-primary text-white" : ""
            }`}
          >
            Member
          </TabsTrigger>
          <TabsTrigger
            value="coreMember"
            className={`transition-colors ${
              activeTab === "coreMember" ? "bg-primary text-white" : ""
            }`}
          >
            Core-Member
          </TabsTrigger>
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
                <ClientList />
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
                <MemberList />
              </motion.div>
            </TabsContent>
          )}
          {activeTab === "coreMember" && (
            <TabsContent value="member" forceMount>
              <motion.div
                key="member"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={variants}
                transition={{ duration: 0.3 }}
              >
                <CoreMemberList />
              </motion.div>
            </TabsContent>
          )}
        </AnimatePresence>
      </Tabs>
    </div>
  );
};

export default Participants;

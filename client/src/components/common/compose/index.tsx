"use client";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PostCompose from "./post-compose";
import StoryCompose from "./story-compose";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ComposeProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

function Compose({ open, setOpen }: ComposeProps) {
  const [activeTab, setActiveTab] = useState("client");

  const variants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-[calc(100vh-4rem)] overflow-y-auto bg-white p-0 sm:max-w-[600px]">
        <DialogHeader className="hidden px-4 pb-2">
          <DialogTitle className="hidden text-lg font-semibold">
            Create a post
          </DialogTitle>
        </DialogHeader>

        <Tabs
          defaultValue="client"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="m-4 grid w-[40%] space-x-3 grid-cols-3 px-4">
            <TabsTrigger
              value="post"
              className={`transition-colors ${
                activeTab === "post" ? "bg-primary text-white" : ""
              }`}
            >
              Posts
            </TabsTrigger>
            <TabsTrigger
              value="story"
              className={`transition-colors ml-12 ${
                activeTab === "story" ? "bg-primary text-white" : ""
              }`}
            >
              Story
            </TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            {activeTab === "post" && (
              <TabsContent value="post" forceMount>
                <motion.div
                  key="client"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={variants}
                  transition={{ duration: 0.3 }}
                >
                  <PostCompose />
                </motion.div>
              </TabsContent>
            )}

            {activeTab === "story" && (
              <TabsContent value="story" forceMount>
                <motion.div
                  key="story"
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={variants}
                  transition={{ duration: 0.3 }}
                >
                  <StoryCompose />
                </motion.div>
              </TabsContent>
            )}
          </AnimatePresence>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

export default Compose;

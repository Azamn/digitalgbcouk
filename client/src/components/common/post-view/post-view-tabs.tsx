"use client";

import React, { FC, useState } from "react";
import PostPreview from "@/components/common/post-view/post-view";
import MobileView from "@/components/common/post-view/mobile-view";
import { Monitor, Smartphone, MessageSquareText, X } from "lucide-react";
import { motion } from "framer-motion";

// Shadcn UI Components
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PostTypeProps } from "@/types/global.types";
interface PostProps {
  postData: PostTypeProps;
}
const PostViewTabs: FC<PostProps> = ({ postData }) => {
  const [confirmed, setConfirmed] = useState(false);
  const [activeTab, setActiveTab] = useState<"browser" | "mobile">("browser");

  const handleConfirm = () => {
    setConfirmed((prev) => !prev);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-start px-8 py-6">
      {/* Toggle Tabs */}
      <Tabs
        defaultValue="browser"
        value={activeTab}
        onValueChange={(val) => setActiveTab(val as "browser" | "mobile")}
        className="w-full max-w-[1000px]"
      >
        <TabsList className="mx-auto mb-4 flex w-[350px] justify-center rounded-lg bg-gray-100 p-1 shadow">
          <TabsTrigger
            value="browser"
            className="flex flex-1 items-center justify-center gap-2 px-4 py-2 text-sm font-medium transition-all data-[state=active]:bg-primary data-[state=active]:text-secondary"
          >
            <Monitor className="h-4 w-4" />
            Browser
          </TabsTrigger>

          <TabsTrigger
            value="mobile"
            className="flex flex-1 items-center justify-center gap-2 px-4 py-2 text-sm font-medium transition-all data-[state=active]:bg-primary data-[state=active]:text-secondary"
          >
            <Smartphone className="h-4 w-4" />
            Mobile
          </TabsTrigger>
        </TabsList>

        {/* Tabs Content */}
        <TabsContent value="browser" asChild>
          <motion.div
            key="browser"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden rounded-xl"
          >
            <PostPreview postData={postData} />
          </motion.div>
        </TabsContent>

        <TabsContent value="mobile" asChild>
          <motion.div
            key="mobile"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
            className="flex justify-center overflow-hidden"
          >
            <MobileView>
              <PostPreview postData={postData} />
            </MobileView>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PostViewTabs;

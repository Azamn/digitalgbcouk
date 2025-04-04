import React, { useState } from "react";
import PostPreview from "@/components/shared/post-preview/post-view";
import { Post } from "@/backend/types/api";
import MobileView from "@/components/shared/post-preview/mobile-view";
import { Monitor, Smartphone } from "lucide-react";
import { motion } from "framer-motion";

// Shadcn UI components
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const PostViewTabs = ({
  post,
  role,
}: {
  post: Post;
  role?: "CLIENT" | "ADMIN" | "MEMBER";
}) => {
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    setConfirmed((prev) => !prev);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-start py-10">
      {/* Tabs Container */}
      <Tabs defaultValue="browser" className="w-full max-w-[1200px]">
        {/* Tabs Navigation */}
        <TabsList className="bg-muted mx-auto mb-6 flex w-[400px] justify-center rounded-lg p-1 shadow-sm">
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

        {/* Browser View Content */}
        <TabsContent value="browser" asChild>
          <motion.div
            key="browser"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden rounded-xl shadow-md"
          >
            <PostPreview
              post={post}
              confirmed={confirmed}
              role={role}
              onConfirm={handleConfirm}
            />
          </motion.div>
        </TabsContent>

        {/* Mobile View Content */}
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
              <PostPreview
                post={post}
                confirmed={confirmed}
                role={role}
                onConfirm={handleConfirm}
              />
            </MobileView>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PostViewTabs;

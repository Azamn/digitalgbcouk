"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  useGetAllClientPostsQuery,
  useGetAllPostsQuery,
} from "@/backend/post-api";
import { useSearchParams } from "next/navigation";

const ClientStoryView = () => {
  const [isOpen, setIsOpen] = useState(true);

  const { data: storyData } = useGetAllClientPostsQuery();

  console.log("🚀 ~ StoryView ~ storyData:", storyData);
  const storyOnly =
    storyData?.result?.filter((item) => item.type === "STORY") ?? [];

  return (
    <div className="mb-9 w-full rounded-2xl border border-gray-200 bg-white p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-800">
          Stories <span className="text-gray-400">({storyOnly.length})</span>
        </h2>
        <Button
          variant="ghost"
          size="icon"
          className="h-5 w-5 text-gray-600 hover:bg-transparent"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? (
            <Minus className="h-4 w-4" />
          ) : (
            <Plus className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Collapsible Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="story-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mt-4 flex flex-wrap gap-4">
              {/* Render stories */}
              {storyOnly?.map((story) => (
                <div
                  key={story.id}
                  className="h-40 w-28 overflow-hidden rounded-lg border bg-gray-100 shadow-sm"
                >
                  {story.mediaUrl?.endsWith(".mp4") ? (
                    <video
                      src={story.mediaUrl}
                      className="h-full w-full object-cover"
                      muted
                      autoPlay
                      loop
                    />
                  ) : (
                    <img
                      src={story.mediaUrl}
                      alt="Story"
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ClientStoryView;

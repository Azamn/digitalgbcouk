import { Button } from "@/components/ui/button";
import { ChevronDown, Pencil, Upload, X } from "lucide-react";
import Image from "next/image";
import React from "react";
import PostHeader from "./post-header";

const PostCard = () => {
  return (
    <div className="flex flex-col">
      <PostHeader />
      <div className="mx-auto max-w-lg overflow-hidden rounded border bg-white shadow-sm">
        <div className="group relative">
          <Image
            src="https://digitalgb.in/image.png"
            alt="PostCard Image"
            width={470}
            height={500}
            className="w-full object-cover"
          />

          {/* Hover icons */}
          <div className="absolute inset-0 flex items-start justify-between bg-black/10 p-4 opacity-0 transition-opacity group-hover:opacity-100">
            <div className="flex gap-2">
              <Button
                size="icon"
                variant="secondary"
                className="bg-white/80 hover:bg-white"
              >
                <Pencil className="h-4 w-4 text-gray-800" />
              </Button>
              <Button
                size="icon"
                variant="secondary"
                className="bg-white/80 hover:bg-white"
              >
                <Upload className="h-4 w-4 text-gray-800" />
              </Button>
            </div>
            <Button
              size="icon"
              variant="secondary"
              className="bg-white/80 hover:bg-white"
            >
              <X className="h-4 w-4 text-gray-800" />
            </Button>
          </div>
        </div>

        {/* Text content */}
        <div className="space-y-2 p-4">
          <h2 className="text-xl font-bold">👋 Welcome</h2>
          <p>🌟 Welcome to Planable! 🌟</p>
          <p className="text-muted-foreground text-sm">
            This is a placeholder PostCard to give you a little tour of what
            Planable can do for your social media planning and collaboration.
          </p>
          <p className="text-muted-foreground text-sm">
            Welcome aboard, and let’s make your social media management smooth
            and effective!
          </p>
          <div className="text-sm font-medium text-blue-600">
            #Planable #Welcome #SocialMediaManagement
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;

import { Button } from "@/components/ui/button";
import { ChevronDown, Pencil, Upload, X } from "lucide-react";
import Image from "next/image";
import React, { FC } from "react";
import PostHeader from "./post-header";
import { PostTypeProps } from "@/types/global.types";
interface PostProps {
  postData: PostTypeProps;
}
const PostCard: FC<PostProps> = ({ postData }) => {
  return (
    <div key={`post-${postData.id}`} className="flex flex-col pb-5">
      <PostHeader postData={postData} />
      <div className="mx-auto max-w-lg overflow-hidden rounded border bg-white shadow-sm">
        <div className="group relative">
          <Image
            src={postData.mediaUrl || "https://digitalgb.in/image.png"}
            alt="PostCard Image"
            width={470}
            height={500}
            className="w-full object-cover"
          />

          {/* Hover icons */}
          {/* <div className="absolute inset-0 flex items-start justify-between bg-black/10 p-4 opacity-0 transition-opacity group-hover:opacity-100">
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
          </div> */}
        </div>

        {/* Text content */}
        <div className="space-y-2 p-4 text-sm">
          {postData.content.split("\n").map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostCard;

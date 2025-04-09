import { Instagram } from "lucide-react";
import React from "react";
import PostCard from "./postcard";

const Post = () => {
  return (
    <div className="flex">
      <div className="w-[100px]">
        {/* Social Media Selection */}
        <div className="mb-6 flex items-center gap-2">
          <button className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-pink-100 hover:bg-gray-50">
            <Instagram className="h-5 w-5 text-pink-500" />{" "}
            {/* Instagram brand color */}
          </button>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500">
          <span className="text-xl text-white">✓</span>
        </div>
      </div>
      <PostCard />
    </div>
  );
};

export default Post;

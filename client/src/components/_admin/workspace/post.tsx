import { Instagram } from "lucide-react";
import React, { FC } from "react";
import PostCard from "./postcard";
import { PostTypeProps } from "@/types/global.types";

interface PostProps {
  postData: PostTypeProps;
}
const Post: FC<PostProps> = ({ postData }) => {
  return (
    <div className="flex">
      <div className="w-[100px]">
        {/* Social Media Selection */}
        <div className="mb-6 flex items-center gap-2">
          <button className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-pink-100 hover:bg-gray-50">
            <Instagram className="h-5 w-5 text-pink-500" />{" "}
          </button>
        </div>
        <button
          className={`flex h-10 w-10 items-center justify-center rounded-full text-black ${postData.isConfirmedByClient ? "bg-green-300" : "bg-purple"}`}
        >
          <span className="text-xl">✓</span>
        </button>
      </div>
      <PostCard postData={postData} />
    </div>
  );
};

export default Post;

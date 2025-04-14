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
      <div className="w-[100px] mt-4 space-y-3">
        {/* Social Media Selection */}
        <button className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white hover:bg-gray-50">
          <Instagram className="h-5 w-5 text-dark" />{" "}
        </button>
        <button
          className={`flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-black ${postData.isConfirmedByClient ? "bg-green-300" : "bg-white"}`}
        >
          <span className="text-xl">✓</span>
        </button>
      </div>
      <PostCard postData={postData} />
    </div>
  );
};

export default Post;

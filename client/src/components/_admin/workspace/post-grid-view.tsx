"use client";
import React, { FC } from "react";
import { PostTypeProps } from "@/types/global.types";

interface PostGridViewProps {
  posts: PostTypeProps[];
}

const PostGridView: FC<PostGridViewProps> = ({ posts }) => {
  return (
    <div className="flex p-8 flex-wrap">
      {posts.map((post) => (
        <div key={post.id} className="h-[350px] w-[350px] overflow-hidden">
          <img
            src={post.mediaUrl}
            alt="Post"
            className="h-full w-full object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default PostGridView;

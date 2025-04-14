import { Instagram } from "lucide-react";
import React, { FC } from "react";
import PostCard from "./postcard";
import { PostTypeProps } from "@/types/global.types";
import { useConfirmPostMutation } from "@/backend/post-api";
import { useAppToasts } from "@/hooks/use-app-toast";

interface PostProps {
  postData: PostTypeProps;
}

const Post: FC<PostProps> = ({ postData }) => {
  const [confirmPost] = useConfirmPostMutation();
  const { SuccessToast } = useAppToasts();
  const handleConfirm = async () => {
    try {
      const res = await confirmPost({ postId: postData.id }).unwrap();
      if (res.status === "success") {
        SuccessToast({
          title: "Post confirmed",
        });
      }
    } catch (error) {
      console.error("Failed to confirm post:", error);
    }
  };

  return (
    <div className="flex">
      <div className="mt-4 w-[100px] space-y-3">
        {/* Social Media Selection */}
        <button className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white hover:bg-gray-50">
          <Instagram className="h-5 w-5 text-dark" />
        </button>

        {/* Confirm Post */}
        <button
          onClick={handleConfirm}
          className={`flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-black ${
            postData.isConfirmedByClient ? "bg-green-300" : "bg-white"
          }`}
        >
          <span className="text-xl">✓</span>
        </button>
      </div>

      <PostCard postData={postData} />
    </div>
  );
};

export default Post;

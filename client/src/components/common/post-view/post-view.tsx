import { PostTypeProps } from "@/types/global.types";
import { Bookmark, Heart, MessageCircle, Share2 } from "lucide-react";
import { FC } from "react";

interface PostProps {
  postData: PostTypeProps;
}

const PostView: FC<PostProps> = ({ postData }) => {
  return (
    <div className="min-h-screen flex-1 overflow-y-auto">
      <div className="mx-auto max-w-xl">
        <div className="overflow-hidden rounded-xl border-2 border-dotted border-primary/45 bg-white transition-all duration-300">
          {/* 👇 Instagram-style 1:1 Aspect Ratio */}
          <div className="relative aspect-square w-full">
            <img
              src={
                postData.mediaUrl ? postData.mediaUrl : "/digital-market.png"
              }
              alt="Digital marketing image"
              className="absolute left-0 top-0 h-full w-full object-cover"
            />
          </div>

          {/* Post Actions */}
          <div className="flex items-center justify-between border-b p-4">
            <div className="flex items-center space-x-4">
              <Heart className="h-6 w-6 cursor-pointer transition-colors hover:text-red-500" />
              <MessageCircle className="h-6 w-6 cursor-pointer transition-colors hover:text-blue-500" />
              <Share2 className="h-6 w-6 cursor-pointer transition-colors hover:text-green-500" />
            </div>
            <Bookmark className="h-6 w-6 cursor-pointer transition-colors hover:text-yellow-500" />
          </div>

          {/* Caption */}
          <div className="space-y-2 p-4 text-sm">
            {postData.content.split("\n").map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostView;

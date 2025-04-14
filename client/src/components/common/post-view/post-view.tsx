import { PostTypeProps } from "@/types/global.types";
import {
  Bookmark,
  Heart,
  ImageIcon,
  MessageCircle,
  Share2,
} from "lucide-react";
import { FC } from "react";

interface PostProps {
  postData: PostTypeProps;
}

const PostView: FC<PostProps> = ({ postData }) => {
  return (
    <div className="min-h-screen flex-1 overflow-y-auto">
      <div className="mx-auto max-w-xl">
        <div className="overflow-hidden rounded-xl border border-slate-300 transition-all duration-300">
          <div className="relative h-[500px] w-full">
            {" "}
            {/* 👈 Added fixed height (you can adjust as needed) */}
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

          <div className="p-4 text-sm">{postData.content}</div>
        </div>
      </div>
    </div>
  );
};

export default PostView;

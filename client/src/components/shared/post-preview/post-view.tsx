import {
  Bookmark,
  Heart,
  ImageIcon,
  MessageCircle,
  Share2,
} from "lucide-react";
import ConfirmButton from "./confirm-button";
import { Post } from "@/server-api/types/api";

const PostView = ({
  post,
  confirmed,
  role = "MEMBER",
  onConfirm,
}: {
  post: Post;
  confirmed?: boolean;
  role?: "CLIENT" | "ADMIN" | "MEMBER";
  onConfirm?: () => void;
}) => {
  const isAdmin = role === "ADMIN";
  const isClient = role === "CLIENT";
  const isMember = role === "MEMBER";

  const canConfirm = isAdmin || isClient;

  return (
    <div className="min-h-screen flex-1 overflow-y-auto">
      <div className="mx-auto max-w-xl">
        <div className="overflow-hidden rounded-xl border border-slate-300 transition-all duration-300">
          {/* Post Header */}
          <div className="relative flex items-center justify-between space-x-3 border-b p-4 px-5">
            {/* Left Section: Avatar and Info */}
            <div className="flex items-center gap-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary">
                <ImageIcon className="size-6" />
              </div>
              <div>
                <p className="text-sm font-medium">Web Development</p>
                <p className="text-muted-foreground text-xs">
                  {new Date(post.createdAt || "").toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Right Section: Role Badge & Confirm Button */}
            <div className="flex items-center gap-2">
              {/* Role Badge */}
              {(isAdmin || isClient) && (
                <span
                  className={`rounded-full px-2 py-1 text-xs font-medium ${
                    isAdmin
                      ? "bg-green-100 text-green-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {isAdmin ? "Admin" : "Client"}
                </span>
              )}

              {/* Confirm Button (Admin & Client) */}
              {canConfirm && (
                <ConfirmButton confirmed={confirmed!} onConfirm={onConfirm!} />
              )}
            </div>
          </div>

          <div className="relative aspect-square overflow-hidden sm:aspect-[4/3]">
            <img
              src={post.mediaUrl ? post.mediaUrl : "/digital-market.png"}
              alt="Digital marketing image"
              className="absolute inset-0 h-full w-full object-cover"
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

          {/* Post Content */}
          <div className="space-y-4 p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">
                {post.title || "Untitled Post"}
              </h3>
            </div>

            {post.subtitle && (
              <p className="text-muted-foreground">{post.subtitle}</p>
            )}

            <div className="text-sm">
              <p>{post.description}</p>
              {post.additional && (
                <p className="text-muted-foreground mt-2">{post.additional}</p>
              )}
            </div>

            {post.hashtags && (
              <div className="flex flex-wrap gap-2">
                {post.hashtags.split(",").map((tag, index) => (
                  <span
                    key={index}
                    className="cursor-pointer text-sm text-blue-500 hover:underline"
                  >
                    #{tag.trim()}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostView;

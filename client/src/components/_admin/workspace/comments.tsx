"use client";

import { useGetUserInfoQuery } from "@/backend/auth-api";
import {
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useGetCommentsQuery,
} from "@/backend/comment-api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  CornerUpLeft,
  MoreHorizontal,
  SendHorizonal,
  Trash,
} from "lucide-react";
import { useState } from "react";

export default function CommentSection({ postId }: { postId: string }) {
  const [input, setInput] = useState("");
  const { data: userInfo } = useGetUserInfoQuery();
  const { data, refetch, isLoading } = useGetCommentsQuery({ postId });
  const [createComment] = useCreateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();

  const userName = userInfo?.result?.userName || "You";
  const firstLetter = userName.charAt(0).toUpperCase();

  const handleAddComment = async () => {
    if (!input.trim()) return;

    await createComment({
      postId,
      content: input.trim(),
    });

    setInput("");
    refetch();
  };

  const handleDelete = async (commentId: string) => {
    await deleteComment({ commentId });
    refetch();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleAddComment();
  };

  return (
    <div className="mx-auto mt-10 w-[500px] overflow-y-scroll space-y-4 rounded-lg bg-white p-4">
      {/* Input Box */}
      <div className="flex items-start gap-2 rounded-md border-2 border-slate-300 px-3 py-2">
        <div className="flex h-10 min-h-10 w-10 min-w-10 items-center justify-center rounded-full bg-blue-300 font-semibold text-black">
          {firstLetter}
        </div>

        <Input
          placeholder="Say something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="border-none shadow-none focus-visible:ring-0"
        />
        <Button
          variant="ghost"
          size="icon"
          onClick={handleAddComment}
          className="text-muted-foreground h-8 w-8"
        >
          <SendHorizonal className="h-4 w-4" />
        </Button>
      </div>

      {/* Comment List */}
      <div className="space-y-3">
        {isLoading ? (
          <p className="text-muted-foreground text-sm">Loading comments...</p>
        ) : (
          data?.result?.map((comment) => {
            const user = comment.user;
            const name = user?.userName ?? "Unknown";
            const initial = name.charAt(0).toUpperCase();

            return (
              <div key={comment.id} className="rounded-md border p-3">
                <div className="flex items-start gap-3">
                  <div className="text-muted-foreground flex h-8 w-8 items-center justify-center rounded-full bg-secondary font-semibold">
                    {initial}
                  </div>
                  <div className="flex-1">
                    <div className="text-muted-foreground flex items-center justify-between text-sm">
                      <span className="font-medium text-black">{name}</span>
                      <span>
                        {new Date(comment.createdAt).toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="mt-1 text-sm">{comment.content}</p>

                    {/* Action Icons */}
                    <div className="text-muted-foreground mt-2 flex items-center gap-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 p-0"
                              onClick={() => handleDelete(comment.id)}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Delete</p>
                          </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 p-0"
                            >
                              <CornerUpLeft className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Reply</p>
                          </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 p-0"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>More</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

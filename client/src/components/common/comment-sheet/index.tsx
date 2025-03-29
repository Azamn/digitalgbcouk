"use client";

import { useState, useEffect, useRef } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppToasts } from "@/hooks/use-app-toast";
import { CreateCommentSchema, CreateCommentType } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  MessageCircle,
  Send,
  Trash,
  Loader2,
  MessageSquareText,
  MessageSquare,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useGetCommentsByEventQuery,
} from "@/server-api/comment-api";
import Spinner from "@/components/ui/spinner";
import { Badge } from "@/components/ui/badge";

interface CommentsSheetProps {
  postEventId: string;
}

export function CommentsSheet({ postEventId }: CommentsSheetProps) {
  const [open, setOpen] = useState(false);
  const { SuccessToast, ErrorToast } = useAppToasts();

  const { data, isLoading, isError, error } = useGetCommentsByEventQuery(
    { postEventId },
    { skip: !open },
  );

  const [createComment, { isLoading: isCreating }] = useCreateCommentMutation();
  const [deleteComment, { isLoading: isDeleting }] = useDeleteCommentMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateCommentType>({
    resolver: zodResolver(CreateCommentSchema),
    defaultValues: {
      content: "",
    },
  });

  // Handle comment submission
  const submitHandler = async (data: CreateCommentType) => {
    console.log("🚀 ~ submitHandler ~ data:", data);
    if (!data.content.trim()) return;
    try {
      const res = await createComment({
        postEventId,
        content: data.content.trim(),
      }).unwrap();

      if (res.status === "success") {
        SuccessToast({ title: "Comment added successfully!" });
        reset();
      }
    } catch (error: any) {
      ErrorToast({
        title: "Failed to add comment",
        description: error?.data?.message || "Something went wrong.",
      });
    }
  };

  // Handle comment deletion
  const handleDelete = async (commentId: string) => {
    try {
      await deleteComment({ commentId }).unwrap();
      SuccessToast({ title: "Comment deleted successfully!" });
    } catch (error: any) {
      ErrorToast({
        title: "Failed to delete comment",
        description: error?.data?.message || "Something went wrong.",
      });
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className=" rounded-full bg-green-300 text-primary shadow-lg"
        >
          <MessageSquare className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full bg-white sm:max-w-[600px]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5" /> Comments
          </SheetTitle>
        </SheetHeader>

        <div className="mt-4 flex h-[calc(100vh-5rem)] flex-col">
          <ScrollArea className="flex-1 pr-4">
            {/* Loading State */}
            {isLoading && (
              <div className="flex justify-center py-4">
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
                <p className="text-muted-foreground ml-2 text-sm">
                  Loading comments...
                </p>
              </div>
            )}

            {/* Error State */}
            {isError && (
              <div className="flex flex-col items-center py-4 text-red-500">
                <p className="text-sm">Error loading comments.</p>
                <p className="text-xs">{"Please try again later."}</p>
              </div>
            )}

            {/* No Comments */}
            {!isLoading && !isError && data?.result?.length === 0 && (
              <div className="flex justify-center py-4">
                <p className="text-muted-foreground text-sm">
                  Be the first to comment!
                </p>
              </div>
            )}

            {/* Comments List */}
            {data?.result?.map((comment) => (
              <div
                key={comment.id}
                className="my-3 rounded-md bg-blue-100 px-4 py-3 shadow-sm transition-all hover:shadow"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge
                      variant="outline"
                      className="rounded-full bg-primary px-2 py-0.5 text-xs text-secondary"
                    >
                      {comment.user.firstName}
                    </Badge>
                    <span className="text-muted-foreground text-xs">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <Button
                    variant="destructive"
                    size="icon"
                    className="h-7 w-7 rounded-md bg-red-600 transition"
                    onClick={() => handleDelete(comment.id)}
                    disabled={isDeleting}
                  >
                    {isDeleting ? (
                      <Spinner color="white" />
                    ) : (
                      <Trash className="h-3.5 w-3.5" />
                    )}
                  </Button>
                </div>
                <p className="mt-2 text-base leading-relaxed text-dark">
                  {comment.content}
                </p>
              </div>
            ))}
          </ScrollArea>

          {/* Comment Input */}
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="flex w-full gap-x-3 rounded-full border bg-blue-100 p-3 px-5">
              <Input
                {...register("content")}
                placeholder="Write a comment..."
                autoComplete="off"
                className="flex-1 border-none bg-transparent text-base text-dark shadow-none outline-none focus:ring-0"
              />
              <button
                className="center bg-transparent pr-6 shadow-none"
                type="submit"
                disabled={isCreating}
              >
                {isCreating ? <Spinner color="#001f3f" /> : <Send size={29} />}
              </button>
            </div>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default CommentsSheet;

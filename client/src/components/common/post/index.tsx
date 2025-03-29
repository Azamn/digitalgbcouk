"use client";
import React, { useEffect } from "react";
import PostEdit from "./post-edit";
import {
  ResizableHandle,
  ResizablePanelGroup,
  ResizablePanel,
} from "@/components/ui/resizable";
import { useForm } from "react-hook-form";
import { PostEditSchema, PostEditType } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Post,
  useGetPostByIdQuery,
  useUpdatePostMutation,
} from "@/server-api/post-api";
import { useAppToasts } from "@/hooks/use-app-toast";
import DataLoader from "@/components/shared/loader/data-laoder";
import PostView from "./post-view";
import { intialPost } from "@/helpers";
import { Button } from "@/components/ui/button";
import { CheckCircle, MessageSquare, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CommentsSheet from "../comment-sheet";

const EventpostPage = ({
  postEventId,
  role,
}: {
  postEventId: string;
  role: "ADMIN" | "CLIENT" | "MEMBER";
}) => {
  const [isCommentsOpen, setIsCommentsOpen] = React.useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<PostEditType>({
    resolver: zodResolver(PostEditSchema),
    defaultValues: {
      title: intialPost.title,
      subtitle: intialPost.subtitle,
      hashtags: intialPost.hashtags,
      description: intialPost.description,
      additional: intialPost.additional,
      mediaUrl: intialPost.mediaUrl,
    },
  });

  const [PostUpdate, { isLoading: postUpadteLoading }] =
    useUpdatePostMutation();
  const { ErrorToast, SuccessToast } = useAppToasts();

  const { data: postData, isLoading } = useGetPostByIdQuery({
    postEventId,
  });

  useEffect(() => {
    if (postData?.status === "success" && !isLoading && postData.result) {
      reset({
        title: postData.result.title,
        subtitle: postData.result.subtitle,
        hashtags: postData.result.hashtags,
        description: postData.result.description,
        additional: postData.result.additional,
        mediaUrl: postData.result.mediaUrl,
      });
    }
  }, [postData, isLoading, reset]);

  const watchAllFields = watch();

  if (isLoading) return <DataLoader />;

  const postPreview: Post = {
    ...intialPost,
    ...watchAllFields,
  };

  const onSubmit = async (data: PostEditType) => {
    const payload = {
      ...data,
      postEventId,
    };
    try {
      const resp = await PostUpdate(payload).unwrap();
      if (resp.status === "success") {
        SuccessToast({
          title: resp.message,
        });
      }
    } catch (error) {
      ErrorToast({
        title: "Error Updating Post",
        description: "Failed to update your post. Please try again later",
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-[800px] w-full rounded-lg border bg-white shadow-xl dark:bg-gray-800"
      >
        {(role === "ADMIN" || role === "MEMBER") && (
          <>
            <ResizablePanel defaultSize={40} minSize={30}>
              <div className="h-full p-6">
                <PostEdit
                  handleSubmit={handleSubmit}
                  setValue={setValue}
                  register={register}
                  onSubmit={onSubmit}
                  postUpadteLoading={postUpadteLoading}
                />
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
          </>
        )}

        <ResizablePanel defaultSize={isCommentsOpen ? 40 : 60} minSize={40}>
          <div className="relative h-full">
            <PostView
              postEventId={postEventId}
              role={role}
              post={postPreview}
            />

            {(role === "ADMIN" || role === "CLIENT") && (
              <div className="absolute right-4 top-4 z-50 flex flex-col items-center space-y-3 bg-white">
                <CommentsSheet postEventId={postEventId} />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => console.log("Send Request Clicked")} // Replace with actual request function
                  className="rounded-full bg-yellow-300 text-primary shadow-lg"
                >
                  <Send className="h-5 w-5" />
                </Button>

                {/* Publish Post Button */}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => console.log("Publish Post Clicked")} // Replace with actual publish function
                  className="rounded-full bg-purple-500 text-white shadow-lg"
                >
                  <CheckCircle className="h-5 w-5" />
                </Button>
              </div>
            )}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default EventpostPage;

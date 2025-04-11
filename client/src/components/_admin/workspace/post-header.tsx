"use client";

import { FC, useEffect, useState } from "react";
import { ImageIcon, Maximize2, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DateTimePicker12h } from "@/components/date-time-picker";
import PostViewModal from "./post-view-modal";
import { useSchedulePostMutation } from "@/backend/post-api";
import { useAppToasts } from "@/hooks/use-app-toast";
import { PostTypeProps } from "@/types/global.types";
import { useGetUserInfoQuery } from "@/backend/auth-api";

interface PostProps {
  postData: PostTypeProps;
}

const PostHeader: FC<PostProps> = ({ postData }) => {
  const { id, scheduledAt } = postData;
  const [datetime, setDatetime] = useState<Date | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const [schedulePost] = useSchedulePostMutation();
  const { SuccessToast } = useAppToasts();

  useEffect(() => {
    if (scheduledAt) {
      const parsedDate = new Date(scheduledAt);
      if (!isNaN(parsedDate.getTime())) {
        setDatetime(parsedDate);
      }
    }
  }, [scheduledAt]);

  const handleSubmit = async () => {
    if (!datetime) return;
    try {
      const iso = datetime.toISOString();
      await schedulePost({ postId: id, scheduledAt: iso }).unwrap();
      SuccessToast({
        title: "Post Scheduled Successfully",
      });
    } catch (error) {
      console.error("Failed to schedule post:", error);
    }
  };

  return (
    <div className="flex items-center justify-between px-4 py-2">
      <div className="flex items-center gap-3">
        <div className="bg-muted flex h-9 w-9 items-center justify-center rounded-full border">
          <ImageIcon className="text-muted-foreground h-4 w-4" />
        </div>

        <div className="text-muted-foreground flex items-center gap-2 text-sm">
          <span className="font-medium text-black">
            {postData.client.user.email || "xyz@gmail.com"}
          </span>
          <span className="mx-1 text-gray-400">•</span>
          <DateTimePicker12h value={datetime} onChange={setDatetime} />
        </div>
      </div>

      <div className="flex items-center gap-2 pl-5">
        <Button
          onClick={() => setOpen(true)}
          variant="ghost"
          size="icon"
          className="h-6 w-6"
        >
          <Maximize2 className="text-muted-foreground h-4 w-4" />
        </Button>
        <Button
          onClick={handleSubmit}
          variant="ghost"
          size="icon"
          className="h-6 w-6"
        >
          <MoreHorizontal className="text-muted-foreground h-4 w-4" />
        </Button>
      </div>
      <PostViewModal postData={postData} open={open} onOpenChange={setOpen} />
    </div>
  );
};

export default PostHeader;

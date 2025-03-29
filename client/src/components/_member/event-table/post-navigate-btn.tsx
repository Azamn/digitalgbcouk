"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import useAuth from "@/hooks/use-auth";

const PostNavigateButton = ({ postEventId }: { postEventId: string }) => {
  const router = useRouter();
  const user = useAuth();

  return (
    <Button
      onClick={() => router.push(`/member/${user?.id}/events-list/${postEventId}`)}
      className="flex bg-dark mx-auto text-secondary items-center gap-2"
    >
      <Pencil className="size-4" />
      Start Editing Post
    </Button>
  );
};

export default PostNavigateButton;

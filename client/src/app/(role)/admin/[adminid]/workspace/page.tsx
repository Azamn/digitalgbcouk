"use client";
import { useGetAllPostsQuery } from "@/backend/post-api";
import CommentSection from "@/components/_admin/workspace/comments";
import Post from "@/components/_admin/workspace/post";
import StoryView from "@/components/_admin/workspace/story-view";
import DataLoader from "@/components/shared/loader/data-laoder";
import { useSearchParams } from "next/navigation";

function WorkspacePage() {
  const searchParams = useSearchParams();
  const clientId = searchParams.get("clientId") as string;
  const { data, isLoading } = useGetAllPostsQuery({ clientId });

  if (isLoading) return <DataLoader />;

  return (
    <div className="mx-auto mt-7 w-[90%] space-y-16">
      <div className="mx-auto w-[85%]">
        <StoryView />
        {data?.result.map((post) => {
          return (
            <div key={post.id} className="flex">
              <Post postData={post} />
              <CommentSection postId={post.id} />
            </div>
          );
        })}
      </div>
      <div></div>
    </div>
  );
}

export default WorkspacePage;

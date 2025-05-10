"use client";
import { useGetAllPostsQuery } from "@/backend/post-api";
import CommentSection from "@/components/_admin/workspace/comments";
import Post from "@/components/_admin/workspace/post";
import StoryView from "@/components/_admin/workspace/story-view";
import DataLoader from "@/components/shared/loader/data-laoder";
import { useAppSelector } from "@/store";
import { useSearchParams } from "next/navigation";
import PostGridView from "@/components/_admin/workspace/post-grid-view"; // Make sure this path is correct

function WorkspacePage() {
  const searchParams = useSearchParams();
  const clientId = searchParams.get("clientId") as string;
  const { data, isLoading } = useGetAllPostsQuery({ clientId });
  const postOnly = data?.result?.filter((item) => item.type === "POST") ?? [];
  const { view } = useAppSelector((state) => state.global);

  if (isLoading) return <DataLoader />;

  return (
    <div className="mx-auto mt-7 w-[90%] space-y-16">
      <div className="mx-auto w-[85%]">
        <StoryView />
        {view === "LIST" ? (
          postOnly.map((post) => (
            <div key={post.id} className="flex">
              <Post postData={post} />
              <CommentSection postId={post.id} />
            </div>
          ))
        ) : (
          <PostGridView posts={postOnly} />
        )}
      </div>
    </div>
  );
}

export default WorkspacePage;

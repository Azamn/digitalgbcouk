"use client";
import { useGetAllClientPostsQuery } from "@/backend/post-api";
import CommentSection from "@/components/_admin/workspace/comments";
import Post from "@/components/_admin/workspace/post";
import ClientStoryView from "@/components/_client/story-list";
import DataLoader from "@/components/shared/loader/data-laoder";

function PostPage() {
  const { data, isLoading } = useGetAllClientPostsQuery();
  const postOnly = data?.result?.filter((item) => item.type === "POST") ?? [];
  if (isLoading) return <DataLoader />;

  return (
    <div className="mx-auto mt-7 w-[90%] space-y-16">
      <div className="mx-auto w-[85%]">
        <ClientStoryView />
        {postOnly.map((post) => {
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

export default PostPage;

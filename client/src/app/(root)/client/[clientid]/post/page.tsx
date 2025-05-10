"use client";
import { useGetAllClientPostsQuery } from "@/backend/post-api";
import CommentSection from "@/components/_admin/workspace/comments";
import Post from "@/components/_admin/workspace/post";
import PostGridView from "@/components/_admin/workspace/post-grid-view";
import ClientStoryView from "@/components/_client/story-list";
import DataLoader from "@/components/shared/loader/data-laoder";
import { useAppSelector } from "@/store";

function PostPage() {
  const { view } = useAppSelector((state) => state.global);
  const { data, isLoading } = useGetAllClientPostsQuery();
  const postOnly = data?.result?.filter((item) => item.type === "POST") ?? [];
  if (isLoading) return <DataLoader />;

  return (
    <div className="mx-auto mt-7 w-[90%] space-y-16">
      <div className="mx-auto w-[85%]">
        <ClientStoryView />
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

export default PostPage;

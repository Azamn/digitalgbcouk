import EventpostPage from "@/components/common/post";
import React, { use } from "react";
interface PostPageProsp {
  params: Promise<{
    posteventid: string;
  }>;
}
const PostPage = ({ params }: PostPageProsp) => {
  const {posteventid} = use(params);
  return <EventpostPage role="ADMIN" postEventId={posteventid} />;
};

export default PostPage;

import EventpostPage from "@/components/common/post";
import React, { use } from "react";
interface PostPageProsp {
  params: Promise<{
    membereventid: string;
  }>;
}
const PostPage = ({ params }: PostPageProsp) => {
  const { membereventid } = use(params);
  return <EventpostPage role="MEMBER" postEventId={membereventid} />;
};

export default PostPage;

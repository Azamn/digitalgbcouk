import EventpostPage from "@/components/common/post";
import React, { use } from "react";
interface PostPageProsp {
  params: Promise<{
    clienteventid: string;
  }>;
}
const PostPage = ({ params }: PostPageProsp) => {
  const {clienteventid} = use(params);
  return <EventpostPage role="CLIENT" postEventId={clienteventid} />;
};

export default PostPage;

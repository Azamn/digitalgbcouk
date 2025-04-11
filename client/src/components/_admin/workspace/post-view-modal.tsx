import PostViewTabs from "@/components/common/post-view/post-view-tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PostTypeProps } from "@/types/global.types";

interface FullScreenModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  postData: PostTypeProps;
}

const PostViewModal: React.FC<FullScreenModalProps> = ({
  open,
  onOpenChange,
  postData,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex !h-screen !w-[90%] !max-w-full flex-col rounded-none !p-0 overflow-hidden">
        {/* Hidden title for accessibility */}
        <DialogHeader className="sr-only">
          <DialogTitle>Post Details</DialogTitle>
        </DialogHeader>

        {/* Scrollable content area */}
        <div className="h-full w-full overflow-y-auto p-6">
          <PostViewTabs postData={postData} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostViewModal;

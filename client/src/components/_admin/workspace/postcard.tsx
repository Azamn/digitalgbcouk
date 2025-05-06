import { Button } from "@/components/ui/button";
import { Pencil, ImageIcon, Save, X } from "lucide-react";
import Image from "next/image";
import React, { FC, useState, useRef, useEffect } from "react";
import PostHeader from "./post-header";
import { PostTypeProps } from "@/types/global.types";
import { Textarea } from "@/components/ui/textarea";
import { useUpdatePostMutation } from "@/backend/post-api";
import { useAppToasts } from "@/hooks/use-app-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PostProps {
  postData: PostTypeProps;
}

const PostCard: FC<PostProps> = ({ postData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState("");
  const [showImageModal, setShowImageModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [UpdatePost, { isLoading: isUpdating }] = useUpdatePostMutation();
  const { SuccessToast, ErrorToast } = useAppToasts();

  useEffect(() => {
    if (postData.content) {
      setContent(postData.content.trim());
    }
  }, [postData.content]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const formData = new FormData();
      formData.append("content", content);
      if (imageFile) formData.append("image", imageFile);

      const response = await UpdatePost({
        postId: postData.id,
        formData,
      }).unwrap();

      if (response.status === "success") {
        SuccessToast({ title: "Post updated successfully" });
        setIsEditing(false);
        setImagePreview(null);
        setImageFile(null);
      }
    } catch (error) {
      ErrorToast({ title: "Failed to update post" });
      console.error("Failed to update post:", error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setImagePreview(reader.result);
      }
    };
    setImageFile(file);
    reader.readAsDataURL(file);
    setShowImageModal(false);
  };

  const handleOpenImageModal = () => {
    setShowImageModal(true);
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setImageFile(null);
    setShowImageModal(false);
  };

  return (
    <div key={`post-${postData.id}`} className="flex flex-col pb-5">
      <PostHeader postData={postData} />
      <div className="mx-auto max-w-lg overflow-hidden rounded border bg-white shadow-sm">
        <div className="group relative aspect-square w-full">
          <Image
            src={imagePreview || postData.mediaUrl || "https://digitalgb.in/image.png"}
            alt="PostCard Image"
            fill
            className="object-cover"
          />

          {/* Hover Controls */}
          <div className="absolute inset-0 flex items-start justify-between bg-black/10 p-4 opacity-0 transition-opacity group-hover:opacity-100">
            <div className="flex gap-2">
              <Button
                size="icon"
                variant="secondary"
                className="bg-primary/80 text-white"
                onClick={handleEditClick}
              >
                <Pencil className="h-4 w-4 text-white" />
              </Button>
              <Button
                size="icon"
                variant="secondary"
                className="bg-primary/80 text-white"
                onClick={handleOpenImageModal}
              >
                <ImageIcon className="h-4 w-4 text-white" />
              </Button>
            </div>
            <Button
              size="icon"
              variant="secondary"
              className="bg-primary/80 text-white"
            >
              <X className="h-4 w-4 text-white" />
            </Button>
          </div>
        </div>

        <div className="w-[512px] space-y-2 p-4 text-sm">
          {isEditing ? (
            <div className="space-y-4">
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Edit your post content"
                className="h-[300px] border-none outline-none rounded-none shadow-none  w-full resize-none text-sm"
              />
              <div className="flex justify-end gap-2 pt-2">
                <Button
                  size="sm"
                  onClick={() => setIsEditing(false)}
                  variant="secondary"
                  disabled={isUpdating}
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  className="text-white"
                  onClick={handleSaveClick}
                  disabled={isUpdating}
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save
                </Button>
              </div>
            </div>
          ) : (
            postData.content.split("\n").map((line, index) => (
              <p key={index} className="text-sm">
                {line}
              </p>
            ))
          )}
        </div>
      </div>

      {/* Image Modal */}
      <Dialog open={showImageModal} onOpenChange={setShowImageModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Post Image</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {imagePreview && (
              <div className="relative h-64 w-full">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  fill
                  className="object-contain"
                />
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
            <div className="flex gap-2">
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="w-full"
              >
                Upload New Image
              </Button>
              {imagePreview && (
                <Button
                  variant="destructive"
                  onClick={handleRemoveImage}
                  className="w-full"
                >
                  Remove Image
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PostCard;

"use client";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  CalendarIcon,
  Check,
  ImageIcon,
  MapPinIcon,
  Sparkle,
} from "lucide-react";
import { EmojiPopover } from "../emojipicker";
import {
  useCreatePostMutation,
  useGetAiHelpMutation,
} from "@/backend/post-api";
import Spinner from "@/components/ui/spinner";
import { useRouter, useSearchParams } from "next/navigation";
import { useParams } from "next/navigation";
import { useAppToasts } from "@/hooks/use-app-toast";

const PostCompose = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [GetAiHelp, { isLoading: aihelpLoadingState }] = useGetAiHelpMutation();
  const [CreatePost, { isLoading: createPostLoading }] =
    useCreatePostMutation();
  const { SuccessToast } = useAppToasts();

  const searchParams = useSearchParams();
  const clientId = searchParams.get("clientId") as string;

  const handleGetContentWithAi = async () => {
    if (!text && !imageFile) return;

    const formData = new FormData();
    formData.append("text", text);
    if (imageFile) formData.append("image", imageFile);

    try {
      const response = await GetAiHelp(formData).unwrap();
      if (response.message) {
        setText(response.message);
      }
      SuccessToast({
        title: "Ai content generated",
      });
    } catch (error) {
      console.error("AI content generation failed:", error);
    }
  };

  const handleImageUploadClick = () => {
    fileInputRef.current?.click();
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
  };

  const handleEmojiSelect = (emoji: string) => {
    setText((prev) => prev + emoji);
  };

  const handleSaveAsDraft = async () => {
    if (!text && !imageFile) return;

    const formData = new FormData();
    formData.append("content", text);
    if (imageFile) formData.append("image", imageFile);

    try {
      const response = await CreatePost({
        formData,
        clientId,
      }).unwrap();
      SuccessToast({
        title: "Post saved succesfully",
      });
    } catch (error) {
      console.error("Failed to save draft:", error);
    }
  };

  return (
    <div className="p-4">
      {imagePreview && (
        <div className="relative mb-4 h-[300px] w-full overflow-hidden rounded-lg border">
          <div className="h-full w-full overflow-auto">
            <img
              src={imagePreview}
              alt="Upload preview"
              className="max-h-[600px] w-full object-contain"
            />
          </div>
          <button
            className="absolute right-2 top-2 z-10 rounded-full bg-black/60 p-1 text-white hover:bg-black"
            onClick={() => setImagePreview(null)}
            aria-label="Remove image"
          >
            ✕
          </button>
        </div>
      )}

      <Textarea
        placeholder="Write something... or type :balloon: to insert a 🎈"
        className="min-h-[100px] resize-none border-none shadow-none focus-visible:ring-0"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="my-1">
        <button
          className="flex items-center gap-x-2 rounded-full border border-pink-400 px-3 py-1 text-[12px]"
          onClick={handleGetContentWithAi}
          disabled={aihelpLoadingState}
        >
          {aihelpLoadingState ? (
            <Spinner />
          ) : (
            <>
              <Sparkle className="text-pink-400" /> Generate With AI
            </>
          )}
        </button>
      </div>

      <div className="mt-4 flex items-center justify-between border-t pt-4">
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleImageUploadClick}
            aria-label="Upload image"
          >
            <ImageIcon className="h-5 w-5" />
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />

          <EmojiPopover onEmojiSelect={handleEmojiSelect} />

          <Button variant="ghost" size="icon">
            <MapPinIcon className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <CalendarIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="mt-2 flex w-full justify-end px-2">
        <Button
          size="sm"
          className="bg-blue-400 text-white hover:bg-blue-500"
          onClick={handleSaveAsDraft}
          disabled={createPostLoading}
        >
          {createPostLoading ? (
            <Spinner />
          ) : (
            <>
              Save as Draft <Check className="ml-1" size={16} />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default PostCompose;

"use client";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  CalendarIcon,
  Check,
  ChevronDown,
  Clock1,
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
import { DateTimePicker12h } from "@/components/date-time-picker";
import { SheetClose, SheetFooter } from "@/components/ui/sheet";

const PostCompose = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [text, setText] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [showAiSuggestions, setShowAiSuggestions] = useState(false);
  const [aiContent, setAiContent] = useState("");
  const [aiHashtags, setAiHashtags] = useState("");
  const [GetAiHelp, { isLoading: aihelpLoadingState }] = useGetAiHelpMutation();
  const [CreatePost, { isLoading: createPostLoading }] =
    useCreatePostMutation();
  const { SuccessToast } = useAppToasts();
  const searchParams = useSearchParams();
  const clientId = searchParams.get("clientId") as string;
  const [datetime, setDatetime] = useState<Date | undefined>(undefined);

  const handleGetContentWithAi = async () => {
    if (!text && !imageFile) return;
    const formData = new FormData();
    formData.append("text", text);
    if (imageFile) formData.append("image", imageFile);

    try {
      const response = await GetAiHelp(formData).unwrap();
      if (response.result) {
        const content = response.result.content;
        const hashtags = response.result.hastags;
        setAiContent(content as string);
        setAiHashtags(hashtags);
        setShowAiSuggestions(true);
      }
      SuccessToast({
        title: "AI content generated",
      });
    } catch (error) {
      console.error("AI content generation failed:", error);
    }
  };

  const handleAcceptContent = () => {
    setText(aiContent);
    setShowAiSuggestions(false);
  };

  const handleAcceptHashtags = () => {
    setHashtags(aiHashtags);
    setShowAiSuggestions(false);
  };

  const handleAcceptAll = () => {
    setText(aiContent);
    setHashtags(aiHashtags);
    setShowAiSuggestions(false);
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
    // Combine content and hashtags
    const fullContent = `${text}\n\n${hashtags}`;
    formData.append("content", fullContent);
    formData.append("postType", "POST");
    if (datetime) formData.append("scheduledAt", datetime.toISOString());
    if (imageFile) formData.append("image", imageFile);
    try {
      const response = await CreatePost({
        formData,
        clientId,
      }).unwrap();
      if (response.status === "success") {
        SuccessToast({
          title: "Post created Successfully",
        });
      }
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
            className="absolute right-2 top-2 z-10 h-10 w-10 rounded-full bg-black/60 p-1 text-white hover:bg-black"
            onClick={() => setImagePreview(null)}
            aria-label="Remove image"
          >
            ✕
          </button>
        </div>
      )}

      <Textarea
        placeholder="Write something.."
        className="min-h-[100px] resize-none border-none shadow-none focus-visible:ring-0"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <Textarea
        className="mt-2 min-h-[50px] resize-none border-none shadow-none focus-visible:ring-0"
        value={hashtags}
        onChange={(e) => setHashtags(e.target.value)}
      />

      {showAiSuggestions && (
        <div className="my-4 rounded-lg border border-gray-200 p-4">
          <h3 className="mb-2 font-medium">AI Suggestions</h3>
          <div className="mb-3 rounded bg-gray-50 p-3">
            <p className="whitespace-pre-line">{aiContent}</p>
          </div>
          <div className="rounded bg-gray-50 p-3">
            <p className="text-sm text-gray-600">{aiHashtags}</p>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <Button
              className="bg-primary text-secondary"
              variant="outline"
              size="sm"
              onClick={handleAcceptContent}
            >
              Accept Content
            </Button>
            <Button
              className="bg-primary text-secondary"
              variant="outline"
              size="sm"
              onClick={handleAcceptHashtags}
            >
              Accept Hashtags
            </Button>
            <Button
              className="bg-primary text-secondary"
              size="sm"
              onClick={handleAcceptAll}
            >
              Accept All
            </Button>
            <Button
              className="bg-primary text-secondary"
              variant="ghost"
              size="sm"
              onClick={() => setShowAiSuggestions(false)}
            >
              Discard
            </Button>
          </div>
        </div>
      )}

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

          <div className="flex items-center gap-x-2">
            <CalendarIcon className="h-4 w-4" />
            <DateTimePicker12h onChange={setDatetime} className="text-sm" />
          </div>
        </div>
      </div>

      <SheetFooter className="flex justify-end gap-4 pt-6">
        <SheetClose asChild>
          <Button
            size="sm"
            className="w-[140px] rounded-md border-2 border-primary bg-transparent px-4 text-primary"
          >
            Cancel
          </Button>
        </SheetClose>
        <Button
          size="sm"
          type="submit"
          className="w-[140px] rounded-md bg-primary px-4 text-white"
          onClick={handleSaveAsDraft}
        >
          {createPostLoading ? (
            <Spinner color="#FFF6E9" size={12} />
          ) : (
            "Save as Draft"
          )}
        </Button>
      </SheetFooter>
    </div>
  );
};

export default PostCompose;

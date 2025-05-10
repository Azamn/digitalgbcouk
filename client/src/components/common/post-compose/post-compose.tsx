"use client";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  CalendarIcon,
  Check,
  CheckCircle,
  ChevronDown,
  Clock1,
  ImageIcon,
  MapPinIcon,
  Save,
  Sparkle,
  X,
  XCircle,
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
  const [showAiSuggestions, setShowAiSuggestions] = useState({
    isCaption: false,
    isHastags: false,
  });
  const [aiContent, setAiContent] = useState("");
  const [aiHashtags, setAiHashtags] = useState("");
  const [GetAiHelp, { isLoading: aihelpLoadingState }] = useGetAiHelpMutation();
  const [CreatePost, { isLoading: createPostLoading }] =
    useCreatePostMutation();
  const { SuccessToast } = useAppToasts();
  const searchParams = useSearchParams();
  const clientId = searchParams.get("clientId") as string;
  const [datetime, setDatetime] = useState<Date | undefined>(undefined);

  const captionRef = useRef<HTMLTextAreaElement>(null);
  const hastagRef = useRef<HTMLTextAreaElement>(null);

  const handleGetContentWithAi = async () => {
    if (!text && !imageFile) return;
    const formData = new FormData();
    formData.append("text", text);
    if (imageFile) formData.append("image", imageFile);

    try {
      const response = await GetAiHelp(formData).unwrap();
      console.log("🚀 ~ handleGetContentWithAi ~ response:", response);
      if (response.result.content) {
        const content = response.result.content;
        const hashtags = response.result.hastags;
        setAiContent(content);
        setAiHashtags(hashtags);
        setShowAiSuggestions(() => ({
          isCaption: true,
          isHastags: true,
        }));
      }
      SuccessToast({
        title: "AI content generated",
      });
    } catch (error) {
      console.error("AI content generation failed:", error);
    }
  };

  const adjustTextareaHeight = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const handleAcceptContent = () => {
    setText(aiContent);
    setShowAiSuggestions((prev) => ({
      ...prev,
      isCaption: false,
    }));
    setTimeout(() => {
      if (captionRef.current) {
        adjustTextareaHeight(captionRef.current);
      }
    }, 0);
  };

  const handleAcceptHashtags = () => {
    setHashtags(aiHashtags);
    setShowAiSuggestions((prev) => ({
      ...prev,
      isHastags: false,
    }));
    setTimeout(() => {
      if (hastagRef.current) {
        adjustTextareaHeight(hastagRef.current);
      }
    }, 0);
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
        <div className="relative mb-4 w-full overflow-hidden rounded-lg border">
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
        ref={captionRef}
        placeholder="Write something.."
        className="min-h-[20px] w-full resize-none border-none text-sm shadow-none focus-visible:ring-0"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          adjustTextareaHeight(e.target);
        }}
        style={{ overflow: "hidden" }}
      />
      <Textarea
        ref={hastagRef}
        className="mt-2 min-h-[20px] w-full resize-none border-none shadow-none focus-visible:ring-0"
        value={hashtags}
        onChange={(e) => {
          setHashtags(e.target.value);
          adjustTextareaHeight(e.target);
        }}
      />

      {(showAiSuggestions.isCaption || showAiSuggestions.isHastags) && (
        <div className="my-4 space-y-3 rounded-lg">
          {showAiSuggestions.isCaption && (
            <div className="space-y-2 rounded border-2 border-purple-500 bg-gray-50 pb-2">
              <div className="rounded bg-gray-50 p-3">
                <p className="whitespace-pre-line text-sm">
                  <span>Ai-Content</span> <br /> {aiContent}
                </p>
              </div>
              <div className="space-x-2 px-2">
                <Button
                  className="rounded-full border-2 border-pink-400 text-primary"
                  variant="outline"
                  size="sm"
                  onClick={handleAcceptContent}
                >
                  <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
                  Accept Caption
                </Button>
                <Button
                  className="rounded-full border-2 border-pink-400 text-primary"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setAiContent("");
                    setShowAiSuggestions((prev) => ({
                      ...prev,
                      isCaption: false,
                    }));
                  }}
                >
                  <XCircle className="mr-1 h-4 w-4 text-red-500" />
                  Reject Caption
                </Button>
              </div>
            </div>
          )}

          {/* ==== AI Hashtags Section ==== */}
          {showAiSuggestions.isHastags && aiHashtags && (
            <div className="space-y-2 rounded border-2 border-purple-500 bg-gray-50 pb-2">
              <div className="rounded bg-gray-50 p-3">
                <p className="whitespace-pre-line text-sm">
                  <span>Ai-Hashtags</span> : {aiHashtags}
                </p>
              </div>
              <div className="space-x-2 px-2">
                <Button
                  className="rounded-full border-2 border-pink-400 text-primary"
                  variant="outline"
                  size="sm"
                  onClick={handleAcceptHashtags}
                >
                  <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
                  Accept Hashtags
                </Button>
                <Button
                  className="rounded-full border-2 border-pink-400 text-primary"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setAiHashtags("");
                    setShowAiSuggestions((prev) => ({
                      ...prev,
                      isHastags: false,
                    }));
                  }}
                >
                  <XCircle className="mr-1 h-4 w-4 text-red-500" />
                  Reject Hashtags
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="my-1">
        <button
          className="flex items-center gap-x-2 rounded-full border-2 border-pink-400 px-3 py-1 text-[12px]"
          onClick={handleGetContentWithAi}
          disabled={aihelpLoadingState}
        >
          {aihelpLoadingState ? (
            <Spinner />
          ) : (
            <>
              <Sparkle size={17} className="text-pink-400" /> Generate With AI
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
            className="w-[140px] rounded-md border-2 border-primary bg-red-400 px-4 text-primary"
          >
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
        </SheetClose>
        <Button
          size="sm"
          type="submit"
          className="w-[140px] rounded-md bg-primary px-4 text-white"
          onClick={handleSaveAsDraft}
          disabled={createPostLoading}
        >
          {createPostLoading ? (
            <div className="flex items-center">
              <Spinner color="#FFF6E9" size={12} />
              Saving...
            </div>
          ) : (
            <div className="flex items-center">
              <Save className="mr-2 h-4 w-4" />
              Save as Draft
            </div>
          )}
        </Button>
      </SheetFooter>
    </div>
  );
};

export default PostCompose;

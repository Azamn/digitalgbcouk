"use client";
import React, { useState, useRef } from "react";
import {
  ImagePlus,
  Send,
  Clock,
  Eye,
  ChevronDown,
  X,
  Type,
  Clock1,
} from "lucide-react";
import ColorPickerBoxes from "./hexcolor";
import { Button } from "@/components/ui/button";
import { DateTimePicker12h } from "@/components/date-time-picker";

const StoryComposer = () => {
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<"image" | "video" | "text" | null>(
    null,
  );
  const [text, setText] = useState("");
  const [isWriting, setIsWriting] = useState(false);
  const [topColor, setTopColor] = useState("#ffffff");
  const [bottomColor, setBottomColor] = useState("#f0f0f0");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [datetime, setDatetime] = useState<Date | undefined>(undefined);
  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setSelectedMedia(result);

      if (file.type.startsWith("image/")) {
        setMediaType("image");
      } else if (file.type.startsWith("video/")) {
        setMediaType("video");
      }
    };
    reader.readAsDataURL(file);
  };

  const startTextStory = () => {
    setMediaType("text");
    setIsWriting(true);
    setSelectedMedia(null);
  };

  const removeMedia = () => {
    setSelectedMedia(null);
    setMediaType(null);
    setText("");
    setIsWriting(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="flex flex-col items-center justify-center bg-white">
      <div className="flex w-full gap-8 border-b p-3">
        {/* Preview / Media Box */}
        <div
          className="relative mx-auto h-[600px] w-[350px] flex-shrink-0 overflow-hidden rounded-2xl border shadow-xl"
          style={{
            background:
              selectedMedia || mediaType === "text"
                ? "transparent"
                : `linear-gradient(to bottom, ${topColor}, ${bottomColor})`,
          }}
        >
          {selectedMedia ? (
            <div className="relative h-full w-full">
              {mediaType === "image" && (
                <img
                  src={selectedMedia}
                  alt="Uploaded"
                  className="h-full w-full object-cover"
                />
              )}
              {mediaType === "video" && (
                <video
                  src={selectedMedia}
                  className="h-full w-full object-cover"
                  controls
                />
              )}
              <div className="absolute inset-0 bg-black/20" />
              {(isWriting || mediaType === "text") && (
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Write something..."
                  className="absolute inset-0 h-full w-full resize-none bg-transparent p-4 text-center text-3xl font-bold text-white placeholder-gray-300 focus:outline-none"
                  style={{
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    lineHeight: "1.4",
                  }}
                  autoFocus
                />
              )}
              {/* Top Right Buttons */}
              <div className="absolute right-4 top-4 flex flex-col gap-2">
                <button
                  onClick={removeMedia}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white hover:bg-black"
                >
                  <X size={20} />
                </button>
                {mediaType !== "text" && (
                  <button
                    onClick={() => setIsWriting(!isWriting)}
                    className={`h-10 w-10 rounded-full ${isWriting ? "bg-black" : "bg-black/50 hover:bg-black"} flex items-center justify-center text-white`}
                  >
                    <Type size={20} />
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center">
              <div
                className="flex h-full w-full cursor-pointer flex-col items-center justify-center"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-200">
                  <ImagePlus className="h-8 w-8 text-gray-500" />
                </div>
                <p className="text-lg font-semibold text-gray-700">Add Media</p>
                <p className="text-sm text-gray-500">
                  <span className="underline">images</span>,{" "}
                  <span className="underline">videos</span>
                </p>
              </div>
            </div>
          )}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleMediaUpload}
            accept="image/*,video/*"
            className="hidden"
          />
        </div>

        {/* Color Picker - Only show when no media is selected and not in text mode */}
        {!selectedMedia && mediaType !== "text" && (
          <div className="flex flex-col gap-4">
            <ColorPickerBoxes
              topColor={topColor}
              setTopColor={setTopColor}
              bottomColor={bottomColor}
              setBottomColor={setBottomColor}
            />
          </div>
        )}
      </div>
      <div className="mt-3 flex w-full justify-between p-2 px-4">
        <div className="flex items-center justify-between text-sm opacity-90 gap-x-1">
          <Clock1 />
          <DateTimePicker12h
            label="Schedule At"
            onChange={setDatetime}
            className="text-sm"
          />
          <ChevronDown />
        </div>
        <Button size={"sm"} className="bg-blue-400">
          Save as draft
        </Button>
      </div>
    </div>
  );
};

export default StoryComposer;

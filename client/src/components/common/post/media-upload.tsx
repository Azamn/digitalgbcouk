"use client";

import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link2Icon, ImageIcon } from "lucide-react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { PostEditType } from "@/schema";
import { useAppToasts } from "@/hooks/use-app-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { useGetMedialUrlMutation } from "@/backend/post-api";
import Spinner from "@/components/ui/spinner";

interface MediaUploadInterface {
  register: UseFormRegister<PostEditType>;
  setValue: UseFormSetValue<PostEditType>;
}

const DEFAULT_IMAGE_URL =
  "http://res.cloudinary.com/dr2kgffke/image/upload/v1743062790/ezzruldwdxelodvti45k.webp"; // Set a valid default image path

const MediaUpload: FC<MediaUploadInterface> = ({ register, setValue }) => {
  const [UploadMediaUrl, { isLoading }] = useGetMedialUrlMutation();
  const { ErrorToast, SuccessToast, WarningToast } = useAppToasts();

  const [aiHelp, setAiHelp] = useState(false);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      WarningToast({ title: "No file selected" });
      return;
    }

    const fileSizeInKB = file.size / 1024;
    if (fileSizeInKB < 100) {
      WarningToast({
        title: "Image Size Warning",
        description: "Please upload an image larger than 100KB.",
      });
      setValue("mediaUrl", DEFAULT_IMAGE_URL);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("media", file);
      formData.append("aiHelp", aiHelp ? "true" : "false");

      const response = await UploadMediaUrl(formData).unwrap();

      if (response.status === "success") {
        const uploadedUrl = response.result.imageUrl;
        setValue("mediaUrl", uploadedUrl);

        // Only apply AI-generated suggestions if aiHelp was explicitly checked
        if (aiHelp && response.result?.ai) {
          const aiData = response.result.ai;
          const fields: (keyof typeof aiData)[] = [
            "additional",
            "description",
            "hashtags",
            "subtitle",
            "title",
          ];
          fields.forEach((field) => {
            if (aiData[field] !== undefined) {
              setValue(field as keyof PostEditType, aiData[field]);
            }
          });
        }

        SuccessToast({
          title: "Upload Successful!",
          description: aiHelp
            ? "AI will help with this media!"
            : "Your image has been uploaded.",
        });
      } else {
        ErrorToast({
          title: "Failed to upload the image.",
          description: "Please try again or select a different image.",
        })
      }
    } catch (err) {
      setValue("mediaUrl", DEFAULT_IMAGE_URL);
      ErrorToast({
        title: "Failed to upload the image.",
        description: "Please try again or select a different image.",
      });
    }
  };

  return (
    <div className="space-y-4">
      <Label htmlFor="mediaUrl" className="font-medium text-primary">
        Media URL
      </Label>

      <div className="relative">
        <Link2Icon className="absolute left-3 top-3 h-5 w-5 text-main" />
        <Input
          id="mediaUrl"
          placeholder="https://example.com/image.jpg"
          {...register("mediaUrl")}
          className="rounded-xl border-2 border-purple-300 bg-secondary pl-10 text-gray-800 shadow-sm focus:border-pink-400 focus:ring-pink-400"
          onChange={(e) => setValue("mediaUrl", e.target.value)}
        />
      </div>

      {/* Upload button and image preview */}
      <div className="flex items-center justify-between gap-3">
        <Input
          type="file"
          accept="image/*"
          className="hidden"
          id="fileInput"
          onChange={handleImageUpload}
        />

        <Button
          type="button"
          className="flex items-center gap-2 rounded-full bg-primary px-4 py-2 font-semibold text-secondary transition-all"
          onClick={() => document.getElementById("fileInput")?.click()}
        >
          <ImageIcon className="h-4 w-4" />
          {isLoading ? <Spinner /> : "Upload Image"}
        </Button>

        {/* AI Help Checkbox */}
        <div className="flex items-center gap-x-2 rounded-full bg-primary/20 p-2 px-3">
          <Checkbox
            className="size-5 rounded"
            id="aiHelp"
            checked={aiHelp}
            onCheckedChange={(checked) => {
              setAiHelp(Boolean(checked));
            }}
          />
          <label
            htmlFor="aiHelp"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Do you want AI help?
          </label>
        </div>
      </div>
    </div>
  );
};

export default MediaUpload;

import { ResizablePanel } from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Loader2 } from "lucide-react";
import {
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { PostEditType } from "@/schema";
import FormField from "@/components/ui/form-field";
import MediaUpload from "./media-upload";
import { cn } from "@/lib/utils";
import Spinner from "@/components/ui/spinner";
import CommentsSheet from "@/components/common/comment-sheet";

interface PostEditInterface {
  register: UseFormRegister<PostEditType>;
  setValue: UseFormSetValue<PostEditType>;
  handleSubmit: UseFormHandleSubmit<PostEditType>;
  onSubmit: (data: PostEditType) => void;
  postUpadteLoading: boolean;
}

export function PostEdit({
  register,
  setValue,
  handleSubmit,
  onSubmit,
  postUpadteLoading,
}: PostEditInterface) {
  return (
    <ResizablePanel defaultSize={48}>
      <div className="h-full bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
        <div className="sticky top-0 z-10 border-b bg-white/80 p-6 backdrop-blur-md dark:bg-gray-900/80">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <Edit className="h-5 w-5 text-primary" />
              </div>
              <h2 className="font-lexend text-2xl font-semibold text-gray-900 dark:text-gray-100">
                Edit Post
              </h2>
            </div>
          </div>
        </div>

        <div className="space-y-8 overflow-y-auto p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-6">
              {/* Title */}
              <FormField label="Title" className="space-y-2">
                <Input
                  id="title"
                  placeholder="Enter a compelling title"
                  {...register("title")}
                  className={cn(
                    "h-12 rounded-xl border-2 bg-white px-4 dark:bg-gray-900",
                    "transition-all focus:border-primary focus:ring-2 focus:ring-primary/20",
                    "placeholder:text-gray-400 dark:placeholder:text-gray-600",
                  )}
                />
              </FormField>

              {/* Subtitle */}
              <FormField label="Subtitle" className="space-y-2">
                <Input
                  id="subtitle"
                  {...register("subtitle")}
                  placeholder="Add a descriptive subtitle"
                  className={cn(
                    "h-12 rounded-xl border-2 bg-white px-4 dark:bg-gray-900",
                    "transition-all focus:border-primary focus:ring-2 focus:ring-primary/20",
                    "placeholder:text-gray-400 dark:placeholder:text-gray-600",
                  )}
                />
              </FormField>

              {/* Hashtags */}
              <FormField label="Hashtags" className="space-y-2">
                <Textarea
                  id="hashtags"
                  {...register("hashtags")}
                  placeholder="Add relevant hashtags (e.g., tech, news, update)"
                  className={cn(
                    "min-h-[80px] resize-none rounded-xl border-2 bg-white p-4 dark:bg-gray-900",
                    "transition-all focus:border-primary focus:ring-2 focus:ring-primary/20",
                    "placeholder:text-gray-400 dark:placeholder:text-gray-600",
                  )}
                />
              </FormField>

              {/* Description */}
              <FormField label="Description" className="space-y-2">
                <Textarea
                  id="description"
                  {...register("description")}
                  placeholder="Write an engaging description for your post"
                  className={cn(
                    "min-h-[120px] resize-none rounded-xl border-2 bg-white p-4 dark:bg-gray-900",
                    "transition-all focus:border-primary focus:ring-2 focus:ring-primary/20",
                    "placeholder:text-gray-400 dark:placeholder:text-gray-600",
                  )}
                />
              </FormField>

              {/* Additional Information */}
              <FormField label="Additional Information" className="space-y-2">
                <Textarea
                  id="additional"
                  {...register("additional")}
                  placeholder="Add any extra details or context"
                  className={cn(
                    "min-h-[150px] resize-none rounded-xl border-2 bg-white p-4 dark:bg-gray-900",
                    "transition-all focus:border-primary focus:ring-2 focus:ring-primary/20",
                    "placeholder:text-gray-400 dark:placeholder:text-gray-600",
                  )}
                />
              </FormField>

              {/* Media Upload */}
              <div className="pt-2">
                <MediaUpload setValue={setValue} register={register} />
              </div>
            </div>

            {/* Submit Button */}
            <div className="sticky bottom-0 bg-gradient-to-t from-white via-white to-transparent pb-6 pt-4 dark:from-gray-900 dark:via-gray-900">
              <Button
                type="submit"
                className={cn(
                  "h-12 w-full rounded-xl text-base font-medium",
                  "bg-primary text-white hover:bg-primary/90",
                  "transition-all duration-200 ease-in-out",
                  "disabled:opacity-70",
                )}
                disabled={postUpadteLoading}
              >
                {postUpadteLoading ? (
                  <div className="flex items-center gap-2">
                    <Spinner />
                  </div>
                ) : (
                  "Save Post"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </ResizablePanel>
  );
}

export default PostEdit;

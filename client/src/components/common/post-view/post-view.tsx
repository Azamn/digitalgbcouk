import { PostTypeProps } from "@/types/global.types";
import Image from "next/image";
import { FC } from "react";

interface PostProps {
  postData: PostTypeProps;
}

const PostView: FC<PostProps> = ({ postData }) => {
  return (
    <div className="mx-auto flex h-[600px] max-w-[400px] flex-col overflow-hidden rounded-xl border border-gray-300 bg-white shadow-sm">
      {/* Header Section */}
      <div className="flex items-center justify-between border-b border-gray-200 p-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-gray-200"></div>
          <div>
            <p className="text-sm font-medium">shivam850anand@gmail.com</p>
          </div>
        </div>
      </div>

      {/* Image Section */}
      <div className="relative mx-auto h-[400px] w-full max-w-[400px] bg-gray-50">
        <Image
          src={postData.mediaUrl || "/digital-market.png"}
          alt="Post media"
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 400px"
        />
      </div>

      {/* Scrollable Content Section */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <h3 className="mb-2 text-lg font-semibold">Welcome</h3>
        <div className="space-y-2 text-sm leading-relaxed text-gray-800">
          {postData.content?.split("\n").map((line, index) => (
            <p key={index}>
              {line.split(" ").map((word, i) =>
                word.startsWith("#") ? (
                  <span key={i} className="font-medium text-blue-600">
                    {word}{" "}
                  </span>
                ) : (
                  `${word} `
                ),
              )}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostView;

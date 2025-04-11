"use client";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  ImageIcon,
  SmileIcon,
  MapPinIcon,
  CalendarIcon,
  Component,
} from "lucide-react";
import PostCompose from "./post-compose";

function Compose() {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            size="sm"
            className="bg-blue-400 text-white hover:bg-blue-500"
          >
            <Component className="mr-2 h-4 w-4" />
            Compose
          </Button>
        </DialogTrigger>

        <DialogContent className="p-0 sm:max-w-[600px] max-h-[calc(100vh-4rem)] overflow-y-auto">

          <DialogHeader className="hidden px-4 pb-2">
            <DialogTitle className="hidden text-lg font-semibold">
              Create a post
            </DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="post" className="w-full">
            <div className="border-b">
              <TabsList className="bg-background h-12 w-full justify-start rounded-none px-4">
                <TabsTrigger
                  value="post"
                  className="data-[state=active]:border-b-cyan-400"
                >
                  Post
                </TabsTrigger>
                <TabsTrigger
                  value="story"
                  className="data-[state=active]:bg-background"
                >
                  Story
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="post" className="mt-0">
              <PostCompose />
            </TabsContent>

            <TabsContent value="story" className="mt-0">
              <div className="space-y-4 p-4">
                <div className="relative mx-auto h-[480px] w-[270px] rounded-lg border bg-gradient-to-b from-gray-200 to-slate-800 shadow-md">
                  {/* Email Header */}
                  <div className="absolute left-2 top-2 text-xs font-medium text-white">
                    {"you@example.com"}
                  </div>

                  {/* Editable text */}
                  <div
                    className="absolute inset-x-0 top-1/2 z-10 mx-auto w-fit cursor-pointer rounded bg-black/50 px-2 py-1 text-center text-lg font-bold text-red-500"
                    contentEditable
                    suppressContentEditableWarning
                  >
                    Double click to edit
                  </div>

                  {/* Reply input mock */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-white/30 px-4 py-1 text-xs text-white/80">
                    Reply to {"you@example.com"}...
                  </div>
                </div>

                {/* Tool buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <ImageIcon className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <SmileIcon className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <CalendarIcon className="h-5 w-5" />
                    </Button>
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="color"
                      defaultValue="#ffffff"
                      className="h-6 w-6 rounded-full border"
                    />
                    <input
                      type="color"
                      defaultValue="#00002a"
                      className="h-6 w-6 rounded-full border"
                    />
                  </div>
                </div>

                {/* Footer buttons */}
                <div className="flex items-center justify-between border-t pt-4">
                  <input
                    type="datetime-local"
                    className="text-muted-foreground bg-transparent text-sm outline-none"
                  />
                  <Button>Save draft</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Compose;

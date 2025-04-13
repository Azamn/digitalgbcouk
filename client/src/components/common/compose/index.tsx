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
  Pencil,
  Image,
  PlusCircle,
} from "lucide-react";
import PostCompose from "./post-compose";
import StoryCompose from "./story-compose";

function Compose() {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            size="sm"
            className="flex items-center rounded bg-[#1A73E8] px-4 py-2 font-medium text-white hover:bg-[#1669C1]"
          >
            <Pencil className="mr-2 h-4 w-4" />
            Compose
          </Button>
        </DialogTrigger>

        <DialogContent className="max-h-[calc(100vh-4rem)] overflow-y-auto p-0 sm:max-w-[600px]">
          <DialogHeader className="hidden px-4 pb-2">
            <DialogTitle className="hidden text-lg font-semibold">
              Create a post
            </DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="post" className="w-full">
            <div className="border-b">
              <TabsList className="bg-background h-12 w-full justify-start rounded-none border-b px-4">
                <TabsTrigger
                  value="post"
                  className="data-[state=inactive]:text-muted-foreground group relative flex items-center gap-2 text-sm font-medium text-blue-600 data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:h-[2px] data-[state=active]:after:w-full data-[state=active]:after:bg-blue-600"
                >
                  <Image className="h-4 w-4" />
                  Post
                </TabsTrigger>

                <TabsTrigger
                  value="story"
                  className="data-[state=inactive]:text-muted-foreground group relative flex items-center gap-2 text-sm font-medium text-blue-600 data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:h-[2px] data-[state=active]:after:w-full data-[state=active]:after:bg-blue-600"
                >
                  <PlusCircle className="h-4 w-4" />
                  Story
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="post" className="mt-0">
              <PostCompose />
            </TabsContent>
            <TabsContent value="story" className="mt-0">
              <StoryCompose />
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Compose;

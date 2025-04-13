"use client";

import { useState } from "react";
import { SmileIcon } from "lucide-react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface EmojiPopoverProps {
  onEmojiSelect: (emoji: string) => void;
}

export function EmojiPopover({ onEmojiSelect }: EmojiPopoverProps) {
  const [open, setOpen] = useState(false);

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    onEmojiSelect(emojiData.emoji);
    setOpen(false); // close popover after selecting
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <SmileIcon className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="z-50 mt-11 w-[350px] p-0">
        <EmojiPicker onEmojiClick={handleEmojiClick} />
      </PopoverContent>
    </Popover>
  );
}

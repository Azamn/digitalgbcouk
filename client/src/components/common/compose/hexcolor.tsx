"use client";

import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

interface ColorPickerBoxes {
  topColor: string;
  setTopColor: (topColor: string) => void;
  bottomColor: string;
  setBottomColor: (bottomColor: string) => void;
}

export default function ColorPickerBoxes({
  bottomColor,
  setBottomColor,
  setTopColor,
  topColor,
}: ColorPickerBoxes) {
  return (
    <div className="flex flex-col gap-4">
      {/* Top Color Picker */}
      <Popover>
        <PopoverTrigger asChild>
          <button
            className="h-[20px] w-[20px] rounded border border-dark"
            style={{ backgroundColor: topColor }}
          />
        </PopoverTrigger>
        <PopoverContent className="max-w-max bg-white">
          <HexColorPicker color={topColor} onChange={setTopColor} />
        </PopoverContent>
      </Popover>

      {/* Bottom Color Picker */}
      <Popover>
        <PopoverTrigger asChild>
          <button
            className="h-[20px] w-[20px] rounded border border-dark"
            style={{ backgroundColor: bottomColor }}
          />
        </PopoverTrigger>
        <PopoverContent className="max-w-max bg-white">
          <HexColorPicker color={bottomColor} onChange={setBottomColor} />
        </PopoverContent>
      </Popover>
    </div>
  );
}

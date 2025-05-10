"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { setView } from "@/store/states";

const SetView = () => {
  const dispatch = useDispatch();
  const currentView = useSelector((state: RootState) => state.global.view);

  const handleChange = (value: "GRID" | "LIST") => {
    dispatch(setView(value));
  };

  return (
    <Select onValueChange={handleChange} defaultValue={currentView}>
      <SelectTrigger className="border-none focus: shadow-none">
        <SelectValue placeholder="Select view mode" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="GRID">Grid View</SelectItem>
        <SelectItem value="LIST">List View</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SetView;

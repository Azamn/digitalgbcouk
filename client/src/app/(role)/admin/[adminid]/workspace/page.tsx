import Post from "@/components/_admin/workspace/post";
import {
  Calendar,
  Check,
  Clock,
  Instagram,
  MoreHorizontal,
  X,
} from "lucide-react";

function App() {
  return (
    <div className="mx-auto mt-7 space-y-16 w-[80%]">
      <Post />
      <Post />
      <Post />
    </div>
  );
}

export default App;

import { ApiResponse } from "@/backend/types/api";

export interface MetaProps {
  title: string;
  description?: string;
  keywords?: string;
  author?: string;
  robots?: string;
}

export interface PostTypeProps {
  id: string;
  content: string;
  mediaUrl: string;
  isConfirmedByClient: boolean;
  scheduledAt: string;
  client: {
    user: {
      email: string;
    };
  };
}

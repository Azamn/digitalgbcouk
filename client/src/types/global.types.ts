import { ApiResponse } from "@/server-api/types/api";

export interface MetaProps {
  title: string;
  description?: string;
  keywords?: string;
  author?: string;
  robots?: string;
}

 
export interface UserType extends ApiResponse {
  result: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  };
}

export interface NotificationPayloadType {
  message: string;
  notificationType:
    | "ADDED_TO_NEW_ORGANIZATION"
    | "ADDED_TO_NEW_EVENT"
    | "PUBLISHED_BY_ADMIN"
    | "NEW_EVENT_CREATED_BY_ADMIN"
    | "EVENT_CONFIRM_BY_CLIENT";
  createdAt?: string;
}

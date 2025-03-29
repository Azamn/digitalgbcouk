"use client";
import { Post } from "@/server-api/types/api";

export const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const getRandomColor = () => {
  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-orange-500",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export const intialPost: Post = {
  id: "1",
  title: "Golden Hour Serenity",
  subtitle:
    "Nature's masterpiece at sunset. Breathtaking views await!",
  hashtags: "sunsetphotography, naturelover, mountainlake, peacefulmoments, travelgram, exploremore, getoutside, wilderness",
  description:
    "This stunning image captures the serene beauty of a mountain lake bathed in the golden light of sunset. The tranquil water reflects the surrounding pine trees and rugged cliffs, creating a picture-perfect scene that invites you to escape into the wild.  Experience the magic of nature's canvas.",
  additional:
    "Plan your next adventure!  Find similar breathtaking locations using your favorite mapping app and share your discoveries with #GoldenHourSerenity. Let's explore together!",
  mediaUrl:
    "http://res.cloudinary.com/dr2kgffke/image/upload/v1743062938/jchp5fchtyqywwmycbif.jpg",
  isPublished: true,
  confirmByClient: true,
  postType: "POST",
  createdAt: new Date("2024-03-15"),
  updatedAt: new Date("2024-04-01"),
};

export const formatTimeAgo = (dateString?: string) => {
  if (!dateString) return "Just now";
  const date = new Date(dateString);
  const now = new Date();
  const secondsAgo = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (secondsAgo < 60) return "Just now";
  const minutesAgo = Math.floor(secondsAgo / 60);
  if (minutesAgo < 60)
    return `${minutesAgo} minute${minutesAgo !== 1 ? "s" : ""} ago`;
  const hoursAgo = Math.floor(minutesAgo / 60);
  if (hoursAgo < 24) return `${hoursAgo} hour${hoursAgo !== 1 ? "s" : ""} ago`;
  const daysAgo = Math.floor(hoursAgo / 24);
  return `${daysAgo} day${daysAgo !== 1 ? "s" : ""} ago`;
};

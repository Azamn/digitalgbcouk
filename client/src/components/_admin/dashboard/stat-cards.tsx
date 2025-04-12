"use client";

import {
  Users,
  Calendar,
  FileText,
  UserPlus,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NumberTicker } from "@/components/ui/magicui/number-ticker";
import { MagicCard } from "@/components/magicui/magic-card";

interface StatsProps {
  totalPostsCreated: number;
  totalPostsPublished: number;
  totalMembers: number;
  totalClients: number;
}

export default function StatsCards({
  totalPostsCreated,
  totalPostsPublished,
  totalMembers,
  totalClients,
}: StatsProps) {
  const stats = [
    {
      title: "Total Posts Created",
      value: totalPostsCreated,
      icon: FileText,
      gradient: "bg-gradient-to-r from-[#E9D5FF] to-[#D8B4FE]", // Light Purple → Soft Violet
    },
    {
      title: "Total Posts Published",
      value: totalPostsPublished,
      icon: Calendar,
      gradient: "bg-gradient-to-r from-[#FEE2E2] to-[#FBCFE8]", // Light Red → Soft Pink
    },
    {
      title: "Total Clients",
      value: totalClients,
      icon: Users,
      gradient: "bg-gradient-to-r from-[#FEF9C3] to-[#FDE68A]", // Light Yellow → Soft Orange
    },
    {
      title: "Total Members",
      value: totalMembers,
      icon: UserPlus,
      gradient: "bg-gradient-to-r from-[#DBEAFE] to-[#BFDBFE]", // Light Blue → Soft Cyan
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map(({ title, value, icon: Icon, gradient }) => (
        <Card
          key={title}
          className={`border-2 border-slate-200 text-primary shadow-none ${gradient}`}
        >
          <MagicCard>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">{title}</CardTitle>
              <span className="rounded-full bg-white bg-opacity-30 p-3 backdrop-blur-md">
                <Icon className="h-6 w-6 text-black" />
              </span>
            </CardHeader>
            <CardContent>
              <NumberTicker
                value={value}
                className="whitespace-pre-wrap text-4xl font-medium tracking-tighter text-black"
              />
            </CardContent>
          </MagicCard>
        </Card>
      ))}
    </div>
  );
}

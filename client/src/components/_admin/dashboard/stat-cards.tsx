"use client";

import {
  Users,
  UserPlus,
  ShieldCheck,
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
  totalMembers: number;
  totalClients: number;
  totalCoreMembers: number;
}

export default function StatsCards({
  totalMembers,
  totalClients,
  totalCoreMembers,
}: StatsProps) {
  const stats = [
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
    {
      title: "Total Core Members",
      value: totalCoreMembers,
      icon: ShieldCheck,
      gradient: "bg-gradient-to-r from-[#E0F2F1] to-[#B2DFDB]", // Light Teal → Soft Mint
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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

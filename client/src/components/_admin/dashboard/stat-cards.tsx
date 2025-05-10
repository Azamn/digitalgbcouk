"use client";

import { Users, UserPlus, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
      textColor: "text-[#1a1a2e]",
    },
    {
      title: "Total Members",
      value: totalMembers,
      icon: UserPlus,
      textColor: "text-[#16213e]",
    },
    {
      title: "Total Core Members",
      value: totalCoreMembers,
      icon: ShieldCheck,
      textColor: "text-[#0f3460]",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map(({ title, value, icon: Icon, textColor }) => (
        <Card
          key={title}
          className={`border border-gray-600 shadow-black border-dashed bg-white shadow-sm transition-all hover:shadow-md`}
        >
          <MagicCard>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className={`text-lg ${textColor}`}>{title}</CardTitle>
              <span className="rounded-full bg-gray-100 p-3">
                <Icon className={`h-6 w-6 ${textColor}`} />
              </span>
            </CardHeader>
            <CardContent>
              <NumberTicker
                value={value}
                className={`whitespace-pre-wrap text-4xl font-medium tracking-tighter ${textColor}`}
              />
            </CardContent>
          </MagicCard>
        </Card>
      ))}
    </div>
  );
}

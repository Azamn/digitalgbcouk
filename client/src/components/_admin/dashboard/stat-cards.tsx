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
    },
    {
      title: "Total Members",
      value: totalMembers,
      icon: UserPlus,
    },
    {
      title: "Total Core Members",
      value: totalCoreMembers,
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map(({ title, value, icon: Icon }) => (
        <Card
          key={title}
          className={`border-2 border-primary/25 bg-secondary/70 text-primary shadow-none `}
        >
          <MagicCard>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">{title}</CardTitle>
              <span className="rounded-full bg-slate-200 bg-opacity-30 p-3 backdrop-blur-md">
                <Icon className="h-6 w-6 text-primary" />
              </span>
            </CardHeader>
            <CardContent>
              <NumberTicker
                value={value}
                className="whitespace-pre-wrap text-4xl font-medium tracking-tighter text-primary"
              />
            </CardContent>
          </MagicCard>
        </Card>
      ))}
    </div>
  );
}

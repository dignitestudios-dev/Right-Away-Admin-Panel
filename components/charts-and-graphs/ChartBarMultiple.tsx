"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { formatDate } from "@/lib/utils";

const chartConfig = {
  users: {
    label: "Users",
    color: "var(--chart-1)",
  },
  riders: {
    label: "Riders",
    color: "var(--chart-2)",
  },
  companies: {
    label: "Companies",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

export function ChartBarMultiple({ data }: { data: any[] }) {
  const chartData = data.map((item) => ({
    date: formatDate(item.date),
    users: item.users,
    riders: item.riders,
    companies: item.companies,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>New Signups</CardTitle>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="date" />
            <ChartTooltip content={<ChartTooltipContent />} />

            <Bar dataKey="users" fill="var(--color-users)" radius={4} />
            <Bar dataKey="riders" fill="var(--color-riders)" radius={4} />
            <Bar dataKey="companies" fill="var(--color-companies)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

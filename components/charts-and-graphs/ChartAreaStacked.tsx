"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { formatDate } from "@/lib/utils";

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--chart-1)",
  },
  ordersCount: {
    label: "Orders",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function ChartAreaStacked({ data }: { data: any[] }) {
  const chartData = data.map((item) => ({
    date: formatDate(item.date),
    revenue: item.revenue,
    ordersCount: item.ordersCount,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue & Orders</CardTitle>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="date" />

            <ChartTooltip content={<ChartTooltipContent />} />

            <Area
              dataKey="revenue"
              type="monotone"
              fill="var(--color-revenue)"
              stroke="var(--color-revenue)"
              fillOpacity={0.4}
            />
            <Area
              dataKey="ordersCount"
              type="monotone"
              fill="var(--color-ordersCount)"
              stroke="var(--color-ordersCount)"
              fillOpacity={0.4}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

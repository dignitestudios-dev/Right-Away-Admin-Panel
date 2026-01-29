import { Card, CardContent } from "@/components/ui/card";
import {
  Users,
  CreditCard,
  UserCheck,
  Clock5,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { getRevenueDashboard } from "@/lib/api/adminRevenue.service";

export function StatCards() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    getRevenueDashboard().then(setStats).catch(console.error);
  }, []);
  const performanceMetrics = [
    {
      title: "Total Revenue",
      current: stats?.totalordersPrice,
      previous: "$1.8M",
      growth: 33.3,
      icon: Users,
    },
    {
      title: "Total Orders",
      current: stats?.totalordersCount,
      icon: CreditCard,
    },
  ];
  console.log(stats, "state---->");
  if (!stats) return null;
  return (
    <div className="grid gap-2 grid-cols-2 ">
      {performanceMetrics.map((metric, index) => (
        <Card key={index} className="border">
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between">
              <metric.icon className="text-muted-foreground size-6" />
              {metric?.growth && (
                <Badge
                  variant="outline"
                  className={cn(
                    metric.growth >= 0
                      ? "border-green-200 bg-green-50 text-green-700"
                      : "border-red-200 bg-red-50 text-red-700",
                  )}
                >
                  {metric.growth >= 0 ? (
                    <>
                      <TrendingUp className="me-1 size-3" />
                      {metric.growth >= 0 ? "+" : ""}
                      {metric.growth}%
                    </>
                  ) : (
                    <>
                      <TrendingDown className="me-1 size-3" />
                      {metric.growth}%
                    </>
                  )}
                </Badge>
              )}
            </div>

            <div className="space-y-2">
              <p className="text-muted-foreground text-sm font-medium">
                {metric.title}
              </p>
              <div className="text-2xl font-bold">{metric.current}</div>
              {metric?.previous && (
                <div className="text-muted-foreground flex items-center gap-2 text-sm">
                  <span>from {metric.previous}</span>
                  <ArrowUpRight className="size-3" />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

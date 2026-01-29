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

export function StatCards({ dashboard }) {
  const performanceMetrics = [
    {
      title: "Total Users",
      current: dashboard?.totalUser,
      previous: "$1.8M",
      growth: 33.3,
      icon: Users,
    },
    {
      title: "Total Riders",
      current:dashboard?.totalRider,
      icon: CreditCard,
    },
    {
      title: "Total Orders",
      current:dashboard?.totalordersCount,
      growth: 32.8,
      icon: UserCheck,
    },
    {
      title: "Pending Requests",
      current:dashboard?.totalRequestCount,
      previous: "24%",
      growth: -8.0,
      icon: Clock5,
    },
    {
      title: "Revenue",
      current:dashboard?.totalordersPrice,
      previous: "24%",
      growth: -8.0,
      icon: Clock5,
    },
    {
      title: "Total Reports",
      current:dashboard?.totalReports,
      previous: "24%",
      growth: -8.0,
      icon: Clock5,
    },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
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

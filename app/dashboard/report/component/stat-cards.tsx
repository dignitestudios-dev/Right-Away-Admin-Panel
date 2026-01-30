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
import { Skeleton } from "@/components/ui/skeleton";

export function StatCards() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRevenueDashboard()
      .then(setStats)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="grid gap-2 grid-cols-2">
        {[1, 2].map((i) => (
          <Card key={i}>
            <CardContent className="space-y-3">
              <Skeleton className="h-6 w-6" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-8 w-24" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!stats) return null;
  const performanceMetrics = [
    {
      title: "Total Revenue",
      current: stats?.totalordersPrice,
      previous: "",
      growth: "",
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

import { Card, CardContent } from "@/components/ui/card";
import {
  Users,
  CreditCard,
  UserCheck,
  Clock5,
  Building2,
  BadgeDollarSign,
  Van,
} from "lucide-react";

export function StatCards({ dashboard }) {
  const performanceMetrics = [
    {
      title: "Total Users",
      current: dashboard?.totalUser,

      icon: Users,
    },
    {
      title: "Total Riders",
      current: dashboard?.totalRider,
      icon: CreditCard,
    },
    {
      title: "Total Companies ",
      current: dashboard?.totalCompany,
      icon: Building2,
    },
    {
      title: "Total Orders",
      current: dashboard?.totalordersCount,

      icon: Van,
    },

    {
      title: "Revenue",
      current: dashboard?.totalordersPrice,
      icon: BadgeDollarSign,
    },
    {
      title: "Pending Requests",
      current: dashboard?.totalRequestCount,
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
            </div>

            <div className="space-y-2">
              <p className="text-muted-foreground text-sm font-medium">
                {metric.title}
              </p>
              <div className="text-2xl font-bold">{metric.current}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

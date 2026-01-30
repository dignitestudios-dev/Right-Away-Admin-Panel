"use client";

import React, { useEffect, useState } from "react";
import { ChartAreaStacked } from "@/components/charts-and-graphs/ChartAreaStacked";
import { ChartBarMultiple } from "@/components/charts-and-graphs/ChartBarMultiple";
import { StatCards } from "@/components/stat-cards";
import { AppDispatch, RootState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboard } from "@/lib/slices/dashboardSlice";

const Dashboard = () => {
  const [timeFrame, setTimeFrame] = useState<"daily" | "weekly" | "monthly">(
    "daily",
  );
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.dashboard,
  );
  console.log(data, "dashboard--->data");
  useEffect(() => {
    dispatch(fetchDashboard(timeFrame));
  }, [dispatch, timeFrame]);
  return (
    <div className="flex flex-col space-y-4">
      <h1 className="text-2xl font-bold py-3">Dashboard</h1>

      {/* Filter Buttons */}
      <div className="flex gap-2">
        {["daily", "weekly", "monthly"].map((frame) => (
          <button
            key={frame}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              timeFrame === frame
                ? "bg-[#1bae77] text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
            onClick={() =>
              setTimeFrame(frame as "daily" | "weekly" | "monthly")
            }
          >
            {frame.charAt(0).toUpperCase() + frame.slice(1)}
          </button>
        ))}
      </div>

      <StatCards dashboard={data?.dashboard} />

      <div className="grid grid-cols-2 gap-4">
        <ChartAreaStacked type={timeFrame} data={data?.revenueGraph || []} />
        <ChartBarMultiple type={timeFrame} data={data?.SignUpGraph || []} />
      </div>
    </div>
  );
};

export default Dashboard;

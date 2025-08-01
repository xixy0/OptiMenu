import { getMonthlyStats } from "@/api";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { Skeleton } from "../ui/skeleton";

const CurrentMonthChart = () => {
  const { data: monthlyChartStats, isPending: isLoading } = useQuery({
    queryKey: ["monthly-chart"],
    queryFn: getMonthlyStats,
    staleTime: 5000,
    refetchInterval: 30000,
  });
  // console.log(monthlyChartStats);

  // Function to format dates as 'YYYY-MM-DD'
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
  };

  const formatDate2 = (dateString) => {
    const date = new Date(dateString);
    return date.getDate().toString().slice(-2); // Get last two digits of the day
  };

  //Calculate dates for the last 30 days
  const currentDate = new Date();
  const last30Days = Array.from({ length: 30 }, (_, index) => {
    const date = new Date();
    date.setDate(currentDate.getDate() - index);
    return formatDate(date.toISOString());
  }).reverse(); // Reverse to show in ascending order

  // Fill sales data for the last 30 days
  const chartData = last30Days.map((date) => {
    const data = monthlyChartStats?.find((item) => item.day === date);
    date = formatDate2(date);
    return { date, revenue: data ? data.total_price : 0 };
  });
  console.log(chartData);

  const tickValues = Array.from({ length: 8 }, (_, index) => index * 2000);

  // const chartData = [
  //   { date: "2024-12-04", revenue: 15000 },
  //   { date: "2024-12-05", revenue: 13000 },
  //   { date: "2024-12-06", revenue: 16000 },
  //   { date: "2024-12-07", revenue: 12000 },
  //   { date: "2024-12-08", revenue: 17000 },
  //   { date: "2024-12-09", revenue: 14000 },
  //   { date: "2024-12-10", revenue: 15500 },
  //   { date: "2024-12-11", revenue: 14500 },
  //   { date: "2024-12-12", revenue: 16500 },
  //   { date: "2024-12-13", revenue: 12500 },
  //   { date: "2024-12-14", revenue: 17500 },
  //   { date: "2024-12-15", revenue: 13500 },
  //   { date: "2024-12-16", revenue: 15000 },
  //   { date: "2024-12-17", revenue: 16000 },
  //   { date: "2024-12-18", revenue: 14000 },
  //   { date: "2024-12-19", revenue: 17000 },
  //   { date: "2024-12-20", revenue: 13000 },
  //   { date: "2024-12-21", revenue: 14500 },
  //   { date: "2024-12-22", revenue: 15500 },
  //   { date: "2024-12-23", revenue: 12500 },
  //   { date: "2024-12-24", revenue: 17500 },
  //   { date: "2024-12-25", revenue: 16500 },
  //   { date: "2024-12-26", revenue: 13500 },
  //   { date: "2024-12-27", revenue: 15000 },
  //   { date: "2024-12-28", revenue: 14000 },
  //   { date: "2024-12-29", revenue: 16000 },
  //   { date: "2024-12-30", revenue: 15500 },
  //   { date: "2024-12-31", revenue: 16500 },
  //   { date: "2025-01-01", revenue: 14500 },
  //   { date: "2025-01-02", revenue: 17500 },
  // ];

  if (isLoading) {
    return (
      <div className="w-[90vw]">
        <Skeleton className="w-full h-[400px]" />
      </div>
    );
  }

  // return (
  //   <div className="flex flex-col gap-2 xl:col-span-2 -z-10">
  //     <h1 className="text-center text-2xl font-bold">This Month's Sales</h1>
  //     <div className="mt-3 h-[400px]">
  //       <ResponsiveContainer
  //         width="100%"
  //         height="100%"
  //       >
  //         <BarChart data={chartData}>
  //           <XAxis
  //             dataKey="date"
  //             tickFormatter={(value) => parseInt(value)}
  //           />
  //           <YAxis
  //             domain={[0, 16000]}
  //             ticks={tickValues}
  //           />
  //           <Bar
  //             dataKey="revenue"
  //             style={{
  //               fill: "hsl(var(--foreground))",
  //               opacity: 0.9,
  //             }}
  //           />
  //         </BarChart>
  //       </ResponsiveContainer>
  //     </div>
  //   </div>
  // );

  return (
    <div className="bg-white p-6 rounded-lg  mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Today's Sales
      </h2>
      <div className="h-80">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#4DA94B"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CurrentMonthChart;

import { getWeeklyStats } from "@/api";
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

const CurrentWeekChart = () => {
  const { data: weeklyChartStats, isLoading } = useQuery({
    queryKey: ["weekly-chart"],
    queryFn: getWeeklyStats,
    staleTime: 4000,
    refetchInterval: 5000,
  });

  console.log("from week chart", weeklyChartStats);

  const generateChartData = () => {
    const currentDate = new Date();
    const currentWeek = getISOWeek(currentDate);

    const lastWeekStart = getFirstDayOfISOWeek(
      currentDate.getFullYear(),
      currentWeek - 1
    );
    const lastWeekEnd = getLastDayOfISOWeek(
      currentDate.getFullYear(),
      currentWeek - 1
    );

    const lastWeekDates = [];
    let tempDate = new Date(lastWeekStart);

    while (tempDate <= lastWeekEnd) {
      const day = tempDate.toISOString().split("T")[0]; // Format date as YYYY-MM-DD
      lastWeekDates.push(day);
      tempDate.setDate(tempDate.getDate() + 1);
    }
    const weekdays = ["mon", "tue", "wed", "thurs", "fri", "sat", "sun"];
    const weekday = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    var i = -1;
    const chartData = weekday.map((day) => {
      i = i + 1;
      const found = weeklyChartStats.find((item) => item.day === day);
      return {
        slot: weekdays[i],
        revenue: found ? parseInt(found.total_price) : 0, // Convert total_price to integer
      };
    });
    console.log("charData", chartData);
    return chartData;
  };

  const dummyData = [
    { slot: "mon", revenue: 120 },
    { slot: "tue", revenue: 200 },
    { slot: "wed", revenue: 150 },
    { slot: "thurs", revenue: 180 },
    { slot: "fri", revenue: 300 },
    { slot: "sat", revenue: 250 },
    { slot: "sun", revenue: 220 },
  ];

  const chartData = isLoading ? [] : generateChartData();
  // const chartData = dummyData;

  // return (
  //   <div className="flex flex-col gap-2 xl:col-span-2 -z-10">
  //     <h1 className="text-center text-2xl font-bold">This Week's Sales</h1>
  //     <div className="mt-3 h-[400px]">
  //       <ResponsiveContainer
  //         width="100%"
  //         height="100%"
  //       >
  //         <BarChart data={chartData}>
  //           <XAxis
  //             dataKey="slot"
  //             tick={{ fontSize: 20 }}
  //           />
  //           <YAxis className="-z-10" />
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
    <div className="bg-white p-6 rounded-lg mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        This Week's Sales
      </h2>
      <div className="h-80">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="slot" />
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

export default CurrentWeekChart;

// Helper functions for ISO week calculations
function getISOWeek(date) {
  const tempDate = new Date(date);
  tempDate.setHours(0, 0, 0, 0);
  tempDate.setDate(tempDate.getDate() + 3 - ((tempDate.getDay() + 6) % 7));
  const week1 = new Date(tempDate.getFullYear(), 0, 4);
  return (
    1 +
    Math.round(
      ((tempDate - week1) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7
    )
  );
}

function getFirstDayOfISOWeek(year, week) {
  const janFourth = new Date(year, 0, 4);
  const startOfWeek = new Date(
    janFourth.getTime() + (week - 1) * 7 * 24 * 60 * 60 * 1000
  );
  const dayOfWeek = startOfWeek.getDay();
  return startOfWeek.setDate(
    startOfWeek.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1)
  );
}

function getLastDayOfISOWeek(year, week) {
  const firstDay = getFirstDayOfISOWeek(year, week);
  const lastDay = new Date(firstDay);
  lastDay.setDate(lastDay.getDate() + 6);
  return lastDay;
}

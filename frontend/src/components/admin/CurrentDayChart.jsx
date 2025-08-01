import { getCurrentDayStats } from "@/api";
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

const CurrentDayChart = () => {
  const { data: currentDayStats = [] } = useQuery({
    queryKey: ["current-day-chart"],
    queryFn: getCurrentDayStats,
    staleTime: 4000,
    refetchInterval: 5000,
  });
  // console.log(currentDayStats);

  // const currentDayStats = [
  //   { slot: "8", revenue: 1500 },
  //   { slot: "9", revenue: 2000 },
  //   { slot: "10", revenue: 2500 },
  //   { slot: "11", revenue: 3000 },
  //   { slot: "12", revenue: 4500 },
  //   { slot: "13", revenue: 5000 },
  //   { slot: "14", revenue: 3500 },
  //   { slot: "15", revenue: 4000 },
  //   { slot: "16", revenue: 4500 },
  //   { slot: "17", revenue: 6000 },
  //   { slot: "18", revenue: 5500 },
  //   { slot: "19", revenue: 7000 },
  //   { slot: "20", revenue: 6500 },
  //   { slot: "21", revenue: 5000 },
  //   { slot: "22", revenue: 3000 },
  // ];

  // Initialize an array with 13 elements, each representing a slot from 8 to 22
  const slotsData = Array.from({ length: 13 }, (_, index) => {
    const slot = index + 8; // Calculate the slot value
    const slotData = currentDayStats.find((item) => item.slot === `${slot}`);
    return {
      slot: `${slot}`,
      revenue: slotData ? slotData.revenue : 0, // Set revenue to zero if slot data is not found
    };
  });

  // return (
  //   <div className="flex flex-col gap-2 xl:col-span-2 -z-10 ">
  //     <h1 className="text-center text-2xl font-bold">Today's Sales</h1>
  //     <div className="mt-3 h-[400px]">
  //       <ResponsiveContainer
  //         width="100%"
  //         height="100%"
  //       >
  //         <BarChart data={slotsData}>
  //           <XAxis dataKey="slot" />
  //           <YAxis />
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
          <LineChart data={slotsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="slot" />
            <YAxis dataKey="revenue" />
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

export default CurrentDayChart;

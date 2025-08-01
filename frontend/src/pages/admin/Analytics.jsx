import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { getItemPerformance, getTimeSlotAnalysis ,getTopSellingItems ,getConversionRate } from "@/api";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  Download,
  Calendar,
  TrendingUp,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Users,
} from "lucide-react";
import { date } from "zod";

// Mock data - replace with real data
// const itemPerformance = [
//   { name: "Main Course", value: 400 },
//   { name: "Desserts", value: 100 },
//   { name: "Starters", value: 200 },
//   { name: "Sides", value: 150 },
//   { name: "Noodles", value: 300 },
// ];

//const [dateRange, setDateRange] = useState("today");

// Fetch item performance data



const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

const timeSlotAnalysis = [
  { slot: "11:00-12:00", orders: 45, revenue: 675 },
  { slot: "12:00-13:00", orders: 85, revenue: 1275 },
  { slot: "13:00-14:00", orders: 95, revenue: 1425 },
  { slot: "18:00-19:00", orders: 75, revenue: 1125 },
  { slot: "19:00-20:00", orders: 90, revenue: 1350 },
];

//console.log(parseInt(timeSlotAnalysis[0].slot)+1)


const Analytics = () => {
  const [dateRange, setDateRange] = useState("today");
 //dateRange = "today";
console.log(dateRange)
// Fetch item performance data
const { data: rawitemPerformance = [], isLoading: isLoadingItemPerformance } = useQuery({
  queryKey: ["rawitemPerformance", dateRange],
  queryFn: () => getItemPerformance(dateRange),
  staleTime: 5000,
  refetchInterval: 30000,
});
const itemPerformance = rawitemPerformance.map((item) => ({
  name: item.name,
  value: parseInt(item['value'], 10),
}));
console.log(itemPerformance)



const { data: timeSlotAnalysis = [], isLoading: isLoadingTimeSlotAnalysis } = useQuery({
  queryKey: ["timeSlotAnalysis", dateRange],
  queryFn: () => getTimeSlotAnalysis(dateRange),
  staleTime: 5000,
  refetchInterval: 30000,
});




const {data : topsellingitems=[] } = useQuery({
  queryKey: ["topsellingitems"],
  queryFn: ()=> getTopSellingItems(dateRange),
  staleTime: 5000,
  refetchInterval: 30000,
})
console.log(topsellingitems)
// const topsellingitems = rawtopsellingitems.map((item) => ({
//   name: item.name,
//   value: parseInt(item['value'], 10),
// }));
// console.log(itemPerformance)


const {data : conversionRate =[] } = useQuery({
  queryKey: ["conversionRate"],
  queryFn: ()=> getConversionRate(dateRange),
  staleTime: 5000,
  refetchInterval: 30000,
})
var rate =68;
// console.log(conversionRate[0].paid_ratio)
if(conversionRate.length !=0){
   rate = (conversionRate[0].paid_ratio *100 ).toFixed(2);
  }

  return (
    <div className="space-y-8 p-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
          <p className="text-muted-foreground">
            Detailed insights into your restaurant's performance
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select
            value={dateRange}
            onValueChange={setDateRange}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Calendar className="mr-2 h-4 w-4" />
            Custom Range
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Conversion Rate
              </p>
              <h3 className="text-2xl font-bold">{rate}%</h3>
              {/* <h3 className="text-2xl font-bold">89%</h3> */}
            </div>
            <div className="rounded-full bg-primary/10 p-3 text-primary">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <div className="flex items-center gap-1 text-emerald-500">
              <ArrowUpRight className="h-4 w-4" />
              <span>5.2%</span>
            </div>
            <span className="text-muted-foreground">vs last period</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Avg. Service Time
              </p>
              <h3 className="text-2xl font-bold">24m 30s</h3>
            </div>
            <div className="rounded-full bg-primary/10 p-3 text-primary">
              <Clock className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <div className="flex items-center gap-1 text-rose-500">
              <ArrowDownRight className="h-4 w-4" />
              <span>2.1%</span>
            </div>
            <span className="text-muted-foreground">vs last period</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Items per Order
              </p>
              <h3 className="text-2xl font-bold">3.2</h3>
            </div>
            <div className="rounded-full bg-primary/10 p-3 text-primary">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <div className="flex items-center gap-1 text-emerald-500">
              <ArrowUpRight className="h-4 w-4" />
              <span>0.8%</span>
            </div>
            <span className="text-muted-foreground">vs last period</span>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Table Turnover
              </p>
              <h3 className="text-2xl font-bold">4.5x</h3>
            </div>
            <div className="rounded-full bg-primary/10 p-3 text-primary">
              <Users className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <div className="flex items-center gap-1 text-emerald-500">
              <ArrowUpRight className="h-4 w-4" />
              <span>1.2x</span>
            </div>
            <span className="text-muted-foreground">vs last period</span>
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="mb-4 text-lg font-semibold">
            Item Category Performance
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <PieChart>
                <Pie
                  data={itemPerformance}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {itemPerformance.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="mb-4 text-lg font-semibold">Peak Hours Analysis</h3>
          <div className="h-[300px]">
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <BarChart data={timeSlotAnalysis}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="slot" />
                <YAxis
                  yAxisId="left"
                  orientation="left"
                  stroke="#8884d8"
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  stroke="#82ca9d"
                />
                <Tooltip />
                <Legend />
                <Bar
                  yAxisId="left"
                  dataKey="Orders"
                  fill="#8884d8"
                  name="Orders"
                />
                <Bar
                  yAxisId="right"
                  dataKey="Revenue"
                  fill="#82ca9d"
                  name="Revenue ($)"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Detailed Stats */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="mb-4 text-lg font-semibold">Top Selling Items</h3>
          <div className="space-y-4">
            {topsellingitems.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between"
              >
                <div>
                  <p className="font-medium">{item.itemname}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.value} orders
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-emerald-500">
                    +{Math.floor(Math.random() * 20)}%
                  </div>
                  <div
                    className="h-2 w-24 rounded-full bg-primary/10"
                    style={{
                      background: `linear-gradient(90deg, ${
                        COLORS[index % COLORS.length]
                      } ${(item.value / 400) * 100}%, transparent 0)`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="mb-4 text-lg font-semibold">Time Slot Performance</h3>
          <div className="space-y-4">
            {timeSlotAnalysis.map((slot, index) => (
              <div
                key={index}
                className="flex items-center justify-between"
              >
                <div>
                  <p className="font-medium">{slot.slot}-{parseInt(slot.slot)+1}</p>
                  <p className="text-sm text-muted-foreground">
                    {slot.Orders} orders
                  </p>
                </div>
                <div>
                  <p className="font-medium">${slot.Revenue}</p>
                  <p className="text-sm text-muted-foreground">Revenue</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;

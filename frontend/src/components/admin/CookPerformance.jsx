import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
} from "recharts";
import { Progress } from "../ui/progress";

export const cookData = [
  {
    name: "John Doe",
    avgPrepTime: 15,
    dishesPerHour: 12,
    orderDelayPercentage: 5,
    peakHourEfficiency: 95,
    completedOrders: 150,
    canceledOrders: 3,
    complaints: 2,
    morningPerformance: 90,
    afternoonPerformance: 85,
    eveningPerformance: 92,
  },
  {
    name: "Jane Smith",
    avgPrepTime: 18,
    dishesPerHour: 10,
    orderDelayPercentage: 8,
    peakHourEfficiency: 88,
    completedOrders: 130,
    canceledOrders: 5,
    complaints: 1,
    morningPerformance: 88,
    afternoonPerformance: 92,
    eveningPerformance: 86,
  },
  {
    name: "Mike Johnson",
    avgPrepTime: 16,
    dishesPerHour: 11,
    orderDelayPercentage: 6,
    peakHourEfficiency: 92,
    completedOrders: 140,
    canceledOrders: 2,
    complaints: 3,
    morningPerformance: 91,
    afternoonPerformance: 89,
    eveningPerformance: 90,
  },
];

const getCookChartData = () => {
  return cookData.map((cook) => ({
    name: cook.name,
    "Avg Prep Time": cook.avgPrepTime,
    "Dishes/Hour": cook.dishesPerHour,
    "Delay %": cook.orderDelayPercentage,
  }));
};

const getShiftData = () => {
  return cookData.map((cook) => ({
    name: cook.name,
    Morning: cook.morningPerformance,
    Afternoon: cook.afternoonPerformance,
    Evening: cook.eveningPerformance,
  }));
};

const CookPerformance = () => {
  const role = "cook";

  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cookData.map((staff, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar>
                <AvatarImage
                  src={`https://i.pravatar.cc/150?img=${index + 20}`}
                  alt={staff.name}
                />
                <AvatarFallback>
                  {staff.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{staff.name}</CardTitle>
                <CardDescription>
                  {/* {role.charAt(0).toUpperCase() + role.slice(1)} */}
                  Cook
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Avg Prep Time</p>
                  <p className="text-2xl font-bold">{staff.avgPrepTime} min</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Dishes/Hour</p>
                  <p className="text-2xl font-bold">{staff.dishesPerHour}</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium">Order Delay %</p>
                <Progress
                  value={staff.orderDelayPercentage}
                  className="mt-2"
                />
                <p className="text-sm text-right mt-1">
                  {`${staff.orderDelayPercentage}%`}
                </p>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium">Peak Hour Efficiency</p>
                <Badge
                  variant={
                    staff.peakHourEfficiency >= 95
                      ? "success"
                      : staff.peakHourEfficiency >= 90
                      ? "warning"
                      : "destructive"
                  }
                  className="mt-2"
                >
                  {staff.peakHourEfficiency}%
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 mt-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer
              width="100%"
              height={300}
            >
              <BarChart data={getCookChartData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey={Object.keys(getCookChartData(role)[0])[1]}
                  fill="#8884d8"
                />
                <Bar
                  dataKey={Object.keys(getCookChartData(role)[0])[2]}
                  fill="#82ca9d"
                />
                <Bar
                  dataKey={Object.keys(getCookChartData(role)[0])[3]}
                  fill="#ffc658"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Shift-Based Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer
              width="100%"
              height={300}
            >
              <LineChart data={getShiftData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="Morning"
                  stroke="#8884d8"
                />
                <Line
                  type="monotone"
                  dataKey="Afternoon"
                  stroke="#82ca9d"
                />
                <Line
                  type="monotone"
                  dataKey="Evening"
                  stroke="#ffc658"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Additional Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {cookData.map((cook, index) => (
              <div
                key={index}
                className="flex flex-col gap-2"
              >
                <p className="font-semibold">{cook.name}</p>
                <div className="flex justify-between">
                  <span>Completed Orders:</span>
                  <span>{cook.completedOrders}</span>
                </div>
                <div className="flex justify-between">
                  <span>Canceled Orders:</span>
                  <span>{cook.canceledOrders}</span>
                </div>
                <div className="flex justify-between">
                  <span>Customer Complaints:</span>
                  <span>{cook.complaints}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CookPerformance;

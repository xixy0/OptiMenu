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

const waiterData = [
  {
    name: "Alex Lee",
    avgDeliveryTime: 8,
    ordersPerHour: 15,
    accuracyRate: 98,
    peakHourEfficiency: 94,
    completedOrders: 120,
    canceledOrders: 2,
    complaints: 1,
    morningPerformance: 92,
    afternoonPerformance: 95,
    eveningPerformance: 93,
  },
  {
    name: "Olivia Taylor",
    avgDeliveryTime: 9,
    ordersPerHour: 14,
    accuracyRate: 97,
    peakHourEfficiency: 92,
    completedOrders: 112,
    canceledOrders: 3,
    complaints: 2,
    morningPerformance: 90,
    afternoonPerformance: 93,
    eveningPerformance: 91,
  },
  {
    name: "Chris Martinez",
    avgDeliveryTime: 8.5,
    ordersPerHour: 16,
    accuracyRate: 99,
    peakHourEfficiency: 96,
    completedOrders: 128,
    canceledOrders: 1,
    complaints: 0,
    morningPerformance: 94,
    afternoonPerformance: 96,
    eveningPerformance: 95,
  },
];

const getWaiterChartData = () => {
  return waiterData.map((waiter) => ({
    name: waiter.name,
    "Avg Delivery Time": waiter.avgDeliveryTime,
    "Orders/Hour": waiter.ordersPerHour,
    "Accuracy Rate": waiter.accuracyRate,
  }));
};

const getShiftData = () => {
  return waiterData.map((waiter) => ({
    name: waiter.name,
    Morning: waiter.morningPerformance,
    Afternoon: waiter.afternoonPerformance,
    Evening: waiter.eveningPerformance,
  }));
};

const WaiterPerformance = () => {
  const role = "waiter";

  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {waiterData.map((staff, index) => (
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
                  Waiter
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Avg Delivery Time</p>
                  <p className="text-2xl font-bold">
                    {staff.avgDeliveryTime} min
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Orders/Hour</p>
                  <p className="text-2xl font-bold">{staff.ordersPerHour}</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium">Accuracy Rate</p>
                <Progress
                  value={staff.accuracyRate}
                  className="mt-2"
                />
                <p className="text-sm text-right mt-1">
                  {`${staff.accuracyRate}%`}
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
              <BarChart data={getWaiterChartData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey={Object.keys(getWaiterChartData(role)[0])[1]}
                  fill="#8884d8"
                />
                <Bar
                  dataKey={Object.keys(getWaiterChartData(role)[0])[2]}
                  fill="#82ca9d"
                />
                <Bar
                  dataKey={Object.keys(getWaiterChartData(role)[0])[3]}
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
            {waiterData.map((waiter, index) => (
              <div
                key={index}
                className="flex flex-col gap-2"
              >
                <p className="font-semibold">{waiter.name}</p>
                <div className="flex justify-between">
                  <span>Completed Orders:</span>
                  <span>{waiter.completedOrders}</span>
                </div>
                <div className="flex justify-between">
                  <span>Canceled Orders:</span>
                  <span>{waiter.canceledOrders}</span>
                </div>
                <div className="flex justify-between">
                  <span>Customer Complaints:</span>
                  <span>{waiter.complaints}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WaiterPerformance;

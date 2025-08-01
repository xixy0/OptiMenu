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

const stewardData = [
  {
    name: "Emily Brown",
    avgVerificationTime: 5,
    ordersPerHour: 25,
    rejectionRate: 3,
    peakHourEfficiency: 97,
    completedOrders: 200,
    canceledOrders: 4,
    complaints: 1,
    morningPerformance: 94,
    afternoonPerformance: 96,
    eveningPerformance: 98,
  },
  {
    name: "David Wilson",
    avgVerificationTime: 6,
    ordersPerHour: 22,
    rejectionRate: 5,
    peakHourEfficiency: 93,
    completedOrders: 180,
    canceledOrders: 6,
    complaints: 2,
    morningPerformance: 92,
    afternoonPerformance: 94,
    eveningPerformance: 91,
  },
  {
    name: "Sarah Davis",
    avgVerificationTime: 5.5,
    ordersPerHour: 24,
    rejectionRate: 4,
    peakHourEfficiency: 95,
    completedOrders: 190,
    canceledOrders: 5,
    complaints: 0,
    morningPerformance: 93,
    afternoonPerformance: 95,
    eveningPerformance: 94,
  },
];

const getStewardChartData = () => {
  return stewardData.map((steward) => ({
    name: steward.name,
    "Avg Verification Time": steward.avgVerificationTime,
    "Orders/Hour": steward.ordersPerHour,
    "Rejection Rate": steward.rejectionRate,
  }));
};

const getShiftData = () => {
  return stewardData.map((steward) => ({
    name: steward.name,
    Morning: steward.morningPerformance,
    Afternoon: steward.afternoonPerformance,
    Evening: steward.eveningPerformance,
  }));
};

const StewardPerformance = () => {
  const role = "waiter";

  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stewardData.map((staff, index) => (
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
                  Steward
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Avg Verification Time</p>
                  <p className="text-2xl font-bold">
                    {staff.avgVerificationTime} min
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Orders/Hour</p>
                  <p className="text-2xl font-bold">{staff.ordersPerHour}</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium">Rejection Rate</p>
                <Progress
                  value={staff.rejectionRate}
                  className="mt-2"
                />
                <p className="text-sm text-right mt-1">
                  {`${staff.rejectionRate}%`}
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
              <BarChart data={getStewardChartData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey={Object.keys(getStewardChartData(role)[0])[1]}
                  fill="#8884d8"
                />
                <Bar
                  dataKey={Object.keys(getStewardChartData(role)[0])[2]}
                  fill="#82ca9d"
                />
                <Bar
                  dataKey={Object.keys(getStewardChartData(role)[0])[3]}
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
            {stewardData.map((steward, index) => (
              <div
                key={index}
                className="flex flex-col gap-2"
              >
                <p className="font-semibold">{steward.name}</p>
                <div className="flex justify-between">
                  <span>Completed Orders:</span>
                  <span>{steward.completedOrders}</span>
                </div>
                <div className="flex justify-between">
                  <span>Canceled Orders:</span>
                  <span>{steward.canceledOrders}</span>
                </div>
                <div className="flex justify-between">
                  <span>Customer Complaints:</span>
                  <span>{steward.complaints}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StewardPerformance;

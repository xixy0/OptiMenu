import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Utensils, DollarSign, Clock } from "lucide-react";

const WaiterStats = ({ orders }) => {
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <StatCard
        icon={<Utensils className="w-8 h-8 text-blue-500" />}
        title="Total Orders"
        value={totalOrders}
      />
      <StatCard
        icon={<DollarSign className="w-8 h-8 text-green-500" />}
        title="Total Revenue"
        value={`$${totalRevenue.toFixed(2)}`}
      />
      <StatCard
        icon={<Clock className="w-8 h-8 text-purple-500" />}
        title="Avg. Order Value"
        value={`$${averageOrderValue.toFixed(2)}`}
      />
    </div>
  );
};

const StatCard = ({ icon, title, value }) => (
  <Card>
    <CardContent className="flex items-center p-6">
      <div className="mr-4">{icon}</div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </CardContent>
  </Card>
);

export default WaiterStats;

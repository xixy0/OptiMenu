import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, CreditCard, TrendingUp } from "lucide-react";

const AccountantSummary = ({ orders }) => {
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const averageOrderValue =
    orders.length > 0 ? totalRevenue / orders.length : 0;
  const pendingPayments = orders.length;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <SummaryCard
        icon={<DollarSign className="h-8 w-8 text-blue-500" />}
        title="Total Revenue"
        value={`$${totalRevenue.toFixed(2)}`}
      />
      <SummaryCard
        icon={<CreditCard className="h-8 w-8 text-purple-500" />}
        title="Pending Payments"
        value={pendingPayments}
      />
      <SummaryCard
        icon={<TrendingUp className="h-8 w-8 text-green-500" />}
        title="Avg. Order Value"
        value={`$${averageOrderValue.toFixed(2)}`}
      />
    </div>
  );
};

const SummaryCard = ({ icon, title, value }) => (
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

export default AccountantSummary;

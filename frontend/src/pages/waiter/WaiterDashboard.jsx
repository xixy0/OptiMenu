import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchOrders } from "@/api";
import { useSocket } from "@/hooks/useSocket";
import { Loader2 } from "lucide-react";
import WaiterCard from "@/components/waiter/WaiterCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams } from "react-router";

const WaiterDashboard = () => {
  const { waiterId } = useParams();

  const queryClient = useQueryClient();
  const {
    data: orders = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["orders", "waiter"],
    queryFn: () => fetchOrders("waiter"),
  });

  // useSocket("cooked", () => {
  //   queryClient.invalidateQueries(["orders", "waiter"]);
  // });
  useSocket("cooked", refetch);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  //  const allItems = orders.flatMap((order) =>
  //   order.items.map((item) => ({
  //     ...item,
  //     orderId: order.id,
  //     customerName: order.customerName,
  //   }))
  // );

  const allItems = orders.flatMap((order) => {
    console.log("Running");
    return order.items.map((item) => ({
      ...item,
      orderId: order.id,
      customerName: order.customerName,
      tableName: order.tableName,
    }));
  });

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center text-primary">
              Waiter Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-gray-600">
              Items ready for delivery: {allItems.length}
            </p>
          </CardContent>
        </Card>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {allItems.map((item) => (
            <WaiterCard
              key={`${item.orderId}-${item.id}`}
              item={item}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WaiterDashboard;

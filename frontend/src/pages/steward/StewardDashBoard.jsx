import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchOrders, updateOrderStatus, cancelOrder } from "@/api";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, X } from "lucide-react";
import { useSocket } from "@/hooks/useSocket";
import { toast } from "sonner";
import { useParams } from "react-router";

const StewardDashboard = () => {
  const { stewardId } = useParams();

  const queryClient = useQueryClient();

  // Fetch pending orders
  const { data: orders, refetch } = useQuery({
    queryKey: ["orders", "steward"],
    queryFn: () => fetchOrders("steward"),
  });

  useSocket("new-order", refetch);

  // Verify order mutation
  const verifyMutation = useMutation({
    mutationFn: (data) => updateOrderStatus(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["orders", "steward"]);
      toast.success("Order verified successfully!");
    },
  });

  // Cancel order mutation
  const cancelMutation = useMutation({
    mutationFn: (data) => cancelOrder(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["orders", "steward"]);
    },
  });

  return (
    <div className="p-4 space-y-6 max-w-4xl mx-auto">
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Steward Dashboard</h1>
        <Badge
          variant="outline"
          className="text-lg py-1"
        >
          {orders?.length || 0} Pending Orders
        </Badge>
      </header>
      <ScrollArea className="h-[calc(100vh-8rem)]">
        <div className="space-y-4">
          {orders?.map((order) => (
            <Card
              key={order.id}
              className="shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-2xl font-bold">
                  Order #{order.id}
                </CardTitle>
                <Badge
                  variant="secondary"
                  className="text-lg"
                >
                  ${order.total.toFixed(2)}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500">
                    Table
                  </span>
                  <span className="font-semibold">{order.tableName}</span>
                </div>
                <Separator />
                <div>
                  <h3 className="font-semibold mb-2">Order Items:</h3>
                  <ul className="space-y-1">
                    {order.items?.map((item, index) => (
                      <li
                        key={index}
                        className="flex justify-between text-sm"
                      >
                        <span>
                          {item.name}{" "}
                          <Badge
                            variant="outline"
                            className="ml-2"
                          >
                            {item.quantity}x
                          </Badge>
                        </span>
                        <span>${item.price.toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Separator />
                {order.note && ( // Only display the note if it exists
                  <div className="bg-yellow-100 p-3 rounded">
                    <h3 className="font-semibold text-yellow-800">Note:</h3>
                    <p className="text-sm text-yellow-700">{order.note}</p>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  className="border-red-500 text-red-500 hover:bg-red-50"
                  onClick={() => cancelMutation.mutate({ orderId: order.id })}
                >
                  <X className="mr-2 h-4 w-4" /> Cancel
                </Button>
                <Button
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={() =>
                    verifyMutation.mutate({ status: "verified", id: order.id })
                  }
                >
                  <Check className="mr-2 h-4 w-4" /> Verify
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default StewardDashboard;

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrderStatus, cancelOrder } from "@/api";
import { toast } from "sonner";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, XCircle } from "lucide-react";

const PendingOrders = ({ orders }) => {
  const queryClient = useQueryClient();

  // const approveMutation = useMutation({
  //   mutationFn: updateOrderStatus,
  //   onSuccess: () => {
  //     toast.success("Order Approved!");
  //     queryClient.invalidateQueries(["orders", "cook"]);
  //   },
  //   onError: () => {
  //     toast.error("Failed to approve order. Please try again.");
  //   },
  // });

  // const cancelOrderMutation = useMutation({
  //   mutationFn: cancelOrder,
  //   onSuccess: () => {
  //     toast.success("Order canceled successfully!");
  //     queryClient.invalidateQueries(["orders", "cook"]);
  //   },
  //   onError: () => {
  //     toast.error("Failed to cancel order. Please try again.");
  //   },
  // });
  const markDishMutation = useMutation({
    mutationFn: (data) => {
      console.log("Mutation function called with:", data); // Debug line
      return updateOrderStatus(data);
    },
    onSuccess: () => {
      //console.log("Mutation succeeded!");
      toast.success("Order Approved!");
      queryClient.invalidateQueries(["orders", "cook"]);
    },
    onError: (error) => {
      console.error("Mutation failed:", error);
    },
  });

  const cancelOrderMutation = useMutation({
    mutationFn: (data) => {
      console.log("Mutation cancellation function called with:", data); // Debug line
      return cancelOrder(data);
    },
    onSuccess: () => {
      //console.log("Mutation succeeded!");
      toast.success("Order canceled successfully!");
      queryClient.invalidateQueries(["orders", "cook"]);
    },
    onError: (error) => {
      console.error("Mutation failed:", error);
    },
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 flex items-center text-orange-600">
        <Clock className="mr-2" /> Pending Orders
      </h2>
      <div className="space-y-6">
        {orders.map((order) => (
          <Card
            key={order.id}
            className="shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <CardHeader className="bg-orange-100">
              <CardTitle className="text-lg flex justify-between items-center">
                {/* <span>Order #{order.id}</span> */}
                <Badge
                  variant="secondary"
                  className="text-orange-600 bg-orange-200"
                >
                  Pending
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              {/* <p className="font-medium">Customer: {order.customerName}</p> */}
              {/* <p className="font-medium mt-1">Total: ${order.total}</p> */}
              <div className="mt-4">
                {/* <p className="font-semibold mb-2">Dishes:</p> */}
                <div className="flex flex-wrap gap-2">
                  {order?.items?.map((item, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-gray-700 bg-gray-100"
                    >
                      {item.name} x {item.quantity}
                    </Badge>
                  ))}
                </div>
              </div>
              {order.note && ( // Only display note if it exists
                <div className="mt-4 bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                  <h3 className="font-semibold text-yellow-700">Note:</h3>
                  <p className="text-sm text-yellow-800">{order.note}</p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between mt-4">
              <Button
                onClick={() =>
                  markDishMutation.mutate({
                    status: "approved",
                    id: order.id,
                  })
                }
                className="bg-green-500 hover:bg-green-600 text-white flex items-center"
              >
                <CheckCircle
                  className="mr-2"
                  size={18}
                />{" "}
                Approve Order
              </Button>
              <Button
                onClick={() =>
                  cancelOrderMutation.mutate({ orderId: order.id })
                }
                variant="destructive"
                className="flex items-center"
              >
                <XCircle
                  className="mr-2"
                  size={18}
                />{" "}
                Cancel Order
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PendingOrders;

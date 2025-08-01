import React from "react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatCurrency, getStatusColor } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { ordercycle } from "@/api";
import useCustomer from "@/stores/useCustomer";
import { useSocket } from "@/hooks/useSocket";
import { Box } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate, useParams } from "react-router";

// OrderItem {
//   id: string;
//   name: string;
//   quantity: number;
//   price: number;
//   status: 'pending' | 'preparing' | 'ready' | 'delivered';
// }

//  Order {
//   id: string;
//   items: OrderItem[];
//   total: number;
//   createdAt: string;
// }

const OrdersSection = () => {
  const userId = useCustomer((state) => state.userId);

  const { data: orders = [], refetch } = useQuery({
    queryKey: ["ordercyle"],
    queryFn: () => ordercycle(userId),
  });

  const navigate = useNavigate();
  const { restId, tableId } = useParams();

  // refetch();
  useSocket("status-updated", () => {
    refetch();
    console.log("status-updated");
  });
  console.log(orders);
  // const orders = [
  //   {
  //     id: "1",
  //     items: [
  //       {
  //         id: "1a",
  //         name: "Pizza",
  //         quantity: 2,
  //         price: 1000,
  //         status: "preparing",
  //       },
  //       { id: "1b", name: "Salad", quantity: 1, price: 500, status: "ready" },
  //     ],
  //     total: 2500,
  //     createdAt: "2023-06-15T12:00:00Z",
  //   },
  //   {
  //     id: "2",
  //     items: [
  //       {
  //         id: "2a",
  //         name: "Burger",
  //         quantity: 1,
  //         price: 800,
  //         status: "delivered",
  //       },
  //       {
  //         id: "2b",
  //         name: "Fries",
  //         quantity: 1,
  //         price: 300,
  //         status: "delivered",
  //       },
  //       {
  //         id: "2c",
  //         name: "Soda",
  //         quantity: 1,
  //         price: 200,
  //         status: "delivered",
  //       },
  //     ],
  //     total: 1300,
  //     createdAt: "2023-06-15T11:30:00Z",
  //   },
  //   {
  //     id: "1",
  //     items: [
  //       {
  //         id: "1a",
  //         name: "Pizza",
  //         quantity: 2,
  //         price: 1000,
  //         status: "preparing",
  //       },
  //       { id: "1b", name: "Salad", quantity: 1, price: 500, status: "ready" },
  //     ],
  //     total: 2500,
  //     createdAt: "2023-06-15T12:00:00Z",
  //   },
  // ];

  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-6">
        {orders.length == 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <Box className="w-12 h-12 mb-4" />
            <p>No Active Orders</p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Recent Orders
            </h2>
            {orders.map((order, index) => (
              <div
                key={order.id || index}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900">
                      Order #{order.id}
                    </span>
                    <span className="text-sm text-gray-500">
                      {/* {new Date(order.createdAt).toLocaleString()} */}
                    </span>
                  </div>
                </div>
                <div className="px-4 py-3">
                  {order.items.map((item, index) => (
                    <div
                      key={item.id || index}
                      className="flex justify-between items-center py-2"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="font-medium">{item.quantity}x</span>
                        <span>{item.name}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span>
                          {formatCurrency(item.Price * item.quantity)}
                        </span>
                        <Badge
                          variant="outline"
                          className={`${getStatusColor(
                            item.status
                          )} capitalize`}
                        >
                          {item.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900">Total</span>
                    <span className="font-bold text-lg text-gray-900">
                      {/* {formatCurrency(order.total)} */}
                      {formatCurrency(
                        order.items.reduce(
                          (total, item) => total + item.Price * item.quantity,
                          0
                        )
                      )}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      <div className="flex justify-center items-center p-4">
        <Button
          onClick={() => {
            navigate(`/${restId}/${tableId}/bill`, {
              state: { orders, restId, tableId },
            });
          }}
        >
          Generate Bill
        </Button>
      </div>
    </ScrollArea>
  );
};

export default OrdersSection;

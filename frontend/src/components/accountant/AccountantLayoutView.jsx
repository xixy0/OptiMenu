import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const AccountantLayoutView = ({ tables, orders, onVerifyPayment }) => {
  const [layout, setLayout] = useState([]);

  useEffect(() => {
    setLayout(tables);
  }, [tables]);

  const getOrderStatus = (tableId) => {
    const order = orders.find((o) => o.tableId === tableId);
    if (!order) return "unoccupied";
    const allDelivered = order.items.every(
      (item) => item.status === "delivered"
    );
    return allDelivered ? "ready-for-payment" : "in-progress";
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-inner">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {layout.map((table) => {
          const status = getOrderStatus(table.id);
          const order = orders.find((o) => o.tableId === table.id);

          return (
            <div key={table.id}>
              <Card
                className={`${cn(
                  "overflow-hidden h-full",
                  status === "unoccupied"
                    ? "bg-gray-100 border-gray-200"
                    : status === "in-progress"
                    ? "bg-yellow-50 border-yellow-200"
                    : "bg-green-50 border-green-200",
                  "transition-all duration-300 ease-in-out hover-shadow-lg focus-within:ring-2 focus-within:ring-blue-400"
                )}`}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Table {table.id}
                    </h3>
                    <Badge
                      className={`
                      ${
                        status === "unoccupied"
                          ? "bg-gray-500"
                          : status === "in-progress"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }
                      text-white px-2 py-1 rounded-full text-xs font-medium
                    `}
                    >
                      {status === "unoccupied"
                        ? "Unoccupied"
                        : status === "in-progress"
                        ? "In Progress"
                        : "Ready"}
                    </Badge>
                  </div>
                  {status !== "unoccupied" && order && (
                    <div className="mt-2 space-y-2">
                      <div className="text-sm font-medium text-gray-700">
                        Order #{order.id}
                      </div>
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="text-left text-gray-600">
                            <th className="pb-1">Item</th>
                            <th className="pb-1">Qty</th>
                            <th className="pb-1">Price</th>
                            <th className="pb-1">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.items.map((item) => (
                            <tr
                              key={item.id}
                              className="border-t border-gray-200"
                            >
                              <td className="py-1">{item.name}</td>
                              <td className="py-1">{item.quantity}</td>
                              <td className="py-1">${item.price.toFixed(2)}</td>
                              <td className="py-1">
                                <Badge
                                  variant="outline"
                                  className={
                                    item.status === "delivered"
                                      ? "text-green-600 border-green-300"
                                      : "text-yellow-600 border-yellow-300"
                                  }
                                >
                                  {item.status}
                                </Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr className="border-t border-gray-200 font-medium">
                            <td
                              colSpan={2}
                              className="py-1"
                            >
                              Total:
                            </td>
                            <td
                              colSpan={2}
                              className="py-1"
                            >
                              ${order.total.toFixed(2)}
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  )}
                  {status === "ready-for-payment" && order && (
                    <Button
                      onClick={() => onVerifyPayment(order.id)}
                      className="mt-4 w-full bg-green-500 hover:bg-green-600 text-white transition-colors duration-300 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
                    >
                      Verify Payment
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AccountantLayoutView;

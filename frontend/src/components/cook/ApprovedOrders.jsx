// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { updateOrderStatus } from "@/api";
// import { toast } from "sonner";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent,
//   CardFooter,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { CheckCircle, ThumbsUp } from "lucide-react";

// const ApprovedOrders = ({ orders }) => {
//   const queryClient = useQueryClient();

//   const markOrderMutation = useMutation({
//     mutationFn: (data) => {
//       console.log("Mutation function called with:", data);
//       return updateOrderStatus(data);
//     },
//     onSuccess: () => {
//       toast.success("Order marked as completed!");
//       queryClient.invalidateQueries(["orders", "cook"]);
//     },
//     onError: (error) => {
//       console.error("Mutation failed:", error);
//       toast.error("Failed to mark order as completed. Please try again.");
//     },
//   });

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-lg">
//       <h2 className="text-2xl font-semibold mb-6 flex items-center text-green-600">
//         <ThumbsUp className="mr-2" /> Approved Orders
//       </h2>
//       <div className="space-y-6">
//         {orders.map((order) => (
//           <Card
//             key={order.id}
//             className="shadow-md hover:shadow-lg transition-shadow duration-300"
//           >
//             <CardHeader className="bg-green-100">
//               <CardTitle className="text-lg flex justify-between items-center">
//                 <span>Order #{order.id}</span>
//                 <Badge
//                   variant="secondary"
//                   className="text-green-600 bg-green-200"
//                 >
//                   Approved
//                 </Badge>
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="pt-4">
//               <p className="font-medium">Customer: {order.customerName}</p>
//               <p className="font-medium mt-1">Total: ${order.total}</p>
//               <div className="mt-4">
//                 <p className="font-semibold mb-2">Dishes:</p>
//                 <div className="flex flex-wrap gap-2">
//                   {order?.items?.map((dish, index) => (
//                     <Badge
//                       key={index}
//                       variant="outline"
//                       className="text-gray-700 bg-gray-100"
//                     >
//                       {dish.name} x {dish.quantity}
//                     </Badge>
//                   ))}
//                 </div>
//               </div>
//               {order.note && ( // Only display note if it exists
//                 <div className="mt-4 bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
//                   <h3 className="font-semibold text-yellow-700">Note:</h3>
//                   <p className="text-sm text-yellow-800">{order.note}</p>
//                 </div>
//               )}
//             </CardContent>
//             <CardFooter className="mt-4 flex justify-end">
//               {!order.isCompleted && (
//                 <Button
//                   onClick={() =>
//                     markOrderMutation.mutate({
//                       status: "completed",
//                       id: order.id,
//                     })
//                   }
//                   className="bg-blue-500 hover:bg-blue-600 text-white flex items-center"
//                 >
//                   <CheckCircle
//                     className="mr-2"
//                     size={18}
//                   />{" "}
//                   Mark Order as Done
//                 </Button>
//               )}
//             </CardFooter>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// };
// export default ApprovedOrders;

// import { useQueryClient, useMutation } from "@tanstack/react-query";
// import { ThumbsUp, CheckCircle } from "lucide-react";
// import { toast } from "sonner";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { updateOrderStatus } from "@/api"; // Assuming this function exists in your API lib

// const ApprovedOrders = ({ orders }) => {
//   const queryClient = useQueryClient();

//   const markItemCompletedMutation = useMutation({
//     // data: { orderId: string; itemId: string }
//     mutationFn: (data) => {
//       console.log("Mutation function called with:", data);
//       return updateOrderStatus({
//         status: "completed",
//         id: data.orderId,
//         itemId: data.itemId,
//       });
//     },
//     onSuccess: () => {
//       toast.success("Item marked as completed!");
//       queryClient.invalidateQueries(["orders", "cook"]);
//     },
//     onError: (error) => {
//       console.error("Mutation failed:", error);
//       toast.error("Failed to mark item as completed. Please try again.");
//     },
//   });

//   const allItems = orders.flatMap((order) =>
//     order.items.map((item) => ({
//       ...item,
//       orderId: order.id,
//       customerName: order.customerName,
//     }))
//   );

//   return (
//     <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg">
//       <h2 className="text-2xl font-semibold mb-6 flex items-center text-green-600">
//         <ThumbsUp className="mr-2" /> Approved Items
//       </h2>
//       <div className="space-y-4">
//         {allItems.map((item) => (
//           <Card
//             key={`${item.orderId}-${item.id}`}
//             className="shadow-sm hover:shadow-md transition-shadow duration-300"
//           >
//             <CardContent className="p-4">
//               <div className="flex items-center justify-between gap-3">
//                 <div className="flex items-center space-x-4 flex-grow">
//                   <span className="font-medium text-lg truncate flex-grow">
//                     {item.name}
//                   </span>
//                   <span className="text-sm text-gray-500 whitespace-nowrap">
//                     Qty: {item.quantity}
//                   </span>
//                 </div>
//                 {!item.isCompleted && (
//                   <Button
//                     onClick={() =>
//                       markItemCompletedMutation.mutate({
//                         orderId: item.orderId,
//                         itemId: item.id,
//                       })
//                     }
//                     className="bg-green-500 hover:bg-green-600 text-white"
//                     size="sm"
//                   >
//                     <CheckCircle
//                       className="mr-2"
//                       size={16}
//                     />
//                     Complete
//                   </Button>
//                 )}
//                 {item.isCompleted && (
//                   <span className="text-green-600 font-medium">Completed</span>
//                 )}
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ApprovedOrders;

import { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { ThumbsUp, CheckCircle, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { updateOrderStatus } from "@/api";
import { all } from "axios";

export const ApprovedOrders = ({ orders }) => {
  const queryClient = useQueryClient();

  const markItemCompletedMutation = useMutation({
    // data: { orderId: string; itemId: string }
    mutationFn: (data) => {
      console.log("Approve Orders Mutation function called with:", data);
      return updateOrderStatus({
        status: "completed",
        id: data.orderId,
        itemName: data.itemName,
      });
    },
    onSuccess: () => {
      toast.success("Item marked as completed!");
      queryClient.invalidateQueries(["orders", "cook"]);
    },
    onError: (error) => {
      console.error("Mutation failed:", error);
      toast.error("Failed to mark item as completed. Please try again.");
    },
  });

  const allItems = orders.flatMap((order) =>
    order.items.map((item) => ({
      ...item,
      orderId: order.id,
      customerName: order.customerName,
    }))
  );

  return (
    <Card className="bg-white shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold flex items-center text-green-600">
          <ThumbsUp className="mr-2" /> Approved Items
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            {allItems.length > 0 && (
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-2 sm:p-3 text-left text-xs sm:text-sm font-semibold text-gray-600">
                    Item
                  </th>
                  <th className="p-2 sm:p-3 text-left text-xs sm:text-sm font-semibold text-gray-600">
                    Qty
                  </th>

                  <th className="p-2 sm:p-3 text-left text-xs sm:text-sm font-semibold text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
            )}
            <tbody>
              {allItems.map((item) => (
                <tr
                  key={`${item.orderId}-${item.id}`}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="p-2 sm:p-3">
                    <span className="font-medium text-gray-800 text-xs sm:text-sm">
                      {item.name}
                    </span>
                  </td>
                  <td className="p-2 sm:p-3">
                    <span className="text-gray-600 text-xs sm:text-sm">
                      {item.quantity}
                    </span>
                  </td>

                  <td className="p-2 sm:p-3">
                    <div className="flex items-center space-x-2">
                      {!item.isCompleted && (
                        <Button
                          onClick={() =>
                            markItemCompletedMutation.mutate({
                              orderId: item.orderId,
                              itemName: item.name,
                              status: "completed",
                            })
                          }
                          className="bg-green-500 hover:bg-green-600 text-white transition-colors duration-200"
                          size="sm"
                        >
                          <CheckCircle
                            className="mr-2"
                            size={16}
                          />
                          <span className="hidden sm:inline">Complete</span>
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApprovedOrders;

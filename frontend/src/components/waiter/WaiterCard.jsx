// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardContent,
//   CardFooter,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";

// const WaiterCard = ({ order, onMarkDelivered }) => {
//   return (
//     <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
//       <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-lg">
//         <CardTitle className="flex justify-between items-center">
//           <span>Order #{order.id}</span>
//           <Badge
//             variant="secondary"
//             className="bg-white text-blue-600"
//           >
//             Ready to Deliver
//           </Badge>
//         </CardTitle>
//       </CardHeader>
//       <CardContent className="pt-6">
//         <p className="text-lg font-semibold text-gray-800">
//           Customer: {order.customerName}
//         </p>
//         <p className="text-lg font-bold text-green-600 mt-2">
//           Total: ${order.total}
//         </p>
//         <div className="mt-4">
//           <p className="font-semibold text-gray-700 mb-2">Items:</p>
//           <div className="flex flex-wrap gap-2">
//             {order.items.map((item) => (
//               <Badge
//                 key={item.id}
//                 variant="outline"
//                 className="text-sm"
//               >
//                 {item.name} x {item.quantity}
//               </Badge>
//             ))}
//           </div>
//         </div>
//       </CardContent>
//       <CardFooter className="bg-gray-50 rounded-b-lg">
//         <Button
//           onClick={onMarkDelivered}
//           className="w-full bg-green-500 hover:bg-green-600 text-white transition-colors duration-300"
//         >
//           Mark as Delivered
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// };

// export default WaiterCard;

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOrderStatus } from "@/api";
import { toast } from "sonner";

const WaiterCard = ({ item }) => {
  const queryClient = useQueryClient();
  console.log(item)

  const markDeliveredMutation = useMutation({
    mutationFn: (data) => {
      console.log("Water Mutation function called with:", data);
      return updateOrderStatus(data);
    },
    onSuccess: () => {
      toast.success("Item marked as delivered successfully!");
      queryClient.invalidateQueries(["orders", "waiter"]);
    },
    onError: () => {
      toast.error("Failed to mark item as delivered. Please try again.");
    },
  });

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300 bg-white overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <CardTitle className="flex justify-between items-center text-lg">
          <span className="truncate">{item.name}</span>
          <Badge
            variant="secondary"
            className="bg-white text-blue-600 ml-2"
          >
            Qty: {item.quantity}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <p className="text-sm font-medium text-gray-600">
          Table #{item.tableName}
        </p>
        {/* <p className="text-sm font-medium text-gray-800 mt-1">
          Customer: {item.customerName}
        </p> */}
      </CardContent>
      <CardFooter className="bg-gray-50">
        <Button
          onClick={() =>
            markDeliveredMutation.mutate({
              status: "delivered",
              id: item.orderId,
              itemName: item.name,
            })
          }
          className="w-full bg-green-500 hover:bg-green-600 text-white transition-colors duration-300"
        >
          Mark as Delivered
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WaiterCard;

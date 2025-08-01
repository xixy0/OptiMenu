import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Utensils, Clock, Calendar, CreditCard } from "lucide-react";
import { getOrder } from "@/api";

const DetailedOrder = () => {
  const { id, orderId } = useParams();
  console.log(orderId);

  const {
    data: Order,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["orders", orderId],
    queryFn: () => getOrder(orderId),
    enabled: !!orderId, // Only run the query if orderId is available
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  console.log(Order);
  var total = 0;
  for (var i = 0; i < Order.length; i++) {
    total += Order[i].price * Order[i].quantity;
  }
  // const order = {
  //   orderId: 1,
  //   tableId: 12,
  //   time: "2021-09-01T12:00:00",
  //   date: "2021-09-01",
  //   items: [
  //     {
  //       itemId: 1,
  //       itemName: "Pasta",
  //       quantity: 2,
  //       price: 100,
  //     },
  //     {
  //       itemId: 2,
  //       itemName: "Pizza",
  //       quantity: 1,
  //       price: 120,
  //     },
  //   ],
  //   totalPrice: 320,
  // };
  return (
    // <div className="container mx-auto px-4 py-8 lg:max-w-[60vw]">
    //   <h1 className="text-3xl font-bold text-center mb-8">Order Details</h1>
    //   <div className="bg-white shadow-lg rounded-lg overflow-hidden">
    //     <div className="px-6 py-4">
    //       <div className="font-bold text-xl mb-2">Table {Order[0].user}</div>
    //       <p className="text-gray-700 text-base mb-2">
    //         Order ID: {Order[0].order_id}
    //       </p>
    //       <p className="text-gray-700 text-base mb-2">
    //         Order Date: {Order[0].order_date}
    //       </p>
    //       <p className="text-gray-700 text-base mb-2">
    //         Order Time: {Order[0].order_time}
    //       </p>
    //       <div className="mb-4">
    //         <h2 className="text-lg font-bold mb-2">Items:</h2>
    //         {Order.map((item) => (
    //           <div
    //             key={item.itemname}
    //             className="flex justify-between items-center"
    //           >
    //             <p className="text-gray-700">
    //               {item.itemname} (x{item.quantity})
    //             </p>
    //             <p className="text-gray-700">₹{item.price * item.quantity}</p>
    //           </div>
    //         ))}
    //       </div>
    //       <div className="border-t border-gray-300 pt-4">
    //         <p className="text-xl font-bold">Total Price: ₹{total}</p>
    //       </div>
    //     </div>
    //     <div className="px-6 py-4 bg-gray-100">
    //       <Link to={`/${id}/orders`}>
    //         <Button
    //           variant="secondary"
    //           className="w-full"
    //         >
    //           Back to Orders
    //         </Button>
    //       </Link>
    //     </div>
    //   </div>
    // </div>
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card className="backdrop-blur-sm bg-white/30 shadow-xl border-0">
        <CardHeader className="text-center border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100">
          <CardTitle className="text-3xl font-serif tracking-tight text-gray-800">
            Order Receipt
          </CardTitle>
          <p className="text-sm text-gray-500 font-medium">
            Table {Order[0].user}
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-gray-500" />
              <span className="text-gray-600">{Order[0].order_date}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2 text-gray-500" />
              <span className="text-gray-600">{Order[0].order_time}</span>
            </div>
            <div className="flex items-center col-span-2">
              <CreditCard className="w-4 h-4 mr-2 text-gray-500" />
              <span className="text-gray-600">
                Order ID: {Order[0].order_id}
              </span>
            </div>
          </div>
          <Separator className="my-4" />
          <ScrollArea className="h-[200px] pr-4">
            {Order.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-2"
              >
                <div className="flex items-center">
                  <Utensils className="w-4 h-4 mr-2 text-gray-400" />
                  <span className="text-gray-800">{item.itemname}</span>
                  <span className="text-gray-500 ml-2">x{item.quantity}</span>
                </div>
                <span className="text-gray-800 font-medium">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </ScrollArea>
          <Separator className="my-4" />
          <div className="flex justify-between items-center text-lg font-semibold mt-4">
            <span className="text-gray-800">Total</span>
            <span className="text-gray-800">₹{total.toFixed(2)}</span>
          </div>
        </CardContent>
        <CardFooter className="bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200">
          <Link
            href={`/${id}/orders`}
            className="w-full"
          >
            <Button
              variant="secondary"
              className="w-full bg-gray-800 text-white hover:bg-gray-700 transition-colors"
            >
              Back to Orders
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};
export default DetailedOrder;

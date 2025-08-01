import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Clock, CreditCard, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const OrderCard = ({
  orderId,
  orderDate,
  orderTime,
  tableId,
  totalPrice,
  link,
}) => {
  return (
    // <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
    //   <CardHeader className="px-6 py-4">
    //     <CardTitle>Table {tableId}</CardTitle>
    //     {/* <CardDescription>Card Description</CardDescription> */}
    //   </CardHeader>
    //   <CardContent>
    //     <p className="text-gray-700 text-base mb-2">
    //       Order ID: {orderId}
    //       {/* Order id */}
    //     </p>
    //     <p className="text-gray-700 text-base mb-2">
    //       Order Date: {orderDate}
    //       {/* Order date */}
    //     </p>
    //     <p className="text-gray-700 text-base mb-2">
    //       Order Time: {orderTime}
    //       {/* Order time */}
    //     </p>
    //   </CardContent>
    //   <CardFooter>
    //     <p className="text-gray-700 text-lg font-bold">
    //       Total Price: ₹ {totalPrice}
    //     </p>
    //   </CardFooter>
    // </Card>
    <Card className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-semibold text-gray-800">
            Table {tableId}
          </CardTitle>
          <Badge className={`${statusColors[status]} capitalize`}>
            {status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="px-6 py-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center text-gray-600">
            <CreditCard className="w-5 h-5 mr-2 text-blue-500" />
            <span className="text-sm">Order ID: {orderId}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Calendar className="w-5 h-5 mr-2 text-green-500" />
            <span className="text-sm">{orderDate}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="w-5 h-5 mr-2 text-purple-500" />
            <span className="text-sm">{orderTime}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Users className="w-5 h-5 mr-2 text-orange-500" />
            <span className="text-sm text-black">Table {tableId}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 flex justify-between items-center">
        <p className="text-gray-800 text-lg font-bold">Total: ₹{totalPrice}</p>
        <Link to={link}>
          <Button
            variant="outline"
            size="sm"
          >
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default OrderCard;

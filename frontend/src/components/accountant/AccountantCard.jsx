import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const AccountantCard = ({ order, onVerifyPayment }) => {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <CardTitle className="flex justify-between items-center">
          <span>Order #{order.id}</span>
          <Badge
            variant="secondary"
            className="bg-white text-blue-600"
          >
            Pending Payment
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <p className="text-lg font-semibold text-gray-800">
          Customer: {order.customerName}
        </p>
        <p className="text-xl font-bold text-green-600 mt-2">
          Total: ${order.total.toFixed(2)}
        </p>
        <div className="mt-4">
          <p className="font-semibold text-gray-700 mb-2">Items:</p>
          <ul className="space-y-2">
            {order.items.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center text-sm"
              >
                <span>
                  {item.name} (x{item.quantity || 1})
                </span>
                <span className="font-medium">${item.price.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50">
        <Button
          onClick={onVerifyPayment}
          className="w-full bg-green-500 hover:bg-green-600 text-white transition-colors duration-300"
        >
          Verify Payment
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AccountantCard;

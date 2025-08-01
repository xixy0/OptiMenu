import useCart from "@/stores/useCart";

import { Plus, Minus, Trash2 } from "lucide-react";

import { formatCurrency } from "@/lib/utils";

const CartItem = ({ item }) => {
  const decrementQuantity = useCart((state) => state.decrementQuantity);
  const incrementQuantity = useCart((state) => state.incrementQuantity);
  const removeItem = useCart((state) => state.removeItem);

  // return (
  //   <Card
  //     key={item.id}
  //     className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 shadow-md"
  //   >
  //     {/* Image */}
  //     <div className="flex-shrink-0">
  //       <img
  //         src={item.image || "/images/avocado-salad.webp"}
  //         alt={item.name}
  //         className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-md border"
  //       />
  //     </div>

  //     {/* Item Content */}
  //     <CardContent className="flex-grow">
  //       <h2 className="text-lg font-medium">{item.name}</h2>
  //       <p className="text-sm text-gray-600">{item.description}</p>
  //       <p className="text-sm font-semibold text-gray-800">
  //         ${item.price.toFixed(2)}
  //       </p>
  //     </CardContent>

  //     {/* Quantity Controls */}
  //     <CardFooter className="flex items-center space-x-4">
  //       <Button
  //         variant="outline"
  //         size="sm"
  //         onClick={() => decrementQuantity(item.id)}
  //         disabled={item.quantity <= 1}
  //         className="p-2"
  //       >
  //         <Minus className="text-red-500 w-5 h-5" />
  //       </Button>

  //       <span className="text-lg font-semibold">{item.quantity}</span>

  //       <Button
  //         variant="outline"
  //         size="sm"
  //         onClick={() => incrementQuantity(item.id)}
  //         className="p-2"
  //       >
  //         <Plus className="text-green-500 w-5 h-5" />
  //       </Button>

  //       <Button
  //         variant="outline"
  //         className="text-sm ml-4 text-red-500 p-2"
  //         onClick={() => removeItem(item.id)}
  //       >
  //         <Trash2 className="text-red-500 w-5 h-5" />
  //       </Button>
  //     </CardFooter>
  //   </Card>
  // );

  return (
    <div className="flex items-center gap-4 py-4 border-b border-gray-200">
      <img
        src={item.image}
        alt={item.name}
        className="w-20 h-20 object-cover rounded"
      />
      <div className="flex-1">
        <h3 className="font-medium text-gray-900">{item.name}</h3>
        <p className="text-gray-600">{formatCurrency(item.price)}</p>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => decrementQuantity(item.id)}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="w-8 text-center">{item.quantity}</span>
        <button
          onClick={() => incrementQuantity(item.id)}
          className="p-1 rounded-full hover:bg-gray-100"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          onClick={() => removeItem(item.id)}
          className="p-1 text-red-600 rounded-full hover:bg-red-50"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
export default CartItem;

import { useEffect } from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Minus, ShoppingCart, Trash2 } from "lucide-react";

import useCart from "@/stores/useCart";
import { cn, formatCurrency } from "@/lib/utils";

function MenuItem({ item }) {
  const cart = useCart((state) => state.items);
  const addToCart = useCart((state) => state.addToCart);
  const decrementQuantity = useCart((state) => state.decrementQuantity);
  const incrementQuantity = useCart((state) => state.incrementQuantity);
  // const removeItem = useCart((state) => state.removeItem);

  // const isInCart = cart.some((cartItem) => cartItem.id === item.id);
  const itemInCart = cart.find((cartItem) => cartItem.id === item.id);

  const handleAddToCart = () => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image || "",
    });
  };

  useEffect(() => {}, [cart]);

  return (
    <Card className="relative shadow-md border-none overflow-hidden pb-4 flex flex-col">
      <img
        src={item.image || "/images/avocado-salad.webp"}
        alt={item.name}
        className="w-full h-32 object-cover sm:h-32 md:h-40 lg:h-48 relative aspect-[3/4] overflow-hidden"
      />

      <CardContent className="p-0 -mt-2 flex flex-col flex-grow ">
        <CardHeader className="px-4">
          <CardTitle className="text-lg font-bold line-clamp-3">
            <div className="flex  items-start justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                {item.name}
              </h3>
              <span className="text-lg font-bold text-blue-600">
                {formatCurrency(item.price)}
              </span>
            </div>
            <p className="text-sm text-gray-600 mt-1">{item.category}</p>
          </CardTitle>
          <CardDescription className="text-sm text-gray-500 line-clamp-2">
            {item.description}
          </CardDescription>
        </CardHeader>

        <div className="flex justify-between items-center px-4">
          <span
            className={cn(
              "px-2 py-1 rounded-full text-sm",
              item.available
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            )}
          >
            {item.available ? "Available" : "Sold Out"}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              Demand: {item.demandScore}%
            </span>

            {itemInCart ? (
              // <div className="flex items-center gap-2 transition-transform duration-300 ease-in-out scale-100 w-28 h-10">
              //   <Button
              //     variant="ghost"
              //     size="icon"
              //     onClick={() => decrementQuantity(item.id)}
              //     className="p-1 rounded-full hover:bg-gray-100 bg-gray-50 "
              //   >
              //     <Minus className="w-4 h-4 text-red-500" />
              //   </Button>
              //   <span className="w-8 text-center">{itemInCart.quantity}</span>
              //   <Button
              //     variant="ghost"
              //     size="icon"
              //     onClick={() => incrementQuantity(item.id)}
              //     className="p-1 rounded-full hover:bg-gray-100 bg-gray-50"
              //   >
              //     <Plus className="w-4 h-4 text-green-500" />
              //   </Button>
              // </div>
              <div
                className={`flex items-center gap-2 w-28 h-10 bg-blue-100 rounded-md overflow-hidden transition-all duration-300 ease-in-out translate-y-0 opacity-100`}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => decrementQuantity(item.id)}
                  className="p-1 h-full rounded-none hover:bg-blue-200 transition-colors duration-200"
                >
                  <Minus className="w-4 h-4 text-blue-600" />
                </Button>
                <span className="flex-1 text-center font-medium text-blue-800">
                  {itemInCart.quantity}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => incrementQuantity(item.id)}
                  className="p-1 h-full rounded-none hover:bg-blue-200 transition-colors duration-200"
                >
                  <Plus className="w-4 h-4 text-blue-600" />
                </Button>
              </div>
            ) : (
              // <Button
              //   variant="primary"
              //   size="sm"
              //   onClick={handleAddToCart}
              //   // className="flex items-center gap-2"
              //   className="flex items-center gap-2 transition-all duration-300 ease-in-out transform hover:scale-105 w-28 h-10"
              // >
              //   <ShoppingCart className="w-4 h-4" />
              //   ADD
              // </Button>
              <div
                className={`transition-all duration-300 ease-in-out w-28 h-10 translate-y-0 opacity-100`}
              >
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleAddToCart}
                  className="flex items-center gap-2 w-full h-full bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  <ShoppingCart className="w-4 h-4" />
                  ADD
                </Button>
              </div>
            )}

            {/* ----- */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default MenuItem;

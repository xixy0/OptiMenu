import { useParams } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { shallow } from "zustand/shallow";

import { Badge } from "@/components/ui/badge";

import useCart from "@/stores/useCart";

const CartIcon = ({ onCartClick }) => {
  const { id } = useParams();

  const cartItems = useCart((state) => state.items, shallow);
  const itemCount = cartItems.length;

  return (
    <div
      className="flex items-center justify-end w-auto bg-white text-black m-4 h-full p-0"
      onClick={onCartClick}
    >
      <ShoppingCart className="w-8 h-8 md:w-10 md:h-10 cursor-pointer text-gray-700 hover:text-gray-900 transition-colors" />
      {itemCount > 0 && (
        <Badge className="absolute -top-0 -right-2 px-[0.35rem] min-w-[1.25rem] h-5 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-500">
          {itemCount}
        </Badge>
      )}
    </div>
  );
};

export default CartIcon;

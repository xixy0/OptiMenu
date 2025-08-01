import { useMutation } from "@tanstack/react-query";
//import {useParams} from 'react-router'

import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { X, ShoppingBag } from "lucide-react";

import useCart from "@/stores/useCart";
import { formatCurrency } from "@/lib/utils";
import CartItem from "./CartItem";
import OrderNote from "./OrderNote";
import { useParams } from "react-router";

import useCustomer from "@/stores/useCustomer";

const baseURL = "http://localhost:5000";
//const baseURL = "http://192.168.1.126:5000";

const placeOrderApi = async (itemsToOrder, note, tableId, user, Url) => {
  try {
    const response = await fetch(Url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ itemsToOrder, note, tableId, user }),
    });

    if (!response.ok) {
      throw new Error("Error placing order");
    }

    const data = await response.json();
    return data; // Assuming the backend returns some data after placing the order
  } catch (error) {
    // console.error("Error placing order:", error);
    throw error;
  }
};

const CartSection = ({ onClose }) => {
  const cartItems = useCart((state) => state.items);
  const totalPrice = useCart((state) => state.total);
  const clearCart = useCart((state) => state.clearCart);
  const note = useCart((state) => state.note);
  const user = useCustomer((state) => state.userId);
  const { restId, tableId } = useParams();
  console.log(tableId);

  const placeOrder = async () => {
    const itemsToOrder = cartItems.map((item) => ({
      id: item.id,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      tableId: tableId,
      restId: restId,
    }));
    try {
      const server1Url = `${baseURL}/steward`;
      //const server2Ur1 = "http://localhost:5000/cook";
      const response = await placeOrderApi(
        itemsToOrder,
        note,
        tableId,
        user,
        server1Url
      );
      console.log("Order placed:", response);
      //const response2 = await placeOrderApi(itemsToOrder, server2Ur1);
      // console.log("passed to cook", response2);
      toast.success("Order placed successfully");
      clearCart();
    } catch (error) {
      console.log("Overall error", error);
      toast.error("Error placing order");
    }
  };

  const { mutate: placeOrderMutation, isPending } = useMutation({
    mutationFn: placeOrder,
    // onSuccess: () => {
    //   toast.success("Order placed successfully");
    //   clearCart();
    //   console.log("Successful");
    // },
    // onError: () => {
    //   toast.error("Error placing order");
    //   console.log("Got Error");
    // },
  });

  //   const handlePlaceOrder = () => {
  //     if (confirm("Are you sure you want to place the order?")) {
  //       placeOrderMutation.mutate();
  //       toast.success("Order placed successfully");
  //       clearCart();
  //     }
  //   };

  //   const handleClearCart = () => {
  //     if (confirm("Are you sure you want to clear the cart?")) {
  //       clearCart();
  //     }
  //   };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto px-4">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <ShoppingBag className="w-12 h-12 mb-4" />
            <p>Your cart is empty</p>
          </div>
        ) : (
          <>
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
              />
            ))}
            <OrderNote />
          </>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="border-t p-4 mt-4 space-y-4">
          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>{formatCurrency(totalPrice)}</span>
          </div>
          <Button
            variant="primary"
            className="w-full"
            disabled={isPending}
            // onClick={handlePlaceOrder}
            onClick={placeOrderMutation}
          >
            Place Order
          </Button>
          <Button
            variant="destructive"
            className="w-full"
            disabled={isPending}
            onClick={() => {
              clearCart();
              toast.success("Cart cleared successfully.");
            }}
          >
            Clear Cart
          </Button>
        </div>
      )}
    </div>
  );
};
export default CartSection;

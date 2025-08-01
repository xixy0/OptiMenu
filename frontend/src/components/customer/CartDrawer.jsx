import { useParams } from "react-router";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

import { X, ShoppingBag } from "lucide-react";

import CartSection from "./CartSection";
import OrdersSection from "./OrderSection";

const CartDrawer = ({ isOpen, onClose }) => {
  const { restId, tableId } = useParams();

  // console.log("restId", restId);
  // console.log("tableId", tableId);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      <div className="absolute right-0 top-0 h-full w-full max-w-lg bg-white shadow-xl">
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between px-4 py-6 border-b">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-6 h-6" />
              <h2 className="text-lg font-semibold">Cart</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* <CartSection /> */}
          {/* <OrdersSection /> */}

          <Tabs
            defaultValue="cart"
            className="flex flex-col flex-1 w-full overflow-auto"
          >
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger
                value="cart"
                className="flex gap-2 "
              >
                {/* <LockIcon className="w-4 h-4" /> */}
                Cart
              </TabsTrigger>
              <TabsTrigger
                value="order-history"
                className="flex gap-2"
              >
                {/* <UserIcon className="w-4 h-4" /> */}
                Orders
              </TabsTrigger>
            </TabsList>
            <ScrollArea className="flex-1">
              <TabsContent
                value="cart"
                className="h-full"
              >
                <CartSection onClose={onClose} />
              </TabsContent>
              <TabsContent
                value="order-history"
                className="h-full"
              >
                <OrdersSection />
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;

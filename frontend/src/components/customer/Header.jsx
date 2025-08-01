import { useState } from "react";

import CartIcon from "@/components/customer/CartIcon";
import CartDrawer from "./CartDrawer";

function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <header className="text-center md:text-left mb-4 md:mb-2">
      <div className="flex  items-center justify-between gap-4">
        <div className="flex  items-center  gap-4">
          <div className="flex gap-3 items-center">
            <img
              className="w-16 h-16 border-2 border-gray-200"
              src="/images/logo.jpg"
              alt="Logo"
            />
            <h1 className="text-2xl font-semibold">Restaurant name</h1>
          </div>
          {/* <div className="space-y-2 sm:space-y-4 ">
            <h1 className="text-2xl font-semibold">Restaurant name</h1>
            <div className="flex flex-col sm:flex-row sm:space-x-4">
              <p className="text-sm text-gray-600">Address</p>
              <p className="text-sm text-gray-600">+999888777</p>
              <p className="text-sm text-gray-500">
                Pick-up and delivery only.
              </p>
            </div>
          </div> */}
        </div>
        <CartIcon onCartClick={() => setIsCartOpen(true)} />
      </div>
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </header>
  );
}

export default Header;

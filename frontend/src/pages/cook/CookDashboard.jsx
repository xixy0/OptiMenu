import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchOrders } from "@/api";
import { useSocket } from "@/hooks/useSocket";
import { ChefHat } from "lucide-react";

import PendingOrders from "@/components/cook/PendingOrders";
import ApprovedOrders from "@/components/cook/ApprovedOrders";
import MobileNav from "@/components/cook/MobileNav";
import { useParams } from "react-router";

const CookDashboard = () => {
  const { cookId } = useParams();

  const { data: orders = [], refetch } = useQuery({
    queryKey: ["orders", "cook"],
    queryFn: () => fetchOrders("cook"),
  });
  console.log(orders);

  const [activeTab, setActiveTab] = useState("pending");

  useSocket("order-updated", refetch);
  useSocket("approved", refetch);

  const pendingOrders = orders.filter((order) => order.status === "verified");
  const approvedOrders = orders.filter((order) => order.status === "approved");

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <header className="mb-8 text-center">
          <ChefHat className="inline-block mb-2 text-4xl text-orange-500" />
          <h1 className="text-3xl font-bold text-gray-800">Cook Dashboard</h1>
        </header>

        <MobileNav
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <div className="grid lg:grid-cols-2 gap-8 mt-8">
          <div
            className={`space-y-6 ${
              activeTab === "pending" ? "block" : "hidden lg:block"
            }`}
          >
            <PendingOrders orders={pendingOrders} />
          </div>
          <div
            className={`space-y-6 ${
              activeTab === "approved" ? "block" : "hidden lg:block"
            }`}
          >
            <ApprovedOrders orders={approvedOrders} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookDashboard;

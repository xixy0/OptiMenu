// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { toast } from "sonner";
// import { fetchOrders, updateOrderStatus } from "@/api";
// import { useSocket } from "@/hooks/useSocket";
// import { Loader2 } from "lucide-react";
// import AccountantCard from "@/components/accountant/AccountantCard";

// const AccountantDashboard = () => {
//   const queryClient = useQueryClient();
//   const {
//     data: orders = [],
//     refetch,
//     isLoading,
//   } = useQuery({
//     queryKey: ["payments", "accountant"],
//     queryFn: () => fetchOrders("accountant"),
//   });

//   // const orders = [
//   //   {
//   //     id: 1,
//   //     customerName: "John Doe",
//   //     total: 46.97,
//   //     items: [
//   //       { id: 1, name: "Item 1", price: 10.99 },
//   //       { id: 2, name: "Item 2", price: 15.99 },
//   //       { id: 3, name: "Item 3", price: 19.99 },
//   //     ],
//   //   },
//   //   {
//   //     id: 2,
//   //     customerName: "Jane Smith",
//   //     total: 32.97,
//   //     items: [
//   //       { id: 1, name: "Item 1", price: 12.99 },
//   //       { id: 2, name: "Item 2", price: 9.99 },
//   //       { id: 3, name: "Item 3", price: 9.99 },
//   //     ],
//   //   },
//   //   {
//   //     id: 3,
//   //     customerName: "Alex Johnson",
//   //     total: 19.99,
//   //     items: [{ id: 1, name: "Item 1", price: 19.99 }],
//   //   },
//   // ];

//   // useEffect(() => {
//   //   socket.on("payment-updated", () => refetch());
//   //   return () => {
//   //     socket.off("payment-updated");
//   //   };
//   // }, [refetch]);
//   useSocket("payment-updated", refetch);

//   const verifyPaymentMutation = useMutation({
//     mutationFn: (data) => {
//       return updateOrderStatus(data);
//     },
//     onSuccess: () => {
//       toast.success("Payment verified successfully!");
//       queryClient.invalidateQueries(["payments", "accountant"]);
//     },
//     onError: () => {
//       toast.error("Failed to verify payment. Please try again.");
//     },
//   });

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <Loader2 className="w-8 h-8 animate-spin text-primary" />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4 md:p-6">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
//           Accountant Dashboard
//         </h1>
//         {/* <AccountantSummary orders={orders} /> */}
//         <div className="mt-8 space-y-6">
//           {orders.map((order) => (
//             <AccountantCard
//               key={order.id}
//               order={order}
//               onVerifyPayment={() =>
//                 verifyPaymentMutation.mutate({ status: "paid", id: order.id })
//               }
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AccountantDashboard;

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { fetchOrders, updateOrderStatus } from "@/api";
import { useSocket } from "@/hooks/useSocket";
import { Loader2, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import AccountantLayoutView from "@/components/accountant/AccountantLayoutView";

const AccountantDashboard = () => {
  const queryClient = useQueryClient();
  const {
    data: Orders = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["orders", "accountant"],
    queryFn: () => fetchOrders("accountant"),
  });
  console.log(Orders);
  useSocket("order-updated", refetch);

  const verifyPaymentMutation = useMutation({
    mutationFn: (data) => {
      return updateOrderStatus(data);
    },
    onSuccess: () => {
      toast.success("Payment verified successfully!");
      queryClient.invalidateQueries(["orders", "accountant"]);
    },
    onError: () => {
      toast.error("Failed to verify payment. Please try again.");
    },
  });

  // Dummy data for tables and orders
  const dummyTables = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    // status: Math.random() > 0.3 ? "occupied" : "unoccupied",
  }));

  // const Orders = [
  //   {
  //     id: 1,
  //     tableId: 2,
  //     items: [
  //       {
  //         id: 1,
  //         name: "Pasta Carbonara",
  //         status: "delivered",
  //         quantity: 2,
  //         price: 15.99,
  //       },
  //       {
  //         id: 2,
  //         name: "Caesar Salad",
  //         status: "delivered",
  //         quantity: 1,
  //         price: 8.99,
  //       },
  //       {
  //         id: 3,
  //         name: "Tiramisu",
  //         status: "delivered",
  //         quantity: 2,
  //         price: 7.5,
  //       },
  //     ],
  //     total: 55.97,
  //   },
  //   {
  //     id: 2,
  //     tableId: 5,
  //     items: [
  //       {
  //         id: 4,
  //         name: "Grilled Salmon",
  //         status: "in-progress",
  //         quantity: 1,
  //         price: 22.99,
  //       },
  //       {
  //         id: 5,
  //         name: "Merlot",
  //         status: "delivered",
  //         quantity: 1,
  //         price: 9.99,
  //       },
  //       {
  //         id: 6,
  //         name: "Cheesecake",
  //         status: "in-progress",
  //         quantity: 1,
  //         price: 6.99,
  //       },
  //     ],
  //     total: 39.97,
  //   },
  //   {
  //     id: 3,
  //     tableId: 8,
  //     items: [
  //       {
  //         id: 7,
  //         name: "Margherita Pizza",
  //         status: "delivered",
  //         quantity: 1,
  //         price: 14.99,
  //       },
  //       {
  //         id: 8,
  //         name: "Bruschetta",
  //         status: "delivered",
  //         quantity: 1,
  //         price: 7.99,
  //       },
  //       {
  //         id: 9,
  //         name: "Espresso",
  //         status: "delivered",
  //         quantity: 2,
  //         price: 3.5,
  //       },
  //     ],
  //     total: 29.98,
  //   },
  //   {
  //     id: 4,
  //     tableId: 12,
  //     items: [
  //       {
  //         id: 10,
  //         name: "Steak Frites",
  //         status: "delivered",
  //         quantity: 2,
  //         price: 24.99,
  //       },
  //       {
  //         id: 11,
  //         name: "House Salad",
  //         status: "delivered",
  //         quantity: 2,
  //         price: 6.99,
  //       },
  //       {
  //         id: 12,
  //         name: "Chocolate Mousse",
  //         status: "delivered",
  //         quantity: 2,
  //         price: 8.5,
  //       },
  //     ],
  //     total: 80.96,
  //   },
  // ];

  // if (isLoading) {
  //   return (
  //     <div className="flex items-center justify-center h-screen bg-gray-50">
  //       <Loader2 className="w-12 h-12 animate-spin text-primary" />
  //     </div>
  //   )
  // }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Accountant Dashboard
          </h1>
          <Button
            // onClick={() => refetch()}
            className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-300"
          >
            <RefreshCcw className="w-4 h-4" />
            <span>Refresh</span>
          </Button>
        </header>
        <main className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Table Overview
          </h2>
          <AccountantLayoutView
            tables={dummyTables}
            orders={Orders}
            onVerifyPayment={(orderId) =>
              verifyPaymentMutation.mutate({ status: "paid", id: orderId })
            }
          />
        </main>
      </div>
    </div>
  );
};

export default AccountantDashboard;

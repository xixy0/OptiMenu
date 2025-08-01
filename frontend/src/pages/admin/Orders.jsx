import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "react-router-dom";

import { getAllOrders } from "@/api";
import OrderCard from "@/components/admin/OrderCard";

const Orders = () => {
  const currentURL = useLocation().pathname;

  const { data: Orders = [] } = useQuery({
    queryKey: ["orders"],
    queryFn: getAllOrders,
    staleTime: 5000,
    refetchInterval: 30000,
  });
  console.log(Orders);
  // const ordersArray = [
  //   {
  //     orderId: 1,
  //     tableId: 12,
  //     orderTime: "2021-09-01T12:00:00",
  //     orderDate: "2021-09-01",
  //     totalPrice: 40,
  //   },
  //   {
  //     orderId: 2,
  //     tableId: 13,
  //     orderTime: "2021-09-01T12:00:00",
  //     orderDate: "2021-09-01",
  //     totalPrice: 30,
  //   },
  //   {
  //     orderId: 3,
  //     tableId: 14,
  //     orderTime: "2021-09-01T12:00:00",
  //     orderDate: "2021-09-01",
  //     totalPrice: 50,
  //   },
  // ];

  // return <div>Orders</div>;
  return (
    <>
      {/* <OrderCard /> */}

      <div className="container mx-auto px-4 ">
        <h1 className="text-3xl font-bold text-center mb-8">Orders</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {Orders.map((order) => (
            <OrderCard
              key={order.order_id}
              orderId={order.order_id}
              tableId={order.user}
              orderTime={order.order_time}
              orderDate={order.order_date}
              totalPrice={order.total_price}
              link={`${currentURL}/${order.order_id}`}
            />
          ))}
        </div>
      </div>
    </>
  );
};
export default Orders;

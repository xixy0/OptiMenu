import { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Button } from "../../components/ui/button";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../components/ui/card";
import { Separator } from "../../components/ui/separator";
import { FileText, CreditCard, DollarSign } from "lucide-react";
import { fetchBill } from "@/api";

import BillPDF from "../../components/customer/BillPDF";
import { useLocation, useNavigate, useParams } from "react-router";
import useCustomer from "@/stores/useCustomer";

const BillDetails = () => {
  // const location = useLocation();
  // const { restId, tableId, orders } = location.state || {};
  //   console.log("From location state", restId, tableId);
  //   console.log("Orders: ", orders);

  const navigate = useNavigate();

  const { restId, tableId } = useParams();

  const userId = useCustomer((state) => state.userId);

  const [paymentMethod, setPaymentMethod] = useState(null);
  console.log("Hiii");
  const {
    data: bill,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["bill", userId],
    queryFn: () => fetchBill(userId),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  console.log("Here is the bill", bill[0]);

  if (bill.length === 0) {
    navigate(`/${restId}/${tableId}/menu`);
  }

  // console.log("Bill", bill);
  // console.log("bill[0]", bill[0]);
  // console.log("bill[0].items", bill[0].items);

  // const { data: bill =[], error, isLoading } = useQuery({
  //   queryKey: ["bill", userId],
  //   queryFn: () => {
  //     console.log("Fetching bill for user:", userId);
  //     return fetchBill(userId);
  //   },
  // });

  console.log(userId);
  // const bill = {
  //   id: "12345",
  //   tableNumber: 7,
  //   createdAt: new Date().toISOString(),
  //   items: [
  //     { id: "1", name: "Margherita Pizza", price: 8.99, quantity: 2 },
  //     { id: "2", name: "Caesar Salad", price: 6.49, quantity: 1 },
  //     { id: "3", name: "Spaghetti Carbonara", price: 10.99, quantity: 1 },
  //     { id: "4", name: "Grilled Chicken", price: 12.99, quantity: 1 },
  //     { id: "5", name: "French Fries", price: 4.99, quantity: 1 },
  //     { id: "6", name: "Chocolate Brownie", price: 5.49, quantity: 1 },
  //     { id: "7", name: "Lemonade", price: 3.99, quantity: 2 },
  //   ],
  // };

  const subtotal = bill[0].items.reduce(
    (sum, item) => sum + item.Price * item.quantity,
    0
  );
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const handlePayment = () => {
    // handle payment logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 p-4 flex justify-center items-center">
      <Card className="w-full max-w-lg shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl md:text-3xl lg:text-4xl font-bold">
            Your Bill
          </CardTitle>
          <CardDescription className="text-sm md:text-base text-gray-500">
            Thank you for dining with us!
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between text-sm md:text-base">
              <span>Table: {bill[0].tableNumber}</span>
              <span>Date: {new Date(bill[0].createdAt).toLocaleString()}</span>
            </div>
            <Separator className="my-4" />
            <div className="space-y-2">
              {bill[0].items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between text-sm md:text-base"
                >
                  <span>
                    {item.name} x{item.quantity}
                  </span>
                  <span>${(item.Price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <Separator className="my-4" />
            <div className="text-sm md:text-base">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (10%):</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg md:text-xl mt-2">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          <div className="mt-6 text-center">
            <PDFDownloadLink
              document={
                <BillPDF
                  bill={bill[0]}
                  subtotal={subtotal}
                  tax={tax}
                  total={total}
                />
              }
              fileName={`bill-table${bill.tableNumber}-${bill.id}.pdf`}
            >
              {({ loading }) => (
                <Button
                  variant="outline"
                  className="w-full flex justify-center items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  {loading ? "Generating PDF..." : "Download Bill"}
                </Button>
              )}
            </PDFDownloadLink>
          </div>
          <div className="mt-6 text-center">
            <h4 className="font-semibold text-base md:text-lg">
              Select Payment Method
            </h4>
            <div className="flex justify-center gap-4 mt-2">
              <Button
                variant={paymentMethod === "cash" ? "solid" : "outline"}
                className="flex items-center gap-2"
                onClick={() => setPaymentMethod("cash")}
              >
                <DollarSign className="w-4 h-4" />
                Cash
              </Button>
              <Button
                variant={paymentMethod === "online" ? "solid" : "outline"}
                className="flex items-center gap-2"
                onClick={() => setPaymentMethod("online")}
              >
                <CreditCard className="w-4 h-4" />
                Online
              </Button>
            </div>
          </div>
          {paymentMethod && (
            <Button
              className="w-full mt-6 flex justify-center items-center gap-2"
              onClick={handlePayment}
            >
              Proceed with {paymentMethod === "cash" ? "Cash" : "Online"}{" "}
              Payment
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BillDetails;

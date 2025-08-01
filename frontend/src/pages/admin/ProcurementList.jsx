// import { useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//   Search,
//   Plus,
//   Minus,
//   TrendingUp,
//   AlertTriangle,
//   CheckCircle2,
// } from "lucide-react";

// import { procurementCategories } from "@/constants";

// const ProcurementList = () => {
//   const [quantities, setQuantities] = useState({});
//   const [searchTerm, setSearchTerm] = useState("");

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "critical":
//         return "destructive";
//       case "low":
//         return "warning";
//       case "normal":
//         return "success";
//       default:
//         return "secondary";
//     }
//   };

//   const getTrendIcon = (trend) => {
//     switch (trend) {
//       case "up":
//         return <TrendingUp className="h-4 w-4 text-emerald-500" />;
//       case "down":
//         return <TrendingUp className="h-4 w-4 text-rose-500 rotate-180" />;
//       default:
//         return <TrendingUp className="h-4 w-4 text-gray-500 rotate-90" />;
//     }
//   };

//   const handleQuantityChange = (id, delta) => {
//     setQuantities((prev) => ({
//       ...prev,
//       [id]: Math.max(0, (prev[id] || 0) + delta),
//     }));
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
//         <div>
//           <h1 className="text-3xl font-bold">Procurement List</h1>
//           <p className="text-muted-foreground">
//             Plan your ingredients for tomorrow
//           </p>
//         </div>
//         <div className="flex gap-4 w-full md:w-auto">
//           <div className="relative flex-1 md:w-[300px]">
//             <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
//             <Input
//               placeholder="Search ingredients..."
//               className="pl-8"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>
//           <Button>Export List</Button>
//         </div>
//       </div>

//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//         <Card className="col-span-full lg:col-span-2">
//           <CardHeader>
//             <CardTitle>Ingredients by Category</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <Tabs
//               defaultValue="vegetables"
//               className="w-full"
//             >
//               <TabsList className="w-full justify-start mb-4 overflow-auto">
//                 {Object.keys(procurementCategories).map((category) => (
//                   <TabsTrigger
//                     key={category}
//                     value={category}
//                     className="capitalize"
//                   >
//                     {category}
//                   </TabsTrigger>
//                 ))}
//               </TabsList>
//               {Object.entries(procurementCategories).map(
//                 ([category, items]) => (
//                   <TabsContent
//                     key={category}
//                     value={category}
//                   >
//                     <ScrollArea className="h-[500px] pr-4">
//                       <div className="space-y-4">
//                         {items
//                           .filter((item) =>
//                             item.name
//                               .toLowerCase()
//                               .includes(searchTerm.toLowerCase())
//                           )
//                           .map((item) => (
//                             <div
//                               key={item.id}
//                               className="flex items-center justify-between p-4 rounded-lg border"
//                             >
//                               <div className="flex items-center gap-4">
//                                 <div>
//                                   <p className="font-semibold">{item.name}</p>
//                                   <div className="flex items-center gap-2 mt-1">
//                                     <Badge
//                                       variant={getStatusColor(item.status)}
//                                     >
//                                       {item.status}
//                                     </Badge>
//                                     {getTrendIcon(item.trend)}
//                                   </div>
//                                 </div>
//                               </div>
//                               <div className="flex items-center gap-4">
//                                 <p className="text-sm text-muted-foreground">
//                                   Current: {item.quantity} {item.unit}
//                                 </p>
//                                 <div className="flex items-center gap-2">
//                                   <Button
//                                     variant="outline"
//                                     size="icon"
//                                     onClick={() =>
//                                       handleQuantityChange(item.id, -1)
//                                     }
//                                   >
//                                     <Minus className="h-4 w-4" />
//                                   </Button>
//                                   <span className="w-12 text-center">
//                                     {quantities[item.id] || 0}
//                                   </span>
//                                   <Button
//                                     variant="outline"
//                                     size="icon"
//                                     onClick={() =>
//                                       handleQuantityChange(item.id, 1)
//                                     }
//                                   >
//                                     <Plus className="h-4 w-4" />
//                                   </Button>
//                                 </div>
//                               </div>
//                             </div>
//                           ))}
//                       </div>
//                     </ScrollArea>
//                   </TabsContent>
//                 )
//               )}
//             </Tabs>
//           </CardContent>
//         </Card>

//         <div className="space-y-6">
//           <Card>
//             <CardHeader>
//               <CardTitle>Summary</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 <div className="flex justify-between items-center">
//                   <span>Total Items</span>
//                   <span className="font-semibold">
//                     {Object.values(quantities).filter((q) => q > 0).length}
//                   </span>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span>Critical Items</span>
//                   <div className="flex items-center gap-2">
//                     <AlertTriangle className="h-4 w-4 text-destructive" />
//                     <span className="font-semibold">3</span>
//                   </div>
//                 </div>
//                 <div className="flex justify-between items-center">
//                   <span>Low Stock Items</span>
//                   <div className="flex items-center gap-2">
//                     <AlertTriangle className="h-4 w-4 text-warning" />
//                     <span className="font-semibold">5</span>
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader>
//               <CardTitle>Quick Actions</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-2">
//                 <Button
//                   className="w-full justify-start"
//                   variant="outline"
//                 >
//                   <CheckCircle2 className="mr-2 h-4 w-4" />
//                   Order All Critical Items
//                 </Button>
//                 <Button
//                   className="w-full justify-start"
//                   variant="outline"
//                 >
//                   <Plus className="mr-2 h-4 w-4" />
//                   Add New Item
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProcurementList;

"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Plus,
  Minus,
  AlertTriangle,
  PackageCheck,
  TrendingUp,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

import { procurementCategories } from "@/constants";

const ProcurementList = () => {
  const [orderQuantities, setOrderQuantities] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("vegetables");

  const getStatusColor = (status) => {
    switch (status) {
      case "critical":
        return "destructive";
      case "low":
        return "warning";
      case "normal":
        return "success";
      default:
        return "secondary";
    }
  };

  const handleQuantityChange = (id, delta) => {
    setOrderQuantities((prev) => ({
      ...prev,
      [id]: Math.max(0, (prev[id] || 0) + delta),
    }));
  };

  const calculateTotalCost = () => {
    let total = 0;
    Object.entries(orderQuantities).forEach(([id, quantity]) => {
      const item = Object.values(procurementCategories)
        .flat()
        .find((item) => item.id === Number.parseInt(id));
      if (item) {
        total += item.price * quantity;
      }
    });
    return total.toFixed(2);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Procurement List</h1>
          <p className="text-muted-foreground">
            Plan your ingredients for tomorrow
          </p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search ingredients..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button>Generate Order</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Ingredients by Category</CardTitle>
              <CardDescription>
                Review and adjust order quantities based on current stock and
                requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs
                defaultValue="vegetables"
                value={selectedCategory}
                onValueChange={setSelectedCategory}
                className="w-full"
              >
                <TabsList className="w-full justify-start mb-4 overflow-auto">
                  {Object.keys(procurementCategories).map((category) => (
                    <TabsTrigger
                      key={category}
                      value={category}
                      className="capitalize"
                    >
                      {category}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {Object.entries(procurementCategories).map(
                  ([category, items]) => (
                    <TabsContent
                      key={category}
                      value={category}
                    >
                      <ScrollArea className="h-[600px] pr-4">
                        <div className="space-y-4">
                          {items
                            .filter((item) =>
                              item.name
                                .toLowerCase()
                                .includes(searchTerm.toLowerCase())
                            )
                            .map((item) => (
                              <Card key={item.id}>
                                <CardContent className="pt-6">
                                  <div className="flex flex-col gap-4">
                                    <div className="flex items-center justify-between">
                                      <div>
                                        <h3 className="font-semibold">
                                          {item.name}
                                        </h3>
                                        <Badge
                                          variant={getStatusColor(item.status)}
                                          className="mt-1"
                                        >
                                          {item.status}
                                        </Badge>
                                      </div>
                                      <div className="text-right">
                                        <p className="text-sm text-muted-foreground">
                                          Unit Price
                                        </p>
                                        <p className="font-semibold">
                                          ${item.price}/{item.unit}
                                        </p>
                                      </div>
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                      <div>
                                        <p className="text-muted-foreground">
                                          Current Stock
                                        </p>
                                        <p className="font-medium">
                                          {item.currentStock} {item.unit}
                                        </p>
                                      </div>
                                      <div>
                                        <p className="text-muted-foreground">
                                          Min Required
                                        </p>
                                        <p className="font-medium">
                                          {item.minRequired} {item.unit}
                                        </p>
                                      </div>
                                      <div>
                                        <p className="text-muted-foreground">
                                          Avg Daily Usage
                                        </p>
                                        <p className="font-medium">
                                          {item.averageDaily} {item.unit}
                                        </p>
                                      </div>
                                      <div>
                                        <p className="text-muted-foreground">
                                          Last Ordered
                                        </p>
                                        <p className="font-medium">
                                          {item.lastOrdered}
                                        </p>
                                      </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-2">
                                      <div className="flex items-center gap-2">
                                        <p className="text-sm font-medium">
                                          Recommended:
                                        </p>
                                        <Badge variant="secondary">
                                          {item.recommendedOrder} {item.unit}
                                        </Badge>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Button
                                          variant="outline"
                                          size="icon"
                                          onClick={() =>
                                            handleQuantityChange(item.id, -1)
                                          }
                                        >
                                          <Minus className="h-4 w-4" />
                                        </Button>
                                        <div className="w-16 text-center font-medium">
                                          {orderQuantities[item.id] || 0}{" "}
                                          {item.unit}
                                        </div>
                                        <Button
                                          variant="outline"
                                          size="icon"
                                          onClick={() =>
                                            handleQuantityChange(item.id, 1)
                                          }
                                        >
                                          <Plus className="h-4 w-4" />
                                        </Button>
                                      </div>
                                    </div>

                                    <Progress
                                      value={
                                        (item.currentStock / item.minRequired) *
                                        100
                                      }
                                      className="h-2"
                                    />
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                        </div>
                      </ScrollArea>
                    </TabsContent>
                  )
                )}
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Total Items</span>
                  <span className="font-semibold">
                    {Object.values(orderQuantities).filter((q) => q > 0).length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Total Cost</span>
                  <span className="font-semibold">${calculateTotalCost()}</span>
                </div>
                <div className="pt-4">
                  <Button className="w-full">Place Order</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Inventory Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                  <span>3 items below critical level</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-warning" />
                  <span>5 items with increasing usage</span>
                </div>
                <div className="flex items-center gap-2">
                  <PackageCheck className="h-4 w-4 text-success" />
                  <span>12 items at optimal level</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProcurementList;

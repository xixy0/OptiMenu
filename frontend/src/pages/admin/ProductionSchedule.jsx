// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // import { ScrollArea } from "@/components/ui/scroll-area";
// // import { Badge } from "@/components/ui/badge";
// // import { Button } from "@/components/ui/button";
// // import { Calendar } from "@/components/ui/calendar";
// // import {
// //   Popover,
// //   PopoverContent,
// //   PopoverTrigger,
// // } from "@/components/ui/popover";
// // import { CalendarIcon, ChefHat, Clock, Users } from "lucide-react";
// // import { format } from "date-fns";
// // import { useState } from "react";

// // import { timeSlots } from "@/constants";
// // import { scheduleData } from "@/constants";

// // const getTypeColor = (type) => {
// //   switch (type) {
// //     case "prep":
// //       return "default";
// //     case "cooking":
// //       return "warning";
// //     case "service":
// //       return "success";
// //     case "cleaning":
// //       return "secondary";
// //     case "admin":
// //       return "info";
// //     default:
// //       return "default";
// //   }
// // };

// // const ProductionSchedule = () => {
// //   const [date, setDate] = useState(new Date());

// //   return (
// //     <div className="container mx-auto px-4 py-8">
// //       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
// //         <div>
// //           <h1 className="text-3xl font-bold">Production Schedule</h1>
// //           <p className="text-muted-foreground">
// //             Daily kitchen operations timeline
// //           </p>
// //         </div>
// //         <div className="flex gap-4 items-center">
// //           <Popover>
// //             <PopoverTrigger asChild>
// //               <Button
// //                 variant="outline"
// //                 className="w-[240px] justify-start text-left font-normal"
// //               >
// //                 <CalendarIcon className="mr-2 h-4 w-4" />
// //                 {format(date, "PPP")}
// //               </Button>
// //             </PopoverTrigger>
// //             <PopoverContent
// //               className="w-auto p-0"
// //               align="end"
// //             >
// //               <Calendar
// //                 mode="single"
// //                 selected={date}
// //                 onSelect={setDate}
// //                 initialFocus
// //               />
// //             </PopoverContent>
// //           </Popover>
// //           <Button>Export Schedule</Button>
// //         </div>
// //       </div>

// //       <div className="grid gap-6 md:grid-cols-4">
// //         <Card className="md:col-span-3">
// //           <CardHeader>
// //             <CardTitle>Timeline</CardTitle>
// //           </CardHeader>
// //           <CardContent>
// //             <ScrollArea className="h-[700px] pr-4">
// //               <div className="space-y-6">
// //                 {timeSlots.map((time) => (
// //                   <div
// //                     key={time}
// //                     className="relative"
// //                   >
// //                     <div className="flex items-center gap-4">
// //                       <div className="w-16 text-sm font-medium">{time}</div>
// //                       <div className="flex-1">
// //                         {scheduleData[time] ? (
// //                           <div className="space-y-2">
// //                             {scheduleData[time].map((task) => (
// //                               <div
// //                                 key={task.id}
// //                                 className="rounded-lg border p-4 transition-colors hover:bg-muted/50"
// //                               >
// //                                 <div className="flex items-center justify-between mb-2">
// //                                   <div className="font-semibold">
// //                                     {task.task}
// //                                   </div>
// //                                   <Badge variant={getTypeColor(task.type)}>
// //                                     {task.type}
// //                                   </Badge>
// //                                 </div>
// //                                 <div className="flex items-center gap-4 text-sm text-muted-foreground">
// //                                   <div className="flex items-center gap-1">
// //                                     <Users className="h-4 w-4" />
// //                                     {task.assignee}
// //                                   </div>
// //                                   <div className="flex items-center gap-1">
// //                                     <Clock className="h-4 w-4" />
// //                                     {task.duration} min
// //                                   </div>
// //                                 </div>
// //                               </div>
// //                             ))}
// //                           </div>
// //                         ) : (
// //                           <div className="h-2 rounded-full bg-muted" />
// //                         )}
// //                       </div>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             </ScrollArea>
// //           </CardContent>
// //         </Card>

// //         <div className="space-y-6">
// //           <Card>
// //             <CardHeader>
// //               <CardTitle>Daily Overview</CardTitle>
// //             </CardHeader>
// //             <CardContent>
// //               <div className="space-y-4">
// //                 <div className="flex items-center justify-between">
// //                   <div className="flex items-center gap-2">
// //                     <ChefHat className="h-4 w-4" />
// //                     <span>Staff on duty</span>
// //                   </div>
// //                   <span className="font-semibold">8</span>
// //                 </div>
// //                 <div className="flex items-center justify-between">
// //                   <div className="flex items-center gap-2">
// //                     <Clock className="h-4 w-4" />
// //                     <span>Total tasks</span>
// //                   </div>
// //                   <span className="font-semibold">12</span>
// //                 </div>
// //                 <div className="space-y-2">
// //                   <div className="text-sm font-medium">Task Distribution</div>
// //                   <div className="grid grid-cols-2 gap-2 text-sm">
// //                     <div>Prep</div>
// //                     <div className="text-right">4</div>
// //                     <div>Service</div>
// //                     <div className="text-right">2</div>
// //                     <div>Cooking</div>
// //                     <div className="text-right">3</div>
// //                     <div>Cleaning</div>
// //                     <div className="text-right">2</div>
// //                     <div>Admin</div>
// //                     <div className="text-right">1</div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </CardContent>
// //           </Card>

// //           <Card>
// //             <CardHeader>
// //               <CardTitle>Quick Actions</CardTitle>
// //             </CardHeader>
// //             <CardContent>
// //               <div className="space-y-2">
// //                 <Button
// //                   className="w-full"
// //                   variant="outline"
// //                 >
// //                   Add New Task
// //                 </Button>
// //                 <Button
// //                   className="w-full"
// //                   variant="outline"
// //                 >
// //                   Manage Staff
// //                 </Button>
// //               </div>
// //             </CardContent>
// //           </Card>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProductionSchedule;

// "use client";

// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from "@/components/ui/card";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { CalendarIcon, Clock, UtensilsCrossed } from "lucide-react";
// import { format } from "date-fns";
// import { useState } from "react";

// const timeSlots = [
//   "8:00",
//   "9:00",
//   "10:00",
//   "11:00",
//   "12:00",
//   "13:00",
//   "14:00",
//   "15:00",
//   "16:00",
//   "17:00",
//   "18:00",
//   "19:00",
//   "20:00",
//   "21:00",
//   "22:00",
// ];

// // Dummy production schedule data
// const productionSchedule = {
//   "8:00": [
//     {
//       item: "Tomato Sauce",
//       quantity: 5,
//       unit: "L",
//       estimatedTime: 45,
//       priority: "high",
//     },
//     {
//       item: "Chopped Vegetables",
//       quantity: 10,
//       unit: "kg",
//       estimatedTime: 30,
//       priority: "medium",
//     },
//   ],
//   "9:00": [
//     {
//       item: "Marinated Chicken",
//       quantity: 15,
//       unit: "kg",
//       estimatedTime: 60,
//       priority: "high",
//     },
//     {
//       item: "Pizza Dough",
//       quantity: 50,
//       unit: "pieces",
//       estimatedTime: 90,
//       priority: "high",
//     },
//   ],
//   "11:00": [
//     {
//       item: "Pasta",
//       quantity: 8,
//       unit: "kg",
//       estimatedTime: 30,
//       priority: "medium",
//     },
//     {
//       item: "Soup Stock",
//       quantity: 20,
//       unit: "L",
//       estimatedTime: 120,
//       priority: "low",
//     },
//   ],
//   "14:00": [
//     {
//       item: "Dessert Prep",
//       quantity: 30,
//       unit: "portions",
//       estimatedTime: 90,
//       priority: "medium",
//     },
//   ],
//   "16:00": [
//     {
//       item: "Evening Sauce Prep",
//       quantity: 8,
//       unit: "L",
//       estimatedTime: 60,
//       priority: "high",
//     },
//     {
//       item: "Dinner Specials",
//       quantity: 25,
//       unit: "portions",
//       estimatedTime: 120,
//       priority: "high",
//     },
//   ],
// };

// const getPriorityColor = (priority) => {
//   switch (priority) {
//     case "high":
//       return "destructive";
//     case "medium":
//       return "warning";
//     case "low":
//       return "secondary";
//     default:
//       return "default";
//   }
// };

// export default function ProductionSchedule() {
//   const [date, setDate] = useState(new Date());

//   const getTotalProductionTime = (items) => {
//     return items.reduce((total, item) => total + item.estimatedTime, 0);
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
//         <div>
//           <h1 className="text-3xl font-bold">Production Schedule</h1>
//           <p className="text-muted-foreground">Daily preparation timeline</p>
//         </div>
//         <div className="flex gap-4 items-center">
//           <Popover>
//             <PopoverTrigger asChild>
//               <Button
//                 variant="outline"
//                 className="w-[240px] justify-start text-left font-normal"
//               >
//                 <CalendarIcon className="mr-2 h-4 w-4" />
//                 {format(date, "PPP")}
//               </Button>
//             </PopoverTrigger>
//             <PopoverContent
//               className="w-auto p-0"
//               align="end"
//             >
//               <Calendar
//                 mode="single"
//                 selected={date}
//                 onSelect={setDate}
//                 initialFocus
//               />
//             </PopoverContent>
//           </Popover>
//           <Button>Export Schedule</Button>
//         </div>
//       </div>

//       <div className="grid gap-6 md:grid-cols-4">
//         <Card className="md:col-span-3">
//           <CardHeader>
//             <CardTitle>Production Timeline</CardTitle>
//             <CardDescription>
//               Scheduled items to prepare with quantities and estimated
//               preparation times
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <ScrollArea className="h-[700px] pr-4">
//               <div className="space-y-6">
//                 {timeSlots.map((time) => (
//                   <div
//                     key={time}
//                     className="relative"
//                   >
//                     <div className="flex items-start gap-4">
//                       <div className="w-16 text-sm font-medium pt-4">
//                         {time}
//                       </div>
//                       <div className="flex-1">
//                         {productionSchedule[time] ? (
//                           <Card>
//                             <CardContent className="pt-6">
//                               <div className="space-y-4">
//                                 {productionSchedule[time].map((item, index) => (
//                                   <div
//                                     key={index}
//                                     className="flex flex-col gap-2 pb-4 last:pb-0"
//                                   >
//                                     <div className="flex items-center justify-between">
//                                       <div>
//                                         <h4 className="font-semibold">
//                                           {item.item}
//                                         </h4>
//                                         <div className="flex items-center gap-2 mt-1">
//                                           <Badge
//                                             variant={getPriorityColor(
//                                               item.priority
//                                             )}
//                                           >
//                                             {item.priority}
//                                           </Badge>
//                                           <span className="text-sm text-muted-foreground">
//                                             {item.quantity} {item.unit}
//                                           </span>
//                                         </div>
//                                       </div>
//                                       <div className="flex items-center gap-2">
//                                         <Clock className="h-4 w-4 text-muted-foreground" />
//                                         <span className="text-sm">
//                                           {item.estimatedTime} min
//                                         </span>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 ))}
//                               </div>
//                             </CardContent>
//                           </Card>
//                         ) : (
//                           <div className="h-2 rounded-full bg-muted" />
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </ScrollArea>
//           </CardContent>
//         </Card>

//         <div className="space-y-6">
//           <Card>
//             <CardHeader>
//               <CardTitle>Production Summary</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-2">
//                     <UtensilsCrossed className="h-4 w-4" />
//                     <span>Total Items</span>
//                   </div>
//                   <span className="font-semibold">
//                     {Object.values(productionSchedule).flat().length}
//                   </span>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center gap-2">
//                     <Clock className="h-4 w-4" />
//                     <span>Total Prep Time</span>
//                   </div>
//                   <span className="font-semibold">
//                     {Object.values(productionSchedule).reduce(
//                       (total, items) => total + getTotalProductionTime(items),
//                       0
//                     )}{" "}
//                     min
//                   </span>
//                 </div>
//                 <div className="pt-4 space-y-2">
//                   <div className="text-sm font-medium">
//                     Priority Distribution
//                   </div>
//                   <div className="grid grid-cols-2 gap-2 text-sm">
//                     <div className="flex items-center gap-2">
//                       <Badge variant="destructive">High</Badge>
//                       <span>4 items</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <Badge variant="warning">Medium</Badge>
//                       <span>3 items</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <Badge variant="secondary">Low</Badge>
//                       <span>1 item</span>
//                     </div>
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
//                   className="w-full"
//                   variant="outline"
//                 >
//                   Add Production Item
//                 </Button>
//                 <Button
//                   className="w-full"
//                   variant="outline"
//                 >
//                   Adjust Timeline
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Clock, UtensilsCrossed } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";

import { timeSlots } from "@/constants";
import { scheduleData } from "@/constants";
import CollapsibleSchedule from "@/components/admin/CollapsibleSchedule";

const getPriorityColor = (priority) => {
  switch (priority) {
    case "high":
      return "destructive";
    case "medium":
      return "warning";
    case "low":
      return "secondary";
    default:
      return "default";
  }
};

const ProductionSchedule = () => {
  const [date, setDate] = useState(new Date());

  const getTotalProductionTime = (items) => {
    return items.reduce((total, item) => total + item.estimatedTime, 0);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Production Schedule</h1>
          <p className="text-muted-foreground">Daily preparation timeline</p>
        </div>
        <div className="flex gap-4 items-center">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-[240px] justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {format(date, "PPP")}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto p-0"
              align="end"
            >
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Button>Export Schedule</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Production Timeline</CardTitle>
            <CardDescription>
              Scheduled items to prepare with quantities and estimated
              preparation times
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[700px] pr-4">
              <div className="space-y-6">
                <CollapsibleSchedule />
                {/* {timeSlots.map((time) => (
                  <div
                    key={time}
                    className="relative"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-16 text-sm font-medium pt-4">
                        {time}
                      </div>
                      <div className="flex-1">
                        {scheduleData[time] ? (
                          <Card>
                            <CardContent className="pt-6">
                              <div className="space-y-4">
                                {scheduleData[time].map((item, index) => (
                                  <div
                                    key={index}
                                    className="flex flex-col gap-2 pb-4 last:pb-0"
                                  >
                                    <div className="flex items-center justify-between">
                                      <div>
                                        <h4 className="font-semibold">
                                          {item.item}
                                        </h4>
                                        <div className="flex items-center gap-2 mt-1">
                                          <Badge
                                            variant={getPriorityColor(
                                              item.priority
                                            )}
                                          >
                                            {item.priority}
                                          </Badge>
                                          <span className="text-sm text-muted-foreground">
                                            {item.quantity} {item.unit}
                                          </span>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm">
                                          {item.estimatedTime} min
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        ) : (
                          <div className="h-2 rounded-full bg-muted" />
                        )}
                      </div>
                    </div>
                  </div>
                ))} */}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Production Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <UtensilsCrossed className="h-4 w-4" />
                    <span>Total Items</span>
                  </div>
                  <span className="font-semibold">
                    {Object.values(scheduleData).flat().length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Total Prep Time</span>
                  </div>
                  <span className="font-semibold">
                    {Object.values(scheduleData).reduce(
                      (total, items) => total + getTotalProductionTime(items),
                      0
                    )}{" "}
                    min
                  </span>
                </div>
                <div className="pt-4 space-y-2">
                  <div className="text-sm font-medium">
                    Priority Distribution
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Badge variant="destructive">High</Badge>
                      <span>4 items</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="warning">Medium</Badge>
                      <span>3 items</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">Low</Badge>
                      <span>1 item</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button
                  className="w-full"
                  variant="outline"
                >
                  Add Production Item
                </Button>
                <Button
                  className="w-full"
                  variant="outline"
                >
                  Adjust Timeline
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductionSchedule;

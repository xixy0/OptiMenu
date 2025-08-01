// import { ArrowDownRight, TrendingUp } from "lucide-react";
// import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
// import { useQuery } from "@tanstack/react-query";
// import { getAverageOrderValue } from "@/api";

// const AverageOrderValue = () => {
//   //   const { data: AverageOrderValue ,isLoading, isError} = useQuery({
//   //     queryKey: ["avg-order-value"],
//   //     queryFn: getAverageOrderValue,
//   //     staleTime: 4000,
//   //     refetchInterval: 5000,
//   //   });

//   const AverageOrderValue = [
//     {
//       value: "24.50",
//     },
//   ];

//   //   if (isLoading) {
//   //     return <div>Loading...</div>;
//   //   }

//   //   if (isError || !Array.isArray(AverageOrderValue) || AverageOrderValue.length === 0) {
//   //     return <div>Error: Unable to fetch revenue data</div>;
//   //   }

//   return (
//     <Card x-chunk="dashboard-01-chunk-2">
//       <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//         <CardTitle className="text-sm font-medium">AverageOrderValue</CardTitle>
//         {/* <TrendingUp className="h-8 w-8 text-muted-foreground" /> */}
//         <div className="rounded-full bg-primary/10 p-3 text-primary">
//           <TrendingUp className="h-8 w-8" />
//         </div>
//       </CardHeader>
//       <CardContent>
//         {/* <div className="text-2xl font-bold">+12,234</div> */}
//         <div className="text-2xl font-bold">₹{AverageOrderValue[0].value}</div>
//         {/* <p className="text-xs text-muted-foreground">-2.1% from last month</p> */}
//         <div className="mt-4 flex items-center gap-2 text-sm">
//           <div className="flex items-center gap-1 text-rose-500">
//             <ArrowDownRight className="h-4 w-4" />
//             <span>2.1%</span>
//           </div>
//           <span className="text-muted-foreground">from last month</span>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };
// export default AverageOrderValue;

import { ArrowDownRight, TrendingUp } from "lucide-react";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useQuery } from "@tanstack/react-query";
import { getAverageOrderValue } from "@/api";

const AverageOrderValue = () => {
  const {
    data: averageOrderData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["avg-order-value"],
    queryFn: getAverageOrderValue,
    staleTime: 4000,
    refetchInterval: 5000,
  });
  if (isLoading) {
    return (
      <Card x-chunk="dashboard-01-chunk-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-5 w-24 mt-4" />
        </CardContent>
      </Card>
    );
  }

  if (
    isError ||
    !Array.isArray(averageOrderData) ||
    averageOrderData.length === 0
  ) {
    return (
      <Card x-chunk="dashboard-01-chunk-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Average Order Value
          </CardTitle>
          <div className="rounded-full bg-primary/10 p-3 text-primary">
            <TrendingUp className="h-8 w-8" />
          </div>
        </CardHeader>
        <CardContent>
          <Alert
            variant="destructive"
            className="rounded-md"
          >
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Unable to fetch average order value. Please try again later.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }
  var averageOrder = Math.round(averageOrderData[0].value);
  return (
    <Card x-chunk="dashboard-01-chunk-2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Average Order Value
        </CardTitle>
        <div className="rounded-full bg-primary/10 p-3 text-primary">
          <TrendingUp className="h-8 w-8" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">${averageOrder}</div>
        <div className="mt-4 flex items-center gap-2 text-sm">
          <div className="flex items-center gap-1 text-rose-500">
            <ArrowDownRight className="h-4 w-4" />
            <span>2.1%</span>
          </div>
          <span className="text-muted-foreground">from last month</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default AverageOrderValue;

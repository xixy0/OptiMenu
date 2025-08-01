// import { ArrowUpRight, CreditCard } from "lucide-react";
// import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
// import { useQuery } from "@tanstack/react-query";
// import { getSales } from "@/api";

// const Sales = () => {
//   // const { data: Sales ,isLoading, isError} = useQuery({
//   //   queryKey: ["sales"],
//   //   queryFn: getSales,
//   //   staleTime: 4000,
//   //   refetchInterval: 5000,
//   // });

//   const Sales = [
//     {
//       sales: "12,234",
//     },
//   ];

//   // if (isLoading) {
//   //   return <div>Loading...</div>;
//   // }

//   // if (isError || !Array.isArray(Sales) || Sales.length === 0) {
//   //   return <div>Error: Unable to fetch revenue data</div>;
//   // }

//   return (
//     <Card x-chunk="dashboard-01-chunk-2">
//       <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//         <CardTitle className="text-sm font-medium">Sales</CardTitle>
//         {/* <CreditCard className="h-8 w-8 text-muted-foreground" /> */}
//         <div className="rounded-full bg-primary/10 p-3 text-primary">
//           <CreditCard className="h-8 w-8" />
//         </div>
//       </CardHeader>
//       <CardContent>
//         {/* <div className="text-2xl font-bold">+12,234</div> */}
//         <div className="text-2xl font-bold">+{Sales[0].sales}</div>
//         {/* <p className="text-xs text-muted-foreground">+19% from last month</p> */}
//         <div className="mt-4 flex items-center gap-2 text-sm">
//           <div className="flex items-center gap-1 text-emerald-500">
//             <ArrowUpRight className="h-4 w-4" />
//             <span>19%</span>
//           </div>
//           <span className="text-muted-foreground">from last month</span>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };
// export default Sales;

import { ArrowUpRight, CreditCard } from "lucide-react";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useQuery } from "@tanstack/react-query";
import { getSales } from "@/api";

const Sales = () => {
  const {
    data: salesData,
    isPending: isLoading,
    isError,
  } = useQuery({
    queryKey: ["sales"],
    queryFn: getSales,
    staleTime: 4000,
    refetchInterval: 5000,
  });

  if (isLoading) {
    return (
      <Card x-chunk="dashboard-01-chunk-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-8 w-32" />
          <Skeleton className="h-5 w-24 mt-4" />
        </CardContent>
      </Card>
    );
  }

  if (isError || !Array.isArray(salesData) || salesData.length === 0) {
    return (
      <Card x-chunk="dashboard-01-chunk-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Sales</CardTitle>
          <div className="rounded-full bg-primary/10 p-3 text-primary">
            <CreditCard className="h-8 w-8" />
          </div>
        </CardHeader>
        <CardContent>
          <Alert
            variant="destructive"
            className="rounded-md"
          >
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Unable to fetch sales data. Please try again later.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card x-chunk="dashboard-01-chunk-2">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Sales</CardTitle>
        <div className="rounded-full bg-primary/10 p-3 text-primary">
          <CreditCard className="h-8 w-8" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">+{salesData[0].sales}</div>
        <div className="mt-4 flex items-center gap-2 text-sm">
          <div className="flex items-center gap-1 text-emerald-500">
            <ArrowUpRight className="h-4 w-4" />
            <span>19%</span>
          </div>
          <span className="text-muted-foreground">from last month</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default Sales;

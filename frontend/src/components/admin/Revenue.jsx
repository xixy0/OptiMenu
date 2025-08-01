// import { IndianRupee, ArrowUpRight } from "lucide-react";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { useQuery } from "@tanstack/react-query";
// import { getRevenue } from "@/api";

// const Revenue = () => {
//   // const { data: revenueData, isLoading, isError } = useQuery({
//   //   queryKey: ["revenue"],
//   //   queryFn: getRevenue,
//   //   staleTime: 4000,
//   //   refetchInterval: 5000,
//   // });

// const revenueData = [
//   {
//     revenue: "12,234",
//   },
// ];

//   // if (isLoading) {
//   //   return <div>Loading...</div>;
//   // }

//   // if (isError || !Array.isArray(revenueData) || revenueData.length === 0) {
//   //   return <div>Error: Unable to fetch revenue data</div>;
//   // }

//   return (
//     <Card x-chunk="dashboard-01-chunk-0 shadow-lg">
//       <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//         <CardTitle className="text-sm font-bold">Total Revenue</CardTitle>
//         {/* <IndianRupee className="h-8 w-8 text-muted-foreground" /> */}
//         <div className="rounded-full bg-primary/10 p-3 text-primary">
//           <IndianRupee className="h-8 w-8" />
//         </div>
//       </CardHeader>
//       <CardContent>
//         <div className="text-2xl font-bold">₹{revenueData[0].revenue}</div>
//         {/* <p className="text-xs text-muted-foreground">+20.1% from last month</p> */}
//         <div className="mt-4 flex items-center gap-2 text-sm">
//           <div className="flex items-center gap-1 text-emerald-500">
//             <ArrowUpRight className="h-4 w-4" />
//             <span>20.1%</span>
//           </div>
//           <span className="text-muted-foreground">from last month</span>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default Revenue;

import { IndianRupee, ArrowUpRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useQuery } from "@tanstack/react-query";
import { getRevenue } from "@/api";

const Revenue = () => {
  const {
    data: revenueData,
    isPending: isLoading,
    isError,
  } = useQuery({
    queryKey: ["revenue"],
    queryFn: getRevenue,
    staleTime: 4000,
    refetchInterval: 5000,
  });

  // const revenueData = [
  //   {
  //     revenue: "12,234",
  //   },
  // ];

  if (isLoading) {
    return (
      <Card className="shadow-lg">
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

  if (isError || !Array.isArray(revenueData) || revenueData.length === 0) {
    return (
      <Card className="shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-bold">Total Revenue</CardTitle>
          <div className="rounded-full bg-primary/10 p-3 text-primary">
            <IndianRupee className="h-8 w-8" />
          </div>
        </CardHeader>
        <CardContent>
          <Alert
            variant="destructive"
            className="rounded-md"
          >
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Unable to fetch revenue data. Please try again later.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-bold">Total Revenue</CardTitle>
        <div className="rounded-full bg-primary/10 p-3 text-primary">
          <IndianRupee className="h-8 w-8" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">${revenueData[0].revenue}</div>
        <div className="mt-4 flex items-center gap-2 text-sm">
          <div className="flex items-center gap-1 text-emerald-500">
            <ArrowUpRight className="h-4 w-4" />
            <span>20.1%</span>
          </div>
          <span className="text-muted-foreground">from last month</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default Revenue;

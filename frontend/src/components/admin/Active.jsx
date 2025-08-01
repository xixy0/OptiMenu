// import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
// import { ArrowUpRight, Utensils } from "lucide-react";

// const Active = () => {
//   return (
//     <Card x-chunk="dashboard-01-chunk-3">
//       <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//         <CardTitle className="text-sm font-medium">Active Now</CardTitle>
//         {/* <Utensils className="h-8 w-8 text-muted-foreground" /> */}
//         <div className="rounded-full bg-primary/10 p-3 text-primary">
//           <Utensils className="h-8 w-8" />
//         </div>
//       </CardHeader>
//       <CardContent>
//         <div className="text-2xl font-bold">+34</div>
//         {/* <p className="text-xs text-muted-foreground">+8 since last hour</p> */}
//         <div className="mt-4 flex items-center gap-2 text-sm">
//           <div className="flex items-center gap-1 text-emerald-500">
//             <ArrowUpRight className="h-4 w-4" />
//             <span>12%</span>
//           </div>
//           <span className="text-muted-foreground">since last hour</span>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };
// export default Active;

import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";
import { ArrowUpRight, Utensils } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useQuery } from "@tanstack/react-query";
//import { getActiveUsers } from "@/api";
import { getWeeklyRevenueStats } from "@/api";

const Active = () => {
  const {
    //data: activeUsersData,
    data : weeklyStats,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["weeklystats"],
    queryFn: getWeeklyRevenueStats, // Replace with actual API function
    staleTime: 4000,
    refetchInterval: 5000,
  });

  if (isLoading) {
    return (
      <Card x-chunk="dashboard-01-chunk-3">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-5 w-24 mt-4" />
        </CardContent>
      </Card>
    );
  }

  if (isError || !weeklyStats) {
    return (
      <Card x-chunk="dashboard-01-chunk-3">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Now</CardTitle>
          <div className="rounded-full bg-primary/10 p-3 text-primary">
            <Utensils className="h-8 w-8" />
          </div>
        </CardHeader>
        <CardContent>
          <Alert
            variant="destructive"
            className="rounded-md"
          >
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Unable to fetch active user data. Please try again later.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card x-chunk="dashboard-01-chunk-3">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">This Week</CardTitle>
        <div className="rounded-full bg-primary/10 p-3 text-primary">
          <Utensils className="h-8 w-8" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">${weeklyStats.currentWeek}</div>
        <div className="mt-4 flex items-center gap-2 text-sm">
          <div className="flex items-center gap-1 text-emerald-500">
            <ArrowUpRight className="h-4 w-4" />
            <span>{(weeklyStats.percentageChange*100).toFixed(2)}%</span>
          </div>
          <span className="text-muted-foreground">since last week</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default Active;

import Revenue from "@/components/admin/Revenue";
import Sales from "@/components/admin/Sales";
import ChartsComponent from "@/components/admin/ChartsComponent";
import DemandCard from "@/components/admin/DemandCard";
import Active from "@/components/admin/Active";
import Customers from "@/components/admin/Customers";
import AverageOrderValue from "@/components/admin/AverageOrderValue";

const AdminDashboard = () => {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Revenue />
        <Sales />
        {/* <Customers /> */}
        <AverageOrderValue />
        <Active />
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3 auto-rows-max">
        {/* <CurrentDayChart /> */}
        <ChartsComponent />
        <div className="rounded p-4">
          {/* <Transactions /> */}
          <DemandCard />
        </div>

        {/* <Card x-chunk="dashboard-01-chunk-5">
          <CardHeader>
            <CardTitle>Current Table Status</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-8">
            <div className="flex items-center gap-4">
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarImage
                  src="/avatars/01.png"
                  alt="Avatar"
                />
                <AvatarFallback>T1</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Table 1</p>
              </div>
              <div className="ml-auto font-medium text-green-500">Free</div>
            </div>
            <div className="flex items-center gap-4">
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarImage
                  src="/avatars/02.png"
                  alt="Avatar"
                />
                <AvatarFallback>T2</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Table 2</p>
              </div>
              <div className="ml-auto font-medium text-destructive">Busy</div>
            </div>
            <div className="flex items-center gap-4">
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarImage
                  src="/avatars/03.png"
                  alt="Avatar"
                />
                <AvatarFallback>T3</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Table 3</p>
              </div>
              <div className="ml-auto font-medium text-destructive">Busy</div>
            </div>
            <div className="flex items-center gap-4">
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarImage
                  src="/avatars/04.png"
                  alt="Avatar"
                />
                <AvatarFallback>T4</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Table 4</p>
              </div>
              <div className="ml-auto font-medium text-destructive">Busy</div>
            </div>
            <div className="flex items-center gap-4">
              <Avatar className="hidden h-9 w-9 sm:flex">
                <AvatarImage
                  src="/avatars/05.png"
                  alt="Avatar"
                />
                <AvatarFallback>T5</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Table 5</p>
              </div>
              <div className="ml-auto font-medium text-green-500">Free</div>
            </div>
          </CardContent>
        </Card> */}
      </div>
    </main>
  );
};

export default AdminDashboard;

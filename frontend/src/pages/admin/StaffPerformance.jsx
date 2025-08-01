import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import CookPerformance from "@/components/admin/CookPerformance";
import StewardPerformance from "@/components/admin/StewardPerformance";
import WaiterPerformance from "@/components/admin/WaiterPerformance";

const StaffPerformance = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Staff Performance Analysis</h1>
      <Tabs defaultValue="cook">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="steward">Stewards</TabsTrigger>
          <TabsTrigger value="cook">Cooks</TabsTrigger>
          <TabsTrigger value="waiter">Waiters</TabsTrigger>
        </TabsList>

        <TabsContent value="steward">
          <StewardPerformance />
        </TabsContent>
        <TabsContent value="cook">
          <CookPerformance />
        </TabsContent>
        <TabsContent value="waiter">
          <WaiterPerformance />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StaffPerformance;

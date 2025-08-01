// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// import AdminLogin from "@/components/auth/AdminLogin";
// import StaffLogin from "@/components/auth/StaffLogin";

// const LoginPage = () => {
//   return (
//     <div className="min-h-screen relative flex items-center justify-center p-4">
//       <Tabs
//         defaultValue="Admin"
//         className="w-[400px] "
//       >
//         <TabsList className="grid w-full grid-cols-2">
//           <TabsTrigger
//             value="Admin"
//             className="w-full"
//           >
//             Admin
//           </TabsTrigger>
//           <TabsTrigger
//             value="Staff"
//             className="w-full"
//           >
//             Staff
//           </TabsTrigger>
//         </TabsList>
//         <TabsContent value="Admin">
//           <AdminLogin />
//         </TabsContent>
//         <TabsContent value="Staff">
//           <StaffLogin />
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// };

// export default LoginPage;

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import AdminLogin from "@/components/auth/AdminLogin";
import StaffLogin from "@/components/auth/StaffLogin";
import { LockIcon, UserIcon } from "lucide-react";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-blue-100 to-white">
      <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl">
        <Card className="w-full shadow-lg overflow-hidden">
          <CardContent className="p-6 sm:p-8">
            <div>
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                  Welcome Back
                </h1>
                <p className="text-sm text-gray-600">
                  Please sign in to continue
                </p>
              </div>
              <Tabs
                defaultValue="Admin"
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger
                    value="Admin"
                    className="flex gap-2"
                  >
                    <LockIcon className="w-4 h-4" />
                    Admin
                  </TabsTrigger>
                  <TabsTrigger
                    value="Staff"
                    className="flex gap-2"
                  >
                    <UserIcon className="w-4 h-4" />
                    Staff
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="Admin">
                  <AdminLogin />
                </TabsContent>
                <TabsContent value="Staff">
                  <StaffLogin />
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
        </Card>
      </div>
      <footer className="mt-8 text-center text-sm text-gray-600">
        &copy; {new Date().getFullYear()} OptiMenu. All rights reserved.
      </footer>
    </div>
  );
};

export default LoginPage;

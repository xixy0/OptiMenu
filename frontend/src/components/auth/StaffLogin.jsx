// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import StaffLoginForm from "./StaffLoginForm";

// const StaffLogin = () => {
//   return (
//     <div className="relative w-full max-w-md ">
//       <div className="absolute inset-0 bg-white/50 backdrop-blur-xl rounded-2xl transform -rotate-2 " />
//       <div className="absolute inset-0 bg-white/50 backdrop-blur-xl rounded-2xl transform rotate-2 " />
//       <Card className="relative w-full shadow-xl backdrop-blur-sm bg-white/80">
//         <CardHeader className="space-y-1">
//           <CardTitle className="text-2xl font-bold text-center">
//             Staff Login
//           </CardTitle>
//           <p className="text-center text-sm text-muted-foreground">
//             Enter your credentials
//           </p>
//         </CardHeader>
//         <CardContent>
//           <StaffLoginForm />
//         </CardContent>
//       </Card>
//     </div>
//   );
// };
// export default StaffLogin;

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
// import * as z from "zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const roles = [
  {
    value: "manager",
    label: "Manager",
    description: "Can manage all aspects of the restaurant except user roles",
  },
  {
    value: "waiter",
    label: "Waiter",
    description: "Can view and manage orders",
  },
  {
    value: "chef",
    label: "Chef",
    description: "Can view and update order status in the kitchen",
  },
  {
    value: "steward",
    label: "Steward",
    description: "Can view and manage tables, verify or cancel orders",
  },
  {
    value: "accountant",
    label: "Accountant",
    description: "Can view and manage financial records",
  },
];

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  // role: z.enum(
  //   ["manager", "waiter", "chef", "steward", "accountant"],
  //   "Invalid role selected"
  // ),
});

const StaffLogin = () => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      // role: "",
    },
  });

  function onSubmit(values) {
    console.log("Credentials: ", values);
    // Handle form submission
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="staff@example.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...field}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOffIcon className="h-4 w-4 text-gray-500" />
                    ) : (
                      <EyeIcon className="h-4 w-4 text-gray-500" />
                    )}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem
                        key={role.value}
                        value={role.value}
                      >
                        <div className="flex flex-col">
                          <span className="font-medium">{role.label}</span>
                          <span className="text-xs text-gray-500">
                            {role.description}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        /> */}
        <Button
          type="submit"
          className="w-full"
        >
          Sign In as Staff
        </Button>
      </form>
    </Form>
  );
};

export default StaffLogin;

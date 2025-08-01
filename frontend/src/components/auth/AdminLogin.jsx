// import AdminLoginForm from "@/components/auth/AdminLoginForm";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// const AdminLogin = () => {
//   return (
//     <div className="relative w-full max-w-md ">
//       <div className="absolute inset-0 bg-white/50 backdrop-blur-xl rounded-2xl transform -rotate-2 " />
//       <div className="absolute inset-0 bg-white/50 backdrop-blur-xl rounded-2xl transform rotate-2 " />
//       <Card className="relative w-full shadow-xl backdrop-blur-sm bg-white/80">
//         <CardHeader className="space-y-1">
//           <CardTitle className="text-2xl font-bold text-center">
//             Admin Login
//           </CardTitle>
//           <p className="text-center text-sm text-muted-foreground">
//             Enter your credentials to access the dashboard
//           </p>
//         </CardHeader>
//         <CardContent>
//           <AdminLoginForm />
//         </CardContent>
//       </Card>
//     </div>
//   );
// };
// export default AdminLogin;

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import axios from "axios";
import useAuth from "@/stores/useAuth";
import { useNavigate } from "react-router";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth((state) => state.login);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    console.log(values);
    // Handle form submission
    console.log(values);
    try {
      const response = await axios.post(
        "http://localhost:5000/admin/login",
        values
      ); // Replace with your API endpoint
      if (response.status === 200) {
        console.log("successful");
        console.log(response.data);

        // const username = response.data.username;
        // login(username); // Update the zustand auth store with the username

       // navigate(`/${response.data.username}/dashboard`);
        navigate(`/dashboard`);  // Redirect to the dashboard or another page
      }
    } catch (error) {
      console.error(
        "Error creating account:",
        error.response?.data || error.message
      );
    }
  };

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
                  placeholder="admin@example.com"
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
        <Button
          type="submit"
          className="w-full"
        >
          Sign In as Admin
        </Button>
      </form>
    </Form>
  );
};

export default AdminLogin;

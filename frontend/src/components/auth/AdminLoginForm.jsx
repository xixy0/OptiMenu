import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Mail, Lock } from "lucide-react";
import useAuth from "@/stores/useAuth";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const AdminLoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth((state) => state.login);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
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

        navigate(`/${response.data.username}/dashboard`); // Redirect to the dashboard or another page
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
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      placeholder="admin@example.com"
                      {...field}
                      type="email"
                      className="h-11 pl-10"
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      placeholder="Enter your password"
                      type="password"
                      className="h-11 pl-10"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center justify-end">
          <a
            href="#"
            className="text-sm font-medium text-primary hover:underline"
          >
            Forgot password?
          </a>
        </div>

        <Button
          type="submit"
          className="w-full h-11 text-base font-semibold"
        >
          Sign In
        </Button>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a
            href="/sign-up"
            className="text-primary font-medium hover:underline"
          >
            Sign up
          </a>
        </p>
      </form>
    </Form>
  );
};

export default AdminLoginForm;

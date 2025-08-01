import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EyeIcon, EyeOffIcon, Plus, Trash2 } from "lucide-react";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
} from "@/components/ui/form";

import useOnboarding from "@/stores/useOnboarding";
import { generatePassword } from "@/lib/utils";

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

// Define schema using zod
const userSchema = z.object({
  users: z.array(
    z.object({
      name: z.string().min(2, "Name must be at least 2 characters long"),
      email: z.string().email("Invalid email address"),
      password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" }),
      role: z.enum(
        ["manager", "waiter", "chef", "steward", "accountant"],
        "Invalid role selected"
      ),
    })
  ),
});

export default function UserInitialization() {
  const [showPassword, setShowPassword] = useState(false);

  const prevStep = useOnboarding((state) => state.prevStep);
  const nextStep = useOnboarding((state) => state.nextStep);

  const storedUsers = useOnboarding((state) => state.users);
  const addUsers = useOnboarding((state) => state.addUsers);

  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      // users: [{ name: "", email: "", role: "manager" }],
      users: storedUsers?.length
        ? storedUsers
        : [{ name: "", email: "", password: "", role: "manager" }],
    },
  });

  const { control, handleSubmit, setValue } = form;

  const {
    fields: users,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "users",
  });

  const addUser = () => {
    append({ name: "", email: "", password: "", role: "manager" });
  };

  const onSubmit = (data) => {
    // Extract name, email, and role
    const transformedData = data.users.map(
      ({ name, email, password, role }) => ({
        name,
        email,
        password,
        role,
      })
    );
    console.log("Transformed Data:", transformedData);

    // Handle the transformed data (e.g., API call)

    addUsers(transformedData);

    nextStep();
    navigate("/onboarding/menu-setup");
  };

  const goBack = () => {
    prevStep();
    navigate("/onboarding/floor-plan");
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold text-gray-900">Add team members</h2>
      <p className="mt-1 text-sm text-gray-500">
        Invite your staff members and assign their roles.
      </p>

      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-6 space-y-6"
        >
          {users.map((user, index) => (
            <div
              key={user.id || index}
              className="relative rounded-lg border border-gray-200 p-4"
            >
              <div className="absolute right-4 top-4">
                {users.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                  >
                    <Trash2 className="h-5 w-5 text-destructive" />
                  </Button>
                )}
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                <FormField
                  control={control}
                  name={`users.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          required
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name={`users.${index}.email`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          required
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name={`users.${index}.password`}
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
                            className="absolute right-10 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => {
                              const generatedPassword = generatePassword(12);
                              console.log(generatedPassword);
                              setValue(
                                `users.${index}.password`,
                                generatedPassword
                              );
                            }}
                          >
                            Generate
                          </Button>
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
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name={`users.${index}.role`}
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
                                  <span className="font-medium">
                                    {role.label}
                                  </span>
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
                />
              </div>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={addUser}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Another Team Member
          </Button>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={goBack}
            >
              Back
            </Button>
            <Button type="submit">Next Step</Button>
          </div>
        </form>
      </Form>
    </Card>
  );
}

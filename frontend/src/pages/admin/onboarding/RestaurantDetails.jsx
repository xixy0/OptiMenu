import { useRef, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { ImagePlus } from "lucide-react";
import useOnboarding from "@/stores/useOnboarding";
import { useNavigate } from "react-router";

import { addRestaurantDetails } from "@/api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const restaurantDetailsSchema = z.object({
  name: z.string().min(1, "Restaurant Name is required"),
  address: z.string().min(1, "Address is required"),
  phone: z.string().regex(/^\d+$/, "Phone Number must be numeric"),
  email: z.string().email("Enter a valid email address"),
  logo: z.instanceof(File),
});

export default function RestaurantDetails() {
  const nextStep = useOnboarding((state) => state.nextStep);

  const restaurantDetails = useOnboarding((state) => state.restaurantDetails);
  const setRestaurantDetails = useOnboarding(
    (state) => state.setRestaurantDetails
  );

  const setRestaurantId = useOnboarding((state) => state.setRestaurantId);

  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(restaurantDetailsSchema),
    defaultValues: {
      name: restaurantDetails?.name || "",
      address: restaurantDetails?.address || "",
      phone: restaurantDetails?.phone || "",
      email: restaurantDetails?.email || "",
      logo: restaurantDetails?.logo,
    },
  });

  const fileInputRef = useRef(null);

  const { mutate: addRestaurantMutation, isPending } = useMutation({
    mutationFn: addRestaurantDetails,
    onSuccess: (data) => {
      console.log(data);
      setRestaurantDetails(data);
      // setRestaurantId(data.id);
      // SET ACTUAL RESTAURANT ID
      setRestaurantId(data);
      nextStep();
      navigate("/onboarding/floor-plan");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to add restaurant details");
      nextStep();
      navigate("/onboarding/floor-plan");
    },
  });

  const onSubmit = (data) => {
    // console.log(data);

    // setRestaurantDetails(data);

    // nextStep();
    // navigate("/onboarding/floor-plan");

    addRestaurantMutation(data);
  };

  return (
    <Card className="p-6 lg:p-10">
      <h2 className="text-2xl font-semibold text-gray-900">
        Tell us about your restaurant
      </h2>
      <p className="mt-1 text-sm text-gray-500">
        This information will be displayed on your digital menu and help
        customers find you.
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-6 space-y-6"
        >
          <FormField
            control={form.control}
            name="logo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Restaurant Logo</FormLabel>
                <div className="flex items-center gap-4">
                  {field.value ? (
                    <img
                      src={URL.createObjectURL(field.value)}
                      alt="Logo preview"
                      className="h-16 w-16 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-lg border-2 border-dashed border-gray-300">
                      <ImagePlus className="h-8 w-8 text-gray-400" />
                    </div>
                  )}
                  <div>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      Upload Logo
                    </Button>
                    <Input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          field.onChange(e.target.files[0]);
                        }
                      }}
                      className="hidden"
                    />
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Restaurant Name */}
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Restaurant Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter restaurant name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Address */}
          <FormField
            name="address"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter restaurant address"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone and Email */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <FormField
              name="phone"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter phone number"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter email address"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isPending}
            >
              Next Step
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
}

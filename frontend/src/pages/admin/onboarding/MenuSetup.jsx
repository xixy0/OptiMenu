import { z } from "zod";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { ImagePlus, Plus, Trash2 } from "lucide-react";

import useOnboarding from "@/stores/useOnboarding";
import { submitOnboardingDetails } from "@/api";

// Categories list
const categories = [
  "Appetizers",
  "Main Course",
  "Desserts",
  "Beverages",
  "Specials",
];

// Validation schema
const menuItemSchema = z.object({
  name: z.string().min(1, "Item name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().nonnegative("Price must be a positive number"),
  category: z.string().min(1, "Category is required"),
  imageFile: z.instanceof(File).optional(),
  // imageUrl: z.string().optional(),
});

const menuSetupSchema = z.object({
  items: z.array(menuItemSchema),
});

export default function MenuSetup() {
  const prevStep = useOnboarding((state) => state.prevStep);
  const nextStep = useOnboarding((state) => state.nextStep);
  const completeStep = useOnboarding((state) => state.completeStep);

  const menuItems = useOnboarding((state) => state.menuItems);
  const addMenuItems = useOnboarding((state) => state.addMenuItems);

  // For final submission
  const restaurantDetails = useOnboarding((state) => state.restaurantDetails);
  const floorPlan = useOnboarding((state) => state.floorPlan);
  const users = useOnboarding((state) => state.users);

  const reset = useOnboarding((state) => state.reset);

  const { mutate: submitOnboardingData, isPending } = useMutation({
    mutationFn: (data) => submitOnboardingDetails(data),
    onError: (error) => {
      console.error(error);
      toast.error("Failed to submit onboarding details");
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success("Onboarding details submitted successfully");
      reset();
      nextStep();
      navigate("/dashboard");
    },
  });

  const handleCompleteSetup = () => {
    console.log("Submit values");

    const data = {
      restaurantDetails,
      menuItems,
      floorPlan,
      users,
    };

    submitOnboardingData(data);

    nextStep();
    completeStep(4);
    navigate("/overview");
  };

  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(menuSetupSchema),
    defaultValues: {
      // items: [{ name: "", description: "", price: 0, category: "" }],
      items:
        menuItems?.length == 0
          ? [
              {
                name: "",
                description: "",
                price: 0,
                category: "",
                imageFile: null,
                imageUrl: null,
              },
            ]
          : menuItems,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const onSubmit = (data) => {
    console.log("The data is ", data);
    addMenuItems(data.items);
    nextStep();
    handleCompleteSetup();
    // navigate("/onboarding/floor-plan");
  };

  const goBack = () => {
    prevStep();
    navigate("/onboarding/user-creation");
    // navigate("/onboarding/restaurant-details");
  };

  const [uploadedImages, setUploadedImages] = useState({}); // Store uploaded image URLs

  const handleImageUpload = async (file, index) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const { imageUrl } = await response.json(); // Extract the uploaded image URL
        setUploadedImages((prev) => ({ ...prev, [index]: imageUrl })); // Update state

        // Update the form value with the image URL
        form.setValue(`items.${index}.image`, imageUrl);
      } else {
        console.error("Image upload failed");
      }
    } catch (error) {
      console.error("Error during image upload:", error);
    }
  };

  return (
    <Card className="p-6 lg:p-10">
      <h2 className="text-2xl font-semibold text-gray-900">
        Set up your menu items
      </h2>
      <p className="mt-1 text-sm text-gray-500">
        Add your menu items with details. You can always modify these later.
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-6 space-y-6"
        >
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="relative rounded-lg border border-gray-200 p-4"
            >
              <div className="absolute right-4 top-4">
                {fields.length > 1 && (
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

              <div className="grid gap-6 md:grid-cols-2">
                {/* Item Name */}
                <FormField
                  name={`items.${index}.name`}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Item Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter item name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Category */}
                <FormField
                  name={`items.${index}.category`}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem
                                key={category}
                                value={category}
                              >
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Price */}
                <FormField
                  name={`items.${index}.price`}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          placeholder="Enter price"
                          step="0.01"
                          min="0"
                          value={field.value || ""}
                          onChange={(e) =>
                            field.onChange(e.target.valueAsNumber)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  <Label>Image</Label>
                  <div className="flex items-center gap-4">
                    {uploadedImages[index] ? (
                      <img
                        src={uploadedImages[index]}
                        alt="Uploaded"
                        className="h-16 w-16 object-cover rounded-lg border border-gray-300"
                      />
                    ) : (
                      <div className="h-16 w-16 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                        <ImagePlus className="h-8 w-8 text-gray-400" />
                      </div>
                    )}

                    {/* <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleImageUpload(e.target.files[0], index)
                      }
                    /> */}
                    <FormField
                      name={`items.${index}.imageFile`}
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Image</FormLabel>
                          <FormControl>
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0] || null; // Handle empty selection
                                field.onChange(file);
                                uploadedImages[index] =
                                  URL.createObjectURL(file);
                              }}
                              className="w-full"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Description */}
                <FormField
                  name={`items.${index}.description`}
                  control={form.control}
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Enter description"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          ))}

          {/* Add Another Item Button */}
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() =>
              append({ name: "", description: "", price: 0, category: "" })
            }
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Another Item
          </Button>

          {/* Navigation Buttons */}
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={goBack}
            >
              Back
            </Button>
            <Button
              type="submit"
              disabled={isPending}
            >
              Complete Setup
            </Button>
          </div>
        </form>
      </Form>
      <Button
        onClick={() => {
          console.log(uploadedImages);
        }}
      >
        Print
      </Button>
    </Card>
  );
}

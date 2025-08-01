import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  fetchMenuItems,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "@/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Edit, Trash, Plus, UtensilsCrossed } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const categories = [
  "Appetizers",
  "Main Course",
  "Desserts",
  "Beverages",
  "Specials",
];

// const menuItemSchema = z.object({
//   name: z.string().min(1, "Name is required"),
//   description: z.string().min(1, "Description is required"),
//   // price: z
//   //   .string()
//   //   .min(1, "Price is required")
//   //   .refine((val) => !isNaN(parseFloat(val)), "Price must be a number")
//   //   .transform((val) => parseFloat(val)), // Convert string to number
//   price: z.number().min(0.01, "Price must be greater than 0"),
//   imageFile: z.instanceof(File).optional(), // For file uploads
// });

const menuItemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.number().min(0, "Price must be a positive number"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  isVeg: z.boolean().default(true),
  imageFile: z.instanceof(File).optional(),
});

const AdminMenu = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const queryClient = useQueryClient();

  const {
    data: menuItems,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["menuItems"],
    queryFn: fetchMenuItems,
  });

  const form = useForm({
    resolver: zodResolver(menuItemSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      imageFile: null,
    },
  });

  const addMutation = useMutation({
    mutationFn: addMenuItem,
    onSuccess: () => {
      queryClient.invalidateQueries(["menuItems"]);
      toast.success("Menu Item added successfully");
      setIsDialogOpen(false);
      form.reset();
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateMenuItem,
    onSuccess: () => {
      queryClient.invalidateQueries(["menuItems"]);
      toast.success("Menu Item updated successfully");
      setIsDialogOpen(false);
      form.reset();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteMenuItem,
    onSuccess: () => {
      queryClient.invalidateQueries(["menuItems"]);
      toast.success("Menu Item deleted successfully");
    },
  });

  const handleSaveItem = (data) => {
    console.log("Data: ", data);
    if (currentItem) {
      updateMutation.mutate({ ...currentItem, ...data });
    } else {
      addMutation.mutate(data);
    }
  };

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <UtensilsCrossed className="mr-2 h-8 w-8 text-primary" />
          Menu Management
        </h1>
        <Button
          onClick={() => {
            setCurrentItem(null);
            setIsDialogOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" /> Add Item
        </Button>
      </div>

      {isError ? (
        <div className="text-red-500">
          Error loading menu items. Please try again later.
        </div>
      ) : isLoading ? (
        <div className="space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Available</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {menuItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <img
                      src={item.image || "/images/avocado-salad.webp"}
                      alt={item.name}
                      className="rounded-md object-cover w-24 h-24"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>${item.price}</TableCell>
                  <TableCell>{item.available ? "Yes" : "No"}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setCurrentItem(item);
                        form.reset(item);
                        setIsDialogOpen(true);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        className="max-h-screen overflow-auto"
      >
        <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden max-h-[90vh] flex flex-col">
          <DialogHeader className="bg-gradient-to-r from-primary to-primary-foreground p-6 text-white sticky top-0 z-10">
            <DialogTitle className="text-2xl font-bold">
              {currentItem ? "Edit Menu Item" : "Add Menu Item"}
            </DialogTitle>
            <DialogDescription className="text-gray-200">
              {currentItem
                ? "Update the details of your menu item."
                : "Add a new item to your menu."}
            </DialogDescription>
          </DialogHeader>
          <div className="overflow-y-auto flex-grow">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSaveItem)}
                className="space-y-6 p-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name Field */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter item name"
                            className="w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Price Field */}
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            placeholder="Enter price"
                            step="0.01"
                            min="0"
                            value={field.value || ""}
                            onChange={(e) =>
                              field.onChange(e.target.valueAsNumber)
                            }
                            className="w-full"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Description Field */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Enter description"
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Category Field (Dropdown) */}
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className="w-full">
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

                  {/* Veg/Non-Veg Field (Switch) */}
                  <FormField
                    control={form.control}
                    name="isVeg"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel>Vegetarian</FormLabel>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Image Field */}
                <FormField
                  control={form.control}
                  name="imageFile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Image</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => field.onChange(e.target.files?.[0])}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Image Preview */}
                {useWatch({ control: form.control, name: "imageFile" }) ? (
                  <div className="mt-4">
                    <img
                      src={
                        URL.createObjectURL(form.watch("imageFile")) ||
                        currentItem?.image ||
                        "/placeholder.svg" ||
                        "/placeholder.svg"
                      }
                      alt="Preview"
                      className="rounded-md object-cover w-32 h-32"
                    />
                  </div>
                ) : currentItem?.image ? (
                  <div className="mt-4">
                    <img
                      src={currentItem.image || "/placeholder.svg"}
                      alt="Current Image"
                      className="rounded-md object-cover w-full h-48"
                    />
                  </div>
                ) : null}

                {/* Dialog Footer */}
                <DialogFooter className=" p-4 sticky bottom-0 z-10 ">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      form.reset();
                      setIsDialogOpen(false);
                    }}
                  >
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    className="bg-primary text-white hover:bg-primary-dark"
                  >
                    Save
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminMenu;

import { useForm, useFieldArray } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Minus, Trash } from "lucide-react";
import useOnboarding from "@/stores/useOnboarding";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { addFloorPlan } from "@/api";
import { toast } from "sonner";

export default function FloorPlan() {
  const prevStep = useOnboarding((state) => state.prevStep);
  const nextStep = useOnboarding((state) => state.nextStep);

  const restId = useOnboarding((state) => state.restaurantId);
  console.log(restId);

  const floorPlan = useOnboarding((state) => state.floorPlan);
  const setFloorPlan = useOnboarding((state) => state.setFloorPlan);

  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      floors:
        floorPlan.floors?.length == 0
          ? [
              {
                restId : restId,
                name: "Ground Floor",
                tables: Array(4).fill({ capacity: 4 }),
              },
            ]
          : floorPlan.floors,
    },
  });

  const { control, handleSubmit } = form;

  const {
    fields: floors,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "floors",
  });

  const addFloor = () => {
    append({
      name: `Floor ${floors.length + 1}`,
      tables: Array(4).fill({ capacity: 4 }),
    });
  };

  const removeFloor = (index) => {
    remove(index);
  };

  const addTable = (floorIndex) => {
    const updatedFloors = [...floors];
    updatedFloors[floorIndex].tables.push({ capacity: 4 });
    form.setValue("floors", updatedFloors);
  };

  const removeTable = (floorIndex) => {
    const updatedFloors = [...floors];
    updatedFloors[floorIndex].tables.pop();
    form.setValue("floors", updatedFloors);
  };

  const { mutate: addFloorPlanMutation, isPending } = useMutation({
    mutationFn: addFloorPlan,
    onSuccess: (data) => {
      console.log(data);
      setFloorPlan(data);
      nextStep();
      navigate("/dashboard");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to add floor plan");
      navigate("/dashboard");
    },
  });

  const onSubmit = (data) => {
    // console.log("Form Data:", data);
    // console.log("Floors: ", data.floors);

    // setFloorPlan(data.floor);
    // setFloorPlan(data);
    // nextStep();
    // navigate("/onboarding/user-creation");
    addFloorPlanMutation(data);
  };

  const goBack = () => {
    prevStep();
    navigate("/onboarding/restaurant-details");
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold text-gray-900">
        Set up your floor plan
      </h2>
      <p className="mt-1 text-sm text-gray-500">
        Define your restaurant's layout by adding floors and tables.
      </p>

      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-6 space-y-6"
        >
          {floors.map((floor, floorIndex) => (
            <div
              key={floor.id || floorIndex}
              className="rounded-lg border border-gray-200 p-4 space-y-4"
            >
              <div className="flex items-center justify-between">
                <FormField
                  control={control}
                  name={`floors.${floorIndex}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Floor Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          required
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {floors.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => removeFloor(floorIndex)}
                    className="text-destructive"
                  >
                    <Trash className="h-4 w-4" />
                    Remove Floor
                  </Button>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-700">
                    Tables ({floor.tables?.length})
                  </h3>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeTable(floorIndex)}
                      disabled={!floor.tables?.length}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => addTable(floorIndex)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
                  {floor.tables.map((table, tableIndex) => (
                    <FormField
                      key={tableIndex}
                      control={control}
                      name={`floors.${floorIndex}.tables.${tableIndex}.capacity`}
                      render={({ field }) => (
                        <FormItem>
                          <div className="rounded-lg border border-gray-200 p-3 text-center">
                            <div className="text-sm font-medium">
                              Table {tableIndex + 1}
                            </div>
                            <FormControl>
                              <Input
                                {...field}
                                type="number"
                                min="1"
                                className="mt-2"
                              />
                            </FormControl>
                            <div className="mt-1 text-xs text-gray-500">
                              Capacity
                            </div>
                          </div>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={addFloor}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Another Floor
          </Button>

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
              Next Step
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
}

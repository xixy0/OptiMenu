import { cn } from "@/lib/utils";
import useOnboarding from "@/stores/useOnboarding";
import { Check } from "lucide-react";

const steps = [
  {
    id: 1,
    name: "Restaurant Details",
    description: "Basic information about your restaurant",
  },
  {
    id: 2,
    name: "Floor Plan",
    description: "Configure your restaurant layout",
  },
  // { id: 3, name: "User Roles", description: "Set up your team members" },
  // {
  //   id: 4,
  //   name: "Menu Setup",
  //   description: "Add your menu items and categories",
  // },

  // { id: 5, name: "QR Codes", description: "Generate QR codes for your tables" },
];

export default function OnboardingSteps() {
  const currentStep = useOnboarding((state) => state.step);

  return (
    <nav aria-label="Progress">
      <ol
        role="list"
        className="space-y-4 md:flex md:space-x-8 md:space-y-0"
      >
        {steps.map((step) => (
          <li
            key={step.name}
            className="md:flex-1"
          >
            <div
              className={cn(
                "group flex flex-col border-l-4 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4",
                step.id < currentStep
                  ? "border-primary"
                  : step.id === currentStep
                  ? "border-primary"
                  : "border-gray-200"
              )}
            >
              <span className="text-sm font-medium">
                <span
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full",
                    step.id < currentStep
                      ? "bg-primary text-white"
                      : step.id === currentStep
                      ? "border-2 border-primary"
                      : "border-2 border-gray-300"
                  )}
                >
                  {step.id < currentStep ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    step.id
                  )}
                </span>
              </span>
              <span
                className={cn(
                  "mt-3 text-lg font-semibold",
                  step.id <= currentStep ? "text-primary" : "text-gray-500"
                )}
              >
                {step.name}
              </span>
              <span className="text-sm text-gray-500">{step.description}</span>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}

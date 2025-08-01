import { useState } from "react";
import { Button } from "@/components/ui/button";

const pages = [
  {
    path: "/sign-up",
    description: "Register a new restaurant to get started.",
  },
  {
    path: "/login",
    description:
      "Login to access your restaurant dashboard and manage operations.",
  },
  {
    path: "/dashboard",
    description: "Your main dashboard where you can track all activities.",
  },
  //   {
  //     path: "/analytics",
  //     description: "View analytics and insights for your restaurant.",
  //   },
  //   { path: "/users", description: "Manage your restaurant staff and users." },
  //   {
  //     path: "/items",
  //     description: "Manage your restaurant menu and add new dishes.",
  //   },
  //   { path: "/orders", description: "Track all orders in real time." },
  //   {
  //     path: "/staff-performance",
  //     description: "Monitor staff performance and efficiency.",
  //   },
  //   {
  //     path: "/procurement",
  //     description: "Plan procurement for the next day's sales.",
  //   },
  //   {
  //     path: "/schedule",
  //     description: "View the production schedule for food preparation.",
  //   },
  {
    path: "/123/5/menu",
    description: "Customer menu for browsing and ordering food.",
  },
  {
    path: "/steward/123",
    description: "Steward interface for order verification and management.",
  },
  {
    path: "/cook/123",
    description: "Cook's dashboard for managing food preparation.",
  },
  {
    path: "/waiter/123",
    description: "Waiter's interface for serving food and managing tables.",
  },
  {
    path: "/accountant",
    description: "Accountant's dashboard for handling finances.",
  },
  {
    path: "/123/5/menu",
    description: "Customer menu for browsing and ordering food.",
  },
];

export default function Demo() {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < pages.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Navigation Bar */}
      <div className="sticky top-0 z-50 bg-white shadow-md p-3 sm:p-4 w-full">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-lg sm:text-xl font-semibold mb-2 text-center">
            {pages[currentStep].description}
          </h2>

          <div className="flex items-center gap-2 sm:gap-4">
            <Button
              onClick={prevStep}
              disabled={currentStep === 0}
              size="sm"
              className="shrink-0"
            >
              Back
            </Button>

            {/* Segmented Progress Indicator */}
            <div className="flex-1 flex items-center justify-center gap-1 sm:gap-2">
              {pages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToStep(index)}
                  className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                    index <= currentStep
                      ? "bg-primary flex-1 max-w-16"
                      : "bg-muted flex-1 max-w-16"
                  }`}
                  aria-label={`Go to step ${index + 1}`}
                />
              ))}
            </div>

            <Button
              onClick={nextStep}
              disabled={currentStep === pages.length - 1}
              size="sm"
              className="shrink-0"
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* Full-Width Iframe */}
      <div className="flex-grow w-full h-screen">
        <iframe
          src={pages[currentStep].path}
          title={`Demo Preview: ${pages[currentStep].description}`}
          className="w-full h-full border-none"
        ></iframe>
      </div>
    </div>
  );
}

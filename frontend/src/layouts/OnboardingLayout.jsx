import { Outlet } from "react-router-dom";
import { Card } from "@/components/ui/card";

import OnboardingSteps from "@/components/admin/OnboardingSteps";

export default function OnboardingLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          {/* Logo */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-primary">OptiMenu</h1>
          </div>

          <div className="w-full max-w-6xl">
            <div className="mb-12">
              <OnboardingSteps />
            </div>

            <Card className="p-6 lg:p-8">
              <Outlet />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Navigate, useLocation } from "react-router-dom";
import useOnboarding from "@/stores/useOnboarding";

const ONBOARDING_ROUTES = [
  "/onboarding/restaurant-details",
  "/onboarding/floor-plan",
  "/onboarding/user-creation",
  "/onboarding/menu-setup",
  // "/onboarding/qr-codes",
];

const ProtectedOnboardingRoute = ({ children }) => {
  const location = useLocation();
  const currentStep = useOnboarding((state) => state.step);

  // Get the index of current route in the sequence
  const currentRouteIndex = ONBOARDING_ROUTES.indexOf(location.pathname);

  // If trying to access invalid route, redirect to first step
  if (currentRouteIndex === -1) {
    return (
      <Navigate
        to="/onboarding/restaurant-details"
        replace
      />
    );
  }

  // If trying to access future step, redirect to current allowed step
  if (currentRouteIndex + 1 > currentStep) {
    return (
      <Navigate
        to={ONBOARDING_ROUTES[currentStep - 1]}
        replace
      />
    );
  }

  // If trying to access previous step, allow it
  return children;
};

export default ProtectedOnboardingRoute;

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

import Landing from "@/pages/Landing";
import Demo from "./pages/Demo";
import BugReport from "./pages/BugReport";
import BugManagement from "./pages/BugManagement";

import LoginPage from "./pages/auth/LoginPage";
import AdminSignUpPage from "./pages/auth/AdminSignUpPage";

import CustomerLayout from "@/layouts/CustomerLayout";
import Home from "@/pages/customer/Home";
import Menu from "@/pages/customer/Menu";
import BillDetails from "./pages/customer/BillDetails";

import OnboardingLayout from "./layouts/OnboardingLayout";
import ProtectedOnboardingRoute from "./components/admin/ProtectedOnboardingRoute";
import RestaurantDetails from "./pages/admin/onboarding/RestaurantDetails";
import MenuSetup from "./pages/admin/onboarding/MenuSetup";
import FloorPlan from "./pages/admin/onboarding/FloorPlan";
import UserInitialization from "./pages/admin/onboarding/UserInitialization";

import AdminSidebarLayout from "./layouts/AdminSidebarLayout";
import AdminDashBoard from "@/pages/admin/AdminDashBoard";
import Users from "@/pages/admin/Users";
import Orders from "@/pages/admin/Orders";
import Items from "@/pages/admin/Items";
import DetailedOrder from "./pages/admin/DetailedOrder";
import Analytics from "./pages/admin/Analytics";
import Settings from "./pages/admin/Settings";
import StaffPerformance from "./pages/admin/StaffPerformance";
import RestaurantOverview from "./pages/admin/RestaurantOverview";
import ProcurementList from "./pages/admin/ProcurementList";
import ProductionSchedule from "./pages/admin/ProductionSchedule";

import StewardDashboard from "./pages/steward/StewardDashBoard";

import CookDashboard from "./pages/cook/CookDashboard";

import WaiterDashboard from "./pages/waiter/WaiterDashBoard";

import AccountantDashboard from "./pages/accountant/AccountantDashboard";

import SessionGuard from "./components/customer/SessionGuard";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster
        richColors
        position="top-right"
      />
      <Router>
        <Routes>
          <Route>
            {/* Common Routes */}
            <Route
              path="/"
              element={<Landing />}
            />
            <Route
              path="login"
              element={<LoginPage />}
            />

            <Route
              path="sign-up"
              element={<AdminSignUpPage />}
            />

            <Route
              path="demo"
              element={<Demo />}
            />

            <Route
              path="report-bug"
              element={<BugReport />}
            />

            <Route
              path="bug-tracker"
              element={<BugManagement />}
            />
          </Route>

          {/* Admin Routes */}
          <Route
            path="/onboarding"
            element={<OnboardingLayout />}
          >
            <Route
              path="restaurant-details"
              element={
                <ProtectedOnboardingRoute>
                  <RestaurantDetails />
                </ProtectedOnboardingRoute>
              }
            />

            <Route
              path="floor-plan"
              element={
                <ProtectedOnboardingRoute>
                  <FloorPlan />
                </ProtectedOnboardingRoute>
              }
            />
            <Route
              path="user-creation"
              element={
                <ProtectedOnboardingRoute>
                  <UserInitialization />
                </ProtectedOnboardingRoute>
              }
            />
            <Route
              path="menu-setup"
              element={
                <ProtectedOnboardingRoute>
                  <MenuSetup />
                </ProtectedOnboardingRoute>
              }
            />
            {/* <Route
              path="qr-codes"
              element={
                <ProtectedOnboardingRoute>
                <QRCodes />
                </ProtectedOnboardingRoute>
              }
            /> */}
          </Route>

          <Route element={<AdminSidebarLayout />}>
            <Route
              path="overview"
              element={<RestaurantOverview />}
            />
            <Route
              path="dashboard"
              element={<AdminDashBoard />}
            />
            <Route
              path="users"
              element={<Users />}
            />

            <Route path="orders">
              <Route
                index
                element={<Orders />}
              />
              <Route
                path=":orderId"
                element={<DetailedOrder />}
              />
            </Route>
            <Route
              path="items"
              element={<Items />}
            />
            <Route
              path="analytics"
              element={<Analytics />}
            />
            <Route
              path="staff-performance"
              element={<StaffPerformance />}
            />
            <Route
              path="schedule"
              element={<ProductionSchedule />}
            />
            <Route
              path="procurement"
              element={<ProcurementList />}
            />
            <Route
              path="settings"
              element={<Settings />}
            />
          </Route>

          {/* Cook Routes */}
          {/* <Route
            path="cook"
            element={<CookDashboard />}
          /> */}
          <Route path="cook">
            <Route
              path=":cookId"
              element={<CookDashboard />}
            />
          </Route>

          {/* Steward Routes */}
          {/* <Route
            path="steward"
            element={<StewardDashboard />}
          /> */}
          <Route path="steward">
            <Route
              path=":stewardId"
              element={<StewardDashboard />}
            />
          </Route>

          {/* Waiter Routes */}
          {/* <Route
            path="waiter"
            element={<WaiterDashboard />}
          /> */}
          <Route path="waiter">
            <Route
              path=":waiterId"
              element={<WaiterDashboard />}
            />
          </Route>

          {/* Accountant Routes */}
          <Route
            path="accountant"
            element={<AccountantDashboard />}
          />

          <Route
            path="/:restId"
            element={<CustomerLayout />}
          >
            {/* Customer Routes */}
            <Route
              index
              element={<Home />}
            />
            <Route path=":tableId">
              <Route
                path="menu"
                element={
                  <SessionGuard>
                    <Menu />
                  </SessionGuard>
                }
              />
              <Route
                path="bill"
                // element={<Bill />}
                element={<BillDetails />}
              />
            </Route>
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;

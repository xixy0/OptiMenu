import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Bug, ChevronRight, Menu, X } from "lucide-react";
import { useState } from "react";

const Landing = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-indigo-50 to-white text-gray-900">
      {/* Header Section */}
      <header className="w-full p-4 md:p-6 bg-white shadow-sm sticky top-0 z-50">
        <nav className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-700">🍴 OptiMenu</h1>
          <div className="hidden md:flex space-x-4">
            <Button
              variant="ghost"
              className="text-indigo-700 hover:text-indigo-900 hover:bg-indigo-100"
              onClick={() => navigate("/login")}
            >
              Log In
            </Button>
            <Button
              variant="default"
              className="bg-indigo-700 hover:bg-indigo-800 text-white"
              onClick={() => navigate("/sign-up")}
            >
              Sign Up
            </Button>
          </div>
          <Button
            variant="ghost"
            className="md:hidden"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </nav>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md p-4 absolute top-16 left-0 right-0 z-40">
          <div className="flex flex-col space-y-2">
            <Button
              variant="ghost"
              className="w-full text-left text-indigo-700 hover:text-indigo-900 hover:bg-indigo-100"
              onClick={() => {
                navigate("/login");
                toggleMobileMenu();
              }}
            >
              Log In
            </Button>
            <Button
              variant="default"
              className="w-full bg-indigo-700 hover:bg-indigo-800 text-white"
              onClick={() => {
                navigate("/sign-up");
                toggleMobileMenu();
              }}
            >
              Sign Up
            </Button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4 py-12 md:py-24 space-y-8 max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold leading-tight text-indigo-900">
          Revolutionize Your Restaurant with{" "}
          <span className="text-indigo-600">OptiMenu</span>
        </h2>
        <p className="text-lg md:text-xl text-gray-700 max-w-2xl">
          Streamline menu management, orders, and inventory with ease. OptiMenu
          helps you run your restaurant like a pro!
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <Button
            size="lg"
            className="bg-indigo-700 hover:bg-indigo-800 text-white"
            onClick={() => navigate("/sign-up")}
          >
            Get Started <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-indigo-700 text-indigo-700 hover:bg-indigo-50"
            onClick={() => navigate("/login")}
          >
            Learn More
          </Button>
        </div>
      </main>

      {/* Features Section */}
      <section className="w-full bg-indigo-50 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center space-y-12">
          <h3 className="text-3xl md:text-4xl font-bold text-indigo-900">
            Why Choose OptiMenu?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              {
                icon: "📋",
                title: "Easy Menu Management",
                description:
                  "Quickly add, edit, or remove menu items and update your customers with real-time changes.",
              },
              {
                icon: "📊",
                title: "Insightful Analytics",
                description:
                  "Track your sales, manage inventory, and optimize your business operations with data-driven insights.",
              },
              {
                icon: "⏱️",
                title: "Time-Saving Automation",
                description:
                  "Streamline your workflows and focus on delivering great food while we handle the rest.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 space-y-4"
              >
                <div className="text-4xl">{feature.icon}</div>
                <h4 className="font-bold text-xl text-indigo-800">
                  {feature.title}
                </h4>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="w-full bg-indigo-700 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center space-y-8 text-white">
          <h3 className="text-3xl md:text-4xl font-bold">
            Ready to Transform Your Restaurant?
          </h3>
          <Button
            size="lg"
            className="bg-white text-indigo-700 hover:bg-indigo-100"
            onClick={() => window.open(`${staffFrontendURL}/sign-up`)}
          >
            Sign Up Now <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
          <div className="border-t border-white w-1/3 mx-auto opacity-50"></div>
          <div className="space-y-2">
            <p className="text-sm opacity-80">Encounter an issue?</p>
            <Button
              size="lg"
              variant="outline"
              className="bg-white text-indigo-700 hover:bg-indigo-100"
              onClick={() => navigate("/report-bug")}
            >
              Report a Bug <Bug className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-indigo-900 py-8">
        <div className="container mx-auto px-4 text-center text-indigo-200 text-sm">
          <p>
            &copy; {new Date().getFullYear()} OptiMenu. All rights reserved.
          </p>
          <div className="mt-4 space-x-4">
            <a
              href="#"
              className="hover:text-white"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="hover:text-white"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="hover:text-white"
            >
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;

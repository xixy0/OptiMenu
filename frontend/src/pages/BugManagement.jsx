import BugTrackingDashboard from "@/components/BugTrackingDashboard";

const BugManagement = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-8 px-4">
          Bug Management System
        </h1>
        <BugTrackingDashboard />
      </div>
    </div>
  );
};

export default BugManagement;

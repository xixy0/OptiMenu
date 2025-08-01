import { Button } from "@/components/ui/button";

// interface MobileNavProps {
//   activeTab: 'pending' | 'approved';
//   setActiveTab: (tab: 'pending' | 'approved') => void;
// }

const MobileNav = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex justify-center space-x-4 lg:hidden sticky top-0 bg-white z-10 py-4 shadow-md">
      <Button
        variant={activeTab === "pending" ? "default" : "outline"}
        onClick={() => setActiveTab("pending")}
        className="w-1/2"
      >
        Pending Orders
      </Button>
      <Button
        variant={activeTab === "approved" ? "default" : "outline"}
        onClick={() => setActiveTab("approved")}
        className="w-1/2"
      >
        Approved Orders
      </Button>
    </div>
  );
};

export default MobileNav;

import { Outlet } from "react-router";

const CustomerLayout = () => {
  return (
    <div className="h-screen overflow-auto px-10 sm:px-10 md:px-16 lg:px-32">
      <Outlet />
    </div>
  );
};
export default CustomerLayout;

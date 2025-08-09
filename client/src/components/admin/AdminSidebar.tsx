import { HelpCircle, LayoutDashboard, Users } from "lucide-react";
import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  const linkClasses =
    "flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900";
  const activeLinkClasses = "bg-gray-200 text-gray-900";

  return (
    <div className="hidden border-r bg-gray-100/40 lg:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-[60px] items-center border-b px-6">
          <NavLink
            to="/admin"
            className="flex items-center gap-2 font-semibold"
          >
            <LayoutDashboard className="h-6 w-6" />
            <span>Admin Panel</span>
          </NavLink>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                `${linkClasses} ${isActive ? activeLinkClasses : ""}`
              }
            >
              <Users className="h-4 w-4" />
              Users
            </NavLink>
            <NavLink
              to="/admin/questions"
              className={({ isActive }) =>
                `${linkClasses} ${isActive ? activeLinkClasses : ""}`
              }
            >
              <HelpCircle className="h-4 w-4" />
              Questions
            </NavLink>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;

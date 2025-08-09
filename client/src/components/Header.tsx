import { LogOut, Shield } from "lucide-react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../api/authApiSlice";
import { type RootState } from "../app/store";

const Header = () => {
  const { accessToken, user } = useSelector((state: RootState) => state.auth);
  const [logout] = useLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout(undefined).unwrap();
    navigate("/login");
  };

  return (
    <header className="bg-gray-800 text-white shadow-md">
      <nav className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link to="/" className="text-xl font-bold">
          Test_School
        </Link>
        <div>
          {accessToken ? (
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline">Welcome, {user?.name}</span>
              {user?.role === "Admin" && (
                <Link
                  to="/admin"
                  className="flex items-center gap-2 rounded bg-yellow-500 px-3 py-2 text-sm font-semibold text-black transition-colors hover:bg-yellow-600"
                >
                  <Shield size={16} />
                  <span className="hidden md:inline">Admin Panel</span>
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="rounded p-2 hover:bg-gray-700"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="rounded px-4 py-2 hover:bg-gray-700">
                Login
              </Link>
              <Link
                to="/register"
                className="ml-2 rounded bg-indigo-600 px-4 py-2 hover:bg-indigo-700"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;

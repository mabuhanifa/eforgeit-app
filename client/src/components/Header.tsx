import { LogOut } from "lucide-react";
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
              <span>Welcome, {user?.name}</span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 rounded px-4 py-2 hover:bg-gray-700"
              >
                <LogOut size={16} />
                Logout
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

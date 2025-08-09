import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white shadow-md">
      <nav className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link to="/" className="text-xl font-bold">
          Test_School
        </Link>
        <div>
          <Link to="/login" className="rounded px-4 py-2 hover:bg-gray-700">
            Login
          </Link>
          <Link
            to="/register"
            className="ml-2 rounded bg-indigo-600 px-4 py-2 hover:bg-indigo-700"
          >
            Register
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;

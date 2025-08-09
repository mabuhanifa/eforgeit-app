import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="text-center">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="mt-4 text-2xl">Page Not Found</p>
      <p className="mt-2 text-gray-600">
        The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="mt-6 inline-block rounded bg-indigo-600 px-6 py-2 text-white hover:bg-indigo-700"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFoundPage;

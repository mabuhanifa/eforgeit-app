import { useEffect, useState } from "react";
import Spinner from "./Spinner";

const ColdStartSpinner = () => {
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-grow flex-col items-center justify-center text-center">
      <div className="text-indigo-600">
        <Spinner />
      </div>
      <h2 className="mt-4 text-xl font-semibold text-gray-800">
        Waking up the server...
      </h2>
      <p className="mt-2 text-gray-500">
        This may take a moment. Please wait ({countdown}s)
      </p>
    </div>
  );
};

export default ColdStartSpinner;

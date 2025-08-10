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
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-900 bg-opacity-80 text-white backdrop-blur-sm">
      <div className="text-white">
        <Spinner />
      </div>
      <h2 className="mt-4 text-xl font-semibold">Waking up the server...</h2>
      <p className="mt-2 text-gray-300">
        This may take a moment. Please wait ({countdown}s)
      </p>
    </div>
  );
};

export default ColdStartSpinner;

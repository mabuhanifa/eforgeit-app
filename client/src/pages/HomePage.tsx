import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useStartAssessmentMutation } from "../api/assessmentApiSlice";
import Button from "../components/ui/Button";
import { startTest } from "../features/assessment/assessmentSlice";

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [startAssessmentMutation, { isLoading }] = useStartAssessmentMutation();

  const handleStartTest = async () => {
    try {
      const data = await startAssessmentMutation(undefined).unwrap();
      dispatch(startTest(data));
      navigate("/assessment/take");
    } catch (err: any) {
      toast.error(err.data?.message || "Failed to start assessment.");
    }
  };

  return (
    <div className="text-center">
      <h1 className="mb-4 text-4xl font-bold">
        Welcome to the Competency Assessment Platform
      </h1>
      <p className="mb-8 text-lg text-gray-600">
        Ready to test your skills? Click the button below to begin.
      </p>
      <div className="mx-auto max-w-xs">
        <Button onClick={handleStartTest} disabled={isLoading}>
          {isLoading ? "Preparing Test..." : "Start Assessment"}
        </Button>
      </div>
    </div>
  );
};

export default HomePage;

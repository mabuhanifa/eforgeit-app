import html2pdf from "html2pdf.js";
import { Download } from "lucide-react";
import { useRef } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useStartAssessmentMutation } from "../api/assessmentApiSlice";
import { type RootState } from "../app/store";
import DigitalCertificate from "../components/assessment/DigitalCertificate";
import Button from "../components/ui/Button";
import {
  resetAssessment,
  startTest,
} from "../features/assessment/assessmentSlice";

const AssessmentResultPage = () => {
  const certificateRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { lastResult } = useSelector((state: RootState) => state.assessment);
  const { user } = useSelector((state: RootState) => state.auth);

  const [startAssessment, { isLoading: isStartingNext }] =
    useStartAssessmentMutation();

  const handleDownload = () => {
    if (certificateRef.current) {
      const opt = {
        margin: 0.5,
        filename: `Test_School_Certificate_${user?.name}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "landscape" },
      };
      html2pdf().from(certificateRef.current).set(opt).save();
    }
  };

  const handleGoHome = () => {
    dispatch(resetAssessment());
  };

  const handleStartNextTest = async () => {
    try {
      const data = await startAssessment(undefined).unwrap();
      dispatch(startTest(data));
      navigate("/assessment/take");
    } catch (err: any) {
      toast.error(err.data?.message || "Failed to start next assessment.");
    }
  };

  if (!lastResult) {
    return <Navigate to="/" replace />;
  }

  const { score, levelAchieved, unlocksNextStep } = lastResult;

  return (
    <div className="text-center">
      <h1 className="mb-4 text-3xl font-bold">Assessment Complete!</h1>
      <p className="mb-8 text-lg">
        You scored <span className="font-bold">{score.toFixed(2)}%</span> and
        achieved <span className="font-bold">Level {levelAchieved}</span>.
      </p>

      {unlocksNextStep ? (
        <p className="mb-8 text-green-600">
          Congratulations! You have unlocked the next assessment step.
        </p>
      ) : (
        <p className="mb-8 text-red-600">
          You did not unlock the next step. Keep practicing!
        </p>
      )}

      <DigitalCertificate
        ref={certificateRef}
        userName={user?.name || "Student"}
        levelAchieved={levelAchieved}
        completionDate={new Date().toLocaleDateString()}
      />

      <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <Button
          onClick={handleDownload}
          className="flex w-full items-center justify-center gap-2 bg-green-600 hover:bg-green-700 sm:w-auto"
        >
          <Download size={16} />
          Download Certificate
        </Button>
        <Link to="/" onClick={handleGoHome} className="w-full sm:w-auto">
          <Button className="w-full bg-gray-600 hover:bg-gray-700 sm:w-auto">
            Back to Home
          </Button>
        </Link>
        {unlocksNextStep && (
          <Button
            onClick={handleStartNextTest}
            disabled={isStartingNext}
            className="w-full bg-indigo-600 hover:bg-indigo-700 sm:w-auto"
          >
            {isStartingNext ? "Starting..." : "Start Next Assessment"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default AssessmentResultPage;

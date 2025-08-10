import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useStartAssessmentMutation } from "../api/assessmentApiSlice";
import { useGetMyCertificationQuery } from "../api/certificationApiSlice";
import { type RootState } from "../app/store";
import ProctoringConsentModal from "../components/assessment/ProctoringConsentModal";
import Button from "../components/ui/Button";
import { startTest } from "../features/assessment/assessmentSlice";

const HomePage = () => {
  const [isConsentModalOpen, setIsConsentModalOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { accessToken, user } = useSelector((state: RootState) => state.auth);

  const [startAssessmentMutation, { isLoading }] = useStartAssessmentMutation();
  const { data: certificationData } = useGetMyCertificationQuery(undefined, {
    skip: !accessToken,
  });

  const handleStartTest = async () => {
    try {
      const data = await startAssessmentMutation(undefined).unwrap();
      dispatch(startTest(data));
      navigate("/assessment/take");
    } catch (err: any) {
      toast.error(err.data?.message || "Failed to start assessment.");
    }
  };

  const getButtonText = () => {
    if (
      certificationData?.highestLevel &&
      certificationData.highestLevel !== "Not Certified"
    ) {
      return "Start Next Assessment";
    }
    return "Start Assessment";
  };

  if (user?.failedStep1) {
    return (
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">Assessment Platform</h1>
        <div className="mx-auto max-w-md rounded-lg bg-red-100 p-4 text-red-700">
          <p className="font-semibold">Assessment Locked</p>
          <p className="mt-2 text-sm">
            You are not eligible to retake the assessment at this time.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center">
      <h1 className="mb-4 text-4xl font-bold">
        Welcome to the Competency Assessment Platform
      </h1>
      <p className="mb-8 text-lg text-gray-600">
        Ready to test your skills? Click the button below to begin.
      </p>
      {certificationData && (
        <div className="mb-8">
          <p className="text-gray-700">Your current certification level is:</p>
          <p className="text-2xl font-bold text-indigo-600">
            {certificationData.highestLevel}
          </p>
        </div>
      )}
      <div className="mx-auto max-w-xs">
        <Button
          onClick={() => setIsConsentModalOpen(true)}
          disabled={isLoading}
        >
          {isLoading ? "Preparing Test..." : getButtonText()}
        </Button>
      </div>
      <ProctoringConsentModal
        isOpen={isConsentModalOpen}
        onClose={() => setIsConsentModalOpen(false)}
        onConfirm={handleStartTest}
        isLoading={isLoading}
      />
    </div>
  );
};

export default HomePage;

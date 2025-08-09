import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSubmitAssessmentMutation } from "../api/assessmentApiSlice";
import { type RootState } from "../app/store";
import ProgressBar from "../components/assessment/ProgressBar";
import QuestionDisplay from "../components/assessment/QuestionDisplay";
import Timer from "../components/assessment/Timer";
import Button from "../components/ui/Button";
import ConfirmationModal from "../components/ui/ConfirmationModal";
import {
  answerQuestion,
  nextQuestion,
  previousQuestion,
  submitTest,
} from "../features/assessment/assessmentSlice";

const AssessmentPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    questions,
    answers,
    currentQuestionIndex,
    status,
    endTime,
    assessmentId,
  } = useSelector((state: RootState) => state.assessment);

  const [submitAssessmentMutation, { isLoading: isSubmitting }] =
    useSubmitAssessmentMutation();

  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswer = currentQuestion ? answers[currentQuestion._id] : null;

  const handleAnswerSelect = (answer: string) => {
    dispatch(answerQuestion({ questionId: currentQuestion._id, answer }));
  };

  const handleNext = () => {
    dispatch(nextQuestion());
  };

  const handlePrevious = () => {
    dispatch(previousQuestion());
  };

  const handleSubmit = async () => {
    setIsModalOpen(false);
    if (!assessmentId) return;

    const formattedAnswers = Object.entries(answers).map(
      ([questionId, answer]) => ({ questionId, answer })
    );

    try {
      const { results } = await submitAssessmentMutation({
        id: assessmentId,
        answers: formattedAnswers,
      }).unwrap();
      dispatch(submitTest(results));
      toast.success("Assessment submitted successfully!");
      navigate(`/assessment/result/${assessmentId}`);
    } catch (err: any) {
      toast.error(err.data?.message || "Failed to submit assessment.");
    }
  };

  if (status !== "in-progress" || !currentQuestion) {
    return (
      <div className="text-center">
        <h2 className="text-2xl">No active assessment.</h2>
        <p>Go to the dashboard to start a new one.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Competency Assessment</h1>
        {endTime && (
          <Timer endTime={new Date(endTime)} onTimeUp={handleSubmit} />
        )}
      </div>

      <div className="mb-6">
        <ProgressBar
          current={currentQuestionIndex + 1}
          total={questions.length}
        />
      </div>

      <QuestionDisplay
        question={currentQuestion}
        selectedAnswer={selectedAnswer}
        onAnswerSelect={handleAnswerSelect}
      />

      <div className="mt-8 flex justify-between">
        <Button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className="flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Previous
        </Button>
        {currentQuestionIndex === questions.length - 1 ? (
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-green-600 hover:bg-green-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Test"}
          </Button>
        ) : (
          <Button onClick={handleNext} className="flex items-center gap-2">
            Next
            <ArrowRight size={16} />
          </Button>
        )}
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleSubmit}
        title="Submit Assessment"
        message="Are you sure you want to submit your answers? You cannot make changes after submission."
      />
    </div>
  );
};

export default AssessmentPage;

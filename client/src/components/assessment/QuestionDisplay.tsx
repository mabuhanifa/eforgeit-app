interface Question {
  _id: string;
  questionText: string;
  options: string[];
}

interface QuestionDisplayProps {
  question: Question;
  selectedAnswer: string | null;
  onAnswerSelect: (answer: string) => void;
}

const QuestionDisplay = ({
  question,
  selectedAnswer,
  onAnswerSelect,
}: QuestionDisplayProps) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold text-gray-800">
        {question.questionText}
      </h3>
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <label
            key={index}
            className={`flex cursor-pointer items-center rounded-md border p-4 transition-colors ${
              selectedAnswer === option
                ? "border-indigo-600 bg-indigo-50"
                : "border-gray-300 hover:bg-gray-50"
            }`}
          >
            <input
              type="radio"
              name={question._id}
              value={option}
              checked={selectedAnswer === option}
              onChange={() => onAnswerSelect(option)}
              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="ml-3 text-gray-700">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default QuestionDisplay;

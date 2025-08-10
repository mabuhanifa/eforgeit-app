import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  useAddQuestionMutation,
  useDeleteQuestionMutation,
  useGetQuestionsQuery,
  useUpdateQuestionMutation,
} from "../../api/adminApiSlice";
import QuestionFormModal from "../../components/admin/QuestionFormModal";
import Button from "../../components/ui/Button";
import ConfirmationModal from "../../components/ui/ConfirmationModal";
import Pagination from "../../components/ui/Pagination";
import Spinner from "../../components/ui/Spinner";
import Table from "../../components/ui/Table";
import { type Question } from "../../types";
import { type QuestionFormData } from "../../types/admin";

const QuestionManagementPage = () => {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null
  );

  const { data, error, isLoading } = useGetQuestionsQuery({ page });
  const [addQuestion, { isLoading: isAdding }] = useAddQuestionMutation();
  const [updateQuestion, { isLoading: isUpdating }] =
    useUpdateQuestionMutation();
  const [deleteQuestion] = useDeleteQuestionMutation();

  const handleFormSubmit = async (formData: QuestionFormData) => {
    const processedData = {
      ...formData,
      options: formData.options.split(",").map((opt) => opt.trim()),
    };

    try {
      if (selectedQuestion) {
        await updateQuestion({
          id: selectedQuestion._id,
          ...processedData,
        }).unwrap();
        toast.success("Question updated successfully");
      } else {
        await addQuestion(processedData).unwrap();
        toast.success("Question added successfully");
      }
      closeModal();
    } catch (err: any) {
      toast.error(err.data?.message || "An error occurred");
    }
  };

  const openModal = (question: Question | null = null) => {
    setSelectedQuestion(question);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedQuestion(null);
    setIsModalOpen(false);
  };

  const openConfirmModal = (question: Question) => {
    setSelectedQuestion(question);
    setIsConfirmModalOpen(true);
  };

  const closeConfirmModal = () => {
    setSelectedQuestion(null);
    setIsConfirmModalOpen(false);
  };

  const handleDelete = async () => {
    if (selectedQuestion) {
      try {
        await deleteQuestion(selectedQuestion._id).unwrap();
        toast.success("Question deleted successfully");
        closeConfirmModal();
      } catch (err: any) {
        toast.error(err.data?.message || "Failed to delete question");
      }
    }
  };

  if (isLoading) return <Spinner />;
  if (error) return <div>Error loading questions.</div>;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Question Management</h1>
        <Button className="w-auto" onClick={() => openModal()}>
          Add Question
        </Button>
      </div>
      <div className="mt-6">
        <Table headers={["Competency", "Level", "Question", "Actions"]}>
          {data?.questions.map((q: Question) => (
            <tr key={q._id} className="border-b">
              <td className="p-4 align-middle">{q.competency}</td>
              <td className="p-4 align-middle">{q.level}</td>
              <td className="max-w-sm truncate p-4 align-middle">
                {q.questionText}
              </td>
              <td className="p-4 align-middle">
                <div className="flex gap-2">
                  <Button
                    onClick={() => openModal(q)}
                    className="w-auto bg-blue-600 p-2 hover:bg-blue-700"
                  >
                    <Edit size={16} />
                  </Button>
                  <Button
                    onClick={() => openConfirmModal(q)}
                    className="w-auto bg-red-600 p-2 hover:bg-red-700"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </Table>
        {data?.pages > 1 && (
          <Pagination
            page={data.page}
            pages={data.pages}
            onPageChange={setPage}
          />
        )}
      </div>
      {isModalOpen && (
        <QuestionFormModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSubmit={handleFormSubmit}
          question={selectedQuestion}
          isLoading={isAdding || isUpdating}
        />
      )}
      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={closeConfirmModal}
        onConfirm={handleDelete}
        title="Delete Question"
        message={`Are you sure you want to delete this question? This action cannot be undone.`}
      />
    </div>
  );
};

export default QuestionManagementPage;

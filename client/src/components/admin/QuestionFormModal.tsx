import { Dialog } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type Question } from "../../types";
import { type QuestionFormData, questionSchema } from "../../types/admin";
import Button from "../ui/Button";
import FormError from "../ui/FormError";
import Input from "../ui/Input";
import Label from "../ui/Label";
import Select from "../ui/Select";
import Textarea from "../ui/Textarea";

interface QuestionFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: QuestionFormData) => void;
  question?: Question | null;
  isLoading: boolean;
}

const QuestionFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  question,
  isLoading,
}: QuestionFormModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuestionFormData>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      competency: question?.competency || "",
      level: question?.level || "A1",
      questionText: question?.questionText || "",
      options: question?.options.join(", ") || "",
      correctAnswer: (question as any)?.correctAnswer || "",
    },
  });

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-lg rounded-lg bg-white p-6">
          <Dialog.Title className="text-lg font-bold">
            {question ? "Edit Question" : "Add New Question"}
          </Dialog.Title>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
            <div>
              <Label htmlFor="competency">Competency</Label>
              <Input id="competency" {...register("competency")} />
              <FormError message={errors.competency?.message} />
            </div>
            <div>
              <Label htmlFor="level">Level</Label>
              <Select id="level" {...register("level")}>
                <option>A1</option>
                <option>A2</option>
                <option>B1</option>
                <option>B2</option>
                <option>C1</option>
                <option>C2</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="questionText">Question Text</Label>
              <Textarea id="questionText" {...register("questionText")} />
              <FormError message={errors.questionText?.message} />
            </div>
            <div>
              <Label htmlFor="options">Options (comma-separated)</Label>
              <Textarea id="options" {...register("options")} />
              <FormError message={errors.options?.message} />
            </div>
            <div>
              <Label htmlFor="correctAnswer">Correct Answer</Label>
              <Input id="correctAnswer" {...register("correctAnswer")} />
              <FormError message={errors.correctAnswer?.message} />
            </div>
            <div className="mt-6 flex justify-end gap-4">
              <Button
                type="button"
                onClick={onClose}
                className="bg-gray-200 text-gray-800 hover:bg-gray-300"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default QuestionFormModal;

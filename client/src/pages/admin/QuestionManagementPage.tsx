import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { useGetQuestionsQuery } from "../../api/adminApiSlice";
import Button from "../../components/ui/Button";
import Pagination from "../../components/ui/Pagination";
import Table from "../../components/ui/Table";

const QuestionManagementPage = () => {
  const [page, setPage] = useState(1);
  const { data, error, isLoading } = useGetQuestionsQuery({ page });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading questions.</div>;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Question Management</h1>
        <Button className="w-auto">Add Question</Button>
      </div>
      <div className="mt-6">
        <Table headers={["Competency", "Level", "Question", "Actions"]}>
          {data?.questions.map((q: any) => (
            <tr key={q._id} className="border-b">
              <td className="p-4 align-middle">{q.competency}</td>
              <td className="p-4 align-middle">{q.level}</td>
              <td className="max-w-sm truncate p-4 align-middle">
                {q.questionText}
              </td>
              <td className="p-4 align-middle">
                <div className="flex gap-2">
                  <Button className="w-auto bg-blue-600 p-2 hover:bg-blue-700">
                    <Edit size={16} />
                  </Button>
                  <Button className="w-auto bg-red-600 p-2 hover:bg-red-700">
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
    </div>
  );
};

export default QuestionManagementPage;

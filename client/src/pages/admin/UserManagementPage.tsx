import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { useGetUsersQuery } from "../../api/adminApiSlice";
import Button from "../../components/ui/Button";
import Pagination from "../../components/ui/Pagination";
import Spinner from "../../components/ui/Spinner";
import Table from "../../components/ui/Table";
import { type User } from "../../types";

const UserManagementPage = () => {
  const [page, setPage] = useState(1);
  const { data, error, isLoading } = useGetUsersQuery(page);

  if (isLoading)
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner />
      </div>
    );
  if (error)
    return <div className="text-red-500">Error: Failed to load users.</div>;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">User Management</h1>
        <Button className="w-auto">Add User</Button>
      </div>
      <div className="mt-6">
        <Table headers={["Name", "Email", "Role", "Actions"]}>
          {data?.users.map((user: User) => (
            <tr key={user._id} className="border-b">
              <td className="p-4 align-middle">{user.name}</td>
              <td className="p-4 align-middle">{user.email}</td>
              <td className="p-4 align-middle">
                <span className="rounded-full bg-gray-200 px-2 py-1 text-xs">
                  {user.role}
                </span>
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

export default UserManagementPage;

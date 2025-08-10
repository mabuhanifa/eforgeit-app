import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  useAddUserMutation,
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../../api/adminApiSlice";
import UserFormModal from "../../components/admin/UserFormModal";
import Button from "../../components/ui/Button";
import ConfirmationModal from "../../components/ui/ConfirmationModal";
import Pagination from "../../components/ui/Pagination";
import Spinner from "../../components/ui/Spinner";
import Table from "../../components/ui/Table";
import { type User } from "../../types";
import { type UserFormData } from "../../types/admin";

const UserManagementPage = () => {
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const { data, error, isLoading } = useGetUsersQuery(page);
  const [addUser, { isLoading: isAdding }] = useAddUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const handleFormSubmit = async (formData: UserFormData) => {
    try {
      if (selectedUser) {
        await updateUser({ id: selectedUser._id, ...formData }).unwrap();
        toast.success("User updated successfully");
      } else {
        await addUser(formData).unwrap();
        toast.success("User added successfully");
      }
      closeModal();
    } catch (err: any) {
      toast.error(err.data?.message || "An error occurred");
    }
  };

  const openModal = (user: User | null = null) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  const openConfirmModal = (user: User) => {
    setSelectedUser(user);
    setIsConfirmModalOpen(true);
  };

  const closeConfirmModal = () => {
    setSelectedUser(null);
    setIsConfirmModalOpen(false);
  };

  const handleDelete = async () => {
    if (selectedUser) {
      try {
        await deleteUser(selectedUser._id).unwrap();
        toast.success("User deleted successfully");
        closeConfirmModal();
      } catch (err: any) {
        toast.error(err.data?.message || "Failed to delete user");
      }
    }
  };

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
        <Button className="w-auto" onClick={() => openModal()}>
          Add User
        </Button>
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
                  <Button
                    onClick={() => openModal(user)}
                    className="w-auto bg-blue-600 p-2 hover:bg-blue-700"
                  >
                    <Edit size={16} />
                  </Button>
                  <Button
                    onClick={() => openConfirmModal(user)}
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
        <UserFormModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSubmit={handleFormSubmit}
          user={selectedUser}
          isLoading={isAdding || isUpdating}
        />
      )}
      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={closeConfirmModal}
        onConfirm={handleDelete}
        title="Delete User"
        message={`Are you sure you want to delete the user "${selectedUser?.name}"? This action cannot be undone.`}
      />
    </div>
  );
};

export default UserManagementPage;

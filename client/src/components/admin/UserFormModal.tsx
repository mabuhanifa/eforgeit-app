import { Dialog } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type User } from "../../types";
import { type UserFormData, userSchema } from "../../types/admin";
import Button from "../ui/Button";
import FormError from "../ui/FormError";
import Input from "../ui/Input";
import Label from "../ui/Label";
import Select from "../ui/Select";

interface UserFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: UserFormData) => void;
  user?: User | null;
  isLoading: boolean;
}

const UserFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  user,
  isLoading,
}: UserFormModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      role: user?.role || "Student",
    },
  });

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-lg bg-white p-6">
          <Dialog.Title className="text-lg font-bold">
            {user ? "Edit User" : "Add New User"}
          </Dialog.Title>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...register("name")} />
              <FormError message={errors.name?.message} />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register("email")} />
              <FormError message={errors.email?.message} />
            </div>
            <div>
              <Label htmlFor="role">Role</Label>
              <Select id="role" {...register("role")}>
                <option>Student</option>
                <option>Supervisor</option>
                <option>Admin</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="password">
                Password {user ? "(Leave blank to keep unchanged)" : ""}
              </Label>
              <Input id="password" type="password" {...register("password")} />
              <FormError message={errors.password?.message} />
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

export default UserFormModal;

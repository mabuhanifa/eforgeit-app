import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useResetPasswordMutation } from "../api/authApiSlice";
import Button from "../components/ui/Button";
import FormError from "../components/ui/FormError";
import Input from "../components/ui/Input";
import Label from "../components/ui/Label";
import { type ResetPasswordFormData, resetPasswordSchema } from "../types/auth";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token) {
      toast.error("Invalid or missing reset token.");
      return;
    }
    try {
      await resetPassword({ token, newPassword: data.newPassword }).unwrap();
      toast.success(
        "Password has been reset successfully. You can now log in."
      );
      navigate("/login");
    } catch (err: any) {
      toast.error(err.data?.message || "Failed to reset password");
    }
  };

  return (
    <div className="mx-auto max-w-md">
      <h2 className="mb-6 text-center text-3xl font-extrabold text-gray-900">
        Reset your password
      </h2>
      <p className="mb-4 text-center text-sm text-gray-600">
        Enter your new password below.
      </p>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label htmlFor="newPassword">New Password</Label>
          <div className="mt-1">
            <Input
              id="newPassword"
              type="password"
              {...register("newPassword")}
            />
            <FormError message={errors.newPassword?.message} />
          </div>
        </div>
        <div>
          <Label htmlFor="confirmPassword">Confirm New Password</Label>
          <div className="mt-1">
            <Input
              id="confirmPassword"
              type="password"
              {...register("confirmPassword")}
            />
            <FormError message={errors.confirmPassword?.message} />
          </div>
        </div>
        <div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Resetting..." : "Reset Password"}
          </Button>
        </div>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        Remember your password?{" "}
        <Link
          to="/login"
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default ResetPasswordPage;

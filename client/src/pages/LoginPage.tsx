import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../api/authApiSlice";
import Button from "../components/ui/Button";
import FormError from "../components/ui/FormError";
import Input from "../components/ui/Input";
import Label from "../components/ui/Label";
import { LoginFormData, loginSchema } from "../types/auth";

const LoginPage = () => {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data).unwrap();
      toast.success("Logged in successfully!");
      navigate("/"); // or to a dashboard
    } catch (err: any) {
      toast.error(err.data?.message || "Failed to login");
    }
  };

  return (
    <div className="mx-auto max-w-md">
      <h2 className="mb-6 text-center text-3xl font-extrabold text-gray-900">
        Sign in to your account
      </h2>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label htmlFor="email">Email address</Label>
          <div className="mt-1">
            <Input id="email" type="email" {...register("email")} />
            <FormError message={errors.email?.message} />
          </div>
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <div className="mt-1">
            <Input id="password" type="password" {...register("password")} />
            <FormError message={errors.password?.message} />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <Link
              to="/forgot-password"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Forgot your password?
            </Link>
          </div>
        </div>
        <div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </div>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Register here
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;

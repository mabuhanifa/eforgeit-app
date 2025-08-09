import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../api/authApiSlice";
import Button from "../components/ui/Button";
import FormError from "../components/ui/FormError";
import Input from "../components/ui/Input";
import Label from "../components/ui/Label";
import { RegisterFormData, registerSchema } from "../types/auth";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser(data).unwrap();
      toast.success(
        "Registration successful! Please check your email to verify your account."
      );
      navigate("/verify-otp"); // Redirect to OTP page
    } catch (err: any) {
      toast.error(err.data?.message || "Registration failed");
    }
  };

  return (
    <div className="mx-auto max-w-md">
      <h2 className="mb-6 text-center text-3xl font-extrabold text-gray-900">
        Create your account
      </h2>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label htmlFor="name">Name</Label>
          <div className="mt-1">
            <Input id="name" type="text" {...register("name")} />
            <FormError message={errors.name?.message} />
          </div>
        </div>
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
        <div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Registering..." : "Register"}
          </Button>
        </div>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{" "}
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

export default RegisterPage;

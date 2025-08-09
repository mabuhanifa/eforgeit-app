import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSendOtpMutation, useVerifyOtpMutation } from "../api/authApiSlice";
import Button from "../components/ui/Button";
import FormError from "../components/ui/FormError";
import Input from "../components/ui/Input";
import Label from "../components/ui/Label";
import { type OtpFormData, otpSchema } from "../types/auth";

const OtpVerificationPage = () => {
  const navigate = useNavigate();
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const [sendOtp, { isLoading: isResending }] = useSendOtpMutation();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<OtpFormData>({
    resolver: zodResolver(otpSchema),
  });

  const onSubmit = async (data: OtpFormData) => {
    try {
      await verifyOtp(data).unwrap();
      toast.success("Account verified successfully! You can now log in.");
      navigate("/login");
    } catch (err: any) {
      toast.error(err.data?.message || "OTP verification failed");
    }
  };

  const handleResendOtp = async () => {
    const email = getValues("email");
    if (!email) {
      toast.error("Please enter your email address first.");
      return;
    }
    try {
      await sendOtp({ email }).unwrap();
      toast.success("A new OTP has been sent to your email.");
    } catch (err: any) {
      toast.error(err.data?.message || "Failed to resend OTP");
    }
  };

  return (
    <div className="mx-auto max-w-md">
      <h2 className="mb-6 text-center text-3xl font-extrabold text-gray-900">
        Verify your account
      </h2>
      <p className="mb-4 text-center text-sm text-gray-600">
        Enter your email and the 6-digit code we sent you.
      </p>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label htmlFor="email">Email Address</Label>
          <div className="mt-1">
            <Input id="email" type="email" {...register("email")} />
            <FormError message={errors.email?.message} />
          </div>
        </div>
        <div>
          <Label htmlFor="otp">One-Time Password (OTP)</Label>
          <div className="mt-1">
            <Input id="otp" type="text" {...register("otp")} />
            <FormError message={errors.otp?.message} />
          </div>
        </div>
        <div>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Verifying..." : "Verify"}
          </Button>
        </div>
      </form>
      <div className="mt-4 text-center">
        <button
          onClick={handleResendOtp}
          disabled={isResending}
          className="text-sm font-medium text-indigo-600 hover:text-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isResending ? "Resending..." : "Resend OTP"}
        </button>
      </div>
    </div>
  );
};

export default OtpVerificationPage;

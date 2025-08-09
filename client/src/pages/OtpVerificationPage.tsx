import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Label from "../components/ui/Label";

const OtpVerificationPage = () => {
  // TODO: Add form handling logic
  return (
    <div className="mx-auto max-w-md">
      <h2 className="mb-6 text-center text-3xl font-extrabold text-gray-900">
        Verify your account
      </h2>
      <p className="mb-4 text-center text-sm text-gray-600">
        We've sent a 6-digit code to your email. Please enter it below.
      </p>
      <form className="space-y-6">
        <div>
          <Label htmlFor="otp">One-Time Password (OTP)</Label>
          <div className="mt-1">
            <Input id="otp" name="otp" type="text" required />
          </div>
        </div>
        <div>
          <Button type="submit">Verify</Button>
        </div>
      </form>
      <div className="mt-4 text-center">
        <button className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
          Resend OTP
        </button>
      </div>
    </div>
  );
};

export default OtpVerificationPage;

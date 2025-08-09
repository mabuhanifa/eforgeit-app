import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Label from "../components/ui/Label";

const ResetPasswordPage = () => {
  return (
    <div className="mx-auto max-w-md">
      <h2 className="mb-6 text-center text-3xl font-extrabold text-gray-900">
        Reset your password
      </h2>
      <p className="mb-4 text-center text-sm text-gray-600">
        Enter your new password below.
      </p>
      <form className="space-y-6">
        <div>
          <Label htmlFor="password">New Password</Label>
          <div className="mt-1">
            <Input id="password" name="password" type="password" required />
          </div>
        </div>
        <div>
          <Label htmlFor="confirmPassword">Confirm New Password</Label>
          <div className="mt-1">
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              required
            />
          </div>
        </div>
        <div>
          <Button type="submit">Reset Password</Button>
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

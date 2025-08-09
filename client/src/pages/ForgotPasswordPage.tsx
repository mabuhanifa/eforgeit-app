import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Label from "../components/ui/Label";

const ForgotPasswordPage = () => {
  // TODO: Add form handling logic
  return (
    <div className="mx-auto max-w-md">
      <h2 className="mb-6 text-center text-3xl font-extrabold text-gray-900">
        Forgot your password?
      </h2>
      <p className="mb-4 text-center text-sm text-gray-600">
        Enter your email address and we'll send you a link to reset your
        password.
      </p>
      <form className="space-y-6">
        <div>
          <Label htmlFor="email">Email address</Label>
          <div className="mt-1">
            <Input id="email" name="email" type="email" required />
          </div>
        </div>
        <div>
          <Button type="submit">Send Reset Link</Button>
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

export default ForgotPasswordPage;

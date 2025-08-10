import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { useHealthCheckQuery } from "./api/appApiSlice";
import AdminLayout from "./components/admin/AdminLayout";
import AdminProtectedRoute from "./components/admin/AdminProtectedRoute";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import { setApiReady } from "./features/app/appSlice";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import QuestionManagementPage from "./pages/admin/QuestionManagementPage";
import UserManagementPage from "./pages/admin/UserManagementPage";
import AssessmentPage from "./pages/AssessmentPage";
import AssessmentResultPage from "./pages/AssessmentResultPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import OtpVerificationPage from "./pages/OtpVerificationPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

export default function App() {
  const dispatch = useDispatch();
  const { isSuccess, isError } = useHealthCheckQuery();

  useEffect(() => {
    if (isSuccess || isError) {
      dispatch(setApiReady(true));
    }
  }, [isSuccess, isError, dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="verify-otp" element={<OtpVerificationPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="reset-password/:token" element={<ResetPasswordPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="profile" element={<ProfilePage />} />
          <Route path="assessment/take" element={<AssessmentPage />} />
          <Route
            path="assessment/result/:id"
            element={<AssessmentResultPage />}
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route element={<AdminProtectedRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="users" element={<UserManagementPage />} />
          <Route path="questions" element={<QuestionManagementPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

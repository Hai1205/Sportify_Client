import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../layout/AuthLayout";
import Input from "./components/Input";
import Button from "./components/Button";
import { useAuthStore } from "@/stores/useAuthStore";

const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const { sendOTP } = useAuthStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError("");
  };

  const validate = () => {
    if (!email.trim()) {
      setError("Email is required");
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Email is invalid");
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    sendOTP(email);

    if (!validate()) {
      return;
    }
    navigate("/verify-otp", { state: { email, isPasswordReset: true } });
  };

  return (
    <AuthLayout title="Reset your password">
      <p className="text-gray-400 text-sm mb-6">
        Enter your email address and we'll send you a code to reset your
        password.
      </p>

      <form onSubmit={handleSubmit}>
        <Input
          label="Email"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleChange}
          error={error}
        />

        <Button type="submit" variant="primary" fullWidth className="mt-6 mb-4">
          SEND CODE
        </Button>

        <div className="text-center">
          <a
            href="#"
            onClick={() => navigate("/login")}
            className="text-white hover:text-[#1DB954] text-sm underline"
          >
            Back to login
          </a>
        </div>
      </form>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;

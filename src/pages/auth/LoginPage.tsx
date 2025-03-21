import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../layout/AuthLayout";
import Input from "./components/Input";
import Button from "./components/Button";
import { useAuthStore } from "@/stores/useAuthStore";
import { GoogleLoginButton } from "@/components/ui/0auth";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { login } = useAuthStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    const data = new FormData();
    data.append("username", formData.username);
    data.append("password", formData.password);

    const { user, isVerified } = await login(data);
    
    if (!user) {
      return;
    }

    if (!isVerified) {
      navigate("/verify-otp", {
        state: { email: user?.email, isPasswordReset: false },
      });

      return;
    }

    navigate("/");
  };

  return (
    <AuthLayout title="Log in to Spotify">
      <form onSubmit={handleSubmit}>
        <Input
          label="Username"
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          error={errors.username}
        />

        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
        />

        <div className="mb-6">
          <a
            href="#"
            onClick={() => navigate("/forgot-password")}
            className="text-white hover:text-[#1DB954] text-sm underline"
          >
            Forgot your password?
          </a>
        </div>

        <div className="flex items-center justify-between mb-6">
          <Button type="submit" variant="primary" className="w-full">
            LOG IN
          </Button>
        </div>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-600"></div>
        </div>

        <div className="relative flex justify-center">
          <span className="bg-[#121212] px-4 text-sm text-gray-400">OR</span>
        </div>
      </div>

      {/* <Button
        variant="outline"
        fullWidth
        className="mb-6"
        onClick={() => console.log("Google login")}
      >
        <div className="flex items-center justify-center">
          <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81z"
            />
          </svg>
          Continue with Google
        </div>
      </Button> */}
      <GoogleLoginButton />

      <div className="text-center">
        <p className="text-white text-sm">
          Don't have an account?{" "}
          <a
            onClick={() => navigate("/register")}
            className="text-white hover:text-[#1DB954] underline cursor-pointer"
          >
            Sign up for Spotify
          </a>
        </p>
      </div>
    </AuthLayout>
  );
};

export default LoginPage;

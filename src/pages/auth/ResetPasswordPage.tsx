"use client";

import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../layout/AuthLayout";
import Input from "./components/Input";
import Button from "./components/Button";
import { useAuthStore } from "@/stores/useAuthStore";

const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    newPassword: "",
    rePassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { user: userAuth, forgotPassword } = useAuthStore();

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
    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    }

    if (!formData.rePassword) {
      newErrors.rePassword = "Please confirm your password";
    } else if (formData.newPassword !== formData.rePassword) {
      newErrors.rePassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!userAuth) {
      return;
    }

    const data = new FormData();
    data.append("newPassword", formData.newPassword);
    data.append("rePassword", formData.rePassword);
    
    forgotPassword(userAuth?.id, data);

    if (!validate()) {
      return;
    }

    navigate("/login");
  };

  return (
    <AuthLayout title="Reset your password">
      <form onSubmit={handleSubmit}>
        <Input
          label="New password"
          type="password"
          name="newPassword"
          placeholder="Enter new password"
          value={formData.newPassword}
          onChange={handleChange}
          error={errors.newPassword}
        />

        <Input
          label="Confirm password"
          type="password"
          name="rePassword"
          placeholder="Confirm new password"
          value={formData.rePassword}
          onChange={handleChange}
          error={errors.rePassword}
        />

        <Button type="submit" variant="primary" fullWidth className="mt-6 mb-4">
          RESET PASSWORD
        </Button>
      </form>
    </AuthLayout>
  );
};

export default ResetPasswordPage;

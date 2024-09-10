// File: components/ResetForm.tsx
"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { TextField, Button, Typography } from "@mui/material";
import axios from "axios";

const ResetForm: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await axios.post(
        `http://localhost:5000/api/auth/reset-password/${token}`,
        {
          password,
        }
      );
      setSuccess("Password has been reset successfully. You can now log in.");
      router.push("/login"); // Redirect to login page after success
    } catch (error) {
      setError("Failed to reset password. Please try again.");
      console.error("Reset password error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="password"
        label="New Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-4"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="confirmPassword"
        label="Confirm New Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="mb-4"
      />
      {error && (
        <Typography color="error" variant="body2" className="mt-2 text-center">
          {error}
        </Typography>
      )}
      {success && (
        <Typography
          color="primary"
          variant="body2"
          className="mt-2 text-center"
        >
          {success}
        </Typography>
      )}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        className="mt-6 bg-blue-600 hover:bg-blue-700 transition-all duration-300"
      >
        Reset Password
      </Button>
    </form>
  );
};

export default ResetForm;

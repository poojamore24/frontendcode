// utils/auth.ts

interface User {
  id: string;
  email: string;
  role: Role;
}

interface LoginFormData {
  email: string;
  password: string;
  role: Role;
}

interface SignupFormData {
  role: Role;
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  classYear?: string;
  schoolName?: string;
  city: string;
  address: string;
  hostelName?: string;
  hostelDetails?: string;
  idProof?: string;
}

export type Role = "student" | "owner" | "admin";
// This is a mock function. Replace it with actual API calls in a real application.
export async function login(
  formData: Omit<LoginFormData, "role">
): Promise<User> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Mock user data - in a real app, this would come from your backend
  const users: User[] = [
    { id: "1", email: "student@example.com", role: "student" },
    { id: "2", email: "owner@example.com", role: "owner" },
    { id: "3", email: "admin@example.com", role: "admin" },
  ];

  const user = users.find((u) => u.email === formData.email);

  if (user) {
    // In a real app, you would validate the password here
    return user;
  } else {
    throw new Error("User not found");
  }
}

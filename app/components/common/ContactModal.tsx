"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { X } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  email: string;
  phoneNumber: string;
  userType: "Individual" | "Agent";
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phoneNumber: "",
    userType: "Individual",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        <h2 className="text-xl font-bold mb-4">Enter your contact details</h2>
        <p className="text-sm text-gray-600 mb-4">
          Get notified whenever there's a new match for you.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4 flex">
            <select
              className="p-2 border border-gray-300 rounded-l"
              defaultValue="IND +91"
            >
              <option value="IND +91">IND +91</option>
              {/* Add more country codes as needed */}
            </select>
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Mobile Number"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="flex-grow p-2 border border-gray-300 rounded-r"
              required
            />
          </div>
          <div className="mb-4 flex space-x-2">
            <button
              type="button"
              className={`flex-1 py-2 px-4 rounded ${
                formData.userType === "Individual"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() =>
                setFormData({ ...formData, userType: "Individual" })
              }
            >
              Individual
            </button>
            <button
              type="button"
              className={`flex-1 py-2 px-4 rounded ${
                formData.userType === "Agent"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-200 text-gray-700"
              }`}
              onClick={() => setFormData({ ...formData, userType: "Agent" })}
            >
              Agent
            </button>
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" required />
              <span className="text-sm text-gray-600">
                I Agree to{" "}
                <a href="#" className="text-blue-600">
                  T&C
                </a>
                ,{" "}
                <a href="#" className="text-blue-600">
                  Privacy Policy
                </a>{" "}
                &{" "}
                <a href="#" className="text-blue-600">
                  Cookie Policy
                </a>
              </span>
            </label>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactModal;

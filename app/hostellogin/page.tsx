"use client";
import React, { useEffect, useState } from "react";
import { motion, MotionValue } from "framer-motion";
import {
  UserPlus,
  LogIn,
  Link,
  School,
  Linkedin,
  Youtube,
  MessageCircle,
  X,
  Bell,
  Star,
  Zap,
  ShieldX,
  TrendingUp,
  Shield,
  ChevronDown,
} from "lucide-react";

import Image from "next/image";

import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  Email,
  Facebook,
  FileUpload,
  Home,
  Instagram,
  LocationCity,
  Lock,
  Person,
  Phone,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";

import { AnimatePresence } from "framer-motion";
import { Mail } from "lucide-react";
interface PlanCardProps {
  title: string;
  features: string[];
  buttonText: string;
  isPrime?: boolean;
}
type FormErrors = {
  name?: string;
  roleName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  number?: string;
  city?: string;
  class?: string;
  year?: string;
  school?: string;
  passportPhoto?: string;
  idProof?: string;
  address?: string;
};

interface FormData {
  roleName: string;
  name: string;
  email: string;
  password: string;
  number: string;
  class: string;
  year: string;
  school: string;
  confirmPassword: string;
  city: string;
  address: string;
  idProof: File | null;
  passportPhoto: File | null;
}
interface NotificationProps {
  message: string;
  onDismiss: () => void;
}
interface EnhancedLoginFormProps {
  toggleForm: () => void; // Adjust the type if toggleForm has parameters or a different return type
}

const PlanCard: React.FC<PlanCardProps> = ({
  title,
  features,
  buttonText,
  isPrime = false,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className={`w-full p-6 bg-white rounded-lg shadow-lg ${
      isPrime ? "border-2 border-indigo-500" : ""
    } mb-6`}
  >
    <h3
      className={`text-2xl font-semibold mb-4 ${
        isPrime ? "text-indigo-700" : "text-gray-800"
      }`}
    >
      {title}
    </h3>
    <ul className="space-y-2 mb-6">
      {features.map((item, index) => (
        <motion.li
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center text-gray-600"
        >
          <svg
            className={`w-5 h-5 mr-2 ${
              isPrime ? "text-indigo-500" : "text-green-500"
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
          {item}
        </motion.li>
      ))}
    </ul>
    <div className="flex justify-end">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`ml-auto px-4 py-1 rounded-lg font-semibold transition duration-300 ${
          isPrime
            ? "bg-indigo-600 text-white hover:bg-indigo-700"
            : "bg-green-500 text-white hover:bg-green-600"
        }`}
      >
        {buttonText}
      </motion.button>
    </div>
  </motion.div>
);

// Define the HostelOwnerPromo component
const HostelOwnerPromo: React.FC = () => (
  <div className="p-8 bg-gray-100">
    <h2 className="text-1.5xl font-bold mb-8 text-center text-indigo-700">
      "Hostels' Ultimate Online Management Solution"
    </h2>
    <div className="flex flex-col space-y-6">
      <PlanCard
        title="Free Plan"
        features={["Basic booking management", "Limited guest profiles"]}
        buttonText="Start Free Trial"
      />
      <PlanCard
        title="Prime Plan"
        features={[
          "24/7 priority support",
          "Customizable dashboard",
          "Integration with external services",
        ]}
        buttonText="Upgrade to Prime"
        isPrime={true}
      />
    </div>
  </div>
);

const BotMessage = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-20 right-4 bg-white rounded-lg shadow-lg p-4 max-w-sm"
        >
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            <X size={16} />
          </button>
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <MessageCircle className="h-10 w-10 text-indigo-500" />
            </div>
            <div>
              <p className="font-semibold text-gray-800">Hey owner!</p>
              <p className="text-sm text-gray-600 mt-1">
                Hurry up and list your hostel on our website! Join our family of
                successful hostel owners today.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-2 bg-indigo-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-indigo-600 transition duration-300"
              >
                List My Hostel Now
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
const Notification: React.FC<NotificationProps> = ({ message, onDismiss }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className="bg-white rounded-lg shadow-lg p-4 mb-4 max-w-sm w-full mt-20"
    >
      <button
        onClick={onDismiss}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      >
        <X size={16} />
      </button>
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <Bell className="h-6 w-6 text-yellow-500" />
        </div>
        <p className="text-sm text-gray-600">{message}</p>
      </div>
    </motion.div>
  );
};

const NotificationSystem = () => {
  const [notifications, setNotifications] = useState<string[]>([]);
  const [currentNotification, setCurrentNotification] = useState<string | null>(
    null
  );

  const facilities = [
    "Easy booking management system",
    "Real-time availability updates",
    "Automated payment processing",
    "Integrated guest communication tools",
    "Comprehensive performance analytics",
  ];
  useEffect(() => {
    setNotifications(facilities);
  }, [facilities]); // Added `facilities` as a dependency

  useEffect(() => {
    if (notifications.length > 0 && !currentNotification) {
      setCurrentNotification(notifications[0]);
      setNotifications(notifications.slice(1));
    }
  }, [notifications, currentNotification]);

  const dismissNotification = () => {
    setCurrentNotification(null);
  };

  return (
    <div className="fixed top-6 left-6 z-50">
      <AnimatePresence>
        {currentNotification && (
          <Notification
            message={currentNotification}
            onDismiss={dismissNotification}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
const PrimeFeatures = () => {
  const features = [
    {
      icon: Star,
      title: "Premium Listing",
      description: "Get top visibility with our premium listing option",
    },
    {
      icon: Zap,
      title: "Instant Booking",
      description:
        "Enable guests to book instantly, increasing your occupancy rate",
    },
    {
      icon: TrendingUp,
      title: "Dynamic Pricing",
      description: "Optimize your pricing based on demand and seasonality",
    },
    {
      icon: Shield,
      title: "Advanced Security",
      description: "Protect your business with our advanced security features",
    },
  ];

  const scrollToSignup = () => {
    const signupElement = document.getElementById("signup-section");
    if (signupElement) {
      signupElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col justify-center items-center py-20 px-4 sm:px-6 lg:px-8 relative"
      style={{
        backgroundImage: "url('/Images/spacious.jpg')", // Replace with your image path
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="max-w-7xl w-full relative z-10">
        <h2 className="text-4xl font-extrabold text-white text-center mb-12">
          Prime Features
        </h2>
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg overflow-hidden shadow-lg rounded-lg transform hover:scale-105 transition duration-300"
              >
                <div className="p-8">
                  <div className="flex items-center justify-center mb-6">
                    <IconComponent className="h-12 w-12 text-indigo-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-white text-center mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-base text-gray-200 text-center">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
        <div className="flex justify-center mt-16">
          <motion.button
            onClick={scrollToSignup}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-4 rounded-full flex items-center text-lg font-semibold shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
          >
            Sign Up Now <ChevronDown className="ml-2 h-6 w-6" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

const HostelOwnerAuth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const toggleForm = () => setIsSignUp(!isSignUp);

  useEffect(() => {
    const handleScroll = () => {
      const signupSection = document.getElementById("signup-section");
      if (signupSection) {
        const rect = signupSection.getBoundingClientRect();
        setShowSignup(rect.top <= window.innerHeight);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/Images/spacious.jpg')",
      }}
    >
      <div className="bg-white bg-opacity-80 w-full">
        <PrimeFeatures />
      </div>

      <div
        id="signup-section"
        className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
      >
        {showSignup && (
          <div className="m-auto bg-white bg-opacity-90 rounded-xl shadow-2xl overflow-hidden w-full max-w-5xl flex">
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={isSignUp ? "signup" : "login"}
                initial={{ opacity: 0, x: isSignUp ? 300 : -300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isSignUp ? -300 : 300 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="w-full md:w-1/2 p-8 bg-gradient-to-br from-purple-400 to-indigo-600 flex items-center justify-center"
              >
                <div className="w-full max-w-md">
                  {isSignUp ? (
                    <SignupForm toggleForm={toggleForm} />
                  ) : (
                    <EnhancedLoginForm toggleForm={toggleForm} />
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="hidden md:block w-1/2">
              <HostelOwnerPromo />
            </div>
          </div>
        )}
      </div>

      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="mb-4 md:mb-0">
              <Image
                src={"/Images/HostelLogo4.png"}
                alt="Stanza Living"
                width={150}
                height={50}
                className="rounded-lg"
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="flex flex-col space-y-2">
                <h3 className="font-semibold text-white">About Us</h3>
                <a href="#" className="text-gray-300 hover:text-white">
                  Team
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  Investor Relations
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  Media
                </a>
              </div>
              <div className="flex flex-col space-y-2">
                <h3 className="font-semibold text-white">Blogs</h3>
                <a href="#" className="text-gray-300 hover:text-white">
                  FAQs
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  Refer and Earn
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  House Rules
                </a>
              </div>
              <div className="flex flex-col space-y-2">
                <h3 className="font-semibold text-white">T&C</h3>
                <a href="#" className="text-gray-300 hover:text-white">
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  Contact Us
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  COVID-19
                </a>
              </div>
              <div className="flex flex-col space-y-2">
                <h3 className="font-semibold text-white">Partner With Us</h3>
                <a href="#" className="text-gray-300 hover:text-white">
                  Cookie Policy
                </a>
              </div>
            </div>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" aria-label="Facebook">
                <Facebook className="text-white hover:text-blue-500" />
              </a>
              <a href="#" aria-label="LinkedIn">
                <Linkedin className="text-white hover:text-blue-700" />
              </a>
              <a href="#" aria-label="Instagram">
                <Instagram className="text-white hover:text-pink-500" />
              </a>
              <a href="#" aria-label="YouTube">
                <Youtube className="text-white hover:text-red-600" />
              </a>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>
              Copyright © 2024 | All Rights Reserved by Dtwelve Spaces Pvt Ltd.
              |{" "}
              <a href="#" className="hover:text-white">
                Sitemap
              </a>
            </p>
            <p className="mt-2 md:mt-0">
              Images shown are for representational purposes only. Amenities
              depicted may or may not form a part of that individual property.
            </p>
          </div>
        </div>
        <div className="fixed bottom-4 right-4">
          <a href="#" aria-label="WhatsApp">
            <div className="bg-green-500 p-3 rounded-full shadow-lg hover:bg-green-600 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
            </div>
          </a>
        </div>
      </footer>

      {/* WhatsApp buttons */}
      <div className="fixed bottom-4 right-4">
        <a href="#" aria-label="WhatsApp">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-green-500 p-3 rounded-full shadow-lg hover:bg-green-600 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
          </motion.div>
        </a>
      </div>
      <BotMessage />
      <NotificationSystem />
    </div>
  );
};

const SignupForm: React.FC<{ toggleForm: () => void }> = ({ toggleForm }) => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    roleName: "hostelOwner",
    name: "",
    email: "",
    password: "",
    number: "",
    class: "",
    year: "",
    school: "",
    confirmPassword: "",
    city: "",
    address: "",
    idProof: null,
    passportPhoto: null,
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [roles, setRoles] = useState<string[]>([]);
  const [activeStep, setActiveStep] = useState(0);
  const [otpSent, setOtpSent] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    axios
      .get("https://hostelproject-backend-coed.onrender.com/api/admin/getroles")
      .then((response) => {
        const filteredRoles = response.data
          .filter((role: { name: string }) => role.name === "hostelOwner")
          .map((role: { name: string }) => role.name);
        setRoles(filteredRoles);
      })
      .catch((error) => console.error("Error fetching roles:", error));
  }, []);

  const validateField = (
    name: keyof FormData,
    value: string | File | null
  ): string => {
    switch (name) {
      case "name":
        return value && /^[A-Za-z ]+$/.test(value as string)
          ? ""
          : "Only letters and spaces allowed";
      case "email":
        return value &&
          /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(value as string)
          ? ""
          : "Invalid email format";
      case "password":
        return (value as string).length >= 8
          ? ""
          : "Password must be at least 8 characters long";
      case "confirmPassword":
        return value === formData.password ? "" : "Passwords do not match";
      case "number":
        return /^[0-9]{10}$/.test(value as string)
          ? ""
          : "Phone number must be 10 digits";
      case "class":
        return /^[A-Za-z0-9 ]+$/.test(value as string)
          ? ""
          : "Class can contain letters, numbers, and spaces";
      case "year":
        return /^[0-9]{4}$/.test(value as string)
          ? ""
          : "Year must be a 4-digit number";
      case "school":
        return /^[A-Za-z0-9 ]+$/.test(value as string)
          ? ""
          : "School name can contain letters, numbers, and spaces";
      case "city":
        return /^[A-Za-z ]+$/.test(value as string)
          ? ""
          : "City can contain only letters and spaces";
      case "address":
        return (value as string).trim() !== "" ? "" : "Address cannot be empty";
      default:
        return "";
    }
  };

  // const handleChange = (
  //   e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  // ) => {
  //   const { name, value, files } = e.target as HTMLInputElement & {
  //     files?: FileList;
  //   };
  //   let newValue: string | File | null = value as string;
  //   if (name === "passportPhoto" && files) {
  //     newValue = files[0];
  //   } else if (name === "idProof" && files) {
  //     newValue = files[0];
  //   }

  //   console.log(`Updating ${name} with value:`, newValue);

  //   setFormData((prev) => {
  //     const updated = { ...prev, [name as string]: newValue };
  //     console.log("Updated formData:", updated);
  //     return updated;
  //   });

  //   const error = validateField(name as keyof FormData, newValue);
  //   setFormErrors((prev: any) => ({ ...prev, [name]: error }));
  // };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
      | SelectChangeEvent<string>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement & {
      files?: FileList;
    };

    // Handle SelectChangeEvent separately
    if ("value" in e) {
      const newValue = e.target.value;
      setFormData((prev) => ({
        ...prev,
        [name as keyof FormData]: newValue,
      }));
      const error = validateField(
        name as keyof FormData,
        newValue as string | File | null
      );
      setFormErrors((prev) => ({
        ...prev,
        [name as keyof FormErrors]: error,
      }));
    } else {
      let newValue: string | File | null = value as string;
      if (name === "passportPhoto" && files) {
        newValue = files[0];
      } else if (name === "idProof" && files) {
        newValue = files[0];
      }

      setFormData((prev) => ({
        ...prev,
        [name as keyof FormData]: newValue,
      }));

      const error = validateField(name as keyof FormData, newValue);
      setFormErrors((prev) => ({
        ...prev,
        [name as keyof FormErrors]: error,
      }));
    }
  };

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault(); // Prevent default if event is provided
    setIsLoading(true);
    console.log("Signup pressed");
    console.log("Current formData:", formData);

    try {
      if (!otpSent) {
        console.log(
          "Sending registration request for role:",
          formData.roleName
        );
        const response = await axios.post(
          "https://hostelproject-backend-coed.onrender.com/api/auth/register",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Signup response:", response.data);
        setOtpSent(true);
        setUserId(response.data.userId);
      } else {
        const verifyResponse = await axios.post(
          "https://hostelproject-backend-coed.onrender.com/api/auth/verify-registration-otp",
          {
            userId: userId,
            otp: otp,
          }
        );
        console.log("OTP verification response:", verifyResponse.data);
        if (
          verifyResponse.data.message === "Registration completed successfully"
        ) {
          setTimeout(() => setIsLoading(false), 2000);
          router.push("/login");
        }
      }
    } catch (error) {
      console.error("Error during signup:", error);
    }
  };

  const commonInputProps = {
    fullWidth: true,
    variant: "outlined" as const,
    margin: "normal" as const,
    className: "mb-4",
  };

  const steps = ["Basic Info", "Additional Info", "Finish"];

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <>
            <Grid item xs={12}>
              <FormControl
                fullWidth
                margin="normal"
                error={!!formErrors.roleName}
              >
                <InputLabel id="roleName-label">Role</InputLabel>
                <Select
                  labelId="roleName-label"
                  name="roleName"
                  value={formData.roleName}
                  label="Role"
                  onChange={(e: SelectChangeEvent<string>) => handleChange(e)}
                >
                  {roles.map((role) => (
                    <MenuItem key={role} value={role}>
                      {role.charAt(0).toUpperCase() + role.slice(1)}
                    </MenuItem>
                  ))}
                </Select>

                {formErrors.roleName && (
                  <FormHelperText>{formErrors.roleName}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...commonInputProps}
                name="name"
                required
                label="Name"
                value={formData.name}
                onChange={handleChange}
                error={!!formErrors.name}
                helperText={formErrors.name}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person className="text-gray-400" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...commonInputProps}
                name="email"
                required
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={!!formErrors.email}
                helperText={formErrors.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email className="text-gray-400" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...commonInputProps}
                name="password"
                required
                label="Password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                error={!!formErrors.password}
                helperText={formErrors.password}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock className="text-gray-400" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                margin="normal"
                name="confirmPassword"
                required
                label="Confirm Password"
                type={showPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                error={!!formErrors.confirmPassword}
                helperText={formErrors.confirmPassword}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock className="text-gray-400" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </>
        );
      case 1:
        return (
          <>
            <Grid item xs={12}>
              <TextField
                {...commonInputProps}
                name="number"
                required
                label="Phone Number"
                value={formData.number}
                onChange={handleChange}
                error={!!formErrors.number}
                helperText={formErrors.number}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone className="text-gray-400" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            {formData.roleName === "hostelOwner" && (
              <Grid item xs={12}>
                <TextField
                  {...commonInputProps}
                  name="city"
                  required
                  label="City"
                  value={formData.city}
                  onChange={handleChange}
                  error={!!formErrors.city}
                  helperText={formErrors.city}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationCity className="text-gray-400" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            )}
            {formData.roleName === "student" && (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    {...commonInputProps}
                    name="class"
                    required
                    label="Class"
                    value={formData.class}
                    onChange={handleChange}
                    error={!!formErrors.class}
                    helperText={formErrors.class}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <School className="text-gray-400" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    {...commonInputProps}
                    name="year"
                    required
                    label="Year"
                    value={formData.year}
                    onChange={handleChange}
                    error={!!formErrors.year}
                    helperText={formErrors.year}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <School className="text-gray-400" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    {...commonInputProps}
                    name="school"
                    required
                    label="School/College Name"
                    value={formData.school}
                    onChange={handleChange}
                    error={!!formErrors.school}
                    helperText={formErrors.school}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <School className="text-gray-400" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    {...commonInputProps}
                    name="city"
                    required
                    label="City"
                    value={formData.city}
                    onChange={handleChange}
                    error={!!formErrors.city}
                    helperText={formErrors.city}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LocationCity className="text-gray-400" />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </>
            )}
          </>
        );
      case 2:
        return (
          <>
            {formData.roleName === "student" && (
              <Grid item xs={12}>
                <input
                  accept="image/*"
                  type="file"
                  name="passportPhoto"
                  onChange={handleChange}
                  style={{ display: "none" }}
                  id="passport-photo-upload"
                />
                <label htmlFor="passport-photo-upload">
                  <Button
                    variant="outlined"
                    component="span"
                    startIcon={<FileUpload />}
                    fullWidth
                    className="mt-2"
                  >
                    Upload Passport Photo
                  </Button>
                </label>
                {formErrors.passportPhoto && (
                  <FormHelperText error>
                    {formErrors.passportPhoto}
                  </FormHelperText>
                )}
              </Grid>
            )}
            {formData.roleName === "hostelOwner" && (
              <Grid item xs={12}>
                <input
                  accept="image/*"
                  type="file"
                  name="idProof"
                  onChange={handleChange}
                  style={{ display: "none" }}
                  id="id-proof-upload"
                />
                <label htmlFor="id-proof-upload">
                  <Button
                    variant="outlined"
                    component="span"
                    startIcon={<FileUpload />}
                    fullWidth
                    className="mt-2"
                  >
                    Upload ID Proof
                  </Button>
                </label>
                {formErrors.idProof && (
                  <FormHelperText error>{formErrors.idProof}</FormHelperText>
                )}
              </Grid>
            )}
            <Grid item xs={12}>
              <TextField
                {...commonInputProps}
                name="address"
                required
                label="Address"
                multiline
                rows={3}
                value={formData.address}
                onChange={handleChange}
                error={!!formErrors.address}
                helperText={formErrors.address}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Home className="text-gray-400" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </>
        );
      default:
        return "Unknown step";
    }
  };
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: "100%",
        height: "100%",
        maxWidth: "400px",
        bgcolor: "gray",
        margin: "auto",
        padding: 3,
        backgroundColor: "white",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h5" component="h2" align="center" gutterBottom>
        Create Account
      </Typography>

      <Stepper
        activeStep={activeStep}
        alternativeLabel
        sx={{ marginBottom: 3 }}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ marginBottom: 2 }}>
        {getStepContent(activeStep)}
        {otpSent && (
          <TextField
            fullWidth
            size="small"
            label="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            margin="normal"
          />
        )}
      </Box>

      <Box
        sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}
      >
        <Button
          disabled={activeStep === 0 || otpSent}
          onClick={() => setActiveStep((prevActiveStep) => prevActiveStep - 1)}
        >
          Back
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            if (activeStep === steps.length - 1 || otpSent) {
              handleSubmit(); // Call the function directly
            } else {
              setActiveStep((prevActiveStep) => prevActiveStep + 1);
            }
          }}
        >
          {otpSent
            ? "Verify OTP"
            : activeStep === steps.length - 1
            ? "Sign Up"
            : "Next"}
        </Button>
      </Box>

      <Typography variant="body2" align="center" sx={{ marginTop: 2 }}>
        Already have an account?{" "}
        <Button color="primary" onClick={toggleForm}>
          Sign in
        </Button>
      </Typography>
    </Box>
  );
};

const EnhancedLoginForm: React.FC<EnhancedLoginFormProps> = ({
  toggleForm,
}) => {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [openForgotPassword, setOpenForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://hostelproject-backend-coed.onrender.com/api/auth/login",
        {
          ...formData,
          email: formData.email.toLowerCase(),
        }
      );

      const user = response.data;
      localStorage.setItem("email", formData.email.toLowerCase());
      localStorage.setItem("role", user.role);
      localStorage.setItem("token", user.token);
      localStorage.setItem("profileId", user.profileId);

      switch (user.role) {
        case "student":
          router.push("/explore");
          break;
        case "hostelOwner":
          router.push("/dashboard/hostelOwner");
          break;
        case "admin":
          router.push("/admin");
          break;
        default:
          router.push("/customizeDashboard");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message || "An error occurred during login."
        );
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setTimeout(() => setIsLoading(false), 2000);
    }
  };

  const handleForgotPassword = () => setOpenForgotPassword(true);
  const handleCloseForgotPassword = () => {
    setOpenForgotPassword(false);
    setResetEmail("");
    setResetMessage("");
  };

  const handleResetPassword = async () => {
    setIsLoading(true);
    setResetMessage("");

    try {
      await axios.post("https://hostelproject-backend-coed.onrender.com/api/auth/reset-password", {
        email: resetEmail.toLowerCase(),
      });
      setResetMessage(
        "If an account with that email exists, a password reset link has been sent."
      );
    } catch (error) {
      setResetMessage("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Box
        component="form"
        onSubmit={handleSubmit}
        className="bg-white rounded-xl p-8 shadow-lg w-full max-w-md"
      >
        <Typography
          variant="h4"
          className="text-gray-800 text-center mb-6 font-bold"
        >
          Sign In
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={formData.email}
          onChange={handleChange}
          className="mb-4"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={formData.password}
          onChange={handleChange}
          className="mb-4"
        />
        {error && (
          <Typography
            color="error"
            variant="body2"
            className="mt-2 text-center"
          >
            {error}
          </Typography>
        )}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          className="mt-6 mb-4 bg-blue-600 hover:bg-blue-700 transition-all duration-300"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <CircularProgress size={24} color="inherit" className="mr-2" />
              Signing In...
            </span>
          ) : (
            "Sign In"
          )}
        </Button>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <button
            onClick={toggleForm}
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Sign up
          </button>
        </p>
        <Typography variant="body2" className="text-center mt-2">
          <Link
            onClick={handleForgotPassword}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Forgot Password?
          </Link>
        </Typography>
        <Typography variant="body2" className="text-center mt-4 text-gray-600">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </Typography>
      </Box>

      <Dialog open={openForgotPassword} onClose={handleCloseForgotPassword}>
        <DialogTitle>Reset Password</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="resetEmail"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
          />
          {resetMessage && (
            <Typography color="primary" variant="body2" className="mt-2">
              {resetMessage}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForgotPassword}>Cancel</Button>
          <Button onClick={handleResetPassword} disabled={isLoading}>
            {isLoading ? "Sending..." : "Send Reset Link"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default HostelOwnerAuth;

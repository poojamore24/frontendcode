"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Grid,
  Typography,
  IconButton,
  InputAdornment,
  Link,
  Stepper,
  Step,
  StepLabel,
  FormHelperText,
} from "@mui/material";
import axios from "axios";
import { SelectChangeEvent } from "@mui/material/Select";
import {
  Visibility,
  VisibilityOff,
  Phone,
  Email,
  Lock,
  School,
  Home,
  LocationCity,
  FileUpload,
  Person,
} from "@mui/icons-material";
import BackToHomeButton from "../components/common/BackToHomeButton";

type FormData = {
  roleName: "student" | "hostelOwner";
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
  otp: string;
};

type FormErrors = {
  [K in keyof FormData]?: string;
};

const SignupForm: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    roleName: "student",
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
    otp: "",
  });

  interface BackgroundVideoProps {
    videoSource: string;
  }

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [roles, setRoles] = useState<string[]>([]);
  const [activeStep, setActiveStep] = useState(0);
  const [otpSent, setOtpSent] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otp, setOtp] = useState("");

  useEffect(() => {
    axios
      .get("https://hostelproject-backend-coed.onrender.com/api/admin/getroles")
      .then((response) => {
        const filteredRoles = response.data
          .filter(
            (role: { name: string }) =>
              role.name === "hostelOwner" || role.name === "student"
          )
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

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent<string>
  ) => {
    const { name, value } = e.target;
    let newValue: string | File | null = value;

    // Handle file inputs
    if (e.target instanceof HTMLInputElement && e.target.type === "file") {
      const files = e.target.files;
      if (files && files.length > 0) {
        newValue = files[0];
      }
    }

    // Update formData
    setFormData((prev) => ({ ...prev, [name]: newValue }));

    // Validate the updated field
    const error = validateField(name as keyof FormData, newValue);
    setFormErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async () => {
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
        // You might want to show a message to the user that OTP has been sent
      } else {
        // Verify OTP
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
          router.push("/login");
        }
      }
    } catch (error) {
      console.error("Error during signup:", error);
      // You might want to show an error message to the user here
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
                  onChange={handleChange}
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 relative">
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-0">
        <video
          className="min-w-full min-h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source
            src="https://assets.mixkit.co/videos/4566/4566-720.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>

      <Box
        component="form"
        onSubmit={handleSubmit}
        className="bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg rounded-2xl p-8 shadow-2xl w-full max-w-md transition-all duration-300 hover:shadow-3xl relative z-10"
        sx={{ mt: 10 }}
      >
        <Typography
          variant="h4"
          className="text-gray-800 text-center mb-8 font-bold"
        >
          Sign Up
        </Typography>
        <Stepper activeStep={activeStep} alternativeLabel className="mb-8">
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Grid container spacing={2}>
          {getStepContent(activeStep)}
          {otpSent && (
            <>
              <Grid item xs={12}>
                <TextField
                  {...commonInputProps}
                  name="otp"
                  required
                  label="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  error={!!formErrors.otp}
                  helperText={formErrors.otp}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body2" style={{ color: "red" }}>
                  OTP sent successfully. Please check your email.
                </Typography>
              </Grid>
            </>
          )}
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
          <Button
            disabled={activeStep === 0 || otpSent}
            onClick={() =>
              setActiveStep((prevActiveStep) => prevActiveStep - 1)
            }
            className="text-gray-600 hover:bg-gray-100 transition-all duration-300 px-4 py-2 rounded-full"
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              if (activeStep === steps.length - 1 || otpSent) {
                console.log("Sign Up button clicked");
                handleSubmit();
              } else {
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
              }
            }}
            className="..."
          >
            {otpSent
              ? "Verify OTP"
              : activeStep === steps.length - 1
              ? "Sign Up"
              : "Next"}
          </Button>
        </Box>
        <Typography variant="body2" className="text-center mt-4">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-600 hover:underline font-semibold"
          >
            Sign In
          </Link>
        </Typography>
      </Box>
      <BackToHomeButton />
    </div>
  );
};

export default SignupForm;

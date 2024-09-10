"use client";
import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Box,
  CssBaseline,
  Container,
  Paper,
  Select,
  MenuItem,
  Menu,
  Modal,
  TextField,
  Snackbar,
  Grid,
  Divider,
  Button,
} from "@mui/material";
import {
  Home as HomeIcon,
  Add as AddIcon,
  Visibility as ViewIcon,
  School as StudentsIcon,
  ReportProblem as ComplaintsIcon,
  Feedback as FeedbackIcon,
  Logout as LogoutIcon,
  Person as PersonIcon,
  People,
} from "@mui/icons-material";
import Homepage from "../../components/hostel/Homepage";

import ViewHostels from "../../components/hostel/ViewHostels";
import Complaints from "../../components/hostel/Complaints";
import FeedbackComponent from "../../components/hostel/Feedback";
import AdmittedStudents from "../../components/hostel/AdmittedStudents";
import axios from "axios";
import VisitingStudents from "../../components/hostel/Visitingstudent";
import AddHostel from "../../components/hostel/AddHostel";

const drawerWidth = 240;

const sidebarItems = [
  { name: "Home", icon: <HomeIcon />, value: "home" },
  { name: "Add Hostel", icon: <AddIcon />, value: "add" },
  { name: "View Hostels", icon: <ViewIcon />, value: "view" },
  { name: "Admitted Students", icon: <StudentsIcon />, value: "students" },
  { name: "Complaints", icon: <ComplaintsIcon />, value: "complaints" },
  { name: "Feedback", icon: <FeedbackIcon />, value: "feedback" },
  { name: "Visiting Students", icon: <People />, value: "visiting" },
];

interface Hostel {
  _id: string;
  name: string;
}
interface ComponentProps {
  token: string;
}
const fetchOwnerData = async (profileId: string) => {
  try {
    const response = await fetch(
      `https://hostelproject-backend-coed.onrender.com/api/hostels/owners/${profileId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch owner data");
    }
    const data = await response.json();
    return data.owner;
  } catch (error) {
    console.error("Error fetching owner data:", error);
    return null;
  }
};

const HostelOwnerDashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activePage, setActivePage] = useState("home");

  const [profileId, setprofileId] = useState<string>("");
  const [ownerName, setOwnerName] = useState<string>("");
  const [hostels, setHostels] = useState<Hostel[]>([]);
  const [selectedHostelId, setSelectedHostelId] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    number: "",
    email: "",
    address: "",
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [showOTPForm, setShowOTPForm] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otpError, setOtpError] = useState<string | null>(null);
  const [token, setToken] = useState<string>("");

  const handleRequestOTP = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setIsLoading(true);
    setOtpError(null);
    try {
      await axios.post(
        "https://hostelproject-backend-coed.onrender.com/api/auth/forgot-password",
        { email: profileData.email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setShowOTPForm(true);
    } catch (error) {
      console.error("Error requesting OTP:", error);
      setOtpError("Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTPAndChangePassword = async (token: string) => {
    if (newPassword !== confirmPassword) {
      setOtpError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    setOtpError(null);
    try {
      await axios.post(
        "https://hostelproject-backend-coed.onrender.com/api/auth/reset-password",
        {
          email: profileData.email,
          otp,
          newPassword,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setShowOTPForm(false);
      setOtp("");
      setNewPassword("");
      setConfirmPassword("");
      setSnackbarMessage("Password changed successfully");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error verifying OTP and changing password:", error);
      setOtpError(
        `error.response?.data?.message ` ||
          "Failed to change password. Please check your OTP and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const profileId = localStorage.getItem("profileId");
    if (token && profileId) {
      setprofileId(profileId);
      fetchOwnerData(profileId).then((ownerData) => {
        if (ownerData) {
          setOwnerName(ownerData.name);
        }
        setIsLoading(false);
      });

      const fetchOwnerHostels = async () => {
        try {
          const response = await fetch(
            `htthttps://hostelproject-backend-coed.onrender.com/api/hostels/${profileId}/hostels`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (!response.ok) {
            throw new Error("Failed to fetch owner's hostels");
          }
          const data = await response.json();
          setHostels(data.hostels);
          if (data.hostels.length > 0) {
            setSelectedHostelId(data.hostels[0]._id);
          }
        } catch (error) {
          console.error("Error fetching owner's hostels:", error);
        }
      };

      fetchOwnerHostels();
    } else {
      window.location.href = "/dashboard/hostels/login";
    }
    if (profileId) {
      fetchOwnerData(profileId).then((ownerData) => {
        const email = localStorage.getItem("email");
        if (ownerData) {
          setOwnerName(ownerData.name || "");
          setProfileData({
            name: ownerData.name || "",
            number: ownerData.number || "",
            email: email || "",
            address: ownerData.address || "",
          });
        }
        setIsLoading(false);
      });
    }
  }, []);
  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  const handleProfileEdit = () => {
    setIsProfileModalOpen(true);
    handleProfileClose();
  };

  const handleProfileModalClose = () => {
    setIsProfileModalOpen(false);
  };

  const handleProfileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value,
    });
  };

  const handleProfileSubmit = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `https://hostelproject-backend-coed.onrender.com/api/hostels/owner/${profileId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(profileData),
        }
      );

      if (response.ok) {
        localStorage.removeItem("email");
        localStorage.setItem("email", profileData.email);
        setOwnerName(profileData.name);

        setSnackbarMessage("Profile updated successfully");
        setSnackbarOpen(true);
        handleProfileModalClose();
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setSnackbarMessage("Failed to update profile");
      setSnackbarOpen(true);
    }
  };
  const logoutUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      await axios.post(
        "https://hostelproject-backend-coed.onrender.com/api/auth/logout",
        {},
        config
      );
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      localStorage.removeItem("token");
      window.location.href = "/login";
    } catch (error) {
      console.error("Error during logout:", error);

      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("profileId");
      localStorage.removeItem("email");

      window.location.href = "/login";
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Box
      sx={{
        display: "flex",
        bgcolor: "white",
        color: "black",
        height: "100vh",
      }}
    >
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: "white",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          height: 100,
        }}
      >
        <Toolbar sx={{ height: "100%", justifyContent: "space-between" }}>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ fontWeight: "bold", color: "black" }}
          >
            Hostel Owner Dashboard
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar
              sx={{
                mr: 2,
                bgcolor: ownerName ? "black" : "black",
                cursor: "pointer",
                width: 48, // Increased avatar size
                height: 48,
              }}
              onClick={handleProfileClick}
            >
              {ownerName ? getInitials(ownerName) : <PersonIcon />}
            </Avatar>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleProfileClose}
            >
              <MenuItem onClick={handleProfileEdit}>
                <PersonIcon sx={{ mr: 1 }} /> Profile
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <LogoutIcon sx={{ mr: 1 }} /> Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: "white",
            color: "black",
            borderRight: "1px solid rgba(0, 0, 0, 0.12)", // Added border
            margin: 2,
            borderRadius: "20px",
            padding: "10px",
            marginTop: "90px", // Adjusted for increased AppBar height
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Added shadow for depth
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto", my: 1, mx: 1 }}>
          <List>
            {sidebarItems.map((item) => (
              <ListItem
                button
                key={item.name}
                onClick={() => setActivePage(item.value)}
                sx={{
                  mb: 1,
                  borderRadius: "10px",
                  bgcolor:
                    activePage === item.value ? "#4A90E2" : "transparent",
                  color: activePage === item.value ? "white" : "black",
                  transition: "all 0.3s",
                  "&:hover": {
                    bgcolor:
                      activePage === item.value
                        ? "#3A7BC8"
                        : "rgba(74, 144, 226, 0.1)",
                    transform: "translateY(-2px)",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: activePage === item.value ? "white" : "#4A90E2",
                    minWidth: "40px",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  primaryTypographyProps={{
                    fontWeight: activePage === item.value ? "bold" : "medium",
                    fontSize: "1rem",
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: { xs: 10, sm: 11 }, // Adjusted for increased AppBar height
          ml: { xs: 2, sm: 3 },
        }}
      >
        <Container maxWidth="lg">
          <Paper
            elevation={3}
            sx={{
              p: 3,
              bgcolor: "white",
              color: "black",
              borderRadius: "15px",
              textAlign: "center",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              fontWeight="bold"
              sx={{ mb: 3 }}
            >
              {sidebarItems.find((item) => item.value === activePage)?.name ||
                "Home"}
            </Typography>
            {activePage === "home" && <Homepage />}
            {activePage === "add" && <AddHostel />}
            {activePage === "view" && <ViewHostels />}
            {activePage === "students" && (
              <>
                <Select
                  value={selectedHostelId}
                  onChange={(e) =>
                    setSelectedHostelId(e.target.value as string)
                  }
                  displayEmpty
                  fullWidth
                  sx={{
                    mb: 2,
                    color: "black",
                    "& .MuiSelect-icon": { color: "black" },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "black",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(255, 255, 255, 0.23)",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#4A90E2",
                    },
                  }}
                >
                  <MenuItem value="" disabled>
                    Select a hostel
                  </MenuItem>
                  {hostels.map((hostel) => (
                    <MenuItem key={hostel._id} value={hostel._id}>
                      {hostel.name}
                    </MenuItem>
                  ))}
                </Select>
                {selectedHostelId && (
                  <AdmittedStudents hostelId={selectedHostelId} />
                )}
              </>
            )}
            {activePage === "complaints" && <Complaints />}
            {activePage === "feedback" && <FeedbackComponent />}
            {activePage === "visiting" && (
              <>
                <Select
                  value={selectedHostelId}
                  onChange={(e) =>
                    setSelectedHostelId(e.target.value as string)
                  }
                  displayEmpty
                  fullWidth
                  sx={{
                    mb: 2,
                    color: "black",
                    "& .MuiSelect-icon": { color: "black" },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "black",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(255, 255, 255, 0.23)",
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#4A90E2",
                    },
                  }}
                >
                  <MenuItem value="" disabled>
                    Select a hostel
                  </MenuItem>
                  {hostels.map((hostel) => (
                    <MenuItem key={hostel._id} value={hostel._id}>
                      {hostel.name}
                    </MenuItem>
                  ))}
                </Select>
                {selectedHostelId && (
                  <VisitingStudents hostelId={selectedHostelId} />
                )}
              </>
            )}
          </Paper>
        </Container>
      </Box>

      <Modal open={isProfileModalOpen} onClose={handleProfileModalClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "white",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            Edit Profile
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            name="name"
            value={profileData.name}
            onChange={handleProfileChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Number"
            name="number"
            value={profileData.number}
            onChange={handleProfileChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            value={profileData.email}
            onChange={handleProfileChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Address"
            name="address"
            value={profileData.address}
            onChange={handleProfileChange}
          />
          <Grid item xs={12}>
            <Divider sx={{ my: 2, bgcolor: "rgba(255, 255, 255, 0.1)" }} />
            <Typography variant="h6" sx={{ color: "cyan", mb: 2 }}>
              Change Password
            </Typography>
            {!showOTPForm ? (
              <Button
                variant="outlined"
                onClick={(event) => handleRequestOTP(event)}
                disabled={isLoading}
                sx={{
                  color: "red",
                  borderColor: "red",
                  "&:hover": {
                    borderColor: "white",
                    backgroundColor: "rgba(255, 0, 0, 0.1)",
                  },
                }}
              >
                {isLoading
                  ? "Sending OTP..."
                  : "Request OTP to Change Password"}
              </Button>
            ) : (
              <>
                <TextField
                  fullWidth
                  label="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  sx={{ mb: 2 }}
                  InputLabelProps={{
                    sx: { color: "rgba(255, 255, 255, 0.7)" },
                  }}
                  InputProps={{
                    sx: {
                      color: "white",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "black",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(0, 255, 255, 0.5)",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "cyan",
                      },
                    },
                  }}
                />
                <TextField
                  fullWidth
                  type="password"
                  label="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  sx={{ mb: 2 }}
                  InputLabelProps={{
                    sx: { color: "rgba(255, 255, 255, 0.7)" },
                  }}
                  InputProps={{
                    sx: {
                      color: "white",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "black",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(0, 255, 255, 0.5)",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "cyan",
                      },
                    },
                  }}
                />
                <TextField
                  fullWidth
                  type="password"
                  label="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  sx={{ mb: 2 }}
                  InputLabelProps={{
                    sx: { color: "rgba(255, 255, 255, 0.7)" },
                  }}
                  InputProps={{
                    sx: {
                      color: "white",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "black",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(0, 255, 255, 0.5)",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "cyan",
                      },
                    },
                  }}
                />
                {otpError && (
                  <Typography color="error" sx={{ mb: 2 }}>
                    {otpError}
                  </Typography>
                )}
                <Button
                  variant="contained"
                  onClick={(event) => handleVerifyOTPAndChangePassword}
                  disabled={isLoading}
                  sx={{
                    bgcolor: "cyan",
                    color: "black",
                    fontWeight: "bold",
                    "&:hover": { bgcolor: "rgba(0, 255, 255, 0.8)" },
                  }}
                >
                  {isLoading
                    ? "Processing..."
                    : "Verify OTP and Change Password"}
                </Button>
              </>
            )}
          </Grid>
          <Button
            fullWidth
            variant="contained"
            onClick={handleProfileSubmit}
            sx={{ mt: 2 }}
          >
            Save Changes
          </Button>
        </Box>
      </Modal>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default HostelOwnerDashboard;

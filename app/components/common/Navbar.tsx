"use client";
import React, { useState, useEffect, useCallback, MouseEvent } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Badge,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import HomeIcon from "@mui/icons-material/Home";
import ApartmentIcon from "@mui/icons-material/Apartment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Hand } from "lucide-react";
import ExploreIcon from "@mui/icons-material/Explore";
import { useRouter } from "next/navigation";

import axios from "axios";

import NotificationsIcon from "@mui/icons-material/Notifications";
import UserProfile from "./UserProfile";

interface HostelOwnerCTAProps {
  router: ReturnType<typeof useRouter>;
}

interface UserProfileProps {
  open: boolean;
  onClose: () => void;
  userEmail: string;
  userRole: string;
  userPassword?: string; // Make userPassword optional
}
const HostelOwnerCTA: React.FC<HostelOwnerCTAProps> = ({ router }) => {
  const [isBlinking, setIsBlinking] = useState(true);
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking((prev) => !prev);
    }, 1000);

    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#ffe5e5",
          padding: "10px 16px",
          borderRadius: "24px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "#ffd6d6",
            transform: "scale(1.05)",
            transition: "all 0.3s ease-in-out",
          },
        }}
        onClick={() => router.push("/hostellogin")}
      >
        <Typography
          variant="body1"
          sx={{
            color: "#d32f2f",
            fontWeight: "bold",
            marginRight: "12px",
            fontSize: "0.675rem",
            fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
          }}
        >
          Are you a hostel owner?
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <motion.div
            animate={{
              opacity: isBlinking ? 1 : 0.5,
              scale: isBlinking ? 1.1 : 1,
            }}
            transition={{ duration: 0.5 }}
          >
            <Hand size={20} color="#d32f2f" />
          </motion.div>
        </Box>
      </Box>
    </motion.div>
  );
};
const Navbar: React.FC = () => {
  const [wishlistCount, setWishlistCount] = useState<number>(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [profileId, setProfileId] = useState<string | null>(null);
  const [profileOpen, setProfileOpen] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const router = useRouter();

  const updateUserInfo = useCallback(() => {
    const email = localStorage.getItem("email");
    const role = localStorage.getItem("role");
    const id = localStorage.getItem("profileId");
    const token = localStorage.getItem("token");

    if (email && role && id && token) {
      if (role === "student") {
        setUserEmail(email);
      }
      setUserRole(role);
      setProfileId(id);
      setIsLoggedIn(true);
    } else {
      setUserEmail(null);
      setUserRole(null);
      setProfileId(null);
      setIsLoggedIn(false);
    }
  }, []);

  const fetchWishlistCount = useCallback(async () => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("profileId");
    if (token && id && userRole === "student") {
      try {
        const response = await fetch(
          `http://lohttps://hostelproject-backend-coed.onrender.comcalhost:5000/api/students/wishlist/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setWishlistCount(data.length);
        } else {
          console.error("Failed to fetch wishlist");
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    }
  }, [userRole]);

  useEffect(() => {
    updateUserInfo();
    fetchWishlistCount();

    const handleStorageChange = () => {
      updateUserInfo();
      fetchWishlistCount();
    };

    window.addEventListener("storage", handleStorageChange);

    const interval = setInterval(() => {
      updateUserInfo();
      fetchWishlistCount();
    }, 500);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, [updateUserInfo, fetchWishlistCount]);

  const handleWishlistClick = () => {
    router.push("/wishlist");
  };

  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setProfileOpen(true);
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
      setUserEmail(null);
      setUserRole(null);
      setProfileId(null);
      setIsLoggedIn(false);
      setProfileOpen(false);
      setAnchorEl(null);
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("profileId");
      localStorage.removeItem("email");
      localStorage.removeItem("wishlist");
      await logoutUser();
      window.dispatchEvent(new Event("storage"));
      router.push("/login");
    } catch (error) {
      console.error("Error during logout:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("profileId");
      localStorage.removeItem("email");
      window.dispatchEvent(new Event("storage"));
      window.location.href = "/login";
    }
  };

  const handleExploreClick = () => {
    router.push("/explore");
  };

  const iconStyle =
    "text-sky-500 hover:text-sky-600 transition-all duration-200 shadow-md hover:shadow-lg";

  return (
    <AppBar position="fixed" sx={{ bgcolor: "background.paper" }}>
      <Toolbar
        className="flex justify-between items-center px-8 py-4"
        style={{ minHeight: "70px" }}
      >
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h6"
            component="div"
            className="flex items-center text-sky-500 font-bold cursor-pointer"
            onClick={() => router.push("/")}
            sx={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            <span className="text-sky-500">Stay Home Hostels</span>
          </Typography>
        </motion.div>

        <Box className="flex items-center space-x-6">
          {userRole !== "student" && (
            <AnimatePresence>
              <HostelOwnerCTA router={router} />
            </AnimatePresence>
          )}

          {isLoggedIn ? (
            <>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <IconButton
                  onClick={() => router.push("/wishlist")}
                  className={`${iconStyle} rounded-full p-3`}
                >
                  <Badge badgeContent={wishlistCount} color="error">
                    <FavoriteIcon sx={{ fontSize: 28 }} />
                  </Badge>
                </IconButton>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <IconButton className={`${iconStyle} rounded-full p-3`}>
                  <NotificationsIcon sx={{ fontSize: 28 }} />
                </IconButton>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <IconButton
                  onClick={handleMenu}
                  className={`${iconStyle} rounded-full p-2 border-2 border-sky-500 hover:border-sky-600`}
                >
                  <Avatar
                    className="bg-sky-500 text-white"
                    sx={{ width: 40, height: 40, fontSize: 20 }}
                  >
                    {userEmail?.charAt(0).toUpperCase()}
                  </Avatar>
                </IconButton>
              </motion.div>

              <Menu
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                className="mt-2"
              >
                <MenuItem disabled className="text-gray-500">
                  Hi, {userRole} ({userEmail})
                </MenuItem>
                <MenuItem
                  onClick={() => setProfileOpen(true)}
                  className="hover:bg-sky-50"
                >
                  Profile
                </MenuItem>
                {userRole === "hostelowner" && (
                  <>
                    <MenuItem
                      onClick={() => router.push("/hostel-management")}
                      className="hover:bg-sky-50"
                    >
                      Hostel Management
                    </MenuItem>
                    <MenuItem
                      onClick={() => router.push("/owner-dashboard")}
                      className="hover:bg-sky-50"
                    >
                      Owner Dashboard
                    </MenuItem>
                  </>
                )}
                <MenuItem onClick={handleLogout} className="hover:bg-sky-50">
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Typography
                  color="primary"
                  onClick={() => router.push("/register")}
                  className="text-sky-500 hover:text-sky-600 cursor-pointer font-semibold"
                  sx={{
                    fontSize: "0.9rem",
                    fontFamily: "'Roboto', sans-serif",
                  }}
                >
                  Sign Up
                </Typography>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Typography
                  color="primary"
                  onClick={() => router.push("/login")}
                  className="text-sky-500 hover:text-sky-600 cursor-pointer font-semibold"
                  sx={{
                    fontSize: "0.9rem",
                    fontFamily: "'Roboto', sans-serif",
                  }}
                >
                  Sign In
                </Typography>
              </motion.div>
            </>
          )}
        </Box>
      </Toolbar>
      {isLoggedIn && (
        <UserProfile
          open={profileOpen}
          onClose={() => setProfileOpen(false)}
          userEmail={userEmail || ""}
          userRole={userRole || ""}
          userPassword={""}
        />
      )}
    </AppBar>
  );
};

export default Navbar;

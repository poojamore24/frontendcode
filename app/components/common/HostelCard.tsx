"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Rating,
  Snackbar,
  Alert,
  Grid,
} from "@mui/material";
import {
  Favorite as FavoriteIcon,
  LocationOn as LocationIcon,
  Home as HomeIcon,
  Hotel as HotelIcon,
  Person as PersonIcon,
  Phone as PhoneIcon,
  AttachMoney as AttachMoneyIcon,
  Restaurant as RestaurantIcon,
  Verified as VerifiedIcon,
} from "@mui/icons-material";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface Image {
  contentType: string;
  data: string;
}

interface Feedback {
  rating: number;
}

interface RentStructure {
  studentsPerRoom: number;
  rentPerStudent: number;
}

interface HostelCardProps {
  id: string;
  images: Image[];
  name: string;
  owner: string;
  number: string;
  address: string;
  hostelType: string;
  beds: number;
  food: boolean;
  studentsPerRoom: number;
  ratings: number;
  isVerified: boolean;
  feedback: Feedback[];
  rentStructure: RentStructure[];
  onWishlistToggle: (id: string, isInWishlist: boolean) => void;
  preferredFor: "girls" | "boys" | "both";
}

const HostelCard: React.FC<HostelCardProps> = ({
  id,
  images,
  name,
  owner,
  number,
  address,
  hostelType,
  beds,
  food,
  studentsPerRoom,
  isVerified,
  feedback,
  rentStructure,
  preferredFor,
}) => {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setIsInWishlist(wishlist.includes(id));
  }, [id]);
  const router = useRouter();
  const handleWishlistToggle = async () => {
    const profileId = localStorage.getItem("profileId");

    if (!profileId) {
      router.push("/login"); // Redirect to login page
    }

    try {
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

      if (!isInWishlist) {
        if (wishlist.length >= 5) {
          toast.error("You can't add more than 5 hostels to your wishlist.");
          return;
        }

        await axios.post(
          "https://hostelproject-backend-coed.onrender.com/api/students/wishlist/add",
          { hostelId: id, profileId },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        wishlist.push(id);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));

        setIsInWishlist(true);
        toast.success("Hostel added to wishlist successfully!");
      } else {
        await axios.post(
          "https://hostelproject-backend-coed.onrender.com/api/students/wishlist/remove",
          { hostelId: id, profileId },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const updatedWishlist = wishlist.filter(
          (hostelId: string) => hostelId !== id
        );
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

        setIsInWishlist(false);
        toast.success("Hostel removed from wishlist successfully!");
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
      toast.error("Failed to update wishlist. Please try again.");
    }
  };

  const handleViewDetails = () => {
    const profileId = localStorage.getItem("profileId");
    if (!profileId) {
      toast.error("Please log in to view hostel details.");

      router.push("/login");
    }
    setDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
  };

  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const calculateAverageRating = () => {
    if (!feedback || feedback.length === 0) return 0;
    const sum = feedback.reduce((acc, curr) => acc + curr.rating, 0);
    return sum / feedback.length;
  };

  const averageRating = calculateAverageRating();

  const StarRating: React.FC<{ value: number }> = ({ value }) => (
    <Box display="flex" alignItems="center">
      <Rating
        value={value}
        precision={0.5}
        readOnly
        size="small"
        sx={{
          color: "rgb(14, 165, 233)",
          "& .MuiRating-iconFilled": {
            color: "rgb(14, 165, 233)",
          },
          "& .MuiRating-iconHover": {
            color: "rgb(14, 165, 233)",
          },
        }}
      />
      <Typography variant="body2" className="ml-1 text-sky-600">
        ({value.toFixed(1)})
      </Typography>
    </Box>
  );

  const PreferredTag: React.FC<{ preferredFor: "girls" | "boys" | "both" }> = ({
    preferredFor,
  }) => (
    <div className="absolute top-2 left-2 z-10">
      <Chip
        label={`Preferred for ${hostelType}`}
        size="small"
        className="bg-amber-400 text-amber-900 font-semibold shadow-md"
      />
    </div>
  );

  return (
    <>
      <Card className="bg-white p-4 rounded-xl shadow-lg flex flex-col md:flex-row w-full border border-gray-200 hover:border-sky-500 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-sky-200">
        <Box className="w-full md:w-1/3 relative overflow-hidden mb-4 md:mb-0">
          <PreferredTag preferredFor={preferredFor} />
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            className="w-full h-48 md:h-auto rounded-lg shadow-md"
          >
            {images && images.length > 0 ? (
              images.map((image, index) => (
                <SwiperSlide key={index}>
                  {image && image.contentType && image.data ? (
                    <img
                      src={`data:${image.contentType};base64,${image.data}`}
                      alt={`${name} - ${index + 1}`}
                      className="w-full h-full object-cover object-center rounded-lg"
                    />
                  ) : (
                    <img
                      src="/default-image.jpg"
                      alt={`Default - ${index + 1}`}
                      className="w-full h-full object-cover object-center rounded-lg"
                    />
                  )}
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide>
                <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
                  <p className="text-gray-400">No images available</p>
                </div>
              </SwiperSlide>
            )}
          </Swiper>
          <IconButton
            onClick={handleWishlistToggle}
            className={`absolute top-2 right-2 bg-white bg-opacity-70 ${
              isInWishlist ? "text-red-600" : "text-gray-600"
            } hover:text-red-500 transition-all duration-300 ease-in-out transform hover:scale-110 z-10`}
          >
            <FavoriteIcon />
          </IconButton>
        </Box>

        <CardContent className="w-full md:w-2/3 pl-0 md:pl-4 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-2">
              <Typography
                variant="h3"
                className="text-xl font-semibold text-sky-600"
              >
                {name}
              </Typography>
              {isVerified && (
                <Chip
                  icon={<VerifiedIcon />}
                  label="Verified"
                  size="small"
                  color="primary"
                  className="bg-sky-600"
                />
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <Typography
                variant="body2"
                className="text-xs text-gray-600 flex items-center"
              >
                <LocationIcon className="text-sky-500 mr-1" fontSize="small" />
                Address:{" "}
                <span className="font-semibold text-gray-800 ml-1">
                  {address}
                </span>
              </Typography>
              <Typography
                variant="body2"
                className="text-xs text-gray-600 flex items-center"
              >
                <HomeIcon className="text-sky-500 mr-1" fontSize="small" />
                Type:{" "}
                <span className="font-semibold text-gray-800 ml-1">
                  {hostelType}
                </span>
              </Typography>
              <Typography
                variant="body2"
                className="text-xs text-gray-600 flex items-center"
              >
                <HotelIcon className="text-sky-500 mr-1" fontSize="small" />
                Beds:{" "}
                <span className="font-semibold text-gray-800 ml-1">{beds}</span>
              </Typography>
              <Typography
                variant="body2"
                className="text-xs text-gray-600 flex items-center"
              >
                <StarRating value={averageRating} />
              </Typography>
            </div>
            <div className="mt-2">
              <Typography variant="subtitle2" className="text-sky-600 mb-1">
                Rent Structure:
              </Typography>
              {rentStructure.map((rent, index) => (
                <Typography
                  key={index}
                  variant="body2"
                  className="text-xs text-gray-600"
                >
                  {rent.studentsPerRoom} Students: ₹{rent.rentPerStudent}
                  /student
                </Typography>
              ))}
            </div>
          </div>
          <div className="flex justify-end mt-2 relative">
            <Button
              variant="contained"
              onClick={handleViewDetails}
              className="bg-gradient-to-r from-sky-400 to-sky-600 hover:from-sky-500 hover:to-sky-700 text-white shadow-md"
            >
              View Details
            </Button>
          </div>
        </CardContent>
      </Card>
      <Dialog
        open={detailsOpen}
        onClose={handleCloseDetails}
        fullWidth
        maxWidth="md"
        PaperProps={{
          style: {
            background: "linear-gradient(to right bottom, #1a202c, #2d3748)",
            borderRadius: "16px",
          },
        }}
      >
        <DialogTitle className="text-2xl font-bold text-cyan-400 border-b border-gray-700 pb-2">
          {name}
          {isVerified && (
            <Chip
              icon={<VerifiedIcon />}
              label="Verified"
              size="small"
              color="primary"
              className="ml-2 bg-cyan-600"
            />
          )}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} className="mt-2">
            <Grid item xs={12} md={6}>
              <List className="text-white">
                {[
                  { icon: <PersonIcon />, label: "Owner", value: owner },
                  { icon: <PhoneIcon />, label: "Contact", value: number },
                  { icon: <LocationIcon />, label: "Address", value: address },
                  { icon: <HomeIcon />, label: "Type", value: hostelType },
                  { icon: <HotelIcon />, label: "Beds", value: beds },
                  {
                    icon: <RestaurantIcon />,
                    label: "Food Provided",
                    value: food ? "Yes" : "No",
                  },
                ].map((item, index) => (
                  <ListItem key={index}>
                    <ListItemIcon className="text-cyan-400">
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <span className="text-gray-300">{item.label}</span>
                      }
                      secondary={
                        <span className="text-white">{item.value}</span>
                      }
                    />
                  </ListItem>
                ))}
                <ListItem>
                  <ListItemIcon className="text-cyan-400">
                    <StarRating value={averageRating} />
                  </ListItemIcon>
                  <ListItemText
                    primary={<span className="text-gray-300">Rating</span>}
                    secondary={
                      <span className="text-white">
                        {averageRating.toFixed(1)} ({feedback.length} reviews)
                      </span>
                    }
                  />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" className="text-cyan-400 mb-2">
                Rent Structure
              </Typography>
              <List className="text-white">
                {rentStructure.map((rent, index) => (
                  <ListItem key={index}>
                    <ListItemIcon className="text-cyan-400">
                      {/* <AttachMoneyIcon /> */}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <span className="text-gray-300">
                          {rent.studentsPerRoom} Students
                        </span>
                      }
                      secondary={
                        <span className="text-white">
                          {rent.rentPerStudent} per student
                        </span>
                      }
                    />
                  </ListItem>
                ))}
              </List>
              <Typography variant="h6" className="text-cyan-400 mt-4 mb-2">
                Images
              </Typography>
              <Swiper
                modules={[Pagination, Autoplay]}
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                className="w-full h-64 rounded-lg shadow-lg"
              >
                {images && images.length > 0 ? (
                  images.map((image, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={`data:${image.contentType};base64,${image.data}`}
                        alt={`${name} - ${index + 1}`}
                        className="w-full h-full object-cover object-center rounded-lg"
                      />
                    </SwiperSlide>
                  ))
                ) : (
                  <SwiperSlide>
                    <div className="w-full h-full flex items-center justify-center bg-gray-700 rounded-lg">
                      <p className="text-gray-400">No images available</p>
                    </div>
                  </SwiperSlide>
                )}
              </Swiper>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className="border-t border-gray-700">
          <Button
            onClick={handleCloseDetails}
            className="text-cyan-400 hover:bg-cyan-900"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default HostelCard;

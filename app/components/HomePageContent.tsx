"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { Typography, Container, Grid, Card, CardContent } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import HostelFilter from "./common/HostelFilter";
import HostelCard from "./common/HostelCard";
import { useSearchParams } from "next/navigation";
import MapComponent from "./common/MapComponent";
import { ShieldCheck, CheckCircle2, Sparkles } from "lucide-react";
import Lottie from "lottie-react";
import wait from "../../public/wait.json";
interface HostelCardProps {
  id: string;
  images: {
    contentType: string;
    data: string;
  }[];
  name: string;
  owner: string;
  number: string;
  address: string;
  hostelType: string;
  food: boolean;
  beds: number;
  studentsPerRoom: number;
  rentStructure: {
    studentsPerRoom: number;
    rentPerStudent: number;
  }[];
  isVerified: boolean;
  feedback: { rating: number }[];
  ratings: number;
  preferredFor: "girls" | "boys" | "both";
  onWishlistToggle: (id: string, isInWishlist: boolean) => void;
}

interface MapComponentProps {
  filteredHostels: Hostel[];
}

interface Filters {
  searchName: string;
  type: string;
  studentsPerRoom: string;
  food: boolean;
  verified: boolean;
  sortByRatings: boolean;
  rentRange: [number, number];
}

interface Hostel {
  id: string;
  _id: string;
  name: string;
  latitude: number;
  longitude: number;
  address: string;
  ownerDetails: {
    name: string;
  };
  hostelType: string;
  food: boolean;
  studentsPerRoom: number;
  verified: boolean;
  rentStructure: {
    studentsPerRoom: number;
    rentPerStudent: number;
  }[];
  feedback: {
    rating: number;
  }[];
  images: {
    contentType: string;
    data: string;
  }[];
  number: string;
  beds: number;
  preferredFor: "girls" | "boys" | "both";
}

interface Filters {
  searchName: string;
  type: string;
  studentsPerRoom: string;
  food: boolean;
  verified: boolean;
  sortByRatings: boolean;
  rentRange: [number, number];
}

const HomePage: React.FC = () => {
  const [hostels, setHostels] = useState<Hostel[]>([]);
  const [filteredHostels, setFilteredHostels] = useState<Hostel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showPoster, setShowPoster] = useState<boolean>(true);
  const [filters, setFilters] = useState<Filters>({
    searchName: "",
    type: "All",
    studentsPerRoom: "Any",
    food: false,
    verified: false,
    sortByRatings: false,
    rentRange: [0, 10000],
  });

  const searchParams = useSearchParams();
  const filterRef = useRef<HTMLDivElement>(null);

  const fetchHostels = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://hostelproject-backend-coed.onrender.com/api/hostels/all"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const hostelsWithPhotos = await Promise.all(
        data.map(async (hostel: Hostel) => {
          try {
            const photoResponse = await fetch(
              `https://hostelproject-backend-coed.onrender.com/api/hostels/gethostalphotos/${hostel._id}`
            );
            if (!photoResponse.ok) {
              throw new Error(`HTTP error! status: ${photoResponse.status}`);
            }
            const photos = await photoResponse.json();
            return {
              ...hostel,
              images: photos,
              id: hostel._id,
              latitude: hostel.latitude || 0,
              longitude: hostel.longitude || 0,
            };
          } catch (photoError) {
            console.error("Error fetching hostel photos:", photoError);
            return {
              ...hostel,
              images: [],
              id: hostel._id,
              latitude: hostel.latitude || 0,
              longitude: hostel.longitude || 0,
            };
          }
        })
      );

      setHostels(hostelsWithPhotos);
      setFilteredHostels(hostelsWithPhotos);
    } catch (error) {
      console.error("Error fetching hostels:", error);
      setError("Error fetching hostels");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHostels();
  }, [fetchHostels]);

  useEffect(() => {
    const query = searchParams.get("search");
    if (query) {
      setFilters((prevFilters) => ({ ...prevFilters, searchName: query }));
    }
  }, [searchParams]);

  const handleFilter = useCallback((newFilters: Filters) => {
    setFilters(newFilters);
  }, []);
  useEffect(() => {
    if (filterRef.current) {
      const filterHeight = filterRef.current.offsetHeight;
      document.body.style.paddingTop = `${filterHeight}px`;
    }
  }, []);

  useEffect(() => {
    if (hostels.length > 0) {
      let result = hostels;

      // Apply filters only if they are set
      if (filters.searchName.trim() !== "") {
        const searchLower = filters.searchName.toLowerCase();
        result = result.filter(
          (hostel) =>
            hostel.name.toLowerCase().includes(searchLower) ||
            hostel.address.toLowerCase().includes(searchLower) ||
            hostel.ownerDetails.name.toLowerCase().includes(searchLower)
        );
      }

      if (filters.type !== "All") {
        result = result.filter(
          (hostel) =>
            hostel.hostelType.toLowerCase() === filters.type.toLowerCase()
        );
      }

      if (filters.studentsPerRoom !== "Any") {
        const studentsPerRoom = parseInt(filters.studentsPerRoom);
        result = result.filter((hostel) => {
          if (studentsPerRoom === 3) {
            return hostel.studentsPerRoom >= 3;
          }
          return hostel.studentsPerRoom === studentsPerRoom;
        });
      }

      if (filters.food) {
        result = result.filter((hostel) => hostel.food);
      }

      if (filters.verified) {
        result = result.filter((hostel) => hostel.verified);
      }

      if (filters.rentRange[0] > 0 || filters.rentRange[1] < 10000) {
        result = result.filter((hostel) => {
          const lowestRent = Math.min(
            ...hostel.rentStructure.map((r) => r.rentPerStudent)
          );
          return (
            lowestRent >= filters.rentRange[0] &&
            lowestRent <= filters.rentRange[1]
          );
        });
      }

      if (filters.sortByRatings) {
        result.sort((a, b) => {
          const ratingA =
            a.feedback.reduce((sum, f) => sum + f.rating, 0) /
              a.feedback.length || 0;
          const ratingB =
            b.feedback.reduce((sum, f) => sum + f.rating, 0) /
              b.feedback.length || 0;
          return ratingB - ratingA;
        });
      }

      setFilteredHostels(result);
    }
  }, [hostels, filters]);

  const LoaderComponent = () => {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-80 flex justify-center items-center z-50">
        <div className="w-90 h-90 justify-center">
          <Lottie animationData={wait} loop={true} autoplay={true} />
        </div>
      </div>
    );
  };
  interface FeatureItemProps {
    Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; // Type for Material-UI icons; adjust as necessary
    text: string;
  }

  const FeatureItem: React.FC<FeatureItemProps> = ({ Icon, text }) => (
    <div className="flex items-center space-x-2 text-white mb-3">
      <Icon className="h-5 w-5 text-cyan-300" />
      <span>{text}</span>
    </div>
  );

  const PosterComponent = () => {
    return (
      <Card className="bg-gradient-to-br from-cyan-700 to-blue-900 rounded-xl shadow-2xl overflow-hidden ">
        <CardContent className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="mb-6 sm:mb-0 sm:mr-6">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white leading-tight">
                Your Safety,
                <br />
                Our Priority
              </h2>
              <p className="text-lg mb-6 text-cyan-100">
                Book a house visit today with enhanced safety measures.
              </p>
              <div className="space-y-3 mb-6">
                <FeatureItem
                  Icon={ShieldCheck}
                  text="Strict hygiene protocols"
                />
                <FeatureItem
                  Icon={CheckCircle2}
                  text="Sanitized environments"
                />
                <FeatureItem Icon={Sparkles} text="Contactless experience" />
              </div>
              <button className="w-full sm:w-auto bg-white text-cyan-800 font-semibold py-2 px-6 rounded-full hover:bg-cyan-100 transition-colors duration-300 text-lg">
                Book Now
              </button>
            </div>
            <div className="w-full sm:w-1/3 aspect-square bg-cyan-400 rounded-lg shadow-lg overflow-hidden">
              <img
                src="https://tse1.mm.bing.net/th?id=OIP.-BrkE0Qx78nrXHCDYiPmqQHaFj&pid=Api&P=0&h=220"
                alt="Safe and hygienic home"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const NoHostelsFound = () => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center h-64"
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="100"
        height="100"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-gray-400 mb-4"
        animate={{
          rotate: [0, 10, -10, 10, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
      </motion.svg>
      <motion.h2
        className="text-2xl font-semibold text-gray-700 mb-2"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        No Hostels Found
      </motion.h2>
      <p className="text-gray-500">
        Try adjusting your filters or search criteria.
      </p>
    </motion.div>
  );

  return (
    <>
      {isLoading && <LoaderComponent />}
      <header className="bg-gradient-to-r">
        <Container maxWidth={false} className="py-4">
          <Grid container alignItems="center" spacing={2}>
            <Grid item xs={12} md={3} className="mt-12">
              <Typography variant="h5" className="text-sky-400 font-bold">
                PGs/Hostels
              </Typography>
            </Grid>
            <Grid item xs={12} md={9}>
              <HostelFilter
                onFilter={handleFilter}
                initialSearch={filters.searchName}
              />
            </Grid>
          </Grid>
        </Container>
      </header>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          {showPoster && <PosterComponent />}
          <AnimatePresence>
            {filteredHostels.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {filteredHostels.map((hostel, index) => (
                  <motion.div
                    key={hostel._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <HostelCard
                      id={hostel._id}
                      images={hostel.images} // Pass the images array directly
                      name={hostel.name || "Unnamed Hostel"}
                      owner={hostel.ownerDetails?.name || "Unknown Owner"}
                      number={hostel.number || "Unknown Number"}
                      address={hostel.address || "Unknown Address"}
                      hostelType={hostel.hostelType || "Unknown Type"}
                      food={hostel.food}
                      beds={hostel.beds}
                      studentsPerRoom={hostel.studentsPerRoom}
                      rentStructure={hostel.rentStructure}
                      isVerified={hostel.verified}
                      feedback={hostel.feedback}
                      ratings={
                        hostel.feedback.reduce((sum, f) => sum + f.rating, 0) /
                          hostel.feedback.length || 0
                      }
                      onWishlistToggle={(id, isInWishlist) => {
                        console.log(
                          `Toggled wishlist for ${id}: ${isInWishlist}`
                        );
                      }}
                      preferredFor={hostel.preferredFor}
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <NoHostelsFound />
            )}
          </AnimatePresence>
        </Grid>
        <Grid item xs={12} md={4} style={{ position: "relative" }}>
          <div
            style={{
              position: "fixed",
              top: "300px",
              right: "32px",
              width: "400px",
              height: "400px",
              maxWidth: "calc(33.333% - 32px)",
              borderRadius: "20px",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              style={{
                height: "100%",
                borderRadius: "15px",
                overflow: "hidden",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <MapComponent filteredHostels={filteredHostels} />
            </div>
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default HomePage;

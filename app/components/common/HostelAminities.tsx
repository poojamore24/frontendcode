"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";
import main1 from "../../../public/Images/main1.jpg";
import Buildings from "../../../public/Images/Buildings.jpg";

const HostelAminities = () => {
  const [userType, setUserType] = useState("Owner");
  const router = useRouter();

  const handleVerifiedClick = () => {
    router.push("/explore");
  };

  const handleGetAnswers = () => {
    router.push("/register");
  };

  return (
    <div className="flex flex-col max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row p-8">
        <div className="md:w-1/2 pr-8">
          <h1 className="text-4xl font-bold mb-4">
            Get All Aminities Under the{" "}
            <span className="text-teal-500">One Roof</span>
          </h1>
          <p className="mb-6 text-gray-600">
            "Discover the ultimate convenience at our hostel, where we offer all
            essential amenities under one roof. From comfortable living spaces
            and high-speed Wi-Fi to 24/7 security and delicious meals,
            everything you need for a hassle-free stay is right here. Experience
            unparalleled comfort and ease with us!"
          </p>
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0 relative">
          <div className="relative w-full h-[300px] overflow-hidden rounded-lg">
            <Image
              src={main1}
              alt="Background image"
              layout="fill"
              objectFit="cover"
              className="brightness-75"
            />
            <Card className="absolute inset-0 bg-transparent shadow-none">
              <CardContent className="relative z-10 text-white">
                <Typography variant="h5" component="div" gutterBottom>
                  Friend
                </Typography>
                <Typography variant="body2">
                  A friend is someone who supports and cares for you.
                </Typography>
                <Typography variant="body2" className="mt-2">
                  Cultivate meaningful friendships based on mutual respect and
                  shared experiences.
                </Typography>
              </CardContent>
              <CardActions className="relative z-10">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleVerifiedClick}
                >
                  Check your Hostels
                </Button>
              </CardActions>
            </Card>
          </div>
        </div>
      </div>

      <div
        id="selectRole"
        className="flex flex-col md:flex-row items-center justify-center p-8"
      >
        <div className="md:w-1/2 mb-8 md:mb-0">
          <Image
            src={Buildings}
            alt="Modern house at night"
            width={400}
            height={300}
            className="rounded-lg shadow-lg"
          />
        </div>
        <div className="md:w-1/2 md:pl-8">
          <h1 className="text-3xl font-bold mb-4">
            Need Help? Get All Your Options{" "}
            <span className="text-teal-500">Under One Roof</span>
          </h1>{" "}
          <h1 className="text-3xl font-bold mb-4">
            Experience Unmatched Comfort and Convenience
          </h1>
          <div className="mb-4"></div>
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            onClick={handleGetAnswers}
          >
            Getting Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default HostelAminities;

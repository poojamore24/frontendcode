"use client";
import React from "react";
import Lottie, { Options } from "react-lottie";

interface LoadingOverlayProps {
  isLoading: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isLoading }) => {
  const defaultOptions: Options = {
    loop: true,
    autoplay: true,
    animationData: null, // We'll set this to null as we're using a path
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
    path: "https://assets5.lottiefiles.com/packages/lf20_m9zragkd.json", // This is a Namaste animation from LottieFiles
  };

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
      <Lottie options={defaultOptions} height={200} width={200} />
      <h1 className="mt-4 text-3xl font-bold text-gray-800 animate-fade-in">
        Welcome to Hostel Manager
      </h1>
    </div>
  );
};

export default LoadingOverlay;

"use client";
import React from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface OccupancyCardProps {
  title: string;
  icon: IconProp;
  color: string;
  description: string;
  trend: number;
  totalNumber: number; // Add this new prop
}

const OccupancyCard: React.FC<OccupancyCardProps> = ({
  title,
  icon,
  color,

  totalNumber, // Destructure this new prop
}) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg text-white shadow-[0_0_10px_rgba(0,0,255,0.5),0_0_20px_rgba(0,0,0,0.3)] transition duration-300 ease-in-out h-64">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div className="flex items-center justify-center mb-4">
        <FontAwesomeIcon
          icon={icon}
          className="h-20 w-20"
          style={{ color: color }}
        />
      </div>

      <div className="text-sm text-white mt-4">
        <span className="font-semibold">Total Number:</span> {totalNumber}
      </div>
    </div>
  );
};

export default OccupancyCard;

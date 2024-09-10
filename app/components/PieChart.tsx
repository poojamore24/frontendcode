"use client";
import React from "react";

interface PieChartProps {
  studentsCount: number;
  ownersCount: number;
}

export default function PieChart({
  studentsCount,
  ownersCount,
}: PieChartProps) {
  const total = studentsCount + ownersCount;
  const studentsPercentage = (studentsCount / total) * 100;
  const ownersPercentage = (ownersCount / total) * 100;

  const createSlice = (percentage: number, offset: number, color: string) => {
    const CENTER = 18;
    const RADIUS = 15.915494309189533;
    const startAngle = (offset / 100) * 360;
    const endAngle = ((offset + percentage) / 100) * 360;

    const x1 = CENTER + RADIUS * Math.cos((startAngle * Math.PI) / 180);
    const y1 = CENTER + RADIUS * Math.sin((startAngle * Math.PI) / 180);
    const x2 = CENTER + RADIUS * Math.cos((endAngle * Math.PI) / 180);
    const y2 = CENTER + RADIUS * Math.sin((endAngle * Math.PI) / 180);

    const largeArcFlag = percentage > 50 ? 1 : 0;

    return `M ${CENTER},${CENTER} L ${x1},${y1} A ${RADIUS},${RADIUS} 0 ${largeArcFlag} 1 ${x2},${y2} Z`;
  };

  return (
    <div className="bg-white p-3 rounded-lg flex flex-col items-center border border-gray-300 shadow-md transition-transform transform hover:scale-105 hover:shadow-lg h-full">
      <h3 className="text-base mb-2 text-gray-800 font-semibold">
        User Distribution
      </h3>
      <div className="relative flex items-center justify-center mb-2">
        <svg className="w-32 h-32" viewBox="0 0 36 36">
          <path
            d={createSlice(studentsPercentage, 0, "#2563EB")}
            fill="#2563EB"
          />
          <path
            d={createSlice(ownersPercentage, studentsPercentage, "#DB2777")}
            fill="#DB2777"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-800">
          <div className="text-xs">
            <span className="block text-lg font-bold">
              {ownersPercentage.toFixed(1)}%
            </span>
            <span>Hostel Owner</span>
          </div>
          <div className="text-xs">
            <span className="block text-lg font-bold">
              {studentsPercentage.toFixed(1)}%
            </span>
            <span>Students</span>
          </div>
        </div>
      </div>
      <div className="mt-2 flex justify-between text-xs text-gray-600 w-full">
        <div className="flex items-center">
          <span className="inline-block w-2 h-2 bg-blue-600 mr-1"></span>
          Students: {studentsCount}
        </div>
        <div className="flex items-center">
          <span className="inline-block w-2 h-2 bg-pink-600 mr-1"></span>
          Hostel Owner: {ownersCount}
        </div>
      </div>
    </div>
  );
}

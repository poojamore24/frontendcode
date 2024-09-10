"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

interface ItemType {
  title: string;
  desc: string[];
  img: string;
  color: string;
}

const items: ItemType[] = [
  {
    title: "Cleanliness is next to godliness",
    desc: [
      "Promotes health and comfort.",
      "Ensures a welcoming atmosphere.",
      "Regular sanitization and organization.",
    ],
    img: "/Images/CleaningItem.jpg",
    color: "blue",
  },
  {
    title: "Your safety is our priority",
    desc: [
      "Security measures.",
      "Vigilant staff and clear protocols.",
      "Secure access and well-lit areas.",
    ],
    img: "/Images/Aim.jpeg",
    color: "green",
  },
  {
    title: "Health is wealth",
    desc: [
      "Hygienic practices ensure safety.",
      "Proper ventilation and waste management.",
      "Regular cleaning and sanitization.",
    ],
    img: "/Images/HealthItem.jpg",
    color: "purple",
  },
];

interface AnimatedItem {
  item: ItemType;
  index: number;
}

const AnimatedItem: React.FC<AnimatedItem> = ({ item, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative p-8 rounded-xl flex items-center justify-between shadow-md hover:shadow-lg transition duration-300 cursor-pointer group overflow-hidden"
      style={{
        height: "188px",
        width: "100%",
        maxWidth: "600px",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={item.img}
        alt={item.title}
        layout="fill"
        objectFit="cover"
        className="absolute inset-0"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative z-10 w-full">
        <h2 className="text-xl font-semibold text-white group-hover:text-gray-200 transition duration-300">
          {item.title}
        </h2>
        <AnimatePresence>
          {isHovered && (
            <motion.ul
              className="text-white mt-4 list-disc list-inside"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {item.desc.map((desc: string, i: number) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-sm"
                >
                  {desc}
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        className="relative z-10 flex items-center"
        animate={{ x: isHovered ? 10 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <ChevronRight className="text-white group-hover:text-gray-200 transition duration-300" />
      </motion.div>
    </motion.div>
  );
};

const AnimatedItems: React.FC = () => {
  return (
    <div className="space-y-6">
      {items.map((item, index) => (
        <AnimatedItem key={index} item={item} index={index} />
      ))}
    </div>
  );
};

export default AnimatedItems;

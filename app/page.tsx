"use client";
import React, { useEffect, useState, useRef, ReactNode } from "react";
import Image, { StaticImageData } from "next/image";
import {
  motion,
  useInView,
  AnimatePresence,
  useAnimationControls,
  useScroll,
  Variants,
} from "framer-motion";
import {
  Search,
  ChevronRight,
  DownloadIcon,
  Facebook,
  Linkedin,
  Instagram,
  Youtube,
  Home,
  Building2,
  Bed,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Lottie from "lottie-react";
import Animation from "../public/Animation.json";

import ImageSlider from "./components/common/ImageSlider";
import HostelAminities from "./components/common/HostelAminities";
import HostelFAQ from "./components/common/HostelFAQ";
import ContactModal from "./components/common/ContactModal";
import AnimatedItems from "./components/common/AnimatedItems";

interface NewsCard {
  image: string | StaticImageData; // Allow both string and StaticImageData
  date: string;
  source: string;
  title: string;
  description: string;
}

interface WelcomeScreenProps {
  showWelcome: boolean;
}

interface Stat {
  icon: ReactNode;
  value: string;
  label: string;
}

interface AnimatedStat extends Stat {}

interface SliderImage {
  src: StaticImageData;
  alt: string;
}

interface ColorScheme {
  bg: string;
  text: string;
  hover: string;
}

interface Item {
  title: string;
  desc: string[];
  img: StaticImageData;
  color: string;
}

interface NewsCardProps {
  image: string | StaticImageData; // Allow both string and StaticImageData
  date: string;
  source: string;
  title: string;
  description: string;
}

// Define the NewsCard component as a named function

interface NewsCardProps {
  image: string | StaticImageData; // Allow both string and StaticImageData
  date: string;
  source: string;
  title: string;
  description: string;
}

// Update the NewsCard component to handle both types of images
function NewsCard({ image, date, source, title, description }: NewsCardProps) {
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-md bg-white transition-transform transform hover:scale-105 duration-300">
      <div className="w-full h-64">
        <Image
          src={image}
          alt={title}
          width={400}
          height={200}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-6">
        <div className="font-bold text-2xl text-gray-800 mb-3">{title}</div>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
            {source}
          </span>
          <span className="text-gray-500 text-xs">{date}</span>
        </div>
      </div>
    </div>
  );
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ showWelcome }) => {
  if (!showWelcome) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-md">
      <div className="text-center text-white">
        <div className="mb-4 w-64 h-64 mx-auto">
          <Lottie animationData={Animation} loop={true} autoplay={true} />
        </div>
        <h1 className="text-4xl font-bold mb-2 animate-bounce">
          Welcome to Hostel Management
        </h1>
        <p className="text-xl">Experience comfort and community</p>
      </div>
    </div>
  );
};

const LivingHomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [showWelcome, setShowWelcome] = useState<boolean>(true);
  const router = useRouter();
  const [colorIndex, setColorIndex] = useState<number>(0);
  const controls = useAnimationControls();
  const { scrollY } = useScroll();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoveredDescIndex, setHoveredDescIndex] = useState<number | null>(null);

  const colors: ColorScheme[] = [
    { bg: "bg-white", text: "text-orange-500", hover: "hover:bg-orange-100" },
    { bg: "bg-orange-500", text: "text-white", hover: "hover:bg-orange-600" },
    { bg: "bg-blue-500", text: "text-white", hover: "hover:bg-blue-600" },
    { bg: "bg-green-500", text: "text-white", hover: "hover:bg-green-600" },
  ];

  useEffect(() => {
    const unsubscribe = scrollY.on("change", () => {
      setColorIndex((prevIndex) => (prevIndex + 1) % colors.length);
      controls.start({ opacity: [0.5, 1], scale: [0.95, 1] });
    });

    return () => unsubscribe();
  }, [scrollY, controls, colors.length]);

  const currentColor = colors[colorIndex];

  const Stat: React.FC<Stat> = ({ icon, value, label }) => {
    return (
      <div className="flex flex-col items-center">
        <div className="text-emerald-500 mb-2">{icon}</div>
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-gray-600">{label}</div>
      </div>
    );
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/explore?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const sliderImages = [
    { src: "/Images/Sliderwomensaftey1.jpg", alt: "womensaftey" },
    { src: "/Images/SliderClean&Hygine.jpg", alt: "Clean&Hygine" },
    { src: "/Images/SliderHealth&Hygine.jpg", alt: "HealthHygine" },
    { src: "/Images/SliderFood.jpg", alt: "Food" },
  ];

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
  };

  const childVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const containerVariantshorizontal: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.2,
      },
    },
  };

  const letterVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const text = "What Kind of Hostel you are ";
  const highlightedText = "Looking for";

  const containerVariantsRightPlace: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse",
        repeatDelay: 1,
      },
    },
  };

  const texthelp = "Read more about how we can help:";
  const words = texthelp.split(" ");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.04,
      },
    },
  };

  const child: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const AnimatedStat: React.FC<AnimatedStat> = ({ icon, value, label }) => {
    return (
      <div className="flex flex-col items-center">
        <motion.div
          whileHover={{ scale: 2.5 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {icon}
        </motion.div>
        <p className="mt-2 text-2xl font-bold">{value}</p>
        <p className="text-gray-500">{label}</p>
      </div>
    );
  };

  const textVariants: Variants = {
    initial: {
      background: "linear-gradient(90deg, #10b981 0%, #10b981 100%)",
      backgroundSize: "0% 100%",
      backgroundRepeat: "no-repeat",
      backgroundClip: "text",
      WebkitBackgroundClip: "text",
      color: "transparent",
    },
    animate: {
      backgroundSize: "100% 100%",
      transition: {
        duration: 1,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse",
        repeatDelay: 0.5,
      },
    },
    hover: {
      scale: 1.05,
      textShadow: "0 0 8px rgba(16, 185, 129, 0.6)",
    },
  };

  // const items: Item[] = [
  //   {
  //     title: "Cleanliness is next to godliness",
  //     desc: [
  //       "Promotes health and comfort.",
  //       "Ensures a welcoming atmosphere.",
  //       "Regular sanitization and organization.",
  //     ],
  //     img: SliderCleanHygine,
  //     color: "blue",
  //   },
  //   {
  //     title: "Your safety is our priority",
  //     desc: [
  //       "Security measures.",
  //       "Vigilant staff and clear protocols.",
  //       "Secure access and well-lit areas.",
  //     ],
  //     img: Sliderwomensaftey1,
  //     color: "green",
  //   },
  //   {
  //     title: "Health is wealth",
  //     desc: [
  //       "Hygienic practices ensure safety.",
  //       "Proper ventilation and waste management.",
  //       "Regular cleaning and sanitization.",
  //     ],
  //     img: SliderHealthHygine,
  //     color: "purple",
  //   },
  // ];

  interface NewsCardProps {
    image: string;
    date: string;
    source: string;
    title: string;
    description: string;
  }

  const newsItems: NewsCardProps[] = [
    {
      image: "/Images/DirectorSays1.jpeg",
      date: "Sep 16, 2020",
      source: "What our Director says",
      title: "Our Aim is to make safe and healthy society",
      description:
        "Our aim is to cultivate a haven where health and safety are paramount. We meticulously maintain cleanliness, implement robust security measures, and foster a supportive community, ensuring every guest's well-being and peace of mind.",
    },
    {
      image: "/Images/coexist.jpeg",

      date: "Aug 13, 2020",
      source: "What do you think?",
      title: "We co-exist!! we bring everyone together with compassion",
      description:
        "In our vibrant community, every individual matters. We celebrate diversity and foster an environment of mutual respect, understanding, and empathy. Together, we create a harmonious space where compassion guides our interactions, enriching everyone's experience.",
    },
    {
      image: "/Images/poojaSays.jpeg",
      date: "Jun 12, 2020",
      source: "Pooja's opinion",
      title: "We're family & your opinion Matters",
      description:
        "Exceptional stay! Clean, comfortable rooms with modern amenities. Friendly staff went above and beyond. Great common areas fostered a welcoming atmosphere. Prime location, excellent security, and diverse activities. Will definitely return and highly recommend!",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800">
      <WelcomeScreen showWelcome={showWelcome} />

      <div className="container mx-auto px-4 py-8">
        <header className="flex flex-col md:flex-row justify-between items-center py-4 mb-12"></header>

        <main className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <motion.h1
              ref={ref}
              className="text-4xl md:text-5xl font-bold leading-tight"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <motion.span
                className="text-blue-800 block"
                variants={childVariants}
              >
                Live smarter, not farther.
              </motion.span>
              <motion.span
                className="text-indigo-600 block"
                variants={childVariants}
              >
                Unwind closer to work &amp; study.
              </motion.span>
            </motion.h1>
            <form onSubmit={handleSearch}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Find your ideal living space..."
                  className="w-full px-6 py-4 rounded-full text-lg outline-none shadow-lg focus:ring-2 focus:ring-blue-400 transition duration-300"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full flex items-center transition duration-300">
                  <Search size={20} className="mr-2" />
                  Search
                </button>
              </div>
            </form>

            <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden max-w-6xl mx-auto my-8">
              <div className="md:w-1/2 p-8">
                <motion.h2
                  ref={ref}
                  className="text-3xl font-bold mb-4"
                  variants={containerVariantshorizontal}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                >
                  {text.split("").map((char, index) => (
                    <motion.span key={index} variants={letterVariants}>
                      {char}
                    </motion.span>
                  ))}
                  <motion.span
                    className="text-teal-500"
                    variants={containerVariants}
                  >
                    {highlightedText.split("").map((char, index) => (
                      <motion.span key={index} variants={letterVariants}>
                        {char}
                      </motion.span>
                    ))}
                  </motion.span>
                </motion.h2>
                <p className="text-gray-600 mb-6">
                  We're eager to understand your ideal hostel experience. What
                  amenities matter most to you? Are you seeking social spaces,
                  quiet areas, or both? Tell us about your preferences in room
                  types, security needs, and desired facilities.
                </p>
                <p className="mb-6">
                  Leave your details here for us to take it further:
                </p>
                <button
                  className="bg-teal-500 text-white font-bold py-2 px-4 rounded hover:bg-teal-600 transition duration-300"
                  onClick={() => setIsModalOpen(true)}
                >
                  Share Requirement
                </button>
              </div>

              <div className="md:w-1/2 relative">
                <Image
                  src={"/Images/yourrequirement.jpeg"}
                  alt="Product samples"
                  width={800}
                  height={600}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            <p className="text-xl text-gray-600 max-w-2xl">
              Experience a new way of living with our professionally managed
              accommodations, tailored for students and young professionals.
            </p>

            <div>
              <div className="mt-8 relative">
                <div className="mt-8 relative">
                  <ImageSlider images={sliderImages} />
                </div>
                <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 p-4 rounded-lg shadow-md">
                  <p className="text-sm font-medium text-gray-800">
                    Find your perfect space today!
                  </p>
                </div>
              </div>

              <div className="flex justify-center items-center h-42 bg-gray-100 mt-10">
                <motion.h1
                  className="text-5xl md:text-6xl lg:text-7xl font-bold text-center"
                  variants={containerVariantsRightPlace}
                  initial="hidden"
                  animate="visible"
                >
                  You've come to the
                  <br />
                  <motion.span className="text-teal-500">
                    right place
                  </motion.span>
                  , Mate
                </motion.h1>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <AnimatedItems />

            {/* New Advertisement Section */}
            <div className="file:bg-gradient-to-r from-yellow-400 to-orange-500 bg-gray-100 p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-orange mb-2">
                premium membership!
              </h3>
              <p className="text-orange mb-4">
                Exclusive perks elevate your stay Exclusive perks elevate your
                stay Exclusive perks elevate your stay
              </p>
              <button className="bg-white mb-5 text-orange-500 font-semibold py-2 px-4 rounded-full hover:bg-orange-100 transition duration-300">
                looking for Offers!!
              </button>

              <div className="relative bg-[#e6f4f1] p-6 ">
                <div className="max-w-4xl mx-auto">
                  <h1 className="text-2xl font-bold mb-2">
                    Step into a room that has{" "}
                    <span className="text-[#20b2aa]">room for everything</span>
                  </h1>
                  <p className="text-gray-600 mb-8 max-w-2xl mt-1 ">
                    Your clothes and bag will not be fighting for space on the
                    same chair.
                    <br />
                    Bring a box full of hopes, dreams, ambitions… and of course,
                    your personal belongings.
                    {/* Bring a box full of hopes, dreams, ambitions… and of course, your personal belongings. */}
                  </p>
                  <div className="flex justify-end space-x-4">
                    <div className="relative w-64 h-48 rounded-lg overflow-hidden shadow-lg mt-2">
                      <Image
                        src={"/Images/Sliderwomensaftey1.jpg"}
                        alt="Stanza Living Room"
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    <div className="relative w-80 h-64 rounded-lg overflow-hidden shadow-lg -mt-9">
                      <Image
                        src={"/Images/people1.jpeg"}
                        alt="Stanza Living Room Detail"
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  </div>
                </div>
                <div className="absolute top-0 left-0 w-full h-full -z-10">
                  <div className="w-full h-full bg-[#e6f4f1]" />
                  <div className="absolute top-0 right-0 w-3/4 h-3/4 border-t-2 border-r-2 border-[#20b2aa] rounded-tr-full" />
                </div>
              </div>
            </div>
          </div>

          <ContactModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </main>

        <div className="flex flex-col md:flex-row p-8 bg-gray-100 mt-5">
          <div className="md:w-1/2 pr-8">
            <Image
              src={"/Images/partnerwithus.jpg"}
              alt="College students walking"
              width={500}
              height={300}
              className="rounded-lg shadow-md"
            />
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <h1 className="text-4xl font-bold mb-4">
              Your people in the{" "}
              <span className="text-teal-500">right care</span>
            </h1>
            <p className="mb-6 text-gray-700">
              You care for your people, and so do we. Let's give them more than
              just four walls and a roof. Let's give them a place where they'll
              feel taken care of. From safety to amenities, we'll leave them
              wanting nothing. And for this to happen, all you have to do is to
              partner with us (and your people will thank you for it).
            </p>

            <motion.p
              className="mb-4 font-semibold"
              variants={container}
              initial="hidden"
              animate="visible"
              exit="hidden"
              key={Math.random()} // Force re-render on each animation cycle
            >
              {words.map((word, index) => (
                <motion.span
                  key={index}
                  style={{ display: "inline-block", marginRight: "0.25em" }}
                  variants={child}
                >
                  {word}
                </motion.span>
              ))}
            </motion.p>

            <div className="flex items-center mb-6">
              <span className="mr-4 text-teal-500">📚</span>
              <span>For college hostels :</span>
              <a href="https://drive.google.com/file/d/1l7X1_FnAcrHJKiI2AS4dYsxgS5uzYyF4/view?usp=sharing">
                <button className="ml-4 px-4 py-2 bg-teal-500 text-white rounded-md flex items-center">
                  <DownloadIcon className="mr-2" size={16} />
                  Download brochure
                </button>
              </a>
            </div>
            <div>
              <p className="mb-2">
                Leave your details here for us to touch base with you :
              </p>

              <button
                className="px-6 py-3 bg-teal-500 text-white rounded-md"
                onClick={() => setIsModalOpen(true)}
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginLeft: "20px", marginTop: "20px" }}>
        <HostelAminities />
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center space-x-8 mb-12">
          <AnimatedStat icon={<Home />} value="24+" label="Cities" />
          <AnimatedStat icon={<Building2 />} value="450+" label="Residences" />
          <AnimatedStat icon={<Bed />} value="70,000+" label="Beds" />
        </div>
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">
            <span className="text-emerald-500">Not just</span> four walls and a
            roof
          </h1>
          <p className="text-xl text-gray-600">
            Come over and experience how a place to stay can be so much more
          </p>
        </div>
      </div>

      {/* director says cards */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {newsItems.map((item, index) => (
            <NewsCard key={index} {...item} />
          ))}
        </div>
      </div>

      <div className="rounded-lg">
        <div className="text-center mb-4 mt-4">
          <h1 className="text-black-500 text-4xl font-bold">
            Welcome to our Hostel
            <motion.span
              className="text-emerald-500 font-bold block"
              variants={textVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
            >
              Booking Services
            </motion.span>
          </h1>
          <h2 className="text-2xl font-semibold mt-2">Is Available Now</h2>
        </div>
        <HostelFAQ />
      </div>

      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="mb-4 md:mb-0">
              <Image
                src={"/Images/HostelLogo4.png"}
                alt="Stanza Living"
                width={150}
                height={50}
                className="rounded-lg"
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="flex flex-col space-y-2">
                <h3 className="font-semibold text-white">About Us</h3>
                <a href="#" className="text-gray-300 hover:text-white">
                  Team
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  Investor Relations
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  Media
                </a>
              </div>
              <div className="flex flex-col space-y-2">
                <h3 className="font-semibold text-white">Blogs</h3>
                <a href="#" className="text-gray-300 hover:text-white">
                  FAQs
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  Refer and Earn
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  House Rules
                </a>
              </div>
              <div className="flex flex-col space-y-2">
                <h3 className="font-semibold text-white">T&C</h3>
                <a href="#" className="text-gray-300 hover:text-white">
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  Contact Us
                </a>
                <a href="#" className="text-gray-300 hover:text-white">
                  COVID-19
                </a>
              </div>
              <div className="flex flex-col space-y-2">
                <h3 className="font-semibold text-white">Partner With Us</h3>
                <a href="#" className="text-gray-300 hover:text-white">
                  Cookie Policy
                </a>
              </div>
            </div>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" aria-label="Facebook">
                <Facebook className="text-white hover:text-blue-500" />
              </a>
              <a href="#" aria-label="LinkedIn">
                <Linkedin className="text-white hover:text-blue-700" />
              </a>
              <a href="#" aria-label="Instagram">
                <Instagram className="text-white hover:text-pink-500" />
              </a>
              <a href="#" aria-label="YouTube">
                <Youtube className="text-white hover:text-red-600" />
              </a>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>
              Copyright © 2024 | All Rights Reserved by Dtwelve Spaces Pvt Ltd.
              |{" "}
              <a href="#" className="hover:text-white">
                Sitemap
              </a>
            </p>
            <p className="mt-2 md:mt-0">
              Images shown are for representational purposes only. Amenities
              depicted may or may not form a part of that individual property.
            </p>
          </div>
        </div>
        <div className="fixed bottom-4 right-4">
          <a href="#" aria-label="WhatsApp">
            <div className="bg-green-500 p-3 rounded-full shadow-lg hover:bg-green-600 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
              >
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
            </div>
          </a>
        </div>
      </footer>
    </div>
  );
};

export default LivingHomePage;

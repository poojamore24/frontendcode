"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faUsers,
  faBuilding,
  faTasks,
  faSignOutAlt,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { faUserTie } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import styles from "./Sidebar.module.css"; // Import the CSS module

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleResize = () => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
      setIsOpen(false); // Ensure sidebar is closed on mobile by default
    } else {
      setIsMobile(false);
      setIsOpen(true); // Ensure sidebar is open on desktop by default
    }
  };

  useEffect(() => {
    handleResize(); // Set initial state
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {/* Mobile menu button */}
      {isMobile && (
        <button
          className={`${styles.mobileMenuButton} p-4 text-gray-300 focus:outline-none fixed top-0 left-0 z-20`}
          onClick={toggleSidebar}
        >
          <FontAwesomeIcon icon={faBars} className="h-6 w-6" />
        </button>
      )}

      {/* Sidebar */}
      <aside
        className={`${styles.sidebar} ${
          isMobile && !isOpen ? styles.mobileSidebar : ""
        } ${isMobile && isOpen ? styles.mobileSidebarOpen : ""} bg-black`}
      >
        <nav className="flex-1 overflow-y-auto px-3">
          <ul>
            {[
              { icon: faTachometerAlt, path: "/", label: "Dashboard" },
              { icon: faUsers, path: "/students", label: "Students" },
              { icon: faUserTie, path: "/owners", label: "Hostel Owners" },
              { icon: faBuilding, path: "/hostels", label: "Hostels" },
              { icon: faTasks, path: "/uac", label: "UAC" },
              { icon: faTasks, path: "/tasks", label: "Tasks" },
              { icon: faSignOutAlt, path: "/logout", label: "Logout" },
            ].map((item) => (
              <li key={item.path} className="mb-4 text-xl flex items-center">
                <FontAwesomeIcon
                  icon={item.icon}
                  className={`h-6 w-6 ${
                    pathname === item.path ? "text-blue-500" : "text-gray-300"
                  } mr-3`}
                />
                <Link
                  href={item.path}
                  className={`text-xl ${
                    pathname === item.path ? "text-blue-500" : "text-gray-300"
                  } hover:text-blue-400`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}

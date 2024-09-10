// components/NotificationBell.tsx
"use client";
import React, { useState } from "react";
import { BellIcon } from "@heroicons/react/outline";

interface NotificationBellProps {
  notifications: { id: number; message: string; action: () => void }[];
}

export default function NotificationBell({
  notifications,
}: NotificationBellProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed left-4 bottom-4">
      <div className="relative">
        <button
          className="relative z-10 p-3 rounded-full bg-gray-800 text-white hover:bg-gray-700 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <BellIcon className="h-6 w-6" />
          {notifications.length > 0 && (
            <span className="absolute top-0 left-0 inline-block w-4 h-4 bg-red-600 text-white text-xs font-bold rounded-full text-center">
              {notifications.length}
            </span>
          )}
        </button>
        {isOpen && (
          <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-20">
            <ul className="py-2">
              {notifications.length === 0 ? (
                <li className="px-4 py-2 text-gray-600">No pending tasks</li>
              ) : (
                notifications.map((notification) => (
                  <li
                    key={notification.id}
                    className="px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer"
                    onClick={notification.action}
                  >
                    {notification.message}
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

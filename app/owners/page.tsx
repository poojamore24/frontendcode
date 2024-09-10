"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

interface Owner {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  address?: string;
  image: string;
}

export default function OwnersPage() {
  const [owners, setOwners] = useState<Owner[]>([]);

  // Sample dummy data
  const dummyData: Owner[] = [
    {
      id: "1",
      name: "Michael Scott",
      email: "michael.scott@example.com",
      phone: "123-456-7890",
      status: "active",
      address: "123 Main St, Scranton, PA",
      image:
        "https://plus.unsplash.com/premium_photo-1669725348352-6fc2bd2ea01d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZXBpY3R1cmV8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: "2",
      name: "Jim Halpert",
      email: "jim.halpert@example.com",
      phone: "234-567-8901",
      status: "inactive",
      address: "456 Oak St, Scranton, PA",
      image:
        "https://media.istockphoto.com/id/1300972574/photo/millennial-male-team-leader-organize-virtual-workshop-with-employees-online.webp?b=1&s=170667a&w=0&k=20&c=96pCQon1xF3_onEkkckNg4cC9SCbshMvx0CfKl2ZiYs=",
    },
    {
      id: "3",
      name: "Pam Beesly",
      email: "pam.beesly@example.com",
      phone: "345-678-9012",
      status: "active",
      address: "789 Pine St, Scranton, PA",
      image:
        "https://media.istockphoto.com/id/1338134336/photo/headshot-portrait-african-30s-man-smile-look-at-camera.jpg?s=612x612&w=0&k=20&c=kUVdvBnwnZRxausswIKRZuC25bZgTXwrmGSPikdcOro=",
    },
    {
      id: "4",
      name: "Dwight Schrute",
      email: "dwight.schrute@example.com",
      phone: "456-789-0123",
      status: "active",
      address: "101 Maple St, Scranton, PA",
      image:
        "https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?s=612x612&w=0&k=20&c=kPvoBm6qCYzQXMAn9JUtqLREXe9-PlZyMl9i-ibaVuY=",
    },
  ];

  useEffect(() => {
    // Set the dummy data
    setOwners(dummyData);
  }, []);

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500";
      case "inactive":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="p-8 min-h-screen bg-black">
      <h2 className="text-3xl font-bold mb-6 text-white">Owners</h2>
      <div className="bg-black p-6 rounded-lg shadow-lg">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-black divide-y divide-gray-700">
            {owners.map((owner) => (
              <tr
                key={owner.id}
                className="hover:bg-gray-800 transition duration-200 ease-in-out"
              >
                <td className="px-6 py-4 text-sm text-gray-400">
                  <img
                    src={owner.image}
                    alt={owner.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-700"
                  />
                </td>
                <td className="px-6 py-4 text-sm font-medium text-white">
                  {owner.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-400">
                  {owner.email}
                </td>
                <td className="px-6 py-4 text-sm text-gray-400">
                  {owner.phone}
                </td>
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`inline-block px-3 py-1 text-xs font-semibold text-white rounded-full ${getStatusBadgeColor(
                      owner.status
                    )}`}
                  >
                    {owner.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-medium">
                  <Link
                    href={`/owners/${owner.id}`}
                    className="text-cyan-400 hover:text-cyan-300 transition duration-200 ease-in-out"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

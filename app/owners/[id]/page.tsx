"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import styles from "./OwnerDetailPage.module.css";

// Define the interface for an owner
interface Owner {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  address?: string; // Optional field
  image: string; // Image property
}

export default function OwnerDetailPage() {
  const { id } = useParams();
  const router = useRouter(); // Hook to handle navigation
  const [owner, setOwner] = useState<Owner | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editData, setEditData] = useState<Owner | null>(null);

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
    // Find owner with matching ID from dummy data
    const ownerData = dummyData.find((owner) => owner.id === id);
    setOwner(ownerData || null);
    setEditData(ownerData || null); // Initialize edit data
  }, [id]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    if (editData) {
      // Here, you would typically send the updated data to the server
      setOwner(editData); // Update state with edited data
    }
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editData) {
      setEditData({
        ...editData,
        [name]: value,
      });
    }
  };

  return (
    <div className={`p-8 ${styles.container}`}>
      <h2 className="text-3xl font-bold mb-6 text-white">Owner Details</h2>
      {owner ? (
        <div
          className={`${styles.glowEffect} p-6 rounded-lg shadow-lg flex flex-col items-center`}
        >
          <img
            src={owner.image}
            alt={owner.name}
            className="w-24 h-24 rounded-full object-cover mb-4"
          />
          <div className="text-center">
            <h3 className="text-xl font-semibold text-white mb-2">
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={editData ? editData.name : ""}
                  onChange={handleChange}
                  className="bg-gray-700 text-white p-1 rounded"
                />
              ) : (
                owner.name
              )}
            </h3>
            <p className="text-sm text-gray-400 mb-2">
              Email:{" "}
              {isEditing ? (
                <input
                  type="text"
                  name="email"
                  value={editData ? editData.email : ""}
                  onChange={handleChange}
                  className="bg-gray-700 text-white p-1 rounded"
                />
              ) : (
                owner.email
              )}
            </p>
            <p className="text-sm text-gray-400 mb-2">
              Phone:{" "}
              {isEditing ? (
                <input
                  type="text"
                  name="phone"
                  value={editData ? editData.phone : ""}
                  onChange={handleChange}
                  className="bg-gray-700 text-white p-1 rounded"
                />
              ) : (
                owner.phone
              )}
            </p>
            <p className="text-sm text-gray-400 mb-2">
              Status:{" "}
              {isEditing ? (
                <input
                  type="text"
                  name="status"
                  value={editData ? editData.status : ""}
                  onChange={handleChange}
                  className="bg-gray-700 text-white p-1 rounded"
                />
              ) : (
                owner.status
              )}
            </p>
            {owner.address && (
              <p className="text-sm text-gray-400 mb-2">
                Address:{" "}
                {isEditing ? (
                  <input
                    type="text"
                    name="address"
                    value={editData ? editData.address || "" : ""}
                    onChange={handleChange}
                    className="bg-gray-700 text-white p-1 rounded"
                  />
                ) : (
                  owner.address
                )}
              </p>
            )}
          </div>
          <div className="flex space-x-4">
            <button onClick={() => router.back()} className={styles.button}>
              <FontAwesomeIcon icon={faArrowLeft} size="lg" /> Back
            </button>
            {isEditing ? (
              <button onClick={handleSaveClick} className={styles.button}>
                Save
              </button>
            ) : (
              <button onClick={handleEditClick} className={styles.button}>
                Edit
              </button>
            )}
          </div>
        </div>
      ) : (
        <p className="text-white">Owner not found</p>
      )}
    </div>
  );
}

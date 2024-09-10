"use client";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import styles from "./StudentDetailPage.module.css";

// Define the interface for a student
interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  address?: string; // Optional field
  image: string; // Added image property
}

export default function StudentDetailPage() {
  const { id } = useParams();
  const router = useRouter(); // Hook to handle navigation
  const [student, setStudent] = useState<Student | null>(null);

  const [isEditing, setIsEditing] = useState<boolean>(false);
  // Sample dummy data
  const dummyData: Student[] = [
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "123-456-7890",
      status: "active",
      address: "123 Main St, Anytown, USA",
      image:
        "https://plus.unsplash.com/premium_photo-1669725348352-6fc2bd2ea01d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZXBpY3R1cmV8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "234-567-8901",
      status: "inactive",
      address: "456 Oak St, Somewhere, USA",
      image:
        "https://media.istockphoto.com/id/1300972574/photo/millennial-male-team-leader-organize-virtual-workshop-with-employees-online.webp?b=1&s=170667a&w=0&k=20&c=96pCQon1xF3_onEkkckNg4cC9SCbshMvx0CfKl2ZiYs=",
    },
    {
      id: "3",
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      phone: "345-678-9012",
      status: "active",
      address: "789 Pine St, Cityville, USA",
      image:
        "https://media.istockphoto.com/id/1338134336/photo/headshot-portrait-african-30s-man-smile-look-at-camera.jpg?s=612x612&w=0&k=20&c=kUVdvBnwnZRxausswIKRZuC25bZgTXwrmGSPikdcOro=",
    },
    {
      id: "4",
      name: "Bob Brown",
      email: "bob.brown@example.com",
      phone: "456-789-0123",
      status: "active",
      address: "101 Maple St, Townsville, USA",
      image:
        "https://media.istockphoto.com/id/1309328823/photo/headshot-portrait-of-smiling-male-employee-in-office.jpg?s=612x612&w=0&k=20&c=kPvoBm6qCYzQXMAn9JUtqLREXe9-PlZyMl9i-ibaVuY=",
    },
  ];

  useEffect(() => {
    // Find student with matching ID from dummy data
    const studentData = dummyData.find((student) => student.id === id);
    setStudent(studentData || null);
  }, [id]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    // Handle save logic here
    setIsEditing(false);
  };

  return (
    <div className={`p-8 min-h-screen ${styles.container}`}>
      <h2 className="text-3xl font-bold mb-6 text-white">Student Details</h2>
      {student ? (
        <div
          className={`${styles.glowEffect} relative bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center`}
        >
          <img
            src={student.image}
            alt={student.name}
            className={`w-24 h-24 rounded-full object-cover mb-4`}
          />
          <div className="mb-4 text-center">
            {isEditing ? (
              <div className="grid grid-cols-1 gap-2 text-gray-400">
                {/* Editable fields */}
                <div className="flex">
                  <span className={`font-semibold ${styles.textPrimary}`}>
                    Email:
                  </span>
                  <input
                    type="text"
                    value={student.email}
                    onChange={(e) =>
                      setStudent({ ...student, email: e.target.value })
                    }
                    className="ml-2 p-1 rounded"
                  />
                </div>
                <div className="flex">
                  <span className={`font-semibold ${styles.textPrimary}`}>
                    Phone:
                  </span>
                  <input
                    type="text"
                    value={student.phone}
                    onChange={(e) =>
                      setStudent({ ...student, phone: e.target.value })
                    }
                    className="ml-2 p-1 rounded"
                  />
                </div>
                <div className="flex">
                  <span className={`font-semibold ${styles.textPrimary}`}>
                    Status:
                  </span>
                  <input
                    type="text"
                    value={student.status}
                    onChange={(e) =>
                      setStudent({ ...student, status: e.target.value })
                    }
                    className="ml-2 p-1 rounded"
                  />
                </div>
                {student.address && (
                  <div className="flex">
                    <span className={`font-semibold ${styles.textPrimary}`}>
                      Address:
                    </span>
                    <input
                      type="text"
                      value={student.address}
                      onChange={(e) =>
                        setStudent({ ...student, address: e.target.value })
                      }
                      className="ml-2 p-1 rounded"
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-2 text-gray-400">
                <div className="flex">
                  <span className={`font-semibold ${styles.textPrimary}`}>
                    Email:
                  </span>
                  <span className="ml-2">{student.email}</span>
                </div>
                <div className="flex">
                  <span className={`font-semibold ${styles.textPrimary}`}>
                    Phone:
                  </span>
                  <span className="ml-2">{student.phone}</span>
                </div>
                <div className="flex">
                  <span className={`font-semibold ${styles.textPrimary}`}>
                    Status:
                  </span>
                  <span className="ml-2">{student.status}</span>
                </div>
                {student.address && (
                  <div className="flex">
                    <span className={`font-semibold ${styles.textPrimary}`}>
                      Address:
                    </span>
                    <span className="ml-2">{student.address}</span>
                  </div>
                )}
              </div>
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
        <p className="text-white">Student not found</p>
      )}
    </div>
  );
}

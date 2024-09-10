"use client";
import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

interface User {
  _id: string;
  email: string;
  roleName: string;
  lastLogin?: Date;
  lastLogout?: Date;
  role?: {
    _id: string;
    name: string;
  };
  password?: string;
}

interface NewUser {
  email: string;
  password: string;
  roleName: string;
}

interface Role {
  _id: string;
  name: string;
  description: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [newUser, setNewUser] = useState<NewUser>({
    email: "",
    password: "",
    roleName: "",
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [roles, setRoles] = useState<Role[]>([]);

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const fetchRoles = async (): Promise<void> => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await axios.get<Role[]>(
        "https://hostelproject-backend-coed.onrender.com/api/admin/getroles",
        config
      );
      setRoles(response.data);
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  const fetchUsers = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const response = await axios.get<User[]>(
        "https://hostelproject-backend-coed.onrender.com/api/admin/users",
        config
      );
      setUsers(
        response.data.map((user) => ({
          ...user,
          roleName: user.roleName || "No Role Assigned",
        }))
      );
    } catch (error) {
      setError("Error fetching users. Please try again.");
      console.error("Error fetching users:", error);
    }
    setLoading(false);
  };

  const handleDelete = async (user: User): Promise<void> => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      await axios.delete(
        `https://hostelproject-backend-coed.onrender.com/api/admin/users/${user._id}`,
        config
      );

      setUsers(users.filter((u) => u._id !== user._id));
    } catch (error) {
      setError("Error deleting user. Please try again.");
      console.error("Error deleting user:", error);
    }
    setLoading(false);
  };

  const handleEdit = (user: User): void => {
    setSelectedUser({
      ...user,
      roleName: user.roleName || "No Role Assigned",
    });
    setIsEditing(true);
    setShowModal(true);
  };

  const handleAdd = (): void => {
    setNewUser({ email: "", password: "", roleName: "" });
    setIsEditing(false);
    setShowModal(true);
  };

  const handleSave = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      if (isEditing && selectedUser) {
        const updateData: Partial<User> = {
          roleName: selectedUser.roleName,
          email: selectedUser.email,
        };
        if (selectedUser.password) {
          updateData.password = selectedUser.password;
        }

        if (!updateData.roleName) {
          throw new Error("Role name is required");
        }

        await axios.put(
          `https://hostelproject-backend-coed.onrender.com/api/admin/users/${selectedUser._id}/role`,
          updateData,
          config
        );
      } else {
        if (!newUser.email || !newUser.password || !newUser.roleName) {
          throw new Error("Please fill in all fields");
        }
        await axios.post(
          "https://hostelproject-backend-coed.onrender.com/api/admin/users",
          newUser,
          config
        );
      }

      setShowModal(false);
      setSelectedUser(null);
      setNewUser({ email: "", password: "", roleName: "" });
      await fetchUsers();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(`Error: ${error.response.data.message}`);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
      console.error("Error saving user:", error);
    }
    setLoading(false);
  };

  if (loading) return <div className="text-sky-600">Loading...</div>;

  return (
    <div className="p-4 bg-white">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <h2 className="text-xl font-semibold mb-2 sm:mb-0 text-sky-700">
          Users
        </h2>
        <div>
          <button
            className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded"
            onClick={handleAdd}
          >
            Add
          </button>
        </div>
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="hidden sm:block overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
          <thead className="bg-sky-100 text-sky-700">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Last Login</th>
              <th className="px-4 py-2 text-left">Last Logout</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b border-sky-100">
                <td className="px-4 py-2 truncate">{user._id}</td>
                <td className="px-4 py-2">{user.roleName}</td>
                <td className="px-4 py-2 truncate">{user.email}</td>
                <td className="px-4 py-2">
                  {user.lastLogin
                    ? new Date(user.lastLogin).toLocaleString()
                    : "N/A"}
                </td>
                <td className="px-4 py-2">
                  {user.lastLogout
                    ? new Date(user.lastLogout).toLocaleString()
                    : "N/A"}
                </td>
                <td className="px-4 py-2">
                  <button
                    className="bg-sky-500 hover:bg-sky-600 text-white px-2 py-1 rounded text-sm mr-2"
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm"
                    onClick={() => handleDelete(user)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="sm:hidden space-y-4">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-white rounded-lg p-4 shadow-md border border-sky-100"
          >
            <div className="mb-2">
              <span className="font-semibold text-sky-700">ID:</span>
              <span className="ml-2 text-sky-900 truncate">{user._id}</span>
            </div>
            <div className="mb-2">
              <span className="font-semibold text-sky-700">Role:</span>
              <span className="ml-2 text-sky-900 truncate">
                {user.roleName}
              </span>
            </div>
            <div className="mb-2">
              <span className="font-semibold text-sky-700">Email:</span>
              <span className="ml-2 text-sky-900 truncate">{user.email}</span>
            </div>
            <div className="mb-2">
              <span className="font-semibold text-sky-700">Last Login:</span>
              <span className="ml-2 text-sky-900">
                {user.lastLogin
                  ? new Date(user.lastLogin).toLocaleString()
                  : "N/A"}
              </span>
            </div>
            <div className="mb-2">
              <span className="font-semibold text-sky-700">Last Logout:</span>
              <span className="ml-2 text-sky-900">
                {user.lastLogout
                  ? new Date(user.lastLogout).toLocaleString()
                  : "N/A"}
              </span>
            </div>
            <div className="flex space-x-2">
              <button
                className="bg-sky-500 hover:bg-sky-600 text-white px-2 py-1 rounded text-sm"
                onClick={() => handleEdit(user)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm"
                onClick={() => handleDelete(user)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4 text-sky-700">
              {isEditing ? "Edit User" : "Add User"}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block mb-1 text-sky-700">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 bg-sky-50 text-sky-900 rounded border border-sky-200"
                  value={isEditing ? selectedUser?.email || "" : newUser.email}
                  onChange={(e) =>
                    isEditing
                      ? setSelectedUser(
                          (prevState) =>
                            prevState && {
                              ...prevState,
                              email: e.target.value,
                            }
                        )
                      : setNewUser({ ...newUser, email: e.target.value })
                  }
                />
              </div>
              {!isEditing && (
                <div>
                  <label className="block mb-1 text-sky-700">Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 bg-sky-50 text-sky-900 rounded border border-sky-200"
                    value={newUser.password}
                    onChange={(e) =>
                      setNewUser({ ...newUser, password: e.target.value })
                    }
                  />
                </div>
              )}
              <div>
                <label className="block mb-1 text-sky-700">Role</label>
                <select
                  className="w-full px-4 py-2 bg-sky-50 text-sky-900 rounded border border-sky-200"
                  value={
                    isEditing ? selectedUser?.roleName || "" : newUser.roleName
                  }
                  onChange={(e) =>
                    isEditing
                      ? setSelectedUser(
                          (prevState) =>
                            prevState && {
                              ...prevState,
                              roleName: e.target.value,
                            }
                        )
                      : setNewUser({ ...newUser, roleName: e.target.value })
                  }
                >
                  <option value="">Select Role</option>
                  {roles.map((role) => (
                    <option key={role._id} value={role.name}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {error && <div className="text-red-500 mt-4">{error}</div>}
            <div className="flex justify-end mt-6">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded mr-2"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded"
                onClick={handleSave}
              >
                {isEditing ? "Save Changes" : "Add User"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;

"use client"
import { FaCheck, FaTimes } from "react-icons/fa";
import { useState } from "react";
import { SnackbarProvider, useSnackbar } from "notistack";

interface Task {
  id: number;
  name: string;
  type: "wishlist" | "hostels";
  items: string[];
}

const tasks: Task[] = [
  {
    id: 1,
    name: "RAMAKANT",
    type: "wishlist",
    items: ["Hostel A", "Hostel B", "Hostel C"],
  },
  // Other tasks commented out for brevity
];

function TaskList() {
  const [taskList, setTaskList] = useState<Task[]>(tasks);
  const { enqueueSnackbar } = useSnackbar();

  const handleRemoveItem = (taskId: number, itemIndex: number) => {
    setTaskList((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              items: task.items.filter((_, index) => index !== itemIndex),
            }
          : task
      )
    );
    enqueueSnackbar("Item removed successfully!", { variant: "success" });
  };

  const handleVerifyItem = (taskId: number, itemIndex: number) => {
    console.log(`Verify item at index ${itemIndex} in task ${taskId}`);
    enqueueSnackbar("Item verified successfully!", { variant: "success" });
  };

  const handleUnverifyItem = (taskId: number, itemIndex: number) => {
    console.log(`Unverify item at index ${itemIndex} in task ${taskId}`);
    enqueueSnackbar("Item unverified successfully!", { variant: "warning" });
  };

  const handleApproveTask = (taskId: number) => {
    console.log(`Approve task ${taskId}`);
    enqueueSnackbar("Task approved successfully!", { variant: "success" });
  };

  const handleUnapproveTask = (taskId: number) => {
    console.log(`Unapprove task ${taskId}`);
    enqueueSnackbar("Task unapproved successfully!", { variant: "warning" });
  };

  const handleVerifyAll = (taskId: number) => {
    console.log(`Verify all items in task ${taskId}`);
    enqueueSnackbar("All items verified successfully!", { variant: "success" });
  };

  const handleUnverifyAll = (taskId: number) => {
    console.log(`Unverify all items in task ${taskId}`);
    enqueueSnackbar("All items unverified successfully!", {
      variant: "warning",
    });
  };

  return (
    <div className="flex flex-col p-4 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {taskList.map((task) => (
          <div key={task.id} className="bg-white rounded-lg shadow-lg p-4">
            <FaTimes className="absolute top-2 right-2 text-red-500 cursor-pointer" />
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gray-200 py-1 px-2 rounded-md">
                <span className="text-lg font-semibold">{task.name}</span>
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold">
                {task.type === "wishlist" ? "WISHLIST" : "HOSTELS"}
              </h2>
              <ul className="divide-y divide-gray-200">
                {task.items.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between py-2"
                  >
                    <span>{item}</span>
                    {task.type === "wishlist" ? (
                      <FaTimes
                        className="text-red-500 cursor-pointer"
                        onClick={() => handleRemoveItem(task.id, index)}
                      />
                    ) : (
                      <div className="flex space-x-2">
                        <FaCheck
                          className="text-green-500 cursor-pointer"
                          onClick={() => handleVerifyItem(task.id, index)}
                        />
                        <FaTimes
                          className="text-yellow-500 cursor-pointer"
                          onClick={() => handleUnverifyItem(task.id, index)}
                        />
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4 flex justify-between">
              {task.type === "wishlist" ? (
                <>
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200 ease-in-out"
                    onClick={() => handleApproveTask(task.id)}
                  >
                    Approve
                  </button>
                  <button
                    className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-200 ease-in-out"
                    onClick={() => handleUnapproveTask(task.id)}
                  >
                    Unapprove
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200 ease-in-out"
                    onClick={() => handleVerifyAll(task.id)}
                  >
                    Verify All
                  </button>
                  <button
                    className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-200 ease-in-out"
                    onClick={() => handleUnverifyAll(task.id)}
                  >
                    Unverify All
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Tasks() {
  return (
    <SnackbarProvider maxSnack={3}>
      <TaskList />
    </SnackbarProvider>
  );
}

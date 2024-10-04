// NewNoteModal.js
import React, { useState } from "react";
import { useNotification } from "../context/NotificationContext";

const colors = [
  "#B38BFA",
  "#FF79F2",
  "#43E6FC",
  "#F19576",
  "#0047FF",
  "#6691FF",
]; // Define available colors

const NewNoteModal = ({ isOpen, onClose, onSubmit }) => {
  const [groupName, setGroupName] = useState("");
  const [selectedColor, setSelectedColor] = useState(colors[0]); // Default color
  const showNotification = useNotification();
  // NewNoteModal.js (snippet)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!groupName) {
      showNotification("Please enter a group name.");
      return; // Prevent submission if group name is empty
    }
    if (!selectedColor) {
      showNotification("Please select a color.");
      return; // Prevent submission if no color is selected
    }
    if (groupName.trim() === "") return; // Prevent empty submission
    onSubmit({ groupName, selectedColor }); // Send both properties
    onClose(); // Close modal after submission
    setGroupName("");
    setSelectedColor(null);
  };

  if (!isOpen) return null; // Do not render if modal is not open

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div
        style={{ minWidth: "740px" }}
        className="flex flex-col gap-5  bg-white px-10 p-6 rounded-md shadow-lg"
      >
        <h2 className="text-lg font-semibold mb-4" style={{ fontSize: "29px" }}>
          Create New Group
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-10">
          <div className="flex gap-5 ">
            <h6 className="w-fit m-0 p-0" style={{ fontSize: "27.31px" }}>
              Group Name
            </h6>
            <input
              type="text"
              style={{ width: "435px" }}
              placeholder="Group Name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="border p-2 rounded-2xl "
            />
          </div>

          <div className="flex gap-5">
            <div>
              <h6 style={{ fontSize: "27.31px" }}>Choose color</h6>
            </div>
            <div className="flex gap-2 mb-4">
              {colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`w-10 h-10 rounded-full border-2 ${
                    selectedColor === color
                      ? "border-black"
                      : "border-transparent"
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 bg-gray-300 p-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewNoteModal;

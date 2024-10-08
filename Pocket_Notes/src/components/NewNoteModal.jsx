import React, { useState, useRef, useEffect } from "react";
import { useNotification } from "../context/NotificationContext";
import styles from "../styles/NewNoteModal.module.css";

const colors = [
  "#B38BFA",
  "#FF79F2",
  "#43E6FC",
  "#F19576",
  "#0047FF",
  "#6691FF",
];

// The component that will be rendered when the user clicks on the add button
const NewNoteModal = ({ isOpen, onClose, onSubmit }) => {
  const [groupName, setGroupName] = useState(""); // state to set group name
  const [selectedColor, setSelectedColor] = useState(null); // state to set selected color
  const showNotification = useNotification(); // to show notification to user
  const modalRef = useRef(null); // reference to close the modal when clicked outside the modal

  // Function to handle saving data to the state and local storage
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!groupName) {
      showNotification({ message: "Please enter a group name.", danger: true });
      return;
    }
    if (!selectedColor) {
      showNotification({ message: "Please select a color.", danger: true });
      return;
    }
    if (groupName.trim() === "") return;

    onSubmit({ groupName, selectedColor });
    onClose();
    setGroupName("");
    setSelectedColor(null);
  };

  // Function to handle click events outside the modal
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  // useEffect to attach eventListeners to modal if the modal isOpen is true
  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", (event) => {
        if (event.key == "Escape") {
          onClose();
        }
      });
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={styles.modalBackdrop}
      onClick={handleClickOutside}
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={modalRef}
        className={`${styles.modal} flex flex-col gap-3 bg-white px-10 p-6 rounded-md shadow-lg`}
        aria-labelledby="new-group-title"
      >
        <h2
          id="new-group-title"
          className={`${styles.newGroupLabel} text-lg font-semibold`}
        >
          Create New Group
        </h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 h-full justify-between"
          aria-label="New Group Form"
        >
          <div className="flex md:gap-5 items-center gap-2">
            <label
              htmlFor="group-name"
              className={`${styles.groupNameLabel} w-fit m-0 p-0`}
            >
              Group Name
            </label>
            <input
              type="text"
              id="group-name"
              placeholder="Group Name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className={styles.newGroupInput}
              required
              aria-required="true"
            />
          </div>

          <div className="flex md:gap-5 gap-2">
            <div>
              <h6 className={`${styles.colorLabel}`}>Choose color</h6>
            </div>
            <div
              className="flex gap-2 items-center"
              role="group"
              aria-label="Color selection"
            >
              {colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`${styles.colors} ${
                    selectedColor === color ? styles.selected : ""
                  }`}
                  style={{ backgroundColor: color }}
                  aria-pressed={selectedColor === color}
                  aria-label={`Select color ${color}`}
                />
              ))}
            </div>
          </div>
          <div className={styles.createButtonWrapper}>
            <button
              type="submit"
              className={styles.createButton}
              aria-label="Create new group"
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

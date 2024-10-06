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

const NewNoteModal = ({ isOpen, onClose, onSubmit }) => {
  const [groupName, setGroupName] = useState("");
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const showNotification = useNotification();
  const modalRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!groupName) {
      showNotification("Please enter a group name.");
      return;
    }
    if (!selectedColor) {
      showNotification("Please select a color.");
      return;
    }
    if (groupName.trim() === "") return;
    onSubmit({ groupName, selectedColor });
    onClose();
    setGroupName("");
    setSelectedColor(colors[0]);
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
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
    <div className={styles.modalBackdrop} onClick={handleClickOutside}>
      <div
        ref={modalRef}
        className={`${styles.modal} flex flex-col gap-3 bg-white px-10 p-6 rounded-md shadow-lg`}
      >
        <h2 className={`${styles.newGroupLabel} text-lg font-semibold`}>
          Create New Group
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex md:gap-5 items-center gap-2">
            <h6 className={`${styles.groupNameLabel} w-fit m-0 p-0`}>
              Group Name
            </h6>
            <input
              type="text"
              placeholder="Group Name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="w-8/12 border p-1 rounded-xl"
            />
          </div>

          <div className="flex md:gap-5 gap-2">
            <div>
              <h6 className={`${styles.colorLabel}`}>Choose color</h6>
            </div>
            <div className="flex gap-2 items-center">
              {colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`md:w-10 md:h-10 w-5 h-5 rounded-full border-2 ${
                    selectedColor === color
                      ? "border-black"
                      : "border-transparent"
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
          <div className={styles.createButtonWrapper}>
            <button type="submit" className={styles.createButton}>
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewNoteModal;

import React from "react";
import styles from "../styles/NotesFolder.module.css";

// This is the component that will be used to display the folder item in the NotesFolder sidebar.
const FolderItem = ({ folder, selected, onSelect }) => {
  // Function to get initials of the folder title and to capitalize the first letters of each words
  const getInitials = (title) => {
    const splitted = title.split(" ");
    return splitted.length > 1
      ? (splitted[0][0] + splitted[1][0]).toUpperCase()
      : splitted[0][0].toUpperCase();
  };

  return (
    <li
      className={`notesFolder flex gap-3 items-center p-3 rounded-md cursor-pointer ${
        selected ? "bg-slate-300" : "bg-white hover:bg-slate-300"
      }`}
      onClick={onSelect}
      aria-label={`Select folder: ${folder.title}`}
    >
      <div
        className={`${styles.notesFolderIcon} flex items-center justify-center rounded-full`}
        style={{ backgroundColor: folder.color }}
        aria-label={`Initials for ${folder.title}: ${getInitials(
          folder.title
        )}`}
      >
        {getInitials(folder.title)}
      </div>
      <span
        className={`${styles.notesFolderTitle} truncate`}
        aria-label={`Folder title: ${folder.title}`}
      >
        {folder.title}
      </span>
    </li>
  );
};

export default FolderItem;

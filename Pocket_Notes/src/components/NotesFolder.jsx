import React, { useState, useEffect } from "react";
import styles from "../styles/NotesFolder.module.css";
import { MdOutlineAddCircle } from "react-icons/md";
import NewNoteModal from "./NewNoteModal";
import { v4 as uuidv4 } from "uuid";

function NotesFolder({ setSelectedFolder }) {
  const [folders, setFolders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const savedFolders = JSON.parse(localStorage.getItem("folders")) || [];
    setFolders(savedFolders);
  }, []);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const getInitials = (title) => {
    const splitted = title.split(" ");
    return splitted.length > 1
      ? splitted[0][0] + splitted[1][0]
      : splitted[0][0];
  };

  const handleCreateGroup = (group) => {
    const newFolder = {
      id: uuidv4(),
      title: group.groupName,
      color: group.selectedColor,
      notes: [],
    };

    const updatedFolders = [...folders, newFolder];
    setFolders(updatedFolders);

    // Save the updated folders to localStorage
    localStorage.setItem("folders", JSON.stringify(updatedFolders));

    handleCloseModal();
    setSelectedFolder(newFolder);
  };

  return (
    <div className="flex flex-col h-full">
      <section
        style={{ minHeight: "98px" }}
        className="flex justify-center items-end"
      >
        <header className="sticky">
          <p className="text-center" style={{ fontSize: "35px" }}>
            Pocket Notes
          </p>
        </header>
      </section>

      <section
        className="mt-8 px-5"
        style={{ maxHeight: "calc(100vh - 120px)", overflow: "scroll" }}
      >
        <ul className="list-none pl-0">
          {folders.map((folder) => (
            <li
              key={folder.id}
              className="flex gap-2 rounded-md items-center mb-2 hover:bg-slate-300 ease-in duration-100 py-2"
              onClick={() => setSelectedFolder(folder)}
            >
              <div
                className="flex items-center justify-center rounded-full p-4"
                style={{
                  backgroundColor: folder.color,
                  color: "#fff",
                  fontSize: "24px",
                  minWidth: "68.9px",
                  minHeight: "68.9px",
                }}
              >
                {getInitials(folder.title)}
              </div>
              <span
                className="text-gray-700 hover:text-blue-500 text-ellipsis overflow-hidden whitespace-nowrap"
                style={{ fontSize: "24px", maxWidth: "calc(100% - 80px)" }}
              >
                {folder.title}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <button className={styles.addNewButtonWrapper} onClick={handleOpenModal}>
        <MdOutlineAddCircle className={styles.addNewButton} />
      </button>

      <NewNoteModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleCreateGroup}
        setSelectedFolder={setSelectedFolder}
      />
    </div>
  );
}

export default NotesFolder;

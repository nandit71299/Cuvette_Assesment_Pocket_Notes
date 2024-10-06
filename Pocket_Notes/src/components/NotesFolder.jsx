import React, { useState, useEffect } from "react";
import styles from "../styles/NotesFolder.module.css";
import { MdOutlineAddCircle } from "react-icons/md";
import NewNoteModal from "./NewNoteModal";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

function NotesFolder({ setSelectedFolder }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();
  const [folders, setFolders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFolderId, setSelectedFolderId] = useState(null);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const savedFolders = JSON.parse(localStorage.getItem("folders")) || [];
    console.log("Saved folders loaded from local storage:", savedFolders);

    setFolders(savedFolders);
  }, []);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const getInitials = (title) => {
    const splitted = title.split(" ");
    return splitted.length > 1
      ? (splitted[0][0] + splitted[1][0]).toUpperCase()
      : splitted[0][0].toUpperCase();
  };

  const handleCreateGroup = (group) => {
    const newFolder = {
      id: uuidv4(),
      title: group.groupName[0].toUpperCase() + group.groupName.slice(1),
      color: group.selectedColor,
      notes: [],
    };

    const savedFolders = JSON.parse(localStorage.getItem("folders")) || [];
    const updatedFolders = [...savedFolders, newFolder];

    console.log("Creating new folder:", newFolder);
    localStorage.setItem("folders", JSON.stringify(updatedFolders));
    setFolders(updatedFolders);
    handleCloseModal();
    setSelectedFolder(newFolder);
    setSelectedFolderId(newFolder.id);
  };
  const handleSelectFolder = (folder) => {
    console.log("Selected folder:", folder);
    setSelectedFolder(folder);
    setSelectedFolderId(folder.id);
  };

  return (
    <div
      className="flex flex-col h-full overflow-hidden"
      style={{ height: isMobile ? "100vh" : "" }}
    >
      <section
        className={`${
          isMobile ? "px-10" : `justify-center align-center`
        } flex py-3`}
      >
        <header>
          <p className={`${styles.appTitle} pt-5`}>Pocket Notes</p>
        </header>
      </section>

      <section
        className="notesFolderSection mt-5 px-3 overflow-auto"
        style={{ maxHeight: "calc(-120px + 100vh) " }}
      >
        <ul className="space-y-3 ">
          {folders.map((folder) => (
            <li
              key={folder.id}
              className={`notesFolder flex gap-3 items-center p-3 rounded-md cursor-pointer ${
                selectedFolderId === folder.id
                  ? "bg-slate-300"
                  : "bg-white hover:bg-slate-300"
              }`}
              onClick={() =>
                isMobile
                  ? navigate(`/note?id=${folder.id}`)
                  : handleSelectFolder(folder)
              }
            >
              <div
                className={`${styles.notesFolderIcon} flex items-center justify-center rounded-full`}
                style={{
                  backgroundColor: folder.color,
                }}
              >
                {getInitials(folder.title)}
              </div>
              <span className={`${styles.notesFolderTitle} truncate`}>
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

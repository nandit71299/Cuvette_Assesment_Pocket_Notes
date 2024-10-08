import React, { useState, useEffect, useRef } from "react";
import styles from "../styles/NotesFolder.module.css";
import { MdOutlineAddCircle } from "react-icons/md";
import NewNoteModal from "./NewNoteModal";
import FolderItem from "./FolderItem";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { getSavedFolders, saveFolders } from "../utils/utils";

function NotesFolder({ setSelectedFolder }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // state to check if its mobile device
  const navigate = useNavigate(); // for navigation
  const [folders, setFolders] = useState([]); // state for note folders
  const [isModalOpen, setIsModalOpen] = useState(false); // state to set modal open/close
  const [selectedFolderId, setSelectedFolderId] = useState(null); // state maintaining the current selected note folder
  const scrollToLastNoteFolder = useRef(null); // ref for scroll
  const [newFolderCreated, setNewFolderCreated] = useState(false); // state for new folder creation. if yes, scroll to last created note folder.

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // useEffect for getting folders stored in local storage
  useEffect(() => {
    const savedFolders = getSavedFolders();
    setFolders(savedFolders);
  }, []);

  // functions to manage open/close the modal
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // function to create a new note folder
  const handleCreateGroup = (group) => {
    const newFolder = {
      id: uuidv4(),
      title: group.groupName[0].toUpperCase() + group.groupName.slice(1),
      color: group.selectedColor,
      notes: [],
    };

    const updatedFolders = [...folders, newFolder];
    saveFolders(updatedFolders);
    setFolders(updatedFolders);
    handleCloseModal();
    setSelectedFolder(newFolder);
    setSelectedFolderId(newFolder.id);
    setNewFolderCreated(true);
  };

  // function to select a folder
  const handleSelectFolder = (folder) => {
    setSelectedFolder(folder);
    setSelectedFolderId(folder.id);
  };

  // useEffect to scroll to last note when new folder is created
  useEffect(() => {
    if (newFolderCreated && scrollToLastNoteFolder.current) {
      scrollToLastNoteFolder.current.scrollTo({
        top: scrollToLastNoteFolder.current.scrollHeight,
        behavior: "smooth", // Smooth scrolling
      });
      setNewFolderCreated(false);
    }
  }, [newFolderCreated, folders]);

  return (
    <div
      className="flex flex-col h-full overflow-hidden"
      style={{ height: isMobile ? "100vh" : "" }}
      aria-labelledby="notes-folder"
    >
      <section
        className={`${
          isMobile ? "px-10" : "justify-center align-center"
        } flex py-7`}
      >
        <header>
          <h1 id="notes-folder" className={`${styles.appTitle} pt-5`}>
            Pocket Notes
          </h1>
        </header>
      </section>

      <section
        ref={scrollToLastNoteFolder}
        className="notesFolderSection mt-3 px-5 overflow-auto"
        style={{ maxHeight: "calc(-120px + 100vh)" }}
      >
        <ul className="space-y-3" role="list">
          {folders.map((folder) => (
            <FolderItem
              key={folder.id}
              folder={folder}
              selected={selectedFolderId === folder.id}
              onSelect={() => {
                isMobile
                  ? navigate(`/note?id=${folder.id}`)
                  : handleSelectFolder(folder);
              }}
            />
          ))}
        </ul>
      </section>

      <button
        className={styles.addNewButtonWrapper}
        onClick={handleOpenModal}
        aria-label="Add new note group"
      >
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

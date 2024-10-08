import React, { useState, useEffect, useRef } from "react";
import styles from "../styles/NotesDetails.module.css";
import { IoMdSend, IoMdArrowBack } from "react-icons/io";
import notesImage from "../assets/notes.png";
import lockImage from "../assets/lock.png";
import { useNavigate, useLocation } from "react-router-dom";

import {
  getSavedFolders,
  saveFolders,
  formatDate,
  formatTime,
} from "../utils/utils";
import NotesList from "./NotesList";

function NotesDetails({ folder }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // state to check if its mobile device
  const [notes, setNotes] = useState([]); // state to set notes
  const [newNote, setNewNote] = useState(""); // state managing new note's text
  const [folderTitle, setFolderTitle] = useState(""); // state managing folder title
  const [folderColor, setFolderColor] = useState(""); // state to manage the folder color chosen by the user

  // for navigation
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  //ref to scroll to the last note creatd.
  const notesContainerRef = useRef(null);

  // function to extract intials of the title, capitalize them and to join with rest of the characters.
  const getInitials = () => {
    if (!folderTitle) return "";
    const splitted = folderTitle.split(" ");
    return splitted.map((word) => word[0].toUpperCase()).join("");
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  const handleEnterPress = (event) => {
    if (event.key === "Enter") {
      if (event.shiftKey) {
        // Move to the next line
        return; // Do nothing, allow new line
      } else {
        // Submit the note
        handleAddNote();
        event.preventDefault(); // Prevent default form submission
      }
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // useEffect to check if folder or id exists. if yes, assign it to state vars. otherwise navigate user back to home.
  useEffect(() => {
    if (folder) {
      setNotes(folder.notes);
      setFolderTitle(folder.title);
      setFolderColor(folder.color);
    } else if (id) {
      const savedFolders = getSavedFolders();
      const currentFolder = savedFolders.find((f) => f.id === id);
      if (currentFolder) {
        setNotes(currentFolder.notes);
        setFolderTitle(currentFolder.title);
        setFolderColor(currentFolder.color);
      } else {
        navigate("/");
      }
    }
  }, [folder, id, navigate]);

  // function to add new notes to folder
  const handleAddNote = () => {
    if (newNote.trim() === "") return;

    const newNoteObject = {
      content: newNote,
      date: formatDate(new Date()),
      time: formatTime(new Date()),
    };

    const updatedNotes = [...notes, newNoteObject];
    setNotes(updatedNotes);

    const savedFolders = getSavedFolders();
    const updatedFolders = savedFolders.map((f) =>
      f.id === (folder ? folder.id : id) ? { ...f, notes: updatedNotes } : f
    );

    saveFolders(updatedFolders);
    setNewNote("");
  };

  useEffect(() => {
    if (notesContainerRef.current) {
      notesContainerRef.current.scrollTo({
        top: notesContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [notes]);

  if (!folder && !id) {
    return (
      <div
        className={`${styles.noteDetailsSection} flex flex-col justify-center items-center h-screen 5`}
      >
        <div className="flex flex-col items-center justify-center gap-5 flex-grow">
          <div className="flex justify-center items-center">
            <img
              src={notesImage}
              alt="Illustration of notes"
              className="w-80"
            />
          </div>
          <h2 className={`${styles.pocketNotesTitle}`}>Pocket Notes</h2>
          <p className={`${styles.pocketNotesMessage} w-9/12`}>
            Send and receive messages without keeping your phone online. Use
            Pocket Notes on up to 4 linked devices and 1 mobile phone.
          </p>
        </div>
        <div className="flex items-center gap-2 mt-5">
          <img
            src={lockImage}
            alt="Lock icon indicating encryption"
            className="w-5"
          />
          <p className={`${styles.encryptionMessage}`}>end-to-end encrypted</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.noteDetailsSection} flex flex-col h-screen`}>
      <header
        className={`${styles.noteDetailsHeader} p-4 bg-blue-600 text-white flex gap-2 items-center`}
      >
        {isMobile && (
          <button onClick={() => navigate("/")} aria-label="Go back">
            <IoMdArrowBack className="text-white text-2xl" />
          </button>
        )}
        <div className="flex items-center gap-4">
          <div
            className={`${styles.noteDetailsIcon} flex items-center justify-center`}
            style={{
              backgroundColor: folderColor || "#007bff",
            }}
            aria-label={`Initials: ${getInitials()}`}
          >
            {getInitials() || "N"}
          </div>
          <h1
            className={styles.folderTitle}
            aria-label={`Folder title: ${folderTitle || "Notes"}`}
          >
            {folderTitle || "Notes"}
          </h1>
        </div>
      </header>

      <div
        ref={notesContainerRef}
        className="flex-grow overflow-y-auto p-4"
        style={{
          height: isMobile ? "calc(100vh - 200px)" : "calc(100vh - 300px)",
          maxHeight: "calc(100vh - 150px)",
        }}
        aria-labelledby="notes-list"
      >
        <NotesList notes={notes} />
      </div>

      <footer className={`${styles.noteCreationSection} p-4`}>
        <div className="relative">
          <textarea
            className={`${styles.noteTextArea} w-full p-2 border rounded-md`}
            rows={4}
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Enter your text here..........."
            aria-label="New note input"
            required
            onKeyDown={handleEnterPress}
          />
          <button
            className={`${
              isMobile ? "bottom-10" : "bottom-5"
            } absolute z-10 right-5 ${newNote.length < 1 ? "disabled" : ""}`}
            onClick={handleAddNote}
            disabled={newNote.length < 1}
            aria-label="Send note"
          >
            <IoMdSend
              className={`${
                newNote.length < 1
                  ? styles.sendButtonDisabled
                  : styles.sendButtonActive
              } text-2xl`}
            />
          </button>
        </div>
      </footer>
    </div>
  );
}

export default NotesDetails;

import React, { useState, useEffect, useRef } from "react";
import styles from "../styles/NotesDetails.module.css";
import { IoMdSend, IoMdArrowBack } from "react-icons/io";
import notesImage from "../assets/notes.png";
import lockImage from "../assets/lock.png";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import moment from "moment";

function NotesDetails({ folder }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [folderTitle, setFolderTitle] = useState("");
  const [folderColor, setFolderColor] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  const notesContainerRef = useRef(null);

  const getInitials = () => {
    if (!folderTitle) return "";

    const splitted = folderTitle.split(" ");

    const initials = splitted.map((word) => word[0].toUpperCase()).join("");

    return initials;
  };

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
    if (folder) {
      setNotes(folder.notes);
      setFolderTitle(folder.title);
      setFolderColor(folder.color);
      console.log("Folder selected:", folder);
    } else if (id) {
      const savedFolders = JSON.parse(localStorage.getItem("folders")) || [];
      const currentFolder = savedFolders.find((f) => f.id === id);
      if (currentFolder) {
        setNotes(currentFolder.notes);
        setFolderTitle(currentFolder.title);
        setFolderColor(currentFolder.color);
        console.log("Current folder found in local storage:", currentFolder);
      } else {
        console.error("Folder not found");
        navigate("/");
      }
    }
  }, [folder, id, navigate]);

  const handleAddNote = () => {
    if (newNote.trim() === "") return;

    const newNoteObject = {
      content: newNote,
      date: moment().format("DD MMM yyyy"),
      time: moment().format("hh:mm A"),
    };

    const updatedNotes = [...notes, newNoteObject];
    setNotes(updatedNotes);

    const savedFolders = JSON.parse(localStorage.getItem("folders")) || [];

    const updatedFolders = savedFolders.map((f) =>
      f.id === (folder ? folder.id : id) ? { ...f, notes: updatedNotes } : f
    );

    localStorage.setItem("folders", JSON.stringify(updatedFolders));
    console.log("Updated folders saved to local storage:", updatedFolders);
    setNewNote("");
  };

  useEffect(() => {
    if (notesContainerRef.current) {
      notesContainerRef.current.scrollTop =
        notesContainerRef.current.scrollHeight;
    }
  }, [notes]);

  if (!folder && !id) {
    return (
      <div
        className={`${styles.noteDetailsSection} flex flex-col justify-center items-center h-full p-5`}
      >
        <div className="flex flex-col items-center justify-center gap-5 flex-grow content-center items-center">
          <div className="flex justify-center items-center ">
            <img src={notesImage} alt="" className="w-80" />
          </div>
          <h2 className={`${styles.pocketNotesTitle}`}>Pocket Notes</h2>
          <p className={`${styles.pocketNotesMessage}`}>
            Send and receive messages without keeping your phone online. Use
            Pocket Notes on up to 4 linked devices and 1 mobile phone.
          </p>
        </div>
        <div className="flex items-center gap-2 mt-5">
          <img src={lockImage} alt="lock" className="w-5" />
          <p className={`${styles.encryptionMessage}`}>end-to-end encrypted</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.noteDetailsSection} flex flex-col h-full`}>
      <header
        className={`${styles.noteDetailsHeader} p-4 bg-blue-600 text-white flex items-center`}
      >
        {isMobile ? (
          <button onClick={() => navigate("/")} className="mr-4">
            <IoMdArrowBack className="text-white text-2xl" />
          </button>
        ) : null}
        <div className="flex items-center gap-4">
          <div
            className={`${styles.noteDetailsIcon} flex items-center justify-center`}
            style={{
              backgroundColor: folderColor || "#007bff",
            }}
          >
            {getInitials() || "N"}
          </div>
          <h1 className={styles.folderTitle}>{folderTitle || "Notes"}</h1>
        </div>
      </header>

      <div
        ref={notesContainerRef}
        className="flex-grow overflow-y-auto p-4"
        style={{
          height: isMobile ? "calc(100vh - 200px" : "calc(100vh - 300px)",
          maxHeight: "calc(100vh - 150px)",
        }}
      >
        {notes.length === 0 ? (
          <p className="text-gray-500 text-center">
            No notes available. Add a new note below.
          </p>
        ) : (
          notes.map((note, index) => (
            <div key={index} className="bg-white p-4 rounded-md shadow-md mb-4">
              <p className={styles.noteContent}>{note.content}</p>
              <div className={`${styles.noteTimestamp}`}>
                {note.date} • {note.time}
              </div>
            </div>
          ))
        )}
      </div>

      <footer className={`${styles.noteCreationSection} p-4`}>
        <div className="relative">
          <textarea
            className={`${styles.noteTextArea} w-full p-2 border rounded-md`}
            rows={4}
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Enter your text here..........."
          />
          <button
            className={`absolute bottom-5 z-10 right-5 ${
              newNote.length < 1 ? "disabled" : ""
            }`}
            onClick={() => {
              if (newNote.length > 0) {
                handleAddNote();
              }
            }}
            disabled={newNote.length < 1}
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

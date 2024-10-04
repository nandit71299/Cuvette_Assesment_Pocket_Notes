import React, { useState, useEffect } from "react";
import styles from "../styles/NotesDetails.module.css";
import { IoMdSend } from "react-icons/io";
import notesImage from "../assets/notes.png";
import lockImage from "../assets/lock.png";

function NotesDetails({ folder }) {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  useEffect(() => {
    if (folder) {
      const savedFolders = JSON.parse(localStorage.getItem("folders")) || [];
      const currentFolder = savedFolders.find((f) => f.id === folder.id);
      if (currentFolder) {
        setNotes(currentFolder.notes);
      }
    }
  }, [folder]);

  const handleAddNote = () => {
    if (newNote.trim() === "") return;

    const newNoteObject = {
      content: newNote,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    };
    debugger;
    // Update local state
    const updatedNotes = [...notes, newNoteObject];
    setNotes(updatedNotes);

    // Update the folder in localStorage
    const savedFolders = JSON.parse(localStorage.getItem("folders")) || [];
    const updatedFolders = savedFolders.map((f) =>
      f.id === folder.id ? { ...f, notes: updatedNotes } : f
    );

    // Save updated folders back to localStorage
    localStorage.setItem("folders", JSON.stringify(updatedFolders));

    // Clear the input field
    setNewNote("");
  };

  if (!folder) {
    return (
      <div
        style={{ minHeight: "100vh", backgroundColor: "#DAE5F5" }}
        className="flex-grow flex flex-col justify-center items-center h-100"
      >
        <div className="flex-grow flex flex-col justify-center items-center">
          <img
            src={notesImage}
            alt=""
            style={{ width: "626px", height: "313px" }}
          />
          <h2 style={{ fontSize: "50px", fontWeight: "700" }}>Pocket Notes</h2>
          <p style={{ fontSize: "22px", width: "650px", textAlign: "center" }}>
            Send and receive messages without keeping your phone online. Use
            Pocket Notes on up to 4 linked devices and 1 mobile phone.
          </p>
        </div>
        <div className="flex gap-2 py-5">
          <img
            src={lockImage}
            alt=""
            style={{ width: "17px", height: "21px" }}
          />
          <p className="text-gray-400">end-to-end encrypted</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <section
        style={{ backgroundColor: "blue", minHeight: "98px" }}
        className="flex justify-start items-center"
      >
        <header className="sticky flex w-full p-2">
          <ul className="list-none pl-0">
            <li className="flex gap-5 items-center">
              <div
                className="flex items-center justify-center bg-blue-500 text-white rounded-full p-4"
                style={{
                  fontSize: "24px",
                  minWidth: "68.9px",
                  minHeight: "68.9px",
                }}
              >
                {folder.title[0]}
              </div>
              <h1
                className="text-white text-gray-700"
                style={{ fontSize: "24px", width: "100%" }}
              >
                {folder.title}
              </h1>
            </li>
          </ul>
        </header>
      </section>

      <section
        className={`${styles.noteDetailsSection} flex-grow flex px-5`}
        style={{ height: "calc(70vh - 120px)", overflowY: "auto" }}
      >
        {notes.length === 0 ? (
          <div className="flex-grow flex flex-col justify-center items-center">
            <p className="text-gray-500">
              No notes available. Add a new note below.
            </p>
          </div>
        ) : (
          <div
            className={`h-fit py-2 px-2 flex gap-4 flex-col w-full bg-transparent`}
          >
            {notes.map((note, index) => (
              <div key={index} className={`bg-white p-4 rounded-md shadow-md`}>
                <p className="w-auto" style={{ fontSize: "18px" }}>
                  {note.content}
                </p>
                <div
                  className="text-right w-full flex gap-2 justify-end"
                  style={{ fontSize: "18px" }}
                >
                  <p className="w-auto">{note.date}</p>
                  <p className="w-auto">•</p>
                  <p className="w-auto">{note.time}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section
        style={{ height: "255px" }}
        className={`${styles.noteCreationSection} px-5 py-2 text-white flex justify-self-end items-center rounded-md`}
      >
        <div className="relative w-full rounded-md">
          <textarea
            className="w-full text-black px-2 py-2 rounded-md"
            style={{ fontSize: "29.82px" }}
            rows={4}
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Enter your note here"
          />
          <button
            className="absolute right-10 bottom-8"
            onClick={handleAddNote}
          >
            <IoMdSend className="text-black text-2xl" />
          </button>
        </div>
      </section>
    </div>
  );
}

export default NotesDetails;

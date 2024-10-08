import React from "react";
import styles from "../styles/NotesDetails.module.css";

// This component is responsible for rendering notes passed from parent component
const NotesList = ({ notes }) => {
  return (
    <div>
      {notes.length === 0 ? (
        <p className="text-gray-500 text-center" role="alert">
          No notes available. Add a new note below.
        </p>
      ) : (
        notes.map((note, index) => (
          <div key={index} className=" bg-white p-4 rounded-md shadow-md mb-4">
            <p className={`${styles.noteContent} break-words `}>
              {note.content}
            </p>
            <div className={`${styles.noteTimestamp}`}>
              {note.date} • {note.time}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default NotesList;

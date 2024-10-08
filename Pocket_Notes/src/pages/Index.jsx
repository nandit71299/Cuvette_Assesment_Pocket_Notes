import React, { useEffect, useState } from "react";
import NotesFolder from "../components/NotesFolder";
import NotesDetails from "../components/NotesDetails";
import "../index.css";

function Index() {
  // State to check if the device is mobile sized?
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const handleResize = () => {
    // Set isMobile to true if device width is less than 768px
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    // Add event listener for window resize event
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // State to manage folder selection
  const [selectedFolder, setSelectedFolder] = useState(null);

  return (
    <div className="mx-auto" role="main">
      <main>
        <div
          className="flex flex-col md:flex-row h-screen"
          role="complementary"
        >
          {/* Notes folders section */}
          <section
            className="notesFolderSection md:border-r border-gray-300"
            aria-labelledby="notes-folder-heading"
          >
            <h2 id="notes-folder-heading" className="sr-only">
              Notes Folders
            </h2>
            <NotesFolder setSelectedFolder={setSelectedFolder} />{" "}
            {/* Pass the setSelectedFolder function to change the state of selectedFolder to NotesFolder.
            Based on the selected folder the notes will be displayed. */}
          </section>
          {/* Notes details section */}
          <section
            className={`${
              isMobile ? "hidden" : ""
            } notesDetailsSection flex-grow w-full`}
            aria-labelledby="notes-details-heading"
          >
            {/* Below H2 to display Heading only for screen readers*/}
            <h2 id="notes-details-heading" className="sr-only">
              Notes Details
            </h2>
            <div style={{ width: "calc(-430px + 100vw)" }}>
              <NotesDetails folder={selectedFolder} />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Index;

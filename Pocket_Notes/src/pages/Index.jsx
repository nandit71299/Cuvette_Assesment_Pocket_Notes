import React, { useEffect, useState } from "react";
import NotesFolder from "../components/NotesFolder";
import NotesDetails from "../components/NotesDetails";
import "../index.css";

function Index() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [selectedFolder, setSelectedFolder] = useState(null);

  return (
    <div className=" mx-auto">
      <main>
        <div className="flex flex-col md:flex-row h-screen">
          {/* Notes folders section */}
          <section className="notesFolderSection md:border-r border-gray-300">
            <NotesFolder setSelectedFolder={setSelectedFolder} />
          </section>
          {/* Notes details section */}
          <section
            className={`${
              isMobile ? "hidden" : ""
            } notesDetailsSection flex-grow w-full`}
          >
            <NotesDetails folder={selectedFolder} />
          </section>
        </div>
      </main>
    </div>
  );
}

export default Index;

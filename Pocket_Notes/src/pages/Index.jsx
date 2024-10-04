import React, { useState } from "react";
import NotesFolder from "../components/NotesFolder";
import NotesDetails from "../components/NotesDetails";
import "../index.css";

function Index() {
  const [selectedFolder, setSelectedFolder] = useState(null);

  return (
    <div>
      <main>
        <div className="flex">
          {/* Notes folders section */}
          <section className="notesFolderSection">
            <NotesFolder setSelectedFolder={setSelectedFolder} />
          </section>
          {/* Notes details section */}
          <section className="w-full notesDetailsSection">
            <NotesDetails folder={selectedFolder} />
          </section>
        </div>
      </main>
    </div>
  );
}

export default Index;

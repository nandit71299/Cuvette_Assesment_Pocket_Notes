import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import { NotificationProvider } from "./context/NotificationContext";
import NotesDetails from "./components/NotesDetails";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <NotificationProvider>
        <Routes>
          {/* Main Index Page i.e HomePage */}
          <Route path="/" element={<Index />} /> {/*  Notes Details Page*/}
          <Route path="/note" element={<NotesDetails />} />{" "}
        </Routes>
      </NotificationProvider>
    </BrowserRouter>
  </StrictMode>
);

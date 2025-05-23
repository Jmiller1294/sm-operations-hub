"use client";
import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import "./styles/globals.css";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleContainer = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="body-container">
      <div className={`sidebar-container ${isExpanded ? "" : "closed"}`}>
        <Sidebar isExpanded={isExpanded} />
      </div>
      <main className={`main-container ${isExpanded ? "" : "closed"}`}>
        <Header onToggle={toggleContainer} />
        {children}
      </main>
    </div>
  );
}

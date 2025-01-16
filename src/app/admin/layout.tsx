import React from "react";
import Navbar from "@/components/Navbar"; // Adjust the import path based on your project structure

interface AdminLayoutProps {
  children: React.ReactNode; // Children will be the page content
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      <main className="p-4">{children}</main>
    </div>
  );
};

export default AdminLayout;
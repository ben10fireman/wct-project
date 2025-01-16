"use client";
import React from "react";
import Navbar from "@/components/Navbar"; // Adjust the import path
import Sidebar from "@/components/sidebar";

interface AdminLayoutProps {
  children: React.ReactNode; // Children will be the page content
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="flex flex-1 pt-16"> {/* Add padding-top to account for the Navbar height */}
        {/* Sidebar */}
        <div className="fixed top-16 left-0 h-full z-40"> {/* Adjust top position to be below the Navbar */}
          <Sidebar />
        </div>

        {/* Page Content */}
        <div className="flex-1 flex flex-col pl-64"> {/* Add padding-left to account for the Sidebar width */}
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State to toggle mobile menu
  const router = useRouter();

  const handleHomeClick = () => {
    router.push("/");
  };

  return (
    <nav className="bg-white shadow-md w-full z-50 fixed top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left Side: Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-xl font-bold text-gray-800">Buyme</span>
            </div>
          </div>

          {/* Right Side: Links and Hamburger */}
          <div className="hidden md:flex items-center space-x-4">

            <button
              onClick={handleHomeClick}
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Home
            </button>
          </div>

          {/* Hamburger Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-800 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          
            <button
              onClick={handleHomeClick}
              className="block w-full text-center bg-black text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Home
            </button>
          </div>
      )}
    </nav>
  );
};

export default Navbar;
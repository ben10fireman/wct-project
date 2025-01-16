"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  const handleHomeClick = () => {
    router.push("/");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left Side: Logo and Links */}
          <div className="flex items-center">
            {/* Logo */}
            <div className="flex-shrink-0">
              <span className="text-xl font-bold text-gray-800">Buyme</span>
            </div>

          </div>

          {/* Right Side: Home Button */}
          <div className="flex items-center">
            <button
              onClick={handleHomeClick}
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Home
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Hamburger Menu) */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            href="/features"
            className="block text-gray-800 hover:text-blue-500 transition duration-300"
          >
            Features
          </Link>
          <Link
            href="/use-cases"
            className="block text-gray-800 hover:text-blue-500 transition duration-300"
          >
            Use Cases
          </Link>
          <Link
            href="/prices"
            className="block text-gray-800 hover:text-blue-500 transition duration-300"
          >
            Prices
          </Link>
          <Link
            href="/customers"
            className="block text-gray-800 hover:text-blue-500 transition duration-300"
          >
            Customers
          </Link>
          <Link
            href="/about-us"
            className="block text-gray-800 hover:text-blue-500 transition duration-300"
          >
            About Us
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
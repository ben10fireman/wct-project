import React from "react";
import Image from "next/image";

// Import your images (replace with actual paths)
import searchIcon from "@/app/image/dashboard/search.png";
import notifications from "@/app/image/dashboard/notifications.png";
import userIcon from "@/app/image/dashboard/user.png";

const Navbar = () => {
  return (
    <>
      {/* Header */}
      <div className="bg-white shadow-md flex justify-between items-center px-4 py-3">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search.."
            className="border rounded-md px-3 py-1 w-full sm:w-64"
          />
          <button className="p-2 bg-gray-200 rounded-md">
            <Image
              src={searchIcon}
              alt="Search"
              width={20}
              height={20}
              className="object-contain" // Ensure the image fits properly
            />
          </button>
        </div>
        <div className="flex items-center space-x-4">
          <a
            href="#"
            className="btn bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Add New
          </a>
          <Image
            src={notifications}
            alt="Notifications"
            width={24}
            height={24}
            className="object-contain" // Ensure the image fits properly
          />
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <Image
              src={userIcon}
              alt="User"
              width={32}
              height={32}
              className="object-cover" // Ensure the image covers the container
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
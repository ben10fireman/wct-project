import React, { useState } from "react";
import Link from "next/link"; // Import Link from next/link

// Importing image assets
import dashboardIcon from "@/app/image/dashboard/dashboard (2).png";
import customerIcon from "@/app/image/dashboard/customer.png";
import employeeIcon from "@/app/image/dashboard/employee.png";
import productIcon from "@/app/image/dashboard/product.png";
import paymentIcon from "@/app/image/dashboard/payment.png";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to toggle sidebar

  const menuItems = [
    { name: "Dashboard", icon: dashboardIcon, link: "/admin/dashboard" },
    { name: "Customer", icon: customerIcon, link: "/admin/customer" },
    { name: "Product", icon: employeeIcon, link: "/admin/product" },
    { name: "Categories", icon: productIcon, link: "/admin/categories" },
    { name: "Income", icon: paymentIcon, link: "/admin/income" },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="h-full">
      {/* Hamburger Button */}
      <button
        className="lg:hidden p-4 text-white bg-black fixed top-4 left-4 z-50"
        onClick={toggleSidebar}
      >
        ☰
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-900 shadow-md transition-transform duration-300 z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:w-64 w-64 mt-16 lg:mt-0`} // Added mt-16 for mobile, lg:mt-0 for larger screens
      >
        <ul className="space-y-4 p-4">
          {menuItems.map((item, index) => (
            <Link href={item.link} key={index}>
              <li
                className="flex items-center gap-4 cursor-pointer hover:bg-gray-700 p-2 rounded-md"
                onClick={() => setIsOpen(false)} // Close sidebar on item click
              >
                <img
                  src={item.icon.src}
                  alt={item.name}
                  className="w-6 h-6"
                />
                <span className="text-gray-300 hover:text-white">
                  {item.name}
                </span>
              </li>
            </Link>
          ))}
        </ul>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default Sidebar;
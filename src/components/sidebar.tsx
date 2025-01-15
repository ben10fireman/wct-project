import React from "react";
import Link from "next/link"; // Import Link from next/link

// Importing image assets
import dashboardIcon from "@/app/image/dashboard/dashboard (2).png";
import customerIcon from "@/app/image/dashboard/customer.png";
import employeeIcon from "@/app/image/dashboard/employee.png";
import productIcon from "@/app/image/dashboard/product.png";
import paymentIcon from "@/app/image/dashboard/payment.png";

const Sidebar = () => {
  const menuItems = [
    { name: "Dashboard", icon: dashboardIcon, link: "/admin/dashboard" },
    { name: "Customer", icon: customerIcon, link: "/admin/customer" },
    { name: "Product", icon: employeeIcon, link: "/admin/product" },
    { name: "Categories", icon: productIcon, link: "/admin/categories" },
    { name: "Income", icon: paymentIcon, link: "/admin/income" },
  ];

  return (
    <div className="lg:w-1/4 w-full bg-black shadow-md lg:h-full flex-shrink-0">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold text-white">BuyMe</h1>
      </div>
      <ul className="space-y-4 p-4 text-gray-600">
        {menuItems.map((item, index) => (
          <Link href={item.link} key={index}>
            <li className="flex items-center gap-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
              <img src={item.icon.src} alt={item.name} className="w-6 h-6" />
              <span className="text-white hover:text-black">{item.name}</span>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
import React from "react";

// Importing image assets
import dashboardIcon from "@/app/image/dashboard/dashboard (2).png";
import customerIcon from "@/app/image/dashboard/customer.png";
import employeeIcon from "@/app/image/dashboard/employee.png";
import productIcon from "@/app/image/dashboard/product.png";
import paymentIcon from "@/app/image/dashboard/payment.png";
import helpIcon from "@/app/image/dashboard/help-web-button.png";
import settingsIcon from "@/app/image/dashboard/settings.png";

const Sidebar = () => {
  const menuItems = [
    { name: "Dashboard", icon: dashboardIcon, link: "/admin/dashboard" },
    { name: "Customer", icon: customerIcon, link: "/admin/customer" },
    { name: "product", icon: employeeIcon, link: "/admin/product" },
    { name: "Categories", icon: productIcon, link: "/admin/categories" },
    { name: "Income", icon: paymentIcon, link: "/admin/income" },
    { name: "Help", icon: helpIcon, link: "/admin/help" },
    { name: "Settings", icon: settingsIcon, link: "/admin/settings" },
  ];

  return (
    <div className="lg:w-1/4 w-full bg-white shadow-md lg:h-full flex-shrink-0">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold text-gray-700">Brand</h1>
      </div>
      <ul className="space-y-4 p-4 text-gray-600">
        {menuItems.map((item, index) => (
          <li key={index} className="flex items-center gap-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
            <img src={item.icon.src} alt={item.name} className="w-6 h-6" />
            <a href={item.link} className="text-gray-600 hover:text-gray-800">
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

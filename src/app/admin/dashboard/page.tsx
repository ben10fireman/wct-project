"use client";

import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/app/services/firebase";

// Importing image assets
import customerIcon from "@/app/image/dashboard/customer.png";
import employeeIcon from "@/app/image/dashboard/employee.png";
import productIcon from "@/app/image/dashboard/product.png";
import paymentIcon from "@/app/image/dashboard/payment.png";
import notifications from "@/app/image/dashboard/notifications.png";
import userIcon from "@/app/image/dashboard/user.png";
import Sidebar from "@/components/sidebar";

interface User {
  name: string;
  email: string;
  role: string;
  uid: string;
}

const Page = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Fetch total users in real-time
    const unsubscribeUsers = onSnapshot(collection(db, "users"), (snapshot) => {
      setTotalUsers(snapshot.size); // Updates the total users count in real-time
      const usersData: User[] = snapshot.docs.map((doc) => doc.data() as User);
      setUsers(usersData);
    });

    // Fetch total products in real-time
    const unsubscribeProducts = onSnapshot(
      collection(db, "products"),
      (snapshot) => {
        setTotalProducts(snapshot.size); // Updates the total products count in real-time
      }
    );

    // Cleanup listeners on component unmount
    return () => {
      unsubscribeUsers();
      unsubscribeProducts();
    };
  }, []);

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Container */}
      <div className="flex-1 flex flex-col overflow-auto">
        {/* Header */}
        <div className="bg-white shadow-md flex justify-end items-center px-4 py-3">
          <div className="flex items-center space-x-4">
            <img
              src={notifications.src}
              alt="Notifications"
              className="w-6 h-6"
            />
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img src={userIcon.src} alt="User" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-6">
          {/* Cards Section */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white p-4 shadow rounded-lg flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold">{totalUsers}</h1>
                <h3 className="text-sm text-gray-500">Customers</h3>
              </div>
              <img
                src={customerIcon.src}
                alt="Customer"
                className="w-10 h-10"
              />
            </div>
            <div className="bg-white p-4 shadow rounded-lg flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold">53</h1>
                <h3 className="text-sm text-gray-500">Employees</h3>
              </div>
              <img
                src={employeeIcon.src}
                alt="Employee"
                className="w-10 h-10"
              />
            </div>
            <div className="bg-white p-4 shadow rounded-lg flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold">{totalProducts}</h1>
                <h3 className="text-sm text-gray-500">Products</h3>
              </div>
              <img src={productIcon.src} alt="Product" className="w-10 h-10" />
            </div>
            <div className="bg-white p-4 shadow rounded-lg flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold">350000</h1>
                <h3 className="text-sm text-gray-500">Income</h3>
              </div>
              <img src={paymentIcon.src} alt="Income" className="w-10 h-10" />
            </div>
          </div>

          {/* Recent Payments */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="flex justify-between items-center p-4">
                <h2 className="text-lg font-bold">Recent Payments</h2>
                <a href="#" className="btn text-blue-500">
                  View All
                </a>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="p-2 text-left">Customer Name</th>
                      <th className="p-2 text-left">Product</th>
                      <th className="p-2 text-left">Amount</th>
                      <th className="p-2 text-left">Option</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...Array(4)].map((_, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-2">John Doe</td>
                        <td className="p-2">Baggy Jean</td>
                        <td className="p-2">$120</td>
                        <td className="p-2">
                          <a href="#" className="text-blue-500">
                            View
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* New Customers */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="flex justify-between items-center p-4">
                <h2 className="text-lg font-bold">New Customers</h2>
                <a href="#" className="btn text-blue-500">
                  View All
                </a>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="p-2 text-left">Profile</th>
                      <th className="p-2 text-left">Name / Email</th>
                      <th className="p-2 text-left">Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.uid} className="border-b">
                        <td className="p-2">
                          <img
                            src={userIcon.src}
                            alt="Profile"
                            className="w-6 h-6 rounded-full"
                          />
                        </td>
                        <td className="p-2">
                          { user.email }
                        </td>
                        <td className="p-2 capitalize">{user.role}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

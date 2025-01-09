// components/UserCards.tsx
"use client"; // Required for client-side Firebase usage

import React, { useEffect, useState } from "react";
import { auth } from "@/app/services/firebase"; // Import the auth instance from your firebase.ts
import { onAuthStateChanged, User } from "firebase/auth"; // Import User type
import Image from "next/image";
import customer from "@/app/image/dashboard/customer.png"; // Replace with your image paths

const UserCards = () => {
  const [user, setUser] = useState<User | null>(null); // State to store the logged-in user
  const [loading, setLoading] = useState(true); // State to handle loading

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setUser(user);
      } else {
        // No user is signed in
        setUser(null);
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Show a loading state
  }

  if (!user) {
    return <p>Please log in to view this content.</p>; // Handle case where no user is logged in
  }

  // Example data based on the logged-in user
  const userData = {
    customers: 2194,
    employees: 53,
    products: 5,
    income: 350000,
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* Customer Card */}
      <div className="bg-white p-4 shadow rounded-lg flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">{userData.customers}</h1>
          <h3 className="text-sm text-gray-500">Customers</h3>
        </div>
        <Image src={customer} alt="Customer" width={40} height={40} />
      </div>

      {/* Employee Card */}
      <div className="bg-white p-4 shadow rounded-lg flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">{userData.employees}</h1>
          <h3 className="text-sm text-gray-500">Employees</h3>
        </div>
        <Image src={customer} alt="Employee" width={40} height={40} />
      </div>

      {/* Product Card */}
      <div className="bg-white p-4 shadow rounded-lg flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">{userData.products}</h1>
          <h3 className="text-sm text-gray-500">Products</h3>
        </div>
        <Image src={customer} alt="Product" width={40} height={40} />
      </div>

      {/* Income Card */}
      <div className="bg-white p-4 shadow rounded-lg flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">{userData.income}</h1>
          <h3 className="text-sm text-gray-500">Income</h3>
        </div>
        <Image src={customer} alt="Income" width={40} height={40} />
      </div>
    </div>
  );
};

export default UserCards;
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/services/firebase"; // Adjust the path

const StaffDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Check the user's role in Firestore
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userData = userDoc.data();

        if (userData?.role === "staff") {
          setAuthorized(true);
        } else {
          alert("You do not have access to the staff dashboard.");
          router.push("/login");
        }
      } else {
        alert("Please log in to access the staff dashboard.");
        router.push("/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!authorized) {
    return null; // Render nothing if unauthorized
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Staff Dashboard</h1>
      <p>Welcome to the staff dashboard! Access your tasks and tools here.</p>
    </div>
  );
};

export default StaffDashboard;

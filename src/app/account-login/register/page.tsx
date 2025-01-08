"use client";

import React, { useState } from "react";
import { auth } from "@/app/services/firebase"; // Ensure your Firebase setup file is correctly imported
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/navigation"; // For navigation after successful registration/login
import { FirebaseError } from "firebase/app"; // Import FirebaseError

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const router = useRouter();

  const handleRegister = async (e: { preventDefault: () => void; }) => {
    e.preventDefault(); // Prevent default form submission
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("User registered successfully!");
      router.push("/"); // Navigate to the homepage on success
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.error("Firebase Error during registration:", error.message);
        alert(error.message);
      } else {
        console.error("Unexpected error during registration:", error);
        alert("An unexpected error occurred.");
      }
    }
  };

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault(); // Prevent default form submission
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Logged in successfully!");
      router.push("/"); // Navigate to the homepage on success
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.error("Firebase Error during login:", error.message);
        alert(error.message);
      } else {
        console.error("Unexpected error during login:", error);
        alert("An unexpected error occurred.");
      }
    }
  };

  return (
    <div>
      {/* Navbar Section */}
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a>Homepage</a>
              </li>
              <li>
                <a>Women</a>
              </li>
              <li>
                <a>Man</a>
              </li>
              <li>
                <a>About us</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost text-xl">
            Buy
            <p className="text-5xl pl-0 font-thin text-blue-700">Me</p>
          </a>
        </div>
        <div className="navbar-end">
          <button className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          <button className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="badge badge-xs badge-primary indicator-item"></span>
            </div>
          </button>
        </div>
      </div>

      <div className="h-screen flex flex-col items-center justify-start">
        <h1 className="text-4xl font-bold text-center mt-16 mb-10">Register</h1>

        <form onSubmit={handleRegister} className="w-full flex flex-col items-center">
          <div className="flex space-x-5">
            <div className="flex items-center justify-center border border-gray-400 rounded-md h-14 w-48 text-sm relative focus-within:border-black mb-5">
              <input
                type="text"
                className="w-1/2 h-full px-4 pt-3 outline-none bg-transparent text-black peer"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <label className="text-gray-400 absolute left-4 top-4 transition-all duration-300 peer-focus:text-xs peer-focus:top-2">
                First name
              </label>
            </div>

            <div className="flex items-center justify-center border border-gray-400 rounded-md h-14 w-48 text-sm relative focus-within:border-black mb-5 ">
              <input
                type="text"
                className="w-1/2 h-full px-4 pt-3 outline-none bg-transparent text-black peer"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <label className="text-gray-400 absolute left-4 top-4 transition-all duration-300 peer-focus:text-xs peer-focus:top-2">
                Last name
              </label>
            </div>
          </div>

          <div className="flex items-center justify-center border border-gray-400 rounded-md h-14 w-[404px] text-sm relative focus-within:border-black mb-5">
            <input
              type="email"
              className="w-full h-full px-4 pt-3 outline-none bg-transparent text-black peer"
              
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="text-gray-400 absolute left-4 top-4 transition-all duration-300 peer-focus:text-xs peer-focus:top-2 mb-1">
              Email
            </label>
          </div>

          <div className="flex items-center justify-center border border-gray-400 rounded-md h-14 w-[404px] text-sm relative focus-within:border-black mb-5">
            <input
              type="password"
              className="w-full h-full px-4 pt-3 outline-none bg-transparent text-black peer"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="text-gray-400 absolute left-4 top-4 transition-all duration-300 peer-focus:text-xs peer-focus:top-2">
              Password
            </label>
          </div>

          <div>
            <button
              type="submit"
              className="flex items-center justify-center border-none bg-black text-white rounded-md h-14 w-[404px] text-sm mb-3 mt-5 transform hover:scale-105 transition duration-300"
            >
              Register Now
            </button>
          </div>
        </form>

        <div>
          <a className="text-center cursor-pointer hover:underline">
            Already have an account?
          </a>
        </div>

        <form onSubmit={handleLogin} className="w-full flex flex-col items-center">
          <div>
            <button
              type="submit"
              className="flex items-center justify-center border-none bg-black text-white rounded-md h-14 w-[404px] text-sm mt-8 transform hover:scale-105 transition duration-300"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;

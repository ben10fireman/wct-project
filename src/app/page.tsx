"use client";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/services/firebase";
import BuyNowModal from "@/components/buyNow"; // Import the BuyNowModal component
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  categoryId: string; // Add categoryId to the Product interface
}

interface Category {
  id: string;
  type: string;
}

const Page = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productCollection = collection(db, "products");
        const productSnapshot = await getDocs(productCollection);
        const productData = productSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Product, "id">),
        }));
        setProducts(productData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const categoryCollection = collection(db, "categories");
        const categorySnapshot = await getDocs(categoryCollection);
        const categoryData = categorySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Category, "id">),
        }));
        setCategories(categoryData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchProducts();
    fetchCategories();
    setLoading(false);
  }, []);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.categoryId === selectedCategory)
    : products;

  return (
    <div>
      {/* Navbar Section */}
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
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
                <a>Portfolio</a>
              </li>
              <li>
                <a>About</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost text-xl">
            Buy
            <p className="text-5xl pl-0 font-thin">Me</p>
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

      {/* Hero Section */}
      <div className="flex flex-col sm:flex-row w-full relative gap-1">
        <div className="relative w-full sm:w-1/2 h-[100vw] sm:h-[110vh] overflow-hidden">
          <div className="relative w-full h-full">
            <img
              src="https://i.pinimg.com/736x/f7/44/6d/f7446da84c4c41dd66196866253ab854.jpg"
              alt="Women"
              className="w-full h-full object-cover"
            />
            <button className="absolute bottom-10 left-5 text-white text-3xl sm:text-5xl lg:text-6xl font-thin sm:left-72 cursor-pointer hover:underline transform hover:scale-105 transition duration-300 hover:text-pink-300">
              Women
            </button>
          </div>
        </div>
        <div className="relative w-full sm:w-1/2 h-[100vw] sm:h-[110vh] overflow-hidden">
          <div className="relative w-full h-full">
            <img
              src="https://i.pinimg.com/736x/b0/46/98/b04698303671f455ec7e45c88d686fec.jpg"
              alt="Men"
              className="w-full h-full object-cover"
            />
            <button className="absolute bottom-10 right-5 text-white text-xl sm:text-5xl lg:text-6xl font-thin sm:right-72 cursor-pointer hover:underline transform hover:scale-105 transition duration-300 hover:text-blue-300">
              Men
            </button>
          </div>
        </div>
      </div>

      {/* New Arrival Section */}
      <div>
        <Link href="/newArrival">
          <button className="font-bold text-black text-xl p-3 cursor-pointer btn btn-ghost">
            New Arrival
          </button>
        </Link>
        <div className="carousel rounded-box relative">
          {loading ? (
            <p>Loading products...</p>
          ) : (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-pink-200 carousel-item relative m-1"
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="w-full absolute bottom-5">
                  <p className="block text-white text-sm sm:text-base lg:text-lg font-thin m-2 sm:right-72">
                    {product.name}
                  </p>
                  <p className="block text-white text-sm sm:text-base lg:text-lg font-thin m-2 sm:right-72">
                    ${product.price}
                  </p>
                  <div className="flex justify-center md:justify-end pl-20 md:pr-10">
                    <BuyNowModal product={product} />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

       {/* best selling  */}
       <div>
        <Link href="/newArrival">
          <button className="font-bold text-black text-xl p-3 cursor-pointer btn btn-ghost">
            Best Selling
          </button>
        </Link>
        <div className="carousel rounded-box relative">
          {loading ? (
            <p>Loading products...</p>
          ) : (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-pink-200 carousel-item relative m-1"
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="w-full absolute bottom-5">
                  <p className="block text-white text-sm sm:text-base lg:text-lg font-thin m-2 sm:right-72">
                    {product.name}
                  </p>
                  <p className="block text-white text-sm sm:text-base lg:text-lg font-thin m-2 sm:right-72">
                    ${product.price}
                  </p>
                  <div className="flex justify-center md:justify-end pl-20 md:pr-10">
                    <BuyNowModal product={product} />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

       {/* Accessory Section */}
       <div>
        <Link href="/newArrival">
          <button className="font-bold text-black text-xl p-3 cursor-pointer btn btn-ghost">
            Accessory
          </button>
        </Link>
        <div className="carousel rounded-box relative">
          {loading ? (
            <p>Loading products...</p>
          ) : (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-pink-200 carousel-item relative m-1"
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="w-full absolute bottom-5">
                  <p className="block text-white text-sm sm:text-base lg:text-lg font-thin m-2 sm:right-72">
                    {product.name}
                  </p>
                  <p className="block text-white text-sm sm:text-base lg:text-lg font-thin m-2 sm:right-72">
                    ${product.price}
                  </p>
                  <div className="flex justify-center md:justify-end pl-20 md:pr-10">
                    <BuyNowModal product={product} />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Footer Section */}
      <div>
        <footer className="footer bg-neutral text-neutral-content p-10">
          <nav>
            <h6 className="footer-title">Services</h6>
            <a className="link link-hover">Branding</a>
            <a className="link link-hover">Design</a>
            <a className="link link-hover">Marketing</a>
            <a className="link link-hover">Advertisement</a>
          </nav>
          <nav>
            <h6 className="footer-title">Company</h6>
            <a className="link link-hover">About us</a>
            <a className="link link-hover">Contact</a>
            <a className="link link-hover">Jobs</a>
            <a className="link link-hover">Press kit</a>
          </nav>
          <nav>
            <h6 className="footer-title">Legal</h6>
            <a className="link link-hover">Terms of use</a>
            <a className="link link-hover">Privacy policy</a>
            <a className="link link-hover">Cookie policy</a>
          </nav>
        </footer>
      </div>
    </div>
  );
};

export default Page;

"use client";
import React, { useEffect, useState, useCallback } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/services/firebase";
import BuyNowModal from "@/components/buyNow";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  categoryId: string;
  isnew?: boolean;
  isBestselling?: boolean;
  isAccessories?: boolean;
}

interface Category {
  id: string;
  type: string;
}

const Page = () => {
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const fetchData = useCallback(async () => {
    try {
      // Fetch products
      const productCollection = collection(db, "products");
      const productSnapshot = await getDocs(productCollection);
      const productData = productSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Product, "id">),
      }));
      setProducts(productData);
    } catch (err) {
      setError("Failed to fetch data.");
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleBuyNowClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  // Filter products for best selling
  const bestSelling = products.filter((product) => product.isBestselling);

  const renderProductSection = (title: string, products: Product[]) => (
    <div className="mb-8">
      <h2 className="font-bold text-black text-xl p-3">{title}</h2>
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-6">
          {loading ? (
            <p>Loading products...</p>
          ) : products.length > 0 ? (
            products.map((product) => (
              <div
                key={product.id}
                className="bg-white shadow-md rounded-lg p-4 flex-none w-96"
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-96 object-cover rounded-lg"
                />
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-gray-600">{product.description}</p>
                  <p className="text-lg font-bold">${product.price}</p>
                  <div className="mt-2">
                    <button
                      onClick={() => handleBuyNowClick(product)}
                      className="bg-black text-white px-4 py-2 rounded mt-2 hover:bg-blue-600 w-full"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No products found in this category.</p>
          )}
        </div>
      </div>
    </div>
  );

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
                <a>Men</a>
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
          <div className="flex gap-2">
            <Link href="/log-in">
              <button className="btn btn-primary">Login</button>
            </Link>
            <Link href="/register">
              <button className="btn btn-secondary">Register</button>
            </Link>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="p-4">
        <div className="flex gap-4">
          <button className="btn btn-outline">Women</button>
          <button className="btn btn-outline">Men</button>
          <button className="btn btn-outline">Shoes</button>
          <button className="btn btn-outline">Necklaces</button>
          <button className="btn btn-outline">Sun Glasses</button>
          <button className="btn btn-outline">Hats</button>
        </div>
      </div>

      {/* Best Selling Section */}
      {renderProductSection("Best Selling", bestSelling)}

      {/* BuyNow Modal */}
      {isModalOpen && selectedProduct && (
        <BuyNowModal
          product={selectedProduct}
          isModalOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}

      {/* Footer Section */}
      <footer className="footer bg-neutral text-neutral-content p-20">
        <nav>
          <h6 className="footer-title">Contact us</h6>
          <a className="link link-hover">Facebook</a>
          <a className="link link-hover">Instagram</a>
          <a className="link link-hover">TikTok</a>
          <a className="link link-hover">Email</a>
        </nav>
        <nav>
          <h6 className="footer-title">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Term and Condition</a>
        </nav>
        <nav>
          <h6 className="footer-title">We Accept</h6>
          <a className="link link-hover">ABA bank</a>
          <a className="link link-hover">Acelida</a>
          <a className="link link-hover">KH QR</a>
        </nav>
      </footer>
    </div>
  );
};

export default Page;
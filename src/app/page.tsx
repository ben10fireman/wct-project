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
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [sortBy, setSortBy] = useState("price-asc");
  const [visibleProducts, setVisibleProducts] = useState(6);

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

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

      // Fetch categories
      const categoryCollection = collection(db, "categories");
      const categorySnapshot = await getDocs(categoryCollection);
      const categoryData = categorySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Category, "id">),
      }));
      setCategories(categoryData);
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

  useEffect(() => {
    // Reflect filters in URL
    const query = new URLSearchParams();
    if (selectedCategory) query.set("category", selectedCategory);
    if (searchQuery) query.set("search", searchQuery);
    if (priceRange.min !== 0 || priceRange.max !== 1000) {
      query.set("minPrice", priceRange.min.toString());
      query.set("maxPrice", priceRange.max.toString());
    }
    if (sortBy !== "price-asc") query.set("sortBy", sortBy);
  
    // Update the URL without causing a full page reload or scroll to the top
    router.replace(`${pathname}?${query.toString()}`, { scroll: false });
  }, [selectedCategory, searchQuery, priceRange, sortBy, router, pathname]);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handleBuyNowClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleClearFilters = () => {
    setSelectedCategory(null);
    setSearchQuery("");
    setPriceRange({ min: 0, max: 1000 });
    setSortBy("price-asc");
  };

  const loadMoreProducts = () => {
    setVisibleProducts((prev) => prev + 6);
  };

  // Filter products based on selected category, search query, and price range
  const filteredProducts = products
    .filter((product) =>
      selectedCategory ? product.categoryId === selectedCategory : true
    )
    .filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(
      (product) =>
        parseFloat(product.price) >= priceRange.min &&
        parseFloat(product.price) <= priceRange.max
    );

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-asc") return parseFloat(a.price) - parseFloat(b.price);
    if (sortBy === "price-desc") return parseFloat(b.price) - parseFloat(a.price);
    return 0;
  });

  // Filter products for specific sections
  const newArrivals = sortedProducts.filter((product) => product.isnew);
  const bestSelling = sortedProducts.filter((product) => product.isBestselling);
  const accessories = sortedProducts.filter((product) => product.isAccessories);

  const renderProductSection = (title: string, products: Product[]) => (
    <div className="mb-8">
      <h2 className="font-bold text-black text-xl p-3">{title}</h2>
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-6">
          {loading ? (
            <p>Loading products...</p>
          ) : products.length > 0 ? (
            products.slice(0, visibleProducts).map((product) => (
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
      {products.length > visibleProducts && (
        <button
          onClick={loadMoreProducts}
          className="mt-4 bg-black text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Load More
        </button>
      )}
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

      {/* Filters Section */}
      <div className="p-4">
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border rounded-lg"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="p-2 border rounded-lg"
          >
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
          <button
            onClick={handleClearFilters}
            className="p-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Clear Filters
          </button>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`btn ${selectedCategory === null ? "btn-primary" : "btn-secondary"}`}
          >
            All Products
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`btn ${selectedCategory === category.id ? "btn-primary" : "btn-secondary"}`}
            >
              {category.type}
            </button>
          ))}
        </div>
      </div>

      {/* Product Sections */}
      {renderProductSection("New Arrival", newArrivals)}
      {renderProductSection("Best Selling", bestSelling)}
      {renderProductSection("Accessory", accessories)}

      {/* BuyNow Modal */}
      {isModalOpen && selectedProduct && (
        <BuyNowModal
          product={selectedProduct}
          isModalOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}

      {/* Footer Section */}
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
  );
};

export default Page;
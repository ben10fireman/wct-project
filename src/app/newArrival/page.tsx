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

const NewArrivalPage = () => {
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
      {/* Category Filter Section */}
      <div className="flex justify-center gap-4 p-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={`px-4 py-2 border rounded-lg ${
              selectedCategory === category.id
                ? "bg-black text-white"
                : "bg-white text-black"
            } hover:bg-gray-100 transition duration-300`}
          >
            {category.type}
          </button>
        ))}
      </div>

      {/* New Arrival Section */}
      <div>
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

      {/* Back Button */}
      <div className="flex justify-center mt-8">
        <Link href="/">
          <button className="bg-gray-300 px-6 py-3 rounded-lg hover:bg-gray-400 transition duration-300">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NewArrivalPage;
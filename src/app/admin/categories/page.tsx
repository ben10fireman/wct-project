"use client";

import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/app/services/firebase"; // Ensure Firestore instance is correctly imported

interface Product {
  id?: string;
  categoryId: string;
  createAt?: Date;
  description: string;
  imageUrl: string;
  name: string;
  price: string;
}

interface Category {
  id: string;
  type: string;
}

const AdminProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [modalData, setModalData] = useState<Product>({
    categoryId: "",
    description: "",
    imageUrl: "",
    name: "",
    price: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productCollection = collection(db, "products");
        const productSnapshot = await getDocs(productCollection);
        const productData = productSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Product),
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
          ...(doc.data() as Category),
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

  const openModal = (
    product: Product = {
      categoryId: "",
      description: "",
      imageUrl: "",
      name: "",
      price: "",
    }
  ) => {
    setModalData(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalData({
      categoryId: "",
      description: "",
      imageUrl: "",
      name: "",
      price: "",
    });
    setIsModalOpen(false);
  };

  const handleSave = async () => {
    try {
      if (modalData.id) {
        // Update product
        const productRef = doc(db, "products", modalData.id);
        await updateDoc(productRef, {
          categoryId: modalData.categoryId,
          description: modalData.description,
          imageUrl: modalData.imageUrl,
          name: modalData.name,
          price: modalData.price,
          createAt: serverTimestamp(),
        });
        setProducts((prev) =>
          prev.map((prod) =>
            prod.id === modalData.id ? { ...prod, ...modalData } : prod
          )
        );
      } else {
        // Add new product
        const productRef = await addDoc(collection(db, "products"), {
          categoryId: modalData.categoryId,
          description: modalData.description,
          imageUrl: modalData.imageUrl,
          name: modalData.name,
          price: modalData.price,
          createAt: serverTimestamp(),
        });
        setProducts((prev) => [...prev, { id: productRef.id, ...modalData }]);
      }
      closeModal();
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "products", id));
      setProducts((prev) => prev.filter((prod) => prod.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Product Management</h1>
      <button
        onClick={() => openModal()}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
      >
        Add Product
      </button>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b">
                <td className="px-4 py-2">{product.name}</td>
                <td className="px-4 py-2">{product.description}</td>
                <td className="px-4 py-2">{product.price}</td>
                <td className="px-4 py-2">
                  {
                    categories.find((cat) => cat.id === product.categoryId)
                      ?.type || "Unknown"
                  }
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => openModal(product)}
                    className="text-blue-500 hover:underline mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id!)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">
              {modalData.id ? "Edit Product" : "Add Product"}
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Name</label>
              <input
                type="text"
                value={modalData.name}
                onChange={(e) =>
                  setModalData({ ...modalData, name: e.target.value })
                }
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Description</label>
              <textarea
                value={modalData.description}
                onChange={(e) =>
                  setModalData({ ...modalData, description: e.target.value })
                }
                className="w-full px-3 py-2 border rounded"
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Price</label>
              <input
                type="text"
                value={modalData.price}
                onChange={(e) =>
                  setModalData({ ...modalData, price: e.target.value })
                }
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Image URL</label>
              <input
                type="text"
                value={modalData.imageUrl}
                onChange={(e) =>
                  setModalData({ ...modalData, imageUrl: e.target.value })
                }
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Category</label>
              <select
                value={modalData.categoryId}
                onChange={(e) =>
                  setModalData({ ...modalData, categoryId: e.target.value })
                }
                className="w-full px-3 py-2 border rounded"
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.type}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeModal}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProductPage;

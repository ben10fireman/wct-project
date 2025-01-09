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
import { db } from "@/app/services/firebase";

interface Category {
  id?: string;
  type: string;
  createAt?: Date;
}

const AdminCategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [modalData, setModalData] = useState<Category>({
    type: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
      setLoading(false);
    };

    fetchCategories();
  }, []);

  const openModal = (category: Category = { type: "" }) => {
    setModalData(category);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalData({ type: "" });
    setIsModalOpen(false);
  };

  const handleSave = async () => {
    try {
      if (modalData.id) {
        // Update category
        const categoryRef = doc(db, "categories", modalData.id);
        await updateDoc(categoryRef, {
          type: modalData.type,
          createAt: serverTimestamp(),
        });
        setCategories((prev) =>
          prev.map((cat) =>
            cat.id === modalData.id ? { ...cat, ...modalData } : cat
          )
        );
      } else {
        // Add new category
        const categoryRef = await addDoc(collection(db, "categories"), {
          type: modalData.type,
          createAt: serverTimestamp(),
        });
        setCategories((prev) => [...prev, { id: categoryRef.id, ...modalData }]);
      }
      closeModal();
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "categories", id));
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  if (loading) return <p>Loading categories...</p>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Category Management</h1>
      <button
        onClick={() => openModal()}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
      >
        Add Category
      </button>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="border-b">
                <td className="px-4 py-2">{category.type}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => openModal(category)}
                    className="text-blue-500 hover:underline mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(category.id!)}
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
              {modalData.id ? "Edit Category" : "Add Category"}
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Type</label>
              <input
                type="text"
                value={modalData.type}
                onChange={(e) =>
                  setModalData({ ...modalData, type: e.target.value })
                }
                className="w-full px-3 py-2 border rounded"
              />
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

export default AdminCategoriesPage;
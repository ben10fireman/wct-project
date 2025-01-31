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

interface Product {
  id?: string;
  categoryId: string;
  createAt?: Date;
  description: string;
  imageUrl: string;
  isAccessories: boolean;
  isBestselling: boolean;
  isnew: boolean;
  isPromotion: boolean; // New field for promotion products
  name: string;
  price: string;
  file?: File | null;
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
    isAccessories: false,
    isBestselling: false,
    isnew: false,
    isPromotion: false, // New field for promotion products
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
        const productData = productSnapshot.docs.map((doc) => {
          const data = doc.data() as Omit<Product, "id">;
          console.log("Fetched product data:", data); // Debugging: Log fetched data
          return {
            id: doc.id,
            ...data,
          };
        });
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

  const openModal = (
    product: Product = {
      categoryId: "",
      description: "",
      imageUrl: "",
      isAccessories: false,
      isBestselling: false,
      isnew: false,
      isPromotion: false, // New field for promotion products
      name: "",
      price: "",
    }
  ) => {
    console.log("Opening modal with product:", product); // Debugging: Log modal data
    setModalData(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalData({
      categoryId: "",
      description: "",
      imageUrl: "",
      isAccessories: false,
      isBestselling: false,
      isnew: false,
      isPromotion: false, // New field for promotion products
      name: "",
      price: "",
    });
    setIsModalOpen(false);
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSave = async () => {
    try {
      let imageUrl = modalData.imageUrl;

      // If a file is uploaded, convert it to a base64 string
      if (modalData.file) {
        imageUrl = await convertFileToBase64(modalData.file);
      }

      if (modalData.id) {
        // Update product
        const productRef = doc(db, "products", modalData.id);
        await updateDoc(productRef, {
          categoryId: modalData.categoryId,
          description: modalData.description,
          imageUrl,
          isAccessories: modalData.isAccessories,
          isBestselling: modalData.isBestselling,
          isnew: modalData.isnew,
          isPromotion: modalData.isPromotion, // New field for promotion products
          name: modalData.name,
          price: modalData.price,
          createAt: serverTimestamp(),
        });
        setProducts((prev) =>
          prev.map((prod) =>
            prod.id === modalData.id
              ? { ...prod, ...modalData, imageUrl }
              : prod
          )
        );
      } else {
        // Add new product
        const productRef = await addDoc(collection(db, "products"), {
          categoryId: modalData.categoryId,
          description: modalData.description,
          imageUrl,
          isAccessories: modalData.isAccessories,
          isBestselling: modalData.isBestselling,
          isnew: modalData.isnew,
          isPromotion: modalData.isPromotion, // New field for promotion products
          name: modalData.name,
          price: modalData.price,
          createAt: serverTimestamp(),
        });
        setProducts((prev) => [
          ...prev,
          { id: productRef.id, ...modalData, imageUrl },
        ]);
      }
      closeModal();
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      // Log the ID being deleted
      console.log("Deleting product with ID:", id);

      // Ensure the ID is valid
      if (!id) {
        console.error("Invalid product ID");
        return;
      }

      // Delete the document from Firestore
      await deleteDoc(doc(db, "products", id));

      // Update the local state to remove the deleted product
      setProducts((prev) => prev.filter((prod) => prod.id !== id));

      console.log("Product deleted successfully");
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
        className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-black hover:text-white mb-4"
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
              <th className="px-4 py-2 text-left">Image</th>
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
                  {categories.find((cat) => cat.id === product.categoryId)
                    ?.type || "Unknown"}
                </td>
                <td className="px-4 py-2">
                  {product.imageUrl && (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  )}
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
          <div className="bg-white p-4 rounded-lg shadow-lg w-96 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold mb-2">
              {modalData.id ? "Edit Product" : "Add Product"}
            </h2>
            <div className="space-y-2">
              <div>
                <label className="block text-gray-700 text-sm mb-1">Name</label>
                <input
                  type="text"
                  value={modalData.name}
                  onChange={(e) =>
                    setModalData({ ...modalData, name: e.target.value })
                  }
                  className="w-full px-2 py-1 border rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm mb-1">
                  Description
                </label>
                <textarea
                  value={modalData.description}
                  onChange={(e) =>
                    setModalData({ ...modalData, description: e.target.value })
                  }
                  className="w-full px-2 py-1 border rounded text-sm"
                  rows={3}
                ></textarea>
              </div>
              <div>
                <label className="block text-gray-700 text-sm mb-1">
                  Price
                </label>
                <input
                  type="text"
                  value={modalData.price}
                  onChange={(e) =>
                    setModalData({ ...modalData, price: e.target.value })
                  }
                  className="w-full px-2 py-1 border rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm mb-1">
                  Image
                </label>
                <input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    setModalData({ ...modalData, file });
                  }}
                  className="w-full px-2 py-1 border rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm mb-1">
                  Category
                </label>
                <select
                  value={modalData.categoryId}
                  onChange={(e) =>
                    setModalData({ ...modalData, categoryId: e.target.value })
                  }
                  className="w-full px-2 py-1 border rounded text-sm"
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.type}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={modalData.isnew}
                  onChange={(e) =>
                    setModalData({ ...modalData, isnew: e.target.checked })
                  }
                  className="mr-2"
                />
                <label className="text-gray-700 text-sm">Is New</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={modalData.isBestselling}
                  onChange={(e) =>
                    setModalData({
                      ...modalData,
                      isBestselling: e.target.checked,
                    })
                  }
                  className="mr-2"
                />
                <label className="text-gray-700 text-sm">Is Best Selling</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={modalData.isAccessories}
                  onChange={(e) =>
                    setModalData({
                      ...modalData,
                      isAccessories: e.target.checked,
                    })
                  }
                  className="mr-2"
                />
                <label className="text-gray-700 text-sm">Is Accessory</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={modalData.isPromotion}
                  onChange={(e) =>
                    setModalData({
                      ...modalData,
                      isPromotion: e.target.checked,
                    })
                  }
                  className="mr-2"
                />
                <label className="text-gray-700 text-sm">Is Promotion</label>
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={closeModal}
                className="bg-gray-300 px-3 py-1 rounded text-sm hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
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
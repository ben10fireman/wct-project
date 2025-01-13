"use client";

import React, { useEffect, useState } from "react";
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "@/app/services/firebase"; // Import Firestore instance from firebase.ts

// Define the type for customer
interface Customer {
  id?: string; // Firestore IDs are strings and can be optional
  name: string;
  email: string;
  role: "admin" | "customer"; // Restrict role to either "admin" or "customer"
}

const AdminCustomerPage = () => {
  const [customerList, setCustomerList] = useState<Customer[]>([]); // Ensure customerList matches the Customer[] type
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<Customer>({
    id: undefined,
    name: "",
    email: "",
    role: "customer",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const customerCollection = collection(db, "users");
        const customerSnapshot = await getDocs(customerCollection);

        const customerData = customerSnapshot.docs
          .map((doc) => ({ id: doc.id, ...(doc.data() as Customer) }));

        setCustomerList(customerData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, []);

  // Open modal for adding or editing
  const openModal = (customer: Customer = { id: undefined, name: "", email: "", role: "customer" }) => {
    setModalData(customer);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setModalData({ id: undefined, name: "", email: "", role: "customer" });
    setIsModalOpen(false);
  };

  const handleSave = async () => {
    console.log("Saving customer:", modalData);
    try {
      if (modalData.id) {
        // Update customer
        const customerRef = doc(db, "users", modalData.id);
        await updateDoc(customerRef, {
          name: modalData.name,
          email: modalData.email,
          role: modalData.role,
        });
        console.log("Updated customer:", modalData);

        setCustomerList((prev) =>
          prev.map((customer) => (customer.id === modalData.id ? modalData : customer))
        );
      } else {
        // Add new customer
        const newCustomer = {
          name: modalData.name,
          email: modalData.email,
          role: modalData.role,
        };
        const docRef = await addDoc(collection(db, "users"), newCustomer);
        console.log("Added new customer:", { id: docRef.id, ...newCustomer });

        setCustomerList((prev) => [...prev, { id: docRef.id, ...newCustomer }]);
      }
      closeModal();
    } catch (error) {
      console.error("Error saving customer:", error);
    }
  };

  const handleDelete = async (id?: string) => {
    console.log("Deleting customer ID:", id);
    try {
      if (id) {
        await deleteDoc(doc(db, "users", id));
        console.log("Deleted customer ID:", id);
        setCustomerList((prev) => prev.filter((customer) => customer.id !== id));
      }
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  if (loading) {
    return <p>Loading customers...</p>;
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Customer Management</h1>
        <button
          onClick={() => openModal()}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Customer
        </button>
      </div>

      {/* Customer Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customerList.map((customer) => (
              <tr key={customer.id} className="border-b">
                <td className="px-4 py-2">{customer.name}</td>
                <td className="px-4 py-2">{customer.email}</td>
                <td className="px-4 py-2">{customer.role}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => openModal(customer)}
                    className="text-blue-500 hover:underline mr-4"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(customer.id)}
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">
              {modalData.id ? "Edit Customer" : "Add Customer"}
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
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={modalData.email}
                onChange={(e) =>
                  setModalData({ ...modalData, email: e.target.value })
                }
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Role</label>
              <select
                value={modalData.role}
                onChange={(e) =>
                  setModalData({ ...modalData, role: e.target.value as "admin" | "customer" })
                }
                className="w-full px-3 py-2 border rounded"
              >
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
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

export default AdminCustomerPage;

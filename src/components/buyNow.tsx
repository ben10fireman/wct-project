"use client";
import React, { useState } from "react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
}

interface BuyNowModalProps {
  product: Product;
  isModalOpen: boolean; // Controlled by the parent component
  onClose: () => void; // Function to close the modal
}

const BuyNowModal: React.FC<BuyNowModalProps> = ({
  product,
  isModalOpen,
  onClose,
}) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  const handleSizeSelection = (size: string) => {
    setSelectedSize(size);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= 1) {
      setQuantity(value);
    }
  };

  const handlePayment = () => {
    if (!selectedSize) {
      alert("Please select a size before proceeding to payment.");
      return;
    }
    // Add payment logic here
    console.log("Processing payment for:", {
      product,
      size: selectedSize,
      quantity,
    });
    alert(
      `Payment processed for ${product.name} (Size: ${selectedSize}, Quantity: ${quantity})`
    );
    onClose(); // Close the modal after payment
  };

  if (!isModalOpen) return null; // Don't render the modal if it's not open

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      {/* Modal Container */}
      <div className="bg-white p-4 md:p-8 rounded-lg shadow-lg w-full max-w-sm md:max-w-3xl lg:max-w-4xl h-auto md:h-[600px]">
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 h-full">
          {/* Product Image */}
          <div className="w-full md:w-1/2 h-40 md:h-full">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* Product Details */}
          <div className="w-full md:w-1/2 flex flex-col justify-between">
            <div>
              <h2 className="text-lg md:text-3xl font-bold mb-2">
                {product.name}
              </h2>
              <p className="text-gray-700 text-sm md:text-lg mb-4">
                {product.description}
              </p>
              <p className="text-lg md:text-2xl font-bold mb-6">
                ${product.price}
              </p>

              {/* Size Selection */}
              <div className="mb-6">
                <p className="text-gray-700 font-semibold mb-2 text-sm md:text-lg">
                  Size
                </p>
                <div className="flex flex-wrap gap-2">
                  {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                    <button
                      key={size}
                      onClick={() => handleSizeSelection(size)}
                      className={`px-3 py-1.5 text-sm md:px-4 md:py-2 md:text-base border rounded-lg ${
                        selectedSize === size
                          ? "bg-black text-white"
                          : "bg-white text-black"
                      } hover:bg-gray-100 transition duration-300`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selection */}
              <div className="mb-6">
                <p className="text-gray-700 font-semibold mb-2 text-sm md:text-lg">
                  Quantity
                </p>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="w-20 px-3 py-1.5 text-sm md:px-4 md:py-2 md:text-base border rounded-lg"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={onClose}
                className="bg-gray-300 px-4 py-2 text-sm md:px-6 md:py-3 md:text-base rounded-lg hover:bg-black hover:text-white transition duration-300 flex-1"
              >
                Close
              </button>
              <button
                onClick={handlePayment}
                className="bg-blue-500 text-white px-4 py-2 text-sm md:px-6 md:py-3 md:text-base rounded-lg hover:bg-blue-600 transition duration-300 flex-1"
              >
                Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyNowModal;
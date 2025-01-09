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
}

const BuyNowModal: React.FC<BuyNowModalProps> = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSizeSelection = (size: string) => {
    setSelectedSize(size);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(e.target.value));
  };

  return (
    <>
      {/* Buy Now Button */}
      <button
        onClick={handleOpenModal}
        className="px-2 py-1 md:px-4 md:py-2 bg-transparent rounded-lg text-white left-3 text-sm sm:text-base lg:text-lg font-thin hover:bg-black transform hover:scale-105 transition duration-300"
      >
        Buy Now
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 max-w-4xl">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Product Image */}
              <div className="w-full md:w-1/2">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-auto rounded-lg"
                />
              </div>

              {/* Product Details */}
              <div className="w-full md:w-1/2">
                <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
                <p className="text-gray-700 mb-4">{product.description}</p>
                <p className="text-xl font-bold mb-6">${product.price}</p>

                {/* Size Selection */}
                <div className="mb-6">
                  <p className="text-gray-700 font-semibold mb-2">Size</p>
                  <div className="flex gap-2">
                    {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                      <button
                        key={size}
                        onClick={() => handleSizeSelection(size)}
                        className={`px-4 py-2 border rounded-lg ${
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
                  <p className="text-gray-700 font-semibold mb-2">Quantity</p>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="w-20 px-3 py-2 border rounded-lg"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={handleCloseModal}
                    className="bg-gray-300 px-6 py-3 rounded-lg hover:bg-gray-400 transition duration-300"
                  >
                    Close
                  </button>
                  <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BuyNowModal;
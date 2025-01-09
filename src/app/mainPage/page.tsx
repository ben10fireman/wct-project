"use client"
import React from "react";
import newArrival1 from "@/app/image/01.jpg";
import newArrival2 from "@/app/image/02.jpg";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/services/firebase";
import newArrival4 from "@/app/image/04.jpg";
import newArrival5 from "@/app/image/05.jpg";
import bestSelling1 from "@/app/image/06.jpg";
import bestSelling3 from "@/app/image/07.jpg";
import bestSelling4 from "@/app/image/08.jpg";
import bestSelling5 from "@/app/image/09.jpg";
import bestSelling6 from "@/app/image/10.jpg";
import bestSelling7 from "@/app/image/11.jpg";


interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
}


const page = () => {

  const [products, setProducts] = useState<Product[]>([]);
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
      setLoading(false);
    };

    fetchProducts();
  }, []); 

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
        <button className="font-bold text-black text-xl p-3 cursor-pointer btn btn-ghost    ">
          New Arrival
        </button>
        <div className="carousel rounded-box relative   ">
          {/* card */}
          <div className=" bg-pink-200  carousel-item  relative m-1   ">
            <img src={newArrival1.src} alt="clothe" />

            <div className="  w-full  absolute  bottom-5 ">
              <p className=" block text-white text-sm sm:text-base lg:text-lg font-thin m-2  sm:right-72">
                Classic Oversize white Tee
              </p>
              <p className=" block text-white text-sm sm:text-base lg:text-lg font-thin m-2 sm:right-72">
                $59.00
              </p>
              <div className="flex justify-center md:justify-end pl-20 md:pr-10">
                <button className="  px-2  py-1 md:px-4  md:py-2  bg-transparent rounded-lg text-white  left-3 text-sm sm:text-base lg:text-lg font-thin hover:bg-black transform hover:scale-105 transition duration-300">
                  Buy Now
                </button>
              </div>
            </div>
          </div>

          <div className=" bg-pink-200  carousel-item  relative m-1  ">
            <img src={newArrival2.src} alt="clothe" />

            <div className="  w-full  absolute  bottom-5 ">
              <p className=" block text-white text-sm sm:text-base lg:text-lg font-thin m-2  sm:right-72">
                Winter hoodie
              </p>
              <p className=" block text-white text-sm sm:text-base lg:text-lg font-thin m-2 sm:right-72">
                $109.00
              </p>
              <div className="flex justify-center md:justify-end pl-20 md:pr-10">
                <button className="  px-2  py-1 md:px-4  md:py-2  bg-transparent rounded-lg text-white  left-3 text-sm sm:text-base lg:text-lg font-thin hover:bg-black transform hover:scale-105 transition duration-300">
                  Buy Now
                </button>
              </div>
            </div>
          </div>

          <div className=" bg-pink-200  carousel-item  relative m-1  ">
            <img src={newArrival4.src} alt="clothe" />

            <div className="  w-full  absolute  bottom-5 ">
              <p className=" block text-white text-sm sm:text-base lg:text-lg font-thin m-2  sm:right-72">
                Black shopping bag
              </p>
              <p className=" block text-white text-sm sm:text-base lg:text-lg font-thin m-2 sm:right-72">
                $49.00
              </p>
              <div className="flex justify-center md:justify-end pl-20 md:pr-10">
                <button className="  px-2  py-1 md:px-4  md:py-2  bg-transparent rounded-lg text-white  left-3 text-sm sm:text-base lg:text-lg font-thin hover:bg-black transform hover:scale-105 transition duration-300">
                  Buy Now
                </button>
              </div>
            </div>
          </div>

          <div className=" bg-pink-200  carousel-item  relative m-1  ">
            <img src={newArrival5.src} alt="clothe" />

            <div className="  w-full  absolute  bottom-5 ">
              <p className=" block text-white text-sm sm:text-base lg:text-lg font-thin m-2  sm:right-72">
                White hoodie Eighty five
              </p>
              <p className=" block text-white text-sm sm:text-base lg:text-lg font-thin m-2 sm:right-72">
                $299.00
              </p>
              <div className="flex justify-center md:justify-end pl-20 md:pr-10">
                <button className="  px-2  py-1 md:px-4  md:py-2  bg-transparent rounded-lg text-white  left-3 text-sm sm:text-base lg:text-lg font-thin hover:bg-black transform hover:scale-105 transition duration-300">
                  Buy Now
                </button>
              </div>
            </div>
          </div>

          <div className=" bg-pink-200  carousel-item  relative m-1  ">
            <img src={bestSelling7.src} alt="clothe" />

            <div className="  w-full  absolute  bottom-5 ">
              <p className=" block text-white text-sm sm:text-base lg:text-lg font-thin m-2  sm:right-72">
                Oversize white Tee
              </p>
              <p className=" block text-white text-sm sm:text-base lg:text-lg font-thin m-2 sm:right-72">
                $59.00
              </p>
              <div className="flex justify-center md:justify-end pl-20 md:pr-10">
                <button className="  px-2  py-1 md:px-4  md:py-2  bg-transparent rounded-lg text-white  left-3 text-sm sm:text-base lg:text-lg font-thin hover:bg-black transform hover:scale-105 transition duration-300">
                  Buy Now
                </button>
              </div>
            </div>
          </div>

          <div className=" bg-pink-200  carousel-item  relative m-1  ">
            <img src={bestSelling6.src} alt="clothe" />

            <div className="  w-full  absolute  bottom-5 ">
              <p className=" block text-white text-sm sm:text-base lg:text-lg font-thin m-2  sm:right-72">
                Baggy jean
              </p>
              <p className=" block text-white text-sm sm:text-base lg:text-lg font-thin m-2 sm:right-72">
                $1000.00
              </p>
              <div className="flex justify-center md:justify-end pl-20 md:pr-10">
                <button className="  px-2  py-1 md:px-4  md:py-2  bg-transparent rounded-lg text-white  left-3 text-sm sm:text-base lg:text-lg font-thin hover:bg-black transform hover:scale-105 transition duration-300">
                  Buy Now
                </button>
              </div>
            </div>
          </div>

          <div className=" bg-pink-200  carousel-item  relative m-1  ">
            <img src={bestSelling5.src} alt="clothe" />

            <div className="  w-full  absolute  bottom-5 ">
              <p className=" block text-white text-sm sm:text-base lg:text-lg font-thin m-2  sm:right-72">
                Futuristic Sun glasses
              </p>
              <p className=" block text-white text-sm sm:text-base lg:text-lg font-thin m-2 sm:right-72">
                $199.00
              </p>
              <div className="flex justify-center md:justify-end pl-20 md:pr-10">
                <button className="  px-2  py-1 md:px-4  md:py-2  bg-transparent rounded-lg text-white  left-3 text-sm sm:text-base lg:text-lg font-thin hover:bg-black transform hover:scale-105 transition duration-300">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New Arrival Section */}
      <div>
        <button className="font-bold text-black text-xl p-3 cursor-pointer btn btn-ghost    ">
          Best Seller
        </button>
        <div className="carousel rounded-box relative   ">
          {/* card */}
          <div className=" bg-pink-200  carousel-item  relative m-1   ">
            <img src={bestSelling1.src} alt="clothe" />

            <div className="  w-full  absolute  bottom-5 ">
              <p className=" block text-white text-sm sm:text-base lg:text-lg font-thin m-2  sm:right-72">
                Classic Oversize white Tee
              </p>
              <p className=" block text-white text-sm sm:text-base lg:text-lg font-thin m-2 sm:right-72">
                $59.00
              </p>
              <div className="flex justify-center md:justify-end pl-20 md:pr-10">
                <button className="  px-2  py-1 md:px-4  md:py-2  bg-transparent rounded-lg text-white  left-3 text-sm sm:text-base lg:text-lg font-thin hover:bg-black transform hover:scale-105 transition duration-300">
                  Buy Now
                </button>
              </div>
            </div>
          </div>

          <div className=" bg-pink-200  carousel-item  relative m-1  ">
            <img src={bestSelling3.src} alt="clothe" />

            <div className="  w-full  absolute  bottom-5 ">
              <p className=" block text-white text-sm sm:text-base lg:text-lg font-thin m-2  sm:right-72">
                Classic Oversize white Tee
              </p>
              <p className=" block text-white text-sm sm:text-base lg:text-lg font-thin m-2 sm:right-72">
                $59.00
              </p>
              <div className="flex justify-center md:justify-end pl-20 md:pr-10">
                <button className="  px-2  py-1 md:px-4  md:py-2  bg-transparent rounded-lg text-white  left-3 text-sm sm:text-base lg:text-lg font-thin hover:bg-black transform hover:scale-105 transition duration-300">
                  Buy Now
                </button>
              </div>
            </div>
          </div>

          <div className=" bg-pink-200  carousel-item  relative m-1  ">
            <img src={bestSelling4.src} alt="clothe" />

            <div className="  w-full  absolute  bottom-5 ">
              <p className=" block text-white text-sm sm:text-base lg:text-lg font-thin m-2  sm:right-72">
                Classic Oversize white Tee
              </p>
              <p className=" block text-white text-sm sm:text-base lg:text-lg font-thin m-2 sm:right-72">
                $59.00
              </p>
              <div className="flex justify-center md:justify-end pl-20 md:pr-10">
                <button className="  px-2  py-1 md:px-4  md:py-2  bg-transparent rounded-lg text-white  left-3 text-sm sm:text-base lg:text-lg font-thin hover:bg-black transform hover:scale-105 transition duration-300">
                  Buy Now
                </button>
              </div>
            </div>
          </div>

          <div className=" bg-pink-200  carousel-item  relative m-1  ">
            <img src={bestSelling5.src} alt="clothe" />

            <div className="  w-full  absolute  bottom-5 ">
              <p className=" block text-white text-sm sm:text-base lg:text-lg font-thin m-2  sm:right-72">
                Classic Oversize white Tee
              </p>
              <p className=" block text-white text-sm sm:text-base lg:text-lg font-thin m-2 sm:right-72">
                $59.00
              </p>
              <div className="flex justify-center md:justify-end pl-20 md:pr-10">
                <button className="  px-2  py-1 md:px-4  md:py-2  bg-transparent rounded-lg text-white  left-3 text-sm sm:text-base lg:text-lg font-thin hover:bg-black transform hover:scale-105 transition duration-300">
                  Buy Now
                </button>
              </div>
            </div>
          </div>

          <div className=" bg-pink-200  carousel-item  relative m-1  ">
            <img src={bestSelling6.src} alt="clothe" />

            <div className="  w-full  absolute  bottom-5 ">
              <p className=" block text-white text-sm sm:text-base lg:text-lg font-thin m-2  sm:right-72">
                Classic Oversize white Tee
              </p>
              <p className=" block text-white text-sm sm:text-base lg:text-lg font-thin m-2 sm:right-72">
                $59.00
              </p>
              <div className="flex justify-center md:justify-end pl-20 md:pr-10">
                <button className="  px-2  py-1 md:px-4  md:py-2  bg-transparent rounded-lg text-white  left-3 text-sm sm:text-base lg:text-lg font-thin hover:bg-black transform hover:scale-105 transition duration-300">
                  Buy Now
                </button>
              </div>
            </div>
          </div>

          <div className=" bg-pink-200  carousel-item  relative m-1  ">
            <img src={bestSelling7.src} alt="clothe" />

            <div className="  w-full  absolute  bottom-5 ">
              <p className=" block text-white text-sm sm:text-base lg:text-lg font-thin m-2  sm:right-72">
                Classic Oversize white Tee
              </p>
              <p className=" block text-white text-sm sm:text-base lg:text-lg font-thin m-2 sm:right-72">
                $59.00
              </p>
              <div className="flex justify-center md:justify-end pl-20 md:pr-10">
                <button className="  px-2  py-1 md:px-4  md:py-2  bg-transparent rounded-lg text-white  left-3 text-sm sm:text-base lg:text-lg font-thin hover:bg-black transform hover:scale-105 transition duration-300">
                  Buy Now
                </button>
              </div>
            </div>
          </div>

          <div className=" bg-pink-200  carousel-item  relative m-1  ">
            <img src={newArrival1.src} alt="clothe" />

            <div className="  w-full  absolute  bottom-5 ">
              <p className=" block text-white text-sm sm:text-base lg:text-lg font-thin m-2  sm:right-72">
                Classic Oversize white Tee
              </p>
              <p className=" block text-white text-sm sm:text-base lg:text-lg font-thin m-2 sm:right-72">
                $59.00
              </p>
              <div className="flex justify-center md:justify-end pl-20 md:pr-10">
                <button className="  px-2  py-1 md:px-4  md:py-2  bg-transparent rounded-lg text-white  left-3 text-sm sm:text-base lg:text-lg font-thin hover:bg-black transform hover:scale-105 transition duration-300">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New Arrival Section */}
      <div>
        <button className="font-bold text-black text-xl p-3 cursor-pointer btn btn-ghost    ">
          Accessory
        </button>
        <div className="carousel rounded-box relative   ">
          {/* card */}
          <div className=" bg-pink-200  carousel-item  relative    ">
            <img src={newArrival1.src} alt="clothe" />

            <div className="  w-full  absolute  bottom-5 ">
              <p className=" block text-white text-sm sm:text-base lg:text-lg font-thin m-2  sm:right-72">
                Classic Oversize white Tee
              </p>
              <p className=" block text-white text-sm sm:text-base lg:text-lg font-thin m-2 sm:right-72">
                $59.00
              </p>
              <div className="flex justify-center md:justify-end pl-20 md:pr-10">
                <button className="  px-2  py-1 md:px-4  md:py-2  bg-transparent rounded-lg text-white  left-3 text-sm sm:text-base lg:text-lg font-thin hover:bg-black transform hover:scale-105 transition duration-300">
                  Buy Now
                </button>
              </div>
            </div>
          </div>

          <div className=" bg-pink-200  carousel-item  relative   ">
            <img src={newArrival2.src} alt="clothe" />

            <div className="  w-full  absolute  bottom-5 ">
              <p className=" block text-white text-sm sm:text-base lg:text-lg font-thin m-2  sm:right-72">
                Classic Oversize white Tee
              </p>
              <p className=" block text-white text-sm sm:text-base lg:text-lg font-thin m-2 sm:right-72">
                $59.00
              </p>
              <div className="flex justify-center md:justify-end pl-20 md:pr-10">
                <button className="  px-2  py-1 md:px-4  md:py-2  bg-transparent rounded-lg text-white  left-3 text-sm sm:text-base lg:text-lg font-thin hover:bg-black transform hover:scale-105 transition duration-300">
                  Buy Now
                </button>
              </div>
            </div>
          </div>

          <div className=" bg-pink-200  carousel-item  relative   ">
            <img src={newArrival4.src} alt="clothe" />

            <div className="  w-full  absolute  bottom-5 ">
              <p className=" block text-white text-sm sm:text-base lg:text-lg font-thin m-2  sm:right-72">
                Classic Oversize white Tee
              </p>
              <p className=" block text-white text-sm sm:text-base lg:text-lg font-thin m-2 sm:right-72">
                $59.00
              </p>
              <div className="flex justify-center md:justify-end pl-20 md:pr-10">
                <button className="  px-2  py-1 md:px-4  md:py-2  bg-transparent rounded-lg text-white  left-3 text-sm sm:text-base lg:text-lg font-thin hover:bg-black transform hover:scale-105 transition duration-300">
                  Buy Now
                </button>
              </div>
            </div>
          </div>

          <div className=" bg-pink-200  carousel-item  relative   ">
            <img src={newArrival5.src} alt="clothe" />

            <div className="  w-full  absolute  bottom-5 ">
              <p className=" block text-white text-sm sm:text-base lg:text-lg font-thin m-2  sm:right-72">
                Classic Oversize white Tee
              </p>
              <p className=" block text-white text-sm sm:text-base lg:text-lg font-thin m-2 sm:right-72">
                $59.00
              </p>
              <div className="flex justify-center md:justify-end pl-20 md:pr-10">
                <button className="  px-2  py-1 md:px-4  md:py-2  bg-transparent rounded-lg text-white  left-3 text-sm sm:text-base lg:text-lg font-thin hover:bg-black transform hover:scale-105 transition duration-300">
                  Buy Now
                </button>
              </div>
            </div>
          </div>

          <div className=" bg-pink-200  carousel-item  relative  ">
            <img src={bestSelling7.src} alt="clothe" />

            <div className="  w-full  absolute  bottom-5 ">
              <p className=" block text-white text-sm sm:text-base lg:text-lg font-thin m-2  sm:right-72">
                Classic Oversize white Tee
              </p>
              <p className=" block text-white text-sm sm:text-base lg:text-lg font-thin m-2 sm:right-72">
                $59.00
              </p>
              <div className="flex justify-center md:justify-end pl-20 md:pr-10">
                <button className="  px-2  py-1 md:px-4  md:py-2  bg-transparent rounded-lg text-white  left-3 text-sm sm:text-base lg:text-lg font-thin hover:bg-black transform hover:scale-105 transition duration-300">
                  Buy Now
                </button>
              </div>
            </div>
          </div>

          <div className=" bg-pink-200  carousel-item  relative   ">
            <img src={bestSelling6.src} alt="clothe" />

            <div className="  w-full  absolute  bottom-5 ">
              <p className=" block text-white text-sm sm:text-base lg:text-lg font-thin m-2  sm:right-72">
                Classic Oversize white Tee
              </p>
              <p className=" block text-white text-sm sm:text-base lg:text-lg font-thin m-2 sm:right-72">
                $59.00
              </p>
              <div className="flex justify-center md:justify-end pl-20 md:pr-10">
                <button className="  px-2  py-1 md:px-4  md:py-2  bg-transparent rounded-lg text-white  left-3 text-sm sm:text-base lg:text-lg font-thin hover:bg-black transform hover:scale-105 transition duration-300">
                  Buy Now
                </button>
              </div>
            </div>
          </div>

          <div className=" bg-pink-200  carousel-item  relative   ">
            <img src={bestSelling5.src} alt="clothe" />

            <div className="  w-full  absolute  bottom-5 ">
              <p className=" block text-white text-sm sm:text-base lg:text-lg font-thin m-2  sm:right-72">
                Classic Oversize white Tee
              </p>
              <p className=" block text-white text-sm sm:text-base lg:text-lg font-thin m-2 sm:right-72">
                $59.00
              </p>
              <div className="flex justify-center md:justify-end pl-20 md:pr-10">
                <button className="  px-2  py-1 md:px-4  md:py-2  bg-transparent rounded-lg text-white  left-3 text-sm sm:text-base lg:text-lg font-thin hover:bg-black transform hover:scale-105 transition duration-300">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
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

export default page;

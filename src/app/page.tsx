import React from "react";
import newArrival1 from "@/app/image/01.jpg";
import newArrival2 from "@/app/image/02.jpg";
import newArrival4 from "@/app/image/04.jpg";
import newArrival5 from "@/app/image/05.jpg";
import bestSelling1 from "@/app/image/06.jpg";
import bestSelling3 from "@/app/image/07.jpg";
import bestSelling4 from "@/app/image/08.jpg";
import bestSelling5 from "@/app/image/09.jpg";
import bestSelling6 from "@/app/image/10.jpg";
import bestSelling7 from "@/app/image/11.jpg";
import Link from "next/link";

const page = () => {
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

        {/*search bar*/}

        <div className="navbar-end ">
          <button className="btn btn-ghost btn-circle m-0 ">
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
          
         
          <div className="flex-none">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle m-0"
              >
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
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <span className="badge badge-sm indicator-item">8</span>
                </div>
              </div>
              <div
                tabIndex={0}
                className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
              >
                <div className="card-body">
                  <span className="text-lg font-bold">8 Items</span>
                  <span className="text-info">Subtotal: $999</span>
                  <div className="card-actions">
                    <button className="btn btn-primary btn-block">
                      View cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Fixing the login link */}
            <Link href="/log-in">
              <button className="font-bold transform hover:scale-105 transition duration-300">
                Login
              </button>
            </Link>
            <Link href="/register">
              <button className="font-bold transform hover:scale-105 transition duration-300 pl-[15px]">
                Register
              </button>
            </Link>
          </div>
          ;
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
            <button className="absolute bottom-10 right-5 text-white text-3xl sm:text-5xl lg:text-6xl font-thin sm:right-72 cursor-pointer hover:underline transform hover:scale-105 transition duration-300 hover:text-blue-300">
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
    </div>
  );
};

export default page;

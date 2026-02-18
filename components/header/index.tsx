"use client";
import { useState } from "react";
const Header = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  return (
    <header>
      <div className="relative h-screen  ">
        {/* Background */}
        <div
          className={`${
            isSideBarOpen ? "opacity-100" : " opacity-0"
          } flex flex-col absolute top-30 left-20 text-8xl z-20 text-white transition-all duration-500 ease-in-out`}
        >
          <h1>The District</h1>
          <h1>genuine hostel service</h1>
        </div>
        <div className="absolute inset-0 bg-[url('/header_bg.jpg')] bg-cover "></div>
        <div
          className={`absolute  ease-in-out transition-all duration-500 inset-0 ${isSideBarOpen ? "w-[40vh]" : "w-20"}`}
          onMouseEnter={() => setIsSideBarOpen(true)}
        >
          {/* Sidebar background */}
          <div className="absolute inset-0 bg-black/50"></div>

          {/* Vertical content */}
          <div
            className={`absolute inset-0 bg-black/40 flex flex-col items-center justify-center ${isSideBarOpen ? "hidden" : ""}`}
          >
            <p className="[writing-mode:vertical-rl] rotate-180 tracking-[0.3em] text-white text-sm">
              STAY WITH US
            </p>
            <img src="/chevron_right.svg" className="h-6 w-6 mt-4" />
          </div>

          {/* Menu icon (on top) */}
          <img
            src="/menu.svg"
            className="absolute top-4 left-4 h-10 w-8 cursor-pointer z-20"
          />

          <img
            src="/chevron_left.svg"
            className={`absolute bottom-0 right-0 cursor-pointer z-20 h-10 w-10 ${isSideBarOpen ? "" : "hidden"}`}
            onClick={() => setIsSideBarOpen(false)}
          ></img>
        </div>

        {/* Navbar */}
        <div className="relative z-10 flex justify-center lg:justify-between items-stretch py-4 border-b-2 border-white">
          <div className="flex items-center gap-4">
            <h1 className="text-white text-3xl font-extrabold lg:ml-24">
              The District
            </h1>
          </div>
          <div className=" hidden lg:text-4xl lg:text-white  lg:flex lg:items-center lg:px-6 lg:gap-12">
            <div className="flex text-2xl gap-8">
              <p className=" cursor-pointer">Story</p>
              <p className=" cursor-pointer">offers</p>
              <p className=" cursor-pointer">Gallery</p>
              <p className=" cursor-pointer">Blog</p>
              <div>
                <img
                  src="/flag_uk.svg"
                  className="h-full min-w-8 w-8 cursor-pointer"
                />
              </div>
            </div>
            <div className="relative flex items-center pl-6">
              <div className="absolute left-0 top-0 bottom-0 w-px bg-white"></div>
              <p className="cursor-pointer">Check Availability</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

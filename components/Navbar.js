import React, { useState } from "react"
import SearchBar from "./SearchBar"
import { HitType, useFlagship, useFsFlag } from "@flagship.io/react-sdk"

export default function Navbar() {
const fs = useFlagship();

//get flag 
const flagIndustry = useFsFlag("flagIndustry", "Product")
const flagBackgroundColor = useFsFlag("flagBackgroundColor", "black")
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-white">
        <div className="container px-4 mx-auto flex lg:flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <a
              className="text-2xl px-7 font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-gray-900"
              href="/"
            >
            {flagIndustry.getValue()}
            </a>
            <button
              className="text-gray-900 cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <SearchBar />
          <div
            className={
              "lg:flex items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="nav-item">
                <a
                  className="my-1 text-sm text-gray-900 font-medium md:mx-4 md:my-0"
                  href="/"
                >
                  <span className="ml-2">Home</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="my-1 text-sm text-gray-900 font-medium md:mx-4 md:my-0"
                  href="/"
                >
                  <span className="ml-2">Shop</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="my-1 text-sm text-gray-900 font-medium md:mx-4 md:my-0"
                  href="/"
                >
                  <span className="ml-2">Contact</span>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="my-1 text-sm text-gray-900 font-medium md:mx-4 md:my-0"
                  href="/"
                >
                  <span className="ml-2">About</span>
                </a>
              </li>
            </ul>
            <div class="flex justify-center px-7 md:block">
        <a class="relative text-gray-900 hover:text-gray-600" target="_blank">
          <svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>

          <span style={{ backgroundColor: flagBackgroundColor.getValue() }} class="absolute top-0 left-0 rounded-full bg-indigo-100 text-gray-900 p-1 text-xs"></span>
        </a>
      </div>
          </div>
        </div>
      </nav>
    </>
  );
}
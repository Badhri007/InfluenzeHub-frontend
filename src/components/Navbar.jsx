import React, { useState } from 'react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          Influence Hub
        </div>
        <div className="lg:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>
        <div className={`lg:flex ${isOpen ? 'block' : 'hidden'} w-full lg:w-auto`}>
          <ul className="flex flex-col lg:flex-row lg:space-x-4 mt-2 lg:mt-0">
            <li><a href="/" className="text-white block px-2 py-1">Home</a></li>
            <li><a href="#" className="text-white block px-2 py-1">About</a></li>
            <li><a href="/signup" className="text-white block px-2 py-1">Register</a></li>
            <li><a href="/influencerLogin" className="text-white block px-2 py-1">Login</a></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}


export default Navbar

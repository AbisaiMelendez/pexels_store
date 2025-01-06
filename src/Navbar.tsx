//import React from 'react';
import reactLogo from './assets/react.svg'

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="text-xl font-bold">
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <a>
        Pexels Store 

        </a>
        </div>
       
        <ul className="flex space-x-6">
          <li className="hover:text-gray-600"><a href="#">Home</a></li>
          <li className="hover:text-gray-600"><a href="#">Shop</a></li>
          <li className="hover:text-gray-600"><a href="#">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
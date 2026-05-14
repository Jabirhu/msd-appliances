import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold text-blue-700 tracking-tight">MSD APPLIANCES</span>
          </div>

          {/* Links */}
          <div className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Home</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Washing Machines</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Refrigerators</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">TV</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Mobile Phone</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 font-medium">Oven</a>
          </div>

          {/* Cart & Login */}
          <div className="flex items-center space-x-4">
            <button className="text-gray-700 hover:text-blue-600 relative">
              🛒 <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">0</span>
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
              Login
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
import React from "react";
import { FaTwitter, FaInstagram, FaWhatsapp, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 pt-4 pb-6 hover:text-gray-100">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="md:flex md:flex-wrap md:-mx-4 py-4 md:pb-0">
          <div className="px-4 w-full md:w-1/4">
            <h2 className="text-white uppercase tracking-wider font-bold text-xl">
              About
            </h2>
            <p className="mt-4 text-gray-400 text-sm">
              Keep track of your expenses and stay on top of your budget with
              our expense tracker app.
            </p>
          </div>
          <div className="px-4 w-full md:w-1/4 mt-8 md:mt-0">
            <h3 className="text-white uppercase tracking-wider font-bold  text-xl">
              Categories
            </h3>
            <ul className="mt-4 text-gray-400 text-sm">
              <li>Food</li>
              <li>Entertainment</li>
              <li>Transportation</li>
              <li>Utilities</li>
            </ul>
          </div>
          <div className="px-4 w-full md:w-1/4 mt-8 md:mt-0">
            <h3 className="text-white uppercase tracking-wider font-bold  text-xl">
              Connect
            </h3>
            <ul className="mt-4 text-gray-400 text-sm">
              <li>
                <FaTwitter className="text-blue-500 mb-2" />
              </li>
              <li>
                <FaFacebook className="text-white mb-2" />
              </li>
              <li>
                <FaWhatsapp className="text-green-600 mb-2" />
              </li>
              <li>
                <FaInstagram className="text-pink-600 mb-2" />
              </li>
            </ul>
          </div>
          <div className="px-4 w-full md:w-1/4 mt-8 md:mt-0">
            <h3 className="text-white uppercase tracking-wider font-bold  text-xl">
              Subscribe
            </h3>
            <p className="mt-4 text-gray-400 text-sm">
              Subscribe to our newsletter for tips on managing your expenses and
              saving money.
            </p>
            <form className="mt-4">
              <div className="flex flex-wrap mb-3">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="px-4 py-3 rounded-lg bg-gray-700 text-gray-200 w-full"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-500"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="pt-8 pb-4">
          <p className="text-gray-400 text-sm text-center">
            © 2023 Expense Tracker App. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

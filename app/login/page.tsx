"use client"; // Ensures this is a client-only component

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faTrain, faSignInAlt, faTicketAlt, faList, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import train from "./htrain.webp"
export default function Auth() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<string | null>(null);
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login & Sign-Up

  useEffect(() => {
    // Only run this on the client to prevent hydration mismatch
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }));
    };

    updateClock();
    const clockInterval = setInterval(updateClock, 1000);

    return () => clearInterval(clockInterval);
  }, []);

  return (
    <main className="flex">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: sidebarOpen ? 250 : 80 }}
        className="fixed top-0 left-0 h-full bg-gray-900 text-white p-4 flex flex-col items-center transition-all duration-300 shadow-lg z-50"
      >
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="mb-6 text-2xl">
          <FontAwesomeIcon icon={sidebarOpen ? faTimes : faBars} />
        </button>

        {/* Sidebar Navigation */}
        {isLogin ? (
          <NavItem icon={faTrain} label="Home" href="/" sidebarOpen={sidebarOpen} />
        ) : (
          <NavItem icon={faSignInAlt} label="Login/Sign Up" href="/auth" sidebarOpen={sidebarOpen} />
        )}
        <NavItem icon={faTicketAlt} label="Booking" href="/booking" sidebarOpen={sidebarOpen} />
        <NavItem icon={faList} label="Train List" href="/trains" sidebarOpen={sidebarOpen} />
        <NavItem icon={faMapMarkerAlt} label="Track Train" href="/tracking" sidebarOpen={sidebarOpen} />
      </motion.aside>

      <div className="w-full transition-all" style={{ marginLeft: sidebarOpen ? "250px" : "80px" }}>
        <nav
          className={`fixed top-0 h-16 bg-gray-800 text-white flex justify-between items-center p-4 px-6 shadow-md transition-all duration-300 z-50 ${
            sidebarOpen ? "left-[250px] w-[calc(100%-250px)]" : "left-[80px] w-[calc(100%-80px)]"
          }`}
        >
          <h2 className="text-lg font-bold">IRCTC Modern</h2>
          <div className="text-sm font-semibold">{currentTime}</div>
          <div className="flex space-x-6">
            <NavLink href="/login" label="Login" />
            <NavLink href="/booking" label="Book Ticket" />
            <NavLink href="/trains" label="Train List" />
            <NavLink href="/tracking" label="Track Train" />
          </div>
        </nav>

        {/* Login/Sign-Up Form */}
        <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6 pt-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md"
          >
            <h2 className="text-2xl font-bold text-center text-gray-900">
              {isLogin ? "Login" : "Sign Up"}
            </h2>
            <p className="text-gray-600 text-center mt-2">
              {isLogin ? "Access your account" : "Create a new account"}
            </p>

            <form className="mt-6">
              {!isLogin && (
                <>
                  <label className="block mb-2 text-gray-700 font-semibold">Full Name</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black" required />
                </>
              )}

              <label className="block mb-2 text-gray-700 font-semibold">Email</label>
              <input type="email" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black" required />

              <label className="block mt-4 mb-2 text-gray-700 font-semibold">Password</label>
              <input type="password" className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black" required />

              <button className="w-full bg-blue-600 text-white py-3 mt-6 rounded-lg hover:bg-blue-700 transition">
                {isLogin ? "Login" : "Sign Up"}
              </button>
            </form>

            <p className="text-center text-gray-600 mt-4">
              {isLogin ? "Don't have an account?" : "Already have an account?"} {" "}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-600 hover:underline font-semibold"
              >
                {isLogin ? "Sign Up" : "Login"}
              </button>
            </p>
          </motion.div>
        </section>
        <div className="relative w-full overflow-hidden bg-gray-100 py-10">
      <motion.div
        className="absolute w-full flex"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
        style={{ bottom: "0px" }}
      >
        <Image src={train} alt="Moving Train" width={1600} height={100} />
      </motion.div>
    </div>
        <section className="py-8 px-6 bg-gradient-to-r from-blue-600 to-indigo-900 text-white text-center">
  <h2 className="text-3xl font-bold">Stay Connected</h2>
  <p className="text-gray-300 mt-2">Get the latest updates and offers from IRCTC Modern</p>
  <div className="mt-4 flex justify-center">
    <input 
      type="email" 
      placeholder="Enter your email" 
      className="p-2 w-64 bg-white rounded-l-md text-gray-900 focus:outline-none" 
    />
    <button className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-r-md font-bold hover:bg-yellow-500 transition">
      Subscribe
    </button>
  </div>
  <div className="mt-6">
    <h3 className="font-semibold text-lg">Navigation</h3>
    <ul className="flex justify-center space-x-4 mt-2">
      <li><Link href="/" className="hover:underline">Home</Link></li>
      <li><Link href="/login" className="hover:underline">Login</Link></li>
      <li><Link href="/booking" className="hover:underline">Book a Ticket</Link></li>
      <li><Link href="/trains" className="hover:underline">Train List</Link></li>
    </ul>
  </div>
</section>

        <footer className="p-6 bg-gray-800 text-gray-200 text-center">
          <p>&copy; 2024 IRCTC Modern. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}

const NavLink = ({ href, label }: { href: string; label: string }) => (
  <Link href={href} className="hover:underline transition-all px-3 py-2 rounded-md text-white hover:bg-gray-700">
    {label}
  </Link>
);

const NavItem = ({ label, icon, href, sidebarOpen }: { label: string; icon: any; href: string; sidebarOpen: boolean }) => (
  <Link href={href} className="flex items-center space-x-2 py-3 px-4 w-full hover:bg-gray-700 rounded transition">
    <FontAwesomeIcon icon={icon} className="text-lg" />
    {sidebarOpen && <span>{label}</span>}
  </Link>
);

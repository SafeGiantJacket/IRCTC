"use client"; // Ensures client-side rendering

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars, faTimes, faTrain,faMapMarkerAlt, faTicketAlt, faSignInAlt, faList
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import train from "./htrain.webp";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export default function TrainList() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("time");
  const [trains] = useState([
    { name: "Rajdhani Express", departure: "08:30 AM", price: "₹1,500", duration: "6h 45m" },
    { name: "Shatabdi Express", departure: "10:00 AM", price: "₹1,200", duration: "5h 30m" },
    { name: "Duronto Express", departure: "07:15 AM", price: "₹1,800", duration: "7h 10m" },
    { name: "Garib Rath", departure: "09:45 AM", price: "₹900", duration: "8h 15m" }
  ]);

  useEffect(() => {
    const updateClock = () => {
      setCurrentTime(new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }));
    };
    updateClock();
    const clockInterval = setInterval(updateClock, 1000);
    return () => clearInterval(clockInterval);
  }, []);

  // Filtering trains based on search
  const filteredTrains = trains.filter(train =>
    train.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sorting logic
  const sortedTrains = [...filteredTrains].sort((a, b) => {
    if (sortBy === "time") return a.departure.localeCompare(b.departure);
    if (sortBy === "price") return parseInt(a.price.replace("₹", "")) - parseInt(b.price.replace("₹", ""));
    if (sortBy === "duration") return a.duration.localeCompare(b.duration);
    return 0;
  });

  return (
    <main className="flex">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: sidebarOpen ? 250 : 80 }}
        className="fixed top-0 left-0 h-full bg-gray-900 text-white p-4 flex flex-col items-center transition-all duration-300 shadow-lg"
      >
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="mb-6 text-2xl">
          <FontAwesomeIcon icon={sidebarOpen ? faTimes : faBars} />
        </button>

        <NavItem icon={faTrain} label="Home" href="/" sidebarOpen={sidebarOpen} />
        <NavItem icon={faSignInAlt} label="Login" href="/login" sidebarOpen={sidebarOpen} />
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

        {/* 🚆 Train List Section */}
        <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6 pt-24">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-10 rounded-lg shadow-lg w-full max-w-3xl"
          >
            <h2 className="text-2xl font-bold text-center text-gray-900">Train List</h2>
            <p className="text-gray-600 text-center mt-2">Find your train easily with filters & sorting.</p>

            {/* 🔍 Search & Filter Options */}
            <div className="mt-6 flex space-x-4">
              <input
                type="text"
                placeholder="Search by train name..."
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-black"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-black"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="time">Sort by Time</option>
                <option value="price">Sort by Price</option>
                <option value="duration">Sort by Duration</option>
              </select>
            </div>

            {/* 🚆 Train List */}
            <div className="mt-6 space-y-4">
              {sortedTrains.length > 0 ? (
                sortedTrains.map((train, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="border p-4 rounded-md bg-gray-50 shadow-sm hover:shadow-lg transition"
                  >
                    <h3 className="text-lg font-bold text-gray-900">{train.name}</h3>
                    <p className="text-gray-600">Departure: {train.departure}</p>
                    <p className="text-blue-700 font-bold">Price: {train.price}</p>
                    <p className="text-gray-500">Duration: {train.duration}</p>
                  </motion.div>
                ))
              ) : (
                <p className="text-gray-600 text-center">No trains found.</p>
              )}
            </div>
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
        {/* Footer */}
        <footer className="p-6 bg-gray-800 text-gray-200 text-center">
          <p>&copy; 2024 IRCTC Modern. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}

const NavItem = ({ label, icon, href, sidebarOpen }: { label: string; icon: IconDefinition; href: string; sidebarOpen: boolean }) => (
  <Link href={href} className="flex items-center space-x-2 py-3 px-4 w-full hover:bg-gray-700 rounded transition">
    <FontAwesomeIcon icon={icon} className="text-lg" />
    {sidebarOpen && <span>{label}</span>}
  </Link>
);
interface NavLinkProps {
  href: string;
  label: string;
}

const NavLink: React.FC<NavLinkProps> = ({ href, label }) => (
  <motion.div whileHover={{ scale: 1.1 }}>
    <Link href={href} className="hover:underline transition-all px-3 py-2 rounded-md text-white hover:bg-gray-700">
      {label}
    </Link>
  </motion.div>
);

"use client"; // Ensures this is a client-side component

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faTrain, faCalendarAlt, faSearch, faEdit, faMapMarkerAlt, faTicketAlt, faSignInAlt, faList } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import train from "./htrain.webp"

export default function Booking() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<string | null>(null);
  const [fromStation, setFromStation] = useState(""); // Default empty
  const [toStation, setToStation] = useState(""); // Default empty
  const [journeyDate, setJourneyDate] = useState(""); // Default empty
  const [selectedClass, setSelectedClass] = useState("All Classes");
  const [searchResults, setSearchResults] = useState(false); // Toggle train results

  useEffect(() => {
    // Only update time on the client to prevent hydration error
    const updateClock = () => {
      setCurrentTime(new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }));
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
        {/* ✅ Fixed Top Navigation Alignment */}
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

        {/* Train Booking Form or Train List */}
        {!searchResults ? (
          <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-6 pt-24">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-10 rounded-lg shadow-lg w-full max-w-3xl"
            >
              <h2 className="text-2xl font-bold text-center text-gray-900">Book Your Train Ticket</h2>
              <p className="text-gray-600 text-center mt-2">Find and book tickets in just a few clicks.</p>

              <form className="mt-6">
                <label className="block mb-2 text-gray-700 font-semibold">From Station</label>
                <input
                  type="text"
                  placeholder="Enter departure station"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  value={fromStation}
                  onChange={(e) => setFromStation(e.target.value)}
                  required
                />

                <label className="block mt-4 mb-2 text-gray-700 font-semibold">To Station</label>
                <input
                  type="text"
                  placeholder="Enter destination station"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  value={toStation}
                  onChange={(e) => setToStation(e.target.value)}
                  required
                />

                <label className="block mt-4 mb-2 text-gray-700 font-semibold">Journey Date</label>
                <input
                  type="date"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  value={journeyDate}
                  onChange={(e) => setJourneyDate(e.target.value)}
                  required
                />

                <label className="block mt-4 mb-2 text-gray-700 font-semibold">Class</label>
                <select
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                >
                  <option>All Classes</option>
                  <option>Sleeper Class</option>
                  <option>AC 3-Tier</option>
                  <option>AC 2-Tier</option>
                  <option>Executive Class</option>
                </select>

                <button
                  type="button"
                  className="w-full bg-blue-600 text-white py-3 mt-6 rounded-lg hover:bg-blue-700 transition"
                  onClick={() => setSearchResults(true)}
                >
                  <FontAwesomeIcon icon={faSearch} className="mr-2" /> Search Trains
                </button>
              </form>
            </motion.div>
          </section>
        ) : (
          <section className="flex flex-col items-center min-h-screen bg-gray-100 px-6 pt-24">
            <motion.div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-3xl">
              <h2 className="text-2xl font-bold text-gray-900">2 Trains Found</h2>

              {/* Train List */}
              <div className="mt-6 space-y-4">
                <TrainDetails name="Rajdhani Express" time="08:30 AM" price="₹1,500" />
                <TrainDetails name="Shatabdi Express" time="10:00 AM" price="₹1,200" />
              </div>

              {/* Modify Search */}
              <button
                className="w-full bg-yellow-500 text-white py-3 mt-6 rounded-lg hover:bg-yellow-600 transition"
                onClick={() => setSearchResults(false)}
              >
                <FontAwesomeIcon icon={faEdit} className="mr-2" /> Modify Search
              </button>
            </motion.div>
          </section>
        )}
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

/* ✅ Train Details Component (Darker Train Names) */
const TrainDetails = ({ name, time, price }: { name: string; time: string; price: string }) => (
  <div className="border p-4 rounded-md bg-gray-50 shadow-sm">
    <h3 className="text-lg font-bold text-gray-900">{name}</h3> {/* Darkened */}
    <p className="text-gray-600">Departure: {time}</p>
    <p className="text-blue-700 font-bold">Price: {price}</p>
  </div>
);

/* ✅ Sidebar Navigation Item */
const NavItem = ({ label, icon, href, sidebarOpen }: { label: string; icon: any; href: string; sidebarOpen: boolean }) => (
  <Link href={href} className="flex items-center space-x-2 py-3 px-4 w-full hover:bg-gray-700 rounded transition">
    <FontAwesomeIcon icon={icon} className="text-lg" />
    {sidebarOpen && <span>{label}</span>}
  </Link>
);

const NavLink = ({ href, label }: { href: string; label: string }) => (
  <Link href={href} className="hover:underline transition-all px-3 py-2 rounded-md text-white hover:bg-gray-700">
    {label}
  </Link>
);


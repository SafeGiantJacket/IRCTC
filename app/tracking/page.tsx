"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faTrain, faTicketAlt, faList, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import map from './map.png';
import Image from "next/image";
import train from "./htrain.webp"
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export default function TrackTrain() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<string | null>(null);
  const [trainNumber, setTrainNumber] = useState("12002");
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    const updateClock = () => {
      setCurrentTime(new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }));
    };
    updateClock();
    const clockInterval = setInterval(updateClock, 1000);
    return () => clearInterval(clockInterval);
  }, []);

  const trainData = {
    number: "12002",
    name: "SHATABDI EXPRESS",
    startDate: "21-Mar-2025",
    status: "Yet to start from its source",
    route: [
      { station: "NEW DELHI", code: "NDLS", arrival: "SRC", departure: "06:00", distance: "0 KM", platform: "1" },
      { station: "MATHURA JN", code: "MTJ", arrival: "07:20", departure: "07:50", distance: "141 KM", platform: "1" },
      { station: "AGRA CANTT", code: "AGC", arrival: "07:55", departure: "08:39", distance: "194 KM", platform: "1" },
      { station: "DHAULPUR", code: "DHO", arrival: "08:40", departure: "08:57", distance: "246 KM", platform: "2" },
      { station: "GWALIOR JN", code: "GWL", arrival: "09:28", departure: "10:45", distance: "312 KM", platform: "1" },
      { station: "BHOPAL JN", code: "BPL", arrival: "14:15", departure: "14:40", distance: "701 KM", platform: "1" },
      { station: "RANI KAMALAPATI", code: "RKMP", arrival: "14:40", departure: "DSTN", distance: "707 KM", platform: "1" },
    ],
  };

  return (
    <main className="flex bg-gray-100 min-h-screen">
      {/* Sidebar (Dark) */}
      <motion.aside
        animate={{ width: sidebarOpen ? 250 : 80 }}
        className="fixed top-0 left-0 h-full bg-gray-900 text-white p-4 flex flex-col items-center transition-all duration-300 shadow-lg z-50"
      >
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="mb-6 text-2xl text-white">
          <FontAwesomeIcon icon={sidebarOpen ? faTimes : faBars} />
        </button>
        <NavItem icon={faTrain} label="Home" href="/" sidebarOpen={sidebarOpen} />
        <NavItem icon={faTicketAlt} label="Booking" href="/booking" sidebarOpen={sidebarOpen} />
        <NavItem icon={faList} label="Train List" href="/trains" sidebarOpen={sidebarOpen} />
        <NavItem icon={faMapMarkerAlt} label="Track Train" href="/tracking" sidebarOpen={sidebarOpen} />
      </motion.aside>

      <div className="w-full transition-all" style={{ marginLeft: sidebarOpen ? "250px" : "80px" }}>
        {/* Navbar (Dark) */}
        <nav className="fixed top-0 h-16 bg-gray-800 text-white flex justify-between items-center p-4 px-6 shadow-md w-full z-50">
          <h2 className="text-lg font-bold">IRCTC Modern</h2>
          <div className="text-sm font-semibold">{currentTime}</div>
          <div className="flex space-x-6">
            <NavLink href="/login" label="Login" />
            <NavLink href="/booking" label="Book Ticket" />
            <NavLink href="/trains" label="Train List" />
            <NavLink href="/tracking" label="Track Train" />
          </div>
        </nav>

        {/* Train Tracking Section */}
        <section className="flex flex-col items-center justify-center pt-24 px-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl"
          >
            <h2 className="text-2xl font-bold text-center text-gray-900">Spot Your Train</h2>

            {/* Search Input */}
            <input
              type="text"
              placeholder="Enter Train No..."
              className="w-full p-3 border border-gray-300 rounded-lg mt-4 text-gray-800 focus:ring-2 focus:ring-blue-500"
              value={trainNumber}
              onChange={(e) => setTrainNumber(e.target.value)}
            />

            {/* Train Details */}
            <div className="mt-6 text-center">
              <h3 className="text-xl font-bold text-gray-900">{trainData.name} ({trainData.number})</h3>
              <p className="text-gray-800">Start Date: {trainData.startDate}</p>
              <p className="text-gray-800">Status: {trainData.status}</p>
            </div>

            {/* Show Bhuvan Map Button */}
            <div className="text-center mt-6">
              <button
                className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition"
                onClick={() => setShowMap(!showMap)}
              >
                {showMap ? "Hide Bhuvan Map" : "Show Bhuvan Map"}
              </button>
            </div>

            {/* Map Section (Optional) */}
            {showMap && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="mt-6">
                <Image src={map} alt="Bhuvan Map" width={600} height={256} className="w-full h-64 border rounded-lg object-cover" />
              </motion.div>
            )}

            {/* Journey Station Basis Table */}
            <h3 className="text-lg font-bold mt-8 mb-2 text-center text-blue-600">Journey Station Basis</h3>
            <div className="overflow-hidden rounded-lg">
              <table className="w-full border border-gray-300">
                <thead>
                  <tr className="bg-blue-100 text-gray-900">
                    <th className="p-3 border border-gray-300">Station</th>
                    <th className="p-3 border border-gray-300">Arrival</th>
                    <th className="p-3 border border-gray-300">Departure</th>
                    <th className="p-3 border border-gray-300">Distance</th>
                    <th className="p-3 border border-gray-300">Platform</th>
                  </tr>
                </thead>
                <tbody>
                  {trainData.route.map((station, index) => (
                    <tr key={index} className="border-t border-gray-300 hover:bg-blue-50">
                      <td className="p-3 text-gray-900">{station.station} ({station.code})</td>
                      <td className="p-3 text-gray-900">{station.arrival}</td>
                      <td className="p-3 text-gray-900">{station.departure}</td>
                      <td className="p-3 text-gray-900">{station.distance}</td>
                      <td className="p-3 text-gray-900">{station.platform}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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

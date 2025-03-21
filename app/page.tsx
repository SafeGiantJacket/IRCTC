"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faTrain, faSignInAlt, faTicketAlt, faList, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import train from "./htrain.webp"

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);

    const updateClock = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }));
    };
    const clockInterval = setInterval(updateClock, 1000);
    updateClock();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(clockInterval);
    };
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

      <div
        className={`w-full transition-all duration-300 ${
          sidebarOpen ? "ml-[250px] w-[calc(100%-250px)]" : "ml-[80px] w-[calc(100%-80px)]"
        }`}
      >
        {/* Top Navigation with Live Time */}
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


        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center text-center bg-gradient-to-r from-blue-600 to-indigo-900 text-white py-28 px-6">
          <motion.h2 className="text-5xl font-bold max-w-3xl">
            Book <span className="text-yellow-400">Trains</span> in Seconds & Track Live
          </motion.h2>
          <motion.p className="text-lg mt-4 max-w-2xl">
            Plan your journey with ease using our intuitive booking system and track trains live in real-time. Say goodbye to long queues and delays!
          </motion.p>

          <motion.div className="mt-12 w-full" whileHover={{ scale: 1.02 }}>
             <Image src="/images/HI.png" alt="Train Booking" width={1400} height={400} className="rounded-lg shadow-lg w-full" />
          </motion.div>

        </section>

        {/* Why Choose IRCTC? */}
        <Section title="Why Choose IRCTC?" subtitle="Fast, reliable, and user-friendly railway services.">
          <FeatureBox title="Seamless Booking" description="Book train tickets instantly without any hassle." img="/images/BT.png" />
          <FeatureBox title="Live Tracking" description="Get real-time train locations and updates on the go." img="/images/TT.png" />
          <FeatureBox title="Secure Payments" description="We ensure safe and encrypted transactions for your convenience." img="/images/SP.png" />
        </Section>

        {/* AD Section */}
        <section className="w-full flex justify-center py-10 bg-gray-100">
          <Image src="/images/AD.png" alt="Advertisement" width={1300} height={250} className="rounded-lg shadow-md w-full max-w-screen-lg" />
        </section>

        {/* Ticket Packages */}
        <Section title="Select Your Class" subtitle="Choose the best travel option for your journey.">
          <PackageBox title="Sleeper Class" price="₹400" img="/images/SC.png" />
          <PackageBox title="AC 3-Tier" price="₹1,200" img="/images/AC3.png" />
          <PackageBox title="AC 2-Tier" price="₹1,800" img="/images/AC2.png" />
          <PackageBox title="Executive Class" price="₹3,500" img="/images/EC.png" />
        </Section>
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

const NavItem = ({ label, icon, href, sidebarOpen }: { label: string; icon: any; href: string; sidebarOpen: boolean }) => (
  <Link href={href} className="flex items-center space-x-2 py-3 px-4 w-full hover:bg-gray-700 rounded transition">
    <FontAwesomeIcon icon={icon} className="text-lg" />
    {sidebarOpen && <span>{label}</span>}
  </Link>
);

interface FeatureBoxProps {
  title: string;
  description: string;
  img: string;
}

const FeatureBox: React.FC<FeatureBoxProps> = ({ title, description, img }) => (
  <motion.div 
    whileHover={{ scale: 1.05, rotate: 1 }} 
    className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all flex flex-col items-center min-w-[250px] max-w-[320px] w-full"
  >
    <Image src={img} alt={title} width={300} height={200} className="rounded-md" />
    <h3 className="text-xl font-bold text-gray-900 mt-4">{title}</h3>
    <p className="text-gray-700 mt-2">{description}</p>
  </motion.div>
);

interface PackageBoxProps {
  title: string;
  price: string;
  img: string;
}

const PackageBox: React.FC<PackageBoxProps> = ({ title, price, img }) => (
  <motion.div 
    whileHover={{ scale: 1.05, rotate: 1 }} 
    className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-all flex flex-col items-center min-w-[250px] max-w-[320px] w-full"
  >
    <Image src={img} alt={title} width={300} height={200} className="rounded-md" />
    <h3 className="text-xl font-bold text-gray-900 mt-4">{title}</h3>
    <p className="text-blue-700 font-bold text-lg mt-2">{price}</p>
  </motion.div>
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


const Section = ({ title, subtitle = "", children }: { title: string; subtitle?: string; children: React.ReactNode }) => (
  <section className="py-16 px-6 text-center bg-gray-100">
    <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
    {subtitle && <p className="text-gray-700 mt-4">{subtitle}</p>}
    <div className="flex flex-wrap justify-center gap-x-6 gap-y-10 mt-10">
      {children}
    </div>
  </section>
);




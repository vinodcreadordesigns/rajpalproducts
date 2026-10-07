import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import CartDrawer from "../components/CartDrawer";
import FloatingWhatsApp from "../components/FloatingWhatsApp";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Topbar from "../components/Topbar";
import WebsiteLoader from "../components/WebsiteLoader";

const MainLayout = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-obsidian text-cream">
      {loading && <WebsiteLoader />}
      <Topbar />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <CartDrawer />
    </div>
  );
};

export default MainLayout;

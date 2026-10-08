import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import About from "../pages/About";
import Categories from "../pages/Categories";
import Contact from "../pages/Contact";
import Catalogue from "../pages/Catalogue";
import Home from "../pages/Home";
import Services from "../pages/Services";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import ReturnExchangePolicy from "../pages/ReturnExchangePolicy";
import DhupCupspage from "../pages/categories/DhupCupspage";
import DhoopSticksPage from "../pages/categories/DhoopSticksPage";
import IncenseSticksPage from "../pages/categories/IncenseSticksPage";
import KhadiSoapsPage from "../pages/categories/KhadiSoapsPage";
import LongSticksPage from "../pages/categories/LongSticksPage";
import PerfumedIncensePage from "../pages/categories/PerfumedIncensePage";
import PoojaDeepPage from "../pages/categories/PoojaDeepPage";
import NaturalInsencePage from "../pages/categories/NaturalInsencePage";
import PerfumeRollonPage from "../pages/categories/PerfumeRollonPage";
import AirFresheners from "../pages/categories/AirFresheners";
import RawDhoop from "../pages/categories/RawDhoop";

const AppRoutes = () => (
  <Routes>
    <Route element={<MainLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/catalogue" element={<Catalogue />} />
      <Route path="/services" element={<Services />} />

      {/* Policy pages */}
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/return-exchange-policy" element={<ReturnExchangePolicy />} />

      <Route path="/categories/incense-sticks" element={<IncenseSticksPage />} />
      <Route path="/categories/dhoop-sticks" element={<DhoopSticksPage />} />
      <Route path="/categories/natural-incense" element={<NaturalInsencePage />} />
      <Route path="/categories/perfumed-incense" element={<PerfumedIncensePage />} />
      <Route path="/categories/Dhup-cups" element={<DhupCupspage />} />
      <Route path="/categories/pooja-deep" element={<PoojaDeepPage />} />
      <Route path="/categories/khadi-soaps" element={<KhadiSoapsPage />} />
      <Route path="/categories/long-sticks" element={<LongSticksPage />} />
      <Route path="/categories/perfume-rollon" element={<PerfumeRollonPage />} />
      <Route path="/categories/air-fresheners" element={<AirFresheners />} />
      <Route path="/categories/raw-dhoop" element={<RawDhoop />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
  </Routes>
);

export default AppRoutes;
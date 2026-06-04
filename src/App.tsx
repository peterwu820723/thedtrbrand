import { Route, Routes } from "react-router-dom";

import { Layout } from "@/components/layout/Layout";
import { HomePage } from "@/pages/HomePage";
import { ShopPage } from "@/pages/ShopPage";
import { ProductPage } from "@/pages/ProductPage";
import { CartPage } from "@/pages/CartPage";
import { CheckoutPage } from "@/pages/CheckoutPage";
import { OrderConfirmationPage } from "@/pages/OrderConfirmationPage";
import { AboutPage } from "@/pages/AboutPage";
import { MusicPage } from "@/pages/MusicPage";
import { TourPage } from "@/pages/TourPage";
import { ContactPage } from "@/pages/ContactPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { LegalLayout } from "@/pages/legal/LegalLayout";
import { PrivacyPage } from "@/pages/legal/PrivacyPage";
import { TermsPage } from "@/pages/legal/TermsPage";
import { ShippingPolicyPage } from "@/pages/legal/ShippingPolicyPage";
import { ReturnsPolicyPage } from "@/pages/legal/ReturnsPolicyPage";
import ApiPlaygroundPage from "@/pages/ApiPlaygroundPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="shop" element={<ShopPage />} />
        <Route path="shop/:collectionSlug" element={<ShopPage />} />
        <Route path="product/:productSlug" element={<ProductPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="order/:orderId" element={<OrderConfirmationPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="music" element={<MusicPage />} />
        <Route path="tour" element={<TourPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="legal" element={<LegalLayout />}>
          <Route path="privacy" element={<PrivacyPage />} />
          <Route path="terms" element={<TermsPage />} />
          <Route path="shipping" element={<ShippingPolicyPage />} />
          <Route path="returns" element={<ReturnsPolicyPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
      <Route path="/__api" element={<ApiPlaygroundPage />} />
    </Routes>
  );
}

import { Outlet } from "react-router-dom";
import { TopNav } from "./TopNav";
import { Footer } from "./Footer";
import { CartDrawer } from "./CartDrawer";
import { MobileMenu } from "./MobileMenu";
import { Toast } from "./Toast";
import { useScrollRestoration } from "@/hooks/useScrollRestoration";

export function Layout() {
  useScrollRestoration();
  return (
    <div className="min-h-screen flex flex-col">
      <TopNav />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <MobileMenu />
      <Toast />
    </div>
  );
}

"use client";
import { usePathname } from "next/navigation";
import Header from "./Landing/Header";
import Footer from "./Landing/Footer";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      {!isDashboard && <Header />}

      <main style={{ flex: 1 }}>{children}</main>

      {!isDashboard && <Footer />}
    </div>
  );
}

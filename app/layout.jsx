import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";
import Providers from "./providers"; // client-side wrapper
import Head from 'next/head';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

<Head>
  <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
</Head>
 
export const metadata = {
  title: "TopPlaced",
  description: "Ace your interviews with confidence",
};
 
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
      className={inter.className}
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          margin: 0,
        }}
      >
        <Providers>
          <LayoutWrapper>{children}</LayoutWrapper>
        </Providers>
      </body>
    </html>
  );
}
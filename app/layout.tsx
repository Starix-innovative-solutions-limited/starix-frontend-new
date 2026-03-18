import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ModalProvider } from "@/components/GlobalModal";
import Providers from "@/utils/Providers";
import { Toaster } from "react-hot-toast";
import "./globals.css";

// Configure Geist with the specific weights used in your design
const geistSans = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // 400=Regular, 500=Medium, 600=Semibold, 700=Bold
  variable: "--font-geist",             // Matches the variable in your globals.css
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Starix",
  description: "Starix — creator marketing platform",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        <main className="bg-bluelayer min-h-screen">
          <Providers>
            <ModalProvider>
              {children}
              <Toaster position="top-right" />
            </ModalProvider>
          </Providers>
        </main>
      </body>
    </html>
  );
}
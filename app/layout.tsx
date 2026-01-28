import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ModalProvider } from "@/components/GlobalModal";
import Providers from "@/utils/Providers";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
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
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
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

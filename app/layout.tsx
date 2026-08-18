// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import { ModalProvider } from "@/components/GlobalModal";
// import Providers from "@/utils/Providers";
// import GlobalPreloader from "@/components/GlobalPreloader"; // Imported the asset preloader
// import { Toaster } from "react-hot-toast";
// import "./globals.css";

// // Configure Geist with the specific weights used in your design
// const geistSans = Geist({
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700"], // 400=Regular, 500=Medium, 600=Semibold, 700=Bold
//   variable: "--font-geist",             // Matches the variable in your globals.css
//   display: "swap",
// });

// const geistMono = Geist_Mono({
//   subsets: ["latin"],
//   variable: "--font-geist-mono",
//   display: "swap",
// });

// export const metadata: Metadata = {
//   title: "Starix",
//   description: "Starix — creator marketing platform",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{ children: React.ReactNode }>) {
//   return (
//     <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
//       <body className="antialiased font-sans">
        
//         {/* MOBILE BLOCKER SCREEN (Hidden on md screens / iPads which start at 768px wide) */}
//         <div className="flex md:hidden fixed inset-0 z-[9999] flex-col items-center justify-center bg-[#1E1F24] p-8 text-center text-white select-none">
//           <div className="mb-6 rounded-2xl bg-[#0033FF]/10 p-4 text-[#245BFF]">
//             {/* Desktop / Tablet Device Graphic Asset or Icon */}
//             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
//               <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5h3m-6.75 3h10.5a2.25 2.25 0 0 0 2.25-2.25V4.5a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 4.5v15a2.25 2.25 0 0 0 2.25 2.25Z" />
//             </svg>
//           </div>
//           <h1 className="text-[22px] font-bold tracking-tight mb-2">Tablet or Desktop Only</h1>
//           <p className="text-gray-400 text-[14px] max-w-[280px] leading-relaxed">
//             Starix is best experienced on an iPad, tablet, or laptop device screen. Please upscale your window or switch devices to continue.
//           </p>
//         </div>

//         {/* APPLICATION BODY (Hidden completely under 768px to block background access) */}
//         <main className="hidden md:block bg-bluelayer min-h-screen">
//           <Providers>
//             <ModalProvider>
//               <GlobalPreloader>
//                 {children}
//               </GlobalPreloader>
//               <Toaster position="top-right" />
//             </ModalProvider>
//           </Providers>
//         </main>

//       </body>
//     </html>
//   );
// }


import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { ModalProvider } from "@/components/GlobalModal";
import Providers from "@/utils/Providers";
import GlobalPreloader from "@/components/GlobalPreloader";
import { Toaster } from "react-hot-toast";

import "./globals.css";

// Configure Geist with the specific weights used in your design
const geistSans = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-geist",
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
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="antialiased font-sans">
        <main className="bg-bluelayer min-h-screen">
          <Providers>
            <ModalProvider>
              <GlobalPreloader>{children}</GlobalPreloader>
              <Toaster position="top-right" />
            </ModalProvider>
          </Providers>
        </main>
      </body>
    </html>
  );
}
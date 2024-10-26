import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Note App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased grid grid-rows-[20px_1fr_20px]  min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
      >
        <Toaster
          position="top-center"
          toastOptions={{ style: { fontSize: "1.6rem" } }}
        />
        <Header />
        <main className="flex flex-col gap-8 row-start-2 items-center">
          {children}
        </main>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
          <Footer />
        </footer>
      </body>
    </html>
  );
}

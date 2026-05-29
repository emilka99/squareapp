import type { Metadata } from "next";
import { Lato } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Nav from "@/components/Nav";
import Breadcrumb from "@/components/Breadcrumb";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

const lato = Lato({
  subsets: ["latin", "latin-ext"],
  variable: "--font-lato",
  display: "swap",
  weight: ["100", "300", "400"],
});

const theinhardt = localFont({
  src: "../../public/fonts/Theinhardt-Regular.otf",
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Squarestate",
  description: "Premium real estate & investment advisory",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={`${lato.variable} ${theinhardt.variable}`}>
      <body className="bg-bg text-ink antialiased font-sans">
        <Nav />
        <Breadcrumb />
        <PageTransition>{children}</PageTransition>
        <Footer />
      </body>
    </html>
  );
}

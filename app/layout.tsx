import type { Metadata } from "next";
import { Nunito, Caveat } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-sans",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-accent",
});

export const metadata: Metadata = {
  title: "QuadWear - Hand-drawn tees for your major",
  description: "Choose your university → pick your major → wear it. Hand-drawn t-shirts designed for students.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${nunito.variable} ${caveat.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Nav />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

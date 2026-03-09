import type { Metadata } from "next";
import { Cabin_Sketch, Kalam } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const cabinSketch = Cabin_Sketch({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-heading",
});

const kalam = Kalam({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-body",
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
    <html lang="en" className={`${cabinSketch.variable} ${kalam.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Nav />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

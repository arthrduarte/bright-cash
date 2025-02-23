import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

console.log("Inter font loaded:", inter.className); // Debug log

export const metadata: Metadata = {
  title: "Bright Cash - Financial Tracker",
  description: "Track your finances with ease",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  console.log("Rendering layout with classes:", {
    bodyClasses: inter.className,
    mainClasses: "min-h-screen bg-background"
  }); // Debug log
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen bg-background">
          {children}
        </main>
      </body>
    </html>
  );
}

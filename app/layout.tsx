
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import BackgroundParticles from "./components/backgroundParticles";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WeatherLens - Dashboard del Clima",
  description: "Consulta el clima en tiempo real con visualizaciones interactivas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-blue-900 to-gray-900 text-white flex items-center justify-center min-h-screen relative`}
      >
        {/* Fondo animado */}
        <BackgroundParticles />

        <div className="w-full max-w-6xl z-10">{children}</div>
      </body>
    </html>
  );
}

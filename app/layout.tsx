import type { Metadata } from "next";
import { Comfortaa } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const comfortaa = Comfortaa({
  variable: "--font-comfortaa",
  subsets: ["latin"],
});

const sf_pro_text = localFont({
  src: [
    {
      path: "../public/fonts/SF-Pro-Text-Black.otf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../public/fonts/SF-Pro-Text-BlackItalic.otf",
      weight: "900",
      style: "italic",
    },
    {
      path: "../public/fonts/SF-Pro-Text-Heavy.otf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/SF-Pro-Text-HeavyItalic.otf",
      weight: "800",
      style: "italic",
    },
    {
      path: "../public/fonts/SF-Pro-Text-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/SF-Pro-Text-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../public/fonts/SF-Pro-Text-Semibold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/SF-Pro-Text-SemiboldItalic.otf",
      weight: "600",
      style: "italic",
    },
    {
      path: "../public/fonts/SF-Pro-Text-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/SF-Pro-Text-MediumItalic.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/fonts/SF-Pro-Text-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/SF-Pro-Text-RegularItalic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/SF-Pro-Text-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/SF-Pro-Text-LightItalic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/fonts/SF-Pro-Text-Thin.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/fonts/SF-Pro-Text-Thin.otf",
      weight: "200",
      style: "italic",
    },
    {
      path: "../public/fonts/SF-Pro-Text-Ultralight.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/SF-Pro-Text-UltralightItalic.otf",
      weight: "100",
      style: "italic",
    },
  ],
  variable: "--font-sf-pro-text",
});

export const metadata: Metadata = {
  title: "Aethery",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${comfortaa.variable} ${sf_pro_text.variable} relative antialiased`}
      >
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

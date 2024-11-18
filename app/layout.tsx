import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const workSans = localFont({
  src: [
    {
      path: "./fonts/workSans-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "./fonts/workSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/workSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/workSans-Thin.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/workSans-ExtraLight.ttf",
      weight: "100",
      style: "normal",
    },
  ],
  variable: "--font-work-sans",
});

export const metadata: Metadata = {
  title: "Starthub",
  description: "Pitch, vote and grow with Starthub",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={workSans.variable}>{children}</body>
    </html>
  );
}

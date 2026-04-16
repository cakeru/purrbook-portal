import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  variable: "--font-plus-jakarta-sans",
});

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-be-vietnam-pro",
});

export const metadata: Metadata = {
  title: "PurrBook Portal | Provider Dashboard",
  description: "Manage your bookings, services, and team with PurrBook.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body
        className={`${plusJakartaSans.variable} ${beVietnamPro.variable} bg-background text-on-surface font-body selection:bg-primary-container selection:text-on-primary-container`}
        style={
          {
            "--font-headline": "var(--font-plus-jakarta-sans)",
            "--font-body": "var(--font-be-vietnam-pro)",
            "--font-label": "var(--font-plus-jakarta-sans)",
          } as React.CSSProperties
        }
      >
        {children}
      </body>
    </html>
  );
}

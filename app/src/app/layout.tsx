import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/auth/AuthContext";
import { configureAmplify } from "@/lib/amplifyConfig";

// Configure Amplify on the client side
if (typeof window !== 'undefined') {
  configureAmplify();
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fairwinds RV App",
  description: "Manage your RV maintenance and records",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#F5E6D3]`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

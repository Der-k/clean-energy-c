import "./globals.css";
import { Inter, Manrope } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import ChatWidget from "@/components/chat/ChatWidget";
import { Analytics } from "@vercel/analytics/next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { RoleProvider } from "@/context/role-context";

export const metadata = {
  title: "Clean Energy Conference",
  description: "Clean Energy Conference Australia Africa",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable}`}
      suppressHydrationWarning
    >
      <body>
        <RoleProvider>
          <Header />

          <main>{children}</main>

          <Footer />

          <ChatWidget />
          <Analytics />
        </RoleProvider>

        <GoogleAnalytics gaId="G-TWSVSS7JT7" />
      </body>
    </html>
  );
}
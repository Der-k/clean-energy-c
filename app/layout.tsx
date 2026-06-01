import "./globals.css";
import { Inter, Manrope } from "next/font/google";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import ChatWidget from "@/components/chat/ChatWidget";
import Script from "next/script";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${manrope.variable} bg-white text-[color:var(--text-main)]-900 antialiased`}
      >
        <Script
          id="viewport-zoom"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                window.addEventListener('resize', function() {
                  var scale = window.innerWidth / 2560 ;
                  document.documentElement.style.zoom = scale.toString();
                });
              })();
            `,
          }}
        />

        <Header />

        <main>{children}</main>

        <Footer />

        {/* Floating AI Chatbot */}
        <ChatWidget />
      </body>
    </html>
  );
}
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "katex/dist/katex.min.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Physics Quest — learn physics by playing",
  description:
    "A free, open learning game: 30 interactive physics lessons with live simulations, guided practice, quizzes, XP and badges. Original content for middle school & early high school. No account, no ads.",
  keywords: ["physics", "learning game", "education", "simulations", "interactive", "free", "open source"],
  authors: [{ name: "Physics Quest contributors" }],
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

/**
 * Applies the saved (or browser) language + direction to <html> BEFORE first paint.
 * Without this, Persian users see a left-to-right flash on every load while React
 * hydrates, which breaks the RTL illusion (mis-aligned text, layout jump).
 * Keep in sync with src/lib/game/i18n.tsx (LOCALE_KEY = 'pq.locale').
 */
const directionBootstrap = `
try {
  var saved = localStorage.getItem('pq.locale');
  var lang = (saved === 'fa' || saved === 'tr' || saved === 'en') ? saved : (navigator.language || 'en').slice(0, 2);
  if (lang !== 'fa' && lang !== 'tr') lang = 'en';
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
} catch (e) {}
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: directionBootstrap }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}

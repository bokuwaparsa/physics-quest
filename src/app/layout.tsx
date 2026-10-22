import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import "katex/dist/katex.min.css";
import { Toaster } from "@/components/ui/toaster";
import { AppDirection } from "@/components/game/app-direction";

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
    "A free, open learning game: 57 interactive physics lessons across 7 worlds with live simulations, guided practice, quizzes, XP and badges. Original content for middle school & early high school. No account, no ads.",
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
  function cookieLocale() {
    var m = document.cookie.match(/(?:^|; )pq.locale=([a-z]{2})/);
    return m ? m[1] : null;
  }
  var saved = localStorage.getItem('pq.locale') || cookieLocale();
  var lang = (saved === 'fa' || saved === 'tr' || saved === 'en') ? saved : (navigator.language || 'en').slice(0, 2);
  if (lang !== 'fa' && lang !== 'tr') lang = 'en';
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
} catch (e) {}
`;

const LOCALES = new Set(["en", "fa", "tr"]);

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Server-side direction: if the visitor already picked a language (cookie),
  // render <html lang dir> correctly in the SSR output itself — RTL no longer
  // depends on any client script running. Skipped during STATIC_EXPORT builds
  // (GitHub Pages): there the pre-paint bootstrap script below sets lang/dir
  // from localStorage → cookie → browser language before the first paint.
  let initial = "en";
  if (process.env.STATIC_EXPORT !== "1") {
    try {
      const cookieLocale = (await cookies()).get("pq.locale")?.value;
      if (cookieLocale && LOCALES.has(cookieLocale)) initial = cookieLocale;
    } catch {
      /* cookies unavailable (e.g. static export) */
    }
  }
  const dir = initial === "fa" ? "rtl" : "ltr";

  return (
    <html lang={initial} dir={dir} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: directionBootstrap }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <AppDirection>
          {children}
          <Toaster />
        </AppDirection>
      </body>
    </html>
  );
}

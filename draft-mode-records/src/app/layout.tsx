import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import "./styles/index.css";
import { Calistoga, IBM_Plex_Sans } from "next/font/google";
import LivePreviewProvider from "./utils/livePreviewProvider";
import { draftMode } from "next/headers";

// Font Families
const calistoga = Calistoga({ weight: "400", subsets: ["latin"] });
const ibmPlex = IBM_Plex_Sans({ weight: ["400", "600"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Draft Mode Records",
  description:
    "A mock record label website for the Content Authoring Accelerator workshop.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled } = await draftMode();
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <Header />
        <main
          className={`min-h-screen px-10 overflow-x-hidden ${ibmPlex.className}`}
        >
          <LivePreviewProvider isEnabled={isEnabled}>
            {children}
          </LivePreviewProvider>
        </main>
        <Footer />
      </body>
    </html>
  );
}

function Header() {
  return (
    <header className="p-10 text-center">
      <div className="flex gap-5 justify-end align-center">
        <Link href="/artist">Artists</Link>
        <Link href="/album">Albums</Link>
        <Link href="#">Spotify</Link>
      </div>
      <h1 className={`${calistoga.className} text-8xl mt-5`}>
        <Link href="/">Draft Mode Records</Link>
      </h1>
    </header>
  );
}

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer
      style={{
        backgroundColor: "#f8f9fa",
        padding: "10px",
        textAlign: "center",
      }}
    >
      <p>&copy; {currentYear} Contentful. All rights reserved.</p>
    </footer>
  );
}

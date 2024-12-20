import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import Image from "next/image";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};


function Sponsor({ src, title }: { src: string; title: string }) {
  return (
    <div>
      <Image
        alt={title}
        height={60}
        src={src}
        width={60}
      />
      <span className="block mx-auto">{title}</span>
    </div>
    )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen">
            <Navbar />
            <main className="container mx-auto max-w-6xl pt-4 px-6 flex-grow">
              {children}
            </main>
            <footer className="w-full flex flex-row items-center justify-center pb-3 pt-12 text-center gap-6">
              <div>
                <p className="text-gray-600">Sponsored by</p>
              </div>
              <div className="flex items-end gap-6">
                <Sponsor src="/sponsors/nsf.png" title="NSF" />
                <Sponsor src="/sponsors/snap.png" title="Snap Inc" />
                <Sponsor src="/sponsors/aws.png" title="AWS" />
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}

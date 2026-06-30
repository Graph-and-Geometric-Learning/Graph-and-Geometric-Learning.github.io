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


function Sponsor({
  src,
  title,
  width,
  height,
}: {
  src: string;
  title: string;
  width: number;
  height: number;
}) {
  return (
    <div>
      {/* Fixed 60px-tall box that centers each logo. Shorter logos (e.g. the
          wide AWS wordmark) sit vertically centered in the same band as the
          square NSF/Snap logos instead of being bottom-aligned. */}
      <div className="flex h-[60px] items-center justify-center">
        <Image
          alt={title}
          height={height}
          src={src}
          width={width}
          // Fit each logo within the 60x60 box (matching the original
          // appearance) while preserving its intrinsic aspect ratio. Both
          // dimensions are `auto` so next/image doesn't warn about one being
          // modified, and the max-* caps keep every logo the same footprint.
          style={{ width: "auto", height: "auto", maxWidth: 60, maxHeight: 60 }}
        />
      </div>
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
                <Sponsor src="/sponsors/nsf.png" title="NSF" width={1090} height={1090} />
                <Sponsor src="/sponsors/snap.png" title="Snap Inc" width={2156} height={2160} />
                <Sponsor src="/sponsors/aws.png" title="AWS" width={2560} height={1533} />
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}

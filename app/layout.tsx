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
                <div>
                  <Image
                    alt="nsf"
                    height={60}
                    src="/sponsors/nsf.png"
                    width={60}
                  />
                  NSF
                </div>
                <div>
                  <Image
                    alt="snap"
                    height={60}
                    src="/sponsors/snap.png"
                    width={60}
                  />
                  Snap Inc
                </div>
                <div>
                  <Image
                    alt="aws"
                    height={60}
                    src="/sponsors/aws.png"
                    width={60}
                  />
                  AWS
                </div>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}

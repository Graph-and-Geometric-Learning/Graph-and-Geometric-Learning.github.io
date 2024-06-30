export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Next.js + NextUI",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "People",
      href: "/people",
    },
    {
      label: "Publications",
      href: "/publications",
    },
    {
      label: "Teaching",
      href: "/teaching",
    },
    {
      label: "Join the Lab",
      href: "/join",
    }
  ],
  links: {
    github: "https://github.com/Graph-and-Geometric-Learning",
    twitter: "https://twitter.com/getnextui",
  },
};

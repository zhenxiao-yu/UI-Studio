import { Work_Sans } from "next/font/google";

import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";

import Room from "./Room";

export const metadata = {
  title: "ui studio",
  description:
    "A minimalist and intuitive UI design web application inspired by Figma, designed to facilitate real-time collaboration and seamless design experiences. Built using Next.js 14, Fabric.js, and Liveblocks, ui-studio empowers designers to create, share, and collaborate on interactive design projects effortlessly.",
};

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  weight: ["400", "600", "700"],
});

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang='en'>
    <body className={`${workSans.className} bg-primary-grey-800`}>
      <Room>
        <TooltipProvider>{children}</TooltipProvider>
      </Room>
    </body>
  </html>
);

export default RootLayout;

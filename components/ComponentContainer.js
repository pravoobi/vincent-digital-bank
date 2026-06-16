import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import Footer from "./Footer";

export default function ComponentContainer({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <nav className="sticky top-0 z-10 flex w-full items-center justify-between px-2 py-1 sm:px-6">
        <Link href="/" aria-label="Vincent Bank home">
          <Image
            src="/vincent-logo.png"
            alt="Vincent Bank"
            width={100}
            height={60}
            priority
          />
        </Link>
        <Menu className="h-8 w-8" />
      </nav>
      <main className="flex flex-1 flex-col">{children}</main>
      <Footer />
    </div>
  );
}

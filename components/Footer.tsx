import Link from "next/link";
import { Twitter, Linkedin, Youtube, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-6 w-full bg-gray-600 p-2 text-white">
      <div className="flex flex-col justify-around py-3 md:flex-row">
        <div className="flex flex-col items-center gap-2">
          <Link href="/legal/site-terms" className="hover:underline">
            Site Terms
          </Link>
          <Link href="/legal/privacy-policy" className="hover:underline">
            Privacy Policy
          </Link>
          <Link href="/legal/privacy-notice" className="hover:underline">
            Privacy Notice
          </Link>
        </div>
        <div className="my-4 flex items-center justify-center gap-2">
          <a
            href="https://twitter.com/vincentBank"
            title="Twitter"
            aria-label="Twitter"
            target="_blank"
            rel="noreferrer"
            className="rounded p-2 hover:bg-gray-500"
          >
            <Twitter className="h-6 w-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/vincetBank"
            title="LinkedIn"
            aria-label="LinkedIn"
            target="_blank"
            rel="noreferrer"
            className="rounded p-2 hover:bg-gray-500"
          >
            <Linkedin className="h-6 w-6" />
          </a>
          <a
            href="https://www.youtube.com/VincentBank"
            title="YouTube"
            aria-label="YouTube"
            target="_blank"
            rel="noreferrer"
            className="rounded p-2 hover:bg-gray-500"
          >
            <Youtube className="h-6 w-6" />
          </a>
          <a
            href="mailto:info@vincent-bank.com"
            title="Email"
            aria-label="Email"
            className="rounded p-2 hover:bg-gray-500"
          >
            <Mail className="h-6 w-6" />
          </a>
        </div>
        <div className="flex flex-col items-center gap-2">
          <h4 className="font-semibold">Please call us</h4>
          <h5>1800-1234-8970</h5>
        </div>
      </div>
      <hr className="border-gray-400" />
      <p className="p-2 text-center text-sm">
        Bank products and services are offered by Vincent Bank®. All deposit
        accounts through Vincent Bank brands are FDIC insured through Vincent
        Bank.
      </p>
      <p className="mt-4 text-center text-sm">
        &copy; Copyright 2022 - 2022,{" "}
        <a
          href="https://vincent-bank.com/"
          target="_blank"
          rel="noreferrer"
          className="underline"
        >
          Vincent Bank LLC
        </a>
        . All Rights Reserved.
      </p>
    </footer>
  );
}

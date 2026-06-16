"use client";

import { useState } from "react";
import { HelpCircle } from "lucide-react";

export default function WhyPopover({ reason }: { reason: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="absolute right-2 top-7">
      <button
        type="button"
        aria-label="Why did AI suggest this?"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="text-blue-500 hover:text-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
      >
        <HelpCircle size={16} />
      </button>
      {open && (
        <div
          role="tooltip"
          className="absolute right-0 top-6 z-10 w-60 rounded-lg bg-white border border-gray-200 shadow-lg p-3 text-xs text-gray-700"
        >
          <p className="font-semibold text-gray-900 mb-1">Why this value?</p>
          <p>{reason}</p>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="mt-2 text-blue-500 hover:underline text-xs"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

"use client";

import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const STEPS = [
  { n: 1, label: "Personal" },
  { n: 2, label: "Address" },
  { n: 3, label: "ID Upload" },
  { n: 4, label: "Review" },
];

export default function OnboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentStep = useSelector(
    (state: RootState) => state.onboarding.currentStep
  );

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <nav aria-label="Application progress" className="mb-8">
        <ol className="flex items-center gap-0">
          {STEPS.map((step, idx) => {
            const done = currentStep > step.n;
            const active = currentStep === step.n;
            return (
              <li key={step.n} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    aria-current={active ? "step" : undefined}
                    className={[
                      "w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-colors",
                      done
                        ? "bg-green-600 border-green-600 text-white"
                        : active
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "bg-white border-gray-300 text-gray-400",
                    ].join(" ")}
                  >
                    {done ? "✓" : step.n}
                  </div>
                  <span
                    className={[
                      "mt-1 text-xs font-medium",
                      active ? "text-blue-600" : "text-gray-500",
                    ].join(" ")}
                  >
                    {step.label}
                  </span>
                </div>
                {idx < STEPS.length - 1 && (
                  <div
                    className={[
                      "flex-1 h-0.5 mx-1 mb-5 transition-colors",
                      done ? "bg-green-600" : "bg-gray-200",
                    ].join(" ")}
                  />
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      {children}
    </div>
  );
}

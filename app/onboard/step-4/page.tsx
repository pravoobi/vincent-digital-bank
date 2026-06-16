"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Button } from "@practics/ui";
import {
  submitApplication,
  resetOnboarding,
} from "../../../store/onboardingSlice";
import { RootState } from "../../../store/store";

function ReviewSection({
  title,
  rows,
}: {
  title: string;
  rows: [string, string][];
}) {
  return (
    <div className="mb-6 border rounded-lg overflow-hidden">
      <div className="bg-gray-50 px-4 py-2 text-sm font-semibold text-gray-700 border-b">
        {title}
      </div>
      <dl className="divide-y">
        {rows.map(([label, value]) => (
          <div key={label} className="flex px-4 py-2 gap-4">
            <dt className="text-sm text-gray-500 w-40 shrink-0">{label}</dt>
            <dd className="text-sm font-medium text-gray-900">
              {value || "—"}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default function Step4Page() {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    personal,
    address,
    document: doc,
  } = useSelector((state: RootState) => state.onboarding);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    dispatch(submitApplication());
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-4" aria-hidden>
          🎉
        </div>
        <h1 className="text-2xl font-bold mb-2">Application Submitted!</h1>
        <p className="text-gray-500 mb-8">
          This is a demo — no data was transmitted. In a real application,
          identity verification takes 1–3 business days.
        </p>
        <Button
          variant="outline"
          onClick={() => {
            dispatch(resetOnboarding());
            router.push("/");
          }}
        >
          Return to Home
        </Button>
      </div>
    );
  }

  return (
    <main>
      <h1 className="text-2xl font-bold mb-6">Review & Submit</h1>
      <p className="text-sm text-gray-500 mb-6">
        Review your information carefully before submitting. Go back to any step
        to make changes.
      </p>

      <ReviewSection
        title="Personal Details"
        rows={[
          ["First Name", personal.firstName ?? ""],
          ["Last Name", personal.lastName ?? ""],
          ["Date of Birth", personal.dob ?? ""],
          ["Email", personal.email ?? ""],
        ]}
      />

      <ReviewSection
        title="Address"
        rows={[
          ["House Number", address.houseNumber ?? ""],
          ["Street", address.street ?? ""],
          ["City", address.city ?? ""],
          ["State", address.state ?? ""],
          ["Zip Code", address.zipCode ?? ""],
          ["Country", address.country ?? ""],
        ]}
      />

      <ReviewSection
        title="ID Document"
        rows={[
          ["ID Type", doc.idType ?? ""],
          ["ID Number", doc.idNumber ?? ""],
          ["First Name (on ID)", doc.idFirstName ?? ""],
          ["Last Name (on ID)", doc.idLastName ?? ""],
          ["DOB (on ID)", doc.idDob ?? ""],
        ]}
      />

      <form onSubmit={handleSubmit}>
        <div className="flex gap-3 mt-4">
          <Button
            variant="outline"
            type="button"
            className="flex-1"
            onClick={() => router.push("/onboard/step-3")}
          >
            Back
          </Button>
          <Button type="submit" className="flex-1">
            Submit Application
          </Button>
        </div>
      </form>
    </main>
  );
}

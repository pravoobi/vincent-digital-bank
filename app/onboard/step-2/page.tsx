"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Input, Button, Stack, Select } from "@practics/ui";
import { saveAddress, setStep } from "../../../store/onboardingSlice";
import { addressSchema } from "../../../lib/schemas";
import { RootState } from "../../../store/store";
import { isAiEnabled } from "../../../lib/config";
import AssistantPanel from "../../../components/AssistantPanel";

const US_STATES = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

type Errors = Partial<Record<string, string>>;

export default function Step2Page() {
  const dispatch = useDispatch();
  const router = useRouter();
  const saved = useSelector((state: RootState) => state.onboarding.address);

  const [form, setForm] = useState({
    houseNumber: saved.houseNumber ?? "",
    street: saved.street ?? "",
    city: saved.city ?? "",
    state: saved.state ?? "",
    zipCode: saved.zipCode ?? "",
    country: saved.country ?? "United States",
  });
  const [errors, setErrors] = useState<Errors>({});

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = addressSchema.safeParse(form);
    if (!result.success) {
      const flat = result.error.flatten().fieldErrors;
      setErrors(
        Object.fromEntries(
          Object.entries(flat).map(([k, v]) => [k, v?.[0] ?? ""])
        )
      );
      return;
    }
    dispatch(saveAddress(result.data));
    dispatch(setStep(3));
    router.push("/onboard/step-3");
  }

  return (
    <div className="flex gap-6">
      <main className="flex-1">
        <h1 className="text-2xl font-bold mb-6">Address</h1>
        <form onSubmit={handleSubmit} noValidate>
          <Stack gap={4}>
            <Input
              label="House Number"
              placeholder="House Number"
              value={form.houseNumber}
              onChange={set("houseNumber")}
              error={errors.houseNumber}
              required
            />
            <Input
              label="Street"
              placeholder="Street"
              value={form.street}
              onChange={set("street")}
              error={errors.street}
              required
            />
            <Input
              label="City"
              placeholder="City"
              value={form.city}
              onChange={set("city")}
              error={errors.city}
              required
            />
            <div>
              <label
                htmlFor="state-select"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                State
              </label>
              <Select
                options={US_STATES.map((s) => ({ label: s, value: s }))}
                value={form.state}
                onValueChange={(v) => setForm((f) => ({ ...f, state: v }))}
                placeholder="Select state"
              />
              {errors.state && (
                <p role="alert" className="mt-1 text-xs text-red-600">
                  {errors.state}
                </p>
              )}
            </div>
            <Input
              label="Zip Code"
              placeholder="12345"
              value={form.zipCode}
              onChange={set("zipCode")}
              error={errors.zipCode}
              required
            />
            <div className="flex gap-3 mt-2">
              <Button
                variant="outline"
                type="button"
                className="flex-1"
                onClick={() => router.push("/onboard/step-1")}
              >
                Back
              </Button>
              <Button type="submit" className="flex-1">
                Continue to ID Upload
              </Button>
            </div>
          </Stack>
        </form>
      </main>
      {isAiEnabled && (
        <aside className="w-72 shrink-0">
          <AssistantPanel step={2} />
        </aside>
      )}
    </div>
  );
}

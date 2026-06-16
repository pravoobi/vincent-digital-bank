"use client";

import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Input, Button, Stack, Select } from "@practics/ui";
import {
  saveDocument,
  setStep,
  addAiSuggestion,
} from "../../../store/onboardingSlice";
import { documentSchema } from "../../../lib/schemas";
import { RootState } from "../../../store/store";
import { isAiEnabled } from "../../../lib/config";
import AssistantPanel from "../../../components/AssistantPanel";
import WhyPopover from "../../../components/WhyPopover";

const ID_TYPES = [
  { label: "US Passport", value: "passport" },
  { label: "Driver's License", value: "drivers_license" },
  { label: "State ID", value: "state_id" },
];

type Errors = Partial<Record<string, string>>;
type FieldReasons = Record<string, string>;

export default function Step3Page() {
  const dispatch = useDispatch();
  const router = useRouter();
  const saved = useSelector((state: RootState) => state.onboarding.document);

  const [form, setForm] = useState({
    idType: saved.idType ?? "",
    idNumber: saved.idNumber ?? "",
    idFirstName: saved.idFirstName ?? "",
    idLastName: saved.idLastName ?? "",
    idDob: saved.idDob ?? "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [extracting, setExtracting] = useState(false);
  const [extractError, setExtractError] = useState("");
  const [aiFilledFields, setAiFilledFields] = useState<Set<string>>(new Set());
  const [fieldReasons, setFieldReasons] = useState<FieldReasons>({});
  const fileRef = useRef<HTMLInputElement>(null);

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setAiFilledFields((s) => {
      const n = new Set(s);
      n.delete(field);
      return n;
    });
  };

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !isAiEnabled) return;
    setExtracting(true);
    setExtractError("");
    try {
      const base64 = await toBase64(file);
      const res = await fetch("/api/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: base64, mimeType: file.type }),
      });
      if (!res.ok) throw new Error("Extraction failed");
      const data = await res.json();
      const updates: Partial<typeof form> = {};
      const reasons: FieldReasons = {};
      const filled = new Set<string>();

      if (data.idType) {
        updates.idType = data.idType;
        filled.add("idType");
      }
      if (data.idNumber) {
        updates.idNumber = data.idNumber;
        filled.add("idNumber");
      }
      if (data.firstName) {
        updates.idFirstName = data.firstName;
        filled.add("idFirstName");
      }
      if (data.lastName) {
        updates.idLastName = data.lastName;
        filled.add("idLastName");
      }
      if (data.dob) {
        updates.idDob = data.dob;
        filled.add("idDob");
      }

      if (data.reasons) Object.assign(reasons, data.reasons);

      setForm((f) => ({ ...f, ...updates }));
      setAiFilledFields(filled);
      setFieldReasons(reasons);
      dispatch(saveDocument({ imageBase64: base64 }));

      filled.forEach((field) => {
        dispatch(
          addAiSuggestion({
            field,
            value: (updates as Record<string, string>)[field] ?? "",
            reason: reasons[field] ?? "Extracted from uploaded ID image.",
          })
        );
      });
    } catch {
      setExtractError(
        "Could not extract data from image. Please fill in fields manually."
      );
    } finally {
      setExtracting(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = documentSchema.safeParse(form);
    if (!result.success) {
      const flat = result.error.flatten().fieldErrors;
      setErrors(
        Object.fromEntries(
          Object.entries(flat).map(([k, v]) => [k, v?.[0] ?? ""])
        )
      );
      return;
    }
    dispatch(saveDocument(result.data));
    dispatch(setStep(4));
    router.push("/onboard/step-4");
  }

  return (
    <div className="flex gap-6">
      <main className="flex-1">
        <h1 className="text-2xl font-bold mb-2">ID Document</h1>
        <p className="text-sm text-gray-500 mb-6">
          Upload a sample ID image. Fields will be pre-filled automatically. All
          fields are editable — confirm before continuing.
        </p>

        {isAiEnabled && (
          <div className="mb-6">
            <label
              htmlFor="id-image"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Document ID Image
            </label>
            <input
              id="id-image"
              ref={fileRef}
              type="file"
              accept="image/*"
              aria-label="Document ID Image"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {extracting && (
              <p className="mt-2 text-sm text-blue-600 animate-pulse">
                Extracting data from image…
              </p>
            )}
            {extractError && (
              <p role="alert" className="mt-2 text-sm text-red-600">
                {extractError}
              </p>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <Stack gap={4}>
            <div>
              <label
                htmlFor="id-type-select"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                ID Type
              </label>
              <Select
                options={ID_TYPES}
                value={form.idType}
                onValueChange={(v) => setForm((f) => ({ ...f, idType: v }))}
                placeholder="Select ID type"
              />
              {errors.idType && (
                <p role="alert" className="mt-1 text-xs text-red-600">
                  {errors.idType}
                </p>
              )}
            </div>
            <div className="relative">
              <Input
                label="ID Number"
                placeholder="ID Number"
                value={form.idNumber}
                onChange={set("idNumber")}
                error={errors.idNumber}
                required
              />
              {aiFilledFields.has("idNumber") && (
                <WhyPopover
                  reason={
                    fieldReasons.idNumber ?? "Extracted from uploaded ID image."
                  }
                />
              )}
            </div>
            <div className="relative">
              <Input
                label="First Name (as on ID)"
                placeholder="First Name"
                value={form.idFirstName}
                onChange={set("idFirstName")}
                error={errors.idFirstName}
                required
              />
              {aiFilledFields.has("idFirstName") && (
                <WhyPopover
                  reason={
                    fieldReasons.idFirstName ??
                    "Extracted from uploaded ID image."
                  }
                />
              )}
            </div>
            <div className="relative">
              <Input
                label="Last Name (as on ID)"
                placeholder="Last Name"
                value={form.idLastName}
                onChange={set("idLastName")}
                error={errors.idLastName}
                required
              />
              {aiFilledFields.has("idLastName") && (
                <WhyPopover
                  reason={
                    fieldReasons.idLastName ??
                    "Extracted from uploaded ID image."
                  }
                />
              )}
            </div>
            <div className="relative">
              <Input
                label="Date of Birth (as on ID)"
                placeholder="YYYY-MM-DD"
                value={form.idDob}
                onChange={set("idDob")}
                error={errors.idDob}
                helperText="Format: YYYY-MM-DD"
                required
              />
              {aiFilledFields.has("idDob") && (
                <WhyPopover
                  reason={
                    fieldReasons.idDob ?? "Extracted from uploaded ID image."
                  }
                />
              )}
            </div>
            <div className="flex gap-3 mt-2">
              <Button
                variant="outline"
                type="button"
                className="flex-1"
                onClick={() => router.push("/onboard/step-2")}
              >
                Back
              </Button>
              <Button type="submit" className="flex-1">
                Continue to Review
              </Button>
            </div>
          </Stack>
        </form>
      </main>
      {isAiEnabled && (
        <aside className="w-72 shrink-0">
          <AssistantPanel step={3} />
        </aside>
      )}
    </div>
  );
}

function toBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

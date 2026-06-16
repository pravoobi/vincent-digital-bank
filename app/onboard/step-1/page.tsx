"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Input, Button, Stack } from "@practics/ui";
import { savePersonal, setStep } from "../../../store/onboardingSlice";
import { personalSchema } from "../../../lib/schemas";
import { RootState } from "../../../store/store";
import { isAiEnabled } from "../../../lib/config";
import AssistantPanel from "../../../components/AssistantPanel";

type Errors = Partial<Record<string, string>>;

export default function Step1Page() {
  const dispatch = useDispatch();
  const router = useRouter();
  const saved = useSelector((state: RootState) => state.onboarding.personal);

  const [form, setForm] = useState({
    firstName: saved.firstName ?? "",
    lastName: saved.lastName ?? "",
    dob: saved.dob ?? "",
    email: saved.email ?? "",
  });
  const [errors, setErrors] = useState<Errors>({});

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = personalSchema.safeParse(form);
    if (!result.success) {
      const flat = result.error.flatten().fieldErrors;
      setErrors(
        Object.fromEntries(
          Object.entries(flat).map(([k, v]) => [k, v?.[0] ?? ""])
        )
      );
      return;
    }
    dispatch(savePersonal(result.data));
    dispatch(setStep(2));
    router.push("/onboard/step-2");
  }

  return (
    <div className="flex gap-6">
      <main className="flex-1">
        <h1 className="text-2xl font-bold mb-6">Personal Details</h1>
        <form onSubmit={handleSubmit} noValidate>
          <Stack gap={4}>
            <Input
              label="First Name"
              placeholder="First Name"
              value={form.firstName}
              onChange={set("firstName")}
              error={errors.firstName}
              aria-describedby={
                errors.firstName ? "firstName-error" : undefined
              }
              required
            />
            <Input
              label="Last Name"
              placeholder="Last Name"
              value={form.lastName}
              onChange={set("lastName")}
              error={errors.lastName}
              required
            />
            <Input
              label="Date of Birth"
              placeholder="YYYY-MM-DD"
              value={form.dob}
              onChange={set("dob")}
              error={errors.dob}
              helperText="Format: YYYY-MM-DD"
              required
            />
            <Input
              label="Email Address"
              placeholder="you@example.com"
              type="email"
              value={form.email}
              onChange={set("email")}
              error={errors.email}
              required
            />
            <Button type="submit" className="w-full mt-2">
              Continue to Address
            </Button>
          </Stack>
        </form>
      </main>
      {isAiEnabled && (
        <aside className="w-72 shrink-0">
          <AssistantPanel step={1} />
        </aside>
      )}
    </div>
  );
}

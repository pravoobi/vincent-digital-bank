"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { Button, Container, Input, Stack, Select } from "@practics/ui";
import {
  setApplicationStep,
  setApplicationData,
} from "../../store/applicationSlice";
import { APPLICATION_STEPS, US_STATES } from "../../constants";
import { PERSONAL_INFORMATION_ROUTE } from "../../routes";

const stateOptions = US_STATES.map(({ code, name }) => ({
  value: name,
  label: name,
  key: code,
}));

const ID_TYPES = [
  { value: "drivingLicense", label: "Driving License" },
  { value: "StateId", label: "State ID" },
  { value: "passport", label: "Passport" },
];

export default function DocumentIdUpload() {
  const [idType, setIdType] = useState("");
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    houseNumber: "",
    street: "",
    city: "",
    zipCode: "",
    state: "",
  });

  const dispatch = useDispatch();
  const router = useRouter();

  const onChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setApplicationData({ ...form, idType }));
    dispatch(setApplicationStep(APPLICATION_STEPS.PERSONAL_INFORMATION));
    router.push(PERSONAL_INFORMATION_ROUTE);
  };

  return (
    <Container size="lg" className="py-6">
      <div className="mx-auto max-w-2xl">
        <h1 className="my-3 text-5xl font-bold">Upload your document ID</h1>
        <form onSubmit={handleSubmit}>
          <Stack direction="column" gap={4} className="mt-5 p-2">
            <div>
              <label className="mb-2 block text-sm">
                Select your ID type to Upload
              </label>
              <Select
                placeholder="Select ID type"
                value={idType}
                onValueChange={setIdType}
                options={ID_TYPES}
              />
              <p className="mt-1 text-sm text-gray-600">
                Your document ID type to upload
              </p>
            </div>
            <div>
              <label htmlFor="id-file" className="mb-2 block text-sm font-bold">
                Document ID image
              </label>
              <input
                id="id-file"
                type="file"
                accept="image/*"
                onChange={(e) => setUploadFile(e.target.files?.[0] ?? null)}
                className="block w-full text-sm file:mr-4 file:rounded file:border file:border-gray-300 file:bg-gray-50 file:px-3 file:py-2 file:text-sm hover:file:bg-gray-100"
              />
              {uploadFile ? (
                <p className="mt-1 text-sm text-gray-600">
                  Selected: {uploadFile.name}
                </p>
              ) : null}
            </div>
            <Input
              label="First Name"
              name="firstName"
              placeholder="First Name"
              required
              value={form.firstName}
              onChange={onChange("firstName")}
            />
            <Input
              label="Last Name"
              name="lastName"
              placeholder="Last Name"
              required
              value={form.lastName}
              onChange={onChange("lastName")}
            />
            <hr />
            <Stack direction="row" gap={3}>
              <Input
                label="House Number"
                name="houseNumber"
                placeholder="House Number"
                required
                value={form.houseNumber}
                onChange={onChange("houseNumber")}
              />
              <Input
                label="Street"
                name="street"
                placeholder="Street"
                required
                value={form.street}
                onChange={onChange("street")}
              />
            </Stack>
            <Stack direction="row" gap={3}>
              <Input
                label="City"
                name="city"
                placeholder="City"
                required
                value={form.city}
                onChange={onChange("city")}
              />
              <Input
                label="Zip Code"
                name="zipCode"
                placeholder="Zip Code"
                required
                value={form.zipCode}
                onChange={onChange("zipCode")}
              />
            </Stack>
            <div>
              <label className="mb-2 block text-sm">State</label>
              <Select
                placeholder="Select option"
                value={form.state}
                onValueChange={(v) => setForm((p) => ({ ...p, state: v }))}
                options={stateOptions}
              />
            </div>
            <Button type="submit" size="default" className="mt-4 w-[150px]">
              Continue
            </Button>
          </Stack>
        </form>
      </div>
    </Container>
  );
}

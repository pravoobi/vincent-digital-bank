"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { Button, Container, Input, Stack, Select } from "@practics/ui";
import {
  setApplicationStep,
  setApplicationData,
} from "../../store/applicationSlice";
import { APPLICATION_STEPS, COUNTRIES, OCCUPATIONS } from "../../constants";
import { SECURITY_SETUP_VERIFICATION_ROUTE } from "../../routes";

const countryOptions = COUNTRIES.map(({ code, name }) => ({
  value: name,
  label: name,
  key: code,
}));

const occupationOptions = OCCUPATIONS.map(
  ({ OccupationId, OccupationName }) => ({
    value: OccupationName,
    label: OccupationName,
    key: String(OccupationId),
  })
);

export default function PersonalInformation() {
  const [phone, setPhone] = useState("");
  const [ssn, setSSN] = useState("");
  const [citizenship, setCitizenship] = useState("");
  const [occupation, setOccupation] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setApplicationData({ citizenship, phone, ssn, occupation }));
    dispatch(setApplicationStep(APPLICATION_STEPS.SECURITY_SETUP_VERIFICATION));
    router.push(SECURITY_SETUP_VERIFICATION_ROUTE);
  };

  return (
    <Container size="lg" className="py-6">
      <div className="mx-auto max-w-2xl">
        <h1 className="my-3 text-5xl font-bold">Tell us more about you</h1>
        <form onSubmit={handleSubmit}>
          <Stack direction="column" gap={4} className="mt-5 p-2">
            <Input
              type="tel"
              label="Phone"
              placeholder="Phone"
              aria-label="Phone"
              id="phone"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <Input
              type="text"
              label="SSN"
              placeholder="SSN"
              aria-label="SSN"
              id="ssn"
              required
              value={ssn}
              onChange={(e) => setSSN(e.target.value)}
            />
            <div>
              <label htmlFor="citizenship" className="mb-2 block text-sm">
                Citizenship
              </label>
              <Select
                placeholder="Select option"
                value={citizenship}
                onValueChange={setCitizenship}
                options={countryOptions}
              />
            </div>
            <div>
              <label htmlFor="occupation" className="mb-2 block text-sm">
                Occupation
              </label>
              <Select
                placeholder="Select option"
                value={occupation}
                onValueChange={setOccupation}
                options={occupationOptions}
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

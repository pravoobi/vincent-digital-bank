"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { Button, Container, Input, Stack } from "@practics/ui";
import {
  setApplicationStep,
  setApplicationData,
} from "../../store/applicationSlice";
import { APPLICATION_STEPS } from "../../constants";
import { ACCOUNT_CREATION_COMPLETE_ROUTE } from "../../routes";

export default function SecuritySetupVerification() {
  const [securityWord, setSecurityWord] = useState("");
  const [securityHint, setSecurityHint] = useState("");
  const [otp, setOtp] = useState("");
  const [smsotp, setSmsotp] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setApplicationData({ securityWord, securityHint, otp, smsotp }));
    dispatch(setApplicationStep(APPLICATION_STEPS.ACCOUNT_CREATION_COMPLETE));
    router.push(ACCOUNT_CREATION_COMPLETE_ROUTE);
  };

  return (
    <Container size="lg" className="py-6">
      <div className="mx-auto max-w-2xl">
        <h1 className="my-3 text-5xl font-bold">Setup your security</h1>
        <form onSubmit={handleSubmit}>
          <Stack direction="column" gap={4} className="mt-5 p-2">
            <Input
              label="Security Word"
              placeholder="Security Word"
              aria-label="Security Word"
              id="securityWord"
              required
              value={securityWord}
              onChange={(e) => setSecurityWord(e.target.value)}
              helperText="Your security word. When you call us we ask this for the identification. Keep this confidential and do not write this anywhere."
            />
            <Input
              label="Security Hint"
              placeholder="Security Hint"
              aria-label="Security Hint"
              id="securityHint"
              required
              value={securityHint}
              onChange={(e) => setSecurityHint(e.target.value)}
              helperText="Your security hint"
            />
            <hr />
            <Input
              type="password"
              label="Email One Time Pin (OTP)"
              placeholder="Email One Time Pin"
              aria-label="Email One Time Pin"
              id="otp"
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              helperText="Enter your email One Time Pin (OTP)"
            />
            <Input
              type="password"
              label="SMS One Time Pin (OTP)"
              placeholder="SMS One Time Pin"
              aria-label="SMS One Time Pin"
              id="smsotp"
              required
              value={smsotp}
              onChange={(e) => setSmsotp(e.target.value)}
              helperText="Enter your SMS One Time Pin (OTP)"
            />
            <Button type="submit" size="default" className="mt-4 w-[150px]">
              Continue
            </Button>
          </Stack>
        </form>
      </div>
    </Container>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { Eye, EyeOff } from "lucide-react";
import { Button, Container, Input, Stack, Checkbox } from "@practics/ui";
import {
  setApplicationStep,
  setApplicationData,
} from "../../store/applicationSlice";
import { APPLICATION_STEPS, CONSENTS } from "../../constants";
import { DOCUMENT_ID_UPLOAD_ROUTE } from "../../routes";

export default function StartApplication() {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [consents, setConsents] = useState([]);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleConsents = (checked) => {
    if (checked) {
      setConsents([
        { consent: CONSENTS.PRIVACY_POLICY, accepted: true },
        { consent: CONSENTS.PRIVACY_NOTICE, accepted: true },
      ]);
    } else {
      setConsents([]);
    }
  };

  const passwordsMismatch =
    password !== "" && confirmPassword !== "" && password !== confirmPassword;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwordsMismatch) return;
    dispatch(setApplicationData({ email: emailAddress, password, consents }));
    dispatch(setApplicationStep(APPLICATION_STEPS.DOCUMENT_UPLOAD));
    router.push(DOCUMENT_ID_UPLOAD_ROUTE);
  };

  return (
    <Container size="lg" className="py-6">
      <div className="mx-auto max-w-2xl">
        <h1 className="my-3 text-5xl font-bold">
          Let&#39;s start your application
        </h1>
        <form onSubmit={handleSubmit}>
          <Stack direction="column" gap={4} className="mt-5 p-2">
            <Input
              type="email"
              label="Email Address"
              placeholder="Email"
              aria-label="Email"
              id="email"
              required
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              helperText="Your user account email address"
            />
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                label="Password"
                placeholder="Password"
                aria-label="Password"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                helperText="Your user account Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-9 rounded p-1 hover:bg-gray-100"
                aria-label={showPassword ? "Hide" : "Show"}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            <Input
              type="password"
              label="Confirm Password"
              placeholder="Confirm Password"
              aria-label="Confirm Password"
              id="confirm-password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              helperText="Retype your user account Password"
              error={
                passwordsMismatch
                  ? "Password and Confirm Passwords do not match."
                  : undefined
              }
            />
            <Checkbox
              id="consent"
              label="I agree to Privacy policy and Privacy Notice."
              aria-label="Consent checkbox"
              required
              onCheckedChange={handleConsents}
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

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Confetti from "react-confetti";
import { Button, Container, Input, Stack } from "@practics/ui";
import useWindowSize from "../../utils/useWindowSize";
import {
  setApplicationStep,
  setApplicationData,
} from "../../store/applicationSlice";
import { APPLICATION_STEPS } from "../../constants";
import { DASHBOARD } from "../../routes";

export default function AccountCreationComplete() {
  const [accountNumber, setAccountNumber] = useState("");
  const [routingNumber, setRoutingNumber] = useState("");
  const [isConfettiShown, setConfettiShown] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setConfettiShown(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  const dispatch = useDispatch();
  const router = useRouter();
  const { width, height } = useWindowSize();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setApplicationData({ accountNumber, routingNumber }));
    dispatch(setApplicationStep(APPLICATION_STEPS.DASHBOARD));
    router.push(DASHBOARD);
  };

  return (
    <>
      {isConfettiShown && width && height ? (
        <Confetti width={width} height={height} />
      ) : null}
      <Container size="lg" className="py-6">
        <div className="mx-auto max-w-2xl">
          <h1 className="my-3 text-5xl font-bold">
            Congratulations! on your account opening
          </h1>
          <p>
            You can link your external accounts and transfer funds to the new
            account!
          </p>
          <form onSubmit={handleSubmit}>
            <Stack direction="column" gap={4} className="mt-5 p-2">
              <Input
                label="Account Number"
                placeholder="AccountNumber"
                aria-label="AccountNumber"
                id="accountNumber"
                required
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                helperText="Your External Bank Account number"
              />
              <Input
                label="Routing Number"
                placeholder="RoutingNumber"
                aria-label="RoutingNumber"
                id="routingNumber"
                required
                value={routingNumber}
                onChange={(e) => setRoutingNumber(e.target.value)}
                helperText="Your External Bank Routing number"
              />
              <Button type="submit" size="default" className="mt-4 w-[150px]">
                Link
              </Button>
            </Stack>
          </form>
        </div>
      </Container>
    </>
  );
}

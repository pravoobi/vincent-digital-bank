"use client";

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@practics/ui";
import { setApplicationStep } from "../store/applicationSlice";
import { APPLICATION_STEPS } from "../constants";
import { START_APPLICATION_ROUTE } from "../routes";
import { isAiEnabled } from "../lib/config";

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleClick = () => {
    dispatch(setApplicationStep(APPLICATION_STEPS.START));
    router.push(START_APPLICATION_ROUTE);
  };

  return (
    <div>
      <div
        className="relative bg-cover bg-center bg-gray-200"
        style={{
          backgroundImage: 'url("/CityView.jpg")',
          height: "calc(100vh - 68px)",
        }}
      >
        <div className="flex w-full">
          <div className="ml-5 mt-24 w-11/12 bg-gray-50 p-8 text-blue-900 sm:ml-12 md:ml-20 md:w-1/2 lg:ml-24 lg:w-5/12">
            <h1 className="my-3 text-5xl">Savings Accounts</h1>
            <h4 className="my-3 text-xl">
              Save smarter, compound faster. This is savings, evolved.
            </h4>
            <Button
              onClick={handleClick}
              size="lg"
              className="mt-5 w-[250px] rounded-full"
              iconRight={<ChevronRight className="h-6 w-6" />}
            >
              Open an Account
            </Button>
            {isAiEnabled && (
              <Button
                onClick={() => router.push("/onboard/step-1")}
                size="lg"
                variant="outline"
                className="mt-3 w-[250px] rounded-full border-blue-700 text-blue-900"
                iconRight={<Sparkles className="h-5 w-5" />}
              >
                AI-Assisted Onboarding
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col bg-blue-900 p-10 text-gray-50 md:flex-row">
        <div className="ml-3 flex flex-col" style={{ flexBasis: "30%" }}>
          <div>Earn upto</div>
          <div className="flex text-6xl">
            <span>{">"}</span>
            <div>&nbsp;0.80</div>
            <div className="mx-3 mt-6 flex flex-col text-base">
              <div>%</div>
              <span>APY</span>
            </div>
          </div>
        </div>
        <div className="ml-5 p-3" style={{ flexBasis: "50%" }}>
          At Vincent Bank, we liberate customers from the constraints of
          traditional banking. Because we&#39;re digital, our overhead costs are
          lower than traditional banks. Smarter savings means more money for
          you.
        </div>
      </div>

      <div className="flex flex-col md:flex-row">
        <div className="flex flex-1 flex-col p-5">
          <h3 className="p-2 text-3xl">High Yield Savings</h3>
          <p>
            Up to 0.61% APY. Grow your savings faster with interest compounded
            daily. No monthly maintenance fees. No minimum balance requirements.
            Plus a free ATM card upon request.
          </p>
        </div>
        <div className="flex flex-1 flex-col p-8">
          <h3 className="p-2 text-3xl">Certificates of Deposit (CDs)</h3>
          <p>
            Higher returns, zero risk. With a $1,000 minimum deposit, you can
            choose terms between 3 and 60 months. All CDs are FDIC-insured to
            the maximum allowable limits.
          </p>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h3 className="p-2 text-3xl">High Yield Money Market</h3>
          <p>
            0.25% APY. Get the security of traditional savings with higher
            interest rates and limited check-writing privileges. No monthly
            maintenance fees. No minimum balance requirements. Interest
            compounded daily.
          </p>
        </div>
      </div>
    </div>
  );
}

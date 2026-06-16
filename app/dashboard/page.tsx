"use client";

import { useSelector } from "react-redux";
import { Info } from "lucide-react";
import { Container } from "@practics/ui";
import { RootState } from "../../store/store";

export default function Dashboard() {
  const application = useSelector(
    (state: RootState) => state.applicationData.application
  );
  const { firstName = "John" } = application || {};

  return (
    <Container size="lg" className="py-6">
      <div className="mx-auto max-w-2xl">
        <h1 className="my-3 text-5xl font-bold">{firstName}, Welcome!</h1>
        <p className="my-3 flex items-center gap-2 rounded bg-blue-100 p-2">
          <Info className="h-5 w-5 text-blue-900" /> Link to External Accounts
          to transfer
        </p>
        <p className="my-3 flex items-center gap-2 rounded bg-blue-100 p-2">
          <Info className="h-5 w-5 text-blue-900" /> Fund your Account now
        </p>
        <div className="my-5 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-2 text-left font-semibold">Account</th>
                <th className="px-4 py-2 text-right font-semibold">Rate</th>
                <th className="px-4 py-2 text-right font-semibold">Balance</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-2">Savers Account - 3478</td>
                <td className="px-4 py-2 text-right">0.80% APY</td>
                <td className="px-4 py-2 text-right">$ 0.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  );
}

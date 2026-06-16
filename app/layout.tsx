import "./globals.css";
import Providers from "./providers";
import ComponentContainer from "../components/ComponentContainer";

export const metadata = {
  title: "Vincent Bank",
  description: "Open a high-yield savings account online.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div
          role="banner"
          className="bg-amber-50 border-b border-amber-200 text-amber-800 text-center text-xs py-1.5 px-4"
        >
          Demo only — synthetic data, no real PII collected.
        </div>
        <Providers>
          <ComponentContainer>{children}</ComponentContainer>
        </Providers>
      </body>
    </html>
  );
}

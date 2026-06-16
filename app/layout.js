import "./globals.css";
import Providers from "./providers";
import ComponentContainer from "../components/ComponentContainer";

export const metadata = {
  title: "Vincent Bank",
  description: "Open a high-yield savings account online.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <ComponentContainer>{children}</ComponentContainer>
        </Providers>
      </body>
    </html>
  );
}

import { Container } from "@practics/ui";

export default function ApplicationDeclined() {
  return (
    <Container size="lg" className="py-6">
      <div className="mx-auto max-w-2xl">
        <h1 className="my-3 text-5xl font-bold">We are sorry</h1>
        <p>
          Your application has been declined, please call us at 1800-3489-2348
        </p>
        <p>
          Application Id:<strong>45728384823488</strong>
        </p>
      </div>
    </Container>
  );
}

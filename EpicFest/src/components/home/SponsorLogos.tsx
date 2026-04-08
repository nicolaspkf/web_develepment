import Container from "@/components/ui/Container";

const sponsors = [
  "Roskilde Kommune",
  "Gimle",
  "Frederiksberg Bryghus",
  "Metal Blade Records",
  "Nuclear Blast",
];

export default function SponsorLogos() {
  return (
    <section className="py-12 bg-dark-900 border-t border-border-subtle">
      <Container>
        <div className="flex items-center justify-center gap-8 flex-wrap opacity-50">
          {sponsors.map((name) => (
            <span
              key={name}
              className="text-sm text-text-muted font-[family-name:var(--font-heading)] uppercase tracking-wider"
            >
              {name}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}

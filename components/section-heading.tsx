type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  intro: string;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  intro,
  className,
}: SectionHeadingProps) {
  return (
    <div className={className ? `section-heading ${className}` : "section-heading"}>
      <p className="section-eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p className="section-intro">{intro}</p>
    </div>
  );
}

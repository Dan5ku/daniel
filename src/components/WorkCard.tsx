import "./WorkCard.css";

interface WorkCardProps {
  title: string;
  description: string;
  tag: string;
  href?: string;
  soon?: boolean;
}

export default function WorkCard({ title, description, tag, href = "#", soon = false }: WorkCardProps) {
  return (
    <a className="work-card" href={href}>
      <div className={`work-card__thumb${soon ? " soon" : ""}`}>
        {soon ? "Coming soon" : "Preview image"}
      </div>
      <div className="work-card__body">
        <div className="work-card__title">{title}</div>
        <p className="work-card__desc">{description}</p>
        <span className="work-card__tag">{tag}</span>
      </div>
    </a>
  );
}

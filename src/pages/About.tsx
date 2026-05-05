import "./Placeholder.css";

export default function About() {
  return (
    <div className="placeholder-page">
      <div className="placeholder-inner">
        <div className="placeholder-icon">
          <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
            <circle cx="24" cy="16" r="8" stroke="currentColor" strokeWidth="2"/>
            <path d="M8 40c0-8.837 7.163-16 16-16s16 7.163 16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M30 28l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <p className="placeholder-label">About</p>
        <h1 className="placeholder-heading">In progress.</h1>
        <p className="placeholder-body">
          A proper about page is on its way. In the meantime, see the home page.
        </p>
      </div>
    </div>
  );
}

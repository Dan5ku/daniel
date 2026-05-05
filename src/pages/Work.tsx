import "./Placeholder.css";

export default function Work() {
  return (
    <div className="placeholder-page">
      <div className="placeholder-inner">
        <div className="placeholder-icon">
          <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
            <rect x="4" y="10" width="40" height="28" rx="3" stroke="currentColor" strokeWidth="2"/>
            <path d="M4 18h40" stroke="currentColor" strokeWidth="2"/>
            <circle cx="11" cy="14" r="1.5" fill="currentColor"/>
            <circle cx="16" cy="14" r="1.5" fill="currentColor"/>
            <circle cx="21" cy="14" r="1.5" fill="currentColor"/>
            <path d="M14 30h20M14 35h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <p className="placeholder-label">Work</p>
        <h1 className="placeholder-heading">In progress.</h1>
        <p className="placeholder-body">
          Case studies and projects are being documented. Check back soon.
        </p>
      </div>
    </div>
  );
}

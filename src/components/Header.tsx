import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const heroName = document.getElementById("hero-name");
      if (!heroName) return;
      setScrolled(heroName.getBoundingClientRect().top < 80);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`header${scrolled ? " scrolled" : ""}`}>
      <div className="header-inner">
        <Link to="/" className="wordmark">Daniel Virtanen</Link>
        <span className="header-tagline">Designer. Developer.</span>
        <nav className="nav">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
          >
            Home
          </NavLink>
          <NavLink
            to="/work"
            className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
          >
            Work
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
          >
            About
          </NavLink>
        </nav>
        <div className="header-actions">
          <a
            className="btn-text"
            href="https://github.com/Dan5ku"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
            <svg viewBox="0 0 12 12" aria-hidden="true">
              <path d="M2 10L10 2M5 2h5v5" />
            </svg>
          </a>
          <a
            className="btn-text"
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
            <svg viewBox="0 0 12 12" aria-hidden="true">
              <path d="M2 10L10 2M5 2h5v5" />
            </svg>
          </a>
          <Link to="/contact" className="btn-cta">
            Contact
            <svg viewBox="0 0 12 12" aria-hidden="true">
              <polyline points="2,6 10,6 7,3" />
              <polyline points="7,9 10,6" />
            </svg>
          </Link>
        </div>
      </div>
    </header>
  );
}

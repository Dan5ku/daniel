import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, NavLink } from "react-router-dom";
import ContactDropdown from "./ContactDropdown";
import "./Header.css";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [shakeCount, setShakeCount] = useState(0);
  const [btnHighlighted, setBtnHighlighted] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, right: 0 });
  const contactBtnRef = useRef<HTMLButtonElement>(null);
  const contactWrapperRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const prevBtnWidthRef = useRef<number | null>(null);
  const btnHighlightTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const btnHighlightFadeRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const heroName = document.getElementById("hero-name");
      if (!heroName) return;
      setScrolled(heroName.getBoundingClientRect().top < 80);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (shakeCount === 0) return;
    const btn = contactBtnRef.current;
    if (!btn) return;
    btn.classList.remove("shake");
    void btn.offsetWidth;
    btn.classList.add("shake");

    setBtnHighlighted(true);
    if (btnHighlightTimerRef.current) clearTimeout(btnHighlightTimerRef.current);
    if (btnHighlightFadeRef.current) clearTimeout(btnHighlightFadeRef.current);
    btnHighlightTimerRef.current = setTimeout(() => {
      setBtnHighlighted(false);
    }, 2000);
  }, [shakeCount]);

  useEffect(() => {
    if (!contactOpen) return;
    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as Node;
      const insideWrapper = contactWrapperRef.current?.contains(target);
      const insideDropdown = dropdownRef.current?.contains(target);
      if (!insideWrapper && !insideDropdown) {
        e.preventDefault();
        setShakeCount(c => c + 1);
      }
    };
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [contactOpen]);

  useLayoutEffect(() => {
    const btn = contactBtnRef.current;
    if (!btn) return;
    if (prevBtnWidthRef.current === null) {
      prevBtnWidthRef.current = btn.offsetWidth;
      return;
    }
    const oldWidth = prevBtnWidthRef.current;
    btn.style.width = "";
    const newWidth = btn.offsetWidth;
    prevBtnWidthRef.current = newWidth;
    btn.style.transition = "none";
    btn.style.width = oldWidth + "px";
    requestAnimationFrame(() => requestAnimationFrame(() => {
      btn.style.transition = "width 0.22s ease";
      btn.style.width = newWidth + "px";
    }));
    const t = setTimeout(() => { btn.style.width = ""; btn.style.transition = ""; }, 240);
    return () => clearTimeout(t);
  }, [contactOpen]);

  const openContact = () => {
    if (contactOpen) {
      setShakeCount(0);
      setBtnHighlighted(false);
      if (btnHighlightTimerRef.current) clearTimeout(btnHighlightTimerRef.current);
      contactBtnRef.current?.classList.remove("shake");
    } else if (contactBtnRef.current) {
      const rect = contactBtnRef.current.getBoundingClientRect();
      setDropdownPos({ top: rect.bottom, right: window.innerWidth - rect.right });
    }
    setContactOpen(o => !o);
  };

  return (
    <header className={`header${scrolled ? " scrolled" : ""}`}>
      <div className="header-inner">
        <Link to="/" className="wordmark">Daniel Virtanen</Link>
        <span className="header-tagline">Designer. Developer.</span>
        <nav className="nav">
          <NavLink to="/" end className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}>
            Home
          </NavLink>
          <NavLink to="/work" className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}>
            Work
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}>
            About
          </NavLink>
        </nav>
        <div className="header-actions">
          <a className="btn-text" href="https://github.com/Dan5ku" target="_blank" rel="noopener noreferrer">
            GitHub
            <svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2 10L10 2M5 2h5v5" /></svg>
          </a>
          <a className="btn-text" href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            LinkedIn
            <svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2 10L10 2M5 2h5v5" /></svg>
          </a>
          <div className="contact-wrapper" ref={contactWrapperRef}>
            <button
              ref={contactBtnRef}
              className={`btn-cta${contactOpen ? " active" : ""}${btnHighlighted ? " highlighted" : ""}`}
              onClick={openContact}
            >
              <span key={contactOpen ? "close" : "open"} className="btn-label">
                {contactOpen ? "Close" : "Get in touch"}
              </span>
              {contactOpen
                ? <svg viewBox="0 0 12 12" aria-hidden="true"><path d="M1 1l10 10M11 1L1 11" /></svg>
                : <svg viewBox="0 0 12 12" aria-hidden="true"><polyline points="2,4 6,8 10,4" /></svg>
              }
            </button>
          </div>
        </div>
      </div>

      {contactOpen && createPortal(
        <ContactDropdown
          onClose={() => { setContactOpen(false); setShakeCount(0); }}
          shakeSignal={shakeCount}
          top={dropdownPos.top}
          right={dropdownPos.right}
          ref={dropdownRef}
        />,
        document.body
      )}
    </header>
  );
}

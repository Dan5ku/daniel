import { useEffect, useState } from "react";
import PhotoFrame from "../components/PhotoFrame";
import WorkCard from "../components/WorkCard";
import "./Home.css";

export default function Home() {
  const [nameHidden, setNameHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const heroName = document.getElementById("hero-name");
      if (!heroName) return;
      setNameHidden(heroName.getBoundingClientRect().top < 80);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="page-container">

      {/* Hero */}
      <section className="hero">
        <div className="hero-left">
          <p className="hero-eyebrow">Portfolio · Projects · Experiments</p>
          <div className="hero-title-group">
            <h1 className="hero-title">
              <span>Designer.</span>
              <span>Developer.</span>
            </h1>
            <div
              id="hero-name"
              className={`hero-name${nameHidden ? " hidden" : ""}`}
            >
              Daniel Virtanen
            </div>
          </div>
          <p className="hero-body">
            I design and build digital experiences with a focus on UX and ideas
            that go beyond the obvious. This site is my portfolio, project
            platform, and playground.
          </p>
        </div>
        <div className="hero-right">
          <PhotoFrame
            src="/image-me-1.png"
            alt="Daniel Virtanen"
            variant="hero"
          />
        </div>
      </section>

      {/* Work */}
      <section className="work" id="work">
        <p className="section-label">Selected work</p>
        <div className="work-grid">
          <WorkCard
            title="Project One"
            description="A brief description of this project and what makes it interesting from a design or engineering perspective."
            tag="UX Design"
            href="#"
          />
          <WorkCard
            title="Project Two"
            description="Another project showcasing a different set of skills — development-focused or experimental."
            tag="Development"
            href="#"
          />
          <WorkCard
            title="Next Up"
            description="Something new is in the works. Check back soon."
            tag="Soon"
            href="#"
            soon
          />
        </div>
      </section>

      {/* About */}
      <section className="about" id="about">
        <div className="about-text">
          <p className="section-label">About</p>
          <h2 className="about-heading">
            Thoughtful<br />by design.
          </h2>
          <p className="about-body">
            I&rsquo;m Daniel &mdash; a designer and developer who cares about the
            details that most people don&rsquo;t notice until they&rsquo;re
            missing. I work across UX, UI, and frontend engineering, with a bias
            toward clarity and experiences that feel natural.
          </p>
          <div className="skills">
            <span className="skill">UX Design</span>
            <span className="skill">UI Design</span>
            <span className="skill">React</span>
            <span className="skill">TypeScript</span>
            <span className="skill">Prototyping</span>
            <span className="skill">Design Systems</span>
          </div>
        </div>
        <div className="about-photos">
          <PhotoFrame
            src="/image-me-2.png"
            alt=""
            variant="about"
          />
          <div className="about-photo-offset">
            <PhotoFrame
              src="/image-me-5.png"
              alt=""
              variant="about"
            />
          </div>
        </div>
      </section>

    </div>
  );
}

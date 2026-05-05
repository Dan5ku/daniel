import "./PhotoFrame.css";

interface PhotoFrameProps {
  src: string;
  alt: string;
  variant?: "hero" | "about";
}

export default function PhotoFrame({ src, alt, variant = "hero" }: PhotoFrameProps) {
  return (
    <div className={`photo-wrap ${variant === "hero" ? "hero-wrap" : "about-wrap"}`}>
      <div className={`photo-outer ${variant === "hero" ? "hero-frame" : "about-frame"}`}>
        <img src={src} alt={alt} className="photo-img" />
      </div>
    </div>
  );
}

import { useEffect, useState, type FC } from "react";
import imageMe1 from "../assets/image-me-1.png";
import imageMe2 from "../assets/image-me-2.png";
import imageMe3 from "../assets/image-me-3.png";
import imageMe4 from "../assets/image-me-4.png";
import imageMe5 from "../assets/image-me-5.png";
import imageMe6 from "../assets/image-me-6.png";

const heroImages = [imageMe1, imageMe2, imageMe3, imageMe4] as const;

const Home: FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 3000);

    return () => window.clearInterval(intervalId);
  }, []);

  const currentImage = heroImages[currentIndex];

  return (
    <div className="home-card-grid">
      <div className="home-card home-card--hero">
        <figure className="home-card__media">
          <img
            key={currentImage}
            className="home-card__image home-card__image--animated"
            src={currentImage}
            alt="Portrait of me"
          />
        </figure>
        <h1 className="home-card__heading">me.</h1>
      </div>
      <div className="home-card">
        <figure className="home-card__media">
          <img
            src={imageMe5}
            alt="Illustration representing my design work"
            className="home-card__image"
          />
        </figure>
        <h1 className="home-card__heading">Designer</h1>
      </div>
      <div className="home-card">
        <figure className="home-card__media">
          <img
            src={imageMe6}
            alt="Illustration representing my development work"
            className="home-card__image"
          />
        </figure>
        <h1 className="home-card__heading">Developer</h1>
      </div>
    </div>
  );
};

export default Home;

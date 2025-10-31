import { useEffect, useState, type FC } from "react";
import { Link } from "react-router-dom";
import imageMe1 from "../assets/image-me-1.png";
import imageMe2 from "../assets/image-me-2.png";
import imageMe3 from "../assets/image-me-3.png";
import imageMe4 from "../assets/image-me-4.png";
import imageMe5 from "../assets/image-me-5.png";

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
    <section>
      <section className="profile-hero">
        <figure>
          <img
            key={currentImage}
            className="profile-hero__image profile-hero__image--animated"
            src={currentImage}
            alt="Portrait of me"
          />
        </figure>
      </section>
      <h1>me.</h1>
      <p className="role-line">
        <span>Designer ✏️</span>
        <img
          src={imageMe5}
          alt="Illustration representing my design work"
          className="role-line__image"
        />
      </p>
      <p>Developer 💻</p>
      <p>Creator 🎨</p>
    </section>
  );
};

export default Home;

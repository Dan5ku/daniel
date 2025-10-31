import React from "react";
import { Link } from "react-router-dom";
import meImage from "../assets/image-me-1.png";

const Home: React.FC = () => {
  return (
    <section>
      <section className="profile-hero">
        <figure>
          <img
            className="profile-hero__image"
            src={meImage}
            alt="Portrait of me"
          />
          <figcaption>Me.</figcaption>
        </figure>
      </section>
      <h1>Me.</h1>
      <p>
        This is your starting point. Feel free to explore, add components, and
        customize the layout as you build out your project.
      </p>
      <div>
        <Link to="/about">About</Link>
        <Link to="/dashboard">Dashboard</Link>
      </div>
    </section>
  );
};

export default Home;

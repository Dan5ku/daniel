import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <section>
      <h1>Welcome to My App 🚀</h1>
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

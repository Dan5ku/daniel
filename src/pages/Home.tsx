import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800">
      <h1 className="text-4xl font-bold mb-4">Welcome to My App 🚀</h1>
      <p className="text-lg text-center max-w-md mb-8">
        This is your starting point. Feel free to explore, add components, and
        customize the layout as you build out your project.
      </p>
      <div className="flex gap-4">
        <Link
          to="/about"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          About
        </Link>
        <Link
          to="/dashboard"
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Dashboard
        </Link>
      </div>
    </main>
  );
};

export default Home;
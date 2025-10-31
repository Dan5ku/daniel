import type { ReactNode } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="app-shell">
      <header>
        <nav>
          <Link to="/">Daniel Virtanen</Link>
        </nav>
      </header>
      <main>{children}</main>
      <footer>
        &copy; {new Date().getFullYear()} [Name]. All rights reserved.
      </footer>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

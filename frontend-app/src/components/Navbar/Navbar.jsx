import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="navbar-container container">

        <div className="logo">
          HateSpeech AI
        </div>

        <ul className="nav-links">

          <li>
            <Link to="/">Home</Link>
          </li>

          <li>
            <Link to="/analyzer">Analyzer</Link>
          </li>

          <li>
            <Link to="/comparison">Comparison</Link>
          </li>

          <li>
            <Link to="/insights">Insights</Link>
          </li>

        </ul>

      </div>

    </nav>
  );
}

export default Navbar;
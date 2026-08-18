import { NavLink } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h2>MOVIEHUB</h2>

        <p>
          Discover movies, explore stories, and find your next favorite.
        </p>

        <div className="footer-links">
          <NavLink to="/">Movies</NavLink>

          <NavLink to="/tv">TV Shows</NavLink>

          <NavLink to="/wishlist">Wishlist</NavLink>

          <NavLink to="/assistant">AI Assistant</NavLink>
        </div>

        <p className="copyright">
          &copy; 2026 MovieHub. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
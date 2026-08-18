import { NavLink } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useWishlist } from "../../context/WishlistContext";
import "./Navbar.css";

function Navbar() {
  const { wishlist } = useWishlist();

  return (
    <nav className="navbar">
      <NavLink to="/" className="navbar-logo">
        MOVIEHUB
      </NavLink>

      <div className="navbar-links">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          Movies
        </NavLink>

        <NavLink
          to="/tv"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          TV Shows
        </NavLink>

        <NavLink
          to="/wishlist"
          className={({ isActive }) =>
            `wishlist-link ${isActive ? "active" : ""}`
          }
        >
          <FaHeart />
          <span>Wishlist</span>

          <span className="wishlist-count">
            {wishlist.length}
          </span>
        </NavLink>

        <NavLink
          to="/assistant"
          className={({ isActive }) =>
            isActive ? "active" : ""
          }
        >
          AI Assistant
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
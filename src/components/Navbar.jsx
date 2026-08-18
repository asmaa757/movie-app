import { NavLink } from "react-router";
import { useWishlist } from "../hooks/useWishlist";
import { Heart, MonitorPlay } from "lucide-react";

function Navbar() {
  const { wishlist } = useWishlist();

  const linkClass = ({ isActive }) =>
   `relative flex items-center gap-1.5 text-white text-[15px] font-semibold no-underline
    transition-colors duration-200 hover:text-(--primary)
    after:absolute after:left-0 after:-bottom-2 after:h-0.5
    after:bg-(--primary) after:transition-all after:duration-200
    ${isActive ? "text-(--primary) after:w-full" : "after:w-0"}`;

  return (
    <nav className="sticky top-0 z-1000 w-full h-17.5 bg-black/50 backdrop-blur-sm box-border flex items-center justify-between px-5">

      <NavLink to="/" className="text-(--primary) flex items-center gap-2 no-underline">
        <MonitorPlay className="w-7 h-9" />
        <span className="text-2xl font-extrabold">
          MOVIE APP
        </span>
      </NavLink>

      <div className="flex items-center gap-5">
        <NavLink to="/" className={linkClass}> Movies </NavLink>
        <NavLink to="/tv-shows" className={linkClass}> TV Shows </NavLink>

        <NavLink to="/whishlist" className={linkClass}>
          <Heart className="w-5 h-5 text-white fill-current"/>
          <span>Wishlist</span>
          <span className="min-w-5 h-5 px-1 flex text-white items-center justify-center bg-(--primary) rounded-full text-[11px] font-bold">
            {wishlist.length}
          </span>
        </NavLink>

        <NavLink to="ai-assistant"  className={linkClass}> AI Assistant </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
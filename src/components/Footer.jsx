import { NavLink } from "react-router";

function Footer() {
  const footerLink = "text-[#b3b3b3] transition-colors duration-200 hover:text-[#e50914]";

  return (
    <footer className="mt-15 border-t border-[#292929] bg-[#111111] px-5 pt-12.5 pb-6.25">
      <div className="mx-auto max-w-300 text-center">

        <h2 className="mb-3.75 text-2xl font-extrabold text-(--primary)">
          MOVIE APP
        </h2>

        <p className="mb-5 text-[#999999]">
          Discover movies, explore stories, and find your next favorite.
        </p>

        <div className="mb-7.5 flex flex-wrap justify-center gap-6.25">
          <NavLink to="/" className={footerLink}> Movies </NavLink>
          <NavLink to="tv-shows" className={footerLink}> TV Shows </NavLink>
          <NavLink to="whishlist" className={footerLink}> Wishlist </NavLink>
          <NavLink to="ai-assistant" className={footerLink}> AI Assistant </NavLink>
        </div>

        <p className="m-0 text-[13px] text-[#666666]">
          &copy; 2026 MovieHub. All rights reserved.
        </p>

      </div>
    </footer>
  );
}

export default Footer;
import { useState } from "react";
import { WishlistContext } from "./WishlistContext";

function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  const toggleWishlist = (movie) => {
    setWishlist((currentWishlist) => {
      const exists = currentWishlist.some(
        (item) => item.id === movie.id
      );

      if (exists) {
        return currentWishlist.filter(
          (item) => item.id !== movie.id
        );
      }

      return [...currentWishlist, movie];
    });
  };

  const isInWishlist = (id) => {
    return wishlist.some((item) => item.id === id);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export default WishlistProvider;
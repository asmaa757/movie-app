import { createContext, useContext, useState } from "react";

const WishlistContext = createContext();

function getStoredWishlist() {
  const storedWishlist = localStorage.getItem("wishlist");

  if (storedWishlist) {
    return JSON.parse(storedWishlist);
  }

  return [];
}

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(getStoredWishlist);

  const toggleWishlist = (movie) => {
    setWishlist((currentWishlist) => {
      const exists = currentWishlist.some(
        (item) => item.id === movie.id
      );

      let updatedWishlist;

      if (exists) {
        updatedWishlist = currentWishlist.filter(
          (item) => item.id !== movie.id
        );
      } else {
        updatedWishlist = [...currentWishlist, movie];
      }

      localStorage.setItem(
        "wishlist",
        JSON.stringify(updatedWishlist)
      );

      return updatedWishlist;
    });
  };

  const isInWishlist = (movieId) => {
    return wishlist.some((item) => item.id === movieId);
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

export function useWishlist() {
  return useContext(WishlistContext);
}
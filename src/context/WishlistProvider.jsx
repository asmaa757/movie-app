import { useState } from "react";
import { WishlistContext } from "./WishlistContext";

function WishlistProvider({ children }) {
    const [wishlist, setWishlist] = useState([]);
    function toggleWishlist(movie) {
        const exists = wishlist.some((item) => item.id === movie.id);
        if (exists) {
            setWishlist(
                wishlist.filter((item) => item.id !== movie.id)
            );
        } else {
            setWishlist([...wishlist, movie]);
        }
    }
    function isInWishlist(id) {
        return wishlist.some((item) => item.id === id);
    }
    return (
        <WishlistContext.Provider
            value={{
                wishlist,
                toggleWishlist,
                isInWishlist
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
}

export default WishlistProvider;
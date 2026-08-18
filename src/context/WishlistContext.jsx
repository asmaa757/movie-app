import { createContext, useState, useEffect } from "react";

export const WishlistContext = createContext();

export function WishlistProvider({ children }) {
    const [wishlist, setWishlist] = useState(() => {
        const saved = localStorage.getItem("wishlist");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }, [wishlist]);

    const toggleWishlist = (movie) => {
        setWishlist((prev) => {
            const exists = prev.some((item) => item.id === movie.id);
            if (exists) {
                return prev.filter((item) => item.id !== movie.id);
            }
            return [...prev, movie];
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
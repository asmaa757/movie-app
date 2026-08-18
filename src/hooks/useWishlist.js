import { useContext } from "react";
import { WishlistContext } from "../contexts/WishlistContext";

export function useWishlist() {
  return useContext(WishlistContext);
}
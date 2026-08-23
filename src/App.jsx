import { createBrowserRouter, RouterProvider } from "react-router";
import MainLayout from "./layouts/MainLayout";
import MediaPage from "./pages/MediaPage";
import MediaDetails from "./pages/MediaDetails";
import SearchResults from "./pages/SearchResults";
import Wishlist from "./pages/Wishlist";
import AIAssistant from "./pages/AIAssistant";
import WishlistProvider from "./contexts/WishlistProvider";
import ThemeProvider from "./contexts/ThemeProvider";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <MediaPage type="movie" />,
      },
      {
        path: "movies",
        element: <MediaPage type="movie" />,
      },
      {
        path: "movies/:id",
        element: <MediaDetails />,
      },
      {
        path: "tv-shows",
        element: <MediaPage type="tv" />,
      },
      {
        path: "tv-shows/:id",
        element: <MediaDetails />,
      },
      {
        path: "search",
        element: <SearchResults />,
      },
      {
        path: "whishlist",
        element: <Wishlist />,
      },
      {
        path: "ai-assistant",
        element: <AIAssistant />,
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider>
      <WishlistProvider>
        <RouterProvider router={router} />
      </WishlistProvider>
    </ThemeProvider>
  );
}

export default App;


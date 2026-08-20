import { createBrowserRouter } from "react-router"
import { RouterProvider } from "react-router";
import MainLayout from "./layouts/MainLayout";
import Movies from "./pages/Movies";
import MovieDetails from "./pages/MovieDetails";
import TVShows from "./pages/TVShows";
import TVShowDetails from "./pages/TVShowDetails";
import SearchResults from "./pages/SearchResults";
import Wishlist from "./pages/Wishlist";
import AIAssistant from "./pages/AIAssistant";
import WishlistProvider from "./contexts/WishlistProvider";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout/>,
        children: [
            {
                path: "/",
                element:<Movies />,
            },
            {
                path: "movies/:id",
                element:<MovieDetails />,
            },
            {
                path: "tv-shows",
                element:<TVShows />,
            },
            {
                path: "tv-shows/:id",
                element:<TVShowDetails />,
            },
            {
                path: "search",
                element:<SearchResults />,
            },
            {
                path: "whishlist",
                element:<Wishlist/>,
            },
            {
                path: "ai-assistant",
                element:<AIAssistant />,
            },                                          
        ]     
    }
]);

function App() {
    return(
        <WishlistProvider>
            <RouterProvider  router={router} />
        </WishlistProvider>
    ) 
}

export default App;


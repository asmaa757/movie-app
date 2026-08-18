import { createBrowserRouter } from "react-router"
import { RouterProvider } from "react-router";
import MainLayout from "./layouts/MainLayout";
<<<<<<< HEAD
import Movies from "./pages/Movies/Movies";
=======
import Movies from "./pages/Movies";
>>>>>>> 595dcc6344db2c7350c8e7cf69b9967699811962
import MovieDetails from "./pages/MovieDetails";
import TVShows from "./pages/TVShows";
import TVShowDetails from "./pages/TVShowDetails";
import SearchResults from "./pages/SearchResults";
import Wishlist from "./pages/Wishlist";
import AIAssistant from "./pages/AIAssistant";
import WishlistProvider from "./context/WishlistProvider";

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


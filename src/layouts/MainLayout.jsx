import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MainLayout(){
    return(
        <div>
            <Navbar />
            <div className="px-5 py-5">
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default MainLayout;
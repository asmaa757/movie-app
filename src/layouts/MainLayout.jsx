import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

function MainLayout(){
    return(
        <div>
            <Navbar />
            <div className="px-7 py-5">
                <Outlet />
            </div>
        </div>
    )
}

export default MainLayout;
import { Link } from 'react-router';
import img from '../assets/icon _heart_.png';
function Navbar(){
    return(
        <div className="bg-(--primary) py-3 px-6 flex justify-between">
            <Link to={"/"} className="font-bold text-xl">Movie App</Link>
            <div className='flex gap-5 font-semibold'>
                <Link to={"/movies/:id"} className='active:text-(--primary)'>Movies</Link>
                <span>|</span>
                <Link to={"tv-shows"} className='active:text-(--primary)'>TV Shows</Link>
                <span>|</span>
                <Link to={"ai-assistant"} className='active:text-(--primary)'>AI Assistant</Link>
            </div>
            <Link to={"whishlist"} className='flex gap-2 active:text-(--primary) font-semibold'>
                <img src={img} className='w-5 h-5'/>
                <p>Wishlist</p>
            </Link>
        </div>
    )
}

export default Navbar;
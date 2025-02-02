import { Link } from "react-router-dom";
import logo from "./images/WorldArcheryLogoOnly.png";
import { UserContext} from "./UserContext";
import { useContext } from "react";

export default function Header() {

    const {user} = useContext(UserContext);

    return(
        
        <div>
            <header className="flex justify-between">
                
        <a href="" className="flex items-center gap-2">
          <img src={logo} className="w-20 h-20"/>
          <span className="overflow-x-auto:hidden max-w-60 font-bold 
          text-3xl text-archery-blue break-words text-left">world archery philippines</span>
        </a>

        <div className="flex p-2 gap-3 items-center text-archery-blue font-bold text-2xl justify-start">
          <div>NEWS</div>
          <div className="border-l-4 border-archery-blue"></div>
          <div>EVENTS</div>
          <div className="border-l-4 border-archery-blue"></div>
          <div>ATHLETES</div>
        
        </div>
        <Link to = {"/login"} className="flex gap-2 items-center border border-archery-blue-300 rounded-full py-1 px-6 justify-end">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
          </svg>
          <div className="bg-archery-blue text-white rounded-full border border-archery-blue overflow-hidden">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 relative top-1">
            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
            </svg>
          </div>
          
          {!!user && (
            <div className="text-archery-blue font-bold">
              {user.name}
            </div>
          )}

        </Link>
      </header>
        </div>
    );
}
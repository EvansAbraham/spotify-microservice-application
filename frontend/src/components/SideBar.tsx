import Button from './Button';
import MenuItem from "./MenuItem";
import PlaylistCard from "./PlaylistCard";
import { BiLibrary } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useUserData } from '../hooks/useUserData';
import { GoHome, GoSearch, GoArrowRight, GoPlus } from "react-icons/go";

const SideBar = () => {
  const navigate = useNavigate();
  const { user } = useUserData();
  return (
    <div className="w-[25%] h-full p-2 flex-col gap-2 hidden lg:flex">
      <div className="bg-[#212121] h-[15%] rounded flex flex-col justify-around">
        <MenuItem icon={GoHome} label="Home" to="/"/>
        <MenuItem icon={GoSearch} label="Search"/>
      </div>
      <div className="bg-[#212121] h-[85%] rounded">
        <div className="p-4 flex items-center justify-between">
          <MenuItem icon={BiLibrary} label="Your Library" to="/library"/>
          <div className="flex items-center gap-3">
            <GoArrowRight className="text-2xl"/>
            <GoPlus className="text-2xl"/>
          </div>
        </div>
          <div onClick={() => navigate("/playlist")}>
            <PlaylistCard/>
          </div>
          <div className="p-4 m-2 rounded font-medium flex flex-col items-center gap-1 pl-4 mt-4">
            <h1>Let's find some podcasts to follow!</h1>
            <p className="font-light text-center">We'll keep you update on new episodes</p>
            <Button className="mt-4">Browse Podcast</Button>
            {user && user.role === "admin" && (
              <Button to='/admin/dashboard' className='mt-4'>Admin Dashboard</Button>
            )}
          </div>
      </div>
    </div>
  )
}

export default SideBar 
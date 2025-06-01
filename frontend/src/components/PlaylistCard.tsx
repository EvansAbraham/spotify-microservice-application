import { FaMusic } from "react-icons/fa";
import { useUserData } from "../hooks/useUserData";

const PlaylistCard = () => {
  const { isAuth, user } = useUserData();
  return (
    <div className="flex items-center p-4 rounded-lg shadow-md cursor-pointer bg-[#121212] hover:bg-[#1A1A1A] mx-2">
        <div className="w-10 h-10 bg-gray-900 flex items-center justify-center rounded-md">
            <FaMusic className="text-xl"/>
        </div>
        <div className="ml-4">
            <h2>My Playlist</h2>
            <p className="text-sm">Playlist •{" "}</p>
            {isAuth? <span>{user?.name}</span> : <span>{"User"}</span>}
        </div>
    </div>
  )
}

export default PlaylistCard